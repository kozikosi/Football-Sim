// BENCH-1.5 Pick Reveal verification + PHASE H re-measure (both arms).
// Reveal: dispatch a user PICK → overlay appears (data-testid=pick-reveal) → screenshot mid-beat →
// unmounts by ~1.5s → second pick works (no stuck overlay).
// H: at 360 and 390 — no horizontal scroll, tap targets ≥ 44px, filter vocabulary now matches rows.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { chromium } from 'playwright';

const ARMS = [
  { label: 'vue', dist: '/home/z/my-project/scratch/arm-vue/dist' },
  { label: 'svelte', dist: '/home/z/my-project/scratch/arm-svelte/dist' },
];
const SHOTS = '/home/z/my-project/scratch/wave/shots-reveal';
fs.mkdirSync(SHOTS, { recursive: true });
const userPicks = JSON.parse(fs.readFileSync('/home/z/my-project/scratch/wave/userPicks.json', 'utf8'));

function serve(dist) {
  const server = http.createServer((_q, s) => {
    const url = _q.url === '/' ? '/index.html' : _q.url.split('?')[0];
    const f = path.join(dist, url);
    if (fs.existsSync(f)) { s.setHeader('content-type', url.endsWith('.js') ? 'text/javascript' : 'text/html'); s.end(fs.readFileSync(f)); }
    else { s.statusCode = 404; s.end(); }
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

const out = [];
for (const arm of ARMS) {
  const server = await serve(arm.dist);
  const origin = `http://127.0.0.1:${server.address().port}/`;
  const r = { arm: arm.label, reveal: {}, h: {} };
  const profile = path.join(os.tmpdir(), `bench2-15-${arm.label}`);
  fs.rmSync(profile, { recursive: true, force: true });
  const ctx = await chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 390, height: 844 } });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
  await page.goto(origin, { waitUntil: 'domcontentloaded' });
  for (let i = 0; i < 30; i++) {
    const ok = await page.evaluate(() => typeof window.__bench === 'object' && typeof window.__bench?.pickById === 'function').catch(() => false);
    if (ok) break;
    await page.waitForTimeout(1000);
  }
  const booted = await page.evaluate(() => typeof window.__bench === 'object' && typeof window.__bench?.pickById === 'function').catch((e) => { throw new Error('BOOT FAIL: ' + e.message.slice(0, 120)); });
  if (!booted) throw new Error('BOOT FAIL ' + arm.label + ': __bench incomplete; errs=' + JSON.stringify(errs));
  // pick #1 via the UI, catch the overlay mid-beat
  const row = page.locator('[data-testid="board-row"]').first();
  await row.click();
  await page.locator('[data-testid="pick"]').click();
  await page.waitForSelector('[data-testid="pick-reveal"]', { timeout: 3000 });
  r.reveal.appeared = true;
  r.reveal.text = await page.evaluate(() => document.querySelector('[data-testid="pick-reveal"]')?.innerText.replace(/\n/g, ' | '));
  await page.screenshot({ path: path.join(SHOTS, `reveal-${arm.label}-390.png`) });
  await page.waitForSelector('[data-testid="pick-reveal"]', { state: 'detached', timeout: 3000 });
  r.reveal.unmounted = true;
  // second pick via bridge — no stuck overlay, draft advanced
  await page.evaluate((p) => window.__bench.pickById(p.playerId, p.slot), userPicks[1]);
  r.reveal.secondPickClean = (await page.locator('[data-testid="pick-reveal"]').count()) === 1; // overlay re-shows for pick 2 (the moment repeats)
  await page.waitForSelector('[data-testid="pick-reveal"]', { state: 'detached', timeout: 3000 });
  r.reveal.picks = await page.evaluate(() => window.__bench.store.getState().record.picks.length);

  // H: 360 + 390, horizontal scroll, tap targets, filter vocabulary
  for (const w of [360, 390]) {
    await page.setViewportSize({ width: w, height: 844 });
    await page.waitForTimeout(150);
    r.h[`w${w}`] = {
      horizontalScrollDelta: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
      minTapTargetPx: await page.evaluate(() => Math.min(...[...document.querySelectorAll('.bench-toolbar button, .bench-toolbar select')].map((el) => Math.min(el.getBoundingClientRect().width, el.getBoundingClientRect().height)).filter((n) => n > 0))),
      clipped: await page.evaluate(() => [...document.querySelectorAll('.bench-board td')].some((el) => el.scrollWidth > el.clientWidth + 1)),
    };
  }
  // filter vocabulary: pick a pos token from a rendered row, select it, assert rows match
  const pos0 = await page.evaluate(() => document.querySelector('[data-testid="board-row"]')?.getAttribute('data-pos'));
  await page.selectOption('[data-testid="filter-pos"]', pos0);
  await page.waitForTimeout(120);
  r.h.filterVocabFixed = await page.evaluate((p0) => [...document.querySelectorAll('[data-testid="board-row"]')].every((el) => el.getAttribute('data-pos') === p0), pos0);
  r.h.filterToken = pos0;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(SHOTS, `bench-${arm.label}-390.png`) });
  r.pageErrors = errs;
  await ctx.close();
  server.close();
  out.push(r);
}
fs.writeFileSync('/home/z/my-project/scratch/wave/bench15-H.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
