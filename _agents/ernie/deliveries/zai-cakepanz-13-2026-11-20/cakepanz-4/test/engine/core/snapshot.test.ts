import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSnapshot, neutralSnapshot, toNeutral, isNeutral, snapshotHash, snapshotText } from '../../../src/engine/core/snapshot.ts';

const base = { season: 2026, week: 3, packHash: 'sha256:p', engineVersion: 'e1' };

test('key order never changes the hash; any changed value does', () => {
  const a = makeSnapshot({ ...base, form: { p1: 2, p2: -1 }, focus: { t1: 'pass' } });
  const b = makeSnapshot({ ...base, focus: { t1: 'pass' }, form: { p2: -1, p1: 2 } });
  assert.equal(snapshotHash(a), snapshotHash(b));
  assert.notEqual(snapshotHash(a), snapshotHash(makeSnapshot({ ...base, form: { p1: 2, p2: -1.5 }, focus: { t1: 'pass' } })));
  assert.notEqual(snapshotHash(a), snapshotHash(makeSnapshot({ ...base, week: 4, form: { p1: 2, p2: -1 }, focus: { t1: 'pass' } })));
});

test('form 0 is absent: one canonical neutral snapshot', () => {
  const n = neutralSnapshot(2026, 3, 'sha256:p', 'e1');
  const z = makeSnapshot({ ...base, form: { p1: 0, p2: -0 } });
  assert.equal(snapshotText(n), snapshotText(z));
  assert.ok(isNeutral(n) && isNeutral(z));
});

test('toNeutral clears form/focus/flags and keeps identity fields', () => {
  const s = makeSnapshot({ ...base, form: { p1: 3 }, focus: { t1: 'run' }, flags: { x: true } });
  const n = toNeutral(s);
  assert.ok(!isNeutral(s) && isNeutral(n));
  assert.equal(n.packHash, s.packHash); assert.equal(n.week, s.week);
});

test('frozen, and bad input is refused', () => {
  const s = makeSnapshot({ ...base, form: { p1: 1 } });
  assert.throws(() => { (s.form as Record<string, number>).p1 = 9; }, TypeError);
  for (const bad of [{ season: 1.5 }, { week: -1 }, { packHash: '' }, { form: { p: NaN } }, { form: { p: 1e6 } }, { focus: { t: '' } }, { flags: { f: 1 as unknown as boolean } }])
    assert.throws(() => makeSnapshot({ ...base, ...bad }));
});
