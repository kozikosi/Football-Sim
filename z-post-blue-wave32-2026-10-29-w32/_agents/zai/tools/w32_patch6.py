#!/usr/bin/env python3
# w32_patch6.py — wave 32 stage 6: the w32 payload (CSS + JS). Appends one style block and one
# script block before </body>: pink anchor, pinker homepage, player-browser centering, the mobile
# sweep (no horizontal scroll + swipe-through), the pick-list dropdowns, the quiet SIM SEASON with
# its confirm gate, the prematch cinematics (SEASON OPENER + the rivalry phrase generator),
# DIME/NICKEL caps in the labels, and the map->card hover light.
import io, sys, re, hashlib

SRC = '/home/z/my-project/scripts/w32-stage5.html'
DST = '/home/z/my-project/download/Football-Sim-Z-post-blue-w32.html'
s = io.open(SRC, encoding='utf-8').read()

# B1 (Owner): the w30 sage-teal anchor block is deleted at the source
s = s.replace('.zpb-anch{border-color:#5c7d74 !important;background:#a9c4bd !important;color:#22312c !important;}\n.zpb-anch b{color:inherit !important;opacity:.72;}\n.zpb-anch .zpb-anchname{color:inherit !important;}\n:root[data-theme="dark"] .zpb-anch,:root:not([data-theme="light"]) .zpb-anch{border-color:#56807a !important;background:#3d5a52 !important;color:#d8e8e2 !important;}\n', '')
if '.zpb-anch{border-color:#5c7d74' in s or '#a9c4bd' in s:
    print('FAIL: sage anchor survived'); sys.exit(1)

