#!/usr/bin/env python3
"""w66 chain step 14 — N5: the season-tab Team Comparison dropdowns join the homepage's
custom family (the raw OS menu — the purple wave — is gone; groups, team inks, Cinzel).
N6: SIM GAME · SIM SEASON · BACK TO SEASON move onto the top panel's upper line next to
100 SEASONS; BACK TO SEASON stops being its own panel and reads like the SIM SEASON tab.
N7: the second SIM PLAYOFFS button next to "Play the X" retires — the top panel keeps the
one door."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP13_MD5 = 'ce86828c0e8e7d93fc690230ca001ade'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP13_MD5, 'step-13 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ================= N6a · the upper line carries the doors =================
rep("""<span class="zpb-draftops" id="zpbDraftOps"><button class="tabbtn" id="newDraftBtn" style="font-size:0.78rem;padding:5px 10px;">NEW DRAFT</button></span><p class="dsub zpb-cygdsub" style="margin:0;">""",
    """<span class="zpb-draftops" id="zpbDraftOps"><button class="tabbtn" id="newDraftBtn" style="font-size:0.78rem;padding:5px 10px;">NEW DRAFT</button></span><span class="zpb-simtabs" id="zpbSimTabsHost">${seasonState&&seasonState.phase==='regular'?'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>':''}${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnTop">SIM PLAYOFFS</button>':''}</span><span class="zpb-simtabs" id="zpbBtsHost"></span><p class="dsub zpb-cygdsub" style="margin:0;">""", # w66 (Owner): SIM GAME · SIM SEASON · BACK TO SEASON live on the upper line, next to 100 SEASONS
    'cygops upper line', 1)

rep("""<button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button><span id="zpbSimTabsHost" class="zpb-simtabs"></span>${seasonState&&seasonState.phase==='regular'?'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>':''}${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnTop">SIM PLAYOFFS</button>':''}
  </div>""",
    """<button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button>
  </div>""", # w66 (Owner): the tab row keeps the tabs; the sim doors live on the upper line
    'tabs row slimmed', 1)

# the w65 SIM GAME wrapper must PRESERVE the host's other doors (it used to own the host's innerHTML)
rep("""    host.innerHTML = showGame ? '<button class="tabbtn zpb-ctasmall zpb-simgame" id="simGameBtn">SIM GAME</button>' : '';
    var b = document.getElementById('simGameBtn');""",
    """    var _sg0 = document.getElementById('simGameBtn');
    if(showGame && !_sg0){ var _gb = document.createElement('button'); _gb.className = 'tabbtn zpb-ctasmall zpb-simgame'; _gb.id = 'simGameBtn'; _gb.textContent = 'SIM GAME'; host.insertBefore(_gb, host.firstChild); }
    if(!showGame && _sg0) _sg0.remove(); // w66: the host now carries SIM SEASON / SIM PLAYOFFS too — SIM GAME joins them instead of overwriting them
    var b = document.getElementById('simGameBtn');""",
    'sim game preserves host', 1)

# ================= N6b · BACK TO SEASON — upper line, tab brightness, no own panel =================
rep("""// W65-C (Owner): the universal BACK TO SEASON — one glowing button at the bottom of every page that
// is not the season itself, plus the top doors on Your Roster / Team Comparison (delegated data-bts).
(function(){
 'use strict';
 var bar = null;""",
    """// W66 (Owner): BACK TO SEASON lives on the top panel's upper line next to 100 SEASONS —
// never its own panel, never a bottom bar — and reads like the SIM SEASON tab.
(function(){
 'use strict';""",
    'bts module head', 1)

