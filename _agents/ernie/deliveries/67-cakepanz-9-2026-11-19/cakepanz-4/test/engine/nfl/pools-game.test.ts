import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { gameKeyOf } from '../../../src/engine/core/keyedrng.ts';
import { logHash, validateLog } from '../../../src/engine/core/events.ts';
import { makePack, verifyPack } from '../../../src/engine/core/pack.ts';
import type { PackBody } from '../../../src/engine/core/pack.ts';
import { binOf, loadPools, tmb } from '../../../src/engine/sports/nfl/sim/pools.ts';
import { runGame } from '../../../src/engine/sports/nfl/sim/game.ts';
import type { GameEv, GameOut } from '../../../src/engine/sports/nfl/sim/game.ts';
import { gameTotals, totalsFold } from '../../../src/engine/sports/nfl/sim/totals.ts';
import { foldLog } from '../../../src/engine/core/fold.ts';

// 1c: the real pack (tools/mathlab/phase1/bake.py) and the full-game sim on it. These tests check PLUMBING and ACCOUNTING IDENTITIES. They pin no football number:
// the totals bar against real seasons is a REPORT (tools/totals-bar.ts), not a test, per the Owner's 13 Nov ruling.
const packFile = new URL('../../../data/packs/nfl-pools-fit2016-2022.json', import.meta.url);
const body = JSON.parse(fs.readFileSync(packFile, 'utf8')) as PackBody;
const pack = makePack(body);
const P = loadPools(pack);
const play = (g: number | string): GameOut => runGame(P, gameKeyOf(typeof g === 'number' ? 'pg-' + g : g));

test('the baked pack is self-consistent: hash verifies, counts add up, tuples are well formed', () => {
  assert.ok(verifyPack(pack));
  const c = body.params['counts'] as Record<string, number>;
  assert.equal(P.tuples.oc.length, c['tuples']);
  for (let i = 0; i < P.tuples.oc.length; i++) assert.ok(P.tuples.oc[i]! >= 0 && P.tuples.oc[i]! <= 8, 'outcome class ' + i);
  // every level of the record hierarchy holds the same number of plays
  for (const lv of P.rec) assert.equal([...lv.values()].reduce((s, p) => s + p.total, 0), c['records']);
  // every level of the call hierarchy holds the same number of states
  const per = P.call.map((lv) => [...lv.values()].reduce((s, p) => s + p.total, 0));
  assert.ok(per.every((x) => x === per[0]), 'call levels disagree: ' + per.join(','));
});

test('the loader rejects a corrupted pack (the check can fail)', () => {
  const bad = (mut: (b: PackBody) => PackBody): void => assert.throws(() => loadPools(makePack(mut(JSON.parse(JSON.stringify(body)) as PackBody))));
  bad((b) => { (b.params['counts'] as Record<string, number>)['records'] = 1; return b; });                          // count lies
  bad((b) => { ((b.params['rec'] as Record<string, number[]>)['n'] as number[])[0] = -1; return b; });                // a non-positive weight
  bad((b) => { ((b.params['rec'] as Record<string, number[]>)['tid'] as number[])[0] = 99999999; return b; });         // a tuple that does not exist
  bad((b) => ({ ...b, rules: { ...b.rules, values: { ...b.rules.values, clock: 'dt_x' } } }));                         // an unknown rule
});

test('bins: binOf matches the lab (number of edges <= x), tmb matches the lab', () => {
  assert.equal(binOf([2, 3, 5], 1), 0); assert.equal(binOf([2, 3, 5], 2), 1); assert.equal(binOf([2, 3, 5], 4.9), 2); assert.equal(binOf([2, 3, 5], 5), 3); assert.equal(binOf([2, 3, 5], 99), 3);
  assert.equal(tmb(1, 100), 6); assert.equal(tmb(3, 5), 6); assert.equal(tmb(2, 40), 0); assert.equal(tmb(2, 41), 1); assert.equal(tmb(4, 120), 1); assert.equal(tmb(4, 900), 4); assert.equal(tmb(4, 901), 5);
});

