// appStore.ts — the four-slice reactive glue (Vue 3 composition API). The engine store is
// framework-free; this file adapts it to refs/computed and holds the cross-screen app state. The
// draft snapshot rides a shallowRef (reactive reassignment, NO deep reactive proxy over the
// engine's pool) — the idiom for wrapping an external store; the board view-model is a computed
// over snapshot + sort.
import { computed, ref, shallowRef } from 'vue';
import { bootApp } from './bootData.ts';
import { makeRng } from '../engine/core/rng.ts';
import { goneOdds } from '../engine/sports/nfl/engine/goneodds.ts';
import { boardVM } from '../engine/sports/nfl/view/draftBoard.ts';
import type { BoardVM, BoardSort } from '../engine/sports/nfl/view/draftBoard.ts';
export type { BoardSort };
import type { SlotId } from '../engine/sports/nfl/engine/slots.ts';
import type { DraftStoreState } from '../engine/sports/nfl/app/store.ts';

const boot = bootApp();

export type Screen = 'team' | 'board' | 'saves' | 'feed';

export const ui = ref({ screen: 'team' as Screen, sort: 'wins' as BoardSort });
export const draftSnap = shallowRef<DraftStoreState>(boot.store.getState());
export const feed = shallowRef(boot.feedFor(boot.loadTeam() ?? boot.defaultTeam));

boot.store.subscribe((s) => { draftSnap.value = s; });

function start(team: number): void {
  boot.store.dispatch({ type: 'START', seed: boot.seed, userTeam: team });
  feed.value = boot.feedFor(team);
}
start(boot.loadTeam() ?? boot.defaultTeam);   // boot: a real draft for the persisted (or fixture) team

export function go(screen: Screen): void { ui.value.screen = screen; }
export function setSort(sort: BoardSort): void { ui.value.sort = sort; }
export function pick(playerId: string, slot: SlotId): void { boot.store.dispatch({ type: 'PICK', playerId, slot }); }
export function undo(): void { boot.store.dispatch({ type: 'UNDO' }); }

// Slice 3 — team select: persist the choice (the boot already STARTed for it), a fresh REAL draft
// for the new team (the pool/board re-render), and the feed re-derived for that team's week 1.
export const teams = boot.teams;
export function chooseTeam(team: number): void {
  boot.saveTeam(team);
  start(team);
  ui.value.screen = 'board';
}

// Slice 4 — saves: the store's LOAD path, with the app state synced to the loaded record's team
// (board and feed re-render for it; the choice persists as the loaded team). The envelope stamps
// ride the shared boot's metaFor; the read/refuse service is savesService.ts (identical bytes).
export const metaFor = boot.metaFor;
export function loadIntoStore(record: unknown): void {
  boot.store.dispatch({ type: 'LOAD', record });
  const t = draftSnap.value.record?.userTeam;
  if (t !== undefined) { boot.saveTeam(t); feed.value = boot.feedFor(t); }
  ui.value.screen = 'board';   // a load lands on the board: the restored draft IS the view it restores
}

export const board = computed<BoardVM | null>(() => {
  const st = draftSnap.value.draft, rec = draftSnap.value.record;
  if (!st || !rec || st.pos >= st.order.length || st.order[st.pos] !== rec.userTeam) return null;
  return boardVM(st, rec.userTeam, goneOdds(st, rec.userTeam, makeRng(boot.seed * 7 + 13), 30), { sort: ui.value.sort, limit: 60 });
});
