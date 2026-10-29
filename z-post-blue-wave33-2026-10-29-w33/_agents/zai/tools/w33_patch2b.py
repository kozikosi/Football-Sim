#!/usr/bin/env python3
# w33_patch2b.py — wave 33 stage 2b: re-lands the draft entries that were lost when the
# ON-map entry was rebuilt (the roster-slot edits survived; these were cut):
# the depth slots play, the GONE column reads the player, the CPU reach stays honest,
# the board decimals, and the chip flex purge.
import sys

SRC = '/home/z/my-project/scripts/w33_stage6.html'
DST = '/home/z/my-project/scripts/w33_stage7.html'

E = []
def add(old, new, n=1):
    E.append((old, new, n))

add(
""" const qb=get('QB'), rb1=get('RB1'), rb2=get('RB2'), wr1=get('WR1'), wr2=get('WR2'), wr3=get('WR3'), te=get('TE1'), te2=get('TE2'), k=get('K');""",
""" const qb=get('QB'), rb1=get('RB1'), rb2=get('RB2'), wr1=get('WR1'), wr2=get('WR2'), wr3=get('WR3'), wr4=get('WR4'), te=get('TE1'), te2=get('TE2'), te3=get('TE3'), k=get('K');""")

add(
"""const catchers = [
  mk(wr1,'WR1',share('WR1')), mk(wr2,'WR2',rotShare('WR2',wr2,null)), mk(wr3,'WR3',rotShare('WR3',wr3,null)),
  mk(te,'TE1',share('TE1')), mk(te2,'TE2',rotShare('TE2',te2,wr3)),
  mk(rb1,'RB1',1.0), mk(rb2,'RB2',rotShare('RB2',rb2,rb1))
 ].filter(Boolean);""",
"""const catchers = [
  mk(wr1,'WR1',share('WR1')), mk(wr2,'WR2',rotShare('WR2',wr2,null)), mk(wr3,'WR3',rotShare('WR3',wr3,null)),
  mk(wr4,'WR4',rotShare('WR4',wr4,wr3)), mk(te,'TE1',share('TE1')), mk(te2,'TE2',rotShare('TE2',te2,wr3)), mk(te3,'TE3',rotShare('TE3',te3,te2)),
  mk(rb1,'RB1',1.0), mk(rb2,'RB2',rotShare('RB2',rb2,rb1))
 ].filter(Boolean);""")

add(
" const tackleBase = {MIKE:6.5,WILL:5.8,SAM:4,SS:5.2,FS:4.4,CB1:3.6,CB2:3.2,CB3:2.4,DE1:3.2,DE2:2.8,DT1:2.6,DT2:2.2};",
" const tackleBase = {MIKE:6.5,WILL:5.8,SAM:4,SS:5.2,FS:4.4,CB1:3.6,CB2:3.2,CB3:2.4,DE1:3.2,DE2:2.8,DT1:2.6,DT2:2.2,DL5:1.7}; // w33 (Owner): the fifth lineman plays and produces"
)

add(
" const tflBase = {DE1:0.63,DE2:0.5,DT1:0.47,DT2:0.34,MIKE:0.6,WILL:0.47,SAM:0.3,SS:0.21,FS:0.09,CB1:0.09,CB2:0.09,CB3:0.04};",
" const tflBase = {DE1:0.63,DE2:0.5,DT1:0.47,DT2:0.34,DL5:0.3,MIKE:0.6,WILL:0.47,SAM:0.3,SS:0.21,FS:0.09,CB1:0.09,CB2:0.09,CB3:0.04};"
)

add(
" const hurBase = {DE1:2.4,DE2:2.0,DT1:1.4,DT2:1.0,MIKE:0.7,WILL:0.8,SAM:0.5};",
" const hurBase = {DE1:2.4,DE2:2.0,DT1:1.4,DT2:1.0,DL5:0.8,MIKE:0.7,WILL:0.8,SAM:0.5};"
)

add(
"if(po.pers==='13') why.push(`the roster has no third tight end, so the model plugs in a generic 70 for 13 personnel`);",
"if(po.pers==='13' && !sm['TE3']) why.push(`the roster has no third tight end, so the model plugs in a generic 70 for 13 personnel`); // w33 (Owner): TE3 is drafted now, so the note only fires when the slot is truly empty"
)

