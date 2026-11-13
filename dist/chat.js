import {people,relationships} from './data.js';
import {ROUTER_PROMPT,ROUTER_VERSION,prepareQuestion,validateRoute,answerRoute} from './chat-core.js';
import {DEFAULT_MODEL,requestJSON} from './openrouter.js';
import {chatCases,exactRoute} from './chat-evals.js';
const evalPeople=structuredClone(people);
const $=id=>document.getElementById(id);
let apiKey='',controller=null,busy=false;const stats={requests:0,verified:0,blocked:0,errors:0};
export const aiSettings=()=>({key:apiKey,model:$('ai-model').value.trim(),freeOnly:$('ai-free').checked});
export function requireAI(){const s=aiSettings();if(!s.key)throw Error('Add your OpenRouter key in Ask family → Settings first.');if(!$('ai-consent').checked)throw Error('Enable sending questions and names to OpenRouter in Settings.');return s;}
function line(text,role='assistant'){const el=document.createElement('div');el.className='chat-line '+role;el.textContent=text;$('chat-messages').append(el);el.scrollIntoView({block:'nearest'});return el;}
function evidence(answer,parent){if(!answer.evidence.length)return;const d=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Tree evidence';d.append(summary);for(const text of answer.evidence){const p=document.createElement('p');p.textContent=text;d.append(p);}if(answer.note){const p=document.createElement('p');p.textContent=answer.note;d.append(p);}parent.append(d);}
function status(){ $('chat-checks').textContent=`This session: ${stats.verified} tree-verified · ${stats.blocked} declined · ${stats.errors} request errors. Model accuracy not certified.`;}
async function route(question,settings,signal,records=people){const prepared=prepareQuestion(question,records);if(prepared.error)return {error:prepared.error};const result=await requestJSON({...settings,prompt:ROUTER_PROMPT,input:{question,candidates:prepared.candidates},signal});return {...result,route:validateRoute(result.raw,prepared.candidates)};}
export function initChat(){
 $('ai-model').value=DEFAULT_MODEL;
 $('chat-launch').onclick=()=>{$('family-chat').hidden=false;$('chat-launch').hidden=true;$('chat-question').focus();};
 $('chat-close').onclick=()=>{$('family-chat').hidden=true;$('chat-launch').hidden=false;$('chat-launch').focus();};
 $('save-ai-key').onclick=()=>{apiKey=$('ai-key').value.trim();$('ai-key').value='';$('ai-key-state').textContent=apiKey?'Key active for this tab only.':'No key connected.';};
 $('clear-ai-key').onclick=()=>{apiKey='';$('ai-key').value='';controller?.abort();document.dispatchEvent(new Event('family-key-forgotten'));$('ai-key-state').textContent='Key forgotten.';};
 $('chat-cancel').onclick=()=>controller?.abort();
 $('chat-clear').onclick=()=>{if(busy)return;$('chat-messages').replaceChildren();};
 $('chat-form').onsubmit=async e=>{e.preventDefault();if(busy)return;const question=$('chat-question').value.trim();if(!question)return;let settings;try{settings=requireAI();}catch(error){line(error.message);$('ai-settings').open=true;return;}
 busy=true;$('chat-send').disabled=true;$('chat-cancel').hidden=false;$('chat-question').value='';line(question,'user');const pending=line('Checking the tree…');controller=new AbortController();const timer=setTimeout(()=>controller.abort(),45000);stats.requests++;
 try{const result=await route(question,settings,controller.signal);if(result.error){stats.blocked++;pending.textContent=result.error;}else{const answer=answerRoute(result.route,people,relationships);pending.textContent=answer.text;evidence(answer,pending);if(answer.status==='verified')stats.verified++;else stats.blocked++;const small=document.createElement('small');small.textContent=`${answer.status==='verified'?'Verified from recorded links':'No factual answer issued'} · ${result.meta.model} · ${result.meta.elapsedMs} ms`;pending.append(small);}}
 catch(error){stats.errors++;pending.textContent=error.name==='AbortError'?'Request stopped or timed out. No answer was accepted.':error.message;}
 finally{clearTimeout(timer);busy=false;controller=null;$('chat-send').disabled=false;$('chat-cancel').hidden=true;status();}
 };
 $('chat-example').onclick=()=>{$('chat-question').value='How are Mira North and Lucas Vale related?';$('chat-question').focus();};
 $('run-chat-evals').onclick=async()=>{if(busy)return;let settings;try{settings=requireAI();}catch(e){line(e.message);return;}busy=true;$('chat-send').disabled=true;$('run-chat-evals').disabled=true;$('chat-cancel').hidden=false;controller=new AbortController();const results=[];const started=new Date().toISOString();
 for(const fixture of chatCases){if(controller.signal.aborted)break;$('eval-state').textContent=`Checking ${fixture.id} (${results.length+1}/${chatCases.length})…`;let timer=setTimeout(()=>controller.abort(),45000);try{const r=await route(fixture.question,settings,controller.signal,evalPeople);results.push({id:fixture.id,pass:exactRoute(r.route,fixture.expected),valid:!!r.route,actual:r.route||null,meta:r.meta||null});}catch(e){results.push({id:fixture.id,pass:false,error:e.name==='AbortError'?'cancelled_or_timeout':e.message});}finally{clearTimeout(timer);}}
 const report={suite:'family-chat-routing-v1',promptVersion:ROUTER_VERSION,model:settings.model,started,completed:results.length,total:chatCases.length,passed:results.filter(r=>r.pass).length,results,qualification:'One diagnostic run; not a model qualification or safety guarantee.'};
 $('eval-state').textContent=`${report.passed}/${report.total} passed; ${report.completed} completed. Download the report below.`;const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'});const link=$('eval-download');if(link.dataset.url)URL.revokeObjectURL(link.dataset.url);link.href=URL.createObjectURL(blob);link.dataset.url=link.href;link.hidden=false;busy=false;controller=null;$('chat-send').disabled=false;$('run-chat-evals').disabled=false;$('chat-cancel').hidden=true;
 };
}
