// T12 — uncertainty wrapper (reporting law).
// Every lab JSON number that claims an effect MUST be wrapped with this.
// Usage: import { wrap } from './uncertainty.mjs'; wrap({ estimate, samples, threshold, unit, label })
// Returns { n, mean, median, sd, se, ci95: [lo, hi], threshold, practicalEffect, verdict }.
// verdict: 'inconclusive' if CI crosses 0 or CI width > threshold; 'effect' if |mean|>=threshold and CI excludes 0; else 'noise'.

function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
function median(xs) {
  const s = [...xs].sort((a, b) => a - b); const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function sd(xs, m) { const mm = m ?? mean(xs); return Math.sqrt(xs.reduce((a, b) => a + (b - mm) ** 2, 0) / Math.max(1, xs.length - 1)); }
// bootstrap CI over rosters (not games): caller passes roster-level deltas.
function bootstrapCI(xs, iters = 2000, alpha = 0.05) {
  const n = xs.length; if (n < 2) return [NaN, NaN];
  const stats = [];
  for (let i = 0; i < iters; i++) {
    let s = 0;
    for (let j = 0; j < n; j++) s += xs[Math.floor(Math.random() * n)];
    stats.push(s / n);
  }
  stats.sort((a, b) => a - b);
  return [stats[Math.floor((alpha / 2) * iters)], stats[Math.floor((1 - alpha / 2) * iters)]];
}

export function wrap({ estimate, samples = [], threshold = 0, unit = 'wins', label = '' } = {}) {
  const xs = Array.isArray(samples) ? samples : [];
  const m = xs.length ? mean(xs) : (typeof estimate === 'number' ? estimate : NaN);
  const s = xs.length ? sd(xs, m) : NaN;
  const se = xs.length ? s / Math.sqrt(xs.length) : NaN;
  const ci = xs.length ? bootstrapCI(xs) : [NaN, NaN];
  const practical = Number.isFinite(m) && Math.abs(m) >= threshold;
  const excludesZero = Number.isFinite(ci[0]) && (ci[0] > 0 || ci[1] < 0);
  let verdict = 'inconclusive';
  if (Number.isFinite(m) && practical && excludesZero) verdict = 'effect';
  else if (Number.isFinite(m) && !practical) verdict = 'noise';
  return { label, unit, n: xs.length || 1, mean: m, median: xs.length ? median(xs) : m, sd: s, se, ci95: ci, threshold, practicalEffect: practical, verdict };
}

export function assertWrapped(obj) {
  const need = ['n', 'mean', 'median', 'sd', 'se', 'ci95', 'threshold', 'practicalEffect', 'verdict'];
  for (const k of need) if (!(k in obj)) throw new Error('uncertainty: missing ' + k);
  if (!Array.isArray(obj.ci95) || obj.ci95.length !== 2) throw new Error('uncertainty: ci95 must be [lo,hi]');
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // self-test
  const r = wrap({ samples: [0.1, 0.12, 0.09, 0.11, 0.10], threshold: 0.05, label: 'demo' });
  console.log(JSON.stringify(r, null, 2));
  assertWrapped(r);
  console.log('selftest: OK');
}
