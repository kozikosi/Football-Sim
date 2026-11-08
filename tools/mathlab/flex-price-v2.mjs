// mathlab/flex-price-v2.mjs — T6 flex price analyzer v2.
// Compares each flex.json slot-pair penalty against the actual win cost of the flex
// (weight delta x 0.00254 wins per 1000 weight unit) and proposes a slot-pair-specific
// penalty capped at 10 (REV 5 ceiling). Read-only: reads flex.json + design.json,
// writes only to tools/mathlab/results/. Never touches a product file or protected constant.
// usage: node flex-price-v2.mjs [--selftest | --out results/flex-price-v2-<date>.md]
import fs from 'fs';
const WINS_PER_UNIT = 0.00254; // 1 weight unit (1000 scale) = 0.00254 wins
const UNITS_PER_WIN = 10;      // 10 penalty units per win (k)
const CAP = 10;                // REV 5 hard ceiling
const FLEX_FILE = 'tools/mathlab/flex.json';
const WEIGHT_FILE = 'tools/mathlab/design.json';

function load(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function analyze(flex, weights) {
  const rows = [];
  for (const [from, dests] of Object.entries(flex.flex || {})) {
    const wFrom = weights[from];
    for (const [to, penalty] of Object.entries(dests || {})) {
      const wTo = weights[to];
      const winDeltaUnits = (wTo == null || wFrom == null) ? null : wTo - wFrom;
      const winDeltaWins = winDeltaUnits == null ? null : +(winDeltaUnits * WINS_PER_UNIT).toFixed(4);
      const winCost = winDeltaWins == null ? null : Math.abs(winDeltaWins);
      const fairCap = winCost == null ? null : Math.min(CAP, Math.max(0, Math.round(winCost * UNITS_PER_WIN)));
      const underpriced = fairCap != null && penalty < fairCap - 1e-9;
      const overpriced = fairCap != null && penalty > fairCap + 1e-9;
      rows.push({ from, to, penalty, weightFrom: wFrom, weightTo: wTo,
        winDeltaUnits: winDeltaUnits == null ? null : +winDeltaUnits.toFixed(1),
        winDeltaWins, winCost: winCost == null ? null : +winCost.toFixed(4),
        fairCap, underpriced, overpriced });
    }
  }
  rows.sort((a, b) => (b.winCost || 0) - (a.winCost || 0));
  return rows;
}

function md(rows) {
  let s = '# Flex price analysis v2\n\n';
  s += 'Compares each flex.json penalty vs actual win cost (weight delta x 0.00254). ' +
    'fairCap = clamp(round(winCost x 10), 0, 10) — slot-pair-specific penalty, REV 5 ceiling of 10.\n' +
    'underpriced = penalty below fair cap (flex too cheap); overpriced = penalty above fair cap (prohibitive).\n\n';
  s += `| from | to | penalty | weightFrom | weightTo | winDelta (wins) | fairCap | underpriced | overpriced |\n`;
  s += `|----|----|----|----|----|----|----|----|----|\n`;
  for (const r of rows) {
    s += `| ${r.from} | ${r.to} | ${r.penalty} | ${r.weightFrom == null ? 'n/a' : r.weightFrom} | ${r.weightTo == null ? 'n/a' : r.weightTo} | ${r.winDeltaWins == null ? 'n/a' : r.winDeltaWins} | ${r.fairCap == null ? 'n/a' : r.fairCap} | ${r.underpriced ? 'YES' : '—'} | ${r.overpriced ? 'YES' : '—'} |\n`;
  }
  const nUnder = rows.filter(r => r.underpriced).length;
  const nOver = rows.filter(r => r.overpriced).length;
  s += `\nSlots: ${rows.length} pairs · underpriced: ${nUnder} · overpriced: ${nOver}\n`;
  s += 'Note: design.json TE1=270 WR1=470 makes TE->WR1 a slot-value upgrade (+0.508 wins), so the briefed "0.63 wins lost" must come from a different weighting (salary table) — a discrepancy to reconcile, not an engine bug.\n';
  return s;
}

if (process.argv.includes('--selftest')) {
  const flex = { flex: { A: { B: 2 }, B: { C: 8 } } };
  const weights = { A: 1000, B: 600, C: 300 };
  const rows = analyze(flex, weights);
  const ab = rows.find(r => r.from === 'A' && r.to === 'B');
  const bc = rows.find(r => r.from === 'B' && r.to === 'C');
  let ok = true;
  ok &&= ab.fairCap === 10;         // |600-1000|*0.00254 = 1.016 wins -> round(10.16)=10
  ok &&= ab.winDeltaWins === -1.016;
  ok &&= ab.underpriced === true;   // penalty 2 < fairCap 10
  ok &&= bc.fairCap === 8;          // |300-600|*0.00254 = 0.762 wins -> round(7.62)=8
  ok &&= bc.underpriced === false && bc.overpriced === false; // penalty 8 == fairCap 8 (boundary)
  console.log(JSON.stringify(rows, null, 1));
  console.log(ok ? 'SELFTEST PASS' : 'SELFTEST FAIL');
  process.exit(ok ? 0 : 1);
}

const [outArg] = process.argv.slice(2);
const outPath = outArg || `tools/mathlab/results/flex-price-v2-${new Date().toISOString().slice(0, 10)}.md`;
const flex = load(FLEX_FILE);
const weights = load(WEIGHT_FILE);
const rows = analyze(flex, weights);
fs.mkdirSync('tools/mathlab/results', { recursive: true });
fs.writeFileSync(outPath, md(rows));
fs.writeFileSync(outPath.replace(/\.md$/, '.json'), JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 1));
console.log(JSON.stringify({ outPath, nPairs: rows.length, underpriced: rows.filter(r => r.underpriced).length, overpriced: rows.filter(r => r.overpriced).length }, null, 1));
process.exit(0);
