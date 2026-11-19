// DS probe: at 390px, which element actually sits at the PRIMARY CHIP's centre after the row is opened?
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');
const PORT = process.env.CP_PORT || 4180;
const OUT = '/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ds-c81/shots';

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await page.goto(`http://localhost:${PORT}/?dev=1`); await page.waitForTimeout(1800);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).tap();
await page.locator('.cp-ts-go').tap(); await page.waitForTimeout(1200);
await page.locator('.cp-rows .cp-row .cp-main').first().tap(); await page.waitForTimeout(350);
const r = await page.evaluate(() => {
  const box = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), cx: Math.round(b.x + b.width / 2), cy: Math.round(b.y + b.height / 2) }; };
  const det = document.querySelector('[data-testid="cp-simple-detail"], .cp-fits');
  const chip = document.querySelector('[data-testid="cp-simple-detail"] .cp-chip.cp-primary, .cp-fits .cp-chip.cp-primary');
  const tip = document.querySelector('.cp-gonetip');
  const vis = (el) => !!el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 0;
  let atPoint = null;
  if (chip) {
    const cb = box(chip);
    const el = document.elementFromPoint(cb.cx, cb.cy);
    atPoint = { tag: el?.tagName, cls: el?.getAttribute('class'), text: (el?.textContent || '').trim().slice(0, 40) };
  }
  return { form: document.querySelector('.cp-board')?.getAttribute('data-form'), det: box(det), detVisible: vis(det), chip: box(chip), chipVisible: vis(chip), tip: box(tip), tipVisible: vis(tip), atChipCentre: atPoint, scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth };
});
console.log(JSON.stringify(r));
await page.screenshot({ path: path.join(OUT, 'phone-12-chip-hit.png') });
await browser.close();
