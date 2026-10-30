// ADVANCED INTERACTIVITY PLUGINS
// Build on top of existing FX system and team colors

// 1) Draft board row hover with team colors
function enhanceDraftBoard(){
  document.querySelectorAll('#draftTable2 tbody tr.teamrow[data-team]').forEach(row => {
    row.addEventListener('mouseenter', function(){
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.style.transform = 'translateX(2px)';
      this.style.transition = 'transform 0.15s ease, background 0.15s ease';
    });
    row.addEventListener('mouseleave', function(){
      this.style.transform = 'translateX(0)';
    });
  });
}

// 2) Player card flip on click (for player browser)
function makePlayerCardsFlippable(){
  document.querySelectorAll('.pcard').forEach(card => {
    if(card.dataset.flippable) return;
    card.dataset.flippable = 'true';
    card.style.cursor = 'pointer';
    card.title = 'Click for more details';
    card.addEventListener('click', function(e){
      if(e.target.tagName === 'BUTTON') return;
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        this.classList.toggle('flipped');
        return;
      }
      this.style.transform = this.style.transform === 'rotateY(5deg)' ? 'rotateY(0deg)' : 'rotateY(5deg)';
      setTimeout(()=>{ this.style.transform = 'rotateY(0deg)'; }, 200);
    });
  });
}

// 3) Animated stat bars
function animateStatBars(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.mbar i, .pr-bar i, .bar-fill').forEach((bar, idx) => {
    const width = bar.style.width;
    bar.style.width = '0%';
    bar.style.transition = 'width 0.6s ease-out';
    setTimeout(()=>{ bar.style.width = width; }, 50 + idx * 30);
  });
}

// 4) Smooth view transitions
function enhanceTabSwitching(){
  document.querySelectorAll('.tabbtn').forEach(btn => {
    btn.addEventListener('click', function(){
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const viewId = this.dataset.view;
      const view = document.getElementById(viewId);
      if(view){
        view.style.opacity = '0';
        view.style.transform = 'translateY(10px)';
        view.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        setTimeout(()=>{
          view.style.display = 'block';
          view.classList.add('active');
          requestAnimationFrame(()=>{
            view.style.opacity = '1';
            view.style.transform = 'translateY(0)';
          });
        }, 50);
      }
    });
  });
}

// 5) Draft pick animation
function animateDraftPick(playerName, team){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    if(typeof window.FX?.toast === 'function') window.FX.toast(`Drafted: ${playerName}`);
    return;
  }
  const toast = document.createElement('div');
  toast.className = 'fxtoast';
  toast.innerHTML = `<strong style="color:var(--accent)">PICK!</strong> ${playerName} <span style="color:var(--sub)">(${team})</span>`;
  toast.style.borderColor = 'var(--good)';
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(), 2500);
}

// 6) Score change animation
function pulseScore(element){
  if(!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  element.style.transition = 'transform 0.2s ease, color 0.2s ease';
  element.style.transform = 'scale(1.15)';
  element.style.color = 'var(--good)';
  setTimeout(()=>{
    element.style.transform = 'scale(1)';
    element.style.color = '';
  }, 300);
}

// 7) Add glow to user's team elements
function glowUserTeam(userTeam){
  document.querySelectorAll(`[data-team="${userTeam}"]`).forEach(el => {
    if(el.classList.contains('teamrow') || el.classList.contains('teamframe')){
      el.style.boxShadow = '0 0 0 1px color-mix(in srgb, var(--t1) 40%, transparent), 0 4px 16px color-mix(in srgb, var(--t1) 15%, transparent)';
    }
  });
}

// 8) Interactive depth chart
function enhanceDepthChart(){
  document.querySelectorAll('.depth-row').forEach(row => {
    row.addEventListener('mouseenter', function(){
      this.style.background = 'color-mix(in srgb, var(--accent) 8%, transparent)';
      this.style.paddingLeft = '4px';
      this.style.transition = 'all 0.15s ease';
    });
    row.addEventListener('mouseleave', function(){
      this.style.background = '';
      this.style.paddingLeft = '0';
    });
  });
}

// 9) Smooth scroll to sections
function smoothScrollEnhance(){
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });
}

// 10) Add sparkle effect to important buttons
function sparkleButtons(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('#startDraftBtn, #beginSeasonBtn, #startSeasonBtn').forEach(btn => {
    if(btn.dataset.sparkled) return;
    btn.dataset.sparkled = 'true';
    btn.addEventListener('mouseenter', function(){
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
    });
  });
}

// Auto-init
if(typeof document !== 'undefined'){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
      setTimeout(()=>{
        enhanceDraftBoard();
        makePlayerCardsFlippable();
        animateStatBars();
        enhanceTabSwitching();
        enhanceDepthChart();
        smoothScrollEnhance();
        sparkleButtons();
      }, 200);
    });
  }else{
    setTimeout(()=>{
      enhanceDraftBoard();
      makePlayerCardsFlippable();
      animateStatBars();
      enhanceTabSwitching();
      enhanceDepthChart();
      smoothScrollEnhance();
      sparkleButtons();
    }, 200);
  }
}

window.AdvancedUI = {
  enhanceDraftBoard,
  makePlayerCardsFlippable,
  animateStatBars,
  animateDraftPick,
  pulseScore,
  glowUserTeam,
  enhanceDepthChart
};
