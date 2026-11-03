#!/usr/bin/env python3
# zpb_w63.py — the wave-63 generator (Muse's QA round).
# Baseline: the w62 bytes (md5 468e6883…, gh-pages). Five findings, each measured before patched:
#   R1 (P0) the Player Browser paginates — 60 a page, the real pager rebuilds (the 1,000,000 law retires)
#   R2 (P1) the advance rail steps aside while the real CTA is on screen (+ the scroll listener)
#   R3 (P1) the 150-row draft board paints in ~20-row slices (the first Draft click never freezes)
#   R4 (P1) the review's big pill says START PRESEASON → (and rides the rail)
#   R5 (P1) the honest autosave — seasonState really saves to slot A, a team-ink chip really says so
import hashlib, sys

SRC = '/home/z/my-project/work/w63/baseline-w62.html'
OUT = '/home/z/my-project/work/w63/Football-Sim-Z-post-blue-w63.html'
W62_MD5 = '468e6883d4e18afb07eab6a08862b972'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'baseline: {SRC} · md5 {md5} · {len(src.encode())} bytes')
if md5 != W62_MD5:
    sys.exit(f'ABORT: baseline md5 {md5} != {W62_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---------- R1 · the Player Browser paginates ----------
rep(
 "let playerPage = 1; const PLAYER_PAGE_SIZE = 1000000; // every player in one scrollable panel",
 "let playerPage = 1; const PLAYER_PAGE_SIZE = 60; // w63 (Muse P0): the browser paginates — 60 a page keeps the DOM light (the one-scrollable-panel law retires)",
 'R1a browser page size 60')

rep(
 """ const pager = document.getElementById('playerPager');
 if(pager){
  pager.innerHTML = '';

 }""",
 """ const pager = document.getElementById('playerPager');
 if(pager){
  pager.innerHTML = '';
  if(total > 1){
   const mk = (lbl, fn, dis) => { const b = document.createElement('button'); b.className = 'pagbtn'; b.type = 'button'; b.textContent = lbl; b.disabled = !!dis; b.addEventListener('click', () => { fn(); try{ const t = document.getElementById('playerTable'); if(t) t.scrollTop = 0; }catch(e){} }); return b; };
   pager.appendChild(mk('\\u2039 PREV', () => { playerPage--; renderPlayers(); }, playerPage <= 1));
   const info = document.createElement('span'); info.className = 'paginfo';
   info.textContent = `PAGE ${playerPage} OF ${total} \\u00b7 SHOWING ${start + 1}\\u2013${Math.min(start + PLAYER_PAGE_SIZE, rows.length)} OF ${rows.length}`;
   pager.appendChild(info);
   pager.appendChild(mk('NEXT \\u203a', () => { playerPage++; renderPlayers(); }, playerPage >= total));
  }
 }""",
 'R1b the pager rebuilds (prev · page info · next)')

# ---------- R2 · the rail steps aside while the real CTA is on screen ----------
rep(
 """  rail.style.display = 'flex';
  document.body.classList.add('zpb-advrail');
 }""",
 """  var vr = b.getBoundingClientRect();
  var inView = vr.bottom > 0 && vr.top < (window.innerHeight || document.documentElement.clientHeight);
  rail.style.display = inView ? 'none' : 'flex'; // w63 (Muse P1): the button is never twice — the rail steps aside while the real CTA is on screen
  document.body.classList.add('zpb-advrail');
 }""",
 'R2a the rail visibility gate in sync()')

rep(
 """ window.addEventListener('resize', schedule, {passive:true});
 window.zpbAdvRail = { sync: sync };""",
 """ window.addEventListener('resize', schedule, {passive:true});
 window.addEventListener('scroll', schedule, {passive:true}); // w63 (Muse P1): the rail follows the scroll
 window.zpbAdvRail = { sync: sync };""",
 'R2b the rail scroll listener')

# ---------- R3 · the draft board paints in slices ----------
rep(
 """  document.getElementById('draftBody2').innerHTML = h || `<tr><td colspan="10" class="narr">No players match.</td></tr>`;
  document.getElementById('draftFitSummary').innerHTML = '';""",
 """  zpbChunkBoard(document.getElementById('draftBody2'), h || `<tr><td colspan="10" class="narr">No players match.</td></tr>`); // w63 (Muse P1): the board streams in slices — the first click never freezes
  document.getElementById('draftFitSummary').innerHTML = '';""",
 'R3a the board write goes through the chunked painter')

# ---------- R4 · the review's pill says START PRESEASON → ----------
rep(
 """   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">SEASON</button>
   <p class="zpb-cygline"><span class="zpb-cygt">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine" style="font-size:1.1em;">?</b></p>
  </div>`;""",
 """   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">START PRESEASON →</button>
   <p class="narr" style="margin:2px 0 0;">Roster locked — preseason setup is the next step.</p>
   <p class="zpb-cygline"><span class="zpb-cygt">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine" style="font-size:1.1em;">?</b></p>
  </div>`;""",
 'R4a the slim-stage pill relabeled + the hint line')

rep(
 """<button class="resetbtn zpb-startbtn" id="startSeasonHeroBtn">SEASON</button>""",
 """<button class="resetbtn zpb-startbtn" id="startSeasonHeroBtn">START PRESEASON →</button>""",
 'R4b the stage-hero pill relabeled (consistency)')

rep(
 """IDS = ['simWeekBtn','nextWeekBtn','nextRoundBtn','beginPlayoffsBtn','seasonReviewBtn','beginSeasonBtn','beginSeasonBtn2'];""",
 """IDS = ['startSeasonBtn','simWeekBtn','nextWeekBtn','nextRoundBtn','beginPlayoffsBtn','seasonReviewBtn','beginSeasonBtn','beginSeasonBtn2']; // w63 (Muse P1): the review's START PRESEASON pill rides the rail too""",
 'R4c the pill joins the rail CTA list')

# ---------- R5 · the honest autosave: CSS payload + JS payload ----------
CSS = '''<style id="zpb-w63-css">
/* ============ Z-POST-BLUE W63 ============ */
/* W63-1 (Muse P0): the browser pager buttons join the thumb floor; the active page reads gold. */
.pagbtn{min-height:38px;}
.pagbtn.zpb-pagon{border-color:var(--rose);color:var(--rose);}
@media (max-width:560px){ .paginfo{font-size:0.7rem;} }
/* W63-4 (Muse P1): the explicit pill must hold one line on a phone. */
@media (max-width:480px){
 .zpb-startbtn{font-size:0.9rem !important;padding:12px 20px !important;letter-spacing:.14em;text-indent:.14em;}
}
/* W63-5 (Muse P1): the honest autosave chip — the season really saves (slot A), the chip really says so.
   The ink is the takeover's accessible team tone (tTA light / tTAd dark — the site's exact dark gates). */
.zpb-autosave{position:fixed;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:55;
 font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:900;letter-spacing:.14em;text-indent:.14em;font-size:0.62rem;
 padding:7px 14px;border-radius:999px;pointer-events:none;
 color:var(--tTA,var(--accent));border:1px solid color-mix(in srgb,var(--tTA,var(--accent)) 45%,transparent);
 background:color-mix(in srgb,var(--panel) 88%,transparent);backdrop-filter:blur(8px);
 opacity:0;transform:translateY(6px);transition:opacity .35s ease,transform .35s ease;}
.zpb-autosave.zpb-avshow{opacity:1;transform:none;}
.zpb-autosave.zpb-avoff{color:var(--sub,var(--text));border-color:var(--border);}
:root[data-theme="dark"] .zpb-autosave{color:var(--tTAd,var(--accent));border-color:color-mix(in srgb,var(--tTAd,var(--accent)) 45%,transparent);}
:root[data-theme="dark"] .zpb-autosave.zpb-avoff{color:var(--sub,var(--text));border-color:var(--border);}
@media (prefers-color-scheme: dark){
 :root:not([data-theme="light"]) .zpb-autosave{color:var(--tTAd,var(--accent));border-color:color-mix(in srgb,var(--tTAd,var(--accent)) 45%,transparent);}
 :root:not([data-theme="light"]) .zpb-autosave.zpb-avoff{color:var(--sub,var(--text));border-color:var(--border);}
}
@media (max-width:560px){ .zpb-autosave{right:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));font-size:0.58rem;} }
@media (prefers-reduced-motion: reduce){ .zpb-autosave{transition:none;} }
</style>
'''

JS = '''<script id="zpb-w63-js">
// ================= Z-POST-BLUE W63 · THE MEASURED QA ROUND (Muse's five) =================
// W63-3 (Muse P1): the 150-row draft board paints in ~20-row slices — the first Draft click
// never freezes the page. A generation token kills the stale chain when a newer render takes
// the table (the sim re-renders on every pick).
window.zpbChunkBoard = function(el, html){
 if(!el) return;
 el._zpbGen = (el._zpbGen || 0) + 1;
 var gen = el._zpbGen;
 if(html.indexOf('No players match.') >= 0 || html.indexOf('<tr') !== 0){ el.innerHTML = html; return; }
 var parts = null;
 try{ parts = html.match(/<tr[\\s\\S]*?<\\/tr>/g); }catch(e){}
 if(!parts || parts.length < 25){ el.innerHTML = html; return; } // small tables paint whole
 var STEP = 20;
 el.innerHTML = parts.slice(0, STEP).join('');
 var i = STEP;
 var more = function(){
  if(el._zpbGen !== gen) return; // a newer render took the table — this chain dies
  if(i >= parts.length) return;
  el.insertAdjacentHTML('beforeend', parts.slice(i, i + STEP).join(''));
  i += STEP;
  if(i < parts.length){ if(window.requestAnimationFrame) window.requestAnimationFrame(more); else setTimeout(more, 16); }
 };
 if(window.requestAnimationFrame) window.requestAnimationFrame(more); else setTimeout(more, 16);
};
// W63-5 (Muse P1): the honest autosave. The standing guidance parked the storage wiring on the
// Architect's E2 envelope types — the Owner's directive ("add an autosave indicator that updates
// on save") unblocks the SAVE side only: seasonState rides the module's versioned envelope into
// slot A. The restore/Continue UI still waits for E2/E3b/E1 — nothing here reads the slot back.
(function(){
 'use strict';
 var chip = null, timer = null, fadeT = null, lastSig = '';
 function GSS(){ try{ return seasonState; }catch(e){ return undefined; } } // seasonState is a top-level let — a global lexical binding, never a window property
 function ensureChip(){
  if(chip && chip.isConnected) return chip;
  chip = document.createElement('div');
  chip.className = 'zpb-autosave';
  chip.setAttribute('role', 'status');
  chip.setAttribute('aria-live', 'polite');
  document.body.appendChild(chip);
  return chip;
 }
 function show(txt, off){
  var c = ensureChip();
  c.textContent = txt;
  c.classList.toggle('zpb-avoff', !!off);
  c.classList.add('zpb-avshow');
  if(fadeT) clearTimeout(fadeT);
  fadeT = setTimeout(function(){ if(chip) chip.classList.remove('zpb-avshow'); }, off ? 6000 : 4200);
 }
 function hide(){ if(chip){ chip.classList.remove('zpb-avshow'); } }
 function save(){
  try{
   var S = GSS();
   if(!S || typeof window.ZPBStorage !== 'object' || !window.ZPBStorage || typeof window.ZPBStorage.save !== 'function') return;
   var envelope = { kind:'week', schemaVersion:1, engineVersion:'zpb-w63', dataVersion:'1', slot:'A', savedAt:new Date().toISOString(), payload: S };
   window.ZPBStorage.save('A', envelope).then(function(res){
    if(res && res.ok){ show('AUTOSAVED \\u2713', false); } else { show('AUTOSAVE OFF', true); }
   })['catch'](function(){ show('AUTOSAVE OFF', true); });
  }catch(e){ try{ show('AUTOSAVE OFF', true); }catch(e2){} }
 }
 function queue(){
  try{
   var S = GSS();
   if(!S){ hide(); lastSig = ''; return; }
   var sig = S.phase + '|' + S.currentWeek + '|' + JSON.stringify(S).length;
   if(sig === lastSig) return;
   lastSig = sig;
   if(timer) clearTimeout(timer);
   timer = setTimeout(save, 700); // debounce the render storms (the cinematic beats re-render)
  }catch(e){}
 }
 function wrap(name, after){
  try{
   var orig = window[name];
   if(typeof orig !== 'function' || orig._zpbW63) return;
   var g = function(){ var r = orig.apply(this, arguments); try{ after(); }catch(e){} return r; };
   g._zpbW63 = true;
   window[name] = g;
  }catch(e){}
 }
 wrap('renderSeasonTab', queue);    // every season screen refresh (week advance, rounds, review)
 wrap('startSeason', function(){ lastSig = ''; queue(); }); // the season exists → the first save
 wrap('renderDraftResults', function(){ try{ if(!GSS()) hide(); }catch(e){} }); // a fresh draft retires the chip
})();
</script>
'''

# the payloads: the JS rides BEFORE the w55 restore (the restore stays the last body
# script — the site's own law), the CSS rides after the w61 style block
rep(
 """<script id="zpb-w55-restore">""",
 JS + """<script id="zpb-w55-restore">""",
 'W63 JS payload (before the w55 restore)')

rep(
 """@media (max-width:429px){
 .zpb-cygops{flex-direction:column-reverse;align-items:flex-start;gap:2px;}
 .zpb-cygops .zpb-cygdsub{margin:0;}
}
</style>
</body>
</html>""",
 """@media (max-width:429px){
 .zpb-cygops{flex-direction:column-reverse;align-items:flex-start;gap:2px;}
 .zpb-cygops .zpb-cygdsub{margin:0;}
}
</style>
""" + CSS + """</body>
</html>""",
 'W63 CSS payload (after the w61 style)')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

# ---------- post-checks ----------
checks = [
 ('R1 page size 60', 'const PLAYER_PAGE_SIZE = 60;' in src),
 ('R1 old one-panel law retired', src.count('PLAYER_PAGE_SIZE = 1000000') == 0),
 ('R1 pager builds', 'PAGE ${playerPage} OF ${total}' in src),
 ('R2 visibility gate', "rail.style.display = inView ? 'none' : 'flex';" in src),
 ('R2 scroll listener', "window.addEventListener('scroll', schedule, {passive:true});" in src),
 ('R3 chunked painter hooked', 'zpbChunkBoard(document.getElementById(\'draftBody2\')' in src),
 ('R3 painter defined', 'window.zpbChunkBoard = function' in src),
 ('R3 generation guard', 'el._zpbGen !== gen' in src),
 ('R4 pill relabeled', src.count('>START PRESEASON →</button>') == 2),
 ('R4 hint line', 'Roster locked — preseason setup is the next step.' in src),
 ('R4 rail list leads with the pill', "IDS = ['startSeasonBtn','simWeekBtn'" in src),
 ('R5 chip CSS', '.zpb-autosave{position:fixed' in src),
 ('R5 chip JS', "show('AUTOSAVED \\u2713', false)" in src),
 ('R5 envelope', "engineVersion:'zpb-w63'" in src),
 ('R5 slot A only', src.count("slot:'A'") >= 1),
 ('R5 wraps', "wrap('renderSeasonTab', queue)" in src),
 ('R5 bare seasonState reader', 'function GSS(){ try{ return seasonState; }catch(e){ return undefined; } }' in src),
 ('R5 no window.seasonState left', src.count('window.seasonState') == 0),
 ('w55 law: the tab restore is still the last SCRIPT',
  src.rfind('<script') < src.rfind("localStorage.getItem('zpb:tab')") and
  src.rfind("localStorage.getItem('zpb:tab')") < src.rfind('<style id="zpb-w63-css">')),
 ('w61 style block intact', '<style id="zpb-w61-css">' in src),
 ('w60 payloads intact', '<style id="zpb-w60-css">' in src and '<script id="zpb-w60-js">' in src),
 ('storage module untouched', 'engineVersion:string' in src),
 ('no white text introduced', '#fff' not in (CSS + JS).replace('#ffffff', '').replace('#fff,', '')),
 ('one-shimmer law: no new shimmer', 'zpb-shm' in src and CSS.count('shine') == 0),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes (delta {len(src.encode())-1694748:+})')
print('GENERATOR GREEN')