CSS = """<style id="zpb-w32-css">
/* ============ Z-POST-BLUE W32 ============ */
/* B1 (Owner): the ANCHOR chip wears pink — the sage-teal is gone */
.zpb-anch{border-color:#c4899f !important;background:#f0bfd3 !important;color:#43202f !important;}
.zpb-anch b{color:inherit !important;opacity:.72;}
.zpb-anch .zpb-anchname{color:inherit !important;}
:root[data-theme="dark"] .zpb-anch,:root:not([data-theme="light"]) .zpb-anch{border-color:#8a5f78 !important;background:#4d2f3f !important;color:#f2d7e4 !important;}
/* B2 (Owner): the homepage breathes pink — a little more pink than brown, both themes */
:root{
 --bg:#fdf2f6; --panel:#ffffff; --panel2:#f9e9f0;
 --text:#54303f; --sub:#a2687d; --rosehair:#e6c3d2;
}
@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]){ --bg:#fdf2f6; --panel:#ffffff; --panel2:#f9e9f0; --text:#54303f; --sub:#a2687d; --rosehair:#e6c3d2; }
}
:root[data-theme="dark"],:root:not([data-theme="light"]){
 --bg:#1e1119; --panel:#291a24; --panel2:#35202d;
 --sub:#c99cae; --rosehair:#4a3040;
}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]){ --bg:#1e1119; --panel:#291a24; --panel2:#35202d; --sub:#c99cae; --rosehair:#4a3040; }
}
/* B3 (Owner): the player browser centers itself on the screen */
#viewPlayers .panel{margin-left:auto;margin-right:auto;}
#viewPlayers .filters,#viewPlayers .count,#viewPlayers .tabs,#viewPlayers .zpb-pbpager{margin-left:auto;margin-right:auto;justify-content:center;text-align:center;}
#viewPlayers .panel .filters{display:flex;justify-content:center;}
/* A9 (Owner): SIM SEASON is quiet until it is hovered */
button.zpb-simseason{background:var(--panel);color:var(--sub);border:1px solid var(--border);box-shadow:none;opacity:1;}
button.zpb-simseason:hover{border-color:var(--accent);color:var(--text);}
/* A13 (Owner): the game-report badges shrink — the score speaks, the opponent sits under it */
.zpb-sbadge.zpb-sbadge-sm{min-width:104px;flex:0 1 130px;padding:6px 8px;}
.zpb-sbadge.zpb-sbadge-sm b{font-size:.95rem;}
.zpb-sbadge.zpb-sbadge-sm i{font-size:.6rem;letter-spacing:.12em;}
/* A35 (Owner): the UNIT REPORT CARD — letter-grade badges, no hover anywhere */
.zpb-rc-title{text-align:center;font-family:'Cinzel Decorative',serif;font-weight:800;letter-spacing:.22em;font-size:.92rem;margin:0 0 10px;color:var(--tA2,var(--gold3));}
.zpb-rcgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;}
.zpb-rcbadge{display:flex;gap:10px;align-items:center;border:1px solid var(--border);border-radius:14px;background:var(--panel2);padding:10px 12px;}
.zpb-rcbadge.zpb-sb-good{border-color:color-mix(in srgb,var(--good,var(--accent)) 55%,var(--border));}
.zpb-rcbadge.zpb-sb-bad{border-color:color-mix(in srgb,var(--bad,var(--accent2)) 55%,var(--border));}
.zpb-rc-grade{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:1.5rem;min-width:2.4ch;text-align:center;color:var(--tA2,var(--gold3));}
.zpb-rc-body{display:flex;flex-direction:column;gap:2px;min-width:0;}
.zpb-rc-body b{font-size:.82rem;}
.zpb-rc-body i{font-style:normal;font-size:.68rem;color:var(--sub);}
.zpb-rc-body em{font-style:normal;font-size:.66rem;color:var(--sub);opacity:.85;}
/* A32 (Owner): the champion banner — crest, wordmark, shine; no dash anywhere */
.zpb-champ-kicker{text-align:center;font-size:.8rem;letter-spacing:.34em;font-weight:800;}
.zpb-champ-team{display:flex;align-items:center;justify-content:center;gap:16px;margin:10px 0 4px;}
.zpb-champ-team img{width:64px;height:64px;object-fit:contain;background:transparent;}
.zpb-champ-name{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:2rem;letter-spacing:.08em;text-align:center;}
.zpb-champ-sub{text-align:center;color:var(--sub);}
.champion-banner{padding:26px 14px 18px;}
/* A41 (Owner): the three doors of the try-again modal */
.zpb-again-box{display:flex;flex-direction:column;align-items:stretch;min-width:min(92vw,420px);}
.zpb-again-btn{text-align:center;}
.zpb-again-dot{opacity:.6;margin:0 6px;}
/* A15/A16 (Owner): the pick list — a quiet button, a dropdown that carries the number */
.zpb-pickbtn{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 8px;font-size:.78rem;cursor:pointer;text-align:left;}
.zpb-pickbtn:hover{border-color:var(--accent);}
.zpb-pickbtn .zpb-pickname{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.zpb-pickwrap{position:relative;min-width:0;}
.zpb-pickmenu{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:60;max-height:260px;overflow:auto;background:var(--panel);border:1px solid var(--border);border-radius:10px;box-shadow:0 14px 40px rgba(0,0,0,.35);padding:4px;display:none;}
.zpb-pickmenu.zpb-open{display:block;}
.zpb-pickrow{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;border:0;background:transparent;color:var(--text);padding:6px 8px;border-radius:8px;font-size:.78rem;cursor:pointer;text-align:left;}
.zpb-pickrow:hover{background:var(--panel2);}
.zpb-pickrow b{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.zpb-pickrow .zpb-picknum{font-weight:800;color:var(--accent);font-variant-numeric:tabular-nums;}
/* B17 (Owner): hovering a station lights the player's card under the map */
.zpb-dbk{transition:box-shadow .3s ease,border-color .3s ease;}
.zpb-dbk.zpb-dbk-lit{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent),0 0 18px var(--glow);}
/* B23/B24 (Owner): the prematch cinematic — one line, in, out, gone */
.zpb-prematch{position:fixed;inset:0;z-index:96;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--bg) 86%,transparent);backdrop-filter:blur(2px);pointer-events:none;opacity:0;transition:opacity 1.1s ease;}
.zpb-prematch.zpb-prematch-in{opacity:1;}
.zpb-prematch-text{font-family:'Cinzel Decorative',serif;font-weight:900;letter-spacing:.24em;text-indent:.24em;font-size:clamp(1.3rem,4.6vw,2.6rem);text-align:center;color:var(--tA2,var(--gold3));text-shadow:0 0 30px var(--glow);animation:zpbprematchin 3.4s ease both;}
@keyframes zpbprematchin{0%{opacity:0;transform:scale(.985);}22%{opacity:1;transform:scale(1);}72%{opacity:1;}100%{opacity:0;}}
/* B4 (Owner): mobile — everything visible, nothing to scroll sideways */
html,body{overflow-x:hidden;}
.wrap{padding-left:10px;padding-right:10px;}
@media (max-width:740px){
 .draft-columns{grid-template-columns:1fr !important;}
 .zpb-100grid,.zpb-advgrid,.zpb-awgrid{grid-template-columns:1fr !important;}
 table{font-size:.8rem;}
 th,td{padding:6px 4px;}
 .zpb-lu-row{grid-template-columns:minmax(0,1fr) 3.6em minmax(0,1fr);gap:4px;}
 .zpb-pvwrap,.zpb-stars{max-width:100%;}
 .zst-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr)) !important;}
 .footnav{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 10px;}
 .zpb-cmpscore{font-size:1rem;}
 .panel h3{font-size:1.02rem;}
}
/* the season-in-badges rail becomes a swipe strip on mobile */
@media (max-width:740px) and (pointer:coarse){
 .zpb-story-zone{flex-wrap:nowrap;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;-webkit-overflow-scrolling:touch;}
 .zpb-story-zone > *{scroll-snap-align:start;flex:0 0 auto;}
 .zpb-sbadge{flex:0 0 auto;}
}
/* A17 (Owner): the depth chart — offense and defense centered side by side, special teams a horizontal pane beneath */
.zpb-dz{grid-template-columns:1fr 1fr;max-width:980px;margin:0 auto;}
.zpb-dz-zone.zpb-dz-st{grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:14px;align-items:baseline;justify-content:center;}
.zpb-dz-zone.zpb-dz-st h4{flex-basis:100%;}
.zpb-dz-zone.zpb-dz-st .zpb-dz-row{display:inline-flex;gap:10px;border-top:none;}
@media (max-width:900px){ .zpb-dz{grid-template-columns:1fr;} .zpb-dz-zone.zpb-dz-st{flex-direction:column;align-items:stretch;} }
/* A10/A22 (Owner): light mode — tinted rows keep the deep team ink so nothing melts into its panel */
:root:not([data-theme="dark"]) .zpb-trow, :root[data-theme="light"] .zpb-trow{color:var(--tnd,var(--text));}
:root:not([data-theme="dark"]) .zpb-trow .zpb-pb-name, :root[data-theme="light"] .zpb-trow .zpb-pb-name{color:var(--tnd,var(--text));}
:root:not([data-theme="dark"]) .zpb-scard .zpb-scard-hd b, :root[data-theme="light"] .zpb-scard .zpb-scard-hd b{color:var(--tnd,var(--text));}
:root:not([data-theme="dark"]) .zpb-dbk b, :root[data-theme="light"] .zpb-dbk b{color:var(--tnd,var(--text));}
:root:not([data-theme="dark"]) .zpb-lu-cell, :root[data-theme="light"] .zpb-lu-cell{color:var(--tnd,var(--text));}
.zpb-foottheme{display:flex;justify-content:center;margin:10px auto 0;}
/* A18 (Owner): the labels themselves are already NICKEL and DIME — the row chips inherit */
/* B5 (Owner): position rankings — no horizontal scroll, every player on the line with his number */
#viewGroups .panel{overflow-x:hidden;}
#viewGroups table{table-layout:fixed;width:100%;}
#viewGroups td.narr{white-space:normal;overflow-wrap:anywhere;}
.zpb-gplayer{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;vertical-align:bottom;}
@media (max-width:740px){
 #viewGroups .zpb-grow{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline;padding:6px 0;border-bottom:1px solid var(--border);}
 #viewGroups .zpb-grow td{border:none;padding:0;}
 #viewGroups td.rank{order:0;width:auto;}
 #viewGroups td.team{order:1;flex:1 1 auto;font-weight:700;}
 #viewGroups td.score{order:2;}
 #viewGroups td.narr{order:3;flex-basis:100%;}
}
</style>"""

