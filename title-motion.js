'use strict';
// Native text owns layout and accessibility. The canvas is a decorative field.
// Independent implementation: no third-party runtime or copied shader code.
window.YQTitleMotion=(()=>{
  let dispose=()=>{};
  function init(){
    dispose();
    const title=document.querySelector('.hero-title');
    if(!title)return;
    const hero=title.closest('.home-hero');
    const canvas=document.createElement('canvas');
    canvas.className='title-particles';canvas.setAttribute('aria-hidden','true');canvas.hidden=true;
    const glow=document.createElement('canvas');
    glow.className='title-particle-glow';glow.setAttribute('aria-hidden','true');glow.hidden=true;
    const field=document.createElement('canvas');
    field.className='hero-point-field';field.setAttribute('aria-hidden','true');
    const ctx=canvas.getContext('2d'),glowCtx=glow.getContext('2d'),fieldCtx=field.getContext('2d');
    if(!ctx||!glowCtx||!fieldCtx)return;
    title.append(glow,canvas);hero.prepend(field);
    const abort=new AbortController(),signal=abort.signal;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const desktop=matchMedia('(hover: hover) and (pointer: fine) and (min-width: 701px)');
    const pad=64,palette=[],buckets=Array.from({length:10},()=>[]);
    const pointer={active:false,x:-1000,y:-1000,clientX:0,clientY:0,dx:0,dy:0,time:0};
    const marks=[...title.querySelectorAll('.punctuation')].map(el=>({el,hovered:false,animation:null,rect:null}));
    let particles=[],fieldPoints=[],frame=0,lastTime=0,resizeFrame=0,enabled=false,visible=true,rect,heroRect,ratio=1,radius=110,width=0,height=0,fieldWidth=0,fieldHeight=0;
    const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
    function colors(){
      const root=getComputedStyle(document.documentElement);
      const rgb=value=>{ctx.fillStyle=value.trim();const c=ctx.fillStyle;return [1,3,5].map(i=>parseInt(c.slice(i,i+2),16));};
      const paper=rgb(getComputedStyle(title).getPropertyValue('--title-photon')),accent=rgb(root.getPropertyValue('--accent'));
      for(let i=0;i<10;i++){const t=i/9;palette[i]=`rgb(${paper.map((v,j)=>Math.round(v+(accent[j]-v)*t)).join(',')})`;}
    }
    function stop(){cancelAnimationFrame(frame);frame=0;lastTime=0;}
    function cancelMarks(){marks.forEach(m=>{m.animation?.cancel();m.animation=null;m.hovered=false;});}
    function paint(){
      ctx.clearRect(0,0,width,height);buckets.forEach(b=>b.length=0);
      for(const p of particles)buckets[Math.round(clamp(p.tint,0,1)*9)].push(p);
      buckets.forEach((bucket,i)=>{
        if(!bucket.length)return;
        ctx.fillStyle=palette[i];ctx.beginPath();
        for(const p of bucket){ctx.moveTo(p.x+p.r,p.y);ctx.arc(p.x,p.y,p.r,0,Math.PI*2);}
        ctx.fill();
      });
      // Reuse the sharp field in a smaller, softly composited light layer.
      glowCtx.clearRect(0,0,glow.width,glow.height);
      glowCtx.drawImage(canvas,0,0,glow.width,glow.height);
    }
    function paintField(){
      fieldCtx.clearRect(0,0,fieldWidth,fieldHeight);
      fieldCtx.fillStyle='rgba(246,244,239,.36)';fieldCtx.beginPath();
      for(const p of fieldPoints){fieldCtx.moveTo(p.x+.72,p.y);fieldCtx.arc(p.x,p.y,.72,0,Math.PI*2);}
      fieldCtx.fill();
    }
    function buildField(){
      heroRect=hero.getBoundingClientRect();
      fieldWidth=document.documentElement.clientWidth;fieldHeight=heroRect.height;
      const scale=Math.min(devicePixelRatio||1,1.5);
      field.width=Math.ceil(fieldWidth*scale);field.height=Math.ceil(fieldHeight*scale);
      field.style.left=-heroRect.left+'px';field.style.width=fieldWidth+'px';field.style.height=fieldHeight+'px';
      fieldCtx.setTransform(scale,0,0,scale,0,0);fieldPoints=[];
      for(let y=12;y<fieldHeight;y+=24){for(let x=12;x<fieldWidth;x+=24){
        fieldPoints.push({ox:x,oy:y,x,y,vx:0,vy:0});
      }}
      paintField();
    }
    function build(){
      stop();pointer.active=false;cancelMarks();
      title.classList.remove('title-motion-ready');canvas.hidden=glow.hidden=true;
      buildField();
      if(!enabled)return;
      try{
        rect=title.getBoundingClientRect();width=rect.width+pad*2;height=rect.height+pad*2;
        ratio=Math.min(devicePixelRatio||1,2);
        canvas.width=Math.ceil(width*ratio);canvas.height=Math.ceil(height*ratio);
        canvas.style.width=width+'px';canvas.style.height=height+'px';
        glow.width=Math.ceil(width*.5);glow.height=Math.ceil(height*.5);
        glow.style.width=width+'px';glow.style.height=height+'px';
        ctx.setTransform(ratio,0,0,ratio,0,0);
        const mask=document.createElement('canvas');mask.width=Math.ceil(width);mask.height=Math.ceil(height);
        const ink=mask.getContext('2d',{willReadFrequently:true});ink.fillStyle='#fff';ink.textBaseline='alphabetic';
        let largest=0;
        // Range positions preserve the original kerning and letter spacing.
        title.querySelectorAll('.title-ink').forEach(word=>{
          const style=getComputedStyle(word),node=word.firstChild;
          const size=parseFloat(style.fontSize);largest=Math.max(largest,size);
          ink.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          for(let i=0;i<node.length;i++){
            const char=node.textContent[i];if(char===' ')continue;
            const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);
            const box=range.getBoundingClientRect(),metrics=ink.measureText(char);
            const ascent=metrics.fontBoundingBoxAscent??size*.9;
            ink.fillText(char,box.left-rect.left+pad,box.top-rect.top+pad+ascent);
          }
        });
        const data=ink.getImageData(0,0,mask.width,mask.height).data;
        const spacing=rect.width>1100?4.5:3.8;
        particles=[];
        for(let y=pad;y<height-pad;y+=spacing){for(let x=pad;x<width-pad;x+=spacing){
          if(data[(Math.round(y)*mask.width+Math.round(x))*4+3]<150)continue;
          particles.push({ox:x,oy:y,x,y,vx:0,vy:0,tint:0,r:spacing*.3});
        }}
        if(!particles.length)throw new Error('Empty title mask');
        radius=clamp(largest*.6,85,145);marks.forEach(m=>m.rect=m.el.getBoundingClientRect());
        colors();paint();canvas.dataset.state='resting';canvas.dataset.particles=String(particles.length);
        canvas.hidden=glow.hidden=false;title.classList.add('title-motion-ready');
      }catch{enabled=false;particles=[];canvas.hidden=glow.hidden=true;title.classList.remove('title-motion-ready');}
    }
    function wake(){if(enabled&&visible&&!frame){lastTime=0;frame=requestAnimationFrame(tick);}}
    function tick(now){
      frame=0;
      const dt=Math.min(.25,lastTime?(now-lastTime)/1000:1/60);lastTime=now;
      const omega=14,decay=Math.exp(-omega*dt),colorBlend=1-Math.exp(-dt*8);
      let moving=false;
      const px=pointer.x+pad,py=pointer.y+pad;
      for(const p of particles){
        let tx=p.ox,ty=p.oy,heat=0;
        if(pointer.active){
          const dx=p.ox-px,dy=p.oy-py,d=Math.hypot(dx,dy);
          if(d<radius){
            const influence=Math.exp(-d*d/(radius*radius*.42))*Math.pow(1-d/radius,.45);
            // Continuous shear bends the lattice without emptying its centre.
            tx+=(dx*.55-dy*.65+pointer.dx*.025)*influence;
            ty+=(dy*.55+dx*.65+pointer.dy*.025-6)*influence;
            heat=influence*.88;
          }
        }
        // Closed-form damped springs stay stable even after a delayed frame.
        const sx=p.x-tx,sy=p.y-ty,ax=(p.vx+omega*sx)*dt,ay=(p.vy+omega*sy)*dt;
        p.x=tx+(sx+ax)*decay;p.y=ty+(sy+ay)*decay;
        p.vx=(p.vx-omega*ax)*decay;p.vy=(p.vy-omega*ay)*decay;
        p.tint+=(heat-p.tint)*colorBlend;
        if(Math.abs(tx-p.x)+Math.abs(ty-p.y)>.035||Math.abs(p.vx)+Math.abs(p.vy)>.08||Math.abs(heat-p.tint)>.004)moving=true;
        else{p.x=tx;p.y=ty;p.vx=p.vy=0;p.tint=heat;}
      }
      for(const p of fieldPoints){
        let tx=p.ox,ty=p.oy;
        if(pointer.active){
          const dx=p.ox-pointer.clientX,dy=p.oy-(pointer.clientY-heroRect.top),d=Math.hypot(dx,dy),r=135;
          if(d<r){const f=Math.pow(1-d/r,2);tx+=(dx*.22-dy*.18)*f;ty+=(dy*.22+dx*.18)*f;}
        }
        const sx=p.x-tx,sy=p.y-ty,ax=(p.vx+omega*sx)*dt,ay=(p.vy+omega*sy)*dt;
        p.x=tx+(sx+ax)*decay;p.y=ty+(sy+ay)*decay;
        p.vx=(p.vx-omega*ax)*decay;p.vy=(p.vy-omega*ay)*decay;
        if(Math.abs(tx-p.x)+Math.abs(ty-p.y)>.035||Math.abs(p.vx)+Math.abs(p.vy)>.08)moving=true;
        else{p.x=tx;p.y=ty;p.vx=p.vy=0;}
      }
      pointer.dx*=Math.exp(-dt*10);pointer.dy*=Math.exp(-dt*10);
      if(Math.abs(pointer.dx)+Math.abs(pointer.dy)>.2)moving=true;
      paint();paintField();canvas.dataset.state=moving?'moving':pointer.active?'hovered':'resting';
      if(moving)frame=requestAnimationFrame(tick);else lastTime=0;
    }
    function markFeedback(clientX,clientY){
      marks.forEach(m=>{
        const r=m.rect,near=pointer.active&&r&&clientX>r.left-10&&clientX<r.right+10&&clientY>r.top-8&&clientY<r.bottom+8;
        if(near===m.hovered)return;
        m.hovered=near;m.animation?.cancel();
        m.animation=m.el.animate(near?
          [{transform:'scale(1)'},{transform:'scale(1.09,.93) rotate(-2deg)'}]:
          [{transform:'scale(1.09,.93) rotate(-2deg)'},{transform:'scale(.97,1.06) rotate(1deg)',offset:.4},{transform:'scale(1.015,.99)',offset:.7},{transform:'scale(1)'}],
          {duration:near?180:440,easing:near?'cubic-bezier(.2,.8,.2,1)':'ease-out',fill:near?'forwards':'none'});
      });
    }
    hero.addEventListener('pointermove',event=>{
      if(!enabled||event.pointerType==='touch')return;
      const now=performance.now(),dt=Math.max(.016,(now-pointer.time)/1000);
      const x=event.clientX-rect.left,y=event.clientY-rect.top;
      pointer.dx=pointer.active?clamp((x-pointer.x)/dt,-600,600):0;
      pointer.dy=pointer.active?clamp((y-pointer.y)/dt,-600,600):0;
      pointer.x=x;pointer.y=y;pointer.clientX=event.clientX;pointer.clientY=event.clientY;pointer.time=now;pointer.active=true;
      markFeedback(event.clientX,event.clientY);wake();
    },{signal,passive:true});
    function leave(){pointer.active=false;pointer.dx=pointer.dy=0;markFeedback(-1000,-1000);wake();}
    hero.addEventListener('pointerleave',leave,{signal});window.addEventListener('blur',leave,{signal});
    window.addEventListener('scroll',()=>{leave();if(enabled){rect=title.getBoundingClientRect();heroRect=hero.getBoundingClientRect();marks.forEach(m=>m.rect=m.el.getBoundingClientRect());}},{signal,passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){leave();stop();}else wake();},{signal});
    function sync(){enabled=desktop.matches&&!reduced.matches;build();}
    reduced.addEventListener('change',sync,{signal});desktop.addEventListener('change',sync,{signal});
    const observer=new ResizeObserver(()=>{if(!resizeFrame)resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;build();});});observer.observe(hero);
    const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){pointer.active=false;stop();cancelMarks();}else wake();});visibility.observe(hero);
    sync();document.fonts?.ready.then(()=>{if(!signal.aborted&&enabled)build();});
    dispose=()=>{abort.abort();observer.disconnect();visibility.disconnect();cancelAnimationFrame(resizeFrame);stop();cancelMarks();canvas.remove();glow.remove();field.remove();title.classList.remove('title-motion-ready');particles=[];fieldPoints=[];};
  }
  return {init};
})();
