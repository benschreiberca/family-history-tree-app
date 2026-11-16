import {TreeNavigation,nearestPerson} from './navigation.js';
import {CHART_STYLES} from './chart-layouts.js';
import {initStylePicker} from './style-picker.js';
import {mountProfile} from './profile.js';
import {restoreVoice,initVoice} from './voice.js';
import {initChat} from './chat.js';
import {people,relationships,places} from './data.js';
import {MIN_YEAR,MAX_YEAR,clamp,cohort,eventAt,visiblePeople,relatives,familyDistances,focusForYear,focusLayout} from './model.js';
import {FamilyCharts} from './charts.js';
import {relationshipBetween,pathSteps} from './kinship.js';
import {Globe} from './globe.js';
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
restoreVoice();
const state={year:1870,selected:'ines',branch:'all',view:'tree',kind:'birth',query:'',chart:'timeline',compare:false,pair:[]};
document.querySelector('.world').append(document.querySelector('.style-control'));
$('view-switch-slot').append(document.querySelector('header nav'));$('branch-slot').append($('branch').closest('label'));
const charts=new FamilyCharts($('family-chart'),id=>selectPerson(id));
const globe=new Globe($('globe'),id=>selectPerson(id));

let timelineHome={x:0,y:0,w:760,h:470},timelineBox={...timelineHome};
function paintTimelineViewport(){$('tree').setAttribute('viewBox',`${timelineBox.x} ${timelineBox.y} ${timelineBox.w} ${timelineBox.h}`);}
const timelineNavigation=new TreeNavigation($('tree'),{getBox:()=>timelineBox,setBox:box=>{timelineBox=box;paintTimelineViewport();},getHome:()=>timelineHome,onSelect:selectPerson,target:e=>nearestPerson($('tree'),e,'data-id'),wheel:false});
let treeKey='',voiceDraft=null,lastDraftCount=0;

