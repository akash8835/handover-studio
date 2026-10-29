export function gateClient(binding, token) {
 if (!binding) throw Error('Consistent publication service is unavailable.');
 const stub=binding.get(binding.idFromName('publication:'+token));
 return {
  async read(){const r=await stub.fetch('https://publication/read');if(!r.ok)throw Error('Publication state could not be verified.');const result=await r.json();if(!result)return null;return{revision:result.revision,payload:typeof result.payload==='string'?JSON.parse(result.payload):result.payload};},
  async publish(expectedRevision,revision,payload){const r=await stub.fetch('https://publication/publish',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({expectedRevision,revision,payload})});if(!r.ok)throw Error(r.status===409?'Publication changed. Reload before saving.':'Publication could not be saved.');return r.json();}
 };
}
export async function resolvePublication({client,loadDerivative,loadSnapshot,digest}) {
 const state=await client.read();
 if(!state||state.payload?.active!==true)throw Error('This link is private, revoked or unavailable.');
 let p=state.payload;
 if(p.snapshot){const snapshot=await loadSnapshot(p.snapshot.key,p.principal);if(!snapshot||await digest(JSON.stringify(snapshot))!==p.snapshot.sha)throw Error('Publication snapshot is unavailable.');p={...p,...snapshot};state.payload=p;}
 if(!p.metadata||!Array.isArray(p.index))throw Error('Publication state is incomplete.');
 if(p.media){
  if(!p.media.key||!p.media.sha)throw Error('Published media is unverified.');
  const media=await loadDerivative(p.media.key,p.principal);
  if(!media||await digest(media.video)!==p.media.sha)throw Error('Published playback is unavailable.');
  return{...state,media};
 }
 if(p.metadata.kind==='video')throw Error('Published video is unavailable.');
 return state;
}
