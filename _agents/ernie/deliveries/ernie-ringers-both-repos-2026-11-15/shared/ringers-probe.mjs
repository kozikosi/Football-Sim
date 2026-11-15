// Cardboard Ringers — the shared probe (byte-identical across both arms).
//
// Boots the BUILT app and asserts against the ENGINE's own view-model,
// re-derived node-side — never against constants.
//
//   node scripts/ringers-probe.mjs <distDir> <enginePath>
//
// Prints one line per law:  LAW <n> <PASS|FAIL> <detail>
// Exit 0 only if every law passes.

import { chromium } from 'playwright';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve(process.argv[2]);
const enginePath = path.resolve(process.argv[3]);

const engine = await import(enginePath);
const truth = engine.simulateMatch(2027);

const laws = [];
function law(n, ok, detail) {
  laws.push({ n, ok, detail });
  console.log(`LAW ${n} ${ok ? 'PASS' : 'FAIL'} ${detail}`);
}

function contentType(p) {
  if (p.endsWith('.html')) return 'text/html';
  if (p.endsWith('.js')) return 'text/javascript';
  if (p.endsWith('.css')) return 'text/css';
  if (p.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

const server = http.createServer(async (req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(distDir, rel === '/' ? 'index.html' : rel);
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': contentType(file) });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('nope');
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch();
const results = {};

async function run(label, url, launchOpts) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...(launchOpts || {}) });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(150);

  const rowCount = await page.locator('[data-testid="rrow"]').count();
  law(1, rowCount === truth.rows.length, `${label}: rrow count ${rowCount} vs engine ${truth.rows.length}`);

  let allCells = true;
  let worst = '';
  for (let i = 0; i < truth.rows.length; i++) {
    const r = truth.rows[i];
    const gotSlot = await page.locator(`[data-testid="rrow"] .c-slot`).nth(i).textContent();
    const gotPlayer = await page.locator(`[data-testid="rrow"] .c-player`).nth(i).textContent();
    const gotYards = await page.locator(`[data-testid="rrow"] .c-yards`).nth(i).textContent();
    const gotPts = await page.locator(`[data-testid="rrow"] .c-points`).nth(i).textContent();
    const ok =
      (gotSlot || '').trim() === r.slotId &&
      (gotPlayer || '').trim() === r.player &&
      (gotYards || '').trim() === String(r.yards) &&
      (gotPts || '').trim() === String(r.points);
    if (!ok) {
      allCells = false;
      worst = `row ${i}: got ${JSON.stringify([gotSlot, gotPlayer, gotYards, gotPts])} want ${JSON.stringify([r.slotId, r.player, r.yards, r.points])}`;
    }
  }
  law(2, allCells, `${label}: every cell string-equal to engine VM ${worst}`);

  const score = (await page.locator('[data-testid="score"]').first().textContent() || '').trim();
  const wantScore = `${truth.homeScore}-${truth.awayScore}`;
  law(3, score.replace(/\s+/g, '') === wantScore, `${label}: score "${score}" vs engine ${wantScore}`);

  // determinism: re-simulating the same seed must produce the same table
  const before = await page.locator('[data-testid="board"]').first().textContent();
  const again = page.locator('[data-testid="resim"]');
  if (await again.count()) await again.click();
  await page.waitForTimeout(120);
  const after = await page.locator('[data-testid="board"]').first().textContent();
  law(4, before === after, `${label}: resim byte-identical ${before === after}`);

  const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
  law(5, scroll <= 390.5, `${label}: scrollWidth ${scroll} at 390px`);

  law(6, errors.length === 0, `${label}: ${errors.length} console errors ${errors.slice(0, 2).join(' | ')}`);

  results[label] = { rowCount, score, scroll, errors: errors.length };
  await ctx.close();
}

try {
  await run('http', base, null);
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}

const failed = laws.filter((l) => !l.ok);
console.log(`PROBE ${failed.length === 0 ? 'ALL LAWS PASS' : failed.length + ' LAW(S) FAIL'}`);
process.exit(failed.length === 0 ? 0 : 1);