const mobile=matchMedia('(max-width:800px)');
let renderedLayout=new Map(),layoutFrame=0;
function renderTree(){
 renderComparison();
 if(voiceDraft){$('tree-view').hidden=true;$('earth-view').hidden=true;$('chart-view').hidden=false;const draftIds=new Set(voiceDraft.people.map(p=>p.id)),list=[...people,...voiceDraft.people];charts.render(list,[...relationships,...voiceDraft.links],state.chart==='timeline'?'network':state.chart,voiceDraft.selected||voiceDraft.people[0]?.id||state.selected,[]);charts.svg.querySelectorAll('[data-person]').forEach(n=>n.classList.toggle('draft-person',draftIds.has(n.dataset.person)));if(voiceDraft.people.length&&voiceDraft.people.length!==lastDraftCount){const points=voiceDraft.people.map(p=>charts.positions.get(p.id)).filter(Boolean);if(points.length){const minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x)),minY=Math.min(...points.map(p=>p.y)),maxY=Math.max(...points.map(p=>p.y)),rect=charts.svg.getBoundingClientRect(),ratio=rect.width/Math.max(1,rect.height),w=Math.max(400,maxX-minX+160,(maxY-minY+140)*ratio),h=w/ratio;charts.box={x:(minX+maxX-w)/2,y:(minY+maxY-h)/2,w,h};charts.viewport();}}lastDraftCount=voiceDraft.people.length;$('count').textContent=`${people.length} saved · ${voiceDraft.people.length} draft people`;$('chart-help').textContent='Your family, growing from your words · Drafts require review';return;}

 if(state.view==='tree'&&state.chart!=='timeline'){
 const list=visiblePeople(people,state.branch);charts.render(list,relationships,state.chart,state.selected,state.pair.length===2&&state.pair.every(Boolean)?relationshipBetween(...state.pair,people,relationships).path:[]);
 $('count').textContent=`${charts.people.length} people · ${CHART_STYLES.find(s=>s.id===state.chart)?.name}`;
 $('chart-help').textContent=charts.note||'Drag to explore · Pinch to zoom · Tap a person'; 
 charts.svg.querySelectorAll('[data-person]').forEach(n=>{n.style.opacity=!state.query||people.find(p=>p.id===n.dataset.person).name.toLowerCase().includes(state.query.toLowerCase())?1:.2;});
 return;
 }

 const list=visiblePeople(people,state.branch),ids=new Set(list.map(p=>p.id));
 const match=p=>!state.query||p.name.toLowerCase().includes(state.query.toLowerCase());
 const width=mobile.matches?380:760;if(timelineHome.w!==width){timelineHome={x:0,y:0,w:width,h:470};timelineBox={...timelineHome};}paintTimelineViewport();
 const key=state.branch+'|'+mobile.matches;
 if(key!==treeKey||!$('tree').children.length){treeKey=key;
  $('tree').innerHTML=relationships.filter(([a,b])=>ids.has(a)&&ids.has(b)).map(([a,b,type])=>`<path class="edge ${type}" data-a="${a}" data-b="${b}"/>`).join('')+list.map(p=>`<g class="node" role="button" tabindex="0" data-id="${p.id}" aria-label="${esc(p.name)}, born ${p.birth??'Birth not recorded'}"><rect width="162" height="58" rx="7"/><circle class="avatar" cx="23" cy="28" r="14"/><text class="initial" x="23" y="33" text-anchor="middle">${p.name[0]}</text><text x="45" y="24">${esc(p.name)}</text><text class="years" x="45" y="42">${p.birth??'Birth not recorded'}${p.death?' — '+p.death:' · '+esc(p.branch)}</text></g>`).join('');
  $('tree').querySelectorAll('.node').forEach(node=>{node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectPerson(node.dataset.id);}});});
 }
 const focusId=ids.has(state.selected)?state.selected:focusForYear(list,state.year,state.selected),distances=familyDistances(focusId,relationships),target=focusLayout(list,focusId,relationships,width);
 const nodes=[...$('tree').querySelectorAll('.node')],edges=[...$('tree').querySelectorAll('.edge')];
 nodes.forEach(node=>{const id=node.dataset.id,p=people.find(p=>p.id===id),distance=distances.get(id)??99;node.classList.toggle('selected',id===focusId);node.classList.remove('context');node.style.opacity=!match(p)?.15:distance===0?1:distance===1?.95:distance===2?.72:.38;node.setAttribute('aria-pressed',id===focusId?'true':'false');});
 edges.forEach(edge=>edge.classList.toggle('highlight',edge.dataset.a===focusId||edge.dataset.b===focusId));
 cancelAnimationFrame(layoutFrame);const start=new Map(renderedLayout),began=performance.now(),duration=matchMedia('(prefers-reduced-motion:reduce)').matches||!start.size?0:500;
 function paint(now){const t=duration?Math.min(1,(now-began)/duration):1,ease=1-(1-t)**3;for(const[id,to]of target){const from=start.get(id)||to;renderedLayout.set(id,{x:from.x+(to.x-from.x)*ease,y:from.y+(to.y-from.y)*ease,s:from.s+(to.s-from.s)*ease});}
  nodes.forEach(node=>{const p=renderedLayout.get(node.dataset.id);node.setAttribute('transform',`translate(${p.x},${p.y}) scale(${p.s})`);});
  edges.forEach(edge=>{const a=renderedLayout.get(edge.dataset.a),b=renderedLayout.get(edge.dataset.b);if(!a||!b)return;const partner=edge.classList.contains('partner');const ax=a.x+(partner?162:81)*a.s,ay=a.y+(partner?29:58)*a.s,bx=b.x+(partner?0:81)*b.s,by=b.y+(partner?29*b.s:0);edge.setAttribute('d',partner?`M${ax},${ay} L${bx},${by}`:`M${ax},${ay} C${ax},${(ay+by)/2} ${bx},${(ay+by)/2} ${bx},${by}`);});
  if(t<1)layoutFrame=requestAnimationFrame(paint);
 }paint(began);
 $('empty-search').hidden=!state.query||list.some(match);
 $('count').textContent=`${list.length} people · Focus: ${people.find(p=>p.id===focusId)?.name||'none'}`;
}
function followYear(){const candidates=visiblePeople(people,state.branch).filter(p=>!state.query||p.name.toLowerCase().includes(state.query.toLowerCase()));const id=focusForYear(candidates,state.year,state.selected);if(id!==state.selected){state.selected=id;renderPanel();}}
function renderPanel(){const p=people.find(p=>p.id===state.selected),rel=relatives(p.id,people,relationships);$('selected-name').textContent=p.name;$('profile-open').setAttribute('aria-label','Open life and sources for '+p.name);$('person-panel').innerHTML=`<div class="profile-top"><span>A THREAD IN THE ATLAS</span><span>↗</span></div><div class="portrait" aria-hidden="true">${p.name.split(' ').map(s=>s[0]).join('')}</div><h2>${esc(p.name)}</h2><div class="lifespan">${p.birth??'Birth not recorded'}${p.death?' — '+p.death:' · Death not recorded'}</div><dl class="profile-facts"><div><dt>Birthplace</dt><dd>${esc(places[p.events.find(e=>e.type==='birth')?.place]?.name||'Not recorded')}</dd></div><div><dt>Last recorded residence</dt><dd>${esc((()=>{const e=[...p.events].filter(e=>e.type==='residence').sort((a,b)=>b.year-a.year)[0];return e?places[e.place]?.name+' · '+e.year:'Not recorded';})())}</dd></div></dl><p class="bio">${esc(p.bio)}</p><p class="panel-note">${p.personal?'Reviewed voice addition. Saved only in this browser.':'Fictional demonstration record. Biography and places are illustrative.'}</p>`;
 mountProfile($('person-panel'),p,relationships,places,id=>selectPerson(id));
 $('person-panel').querySelectorAll('[data-relative]').forEach(b=>b.onclick=()=>selectPerson(b.dataset.relative));}
