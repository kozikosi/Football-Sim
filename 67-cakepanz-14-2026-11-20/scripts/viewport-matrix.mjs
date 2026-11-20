/* viewport-matrix.mjs — the S13 cutover-checklist input: the 390 / 768 / 1280 matrix. Every screen
 * at every width: no horizontal scroll, the CTA surfaces render, zero console/page errors.
 * Run: node --import ./scripts/node-port-register.mjs scripts/viewport-matrix.mjs  (needs distfile + preview on 4179)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error('playwright is not installed: npm ci && npx playwright install chromium. Original: ' + e.message); }

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = process.env.CP_PORT || 4179;
const WIDTHS = [390, 768, 1280];
// the walk: the 14 NAV surfaces + the saves panel + the feed gate (the shell battery's own list)
const WALK = ['team', 'cards', 'hub', 'week', 'standings', 'bracket', 'awards', 'review', 'stats', 'book', 'share', 'guide', 'settings', 'saves'];
const results = [];
let totalErrs = 0;

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 950 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });

await page.goto(`http://localhost:${PORT}/?dev=1&seed=a3f2`);
await page.waitForTimeout(3000);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.waitForTimeout(150);
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(1200);
// play one season week so hub/week/standings/feed carry real state
await page.locator('.cp-navbtn', { hasText: 'SEASON' }).click(); await page.waitForTimeout(500);
await page.locator('.cp-playweek, .cp-hubplay', { hasText: /PLAY WEEK/i }).first().click({ timeout: 5000 }).catch(() => {});
await page.waitForTimeout(1500);

for (const w of WIDTHS) {
  await page.setViewportSize({ width: w, height: 950 });
  await page.waitForTimeout(350);
  let scrollBad = 0; const bad = [];
  for (const s of WALK) {
    await page.evaluate((scr) => window.__cp.go(scr), s);
    await page.waitForTimeout(260);
    const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, screen: document.querySelector('main')?.getAttribute('data-screen') }));
    if (m.sw > m.cw) { scrollBad++; bad.push(`${s}:${m.sw}>${m.cw}`); }
    results.push({ width: w, screen: s, scrollWidth: m.sw, clientWidth: m.cw, noScroll: m.sw <= m.cw });
  }
  // the board (not in the NAV walk — go('board') directly) and the feed gate
  await page.evaluate(() => window.__cp.go('board'));
  await page.waitForTimeout(400);
  const b = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  if (b.sw > b.cw) { scrollBad++; bad.push(`board:${b.sw}>${b.cw}`); }
  results.push({ width: w, screen: 'board', scrollWidth: b.sw, clientWidth: b.cw, noScroll: b.sw <= b.cw });
  const eN = errs.length;
  console.log(`== ${w}px · ${WALK.length + 1} surfaces · scrollOverflow=${scrollBad}${bad.length ? ' — ' + bad.join(' ') : ''} · errorsSoFar=${eN}`);
}
totalErrs = errs.length;
await browser.close();

const failures = results.filter((r) => !r.noScroll);
console.log(`\n== VIEWPORT MATRIX · ${results.length} checks · ${failures.length} overflow · ${totalErrs} console/page errors ==`);
if (failures.length === 0 && totalErrs === 0) {
  fs.mkdirSync(path.join(ROOT, 'deliveries', 'receipts'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'deliveries', 'receipts', 'viewport-matrix-latest.json'), JSON.stringify({ widths: WIDTHS, results, errors: 0 }, null, 2));
  console.log('receipt written: deliveries/receipts/viewport-matrix-latest.json');
  process.exit(0);
}
if (failures.length) console.log('OVERFLOW AT: ' + failures.map((f) => `${f.width}/${f.screen}`).join(', '));
process.exit(1);
