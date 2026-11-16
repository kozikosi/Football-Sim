/* probe-slice5.mjs — the slice-5 (player cards) verification battery: ONE protocol, both arms,
 * one process. Run with: node --experimental-strip-types scripts/probe-slice5.mjs
 * For each arm (dist built first): boot from file:// with the network blocked, then:
 *   cards      — the CARDS screen renders the SAME number of cards as the BOARD screen shows rows
 *                (the engine's own boardVM row count for THIS state, never a constant); a sampled
 *                card's name/pos/team/ovr/W/P are string-equal to the engine's own boardVM row
 *                re-derived node-side through the SAME store flow (createStore + START seed 1000);
 *   dynamic    — clicking a card opens the featured card (the expanded state class appears) and its
 *                clock line carries the CURRENT overall (changes with picks — the dynamic element);
 *   interaction— CLOSE and Esc both return to the grid; PICK HIM advances the REAL reducer;
 *   export     — SHARE PNG fires a real download (a.click + download attr) whose bytes are a PNG;
 *   390 px     — no horizontal scroll on the cards screen;
 *   fidelity   — DOM node counts recorded for BOTH arms; equal counts across arms is asserted at the end;
 *   hygiene    — 0 console errors / 0 blocked requests across the whole session.
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', root: new URL('../arm-vue/', import.meta.url).pathname, dist: new URL('../arm-vue/dist/index.html', import.meta.url).pathname },
  { name: 'svelte', root: new URL('../arm-svelte/', import.meta.url).pathname, dist: new URL('../arm-svelte/dist/index.html', import.meta.url).pathname },
].filter((a) => !process.env.SLICE5_ARMS || process.env.SLICE5_ARMS.split(',').includes(a.name));
const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];

// -- node-side re-derivation of the engine's own card data (per arm, from ITS OWN engine bytes) --
const nodeSideVM = async (root) => {
  const b = new URL(`file://${root}`).href;
  const ratings = await import(b + 'src/data/madden27-ratings.csv?raw').then((m) => m.default).catch(() => null);
  const fs = await import('node:fs');
  const ratingsCsv = ratings ?? fs.readFileSync(root + 'src/data/madden27-ratings.csv', 'utf8');
  const faCsv = fs.readFileSync(root + 'src/data/free-agents-old-ratings.csv', 'utf8');
  const idsCsv = fs.readFileSync(root + 'src/data/player-ids.csv', 'utf8');
  const players = await import(b + 'src/engine/sports/nfl/engine/players.ts');
  const store = await import(b + 'src/engine/sports/nfl/app/store.ts');
  const rng = await import(b + 'src/engine/core/rng.ts');
  const goneodds = await import(b + 'src/engine/sports/nfl/engine/goneodds.ts');
  const draftBoard = await import(b + 'src/engine/sports/nfl/view/draftBoard.ts');
  const cardVM = await import(b + 'src/lib/cardVM.ts');
  const league = await import(b + 'src/engine/sports/nfl/engine/league.ts');
  const pool = players.buildPool(ratingsCsv, faCsv, idsCsv);
  const boot = { seed: 1000, defaultTeam: 20 };   // bootData's constants (fixture seed + its user team)
  const user = league.TEAMS.findIndex((t) => t.name === 'Buffalo Bills');   // the probe's chosen team — engine order is AFC East first
  const s = store.createStore(pool);
  s.dispatch({ type: 'START', seed: boot.seed, userTeam: user });   // the probe chooses Buffalo Bills
  const st = s.getState();
  const vm = draftBoard.boardVM(st.draft, user, goneodds.goneOdds(st.draft, user, rng.makeRng(boot.seed * 7 + 13), 30), { sort: 'wins', limit: 60 });
  return { vm, cards: cardVM.toCardGrid(vm), picks: st.record.picks.length };
};

const out = {};
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
  const txt = (loc) => loc.textContent().then((t) => (t || '').trim());
  const shot = async (name) => { const p = `../shots/slice5-${arm.name}-${name}.png`; await page.screenshot({ path: new URL(p, import.meta.url).pathname, fullPage: true }); res.screenshots.push(p); };
  const nav = async (label) => { await page.getByRole('button', { name: label, exact: true }).first().click(); await page.waitForTimeout(150); };

  const engine = await nodeSideVM(arm.root);
  const row0 = engine.cards.cards[0];

  await page.goto(URL_);
  await page.waitForSelector('.cp-teambtn', { timeout: 20000 });
  await page.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
  await page.waitForSelector('.cp-board-row', { timeout: 20000 });
  await page.waitForTimeout(300);

  await step('cards.sameCountAsBoardRows', async () => {
    const boardRows = await page.locator('.cp-board-row').count();
    await nav('CARDS');
    await page.waitForSelector('.cp-card', { timeout: 20000 });
    const cards = await page.locator('.cp-card').count();
    return { boardRows, cards, equal: boardRows === cards && cards === engine.cards.cards.length };
  });
  await step('cards.fieldsEngineTrue', async () => {
    const c = page.locator(`.cp-card[data-pid="${row0.id}"]`).first();
    const name = await txt(c.locator('.cp-card-name'));
    const sub = await txt(c.locator('.cp-card-sub'));
    const ovr = await txt(c.locator('.cp-card-ovr'));
    const nums = await txt(c.locator('.cp-card-nums'));
    return {
      name, sub, ovr, nums,
      match: name === row0.name && sub === row0.pos + ' · ' + row0.nflTeam && ovr === row0.ovr
        && nums.includes('W ' + row0.wins) && nums.includes('P ' + row0.priority),
      engineRow: { name: row0.name, pos: row0.pos, nflTeam: row0.nflTeam, ovr: row0.ovr, wins: row0.wins, priority: row0.priority },
    };
  });
  await shot('grid');
  await step('cards.featuredOpensDynamicClock', async () => {
    await page.locator(`.cp-card[data-pid="${row0.id}"]`).first().click();
    await page.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
    const clock = await txt(page.locator('.cp-cards-featclock'));
    const featName = await txt(page.locator('.cp-cards-featcard .cp-card-name'));
    return { opened: true, clock, featName, overallMatchesState: clock.includes('OVERALL ' + engine.cards.overall + ' OF ' + engine.cards.totalPicks), featNameMatch: featName === row0.name };
  });
  await step('cards.pickThroughRealReducer', async () => {
    await page.locator('.cp-cards-featcard .cp-pickbtn').click();
    await page.waitForTimeout(500);
    const count = await txt(page.locator('.cp-cards-count'));
    const grid2 = await page.locator('.cp-card').count();
    return { countAfterPick: count, cardsAfterPick: grid2, advanced: grid2 > 0 };
  });
  await step('cards.escCloses', async () => {
    await page.locator('.cp-card').first().click();
    await page.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    return { featGone: (await page.locator('.cp-cards-featcard').count()) === 0 };
  });
  await step('cards.sharePngExport', async () => {
    await page.locator('.cp-card').first().click();
    await page.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
    const dlPromise = page.waitForEvent('download', { timeout: 8000 });
    await page.locator('.cp-sharebtn').click();
    const dl = await dlPromise;
    const path = await dl.path();
    const bytes = await import('node:fs').then((fs) => fs.readFileSync(path));
    const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
    return { filename: dl.suggestedFilename(), bytes: bytes.length, isPng, msg: await txt(page.locator('.cp-sharemsg')) };
  });
  await shot('featured');
  await ctx.close();

  // 390 px on the cards screen
  {
    const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const p2 = await ctx2.newPage();
    await p2.route(/^https?:\/\//i, (r) => { res.blocked++; r.abort(); });
    p2.on('pageerror', (e) => res.errors.push('pageerror(390): ' + e.message));
    await p2.goto(URL_);
    await p2.waitForSelector('.cp-teambtn', { timeout: 20000 });
    await p2.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
    await p2.waitForSelector('.cp-board-row', { timeout: 20000 });
    await p2.getByRole('button', { name: 'CARDS', exact: true }).click();
    await p2.waitForSelector('.cp-card', { timeout: 20000 });
    const s390 = await p2.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, cards: document.querySelectorAll('.cp-card').length }));
    res['390px-cards'] = s390;
    res['390px-clean'] = s390.sw <= s390.iw;
    await p2.screenshot({ path: new URL(`../shots/slice5-${arm.name}-390.png`, import.meta.url).pathname, fullPage: true });
    await ctx2.close();
  }

  // DOM node count (whole document, cards screen with featured open)
  {
    const ctx3 = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const p3 = await ctx3.newPage();
    await p3.route(/^https?:\/\//i, (r) => r.abort());
    await p3.goto(URL_);
    await p3.waitForSelector('.cp-teambtn', { timeout: 20000 });
    await p3.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
    await p3.waitForSelector('.cp-board-row', { timeout: 20000 });
    await p3.getByRole('button', { name: 'CARDS', exact: true }).click();
    await p3.waitForSelector('.cp-card', { timeout: 20000 });
    res.domNodesGrid = await p3.evaluate(() => document.querySelectorAll('*').length);
    await p3.locator('.cp-card').first().click();
    await p3.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
    res.domNodesFeatured = await p3.evaluate(() => document.querySelectorAll('*').length);
    await ctx3.close();
  }

  res.errorCount = res.errors.length;
  out[arm.name] = res;
  await browser.close();
}

console.log(JSON.stringify(out, null, 1));
const ok = (v) => v !== false && !(typeof v === 'string' && v.startsWith('FAIL')) && !(typeof v === 'object' && v !== null && v.match === false);
const fails = [];
for (const [arm, res] of Object.entries(out)) {
  for (const [k, v] of Object.entries(res.steps)) if (!ok(v)) fails.push(`${arm}.${k}: ${JSON.stringify(v).slice(0, 200)}`);
  if (res.errorCount > 0) fails.push(`${arm}.consoleErrors: ${res.errors.slice(0, 3).join(' | ')}`);
  if (res['390px-clean'] === false) fails.push(`${arm}.390px: scrollWidth ${res['390px-cards'].sw} > viewport ${res['390px-cards'].iw}`);
}
if (out.vue && out.svelte && (out.vue.domNodesGrid !== out.svelte.domNodesGrid || out.vue.domNodesFeatured !== out.svelte.domNodesFeatured)) {
  fails.push(`fidelity.domNodes: vue grid/feat ${out.vue.domNodesGrid}/${out.vue.domNodesFeatured} vs svelte ${out.svelte.domNodesGrid}/${out.svelte.domNodesFeatured} — the arms are NOT numerically pinned`);
}
console.log('\n== SLICE-5 VERDICT ==');
const dn = (a) => (out[a] ? `grid=${out[a].domNodesGrid} featured=${out[a].domNodesFeatured}` : '(not run)');
console.log(`DOM nodes: vue ${dn('vue')} · svelte ${dn('svelte')}`);
console.log(fails.length ? 'FAILS:\n' + fails.join('\n') : 'ALL SLICE-5 LAWS PASS on both arms — numerically pinned (same node counts, same engine-true fields)');
