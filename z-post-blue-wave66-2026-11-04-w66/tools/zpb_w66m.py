#!/usr/bin/env python3
"""w66 chain step 13 — N3: the draft-review card cascade obeys the Owner's timing law —
one card at a time, ZERO gap (the .3s card animation ends exactly as the next begins),
and the field map + depth zones ride the CARDS' clock (the cards are the master clock,
the visualization follows). N4: the "(change who plays where at any time)" sentence is
removed at its single source."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP12_MD5 = 'b6f9ac56d4e8b5b2bcb563e1e726ee43'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP12_MD5, 'step-12 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- N3a · the CARDS are the master clock: zero gap = beat interval == card duration (.3s) ----
rep(".zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.12s);} /* w46 (O4, Owner): the panels ride the map's beat · w65 (Owner): the review cards join the faster beat */",
    ".zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.3s);} /* w66 (Owner): ONE card at a time at ZERO gap — the beat equals the card's own .3s entrance, so card N+1 starts the exact moment card N finishes; the cards are the master clock */",
    'cards zero-gap law', 1)

# ---- N3b · the depth zones ride the same clock ----
rep(".zpb-dz.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.12s);} /* w65 (Owner): at least half a second faster — this is the rule that paints the depth chart */",
    ".zpb-dz.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.3s);} /* w66 (Owner): the depth rows ride the cards' 0.3s zero-gap clock — row N lands with card N */",
    'depth zones clock', 1)

# ---- N3c · the map (the visualization) syncs TO the cards ----
rep(".zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*1s);} /* w44 (O8, Owner): half a second per player · w46 (O4, Owner): a half second slower · one second per beat */",
    ".zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.3s);} /* w66 (Owner): the map syncs TO the cards, never the other way around — a player's marker starts the exact moment his card does, on the cards' 0.3s clock (mobile and desktop share the beat) */",
    'map syncs to cards', 1)

# ---- N3d · the base .zpb-dfc2 clock (roster rows, honor panels) joins the same law ----
rep(".zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.12s);} /* w65 (Owner): at least half a second faster again — the beat is 0.12s, so row N lands 0.23·N + 0.1s sooner than w64 */",
    ".zpb-dfc2{opacity:0;animation:zpbCardIn .3s ease both;animation-delay:calc(var(--dfc-base,0s) + var(--beat,0)*0.3s);} /* w66 (Owner): one clock everywhere — the 0.3s zero-gap beat; row N lands 0.3·N, each row exactly when the previous one settles */",
    'base clock law', 1)

# ---- N4 · the "(change who plays where at any time)" sentence retires at its single source ----
rep("LINEUP AND FLEXES <span class=\"narr\" style=\"font-weight:400;\">(change who plays where at any time)</span></summary>",
    "LINEUP AND FLEXES</summary> <!-- w66 (Owner): the aside sentence is gone -->",
    'aside sentence removed', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 13 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
