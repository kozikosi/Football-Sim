// WeekStepper.test.ts — Part B's unit battery: the week store derives engine-true week views and
// standings-through-week, asserted against probes/truth.json (node-side, pre-build).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWeekStore } from './weekStore';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8')) as {
  week: { slots: number; w1: { label: string; gameCount: number; game0: { homeAbbr: string; awayAbbr: string; hs: number; as: number } }; wLast: { label: string; game0: { homeAbbr: string; awayAbbr: string; hs: number; as: number } }; thru10: { top: { abbr: string; w: number; l: number }; rowCount: number } };
};

describe('Part B week-stepper store', () => {
  it('boots the season and derives week 1 engine-true', () => {
    setActivePinia(createPinia());
    const wk = useWeekStore();
    wk.ensureSeason();
    expect(wk.weekTotal).toBe(truth.week.slots);
    expect(wk.week?.label).toBe(truth.week.w1.label);
    const g0 = wk.week?.games[0]!;
    expect(g0.homeAbbr).toBe(truth.week.w1.game0.homeAbbr);
    expect(g0.awayAbbr).toBe(truth.week.w1.game0.awayAbbr);
    expect(g0.hs).toBe(truth.week.w1.game0.hs);
    expect(g0.as).toBe(truth.week.w1.game0.as);
  });
  it('steps next to week 2, jumps to the Super Bowl, and standings-through-10 lead is engine-true', () => {
    setActivePinia(createPinia());
    const wk = useWeekStore();
    wk.ensureSeason();
    wk.weekNext();
    expect(wk.weekSlot).toBe(2);
    wk.weekGo(truth.week.slots);
    expect(wk.week?.label).toBe(truth.week.wLast.label);
    const sb = wk.week?.games[0]!;
    expect(sb.hs).toBe(truth.week.wLast.game0.hs);
    expect(sb.as).toBe(truth.week.wLast.game0.as);
    expect(wk.standings?.throughWeek).toBe(18);   // standings clamp to the 18 REGULAR weeks (playoff slots don't add wins)
  });
});
