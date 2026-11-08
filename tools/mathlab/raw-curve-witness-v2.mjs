// mathlab/raw-curve-witness-v2.mjs — T3 raw-curve witness v2.
// Enriches a raw-curve-witness JSON with per-slot ABSORBED detection (raw curve fully
// explained by the quantised display) and a calibration-lineage hint; and provides a
// mechanics-independence witness comparing raw curves across two builds. Read-only:
// reads witness JSON + flex/design json, runs raw-curve-witness.mjs as a child process,
// writes only to tools/mathlab/results/. Never touches a product file or protected constant.
// usage: node raw-curve-witness-v2.mjs <witness.json> [--out results/raw-curve-witness-v2-<build>-<date>.md]
//        node raw-curve-witness-v2.mjs --independence <buildA.html> <buildB.html> [--out ...]
//        node raw-curve-witness-v2.mjs --selftest
import fs from 'fs';
import { execFileSync } from 'child_process';
const ABSORBED_TOL = 1.25; // half of the 2.5 contract: |calibrated - expected| <= 1.25 => absorbed
const DESIGN_FILE = 'tools/mathlab/design.json';

function load(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function enrich(rec, design) {
  design = design || (fs.existsSync(DESIGN_FILE) ? load(DESIGN_FILE) : {});
  const rows = (rec.rows || []).map(r => {
    const calibrated = r.calibrated700 == null ? null : r.calibrated700;
    const expected = r.expected700 == null ? null : r.expected700;
    const absorbed = calibrated != null && expected != null && Math.abs(calibrated - expected) <= ABSORBED_TOL;
    // design700: design.json (1000-scale) converted to 700 scale, for lineage hint
    const design1000 = design[r.slot];
    const design700 = design1000 == null ? null : +(design1000 / 1000 * 700).toFixed(1);
    let lineageHint = 'UNKNOWN';
    if (calibrated != null && design700 != null) {
      lineageHint = Math.abs(calibrated - design700) <= 2.5 ? 'DESIGN-ALIGNED' : 'DIVERGES-FROM-DESIGN';
    } else if (calibrated != null) {
      lineageHint = 'MODELWEIGHTS-ONLY';
    }
    return { ...r, absorbed, lineageHint, design700 };
  });
  const nAbsorbed = rows.filter(r => r.absorbed).length;
  const nWithCal = rows.filter(r => r.calibrated700 != null).length;
  const designAligned = rows.filter(r => r.lineageHint === 'DESIGN-ALIGNED').length;
  const diverges = rows.filter(r => r.lineageHint === 'DIVERGES-FROM-DESIGN').length;
  return { rows, nAbsorbed, nWithCal, nSlots: rows.length, absorbedFraction: nWithCal ? +(nAbsorbed / nWithCal).toFixed(4) : null,
    designAligned, diverges, unknown: rows.filter(r => r.lineageHint === 'UNKNOWN').length };
}

function md(en, summary) {
  let s = `# Raw-curve witness v2 — ${summary.buildSha16}\n\n`;
  s += `Build: \`${summary.buildFile}\` (sha256 ${summary.buildSha}) · generated ${summary.generatedAt} · n slots = ${en.nSlots}\n\n`;
  s += 'ABSORBED = |calibrated700 - expected700| <= 1.25 (half of the 2.5 contract): the raw curve is fully explained by the quantised display, i.e. no independent mechanics signal remains for that slot.\n';
  s += `lineageHint = DESIGN-ALIGNED if calibrated700 matches design.json (27 Oct) within 2.5, else DIVERGES-FROM-DESIGN / UNKNOWN.\n\n`;
  s += `| slot | absorbed | lineageHint | design700 | calibrated700 | expected700 | quantErr700 | spanWins |\n`;
  s += `|----|----|----|----|----|----|----|----|\n`;
  for (const r of en.rows) {
    s += `| ${r.slot} | ${r.absorbed ? 'YES' : 'no'} | ${r.lineageHint} | ${r.design700 == null ? 'n/a' : r.design700} | ${r.calibrated700 == null ? 'n/a' : r.calibrated700} | ${r.expected700 == null ? 'n/a' : r.expected700} | ${r.quantError700 == null ? 'n/a' : r.quantError700} | ${r.spanWins == null ? 'n/a' : r.spanWins.toFixed(3)} |\n`;
  }
  s += `\nAbsorbed: ${en.nAbsorbed}/${en.nWithCal} calibrated slots (${en.absorbedFraction == null ? 'n/a' : (en.absorbedFraction * 100).toFixed(1)}%).\n`;
  s += `Lineage: DESIGN-ALIGNED ${en.designAligned} · DIVERGES-FROM-DESIGN ${en.diverges} · UNKNOWN ${en.unknown}.\n`;
  s += `Verdict: ${en.nAbsorbed === en.nWithCal && en.nWithCal > 0 ? 'FULLY ABSORBED — display is pure quantised mechanics, no independent raw-curve signal' : 'PARTIALLY ABSORBED — some slots carry an independent mechanics signal'}.\n`;
  return s;
}

if (process.argv.includes('--selftest')) {
  const fake = {
    summary: { buildFile: 'fake.html', buildSha: 'aaaa', buildSha16: 'aaaa', generatedAt: 't', pageErrors: 0 },
    rows: [
      { slot: 'QB', spanWins: 2.54, calibrated700: 700, expected700: 700, quantError700: 0 },
      { slot: 'WR1', spanWins: 1.0, calibrated700: 470, expected700: 328, quantError700: 142 },
      { slot: 'K', spanWins: 0.04, calibrated700: null, expected700: null, quantError700: null },
    ],
  };
  // inject design inline (do not mutate the real design.json)
  const en = enrich(fake, { QB: 1000, WR1: 470, K: 100 });
  const qb = en.rows.find(r => r.slot === 'QB');
  const wr = en.rows.find(r => r.slot === 'WR1');
  const k = en.rows.find(r => r.slot === 'K');
  let ok = true;
  ok &&= qb.absorbed === true;            // |700-700|=0 <= 1.25
  ok &&= qb.lineageHint === 'DESIGN-ALIGNED'; // |700-700|=0 <= 2.5
  ok &&= wr.absorbed === false;           // |470-328|=142 > 1.25
  ok &&= wr.lineageHint === 'DIVERGES-FROM-DESIGN'; // |470-329|=141 > 2.5
  ok &&= k.absorbed === false;            // no calibrated
  ok &&= k.lineageHint === 'UNKNOWN'; // calibrated null
  ok &&= en.nAbsorbed === 1;
  ok &&= en.absorbedFraction === +(1/2).toFixed(4);
  console.log(JSON.stringify(en, null, 1));
  const checks = [qb.absorbed===true, qb.lineageHint==='DESIGN-ALIGNED', wr.absorbed===false, wr.lineageHint==='DIVERGES-FROM-DESIGN', k.absorbed===false, k.lineageHint==='UNKNOWN', en.nAbsorbed===1, en.absorbedFraction===+(1/2).toFixed(4)];
  console.log(ok ? 'SELFTEST PASS' : 'SELFTEST FAIL');
  process.exit(ok ? 0 : 1);
}

const args = process.argv.slice(2);
if (args.includes('--independence')) {
  const i = args.indexOf('--independence');
  const [buildA, buildB] = args.slice(i + 1, i + 3);
  if (!buildA || !buildB) { console.error('usage: node raw-curve-witness-v2.mjs --independence <buildA.html> <buildB.html> [--out]'); process.exit(2); }
  const outArg = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
  const run = (b) => {
    const tmp = `tools/mathlab/results/.v2-independence-${b.replace(/[^a-z0-9]/gi,'_')}-${Date.now()}.json`;
    execFileSync('node', ['tools/mathlab/raw-curve-witness.mjs', b, '--out', tmp], { stdio: 'pipe' });
    return load(tmp);
  };
  const a = run(buildA); const b = run(buildB);
  const ra = (a.rows || []).reduce((m, r) => { m[r.slot] = r.spanWins; return m; }, {});
  const rb = (b.rows || []).reduce((m, r) => { m[r.slot] = r.spanWins; return m; }, {});
  const slots = Object.keys(ra).filter(s => s in rb);
  let identical = true; const diffs = [];
  for (const s of slots) {
    const da = ra[s] == null ? null : +ra[s].toFixed(6);
    const db = rb[s] == null ? null : +rb[s].toFixed(6);
    if (da == null || db == null || Math.abs(da - db) > 1e-6) { identical = false; diffs.push({ slot: s, buildA: da, buildB: db }); }
  }
  const summary = { buildA: a.summary.buildSha16, buildB: b.summary.buildSha16, nCompared: slots.length, identical, diffs };
  let s = `# Mechanics-independence witness\n\nBuild A: ${a.summary.buildFile} (${a.summary.buildSha})\nBuild B: ${b.summary.buildFile} (${b.summary.buildSha})\n\n`;
  s += `Compared ${slots.length} slots. Raw curves identical across builds: ${identical ? 'YES' : 'no'}.\n`;
  s += `${identical ? 'Raw curve is display-independent (mechanics only).' : 'Raw curve differs between builds — display leaks into mechanics.'}\n`;
  if (diffs.length) { s += '\nDiffs:\n| slot | buildA spanWins | buildB spanWins |\n|----|----|----|\n'; for (const d of diffs) s += `| ${d.slot} | ${d.buildA} | ${d.buildB} |\n`; }
  const outPath = outArg || `tools/mathlab/results/raw-curve-witness-v2-independence-${Date.now()}.md`;
  fs.mkdirSync('tools/mathlab/results', { recursive: true });
  fs.writeFileSync(outPath, s);
  fs.writeFileSync(outPath.replace(/\.md$/, '.json'), JSON.stringify({ ...summary, diffs }, null, 1));
  console.log(JSON.stringify({ outPath, nCompared: slots.length, identical }, null, 1));
  process.exit(0);
}

const [witnessPath] = args;
if (!witnessPath) { console.error('usage: node raw-curve-witness-v2.mjs <witness.json> [--out] | --independence <A> <B> | --selftest'); process.exit(2); }
const rec = load(witnessPath);
const design = fs.existsSync(DESIGN_FILE) ? load(DESIGN_FILE) : {};
const outArg = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
const en = enrich(rec, design);
const summary = rec.summary || {};
const outPath = outArg || witnessPath.replace(/\.json$/, '-v2.md');
fs.mkdirSync('tools/mathlab/results', { recursive: true });
fs.writeFileSync(outPath, md(en, summary));
fs.writeFileSync(outPath.replace(/\.md$/, '.json'), JSON.stringify({ summary, ...en }, null, 1));
console.log(JSON.stringify({ outPath, nSlots: en.nSlots, nAbsorbed: en.nAbsorbed, absorbedFraction: en.absorbedFraction, designAligned: en.designAligned, diverges: en.diverges }, null, 1));
process.exit(0);
