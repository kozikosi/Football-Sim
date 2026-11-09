// slotWins20 local-slope measurement harness (lane-only prototype; does NOT touch the product file)
// Reproduces the engine's pure math (slotWinsTable / slotWins / slotWinsPerOvr) from
// Football-Sim-PreColors.html and measures the MUSE P-321 proposal:
//
//   per-position, pool-grounded center (mean OVR of that position in data/madden27-ratings.csv)
//   local slope at center +/- h, everything else held at position-specific averages
//
// Spreads tested: h = 3, 5, 7 (the question) and h = 10 (non-linearity check vs +/-5).
// OLD = the engine's slotWinsPerOvr(): (slotWins(s,90) - slotWins(s,70)) / 20, everything else at 80.
//
// Deterministic: matchupModel/teamRatings/slotWinsTable contain no Math.random; base lineups are
// plain {ovr} objects so retScore() short-circuits to 82 and no RNG is touched.

import fs from 'fs';

const CSV = 'data/madden27-ratings.csv';
// name,pos,team,ovr,spd,str  (names carry no commas in this export)
function parseCsv(text){
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split(',');
  return lines.slice(1).filter(l=>l.trim()).map(l=>{
    const f = l.split(',');
    const row = {}; header.forEach((k,i)=>{ row[k] = f[i]; });
    row.ovr = Number(row.ovr); row.spd = Number(row.spd); row.str = Number(row.str);
    return row;
  });
}
const POOL = parseCsv(fs.readFileSync(CSV, 'utf8'));

// ---------------- engine constants (faithful copy, PreColors.html) ----------------
const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K'];
const WV_OFF_SLOTS = new Set(['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C','K']);
const POINTS_PER_WIN = 32.5;
const NEUTRAL_OFF = {pers:'11', strat:'neutral'};
const DEFAULT_DEF = {pkg:'nickel', focus:'neutral'};
const PERS = {
  '11': {run:0.00, runB:0.000, passB:0.000, heavy:0.0, tbw:0.00, pc:0.0},
  '12': {run:0.03, runB:0.030, passB:-0.015, heavy:0.5, tbw:0.08, pc:0.22},
  '13': {run:0.06, runB:0.055, passB:-0.035, heavy:1.0, tbw:0.14, pc:0.42},
  '21': {run:0.05, runB:0.040, passB:-0.030, heavy:0.6, tbw:0.03, pc:0.38},
  '22': {run:0.08, runB:0.070, passB:-0.045, heavy:1.0, tbw:0.10, pc:0.48}
};
const STRAT = { run:{s:0.08}, neutral:{s:0}, pass:{s:-0.08} };
const DEF_PKG = { base:{label:'Base'}, nickel:{label:'Nickel'} };
const DEF_FOCUS = { run:{f:1}, neutral:{f:0}, pass:{f:-1} };
const PERS_REC = {
  '12': {WR1:1.5, WR2:1.0, TE1:0.9, TE2:0.6, RB1:0.2},
  '13': {WR1:1.5, TE1:0.9, TE2:0.6, TE3:0.5, RB1:0.2},
  '21': {WR1:1.5, WR2:1.0, TE1:0.9, RB1:0.2, RB2:0.5},
  '22': {WR1:1.5, TE1:0.9, TE2:0.6, RB1:0.2, RB2:0.5}
};
const DEF_SPECS = {
  frontBase: {DT1:1.5, DT2:1.2, DE1:1.0, DE2:1.0, MIKE:1.2, WILL:1.0, SAM:1.0, SS:0.4, CB1:0.7, CB2:0.55, CB3:0.1, FS:0.5},
  frontNick: {DT1:1.5, DT2:1.2, DE1:1.0, DE2:1.0, MIKE:1.2, WILL:1.0, SAM:0.1, SS:0.6, CB1:0.7, CB2:0.55, CB3:0.2, FS:0.5},
  covBase:   {CB1:1.4, CB2:1.15, CB3:0.25, SS:0.8, FS:0.8, MIKE:0.4, WILL:0.4, SAM:0.4},
  covNick:   {CB1:1.4, CB2:1.15, CB3:1.0, SS:0.8, FS:0.8, MIKE:0.4, WILL:0.4, SAM:0.05}
};
const RATING_SPECS = {
  olRun:    {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6},
  olPass:   {OT1:1.4, OT2:1.4, OG1:1.0, OG2:1.0, C:1.0},
  rb:       {RB1:2.0, RB2:0.5},
  qb:       {QB:1},
  rec:      {WR1:1.5, WR2:1.0, WR3:0.7, TE1:0.9, RB1:0.2},
  passRush: {DE1:2.0, DE2:1.6, DT1:1.0, DT2:0.8, MIKE:0.3, WILL:0.3},
  frontRun: {DT1:1.5, DT2:1.2, DE1:1.0, DE2:1.0, MIKE:1.2, WILL:1.0, SAM:0.7, SS:0.4, CB1:0.7, CB2:0.55, CB3:0.2, FS:0.5},
  coverage: {CB1:1.4, CB2:1.15, CB3:0.9, SS:0.8, FS:0.8, MIKE:0.4, WILL:0.4, SAM:0.3},
  kicker:   {K:1}
};
const PLAN_K = { kRun:1.4, kPass:0.85, kTo:1.0, kSack:0.9, rAmp:3.0, pAmp:2.5, vm:1.3, kBlock:1, predict:0.38, defPredict:0.40, baseRunPct:0.39, nickRun:0.05, baseRunVsHeavy:-0.025, basePass:0.03, defFront:2.0, defCov:1.5, defRush:0.6, pkgFront:0.8, pkgCov:0.8 };
const RUSH_BASE = 105, PASS_BASE = 220;
const PT_RUSH = 0.040, PT_PASS = 0.070, PT_TO = 3.0, PT_SACK = 0.8, LAM_TO = 1.2, LAM_SACK = 2.2;
const BASE_PTS = 21.5, HOME_FIELD = 1.7;
const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.0283, lean:0.013, toQb:0.0172, toCov:0.0204, toRush:0.0105, skRush:0.0268, skOl:0.0336, skCov:0.0120, kick:0.069 };
const RET_PTS = 2.36;
const RETURN_SLOTS = ['RB1','RB2','WR1','WR2','WR3','TE1','TE2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS'];

