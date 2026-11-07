// mathlab/triangulation.mjs — T3 triangulation generator (per-slot multi-anchor table).
// Reads a raw-curve-witness JSON and emits, per slot: raw measured span · calibrated700 · derived1000 ·
// volume-derived · EPA/AV-derived · salary-derived · rank under each anchor · spread · disagreement flag.
// All real-data anchors are UNKNOWN until a hash-pinned nflverse/PFR run populates them; salary is NOT a
// calibration foundation (Owner P-013 ruling, binding) — it is an independent anchor only.
// usage: node triangulation.mjs <raw-curve-witness.json> [--out results/triangulation-<build>-<date>.md]
import fs from 'fs';
const [witnessPath] = process.argv.slice(2);
if (!witnessPath) { console.error('usage: node triangulation.mjs <raw-curve-witness.json> [--out]'); process.exit(2); }
const outArg = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null;
const rec = JSON.parse(fs.readFileSync(witnessPath, 'utf8'));
const rows = rec.rows.filter(r => r.spanWins != null);
const ANCHORS = ['rawSpan', 'calibrated700', 'derived1000', 'volumeDerived', 'epaDerived', 'avDerived', 'salaryDerived'];
const anchorLabel = { rawSpan: 'raw span (wins)', calibrated700: 'calibrated (700)', derived1000: 'derived (1000)', volumeDerived: 'volume-derived', epaDerived: 'EPA/AV-derived', avDerived: 'AV-derived', salaryDerived: 'salary-derived' };
// value(slot, anchor): number or 'UNKNOWN'
function val(r, a) {
  if (a === 'rawSpan') return r.spanWins;
  if (a === 'calibrated700') return r.calibrated700;
  if (a === 'derived1000') return r.derived1000;
  return r.anchors && r.anchors[a] != null ? r.anchors[a] : 'UNKNOWN';
}
const numericAnchors = ['rawSpan', 'calibrated700', 'derived1000'];
// ranks (1 = highest), computed per anchor over numeric values only
const ranks = {};
numericAnchors.forEach(a => {
  const ordered = [...rows].sort((x, y) => val(y, a) - val(x, a));
  const rankMap = {}; ordered.forEach((r, i) => { rankMap[r.slot] = i + 1; });
  ranks[a] = rankMap;
});
// per-slot output
const out = rows.map(r => {
  const values = {};
  numericAnchors.forEach(a => { values[a] = val(r, a); });
  // spread across numeric anchors (max - min), normalised to derived1000 scale via factor 1000/700 for calibrated
  const norm = { rawSpan: values.rawSpan / 0.00254 / 10 * 10, calibrated700: values.calibrated700 * (1000 / 700), derived1000: values.derived1000 };
  const nums = Object.values(norm).filter(v => v != null);
  const spread = nums.length ? (Math.max(...nums) - Math.min(...nums)) : null;
  const disagree = spread != null && spread > 150; // >150 on 1000-scale = material disagreement
  return { slot: r.slot, spanWins: r.spanWins, slotWinsPerOvr: r.slotWinsPerOvr, ...values,
    rankRaw: ranks.rawSpan[r.slot], rankCal: ranks.calibrated700[r.slot], rankDer: ranks.derived1000[r.slot],
    spread1000: spread == null ? null : +spread.toFixed(1), disagreement: disagree };
});
out.sort((a, b) => (a.rankRaw || 999) - (b.rankRaw || 999));
const nDisagree = out.filter(r => r.disagreement).length;
// rank correlation raw vs calibrated
const paired = out.filter(r => r.rankRaw != null && r.rankCal != null);
const rank = a => { const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]); const rk = new Array(a.length); idx.forEach((p, k) => { rk[p[1]] = k; }); return rk; };
let spearman = null;
if (paired.length >= 3) {
  const xr = rank(paired.map(r => r.rankRaw)); const yr = rank(paired.map(r => r.rankCal));
  let sxy = 0, sxx = 0, syy = 0; const mx = xr.reduce((a, b) => a + b) / xr.length, my = yr.reduce((a, b) => a + b) / yr.length;
  xr.forEach((v, i) => { sxy += (v - mx) * (yr[i] - my); sxx += (v - mx) ** 2; syy += (yr[i] - my) ** 2; });
  spearman = +(sxy / Math.sqrt(sxx * syy)).toFixed(3);
}
let md = `# Triangulation — ${rec.summary.buildSha16}\n\nBuild: \`${rec.summary.buildFile}\` (sha256 ${rec.summary.buildSha}) · generated ${rec.summary.generatedAt} · n slots = ${out.length} · page errors = ${rec.summary.pageErrors}\n\n`;
md += `Per-slot anchors (each column is an independent estimate of the slot's value; NOT a calibration target):\n`;
md += `| rank | slot | raw span (wins) | calibrated (700) | derived (1000) | volume | EPA/AV | AV | salary | rankRaw | rankCal | rankDer | spread1000 | disagree |\n`;
md += `|----|----|----|----|----|----|----|----|----|----|----|----|----|----|\n`;
for (const r of out) {
  md += `| ${r.rankRaw} | ${r.slot} | ${r.spanWins.toFixed(3)} | ${r.calibrated700 == null ? 'n/a' : r.calibrated700} | ${r.derived1000} | ${r.volumeDerived == null ? 'UNKNOWN' : r.volumeDerived} | ${r.epaDerived == null ? 'UNKNOWN' : r.epaDerived} | ${r.avDerived == null ? 'UNKNOWN' : r.avDerived} | ${r.salaryDerived == null ? 'UNKNOWN' : r.salaryDerived} | ${r.rankRaw} | ${r.rankCal == null ? 'n/a' : r.rankCal} | ${r.rankDer} | ${r.spread1000 == null ? 'n/a' : r.spread1000} | ${r.disagreement ? 'FLAG' : '—'} |\n`;
}
md += `\nRank correlation raw↔calibrated Spearman r = ${spearman == null ? 'n/a' : spearman} (${paired.length} paired).\n`;
md += `Disagreement flags (spread > 150 on 1000-scale): ${nDisagree} of ${out.length} slots.\n`;
md += `Anchors population: volume=UNKNOWN EPA/AV=UNKNOWN AV=UNKNOWN salary=UNKNOWN — no real-data run yet. Salary is an independent anchor only, never a fit target (Owner P-013, binding).\n`;
const outPath = outArg || witnessPath.replace(/\.json$/, '-triangulation.md');
fs.mkdirSync('tools/mathlab/results', { recursive: true });
fs.writeFileSync(outPath, md);
fs.writeFileSync(outPath.replace(/\.md$/, '.json'), JSON.stringify({ summary: rec.summary, out, nDisagree, spearman }, null, 1));
console.log(JSON.stringify({ outPath, nSlots: out.length, nDisagree, spearman }, null, 1));
process.exit(0);
