/* midseason-boot-probe2.mjs — ERNIE, 2026-11-18. Same as probe 1 but dumps the store + console. */
import fs from 'node:fs';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const { chromium } = _req('playwright');

const URL_ = process.argv[2];
const ENV = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [], logs = [];
page.on('pageerror', (e) => errs.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type() + ': ' + m.text().slice(0, 200)); });

await page.goto(URL_, { waitUntil: 'load' });
await page.evaluate(([dk, wk, dv, wv]) => {
  localStorage.clear();
  if (dv) localStorage.setItem(dk, dv);
  if (wv) localStorage.setItem(wk, wv);
}, [ENV.draftKey, ENV.weekKey, ENV.draft, ENV.week]);
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(3000);

const state = await page.evaluate(() => {
  const cp = window.__cp;
  const st = cp?.store?.getState?.() ?? null;
  const m = document.querySelector('main');
  return {
    screen: m?.getAttribute('data-screen') ?? null,
    hub: document.querySelectorAll('.cp-hub').length,
    hubPhase: document.querySelector('.cp-hub')?.getAttribute('data-phase') ?? null,
    rows: document.querySelectorAll('.cp-main').length,
    err: document.querySelector('.cp-error')?.textContent ?? null,
    storeStatus: st?.status ?? null,
    picks: st?.record?.picks?.length ?? null,
    userTeam: st?.record?.userTeam ?? null,
    storeErr: st?.error ?? null,
    seasonReady: cp ? undefined : 'no __cp',
  };
});
console.log(JSON.stringify({ landed: state, pageErrors: errs.slice(0, 3), console: logs.slice(0, 5) }, null, 1));
await browser.close();