// The arm's UI state — Solid signals. Tooling parity with arm-svelte:
// same names, same data-testids, same engine contract (engine-contract is the
// only engine surface; nothing is re-derived here).
import {
  FOCUSES, FOCUS_VERSION, FORM_Z, STRONG_PASS, STRONG_FRONT,
  canChangeAtHalftime, autoPickFocus, automatics, priorityBoard, formArrow,
  simulateWithFocus,
  type SimOutput, type PriorityRow, type SlotId, type AutoDecision, type FormArrow,
} from '../engine-contract/index.ts';
import { createSignal, createMemo } from 'solid-js';

export const TEAM_SLOTS: Readonly<Record<SlotId, number>> = STRONG_PASS;
export const OPP_SLOTS: Readonly<Record<SlotId, number>> = STRONG_FRONT;
export const SEED = 20261113;
export const FOCUS_LIST = FOCUSES;
export const VERSION_TAG = FOCUS_VERSION;

const [manageOn, setManageOn] = createSignal(false);
const [picked, setPicked] = createSignal('west-coast');
const [phase, setPhase] = createSignal<'pregame' | 'halftime' | 'final'>('pregame');
const [sim, setSim] = createSignal<SimOutput | null>(null);
const [halftimeUsed, setHalftimeUsed] = createSignal(false);
const [q4Auto, setQ4Auto] = createSignal(true);
const [note, setNote] = createSignal('');

export const state = { manageOn, picked, phase, sim, halftimeUsed, q4Auto, note, setManageOn, setPicked, setPhase, setSim, setHalftimeUsed, setQ4Auto, setNote };

export function effectiveFocus(): string {
  return manageOn() ? picked() : autoPickFocus({ diff: 0, quarter: 1, oppSlots: OPP_SLOTS });
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
    quarterAutomatics: q4Auto(),
  });
}

export function kickoff(): void {
  setSim(runSim(effectiveFocus()));
  setPhase('halftime');
  setHalftimeUsed(false);
}

export function halftimeOptions(): string[] {
  return FOCUSES.filter((f) => canChangeAtHalftime(f.id)).map((f) => f.id);
}

export function changeFocusAtHalftime(id: string): void {
  if (halftimeUsed() || phase() !== 'halftime') return;
  setPicked(id);
  setHalftimeUsed(true);
  setSim(runSim(id));
  setNote(`Halftime change applied: ${id} (sim re-run with the new focus).`);
}

export function finish(): void {
  setPhase('final');
}

export function autoDecisions(): AutoDecision[] {
  const s = sim();
  if (!s) return [];
  return automatics(
    { diff: s.q4StartDiff, quarter: 4, oppSlots: OPP_SLOTS },
    effectiveFocus(),
  );
}

export function arrowFor(slot: SlotId): FormArrow {
  return formArrow(FORM_Z[slot] ?? 0);
}
