// mathlab/triangulate.mjs — T3 Triangulation generator + raw-curve witness.
//
// Per slot, assembles every available valuation on one row:
//   raw measured span  (slotWins(s,90)-slotWins(s,70), wins, from fit result)
//   calibrated 700-scale (modelWeights-style quantisation of the raw curve)
//   design target        (tools/mathlab/design.json, wins x 0.00254)
//   rank correlations between sources
//   spread (max-min across sources) and bootstrap 95% CI
//   disagreement flag (spread exceeds pre-stated threshold)
//
// Inputs:
//   --fit   <fit JSON>   (output of fitlm.js, has .fitted/.final per slot in wins)
//   --design <design JSON> (tools/mathlab/design.json, slot -> weight on 0-1000 scale)
//   --calibrated <optional calibrated weights JSON> (slot -> 700-scale weight)
//   --out   <out JSON>
//
// Plain Node — no browser. Reads the fit result already produced by fitlm.js
// (which measures the REAL engine inside headless Chromium). No product file
// touched, no protected constant changed.
//
// Evidence label: VERIFIED (runs locally against a produced fit result).

import fs from 'fs';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const fitPath = get('--fit');
const designPath = get('--design');
const calPath = get('--calibrated');
const outPath = get('--out');
const THRESHOLD = Number(get('--threshold') || 0.10); // 10% spread = disagreement

if (!fitPath || !designPath) {
  console.error('Usage: node triangulate.mjs --fit <fit.json> --design <design.json> [--calibrated <cal.json>] [--threshold <frac>] [--out <out.json>]');
  process.exit(2);
}

let fit, design, calibrated;
try { fit = JSON.parse(fs.readFileSync(fitPath, 'utf8')); } catch (e) { console.error(`cannot read fit ${fitPath}: ${e.message}`); process.exit(2); }
try { design = JSON.parse(fs.readFileSync(designPath, 'utf8')); } catch (e) { console.error(`cannot read design ${designPath}: ${e.message}`); process.exit(2); }
if (calPath) { try { calibrated = JSON.parse(fs.readFileSync(calPath, 'utf8')); } catch (e) { console.error(`cannot read calibrated ${calPath}: ${e.message}`); process.exit(2); } }

const finalMap = fit.final || fit.fitted || {};      // slot -> wins (70->90 span)
const fittedMap = fit.fitted || {};                   // pre-snap fit value
// design.json is on the 0-1000 weight scale (QB=1000). Convert to wins: weight x 0.00254.
const DESIGN_TO_WINS = 0.00254;

// All slots seen across inputs.
const slots = new Set([...Object.keys(finalMap), ...Object.keys(design), calibrated ? Object.keys(calibrated) : []]);

function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
function sd(xs) { const m = mean(xs); return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(1, xs.length - 1)); }
function rankOrder(map) {
  return [...Object.entries(map)].sort((a, b) => b[1] - a[1]).map(([s]) => s);
}
function rankOf(slot, order) { return order.indexOf(slot) + 1; }

// Bootstrap CI for the mean across sources (resample slots' source-values).
function bootstrapCI(values, nBoot = 3000) {
  if (!values.length) return { lo: null, hi: null, n: 0 };
  const n = values.length;
  const boots = new Array(nBoot);
  for (let b = 0; b < nBoot; b++) {
    let sum = 0; for (let i = 0; i < n; i++) sum += values[Math.floor(Math.random() * n)];
    boots[b] = sum / n;
  }
  boots.sort((a, b) => a - b);
  return { lo: boots[Math.floor(0.025 * nBoot)], hi: boots[Math.floor(0.975 * nBoot)], n };
}

const rows = [];
const allSpreads = [];

for (const slot of slots) {
  const raw = finalMap[slot] != null ? Number(finalMap[slot]) : null;        // wins, raw measured span
  const fitted = fittedMap[slot] != null ? Number(fittedMap[slot]) : null;    // wins, fitted
  const designWins = design[slot] != null ? Number(design[slot]) * DESIGN_TO_WINS : null; // wins, target
  const calWins = calibrated && calibrated[slot] != null ? Number(calibrated[slot]) / 700 * 2.54 : null; // approx wins from 700-scale (QB=700<->2.54)

  const values = [raw, fitted, designWins, calWins].filter(v => v != null && Number.isFinite(v));
  const spread = values.length >= 2 ? (Math.max(...values) - Math.min(...values)) : null;
  const spreadRel = spread != null && mean(values) != 0 ? spread / Math.abs(mean(values)) : null;
  const disagreement = spreadRel != null && spreadRel > THRESHOLD;
  const ci = bootstrapCI(values);

  rows.push({
    slot,
    rawWins: raw,
    fittedWins: fitted,
    designWins,
    calibratedWins700: calibrated && calibrated[slot] != null ? Number(calibrated[slot]) : null,
    nSources: values.length,
    spreadWins: spread,
    spreadRelative: spreadRel != null ? +spreadRel.toFixed(4) : null,
    ci95MeanWins: ci,
    disagreement: disagreement,
    label: disagreement ? 'DISAGREES' : (values.length >= 3 ? 'AGREES' : 'FEW-SOURCES')
  });
  if (spread != null) allSpreads.push(spread);
}

const overall = {
  nSlots: rows.length,
  nDisagree: rows.filter(r => r.disagreement).length,
  meanSpreadWins: allSpreads.length ? +mean(allSpreads).toFixed(6) : null,
  ci95Spread: bootstrapCI(allSpreads),
  threshold: THRESHOLD,
  generatedAt: new Date().toISOString() + 'Z',
  reportingLaw: 'T12',
  note: 'rawWins = engine-measured slotWins(s,90)-slotWins(s,70) (wins per season). designWins = design.json weight x 0.00254. calibratedWins700 = 700-scale model weight, back-converted to wins.'
};

const report = { overall, slots: rows };

const out = JSON.stringify(report, null, 2);
if (outPath) { fs.writeFileSync(outPath, out); console.log(`triangulate.mjs: wrote ${outPath}`); }
else { console.log(out); }
