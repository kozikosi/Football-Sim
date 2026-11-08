#!/usr/bin/env node
// anchor-compare.mjs — turn a *data* anchor into a slot-value curve, then compare it to tables.
//
// Why: the salary table is a market price, not a wins measurement. The independent anchor this
// council keeps asking for has a concrete shape:
//
//   value(slot) = snaps(slot) × EPA/play above replacement(slot) × points/EPA × wins/point
//
// Volume (snaps) and efficiency (EPA/play) are separate inputs on purpose: a slot can be on the
// field a lot and be inefficient, or efficient on few snaps. Collapsing them into one number is
// how the percentile/scarcity confound starts.
//
// This tool does not fetch nflverse data. It is the contract and the calculator: feed it the
// aggregates (one row per slot), and it returns the normalised curve, a scenario range, and the
// same bias-audit metrics used on the engine's measured curve. A real run needs real inputs.
//
// Usage:
//   node anchor-compare.mjs --config anchor.json [--json out.json] [--markdown out.md]
//   node anchor-compare.mjs --schema
//   node anchor-compare.mjs --selftest
//
// Config shape:
//   {
//     "anchor": "QB", "scale": 1000,
//     "params": { "pointsPerEpa": 4.5, "winsPerPoint": 0.030769,
//                  "scenarios": { "low": 0.8, "mid": 1.0, "high": 1.2 } },
//     "slots": {
//       "QB":  { "snaps": 1.00, "epaAboveReplacement": 0.10 },
//       "WR1": { "snaps": 0.85, "epaAboveReplacement": 0.04 }
//     },
//     "tables": { "salary": { "QB": 1000, "WR1": 650 } },
//     "pairs": [ { "measured": "mid", "table": "salary" } ]
//   }
//
// The scenario factor multiplies EPA/play, not the final value, so the volume term stays fixed.
// `snaps` is a share of the team's offensive or defensive snaps (0..1), not a raw count.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { compare, formatMarkdown, normalise } from './bias-audit.mjs';

export const DEFAULT_PARAMS = {
  pointsPerEpa: 4.5,
  winsPerPoint: 1 / 32.5,
  scenarios: { low: 0.8, mid: 1.0, high: 1.2 },
};

export function valueCurve(slots, params = DEFAULT_PARAMS) {
  const { pointsPerEpa, winsPerPoint } = { ...DEFAULT_PARAMS, ...params };
  if (!(pointsPerEpa > 0) || !(winsPerPoint > 0)) throw new Error('pointsPerEpa and winsPerPoint must be > 0');
  const values = {};
  for (const [slot, row] of Object.entries(slots)) {
    if (!Number.isFinite(row.snaps) || row.snaps < 0) throw new Error(`${slot}: snaps must be a finite share >= 0`);
    if (!Number.isFinite(row.epaAboveReplacement)) throw new Error(`${slot}: epaAboveReplacement must be finite`);
    values[slot] = row.snaps * row.epaAboveReplacement * pointsPerEpa * winsPerPoint;
  }
  return values;
}

export function uncertaintyCurves(slots, params = DEFAULT_PARAMS) {
  const p = { ...DEFAULT_PARAMS, ...params };
  const mid = valueCurve(slots, p);
  const low = {};
  const high = {};
  const z = p.z ?? 1.96;
  for (const [slot, row] of Object.entries(slots)) {
    if (Number.isFinite(row.epaSe)) {
      low[slot] = row.snaps * (row.epaAboveReplacement - z * row.epaSe) * p.pointsPerEpa * p.winsPerPoint;
      high[slot] = row.snaps * (row.epaAboveReplacement + z * row.epaSe) * p.pointsPerEpa * p.winsPerPoint;
    } else {
      // Uniform fallback: a shock to every slot's efficiency. It cancels in normalised space
      // (every slot moves by the same factor), so supply epaSe when slot-specific uncertainty matters.
      low[slot] = mid[slot] * (p.scenarios.low ?? 0.8);
      high[slot] = mid[slot] * (p.scenarios.high ?? 1.2);
    }
  }
  return { low, mid, high };
}

export function scenarioRange(curves, slots) {
  const out = {};
  for (const slot of Object.keys(slots)) {
    const vals = [curves.low[slot], curves.mid[slot], curves.high[slot]];
    out[slot] = { min: Math.min(...vals), mid: curves.mid[slot], max: Math.max(...vals) };
  }
  return out;
}

