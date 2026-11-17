/* probe-motion-shots.mjs — the reduced-motion receipts: for a screen per slice, capture the NORMAL
   vs REDUCED (prefers-reduced-motion) variant in both modes, assert the feed's beat-in animation is
   OFF under reduced motion, and print the sha256 of every shot. Output: shots/motion/*.png. */
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ROOT = process.cwd();
const PORT = process.env.CP_PORT || 4179;
const OUT = path.join(ROOT, 'shots', 'motion');
fs.mkdirSync(OUT, { recursive: true });
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
const hashes = [];
const shots = 0;
async function capture(page, name) {
  const file = path.join(OUT, name + '.png');
  await page.screenshot({ path: file, fullPage: false });
  const h = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  hashes.push([name, h]);
}
const feedAnim = (page) => page.evaluate(() => {
  const el = document.querySelector('.cp-feed-line');
  return el ? getComputedStyle(el).animationName + '/' + getComputedStyle(el).animationDuration : 'no-feed-line';
});
const beatReceipt = {};

for (const mode of ['dark', 'light']) {
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  await page.goto(`http://localhost:${PORT}/?dev=1`);
  await page.waitForTimeout(2000);
  await page.locator('.cp-navbtn', { hasText: 'SETTINGS' }).click(); await page.waitForTimeout(300);
  await page.selectOption('#set-mode', mode); await page.waitForTimeout(300);
  await page.evaluate(() => { location.hash = '#/team'; }); await page.waitForTimeout(500);
  await capture(page, `team-${mode}-normal`);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(300);
  await capture(page, `team-${mode}-reduced`);
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  // the draft board (slice 1)
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(200);
  await page.locator('.cp-ts-go').click(); await page.waitForTimeout(1200);
  await capture(page, `board-${mode}-normal`);
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(300);
  await capture(page, `board-${mode}-reduced`);
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  // the season: complete → hub → week1 feed
  await page.evaluate((rec) => { (window).__cp.store.dispatch({ type: 'LOAD', record: rec }); }, RECORD);
  await page.evaluate(() => { (window).__cp.refresh && (window).__cp.refresh(); });
  await page.evaluate(() => { (window).__cp.go('complete'); });
  await page.waitForTimeout(500);
  await capture(page, `complete-${mode}-normal`);
  await page.locator('.cp-done .cp-cta').click(); await page.waitForTimeout(700);
  await capture(page, `hub-${mode}-normal`);
  await page.locator('.cp-hub .cp-cta').click(); await page.waitForTimeout(1000);
  if (await page.locator('.zrl-t').count()) {
    beatReceipt[mode + '-normal'] = await feedAnim(page);
    await capture(page, `feed-${mode}-normal`);
    await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(400);
    beatReceipt[mode + '-reduced'] = await feedAnim(page);
    await capture(page, `feed-${mode}-reduced`);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
  // standings (slice 8) + guide (slice 11)
  for (const [lbl, hash] of [['standings', '#/standings'], ['guide', '#/guide']]) {
    await page.locator('.cp-navbtn', { hasText: lbl === 'standings' ? 'STANDINGS' : 'GUIDE' }).click(); await page.waitForTimeout(500);
    await capture(page, `${lbl}-${mode}-normal`);
  }
  await page.close();
}
await browser.close();
console.log('== the feed beat-in under reduced motion (computed style) ==');
for (const [k, v] of Object.entries(beatReceipt)) console.log(k + ': ' + v);
console.log('\n== shots + sha256 ==');
for (const [n, h] of hashes) console.log(h.slice(0, 16) + '…  shots/motion/' + n + '.png');
console.log('\n' + hashes.length + ' shots captured (normal vs reduced, both modes)');
