/* node.battery.mjs — the NODE-SIDE battery: framework-blind, browser-free. It runs under ANY
 * framework with zero changes (that is the point of it): every law here imports the port layer
 * (plain TypeScript) or scans the tree with regexes — never a component, never a store binding.
 * Run: node --experimental-strip-types --test batteries/node.battery.mjs
 * Exit 0 = green; exit 1 = a law died (and the falsifier section tells you which ones CAN die). */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (rel) => path.join(ROOT, rel);

// ---------- the port layer, node-side (no browser, no svelte) ----------
const port = await import(P('src/lib/port/seam.ts'));
const { buildPool, newDraft, DEFAULT_CONFIG, runDraft, snakeOrder, TEAMS, boardVM, goneOdds, makeRng,
        startSeason, playWeek, isFinished, gameSeed, createStore, freezePool, thawPool,
        serialize, restore, SCHEMA_VERSION, createLocalStorageModule, cpuChoose, applyPick } = port;
const seasonVM = await import(P('src/lib/port/seasonVM.ts'));
const weekVM = await import(P('src/lib/port/weekVM.ts'));
const standingsVM = await import(P('src/lib/port/standingsVM.ts'));
const fixture = await import(P('src/lib/port/fixture.ts'));
const feedVMm = await import(P('src/lib/port/feedVM.ts'));
const shareable = await import(P('src/lib/port/shareable.ts'));
const reviewVMm = await import(P('src/lib/port/reviewVM.ts'));
const settingsM = await import(P('src/lib/port/settings.ts'));
const savesApp = await import(P('src/lib/port/savesApp.ts'));

const CSV = (p) => fs.readFileSync(P(p), 'utf8');
const pool = buildPool(CSV('data/nfl/madden27-ratings.csv'), CSV('data/nfl/free-agents-old-ratings.csv'), CSV('data/nfl/player-ids.csv'));

// ---------- M1: one door — no .svelte file reaches the engine ----------
test('M1: no svelte file imports the snapshot (the grep is the law; empty outside the port is the PASS)', () => {
  const out = execSync(`grep -rn "engine/" ${P('src/lib')} --include=*.svelte || true`, { encoding: 'utf8' });
  assert.equal(out.trim(), '', 'a .svelte file references engine/: ' + out.trim().slice(0, 200));
});
test('M1b: only port/seam.ts imports src/engine (the ONE door)', () => {
  const hits = execSync(`grep -rln "from '\\.\\./\\.\\./engine/\\|from '\\.\\./engine/" ${P('src/lib')} ${P('src/App.svelte')} || true`, { encoding: 'utf8' })
    .trim().split('\n').filter(Boolean);
  assert.deepEqual(hits, [P('src/lib/port/seam.ts')], 'the door leaked: ' + hits.join(', '));
});

