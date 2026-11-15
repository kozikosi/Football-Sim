/* slice1.battery.mjs — the w77 acceptance battery mapped onto Slice 1 (the Draft Board), HONESTLY.
 *
 * The w77 battery's 84 assertions were written against the w76+ SHELL (its DOM ids, its zpb classes,
 * its global engine). A Svelte component tree cannot run them verbatim. Per the standing rule, an
 * assertion that cannot apply is a loud SKIP with the reason — never a silent drop, and the battery
 * is never weakened. This runner therefore reports THREE counts:
 *   APPLY   — the assertion's LAW (not its selector) is checkable on Slice 1, and was run here;
 *   SKIP    — the law targets a shell surface Slice 1 does not contain yet (later slices), or a
 *             shell-only constant (the zpb classes);
 *   DEFER   — the law belongs to the cutover battery and needs both trees (the Architect runs it).
 * Every APPLY line runs for real (Playwright against the built slice, or node against the engine).
 * The engine itself is verified by the Architect's own 284 tests, re-run in this tree (284/284).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = process.env.CP_PORT || 4179;
const results = [];
const ok = (law, pass, detail = '') => { results.push({ law, verdict: pass ? 'PASS' : 'FAIL', detail }); console.log(`   ${pass ? 'PASS' : 'FAIL'}  ${law}${detail ? ' — ' + detail : ''}`); };
const skip = (law, why) => { results.push({ law, verdict: 'SKIP', detail: why }); console.log(`   SKIP  ${law} — ${why}`); };

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
await page.goto(`http://localhost:${PORT}/?dev=1`);
await page.waitForTimeout(3500);

console.log('== slice 2: the Team Select flow (the draft starts from the user\'s choice) ==');
ok('the dev build opens at TEAM SELECT, not on a board with a random team', (await page.locator('.cp-ts').count()) === 1 && (await page.locator('.cp-row').count()) === 0);
ok('the Team Select lists all 32 teams', (await page.locator('.cp-ts-team').count()) === 32, (await page.locator('.cp-ts-team').count()) + ' team buttons');
ok('the 32 teams sit in the real alignment (AFC + NFC, 4 divisions each)', (await page.locator('.cp-ts-conf').allTextContents()).join(',') === 'AFC,NFC' && (await page.locator('.cp-ts-div').count()) === 8);
ok('the measured mode is the DEFAULT on Team Select too ("Model Value" on, pre-draft)', (await page.locator('.cp-mode.cp-on').textContent()) === 'Model Value');
ok('the mode switch is NOT disabled before the draft (the Owner preset is one click away pre-draft)', !(await page.locator('.cp-mode').first().isDisabled()));
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click(); await page.waitForTimeout(150);
ok('selecting a team shows its details (name + the real division)', (await page.locator('.cp-ts-detail h3').textContent()) === 'Chicago Bears' && /NFC North/.test(await page.locator('.cp-ts-meta').textContent()));
ok('the details are engine-derived (the division rivals read the real alignment)', /Detroit Lions · Green Bay Packers · Minnesota Vikings/.test(await page.locator('.cp-ts-rivals').textContent()));
await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
ok('the choice flows into the Draft Board — the board drafts as the CHOSEN team', (await page.locator('.cp-team').textContent()) === 'Chicago Bears');

console.log('== the laws the Draft Board carries (APPLY — run for real) ==');
ok('the board renders from the view model (engine state in, plain JSON out)', (await page.locator('.cp-row').count()) === 60, '60 rows');
ok('the default sort is wins/priority, never raw OVR', (await page.locator('.cp-sort.cp-on').textContent()) === 'Wins');
ok('the on-clock indicator names the round, the pick and the overall', /Round \d+, Pick \d+ \(overall \d+ of \d+\)/.test(await page.locator('.cp-onclock').textContent()));
{
  // P-286 fix (the muse review): the law says EVERY row — check every row's every field, not just the first row's gone%.
  const fields = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.cp-row'));
    const bad = [];
    for (const row of rows) {
      const get = (sel) => (row.querySelector(sel)?.textContent || '').trim();
      const nums = Array.from(row.querySelectorAll('.cp-main .cp-num')).map((e) => (e.textContent || '').trim());
      const rec = { name: get('.cp-name'), pos: get('.cp-pos'), team: get('.cp-nflteam'), ovr: nums[0], wins: nums[1], pri: nums[2], gone: nums[3] };
      if (!rec.name || !rec.pos || !rec.team || !/^\d+$/.test(rec.ovr) || !/^[+-]/.test(rec.wins) || !/^[+-]/.test(rec.pri) || !/^\d+%$/.test(rec.gone)) bad.push(rec);
    }
    return { n: rows.length, bad };
  });
  ok('every row reads name · pos · team · OVR · wins · priority · gone% (EVERY row, EVERY field)', fields.n === 60 && fields.bad.length === 0, fields.bad.length ? JSON.stringify(fields.bad.slice(0, 2)) : fields.n + ' rows, 0 bad');
}
ok('the gone-odds display is present on every row', (await page.locator('.cp-row .cp-gone').count()) === 60);
ok('the sort controls offer wins / OVR / priority', JSON.stringify(await page.locator('.cp-sort').allTextContents()) === JSON.stringify(['Wins', 'Priority', 'OVR']));
await page.locator('.cp-sort', { hasText: 'OVR' }).click(); await page.waitForTimeout(400);
const firstOvr = await page.locator('.cp-row .cp-ovr').first().textContent();
const ovrs = await page.locator('.cp-row .cp-ovr').allTextContents();
ok('the OVR sort actually sorts', JSON.stringify(ovrs) === JSON.stringify([...ovrs].sort((a, b) => Number(b) - Number(a))), 'first ' + firstOvr);
await page.locator('.cp-sort', { hasText: 'Wins' }).click(); await page.waitForTimeout(300);
// P-286 fix (the muse review): the flex-chip check must OBSERVE the chips while a picker is open —
// never pass vacuously through a count === 0 escape. Probe the first 14 rows' pickers for real chips.
{
  const probe = await page.evaluate(async () => {
    const rows = Array.from(document.querySelectorAll('.cp-row')).slice(0, 14);
    const flexChips = []; const bad = []; let opened = 0;
    for (const row of rows) {
      const main = row.querySelector('.cp-main');
      if (!main) continue;
      main.click(); opened++;
      await new Promise((r2) => setTimeout(r2, 60));
      const fit = row.querySelector('.cp-fits');
      if (fit) for (const i of fit.querySelectorAll('.cp-chip i')) {
        const t = (i.textContent || '').trim();
        if (/^-\d+ flex$/.test(t)) flexChips.push(t); else bad.push(t);
      }
      main.click();
      await new Promise((r2) => setTimeout(r2, 40));
    }
    return { opened, flexChips, bad };
  });
  ok('the flex chips read the flex cost (the "-N" form, no "flex tax" wording) — OBSERVED open', probe.opened > 0 && probe.flexChips.length > 0 && probe.bad.length === 0, probe.opened + ' pickers probed · ' + probe.flexChips.length + ' flex chips · sample ' + JSON.stringify(probe.flexChips.slice(0, 3)) + (probe.bad.length ? ' · BAD ' + JSON.stringify(probe.bad.slice(0, 2)) : ''));
}
// the pick flow: open a row, take the primary chip, confirm
await page.locator('.cp-row .cp-main').first().click(); await page.waitForTimeout(150);
const chipLbl = await page.locator('.cp-chip.cp-primary').first().textContent();
ok('the slot picker offers the natural slot first', /Draft at /.test(chipLbl || ''), (chipLbl || '').trim());
await page.locator('.cp-chip.cp-primary').first().click(); await page.waitForTimeout(150);
ok('the pick confirms before it lands', await page.locator('.cp-confirm').isVisible(), (await page.locator('.cp-confirm').textContent() || '').trim().slice(0, 60));
await page.locator('.cp-go').click(); await page.waitForTimeout(700);
ok('the pick lands and the footer counts it', (await page.locator('.cp-count').textContent()) === '1 of 32 starters');
ok("the CPU teams pick on after the user's pick (the clock advances)", /Round 2/.test(await page.locator('.cp-onclock').textContent()));
await page.locator('.cp-undo').click(); await page.waitForTimeout(700);
ok('undo cuts the log back and the count returns', (await page.locator('.cp-count').textContent()) === '0 of 32 starters');
// the valuation modes
ok('the measured mode is the DEFAULT ("Model Value" on)', (await page.locator('.cp-mode.cp-on').textContent()) === 'Model Value');
ok('the Owner preset is one click away', (await page.locator('.cp-mode', { hasText: 'Owner preset' }).count()) === 1);
ok('the mode switch is DISABLED mid-draft (it was free on Team Select — the lock fires at START)', await page.locator('.cp-mode').first().isDisabled());
ok('the mode label travels with the numbers (the subtitle carries it)', /Model Value/.test(await page.locator('.cp-prov').textContent()));
ok('zero page errors across the whole battery', errs.length === 0, errs.slice(0, 2).join(' | '));

// ---- slice 3 (P-316): the board chrome pass — the gone-odds method tooltip + the my-needs sticky row ----
console.log('== slice 3: the gone-odds method tooltip (the engine already computed it; the UI now says how) ==');
{
  await page.locator('.cp-row .cp-gone-wrap').first().hover();
  await page.waitForTimeout(200);
  const tip = page.locator('.cp-gonetip').first();
  ok('the gone% cell explains its METHOD on hover (real CPU logic · sims · picks between)', await tip.isVisible(), (await tip.textContent() || '').trim().slice(0, 100));
  // the tooltip's numbers are the ENGINE's own meta: recompute goneOdds node-side with the SAME inputs App uses
  const { record, tipText } = await page.evaluate(() => ({
    record: JSON.parse(JSON.stringify(window.__cp.store.getState().record)),
    tipText: document.querySelector('.cp-gonetip')?.textContent || '',
  }));
  const { restoreDraft } = await import('../src/engine/sports/nfl/app/store.ts');
  const { goneOdds } = await import('../src/engine/sports/nfl/engine/goneodds.ts');
  const { makeRng } = await import('../src/engine/core/rng.ts');
  const rec = record;
  const odds = goneOdds(restoreDraft(rec), rec.userTeam, makeRng(rec.seed * 7 + 13), 30);
  ok('the tooltip names the engine\'s OWN picksBetween and sims (not a UI-invented story)',
    tipText.includes(`the ${odds.picksBetween} picks between now and your turn were replayed ${odds.sims} times`),
    `engine: between=${odds.picksBetween} sims=${odds.sims}`);
  await page.mouse.move(10, 10);
}
console.log('== slice 3: the my-needs sticky row (which of my 32 slots are open, clickable to filter) ==');
{
  ok('the needs row lists all 32 OPEN slots at the draft\'s start', (await page.locator('.cp-need').count()) === 32, (await page.locator('.cp-need').count()) + ' chips');
  ok('the needs row is STICKY (position: sticky, a real sticky row)', await page.evaluate(() => getComputedStyle(document.querySelector('.cp-needs')).position) === 'sticky');
  await page.locator('.cp-need', { hasText: 'WR1' }).first().click();
  await page.waitForTimeout(250);
  const n = await page.locator('.cp-rows .cp-row').count();
  ok('clicking a need filters the board to rows that FILL it (primary or flex)', n > 0 && n < 60, `60 -> ${n} rows`);
  const allFill = await page.evaluate(async () => {
    // open EVERY filtered row's picker: its primary label must be the selected slot, or a flex chip names it
    const rows = Array.from(document.querySelectorAll('.cp-rows .cp-row'));
    const btns = Array.from(document.querySelectorAll('.cp-need.cp-need-on')).map((b) => b.textContent.trim());
    const bad = [];
    for (const row of rows) {
      const main = row.querySelector('.cp-main');
      main.click();
      await new Promise((r2) => setTimeout(r2, 40));
      const lbl = (row.querySelector('.cp-fitlbl')?.textContent || '').trim();
      const chips = Array.from(row.querySelectorAll('.cp-chip')).map((c) => c.textContent.trim());
      const okRow = btns.some((b) => lbl.startsWith('Fills ' + b) || chips.some((c) => c.startsWith(b + ' ')));
      if (!okRow) bad.push({ lbl, chips: chips.slice(0, 3) });
      main.click();
      await new Promise((r2) => setTimeout(r2, 25));
    }
    return { n: rows.length, bad };
  });
  ok('every filtered row provably fills the selected slot (primary label or a flex chip — pickers opened)', allFill.n > 0 && allFill.bad.length === 0, allFill.n + ' rows opened, 0 bad');
  await page.locator('.cp-need-all').click();
  await page.waitForTimeout(200);
  ok('ALL clears the filter (the full board returns)', (await page.locator('.cp-rows .cp-row').count()) === 60);
}

// ---- slice 3 (P-316): hydration + the load/save UI ----
console.log('== slice 3: the saves panel — envelope in, corrupt-never-repair out ==');
{
  await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
  await page.waitForTimeout(600);
  ok('the Saves panel lists the three slots (A · B · C)', (await page.locator('.cp-slot').count()) === 3);
  ok('the slots read empty before anything is saved', (await page.locator('.cp-slot-empty').count()) === 3);
  await page.locator('.cp-slot[data-slot="A"] .cp-slot-save').click();
  await page.waitForTimeout(700);
  const a = (await page.locator('.cp-slot[data-slot="A"]').textContent()).replace(/\s+/g, ' ');
  ok('saving the draft lands an ENVELOPE in slot A (kind · revision · picks · team)', /DRAFT · rev \d+/.test(a) && /picks · Chicago Bears/.test(a), a.trim().slice(0, 80));
  ok('slot A is loadable', (await page.locator('.cp-slot[data-slot="A"] .cp-slot-load').count()) === 1);
  await page.locator('.cp-saves-x').click();
  await page.waitForTimeout(300);
  // persistence: the envelope survives a reload, and loads back through the panel
  await page.reload();
  await page.waitForTimeout(2200);
  await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await page.locator('.cp-ts-go').click();
  await page.waitForTimeout(800);
  await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
  await page.waitForTimeout(700);
  const a2 = (await page.locator('.cp-slot[data-slot="A"]').textContent()).replace(/\s+/g, ' ');
  ok('the envelope SURVIVES a reload (same kind · rev · picks)', /DRAFT · rev \d+/.test(a2) && /picks · Chicago Bears/.test(a2), a2.trim().slice(0, 80));
  await page.locator('.cp-slot[data-slot="A"] .cp-slot-load').click();
  await page.waitForTimeout(900);
  ok('loading the draft restores the board (team + store state)', (await page.locator('.cp-team').textContent()) === 'Chicago Bears' && (await page.locator('.cp-board').count()) === 1);
  // corrupt-never-repair: inject a corrupt week save into B, a newer-version envelope into C
  await page.evaluate(() => {
    localStorage.setItem('sim:nfl:slot:B', JSON.stringify({ sport: 'nfl', kind: 'week', schemaVersion: 1, engineVersion: 'x', dataVersion: 'x', saveId: 'x', saveRevision: 1, createdAt: '2026-11-10T00:00:00.000Z', slot: 'B', savedAt: '2026-11-10T00:00:00.000Z', payload: { seed: 1, year: 2027, run: 0, gameSeed: 5, nextWeek: 3, userTeam: 'Chicago Bears', roster: [], ratings: {}, schedule: [], scores: [{ week: 1, home: 'Chi', away: 'Det', hs: 3, as: 7 }], plan: null, statsRecorded: false } }));
    localStorage.setItem('sim:nfl:slot:C', JSON.stringify({ sport: 'nfl', kind: 'week', schemaVersion: 99, engineVersion: 'future', dataVersion: 'x', saveId: 'x', saveRevision: 1, createdAt: '2026-11-10T00:00:00.000Z', slot: 'C', savedAt: '2026-11-10T00:00:00.000Z', payload: {} }));
  });
  await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
  await page.waitForTimeout(900);
  const b = (await page.locator('.cp-slot[data-slot="B"]').textContent()).replace(/\s+/g, ' ');
  const c = (await page.locator('.cp-slot[data-slot="C"]').textContent()).replace(/\s+/g, ' ');
  ok('a CORRUPT week save is REFUSED verbatim (never repaired, never defaulted)', /REFUSED \(corrupt\)/.test(b) && /corrupt-never-repair/.test(b), b.trim().slice(0, 110));
  ok('a NEWER-VERSION envelope is refused as newer (never overwritten)', /REFUSED \(newer-version\)/.test(c), c.trim().slice(0, 90));
  // a REAL week save, built by the engine, hydrates through the panel
  const { buildWeekEnvelope } = await import('./weekfixture.mjs');
  const weekText = await buildWeekEnvelope();
  await page.evaluate((t) => localStorage.setItem('sim:nfl:slot:C', t), weekText);
  await page.locator('.cp-saves-x').click(); await page.waitForTimeout(200);
  await page.locator('.cp-topbar-btn', { hasText: 'Saves' }).click();
  await page.waitForTimeout(1100);
  const c2 = (await page.locator('.cp-slot[data-slot="C"]').textContent()).replace(/\s+/g, ' ');
  ok('a REAL week save (engine-built) HYDRATES: WEEK · next week · the user\'s fixture', /WEEK · rev \d+/.test(c2) && /next: week \d+/.test(c2), c2.trim().slice(0, 130));
  await page.locator('.cp-slot[data-slot="C"] .cp-slot-load').click();
  await page.waitForTimeout(400);
  const hyd = (await page.locator('.cp-hydrated').textContent()).replace(/\s+/g, ' ');
  ok('the hydrated card renders the engine\'s LoadedWeek (trusted vs re-derived, named)', /Hydrated — week save/.test(hyd) && /RE-DERIVED/.test(hyd), hyd.trim().slice(0, 120));
  await page.locator('.cp-saves-x').click();
  await page.waitForTimeout(300);
}

// ---- slice 4 (P-287): the N3 drive-level feed ----
console.log('== slice 4: the drive-level feed (the w88 badge format and colors, engine-true) ==');
const { restoreDraft } = await import('../src/engine/sports/nfl/app/store.ts');
const { candidates } = await import('../src/engine/sports/nfl/engine/draft.ts');
const { feedVM } = await import('../src/lib/feedVM.ts');
{
  ok('PLAY WEEK 1 is ABSENT while the draft runs', (await page.locator('.cp-play').count()) === 0);
  // complete the draft through the REAL store reducer: 32 user picks, the engine's own advice each time
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
  const status = await page.evaluate(() => window.__cp.store.getState().status);
  ok('the draft completes through the store (status done — 32 real PICK actions)', status === 'done', 'status ' + status);
  await page.waitForTimeout(300);
  ok('PLAY WEEK 1 appears when the draft is done', (await page.locator('.cp-play').count()) === 1);
  await page.locator('.cp-play').click();
  await page.waitForTimeout(900);
  ok('the feed renders from the finished rosters', (await page.locator('.cp-feed').count()) === 1);
  const dom = await page.evaluate(() => ({
    lines: document.querySelectorAll('.cp-feed-line').length,
    me: document.querySelectorAll('.cp-feed-line.cp-me').length,
    finalTxt: document.querySelector('.cp-feed-final')?.textContent?.replace(/\s+/g, ' ') ?? '',
    foot: document.querySelector('.cp-feed-foot span')?.textContent ?? '',
    clocks: Array.from(document.querySelectorAll('.cp-feed-line .zrl-t')).map((e) => e.textContent),
    scores: Array.from(document.querySelectorAll('.cp-feed-line .zrl-sc')).map((e) => e.textContent.replace(/\s/g, '')),
    badges: document.querySelectorAll('.cp-feed-line .zrl-badge').length,
    q: document.querySelector('.cp-feed-q')?.textContent ?? '',
    prov: document.querySelector('.cp-feed-prov')?.textContent ?? '',
  }));
  const record = await page.evaluate(() => JSON.parse(JSON.stringify(window.__cp.store.getState().record)));
  const vm = feedVM(record, record.seed, record.userTeam);
  ok('the UI game IS the engine game: the final score matches the node recompute EXACTLY',
    dom.finalTxt.includes(`${vm.awayScore}`) && dom.finalTxt.includes(`${vm.homeScore}`) && dom.finalTxt.includes(vm.awayAbbr) && dom.finalTxt.includes(vm.homeAbbr),
    `UI ${dom.finalTxt.slice(0, 40)} · engine ${vm.awayAbbr} ${vm.awayScore} @ ${vm.homeAbbr} ${vm.homeScore}`);
  ok('the drive count matches the engine recompute', dom.lines === vm.drives.length, `${dom.lines} = ${vm.drives.length}`);
  ok('the ME glow marks exactly the user team\'s drives', dom.me === vm.meDrives, `${dom.me} = ${vm.meDrives}`);
  ok('the lead-change count matches the engine recompute', dom.foot.includes(`${vm.leadChanges} lead changes`), dom.foot);
  ok('every drive line carries clock · team chip · badges · running score (EVERY line; OT drives carry the OT stamp)',
    dom.lines > 0 && dom.badges >= dom.lines && dom.clocks.every((t) => /^(Q\d \d{2}·\d{2}|OT\d*)$/.test(t)) && dom.scores.every((s) => /^\d+·\d+$/.test(s)),
    `${dom.lines} lines · ${dom.badges} badges · clocks+scores all in form`);
  ok('the quarter marks ride the log (the w88 replay look)', /^Q\d$/.test(dom.q), dom.q);
  ok('the provenance stamp names the seed and the fixture (a number is never shown without its provenance)', /gameSeed \d+ · week 1 · .+ @ .+/.test(dom.prov), dom.prov);
  ok('the running scores END at the final (the drives add up)', (() => {
    const last = dom.scores[dom.scores.length - 1]?.split('·').map(Number) ?? [];
    return last[1] === vm.homeScore && last[0] === vm.awayScore;
  })(), 'last ' + dom.scores[dom.scores.length - 1]);
  ok('no yards are faked (the v1 feed shows plays and time, never an invented yard figure)', !(await page.locator('.cp-feed').textContent()).match(/\d{2,3} yards/));
  // dynamics: newest-first + mine-only
  const firstBefore = dom.clocks[0];
  await page.locator('.cp-feedtool', { hasText: 'NEWEST FIRST' }).click();
  await page.waitForTimeout(250);
  const dom2 = await page.evaluate(() => ({
    clocks: Array.from(document.querySelectorAll('.cp-feed-line .zrl-t')).map((e) => e.textContent),
    lines: document.querySelectorAll('.cp-feed-line').length,
  }));
  ok('NEWEST FIRST flips the reading (the last drive leads; every drive still present)',
    dom2.clocks[0] === dom.clocks[dom.clocks.length - 1] && dom2.lines === dom.lines,
    `${firstBefore} -> ${dom2.clocks[0]}`);
  await page.locator('.cp-feedtool', { hasText: 'MY DRIVES' }).click();
  await page.waitForTimeout(250);
  const me3 = await page.evaluate(() => document.querySelectorAll('.cp-feed-line').length);
  ok('MY DRIVES filters to the user\'s drives only', me3 === vm.meDrives, `${me3} = ${vm.meDrives}`);
  await page.locator('.cp-feedtool', { hasText: 'MY DRIVES' }).click();
  await page.locator('.cp-feedtool', { hasText: 'NEWEST FIRST' }).click();   // back to the replay reading
  await page.waitForTimeout(200);
  ok('zero page errors across the feed laws', errs.length === 0, errs.slice(0, 2).join(' | '));
  await page.screenshot({ path: 'shots/slice4-feed.png', fullPage: true });
}

// ---- slice 4: reduced motion is respected (the w88 law rides along) ----
{
  const page2 = await browser.newPage({ viewport: { width: 1180, height: 950 }, reducedMotion: 'reduce' });
  page2.on('pageerror', (e) => errs.push(String(e)));
  await page2.goto(`http://localhost:${PORT}/?dev=1`);
  await page2.waitForTimeout(2200);
  await page2.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
  await page2.locator('.cp-ts-go').click();
  await page2.waitForTimeout(700);
  for (let turn = 0; turn < 32; turn++) {
    const st = await page2.evaluate(() => {
      const s = window.__cp.store.getState();
      return s.status === 'done' ? 'done' : JSON.parse(JSON.stringify(s.record));
    });
    if (st === 'done') break;
    const ds = restoreDraft(st);
    const c = candidates(ds, st.userTeam);
    if (!c.length) break;
    await page2.evaluate(({ pid, slot }) => { window.__cp.store.dispatch({ type: 'PICK', playerId: pid, slot }); }, { pid: c[0].player.id, slot: c[0].slot });
  }
  await page2.locator('.cp-play').click();
  await page2.waitForTimeout(600);
  const anim = await page2.evaluate(() => getComputedStyle(document.querySelector('.cp-feed-line')).animationName);
  ok('prefers-reduced-motion: the beat-in animation is OFF (the lines land at once)', anim === 'none', 'animation-name: ' + anim);
  await page2.close();
  ok('zero page errors across the whole battery (slices 1-4)', errs.length === 0, errs.slice(0, 2).join(' | '));
}

console.log('== the laws that live on later slices or shell surfaces (SKIP — loudly) ==');
skip('V0 the median trio (the drafted-pool median, superseded 76, cached once)', 'the scale explainer lives on the season screen (a later slice); the engine median itself is verified by the engine tests');
skip('V2/V3 the chip law (all off = the full board)', 'the position-chip BAR in shell form is not the law — slice 3 built the board chrome (the needs sticky row + the gone-odds tooltip, verified above); the shell chip bar itself arrives with the shell-form pass');
skip('V5 the phone laws at 390 (the footer nav, the pan laws)', 'the footer nav is shell chrome; the slice screens are mobile-flexible but the shell laws name shell elements');
skip('V6 the playoff round cinematics', 'playoffs are a later slice');
skip('V8a/V8b/V8c/V13/V14/V16 the stage bars, the preseason page, the guide ladder', 'shell pages outside slices 1-3 (team select landed in slice 2, the saves panel in slice 3; the season surfaces and the guide arrive in later slices)');
skip('V9/V10/V11/V12 the SIM SEASON ghost, the pregame cards, the linescore frame, the award inks', 'season-surface laws — later slices');
skip('V15 the fills column and V17 the picker chips in shell form', 'slice 1 renders the same data as the also-fits chips + the slot picker; the shell FORM is not the law, the DATA is (verified above)');
skip('V7 the display scale centers on the median', 'the display scale drives the season surfaces; the draft numbers ride the same display.ts strings (verified by the engine tests)');
skip('V4 the command center / cutdown day', 'the season review screen — a later slice');
skip('V1 the dropdown order + the OG casing', 'the shell dropdown is a filter on the board chrome; the depth-chart order lives in the engine slots (verified by the engine tests)');

console.log('== DEFER to the cutover battery (needs both trees; the Architect runs it) ==');
for (const law of ['the gone-odds METHOD equality (30 sims, the real CPU logic) vs the shell numbers', 'the 84-assertion DOM battery byte-parity', 'the witness export parity']) results.push({ law, verdict: 'DEFER', detail: 'the cutover battery' });

const pass = results.filter((r) => r.verdict === 'PASS').length;
const fail = results.filter((r) => r.verdict === 'FAIL').length;
const sk = results.filter((r) => r.verdict === 'SKIP').length;
const def = results.filter((r) => r.verdict === 'DEFER').length;
console.log(`\n== SLICE 1 BATTERY · ${pass} pass · ${fail} fail · ${sk} skip (loud, with reasons) · ${def} deferred to cutover ==`);
fs.writeFileSync(path.join(ROOT, 'batteries', 'slice1-battery.json'), JSON.stringify({ pass, fail, skip: sk, defer: def, results }, null, 1));
await browser.close();
process.exit(fail ? 1 : 0);
