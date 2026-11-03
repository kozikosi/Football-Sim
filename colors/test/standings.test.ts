import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEAMS, TEAM_BY_NAME, DIVS, divisionTeams } from '../src/engine/league.ts';
import { Book, orderTied, orderWildCard, seedPlayoffs, pct } from '../src/engine/standings.ts';
import type { Played } from '../src/engine/standings.ts';
import { makeRng } from '../src/engine/rng.ts';

const g = (home: string, away: string, hs: number, as: number, htd = Math.floor(hs / 7), atd = Math.floor(as / 7)): Played => ({ home, away, hs, as, htd, atd });
const BUF = 'Buffalo Bills', MIA = 'Miami Dolphins', NE = 'New England Patriots', NYJ = 'NY Jets';
const PIT = 'Pittsburgh Steelers', CLE = 'Cleveland Browns', KC = 'Kansas City Chiefs', LV = 'Las Vegas Raiders', BAL = 'Baltimore Ravens', CIN = 'Cincinnati Bengals';
const rng = makeRng(1);

test('pct: ties count half; no games is 0', () => { assert.equal(pct(10, 6, 1), 10.5 / 17); assert.equal(pct(0, 0, 0), 0); });

test('division, two clubs: head-to-head first', () => {
  const book = new Book([g(BUF, MIA, 24, 20), g(MIA, BUF, 10, 14)]);
  assert.deepEqual(orderTied([MIA, BUF], 'division', book, rng), [BUF, MIA]);
});
test('division, two clubs: split head-to-head goes to division record', () => {
  const book = new Book([g(BUF, MIA, 24, 20), g(MIA, BUF, 20, 17), g(BUF, NE, 20, 10), g(MIA, NE, 10, 20)]);
  assert.deepEqual(orderTied([MIA, BUF], 'division', book, rng), [BUF, MIA]);
});
test('division, three clubs: head-to-head among the three, then the procedure restarts for the two left', () => {
  const book = new Book([g(BUF, MIA, 20, 10), g(BUF, NE, 20, 10), g(MIA, NE, 20, 10)]);
  assert.deepEqual(orderTied([NE, MIA, BUF], 'division', book, rng), [BUF, MIA, NE]);
});
test('division, three clubs in a cycle: head-to-head is level, division record separates', () => {
  const book = new Book([g(BUF, MIA, 20, 10), g(MIA, NE, 20, 10), g(NE, BUF, 20, 10), g(BUF, NYJ, 20, 10), g(MIA, NYJ, 10, 20), g(NE, NYJ, 10, 20)]);
  // Bills 2-1 in division, Dolphins 1-2... Jets beat the Dolphins and Patriots
  const o = orderTied([NE, MIA, BUF], 'division', book, rng);
  assert.equal(o[0], BUF);
});
test('wild card, two clubs from different divisions who never met: conference record, then (common games under four are skipped) strength of victory', () => {
  const games = [g(BUF, KC, 20, 10), g(PIT, CLE, 20, 10), g(KC, LV, 20, 10), g(KC, LV, 20, 10), g(LV, KC, 10, 24), g(CLE, BAL, 3, 24), g(CLE, CIN, 3, 24), g(CIN, CLE, 24, 3)];
  const book = new Book(games);
  assert.equal(book.pct(BUF, (r) => TEAM_BY_NAME[r.opp].conf === 'AFC'), 1);
  assert.equal(book.pct(PIT, (r) => TEAM_BY_NAME[r.opp].conf === 'AFC'), 1);
  assert.ok(book.sov(BUF) > book.sov(PIT));
  assert.deepEqual(orderWildCard([PIT, BUF], book, rng), [BUF, PIT]);
});
test('wild card, three clubs: a club that beat both others advances on the sweep; one that lost to both leaves the tie', () => {
  const A = 'Denver Broncos', B = 'Houston Texans', C = BUF;
  const book = new Book([g(A, B, 20, 10), g(A, C, 20, 10), g(B, C, 20, 10)]);
  assert.deepEqual(orderWildCard([C, B, A], book, rng), [A, B, C]);
});
test('wild card: of several clubs from one division only the best is in the running for the next spot, then the rest re-enter', () => {
  const book = new Book([g(BUF, MIA, 20, 10), g(MIA, NE, 20, 10), g(NE, BUF, 3, 20), g(PIT, CLE, 20, 10)]);
  const o = orderWildCard([MIA, BUF, NE, PIT], book, rng);
  assert.equal(o.length, 4);
  assert.ok(o.indexOf(BUF) < o.indexOf(MIA), 'Bills beat the Dolphins');
});
test('coin toss is seeded by the clubs, not by the order they were passed in', () => {
  const book = new Book([]);
  const a = orderTied([BUF, MIA], 'division', book, makeRng(5)), b = orderTied([MIA, BUF], 'division', book, makeRng(5));
  assert.deepEqual(a, b);
  const flips = new Set<string>(); for (let s = 0; s < 40; s++) flips.add(orderTied([BUF, MIA], 'division', book, makeRng(s))[0]);
  assert.equal(flips.size, 2, 'both outcomes happen across seeds');
});
test('net points decides when records, strength and rankings are level', () => {
  // two clubs, identical results except margin: the one with the better points rank wins before net points is even needed
  const book = new Book([g(BUF, KC, 30, 0), g(PIT, LV, 10, 9)]);
  assert.equal(orderTied([PIT, BUF], 'division', book, rng)[0], BUF);
});

