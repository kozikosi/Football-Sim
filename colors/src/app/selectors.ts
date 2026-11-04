// Selectors turn store state into the view-models the UI shows. Pure; the gone odds use a seed forked from the save
// record and the pick position, so the same screen always shows the same numbers.
import { goneOdds } from '../engine/goneodds.ts';
import { makeRng } from '../engine/rng.ts';
import { boardVM } from '../view/draftBoard.ts';
import type { BoardSort, BoardVM } from '../view/draftBoard.ts';
import { rosterVM } from '../view/roster.ts';
import type { RosterVM } from '../view/roster.ts';
import type { AppState } from './store.ts';

export function selectBoard(s: AppState, opts: { sort?: BoardSort; limit?: number; sims?: number } = {}): BoardVM | null {
  if (!s.record || !s.draft || s.status !== 'drafting') return null;
  const odds = goneOdds(s.draft, s.record.userTeam, makeRng(s.record.seed).fork('gone' + s.draft.pos), opts.sims ?? 30);
  return boardVM(s.draft, s.record.userTeam, odds, opts);
}
export function selectRoster(s: AppState): RosterVM | null { return s.record && s.draft ? rosterVM(s.draft, s.record.userTeam) : null; }
