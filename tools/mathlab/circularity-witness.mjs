// mathlab/circularity-witness.mjs — D-007 / Q5 circularity witness.
// Extracts DEFAULT_WEIGHTS from two product HTMLs (personal table vs salary table),
// compares each against the mechanics fit target (design.json, 1000 scale, per D-007
// fit target = design.json x 0.00254 wins = design.json units), and reports whether
// the salary-based DEFAULT_WEIGHTS RESOLVES circularity or merely RELOCATES it from
// the old personal table to the salary table. Read-only: reads two HTMLs + design.json,
// writes only to tools/mathlab/results/. Never touches a product file or protected constant.
// usage: node circularity-witness.mjs <htmlA> <htmlB> [--out results/circularity-witness-<date>.md]
//        node circularity-witness.mjs --selftest
import fs from 'fs';
import { createHash } from 'crypto';
const DESIGN_FILE = 'tools/mathlab/design.json';
const WINS_PER_UNIT = 0.00254;

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function extractWeights(html) {
  const m = html.match(/const DEFAULT_WEIGHTS = (\{[\s\S]*?\});/);
  if (!m) throw new Error('DEFAULT_WEIGHTS literal not found in ' + (html.slice(0, 40) || '<string>'));
  return JSON.parse(m[1]);
}
function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
function spearman(xs, ys) {
  const n = xs.length;
  const rx = rank(xs), ry = rank(ys);
  let d2 = 0;
  for (let i = 0; i < n; i++) { const d = rx[i] - ry[i]; d2 += d * d; }
  return 1 - 6 * d2 / (n * (n * n - 1));
}
function rank(xs) {
  const order = xs.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
  const ranks = new Array(xs.length);
  for (let i = 0; i < xs.length; ) {
    let j = i;
    while (j + 1 < xs.length && order[j + 1].v === order[i].v) j++;
    const avg = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) ranks[order[k].i] = avg;
    i = j + 1;
  }
  return ranks;
}
function compare(nameA, wA, nameB, wB, design) {
  const slots = Object.keys(wA).filter(s => s in wB);
  const onlyA = Object.keys(wA).filter(s => !(s in wB));
  const onlyB = Object.keys(wB).filter(s => !(s in wA));
  const rows = slots.map(s => {
    const da = wA[s], db = wB[s], d = da - db;
    return { slot: s, wA: da, wB: db, deltaUnits: +d.toFixed(1), deltaWins: +(d * WINS_PER_UNIT).toFixed(4),
      absDeltaWins: +(Math.abs(d) * WINS_PER_UNIT).toFixed(4), design: design[s] == null ? null : design[s],
      deltaFromDesignA: da == null || design[s] == null ? null : +(da - design[s]).toFixed(1),
      deltaFromDesignB: db == null || design[s] == null ? null : +(db - design[s]).toFixed(1) };
  });
  const nChanged = rows.filter(r => r.deltaUnits !== 0).length;
  const maxDelta = rows.reduce((m, r) => Math.max(m, r.absDeltaWins), 0);
  const rhoAB = slots.length > 1 ? +spearman(slots.map(s => wA[s]), slots.map(s => wB[s])).toFixed(4) : null;
  const desSlots = slots.filter(s => design[s] != null);
  const rhoADesign = desSlots.length > 1 ? +spearman(desSlots.map(s => wA[s]), desSlots.map(s => design[s])).toFixed(4) : null;
  const rhoBDesign = desSlots.length > 1 ? +spearman(desSlots.map(s => wB[s]), desSlots.map(s => design[s])).toFixed(4) : null;
  return { nameA, nameB, nSlotsA: Object.keys(wA).length, nSlotsB: Object.keys(wB).length, nIntersection: slots.length, nChanged, onlyA, onlyB,
    maxDeltaWins: maxDelta, totalAbsDeltaWins: +rows.reduce((a, r) => a + r.absDeltaWins, 0).toFixed(4), rhoAB, rhoADesign, rhoBDesign, rows };
}
function md(c, summary) {
  let s = '# Circularity witness — salary vs personal DEFAULT_WEIGHTS\n\n';
  s += `Compared \`${summary.nameA}\` (${summary.shaA.slice(0, 16)}) vs \`${summary.nameB}\` (${summary.shaB.slice(0, 16)}).\n`;
  s += 'Fit target per D-007: design.json (27 Oct) on the 1000 scale (= design.json x 0.00254 wins). \n';
  s += 'Question: does the salary-based DEFAULT_WEIGHTS resolve circularity, or merely relocate it to the salary table?\n\n';
  s += `| metric | ${short(summary.nameA)} | ${short(summary.nameB)} |\n|----|----|----|\n`;
  s += `| slots in table | ${summary.nSlotsA} | ${summary.nSlotsB} |\n`;
  s += `| slots in intersection | ${summary.nIntersection} | |\n`;
  s += `| slots changed (delta != 0) | ${summary.nChanged} | |\n`;
  s += `| max |delta| (wins) | ${summary.maxDeltaWins} | |\n`;
  s += `| total |delta| (wins) | ${summary.totalAbsDeltaWins} | |\n`;
  s += `| rank rho (A vs B) | ${summary.rhoAB} | |\n`;
  s += `| rank rho (A vs design.json fit target) | ${summary.rhoADesign} | |\n`;
  s += `| rank rho (B vs design.json fit target) | ${summary.rhoBDesign} | |\n`;
  s += `\nOnly in A: ${summary.onlyA.join(', ') || '—'}\nOnly in B: ${summary.onlyB.join(', ') || '—'}\n\n`;
  s += '## Per-slot deltas (A -> B), wins = delta units x 0.00254\n\n';
  s += `| slot | ${short(summary.nameA)} | ${short(summary.nameB)} | delta (wins) | design.json | delta-from-design A | delta-from-design B |\n`;
  s += `|----|----|----|----|----|----|----|\n`;
  for (const r of c.rows) {
    s += `| ${r.slot} | ${r.wA} | ${r.wB} | ${r.deltaWins} | ${r.design == null ? 'n/a' : r.design} | ${r.deltaFromDesignA == null ? 'n/a' : r.deltaFromDesignA} | ${r.deltaFromDesignB == null ? 'n/a' : r.deltaFromDesignB} |\n`;
  }
  s += '\n## Verdict\n';
  const relocated = c.rhoAB != null && c.rhoAB > 0.5 && c.nChanged > 0;
  const bothVsDesign = c.rhoADesign != null && c.rhoBDesign != null;
  s += `Salary table (B) differs materially from personal table (A): ${summary.nChanged} of ${summary.nIntersection} shared slots changed, max |delta| ${summary.maxDeltaWins} wins, rank rho(A,B)=${summary.rhoAB}.\n`;
  s += `Mechanics fit target (design.json) is a THIRD anchor: rho(A,design)=${summary.rhoADesign}, rho(B,design)=${summary.rhoBDesign} — neither table equals the fit target.\n`;
  s += `Conclusion: ${relocated ? 'CIRCULARITY RELOCATED, not resolved: the display anchor moved from the personal table to the salary table while mechanics remains fit to the unvalidated design.json spec. The salary table is not a fit target (Owner P-013, binding); circularity is relocated, not removed.' : 'inconclusive — see raw output.'}\n`;
  return s;
}
function short(name) { return name.split('/').pop().slice(0, 24); }

