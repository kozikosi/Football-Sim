/* probe-complete.mjs — introspect the Complete-screen failure: dispatch LOAD through the real store
   in the real page, then print the store state, the error line, and what the main element holds. */
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error("playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: " + e.message); }

import fs from 'node:fs'; import path from 'node:path';
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
const errs = []; page.on('pageerror', (e) => errs.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(2500);

const before = await page.evaluate(() => { const s = (window).__cp.store.getState(); return { status: s.status, hasRecord: !!s.record, err: s.error }; });
console.log('before LOAD:', JSON.stringify(before));
await page.evaluate((rec) => { (window).__cp.store.dispatch({ type: 'LOAD', record: rec }); }, RECORD);
await page.waitForTimeout(400);
const after = await page.evaluate(() => {
  const s = (window).__cp.store.getState();
  return { status: s.status, hasRecord: !!s.record, picks: s.record ? s.record.picks.length : null, err: s.error, screen: document.querySelector('main')?.getAttribute('data-screen'), mainHead: (document.querySelector('main')?.textContent || '').slice(0, 200) };
});
console.log('after LOAD:', JSON.stringify(after, null, 1));
await page.evaluate(() => { (window).__cp.go('complete'); });
await page.waitForTimeout(600);
const complete = await page.evaluate(() => {
  const s = (window).__cp.store.getState();
  return { screen: document.querySelector('main')?.getAttribute('data-screen'), prov: !!document.querySelector('.cp-done-prov'), mainHead: (document.querySelector('main')?.textContent || '').slice(0, 300), err: s.error };
});
console.log('after go(complete):', JSON.stringify(complete, null, 1));
console.log('page errors:', errs.slice(0, 5));
await browser.close();
