// sim.ts — the contract's game entry: defined inputs, defined outputs.
// Wraps the pinned engine's own simulateGame; the only approximation is the
// strat-override re-run (whole-game, not per-quarter — documented in
// engine-contract.md and filed for the Architect as the real fix).
import { simulateGame, type GameOptions, type GameResult } from '../sports/nfl/engine/drives.ts';
import { leagueBaseline, type Ratings } from '../sports/nfl/engine/ratings.ts';
import { DEFAULT_PLAN, matchupModel, type Matchup } from '../sports/nfl/engine/matchup.ts';
import { makeRng, type Rng } from '../core/rng.ts';
import { SLOT_IDS, type SlotId } from '../sports/nfl/engine/slots.ts';
import { automatics, autoPickFocus, focusOffPlan, type AutoDecision, type OffPlan } from './focus.ts';
import { spotsFromRecord, teamRatings } from '../sports/nfl/engine/ratings.ts';

/** structurally identical to the engine's internal Plan (matchup.ts — not exported at the pin) */
export interface PlanShape { off: OffPlan; def: { pkg: 'base' | 'nickel'; focus: 'run' | 'neutral' | 'pass' } }

export interface SimInput {
  homeSlots: Readonly<Record<SlotId, number>>;
  awaySlots: Readonly<Record<SlotId, number>>;
  /** the USER team's focus (pre-game pick or halftime change) */
  homeFocus: string;
  /** away focus: an explicit focus id, or 'auto' (CPU picks by situation) */
  awayFocus: string;
  seed: number;
  playoff?: boolean;
  /** Q4 automatics on/off (the toggle exists for testing; product default on) */
  quarterAutomatics?: boolean;
}

export interface SimOutput {
  result: GameResult;
  /** the decisions the automatics layer took, in order */
  focusLog: AutoDecision[];
  /** effective plans used (post-override, if the override fired) */
  homePlan: PlanShape;
  awayPlan: PlanShape;
  /** score at the start of the 4th quarter (the automatics' trigger state) */
  q4StartDiff: number;
}

function ratingsFrom(slots: Readonly<Record<SlotId, number>>): Ratings {
  return teamRatings(spotsFromRecord({ ...Object.fromEntries(SLOT_IDS.map((s) => [s, 70])), ...slots }));
}

function q4StartDiff(r: GameResult): number {
  let home = 0;
  let away = 0;
  for (const e of r.events) {
    if (e.period >= 4) break;
    if (e.side === 'home') home += e.pts;
    else away += e.pts;
  }
  return home - away;
}

function buildMatchup(
  self: Ratings,
  opp: Ratings,
  lg: Ratings,
  plan: PlanShape,
): Matchup {
  // The engine's matchup model takes one side's ratings + the full plan (off plan
  // for this side, def plan for the opponent). PlanShape is structurally identical
  // to the engine's internal Plan type (which is not exported at the pin).
  return matchupModel(self, opp, lg, plan);
}

export function simulateWithFocus(input: SimInput): SimOutput {
  const auto = input.quarterAutomatics ?? true;
  const home = ratingsFrom(input.homeSlots);
  const away = ratingsFrom(input.awaySlots);
  const lg = leagueBaseline([home, away]);

  const rng: Rng = makeRng(input.seed);
  const homePlan: PlanShape = { off: focusOffPlan(input.homeFocus), def: DEFAULT_PLAN.def };
  const awayFocus = input.awayFocus === 'auto'
    ? autoPickFocus({ diff: 0, quarter: 1, oppSlots: input.homeSlots })
    : input.awayFocus;
  const awayPlan: PlanShape = { off: focusOffPlan(awayFocus), def: DEFAULT_PLAN.def };

  const opts: GameOptions = { playoff: input.playoff ?? false };
  const mh0: Matchup = buildMatchup(home, away, lg, homePlan);
  const ma0: Matchup = buildMatchup(away, home, lg, awayPlan);
  let result = simulateGame(mh0, ma0, rng.fork('game'), opts);

  const diff = q4StartDiff(result);
  const focusLog: AutoDecision[] = [];
  if (auto) {
    focusLog.push(...automatics({ diff, quarter: 4, oppSlots: input.awaySlots }, input.homeFocus));
    const ov = focusLog.find((d) => d.key === 'strat-override');
    if (ov) {
      // documented approximation: re-run the whole game with the override applied
      const f = focusOffPlan(input.homeFocus);
      const overridden: PlanShape = { off: { ...f, strat: 'pass' }, def: DEFAULT_PLAN.def };
      const mh1: Matchup = buildMatchup(home, away, lg, overridden);
      result = simulateGame(mh1, ma0, rng.fork('game'), opts);
    }
  }
  return { result, focusLog, homePlan, awayPlan, q4StartDiff: diff };
}
