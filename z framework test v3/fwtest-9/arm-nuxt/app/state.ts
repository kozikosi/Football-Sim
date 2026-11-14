// The arm's UI state — Vue refs + computed.
// The contract is the ONLY engine surface (leakage rule): every rule, list and
// number on the screen comes from ./engine-contract — nothing is re-derived here.
import { computed, ref } from 'vue';
import {
  FOCUSES, FOCUS_VERSION, FORM_Z, STRONG_PASS, STRONG_FRONT,
  canChangeAtHalftime, autoPickFocus, automatics, priorityBoard, formArrow,
  simulateWithFocus,
  type SimOutput, type PriorityRow, type AutoDecision, type FormArrow, type SlotId,
} from './engine-contract/index.ts';

export const TEAM_SLOTS: Readonly<Record<SlotId, number>> = STRONG_PASS;
export const OPP_SLOTS: Readonly<Record<SlotId, number>> = STRONG_FRONT;
export const SEED = 20261113;
export const FOCUS_LIST = FOCUSES;
export const VERSION_TAG = FOCUS_VERSION;

export const manageOn = ref(false);
export const picked = ref('west-coast');
export const phase = ref<'pregame' | 'halftime' | 'final'>('pregame');
export const sim = ref<SimOutput | null>(null);
export const halftimeUsed = ref(false);
export const q4Auto = ref(true);
export const note = ref('');

export const effectiveFocus = computed(() =>
  manageOn.value ? picked.value : autoPickFocus({ diff: 0, quarter: 1, oppSlots: OPP_SLOTS }),
);

export const board = computed<PriorityRow[]>(() =>
  priorityBoard(TEAM_SLOTS, effectiveFocus.value)
    .filter((r) => r.wins > 0)
    .sort((a, b) => b.priority - a.priority || b.wins - a.wins),
);

function runSim(homeFocus: string): SimOutput {
  return simulateWithFocus({
    homeSlots: TEAM_SLOTS,
    awaySlots: OPP_SLOTS,
    homeFocus,
    awayFocus: 'auto',
    seed: SEED,
    quarterAutomatics: q4Auto.value,
  });
}

export function kickoff(): void {
  sim.value = runSim(effectiveFocus.value);
  phase.value = 'halftime';
  halftimeUsed.value = false;
  note.value = '';
}

export function halftimeOptions(): string[] {
  return FOCUSES.filter((f) => canChangeAtHalftime(f.id)).map((f) => f.id);
}

export function changeFocusAtHalftime(id: string): void {
  if (halftimeUsed.value || phase.value !== 'halftime') return;
  picked.value = id;
  halftimeUsed.value = true;
  sim.value = runSim(id);
  note.value = `Halftime change applied: ${id} (sim re-run with the new focus).`;
}

export function finish(): void {
  phase.value = 'final';
}

export const autoDecisions = computed<AutoDecision[]>(() =>
  sim.value
    ? automatics({ diff: sim.value.q4StartDiff, quarter: 4, oppSlots: OPP_SLOTS }, effectiveFocus.value)
    : [],
);

export function arrowFor(slot: SlotId): FormArrow {
  return formArrow(FORM_Z[slot] ?? 0);
}
