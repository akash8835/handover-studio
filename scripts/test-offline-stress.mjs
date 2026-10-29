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
 const bytes=null;
 for(const [name,options] of Object.entries({stress:{start:0,end:20,cuts:[{start:4,end:6},{start:9,end:11}],rect:{x:20,y:20,width:30,height:30}}})){
  const r=await p.evaluate(async({bytes,options})=>{const result=await window.exporter.exportEditedVideo(await (await fetch('/stress-source.webm')).blob(),{sourceDuration:20,...options});return{duration:result.duration,frames:result.frames,base64:await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(result.blob)})}},{bytes,options});
  await fs.writeFile('/downloads/handover-deterministic-'+name+'.webm',Buffer.from(r.base64,'base64')); console.log(name,{duration:r.duration,frames:r.frames,bytes:r.base64.length*.75});
 }
 const cancelled=await p.evaluate(async bytes=>{const controller=new AbortController();setTimeout(()=>controller.abort(),30);try{await window.exporter.exportEditedVideo(await (await fetch('/stress-source.webm')).blob(),{sourceDuration:20,end:20,signal:controller.signal});return false}catch(e){return /cancelled/.test(e.message)}},bytes);if(!cancelled)throw Error('Mid-export cancellation failed');console.log({midExportCancelled:cancelled});
}finally{await b.close();server.kill();}
