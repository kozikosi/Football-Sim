// ================= Z-POST-BLUE WAVE 10 JS =================
// Owner tenth wave: full-bleed bar, graphical guide, draft-board upgrades,
// 100 Season Sim naming/gating, draft-finish cinematic, hovers, 3-4 toggle,
// FB/Punter draft slots, philosophy unlocked all season.
(function(){
'use strict';

// ---- full position names for hover titles (Owner directive) ----
const ZPB_FULL = {QB:'Quarterback',RB1:'Running Back 1',RB2:'Running Back 2',FB:'Fullback',
 WR1:'Wide Receiver 1',WR2:'Wide Receiver 2',WR3:'Wide Receiver 3',TE1:'Tight End 1',TE2:'Tight End 2',
 OT1:'Offensive Tackle 1',OT2:'Offensive Tackle 2',OG1:'Guard 1',OG2:'Guard 2',C:'Center',
 DE1:'Defensive End 1',DE2:'Defensive End 2',DT1:'Defensive Tackle 1',DT2:'Defensive Tackle 2',
 NT:'Nose Tackle',MIKE:'Middle Linebacker',ILB1:'Interior Linebacker 1',ILB2:'Interior Linebacker 2',
 OLB1:'Outside Linebacker 1',OLB2:'Outside Linebacker 2',
 WILL:'Weak Side Linebacker',SAM:'Strong Side Linebacker',
 CB1:'Cornerback 1',CB2:'Cornerback 2',CB3:'CB3',NICKEL:'CB3',
 SS:'Strong Safety',FS:'Free Safety',K:'Kicker',P:'Punter'};
document.addEventListener('mouseover', e=>{
 const el = e.target.closest ? e.target.closest('.slotname,[data-zslot],.zpb-lu-c,.zpb-pip') : null;
 if(!el) return;
 let k = el.dataset.zslot || (el.textContent||'').trim().toUpperCase();
 const t = ZPB_FULL[k]; if(t) el.title = t;
});

// ---- slow Star-Wars fading explainer system ----
let _swIO = null;
function zpbScanSW(){
 if(_swIO) _swIO.disconnect();
 _swIO = new IntersectionObserver(es=>{
  es.forEach(x=>{ if(x.isIntersecting) x.target.classList.add('zpb-sw-in');
                   else x.target.classList.remove('zpb-sw-in'); });
 },{threshold:0.15});
 document.querySelectorAll('.zpb-sw,.zpb-swmini').forEach(el=>_swIO.observe(el));
}
// a MutationObserver re-scans on every render (tab switches, week renders,
// draft ticks) — no monkey-patching of site functions needed
let _swPending = false;
const _swMO = ('MutationObserver' in window) ? new MutationObserver(()=>{
 if(_swPending) return; _swPending = true;
 requestAnimationFrame(()=>{ _swPending = false; zpbScanSW(); zpbWireReturners(); zpbFlexFoot(); zpbFillToggles(); });
}) : null;
if(_swMO) _swMO.observe(document.documentElement, {childList:true, subtree:true});

// wrap every <p> of an html blob in centered slow-fading blocks
window.zpbSwWrap = function(html){
 return String(html).split(/(?=<p)/).map(seg=>{
  const m = seg.match(/^<p[^>]*>([\s\S]*?)<\/p>$/);
  return m ? `<div class="zpb-sw">${m[1]}</div>` : seg;
 }).join('');
};
window.zpbSw = function(text, small){
 return `<div class="zpb-sw">${text}${small?`<small>${small}</small>`:''}</div>`;
};

// ---- guide graphics: positions ranked (engine-derived, auto-updates) ----
window.zpbPosRankHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);
 const mx = rows.length ? rows[0].w : 1;
 let h = '<div class="zpb-posrank">';
 rows.forEach((r,i)=>{
  h += `<div class="zpb-prrow${i===0?' zpb-prtop':''}"><span class="zpb-prank">${i+1}</span>`
     + `<span class="zpb-prname"${i>=0?' data-zslot="'+r.s+'"':''}>${(typeof LABELS!=='undefined'&&LABELS[r.s])||r.s}</span>`
     + `<span class="zpb-prbar" style="width:${Math.max(2.5, r.w/mx*100).toFixed(1)}%"></span>`
     + `<span class="zpb-prval" title="Wins added per season by upgrading this spot from a 70 to a 90">${r.w.toFixed(1)} wins</span></div>`;
 });
 h += '</div>';
 return h;
};
// cumulative series: 1 QB · 2 QB + CB1 · 3 QB + CB1 + DE1 … down to the last spot
window.zpbSeriesHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);
 let acc = [];
 const chips = rows.map((r,i)=>{
  acc.push((typeof LABELS!=='undefined'&&LABELS[r.s])||r.s);
  return `<span class="zpb-ser"><b>${i+1}</b>${acc.join(' + ')}</span>`;
 });
 return `<div class="zpb-series">${chips.join('')}</div>`;
};
// draft guide: graphic + series + the two fading explainers
window.zpbDraftGuideHTML = function(){
 return zpbPosRankHTML()
  + zpbSeriesHTML()
  + zpbSw('When to wait.', 'A position is worth waiting on when a nearly-as-good player will probably still be there at your next pick. Take him now when the next-best option is a big step down.')
  + zpbSw('Do not forget you can flex.', 'If a good lineman is available at a position you have already filled, he may still help you at another spot — the board shows his value at the spot he would actually fill, flex penalty included.')
  + '<div class="zpb-swgroup">'
  + zpbSwWrap(window.zpbFlexExplainHTML ? zpbFlexExplainHTML() : '')
  + zpbSw('Who decides? You do.', 'The math suggests the arrangement that wins the most games. Accept it, change any spot yourself, or deliberately play less efficiently. The computer teams always use the math\u2019s best arrangement.')
  + '</div>';
};
// values section: per-spot cards, engine-derived, with a short fading note
window.zpbValuesHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))})).sort((a,b)=>b.w-a.w);
 let h = '<div class="zpb-posrank">';
 rows.forEach((r,i)=>{
  h += `<div class="zpb-prrow"><span class="zpb-prank">${i+1}</span><span class="zpb-prname" data-zslot="${r.s}">${(typeof LABELS!=='undefined'&&LABELS[r.s])||r.s}</span>`
     + `<span class="zpb-prbar" style="width:${Math.max(1.5, r.w/rows[0].w*100).toFixed(1)}%"></span>`
     + `<span class="zpb-prval">${r.w.toFixed(2)}</span></div>`;
 });
 h += '</div>'
  + zpbSw('Where the wins come from.', 'Each spot\u2019s value splits between its two jobs — an offensive tackle\u2019s is mostly pass protection, a running back\u2019s mostly the run. Composition (how ratings are built) and importance (how much the rating matters) answer different questions.');
 return h;
};
// personnel: vertical schedule-style boxes (no meaning column)
window.zpbPersBoxesHTML = function(){
 if(typeof PERS === 'undefined') return '';
 let h = '<div class="zpb-persboxes">';
 Object.keys(PERS).forEach(k=>{
  const rb = +k[0], te = +k[1], wr = 5-rb-te;
  h += `<div class="zpb-persbox" title="${PERS[k].long}"><b>${k}</b><span>RB ${rb}</span><span>TE ${te}</span><span>WR ${wr}</span></div>`;
 });
 h += '</div>';
 return h;
};
// package movement viz + emphasis badges (symbols, no words)
window.zpbPkgVizHTML = function(){
 const dot = n => Array.from({length:n}, ()=>'<i></i>').join('');
 const badge = kind => kind==='pass'
   ? '<span class="zpb-emph" title="Pass emphasis"><i class="zp"></i><i class="zp zp2"></i><i class="zp zp3"></i></span>'
   : kind==='run'
   ? '<span class="zpb-emph" title="Run emphasis"><i class="rn"></i></span>'
   : '<span class="zpb-emph" title="Balanced"><i class="bal"></i></span>';
 return '<div class="zpb-pkg">'
  + '<div class="zpb-pkgcard"><h5>Base · 4-3</h5><div class="zpb-pkgdots">'+dot(4)+'<i class="db"></i>'+dot(3)+'</div><p>Four down linemen, three linebackers. Stronger against the run, a little thinner in coverage.</p></div>'
  + '<div class="zpb-pkgcard"><h5>3-4</h5><div class="zpb-pkgdots">'+dot(3)+'<i class="db"></i><i class="ldiff"></i>'+dot(3)+'<i class="ldiff"></i></div><p>The nose tackle holds the middle and a defensive tackle slides out — a linebacker family of two inside, two outside.</p></div>'
  + '<div class="zpb-pkgcard"><h5>Nickel</h5><div class="zpb-pkgdots">'+dot(4)+'<i class="db"></i><i class="ldiff"></i>'+dot(2)+'<i class="ldiff"></i><i></i></div><p>Nickel takes a linebacker off and puts the third corner on. The modern default.</p></div>'
  + '<div class="zpb-pkgcard"><h5>Focus</h5><div class="zpb-pkgdots">'+badge('pass')+' '+badge('run')+' '+badge('bal')+'</div><p>The same personnel can lean pass, lean run, or stay even — the badge shows the lean at a glance.</p></div>'
  + '</div>';
};
// coach guide: drop the Auto/Custom list, keep philosophy as a fading line,
// personnel boxes instead of the table, package viz added, style lists removed
window.zpbCoachGuideHTML = function(coach){
 let h = String(coach||'');
 h = h.replace(/<li><b>Auto \(recommended\)<\/b>[\s\S]*?<\/li>/, '')
      .replace(/<li><b>Custom<\/b>[\s\S]*?<\/li>/, '')
      .replace(/<h5 class="narr" style="margin:14px 0 6px;">What each style means<\/h5>[\s\S]*$/, '')
      .replace(/<h5 class="narr" style="margin:6px 0;">Offensive styles<\/h5>[\s\S]*$/, '');
 h += '<p class="narr" style="margin:8px 0 0;">Home field is worth +1.7 points a game in the model. It is baked into every projection — one reason home teams win slightly more often.</p>'
   + zpbPkgVizHTML()
   + '<div class="zpb-swgroup">'
   + zpbSw('Coaching philosophy.', 'Your default style, set on the Preseason page. If you leave it on Auto, the math picks the style that does best for your roster against an average team. Opponents scout it, and the recaps point out when you stray from it.')
   + '</div>';
 return h;
};
// glossary: softened ink + new entries a first-time viewer needs
window.zpbGlossHTML = function(){
 let h = (typeof termsHTML==='function') ? termsHTML() : '';
 h = h.replace('the 26 starting spots on this site', 'the 28 starting spots on this site');
 h = h.replace('a third cornerback', 'CB3 / ' + 'Nickel');
 h = h.replace('<ul class="gl">', '<ul class="gl zpb-gloss">');
 const extra = [
  ['2-Pt Conversion','One play from the 2-yard line worth two points instead of the one-point kick.'],
  ['Extra point (XP)','The one-point kick after a touchdown.'],
  ['Field goal (FG)','Three points, kicked usually on 4th down.'],
  ['4th & short','Fourth down with one to two yards to go — the chance to keep the drive alive.'],
  ['Punt','Kicking the ball away on 4th down to give the opponent worse field position.'],
  ['Punter','The specialist who punts.'],
  ['Fullback (FB)','A blocking back who leads the runner; rare in modern lineups.'],
  ['Nickel','A defense with five defensive backs — CB3 comes on, a linebacker comes off.'],
  ['3-4 / 4-3','The front seven\u2019s shape: three linemen and four linebackers, or four and three.'],
  ['Turnover','Losing the ball to the other team: interception or fumble.'],
  ['Sack','The quarterback tackled behind the line before he can throw.'],
  ['Red zone','The 20 yards before the end zone, where drives are expected to score.'],
  ['Clutch','The late part of a close game (4th quarter, small margin).']
 ];
 const lis = extra.map(([t,d])=>`<li><b>${t}</b> — ${d}</li>`).join('');
 h = h.replace(/<\/ul>\s*$/, lis + '</ul>');
 return h;
};
// flex explainer rebuilt in the draft-roster order
window.zpbFlexExplainHTML = function(){
 if(typeof flexExplainHTML === 'function'){
  let h = flexExplainHTML();
  // rows already list player families; keep, but the section now fades in blocks
  return h;
 }
 return '';
};

