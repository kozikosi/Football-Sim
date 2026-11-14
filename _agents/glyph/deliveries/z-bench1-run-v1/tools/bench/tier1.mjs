// BENCH-1 Tier 1 — headless, framework-free, plain Node, zero dependencies.
// Reference design: claude/notes/2026-11-14-benchmark-spec-BENCH-1.md (origin/architect/engine-and-seats @ d3bd81d2).
// Vendor: bench/colors/ — verbatim copy of colors/src + data from the same commit (sha256 manifest recorded).
// Every gate is run-against-run (no committed pin). Every number labelled in the results file.
// Usage: node tools/bench/tier1.mjs <runLabel> <outDir>
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

const RUN_LABEL = process.argv[2] ?? 'run1';
const OUT_DIR = process.argv[3] ?? '../../receipts';
const ENGINE_ROOT = path.resolve(import.meta.dirname, '../../colors');
const DATA_ROOT = path.resolve(import.meta.dirname, '../../data');

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const hr = () => process.hrtime.bigint();
const ms = (t0) => Number(hr() - t0) / 1e6;
const now = () => new Date().toISOString();

// ---- engine imports (native .ts type-stripping, Node >= 24) ----
const E = (p) => path.join(ENGINE_ROOT, 'src', p);
const { buildPool } = await import(E('sports/nfl/engine/players.ts'));
const { makeRng } = await import(E('core/rng.ts'));
const { at } = await import(E('core/at.ts'));
const { datasetHash, canonicalRowsText } = await import(E('core/hash.ts'));
const { DEFAULT_CONFIG, newDraft, runDraft, snakeOrder, cpuChoose, userChoose, applyPick, roundOf, openSlots } = await import(E('sports/nfl/engine/draft.ts'));
const { createStore, freezePool, restoreDraft } = await import(E('sports/nfl/app/store.ts'));
const { selectBoard, selectRoster } = await import(E('sports/nfl/app/selectors.ts'));
const { startSeason, fixtures, playWeek, table, gameSeed, isFinished } = await import(E('sports/nfl/engine/seasonrun.ts'));
const { teamRatings, spotsOf, leagueBaseline, spotsFromRecord } = await import(E('sports/nfl/engine/ratings.ts'));
const { lineupFor } = await import(E('sports/nfl/engine/lineup.ts'));
const { returnerRating } = await import(E('sports/nfl/engine/returner.ts'));
const { netPts } = await import(E('sports/nfl/engine/value.ts'));
const { TEAMS } = await import(E('sports/nfl/engine/league.ts'));
const { matchupModel } = await import(E('sports/nfl/engine/matchup.ts'));
const { teamIdentity } = await import(E('sports/nfl/engine/plans.ts'));
const { simulateGame } = await import(E('sports/nfl/engine/drives.ts'));

// ---------- workload implementations ----------

function buildLeagueTeams(pool, seed) {
  const rng = makeRng(seed);
  const st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
  runDraft(st, rng.fork('run'));
  const raw = st.rosters.map((r) => Object.values(r)).map((pl) => (['4-3', '3-4']).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
  const lg0 = leagueBaseline(raw.map((b) => b[0].R));
  const teams = raw.map((b, i) => { const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1]; return { name: TEAMS[i].name, ratings: best.R }; });
  return { teams, lg: leagueBaseline(teams.map((t) => t.ratings)), draftLog: st.log };
}

// Draft mirror of runDraft with per-pick timing; fork structure must equal runDraft (verified by log identity gate).
function timedDraft(pool, seed, rounds, user) {
  const order = snakeOrder(32, rounds);
  const rng = makeRng(seed);
  const st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG, order);
  const rr = rng.fork('run');                       // runDraft forks 'run' first — the mirror must match that stream exactly
  const r = rr.fork('picks'), ru = rr.fork('user');
  const curve = [];
  const t0 = hr();
  while (st.pos < st.order.length) {
    const team = at(st.order, st.pos);
    const p0 = hr();
    const c = user && user.team === team ? userChoose(st, team, ru, user.policy) : cpuChoose(st, team, r);
    const tChoose = ms(p0);
    const p1 = hr();
    applyPick(st, team, c.player, c.slot);
    curve.push({ overall: st.pos, team, pid: c.player.id, slot: c.slot, msChoose: tChoose, msApply: ms(p1) });
  }
  return { st, curve, fullMs: ms(t0) };
}

