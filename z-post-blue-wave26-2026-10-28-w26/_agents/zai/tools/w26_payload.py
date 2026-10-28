# -*- coding: utf-8 -*-
# W26 payload blocks: appended CSS + JS (literal strings, no interpolation)

W26_CSS = r'''
/* ================= Z-POST-BLUE W26 (twenty-sixth wave) =================
   Owner, 28 Oct: NO EMOJIS anywhere; ANCHOR/LEAK chips reworked (the word
   smaller than the name, no symbols); team comparison wears the homepage
   dropdowns; player browser wears team colors + position badges + one shimmer
   per team on screen; the spot buttons return as individual toggles on the
   position rankings and the draft board (ALL / CLEAR in the same format);
   weights typeable; synergy panels retired; Brave: a shimmer never paints
   invisible — solid color first, gradient only inside @supports. */

/* ---- 1) the spot buttons (the w24 Series format, individual now) ---- */
.zpb-serrow{display:flex;flex-wrap:wrap;gap:4px;align-items:stretch;margin:6px 0 12px;}
.zpb-srbtn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;min-width:46px;border:1px solid var(--border);background:var(--panel2);color:var(--sub);border-radius:8px;padding:3px 6px;cursor:pointer;font-family:inherit;line-height:1.15;}
.zpb-srbtn b{font-size:0.8rem;font-weight:800;}
.zpb-srbtn i{font-style:normal;font-size:0.54rem;letter-spacing:.09em;}
.zpb-srbtn:hover{border-color:var(--accent);}
.zpb-srbtn.on{border-color:var(--accent);color:var(--text);box-shadow:0 0 9px var(--glow);}
.zpb-srbtn.on i{color:var(--accent2,var(--accent));}
.zpb-srbtn.zpb-srutil{min-width:58px;}
:root[data-theme="dark"] .zpb-srbtn.on{border-color:var(--zrbd,var(--accent));box-shadow:0 0 9px var(--zrbd,var(--accent));}

/* ---- 2) ANCHOR / LEAK: no symbol; the word under the name's size ---- */
.zpb-anch,.zpb-leak{align-items:baseline;gap:7px;}
.zpb-anch b,.zpb-leak b{font-size:0.56rem;letter-spacing:.16em;font-weight:800;color:var(--sub);}
.zpb-anch .zpb-anchname,.zpb-leak .zpb-anchname{font-size:0.78rem;font-weight:700;color:var(--text);}

/* ---- 3) defense viz: a shape per family + five named colors + in/out ---- */
.zpb-defdots i{width:12px;height:12px;border-radius:50%;background:var(--gold2,var(--accent));border:1px solid var(--gold3,var(--border));}
.zpb-defdots i.z-dl{border-radius:2px;background:var(--rose,var(--accent2));border-color:var(--rosehair,var(--border));}
.zpb-defdots i.z-lb{width:0;height:0;border-radius:0;background:transparent !important;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:12px solid var(--tA2,var(--accent));}
.zpb-defdots i.c-dt2{background:#4fa3a5 !important;border-color:#3c7f81 !important;}
.zpb-defdots i.c-ilb2{background:transparent !important;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:12px solid #a684e0 !important;border-top:none;}
.zpb-defdots i.c-sam{border-bottom-color:#d98e4a !important;}
.zpb-defdots i.c-nk{background:#e8c46a !important;border-color:#b3913f !important;}
.zpb-defdots i.c-dm{background:transparent !important;border:1px dashed #c96a7e !important;}
.zpb-definout{display:flex;flex-wrap:wrap;gap:5px 9px;justify-content:center;margin:9px 0 0;}
.zpb-dl-chip{display:inline-flex;align-items:center;gap:4px;font-size:.6rem;letter-spacing:.1em;font-weight:800;color:var(--sub);opacity:.26;transition:opacity .3s;}
.zpb-dl-chip.in{opacity:1;color:var(--text);}
.zpb-dl-chip i{width:9px;height:9px;border-radius:3px;display:inline-block;}
.zpb-deflegend{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:center;margin:12px 0 0;}
.zpb-deflegend .zpb-dl-chip{opacity:1;color:var(--sub);}

/* ---- 4) team comparison: the homepage dropdowns, full width ---- */
#homeCmpResult{max-width:760px;}
#homeCmpResult .zpb-cmpside select{max-width:none;width:100%;}
#homeCmpResult .zpb-cmpside{flex:1 1 0;min-width:0;text-align:left;}
#homeCmpResult .zpb-cmpside .zpb-selwrap{width:100%;max-width:none;}
#homeCmpResult .zpb-cmpscore{flex:0 0 auto;white-space:nowrap;}

/* ---- 5) player browser: team colors, badges, one shimmer per team ---- */
.zpb-pb-name{color:var(--tn,var(--text));}
.zpb-pb-team{color:var(--tA2,var(--accent));font-weight:700;}
:root[data-theme="dark"] .zpb-pb-name,:root:not([data-theme="light"]) .zpb-pb-name{color:var(--text);}
.zpb-xfp{color:var(--sub);font-weight:700;font-size:0.7rem;margin-left:4px;}

/* ---- 6) stat badges (game review key players) ---- */
.zpb-pstat{display:inline-block;font-weight:800;font-size:.66rem;letter-spacing:.06em;padding:1px 7px;border-radius:6px;border:1px solid var(--zrb,var(--border));color:var(--tA2,var(--text));font-variant-numeric:tabular-nums;}

/* ---- 7) weights: the badge number is typeable ---- */
.zpb-wbadge .zpb-win{width:3.1em;background:transparent;border:0;border-bottom:1px dashed var(--rosehair,var(--border));color:inherit;font-family:inherit;font-weight:800;font-size:.8rem;text-align:center;padding:0 1px;margin-left:2px;appearance:textfield;-moz-appearance:textfield;}
.zpb-wbadge .zpb-win::-webkit-outer-spin-button,.zpb-wbadge .zpb-win::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
.zpb-wbadge .zpb-win:focus{outline:none;border-bottom-color:var(--accent);}

/* ---- 8) draft review: the badges breakdown ---- */
.zpb-dbk-wrap{margin:10px 0 4px;}
.zpb-dbk-groups{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px;}
.zpb-dbk-g{margin:0 0 10px;}
.zpb-dbk-gh{font-size:.6rem;letter-spacing:.14em;font-weight:800;color:var(--sub);margin:0 0 4px;}
.zpb-dbk-row{display:flex;flex-wrap:wrap;gap:6px;}
.zpb-dbk{display:inline-flex;flex-direction:column;gap:2px;border:1px solid var(--rosehair,var(--border));border-radius:10px;padding:5px 9px;background:var(--panel2);}
.zpb-dbk b{font-size:.78rem;}
.zpb-dbk i{font-style:normal;font-size:.62rem;letter-spacing:.05em;color:var(--sub);}

/* ---- 9) a failed panel says so instead of painting blank (Brave) ---- */
.zpb-viewfail{margin:12px;padding:14px 16px;border:1px solid var(--rosehair,var(--border));border-left:4px solid var(--bad,var(--accent2));border-radius:10px;background:var(--panel2);}
.zpb-viewfail b{display:block;font-size:.72rem;letter-spacing:.12em;color:var(--bad,var(--accent2));margin-bottom:4px;}
.zpb-viewfail span{font-size:.8rem;color:var(--sub);}
'''

