#!/usr/bin/env node
// bias-audit.mjs — compare a measured slot-value curve against one or more target tables.
//
// Why: a table is a target, not a measurement. The only way to tell whether an engine is
// biased toward a table is to compare the engine's *measured* curve with that table and with
// an independent one. This tool makes that comparison reproducible: rank correlation, scale,
// top-k overlap, rank inversions, and a per-unit residual fingerprint.
//
// It does not fetch data and does not know which table is true. It reports what the numbers say.
//
// Usage:
//   node bias-audit.mjs --config audit.json [--json out.json] [--markdown out.md]
//   node bias-audit.mjs --selftest
//
// Config shape:
//   {
//     "anchor": "QB", "scale": 1000, "tieTol": 1,
//     "groups": { "secondary": ["CB1","CB2","CB3","SS","FS"], ... },
//     "curves": { "precolors": { "source": "...", "values": { "QB": 2.54, ... } } },
//     "tables": { "salary":   { "source": "...", "values": { "QB": 1000, ... } } },
//     "pairs":  [ { "measured": "precolors", "table": "salary" } ]
//   }
//
// Each curve/table is normalised by its own anchor to `scale` before comparison, so a table
// written in points (QB=320) and a curve written in wins/OVR (QB=2.54) are comparable.
// Keys absent from either side are dropped and reported, never invented.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const DEFAULT_GROUPS = {
  QB: ['QB'],
  skill: ['RB1', 'RB2', 'WR1', 'WR2', 'WR3', 'WR4', 'TE1', 'TE2', 'TE3', 'FB'],
  OL: ['OT1', 'OT2', 'OG1', 'OG2', 'C'],
  DL: ['DE1', 'DE2', 'DT1', 'DT2', 'DL5'],
  LB: ['MIKE', 'WILL', 'SAM'],
  secondary: ['CB1', 'CB2', 'CB3', 'CB4', 'DIME', 'SS', 'FS'],
  ST: ['K', 'P'],
};

export function normalise(values, anchor = 'QB', scale = 1000) {
  const base = values[anchor];
  if (!Number.isFinite(base) || base === 0) {
    throw new Error(`anchor ${anchor} is missing or zero`);
  }
  const out = {};
  for (const [k, v] of Object.entries(values)) {
    if (!Number.isFinite(v)) throw new Error(`non-finite value for ${k}: ${v}`);
    out[k] = (v / base) * scale;
  }
  return out;
}

export function rank(values, keys) {
  // Average ranks for ties. The 1 - 6Σd²/(n(n²-1)) shortcut is only exact without ties,
  // and the Owner tables have many ties (five OL at 295, three DE/DT at 350/320, ...).
  const order = [...keys].sort((a, b) => values[b] - values[a] || a.localeCompare(b));
  const r = {};
  let i = 0;
  while (i < order.length) {
    let j = i;
    while (j + 1 < order.length && values[order[j + 1]] === values[order[i]]) j++;
    const avg = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) r[order[k]] = avg;
    i = j + 1;
  }
  return r;
}

export function spearman(a, b, keys) {
  if (keys.length < 2) return NaN;
  // Pearson correlation of the rank vectors — correct in the presence of ties.
  return pearson(rank(a, keys), rank(b, keys), keys);
}

export function pearson(a, b, keys) {
  const n = keys.length;
  if (n < 2) return NaN;
  const ma = keys.reduce((s, k) => s + a[k], 0) / n;
  const mb = keys.reduce((s, k) => s + b[k], 0) / n;
  let num = 0, da = 0, db = 0;
  for (const k of keys) {
    const x = a[k] - ma, y = b[k] - mb;
    num += x * y; da += x * x; db += y * y;
  }
  return da === 0 || db === 0 ? NaN : num / Math.sqrt(da * db);
}

export function ols(x, y, keys) {
  const n = keys.length;
  if (n < 2) return { slope: NaN, intercept: NaN };
  const mx = keys.reduce((s, k) => s + x[k], 0) / n;
  const my = keys.reduce((s, k) => s + y[k], 0) / n;
  let num = 0, den = 0;
  for (const k of keys) {
    num += (x[k] - mx) * (y[k] - my);
    den += (x[k] - mx) ** 2;
  }
  const slope = den === 0 ? NaN : num / den;
  return { slope, intercept: my - slope * mx };
}

