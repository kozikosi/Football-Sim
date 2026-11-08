#!/usr/bin/env node
// absorver-check.mjs — display-layer absorption check per build hash (Q2 of 2026-11-08 innovation).
//
// Reads a fit result JSON + design JSON, runs the raw-curve witness logic
// (raw / fitted / design sources), and reports whether the display layer is
// ABSORBED (spread < pre-registered threshold) for the given build hash.
//
// Usage:
//   node absorver-check.mjs --fit <fit.json> --design <design.json> --build <sha256> [--threshold <frac>]
//
// Output: { build, absorbed, meanSpreadWins, ci95Spread, threshold, label: "ABSORBED"|"NOT-ABSORBED"|"FEW-SOURCES" }
//
// Evidence label: INFERRED (tool newly written this session; verified by self-test).

import fs from 'fs';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const fitPath = get('--fit');
const designPath = get('--design');
const buildHash = get('--build');
const threshold = Number(get('--threshold') || 0.10);
const outPath = get('--out');

if (!fitPath || !designPath || !buildHash) {
  console.error('Usage: node absorver-check.mjs --fit <fit.json> --design <design.json> --build <sha256> [--threshold <frac>] [--out <out.json>]');
  process.exit(2);
}

let fit, design;
try { fit = JSON.parse(fs.readFileSync(fitPath, 'utf8')); } catch (e) { console.error(`cannot read fit ${fitPath}: ${e.message}`); process.exit(2); }
try { design = JSON.parse(fs.readFileSync(designPath, 'utf8')); } catch (e) { console.error(`cannot read design ${designPath}: ${e.message}`); process.exit(2); }

const finalMap = fit.final || fit.fitted || {};
const fittedMap = fit.fitted || {};
const DESIGN_TO_WINS = 0.00254;

const slots = new Set([...Object.keys(finalMap), ...Object.keys(design)]);
function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
function sd(xs) { const m = mean(xs); return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(1, xs.length - 1)); }
function bootstrapCI(values, nBoot = 3000) {
  if (!values.length) return { lo: null, hi: null, n: 0 };
  const n = values.length;
  const boots = new Array(nBoot);
  for (let b = 0; b < nBoot; b++) { let sum = 0; for (let i = 0; i < n; i++) sum += values[Math.floor(Math.random() * n)]; boots[b] = sum / n; }
  boots.sort((a, b) => a - b);
  return { lo: boots[Math.floor(0.025 * nBoot)], hi: boots[Math.floor(0.975 * nBoot)], n };
}

const rows = [];
const allSpreads = [];
for (const slot of slots) {
  const raw = finalMap[slot] != null ? Number(finalMap[slot]) : null;
  const fitted = fittedMap[slot] != null ? Number(fittedMap[slot]) : null;
  const designWins = design[slot] != null ? Number(design[slot]) * DESIGN_TO_WINS : null;
  const values = [raw, fitted, designWins].filter(v => v != null && Number.isFinite(v));
  const spread = values.length >= 2 ? (Math.max(...values) - Math.min(...values)) : null;
  const spreadRel = spread != null && mean(values) != 0 ? spread / Math.abs(mean(values)) : null;
  const absorbed = spreadRel != null && spreadRel <= threshold;
  if (spread != null) allSpreads.push(spread);
  rows.push({ slot, rawWins: raw, fittedWins: fitted, designWins, spreadWins: spread, spreadRelative: spreadRel != null ? +spreadRel.toFixed(4) : null, absorbed });
}

const buildAbsorbed = rows.length > 0 && rows.every(r => r.absorbed);

const overall = {
  build: buildHash,
  buildAbsorbed,
  meanSpreadWins: allSpreads.length ? +mean(allSpreads).toFixed(6) : null,
  ci95Spread: bootstrapCI(allSpreads),
  threshold,
  nSlots: rows.length,
  nDisagree: rows.filter(r => r.absorbed === false).length,
  label: !rows.length ? 'FEW-SOURCES' : (buildAbsorbed ? 'ABSORBED' : 'NOT-ABSORBED')
};

const report = { ...overall, buildAbsorbed };

const out = JSON.stringify(report, null, 2);
if (outPath) { fs.writeFileSync(outPath, out); console.log(`absorver-check.mjs: wrote ${outPath}`); }
else { console.log(out); }