function selectPerson(id){if(voiceDraft?.people.some(p=>p.id===id)){document.dispatchEvent(new CustomEvent('draft-person-selected',{detail:{id}}));return;}if(state.compare){if(state.pair.length===2&&state.pair.every(Boolean))state.pair=[];if(!state.pair.includes(id)){if(!state.pair[0])state.pair[0]=id;else state.pair[1]=id;}}state.selected=id;const p=people.find(p=>p.id===id);if(state.branch!=='all'&&p.branch!==state.branch){state.branch='all';$('branch').value='all';}renderPanel();renderTree();updateGlobe(true);}
function mapPoints(){return visiblePeople(people,state.branch).filter(p=>!state.query||p.name.toLowerCase().includes(state.query.toLowerCase())).flatMap(p=>{const e=eventAt(p,state.view==='earth'?MAX_YEAR:state.year,state.kind);return e&&places[e.place]?[{id:p.id,name:p.name,year:e.year,place:places[e.place]}]:[];});}
function updateGlobe(focus=false){const points=mapPoints();globe.update(points,state.selected);if(focus){const p=points.find(p=>p.id===state.selected);if(p)globe.focus(p.place);}const grouped=new Map();for(const p of points){if(!grouped.has(p.place.name))grouped.set(p.place.name,[]);grouped.get(p.place.name).push(p);}$('locations').innerHTML=points.length?[...grouped].map(([name,group])=>`<button data-place="${group.find(p=>p.id===state.selected)?.id||group[0].id}" class="${group.some(p=>p.id===state.selected)?'active':''}" title="${esc(group.map(p=>p.name+' ('+p.year+')').join(', '))}">${esc(name)} · ${group.length}</button>`).join(''):'<p class="map-note">No recorded locations match this filter.</p>';$('locations').querySelectorAll('button').forEach(b=>b.onclick=()=>selectPerson(b.dataset.place));}
function renderYear(){$('progress').style.width=`${100*(state.year-MIN_YEAR)/(MAX_YEAR-MIN_YEAR)}%`;renderTree();if(state.view==='earth')updateGlobe();}
function maxScroll(){return Math.max(1,document.documentElement.scrollHeight-innerHeight);}
function goYear(year){state.year=clamp(Math.round(year),MIN_YEAR,MAX_YEAR);followYear();window.scrollTo({top:(state.year-MIN_YEAR)/(MAX_YEAR-MIN_YEAR)*maxScroll(),behavior:'instant'});renderYear();}
let queued=false;window.addEventListener('scroll',()=>{if((document.body.classList.contains('voice-workspace-open')||document.body.classList.contains('voice-inline-open'))||!$('profile-drawer').hidden||!$('search-tools').hidden||!$('explore-tools').hidden||state.view==='earth'||state.chart!=='timeline'||(document.activeElement?.closest('#person-panel')||$('person-panel').matches(':hover'))||queued)return;queued=true;requestAnimationFrame(()=>{queued=false;const fraction=clamp(scrollY/maxScroll(),0,1),year=Math.round(MIN_YEAR+fraction*(MAX_YEAR-MIN_YEAR));document.documentElement.style.setProperty('--parallax',`${(fraction-.5)*40}px`);if(year!==state.year){state.year=year;followYear();renderYear();}});},{passive:true});
function setView(view){state.view=view;document.body.dataset.explorerView=view;$('canvas-navigation').hidden=view!=='tree';$('tree-view').hidden=view!=='tree'||state.chart!=='timeline';$('chart-view').hidden=view!=='tree'||state.chart==='timeline';document.querySelector('.style-control').hidden=view!=='tree';$('comparison').hidden=view!=='tree'||!state.compare;$('earth-view').hidden=view!=='earth';$('tree-mode').setAttribute('aria-pressed',view==='tree');$('earth-mode').setAttribute('aria-pressed',view==='earth');$('view-description').textContent=view==='tree'?'Scroll through generations. Select a person to explore.':'Explore where your family’s lives unfolded.';if(view==='earth')updateGlobe(true);else renderTree();}
$('tree-mode').onclick=()=>{setView('tree');closeTools();};$('earth-mode').onclick=()=>{setView('earth');closeTools();};$('branch').onchange=e=>{state.branch=e.target.value;followYear();renderTree();updateGlobe();};$('event-kind').onchange=e=>{state.kind=e.target.value;updateGlobe(true);};
$('search').oninput=e=>{state.query=e.target.value.trim();const matches=visiblePeople(people,state.branch).filter(p=>p.name.toLowerCase().includes(state.query.toLowerCase()));$('search-results').hidden=!state.query;$('search-results').innerHTML=matches.length?matches.map(p=>`<button data-result="${p.id}">${esc(p.name)} · ${p.birth??'Birth not recorded'}</button>`).join(''):'No matching people';$('search-results').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.query='';$('search').value='';selectPerson(b.dataset.result);$('search-results').hidden=true;$('search-tools').hidden=true;$('search-toggle').setAttribute('aria-expanded','false');$('profile-open').focus({preventScroll:true});if(state.chart==='timeline'&&!state.compare)goYear(people.find(p=>p.id===b.dataset.result).birth);});renderTree();updateGlobe();};$('search').onkeydown=e=>{if(e.key==='Escape'){$('search-results').hidden=true;state.query='';$('search').value='';renderTree();updateGlobe();e.target.blur();}};document.addEventListener('click',e=>{if(!e.target.closest('.filters'))$('search-results').hidden=true;});
mobile.addEventListener('change',()=>{treeKey='';renderTree();});
let comparisonKey='';
function renderComparison(){
 const key=JSON.stringify(state.pair);if(key===comparisonKey)return;comparisonKey=key;
 $('person-a').value=state.pair[0]||'';$('person-b').value=state.pair[1]||'';
 if(state.pair.filter(Boolean).length<2){$('relationship-result').textContent=state.pair.some(Boolean)?'Select another person.':'Select two people.';return;}
 const result=relationshipBetween(...state.pair,people,relationships);
 $('relationship-result').innerHTML=`<strong title="${esc(result.text)}">${esc(result.label)}</strong><details><summary aria-label="Relationship details">Details</summary><div class="relationship-popover"><strong>${esc(result.text)}</strong>${result.detail?`<p>${esc(result.detail)}</p>`:''}${pathSteps(result.path,people,relationships).map(s=>`<div>${esc(s)}</div>`).join('')||'<p>No connecting path recorded.</p>'}${result.note?`<p>${esc(result.note)}</p>`:''}</div></details>`;
}
for(const id of ['person-a','person-b'])$(''+id).innerHTML+=[...people].sort((a,b)=>a.name.localeCompare(b.name)).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');
function choosePair(){const a=$('person-a').value,b=$('person-b').value;state.pair=[a,b];renderTree();}
$('person-a').onchange=choosePair;$('person-b').onchange=choosePair;
$('compare-toggle').onclick=()=>{closeTools();state.compare=!state.compare;state.pair=[];$('compare-toggle').setAttribute('aria-pressed',state.compare);$('comparison').hidden=!state.compare;renderTree();};
$('chart-fit').onclick=()=>charts.reset();
const stylePicker=initStylePicker(id=>{state.chart=id;setView('tree');$('view-description').textContent=CHART_STYLES.find(s=>s.id===id).hint;});
renderPanel();renderYear();

