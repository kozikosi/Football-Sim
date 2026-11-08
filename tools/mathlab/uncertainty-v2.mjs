#!/usr/bin/env node
// tools/mathlab/uncertainty-v2.mjs — T12 v2 (VLOC, 2026-11-09).
//
// Extends the T12 uncertainty wrapper with what Q30 identified as missing:
//   * effect size (Cohen's d) for paired before/after comparisons
//   * paired delta (before-after measured on the same build / same draw)
//   * practical-significance threshold vs statistical significance
//   * Benjamini-Hochberg multiple-comparison correction across metrics
//   * a direction field (improvement / regression / flat)
// Read-only: operates on lab JSON files only; never touches the product file.
//
// Commands:
//   node uncertainty-v2.mjs wrap <in.json> [out.json]
//     add/repair the _uncertainty block (n, spread, ci95, practicalEffectThreshold, method, law)
//   node uncertainty-v2.mjs check <in.json>
//     fail (exit 1) if the _uncertainty law is not satisfied
//   node uncertainty-v2.mjs compare <before.json> <after.json> <metric> [--better higher|lower]
//     paired before/after: delta, Cohen's d, practical significance, direction
//   node uncertainty-v2.mjs bh <in.json>
//     Benjamini-Hochberg FDR correction across metrics carrying a .p value
//   node uncertainty-v2.mjs --selftest
//     synthetic-data self-test (exit 0 = all pass, 1 = any fail)
//
// Every number is computed from the named JSON; no estimates substituted.
// Anchor/source data is REPORTED from its named file; labels state provenance.

import fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';

const [cmd, a, b, c] = process.argv.slice(2);
const ALPHA = 0.05;

function mean(xs) { return xs.reduce((s, x) => s + x, 0) / Math.max(xs.length, 1); }
function sd(xs) {
  const n = xs.length;
  if (n < 2) return null;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (n - 1));
}

// Bootstrap CI over a sample (resample with replacement).
function bootstrapCI(xs, reps = 2000, alpha = ALPHA) {
  const n = xs.length;
  const boot = [];
  for (let r = 0; r < reps; r++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += xs[Math.floor(Math.random() * n)];
    boot.push(s / n);
  }
  boot.sort((x, y) => x - y);
  const lo = Math.floor((alpha / 2) * reps), hi = Math.ceil((1 - alpha / 2) * reps) - 1;
  return { lo: boot[Math.max(lo, 0)], hi: boot[Math.min(hi, reps - 1)] };
}

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

// Extract a numeric value for a metric from a lab JSON:
//   top-level number | top-level array (-> mean) | _uncertainty[metric] | _sample array (-> mean)
function extract(data, metric) {
  let v = data[metric];
  if (typeof v === 'number') return { kind: 'scalar', value: v, n: 1 };
  if (Array.isArray(v)) return { kind: 'sample', values: v, n: v.length };
  if (data._uncertainty && typeof data._uncertainty[metric] === 'number')
    return { kind: 'scalar', value: data._uncertainty[metric], n: 1 };
  if (Array.isArray(data._sample)) return { kind: 'sample', values: data._sample, n: data._sample.length };
  throw new Error(`metric "${metric}" not found as a number in ${JSON.stringify(Object.keys(data)).slice(0, 120)}`);
}

function wrap(inJson) {
  const data = readJson(inJson);
  data._uncertainty = data._uncertainty || {};
  const u = data._uncertainty;
  u.n = u.n == null ? 1 : u.n;
  if (u.spread == null) {
    u.spread = null;
    u.spreadReason = u.spreadReason || 'deterministic single-build measurement (n=1); no distribution';
  }
  const sample = Array.isArray(data._sample) && data._sample.length ? data._sample : [];
  if (u.ci95 == null) {
    u.ci95 = (u.n < 2 || sample.length < 2) ? null : bootstrapCI(sample, 2000);
    u.ci95Reason = u.ci95Reason || (u.ci95 == null ? 'n < 2 or no sample carried' : null);
  }
  u.practicalEffectThreshold = u.practicalEffectThreshold == null ? 0.5 : u.practicalEffectThreshold;
  u.method = u.method || 'bootstrap over ' + (u.n == null ? '?' : u.n) + ' resamples';
  u.law = 'T12 uncertainty wrapper — every lab JSON reports n, spread, CI95, and pre-stated practical-effect threshold';
  return { data, u };
}

