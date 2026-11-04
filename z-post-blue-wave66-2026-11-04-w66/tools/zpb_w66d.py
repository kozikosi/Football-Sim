#!/usr/bin/env python3
"""w66 chain step 4 — P-232 (P0, Claude QA): the AUTO lineup is natural-first.
Stage one assigns every player to a slot his real NFL position plays; stage two fills a
slot that would otherwise sit empty with the best IN-UNIT flex. The FLEX table (REV 4)
stands untouched for the user's own moves. zpbFillAllLineups obeys the same discipline and
the flat -9 anyone-anywhere emergency retires (an honest empty slot beats a punter at K)."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP3_MD5 = 'abe5003928614435b9c05fb37bab21ce'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP3_MD5, 'step-3 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:80]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

OLD_OL = '''function optimalLineup(slotmap){
 const players = Object.values(slotmap).filter(Boolean), BIG = 1e6;
 if(!players.length) return Object.assign({}, slotmap);
 const cost = players.map(p=> ROSTER_SLOTS.map(sl=> eligibleSlotsFor(p).includes(sl) ? -slotWins(sl, effOvr(p, sl)) : BIG));
 const asg = hungarian(cost), out = {};
 for(let i=0;i<players.length;i++){ const j = asg[i]; if(j<0 || cost[i][j]>=BIG/2) return Object.assign({}, slotmap); out[ROSTER_SLOTS[j]] = players[i]; }
 return out;
}'''
NEW_OL = '''// w66 (P-232, Claude QA): the AUTO lineup's unit law. The Owner's FLEX table stays the
// legality+penalty law for the USER's own moves; the MODEL never crosses these units, so
// the model lineups read like real NFL depth charts — no OT at RB1, no P at K, no LB at
// DE, no DE at LB, no WR at TE, no RB at WR, no QB anywhere but QB.
const ZPB_AUTO_UNITS = {
 QB:['QB'], HB:['RB1','RB2','FB'], FB:['FB','RB1','RB2'], WR:['WR1','WR2','WR3','WR4'], TE:['TE1','TE2','TE3'],
 LT:['OT1','OT2','OG1','OG2','C'], RT:['OT1','OT2','OG1','OG2','C'], LG:['OG1','OG2','OT1','OT2','C'],
 RG:['OG1','OG2','OT1','OT2','C'], C:['C','OG1','OG2','OT1','OT2'],
 DT:['DT1','DT2','DL5'], REDG:['DE1','DE2','DL5'], LEDG:['DE1','DE2','DL5'],
 MIKE:['MIKE','WILL','SAM'], WILL:['WILL','MIKE','SAM'], SAM:['SAM','MIKE','WILL'],
 CB:['CB1','CB2','CB3','CB4'], SS:['SS','FS'], FS:['FS','SS'], K:['K'], P:['P']
};
function zpbAutoLegal(pos, slot){ const u = ZPB_AUTO_UNITS[pos]; return !!(u && u.includes(slot)) && flexRule(pos, slot) != null; }
// The assignment that maximizes wins — NATURAL-FIRST: stage one places every player at a
// slot his real NFL position plays; stage two fills a slot that would otherwise sit empty
// with the best in-unit flex (cheapest penalty, then the most effective wins).
function optimalLineup(slotmap){
 const players = Object.values(slotmap).filter(Boolean), BIG = 1e6;
 if(!players.length) return Object.assign({}, slotmap);
 const cost = players.map(p=> ROSTER_SLOTS.map(sl=> isNaturalSlot(p[1], sl) ? -slotWins(sl, effOvr(p, sl)) : BIG));
 const asg = hungarian(cost), out = {}, taken = new Set();
 for(let i=0;i<players.length;i++){ const j = asg[i]; if(j<0 || cost[i][j]>=BIG/2) continue; out[ROSTER_SLOTS[j]] = players[i]; taken.add(players[i]); }
 ROSTER_SLOTS.forEach(sl=>{
  if(out[sl]) return;
  let best = null, bestKey = -Infinity;
  players.forEach(p=>{
   if(taken.has(p)) return;
   if(!zpbAutoLegal(p[1], sl)) return;
   const key = slotWins(sl, effOvr(p, sl)) - (isNaturalSlot(p[1], sl) ? 0 : flexPenaltyFor(p[1], sl) * 0.001);
   if(key > bestKey){ bestKey = key; best = p; }
  });
  if(best){ out[sl] = best; taken.add(best); }
 });
 return out;
}'''
rep(OLD_OL, NEW_OL, 'natural-first optimalLineup', 1)

OLD_FILL = '''   let best = null, bestO = -1e9;
   (draftSim.pool||[]).forEach(p=>{
    if(used.has(p[0])) return;
    if(flexRule(p[1], s) == null) return; // w65 (P-232): the auto-fill obeys the flex table — no flat -9 into any spot
    const fit = p[3] - flexPenaltyFor(p[1], s);
    if(fit > bestO){ bestO = fit; best = p; }
   });
   if(!best){ // the w38 last-spot emergency: nobody legal remains, so anyone may take it, honestly penalized
    (draftSim.pool||[]).forEach(p=>{
     if(used.has(p[0])) return;
     const fit = p[3] - 9;
     if(fit > bestO){ bestO = fit; best = p; }
    });
   }
   if(best){ sm[s] = [best[0], best[1], best[2], best[3]]; used.add(best[0]); }'''
NEW_FILL = '''   let best = null, bestO = -1e9;
   (draftSim.pool||[]).forEach(p=>{
    if(used.has(p[0])) return;
    if(!zpbAutoLegal(p[1], s)) return; // w66 (P-232): the auto-fill obeys the unit law — in-unit only, never a cross-unit stretch
    const fit = p[3] - flexPenaltyFor(p[1], s);
    if(fit > bestO){ bestO = fit; best = p; }
   });
   // w66 (P-232): the w38 flat -9 "anyone anywhere" emergency retires — every unit has
   // natural players in the pool, and an honest gap reads better than a punter at kicker.
   if(best){ sm[s] = [best[0], best[1], best[2], best[3]]; used.add(best[0]); }'''
rep(OLD_FILL, NEW_FILL, 'in-unit auto-fill', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 4 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
