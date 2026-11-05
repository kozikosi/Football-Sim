import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEAMS, TEAM_BY_NAME, DIVS, divisionTeams } from '../src/engine/league.ts';
import { buildSchedule, pairings } from '../src/engine/schedule.ts';
import { makeRng } from '../src/engine/rng.ts';

const randomRank = (seed: number) => {
  const rng = makeRng(seed), rank: Record<string, number> = {};
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) { const ts = divisionTeams(c, d); for (let i = ts.length - 1; i > 0; i--) { const j = rng.int(0, i); [ts[i], ts[j]] = [ts[j], ts[i]]; } ts.forEach((n, i) => (rank[n] = i + 1)); }
  return rank;
};
const key = (a: string, b: string) => [a, b].sort().join('|');

test('league: 32 teams, 8 divisions of 4', () => {
  assert.equal(TEAMS.length, 32);
  assert.equal(new Set(TEAMS.map((t) => t.name)).size, 32);
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) assert.equal(divisionTeams(c, d).length, 4);
});

test('schedule formula: 17 games a team, 272 games, the 6/4/4/2/1 structure, 8 or 9 home games, extra home game by year', () => {
  for (let y = 2026; y < 2038; y++) {
    const rank = randomRank(y), games = pairings(y, rank);
    assert.equal(games.length, 272);
    for (const tm of TEAMS) {
      const mine = games.filter((g) => g.home === tm.name || g.away === tm.name);
      assert.equal(mine.length, 17, `${tm.name} ${y}`);
      const kinds = (k: string) => mine.filter((g) => g.kind === k);
      assert.equal(kinds('div').length, 6); assert.equal(kinds('conf4').length, 4); assert.equal(kinds('inter4').length, 4); assert.equal(kinds('conf2').length, 2); assert.equal(kinds('inter1').length, 1);
      const opp = (g: { home: string; away: string }) => (g.home === tm.name ? g.away : g.home);
      // division: each rival home and away
      for (const rv of divisionTeams(tm.conf, tm.div).filter((n) => n !== tm.name)) { const v = kinds('div').filter((g) => opp(g) === rv); assert.equal(v.length, 2); assert.equal(v.filter((g) => g.home === tm.name).length, 1); }
      // conf4: one whole division of the same conference, 2 home 2 away
      const c4 = kinds('conf4').map(opp); const d4 = new Set(c4.map((n) => TEAM_BY_NAME[n].div)); assert.equal(d4.size, 1); assert.notEqual([...d4][0], tm.div); assert.ok(c4.every((n) => TEAM_BY_NAME[n].conf === tm.conf));
      assert.equal(kinds('conf4').filter((g) => g.home === tm.name).length, 2);
      // inter4: one whole division of the other conference, 2 home 2 away
      const i4 = kinds('inter4').map(opp); assert.equal(new Set(i4.map((n) => TEAM_BY_NAME[n].div)).size, 1); assert.ok(i4.every((n) => TEAM_BY_NAME[n].conf !== tm.conf));
      assert.equal(kinds('inter4').filter((g) => g.home === tm.name).length, 2);
      // conf2: the same-place team of the two remaining divisions of the conference; one home one away
      const c2 = kinds('conf2').map(opp); assert.ok(c2.every((n) => rank[n] === rank[tm.name] && TEAM_BY_NAME[n].conf === tm.conf && TEAM_BY_NAME[n].div !== tm.div && !d4.has(TEAM_BY_NAME[n].div)));
      assert.equal(new Set(c2.map((n) => TEAM_BY_NAME[n].div)).size, 2); assert.equal(kinds('conf2').filter((g) => g.home === tm.name).length, 1);
      // inter1: same-place team of a division of the other conference not already played
      const o = opp(kinds('inter1')[0]); assert.equal(rank[o], rank[tm.name]); assert.ok(TEAM_BY_NAME[o].conf !== tm.conf && !new Set(i4.map((n) => TEAM_BY_NAME[n].div)).has(TEAM_BY_NAME[o].div));
      const home = mine.filter((g) => g.home === tm.name).length;
      assert.equal(home, (y % 2 === 0 ? tm.conf === 'NFC' : tm.conf === 'AFC') ? 9 : 8, `home games ${tm.name} ${y}`);
    }
  }
  // every real opponent pair appears the right number of times: never more than twice, twice only inside a division
  const games = pairings(2026, randomRank(1)); const cnt = new Map<string, number>();
  for (const g of games) cnt.set(key(g.home, g.away), (cnt.get(key(g.home, g.away)) ?? 0) + 1);
  for (const [k, n] of cnt) { const [a, b] = k.split('|'); assert.equal(n, TEAM_BY_NAME[a].conf === TEAM_BY_NAME[b].conf && TEAM_BY_NAME[a].div === TEAM_BY_NAME[b].div ? 2 : 1, k); }
});

