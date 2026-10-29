import{extractDocument}from'./document-extract.mjs';
self.onmessage=async e=>{try{self.postMessage({ok:true,result:await extractDocument(e.data.buffer,e.data.name)})}catch(error){self.postMessage({ok:false,error:String(error?.message||error?.stack||error||'Document extraction failed.')})}};
