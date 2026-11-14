import {ancestorPaths} from './kinship.js';
export const CHART_STYLES=[
 {id:'timeline',name:'Focus timeline',hint:'Scroll through generations; close relatives grow around the selected person.',icon:'focus'},
 {id:'network',name:'Constellation',hint:'An organic network. Drag people; hover to trace their immediate connections.',icon:'network'},
 {id:'ancestors',name:'Pedigree',hint:'Selected person below their recorded ancestors. Parent links only.',icon:'up'},
 {id:'descendants',name:'Descendants',hint:'Selected person above their recorded descendants. Parent links only.',icon:'down'},
 {id:'horizontal',name:'Horizontal generations',hint:'Read generations from left to right. Lines connect recorded parents and partners.',icon:'horizontal'},
 {id:'radial',name:'Kinship rings',hint:'Selected person at the centre. Each ring adds one recorded family link; partners count.',icon:'radial'},
 {id:'fan',name:'Ancestor fan',hint:'Ancestors spread across a semicircle. Each band is one ancestry step; no invented people.',icon:'fan'},
 {id:'lifespans',name:'Lifespans',hint:'Horizontal birth-to-death spans. Open circles mean death unrecorded, not confirmed living.',icon:'lifespans'},
 {id:'arc',name:'Relationship arcs',hint:'People ordered by birth, linked by sweeping arcs. Spacing is ordinal, not elapsed time.',icon:'arc'},
 {id:'hourglass',name:'Hourglass',hint:'Ancestors above, descendants below, selected person in the middle. Parent links only.',icon:'hourglass'}
];
export const ROOTED=new Set(['ancestors','descendants','radial','fan','hourglass']);
export function descendants(id,edges){return ancestorPaths(id,edges.map(([a,b,t])=>[b,a,t]));}
export function generations(people,edges){const ids=new Set(people.map(p=>p.id)),ranks=new Map(people.map(p=>[p.id,0])),parents=edges.filter(([a,b,t])=>t==='parent'&&ids.has(a)&&ids.has(b));let changed=false;for(let k=0;k<people.length;k++){changed=false;for(const[a,b]of parents)if(ranks.get(b)<=ranks.get(a)){ranks.set(b,ranks.get(a)+1);changed=true;}if(!changed)break;}return {ranks,cycle:changed};}
export function buildLayout(people,edges,mode,selected){
 const ids=new Set(people.map(p=>p.id));edges=edges.filter(([a,b])=>ids.has(a)&&ids.has(b));
 if(!ids.has(selected))selected=people[0]?.id;
 const up=ancestorPaths(selected,edges),down=descendants(selected,edges),restricted=['ancestors','fan','descendants','hourglass'].includes(mode);
 let list=people.filter(p=>!restricted||(mode==='descendants'?down.has(p.id):mode==='hourglass'?up.has(p.id)||down.has(p.id):up.has(p.id)));
 const shown=new Set(list.map(p=>p.id));let links=edges.filter(([a,b,t])=>shown.has(a)&&shown.has(b)&&(!restricted||t==='parent'));
 const positions=new Map(),guides=[],bars=new Map();let w=960,h=600,note='';
 const group=(items,fn)=>{const m=new Map();for(const p of items){const k=fn(p);if(!m.has(k))m.set(k,[]);m.get(k).push(p);}return m;};
 const byBirth=(a,b)=>(a.birth??Infinity)-(b.birth??Infinity)||a.name.localeCompare(b.name);
 const rankInfo=generations(list,links);
 if(rankInfo.cycle&&['horizontal','ancestors','descendants','hourglass','fan'].includes(mode))return {people:list,edges:[],positions:new Map(list.map((p,i)=>[p.id,{x:100+(i%5)*180,y:100+Math.floor(i/5)*95}])),guides:[],bars,w:960,h:Math.max(600,Math.ceil(list.length/5)*95+160),note:'Parent cycle detected. Hierarchy withheld; correct the records.'};
 if(mode==='network'){
 list.forEach((p,i)=>positions.set(p.id,{x:480+260*Math.cos(i*2*Math.PI/list.length),y:300+215*Math.sin(i*2*Math.PI/list.length)}));
 for(let k=0;k<180;k++){const forces=new Map(list.map(p=>[p.id,{x:0,y:0}]));for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){const a=positions.get(list[i].id),b=positions.get(list[j].id),dx=a.x-b.x,dy=a.y-b.y,d=Math.max(1,Math.hypot(dx,dy)),f=7500/(d*d);for(const[id,sign]of [[list[i].id,1],[list[j].id,-1]]){forces.get(id).x+=sign*dx/d*f;forces.get(id).y+=sign*dy/d*f;}}for(const[a,b]of links){const p=positions.get(a),q=positions.get(b),dx=q.x-p.x,dy=q.y-p.y,d=Math.max(1,Math.hypot(dx,dy)),f=(d-150)*.02;forces.get(a).x+=dx/d*f;forces.get(a).y+=dy/d*f;forces.get(b).x-=dx/d*f;forces.get(b).y-=dy/d*f;}for(const[id,p]of positions){const f=forces.get(id);p.x=Math.max(100,Math.min(860,p.x+f.x));p.y=Math.max(55,Math.min(515,p.y+f.y));}}
 }else if(mode==='horizontal'){
 const rows=group(list,p=>rankInfo.ranks.get(p.id)),depth=Math.max(0,...rows.keys());w=Math.max(960,(depth+1)*230);h=Math.max(600,...[...rows.values()].map(r=>r.length*95+120));
 for(const[d,row]of rows){const x=110+d*230;guides.push({type:'label',x,y:35,text:`Generation ${d+1}`});row.sort(byBirth).forEach((p,i)=>positions.set(p.id,{x,y:100+i*(h-170)/Math.max(1,row.length-1)}));}
 }else if(['ancestors','descendants','hourglass'].includes(mode)){
 const rows=group(list,p=>mode==='ancestors'?-(up.get(p.id).length-1):mode==='descendants'?down.get(p.id).length-1:up.has(p.id)?-(up.get(p.id).length-1):down.get(p.id).length-1);
 const min=Math.min(0,...rows.keys()),max=Math.max(0,...rows.keys());w=Math.max(960,...[...rows.values()].map(r=>r.length*180+100));h=Math.max(600,(max-min+1)*120+80);
 for(const[d,row]of rows){const y=80+(d-min)*(h-160)/Math.max(1,max-min);row.sort(byBirth).forEach((p,i)=>positions.set(p.id,{x:(i+1)*w/(row.length+1),y}));}
 }else if(mode==='radial'||mode==='fan'){
 const distances=new Map([[selected,0]]);if(mode==='fan')for(const[id,path]of up)distances.set(id,path.length-1);else{const q=[selected];for(let i=0;i<q.length;i++)for(const[a,b]of links){const next=a===q[i]?b:b===q[i]?a:null;if(next&&!distances.has(next)){distances.set(next,distances.get(q[i])+1);q.push(next);}}}
 const depth=Math.max(1,...distances.values()),rows=group(list,p=>distances.get(p.id)??-1),largest=Math.max(1,...[...rows.values()].map(r=>r.length));const step=Math.max(115,largest*34/depth);const radius=depth*step;w=Math.max(960,2*radius+270);h=mode==='fan'?Math.max(600,radius+240):Math.max(600,2*radius+240);const cx=w/2,cy=mode==='fan'?h-100:h/2;
 for(const[d,row]of rows){if(d<0){row.forEach((p,i)=>positions.set(p.id,{x:90+i*160,y:h-35}));note='Disconnected people appear below the rings.';continue;}if(d===0){positions.set(selected,{x:cx,y:cy});continue;}guides.push({type:mode==='fan'?'semicircle':'circle',x:cx,y:cy,r:d*step});row.sort(byBirth).forEach((p,i)=>{const angle=mode==='fan'?Math.PI+(i+.5)*Math.PI/row.length:-Math.PI/2+i*2*Math.PI/row.length;positions.set(p.id,{x:cx+d*step*Math.cos(angle),y:cy+d*step*Math.sin(angle)});});}
 }else if(mode==='lifespans'){
 list=[...list].sort(byBirth);h=Math.max(600,list.length*64+100);const years=list.flatMap(p=>[p.birth,p.death]).filter(Number.isFinite),min=years.length?Math.min(...years):1900,max=years.length?Math.max(...years,min+1):2000;const x=y=>220+(y-min)*650/(max-min);for(let i=0;i<=4;i++){const year=Math.round(min+(max-min)*i/4);guides.push({type:'year',x:x(year),y:35,to:h-30,text:String(year)});}list.forEach((p,i)=>{const y=80+i*64;positions.set(p.id,{x:Number.isFinite(p.birth)?x(p.birth):120,y});if(Number.isFinite(p.birth))bars.set(p.id,{end:Number.isFinite(p.death)?x(p.death):Math.min(900,x(p.birth)+45),open:!Number.isFinite(p.death)});});note='Unknown death: short dotted stub only; no assumed lifespan. Unknown birth: left-hand lane.';
 }else if(mode==='arc'){
 list=[...list].sort(byBirth);w=Math.max(960,list.length*135+100);h=Math.max(600,w*.34+170);list.forEach((p,i)=>positions.set(p.id,{x:75+i*(w-150)/Math.max(1,list.length-1),y:h-130}));
 }
 return {people:list,edges:links,positions,guides,bars,w,h,note};
}
