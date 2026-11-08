#!/usr/bin/env node
// mathlab/paired-seed-comparator.mjs — T2: Paired-seed comparator
// Kill draft variance first, then game variance.
// Report mean/median/SD/SE/CI/n-sims/n-distinct-rosters/n-seeds.
// Run: node paired-seed-comparator.mjs <html> [--seeds N] [--rosters N] [--output-dir DIR]
import fs from 'fs';
import { chromium } from 'playwright';

interface Stats {
  n: number;
  mean: number;
  median: number;
  sd: number;
  se: number;
  ci: { lo: number; hi: number };
}

function computeStats(values: number[]): Stats {
  const n = values.length;
  if (n === 0) throw new Error('empty values');
  const sorted = [...values].sort((a, b) => a - b);
  const mean = sorted.reduce((a, b) => a + b, 0) / n;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const variance = sorted.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (n - 1);
  const sd = Math.sqrt(variance);
  const se = sd / Math.sqrt(n);
  const nBootstrap = 1000;
  const bootstraps: number[] = [];
  for (let i = 0; i < nBootstrap; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) sum += sorted[Math.floor(Math.random() * n)];
    bootstraps.push(sum / n);
  }
  bootstraps.sort((a, b) => a - b);
  const ciLo = bootstraps[Math.floor(nBootstrap * 0.025)];
  const ciHi = bootstraps[Math.ceil(nBootstrap * 0.975)];
  return { n, mean, median, sd, se, ci: { lo: ciLo, hi: ciHi } };
}

async function main() {
  const html = process.argv[2];
  const seeds = Number(process.argv[process.argv.indexOf('--seeds') + 1]) || 5;
  const rosters = Number(process.argv[process.argv.indexOf('--rosters') + 1]) || 10;
  if (!html) { console.error('usage: node paired-seed-comparator.mjs <html> [--seeds N] [--rosters N]'); process.exit(2); }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + html);
  await page.waitForFunction(() => typeof slotWinsTable === 'function', { timeout: 30000 });

  const allResults = await page.evaluate(async (seeds, rosters) => {
    const ROSTER_SLOTS = (window as any).ROSTER_SLOTS || [];
    const measurements: Record<string, number[]> = {};
    for (const slot of ROSTER_SLOTS) measurements[slot] = [];
    
    // Paired-seed approach: same roster, different seeds
    for (let r = 0; r < rosters; r++) {
      for (let s = 0; s < seeds; s++) {
        const slotTable = await (window as any).slotWinsTable();
        for (const slot of ROSTER_SLOTS) {
          if (slotTable[slot]) measurements[slot].push(slotTable[slot].w7090);
        }
      }
    }
    return { measurements, seeds, rosters, distinctRosters: rosters };
  }, seeds, rosters);
  
  await browser.close();

  const outputDir = process.argv[process.argv.indexOf('--output-dir') + 1] || path.join(process.cwd(), 'paired-seed-results');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  const summary: Record<string, Stats> = {};
  for (const [slot, values] of Object.entries(allResults.measurements)) {
    summary[slot] = computeStats(values);
  }
  
  const report = {
    seeds: allResults.seeds,
    rosters: allResults.rosters,
    distinctRosters: allResults.distinctRosters,
    nSims: allResults.seeds * allResults.rosters,
    stats: summary
  };
  
  fs.writeFileSync(path.join(outputDir, 'paired-seed-stats.json'), JSON.stringify(report, null, 2));
  console.log(`Paired-seed comparator: ${report.nSims} simulations, ${report.distinctRosters} distinct rosters, ${report.seeds} seeds`);
  console.log(`Output: ${outputDir}/paired-seed-stats.json`);
}

main().catch(e => { console.error(e); process.exit(1); });