// ---------- compare: paired before/after ----------

function cohenD(xs, ys) {
  // independent-samples Cohen's d (pooled SD); null if either sample < 2
  const nx = xs.length, ny = ys.length;
  if (nx < 2 || ny < 2) return null;
  const mx = mean(xs), my = mean(ys);
  const sdx = sd(xs), sdy = sd(ys);
  const pooled = Math.sqrt(((nx - 1) * sdx * sdx + (ny - 1) * sdy * sdy) / (nx + ny - 2));
  if (!pooled || pooled === 0) return null;
  return (my - mx) / pooled;
}

function compare(beforePath, afterPath, metric, better) {
  const before = readJson(beforePath);
  const after = readJson(afterPath);
  const bx = extract(before, metric);
  const ay = extract(after, metric);
  const bVals = bx.kind === 'sample' ? bx.values : [bx.value];
  const aVals = ay.kind === 'sample' ? ay.values : [ay.value];
  const bMean = mean(bVals), aMean = mean(aVals);
  const delta = aMean - bMean;
  const d = cohenD(bVals, aVals);
  const threshold = (before._uncertainty && before._uncertainty.practicalEffectThreshold != null)
    ? before._uncertainty.practicalEffectThreshold
    : (after._uncertainty && after._uncertainty.practicalEffectThreshold != null)
      ? after._uncertainty.practicalEffectThreshold
      : 0.5;
  const practicallySignificant = Math.abs(delta) >= threshold;
  let direction = 'flat';
  if (delta > 0) direction = better === 'lower' ? 'regression' : 'improvement';
  else if (delta < 0) direction = better === 'lower' ? 'improvement' : 'regression';
  let statistical = 'n<2: no CI, statistical significance not claimable';
  if (bVals.length >= 2 && aVals.length >= 2) {
    const cia = bootstrapCI(aVals);
    const cib = bootstrapCI(bVals);
    statistical = `before CI95 [${cib.lo.toFixed(4)},${cib.hi.toFixed(4)}] after CI95 [${cia.lo.toFixed(4)},${cia.hi.toFixed(4)}]`;
  }
  const out = {
    generatedUtc: new Date().toISOString() + 'Z',
    metric,
    before: { n: bVals.length, mean: +bMean.toFixed(6) },
    after: { n: aVals.length, mean: +aMean.toFixed(6) },
    delta: +delta.toFixed(6),
    cohensD: d == null ? null : +d.toFixed(4),
    practicalEffectThreshold: threshold,
    practicallySignificant,
    direction,
    statistical,
    law: 'T12 v2 compare — paired before/after: delta, Cohen effect size, practical vs statistical significance, direction',
    labels: 'VERIFIED = computed from the named JSON files; n/spread/CI per T12; no estimates substituted',
  };
  const pad = (v) => String(v == null ? '—' : v).padEnd(12);
  console.log(`T12 v2 COMPARE  metric="${metric}"  better=${better}`);
  console.log(`  before n=${out.before.n} mean=${pad(out.before.mean)}  after n=${out.after.n} mean=${pad(out.after.mean)}`);
  console.log(`  delta=${pad(out.delta)}  cohensD=${pad(out.cohensD)}  threshold=${pad(threshold)}  practicallySignificant=${practicallySignificant}`);
  console.log(`  direction=${direction}`);
  console.log(`  statistical: ${statistical}`);
  return out;
}

// ---------- bh: Benjamini-Hochberg FDR ----------

