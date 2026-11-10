// The whole app state and every action, as one typed contract. Types only: reducers live next to the store.
// Classification (the rule every field obeys):
//   PERSISTED  - in an envelope payload; restored as stored (trusted) or re-derived (see settle rules).
//   DERIVED    - computed by a selector from persisted data; never stored, never cached across dispatches.
//   EPHEMERAL  - UI-only (sort, open sheet, selection); lost on reload by design.
// Forbidden in state: game results (regenerable from gameSeed, 1.13 MB/season), Date/Math.random, DOM handles, functions.
//
// w74 item 4 patch (F10): ui.boardSort is the BoardSort union, not a bare string. The union's home is HERE (the
// contract layer) and view/draftBoard.ts imports it from here — one definition, no drift between what the reducer
// accepts and what the view model switches on. (F10 follow-up for the view, 2 lines: delete the local
// `export type BoardSort` there and `import type { BoardSort } from '../../../core/../sports/nfl/app/appstate.ts'`
// — exact path in the 04 README.)
import type { BootPhase, SaveStatus } from '../../../core/app.ts';
import type { SlotName } from '../../../core/envelope.ts';
import type { SlotId } from '../engine/slots.ts';
import type { DraftPayload, WeekPayload } from './saves.ts';

/** Replaces `Record<string, unknown> | null`. The week save stores the user's per-game plan as plain data. */
export interface PlanState { offense: string | null; defense: string | null; note?: string }

export type Screen = 'teamSelect' | 'draft' | 'season' | 'standings' | 'playoffs' | 'summary';
export type Phase = 'noSave' | 'drafting' | 'draftDone' | 'inSeason' | 'playoffs' | 'seasonOver';
export type BoardSort = 'wins' | 'ovr' | 'priority';   // F10: same union the board view model sorts by

export interface SaveIdentity { saveId: string; saveRevision: number; createdAt: string }

export interface AppState {
  boot: BootPhase;
  bootError: string | null;                      // fatal only: dataset unusable, storage unavailable AND no memory fallback
  dataset: { hash: string; source: 'bundled' | 'user' } | null;
  identity: SaveIdentity | null;                 // PERSISTED (envelope meta). Revision +1 per committed transition.
  slot: SlotName;                                // PERSISTED choice of active slot
  phase: Phase;
  draft: DraftPayload | null;                    // PERSISTED while phase is drafting/draftDone
  season: WeekPayload | null;                    // PERSISTED between weeks; never mid-game
  plan: PlanState | null;                        // PERSISTED inside the week payload
  saveStatus: SaveStatus;                        // EPHEMERAL, owned by the saver
  notice: { kind: 'corrupt' | 'newer-version' | 'storage-unavailable' | 'dataset-changed'; slot: SlotName } | null;   // EPHEMERAL
  ui: { screen: Screen; boardSort: BoardSort; sheet: string | null };   // EPHEMERAL
}

export type Action =
  // boot / hydration (results of async services; reducers stay synchronous)
  | { type: 'BOOT_DATASET_OK'; hash: string; source: 'bundled' | 'user' }
  | { type: 'BOOT_FATAL'; message: string }
  | { type: 'LOAD_OK'; slot: SlotName; text: string }                     // raw envelope text; the reducer parses and settles
  | { type: 'LOAD_EMPTY'; slot: SlotName }
  | { type: 'LOAD_FAILED'; slot: SlotName; kind: 'corrupt' | 'newer-version' | 'storage-unavailable' }
  | { type: 'SAVE_STATUS'; status: SaveStatus }
  // draft
  | { type: 'START'; seed: number; userTeam: number; saveId: string; now: string }
  | { type: 'PICK'; playerId: string; slot: SlotId }
  | { type: 'UNDO' }                                                      // draft only; cuts the pick log
  // season flow
  | { type: 'BEGIN_SEASON'; year: number }                                // draftDone -> inSeason
  | { type: 'SET_PLAN'; plan: PlanState }
  | { type: 'PLAY_WEEK' }                                                 // plays nextWeek for the whole league, saves between weeks
  | { type: 'RUN_IT_BACK'; saveId: string; now: string }                  // seasonOver -> new season, run + 1, same roster, new saveId
  | { type: 'NEW_GAME' }
  // ephemeral UI
  | { type: 'NAVIGATE'; screen: Screen }
  | { type: 'SORT_BOARD'; sort: BoardSort }
  | { type: 'DISMISS_NOTICE' };