document.addEventListener('click',e=>{const details=$('relationship-result').querySelector('details');if(details&&!details.contains(e.target))details.open=false;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const details=$('relationship-result').querySelector('details');if(details)details.open=false;}});

initChat();

initVoice(()=>{treeKey='';for(const id of ['person-a','person-b']){const select=$(id),value=select.value;select.innerHTML='<option value="">'+(id==='person-a'?'First person':'Second person')+'</option>'+[...people].sort((a,b)=>a.name.localeCompare(b.name)).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');select.value=value;}renderPanel();renderTree();updateGlobe();});

function closeTools(){$('explore-tools').hidden=true;$('tools-toggle').setAttribute('aria-expanded','false');}
function closeProfile(){$('profile-drawer').hidden=true;$('profile-open').setAttribute('aria-expanded','false');$('profile-open').focus({preventScroll:true});}
$('profile-open').onclick=()=>{$('profile-drawer').hidden=false;$('profile-open').setAttribute('aria-expanded','true');$('profile-close').focus({preventScroll:true});};
$('profile-close').onclick=closeProfile;
$('tools-toggle').onclick=()=>{const open=$('explore-tools').hidden;closeTools();$('explore-tools').hidden=!open;$('tools-toggle').setAttribute('aria-expanded',open);$('search-tools').hidden=true;$('search-toggle').setAttribute('aria-expanded','false');};
$('search-toggle').onclick=()=>{const open=$('search-tools').hidden;closeTools();$('search-tools').hidden=!open;$('search-toggle').setAttribute('aria-expanded',open);if(open)$('search').focus({preventScroll:true});};
$('help-toggle').onclick=()=>{closeTools();$('explorer-help').hidden=false;$('help-close').focus({preventScroll:true});};$('help-close').onclick=()=>{$('explorer-help').hidden=true;$('tools-toggle').focus({preventScroll:true});};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('profile-drawer').hidden)closeProfile();closeTools();$('search-tools').hidden=true;$('search-toggle').setAttribute('aria-expanded','false');$('explorer-help').hidden=true;}});
document.addEventListener('click',e=>{if(!e.target.closest('#explore-tools,#tools-toggle'))closeTools();});

