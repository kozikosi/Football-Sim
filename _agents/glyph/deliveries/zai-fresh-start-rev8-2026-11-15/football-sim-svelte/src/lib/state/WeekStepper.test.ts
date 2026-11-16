// WeekStepper.test.ts — Part B's unit battery (Svelte arm): the week FACADE derives engine-true
// week views and standings, asserted against probes/truth.json (node-side, pre-build).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { week } from './weekStore.svelte.ts';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8')) as {
  week: { slots: number; w1: { label: string; game0: { homeAbbr: string; awayAbbr: string; hs: number; as: number } }; wLast: { label: string; game0: { hs: number; as: number } } };
};

describe('Part B week-stepper facade', () => {
  it('boots the season and derives week 1 engine-true', () => {
    week.ensure();
    expect(week.total).toBe(truth.week.slots);
    expect(week.view?.label).toBe(truth.week.w1.label);
    const g0 = week.view?.games[0]!;
    expect(g0.homeAbbr).toBe(truth.week.w1.game0.homeAbbr);
    expect(g0.awayAbbr).toBe(truth.week.w1.game0.awayAbbr);
    expect(g0.hs).toBe(truth.week.w1.game0.hs);
    expect(g0.as).toBe(truth.week.w1.game0.as);
  });
  it('steps next, jumps to the Super Bowl; standings clamp to the 18 regular weeks', () => {
    week.ensure();
    week.next();
    expect(week.slot).toBe(2);
    week.go(truth.week.slots);
    expect(week.view?.label).toBe(truth.week.wLast.label);
    expect(week.view?.games[0]!.hs).toBe(truth.week.wLast.game0.hs);
    expect(week.view?.games[0]!.as).toBe(truth.week.wLast.game0.as);
    expect(week.standings?.throughWeek).toBe(18);
  });
});