rep(""" function paint(){
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
 }""",
    """ function paint(){
  var host = document.getElementById('zpbBtsHost'); // w66: the upper-line host inside the top panel
  if(!host) return;
  var show = seasonLive() && !onSeasonTab();
  if(!show){ if(host.innerHTML) host.innerHTML = ''; return; }
  if(!host.innerHTML){
   host.innerHTML = '<button class="tabbtn zpb-ctasmall zpb-simseason" data-bts="1" style="font-size:0.78rem;padding:5px 10px;">BACK TO SEASON</button>';
  }
 }""",
    'bts paint upper line', 1)

rep("""   var tabs = document.querySelector('#draftFinalResults .tabs'); if(!tabs) return;
   var ss = document.getElementById('simSeasonBtn'), pt = document.getElementById('simPlayoffsBtnTop');
   if(S.phase==='regular' && !ss){
    var b = document.createElement('button'); b.className = 'tabbtn zpb-ctasmall zpb-simseason'; b.id = 'simSeasonBtn'; b.textContent = 'SIM SEASON';
    tabs.appendChild(b);
   }
   if(S.phase!=='regular' && ss) ss.remove();
   if(S.phase==='playoffs' && !pt){
    var b2 = document.createElement('button'); b2.className = 'tabbtn zpb-ctasmall'; b2.id = 'simPlayoffsBtnTop'; b2.textContent = 'SIM PLAYOFFS';
    b2.addEventListener('click', function(){ var pb = document.getElementById('simRestBtn'); if(pb) pb.click(); });
    tabs.appendChild(b2);
   }
   if(S.phase!=='playoffs' && pt) pt.remove();""",
    """   var tabs = document.getElementById('zpbSimTabsHost') || document.querySelector('#draftFinalResults .tabs'); if(!tabs) return; // w66: the doors live on the upper line
   var ss = document.getElementById('simSeasonBtn'), pt = document.getElementById('simPlayoffsBtnTop');
   if(S.phase==='regular' && !ss){
    var b = document.createElement('button'); b.className = 'tabbtn zpb-ctasmall zpb-simseason'; b.id = 'simSeasonBtn'; b.textContent = 'SIM SEASON';
    tabs.appendChild(b);
   }
   if(S.phase!=='regular' && ss) ss.remove();
   if(S.phase==='playoffs' && !pt){
    var b2 = document.createElement('button'); b2.className = 'tabbtn zpb-ctasmall'; b2.id = 'simPlayoffsBtnTop'; b2.textContent = 'SIM PLAYOFFS';
    b2.addEventListener('click', function(){ if(window.zpbSimRestOfPlayoffs) window.zpbSimRestOfPlayoffs(); }); // w66: the ONE door runs the rest itself
    tabs.appendChild(b2);
   }
   if(S.phase!=='playoffs' && pt) pt.remove();""",
    'syncSimTabs upper line', 1)

rep(""" container.insertAdjacentHTML('afterbegin', '<div class="panel zpb-bts-top" style="margin-bottom:14px;text-align:center;"><button class="resetbtn zpb-bts" data-bts="1" style="width:auto;margin:0;padding:10px 26px;">BACK TO SEASON</button></div>'); // w65 (Owner): the glowing door back, at the top of the tab
""",
    """ // w66 (Owner): the standalone BACK TO SEASON panel retires — the door rides the top panel's upper line
""", count=2, tag='bts-top panels retire')

rep("if(b && !b._zpbW65){ b._zpbW65 = true; b.classList.add('zpb-bts'); b.textContent = 'BACK TO SEASON'; b.style.width = 'auto'; }",
    "if(b && !b._zpbW65){ b._zpbW65 = true; b.classList.add('zpb-ctasmall','zpb-simseason'); b.textContent = 'BACK TO SEASON'; b.style.width = 'auto'; } // w66 (Owner): bright like the SIM SEASON tab, never the faded ghost",
    'back100 brightness', 1)

