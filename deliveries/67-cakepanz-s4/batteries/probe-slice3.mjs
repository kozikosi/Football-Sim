/* smoke probe — slice 3 + slice 4 surfaces, run against the preview build */
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const PORT = process.env.CP_PORT || 4179;
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(2500);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(1200);
console.log('needs row chips:', await page.locator('.cp-need').count(), '| label:', await page.locator('.cp-needs-lbl').textContent());
// tooltip
await page.locator('.cp-row .cp-gone-wrap').first().hover();
await page.waitForTimeout(150);
console.log('tooltip visible:', await page.locator('.cp-gonetip').first().isVisible());
console.log('tooltip text:', (await page.locator('.cp-gonetip').first().textContent()).slice(0, 130));
// needs filter
const before = await page.locator('.cp-rows .cp-row').count();
await page.locator('.cp-need', { hasText: 'WR1' }).first().click();
await page.waitForTimeout(200);
const after = await page.locator('.cp-rows .cp-row').count();
console.log('filter WR1: rows', before, '->', after);
await page.locator('.cp-need-all').click();
await page.waitForTimeout(150);
console.log('cleared: rows', await page.locator('.cp-rows .cp-row').count());
// saves panel
await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
await page.waitForTimeout(700);
console.log('slots:', await page.locator('.cp-slot').count(), '| states:', JSON.stringify(await page.locator('.cp-slot-empty').allTextContents()));
await page.locator('.cp-slot[data-slot="A"] .cp-slot-save').click();
await page.waitForTimeout(600);
console.log('slot A after save:', (await page.locator('.cp-slot[data-slot="A"]').textContent()).replace(/\s+/g, ' ').slice(0, 110));
await page.locator('.cp-saves-x').click();
await page.waitForTimeout(300);
console.log('back on board, count:', await page.locator('.cp-count').textContent());
// reload -> slot A persists -> load
await page.reload();
await page.waitForTimeout(2200);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(1000);
await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
await page.waitForTimeout(700);
console.log('slot A after reload:', (await page.locator('.cp-slot[data-slot="A"]').textContent()).replace(/\s+/g, ' ').slice(0, 110));
await page.locator('.cp-slot[data-slot="A"] .cp-slot-load').click();
await page.waitForTimeout(900);
console.log('after load, count:', await page.locator('.cp-count').textContent(), '| team:', await page.locator('.cp-team').textContent());
console.log('page errors so far:', errs.length ? errs : 'none');
await browser.close();
