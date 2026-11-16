#!/usr/bin/env node
/* e3-extra-part-a-probe.mjs — Rev 8: proves the Part A store cells LIVE under the real DEV server
 * (not only vitest): window.__PART_A__ exposes seasonClass/seasonFacade/weekWrappers (svelte) or
 * useSeasonStore11 (vue). Asserts each store's 11-field surface + envelope on the live page. */
import { spawn } from 'node:child_process';
const root = process.argv[2], marker = process.argv[3];
const port = marker === 'vue' ? 5211 : 5212;
const proc = spawn('npm', ['run', 'dev', '--', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'pipe' });
await new Promise((res) => { let out = ''; proc.stdout.on('data', (d) => { out += d; if (new RegExp('Local:.*' + port).test(out)) res(); }); setTimeout(res, 9000); });
await new Promise((r) => setTimeout(r, 1500));
const { createRequire } = await import('node:module');
const pw = createRequire(import.meta.url)('playwright');
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const errs = []; page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
await page.goto('http://localhost:' + port + '/');
await page.waitForSelector('[data-testid="app-shell"]', { timeout: 15000 });
const out = await page.evaluate((m) => {
  const p = window.__PART_A__;
  if (!p) return { partA: 'MISSING' };
  if (m === 'vue') {
    const { useSeasonStore11 } = p; const s = useSeasonStore11();
    s.ensure(); s.go(s.total);
    return { partA: 'ok', fields: ['slot','ready','view','total','standings','champion','finalists','pickCount','seasonYear','gamesCount','label'].every(k => k in s), total: s.total, champion: s.champion, label: s.label };
  }
  const { seasonClass, seasonFacade, weekWrappers } = p;
  seasonClass.ensure(); seasonClass.go(seasonClass.total);
  seasonFacade.ensure(); seasonFacade.next();
  const wk = weekWrappers; wk.weekGo && wk.weekGo(2);
  return { partA: 'ok', classFields: ['slot','ready','view','total','standings','champion','finalists','pickCount','seasonYear','gamesCount','label'].every(k => k in seasonClass), facadeFields: ['slot','ready','view','total','standings','champion','finalists','pickCount','seasonYear','gamesCount','label'].every(k => k in seasonFacade), classTotal: seasonClass.total, classChampion: seasonClass.champion, classLabel: seasonClass.label, facadeSlotAfterNext: seasonFacade.slot, wrapperSlotAfterGo: wk.weekSlot.value, wrapperViewLabel: wk.weekView_.value.label };
}, marker);
console.log(JSON.stringify({ arm: marker, ...out, pageErrors: errs }));
await browser.close(); proc.kill();
