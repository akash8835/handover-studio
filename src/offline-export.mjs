import {Input, BlobSource, ALL_FORMATS, Output, BufferTarget, WebMOutputFormat, VideoSampleSink, VideoSampleSource, VideoSample, AudioSampleSink, AudioSampleSource} from 'mediabunny';

// Decode only retained sample content, then encode a new independent asset.
export async function offline(blob, {segments, rect, includeAudio = true, signal, onProgress = () => {}}) {
  const input = new Input({source: new BlobSource(blob), formats: ALL_FORMATS});
  let out;
  const check = () => { if (signal?.aborted) throw Error('Export cancelled.'); };
  try {
    check();
    const video = await input.getPrimaryVideoTrack();
    const audio = includeAudio ? await input.getPrimaryAudioTrack() : null;
    if (!video) throw Error('No video track was found.');
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
              // Never retain a frame whose presentation timestamp is outside the kept interval.
              if (sample.timestamp < seg.start || sample.timestamp >= seg.end) continue;
              const duration = Math.min(sample.duration || 1 / 30, seg.end - sample.timestamp);
              const canvas = new OffscreenCanvas(sample.displayWidth, sample.displayHeight);
              const c = canvas.getContext('2d');
              sample.draw(c, 0, 0);
              if (rect) {
                c.save();
                c.beginPath();
                c.rect(rect.x / 100 * canvas.width, rect.y / 100 * canvas.height, rect.width / 100 * canvas.width, rect.height / 100 * canvas.height);
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
