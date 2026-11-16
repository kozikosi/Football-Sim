// weekStore-sealed-reactive.svelte.ts — the 2×2 cell (Rev 10 EXT C): the SAME 11-field surface as
// weekStore-sealed.svelte.ts, as a module-level $state.raw + facade object (the Part B facade
// idiom, no class). NOT imported by the app (a measurement file; vitest compiles it, the build
// does not carry it) — exactly like the Vue cell weekStore-sealed-reactive.ts it mirrors. Every
// derived value re-derives from the engine's own SeasonResult through the shared weekVM helpers;
// the engine snapshot stays raw (no deep proxy over engine data).
import { buildPool } from '../engine/sports/nfl/engine/players.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import DATASET_RATINGS from '../data/madden27-ratings.csv?raw';
import DATASET_FA from '../data/free-agents-old-ratings.csv?raw';
import DATASET_IDS from '../data/player-ids.csv?raw';
import FIXTURE from '../fixture.json';

const SEASON_SEED = 2027;
const SEASON_YEAR = 2027;
interface Fixture { seed: number; userTeam: number; picks: { overall: number; team: number; pid: string; slot: string }[] }

const pool = buildPool(DATASET_RATINGS, DATASET_FA, DATASET_IDS);
const fx = FIXTURE as Fixture;
let season = $state.raw<SeasonResult | null>(null);   // the engine snapshot: raw, no deep proxy
let slot = $state(1);                                 // read + write; writes clamp in go()
let ready = $state(false);                            // false until first materialisation

export const weekSealedReactive = {
  get slot(): number { return slot; },
  set slot(n: number) { slot = n; },
  get ready(): boolean { return ready; },
  get view(): WeekVM | null { return season ? weekView(season, slot) : null; },
  get total(): number { return season ? totalWeekSlots(season) : 0; },
  get standings(): StandingsVMw | null { return season ? standingsThrough(season, slot) : null; },
  get champion(): string { return season ? season.champion : ''; },
  get finalists(): [string, string] | null { return season ? season.finalists : null; },
  get pickCount(): number { return fx.picks.length; },
  get seasonYear(): number { return SEASON_YEAR; },
  get gamesCount(): number { const v = season ? weekView(season, slot) : null; return v ? v.games.length : 0; },
  get label(): string { const v = season ? weekView(season, slot) : null; return v ? v.label : ''; },
  ensure(): void {
    if (ready) return;
    season = runSeason(pool, fx.picks, SEASON_SEED, SEASON_YEAR);
    ready = true;
  },
  go(n: number): void {
    this.ensure();
    const t = season ? totalWeekSlots(season) : 1;
    slot = Math.min(Math.max(1, Math.round(n)), Math.max(1, t));
  },
  next(): void { this.go(slot + 1); },
  prev(): void { this.go(slot - 1); },
};
