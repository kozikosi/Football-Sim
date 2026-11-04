#!/usr/bin/env python3
"""w67 chain step 4 — Owner UI 5 + 7.
UI 5: ONE reveal clock at the season-in-badges pace (0.6s per beat): the player cards, the
field-map markers and the depth rows all ride beat*0.6s with a .55s entrance (the w66 0.3s
card clock and the 1s map fallback retire).
UI 7: the pregame stage ends at the footer - the intro's bottom inset is measured to the
footer's height at mount, so no star pair crosses the skip button or its hairline.
Asserts the previous step's md5."""
import hashlib

SRC = '/home/z/my-project/work/w67/Football-Sim-Z-post-blue-w67.html'
PREV_MD5 = '3aa8f2cb09f22397960b4efae9d2592a'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'previous step md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · UI 5 — the clocks (delay substrings first, they disambiguate the surfaces) ----
rep('animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.3s);',
    'animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.6s);',
    'base card clock 0.3 -> 0.6')

rep('animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*1s);',
    'animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.6s);',
    'map fallback clock 1s -> 0.6')

rep('animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.3s);',
    'animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.6s);',
    'cine clocks (map/dbk/dz) 0.3 -> 0.6', 3)

rep('animation:zpbCardIn .3s ease both;',
    'animation:zpbCardIn .55s ease both;',
    'card entrances .3 -> .55 (dbk + dz)', 2)

# ---- 2 · UI 7 — the pregame stage ends at the footer ----
rep("   try{ const _hd = box.querySelector('.zpb-rep-hd'); if(_hd) intro.style.top = _hd.offsetHeight + 'px'; }catch(err){} // W66 (Owner): the header wraps to two rows at mid widths (90px, not 67) — the marquee always starts under the REAL line",
    """   try{ const _hd = box.querySelector('.zpb-rep-hd'); if(_hd) intro.style.top = _hd.offsetHeight + 'px'; }catch(err){} // W66 (Owner): the header wraps to two rows at mid widths (90px, not 67) — the marquee always starts under the REAL line
   try{ const _ft = box.querySelector('.zpb-rep-ft'); if(_ft) intro.style.bottom = _ft.offsetHeight + 'px'; }catch(err){} // W67 (Owner): the stage ends at the footer — the third star pair can never ride over the skip button or its hairline, at any window size""",
    'intro bottom clamp')

open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step4 done -> {SRC} md5 {h} bytes {len(src.encode("utf-8"))}')
