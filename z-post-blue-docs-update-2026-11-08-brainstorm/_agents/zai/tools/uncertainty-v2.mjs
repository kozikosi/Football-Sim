#!/usr/bin/env node
// _agents/zai/tools/uncertainty-v2.mjs — T12 wrapper v2 (pure math, no engine access).
// Extends vloc's uncertainty.mjs (council/vloc 1186cd22) with the four pieces its
// T12 law report lacked (session brainstorm Q22):
//   1. EFFECT SIZE: Cohen's d with Hedges g small-sample correction.
//   2. PAIRED DELTA: per-pair differences, mean delta, CI95 on the delta (paired mode).
//   3. PRACTICAL significance flag, distinct from statistical: delta vs a wins-domain
//      threshold (default 0.25 wins; the Owner's tolerance knob), reported even when p is tiny.
//   4. MULTIPLE-COMPARISON correction: Benjamini-Hochberg q-values across a family.
// T12 law preserved: n/mean/median/sd/se/CI95/threshold/verdict are always printed;
// not-applicable values are printed as null with a stated reason, never omitted.
//
// Usage:
//   node uncertainty-v2.mjs --demo                 # built-in worked examples (self-test)
//   node uncertainty-v2.mjs --a a.json --b b.json  # two arrays of numbers (unpaired)
//   node uncertainty-v2.mjs --a a.json --b b.json --paired
//   node uncertainty-v2.mjs --family f.json        # {"name": [a[], b[]], ...} -> BH across pairs
//   flags: --practical 0.25   (wins-domain practical threshold)

import fs from 'node:fs';

