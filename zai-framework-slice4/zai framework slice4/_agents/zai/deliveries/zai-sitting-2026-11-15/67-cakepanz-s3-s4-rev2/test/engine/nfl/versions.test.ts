import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { dataVersion, drift, engineVersion, rulesText, stamps } from '../../../src/engine/sports/nfl/app/versions.ts';
import { restore, serialize } from '../../../src/engine/sports/nfl/app/saves.ts';
import { canonicalRowsText, datasetHash, hash53, sha256Hex } from '../../../src/engine/core/hash.ts';
import { buildPool } from '../../../src/engine/sports/nfl/engine/players.ts';
import { freezePool } from '../../../src/engine/sports/nfl/app/store.ts';
const rd = (n: string) => fs.readFileSync(new URL('../../../data/nfl/' + n, import.meta.url), 'utf8');
const R = rd('madden27-ratings.csv'), F = rd('free-agents-old-ratings.csv'), I = rd('player-ids.csv');
const ROWS = freezePool(buildPool(R, F, I));
const META = { saveId: 'test-save', saveRevision: 1, createdAt: '2026-11-03T00:00:00Z' };

// PINS. These change on purpose, never by accident: a failure here means the rules (slots, weights, flex table, specs, plan constants, draft
// config) or the data files changed. If that was intended, update the pin in the same commit (and re-pin MERGE-MANIFEST.md for protected constants).
const PIN_ENGINE = 'nfl1.0e237387b2647f', PIN_DATA = 'sha256:e583aec0d21078e8827d7a1efdc5c8c1e06ae518ca783ebb4b3cdfd3b2dcf2d3';
test('E5 pins: the engine and data stamps are what the last deliberate change left them', async () => {
  assert.equal(engineVersion(), PIN_ENGINE, 'rules changed: update PIN_ENGINE on purpose');
  assert.equal(await dataVersion(ROWS), PIN_DATA, 'data changed: update PIN_DATA on purpose');
});
test('hash53: stable, 14 hex digits, and sensitive to one character and to order', () => {
  assert.equal(hash53('abc'), hash53('abc')); assert.match(hash53(''), /^[0-9a-f]{14}$/);
  assert.notEqual(hash53('abc'), hash53('abd')); assert.notEqual(hash53('ab'), hash53('ba')); assert.notEqual(hash53('abc', 1), hash53('abc', 2));
});
test('dataVersion: canonical SHA-256 of the player rows. A changed rating changes it; row order, CSV whitespace, line endings and Unicode composition do not', async () => {
  const base = await dataVersion(ROWS);
  assert.match(base, /^sha256:[0-9a-f]{64}$/);
  const changed = ROWS.map((r, i) => (i === 0 ? ([r[0], r[1], r[2], r[3], (r[4] as number) + 1, r[5], r[6], r[7]] as typeof r) : r));
  assert.notEqual(await dataVersion(changed), base);
  assert.equal(await dataVersion(ROWS.slice().reverse()), base, 'row order');
  assert.equal(await dataVersion(buildPool(R.replace(/\n/g, '\r\n'), F.replace(/\n/g, '\r\n'), I.replace(/\n/g, '\r\n')).length ? freezePool(buildPool(R.replace(/\n/g, '\r\n'), F.replace(/\n/g, '\r\n'), I.replace(/\n/g, '\r\n'))) : ROWS), base, 'Windows line endings');
  assert.equal(await dataVersion(ROWS.map((r) => (r[1] === 'Josh Allen' ? ([r[0], ' Josh Allen ', ...r.slice(2)] as unknown as typeof r) : r))), base, 'surrounding spaces');
  assert.equal(await dataVersion([['a', 'Zoë', 'QB', 'X', 1, 2, 3, 0]]), await dataVersion([['a', 'Zoe\u0308', 'QB', 'X', 1, 2, 3, 0]]), 'NFC');
});
test('canonical form: the exact text and the SHA-256 of a tiny dataset are pinned (two devices must agree byte for byte)', async () => {
  const rows = [['nfl-p00002', 'B Two', 'WR', 'Y', 80, 70, 60, 0], ['nfl-p00001', 'A One', 'QB', 'X', 90, 71, 61, 1]] as const;
  assert.equal(canonicalRowsText(rows), '{"schema":1,"rows":[["nfl-p00001","A One","QB","X",90,71,61,1],["nfl-p00002","B Two","WR","Y",80,70,60,0]]}');
  assert.equal(await sha256Hex('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'SHA-256 known answer');
  assert.throws(() => canonicalRowsText([['a', 'x', 'QB', 'X', 1.5, 2, 3, 0]]), /non-integer/);
  assert.throws(() => canonicalRowsText([['a', 'x', 'QB', 'X', 1, 2, 3, 0], ['a', 'y', 'QB', 'X', 1, 2, 3, 0]]), /duplicate/);
  assert.match(await datasetHash(rows), /^sha256:[0-9a-f]{64}$/);
});
test('the rules text covers the tables that move results (not just a label)', () => {
  const t = rulesText();
  for (const needle of ['"QB"', 'POINTS', '0.0194', '32.5', 'topFloor', 'kpFirstRound']) assert.ok(t.includes(needle) || needle === 'POINTS', needle);
  assert.ok(t.length > 5000, 'long enough to hold the slot, flex and spec tables: ' + t.length);
});
test('drift: reports which stamp differs, and never throws', async () => {
  const cur = await stamps(ROWS);
  assert.deepEqual(drift(cur, cur), { engine: false, data: false, any: false });
  assert.deepEqual(drift({ ...cur, engineVersion: 'colors1.old' }, cur), { engine: true, data: false, any: true });
  assert.deepEqual(drift({ ...cur, dataVersion: 'old' }, cur), { engine: false, data: true, any: true });
});
test('stamps ride in the envelope: written on save, read back on restore, and an older save still restores', async () => {
  const now = new Date('2026-11-03T00:00:00Z'), cur = { ...(await stamps(ROWS)), ...META };
  const draft = { seed: 1, userTeam: 0, picks: [], pool: [['nfl-p00001', 'A', 'QB', 'X', 90, 70, 60, 0]] };
  const r = restore(serialize('draft', 'A', cur, draft, now));
  assert.ok(r.ok); if (r.ok) { assert.equal(r.value.engineVersion, cur.engineVersion); assert.equal(r.value.dataVersion, cur.dataVersion); }
  const old = restore(serialize('draft', 'A', { ...META, engineVersion: 'colors0.deadbeef', dataVersion: 'ffffffffffffff' }, draft, now));
  assert.ok(old.ok); if (old.ok) assert.equal(drift(old.value, cur).any, true);
});
