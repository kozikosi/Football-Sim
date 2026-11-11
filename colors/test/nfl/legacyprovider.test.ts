import { test } from 'node:test';
import assert from 'node:assert/strict';
import { league, play, side } from './fixture.ts';
import { makeRng } from '../../src/core/rng.ts';
import { foldAll, foldLog } from '../../src/core/fold.ts';
import { logHash, validateLog } from '../../src/core/events.ts';
import { verifyPack } from '../../src/core/pack.ts';
import { matchupModel } from '../../src/sports/nfl/engine/matchup.ts';
import { teamIdentity } from '../../src/sports/nfl/engine/plans.ts';
import { boxScoreFold, eventsOf, gameResultFold, legacyGameLog, legacyPack } from '../../src/sports/nfl/engine/legacyprovider.ts';

// THE PHASE 0 GATE: for seeded games the new event log, folded, reproduces today's GameResult and box score exactly.
const SEEDS = Array.from({ length: 60 }, (_, k) => 1000 + 7 * k);
test('gate: fold(log) deep-equals the original GameResult and BoxScore on 60 seeded games (regular season and playoff)', () => {
  let ot = 0, ties = 0;
  for (const seed of SEEDS) {
    const playoff = seed % 3 === 0, i = seed % 32, j = (seed * 5 + 11) % 32 === i ? (i + 1) % 32 : (seed * 5 + 11) % 32;
    const { res, box, H, A } = play(i, j, seed, playoff);
    const events = eventsOf(res, box, { home: H.name, away: A.name, playoff });
    validateLog(events);
    const out = foldAll({ result: gameResultFold, box: boxScoreFold }, events);
    assert.deepEqual(out.result, res, `GameResult differs, seed ${seed}`);
    assert.deepEqual(out.box, box, `BoxScore differs, seed ${seed}`);
    if (res.ot) { ot++; if (res.ot.tie) ties++; }
  }
  assert.ok(ot > 0, 'the sample must include overtime games or the overtime fold is untested (got ' + ot + ')');
});
test('legacyGameLog runs the old engine unchanged: same numbers as the fixture path, and the log is deterministic', () => {
  const { teams, lg } = league(), H = teams[3], A = teams[17], ih = teamIdentity(H.ratings, lg), ia = teamIdentity(A.ratings, lg);
  const mh = matchupModel(H.ratings, A.ratings, lg, { off: ih.off, def: ia.def }), ma = matchupModel(A.ratings, H.ratings, lg, { off: ia.off, def: ih.def });
  const a = legacyGameLog(mh, ma, makeRng(4242), { playoff: false }, side(H), side(A)), b = legacyGameLog(mh, ma, makeRng(4242), { playoff: false }, side(H), side(A));
  assert.equal(logHash(a.events), logHash(b.events));
  const ref = play(3, 17, 4242);
  assert.deepEqual(a.res, ref.res); assert.deepEqual(a.box, ref.box);
  assert.notEqual(logHash(a.events), logHash(legacyGameLog(mh, ma, makeRng(4243), { playoff: false }, side(H), side(A)).events));
});
test('the game after play N: folding a prefix of the log gives the partial game, and the last drive adds exactly its own points', () => {
  const { res, box, H, A } = play(2, 9, 31337), events = eventsOf(res, box, { home: H.name, away: A.name, playoff: false });
  const firstDrive = events.findIndex((e) => e.kind === 'drive');
  const after1 = foldLog(gameResultFold, events, firstDrive + 1);
  assert.equal(after1.drives.length, 1);
  const d0 = res.drives[0]!;
  assert.equal(after1.homeScore + after1.awayScore, d0.pts + d0.oppPts);
  assert.equal(foldLog(gameResultFold, events, 0).drives.length, 0);
});
test('the gate can fail: a log with one drive changed no longer folds to the original result', () => {
  const { res, box, H, A } = play(5, 6, 777), events = [...eventsOf(res, box, { home: H.name, away: A.name, playoff: false })];
  const k = events.findIndex((e) => e.kind === 'drive');
  const e = events[k]!;
  if (e.kind !== 'drive') throw new Error('unreachable');
  events[k] = { ...e, payload: { ...e.payload, rush: e.payload.rush + 1 } };
  assert.notDeepEqual(foldLog(gameResultFold, events).stats, res.stats);
});
test('the legacy pack verifies and names its provenance; the log carries its hash', () => {
  const p = legacyPack();
  assert.ok(verifyPack(p));
  assert.match(p.provenance.source, /legacy/);
  const { res, box, H, A } = play(0, 1, 5), ev = eventsOf(res, box, { home: H.name, away: A.name, playoff: false });
  assert.equal((ev[0] as { payload: { pack: string } }).payload.pack, p.hash);
});
