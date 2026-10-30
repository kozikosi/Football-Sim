import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../src/engine/slots.ts';
import type { SlotId } from '../src/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../src/engine/ratings.ts';
import { matchupModel, DEFAULT_PLAN } from '../src/engine/matchup.ts';
import { makeRng } from '../src/engine/rng.ts';
import { allocate, decompose, simulateGame } from '../src/engine/drives.ts';
import type { GameResult, Side } from '../src/engine/drives.ts';

const flat = (v: number) => teamRatings(spotsFromRecord(Object.fromEntries(SLOT_IDS.map((s) => [s, v])) as Record<SlotId, number>));
const lg = flat(80), strong = flat(88), weak = flat(72);
const mm = (o: typeof lg, d: typeof lg) => matchupModel(o, d, lg, DEFAULT_PLAN);
const game = (seed: number, playoff = false, h = lg, a = lg) => simulateGame(mm(h, a), mm(a, h), makeRng(seed), { playoff });
const other = (s: Side): Side => (s === 'home' ? 'away' : 'home');

function check(g: GameResult, playoff: boolean) {
  // (a) the score is the sum of the scoring events
  const sum = { home: 0, away: 0 };
  for (const e of g.events) sum[e.side] += e.pts;
  assert.equal(sum.home, g.homeScore); assert.equal(sum.away, g.awayScore);
  // regulation drives hit the realised totals exactly
  const reg = g.drives.filter((d) => d.period <= 4);
  for (const s of ['home', 'away'] as const) {
    const mine = reg.filter((d) => d.side === s);
    assert.equal(mine.reduce((t, d) => t + d.rush, 0), g.agg[s].rush);
    assert.equal(mine.reduce((t, d) => t + d.pass, 0), g.agg[s].pass);
    assert.equal(mine.reduce((t, d) => t + d.sacks, 0), g.agg[s].sacks);
    assert.equal(mine.filter((d) => d.end === 'INT' || d.end === 'FUM').length, g.agg[s].to);
    for (const d of mine) assert.ok(d.sacks <= d.plays && d.plays >= 1 && d.secs > 0);
    assert.equal(g.stats[s].yards, g.drives.filter((d) => d.side === s).reduce((t, d) => t + d.rush + d.pass, 0));
    assert.equal(g.stats[s].takeaways, g.stats[other(s)].giveaways);
  }
  // the clock: 3600 in regulation, overtime on top
  assert.equal(reg.reduce((t, d) => t + d.secs, 0), 3600);
  assert.equal(g.drives.filter((d) => d.period > 4).reduce((t, d) => t + d.secs, 0), g.otSecs);
  // drives are in time order and alternate within a half
  for (let i = 1; i < g.drives.length; i++) {
    assert.ok(g.drives[i].start === g.drives[i - 1].start + g.drives[i - 1].secs);
    if (g.drives[i].period <= 4 && g.drives[i - 1].period === g.drives[i].period && (g.drives[i].start < 1800) === (g.drives[i - 1].start < 1800)) assert.notEqual(g.drives[i].side, g.drives[i - 1].side);
  }
  // overtime
  if (g.ot) {
    assert.equal(g.regHome, g.regAway);
    const ots = g.drives.filter((d) => d.period > 4);
    const ended = ots.some((d) => d.oppPts > 0);
    if (!ended) for (const s of ['home', 'away'] as const) assert.ok(ots.some((d) => d.side === s), 'both teams possess in overtime');
    if (playoff) assert.ok(!g.ot.tie && g.homeScore !== g.awayScore, 'a playoff game has a winner');
    if (!g.ot.tie) assert.notEqual(g.homeScore, g.awayScore);
    assert.ok(g.otSecs <= g.ot.periods * (playoff ? 900 : 600));
  } else assert.equal(g.otSecs, 0);
}

