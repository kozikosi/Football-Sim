// weekStore-sealed-reactive.ts — the DELTA measurement (Rev 9 Part C): the SAME 11-field surface as
// weekStore-sealed.ts, as a plain reactive({...}) module store (no Pinia) — settles whether the
// store delta is a Pinia artifact or a Vue artifact. NOT imported by the app (a measurement file;
// vitest compiles it, the build does not carry it).
import { computed, reactive, ref, shallowRef } from 'vue';
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
const pickCount = fx.picks.length;
const slot = ref(1);
const ready = ref(false);
const season = shallowRef<SeasonResult | null>(null);
const view = computed<WeekVM | null>(() => (season.value ? weekView(season.value, slot.value) : null));

export const weekSealedReactive = reactive({
  get slot() { return slot.value; },
  set slot(n: number) { slot.value = n; },
  get ready() { return ready.value; },
  get view() { return view.value; },
  get total() { return season.value ? totalWeekSlots(season.value) : 0; },
  get standings() { return season.value ? (standingsThrough(season.value, slot.value) as StandingsVMw | null) : null; },
  get champion() { return season.value ? season.value.champion : ''; },
  get finalists() { return season.value ? season.value.finalists : null; },
  pickCount,
  seasonYear: SEASON_YEAR,
  get gamesCount() { return view.value ? view.value.games.length : 0; },
  get label() { return view.value ? view.value.label : ''; },
  ensure() { if (ready.value) return; season.value = runSeason(pool, fx.picks, SEASON_SEED, SEASON_YEAR); ready.value = true; },
  go(n: number) { this.ensure(); const t = season.value ? totalWeekSlots(season.value) : 1; slot.value = Math.min(Math.max(1, Math.round(n)), Math.max(1, t)); },
  next() { this.go(slot.value + 1); },
  prev() { this.go(slot.value - 1); },
});
