// Optional, account-scoped browser recovery. No automatic expiry policy.
export class RecoveryStore{
 constructor(idb=globalThis.indexedDB){this.idb=idb}
 async db(){if(!this.idb)throw Error('Device recovery storage is unavailable.');return new Promise((resolve,reject)=>{let r=this.idb.open('handover-recording-recovery',1);r.onupgradeneeded=()=>r.result.createObjectStore('drafts',{keyPath:'key'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(Error('Device recovery storage is blocked.'))})}
 async run(mode,fn){const db=await this.db();try{return await new Promise((resolve,reject)=>{let tx=db.transaction('drafts',mode),value;tx.oncomplete=()=>resolve(value);tx.onabort=()=>reject(tx.error||Error('Device recovery write failed.'));tx.onerror=()=>{};try{fn(tx.objectStore('drafts'),v=>value=v)}catch(e){tx.abort();reject(e)}})}finally{db.close()}}
 async save(owner,draft){if(!owner||!draft.consent||!draft.id)throw Error('Recovery needs account and explicit consent.');return this.run('readwrite',s=>s.put({...draft,owner,key:JSON.stringify([owner,draft.id])}))}
 async list(owner){const rows=await this.run('readonly',(s,done)=>{let r=s.getAll();r.onsuccess=()=>done(r.result)});return rows.filter(x=>x.owner===owner)}
 async remove(owner,id){return this.run('readwrite',s=>s.delete(JSON.stringify([owner,id])))}
 async clear(){return this.run('readwrite',s=>s.clear())}
}