function draftStateSummary(st, includeOrder = true) {
  const rosters = st.rosters.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v.id])));
  return JSON.stringify(includeOrder ? { pos: st.pos, order: st.order, rosters, log: st.log.map((k) => [k.overall, k.team, k.player.id, k.slot]) } : { pos: st.pos, rosters, log: st.log.map((k) => [k.overall, k.team, k.player.id, k.slot]) });
}

function advanceUntilUser(st, seed, userTeam) {
  const cpu = makeRng(seed).fork('cpu');
  while (st.pos < st.order.length) {
    const team = st.order[st.pos];
    if (team === undefined || team === userTeam) break;
    const c = cpuChoose(st, team, cpu.fork('p' + st.pos));
    applyPick(st, team, c.player, c.slot);
  }
}

const vmText = (vm) => JSON.stringify(vm);

async function main() {
  const results = { label: RUN_LABEL, startedAt: now(), gates: [], budgets: [], timings: {}, hashes: {}, notes: [], errors: [] };
  const gate = (name, pass, detail) => { results.gates.push({ name, pass, detail }); if (!pass) results.errors.push('GATE FAIL ' + name + ': ' + detail); };

  // ----- W1 pool -----
  const ratingsCsv = fs.readFileSync(path.join(DATA_ROOT, 'nfl/madden27-ratings.csv'), 'utf8');
  const faCsv = fs.readFileSync(path.join(DATA_ROOT, 'nfl/free-agents-old-ratings.csv'), 'utf8');
  const idsCsv = fs.readFileSync(path.join(DATA_ROOT, 'nfl/player-ids.csv'), 'utf8');

  const w1 = {};
  const t0 = hr();
  const pool = buildPool(ratingsCsv, faCsv, idsCsv);
  w1.parseMs = ms(t0);
  const t1 = hr();
  const poolRows = freezePool(pool);
  w1.freezeMs = ms(t1);
  w1.poolCount = pool.length;
  w1.poolRowCount = poolRows.length;
  const ids = new Set(pool.map((p) => p.id));
  gate('W1-duplicate-ids', ids.size === pool.length, `pool ${pool.length} ids unique ${ids.size}`);
  const h1 = await datasetHash(poolRows);
  const h1b = await datasetHash(poolRows); // same run twice
  gate('W1-datasetHash-identity-inrun', h1 === h1b, h1.slice(0, 24));
  w1.datasetHash = h1;
  w1.rowsTextSha = sha(canonicalRowsText(poolRows));
  results.timings.W1 = w1;
  results.hashes.datasetHash = h1;

  const mem = () => { const m = process.memoryUsage(); return { heapUsedMB: +(m.heapUsed / 1048576).toFixed(1), rssMB: +(m.rss / 1048576).toFixed(1) }; };
  results.timings.heapAfterW1 = mem();

  // ----- W3 drafts: D-5R and D-32R, seeds 1-5, user greedy on team 0 and 31 -----
  for (const rounds of [5, 32]) {
    for (const seed of [1, 2, 3, 4, 5]) {
      for (const userTeam of [0, 31]) {
        const tag = `D${rounds}R-s${seed}-u${userTeam}`;
        const a = timedDraft(pool, seed, rounds, { team: userTeam, policy: 'greedy' });
        // cross-check: plain runDraft over the same seed must give the identical pick sequence
        const order = snakeOrder(32, rounds);
        const rng2 = makeRng(seed);
        const st2 = newDraft(pool, rng2.fork('draft'), DEFAULT_CONFIG, order);
        runDraft(st2, rng2.fork('run'), { team: userTeam, policy: 'greedy' });
        const logA = JSON.stringify(a.st.log.map((k) => [k.overall, k.team, k.player.id, k.slot]));
        const logB = JSON.stringify(st2.log.map((k) => [k.overall, k.team, k.player.id, k.slot]));
        gate(`W3-loop-equals-runDraft ${tag}`, logA === logB, logA === logB ? 'identical' : 'DIVERGED');
        // roster fill gate
        let filled = 0, dupOk = true; const seen = new Set();
        for (const r of a.st.rosters) for (const p of Object.values(r)) { filled++; if (seen.has(p.id)) dupOk = false; seen.add(p.id); }
        const totalSlots = rounds * 32;
        gate(`W3-rosters-fill ${tag}`, filled === totalSlots && dupOk, `${filled}/${totalSlots} dupOk=${dupOk}`);
        // record bytes + hash
        const rec = { seed, userTeam, pool: poolRows, picks: a.st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) };
        const recText = JSON.stringify(rec);
        const recSha = sha(recText);
        // replay gate: restoreDraft -> byte-identical summary (order array excluded for D-5R: the record format
        // carries no round count, restoreDraft always rebuilds the 32-round default order — REPORTED, store design)
        const rt0 = hr();
        const restored = restoreDraft(JSON.parse(recText));
        const restoreMs = ms(rt0);
        const incOrder = rounds === 32;
        const sumA = draftStateSummary(a.st, incOrder), sumB = draftStateSummary(restored, incOrder);
        gate(`W3-replay-identity ${tag}`, sumA === sumB && restored.pos === totalSlots, sumA === sumB ? 'byte-identical' : 'DIVERGED');
        const fitLegal = a.st.log.every((k) => k.slot && k.player);
        gate(`W3-log-shape ${tag}`, fitLegal && a.st.log.length === totalSlots, `picks=${a.st.log.length}`);
        results.timings[tag] = {
          rounds, seed, userTeam,
          fullDraftMs: +a.fullMs.toFixed(2),
          meanPickMs: +(a.fullMs / totalSlots).toFixed(3),
          p95PickMs: +quantile(a.curve.map((c) => c.msChoose + c.msApply), 0.95).toFixed(3),
          userPickMeanMs: +mean(a.curve.filter((c) => c.team === userTeam).map((c) => c.msChoose + c.msApply)).toFixed(3),
          restoreMs: +restoreMs.toFixed(2),
          recordBytes: recText.length,
          recordSha256: recSha,
          pickCurveSha256: sha(JSON.stringify(a.curve.map((c) => [c.overall, c.pid, c.slot]))),
          summarySha256: sha(sumA),
        };
        results.hashes[tag] = { record: recSha, summary: sha(sumA) };
      }
    }
  }
  results.timings.heapAfterW3 = mem();

  // ----- W4 season: league built from a full CPU draft (fixture.ts pattern), seed 1, step 22 weeks -----
  const lg0 = hr();
  const { teams } = buildLeagueTeams(pool, 777);
  results.timings.W4_leagueBuildMs = +ms(lg0).toFixed(1);
  const lg = leagueBaseline(teams.map((t) => t.ratings));
  const byName = new Map(teams.map((t) => [t.name, t.ratings]));
  const plans = new Map(teams.map((t) => { const id = teamIdentity(t.ratings, lg); return [t.name, { off: id.off, def: id.def }]; }));
  const mkMatchups = (home, away) => {
    const ph = plans.get(home), pa = plans.get(away);
    return [matchupModel(byName.get(home), byName.get(away), lg, { off: ph.off, def: pa.def }), matchupModel(byName.get(away), byName.get(home), lg, { off: pa.off, def: ph.def })];
  };
  let s = startSeason(teams, { seed: 1, year: 2026 });
  const weekMs = [];
  const seasonT0 = hr();
  while (!isFinished(s)) { const wt0 = hr(); s = playWeek(teams, s).state; weekMs.push(ms(wt0)); }
  const seasonMs = ms(seasonT0);
  // Full regeneration sweep: EVERY game re-simulated from gameSeed (byte-identity, per-game timing).
  let s2 = startSeason(teams, { seed: 1, year: 2026 });
  const regen = [];
  let regenOk = true, regularGames = 0, playoffGames = 0;
  while (!isFinished(s2)) {
    const fx = fixtures(s2);
    const r = playWeek(teams, s2);
    for (const g of r.games) {
      const f = fx.find((x) => x.home === g.home);
      const g0 = hr();
      const [mh, ma] = mkMatchups(g.home, g.away);
      // playWeek's exact opts: the Super Bowl is a neutral-site game — fixtures() sets homeField: 0 (REPORTED: found
      // by divergence: 284/285 games byte-identical without it; the SB alone shifted by home field)
      const res = simulateGame(mh, ma, makeRng(f.seed), { playoff: f.round !== null, ...(f.homeField !== undefined ? { homeField: f.homeField } : {}) });
      const gms = ms(g0);
      if (JSON.stringify(res) !== JSON.stringify(g.result)) regenOk = false;
      regen.push({ week: f.week, round: f.round, home: f.home, away: g.away, hs: res.homeScore, as: res.awayScore, simMs: +gms.toFixed(3) });
      if (f.round === null) regularGames++; else playoffGames++;
    }
    s2 = r.state;
  }
  gate('W4-gameSeed-regeneration', regenOk, `all ${regen.length} games byte-identical from gameSeed`);
  // gates
  const tbl = table(s);
  const teamNames = TEAMS.map((t) => t.name);
  let g17 = true, wlt = true;
  const playedCount = {};
  for (const p of s.scores) { playedCount[p.home] = (playedCount[p.home] ?? 0) + 1; playedCount[p.away] = (playedCount[p.away] ?? 0) + 1; }
  for (const n of teamNames) if ((playedCount[n] ?? 0) !== 17) g17 = false;
  for (const n of teamNames) { const r = tbl[n]; if (r.w + r.l + r.t !== 17) wlt = false; }
  gate('W4-17-games-per-team', g17, 'every team 17 regular games');
  gate('W4-WLT-sums', wlt, 'W+L+T=17 per team');
  let pf = 0, pa = 0;
  for (const n of teamNames) { pf += tbl[n].pf; pa += tbl[n].pa; }
  gate('W4-points-balance', pf === pa, `pf=${pf} pa=${pa}`);
  gate('W4-regular-272', regularGames === 272, `regular=${regularGames}`);
  results.notes.push(`W4 playoff count asserted from fixtures() this run: ${playoffGames} (BENCH-1 INFERRED 13 — measured: ${playoffGames})`);
  const stateText = JSON.stringify({ scores: s.scores, playoffs: s.playoffs, nextWeek: s.nextWeek, champion: s.champion });
  gate('W4-results-not-in-state', !stateText.includes('"drives"') && !stateText.includes('"events"'), 'no GameResult objects retained');
  results.timings.W4 = {
    seasonMs: +seasonMs.toFixed(1),
    meanWeekMs: +mean(weekMs).toFixed(2),
    p95GameMs: +quantile(regen.map((g) => g.simMs), 0.95).toFixed(3),
    meanGameMs: +mean(regen.map((g) => g.simMs)).toFixed(3),
    regularGames, playoffGames,
    tableSha256: sha(JSON.stringify(tbl)),
    summarySha256: sha(JSON.stringify({ scores: s.scores, playoffs: s.playoffs, champion: s.champion })),
    champion: s.champion,
  };
  results.hashes.season = results.timings.W4.summarySha256;
  results.timings.heapAfterW4 = mem();

  // ----- W5 board VM: store-flow states at rounds 1, 5, 16, 32; sorts + UI-local filter + PICK/UNDO round trip -----
  const walkTo = (targetRound, seed, userTeam, rows) => {
    let st = restoreDraft({ seed, userTeam, picks: [], pool: rows });
    advanceUntilUser(st, seed, userTeam);
    while (st.pos < st.order.length && roundOf(st) < targetRound) {
      if (st.order[st.pos] !== userTeam) break;
      const c = userChoose(st, userTeam, makeRng(seed).fork('walk' + st.pos), 'greedy');
      applyPick(st, userTeam, c.player, c.slot);
      advanceUntilUser(st, seed, userTeam);
    }
    return st;
  };
  for (const userTeam of [0, 31]) {
    for (const targetRound of [1, 5, 16, 32]) {
      const tag = `W5-r${targetRound}-u${userTeam}`;
      const rows = freezePool(pool);
      const st = walkTo(targetRound, 1, userTeam, rows);
      const onClock = st.pos < st.order.length && st.order[st.pos] === userTeam;
      gate(`W5-on-clock ${tag}`, onClock, onClock ? `round ${roundOf(st)} pos ${st.pos}` : 'walk failed');
      if (!onClock) continue;
      const recordOf = (stx) => ({ seed: 1, userTeam, pool: rows, picks: stx.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) });
      const cells = { round: roundOf(st), pos: st.pos };
      for (const sort of ['wins', 'ovr', 'priority']) {
        const t = hr();
        const vm = selectBoard({ record: recordOf(st), draft: st, status: 'drafting', error: null }, { sort, limit: 60 });
        cells[`sort-${sort}-60rows-ms`] = +ms(t).toFixed(3);
        if (!vm) { results.errors.push(`W5 no VM at ${tag} sort ${sort}`); continue; }
        cells[`sort-${sort}-rows`] = vm.rows.length;
        if (sort === 'wins') cells.vmTextSha256 = sha(vmText(vm));
      }
      const vm60 = selectBoard({ record: recordOf(st), draft: st, status: 'drafting', error: null }, { sort: 'wins', limit: 60 });
      const tF = hr();
      const filtered = vm60.rows.filter((r) => r.pos === vm60.rows[0].pos);
      cells['filter-pos-60rows-ms'] = +ms(tF).toFixed(3);
      cells['filter-pos-rows'] = filtered.length;
      const vm1000 = selectBoard({ record: recordOf(st), draft: st, status: 'drafting', error: null }, { sort: 'wins', limit: 1000 });
      const tF2 = hr();
      const filtered2 = vm1000.rows.filter((r) => r.pos === 'WR');
      cells['filter-pos-1000rows-ms'] = +ms(tF2).toFixed(3);
      cells['filter-1000rows-rows'] = vm1000.rows.length;
      const tR = hr();
      const roster = selectRoster({ record: recordOf(st), draft: st, status: 'drafting', error: null });
      cells['selectRoster-ms'] = +ms(tR).toFixed(3);
      cells['roster-filled'] = roster.filled.length;
      // PICK -> UNDO round trip byte identity (mirrors store dispatch: restore, pick, advance, settle; cut, restore, settle)
      const vmA = selectBoard({ record: recordOf(st), draft: st, status: 'drafting', error: null }, { sort: 'wins', limit: 60 });
      const top = vmA.rows[0];
      const p0 = hr();
      const stAfter = restoreDraft(recordOf(st));
      applyPick(stAfter, userTeam, stAfter.pool.find((p) => p.id === top.id), top.slotId);
      advanceUntilUser(stAfter, 1, userTeam);
      const recAfter = recordOf(stAfter);
      const pickMs = ms(p0);
      const p1 = hr();
      const recCut = { ...recAfter, picks: recAfter.picks.slice(0, recAfter.picks.map((k) => k.team).lastIndexOf(userTeam)) };
      const stUndo = restoreDraft(recCut);
      advanceUntilUser(stUndo, 1, userTeam);
      const undoMs = ms(p1);
      const vmUndo = selectBoard({ record: recordOf(stUndo), draft: stUndo, status: 'drafting', error: null }, { sort: 'wins', limit: 60 });
      gate(`W5-PICK-UNDO-identity ${tag}`, vmText(vmA) === vmText(vmUndo), vmText(vmA) === vmText(vmUndo) ? 'VM byte-identical' : 'DIVERGED');
      cells['pickMs-restore-apply-advance'] = +pickMs.toFixed(3);
      cells['undoMs-cut-restore-advance'] = +undoMs.toFixed(3);
      results.timings[tag] = cells;
    }
  }
  results.timings.heapAfterW5 = mem();

  // ----- synthetic sweep P-SYN for the board scaling sweep (generator: seeded, recorded not gated) -----
  // BENCH-1 §2: synthetic pools feed the board scaling sweep only — so this is a 16-round (512-pick) partial draft,
  // identical across sizes: a full 32x32 draft needs 1,024 picks and a 1,000-row pool cannot supply one (not a defect).
  for (const n of [1000, 1941, 5000]) {
    const [synthRatings, synthIds] = synthCsv(n).split('\n###SYNTH-IDS###\n');
    const p = buildPool(synthRatings, 'name,pos,team,ovr,spd,str', synthIds);   // header-only FA csv: parseCsv needs a header line
    const pr = freezePool(p);
    const order = snakeOrder(32, 16);
    const rng = makeRng(9);
    const st = newDraft(p, rng.fork('draft'), DEFAULT_CONFIG, order);
    const r = rng.fork('picks'), ru = rng.fork('user');
    const dt = hr();
    let picks = 0;
    const target = Math.min(16 * 32, order.length);
    while (st.pos < target && st.pos < st.order.length) {
      const team = at(st.order, st.pos);
      const c = team === 0 ? userChoose(st, team, ru, 'greedy') : cpuChoose(st, team, r);
      applyPick(st, team, c.player, c.slot);
      picks++;
    }
    const draftMs = ms(dt);
    const rec = { seed: 9, userTeam: 0, pool: pr, picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) };
    const state = { record: rec, draft: restoreDraft(rec), status: 'drafting', error: null };
    const sbt = hr();
    const vm = selectBoard(state, { sort: 'wins', limit: n });
    const sbMs = ms(sbt);
    const tF3 = hr();
    const f3 = vm.rows.filter((r2) => r2.pos === 'WR');
    results.timings[`PSYN-${n}`] = { draft512Ms: +draftMs.toFixed(1), picks, poolRows: pr.length, selectBoardMs: +sbMs.toFixed(3), vmRows: vm.rows.length, filterMs: +ms(tF3).toFixed(3), filteredRows: f3.length, synthSha256: sha(synthRatings) };
  }

  // ----- env fingerprint + hashes of vendored engine -----
  results.env = {
    node: process.version,
    v8: process.versions.v8,
    platform: `${os.platform()} ${os.release()} ${os.arch()}`,
    cpuModel: os.cpus()[0]?.model ?? 'unknown',
    cores: os.cpus().length,
    memTotalMB: Math.round(os.totalmem() / 1048576),
    finishedAt: now(),
  };
  results.engineVendorSha = vendorSha(ENGINE_ROOT);
  results.finishedAt = now();
  results.ok = results.errors.length === 0;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `tier1-${RUN_LABEL}.json`);
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  const logLines = [];
  logLines.push(`TIER1 ${RUN_LABEL} ok=${results.ok} gates=${results.gates.filter((g) => g.pass).length}/${results.gates.length} errors=${results.errors.length}`);
  for (const g of results.gates) logLines.push(`GATE ${g.pass ? 'PASS' : 'FAIL'} ${g.name} :: ${g.detail}`);
  for (const e of results.errors) logLines.push('ERROR ' + e);
  fs.writeFileSync(path.join(OUT_DIR, `tier1-${RUN_LABEL}.log`), logLines.join('\n') + '\n');
  console.log(logLines.join('\n'));
}

