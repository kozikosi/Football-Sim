// weekStore-sealed.svelte.ts — the SEALED-RECIPE store (Rev 9 Part C, authored against
// SEALED-RECIPE.md recipe sha 7fcc3fc0…, arm SVELTE, second in the coin order v,s,v,v).
// The recipe's binding rule for this arm: a CLASS INSTANCE BRIDGE — a class with reactive fields
// holding engine snapshots, one exported instance. Every derived value re-derives from the engine's
// own SeasonResult through the shared weekVM helpers (weekView, standingsThrough, totalWeekSlots);
// the league of record is the fixture's COMPLETE 1,024-pick draft log, rated and simulated by the
// shared layer's engine-true helper (seasonVM.runSeason: the 4-3 optimum, neutral returner,
// makeRng(seed).fork('season')). No new engine code. Engine writes nothing reactive: the engine
// snapshot lands in $state.raw (no deep proxy over engine data) and the getters re-derive views.
import { buildPool } from '../engine/sports/nfl/engine/players.ts';
import type { SeasonResult } from '../engine/sports/nfl/engine/season.ts';
import { runSeason } from '../shared/seasonVM.ts';
import { weekView, standingsThrough, totalWeekSlots } from '../shared/weekVM.ts';
import type { WeekVM, StandingsVMw } from '../shared/weekVM.ts';
import DATASET_RATINGS from '../data/madden27-ratings.csv?raw';
import DATASET_FA from '../data/free-agents-old-ratings.csv?raw';
import DATASET_IDS from '../data/player-ids.csv?raw';
import FIXTURE from '../fixture.json';

// The 2027 fixture (season seed 2027, per probes/season-seed-2027.json — the PROBE asserts against
// that file, never against this constant).
const SEASON_SEED = 2027;
const SEASON_YEAR = 2027;

interface Fixture {
  seed: number;
  userTeam: number;
  picks: { overall: number; team: number; pid: string; slot: string }[];
}

class WeekStoreSealed {
  private pool = buildPool(DATASET_RATINGS, DATASET_FA, DATASET_IDS);
  private fx = FIXTURE as Fixture;
  private season = $state.raw<SeasonResult | null>(null);   // the engine snapshot: raw, no deep proxy
  slot = $state(1);                                          // read + write; writes clamp in go()
  ready = $state(false);                                     // false until first materialisation

  get view(): WeekVM | null {
    return this.season ? weekView(this.season, this.slot) : null;
  }
  get total(): number {
    return this.season ? totalWeekSlots(this.season) : 0;
  }
  get standings(): StandingsVMw | null {
    return this.season ? standingsThrough(this.season, this.slot) : null;
  }
  get champion(): string {
    return this.season ? this.season.champion : '';
  }
  get finalists(): [string, string] | null {
    return this.season ? this.season.finalists : null;
  }
  get pickCount(): number {
    return this.fx.picks.length;
  }
  get seasonYear(): number {
    return SEASON_YEAR;
  }
  get gamesCount(): number {
    return this.view ? this.view.games.length : 0;
  }
  get label(): string {
    return this.view ? this.view.label : '';
  }

  ensure(): void {
    if (this.ready) return;
    this.season = runSeason(this.pool, this.fx.picks, SEASON_SEED, SEASON_YEAR);
    this.ready = true;
  }
  go(n: number): void {
    this.ensure();
    const t = this.season ? totalWeekSlots(this.season) : 1;
    this.slot = Math.min(Math.max(1, Math.round(n)), Math.max(1, t));
  }
  next(): void {
    this.go(this.slot + 1);
  }
  prev(): void {
    this.go(this.slot - 1);
  }
}

export const weekSealed = new WeekStoreSealed();