export function formatRange(curves, slots, anchor = 'QB', scale = 1000) {
  const mid = normalise(curves.mid, anchor, scale);
  const low = normalise(curves.low, anchor, scale);
  const high = normalise(curves.high, anchor, scale);
  const out = [];
  out.push('| slot | snaps | EPA/play above repl. | EPA se | mid (anchor=1000) | low | high | range |');
  out.push('|---|---:|---:|---:|---:|---:|---:|---:|');
  for (const slot of Object.keys(slots).sort()) {
    const se = Number.isFinite(slots[slot].epaSe) ? slots[slot].epaSe.toFixed(3) : '—';
    out.push(`| ${slot} | ${slots[slot].snaps.toFixed(2)} | ${slots[slot].epaAboveReplacement.toFixed(3)} | ${se} | ${mid[slot].toFixed(0)} | ${low[slot].toFixed(0)} | ${high[slot].toFixed(0)} | ${(high[slot] - low[slot]).toFixed(0)} |`);
  }
  return out.join('\n');
}

// ---------------------------------------------------------------- self-test
function approx(a, b, tol = 1e-9) { return Math.abs(a - b) <= tol; }
function assert(cond, msg) { if (!cond) throw new Error(`selftest: ${msg}`); }

export function selftest() {
  const slots = {
    QB: { snaps: 1.0, epaAboveReplacement: 0.10, epaSe: 0 },
    WR1: { snaps: 0.8, epaAboveReplacement: 0.05, epaSe: 0.01 },
    CB1: { snaps: 0.9, epaAboveReplacement: 0.02, epaSe: 0.005 },
  };
  const params = { pointsPerEpa: 4.5, winsPerPoint: 1 / 32.5 };
  const curves = uncertaintyCurves(slots, params);

  // Raw values: QB 1.0*0.10*4.5/32.5; WR1 0.8*0.05*4.5/32.5; CB1 0.9*0.02*4.5/32.5.
  assert(approx(curves.mid.QB, 0.1 * 4.5 / 32.5), 'QB raw');
  assert(approx(curves.mid.WR1, 0.8 * 0.05 * 4.5 / 32.5), 'WR1 raw');
  assert(approx(curves.mid.CB1, 0.9 * 0.02 * 4.5 / 32.5), 'CB1 raw');

  const mid = normalise(curves.mid, 'QB', 1000);
  assert(approx(mid.QB, 1000), 'QB normalised');
  assert(approx(mid.WR1, 400), `WR1 normalised, got ${mid.WR1}`);
  assert(approx(mid.CB1, 180), `CB1 normalised, got ${mid.CB1}`);

  // Slot-specific uncertainty: QB se=0 keeps the anchor fixed; WR1 se=0.01 spans ±1.96 se.
  const low = normalise(curves.low, 'QB', 1000);
  const high = normalise(curves.high, 'QB', 1000);
  assert(approx(low.WR1, 400 * (0.05 - 1.96 * 0.01) / 0.05), `WR1 low, got ${low.WR1}`);
  assert(approx(high.WR1, 400 * (0.05 + 1.96 * 0.01) / 0.05), `WR1 high, got ${high.WR1}`);
  assert(low.WR1 < mid.WR1 && mid.WR1 < high.WR1, 'WR1 range order');
  assert(approx(low.CB1, 180 * (0.02 - 1.96 * 0.005) / 0.02), `CB1 low, got ${low.CB1}`);

  // A table equal to the mid curve compares exactly; the low curve does not.
  const equal = compare(curves.mid, curves.mid, { groups: { all: ['WR1', 'CB1'] } });
  assert(approx(equal.mae, 0) && approx(equal.spearman, 1), 'equal table');
  const shifted = compare(curves.low, curves.mid, { groups: { all: ['WR1', 'CB1'] } });
  assert(shifted.mae > 0, 'low vs mid MAE');

  const range = scenarioRange(curves, slots);
  assert(approx(range.WR1.min, curves.low.WR1), 'range min');
  assert(approx(range.WR1.max, curves.high.WR1), 'range max');

  // A uniform scenario shock cancels in normalised space — the reason epaSe exists.
  const uniform = uncertaintyCurves(
    { QB: { snaps: 1, epaAboveReplacement: 0.1 }, WR1: { snaps: 1, epaAboveReplacement: 0.05 } },
    { pointsPerEpa: 4.5, winsPerPoint: 1 / 32.5, scenarios: { low: 0.8, mid: 1.0, high: 1.2 } },
  );
  const uMid = normalise(uniform.mid, 'QB', 1000);
  const uLow = normalise(uniform.low, 'QB', 1000);
  assert(approx(uLow.WR1, uMid.WR1), 'uniform shock cancels');

  return true;
}

