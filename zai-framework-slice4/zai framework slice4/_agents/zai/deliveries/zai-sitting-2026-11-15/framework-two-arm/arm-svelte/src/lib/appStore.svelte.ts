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

const boot = bootApp();

export type Screen = 'team' | 'board' | 'saves' | 'feed';

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
