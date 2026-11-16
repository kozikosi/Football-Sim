// weekStore.svelte.ts — the week-stepper's store (Part B, the store-heavy tie-breaker), built with
// the FACADE idiom (Ernie F5): ONE module-level facade object with getters — not one wrapper per
// export. The module-level reactive is a single $state.raw (a number — no deep proxy needed); the
// facade reads it and derives the engine views. The season object is plain (engine-owned).
// The week state MOVED here from appStore (the Part B refactor): a store-heavy surface gets its
// own store file — this is the file every future season sitting will live in.
import { app } from './appStore.svelte.ts';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import { thawPool } from '../engine/sports/nfl/app/store.ts';
import FIXTURE from '../fixture.json';

let season: SeasonResult | null = null;            // plain module state (engine-owned, not reactive)
let slot = $state.raw(1);                          // THE one module-level reactive (raw: a number)
let ready = $state.raw(false);

// THE FACADE — one object, paid once. Consumers read `week.slot`, `week.view`, call `week.next()`.
export const week = {
  get slot(): number { return slot; },
  get ready(): boolean { return ready; },
  get view(): WeekVM | null { return season ? weekView(season, slot) : null; },
  get total(): number { return season ? totalWeekSlots(season) : 1; },
  get standings(): StandingsVMw | null { return season ? standingsThrough(season, slot) : null; },
  ensure(): void {
    if (season) return;
    // THE LEAGUE is the fixture's complete 1,024-pick draft log (same record as the feed) — not the
    // store's in-progress draft picks (root-caused by the battery in the Vue arm; see receipt).
    const rec = app.snap!.record!;
    season = runSeason(thawPool(rec.pool), (FIXTURE as { picks: typeof rec.picks }).picks, 2027, 2027);
    ready = true;
  },
  go(n: number): void { this.ensure(); slot = Math.max(1, Math.min(this.total, n)); },
  next(): void { this.go(slot + 1); },
  prev(): void { this.go(slot - 1); },
};