# ================= N6c/N7 · the footer sim doors retire; the one SIM PLAYOFFS door runs itself =================
rep(""" const sim = (S && S.phase==='regular') ? '<button class="tabbtn" id="simSeasonBtnFoot" style="width:auto;">SIM SEASON</button>'
          : (S && S.phase==='playoffs') ? '<button class="tabbtn" id="simPlayoffsBtnFoot" style="width:auto;">SIM THE PLAYOFFS</button>' : '';""",
    """ const sim = ''; // w66 (Owner): the sim doors live on the top panel's upper line — the footer keeps CONTINUE, RUN IT BACK and NEW DRAFT""",
    'footer sim doors retire', 1)

rep("""  const sTop = document.getElementById('simPlayoffsBtnTop'), pb = document.getElementById('simRestBtn');
  const sFoot = document.getElementById('simSeasonBtnFoot'), pFoot = document.getElementById('simPlayoffsBtnFoot');
  if(sFoot){ const s = document.getElementById('simSeasonBtn'); if(s) sFoot.addEventListener('click', function(){ s.click(); }); else sFoot.style.display = 'none'; }
  if(pb){ if(pFoot) pFoot.addEventListener('click', function(){ pb.click(); }); if(sTop) sTop.addEventListener('click', function(){ pb.click(); }); }
  else { if(pFoot) pFoot.style.display = 'none'; if(sTop) sTop.style.display = 'none'; }
 }catch(e){}""",
    """  const sTop = document.getElementById('simPlayoffsBtnTop');
  if(sTop && !sTop._zpbW66door){ sTop._zpbW66door = true; sTop.addEventListener('click', function(){ if(window.zpbSimRestOfPlayoffs) window.zpbSimRestOfPlayoffs(); }); } // w66 (Owner): the one SIM PLAYOFFS door runs the whole rest itself
 }catch(e){}""",
    'one door wiring', 1)

# ---- N7 · the second SIM PLAYOFFS next to "Play the X" retires ----
rep("""html += `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:center;"><button class="resetbtn zpb-ctabig" id="simRoundBtn" style="width:auto;margin:0;padding:12px 30px;">${roundBtnLbl}</button><button class="tabbtn zpb-ctasmall" id="simRestBtn">${rk==='superbowl'?'SIM SUPER BOWL':'Sim Playoffs'}</button></div></div>`;""",
    """html += `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:center;"><button class="resetbtn zpb-ctabig" id="simRoundBtn" style="width:auto;margin:0;padding:12px 30px;">${roundBtnLbl}</button></div></div>`; // w66 (Owner): the second Sim Playoffs button next to Play the X retires — the top panel carries the one door""",
    'play-the-x row slimmed', 1)

rep("""html += `<div class="panel" style="margin-bottom:14px;"><button class="resetbtn" id="nextRoundBtn" style="width:100%;margin:0;padding:12px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${rk!=='superbowl' && !myLost?'<div style="margin-top:8px;text-align:right;"><button class="tabbtn" id="simRestBtn">Sim Playoffs</button></div>':''}</div>`;""",
    """html += `<div class="panel" style="margin-bottom:14px;"><button class="resetbtn" id="nextRoundBtn" style="width:100%;margin:0;padding:12px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button></div>`; // w66 (Owner): the extra Sim Playoffs link retires with its twin — one door, the top panel's""",
    'continue row slimmed', 1)

# ================= N5 · the comparison tab's dropdowns join the homepage family =================
rep(""" selA.addEventListener('change', renderCompare);
 selB.addEventListener('change', renderCompare);
 renderCompare();
 wireSeasonOptions(container);""",
    """ selA.addEventListener('change', renderCompare);
 selB.addEventListener('change', renderCompare);
 renderCompare();
 if(window.zpbEnhanceCmpSel){ try{ zpbEnhanceCmpSel(selA, resolve); zpbEnhanceCmpSel(selB, resolve); }catch(err){} } // w66 (Owner): the raw OS menu (the purple wave) is gone — the homepage dropdown family, teams in their own 0.5 inks
 wireSeasonOptions(container);""",
    'comparison enhance hook', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 14 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
