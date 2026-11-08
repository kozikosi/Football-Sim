// Colors-side witness (CICCP-3 Q1/Q4 follow-up). The Colors default weight display IS the fit table (slots.ts = design.json = the Owner's
// salary table), and the engine specs were refitted to it, so agreement between display and engine is by construction.
// That makes the default display a FIT/PRESET, never a "measured impact". This pins the verdict a UI label must follow, using the
// same judge() as the per-build gate (tools/mathlab/witness.mjs). The fit tolerance is the Owner's limit (50 points), not the Pre-Colors
// display step (5): a fitted engine carries a residual, so the caller has to state it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { derivedWeights, measuredDisplayWeights } from '../../src/sports/nfl/engine/value.ts';
import { SLOT_IDS, WEIGHT } from '../../src/sports/nfl/engine/slots.ts';
import { withLegacyCoefficients } from './golden/legacy-coefficients.ts';

const witnessPath = '../../../tools/mathlab/witness.mjs'; // a variable specifier: no declaration file needed, test/ is outside tsc anyway
const { judge } = (await import(witnessPath)) as { judge: (raw: Record<string, number>, disp: Record<string, number>, table: Record<string, number>, slots: readonly string[], tol?: number) => { verdict: string; maxDev: number; worst: string; slots: number; echo: boolean } };
const FIT_TABLE: Record<string, number> = JSON.parse(readFileSync(new URL('../../../tools/mathlab/design.json', import.meta.url), 'utf8'));
const OWNER_FIT_LIMIT = 50; // Owner ruling 6 Nov: measured slotWinsPerOvr within 50 of every weight

const display: Record<string, number> = { ...WEIGHT };
const raw: Record<string, number> = { ...derivedWeights('4-3') };

test('the default display equals the fit table on every slot (nothing in it is a measurement)', () => {
  for (const s of SLOT_IDS) assert.equal(display[s], FIT_TABLE[s], `${s}: display ${display[s]} vs fit table ${FIT_TABLE[s]}`);
  assert.equal(SLOT_IDS.length, Object.keys(FIT_TABLE).length);
});

test('display == fit table and the refitted engine tracks it within the Owner limit -> FITTED (a fit, not independent evidence)', () => {
  const r = judge(raw, display, FIT_TABLE, SLOT_IDS, OWNER_FIT_LIMIT);
  assert.equal(r.verdict, 'FITTED', `got ${r.verdict}, max dev ${r.maxDev.toFixed(1)} at ${r.worst}`);
  assert.equal(r.echo, true);
  assert.equal(r.slots, SLOT_IDS.length);
  assert.ok(r.maxDev <= OWNER_FIT_LIMIT);
});

test('the same display is never MEASURED: only a display that differs from the table and tracks the engine earns that label', () => {
  assert.notEqual(judge(raw, display, FIT_TABLE, SLOT_IDS, OWNER_FIT_LIMIT).verdict, 'MEASURED');
  const measuredDisplay = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.round(raw[s] / 5) * 5])); // what a real measurement shown to the nearest 5 would be
  const r = judge(raw, measuredDisplay, FIT_TABLE, SLOT_IDS); // default tolerance 5: this one is a display step, so the strict default applies
  assert.equal(r.verdict, 'MEASURED');
  assert.equal(r.echo, false);
});

test('a stale fit is caught: display == table but the engine no longer tracks it (legacy coefficients) -> ECHO', () => {
  const stale: Record<string, number> = withLegacyCoefficients(() => ({ ...derivedWeights('4-3') }));
  const r = judge(stale, display, FIT_TABLE, SLOT_IDS, OWNER_FIT_LIMIT);
  assert.equal(r.verdict, 'ECHO');
  assert.ok(r.maxDev > OWNER_FIT_LIMIT);
});

test('the Pre-Colors default tolerance (5) is too tight for a fitted engine: the verdict flips FITTED -> ECHO without the stated 50', () => {
  assert.equal(judge(raw, display, FIT_TABLE, SLOT_IDS).verdict, 'ECHO');
  assert.equal(judge(raw, display, FIT_TABLE, SLOT_IDS, OWNER_FIT_LIMIT).verdict, 'FITTED');
});

test('the default display (measuredDisplayWeights) is MEASURED: QB 1000, nearest 5, not the table, tracks the raw curve', () => {
  const shown: Record<string, number> = { ...measuredDisplayWeights('4-3') };
  assert.equal(shown.QB, 1000);
  for (const s of SLOT_IDS) assert.equal(shown[s] % 5, 0, s);
  const r = judge(raw, shown, FIT_TABLE, SLOT_IDS);
  assert.equal(r.verdict, 'MEASURED', `got ${r.verdict}, max dev ${r.maxDev.toFixed(1)} at ${r.worst}`);
  assert.equal(r.echo, false);
  assert.ok(SLOT_IDS.some((s) => shown[s] !== FIT_TABLE[s]), 'a measurement that equals the table everywhere would be an echo');
});
