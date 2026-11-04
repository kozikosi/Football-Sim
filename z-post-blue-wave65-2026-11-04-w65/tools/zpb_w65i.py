#!/usr/bin/env python3
# zpb_w65i.py — the wave-65 chain step 9:
#   with the leaked comment gone the tab row fits ONE line again — and the row's
#   tall tabs (42px) stretch SIM SEASON (a direct flex child) back to 42 while the
#   centered host keeps SIM GAME at 35. The doors get align-self:center: both wear
#   the SIM GAME size on the shared line (the Owner's law, measured [35,35]).
import hashlib, sys

SRC = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
OUT = '/home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html'
P8_MD5 = '7b90a023e27b76fc25f91dfbfa1a6e4d'

src = open(SRC, encoding='utf-8').read()
md5 = hashlib.md5(src.encode()).hexdigest()
print(f'stage: part-8 output · md5 {md5} · {len(src.encode())} bytes')
if md5 != P8_MD5:
    sys.exit(f'ABORT: part-8 md5 {md5} != {P8_MD5}')

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
""".zpb-simtabs{display:inline-flex;gap:8px;align-items:center;} /* w65 (Owner): the host stopped stretching SIM GAME — both doors wear the SIM GAME size */""",
""".zpb-simtabs{display:inline-flex;gap:8px;align-items:center;} /* w65 (Owner): the host stopped stretching SIM GAME — both doors wear the SIM GAME size */
.tabs > .zpb-ctasmall{align-self:center;} /* w65 (Owner): the doors keep the SIM GAME height on the shared tab line — the row's tall tabs don't stretch them */""",
 'the doors keep their height on the shared line')

if fails:
    print('ANCHOR FAILURES:'); [print('  ' + f) for f in fails]
    sys.exit(1)

checks = [
 ('align-self law', '.tabs > .zpb-ctasmall{align-self:center;}' in src),
 ('host centers', '.zpb-simtabs{display:inline-flex;gap:8px;align-items:center;}' in src),
]
bad = [n for n, okc in checks if not okc]
for n, okc in checks:
    print(('  PASS ' if okc else '  FAIL ') + n)
if bad:
    sys.exit('POST-CHECK FAILURES: ' + ', '.join(bad))

open(OUT, 'w', encoding='utf-8').write(src)
out_md5 = hashlib.md5(src.encode()).hexdigest()
print(f'\nwritten: {OUT} · md5 {out_md5} · {len(src.encode())} bytes')
print('CHAIN STEP 9 GREEN')
