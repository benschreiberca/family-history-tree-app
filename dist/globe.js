import {project,clamp} from './model.js';
// Original schematic outlines, deliberately coarse; no third-party assets.
const land=[
 [[-168,67],[-145,70],[-130,58],[-123,49],[-125,40],[-117,32],[-108,25],[-98,18],[-87,21],[-82,25],[-81,31],[-75,36],[-65,45],[-60,52],[-80,60],[-95,70],[-125,73],[-168,67]],
 [[-81,12],[-70,10],[-58,6],[-50,0],[-35,-7],[-40,-23],[-55,-35],[-68,-55],[-75,-45],[-72,-20],[-80,-5],[-81,12]],
 [[-17,37],[-5,36],[10,37],[24,32],[34,31],[42,12],[51,11],[42,-2],[40,-15],[30,-34],[18,-35],[12,-17],[8,3],[-5,5],[-17,15],[-17,37]],
 [[-10,36],[-9,43],[0,48],[10,55],[20,71],[35,69],[45,55],[62,55],[80,72],[120,73],[160,65],[180,60],[153,48],[140,35],[130,32],[122,20],[110,5],[100,10],[90,23],[80,8],[70,25],[55,25],[43,12],[35,30],[28,40],[16,40],[10,44],[2,42],[-10,36]],
 [[113,-22],[122,-15],[136,-12],[145,-16],[154,-28],[148,-39],[134,-35],[116,-34],[113,-22]],
 [[-54,60],[-44,62],[-20,74],[-30,82],[-52,81],[-64,70],[-54,60]],
 [[-8,50],[-6,58],[0,59],[2,52],[-8,50]],[[130,31],[141,45],[145,43],[138,33],[130,31]],[[166,-34],[178,-40],[168,-46],[166,-34]],[[47,-13],[50,-17],[47,-25],[44,-22],[47,-13]]
];
export class Globe {
 constructor(canvas,onSelect){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.rotation=30;this.tilt=0;this.zoom=1;this.points=[];this.onSelect=onSelect;this.selected='';this.hit=[];this.drag=null;
  new ResizeObserver(()=>this.draw()).observe(canvas);
  canvas.addEventListener('pointerdown',e=>{this.drag={x:e.clientX,y:e.clientY,r:this.rotation,moved:false};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!this.drag)return;const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;if(Math.abs(dx)>4||Math.abs(dy)>4)this.drag.moved=true;this.rotation=this.drag.r+dx*.4;this.draw();});
  canvas.addEventListener('pointerup',e=>{if(this.drag&&!this.drag.moved){const rect=canvas.getBoundingClientRect();const x=e.clientX-rect.left,y=e.clientY-rect.top;const hit=this.hit.find(p=>Math.hypot(p.x-x,p.y-y)<14);if(hit)this.onSelect(hit.id);}this.drag=null;});
  canvas.addEventListener('pointercancel',()=>this.drag=null);
 }
 update(points,selected){this.points=points;this.selected=selected;this.draw();}
 focus(place){this.rotation=-place.lon;this.draw();}
 rotate(delta){this.rotation+=delta;this.draw();}
 resizeZoom(delta){this.zoom=clamp(this.zoom+delta,.65,1.4);this.draw();}
 draw(){const rect=this.canvas.getBoundingClientRect(),w=rect.width,h=rect.height;if(!w||!h)return;const dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=w*dpr;this.canvas.height=h*dpr;const c=this.ctx;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);const r=Math.min(w*.43,h*.46)*this.zoom,cx=w/2,cy=h/2;
 const xy=(lat,lon)=>{const p=project(lat,lon,this.rotation,this.tilt);return{x:cx+p.x*r,y:cy-p.y*r,z:p.z};};
 const halo=c.createRadialGradient(cx,cy,r*.9,cx,cy,r*1.15);halo.addColorStop(0,'#83b5b52b');halo.addColorStop(1,'#83b5b500');c.fillStyle=halo;c.beginPath();c.arc(cx,cy,r*1.15,0,Math.PI*2);c.fill();
 c.save();c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.clip();const ocean=c.createRadialGradient(cx-r*.4,cy-r*.5,r*.1,cx,cy,r*1.3);ocean.addColorStop(0,'#294b57');ocean.addColorStop(.7,'#112c39');ocean.addColorStop(1,'#071720');c.fillStyle=ocean;c.fillRect(cx-r,cy-r,r*2,r*2);
 const line=(coordinates,color,width)=>{c.beginPath();let open=false;for(const [lon,lat]of coordinates){const p=xy(lat,lon);if(p.z<0){open=false;continue;}if(!open){c.moveTo(p.x,p.y);open=true;}else c.lineTo(p.x,p.y);}c.strokeStyle=color;c.lineWidth=width;c.stroke();};
 for(let lat=-60;lat<=60;lat+=30)line(Array.from({length:181},(_,i)=>[i*2-180,lat]),'#7caca324',.6);
 for(let lon=-180;lon<180;lon+=30)line(Array.from({length:91},(_,i)=>[lon,i*2-90]),'#7caca324',.6);
 // Draw dense dotted land interiors. A point-in-polygon mask avoids limb-fill artefacts.
 const inside=(x,y,poly)=>{let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))hit=!hit;}return hit;};
 c.fillStyle='#89a89a';for(let lat=-55;lat<80;lat+=2.8){for(let lon=-180;lon<180;lon+=2.8){if(!land.some(poly=>inside(lon,lat,poly)))continue;const p=xy(lat,lon);if(p.z>0){c.globalAlpha=.2+p.z*.36;c.fillRect(p.x,p.y,1.7,1.7);}}}c.globalAlpha=1;
 for(const poly of land){const dense=[];for(let i=1;i<poly.length;i++){const a=poly[i-1],b=poly[i],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/2));for(let j=0;j<=n;j++)dense.push([a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n]);}line(dense,'#8eac9860',.8);}
 c.restore();c.strokeStyle='#9cc7c546';c.lineWidth=1;c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.stroke();
 this.hit=[];const grouped=new Map();for(const item of this.points){const key=item.place.name;if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(item);}
 for(const items of grouped.values()){const item=items.find(p=>p.id===this.selected)||items[0],p=xy(item.place.lat,item.place.lon);if(p.z<.02)continue;const active=items.some(x=>x.id===this.selected);c.beginPath();c.arc(p.x,p.y,active?8:5,0,Math.PI*2);c.fillStyle=active?'#f3bd85':'#d0a67b';c.shadowColor='#f0b577';c.shadowBlur=active?17:8;c.fill();c.shadowBlur=0;c.beginPath();c.arc(p.x,p.y,active?15:10,0,Math.PI*2);c.strokeStyle='#e5ba7c66';c.stroke();this.hit.push({...p,id:item.id});c.font='10px system-ui';c.fillStyle='#f0e6d2';const label=item.place.name.split(',')[0]+(items.length>1?` · ${items.length}`:'');const tw=c.measureText(label).width;const lx=clamp(p.x+12,4,w-tw-4);c.fillText(label,lx,p.y-10);}
 }
}
