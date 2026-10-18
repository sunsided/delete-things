(function boot(){
if(!window.DeleteFX||!window.DeleteFX.kit)return setTimeout(boot,50);
const {INK,CARD,MUTE,RED,GREEN,LINE,ORANGE,GOLD,FONT,MONO,sp,S,h,A,wait,rnd,rel,place,at,jit,trash,btn,split,ring,burst,simple}=window.DeleteFX.kit;
const SAND='#e2cfa3',ICE='#8fb8c8',TEAL='#2a9fb0';
const fadeFrame=b=>A(b,[{borderColor:INK,background:CARD},{borderColor:'rgba(0,0,0,0)',background:'rgba(0,0,0,0)'}],250);

window.DeleteFX.register({

swipe:ctx=>{
  const {stage}=ctx,W=230,K=40,max=W-K-8;
  const fill=h('span',{position:'absolute',left:'4px',top:'4px',bottom:'4px',width:K+'px',borderRadius:'20px',background:'#f2d0c6'});
  const label=h('span',{position:'absolute',inset:0,display:'grid',placeItems:'center',font:`500 14px/1 ${FONT}`,color:MUTE,paddingLeft:'36px',pointerEvents:'none'},'Slide to delete');
  const knob=h('span',{position:'absolute',left:'4px',top:'4px',width:K+'px',height:K+'px',borderRadius:'50%',background:INK,display:'grid',placeItems:'center',cursor:'grab',touchAction:'none'},trash(CARD));
  const track=h('div',{position:'relative',width:W+'px',height:'48px',borderRadius:'24px',border:`1.5px solid ${INK}`,background:CARD,boxSizing:'border-box',overflow:'hidden',userSelect:'none'},[fill,label,knob]);
  stage.append(track);
  let x=0,sx=0,drag=false;
  const set=v=>{x=Math.max(0,Math.min(max,v));knob.style.transform=`translateX(${x}px)`;fill.style.width=K+x+'px';label.style.opacity=1-x/max*1.4};
  const done=async()=>{ctx.busy=true;set(max);
    await A(track,[{background:CARD,borderColor:INK},{background:RED,borderColor:RED}],200);
    await A(track,[{width:W+'px',opacity:1},{width:'48px',opacity:1,offset:.6},{width:'48px',opacity:0,transform:'scale(.4)'}],{duration:450,easing:'cubic-bezier(.6,0,.3,1)'});
    ctx.finish();};
  const back=()=>{const from=x;knob.animate([{transform:`translateX(${from}px)`},{transform:'translateX(0)'}],{duration:350/sp(),easing:'cubic-bezier(.3,1.5,.5,1)'});set(0)};
  knob.addEventListener('pointerdown',e=>{if(ctx.busy)return;drag=true;sx=e.clientX-x;knob.setPointerCapture(e.pointerId);knob.style.cursor='grabbing'});
  knob.addEventListener('pointermove',e=>{if(drag)set(e.clientX-sx)});
  const up=()=>{if(!drag)return;drag=false;knob.style.cursor='grab';x>=max*.9?done():back()};
  knob.addEventListener('pointerup',up);knob.addEventListener('pointercancel',up);
  knob.tabIndex=0;knob.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='ArrowRight')stage._play()});
  stage._play=async()=>{if(ctx.busy)return;ctx.busy=true;const t0=performance.now(),D=600/sp();
    await new Promise(ok=>{const f=t=>{const p=Math.min(1,(t-t0)/D);set(max*(1-Math.pow(1-p,3)));p<1?requestAnimationFrame(f):ok()};requestAnimationFrame(f)});done();};
},

twostep:ctx=>{
  const {stage}=ctx,b=btn();stage.append(b);
  const ghost=h('button',{height:'48px',padding:'0 18px',border:`1.5px solid ${LINE}`,borderRadius:'10px',background:CARD,color:INK,font:`500 15px/1 ${FONT}`,cursor:'pointer'},'Cancel');
  const yes=h('button',{height:'48px',padding:'0 18px',border:`1.5px solid ${RED}`,borderRadius:'10px',background:RED,color:'#fff',font:`600 15px/1 ${FONT}`,cursor:'pointer'},'Yes, delete');
  const q=h('div',{font:`500 12px/1 ${MONO}`,color:MUTE,textAlign:'center'},'Delete this file?');
  const grp=h('div',{display:'none',flexDirection:'column',alignItems:'center',gap:'12px'},[q,h('div',{display:'flex',gap:'8px'},[ghost,yes])]);
  stage.append(grp);
  const open=async()=>{if(ctx.busy)return;ctx.busy=b._busy=true;
    await A(b,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.9)'}],140);b.style.display='none';grp.style.display='flex';
    A(q,[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],250);
    A(ghost,[{opacity:0,transform:'translateX(40px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.3,1.4,.5,1)'});
    A(yes,[{opacity:0,transform:'translateX(-40px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.3,1.4,.5,1)'});};
  ghost.onclick=async()=>{await A(grp,[{opacity:1},{opacity:0}],150);grp.style.display='none';grp.getAnimations({subtree:true}).forEach(a=>a.cancel());b.style.display='inline-flex';
    await A(b,[{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'scale(1)'}],{duration:300,easing:'cubic-bezier(.3,1.6,.5,1)'});ctx.busy=b._busy=false;b.style.cursor='pointer'};
  yes.onclick=async()=>{yes.onclick=null;ghost.disabled=true;
    A(q,[{opacity:1},{opacity:0}],150);A(ghost,[{opacity:1},{opacity:0,transform:'translateX(30px)'}],200);
    await A(yes,[{transform:'scale(1)'},{transform:'scale(.92)',offset:.3},{transform:'scale(0)',opacity:0}],{duration:380,easing:'cubic-bezier(.5,0,.7,.4)'});
    ctx.finish();};
  b.onclick=open;stage._play=async()=>{await open();await wait(700);yes.onclick&&yes.onclick()};
},

vacuum:simple(async({stage},b)=>{
  const r=rel(stage,b),W=stage.clientWidth,D=46,x0=W+D,x1=-D,T=1600;
  const brush=()=>h('i',{position:'absolute',width:'14px',height:'14px'},[h('i',{position:'absolute',left:'6px',top:0,width:'2px',height:'14px',background:INK,borderRadius:'1px'}),h('i',{position:'absolute',top:'6px',left:0,height:'2px',width:'14px',background:INK,borderRadius:'1px'})]);
  const b1=brush(),b2=brush();S(b1,{left:'-4px',top:'-2px'});S(b2,{left:'-4px',bottom:'-2px'});
  const bot=place(h('div',{width:D+'px',height:D+'px'},[b1,b2,
    h('i',{position:'absolute',inset:0,borderRadius:'50%',background:'#e9e3d6',border:`2px solid ${INK}`,boxSizing:'border-box'}),
    h('i',{position:'absolute',left:'2px',top:'2px',width:(D-4)+'px',height:(D-4)+'px',borderRadius:'50%',boxSizing:'border-box',border:'5px solid #6b655b',clipPath:'inset(0 62% 0 0)'}),
    h('i',{position:'absolute',left:'27px',top:'15px',width:'5px',height:'16px',borderRadius:'3px',background:INK}),
    h('i',{position:'absolute',left:'35px',top:'21px',width:'4px',height:'4px',borderRadius:'50%',background:GREEN})]),0,r.cy-D/2);
  [b1,b2].forEach((x,i)=>x.animate([{transform:'rotate(0)'},{transform:`rotate(${i?-360:360}deg)`}],{duration:300,iterations:Infinity}));
  stage.append(bot);
  const led=bot.lastChild;led.animate([{opacity:1},{opacity:.3}],{duration:300,iterations:Infinity,direction:'alternate'});
  const span=x0-x1,o0=(x0-r.r)/span,o1=(x0-r.x)/span;
  const pathK=[];for(let i=0;i<=12;i++){const t=i/12,cx=x0-span*t;pathK.push({transform:`translateX(${cx-D/2}px) translateY(${Math.sin(t*Math.PI*8)*1}px) rotate(${Math.sin(t*Math.PI*4)*4}deg)`})}
  A(b,[{clipPath:'inset(-3px 0px -3px -3px)',offset:0},{clipPath:'inset(-3px 0px -3px -3px)',offset:o0},{clipPath:`inset(-3px ${r.w+3}px -3px -3px)`,offset:o1},{clipPath:`inset(-3px ${r.w+3}px -3px -3px)`,offset:1}],{duration:T,easing:'linear'});
  for(let i=0;i<14;i++){const px=r.x+rnd(0,r.w),py=r.cy+rnd(-r.h/2-6,r.h/2+6),t=(x0-px)/span,s=rnd(2,3.5),p=place(h('i',{width:s+'px',height:s+'px',background:i%2?INK:'#cfc7b8',borderRadius:'1px',opacity:0}),px,py);stage.insertBefore(p,bot);
    A(p,[{opacity:1,transform:'scale(1)'},{opacity:1,transform:`translate(${rnd(-6,-2)}px,${(r.cy-py)*.6}px) scale(1)`,offset:.6},{opacity:0,transform:`translate(-10px,${(r.cy-py)*.8}px) scale(.2)`}],{duration:220,delay:Math.max(0,T*t-260),easing:'cubic-bezier(.6,0,.9,.5)'})}
  await A(bot,pathK,{duration:T,easing:'linear'});
  return 'Vacuumed';
}),

hourglass:simple(async({stage},b)=>{
  const r=rel(stage,b),T=1700,floor=stage.clientHeight-16;
  A(b._icon,[{opacity:1},{opacity:0}],250);
  await A(b,[{background:CARD,borderColor:INK,color:INK},{background:SAND,borderColor:'#b89c62',color:'#8a6f3d'}],350);
  const stream=place(h('i',{width:'2px',background:'#c9ad74',transformOrigin:'top',transform:'scaleY(0)'}),r.cx-1,r.b,{height:floor-r.b+'px'});
  const pile=place(h('i',{width:'110px',height:'30px',background:SAND,clipPath:'polygon(50% 0,100% 100%,0 100%)',transformOrigin:'50% 100%',transform:'scale(.2,0)'}),r.cx-55,floor-30);
  stage.append(stream,pile);
  await A(stream,[{transform:'scaleY(0)'},{transform:'scaleY(1)'}],{duration:200,easing:'cubic-bezier(.5,0,1,.5)'});
  A(b,[{clipPath:'inset(0% -2px -2px -2px)'},{clipPath:'inset(100% -2px -2px -2px)'}],{duration:T,easing:'cubic-bezier(.3,0,.7,1)'});
  for(let i=0;i<24;i++){const p=place(h('i',{width:'2px',height:'2px',background:'#b89c62',opacity:0}),r.cx+rnd(-3,3),r.b);stage.append(p);
    A(p,[{opacity:1,transform:'translateY(0)'},{opacity:1,transform:`translate(${rnd(-6,6)}px,${floor-r.b-6}px)`}],{duration:380,delay:i*T/24,easing:'cubic-bezier(.5,0,1,.5)'})}
  await A(pile,[{transform:'scale(.2,0)'},{transform:'scale(1,1)'}],{duration:T+200,easing:'cubic-bezier(.2,.5,.5,1)'});
  A(stream,[{transform:'scaleY(1)',transformOrigin:'bottom'},{transform:'scaleY(0)',transformOrigin:'bottom'}],200);
  await wait(250);
  await A(pile,[{transform:'scale(1,1)',opacity:1},{transform:'translateX(60px) scale(1.4,.3)',opacity:0}],{duration:600,easing:'cubic-bezier(.5,0,.8,.6)'});
  return 'Time’s up';
}),

tiles:simple(async({stage},b)=>{
  const r=rel(stage,b),C=7,R=2,tw=r.w/C,th=r.h/R,ps=[];
  for(let y=0;y<R;y++)for(let x=0;x<C;x++){
    const c=b.cloneNode(true);place(c,r.x,r.y,{width:r.w+'px',height:r.h+'px',margin:0,clipPath:`inset(${y*th}px ${r.w-(x+1)*tw}px ${r.h-(y+1)*th}px ${x*tw}px)`,transformOrigin:`${(x+.5)*tw}px ${(y+.5)*th}px`});stage.append(c);
    ps.push(A(c,[{transform:'perspective(260px) rotateY(0) translateY(0)',opacity:1},{transform:'perspective(260px) rotateY(90deg) translateY(4px)',opacity:1,offset:.45},{transform:'perspective(260px) rotateY(180deg) translateY(30px)',opacity:0}],{duration:600,delay:(x+y)*70,easing:'cubic-bezier(.5,0,.6,1)'}));}
  b.style.visibility='hidden';
  await Promise.all(ps);
  return 'Flipped out';
}),

freeze:simple(async({stage},b)=>{
  const r=rel(stage,b);
  await A(b,[{background:CARD,borderColor:INK,color:INK,boxShadow:'inset 0 0 0 0 rgba(255,255,255,0)'},{background:'#e4f0f4',borderColor:ICE,color:'#4f8599',boxShadow:'inset 0 0 12px 2px rgba(255,255,255,.95)'}],600);
  A(b,[{filter:'brightness(1)'},{filter:'brightness(1.12)'},{filter:'brightness(1)'}],200);
  const N=5,tops=[0],bots=[0];for(let i=1;i<N;i++){tops.push(r.w*i/N+rnd(-10,10));bots.push(r.w*i/N+rnd(-14,14))}tops.push(r.w);bots.push(r.w);
  const cx=r.w/2,cy=r.h/2,shards=[];
  for(let i=0;i<N;i++){const mid=r.h*rnd(.35,.65);
    [[`${tops[i]}px 0`,`${tops[i+1]}px 0`,`${(tops[i+1]+bots[i+1])/2}px ${mid}px`,`${(tops[i]+bots[i])/2}px ${mid}px`],
     [`${(tops[i]+bots[i])/2}px ${mid}px`,`${(tops[i+1]+bots[i+1])/2}px ${mid}px`,`${bots[i+1]}px ${r.h}px`,`${bots[i]}px ${r.h}px`]].forEach((pts,j)=>{
      const c=b.cloneNode(true);place(c,r.x,r.y,{width:r.w+'px',height:r.h+'px',margin:0,clipPath:`polygon(${pts.join(',')})`});
      S(c,{background:'#e4f0f4',borderColor:ICE,color:'#4f8599',boxShadow:'inset 0 0 12px 2px rgba(255,255,255,.95)'});
      const sx=(tops[i]+tops[i+1])/2;c._v=[(sx-cx)/cx,j?1:-1];stage.append(c);shards.push(c)})}
  b.style.visibility='hidden';
  await Promise.all(shards.map(c=>A(c,[{transform:'none'},{transform:`translate(${c._v[0]*2}px,${c._v[1]*1.2}px)`}],{duration:90,easing:'steps(1)'})));
  await wait(260);
  await Promise.all(shards.map(c=>A(c,[{transform:`translate(${c._v[0]*2}px,${c._v[1]*1.2}px) rotate(0)`,opacity:1},{transform:`translate(${c._v[0]*rnd(20,50)}px,${rnd(90,140)}px) rotate(${rnd(-90,90)}deg)`,opacity:0}],{duration:rnd(650,900),easing:'cubic-bezier(.5,0,.9,.6)'})));
  return 'Shattered';
}),

peel:simple(async({stage},b)=>{
  b.style.transformOrigin='0% 0%';
  await A(b,[{transform:'perspective(600px) rotate3d(1,-1,0,0deg)',boxShadow:'0 0 0 rgba(0,0,0,0)'},{transform:'perspective(600px) rotate3d(1,-1,0,-14deg)',boxShadow:'6px 8px 10px rgba(29,27,24,.18)',offset:.6},{transform:'perspective(600px) rotate3d(1,-1,0,-10deg)',boxShadow:'5px 6px 8px rgba(29,27,24,.16)'}],{duration:500,easing:'cubic-bezier(.3,0,.5,1)'});
  await wait(150);
  await A(b,[{transform:'perspective(600px) rotate3d(1,-1,0,-10deg)',boxShadow:'5px 6px 8px rgba(29,27,24,.16)',opacity:1},{transform:'perspective(600px) rotate3d(1,-1,0,-60deg) translate(10px,-10px)',boxShadow:'14px 18px 20px rgba(29,27,24,.14)',offset:.45,opacity:1},{transform:'perspective(600px) rotate3d(1,-1,0,-70deg) translate(180px,-120px) rotate(30deg)',opacity:0}],{duration:800,easing:'cubic-bezier(.5,0,.7,1)'});
  return 'Peeled off';
}),

rain:simple(async({stage},b)=>{
  const W=stage.clientWidth,H=stage.clientHeight,floor=H-16;
  for(let i=0;i<46;i++){const x=rnd(0,W),l=rnd(8,16),d=place(h('i',{width:'1.5px',height:l+'px',background:'#7da7c4',opacity:0,borderRadius:'1px'}),x,-20);stage.append(d);
    A(d,[{opacity:.8,transform:'translateY(0)'},{opacity:.8,transform:`translateY(${floor+10}px)`}],{duration:rnd(450,650),delay:rnd(0,1500),easing:'cubic-bezier(.5,0,1,.6)'});}
  for(let i=0;i<8;i++){const x=rnd(20,W-50),e=place(h('i',{width:'30px',height:'8px',borderRadius:'50%',border:'1.5px solid #7da7c4',boxSizing:'border-box',opacity:0}),x,floor-4);stage.append(e);
    A(e,[{opacity:.8,transform:'scale(.2)'},{opacity:0,transform:'scale(1.4)'}],{duration:600,delay:rnd(500,1900)})}
  await wait(500);
  const pieces=[b._icon,...split(b._text)];
  A(b,[{borderColor:INK,background:CARD},{borderColor:'rgba(125,167,196,.5)',background:'rgba(0,0,0,0)',offset:.6},{borderColor:'rgba(0,0,0,0)',background:'rgba(0,0,0,0)',transform:'translateY(14px) scaleY(.9)'}],1200);
  await Promise.all(pieces.map((p,i)=>A(p,[{transform:'translateY(0) scaleY(1)',filter:'blur(0)',opacity:1},{transform:`translateY(${rnd(4,10)}px) scaleY(1.3)`,filter:'blur(1px)',opacity:.9,offset:.4},{transform:`translateY(${rnd(50,70)}px) scaleY(2.6)`,filter:'blur(4px)',opacity:0}],{duration:1100,delay:rnd(0,400),easing:'cubic-bezier(.5,0,.8,.7)'})));
  return 'Washed away';
}),

teleport:simple(async({stage},b)=>{
  const r=rel(stage,b),H=stage.clientHeight;
  const beam=place(h('i',{width:'90px',background:`linear-gradient(90deg,rgba(42,159,176,0),rgba(42,159,176,.28),rgba(42,159,176,0))`,transformOrigin:'50% 100%',transform:'scaleY(0)'}),r.cx-45,0,{height:H+'px'});stage.insertBefore(beam,b);
  await A(beam,[{transform:'scaleY(0)'},{transform:'scaleY(1)'}],{duration:300,easing:'cubic-bezier(.2,.8,.3,1)'});
  for(let i=0;i<16;i++){const s=rnd(2,4),p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'50%',background:i%2?TEAL:'#fff',boxShadow:`0 0 6px ${TEAL}`,opacity:0}),r.cx+rnd(-40,40),r.cy+rnd(-20,24));stage.append(p);
    A(p,[{opacity:0,transform:'translateY(0)'},{opacity:1,offset:.3},{opacity:0,transform:`translateY(${-rnd(30,70)}px)`}],{duration:800,delay:rnd(0,700)})}
  A(b,[{filter:'brightness(1)'},{filter:'brightness(1.3)'}],{duration:90,iterations:6,direction:'alternate'});
  await A(b,[{transform:'scaleX(1)',opacity:1,boxShadow:`0 0 0 ${TEAL}`},{transform:'scaleX(1) scaleY(1.04)',boxShadow:`0 0 14px ${TEAL}`,offset:.5},{transform:'scaleX(.02) scaleY(1.3)',boxShadow:`0 0 18px ${TEAL}`,opacity:1}],{duration:700,easing:'cubic-bezier(.6,0,.8,.4)'});
  await A(b,[{transform:'scaleX(.02) scaleY(1.3)',opacity:1},{transform:`translateY(-${r.b+40}px) scaleX(.02) scaleY(5)`,opacity:.4}],{duration:240,easing:'cubic-bezier(.7,0,1,.6)'});
  await A(beam,[{transform:'scaleY(1)',opacity:1},{transform:'scaleY(1)',opacity:0}],400);
  return 'Teleported';
}),

