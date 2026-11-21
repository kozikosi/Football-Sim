/* probe-node-counts.mjs — P-369: the DOM node-count table for the five unmeasured surfaces
 * (Draft Board, Team Select, Feed, Share, Saves) at 1180px and 390px, measured live, printed as a
 * table for the delivery note. Requires the preview server on CP_PORT (default 4179). */
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error("playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: " + e.message); }
const _pw2 = pw;

import fs from 'node:fs';
const ROOT = process.cwd();
const PORT = process.env.CP_PORT || 4179;

const { buildPool, newDraft, DEFAULT_CONFIG, runDraft, snakeOrder, freezePool, makeRng } =
  await import(path.join(ROOT, 'src/lib/port/seam.ts'));
const pool = buildPool(
  fs.readFileSync(path.join(ROOT, 'data/nfl/madden27-ratings.csv'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'data/nfl/free-agents-old-ratings.csv'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'data/nfl/player-ids.csv'), 'utf8'));
const userTeam = 5;
const st = newDraft(pool, makeRng(2026).fork('draft'), DEFAULT_CONFIG, snakeOrder());
runDraft(st, makeRng(2026).fork('run'), { team: userTeam, policy: 'greedy' });
const RECORD = { seed: 2026, userTeam, pool: freezePool(pool), picks: st.log.map((p) => ({ overall: p.overall, team: p.team, pid: p.player.id, slot: p.slot })) };

const browser = await _pw2.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const count = () => page.evaluate(() => document.querySelectorAll('*').length);

await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(2500);
const counts = {};

// Team Select (the boot screen)
counts['TeamSelect@1180'] = await count();
// start the draft → Draft Board
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(200);
await page.locator('.cp-ts-go').click(); await page.waitForTimeout(1200);
counts['DraftBoard@1180'] = await count();
// the season flow → Feed (week 1 played, the user's game feed open)
await page.evaluate((rec) => { (window).__cp.store.dispatch({ type: 'LOAD', record: rec }); }, RECORD);
await page.evaluate(() => { (window).__cp.refresh && (window).__cp.refresh(); });
await page.waitForTimeout(300);
await page.evaluate(() => { (window).__cp.go('complete'); });
await page.waitForTimeout(400);
await page.locator('.cp-done .cp-cta').click(); await page.waitForTimeout(800);
await page.locator('.cp-hub .cp-cta').click(); await page.waitForTimeout(900);
if (await page.locator('.zrl-t').count()) counts['Feed@1180'] = await count();
// Share + Saves (the hash routes)
await page.locator('.cp-navbtn', { hasText: 'SHARE' }).click(); await page.waitForTimeout(500);
counts['Share@1180'] = await count();
await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click(); await page.waitForTimeout(500);
counts['Saves@1180'] = await count();

// the same five at 390px
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => { location.hash = '#/team'; }); await page.waitForTimeout(500);
counts['TeamSelect@390'] = await count();
await page.evaluate(() => { location.hash = '#/board'; }); await page.waitForTimeout(500);
counts['DraftBoard@390'] = await count();
await page.evaluate(() => { location.hash = '#/hub'; }); await page.waitForTimeout(400);
await page.locator('.cp-hub .cp-cta').click(); await page.waitForTimeout(900);
if (await page.locator('.zrl-t').count()) counts['Feed@390'] = await count();
await page.evaluate(() => { location.hash = '#/share'; }); await page.waitForTimeout(500);
counts['Share@390'] = await count();
await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click(); await page.waitForTimeout(500);
counts['Saves@390'] = await count();

await browser.close();
const rows = ['TeamSelect', 'DraftBoard', 'Feed', 'Share', 'Saves'];
console.log('\n== P-369 DOM node counts (measured live, this sitting) ==');
console.log('screen        1180px   390px');
for (const r of rows) {
  const a = counts[r + '@1180'] ?? 'n/a (feed gate closed)';
  const b = counts[r + '@390'] ?? 'n/a (feed gate closed)';
  console.log(String(r).padEnd(13), String(a).padEnd(8), b);
}