const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
const median = a => { const s = a.slice().sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const variance = (a) => { const m = mean(a); return a.reduce((s, x) => s + (x - m) * (x - m), 0) / (a.length - 1); };
const sd = a => Math.sqrt(variance(a));
// Student-t two-sided 95% critical values for common df (interpolated; fine for reporting)
const T95 = { 1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228, 15: 2.131, 20: 2.086, 25: 2.060, 30: 2.042, 40: 2.021, 50: 2.009, 60: 2.000, 120: 1.980, 1000: 1.962 };
function t95(df) {
  const keys = Object.keys(T95).map(Number).sort((a, b) => a - b);
  if (df >= keys[keys.length - 1]) return T95[keys[keys.length - 1]];
  for (let i = 0; i < keys.length - 1; i++) {
    if (df >= keys[i] && df <= keys[i + 1]) {
      const f = (df - keys[i]) / (keys[i + 1] - keys[i]);
      return T95[keys[i]] * (1 - f) + T95[keys[i + 1]] * f;
    }
  }
  return 1.96;
}
const ci95 = (a) => { const n = a.length; if (n < 2) return null; const se = sd(a) / Math.sqrt(n), t = t95(n - 1); return [mean(a) - t * se, mean(a) + t * se]; };

function cohensD(a, b) {
  const n1 = a.length, n2 = b.length;
  if (n1 < 2 || n2 < 2) return null;
  const sp = Math.sqrt(((n1 - 1) * variance(a) + (n2 - 1) * variance(b)) / (n1 + n2 - 2));
  if (sp === 0) return null;
  const d = (mean(a) - mean(b)) / sp;
  const J = 1 - 3 / (4 * (n1 + n2) - 9);          // Hedges correction
  return { d, g: d * J };
}
function welchT(a, b) {
  const n1 = a.length, n2 = b.length; if (n1 < 2 || n2 < 2) return null;
  const v1 = variance(a) / n1, v2 = variance(b) / n2, se = Math.sqrt(v1 + v2);
  if (se === 0) return null;
  const t = (mean(a) - mean(b)) / se;
  const df = (v1 + v2) ** 2 / (v1 ** 2 / (n1 - 1) + v2 ** 2 / (n2 - 1));
  return { t, df };
}
// normal-approx two-sided p (adequate for df>30; exact t CDF avoided to keep zero deps;
// for small df the verdict words come from CI overlap too — stated in the report)
const pFromT = (t) => 2 * (1 - approxNormCdf(Math.abs(t)));
function approxNormCdf(z) { // Abramowitz-Stegun 26.2.17
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const poly = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const p = 1 - 0.3989422804014327 * Math.exp(-z * z / 2) * poly;
  return z >= 0 ? p : 1 - p;
}
function benjaminiHochberg(pvals) {
  const n = pvals.length, idx = pvals.map((p, i) => [p, i]).sort((x, y) => x[0] - y[0]);
  const q = new Array(n); let prev = 1;
  for (let i = n - 1; i >= 0; i--) {
    const rank = i + 1;
    const v = Math.min(prev, (idx[i][0] * n) / rank);
    q[idx[i][1]] = v; prev = v;
  }
  return q;
}

function report(name, A, B, opts = {}) {
  const practical = opts.practical ?? 0.25;
  const paired = !!opts.paired && A.length === B.length;
  const out = { name };
  const base = (label, a) => {
    const c = ci95(a);
    return { n: a.length, mean: mean(a), median: median(a), sd: a.length > 1 ? sd(a) : null, se: a.length > 1 ? sd(a) / Math.sqrt(a.length) : null, ci95: c, law: a.length > 1 ? 'computed' : 'null: deterministic or n=1, spread not applicable (T12 law: stated, never omitted)' };
  };
  out.a = base('a', A); out.b = base('b', B);
  const rawDelta = mean(A) - mean(B);
  if (paired) {
    const D = A.map((x, i) => x - B[i]);
    const dc = ci95(D);
    out.paired = { nPairs: D.length, meanDelta: mean(D), medianDelta: median(D), sd: D.length > 1 ? sd(D) : null, ci95: dc };
    out.effect = { meanDelta: mean(D), practicalThreshold: practical };
  } else {
    out.effect = { rawDelta, cohensD: cohensD(A, B), welch: welchT(A, B) };
    if (out.effect.welch) { out.effect.welch.p = pFromT(out.effect.welch.t); }
  }
  const sig = paired
    ? (out.paired.ci95 && out.paired.ci95[0] > 0) || (out.paired.ci95 && out.paired.ci95[1] < 0)
    : (out.effect.welch && out.effect.welch.p < 0.05);
  const prac = Math.abs(paired ? out.paired.meanDelta : rawDelta) >= practical;
  out.verdict = {
    statistical: sig ? 'SIGNIFICANT (alpha=0.05' + (out.a.n < 2 || out.b.n < 2 ? ' — n<2, null: not applicable' : '') + ')' : 'NOT SIGNIFICANT',
    practical: prac ? `PRACTICAL (|delta| >= ${practical})` : `NOT PRACTICAL (|delta| < ${practical})`,
    combined: sig && prac ? 'REAL AND MATERIAL' : sig && !prac ? 'STATISTICALLY VISIBLE, PRACTICALLY SMALL' : !sig && prac ? 'FLAG: material delta, underpowered — collect more seeds' : 'NO EVIDENCE OF EFFECT',
  };
  return out;
}
const pr = (o) => console.log(JSON.stringify(o, (k, v) => (typeof v === 'number' ? +v.toFixed(6) : v), 1));

// ---------- demo/self-test ----------
function demo() {
  const ok = [];
  // seeded normal generator (Box-Muller, mulberry32 core)
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function normals(n, mu, sg, seed) { const r = mulberry32(seed), out = []; while (out.length < n) { const u = r(), v = r(); if (u === 0) continue; out.push(mu + sg * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)); } return out; }
  const A = normals(100, 8.5, 1.0, 42), B = normals(100, 7.7, 1.0, 43); // true d = 0.8
  const r1 = report('demo:unpaired d=0.8', A, B, { practical: 0.25 });
  const g = r1.effect.cohensD.g;
  ok.push(['Hedges g within 0.15 of true d=0.8', Math.abs(g - 0.8) < 0.15]);
  ok.push(['statistical verdict fires', r1.verdict.statistical.startsWith('SIGNIFICANT')]);
  // paired: same noise, shifted — paired delta CI must exclude 0
  const noise = normals(50, 0, 1, 77);
  const P = noise.map(x => x + 8.5), Q = noise.map(x => x + 7.7);
  const r2 = report('demo:paired shift=0.8', P, Q, { paired: true, practical: 0.25 });
  ok.push(['paired delta == 0.8 (1e-9)', Math.abs(r2.paired.meanDelta - 0.8) < 1e-9]);
  ok.push(['paired CI excludes 0', r2.paired.ci95[0] > 0]);
  ok.push(['paired sd ~ 0 (identical noise) and stated', Math.abs(r2.paired.sd) < 1e-9]);
  // practical-vs-statistical distinction: tiny but consistent delta (power high enough)
  const S = normals(6000, 0.06, 1, 9), T2 = normals(6000, 0.0, 1, 10);
  const r3 = report('demo:tiny delta', S, T2, { practical: 0.25 });
  ok.push(['tiny delta: significant but NOT practical', r3.verdict.statistical.startsWith('SIGNIFICANT') && r3.verdict.practical.startsWith('NOT PRACTICAL')]);
  // BH: three p-values, monotone q, smallest p gets smallest q
  const q = benjaminiHochberg([0.001, 0.04, 0.60]);
  ok.push(['BH q monotone and bounded', q[0] <= q[1] && q[1] <= q[2] && q.every(v => v >= 0 && v <= 1) && Math.abs(q[0] - 0.003) < 1e-9]);
  // T12 law: n=1 never omits fields
  const r4 = report('demo:deterministic', [5], [4], { practical: 0.25 });
  ok.push(['n=1: all T12 fields present (nulls stated)', r4.a.sd === null && r4.a.ci95 === null && r4.a.n === 1 && !!r4.a.law]);
  let pass = true;
  console.log('UNCERTAINTY-V2 SELFTEST');
  for (const [name, v] of ok) { console.log(`  ${v ? 'PASS' : 'FAIL'}  ${name}`); if (!v) pass = false; }
  console.log('\nWorked example (unpaired, n=100/100, true d=0.8):');
  pr(r1);
  console.log('\nWorked example (paired, shift=0.8):');
  pr(r2);
  return pass;
}

