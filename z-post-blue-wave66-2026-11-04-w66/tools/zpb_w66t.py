#!/usr/bin/env python3
"""w66 chain step 20 — the audit caught the last DT->TE3 path: slotForUser's stuck-pick
escape (firstOpenSlotAny) could drop an unplaceable late pick into a skill slot. The
escape now avoids the skill/specialist families entirely (they wait for real supply or
sit honestly empty), and the model's near-free loop refuses them too (guard in depth)."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP19_MD5 = '6e8cdbcf5a79c5ace0bf4d2c151526e8'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP19_MD5, 'step-19 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep(""" if(!draftSim.pool.some(x=>findAssignableSlot(roster,x[1]))) return firstOpenSlotAny(roster);
 return null;
}""",
    """ if(!draftSim.pool.some(x=>findAssignableSlot(roster,x[1]))){
  const SKILL = /^(QB|RB1|RB2|WR1|WR2|WR3|WR4|TE1|TE2|TE3|FB|K|P)$/; // w66 (P-232, the audit caught it): a stuck late pick never lands in a skill or specialist slot — the census law holds even in the escape (the slot waits for real supply or sits honestly empty)
  const s2 = ROSTER_SLOTS.find(sl=>!roster.slots[sl] && !SKILL.test(sl));
  return s2 || firstOpenSlotAny(roster);
 }
 return null;
}""",
    'stuck-pick escape law', 1)

rep("""     const pen = flexRule(p[1], s); if(pen == null || pen > 2) continue; // w66 (P-232): only near-free conversions — WR at TE or P at K stay out of the model even here""",
    """     const pen = flexRule(p[1], s); if(pen == null || pen > 2) continue; // w66 (P-232): only near-free conversions — WR at TE or P at K stay out of the model even here
     if(/^(TE[123]|WR[1234]|FB|K|P)$/.test(s)) continue; // w66 (P-232, guard in depth): the skill and specialist slots never take a converted body in the model""",
    'near-free skill guard', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 20 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
