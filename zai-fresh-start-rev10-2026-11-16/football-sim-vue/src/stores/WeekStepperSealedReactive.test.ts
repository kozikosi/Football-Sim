// WeekStepperSealedReactive.test.ts — the delta measurement's unit gate: the reactive({...}) module
// store passes the SAME contract (so any delta is the WRAPPER, not the reactivity model).
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { weekSealedReactive } from './weekStore-sealed-reactive';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8'));
const seed = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/season-seed-2027.json'), 'utf8'));

describe('weekStore-sealed-reactive (the delta arm)', () => {
  it('passes the same contract without Pinia', () => {
    expect(weekSealedReactive.ready).toBe(false);
    weekSealedReactive.ensure();
    expect(weekSealedReactive.ready).toBe(true);
    expect(weekSealedReactive.total).toBe(truth.week.slots);
    expect(weekSealedReactive.label).toBe(truth.week.w1.label);
    weekSealedReactive.go(weekSealedReactive.total);
    expect(weekSealedReactive.label).toBe(truth.week.wLast.label);
    expect(weekSealedReactive.champion).toBe(seed.champion);
    weekSealedReactive.go(1);
    weekSealedReactive.next();
    expect(weekSealedReactive.view!.week).toBe(2);
  });
});
