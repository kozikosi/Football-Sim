// focus.ts — the offensive focus feature (engine-side logic for the framework test).
// PROPOSAL interpretation of the Owner's verdicts, frozen for the test (see engine-contract.md):
//   · The focus re-ranks the draft board's PRIORITY column — it NEVER touches Wins (static truth stays on the board).
//   · CPU teams get focuses too (auto-picked by situation).
//   · 4th-quarter automatics fire regardless of the user's selection; what the pin engine cannot yet take as an
//     input is surfaced as a reported AutoDecision and filed for the Architect (not faked).
//   · Form arrows are binary (hot/cold) derived from a form z-score; the UI resolves the palette color. No emoji, no text.
// Everything is data-driven from FOCUSES: adding a focus = one entry here. No picker, no automatic, no halftime rule
// may hard-code the focus count.
// structurally identical to the engine's internal OffPlan (matchup.ts — not exported at the pin)
export type Strat = 'run' | 'neutral' | 'pass';
export type Pers = '11' | '12' | '13' | '21' | '22';
export interface OffPlan { pers: Pers; strat: Strat }
export type Base = '4-3' | '3-4';
import { SLOT_IDS, type SlotId } from '../sports/nfl/engine/slots.ts';
import { slotWins20 } from '../sports/nfl/engine/value.ts';

export interface FocusDef {
  id: string;
  label: string;
  blurb: string;
  offPlan: OffPlan;
  /** display-law integer bumps: slot → tier adjustment applied to PRIORITY only */
  adj: Partial<Record<SlotId, number>>;
  /** which opposing unit moderates this focus's value: 'cov' (secondary) or 'front' (box) */
  matchupAxis: 'cov' | 'front';
  /** Q4 automatic trigger, distinct per focus (in addition to the two standing automatics) */
  autoTrigger: { cond: 'trailing-big' | 'trailing-one-score'; strat: Strat };
  /** whether the user may still switch to/away at halftime (v2 adds a focus where this is false) */
  halftimeEligible: boolean;
}

/** v1 — the four focuses the test ships with. */
export const FOCUSES: readonly FocusDef[] = [
  {
    id: 'west-coast',
    label: 'West Coast',
    blurb: 'Short, timing passes spread to the second level.',
    offPlan: { pers: '11', strat: 'pass' },
    adj: { WR3: 3, TE2: 2, TE1: 1, RB2: 1, WR1: -2, WR2: -1 },
    matchupAxis: 'cov',
    autoTrigger: { cond: 'trailing-one-score', strat: 'pass' },
    halftimeEligible: true,
  },
  {
    id: 'deep-passing',
    label: 'Deep Passing',
    blurb: 'Take shots downfield; live with the incompletions.',
    offPlan: { pers: '11', strat: 'pass' },
    adj: { WR1: 3, WR2: 2, WR3: -1, TE1: -1, RB1: -1, RB2: -1 },
    matchupAxis: 'cov',
    autoTrigger: { cond: 'trailing-big', strat: 'pass' },
    halftimeEligible: true,
  },
  {
    id: 'rpo',
    label: 'RPOs',
    blurb: 'Run-pass options attack the second level on schedule.',
    offPlan: { pers: '11', strat: 'neutral' },
    adj: { TE1: 2, WR2: 1, RB1: 1, QB: 1, WR1: -1 },
    matchupAxis: 'front',
    autoTrigger: { cond: 'trailing-one-score', strat: 'neutral' },
    halftimeEligible: true,
  },
  {
    id: 'ground-pound',
    label: 'Ground & Pound',
    blurb: 'Heavy personnel, the run game sets the terms.',
    offPlan: { pers: '21', strat: 'run' },
    adj: { RB1: 3, RB2: 2, FB: 2, TE1: 1, WR1: -2, WR3: -1 },
    matchupAxis: 'front',
    autoTrigger: { cond: 'trailing-big', strat: 'run' },
    halftimeEligible: true,
  },
  // v2 (round-2 change): the fifth focus. Its own matchup weights, its own
  // automatic trigger, and a DIFFERENT halftime rule (not eligible — the
  // design's check that halftime eligibility is per-focus data, not a constant).
  {
    id: 'spread',
    label: 'Spread',
    blurb: 'Four and five wide: disperse the targets, attack the weakest cover man.',
    offPlan: { pers: '11', strat: 'pass' },
    adj: { WR3: 2, WR4: 1, TE2: 2, RB2: 1, WR1: -1, TE1: -1 },
    matchupAxis: 'cov',
    autoTrigger: { cond: 'trailing-one-score', strat: 'pass' },
    halftimeEligible: false,
  },
];

export const FOCUS_VERSION = 'v1-5f'; // round 2: the fifth focus landed in the data, not in the UI

export function focusById(id: string): FocusDef {
  const f = FOCUSES.find((x) => x.id === id);
  if (!f) throw new Error(`unknown focus: ${id}`);
  return f;
}

export function focusOffPlan(id: string): OffPlan {
  return focusById(id).offPlan;
}

export function canChangeAtHalftime(id: string): boolean {
  return focusById(id).halftimeEligible;
}

// ---------------------------------------------------------------------------
// The draft board: static truth (Wins) + the focus view (Priority).
// The user sees OVR, Wins, Priority and form arrows — and Priority is the only
// column the focus moves (the Owner's ruling; Wins are wins).
// ---------------------------------------------------------------------------

export interface PriorityRow {
  slot: SlotId;
  ovr: number;
  /** static truth — identical under every focus, identical on every screen */
  wins: number;
  /** the board's ranking value: wins + the focus adjustment, integer display */
  priority: number;
}

