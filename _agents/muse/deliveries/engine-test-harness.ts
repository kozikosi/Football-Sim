// ENGINE TEST HARNESS — copy-paste starter for council engine tests.
// Setup: mkdir -p /tmp/mytest && cd ~/workspace/football-sim-muse &&
//   git archive origin/architect/engine-and-seats colors data tools | tar -x -C /tmp/mytest
// Run: node --experimental-strip-types your-test.ts
//
// Replace ENGINE_DIR if you extracted elsewhere.
import { teamRatings, spotsFromRecord, leagueBaseline } from '/tmp/mytest/colors/src/engine/ratings.ts';
import { SLOT_IDS } from '/tmp/mytest/colors/src/engine/slots.ts';
import { simulateGame } from '/tmp/mytest/colors/src/engine/drives.ts';
import { matchupModel, DEFAULT_PLAN } from '/tmp/mytest/colors/src/engine/matchup.ts';
import { wpFrom } from '/tmp/mytest/colors/src/engine/plans.ts';
import { makeRng } from '/tmp/mytest/colors/src/engine/rng.ts';
import { TEAMS } from '/tmp/mytest/colors/src/engine/league.ts';

export const base = Object.fromEntries(SLOT_IDS.map((s) => [s, 80]));
export const mkRatings = (rec) => teamRatings(spotsFromRecord(rec));
export const lg = leagueBaseline(TEAMS.map((t) => mkRatings(base)));
export const opp80 = mkRatings(base);

// --- Helper: 80->99 single-position sweep, returns {diff, winPct} ---
export function sweepUpgrade(slot, n = 1500, seedBase = 9000, dPlan = DEFAULT_PLAN.def, oPlan = DEFAULT_PLAN.off) {
  const test = mkRatings({ ...base, [slot]: 99 });
  const mh = matchupModel(test, opp80, lg, { off: oPlan, def: dPlan });
  const ma = matchupModel(opp80, test, lg, { off: oPlan, def: dPlan });
  let diff = 0, wins = 0;
  for (let i = 0; i < n; i++) {
    const r = simulateGame(mh, ma, makeRng(seedBase + i), { playoff: false, homeField: 0 });
    diff += r.homeScore - r.awayScore;
    if (r.homeScore > r.awayScore) wins++;
  }
  return { diff: diff / n, winPct: 100 * wins / n };
}

// --- Helper: expected yards/turnovers/sacks for a matchup (no sim needed) ---
export function expected(offRec, defRec, oPlan = DEFAULT_PLAN.off, dPlan = DEFAULT_PLAN.def) {
  const ma = matchupModel(mkRatings(offRec), mkRatings(defRec), lg, { off: oPlan, def: dPlan });
  return { expRush: ma.expRush, expPass: ma.expPass, lamTO: ma.lamTO, lamSack: ma.lamSack, structPts: ma.structPts };
}

// --- Helper: predicted win% (structPts-based) vs simulated win% ---
// A divergence here means the model and the simulation disagree — that's a bug lead.
export function predictVsRealize(testRec, n = 2000, seedBase = 999) {
  const test = mkRatings(testRec);
  const mh = matchupModel(test, opp80, lg, DEFAULT_PLAN), ma = matchupModel(opp80, test, lg, DEFAULT_PLAN);
  const predicted = 100 * wpFrom(mh, ma, 0);
  let wins = 0;
  for (let i = 0; i < n; i++) {
    const r = simulateGame(mh, ma, makeRng(seedBase + i), { playoff: false, homeField: 0 });
    if (r.homeScore > r.awayScore) wins++;
  }
  return { predicted, realized: 100 * wins / n, gap: predicted - 100 * wins / n };
}

// --- Example: uncomment to run a quick smoke test ---
// console.log('CB1 upgrade:', sweepUpgrade('CB1'));
// console.log('MIKE vs avg run:', expected({ ...base }, { ...base, MIKE: 99 }));
// console.log('Punter predict-vs-realize:', predictVsRealize({ ...base, P: 99 }));