curtain:simple(async({stage},b)=>{
  const r=rel(stage,b),x0=r.x-26,half=r.cx-x0,top=r.y-26,ht=r.h+52;
  const drape=`repeating-linear-gradient(90deg,#b8392a 0 7px,${RED} 7px 14px)`;
  const L=place(h('i',{width:half+'px',height:ht+'px',background:drape,transformOrigin:'0 50%',transform:'scaleX(0)',borderRadius:'0 0 6px 0'}),x0,top);
  const R=place(h('i',{width:half+'px',height:ht+'px',background:drape,transformOrigin:'100% 50%',transform:'scaleX(0)',borderRadius:'0 0 0 6px'}),r.cx,top);
  const val=place(h('i',{width:half*2+12+'px',height:'10px',background:INK,borderRadius:'3px'}),x0-6,top-6);
  stage.append(L,R,val);
  await A(val,[{opacity:0,transform:'translateY(-10px)'},{opacity:1,transform:'none'}],250);
  await Promise.all([L,R].map(e=>A(e,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:500,easing:'cubic-bezier(.5,0,.3,1)'})));
  b.style.visibility='hidden';
  await wait(450);
  await Promise.all([L,R].map(e=>A(e,[{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:550,easing:'cubic-bezier(.5,0,.3,1)'})));
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2,p=place(h('i',{width:'5px',height:'5px',background:GOLD,transform:'rotate(45deg)'}),r.cx-2,r.cy-2);stage.append(p);
    A(p,[{transform:'translate(0,0) rotate(45deg) scale(0)',opacity:1},{transform:`translate(${Math.cos(a)*40}px,${Math.sin(a)*28}px) rotate(45deg) scale(1)`,opacity:0}],{duration:600})}
  A(val,[{opacity:1},{opacity:0}],{duration:300,delay:300});
  return 'Ta-da';
}),

