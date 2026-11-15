// seasonStore11.ts — Part A (Rev 8): the PINIA SETUP STORE at store-heavy scale — the same 11-field
// surface as the Svelte class twin (seasonStore-class.svelte.ts) and facade twin
// (seasonStore-facade.svelte.ts), so the three cells measure the IDIOM, not the feature:
//   slot, ready, view, total, standings, champion, finalists, pickCount, seasonYear, gamesCount, label
// + the envelope methods ensure/go/next/prev. shallowRef holds the engine's SeasonResult (external
// object — same idiom as the app store and the week store); computeds re-derive from it via the
// shared weekVM. Engine-true: no new engine code, no invented fields.
import { computed, ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import { thawPool } from '../engine/sports/nfl/app/store.ts';
import { useAppStore } from './appStore';
import FIXTURE from '../fixture.json';

export const useSeasonStore11 = defineStore('season11', () => {
  const app = useAppStore();
  const season = shallowRef<SeasonResult | null>(null);   // engine-owned, not deep-reactive
  const slot = ref(1);                                    // reactive primitive 1
  const ready = ref(false);                               // reactive primitive 2

  // ---- the 11 reactive fields ----
  const view = computed<WeekVM | null>(() => (season.value ? weekView(season.value, slot.value) : null));
  const total = computed(() => (season.value ? totalWeekSlots(season.value) : 1));
  const standings = computed<StandingsVMw | null>(() => (season.value ? standingsThrough(season.value, slot.value) : null));
  const champion = computed(() => (season.value ? season.value.champion : ''));
  const finalists = computed<readonly [string, string] | null>(() => (season.value ? season.value.finalists : null));
  const pickCount = computed(() => (FIXTURE as { picks: unknown[] }).picks.length);
  const seasonYear = computed(() => (season.value ? season.value.year : 2027));
  const gamesCount = computed(() => (view.value ? view.value.games.length : 0));
  const label = computed(() => (view.value ? view.value.label : ''));

  // ---- the envelope methods (same names as the Svelte twins) ----
  function ensure(): void {
    if (season.value) return;
    // THE LEAGUE is the fixture's complete 1,024-pick draft log (the Part B lesson — never the
    // store's in-progress draft picks, which rate a half-drafted league).
    const rec = app.draftSnap.record!;
    season.value = runSeason(thawPool(rec.pool), (FIXTURE as { picks: typeof rec.picks }).picks, 2027, 2027);
    ready.value = true;
  }
  function go(n: number): void { ensure(); slot.value = Math.max(1, Math.min(total.value, n)); }
  function next(): void { go(slot.value + 1); }
  function prev(): void { go(slot.value - 1); }

  return { season, slot, ready, view, total, standings, champion, finalists, pickCount, seasonYear, gamesCount, label, ensure, go, next, prev };
});
