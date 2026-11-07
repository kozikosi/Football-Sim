#!/usr/bin/env node
// flex_pricer.mjs — T6 · FLEX OPPORTUNITY-COST PRICER v0 (Z.ai lab, 2026-11-08)
// Usage: node flex_pricer.mjs <build.html> <out.json> [--seeds N] [--min-ovr 85]
// For each case (star tag → flex slot): find seeded drafts holding an eligible star (85+ by
// default), measure the wins proxy with the star at his natural slot vs flexed into the
// target slot — BOTH arms re-optimized by the shell's own Hungarian optimizer
// (optimalLineup over slotWins(sl, effOvr(p, sl))), same seed both arms (paired), across
// sampled supporting casts (each seed IS an independently drafted supporting cast).
// Penalty = wins lost; published as a percentile table with the T12 wrapper.
// The Owner's −10 cap stays the interim guard; this tool prices, it never tunes.
import fs from 'node:fs';
import { openBuild, writeJSON, sha256, report } from './lablib.mjs';

const args = process.argv.slice(2);
const file = args[0], out = args[1];
const seedsIx = args.indexOf('--seeds');
const NSEEDS = seedsIx > -1 ? parseInt(args[seedsIx + 1], 10) : 8;
const minIx = args.indexOf('--min-ovr');
const MINOVR = minIx > -1 ? parseFloat(args[minIx + 1]) : 85;
const INPAGE = fs.readFileSync(new URL('./inpage-core.js', import.meta.url), 'utf8');

// cases pre-registered before running (from the w79 lab who-report + Owner's flex table):
const CASES = [
  { tag: 'TE', flexSlot: 'WR1', why: 'the McBride question — elite TE into WR1' },
  { tag: 'CB', flexSlot: 'WR1', why: 'CB>WR 10 penalty (Owner 7 Nov) — does the price hold?' },
  { tag: 'CB', flexSlot: 'FS',  why: 'same-group safety flex' },
  { tag: 'REDG', flexSlot: 'DT1', why: 'edge inside — super-team cramming probe' },
  { tag: 'WR', flexSlot: 'RB1', why: 'receiver into backfield (rare but priced)' },
];

console.log('T6 flex pricer · build:', file, '· seeds:', NSEEDS, '· minOvr:', MINOVR);
const { browser, page, errors } = await openBuild(file, INPAGE);
const seeds = Array.from({ length: NSEEDS }, (_, i) => 20261108 + i * 6007);
const res = await page.evaluate(([cs, ss, mo]) => window.zaiLab2.flexPrice(cs, ss, mo), [CASES, seeds, MINOVR]);
await browser.close();

const published = { schema: 'zai-t6-flex-pricer/0', tool: 'flex_pricer.mjs (T6 v0)', build: { file: file.split('/').pop(), sha256: sha256(file) }, method: { arms: 'natural vs flexed, both re-optimized by the shell optimalLineup (Hungarian over slotWins·effOvr)', paired: 'same draft seed both arms; each seed is an independent supporting cast', winsProxy: 'bestUnitPts(off)+bestUnitPts(def) vs all-80 league baseline × 17/POINTS_PER_WIN — the slotWinsTable() surface', practicalThresholdWins: 0.1 }, cases: [], generated: '2026-11-08', console_errors: errors };

console.log('\ncase                    n   loss mean  median   sd    p50    p75    p90    p95   flag');
for (const c of res.cases) {
  const losses = c.rows.map(r => r.loss);
  const rep = report(losses, published.method.practicalThresholdWins, 'wins/season lost');
  const srt = [...losses].sort((a, b) => a - b);
  const pct = q => srt.length ? srt[Math.min(srt.length - 1, Math.floor(q * srt.length))] : 0;
  const row = {
    case: c.case, n: c.n,
    loss: rep,
    percentiles: { p10: pct(0.10), p25: pct(0.25), p50: pct(0.50), p75: pct(0.75), p90: pct(0.90), p95: pct(0.95) },
    gainCount: losses.filter(x => x < 0).length,
    why: c.case.why,
  };
  published.cases.push(row);
  console.log(`${(c.case.tag + '→' + c.case.flexSlot).padEnd(18)} ${String(c.n).padStart(4)}  ${String(rep.mean).padStart(8)} ${String(rep.median).padStart(7)} ${String(rep.sd).padStart(6)} ${String(row.percentiles.p50).padStart(6)} ${String(row.percentiles.p75).padStart(6)} ${String(row.percentiles.p90).padStart(6)} ${String(row.percentiles.p95).padStart(6)}   ${rep.practicalFlag}${row.gainCount ? ` (${row.gainCount} gains)` : ''}`);
}
writeJSON(out, published);
console.log('\nWROTE', out);
