(function(){
const INK='#1d1b18',CARD='#fbf9f4',MUTE='#8a8478',RED='#d4462f',GREEN='#3f8f5a',LINE='#d9d2c4',ORANGE='#f0a43a',GOLD='#ffd27a';
const FONT="'Instrument Sans',system-ui,sans-serif",MONO="'IBM Plex Mono',ui-monospace,monospace";
const cfg=Object.assign({speed:1,autoReset:true},window.__deleteFxCfg||{});
const sp=()=>cfg.speed||1;
const S=(e,s)=>(Object.assign(e.style,s),e);
const h=(t,s,k)=>{const e=document.createElement(t);if(s)S(e,s);if(k!=null)[].concat(k).forEach(c=>c!=null&&e.append(c));return e};
const EASE='cubic-bezier(.2,.7,.2,1)';
const A=(e,k,o)=>{o=typeof o==='number'?{duration:o}:o;return e.animate(k,{fill:'forwards',easing:EASE,...o,duration:o.duration/sp(),delay:(o.delay||0)/sp()}).finished.catch(()=>{})};
const wait=ms=>new Promise(r=>setTimeout(r,ms/sp()));
const rnd=(a,b)=>a+Math.random()*(b-a);
const rel=(stage,el)=>{const s=stage.getBoundingClientRect(),r=el.getBoundingClientRect(),x=r.left-s.left,y=r.top-s.top;return{x,y,w:r.width,h:r.height,cx:x+r.width/2,cy:y+r.height/2,b:y+r.height,r:x+r.width}};
const place=(e,x,y,s)=>S(e,{position:'absolute',left:x+'px',top:y+'px',...s});
const at=(stage,e,cx,cy)=>{place(e,0,0);stage.append(e);const b=e.getBoundingClientRect();return S(e,{left:cx-b.width/2+'px',top:cy-b.height/2+'px'})};
const jit=(n,amp,base='')=>Array.from({length:n},(_,i)=>{const z=i===0||i===n-1;return{transform:`${base} translate(${z?0:rnd(-amp,amp)}px,${z?0:rnd(-amp,amp)}px)`}});

function trash(c=INK){
  const w=h('span',{position:'relative',display:'inline-block',width:'14px',height:'17px',flex:'none'});
  const lid=h('span',{position:'absolute',left:'-1px',top:'2px',width:'16px',height:'2px',background:c,borderRadius:'1px',transformOrigin:'0% 100%'},
    h('span',{position:'absolute',left:'5px',top:'-3px',width:'6px',height:'3px',border:`1.5px solid ${c}`,borderBottom:'none',boxSizing:'border-box',borderRadius:'2px 2px 0 0'}));
  const body=h('span',{position:'absolute',left:'1px',top:'5px',width:'12px',height:'12px',border:`1.5px solid ${c}`,borderTop:'none',boxSizing:'border-box',borderRadius:'0 0 3px 3px'});
  w.append(body,lid);w._lid=lid;return w;
}
function doc(){return h('div',{position:'absolute',width:'22px',height:'28px',background:'#fff',border:`1.5px solid ${INK}`,borderRadius:'3px',boxSizing:'border-box',padding:'6px 4px',display:'flex',flexDirection:'column',gap:'3px'},
  [1,2,3].map(i=>h('i',{display:'block',height:'1.5px',background:INK,width:i===3?'60%':'100%',opacity:.6})))}
function btn(label='Delete'){
  const b=h('button',{position:'relative',height:'48px',padding:'0 22px',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'10px',border:`1.5px solid ${INK}`,borderRadius:'10px',background:CARD,color:INK,font:`500 15px/1 ${FONT}`,cursor:'pointer',boxSizing:'border-box',touchAction:'none',userSelect:'none',WebkitUserSelect:'none'});
  const ic=trash(),tx=h('span',{position:'relative',whiteSpace:'nowrap'},label);b.append(ic,tx);b._icon=ic;b._text=tx;
  b.onmouseenter=()=>{if(!b._busy)b.style.background='#f6e9e4'};b.onmouseleave=()=>{b.style.background=CARD};
  return b;
}
function split(span){const t=span.textContent;span.textContent='';return[...t].map(c=>{const s=h('span',{display:'inline-block',whiteSpace:'pre'},c);span.append(s);return s})}
function ring(stage,cx,cy,color=RED,size=90){const e=place(h('i',{width:size+'px',height:size+'px',borderRadius:'50%',border:`2px solid ${color}`,boxSizing:'border-box'}),cx-size/2,cy-size/2);stage.append(e);return A(e,[{transform:'scale(.2)',opacity:1},{transform:'scale(1)',opacity:0}],{duration:520,easing:'cubic-bezier(.1,.7,.3,1)'}).then(()=>e.remove())}
function burst(stage,cx,cy,n=18,colors=[INK,RED,LINE],dist=[50,110]){
  return Promise.all(Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2+rnd(-.3,.3),d=rnd(...dist),w=rnd(4,10),hh=rnd(3,8);
    const p=place(h('i',{width:w+'px',height:hh+'px',background:colors[i%colors.length],borderRadius:'1px'}),cx-w/2,cy-hh/2);stage.append(p);
    return A(p,[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+24}px) rotate(${rnd(-400,400)}deg)`,opacity:0}],{duration:rnd(600,950),easing:'cubic-bezier(.1,.8,.3,1)'}).then(()=>p.remove())}));
}
function badge(label){
  const chk=h('span',{width:'18px',height:'18px',borderRadius:'50%',background:GREEN,display:'grid',placeItems:'center',flex:'none'},h('i',{display:'block',width:'4px',height:'8px',borderRight:'2px solid #fff',borderBottom:'2px solid #fff',transform:'translateY(-1px) rotate(45deg)'}));
  return h('div',{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',display:'flex',alignItems:'center',gap:'8px',font:`600 14px/1 ${FONT}`,color:GREEN,whiteSpace:'nowrap'},[chk,label]);
}
function simple(fn,opts={}){return ctx=>{
  const b=btn(opts.label);ctx.stage.append(b);opts.init&&opts.init(ctx,b);
  const play=async()=>{if(ctx.busy)return;ctx.busy=b._busy=true;b.style.cursor='default';b.style.background=CARD;const r=await fn(ctx,b);ctx.finish(r===undefined?'Deleted':r)};
  b.onclick=play;ctx.stage._play=play;
}}

const FX={
classic:simple(async({stage},b)=>{
  const r=rel(stage,b),ir=rel(stage,b._icon),dx=r.cx-ir.cx,T=`translateX(${dx}px) scale(1.9)`;
  A(b,[{borderColor:INK,background:CARD},{borderColor:'rgba(0,0,0,0)',background:'rgba(0,0,0,0)'}],300);
  await A(b._text,[{opacity:1},{opacity:0}],250);
  await A(b._icon,[{transform:'none'},{transform:T}],{duration:420,easing:'cubic-bezier(.3,1.4,.5,1)'});
  await A(b._icon._lid,[{transform:'rotate(0)'},{transform:'rotate(-40deg)'}],200);
  const d=doc();place(d,r.cx-11,r.cy-112);stage.append(d);
  await A(d,[{transform:'translateY(0) rotate(-10deg)',opacity:0},{opacity:1,offset:.3},{transform:'translateY(98px) rotate(6deg) scale(.6)',opacity:1,offset:.85},{transform:'translateY(106px) scale(.4)',opacity:0}],{duration:650,easing:'cubic-bezier(.5,0,.8,.6)'});
  d.remove();
  await A(b._icon._lid,[{transform:'rotate(-40deg)'},{transform:'rotate(0)'}],{duration:200,easing:'cubic-bezier(.3,1.8,.5,1)'});
  await A(b._icon,[{transform:T,opacity:1},{transform:`translateX(${dx-14}px) scale(1.9)`,offset:.25},{transform:`translateX(${dx+130}px) scale(1.9)`,opacity:0}],{duration:560,easing:'cubic-bezier(.6,0,.8,.4)'});
}),

hold:ctx=>{
  const {stage}=ctx,b=btn('Hold to delete'),D=1200;stage.append(b);
  const fill=h('span',{position:'absolute',left:0,top:0,bottom:0,width:'100%',background:'#f2d0c6',transformOrigin:'left',transform:'scaleX(0)'});
  b.prepend(fill);S(b,{overflow:'hidden'});
  const fa=fill.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:D,fill:'both',easing:'cubic-bezier(.4,0,.8,1)'});fa.pause();
  let shake,holding=false;
  const down=e=>{if(ctx.busy)return;e&&e.preventDefault&&e.preventDefault();holding=true;b._text.textContent='Keep holding…';fa.playbackRate=sp();fa.play();
    shake=b.animate(jit(5,1.2),{duration:110,iterations:Infinity});};
  const up=()=>{if(ctx.busy||!holding)return;holding=false;shake&&shake.cancel();b._text.textContent='Hold to delete';if((fa.currentTime||0)<D){fa.playbackRate=-3*sp();fa.play()}};
  fa.onfinish=async()=>{if(ctx.busy||fa.playbackRate<0||(fa.currentTime||0)<D-1)return;ctx.busy=b._busy=true;shake&&shake.cancel();
    const r=rel(stage,b);b._text.textContent='Deleting';
    await A(b,[{transform:'scale(1)'},{transform:'scale(1.07)',offset:.3},{transform:'scale(0)',opacity:0}],{duration:420,easing:'cubic-bezier(.5,0,.7,.4)'});
    ring(stage,r.cx,r.cy,RED,110);burst(stage,r.cx,r.cy,12,[RED,INK]);await wait(300);ctx.finish();};
  b.addEventListener('pointerdown',down);['pointerup','pointerleave','pointercancel'].forEach(t=>b.addEventListener(t,up));
  b.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat&&!holding)down(e)});b.addEventListener('keyup',up);
  b.addEventListener('contextmenu',e=>e.preventDefault());
  stage._play=()=>down();
},

shredder:simple(async({stage},b)=>{
  const r=rel(stage,b),T=1200;
  A(b._icon,[{opacity:1},{opacity:0}],200);await A(b._text,[{opacity:1},{opacity:0}],200);
  await A(b,[{height:r.h+'px',background:CARD,borderRadius:'10px'},{height:'10px',background:INK,borderRadius:'5px'}],{duration:350,easing:'cubic-bezier(.5,0,.2,1)'});
  const d=doc(),dx=r.cx-11;place(d,dx,r.cy-70);stage.insertBefore(d,b);
  const p=A(d,[{transform:'translateY(-30px)',opacity:0,clipPath:'inset(0 0 0px 0)'},{transform:'translateY(0)',opacity:1,clipPath:'inset(0 0 0px 0)',offset:.25},{transform:'translateY(42px)',opacity:1,clipPath:'inset(0 0 0px 0)',offset:.45},{transform:'translateY(70px)',opacity:1,clipPath:'inset(0 0 28px 0)'}],{duration:T,easing:'linear'});
  const strips=[...Array(5)].map((_,i)=>{const s=place(h('i',{width:'3.6px',height:'28px',background:'#fff',borderLeft:`1px solid ${INK}`,borderRight:`1px solid ${INK}`,boxSizing:'border-box',transformOrigin:'top'}),dx+i*4.6,r.cy+5);stage.append(s);
    A(s,[{transform:'scaleY(0)'},{transform:'scaleY(1)'}],{duration:T*.55,delay:T*.45,easing:'linear',fill:'both'});return s});
  b.animate(jit(10,1),{duration:120,iterations:Math.ceil(T/120)});
  await p;d.remove();
  await Promise.all(strips.map((s,i)=>A(s,[{transform:'translateY(0) rotate(0)',opacity:1},{transform:`translate(${rnd(-14,14)}px,${rnd(70,100)}px) rotate(${rnd(-50,50)}deg)`,opacity:0}],{duration:700,delay:i*60,easing:'cubic-bezier(.5,0,.9,.6)'})));
  await A(b,[{opacity:1},{opacity:0,transform:'scaleX(.6)'}],250);
  return 'Shredded';
}),

dust:simple(async({stage},b)=>{
  const r=rel(stage,b),c=5,cols=Math.ceil(r.w/c),rows=Math.ceil(r.h/c),T=900,ps=[];
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){if(Math.random()<.35)continue;
    const edge=y===0||y===rows-1||x===0||x===cols-1,col=edge||Math.random()<.16?INK:'#cfc7b8',s=rnd(2.5,4.5);
    const p=place(h('i',{width:s+'px',height:s+'px',background:col,opacity:0,borderRadius:'1px'}),r.x+x*c,r.y+y*c);stage.append(p);
    ps.push(A(p,[{opacity:1,transform:'translate(0,0) rotate(0)'},{opacity:0,transform:`translate(${rnd(30,120)}px,${rnd(-80,10)}px) rotate(${rnd(-180,180)}deg) scale(.4)`}],{duration:rnd(700,1150),delay:x/cols*T+rnd(0,120),easing:'cubic-bezier(.2,.6,.4,1)'}));}
  A(b,[{clipPath:'inset(-2px -2px -2px 0%)'},{clipPath:'inset(-2px -2px -2px 100%)'}],{duration:T+120,easing:'linear'});
  await Promise.all(ps);
  return 'Dusted';
}),

crumple:simple(async({stage},b)=>{
  const r=rel(stage,b),bx=r.cx+92;S(b,{width:r.w+'px'});
  A(b._icon,[{opacity:1},{opacity:0}],150);await A(b._text,[{opacity:1},{opacity:0}],150);
  const bin=trash(INK);place(bin,bx-7,r.cy-8,{opacity:0});stage.append(bin);
  A(bin,[{opacity:0,transform:'scale(2.6) translateY(4px)'},{opacity:1,transform:'scale(2.6)'}],320);
  await A(b,[{width:r.w+'px',padding:'0 22px',borderRadius:'10px',transform:'rotate(0) scale(1)',background:CARD},{width:'64px',padding:'0',borderRadius:'40% 60% 45% 55%',transform:'rotate(30deg) scale(.9)',background:'#ece6da',offset:.5},{width:'48px',padding:'0',borderRadius:'48% 52% 42% 58%',transform:'rotate(220deg) scale(.55)',background:'#e2dbcc'}],{duration:620,easing:'cubic-bezier(.6,0,.3,1)'});
  A(bin._lid,[{transform:'rotate(0)'},{transform:'rotate(-50deg)'}],200);
  const k=[];for(let i=0;i<=10;i++){const t=i/10;k.push({transform:`translate(${(bx-r.cx)*t}px,${-300*t*(1-t)-14*t}px) rotate(${220+t*400}deg) scale(.55)`})}
  k.push({transform:`translate(${bx-r.cx}px,6px) rotate(640deg) scale(.4)`,opacity:0});
  await A(b,k,{duration:650,easing:'linear'});
  await A(bin._lid,[{transform:'rotate(-50deg)'},{transform:'rotate(0)'}],{duration:200,easing:'cubic-bezier(.3,1.8,.5,1)'});
  await A(bin,[{transform:'scale(2.6) rotate(0)'},{transform:'scale(2.6) rotate(-8deg)'},{transform:'scale(2.6) rotate(6deg)'},{transform:'scale(2.6) rotate(0)'}],300);
  await A(bin,[{opacity:1,transform:'scale(2.6)'},{opacity:0,transform:'scale(2.2)'}],250);
  return 'Binned';
}),

undo:ctx=>{
  const {stage}=ctx,b=btn();stage.append(b);
  const play=async()=>{if(ctx.busy)return;ctx.busy=b._busy=true;
    await A(b,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.92)'}],180);b.style.display='none';
    const N=4;let left=N;
    const num=h('span',{font:`500 12px/1 ${MONO}`,color:'#a8a196',minWidth:'18px'},left+'s');
    const ub=h('button',{border:'none',background:'none',padding:'8px 6px',font:`600 14px/1 ${FONT}`,color:'#f39a83',cursor:'pointer',textDecoration:'underline',textUnderlineOffset:'3px'},'Undo');
    const bar=h('i',{position:'absolute',left:0,bottom:0,height:'3px',width:'100%',background:'#f39a83',transformOrigin:'left'});
    const toast=h('div',{position:'relative',display:'flex',alignItems:'center',gap:'12px',height:'48px',padding:'0 8px 0 16px',background:INK,color:CARD,borderRadius:'10px',overflow:'hidden',font:`500 14px/1 ${FONT}`,whiteSpace:'nowrap'},[h('span',{},'File deleted'),num,ub,bar]);
    stage.append(toast);A(toast,[{opacity:0,transform:'translateY(8px) scale(.96)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.3,1.4,.5,1)'});
    const ba=bar.animate([{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:N*1000/sp(),fill:'forwards'});
    const tick=setInterval(()=>{left=Math.max(0,left-1);num.textContent=left+'s'},1000/sp());
    const res=await new Promise(ok=>{ba.onfinish=()=>ok('gone');ub.onclick=()=>ok('undo')});
    clearInterval(tick);ba.pause();
    if(res==='undo'){
      await A(toast,[{opacity:1},{opacity:0,transform:'translateY(6px)'}],200);toast.remove();b.style.display='inline-flex';
      await A(b,[{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:'cubic-bezier(.3,1.6,.5,1)'});
      const n=h('div',{position:'absolute',left:'50%',bottom:'34px',transform:'translateX(-50%)',font:`500 12px/1 ${MONO}`,color:GREEN,whiteSpace:'nowrap'},'restored — nothing was lost');stage.append(n);
      A(n,[{opacity:0},{opacity:1,offset:.15},{opacity:1,offset:.8},{opacity:0}],2200).then(()=>n.remove());
      ctx.busy=b._busy=false;b.style.cursor='pointer';
    }else{
      await A(toast,[{transform:'scale(1)',opacity:1},{transform:'scaleX(.5) scaleY(.1)',opacity:0}],{duration:360,easing:'cubic-bezier(.6,0,.8,.4)'});
      ctx.finish('Gone for good');
    }};
  b.onclick=play;stage._play=play;
},

blackhole:simple(async({stage},b)=>{
  const r=rel(stage,b),chars=split(b._text),pieces=[b._icon,...chars];
  const hole=place(h('div',{width:'64px',height:'64px',borderRadius:'50%',background:`radial-gradient(circle, ${INK} 0 34%, ${RED} 44%, rgba(212,70,47,.25) 58%, rgba(212,70,47,0) 70%)`,transform:'scale(0)'}),r.cx-32,r.cy-32);stage.insertBefore(hole,b);
  A(b,[{borderColor:INK,background:CARD},{borderColor:'rgba(0,0,0,0)',background:'rgba(0,0,0,0)'}],300);
  await A(hole,[{transform:'scale(0)'},{transform:'scale(1)'}],{duration:420,easing:'cubic-bezier(.3,1.4,.5,1)'});
  const pulse=hole.animate([{transform:'scale(1)'},{transform:'scale(1.08)'}],{duration:300,iterations:Infinity,direction:'alternate'});
  const sr=stage.getBoundingClientRect();
  await Promise.all(pieces.map((p,i)=>{const q=p.getBoundingClientRect(),ux=q.left+q.width/2-sr.left-r.cx,uy=q.top+q.height/2-sr.top-r.cy,mx=-ux+(-uy)*.6,my=-uy+ux*.6;
    return A(p,[{transform:'translate(0,0) rotate(0) scale(1)'},{transform:`translate(${mx}px,${my}px) rotate(200deg) scale(.6)`,offset:.6},{transform:`translate(${-ux}px,${-uy}px) rotate(480deg) scale(0)`,opacity:0}],{duration:760,delay:i*55,easing:'cubic-bezier(.5,0,.9,.5)'})}));
  pulse.cancel();
  await A(hole,[{transform:'scale(1)'},{transform:'scale(1.3)',offset:.3},{transform:'scale(0)'}],{duration:420,easing:'cubic-bezier(.6,0,.4,1)'});
  ring(stage,r.cx,r.cy,RED,120);await wait(250);
  return 'Consumed';
}),

slice:simple(async({stage},b)=>{
  const r=rel(stage,b),L=r.w+70,ang=14,t=Math.tan(ang*Math.PI/180)*r.w/2,m=r.h/2;
  const blade=place(h('i',{width:L+'px',height:'2px',background:RED,boxShadow:`0 0 8px ${RED}`}),r.cx-L/2,r.cy-1);stage.append(blade);
  await A(blade,[{transform:`rotate(-${ang}deg) scaleX(0)`,opacity:1},{transform:`rotate(-${ang}deg) scaleX(1)`,opacity:1,offset:.6},{transform:`rotate(-${ang}deg) scaleX(1)`,opacity:0}],{duration:320,easing:'cubic-bezier(.7,0,.3,1)'});
  const mk=clip=>{const c=b.cloneNode(true);place(c,r.x,r.y,{width:r.w+'px',height:r.h+'px',margin:0,clipPath:clip});stage.append(c);return c};
  const top=mk(`polygon(0 0,100% 0,100% ${m-t}px,0 ${m+t}px)`),bot=mk(`polygon(0 ${m+t}px,100% ${m-t}px,100% 100%,0 100%)`);
  b.style.visibility='hidden';blade.remove();
  await wait(120);
  await Promise.all([
    A(top,[{transform:'none',opacity:1},{transform:'translate(-8px,-4px) rotate(-3deg)',offset:.25,opacity:1},{transform:'translate(-34px,120px) rotate(-28deg)',opacity:0}],{duration:950,easing:'cubic-bezier(.5,0,.9,.6)'}),
    A(bot,[{transform:'none',opacity:1},{transform:'translate(8px,4px) rotate(3deg)',offset:.25,opacity:1},{transform:'translate(38px,130px) rotate(32deg)',opacity:0}],{duration:1000,easing:'cubic-bezier(.5,0,.9,.6)'})]);
  return 'Sliced';
}),

backspace:simple(async({stage},b)=>{
  const r=rel(stage,b);S(b,{minWidth:r.w+'px'});
  const caret=h('i',{display:'inline-block',width:'1.5px',height:'18px',background:RED,marginLeft:'-9px'});b.append(caret);
  caret.animate([{opacity:1},{opacity:0}],{duration:900,iterations:Infinity,easing:'steps(2,jump-none)'});
  await wait(500);const t=b._text;
  while(t.textContent.length){t.textContent=t.textContent.slice(0,-1);await wait(75)}
  await A(b._icon,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(0)'}],160);b._icon.style.display='none';caret.style.marginLeft='-8px';
  await wait(350);S(t,{font:`500 15px/1 ${MONO}`,color:MUTE});
  for(const ch of 'gone.'){t.textContent+=ch;await wait(110)}
  A(b,[{borderColor:INK},{borderColor:LINE}],300);
  await wait(400);
  return null;
},{}),

stamp:simple(async({stage},b)=>{
  const r=rel(stage,b);
  const st=at(stage,h('div',{padding:'7px 12px 6px',border:`3px solid ${RED}`,borderRadius:'6px',color:RED,font:`700 22px/1 ${MONO}`,letterSpacing:'.14em',opacity:0,whiteSpace:'nowrap',mixBlendMode:'multiply',background:'rgba(212,70,47,.06)'},'DELETED'),r.cx,r.cy);
  await A(st,[{opacity:0,transform:'rotate(-14deg) scale(2.8)'},{opacity:1,transform:'rotate(-14deg) scale(.94)',offset:.8},{opacity:1,transform:'rotate(-12deg) scale(1)'}],{duration:300,easing:'cubic-bezier(.6,0,.9,.6)'});
  A(stage,jit(6,3),{duration:260,easing:'linear'});
  b._text.style.textDecoration='line-through';
  A(b,[{opacity:1,transform:'scale(1)'},{opacity:.35,transform:'scale(.96)'}],400);
  for(let i=0;i<7;i++){const a=rnd(0,Math.PI*2),d=rnd(55,90),s=rnd(2,5);const p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'50%',background:RED,opacity:0}),r.cx+Math.cos(a)*d,r.cy+Math.sin(a)*d*.5);stage.append(p);
    A(p,[{opacity:0,transform:'scale(0)'},{opacity:.8,transform:'scale(1)'}],{duration:200,delay:i*20})}
  await wait(900);
  return null;
}),

gravity:simple(async({stage},b)=>{
  const chars=split(b._text),pieces=[b._icon,...chars],sr=stage.getBoundingClientRect(),floor=sr.height-18;
  await A(b,[{borderColor:INK,background:CARD},{borderColor:'rgba(29,27,24,.12)',background:'rgba(0,0,0,0)'}],250);
  const IN='cubic-bezier(.55,0,1,.45)',OUT='cubic-bezier(0,.55,.45,1)';
  await Promise.all(pieces.map((p,i)=>{const q=p.getBoundingClientRect(),d=floor-(q.bottom-sr.top),a=rnd(-35,35),dr=rnd(-14,14);
    const k=[[0,0,0,IN],[.5,d,a,OUT],[.66,d-24,a*1.3,IN],[.8,d,a*1.5,OUT],[.9,d-7,a*1.6,IN],[1,d,a*1.6]];
    return A(p,k.map(([o,y,r,e])=>({offset:o,transform:`translate(${dr*o}px,${y}px) rotate(${r}deg)`,easing:e||'linear'})),{duration:950,delay:i*80+rnd(0,40),easing:'linear'})}));
  await A(b,[{borderColor:'rgba(29,27,24,.12)'},{borderColor:'rgba(29,27,24,0)'}],250);
  return 'Dropped';
}),

fuse:simple(async({stage},b)=>{
  const r=rel(stage,b),x0=Math.max(10,r.x-70),len=r.x-x0,y=r.cy,T=1000;
  const cord=place(h('i',{width:len+'px',height:'2px',background:INK,transformOrigin:'right',borderRadius:'1px'}),x0,y-1);stage.insertBefore(cord,b);
  await A(cord,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],220);
  const spark=place(h('i',{width:'8px',height:'8px',borderRadius:'50%',background:GOLD,boxShadow:'0 0 10px 3px rgba(240,150,40,.85)'}),x0-4,y-4);stage.append(spark);
  spark.animate([{transform:'scale(.7)'},{transform:'scale(1.4)'}],{duration:70,iterations:Infinity,direction:'alternate'});
  A(cord,[{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:T,easing:'linear'});
  for(let i=0;i<14;i++){const px=x0+len*(i/14),p=place(h('i',{width:'2px',height:'2px',background:i%2?ORANGE:GOLD,opacity:0}),px,y);stage.append(p);
    A(p,[{opacity:1,transform:'translate(0,0)'},{opacity:0,transform:`translate(${rnd(-14,6)}px,${rnd(-22,10)}px)`}],{duration:400,delay:T*i/14})}
  await A(spark,[{left:x0-4+'px'},{left:r.x-4+'px'}],{duration:T,easing:'linear'});
  await A(b,[...jit(14,3)],{duration:380,easing:'linear'});
  await A(b,[{background:CARD},{background:'#fff3c4'}],80);
  b.style.visibility='hidden';spark.remove();cord.remove();
  const puff=at(stage,h('i',{width:'90px',height:'90px',borderRadius:'50%',background:'radial-gradient(circle,#fff3c4 0 30%,rgba(240,164,58,.5) 55%,rgba(240,164,58,0) 70%)'}),r.cx,r.cy);
  A(puff,[{transform:'scale(.2)',opacity:1},{transform:'scale(1.6)',opacity:0}],{duration:500});
  ring(stage,r.cx,r.cy,ORANGE,150);A(stage,jit(8,4),{duration:300,easing:'linear'});
  await burst(stage,r.cx,r.cy,26,[INK,RED,ORANGE,LINE],[50,150]);
  return 'Detonated';
}),

eraser:simple(async({stage},b)=>{
  const r=rel(stage,b),T=1300;
  const er=place(h('div',{width:'40px',height:'22px',borderRadius:'4px',background:'#e9a596',border:`1.5px solid ${INK}`,boxSizing:'border-box',overflow:'hidden'},h('i',{display:'block',width:'15px',height:'100%',background:'#efe9dc',borderRight:`1.5px solid ${INK}`})),0,0,{opacity:0});stage.append(er);
  const n=11,k=[];for(let i=0;i<=n;i++){const x=r.x-6+r.w*(i/n)+(i%2?16:-4),yy=r.cy+(i%2?-14:4);k.push({transform:`translate(${x-20}px,${yy-11}px) rotate(-18deg)`,opacity:1})}
  await A(er,[{transform:`translate(${r.x-60}px,${r.cy-50}px) rotate(-30deg)`,opacity:0},k[0]],250);
  A(b,[{clipPath:'inset(-3px -3px -3px 0%)'},{clipPath:'inset(-3px -3px -3px 100%)'}],{duration:T,easing:'linear'});
  for(let i=0;i<18;i++){const s=rnd(2,3.5),p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'1px',background:i%3?'#d98b7b':INK,opacity:0}),r.x+r.w*(i/18)+rnd(-4,4),r.cy+rnd(0,12));stage.append(p);
    A(p,[{opacity:1,transform:'translate(0,0)'},{opacity:0,transform:`translate(${rnd(-10,10)}px,${rnd(30,60)}px) rotate(${rnd(-90,90)}deg)`}],{duration:700,delay:T*i/18,easing:'cubic-bezier(.5,0,.9,.6)'})}
  await A(er,k,{duration:T,easing:'linear'});
  await A(er,[k[n],{transform:`translate(${r.r+40}px,${r.cy-50}px) rotate(10deg)`,opacity:0}],350);
  await wait(300);
  return 'Erased';
}),

melt:simple(async({stage},b)=>{
  const r=rel(stage,b);b.style.transformOrigin='50% 100%';
  A(b._icon,[{opacity:1},{opacity:0}],200);
  await A(b,[{background:CARD,color:INK},{background:INK,color:INK}],350);
  const drips=[...Array(7)].map((_,i)=>{const w=rnd(6,12),x=r.x+8+(r.w-16-w)*(i/6)+rnd(-3,3);const d=place(h('i',{width:w+'px',height:'44px',background:INK,borderRadius:`0 0 ${w}px ${w}px`,transformOrigin:'top',transform:'scaleY(0)'}),x,r.b-6);stage.insertBefore(d,b);return d});
  drips.forEach(d=>A(d,[{transform:'scaleY(0)'},{transform:`scaleY(${rnd(.35,1.3)})`}],{duration:rnd(900,1300),delay:rnd(0,300),easing:'cubic-bezier(.5,0,.5,1)'}));
  await A(b,[{transform:'scale(1,1)',borderRadius:'10px'},{transform:'scale(1.03,.8)',borderRadius:'10px 10px 16px 16px',offset:.4},{transform:'scale(1.18,.1)',borderRadius:'50%'}],{duration:1500,easing:'cubic-bezier(.5,0,.6,1)'});
  await Promise.all([...drips.map((d,i)=>A(d,[{opacity:1},{opacity:0,transform:`translateY(${rnd(40,70)}px) scaleY(.6)`}],{duration:500,delay:i*40,easing:'cubic-bezier(.5,0,.9,.6)'})),A(b,[{opacity:1},{opacity:0}],500)]);
  return 'Melted';
}),

glitch:simple(async({stage},b)=>{
  const r=rel(stage,b),N=14;
  const mk=c=>{const k=b.cloneNode(true);place(k,r.x,r.y,{width:r.w+'px',height:r.h+'px',margin:0,color:c,borderColor:c,background:'transparent',mixBlendMode:'multiply',opacity:.85});
    k.querySelectorAll('*').forEach(s=>{if(s.style.background)s.style.background=c;if(s.style.border||s.style.borderColor)s.style.borderColor=c});stage.append(k);return k};
  const c1=mk(RED),c2=mk('#2a9fb0');
  const fr=()=>Array.from({length:N},()=>{const a=rnd(0,70);return{transform:`translate(${rnd(-7,7)}px,${rnd(-2,2)}px)`,clipPath:`inset(${a}% 0 ${Math.max(0,100-a-rnd(12,45))}% 0)`}});
  await Promise.all([A(c1,fr(),{duration:700,easing:`steps(${N})`}),A(c2,fr(),{duration:700,easing:`steps(${N})`}),
    A(b,Array.from({length:N},(_,i)=>({transform:i%3?`translateX(${rnd(-3,3)}px) skewX(${rnd(-10,10)}deg)`:'none'})),{duration:700,easing:`steps(${N})`})]);
  const off=[{transform:'scale(1,1)',filter:'brightness(1)'},{transform:'scale(1.1,.04)',filter:'brightness(2)',offset:.5},{transform:'scale(0,.04)'}];
  [c1,c2].forEach(c=>S(c,{clipPath:'none'}));
  await Promise.all([b,c1,c2].map(e=>A(e,off,{duration:380,easing:'cubic-bezier(.7,0,.3,1)'})));
  const dot=at(stage,h('i',{width:'6px',height:'6px',borderRadius:'50%',background:'#fff',boxShadow:`0 0 10px 3px ${INK}`}),r.cx,r.cy);
  await A(dot,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(0)'}],380);
  return 'Signal lost';
}),

plane:simple(async({stage},b)=>{
  const r=rel(stage,b);
  await A(b,[{transform:'perspective(500px) rotateX(0)'},{transform:'perspective(500px) rotateX(78deg) scaleX(.9)'}],{duration:280,easing:'cubic-bezier(.5,0,.8,.5)'});
  A(b,[{transform:'perspective(500px) rotateX(78deg) scaleX(.9)',opacity:1},{transform:'perspective(500px) rotateX(78deg) scale(.15,.5)',opacity:0}],{duration:220});
  const pl=place(h('div',{width:'40px',height:'26px'},[h('i',{position:'absolute',inset:0,background:INK,clipPath:'polygon(0 0,100% 50%,0 100%,24% 50%)'}),h('i',{position:'absolute',inset:0,background:'#6b655b',clipPath:'polygon(0 0,100% 50%,24% 50%)'})]),r.cx-20,r.cy-13);stage.append(pl);
  await A(pl,[{transform:'translate(0,0) rotate(0) scale(.3)',opacity:0},{transform:'translate(0,0) rotate(-8deg) scale(1)',opacity:1,offset:.18},{transform:'translate(-14px,6px) rotate(-14deg)',offset:.3},{transform:'translate(50px,-30px) rotate(-28deg)',offset:.5},{transform:'translate(90px,-10px) rotate(26deg)',offset:.66},{transform:'translate(240px,-140px) rotate(-34deg)',opacity:1}],{duration:1400,easing:'cubic-bezier(.4,0,.7,1)'});
  return 'Flown off';
}),

burn:simple(async({stage},b)=>{
  const r=rel(stage,b),T=1500;S(b,{overflow:'hidden'});
  const char=h('span',{position:'absolute',left:0,right:0,bottom:0,height:'100%',background:'linear-gradient(to top,#2b1a10 0%,rgba(80,40,20,.7) 14%,rgba(120,60,20,.25) 32%,rgba(0,0,0,0) 50%)',opacity:0,pointerEvents:'none'});b.append(char);
  const edge=place(h('i',{width:r.w+6+'px',height:'4px',borderRadius:'2px',background:`linear-gradient(90deg,${ORANGE},${RED},${GOLD},${ORANGE},${RED})`,boxShadow:'0 0 10px 3px rgba(240,140,40,.7)'}),r.x-3,r.b-3);stage.append(edge);
  A(b,[{clipPath:'inset(-2px -2px 0% -2px)'},{clipPath:'inset(-2px -2px 100% -2px)'}],{duration:T,easing:'linear'});
  A(char,[{opacity:0,transform:'translateY(0)'},{opacity:1,transform:`translateY(-${r.h*.1}px)`,offset:.1},{opacity:1,transform:`translateY(-${r.h}px)`}],{duration:T,easing:'linear'});
  edge.animate([{filter:'brightness(1)'},{filter:'brightness(1.4)'}],{duration:90,iterations:Infinity,direction:'alternate'});
  for(let i=0;i<28;i++){const t=Math.random(),s=rnd(2,3.5),p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'50%',background:[ORANGE,RED,GOLD][i%3],boxShadow:`0 0 4px ${ORANGE}`,opacity:0}),r.x+rnd(0,r.w),r.b-r.h*t);stage.append(p);
    A(p,[{opacity:1,transform:'translate(0,0)'},{opacity:0,transform:`translate(${rnd(-14,14)}px,${-rnd(25,65)}px)`}],{duration:rnd(600,1000),delay:t*T,easing:'cubic-bezier(.2,.6,.4,1)'})}
  for(let i=0;i<6;i++){const t=i/6,p=place(h('i',{width:'18px',height:'18px',borderRadius:'50%',background:'#bdb5a7',filter:'blur(4px)',opacity:0}),r.x+rnd(10,r.w-28),r.b-r.h*t-10);stage.insertBefore(p,b);
    A(p,[{opacity:.55,transform:'translateY(0) scale(.6)'},{opacity:0,transform:`translate(${rnd(-10,10)}px,-60px) scale(1.8)`}],{duration:1200,delay:t*T})}
  await A(edge,[{transform:'translateY(0)',opacity:1},{transform:`translateY(-${r.h*.92}px)`,opacity:1,offset:.92},{transform:`translateY(-${r.h}px) scaleX(.6)`,opacity:0}],{duration:T,easing:'linear'});
  await wait(500);
  return 'Burned';
}),

balloon:simple(async({stage},b)=>{
  const r=rel(stage,b),F='scale(1.42,1.5)';
  await A(b,[{transform:'scale(1)',borderRadius:'10px',background:CARD},{transform:'scale(1.12,1.18)',borderRadius:'24px',background:'#f6e0d9',offset:.3},{transform:'scale(1.07,1.1)',offset:.42},{transform:'scale(1.26,1.33)',borderRadius:'28px',background:'#f2cfc4',offset:.7},{transform:'scale(1.2,1.26)',offset:.8},{transform:F,borderRadius:'30px',background:'#eebcae'}],{duration:1150,easing:'cubic-bezier(.3,0,.6,1)'});
  await A(b,jit(10,1.6,F),{duration:320,easing:'linear'});
  b.style.visibility='hidden';
  ring(stage,r.cx,r.cy,RED,130);burst(stage,r.cx,r.cy,28,[RED,INK,'#eebcae',ORANGE],[40,130]);
  const pop=at(stage,h('div',{font:`700 28px/1 ${FONT}`,color:RED,letterSpacing:'-.02em'},'POP'),r.cx,r.cy);
  await A(pop,[{transform:'scale(.4) rotate(-10deg)',opacity:0},{transform:'scale(1.15) rotate(-6deg)',opacity:1,offset:.25},{transform:'scale(1) rotate(-6deg)',opacity:1,offset:.7},{transform:'scale(1) rotate(-6deg)',opacity:0}],750);
  return 'Popped';
}),

trapdoor:simple(async({stage},b)=>{
  const r=rel(stage,b),[L,R]=b._doors,travel=r.h+60;
  await A(b,[{transform:'translateY(0)'},{transform:'translateY(-6px)',offset:.4},{transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.3,0,.5,1)'});
  A(L,[{transform:'rotate(0)'},{transform:'rotate(82deg)'}],{duration:240,easing:'cubic-bezier(.5,0,.8,.5)'});
  A(R,[{transform:'rotate(0)'},{transform:'rotate(-82deg)'}],{duration:240,easing:'cubic-bezier(.5,0,.8,.5)'});
  await wait(80);
  const k=[];for(let i=0;i<=16;i++){const t=i/16,y=travel*t*t;k.push({transform:`translateY(${y}px)`,clipPath:`inset(0 -2px ${Math.min(r.h+2,Math.max(0,y-6))}px -2px)`})}
  await A(b,k,{duration:520,easing:'linear'});
  b.style.visibility='hidden';
  await wait(150);
  A(L,[{transform:'rotate(82deg)'},{transform:'rotate(-10deg)',offset:.6},{transform:'rotate(4deg)',offset:.8},{transform:'rotate(0)'}],{duration:420,easing:'cubic-bezier(.4,0,.6,1)'});
  await A(R,[{transform:'rotate(-82deg)'},{transform:'rotate(10deg)',offset:.6},{transform:'rotate(-4deg)',offset:.8},{transform:'rotate(0)'}],{duration:420,easing:'cubic-bezier(.4,0,.6,1)'});
  return 'Down the hatch';
},{init:(ctx,b)=>{
  const {stage}=ctx,L=h('i',{position:'absolute',height:'3px',background:INK,transformOrigin:'0 50%'}),R=h('i',{position:'absolute',height:'3px',background:INK,transformOrigin:'100% 50%'}),
    fl=h('i',{position:'absolute',height:'3px',background:LINE}),fr=h('i',{position:'absolute',height:'3px',background:LINE});
  stage.append(fl,fr,L,R);b._doors=[L,R];
  const layout=()=>{if(!b.isConnected){ro.disconnect();return}if(ctx.busy)return;
    const r=rel(stage,b),fy=r.b+6,half=r.w/2+8,W=stage.clientWidth;
    place(L,r.cx-half,fy,{width:half-1+'px'});place(R,r.cx+1,fy,{width:half-1+'px'});
    place(fl,20,fy,{width:Math.max(0,r.cx-half-22)+'px'});place(fr,r.cx+half+2,fy,{width:Math.max(0,W-(r.cx+half)-22)+'px'});};
  const ro=new ResizeObserver(layout);ro.observe(stage);ro.observe(b);
  layout();document.fonts&&document.fonts.ready.then(layout);
}}),

launch:simple(async({stage},b)=>{
  const r=rel(stage,b);
  const holder=h('span',{position:'absolute',left:'50%',top:'100%',width:'22px',height:'36px',marginLeft:'-11px',transformOrigin:'50% 0',transform:'scaleY(0)'});
  const flame=h('span',{position:'absolute',inset:0,borderRadius:'50% 50% 50% 50% / 22% 22% 78% 78%',background:`linear-gradient(#fff3c4,${ORANGE} 40%,${RED})`,transformOrigin:'50% 0'});
  holder.append(flame);b.append(holder);
  flame.animate([{transform:'scale(1,1)'},{transform:'scale(.82,1.25)'}],{duration:70,iterations:Infinity,direction:'alternate'});
  const smoke=()=>{for(let i=0;i<10;i++){const s=rnd(14,26),p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'50%',background:'#d6cfc2',opacity:0}),r.cx-s/2,r.b+8-s/2);stage.insertBefore(p,b);
    A(p,[{opacity:.9,transform:'translate(0,0) scale(.3)'},{opacity:0,transform:`translate(${(i%2?1:-1)*rnd(20,80)}px,${rnd(-6,14)}px) scale(1.6)`}],{duration:rnd(900,1400),delay:rnd(0,250)})}};
  A(holder,[{transform:'scaleY(0)'},{transform:'scaleY(.45)'}],300);
  const rumble=b.animate(jit(6,1.4),{duration:90,iterations:Infinity});
  for(const n of['3','2','1']){b._text.textContent=n;await wait(320)}
  b._text.textContent='Bye';smoke();rumble.cancel();
  A(holder,[{transform:'scaleY(.45)'},{transform:'scaleY(1.5)'}],200);
  await A(b,[{transform:'translateY(0)'},{transform:'translateY(-340px)'}],{duration:900,easing:'cubic-bezier(.6,0,.9,.4)'});
  await wait(300);
  return 'Launched';
}),
};

