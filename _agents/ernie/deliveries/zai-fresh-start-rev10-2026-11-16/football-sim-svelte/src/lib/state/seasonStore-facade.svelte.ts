// seasonStore-facade.svelte.ts — Part A (Rev 8): the MODULE-LEVEL FACADE at store-heavy scale —
// the Part B idiom (weekStore.svelte.ts) scaled to the same 11-field surface as the class twin
// (seasonStore-class.svelte.ts) and the Vue Pinia twin (arm-vue seasonStore11.ts), so the three
// cells measure the IDIOM, not the feature. ONE module-level facade object with getters; the
// reactive primitives are two module-level $state.raw slots (slot, ready); the engine's SeasonResult
// rides plain module state (not reactive — consumers re-render on the primitives, identical
// semantics in all three cells). Every derived field re-derives from the engine's own SeasonResult
// via the shared weekVM — no new engine code, no invented fields.
import { app } from './appStore.svelte.ts';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import { thawPool } from '../engine/sports/nfl/app/store.ts';
import FIXTURE from '../fixture.json';

let season: SeasonResult | null = null;   // plain module state (engine-owned, not reactive)
let slot = $state.raw(1);                 // reactive primitive 1
let ready = $state.raw(false);            // reactive primitive 2

// THE FACADE — 11 reactive fields + the envelope methods (same names as the class twin).
export const seasonFacade = {
  get slot(): number { return slot; },
  get ready(): boolean { return ready; },
  get view(): WeekVM | null { return season ? weekView(season, slot) : null; },
  get total(): number { return season ? totalWeekSlots(season) : 1; },
  get standings(): StandingsVMw | null { return season ? standingsThrough(season, slot) : null; },
  get champion(): string { return season ? season.champion : ''; },
  get finalists(): readonly [string, string] | null { return season ? season.finalists : null; },
  get pickCount(): number { return (FIXTURE as { picks: unknown[] }).picks.length; },
  get seasonYear(): number { return season ? season.year : 2027; },
  get gamesCount(): number { return season ? weekView(season, slot).games.length : 0; },
  get label(): string { return season ? weekView(season, slot).label : ''; },
  ensure(): void {
    if (season) return;
    // THE LEAGUE is the fixture's complete 1,024-pick draft log (the Part B lesson — never the
    // store's in-progress draft picks, which rate a half-drafted league).
    const rec = app.snap!.record!;
    season = runSeason(thawPool(rec.pool), (FIXTURE as { picks: typeof rec.picks }).picks, 2027, 2027);
    ready = true;
  },
  go(n: number): void { this.ensure(); slot = Math.max(1, Math.min(totalWeekSlots(season!), n)); },
  next(): void { this.go(slot + 1); },
  prev(): void { this.go(slot - 1); },
};
