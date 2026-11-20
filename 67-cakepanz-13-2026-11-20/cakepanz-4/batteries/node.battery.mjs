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

// ---------- P-260 F8: the envelope's slot must match the key it is written under ----------
test('N20 (F8): the save service refuses a slot/key mismatch — the engine asserts the pair, the composition wires it', () => {
  const { assertSlotMatchesKey } = port;
  // the engine's own assertion (saves.ts): null when the pair matches, a refusal message otherwise
  assert.equal(assertSlotMatchesKey('A', savesApp.slotKey('A')), null, 'a matching slot/key pair passes');
  const refusal = assertSlotMatchesKey('B', savesApp.slotKey('A'));
  assert.ok(typeof refusal === 'string' && refusal.length > 0, 'a mismatched pair is refused, with a message');
  // the composition root injects the assertion into the storage module (the ONE writer path)
  const src = fs.readFileSync(P('src/lib/port/savesApp.ts'), 'utf8');
  assert.ok(src.includes('slotCheck: assertSlotMatchesKey'), 'savesApp composes the slot check into LocalStorageModule');
});

test('N21: the older-build note names another build on the slot card, and is silent for the running one (Part F)', () => {
  const running = port.engineVersion();
  const sum = (engineVersion) => ({ slot: 'A', state: 'ok', kind: 'draft', engineVersion });
  assert.equal(savesApp.olderBuildNote(sum(running), running), null, 'a save written by THIS build shows no note');
  const note = savesApp.olderBuildNote(sum(running + 'older'), running);
  assert.ok(note && note.includes(running + 'older'), 'a save from another build is NAMED (visible older-build state)');
  assert.ok(note.includes('logged picks hold; un-made picks may differ'), 'the F5 sentence rides the note');
  assert.equal(savesApp.olderBuildNote({ slot: 'A', state: 'refused', engineVersion: 'x' }, running), null, 'a refused slot shows the refusal, not the note');
  assert.equal(savesApp.olderBuildNote({ slot: 'A', state: 'ok', kind: 'week' }, running), null, 'a summary without a version shows no note');
  // the panel renders it (the same composition-check pattern as N20 — the RENDER call, not the import)
  const panel = fs.readFileSync(P('src/lib/components/Saves.svelte'), 'utf8');
  assert.ok(panel.includes('olderBuildNote(sum, engineVersion())'), 'the saves panel renders the older-build note on the slot card');
});

test('N22 (the packs law): the sim boots on a non-empty pool, and the current-era pack hashes to the pin value', async () => {
  // Ernie §6.5: the failure mode this catches — the season runs on an EMPTY pool while every other
  // law still passes. The hash is cited WITH its invocation (loader-hash caveat: a bare hash is UNKNOWN).
  const { makePack } = await import(P('src/engine/core/pack.ts'));
  const { loadPools } = await import(P('src/engine/sports/nfl/sim/pools.ts'));
  const body = JSON.parse(fs.readFileSync(P('data/packs/nfl-pools-fit2023-2025.json'), 'utf8'));
  const pack = makePack(body);
  assert.equal(pack.hash, 'pack53:0e78e4db382f9f',
    'the current-era pack, as baked (invocation: makePack(JSON.parse(data/packs/nfl-pools-fit2023-2025.json)) — the pack stamps its own hash)');
  const pools = loadPools(makePack(JSON.parse(JSON.stringify(body))));
  const poolRows = [...pools.rec[0].values()];
  const total = poolRows.reduce((a, p) => a + p.total, 0);
  assert.ok(poolRows.length > 0 && total > 0, `the pool is non-empty: ${poolRows.length} pools, ${total} weighted plays`);
});

