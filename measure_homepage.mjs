import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('file:///tmp/football-sim.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);

const hero = await page.$('.hero');
const heroBox = hero ? await hero.boundingBox() : null;

const startDraftBtn = await page.$('#startDraftBtn, .resetbtn, button:has-text("Start Draft"), button:has-text("Draft your team")');
let startDraftBox = null;
if (startDraftBtn) {
  startDraftBox = await startDraftBtn.boundingBox();
}

const viewport = await page.viewportSize();
const isStartDraftVisible = startDraftBox ? startDraftBox.y + startDraftBox.height <= viewport.height : false;

const buttons = await page.$$('.hero button, .hero .resetbtn, .hero .tabbtn');
const buttonInfo = [];
for (const btn of buttons) {
  const box = await btn.boundingBox();
  const text = await btn.textContent();
  if (box) buttonInfo.push({ text: text.trim(), x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) });
}

const heroHTML = await page.$eval('.hero', el => el.innerHTML).catch(() => 'NOT FOUND');
const heroText = await page.$eval('.hero', el => el.textContent).catch(() => 'NOT FOUND');

const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
const viewportHeight = viewport.height;
const needsScroll = scrollHeight > viewportHeight;

const headings = await page.$eval('.hero h1, .hero h2', els => els.map(e => ({ tag: e.tagName, text: e.textContent.trim() }))).catch(() => []);

console.log('=== HOMEPAGE MEASUREMENTS (390x844) ===');
console.log('Viewport:', viewport.width, 'x', viewport.height);
console.log('Page scroll height:', scrollHeight, 'needs scroll:', needsScroll);
console.log('Hero bounding box:', heroBox);
console.log('Start Draft button:', startDraftBox ? `x=${startDraftBox.x} y=${startDraftBox.y} w=${startDraftBox.width} h=${startDraftBox.height} visible=${isStartDraftVisible}` : 'NOT FOUND');
console.log('Hero buttons:', JSON.stringify(buttonInfo, null, 2));
console.log('Headings:', JSON.stringify(headings, null, 2));
console.log('Hero text preview:', heroText.substring(0, 200));

await browser.close();