JS = """<script id="zpb-w32-js">
// ============ Z-POST-BLUE W32 (payload) ============
// w32 (Owner): the labels read NICKEL and DIME everywhere.
// B24 (Owner): the rivalry phrase generator — the Owner's own list, deduped, one per game.
window.zpbRivalryPhrases = ['DIVISION SHOWDOWN','DIVISION MATCHUP','BITTER RIVALRY','BITTER RIVALS','DIVISION FACE-OFF','DIVISION THROWDOWN','DIVISION COLLISION','DIVISIONAL DUEL','DIVISIONAL CLASH','CONFERENCE CLASH','HEATED RIVALRY','HISTORIC RIVALRY','HOSTILE RIVALS','THE RIVALRY','RIVALRY WEEK','FAMILIAR FOES','OLD FOES','BATTLE FOR THE DIVISION','DIVISIONAL STAKES','DIVISION ON THE LINE','THE DIVISIONAL RACE','BITTER ENEMIES','RIVALRY AT ITS FINEST','DIVISIONAL WARFARE','THE RIVALRY GAME','KEY DIVISIONAL MATCHUP','MARQUEE MATCHUP','PRIME-TIME SHOWDOWN'];
window.zpbRivalryPhrase = function(){ return window.zpbRivalryPhrases[Math.floor(Math.random()*window.zpbRivalryPhrases.length)]; };

// B23/B24 (Owner): the prematch cinematic — SEASON OPENER for game 1, a rivalry phrase for a
// division game; it fades in, holds, fades out, and never blocks the page.
window.zpbPrematchCine = function(g){
 try{
  if(!g || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(window.__zpbPrematchSeen && window.__zpbPrematchSeen.has(g)) return;
  window.__zpbPrematchSeen = window.__zpbPrematchSeen || new Set(); window.__zpbPrematchSeen.add(g);
  const S = seasonState;
  let text = null;
  if(S && S.phase==='regular' && g.week===1) text = 'SEASON OPENER';
  else if(g.divisional) text = window.zpbRivalryPhrase();
  if(!text) return;
  const ov = document.createElement('div'); ov.className = 'zpb-prematch';
  ov.innerHTML = '<div class="zpb-prematch-text">'+text+'</div>';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> ov.classList.add('zpb-prematch-in'));
  setTimeout(()=>{ try{ ov.classList.add('zpb-prematch-in'); ov.style.opacity='0'; }catch(err){} }, 3100);
  setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 4400);
 }catch(err){}
};
(function(){
 if(typeof renderRegularSeasonView !== 'function') return;
 const orig = renderRegularSeasonView;
 renderRegularSeasonView = function(container){
  const out = orig.apply(this, arguments);
  try{
   const user = seasonUserTeam(), S = seasonState;
   const g = S && S.schedule && S.schedule.find(g=>g.week===S.currentWeek && !g.played && (g.home===user||g.away===user));
   if(g && !S.weekSimulated) setTimeout(()=>{ try{ zpbPrematchCine(g); }catch(err){} }, 350);
  }catch(err){}
  return out;
 };
})();

// A9 (Owner): SIM SEASON asks first — ARE YOU SURE YOU WANT TO SIMULATE THE REGULAR SEASON?
(function(){
 document.addEventListener('click', function(e){
  const b = e.target.closest ? e.target.closest('#simSeasonBtn') : null;
  if(!b) return;
  e.stopPropagation(); e.preventDefault();
  const ov = document.createElement('div'); ov.className = 'confirm-ov';
  ov.innerHTML = '<div class="confirm-box" style="text-align:center;">'
   + '<p style="margin-top:0;"><b>ARE YOU SURE YOU WANT TO SIMULATE THE REGULAR SEASON?</b></p>'
   + '<p class="narr">Every remaining week plays out at once. This cannot be undone.</p>'
   + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'
   + '<button class="tabbtn" data-ss="no">Cancel</button>'
   + '<button class="resetbtn" data-ss="yes" style="width:auto;margin:0;padding:8px 18px;">Yes \\u2014 simulate the season</button>'
   + '</div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', ev=>{
   const t = ev.target.closest ? ev.target.closest('[data-ss]') : null;
   if(!t && ev.target!==ov) return;
   const yes = t && t.dataset.ss==='yes';
   ov.remove();
   if(!yes) return;
   try{
    simRestOfSeason();
    renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || b.closest('.wrap') || document.body);
   }catch(err){}
  });
 }, true); // capture: the quiet button never runs its instant handler
})();

// A15/A16 (Owner): the pick list — the box carries the name; the menu carries the number.
window.zpbPickList = function(host, items, curVal, onPick, staticHTML){
 // items: [{v, name, num}] — the closed box shows the name only; the opened menu shows name + number.
 const wrap = document.createElement('div'); wrap.className = 'zpb-pickwrap';
 const cur = items.find(x=>String(x.v)===String(curVal)) || items[0] || null;
 const btn = document.createElement('button'); btn.type='button'; btn.className='zpb-pickbtn';
 btn.innerHTML = (staticHTML || (cur ? '<span class="zpb-pickname">'+cur.name+'</span>' : '<span class="zpb-pickname">\\u2014</span>'));
 const menu = document.createElement('div'); menu.className = 'zpb-pickmenu';
 items.forEach(it=>{
  const r = document.createElement('button'); r.type='button'; r.className='zpb-pickrow';
  r.innerHTML = '<b>'+it.name+'</b><span class="zpb-picknum">'+(it.num!=null?it.num:'')+'</span>';
  r.addEventListener('click', ()=>{ menu.classList.remove('zpb-open'); onPick(it.v); });
  menu.appendChild(r);
 });
 btn.addEventListener('click', e=>{ e.stopPropagation(); const open = menu.classList.contains('zpb-open'); document.querySelectorAll('.zpb-pickmenu.zpb-open').forEach(m=>m.classList.remove('zpb-open')); if(!open) menu.classList.add('zpb-open'); });
 document.addEventListener('click', function close(){ if(!menu.contains(document.activeElement)) menu.classList.remove('zpb-open'); }, {once:false});
 wrap.appendChild(btn); wrap.appendChild(menu);
 return wrap;
};
// A16 (Owner): the KR/PR row — static name, the return rating on the right, "<NAME> x" in the menu.
window.__zpbRetItems = {};
window.returnerRowHTML = function(hostId){
 const S = (typeof seasonState!=='undefined') ? seasonState : null; if(!S || !S.teams) return '';
 const user = seasonUserTeam(); if(!user) return '';
 const cands = returnerCandidates(S.teams[user].slotmap).sort((a,b)=>returnerRating(b.p)-returnerRating(a.p));
 const cur = (S.returners||{})[user] || autoReturner(S.teams[user].slotmap);
 const curC = cands.find(c=>c.p[0]===cur) || cands[0];
 const items = cands.map(c=>({v:c.p[0], name:c.p[0], num:Math.round(returnerRating(c.p))}));
 window.__zpbRetItems[hostId] = items;
 return '<div class="depth-row lgrid" data-zpbret="1"><span class="slotname" title="Kick Returner">KR</span>'
  + '<span data-zpbret-host="'+hostId+'"></span>'
  + '<span class="dwar">'+(curC?Math.round(returnerRating(curC.p)):'')+'</span></div>';
};
window.wireLineupEditor = function(roster, hostId, onChange){
 const host = document.getElementById(hostId); if(!host) return;
 // KR row: mount the pick list
 (function(){
  const cell = host.querySelector('[data-zpbret-host]');
  const items = (window.__zpbRetItems||{})[hostId] || [];
  if(!cell || !items.length) return;
  const S = seasonState, user = seasonUserTeam();
  const cur = (S.returners||{})[user] || autoReturner(S.teams[user].slotmap);
  const has = items.some(x=>x.v===cur);
  const staticHTML = has ? '<span class="zpb-pickname">'+cur+'</span>' : '<span class="zpb-pickname">'+items[0].name+'</span>';
  cell.appendChild(window.zpbPickList(cell, items, cur, v=>{
   S.returners = S.returners||{}; S.returners[user]=v; RET_PICK.set(S.teams[user].slotmap, v); refreshUserAfterLineup(); if(onChange) onChange();
  }, staticHTML));
 })();
 // lineup slots: name-only box, name+OVR menu
 host.querySelectorAll('select[data-lineup]').forEach(sel=>{
  const sl = sel.dataset.lineup;
  const cur = roster.slots[sl];
  const poolNum = name=>{ try{ const p = Object.values(roster.slots).find(q=>q && q[0]===name); return p ? Math.round(effOvr(p, sl)) : ''; }catch(err){ return ''; } };
  const items = Array.from(sel.options).map(o=>({v:o.value, name:o.value, num:poolNum(o.value)}));
  const wrap = window.zpbPickList(sel.parentNode, items, cur?cur[0]:'', v=>{
   const ok = movePlayerToSlot(roster, v, sl);
   if(!ok) FX.toast('That swap is not allowed: the player cannot flex there, or it would leave someone out of position.');
   onChange();
  }, cur ? '<span class="zpb-pickname">'+cur[0]+'</span>' : '<span class="zpb-pickname">\u2014</span>');
  sel.replaceWith(wrap);
 });
 const ap = document.getElementById(hostId+'Apply'); if(ap) ap.addEventListener('click', ()=>{ applyLineup(roster, lineupAdvice(roster).best); onChange(); });
 if(typeof zpbFitLineupNames==='function') zpbFitLineupNames();
};

// B17 (Owner): hovering a station on the map lights the player's card below.
(function(){
 const findCard = slot=> document.querySelectorAll('.zpb-dbk[data-slot="'+slot+'"]');
 document.addEventListener('mouseover', e=>{
  const st = e.target.closest ? e.target.closest('.zpb-fm-ini[data-slot]') : null;
  document.querySelectorAll('.zpb-dbk.zpb-dbk-lit').forEach(el=>el.classList.remove('zpb-dbk-lit'));
  if(!st) return;
  findCard(st.dataset.slot).forEach(el=>el.classList.add('zpb-dbk-lit'));
 });
 document.addEventListener('mouseout', e=>{
  if(e.target.closest && e.target.closest('.zpb-fm-ini[data-slot]')){
   document.querySelectorAll('.zpb-dbk.zpb-dbk-lit').forEach(el=>el.classList.remove('zpb-dbk-lit'));
  }
 });
})();

// B4 (Owner): mobile-only swipe-through — the depth chart zones, the season badges, the browser pages.
(function(){
 const coarse = ()=> window.matchMedia && window.matchMedia('(pointer:coarse)').matches;
 const wire = (el, onLeft, onRight)=>{
  if(!el || el.dataset.zsw) return; el.dataset.zsw = '1';
  let x0=null, y0=null;
  el.addEventListener('touchstart', e=>{ if(!coarse()) return; const t=e.touches[0]; x0=t.clientX; y0=t.clientY; }, {passive:true});
  el.addEventListener('touchend', e=>{
   if(!coarse() || x0==null) return;
   const t=e.changedTouches[0], dx=t.clientX-x0, dy=t.clientY-y0;
   x0=y0=null;
   if(Math.abs(dx)<44 || Math.abs(dx)<Math.abs(dy)*1.4) return;
   if(dx<0){ try{ onLeft && onLeft(); }catch(err){} } else { try{ onRight && onRight(); }catch(err){} }
  }, {passive:true});
 };
 // 1) the player browser: swipe pages
 setInterval(()=>{
  try{
   const tbl = document.getElementById('playerTable'); if(tbl) wire(tbl, ()=>{ playerPage = Math.min(Math.max(1,(playerPage||1)+1), 999); renderPlayers(); }, ()=>{ playerPage = Math.max(1,(playerPage||1)-1); renderPlayers(); });
  }catch(err){}
 }, 1200);
 // 2) the depth chart zones: swipe flips the zone in view (scroll-snap does the motion)
 setInterval(()=>{
  try{ document.querySelectorAll('.zpb-dz').forEach(z=>{ if(!coarse()) return; if(z.dataset.zswZone) return; z.dataset.zswZone='1'; z.style.scrollSnapType='x mandatory'; }); }catch(err){}
 }, 1500);
 // 3) the season story zones already scroll-snap on mobile (CSS) — swipe is native there.
})();

// A8/B13 (Owner): ResizeObserver loop notices never become setbacks — belt and braces at the listener too.
(function(){
 try{
  const t = window.onerror;
  window.onerror = function(msg){
   try{ if(/ResizeObserver loop/i.test(String(msg||''))) return true; }catch(err){}
   return t ? t.apply(this, arguments) : undefined;
  };
 }catch(err){}
})();
<"+"/script>"""

