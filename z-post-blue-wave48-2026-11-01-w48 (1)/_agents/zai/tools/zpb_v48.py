#!/usr/bin/env python3
# zpb_v48.py — the w48 build: the Owner's one task — the w47 glow retires, the w45 sweep rules
# everywhere, the Madden rankings chip name reads again.
# Base: Football-Sim-Z-post-blue-w47.html (md5 eef6b93849b3df5d49b3f262185f678b)
# Product: Football-Sim-Z-post-blue-w48.html
import hashlib

SRC = '/home/z/my-project/w48work/base.html'
DST = '/home/z/my-project/w48work/Football-Sim-Z-post-blue-w48.html'

src = open(SRC, encoding='utf-8').read()
base_md5 = hashlib.md5(src.encode()).hexdigest()
assert base_md5 == 'eef6b93849b3df5d49b3f262185f678b', 'base md5 mismatch: ' + base_md5
s = src
applied = []

def rep(tag, old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, f'[{tag}] expected {count} occurrence(s), found {n}'
    s = s.replace(old, new)
    applied.append(tag)

# ============ W48 · the w47 glow block leaves the w47 CSS section ============
# The four pieces (the static-fill override, the glow animation, the keyframe, the
# reduced-motion guard) become one w48 ruling; the w45/46 cascade beneath rules again.
rep('W48-shimmer-block',
"""/* ============ Z-POST-BLUE W47 CSS ============ */
/* w47 (Owner): the gold is the CONSTANT deep gold on every team — the sweep's pale bands retire.
   The Chiefs and the Raiders wear the same gold at the same moment; the shimmer itself becomes
   one synchronized glow in the text's own gold. */
@supports ((-webkit-background-clip:text) or (background-clip:text)){
 .zpb-shm,.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:none !important;-webkit-background-clip:border-box;background-clip:border-box;color:var(--zshim,var(--tA2,var(--zrb,var(--gold3)))) !important;-webkit-text-fill-color:var(--zshim,var(--tA2,var(--zrb,var(--gold3)))) !important;}
}
.zpb-shm,.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{animation:zpbshimglow 3.4s ease-in-out infinite;}
@keyframes zpbshimglow{0%,100%{text-shadow:0 0 0 rgba(250,235,200,0);}50%{text-shadow:0 0 16px currentColor;}}
@media (prefers-reduced-motion: reduce){ .zpb-shm,.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{animation:none !important;text-shadow:none !important;} }""",
"""/* ============ Z-POST-BLUE W47 CSS ============ */
/* w48 (Owner): the w47 glow retires — the whole block above it is gone. The shimmer is the w45
   sweep again, the exact look the Kansas City Chiefs' 90+ names wear on the team comparison
   page in w45/w46: --zshim (the constant deep gold --gold3) breathing to --gold2 under
   zpbshmsweep, one shimmer on every surface and every team, both themes. No text-shadow, no
   glow, nothing static — the sweep rules everywhere possible. The Madden rankings' ANCHOR chip
   keeps his gold family; the chip's NAME reads the chip ink again (the tier law left the chip
   with the glow). */""")

# ============ W48 · the ANCHOR chip name reads the chip ink again ============
# w47's O2 gave the chip's name the tier law (90+ zpb-shm / 85+ zpb-vib) — gold sweep text on
# the chip's gold-family fill = the unreadable page. Both template branches lose the classes;
# the comment changes with them. (Branch 2 ends with ';' after the same comment.)
rep('W48-anchor-classes',
'<span class="zpb-anchname ${best.ovr>=90?\'zpb-shm\':(best.ovr>=85?\'zpb-vib\':\'\')}">${best.name}',
'<span class="zpb-anchname">${best.name}',
count=2)

rep('W48-anchor-comment',
' // w47 (Owner): the anchored player shimmers at 90+ and reads bold at 85+, like every other surface',
' // w48 (Owner): the chip name reads the chip ink — the w45 shimmer does not enter the chip',
count=2)

# ============ post-checks ============
checks = []
def chk(name, cond):
    checks.append((name, bool(cond)))
    assert cond, 'POST-CHECK FAILED: ' + name

chk('glow keyframe gone', s.count('zpbshimglow') == 0)
chk('glow override gone', 'background-clip:border-box' not in s)
chk('static-fill override gone (3 fallbacks = w46 parity)', s.count('text-fill-color:var(--zshim,var(--tA2') == 3)
chk('zpb-shm count back to w46', s.count('zpb-shm') == 74)
chk('zpb-vib count back to w46', s.count('zpb-vib') == 52)
chk('zpb-anchname count intact', s.count('zpb-anchname') == 6)
chk('sweep keyframe calls intact', s.count('zpbshmsweep 3.4s linear infinite') == 3)
chk('sweep keyframes intact', s.count('@keyframes zpbshmsweep') == 1)
chk('root gold law intact', ':root{--zshim:var(--gold3,#9a6b1f);}' in s)
chk('champion exception intact', '.champion-banner{--zshim:var(--zshimL,#c9a24b);}' in s)
chk('lu-cell sweep intact', 'zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:linear-gradient(100deg,var(--zshim,var(--gold3,#9a6b1f)) 18%,var(--gold2,#e6c67d) 38%' in s)
chk('w45 generic sweep intact', 'linear-gradient(100deg,var(--zshim,var(--tA2,var(--gold3))),var(--gold2,#e6c67d) 40%,var(--zshim,var(--tA2,var(--gold3))) 70%)' in s)
chk('anchname plain in both branches', s.count('zpb-anchname">${best.name}') == 2)
chk('w48 ruling documented', 'w48 (Owner): the w47 glow retires' in s)
chk('w47 css section header kept', '/* ============ Z-POST-BLUE W47 CSS ============ */' in s)
chk('w47 js block untouched', '<script id="zpb-w47-js">' in s)
# the rest of w47 stands: spot-hold five laws from his round-47 that must NOT move
chk('w47 dime stack stands', "+ xrow([['DIME','DIME',-3]], 'def')" in s)
chk('w47 theme default stands', "the theme button's init keeps the no-signal dark b" in s)
chk('w47 topbar sentence gone', 'Awards, stats, your report card and how the season was decided' not in s)
chk('w47 dark halfway ink stands', 'txMd' in s)
chk('w47 golden chip stands', '.zpb-anch{border-color:#cfa96b !important;background:#f4e6c3 !important;color:#4a3410 !important;}' in s)
chk('chip ink rule stands', '.zpb-anch .zpb-anchname{color:inherit !important;}' in s)

md5 = hashlib.md5(s.encode()).hexdigest()
open(DST, 'w', encoding='utf-8').write(s)
print('applied:', applied)
print('checks :', len(checks), 'all green')
print('w48 written:', DST, len(s), 'chars, md5', md5)