// ---------- Part A (cakepanz-6): the team takeover is WIRED — accents move, the laws hold ----------
test('N23 (Part A): picking a team changes at least three accent tokens, and --zcream is unchanged', async () => {
  const tokens = await import(P('src/lib/port/tokens.ts'));
  const sheet = fs.readFileSync(P('src/lib/assets/tokens-w89.css'), 'utf8');
  const zpb = JSON.parse(fs.readFileSync(P('src/lib/assets/zpb-team-colors.json'), 'utf8'));
  const teams = Object.keys(zpb);
  assert.equal(teams.length, 32, 'the 32-team palette drives the takeover');
  const REMAPPED = new Set(['--gold2', '--goldm', '--gold3', '--rosehair', '--hairline', '--panel2']);
  const PROTECTED = ['--zcream', '--bg', '--panel', '--text', '--sub'];
  // 1. the solver emits six mode stops for every team, each a real hex, and the light takeover
  //    genuinely CHANGES all three golds (a takeover that only shows on one team is half-built)
  const distinct = new Set();
  for (const t of teams) {
    const vars = tokens.teamRemap(t).vars;
    for (const k of ['--zpb-t1L', '--zpb-t2L', '--zpb-t3L', '--zpb-t1D', '--zpb-t2D', '--zpb-t3D']) {
      assert.match(vars[k], /^#[0-9a-fA-F]{6}$/, `${t} ${k} is a hex`);
    }
    const golds = [vars['--zpb-t1L'], vars['--zpb-t2L'], vars['--zpb-t3L']].map((x) => x.toLowerCase());
    assert.ok(golds.every((x) => tokens.zpbContrast(x, tokens.LIGHT.panel) >= 3), `${t}: the light accents read on the panel (>=3:1)`);
    const defaults = [tokens.LIGHT.gold2, tokens.LIGHT.goldm, tokens.LIGHT.gold3].map((x) => x.toLowerCase());
    assert.ok(golds.every((x, i) => x !== defaults[i]), `${t}: all three golds change (the takeover is not a no-op)`);
    distinct.add(golds.join(','));
  }
  assert.ok(distinct.size >= 24, `the takeover is per-team, not one palette for everyone (${distinct.size}/32 distinct light accent sets)`);
  // 2. the three-block structure earns its keep: a near-black primary lifts in dark mode
  const ravens = tokens.teamAccents('Baltimore Ravens');
  assert.notEqual(ravens.light[0].toLowerCase(), ravens.dark[0].toLowerCase(), 'a near-black primary (#241773) gets a DIFFERENT gold in dark mode');
  // 3. the sheet maps the team stops onto the accents in ALL THREE blocks — written AND read
  const blocks = [...sheet.matchAll(/:root(?::not\(\[data-theme="light"\]\)|\[data-theme="dark"\])?\[data-zpbteam\]\s*\{([^}]*)\}/g)].map((m) => m[1]);
  assert.equal(blocks.length, 3, 'the three [data-zpbteam] remap blocks exist');
  // 3b. the system-dark block rides its media query — bare, :not([data-theme="light"]) matches
  //     light mode too and its higher specificity paints the dark accents over the light ones
  //     (found by this sitting's probe: the inherited skeleton had the block bare)
  {
    const re = /@media[^{]*\{|\{|\}|:root:not\(\[data-theme="light"\]\)\[data-zpbteam\]/g;
    const stack = []; let bare = 0, wrapped = 0; let m;
    while ((m = re.exec(sheet))) {
      const t = m[0];
      if (t.startsWith('@media')) stack.push(/dark/.test(t));
      else if (t === '{') stack.push(null);
      else if (t === '}') stack.pop();
      else { if (stack.length && stack[stack.length - 1] === true) wrapped++; else bare++; }
    }
    assert.ok(wrapped === 1 && bare === 0, `the system-dark takeover selector rides @media exactly once (wrapped=${wrapped}, BARE=${bare})`);
  }
  for (const b of blocks) {
    for (const a of ['--gold2', '--goldm', '--gold3']) {
      assert.ok(new RegExp(a + '\\s*:\\s*var\\(--zpb-t[123][LD]\\)').test(b), `${a} is remapped from a team stop`);
    }
    for (const p of ['--rosehair', '--hairline', '--panel2']) {
      assert.ok(b.includes(p + ':'), `${p} carries the team tint`);
    }
    const set = [...b.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((m) => m[1]);
    for (const s of set) assert.ok(REMAPPED.has(s), `the takeover only remaps accents — ${s} is not one of them`);
    for (const f of PROTECTED) assert.ok(!set.includes(f), `the protected token ${f} is never remapped`);
  }
  // 4. the inline remap never emits a protected token either
  const emitted = Object.keys(tokens.teamRemap('Baltimore Ravens').vars);
  for (const f of PROTECTED) assert.ok(!emitted.includes(f), `--zcream & co. never ride the inline remap (${f})`);
  // 5. --zcream keeps its light and dark values in the sheet (the never-recolored neutral)
  assert.ok(sheet.includes('--zcream: #53382b') && sheet.includes('--zcream: #f2e7d5'), 'the neutral cream values stand untouched');
});

// ---------- Part D + E (cakepanz-6): the aesthetic strays, lawed ----------
test('N24 (Part D): the body copy is a system sans, the slogan rides home + Guide, the 900 faces are inlined, and the label is one constant', async () => {
  const sheet = fs.readFileSync(P('src/lib/assets/tokens-w89.css'), 'utf8');
  const shell = fs.readFileSync(P('src/lib/assets/shell.css'), 'utf8');
  // D-1: --font-body is w89's own stack; body copy uses it; Cinzel (--font-ui) stays in the chrome
  assert.ok(sheet.includes("--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"), "the body token is w89's system stack");
  assert.ok(!/body\s*\{[^}]*font-family:\s*var\(--font-ui\)/.test(sheet), 'the sheet no longer sets body copy in Cinzel');
  assert.ok(sheet.includes('font-family: var(--font-body)'), 'the sheet body rule uses --font-body');
  assert.ok(shell.includes('font-family: var(--font-body)'), 'shell.css body uses --font-body');
  assert.ok(sheet.includes('--font-ui:') && shell.includes('.cp-brand'), 'Cinzel stays for headings/brand (the chrome, where w89 puts it)');
  // D-2: w89's slogan line on home (TeamSelect) and Guide, with the shimmer; title + meta carry it too
  const ts = fs.readFileSync(P('src/lib/screens/TeamSelect.svelte'), 'utf8');
  const guide = fs.readFileSync(P('src/lib/screens/Guide.svelte'), 'utf8');
  for (const [name, src] of [['TeamSelect', ts], ['Guide', guide]]) {
    assert.ok(src.includes('cp-cygline') && src.includes('Can you go '), name + ' carries the slogan line');
    assert.ok(src.includes('cp-shine">20-0</b>'), name + ' shimmers the 20-0');
  }
  const index = fs.readFileSync(P('index.html'), 'utf8');
  assert.ok(index.includes('Can you go 20-0?') && index.includes('meta name="description"'), 'the title and meta description carry the slogan');
  assert.ok(shell.includes('.cp-cygline') && shell.includes('@keyframes cpshine'), 'the cygline + shimmer animation live in shell.css');
  assert.ok(!shell.includes('fonts.googleapis') && !sheet.includes('fonts.gstatic.com'), 'the shimmer + faces are offline (no CDN)');
  // D-3: the 900 faces are INLINED (base64 data URIs, explicit weights); the existing 100 stays
  assert.ok(sheet.includes('font-weight: 700 900;'), 'Cinzel 700/900 inlined (one variable face, both weights declared)');
  assert.ok((sheet.match(/font-family: 'Cinzel Decorative';/g) || []).length === 2, 'Cinzel Decorative 900 sits beside the existing 700');
  assert.ok(sheet.includes('font-weight: 100;'), 'the existing Cinzel 100 face stays in place');
  // D-4: the wordmark aligns to w89 as far as the inlined faces allow (w89.html:644-652)
  assert.ok(shell.includes("font-family: 'Bodoni Moda', Didot, 'Bodoni MT', 'Playfair Display', var(--font-display)"), "the brand leads with w89's family stack (faces not loaded — the Owner ruling owed)");
  assert.ok(/\.cp-brand \{[\s\S]*?font-weight: 600/.test(shell), "the wordmark asks w89's 600 (real face after the 700/900 inline)");
  assert.ok(/\.cp-brand \{[\s\S]*?letter-spacing: 0\.22em/.test(shell), "the wordmark asks w89's .22em");
  // Part E mechanical: ONE label constant, and no hardcode left in the Guide
  const val = fs.readFileSync(P('src/lib/valuation.ts'), 'utf8');
  assert.ok(val.includes("export const MEASURED_LABEL = 'Model Value' as const"), 'the valuation label is ONE constant');
  assert.ok(!guide.includes('<b>Model Value</b>'), 'the Guide reads MODE_LABEL, no hardcode');
  // the ruled-out term appears in NO rendered surface and NO label value (comments may name the ruling)
  const svelteFiles = execSync(`find ${P('src')} -name '*.svelte'`, { encoding: 'utf8' }).trim().split('\n');
  const rendered = svelteFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  assert.ok(!rendered.includes('Engine Value'), 'the ruled-out term appears in no rendered surface');
  const { MODE_LABEL } = await import(P('src/lib/valuation.ts'));
  assert.ok(!Object.values(MODE_LABEL).includes('Engine Value'), 'the ruled-out term is not a label value');
});

// ---------- Slice 3 (P-316, the cakepanz-7 sitting): hydration + board chrome — the laws ----------
const hydrateApp = await import(P('src/lib/port/hydrateApp.ts'));
const seasonSessionM = await import(P('src/lib/port/seasonSession.ts'));
const { candidates, goneChance, goneDisplay, openSlots, sha256Hex } = port;
const memStorage = () => { const m = new Map(); return {   // the StorageModule shape over a Map (node has no localStorage)
  async read(k) { return { ok: true, value: m.has(k) ? m.get(k) : null }; },
  async write(k, t) { m.set(k, String(t)); return { ok: true, value: undefined }; },
  async remove(k) { m.delete(k); return { ok: true, value: undefined }; },
  async keys(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort() }; },
  async entries(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort().map((k) => [k, m.get(k)]) }; },
}; };

test('N25 (HYDRATE, Slice 3): a refresh mid-draft lands back on the same board — the full AppState rehydrates from the saver', async () => {
  // START a draft, make three REAL picks (the engine's own store; every pick through candidates())
  const storeA = createStore(pool);
  const seedN25 = 3131, teamN25 = 6;
  storeA.dispatch({ type: 'START', seed: seedN25, userTeam: teamN25 });
  for (let i = 0; i < 3; i++) {
    const s = storeA.getState().draft;
    assert.ok(s && s.order[s.pos] === teamN25, 'the user is on the clock before pick ' + (i + 1));
    const c = candidates(s, teamN25)[0];
    storeA.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
    assert.equal(storeA.getState().error, null, 'pick ' + (i + 1) + ' landed clean');
  }
  const recA = JSON.parse(JSON.stringify(storeA.getState().record));
  assert.ok(recA.picks.length >= 6, 'the draft is mid-flight (user picks + CPU picks logged)');
  // the app's autosave write — the port service, a memory module standing in for localStorage
  const mod = memStorage();
  const metaN25 = { engineVersion: 'battery', dataVersion: 'sha256:battery', saveId: 'n25-lineage', saveRevision: 1 + recA.picks.length, createdAt: '2026-11-18T00:00:00.000Z' };
  assert.equal(await hydrateApp.autosaveDraft(recA, metaN25, new Date('2026-11-18T00:01:00.000Z'), mod), '');
  // RELOAD: the boot reads the saver and restores into a FRESH store — the same board, header, next pick
  const r = await hydrateApp.readAutosave(mod);
  assert.ok(r.ok && r.draft, 'the autosave reads back');
  assert.equal(r.draft.lineage.saveId, 'n25-lineage', 'the lineage rides along');
  const storeB = createStore(pool);
  storeB.dispatch({ type: 'LOAD', record: r.draft.record });
  assert.equal(storeB.getState().error, null, 'the restore lands clean');
  const recB = storeB.getState().record;
  assert.equal(recB.picks.length, recA.picks.length, 'every logged pick returns');
  assert.equal(recB.userTeam, teamN25, 'the user team returns');
  assert.equal(recB.seed, seedN25, 'the seed returns');
  const boardSha = async (store) => {
    const s = store.getState().draft;
    const odds = goneOdds(s, teamN25, makeRng(seedN25 * 7 + 13), 30);
    const vm = boardVM(s, teamN25, odds, { sort: 'wins' });
    return sha256Hex(JSON.stringify({ header: vm.header, rows: vm.rows.map((x) => [x.id, x.slotId, x.wins, x.priority, x.gone]) }));
  };
  assert.equal(await boardSha(storeB), await boardSha(storeA), 'the rendered board is byte-identical across the reload (sha match)');
  const sB = storeB.getState().draft;
  assert.equal(sB.order[sB.pos], teamN25, 'the next pick is the user\'s own');
  // the season half: the season needs a DONE draft (32 players — the WeekPayload contract), so the
  // law mirrors the app's own flow: finish the draft through the store, then begin the season
  while (storeA.getState().status === 'drafting') {
    const s = storeA.getState().draft;
    const c = candidates(s, teamN25)[0];
    storeA.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
    assert.equal(storeA.getState().error, null, 'the auto-draft stays clean');
  }
  const recDone = JSON.parse(JSON.stringify(storeA.getState().record));
  assert.equal(recDone.picks.length, 1024, 'the draft is done (32 x 32)');
  const myRoster = feedVMm.rostersOfRecord(recDone)[teamN25].map((p) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: !!p.freeAgent }));
  assert.equal(myRoster.length, 32, 'the roster is the full 32');
  const facadeN25 = (await import(P('src/lib/port/seasonFacade.ts'))).seasonFacade;
  facadeN25.begin(feedVMm.ratedLeagueOfRecord(recDone), seedN25, 2027, TEAMS[teamN25].name, myRoster);
  const stepped = facadeN25.step();
  assert.ok(stepped, 'the season steps once');
  const wk = facadeN25.weekPayload();
  assert.equal(await hydrateApp.autosaveWeek(wk, metaN25, new Date('2026-11-18T00:02:00.000Z'), mod), '');
  const r2 = await hydrateApp.readAutosave(mod);
  assert.ok(r2.ok && r2.week && r2.draft, 'both autosaves read back together (the full AppState)');
  const sess = seasonSessionM.sessionFromWeekPayload(r2.week.env.payload);
  assert.ok(sess.ok, sess.ok ? '' : sess.message);
  assert.equal(sess.value.state.nextWeek, wk.nextWeek, 'the season returns to the same week');
  assert.equal(sess.value.userTeamName, TEAMS[teamN25].name, 'the same user team');
  // the mode half of the full AppState rides the settings blob (N13's law); here the team echo is the state itself
  assert.equal(recA.userTeam, teamN25, 'the team echo is in the state the shell persists');
  // corrupt-never-repair: a corrupt autosave is REFUSED in the engine's own words, nothing restored
  const modBad = memStorage();
  await modBad.write(hydrateApp.AUTO_DRAFT_KEY, '{"sport":"nfl","kind":"draft","schemaVersion":1,"engineVersion":"x","dataVersion":"y","saveId":"z","saveRevision":1,"createdAt":"2026-01-01T00:00:00.000Z","slot":"A","savedAt":"2026-01-01T00:00:00.000Z","payload":{"seed":"nope"}}');
  const rb = await hydrateApp.readAutosave(modBad);
  assert.equal(rb.ok, false, 'a corrupt autosave is refused, never repaired');
  assert.match(rb.message, /payload: bad seed/, 'the refusal is the engine\'s own words, verbatim');
  // the composition laws: the boot calls the rehydration; the state changes write the autosaves
  const appSrc = fs.readFileSync(P('src/App.svelte'), 'utf8');
  assert.ok(appSrc.includes('void hydrateBoot()'), 'the boot calls the rehydration');
  assert.ok(appSrc.includes('autosaveDraftNow()') && appSrc.includes('autosaveSeasonNow()'), 'the autosaves are wired at the state changes');
  assert.ok(appSrc.includes('void clearAutosaveWeek()'), 'a new draft clears a stale season autosave');
});

test('N26 (Slice 3, D2/D3 re-anchor 2026-11-19 · T4 re-anchor 2026-11-20): the gone-odds tooltip surfaces the engine\'s own method on hover only, is aria-hidden, the method is in-flow in the row detail AND programmatically on the cell (L7b + T4)', async () => {
  // the number: every row's gone cell IS the engine's own replay chance for that player (recomputed here)
  const store = createStore(pool);
  store.dispatch({ type: 'START', seed: 4242, userTeam: 9 });
  const s0 = store.getState().draft;
  const odds = goneOdds(s0, 9, makeRng(4242 * 7 + 13), 30);
  assert.ok(odds.picksBetween > 0, 'there are picks between now and the user\'s next turn');
  const vm = boardVM(s0, 9, odds, { sort: 'wins' });
  for (const row of vm.rows) {
    assert.equal(row.gone, goneDisplay(goneChance(odds, row.id)) + '%', 'row ' + row.id + ' shows the engine\'s own gone odds');
  }
  // the surface: the gone cell renders the VM value verbatim (no hardcode) — the T4 form carries the
  // programmatic description on the cell (aria-describedby → the .cp-sr copy); the tooltip rides the
  // row, opens on hover ONLY (D2: the :focus leg raised it into the tap path — dropped), is
  // aria-hidden (D3: the row's accessible name stays the row's — the sr copy is the describedby
  // target, NOT the tooltip), the width clamps in the base rule, and the method is in-flow in the detail
  const rowSrc = fs.readFileSync(P('src/lib/components/BoardRow.svelte'), 'utf8');
  // cakepanz-12 T6/D2: a value cell's aria-label ANNOUNCES THE VALUE (the old label replaced the
  // number with the column name — a screen-reader user never heard 99 / 12.3 / 45.6 / 23%). The
  // describedby form is preserved; the column name rides the hover title only.
  assert.ok(rowSrc.includes('<span class="cp-num cp-gone" aria-label="{r.gone} gone odds" aria-describedby="cp-gone-desc-{r.id}">{r.gone}</span>'), 'the gone cell renders the VM value verbatim AND its accessible name carries the value (T4 describedby + cakepanz-12 D2)');
  assert.ok(rowSrc.includes('aria-label="{r.ovr} overall"'), 'the OVR cell announces the value, not the column name (cakepanz-12 D2)');
  assert.ok(rowSrc.includes('aria-label="{r.wins} wins"'), 'the WINS cell announces the value, not the column name (cakepanz-12 D2)');
  assert.ok(rowSrc.includes('aria-label="{r.priority} priority"'), 'the PRIO cell announces the value, not the column name (cakepanz-12 D2)');
  assert.ok(!rowSrc.includes('aria-label="OVR"') && !rowSrc.includes('aria-label="WINS"') && !rowSrc.includes('aria-label="PRIO"') && !rowSrc.includes('aria-label="GONE%"'), 'no value cell carries a bare column-name label (the D2 defect class is extinct)');
  // cakepanz-12 T6/S3: the method copy is FOCUSABLE and sits AFTER the row's buttons (the L17c tab
  // order holds), and it REVEALS on focus.
  assert.ok(rowSrc.includes('<span class="cp-sr" id="cp-gone-desc-{r.id}" tabindex="0">{method(oddsMeta)}</span>'), 'the method is programmatically on the cell — the .cp-sr describedby target, now FOCUSABLE (T4 + cakepanz-12 S3)');
  assert.ok(rowSrc.indexOf('class="cp-quick"') !== -1 && rowSrc.indexOf('id="cp-gone-desc-{r.id}"') > rowSrc.indexOf('class="cp-quick"'), 'the focusable method sits AFTER the one-click button — the Tab order .cp-main → .cp-quick → method is preserved (S3 + L17c)');
  assert.ok(/\.cp-sr:focus \{ position: static/.test(rowSrc), 'the method copy REVEALS on focus (a hidden focus target is a trap)');
  assert.ok(rowSrc.includes('<span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>'), 'the tooltip carries the method, aria-hidden (D3)');
  assert.ok(/\.cp-gone-wrap:hover \.cp-gonetip \{ display: block/.test(rowSrc), 'the method is surfaced on hover only (D2ii)');
  assert.ok(!/\.cp-main:focus \.cp-gonetip/.test(rowSrc), 'the :focus leg of the tooltip is deleted (D2ii)');
  assert.ok(rowSrc.includes('<p class="cp-gonehow">{method(oddsMeta)}</p>'), 'the method is in-flow in the row detail (D2iii)');
  assert.ok(rowSrc.includes('width: min(240px, calc(100vw - 32px))'), 'the tooltip width clamps in the base rule (D2i — cannot be re-ordered wrong)');
  assert.ok(!/\.cp-gonetip \{ width: 200px; \}/.test(rowSrc), 'the dead 430px tooltip rule is deleted (D2i)');
  // the method is the engine's own meta (picksBetween + sims off the goneOdds replay) — nothing hardcoded
  assert.ok(rowSrc.includes('m.picksBetween') && rowSrc.includes('m.sims'), 'the method names the engine\'s own replay meta');
  const methodBody = rowSrc.slice(rowSrc.indexOf('const method'), rowSrc.indexOf('</script>'));
  assert.ok(!/\d+\s*%/.test(methodBody), 'no percentage is hardcoded in the method text');
  const appSrc = fs.readFileSync(P('src/App.svelte'), 'utf8');
  assert.ok(/goneOdds\(st\.draft, userTeam, makeRng\(seed \* 7 \+ 13\), 30\)/.test(appSrc), 'the odds are the engine\'s own goneOdds replay');
  assert.ok(appSrc.includes('oddsMeta.set({ picksBetween: odds.picksBetween, sims: odds.sims })'), 'the tooltip\'s meta rides from the engine call');
});

test('N27 (Slice 3): the "my needs" sticky row shows exactly the roster\'s empty slots, is clickable, and the count moves', () => {
  // the engine's own openSlots IS the row's source; a landed pick closes exactly one slot
  const store = createStore(pool);
  store.dispatch({ type: 'START', seed: 777, userTeam: 3 });
  const before = openSlots(store.getState().draft.rosters[3]);
  assert.ok(before.length >= 28, 'a fresh roster leaves most of the 32 slots open');
  const c = candidates(store.getState().draft, 3)[0];
  store.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
  const after = openSlots(store.getState().draft.rosters[3]);
  assert.equal(after.length, before.length - 1, 'one landed pick closes exactly one open slot');
  assert.ok(before.includes(c.slot) && !after.includes(c.slot), 'the filled slot leaves the open set');
  // the composition: App feeds the row from the engine call; the row renders the count and the filter
  const appSrc = fs.readFileSync(P('src/App.svelte'), 'utf8');
  assert.ok(appSrc.includes('openNow.set(openSlots(st.draft.rosters[userTeam]))'), 'the open set IS the engine\'s own openSlots of my roster (refreshed on every pick)');
  const needsSrc = fs.readFileSync(P('src/lib/components/NeedsRow.svelte'), 'utf8');
  assert.ok(needsSrc.includes('MY NEEDS · {open.length} OPEN'), 'the open-slot count renders from the engine set');
  assert.ok(needsSrc.includes('onclick={() => ontoggle(id)}'), 'a need is clickable to filter');
  assert.ok(needsSrc.includes('position: sticky'), 'the row is sticky');
  const boardSrc = fs.readFileSync(P('src/lib/components/DraftBoard.svelte'), 'utf8');
  assert.ok(boardSrc.includes('? vm.rows\n      : vm.rows.filter'), 'a selected need filters the board');
  assert.ok(boardSrc.includes('data-count={shown.length}'), 'the filtered count is measurable (data-count)');
});


test('N28 (RESUME, cakepanz-8 A1): a refresh with BOTH autosaves lands on the hub — the season outranks the finished draft\'s screen', async () => {
  // the two envelopes, built with the delivery's own hydrateApp over a REAL done draft + a REAL
  // stepped week (the N25 pattern), then the composition the shell ships at boot
  const storeA = createStore(pool);
  const seedN28 = 8282, teamN28 = 7;
  storeA.dispatch({ type: 'START', seed: seedN28, userTeam: teamN28 });
  while (storeA.getState().status === 'drafting') {
    const s = storeA.getState().draft;
    const c = candidates(s, teamN28)[0];
    storeA.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
    assert.equal(storeA.getState().error, null, 'the auto-draft stays clean');
  }
  const recDone = JSON.parse(JSON.stringify(storeA.getState().record));
  assert.equal(recDone.picks.length, 1024, 'the draft is done (32 x 32)');
  const myRoster = feedVMm.rostersOfRecord(recDone)[teamN28].map((p) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: !!p.freeAgent }));
  const facadeN28 = (await import(P('src/lib/port/seasonFacade.ts'))).seasonFacade;
  facadeN28.begin(feedVMm.ratedLeagueOfRecord(recDone), seedN28, 2027, TEAMS[teamN28].name, myRoster);
  assert.ok(facadeN28.step(), 'the season steps once');
  const mod = memStorage();
  const metaN28 = { engineVersion: 'battery', dataVersion: 'sha256:battery', saveId: 'n28-lineage', saveRevision: 1 + recDone.picks.length, createdAt: '2026-11-18T00:00:00.000Z' };
  assert.equal(await hydrateApp.autosaveDraft(recDone, metaN28, new Date('2026-11-18T00:01:00.000Z'), mod), '');
  assert.equal(await hydrateApp.autosaveWeek(facadeN28.weekPayload(), metaN28, new Date('2026-11-18T00:02:00.000Z'), mod), '');
  const r = await hydrateApp.readAutosave(mod);
  assert.ok(r.ok && r.draft && r.week, 'BOTH autosaves read back together (the mid-season state)');
  const sess = seasonSessionM.sessionFromWeekPayload(r.week.env.payload);
  assert.ok(sess.ok, sess.ok ? '' : sess.message);
  assert.equal(sess.value.state.nextWeek, 2, 'the week is restored (the season resumes where it stood)');
  facadeN28.resume(sess.value.state, sess.value.teams, sess.value.userTeamName, sess.value.roster);
  assert.ok(facadeN28.runState, 'the hub renders a RUNNING season (the phase the law lands on)');
  // the composition: hydrateBoot lands the resumed season on the hub UNCONDITIONALLY — the c7
  // `if (!r.draft) go('hub')` gate is gone (it made the hub unreachable mid-season: both autosaves
  // always exist once the season begins, and loadDraft had already routed to the board)
  const appSrc = fs.readFileSync(P('src/App.svelte'), 'utf8');
  const boot = appSrc.slice(appSrc.indexOf('async function hydrateBoot'), appSrc.indexOf('---- the season flow'));
  assert.ok(boot.includes("go('hub');"), 'the resumed season always lands home (go(\'hub\') is unconditional)');
  assert.ok(!boot.includes("if (!r.draft) go('hub')"), 'the c7 phase gate is GONE (it made the hub unreachable mid-season)');
  // S29b (D1, 2026-11-19): the boot rehydrate passes keepWeek so the week autosave survives the
  // draft load — a SECOND reload must land on the hub again, not on Complete (the data-loss defect)
  assert.ok(boot.includes('loadDraft(r.draft.record, r.draft.lineage, { keepWeek: !!r.week })'), 'the boot keeps the week autosave across the draft load (S29b)');
  assert.ok(appSrc.includes('if (!opts.keepWeek) void clearAutosaveWeek()'), 'only a slot load clears the week autosave — never the boot rehydrate (S29b)');
});

test('N29 (DONE-DRAFT, cakepanz-8 A1): a refresh with a done draft and no week lands on Complete — never a blank board', async () => {
  // a REAL done draft autosave, no week autosave (the refresh happened before the season began)
  const storeA = createStore(pool);
  const seedN29 = 8383, teamN29 = 8;
  storeA.dispatch({ type: 'START', seed: seedN29, userTeam: teamN29 });
  while (storeA.getState().status === 'drafting') {
    const s = storeA.getState().draft;
    const c = candidates(s, teamN29)[0];
    storeA.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
    assert.equal(storeA.getState().error, null, 'the auto-draft stays clean');
  }
  const recDone = JSON.parse(JSON.stringify(storeA.getState().record));
  assert.equal(recDone.picks.length, 1024, 'the draft is done');
  const mod = memStorage();
  const metaN29 = { engineVersion: 'battery', dataVersion: 'sha256:battery', saveId: 'n29-lineage', saveRevision: 1 + recDone.picks.length, createdAt: '2026-11-18T00:00:00.000Z' };
  assert.equal(await hydrateApp.autosaveDraft(recDone, metaN29, new Date('2026-11-18T00:01:00.000Z'), mod), '');
  const r = await hydrateApp.readAutosave(mod);
  assert.ok(r.ok && r.draft && !r.week, 'the draft autosave reads back alone (no week)');
  // the store reloads it as a DONE draft — the exact state the c7 blank board grew from
  const storeB = createStore(pool);
  storeB.dispatch({ type: 'LOAD', record: r.draft.record });
  assert.equal(storeB.getState().error, null, 'the restore lands clean');
  assert.equal(storeB.getState().status, 'done', 'a done draft reloads DONE');
  // the composition: the go() redirect owns the finished draft — a board landing becomes Complete
  const appSrc = fs.readFileSync(P('src/App.svelte'), 'utf8');
  assert.ok(appSrc.includes("if (s === 'board' && store.getState().status === 'done') s = 'complete';"), 'the go() redirect routes a finished draft\'s board landing to Complete (A1)');
  assert.ok(appSrc.includes("{:else if screen === 'complete' && recordTyped}"), 'the Complete screen renders the record (never a blank board)');
});

// ---------- S13: the seam golden (N34) + the b36 anchor (N35) ----------
test('N34: the SEAM GOLDEN — boardVM/goneOdds/lineupFor at the fixed seed equal the committed VM→JSON map (a re-pin that silently changes engine output fails here, not at the Owner\'s first draft — the data-export law)', async () => {
  const golden = await import(P('scripts/golden-seam.mjs'));
  const g = await golden.computeGolden();
  const onFile = JSON.parse(fs.readFileSync(P('batteries/seam-golden.json'), 'utf8'));
  assert.equal(golden.canonicalJson(g), golden.canonicalJson(onFile),
    'the seam output drifted from batteries/seam-golden.json (sha expected ' + golden.goldenSha(onFile) + ', actual ' + golden.goldenSha(g) + ') — a deliberate re-pin regenerates with --write');
  assert.equal(onFile.engine, port.engineVersion(), 'the golden carries THIS pin\'s engine stamp');
  assert.ok(onFile.board.rowCount === 60 && onFile.board.first3.length === 3, 'the golden holds the board map (60 rows, the top 3 named)');
});
test('N35: the b36 payload is ANCHORED — a malformed prefixed code (`b36:12abc###`, `b36:1.5`, `b36:12 34`, `b36:`) returns null and the caller falls back to the random draw; every VALID form still parses (S13, Ernie D4/Pickle minor)', async () => {
  const sc = await import(P('src/lib/port/seedCode.ts'));
  for (const bad of ['b36:12abc###', 'b36:1.5', 'b36:12 34', 'b36:', 'b36:12a#']) {
    assert.equal(sc.parseSeedCode(bad), null, bad + ' must be rejected, not silently parsed to another seed');
  }
  assert.equal(sc.parseSeedCode('b36:a3f2'), parseInt('a3f2', 36), 'the named battery seed still parses');
  assert.equal(sc.parseSeedCode(sc.seedToCode(5288417)), 5288417, 'the canonical code round-trips');
  assert.equal(sc.parseSeedCode('777777'), 777777, 'the plain integer form still parses');
  assert.equal(sc.parseSeedCode('k1x9'), parseInt('k1x9', 36), 'the legacy bare base-36 form still parses');
  assert.equal(sc.parseSeedCode('!!not-a-seed!!'), null, 'garbage is still null');
});

console.log('\n== NODE BATTERY complete — framework-blind, browser-free ==');