test('a game is deterministic in its key and differs across keys', () => {
  const a = play('det'), b = play('det'), c = play('det2');
  assert.equal(logHash(a.events), logHash(b.events));
  assert.notEqual(logHash(a.events), logHash(c.events));
  validateLog(a.events);
});

// Accounting identities: every number a view shows is a count of events, so these must hold for ANY pack.
function checkGame(g: GameOut, n: string): void {
  validateLog(g.events);
  const tt = gameTotals(g), A = tt['A']!, B = tt['B']!;
  assert.deepEqual([A.points, B.points], [g.points[0], g.points[1]], `${n}: fold points = the game's final score`);
  let td = 0, xp = 0, fg = 0, sf = 0, xpPts = 0, snaps = 0, ko = 0, starts = 0, ends = 0, snapDt = 0;
  for (const e of g.events) {
    if (e.kind === 'score') { if (e.payload.kind === 'TD') td++; else if (e.payload.kind === 'FG') fg++; else sf++; }
    else if (e.kind === 'extra_point') { xp++; xpPts += e.payload.points; }
    else if (e.kind === 'snap') { snaps++; snapDt += e.payload.dt; assert.ok(e.payload.dt >= 0 && Number.isInteger(e.payload.dt), `${n}: dt`); }
    else if (e.kind === 'kickoff') ko++;
    else if (e.kind === 'drive_start') starts++;
    else ends++;
  }
  assert.equal(xp, td, `${n}: every touchdown is followed by exactly one try`);
  assert.equal(A.points + B.points, td * 6 + fg * 3 + sf * 2 + xpPts, `${n}: points = scoring events`);
  assert.equal(A.plays + B.plays, snaps + ko + xp, `${n}: plays = snaps + kickoffs + tries`);
  assert.equal(A.drives + B.drives, starts, `${n}: drives`);
  assert.ok(ends <= starts && ends >= starts - 3, `${n}: at most a drive per half (and overtime) is cut off by the clock (${ends}/${starts})`);
  assert.equal(A.top_dt + B.top_dt, snapDt, `${n}: possession time = snap seconds`);
  assert.ok(snapDt <= 3600 + 600, `${n}: snap seconds ${snapDt} fit in the game`);
  for (const x of [A, B]) assert.ok(x.completions <= x.pass_att && x.sacks >= 0 && x.giveaways >= 0 && x.off_plays <= x.plays, `${n}: counts`);
}
test('accounting identities over 400 games (any pack must satisfy them)', () => { for (let n = 0; n < 400; n++) checkGame(play(n), 'g' + n); });

test('the identity check can fail (a tampered log is caught)', () => {
  const g = play(7);
  const noScore = g.events.filter((e, i) => !(e.kind === 'score' && i === g.events.findIndex((x) => x.kind === 'score')));
  const dropped = { ...g, events: noScore.map((e, i) => ({ ...e, i })) as GameEv[] };
  assert.throws(() => checkGame(dropped, 'tampered'));
});

test('the same fold gives the same totals from the log alone (replay needs no sim state)', () => {
  const g = play(11);
  assert.deepEqual(foldLog(totalsFold, g.events), gameTotals(g));
});

test('overtime exists and settles most ties (information, not a gate)', () => {
  let ot = 0, tied = 0;
  for (let n = 0; n < 600; n++) { const g = play(n); if (g.ot) { ot++; if (g.points[0] === g.points[1]) tied++; } }
  assert.ok(ot > 0, 'some games reach overtime');
  console.log(`# info: ${ot}/600 games reached overtime, ${tied} ended tied`);
});

test('regression pin: pack hash, log hash and score for one key (a replay pin from this code, not an independent check)', () => {
  const g = play('pools-golden');
  console.log(`# golden pack=${pack.hash} log=${logHash(g.events)} points=${g.points.join('-')} events=${g.events.length}`);
  assert.equal(pack.hash, GOLDEN.pack); assert.equal(logHash(g.events), GOLDEN.log); assert.deepEqual([...g.points], GOLDEN.points); assert.equal(g.events.length, GOLDEN.events);
});
const GOLDEN = { pack: 'pack53:0b60973944ae13', log: 'log53:16f7dd18895323', points: [26, 17], events: 195 };
