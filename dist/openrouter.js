export const DEFAULT_MODEL='qwen/qwen3-0.6b-04-28:free';
export async function modelInfo(model,fetcher=fetch){const r=await fetcher('https://openrouter.ai/api/v1/models');if(!r.ok)throw Error('Cannot check model availability. Try again later.');const body=await r.json(),info=body.data?.find(m=>m.id===model);if(!info)throw Error('This model is not currently in the OpenRouter catalog. Choose another model.');return info;}
export async function requestJSON({key,model,prompt,input,freeOnly=true,signal,fetcher=fetch}){
 const info=await modelInfo(model,(url)=>fetcher(url,{signal}));
 if(freeOnly&&(!info.pricing||Object.values(info.pricing).some(value=>!Number.isFinite(Number(value))||Number(value)!==0)))throw Error('Free-only mode blocked this model. Select a free model or explicitly turn free-only off.');
 const started=performance.now();const response=await fetcher('https://openrouter.ai/api/v1/chat/completions',{method:'POST',signal,headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`},body:JSON.stringify({model,messages:[{role:'system',content:prompt},{role:'user',content:JSON.stringify(input)}],temperature:0,provider:{data_collection:'deny',allow_fallbacks:false},...(freeOnly?{provider:{data_collection:'deny',allow_fallbacks:false,max_price:{prompt:0,completion:0}}}:{})})});
 if(!response.ok)throw Error(response.status===401?'OpenRouter rejected the API key.':response.status===429?'OpenRouter rate limit reached. Try later.':`OpenRouter request failed (${response.status}). No model fallback was attempted.`);
 const body=await response.json(),choice=body.choices?.[0];if(body.error||!choice||choice.finish_reason!=='stop'||typeof choice.message?.content!=='string')throw Error('The model did not return a complete response. Nothing was accepted.');
 return {raw:choice.message.content,meta:{model:body.model||model,provider:body.provider||null,elapsedMs:Math.round(performance.now()-started),usage:body.usage||null}};
}