const SCHEMA = `# anchor-compare input schema (v1)

{
  "anchor": "QB",                 // slot used to normalise; must exist in every curve/table
  "scale": 1000,                  // normalised anchor value
  "params": {
    "pointsPerEpa": 4.5,          // points per EPA; document the source
    "winsPerPoint": 0.030769,     // 1 / 32.5; document the source
    "z": 1.96,                    // CI multiplier for epaSe
    "scenarios": { "low": 0.8, "mid": 1.0, "high": 1.2 }   // uniform fallback; cancels in normalised space
  },
  "slots": {
    "QB":  { "snaps": 1.00, "epaAboveReplacement": 0.10, "epaSe": 0.00 },
    "WR1": { "snaps": 0.85, "epaAboveReplacement": 0.04, "epaSe": 0.01 }
  },
  "tables": { "salary": { "QB": 1000, "WR1": 650 } },
  "pairs": [ { "measured": "mid", "table": "salary" } ]
}

Required per slot: snaps (share 0..1), epaAboveReplacement (EPA/play minus the replacement
level at that slot; negative is allowed). Optional epaSe: the standard error of the EPA/play
estimate; when present, low/high = epaAboveReplacement ± z × epaSe. When absent, the uniform
scenario factors are used, but they cancel in normalised space — a uniform efficiency shock
does not change relative slot values. Every input must name its source in the file that
produces it. Missing slots are dropped from the comparison and reported, never filled in.

Formula:
  value(slot) = snaps × (EPA/play − replacement EPA/play) × pointsPerEPA × winsPerPoint
  low/high    = snaps × (EPA/play − replacement ± z × epaSe) × pointsPerEPA × winsPerPoint
  normalised  = value / value[anchor] × scale
`;

function main(argv) {
  const args = argv.slice(2);
  if (args.includes('--selftest')) {
    selftest();
    console.log('anchor-compare selftest: PASS (9 assertions)');
    return 0;
  }
  if (args.includes('--schema')) {
    console.log(SCHEMA);
    return 0;
  }
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const configPath = get('--config');
  if (!configPath) {
    console.error('usage: node anchor-compare.mjs --config anchor.json [--json out.json] [--markdown out.md] | --schema | --selftest');
    return 2;
  }
  const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const anchor = cfg.anchor ?? 'QB';
  const scale = cfg.scale ?? 1000;
  const params = { ...DEFAULT_PARAMS, ...(cfg.params ?? {}) };
  if (!cfg.slots || Object.keys(cfg.slots).length === 0) throw new Error('config has no slots');
  const curves = uncertaintyCurves(cfg.slots, params);
  const range = scenarioRange(curves, cfg.slots);
  const out = [];
  out.push('# Data anchor — snap × EPA above replacement');
  out.push('');
  out.push(`Formula: \`value = snaps × (EPA/play − replacement) × ${params.pointsPerEpa} points/EPA × ${params.winsPerPoint.toFixed(6)} wins/point\`.`);
  const hasSe = Object.values(cfg.slots).some((s) => Number.isFinite(s.epaSe));
  out.push(hasSe
    ? `Uncertainty: ±${(params.z ?? 1.96)} × EPA standard error where supplied; uniform scenario fallback otherwise. Normalised to ${anchor}=${scale} in every scenario.`
    : `Scenarios: ${Object.entries(params.scenarios).map(([k, v]) => `${k}=${v}×`).join(', ')} (uniform; cancels in normalised space). Normalised to ${anchor}=${scale}.`);
  out.push('');
  out.push(formatRange(curves, cfg.slots, anchor, scale));
  const results = [];
  for (const pair of cfg.pairs ?? []) {
    const measured = curves[pair.measured];
    const table = cfg.tables?.[pair.table]?.values ?? cfg.tables?.[pair.table];
    if (!measured) throw new Error(`pair measured=${pair.measured}: no such scenario`);
    if (!table) throw new Error(`pair table=${pair.table}: no such table`);
    results.push(compare(measured, table, {
      anchor, scale, groups: cfg.groups, measuredName: pair.measured, tableName: pair.table,
    }));
  }
  if (results.length) {
    out.push('');
    out.push(formatMarkdown(results, { title: 'Data anchor vs tables', tieTol: 1, scale }));
  }
  const md = out.join('\n');
  const jsonOut = get('--json');
  const mdOut = get('--markdown');
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ config: path.basename(configPath), curves, range, results }, null, 2));
  if (mdOut) fs.writeFileSync(mdOut, `${md}\n`);
  console.log(md);
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = main(process.argv);
  } catch (err) {
    console.error(`anchor-compare: ${err.message}`);
    process.exitCode = 1;
  }
}