ghost:simple(async({stage},b)=>{
  const r=rel(stage,b);
  A(b._icon,[{opacity:1},{opacity:0}],200);await A(b._text,[{opacity:1},{opacity:0}],200);
  const eyes=[.38,.62].map(f=>{const e=h('span',{position:'absolute',left:`calc(${f*100}% - 3px)`,top:'38%',width:'6px',height:'8px',borderRadius:'50%',background:INK,opacity:0});b.append(e);return e});
  await A(b,[{borderRadius:'10px',background:CARD,borderColor:INK,width:r.w+'px',padding:'0 22px'},{borderRadius:'26px 26px 8px 8px',background:'rgba(251,249,244,.75)',borderColor:'rgba(29,27,24,.35)',width:'70px',padding:'0'}],{duration:450,easing:'cubic-bezier(.3,1.3,.5,1)'});
  await Promise.all(eyes.map(e=>A(e,[{opacity:0,transform:'scaleY(.2)'},{opacity:1,transform:'scaleY(1)'}],200)));
  const boo=at(stage,h('div',{font:`600 13px/1 ${MONO}`,color:MUTE,opacity:0},'boo'),r.cx+48,r.cy-26);
  A(boo,[{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none',offset:.3},{opacity:1,offset:.7},{opacity:0}],900);
  const k=[];for(let i=0;i<=12;i++){const t=i/12;k.push({transform:`translate(${Math.sin(t*Math.PI*3)*16}px,${-t*150}px) rotate(${Math.sin(t*Math.PI*3)*-6}deg)`,opacity:1-t*t})}
  await A(b,k,{duration:1500,easing:'cubic-bezier(.4,0,.7,1)',delay:400});
  return 'Ghosted';
}),

domino:simple(async({stage},b)=>{
  const pieces=[b._icon,...split(b._text)];
  await fadeFrame(b);
  pieces.forEach(p=>p.style.transformOrigin='100% 100%');
  await Promise.all(pieces.map((p,i)=>A(p,[{transform:'rotate(0)',easing:'cubic-bezier(.6,0,1,.6)'},{transform:'rotate(90deg)',offset:.75,easing:'cubic-bezier(0,.6,.4,1)'},{transform:'rotate(80deg)',offset:.88},{transform:'rotate(90deg)'}],{duration:520,delay:i*95,easing:'linear'})));
  await wait(200);
  await Promise.all(pieces.map(p=>A(p,[{opacity:1},{opacity:0}],250)));
  return 'Toppled';
}),

flip:simple(async({stage},b)=>{
  await A(b,[{transform:'perspective(500px) rotateY(0)'},{transform:'perspective(500px) rotateY(90deg)'}],{duration:240,easing:'cubic-bezier(.6,0,1,.6)'});
  b._icon.style.display='none';b._text.textContent='Deleted';S(b,{borderColor:GREEN,color:GREEN,background:'#eef5ef'});
  const chk=h('span',{width:'18px',height:'18px',borderRadius:'50%',background:GREEN,display:'grid',placeItems:'center',flex:'none'},h('i',{display:'block',width:'4px',height:'8px',borderRight:'2px solid #fff',borderBottom:'2px solid #fff',transform:'translateY(-1px) rotate(45deg)'}));b.prepend(chk);
  await A(b,[{transform:'perspective(500px) rotateY(-90deg)'},{transform:'perspective(500px) rotateY(0)'}],{duration:420,easing:'cubic-bezier(.2,1.5,.4,1)'});
  await wait(700);
  return null;
}),

quicksand:simple(async({stage},b)=>{
  const r=rel(stage,b),surf=r.cy+10,H=stage.clientHeight;
  const sand=place(h('i',{left:0,right:0,background:`radial-gradient(#cdb685 1px,transparent 1.2px) 0 0/6px 6px, ${SAND}`,borderTop:'2px solid #c9ad74',opacity:0}),0,surf,{width:'100%',height:H-surf+'px'});stage.insertBefore(sand,b);
  await A(sand,[{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'none'}],350);
  const D=r.h+14-(r.b-surf),k=[];for(let i=0;i<=20;i++){const t=i/20,e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,y=(r.b-surf)*0+D*e;k.push({transform:`translateY(${y}px) rotate(${Math.sin(t*Math.PI*6)*4*(1-t)}deg)`,clipPath:`inset(-4px -4px ${Math.min(r.h+4,Math.max(0,(r.b-surf)+y))}px -4px)`})}
  for(let i=0;i<7;i++){const s=rnd(4,8),p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'50%',border:'1.5px solid #b89c62',boxSizing:'border-box',opacity:0}),r.cx+rnd(-r.w/2,r.w/2),surf-s/2);stage.append(p);
    A(p,[{opacity:0,transform:'scale(.2)'},{opacity:1,transform:'scale(1)',offset:.7},{opacity:0,transform:'scale(1.5)'}],{duration:500,delay:900+i*180})}
  await A(b,k,{duration:1800,easing:'linear'});
  b.style.visibility='hidden';await wait(500);
  await A(sand,[{opacity:1},{opacity:0}],300);
  return 'Swallowed';
}),

