// Selectors turn store state into the view-models the UI shows. Pure; the gone odds use a seed forked from the save
// record and the pick position, so the same screen always shows the same numbers.
import { goneOdds } from '../engine/goneodds.ts';
import { makeRng } from '../../../core/rng.ts';
import { boardVM } from '../view/draftBoard.ts';
import type { BoardSort, BoardVM } from '../view/draftBoard.ts';
import { rosterVM } from '../view/roster.ts';
import type { RosterVM } from '../view/roster.ts';
import type { DraftStoreState } from './store.ts';   // F1 (w74): store.ts's pair is DraftStoreState; appstate.ts is the only AppState

export function selectBoard(s: DraftStoreState, opts: { sort?: BoardSort; limit?: number; sims?: number } = {}): BoardVM | null {
  if (!s.record || !s.draft || s.status !== 'drafting') return null;
  const odds = goneOdds(s.draft, s.record.userTeam, makeRng(s.record.seed).fork('gone' + s.draft.pos), opts.sims ?? 30);
  return boardVM(s.draft, s.record.userTeam, odds, opts);
}
export function selectRoster(s: DraftStoreState): RosterVM | null { return s.record && s.draft ? rosterVM(s.draft, s.record.userTeam) : null; }

// S4: the async twin of selectBoard. `{ pending: true }` is what a Worker/server-backed implementation returns while it works; this in-process
// one yields a macrotask (so the caller can paint) and then answers `{ pending: false, vm }`. Same inputs give the same vm as selectBoard.
export type BoardResult = { pending: true } | { pending: false; vm: BoardVM | null };
export async function selectBoardAsync(s: DraftStoreState, opts: { sort?: BoardSort; limit?: number; sims?: number } = {}): Promise<BoardResult> {
  await new Promise<void>((r) => setTimeout(r, 0));
  return { pending: false, vm: selectBoard(s, opts) };
}
