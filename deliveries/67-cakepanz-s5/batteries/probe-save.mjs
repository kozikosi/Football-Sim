import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
page.on('console', (m) => { if (m.type() === 'warning' || m.type() === 'error') console.log('[console]', m.text().slice(0, 200)); });
await page.goto('http://localhost:4179/?dev=1');
await page.waitForTimeout(2200);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(1000);
const lsBefore = await page.evaluate(() => Object.keys(localStorage));
console.log('ls keys before:', lsBefore);
await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
await page.waitForTimeout(500);
const diag = await page.evaluate(() => ({
  recordNull: (document.querySelector('.cp-saves') ? 'panel mounted' : 'no panel'),
}));
console.log(diag);
await page.locator('.cp-slot[data-slot="A"] .cp-slot-save').click();
await page.waitForTimeout(800);
const after = await page.evaluate(() => ({
  keys: Object.keys(localStorage),
  notice: document.querySelector('.cp-saves-notice')?.textContent ?? '(no notice)',
  slotA: document.querySelector('.cp-slot[data-slot="A"]')?.textContent?.replace(/\s+/g, ' ').slice(0, 140),
  aLen: (localStorage.getItem('sim:nfl:slot:A') || '').length,
}));
console.log(JSON.stringify(after, null, 1));
console.log('pageerrors:', errs.length ? errs : 'none');
await browser.close();