function mount(stage){
  const fx=FX[stage.dataset.fx];if(!fx)return;stage._mounted=true;
  const run=()=>{stage.getAnimations({subtree:true}).forEach(a=>a.cancel());stage.replaceChildren();delete stage._play;
    const ctx={stage,busy:false,finish:async label=>{
      if(label){const d=badge(label);stage.append(d);await A(d,[{opacity:0,transform:'translate(-50%,-30%) scale(.9)'},{opacity:1,transform:'translate(-50%,-50%) scale(1)'}],{duration:380,easing:'cubic-bezier(.3,1.5,.5,1)'})}
      if(cfg.autoReset)await wait(1600);else{stage.style.cursor='pointer';await new Promise(ok=>stage.addEventListener('click',ok,{once:true}));stage.style.cursor=''}
      await A(stage,[{opacity:1},{opacity:0}],220);
      run();stage.animate([{opacity:0},{opacity:1}],{duration:300});
    }};
    fx(ctx);};
  run();
}
const scan=()=>document.querySelectorAll('[data-fx]').forEach(s=>{if(!s._mounted&&s.isConnected&&s.offsetWidth)mount(s)});
setInterval(scan,250);scan();
window.DeleteFX={
  setConfig:c=>Object.assign(cfg,c),
  register:(more)=>{Object.assign(FX,more);scan()},
  kit:{INK,CARD,MUTE,RED,GREEN,LINE,ORANGE,GOLD,FONT,MONO,cfg,sp,S,h,A,wait,rnd,rel,place,at,jit,trash,doc,btn,split,ring,burst,badge,simple},
  playAll:()=>document.querySelectorAll('[data-fx]').forEach((s,i)=>setTimeout(()=>s._play&&s._play(),i*90)),
};
})();
