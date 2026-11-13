/**
 * lambda_context_draft.ts — the fluctuating dial as a PARAMETER over a stable
 * structure. Part B(b) of the comprehensive prompt, shipped AS A FILE.
 *
 * STATUS: SKETCH (this wave's settle criterion: "the dial-as-parameter form
 * shipped as a file"). It is a design artifact — typed, complete in shape,
 * deliberately NOT wired to the engine, the product, or the contract. The
 * Architect consumes the shape; nothing imports this file.
 *
 * Server-ready by construction: no browser APIs, no Math.random, no Date.now,
 * no UI state, no local storage. Defined inputs → defined outputs.
 *
 * Frame (PD.1 / Part B): the merged formula is the stable structure; λ is
 *   λ(g) = λ0 · (1 + X_g′β)
 * with λ0 the flat prior (anchor, 0.40), β penalized toward zero, fitted on
 * 2016–22, validated on the frozen 2023–25 holdout, admitted only through the
 * held-out gate. The dial's ONLY input is the frozen context snapshot — never
 * the screen, never live engine state (GLM §2.4 / Pickle §4 input contract).
 *
 * Origins (Ruling 14 — combined, not invented): INKLING's flat-prior form
 * (`council/inkling inbox/20261113-0300`, §Q6) + Beam's function-shape
 * candidate (`council/beam inbox/20261113-1932`). The snapshot-as-input law is
 * this module's addition; the two-regime selector is D.9's extension.
 */

// ---------------------------------------------------------------------------
// 1 · The context snapshot — the ONLY portal between save/week and the dial.
//     Frozen per period, serializable, hashable, never recomputed per screen.
// ---------------------------------------------------------------------------

export type Regime = "regulated" | "chaotic";

export interface ContextSnapshot {
  /** identity of the snapshot — stable across screens for one save/week */
  readonly week: number;
  readonly saveId: string;

  // -- the Owner's concept list (verbatim-anchored), all measured, never estimated:
  readonly playoffs: boolean;                  // schedule
  readonly divisional: boolean;                // team pairs (public)
  readonly rivalry: boolean;                   // flag: table-driven, data-conditional
  readonly oneScoreStakes: boolean;            // game score state from the sim
  readonly lateGame: boolean;                  // quarter/clock state from the sim
  readonly keyPlayersOut: readonly string[];   // participation files (no injuries — rest/form only)
  readonly opponentStrength: { front: number; secondary: number; qb: number }; // OVR aggregates
  readonly dominantGroups: readonly ("OL" | "DL" | "secondary" | "backfield")[];
  readonly aggressiveness: number;             // 0–1, team-season go/2pt rates (public, pbp)
  readonly tempo: number;                      // possessions/team-game (P-344 carries it)
  readonly passEnvironment: number;            // league pass-rate era proxy (per-season)

  /** regime selection is context-computed, never user-togglable (D.9 ext. 5) */
  readonly regime: Regime;
}

/** The consistency invariant: one save+week → one snapshot → one hash.
 *  CI gate the day the snapshot ships (Part B §4). */
export function snapshotKey(saveId: string, week: number): string {
  return `${saveId}@${week}`;
}

/** Pure, dependency-free hash over the snapshot's serialized shape — the
 *  round-trip gate (`hash(save, week) -> hash(contextSnapshot)`) compares
 *  this value across screens/sessions; a mismatch is a contract bug, not a
 *  display choice. FNV-1a 32-bit: deterministic, integer-only, portable. */
export function hashSnapshot(s: ContextSnapshot): number {
  const canon = JSON.stringify([
    s.week, s.saveId, s.playoffs, s.divisional, s.rivalry,
    s.oneScoreStakes, s.lateGame, [...s.keyPlayersOut].sort(),
    s.opponentStrength.front, s.opponentStrength.secondary, s.opponentStrength.qb,
    [...s.dominantGroups].sort(), s.aggressiveness, s.tempo,
    s.passEnvironment, s.regime,
  ]);
  let h = 0x811c9dc5;
  for (let i = 0; i < canon.length; i++) {
    h ^= canon.charCodeAt(i);
    h = (h * 0x01000193) >>> 0; // keep it uint32; integer-only arithmetic
  }
  return h;
}

// ---------------------------------------------------------------------------
// 2 · The dial — λ(snapshot, mechanics). The stable structure is untouched;
//     only the multiplier moves, and only through the acceptance gate.
// ---------------------------------------------------------------------------

/** The context axes (the three that earn-or-fail the method first — GLM's
 *  discipline, adopted; new axes are NOT authored until these resolve). */
export type Axis = "playoff" | "divisional" | "keyPlayerPresence";

/** β — the fitted multipliers. Defaults are the zero vector: the module
 *  DEGRADES to the flat prior when the data has admitted nothing. */
