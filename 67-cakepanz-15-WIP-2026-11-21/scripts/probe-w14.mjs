// probe-w14.mjs — S14/P0: the standalone real-browser probe of the shareable-link/autosave
// collision, BOTH directions, filed as a receipt (deliveries/receipts/w14-probe-latest.log).
// The on-record defect (pickle, S13 bytes): with an autosave at a3f2 (seed 470990, one pick),
// opening ?dev=1&seed=k1x9 in the same context restored the STALE draft and rewrote the URL —
// RESULT: DEFECT. This probe asserts the FIXED behaviour both ways and prints the same
// state-dump shape plus RESULT: PASS.
// Run: node --import ./scripts/node-port-register.mjs scripts/probe-w14.mjs   (preview on CP_PORT)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.CP_PORT || 4179);

const out = [];
const say = (s) => { out.push(s); console.log(s); };
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
const AUTO = 'sim:nfl:autosave:draft';

// direction 1 — the collision: an autosave at seed A (470990) vs an explicit link seed B (k1x9 = 935613)
await page.goto(`http://localhost:${PORT}/?dev=1&seed=a3f2`);
await page.waitForTimeout(2800);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.waitForTimeout(150);
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(1100);
await page.locator('.cp-rows .cp-row.cp-suggest .cp-quick').first().click();
await page.waitForTimeout(900);
say(`autosave in place: seed A a3f2 = ${parseInt('a3f2', 36)} (one user pick)`);
await page.goto(`http://localhost:${PORT}/?dev=1&seed=k1x9`);
await page.waitForTimeout(3200);
const d1 = await page.evaluate((k) => {
  let saved = null; try { saved = JSON.parse(localStorage.getItem(k) ?? 'null'); } catch {}
  return {
    seed: window.__cp.store.getState().record?.seed ?? null,
    url: new URL(location.href).searchParams.get('seed'),
    screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
    picks: window.__cp.store.getState().record?.picks?.length ?? null,
    notice: document.querySelector('.cp-sharenotice')?.textContent?.trim() ?? null,
    savedSeed: saved?.payload?.seed ?? null,
  };
}, AUTO);
say('after opening ?dev=1&seed=k1x9 over an a3f2 autosave: ' + JSON.stringify(d1));
const d1ok = d1.seed === null && d1.screen === 'team' && d1.url === 'k1x9'
  && d1.notice === 'shared link opened; your local save is untouched' && d1.savedSeed === 470990;
say(`RESULT direction 1 (link wins): ${d1ok ? 'PASS' : 'DEFECT'}`);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.waitForTimeout(150);
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(1200);
const d1b = await page.evaluate(() => ({
  finalSeed: window.__cp.store.getState().record?.seed ?? null,
  url: new URL(location.href).searchParams.get('seed'),
}));
say('after START on the link: ' + JSON.stringify(d1b) + ' (want finalSeed=935613)');

// direction 2 — the same-seed exception: a reload with ?seed=k1x9 over the k1x9 autosave RESTORES
await page.goto(`http://localhost:${PORT}/?dev=1&seed=k1x9`);
await page.waitForTimeout(3200);
const d2 = await page.evaluate(() => ({
  seed: window.__cp.store.getState().record?.seed ?? null,
  screen: document.querySelector('main.cp-root')?.getAttribute('data-screen'),
  notice: document.querySelector('.cp-sharenotice')?.textContent?.trim() ?? null,
}));
say('after reloading ?dev=1&seed=k1x9 over the k1x9 autosave: ' + JSON.stringify(d2) + ' (want a restore to the board)');
const d2ok = d2.seed === 935613 && d2.screen === 'board' && d2.notice === null;
say(`RESULT direction 2 (same-seed reload restores): ${d2ok ? 'PASS' : 'DEFECT'}`);
say(`pageErrors: ${errs.length}${errs.length ? ' — ' + errs[0] : ''}`);
say(`RESULT: ${d1ok && d2ok && errs.length === 0 ? 'PASS' : 'DEFECT'}`);
await browser.close();
fs.mkdirSync(path.join(ROOT, 'deliveries', 'receipts'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'deliveries', 'receipts', 'w14-probe-latest.log'), out.join('\n') + '\n');
console.log('receipt written: deliveries/receipts/w14-probe-latest.log');
if (!(d1ok && d2ok && errs.length === 0)) process.exit(1);
