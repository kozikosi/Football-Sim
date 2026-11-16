// weekStore-sealed.ts — the SEALED-RECIPE store (Rev 9 Part C, authored against SEALED-RECIPE.md
// recipe sha 7fcc3fc0…, arm VUE, first in the coin order v,s,v,v). A Pinia setup store holding the
// 11-field surface the recipe fixes. Every derived value re-derives from the engine's own
// SeasonResult through the repos' shared weekVM helpers (weekView, standingsThrough, totalWeekSlots);
// the league of record is the fixture's COMPLETE 1,024-pick draft log (all 32 teams fully drafted —
// not any in-progress draft state), rated engine-true by the shared teamRatingsOf and simulated with
// the engine's own simulateSeason at the 2027 fixture seed. No new engine code. Engine writes nothing
// reactive: the engine snapshots land in a shallowRef and the stores' reactive glue re-derives views.
import { computed, ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';
import DATASET_RATINGS from '../data/madden27-ratings.csv?raw';
import DATASET_FA from '../data/free-agents-old-ratings.csv?raw';
import DATASET_IDS from '../data/player-ids.csv?raw';
import FIXTURE from '../fixture.json';
import { buildPool } from '../engine/sports/nfl/engine/players.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';

// The 2027 fixture (season seed 2027, per probes/season-seed-2027.json — the PROBE asserts against
// that file, never against this constant).
const SEASON_SEED = 2027;
const SEASON_YEAR = 2027;

export interface Fixture {
  seed: number;
  userTeam: number;
  picks: { overall: number; team: number; pid: string; slot: string }[];
}

export const useWeekStoreSealed = defineStore('weekSealed', () => {
  // the league of record: the fixture's complete 1,024-pick draft log, rated and simulated by the
  // shared layer's own engine-true helper (seasonVM.runSeason: the 4-3 optimum, neutral returner,
  // makeRng(seed).fork('season')) — the recipe's shared-helper path, no new engine code.
  const pool = buildPool(DATASET_RATINGS, DATASET_FA, DATASET_IDS);
  const fx = FIXTURE as Fixture;
  const pickCount = fx.picks.length;

  const slot = ref(1);
  const ready = ref(false);
  const season = shallowRef<SeasonResult | null>(null);

  function ensure(): void {
    if (ready.value) return;
    season.value = runSeason(pool, fx.picks, SEASON_SEED, SEASON_YEAR);
    ready.value = true;
  }

  function go(n: number): void {
    ensure();
    const t = season.value ? totalWeekSlots(season.value) : 1;
    slot.value = Math.min(Math.max(1, Math.round(n)), Math.max(1, t));
  }

  const view = computed<WeekVM | null>(() => (season.value ? weekView(season.value, slot.value) : null));
  const total = computed<number>(() => (season.value ? totalWeekSlots(season.value) : 0));
  const standings = computed<StandingsVMw | null>(() => (season.value ? standingsThrough(season.value, slot.value) : null));
  const champion = computed<string>(() => (season.value ? season.value.champion : ''));
  const finalists = computed<[string, string] | null>(() => (season.value ? season.value.finalists : null));
  const gamesCount = computed<number>(() => (view.value ? view.value.games.length : 0));
  const label = computed<string>(() => (view.value ? view.value.label : ''));

  return {
    slot,
    ready,
    view,
    total,
    standings,
    champion,
    finalists,
    pickCount,
    seasonYear: SEASON_YEAR,
    gamesCount,
    label,
    ensure,
    go,
    next: () => go(slot.value + 1),
    prev: () => go(slot.value - 1),
  };
});
