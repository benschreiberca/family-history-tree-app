export const PROFILE_VERSION='1.0.0';
export const ARCHIVES=[
 {id:'familysearch',name:'FamilySearch · historical records',url:'https://www.familysearch.org/en/search/'},
 {id:'lac-birth',name:'Canada · birth records',url:'https://www.canada.ca/en/library-archives/collection/research-help/genealogy-family-history/birth-marriage-death-records.html'},
 {id:'lac-arrival',name:'Canada · passenger lists 1865–1935',url:'https://www.canada.ca/en/library-archives/collection/research-help/genealogy-family-history/immigration/passenger-lists-1865-1935.html'},
 {id:'lac-immigration',name:'Canada · immigration collections',url:'https://www.canada.ca/en/library-archives/collection/research-help/genealogy-family-history/immigration.html'}
];
export function safeUrl(value){try{const u=new URL(value);if(!['https:','http:'].includes(u.protocol)||u.username||u.password)throw Error();return u.href;}catch{throw Error('Enter an HTTP or HTTPS source link.');}}
export function newRecord(input){
 const text=k=>String(input[k]||'').trim();
 if(!['birth','immigration','residence','death','other'].includes(input.type))throw Error('Choose an event type.');
 if(!text('title')||!text('finding')||!text('reference'))throw Error('A title, reference and finding are required.');
 const date=text('date');if(date&&!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(date))throw Error('Use YYYY, YYYY-MM or YYYY-MM-DD; leave unknown dates empty.');
 if(date.length>4){const [y,m,d]=date.split('-').map(Number);if(m<1||m>12||(d!==undefined&& (d<1||d>new Date(Date.UTC(y,m,0)).getUTCDate())))throw Error('Enter a valid calendar date.');}
 return {id:crypto.randomUUID(),type:input.type,title:text('title'),date:date||null,place:text('place')||null,url:safeUrl(text('url')),reference:text('reference'),finding:text('finding'),searchId:text('searchId')||null,status:'candidate',createdAt:new Date().toISOString(),reviewedAt:null,reviewNote:null};
}
export function reviewRecord(record,status,note){if(!['accepted','rejected','candidate'].includes(status))throw Error('Invalid review status.');if(!note?.trim())throw Error('Explain the identity match, conflict or rejection.');return {...record,status,reviewNote:note.trim(),reviewedAt:new Date().toISOString()};}
export function profileExport(person,relations,places,research={searches:[],records:[]}){
 const events=person.events.map((e,i)=>({id:`${person.id}:base:${i}`,type:e.type,date:e.year==null?null:String(e.year),place:places[e.place]?.name||null,status:person.personal?'recorded':'illustrative',sourceIds:[]}));
 if(person.death)events.push({id:`${person.id}:death`,type:'death',date:String(person.death),place:null,status:person.personal?'recorded':'illustrative',sourceIds:[]});
 for(const r of research.records.filter(r=>r.status==='accepted'))events.push({id:`${person.id}:record:${r.id}`,type:r.type,date:r.date,place:r.place,status:'reviewed',sourceIds:[r.id],description:r.finding});
 events.sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999'));
 return {format:'family-history-person',schemaVersion:PROFILE_VERSION,person:{id:person.id,name:person.name,biography:{text:person.bio,kind:person.personal?'recorded-memory':'illustrative',sourceQuotes:person.sourceQuotes||[]},events},relationships:relations.filter(([a,b])=>a===person.id||b===person.id).map(([from,to,type])=>({from,to,type})),research:structuredClone(research)};
}
