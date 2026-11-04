#!/usr/bin/env python3
# zpb_w65d.py — the wave-65 chain step 4: the restore and the back-to-season door rebuild the
# results shell before rendering (a fresh page has no #draftResultsBody — the old .wrap fallback
# wiped the app shell). The footer law also goes static at every narrow width (the Owner's
# "move the whole footer down" — the sticky float was the encroachment).
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P3_MD5 = '00439f6a5c3883f1b8b8fef2da1dfe06'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-3 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P3_MD5:
    sys.exit(f'ABORT: part-3 md5 {md5} != {P3_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# 1 · the restore rebuilds the shell, then renders through renderDraftResults (the finishDraft2 path)
rep(
"""   draftSim = { rosters:rosters, userIndex:ui, pos:999999, pool:[], order:[], log:[], awaitingUser:false, undoUsedRound:null };
   seasonState = S;
   resultsView = 'season';
   window.__zpb100View = false;
   window.zpbRestoreSave = null;
   var chip = document.getElementById('zpbRestoreChip'); if(chip) chip.remove();
   if(typeof setActiveTab === 'function') setActiveTab('viewDraft','tabDraftBtn');
   renderSeasonTab(document.getElementById('draftResultsBody') || document.querySelector('.wrap'));
   window.scrollTo(0,0);""",
"""   draftSim = { rosters:rosters, userIndex:ui, pos:999999, pool:[], order:[], log:[], awaitingUser:false, undoUsedRound:null };
   seasonState = S;
   resultsView = 'season';
   window.__zpb100View = false;
   window.zpbRestoreSave = null;
   var chip = document.getElementById('zpbRestoreChip'); if(chip) chip.remove();
   if(typeof setActiveTab === 'function') setActiveTab('viewDraft','tabDraftBtn');
   // a fresh page has no #draftResultsBody (the results panel ships empty) — rebuild the shell
   // first, then render through renderDraftResults exactly like finishDraft2 does. Never .wrap:
   // rendering into the wrap wipes the app shell.
   var panel = document.getElementById('draftFinalResults');
   if(panel && !document.getElementById('draftResultsBody')){ panel.style.display = 'block'; panel.innerHTML = '<div id="draftResultsBody"></div>'; }
   else if(panel){ panel.style.display = 'block'; }
   var dl = document.getElementById('draftLive'); if(dl) dl.style.display = 'none';
   var ds = document.getElementById('draftSetup'); if(ds) ds.style.display = 'none';
   if(typeof renderDraftResults === 'function') renderDraftResults();
   else if(document.getElementById('draftResultsBody')) renderSeasonTab(document.getElementById('draftResultsBody'));
   window.scrollTo(0,0);""",
 'the restore rebuilds the results shell first')

# 2 · the back-to-season door gets the same law
rep(
""" function go(){
  try{
   window.__zpb100View = false;
   if(typeof setActiveTab === 'function') setActiveTab('viewDraft','tabDraftBtn');
   resultsView = 'season';
   renderSeasonTab(document.getElementById('draftResultsBody') || document.querySelector('.wrap'));
   window.scrollTo(0,0);
  }catch(e){}
 }""",
""" function ensureShell(){
  var panel = document.getElementById('draftFinalResults');
  if(panel && !document.getElementById('draftResultsBody')){ panel.style.display = 'block'; panel.innerHTML = '<div id="draftResultsBody"></div>'; }
  else if(panel){ panel.style.display = 'block'; }
  var dl = document.getElementById('draftLive'); if(dl) dl.style.display = 'none';
  var ds = document.getElementById('draftSetup'); if(ds) ds.style.display = 'none';
 }
 function go(){
  try{
   window.__zpb100View = false;
   if(typeof setActiveTab === 'function') setActiveTab('viewDraft','tabDraftBtn');
   resultsView = 'season';
   ensureShell();
   if(typeof renderDraftResults === 'function') renderDraftResults();
   else if(document.getElementById('draftResultsBody')) renderSeasonTab(document.getElementById('draftResultsBody'));
   window.scrollTo(0,0);
  }catch(e){}
 }""",
 'the back-to-season door rebuilds the shell too')

# 3 · the footer law: static at every narrow width (the sticky float was the encroachment)
rep(
"""/* W65-1 (Owner): the footer stops encroaching — the pill nav sits in flow, pushed well down;
   the sticky thumb-reach law retires (the strip keeps its horizontal scroll on narrow screens). */
@media (max-width:760px) and (pointer:coarse){
 nav.footnav{position:static;bottom:auto;margin-top:64px;background:var(--panel);border:1px solid var(--border);box-shadow:0 10px 26px rgba(0,0,0,.20);}
}
nav.footnav{margin-top:64px;}""",
"""/* W65-1 (Owner): the footer stops encroaching — the pill nav sits in flow, pushed well down;
   the sticky thumb-reach law retires at every narrow width (the Owner's small window included),
   and the strip keeps its horizontal scroll. Rendering into .wrap is forbidden to every door. */
@media (max-width:760px){
 nav.footnav{position:static;bottom:auto;margin-top:56px;background:var(--panel);border:1px solid var(--border);box-shadow:0 10px 26px rgba(0,0,0,.20);}
}
nav.footnav{margin-top:64px;}""",
 'the footer is static at every narrow width')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

checks = [
 ('restore shell rebuild', "panel.innerHTML = '<div id=\"draftResultsBody\"></div>';" in src),
 ('restore uses renderDraftResults', "if(typeof renderDraftResults === 'function') renderDraftResults();" in src),
 ('go() has ensureShell', 'function ensureShell(){' in src),
 ('no .wrap fallback in the doors', src.count("|| document.querySelector('.wrap')") == 0),
 ('footer static at 760', '@media (max-width:760px){\n nav.footnav{position:static;' in src),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes (delta {len(src.encode())-1716179:+})')
print('CHAIN STEP 4 GREEN')
