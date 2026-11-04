#!/usr/bin/env python3
"""w69 chain step 6 — the polish the battery demanded: the pack exposes --tOn2/--tOnd2
(the on-gradient candidate it did NOT pick), so the 20-0's sweep glints between the two
readable inks on EVERY team's gradient (for cream-on teams like the Steelers the old
cream-to-cream sweep was invisible). Input: step 5's md5."""
import hashlib

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
PREV_MD5 = '4e698dae78afa00f8ada9e4189f21953'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'step-5 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# 1 · the pack carries both on-gradient candidates
rep("""  '--tBg':pk.bgL,'--tOn':pk.on,""",
    """  '--tBg':pk.bgL,'--tOn':pk.on,'--tOn2':(pk.on==='#2c1e0c'?'#fffaf2':'#2c1e0c'), // W69: the other on-gradient candidate - the shine's glint stop (cream-on teams glint coffee, coffee-on teams glint cream)""",
    'pack light on2')
rep("""  '--tBgd':pk.bgD,'--tOnd':pk.onD,""",
    """  '--tBgd':pk.bgD,'--tOnd':pk.onD,'--tOnd2':(pk.onD==='#2c1e0c'?'#fffaf2':'#2c1e0c'), // W69: the dark mirror""",
    'pack dark on2')

# 2 · the w69 shine gradient glints between the two candidates
rep(""".zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOn,var(--ongold,#2c1e0c)),color-mix(in srgb,var(--tOn,var(--ongold,#2c1e0c)) 82%,#fffaf2) 50%,var(--tOn,var(--ongold,#2c1e0c))) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;}}
:root[data-theme="dark"] .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),color-mix(in srgb,var(--tOnd,var(--tOn,#2c1e0c)) 82%,#fffaf2) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),color-mix(in srgb,var(--tOnd,var(--tOn,#2c1e0c)) 82%,#fffaf2) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;} }""",
    """.zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOn,var(--ongold,#2c1e0c)),var(--tOn2,var(--tOn,#fffaf2)) 50%,var(--tOn,var(--ongold,#2c1e0c))) !important;background-size:220% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:fxshine 5.5s linear infinite;}}
:root[data-theme="dark"] .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),var(--tOnd2,var(--tOnd,#fffaf2)) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]) .zpb-ctabig .zpb-shine{background-image:linear-gradient(100deg,var(--tOnd,var(--tOn,#2c1e0c)),var(--tOnd2,var(--tOnd,#fffaf2)) 50%,var(--tOnd,var(--tOn,#2c1e0c))) !important;} }""",
    'shine glint gradient')

# 3 · post-checks
assert src.count("'--tOn2'") == 1 and src.count("'--tOnd2'") == 1
assert 'var(--tOn2,' in src
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step6 done -> md5 {h} bytes {len(src.encode("utf-8"))}')
