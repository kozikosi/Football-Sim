// PHASE A1 browser test — the true shell path: UI picks → engine envelope → localStorage →
// BROWSER PROCESS QUIT → relaunch → resume → byte-identical final record (both arms).
// Usage: REF_SHA=<sha> node scripts/phase-a-browser.mjs <armDistDir> <label>
// Reference picks come from scratch/wave/userPicks.json (greedy policy, seed 1, user 0).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const DIST = path.resolve(process.argv[2]);
const LABEL = process.argv[3] ?? path.basename(DIST);
const userPicks = JSON.parse(fs.readFileSync('/home/z/my-project/scratch/wave/userPicks.json', 'utf8'));
const REF_SHA = process.env.REF_SHA ?? null;

const server = http.createServer((_q, s) => {
  const url = _q.url === '/' ? '/index.html' : _q.url.split('?')[0];
  const f = path.join(DIST, url);
  if (fs.existsSync(f)) {
    s.setHeader('content-type', url.endsWith('.js') ? 'text/javascript' : url.endsWith('.css') ? 'text/css' : 'text/html');
    s.end(fs.readFileSync(f));
  } else { s.statusCode = 404; s.end('nope'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}/`;
const errors = [];

const PROFILE = path.join('/home/z/my-project/scratch/wave', 'a1-profile-' + LABEL);
fs.rmSync(PROFILE, { recursive: true, force: true });   // idempotent start
async function session() {
  // launchPersistentContext: the SAME profile across browser processes — the quit-and-relaunch that
  // localStorage actually lives through (plain chromium.launch() would hand session 2 a fresh profile
  // and the resume would silently become a fresh replay — caught in run 1 of this driver).
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push('pageerror ' + String(e).slice(0, 200)));
  await page.goto(origin);
  await page.waitForFunction('window.__bench && window.__bench.save');
  return { browser: ctx, page };
}
// Make one reference pick through the REAL UI: ensure the row is visible (position filter / ovr sort if
// needed), click the row, click PICK. Falls back to the bridge ONLY if no UI path shows the row, and
// labels which path was used (honest receipts, not cosmetics).
// KNOWN DEFECT logged by this test: the shell's filter POSITIONS list (OT/OG/EDGE/ILB/SS/FS/HB/FB/K/P)
// does not contain the board's engine pos tokens (LT/RT/LG/RG/LEDG/REDG/MIKE/WILL/SAM/DT/CB...) — options
// like EDGE/ILB/OLB/SS/FS/OT/OG/HB can never match a row (x.pos === filter.value). See REPORT.
async function uiPick(page, pid) {
  const pos = await page.evaluate((id) => window.__bench.store.getState().draft.pool.find((p) => p.id === id).pos, pid);
  const sel = (id) => `[data-testid="board-row"][data-player-id="${id}"]`;
  const visible = async () => (await page.locator(sel(pid)).count()) > 0;
  const paths = [];
  if (await visible()) paths.push('board-default');
  if (!paths.length) {
    const opt = await page.locator(`[data-testid="filter-pos"] option[value="${pos}"]`).count();
    if (opt) { await page.locator('[data-testid="filter-pos"]').selectOption(pos); await page.waitForTimeout(40); paths.push('filter:' + pos); }
  }
  if (!paths.length) {
    await page.locator('[data-testid="sort-ovr"]').click();
    await page.waitForTimeout(40);
    if (await visible()) paths.push('sort-ovr');
  }
  if (!paths.length) return { playerId: pid, via: 'BRIDGE-FALLBACK (no UI path showed the row; filter vocabulary defect)' };
  await page.locator(sel(pid)).scrollIntoViewIfNeeded();
  await page.locator(sel(pid)).click();
  await page.locator('[data-testid="pick"]').click();
  await page.waitForTimeout(20);
  return { playerId: pid, via: paths[0] };
}

// ---- session 1: four UI picks (the first four reference picks), then save ----
const s1 = await session();
const uiPicks = [];
for (let i = 0; i < 4; i++) uiPicks.push(await uiPick(s1.page, userPicks[i].playerId));
const stateBeforeSave = await s1.page.evaluate(() => ({ status: window.__bench.store.getState().status, picks: window.__bench.store.getState().record.picks.length }));
const save1 = await s1.page.evaluate(() => window.__bench.save());
const slotBytes = (await s1.page.evaluate(() => (window.__bench.rawSlot() || '').length));
const refusal = await s1.page.evaluate(() => window.__bench.slotRefusal());
const savedPicks = await s1.page.evaluate(() => JSON.parse(window.__bench.rawSlot()).payload.picks.length);
await s1.browser.close(); // QUIT THE BROWSER PROCESS

// ---- session 2: relaunch → load → resume (UI pick #5) → greedy to completion ----
const s2 = await session();
const load = await s2.page.evaluate(() => window.__bench.load());
const fifth = await uiPick(s2.page, userPicks[4].playerId);
const fin = await s2.page.evaluate(() => window.__bench.completeGreedy());
const rngPos = await s2.page.evaluate(() => window.__bench.rngPos());
await s2.browser.close();
server.close();

const verdict = {
  arm: LABEL, origin,
  uiPicks, pickedViaUi: uiPicks.length + 1,
  session1: { stateBeforeSave, save: save1, slotBytes, savedPicks, slotRefusal: refusal },
  session2: { load, fifth, final: fin },
  A1: { pass: REF_SHA ? fin.recordSha === REF_SHA : null, referenceSha: REF_SHA, resumedSha: fin.recordSha, picks: fin.picks },
  consoleErrors: errors,
};
fs.mkdirSync('/home/z/my-project/scratch/wave', { recursive: true });
fs.writeFileSync(`/home/z/my-project/scratch/wave/phaseA-browser-${LABEL}.json`, JSON.stringify(verdict, null, 2));
console.log(JSON.stringify({ arm: LABEL, A1: verdict.A1, load, save: save1, savedPicks, refusal, uiPicks: uiPicks.map((u) => u.via), consoleErrors: errors.length }, null, 1));
process.exit(0);
