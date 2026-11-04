#!/usr/bin/env python3
# zpb_w65h.py — the wave-65 chain step 8:
#   the visual check caught a w65 comment living INSIDE the results-view template
#   literal — it rendered as page text under the tab row, ate the row's width and
#   pushed SIM SEASON onto its own line. The comment moves to real JS ground.
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P7_MD5 = '286054f7bba92303d34ce7b00f1630af'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-7 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P7_MD5:
    sys.exit(f'ABORT: part-7 md5 {md5} != {P7_MD5}')

fails = []
def rep(old, new, tag):
    global src
    n = src.count(old)
    if n != 1:
        fails.append(f'{tag}: anchor count {n} (want 1)')
        return
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep(
""" let h = `<div class="zpb-cygops\"""",
""" // w65 (Owner): SIM GAME joins the tab row (the host fills at render time) and SIM SEASON shows only while the regular season is live — never on the Super Bowl review page
 let h = `<div class="zpb-cygops\"""",
 'the comment moves above the template')

rep(
"""${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnTop">SIM PLAYOFFS</button>':''} // w65 (Owner): SIM GAME joins the tab row (the host fills at render time) and SIM SEASON shows only while the regular season is live — never on the Super Bowl review page
  </div>""",
"""${seasonState&&seasonState.phase==='playoffs'?'<button class="tabbtn zpb-ctasmall" id="simPlayoffsBtnTop">SIM PLAYOFFS</button>':''}
  </div>""",
 'the comment leaves the template literal')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

checks = [
 ('comment out of the literal', "} // w65 (Owner): SIM GAME joins the tab row" not in src),
 ('comment on JS ground', src.count(' // w65 (Owner): SIM GAME joins the tab row') == 1),
 ('tabs close clean', "id=\"simPlayoffsBtnTop\">SIM PLAYOFFS</button>':''}\n  </div>" in src),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes')
print('CHAIN STEP 8 GREEN')
