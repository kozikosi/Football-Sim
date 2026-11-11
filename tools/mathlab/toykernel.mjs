// toykernel.mjs - READ-ONLY prototype for the engine-design note (11 Nov 2026). Touches no engine file.
// It tests two claims about a play-level engine built as ONE model with TWO views:
//   (1) SOLVER VIEW: the value of a rating point is the exact derivative of a solved game-state value function (no noise);
//   (2) COUPLED SIMULATOR: draws keyed by (game, play index, purpose) and mapped by inverse CDF make paired-world pricing
//       far less noisy than a sequential stream that consumes a variable number of draws per play.
// ALL PARAMETERS ARE TOY (illustrative, NOT calibrated to football). Only the RATIOS between estimators mean anything.
// Model: next-score value (net points to the team with the ball until the next score), 4 downs, 20 distances, 99 yard lines.
// Gaps gp / gr are "pass" and "run" matchup gaps in log-odds-like units (offense minus defense). Team A's pass gap is the knob.
import { performance } from 'node:perf_hooks';

const sg = (x) => 1 / (1 + Math.exp(-x));
const DN = 4, DM = 20, YL = 99;
const idx = (d, m, y) => ((d * (DM + 1)) + m) * (YL + 1) + y;

// ---------- tables from a gap pair ----------
function geom(m, start, lo, hi, w, out) {          // add w * geometric(mean m) starting at `start` into pmf over [lo,hi]
  const q = Math.exp(-1 / m);
  let tot = 0;
  for (let k = 0; start + k <= hi; k++) { const p = (1 - q) * q ** k; out[start + k - lo] += w * p; tot += p; }
  out[hi - lo] += w * (1 - tot);                   // tail mass to the cap
}
function tables(g) {
  const compPmf = new Float64Array(99), runPmf = new Float64Array(103);   // comp yards 1..99 ; run yards -3..99
  const s = Math.exp(0.012 * g.p);
  geom(7 * s, 1, 1, 99, 0.88, compPmf); geom(25 * s, 1, 1, 99, 0.12, compPmf);
  const r = Math.exp(0.015 * g.r);
  for (let y = -3; y <= 0; y++) runPmf[y + 3] += 0.17 / 4;
  geom(4 * r, 1, -3, 99, 0.78, runPmf); geom(18 * r, 5, -3, 99, 0.05, runPmf);
  const cdf = (p) => { const c = new Float64Array(p.length); let a = 0; for (let i = 0; i < p.length; i++) { a += p[i]; c[i] = a; } return c; };
  return {
    pSack: sg(-2.67 - 0.03 * g.p), pInt: sg(-3.45 - 0.03 * g.p), pComp: sg(0.55 + 0.04 * g.p), pFum: sg(-4.4 - 0.02 * g.r),
    compPmf, runPmf, compCdf: cdf(compPmf), runCdf: cdf(runPmf), runMax: Math.max(...runPmf), compMax: Math.max(...compPmf),
  };
}
const pPass = (d, m) => Math.min(0.9, Math.max(0.3, 0.35 + 0.04 * m + (d >= 2 ? 0.2 : 0)));
const pFG = (yl) => sg(3.4 - 0.075 * (yl + 17 - 20));
const oppYl = (yl) => Math.min(YL, Math.max(1, 100 - yl));
const fd = (yl) => ({ d: 0, m: Math.min(10, yl), y: yl });
// 4th-down policy (fixed): FG inside 36, go for it on 4th and <=2 inside 55, else punt (net 40, touchback to the 20)
const fourth = (m, yl) => (yl <= 36 ? 'fg' : (m <= 2 && yl <= 55 ? 'go' : 'punt'));
const puntSpot = (yl) => { const yy = yl - 40; return yy <= 0 ? 80 : 100 - yy; };   // opponent's yards-to-goal after the punt

