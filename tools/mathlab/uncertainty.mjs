// mathlab/uncertainty.mjs — T12 uncertainty wrapper (reporting law).
// Every lab JSON reports: n / mean / median / sd / se / CI95 / pre-stated practical-effect threshold / verdict.
// Exports: uncertainty(xs, opts), wrapJson(jsonPath, field, opts).
// usage: node uncertainty.mjs --selftest        (self-test on synthetic data)
//        node uncertainty.mjs <json> <field> [--threshold N] [--label L]   (report on a numeric field)
import fs from 'fs';
const z = 1.96; // 95% CI, normal approx (n>=30); t-approx fine for lab n

function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
function median(xs) { const s = [...xs].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; }
function sd(xs) { const m = mean(xs); const v = xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1); return Math.sqrt(v); }

function uncertainty(xs, opts = {}) {
  const { threshold = null, alpha = 0.05, label = '' } = opts;
  const n = xs.length;
  const result = { label, n };
  if (n < 2) { result.verdict = 'UNKNOWN'; result.reason = 'n<2'; return result; }
  const m = mean(xs); const med = median(xs); const s = sd(xs); const se = s / Math.sqrt(n);
  const zc = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645;
  const lo = m - zc * se; const hi = m + zc * se;
  result.mean = +m.toFixed(6); result.median = +med.toFixed(6); result.sd = +s.toFixed(6);
  result.se = +se.toFixed(6); result.ci95 = [+lo.toFixed(6), +hi.toFixed(6)]; result.alpha = alpha;
  if (threshold != null) { result.threshold = threshold;
    if (lo > threshold) result.verdict = 'PASS';
    else if (hi < threshold) result.verdict = 'FAIL';
    else result.verdict = 'INCONCLUSIVE';
  } else { result.verdict = 'UNKNOWN'; result.reason = 'no threshold'; }
  return result;
}

function wrapJson(jsonPath, field, opts = {}) {
  const rec = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const parts = field.split('.');
  const prop = parts[parts.length - 1];
  let target = rec;
  for (let i = 0; i < parts.length - 1; i++) { target = target == null ? undefined : target[parts[i]]; }
  let xs = [];
  if (Array.isArray(target)) {
    xs = target.map(r => r == null ? undefined : r[prop]).filter(v => typeof v === 'number' && !isNaN(v));
  } else if (typeof target === 'number' && !isNaN(target)) {
    xs = [target];
  }
  return { source: jsonPath, field, lab: prop, n: xs.length, report: uncertainty(xs, opts) };
}

if (process.argv.includes('--selftest')) {
  // synthetic: N(50, 10), n=100 → mean≈50, sd≈10, se≈1, CI95 ≈ 50±1.96
  const xs = []; const seed = 12345; let s = seed;
  for (let i = 0; i < 100; i++) { s = (s * 1664525 + 1013904223) >>> 0; xs.push(50 + 10 * (2 * (s / 0xffffffff) - 1)); }
  const r = uncertainty(xs, { threshold: 50, label: 'selftest N(50,10) n=100' });
  const ok = r.n === 100 && Math.abs(r.mean - 50) < 1.5 && Math.abs(r.sd - 5.77) < 1 && r.ci95[0] < 50 && r.ci95[1] > 50 && r.verdict === 'INCONCLUSIVE';
  console.log(JSON.stringify(r, null, 1));
  console.log(ok ? 'SELFTEST PASS' : 'SELFTEST FAIL');
  process.exit(ok ? 0 : 1);
}

const [jsonPath, field] = process.argv.slice(2);
if (!jsonPath || !field) { console.error('usage: node uncertainty.mjs --selftest | <json> <field> [--threshold N] [--label L]'); process.exit(2); }
const opts = {};
if (process.argv.includes('--threshold')) opts.threshold = +process.argv[process.argv.indexOf('--threshold') + 1];
if (process.argv.includes('--label')) opts.label = process.argv[process.argv.indexOf('--label') + 1];
const report = wrapJson(jsonPath, field, opts);
console.log(JSON.stringify(report, null, 1));
process.exit(report.report.verdict === 'UNKNOWN' ? 1 : 0);
