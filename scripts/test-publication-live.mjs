import fs from'node:fs/promises';import assert from'node:assert/strict';
const base='https://handover-studio.ashwatthama710.workers.dev';
const password=(await fs.readFile('/home/sandbox/.vault/akash-handover-studio-sign-in-30b249/password','utf8')).trim();
const login=await fetch(base+'/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password})});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];
const call=async(path,body)=>{const r=await fetch(base+'/api/'+path,{method:body?'POST':'GET',headers:{cookie,'content-type':'application/json'},body:body?JSON.stringify(body):undefined});const b=await r.json();return[r,b]};
const source=await fs.readFile('/downloads/handover-deterministic-source.webm'),edited=await fs.readFile('/downloads/handover-deterministic-middle.webm');
const[,create]=await call('video-recordings',{video:source.toString('base64'),mime:'video/webm',title:'Synthetic publication acceptance 2026-10-29',duration:3,transcript:'syntheticremovedword'});assert(create.id);const id=create.id;
const[,share]=await call('recordings/'+id+'/share',{enabled:true});assert(share.url);const token=share.url.split('/').at(-1);
try{
 const [response,edit]=await call('recordings/'+id+'/edited-video',{video:edited.toString('base64'),mime:'video/webm',duration:1.8,segments:[{start:0,end:.9},{start:2.1,end:3}],expectedEditId:null});assert([200,202].includes(response.status),JSON.stringify(edit));
 const pub=await fetch(base+'/api/public/'+token+'/media');assert.equal(pub.status,200);assert.deepEqual(Buffer.from(await pub.arrayBuffer()),edited);
 const head=await fetch(base+'/api/public/'+token+'/media',{method:'HEAD'});assert.equal(+head.headers.get('content-length'),edited.length);
 const range=await fetch(base+'/api/public/'+token+'/media',{headers:{range:'bytes=0-99'}});assert.equal(range.status,206);assert.deepEqual(Buffer.from(await range.arrayBuffer()),edited.subarray(0,100));
 const raw=await fetch(base+'/api/recordings/'+id+'/original-media',{headers:{cookie}});assert.deepEqual(Buffer.from(await raw.arrayBuffer()),source);assert.equal((await fetch(base+'/api/recordings/'+id+'/original-media')).status,401);
 const[,meta]=await call('public/'+token);assert.equal(meta.duration,1.8);assert.equal(meta.comments.length,0);const[,ask]=await call('public/'+token+'/ask',{question:'syntheticremovedword'});assert.equal(ask.matches.length,0);
 await fs.writeFile('/tmp/handover-publication-live-private.json',JSON.stringify({id,token,share:share.url,editId:edit.id}));console.log({sameLinkEditedBytes:true,originalPrivateRetained:true,head:true,range:true,staleTextExcluded:true,syntheticRecordingId:id});
}finally{const[r]=await call('recordings/'+id+'/share',{enabled:false});assert.equal(r.status,200);assert.equal((await fetch(base+'/api/public/'+token+'/media')).status,404);console.log({syntheticLinkRevoked:true,savedVideoNotDeleted:true});}
