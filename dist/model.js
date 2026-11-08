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
