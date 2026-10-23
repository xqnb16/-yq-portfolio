'use strict';
const email = 'yangqian666@nenu.edu.cn';
const main = document.querySelector('main');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const areas = window.YQPortfolio.areas;
const projects = window.YQPortfolio.projects;
const categories = [{id:'all',name:'全部'},...areas.map(a=>({id:a.id,name:a.name}))];
const arrow = '<span aria-hidden="true">↗</span>';
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function swatch(project,detail=false){return `<div class="work-swatch swatch-${project.number*1}${detail?' detail-swatch':''}" aria-label="${project.title}，色块占位，作品待上传"><span class="swatch-status">PLACEHOLDER / 色块占位</span><span class="swatch-index" aria-hidden="true">${project.number}</span><span class="swatch-caption">${project.en.toUpperCase()}</span></div>`;}
function workCard(project){return `<a class="work-card pressable" href="#/work/${project.id}" aria-label="${project.title}，查看待上传作品的展示位置">${swatch(project)}<div class="work-meta"><div><h3>${project.title}</h3><p>${project.en}</p></div><span class="work-state">待上传 ${arrow}</span></div></a>`;}
function scene(isHome=false){
  const art=isHome?`<svg class="scene-art" width="1448" height="970" viewBox="0 10 1448 970" role="img" aria-labelledby="hero-art-title" focusable="false"><title id="hero-art-title">杨乾的兔耳 IP 托腮瘫坐在单人沙发上，灰色小兔玩偶戴橙色蝴蝶结站在左边</title><defs><clipPath id="hero-art-cutout"><path d="M675 71 C702 34 727 21 758 33 C798 36 822 65 865 108 L982 214 C1012 243 1014 287 988 311 L1166 314 C1250 317 1250 337 1260 487 L1307 491 C1358 485 1383 514 1377 560 L1367 872 L1312 902 L1302 932 L1250 935 L1238 909 L1143 934 C1150 969 1026 979 955 953 L586 899 L572 928 L501 929 L489 883 L437 869 L426 671 C408 641 402 608 403 564 C385 574 397 519 415 468 C350 474 341 403 372 351 L481 165 C498 121 524 100 554 107 L588 108 C608 86 647 71 675 71Z"/><path d="M285 438 L410 438 L425 519 C466 573 465 700 454 755 L419 781 L408 909 C408 950 348 945 300 932 C258 944 186 950 176 914 L180 847 C110 863 18 855 14 806 C6 757 95 643 158 557 C200 497 227 487 282 492Z"/></clipPath></defs><image href="assets/yq-hero-source.png" width="1448" height="1086" clip-path="url(#hero-art-cutout)"/></svg>`:`<img src="assets/yq-scene.png" width="1584" height="992" alt="杨乾的兔耳 IP 与小兔玩偶" loading="lazy">`;
  return `<figure class="scene${isHome?' scene-original':''}">${art}<button class="scene-hotspot hotspot-rabbit" type="button" data-poke="rabbit" aria-label="和小兔打个招呼"></button><button class="scene-hotspot hotspot-character" type="button" data-poke="character" aria-label="和 YQ 打个招呼"></button><figcaption class="scene-caption" role="status" aria-live="polite"></figcaption></figure>`;
}
function pageTop(en,cn,intro){return `<div class="page-top"><div><p class="eyebrow">YQ / 杨乾</p><h1 class="page-title">${en}<span class="punctuation">.</span><span class="cn">${cn}</span></h1></div>${intro?`<p class="page-intro">${intro}</p>`:''}</div>`;}
function directionRows(){return areas.map(a=>`<a class="direction-row pressable" href="#/work?category=${a.id}"><span class="direction-number">${a.number}</span><div><h3>${a.name}</h3><span class="direction-en">${a.en}</span></div><p>${a.description}</p>${arrow}</a>`).join('');}
function portfolioAlbum(){
  const items=projects.slice(0,4);
  return `<section class="home-selected album-section" aria-labelledby="selected-heading"><div class="album-pin"><div class="album-layout">
    <div class="album-copy"><p class="eyebrow">01 / SELECTED WORK</p><h2 class="section-title" id="selected-heading">Selected<br>work<span class="punctuation">.</span></h2><p class="album-subtitle">把想法，一张张翻开。</p><a class="text-link album-all pressable" href="#/work">全部作品 ${arrow}</a>
      <figure class="album-landing"><img src="assets/yq-bed-pillow.png" width="1536" height="1024" alt="YQ 抱着橙色枕头侧卧在床上，灰色小兔玩偶坐在床尾，黑白轮廓与少量波点" loading="lazy" decoding="async"></figure>
    </div>
    <div class="album-gallery"><div class="album-stage"><div class="album-deck" role="group" aria-label="精选作品相册">${items.map((p,i)=>`<a class="album-sheet" data-album-sheet="${i}" href="#/work/${p.id}" aria-label="${p.title}，色块占位，作品待上传">${swatch(p)}<span class="album-edge-tab" aria-hidden="true">${p.number}</span></a>`).join('')}</div></div>
      <div class="album-info"><p class="album-counter"><span data-album-number>01</span><span>/ ${String(items.length).padStart(2,'0')}</span></p><div class="album-name"><h3 data-album-title>${items[0].title}</h3><p class="album-en" data-album-en>${items[0].en}</p></div>
        <div class="album-controls" role="group" aria-label="翻阅作品相册"><button class="album-arrow pressable" type="button" data-album-step="-1" aria-label="上一张作品" disabled>←</button><div class="album-tabs">${items.map((p,i)=>`<button class="album-tab pressable" type="button" data-album-index="${i}" aria-label="第 ${i+1} 张：${p.title}" aria-pressed="${i===0}">${String(i+1).padStart(2,'0')}</button>`).join('')}</div><button class="album-arrow pressable" type="button" data-album-step="1" aria-label="下一张作品">→</button></div>
        <a class="text-link pressable album-detail" data-album-detail href="#/work/${items[0].id}">查看详情 ${arrow}</a>
      </div><div class="album-foot"><p class="album-placeholder">真实作品暂未上传，当前为色块占位。</p><p class="album-hint">滚动翻阅 · 点击查看</p></div><p class="album-status" role="status" aria-live="polite" aria-atomic="true"></p>
    </div></div></div></section>`;
}
function heroWord(text){return `<span class="title-word"><span class="title-ink">${text}</span></span>`;}
function home(){return `<div class="wrap">
<section class="home-hero" aria-label="欢迎来到杨乾的个人设计空间"><h1 class="hero-title" aria-label="Welcome! My Creativity."><span class="line-one" aria-hidden="true">${heroWord("Welcome")}<span class="punctuation">!</span></span><span class="line-two" aria-hidden="true">${heroWord("My Creativity")}<span class="punctuation">.</span></span></h1><div class="hero-stage"><div class="hero-intro"><p>Design, with a<br>little company.</p><p class="intro-cn">设计，与一点陪伴。</p><a class="button hero-work-cta pressable" href="#/work">查看作品 ${arrow}</a></div>${scene(true)}<div class="hero-id"><strong>YQ</strong> / DESIGNER<br>& DAYDREAMER<div class="cn">杨乾 · 个人设计空间</div></div></div><div class="category-strip">${areas.slice(0,3).map(a=>`<a class="category-link pressable" href="#/work?category=${a.id}"><small>${a.number}</small><strong>${a.en}</strong><span class="category-cn">${a.name}</span><span class="arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>
${portfolioAlbum()}
<section class="section directions-section" aria-labelledby="directions-heading"><div class="section-head"><div><p class="eyebrow">02 / WHAT I EXPLORE</p><h2 class="section-title" id="directions-heading">Objects. Screens.<br>And possibilities<span class="punctuation">.</span><span class="cn">从物件到屏幕，给想法一个形状。</span></h2></div><p class="section-note">产品设计与 UI 设计，<br>以及更多创作的可能。</p></div><div class="direction-list">${directionRows()}</div></section>
<section class="section about-preview" aria-labelledby="about-heading"><div><p class="eyebrow">03 / A LITTLE ABOUT ME</p><h2 class="section-title" id="about-heading">Hello, I'm YQ<span class="punctuation">.</span><span class="cn">你好，我是杨乾。</span></h2></div><div><p class="about-line">认真做设计，<br>也给想象留一点空白<span class="punctuation">。</span></p><div class="body-copy"><p>我关注产品设计与 UI 设计，也为视觉、角色和实验留着位置。希望设计既有清楚的表达，也有让人愿意靠近的细节。</p></div><a href="#/about" class="text-link pressable">认识一下杨乾 ${arrow}</a></div></section>
<section class="section play-preview" aria-labelledby="play-heading"><a class="play-poster pressable" href="#/play" aria-label="进入排版实验室"><span class="poster-caption">YQ / OPEN FOR PLAY</span><span class="poster-type" aria-hidden="true">IDEAS<br>AT PLAY<span class="punctuation">!</span></span><span class="poster-foot">试着按下一个新想法 <span aria-hidden="true">↗</span></span></a><div><p class="eyebrow">04 / A LITTLE OFF SCRIPT</p><h2 class="section-title" id="play-heading">Serious about<br>playing<span class="punctuation">.</span><span class="cn">一点实验，一点不按常理。</span></h2><p class="body-copy">调整字距，试试轮廓，给画面加一点网点。或者，和角色与小兔打个招呼。</p><a class="text-link pressable" href="#/play">去实验室玩一会儿 ${arrow}</a></div></section>
<section class="contact-teaser"><p>05 / SAY HELLO · 一个想法，一句招呼，都可以。</p><a class="pressable" href="#/contact">Let's talk<span aria-hidden="true">↗</span></a><div class="teaser-email">${email}</div></section></div>`;}
function workPage(category='all'){
  if(!categories.some(c=>c.id===category))category='all';
  const items=category==='all'?projects:projects.filter(p=>p.category===category);
  const current=areas.find(a=>a.id===category);
  return `<div class="wrap page work-page">${pageTop('Selected work','作品 / 从物件到屏幕','产品设计、UI 设计，以及视觉与角色的探索。真实作品暂未上传，当前内容均为色块占位。')}<div class="filters" role="group" aria-label="按作品类别筛选">${categories.map(c=>`<button class="filter pressable" data-filter="${c.id}" aria-pressed="${c.id===category}" type="button">${c.name}</button>`).join('')}</div><div class="work-filter-note"><p class="eyebrow" aria-live="polite">${items.length} 个展示位置 / 作品待上传</p>${current?`<p>${current.focus}</p>`:''}</div>${items.length?`<div class="work-grid">${items.map(workCard).join('')}</div>`:`<div class="work-empty"><h2>新的想法，还在路上。</h2><p>这个类别暂时没有作品。</p><a class="text-link pressable" href="#/work">查看全部类别 ${arrow}</a></div>`}</div>`;
}
function projectPage(id){
  const p=projects.find(p=>p.id===id);if(!p)return notFound();
  const next=projects[(projects.indexOf(p)+1)%projects.length];
  const steps=p.category==='product'?[['项目背景','使用场景、需求与设计目标。'],['我的职责','负责的设计环节与协作范围。'],['设计过程','草图、形态推敲、材料与方案选择。'],['最终呈现','整体效果、结构细节与使用方式。'],['回顾与思考','设计中的取舍与后续改进。']]:p.category==='digital'?[['项目背景','用户需要、使用情境与设计目标。'],['我的职责','负责的界面、交互与协作范围。'],['设计过程','信息结构、任务流程与界面推敲。'],['最终呈现','关键页面、组件与交互演示。'],['回顾与思考','方案选择的原因与后续改进。']]:[['项目背景','创作的起点、方向与目标。'],['我的职责','设计内容与参与范围。'],['设计过程','草图、方案比较与关键选择。'],['最终呈现','设计效果与应用场景。'],['回顾与思考','从这次创作中得到的经验。']];
  return `<article class="wrap page case-page"><a class="text-link pressable" href="#/work?category=${p.category}">← 返回${p.title}作品</a><div class="case-page-top">${pageTop(p.en,p.title+' / 作品展示位置','作品待上传。以下色块与内容位置用于展示页面结构。')}</div><div class="detail-hero">${swatch(p,true)}</div><div class="detail-info"><div><p class="eyebrow">ABOUT THIS SPACE</p><h2>给下一件作品留个位置<span class="punctuation">。</span></h2><div class="body-copy"><p>${p.description}</p></div></div><dl><div><dt>展示类别</dt><dd>${p.title}</dd></div><div><dt>设计师</dt><dd>杨乾 / YQ</dd></div><div><dt>当前状态</dt><dd>色块占位 · 内容待整理</dd></div></dl></div><section class="case-story" aria-label="作品介绍结构">${steps.map((step,i)=>`<section class="case-step"><div><span class="case-number">0${i+1}</span><h2>${step[0]}</h2></div><div><p>${step[1]}</p><span class="pending-label">内容待整理</span>${i===2?`<div class="case-gallery"><div class="case-block"><span>过程展示 / 色块占位</span></div><div class="case-block case-block-light"><span>细节展示 / 色块占位</span></div></div>`:''}${i===3?`<div class="case-result swatch-${p.number*1}"><span>最终效果 / 色块占位</span></div>`:''}</div></section>`).join('')}</section><div class="case-contact"><p>有相似的想法，或者想聊聊设计？</p><a class="text-link pressable" href="#/contact">联系杨乾 ${arrow}</a></div><div class="detail-bottom"><a class="text-link pressable" href="#/work">全部作品 ${arrow}</a><a class="text-link pressable" href="#/work/${next.id}">下一个展示位置 ${arrow}</a></div></article>`;
}
function aboutPage(){return `<div class="wrap page about-page">${pageTop('A little about me','关于 / 杨乾与一点陪伴','设计师，也给想象留一点空间。')}<div class="about-body"><div class="about-portrait"><img src="assets/yq-scene.png" width="1584" height="992" alt="YQ 的 IP 与小兔玩偶" loading="lazy"></div><div><h2>你好，我是杨乾<span class="punctuation">。</span><br>也可以叫我 YQ。</h2><div class="body-copy"><p>我关注产品设计与 UI 设计。想让物件好用，让界面清楚，也让设计有自己的表情。</p><p>这里是我的个人设计空间。作品、过程、角色和还没有完全成形的想法，都可以在这里找到一个位置。</p><p>那位瘫在沙发上的角色和小兔，是这个空间里的陪伴。认真创作，也允许自己偶尔放空。</p></div><div class="principles"><div class="principle"><span>01</span><div><h3>从人的需要出发</h3><p>先理解场景，再考虑形式。</p></div></div><div class="principle"><span>02</span><div><h3>把表达做清楚</h3><p>有个性，也让信息和操作容易理解。</p></div></div><div class="principle"><span>03</span><div><h3>对细节保持好奇</h3><p>留意形态、色彩，以及每一次恰好的反馈。</p></div></div></div><div class="section-more"><a class="text-link pressable" href="#/contact">和我聊聊 ${arrow}</a></div></div></div><section class="about-directions"><div class="section-head"><div><p class="eyebrow">MY DESIGN DIRECTIONS</p><h2 class="section-title">Things I explore<span class="punctuation">.</span><span class="cn">正在关注的设计方向</span></h2></div></div><div class="direction-list">${directionRows()}</div></section><section class="about-outro"><p>想看设计如何落到具体的画面和物件里？</p><a class="button pressable" href="#/work">去看看作品 ${arrow}</a></section></div>`;}
function playPage(){return `<div class="wrap page">${pageTop('Ideas in play','实验 / 让字有一点表情','试试字距、轮廓与网点。保持同一种设计语言，看看它还能怎样表达。')}<div class="play-layout"><div class="type-canvas"><span class="canvas-label">YQ TYPE STUDY / 01</span><p class="type-output" id="type-output">IDEAS<br>IN PLAY<span class="play-punctuation">.</span></p></div><form class="play-controls" onsubmit="return false"><fieldset><label class="input-label" for="type-input">写一句你的灵感</label><input id="type-input" type="text" maxlength="36" value="IDEAS IN PLAY" autocomplete="off"></fieldset><fieldset><legend>文字表现</legend><div class="segmented"><button class="pressable" type="button" data-type-style="solid" aria-pressed="true">实心</button><button class="pressable" type="button" data-type-style="outline" aria-pressed="false">轮廓</button></div></fieldset><fieldset><legend>网点细节</legend><div class="segmented"><button class="pressable" type="button" data-dots="on" aria-pressed="true">开</button><button class="pressable" type="button" data-dots="off" aria-pressed="false">关</button></div></fieldset><fieldset style="grid-column:1/-1"><label class="input-label range-label" for="tracking">字距 <output id="tracking-value" for="tracking">−0.05 em</output></label><input id="tracking" type="range" min="-8" max="8" step="1" value="-5"></fieldset><button class="button pressable" type="button" data-download>保存这张小练习 <span aria-hidden="true">↓</span></button><p class="play-note">下载为 SVG，可继续编辑。<br>调一调，让字找到自己的节奏。</p></form></div><section class="play-companions"><div><p class="eyebrow">A LITTLE COMPANY</p><h2 class="section-title">Say hello<span class="punctuation">.</span><span class="cn">也和角色、小兔打个招呼。</span></h2><p class="body-copy">点击角色或小兔，听到轻轻的一声，收获一句小小的问候。</p></div>${scene()}</section></div>`;}
function contactPage(){return `<div class="wrap page contact-page">${pageTop("Let's talk",'联系 / 从一句你好开始','关于设计、关于创作，或者只是分享一个有意思的想法。')}<div class="contact-layout"><div><p class="eyebrow">WRITE TO YQ / 杨乾</p><a class="contact-email pressable" href="mailto:${email}">${email}</a><div class="contact-actions"><a class="button pressable" data-compose href="mailto:${email}?subject=${encodeURIComponent('你好，杨乾 / YQ')}">写封邮件 ${arrow}</a><button class="button secondary pressable" type="button" data-copy-email>复制邮箱 <span aria-hidden="true">＋</span></button></div><p class="contact-small">点击「写封邮件」会打开你的邮件应用。</p></div><aside class="contact-aside"><h2>这次想聊点什么？</h2><p>选一个方向，作为邮件的开场。</p><div class="contact-topics" role="group" aria-label="选择联系主题">${['产品设计','UI 设计','品牌视觉','插画与 IP','打个招呼'].map(topic=>`<button class="filter pressable" type="button" data-topic="${topic}" aria-pressed="${topic==='打个招呼'}">${topic}</button>`).join('')}</div><p class="contact-topic-status" role="status" aria-live="polite">不用准备一份完美的开场白。</p></aside></div><section class="contact-faq" aria-label="联系小提示"><details><summary>第一次联系，可以说些什么？</summary><p>你的想法、使用场景，以及想一起解决的问题。如果已有时间安排，也可以一起告诉我。</p></details><details><summary>现在还没有完整的需求，可以联系吗？</summary><p>可以。一句简单的介绍、一张参考图，或者一个还没想清楚的念头，都能成为开场。</p></details></section></div>`;}
function notFound(){return `<div class="wrap page error-page">${pageTop('Not here','这个页面还没有出现。','先回到我们的设计小世界吧。')}<a class="button pressable" href="#/">返回首页 ${arrow}</a></div>`;}
let initialRender=true,previousPath='';
function render(){
  const hash=location.hash.slice(1)||'/';const [path,query='']=hash.split('?');const parts=path.split('/').filter(Boolean);const page=parts[0]||'home';
  const params=new URLSearchParams(query);const category=params.get('category')||'all';
  const titles={home:'杨乾 YQ — Design, with a little company.',work:'作品 — 杨乾 YQ',about:'关于 — 杨乾 YQ',play:'排版实验 — 杨乾 YQ',contact:'联系 — 杨乾 YQ'};
  document.title=titles[page]||'杨乾 YQ';
  const filtering=previousPath==='/work'&&path==='/work';
  const animate=!initialRender&&!filtering&&!prefersReducedMotion.matches;
  main.innerHTML=page==='home'?home():page==='work'?(parts[1]?projectPage(parts[1]):workPage(category)):page==='about'?aboutPage():page==='play'?playPage():page==='contact'?contactPage():notFound();
  document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});closeMenu();
  if(filtering){main.querySelector(`[data-filter="${categories.some(c=>c.id===category)?category:'all'}"]`)?.focus({preventScroll:true});}
  else{window.scrollTo({top:0,behavior:'instant'});if(!initialRender)main.focus({preventScroll:true});}
  if(animate)main.animate([{opacity:.45,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:180,easing:'ease-out'});
  previousPath=path;initialRender=false;resetHeaderScroll();initAlbum();window.YQTitleMotion.init();
}
function closeMenu(){document.querySelector('nav').classList.remove('is-open');const b=document.querySelector('.menu-button');b.setAttribute('aria-expanded','false');b.querySelector('span').textContent='＋';}
let toastTimer;function toast(message){const t=document.querySelector('.toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2400);}
let audio;let audioUnavailable=false;let lastSound=0;
async function clickSound(type='tap'){
  if(audioUnavailable)return;const now=performance.now();if(now-lastSound<65)return;lastSound=now;
  try{
    audio ||= new (window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')await audio.resume();
    const start=audio.currentTime;const gain=audio.createGain();gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.055,start+.004);gain.gain.exponentialRampToValueAtTime(.0001,start+.07);gain.connect(audio.destination);
    const tone=audio.createOscillator();tone.type='sine';tone.frequency.setValueAtTime(type==='toggle'?740:520,start);tone.frequency.exponentialRampToValueAtTime(230,start+.06);tone.connect(gain);tone.start(start);tone.stop(start+.075);
    const buffer=audio.createBuffer(1,Math.floor(audio.sampleRate*.035),audio.sampleRate);const values=buffer.getChannelData(0);for(let i=0;i<values.length;i++)values[i]=(Math.random()*2-1)*.22*(1-i/values.length);
    const noise=audio.createBufferSource();noise.buffer=buffer;const filter=audio.createBiquadFilter();filter.type='lowpass';filter.frequency.value=2400;noise.connect(filter);filter.connect(gain);noise.start(start);noise.stop(start+.035);
  }catch{audioUnavailable=true;}
}
let pokeTimer;function poke(type){const el=document.querySelector('.scene');if(!el)return;el.classList.remove('is-poked');void el.offsetWidth;el.classList.add('is-poked');const caption=el.querySelector('.scene-caption');caption.textContent=type==='rabbit'?'嗨！灵感有我陪着。':'慢一点，灵感在路上。';caption.classList.add('show');clearTimeout(pokeTimer);pokeTimer=setTimeout(()=>{el.classList.remove('is-poked');caption.classList.remove('show');},2200);}
let typeStyle='solid',dotsOn=true;
function updateType(){const input=document.querySelector('#type-input');if(!input)return;const value=input.value.trim()||'IDEAS IN PLAY';const output=document.querySelector('#type-output');output.textContent=value;const dot=document.createElement('span');dot.className='play-punctuation';dot.textContent='.';output.append(dot);output.classList.toggle('outline',typeStyle==='outline');const tracking=document.querySelector('#tracking').value/100;output.style.setProperty('--tracking',tracking+'em');document.querySelector('#tracking-value').value=(tracking<0?'−':'+')+Math.abs(tracking).toFixed(2)+' em';document.querySelector('.type-canvas').classList.toggle('no-dots',!dotsOn);}
function downloadStudy(){const value=(document.querySelector('#type-input').value.trim()||'IDEAS IN PLAY');const tracking=Number(document.querySelector('#tracking').value)*1.15;const words=value.split(' ');const split=words.length>2?Math.ceil(words.length/2):words.length;const lines=[words.slice(0,split).join(' '),words.slice(split).join(' ')].filter(Boolean);const longest=Math.max(...lines.map(l=>l.length));const size=Math.min(130,1050/(longest*.8));const fill=typeStyle==='outline'?'none':'#111111';const stroke=typeStyle==='outline'?'stroke="#111111" stroke-width="2"':'';const texts=lines.map((line,i)=>`<text x="70" y="${280+i*(size*1.18)}" fill="${fill}" ${stroke} font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="${size}" letter-spacing="${tracking}">${escapeHTML(line)}</text>`).join('');const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#f6f4ef"/><text x="70" y="65" font-family="Arial,sans-serif" font-size="16" fill="#111">YQ TYPE STUDY / 杨乾</text>${dotsOn?'<defs><pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2" fill="#111"/></pattern></defs><rect x="900" y="540" width="300" height="260" fill="url(#dots)" opacity=".14"/>':''}${texts}<circle cx="1100" cy="680" r="30" fill="#ff7547"/></svg>`;const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='yq-type-study.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('小练习已保存。');}
async function copyEmail(){try{await navigator.clipboard.writeText(email);toast('邮箱已复制。');}catch{toast('暂时无法自动复制，可选中页面上的邮箱复制。');}}
document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');if(!target)return;
  if(event.isTrusted)clickSound(target.matches('.filter,.segmented button')?'toggle':'tap');
  if(target.matches('.menu-button')){const open=target.getAttribute('aria-expanded')!=='true';target.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('is-open',open);target.querySelector('span').textContent=open?'−':'＋';}
  if(target.dataset.filter){location.hash=target.dataset.filter==='all'?'#/work':'#/work?category='+target.dataset.filter;}
  if(target.dataset.poke)poke(target.dataset.poke);
  if(target.dataset.typeStyle){typeStyle=target.dataset.typeStyle;document.querySelectorAll('[data-type-style]').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));updateType();}
  if(target.dataset.dots){dotsOn=target.dataset.dots==='on';document.querySelectorAll('[data-dots]').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));updateType();}
  if(target.hasAttribute('data-download'))downloadStudy();
  if(target.hasAttribute('data-copy-email'))copyEmail();
  if(target.hasAttribute('data-album-step'))goToAlbum(albumState.index+Number(target.dataset.albumStep));
  if(target.hasAttribute('data-album-index'))goToAlbum(Number(target.dataset.albumIndex));
  if(target.dataset.topic){const topic=target.dataset.topic;document.querySelectorAll('[data-topic]').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));document.querySelector('[data-compose]').href='mailto:'+email+'?subject='+encodeURIComponent(topic+' / 你好，杨乾')+'&body='+encodeURIComponent('你好，杨乾：\n\n我想和你聊聊'+topic+'。\n\n');document.querySelector('.contact-topic-status').textContent='邮件主题已选为「'+topic+'」。';}
  if(target.matches('.skip-link')){event.preventDefault();main.focus();main.scrollIntoView();}
});
document.addEventListener('input',event=>{if(event.target.matches('#type-input,#tracking'))updateType();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.addEventListener('hashchange',()=>{typeStyle='solid';dotsOn=true;render();});
// Keep the header in flow; only its visual surface moves offscreen.
const header=document.querySelector('.site-header');
let albumState=null,albumFrame=0;
const clampAlbum=(value,min,max)=>Math.min(max,Math.max(min,value));
function initAlbum(){
  if(albumFrame){cancelAnimationFrame(albumFrame);albumFrame=0;}
  const section=main.querySelector('.album-section');
  albumState=section?{section,items:projects.slice(0,4),sheets:[...section.querySelectorAll('.album-sheet')],index:0,position:0,target:0,lastTime:0,start:0,turnStart:0,arrival:0,hold:0,step:0,width:0,compact:false}:null;
  if(!albumState)return;
  albumState.refs={};['number','title','en','detail'].forEach(key=>albumState.refs[key]=section.querySelector(`[data-album-${key}]`));
  albumState.tabs=[...section.querySelectorAll('[data-album-index]')];
  albumState.info=section.querySelector('.album-info');
  section.classList.add('album-ready');measureAlbum();
}
function measureAlbum(){
  if(!albumState)return;
  const s=albumState, pin=s.section.querySelector('.album-pin');
  s.compact=prefersReducedMotion.matches||window.innerHeight<680||window.innerWidth<=700;
  s.section.classList.toggle('album-compact',s.compact);
  s.step=Math.max(330,Math.min(580,window.innerHeight*.65));
  // The first sheet stays still throughout entry and a short reading interval.
  // Future portal/fall motion belongs to this arrival phase, before album turns.
  s.hold=s.compact?0:Math.max(300,Math.min(520,window.innerHeight*.48));
  s.section.style.setProperty('--album-run',s.compact?'0px':`${s.hold+s.step*(s.items.length-1)}px`);
  s.section.style.height=s.compact?'auto':`${pin.offsetHeight+s.hold+s.step*(s.items.length-1)}px`;
  s.start=s.section.getBoundingClientRect().top+window.scrollY-parseFloat(getComputedStyle(pin).top||0);
  const scene=main.querySelector('.home-hero .scene');
  s.arrival=scene?Math.min(s.start,scene.getBoundingClientRect().bottom+window.scrollY-window.innerHeight*.5):s.start-window.innerHeight*.6;
  s.turnStart=s.start+s.hold;
  s.width=s.section.querySelector('.album-deck').clientWidth;
  if(albumFrame){cancelAnimationFrame(albumFrame);albumFrame=0;}
  s.lastTime=0;s.target=s.compact?s.index:clampAlbum((window.scrollY-s.turnStart)/s.step,0,s.items.length-1);
  updateAlbumArrival();
  paintAlbum(s.target);
}
function updateAlbumArrival(){
  const s=albumState;if(!s)return;
  const progress=s.compact?1:clampAlbum((window.scrollY-s.arrival)/Math.max(1,s.start-s.arrival),0,1);
  s.section.style.setProperty('--album-arrival-progress',progress.toFixed(4));
  s.section.dataset.albumPhase=progress<1?'arriving':window.scrollY<s.turnStart?'resting':'browsing';
}
function paintAlbum(position){
  const s=albumState;if(!s)return;
  s.position=clampAlbum(position,0,s.items.length-1);
  const front=Math.floor(s.position),fraction=s.position-front;
  const raw=clampAlbum((fraction-.12)/.88,0,1),q=raw*raw*(3-2*raw);
  const selected=Math.min(s.items.length-1,front+(q>(s.index>front?.65:.78)?1:0));
  const width=s.width;
  const focusedSheet=s.sheets.includes(document.activeElement);
  const offsets=window.innerWidth<=700?[14,18]:[26,28];
  const angles=[-1.6,3.2,-4,2];
  s.sheets.forEach((sheet,i)=>{
    const depth=i-front;
    let x=0,y=0,rotation=0,scale=1,opacity=1;
    if(depth<0||depth>3){opacity=0;}
    else if(depth===0){x=q*width*.56;y=-q*width*.22;rotation=-1.6-q*7;scale=1-q*.025;opacity=1-clampAlbum((q-.4)/.6,0,1);}
    else{const d=depth-q;x=d*offsets[0];y=d*offsets[1];scale=1-d*.025;rotation=angles[depth]*(1-q)+angles[depth-1]*q;opacity=depth===3?q:1;}
    if(s.compact){x=depth*offsets[0];y=depth*offsets[1];rotation=angles[depth]||0;scale=1-depth*.025;opacity=depth>=0&&depth<3?1:0;}
    sheet.style.transform=`translate3d(${x}px,${y}px,0) rotate(${rotation}deg) scale(${scale})`;
    sheet.style.opacity=String(opacity);sheet.style.visibility=opacity>.001?'visible':'hidden';sheet.style.zIndex=String(s.items.length-i);
    const active=i===selected;
    sheet.inert=!active;sheet.tabIndex=active?0:-1;sheet.setAttribute('aria-hidden',String(!active));sheet.style.pointerEvents=active?'auto':'none';
  });
  if(selected!==s.index||!s.section.dataset.albumInitialized){
    const alreadyInitialized=Boolean(s.section.dataset.albumInitialized);
    s.index=selected;s.section.dataset.albumInitialized='true';const p=s.items[selected];
    if(alreadyInitialized&&!prefersReducedMotion.matches)s.info.animate([{opacity:.55},{opacity:1}],{duration:160,easing:'ease-out'});
    s.refs.number.textContent=String(selected+1).padStart(2,'0');
    s.refs.title.textContent=p.title;s.refs.en.textContent=p.en;
    s.refs.detail.href=`#/work/${p.id}`;
    s.section.querySelector('[data-album-step="-1"]').disabled=selected===0;
    s.section.querySelector('[data-album-step="1"]').disabled=selected===s.items.length-1;
    s.tabs.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===selected)));
    s.section.querySelector('.album-status').textContent=`第 ${selected+1} 张，共 ${s.items.length} 张：${p.title}。`;
    if(focusedSheet)s.sheets[selected].focus({preventScroll:true});
  }
}
function updateAlbum(time){
  albumFrame=0;const s=albumState;if(!s||s.compact)return;
  const dt=s.lastTime?Math.min(64,time-s.lastTime):16.7;s.lastTime=time;
  const next=s.position+(s.target-s.position)*(1-Math.exp(-dt/85));
  if(Math.abs(s.target-next)<.0008){paintAlbum(s.target);s.lastTime=0;return;}
  paintAlbum(next);albumFrame=requestAnimationFrame(updateAlbum);
}
function scheduleAlbum(){
  const s=albumState;if(!s)return;
  updateAlbumArrival();
  if(s.compact)return;
  s.target=clampAlbum((window.scrollY-s.turnStart)/s.step,0,s.items.length-1);
  if(!albumFrame&&Math.abs(s.target-s.position)<.0008)return;
  if(!albumFrame){s.lastTime=0;albumFrame=requestAnimationFrame(updateAlbum);}
}
function goToAlbum(index){
  const s=albumState;if(!s)return;index=clampAlbum(index,0,s.items.length-1);
  if(s.compact)paintAlbum(index);
  else window.scrollTo({top:index===0?s.start:s.turnStart+index*s.step,behavior:prefersReducedMotion.matches?'instant':'smooth'});
}
window.addEventListener('scroll',()=>{scheduleAlbum();},{passive:true});
window.addEventListener('resize',measureAlbum,{passive:true});
prefersReducedMotion.addEventListener('change',measureAlbum);
main.addEventListener('keydown',event=>{if(!event.target.closest('.album-controls,.album-deck')||!albumState)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();goToAlbum(albumState.index+(event.key==='ArrowRight'?1:-1));}});
let headerFrame=0,lastHeaderScroll=0,headerDirection=0,headerTravel=0,headerHideAfter=Infinity;
function measureHeaderScene(){
  const scene=main.querySelector('.home-hero .scene');
  headerHideAfter=scene?scene.getBoundingClientRect().bottom+window.scrollY-header.offsetHeight+24:Infinity;
}
function resetHeaderScroll(){
  header.classList.remove('is-hidden');
  lastHeaderScroll=Math.max(0,window.scrollY);headerDirection=0;headerTravel=0;
  measureHeaderScene();header.classList.toggle('is-scrolled',lastHeaderScroll>12);
}
function updateHeader(){
  headerFrame=0;
  const y=Math.max(0,Math.min(window.scrollY,document.documentElement.scrollHeight-window.innerHeight));
  const delta=y-lastHeaderScroll;
  header.classList.toggle('is-scrolled',y>12);
  // A small travel threshold filters trackpad jitter and touch bounce.
  if(y<=headerHideAfter||header.contains(document.activeElement)||document.querySelector('.menu-button').getAttribute('aria-expanded')==='true'){
    header.classList.remove('is-hidden');headerDirection=0;headerTravel=0;
  }else if(delta!==0){
    const direction=delta>0?1:-1;
    if(direction!==headerDirection)headerTravel=0;
    headerDirection=direction;headerTravel+=Math.abs(delta);
    if(direction>0&&headerTravel>=28)header.classList.add('is-hidden');
    else if(direction<0&&headerTravel>=10)header.classList.remove('is-hidden');
  }
  lastHeaderScroll=y;
}
window.addEventListener('scroll',()=>{if(!headerFrame)headerFrame=requestAnimationFrame(updateHeader);},{passive:true});
window.addEventListener('resize',resetHeaderScroll,{passive:true});
header.addEventListener('focusin',()=>{header.classList.remove('is-hidden');headerDirection=0;headerTravel=0;});
main.addEventListener('load',event=>{if(event.target.matches('.home-hero .scene img,.home-hero .scene image'))measureHeaderScene();},true);
document.querySelector('#year').textContent=new Date().getFullYear();render();
