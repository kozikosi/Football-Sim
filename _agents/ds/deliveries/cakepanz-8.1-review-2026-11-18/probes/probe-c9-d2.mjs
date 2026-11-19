// DS probe (2026-11-19): does cakepanz-9's gone% tooltip still cover the row detail's chips at 390?
// Static read says the tooltip is 200px right-anchored and still raised by `.cp-main:focus`. This measures it.
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const PORT = process.env.CP_PORT || 4190;

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(1500);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).tap();
await page.locator('.cp-ts-go').tap();
await page.waitForTimeout(1200);

const out = [];
for (let i = 0; i < 6; i++) {
  const row = page.locator('.cp-rows .cp-row').nth(i);
  await row.locator('.cp-main').tap();
  await page.waitForTimeout(220);
  const r = await page.evaluate((idx) => {
    const rows = [...document.querySelectorAll('.cp-rows .cp-row')];
    const row = rows[idx];
    const box = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
    const vis = (el) => !!el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0;
    const tip = row.querySelector('.cp-gonetip');
    const fits = row.querySelector('.cp-fits');
    const chips = [...row.querySelectorAll('.cp-fits .cp-chip')];
    const hitAt = (el, fx) => {
      const b = el.getBoundingClientRect();
      const x = b.x + b.width * fx, y = b.y + b.height / 2;
      const h = document.elementFromPoint(x, y);
      return h ? (h.closest('.cp-chip') ? 'chip' : (h.className || h.tagName)) : null;
    };
    return {
      name: row.querySelector('.cp-name')?.textContent,
      fitsOpen: vis(fits), tipVisible: vis(tip),
      tip: box(tip), fits: box(fits),
      chips: chips.map((c) => ({ text: c.textContent.trim().slice(0, 18), box: box(c), hitCentre: hitAt(c, 0.5), hitRight: hitAt(c, 0.85) })),
      scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth,
    };
  }, i);
  out.push(r);
  await page.evaluate(() => (document.activeElement && document.activeElement.blur ? document.activeElement.blur() : null));
  await page.waitForTimeout(120);
}
console.log(JSON.stringify({ rows: out, errors }, null, 1));
await browser.close();