add(
"""function simRecs(){
 const S = draftSim;
 if(draftUI.sim && draftUI.sim.pos===S.pos) return draftUI.sim;
 const me = S.userIndex, roster = S.rosters[me];
 const fm = new Map(); S.pool.forEach(p=> fm.set(p[0], userFits(roster, p)));
 const c0 = {}; fm.forEach(fs=> fs.forEach(e=>{ const k = vKey(e.g,e.v); c0[k] = (c0[k]||0)+1; }));""",
"""function simRecs(){
 const S = draftSim;
 if(draftUI.sim && draftUI.sim.pos===S.pos) return draftUI.sim;
 const me = S.userIndex, roster = S.rosters[me];
 const fm = new Map(); S.pool.forEach(p=> fm.set(p[0], userFits(roster, p)));
 const c0 = {}; fm.forEach(fs=> fs.forEach(e=>{ const k = vKey(e.g,e.v); c0[k] = (c0[k]||0)+1; }));
 const tk = {}; // w33 (R3): how many trials took each player, by name""")

add(
"""   for(let i=S.pos+1;i<nextIdx;i++){
    const ti = S.order[i], pk = cpuPick(ti, sim);
    if(pk && pk.slot){ const ix = sim.pool.indexOf(pk.player); if(ix>-1) sim.pool.splice(ix,1); sim.rosters[ti].slots[pk.slot] = pk.player; }
   }""",
"""   for(let i=S.pos+1;i<nextIdx;i++){
    const ti = S.order[i], pk = cpuPick(ti, sim);
    if(pk && pk.slot){ const ix = sim.pool.indexOf(pk.player); if(ix>-1) sim.pool.splice(ix,1); sim.rosters[ti].slots[pk.slot] = pk.player; if(pk.player) tk[pk.player[0]] = (tk[pk.player[0]]||0)+1; } // w33 (R3): the player himself is marked gone
   }""")

add(
""" return (draftUI.sim = {pos:S.pos, trials, c0, fm, later, gap: nextIdx>0 ? nextIdx-S.pos-1 : 0});
}
function goneFrac(sim, e){
 if(!sim.trials.length) return null;
 const k = vKey(e.g,e.v), c0 = sim.c0[k]||1;
 return Math.max(0, 1 - sim.trials.reduce((a,t)=>a+Math.min(1,(t.cnt[k]||0)/c0),0)/sim.trials.length);
}""",
""" return (draftUI.sim = {pos:S.pos, trials, c0, fm, later, tk, N:Math.max(1,trials.length), gap: nextIdx>0 ? nextIdx-S.pos-1 : 0});
}
function goneFrac(sim, p){
 // w33 (R3, Owner): gone reads the player himself \u2014 the share of replays in which a team took HIM
 // before your next pick. The old value-bucket math made 70-71 receivers read as hotter commodities
 // than 74-75 receivers still on the board, because players of different positions and quality
 // collided on identical fit-values late in the draft.
 if(!sim || !sim.trials || !sim.trials.length || !p) return null;
 return Math.min(1, (sim.tk[p[0]]||0)/sim.N);
}""")

add(
""" return {p, w, slot:e.slot, g:e.g, flex:e.flex, pen:e.pen, v:e.v, later, pri, gone: sim ? goneFrac(sim, e) : null, score: pri>0 ? pri*m : pri/m};""",
""" return {p, w, slot:e.slot, g:e.g, flex:e.flex, pen:e.pen, v:e.v, later, pri, gone: sim ? goneFrac(sim, p) : null, score: pri>0 ? pri*m : pri/m};""")

add(
""" if(cands.length>8 && Math.random() < cpuMiss(teamIndex)){
  cands.sort((a,b)=>b.v-a.v);
  const reach = 3 + Math.min(9, Math.floor(Math.abs(randNormal())*4));
  const c = cands[Math.min(reach, cands.length-1)];
  if(c.p[3] >= (curRound===1 ? 88 : curRound<=3 ? topAvail-9 : 0)){ best = c.p; bestSlot = c.s; }
 }""",
""" if(cands.length>8 && Math.random() < cpuMiss(teamIndex)){
  cands.sort((a,b)=>b.v-a.v);
  const reach = 3 + Math.min(9, Math.floor(Math.abs(randNormal())*4));
  // w33 (R3, Owner): a reach is a few SPOTS on the board, never twelve value-rows down \u2014
  // the miss may land on anyone within four rating points of the team's top candidate, and nobody below him
  const near = cands.filter(c=>c.p[3] >= cands[0].p[3]-4);
  const c = near[Math.min(reach, near.length-1)];
  if(c.p[3] >= (curRound===1 ? 88 : curRound<=3 ? topAvail-9 : 0)){ best = c.p; bestSlot = c.s; }
 }""")

