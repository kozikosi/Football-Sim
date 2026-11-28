// probe-w89-overlay.mjs — one-shot: what element sits at #draftResultsBody's centre in the w89
// reference after DRAFT → Sim to End? Informs the side-by-side ensureScene dismissal (item 8).
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
const pw = _req('playwright');

const URL = process.env.W89_URL || 'https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w89.html';
const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
await page.goto(URL, { timeout: 45000, waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
const draftBtn = page.locator('button', { hasText: 'DRAFT' }).first();
if (await draftBtn.count()) { await draftBtn.click(); await page.waitForTimeout(1500); }
const simEnd = page.locator('button', { hasText: 'Sim to End' }).first();
if (await simEnd.count()) { await simEnd.click(); }
await page.waitForSelector('#draftResultsBody', { state: 'visible', timeout: 90000 }).catch(() => null);
await page.waitForTimeout(1500);
const probe = await page.evaluate(() => {
  const el = document.querySelector('#draftResultsBody');
  if (!el) return { present: false };
  const r = el.getBoundingClientRect();
  const vx0 = Math.max(r.left, 0), vy0 = Math.max(r.top, 0);
  const vx1 = Math.min(r.right, innerWidth), vy1 = Math.min(r.bottom, innerHeight);
  const cx = Math.round((vx0 + vx1) / 2), cy = Math.round((vy0 + vy1) / 2);
  const hit = document.elementFromPoint(cx, cy);
  const chain = [];
  let n = hit;
  while (n && chain.length < 6) { chain.push(`${n.tagName.toLowerCase()}${n.id ? '#' + n.id : ''}${n.className && typeof n.className === 'string' ? '.' + n.className.split(' ').slice(0, 3).join('.') : ''}`); n = n.parentElement; }
  const rect = { left: Math.round(r.left), top: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
  const style = hit ? getComputedStyle(hit) : null;
  const finRow = document.querySelector('.zpb-fin-row');
  const finStyle = finRow ? getComputedStyle(finRow) : null;
  return { present: true, rect, center: [cx, cy], hitChain: chain, hitInsideTarget: !!hit && (hit === el || el.contains(hit)) };
});
console.log(JSON.stringify(probe, null, 1));
// the curtain dismissal test — the reference's own UI entry, at top level (async context)
try {
  await page.locator('.zpb-fin-q').first().click({ timeout: 2500 });
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() => {
    const el = document.querySelector('#draftResultsBody');
    if (!el) return { present: false };
    const r = el.getBoundingClientRect();
    const vx0 = Math.max(r.left, 0), vy0 = Math.max(r.top, 0);
    const vx1 = Math.min(r.right, innerWidth), vy1 = Math.min(r.bottom, innerHeight);
    const ix = Math.round((vx0 + vx1) / 2), iy = Math.round((vy0 + vy1) / 2);
    const hit = document.elementFromPoint(ix, iy);
    const fin = document.querySelector('.zpb-fin-row');
    return { present: true, hitInsideTarget: !!hit && (hit === el || el.contains(hit)), finDisplay: fin ? getComputedStyle(fin).display : null, finVisibility: fin ? getComputedStyle(fin).visibility : null };
  });
  console.log('AFTER CLICK:', JSON.stringify(after, null, 1));
} catch (e) { console.log('AFTER CLICK ERROR:', String(e).split('\n')[0]); }
await browser.close();