// ---------- SOLVER VIEW: value iteration over both teams ----------
function solve(gA, gB, warm) {
  const T = { A: tables(gA), B: tables(gB) };
  const V = warm ?? { A: new Float64Array(DN * (DM + 1) * (YL + 1)), B: new Float64Array(DN * (DM + 1) * (YL + 1)) };
  const other = { A: 'B', B: 'A' };
  let sweeps = 0, delta = 1;
  while (delta > 1e-9 && sweeps < 3000) {
    delta = 0; sweeps++;
    for (const X of ['A', 'B']) {
      const Y = other[X], t = T[X], VX = V[X], VY = V[Y];
      const turnover = (yl) => { const o = fd(oppYl(yl)); return -VY[idx(o.d, o.m, o.y)]; };
      for (let d = 0; d < DN; d++) for (let m = 1; m <= DM; m++) for (let yl = 1; yl <= YL; yl++) {
        if (m > yl) continue;                       // distance cannot exceed yards to goal
        // value of landing at (yards gained y) from this state, continuing the drive
        const after = (y) => {
          if (y >= yl) return 7;
          const ny = Math.min(YL, yl - y);
          if (y >= m) { const f = fd(ny); return VX[idx(f.d, f.m, f.y)]; }
          if (d === 3) return turnover(ny);
          return VX[idx(d + 1, Math.min(DM, Math.min(ny, m - y)), ny)];
        };
        let v;
        if (d === 3 && fourth(m, yl) !== 'go') {
          if (fourth(m, yl) === 'fg') { const p = pFG(yl); v = p * 3 + (1 - p) * turnover(Math.min(YL, yl + 7)); }
          else { const f = fd(Math.min(YL, Math.max(1, puntSpot(yl)))); v = -VY[idx(f.d, f.m, f.y)]; }
        } else {
          let ev = 0;
          const pp = pPass(d, m);
          // pass
          let pass = 0;
          const loss = 7; for (let L = 4; L <= 10; L++) pass += t.pSack / loss * after(-L);
          const nb = 1 - t.pSack;
          pass += nb * t.pInt * turnover(yl);
          const nc = nb * (1 - t.pInt);
          pass += nc * (1 - t.pComp) * after(0);
          for (let y = 1; y <= 99; y++) if (t.compPmf[y - 1] > 0) pass += nc * t.pComp * t.compPmf[y - 1] * after(y);
          // run
          let run = t.pFum * turnover(yl);
          for (let y = -3; y <= 99; y++) { const pr = t.runPmf[y + 3]; if (pr > 0) run += (1 - t.pFum) * pr * after(y); }
          ev = pp * pass + (1 - pp) * run;
          v = ev;
        }
        const i = idx(d, m, yl); const dd = Math.abs(v - VX[i]); if (dd > delta) delta = dd; VX[i] = v;
      }
    }
  }
  return { V, sweeps };
}
const START = idx(0, 10, 75);   // A has the ball: 1st and 10 at its own 25

