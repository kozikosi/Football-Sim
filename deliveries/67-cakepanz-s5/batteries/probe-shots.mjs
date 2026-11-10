/* evidence shots — slice 3 board (needs + tooltip), saves panel, slice 4 feed */
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const { restoreDraft } = await import('../src/engine/sports/nfl/app/store.ts');
const { candidates } = await import('../src/engine/sports/nfl/engine/draft.ts');

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
await page.goto('http://localhost:4179/?dev=1');
await page.waitForTimeout(2200);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(900);
// board with the needs row + an open picker
await page.locator('.cp-row .cp-main').first().click();
await page.waitForTimeout(200);
await page.screenshot({ path: 'shots/slice3-board-needs.png', fullPage: false });
// tooltip shot
await page.locator('.cp-row .cp-main').first().click();
await page.locator('.cp-row .cp-gone-wrap').first().hover();
await page.waitForTimeout(250);
await page.screenshot({ path: 'shots/slice3-gonetip.png', fullPage: false });
// saves panel with a saved draft + the hydrated week card
await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
await page.waitForTimeout(600);
await page.locator('.cp-slot[data-slot="A"] .cp-slot-save').click();
await page.waitForTimeout(700);
const { buildWeekEnvelope } = await import('./weekfixture.mjs');
const weekText = await buildWeekEnvelope();
await page.evaluate((t) => localStorage.setItem('sim:nfl:slot:C', t), weekText);
await page.locator('.cp-saves-x').click(); await page.waitForTimeout(200);
await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
await page.waitForTimeout(1000);
await page.locator('.cp-slot[data-slot="C"] .cp-slot-load').click();
await page.waitForTimeout(400);
await page.screenshot({ path: 'shots/slice3-saves.png', fullPage: true });
// feed
await page.locator('.cp-saves-x').click(); await page.waitForTimeout(300);
for (let turn = 0; turn < 32; turn++) {
  const st = await page.evaluate(() => {
    const s = window.__cp.store.getState();
    return s.status === 'done' ? 'done' : JSON.parse(JSON.stringify(s.record));
  });
  if (st === 'done') break;
  const ds = restoreDraft(st);
  const c = candidates(ds, st.userTeam);
  if (!c.length) break;
  await page.evaluate(({ pid, slot }) => { window.__cp.store.dispatch({ type: 'PICK', playerId: pid, slot }); }, { pid: c[0].player.id, slot: c[0].slot });
}
await page.locator('.cp-play').click();
await page.waitForTimeout(1400);
await page.screenshot({ path: 'shots/slice4-feed.png', fullPage: true });
await browser.close();
console.log('shots written');