const OFF_OPTS = [], DEF_OPTS = [];
['11','12','13','21','22'].forEach(p=>['run','neutral','pass'].forEach(s=>OFF_OPTS.push({pers:p, strat:s})));
['base','nickel'].forEach(k=>['run','neutral','pass'].forEach(f=>DEF_OPTS.push({pkg:k, focus:f})));

// ---------------- engine pure math ----------------
function clampNum(v,lo,hi){ return Math.max(lo, Math.min(hi, v)); }
function softCap(x, lo, hi){
  const cap = x>=0 ? hi : -lo, k = 0.6*cap, a = Math.abs(x);
  if(a<=k) return x;
  const v = k + (cap-k)*Math.tanh((a-k)/(cap-k));
  return x>=0 ? v : -v;
}
function normCdf(z){ const t=1/(1+0.2316419*Math.abs(z)), d=0.3989423*Math.exp(-z*z/2); const p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274)))); return z>0?1-p:p; }
function offShift(po){ return PERS[po.pers].run + STRAT[po.strat].s; }
function applyOffPlan(O, po){
  const p = po.pers, out = Object.assign({}, O);
  if(PERS_REC[p]) out.rec = O['rec'+p];
  if(p==='21' || p==='22') out.rb = O.rbHeavy;
  const blk = p==='13' ? (O.te2+70)/2 : (p==='12'||p==='22') ? (O.te1+O.te2)/2 : O.te1;
  out.olRun = O.olRun + PERS[p].tbw*(blk-75)*PLAN_K.kBlock;
  return out;
}
function applyDefPlan(D, pd, isLeague){
  const f = DEF_FOCUS[pd.focus].f, nick = pd.pkg==='nickel', out = Object.assign({}, D);
  out.frontRun = (nick?D.frontNick:D.frontBase) + (isLeague?0:((nick?-PLAN_K.pkgFront:PLAN_K.pkgFront) + PLAN_K.defFront*f));
  out.coverage = (nick?D.covNick:D.covBase)     + (isLeague?0:((nick?PLAN_K.pkgCov:-PLAN_K.pkgCov) - PLAN_K.defCov*f));
  out.passRush = D.passRush - (isLeague?0:PLAN_K.defRush*f);
  return out;
}
function slotOvr(slotmap, s){ const raw = slotmap[s]; if(!raw) return 70; return Array.isArray(raw) ? effOvr(raw, s) : raw.ovr; }
// effOvr is only reached for Array player entries; measurement uses plain {ovr} objects, so this is a stub that is never called.
function effOvr(player, slot){ return player[3] - 0; }
function wavgSlots(slotmap, spec){ let sum=0, w=0; for(const [s,wt] of Object.entries(spec)){ sum += slotOvr(slotmap,s)*wt; w += wt; } return sum/w; }
function retScore(sm){ const cands = RETURN_SLOTS.filter(sl=>Array.isArray(sm[sl])); if(!cands.length) return 82; return 82; }
function teamRatings(slotmap){
  const r = {};
  r.ret = retScore(slotmap);
  for(const k in RATING_SPECS) r[k] = wavgSlots(slotmap, RATING_SPECS[k]);
  for(const p in PERS_REC) r['rec'+p] = wavgSlots(slotmap, PERS_REC[p]);
  r.rec11 = r.rec;
  for(const k in DEF_SPECS) r[k] = wavgSlots(slotmap, DEF_SPECS[k]);
  r.te1 = slotOvr(slotmap,'TE1'); r.te2 = slotOvr(slotmap,'TE2');
  r.rbHeavy = wavgSlots(slotmap, {RB1:2.0, RB2:1.2});
  r.passOff = 0.45*r.qb + 0.30*r.rec + 0.25*r.olPass;
  r.runOff  = 0.35*r.rb + 0.65*r.olRun;
  r.off = 0.6*r.passOff + 0.4*r.runOff;
  r.def = 0.55*(0.5*r.passRush + 0.5*r.coverage) + 0.45*r.frontRun;
  return r;
}
function bestUnitPts(R, lg, isOff){
  if(isOff) return OFF_OPTS.reduce((m,o)=>Math.max(m, matchupModel(R, lg, lg, {off:o, def:DEFAULT_DEF}).structPts), -1e9);
  return -DEF_OPTS.reduce((m,d)=>Math.min(m, matchupModel(lg, R, lg, {off:NEUTRAL_OFF, def:d}).structPts), 1e9);
}
function matchupModel(O0, D0, lg, plan){
  plan = plan || {off:NEUTRAL_OFF, def:DEFAULT_DEF};
  const po = plan.off, pd = plan.def;
  const O = applyOffPlan(O0, po), LO = applyOffPlan(lg, po);
  const D = applyDefPlan(D0, pd, false), LD = applyDefPlan(lg, pd, true);
  const sT = offShift(po), rAmp = 1+PLAN_K.rAmp*sT, pAmp = 1-PLAN_K.pAmp*sT;
  const dRB=O.rb-lg.rb, dOLr=O.olRun-lg.olRun, dQB=O.qb-lg.qb, dRec=O.rec-lg.rec, dOLp=O.olPass-lg.olPass, dK=O.kicker-lg.kicker;
  const dFront=D.frontRun-LD.frontRun, dRush=D.passRush-LD.passRush, dCov=D.coverage-LD.coverage;
  const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp));
  const heavy = PERS[po.pers].heavy, nick = pd.pkg==='nickel';
  const schemeRun  = PERS[po.pers].runB + PLAN_K.kRun*sT + (nick ? PLAN_K.nickRun*heavy : PLAN_K.baseRunVsHeavy*heavy);
  const schemePass = PERS[po.pers].passB - PLAN_K.kPass*sT + (nick ? 0 : PLAN_K.basePass*(1-heavy));
  const rU = softCap(MC.rb*dRB + MC.olRun*dOLr - MC.front*dFront, -1.1, 0.40);
  const pU = softCap(MC.qb*dQB + MC.rec*dRec + MC.olPass*dOLp - MC.rush*dRush - MC.cov*dCov, -0.8, 0.27);
  const rushLog = softCap(rU*rAmp + lean + schemeRun, -1.3, 0.42);
  const passLog = softCap(pU*pAmp - lean + schemePass, -1.0, 0.29);
  const sum = ps => ps.reduce((s,p)=>s+p[2],0);
  const toLog=softCap(sum([['qb','off',-MC.toQb*dQB], ['coverage','def',MC.toCov*dCov], ['passRush','def',MC.toRush*dRush], ['scheme','off',-PLAN_K.kTo*sT]]),-0.7,0.7);
  const skLog=softCap(sum([['passRush','def',MC.skRush*dRush], ['olPass','off',-MC.skOl*dOLp], ['coverage','def',MC.skCov*dCov], ['scheme','off',-PLAN_K.kSack*sT]]),-0.8,0.40);
  const expRush = RUSH_BASE*Math.exp(rushLog), expPass = PASS_BASE*Math.exp(passLog);
  const lamTO = LAM_TO*Math.exp(toLog), lamSack = LAM_SACK*Math.exp(skLog);
  const kickPts = MC.kick*dK;
  const retPts = RET_PTS*(Math.exp(((O0.ret||82)-82)/45) - Math.exp(((lg.ret||82)-82)/45));
  const planCost = PLAN_K.predict*Math.pow(STRAT[po.strat].s/0.08, 2) - PLAN_K.defPredict*Math.abs(DEF_FOCUS[pd.focus].f) + PERS[po.pers].pc;
  const vm = clampNum(1 - PLAN_K.vm*sT, 0.7, 1.2);
  const structPts = BASE_PTS + PT_RUSH*(expRush-RUSH_BASE) + PT_PASS*(expPass-PASS_BASE) - PT_TO*(lamTO-LAM_TO) - PT_SACK*(lamSack-LAM_SACK) + kickPts + retPts - planCost;
  return {structPts};
}