test('weeks: 18 weeks, one bye each in weeks 5-14, nobody plays twice in a week, week 18 is all division games', () => {
  for (const y of [2026, 2027, 2028, 2031]) {
    const rank = randomRank(y + 100), games = buildSchedule(makeRng(y), y, rank);
    assert.equal(games.length, 272);
    const seen = new Set<string>();
    for (const g of games) { assert.ok(g.week >= 1 && g.week <= 18); for (const t of [g.home, g.away]) { assert.ok(!seen.has(t + '@' + g.week), `${t} twice in week ${g.week}`); seen.add(t + '@' + g.week); } }
    for (const tm of TEAMS) {
      const wks = new Set(games.filter((g) => g.home === tm.name || g.away === tm.name).map((g) => g.week));
      const bye = [...Array(18).keys()].map((i) => i + 1).filter((w) => !wks.has(w)); assert.equal(bye.length, 1); assert.ok(bye[0] >= 5 && bye[0] <= 14, `bye week ${bye[0]}`);
    }
    const last = games.filter((g) => g.week === 18); assert.equal(last.length, 16); assert.ok(last.every((g) => g.kind === 'div'));
    // the same games as the formula, only with weeks added
    const a = pairings(y, rank).map((g) => `${g.home}>${g.away}`).sort(), b = games.map((g) => `${g.home}>${g.away}`).sort(); assert.deepEqual(a, b);
  }
});
test('schedule is repeatable for a seed and different for another', () => {
  const rank = randomRank(3);
  assert.deepEqual(buildSchedule(makeRng(9), 2026, rank), buildSchedule(makeRng(9), 2026, rank));
  assert.notDeepEqual(buildSchedule(makeRng(9), 2026, rank).map((g) => g.week), buildSchedule(makeRng(10), 2026, rank).map((g) => g.week));
});
test('ranks must be 1-4 once per division', () => { const r = randomRank(1); r['Buffalo Bills'] = 4; r['Miami Dolphins'] = 4; assert.throws(() => pairings(2026, r)); });

test('same-conference division pairings rotate on a three-year cycle: three different opponents, then the first again', () => {
  const rank = randomRank(9), opp = (y: number) => { const s = new Set<string>(); for (const g of pairings(y, rank)) if (g.kind === 'conf4' && TEAM_BY_NAME[g.home].div === 'East' && TEAM_BY_NAME[g.home].conf === 'AFC') s.add(TEAM_BY_NAME[g.away].div); else if (g.kind === 'conf4' && TEAM_BY_NAME[g.away].div === 'East' && TEAM_BY_NAME[g.away].conf === 'AFC') s.add(TEAM_BY_NAME[g.home].div); return [...s].join(); };
  const a = opp(2026), b = opp(2027), c = opp(2028);
  assert.equal(new Set([a, b, c]).size, 3, [a, b, c].join(' / ')); assert.equal(opp(2029), a); assert.equal(opp(2030), b);
});
