#!/usr/bin/env python3
"""w69 chain step 3 — UI 3: the award/stat-champion winner cards' names ride the TIER LAW
(90+ shimmer / 85+ bold / rest the neutral ink) from the winner's own OVR; the AP1-gold
name overlay retires from the cards (the chips keep their laws; the coach's YOU keeps the
w66 shimmer; the w68 glow stays on the card). Input: step 2's md5."""
import hashlib

SRC = '/home/z/my-project/work/w69/Football-Sim-Z-post-blue-w69.html'
PREV_MD5 = '383981f855dc9dd4ed146976f84ce4e8'

raw = open(SRC, 'rb').read()
assert hashlib.md5(raw).hexdigest() == PREV_MD5, 'step-2 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# --- the REGULAR awards' card name (the live card renderer) ---
rep("""   + '<b class="zpb-gname '+((star||(window.__zpbAp1Gold&&window.__zpbAp1Gold.has(name)))?'zpb-shm':'')+'">'+name+'</b>' // w44 (O2, Owner): the first-team gold rides the award cards too""",
    """   + '<b class="zpb-gname '+((rec&&rec.ovr!=null)?(rec.ovr>=90?'zpb-shm':(rec.ovr>=85?'zpb-vib':'')):(star?'zpb-shm':''))+'">'+name+'</b>' // W69 (Owner, UI 3): the card name rides the TIER LAW from the winner's own OVR - 90+ shimmers, 85+ bold, the rest the neutral 0.50 ink; the AP1-gold overlay retires from the cards (the chips keep it; the coach's YOU keeps the w66 shimmer; the w68 glow stays on the card)""",
    'regular award card name tier')

# --- the PLAYOFF awards' card name (the live card renderer) ---
rep("""        return '<b class="zpb-gname zpb-awname '+((star||_ap1g.has(p.name))?'zpb-shm':'')+'">'+p.name+'</b>' // w44 (O2, Owner): an All-Pro first-team name is gold on the playoff awards too""",
    """        return '<b class="zpb-gname zpb-awname '+((_rec&&_rec.ovr!=null)?(_rec.ovr>=90?'zpb-shm':(_rec.ovr>=85?'zpb-vib':'')):(star?'zpb-shm':''))+'">'+p.name+'</b>' // W69 (Owner, UI 3): the tier law from the winner's own OVR - the AP1 overlay retires from the cards (the glow stays on the card)""",
    'playoff award card name tier')

# --- post-checks: the card-tier expressions are live, the old overlay is gone from the two aw() closures ---
assert src.count("rec.ovr>=90?'zpb-shm':(rec.ovr>=85?'zpb-vib'") == 1
assert src.count("_rec.ovr>=90?'zpb-shm':(_rec.ovr>=85?'zpb-vib'") == 1
open(SRC, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step3 done -> md5 {h} bytes {len(src.encode("utf-8"))}')