W26_JS = r'''
// ============ Z-POST-BLUE W26 (Owner round, 28 Oct 2026) ============
// 1) a failed panel paints a note, never a blank page (Brave hardening)
window.zpbViewFail = function(viewId, err){
 try{
  var el = document.getElementById(viewId); if(!el || el.querySelector('.zpb-viewfail')) return;
  var card = document.createElement('div');
  card.className = 'zpb-viewfail';
  var msg = String((err && (err.message || err)) || 'unknown').replace(/[<>&]/g,'').slice(0,180);
  card.innerHTML = '<b>SETBACK \u2014 THIS PANEL DID NOT PAINT</b><span>This surface hit a display error; everything else keeps running. Detail: ' + msg + '</span>';
  el.insertBefore(card, el.firstChild);
 }catch(e){}
};
// 2) position rankings: the spot buttons — individual toggles, depth-chart order
function zpbRankBtnSlots(){ return window.zpbRankSlots || (window.zpbRankSlots = new Set()); }
function zpbBuildRankBtns(){
 var row = document.getElementById('zpbRankBtns'); if(!row || row.childElementCount) return;
 if(typeof ROSTER_SLOTS === 'undefined' || typeof LABELS === 'undefined') return;
 ROSTER_SLOTS.forEach(function(s){
  var wv = '';
  try{ if(typeof slotWins === 'function') wv = (slotWins(s,90)-slotWins(s,70)).toFixed(1); }catch(e){}
  row.insertAdjacentHTML('beforeend','<button type="button" class="zpb-srbtn" data-rslot="'+s+'" title="Toggle '+(LABELS[s]||s)+' in or out of the ranking"><b>'+(LABELS[s]||s)+'</b><i>'+wv+'</i></button>');
 });
}
function zpbSyncRankBtns(){
 var a = zpbRankBtnSlots();
 document.querySelectorAll('#zpbRankBtns [data-rslot]').forEach(function(el){ el.classList.toggle('on', a.has(el.dataset.rslot)); });
}
function zpbRenderCustomRankings(){
 var a = zpbRankBtnSlots();
 if(typeof ROSTER_SLOTS === 'undefined' || typeof TEAM_DATA === 'undefined') return;
 var results = Object.keys(TEAM_DATA).map(function(team){
  var tm = TEAM_DATA[team], sum = 0, players = [];
  ROSTER_SLOTS.forEach(function(s){
   if(!a.has(s)) return;
   var en = tm ? tm[s] : null;
   sum += (en && en.ovr) ? en.ovr : 70;
   if(en && en.name) players.push([en.name, en.ovr, team]);
  });
  return {team:team, avg: a.size ? sum/a.size : 0, players:players};
 }).sort(function(x,y){ return y.avg - x.avg; });
 var gc = document.getElementById('groupCount');
 if(gc) gc.textContent = a.size ? ('Ranking by these ' + a.size + ' spots.') : 'Toggle spots on to rank the 32 rosters.';
 var body = document.getElementById('groupBody'); if(!body) return;
 var rows = '';
 results.forEach(function(r, idx){
  var cells = r.players.map(function(p){ return (typeof zpbGroupPlayerHTML === 'function') ? zpbGroupPlayerHTML(p) : p[0]; }).join('<span class="zpb-gsep">\u00b7</span>') || '<span class="zpb-gempty">\u2014</span>';
  rows += '<tr class="zpb-grow"><td class="rank">'+(idx+1)+'</td><td class="team">'+r.team+'</td><td class="score">'+Math.round(r.avg)+'</td><td class="narr">'+cells+'</td></tr>';
 });
 body.innerHTML = rows;
 var panel = body.closest('.panel');
 if(panel && !(function(){ try{ return !!seasonState; }catch(e){ return false; } })()){
  var old = panel.querySelector('.zpb-70note'); if(old) old.remove();
  var note = document.createElement('div'); note.className = 'zpb-70note'; note.textContent = 'Missing spots filled at 70 OVR in the math';
  panel.appendChild(note);
 }
}
(function(){
 var row = document.getElementById('zpbRankBtns'); if(!row) return;
 row.addEventListener('click', function(e){
  var b = e.target.closest('[data-rslot]'); if(!b) return;
  var a = zpbRankBtnSlots(), s = b.dataset.rslot;
  if(a.has(s)) a.delete(s); else a.add(s);
  var sel = document.getElementById('groupSelect'); if(sel) sel.value = '';
  zpbSyncRankBtns(); zpbRenderCustomRankings();
 });
 var sel = document.getElementById('groupSelect');
 if(sel) sel.addEventListener('change', function(){
  if(sel.value){ window.zpbRankSlots = new Set(); zpbSyncRankBtns(); }
 });
})();
setTimeout(function(){
 try{
  zpbBuildRankBtns();
  if(!window.zpbRankSlots || !window.zpbRankSlots.size){
   try{ window.zpbSeriesOrder = zpbSeriesData(); }catch(e){}
   var ord = window.zpbSeriesOrder || (typeof ROSTER_SLOTS !== 'undefined' ? ROSTER_SLOTS.slice() : []);
   window.zpbRankSlots = new Set(ord.slice(0, Math.min(19, ord.length)));
  }
  zpbSyncRankBtns();
 }catch(e){}
}, 0);
// 3) draft review: the breakdown wears the season-stats badges
window.zpbDraftBreakdownHTML = function(e){
 try{
  if(!e || !e.slotmap) return '';
  var rosters = (typeof draftSim !== 'undefined' && draftSim && draftSim.rosters) ? draftSim.rosters : [e];
  var groups = (typeof GROUPS !== 'undefined') ? GROUPS : [];
  var rowVars = (typeof zpbRowVars === 'function') ? zpbRowVars : function(){ return ''; };
  var nse = (typeof normalizeSlotEntry === 'function') ? normalizeSlotEntry : function(x){ return x; };
  var tier = function(o){ return o>=90 ? 'zpb-shm' : (o>=85 ? 'zpb-vib' : ''); };
  var out = '<div class="zpb-dbk-wrap"><h4 style="margin:14px 0 4px;">Your breakdown</h4><div class="zpb-dbk-groups">';
  groups.forEach(function(g){
   var slots = g[1].filter(function(s){ var en = nse(e.slotmap[s]); return en && en.name; });
   if(!slots.length) return;
   var sum = 0; slots.forEach(function(s){ var en = nse(e.slotmap[s]); sum += en.ovr || 70; });
   var myAvg = sum / slots.length;
   var avgs = rosters.map(function(r){
    var s2 = 0, n = 0;
    slots.forEach(function(s){ var en = r.slots ? nse(r.slots[s]) : null; if(en && en.name){ s2 += en.ovr || 70; n++; } });
    return n ? s2/n : 0;
   });
   var rank = 1 + avgs.filter(function(v){ return v > myAvg + 0.001; }).length;
   var cls = rank <= 8 ? ' zpb-sb-good' : (rank >= 25 ? ' zpb-sb-bad' : '');
   out += '<span class="zpb-sbadge'+cls+'"><b>#'+rank+'</b><i>'+g[0].toUpperCase()+' \u00b7 '+Math.round(myAvg)+' OVR</i></span>';
  });
  out += '</div>';
  groups.forEach(function(g){
   var slots = g[1].filter(function(s){ var en = nse(e.slotmap[s]); return en && en.name; });
   if(!slots.length) return;
   out += '<div class="zpb-dbk-g"><div class="zpb-dbk-gh">'+g[0].toUpperCase()+'</div><div class="zpb-dbk-row">';
   slots.forEach(function(s){
    var en = nse(e.slotmap[s]);
    var rnd = e.pickRounds ? e.pickRounds[s] : null;
    var ovrs = rosters.map(function(r){ var e2 = r.slots ? nse(r.slots[s]) : null; return (e2 && e2.name) ? (e2.ovr || 0) : -1; });
    var rank = 1 + ovrs.filter(function(v){ return v > en.ovr; }).length;
    out += '<span class="zpb-dbk" style="'+rowVars(e.teamName)+'"><b class="'+tier(en.ovr)+'">'+en.name+'</b><i>'+((typeof LABELS !== 'undefined' && LABELS[s]) || s)+' \u00b7 '+en.ovr+' OVR'+(rnd ? ' \u00b7 R'+rnd : '')+' \u00b7 #'+rank+'/32</i></span>';
   });
   out += '</div></div>';
  });
  out += '<p class="narr" style="margin:6px 0 0;">Position rank counts your player against the same spot on all 32 simulated teams.</p></div>';
  return out;
 }catch(err){ return ''; }
};
// 3b) sweeping stale 70-notes off the position rankings the moment a season is live
(function(){
 var b = document.getElementById('tabGroupsBtn');
 if(b) b.addEventListener('click', function(){
  try{
   if(seasonState) document.querySelectorAll('#viewGroups .zpb-70note').forEach(function(n){ n.remove(); });
  }catch(e){}
 });
})();
// 4) the player browser re-paints in team colors once the palette state exists
(function(){
 var b = document.getElementById('tabPlayersBtn');
 if(b) b.addEventListener('click', function(){ try{ if(typeof renderPlayers === 'function') renderPlayers(); }catch(e){} });
})();
setTimeout(function(){
 try{
  var v = document.getElementById('viewPlayers');
  if(v && v.classList.contains('active') && typeof renderPlayers === 'function') renderPlayers();
 }catch(e){}
}, 400);
'''
