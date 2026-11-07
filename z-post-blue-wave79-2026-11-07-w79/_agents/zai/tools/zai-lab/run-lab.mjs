#!/usr/bin/env node
// run-lab.mjs — the Playwright driver for the w79 shell lab (Z.ai, 7 Nov 2026)
// Usage: node run-lab.mjs --file <html> [--out <dir>] [--seeds N] [--sweep]
// Produces: <out>/lab-flex-<tag>.json · <out>/lab-sweep-<tag>.json · console log
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i+1] ? argv[i+1] : d; };
const FILE = path.resolve(arg('--file', '/home/z/my-project/work/build/Football-Sim-Z-post-blue-w79.html'));
const OUTD = path.resolve(arg('--out', '/home/z/my-project/work/results'));
const NSEEDS = parseInt(arg('--seeds', '8'), 10);
const DO_SWEEP = argv.includes('--sweep');
const TAG = arg('--tag', 'w79');
fs.mkdirSync(OUTD, { recursive: true });

import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const INPAGE = fs.readFileSync('/home/z/my-project/work/lab/zpb-lab-inpage.js', 'utf8');
const SEEDS = Array.from({length: NSEEDS}, (_, i) => 7926 + i * 13); // w79 lab seeds

const browser = await pw.chromium.launch({ executablePath: process.env.ZPB_CHROME || undefined });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('file://' + FILE, { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(1200);
await page.evaluate(INPAGE);

const boot = await page.evaluate(() => ({
  hasEngine: typeof slotWins === 'function' && typeof ROSTER_SLOTS !== 'undefined',
  slots: ROSTER_SLOTS.length,
  qbWeight: ZPB_SLOTS_W.QB, wr1Weight: ZPB_SLOTS_W.WR1, te1Weight: ZPB_SLOTS_W.TE1,
  flexTE_WR: FLEX.TE.WR, flexCB_WR: FLEX.CB.WR, flexOG_OT: FLEX.LG.OT, flexDT_DE: FLEX.DT.DE,
  salaryRef: typeof ZPB_SALARY_REF !== 'undefined' && ZPB_SALARY_REF.QB === 40,
  weights: ZPB_SLOTS_W,
}));
console.log('BOOT', JSON.stringify(boot));
if (!boot.hasEngine) { console.error('ENGINE NOT LOADED'); process.exit(2); }

// ---- 1 · the flex scan (before/after lives are the same build; the baseline scan is the deliverable) ----
console.log('FLEX SCAN on', TAG, '· seeds', SEEDS.join(','));
const scan = await page.evaluate(([seeds]) => window.zpbLab.flexScan(seeds, 85), [SEEDS]);
console.log('SCAN COUNTS', JSON.stringify(scan.counts), '· stars scanned:', scan.stars);
console.log('PER-DRAFT', JSON.stringify(scan.perDraft));
const whoLines = Object.entries(scan.who).filter(([n, v]) => v.n > 0)
  .map(([n, v]) => `  ${n}: ${v.natural}/${v.n} natural` + (v.flexed ? ` · flexed ${JSON.stringify(v.bySlot)}` : ''));
console.log('WHO REPORT:\n' + whoLines.join('\n'));
fs.writeFileSync(path.join(OUTD, `lab-flex-${TAG}.json`), JSON.stringify({ tag: TAG, file: path.basename(FILE), seeds: SEEDS, boot: boot.weights, counts: scan.counts, perDraft: scan.perDraft, stars: scan.stars, who: scan.who, placements: scan.placements.slice(0, 60) }, null, 1));

// ---- 2 · determinism probe: the same seed twice = identical scan ----
const detA = await page.evaluate(([s]) => window.zpbLab.scanDraft(s, 85), [SEEDS[0]]);
const detB = await page.evaluate(([s]) => window.zpbLab.scanDraft(s, 85), [SEEDS[0]]);
const det = JSON.stringify(detA.counts) === JSON.stringify(detB.counts) && detA.stars === detB.stars;
console.log('DETERMINISM', det ? 'OK' : 'DRIFT', JSON.stringify(detA.counts), 'vs', JSON.stringify(detB.counts));

// ---- 3 · the weight sweep (downstream effects of changing one weight) ----
if (DO_SWEEP) {
  const deltas = [
    { slot: 'TE1', delta: 50 }, { slot: 'TE1', delta: -50 },
    { slot: 'RB1', delta: 50 }, { slot: 'CB1', delta: 50 },
    { slot: 'WR1', delta: 50 }, { slot: 'DE1', delta: 50 },
    { slot: 'DT1', delta: 50 }, { slot: 'C', delta: 50 },
    { slot: 'MIKE', delta: 50 }, { slot: 'K', delta: 50 }, { slot: 'CB3', delta: 50 },
  ];
  const sweep = await page.evaluate(([d, seeds]) => window.zpbLab.sweep(null, d, seeds), [deltas, SEEDS.slice(0, 4)]);
  console.log('SWEEP baseline', JSON.stringify(sweep.baseline.counts), '· top10', sweep.baseline.rankTop10);
  sweep.runs.forEach(r => console.log(`  ${r.slot} ${r.delta > 0 ? '+' : ''}${r.delta} -> w=${r.w} · drive ${r.drive} · r1 ${JSON.stringify(r.r1top)} · rankChanged ${r.rankChanged} · wins ${r.avgWinsBase.toFixed(2)}->${r.avgWinsNow.toFixed(2)}`));
  fs.writeFileSync(path.join(OUTD, `lab-sweep-${TAG}.json`), JSON.stringify(sweep, null, 1));
}

// ---- 4 · the revealed-impact audit: engine 70->90 vs the displayed weights ----
const audit = await page.evaluate(() => {
  const rows = ROSTER_SLOTS.map(s => {
    const measured = (slotWins(s, 90) - slotWins(s, 70)) / 0.00254;
    return { s, target: ZPB_SLOTS_W[s] || 0, revealed: Math.round(measured * 10) / 10 };
  });
  return rows;
});
const worst = audit.filter(r => Math.abs(r.revealed - r.target) > 50);
console.log('IMPACT AUDIT · max |dev| =', Math.max(...audit.map(r => Math.abs(r.revealed - r.target))).toFixed(1), worst.length ? '· OUT OF ROOM: ' + JSON.stringify(worst) : '· all slots inside the ±50 room');
fs.writeFileSync(path.join(OUTD, `lab-impact-${TAG}.json`), JSON.stringify(audit, null, 1));

console.log('PAGE ERRORS', errors.length, errors.slice(0, 3));
await page.screenshot({ path: path.join(OUTD, `lab-${TAG}-boot.png`), fullPage: false });
await browser.close();
console.log('LAB DONE', TAG);
