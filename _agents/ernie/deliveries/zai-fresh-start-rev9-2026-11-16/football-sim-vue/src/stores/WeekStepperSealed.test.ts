// WeekStepperSealed.test.ts — the SEALED-RECIPE unit gate (arm VUE): the store boots the fixture
// league and every asserted value is string-equal to probes/truth.json / probes/season-seed-2027.json
// (engine-true — never constants written by hand).
import { describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { useWeekStoreSealed } from './weekStore-sealed';

// the unit runner executes from the repo root (npm scripts), so the probe files are cwd-relative
const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8'));
const seed = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/season-seed-2027.json'), 'utf8'));

describe('weekStore-sealed (the sealed recipe, arm vue)', () => {
  it('boots the fixture league and passes the recipe contract', () => {
    setActivePinia(createPinia());
    const week = useWeekStoreSealed();
    expect(week.ready).toBe(false);
    week.ensure();
    expect(week.ready).toBe(true);
    expect(week.total).toBe(truth.week.slots);
    expect(week.label).toBe(truth.week.w1.label);
    const g0 = week.view!.games[0]!;
    expect(`${g0.homeAbbr} ${g0.hs} @ ${g0.as} ${g0.awayAbbr}`).toBe(
      `${truth.week.w1.game0.homeAbbr} ${truth.week.w1.game0.hs} @ ${truth.week.w1.game0.as} ${truth.week.w1.game0.awayAbbr}`,
    );
    week.go(week.total);
    expect(week.label).toBe(truth.week.wLast.label);
    const sb = week.view!.games[0]!;
    expect(sb.homeAbbr).toBe(truth.week.wLast.game0.homeAbbr);
    expect(sb.hs).toBe(truth.week.wLast.game0.hs);
    expect(sb.as).toBe(truth.week.wLast.game0.as);
    // standings clamp to the 18 regular weeks
    week.go(99);
    expect(week.slot).toBe(week.total);
    expect(week.standings!.throughWeek).toBe(18);
    expect(week.standings!.league.length).toBe(32);
    // champion/finalists/pickCount/seasonYear equal the seed file
    expect(week.champion).toBe(seed.champion);
    expect(week.finalists).toEqual(seed.finalists);
    expect(week.pickCount).toBe(seed.pickCount);
    expect(week.seasonYear).toBe(seed.year);
    // reads are LIVE: next() re-derives without re-fetching
    week.go(1);
    const before = week.view!.week;
    week.next();
    expect(week.view!.week).toBe(before + 1);
    week.prev();
    expect(week.view!.week).toBe(before);
    // idempotent ensure
    week.ensure();
    expect(week.ready).toBe(true);
  });
});