$('compare-close').onclick=()=>{state.compare=false;state.pair=[];$('compare-toggle').setAttribute('aria-pressed','false');$('comparison').hidden=true;renderTree();$('tools-toggle').focus({preventScroll:true});};



const activeNavigation=()=>state.chart==='timeline'&&!voiceDraft?timelineNavigation:charts.navigation;
$('canvas-zoom-in').onclick=()=>activeNavigation().zoom(.8);
$('canvas-zoom-out').onclick=()=>activeNavigation().zoom(1.25);
$('canvas-fit').onclick=()=>activeNavigation().reset();
$('profile-expand').onclick=()=>{const panel=$('profile-drawer'),expanded=panel.classList.toggle('expanded');panel.style.removeProperty('width');$('profile-expand').setAttribute('aria-pressed',expanded);$('profile-expand').textContent=expanded?'Narrow panel':'Expand panel';};
let resizePanel=null;
$('profile-resize').addEventListener('pointerdown',e=>{if(e.button!==0)return;resizePanel={x:e.clientX,w:$('profile-drawer').getBoundingClientRect().width};$('profile-resize').setPointerCapture(e.pointerId);});
$('profile-resize').addEventListener('pointermove',e=>{if(!resizePanel)return;$('profile-drawer').classList.remove('expanded');$('profile-drawer').style.width=Math.max(320,Math.min(innerWidth-24,resizePanel.w+resizePanel.x-e.clientX))+'px';});
for(const event of ['pointerup','pointercancel'])$('profile-resize').addEventListener(event,()=>resizePanel=null);
$('profile-resize').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();$('profile-drawer').style.width=Math.max(320,Math.min(innerWidth-24,$('profile-drawer').getBoundingClientRect().width+(e.key==='ArrowLeft'?40:-40)))+'px';}});

$('tree').addEventListener('keydown',e=>{if(['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='0')timelineNavigation.reset();else if(['+','=','-'].includes(e.key))timelineNavigation.zoom(e.key==='-'?1.25:.8);else{timelineBox={...timelineBox,x:timelineBox.x+(e.key==='ArrowLeft'?-30:e.key==='ArrowRight'?30:0),y:timelineBox.y+(e.key==='ArrowUp'?-30:e.key==='ArrowDown'?30:0)};paintTimelineViewport();}}});

$('whole-family').onclick=()=>{closeProfile();state.branch='all';$('branch').value='all';state.query='';$('search').value='';stylePicker.choose('network');charts.navigation.reset();};
document.addEventListener('voice-draft-change',e=>{const entering=!voiceDraft&&e.detail.active;if(!e.detail.active)lastDraftCount=0;voiceDraft=e.detail.active?e.detail:null;if(entering)stylePicker.choose('network');else if(voiceDraft)setView('tree');else setView(state.view);});

$('canvas-fit').title='Zoom out to fit the current chart';$('whole-family').title='Leave a focused branch and show the complete family';
