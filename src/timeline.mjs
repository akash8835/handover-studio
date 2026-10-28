export function buildIndex(events){
 const nodes=new Map();const out=[];let current='';const start=events[0]?.timestamp||0;
 function visit(n){if(!n)return;if(n.id!=null)nodes.set(n.id,n);if(n.textContent&&!n.textContent.trim().startsWith('/*'))current+=' '+n.textContent;for(const c of n.childNodes||[])visit(c);}
 for(const e of events){const sec=Math.max(0,(e.timestamp-start)/1000);if(e.type===4&&e.data?.href)out.push({sec,text:'Navigated to '+e.data.href,type:'navigation'});
 if(e.type===2){current='';visit(e.data.node);out.push({sec,text:current.replace(/\s+/g,' ').slice(0,16000),type:'screen'});}
 if(e.type===3){for(const a of e.data.adds||[]){current='';visit(a.node);if(current.trim())out.push({sec,text:current.trim().slice(0,4000),type:'change'});}for(const t of e.data.texts||[])if(t.value)out.push({sec,text:t.value.slice(0,4000),type:'text'});if(e.data.source===2){let n=nodes.get(e.data.id);out.push({sec,text:'Interaction: '+(n?.attributes?.['aria-label']||n?.attributes?.title||n?.tagName||'page element'),type:'click'});}}
 }return out.filter(x=>x.text.trim());
}
export function sanitizeEvents(events,maskedIds=[]){
 const hidden=new Set(maskedIds.map(Number));
 function mark(n,parent=false){if(!n)return;let yes=parent||hidden.has(n.id);if(yes&&n.id!=null)hidden.add(n.id);for(const c of n.childNodes||[])mark(c,yes);}
 for(const e of events){if(e.type===2)mark(e.data.node);for(const a of e.data?.adds||[])mark(a.node,hidden.has(a.parentId));}
 function scrub(n){if(!n)return;if(hidden.has(n.id)){return {type:2,id:n.id,tagName:'div',attributes:{style:'background:#292d2b;color:white;padding:8px;min-width:48px;min-height:18px;'},childNodes:[{type:3,textContent:'[Redacted]',id:-Math.abs(n.id)-10000000}]};}let x={...n};if(x.attributes){x.attributes={...x.attributes};delete x.attributes.value;delete x.attributes.checked;delete x.attributes.selected;}if(x.childNodes)x.childNodes=x.childNodes.map(scrub);return x;}
 return events.map(e=>{const x=structuredClone(e);if(x.type===2)x.data.node=scrub(x.data.node);if(x.type===3){if(x.data.source===5){x.data.text=String(x.data.text||'').replace(/./gs,'*');x.data.isChecked=false;}if(x.data.attributes)x.data.attributes=x.data.attributes.map(t=>{const attributes={...t.attributes};delete attributes.value;delete attributes.checked;delete attributes.selected;return {...t,attributes}}).filter(t=>Object.keys(t.attributes).length);if(x.data.id&&hidden.has(x.data.id))return null;if(x.data.texts)x.data.texts=x.data.texts.filter(t=>!hidden.has(t.id));if(x.data.attributes)x.data.attributes=x.data.attributes.filter(t=>!hidden.has(t.id));if(x.data.adds)x.data.adds=x.data.adds.filter(t=>!hidden.has(t.parentId)).map(t=>({...t,node:scrub(t.node)}));}return x;}).filter(Boolean);
}
export function searchIndex(index,question){const words=question.toLowerCase().match(/[\p{L}\p{M}\p{N}]{3,}/gu)||[];return index.map(x=>({...x,score:words.reduce((n,w)=>n+(x.text.toLowerCase().includes(w)?1:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8);}
export function secondsLabel(n){n=Math.floor(n||0);return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');}
