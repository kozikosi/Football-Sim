// The SportSpec contract — the seam that makes amused multisport.
// From GPT's multisport TARGET_ARCHITECTURE.md + Claude's ARCHITECTURE-DIRECTION.md Stage 7:
// a sport is DATA (slots, flex, composition, target values) plus a GAME MODEL.
// The engine consumes the spec; a second sport is a new package implementing this
// interface, not a rewrite and not a disguised NFL engine.
import type { Rng } from './rng.ts';

// A roster spot: its id, its fitted weight (wins-value per OVR point in the sport's
// fixed unit), the destination name the flex table uses, and which unit it belongs to.
export interface SlotDef {
  id: string;
  weight: number;
  dest: string;
  unit: 'offense' | 'defense' | 'special';
}

// Flex table: role -> destination -> OVR penalty. 0 = natural. The engine derives
// anything else (e.g. rotational-spot rules) from this table; nothing is invented.
export type FlexTable = Readonly<Record<string, Readonly<Record<string, number>>>>;

// A player in the sport's roster model. The engine only needs an id, a role for the
// flex table, and a rating number; everything else is the sport's business.
export interface Player {
  id: string;
  role: string;
  ovr: number;
}

// What the engine is asked to do, and what it returns. The scenario is validated
// before the engine sees it; the result envelope carries the seed so any run can
// be reproduced exactly.
export interface Scenario {
  sportId: string;
  competitionId: string;
  rulesetVersion: string;
  dataVersion: string;
  seed: number;
}

export interface SimResult {
  scenario: Scenario;
  // sport-specific payload (games, standings, awards...); the envelope stays generic
  payload: unknown;
}

// The contract every sport package implements.
export interface SportSpec {
  id: string;                       // 'nfl'
  slots: readonly SlotDef[];        // roster spots + fitted weights (one weight source)
  flex: FlexTable;                  // the sport's flex guide, verbatim
  bases: readonly string[];         // formations, e.g. ['4-3', '3-4']
  emptyOvr: number;                 // rating of an unfilled spot (NFL: 70)
  weightUnitWins: number;           // wins per (weight point × OVR point), NFL: 0.00254/20

  validateScenario(s: Scenario): string[];                    // [] = valid; else reasons
  simulate(scenario: Scenario, rng: Rng): SimResult;           // deterministic in (scenario, seed)
}

// Storage seam (v1: localStorage; later: cloud). The core never touches storage directly.
export interface SaveStore {
  save(key: string, value: string): void;
  load(key: string): string | null;
  remove(key: string): void;
  list(prefix: string): string[];
}