export type AxisBeta = Partial<Record<Axis, number>>;

export interface LambdaParams {
  /** flat prior — the anchor the dial returns to. NOT the answer; the anchor. */
  readonly lambda0: number;        // 0.40
  readonly beta: AxisBeta;         // fitted 2016–22, β=0 default
  /** the two-regime cap (D.9 ext. 5): context selects one of TWO calibrated
   *  sets; the regimes' HFA/margin-σ cells calibrate first (the D.8 receipt). */
  readonly regimeScale: Record<Regime, number>; // e.g. { regulated: 1.0, chaotic: 1.0 }
}

/** The dial. Pure function of (snapshot, params). No side effects, no state.
 *  mechanics: the stable structure's own face (reserved — the dial reads the
 *  structure's identity, never mutates it; kept in the signature so the gate
 *  can assert "same mechanics, same λ for the same snapshot"). */
export function lambdaFor(
  snapshot: ContextSnapshot,
  params: LambdaParams,
  mechanics: { formId: string; collapse: "min" | "mean" | "max"; displayLaw: string },
): number {
  // axis contributions: additive in the (1+Xβ) space, capped so one axis can
  // never dominate the prior (the anti-runaway bound; the cap is a parameter
  // the gate reviews, not a constant smuggled past it).
  const CAP = 0.5;
  let x = 0;
  if (snapshot.playoffs) x += params.beta.playoff ?? 0;
  if (snapshot.divisional || snapshot.rivalry) x += params.beta.divisional ?? 0;
  if (snapshot.keyPlayersOut.length > 0) x += params.beta.keyPlayerPresence ?? 0;
  x = Math.max(-CAP, Math.min(CAP, x));

  const regimeScale = params.regimeScale[snapshot.regime] ?? 1.0;
  return params.lambda0 * (1 + x) * regimeScale;
}

// ---------------------------------------------------------------------------
// 3 · The acceptance gate — the dial's owner of truth. β ships only when the
//     gate clears; otherwise the flat prior is the measured answer.
// ---------------------------------------------------------------------------

export interface GateResult {
  axis: Axis;
  /** held-out (2023–25) wrong-strict-pairs: the 23-vs-305 discriminant, per axis */
  wrongStrictPairsFixed: number;
  wrongStrictPairsFluctuating: number;
  /** exact tiers preserved? (the board's tier set must not move) */
  exactTiersPreserved: boolean;
  /** mae quoted WITH its units caveat — never as a standalone claim */
  maeFluctuating: number;
  maeUnitsCaveat: string;   // e.g. "raw-price mae vs small integer labels partially measures dial height"
  /** bootstrap CI on the improvement must exclude 0 to accept */
  improvementCI95: [number, number];
  accepted: boolean;
}

/** The ship rule, as code. Parsimony defaults to STATIC. */
export function gateAdmits(g: GateResult): boolean {
  const improved =
    g.wrongStrictPairsFluctuating < g.wrongStrictPairsFixed &&
    g.exactTiersPreserved;
  const ciExcludesZero = g.improvementCI95[0] > 0 || g.improvementCI95[1] < 0;
  const ciExcludesZeroPos = g.improvementCI95[0] > 0; // improvement is one-sided here
  return improved && ciExcludesZeroPos && g.accepted === (improved && ciExcludesZero);
}

// ---------------------------------------------------------------------------
// 4 · The monitor — the 11 flip rows watched at their PREMIUM DESTINATIONS
//     (Part B §6: WR1 ×2, DT1, SS/FS, TE1, RB1, OG1 — where the user pays).
// ---------------------------------------------------------------------------

export interface DestMonitorRow {
  dest: string;          // "WR1" | "DT1" | ...
  wins: number;          // the destination's measured value (localWins basis)
  tierFixed: number;     // displayed tier under the flat prior
  tierFluctuating: number; // under the gated dial
}

export function premiumDestinationAlerts(rows: DestMonitorRow[]): DestMonitorRow[] {
  const PREMIUM = new Set(["WR1", "DT1", "SS", "FS", "TE1", "RB1", "OG1"]);
  return rows.filter(
    (r) => PREMIUM.has(r.dest) && r.tierFixed !== r.tierFluctuating,
  );
}

// ---------------------------------------------------------------------------
// 5 · What this module deliberately does NOT do
// ---------------------------------------------------------------------------
// - It does not touch colors/src, flex.json, flex.ts, or any protected constant.
// - It does not show the user anything: λ never reaches a screen (Wins stays
//   flat-prior-derived under the fit-layer-only default — the Owner's call).
// - It does not estimate unmeasured context: any covariate the data does not
//   carry is DROPPED with a label, never proxied (C.2's rule, generalized).
// - It does not promise the dial moves: β=0 is a valid, shipped state, and the
//   gate is the only thing that can change it.
/* END OF SKETCH */
