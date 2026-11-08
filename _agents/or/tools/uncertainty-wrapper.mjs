#!/usr/bin/env node
// mathlab/uncertainty-wrapper.mjs — T12: Uncertainty wrapper (reporting law)
// Every lab JSON must include: n, spread, CI, pre-stated practical-effect threshold.
// Run: node uncertainty-wrapper.mjs <input.json> --threshold <n> [--output <file>]
import fs from 'fs';

interface UncertaintyReport {
  n: number;
  spread: number;
  ci: { lo: number; hi: number; level: number };
  practicalEffectThreshold: number;
  passed: boolean;
}

function computeUncertainty(values: number[], threshold: number): UncertaintyReport {
  const n = values.length;
  if (n === 0) throw new Error('empty values');
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const sorted = [...values].sort((a, b) => a - b);
  const spread = sorted[n - 1] - sorted[0];
  const nBootstrap = 1000;
  const bootstraps: number[] = [];
  for (let i = 0; i < nBootstrap; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) sum += values[Math.floor(Math.random() * n)];
    bootstraps.push(sum / n);
  }
  bootstraps.sort((a, b) => a - b);
  const ciLo = bootstraps[Math.floor(nBootstrap * 0.025)];
  const ciHi = bootstraps[Math.ceil(nBootstrap * 0.975)];
  const passed = spread <= threshold;
  return { n, spread, ci: { lo: ciLo, hi: ciHi, level: 0.95 }, practicalEffectThreshold: threshold, passed };
}

function main() {
  const args = process.argv.slice(2);
  const jsonPath = args.find(a => !a.startsWith('--'));
  const thresholdArg = args.find(a => a === '--threshold');
  const outputArg = args.find(a => a === '--output');
  if (!jsonPath || !thresholdArg) { console.error('usage: node uncertainty-wrapper.mjs <input.json> --threshold <n> [--output <file>]'); process.exit(2); }
  const threshold = Number(args[args.indexOf('--threshold') + 1]);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let values: number[];
  if (Array.isArray(data)) values = data;
  else if (data.values) values = data.values;
  else if (typeof data === 'object') values = Object.values(data).filter(v => typeof v === 'number');
  else { console.error('could not extract numeric values from JSON'); process.exit(1); }
  const report = computeUncertainty(values, threshold);
  if (outputArg) {
    const outPath = args[args.indexOf('--output') + 1];
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
    console.log(`Uncertainty report written to ${outPath}`);
  } else { console.log(JSON.stringify(report, null, 2)); }
  if (!report.passed) { console.error(`UNCERTAINTY FAIL: spread ${report.spread} exceeds threshold ${report.practicalEffectThreshold}`); process.exit(1); }
  console.log('UNCERTAINTY PASS');
}

main();
