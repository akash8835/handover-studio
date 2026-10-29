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
 const bytes=Array.from(await fs.readFile('/downloads/handover-offline-long-source.webm'));
 for(const [name,options] of Object.entries({long:{start:0,end:15,cuts:[{start:4,end:6},{start:9,end:11}]}})){
  const r=await p.evaluate(async({bytes,options})=>{const result=await window.exporter.exportEditedVideo(new Blob([new Uint8Array(bytes)],{type:'video/webm'}),{sourceDuration:15,...options});return{duration:result.duration,frames:result.frames,bytes:Array.from(new Uint8Array(await result.blob.arrayBuffer()))}},{bytes,options});
  await fs.writeFile('/downloads/handover-deterministic-'+name+'.webm',Buffer.from(r.bytes)); console.log(name,{duration:r.duration,frames:r.frames,bytes:r.bytes.length});
 }
 const cancelled=await p.evaluate(async bytes=>{const controller=new AbortController();setTimeout(()=>controller.abort(),30);try{await window.exporter.exportEditedVideo(new Blob([new Uint8Array(bytes)],{type:'video/webm'}),{sourceDuration:15,end:15,signal:controller.signal});return false}catch(e){return /cancelled/.test(e.message)}},bytes);if(!cancelled)throw Error('Mid-export cancellation failed');console.log({midExportCancelled:cancelled});
}finally{await b.close();server.kill();}
