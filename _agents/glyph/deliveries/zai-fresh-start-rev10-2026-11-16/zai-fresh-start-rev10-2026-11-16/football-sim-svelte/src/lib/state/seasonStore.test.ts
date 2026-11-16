// seasonStore.test.ts — Part A (Rev 8): the 11-field season store, BOTH svelte idioms (class bridge
// + module-level facade), asserted against the engine's own outputs: probes/truth.json (node-side,
// pre-build) and probes/season-seed-2027.json (the minted season's champion/finalists).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import { seasonClass } from './seasonStore-class.svelte.ts';
import { seasonFacade } from './seasonStore-facade.svelte.ts';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8')) as {
  week: { slots: number; w1: { label: string; game0: { homeAbbr: string; awayAbbr: string; hs: number; as: number } }; wLast: { label: string; game0: { hs: number; as: number } } };
};
const seed = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/season-seed-2027.json'), 'utf8')) as {
  champion: string; finalists: [string, string]; pickCount: number; year: number;
};

const FIELDS = ['slot', 'ready', 'view', 'total', 'standings', 'champion', 'finalists', 'pickCount', 'seasonYear', 'gamesCount', 'label'] as const;

interface SeasonStoreSurface {
  readonly slot: number;
  readonly ready: boolean;
  readonly view: WeekVM | null;
  readonly total: number;
  readonly standings: StandingsVMw | null;
  readonly champion: string;
  readonly finalists: readonly [string, string] | null;
  readonly pickCount: number;
  readonly seasonYear: number;
  readonly gamesCount: number;
  readonly label: string;
  ensure(): void;
  go(n: number): void;
  next(): void;
  prev(): void;
}

function exercise(store: SeasonStoreSurface, name: string): void {
  describe(`Part A 11-field season store — ${name}`, () => {
    it('exposes all 11 reactive fields', () => {
      for (const f of FIELDS) expect(f in store, `${f} missing`).toBe(true);
    });
    it('boots the fixture league engine-true (1,024 picks; champion + finalists = the minted seed)', () => {
      expect(store.pickCount).toBe(seed.pickCount);
      store.ensure();
      expect(store.ready).toBe(true);
      expect(store.total).toBe(truth.week.slots);
      expect(store.seasonYear).toBe(seed.year);
      expect(store.champion).toBe(seed.champion);
      expect(store.finalists?.[0]).toBe(seed.finalists[0]);
      expect(store.finalists?.[1]).toBe(seed.finalists[1]);
    });
    it('derives week 1 and the Super Bowl from the engine (shared weekVM, no invented fields)', () => {
      store.ensure();
      expect(store.view?.label).toBe(truth.week.w1.label);
      expect(store.gamesCount).toBe(store.view?.games.length);
      const g0 = store.view?.games[0]!;
      expect(g0.homeAbbr).toBe(truth.week.w1.game0.homeAbbr);
      expect(g0.awayAbbr).toBe(truth.week.w1.game0.awayAbbr);
      store.go(store.total);
      expect(store.view?.label).toBe(truth.week.wLast.label);
      expect(store.standings?.throughWeek).toBe(18);
    });
    it('clamps the envelope (go/next/prev) to [1, total]', () => {
      store.ensure();
      store.go(9999);
      expect(store.slot).toBe(store.total);
      store.go(0);
      expect(store.slot).toBe(1);
      store.prev();
      expect(store.slot).toBe(1);
      store.next();
      expect(store.slot).toBe(2);
    });
  });
}

exercise(seasonClass, 'class bridge @11');
exercise(seasonFacade, 'module facade @11');