// ---- 3-4 / 4-3 base toggle (Owner: pick your base; math follows) ----
window.zpb34Labels = function(on){
 if(typeof LABELS === 'undefined') return;
 if(on){
  LABELS.DT1='NT'; LABELS.DT2='OLB1'; LABELS.MIKE='ILB1'; LABELS.WILL='ILB2'; LABELS.SAM='OLB2';
 } else {
  LABELS.DT1='DT1'; LABELS.DT2='DT2'; LABELS.MIKE='MIKE'; LABELS.WILL='WILL'; LABELS.SAM='SAM';
 }
 document.body.toggleAttribute('data-zbase34', !!on);
};
window.zpbToggleBase34 = function(on){
 window.ZPB34 = !!on;
 zpb34Labels(on);
 try{ localStorage.setItem('zpb:base34', on ? '1' : ''); }catch(err){}
 document.querySelectorAll('.zpb-basetoggle button').forEach(b=>{
  b.classList.toggle('zpb-base-on', (b.dataset.zbase === '34') === !!on);
 });
 const note = document.getElementById('zpb34note');
 if(note) note.textContent = on
  ? '3-4 front: the nose tackle holds the middle, a tackle slides outside, and the four linebackers are OLB1 · ILB1 · ILB2 · OLB2. OLBs count as outside linebackers; ILBs as inside linebackers. From 3-4 to Nickel the lowest-rated linebacker comes off for the Nickel.'
  : '4-3 front: four down linemen and three linebackers. From 4-3 to Nickel a linebacker comes off and the Nickel comes on.';
 if(typeof rerenderDraft === 'function') { try{ rerenderDraft(); }catch(err){} }
 if(typeof renderPreseasonView === 'function'){ try{ renderPreseasonView(); }catch(err){} }
};
window.zpbBaseToggleHTML = function(){
 const on = !!window.ZPB34;
 return '<span class="zpb-basetoggle" role="group" aria-label="Base defense">'
  + `<button type="button" data-zbase="43" class="${on?'':'zpb-base-on'}">4-3</button>`
  + `<button type="button" data-zbase="34" class="${on?'zpb-base-on':''}">3-4</button></span>`
  + '<span class="narr" id="zpb34note" style="font-size:0.72rem;max-width:420px;"></span>';
};
document.addEventListener('click', e=>{
 const b = e.target.closest ? e.target.closest('.zpb-basetoggle button') : null;
 if(b) zpbToggleBase34(b.dataset.zbase === '34');
});
try{ if(localStorage.getItem('zpb:base34')==='1'){ window.ZPB34 = true; zpb34Labels(true); } }catch(err){}

