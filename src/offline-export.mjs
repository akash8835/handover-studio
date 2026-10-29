import{createTracker}from'./tracker.mjs';
import {Input, BlobSource, ALL_FORMATS, Output, BufferTarget, WebMOutputFormat, VideoSampleSink, VideoSampleSource, VideoSample, AudioSampleSink, AudioSampleSource} from 'mediabunny';

// Decode only retained sample content, then encode a new independent asset.
export async function offline(blob, {segments, rect, tracking=false, includeAudio = true, signal, onProgress = () => {}}) {
  if(tracking&&(!rect||!Array.isArray(segments)||segments.length!==1||segments[0].end-segments[0].start>20))throw Error('Tracking requires one kept range up to20seconds and a selected region.');
  const input = new Input({source: new BlobSource(blob), formats: ALL_FORMATS});
  let out,tracker,lastSourceTime=null;const trackingStarted=Date.now();
  const check = () => { if (signal?.aborted) throw Error('Export cancelled.'); };
  try {
    check();
    const video = await input.getPrimaryVideoTrack();
    const audio = includeAudio ? await input.getPrimaryAudioTrack() : null;
    if (!video) throw Error('No video track was found.');
    if(tracking&&(video.displayWidth>640||video.displayHeight>360))throw Error('Experimental tracking supports videos up to640x360. Use fixed blur for larger recordings.');
    const target = new BufferTarget();
    out = new Output({format: new WebMOutputFormat(), target});
    const vs = new VideoSampleSource({codec: 'vp8', bitrate: 1500000});
    out.addVideoTrack(vs);
    const as = audio ? new AudioSampleSource({codec: 'opus', bitrate: 96000}) : null;
    if (as) out.addAudioTrack(as);
    await out.start();
    let base = 0, count = 0;
    const total = segments.reduce((n, s) => n + s.end - s.start, 0);
    for (const seg of segments) {
      check();
      const results = await Promise.allSettled([
        (async () => {
          const sink = new VideoSampleSink(video);
          for await (const sample of sink.samples(seg.start, seg.end)) {
            let next;
            try {
              check();
              if(tracking&&(count>=600||Date.now()-trackingStarted>60000))throw Error('Tracking processing limit reached. No edited copy saved.');
              // Never retain a frame whose presentation timestamp is outside the kept interval.
              if (sample.timestamp < seg.start || sample.timestamp >= seg.end) continue;
              const duration = Math.min(sample.duration || 1 / 30, seg.end - sample.timestamp);
              const canvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
              const c = canvas.getContext('2d');
              sample.draw(c, 0, 0);
              if (rect) {
                let mask=rect;if(tracking){if(lastSourceTime!==null&&sample.timestamp-lastSourceTime>.2)throw Error('Tracking cannot continue across a cut or frame gap. Use separate reviewed exports.');const frame=c.getImageData(0,0,canvas.width,canvas.height);if(!tracker)tracker=createTracker(frame,{x:rect.x/100*canvas.width,y:rect.y/100*canvas.height,width:rect.width/100*canvas.width,height:rect.height/100*canvas.height},{radius:24,maxError:20,minSeparation:2});const box=lastSourceTime===null?tracker.current():tracker.step(frame);lastSourceTime=sample.timestamp;mask={x:Math.max(0,box.x-8)/canvas.width*100,y:Math.max(0,box.y-8)/canvas.height*100,width:Math.min(canvas.width-Math.max(0,box.x-8),box.width+16)/canvas.width*100,height:Math.min(canvas.height-Math.max(0,box.y-8),box.height+16)/canvas.height*100};}
                c.save();
                c.beginPath();
                c.rect(mask.x / 100 * canvas.width, mask.y / 100 * canvas.height, mask.width / 100 * canvas.width, mask.height / 100 * canvas.height);
                c.clip();
                c.filter = 'blur(24px)';
                sample.draw(c, 0, 0);
                c.restore();
              }
              next = new VideoSample(canvas, {timestamp: base + sample.timestamp - seg.start, duration});
              await vs.add(next);
              count++;
            } finally { next?.close(); sample.close(); }
          }
        })(),
        (async () => {
          if (!audio) return;
          const sink = new AudioSampleSink(audio);
          for await (const sample of sink.samples(seg.start, seg.end)) {
            let next;
            try {
              check();
              const first = Math.max(0, Math.ceil((seg.start - sample.timestamp) * sample.sampleRate));
              const last = Math.min(sample.numberOfFrames, Math.floor((seg.end - sample.timestamp) * sample.sampleRate));
              if (last <= first) continue;
              next = sample.trim(first, last);
              next.setTimestamp(base + sample.timestamp + first / sample.sampleRate - seg.start);
              await as.add(next);
            } finally { next?.close(); sample.close(); }
          }
        })()
      ]);
      const failure = results.find(r => r.status === 'rejected');
      if (failure) throw failure.reason;
      base += seg.end - seg.start;
      onProgress(base / total);
    }
    check();
    if (!count) throw Error('The selected ranges contain no video frames.');
    vs.close();
    as?.close();
    await out.finalize();
    return {blob: new Blob([target.buffer], {type: 'video/webm'}), frames: count, duration: base};
  } finally {
    input.dispose();
    if (out && out.state !== 'finalized' && out.state !== 'canceled') await out.cancel().catch(() => {});
  }
}
