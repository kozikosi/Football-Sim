// The arm's UI state — React hooks.
// The contract is the ONLY engine surface (leakage rule): every rule, list and
// number on the screen comes from ./engine-contract — nothing is re-derived here.
import { useMemo, useState } from 'react';
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

export interface FocusState {
  manageOn: boolean;
  setManageOn: (v: boolean) => void;
  picked: string;
  setPicked: (id: string) => void;
  phase: 'pregame' | 'halftime' | 'final';
  setPhase: (p: 'pregame' | 'halftime' | 'final') => void;
  sim: SimOutput | null;
  setSim: (s: SimOutput | null) => void;
  halftimeUsed: boolean;
  setHalftimeUsed: (v: boolean) => void;
  q4Auto: boolean;
  setQ4Auto: (v: boolean) => void;
  note: string;
  setNote: (n: string) => void;
}

export function useFocusState(): FocusState {
  const [manageOn, setManageOn] = useState(false);
  const [picked, setPicked] = useState('west-coast');
  const [phase, setPhase] = useState<'pregame' | 'halftime' | 'final'>('pregame');
  const [sim, setSim] = useState<SimOutput | null>(null);
  const [halftimeUsed, setHalftimeUsed] = useState(false);
  const [q4Auto, setQ4Auto] = useState(true);
  const [note, setNote] = useState('');
  return { manageOn, setManageOn, picked, setPicked, phase, setPhase, sim, setSim, halftimeUsed, setHalftimeUsed, q4Auto, setQ4Auto, note, setNote };
}

export function useEffectiveFocus(s: FocusState): string {
  return useMemo(
    () => (s.manageOn ? s.picked : autoPickFocus({ diff: 0, quarter: 1, oppSlots: OPP_SLOTS })),
    [s.manageOn, s.picked],
  );
}

export function useBoard(focusId: string): PriorityRow[] {
  return useMemo(
    () =>
      priorityBoard(TEAM_SLOTS, focusId)
        .filter((r) => r.wins > 0)
        .sort((a, b) => b.priority - a.priority || b.wins - a.wins),
    [focusId],
  );
}

export function runSim(s: FocusState, homeFocus: string): SimOutput {
  return simulateWithFocus({
    homeSlots: TEAM_SLOTS,
    awaySlots: OPP_SLOTS,
    homeFocus,
    awayFocus: 'auto',
    seed: SEED,
    quarterAutomatics: s.q4Auto,
  });
}

export function halftimeOptions(): string[] {
  return FOCUSES.filter((f) => canChangeAtHalftime(f.id)).map((f) => f.id);
}

export function useAutoDecisions(s: FocusState, focusId: string): AutoDecision[] {
  return useMemo(
    () => (s.sim ? automatics({ diff: s.sim.q4StartDiff, quarter: 4, oppSlots: OPP_SLOTS }, focusId) : []),
    [s.sim, focusId],
  );
}

export function arrowFor(slot: SlotId): FormArrow {
  return formArrow(FORM_Z[slot] ?? 0);
}
