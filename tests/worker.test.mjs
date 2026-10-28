import test from 'node:test';import assert from 'node:assert/strict';import worker from '../src/worker.js';
const map=new Map();const e={STORE:{get:async k=>map.get(k)||null,put:async(k,v)=>map.set(k,v),delete:async k=>map.delete(k)},PASSWORD_HASH:Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('test-only')))).map(x=>x.toString(16).padStart(2,'0')).join('')};let cookie;
async function call(path,body,method='GET',auth=true,origin){let headers={};if(body)headers['content-type']='application/json';if(auth&&cookie)headers.cookie=cookie;if(origin)headers.origin=origin;const r=await worker.fetch(new Request('https://studio.test/api/'+path,{method,headers,body:body?JSON.stringify(body):undefined}),e);return [r,await r.json()];}
const events=[{type:4,timestamp:1000,data:{href:'https://example.test'}},{type:2,timestamp:1000,data:{node:{type:0,id:1,childNodes:[{type:2,id:2,tagName:'p',attributes:{},childNodes:[{type:3,id:3,textContent:'SYNTHETIC SECRET VALUE'},{type:3,id:4,textContent:'Invite teammate'}]}]}}}];
test('private auth and share lifecycle uses sanitized data',async()=>{
 let [r]=await call('recordings');assert.equal(r.status,401);
 [r]=await call('login',{password:'test-only'},'POST',false);cookie=r.headers.get('set-cookie').split(';')[0];assert.equal(r.status,200);
 let [,b]=await call('recordings',{title:'Synthetic QA',events,duration:10},'POST');const id=b.id;assert(id);
 await call('recordings/'+id,{edits:{maskedIds:[3],cuts:[],cursor:true}},'PATCH');
 [,b]=await call('recordings/'+id+'/share',{enabled:true},'POST');const token=b.url.split('/').at(-1);
 [,b]=await call('public/'+token,null,'GET',false);assert(!JSON.stringify(b).includes('SYNTHETIC SECRET VALUE'));assert(JSON.stringify(b).includes('Invite teammate'));
 [,b]=await call('public/'+token+'/ask',{question:'secret'},'POST',false);assert.equal(b.matches.length,0);
 [r]=await call('recordings/'+id,{title:'Unapproved cross-site'},'PATCH',true,'https://untrusted.test');assert.equal(r.status,403);
 await call('recordings/'+id+'/share',{enabled:false},'POST');[r]=await call('public/'+token,null,'GET',false);assert.equal(r.status,404);
 await call('recordings/'+id,null,'DELETE');[r]=await call('recordings/'+id);assert.equal(r.status,404);
});
test('device token must authenticate',async()=>{let [r]=await call('recordings',null,'GET',false);assert.equal(r.status,401);});

test('private collections create and update without exposing recording content',async()=>{let [,a]=await call('collections',{title:'Synthetic collection'},'POST');assert.equal(a.collections.length,1);let id=a.collections[0].id;let [,b]=await call('collections/'+id,{description:'Synthetic only',recordingIds:[]},'PATCH');assert.equal(b.description,'Synthetic only');let [r]=await call('collections/'+id,null,'GET',false);assert.equal(r.status,401);await call('collections/'+id,null,'DELETE');});
