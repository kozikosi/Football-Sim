#!/usr/bin/env node
// lablib.mjs — shared boot + reporting helpers for the Z.ai lab (2026-11-08 session)
// Lane: _agents/zai/tools/lab-20261108/ · branch zai-lab-20261108 (local; never pushed from sandbox)
//
// Law respected here (AGENTS.md):
//   §3  product files are READ-ONLY for the lab — we load a build in headless Chromium and
//       never write back; protected constants are read, never assigned.
//   §7  no invented factual data; every real-data input is hash-pinned (sha256 printed).
//   "Moving a number" rule: product RNG is not yet injectable (T-20261022-claude-2), so this
//   lab seeds runs by replacing Math.random with mulberry32 BEFORE any engine call. That is a
//   harness-level injection on the same build, not a product change; every output names it.
//
// T12 · uncertainty wrapper: every JSON this lab writes goes through report() —
//   n, mean, median, sd, se, ci95 (bootstrap over the sampled units), the pre-stated
//   practical-effect threshold, and a practicalFlag ("meaningful" vs "football-nothing").
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const _req = createRequire(import.meta.url);
let pw;
try { pw = _req('playwright'); }
catch { pw = _req('/home/z/.npm-global/lib/node_modules/playwright'); }

export function sha256(p) {
  const h = crypto.createHash('sha256');
  h.update(fs.readFileSync(p));
  return h.digest('hex');
}
export function md5(p) {
  const h = crypto.createHash('md5');
  h.update(fs.readFileSync(p));
  return h.digest('hex');
}

// ---- T12 · uncertainty wrapper ------------------------------------------------
// values: array of numbers sampled from independent units (rosters or seeds — never
// repeated games of the same roster). threshold: pre-stated practical-effect size,
// in the SAME unit as the mean (e.g. wins per season). Written before running.
export function report(values, threshold, unit = 'value', extra = {}) {
  const v = values.filter(x => Number.isFinite(x));
  const n = v.length;
  if (!n) return { n: 0, unit, threshold, note: 'no samples', ...extra };
  const mean = v.reduce((a, b) => a + b, 0) / n;
  const sorted = [...v].sort((a, b) => a - b);
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const sd = n > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1)) : 0;
  const se = sd / Math.sqrt(n);
  // bootstrap CI over the sampled units (2000 resamples, percentile method)
  let lo = median, hi = median;
  if (n > 1) {
    const boots = [];
    let seed = 20261108;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (let b = 0; b < 2000; b++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += v[Math.floor(rnd() * n)];
      boots.push(s / n);
    }
    boots.sort((a, b) => a - b);
    lo = boots[Math.floor(0.025 * boots.length)];
    hi = boots[Math.ceil(0.975 * boots.length) - 1];
  }
  const practical = Math.abs(mean) >= threshold; // pre-stated, never tuned after the fact
  return {
    n, unit, mean: r6(mean), median: r6(median), sd: r6(sd), se: r6(se),
    ci95: [r6(lo), r6(hi)], threshold, practicalFlag: practical ? 'MEANINGFUL' : 'FOOTBALL-NOTHING',
    ...extra,
  };
}
const r6 = x => Math.round(x * 1e6) / 1e6;

// ---- build loader --------------------------------------------------------------
// Opens a product build read-only, waits for engine boot, injects the in-page lab core.
export async function openBuild(file, inpageSrc) {
  const browser = await pw.chromium.launch({ executablePath: process.env.ZPB_CHROME || undefined });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 300)));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + String(m.text()).slice(0, 300)); });
  await page.goto('file://' + path.resolve(file), { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(1000);
  await page.evaluate(inpageSrc);
  const boot = await page.evaluate(() => ({
    hasEngine: typeof slotWins === 'function' && typeof ROSTER_SLOTS !== 'undefined',
    slots: (typeof ROSTER_SLOTS !== 'undefined') ? ROSTER_SLOTS.length : 0,
    hasSeason: typeof startSeason === 'function' && typeof simulateCurrentWeek === 'function',
    hasDraft: typeof buildSnakeOrder === 'function' && typeof cpuPick === 'function',
    defaultWeights: (typeof DEFAULT_WEIGHTS !== 'undefined') ? DEFAULT_WEIGHTS : null,
    modelWeightsOut: (typeof modelWeights === 'function') ? modelWeights() : null,
    flex: (typeof FLEX !== 'undefined') ? FLEX : null,
  }));
  if (!boot.hasEngine) { await browser.close(); throw new Error('ENGINE NOT LOADED from ' + file); }
  return { browser, page, boot, errors };
}

export function writeJSON(outPath, obj) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(obj, null, 1));
  console.log('WROTE', outPath, fs.statSync(outPath).size, 'bytes');
}
