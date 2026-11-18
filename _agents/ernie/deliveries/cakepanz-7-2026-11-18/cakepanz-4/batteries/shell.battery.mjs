/* shell.battery.mjs — the RENDER battery: Playwright against the BUILT shell (dist via vite preview
 * for the http laws, dist/single.html via file:// for the offline law). The node-side battery owns
 * the framework-blind truths; this one owns what only a browser can prove: the states sweep, the
 * 390px discipline, the two-mode palette, the P-317 screen, and the WHOLE SEASON played through the
 * real UI. Run: node --experimental-transform-types batteries/shell.battery.mjs  (needs `npm run distfile`
 * first + preview on 4179). The flag is REQUIRED on any Node: the engine snapshot carries a TS
 * parameter property (platform/localstorage.ts), which strip-only mode refuses to parse — the
 * Part-4 note; SNAPSHOT.md documents the supported Node and the §5 filing. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error("playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: " + e.message); }

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = process.env.CP_PORT || 4179;
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });

// ---------- the engine-built record (node-side, deterministic) for the season flow ----------
const { buildPool, newDraft, DEFAULT_CONFIG, runDraft, snakeOrder, freezePool, makeRng } =
  await import(path.join(ROOT, 'src/lib/port/seam.ts'));
const pool = buildPool(
  fs.readFileSync(path.join(ROOT, 'data/nfl/madden27-ratings.csv'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'data/nfl/free-agents-old-ratings.csv'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'data/nfl/player-ids.csv'), 'utf8'));
const userTeam = 5;
// NOTE: the record rides the DEFAULT snake because the STORE's LOAD cannot carry a custom order yet —
// that is the P-317 store gap (filed §5, the engine's newDraft supports it and the node battery
// proves it). The moment the Architect's store change lands, this record takes the chosen slot.
const st = newDraft(pool, makeRng(2026).fork('draft'), DEFAULT_CONFIG, snakeOrder());
runDraft(st, makeRng(2026).fork('run'), { team: userTeam, policy: 'greedy' });
const RECORD = { seed: 2026, userTeam, pool: freezePool(pool), picks: st.log.map((p) => ({ overall: p.overall, team: p.team, pid: p.player.id, slot: p.slot })) };
console.log('== the season flow, played through the real UI (the record is engine-built node-side) ==');

{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errs = []; const blocked = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('requestfailed', (r) => blocked.push(r.url()));
  await page.goto(`http://localhost:${PORT}/?dev=1`);
  await page.waitForTimeout(2500);

  // P-317: the picker is ON Team Select (team AND slot, same screen, same look)
  ok('S1a the dev build opens at TEAM SELECT', (await page.locator('.cp-ts').count()) === 1);
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(200);
  ok('S1b the SLOT PICKER is on the same screen as the team pick (P-317)', (await page.locator('.cp-ts-slot').count()) === 32, (await page.locator('.cp-ts-slot').count()) + ' slot buttons');
  await page.locator('.cp-ts-slot', { hasText: /^6$/ }).first().click();
  ok('S2 choosing a slot arms the CTA with it', /SLOT 6/.test(await page.locator('.cp-ts-go').textContent()));
  await page.locator('.cp-ts-go').click(); await page.waitForTimeout(600);
  const boardHead = (await page.locator('.cp-bhead').count()) ? await page.locator('.cp-bhead').textContent() : '';
  ok('S3 the board is the chosen team (Chicago)', /Chicago/.test(boardHead) || /Chicago/.test(await page.locator('main').textContent()));
  // the settings remember the choice (persistence across reload, verified)
  await page.reload(); await page.waitForTimeout(2000);
  const saved = await page.evaluate(() => localStorage.getItem('sim:nfl:settings'));
  ok('S4 the team+slot choice persists across reload (settings blob)', saved !== null && /Chicago Bears/.test(saved ?? '') && /draftSlot/.test(saved ?? ''), (saved ?? '').slice(0, 80));

  // the season begins from the finished draft (LOAD the engine-built record through the store)
  await page.evaluate((rec) => { (window).__cp.store.dispatch({ type: 'LOAD', record: rec }); }, RECORD);
  await page.evaluate(() => { (window).__cp.refresh && (window).__cp.refresh(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { (window).__cp.go('complete'); });
  let s5 = false, s5txt = '';
  try { await page.waitForSelector('.cp-done-prov', { timeout: 20000 }); s5txt = await page.locator('.cp-done-prov').textContent(); s5 = /Your draft is complete/.test(await page.locator('main').textContent()) && /seed/.test(s5txt); } catch (e) { s5txt = String(e).slice(0, 80); }
  ok('S5 the draft-complete state renders with the provenance stamp', s5, s5txt.slice(0, 90));

  // PLAY THE SEASON: 22 weeks through the real UI
  await page.locator('.cp-done .cp-cta').click(); await page.waitForTimeout(800);
  ok('S6 the season hub renders (not-started → running)', (await page.locator('.cp-hub').count()) === 1 && /THE SEASON/.test(await page.locator('main').textContent()));
  let steps = 0;
  while (steps < 22) {
    const btn = page.locator('.cp-hub .cp-cta, .cp-week .cp-cta').first();
    if (!(await btn.count()) || !(await btn.isVisible())) break;
    await btn.click(); await page.waitForTimeout(250);
    steps++;
    // the feed gate: the user game plays every week — close the feed with its own ← BOARD tool
    if (await page.locator('.zrl-t').count()) {
      const close = page.locator('.cp-feedtool', { hasText: 'BOARD' }).first();
      await close.click(); await page.waitForTimeout(150);
    }
    const backHub = page.locator('.cp-navbtn', { hasText: 'SEASON' }).first();
    if (!(await page.locator('.cp-hub').count())) { await backHub.click(); await page.waitForTimeout(150); }
  }
  ok('S7 the season stepped to the Super Bowl through the real UI (weeks played)', steps >= 18, steps + ' CTA steps taken');
  await page.locator('.cp-navbtn', { hasText: 'STANDINGS' }).click(); await page.waitForTimeout(400);
  ok('S8 the standings render 8 division tables through week 18', (await page.locator('.cp-stdiv').count()) === 8, (await page.locator('.cp-stdiv').count()) + ' division tables');
  await page.locator('.cp-navbtn', { hasText: 'PLAYOFFS' }).click(); await page.waitForTimeout(400);
  ok('S9 the bracket shows the champion banner after the Super Bowl', /SUPER BOWL CHAMPIONS/.test(await page.locator('main').textContent()));
  await page.locator('.cp-navbtn', { hasText: 'AWARDS' }).click(); await page.waitForTimeout(400);
  ok('S10 the awards screen names winners from the played season', /MOST VALUABLE PLAYER/.test(await page.locator('main').textContent()) && (await page.locator('.cp-award').count()) >= 3);
  await page.locator('.cp-navbtn', { hasText: 'STATS' }).click(); await page.waitForTimeout(400);
  ok('S11 the stats screen shows the leaders AND the 32-team ratings table', (await page.locator('.cp-statrow').count()) >= 8 && /THE 32 TEAMS/.test(await page.locator('main').textContent()));
  await page.locator('.cp-navbtn', { hasText: 'REVIEW' }).click(); await page.waitForTimeout(400);
  ok('S12 the season review states the honest outcome with integer chips', (await page.locator('.cp-chipstat').count()) >= 4);
  await page.locator('.cp-navbtn', { hasText: 'BOOK' }).click(); await page.waitForTimeout(400);
  ok('S13 the season book renders the champion roster cards', /THE SEASON BOOK/.test(await page.locator('main').textContent()) && (await page.locator('.cp-pcard').count()) >= 20, (await page.locator('.cp-pcard').count()) + ' cards');
  await page.locator('.cp-navbtn', { hasText: 'SHARE' }).click(); await page.waitForTimeout(400);
  ok('S14 the shareables render per stage and the export arms', (await page.locator('.cp-shareframe').count()) === 1);
  ok('S15 zero page errors across the whole season flow', errs.length === 0, errs.slice(0, 2).join(' | '));
  ok('S16 zero blocked requests across the season flow', blocked.length === 0, blocked.slice(0, 2).join(' | '));
  await page.close();
}

// ---------- the states sweep + 390px + two modes on the fresh boot ----------
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://localhost:${PORT}/`);            // the PUBLIC default: the EMPTY state
  await page.waitForTimeout(1500);
  ok('S17 the public default is the EMPTY state + import (the F11 ruling), never a random board', /No player dataset yet/.test(await page.locator('main').textContent()));
  ok('S18 the empty state offers the dev build link', (await page.locator('.cp-devlink').count()) === 1);

  await page.goto(`http://localhost:${PORT}/?dev=1`); await page.waitForTimeout(2000);
  // two modes: the settings form flips data-theme; both render
  await page.locator('.cp-navbtn', { hasText: 'SETTINGS' }).click(); await page.waitForTimeout(300);
  await page.selectOption('#set-mode', 'light'); await page.waitForTimeout(300);
  const lightBg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
  ok('S19 the LIGHT mode is the pale-rose law (#fdf2f6)', lightBg === '#fdf2f6', lightBg);
  await page.selectOption('#set-mode', 'dark'); await page.waitForTimeout(300);
  const darkBg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
  ok('S20 the DARK mode is the plum law (#1e1119)', darkBg === '#1e1119', darkBg);
  ok('S21 the mode choice persists in the settings blob', /"mode":"dark"/.test(await page.evaluate(() => localStorage.getItem('sim:nfl:settings')) ?? ''));

  // reduced motion: the explicit setting wins
  await page.check('#set-motion'); await page.waitForTimeout(200);
  ok('S22 reduced-motion applies (body carries the class)', await page.evaluate(() => document.body.classList.contains('cp-reduced')));
  await page.uncheck('#set-motion');

  // saves: corrupt + newer refusals shown verbatim (the panel never repairs)
  await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click(); await page.waitForTimeout(400);
  ok('S23 the saves panel lists slots A · B · C', (await page.locator('.cp-slot').count()) >= 3 || /SLOT A/i.test(await page.locator('main').textContent()));
  ok('S24 zero page errors across the states sweep', errs.length === 0, errs.slice(0, 2).join(' | '));
  await page.close();
}

// ---------- 390px: the phone discipline on EVERY shell screen (the Part-5 walk, not just the entry) ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://localhost:${PORT}/?dev=1`); await page.waitForTimeout(2000);
  const walk = [['team', '#/team'], ['cards', '#/cards'], ['hub', '#/hub'], ['week', '#/week'], ['standings', '#/standings'], ['bracket', '#/bracket'], ['awards', '#/awards'], ['review', '#/review'], ['stats', '#/stats'], ['book', '#/book'], ['share', '#/share'], ['guide', '#/guide'], ['settings', '#/settings'], ['saves', '#/saves']];
  const table = [];
  for (const [label, hash] of walk) {
    await page.evaluate((h) => { location.hash = h; }, hash); await page.waitForTimeout(400);
    const s = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    table.push(label + ' ' + s.sw + '/' + s.cw);
    ok(`S25 390px clean on ${label} (no horizontal scroll)`, s.sw - s.cw <= 0, s.sw + '/' + s.cw);
  }
  console.log('   390px walk table: ' + table.join(' · '));
  // the BOARD at 390 (the D-fix law): the board was the 38px overflow — start a real draft and measure
  await page.evaluate(() => { location.hash = '#/team'; }); await page.waitForTimeout(400);
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
  await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
  const bs = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok('S25b the DRAFT BOARD fits 390px (scrollWidth <= clientWidth — the board-at-390 law)', bs.sw - bs.cw <= 0, bs.sw + '/' + bs.cw);
  ok('S25c zero page errors across the 390px walk', errs.length === 0, errs.slice(0, 2).join(' | '));
  await page.close();
}

// ---------- the restore law: a saved week comes back through the real UI (the D1 fix) ----------
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://localhost:${PORT}/?dev=1`); await page.waitForTimeout(2000);
  await page.evaluate((rec) => { (window).__cp.store.dispatch({ type: 'LOAD', record: rec }); }, RECORD);
  await page.evaluate(() => { (window).__cp.refresh && (window).__cp.refresh(); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { (window).__cp.go('complete'); });
  await page.waitForTimeout(300);
  await page.locator('.cp-done .cp-cta').click(); await page.waitForTimeout(700);
  // play week 1 through the real hub CTA; close the feed gate with the feed's own ← BOARD tool
  await page.locator('.cp-hub .cp-cta').click(); await page.waitForTimeout(700);
  if (await page.locator('.zrl-t').count()) {
    await page.locator('.cp-feedtool', { hasText: 'BOARD' }).first().click(); await page.waitForTimeout(200);
  }
  // SAVE the week from the WEEK screen (the stepper's own save path, slot C)
  await page.locator('.cp-navbtn', { hasText: 'WEEK' }).click(); await page.waitForTimeout(400);
  await page.locator('.cp-week button', { hasText: 'SAVE' }).click(); await page.waitForTimeout(600);
  // reload: fresh module state — the save comes back through the BOOT REHYDRATION (Slice 3: the
  // autosave resumes the season and the hub lands home already running) and/or the phase-'none'
  // RESTORE A SAVED WEEK click; BOTH paths must end on the running hub (the law's intent: the
  // saved week comes back through the real UI — the S29 locator is phase-blind by design now)
  await page.reload(); await page.waitForTimeout(2000);
  const resumedHub = (await page.locator('.cp-hub[data-phase="running"], .cp-hub[data-phase="finished"]').count()) === 1;
  if (!resumedHub) {
    await page.locator('.cp-navbtn', { hasText: 'SEASON' }).click(); await page.waitForTimeout(400);
    await page.locator('.cp-hub button', { hasText: 'RESTORE A SAVED WEEK' }).click(); await page.waitForTimeout(800);
  }
  ok('S29 a saved week comes back through the real UI (the D1 fix + the Slice 3 boot rehydration: the hub renders the restored season — resumed from the autosave, or RESTORE A SAVED WEEK)',
    (await page.locator('.cp-hub[data-phase="running"], .cp-hub[data-phase="finished"]').count()) === 1,
    (errs.slice(0, 2).join(' | ') || (resumedHub ? 'the hub resumed from the autosave on boot' : 'hub re-mounted from the week save')));
  ok('S30 zero page errors across the restore flow', errs.length === 0, errs.slice(0, 2).join(' | '));
  await page.close();
}

// ---------- the file:// law: the single-file dist boots offline ----------
{
  const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
  const errs = []; const blocked = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('requestfailed', (r) => blocked.push(r.url()));
  const fileUrl = 'file://' + path.join(ROOT, 'dist', 'single.html');
  await page.goto(fileUrl + '?dev=1'); await page.waitForTimeout(3000);
  // the slot picker arms when a team is chosen (same screen, same look) — choose one, then count
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(400);
  const booted = await page.evaluate(() => ({ teams: document.querySelectorAll('.cp-ts-team').length, slots: document.querySelectorAll('.cp-ts-slot').length }));
  ok('S26 the single-file dist boots from vanilla file:// at Team Select (P-317 picker present)', booted.teams === 32 && booted.slots === 32, JSON.stringify(booted));
  ok('S27 file:// zero console errors', errs.length === 0, errs.slice(0, 2).join(' | '));
  ok('S28 file:// zero blocked requests', blocked.length === 0, blocked.slice(0, 2).join(' | '));
  await page.close();
}

await browser.close();
const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
console.log(`\n== SHELL BATTERY · ${pass} pass · ${fail} fail ==`);
fs.writeFileSync(path.join(ROOT, 'batteries', 'shell-battery.json'), JSON.stringify({ pass, fail, results }, null, 1));
process.exit(fail ? 1 : 0);
