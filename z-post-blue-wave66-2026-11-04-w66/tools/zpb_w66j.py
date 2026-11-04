#!/usr/bin/env python3
"""w66 chain step 10 — the brain reads its NEEDS: a team with zero players at a position
pays an escalating premium for the first one (rounds 15+), and nobody hoards a third tight
end before round 28. Together these keep the pool's specialists and tight ends distributed
so every real starter slot fills naturally."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP9_MD5 = 'f95b94c4ca70e54ad70a608761755a99'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP9_MD5, 'step-9 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep("  const pos = p[1], c = POS_SLOT_MAP[pos]; if(!c) continue;",
    "  const pos = p[1], c = POS_SLOT_MAP[pos]; if(!c) continue;\n  const hasPos = curRound > 14 && (function(r){ for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]===pos) return true; } return false; })(roster); // w66 (P-232): does the team own ANY player of this position yet?",
    'hasPos probe', 1)

rep("   if(curRound > 18) v += (curRound - 18) * 8; // w66 (P-232): the late brain fills its remaining real slots — a dreg tight end beats an empty TE1",
    "   if(curRound > 18) v += (curRound - 18) * 8; // w66 (P-232): the late brain fills its remaining real slots — a dreg tight end beats an empty TE1\n   if(hasPos === false) v += (curRound - 14) * 14; // w66 (P-232): zero players at this position is a real need — the premium grows every round",
    'need premium', 1)

rep("  if((pos==='K'||pos==='P') && curRound<30 && (function(r){ for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]===pos) return true; } return false; })(roster)) continue;",
    "  if((pos==='K'||pos==='P') && curRound<30 && (function(r){ for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]===pos) return true; } return false; })(roster)) continue;\n"
    "  if(pos==='TE' && curRound<28 && (function(r){ let n=0; for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]==='TE') n++; } return n>=2; })(roster)) continue; // w66 (P-232): no third tight end before the last rounds — hoarding starves the teams still waiting",
    'te hoard cap', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 10 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
