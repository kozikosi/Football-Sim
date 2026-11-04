// E5: the two stamps every save carries (envelope.engineVersion, envelope.dataVersion).
// They are informational on resume: a save holds frozen players and materialised results, so an old save still opens. The stamps let the
// app say "this save is from an earlier version" and let tests prove that a change to the rules or the data is visible.
import { hash53 } from '../../../core/hash.ts';
import { DEFAULT_CONFIG } from '../engine/draft.ts';
import { EMERGENCY_PENALTY, FLEX } from '../engine/flex.ts';
import { SLOTS } from '../engine/slots.ts';
import * as S from '../engine/specs.ts';

// The sport's own engine revision. Bump by hand when engine LOGIC changes in a way the constants below cannot show (a new formula, a changed fork label).
export const ENGINE_LABEL = 'nfl1';          // sport + revision; the envelope's `sport` field says the same, the label keeps a stamp readable on its own

// Everything that sets how a season plays out and how the CPU drafts: the protected tables and constants, as one JSON text.
export function rulesText(): string {
  const { RATING_SPECS, DEF_SPECS, PERS_REC, RB_HEAVY, PERS, STRAT, DEF_FOCUS, PLAN_K, MC, RUSH_BASE, PASS_BASE, PT_RUSH, PT_PASS, PT_TO, PT_SACK, LAM_TO, LAM_SACK, BASE_PTS, HOME_FIELD, PTS_NOISE, RET_PTS, RET_NEUTRAL, QB_RUN_C, WR_BLK_C, WR_BLK_W, PUNT_PTS, DIME_W, POINTS_PER_WIN, GAMES } = S;
  return JSON.stringify([SLOTS, FLEX, EMERGENCY_PENALTY, DEFAULT_CONFIG, RATING_SPECS, DEF_SPECS, PERS_REC, RB_HEAVY, PERS, STRAT, DEF_FOCUS, PLAN_K, MC,
    [RUSH_BASE, PASS_BASE, PT_RUSH, PT_PASS, PT_TO, PT_SACK, LAM_TO, LAM_SACK, BASE_PTS, HOME_FIELD, PTS_NOISE, RET_PTS, RET_NEUTRAL, QB_RUN_C, WR_BLK_C, WR_BLK_W, PUNT_PTS, DIME_W, POINTS_PER_WIN, GAMES]]);
}
export const engineVersion = (): string => ENGINE_LABEL + '.' + hash53(rulesText());

// The data stamp: the three data files exactly as shipped (ratings, free agents, player-id crosswalk). Line endings are normalised so a
// Windows checkout does not change it.
export function dataVersion(ratingsCsv: string, freeAgentsCsv: string, idsCsv: string): string {
  const norm = (t: string) => t.replace(/\r\n/g, '\n');
  return hash53(norm(ratingsCsv) + '\u0001' + norm(freeAgentsCsv) + '\u0001' + norm(idsCsv));
}
export const stamps = (ratingsCsv: string, freeAgentsCsv: string, idsCsv: string): { engineVersion: string; dataVersion: string } =>
  ({ engineVersion: engineVersion(), dataVersion: dataVersion(ratingsCsv, freeAgentsCsv, idsCsv) });

// How a stamped save compares with this build. Never blocks a resume.
export interface Drift { engine: boolean; data: boolean; any: boolean }
export function drift(saved: { engineVersion: string; dataVersion: string }, current: { engineVersion: string; dataVersion: string }): Drift {
  const engine = saved.engineVersion !== current.engineVersion, data = saved.dataVersion !== current.dataVersion;
  return { engine, data, any: engine || data };
}