// slotWinsTable / slotWins / slotWinsPerOvr (engine, base = all slots at a fixed OVR)
function slotWinsTable(baseOvr){
  const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr:baseOvr}; });
  const lg = teamRatings(base), k = 17/POINTS_PER_WIN;
  const b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, lg, false)};
  const T = {};
  ROSTER_SLOTS.forEach(s=>{
    const isOff = WV_OFF_SLOTS.has(s), arr = [];
    for(let o=50;o<=100;o++){
      const sm = Object.assign({}, base); sm[s] = {ovr:o};
      arr.push((bestUnitPts(teamRatings(sm), lg, isOff) - (isOff?b0.on:b0.off))*k);
    }
    T[s] = arr;
  });
  return T;
}
function slotWins(T, slot, ovr){
  const t = T[slot], x = clampNum(ovr, 50, 99.999)-50, i = Math.floor(x), f = x-i;
  return t[i]*(1-f) + t[i+1]*f;
}
function slotWinsPerOvr(T){ const out = {}; ROSTER_SLOTS.forEach(s=>{ out[s] = (slotWins(T, s, 90) - slotWins(T, s, 70))/20; }); return out; }

// NEW measurement: base = all slots at their position-specific pool average; vary ONE slot at center +/- h
function poolMeans(){
  const sum = {}, cnt = {};
  POOL.forEach(r=>{ const p = r.pos; sum[p] = (sum[p]||0) + r.ovr; cnt[p] = (cnt[p]||0) + 1; });
  const out = {}; Object.keys(sum).forEach(p=>{ out[p] = sum[p]/cnt[p]; });
  return out;
}
// engine slot -> pool positions whose mean centers it (combined mean for slots the engine treats as one value curve)
const SLOT_POOL_POS = {
  QB:['QB'], RB1:['HB'], RB2:['HB'], WR1:['WR'], WR2:['WR'], WR3:['WR'], TE1:['TE'], TE2:['TE'],
  OT1:['LT','RT'], OT2:['LT','RT'], OG1:['LG','RG'], OG2:['LG','RG'], C:['C'],
  DE1:['REDG','LEDG'], DE2:['REDG','LEDG'], DT1:['DT'], DT2:['DT'],
  MIKE:['MIKE','WILL','SAM'], WILL:['MIKE','WILL','SAM'], SAM:['MIKE','WILL','SAM'],
  SS:['SS'], FS:['FS'], K:['K'], CB1:['CB'], CB2:['CB'], CB3:['CB']
};
function newMeasurement(means){
  const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr: meansSlot(s, means)}; });
  const lg = teamRatings(base), k = 17/POINTS_PER_WIN;
  const b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, lg, false)};
  const center = {}; ROSTER_SLOTS.forEach(s=>{ center[s] = meansSlot(s, means); });
  const out = {};
  ROSTER_SLOTS.forEach(s=>{
    const isOff = WV_OFF_SLOTS.has(s), c = center[s];
    const wins = ovr => {
      const sm = Object.assign({}, base); sm[s] = {ovr: clampNum(ovr,50,99.999)};
      return (bestUnitPts(teamRatings(sm), lg, isOff) - (isOff?b0.on:b0.off))*k;
    };
    out[s] = {center:c, spread:{}};
    [3,5,7,10].forEach(h=>{ out[s].spread[h] = (wins(c+h) - wins(c-h)) / (2*h); });
  });
  return out;
}
function meansSlot(s, means){
  const pos = SLOT_POOL_POS[s];
  const vals = pos.map(p=>means[p]).filter(v=>v!=null);
  return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 70;
}