zap:simple(async({stage},b)=>{
  const r=rel(stage,b);
  const flash=place(h('i',{background:'#fff',opacity:0}),0,0,{width:'100%',height:'100%'});
  const bolt=place(h('i',{width:'44px',background:GOLD,clipPath:'polygon(58% 0,18% 54%,46% 54%,28% 100%,84% 38%,56% 38%,78% 0)',filter:'drop-shadow(0 0 6px rgba(255,190,60,.9))',opacity:0}),r.cx-22,0,{height:r.y+16+'px'});
  stage.append(flash,bolt);
  await wait(150);
  A(flash,[{opacity:0},{opacity:.85},{opacity:0},{opacity:.6},{opacity:0}],{duration:320,easing:'linear'});
  A(bolt,[{opacity:0},{opacity:1},{opacity:.2},{opacity:1},{opacity:1,offset:.8},{opacity:0}],{duration:420,easing:'linear'});
  await wait(120);
  A(stage,jit(6,3),{duration:220,easing:'linear'});
  await A(b,[{background:CARD,color:INK,borderColor:INK},{background:'#2b2620',color:'#6b655b',borderColor:'#2b2620'}],{duration:120,easing:'steps(1)'});
  [...b._icon.querySelectorAll('span')].forEach(s=>{if(s.style.background)s.style.background='#6b655b';s.style.borderColor='#6b655b'});
  for(let i=0;i<6;i++){const s=rnd(12,20),p=place(h('i',{width:s+'px',height:s+'px',borderRadius:'50%',background:'#9c958a',filter:'blur(3px)',opacity:0}),r.x+rnd(10,r.w-20),r.y-6);stage.append(p);
    A(p,[{opacity:.6,transform:'translateY(0) scale(.5)'},{opacity:0,transform:`translate(${rnd(-10,10)}px,-50px) scale(1.6)`}],{duration:1100,delay:i*90})}
  await wait(600);
  const c=6,ps=[];for(let y=0;y<r.h;y+=c)for(let x=0;x<r.w;x+=c){if(Math.random()<.45)continue;const s=rnd(2,4.5),p=place(h('i',{width:s+'px',height:s+'px',background:Math.random()<.5?'#2b2620':'#6b655b',opacity:0}),r.x+x,r.y+y);stage.append(p);
    ps.push(A(p,[{opacity:1,transform:'translate(0,0)'},{opacity:0,transform:`translate(${rnd(-8,8)}px,${stage.clientHeight-r.y-y-12}px)`}],{duration:rnd(500,800),delay:(r.h-y)*8+rnd(0,150),easing:'cubic-bezier(.5,0,1,.5)'}))}
  A(b,[{clipPath:'inset(0 -2px 0% -2px)'},{clipPath:'inset(0 -2px 100% -2px)'}],{duration:r.h*8+200,easing:'linear'});
  await Promise.all(ps);
  return 'Fried';
}),

