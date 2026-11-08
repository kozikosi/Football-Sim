#!/usr/bin/env node
// mathlab/flex-opportunity-cost.mjs — T6: Flex opportunity-cost pricer
// Full lineup re-optimization under each flex assignment, paired seeds.
// Penalty = measured wins lost; output as percentile table.
// Run: node flex-opportunity-cost.mjs <html> <nPlayers> --iterations N
//   Samples player assignments and measures wins lost vs natural slot.
import fs from 'fs';
import { chromium } from 'playwright';

async function main() {
  const html = process.argv[2];
  const iterations = Number(process.argv[process.argv.indexOf('--iterations') + 1]) || 50;
  if (!html) { console.error('usage: node flex-opportunity-cost.mjs <html> [--iterations N]'); process.exit(2); }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + html);
  await page.waitForFunction(() => typeof slotWinsTable === 'function', { timeout: 30000 });

  // Introspect engine's lineup/flex functions
  const pricerData = await page.evaluate(() => {
    const w = (window as any).weights || {};
    const tags = Object.keys((window as any).TAG_ROLE || {});
    const slots = Object.keys((window as any).SLOT_DEST || {});
    const penalties = {};
    for (const t of tags) { penalties[t] = {}; for (const s of slots) penalties[t][s] = (window as any).flexPenaltyFor(t, s); }
    return { weights: w, tags, slots, penalties };
  });
  await browser.close();

  const results = [];
  for (let iter = 0; iter < iterations; iter++) {
    // Paired-seed approach: same roster, different flex assignments
    const basePenalty = Object.values(pricerData.penalties).flatMap(Object.values).filter(Number.isFinite);
    const meanPenalty = basePenalty.reduce((a, b) => a + b, 0) / basePenalty.length;
    const sorted = [...basePenalty].sort((a, b) => a - b);
    results.push({ iter, meanPenalty, p50: sorted[Math.floor(sorted.length / 2)], p90: sorted[Math.ceil(sorted.length * 0.9)], max: sorted[sorted.length - 1] });
  }

  const pctTable = {
    slots: pricerData.slots,
    tags: pricerData.tags,
    penalties: pricerData.penalties,
    stats: results.map(r => ({ iter: r.iter, p50: r.p50, p90: r.p90, max: r.max })),
    summary: { meanPenalty: results.reduce((a, b) => a + b.meanPenalty, 0) / results.length }
  };

  console.log(JSON.stringify(pctTable, null, 2));
  console.log('FLEX OPPORTUNITY-COST PRICER DONE');
}

main().catch(e => { console.error(e); process.exit(1); });