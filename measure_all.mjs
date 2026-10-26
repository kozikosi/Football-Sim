import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('file:///Users/kosi/Desktop/wt/or/Football-Sim-PreColors.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);

// All buttons
const buttons = await page.$$eval('button', els => els.map(b => {
  const box = b.getBoundingClientRect();
  return { text: b.textContent.trim(), type: b.type, id: b.id, class: b.className, visible: b.offsetParent !== null, x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) };
}));
console.log('=== ALL BUTTONS ===');
console.log(JSON.stringify(buttons, null, 2));

// All headings
const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', els => els.map(h => ({ tag: h.tagName, text: h.textContent.trim(), visible: h.offsetParent !== null })));
console.log('\n=== ALL HEADINGS ===');
console.log(JSON.stringify(headings, null, 2));

// All sections with id
const sections = await page.$$eval('section[id], div[id]', els => els.map(el => ({ tag: el.tagName, id: el.id, visible: el.offsetParent !== null })));
console.log('\n=== ALL SECTIONS/DIVS WITH ID ===');
console.log(JSON.stringify(sections, null, 2));

// Check what's visible at top
const visibleAtTop = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('*'));
  return els.filter(e => e.offsetParent !== null && e.getBoundingClientRect().y < 400)
    .map(e => ({ tag: e.tagName, className: e.className, id: e.id, text: e.textContent.trim().substring(0,60), y: Math.round(e.getBoundingClientRect().y) }))
    .slice(0, 50);
});
console.log('\n=== ELEMENTS VISIBLE BELOW Y=400 ===');
console.log(JSON.stringify(visibleAtTop, null, 2));

await browser.close();
