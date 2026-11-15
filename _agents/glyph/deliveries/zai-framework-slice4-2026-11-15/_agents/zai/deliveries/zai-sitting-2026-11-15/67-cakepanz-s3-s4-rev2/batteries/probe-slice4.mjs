/* probe — slice 4: complete a draft through the store, then the feed */
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }
const { candidates } = await import('../src/engine/sports/nfl/engine/draft.ts');
const { restoreDraft } = await import('../src/engine/sports/nfl/app/store.ts');
const { feedVM } = await import('../src/lib/feedVM.ts');

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto('http://localhost:4179/?dev=1');
await page.waitForTimeout(2200);
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click();
await page.waitForTimeout(900);
console.log('play btn while drafting:', await page.locator('.cp-play').count());

// complete the draft through the REAL store reducer: 32 user picks, engine-advised slot each time
const t0 = Date.now();
for (let turn = 0; turn < 32; turn++) {
  const pick = await page.evaluate(async () => {
    const st = window.__cp.store.getState();
    if (!st.record || !st.draft) return null;
    if (st.status === 'done') return 'done';
    // rebuild the same draft node-free via the exposed record: use the engine's own restoreDraft in-page? Not
    // exposed — so return the record and let the node side advise.
    return { seed: st.record.seed, userTeam: st.record.userTeam, picks: st.record.picks.length, status: st.status };
  });
  if (pick === 'done' || pick === null) break;
  // node-side advice from the SAME record (frozen pool + log) via the engine's restoreDraft + candidates
  const record = await page.evaluate(() => JSON.parse(JSON.stringify(window.__cp.store.getState().record)));
  const draftState = restoreDraft(record);
  const c = candidates(draftState, record.userTeam);
  if (!c.length) { console.log('no candidates at turn', turn); break; }
  await page.evaluate(({ pid, slot }) => { window.__cp.store.dispatch({ type: 'PICK', playerId: pid, slot }); }, { pid: c[0].player.id, slot: c[0].slot });
}
console.log('draft filled in', ((Date.now() - t0) / 1000).toFixed(1) + 's');
const status = await page.evaluate(() => window.__cp.store.getState().status);
console.log('store status:', status);
console.log('play btn when done:', await page.locator('.cp-play').count());
await page.locator('.cp-play').click();
await page.waitForTimeout(900);
console.log('feed mounted:', await page.locator('.cp-feed').count());
const dom = await page.evaluate(() => ({
  lines: document.querySelectorAll('.cp-feed-line').length,
  me: document.querySelectorAll('.cp-feed-line.cp-me').length,
  final: document.querySelector('.cp-feed-final')?.textContent?.replace(/\s+/g, ' ').slice(0, 90),
  firstDrive: document.querySelector('.cp-feed-line .zrl-t')?.textContent,
  badges: document.querySelectorAll('.cp-feed-line .zrl-badge').length,
  foot: document.querySelector('.cp-feed-foot span')?.textContent,
}));
console.log('feed DOM:', JSON.stringify(dom));
// node recompute of the SAME game
const record = await page.evaluate(() => JSON.parse(JSON.stringify(window.__cp.store.getState().record)));
const seed = record.seed, ut = record.userTeam;
const vm = feedVM(record, seed, ut);
console.log('node VM: drives', vm.drives.length, '· me', vm.meDrives, '· leadΔ', vm.leadChanges, '· score', vm.awayScore + '-' + vm.homeScore);
console.log('MATCH drives:', vm.drives.length === dom.lines, '· MATCH me:', vm.meDrives === dom.me);
// newest-first toggle
await page.locator('.cp-feedtool', { hasText: 'NEWEST FIRST' }).click();
await page.waitForTimeout(250);
const firstAfter = await page.evaluate(() => ({
  t: document.querySelector('.cp-feed-line .zrl-t')?.textContent,
  n: document.querySelectorAll('.cp-feed-line').length,
}));
console.log('after newest-first, first clock:', firstAfter.t, '(was ' + dom.firstDrive + ') · lines:', firstAfter.n);
console.log('pageerrors:', errs.length ? errs : 'none');
await page.screenshot({ path: 'shots/probe-feed.png', fullPage: true });
await browser.close();
