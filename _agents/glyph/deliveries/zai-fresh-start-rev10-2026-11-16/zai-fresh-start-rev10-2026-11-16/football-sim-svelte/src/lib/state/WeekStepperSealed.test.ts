// WeekStepperSealed.test.ts — the SEALED-RECIPE unit gate (arm SVELTE): the store boots the fixture
// league and every asserted value is string-equal to probes/truth.json / probes/season-seed-2027.json.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { weekSealed } from './weekStore-sealed.svelte.ts';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8'));
const seed = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/season-seed-2027.json'), 'utf8'));

describe('weekStore-sealed (the sealed recipe, arm svelte)', () => {
  it('boots the fixture league and passes the recipe contract', () => {
    expect(weekSealed.ready).toBe(false);
    weekSealed.ensure();
    expect(weekSealed.ready).toBe(true);
    expect(weekSealed.total).toBe(truth.week.slots);
    expect(weekSealed.label).toBe(truth.week.w1.label);
    const g0 = weekSealed.view!.games[0]!;
    expect(`${g0.homeAbbr} ${g0.hs} @ ${g0.as} ${g0.awayAbbr}`).toBe(
      `${truth.week.w1.game0.homeAbbr} ${truth.week.w1.game0.hs} @ ${truth.week.w1.game0.as} ${truth.week.w1.game0.awayAbbr}`,
    );
    weekSealed.go(weekSealed.total);
    expect(weekSealed.label).toBe(truth.week.wLast.label);
    const sb = weekSealed.view!.games[0]!;
    expect(sb.homeAbbr).toBe(truth.week.wLast.game0.homeAbbr);
    expect(sb.hs).toBe(truth.week.wLast.game0.hs);
    expect(sb.as).toBe(truth.week.wLast.game0.as);
    weekSealed.go(99);
    expect(weekSealed.slot).toBe(weekSealed.total);
    expect(weekSealed.standings!.throughWeek).toBe(18);
    expect(weekSealed.standings!.league.length).toBe(32);
    expect(weekSealed.champion).toBe(seed.champion);
    expect(weekSealed.finalists).toEqual(seed.finalists);
    expect(weekSealed.pickCount).toBe(seed.pickCount);
    expect(weekSealed.seasonYear).toBe(seed.year);
    weekSealed.go(1);
    const before = weekSealed.view!.week;
    weekSealed.next();
    expect(weekSealed.view!.week).toBe(before + 1);
    weekSealed.prev();
    expect(weekSealed.view!.week).toBe(before);
    weekSealed.ensure();
    expect(weekSealed.ready).toBe(true);
  });
});
