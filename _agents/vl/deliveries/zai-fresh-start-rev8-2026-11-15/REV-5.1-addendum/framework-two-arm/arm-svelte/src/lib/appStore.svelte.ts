// appStore.svelte.ts — the four-slice reactive glue (Svelte 5 runes). The engine store is
// framework-free; this file adapts it to runes and holds the cross-screen app state. The draft
// snapshot rides $state.raw (reactive reassignment, NO deep proxy over the engine's pool) — the
// idiom for wrapping an external store; the board view-model is a $derived over snapshot + sort.
import { bootApp } from './bootData.ts';
import { makeRng } from '../engine/core/rng.ts';
import { goneOdds } from '../engine/sports/nfl/engine/goneodds.ts';
import { boardVM } from '../engine/sports/nfl/view/draftBoard.ts';
import type { BoardVM, BoardSort } from '../engine/sports/nfl/view/draftBoard.ts';
export type { BoardSort };
import type { SlotId } from '../engine/sports/nfl/engine/slots.ts';
import type { DraftStoreState } from '../engine/sports/nfl/app/store.ts';
import type { FeedVM } from './feedVM.ts';
import { toCardGrid } from './cardVM.ts';
import { buildPool } from '../engine/sports/nfl/engine/players.ts';
import DATASET_RATINGS from '../data/madden27-ratings.csv?raw';
import DATASET_FA from '../data/free-agents-old-ratings.csv?raw';
import DATASET_IDS from '../data/player-ids.csv?raw';
import FIXTURE from '../fixture.json';
import { runSeason, toStandings } from './seasonVM.ts';
import type { StandingsVM } from './seasonVM.ts';
import type { CardGridVM } from './cardVM.ts';

const boot = bootApp();

export type Screen = 'team' | 'board' | 'saves' | 'feed' | 'cards' | 'season';

export const ui = $state({ screen: 'team' as Screen, sort: 'wins' as BoardSort });
let snap = $state.raw<DraftStoreState>(boot.store.getState());
let feedVal = $state.raw(boot.feedFor(boot.loadTeam() ?? boot.defaultTeam));

boot.store.subscribe((s) => { snap = s; });

function start(team: number): void {
  boot.store.dispatch({ type: 'START', seed: boot.seed, userTeam: team });
  feedVal = boot.feedFor(team);
}
start(boot.loadTeam() ?? boot.defaultTeam);   // boot: a real draft for the persisted (or fixture) team

// state_invalid_export: a $state.raw binding the module reassigns cannot be exported — these getter
// functions are the compiler's own remedy; every read stays reactive through the closure variable.
export const draftSnap = (): DraftStoreState => snap;
export const feed = (): FeedVM => feedVal;

export function go(screen: Screen): void { ui.screen = screen; }
export function setSort(sort: BoardSort): void { ui.sort = sort; }
export function pick(playerId: string, slot: SlotId): void { boot.store.dispatch({ type: 'PICK', playerId, slot }); }
export function undo(): void { boot.store.dispatch({ type: 'UNDO' }); }

// Slice 3 — team select: persist the choice (the boot already STARTed for it), a fresh REAL draft
// for the new team (the pool/board re-render), and the feed re-derived for that team's week 1.
export const teams = boot.teams;
export function chooseTeam(team: number): void {
  boot.saveTeam(team);
  start(team);
  ui.screen = 'board';
}

// Slice 4 — saves: the store's LOAD path, with the app state synced to the loaded record's team
// (board and feed re-render for it; the choice persists as the loaded team). The envelope stamps
// ride the shared boot's metaFor; the read/refuse service is savesService.ts (identical bytes).
export const metaFor = boot.metaFor;
export function loadIntoStore(record: unknown): void {
  boot.store.dispatch({ type: 'LOAD', record });
  const t = snap.record?.userTeam;
  if (t !== undefined) { boot.saveTeam(t); feedVal = boot.feedFor(t); }
  ui.screen = 'board';   // a load lands on the board: the restored draft IS the view it restores
}

// derived_invalid_export: same rule for $derived — the exported board() reads the module-local
// derived, so every consumer stays reactive.
const boardDerived = $derived.by((): BoardVM | null => {
  const st = snap.draft, rec = snap.record;
  if (!st || !rec || st.pos >= st.order.length || st.order[st.pos] !== rec.userTeam) return null;
  return boardVM(st, rec.userTeam, goneOdds(st, rec.userTeam, makeRng(boot.seed * 7 + 13), 30), { sort: ui.sort, limit: 60 });
});
export const board = (): BoardVM | null => boardDerived;


// Slice 5 — player cards: the SAME board $derived re-rendered as cards (shared cardVM.ts). No new
// engine calls, no new state — the cards are the board's rows wearing a different face, so a pick
// or a sort re-derives them for free.
export const cards = (): CardGridVM | null => { const b = board(); return b ? toCardGrid(b) : null; };

// Slice-5 arc (c) — the studied player's POSITION (the lineup panel's highlight input): the pos of
// the card the user last opened. A module-level $state behind the getter idiom (state_invalid_export).
let studied = $state<string | null>(null);
export const setStudied = (slot: string | null): void => { studied = slot; };
export const studiedId = (): string | null => studied;

// Slice 6 — season: the engine-true standings on demand. The fixture's own 1,024-pick log is a
// complete league; the first SEASON visit pays the roster/lineup/ratings build + one season sim
// (~220 ms measured node-side) and the result is cached. No season data is invented anywhere.
let seasonVal: StandingsVM | null = null;
export function ensureSeason(): StandingsVM {
  if (!seasonVal) seasonVal = toStandings(runSeason(buildPool(DATASET_RATINGS, DATASET_FA, DATASET_IDS), FIXTURE.picks, 2027, 2027));
  return seasonVal;
}
