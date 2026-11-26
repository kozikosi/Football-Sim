// port/coachTape.ts — the Wave B #9 dev-gated "coach's tape" (ernie E): a POST-DRAFT replay that
// lays the ENGINE'S OWN ADVICE beside the user's pick for each round — zero new math (the advice
// rows are the suggestWhy VMs the board already computed; the tape only REPLAYS them side by side).
//
// GATES (both enforced, the battery laws prove each):
//   1. CODE GATE: renderCoachTape is callable only when `dev` is true (the ?dev query param — the
//      same gate the SeamCard chip and the provenance drawer ride). Production callers get null.
//   2. BUNDLE GATE: this module is imported ONLY under a dev-guarded dynamic import in App.svelte
//      (`if (DEV) await import('../port/coachTape.ts')`), so the production bundle never carries
//      its strings — law W9 greps the shipped dist for the tape vocabulary and dies on a hit.
// Never in the production flow; no home-page guide (the first-run stepper lives in the draft
// surface itself, BoardFooter's guide chip — separate, always available, one sentence per step).

export interface TapeRow {
  round: number;
  slot: string;
  userPick: string;        // the player the user drafted (the record's pick)
  engineAdvice: string;    // the suggestion VM's name + why (the SAME why copy the board showed)
  agree: boolean;          // did the user take the engine's suggestion?
}

export interface CoachTape { title: string; rows: TapeRow[]; note: string }

const TAPE_TITLE = "COACH'S TAPE — dev replay: your picks vs the engine's advice (zero new math)";

export function renderCoachTape(i: {
  dev: boolean;
  picks: readonly { round: number; slot: string; playerName: string }[];
  adviceByRound: Readonly<Record<number, { name: string; why: string }>>;
}): CoachTape | null {
  if (!i.dev) return null;   // the code gate: production callers get null, never the tape
  const rows: TapeRow[] = i.picks.map((p) => {
    const a = i.adviceByRound[p.round];
    return {
      round: p.round,
      slot: p.slot,
      userPick: p.playerName,
      engineAdvice: a ? `${a.name} — ${a.why}` : '(no suggestion recorded this round)',
      agree: !!a && a.name === p.playerName,
    };
  });
  return {
    title: TAPE_TITLE,
    rows,
    note: 'the advice is the board\'s own suggestion VM replayed — no recomputation, no new numbers',
  };
}
