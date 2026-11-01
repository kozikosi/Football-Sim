// Port verification: the amused NFL data must equal the council's sources exactly.
// Run from the repo root: node --test --experimental-strip-types \
//   _agents/muse/amused/packages/sport-nfl/test/port.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SLOTS, WEIGHT, fieldSlots, EMPTY_OVR } from '../src/slots.ts';
import { FLEX, EMERGENCY_PENALTY, fit } from '../src/flex.ts';
import { NFL } from '../src/nfl.ts';

const ROOT = new URL('../../../../../../', import.meta.url); // repo root
const readJSON = (rel: string) => JSON.parse(fs.readFileSync(new URL(rel, ROOT), 'utf8'));

test('slots: 32 spots equal tools/mathlab/design.json exactly', () => {
  const design: Record<string, number> = readJSON('tools/mathlab/design.json');
  assert.equal(SLOTS.length, 32);
  assert.deepEqual(Object.keys(design).sort(), SLOTS.map((s) => s.id).sort());
  for (const s of SLOTS) assert.equal(s.weight, design[s.id], s.id);
  assert.equal(WEIGHT.QB, 1000);
});

test('flex: every rule equals tools/mathlab/flex.json', () => {
  const guide: Record<string, Record<string, number>> = readJSON('tools/mathlab/flex.json').flex;
  for (const role of Object.keys(guide)) assert.deepEqual(FLEX[role as keyof typeof FLEX] ?? {}, guide[role], role);
  assert.equal(EMERGENCY_PENALTY, 8);
  assert.deepEqual(fit('QB', 'FS'), { penalty: 10, emergency: false, legal: true });
});

test('3-4 mapping matches the engine (DT2->ILB2, WILL->OLB1, SAM->OLB2)', () => {
  const three = Object.fromEntries(fieldSlots('3-4').map((f) => [f.slot, f]));
  assert.equal(three.DT2.weight, 260); assert.equal(three.DT2.label, 'ILB2');
  assert.equal(three.SAM.weight, 300); assert.equal(three.SAM.label, 'OLB2');
  assert.equal(three.WILL.label, 'OLB1'); assert.equal(three.DT1.label, 'NT');
});

test('SportSpec wiring: id, bases, emptyOvr, validation', () => {
  assert.equal(NFL.id, 'nfl');
  assert.deepEqual([...NFL.bases], ['4-3', '3-4']);
  assert.equal(NFL.emptyOvr, EMPTY_OVR);
  assert.equal(NFL.emptyOvr, 70);
  assert.deepEqual(NFL.validateScenario({ sportId: 'nfl', competitionId: 'nfl-2026', rulesetVersion: 'rev5', dataVersion: 'w52', seed: 42 }), []);
  assert.ok(NFL.validateScenario({ sportId: 'nba', competitionId: 'x', rulesetVersion: 'x', dataVersion: 'x', seed: 1 }).length > 0);
  assert.throws(() => NFL.simulate({ sportId: 'nfl', competitionId: 'nfl-2026', rulesetVersion: 'rev5', dataVersion: 'w52', seed: 1 }, null as never), /game model pending/);
});
