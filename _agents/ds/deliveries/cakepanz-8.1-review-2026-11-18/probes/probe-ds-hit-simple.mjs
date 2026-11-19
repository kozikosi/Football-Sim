// DS probe: the SIMPLE form at 390px — is the detail chip reachable after the row opens?
// 10 real UI picks at 1180 (where the chips are clickable), then resize to 390 and hit-test.
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const PORT = process.env.CP_PORT || 4180;
const OUT = '/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ds-c81/shots';

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 }, hasTouch: true });
await page.goto(`http://localhost:${PORT}/?dev=1`); await page.waitForTimeout(1800);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click(); await page.waitForTimeout(1000);
for (let i = 0; i < 14; i++) {
  const form = await page.evaluate(() => document.querySelector('.cp-board')?.getAttribute('data-form'));
  if (form === 'simple') break;
  const row = page.locator('.cp-rows .cp-row').first();
  await row.locator('.cp-main').click(); await page.waitForTimeout(120);
  await row.locator('.cp-chip.cp-primary').click(); await page.waitForTimeout(120);
  const go = page.locator('.cp-confirm .cp-go');
  if (await go.count()) await go.click();
  await page.waitForTimeout(420);
}
const form = await page.evaluate(() => document.querySelector('.cp-board')?.getAttribute('data-form'));
await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(400);
await page.locator('.cp-rows .cp-row .cp-main').first().tap(); await page.waitForTimeout(350);
const r = await page.evaluate(() => {
  const box = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), cx: Math.round(b.x + b.width / 2), cy: Math.round(b.y + b.height / 2) }; };
  const det = document.querySelector('[data-testid="cp-simple-detail"]');
  const chips = [...document.querySelectorAll('[data-testid="cp-simple-detail"] .cp-chip')];
  const tip = document.querySelector('.cp-gonetip');
  const vis = (el) => !!el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0;
  const hits = chips.map((c) => { const b = box(c); const el = document.elementFromPoint(b.cx, b.cy); return { text: c.textContent.trim().slice(0, 24), box: b, hit: el ? { tag: el.tagName, cls: String(el.getAttribute('class')).slice(0, 30) } : null }; });
  return { form: document.querySelector('.cp-board')?.getAttribute('data-form'), det: box(det), detVisible: vis(det), tip: box(tip), tipVisible: vis(tip), chips: hits.length, hits, scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth };
});
console.log(JSON.stringify({ formBeforeResize: form, ...r }));
await page.screenshot({ path: path.join(OUT, 'phone-13-simple-hit.png') });
await browser.close();
