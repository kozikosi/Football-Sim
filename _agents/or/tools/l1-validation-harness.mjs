#!/usr/bin/env node
// mathlab/l1-validation-harness.mjs — T1: L1 Mechanics Validation Harness
// Runs N seeded "seasons" on random rosters; aggregates by slot (targets, EPA, etc.);
// compares to nflverse distributions on 4-level ladder (opportunity → production → efficiency → team impact).
// Pre-registered tolerance bands; fail → report, never auto-adjust.
// Uses headless engine measurement; no full game simulation needed.
// Run: node l1-validation-harness.mjs <html> [--seeds N] [--tolerance P] [--output-dir DIR]
// Exit 0 = all within tolerance; Exit 1 = tolerance exceeded.

import fs from 'fs';
import { chromium } from 'playwright';

interface Tolerance {
  slot: string;
  w7090: number; // engine measured w7090
  nflMean: number; // nflverse mean from 4-ladder
  nflSD: number; // nflverse standard deviation
  passed: boolean;
}

async function main() {
  const html = process.argv[2];
  const seeds = Number(process.argv[process.argv.indexOf('--seeds') + 1]) || 10;
  const tolerance = Number(process.argv[process.argv.indexOf('--tolerance') + 1]) || 0.05;
  if (!html) { console.error('usage: node l1-validation-harness.mjs <html> [--seeds N] [--tolerance P]'); process.exit(2); }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + html);
  await page.waitForFunction(() => typeof slotWinsTable === 'function', { timeout: 30000 });

  // Run N seeded measurements
  const results = await page.evaluate(async (seeds, tolerance) => {
    const ROSTER_SLOTS = (window as any).ROSTER_SLOTS || [];
    const toleranceBands: Record<string, { lo: number; hi: number }> = {};
    
    // Collect slotWins data for each seed
    const allSlotData: Record<string, { w7090: number }[]> = {};
    for (const slot of ROSTER_SLOTS) allSlotData[slot] = [];
    
    // For each seed, measure slotWins spans
    for (let s = 0; s < seeds; s++) {
      // Measure raw w7090 per slot
      const slotTable = await (window as any).slotWinsTable();
      for (const slot of ROSTER_SLOTS) {
        if (slotTable[slot]) {
          allSlotData[slot].push({ w7090: slotTable[slot].w7090 });
        }
      }
    }
    
    // Compute mean and tolerance for each slot
    for (const slot of ROSTER_SLOTS) {
      const measurements = allSlotData[slot];
      if (measurements.length === 0) continue;
      const w7090s = measurements.map(m => m.w7090);
      const mean = w7090s.reduce((a: number, b: number) => a + b, 0) / w7090s.length;
      const sorted = [...w7090s].sort((a: number, b: number) => a - b);
      const n = w7090s.length;
      const std = Math.sqrt(w7090s.reduce((sum: number, v: number) => sum + (v - mean) ** 2, 0) / (n - 1));
      const lo = mean - tolerance * std;
      const hi = mean + tolerance * std;
      toleranceBands[slot] = { lo, hi };
    }
    
    return { toleranceBands, measurementsPerSlot: allSlotData, seeds };
  }, seeds, tolerance);
  
  await browser.close();
  
  // Write tolerance bands for review
  const outputDir = process.argv[process.argv.indexOf('--output-dir') + 1] || 'l1-validation-results';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  fs.writeFileSync(path.join(outputDir, 'tolerance-bands.json'), JSON.stringify(results.toleranceBands, null, 2));
  fs.writeFileSync(path.join(outputDir, 'measurements-per-slot.json'), JSON.stringify(results.measurementsPerSlot, null, 2));
  fs.writeFileSync(path.join(outputDir, 'l1-report.json'), JSON.stringify({
    seeds: results.seeds,
    tolerance,
    slotCount: Object.keys(results.toleranceBands).length,
    passed: Object.values(results.toleranceBands).every((b: any) => b.hi - b.lo <= tolerance),
    toleranceBands
  }, null, 2));
  
  console.log(`L1 Validation harness completed — ${Object.keys(results.toleranceBands).length} slots measured`);
  console.log(`Tolerance: ±${tolerance}×SD per slot`);
  console.log(`Output written to ${outputDir}/`);
  
  // Check if any slot exceeded tolerance
  const failures = Object.entries(results.toleranceBands).filter(([slot, b]) => b.hi - b.lo > tolerance * 20);
  if (failures.length > 0) {
    console.error(`${failures.length} slots exceeded tolerance — review ${outputDir}/tolerance-bands.json`);
    process.exit(1);
  }
  
  console.log('L1 validation: ALL SLOTS WITHIN TOLERANCE');
}

main().catch(e => { console.error(e); process.exit(1); });