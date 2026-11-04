// ---- Z-post-blue v11 (eleventh wave): duel blocks, team-icon filter,
//      ranks fade-in, SEASON op button, replay helpers. UI only. ----

// the two-team duel that replaces the game-plan wall of text
function zpbDuelHTML(g){
 try{
  const S = seasonState; if(!S || typeof ensureGamePlans !== 'function') return '';
  const plans = ensureGamePlans(g);
  const lean = po=> PERS[po.pers].label + (po.strat==='neutral' ? '' : ' \u00b7 ' + STRAT[po.strat].label);
  const cap = s=> s.split(' ').map(w=> w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  const chipRow = team=>{
   const rk = S.unitRanks[team]; if(!rk) return '';
   const us = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
   const best = us.slice().sort((a,b)=>rk[a]-rk[b]).slice(0,2);
   const worst = us.slice().sort((a,b)=>rk[b]-rk[a])[0];
   const one = (u, weak)=> '<span class="zpb-duelchip ' + (weak ? 'zpb-dweak' : 'zpb-dstrong') + '">' + (weak ? 'Weak ' : 'Strong ') + cap(UNIT_INFO[u].label) + '</span>';
   return '<div class="zpb-duelchips">' + best.map(u=>one(u,false)).join('') + one(worst,true) + '</div>';
  };
  const card = (team, side)=>{
   const p = plans[side];
   const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
   const lg = (typeof zpbTeamLogo==='function') ? zpbTeamLogo(team) : '';
   return '<div class="zpb-duelcard" style="' + st + '">'
    + '<div class="zpb-duelhd">' + lg + '<b>' + team + '</b></div>'
    + '<div class="zpb-duelrow"><span class="narr">Offense</span><b>' + lean(p.off) + '</b></div>'
    + '<div class="zpb-duelrow"><span class="narr">Defense</span><b>' + defPlanText(p.def) + '</b></div>'
    + chipRow(team)
    + '</div>';
  };
  return '<div class="zpb-duel">' + card(g.away,'away') + card(g.home,'home') + '</div>';
 }catch(err){ return ''; }
}

// click a team's logo on the board: that team only; click again: back to everyone
(function(){
 document.addEventListener('click', e=>{
  const tf = e.target.closest('.zpb-tfilter'); if(!tf) return;
  e.preventDefault();
  if(typeof draftUI === 'undefined' || typeof renderDraftBoard2 !== 'function') return;
  const t = tf.getAttribute('data-ztf');
  draftUI.teamFilter = (draftUI.teamFilter === t) ? null : t;
  renderDraftBoard2();
 });
 if(typeof renderDraftBoard2 === 'function'){
  const _rdb = renderDraftBoard2;
  renderDraftBoard2 = function(){
   const r = _rdb.apply(this, arguments);
   try{
    const f = document.getElementById('draftFitSummary');
    if(f && typeof draftUI !== 'undefined' && draftUI.teamFilter && typeof zpbTeamLogo === 'function'){
     f.innerHTML = '<span class="zpb-tfpill">' + zpbTeamLogo(draftUI.teamFilter) + draftUI.teamFilter + ' only \u00b7 click the logo again to clear</span>';
    }
   }catch(e2){}
   return r;
  };
 }
})();

// the draft-ranks block fades in as you scroll down to it
(function(){
 const wire = ()=>{
  if(!('IntersectionObserver' in window)){
   document.querySelectorAll('.zpb-ranks-fade').forEach(el=>el.classList.add('zpb-fadein'));
   return;
  }
  const io = new IntersectionObserver(es=>{
   es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('zpb-fadein'); io.unobserve(en.target); } });
  }, {threshold:0.06});
  document.querySelectorAll('.zpb-ranks-fade:not([data-rw])').forEach(el=>{ el.dataset.rw = '1'; io.observe(el); });
 };
 if(typeof renderDraftResults === 'function'){
  const _rdr = renderDraftResults;
  renderDraftResults = function(){ const r = _rdr.apply(this, arguments); try{ wire(); }catch(e){} return r; };
 } else {
  document.addEventListener('DOMContentLoaded', wire);
 }
})();

// SEASON sits beside NEW DRAFT on the draft-review page
(function(){
 if(typeof renderDraftResults !== 'function') return;
 const _r = renderDraftResults;
 renderDraftResults = function(){
  const r = _r.apply(this, arguments);
  try{
   const b = document.getElementById('seasonOpsBtn');
   if(b && !b.dataset.w){
    b.dataset.w = '1';
    b.addEventListener('click', ()=>{
     try{
      resultsView = 'season';
      if(typeof seasonState === 'undefined' || !seasonState){ startSeason(); }
      renderDraftResults();
     }catch(e2){}
    });
   }
  }catch(e){}
  return r;
 };
})();
