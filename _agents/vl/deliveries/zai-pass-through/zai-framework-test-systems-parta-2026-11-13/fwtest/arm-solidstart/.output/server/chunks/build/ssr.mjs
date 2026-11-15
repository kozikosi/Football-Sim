import { ssr, ssrHydrationKey, escape, ssrAttribute, createComponent, memo } from 'solid-js/web';
import { createSignal, createMemo, Show, For } from 'solid-js';

const V = [{ id: "QB", weight: 1e3, dest: "QB", unit: "offense" }, { id: "WR1", weight: 650, dest: "WR", unit: "offense" }, { id: "OT1", weight: 500, dest: "OT", unit: "offense" }, { id: "OT2", weight: 300, dest: "OT", unit: "offense" }, { id: "WR2", weight: 400, dest: "WR", unit: "offense" }, { id: "C", weight: 150, dest: "C", unit: "offense" }, { id: "OG1", weight: 400, dest: "OG", unit: "offense" }, { id: "OG2", weight: 250, dest: "OG", unit: "offense" }, { id: "TE1", weight: 250, dest: "TE", unit: "offense" }, { id: "RB1", weight: 250, dest: "RB", unit: "offense" }, { id: "WR3", weight: 100, dest: "WR", unit: "offense" }, { id: "RB2", weight: 100, dest: "RB", unit: "offense" }, { id: "TE2", weight: 150, dest: "TE", unit: "offense" }, { id: "FB", weight: 25, dest: "FB", unit: "offense" }, { id: "TE3", weight: 50, dest: "TE", unit: "offense" }, { id: "WR4", weight: 50, dest: "WR", unit: "offense" }, { id: "DE1", weight: 650, dest: "EDGE", unit: "defense" }, { id: "DT1", weight: 500, dest: "DT", unit: "defense" }, { id: "DE2", weight: 300, dest: "EDGE", unit: "defense" }, { id: "DT2", weight: 300, dest: "DT", unit: "defense" }, { id: "DL5", weight: 150, dest: "DL5", unit: "defense" }, { id: "MIKE", weight: 300, dest: "ILB", unit: "defense" }, { id: "WILL", weight: 150, dest: "OLB", unit: "defense" }, { id: "SAM", weight: 100, dest: "OLB", unit: "defense" }, { id: "CB1", weight: 400, dest: "CB", unit: "defense" }, { id: "CB2", weight: 250, dest: "CB", unit: "defense" }, { id: "CB3", weight: 100, dest: "NICKEL", unit: "defense" }, { id: "DIME", weight: 50, dest: "DIME", unit: "defense" }, { id: "FS", weight: 300, dest: "FS", unit: "defense" }, { id: "SS", weight: 300, dest: "SS", unit: "defense" }, { id: "K", weight: 50, dest: "K", unit: "special" }, { id: "P", weight: 50, dest: "P", unit: "special" }], oe = V.map((t) => t.id), Wt = Object.fromEntries(V.map((t) => [t.id, t.weight])), re = { WR1: "WR1", MIKE: "MIKE", WILL: "WILL", SAM: "SAM", CB3: "Nickel", DE1: "DE1", DE2: "DE2" };
function ae(t) {
  return V.map((s) => {
    var _a;
    const e = { slot: s.id, dest: s.dest, row: s.id, weight: s.weight, label: (_a = re[s.id]) != null ? _a : s.id };
    if (t === "4-3") return e;
    switch (s.id) {
      case "DT1":
        return { ...e, label: "NT" };
      case "MIKE":
        return { ...e, label: "ILB1" };
      case "DT2":
        return { slot: "DT2", dest: "ILB", row: "DT2", weight: Wt.DT2, label: "ILB2" };
      case "WILL":
        return { slot: "WILL", dest: "OLB", row: "WILL", weight: Wt.WILL, label: "OLB1" };
      case "SAM":
        return { ...e, label: "OLB2" };
      default:
        return e;
    }
  });
}
const ie = 70, E = { olRun: { OT1: 0.579, OT2: 0.348, OG1: 0.705, OG2: 0.441, C: 0.263, TE1: 1.436, FB: 0.188 }, olPass: { OT1: 0.812, OT2: 0.488, OG1: 0.588, OG2: 0.368, C: 0.221 }, rb: { RB1: 43.113, RB2: 12.177 }, qb: { QB: 1 }, rec: { WR1: 25.682, WR2: 19.86, WR3: 3.251, TE1: 2.174, RB1: 4.201, TE3: 1.264, WR4: 1.6 }, passRush: { DE1: 0.583, DE2: 0.255, DT1: 0.303, DT2: 0.182, MIKE: 0.053, WILL: 0.03, DL5: 0.114 }, frontRun: { DT1: 0.456, DT2: 0.273, DE1: 0.292, DE2: 0.158, MIKE: 0.208, WILL: 0.099, SAM: 0.234, SS: 0.115, CB1: 0.06, CB2: 0.034, CB3: 9e-3, FS: 0.08, DL5: 0.099 }, coverage: { CB1: 0.175, CB2: 0.107, CB3: 0.041, SS: 0.113, FS: 0.122, MIKE: 0.069, WILL: 0.039, SAM: 0.1 }, kicker: { K: 1 } }, I = { frontBase: { DT1: 0.456, DT2: 0.273, DE1: 0.292, DE2: 0.158, MIKE: 0.208, WILL: 0.099, SAM: 0.334, SS: 0.115, CB1: 0.06, CB2: 0.034, CB3: 5e-3, FS: 0.08, DL5: 0.099 }, frontNick: { DT1: 0.456, DT2: 0.273, DE1: 0.292, DE2: 0.158, MIKE: 0.208, WILL: 0.099, SAM: 0.032, SS: 0.115, CB1: 0.062, CB2: 0.048, CB3: 9e-3, FS: 0.08, DL5: 0.099 }, covBase: { CB1: 0.175, CB2: 0.107, CB3: 0.011, SS: 0.113, FS: 0.122, MIKE: 0.069, WILL: 0.039, SAM: 0.135 }, covNick: { CB1: 0.175, CB2: 0.107, CB3: 0.045, SS: 0.113, FS: 0.122, MIKE: 0.069, WILL: 0.039, SAM: 0.017 }, covDime: { CB1: 0.175, CB2: 0.107, CB3: 0.045, DIME: 0.184, SS: 0.113, FS: 0.122, MIKE: 0.069 } }, q = { 12: { WR1: 25.682, WR2: 27.236, TE1: 2.174, TE2: 22.844, RB1: 4.201 }, 13: { WR1: 25.682, TE1: 2.174, TE2: 22.844, TE3: 15.173, RB1: 4.201 }, 21: { WR1: 25.682, WR2: 27.236, TE1: 2.174, RB1: 4.201, RB2: 12.177 }, 22: { WR1: 25.682, TE1: 2.174, TE2: 22.844, RB1: 4.201, RB2: 12.177 } }, ce = { RB1: 44.218, RB2: 30.441 }, O = { 11: { label: "11 personnel", run: 0, runB: 0, passB: 0, heavy: 0, tbw: 0, pc: 0 }, 12: { label: "12 personnel", run: 0.03, runB: 0.03, passB: -0.015, heavy: 0.5, tbw: 0.08, pc: 0.22 }, 13: { label: "13 personnel", run: 0.06, runB: 0.055, passB: -0.035, heavy: 1, tbw: 0.14, pc: 0.42 }, 21: { label: "21 personnel", run: 0.05, runB: 0.04, passB: -0.03, heavy: 0.6, tbw: 0.03, pc: 0.38 }, 22: { label: "22 personnel", run: 0.08, runB: 0.07, passB: -0.045, heavy: 1, tbw: 0.1, pc: 0.48 } }, $t = { run: { label: "run-heavy", s: 0.08 }, neutral: { label: "balanced", s: 0 }, pass: { label: "pass-heavy", s: -0.08 } }, Kt = { run: { label: "run-defense", f: 1 }, neutral: { label: "balanced", f: 0 }, pass: { label: "pass-defense", f: -1 } }, f = { kRun: 1.4, kPass: 0.85, rAmp: 3, pAmp: 2.5, vm: 1.3, kBlock: 1, predict: 0.38, defPredict: 0.15, nickRun: 0.05, baseRunVsHeavy: -0.025, basePass: 0.03, defFront: 2, defCov: 1.5, defRush: 0.6, pkgFront: 0.8, pkgCov: 0.8 }, l = { rb: 0.0208, olRun: 0.0495, front: 0.05577, qb: 655e-5, rec: 0.02045, olPass: 0.01403, rush: 0.01579, cov: 0.0184, lean: 0.013, toCov: 0.0204, toRush: 0.0105, skRush: 0.0268, skCov: 0.012, kick: 0.01215 }, H = 105, Q = 220, it = 0.04, ct = 0.07, ut = 3, dt = 0.8, U = 1.2, j = 2.2, ue = 21.5, de = 2.36, le = 82, fe = 0.0194, he = 0.01147, L = [1, 1, 1], Mt = 0.15, pe = 32.5, ge = 17;
function Re(t, s) {
  let e = 0, n = 0;
  for (const r of t) {
    const a = s[r.row];
    a !== void 0 && (e += r.ovr * a, n += a);
  }
  if (n === 0) throw new Error("wavg: no spot matches the spec");
  return e / n;
}
function P(t, s) {
  const e = t.find((n) => n.row === s);
  return e ? e.ovr : ie;
}
function Ct(t, s = le) {
  const e = (c) => Re(t, c), n = { TE1: P(t, "TE1"), TE2: P(t, "TE2"), P: P(t, "P"), QB: P(t, "QB"), WR1: P(t, "WR1"), WR2: P(t, "WR2"), WR3: P(t, "WR3") }, r = e(E.rec), a = { olRun: e(E.olRun), olPass: e(E.olPass), rb: e(E.rb), qb: e(E.qb), rec: r, passRush: e(E.passRush), frontRun: e(E.frontRun), coverage: e(E.coverage), kicker: e(E.kicker), rec12: e(q[12]), rec13: e(q[13]), rec21: e(q[21]), rec22: e(q[22]), rec11: r, frontBase: e(I.frontBase), frontNick: e(I.frontNick), covBase: e(I.covBase), covNick: e(I.covNick), covDime: e(I.covDime), te1: n.TE1, te2: n.TE2, rbHeavy: e(ce), ret: s, p: n.P, qbRunR: n.QB, wrBlk: (n.WR1 * L[0] + n.WR2 * L[1] + n.WR3 * L[2]) / (L[0] + L[1] + L[2]), passOff: 0, runOff: 0, off: 0, def: 0 };
  return a.passOff = 0.45 * a.qb + 0.3 * a.rec + 0.25 * a.olPass, a.runOff = 0.35 * a.rb + 0.65 * a.olRun, a.off = 0.6 * a.passOff + 0.4 * a.runOff, a.def = 0.55 * (0.5 * a.passRush + 0.5 * a.coverage) + 0.45 * a.frontRun, a;
}
const xt = { pers: "11", strat: "neutral" }, Nt = { pkg: "nickel", focus: "neutral" }, me = { off: xt, def: Nt }, Te = ["11", "12", "13", "21", "22"].flatMap((t) => ["run", "neutral", "pass"].map((s) => ({ pers: t, strat: s }))), be = ["base", "nickel"].flatMap((t) => ["run", "neutral", "pass"].map((s) => ({ pkg: t, focus: s })));
function Be(t) {
  return O[t.pers].run + $t[t.strat].s;
}
function Ee(t, s, e) {
  return Math.min(e, Math.max(s, t));
}
function D(t, s, e) {
  const n = t >= 0 ? e : -s, r = 0.6 * n, a = Math.abs(t);
  if (a <= r) return t;
  const c = r + (n - r) * Math.tanh((a - r) / (n - r));
  return t >= 0 ? c : -c;
}
function Lt(t, s) {
  const e = s.pers, n = { ...t };
  e !== "11" && (n.rec = t["rec" + e]), (e === "21" || e === "22") && (n.rb = t.rbHeavy);
  const r = e === "13" ? (t.te2 + 70) / 2 : e === "12" || e === "22" ? (t.te1 + t.te2) / 2 : t.te1;
  return n.olRun = t.olRun + O[e].tbw * (r - 75) * f.kBlock, n;
}
function Dt(t, s, e) {
  const n = Kt[s.focus].f, r = s.pkg === "nickel", a = { ...t };
  return a.frontRun = (r ? t.frontNick : t.frontBase) + (e ? 0 : (r ? -0.8 : f.pkgFront) + f.defFront * n), a.coverage = (r ? t.covNick : t.covBase) + (e ? 0 : (r ? f.pkgCov : -0.8) - f.defCov * n), a.passRush = t.passRush - (e ? 0 : f.defRush * n), a.coverage = (1 - Mt) * a.coverage + Mt * t.covDime, a;
}
function Ot(t, s, e, n = me) {
  const r = n.off, a = n.def, c = Lt(t, r), W = Lt(e, r), m = Dt(s, a, false), F = Dt(e, a, true), T = Be(r), M = 1 + f.rAmp * T, R = 1 - f.pAmp * T, Y = c.rb - W.rb, p = c.olRun - W.olRun, C = c.qb - e.qb, y = c.rec - W.rec, S = c.olPass - e.olPass, z = c.kicker - e.kicker, $ = m.frontRun - F.frontRun, b = m.passRush - F.passRush, i = m.coverage - F.coverage, k = l.lean * (0.35 * (t.rb - e.rb) + 0.65 * (t.olRun - e.olRun) - (0.45 * C + 0.3 * (t.rec - e.rec) + 0.25 * S)), J = O[r.pers].heavy, pt = a.pkg === "nickel", gt = O[r.pers].runB + f.kRun * T + (pt ? f.nickRun * J : f.baseRunVsHeavy * J), Rt = O[r.pers].passB - f.kPass * T + (pt ? 0 : f.basePass * (1 - J)), qt = [["rb", "off", l.rb * Y * M], ["olRun", "off", l.olRun * p * M], ["frontRun", "def", -0.05577 * $ * M], ["lean", "off", k], ["scheme", "off", gt]], Ht = [["qb", "off", l.qb * C * R], ["rec", "off", l.rec * y * R], ["olPass", "off", l.olPass * S * R], ["passRush", "def", -0.01579 * b * R], ["coverage", "def", -0.0184 * i * R], ["lean", "off", -k], ["scheme", "off", Rt]], mt = [["qb", "off", -0.01471 * C], ["coverage", "def", l.toCov * i], ["passRush", "def", l.toRush * b], ["scheme", "off", -1 * T]], Tt = [["passRush", "def", l.skRush * b], ["olPass", "off", -0.0336 * S], ["coverage", "def", l.skCov * i], ["scheme", "off", -0.9 * T]], bt = (g) => g.reduce((ot, x) => ot + x[2], 0), Qt = D(l.rb * Y + l.olRun * p, -1.1, 0.4), Ut = D(l.qb * C + l.rec * y + l.olPass * S, -0.8, 0.27), jt = D(Qt * M + k + gt, -1.3, 0.33) - l.front * $ * M, Vt = D(Ut * R - k + Rt, -1, 0.29) - (l.rush * b + l.cov * i) * R, Yt = D(bt(mt), -0.7, 0.7), zt = D(bt(Tt), -0.8, 0.4), X = H * Math.exp(jt), Z = Q * Math.exp(Vt), tt = U * Math.exp(Yt), et = j * Math.exp(zt), A = l.kick * z, Jt = de * (Math.exp((t.ret - 82) / 45) - Math.exp((e.ret - 82) / 45)), Bt = fe * (t.qbRunR - e.qbRunR), Et = he * (t.wrBlk - e.wrBlk), Xt = -0.542 * (Math.exp((s.p - 80) / 45) - Math.exp((e.p - 80) / 45)), st = {}, K = (g, ot, x) => {
    var _a, _b;
    for (const [N, rt, ee] of g) {
      if (N === "lean" || N === "scheme") continue;
      const kt = ot(ee), se = N + "|" + rt, at = (_a = st[se]) != null ? _a : st[se] = { unit: N, owner: rt, pts: 0, kinds: {} }, vt = rt === "off" ? kt : -kt;
      at.pts += vt, at.kinds[x] = ((_b = at.kinds[x]) != null ? _b : 0) + vt;
    }
  };
  K(qt, (g) => it * H * (Math.exp(g) - 1), "ground game"), K(Ht, (g) => ct * Q * (Math.exp(g) - 1), "passing game"), K(mt, (g) => -ut * U * (Math.exp(g) - 1), "turnovers"), K(Tt, (g) => -dt * j * (Math.exp(g) - 1), "sacks"), Math.abs(A) > 0.01 && (st["kicker|off"] = { unit: "kicker", owner: "off", pts: A, kinds: { "field goals": A } });
  const nt = f.predict * Math.pow($t[r.strat].s / 0.08, 2) - f.defPredict * Math.abs(Kt[a.focus].f) + O[r.pers].pc, wt = Jt + Xt + Bt + Et, Zt = ue + it * (X - H) + ct * (Z - Q) - ut * (tt - U) - dt * (et - j) + A + wt - nt, te = { run: it * (X - H) + Bt + Et, pass: ct * (Z - Q), to: -ut * (tt - U), sack: -dt * (et - j), kick: A, plan: -nt }, St = Ee(1 - f.vm * T, 0.7, 1.2);
  return { expRush: X, expPass: Z, lamTO: tt, lamSack: et, structPts: Zt, extraPts: wt, channels: te, swings: Object.values(st), sd: 8 * St, vm: St, sT: T, planCost: nt, plan: { off: r, def: a } };
}
const we = [3.27, 5.78, 5.88, 5.85, 5.91, 5.93, 5.2, 5.41, 5.17, 4.48, 4.26, 16, 26.85], Se = [0.3, 4.62, 4.99, 14.52, 4.91, 4.77, 7.37, 7.3, 4.69, 2.01, 5.29, 9.98, 29.26], yt = 5.88, ke = [0.073, 0, 0, 0.396, 0.073, 0, 0.292, 0.157, 0, 0, 0, 8e-3, 0], Gt = (t) => {
  const s = t.reduce((e, n) => e + n, 0);
  return t.map((e) => e / s);
}, At = Gt(Se.map((t, s) => s === 0 ? yt : Math.max(0, t - yt * ke[s]))), lt = Gt(we);
(() => {
  const t = lt.length, s = [0], e = [0];
  for (let n = 0; n < t; n++) s.push(s[n] + lt[n]), e.push(e[n] + At[n]);
  return lt.map((n, r) => At.map((a, c) => n === 0 ? r === c ? 1 : 0 : Math.max(0, Math.min(s[r + 1], e[c + 1]) - Math.max(s[r], e[c])) / n));
})();
function _t(t, s, e) {
  return e ? Math.max(...Te.map((n) => Ot(t, s, s, { off: n, def: Nt }).structPts)) : -Math.min(...be.map((n) => Ot(s, t, s, { off: xt, def: n }).structPts));
}
const ve = (t) => {
  var _a;
  return t === "K" || ((_a = V.find((s) => s.id === t)) == null ? void 0 : _a.unit) === "offense";
};
function It(t, s, e = "4-3") {
  const n = (W) => ae(e).map((m) => ({ row: m.row, ovr: m.slot === t ? W : 80 })), r = Ct(n(80)), a = ge / pe, c = ve(t);
  return (_t(Ct(n(s)), r, c) - _t(r, r, c)) * a;
}
function Pe(t, s = "4-3") {
  return It(t, 90, s) - It(t, 70, s);
}
const ft = [{ id: "west-coast", label: "West Coast", blurb: "Short, timing passes spread to the second level.", offPlan: { pers: "11", strat: "pass" }, adj: { WR3: 3, TE2: 2, TE1: 1, RB2: 1, WR1: -2, WR2: -1 }, matchupAxis: "cov", autoTrigger: { cond: "trailing-one-score", strat: "pass" }, halftimeEligible: true }, { id: "deep-passing", label: "Deep Passing", blurb: "Take shots downfield; live with the incompletions.", offPlan: { pers: "11", strat: "pass" }, adj: { WR1: 3, WR2: 2, WR3: -1, TE1: -1, RB1: -1, RB2: -1 }, matchupAxis: "cov", autoTrigger: { cond: "trailing-big", strat: "pass" }, halftimeEligible: true }, { id: "rpo", label: "RPOs", blurb: "Run-pass options attack the second level on schedule.", offPlan: { pers: "11", strat: "neutral" }, adj: { TE1: 2, WR2: 1, RB1: 1, QB: 1, WR1: -1 }, matchupAxis: "front", autoTrigger: { cond: "trailing-one-score", strat: "neutral" }, halftimeEligible: true }, { id: "ground-pound", label: "Ground & Pound", blurb: "Heavy personnel, the run game sets the terms.", offPlan: { pers: "21", strat: "run" }, adj: { RB1: 3, RB2: 2, FB: 2, TE1: 1, WR1: -2, WR3: -1 }, matchupAxis: "front", autoTrigger: { cond: "trailing-big", strat: "run" }, halftimeEligible: true }, { id: "spread", label: "Spread", blurb: "Four and five wide: disperse the targets, attack the weakest cover man.", offPlan: { pers: "11", strat: "pass" }, adj: { WR3: 2, WR4: 1, TE2: 2, RB2: 1, WR1: -1, TE1: -1 }, matchupAxis: "cov", autoTrigger: { cond: "trailing-one-score", strat: "pass" }, halftimeEligible: false }], We = "v1-5f";
function w(t) {
  const s = ft.find((e) => e.id === t);
  if (!s) throw new Error(`unknown focus: ${t}`);
  return s;
}
function Me(t) {
  return w(t).halftimeEligible;
}
function ht(t, s) {
  const n = (s === "cov" ? ["CB1", "CB2", "FS", "SS"] : ["DE1", "DT1", "MIKE", "DT2"]).map((r) => {
    var _a;
    return (_a = t[r]) != null ? _a : 0;
  });
  return n.reduce((r, a) => r + a, 0) / n.length;
}
function Ce(t, s) {
  const n = 72 - ht(t, s);
  return Math.min(1.5, Math.max(0.5, 1 + n / 40));
}
function Le(t, s, e) {
  const n = w(t), r = n.adj[s];
  return r === void 0 ? 0 : Math.round(r * Ce(e, n.matchupAxis));
}
function De(t, s, e = "4-3") {
  return oe.map((n) => {
    const r = t[n], a = Math.round(Pe(n, e) * 100) / 100;
    return { slot: n, ovr: r, wins: a, priority: Math.round(a + Le(s, n, t)) };
  });
}
function Oe(t) {
  const s = ht(t.oppSlots, "front"), e = ht(t.oppSlots, "cov");
  return s <= e ? "rpo" : "west-coast";
}
function ye(t, s) {
  const e = [];
  t.diff <= -8 && t.diff > -17 && e.push({ key: "go-for-2", label: "Automatic: go for 2", detail: "Trailing by two scores in the 4th \u2014 conversions go for 2 regardless of focus.", appliedInSim: false }), t.diff < 0 && e.push({ key: "fourth-down-aggression", label: "Automatic: aggressive fourth downs", detail: "Trailing in the 4th \u2014 difficult fourth downs are played, not punted.", appliedInSim: false });
  const n = w(s);
  return (n.autoTrigger.cond === "trailing-big" ? t.diff <= -14 : t.diff <= -8 && t.diff > -14) && e.push({ key: "strat-override", label: `Automatic: ${n.autoTrigger.strat} tendency`, detail: `Q4 situation overrides the plan (${n.label} trigger) \u2014 the sim re-runs with the override.`, appliedInSim: true }), e;
}
function Ae(t) {
  return t >= 1 ? "hot" : t <= -1 ? "cold" : null;
}
const _e = { QB: 0.3, WR1: 1.4, WR2: -0.4, WR3: 0.2, TE1: -1.6, TE2: 0, RB1: 0.8, RB2: -1.1, FB: 0.1, OT1: 0.5, OT2: -0.2, OG1: 0, OG2: 0.2, C: -0.3, DE1: 1.1, DE2: -0.5, DT1: 0, DT2: 0.4, DL5: -0.1, MIKE: -1.2, WILL: 0.6, SAM: 0, CB1: 1.2, CB2: -0.6, CB3: 0.3, DIME: 0, FS: -0.9, SS: 0.7, K: 0.4, P: 0 }, Ie = { QB: 92, WR1: 91, WR2: 86, WR3: 79, TE1: 84, TE2: 72, TE3: 68, WR4: 70, RB1: 78, RB2: 71, FB: 62, OT1: 85, OT2: 82, OG1: 80, OG2: 78, C: 81, DE1: 76, DE2: 74, DT1: 74, DT2: 71, DL5: 69, MIKE: 78, WILL: 76, SAM: 74, CB1: 80, CB2: 77, CB3: 72, DIME: 68, FS: 79, SS: 76, K: 76, P: 70 }, Fe = { QB: 80, WR1: 82, WR2: 78, WR3: 70, TE1: 78, TE2: 70, TE3: 65, WR4: 66, RB1: 84, RB2: 76, FB: 70, OT1: 78, OT2: 76, OG1: 79, OG2: 77, C: 80, DE1: 89, DE2: 85, DT1: 87, DT2: 83, DL5: 78, MIKE: 84, WILL: 82, SAM: 80, CB1: 76, CB2: 73, CB3: 68, DIME: 65, FS: 74, SS: 72, K: 72, P: 68 };
var $e = ["<div", ' class="cards" role="radiogroup" aria-label="offensive focus">', "</div>"], Ke = ["<p", ">One change available. Current: <strong>", "</strong>.</p>"], xe = ["<div", ' class="cards">', "</div>"], Ne = ["<p", ' class="note">', "</p>"], Ge = ["<section", ' data-testid="halftime"><h2>2 \xB7 Halftime</h2><!--$-->', "<!--/--><!--$-->", '<!--/--><button class="primary" data-testid="continue">Continue</button></section>'], qe = ["<h3", ">4th-quarter automatics (fired)</h3>"], He = ["<ul", ' data-testid="fired">', "</ul>"], Qe = ["<p", ` class="note" data-testid="precedence">Precedence: the user's focus (<strong>`, "</strong>) stays selected; the automatic's tendency applies on top for the overridden plan. The user is never silently re-picked.</p>"], Ue = ["<section", ' data-testid="game"><h2>3 \xB7 The game</h2><p class="score" data-testid="score">Home <strong>', "</strong> \u2014 <strong>", '</strong> Away<span class="tag">Q4-start diff <!--$-->', "<!--/--></span></p><!--$-->", '<!--/--><h3>Box score</h3><table class="box"><thead><tr><th></th><th>Rush yds</th><th>Pass yds</th><th>Plays</th><th>Give</th><th>Take</th><th>Sacks</th></tr></thead><tbody><tr><th>Home</th><td>', "</td><td>", "</td><td>", "</td><td>", "</td><td>", "</td><td>", "</td></tr><tr><th>Away</th><td>", "</td><td>", "</td><td>", "</td><td>", "</td><td>", "</td><td>", "</td></tr></tbody></table></section>"], je = ["<main", '><h1>Framework Test \u2014 Offensive Focus <span class="tag">SolidStart \xB7 focus <!--$-->', '<!--/--></span></h1><section data-testid="setup"><h2>1 \xB7 Pre-game</h2><label class="manage"><input type="checkbox"', ' data-testid="manage-toggle">Manage focus (off = auto \u2014 the engine picks, no halftime prompt)</label><!--$-->', '<!--/--><button class="primary" data-testid="kickoff">Kickoff</button></section><!--$-->', '<!--/--><section data-testid="board"><h2>The draft board <span class="tag">focus: <!--$-->', '<!--/--></span></h2><p class="law">Wins are the static truth \u2014 the focus moves Priority only.</p><table><thead><tr><th>Slot</th><th>OVR</th><th>Wins</th><th>Priority</th><th>Form</th></tr></thead><tbody>', "</tbody></table></section><!--$-->", "<!--/--></main>"], Ve = ["<p", ' data-testid="auto-pick">Auto mode \u2014 the engine picks: <strong>', "</strong></p>"], Ye = ["<button", ' class="', '" data-testid="', '"><strong>', "</strong><span>", "</span></button>"], ze = ["<p", ' data-testid="no-halftime">Auto mode \u2014 no halftime prompt<!--$-->', "<!--/-->.</p>"], Je = ["<button", ' class="', '" data-testid="', '">', "</button>"], Xe = ["<span", ' class="', '"', ' aria-label="', '"></span>'], Ze = ["<tr", ' data-testid="', '"><td>', "</td><td>", "</td><td>", '</td><td class="priority" data-testid="', '">', "</td><td>", "</td></tr>"], ts = ["<p", ' data-testid="no-automatics">No automatics fired (Q4-start diff <!--$-->', "<!--/-->); the layer would return <!--$-->", "<!--/--> decision(s) at this state.</p>"], es = ["<span", ' class="tag">reported to the engine layer</span>'], ss = ["<li", "><strong>", "</strong> \u2014 <!--$-->", "<!--/--><!--$-->", "<!--/--></li>"];
const Ft = Ie, ns = Fe;
function as() {
  const [t, s] = createSignal(false), [e, n] = createSignal("west-coast"), [r, a] = createSignal("pregame"), [c, W] = createSignal(null), [m, F] = createSignal(false), [T, M] = createSignal(true), [R, Y] = createSignal(""), p = createMemo(() => t() ? e() : Oe({ oppSlots: ns })), C = createMemo(() => De(Ft, p()).filter((i) => i.wins > 0).sort((i, k) => k.priority - i.priority || k.wins - i.wins)), y = () => ft.filter((i) => Me(i.id)).map((i) => i.id), S = createMemo(() => c() ? c().focusLog : []), z = createMemo(() => c() ? ye({ diff: c().q4StartDiff }, p()) : []), $ = createMemo(() => S().some((i) => i.key === "strat-override") && w(p()).offPlan.strat !== "pass"), b = (i) => {
    var _a;
    return Ae((_a = _e[i]) != null ? _a : 0);
  };
  return ssr(je, ssrHydrationKey(), escape(We), ssrAttribute("checked", t(), true), escape(createComponent(Show, { get when() {
    return t();
  }, get fallback() {
    return ssr(Ve, ssrHydrationKey(), escape(w(p()).label));
  }, get children() {
    return ssr($e, ssrHydrationKey(), escape(createComponent(For, { each: ft, children: (i) => ssr(Ye, ssrHydrationKey(), `card ${e() === i.id ? "selected" : ""}`, `focus-${escape(i.id, true)}`, escape(i.label), escape(i.blurb)) })));
  } })), escape(createComponent(Show, { get when() {
    return r() !== "pregame";
  }, get children() {
    return ssr(Ge, ssrHydrationKey(), escape(createComponent(Show, { get when() {
      return memo(() => !!(t() && !m() && r() === "halftime"))() && y().includes(p());
    }, get fallback() {
      return ssr(ze, ssrHydrationKey(), m() ? " (change used)" : "");
    }, get children() {
      return [ssr(Ke, ssrHydrationKey(), escape(w(p()).label)), ssr(xe, ssrHydrationKey(), escape(createComponent(For, { get each() {
        return y();
      }, children: (i) => ssr(Je, ssrHydrationKey(), `card ${i === p() ? "selected" : ""}`, `halftime-${escape(i, true)}`, escape(w(i).label)) })))];
    } })), escape(createComponent(Show, { get when() {
      return R();
    }, get children() {
      return ssr(Ne, ssrHydrationKey(), escape(R()));
    } })));
  } })), escape(w(p()).label), escape(createComponent(For, { get each() {
    return C();
  }, children: (i) => ssr(Ze, ssrHydrationKey(), `row-${escape(i.slot, true)}`, escape(i.slot), escape(Ft[i.slot]), escape(i.wins.toFixed(2)), `priority-${escape(i.slot, true)}`, escape(i.priority), escape(createComponent(Show, { get when() {
    return b(i.slot);
  }, get children() {
    return ssr(Xe, ssrHydrationKey(), `arrow ${escape(b(i.slot), true)}`, ssrAttribute("title", escape(b(i.slot), true), false), `form: ${escape(b(i.slot), true)}`);
  } }))) })), escape(createComponent(Show, { get when() {
    return c();
  }, get children() {
    return ssr(Ue, ssrHydrationKey(), escape(c().result.homeScore), escape(c().result.awayScore), escape(c().q4StartDiff), escape(createComponent(Show, { get when() {
      return S().length > 0;
    }, get fallback() {
      return ssr(ts, ssrHydrationKey(), escape(c().q4StartDiff), escape(z().length));
    }, get children() {
      return [ssr(qe, ssrHydrationKey()), ssr(He, ssrHydrationKey(), escape(createComponent(For, { get each() {
        return S();
      }, children: (i) => ssr(ss, ssrHydrationKey(), escape(i.label), escape(i.detail), escape(createComponent(Show, { get when() {
        return !i.appliedInSim;
      }, get children() {
        return ssr(es, ssrHydrationKey());
      } }))) }))), createComponent(Show, { get when() {
        return $();
      }, get children() {
        return ssr(Qe, ssrHydrationKey(), escape(w(p()).label));
      } })];
    } })), escape(c().result.stats.home.rush), escape(c().result.stats.home.pass), escape(c().result.stats.home.plays), escape(c().result.stats.home.giveaways), escape(c().result.stats.home.takeaways), escape(c().result.stats.home.sacksTaken), escape(c().result.stats.away.rush), escape(c().result.stats.away.pass), escape(c().result.stats.away.plays), escape(c().result.stats.away.giveaways), escape(c().result.stats.away.takeaways), escape(c().result.stats.away.sacksTaken));
  } })));
}

export { as as default };
//# sourceMappingURL=ssr.mjs.map
