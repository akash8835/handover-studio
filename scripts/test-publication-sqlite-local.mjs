import{Miniflare}from'miniflare';import{build}from'esbuild';import assert from'node:assert/strict';
await build({entryPoints:['src/worker.js'],bundle:true,format:'esm',outfile:'/tmp/handover-gated-runtime.mjs'});
import{spawn}from'node:child_process';
const server=spawn('./node_modules/.bin/wrangler',['dev','--local','--port','4182','--var','PASSWORD_HASH:'+Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('synthetic')))).map(x=>x.toString(16).padStart(2,'0')).join('')],{stdio:['ignore','pipe','pipe']});
await new Promise((resolve,reject)=>{server.stdout.on('data',b=>{if(b.toString().includes('Ready on'))resolve()});server.stderr.on('data',b=>process.stderr.write(b));server.on('exit',code=>reject(Error('Server exited '+code)));});
const mf={dispatchFetch:(url,init)=>fetch(url.replace('https://test','http://localhost:4182'),init),dispose:async()=>{server.kill();await new Promise(r=>server.once('exit',r));}};
try{
 const login=await mf.dispatchFetch('https://test/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:'synthetic'})});const cookie=login.headers.get('set-cookie').split(';')[0];
 const call=async(path,body)=>{const r=await mf.dispatchFetch('https://test/api/'+path,{method:body?'POST':'GET',headers:{cookie,'content-type':'application/json'},body:body?JSON.stringify(body):undefined});return[r,await r.json()]};
 const[,created]=await call('video-recordings',{video:btoa('ORIGINAL'),mime:'video/webm',duration:3,title:'Synthetic runtime'});const id=created.id;
 const[,share]=await call('recordings/'+id+'/share',{enabled:true});const token=share.url.split('/').at(-1);
 const edits=await Promise.all(Array.from({length:8},(_,i)=>call('recordings/'+id+'/edited-video',{video:btoa('EDITED-'+i),mime:'video/webm',duration:1,segments:[{start:0,end:1}]})));
 const winners=edits.filter(([r])=>r.status===200);assert.equal(winners.length,1);const winner=winners[0][1];
 const media=await mf.dispatchFetch('https://test/api/public/'+token+'/media');const bytes=await media.text();assert(bytes.startsWith('EDITED-'));assert.equal(media.status,200);
 const [,owner]=await call('recordings/'+id);assert.equal(owner.videoEdit.id,winner.id);
 await call('recordings/'+id+'/share',{enabled:false});assert.equal((await mf.dispatchFetch('https://test/api/public/'+token+'/media')).status,404);
 console.log({actualSQLiteWorkerRace:true,winners:winners.length,rejected:edits.length-winners.length,gateRead:true,revoke:true});
}finally{await mf.dispose()}
