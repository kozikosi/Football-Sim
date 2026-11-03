// Margin model (step 9a). The matchup model gives each team a continuous score; rounding it leaves margins spread almost flat
// (1-8 points each about 5-6%), so the engine had too few ties (overtime in 3.3% of games) and no clustering on 3 and 7.
// Here the REGULATION margin is mapped onto the real one by a monotone (quantile) coupling: the closest games of the engine become
// the closest games of the league, and the margin pmf matches the target by construction. Who wins is never changed (the sign of
// the continuous difference decides, a tie draws a side); only HOW BIG the margin is. Pure and deterministic given an Rng.
//
// Target = real final margins (nflverse regular season 2020-24, 1,343 games, `_agents/data/nflverse-margins-ot-2020-2024.json`,
// VERIFIED 31 Oct) minus the overtime games' share, because overtime games are tied after 60 minutes: regulation margin 0 is
// 5.88% (the measured overtime rate). The overtime games' final margins come from the engine's own overtime model
// (measured: 3 pts 40%, 6 pts 29%, 7 pts 16%, 4 pts 7%, tie 7%). SOURCE = the engine's regulation margin pmf before this step
// (measured over 10,880 league-like games by tools/margins.ts); if the matchup model changes, re-measure and update SOURCE.
import type { Rng } from './rng.ts';

export const MARGIN_BINS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11-14', '15+'] as const;
// percent of games
export const SOURCE_PCT: readonly number[] = [3.27, 5.78, 5.88, 5.85, 5.91, 5.93, 5.2, 5.41, 5.17, 4.48, 4.26, 16.0, 26.85];
export const TARGET_FINAL_PCT: readonly number[] = [0.3, 4.62, 4.99, 14.52, 4.91, 4.77, 7.37, 7.3, 4.69, 2.01, 5.29, 9.98, 29.26];
export const OT_RATE_PCT = 5.88;
const OT_FINAL_SHARE: readonly number[] = [0.073, 0, 0, 0.396, 0.073, 0, 0.292, 0.157, 0, 0, 0, 0.008, 0];   // share of OT games ending on each margin

const norm = (xs: readonly number[]): number[] => { const s = xs.reduce((a, b) => a + b, 0); return xs.map((x) => x / s); };
export const TARGET_REG: readonly number[] = norm(TARGET_FINAL_PCT.map((t, i) => (i === 0 ? OT_RATE_PCT : Math.max(0, t - OT_RATE_PCT * OT_FINAL_SHARE[i]))));
const SRC = norm(SOURCE_PCT);

// P[b][m] = chance an engine margin in bin b becomes target bin m (overlap of the two cumulative intervals)
export const COUPLING: readonly (readonly number[])[] = (() => {
  const n = SRC.length, cs: number[] = [0], ct: number[] = [0];
  for (let i = 0; i < n; i++) { cs.push(cs[i] + SRC[i]); ct.push(ct[i] + TARGET_REG[i]); }
  return SRC.map((p, b) => TARGET_REG.map((_, m) => (p === 0 ? (b === m ? 1 : 0) : Math.max(0, Math.min(cs[b + 1], ct[m + 1]) - Math.max(cs[b], ct[m])) / p)));
})();

const binOf = (d: number): number => (d <= 10 ? d : d <= 14 ? 11 : 12);
// a score a team can reach with touchdowns (6-8) and field goals (3): 0, 3, 6 or more (decompose needs this)
const feasible = (s: number): boolean => s === 0 || s === 3 || s >= 6;

// Change the margin of (w, l), w >= l, to exactly `m` keeping the game total close to what it was and both scores reachable.
function withMargin(w: number, l: number, m: number): [number, number] {
  if (m === 0) return [w, w];
  let best: [number, number] = [w, l], cost = Infinity;
  for (let L = 0; L <= 45; L++) {
    const W = L + m;
    if (!feasible(L) || !feasible(W) || W > 58) continue;
    const dT = W + L - (w + l), c = 1.5 * Math.abs(dT) + (dT < 0 ? 1.5 * -dT : 0) + Math.abs(W - w) + Math.abs(L - l);   // keep the game total first, then change as little as possible
    if (c < cost) { cost = c; best = [W, L]; }
  }
  return best;
}

// hs, as: rounded regulation scores; homeLeads: who the continuous model had ahead (decides the winner when they are level)
export function reshapeScores(hs: number, as: number, homeLeads: boolean, rng: Rng): [number, number] {
  const homeWins = hs === as ? homeLeads : hs > as;
  const w = homeWins ? hs : as, l = homeWins ? as : hs, d = w - l, b = binOf(d);
  let u = rng.next(), m = 0;
  const row = COUPLING[b];
  for (; m < row.length - 1; m++) { u -= row[m]; if (u < 0) break; }
  let target: number;
  if (m <= 10) target = m;
  else if (m === 11) target = binOf(d) === 11 ? d : rng.int(11, 14);
  else target = d >= 15 ? d : rng.int(15, 24);
  const [W, L] = withMargin(w, l, target);
  return homeWins ? [W, L] : [L, W];
}
