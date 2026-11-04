#!/usr/bin/env python3
"""w66 chain step 8 — the pregame marquee starts under the REAL header line (the header
wraps to two rows at mid widths — 90px, not the 67px guess), and the late draft brain
fills its remaining real slots (a dreg tight end beats an empty TE1)."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP7_MD5 = '5ed5c6a8bdce6576efac7d72ca7063ea'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP7_MD5, 'step-7 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · the marquee's top = the header's real height, measured at mount ----
rep("   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';",
    "   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';\n"
    "   try{ const _hd = box.querySelector('.zpb-rep-hd'); if(_hd) intro.style.top = _hd.offsetHeight + 'px'; }catch(err){} // W66 (Owner): the header wraps to two rows at mid widths (90px, not 67) — the marquee always starts under the REAL line",
    'intro measured top', 1)

# ---- 2 · the late brain fills its remaining real slots ----
rep("   const w = t[i]*(1-f)+t[i+1]*f - slotWins(s, rl);\n   const v = w*cpuBias(teamIndex, g)*nz + 0.002*p[3];\n   cands.push({p, s, v});",
    "   const w = t[i]*(1-f)+t[i+1]*f - slotWins(s, rl);\n   let v = w*cpuBias(teamIndex, g)*nz + 0.002*p[3];\n   if(curRound > 20) v += (curRound - 20) * 8; // w66 (P-232): the late brain fills its remaining real slots — a dreg tight end beats an empty TE1\n   cands.push({p, s, v});",
    'late needs boost', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 8 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
