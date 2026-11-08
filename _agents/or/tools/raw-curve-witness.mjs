#!/usr/bin/env node
// mathlab/raw-curve-witness.mjs — export derivedWeights() raw (uncalibrated) curves
// beside calibrated ones, per build, archived.
// Run: node raw-curve-witness.mjs <html> [--out-dir <dir>] [--seeds <n>]
//   Exports: raw slotWins spans (uncalibrated) vs calibrated weights table.
//   --seeds controls how many draft seeds to average over (default: 1).

import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const HTML = process.argv[2];
const DIR = process.argv[process.argv.indexOf('--out-dir') + 1] || 'raw-curve-witness';
const SEEDS = Number(process.argv[process.argv.indexOf('--seeds') + 1]) || 1;

if (!HTML) { console.error('usage: node raw-curve-witness.mjs <html> [--out-dir <dir>] [--seeds <n>]'); process.exit(2); }

const outDir = path.join(process.cwd(), DIR);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Collect raw data from inPageTable and inPageStack
  await page.goto('file://' + HTML);
  await page.waitForFunction(() => typeof slotWinsTable === 'function', { timeout: 30000 });
  
  // Export raw slotWins spans
  const rawWins = await page.evaluate(async (seeds) => {
    // Get raw slotWinsTable — this is the uncalibrated engine output
    const slotTable = await (window as any).slotWinsTable();
    // Each slot has w7090, w8090, etc.
    // Raw curve: uncalibrated w7090 per slot
    const raw = {};
    for (const [slot, w] of Object.entries(slotTable)) {
      raw[slot] = { w7090: w.w7090, w8090: w.w8090 };
    }
    return raw;
  }, SEEDS);
  
  // Export calibrated weights (from DEFAULT_WEIGHTS)
  const calibratedWeights = await page.evaluate(() => {
    if (typeof weights === 'object') {
      return JSON.stringify({...weights});
    }
    return null;
  });
  
  // Export best-unit-points at various OVRs
  const stackData = await page.evaluate(async (seeds) => {
    const ROSTER_SLOTS = (window as any).ROSTER_SLOTS || [];
    const POINTS_PER_WIN = (window as any).POINTS_PER_WIN || 17;
    const k = 17 / POINTS_PER_WIN;
    
    const base = {}; ROSTER_SLOTS.forEach(s => { base[s] = { ovr: 80 }; });
    const lg = (window as any).teamRatings(base);
    const bestUnitPts = (lg: any, off: boolean) => {
      // simplified best unit pts calculation
      const units = Object.values(lg).sort((a: any, b: any) => b - a).slice(0, 22);
      return units.reduce((sum: any, v: any) => sum + v, 0);
    };
    
    const results = {};
    [50, 60, 70, 75, 80, 85, 90, 95, 99].forEach(o => {
      const sm = {}; ROSTER_SLOTS.forEach(s => { sm[s] = { ovr: o }; });
      const R = (window as any).teamRatings(sm);
      const on = bestUnitPts(R, true) - bestUnitPts(lg, true);
      const off = bestUnitPts(R, false) - bestUnitPts(lg, false);
      results[o] = { offPts: on, defPts: off, wins: 8.5 + k * (on + off) };
    });
    return results;
  }, SEEDS);
  
  await browser.close();
  
  // Write outputs
  fs.writeFileSync(path.join(outDir, 'raw-slotWins.json'), JSON.stringify(rawWins, null, 2));
  fs.writeFileSync(path.join(outDir, 'calibrated-weights.json'), calibratedWeights);
  fs.writeFileSync(path.join(outDir, 'stack-by-ovr.json'), JSON.stringify(stackData, null, 2));
  
  console.log(`Raw-curve witness exported to ${outDir}/`);
  console.log(`  - raw-slotWins.json: slot w7090 spans (uncalibrated)`);
  console.log(`  - calibrated-weights.json: current DEFAULT_WEIGHTS`);
  console.log(`  - stack-by-ovr.json: lineup performance at various OVRs`);
}

main().catch(e => { console.error(e); process.exit(1); });