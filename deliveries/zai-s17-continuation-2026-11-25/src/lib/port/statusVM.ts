// port/statusVM.ts — the Wave B #3 ONE DERIVED STATUS (hy4 #4): {phase, label, tone, action, why}
// consumed by the top bar, the hub and the Complete screen, with DOM hooks from phase
// ([data-status-phase]). ONE derivation, three surfaces — the labels cannot disagree with each
// other or with the behaviour, because they ARE the same computation.
//
// The phase sources are the state that ALREADY decides what renders (the draft store's record, the
// season session, the boot kind) — no new truth is invented here; this file only NAMES it once.
// Laws: shell battery S-status-* — the chip's data-status-phase equals the derived VM on every
// screen; the tone tokens are the shell's own (info/active/done/warn) — no new colour.

export type StatusPhase = 'fresh' | 'drafting' | 'pick-pending' | 'complete' | 'season-running' | 'season-finished' | 'restored';
export type StatusTone = 'info' | 'active' | 'done' | 'warn';

export interface StatusVM {
  phase: StatusPhase;
  label: string;
  tone: StatusTone;
  action: string | null;   // the one action this state asks for (null = nothing needed)
  why: string;
}

export interface StatusInput {
  picks: number;               // the record's pick count (0 = fresh board)
  slotsOpen: number;           // openSlots(...)
  seasonPhase: 'none' | 'running' | 'finished';
  restoredFrom: 'fresh' | 'autosave' | 'shared' | 'season' | null;   // the boot origin (Wave B #5 chip shares this)
}

export function deriveStatusVM(i: StatusInput): StatusVM {
  if (i.seasonPhase === 'running') {
    return { phase: 'season-running', label: 'Season in progress', tone: 'active', action: 'Advance the week', why: 'the season facade is mid-run — the stepper owns the screen' };
  }
  if (i.seasonPhase === 'finished') {
    return { phase: 'season-finished', label: 'Season complete', tone: 'done', action: 'Review the season', why: 'the facade reports finished — the bracket/review surfaces are live' };
  }
  if (i.picks === 0) {
    return { phase: 'fresh', label: i.restoredFrom && i.restoredFrom !== 'fresh' ? `Restored (${i.restoredFrom}) — board empty` : 'Fresh draft', tone: 'info', action: 'Draft your first player', why: 'the record holds no picks yet' };
  }
  if (i.slotsOpen === 0) {
    return { phase: 'complete', label: 'Draft complete', tone: 'done', action: 'See the Complete screen', why: 'every slot is filled' };
  }
  if (i.restoredFrom === 'autosave' || i.restoredFrom === 'shared' || i.restoredFrom === 'season') {
    return { phase: 'restored', label: `Restored from ${i.restoredFrom} · ${i.picks} pick${i.picks === 1 ? '' : 's'} in`, tone: 'info', action: 'Continue the draft', why: 'a saved state was loaded — continue or start fresh from the saves panel' };
  }
  return { phase: 'drafting', label: `Drafting · ${i.picks} pick${i.picks === 1 ? '' : 's'} in`, tone: 'active', action: i.slotsOpen <= 3 ? 'Final rounds — land the last slots' : 'Draft from the board', why: `${i.slotsOpen} slot${i.slotsOpen === 1 ? '' : 's'} still open` };
}