// ---------- SIMULATOR VIEW ----------
function mix32(h) { h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return h >>> 0; }
const TAG = { call: 1, a: 2, b: 3, c: 4, y: 5, k: 6, L: 7 };
const keyedU = (chain) => (play, tag) => mix32(mix32(chain ^ 0x9e3779b9) + Math.imul(play + 1, 0x27d4eb2f) + Math.imul(TAG[tag], 0x165667b1)) / 4294967296;
function seqU(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function inv(cdf, u) { let lo = 0, hi = cdf.length - 1; while (lo < hi) { const mid = (lo + hi) >> 1; if (cdf[mid] >= u) hi = mid; else lo = mid + 1; } return lo; }

// mode 'keyed': one keyed uniform per decision, inverse CDF.  mode 'seq': one shared stream; yards by rejection sampling
// (a natural way to write it, consumes a VARIABLE number of draws), so any branch difference shifts every later draw.
function chain(gA, gB, tabs, mode, seedOrKey) {
  const keyed = mode === 'keyed', U = keyed ? keyedU(seedOrKey) : null, S = keyed ? null : seqU(seedOrKey);
  const u = (p, tag) => (keyed ? U(p, tag) : S());
  const yardsOf = (pmf, cdf, pmax, lo, p) => {
    if (keyed) return inv(cdf, U(p, 'y')) + lo;
    for (;;) { const c = Math.floor(S() * pmf.length); if (S() * pmax < pmf[c]) return c + lo; }
  };
  let team = 'A', d = 0, m = 10, yl = 75;
  for (let p = 0; p < 400; p++) {
    const t = tabs[team], sign = team === 'A' ? 1 : -1;
    const flip = (ny) => { team = team === 'A' ? 'B' : 'A'; const f = fd(oppYl(ny)); d = f.d; m = f.m; yl = f.y; };
    if (d === 3 && fourth(m, yl) !== 'go') {
      if (fourth(m, yl) === 'fg') { if (u(p, 'k') < pFG(yl)) return sign * 3; flip(Math.min(YL, yl + 7)); }
      else { const ps = puntSpot(yl); team = team === 'A' ? 'B' : 'A'; const f = fd(Math.min(YL, Math.max(1, ps))); d = f.d; m = f.m; yl = f.y; }
      continue;
    }
    let y = null, to = false;
    if (u(p, 'call') < pPass(d, m)) {
      if (u(p, 'a') < t.pSack) y = -(4 + Math.floor(u(p, 'L') * 7));
      else if (u(p, 'b') < t.pInt) to = true;
      else if (u(p, 'c') < t.pComp) y = yardsOf(t.compPmf, t.compCdf, t.compMax, 1, p);
      else y = 0;
    } else {
      if (u(p, 'a') < t.pFum) to = true; else y = yardsOf(t.runPmf, t.runCdf, t.runMax, -3, p);
    }
    if (to) { flip(yl); continue; }
    if (y >= yl) return sign * 7;
    const ny = Math.min(YL, yl - y);
    if (y >= m) { const f = fd(ny); d = f.d; m = f.m; yl = f.y; }
    else if (d === 3) { flip(ny); }
    else { d += 1; m = Math.min(DM, Math.min(ny, m - y)); yl = ny; }
  }
  return 0;
}

// ---------- experiment ----------
const EPS = 2;                       // pass-gap bump, central difference over +-EPS
const g0 = { p: 0, r: 0 }, gUp = { p: EPS, r: 0 }, gDn = { p: -EPS, r: 0 };
let t0 = performance.now();
const sol0 = solve(g0, g0), solUp = solve(gUp, g0, { A: sol0.V.A.slice(), B: sol0.V.B.slice() }), solDn = solve(gDn, g0, { A: sol0.V.A.slice(), B: sol0.V.B.slice() });
const q0 = sol0.V.A[START], dpDeriv = (solUp.V.A[START] - solDn.V.A[START]) / (2 * EPS);
console.log(`SOLVER  value of A at 1st&10 own 25 = ${q0.toFixed(4)} net pts to next score; d/d(pass gap) = ${dpDeriv.toFixed(5)}  (sweeps ${sol0.sweeps}/${solUp.sweeps}/${solDn.sweeps}, ${((performance.now() - t0) / 1000).toFixed(1)}s, no noise)`);

const tab = { 0: { A: tables(g0), B: tables(g0) }, up: { A: tables(gUp), B: tables(g0) }, dn: { A: tables(gDn), B: tables(g0) } };
const N = 4000, R = 60;
const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length, sd = (a) => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); };
// sanity: simulator mean equals solver value (they must be the same model)
{ const xs = []; for (let i = 0; i < 200000; i++) xs.push(chain(g0, g0, tab[0], 'keyed', i * 2654435761 >>> 0)); const se = sd(xs) / Math.sqrt(xs.length);
  console.log(`CHECK   simulator mean at neutral = ${mean(xs).toFixed(4)} +- ${se.toFixed(4)} (solver ${q0.toFixed(4)}; z = ${((mean(xs) - q0) / se).toFixed(2)})`); }
const est = { 'unpaired sequential': [], 'paired sequential (variable draws)': [], 'paired keyed + inverse CDF': [] };
t0 = performance.now();
for (let r = 0; r < R; r++) {
  let sU = 0, sD = 0, pS = 0, pK = 0;
  for (let i = 0; i < N; i++) {
    const s = (r * N + i + 1) * 40503 >>> 0, s2 = (r * N + i + 1) * 69069 + 12345 >>> 0;
    sU += chain(gUp, g0, tab.up, 'seq', s); sD += chain(gDn, g0, tab.dn, 'seq', s2);        // different seeds per world
    pS += chain(gUp, g0, tab.up, 'seq', s) - chain(gDn, g0, tab.dn, 'seq', s);             // same seed, sequential
    pK += chain(gUp, g0, tab.up, 'keyed', s) - chain(gDn, g0, tab.dn, 'keyed', s);         // same key, inverse CDF
  }
  est['unpaired sequential'].push((sU - sD) / N / (2 * EPS)); est['paired sequential (variable draws)'].push(pS / N / (2 * EPS)); est['paired keyed + inverse CDF'].push(pK / N / (2 * EPS));
}
console.log(`MC      ${R} replicates x ${N} chains per world (${((performance.now() - t0) / 1000).toFixed(0)}s); target d/d(pass gap) = ${dpDeriv.toFixed(5)}`);
const base = sd(est['unpaired sequential']) ** 2;
for (const [k, v] of Object.entries(est)) console.log(`  ${k.padEnd(36)} mean ${mean(v).toFixed(5)}  sd across replicates ${sd(v).toFixed(5)}  variance ratio vs unpaired ${(base / sd(v) ** 2).toFixed(1)}x`);