typeconfirm:ctx=>{
  const {stage}=ctx;
  const cap=h('div',{font:`500 12px/1.3 ${MONO}`,color:MUTE},['Type ',h('span',{color:INK,background:'#ece6da',padding:'1px 5px',borderRadius:'3px'},'delete'),' to confirm']);
  const inp=h('input',{width:'190px',height:'40px',boxSizing:'border-box',border:`1.5px solid ${LINE}`,borderRadius:'8px',background:'#fff',padding:'0 12px',font:`500 14px/1 ${MONO}`,color:INK,outline:'none'});
  inp.placeholder='delete';inp.setAttribute('aria-label','Type delete to confirm');
  const b=btn();S(b,{width:'190px',opacity:.35,cursor:'not-allowed'});b.disabled=true;
  const col=h('div',{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'},[cap,inp,b]);stage.append(col);
  const ok=()=>inp.value.trim().toLowerCase()==='delete';
  inp.oninput=()=>{const g=ok();b.disabled=!g;S(b,{opacity:g?1:.35,cursor:g?'pointer':'not-allowed',background:g?RED:CARD,borderColor:g?RED:INK,color:g?'#fff':INK});
    [...b._icon.querySelectorAll('span')].forEach(s=>{const c=g?'#fff':INK;if(s.style.background)s.style.background=c;s.style.borderColor=c});inp.style.borderColor=g?RED:LINE};
  inp.onfocus=()=>{if(!ok())inp.style.borderColor=INK};inp.onblur=()=>{if(!ok())inp.style.borderColor=LINE};
  b.onmouseenter=b.onmouseleave=null;
  const go=async()=>{if(ctx.busy||!ok())return;ctx.busy=true;inp.disabled=true;
    A(cap,[{opacity:1},{opacity:0}],200);A(inp,[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(6px)'}],250);
    await A(b,[{transform:'scale(1)'},{transform:'scale(.94)',offset:.3},{transform:'scale(0)',opacity:0}],{duration:420,easing:'cubic-bezier(.5,0,.7,.4)'});
    ctx.finish();};
  b.onclick=go;inp.onkeydown=e=>{if(e.key==='Enter')go()};
  stage._play=async()=>{if(ctx.busy)return;inp.value='';for(const ch of 'delete'){inp.value+=ch;inp.oninput();await wait(90)}await wait(300);go()};
},

weight:simple(async({stage},b)=>{
  const r=rel(stage,b),sq=.16,y2=r.b-r.h*sq-62,y1=r.y-62,fall=440,imp=fall*.86;
  const w=place(h('div',{width:'72px',height:'62px'},[
    h('i',{position:'absolute',left:'24px',top:0,width:'24px',height:'18px',border:`4px solid ${INK}`,borderBottom:'none',borderRadius:'12px 12px 0 0',boxSizing:'border-box'}),
    h('i',{position:'absolute',left:0,top:'14px',width:'72px',height:'48px',background:INK,clipPath:'polygon(14% 0,86% 0,100% 100%,0 100%)',display:'grid',placeItems:'center',font:`700 15px/1 ${MONO}`,color:CARD,fontStyle:'normal'},'1T')]),r.cx-36,0);
  stage.append(w);
  A(w,[{transform:'translateY(-80px)',easing:'cubic-bezier(.55,0,1,.45)'},{transform:`translateY(${y1}px)`,offset:.86,easing:'linear'},{transform:`translateY(${y2}px)`}],{duration:fall,easing:'linear'});
  b.style.transformOrigin='50% 100%';
  await A(b,[{transform:'scale(1,1)'},{transform:`scale(1.18,${sq})`}],{duration:fall-imp,delay:imp,easing:'cubic-bezier(.2,.8,.3,1)'});
  A(stage,jit(7,4),{duration:280,easing:'linear'});
  for(const s of[-1,1])for(let i=0;i<5;i++){const z=rnd(10,18),p=place(h('i',{width:z+'px',height:z+'px',borderRadius:'50%',background:'#d6cfc2',opacity:0}),r.cx+s*(r.w*.55)-z/2,r.b-z);stage.append(p);
    A(p,[{opacity:.9,transform:'translate(0,0) scale(.3)'},{opacity:0,transform:`translate(${s*rnd(20,60)}px,${-rnd(0,20)}px) scale(1.4)`}],{duration:rnd(600,900)})}
  await A(w,[{transform:`translateY(${y2}px)`},{transform:`translateY(${y2-6}px)`,offset:.4},{transform:`translateY(${y2}px)`}],{duration:260,easing:'cubic-bezier(.3,0,.5,1)'});
  await wait(500);
  await Promise.all([A(w,[{opacity:1},{opacity:0}],300),A(b,[{opacity:1},{opacity:0}],300)]);
  return 'Flattened';
}),

fullstop:simple(async({stage},b)=>{
  const r=rel(stage,b);
  A(b._icon,[{opacity:1},{opacity:0}],180);await A(b._text,[{opacity:1},{opacity:0}],180);
  await A(b,[{width:r.w+'px',height:r.h+'px',padding:'0 22px',borderRadius:'10px',background:CARD},{width:'6px',height:'6px',padding:'0',borderRadius:'50%',background:INK,borderWidth:'0px'}],{duration:480,easing:'cubic-bezier(.6,0,.2,1)'});
  await A(b,[{transform:'translateY(0)'},{transform:'translateY(-30px)',offset:.45,easing:'cubic-bezier(.55,0,1,.45)'},{transform:'translateY(4px)',offset:.8},{transform:'translateY(0)'}],{duration:500,easing:'cubic-bezier(0,.55,.45,1)'});
  const t=h('div',{font:`600 22px/1 ${FONT}`,color:INK,letterSpacing:'-.01em',whiteSpace:'nowrap',clipPath:'inset(0 0 0 100%)'},'Deleted');
  place(t,0,0);stage.append(t);const tb=t.getBoundingClientRect();S(t,{left:r.cx-3-tb.width-1+'px',top:r.cy+3-tb.height*.86+'px'});
  await A(t,[{clipPath:'inset(-4px 0 -4px 100%)'},{clipPath:'inset(-4px 0 -4px 0%)'}],{duration:450,easing:'cubic-bezier(.3,0,.2,1)'});
  await wait(800);
  return null;
}),

redact:simple(async({stage},b)=>{
  const r=rel(stage,b),tr=rel(stage,b._text);
  const bar=place(h('i',{width:tr.w+8+'px',height:tr.h+6+'px',background:INK,transformOrigin:'0 50%',transform:'scaleX(0)'}),tr.x-4,tr.y-3);stage.append(bar);
  await A(bar,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:320,easing:'cubic-bezier(.5,0,.2,1)'});
  const bar2=place(h('i',{width:'20px',height:'20px',background:INK,transform:'scale(0)'}),rel(stage,b._icon).cx-10,r.cy-10);stage.append(bar2);
  await A(bar2,[{transform:'scale(0)'},{transform:'scale(1)'}],{duration:180,easing:'steps(3)'});
  await wait(200);
  const block=place(h('i',{width:r.w+'px',height:r.h+'px',background:INK,borderRadius:'10px',opacity:0}),r.x,r.y);stage.append(block);
  await A(block,[{opacity:0},{opacity:1}],{duration:150,easing:'steps(2)'});
  bar.remove();bar2.remove();b.style.visibility='hidden';
  await A(block,[{transform:'scaleY(1)',borderRadius:'10px'},{transform:'scaleY(.34)',borderRadius:'2px'}],{duration:380,easing:'cubic-bezier(.6,0,.2,1)'});
  const cap=at(stage,h('div',{font:`500 12px/1 ${MONO}`,color:RED,letterSpacing:'.12em',opacity:0},'[ REDACTED ]'),r.cx,r.cy+26);
  await A(cap,[{opacity:0,transform:'translateY(-4px)'},{opacity:1,transform:'none'}],250);
  await wait(800);
  return null;
}),

hook:simple(async({stage},b)=>{
  const r=rel(stage,b),L=r.y-6;
  const g=place(h('div',{width:'20px',height:L+20+'px',transformOrigin:'50% 0'},[
    h('i',{position:'absolute',left:'9.25px',top:0,width:'1.5px',height:L+1+'px',background:INK}),
    h('i',{position:'absolute',left:'7px',top:L-3+'px',width:'6px',height:'4px',background:INK,borderRadius:'1px'}),
    h('i',{position:'absolute',left:'-4.75px',top:L-1+'px',width:'16px',height:'18px',border:`2.5px solid ${INK}`,borderTop:'none',borderRadius:'0 0 9px 9px',boxSizing:'border-box',clipPath:'polygon(0 30%,50% 30%,50% 0,100% 0,100% 100%,0 100%)'})]),r.cx-10,0);
  stage.append(g);
  await A(g,[{transform:`translateY(-${L+30}px) rotate(0)`},{transform:'translateY(0) rotate(4deg)',offset:.75},{transform:'translateY(0) rotate(-2deg)',offset:.9},{transform:'translateY(0) rotate(0)'}],{duration:700,easing:'cubic-bezier(.2,.7,.3,1)'});
  b.style.transformOrigin='50% 0';
  await A(b,[{transform:'rotate(0)'},{transform:'rotate(5deg)'},{transform:'rotate(-3deg)'},{transform:'rotate(0)'}],{duration:400,easing:'cubic-bezier(.4,0,.6,1)'});
  await wait(120);
  const up=`translateY(-${r.b+40}px)`;
  await Promise.all([A(g,[{transform:'translateY(0)'},{transform:'translateY(10px)',offset:.15},{transform:up}],{duration:620,easing:'cubic-bezier(.6,0,.9,.4)'}),
    A(b,[{transform:'translateY(0) rotate(0)'},{transform:'translateY(10px) rotate(-3deg)',offset:.15},{transform:`${up} rotate(8deg)`}],{duration:620,easing:'cubic-bezier(.6,0,.9,.4)'})]);
  return 'Reeled in';
}),


page:simple(async({stage},b)=>{
  const main=stage.closest('main')||document.body;
  const els=[...main.children].flatMap(c=>c.tagName==='SECTION'?[...c.children]:[c]);
  await A(main,jit(10,3),{duration:400,easing:'linear'});
  const vh=innerHeight;
  await Promise.all(els.map((e,i)=>{const t=e.getBoundingClientRect().top;e._fall=`translateY(${Math.max(200,vh-t+120)}px) rotate(${rnd(-28,28)}deg)`;
    return A(e,[{transform:'none'},{transform:e._fall}],{duration:rnd(700,950),delay:Math.max(0,Math.min(vh,t))*.35+rnd(0,160),easing:'cubic-bezier(.55,0,1,.45)'})}));
  const msg=h('div',{font:`600 clamp(28px,4vw,44px)/1.1 ${FONT}`,color:INK,letterSpacing:'-.02em'},'This page has been deleted.');
  const sub=h('div',{font:`500 13px/1 ${MONO}`,color:MUTE},'0 items remaining');
  const ov=h('div',{position:'fixed',inset:0,zIndex:9999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'14px',pointerEvents:'none',textAlign:'center',padding:'24px'},[msg,sub]);
  document.body.append(ov);
  await A(ov,[{opacity:0},{opacity:1}],300);
  await wait(1400);
  await A(msg,[{transform:'scale(1)',opacity:1},{transform:'scale(.9)',opacity:0}],160);
  msg.textContent='Just kidding.';msg.style.color=RED;sub.textContent='restoring everything…';
  await A(msg,[{transform:'scale(1.3) rotate(-4deg)',opacity:0},{transform:'scale(1) rotate(-2deg)',opacity:1}],{duration:380,easing:'cubic-bezier(.3,1.6,.5,1)'});
  await wait(600);
  A(ov,[{opacity:1},{opacity:0}],{duration:300,delay:200}).then(()=>ov.remove());
  await Promise.all(els.map((e,i)=>A(e,[{transform:e._fall},{transform:'none'}],{duration:720,delay:i*28,easing:'cubic-bezier(.3,1.25,.5,1)'})));
  els.forEach(e=>e.getAnimations().forEach(a=>a.cancel()));main.getAnimations().forEach(a=>a.cancel());
  await A(b,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.9)'}],200);
  return 'Nothing was harmed';
},{label:'Delete page'}),

});
})();
