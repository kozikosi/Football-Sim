// INTERACTIVE & BEAUTY PLUGINS FOR CLAUDE'S PROTOTYPE
// Drop into <script> block. All respect prefers-reduced-motion.

// 1) MOTION SYSTEM (P11-11)
function addMotionKeyframes(){
  if(document.getElementById('motionKeyframes')) return;
  const style = document.createElement('style');
  style.id = 'motionKeyframes';
  style.textContent = `
    @keyframes fxrise{0%{transform:translateY(10px);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes fxswipe{0%{transform:translateX(-14px);opacity:0}100%{transform:translateX(0);opacity:1}}
    @keyframes fxconfetti{0%{transform:translate3d(0,-12vh,0) rotate(0);opacity:1}100%{transform:translate3d(var(--dx,0),102vh,0) rotate(720deg);opacity:.9}}
    @keyframes fxpop{0%{transform:scale(.9);opacity:0}100%{transform:scale(1);opacity:1}}
    @keyframes fxglow{0%,100%{box-shadow:0 0 0 rgba(255,196,60,0)}50%{box-shadow:0 0 28px rgba(255,196,60,.65)}}
    @keyframes fxshine{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .fx-rise{animation:fxrise .4s ease-out both}
    .fx-swipe{animation:fxswipe .35s ease-out both}
    .fx-pop{animation:fxpop .25s ease-out both}
    .fx-delay-1{animation-delay:.05s}
    .fx-delay-2{animation-delay:.1s}
    .fx-delay-3{animation-delay:.15s}
    .fx-delay-4{animation-delay:.2s}
    @media (prefers-reduced-motion: reduce){
      .fx-rise,.fx-swipe,.fx-pop,.fx-confetti{animation:none !important;opacity:1 !important;transform:none !important}
    }
  `;
  document.head.appendChild(style);
}

// 2) CONFETTI FOR CHAMPIONS (P11-11)
function launchConfetti(burst=40){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('div');
  canvas.style.cssText = 'position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:hidden';
  document.body.appendChild(canvas);
  const colors = ['#FFD76A','#FFC43C','#fff','#4f8cff','#3ecf8e'];
  for(let i=0;i<burst;i++){
    const el = document.createElement('i');
    const size = 4 + Math.random()*6;
    el.className='fx-confetti';
    el.style.cssText = `
      position:absolute;left:${Math.random()*100}vw;top:-10px;
      width:${size}px;height:${size*1.4}px;
      background:${colors[i%colors.length]};
      --dx:${(Math.random()-0.5)*40}vw;
      animation:fxconfetti ${1.8+Math.random()*0.8}s ease-in forwards;
      animation-delay:${Math.random()*0.2}s;
      border-radius:${Math.random()>.5?'50%':'2px'};
    `;
    canvas.appendChild(el);
  }
  setTimeout(()=>canvas.remove(), 2800);
}

// 3) CHAMPION BANNER GOLDEN SHIMMER (P11-10)
function styleChampionBanner(){
  if(document.getElementById('championBannerStyle')) return;
  const style = document.createElement('style');
  style.id='championBannerStyle';
  style.textContent = `
    .champion-banner{
      border:1px solid var(--gold,#FFC43C);
      background:linear-gradient(120deg, rgba(255,196,60,.16), rgba(255,196,60,.04) 45%, rgba(255,196,60,.16));
      box-shadow:0 12px 40px rgba(255,196,60,.22);
    }
    .champion-banner h2{
      background:linear-gradient(90deg,#8a6a00 0%,#FFD76A 35%,#FFF6D8 50%,#FFD76A 65%,#8a6a00 100%);
      background-size:200% 100%;
      -webkit-background-clip:text;
      background-clip:text;
      color:transparent;
      animation:fxshine 4.5s linear infinite;
    }
    .champion-banner .champ-name{color:#FFD76A;font-weight:800;text-shadow:0 0 12px rgba(255,215,106,.25)}
  `;
  document.head.appendChild(style);
}

// 4) STAGGERED ENTRANCE FOR CARDS
function staggerCards(selector='.panel, .pcard, .kp-card, .teamframe'){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = Array.from(document.querySelectorAll(selector));
  els.forEach((el,i)=>{
    if(el.classList.contains('fx-rise')) return;
    el.classList.add('fx-rise');
    el.style.animationDelay = (i*0.04)+'s';
  });
}

// 5) INTERACTIVE HOVER EFFECTS
function addHoverEffects(){
  if(document.getElementById('hoverEffects')) return;
  const style = document.createElement('style');
  style.id='hoverEffects';
  style.textContent = `
    .tabbtn, .resetbtn, .footlink, .backlink{
      transition:transform .12s ease, box-shadow .12s ease, background .12s ease, color .12s ease;
    }
    .tabbtn:hover:not(.active){
      transform:translateY(-1px);
      background:var(--panel2);
    }
    .resetbtn:hover{
      transform:translateY(-1px) scale(1.01);
      box-shadow:0 10px 24px var(--glow);
    }
    .teamrow:hover{
      background:color-mix(in srgb,var(--accent) 6%, var(--panel2));
    }
    .pcard:hover{
      transform:translateY(-2px);
      box-shadow:0 8px 24px rgba(0,0,0,.25);
      border-color:color-mix(in srgb,var(--accent) 40%, var(--border));
    }
    .pcard{transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease}
  `;
  document.head.appendChild(style);
}

// 6) DRAFT BOARD INTERACTIVITY - HIGHLIGHT USER TEAM
function highlightUserPicks(userTeam){
  document.querySelectorAll('.teamrow[data-team]').forEach(row=>{
    if(row.dataset.team === userTeam){
      row.classList.add('user-row');
    }
  });
}

// 7) SEASON REVIEW BUTTON REPOSITION (P11-12) - helper
function promoteSeasonReviewButton(){
  const btn = document.getElementById('seasonReviewBtn');
  if(!btn) return;
  btn.classList.add('fx-pop');
  btn.style.background = 'linear-gradient(90deg,var(--accent),#6aa6ff)';
  btn.style.color = '#fff';
  btn.style.boxShadow = '0 6px 18px var(--glow)';
}

// 8) TOAST NOTIFICATIONS
function showToast(msg){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    console.log('[TOAST]', msg);
    return;
  }
  const toast = document.createElement('div');
  toast.className = 'fxtoast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(), 3600);
}

// 9) COUNT-UP ANIMATION FOR SCORES
function animateNumber(el, end, duration=800){
  if(!el) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent = end; return; }
  const start = 0, startTime = performance.now();
  function update(now){
    const p = Math.min((now-startTime)/duration, 1);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(start + (end-start)*eased);
    if(p < 1) requestAnimationFrame(update);
    else el.textContent = end;
  }
  requestAnimationFrame(update);
}

// 10) AUTO-INIT
if(typeof document !== 'undefined'){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
      addMotionKeyframes();
      addHoverEffects();
    });
  }else{
    addMotionKeyframes();
    addHoverEffects();
  }
}

// Export for manual use
window.TeamUI = {
  launchConfetti,
  styleChampionBanner,
  staggerCards,
  highlightUserPicks,
  promoteSeasonReviewButton,
  showToast,
  animateNumber,
  addMotionKeyframes,
  addHoverEffects
};
