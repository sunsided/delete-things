(function boot(){
if(!window.DeleteFX||!window.DeleteFX.kit)return setTimeout(boot,50);
const {INK,CARD,MUTE,RED,GREEN,LINE,ORANGE,GOLD,FONT,MONO,sp,S,h,A,wait,rnd,rel,place,at,jit,trash,btn,ring,burst,simple}=window.DeleteFX.kit;
const TEAL='#2a9fb0',SAND='#e2cfa3',PURPLE='#7a5cc4';
const say=(stage,text,cx,cy,o={})=>{const e=at(stage,h('div',{font:`500 12px/1.3 ${MONO}`,color:MUTE,whiteSpace:'nowrap',textAlign:'center',...o},text),cx,cy);A(e,[{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],200);return e};
const unsay=e=>A(e,[{opacity:1},{opacity:0}],180).then(()=>e.remove());
const tween=(d,f,ease=t=>t)=>new Promise(ok=>{const t0=performance.now(),D=d/sp();const step=t=>{const p=Math.min(1,(t-t0)/D);f(ease(p));p<1?requestAnimationFrame(step):ok()};requestAnimationFrame(step)});
const outC=t=>1-Math.pow(1-t,3);
const hide=async b=>{await A(b,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.92)'}],160);b.style.visibility='hidden'};
const checkMark=()=>h('i',{position:'absolute',left:'7px',top:'3px',width:'5px',height:'10px',borderRight:'2px solid #fff',borderBottom:'2px solid #fff',transform:'rotate(45deg)'});
const arc=(x0,y0,x1,y1,hg,n=10)=>Array.from({length:n+1},(_,i)=>{const t=i/n;return[x0+(x1-x0)*t,y0+(y1-y0)*t-hg*4*t*(1-t)]});
const toBall=async(b,r)=>{S(b,{width:r.w+'px'});A(b._icon,[{opacity:1},{opacity:0}],150);await A(b._text,[{opacity:1},{opacity:0}],150);
  await A(b,[{width:r.w+'px',padding:'0 22px',borderRadius:'10px',transform:'rotate(0) scale(1)',background:CARD},{width:'48px',padding:'0',borderRadius:'48% 52% 42% 58%',transform:'rotate(220deg) scale(.55)',background:'#e2dbcc'}],{duration:560,easing:'cubic-bezier(.6,0,.3,1)'})};

window.DeleteFX.register({

runaway:ctx=>{
  const {stage}=ctx,b=btn();stage.append(b);let n=0,tx=0,ty=0,moving=false;const msgs=['nope','too slow','lol no'];
  const dodge=async()=>{if(moving||ctx.busy||n>=3)return;moving=true;
    const W=stage.clientWidth,H=stage.clientHeight,mx=W/2-b.offsetWidth/2-12,my=H/2-b.offsetHeight/2-12;let nx,ny,g=0;
    do{nx=rnd(-mx,mx);ny=rnd(-my,my)}while(Math.hypot(nx-tx,ny-ty)<90&&g++<30);
    const m=say(stage,msgs[n],W/2+tx,H/2+ty-38,{color:RED});setTimeout(()=>unsay(m),650/sp());
    await A(b,[{transform:`translate(${tx}px,${ty}px)`},{transform:`translate(${nx}px,${ny}px)`}],{duration:260,easing:'cubic-bezier(.2,1.3,.4,1)'});
    tx=nx;ty=ny;n++;moving=false;if(n>=3)b._text.textContent='fine.';};
  const give=async()=>{if(ctx.busy)return;ctx.busy=b._busy=true;
    await A(b,[{transform:`translate(${tx}px,${ty}px) rotate(0)`,opacity:1},{transform:`translate(${tx}px,${ty+6}px) rotate(-6deg)`,offset:.3,opacity:1},{transform:`translate(${tx}px,${ty+24}px) rotate(-12deg) scale(.6)`,opacity:0}],600);
    ctx.finish('Caught it');};
  b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')dodge()});
  b.onclick=()=>n<3?dodge():give();
  stage._play=async()=>{while(n<3&&!ctx.busy){await dodge();await wait(300)}await wait(300);give()};
},

cookies:ctx=>{
  const {stage}=ctx,b=btn();stage.append(b);
  const play=async()=>{if(ctx.busy)return;ctx.busy=b._busy=true;const r=rel(stage,b);
    const acc=h('button',{height:'30px',padding:'0 12px',border:'none',borderRadius:'6px',background:'#f39a83',color:INK,font:`600 12px/1 ${FONT}`,cursor:'pointer',flex:'none'},'Accept');
    const ban=h('div',{position:'absolute',left:'12px',right:'12px',bottom:'12px',display:'flex',alignItems:'center',gap:'10px',padding:'9px 9px 9px 14px',background:INK,color:CARD,borderRadius:'8px',font:`400 12px/1.35 ${FONT}`},[h('span',{flex:'1'},'We use cookies to delete this button.'),acc]);
    stage.append(ban);await A(ban,[{transform:'translateY(80px)'},{transform:'none'}],{duration:350,easing:'cubic-bezier(.3,1.3,.5,1)'});
    await new Promise(ok=>{acc.onclick=ok;if(ctx.auto)setTimeout(ok,900/sp())});
    A(ban,[{transform:'none'},{transform:'translateY(90px)'}],300);
    S(b,{width:r.w+'px'});A(b._icon,[{opacity:1},{opacity:0}],150);await A(b._text,[{opacity:1},{opacity:0}],150);
    await A(b,[{width:r.w+'px',height:'48px',padding:'0 22px',borderRadius:'10px',background:CARD,borderColor:INK},{width:'52px',height:'52px',padding:'0',borderRadius:'50%',background:'#c9955a',borderColor:'#8a5a2b'}],{duration:420,easing:'cubic-bezier(.3,1.3,.5,1)'});
    [[12,12],[29,9],[21,25],[34,30],[11,33]].forEach(([x,y])=>b.append(h('i',{position:'absolute',left:x+'px',top:y+'px',width:'7px',height:'6px',borderRadius:'50%',background:'#4a2c17'})));
    await wait(350);await A(b,jit(7,2),{duration:240,easing:'linear'});
    b.style.visibility='hidden';
    await burst(stage,r.cx,r.cy,22,['#c9955a','#a8743f','#4a2c17'],[18,70]);
    ctx.finish('Cookies accepted');};
  b.onclick=play;stage._play=()=>{ctx.auto=true;play()};
},

loading:simple(async({stage},b)=>{
  const r=rel(stage,b);await hide(b);
  const fill=h('i',{position:'absolute',left:0,top:0,bottom:0,width:'0%',background:INK});
  const track=h('div',{position:'relative',width:'200px',height:'10px',border:`1.5px solid ${INK}`,borderRadius:'6px',overflow:'hidden',boxSizing:'border-box'},fill);
  const lab=h('div',{font:`500 13px/1 ${MONO}`,color:INK},'Deleting… 0%'),sub=h('div',{font:`400 12px/1 ${MONO}`,color:MUTE,height:'12px'},'');
  const box=at(stage,h('div',{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',width:'220px'},[lab,track,sub]),r.cx,r.cy);
  const set=(p,d=0)=>{fill.style.width=p+'%';lab.textContent=`Deleting… ${p.toFixed(d)}%`};
  await tween(900,t=>set(99*t),outC);
  sub.textContent='almost there…';await wait(600);
  await tween(1300,t=>set(99+.9*t,1));
  sub.textContent='recalculating';await wait(500);
  await tween(260,t=>set(99.9-87.9*t),outC);sub.textContent='hmm.';await wait(700);
  set(100);lab.textContent='Done. Don’t ask.';sub.textContent='';await wait(700);
  await A(box,[{opacity:1},{opacity:0}],200);
  return 'Finally';
}),

robot:ctx=>{
  const {stage}=ctx,b=btn();stage.append(b);
  const play=async()=>{if(ctx.busy)return;ctx.busy=b._busy=true;const r=rel(stage,b);await hide(b);
    const cb=h('button',{position:'relative',width:'24px',height:'24px',border:`2px solid ${INK}`,borderRadius:'4px',background:'#fff',cursor:'pointer',padding:0,flex:'none',boxSizing:'border-box'});
    const tx=h('span',{flex:'1',font:`500 14px/1.2 ${FONT}`,color:INK},'I’m not a robot');
    const card=at(stage,h('div',{display:'flex',alignItems:'center',gap:'12px',width:'236px',boxSizing:'border-box',padding:'14px 16px',background:'#fff',border:`1px solid ${LINE}`,borderRadius:'6px'},[cb,tx]),r.cx,r.cy);
    A(card,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],250);
    await new Promise(ok=>{cb.onclick=ok;if(ctx.auto)setTimeout(ok,700/sp())});
    cb.onclick=null;S(cb,{border:`2px solid ${LINE}`,borderTopColor:INK,borderRadius:'50%',cursor:'default'});
    const spin=cb.animate([{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:600,iterations:Infinity});
    await wait(1100);spin.cancel();S(cb,{border:`2px solid ${RED}`,borderRadius:'4px'});
    tx.textContent='You clicked too fast.';const n1=say(stage,'suspiciously robotic',r.cx,r.cy+46,{color:RED});
    await wait(1300);unsay(n1);
    tx.textContent='I’m not a robot';S(cb,{border:`2px solid ${GREEN}`,background:GREEN});cb.append(checkMark());
    const n2=say(stage,'fine, we’ll allow it',r.cx,r.cy+46);
    await wait(900);unsay(n2);await A(card,[{opacity:1},{opacity:0}],200);
    ctx.finish('Probably human');};
  b.onclick=play;stage._play=()=>{ctx.auto=true;play()};
},

sneeze:simple(async({stage},b)=>{
  const r=rel(stage,b),t=b._text;S(b,{minWidth:r.w+'px'});b._icon.style.display='none';b.style.transformOrigin='50% 100%';
  let prev='none';
  for(const [l,s,a] of [['ah…',1.05,-4],['ah…!',1.11,-8],['AH…!!',1.18,-12]]){t.textContent=l;const nx=`scale(${s}) rotate(${a}deg) translateX(-4px)`;
    await A(b,[{transform:prev},{transform:nx}],{duration:380,easing:'cubic-bezier(.3,0,.5,1)'});prev=nx;await wait(200)}
  await wait(300);t.textContent='CHOO!';
  for(let i=0;i<24;i++){const s=rnd(2,5),p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'50%',background:i%3?'#9cc3d5':'#cfe1e9',opacity:0}),r.r-6,r.cy+rnd(-8,8));stage.append(p);
    A(p,[{opacity:1,transform:'translate(0,0)'},{opacity:0,transform:`translate(${rnd(60,160)}px,${rnd(-40,40)}px)`}],{duration:rnd(400,700),easing:'cubic-bezier(.1,.8,.3,1)'})}
  await A(b,[{transform:prev},{transform:'scale(1) rotate(10deg) translateX(10px)',offset:.12},{transform:`translateX(-${r.x+r.w+60}px) rotate(-30deg)`}],{duration:700,easing:'cubic-bezier(.2,.7,.4,1)'});
  return 'Bless you';
}),

nope:simple(async({stage},b)=>{
  const r=rel(stage,b),t=b._text;S(b,{minWidth:r.w+'px'});
  const shake=()=>A(b,['0','28','-28','20','-12','0'].map(d=>({transform:`perspective(400px) rotateY(${d}deg)`})),{duration:600,easing:'ease-in-out'});
  t.textContent='Nope.';await shake();await wait(450);
  t.textContent='Still no.';await shake();await wait(450);
  t.textContent='…fine.';await wait(600);
  const s=say(stage,'*sigh*',r.cx,r.y-18);
  b.style.transformOrigin='0% 100%';
  await A(b,[{transform:'none',opacity:1},{transform:'rotate(6deg) translateY(4px)',opacity:.85,offset:.35},{transform:`rotate(8deg) translate(${-r.x-r.w-30}px,10px)`,opacity:0}],{duration:1900,easing:'cubic-bezier(.4,0,.8,.6)'});
  unsay(s);
  return 'It left. Eventually.';
}),

approval:simple(async({stage},b)=>{
  const r=rel(stage,b);await hide(b);
  const list=place(h('div',{display:'flex',flexDirection:'column',gap:'9px',width:'240px'}),r.cx-120,24);stage.append(list);
  const steps=[['Deletion request submitted',400],['Manager approval',700],['Legal review',800],['Notifying 14 stakeholders',600],['Second manager approval',1100]];
  for(const [txt,d] of steps){
    const ic=h('span',{width:'12px',height:'12px',borderRadius:'50%',border:`2px solid ${LINE}`,borderTopColor:INK,boxSizing:'border-box',flex:'none'});
    const row=h('div',{display:'flex',alignItems:'center',gap:'8px',font:`500 12px/1 ${MONO}`,color:INK},[ic,h('span',{},txt+'…')]);list.append(row);
    A(row,[{opacity:0,transform:'translateX(-6px)'},{opacity:1,transform:'none'}],200);
    const sp_=ic.animate([{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:600,iterations:Infinity});
    await wait(d);sp_.cancel();S(ic,{border:'none',background:GREEN,position:'relative'});ic.append(h('i',{position:'absolute',left:'4px',top:'1.5px',width:'3px',height:'6px',borderRight:'1.5px solid #fff',borderBottom:'1.5px solid #fff',transform:'rotate(45deg)'}));
  }
  const st=at(stage,h('div',{padding:'5px 10px 4px',border:`2.5px solid ${RED}`,borderRadius:'5px',color:RED,font:`700 15px/1 ${MONO}`,letterSpacing:'.14em',mixBlendMode:'multiply'},'APPROVED'),r.cx,stage.clientHeight-30);
  await A(st,[{opacity:0,transform:'rotate(-10deg) scale(2.4)'},{opacity:1,transform:'rotate(-8deg) scale(1)'}],{duration:260,easing:'cubic-bezier(.6,0,.9,.6)'});
  A(stage,jit(5,2),{duration:200,easing:'linear'});
  await wait(900);
  await Promise.all([A(list,[{opacity:1},{opacity:0}],200),A(st,[{opacity:1},{opacity:0}],200)]);
  return 'Approved in triplicate';
}),

reverse:simple(async({stage},b)=>{
  const r=rel(stage,b),t=b._text;
  t.textContent='OK, I won’t.';await A(b,[{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],300);
  await wait(1000);
  const s=say(stage,'…',r.cx,r.y-18);await wait(600);unsay(s);
  await A(b,[{transform:'scale(1)',opacity:1},{transform:'scale(1.1,.9)',offset:.2,opacity:1},{transform:'scale(0,1)',opacity:0}],{duration:260,easing:'cubic-bezier(.6,0,.9,.4)'});
  return 'Deleted anyway';
},{label:'Don’t delete'}),

shrink:simple(async({stage},b)=>{
  const r=rel(stage,b);
  await A(b,[{transform:'scale(1)'},{transform:'scale(1.1)',offset:.15},{transform:'scale(.025)'}],{duration:1300,easing:'cubic-bezier(.5,0,.2,1)'});
  const s=say(stage,'← technically deleted',0,0);S(s,{left:r.cx+10+'px',top:r.cy-8+'px'});
  await wait(1600);
  return null;
}),

snail:simple(async({stage},b)=>{
  const r=rel(stage,b),t=b._text;S(b,{minWidth:r.w+60+'px'});S(t,{font:`500 13px/1 ${MONO}`});t.textContent='Deleting… 0.000%';
  const sn=place(h('div',{width:'46px',height:'30px'},[
    h('i',{position:'absolute',left:'2px',bottom:0,width:'42px',height:'9px',borderRadius:'8px 10px 4px 4px',background:'#a8a196'}),
    h('i',{position:'absolute',left:'8px',bottom:'5px',width:'24px',height:'24px',borderRadius:'50%',background:SAND,border:'2px solid #b89c62',boxSizing:'border-box'}),
    h('i',{position:'absolute',left:'15px',bottom:'12px',width:'10px',height:'10px',borderRadius:'50%',border:'2px solid #b89c62',boxSizing:'border-box'}),
    h('i',{position:'absolute',left:'38px',bottom:'7px',width:'1.5px',height:'13px',background:'#a8a196',transform:'rotate(20deg)',transformOrigin:'bottom'}),
    h('i',{position:'absolute',left:'41px',bottom:'18px',width:'4px',height:'4px',borderRadius:'50%',background:INK})]),14,stage.clientHeight-42);
  stage.append(sn);
  const eta=say(stage,'ETA: 3–5 business days',r.cx,r.b+20);
  A(sn,[{transform:'translateX(0)'},{transform:'translateX(36px)'}],{duration:2600,easing:'linear'});
  sn.firstChild.animate([{transform:'scaleX(1)'},{transform:'scaleX(1.08)'}],{duration:400,iterations:6,direction:'alternate'});
  await tween(2600,p=>t.textContent=`Deleting… ${(p*.004).toFixed(3)}%`);
  unsay(eta);t.textContent='…eh, close enough';await wait(800);
  await A(b,[{transform:'scale(1)',opacity:1},{transform:'scale(0)',opacity:0}],{duration:220,easing:'cubic-bezier(.6,0,.9,.4)'});
  await A(sn,[{opacity:1},{opacity:0}],300);
  return 'Close enough';
}),

oops:simple(async({stage},b)=>{
  const info=stage.nextElementSibling,r=rel(stage,b);
  if(info)await A(info,[{transform:'none',opacity:1},{transform:'translateY(30px) rotate(-3deg)',opacity:0}],{duration:500,easing:'cubic-bezier(.5,0,.9,.6)'});
  const s=say(stage,'wait… wrong one',r.cx,r.y-20,{color:RED});
  A(b,jit(8,2),{duration:400,easing:'linear'});await wait(1000);
  if(info){await A(info,[{transform:'translateY(30px) rotate(-3deg)',opacity:0},{transform:'none',opacity:1}],{duration:500,easing:'cubic-bezier(.3,1.4,.5,1)'});info.getAnimations().forEach(a=>a.cancel())}
  unsay(s);await wait(300);
  await A(b,[{transform:'scale(1)',opacity:1},{transform:'scale(0)',opacity:0}],{duration:300,easing:'cubic-bezier(.6,0,.9,.4)'});
  return 'Right one this time';
}),

bonk:simple(async({stage},b)=>{
  const r=rel(stage,b),o=btn();place(o,r.x,-60,{width:r.w+'px'});o.style.pointerEvents='none';stage.append(o);
  const land=r.y-r.h+60;
  await A(o,[{transform:'translateY(0) rotate(-8deg)'},{transform:`translateY(${land}px) rotate(3deg)`}],{duration:420,easing:'cubic-bezier(.55,0,1,.45)'});
  b.style.transformOrigin='50% 100%';
  A(b,[{transform:'scaleY(1)'},{transform:'scaleY(.8)'},{transform:'scaleY(1)'}],{duration:220,easing:'cubic-bezier(.3,0,.5,1)'});
  await A(o,[{transform:`translateY(${land}px) rotate(3deg)`},{transform:`translateY(${land-14}px) rotate(-5deg)`,offset:.4},{transform:`translateY(${land+r.h*.2}px) rotate(2deg)`}],{duration:300,easing:'cubic-bezier(.3,0,.5,1)'});
  const cy=r.y+6,stars=[0,1,2,3].map(i=>{const s=place(h('i',{width:'7px',height:'7px',background:GOLD,transform:'rotate(45deg)'}),r.cx-3,cy);stage.append(s);
    const k=[];for(let j=0;j<=8;j++){const a=(j/8+i/4)*Math.PI*2;k.push({transform:`translate(${Math.cos(a)*34}px,${Math.sin(a)*8}px) rotate(45deg)`})}
    s.animate(k,{duration:800/sp(),iterations:Infinity});return s});
  const d=say(stage,'@#$%!',r.cx,r.b+20);
  await wait(1300);stars.forEach(s=>s.remove());unsay(d);
  await Promise.all([A(o,[{opacity:1},{opacity:0}],250),A(b,[{opacity:1},{opacity:0}],250)]);
  return 'Delete deleted Delete';
}),

hydra:ctx=>{
  const {stage}=ctx,b=btn();stage.append(b);let lvl=0,heads=[b],cap=null;
  const L=[[1,1,1],[2,1,.8],[2,2,.62],[4,2,.4]],caps=['','cut one off…','two more grow back','uh oh'];
  const grow=async()=>{if(ctx.busy)return;ctx.busy=b._busy=true;lvl++;
    const W=stage.clientWidth,H=stage.clientHeight,bw=b.offsetWidth,bh=b.offsetHeight;
    if(lvl>=L.length){cap&&unsay(cap);const sr=stage.getBoundingClientRect();
      heads.forEach(x=>{const q=x.getBoundingClientRect(),cx=q.left-sr.left+q.width/2,cy=q.top-sr.top+q.height/2;x.style.visibility='hidden';burst(stage,cx,cy,8,[RED,INK,LINE],[20,50]);ring(stage,cx,cy,RED,50)});
      await wait(700);ctx.finish('Hydra slain');return}
    const [c,rw,s]=L[lvl],gx=bw*s+8,gy=bh*s+8;
    heads.forEach(x=>x!==b&&x.remove());b.style.visibility='hidden';heads=[];
    for(let j=0;j<rw;j++)for(let i=0;i<c;i++){const ox=(i-(c-1)/2)*gx,oy=(j-(rw-1)/2)*gy+8,x=btn();place(x,W/2-bw/2,H/2-bh/2,{width:bw+'px'});x.onclick=grow;stage.append(x);heads.push(x);
      A(x,[{transform:`translate(0,0) scale(${s*.5})`,opacity:0},{transform:`translate(${ox}px,${oy}px) scale(${s})`,opacity:1}],{duration:400,easing:'cubic-bezier(.3,1.5,.5,1)'})}
    cap&&unsay(cap);cap=say(stage,caps[lvl],W/2,20,{color:lvl===3?RED:MUTE});
    await wait(420);ctx.busy=b._busy=false;};
  b.onclick=grow;
  stage._play=async()=>{while(lvl<L.length){await grow();await wait(550)}};
},

ship:simple(async({stage},b)=>{
  const r=rel(stage,b),W=stage.clientWidth,bx=r.cx-50,by=r.b+2;
  const fl=h('i',{position:'absolute',left:0,top:0,width:'50px',height:'8px',background:'#b58d55',border:`1.5px solid ${INK}`,boxSizing:'border-box',transformOrigin:'0 100%',transform:'rotate(-125deg)'});
  const fr=h('i',{position:'absolute',left:'50px',top:0,width:'50px',height:'8px',background:'#b58d55',border:`1.5px solid ${INK}`,boxSizing:'border-box',transformOrigin:'100% 100%',transform:'rotate(125deg)'});
  const body=h('i',{position:'absolute',left:0,top:'8px',width:'100px',height:'54px',background:'#c9a46b',border:`1.5px solid ${INK}`,borderRadius:'0 0 3px 3px',boxSizing:'border-box'});
  const tape=h('i',{position:'absolute',left:'43px',top:'4px',width:'14px',height:'30px',background:'rgba(240,228,190,.92)',transformOrigin:'top',transform:'scaleY(0)'});
  const lab=h('div',{position:'absolute',left:0,right:0,top:'40px',textAlign:'center',font:`600 11px/1 ${MONO}`,color:INK},'/dev/null');
  const g=place(h('div',{width:'100px',height:'62px'},[body,fl,fr,tape,lab]),bx,by-8);stage.append(g);
  await A(g,[{transform:'translateY(90px)',opacity:0},{transform:'none',opacity:1}],{duration:380,easing:'cubic-bezier(.3,1.3,.5,1)'});
  const drop=by+30-r.cy;
  await A(b,[{transform:'none'},{transform:'translateY(-22px) scale(.55)',offset:.4},{transform:`translateY(${drop}px) scale(.4)`}],{duration:620,easing:'cubic-bezier(.5,0,.6,1)'});
  b.style.visibility='hidden';
  await A(fl,[{transform:'rotate(-125deg)'},{transform:'rotate(0)'}],{duration:260,easing:'cubic-bezier(.5,0,.5,1.4)'});
  await A(fr,[{transform:'rotate(125deg)'},{transform:'rotate(0)'}],{duration:260,easing:'cubic-bezier(.5,0,.5,1.4)'});
  await A(tape,[{transform:'scaleY(0)'},{transform:'scaleY(1)'}],{duration:220});
  await wait(250);
  await A(g,[{transform:'none'},{transform:'translateY(-8px) rotate(-3deg)',offset:.2},{transform:`translate(${W-bx+20}px,0) rotate(4deg)`}],{duration:700,easing:'cubic-bezier(.5,0,.8,.5)'});
  return 'Shipped to /dev/null';
}),

sleep:simple(async({stage},b)=>{
  const r=rel(stage,b),t=b._text,tilt='rotate(-8deg) translateY(4px) scale(.96)';S(b,{minWidth:r.w+'px'});
  t.textContent='5 more min';b.style.transformOrigin='50% 100%';
  await A(b,[{transform:'none'},{transform:tilt}],{duration:500,easing:'cubic-bezier(.4,0,.6,1)'});
  const br=b.animate([{transform:tilt},{transform:'rotate(-8deg) translateY(4px) scale(.98,.92)'}],{duration:700/sp(),iterations:Infinity,direction:'alternate'});
  await Promise.all([0,1,2,3].map(i=>{const z=place(h('div',{font:`600 ${12+i*4}px/1 ${MONO}`,color:MUTE,opacity:0},'z'),r.r-12,r.y-8);stage.append(z);
    return A(z,[{opacity:0,transform:'translate(0,0)'},{opacity:1,offset:.3},{opacity:0,transform:`translate(${14+i*6}px,${-30-i*10}px)`}],{duration:1100,delay:i*350})}));
  br.cancel();
  const al=say(stage,'BEEP BEEP BEEP',r.cx,r.y-22,{color:RED,fontWeight:'700'});t.textContent='ugh, FINE';
  await A(b,jit(10,3),{duration:500,easing:'linear'});unsay(al);
  await A(b,[{transform:'none'},{transform:'translateY(-14px)',offset:.3},{transform:`translate(${stage.clientWidth}px,-14px)`}],{duration:700,easing:'cubic-bezier(.5,0,.8,.5)'});
  return 'Up and gone';
}),

party:simple(async({stage},b)=>{
  const r=rel(stage,b),W=stage.clientWidth,H=stage.clientHeight,cols=[RED,GOLD,TEAL,GREEN,ORANGE];
  const hat=place(h('i',{width:'22px',height:'28px',background:`repeating-linear-gradient(135deg,${GOLD} 0 5px,${RED} 5px 10px)`,clipPath:'polygon(50% 0,100% 100%,0 100%)'}),r.x+8,r.y-24);stage.append(hat);
  await A(hat,[{transform:'translateY(-60px) rotate(-30deg)',opacity:0},{transform:'rotate(-14deg)',opacity:1}],{duration:400,easing:'cubic-bezier(.3,1.5,.5,1)'});
  const big=at(stage,h('div',{font:`700 22px/1 ${FONT}`,color:INK,letterSpacing:'-.02em',opacity:0},'Congratulations!'),W/2,32);
  const sub=at(stage,h('div',{font:`400 12px/1 ${MONO}`,color:MUTE,opacity:0},'You deleted 1 file. A personal best.'),W/2,H-24);
  [big,sub].forEach((e,i)=>A(e,[{opacity:0,transform:'scale(.6)'},{opacity:1,transform:'scale(1)'}],{duration:400,delay:i*150,easing:'cubic-bezier(.3,1.6,.5,1)'}));
  for(const side of[0,1])for(let i=0;i<24;i++){const w=rnd(4,8),hh=rnd(3,6),p=place(h('i',{width:w+'px',height:hh+'px',background:cols[i%5]}),side?W-10:10,H-10);stage.append(p);
    const vx=(side?-1:1)*rnd(40,W*.55),vy=-rnd(100,190);
    A(p,[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${vx*.6}px,${vy}px) rotate(${rnd(-300,300)}deg)`,opacity:1,offset:.45},{transform:`translate(${vx}px,${vy+rnd(90,150)}px) rotate(${rnd(-600,600)}deg)`,opacity:0}],{duration:rnd(1200,1700),easing:'cubic-bezier(.2,.6,.4,1)'})}
  await A(b,[{transform:'translateY(0)'},{transform:'translateY(-10px)',offset:.25},{transform:'translateY(0)',offset:.5},{transform:'translateY(-6px)',offset:.75},{transform:'translateY(0)'}],800);
  await wait(500);
  b.style.visibility='hidden';hat.remove();ring(stage,r.cx,r.cy,GOLD,90);burst(stage,r.cx,r.cy,14,cols,[30,70]);
  await wait(1000);
  return null;
}),

onhold:simple(async({stage},b)=>{
  const r=rel(stage,b);await hide(b);
  const l1=h('div',{font:`600 15px/1.3 ${FONT}`,color:INK,textAlign:'center'},'Your deletion is important to us.');
  const l2=h('div',{font:`500 12px/1 ${MONO}`,color:MUTE},'You are number 3 in the queue');
  const box=at(stage,h('div',{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',width:'250px'},[l1,l2]),r.cx,r.cy-6);
  let stop=false;(async()=>{let i=0;while(!stop){const n=place(h('div',{font:`500 ${rnd(14,20)}px/1 ${FONT}`,color:MUTE,opacity:0},i%2?'♪':'♫'),rnd(16,stage.clientWidth-30),stage.clientHeight-30);stage.append(n);
    A(n,[{opacity:0,transform:'translate(0,0)'},{opacity:.8,offset:.2},{opacity:0,transform:`translate(${rnd(-20,20)}px,-70px) rotate(${rnd(-20,20)}deg)`}],1600).then(()=>n.remove());i++;await wait(280)}})();
  for(const n of[2,1]){await wait(1100);l2.textContent=`You are number ${n} in the queue`;A(l2,[{transform:'scale(1.12)'},{transform:'scale(1)'}],220)}
  await wait(900);l1.textContent='Connecting you to a deletion specialist…';l2.textContent='please hold';await wait(1100);stop=true;
  await A(box,[{opacity:1},{opacity:0}],200);
  return 'Connected & deleted';
}),

screensaver:simple(async({stage},b)=>{
  const W=stage.clientWidth,H=stage.clientHeight,s=.7,mx=W/2-b.offsetWidth*s/2-4,my=H/2-b.offsetHeight*s/2-4;
  const fold=(u,m)=>{const v=((u+m)%(4*m)+4*m)%(4*m);return v<2*m?v-m:3*m-v};
  const cols=[INK,RED,TEAL,GREEN,PURPLE,ORANGE],ts=[0,.2,1/3,.6,1];
  await A(b,[{transform:'scale(1)'},{transform:`scale(${s})`}],200);
  const k=ts.map((t,i)=>({offset:t,transform:`translate(${fold(5*mx*t,mx)}px,${fold(3*my*t,my)}px) scale(${s})`,borderColor:cols[i],color:cols[i]}));
  await A(b,k,{duration:2600,easing:'linear'});
  const cx=W/2+mx,cy=H/2-my;
  ring(stage,cx,cy,GOLD,120);burst(stage,cx,cy,16,[GOLD,RED,TEAL,GREEN],[30,90]);
  const c=at(stage,h('div',{font:`700 20px/1 ${FONT}`,color:INK,letterSpacing:'.02em'},'CORNER!'),W/2,H/2);
  await A(c,[{opacity:0,transform:'scale(.5) rotate(-6deg)'},{opacity:1,transform:'scale(1.1) rotate(-4deg)',offset:.4},{opacity:1,transform:'scale(1) rotate(-4deg)',offset:.8},{opacity:0,transform:'scale(1) rotate(-4deg)'}],1100);
  await A(b,[{opacity:1},{opacity:0}],200);
  return 'Worth the wait';
}),

paywall:simple(async({stage},b)=>{
  const r=rel(stage,b);await hide(b);
  const up=h('button',{height:'34px',padding:'0 14px',border:'none',borderRadius:'8px',background:RED,color:'#fff',font:`600 13px/1 ${FONT}`,cursor:'pointer'},'Upgrade');
  const no=h('button',{height:'34px',padding:'0 8px',border:'none',background:'none',color:MUTE,font:`500 13px/1 ${FONT}`,cursor:'pointer',textDecoration:'underline',textUnderlineOffset:'3px'},'No thanks');
  const title=h('div',{font:`600 15px/1.25 ${FONT}`,color:INK},'Deleting is a Pro feature');
  const sub=h('div',{font:`400 12px/1.4 ${FONT}`,color:MUTE},'$4.99/mo · cancel anytime*');
  const fine=h('div',{font:`400 10px/1 ${MONO}`,color:MUTE},'*you can’t');
  const m=at(stage,h('div',{display:'flex',flexDirection:'column',gap:'8px',padding:'16px',width:'232px',boxSizing:'border-box',background:'#fff',border:`1px solid ${LINE}`,borderRadius:'12px',boxShadow:'0 8px 24px rgba(29,27,24,.08)'},[title,sub,h('div',{display:'flex',gap:'6px',alignItems:'center',marginTop:'4px'},[up,no]),fine]),r.cx,r.cy);
  A(m,[{opacity:0,transform:'translateY(10px) scale(.96)'},{opacity:1,transform:'none'}],{duration:300,easing:'cubic-bezier(.3,1.4,.5,1)'});
  const pick=await new Promise(ok=>{up.onclick=()=>ok('up');no.onclick=()=>ok('no');setTimeout(()=>ok('no'),2600/sp())});
  up.disabled=no.disabled=true;S(up,{opacity:.4});S(no,{opacity:.4});
  title.textContent=pick==='up'?'lol, no. Free trial it is.':'Fine. Here’s a free trial.';sub.textContent='1 deletion · expires immediately';
  await wait(1200);
  await A(m,[{opacity:1,transform:'none'},{opacity:0,transform:'scale(.92)'}],200);
  return 'Deleted (trial)';
}),

binfull:simple(async({stage},b)=>{
  const r=rel(stage,b),bx=r.cx+92,top=r.cy-22,dx=bx-r.cx;
  const bin=trash(INK);place(bin,bx-7,r.cy-8,{transform:'scale(2.6)',opacity:0});bin._lid.style.transform='rotate(-28deg)';
  const junk=[[-12,-4,-22],[-1,-12,6],[9,-5,24]].map(([x,y,a])=>place(h('i',{width:'14px',height:'18px',background:'#fff',border:`1.5px solid ${INK}`,borderRadius:'2px',boxSizing:'border-box',opacity:0}),bx-7+x,top+y-8,{transform:`rotate(${a}deg)`}));
  stage.append(...junk,bin);
  [bin,...junk].forEach(e=>A(e,[{opacity:0},{opacity:1}],300));
  await toBall(b,r);
  const P=(pts,rot0)=>pts.map(([x,y],i)=>({transform:`translate(${x}px,${y}px) rotate(${rot0+i*36}deg) scale(.55)`}));
  const t1=arc(0,0,dx,-40,70).concat(arc(dx,-40,0,0,50).slice(1));
  A(junk[1],[{transform:'rotate(6deg)'},{transform:'rotate(-10deg)'},{transform:'rotate(6deg)'}],{duration:300,delay:520});
  await A(b,P(t1,220),{duration:1150,easing:'linear'});
  const s=say(stage,'bin is full',bx,top-34,{color:RED});
  await wait(500);unsay(s);
  await Promise.all(junk.map((j,i)=>A(j,[{opacity:1},{opacity:0,transform:'translateY(16px) scale(.3)'}],{duration:300,delay:i*60})));
  await A(bin,[{transform:'scale(2.6)'},{transform:'scale(2.9,2)'},{transform:'scale(2.6)'}],{duration:320,easing:'cubic-bezier(.3,0,.5,1)'});
  const t2=arc(0,0,dx,4,80);const k2=P(t2,220+20*36);k2[k2.length-1].opacity=0;
  await A(b,k2,{duration:650,easing:'linear'});
  await A(bin._lid,[{transform:'rotate(-28deg)'},{transform:'rotate(0)'}],{duration:200,easing:'cubic-bezier(.3,1.8,.5,1)'});
  await A(bin,[{opacity:1},{opacity:0}],250);
  return 'Compacted';
}),

});
})();
