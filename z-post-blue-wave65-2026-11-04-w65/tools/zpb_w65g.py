#!/usr/bin/env python3
# zpb_w65g.py — the wave-65 chain step 7 (the round battery's three measured misses):
#   H3 · the zpb-simtabs host stretched SIM GAME to the 42px tab-row height while
#        SIM SEASON kept its natural 35px — align-items:center makes both doors the
#        SIM GAME size (the Owner: "both be the smaller size which is currently the
#        SIM GAME button")
#   L1 · the advanced badges joined the GRAPHICAL hero in step 6 but the hero
#        kept only the zpb-100hero class — the probe shows the graphical render100
#        is the one that runs (the text report is not reachable from the tab), so
#        the hero also wears zpb-100hero2; and zpb100More (the text report's badge
#        row) gains the same set directly — 12+ win seasons, playoff trips that
#        became titles, turnovers per game, sacks per game — while the step-e
#        monkey-patch retires (it would double the two badges it injected)
#   F1 · the 90+ escape-hatch beats (undrafted fillers) still made the depth
#        chart's tail wait 15.4s even at the 0.12s pace (w64: 128s) — the fillers
#        land right after the drafted beats now; the w47 relative order stands
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P6_MD5 = '8154627340b6e21246ca471630745c5b'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-6 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P6_MD5:
    sys.exit(f'ABORT: part-6 md5 {md5} != {P6_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# H3 · both header doors wear the SIM GAME size (the host stopped stretching the game button)
rep(
""".zpb-simtabs{display:inline-flex;gap:8px;}""",
""".zpb-simtabs{display:inline-flex;gap:8px;align-items:center;} /* w65 (Owner): the host stopped stretching SIM GAME — both doors wear the SIM GAME size */""",
 'the sim-tabs host stops stretching')

# L1a · the graphical hero (the render100 the probe shows actually runs) also wears hero2
rep(
"""  + '<div class="zpb-100hero">'""",
"""  + '<div class="zpb-100hero zpb-100hero2">' /* w65 (Owner): the graphical hero carries the hero2 hooks too */""",
 'the graphical hero wears hero2')

# L1b · the zpb100More badge row gains the advanced badges
rep(
"""window.zpb100More = function(myW, N, mine){
 try{
  if(!Array.isArray(myW) || !myW.length || !N) return '';
  const best = Math.max.apply(null, myW), worst = Math.min.apply(null, myW);
  const ten = Math.round(myW.filter(x=>x>=10).length / N * 100);
  const los = Math.round(myW.filter(x=>x<8).length / N * 100);
  const po = (mine && mine.po != null) ? Math.round(mine.po / N * 100) : null;
  return '<div class="zpb-100hero zpb-100hero2">'
   + '<div><b>'+best+'</b><span>best season</span></div>'
   + '<div><b>'+worst+'</b><span>worst season</span></div>'
   + '<div><b>'+ten+'%</b><span>10+ win seasons</span></div>'
   + '<div><b>'+los+'%</b><span>losing seasons</span></div>'
   + (po!=null ? '<div><b>'+po+'%</b><span>playoff rate</span></div>' : '')
   + '</div>';
 }catch(err){ return ''; }
};""",
"""window.zpb100More = function(myW, N, mine, agg){
 try{
  if(!Array.isArray(myW) || !myW.length || !N) return '';
  const best = Math.max.apply(null, myW), worst = Math.min.apply(null, myW);
  const ten = Math.round(myW.filter(x=>x>=10).length / N * 100);
  const los = Math.round(myW.filter(x=>x<8).length / N * 100);
  const po = (mine && mine.po != null) ? Math.round(mine.po / N * 100) : null;
  const twelve = Math.round(myW.filter(function(x){ return x>=12; }).length / N * 100); // w65 (Owner): the advanced badges join the 100-season badges
  const conv = (mine && mine.po && mine.champ != null) ? Math.round(mine.champ / mine.po * 100) : null;
  const tt = (agg && agg.totals) ? agg.totals : null;
  const tog = (tt && tt.g) ? (tt.to / tt.g / 2).toFixed(1) : null;
  const skg = (tt && tt.g) ? (tt.sacks / tt.g / 2).toFixed(1) : null;
  return '<div class="zpb-100hero zpb-100hero2">'
   + '<div><b>'+best+'</b><span>best season</span></div>'
   + '<div><b>'+worst+'</b><span>worst season</span></div>'
   + '<div><b>'+ten+'%</b><span>10+ win seasons</span></div>'
   + '<div><b>'+los+'%</b><span>losing seasons</span></div>'
   + (po!=null ? '<div><b>'+po+'%</b><span>playoff rate</span></div>' : '')
   + '<div><b>'+twelve+'%</b><span>12+ win seasons</span></div>'
   + (conv!=null ? '<div><b>'+conv+'%</b><span>playoff trips that became titles</span></div>' : '')
   + (tog!=null ? '<div><b>'+tog+'</b><span>turnovers per game</span></div>' : '')
   + (skg!=null ? '<div><b>'+skg+'</b><span>sacks per game</span></div>' : '')
   + '</div>';
 }catch(err){ return ''; }
};""",
 'the badge row gains the advanced badges')

rep(
""" + (window.zpb100More ? zpb100More(myW, N, mine) : '')""",
""" + (window.zpb100More ? zpb100More(myW, N, mine, A) : '') /* w65 (Owner): the aggregate feeds the per-game badges */""",
 'the call site passes the aggregate')

# L1c · the step-e monkey-patch retires — zpb100More carries the badges natively now
rep(
"""// W65-E (Owner): the 100-seasons hero gains the site's other advanced badges (computed from the same aggregate).
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
})();""",
"""// W65-E (Owner): retired in chain step 7 — zpb100More carries the advanced badges natively
// (12+ win seasons, playoff trips that became titles, turnovers per game, sacks per game);
// the string-injection wrapper would have doubled the two badges it added.""",
 'the step-e badge wrapper retires')

# F1 · the 90+ escape-hatch floor retires — the fillers land right after the drafted beats
rep(
"""  Object.keys(entry.slotmap||{}).forEach(s=>{ const en = entry.slotmap[s]; const nm = en && en[0]; if(nm && !idx[nm]) idx[nm] = 90 + Object.keys(idx).length; });""",
"""  var zhb = Math.max(32, Object.keys(idx).length), zhx = 0; // w65 (Owner): the fillers land right after the drafted beats — the old 90+ floor made the depth chart's tail wait 15s even at the 0.12s pace (w64: two minutes)
  Object.keys(entry.slotmap||{}).forEach(s=>{ const en = entry.slotmap[s]; const nm = en && en[0]; if(nm && !idx[nm]) idx[nm] = zhb + (++zhx); });""",
 'the 90+ beat floor retires')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

checks = [
 ('host centers', '.zpb-simtabs{display:inline-flex;gap:8px;align-items:center;}' in src),
 ('graphical hero wears hero2', src.count('"zpb-100hero zpb-100hero2"') == 2),
 ('badges in zpb100More', 'playoff trips that became titles</span>' in src and src.count('12+ win seasons</span>') == 2),
 ('per-game badges', 'turnovers per game</span>' in src and 'sacks per game</span>' in src),
 ('aggregate passed', "zpb100More(myW, N, mine, A)" in src),
 ('step-e wrapper retired', 'zpb100More._zpbW65' not in src and 'retired in chain step 7' in src),
 ('no 90+ floor', '90 + Object.keys(idx).length' not in src and 'zhb + (++zhx)' in src),
 ('map keeps 1s', src.count('.zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);}') == 1),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes')
print('CHAIN STEP 7 GREEN')
