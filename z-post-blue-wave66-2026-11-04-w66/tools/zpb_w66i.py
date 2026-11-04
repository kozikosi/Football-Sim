#!/usr/bin/env python3
"""w66 chain step 9 — P-232 refinements from the live audit:
   1) never a second kicker/punter before the last rounds (the specialist strandings started
      here — the w32 QB law, mirrored);
   2) the needs boost starts at round 19 so the remaining real slots fill while candidates remain;
   3) the last-resort legal-flex accepts only near-free conversions (≤2) — WR at TE or P at K
      stay out of the model lineups even in emergencies."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP8_MD5 = '46a279a760fb212639d5c6bcaa902ee9'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP8_MD5, 'step-8 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the specialist no-dup law (the w32 QB law, mirrored) ----
rep("  if(pos==='QB' && curRound<25 && (function(r){ for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]==='QB') return true; } return false; })(roster)) continue;",
    "  if(pos==='QB' && curRound<25 && (function(r){ for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]==='QB') return true; } return false; })(roster)) continue;\n"
    "  // w66 (P-232): the same law for the specialists — a second kicker/punter strands another team's, and the empties followed\n"
    "  if((pos==='K'||pos==='P') && curRound<30 && (function(r){ for(const k in r.slots){ const q=r.slots[k]; if(q && q[1]===pos) return true; } return false; })(roster)) continue;",
    'specialist no-dup', 1)

# ---- 2 · the needs boost starts at round 19 ----
rep("   if(curRound > 20) v += (curRound - 20) * 8; // w66 (P-232): the late brain fills its remaining real slots — a dreg tight end beats an empty TE1",
    "   if(curRound > 18) v += (curRound - 18) * 8; // w66 (P-232): the late brain fills its remaining real slots — a dreg tight end beats an empty TE1",
    'boost round 19', 1)

# ---- 3 · the last resort accepts only near-free conversions ----
rep("   for(const p of st.pool){\n    for(const s of open){\n     const pen = flexRule(p[1], s); if(pen == null) continue;\n     if(pen < fkey || (pen === fkey && fp && p[3] > fp[3])){ fkey = pen; fp = p; fs = s; }\n    }\n   }",
    "   for(const p of st.pool){\n    for(const s of open){\n     const pen = flexRule(p[1], s); if(pen == null || pen > 2) continue; // w66 (P-232): only near-free conversions — WR at TE or P at K stay out of the model even here\n     if(pen < fkey || (pen === fkey && fp && p[3] > fp[3])){ fkey = pen; fp = p; fs = s; }\n    }\n   }",
    'near-free last resort', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 9 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
