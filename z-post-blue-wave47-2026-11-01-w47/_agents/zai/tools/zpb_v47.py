#!/usr/bin/env python3
# zpb_v47.py — the w47 build chain: exact-match replacements on the w46 bytes, with assertions.
# Base: Football-Sim-Z-post-blue-w46.html (md5 aca7fe4fbd1ec902a37ad341868cd105)
# Product: Football-Sim-Z-post-blue-w47.html
import hashlib, sys, re

SRC = '/home/z/my-project/w47work/base.html'
DST = '/home/z/my-project/w47work/Football-Sim-Z-post-blue-w47.html'

src = open(SRC, encoding='utf-8').read()
base_md5 = hashlib.md5(src.encode()).hexdigest()
assert base_md5 == 'aca7fe4fbd1ec902a37ad341868cd105', 'base md5 mismatch: ' + base_md5
s = src
applied = []

def rep(tag, old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, f'[{tag}] expected {count} occurrence(s), found {n}'
    s = s.replace(old, new)
    applied.append(tag)

# ================= T7 · swap the INSTANT and SLOW buttons =================
rep('T7-swap-a',
'<button class="tabbtn" id="speedInstantBtn">Instant</button>',
'@@ZPB_SLOW_FIRST@@')
rep('T7-swap-b',
'<button class="tabbtn active" id="speedSlowBtn">Slow</button>',
'<button class="tabbtn" id="speedInstantBtn">Instant</button>')
rep('T7-swap-c',
'@@ZPB_SLOW_FIRST@@',
'<button class="tabbtn active" id="speedSlowBtn">Slow</button>')

# ================= T24 · remove the topbar sentence on the season-complete view =================
rep('T24-topbar',
'<div class="zpb-sr-topbar"><span class="narr">Awards, stats, your report card and how the season was decided.</span><button class="resetbtn" id="seasonReviewBtn"',
'<div class="zpb-sr-topbar"><button class="resetbtn" id="seasonReviewBtn"')

# ================= T2 · the Madden ANCHOR chip goes golden in light mode (dark untouched) =================
rep('T2-anchor',
'.zpb-anch{border-color:#cfa3b5 !important;background:#f2dee6 !important;color:#43202f !important;} /* w46 (O1, Owner): the pink softens to the site\'s rose family, the dark chip untouched */',
'.zpb-anch{border-color:#cfa96b !important;background:#f4e6c3 !important;color:#4a3410 !important;} /* w47 (Owner): the chip wears the site\'s own gold family in light mode — the dark chip untouched */')

# ================= T5 · the DIME stacks under the NICKEL (both maps) =================
rep('T5-belong',
"+ xrow([['NICKEL',lbl('CB3')||'NICKEL',-3],['DIME','DIME',3]], 'def') // w33 (R4, Owner): the nickel holds; the dime takes the right DE's old station",
"+ xrow([['NICKEL',lbl('CB3')||'NICKEL',-3]], 'def') // w33 (R4, Owner): the nickel holds his station\n   + xrow([['DIME','DIME',-3]], 'def') // w47 (Owner): the dime stacks directly under the nickel — the N of NICKEL sits right above the D of DIME")

rep('T5-guide',
"+ xrow([['NICKEL',-3],['DIME',3]]) // w33 (R4, Owner): the nickel does not move; the dime takes the right DE's old station",
"+ xrow([['NICKEL',-3]])\n  + xrow([['DIME',-3]]) // w47 (Owner): the dime stacks under the nickel, the same station deep")

# ================= T1 · the lineup dropdown menu speaks last names once opened =================
rep('T1-helper',
"// A15/A16 (Owner): the pick list — the box carries the name; the menu carries the number.\nwindow.zpbPickList = function(host, items, curVal, onPick, staticHTML){",
"// w47 (Owner): the last name alone — Jr. is not a last name, particles stay with it (the map's own law)\nwindow.zpbLastName = function(n){ try{ const w = String(n||'').trim().split(/\\s+/); if(w.length<2) return w[0]||''; const SUF=/^(jr|sr|ii|iii|iv|v)\\.?$/i; const PART=/^(st|st\\.|van|von|de|da|di|del|della|la|le|mac|mc|o')\\.?$/i; const suf=[]; while(w.length>1 && SUF.test(w[w.length-1])) suf.unshift(w.pop()); let last=w[w.length-1]; if(w.length>1 && PART.test(w[w.length-2])) last=w[w.length-2]+' '+last; return suf.length? last+' '+suf.join(' ') : last; }catch(err){ return n; } };\n// A15/A16 (Owner): the pick list — the box carries the name; the menu carries the number.\n// w47 (Owner): once the menu OPENS the rows speak last names only (the closed box keeps the full name).\nwindow.zpbPickList = function(host, items, curVal, onPick, staticHTML){")

rep('T1-menu',
""" const menu = document.createElement('div'); menu.className = 'zpb-pickmenu';
 items.forEach(it=>{
  const r = document.createElement('button'); r.type='button'; r.className='zpb-pickrow';
  r.innerHTML = '<b>'+it.name+'</b><span class="zpb-picknum">'+(it.num!=null?it.num:'')+'</span>';""",
""" const menu = document.createElement('div'); menu.className = 'zpb-pickmenu';
 const _lnc = {}; items.forEach(it=>{ const _l = window.zpbLastName ? window.zpbLastName(it.name) : it.name; _lnc[_l] = (_lnc[_l]||0)+1; }); // w47: two same-last-name rows keep their full names
 items.forEach(it=>{
  const r = document.createElement('button'); r.type='button'; r.className='zpb-pickrow';
  const _ln = window.zpbLastName ? window.zpbLastName(it.name) : it.name;
  r.innerHTML = '<b>'+((_lnc[_ln]>1)?it.name:_ln)+'</b><span class="zpb-picknum">'+(it.num!=null?it.num:'')+'</span>';
  r.title = it.name; // w47 (Owner): the full name answers a hover; the menu reads last names""")

# ================= T8 · the Table/Cards toggle rides the top right of its panel =================
# (CSS lands in the w47 style block at the end)

# ================= T10 · the squares and triangles leave the lineup board =================
rep('T10-front',
'return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${window.zpbFrontPickHTML ? zpbFrontPickHTML(roster) : \'\'}</div><div class="draft-columns zpb-lu-cols"',
'return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div class="draft-columns zpb-lu-cols"')

# ================= T11/T12 · staged formation, UNDO, RETURN TO MODEL LINEUP =================
rep('T11-stage-of',
"  roster._zpbStage = {base: roster.slots, map, dirty:false};",
"  roster._zpbStage = {base: roster.slots, map, dirty:false, form:null}; // w47 (Owner): the formation waits for APPLY THE CHANGES too")

rep('T11-count',
"""function zpbStageCount(roster){
 const st = zpbStageOf(roster); let n = 0;
 Object.keys(st.map).forEach(sl=>{ const a = st.map[sl], b = roster.slots[sl]; if((a&&a[0])!==(b&&b[0])) n++; });
 return n;
}""",
"""function zpbStageCount(roster){
 const st = zpbStageOf(roster); let n = 0;
 Object.keys(st.map).forEach(sl=>{ const a = st.map[sl], b = roster.slots[sl]; if((a&&a[0])!==(b&&b[0])) n++; });
 if(st.form!=null && st.form !== !!window.ZPB34) n++; // w47 (Owner): the formation counts as a pending change
 return n;
}""")

rep('T12-undo-helper',
"""function zpbStageApply(roster){
 const st = zpbStageOf(roster);
 applyLineup(roster, st.map); // the same surgery that rebuilds slots and pick rounds together
 roster._zpbStage = null;
}""",
"""function zpbStageApply(roster){
 const st = zpbStageOf(roster);
 if(st.form!=null && st.form !== !!window.ZPB34) zpbToggleBase34(st.form); // w47 (Owner): APPLY THE CHANGES saves the formation preference
 window.zpbStagedForm = null;
 (roster._zpbUndo = roster._zpbUndo||[]).push({slots:{...roster.slots}, rounds:{...(roster.pickRounds||{})}}); // w47 (Owner): the UNDO button reverts the most recent applied move
 if(roster._zpbUndo.length>24) roster._zpbUndo.shift();
 applyLineup(roster, st.map); // the same surgery that rebuilds slots and pick rounds together
 roster._zpbStage = null;
}
// w47 (Owner): the lineups page's UNDO — one step back, exactly like the draft board's, without resetting the whole lineup
window.zpbUndoLineup = function(roster){
 const st = roster._zpbUndo && roster._zpbUndo.pop();
 if(!st) return false;
 const sm = roster.slots; Object.keys(sm).forEach(sl=>{ delete sm[sl]; });
 Object.keys(st.slots).forEach(sl=>{ sm[sl] = st.slots[sl]; });
 roster.pickRounds = {...(st.rounds||{})};
 return true;
};""")

# the base toggle stages inside a lineup editor, applies instantly in the draft sidebar
rep('T11-toggle-click',
"""document.addEventListener('click', e=>{
 const b = e.target.closest ? e.target.closest('.zpb-basetoggle button') : null;
 if(b) zpbToggleBase34(b.dataset.zbase === '34');
});""",
"""document.addEventListener('click', e=>{
 const b = e.target.closest ? e.target.closest('.zpb-basetoggle button') : null;
 if(!b) return;
 const want = b.dataset.zbase === '34';
 // w47 (Owner): beside a lineup editor the formation is a staged change — APPLY THE CHANGES commits it
 const _ed = ['lineupPre','lineupEd','lineupSeason'].map(id=>document.getElementById(id)).find(Boolean);
 if(_ed && typeof draftSim !== 'undefined' && draftSim){
  const _roster = draftSim.rosters && draftSim.rosters.find(r=>r.isUser);
  if(_roster){
   const st = zpbStageOf(_roster); st.form = want; st.dirty = true;
   window.zpbStagedForm = want;
   document.querySelectorAll('.zpb-basetoggle button').forEach(x=>x.classList.toggle('zpb-base-on',(x.dataset.zbase==='34')===want));
   ['lineupPre','lineupEd','lineupSeason'].forEach(id=>{
    const _ac = document.getElementById(id+'ApplyChanges'); if(!_ac) return;
    const _n = zpbStageCount(_roster);
    _ac.textContent = 'APPLY THE CHANGES'+(_n?` (${_n})`:'');
    _ac.disabled = !_n; // w47 (Owner): a formation-only stage must light APPLY THE CHANGES up
    const _rv = document.getElementById(id+'RevertChanges'); if(_rv) _rv.style.display = _n?'':'none';
   });
   return;
  }
 }
 zpbToggleBase34(want);
});""")

rep('T11-toggle-html',
"""window.zpbBaseToggleHTML = function(){
 const on = !!window.ZPB34;""",
"""window.zpbBaseToggleHTML = function(){
 const on = (window.zpbStagedForm!=null) ? !!window.zpbStagedForm : !!window.ZPB34; // w47 (Owner): the toggle previews the staged formation""")

rep('T12-revert',
""" const rv = document.getElementById(hostId+'RevertChanges'); if(rv) rv.addEventListener('click', ()=>{ roster._zpbStage = null; rerenderEditor(); });
 if(typeof zpbFitLineupNames==='function') zpbFitLineupNames();
};""",
""" const rv = document.getElementById(hostId+'RevertChanges'); if(rv) rv.addEventListener('click', ()=>{ roster._zpbStage = null; window.zpbStagedForm = null; rerenderEditor(); document.querySelectorAll('.zpb-basetoggle button').forEach(x=>x.classList.toggle('zpb-base-on',(x.dataset.zbase==='34')===!!window.ZPB34)); });
 const ud = document.getElementById(hostId+'Undo'); if(ud) ud.addEventListener('click', ()=>{ if(window.zpbUndoLineup(roster)){ roster._zpbStage = null; window.zpbStagedForm = null; rerenderEditor(); if(onChange) onChange(); } }); // w47 (Owner): the UNDO button — one move back, like the draft board's
 const mdl = document.getElementById(hostId+'Model'); if(mdl) mdl.addEventListener('click', ()=>{ try{ (roster._zpbUndo = roster._zpbUndo||[]).push({slots:{...roster.slots}, rounds:{...(roster.pickRounds||{})}}); applyLineup(roster, lineupAdvice(roster).best); }catch(err){} roster._zpbStage = null; window.zpbStagedForm = null; rerenderEditor(); if(onChange) onChange(); }); // w47 (Owner): RETURN TO MODEL LINEUP restores the math's lineup
 if(typeof zpbFitLineupNames==='function') zpbFitLineupNames();
};""")

# the editor's button bar: UNDO first, RETURN TO MODEL LINEUP beside APPLY
rep('T12-bar',
""" const pend = zpbStageCount(roster);
 const bar = `<div class="zpb-luapply" style="display:flex;gap:10px;align-items:center;justify-content:center;margin-top:14px;flex-wrap:wrap;">`
  + `<button class="resetbtn" id="${hostId}ApplyChanges" style="width:auto;padding:10px 26px;"${pend?'':' disabled'}>APPLY THE CHANGES${pend?` (${pend})`:''}</button>`
  + `<button class="resetbtn" id="${hostId}RevertChanges" style="width:auto;padding:10px 16px;${pend?'':'display:none;'}">REVERT CHANGES</button></div>`;""",
""" const pend = zpbStageCount(roster);
 const undos = (roster._zpbUndo||[]).length; // w47 (Owner): the UNDO button shows once a move has been applied
 let modelDiff = false; try{ const _best = lineupAdvice(roster).best; ROSTER_SLOTS.forEach(sl=>{ if(!modelDiff && (roster.slots[sl]&&roster.slots[sl][0])!==(_best[sl]&&_best[sl][0])) modelDiff = true; }); }catch(err){} // w47: RETURN TO MODEL LINEUP shows when the lineup no longer matches the model's
 const bar = `<div class="zpb-luapply" style="display:flex;gap:10px;align-items:center;justify-content:center;margin-top:14px;flex-wrap:wrap;">`
  + `<button class="tabbtn" id="${hostId}Undo" style="width:auto;padding:10px 16px;${undos?'':'display:none;'}" title="Take back your most recent applied move">\\u21b6 UNDO</button>`
  + `<button class="resetbtn" id="${hostId}ApplyChanges" style="width:auto;padding:10px 26px;"${pend?'':' disabled'}>APPLY THE CHANGES${pend?` (${pend})`:''}</button>`
  + `<button class="resetbtn" id="${hostId}Model" style="width:auto;padding:10px 16px;${modelDiff?'':'display:none;'}">RETURN TO MODEL LINEUP</button>`
  + `<button class="resetbtn" id="${hostId}RevertChanges" style="width:auto;padding:10px 16px;${pend?'':'display:none;'}">REVERT CHANGES</button></div>`;""")

# ================= T9 · the Full Depth Chart rows ride the map's beats (the cards sync with the players) =================
rep('T9-dz-row',
"""  const cls = e && e.name ? (e.ovr>=90 ? 'zpb-shm' : (e.ovr>=85 ? 'zpb-vib' : '')) : '';
  return `<div class="zpb-dz-row${e&&e.name&&zst?' zpb-trow':''}"${e&&e.name&&zst?` style="${zst}"`:''}><span class="slotname">${LABELS[s]||s}</span><span class="zpb-dz-name ${cls}">${nm}${rnd?` <span class="narr">R${rnd}</span>`:''}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;
 };""",
"""  const cls = e && e.name ? (e.ovr>=90 ? 'zpb-shm' : (e.ovr>=85 ? 'zpb-vib' : '')) : '';
  const _beat = (e && e.name && window.zpbBeatOf) ? (window.zpbBeatOf(e.name)||'') : ''; // w47 (Owner): the row lands when its player lands on the line-of-scrimmage map
  return `<div class="zpb-dz-row${e&&e.name&&zst?' zpb-trow':''}${_beat!==''?' zpb-dfc2':''}"${(_beat!==''||(e&&e.name&&zst))?` style="${_beat!==''?'--beat:'+_beat+';':''}${e&&e.name&&zst?zst:''}"`:''} data-slot="${s}"${e&&e.name?` title="${String(e.name).replace(/"/g,'&quot;')}"`:''}><span class="slotname">${LABELS[s]||s}</span><span class="zpb-dz-name ${cls}">${nm}${rnd?` <span class="narr">R${rnd}</span>`:''}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;
 };""")

rep('T9-dz-dime',
"""  const cls = e && e.name!=null ? (e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')) : '';
  return `<div class="zpb-dz-row"><span class="slotname">DIME</span><span class="zpb-dz-name ${cls}">${nm}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;""",
"""  const cls = e && e.name!=null ? (e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')) : '';
  const _beat = (e && e.name!=null && window.zpbBeatOf) ? (window.zpbBeatOf(e.name)||'') : ''; // w47: the Dime rides the same beat as his station
  return `<div class="zpb-dz-row${_beat!==''?' zpb-dfc2':''}"${_beat!==''?` style="--beat:${_beat};" data-slot="DIME"`:''}><span class="slotname">DIME</span><span class="zpb-dz-name ${cls}">${nm}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;""")

# the look-gate releases the depth-chart zones on the map's clock
rep('T9-gate-q',
"try{ els = document.querySelectorAll('.zpb-fm:not([data-zseen]),.zpb-dbk-g:not([data-zseen])'); }catch(err){ return; }",
"try{ els = document.querySelectorAll('.zpb-fm:not([data-zseen]),.zpb-dbk-g:not([data-zseen]),.zpb-dz:not([data-zseen])'); }catch(err){ return; } // w47 (Owner): the Full Depth Chart joins the look-gate")

rep('T9-gate-rel',
"""      if(el.classList && el.classList.contains('zpb-fm')){
       var _anc = el.parentElement;
       while(_anc && _anc !== document.body && !_anc.querySelector('.zpb-dbk-g')) _anc = _anc.parentElement;
       if(_anc){
        Array.prototype.forEach.call(_anc.querySelectorAll('.zpb-dbk-g:not([data-zseen])'), function(g2){
         var remain2 = (window.__zpbFinCineEndsAt||0) - Date.now();
         g2.style.setProperty('--dfc-cine', remain2 > 0 ? (Math.ceil(remain2/100)/10) + 's' : '0s');
         g2.dataset.zseen = '1'; g2.classList.add('zpb-seen'); io.unobserve(g2);
        });
       }
      }""",
"""      if(el.classList && el.classList.contains('zpb-fm')){
       var _anc = el.parentElement;
       while(_anc && _anc !== document.body && !_anc.querySelector('.zpb-dbk-g')) _anc = _anc.parentElement;
       if(_anc){
        Array.prototype.forEach.call(_anc.querySelectorAll('.zpb-dbk-g:not([data-zseen])'), function(g2){
         var remain2 = (window.__zpbFinCineEndsAt||0) - Date.now();
         g2.style.setProperty('--dfc-cine', remain2 > 0 ? (Math.ceil(remain2/100)/10) + 's' : '0s');
         g2.dataset.zseen = '1'; g2.classList.add('zpb-seen'); io.unobserve(g2);
        });
        Array.prototype.forEach.call(_anc.querySelectorAll('.zpb-dz:not([data-zseen])'), function(g3){ // w47 (Owner): the depth-chart rows release on the map's clock too — the cards sync with the players
         var remain3 = (window.__zpbFinCineEndsAt||0) - Date.now();
         g3.style.setProperty('--dfc-cine', remain3 > 0 ? (Math.ceil(remain3/100)/10) + 's' : '0s');
         g3.dataset.zseen = '1'; g3.classList.add('zpb-seen'); io.unobserve(g3);
        });
       }
      }""")

# ================= T14 · the dark halfway ink (the team's own 0.50 color at night) =================
rep('T14-pack',
"""  return _ink;
 }catch(err){ return (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; } })();
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);""",
"""  return _ink;
 }catch(err){ return (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL; } })();
 const txMd=(function(){ try{ // w47 (Owner): the dark halfway ink — the mirror of the light law: half of the way from the dark page ink to the team's crayola anchor, clamped to read on the dark page
  const _base = (_txc && _txc.l<0.52) ? zpbFromHsl(_txc.h,_txc.s,0.52) : txL;
  const _m=zpbMix('#f5e9dd',_base,0.5), _c=zpbHsl(_m);
  let _ink=zpbFromHsl(_c.h, Math.min(0.9,Math.max(0.25,_c.s)), Math.min(0.86,Math.max(0.60,_c.l)));
  try{ let _g=0; while(_g<9 && zpbContrast(_ink,'#181114')<4.5){ const _c2=zpbHsl(_ink); _ink=zpbFromHsl(_c2.h,_c2.s,Math.min(0.94,_c2.l+0.02)); _g++; } }catch(err){}
  return _ink;
 }catch(err){ return accD; } })();
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);""")

rep('T14-pk',
"  txL, txM, txd, sud, hairL, hairD,",
"  txL, txM, txMd, txd, sud, hairL, hairD,")

rep('T14-colof',
"   return dark ? (pk.txd||pk.accD) : (pk.txM||pk.accL); };",
"   return dark ? (pk.txMd||pk.txd||pk.accD) : (pk.txM||pk.accL); }; // w47 (Owner): the during-game ink is the team's own 0.50 color at night — the neutral cream retires from the team's names",
2)

rep('T14-sc chips',
"style=\"--scA:' + (pkA?(pkA.txM||pkA.accL):'inherit') + ';--scAd:' + (pkA?(pkA.txd||pkA.accD):'inherit') + ';\" id=\"zrepSa\">0</span>",
"style=\"--scA:' + (pkA?(pkA.txM||pkA.accL):'inherit') + ';--scAd:' + (pkA?(pkA.txMd||pkA.txd||pkA.accD):'inherit') + ';\" id=\"zrepSa\">0</span>")

rep('T14-sc chips h',
"style=\"--scH:' + (pkH?(pkH.txM||pkH.accL):'inherit') + ';--scHd:' + (pkH?(pkH.txd||pkH.accD):'inherit') + ';\" id=\"zrepSh\">0</span>",
"style=\"--scH:' + (pkH?(pkH.txM||pkH.accL):'inherit') + ';--scHd:' + (pkH?(pkH.txMd||pkH.txd||pkH.accD):'inherit') + ';\" id=\"zrepSh\">0</span>")

# the recap's final score rides the dark halfway too
rep('T14-recap',
"return a||h ? ` style=\"--scA:${a?(a.txM||a.accL):'inherit'};--scAd:${a?a.txd:'inherit'};--scH:${h?(h.txM||h.accL):'inherit'};--scHd:${h?h.txd:'inherit'};\"` : ''; })()",
"return a||h ? ` style=\"--scA:${a?(a.txM||a.accL):'inherit'};--scAd:${a?(a.txMd||a.txd):'inherit'};--scH:${h?(h.txM||h.accL):'inherit'};--scHd:${h?(h.txMd||h.txd):'inherit'};\"` : ''; })()")

# ================= T25 · the box score's final numbers join the 0.50 tone (every stage) =================
rep('T25-linescore',
".linescore tr td:last-child{color:var(--tA2,var(--accent));font-weight:800;}",
".linescore tr td:last-child{color:var(--tn,var(--text));font-weight:800;} /* w47 (Owner): the final column reads the same faded 0.50 tone as the rest of the box score */\n:root[data-theme=\"dark\"] .linescore tr td:last-child{color:var(--tnd,var(--text));}\n@media (prefers-color-scheme: dark){ :root:not([data-theme=\"light\"]) .linescore tr td:last-child{color:var(--tnd,var(--text));} }")

# ================= T22 · SIM PLAYOFFS stays quiet — no during-game interrupts mid-loop =================
rep('T22-quiet-sim',
" if(typeof zpbGameReplay==='function' && rk!=='superbowl'){ const _u = seasonUserTeam(); const _ug = games.find(x=>x.home===_u||x.away===_u); if(_ug && _ug.result && _ug.result.homeEvents && _ug.result.homeEvents.length) zpbGameReplay(_ug, _u); } // w33 (R34, Owner): the Super Bowl does not open the during-game cinematic — it goes to the post-Super-Bowl page",
" if(typeof zpbGameReplay==='function' && rk!=='superbowl' && !window.__zpbQuietSim){ const _u = seasonUserTeam(); const _ug = games.find(x=>x.home===_u||x.away===_u); if(_ug && _ug.result && _ug.result.homeEvents && _ug.result.homeEvents.length) zpbGameReplay(_ug, _u); } // w33 (R34, Owner): the Super Bowl does not open the during-game cinematic — it goes to the post-Super-Bowl page · w47 (Owner): SIM PLAYOFFS runs quiet")

# ================= T23 · the playoff-run cinematics (the user's team, round by round, before the Super Bowl shows) =================
rep('T23-simbtn',
" document.getElementById('simPlayoffsBtn').addEventListener('click', ()=>{ startPlayoffs(); for(const rk of ['wildcard','divisional','champ','superbowl']){ simulatePlayoffRound(); if(rk!=='superbowl') advancePlayoffRound(); } renderSeasonTab(container); });",
""" document.getElementById('simPlayoffsBtn').addEventListener('click', ()=>{
  // w47 (Owner): the user's playoff run plays as its own cinematics — one per round, joyous for a win,
  // plain for a loss — then the Super Bowl reveal mounts. No gold, no confetti: the team's own ink.
  const _user = seasonUserTeam();
  const _story = [];
  window.__zpbQuietSim = true; window.__zpbPoRunHold = true;
  try{
   startPlayoffs();
   for(const rk of ['wildcard','divisional','champ','superbowl']){
    simulatePlayoffRound();
    if(rk!=='superbowl'){
     const g = (seasonState.playoffRounds[rk]||[]).find(x=>x.home===_user||x.away===_user);
     if(g && g.result){
      const homeWin = g.result.homeScore>=g.result.awayScore;
      const won = g.home===_user ? homeWin : !homeWin;
      _story.push({rk, win:won, fs:(g.home===_user?g.result.homeScore:g.result.awayScore), os:(g.home===_user?g.result.awayScore:g.result.homeScore), opp:(g.home===_user?g.away:g.home)});
     }
     advancePlayoffRound();
    }
   }
  } finally { window.__zpbQuietSim = false; }
  renderSeasonTab(container);
  if(_story.length && window.__zpbPoRunHold && typeof window.zpbPlayoffRunCine==='function') window.zpbPlayoffRunCine(_story);
  else { window.__zpbPoRunHold = false; }
 });""")

# the SB stage waits for the run cinematics
rep('T23-sb-hold',
"""   if(window.__zpbSBFinPending && seasonState && seasonState.champion){
    window.__zpbSBFinPending = false;
    zpbPostSuperBowlCine(); // w42 (I7, Owner): the golden storm mounts in the SAME paint as the page — it covers before the page underneath can flash (the regular season cinematic's logic)
   }""",
"""   if(window.__zpbSBFinPending && seasonState && seasonState.champion){
    if(window.__zpbPoRunHold){ try{ zpbPostSuperBowlCine.__held = true; }catch(err){} return out; } // w47 (Owner): the round cinematics play first — the storm mounts when they fade
    window.__zpbSBFinPending = false;
    zpbPostSuperBowlCine(); // w42 (I7, Owner): the golden storm mounts in the SAME paint as the page — it covers before the page underneath can flash (the regular season cinematic's logic)
   }""")

# ================= T17/T18/T19 · the award reasons become badges =================
rep('T17-opoy',
""" out.individual.push({title:'Offensive Player of the Year', c:opoy, why:`the top non-quarterback on offense, rated ${Math.round(rate(opoy))}`}); // w32 (Owner): integers
 out.individual.push({title:'Defensive Player of the Year', c:dpoy, why:`rated ${Math.round(rate(dpoy))} among the league's defenders (${dpoy.pos})`}); // w32 (Owner): integers
 const cw = W[coach], ce = EW[coach];
 out.individual.push({title:'Coach of the Year', team:coach, coach:headCoach(coach), why:`${headCoach(coach)} led them to ${cw} wins against ${Math.round(ce)} projected from the roster's own ratings (+${Math.round(cw-ce)})`}); // w32 (Owner): integers""",
""" { // w47 (Owner): the sentence becomes two badges — the rank at his position and the rating
   const _rk = (()=>{ try{ const _q = Object.values(S.playerStats).filter(x=>x.group===opoy.group && x.gp>=8); return 1 + _q.filter(x=>x.name!==opoy.name && rate(x)>rate(opoy)).length; }catch(err){ return 1; } })();
   out.individual.push({title:'Offensive Player of the Year', c:opoy, why:`the top non-quarterback on offense, rated ${Math.round(rate(opoy))}`, badges:[{v:'#'+_rk, k:opoy.group},{v:String(Math.round(rate(opoy))), k:'RTG'}]});
 }
 { // w47 (Owner): the depth-chart spot he actually played the most, not the award's raw EDGE tag
   let _sl = '';
   try{ const _t = seasonState && seasonState.teams && seasonState.teams[dpoy.team]; const _sm = _t && _t.slotmap;
    if(_sm){ Object.keys(_sm).forEach(k=>{ const en=_sm[k]; const nm = en && (en[0]||en.name); if(nm===dpoy.name && !_sl) _sl = (typeof LABELS!=='undefined' && LABELS[k]) ? LABELS[k] : k; }); }
   }catch(err){}
   if(!_sl) _sl = dpoy.pos;
   out.individual.push({title:'Defensive Player of the Year', c:dpoy, why:`rated ${Math.round(rate(dpoy))} among the league's defenders (${dpoy.pos})`, badges:[{v:_sl, k:''},{v:String(Math.round(rate(dpoy))), k:'RTG'}], poschip:_sl}); // w47 (Owner): the EDGE tag retires from the card too
 }
 const cw = W[coach], ce = EW[coach];
 out.individual.push({title:'Coach of the Year', team:coach, coach:headCoach(coach), why:`${headCoach(coach)} led them to ${cw} wins against ${Math.round(ce)} projected from the roster's own ratings (+${Math.round(cw-ce)})`, badges:[{v:String(Math.round(ce)), k:'PROJ W'},{v:String(cw), k:'W'}]}); // w32 (Owner): integers · w47 (Owner): the projection and the record wear badges""")

# ================= T20 · the statistical champions wear stat badges, not plaintext =================
rep('T20-stat-rec',
"if(r) out.stat.push({title:label, name:r.name, team:r.team, line:fmt(r)}); };",
"if(r) out.stat.push({title:label, name:r.name, team:r.team, line:fmt(r), rec:r}); }; // w47 (Owner): the row rides along — the champions' stats render as badges")

rep('T20-rec-rec',
"if(recLead) out.stat.push({title:'Receiving Yards', name:recLead.name, team:recLead.team, line:`${fmtN(recLead.st.rec)}/${fmtN(recLead.st.tgt)} rec, ${fmtN(recLead.st.recYds)} yds, ${recLead.st.recTD||0} TD`});",
"if(recLead) out.stat.push({title:'Receiving Yards', name:recLead.name, team:recLead.team, line:`${fmtN(recLead.st.rec)}/${fmtN(recLead.st.tgt)} rec, ${fmtN(recLead.st.recYds)} yds, ${recLead.st.recTD||0} TD`, rec:recLead}); // w47: badges below the name")

rep('T12-apply-rerender',
" const ac = document.getElementById(hostId+'ApplyChanges'); if(ac) ac.addEventListener('click', ()=>{ zpbStageApply(roster); if(onChange) onChange(); });",
" const ac = document.getElementById(hostId+'ApplyChanges'); if(ac) ac.addEventListener('click', ()=>{ zpbStageApply(roster); rerenderEditor(); if(onChange) onChange(); }); // w47 (Owner): the bar repaints the moment APPLY lands — UNDO and RETURN TO MODEL LINEUP show at once")

# ================= the awards renderer: badge rows, indented summary lines, logos in the honor chips =================
rep('T16-21-renderer',
"""  const ind = A.individual.map(a=> a.c
   ? aw(a.title, a.c.name, a.c.team, a.c.pos, a.why, a.c.team===user, a.c.rec||null, a.title==='Most Valuable Player')
   : aw(a.title, (a.coach? a.coach+' \\u00b7 ':'')+(a.team||''), a.team, '', a.why, a.team===user)).join('');
  const stat = A.stat.map(a=>aw(a.title, a.name, a.team, a.line, '', a.team===user)).join('');
  const us = A.userSummary;
  const usTxt = (us.mine.length||us.ap1||us.ap2||us.pb)
   ? (user+': '+us.ap1+' First-Team All-Pro, '+us.ap2+' Second-Team All-Pro, '+us.pb+' Pro Bowl selection'+(us.pb===1?'':'s')+(us.mine.length?'  ·  '+us.mine.join('; '):'')+'.')
   : ('No '+user+' players earned league-wide honors this year.');""",
"""  const bdg = bs => '<span class="zpb-bdgrow">'+bs.map(b=>'<span class="zpb-schip"><b>'+b.v+'</b>'+(b.k?'<i>'+b.k+'</i>':'')+'</span>').join('<span class="zpb-sdot">·</span>')+'</span>'; // w47 (Owner): the award reasons wear badges
  const ind = A.individual.map(a=>{ const _why = (a.badges && a.badges.length) ? bdg(a.badges) : a.why; return a.c
   ? aw(a.title, a.c.name, a.c.team, (a.poschip || a.c.pos), _why, a.c.team===user, a.c.rec||null, a.title==='Most Valuable Player')
   : aw(a.title, (a.coach? a.coach+' \\u00b7 ':'')+(a.team||''), a.team, '', _why, a.team===user); }).join('');
  const stat = A.stat.map(a=>aw(a.title, a.name, a.team, '', '', a.team===user, a.rec||null)).join(''); // w47 (Owner): the champions' numbers render as badges, not plaintext
  const us = A.userSummary;
  const usTxt = (us.mine.length||us.ap1||us.ap2||us.pb)
   ? (user+'  ·  '+us.ap1+' First-Team All-Pro  ·  '+us.ap2+' Second-Team All-Pro  ·  '+us.pb+' Pro Bowl selection'+(us.pb===1?'':'s')+'.'
      +(us.mine.length? '<span class="zpb-uslines">'+us.mine.map(m=>'<span class="zpb-usline">'+m+'</span>').join('')+'</span>' : '')) // w47 (Owner): each honor on its own indented line
   : ('No '+user+' players earned league-wide honors this year.');""")

rep('T21-aplogos',
"""<b class="zpb-gname '+((shm||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(c.name)))?'zpb-shm':'')+'">'+c.name+'</b> <i class="narr">'+nick(c.team)+'</i></span>').join('') : '<span class="narr">\\u00b7</span>')+'</div>').join('');""",
"""<b class="zpb-gname '+((shm||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(c.name)))?'zpb-shm':'')+'">'+c.name+'</b> <i class="narr zpb-aplog">'+((typeof zpbTeamLogo==='function')?zpbTeamLogo(c.team):nick(c.team))+'</i></span>').join('') : '<span class="narr">\\u00b7</span>')+'</div>').join(''); // w47 (Owner): the crest leads the chip — the team name retires from the honor rows""")

rep('T21-honor',
'return `<span${attr}>${c.name}</span> <span class="narr">${nick(c.team)}</span>`;',
'return `<span${attr}>${c.name}</span> <span class="narr zpb-aplog">${(typeof zpbTeamLogo===\'function\')?zpbTeamLogo(c.team):nick(c.team)}</span>`; // w47 (Owner): the crest instead of the team name on the honor cards and the All-Playoff panels')

rep('T21-sbmvp',
"if(P.sbMvp) lines.push('<div class=\"zpb-awline zpb-awline-mvp\">'+aw('Super Bowl MVP', P.sbMvp, (P.sbMvp.game? P.sbMvp.game.away+' '+P.sbMvp.game.result.awayScore+', '+P.sbMvp.game.home+' '+P.sbMvp.game.result.homeScore : ''), P.sbMvp.team===user)+'</div>');",
"if(P.sbMvp) lines.push('<div class=\"zpb-awline zpb-awline-mvp\">'+aw('Super Bowl MVP', P.sbMvp, (P.sbMvp.game? ((typeof zpbTeamLogo==='function')?zpbTeamLogo(P.sbMvp.game.away):P.sbMvp.game.away)+' '+P.sbMvp.game.result.awayScore+' \\u00b7 '+P.sbMvp.game.result.homeScore+' '+((typeof zpbTeamLogo==='function')?zpbTeamLogo(P.sbMvp.game.home):P.sbMvp.game.home) : ''), P.sbMvp.team===user)+'</div>'); // w47 (Owner): the crests carry the final, not the team names")

# the GAME PLAN panel joins the readable-caption law
rep('T13-planpanel',
' return `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">GAME PLAN</h3>',
' return `<div class="panel zpb-planpanel" style="margin-bottom:14px;"><h3 style="margin-top:0;">GAME PLAN</h3>')

# fix the no-story path: the storm still mounts
rep('T23-nostory',
"""  if(_story.length && window.__zpbPoRunHold && typeof window.zpbPlayoffRunCine==='function') window.zpbPlayoffRunCine(_story);
  else { window.__zpbPoRunHold = false; }
 });""",
"""  if(_story.length && window.__zpbPoRunHold && typeof window.zpbPlayoffRunCine==='function') window.zpbPlayoffRunCine(_story);
  else { window.__zpbPoRunHold = false; if(window.__zpbSBFinPending && seasonState && seasonState.champion){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} } }
 });""")

# ================= T4 · the theme default follows the computer; a device without a signal boots dark =================
rep('T4-w32-guard',
''':root[data-theme="dark"],:root:not([data-theme="light"]){
 --bg:#1e1119; --panel:#291a24; --panel2:#35202d;
 --sub:#c99cae; --rosehair:#4a3040;
}''',
''':root[data-theme="dark"]{
 --bg:#1e1119; --panel:#291a24; --panel2:#35202d;
 --sub:#c99cae; --rosehair:#4a3040;
} /* w47 (Owner): the system-dark path lives in the media query below — the computer decides, dark is the fallback */''')

rep('T4-toggle-pin',
"let saved = null; try{ saved = localStorage.getItem('zpb:theme'); }catch(err){}\n  apply(saved);",
"let saved = null; try{ saved = localStorage.getItem('zpb:theme'); }catch(err){}\n  if(!saved && !(window.matchMedia && (window.matchMedia('(prefers-color-scheme: light)').matches || window.matchMedia('(prefers-color-scheme: dark)').matches))) saved = 'dark'; // w47 (Owner): the theme button's init keeps the no-signal dark boot\n  apply(saved);")

rep('T4-boot',
"<script>try{var t=localStorage.getItem('zpb:theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>",
"<script>try{var t=localStorage.getItem('zpb:theme');if(t)document.documentElement.setAttribute('data-theme',t);else if(!(window.matchMedia&&(window.matchMedia('(prefers-color-scheme: light)').matches||window.matchMedia('(prefers-color-scheme: dark)').matches)))document.documentElement.setAttribute('data-theme','dark');}catch(e){}</script>")

# ================= the gold audit's find: the ANCHOR/LEAK chips join the tier law =================
rep('A2-anchor-tier',
'narr = `<span class="zpb-anch" title="The player this roster leans on"><b>ANCHOR</b> <span class="zpb-anchname">${best.name} · ${best.slot} · ${best.ovr}</span></span>`',
'narr = `<span class="zpb-anch" title="The player this roster leans on"><b>ANCHOR</b> <span class="zpb-anchname ${best.ovr>=90?\'zpb-shm\':(best.ovr>=85?\'zpb-vib\':\'\')}">${best.name} · ${best.slot} · ${best.ovr}</span></span>` // w47 (Owner): the anchored player shimmers at 90+ and reads bold at 85+, like every other surface',
2)

# ================= the w47 block: the run cinematics + every CSS law this wave =================
W47_BLOCK = '''<script id="zpb-w47-js">
// ============ Z-POST-BLUE W47 (the Owner's round-47) ============
// The playoff-run cinematics: one card per round the user's team played — joyous for a win,
// plain for a loss — then the Super Bowl storm mounts. Same format as the stage, no gold, no confetti.
window.zpbPlayoffRunCine = function(story){
 try{
  if(!story || !story.length){ window.__zpbPoRunHold = false; return; }
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   window.__zpbPoRunHold = false;
   if(window.__zpbSBFinPending){ window.__zpbSBFinPending = false; try{ zpbPostSuperBowlCine(); }catch(err){} }
   return;
  }
  const user = seasonUserTeam();
  const pkU = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
  const RL = {wildcard:'WILD CARD ROUND', divisional:'DIVISIONAL ROUND', champ:'CONFERENCE CHAMPIONSHIP'};
  const ov = document.createElement('div'); ov.className = 'zpb-porun';
  if(pkU) ov.style.setProperty('--pk', pkU.accD);
  document.body.appendChild(ov);
  let i = 0;
  const show = ()=>{
   if(i >= story.length){
    window.__zpbPoRunHold = false;
    ov.style.opacity = '0';
    setTimeout(()=>{
     try{ ov.remove(); }catch(err){}
     window.__zpbSBFinPending = false;
     try{ if(seasonState && seasonState.champion) zpbPostSuperBowlCine(); }catch(err){}
    }, 560);
    return;
   }
   const st = story[i++];
   const teamInk = (pkU && pkU.txMd) ? pkU.txMd : 'var(--text)';
   const ab = t => (typeof TEAM_ABBR !== 'undefined' && TEAM_ABBR[t]) ? TEAM_ABBR[t] : t;
   const lg = t => (typeof zpbTeamLogo === 'function') ? zpbTeamLogo(t) : '';
   const big = st.win ? (ab(user) + ' WIN') : 'SEASON ENDS';
   ov.innerHTML = '<div class="zpb-porun-stage' + (st.win ? ' zpb-porun-win' : ' zpb-porun-loss') + '">'
    + '<div class="zpb-porun-kicker">' + (RL[st.rk] || String(st.rk).toUpperCase()) + '</div>'
    + '<div class="zpb-porun-big" style="color:' + (st.win ? teamInk : 'var(--sub)') + ';">' + big + '</div>'
    + '<div class="zpb-porun-score"><b>' + lg(user) + ' ' + ab(user) + '</b><b class="zpb-porun-num">' + st.fs + '</b><i>\\u00b7</i><b class="zpb-porun-num">' + st.os + '</b><b>' + ab(st.opp) + ' ' + lg(st.opp) + '</b></div>'
    + '<div class="zpb-porun-sub">' + (st.win ? 'ONE STEP CLOSER' : 'THE RUN ENDS HERE') + '</div>'
    + '</div>';
   ov.classList.add('zpb-porun-in');
   ov.classList.remove('zpb-porun-swap'); void ov.offsetWidth; ov.classList.add('zpb-porun-swap');
   setTimeout(show, 3400);
  };
  show();
 }catch(err){
  window.__zpbPoRunHold = false;
  try{ if(window.__zpbSBFinPending){ window.__zpbSBFinPending = false; zpbPostSuperBowlCine(); } }catch(e2){}
 }
};
</script>
<style id="zpb-w47-css">
/* ============ Z-POST-BLUE W47 CSS ============ */
/* w47 (Owner): the gold is the CONSTANT deep gold on every team — the sweep's pale bands retire.
   The Chiefs and the Raiders wear the same gold at the same moment; the shimmer itself becomes
   one synchronized glow in the text's own gold. */
@supports ((-webkit-background-clip:text) or (background-clip:text)){
 .zpb-shm,.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:none !important;-webkit-background-clip:border-box;background-clip:border-box;color:var(--zshim,var(--tA2,var(--zrb,var(--gold3)))) !important;-webkit-text-fill-color:var(--zshim,var(--tA2,var(--zrb,var(--gold3)))) !important;}
}
.zpb-shm,.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{animation:zpbshimglow 3.4s ease-in-out infinite;}
@keyframes zpbshimglow{0%,100%{text-shadow:0 0 0 rgba(250,235,200,0);}50%{text-shadow:0 0 16px currentColor;}}
@media (prefers-reduced-motion: reduce){ .zpb-shm,.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{animation:none !important;text-shadow:none !important;} }
/* w47 (Owner): the selected option on the toggles reads clearly at night — the faded wash that read
   like the OPPOSITE choice is gone (the 4-3 / 3-4 toggle, the roster view, the Table/Cards segment). */
:root[data-theme="dark"] .zpb-basetoggle button.zpb-base-on,:root:not([data-theme="light"]) .zpb-basetoggle button.zpb-base-on{background:rgba(217,179,106,.26) !important;color:#ecd398 !important;box-shadow:inset 0 0 0 1px rgba(217,179,106,.5);}
:root[data-theme="dark"] .zpb-viewtoggle button.zpb-view-on,:root:not([data-theme="light"]) .zpb-viewtoggle button.zpb-view-on{background:rgba(217,179,106,.26) !important;color:#ecd398 !important;box-shadow:inset 0 0 0 1px rgba(217,179,106,.5);}
:root[data-theme="dark"] .zpb-seg button.zpb-seg-on,:root:not([data-theme="light"]) .zpb-seg button.zpb-seg-on{background:rgba(217,179,106,.26) !important;color:#ecd398 !important;box-shadow:inset 0 0 0 1px rgba(217,179,106,.5);}
/* w47 (Owner): the Table/Cards toggle rides the top right of its panel */
#draftViewSeg{margin-left:auto;}
/* w47 (Owner): the depth-chart rows land with their players — released by the map's gate, one beat each */
.zpb-dz:not(.zpb-seen) .zpb-dfc2{opacity:0;animation:none;}
.zpb-dz.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);}
@media (prefers-reduced-motion: reduce){ .zpb-dz .zpb-dfc2{opacity:1 !important;animation:none !important;} }
/* w47 (Owner): the plan captions stay readable at night for every team */
:root[data-theme="dark"] .zpb-plan .narr,:root:not([data-theme="light"]) .zpb-plan .narr{color:var(--tnd,var(--sub));}
:root[data-theme="dark"] .zpb-planpanel .narr,:root:not([data-theme="light"]) .zpb-planpanel .narr{color:var(--tnd,var(--sub));}
/* w47 (Owner): the final score breathes inside its panel — the names hold their own sides */
.score-line{gap:18px;padding:16px 22px;}
.score-line .sl-team:first-child .zpb-sl2name{justify-content:flex-end;}
.score-line .sl-team:last-child .zpb-sl2name{justify-content:flex-start;}
/* w47 (Owner): the award badges, the indented honor lines, the crests in the honor chips */
.zpb-bdgrow{display:inline-flex;gap:6px;flex-wrap:wrap;align-items:center;vertical-align:middle;}
.zpb-uslines{display:block;margin-top:6px;}
.zpb-usline{display:block;padding-left:20px;}
.zpb-aplog img{width:20px;height:20px;object-fit:contain;vertical-align:-4px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35));}
/* w47 (Owner): the playoff-run cinematics — the stage's format, the team's own ink, no gold storm */
.zpb-porun{position:fixed;inset:0;z-index:130;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 42%, #241a1f 0%, #150e12 72%);opacity:0;transition:opacity .5s ease;}
.zpb-porun.zpb-porun-in{opacity:1;}
.zpb-porun-stage{position:relative;text-align:center;padding:30px;max-width:min(92vw,720px);}
.zpb-porun-stage::before{content:"";position:absolute;inset:-40px;background:radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--pk,#d9b36a) 13%, transparent), transparent 64%);opacity:0;transition:opacity .8s ease;pointer-events:none;}
.zpb-porun-win::before{opacity:1;}
.zpb-porun-kicker{font-family:'Cinzel Decorative',serif;letter-spacing:.4em;font-size:.84rem;color:var(--sub);animation:zpbSbRise 1s ease both;}
.zpb-porun-big{font-family:'Cinzel Decorative',serif;font-weight:900;font-size:clamp(1.7rem,6vw,3rem);letter-spacing:.08em;margin:10px 0 6px;animation:zpbSbRise 1.3s ease both;}
.zpb-porun-score{display:flex;gap:12px;justify-content:center;align-items:center;margin:10px 0 8px;color:var(--text);animation:zpbSbRise 1.6s ease both;}
.zpb-porun-score b{font-size:1.1rem;font-weight:800;display:inline-flex;align-items:center;gap:8px;}
.zpb-porun-score b img{width:34px;height:34px;object-fit:contain;}
.zpb-porun-score .zpb-porun-num{font-size:1.6rem;color:var(--text);}
.zpb-porun-score i{opacity:.55;font-style:normal;}
.zpb-porun-sub{letter-spacing:.34em;font-size:.72rem;color:var(--sub);animation:zpbSbRise 1.9s ease both;}
.zpb-porun-loss .zpb-porun-big,.zpb-porun-loss .zpb-porun-score{color:var(--sub);}
.zpb-porun-swap .zpb-porun-stage{animation:zpbporunswap .5s ease both;}
@keyframes zpbporunswap{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
@media (prefers-reduced-motion: reduce){ .zpb-porun-stage,.zpb-porun-stage *{animation:none !important;transition:none !important;} }
</style>'''

rep('W47-block', '</body>\n</html>', W47_BLOCK + '\n</body>\n</html>')

# ================= write + post-checks =================
open(DST, 'w', encoding='utf-8').write(s)
md5 = hashlib.md5(s.encode()).hexdigest()
print('w47 written:', DST, len(s), 'chars, md5', md5)
print('replacements applied:', len(applied))
for t in applied: print('  ✓', t)

# structural post-checks
checks = [
 ('w47-js block', 'window.zpbPlayoffRunCine'),
 ('w47-css block', 'zpbshimglow'),
 ('txMd in pack', 'const txMd=(function(){ try{'),
 ('colOf halfway', 'pk.txMd||pk.txd||pk.accD'),
 ('undo helper', 'window.zpbUndoLineup'),
 ('model button', 'RETURN TO MODEL LINEUP'),
 ('last names', 'window.zpbLastName'),
 ('anchor golden', '#f4e6c3'),
 ('planpanel class', 'zpb-planpanel'),
 ('dz gate', '.zpb-dz:not(.zpb-seen) .zpb-dfc2'),
 ('linescore fix', '.linescore tr td:last-child{color:var(--tn,var(--text))'),
 ('staged form', 'window.zpbStagedForm'),
 ('quiet sim', '__zpbQuietSim'),
 ('badges', 'zpb-bdgrow'),
 ('uslines', 'zpb-usline'),
 ('aplog', 'zpb-aplog'),
 ('slow first', '<button class="tabbtn active" id="speedSlowBtn">Slow</button>'),
 ('dime stack map', "+ xrow([['DIME','DIME',-3]], 'def')"),
 ('dime stack guide', "+ xrow([['DIME',-3]])"),
]
ok = True
for name, tok in checks:
    hit = tok in s
    print(('  PASS ' if hit else '  FAIL ') + name)
    ok = ok and hit
# absences + cascade order (the w47 glow rules must come AFTER every old sweep rule they replace)
for name, tok in [('no old linescore gold', '.linescore tr td:last-child{color:var(--tA2'), ('no front pick mount', '<div id="${hostId}Advice">'), ('no topbar sentence', 'Awards, stats, your report card'), ('no sweep on lu cells paint', '.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:linear-gradient')]:
    hit = tok not in s
    print(('  PASS (absent) ' if hit else '  FAIL (still present) ') + name)
    ok = ok and hit
_order_ok = s.rfind('zpbshimglow 3.4s ease-in-out infinite') > s.rfind('zpbshmsweep 3.4s linear infinite')
print(('  PASS ' if _order_ok else '  FAIL ') + 'glow rules come after every old sweep rule')
ok = ok and _order_ok
sys.exit(0 if ok else 2)
