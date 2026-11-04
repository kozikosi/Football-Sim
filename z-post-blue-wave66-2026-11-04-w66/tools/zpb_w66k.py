#!/usr/bin/env python3
"""w66 chain step 11 — the draft brain pairs specialists strictly (a kicker kicks, a punter
punts — the K->P free flex belongs to the lineup editor, not the draft): with 32 kickers and
32 punters for 32 teams, strict pairing means every team gets its own."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP10_MD5 = 'c8bf09f64fcc05d7f5d86ba5f83c1107'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP10_MD5, 'step-10 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep("   if(!zpbAutoLegal(pos, s)) continue; // w66 (P-232): the brain never VALUES a cross-unit placement — the absurd lineups started here",
    "   if(!zpbAutoLegal(pos, s)) continue; // w66 (P-232): the brain never VALUES a cross-unit placement — the absurd lineups started here\n   if((pos==='K'||pos==='P') && s!==pos) continue; // w66 (P-232): the brain pairs specialists strictly — 32 kickers and 32 punters for 32 teams only distributes if nobody borrows",
    'strict specialist pairing', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 11 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
