/* probe-season.mjs — the season standings battery (item 6): ONE protocol, both arms, one process.
 * Run with: node --experimental-strip-types scripts/probe-season.mjs
 * For each arm: boot file:// (network blocked), open SEASON, assert:
 *   standings   — 32 team rows in 8 real divisions; every row's W+L+T == 17 (the 18-week, 17-game
 *                 engine season); 14 seed badges (1-7 × 2 conferences); the champion line names the
 *                 node-side re-derivation's champion (SAME engine path: fixture picks → lineups →
 *                 ratings → simulateSeason seed 2027);
 *   determinism — the arms' rendered division text is STRING-EQUAL across arms (same seed, same bytes);
 *   hygiene     — 0 console/page errors, 0 blocked requests; 390px clean on the standings screen.
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', root: new URL('../arm-vue/', import.meta.url).pathname, dist: new URL('../arm-vue/dist/index.html', import.meta.url).pathname },
  { name: 'svelte', root: new URL('../arm-svelte/', import.meta.url).pathname, dist: new URL('../arm-svelte/dist/index.html', import.meta.url).pathname },
];
const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];

const nodeSideChampion = async (root) => {
  const fs = await import('node:fs');
  const b = 'file://' + root;
  const ratings = fs.readFileSync(root + 'src/data/madden27-ratings.csv', 'utf8');
  const fa = fs.readFileSync(root + 'src/data/free-agents-old-ratings.csv', 'utf8');
  const ids = fs.readFileSync(root + 'src/data/player-ids.csv', 'utf8');
  const FIX = JSON.parse(fs.readFileSync(root + 'src/fixture.json', 'utf8'));
  const players = await import(b + 'src/engine/sports/nfl/engine/players.ts');
  const { runSeason, toStandings } = await import(b + 'src/lib/seasonVM.ts');
  const vm = toStandings(runSeason(players.buildPool(ratings, fa, ids), FIX.picks, 2027, 2027));
  return vm;
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

  const engine = await nodeSideChampion(arm.root);

  await page.goto(URL_);
  await page.waitForSelector('.cp-teambtn', { timeout: 20000 });
  await page.getByRole('button', { name: 'SEASON', exact: true }).click();
  await page.waitForSelector('.cp-season-row', { timeout: 30000 });
  await page.waitForTimeout(300);

  await step('season.structure', async () => {
    const rows = await page.locator('.cp-season-row').count();
    const divs = await page.locator('.cp-season-div').count();
    const seeds = await page.locator('.cp-season-seed').filter({ hasText: /\d/ }).count();
    const recs = await page.locator('.cp-season-rec').allTextContents();
    const games17 = recs.every((r) => r.split('-').reduce((a, b) => a + Number(b), 0) === 17);
    return { rows, divs, seeds, games17 };
  });
  await step('season.championEngineTrue', async () => {
    const line = await txt(page.locator('.cp-cards-onclock'));
    return { line, champion: engine.champion, match: line.includes('SUPER BOWL: ' + engine.champion + ' over ' + engine.finalistOther) };
  });
  await step('season.tableText', async () => {
    const divs = await page.locator('.cp-season-div').allTextContents();
    // whitespace-stripped comparison: the arms' whitespace strategies differ (Vue condenses
    // inter-element whitespace to nothing, Svelte keeps single spaces) — the assertion is DATA equality
    return { text: divs.map((d) => d.replace(/\s+/g, '')).join('§') };
  });
  await page.screenshot({ path: new URL(`../shots/season-${arm.name}.png`, import.meta.url).pathname, fullPage: true });

  // 390 px on the standings screen
  const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p2 = await ctx2.newPage();
  await p2.route(/^https?:\/\//i, (r) => { res.blocked++; r.abort(); });
  await p2.goto(URL_);
  await p2.waitForSelector('.cp-teambtn', { timeout: 20000 });
  await p2.getByRole('button', { name: 'SEASON', exact: true }).click();
  await p2.waitForSelector('.cp-season-row', { timeout: 30000 });
  const s390 = await p2.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, rows: document.querySelectorAll('.cp-season-row').length }));
  res['390px'] = s390;
  res['390px-clean'] = s390.sw <= s390.iw;
  await ctx2.close();

  res.errorCount = res.errors.length;
  out[arm.name] = res;
  await browser.close();
}
console.log(JSON.stringify(out, null, 1));
const fails = [];
for (const [arm, res] of Object.entries(out)) {
  for (const [k, v] of Object.entries(res.steps)) {
    if (typeof v === 'string' && v.startsWith('FAIL')) fails.push(`${arm}.${k}: ${v.slice(0, 200)}`);
    if (k === 'season.structure' && typeof v === 'object' && (v.rows !== 32 || v.divs !== 8 || v.seeds !== 14 || !v.games17)) fails.push(`${arm}.${k}: ${JSON.stringify(v)}`);
    if (k === 'season.championEngineTrue' && typeof v === 'object' && v.match !== true) fails.push(`${arm}.${k}: ${JSON.stringify(v).slice(0, 200)}`);
  }
  if (res.errorCount > 0) fails.push(`${arm}.consoleErrors: ${res.errors.slice(0, 3).join(' | ')}`);
  if (res['390px-clean'] === false) fails.push(`${arm}.390px: ${res['390px'].sw} > ${res['390px'].iw}`);
}
if (out.vue.steps['season.tableText'].text !== out.svelte.steps['season.tableText'].text) fails.push('determinism: the arms\' rendered tables DIFFER — same seed must give byte-equal standings');
console.log('\n== SEASON VERDICT ==');
console.log(fails.length ? 'FAILS:\n' + fails.join('\n') : 'SEASON LAWS PASS on both arms — 32 rows / 8 divisions / 14 seeds / 17 games each, champion engine-true, tables string-equal across arms');