export function oppUnitAvg(
  slots: Readonly<Record<SlotId, number>>,
  axis: 'cov' | 'front',
): number {
  const rows: SlotId[] = axis === 'cov' ? ['CB1', 'CB2', 'FS', 'SS'] : ['DE1', 'DT1', 'MIKE', 'DT2'];
  const xs = rows.map((r) => slots[r] ?? 0);
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** matchup factor in [0.5, 1.5]: the focus is worth more against a weaker opposing unit. */
export function matchupFactor(
  slots: Readonly<Record<SlotId, number>>,
  axis: 'cov' | 'front',
): number {
  const league = 72;
  const gap = league - oppUnitAvg(slots, axis);
  return Math.min(1.5, Math.max(0.5, 1 + gap / 40));
}

export function focusAdjustment(
  focusId: string,
  slot: SlotId,
  slots: Readonly<Record<SlotId, number>>,
): number {
  const f = focusById(focusId);
  const raw = f.adj[slot];
  if (raw === undefined) return 0;
  return Math.round(raw * matchupFactor(slots, f.matchupAxis));
}

/** The board under a focus. `wins` never moves; `priority` is the focus view. */
export function priorityBoard(
  slots: Readonly<Record<SlotId, number>>,
  focusId: string,
  base: Base = '4-3',
): PriorityRow[] {
  return SLOT_IDS.map((slot) => {
    const ovr = slots[slot];
    const wins = Math.round(slotWins20(slot, base) * 100) / 100;
    return { slot, ovr, wins, priority: Math.round(wins + focusAdjustment(focusId, slot, slots)) };
  });
}

// ---------------------------------------------------------------------------
// The auto default: what the engine picks when the user does not manage.
// Deterministic by situation; auto users are never prompted at halftime.
// ---------------------------------------------------------------------------

export interface SitState {
  diff: number;          // user team minus opponent
  quarter: 1 | 2 | 3 | 4;
  oppSlots: Readonly<Record<SlotId, number>>;
}

export function autoPickFocus(s: SitState): string {
  if (s.quarter >= 3 && s.diff <= -8) return 'deep-passing';
  if (s.quarter >= 3 && s.diff >= 8) return 'ground-pound';
  const front = oppUnitAvg(s.oppSlots, 'front');
  const cov = oppUnitAvg(s.oppSlots, 'cov');
  if (front <= cov) return 'rpo';
  return 'west-coast';
}

// ---------------------------------------------------------------------------
// 4th-quarter automatics: fire regardless of the user's selection.
// `stratOverride` is the one the pin engine can take (whole-game plan re-run —
// a documented approximation; per-quarter plan switching is filed for the
// Architect). `goFor2` and `fourthDown` are REPORTED decisions: the pin engine
// does not yet expose those inputs, so the UI surfaces them and the wiring of
// the real decision paths is an engine change, not a prototype change.
// ---------------------------------------------------------------------------

export interface AutoDecision {
  key: 'go-for-2' | 'fourth-down-aggression' | 'strat-override';
  label: string;
  detail: string;
  appliedInSim: boolean;
}

export function automatics(s: SitState, userFocusId: string): AutoDecision[] {
  if (s.quarter < 4) return [];
  const out: AutoDecision[] = [];
  if (s.diff <= -8 && s.diff > -17) {
    out.push({
      key: 'go-for-2',
      label: 'Automatic: go for 2',
      detail: 'Trailing by two scores in the 4th — conversions go for 2 regardless of focus.',
      appliedInSim: false,
    });
  }
  if (s.diff < 0) {
    out.push({
      key: 'fourth-down-aggression',
      label: 'Automatic: aggressive fourth downs',
      detail: 'Trailing in the 4th — difficult fourth downs are played, not punted.',
      appliedInSim: false,
    });
  }
  const f = focusById(userFocusId);
  const fire =
    f.autoTrigger.cond === 'trailing-big' ? s.diff <= -14 : s.diff <= -8 && s.diff > -14;
  if (fire) {
    out.push({
      key: 'strat-override',
      label: `Automatic: ${f.autoTrigger.strat} tendency`,
      detail: `Q4 situation overrides the plan (${f.label} trigger) — the sim re-runs with the override.`,
      appliedInSim: true,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Form: binary arrows from a form z-score. The UI maps hot/cold to the team's
// palette (green/red). No emoji, no text labels (Owner's display ruling).
// ---------------------------------------------------------------------------

export type FormArrow = 'hot' | 'cold' | null;

export function formArrow(formZ: number): FormArrow {
  if (formZ >= 1.0) return 'hot';
  if (formZ <= -1.0) return 'cold';
  return null;
}

// ---------------------------------------------------------------------------
// Demo form data (v1.0.1 amendment — static demo z-scores, NOT simulated form;
// the fixture is shared so every arm renders identical arrows from the
// contract, keeping the index-only import rule clean).
// ---------------------------------------------------------------------------
export const FORM_Z: Readonly<Partial<Record<SlotId, number>>> = {
  QB: 0.3, WR1: 1.4, WR2: -0.4, WR3: 0.2, TE1: -1.6, TE2: 0.0, RB1: 0.8,
  RB2: -1.1, FB: 0.1, OT1: 0.5, OT2: -0.2, OG1: 0.0, OG2: 0.2, C: -0.3,
  DE1: 1.1, DE2: -0.5, DT1: 0.0, DT2: 0.4, DL5: -0.1, MIKE: -1.2, WILL: 0.6,
  SAM: 0.0, CB1: 1.2, CB2: -0.6, CB3: 0.3, DIME: 0.0, FS: -0.9, SS: 0.7,
  K: 0.4, P: 0.0,
};