# w32 in-place: the remaining mixed-case Dime renderers read DIME (A18)
def sub1(pat, repl, n=1, tag=''):
    global s
    rx = re.compile(pat)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)

sub1(r'<span class="slotname">Dime</span>', '<span class="slotname">DIME</span>', n=1, tag='dz-dime')
sub1(r"<li><b>Dime</b> \u2014", "<li><b>DIME</b> \u2014", n=2, tag='gloss-dime')

sub1(r", 'Dime'\);", ", 'DIME');", n=1, tag='lineupcell-dime')


# A35 cleanup: the orphaned hover wiring (dead since the tiles became badges) is deleted
_old_hover = re.compile(r"\(function\(\)\{\n let hideT = null;\n const show = btn=>\{\n  const pop = document\.getElementById\('zpbMetPop'\);[\s\S]*?\n\}\)\(\);")
_hits = len(_old_hover.findall(s))
if _hits != 1:
    print('FAIL [metpop-orphan] found', _hits); sys.exit(1)
s = _old_hover.sub(" // w32 (Owner): the hover wiring retired with the tiles\n", s, count=1)

# B22: the correlation aside on the season review reads integers too
def _sub1(pat, repl, n=1, tag=''):
    global s
    rx = re.compile(pat)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)
_sub1(r"\$\{skill\.r\.toFixed\(2\)\} vs\. trenches r = \$\{trench\.r\.toFixed\(2\)\}",
      "${Math.round(skill.r)} vs. trenches r = ${Math.round(trench.r)}", n=1, tag='corr-int')




