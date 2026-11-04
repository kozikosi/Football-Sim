// Game plans: win probability of a plan against what the coach expects, and each team's coaching identity (the plan he
// picks against an average opponent). Both coaches best-respond; offence and defence are chosen independently.
// The mixed-strategy table Pre-Colors sampled per game (choosePlans / samplePlans) is a step 6 job.
import { DEFAULT_DEF, DEF_OPTS, matchupModel, NEUTRAL_OFF, normCdf, OFF_OPTS } from './matchup.ts';
import type { Matchup } from './matchup.ts';
import type { Ratings } from './ratings.ts';
import type { DefPlan, OffPlan, Plan } from './specs.ts';

export function wpFrom(mX: Matchup, mY: Matchup, hf: number): number {
  return normCdf((mX.structPts - mY.structPts + hf) / Math.sqrt(mX.sd * mX.sd + mY.sd * mY.sd));
}

function argBest<T>(opts: readonly T[], f: (o: T) => number): { o: T; v: number } {
  let best = opts[0], bv = -Infinity;
  for (const o of opts) { const v = f(o); if (v > bv) { bv = v; best = o; } }
  return { o: best, v: bv };
}

export interface Identity { off: OffPlan; def: DefPlan; tilt: number; tiltD: number }

export function teamIdentity(R: Ratings, lg: Ratings): Identity {
  const exp: Plan = { off: NEUTRAL_OFF, def: DEFAULT_DEF };
  let off = NEUTRAL_OFF, def = DEFAULT_DEF;
  const offUtil = (o: OffPlan) => wpFrom(matchupModel(R, lg, lg, { off: o, def: exp.def }), matchupModel(lg, R, lg, { off: exp.off, def }), 0);
  const defUtil = (d: DefPlan) => wpFrom(matchupModel(R, lg, lg, { off, def: exp.def }), matchupModel(lg, R, lg, { off: exp.off, def: d }), 0);
  for (let it = 0; it < 2; it++) {
    off = argBest(OFF_OPTS, offUtil).o;
    def = argBest(DEF_OPTS, defUtil).o;
  }
  const dRB = R.rb - lg.rb, dOL = R.olRun - lg.olRun, dQB = R.qb - lg.qb, dRec = R.rec - lg.rec, dOLp = R.olPass - lg.olPass;
  const tilt = 0.35 * dRB + 0.65 * dOL - (0.45 * dQB + 0.3 * dRec + 0.25 * dOLp);
  const tiltD = R.frontRun - lg.frontRun - (0.5 * (R.coverage - lg.coverage) + 0.5 * (R.passRush - lg.passRush));
  return { off, def, tilt, tiltD };
}

// Expected result of a game under given plans (no randomness).
export interface Projection { home: Matchup; away: Matchup; homeWinProb: number }
export function projectGame(H: Ratings, A: Ratings, lg: Ratings, plans: { home: Plan; away: Plan }, homeField: number): Projection {
  const home = matchupModel(H, A, lg, { off: plans.home.off, def: plans.away.def });
  const away = matchupModel(A, H, lg, { off: plans.away.off, def: plans.home.def });
  return { home, away, homeWinProb: wpFrom(home, away, homeField) };
}
