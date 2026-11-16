// weekStore.ts — the week-stepper's store (Part B, the store-heavy tie-breaker): season state,
// current week, and the derived views (games, standings-through-week) as computeds over the shared
// weekVM. The season rides a shallowRef (external engine object, same idiom as the app store).
// The week state MOVED here from appStore (the Part B refactor): a store-heavy surface gets its
// own store file — this is the file every future season sitting will live in.
import { computed, ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import { thawPool } from '../engine/sports/nfl/app/store.ts';
import { useAppStore } from './appStore';
import FIXTURE from '../fixture.json';

export const useWeekStore = defineStore('week', () => {
  const app = useAppStore();
  const season = shallowRef<SeasonResult | null>(null);
  const weekSlot = ref(1);

  const week = computed<WeekVM | null>(() => (season.value ? weekView(season.value, weekSlot.value) : null));
  const weekTotal = computed(() => (season.value ? totalWeekSlots(season.value) : 1));
  const standings = computed<StandingsVMw | null>(() => (season.value ? standingsThrough(season.value, weekSlot.value) : null));

  function ensureSeason(): void {
    if (season.value) return;
    // THE LEAGUE is the fixture's complete 1,024-pick draft log (the same record bootData's feed
    // plays) — NOT the store's in-progress draft picks (20 CPU pre-picks), which would rate a
    // half-drafted league and play a DIFFERENT season. Engine-true either way; the fixture is the
    // league of record. (Root-caused by the battery: app SB WAS@IND vs truth HOU-ATL.)
    const rec = app.draftSnap.record!;
    season.value = runSeason(thawPool(rec.pool), (FIXTURE as { picks: typeof rec.picks }).picks, 2027, 2027);
  }
  function weekGo(slot: number): void { ensureSeason(); weekSlot.value = Math.max(1, Math.min(weekTotal.value, slot)); }
  function weekNext(): void { weekGo(weekSlot.value + 1); }
  function weekPrev(): void { weekGo(weekSlot.value - 1); }

  return { season, weekSlot, week, weekTotal, standings, ensureSeason, weekGo, weekNext, weekPrev };
});
