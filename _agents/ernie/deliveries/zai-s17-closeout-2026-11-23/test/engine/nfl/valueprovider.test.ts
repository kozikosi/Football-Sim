import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOTS, SLOT_IDS, WEIGHT, fieldSlots } from '../../../src/engine/sports/nfl/engine/slots.ts';
import { DEFAULT_VALUES, WINS_PER_UNIT, measuredValues, tableValues } from '../../../src/engine/sports/nfl/engine/valueprovider.ts';
import { WEIGHT_UNIT_WINS, slotWins20 } from '../../../src/engine/sports/nfl/engine/value.ts';
import { WINS_PER_UNIT as LINEUP_WINS_PER_UNIT, lineupFor } from '../../../src/engine/sports/nfl/engine/lineup.ts';
import { DEFAULT_CONFIG, candidates, newDraft } from '../../../src/engine/sports/nfl/engine/draft.ts';
import { makeRng } from '../../../src/engine/core/rng.ts';
import { pool } from './fixture.ts';

// P-318: what a spot is worth sits behind one seam. These tests are about the seam and its units; no weight is pinned (Owner: no gates on weights).

test('provider: WINS_PER_UNIT is a literal (value.ts is in an import cycle with it) and must equal value.ts WEIGHT_UNIT_WINS / 20; lineup re-exports the same number', () => {
  assert.equal(WINS_PER_UNIT, WEIGHT_UNIT_WINS / 20);
  assert.equal(LINEUP_WINS_PER_UNIT, WINS_PER_UNIT);
});

test('provider: the default is MEASURED, equals slotWins20 / 20 to the 1e-9 rounding, in every spot and both bases', () => {
  for (const base of ['4-3', '3-4'] as const) for (const id of SLOT_IDS) {
    const m = DEFAULT_VALUES.winsPerOvr(id, base), raw = slotWins20(id, base) / 20;
    assert.ok(Number.isFinite(m) && m > 0, `${id} ${base}: ${m}`);
    assert.ok(Math.abs(m - raw) <= 5e-10, `${id} ${base}: ${m} vs ${raw}`);
  }
  assert.equal(DEFAULT_VALUES.name, 'measured');
});

test('provider: values are rounded to a 1e-9 grid (a last-bit difference between engines cannot move them), and a fresh provider repeats the default exactly', () => {
  const fresh = measuredValues();
  for (const id of SLOT_IDS) {
    const m = DEFAULT_VALUES.winsPerOvr(id, '4-3');
    assert.equal(Math.round(m * 1e9) / 1e9, m, id);
    assert.equal(fresh.winsPerOvr(id, '4-3'), m, id);
  }
});

test('provider: the same position carries the same value in both bases (Owner 2 Nov), to within one fitted-weight unit', () => {
  for (const f of fieldSlots('3-4')) {
    const a = DEFAULT_VALUES.winsPerOvr(f.row, '4-3') / WINS_PER_UNIT, b = DEFAULT_VALUES.winsPerOvr(f.row, '3-4') / WINS_PER_UNIT;
    assert.ok(Math.abs(a - b) <= 1, `${f.slot}: 4-3 ${a.toFixed(2)} vs 3-4 ${b.toFixed(2)}`);
  }
});

test('provider: tableValues() round-trips the retired table EXACTLY through the solver unit (value / WINS_PER_UNIT === weight), so it reproduces the old arithmetic bit for bit', () => {
  const t = tableValues();
  for (const s of SLOTS) assert.equal(t.winsPerOvr(s.id, '4-3') / WINS_PER_UNIT, s.weight, s.id);
});

test('QB-first: QB has the largest measured value of any spot (REPORTED, not a gate; Owner: "a qb generally still needs to be the most important player")', (t) => {
  const v = SLOT_IDS.map((id) => [id, DEFAULT_VALUES.winsPerOvr(id, '4-3')] as const).sort((a, b) => b[1] - a[1]);
  const [top, second] = [v[0]!, v[1]!];
  const holds = top[0] === 'QB';
  t.diagnostic(`REPORT (not a gate): QB-first ${holds ? 'HOLDS' : 'VIOLATED, FOR OWNER REVIEW'}: largest = ${top[0]} (${(top[1] / WINS_PER_UNIT).toFixed(1)} units, QB = 1000 scale), next = ${second[0]} (${(second[1] / WINS_PER_UNIT).toFixed(1)}); QB / next = ${(DEFAULT_VALUES.winsPerOvr('QB', '4-3') / second[1]).toFixed(3)}x`);
  assert.equal(v.length, 32);
});

