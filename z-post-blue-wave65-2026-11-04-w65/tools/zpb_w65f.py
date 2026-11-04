#!/usr/bin/env python3
# zpb_w65f.py — the wave-65 chain step 6:
#   1. the w47 seen-gate law (the depth zones' 1s beats) joins the w65 speed — the Owner's
#      "at least half a second faster" lands on the rule that actually paints the depth chart
#   2. the draft-review player cards (dbk-g) ride the same faster beat (the w63 bundle)
#   3. SIM SEASON leaves the w57 big-ID size law — both header doors wear the small size
#   4. the graphical 100-seasons hero gains the advanced badges (the override never called zpb100More)
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P5_MD5 = '88cfe4126168fc609859106c36e0c1ba'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-5 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P5_MD5:
    sys.exit(f'ABORT: part-5 md5 {md5} != {P5_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

# 1 · the depth zones' seen-gate beat: 1s -> 0.12s, fade .55s -> .3s
rep(
""".zpb-dz.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);}""",
""".zpb-dz.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.12s);} /* w65 (Owner): at least half a second faster — this is the rule that paints the depth chart */""",
 'the depth zones ride the 0.12s beat')

# 2 · the draft-review player cards keep the same pace
rep(
""".zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);} /* w46 (O4, Owner): the panels ride the map's beat · synced */""",
""".zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.12s);} /* w46 (O4, Owner): the panels ride the map's beat · w65 (Owner): the review cards join the faster beat */""",
 'the review cards join the faster beat')

# 3 · SIM SEASON leaves the big-ID size law (both header doors wear the small size)
rep(
"""#beginSeasonBtn,#beginSeasonBtn2,#startDraftBtn,#simSeasonBtn,#simPlayoffsBtn,#seasonReviewBtn,#beginPlayoffsBtn{font-size:1rem !important;padding:13px 30px !important;} /* w57 (Owner): BEGIN PLAYOFFS wears the SIM PLAYOFFS size */""",
"""#beginSeasonBtn,#beginSeasonBtn2,#startDraftBtn,#simPlayoffsBtn,#seasonReviewBtn,#beginPlayoffsBtn{font-size:1rem !important;padding:13px 30px !important;} /* w57 (Owner): BEGIN PLAYOFFS wears the SIM PLAYOFFS size · w65 (Owner): SIM SEASON leaves the big law — it rides the tab row at the SIM GAME size */""",
 'SIM SEASON drops the big-ID size law')

# 4 · the graphical 100-seasons hero gains the advanced badges
rep(
""" const champPct = pctS(mine.champ/N, 1), poPct = pctS(mine.po/N), divPct = pctS(mine.div/N), sbPct = pctS(mine.sbApp/N, 1);""",
""" const champPct = pctS(mine.champ/N, 1), poPct = pctS(mine.po/N), divPct = pctS(mine.div/N), sbPct = pctS(mine.sbApp/N, 1);
 const w65Twelve = Math.round(myW.filter(function(x){ return x>=12; }).length / N * 100), w65Conv = mine.po ? Math.round(mine.champ / mine.po * 100) : 0; // w65 (Owner): the advanced badges join the hero""",
 'the hero numbers compute')

rep(
"""  + '<div><b>' + champPct + '</b><span>championships</span></div>'
  + '</div>'""",
"""  + '<div><b>' + champPct + '</b><span>championships</span></div>'
  + '<div><b>' + w65Twelve + '%</b><span>12+ win seasons</span></div>'
  + '<div><b>' + w65Conv + '%</b><span>playoff trips that became titles</span></div>'
  + '</div>'""",
 'the hero gains the badges')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

checks = [
 ('depth zones 0.12', '.zpb-dz.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.12s);}' in src),
 ('review cards 0.12', '.zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both' in src),
 ('map keeps 1s', src.count('.zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);}') == 1),
 ('SIM SEASON off the big law', '#startDraftBtn,#simSeasonBtn,' not in src and '#startDraftBtn,#simPlayoffsBtn,' in src),
 ('hero badges', "'12+ win seasons</span></div>'" in src.replace('"',"'") or 'playoff trips that became titles</span>' in src),
 ('hero numbers', 'w65Twelve' in src and 'w65Conv' in src),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes (delta {len(src.encode())-1716179:+})')
print('CHAIN STEP 6 GREEN')
