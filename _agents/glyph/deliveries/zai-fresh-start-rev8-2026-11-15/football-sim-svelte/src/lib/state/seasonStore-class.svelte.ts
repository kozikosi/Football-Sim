// seasonStore-class.svelte.ts — Part A (Rev 8): the CLASS BRIDGE at store-heavy scale — the store
// shape the house rules name as the standard (CLAUDE.md §2: ".svelte.ts classes with $state holding
// snapshots returned by the engine") and the one shape no prior sitting measured (Q3: NOT RUN).
// Same 11-field surface as the facade twin (seasonStore-facade.svelte.ts) and the Vue Pinia twin
// (arm-vue seasonStore11.ts), so the three cells measure the IDIOM, not the feature:
//   slot, ready, view, total, standings, champion, finalists, pickCount, seasonYear, gamesCount, label
// + the envelope methods ensure/go/next/prev. Engine-true: every derived field re-derives from the
// engine's own SeasonResult via the shared weekVM (no new engine code, no invented fields).
// `season` is a plain field (engine-owned, not reactive) exactly like the facade twin's module state:
// consumers re-render on the reactive primitives (slot/ready), same semantics in all three cells.
import { app } from './appStore.svelte.ts';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import { thawPool } from '../engine/sports/nfl/app/store.ts';
import FIXTURE from '../fixture.json';

export class SeasonStoreClass {
  season: SeasonResult | null = null;   // plain (engine-owned, not reactive) — same as the facade twin
  slot = $state.raw(1);                 // raw: a number — no deep proxy needed (the slice-a lesson)
  ready = $state.raw(false);

  // ---- the 11 reactive fields ----
  get view(): WeekVM | null { return this.season ? weekView(this.season, this.slot) : null; }
  get total(): number { return this.season ? totalWeekSlots(this.season) : 1; }
  get standings(): StandingsVMw | null { return this.season ? standingsThrough(this.season, this.slot) : null; }
  get champion(): string { return this.season ? this.season.champion : ''; }
  get finalists(): readonly [string, string] | null { return this.season ? this.season.finalists : null; }
  get pickCount(): number { return (FIXTURE as { picks: unknown[] }).picks.length; }
  get seasonYear(): number { return this.season ? this.season.year : 2027; }
  get gamesCount(): number { const v = this.view; return v ? v.games.length : 0; }
  get label(): string { const v = this.view; return v ? v.label : ''; }
  // (slot, ready — the two $state primitives above — complete the 11.)

  // ---- the envelope methods (same names as the facade twin) ----
  ensure(): void {
    if (this.season) return;
    // THE LEAGUE is the fixture's complete 1,024-pick draft log (the Part B lesson — never the
    // store's in-progress draft picks, which rate a half-drafted league).
    const rec = app.snap!.record!;
    this.season = runSeason(thawPool(rec.pool), (FIXTURE as { picks: typeof rec.picks }).picks, 2027, 2027);
    this.ready = true;
  }
  go(n: number): void { this.ensure(); this.slot = Math.max(1, Math.min(this.total, n)); }
  next(): void { this.go(this.slot + 1); }
  prev(): void { this.go(this.slot - 1); }
}

export const seasonClass = new SeasonStoreClass();
