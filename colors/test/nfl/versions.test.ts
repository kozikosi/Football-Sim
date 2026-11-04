import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { dataVersion, drift, engineVersion, rulesText, stamps } from '../../src/sports/nfl/app/versions.ts';
import { restore, serialize } from '../../src/sports/nfl/app/saves.ts';
import { hash53 } from '../../src/core/hash.ts';
const rd = (n: string) => fs.readFileSync(new URL('../../../data/nfl/' + n, import.meta.url), 'utf8');
const R = rd('madden27-ratings.csv'), F = rd('free-agents-old-ratings.csv'), I = rd('player-ids.csv');

// PINS. These change on purpose, never by accident: a failure here means the rules (slots, weights, flex table, specs, plan constants, draft
// config) or the data files changed. If that was intended, update the pin in the same commit (and re-pin MERGE-MANIFEST.md for protected constants).
const PIN_ENGINE = 'nfl1.0a5c8e4358a1f5', PIN_DATA = '10fdd634fa8baa';
test('E5 pins: the engine and data stamps are what the last deliberate change left them', () => {
  assert.equal(engineVersion(), PIN_ENGINE, 'rules changed: update PIN_ENGINE on purpose');
  assert.equal(dataVersion(R, F, I), PIN_DATA, 'data changed: update PIN_DATA on purpose');
});
test('hash53: stable, 14 hex digits, and sensitive to one character and to order', () => {
  assert.equal(hash53('abc'), hash53('abc')); assert.match(hash53(''), /^[0-9a-f]{14}$/);
  assert.notEqual(hash53('abc'), hash53('abd')); assert.notEqual(hash53('ab'), hash53('ba')); assert.notEqual(hash53('abc', 1), hash53('abc', 2));
});
test('dataVersion: one changed rating, a swapped file, or a changed crosswalk row changes it; Windows line endings do not', () => {
  const base = dataVersion(R, F, I);
  assert.notEqual(dataVersion(R.replace('Ja\'Marr Chase,WR,Cincinnati Bengals,99', 'Ja\'Marr Chase,WR,Cincinnati Bengals,98'), F, I), base);
  assert.notEqual(dataVersion(F, R, I), base);
  assert.notEqual(dataVersion(R, F, I.replace('nfl-p00001,', 'nfl-p90001,')), base);
  assert.equal(dataVersion(R.replace(/\n/g, '\r\n'), F.replace(/\n/g, '\r\n'), I.replace(/\n/g, '\r\n')), base);
});
test('the rules text covers the tables that move results (not just a label)', () => {
  const t = rulesText();
  for (const needle of ['"QB"', 'POINTS', '0.0194', '32.5', 'topFloor', 'kpFirstRound']) assert.ok(t.includes(needle) || needle === 'POINTS', needle);
  assert.ok(t.length > 5000, 'long enough to hold the slot, flex and spec tables: ' + t.length);
});
test('drift: reports which stamp differs, and never throws', () => {
  const cur = stamps(R, F, I);
  assert.deepEqual(drift(cur, cur), { engine: false, data: false, any: false });
  assert.deepEqual(drift({ ...cur, engineVersion: 'colors1.old' }, cur), { engine: true, data: false, any: true });
  assert.deepEqual(drift({ ...cur, dataVersion: 'old' }, cur), { engine: false, data: true, any: true });
});
test('stamps ride in the envelope: written on save, read back on restore, and an older save still restores', () => {
  const now = new Date('2026-11-03T00:00:00Z'), cur = stamps(R, F, I);
  const draft = { seed: 1, userTeam: 0, picks: [], pool: [['nfl-p00001', 'A', 'QB', 'X', 90, 70, 60, 0]] };
  const r = restore(serialize('draft', 'A', cur, draft, now));
  assert.ok(r.ok); if (r.ok) { assert.equal(r.value.engineVersion, cur.engineVersion); assert.equal(r.value.dataVersion, cur.dataVersion); }
  const old = restore(serialize('draft', 'A', { engineVersion: 'colors0.deadbeef', dataVersion: 'ffffffffffffff' }, draft, now));
  assert.ok(old.ok); if (old.ok) assert.equal(drift(old.value, cur).any, true);
});