// ---------- utils ----------
function mean(xs) { return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0; }
function quantile(sortedDesc, q) { const xs = [...sortedDesc].sort((a, b) => a - b); if (!xs.length) return 0; const i = Math.min(xs.length - 1, Math.floor(q * xs.length)); return xs[i]; }
function vendorSha(root) {
  const files = [];
  (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else files.push(p); } })(root);
  files.sort();
  const h = crypto.createHash('sha256');
  for (const f of files) { h.update(path.relative(root, f)); h.update(fs.readFileSync(f)); }
  return { digest: h.digest('hex'), files: files.length };
}
function synthCsv(n) {
  // P-SYN seeded generator: same 8-column shape the engine consumes. Deterministic under makeRng(4242).
  // CSV position tokens only (players.ts ROLE map): QB HB FB WR TE LT RT LG RG C DT LEDG REDG MIKE WILL SAM CB SS FS K P LS
  const POS = [['QB', 3], ['HB', 6], ['FB', 2], ['WR', 10], ['TE', 4], ['LT', 3], ['RT', 3], ['LG', 3], ['RG', 3], ['C', 2], ['DT', 5], ['LEDG', 3], ['REDG', 3], ['MIKE', 4], ['WILL', 3], ['SAM', 3], ['CB', 8], ['SS', 3], ['FS', 3], ['K', 1], ['P', 1], ['LS', 1]];
  const TOTAL = POS.reduce((a, b) => a + b[1], 0);
  const teamNames = TEAMS.map((t) => t.name);
  const rng = makeRng(4242);
  const ratings = ['name,pos,team,ovr,spd,str'], ids = ['pid,name,pos,team'];
  for (let i = 0; i < n; i++) {
    let x = rng.next() * TOTAL, pos = POS[0][0];
    for (const [p, w] of POS) { if (x < w) { pos = p; break; } x -= w; }
    const ovr = Math.max(60, Math.min(99, Math.round(72 + 14 * rng.normal())));
    const spd = Math.max(40, Math.min(99, Math.round(ovr + 8 * rng.normal())));
    const str = Math.max(40, Math.min(99, Math.round(ovr + 6 * rng.normal())));
    const name = `Synth ${String(i).padStart(5, '0')}`;
    const team = teamNames[i % 32];
    ratings.push(`${name},${pos},${team},${ovr},${spd},${str}`);
    ids.push(`nfl-p9${String(i).padStart(5, '0')},${name},${pos},${team}`);
  }
  return ratings.join('\n') + '\n' + '###SYNTH-IDS###' + '\n' + ids.join('\n');
}

main().catch((e) => { console.error('TIER1 FATAL', e); process.exit(1); });
