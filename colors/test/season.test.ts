import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../src/engine/slots.ts';
import type { SlotId } from '../src/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../src/engine/ratings.ts';
import { TEAMS, TEAM_BY_NAME } from '../src/engine/league.ts';
import { simulateSeason, initialRanks } from '../src/engine/season.ts';
import type { LeagueTeam, SeasonResult } from '../src/engine/season.ts';
import { makeRng } from '../src/engine/rng.ts';

// a league whose team strength varies the way the real one does (a few points of OVR across the lineup)
function league(seed: number, sd = 2.5): LeagueTeam[] {
  const r = makeRng(seed);
  return TEAMS.map((t) => {
    const base = 80 + sd * r.normal();
    const rec = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.max(60, Math.min(99, base + 3 * r.normal()))])) as Record<SlotId, number>;
    return { name: t.name, ratings: teamRatings(spotsFromRecord(rec)) };
  });
}
const strengthOf = (t: LeagueTeam) => t.ratings.off + t.ratings.def;
const corr = (xs: number[], ys: number[]) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; } return sxy / Math.sqrt(sxx * syy); };

function check(s: SeasonResult) {
  assert.equal(s.games.length, 272);
  let w = 0, l = 0, t = 0, pf = 0, pa = 0;
  for (const tm of TEAMS) { const r = s.table[tm.name]; assert.equal(r.w + r.l + r.t, 17); w += r.w; l += r.l; t += r.t; pf += r.pf; pa += r.pa; }
  assert.equal(w, l); assert.equal(t % 2, 0); assert.equal(pf, pa);
  // the table is the games: recount from the logs
  const recount = new Map<string, number>();
  for (const g of s.games) { if (g.result.homeScore > g.result.awayScore) recount.set(g.home, (recount.get(g.home) ?? 0) + 1); else if (g.result.homeScore < g.result.awayScore) recount.set(g.away, (recount.get(g.away) ?? 0) + 1); }
  for (const tm of TEAMS) assert.equal(s.table[tm.name].w, recount.get(tm.name) ?? 0);
  // playoffs: 6 + 4 + 2 + 1 games, no ties, the #1 seed has a bye, rounds are reseeded
  assert.equal(s.playoffs.length, 13);
  for (const p of s.playoffs) assert.notEqual(p.result.homeScore, p.result.awayScore);
  const round = (r: string) => s.playoffs.filter((p) => p.round === r);
  assert.equal(round('Wild Card').length, 6); assert.equal(round('Divisional').length, 4); assert.equal(round('Conference').length, 2); assert.equal(round('Super Bowl').length, 1);
  for (const conf of ['AFC', 'NFC'] as const) {
    const sd = s.seeding.seeds[conf], seedOf = (n: string) => sd.indexOf(n) + 1;
    const wcTeams = round('Wild Card').filter((p) => TEAM_BY_NAME[p.home].conf === conf);
    assert.deepEqual(wcTeams.map((p) => [seedOf(p.home), seedOf(p.away)]), [[2, 7], [3, 6], [4, 5]]);
    assert.ok(!wcTeams.some((p) => seedOf(p.home) === 1 || seedOf(p.away) === 1), 'the #1 seed has a bye');
    const dv = round('Divisional').filter((p) => TEAM_BY_NAME[p.home].conf === conf);
    const alive = [sd[0], ...wcTeams.map((p) => (p.result.homeScore > p.result.awayScore ? p.home : p.away))].sort((a, b) => seedOf(a) - seedOf(b));
    assert.equal(dv[0].home, sd[0]); assert.equal(dv[0].away, alive[3], 'the #1 seed hosts the lowest seed left');
    assert.deepEqual([dv[1].home, dv[1].away], [alive[1], alive[2]]);
    for (const p of dv) assert.ok(seedOf(p.home) < seedOf(p.away));
    const cc = round('Conference').find((p) => TEAM_BY_NAME[p.home].conf === conf)!; assert.ok(seedOf(cc.home) < seedOf(cc.away));
  }
  const sb = round('Super Bowl')[0]; assert.notEqual(TEAM_BY_NAME[sb.home].conf, TEAM_BY_NAME[sb.away].conf);
  assert.equal(s.champion, sb.result.homeScore > sb.result.awayScore ? sb.home : sb.away);
}

test('a whole season: 272 games, table = games, 14-team playoff with byes and reseeding, a champion (30 seeded seasons)', () => {
  for (let i = 0; i < 30; i++) { const tms = league(100 + i); check(simulateSeason(tms, makeRng(i), { year: 2026 + (i % 6), prevRank: initialRanks(tms) })); }
});
test('same seed, same season; the next season can use this season\'s division finish', () => {
  const tms = league(7), a = simulateSeason(tms, makeRng(4), { year: 2026 }), b = simulateSeason(tms, makeRng(4), { year: 2026 });
  assert.deepEqual(a.table, b.table); assert.equal(a.champion, b.champion);
  const c = simulateSeason(tms, makeRng(5), { year: 2027, prevRank: a.nextRank }); check(c);
});
test('stronger teams win more: team strength vs wins, spread of wins, and the stronger team takes the title more often', () => {
  const xs: number[] = [], ys: number[] = [], wins: number[] = []; let titles = 0, topTitles = 0; const N = 40;
  for (let i = 0; i < N; i++) {
    const tms = league(500 + i), s = simulateSeason(tms, makeRng(900 + i), { year: 2026 });
    tms.forEach((t) => { xs.push(strengthOf(t)); ys.push(s.table[t.name].w + 0.5 * s.table[t.name].t); wins.push(s.table[t.name].w); });
    const top5 = tms.slice().sort((a, b) => strengthOf(b) - strengthOf(a)).slice(0, 5).map((t) => t.name); titles++; if (top5.includes(s.champion)) topTitles++;
  }
  const c = corr(xs, ys), mean = wins.reduce((a, b) => a + b) / wins.length, sd = Math.sqrt(wins.reduce((a, b) => a + (b - mean) ** 2, 0) / wins.length);
  assert.ok(c > 0.6, 'strength-wins correlation ' + c);
  assert.ok(Math.abs(mean - 8.5) < 0.1, 'mean wins ' + mean);
  assert.ok(sd > 2.2 && sd < 4.2, 'sd of wins ' + sd + ' (real NFL about 3)');
  assert.ok(topTitles / titles > 0.2, 'a top-5 team wins the title more than 1 in 5 (chance would be 5/32 = 16%)');
});
test('a bad team list is refused', () => { assert.throws(() => simulateSeason(league(1).slice(1), makeRng(1), { year: 2026 })); });
test('the Super Bowl is on a neutral field; every other playoff game keeps the home edge', () => {
  const tms = league(2000), s = simulateSeason(tms, makeRng(3000), { year: 2026, homeField: 8 });
  for (const p of s.playoffs) assert.equal(p.homeField, p.round === 'Super Bowl' ? 0 : 8, String(p.round));
});
