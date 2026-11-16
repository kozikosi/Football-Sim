// WeekStepperSealedReactive.test.ts — the 2×2 cell's contract gate (Rev 10 EXT C): the SAME
// assertions as WeekStepperSealed.test.ts, pointed at the module-facade variant of the sealed
// store (weekStore-sealed-reactive.svelte.ts). New file this sitting; no existing test touched.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { weekSealedReactive } from './weekStore-sealed-reactive.svelte.ts';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8'));
const seed = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/season-seed-2027.json'), 'utf8'));

describe('weekStore-sealed-reactive (the 2x2 facade cell, arm svelte)', () => {
  it('boots the fixture league and passes the same recipe contract', () => {
    expect(weekSealedReactive.ready).toBe(false);
    weekSealedReactive.ensure();
    expect(weekSealedReactive.ready).toBe(true);
    expect(weekSealedReactive.total).toBe(truth.week.slots);
    expect(weekSealedReactive.label).toBe(truth.week.w1.label);
    const g0 = weekSealedReactive.view!.games[0]!;
    expect(`${g0.homeAbbr} ${g0.hs} @ ${g0.as} ${g0.awayAbbr}`).toBe(
      `${truth.week.w1.game0.homeAbbr} ${truth.week.w1.game0.hs} @ ${truth.week.w1.game0.as} ${truth.week.w1.game0.awayAbbr}`,
    );
    weekSealedReactive.go(weekSealedReactive.total);
    expect(weekSealedReactive.label).toBe(truth.week.wLast.label);
    const sb = weekSealedReactive.view!.games[0]!;
    expect(sb.homeAbbr).toBe(truth.week.wLast.game0.homeAbbr);
    expect(sb.hs).toBe(truth.week.wLast.game0.hs);
    expect(sb.as).toBe(truth.week.wLast.game0.as);
    weekSealedReactive.go(99);
    expect(weekSealedReactive.slot).toBe(weekSealedReactive.total);
    expect(weekSealedReactive.standings!.throughWeek).toBe(18);
    expect(weekSealedReactive.standings!.league.length).toBe(32);
    expect(weekSealedReactive.champion).toBe(seed.champion);
    expect(weekSealedReactive.finalists).toEqual(seed.finalists);
    expect(weekSealedReactive.pickCount).toBe(seed.pickCount);
    expect(weekSealedReactive.seasonYear).toBe(seed.year);
    weekSealedReactive.go(1);
    const before = weekSealedReactive.view!.week;
    weekSealedReactive.next();
    expect(weekSealedReactive.view!.week).toBe(before + 1);
    weekSealedReactive.prev();
    expect(weekSealedReactive.view!.week).toBe(before);
    weekSealedReactive.ensure();
    expect(weekSealedReactive.ready).toBe(true);
  });
});
