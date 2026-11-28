// port/decisionVM.ts — the Wave B #5 BOARD AS A DECISION SURFACE (ernie C1/C2, pickle B2).
// Pure functions of the VM numbers the engine already produces — no new math, no scouting:
//   heatStrip()     — a needs × gone-risk cell per OPEN slot (need level × the slot's max gone%)
//                     → {slot, risk, need, tone} — the strip renders a cell per open slot.
//   pickConfidence()— the pick-confidence margin IN WINS (the engine's own unit): the gap between
//                     the suggested row's wins and the next-best's, with a verdict word.
//   stateOrigin()   — the state-origin chip value (fresh | autosave | shared | restored-season),
//                     read from the SAME boot state that decides restore — it cannot disagree
//                     with the behaviour because it IS that decision's input.
//
// LAW: waveB battery W5 (pure, exported, one cell per open slot, the delta in wins) + the board
// battery renders the strip cells EQUAL to this module's recomputation from the same VM
// (S-heat-*: a planted hardcoded strip dies — the law recomputes).

export type HeatTone = 'calm' | 'warm' | 'hot';

export interface HeatCell { slot: string; risk: number; need: number; tone: HeatTone }

const toneOf = (risk: number, need: number): HeatTone =>
  risk >= 0.5 && need > 0 ? 'hot' : risk >= 0.25 || need > 0 ? 'warm' : 'calm';

export function heatStrip(i: { openSlots: readonly string[]; goneBySlot: Record<string, number>; needBySlot: Record<string, number> }): HeatCell[] {
  return i.openSlots.map((slot) => {
    const risk = i.goneBySlot[slot] ?? 0;
    const need = i.needBySlot[slot] ?? 0;
    return { slot, risk, need, tone: toneOf(risk, need) };
  });
}

export interface Confidence { topWins: string; nextWins: string; goneMargin: number | null; verdict: string }

// The pick-confidence chip, HONESTLY (the S17 work order §3.2/3.5 — no recomputation, no parsing):
// the board's rows carry wins as DISPLAY strings (the engine's own rounding), and the W2b law
// forbids parsing numbers out of display strings — so the chip does NOT manufacture a numeric
// delta. It shows the top two rows' own wins displays, the verdict from the engine's ORDER (the
// first row IS the engine's top — no re-derivation), the genuine-tie case from exact display
// equality, and the one REAL number available: the gone-margin (top row's gone probability minus
// the next's, from the odds map — numeric VM data, never parsed text), labelled INTERIM until the
// engine lands rawSort (the §5 proposal).
export function pickConfidence(topWins: string | number, nextWins: string | number, goneMargin: number | null): Confidence {
  const top = String(topWins), next = String(nextWins);
  const tied = top === next;
  const verdict = tied
    ? 'genuine tie on wins — the order is the engine\'s stable sort'
    : goneMargin === null
      ? 'the engine ranks the first row ahead (wins display pair shown; no numeric delta until rawSort)'
      : goneMargin >= 0.25
        ? 'clear edge — the next best is likely gone first'
        : goneMargin >= 0.05
          ? 'slight edge — some gone-risk gap'
          : 'near tie — both likely available next turn';
  return { topWins: top, nextWins: next, goneMargin, verdict };
}

export type StateOrigin = 'fresh' | 'autosave' | 'shared' | 'season';

// the ONE source the boot uses to decide restore (hydrateApp/savesApp) feeds this — the chip
// cannot disagree with the restore behaviour because both read the same decision.
export function stateOrigin(i: { hadAutosave: boolean; fromSharedLink: boolean; fromSeasonSave: boolean }): StateOrigin {
  if (i.fromSharedLink) return 'shared';
  if (i.fromSeasonSave) return 'season';
  if (i.hadAutosave) return 'autosave';
  return 'fresh';
}

export const ORIGIN_LABEL: Record<StateOrigin, string> = {
  fresh: 'fresh draft',
  autosave: 'autosave restored',
  shared: 'shared link',
  season: 'restored season',
};
