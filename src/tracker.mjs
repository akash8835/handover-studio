// Experimental bounded template matcher. Every frame is searched for distant
// distractors. Ambiguity stops export; manual output review is still required.
export function createTracker(frame,rect,{radius=24,maxError=20,minSeparation=2}={}){
 const {width,height,data}=frame,x=Math.round(rect.x),y=Math.round(rect.y),w=Math.round(rect.width),h=Math.round(rect.height);
 if(![x,y,w,h,radius].every(Number.isFinite)||w<8||h<8||w*h>100000||x<0||y<0||x+w>width||y+h>height||width>640||height>360)throw Error('Invalid bounded tracking region (maximum640x360)');
 const points=[];for(let j=0;j<h;j+=Math.max(1,Math.floor(h/8)))for(let i=0;i<w;i+=Math.max(1,Math.floor(w/8)))points.push({i,j,value:gray(data,((y+j)*width+x+i)*4)});
 const mean=points.reduce((a,p)=>a+p.value,0)/points.length,variance=points.reduce((a,p)=>a+(p.value-mean)**2,0)/points.length;if(variance<100)throw Error('Tracking needs a distinct textured region. Review manually.');
 let last={x,y,width:w,height:h};
 const step=next=>{
  if(next.width!==width||next.height!==height)throw Error('Tracking frame size changed. Review manually.');
  const matches=[],limit=maxError*points.length;
  for(let cy=0;cy<=height-h;cy++)for(let cx=0;cx<=width-w;cx++){
   let error=0;for(const p of points){error+=Math.abs(gray(next.data,((cy+p.j)*width+cx+p.i)*4)-p.value);if(error>limit)break;}
   if(error<=limit)matches.push({x:cx,y:cy,error:error/points.length});
   if(matches.length>10000)throw Error('Tracking scene is too ambiguous. Stop and review.');
  }
  matches.sort((a,b)=>a.error-b.error);const best=matches[0];
  if(!best||Math.abs(best.x-last.x)>radius||Math.abs(best.y-last.y)>radius)throw Error('Tracking uncertain or occluded. Stop and review before export.');
  const other=matches.find(m=>Math.abs(m.x-best.x)>w/2||Math.abs(m.y-best.y)>h/2);
  if(other&&other.error-best.error<minSeparation)throw Error('Tracking has an ambiguous distant target. Stop and review before export.');
  last={x:best.x,y:best.y,width:w,height:h};return{...last,error:best.error};
 };
 // The initial frame must pass the same whole-frame ambiguity check.
 step(frame);return{step,current:()=>({...last})};
}
function gray(data,i){return .299*data[i]+.587*data[i+1]+.114*data[i+2];}
export function interpolateMask(keys,time){if(!Array.isArray(keys)||!keys.length||!Number.isFinite(time))throw Error('Reviewed tracking keyframes required');for(let i=0;i<keys.length;i++){const k=keys[i];if(![k.time,k.x,k.y,k.width,k.height].every(Number.isFinite)||k.width<=0||k.height<=0||i&&k.time<=keys[i-1].time)throw Error('Invalid keyframe sequence');}if(time<keys[0].time||time>keys.at(-1).time)throw Error('No reviewed mask at this frame time');const end=keys.findIndex(k=>k.time>=time);if(end===0)return{...keys[0]};const a=keys[end-1],b=keys[end],f=(time-a.time)/(b.time-a.time),result={time};for(const key of['x','y','width','height'])result[key]=a[key]+(b[key]-a[key])*f;return result;}