export function errors(a, b, keys) {
  const n = keys.length;
  if (n === 0) return { mae: NaN, rmse: NaN, maxDev: NaN, maxKey: null };
  let sum = 0, sq = 0, maxDev = -1, maxKey = null;
  for (const k of keys) {
    const d = b[k] - a[k];
    sum += Math.abs(d);
    sq += d * d;
    if (Math.abs(d) > maxDev) { maxDev = Math.abs(d); maxKey = k; }
  }
  return { mae: sum / n, rmse: Math.sqrt(sq / n), maxDev, maxKey };
}

export function topOverlap(a, b, keys, k) {
  const ta = new Set([...keys].sort((x, y) => b[y] - b[x]).slice(0, k));
  const tb = new Set([...keys].sort((x, y) => a[y] - a[x]).slice(0, k));
  return [...ta].filter((x) => tb.has(x)).length;
}

export function inversions(a, b, keys, tieTol = 1) {
  const out = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const ka = keys[i], kb = keys[j];
      const da = a[ka] - a[kb];
      const db = b[ka] - b[kb];
      if (Math.abs(da) < tieTol || Math.abs(db) < tieTol) continue;
      if (Math.sign(da) !== Math.sign(db)) {
        out.push({ a: ka, b: kb, table: [a[ka], a[kb]], measured: [b[ka], b[kb]] });
      }
    }
  }
  return out.sort((x, y) => Math.abs(y.measured[0] - y.measured[1]) - Math.abs(x.measured[0] - x.measured[1]));
}

export function groupResiduals(measured, table, keys, groups = DEFAULT_GROUPS) {
  const out = {};
  for (const [name, members] of Object.entries(groups)) {
    const present = members.filter((k) => keys.includes(k));
    if (present.length === 0) continue;
    const diffs = present.map((k) => measured[k] - table[k]).sort((x, y) => x - y);
    const mean = diffs.reduce((s, x) => s + x, 0) / diffs.length;
    const median = diffs.length % 2
      ? diffs[(diffs.length - 1) / 2]
      : (diffs[diffs.length / 2 - 1] + diffs[diffs.length / 2]) / 2;
    out[name] = {
      n: diffs.length,
      mean,
      median,
      min: diffs[0],
      max: diffs[diffs.length - 1],
      members: present,
    };
  }
  return out;
}

export function compare(measuredRaw, tableRaw, opts = {}) {
  const {
    anchor = 'QB', scale = 1000, tieTol = 1,
    groups = DEFAULT_GROUPS, measuredName = 'measured', tableName = 'table',
  } = opts;
  const measured = normalise(measuredRaw, anchor, scale);
  const table = normalise(tableRaw, anchor, scale);
  const onlyMeasured = Object.keys(measured).filter((k) => !(k in table)).sort();
  const onlyTable = Object.keys(table).filter((k) => !(k in measured)).sort();
  const keys = Object.keys(measured).filter((k) => k in table).sort();
  if (keys.length < 2) throw new Error(`${measuredName}/${tableName}: fewer than 2 shared slots`);
  const fit = ols(table, measured, keys);
  const err = errors(table, measured, keys);
  const inv = inversions(table, measured, keys, tieTol);
  return {
    measured: measuredName,
    table: tableName,
    n: keys.length,
    keys,
    onlyMeasured,
    onlyTable,
    spearman: spearman(table, measured, keys),
    pearson: pearson(table, measured, keys),
    slope: fit.slope,
    intercept: fit.intercept,
    mae: err.mae,
    rmse: err.rmse,
    maxDev: err.maxDev,
    maxKey: err.maxKey,
    top5: topOverlap(table, measured, keys, Math.min(5, keys.length)),
    top10: topOverlap(table, measured, keys, Math.min(10, keys.length)),
    inversions: inv.length,
    inversionExamples: inv.slice(0, 5),
    groups: groupResiduals(measured, table, keys, groups),
    values: Object.fromEntries(keys.map((k) => [k, { table: table[k], measured: measured[k], delta: measured[k] - table[k] }])),
  };
}

