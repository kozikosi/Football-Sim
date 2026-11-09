// Q8 proof (Muse follow-up §1): the save needs only (seed, run, logs), never a serialized RNG state.
// A. a season cut at ANY boundary, saved through JSON and resumed, equals the uninterrupted run;
// B. a game's result depends only on (season seed, week, home team), not on the order games are played or listed;
// C. a draft cut at several points, saved through JSON into a NEW store, finishes exactly like the uninterrupted one.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pool } from './fixture.ts';
import { SLOT_IDS } from '../../../src/engine/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../../src/engine/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../../../src/engine/sports/nfl/engine/ratings.ts';
import { TEAMS } from '../../../src/engine/sports/nfl/engine/league.ts';
import type { LeagueTeam } from '../../../src/engine/sports/nfl/engine/season.ts';
import { makeRng } from '../../../src/engine/core/rng.ts';
import { fixtures, gameSeed, isFinished, playWeek, startSeason } from '../../../src/engine/sports/nfl/engine/seasonrun.ts';
import type { RunState } from '../../../src/engine/sports/nfl/engine/seasonrun.ts';
import { createStore } from '../../../src/engine/sports/nfl/app/store.ts';
import { selectBoard } from '../../../src/engine/sports/nfl/app/selectors.ts';

function league(seed: number): LeagueTeam[] {
  const r = makeRng(seed);
  return TEAMS.map((t) => {
    const base = 80 + 2.5 * r.normal();
    const rec = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.max(60, Math.min(99, base + 3 * r.normal()))])) as Record<SlotId, number>;
    return { name: t.name, ratings: teamRatings(spotsFromRecord(rec)) };
  });
}
const rt = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const finish = (teams: LeagueTeam[], s0: RunState): RunState => { let s = s0; while (!isFinished(s)) s = playWeek(teams, s).state; return s; };

test('A. season: save through JSON after week k (every k, regular and playoff), resume, finish: identical to the uninterrupted run', () => {
  const teams = league(7), start = startSeason(teams, { seed: 7, year: 2026 });
  const whole = JSON.stringify(finish(teams, start));
  let s = start;
  for (let k = 0; k <= 22; k++) {
    assert.equal(JSON.stringify(finish(teams, rt(s))), whole, 'cut after week ' + k);
    if (!isFinished(s)) s = playWeek(teams, s).state;
  }
});
test('B. a game depends only on (seed, week, home): shuffling the week\'s schedule rows changes neither game seeds nor results', () => {
  const teams = league(9), s0 = startSeason(teams, { seed: 9, year: 2026 });
  let s = s0; for (let i = 0; i < 4; i++) s = playWeek(teams, s).state;       // week 5 next
  const shuffled = { ...s, schedule: s.schedule.slice().reverse() };
  const a = fixtures(s), b = fixtures(shuffled);
  assert.equal(a.length, b.length);
  for (const f of a) { assert.equal(f.seed, gameSeed(s.seed, f.week, f.home)); assert.equal(b.find((x) => x.home === f.home)!.seed, f.seed); }
  const ra = playWeek(teams, s).games, rb = playWeek(teams, shuffled).games;
  for (const g of ra) assert.equal(JSON.stringify(g.result), JSON.stringify(rb.find((x) => x.home === g.home)!.result));
});
test('B2. run counter: the same frozen league with run 0 and run 1 plays a different schedule; run is stored in the state, not derived from play', () => {
  const teams = league(5), a = startSeason(teams, { seed: 5, year: 2026 }), b = startSeason(teams, { seed: 5, year: 2026, run: 1 });
  assert.notDeepEqual(a.schedule.map((g) => g.home + g.away), b.schedule.map((g) => g.home + g.away));
  assert.equal(rt(b).run, 1);
});
test('C. draft: cut at several points, save to JSON, LOAD into a fresh store, keep drafting: same final record as the uninterrupted draft', () => {
  const user = 6, seed = 21;
  const step = (st: ReturnType<typeof createStore>) => { const r = selectBoard(st.getState(), { sims: 1, limit: 1 })!.rows[0]; st.dispatch({ type: 'PICK', playerId: r.id, slot: r.slotId }); };
  const run = (cutAfter: number[]) => {
    let st = createStore(pool); st.dispatch({ type: 'START', seed, userTeam: user });
    let n = 0;
    while (st.getState().status === 'drafting') {
      step(st); n++;
      if (cutAfter.includes(n)) { const rec = rt(st.getState().record); st = createStore(pool); st.dispatch({ type: 'LOAD', record: rec }); }
    }
    assert.equal(st.getState().error, null);
    return JSON.stringify(st.getState().record!.picks);
  };
  const whole = run([]);
  assert.equal(run([1, 5, 12, 20]), whole);
});
test('C2. draft crash recovery: a log cut at ANY pick (mid-CPU-run included) is finished to the same draft, because each CPU pick has its own stream', () => {
  const user = 6, seed = 21;
  const step = (st: ReturnType<typeof createStore>) => { const r = selectBoard(st.getState(), { sims: 1, limit: 1 })!.rows[0]; st.dispatch({ type: 'PICK', playerId: r.id, slot: r.slotId }); };
  const finishFrom = (st: ReturnType<typeof createStore>) => { while (st.getState().status === 'drafting') step(st); assert.equal(st.getState().error, null); return JSON.stringify(st.getState().record!.picks); };
  const base = createStore(pool); base.dispatch({ type: 'START', seed, userTeam: user });
  const whole = finishFrom(base);
  const full = rt(base.getState().record!);
  for (const len of [40, 101, 333, 600]) {
    const st = createStore(pool); st.dispatch({ type: 'LOAD', record: { ...rt(full), picks: full.picks.slice(0, len) } });
    assert.equal(finishFrom(st), whole, 'log cut at pick ' + len);
  }
});