add(
"""function fmtWar(w){ return (w>=0?'+':'\\u2212') + Math.round(Math.abs(w)); } // w32 (Owner): wins are integers on the screen""",
"""function fmtWar(w){ return (w>=0?'+':'\\u2212') + Math.round(Math.abs(w)); } // w32 (Owner): wins are integers on the screen
function fmtWar1(w){ return (w==null || w!==w) ? '\\u2014' : (w>=0?'+':'\\u2212') + Math.abs(w).toFixed(1); } // w33 (R14, Owner): the draft-board WINS and PRIORITY columns carry one decimal""")

add(
"""<td class="score dc-wins" data-label="Wins">${wavg(r.w)}</td><td class="score dc-pri" data-label="Priority">${r.pri!=null&&sim?fmtWar(r.pri):'—'}</td>""",
"""<td class="score dc-wins" data-label="Wins">${r.w!=null?fmtWar1(r.w):wavg(r.w)}</td><td class="score dc-pri" data-label="Priority">${r.pri!=null&&sim?fmtWar1(r.pri):'—'}</td>""")

add(
"""<div class="zpb-pickcol"><div class="score" title="Wins at this spot on your roster (flex penalty included)">${wavg(r.v)}</div>${btn(r)}</div></div>`;""",
"""<div class="zpb-pickcol"><div class="score" title="Wins at this spot on your roster (flex penalty included)">${r.v!=null?fmtWar1(r.v):wavg(r.v)}</div>${btn(r)}</div></div>`;""")

add(
"""<div class="narr" style="margin-top:2px;">${r.p[0]} (${r.p[3]}) · ${fmtWar(r.v)} wins · ${pctTxt(r.gone)} gone<span class="zpb-nxpick"> by your next pick</span></div>""",
"""<div class="narr" style="margin-top:2px;">${r.p[0]} (${r.p[3]}) · ${fmtWar1(r.v)} wins · ${pctTxt(r.gone)} gone<span class="zpb-nxpick"> by your next pick</span></div>""")

add(
"""  entries.forEach(r=>{
   if(!matchesSearch(r.p)) return;
   if(draftUI.teamFilter && r.p[2]!==draftUI.teamFilter) return;
   if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : !sel.has(r.g)) return;""",
"""  entries.forEach(r=>{
   if(!matchesSearch(r.p)) return;
   if(draftUI.teamFilter && r.p[2]!==draftUI.teamFilter) return;
   if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : (!sel.has(r.g) || !sel.has(WV_TAG_GROUP[r.p[1]]))) return; // w33 (R15, Owner): unhighlight a position and those players leave the board, even where they could flex""")

add(
"""   let list = entries.filter(r=>r.g===g && matchesSearch(r.p) && (posF==='all' || WV_TAG_GROUP[r.p[1]]===posF) && (!draftUI.teamFilter || r.p[2]===draftUI.teamFilter));""",
"""   let list = entries.filter(r=>r.g===g && matchesSearch(r.p) && (posF==='all' || WV_TAG_GROUP[r.p[1]]===posF) && (!draftUI.teamFilter || r.p[2]===draftUI.teamFilter) && (posF!=='all' || sel.has(WV_TAG_GROUP[r.p[1]]))); // w33 (R15): the chip law holds on the cards too""")

def main():
    src = open(SRC, encoding='utf-8').read()
    for i, (old, new, n) in enumerate(E):
        c = src.count(old)
        if c != n:
            print(f'FAIL entry {i}: expected {n} match(es), found {c}')
            print('--- snippet head ---')
            print(old[:240])
            sys.exit(1)
        src = src.replace(old, new)
    open(DST, 'w', encoding='utf-8').write(src)
    print('w33_patch2b OK ->', DST, len(src), 'bytes')

if __name__ == '__main__':
    main()
