import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('file:///Users/kosi/Desktop/wt/or/Football-Sim-PreColors.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);

// Check what's visible between y=190 and y=500 (draft setup area)
const elements = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('*'));
  return els
    .filter(e => e.offsetParent !== null)
    .map(e => {
      const r = e.getBoundingClientRect();
      return {
        tag: e.tagName,
        className: e.className,
        id: e.id,
        text: e.textContent.trim().substring(0, 80),
        y: Math.round(r.y),
        h: Math.round(r.height)
      };
    })
    .filter(e => e.y >= 190 && e.y <= 550)
    .sort((a,b) => a.y - b.y);
  return elements;
});
console.log('=== ELEMENTS FROM Y=190 TO Y=550 ===');
console.log(JSON.stringify(elements, null, 2));

await browser.close();
