import * as pdfjs from 'pdfjs-dist/build/pdf.mjs';
import mammoth from 'mammoth/mammoth.browser.js';
pdfjs.GlobalWorkerOptions.workerSrc='/pdf.worker.mjs';
export async function extractDocument(buffer,name){
 if(buffer.byteLength>5000000)throw Error('Document must be under 5 MB.');
 const extension=name.toLowerCase().split('.').at(-1);let text='',pages=0;
 if(extension==='pdf'){
  const task=pdfjs.getDocument({data:new Uint8Array(buffer),isEvalSupported:false,useSystemFonts:true,disableFontFace:true});
  try{const pdf=await task.promise;if(pdf.numPages>50)throw Error('PDF supports at most 50 pages.');pages=pdf.numPages;for(let i=1;i<=pages;i++){const page=await pdf.getPage(i),content=await page.getTextContent();text+='[Page '+i+']\n'+content.items.map(x=>x.str||'').join(' ')+'\n\n';if(text.length>100000)throw Error('Extracted document text exceeds 100,000 characters.');page.cleanup();}}finally{await task.destroy();}
 }else if(extension==='docx'){
  validateDocx(buffer);const result=await mammoth.extractRawText({arrayBuffer:buffer},{externalFileAccess:false});text=result.value;
 }else if(['txt','md'].includes(extension)){text=new TextDecoder('utf-8',{fatal:true}).decode(buffer);}else throw Error('Use PDF, DOCX, TXT or Markdown.');
 if(text.length>100000)throw Error('Extracted document text exceeds 100,000 characters.');if(!text.trim())throw Error('No readable text found. Scanned documents need OCR, which is not included in this importer.');return{text,pages,format:extension};
}

function validateDocx(buffer){const v=new DataView(buffer);let end=-1;for(let i=v.byteLength-22;i>=Math.max(0,v.byteLength-65557);i--)if(v.getUint32(i,true)===0x06054b50){end=i;break;}if(end<0)throw Error('Invalid DOCX archive.');const entries=v.getUint16(end+10,true);if(entries>1000||v.getUint16(end+4,true)||v.getUint16(end+6,true))throw Error('Unsupported DOCX archive.');let pos=v.getUint32(end+16,true),size=0;for(let i=0;i<entries;i++){if(pos+46>v.byteLength||v.getUint32(pos,true)!==0x02014b50)throw Error('Invalid DOCX archive.');size+=v.getUint32(pos+24,true);if(size>20000000)throw Error('Expanded DOCX must be under 20 MB.');pos+=46+v.getUint16(pos+28,true)+v.getUint16(pos+30,true)+v.getUint16(pos+32,true);}}
