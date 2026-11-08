export const MIN_YEAR=1870, MAX_YEAR=2026;
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function cohort(person,year){return Number.isFinite(person.birth)&&Math.abs(person.birth-year)<=35;}
export function eventAt(person,year,kind){
 const candidates=person.events.filter(e=>e.type===kind&&Number.isFinite(e.year)&&e.year<=year&&e.place);
 return candidates.sort((a,b)=>b.year-a.year)[0]||null;
}
export function visiblePeople(people,branch){return people.filter(p=>branch==='all'||p.branch===branch);}
export function project(lat,lon,rotation=0,tilt=15){
 const r=Math.PI/180, a=lat*r,b=(lon+rotation)*r,t=tilt*r;
 const x=Math.cos(a)*Math.sin(b), y=Math.sin(a), z=Math.cos(a)*Math.cos(b);
 return {x,y:y*Math.cos(t)-z*Math.sin(t),z:y*Math.sin(t)+z*Math.cos(t)};
}
export function relatives(id,people,edges){return edges.flatMap(([a,b,type])=>{if(a!==id&&b!==id)return[];const p=people.find(p=>p.id===(a===id?b:a));return p?[{person:p,label:type==='partner'?'Partner':a===id?'Child':'Parent'}]:[];});}

// Relationship distance counts parent/child and partner links equally, in either direction.
export function familyDistances(focusId,edges){
 const adjacency=new Map();for(const[a,b]of edges){if(!adjacency.has(a))adjacency.set(a,[]);if(!adjacency.has(b))adjacency.set(b,[]);adjacency.get(a).push(b);adjacency.get(b).push(a);}
 const distances=new Map([[focusId,0]]),queue=[focusId];for(let i=0;i<queue.length;i++){const id=queue[i];for(const next of adjacency.get(id)||[]){if(!distances.has(next)){distances.set(next,distances.get(id)+1);queue.push(next);}}}return distances;
}
export function familyScale(distance){return distance===0?1.45:distance===1?1.16:distance===2?.88:distance===3?.68:.55;}
export function focusForYear(people,year,preferredId){
 return people.filter(p=>Number.isFinite(p.birth)).reduce((best,p)=>{if(!best)return p;const a=Math.abs(p.birth-year),b=Math.abs(best.birth-year);return a<b||(a===b&&p.id===preferredId)?p:best;},null)?.id||preferredId;
}
export function focusLayout(people,focusId,edges,width=760){
 const focus=people.find(p=>p.id===focusId);if(!focus)return new Map();const distances=familyDistances(focusId,edges),rows=new Map();
 for(const p of people){if(!rows.has(p.row))rows.set(p.row,[]);rows.get(p.row).push(p);}
 const result=new Map();for(const[row,members]of rows){members.sort((a,b)=>a.col-b.col);const sizes=members.map(p=>familyScale(distances.get(p.id))),total=sizes.reduce((sum,s)=>sum+162*s,0)+(members.length-1)*25;let x=-total/2;const positions=members.map((p,i)=>{const item={id:p.id,x,s:sizes[i],w:162*sizes[i],h:58*sizes[i]};x+=item.w+25;return item;});const focal=positions.find(p=>p.id===focusId),shift=focal?-(focal.x+focal.w/2):0;
 for(const p of positions)result.set(p.id,{x:p.x+shift+width/2,y:235+(row-focus.row)*120-p.h/2,s:p.s});}
 return result;
}