test('identities hold over 600 seeded games (regular season and playoffs, level and lopsided teams)', () => {
  for (let i = 0; i < 600; i++) {
    const playoff = i % 3 === 0;
    const [h, a] = i % 4 === 0 ? [strong, weak] : i % 4 === 1 ? [weak, strong] : [lg, lg];
    check(game(1000 + i, playoff, h, a), playoff);
  }
});
test('same seed gives the same game; a different seed does not', () => {
  assert.deepEqual(game(7), game(7));
  assert.notDeepEqual(game(7).drives, game(8).drives);
});
test('decompose: every reachable score splits into touchdowns, conversions and field goals that add up', () => {
  const rng = makeRng(3);
  for (let S = 0; S <= 58; S++) {
    if ([1, 2, 4, 5].includes(S)) continue;
    for (let t = 0; t < 20; t++) {
      const c = decompose(S, 3, rng);
      assert.equal(c.convs.length, c.td);
      const pts = c.td * 6 + c.convs.reduce((s, x) => s + (x === 'xp' ? 1 : x === 'two' ? 2 : 0), 0) + 3 * c.fg + 7 * c.dTD + 2 * c.sf;
      assert.equal(pts, S);
    }
  }
});
test('allocate adds up exactly', () => {
  const rng = makeRng(5);
  for (let i = 0; i < 200; i++) { const w = Array.from({ length: 11 }, () => 0.1 + rng.next()); const t = rng.int(0, 500); assert.equal(allocate(t, w).reduce((a, b) => a + b, 0), t); }
});
test('league-average games look like the NFL: points, yards, drives, turnovers, sacks, overtime', () => {
  const N = 2000; let pts = 0, yds = 0, dr = 0, to = 0, sk = 0, ot = 0, tie = 0, td = 0, margin = 0, secs = 0;
  for (let i = 0; i < N; i++) {
    const g = game(50000 + i);
    pts += g.homeScore + g.awayScore; margin += g.homeScore - g.awayScore;
    yds += g.stats.home.yards + g.stats.away.yards; dr += g.stats.home.drives + g.stats.away.drives;
    to += g.stats.home.giveaways + g.stats.away.giveaways; sk += g.stats.home.sacksTaken + g.stats.away.sacksTaken;
    td += g.events.filter((e) => e.kind === 'TD').length; secs += g.drives.length ? 3600 / dr * 0 : 0;
    if (g.ot) { ot++; if (g.ot.tie) tie++; }
  }
  const per = (x: number) => x / N / 2;
  assert.ok(per(pts) > 20 && per(pts) < 25, 'points per team ' + per(pts));
  assert.ok(per(yds) > 295 && per(yds) < 355, 'yards per team ' + per(yds));
  assert.ok(per(dr) > 10.5 && per(dr) < 13, 'drives per team ' + per(dr));
  assert.ok(per(to) > 1.0 && per(to) < 1.4, 'giveaways ' + per(to));
  assert.ok(per(sk) > 1.9 && per(sk) < 2.5, 'sacks ' + per(sk));
  assert.ok(margin / N > 0.8 && margin / N < 2.6, 'home edge ' + margin / N);
  assert.ok(ot / N > 0.03 && ot / N < 0.09, 'overtime rate ' + ot / N);
  assert.ok(per(td) > 2.1 && per(td) < 3.0, 'offensive TDs ' + per(td));
  assert.ok(tie / N < 0.01);
});
test('a stronger team wins more often, and by points the model predicts', () => {
  let w = 0, m = 0; const N = 1500;
  for (let i = 0; i < N; i++) { const g = game(90000 + i, false, strong, weak); if (g.homeScore > g.awayScore) w++; m += g.homeScore - g.awayScore; }
  assert.ok(w / N > 0.85, 'strong beats weak ' + w / N);
  assert.ok(m / N > 7, 'margin ' + m / N);
});
test('overtime clock: a playoff game rolls into new periods until someone wins; a regular-season game can end tied', () => {
  let periods = 0, ties = 0;
  for (let i = 0; i < 400; i++) {
    const g = simulateGame(mm(lg, lg), mm(lg, lg), makeRng(300000 + i), { playoff: true, otLimit: 40 });
    if (g.ot) { assert.ok(!g.ot.tie && g.homeScore !== g.awayScore); periods = Math.max(periods, g.ot.periods); assert.ok(g.otSecs <= g.ot.periods * 40 + 330); }
    const r = simulateGame(mm(lg, lg), mm(lg, lg), makeRng(300000 + i), { playoff: false, otLimit: 40 });
    if (r.ot?.tie) ties++;
  }
  assert.ok(periods >= 2, 'new periods were played');
  assert.ok(ties > 0, 'regular-season ties happen when the clock runs out');
});
