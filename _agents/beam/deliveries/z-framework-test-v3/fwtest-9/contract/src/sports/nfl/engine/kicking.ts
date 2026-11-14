// In-season kicker rating (Owner 28 Oct: "80 for their in season rating"; a kicker who is 2/4 after week 1 must not
// be a key player; makes from 60+ yards earn more than short ones). Pure functions, no state.
//
// MODEL ASSUMPTIONS (INFERRED, to be fitted on real field-goal data before the Owner is asked to accept the numbers):
//  * LEAGUE_CURVE: make probability for an average kicker by distance in yards.
//  * LONG_BONUS: a make from beyond 45 yards counts up to 1 + (d-45)/20 times as much as a short one.
//  * PRIOR_ATTEMPTS: how many weighted attempts the preseason (Madden) rating is worth before the season speaks.
//  * SCALE: rating points moved by a performance edge of one full weighted make over expectation per prior+observed attempt.
export interface Kick { dist: number; made: boolean }

const CURVE: ReadonlyArray<readonly [number, number]> = [
  [18, 0.995], [30, 0.965], [40, 0.89], [45, 0.82], [50, 0.72], [55, 0.60], [60, 0.45], [65, 0.30], [70, 0.15],
];
export function leagueMakeProb(dist: number): number {
  if (dist <= CURVE[0][0]) return CURVE[0][1];
  for (let i = 1; i < CURVE.length; i++) {
    const [d1, p1] = CURVE[i], [d0, p0] = CURVE[i - 1];
    if (dist <= d1) return p0 + ((p1 - p0) * (dist - d0)) / (d1 - d0);
  }
  return 0.05;
}
export const PRIOR_ATTEMPTS = 6;
export const SCALE = 24;
export const MAX_DROP = 16;   // a kicker never loses more than this many points in a season
export const MAX_GAIN = 10;

export function kickWeight(dist: number): number { return 1 + Math.max(0, dist - 45) / 20; }

export function inSeasonKickerRating(preseason: number, kicks: readonly Kick[]): number {
  let edge = 0, weight = 0;
  for (const k of kicks) {
    const w = kickWeight(k.dist);
    edge += ((k.made ? 1 : 0) - leagueMakeProb(k.dist)) * w;
    weight += w;
  }
  const delta = (SCALE * edge) / (weight + PRIOR_ATTEMPTS);
  return preseason + Math.max(-MAX_DROP, Math.min(MAX_GAIN, delta));
}

// Who may appear in a matchup's key-player list: kickers only at 80+ in-season; punters never.
export const KEY_KICKER_MIN = 80;
export function kickerIsKeyPlayer(inSeasonRating: number): boolean { return inSeasonRating >= KEY_KICKER_MIN; }
