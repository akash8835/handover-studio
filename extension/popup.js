const $=id=>document.getElementById(id);
chrome.storage.local.get(['studioUrl','deviceToken']).then(s=>{$('url').value=s.studioUrl||'';$('token').value=s.deviceToken||'';});
chrome.runtime.sendMessage({kind:'status'}).then(s=>$('status').textContent=s.recording?'Recording in progress.':'Ready.');
$('start').onclick=async()=>{try{
 let url=$('url').value.replace(/\/$/,'');if(!url.startsWith('https://')&&!url.startsWith('http://localhost'))throw Error('Use an HTTPS Studio URL.');
 const [tab]=await chrome.tabs.query({active:true,currentWindow:true});const origin=new URL(tab.url).origin+'/*';
 if(!await chrome.permissions.request({origins:[origin]}))throw Error('Site permission was declined.');
 await chrome.storage.local.set({studioUrl:url,deviceToken:$('token').value});
 const r=await chrome.runtime.sendMessage({kind:'start',tabId:tab.id,title:$('title').value||'Untitled walkthrough'});if(r.error)throw Error(r.error);$('status').textContent='Recording. You can close this popup.';
 }catch(e){$('status').textContent=e.message}};
for(const kind of ['stop','cancel'])$(kind).onclick=async()=>{try{let r=await chrome.runtime.sendMessage({kind});$('status').textContent=r.error||r.message||'Done.'}catch(e){$('status').textContent=e.message}};