// 3-4 spec adjustment: OLB treated as WILL, ILB as MIKE (Owner rule)
window.zpbAdjSpec = function(name, spec){
 if(!window.ZPB34 || !spec) return spec;
 const key = name + ':' + (window._zpbAdjCache = window._zpbAdjCache || {});
 if(window._zpbAdjCache[key]) return window._zpbAdjCache[key];
 const adj = Object.assign({}, spec);
 const set = (o,v)=>{ if(adj[o]!=null || name==='frontRun' || name==='passRush' || name==='coverage' || name==='frontBase' || name==='frontNick' || name==='covBase' || name==='covNick') adj[o]=v; };
 if(name==='frontRun' || name==='frontBase' || name==='frontNick'){ set('DT2',1.0); set('SAM',1.0); }
 if(name==='passRush'){ set('DT2',0.3); }
 if(name==='coverage' || name==='covNick'){ set('DT2',0.4); if(name==='covNick') set('SAM',0.4); }
 window._zpbAdjCache[key] = adj;
 return adj;
};

// ---- draft board helpers ----
window.zpbSlotOrderOf = function(pos){
 if(typeof NATURAL_SLOT_MAP === 'undefined' || typeof ROSTER_SLOTS === 'undefined') return 99;
 const nat = NATURAL_SLOT_MAP[pos] || [];
 let best = 99;
 nat.forEach(s=>{ const i = ROSTER_SLOTS.indexOf(s); if(i>=0 && i<best) best = i; });
 return best;
};
// segmented Table / Cards control
document.addEventListener('click', e=>{
 const b = e.target.closest ? e.target.closest('#draftViewSeg button') : null;
 if(!b) return;
 const sel = document.getElementById('draftView2');
 if(!sel) return;
 sel.value = b.dataset.zview;
 sel.dispatchEvent(new Event('change', {bubbles:true}));
 document.querySelectorAll('#draftViewSeg button').forEach(x=>x.classList.toggle('zpb-seg-on', x===b));
});
// position pips: rebuild the position-count chips as filled/hollow dots
window.zpbPipsHTML = function(){
 if(typeof POS_SLOT_MAP==='undefined' || typeof ROSTER_SLOTS==='undefined') return '';
 let roster = null;
 try{ roster = draftSim && draftSim.rosters && draftSim.rosters[draftSim.userIndex]; }catch(err){}
 const per = {};
 ROSTER_SLOTS.forEach(s=>{
  const g = (typeof WV_SLOT_GROUP!=='undefined' && WV_SLOT_GROUP[s]) || s;
  per[g] = per[g] || {need:0, have:0};
  per[g].need++;
  if(roster && roster.slots[s]) per[g].have++;
 });
 const order = ['QB','RB','FB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','SS','FS','K','P'];
 let h = '<span class="zpb-pips">';
 Object.keys(per).sort((a,b)=>{
  const ia = order.indexOf(a), ib = order.indexOf(b);
  return (ia<0?99:ia)-(ib<0?99:ib);
 }).forEach(g=>{
  const full = per[g].have >= per[g].need;
  h += `<span class="zpb-pip${full?' zpb-pip-on':''}" title="${ZPB_FULL[g.toUpperCase()]||g}: ${per[g].have} of ${per[g].need} filled"><i></i>${g} ${per[g].have}/${per[g].need}</span>`;
 });
 return h + '</span>';
};

