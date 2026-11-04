#!/usr/bin/env python3
# zpb_w65b.py — the wave-65 payloads (CSS + JS), the zpb_w63 pattern: the JS rides before the w55
# restore (the restore stays the last body script), the CSS rides after the w63 style block.
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P1_MD5 = '913f0c13b3e82256380e5358b5449ca1'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-1 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P1_MD5:
    sys.exit(f'ABORT: part-1 md5 {md5} != {P1_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

CSS = '''<style id="zpb-w65-css">
/* ============ Z-POST-BLUE W65 ============ */
/* W65-1 (Owner): the footer stops encroaching — the pill nav sits in flow, pushed well down;
   the sticky thumb-reach law retires (the strip keeps its horizontal scroll on narrow screens). */
@media (max-width:760px) and (pointer:coarse){
 nav.footnav{position:static;bottom:auto;margin-top:64px;background:var(--panel);border:1px solid var(--border);box-shadow:0 10px 26px rgba(0,0,0,.20);}
}
nav.footnav{margin-top:64px;}
/* W65-2 (Owner): the DRAFT button keeps its air on both sides — below it a floor before the footer,
   and on very short windows the 17vh above eases off so the composition still fits. */
body[data-home="1"] #draftSetup{margin-bottom:40px;}
@media (max-height:560px){ body[data-home="1"] #startDraftBtn{margin-top:9vh !important;} }
/* W65-3 (Owner): the comparison dropdowns — one size (the bigger), the DRAFT button's pill shape. */
.zpb-cmp-own .zpb-cmpside{min-width:0;}
.zpb-cmp-own select,#homeCmpResult .zpb-cmpside select{appearance:none;-webkit-appearance:none;min-height:42px;padding:9px 34px 9px 16px;border:1px solid var(--border);border-radius:999px;background:var(--panel2);color:var(--text);font-weight:700;font-size:.85rem;width:100%;max-width:none;}
.zpb-cmp-own select:focus,#homeCmpResult .zpb-cmpside select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 12px var(--zr1,rgba(201,162,75,.35));}
.zpb-cmp-own .zpb-cmpscore{font-size:1.15rem;}
/* W65-4 (Owner): on a narrow window the X vs Y score takes its own centered line above the two
   dropdowns — never covered (the w63 "the scores can go on their own line" law, both surfaces). */
@media (max-width:760px){
 .zpb-cmphead{grid-template-columns:1fr 1fr;grid-template-areas:"score score" "a b";row-gap:12px;}
 .zpb-cmphead .zpb-cmpscore{grid-area:score;justify-self:center;white-space:nowrap;}
 .zpb-cmphead .zpb-cmpside-a{grid-area:a;}
 .zpb-cmphead .zpb-cmpside-b{grid-area:b;}
}
/* W65-5 (Owner): BACK TO SEASON — the glowing team-ink door (the autosave chip's tokens). */
.zpb-bts{font-family:'Cinzel Decorative','Cinzel',Georgia,serif !important;font-weight:900;letter-spacing:.12em;text-indent:.12em;border-radius:999px !important;
 color:var(--tTA,var(--accent)) !important;border:1px solid color-mix(in srgb,var(--tTA,var(--accent)) 55%,transparent) !important;
 background:color-mix(in srgb,var(--tTA,var(--accent)) 10%,var(--panel)) !important;
 box-shadow:0 0 16px color-mix(in srgb,var(--tTA,var(--accent)) 38%,transparent);animation:zpbBtsGlow 2.8s ease-in-out infinite;}
@keyframes zpbBtsGlow{0%,100%{box-shadow:0 0 12px color-mix(in srgb,var(--tTA,var(--accent)) 28%,transparent);}50%{box-shadow:0 0 24px color-mix(in srgb,var(--tTA,var(--accent)) 55%,transparent);}}
:root[data-theme="dark"] .zpb-bts{color:var(--tTAd,var(--accent)) !important;border-color:color-mix(in srgb,var(--tTAd,var(--accent)) 55%,transparent) !important;background:color-mix(in srgb,var(--tTAd,var(--accent)) 10%,var(--panel)) !important;}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-bts{color:var(--tTAd,var(--accent)) !important;border-color:color-mix(in srgb,var(--tTAd,var(--accent)) 55%,transparent) !important;background:color-mix(in srgb,var(--tTAd,var(--accent)) 10%,var(--panel)) !important;} }
@media (prefers-reduced-motion: reduce){ .zpb-bts{animation:none;} }
.zpb-btsbar{display:flex;justify-content:center;margin:48px 0 30px;}
.zpb-bts-top{border-color:color-mix(in srgb,var(--tTA,var(--accent)) 30%,var(--border));}
/* W65-6 (Owner): the draft board's first-letter bar retires in every theme (the w57 law finally covers dark). */
#draftTable2 tr.zpb-trow td:first-child{box-shadow:none !important;}
/* W65-7 (Owner): the SEASON REVIEW panel keeps its distance from the champion banner. */
.zpb-sr-own{border-color:color-mix(in srgb,var(--tTA,var(--accent)) 32%,var(--border));}
/* W65-8 (Owner): the header sim doors hold one line on a phone. */
.zpb-simtabs{display:inline-flex;gap:8px;}
@media (max-width:480px){ .zpb-ctasmall.zpb-simseason,.zpb-ctasmall#simPlayoffsBtnTop,.zpb-ctasmall#simGameBtn{font-size:.66rem !important;padding:5px 9px !important;} }
/* W65-9 (Owner): the restore chip — the honest second half of the autosave promise. */
.zpb-autosave.zpb-restore{pointer-events:auto;cursor:pointer;appearance:none;-webkit-appearance:none;}
.zpb-autosave.zpb-restore:hover{border-color:var(--tTA,var(--accent));}
:root[data-theme="dark"] .zpb-autosave.zpb-restore:hover{border-color:var(--tTAd,var(--accent));}
@media (prefers-reduced-motion: reduce){ .zpb-autosave.zpb-restore{transition:none;} }
/* W65-10 (Owner): a very short window trims the pregame fan so everything still fits below the line. */
@media (max-width:600px) and (max-height:620px){
 .zpb-replay:not(.zpb-sb) .zpb-intro-logos img{width:44px;height:44px;}
 .zpb-intro-stars{gap:5px;}
 .zpb-rep-intro{padding-top:56px;}
}
</style>
'''

JS = '''<script id="zpb-w65-js">
// ================= Z-POST-BLUE W65 · THE OWNER'S UI ROUND + MUSE'S W64 QA =================
// W65-A (Owner): SIM GAME rides the header tab row (the host the tabs render), wired like the old body button.
(function(){
 'use strict';
 if(typeof renderRegularSeasonView !== 'function' || renderRegularSeasonView._zpbW65) return;
 var orig = renderRegularSeasonView;
 var g = function(container){
  var out = orig.apply(this, arguments);
  try{
   var host = document.getElementById('zpbSimTabsHost');
   if(host){
    var S = seasonState, showGame = false;
    if(S && S.phase==='regular' && !S.preseason && !S.weekSimulated && S.schedule){
     var user = seasonUserTeam();
     showGame = S.schedule.some(function(gt){ return gt.week===S.currentWeek && (gt.home===user||gt.away===user); });
    }
    host.innerHTML = showGame ? '<button class="tabbtn zpb-ctasmall zpb-simgame" id="simGameBtn">SIM GAME</button>' : '';
    var b = document.getElementById('simGameBtn');
    if(b && !b._zpbW65){
     b._zpbW65 = true;
     b.addEventListener('click', function(){
      window.__zpbSilent = true;
      try{ simulateCurrentWeek(); } finally { window.__zpbSilent = false; }
      renderSeasonTab(container);
      var rv = document.getElementById('zpbGameReviewNow'); if(rv) rv.scrollIntoView({block:'start', behavior:'smooth'});
     });
    }
   }
  }catch(err){}
  return out;
 };
 g._zpbW65 = true;
 renderRegularSeasonView = g;
})();
// W65-B (Muse P0, the honest completion): RESTORE — the autosave gets its second half. On boot with
// no live season and no live draft, slot A offers the season back. w65 envelopes carry the draft's
// pick rounds; w63-era envelopes (a raw seasonState payload) restore through the same door.
(function(){
 'use strict';
 function liveSeason(){ try{ return !!seasonState; }catch(e){ return false; } }
 function midDraft(){ try{ return !!(typeof draftSim!=='undefined' && draftSim && draftSim.order && draftSim.pos < draftSim.order.length); }catch(e){ return false; } }
 function boot(){
  if(!window.ZPBStorage || typeof window.ZPBStorage.load !== 'function') return;
  window.ZPBStorage.load('A').then(function(r){
   try{
    if(!r || r.status!=='ok' || !r.envelope || !r.envelope.payload) return;
    var p = r.envelope.payload;
    var S = (p && p.zpbRestore===2) ? p.seasonState : p;
    if(!S || !S.phase || !S.teams || !S.schedule) return;
    if(liveSeason() || midDraft()) return;
    window.zpbRestoreSave = r.envelope;
    showChip();
   }catch(e){}
  })['catch'](function(){});
 }
 function showChip(){
  if(document.getElementById('zpbRestoreChip')) return;
  var c = document.createElement('button');
  c.type = 'button'; c.id = 'zpbRestoreChip'; c.className = 'zpb-autosave zpb-restore';
  c.setAttribute('role','status'); c.setAttribute('aria-live','polite');
  c.textContent = 'RESTORE SAVED SEASON';
  c.addEventListener('click', restore);
  document.body.appendChild(c);
  requestAnimationFrame(function(){ try{ c.classList.add('zpb-avshow'); }catch(e){} });
 }
 function restore(){
  try{
   var keep = window.zpbRestoreSave; if(!keep) return;
   var p = keep.payload;
   var S = (p && p.zpbRestore===2) ? p.seasonState : p;
   if(!S || !S.teams) return;
   var rosters = [], ui = 0;
   if(p && p.zpbRestore===2 && p.draft && Array.isArray(p.draft.rosters) && p.draft.rosters.length){
    rosters = p.draft.rosters.map(function(r){ return { teamName:r.teamName, slots:r.slots||{}, pickRounds:r.pickRounds||{}, isUser:!!r.isUser, pool:Object.values(r.slots||{}).filter(Boolean) }; });
    ui = rosters.findIndex(function(r){ return r.isUser; }); if(ui < 0) ui = 0;
   } else {
    Object.keys(S.teams).forEach(function(n){
     var t = S.teams[n];
     rosters.push({ teamName:n, slots:t.slotmap || {}, pickRounds:{}, isUser:!!t.isUser, pool:t.pool || Object.values(t.slotmap||{}).filter(Boolean) });
     if(t.isUser) ui = rosters.length - 1;
    });
   }
   draftSim = { rosters:rosters, userIndex:ui, pos:999999, pool:[], order:[], log:[], awaitingUser:false, undoUsedRound:null };
   seasonState = S;
   resultsView = 'season';
   window.__zpb100View = false;
   window.zpbRestoreSave = null;
   var chip = document.getElementById('zpbRestoreChip'); if(chip) chip.remove();
   if(typeof setActiveTab === 'function') setActiveTab('viewDraft','tabDraftBtn');
   renderSeasonTab(document.getElementById('draftResultsBody') || document.querySelector('.wrap'));
   window.scrollTo(0,0);
  }catch(e){}
 }
 if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
// W65-C (Owner): the universal BACK TO SEASON — one glowing button at the bottom of every page that
// is not the season itself, plus the top doors on Your Roster / Team Comparison (delegated data-bts).
(function(){
 'use strict';
 var bar = null;
 function seasonLive(){ try{ return !!seasonState; }catch(e){ return false; } }
 function onSeasonTab(){
  try{
   var vd = document.getElementById('viewDraft');
   if(!vd || !vd.classList.contains('active')) return false;
   if(window.__zpb100View) return false;
   return (typeof resultsView !== 'undefined') && resultsView === 'season';
  }catch(e){ return false; }
 }
 function paint(){
  var wrap = document.querySelector('.wrap'), nav = wrap ? wrap.querySelector('nav.footnav') : null;
  if(!wrap || !nav) return;
  if(!bar || !bar.isConnected){ bar = document.createElement('div'); bar.id = 'zpbBackSeasonBar'; wrap.insertBefore(bar, nav); }
  var show = seasonLive() && !onSeasonTab();
  if(!show){ if(bar.innerHTML){ bar.style.display = 'none'; bar.innerHTML = ''; } return; }
  bar.style.display = '';
  if(!bar.innerHTML){
   bar.className = 'zpb-btsbar';
   bar.innerHTML = '<button class="resetbtn zpb-bts" data-bts="1" style="width:auto;margin:0;padding:12px 34px;">BACK TO SEASON</button>';
  }
 }
 function go(){
  try{
   window.__zpb100View = false;
   if(typeof setActiveTab === 'function') setActiveTab('viewDraft','tabDraftBtn');
   resultsView = 'season';
   renderSeasonTab(document.getElementById('draftResultsBody') || document.querySelector('.wrap'));
   window.scrollTo(0,0);
  }catch(e){}
 }
 document.addEventListener('click', function(e){
  var b = e.target.closest ? e.target.closest('[data-bts]') : null;
  if(!b) return;
  e.preventDefault();
  go();
 });
 function wrap(name, after){
  try{
   var orig = window[name];
   if(typeof orig !== 'function' || orig._zpbW65b) return;
   var g = function(){ var r = orig.apply(this, arguments); try{ after(); }catch(e){} return r; };
   g._zpbW65b = true;
   window[name] = g;
  }catch(e){}
 }
 wrap('renderDraftResults', function(){ try{ if(typeof render100 !== 'undefined' && window.__zpb100View) {} }catch(e){} paint(); });
 wrap('renderSeasonTab', function(){ paint(); });
 wrap('setActiveTab', function(){ paint(); });
 window.addEventListener('resize', paint, {passive:true});
 paint();
 window.zpbBackToSeason = { paint: paint, go: go };
})();
// W65-D (Owner): the SIM PLAYOFFS warning — the A9 format, only while your team is still alive in the bracket.
(function(){
 'use strict';
 document.addEventListener('click', function(e){
  if(window.__zpbPoSimConfirmed){ window.__zpbPoSimConfirmed = false; return; } // the confirmed click passes through
  var t = e.target.closest ? e.target.closest('#simRestBtn,#simPlayoffsBtnTop,#simPlayoffsBtnFoot') : null;
  if(!t) return;
  var S = null; try{ S = seasonState; }catch(err){ return; }
  if(!S || S.phase!=='playoffs') return;
  var user = null; try{ user = seasonUserTeam(); }catch(err){ return; }
  var alive = false;
  try{
   alive = Object.keys(S.playoffRounds||{}).some(function(rk){
    return (S.playoffRounds[rk]||[]).some(function(g){ return g && !g.result && (g.home===user||g.away===user); });
   });
  }catch(err){ alive = false; }
  if(!alive) return; // your team is out — spectating needs no warning
  e.stopPropagation(); e.preventDefault();
  var ov = document.createElement('div'); ov.className = 'confirm-ov';
  ov.innerHTML = '<div class="confirm-box" style="text-align:center;">'
   + '<p style="margin-top:0;"><b>ARE YOU SURE YOU WANT TO SIMULATE THE PLAYOFFS?</b></p>'
   + '<p class="narr">Every remaining round plays out at once. This cannot be undone.</p>'
   + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'
   + '<button class="resetbtn" data-po="yes" style="width:auto;margin:0;padding:8px 18px;order:1;">YES \\u00b7 SIMULATE THE PLAYOFFS</button>'
   + '<button class="tabbtn" data-po="no" style="order:2;">Cancel</button>'
   + '</div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', function(ev){
   var b2 = ev.target.closest ? ev.target.closest('[data-po]') : null;
   if(!b2 && ev.target!==ov) return;
   var yes = b2 && b2.dataset.po==='yes';
   ov.remove();
   if(!yes) return;
   var real = document.getElementById('simRestBtn');
   if(real){ window.__zpbPoSimConfirmed = true; real.click(); }
   else{
    try{
     var order = ['wildcard','divisional','champ','superbowl'];
     for(var i=order.indexOf(S.currentPlayoffRound); i<4; i++){
      if(!S.playoffRoundSimulated) simulatePlayoffRound();
      if(order[i]!=='superbowl') advancePlayoffRound();
     }
    }catch(err){}
    renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
   }
  });
 }, true);
})();
// W65-E (Owner): the 100-seasons hero gains the site's other advanced badges (computed from the same aggregate).
(function(){
 'use strict';
 if(typeof window.zpb100More !== 'function' || window.zpb100More._zpbW65) return;
 var orig = window.zpb100More;
 var g = function(myW, N, mine){
  var base = ''; try{ base = orig.apply(this, arguments) || ''; }catch(e){ base = ''; }
  try{
   if(!Array.isArray(myW) || !myW.length || !N || !mine) return base;
   var twelve = Math.round(myW.filter(function(x){ return x>=12; }).length / N * 100);
   var conv = mine.po ? Math.round(mine.champ / mine.po * 100) : 0;
   var extra = '<div><b>'+twelve+'%</b><span>12+ win seasons</span></div>'
    + '<div><b>'+conv+'%</b><span>playoff trips that became titles</span></div>';
   var idx = base.lastIndexOf('</div>');
   return (idx >= 0 ? base.slice(0, idx) + extra + base.slice(idx) : base + extra);
  }catch(e){ return base; }
 };
 g._zpbW65 = true;
 window.zpb100More = g;
})();
// W65-F (Owner, the 100-seasons door): the report's header button wears the glowing team ink + label.
(function(){
 'use strict';
 if(typeof render100 !== 'function' || render100._zpbW65) return;
 var orig = render100;
 var g = function(container){
  window.__zpb100View = true; // the bottom BACK TO SEASON shows on this page
  var out = orig.apply(this, arguments);
  try{
   var b = document.getElementById('back100Btn');
   if(b && !b._zpbW65){ b._zpbW65 = true; b.classList.add('zpb-bts'); b.textContent = 'BACK TO SEASON'; b.style.width = 'auto'; }
  }catch(e){}
  try{ if(window.zpbBackToSeason && window.zpbBackToSeason.paint) window.zpbBackToSeason.paint(); }catch(e){}
  return out;
 };
 g._zpbW65 = true;
 render100 = g;
})();
</script>
'''

# the JS rides BEFORE the w55 restore (the restore stays the last body script — the site's law)
rep('<script id="zpb-w55-restore">', JS + '<script id="zpb-w55-restore">', 'W65 JS payload (before the w55 restore)')

# the CSS rides after the w63 style block (the file's last style)
rep(
"""@media (prefers-reduced-motion: reduce){
 .zpb-replay-ov::before,.zpb-replay-ov::after{animation:none !important;}
}
</style>
</body>
</html>""",
"""@media (prefers-reduced-motion: reduce){
 .zpb-replay-ov::before,.zpb-replay-ov::after{animation:none !important;}
}
</style>
""" + CSS + """</body>
</html>""",
 'W65 CSS payload (after the w63 style)')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

# ---------- post-checks ----------
checks = [
 ('R1 QB flexes only to FS', 'QB:{FS:10}' in src and src.count('QB:{RB:6, WR:6}') == 0),
 ('R1 P->K costs 4', 'P:{K:4}' in src),
 ('R1 REV 4 comment', "KG's REV 4 (tools/mathlab/flex.json" in src),
 ('R2 auto-fill uses flexRule', 'if(flexRule(p[1], s) == null) return;' in src),
 ('R3 table embedded', 'const ZPB_SLOTS_W = {"QB": 1000' in src),
 ('R3 WR1 525 in table', '"WR1": 525' in src and '"DT1": 410' in src and '"TE1": 295' in src),
 ('R3 buttons read it', 'wv = zpbSlotWins70to90(s).toFixed(1);' in src),
 ('R3 guide tiers read it', 'w:zpbSlotWins70to90(s)' in src),
 ('R3 model preset reads it', 'out[k] = ZPB_SLOTS_W[k]!=null' in src),
 ('R4 defPredict 0.15', 'defPredict:0.15' in src),
 ('R5 week panel clean', src.count('>SIM GAME</button>') == 1 and 'zpb-simtabs' in src),
 ('R5 sim host in header', '<span id="zpbSimTabsHost" class="zpb-simtabs"></span>' in src),
 ('R6 SIM SEASON regular-only', "seasonState&&seasonState.phase==='regular'?'<button class=\"tabbtn zpb-ctasmall zpb-simseason\" id=\"simSeasonBtn\"" in src),
 ('R6 no complete-phase SIM SEASON', src.count("seasonState.phase!=='playoffs'?'<button") == 0),
 ('R7 review panel', 'zpb-sr-own' in src and '>SEASON REVIEW</button>' in src),
 ('R7 arrow gone', src.count('Season Review →') == 0),
 ('R8 roster-locked gone', src.count('Roster locked — preseason setup is the next step.') == 0),
 ('R8 bottom start pill', 'startSeasonBtnFoot' in src),
 ('R9 week1 stats gate', '_anyPlayed ? renderStatsTabsHTML()' in src),
 ('R10 hiding law lifted', src.count('.pagbtn,.paginfo{display:none !important;}') == 0),
 ('R11 bar retired in all themes', '#draftTable2 tr.zpb-trow td:first-child{box-shadow:none !important;}' in src),
 ('R12 ST pane left-aligned', src.count('.zpb-dz-zone.zpb-dz-st .zpb-dz-row{display:inline-flex;gap:10px;border-top:none;}') == 0),
 ('R13 beat 0.12', 'var(--beat,0)*0.12s' in src),
 ('R14 ALL TEAMS face', "sel.id==='teamFilter' && !v) ? 'ALL TEAMS'" in src),
 ('R14 menu ALL TEAMS', "sel.id==='teamFilter' && t==='') ? 'ALL TEAMS' : t" in src),
 ('R14 ALL POSITIONS', src.count('>ALL POSITIONS</button>') == 1 and src.count("'ALL POSITIONS';") == 1),
 ('R14 search label', 'placeholder="SEARCH PLAYER NAME"' in src and 'Search player name...' not in src),
 ('R15 tab header panel', 'zpbTabScore' in src and 'zpb-cmp-own' in src),
 ('R15 old filters panel gone', src.count('zpb-cmp-filters">') == 0),
 ('R16 narrow score law', 'grid-template-areas:"score score" "a b"' in src),
 ('R16 footer head classed', 'zpb-cmpside-a" id="zpbCmpSlotA"' in src),
 ('R17 pregame down', 'padding-top:64px;gap:9px;' in src),
 ('W65 restore chip', "'RESTORE SAVED SEASON'" in src and 'zpb-restore' in src),
 ('W65 back-to-season', "data-bts=\"1\"" in src and 'zpb-btsbar' in src),
 ('W65 playoffs warning', 'ARE YOU SURE YOU WANT TO SIMULATE THE PLAYOFFS?' in src),
 ('W65 100-more badges', 'playoff trips that became titles' in src),
 ('W65 render100 flag', 'window.__zpb100View = true;' in src),
 ('w55 law: the tab restore is still the last SCRIPT',
  src.rfind('<script') < src.rfind("localStorage.getItem('zpb:tab')") and
  src.rfind("localStorage.getItem('zpb:tab')") < src.rfind('<style id="zpb-w65-css">')),
 ('w63 payloads intact', '<style id="zpb-w63-css">' in src and '<script id="zpb-w63-js">' in src),
 ('storage module untouched', 'engineVersion:string' in src),
 ('no white text introduced', '#fff' not in (CSS + JS).replace('#ffffff', '')),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes (delta {len(src.encode())-1716179:+})')
print('GENERATOR GREEN')
