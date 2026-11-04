#!/usr/bin/env python3
"""w66 chain step 21 — the audit caught the DT->TE path twice: cpuPick's anyone-anywhere
escape (firstOpenSlotAny) still fires for the USER team during sim-to-end, and the user's
lineup is never re-optimized, so the stray stays. The escape retires entirely: a pick with
no legal landing passes, and the slot sits honestly empty."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP20_MD5 = 'b253982d680f7c94266647790f57c66d'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP20_MD5, 'step-20 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep("""  if(fp) return {player:fp, slot:fs};
  }
  const s = firstOpenSlotAny(roster); if(!s || !st.pool.length) return null;
  best = st.pool[0]; bestSlot = s;
 }
 return {player:best, slot:bestSlot};""",
    """  if(fp) return {player:fp, slot:fs};
  }
  // w66 (P-232, the audit caught it twice): the anyone-anywhere escape is GONE. It put a DT
  // at TE2 on the user's own board — the season's optimizer benches the CPU teams' strays,
  // but the user's lineup is never re-optimized, so the stray stayed. A pick with no legal
  // landing now PASSES (the caller pos++s) and the slot sits honestly empty — the census law
  // beats the absurd starter, for every team including the user's.
 }
 return {player:best, slot:bestSlot};""",
    'anyone-anywhere escape retired', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 21 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