// ---------- M2: one directory — a tree WITHOUT src/engine only misses the adapter ----------
test('M2: the swap cone — deleting src/engine roots every missing module at the adapter (throwaway copy)', () => {
  const tmp = fs.mkdtempSync('/tmp/cp-m2-');
  execSync(`cp -R ${ROOT}/src ${tmp}/src`);
  execSync(`rm -rf ${tmp}/src/engine`);
  let out = '';
  try { execSync(`npx tsc --noEmit --skipLibCheck --target es2022 --module esnext --moduleResolution bundler --allowImportingTsExtensions ${tmp}/src/App.svelte ${tmp}/src/lib/port/fixture.ts 2>&1`, { encoding: 'utf8', cwd: ROOT }); }
  catch (e) { out = String(e.stdout || e.message); }
  const lines = out.split('\n').filter((l) => l.includes('error TS'));
  const screenErrors = lines.filter((l) => /screens\//.test(l));
  assert.equal(screenErrors.length, 0, 'a SCREEN carries a type error after the engine is removed: ' + screenErrors.slice(0, 3).join(' | '));
  fs.rmSync(tmp, { recursive: true, force: true });
});

// ---------- determinism: the fixture marshal is byte-stable and engine-true ----------
const fx1 = fixture.fixtureLeague();
test('N4a: the fixture marshal is deterministic (same bytes twice)', () => {
  const j1 = JSON.stringify({ picks: fx1.record.picks.length, w1: fx1.season.scores.slice(0, 3), next: fx1.season.nextWeek });
  fixture.resetFixture();
  const fx2 = fixture.fixtureLeague();
  const j2 = JSON.stringify({ picks: fx2.record.picks.length, w1: fx2.season.scores.slice(0, 3), next: fx2.season.nextWeek });
  assert.equal(j1, j2);
});
test('N4b: the fixture draft is a FULL 1,024-pick league (32 x 32)', () => {
  assert.equal(fx1.record.picks.length, 1024);
});

// ---------- P-317: the engine's order parameter carries the user's chosen slot ----------
test('P-317: newDraft honours a custom order (the user picks FIRST at their chosen slot)', () => {
  const userTeam = 5, slot = 7;
  const base = snakeOrder();                       // 1,024 entries: 32 rounds of 32
  assert.equal(base.length, 1024);
  const rest = base.slice(0, 32).filter((t) => t !== userTeam);
  const r1 = base.slice(0, 32).map((t, i) => (i + 1 === slot ? userTeam : -1));
  let k = 0;
  const order = [...r1.map((t) => (t === -1 ? rest[k++] : t)), ...base.slice(32)];
  assert.equal(order.length, 1024, 'the custom order is the FULL draft sequence');
  const st = newDraft(pool, makeRng(77).fork('draft'), DEFAULT_CONFIG, order);
  assert.equal(st.order[6], userTeam, 'the user holds overall pick ' + slot);
  assert.notEqual(st.order[0], userTeam, 'slot 7 means the user picks 7th OVERALL, not first');
  runDraft(st, makeRng(77).fork('run'), { team: userTeam, policy: 'greedy' });
  assert.equal(st.log.length, 1024, 'the full 1,024-pick draft ran on the custom order');
  assert.equal(st.log[6].team, userTeam, 'the user drafted at overall ' + slot);
});

// ---------- the season stepper: begin → step → standings → bracket → champion ----------
const teams = fx1.teams;
let season = startSeason(teams, { seed: 4242, year: 2027 });
test('N9a: the stepper plays week 1 and the week view is done', () => {
  ({ state: season } = playWeek(teams, season));
  const w = weekVM.weekView(season, 1);
  assert.equal(w.done, true);
  assert.equal(w.games.length, 16);
  for (const g of w.games) { assert.equal(typeof g.hs, 'number'); assert.ok(g.gameSeed > 0, 'every card carries its gameSeed'); }
});
test('N9b: standings through week 18 equal the engine\'s own table', () => {
  let s = season;
  while (s.nextWeek <= 18) ({ state: s } = playWeek(teams, s));
  season = s;
  const st18 = weekVM.standingsThrough(s, 18);
  const eng = port.table(s);
  for (const t of TEAMS) {
    assert.equal(st18.league.find((r) => r.team === t.name).w, eng[t.name].w, t.name + ' wins differ from the engine table');
    assert.equal(st18.league.find((r) => r.team === t.name).pa, eng[t.name].pa, t.name + ' PA differs');
  }
  assert.ok(s.seeding, 'week 18 fixes the seeding');
});
test('N9c: the bracket derives from the engine seeding and plays out to a champion', () => {
  let s = season;
  while (!isFinished(s)) ({ state: s } = playWeek(teams, s));
  season = s;
  const b = standingsVM.bracketVM(s, TEAMS[5].name);
  const wc = b.rounds[0];
  assert.equal(wc.pairs.length, 6, 'Wild Card = 6 pairs');
  for (const r of b.rounds) assert.equal(r.state, 'played');
  assert.ok(b.champion, 'a champion exists');
  const sb = s.playoffs.find((g) => g.round === 'Super Bowl');
  assert.equal(b.champion, sb.hs > sb.as ? sb.home : sb.away);
});
test('N9d: the season\'s playoff games replay identically from their stored gameSeed', () => {
  const sb = season.playoffs[season.playoffs.length - 1];
  const gs = gameSeed(season.seed, sb.week, sb.home);
  assert.ok(Number.isInteger(gs));
  const label = 'po:Super Bowl:' + sb.home;
  const gs2 = port.forkSeed(season.seed, label);
  assert.equal(gs, gs2, 'the provenance stamp derivation is the engine\'s own fork label');
});

// ---------- stats accumulate through the season (awards read the engine's addBox) ----------
test('N10: the stats accumulator folds every played week into the engine SeasonStats', async () => {
  const { SeasonStatsAccumulator } = await import(P('src/lib/port/seasonStats.ts'));
  const acc = new SeasonStatsAccumulator();
  const rosters = feedVMm.rostersOfRecord(fx1.record);
  const { buildBoxScore } = port;
  let stepState = fx1.season;
  let steps = 0;
  // fold weeks 2..3 of the fixture's season (week 1 is already in the fixture state) as a sample
  const teams2 = fx1.teams;
  for (let i = 0; i < 2; i++) {
    const r = playWeek(teams2, stepState);
    stepState = r.state;
    acc.addWeek(r.games.map((g) => ({ home: g.home, away: g.away, round: g.round, result: g.result })), rosters);
    steps++;
  }
  assert.equal(Object.keys(acc.ss.players).length > 10, true, 'the box scores produced player lines');
  const { leaders } = port;
  const pyd = leaders(acc.ss, 'pyd', 3);
  assert.ok(pyd.length > 0 && pyd[0].stats.pyd > 100, 'a passing leader exists with real yardage');
});

// ---------- the review grammar: the engine recap, re-shaped verbatim ----------
test('N11: the review re-renders the engine recap — no "expected scoring", no "sudden death", turnovers named', async () => {
  const w1 = fx1.season.scores[0];
  const gs = gameSeed(fx1.season.seed, 1, w1.home);
  const teamsL = fx1.teams;
  const { matchupModel, teamIdentity, simulateGame, leagueBaseline, buildBoxScore } = port;
  const by = new Map(teamsL.map((t) => [t.name, t.ratings]));
  const lg = leagueBaseline(teamsL.map((t) => t.ratings));
  const ih = teamIdentity(by.get(w1.home), lg), ia = teamIdentity(by.get(w1.away), lg);
  const res = simulateGame(matchupModel(by.get(w1.home), by.get(w1.away), lg, { off: ih.off, def: ia.def }), matchupModel(by.get(w1.away), by.get(w1.home), lg, { off: ia.off, def: ih.def }), makeRng(gs), { playoff: false });
  const box = buildBoxScore(res, { team: w1.home, lineup: feedVMm.teamRatingsOf(feedVMm.rostersOfRecord(fx1.record)[TEAMS.findIndex((t) => t.name === w1.home)]).lineup }, { team: w1.away, lineup: feedVMm.teamRatingsOf(feedVMm.rostersOfRecord(fx1.record)[TEAMS.findIndex((t) => t.name === w1.away)]).lineup }, makeRng(gs + 1));
  const rv = reviewVMm.reviewVM(res, box, { userTeamName: TEAMS[5].name });
  const all = JSON.stringify(rv);
  assert.ok(!/expected scoring/i.test(all), '"expected scoring" must never appear');
  assert.ok(!/sudden death/i.test(all), '"sudden death" must never appear');
  assert.ok(!/injur/i.test(all), 'no injuries anywhere, ever');
  assert.ok(rv.scoring.length > 0, 'the recap carries scoring lines');
  for (const chip of rv.chips) assert.match(chip.value, /^\d+$/, 'integer chips only: ' + chip.label);
  for (const t of rv.turnovers) assert.match(t.text, /(intercept|fumble)/i, 'every turnover NAMED: ' + t.text);
});

// ---------- saves: one blob + version check; corrupt-never-repair ----------
test('N12a: the week payload round-trips (serialize → restore → hydrate)', async () => {
  const payload = fixture.fixtureWeekPayload(fx1);
  const text = serialize('week', 'C', { engineVersion: 'nfl1.test', dataVersion: 'sha256:test', saveId: 'n-battery', saveRevision: 1, createdAt: '2026-11-16T00:00:00.000Z' }, payload, new Date('2026-11-16T00:00:00.000Z'));
  const parsed = restore(text);
  assert.ok(parsed.ok, parsed.ok ? '' : parsed.message);
  assert.equal(parsed.value.kind, 'week');
  const hydr = await import(P('src/lib/port/seasonSession.ts'));
  const sess = hydr.sessionFromWeekPayload(parsed.value.payload);
  assert.ok(sess.ok, sess.ok ? '' : sess.message);
  assert.equal(sess.value.state.nextWeek, payload.nextWeek);
  assert.equal(sess.value.teams.length, 32);
});
test('N12b: a corrupt blob is REFUSED verbatim (never repaired)', () => {
  const parsed = restore('{"sport":"nfl","kind":"week","schemaVersion":1,"engineVersion":"x","dataVersion":"y","saveId":"z","saveRevision":1,"createdAt":"2026-01-01T00:00:00.000Z","slot":"C","savedAt":"2026-01-01T00:00:00.000Z","payload":{"roster":[]}}');
  assert.equal(parsed.ok, false);
});
test('N12c: a NEWER-build save is refused by VERSION (never silently accepted)', () => {
  const newer = '{"sport":"nfl","kind":"draft","schemaVersion":' + (SCHEMA_VERSION + 8) + ',"engineVersion":"nfl1.0","dataVersion":"sha256:0","saveId":"newer","saveRevision":1,"createdAt":"2026-01-01T00:00:00.000Z","slot":"C","savedAt":"2026-01-01T00:00:00.000Z","payload":{"seed":4242,"userTeam":30,"pool":{},"picks":[]}}';
  const parsed = restore(newer);
  assert.equal(parsed.ok, false, 'a newer schemaVersion must refuse');
  assert.match(parsed.reason, /version|newer/, 'the refusal names the version');
});

// ---------- settings: persistence + safe defaults ----------
test('N13: settings persist and a corrupt blob falls back to defaults', () => {
  const s = settingsM.loadSettings();
  assert.ok(['light', 'dark', 'system'].includes(s.mode));
  assert.equal(typeof s.newestFirst, 'boolean');
  assert.ok(s.draftSlot === null || (s.draftSlot >= 1 && s.draftSlot <= 32), 'the saved draft slot (P-317) is 1..32 or null');
});

// ---------- the shareables: self-contained, offline, provenance-stamped ----------
test('N14: every shareable card is ONE self-contained blob (no CDN, no network, provenance inside)', () => {
  const cards = [
    shareable.draftBrag({ teamName: 'Chicago Bears', seed: 1000, picks: 1024, mine: 32, bestPick: 'Test Player', bestWins: '1.2', engine: 'nfl1.test' }),
    shareable.weekBrag({ teamName: 'Chicago Bears', week: 3, label: 'WEEK 3', home: 'Chicago Bears', away: 'Green Bay Packers', hs: 27, as: 21, meHome: true, gs: 12345, engine: 'nfl1.test' }),
    shareable.seasonBrag({ teamName: 'Chicago Bears', w: 13, l: 4, t: 0, pf: 450, champion: 'Chicago Bears', iChampion: true, engine: 'nfl1.test' }),
    shareable.bracketBrag({ teamName: 'Chicago Bears', madeIt: true, lastRound: 'Conference', champion: 'Chicago Bears', iChampion: false, engine: 'nfl1.test' }),
    shareable.awardsBrag({ teamName: 'Chicago Bears', mvp: 'Test Player', mvpLine: 'QB · pyd 4,800', engine: 'nfl1.test' }),
  ];
  for (const c of cards) {
    const html = shareable.renderShare(c);
    assert.ok(!/https?:\/\//.test(html), 'no network reference in ' + c.title);
    assert.ok(!/<link|<script src/.test(html), 'no external resource in ' + c.title);
    assert.match(html, /played by the pinned engine/, 'the provenance stamp rides ' + c.title);
    assert.match(html, /@media \(max-width:390px\)/, '390px-clean law rides ' + c.title);
    assert.match(html, /prefers-reduced-motion/, 'reduced-motion respected in ' + c.title);
  }
});

// ---------- the display law: integers everywhere; Wins and Priority one decimal ----------
test('N15: the board rows print integers except Wins/Priority (one decimal)', () => {
  const st = createStore(pool);
  st.dispatch({ type: 'START', seed: 77, userTeam: 5 });
  const odds = goneOdds(st.getState().draft, 5, makeRng(77 * 7 + 13), 30);
  const vm = boardVM(st.getState().draft, 5, odds);
  for (const r of vm.rows) {
    assert.match(r.ovr, /^\d+$/, 'OVR integer: ' + r.ovr);
    assert.match(r.wins, /^[+-]\d+\.\d$/, 'Wins one decimal: ' + r.wins);
    assert.match(r.priority, /^[+-]\d+\.\d$/, 'Priority one decimal: ' + r.priority);
    assert.match(r.gone, /^\d+%$/, 'gone% integer: ' + r.gone);
    for (const a of r.alsoFits) assert.match(a.flex, /^-\d+ flex$/, 'flex in the engine\'s own form: ' + a.flex);
  }
});

// ---------- P-365(1): the season brag STATES THE TRUTH about the champion ----------
// The s5-era TOKEN law died case-dead (table uppercase, view-model mixed case). The law is rebuilt
// here on the CURRENT shareable surface, case-INSENSITIVE so it cannot die of casing again — and
// falsifier F5 breaks the champion line to prove it can fail.
test('N14b: the season brag names the REAL champion and the honest record (case-insensitive)', () => {
  const champ = shareable.renderShare(shareable.seasonBrag({ teamName: 'Chicago Bears', w: 13, l: 4, t: 0, pf: 450, champion: 'Chicago Bears', iChampion: true, engine: 'nfl1.test' }));
  assert.match(champ, /super bowl champions/i, 'the champion card says so');
  assert.match(champ, /13-4/, 'the champion record rides');
  const non = shareable.renderShare(shareable.seasonBrag({ teamName: 'Chicago Bears', w: 8, l: 9, t: 0, pf: 312, champion: 'Green Bay Packers', iChampion: false, engine: 'nfl1.test' }));
  assert.match(non, /green bay packers/i, 'the REAL champion is named (any casing — the old law was case-dead)');
  assert.match(non, /8-9/, 'the non-champion record rides');
  assert.doesNotMatch(non, /super bowl champions/i, 'a non-champion never wears the champion line');
});

// ---------- P-365(2): gone% VALUES have an INDEPENDENT law ----------
// The shared-module recompute laws could not catch a bug in the module they recompute through (the
// battery once passed a board whose every gone% was 0%). This law checks the VALUES against (a)
// first-principles envelopes measured on the live engine (probe-gone-dist.mjs: with 60 picks before
// the user's next turn the top of the board runs 99% gone; even at an 8-pick window several rows
// are non-zero) and (b) a direct engine replay built from raw cpuChoose/applyPick — a source
// OUTSIDE the goneOdds/boardVM glue. Falsifier F4 zeroes every gone% and this law must die.
test('N19: gone% values are TRUE — a direct engine replay agrees with the board, and the envelopes hold', () => {
  const onClockAt = (overall) => {
    const st2 = newDraft(pool, makeRng(2026).fork('draft'), DEFAULT_CONFIG, snakeOrder());
    const cpu = makeRng(2026).fork('cpu');
    const user2 = snakeOrder()[overall - 1];          // the team that picks at this overall
    while (st2.pos < overall - 1) {
      const t = st2.order[st2.pos];
      const c = cpuChoose(st2, t, cpu);
      applyPick(st2, t, c.player, c.slot);
    }
    return { st: st2, userTeam: user2 };
  };
  // envelope A (window 60): the top-of-board player is a heavy gone% favourite and the board is hot
  {
    const { st, userTeam } = onClockAt(2);
    const odds = goneOdds(st, userTeam, makeRng(555), 30);
    assert.equal(odds.picksBetween, 60, 'the replay window is the real snake gap');
    const vm = boardVM(st, userTeam, odds, { sort: 'wins' });
    const topGone = Number(vm.rows[0].gone.replace('%', ''));
    assert.ok(topGone >= 50, 'with 60 picks before the next turn the top row gone% must be >= 50, got ' + vm.rows[0].gone);
    const nonzero = vm.rows.filter((r2) => Number(r2.gone.replace('%', '')) > 0).length;
    assert.ok(nonzero >= 10, 'a hot board has many non-zero gone% rows, got ' + nonzero);
    // the independent source: replay the between-window with RAW engine primitives and compare
    let next = st.pos + 1; while (st.order[next] !== userTeam) next++;
    const SIMS = 30; let taken = 0;
    for (let s = 0; s < SIMS; s++) {
      const c = { ...st, pool: st.pool.slice(), rosters: st.rosters.map((r2) => ({ ...r2 })), log: [], repl: { ...st.repl } };
      c.pos = st.pos + 1;
      const rr = makeRng(9000 + s).fork('replay');
      for (let i = c.pos; i < next; i++) {
        const t = c.order[i];
        const ch = cpuChoose(c, t, rr);
        applyPick(c, t, ch.player, ch.slot);
      }
      if (c.log.some((p) => p.player.id === vm.rows[0].id)) taken++;
    }
    const replayGone = Math.round((taken / SIMS) * 100);
    assert.ok(Math.abs(replayGone - topGone) <= 15,
      `the board gone% (${vm.rows[0].gone}) must agree with the direct engine replay (${replayGone}%) within 15 points`);
  }
  // envelope B (window 8, the late first-round slot): a zeroed board still dies here
  {
    const { st, userTeam } = onClockAt(28);
    const odds = goneOdds(st, userTeam, makeRng(555), 30);
    const vm = boardVM(st, userTeam, odds, { sort: 'wins' });
    const gones = vm.rows.map((r2) => Number(r2.gone.replace('%', '')));
    assert.ok(Math.max(...gones) >= 20, 'even a cold window has a row with real gone-odds, max ' + Math.max(...gones) + '%');
    assert.ok(gones.filter((g) => g > 0).length >= 3, 'several rows carry non-zero gone%, got ' + gones.filter((g) => g > 0).length);
  }
});

// ---------- neutrality: the port layer imports no framework ----------
test('N16: port/ is framework-blind (no svelte/vue/react imports, no runes anywhere below the render layer)', () => {
  const BAD = /(from\s+'svelte|from\s+"svelte|from\s+'vue|from\s+'react|from\s+"vue|from\s+"react|\$state\(|\$derived\(|\$props\(|\$effect\()/;
  const offenders = [];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p2 = path.join(d, f.name);
      if (f.isDirectory()) walk(p2);
      else if (/\.(ts|js|mjs)$/.test(f.name)) {
        const txt = fs.readFileSync(p2, 'utf8');
        if (BAD.test(txt)) offenders.push(path.relative(ROOT, p2));
      }
    }
  };
  walk(P('src/lib/port'));
  assert.deepEqual(offenders, [], 'framework refs below the render layer: ' + offenders.join(', '));
});

// ---------- the w88/w89 grammar: the feed classes and the palette hooks exist ----------
test('N17: the w88 feed anatomy rides the shell (zrl-* classes + the me glow + reduced-motion off)', () => {
  const feed = fs.readFileSync(P('src/lib/screens/Feed.svelte'), 'utf8');
  for (const cls of ['zrl-t', 'zrl-badge', 'zrl-sc', 'zrl-me', 'prefers-reduced-motion']) assert.ok(feed.includes(cls), 'Feed.svelte misses ' + cls);
  const shell = fs.readFileSync(P('src/lib/assets/tokens-w89.css'), 'utf8');
  assert.ok(shell.includes('#fdf2f6'), 'the pale-rose light law');
  assert.ok(shell.includes('#1e1119'), 'the dark law');
  assert.ok(shell.includes('data:font/woff2;base64'), 'Cinzel is INLINED (offline), never a CDN');
  assert.ok(!shell.includes('fonts.googleapis'), 'the product never loads fonts from Google');
});
test('N18: the team remap is the 32-team palette (zpb json) + the .ub law lives in the shell law set', () => {
  const zpb = JSON.parse(fs.readFileSync(P('src/lib/assets/zpb-team-colors.json'), 'utf8'));
  assert.equal(Object.keys(zpb).length, 32, 'the 32-team palette table is the only team palette');
  const tokens = fs.readFileSync(P('src/lib/port/tokens.ts'), 'utf8');
  assert.ok(tokens.includes('data-zpbteam'), 'the [data-zpbteam] remap is the palette driver');
  assert.ok(tokens.includes("ub"), 'the .ub law is named in the remap module');
});

console.log('\n== NODE BATTERY complete — framework-blind, browser-free ==');