test('seam: draft candidates ask the provider (wins = value per OVR x (eff - replacement)); the table provider reproduces weight x WINS_PER_UNIT x (eff - replacement)', () => {
  const st = newDraft(pool, makeRng(7).fork('draft'), DEFAULT_CONFIG);
  const viaTable = candidates(st, 0, tableValues()), viaDefault = candidates(st, 0);
  assert.equal(viaTable.length, viaDefault.length);
  assert.ok(viaTable.length > 50);
  for (let i = 0; i < viaTable.length; i++) {
    const a = viaTable[i]!, b = viaDefault[i]!;
    assert.equal(a.player.id, b.player.id); assert.equal(a.slot, b.slot);
    const rl = a.eff - a.wins / (WEIGHT[a.slot] * WINS_PER_UNIT);   // recover the replacement level from the table value
    assert.ok(Math.abs(b.wins - (DEFAULT_VALUES.winsPerOvr(b.slot, '4-3')) * (b.eff - rl)) <= 1e-6, `${a.player.id} ${a.slot}`);
  }
});

test('seam: the provider drives placement (rearrangement): the best receiver plays the most valuable WR spot, whichever spot the provider prizes', () => {
  const roster = pool.filter((p) => p.team === 'Kansas City Chiefs');
  const effs = (l: ReturnType<typeof lineupFor>) => Object.fromEntries(['WR1', 'WR2', 'WR3', 'WR4'].map((id) => [id, l.placements.find((p) => p.slot.slot === id)!.effOvr])) as Record<string, number>;
  const byDefault = effs(lineupFor(roster, '4-3'));
  assert.equal(byDefault.WR1, Math.max(...Object.values(byDefault)), 'default: WR1 is the most valuable WR spot, so it holds the best receiver');
  const prizeWr4 = { name: 'wr4-first', winsPerOvr: (row: string) => (row === 'WR4' ? 0.5 : 0.01) };
  const flipped = effs(lineupFor(roster, '4-3', prizeWr4 as never));
  assert.equal(flipped.WR4, Math.max(...Object.values(flipped)), 'a provider that prizes WR4 puts the best receiver there');
  assert.ok(flipped.WR4 >= byDefault.WR1 - 12, 'and he is the same calibre of player, not a flex-priced stand-in');
});

// S1 seam + S3 snapshot (Owner ruling Q7: Wins are evaluated at the neutral snapshot and never move in-season).
import { makeSnapshot, neutralSnapshot } from '../../../src/engine/core/snapshot.ts';
import { SLOT_IDS as SEAM_SLOTS } from '../../../src/engine/sports/nfl/engine/slots.ts';
import { measuredValues as seamMeasured, tableValues as seamTable } from '../../../src/engine/sports/nfl/engine/valueprovider.ts';
import type { ValueProvider as SeamProvider } from '../../../src/engine/sports/nfl/engine/valueprovider.ts';
import { test as seamTest } from 'node:test';
import seamAssert from 'node:assert/strict';

seamTest('Q7 law: measured and table providers return the same value for the neutral snapshot and a loaded one, every slot and base', () => {
  const neutral = neutralSnapshot(2026, 5, 'sha256:p', 'e1');
  const loaded = makeSnapshot({ season: 2026, week: 5, packHash: 'sha256:p', engineVersion: 'e1', form: { p1: 5, p2: -5 }, focus: { t1: 'pass' }, flags: { x: true } });
  for (const prov of [seamMeasured(), seamTable()]) for (const base of ['4-3', '3-4'] as const) for (const s of SEAM_SLOTS)
    seamAssert.equal(prov.winsPerOvr(s, base, loaded), prov.winsPerOvr(s, base, neutral), `${prov.name} ${base} ${s}`);
  for (const prov of [seamMeasured(), seamTable()]) seamAssert.equal(prov.winsPerOvr('QB', '4-3', loaded), prov.winsPerOvr('QB', '4-3'));
});

seamTest('the seam carries the snapshot: a context-aware provider can read it, the call sites can pass it', () => {
  let seen: unknown = null;
  const aware: SeamProvider = { name: 'aware', winsPerOvr: (_r, _b, snap) => { seen = snap; return snap && snap.form['p1'] ? 2 : 1; } };
  const loaded = makeSnapshot({ season: 1, week: 1, packHash: 'h', engineVersion: 'e', form: { p1: 3 } });
  seamAssert.equal(aware.winsPerOvr('QB', '4-3', loaded), 2);
  seamAssert.equal(seen, loaded);
  seamAssert.equal(aware.winsPerOvr('QB', '4-3'), 1);
});
