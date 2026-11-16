// weekStore-wrappers.svelte.ts — the WRAPPER-PER-EXPORT variant of the SAME week store (the
// Part B F5 measurement's comparison arm): each module-level reactive export gets its own
// getter-wrapper (the Rev 5 arm's idiom). NOT imported anywhere — compiled and checked only,
// to count the idiom's cost.
import { app } from './appStore.svelte.ts';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import { thawPool } from '../engine/sports/nfl/app/store.ts';
import FIXTURE from '../fixture.json';

let season: SeasonResult | null = null;
let slot = $state.raw(1);
let ready = $state.raw(false);

function ensure(): void {
  if (season) return;
  const rec = app.snap!.record!;
  season = runSeason(thawPool(rec.pool), (FIXTURE as { picks: typeof rec.picks }).picks, 2027, 2027);
  ready = true;
}
export const weekSlot = { get value(): number { ensure(); return slot; } };                 // wrapper 1
export const weekReady = { get value(): boolean { return ready; } };                        // wrapper 2
export const weekView_ = { get value() { ensure(); return season ? weekView(season, slot) : null; } };       // wrapper 3
export const weekTotal = { get value(): number { ensure(); return season ? totalWeekSlots(season) : 1; } }; // wrapper 4
export const weekStandings = { get value() { ensure(); return season ? standingsThrough(season, slot) : null; } }; // wrapper 5
export function weekGo(n: number): void { ensure(); slot = Math.max(1, Math.min(totalWeekSlots(season!), n)); }
export function weekNext(): void { weekGo(slot + 1); }
export function weekPrev(): void { weekGo(slot - 1); }