// modelWeights-style scaling: scale so max == 700, round to nearest 5, floor 5
function scaleWeights(slopes){
  const mx = Math.max(...Object.values(slopes));
  const out = {};
  ROSTER_SLOTS.forEach(s=>{ out[s] = slopes[s]==null ? 5 : Math.max(5, Math.round(slopes[s]/mx*700/5)*5); });
  return out;
}

// ---------------- run ----------------
const means = poolMeans();
const T = slotWinsTable(80);                 // OLD: everything at 80
const OLD = slotWinsPerOvr(T);               // engine's 70->90 measurement
const NEW = newMeasurement(means);             // NEW: per-position center, everything else at position averages

console.log('POOL: rows =', POOL.length);
console.log('Position pool means (OVR):');
Object.entries(means).sort((a,b)=>a[0]-b[0]).forEach(([p,m])=>console.log(`  ${p.padEnd(6)} ${m.toFixed(2)}`));

console.log('\nPer-slot: center | OLD(70->90, all@80) | NEW slope @3 | @5 | @7 | @10 | maxSpreadDelta');
const rows = [];
ROSTER_SLOTS.forEach(s=>{
  const n = NEW[s]; const old = OLD[s];
  const vals = [3,5,7,10].map(h=>n.spread[h]);
  const maxDelta = Math.max(...vals) - Math.min(...vals);
  rows.push({s, center:n.center, old, v3:vals[0], v5:vals[1], v7:vals[2], v10:vals[3], maxDelta});
  console.log(`${s.padEnd(4)} center=${n.center.toFixed(2)}  old=${old.toFixed(4)}  @3=${vals[0].toFixed(4)}  @5=${vals[1].toFixed(4)}  @7=${vals[2].toFixed(4)}  @10=${vals[3].toFixed(4)}  maxD=${maxDelta.toFixed(4)}`);
});