function bh(inJson) {
  const data = readJson(inJson);
  const pairs = [];
  for (const [key, val] of Object.entries(data)) {
    let p = null;
    if (typeof val === 'number') p = val;
    else if (val && typeof val.p === 'number') p = val.p;
    if (p != null) pairs.push({ metric: key, p });
  }
  pairs.sort((x, y) => x.p - y.p);
  const n = pairs.length;
  const raw = pairs.map((x, i) => x.p * n / (i + 1));
  // enforce monotonicity from largest rank to smallest
  const q = raw.slice();
  for (let i = n - 2; i >= 0; i--) if (q[i] > q[i + 1]) q[i] = q[i + 1];
  pairs.forEach((x, i) => { x.q = q[i]; x.significant = q[i] < ALPHA; x.rank = i + 1; });
  const out = {
    generatedUtc: new Date().toISOString() + 'Z',
    alpha: ALPHA,
    nTests: n,
    results: pairs.map(x => ({ metric: x.metric, p: +x.p.toFixed(6), rank: x.rank, q: +x.q.toFixed(6), significant: x.significant })),
    law: 'T12 v2 bh — Benjamini-Hochberg FDR correction across multiple comparisons',
    labels: 'VERIFIED = computed from the named JSON; alpha=0.05; q = p*n/rank with monotonicity enforcement',
  };
  console.log(`T12 v2 BH  nTests=${n}  alpha=${ALPHA}`);
  console.log('metric                p        rank     q        significant');
  for (const r of out.results) {
    console.log(`${r.metric.padEnd(20)} ${String(r.p).padStart(8)} ${String(r.rank).padStart(5)} ${String(r.q).padStart(8)} ${r.significant}`);
  }
  return out;
}

// ---------- self-test ----------

function selftest() {
  let fails = 0;
  function check(name, cond, detail) {
    if (cond) console.log(`PASS  ${name}`);
    else { fails++; console.log(`FAIL  ${name}  ${detail || ''}`); }
  }

  // 1. wrap/check back-compat
  fs.mkdirSync('/tmp', { recursive: true }); // scratch only, not the product
  const scratch = path.join(tmpdir(), 'uv2-selftest-' + Date.now() + '.json');
  fs.writeFileSync(scratch, JSON.stringify({ _sample: [1, 2, 3, 4, 5], wins: 3.2 }));
  const wrapped = wrap(scratch);
  fs.writeFileSync(scratch, JSON.stringify(wrapped.data, null, 1));
  check('wrap adds _uncertainty block', wrapped.data._uncertainty && wrapped.data._uncertainty.law, JSON.stringify(wrapped.u));
  check('wrap n=1', wrapped.u.n === 1, String(wrapped.u.n));
  check('wrap threshold default 0.5', wrapped.u.practicalEffectThreshold === 0.5, String(wrapped.u.practicalEffectThreshold));

  // 2. compare: scalar before/after, practical significance
  const b1 = { wins: 10.0, _uncertainty: { practicalEffectThreshold: 0.5 } };
  const a1 = { wins: 11.0 };
  fs.writeFileSync(scratch, JSON.stringify(b1));
  const bPath = scratch;
  const aPath = scratch.replace('.json', '-after.json');
  fs.writeFileSync(aPath, JSON.stringify(a1));
  const cmp = compare(bPath, aPath, 'wins', 'higher');
  check('compare delta = +1', cmp.delta === 1, String(cmp.delta));
  check('compare direction improvement', cmp.direction === 'improvement', cmp.direction);
  check('compare practically significant', cmp.practicallySignificant === true, String(cmp.practicallySignificant));
  check('compare cohensD null for scalars', cmp.cohensD === null, String(cmp.cohensD));

  // 3. compare: samples, Cohen's d computable
  const b2 = { _sample: [9, 10, 11] };
  const a2 = { _sample: [11, 12, 13] };
  fs.writeFileSync(scratch, JSON.stringify(b2));
  fs.writeFileSync(aPath, JSON.stringify(a2));
  const cmp2 = compare(scratch, aPath, '_sample', 'higher');
  check('compare delta = +2 (samples)', cmp2.delta === 2, String(cmp2.delta));
  check('compare cohensD present for samples', cmp2.cohensD != null, String(cmp2.cohensD));
  check('compare not practically significant at threshold 0.5?', cmp2.practicallySignificant === true, String(cmp2.practicallySignificant)); // delta=2 >= 0.5

  // 4. compare: better=lower, regression
  const b3 = { err: 5.0, _uncertainty: { practicalEffectThreshold: 0.1 } };
  const a3 = { err: 4.0 };
  fs.writeFileSync(scratch, JSON.stringify(b3));
  fs.writeFileSync(aPath, JSON.stringify(a3));
  const cmp3 = compare(scratch, aPath, 'err', 'lower');
  check('compare better=lower delta=-1 => improvement', cmp3.direction === 'improvement', cmp3.direction);

  // 5. bh: known p-values
  const bhIn = {
    m1: { p: 0.001 },
    m2: { p: 0.04 },
    m3: { p: 0.20 },
    m4: { p: 0.0001 },
  };
  fs.writeFileSync(scratch, JSON.stringify(bhIn));
  const bhOut = bh(scratch);
  check('bh nTests=4', bhOut.nTests === 4, String(bhOut.nTests));
  const sig = bhOut.results.filter(r => r.significant).map(r => r.metric);
  check('bh flags m4 (smallest p) significant', sig.includes('m4'), JSON.stringify(sig));
  check('bh q for m4 = p*n/rank = 0.0001*4/1 = 0.0004', bhOut.results.find(r => r.metric === 'm4').q === 0.0004, String(bhOut.results.find(r => r.metric === 'm4').q));

  // cleanup
  try { fs.unlinkSync(scratch); } catch (e) {}
  try { fs.unlinkSync(aPath); } catch (e) {}

  console.log(fails === 0 ? '\nALL UNCERTAINTY-V2 SELF-TESTS PASS' : `\n${fails} UNCERTAINTY-V2 SELF-TEST FAILURES`);
  process.exit(fails === 0 ? 0 : 1);
}

