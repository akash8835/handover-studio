import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import {build} from 'esbuild';
await build({entryPoints:['src/video-export.mjs'],bundle:true,outfile:'dist/video-export-test.js',format:'esm'});
const server=spawn(process.execPath,['scripts/dev-server.mjs'],{stdio:'pipe'});
await new Promise(r=>server.stdout.once('data',r));
const b=await chromium.launch({args:['--no-sandbox']});
try {
 const p=await b.newPage(); await p.goto('http://localhost:4173');
 await p.evaluate(async()=>{window.exporter=await import('/video-export-test.js')});
 const bytes=Array.from(await fs.readFile('/downloads/handover-deterministic-source.webm'));
 for(const [name,options] of Object.entries({middle:{start:0,end:3,cuts:[{start:.9,end:2.1}]},two:{start:0,end:3,cuts:[{start:.4,end:.6},{start:.9,end:2.1}]},trim:{start:2.1,end:2.8},silent:{start:0,end:.8,includeAudio:false}})){
  const r=await p.evaluate(async({bytes,options})=>{const result=await window.exporter.exportEditedVideo(new Blob([new Uint8Array(bytes)],{type:'video/webm'}),{sourceDuration:3,...options});return{duration:result.duration,frames:result.frames,bytes:Array.from(new Uint8Array(await result.blob.arrayBuffer()))}},{bytes,options});
  await fs.writeFile('/downloads/handover-deterministic-'+name+'.webm',Buffer.from(r.bytes)); console.log(name,{duration:r.duration,frames:r.frames,bytes:r.bytes.length});
 }
}finally{await b.close();server.kill();}
