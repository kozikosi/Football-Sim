/* probe-battery.mjs — the E1 browser battery (gates 1-4): loads the BUILT dist over file:// with the
 * network blocked, drives every screen via the data-testid contract, compares the DOM against
 * probes/truth.json (string-equal to the engine-derived truth), counts console errors / blocked
 * requests, checks 390 px per screen, and records per-screen DOM node counts for the cross-arm
 * fidelity pin. SAME BYTES in both repos (arm name via argv).
 * Run: node probes/probe-battery.mjs <arm-name>   (after `npm run build` + strip-crossorigin)
 * Env: SLICES=cards,stats,board,feed,week,settings (default: all) — per-slice gating as slices land.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req('@playwright/test'); }

const arm = process.argv[2] ?? 'arm';
const SLICES = (process.env.SLICES ?? 'cards,stats,board,feed,week,settings').split(',').map((s) => s.trim());
const want = (s) => SLICES.includes(s);
const lib = new URL('../', import.meta.url).pathname;
const truth = JSON.parse(readFileSync(lib + 'probes/truth.json', 'utf8'));

const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];
const res = { arm, slices: SLICES, url: null, blocked: 0, consoleErrors: [], pageErrors: [], screens: {}, checks: [], pass: false };
const ok = (name, cond, detail = '') => { res.checks.push({ name, ok: !!cond, detail: String(detail).slice(0, 300) }); return !!cond; };
class Skip extends Error {}

const browser = await pw.chromium.launch({ args: FLAGS });
const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
const page = await ctx.newPage();
res.url = pathToFileURL(lib + 'dist/index.html').href;
await page.route(/^https?:\/\//i, (r) => { res.blocked++; r.abort(); });
page.on('console', (m) => { if (m.type() === 'error') res.consoleErrors.push(m.text().slice(0, 300)); });
page.on('pageerror', (e) => res.pageErrors.push(String(e).slice(0, 300)));
await page.goto(res.url);
await page.waitForSelector('[data-testid="app-shell"]', { timeout: 8000 });
ok('shell-mounts', true);

async function goNav(testid) { await page.click(`[data-testid="${testid}"]`); await page.waitForTimeout(120); }
async function snap(name) {
  res.screens[name] = await page.evaluate(() => ({
    nodeCount: document.querySelectorAll('*').length,
    scrollWidth: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
}
async function section(name, fn) {
  if (!want(name)) { ok('section-' + name, true, 'SKIPPED by SLICES filter'); return; }
  try { await fn(); } catch (e) {
    if (e instanceof Skip) ok('section-' + name, true, 'absent (slice not built yet)');
    else { ok('section-' + name + '-threw', false, String(e).slice(0, 200)); }
  }
}

// -- slice (a): player cards --
await section('cards', async () => {
  await goNav('nav-cards');
  const appeared = await page.waitForSelector('[data-testid="row-' + truth.cards.card0.id + '"]', { timeout: 8000 }).then(() => true).catch(() => false);
  if (!appeared) throw new Skip('cards absent');
  const cardCount = await page.locator('[data-testid^="row-"]').count();
  ok('cards-count', cardCount === truth.cards.count, cardCount + ' vs ' + truth.cards.count);
  const c0 = page.locator('[data-testid="row-' + truth.cards.card0.id + '"]');
  const [c0name, c0ovr, c0wins, c0pri, c0pos] = await Promise.all([
    c0.locator('.tc-name').textContent(), c0.locator('.tc-ovr').textContent(),
    c0.locator('.tc-wins').textContent(), c0.locator('.tc-pri').textContent(), c0.locator('.tc-pos').textContent(),
  ]);
  ok('cards-card0-fields', c0name === truth.cards.card0.name && c0pos === truth.cards.card0.pos && c0ovr === truth.cards.card0.ovr && c0wins === truth.cards.card0.wins && c0pri === truth.cards.card0.priority,
    JSON.stringify({ c0name, c0ovr, c0wins, c0pri }));
  const countText = await page.locator('[data-testid="cards-count"]').textContent();
  ok('cards-count-text', countText === truth.cards.countText, String(countText));
  await snap('cards');
});

// -- slice (b): stats table --
await section('stats', async () => {
  await goNav('nav-stats');
  const appeared = await page.waitForSelector('[data-testid="stats-table"]', { timeout: 8000 }).then(() => true).catch(() => false);
  if (!appeared) throw new Skip('stats absent');
  const statRows = await page.locator('[data-testid^="stats-row-"]').count();
  ok('stats-rowcount', statRows === truth.stats.rows.length, statRows + ' vs ' + truth.stats.rows.length);
  const s0 = (await page.locator('[data-testid="stats-row-0"]').locator('td,th').allTextContents()).map((x) => x.trim());
  const r0 = truth.stats.rows[0];
  ok('stats-row0-cells', JSON.stringify(s0) === JSON.stringify([r0.name, r0.pos, r0.nflTeam, r0.ovr, r0.wins, r0.priority]), JSON.stringify({ s0 }));
  await page.click('[data-testid="stats-sort-ovr"]');
  await page.waitForTimeout(150);
  const sOvr = (await page.locator('[data-testid="stats-row-0"]').locator('td,th').allTextContents()).map((x) => x.trim());
  const bestOvr = truth.stats.rows.reduce((a, r) => (parseInt(r.ovr) > parseInt(a.ovr) ? r : a), truth.stats.rows[0]);
  ok('stats-sort-ovr', sOvr[0] === bestOvr.name, JSON.stringify({ first: sOvr[0], want: bestOvr.name }));
  await snap('stats');
});

// -- slice (c): draft-board row --
await section('board', async () => {
  await goNav('nav-board');
  const appeared = await page.waitForSelector('[data-testid="row-' + truth.board.row0.id + '"]', { timeout: 8000 }).then(() => true).catch(() => false);
  if (!appeared) throw new Skip('board absent');
  const b0 = page.locator('[data-testid="row-' + truth.board.row0.id + '"]');
  const [b0name, b0wins, b0pri] = await Promise.all([
    b0.locator('.tb-name').textContent(), b0.locator('.tb-wins').textContent(), b0.locator('.tb-pri').textContent(),
  ]);
  const b0badges = await b0.locator('.tb-badge').allTextContents();
  ok('board-row0', b0name === truth.board.row0.name && b0wins === truth.board.row0.wins && b0pri === truth.board.row0.priority,
    JSON.stringify({ b0name, b0wins, b0pri, b0badges, want: truth.board.row0.alsoFits }));
  const boardRows = await page.locator('[data-testid^="row-"]').count();
  ok('board-rowcount', boardRows === truth.board.rowCount, String(boardRows));
  await snap('board');
});

// -- slice (d): live feed --
await section('feed', async () => {
  await goNav('nav-feed');
  const appeared = await page.waitForSelector('[data-testid="feed"]', { timeout: 8000 }).then(() => true).catch(() => false);
  if (!appeared) throw new Skip('feed absent');
  const before = await page.locator('[data-testid^="feed-line-"]').count();
  await page.click('[data-testid="feed-live"]');
  await page.waitForTimeout(3200);
  const mid = await page.locator('[data-testid^="feed-line-"]').count();
  ok('feed-live-grows', mid > before, before + ' -> ' + mid);
  const ff = page.locator('[data-testid="feed-ff"]');
  if (await ff.count()) { await ff.click(); await page.waitForTimeout(200); }
  const after = await page.locator('[data-testid^="feed-line-"]').count();
  ok('feed-total', after === truth.feed.driveCount, after + ' vs ' + truth.feed.driveCount);
  const feedScore = (await page.locator('[data-testid="feed-score"]').textContent()).replace(/\s/g, '');
  ok('feed-final-score', feedScore === truth.feed.homeScore + '-' + truth.feed.awayScore, String(feedScore));
  const line0 = (await page.locator('[data-testid="feed-line-0"]').textContent()).replace(/\s/g, '');
  // the contract tokens ([ME] flag, team abbr, badge labels) must appear IN ORDER inside the line;
  // the engine's own summary sentence sits between them by design (feedVM DriveEvent.summary)
  const tokens = truth.feed.lineTexts[0].split('·').map((x) => x.trim()).filter(Boolean);
  let li = 0, ordered = true;
  for (const tokRaw of tokens) {
    for (const tok of tokRaw.split('+')) {
      const k = tok.replace(/\s/g, '');
      const idx = line0.indexOf(k, li);
      if (idx < 0) ordered = false;
      else li = idx + k.length;
    }
  }
  ok('feed-line0', ordered, line0.slice(0, 80) + ' vs ' + truth.feed.lineTexts[0]);
  await snap('feed');
});

// -- week stepper (Part B surface; fidelity pin) --
await section('week', async () => {
  await goNav('nav-week');
  const appeared = await page.waitForSelector('[data-testid="week-label"]', { timeout: 8000 }).then(() => true).catch(() => false);
  if (!appeared) throw new Skip('week absent');
  ok('week-label-w1', (await page.locator('[data-testid="week-label"]').textContent()) === 'WEEK 1');
  await page.click('[data-testid="week-next"]');
  await page.waitForTimeout(100);
  ok('week-next', (await page.locator('[data-testid="week-label"]').textContent()) === 'WEEK 2');
  await page.selectOption('[data-testid="week-jump"]', String(truth.week.slots));
  await page.waitForTimeout(200);
  const wlSB = await page.locator('[data-testid="week-label"]').textContent();
  ok('week-jump-sb', wlSB === truth.week.wLast.label, String(wlSB));
  const sbGame = await page.locator('[data-testid="week-game-0"]').textContent();
  ok('week-sb-game', sbGame.includes(truth.week.wLast.game0.homeAbbr) && sbGame.includes(truth.week.wLast.game0.awayAbbr) && sbGame.includes(String(truth.week.wLast.game0.hs)) && sbGame.includes(String(truth.week.wLast.game0.as)), sbGame.slice(0, 60));
  await snap('week');
});

// -- settings (C6 surface; persistence pin) --
await section('settings', async () => {
  await goNav('nav-settings');
  const appeared = await page.waitForSelector('[data-testid="set-state"]', { timeout: 8000 }).then(() => true).catch(() => false);
  if (!appeared) throw new Skip('settings absent');
  await page.click('[data-testid="set-toggle-compact"]');
  await page.waitForTimeout(100);
  const st1 = await page.locator('[data-testid="set-state"]').textContent();
  await page.reload();
  await page.waitForSelector('[data-testid="app-shell"]');
  await goNav('nav-settings');
  const st2 = await page.locator('[data-testid="set-state"]').textContent();
  ok('settings-persist', st1 === st2 && st2.includes('"compact":true'), st1 + ' -> reload -> ' + st2);
  await snap('settings');
});

// -- 390 px per built screen --
for (const nav of ['nav-cards', 'nav-stats', 'nav-board', 'nav-feed', 'nav-week', 'nav-settings']) {
  const name = nav.replace('nav-', '');
  if (!want(name)) continue;
  await page.setViewportSize({ width: 390, height: 844 });
  await goNav(nav);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  ok('390-' + name, sw <= 390, 'scrollWidth ' + sw);
}
await page.setViewportSize({ width: 1180, height: 950 });

res.pass = res.checks.every((c) => c.ok) && res.consoleErrors.length === 0 && res.pageErrors.length === 0;
writeFileSync(lib + 'probes/battery-' + arm + '.json', JSON.stringify(res, null, 1));
console.log('BATTERY ' + arm + ': ' + (res.pass ? 'PASS' : 'FAIL') + ' · checks ' + res.checks.filter((c) => c.ok).length + '/' + res.checks.length + ' · console errors ' + res.consoleErrors.length + ' · blocked ' + res.blocked);
for (const c of res.checks.filter((c) => !c.ok)) console.log('  FAIL', c.name, c.detail);
await browser.close();
process.exit(res.pass ? 0 : 1);