console.log('\nSlots ranked by spread sensitivity (maxDelta across h=3,5,7,10):');
rows.slice().sort((a,b)=>b.maxDelta-a.maxDelta).forEach(r=>console.log(`  ${r.s.padEnd(4)} center=${r.center.toFixed(2)} old=${r.old.toFixed(4)} maxD=${r.maxDelta.toFixed(4)}  [@3 ${r.v3.toFixed(4)} @5 ${r.v5.toFixed(4)} @7 ${r.v7.toFixed(4)} @10 ${r.v10.toFixed(4)}]`));

console.log('\nOLD vs NEW@5 slope ratio (NEW@5 / OLD) per slot:');
ROSTER_SLOTS.forEach(s=>{ const n=NEW[s]; console.log(`  ${s.padEnd(4)} old=${OLD[s].toFixed(4)} new5=${n.spread[5].toFixed(4)} ratio=${(n.spread[5]/OLD[s]).toFixed(3)}`); });

// measured-weight analog: scale each spread's slopes so max==700, round to nearest 5, floor 5
console.log('\nMeasured-weight analog (scale max->700, nearest 5, floor 5):');
console.log('OLD modelWeights-equivalent:', JSON.stringify(scaleWeights(OLD)));
[3,5,7,10].forEach(h=>{
  const slopes = {}; ROSTER_SLOTS.forEach(s=>{ slopes[s] = NEW[s].spread[h]; });
  console.log(`h=${h}:`, JSON.stringify(scaleWeights(slopes)));
});

// self-check invariant: slotWins(s, 80) must be 0 (baseline is the all-80 lineup)
const T80 = slotWinsTable(80);
let invOk = true;
ROSTER_SLOTS.forEach(s=>{ const v = slotWins(T80, s, 80); if(Math.abs(v)>1e-9){ invOk=false; console.log('INVARIANT FAIL', s, v); } });
console.log('\nInvariant slotWins(s,80)===0 for all slots:', invOk ? 'PASS' : 'FAIL');