// ---- seeding on whole random seasons ----
function randomSeason(seed: number): Played[] {
  const r = makeRng(seed), games: Played[] = [];
  const strength = Object.fromEntries(TEAMS.map((t) => [t.name, r.normal() * 3])) as Record<string, number>;
  const add = (a: string, b: string) => { const hw = r.next() < 1 / (1 + Math.exp(-(strength[a] - strength[b] + 0.5) / 3)); const w = 17 + r.int(0, 14), l = r.int(3, 16); games.push(hw ? g(a, b, w, l) : g(a, b, l, w)); };
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) { const ts = divisionTeams(c, d); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (i !== j) add(ts[i], ts[j]); }
  for (let k = 0; k < 220; k++) { const a = TEAMS[r.int(0, 31)].name, b = TEAMS[r.int(0, 31)].name; if (a !== b) add(a, b); }
  return games;
}
test('seeding: 7 a conference, division winners are seeds 1-4, wild cards 5-7, by record, no club twice', () => {
  let wcBeatsDivisionWinner = 0;
  for (let s = 0; s < 150; s++) {
    const games = randomSeason(s), sd = seedPlayoffs(games, makeRng(s)), book = new Book(games);
    for (const c of ['AFC', 'NFC'] as const) {
      const seeds = sd.seeds[c];
      assert.equal(seeds.length, 7); assert.equal(new Set(seeds).size, 7);
      assert.ok(seeds.every((t) => TEAM_BY_NAME[t].conf === c));
      assert.deepEqual(new Set(seeds.slice(0, 4)), new Set(sd.divisionWinners[c]));
      for (let i = 0; i < 3; i++) assert.ok(book.overall(seeds[i]) >= book.overall(seeds[i + 1]) - 1e-12, 'division winners in order of record');
      for (let i = 4; i < 6; i++) assert.ok(book.overall(seeds[i]) >= book.overall(seeds[i + 1]) - 1e-12, 'wild cards in order of record');
      // a wild card never has a better record than the division winner of its own division
      for (const wcT of seeds.slice(4)) { const dv = sd.divisionOrder[`${c} ${TEAM_BY_NAME[wcT].div}`]; assert.ok(book.overall(dv[0]) >= book.overall(wcT) - 1e-12); if (book.overall(wcT) > book.overall(seeds[3]) + 1e-12) wcBeatsDivisionWinner++; }
      // the best non-winner is in
      const rest = TEAMS.filter((x) => x.conf === c && !sd.divisionWinners[c].includes(x.name)).map((x) => book.overall(x.name)).sort((a, b) => b - a);
      assert.ok(Math.abs(book.overall(seeds[4]) - rest[0]) < 1e-12);
    }
    for (const t of TEAMS) assert.ok([1, 2, 3, 4].includes(sd.divisionRank[t.name]));
  }
  assert.ok(wcBeatsDivisionWinner > 0, 'the seeding rule (winners first) actually mattered in some seasons');
});
test('seeding is repeatable for a seed', () => { const gs = randomSeason(3); assert.deepEqual(seedPlayoffs(gs, makeRng(8)), seedPlayoffs(gs, makeRng(8))); });

