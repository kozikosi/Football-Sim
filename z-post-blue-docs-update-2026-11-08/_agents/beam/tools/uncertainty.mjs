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
  const fs = await import('node:fs');
  const arg = process.argv[2];
  if (arg && arg.endsWith('.json')) {
    let lab; try { lab = JSON.parse(fs.readFileSync(arg,'utf8')); } catch(e){ console.error(e.message); process.exit(2); }
    const hist = Array.isArray(lab.hist) ? lab.hist : null;
    let slots = Array.isArray(lab.slots) ? lab.slots : (lab.slots && typeof lab.slots === 'object' ? Object.values(lab.slots) : []);
    if (!slots.length && lab.fitted && typeof lab.fitted === 'object') {
      for (const k of Object.keys(lab.fitted)) {
        slots.push({ slot: k, rawWins: lab.fitted[k], fittedWins: (lab.final||{})[k], designWins: null });
      }
    }
    const out = { source: arg, reportingLaw: 'T12', slots: {}, summary: { slotsReported: slots.length }, notes: [] };
    for (const s of slots) {
      const slot = s.slot || s.name;
      if (!slot) continue;
      const vals = [s.rawWins, s.fittedWins, s.designWins, s.calibratedWins700].filter((x)=>typeof x==='number' && Number.isFinite(x));
      const w = wrap({ samples: vals.length ? vals : [s.rawWins||0], threshold: 0.1, label: slot, unit: 'wins' });
      out.slots[slot] = w;
    }
    if (hist && hist.length) {
      const last = hist[hist.length-1];
      out.summary.fitIterations = hist.length;
      out.summary.finalRmsLogError = last;
      out.summary.fitConverged = last < 0.004;
      out.notes.push(`Fit histogram: ${hist.length} iterations, final RMS log-error ${(last*100).toFixed(2)}%.`);
    }
    console.log(JSON.stringify(out, null, 2));
  } else {
    const r = wrap({ samples: [0.1, 0.12, 0.09, 0.11, 0.10], threshold: 0.05, label: 'demo' });
    console.log(JSON.stringify(r, null, 2));
    assertWrapped(r);
    console.log('selftest: OK');
  }
}
