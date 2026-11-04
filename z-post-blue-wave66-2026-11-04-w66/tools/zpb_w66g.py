#!/usr/bin/env python3
"""w66 chain step 7 — the draft brain's honest roster-fill (P-232 companion):
when a team reaches its last open slots, the brain fills them IN-UNIT first (the best
remaining natural candidate, value be damned), then by cheapest legal flex, and only then
falls back to the old anyone-anywhere escape (whose cross-unit strays the optimizer then
benches — an honest empty, never an absurd starter)."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP6_MD5 = 'd23e6b7586a060b5de20cdc46dd1b1ae'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP6_MD5, 'step-6 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:90]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

rep(''' if(!best){ // nobody fits a natural or flex spot: take the best player left for any open spot
  const s = firstOpenSlotAny(roster); if(!s || !st.pool.length) return null;
  best = st.pool[0]; bestSlot = s;
 }
 return {player:best, slot:bestSlot};''',
    ''' if(!best){
  // w66 (P-232): the roster still has to finish REAL. First the best remaining IN-UNIT fill
  // for the emptiest need (a dreg tight end beats an empty TE1); then the cheapest legal
  // flex; only then the old anyone-anywhere escape — whose cross-unit stray the season's
  // optimizer benches, leaving an honest empty slot instead of an absurd starter.
  const open = ROSTER_SLOTS.filter(s=>!roster.slots[s]);
  if(open.length && st.pool.length){
   let bp = null, bs = null, bo = -1;
   for(const p of st.pool){
    const u = ZPB_AUTO_UNITS[p[1]]; if(!u) continue;
    for(const s of u){ if(roster.slots[s] || flexRule(p[1], s) == null) continue; if(p[3] > bo){ bo = p[3]; bp = p; bs = s; } }
   }
   if(bp) return {player:bp, slot:bs};
   let fp = null, fs = null, fkey = 1e9;
   for(const p of st.pool){
    for(const s of open){
     const pen = flexRule(p[1], s); if(pen == null) continue;
     if(pen < fkey || (pen === fkey && fp && p[3] > fp[3])){ fkey = pen; fp = p; fs = s; }
    }
   }
   if(fp) return {player:fp, slot:fs};
  }
  const s = firstOpenSlotAny(roster); if(!s || !st.pool.length) return null;
  best = st.pool[0]; bestSlot = s;
 }
 return {player:best, slot:bestSlot};''',
    'cpuPick honest fill', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 7 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
