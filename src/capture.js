import {record} from 'rrweb';
if (!globalThis.__handoverCapture) {
 globalThis.__handoverCapture=true;
 let stop;
 chrome.runtime.onMessage.addListener((m,s,reply)=>{
  if(m.kind==='capture-start'&&!stop){
   stop=record({emit:e=>chrome.runtime.sendMessage({kind:'capture-event',event:e}).catch(()=>{}),maskAllInputs:true,maskTextClass:'handover-mask',blockClass:'handover-block',recordCanvas:false,collectFonts:false,sampling:{mousemove:100,scroll:150}});
   reply({ok:true});
  }
  if(m.kind==='capture-stop'){stop?.();stop=null;reply({ok:true});}
 });
 chrome.runtime.sendMessage({kind:'capture-ready'}).catch(()=>{});
}