const pct = (x, d = 1) => (Number.isFinite(x) ? `${x >= 0 ? '+' : ''}${x.toFixed(d)}` : 'n/a');
const num = (x, d = 1) => (Number.isFinite(x) ? x.toFixed(d) : 'n/a');

export function formatMarkdown(results, meta = {}) {
  const out = [];
  out.push('# Bias audit — measured curve vs target table');
  if (meta.title) out.push(`\n${meta.title}`);
  if (meta.note) out.push(`\n${meta.note}`);
  for (const r of results) {
    out.push(`\n## ${r.measured} vs ${r.table} (n=${r.n})`);
    out.push('');
    out.push(`- Spearman rho **${num(r.spearman, 3)}** · Pearson r **${num(r.pearson, 3)}** · slope **${num(r.slope, 3)}** · intercept **${num(r.intercept, 1)}**`);
    out.push(`- MAE **${num(r.mae)}** · RMSE **${num(r.rmse)}** · max |dev| **${num(r.maxDev)}** (${r.maxKey}) · top-5 **${r.top5}/5** · top-10 **${r.top10}/10**`);
    out.push(`- Rank inversions **${r.inversions}** (tie tolerance ${meta.tieTol ?? 1} on the ${meta.scale ?? 1000} scale)`);
    if (r.onlyMeasured.length) out.push(`- Only in measured: ${r.onlyMeasured.join(', ')}`);
    if (r.onlyTable.length) out.push(`- Only in table: ${r.onlyTable.join(', ')}`);
    out.push('');
    out.push('| unit | n | mean Δ | median Δ | min Δ | max Δ |');
    out.push('|---|---:|---:|---:|---:|---:|');
    for (const [name, g] of Object.entries(r.groups)) {
      out.push(`| ${name} | ${g.n} | ${pct(g.mean)} | ${pct(g.median)} | ${pct(g.min)} | ${pct(g.max)} |`);
    }
    if (r.inversionExamples.length) {
      out.push('');
      out.push('Largest rank inversions (table says A>B, measured says A<B):');
      out.push('');
      out.push('| A | B | table A/B | measured A/B |');
      out.push('|---|---|---:|---:|');
      for (const x of r.inversionExamples) {
        out.push(`| ${x.a} | ${x.b} | ${num(x.table[0], 0)} / ${num(x.table[1], 0)} | ${num(x.measured[0], 0)} / ${num(x.measured[1], 0)} |`);
      }
    }
    out.push('');
    out.push('Per-slot values (normalised to the anchor):');
    out.push('');
    out.push('| slot | table | measured | Δ |');
    out.push('|---|---:|---:|---:|');
    for (const k of r.keys) {
      const v = r.values[k];
      out.push(`| ${k} | ${num(v.table)} | ${num(v.measured)} | ${pct(v.delta)} |`);
    }
  }
  return out.join('\n');
}

// ---------------------------------------------------------------- self-test
function approx(actual, expected, tol = 1e-9) {
  return Math.abs(actual - expected) <= tol;
}

function assert(cond, msg) {
  if (!cond) throw new Error(`selftest: ${msg}`);
}