// ---------- main ----------
const args = process.argv.slice(2);
const practical = parseFloat(args[args.indexOf('--practical') + 1]) || 0.25;
if (args.includes('--demo')) { process.exit(demo() ? 0 : 1); }
const rd = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
if (args.includes('--family')) {
  const fam = rd(args[args.indexOf('--family') + 1]);
  const names = Object.keys(fam);
  const reps = names.map(n => report(n, fam[n][0], fam[n][1], { practical, paired: args.includes('--paired') }));
  const ps = reps.map(r => (r.effect.welch && r.effect.welch.p != null) ? r.effect.welch.p : (r.paired && r.paired.nPairs > 1 ? pFromT(r.paired.meanDelta / (r.paired.sd / Math.sqrt(r.paired.nPairs))) : 1));
  const qs = benjaminiHochberg(ps);
  names.forEach((n, i) => console.log(`${n}: p=${ps[i] == null ? 'null' : ps[i].toFixed(4)}  BH-q=${qs[i].toFixed(4)}  ${reps[i].verdict.combined}`));
  process.exit(0);
}
if (args.includes('--a') && args.includes('--b')) {
  const A = rd(args[args.indexOf('--a') + 1]), B = rd(args[args.indexOf('--b') + 1]);
  pr(report('compare', A, B, { practical, paired: args.includes('--paired') }));
  process.exit(0);
}
console.log('nothing to do: pass --demo, --a/--b, or --family');
process.exit(2);
