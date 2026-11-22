import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import type { TestDb } from './sqlite-d1.ts';
import { call, results, seasonEnv, weekEnv, W17 } from './helpers.ts';

const post = (db: TestDb, ...envs: unknown[]) => call(db, 'u1', 'POST', '/api/runs', { envelopes: envs });
const row = (db: TestDb, saveId: string) => db.get('SELECT * FROM runs WHERE save_id = ?', saveId);

test('20-0: a 17-0 team that wins three playoff games is both undefeated and perfect', async () => {
  const db = await memoryD1();
  assert.equal((await post(db, seasonEnv('A', 'p', 1, results(W17, [['Divisional', 'W'], ['Conference', 'W'], ['Super Bowl', 'W']])))).json.inserted, 1);
  const r = await row(db, 'p');
  assert.deepEqual([r.w, r.l, r.undefeated, r.perfect, r.outcome], [17, 0, 1, 1, 'champion']);
});

test('17-0 then out in the Divisional: undefeated, not perfect, outcome divisional', async () => {
  const db = await memoryD1();
  await post(db, seasonEnv('A', 'q', 1, results(W17, [['Divisional', 'L']])));
  const r = await row(db, 'q');
  assert.deepEqual([r.undefeated, r.perfect, r.outcome], [1, 0, 'divisional']);
});

test('a champion with a regular-season loss: not undefeated, not perfect', async () => {
  const db = await memoryD1();
  await post(db, seasonEnv('A', 'r', 1, results('WWWWWWWWWWWWWWWWL', [['Wild Card', 'W'], ['Divisional', 'W'], ['Conference', 'W'], ['Super Bowl', 'W']])));
  const r = await row(db, 'r');
  assert.deepEqual([r.w, r.l, r.undefeated, r.perfect, r.outcome], [16, 1, 0, 0, 'champion']);
});

test('missed playoffs; and a tie breaks "undefeated"', async () => {
  const db = await memoryD1();
  await post(db, seasonEnv('A', 's', 1, results('WWWWWWWWLLLLLLLLL')));
  assert.equal((await row(db, 's')).outcome, 'missed-playoffs');
  await post(db, seasonEnv('B', 't', 1, results('WWWWWWWWWWWWWWWWT')));
  const t = await row(db, 't'); assert.deepEqual([t.t, t.undefeated], [1, 0]);
});

test('the server recomputes: a lying userOutcome in the payload is ignored', async () => {
  const db = await memoryD1();
  await post(db, seasonEnv('A', 'liar', 1, results(W17, [['Divisional', 'W'], ['Conference', 'L']]), { userOutcome: 'champion' }));
  assert.equal((await row(db, 'liar')).outcome, 'conference');
  assert.equal((await row(db, 'liar')).perfect, 0);
});

test('replaying a run (retry, or a migration run twice) changes nothing', async () => {
  const db = await memoryD1();
  const e = seasonEnv('A', 'once', 3, results(W17, [['Divisional', 'L']]), { run: 2 });
  assert.deepEqual((await post(db, e)).json, { inserted: 1, ignored: 0 });
  assert.deepEqual((await post(db, e)).json, { inserted: 0, ignored: 1 });
  assert.equal((await db.get('SELECT COUNT(*) n FROM runs')).n, 1);
});

test('an unfinished season, a non-season save, or a run that does not end the season is refused', async () => {
  const db = await memoryD1();
  assert.equal((await post(db, seasonEnv('A', 'x', 1, results(W17), { statsRecorded: false }))).status, 422);
  assert.equal((await post(db, seasonEnv('A', 'y', 1, results(W17, [['Divisional', 'W']])))).status, 422, 'still alive after a win before the Super Bowl');
  assert.equal((await post(db, { not: 'an envelope' })).status, 422);
  assert.equal((await call(db, 'u1', 'POST', '/api/runs', { envelopes: [] })).status, 422);
  assert.equal((await db.get('SELECT COUNT(*) n FROM runs')).n, 0);
});

test('stats are folds over the ledger', async () => {
  const db = await memoryD1();
  await post(db,
    seasonEnv('A', 'a1', 1, results(W17, [['Divisional', 'W'], ['Conference', 'W'], ['Super Bowl', 'W']])),
    seasonEnv('B', 'a2', 1, results(W17, [['Divisional', 'L']])),
    seasonEnv('C', 'a3', 1, results('WWWWWWWWLLLLLLLLL')));
  const s = (await call(db, 'u1', 'GET', '/api/stats')).json;
  assert.deepEqual([s.runs, s.titles, s.superBowls, s.playoffs, s.undefeatedSeasons, s.perfectSeasons], [3, 1, 1, 2, 2, 1]);
  assert.equal(s.byFranchise.Me.runs, 3);
  // legend = 1 title x 100 + 2 playoff appearances x 10 + best 17 wins = 137
  assert.deepEqual([s.byFranchise.Me.playoffs, s.byFranchise.Me.bestWins, s.byFranchise.Me.legendPoints, s.legendPoints], [2, 17, 137, 137]);
});

test('legend points: an empty ledger is 0, and a second franchise is scored on its own runs', async () => {
  const db = await memoryD1();
  assert.equal((await call(db, 'u1', 'GET', '/api/stats')).json.legendPoints, 0);
});

test('"perfect" needs the title: all wins but no playoff run is not perfect', async () => {
  const db = await memoryD1();
  await post(db, seasonEnv('A', 'np', 1, results(W17)));
  const r = await row(db, 'np'); assert.deepEqual([r.outcome, r.undefeated, r.perfect], ['missed-playoffs', 1, 0]);
});

test('a week save is refused as a run with a 422 (never a 500), even when it claims statsRecorded', async () => {
  const db = await memoryD1();
  const r = await post(db, weekEnv('A', 'wk', 1));
  assert.equal(r.status, 422); assert.match(r.json.message, /finished season/);
});
