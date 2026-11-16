// seasonStore11.test.ts — Part A (Rev 8): the 11-field Pinia season store, asserted against the
// engine's own outputs: probes/truth.json (node-side, pre-build) and probes/season-seed-2027.json
// (the minted season's champion/finalists). Same assertions as the svelte twins' seasonStore.test.ts.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSeasonStore11 } from './seasonStore11';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8')) as {
  week: { slots: number; w1: { label: string; game0: { homeAbbr: string; awayAbbr: string; hs: number; as: number } }; wLast: { label: string; game0: { hs: number; as: number } } };
};
const seed = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/season-seed-2027.json'), 'utf8')) as {
  champion: string; finalists: [string, string]; pickCount: number; year: number;
};

const FIELDS = ['slot', 'ready', 'view', 'total', 'standings', 'champion', 'finalists', 'pickCount', 'seasonYear', 'gamesCount', 'label'] as const;

describe('Part A 11-field season store — Pinia @11', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('exposes all 11 reactive fields', () => {
    const s = useSeasonStore11();
    for (const f of FIELDS) expect(f in s, `${f} missing`).toBe(true);
  });
  it('boots the fixture league engine-true (1,024 picks; champion + finalists = the minted seed)', () => {
    const s = useSeasonStore11();
    expect(s.pickCount).toBe(seed.pickCount);
    s.ensure();
    expect(s.ready).toBe(true);
    expect(s.total).toBe(truth.week.slots);
    expect(s.seasonYear).toBe(seed.year);
    expect(s.champion).toBe(seed.champion);
    expect(s.finalists?.[0]).toBe(seed.finalists[0]);
    expect(s.finalists?.[1]).toBe(seed.finalists[1]);
  });
  it('derives week 1 and the Super Bowl from the engine (shared weekVM, no invented fields)', () => {
    const s = useSeasonStore11();
    s.ensure();
    expect(s.view?.label).toBe(truth.week.w1.label);
    expect(s.gamesCount).toBe(s.view?.games.length);
    const g0 = s.view?.games[0]!;
    expect(g0.homeAbbr).toBe(truth.week.w1.game0.homeAbbr);
    expect(g0.awayAbbr).toBe(truth.week.w1.game0.awayAbbr);
    s.go(s.total);
    expect(s.view?.label).toBe(truth.week.wLast.label);
    expect(s.standings?.throughWeek).toBe(18);
  });
  it('clamps the envelope (go/next/prev) to [1, total]', () => {
    const s = useSeasonStore11();
    s.ensure();
    s.go(9999);
    expect(s.slot).toBe(s.total);
    s.go(0);
    expect(s.slot).toBe(1);
    s.prev();
    expect(s.slot).toBe(1);
    s.next();
    expect(s.slot).toBe(2);
  });
});