// ---- draft-finish cinematic: three sentences, one at a time, super slow ----
window.zpbMaybeFinishCine = function(){
 if(window._zpbFinDone) return;
 window._zpbFinDone = true;
 const lines = ['Play the season.', 'Coach your team to the Super Bowl.', 'Can you go <b>20-0</b>?'];
 const ov = document.createElement('div');
 ov.className = 'zpb-fin';
 lines.forEach(t=>{ const p = document.createElement('p'); p.innerHTML = t; ov.appendChild(p); });
 document.body.appendChild(ov);
 const ps = [...ov.querySelectorAll('p')];
 let i = 0;
 const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const step = ()=>{
  if(i>0) ps[i-1].classList.remove('zpb-fin-in');
  if(i>=ps.length){
   setTimeout(()=>{ ov.style.transition='opacity 1.6s ease'; ov.style.opacity='0';
    setTimeout(()=>ov.remove(), 1700); }, reduce ? 400 : 2600);
   return;
  }
  ps[i].classList.add('zpb-fin-in');
  i++;
  setTimeout(step, reduce ? 900 : 5200);
 };
 step();
};

// ---- preseason: KR / PR returner rows (PR defaults to the second best) ----
window.zpbWireReturners = function(){
 const kr = document.querySelector('select[data-returner="1"]');
 if(!kr || kr.dataset.zwired) return;
 kr.dataset.zwired = '1';
 const host = kr.closest('.zpb-retrow') || kr.parentElement;
 if(!host || document.querySelector('select[data-returner-pr="1"]')) return;
 if(typeof returnerCandidates !== 'function' || typeof returnerRating !== 'function') return;
 let cands;
 try{ cands = returnerCandidates((typeof seasonState!=='undefined' && seasonState && seasonState.teams) ? seasonState.teams[seasonUserTeam()].slotmap : {}); }catch(err){ return; }
 if(!cands || cands.length < 2) return;
 cands = cands.slice().sort((a,b)=>returnerRating(b.p)-returnerRating(a.p));
 const second = cands[1];
 const row = document.createElement('div');
 row.className = 'zpb-retrow';
 row.innerHTML = `<span class="slotname" data-zslot="PR" title="Punt Returner">PR</span>`
   + `<select data-returner-pr="1" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:6px 8px;color:var(--text);">`
   + cands.map(c=>`<option value="${c.p[0].replace(/"/g,'&quot;')}" ${c.p[0]===second.p[0]?'selected':''}>${c.p[0]} (${returnerRating(c.p).toFixed(0)})</option>`).join('')
   + `</select>`;
 host.parentElement.insertBefore(row, host.nextSibling);
 const sel = row.querySelector('select');
 sel.addEventListener('change', ()=>{
  try{
   if(typeof seasonState!=='undefined' && seasonState){
    seasonState.prReturners = seasonState.prReturners || {};
    seasonState.prReturners[seasonUserTeam()] = sel.value;
   }
  }catch(err){}
 });
};

