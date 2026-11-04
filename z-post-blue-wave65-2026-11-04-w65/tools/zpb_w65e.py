#!/usr/bin/env python3
# zpb_w65e.py — the wave-65 chain step 5:
#   1. the comparison tab's template carries its two selects inside the header slots
#   2. the roster tab leads with the glowing BACK TO SEASON door (the Owner's top+bottom law)
#   3. the header sim doors sync on every season render (SIM SEASON appears the moment the season starts)
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P4_MD5 = '1311e9c1ca2dec714cce3931bc16b9ad'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-4 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P4_MD5:
    sys.exit(f'ABORT: part-4 md5 {md5} != {P4_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# 1 · the comparison selects live in the header slots from the first paint
rep(
"""  <div class="panel zpb-cmp-own" style="margin-bottom:14px;">
   <div class="zpb-cmphead">
    <span class="zpb-cmpside zpb-cmpside-a" id="zpbTabSlotA"></span>
    <span class="zpb-cmpscore" id="zpbTabScore"><span class="zpb-cmpsub">pick two teams</span></span>
    <span class="zpb-cmpside zpb-cmpside-b" id="zpbTabSlotB"></span>
   </div>
  </div>`);""",
"""  <div class="panel zpb-cmp-own" style="margin-bottom:14px;">
   <div class="zpb-cmphead">
    <span class="zpb-cmpside zpb-cmpside-a" id="zpbTabSlotA"><select id="cmpTeamA" aria-label="Team A"></select></span>
    <span class="zpb-cmpscore" id="zpbTabScore"><span class="zpb-cmpsub">pick two teams</span></span>
    <span class="zpb-cmpside zpb-cmpside-b" id="zpbTabSlotB"><select id="cmpTeamB" aria-label="Team B"></select></span>
   </div>
  </div>`);""",
 'the comparison selects ride the header slots')

# 2 · the roster tab leads with the glowing door
rep(
""" `;
 const roster = draftSim.rosters.find(r=>r.isUser), host = document.getElementById('lineupHost');""",
""" `;
 container.insertAdjacentHTML('afterbegin', '<div class="panel zpb-bts-top" style="margin-bottom:14px;text-align:center;"><button class="resetbtn zpb-bts" data-bts="1" style="width:auto;margin:0;padding:10px 26px;">BACK TO SEASON</button></div>'); // w65 (Owner): the glowing door back, at the top of the tab
 const roster = draftSim.rosters.find(r=>r.isUser), host = document.getElementById('lineupHost');""",
 'the roster tab leads with BACK TO SEASON')

# 3 · the header sim doors sync on every season render
rep(
""" wrap('renderDraftResults', function(){ try{ if(typeof render100 !== 'undefined' && window.__zpb100View) {} }catch(e){} paint(); });
 wrap('renderSeasonTab', function(){ paint(); });
 wrap('setActiveTab', function(){ paint(); });""",
""" function syncSimTabs(){ // w65 (Owner): the header doors follow the phase — SIM SEASON the moment the season starts, gone at the Super Bowl
  try{
   var S = seasonState; if(!S) return;
   var tabs = document.querySelector('#draftFinalResults .tabs'); if(!tabs) return;
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
   if(S.phase!=='playoffs' && pt) pt.remove();
  }catch(e){}
 }
 wrap('renderDraftResults', function(){ try{ if(typeof render100 !== 'undefined' && window.__zpb100View) {} }catch(e){} paint(); });
 wrap('renderSeasonTab', function(){ paint(); syncSimTabs(); });
 wrap('setActiveTab', function(){ paint(); });""",
 'the header sim doors sync with the phase')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

checks = [
 ('selects in slots', '<span class="zpb-cmpside zpb-cmpside-a" id="zpbTabSlotA"><select id="cmpTeamA"' in src),
 ('roster top door', "container.insertAdjacentHTML('afterbegin', '<div class=\"panel zpb-bts-top\"" in src),
 ('sync exists', 'function syncSimTabs(){' in src),
 ('season wrap calls sync', "wrap('renderSeasonTab', function(){ paint(); syncSimTabs(); });" in src),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes (delta {len(src.encode())-1716179:+})')
print('CHAIN STEP 5 GREEN')
