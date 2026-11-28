/* probe-season-loop.mjs — walk the season exactly as the shell battery's S7 loop does, printing the
   screen, the CTA text, the hub count and any page error after EVERY step, to find where the loop
   stalls at 7. */
import fs from 'node:fs'; import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error("playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: " + e.message); }
const ROOT = process.cwd();
const PORT = process.env.CP_PORT || 4179;
const { buildPool, newDraft, DEFAULT_CONFIG, runDraft, snakeOrder, freezePool, makeRng } =
  await import(path.join(ROOT, 'src/lib/port/seam.ts'));
const pool = buildPool(
  fs.readFileSync(path.join(ROOT, 'data/nfl/madden27-ratings.csv'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'data/nfl/free-agents-old-ratings.csv'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'data/nfl/player-ids.csv'), 'utf8'));
const st = newDraft(pool, makeRng(2026).fork('draft'), DEFAULT_CONFIG, snakeOrder());
runDraft(st, makeRng(2026).fork('run'), { team: 5, policy: 'greedy' });
const RECORD = { seed: 2026, userTeam: 5, pool: freezePool(pool), picks: st.log.map((p) => ({ overall: p.overall, team: p.team, pid: p.player.id, slot: p.slot })) };

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = []; page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(2000);
await page.evaluate((rec) => { (window).__cp.store.dispatch({ type: 'LOAD', record: rec }); }, RECORD);
await page.evaluate(() => { (window).__cp.refresh && (window).__cp.refresh(); });
await page.waitForTimeout(300);
await page.evaluate(() => { (window).__cp.go('complete'); });
await page.waitForTimeout(300);
await page.locator('.cp-done .cp-cta').click(); await page.waitForTimeout(700);

for (let i = 1; i <= 12; i++) {
  const btn = page.locator('.cp-hub .cp-cta, .cp-week .cp-cta').first();
  const cnt = await btn.count();
  let vis = false, txt = '';
  if (cnt) { vis = await btn.isVisible(); if (vis) txt = ((await btn.textContent()) || '').trim(); }
  console.log(`step ${i}: screen=${await page.evaluate(() => document.querySelector('main')?.getAttribute('data-screen'))} btn=${cnt} vis=${vis} text="${txt}" errs=${errs.length}`);
  if (!cnt || !vis) { console.log('page errors:', errs.slice(0, 4)); break; }
  await btn.click(); await page.waitForTimeout(250);
  if (await page.locator('.zrl-t').count()) {
    await page.locator('.cp-feedtool', { hasText: 'BOARD' }).first().click(); await page.waitForTimeout(150);
  }
  if (!(await page.locator('.cp-hub').count())) {
    await page.locator('.cp-navbtn', { hasText: 'SEASON' }).first().click(); await page.waitForTimeout(150);
  }
}
console.log('errors so far:', errs.slice(0, 6));
await browser.close();