// ---- preseason: the group-scores legend joins the bottom flexing row ----
window.zpbFlexFoot = function(){
 const foot = document.querySelector('.zpb-flexfoot');
 if(!foot || foot.dataset.zgsdone) return;
 const panel = foot.closest('.panel');
 if(!panel) return;
 const gs = [...panel.querySelectorAll('b')].find(b=>/Group scores/.test(b.textContent));
 if(gs){
  const gsWrap = gs.closest('div.narr') || gs.parentElement;
  foot.appendChild(gsWrap);
  foot.dataset.zgsdone = '1';
 }
};
// base-toggle hosts (draft sidebar + preseason philosophy panel)
window.zpbFillToggles = function(){
 if(typeof zpbBaseToggleHTML !== 'function') return;
 ['#zpbBaseToggleHost','#zpbBaseToggleHost2'].forEach(sel=>{
  const h = document.querySelector(sel);
  if(h && !h.dataset.zdone){ h.dataset.zdone = '1'; h.innerHTML = zpbBaseToggleHTML();
   const note = h.querySelector('#zpb34note'); if(note) note.textContent = window.ZPB34 ? '' : '4-3 front: four down linemen and three linebackers. From 4-3 to Nickel a linebacker comes off and the Nickel comes on.'; }
 });
};

// boot rescan
const _boot = ()=>{ zpbScanSW(); zpbWireReturners(); zpbFlexFoot(); zpbFillToggles(); };
if(document.readyState === 'complete') setTimeout(_boot, 400);
else window.addEventListener('load', ()=>setTimeout(_boot, 400));

})();
