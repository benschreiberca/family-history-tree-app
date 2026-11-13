// Deterministic genealogy from recorded parent links; no model or gender guessing.
export function ancestorPaths(id,edges){
 const paths=new Map([[id,[id]]]),queue=[id];
 for(let i=0;i<queue.length;i++)for(const [parent,child,type] of edges){
  if(type==='parent'&&child===queue[i]&&!paths.has(parent)){paths.set(parent,[...paths.get(child),parent]);queue.push(parent);}
 }
 return paths;
}
const ordinal=n=>`${n}${n%100>=11&&n%100<=13?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th')}`;
const removed=n=>n===1?'once':n===2?'twice':`${n} times`;
const ancestor=n=>n===1?'parent':n===2?'grandparent':`${'great-'.repeat(n-2)}grandparent`;
const descendant=n=>n===1?'child':n===2?'grandchild':`${'great-'.repeat(n-2)}grandchild`;
function hasCycle(edges){const parents=new Map();for(const[a,b,t]of edges)if(t==='parent')parents.set(b,[...(parents.get(b)||[]),a]);const done=new Set(),active=new Set();function visit(id){if(active.has(id))return true;if(done.has(id))return false;active.add(id);for(const p of parents.get(id)||[])if(visit(p))return true;active.delete(id);done.add(id);return false;}return [...parents.keys()].some(visit);}
function connection(a,b,edges){const paths=new Map([[a,[a]]]),queue=[a];for(let i=0;i<queue.length;i++){if(queue[i]===b)return paths.get(b);for(const[x,y]of edges){const next=x===queue[i]?y:y===queue[i]?x:null;if(next&&!paths.has(next)){paths.set(next,[...paths.get(queue[i]),next]);queue.push(next);}}}return [];}
export function relationshipBetween(a,b,people,edges){
 const name=id=>people.find(p=>p.id===id)?.name||id,A=name(a),B=name(b);
 if(a===b)return {label:'Same person',text:`${A} is the same person.`,path:[a],ancestors:[]};
 if(!people.some(p=>p.id===a)||!people.some(p=>p.id===b))return {label:'Unknown person',text:'Choose two recorded people.',path:[],ancestors:[]};
 if(hasCycle(edges))return {label:'Records need review',text:'A parent relationship creates an ancestry cycle. Correct it before calculating kinship.',path:[],ancestors:[]};
 const ap=ancestorPaths(a,edges),bp=ancestorPaths(b,edges);
 if(ap.has(b)||bp.has(a)){const path=ap.has(b)?ap.get(b):[...bp.get(a)].reverse(),n=path.length-1,label=ap.has(b)?descendant(n):ancestor(n);return {label,text:`${A} is ${B}’s ${label}.`,path,ancestors:[]};}
 const common=[...ap.keys()].filter(id=>bp.has(id)).map(id=>({id,x:ap.get(id).length-1,y:bp.get(id).length-1})).sort((u,v)=>(u.x+u.y)-(v.x+v.y)||Math.max(u.x,u.y)-Math.max(v.x,v.y)||u.id.localeCompare(v.id));
 if(common.length){const {id,x,y}=common[0],ancestors=common.filter(c=>c.x===x&&c.y===y).map(c=>c.id);let label;
  if(x===1&&y===1)label='sibling';
  else if(x===1)label=`${'great-'.repeat(y-2)}aunt or uncle`;
  else if(y===1)label=`${'great-'.repeat(x-2)}niece or nephew`;
  else label=`${ordinal(Math.min(x,y)-1)} cousin${x!==y?', '+removed(Math.abs(x-y))+' removed':''}`;
  const path=[...ap.get(id),...bp.get(id).slice(0,-1).reverse()];
  return {label,text:`${A} is ${B}’s ${label}.`,path,ancestors,detail:`Shared ancestor${ancestors.length>1?'s':''}: ${ancestors.map(name).join(' and ')}. ${A} is ${x} generation${x===1?'':'s'} below; ${B} is ${y} below.`,note:'Based on recorded parent links. Missing parents can change this result; full/half and biological/adoptive distinctions are not recorded in this prototype. Other ancestral paths may exist.'};
 }
 const path=connection(a,b,edges),partner=edges.some(([x,y,t])=>t==='partner'&&((x===a&&y===b)||(x===b&&y===a)));
 return {label:partner?'Partner':path.length?'Connected through partners':'No recorded connection',text:partner?`${A} and ${B} are recorded partners.`:path.length?`${A} and ${B} are connected through a partner relationship. No shared ancestor is recorded.`:`No connection between ${A} and ${B} is recorded. This does not prove they are unrelated.`,path,ancestors:[]};
}
export function pathSteps(path,people,edges){const name=id=>people.find(p=>p.id===id)?.name||id;return path.slice(1).map((id,i)=>{const prev=path[i],edge=edges.find(([a,b])=>(a===prev&&b===id)||(a===id&&b===prev));return `${name(prev)} → ${edge?.[2]==='partner'?'partner':edge?.[0]===prev?'child':'parent'} → ${name(id)}`;});}