# A29: the "what drives winning" bar graph is removed from the 100-season report
_needle = chr(39) + ' + drvRows + ' + chr(39)
_i100 = s.find('<div class="zpb-100sec">What drives winning in this model</div><div class="zpb-100bars">' + _needle + '</div>')
if _i100 < 0:
    print('FAIL [drv-rows]'); sys.exit(1)
s = s.replace('<div class="zpb-100sec">What drives winning in this model</div><div class="zpb-100bars">' + _needle + '</div>', '', 1)


# A35: the top panel carries the Owner's own title
def _sub2(pat, repl, n=1, tag=''):
    global s
    rx = re.compile(pat)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)
_rc_old = chr(34).join([' return <div class=', 'zpb-rcgrid', '>'])
# locate:  return '<div class="zpb-rcgrid">'
_rc_needle = "return '<div class=" + chr(34) + "zpb-rcgrid" + chr(34) + ">'"
_rc_swap  = "return '<div class=" + chr(34) + "zpb-rc-title" + chr(34) + ">UNIT REPORT CARD</div><div class=" + chr(34) + "zpb-rcgrid" + chr(34) + ">'"
if s.count(_rc_needle) != 1:
    print('FAIL [rc-title] count', s.count(_rc_needle)); sys.exit(1)
s = s.replace(_rc_needle, _rc_swap, 1)