export function selftest() {
  const exact = { QB: 1000, A: 500, B: 250, C: 125, D: 60 };
  let r = compare(exact, exact, { groups: { all: ['A', 'B', 'C', 'D'] } });
  assert(approx(r.spearman, 1), 'exact rho');
  assert(approx(r.mae, 0), 'exact MAE');
  assert(approx(r.slope, 1), 'exact slope');
  assert(approx(r.intercept, 0), 'exact intercept');
  assert(r.top5 === 5, 'exact top5');
  assert(r.inversions === 0, 'exact inversions');

  // Known permutation: table ranks QB,A,B,C,D,E = 1..6, measured ranks QB,B,A,D,C,E.
  // d² = 0+1+1+1+1+0 = 4, n = 6 -> rho = 1 - 24/210 = 0.885714...
  const t = { QB: 1000, A: 500, B: 400, C: 300, D: 200, E: 100 };
  const m = { QB: 1000, A: 400, B: 500, C: 200, D: 300, E: 100 };
  r = compare(m, t, { groups: { all: ['A', 'B', 'C', 'D', 'E'] } });
  assert(approx(r.spearman, 0.8857142857142857), `permutation rho, got ${r.spearman}`);

  // Additive shift in one group: residual must equal the shift.
  const shifted = { ...exact, A: 600 };
  r = compare(shifted, exact, { groups: { one: ['A'], rest: ['B', 'C', 'D'] } });
  assert(approx(r.groups.one.mean, 100), 'shift residual');
  assert(approx(r.groups.rest.mean, 0), 'rest residual');

  // Scaling: test the OLS math directly (compare() normalises by the anchor, so a
  // uniform rescale would cancel out); then a relative exaggeration through compare().
  const fit = ols({ A: 1, B: 2, C: 3 }, { A: 2, B: 4, C: 6 }, ['A', 'B', 'C']);
  assert(approx(fit.slope, 2), 'ols slope');
  assert(approx(fit.intercept, 0), 'ols intercept');
  const exaggerated = { QB: 1000, A: 900, B: 450, C: 225, D: 110 };
  r = compare(exaggerated, exact, { groups: { all: ['A', 'B', 'C', 'D'] } });
  assert(approx(r.spearman, 1), 'exaggerated rho');
  assert(r.mae > 0, 'exaggerated MAE');

  // One inversion.
  const inv = { ...exact, A: 400, B: 500 };
  r = compare(inv, exact, { groups: { all: ['A', 'B', 'C', 'D'] } });
  assert(r.inversions === 1, `inversion count, got ${r.inversions}`);

  // Normalisation: a table written with QB=320 must normalise to QB=1000.
  const pts = { QB: 320, A: 160 };
  r = compare({ QB: 2, A: 1 }, pts, { groups: { all: ['A'] } });
  assert(approx(r.values.A.table, 500), 'normalise table');
  assert(approx(r.values.A.measured, 500), 'normalise measured');
  assert(approx(r.mae, 0), 'normalise MAE');

  // Missing keys are reported, never invented.
  r = compare({ QB: 1000, A: 500, Z: 10 }, { QB: 1000, A: 500 }, { groups: { all: ['A'] } });
  assert(r.onlyMeasured.length === 1 && r.onlyMeasured[0] === 'Z', 'missing key report');

  return true;
}

// ---------------------------------------------------------------- CLI
function main(argv) {
  const args = argv.slice(2);
  if (args.includes('--selftest')) {
    selftest();
    console.log('bias-audit selftest: PASS (7 fixtures)');
    return 0;
  }
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const configPath = get('--config');
  if (!configPath) {
    console.error('usage: node bias-audit.mjs --config audit.json [--json out.json] [--markdown out.md] | --selftest');
    return 2;
  }
  const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const anchor = cfg.anchor ?? 'QB';
  const scale = cfg.scale ?? 1000;
  const tieTol = cfg.tieTol ?? 1;
  const groups = cfg.groups ?? DEFAULT_GROUPS;
  const results = [];
  for (const pair of cfg.pairs ?? []) {
    const measured = cfg.curves?.[pair.measured]?.values ?? cfg.curves?.[pair.measured];
    const table = cfg.tables?.[pair.table]?.values ?? cfg.tables?.[pair.table];
    if (!measured || !table) throw new Error(`pair ${pair.measured}/${pair.table}: missing curve or table`);
    results.push(compare(measured, table, { anchor, scale, tieTol, groups, measuredName: pair.measured, tableName: pair.table }));
  }
  if (results.length === 0) throw new Error('no pairs in config');
  const md = formatMarkdown(results, { title: cfg.title, note: cfg.note, tieTol, scale });
  const jsonOut = get('--json');
  const mdOut = get('--markdown');
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ config: path.basename(configPath), results }, null, 2));
  if (mdOut) fs.writeFileSync(mdOut, `${md}\n`);
  console.log(md);
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = main(process.argv);
  } catch (err) {
    console.error(`bias-audit: ${err.message}`);
    process.exitCode = 1;
  }
}
