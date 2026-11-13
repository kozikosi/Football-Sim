// index.ts — the engine contract's public API. The ONLY surface the five
// prototypes may import (the leakage scan enforces it).
export { makeRng, forkSeed, hashString, type Rng } from './core/rng.ts';
export { SLOT_IDS, type SlotId, type Dest } from './sports/nfl/engine/slots.ts';
export { teamRatings, leagueBaseline, spotsFromRecord, type Ratings, type Spot } from './sports/nfl/engine/ratings.ts';
export { matchupModel, DEFAULT_PLAN, type Matchup, OFF_OPTS } from './sports/nfl/engine/matchup.ts';
export { simulateGame, type GameResult, type GameOptions, type ScoreEvent, type TeamGameStats, type Drive } from './sports/nfl/engine/drives.ts';
export { slotWins20, slotWins, derivedWeights } from './sports/nfl/engine/value.ts';
export {
  FOCUSES, FOCUS_VERSION, focusById, focusOffPlan, canChangeAtHalftime,
  priorityBoard, focusAdjustment, matchupFactor, oppUnitAvg,
  autoPickFocus, automatics, formArrow, FORM_Z,
  type FocusDef, type PriorityRow, type SitState, type AutoDecision, type FormArrow,
  type OffPlan, type Strat, type Pers, type Base,
} from './focus/focus.ts';
export { simulateWithFocus, type SimInput, type SimOutput, type PlanShape } from './focus/sim.ts';
export { STRONG_PASS, STRONG_FRONT } from './focus/fixtures.ts';