# B22 sweep 2: the high-visibility decimals the Owner sees on the rankings + advanced cards
def _sub3(pat, repl, n=1, tag=''):
    global s
    rx = re.compile(pat)
    hits = len(rx.findall(s))
    if hits != n:
        print('FAIL [%s] hits=%d expected=%d' % (tag, hits, n)); sys.exit(1)
    s = rx.sub(lambda m: repl, s, count=n)
_sub3(r"<td class=\"score\">\$\{row\.score\.toFixed\(2\)\}</td>",
      "<td class=\"score\">${Math.round(row.score)}</td>", n=1, tag='rank-score')
_sub3(r"\['Turnover margin per game', x=>\(x\.tk-x\.to\)/x\.g, v=>\(v>=0\?\'\+\':\'\'\)\+v\.toFixed\(2\), \'takeaways minus giveaways\'\]",
      "['Turnover margin per game', x=>(x.tk-x.to)/x.g, v=>(v>=0?'+':'')+Math.round(v), 'takeaways minus giveaways']", n=1, tag='tov-pg')
_sub3(r"\['Touchdowns per game', x=>x\.td/x\.g, v=>v\.toFixed\(2\),",
      "['Touchdowns per game', x=>x.td/x.g, v=>Math.round(v),", n=1, tag='td-pg')
_sub3(r"\['Field goals per game', x=>x\.fg/x\.g, v=>v\.toFixed\(2\),",
      "['Field goals per game', x=>x.fg/x.g, v=>Math.round(v),", n=1, tag='fg-pg')
_sub3(r"\['Touchdowns / g', \(me\.td/me\.g\)\.toFixed\(2\),",
      "['Touchdowns / g', Math.round(me.td/me.g),", n=1, tag='td-pg2')
_sub3(r"\['Field goals / g', \(me\.fg/me\.g\)\.toFixed\(2\),",
      "['Field goals / g', Math.round(me.fg/me.g),", n=1, tag='fg-pg2')

anchor = '</body>'
if s.count(anchor) < 1:
    print('FAIL body anchor'); sys.exit(1)
s = s.replace(anchor, CSS + '\n' + JS + '\n</body>', 1)
# fix the intentionally-split closing tags
s = s.replace("<\"+\"/script>", "</script>")

io.open(DST, 'w', encoding='utf-8').write(s)
print('stage6 OK  md5', hashlib.md5(s.encode()).hexdigest(), 'bytes', len(s.encode()))
