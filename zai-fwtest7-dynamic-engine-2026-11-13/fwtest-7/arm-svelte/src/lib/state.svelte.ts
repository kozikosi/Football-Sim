// The arm's UI state — Svelte 5 runes in a .svelte.ts module.
// The contract is the ONLY engine surface (leakage rule): every rule, list and
// number on the screen comes from ./engine-contract — nothing is re-derived here.
import {
  FOCUSES, FOCUS_VERSION, FORM_Z, STRONG_PASS, STRONG_FRONT,
  canChangeAtHalftime, autoPickFocus, automatics, priorityBoard, formArrow,
  simulateWithFocus,
  type SimOutput, type PriorityRow, type SlotId, type AutoDecision, type FormArrow,
} from '../engine-contract/index.ts';

export const TEAM_SLOTS: Readonly<Record<SlotId, number>> = STRONG_PASS;
export const OPP_SLOTS: Readonly<Record<SlotId, number>> = STRONG_FRONT;
export const SEED = 20261113;
export const FOCUS_LIST = FOCUSES;
export const VERSION_TAG = FOCUS_VERSION;

export const state = $state({
  manageOn: false,
  picked: 'west-coast',
  phase: 'pregame' as 'pregame' | 'halftime' | 'final',
  sim: null as SimOutput | null,
  halftimeUsed: false,
  q4Auto: true,
  note: '',
});

export function effectiveFocus(): string {
  return state.manageOn ? state.picked : autoPickFocus({ diff: 0, quarter: 1, oppSlots: OPP_SLOTS });
}

export function board(): PriorityRow[] {
  return priorityBoard(TEAM_SLOTS, effectiveFocus())
    .filter((r) => r.wins > 0)
    .sort((a, b) => b.priority - a.priority || b.wins - a.wins);
}

function runSim(homeFocus: string): SimOutput {
  return simulateWithFocus({
    homeSlots: TEAM_SLOTS,
    awaySlots: OPP_SLOTS,
    homeFocus,
    awayFocus: 'auto',
    seed: SEED,
    quarterAutomatics: state.q4Auto,
  });
}

export function kickoff(): void {
  state.sim = runSim(effectiveFocus());
  state.phase = 'halftime';
  state.halftimeUsed = false;
}

export function halftimeOptions(): string[] {
  return FOCUSES.filter((f) => canChangeAtHalftime(f.id)).map((f) => f.id);
}

export function changeFocusAtHalftime(id: string): void {
  if (state.halftimeUsed || state.phase !== 'halftime') return;
  state.picked = id;
  state.halftimeUsed = true;
  state.sim = runSim(id);
  state.note = `Halftime change applied: ${id} (sim re-run with the new focus).`;
}

export function finish(): void {
  state.phase = 'final';
}

export function autoDecisions(): AutoDecision[] {
  if (!state.sim) return [];
  return automatics(
    { diff: state.sim.q4StartDiff, quarter: 4, oppSlots: OPP_SLOTS },
    effectiveFocus(),
  );
}

export function arrowFor(slot: SlotId): FormArrow {
  return formArrow(FORM_Z[slot] ?? 0);
}
