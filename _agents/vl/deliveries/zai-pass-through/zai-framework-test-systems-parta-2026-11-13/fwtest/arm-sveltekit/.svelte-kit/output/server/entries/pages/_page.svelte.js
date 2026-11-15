import { e as escape_html, a5 as attr, a6 as ensure_array_like, a7 as stringify, a8 as attr_class } from "../../chunks/index.js";
import "clsx";
const SLOTS = [
  { id: "QB", weight: 1e3, dest: "QB", unit: "offense" },
  { id: "WR1", weight: 650, dest: "WR", unit: "offense" },
  { id: "OT1", weight: 500, dest: "OT", unit: "offense" },
  { id: "OT2", weight: 300, dest: "OT", unit: "offense" },
  { id: "WR2", weight: 400, dest: "WR", unit: "offense" },
  { id: "C", weight: 150, dest: "C", unit: "offense" },
  { id: "OG1", weight: 400, dest: "OG", unit: "offense" },
  { id: "OG2", weight: 250, dest: "OG", unit: "offense" },
  { id: "TE1", weight: 250, dest: "TE", unit: "offense" },
  { id: "RB1", weight: 250, dest: "RB", unit: "offense" },
  { id: "WR3", weight: 100, dest: "WR", unit: "offense" },
  { id: "RB2", weight: 100, dest: "RB", unit: "offense" },
  { id: "TE2", weight: 150, dest: "TE", unit: "offense" },
  { id: "FB", weight: 25, dest: "FB", unit: "offense" },
  { id: "TE3", weight: 50, dest: "TE", unit: "offense" },
  { id: "WR4", weight: 50, dest: "WR", unit: "offense" },
  { id: "DE1", weight: 650, dest: "EDGE", unit: "defense" },
  { id: "DT1", weight: 500, dest: "DT", unit: "defense" },
  { id: "DE2", weight: 300, dest: "EDGE", unit: "defense" },
  { id: "DT2", weight: 300, dest: "DT", unit: "defense" },
  { id: "DL5", weight: 150, dest: "DL5", unit: "defense" },
  { id: "MIKE", weight: 300, dest: "ILB", unit: "defense" },
  { id: "WILL", weight: 150, dest: "OLB", unit: "defense" },
  { id: "SAM", weight: 100, dest: "OLB", unit: "defense" },
  { id: "CB1", weight: 400, dest: "CB", unit: "defense" },
  { id: "CB2", weight: 250, dest: "CB", unit: "defense" },
  { id: "CB3", weight: 100, dest: "NICKEL", unit: "defense" },
  { id: "DIME", weight: 50, dest: "DIME", unit: "defense" },
  { id: "FS", weight: 300, dest: "FS", unit: "defense" },
  { id: "SS", weight: 300, dest: "SS", unit: "defense" },
  { id: "K", weight: 50, dest: "K", unit: "special" },
  { id: "P", weight: 50, dest: "P", unit: "special" }
];
const SLOT_IDS = SLOTS.map((s) => s.id);
const WEIGHT = Object.fromEntries(SLOTS.map((s) => [s.id, s.weight]));
const LABEL = {
  WR1: "WR1",
  MIKE: "MIKE",
  WILL: "WILL",
  SAM: "SAM",
  CB3: "Nickel",
  DE1: "DE1",
  DE2: "DE2"
};
function fieldSlots(base) {
  return SLOTS.map((s) => {
    const plain = { slot: s.id, dest: s.dest, row: s.id, weight: s.weight, label: LABEL[s.id] ?? s.id };
    if (base === "4-3") return plain;
    switch (s.id) {
      case "DT1":
        return { ...plain, label: "NT" };
      case "MIKE":
        return { ...plain, label: "ILB1" };
      case "DT2":
        return { slot: "DT2", dest: "ILB", row: "DT2", weight: WEIGHT.DT2, label: "ILB2" };
      case "WILL":
        return { slot: "WILL", dest: "OLB", row: "WILL", weight: WEIGHT.WILL, label: "OLB1" };
      case "SAM":
        return { ...plain, label: "OLB2" };
      default:
        return plain;
    }
  });
}
const EMPTY_OVR = 70;
const RATING_SPECS = {
  olRun: { OT1: 0.579, OT2: 0.348, OG1: 0.705, OG2: 0.441, C: 0.263, TE1: 1.436, FB: 0.188 },
  olPass: { OT1: 0.812, OT2: 0.488, OG1: 0.588, OG2: 0.368, C: 0.221 },
  rb: { RB1: 43.113, RB2: 12.177 },
  qb: { QB: 1 },
  rec: { WR1: 25.682, WR2: 19.86, WR3: 3.251, TE1: 2.174, RB1: 4.201, TE3: 1.264, WR4: 1.6 },
  passRush: { DE1: 0.583, DE2: 0.255, DT1: 0.303, DT2: 0.182, MIKE: 0.053, WILL: 0.03, DL5: 0.114 },
  frontRun: { DT1: 0.456, DT2: 0.273, DE1: 0.292, DE2: 0.158, MIKE: 0.208, WILL: 0.099, SAM: 0.234, SS: 0.115, CB1: 0.06, CB2: 0.034, CB3: 9e-3, FS: 0.08, DL5: 0.099 },
  coverage: { CB1: 0.175, CB2: 0.107, CB3: 0.041, SS: 0.113, FS: 0.122, MIKE: 0.069, WILL: 0.039, SAM: 0.1 },
  kicker: { K: 1 }
};
const DEF_SPECS = {
  frontBase: { DT1: 0.456, DT2: 0.273, DE1: 0.292, DE2: 0.158, MIKE: 0.208, WILL: 0.099, SAM: 0.334, SS: 0.115, CB1: 0.06, CB2: 0.034, CB3: 5e-3, FS: 0.08, DL5: 0.099 },
  frontNick: { DT1: 0.456, DT2: 0.273, DE1: 0.292, DE2: 0.158, MIKE: 0.208, WILL: 0.099, SAM: 0.032, SS: 0.115, CB1: 0.062, CB2: 0.048, CB3: 9e-3, FS: 0.08, DL5: 0.099 },
  covBase: { CB1: 0.175, CB2: 0.107, CB3: 0.011, SS: 0.113, FS: 0.122, MIKE: 0.069, WILL: 0.039, SAM: 0.135 },
  covNick: { CB1: 0.175, CB2: 0.107, CB3: 0.045, SS: 0.113, FS: 0.122, MIKE: 0.069, WILL: 0.039, SAM: 0.017 },
  covDime: { CB1: 0.175, CB2: 0.107, CB3: 0.045, DIME: 0.184, SS: 0.113, FS: 0.122, MIKE: 0.069 }
};
const PERS_REC = {
  "12": { WR1: 25.682, WR2: 27.236, TE1: 2.174, TE2: 22.844, RB1: 4.201 },
  "13": { WR1: 25.682, TE1: 2.174, TE2: 22.844, TE3: 15.173, RB1: 4.201 },
  "21": { WR1: 25.682, WR2: 27.236, TE1: 2.174, RB1: 4.201, RB2: 12.177 },
  "22": { WR1: 25.682, TE1: 2.174, TE2: 22.844, RB1: 4.201, RB2: 12.177 }
};
const RB_HEAVY = { RB1: 44.218, RB2: 30.441 };
const PERS = {
  "11": { label: "11 personnel", run: 0, runB: 0, passB: 0, heavy: 0, tbw: 0, pc: 0 },
  "12": { label: "12 personnel", run: 0.03, runB: 0.03, passB: -0.015, heavy: 0.5, tbw: 0.08, pc: 0.22 },
  "13": { label: "13 personnel", run: 0.06, runB: 0.055, passB: -0.035, heavy: 1, tbw: 0.14, pc: 0.42 },
  "21": { label: "21 personnel", run: 0.05, runB: 0.04, passB: -0.03, heavy: 0.6, tbw: 0.03, pc: 0.38 },
  "22": { label: "22 personnel", run: 0.08, runB: 0.07, passB: -0.045, heavy: 1, tbw: 0.1, pc: 0.48 }
};
const STRAT = {
  run: { label: "run-heavy", s: 0.08 },
  neutral: { label: "balanced", s: 0 },
  pass: { label: "pass-heavy", s: -0.08 }
};
const DEF_FOCUS = {
  run: { label: "run-defense", f: 1 },
  neutral: { label: "balanced", f: 0 },
  pass: { label: "pass-defense", f: -1 }
};
const PLAN_K = {
  kRun: 1.4,
  kPass: 0.85,
  rAmp: 3,
  pAmp: 2.5,
  vm: 1.3,
  kBlock: 1,
  predict: 0.38,
  defPredict: 0.15,
  nickRun: 0.05,
  baseRunVsHeavy: -0.025,
  basePass: 0.03,
  defFront: 2,
  defCov: 1.5,
  defRush: 0.6,
  pkgFront: 0.8,
  pkgCov: 0.8
};
const MC = {
  rb: 0.0208,
  olRun: 0.0495,
  front: 0.05577,
  qb: 655e-5,
  rec: 0.02045,
  olPass: 0.01403,
  rush: 0.01579,
  cov: 0.0184,
  lean: 0.013,
  toCov: 0.0204,
  toRush: 0.0105,
  skRush: 0.0268,
  skCov: 0.012,
  kick: 0.01215
};
const RUSH_BASE = 105, PASS_BASE = 220;
const PT_RUSH = 0.04, PT_PASS = 0.07, PT_TO = 3, PT_SACK = 0.8, LAM_TO = 1.2, LAM_SACK = 2.2;
const BASE_PTS = 21.5;
const RET_PTS = 2.36;
const RET_NEUTRAL = 82;
const QB_RUN_C = 0.0194;
const WR_BLK_C = 0.01147;
const WR_BLK_W = [1, 1, 1];
const DIME_W = 0.15;
const POINTS_PER_WIN = 32.5;
const GAMES = 17;
function wavg(spots, spec) {
  let sum = 0, w = 0;
  for (const sp of spots) {
    const wt = spec[sp.row];
    if (wt !== void 0) {
      sum += sp.ovr * wt;
      w += wt;
    }
  }
  if (w === 0) throw new Error("wavg: no spot matches the spec");
  return sum / w;
}
function rowOvr(spots, row) {
  const sp = spots.find((x) => x.row === row);
  return sp ? sp.ovr : EMPTY_OVR;
}
function teamRatings(spots, returner = RET_NEUTRAL) {
  const g = (spec) => wavg(spots, spec);
  const o = { TE1: rowOvr(spots, "TE1"), TE2: rowOvr(spots, "TE2"), P: rowOvr(spots, "P"), QB: rowOvr(spots, "QB"), WR1: rowOvr(spots, "WR1"), WR2: rowOvr(spots, "WR2"), WR3: rowOvr(spots, "WR3") };
  const rec = g(RATING_SPECS.rec);
  const r = {
    olRun: g(RATING_SPECS.olRun),
    olPass: g(RATING_SPECS.olPass),
    rb: g(RATING_SPECS.rb),
    qb: g(RATING_SPECS.qb),
    rec,
    passRush: g(RATING_SPECS.passRush),
    frontRun: g(RATING_SPECS.frontRun),
    coverage: g(RATING_SPECS.coverage),
    kicker: g(RATING_SPECS.kicker),
    rec12: g(PERS_REC["12"]),
    rec13: g(PERS_REC["13"]),
    rec21: g(PERS_REC["21"]),
    rec22: g(PERS_REC["22"]),
    rec11: rec,
    frontBase: g(DEF_SPECS.frontBase),
    frontNick: g(DEF_SPECS.frontNick),
    covBase: g(DEF_SPECS.covBase),
    covNick: g(DEF_SPECS.covNick),
    covDime: g(DEF_SPECS.covDime),
    te1: o.TE1,
    te2: o.TE2,
    rbHeavy: g(RB_HEAVY),
    ret: returner,
    p: o.P,
    qbRunR: o.QB,
    wrBlk: (o.WR1 * WR_BLK_W[0] + o.WR2 * WR_BLK_W[1] + o.WR3 * WR_BLK_W[2]) / (WR_BLK_W[0] + WR_BLK_W[1] + WR_BLK_W[2]),
    passOff: 0,
    runOff: 0,
    off: 0,
    def: 0
  };
  r.passOff = 0.45 * r.qb + 0.3 * r.rec + 0.25 * r.olPass;
  r.runOff = 0.35 * r.rb + 0.65 * r.olRun;
  r.off = 0.6 * r.passOff + 0.4 * r.runOff;
  r.def = 0.55 * (0.5 * r.passRush + 0.5 * r.coverage) + 0.45 * r.frontRun;
  return r;
}
const NEUTRAL_OFF = { pers: "11", strat: "neutral" };
const DEFAULT_DEF = { pkg: "nickel", focus: "neutral" };
const DEFAULT_PLAN = { off: NEUTRAL_OFF, def: DEFAULT_DEF };
const OFF_OPTS = ["11", "12", "13", "21", "22"].flatMap((pers) => ["run", "neutral", "pass"].map((strat) => ({ pers, strat })));
const DEF_OPTS = ["base", "nickel"].flatMap((pkg) => ["run", "neutral", "pass"].map((focus) => ({ pkg, focus })));
function offShift(po) {
  return PERS[po.pers].run + STRAT[po.strat].s;
}
function clamp(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}
function softCap(x, lo, hi) {
  const cap = x >= 0 ? hi : -lo, k = 0.6 * cap, a = Math.abs(x);
  if (a <= k) return x;
  const v = k + (cap - k) * Math.tanh((a - k) / (cap - k));
  return x >= 0 ? v : -v;
}
function applyOffPlan(O, po) {
  const p = po.pers, out = { ...O };
  if (p !== "11") out.rec = O["rec" + p];
  if (p === "21" || p === "22") out.rb = O.rbHeavy;
  const blk = p === "13" ? (O.te2 + 70) / 2 : p === "12" || p === "22" ? (O.te1 + O.te2) / 2 : O.te1;
  out.olRun = O.olRun + PERS[p].tbw * (blk - 75) * PLAN_K.kBlock;
  return out;
}
function applyDefPlan(D, pd, isLeague) {
  const f = DEF_FOCUS[pd.focus].f, nick = pd.pkg === "nickel", out = { ...D };
  out.frontRun = (nick ? D.frontNick : D.frontBase) + (isLeague ? 0 : (nick ? -0.8 : PLAN_K.pkgFront) + PLAN_K.defFront * f);
  out.coverage = (nick ? D.covNick : D.covBase) + (isLeague ? 0 : (nick ? PLAN_K.pkgCov : -0.8) - PLAN_K.defCov * f);
  out.passRush = D.passRush - (isLeague ? 0 : PLAN_K.defRush * f);
  out.coverage = (1 - DIME_W) * out.coverage + DIME_W * D.covDime;
  return out;
}
function matchupModel(O0, D0, lg, plan = DEFAULT_PLAN) {
  const po = plan.off, pd = plan.def;
  const O = applyOffPlan(O0, po), LO = applyOffPlan(lg, po);
  const D = applyDefPlan(D0, pd, false), LD = applyDefPlan(lg, pd, true);
  const sT = offShift(po), rAmp = 1 + PLAN_K.rAmp * sT, pAmp = 1 - PLAN_K.pAmp * sT;
  const dRB = O.rb - LO.rb, dOLr = O.olRun - LO.olRun, dQB = O.qb - lg.qb, dRec = O.rec - LO.rec, dOLp = O.olPass - lg.olPass, dK = O.kicker - lg.kicker;
  const dFront = D.frontRun - LD.frontRun, dRush = D.passRush - LD.passRush, dCov = D.coverage - LD.coverage;
  const lean = MC.lean * (0.35 * (O0.rb - lg.rb) + 0.65 * (O0.olRun - lg.olRun) - (0.45 * dQB + 0.3 * (O0.rec - lg.rec) + 0.25 * dOLp));
  const heavy = PERS[po.pers].heavy, nick = pd.pkg === "nickel";
  const schemeRun = PERS[po.pers].runB + PLAN_K.kRun * sT + (nick ? PLAN_K.nickRun * heavy : PLAN_K.baseRunVsHeavy * heavy);
  const schemePass = PERS[po.pers].passB - PLAN_K.kPass * sT + (nick ? 0 : PLAN_K.basePass * (1 - heavy));
  const runParts = [["rb", "off", MC.rb * dRB * rAmp], ["olRun", "off", MC.olRun * dOLr * rAmp], ["frontRun", "def", -0.05577 * dFront * rAmp], ["lean", "off", lean], ["scheme", "off", schemeRun]];
  const passParts = [["qb", "off", MC.qb * dQB * pAmp], ["rec", "off", MC.rec * dRec * pAmp], ["olPass", "off", MC.olPass * dOLp * pAmp], ["passRush", "def", -0.01579 * dRush * pAmp], ["coverage", "def", -0.0184 * dCov * pAmp], ["lean", "off", -lean], ["scheme", "off", schemePass]];
  const toParts = [["qb", "off", -0.01471 * dQB], ["coverage", "def", MC.toCov * dCov], ["passRush", "def", MC.toRush * dRush], ["scheme", "off", -1 * sT]];
  const skParts = [["passRush", "def", MC.skRush * dRush], ["olPass", "off", -0.0336 * dOLp], ["coverage", "def", MC.skCov * dCov], ["scheme", "off", -0.9 * sT]];
  const sum = (ps) => ps.reduce((s, p) => s + p[2], 0);
  const rOff = softCap(MC.rb * dRB + MC.olRun * dOLr, -1.1, 0.4);
  const pOff = softCap(MC.qb * dQB + MC.rec * dRec + MC.olPass * dOLp, -0.8, 0.27);
  const rushLog = softCap(rOff * rAmp + lean + schemeRun, -1.3, 0.33) - MC.front * dFront * rAmp;
  const passLog = softCap(pOff * pAmp - lean + schemePass, -1, 0.29) - (MC.rush * dRush + MC.cov * dCov) * pAmp;
  const toLog = softCap(sum(toParts), -0.7, 0.7), skLog = softCap(sum(skParts), -0.8, 0.4);
  const expRush = RUSH_BASE * Math.exp(rushLog), expPass = PASS_BASE * Math.exp(passLog);
  const lamTO = LAM_TO * Math.exp(toLog), lamSack = LAM_SACK * Math.exp(skLog);
  const kickPts = MC.kick * dK;
  const retPts = RET_PTS * (Math.exp((O0.ret - 82) / 45) - Math.exp((lg.ret - 82) / 45));
  const qbRun = QB_RUN_C * (O0.qbRunR - lg.qbRunR), wrBlk = WR_BLK_C * (O0.wrBlk - lg.wrBlk);
  const puntPts = -0.542 * (Math.exp((D0.p - 80) / 45) - Math.exp((lg.p - 80) / 45));
  const raw = {};
  const add = (parts, effOf, kind) => {
    for (const [unit, owner, lv] of parts) {
      if (unit === "lean" || unit === "scheme") continue;
      const eff = effOf(lv), key = unit + "|" + owner;
      const e = raw[key] ??= { unit, owner, pts: 0, kinds: {} };
      const swing = owner === "off" ? eff : -eff;
      e.pts += swing;
      e.kinds[kind] = (e.kinds[kind] ?? 0) + swing;
    }
  };
  add(runParts, (lv) => PT_RUSH * RUSH_BASE * (Math.exp(lv) - 1), "ground game");
  add(passParts, (lv) => PT_PASS * PASS_BASE * (Math.exp(lv) - 1), "passing game");
  add(toParts, (lv) => -PT_TO * LAM_TO * (Math.exp(lv) - 1), "turnovers");
  add(skParts, (lv) => -PT_SACK * LAM_SACK * (Math.exp(lv) - 1), "sacks");
  if (Math.abs(kickPts) > 0.01) raw["kicker|off"] = { unit: "kicker", owner: "off", pts: kickPts, kinds: { "field goals": kickPts } };
  const planCost = PLAN_K.predict * Math.pow(STRAT[po.strat].s / 0.08, 2) - PLAN_K.defPredict * Math.abs(DEF_FOCUS[pd.focus].f) + PERS[po.pers].pc;
  const extraPts = retPts + puntPts + qbRun + wrBlk;
  const structPts = BASE_PTS + PT_RUSH * (expRush - RUSH_BASE) + PT_PASS * (expPass - PASS_BASE) - PT_TO * (lamTO - LAM_TO) - PT_SACK * (lamSack - LAM_SACK) + kickPts + extraPts - planCost;
  const channels = { run: PT_RUSH * (expRush - RUSH_BASE) + qbRun + wrBlk, pass: PT_PASS * (expPass - PASS_BASE), to: -PT_TO * (lamTO - LAM_TO), sack: -PT_SACK * (lamSack - LAM_SACK), kick: kickPts, plan: -planCost };
  const vm = clamp(1 - PLAN_K.vm * sT, 0.7, 1.2);
  return { expRush, expPass, lamTO, lamSack, structPts, extraPts, channels, swings: Object.values(raw), sd: 8 * vm, vm, sT, planCost, plan: { off: po, def: pd } };
}
const SOURCE_PCT = [3.27, 5.78, 5.88, 5.85, 5.91, 5.93, 5.2, 5.41, 5.17, 4.48, 4.26, 16, 26.85];
const TARGET_FINAL_PCT = [0.3, 4.62, 4.99, 14.52, 4.91, 4.77, 7.37, 7.3, 4.69, 2.01, 5.29, 9.98, 29.26];
const OT_RATE_PCT = 5.88;
const OT_FINAL_SHARE = [0.073, 0, 0, 0.396, 0.073, 0, 0.292, 0.157, 0, 0, 0, 8e-3, 0];
const norm = (xs) => {
  const s = xs.reduce((a, b) => a + b, 0);
  return xs.map((x) => x / s);
};
const TARGET_REG = norm(TARGET_FINAL_PCT.map((t, i) => i === 0 ? OT_RATE_PCT : Math.max(0, t - OT_RATE_PCT * OT_FINAL_SHARE[i])));
const SRC = norm(SOURCE_PCT);
(() => {
  const n = SRC.length, cs = [0], ct = [0];
  for (let i = 0; i < n; i++) {
    cs.push(cs[i] + SRC[i]);
    ct.push(ct[i] + TARGET_REG[i]);
  }
  return SRC.map((p, b) => TARGET_REG.map((_, m) => p === 0 ? b === m ? 1 : 0 : Math.max(0, Math.min(cs[b + 1], ct[m + 1]) - Math.max(cs[b], ct[m])) / p));
})();
function bestUnitPts(R, lg, isOff) {
  if (isOff) return Math.max(...OFF_OPTS.map((o) => matchupModel(R, lg, lg, { off: o, def: DEFAULT_DEF }).structPts));
  return -Math.min(...DEF_OPTS.map((d) => matchupModel(lg, R, lg, { off: NEUTRAL_OFF, def: d }).structPts));
}
const isOffSide = (slot) => slot === "K" || SLOTS.find((s) => s.id === slot)?.unit === "offense";
function slotWins(slot, ovr, base = "4-3") {
  const spots = (v) => fieldSlots(base).map((f) => ({ row: f.row, ovr: f.slot === slot ? v : 80 }));
  const lg = teamRatings(spots(80)), k = GAMES / POINTS_PER_WIN, isOff = isOffSide(slot);
  return (bestUnitPts(teamRatings(spots(ovr)), lg, isOff) - bestUnitPts(lg, lg, isOff)) * k;
}
function slotWins20(slot, base = "4-3") {
  return slotWins(slot, 90, base) - slotWins(slot, 70, base);
}
const FOCUSES = [
  {
    id: "west-coast",
    label: "West Coast",
    blurb: "Short, timing passes spread to the second level.",
    offPlan: { pers: "11", strat: "pass" },
    adj: { WR3: 3, TE2: 2, TE1: 1, RB2: 1, WR1: -2, WR2: -1 },
    matchupAxis: "cov",
    autoTrigger: { cond: "trailing-one-score", strat: "pass" },
    halftimeEligible: true
  },
  {
    id: "deep-passing",
    label: "Deep Passing",
    blurb: "Take shots downfield; live with the incompletions.",
    offPlan: { pers: "11", strat: "pass" },
    adj: { WR1: 3, WR2: 2, WR3: -1, TE1: -1, RB1: -1, RB2: -1 },
    matchupAxis: "cov",
    autoTrigger: { cond: "trailing-big", strat: "pass" },
    halftimeEligible: true
  },
  {
    id: "rpo",
    label: "RPOs",
    blurb: "Run-pass options attack the second level on schedule.",
    offPlan: { pers: "11", strat: "neutral" },
    adj: { TE1: 2, WR2: 1, RB1: 1, QB: 1, WR1: -1 },
    matchupAxis: "front",
    autoTrigger: { cond: "trailing-one-score", strat: "neutral" },
    halftimeEligible: true
  },
  {
    id: "ground-pound",
    label: "Ground & Pound",
    blurb: "Heavy personnel, the run game sets the terms.",
    offPlan: { pers: "21", strat: "run" },
    adj: { RB1: 3, RB2: 2, FB: 2, TE1: 1, WR1: -2, WR3: -1 },
    matchupAxis: "front",
    autoTrigger: { cond: "trailing-big", strat: "run" },
    halftimeEligible: true
  },
  // v2 (round-2 change): the fifth focus. Its own matchup weights, its own
  // automatic trigger, and a DIFFERENT halftime rule (not eligible — the
  // design's check that halftime eligibility is per-focus data, not a constant).
  {
    id: "spread",
    label: "Spread",
    blurb: "Four and five wide: disperse the targets, attack the weakest cover man.",
    offPlan: { pers: "11", strat: "pass" },
    adj: { WR3: 2, WR4: 1, TE2: 2, RB2: 1, WR1: -1, TE1: -1 },
    matchupAxis: "cov",
    autoTrigger: { cond: "trailing-one-score", strat: "pass" },
    halftimeEligible: false
  }
];
const FOCUS_VERSION = "v1-5f";
function focusById(id) {
  const f = FOCUSES.find((x) => x.id === id);
  if (!f) throw new Error(`unknown focus: ${id}`);
  return f;
}
function oppUnitAvg(slots, axis) {
  const rows = axis === "cov" ? ["CB1", "CB2", "FS", "SS"] : ["DE1", "DT1", "MIKE", "DT2"];
  const xs = rows.map((r) => slots[r] ?? 0);
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function matchupFactor(slots, axis) {
  const league = 72;
  const gap = league - oppUnitAvg(slots, axis);
  return Math.min(1.5, Math.max(0.5, 1 + gap / 40));
}
function focusAdjustment(focusId, slot, slots) {
  const f = focusById(focusId);
  const raw = f.adj[slot];
  if (raw === void 0) return 0;
  return Math.round(raw * matchupFactor(slots, f.matchupAxis));
}
function priorityBoard(slots, focusId, base = "4-3") {
  return SLOT_IDS.map((slot) => {
    const ovr = slots[slot];
    const wins = Math.round(slotWins20(slot, base) * 100) / 100;
    return { slot, ovr, wins, priority: Math.round(wins + focusAdjustment(focusId, slot, slots)) };
  });
}
function autoPickFocus(s) {
  const front = oppUnitAvg(s.oppSlots, "front");
  const cov = oppUnitAvg(s.oppSlots, "cov");
  if (front <= cov) return "rpo";
  return "west-coast";
}
function formArrow(formZ) {
  if (formZ >= 1) return "hot";
  if (formZ <= -1) return "cold";
  return null;
}
const FORM_Z = {
  QB: 0.3,
  WR1: 1.4,
  WR2: -0.4,
  WR3: 0.2,
  TE1: -1.6,
  TE2: 0,
  RB1: 0.8,
  RB2: -1.1,
  FB: 0.1,
  OT1: 0.5,
  OT2: -0.2,
  OG1: 0,
  OG2: 0.2,
  C: -0.3,
  DE1: 1.1,
  DE2: -0.5,
  DT1: 0,
  DT2: 0.4,
  DL5: -0.1,
  MIKE: -1.2,
  WILL: 0.6,
  SAM: 0,
  CB1: 1.2,
  CB2: -0.6,
  CB3: 0.3,
  DIME: 0,
  FS: -0.9,
  SS: 0.7,
  K: 0.4,
  P: 0
};
const STRONG_PASS = {
  QB: 92,
  WR1: 91,
  WR2: 86,
  WR3: 79,
  TE1: 84,
  TE2: 72,
  TE3: 68,
  WR4: 70,
  RB1: 78,
  RB2: 71,
  FB: 62,
  OT1: 85,
  OT2: 82,
  OG1: 80,
  OG2: 78,
  C: 81,
  DE1: 76,
  DE2: 74,
  DT1: 74,
  DT2: 71,
  DL5: 69,
  MIKE: 78,
  WILL: 76,
  SAM: 74,
  CB1: 80,
  CB2: 77,
  CB3: 72,
  DIME: 68,
  FS: 79,
  SS: 76,
  K: 76,
  P: 70
};
const STRONG_FRONT = {
  QB: 80,
  WR1: 82,
  WR2: 78,
  WR3: 70,
  TE1: 78,
  TE2: 70,
  TE3: 65,
  WR4: 66,
  RB1: 84,
  RB2: 76,
  FB: 70,
  OT1: 78,
  OT2: 76,
  OG1: 79,
  OG2: 77,
  C: 80,
  DE1: 89,
  DE2: 85,
  DT1: 87,
  DT2: 83,
  DL5: 78,
  MIKE: 84,
  WILL: 82,
  SAM: 80,
  CB1: 76,
  CB2: 73,
  CB3: 68,
  DIME: 65,
  FS: 74,
  SS: 72,
  K: 72,
  P: 68
};
const TEAM_SLOTS = STRONG_PASS;
const OPP_SLOTS = STRONG_FRONT;
const VERSION_TAG = FOCUS_VERSION;
const state = {
  manageOn: false
};
function effectiveFocus() {
  return autoPickFocus({ oppSlots: OPP_SLOTS });
}
function board() {
  return priorityBoard(TEAM_SLOTS, effectiveFocus()).filter((r) => r.wins > 0).sort((a, b) => b.priority - a.priority || b.wins - a.wins);
}
function arrowFor(slot) {
  return formArrow(FORM_Z[slot] ?? 0);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const label = (id) => focusById(id).label;
    $$renderer2.push(`<main class="svelte-1uha8ag"><h1 class="svelte-1uha8ag">Framework Test — Offensive Focus <span class="tag svelte-1uha8ag">SvelteKit · focus ${escape_html(VERSION_TAG)}</span></h1> <section data-testid="setup"><h2 class="svelte-1uha8ag">1 · Pre-game</h2> <label class="manage svelte-1uha8ag"><input type="checkbox"${attr("checked", state.manageOn, true)} data-testid="manage-toggle"/> Manage focus (off = auto — the engine picks, no halftime prompt)</label> `);
    {
      $$renderer2.push(`<!--[-1--><p data-testid="auto-pick">Auto mode — the engine picks: <strong>${escape_html(label(effectiveFocus()))}</strong></p>`);
    }
    $$renderer2.push(`<!--]--> <button class="primary svelte-1uha8ag" data-testid="kickoff">Kickoff</button></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section data-testid="board"><h2 class="svelte-1uha8ag">The draft board <span class="tag svelte-1uha8ag">focus: ${escape_html(label(effectiveFocus()))}</span></h2> <p class="law svelte-1uha8ag">Wins are the static truth — the focus moves Priority only.</p> <table class="svelte-1uha8ag"><thead><tr><th class="svelte-1uha8ag">Slot</th><th class="svelte-1uha8ag">OVR</th><th class="svelte-1uha8ag">Wins</th><th class="svelte-1uha8ag">Priority</th><th class="svelte-1uha8ag">Form</th></tr></thead><tbody><!--[-->`);
    const each_array_2 = ensure_array_like(board());
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let r = each_array_2[$$index_2];
      $$renderer2.push(`<tr${attr("data-testid", `row-${stringify(r.slot)}`)}><td class="svelte-1uha8ag">${escape_html(r.slot)}</td><td class="svelte-1uha8ag">${escape_html(TEAM_SLOTS[r.slot])}</td><td class="svelte-1uha8ag">${escape_html(r.wins.toFixed(2))}</td><td class="priority svelte-1uha8ag"${attr("data-testid", `priority-${stringify(r.slot)}`)}>${escape_html(r.priority)}</td><td class="svelte-1uha8ag">`);
      if (arrowFor(r.slot)) {
        $$renderer2.push(`<!--[0--><span${attr_class(`arrow ${stringify(arrowFor(r.slot))}`, "svelte-1uha8ag")}${attr("title", arrowFor(r.slot))}${attr("aria-label", `form: ${stringify(arrowFor(r.slot))}`)}></span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
