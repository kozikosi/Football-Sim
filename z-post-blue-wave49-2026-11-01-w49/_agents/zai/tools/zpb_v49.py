#!/usr/bin/env python3
# zpb_v49.py — the w49 build: the Owner's expansion — the shimmering gold reaches every 90+
# player on every page. The comparison sweep breathes pale→mid gold so BOTH sides of the
# matchup read it (his Raiders report); the Madden rankings' ANCHOR name shimmers again on
# the new delicate rose-gold chip; the team detail's "led by" names join the tier law.
# Base: Football-Sim-Z-post-blue-w48.html (md5 d8b64fd7958324ca98a64d0fb6e08a9f)
# Product: Football-Sim-Z-post-blue-w49.html
import hashlib

SRC = '/home/z/my-project/w49work/base.html'
DST = '/home/z/my-project/w49work/Football-Sim-Z-post-blue-w49.html'

src = open(SRC, encoding='utf-8').read()
base_md5 = hashlib.md5(src.encode()).hexdigest()
assert base_md5 == 'd8b64fd7958324ca98a64d0fb6e08a9f', 'base md5 mismatch: ' + base_md5
s = src
applied = []

def rep(tag, old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, f'[{tag}] expected {count} occurrence(s), found {n}'
    s = s.replace(old, new)
    applied.append(tag)

# ============ W49 · the new mid-gold token on all four :root theme blocks ============
rep('W49-goldm-light',
' --rose:#c97a8e; --rosehair:#dcc0cb; --gold2:#e6c67d; --gold3:#9a6b1f;',
' --rose:#c97a8e; --rosehair:#dcc0cb; --gold2:#e6c67d; --gold3:#9a6b1f; --goldm:#ad7f2e;',
count=2)

rep('W49-goldm-dark-2sp',
' --rose:#dfa6b4; --rosehair:#4a353c; --gold2:#e8c87e; --gold3:#8a5f18;\n  --ongold:#2c1e0c;',
' --rose:#dfa6b4; --rosehair:#4a353c; --gold2:#e8c87e; --gold3:#8a5f18; --goldm:#c39a4a;\n  --ongold:#2c1e0c;',
count=1)

rep('W49-goldm-dark-1sp',
' --rose:#dfa6b4; --rosehair:#4a353c; --gold2:#e8c87e; --gold3:#8a5f18;\n --ongold:#2c1e0c;',
' --rose:#dfa6b4; --rosehair:#4a353c; --gold2:#e8c87e; --gold3:#8a5f18; --goldm:#c39a4a;\n --ongold:#2c1e0c;',
count=1)

# ============ W49 · the comparison sweep reads gold on BOTH sides ============
# The w46 strip began at the deep gold; the left team's glyphs rest on the pale mid-band,
# the right team's on the deep head — his Raiders report. The strip now breathes pale
# (--gold2) to the new mid gold (--goldm): every phase, both alignments, both themes = gold.
rep('W49-lucell-sweep',
'.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:linear-gradient(100deg,var(--zshim,var(--gold3,#9a6b1f)) 18%,var(--gold2,#e6c67d) 38%,var(--zshim,var(--gold3,#9a6b1f)) 55%,var(--gold2,#e6c67d) 72%,var(--zshim,var(--gold3,#9a6b1f)) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}} /* w46 (O4, Owner): the sweep stays inside the gold family · every phase reads gold, the cream bands retire */',
'.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:linear-gradient(100deg,var(--gold2,#e6c67d) 10%,var(--goldm,#ad7f2e) 22%,var(--gold2,#e6c67d) 34%,var(--goldm,#ad7f2e) 52%,var(--gold2,#e6c67d) 70%,var(--goldm,#ad7f2e) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}} /* w49 (Owner): the sweep breathes pale to mid gold so BOTH teams read the shimmering gold at rest — the deep-gold head read as flat ink on the far side of the matchup (his Raiders report); every phase still gold, the cream bands stay retired */')

# ============ W49 · the ANCHOR name wears the tier law again (both branches) ============
rep('W49-anchor-classes',
'<span class="zpb-anchname">${best.name}',
'<span class="zpb-anchname ${best.ovr>=90?\'zpb-shm\':(best.ovr>=85?\'zpb-vib\':\'\')}">${best.name}',
count=2)

rep('W49-anchor-comment',
' // w48 (Owner): the chip name reads the chip ink — the w45 shimmer does not enter the chip',
' // w49 (Owner): the anchor name wears the shimmer again — the delicate rose-gold chip keeps it readable',
count=2)

# ============ W49 · the chip frame: delicate rose gold, barely not white ============
rep('W49-chip-rose',
'.zpb-anch{border-color:#cfa96b !important;background:#f4e6c3 !important;color:#4a3410 !important;} /* w47 (Owner): the chip wears the site\'s own gold family in light mode — the dark chip untouched */',
'.zpb-anch{border-color:#e2bfae !important;background:#f9ece4 !important;color:#6b4634 !important;} /* w49 (Owner): the frame is a delicate rose gold, barely not white — the yellow retires; the name inside shimmers on the pale rose */')

# ============ W49 · the chip's own sweep — readable gold on the rose fill ============
# Deep gold to mid gold (never the pale cream bands): a 0.78rem bold name must read at every
# phase. Dark reads the lighter pair on the plum. Inserted after the dark chip rule so it
# follows both ink rules in the cascade.
rep('W49-chip-sweep',
':root[data-theme="dark"] .zpb-anch,:root:not([data-theme="light"]) .zpb-anch{border-color:#8a5f78 !important;background:#4d2f3f !important;color:#f2d7e4 !important;}',
''':root[data-theme="dark"] .zpb-anch,:root:not([data-theme="light"]) .zpb-anch{border-color:#8a5f78 !important;background:#4d2f3f !important;color:#f2d7e4 !important;}
/* w49 (Owner): the ANCHOR name shimmers inside the chip again — his round-49 expansion retires
   the w48 exception. The chip's sweep breathes deep gold to the mid gold (never the pale cream
   bands) so the small name reads on the pale rose fill at every phase of zpbshmsweep; dark
   reads the lighter pair on the plum. */
.zpb-anch .zpb-shm{color:var(--gold3,#9a6b1f) !important;-webkit-text-fill-color:var(--gold3,#9a6b1f) !important;background:none !important;animation:none;}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
.zpb-anch .zpb-shm{background:linear-gradient(100deg,var(--gold3,#9a6b1f) 18%,var(--goldm,#ad7f2e) 38%,var(--gold3,#9a6b1f) 55%,var(--goldm,#ad7f2e) 72%,var(--gold3,#9a6b1f) 88%) !important;background-size:230% 100% !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;-webkit-text-fill-color:transparent !important;animation:zpbshmsweep 3.4s linear infinite;}}
:root[data-theme="dark"] .zpb-anch .zpb-shm,:root:not([data-theme="light"]) .zpb-anch .zpb-shm{background-image:linear-gradient(100deg,var(--gold2,#e8c87e) 18%,var(--goldm,#c39a4a) 38%,var(--gold2,#e8c87e) 55%,var(--goldm,#c39a4a) 72%,var(--gold2,#e8c87e) 88%) !important;}''')

# ============ W49 · the team detail's "led by" names join the tier law ============
rep('W49-ledby-tier',
'<i>led by ${m.top[0] ? m.top[0][0] : \'a thin room\'}</i>',
'<i>led by ${m.top[0] ? (m.top[0][3]>=90 ? \'<b class="zpb-shm">\'+m.top[0][0]+\'</b>\' : (m.top[0][3]>=85 ? \'<b class="zpb-vib">\'+m.top[0][0]+\'</b>\' : m.top[0][0])) : \'a thin room\'}</i>')

# ============ W49 · the w47/w48 ruling comment carries the w49 paragraph ============
rep('W49-ruling-comment',
'''   glow, nothing static — the sweep rules everywhere possible. The Madden rankings' ANCHOR chip
   keeps his gold family; the chip's NAME reads the chip ink again (the tier law left the chip
   with the glow). */''',
'''   glow, nothing static — the sweep rules everywhere possible. The Madden rankings' ANCHOR chip
   keeps his gold family; the chip's NAME reads the chip ink again (the tier law left the chip
   with the glow). */
/* w49 (Owner): the expansion — every 90+ name on every page shimmers. The comparison's sweep
   breathes pale to mid gold so the far side of the matchup reads the same shimmering gold as
   the near side (his Raiders report); the Madden rankings' ANCHOR name wears the shimmer again
   on the new delicate rose-gold chip, barely not white (the yellow frame retires); the team
   detail's "led by" names join the tier law. */''')

# ============ post-checks ============
checks = []
def chk(name, cond):
    checks.append((name, bool(cond)))
    assert cond, 'POST-CHECK FAILED: ' + name

chk('goldm token on 4 root blocks', s.count('--goldm:#') == 4)
chk('old deep-head sweep gone', s.count('var(--zshim,var(--gold3,#9a6b1f)) 18%') == 0)
chk('new lu-cell sweep in', 'var(--gold2,#e6c67d) 10%,var(--goldm,#ad7f2e) 22%' in s)
chk('lu-cell sweep comment carries w49', 'his Raiders report' in s)
chk('anchor tier classes in both branches', s.count('zpb-anchname ${best.ovr>=90?\'zpb-shm\':(best.ovr>=85?\'zpb-vib\':\'\')}"') == 2)
chk('anchor comment carries w49', s.count('the delicate rose-gold chip keeps it readable') == 2)
chk('old yellow chip gone', '#cfa96b' not in s and '#f4e6c3' not in s and '#4a3410' not in s)
chk('rose chip in', '.zpb-anch{border-color:#e2bfae !important;background:#f9ece4 !important;color:#6b4634 !important;}' in s)
chk('chip sweep fallback in', '.zpb-anch .zpb-shm{color:var(--gold3,#9a6b1f) !important' in s)
chk('chip sweep gradient in', '.zpb-anch .zpb-shm{background:linear-gradient(100deg,var(--gold3,#9a6b1f) 18%,var(--goldm,#ad7f2e) 38%' in s)
chk('chip sweep dark pair in', s.count('var(--goldm,#c39a4a) 38%') == 1)
chk('led-by tier law in', 'm.top[0][3]>=90 ? \'<b class="zpb-shm">\'' in s)
chk('sweep keyframes still one', s.count('@keyframes zpbshmsweep') == 1)
chk('sweep calls now four', s.count('zpbshmsweep 3.4s linear infinite') == 4)
chk('root gold law intact', ':root{--zshim:var(--gold3,#9a6b1f);}' in s)
chk('champion exception intact', '.champion-banner{--zshim:var(--zshimL,#c9a24b);}' in s)
chk('generic w45 sweep intact', 'linear-gradient(100deg,var(--zshim,var(--tA2,var(--gold3))),var(--gold2,#e6c67d) 40%,var(--zshim,var(--tA2,var(--gold3))) 70%)' in s)
chk('generic w45 fallback intact', s.count('.zpb-shm{color:var(--zshim,var(--tA2,var(--zrb,var(--gold3)))) !important') >= 1)
chk('cream bands still on the generic sweep', '#ffe9c6' in s and '#fff6e3' in s)
chk('dark chip plum intact', ':root[data-theme="dark"] .zpb-anch,:root:not([data-theme="light"]) .zpb-anch{border-color:#8a5f78' in s)
chk('chip ink rules intact', '.zpb-anch .zpb-anchname{color:inherit !important;}' in s)
chk('w49 ruling documented', 'w49 (Owner): the expansion' in s)
chk('w48 ruling still documented', 'w48 (Owner): the w47 glow retires' in s)
chk('glow stays dead', s.count('zpbshimglow') == 0)
chk('w47 js block untouched', '<script id="zpb-w47-js">' in s)
chk('w47 dime stack stands', "+ xrow([['DIME','DIME',-3]], 'def')" in s)
chk('dark halfway ink stands', 'txMd' in s)
chk('anchor leak chips intact', s.count('zpb-leak" title="The spot that gives most of it back"') == 1)

md5 = hashlib.md5(s.encode()).hexdigest()
open(DST, 'w', encoding='utf-8').write(s)
print('applied:', applied)
print('checks :', len(checks), 'all green')
print('w49 written:', DST, len(s), 'chars, md5', md5)