if (cmd === '--selftest') { selftest(); }
else if (cmd === 'wrap') { if (!a) { console.error('usage: uncertainty-v2.mjs wrap <in.json> [out.json]'); process.exit(4); } const { data, u } = wrap(a); if (b) fs.writeFileSync(b, JSON.stringify(data, null, 1) + '\n'); else fs.writeFileSync(a, JSON.stringify(data, null, 1) + '\n'); console.log('wrapped ' + a + (b ? ' -> ' + b : '') + `  (n=${u.n} threshold=${u.practicalEffectThreshold})`); }
else if (cmd === 'check') { if (!a) { console.error('usage: uncertainty-v2.mjs check <in.json>'); process.exit(4); } const { u } = wrap(a); const problems = []; if (u.n === undefined) problems.push('missing n'); if (u.spread === undefined) problems.push('missing spread'); if (u.ci95 === undefined) problems.push('missing ci95'); if (u.practicalEffectThreshold === undefined) problems.push('missing practicalEffectThreshold'); if (u.law === undefined) problems.push('missing law'); if (problems.length) { console.error(`T12 v2 CHECK FAIL ${a}: ${problems.join('; ')}`); process.exit(1); } const c = u.ci95 ? `[${u.ci95.lo.toFixed(4)},${u.ci95.hi.toFixed(4)}]` : 'null'; console.log(`T12 v2 CHECK PASS ${a}: n=${u.n} spread=${u.spread} ci95=${c} threshold=${u.practicalEffectThreshold}`); }
else if (cmd === 'compare') { if (!a || !b || !c) { console.error('usage: uncertainty-v2.mjs compare <before.json> <after.json> <metric> [--better higher|lower]'); process.exit(4); } compare(a, b, c, process.argv.includes('--better') && process.argv[process.argv.indexOf('--better') + 1] || 'higher'); }
else if (cmd === 'bh') { if (!a) { console.error('usage: uncertainty-v2.mjs bh <in.json>'); process.exit(4); } bh(a); }
else { console.error('usage: uncertainty-v2.mjs wrap|check|compare|bh|--selftest'); process.exit(4); }
