#!/usr/bin/env node
// mathlab/replacement-auditor.mjs — T4: Replacement-level auditor
// Documents the engine's replacement definition per slot and compares to real snap/depth usage.
// Run: node replacement-auditor.mjs <html> <nflverseSnapsJson> [--depth-threshold 0.4]
//   Reads the engine's replacement logic (via engine introspection) and compares to snap data.

import fs from 'fs';
import { chromium } from 'playwright';

interface ReplacementResult {
  slot: string;
  engineReplacement: string;
  realReplacementSnap: number;
  realReplacementOvr: number;
  snapShare: number;
  severity: 'low' | 'medium' | 'high';
}

async function main() {
  const html = process.argv[2];
  const snapsJson = process.argv[3];
  const threshold = Number(process.argv[process.argv.indexOf('--depth-threshold') + 1] || 0.4);

  if (!html || !snapsJson) {
    console.error('usage: node replacement-auditor.mjs <html> <nflverseSnapsJson> [--depth-threshold <n>]');
    process.exit(2);
  }

  const snaps = JSON.parse(fs.readFileSync(snapsJson, 'utf8'));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + html);
  await page.waitForFunction(() => typeof slotWinsTable === 'function, typeof matchupModel === 'function', { timeout: 30000 });

  // Introspect the engine's replacement logic via available globals
  const engineData = await page.evaluate(() => {
    const data: any = { replacements: {}, slots: [] };
    const ROSTER_SLOTS = (window as any).ROSTER_SLOTS;
    if (ROSTER_SLOTS) {
      data.slots = ROSTER_SLOTS;
      // Try to introspect replacement logic for each slot via the engine's functions
      // The exact API depends on the product; here we attempt a generic lookup.
      const engineReplacements = (window as any).engineReplacements || (window as any).REPLACEMENTS;
      if (engineReplacements) data.replacements = engineReplacements;
      const replFn = (window as any).replacementFor;
      if (typeof replFn === 'function') {
        data.replacementsBySlot = {};
        for (const s of ROSTER_SLOTS) {
          try { data.replacementsBySlot[s] = replFn(s, (window as any).teamRatings); } catch (e) { data.replacementsBySlot[s] = `error: ${(e as Error).message}`; }
        }
      }
    }
    return data;
  });

  await browser.close();

  // Compare against real snap data
  const results: ReplacementResult[] = [];
  for (const slot of engineData.slots || []) {
    const engineRepl = engineData.replacementsBySlot?.[slot] || engineData.replacements?.[slot];
    const realSnap = snaps[slot] || snaps[`${slot}`] || 0;
    const realOvr = snaps[`${slot}Ovr`] || 0;
    const snapShare = realSnap / (realSnap + 1) || realSnap / 53; // placeholder
    const severity = (!engineRepl || engineRepl === 'error:') ? 'high' : (snapShare > threshold ? 'medium' : 'low');
    results.push({ slot, engineReplacement: engineRepl, realReplacementSnap: realSnap, realReplacementOvr: realOvr, snapShare, severity });
  }

  console.log(JSON.stringify(results, null, 2));
  console.log('REPLACMENT AUDITOR DONE');
}

main().catch(e => { console.error(e); process.exit(1); });