// ---- steps that must stay in the official order (each has a scenario in which only that step decides) ----
const HOU = 'Houston Texans', IND = 'Indianapolis Colts', TEN = 'Tennessee Titans', JAX = 'Jacksonville Jaguars', DEN = 'Denver Broncos';
test('wild card: strength of victory is applied before strength of schedule', () => {
  // BUF beat KC (strong), PIT beat CLE (weak): same records. PIT\'s schedule (BAL) is stronger than BUF\'s (LV): sov and sos disagree.
  const book = new Book([
    g(BUF, KC, 20, 10), g(LV, BUF, 20, 10), g(PIT, CLE, 20, 10), g(BAL, PIT, 20, 10),
    g(KC, DEN, 20, 10), g(KC, HOU, 20, 10), g(KC, IND, 20, 10),
    g(CIN, CLE, 20, 10), g(BAL, CLE, 20, 10), g(BAL, TEN, 20, 10), g(BAL, JAX, 20, 10), g(BAL, NE, 20, 10),
    g(DEN, LV, 20, 10), g(HOU, LV, 20, 10), g(IND, LV, 20, 10), g(TEN, LV, 20, 10),
  ]);
  assert.ok(book.sov(BUF) > book.sov(PIT), 'sov favours Buffalo');
  assert.ok(book.sos(PIT) > book.sos(BUF), 'sos favours Pittsburgh');
  assert.equal(book.pct(BUF, (r) => TEAM_BY_NAME[r.opp].conf === 'AFC'), book.pct(PIT, (r) => TEAM_BY_NAME[r.opp].conf === 'AFC'));
  assert.deepEqual(orderWildCard([PIT, BUF], book, rng), [BUF, PIT]);
});
test('wild card: common games count only when there are at least four of them', () => {
  // three common opponents (KC, LV, BAL): Buffalo 2-1, Pittsburgh 1-2 against them, but under four games the step is skipped and strength of victory decides for Pittsburgh
  const book = new Book([
    g(BUF, KC, 20, 10), g(BUF, LV, 20, 10), g(BAL, BUF, 20, 10), g(CIN, BUF, 20, 10),
    g(KC, PIT, 20, 10), g(LV, PIT, 20, 10), g(PIT, BAL, 20, 10), g(PIT, DEN, 20, 10),
    g(DEN, HOU, 20, 10), g(DEN, IND, 20, 10), g(DEN, TEN, 20, 10), g(DEN, JAX, 20, 10),
  ]);
  assert.equal(book.pct(BUF, (r) => TEAM_BY_NAME[r.opp].conf === 'AFC'), book.pct(PIT, (r) => TEAM_BY_NAME[r.opp].conf === 'AFC'));
  assert.ok(book.sov(PIT) > book.sov(BUF));
  assert.deepEqual(orderWildCard([BUF, PIT], book, rng), [PIT, BUF]);
});
test('net touchdowns: more is better, and it decides only when everything before it is level', () => {
  const book = new Book([g(BUF, HOU, 21, 14, 3, 2), g(PIT, HOU, 21, 14, 2, 2)]);
  for (let s = 0; s < 12; s++) assert.deepEqual(orderWildCard([PIT, BUF], book, makeRng(s)), [BUF, PIT], 'seed ' + s);
});
test('division: strength of victory is applied before strength of schedule', () => {
  const book = new Book([
    g(BUF, KC, 20, 10), g(LV, BUF, 20, 10), g(MIA, CLE, 20, 10), g(BAL, MIA, 20, 10),
    g(KC, DEN, 20, 10), g(KC, HOU, 20, 10), g(KC, IND, 20, 10),
    g(CIN, CLE, 20, 10), g(BAL, CLE, 20, 10), g(BAL, TEN, 20, 10), g(BAL, JAX, 20, 10), g(BAL, NE, 20, 10),
    g(DEN, LV, 20, 10), g(HOU, LV, 20, 10), g(IND, LV, 20, 10), g(TEN, LV, 20, 10),
  ]);
  assert.ok(book.sov(BUF) > book.sov(MIA)); assert.ok(book.sos(MIA) > book.sos(BUF));
  for (let s = 0; s < 8; s++) assert.deepEqual(orderTied([MIA, BUF], 'division', book, makeRng(s)), [BUF, MIA]);
});
