#!/usr/bin/env node
// witness.mjs — T3a · RAW-CURVE WITNESS EXPORT (Z.ai lab, 2026-11-08)
// Usage: node witness.mjs <build.html> <out.json> [--tag <name>]
// Exports the raw (uncalibrated) 50→100 wins curve per slot from slotWinsTable(), beside
// whatever the build ships as display weights. One file per build, hash-stamped, archived.
// This is the mechanism that lets the Owner's table be the model without losing the ability
// to ask whether reality agrees (VERACITY-SYNTHESIS Q3 consequence).
import fs from 'node:fs';
import { openBuild, writeJSON, sha256, md5 } from './lablib.mjs';

const [file, out] = process.argv.slice(2);
const tagIx = process.argv.indexOf('--tag');
const tag = tagIx > -1 ? process.argv[tagIx + 1] : file.split('/').pop().replace(/\.html$/, '');
const INPAGE = fs.readFileSync(new URL('./inpage-core.js', import.meta.url), 'utf8');

const { browser, page, boot, errors } = await openBuild(file, INPAGE);
const witness = await page.evaluate(() => window.zaiLab2.witness());
await browser.close();

const doc = {
  schema: 'zai-raw-curve-witness/1',
  tool: 'witness.mjs (T3a)',
  tag,
  build: { file: file.split('/').pop(), sha256: sha256(file), md5: md5(file), bytes: fs.statSync(file).size },
  method: witness.measured_by,
  calibration_state: witness.calibration_state,
  rng_note: 'deterministic surface — no RNG involved in slotWinsTable()',
  curves: witness.curves,
  modelWeights_output: witness.modelWeights_output,
  DEFAULT_WEIGHTS: witness.DEFAULT_WEIGHTS,
  display_weights: witness.display_weights,
  console_errors: errors,
  generated: '2026-11-08',
};
const S = Object.keys(witness.curves);
// calibration-absorption check: if raw_span / (display weight) is one constant across all
// slots, the build's "measured" curve carries no between-slot information (w79 state).
(function absorptionCheck() {
  const rows = S.filter(s => witness.display_weights && witness.display_weights[s] > 0 && witness.curves[s].raw_span_70_90 > 0)
    .map(s => ({ s, ratio: witness.curves[s].raw_span_70_90 / witness.display_weights[s] }));
  if (rows.length < 3) return;
  const rs = rows.map(r => r.ratio);
  const mean = rs.reduce((a, b) => a + b, 0) / rs.length;
  const maxDev = Math.max(...rs.map(r => Math.abs(r - mean) / mean));
  const absorbed = maxDev < 0.02;
  doc.calibration_absorption = {
    test: 'raw70to90span / display_weight constant across slots?',
    ratio_mean: mean, max_relative_dev: maxDev,
    verdict: absorbed ? 'ABSORBED — the build\'s measured curve is a pure rescale of the display table; it carries zero between-slot engine information. Run the witness on an uncalibrated surface for real evidence.'
                      : 'NOT ABSORBED — raw curve deviates from the display table; between-slot information present.',
    per_slot: rows,
  };
  console.log('\nCALIBRATION ABSORPTION:', doc.calibration_absorption.verdict, `(max dev ${(100 * maxDev).toFixed(2)}%)`);
})();

writeJSON(out, doc);

// human-readable one-table summary to stdout
console.log('\nslot  raw70→90span  slope/ovr      modelWeights  DEFAULT  display');
for (const s of S) {
  const c = witness.curves[s];
  const mw = witness.modelWeights_output ? witness.modelWeights_output[s] : '';
  const dw = witness.DEFAULT_WEIGHTS ? witness.DEFAULT_WEIGHTS[s] : '';
  const dp = witness.display_weights ? witness.display_weights[s] : '';
  console.log(`${s.padEnd(5)} ${String(c.raw_span_70_90.toFixed(4)).padStart(12)}  ${c.raw_slope_per_ovr.toFixed(6).padStart(12)}  ${String(mw).padStart(12)}  ${String(dw).padStart(7)}  ${String(dp).padStart(7)}`);
}
