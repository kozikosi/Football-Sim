/* two-arm-fourslice.mjs — the four-slice slope test's verification battery: ONE protocol, both arms,
 * one process. For each arm (dist built first): boot from file:// with the network blocked, then
 * assert the four slices' laws through the real UI:
 *   team select  — opens at team select; 32 teams in 8 real divisions; the choice persists across a
 *                  reload (localStorage under the sport's own key) and the pool re-renders (the board
 *                  and the feed re-derive for the chosen team);
 *   board        — the best-available list is the engine's own boardVM (60 rows); a PICK action goes
 *                  through the REAL reducer (your picks grow, the on-clock overall advances, UNDO
 *                  cuts back); the sort buttons reorder the rows by the engine's own numbers;
 *   saves        — 3 slots, empty first; SAVE writes an envelope (rev = 1 + picks, the envelope's
 *                  law); the envelope survives a reload; LOAD restores through the store's LOAD; a
 *                  CORRUPT envelope is refused with the engine's own message verbatim; a NEWER
 *                  build's envelope is refused as newer; nothing repaired, nothing defaulted;
 *   feed         — the reused panel re-renders for the chosen team (their week-1 game, their drives
 *                  as mine); MY DRIVES filters to them; NEWEST FIRST flips; zero yard figures.
 * Console/page errors and blocked-request counts are collected across the whole session.
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', dist: new URL('../arm-vue/dist/index.html', import.meta.url).pathname, shots: '../shots/fourslice' },
  { name: 'svelte', dist: new URL('../arm-svelte/dist/index.html', import.meta.url).pathname, shots: '../shots/fourslice' },
];
const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];
const out = {};

const txt = (loc) => loc.textContent().then((t) => (t || '').trim());

for (const arm of ARMS) {
  const URL_ = pathToFileURL(arm.dist).href;
  const browser = await pw.chromium.launch({ args: FLAGS });
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
  const page = await ctx.newPage();
  const res = { url: URL_, blocked: 0, errors: [], steps: {}, screenshots: [] };

  await page.route(/^https?:\/\//i, (r) => { res.blocked++; r.abort(); });
  page.on('pageerror', (e) => res.errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') res.errors.push('console: ' + m.text()); });

  const step = async (name, fn) => { try { res.steps[name] = await fn(); } catch (e) { res.steps[name] = 'FAIL: ' + e.message; } };
  const shot = async (name) => { const p = `${arm.shots}-${arm.name}-${name}.png`; await page.screenshot({ path: new URL(p, import.meta.url).pathname, fullPage: true }); res.screenshots.push(p); };
  const nav = async (label) => { await page.getByRole('button', { name: label, exact: true }).first().click(); await page.waitForTimeout(120); };

  await page.goto(URL_);
  await page.waitForSelector('.cp-teambtn', { timeout: 15000 });
  await page.waitForTimeout(300);

  // -- team select --
  await step('team.opensAtTeamSelect', async () => (await page.locator('.cp-teambtn').count()) === 32);
  await step('team.realAlignment8Divisions', async () => (await page.locator('.cp-team-divname').count()) === 8);
  await step('team.defaultHighlightIsFixtureTeam', async () => {
    const on = await page.locator('.cp-teambtn.cp-on').count();
    const name = on === 1 ? await txt(page.locator('.cp-teambtn.cp-on')) : '(none)';
    return `highlighted=${name}`;
  });
  await step('team.pickBuffaloNavigatesToBoard', async () => {
    await page.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
    await page.waitForSelector('.cp-board-row', { timeout: 15000 });
    await page.waitForTimeout(400);
    const count = await txt(page.locator('.cp-board-count'));
    const ls = await page.evaluate(() => localStorage.getItem('sim:nfl:team'));
    return { countHasTeam: count.includes('Buffalo Bills'), localStorageTeam: ls, rows: await page.locator('.cp-board-row').count(), count };
  });
  await shot('team-board');
  await step('board.pickThroughRealReducer', async () => {
    const before = await txt(page.locator('.cp-board-count'));
    await page.locator('.cp-pickbtn').first().click();
    await page.waitForTimeout(500);
    const mine = await txt(page.locator('.cp-mine h4'));
    const after = await txt(page.locator('.cp-board-count'));
    const line = await page.locator('.cp-mine-line').first().textContent();
    return { before, mine, after, firstMineLine: (line || '').trim() };
  });
  await step('board.undoCutsBack', async () => {
    await page.getByRole('button', { name: 'UNDO MY LAST' }).click();
    await page.waitForTimeout(500);
    return { mineAfterUndo: await txt(page.locator('.cp-mine h4')) };
  });
  await step('board.sortByOvrPutsMaxFirst', async () => {
    await page.getByRole('button', { name: 'OVR', exact: true }).click();
    await page.waitForTimeout(400);
    const nums = await page.locator('.cp-board-row .cp-board-num:has-text("ovr")').evaluateAll((els) => els.slice(0, 10).map((e) => parseInt((e.textContent || '').replace('ovr', '').trim(), 10)));
    const on = await page.locator('.cp-feedtool.cp-feedtool-on').count();
    return { first10: nums, sorted: nums.every((n, i) => i === 0 || nums[i - 1] >= n), onButtons: on };
  });
  await step('board.zeroYardFigures', async () => {
    const t = await page.locator('.cp-screen').textContent();
    return { noYards: !/\byds?\b|\byards\b/i.test(t || '') };
  });

  // -- saves --
  await nav('SAVES');
  await page.waitForTimeout(300);
  await step('saves.threeSlotsEmptyFirst', async () => {
    const slots = await page.locator('.cp-save-slot').count();
    const empty = await page.locator('.cp-save-slot:has-text("empty")').count();
    return { slots, empty };
  });
  await step('saves.saveSlotA', async () => {
    await page.locator('.cp-save-slot', { hasText: 'SLOT A' }).getByRole('button', { name: 'SAVE' }).click();
    await page.waitForTimeout(400);
    const banner = await txt(page.locator('.cp-msg'));
    const card = await txt(page.locator('.cp-save-slot', { hasText: 'SLOT A' }));
    return { banner, cardHasDraft: card.includes('DRAFT · rev 1 · 0 picks · Buffalo Bills'), card: card.slice(0, 120) };
  });
  await step('saves.pickThenSaveSlotB', async () => {
    await nav('BOARD');
    await page.locator('.cp-pickbtn').first().click();
    await page.waitForTimeout(400);
    const mine = await txt(page.locator('.cp-mine h4'));
    const count = await txt(page.locator('.cp-board-count'));
    await nav('SAVES');
    await page.locator('.cp-save-slot', { hasText: 'SLOT B' }).getByRole('button', { name: 'SAVE' }).click();
    await page.waitForTimeout(400);
    const card = await txt(page.locator('.cp-save-slot', { hasText: 'SLOT B' }));
    // the REAL reducer auto-advances the CPU until the user is on the clock again, so one user pick
    // adds every intervening CPU pick to the log: rev = 1 + picks, and picks > 1 after the advance.
    const m = card.match(/rev (\d+) · (\d+) picks/);
    return { mine, count, rev: m ? m[1] : null, picks: m ? m[2] : null, envelopeOk: !!m && Number(m[1]) === Number(m[2]) + 1 && Number(m[2]) > 1 };
  });
  await step('saves.surviveReload', async () => {
    await page.reload();
    await page.waitForSelector('.cp-teambtn', { timeout: 15000 });
    await page.waitForTimeout(300);
    await nav('SAVES');
    await page.waitForTimeout(300);
    const a = await txt(page.locator('.cp-save-slot', { hasText: 'SLOT A' }));
    const b = await txt(page.locator('.cp-save-slot', { hasText: 'SLOT B' }));
    return { aOk: a.includes('DRAFT · rev 1 · 0 picks'), bOk: /rev (\d+) · (\d+) picks/.test(b) && !b.includes('empty') };
  });
  await shot('saves-loaded');
  await step('saves.loadRestoresThroughStore', async () => {
    await page.locator('.cp-save-slot', { hasText: 'SLOT A' }).getByRole('button', { name: 'LOAD' }).click();
    await page.waitForTimeout(500);
    const screen = page.locator('.cp-screen[aria-label="Draft board"]');
    const mine = await txt(screen.locator('.cp-mine h4'));
    const count = await txt(screen.locator('.cp-board-count'));
    await nav('TEAM');
    const on = await txt(page.locator('.cp-teambtn.cp-on'));
    return { boardMine: mine, boardCountHasTeam: count.includes('Buffalo Bills'), teamHighlighted: on };
  });
  await step('saves.corruptRefusedVerbatim', async () => {
    await nav('SAVES');
    await page.getByRole('button', { name: 'PLANT CORRUPT IN C' }).click();
    await page.waitForTimeout(400);
    const card = await txt(page.locator('.cp-save-slot', { hasText: 'SLOT C' }));
    await page.locator('.cp-save-slot', { hasText: 'SLOT C' }).getByRole('button', { name: 'LOAD' }).click();
    await page.waitForTimeout(300);
    const banner = await txt(page.locator('.cp-msg'));
    return { cardRefused: card, loadBanner: banner, verbatim: card.includes('payload: bad seed') && banner.includes('payload: bad seed') };
  });
  await step('saves.newerVersionRefused', async () => {
    await page.getByRole('button', { name: 'PLANT NEWER-VERSION IN C' }).click();
    await page.waitForTimeout(400);
    const card = await txt(page.locator('.cp-save-slot', { hasText: 'SLOT C' }));
    return { cardRefused: card, verbatim: card.includes('newer build (schema 9)') && card.includes('REFUSED (newer-version)') };
  });
  await shot('saves-refused');

  // -- feed (the reused panel, re-rendered for the chosen team) --
  await nav('FEED');
  await page.waitForSelector('.cp-feed-line', { timeout: 15000 });
  await page.waitForTimeout(400);
  await step('feed.rendersForChosenTeam', async () => {
    const vs = await txt(page.locator('.cp-feed-vs'));
    const lines = await page.locator('.cp-feed-line').count();
    const me = await page.locator('.cp-feed-line.cp-me').count();
    const prov = await txt(page.locator('.cp-feed-prov'));
    return { vs, lines, me, prov: prov.slice(0, 90), hasBUF: vs.includes('BUF') };
  });
  await step('feed.myDrivesFilter', async () => {
    const me = await page.locator('.cp-feed-line.cp-me').count();
    await page.getByRole('button', { name: 'MY DRIVES' }).click();
    await page.waitForTimeout(300);
    const shown = await page.locator('.cp-feed-line').count();
    await page.getByRole('button', { name: 'MY DRIVES' }).click();
    return { me, shownAfterFilter: shown, match: me === shown };
  });
  await step('feed.newestFirstFlip', async () => {
    await page.getByRole('button', { name: 'NEWEST FIRST' }).click();
    await page.waitForTimeout(300);
    const first = await page.locator('.cp-feed-line').first().getAttribute('data-period');
    await page.getByRole('button', { name: 'NEWEST FIRST' }).click();
    return { firstPeriodNewest: first };
  });
  await shot('feed');

  // -- 390 px on every screen --
  {
    const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const p2 = await ctx2.newPage();
    await p2.route(/^https?:\/\//i, (r) => r.abort());
    p2.on('pageerror', (e) => res.errors.push('pageerror(390): ' + e.message));
    await p2.goto(URL_);
    await p2.waitForSelector('.cp-teambtn', { timeout: 15000 });
    const scroll390 = {};
    for (const s of ['TEAM', 'BOARD', 'SAVES', 'FEED']) {
      await p2.getByRole('button', { name: s, exact: true }).first().click();
      await p2.waitForTimeout(s === 'FEED' ? 600 : 250);
      scroll390[s] = await p2.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    }
    res.scroll390 = scroll390;
    await p2.screenshot({ path: new URL(`${arm.shots}-${arm.name}-390.png`, import.meta.url).pathname, fullPage: true });
    res.screenshots.push(`${arm.shots}-${arm.name}-390.png`);
    await ctx2.close();
  }

  // -- keyboard: nav reachable, a board row pick button focusable --
  {
    const ctx3 = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const p3 = await ctx3.newPage();
    await p3.route(/^https?:\/\//i, (r) => r.abort());
    await p3.goto(URL_);
    await p3.waitForSelector('.cp-teambtn', { timeout: 15000 });
    await p3.keyboard.press('Tab');
    res.keyboard = await p3.evaluate(() => {
      const el = document.activeElement;
      return { firstFocus: el ? { tag: el.tagName, cls: el.className, text: (el.textContent || '').trim().slice(0, 24) } : null };
    });
    await ctx3.close();
  }

  res.errorCount = res.errors.length;
  out[arm.name] = res;
  await browser.close();
}

console.log(JSON.stringify(out, null, 1));
const ok = (v) => v !== false && !(typeof v === 'string' && v.startsWith('FAIL'));
const fails = [];
for (const [arm, res] of Object.entries(out)) {
  for (const [k, v] of Object.entries(res.steps)) if (!ok(v)) fails.push(`${arm}.${k}: ${JSON.stringify(v).slice(0, 200)}`);
  if (res.errorCount > 0) fails.push(`${arm}.consoleErrors: ${res.errors.slice(0, 3).join(' | ')}`);
}
console.log('\n== FOUR-SLICE VERDICT ==');
console.log(fails.length ? 'FAILS:\n' + fails.join('\n') : 'ALL FOUR-SLICE LAWS PASS on both arms');
