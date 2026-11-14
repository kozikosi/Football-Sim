// Tier 2 analysis — per cell: median, p95, MAD, bootstrap 95% CI of the median per arm; the BENCH-1 §5
// tie rule (a framework "beats" only if CI non-overlap AND ratio >= 1.2, else tie); G5 and pick-curve stats.
// Usage: node tools/driver/analyze.mjs receipts/tier2-run1.json [receipts/tier2-run2.json ...]
import fs from 'node:fs';

const files = process.argv.slice(2);
if (!files.length) { console.error('need tier2 json paths'); process.exit(1); }

const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const p95 = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.max(0, Math.ceil(s.length * 0.95) - 1)]; };
const mad = (xs) => { const m = median(xs); return median(xs.map((x) => Math.abs(x - m))); };
function bootCI(xs, n = 2000) {
  const meds = [];
  let seed = 12345;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  for (let i = 0; i < n; i++) { const s = []; for (let j = 0; j < xs.length; j++) s.push(xs[Math.floor(rnd() * xs.length)]); meds.push(median(s)); }
  meds.sort((a, b) => a - b);
  return [meds[Math.floor(n * 0.025)], meds[Math.floor(n * 0.975)]];
}

const runs = files.map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
const base = runs[0];
const out = { runs: files, cells: {}, pickCurve: {}, g5: base.g5, bootMs: base.armsBootMs, notes: base.notes };
const lines = [];

for (const [cell, blocks] of Object.entries(base.arms)) {
  out.cells[cell] = {};
  for (const [block, byArm] of Object.entries(blocks)) {
    out.cells[cell][block] = {};
    const arms = Object.keys(byArm);
    const stats = {};
    for (const arm of arms) {
      const pooled = runs.flatMap((r) => (r.arms[cell]?.[block]?.[arm] ?? []).map((s) => s.ms));
      const ci = bootCI(pooled);
      stats[arm] = { n: pooled.length, median: +median(pooled).toFixed(2), p95: +p95(pooled).toFixed(2), mad: +mad(pooled).toFixed(2), ci: [+ci[0].toFixed(2), +ci[1].toFixed(2)] };
    }
    if (arms.length === 2) {
      const [a, b] = arms;
      const [loA, hiA] = stats[a].ci, [loB, hiB] = stats[b].ci;
      const nonOverlap = hiA < loB || hiB < loA;
      const ratio = Math.max(stats[a].median, stats[b].median) / Math.max(1e-9, Math.min(stats[a].median, stats[b].median));
      stats.verdict = nonOverlap && ratio >= 1.2 ? (stats[a].median < stats[b].median ? `${a} faster` : `${b} faster`) : 'TIE';
      stats.ratio = +ratio.toFixed(2);
    }
    out.cells[cell][block] = stats;
    lines.push(`${cell} ${block}: ` + arms.map((arm) => `${arm} n=${stats[arm].n} med=${stats[arm].median} p95=${stats[arm].p95} mad=${stats[arm].mad} CI=[${stats[arm].ci.join(',')}]`).join(' · ') + (stats.verdict ? ` → ${stats.verdict} (ratio ${stats.ratio})` : ''));
  }
}

for (const arm of Object.keys(base.pickCurve)) {
  const xs = runs.flatMap((r) => (r.pickCurve?.[arm] ?? []).filter((s) => s.ms !== undefined).map((s) => ({ ms: s.ms, round: s.round })));
  const all = xs.map((x) => x.ms);
  const slow = xs.filter((x) => x.ms > 100).length;
  out.pickCurve[arm] = { n: all.length, median: +median(all).toFixed(2), p95: +p95(all).toFixed(2), max: +Math.max(...all).toFixed(1), roundsOver100ms: xs.filter((x) => x.ms > 100).map((x) => `${r:${x.round}}=${x.ms.toFixed(0)}ms`).slice(0, 12), errors: runs.flatMap((r) => (r.pickCurve?.[arm] ?? []).filter((s) => s.error).map((s) => s.error)) };
  lines.push(`PICKCURVE ${arm}: n=${all.length} med=${out.pickCurve[arm].median} p95=${out.pickCurve[arm].p95} max=${out.pickCurve[arm].max} rounds>100ms=${slow} errors=${out.pickCurve[arm].errors.length}`);
}
const consoleErrs = runs.flatMap((r) => Object.entries(r.consoleErrorsAll ?? {}).flatMap(([arm, list]) => list.filter((x) => x.includes(': error')).map((x) => `${arm}: ${x.slice(0, 160)}`)));
lines.push(`CONSOLE ERRORS during measured run: ${consoleErrs.length}`);
for (const e of consoleErrs.slice(0, 10)) lines.push('  ' + e);
lines.push(`G5: samples=${base.g5.samples} failures=${base.g5.failures.length}`);
lines.push(`BOOT first-200ms: vue=${base.armsBootMs.vue}ms svelte=${base.armsBootMs.svelte}ms`);

fs.writeFileSync(files[0].replace('.json', '-analysis.json'), JSON.stringify(out, null, 2));
console.log(lines.join('\n'));
