let queue=Promise.resolve();
const serial=fn=>(queue=queue.then(fn,fn));
async function inject(tabId){try{await chrome.scripting.executeScript({target:{tabId},files:['capture.js']});await chrome.tabs.sendMessage(tabId,{kind:'capture-start'});}catch(e){await chrome.storage.local.set({lastError:e.message});}}
chrome.runtime.onMessage.addListener((m,s,reply)=>{
 if(m.kind==='capture-event'){serial(async()=>{const x=await chrome.storage.local.get(['session']);if(!x.session)return;x.session.events.push(m.event);await chrome.storage.local.set({session:x.session});});return;}
 if(m.kind==='capture-ready'){chrome.storage.local.get('session').then(x=>{if(x.session&&s.tab?.id===x.session.tabId)chrome.tabs.sendMessage(s.tab.id,{kind:'capture-start'}).catch(()=>{});});return;}
 if(m.kind==='status'){chrome.storage.local.get('session').then(x=>reply({recording:!!x.session}));return true;}
 if(m.kind==='start'){serial(async()=>{let x=await chrome.storage.local.get('session');if(x.session)throw Error('A recording is already active.');await chrome.storage.local.set({session:{title:m.title,tabId:m.tabId,startedAt:Date.now(),events:[]}});await inject(m.tabId);reply({ok:true});}).catch(e=>reply({error:e.message}));return true;}
 if(m.kind==='stop'||m.kind==='cancel'){serial(async()=>{const x=await chrome.storage.local.get(['session','studioUrl','deviceToken']);if(!x.session)throw Error('No active recording.');await chrome.tabs.sendMessage(x.session.tabId,{kind:'capture-stop'}).catch(()=>{});
 if(m.kind==='cancel'){await chrome.storage.local.remove('session');reply({message:'Discarded.'});return;}
 if(!x.session.events.some(e=>e.type===2))throw Error('No page snapshot captured. Keep recording on a permitted page, then retry.');
 if(x.session.events.length>150000)throw Error('Capture too large. Export/recovery is needed before upload.');
 const r=await fetch(x.studioUrl+'/api/recordings',{method:'POST',headers:{'content-type':'application/json','Authorization':'Bearer '+x.deviceToken},body:JSON.stringify({title:x.session.title,events:x.session.events,duration:(Date.now()-x.session.startedAt)/1000})});const data=await r.json();if(!r.ok)throw Error(data.error||'Upload failed. Recording kept locally.');await chrome.storage.local.remove('session');reply({message:'Saved privately. Open your Studio library.'});}).catch(e=>reply({error:e.message}));return true;}
});
chrome.tabs.onUpdated.addListener((id,change)=>{if(change.status==='complete')chrome.storage.local.get('session').then(x=>{if(x.session?.tabId===id)inject(id);});});