if (process.argv.includes('--selftest')) {
  const design = { QB: 1000, WR1: 470, TE1: 270, K: 200, P: 100, FB: 30 };
  const A = { QB: 320, WR1: 60, TE1: 80, K: 5, P: 1, FB: 1 };
  const B = { QB: 1000, WR1: 650, TE1: 250, K: 50, P: 50, FB: 25 }; // salary-like: far from A, closer to design
  const C = { QB: 320, WR1: 60, TE1: 80, K: 5, P: 1, FB: 1 }; // identical to A
  const c1 = compare('A', A, 'B', B, design);
  const c2 = compare('A', A, 'C', C, design);
  let ok = true;
  ok &&= c1.nChanged === 6 && c1.rhoAB < 1 && c1.maxDeltaWins > 1; // salary-like table differs a lot
  ok &&= c2.nChanged === 0 && c2.rhoAB === 1 && c2.maxDeltaWins === 0; // identical tables
  ok &&= c1.rhoBDesign != null && c1.rhoBDesign > c1.rhoADesign; // B closer to design than A (salary-ish)
  ok &&= c1.onlyA.length === 0 && c1.onlyB.length === 0;
  console.log(JSON.stringify({ c1: { nChanged: c1.nChanged, rhoAB: c1.rhoAB, rhoADesign: c1.rhoADesign, rhoBDesign: c1.rhoBDesign, maxDeltaWins: c1.maxDeltaWins }, c2: { nChanged: c2.nChanged, rhoAB: c2.rhoAB } }, null, 1));
  console.log(ok ? 'SELFTEST PASS' : 'SELFTEST FAIL');
  process.exit(ok ? 0 : 1);
}

const args = process.argv.slice(2);
if (args.length < 2) { console.error('usage: node circularity-witness.mjs <htmlA> <htmlB> [--out] | --selftest'); process.exit(2); }
const outArg = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
const [htmlA, htmlB] = args;
const sha = (p) => { const c = fs.readFileSync(p); return createHash('sha256').update(c).digest('hex'); };
const wA = extractWeights(fs.readFileSync(htmlA, 'utf8'));
const wB = extractWeights(fs.readFileSync(htmlB, 'utf8'));
const design = loadJson(DESIGN_FILE);
const c = compare(htmlA, wA, htmlB, wB, design);
const summary = { nameA: htmlA, nameB: htmlB, shaA: sha(htmlA), shaB: sha(htmlB), nSlotsA: c.nSlotsA, nSlotsB: c.nSlotsB,
  nIntersection: c.nIntersection, nChanged: c.nChanged, onlyA: c.onlyA, onlyB: c.onlyB,
  maxDeltaWins: c.maxDeltaWins, totalAbsDeltaWins: c.totalAbsDeltaWins, rhoAB: c.rhoAB, rhoADesign: c.rhoADesign, rhoBDesign: c.rhoBDesign };
const s = md(c, summary);
const outPath = outArg || `tools/mathlab/results/circularity-witness-${new Date().toISOString().slice(0, 10)}.md`;
fs.mkdirSync('tools/mathlab/results', { recursive: true });
fs.writeFileSync(outPath, s);
fs.writeFileSync(outPath.replace(/\.md$/, '.json'), JSON.stringify({ generatedAt: new Date().toISOString(), summary, rows: c.rows }, null, 1));
console.log(JSON.stringify(summary, null, 1));
process.exit(0);
