SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: D6 — C20 ratings→gap design sketch (post-cutover) | DATE: 2026-11-20T04:27Z
FOR: C20 (ratings→gap mapping)

# D6 — features, two formula shapes, target distribution, falsification

STATUS: design proposal for the Architect's post-cutover track. Nothing built; passGap is report-only and no per-team gap exists in the product today.

## What exists now (VERIFIED)

`passclass.ts` exposes `PassClass` with `theta: number[]` ("how a duty gap splits across the classes (NOT fitted yet)") and `lambda` (0 = neutral); `drive.ts` has `export interface Matchup { readonly passGap?: number }` and `tilt(p, theta, lambda, gap)` with `P_k ∝ p_k * exp(lambda * theta_k * gap)`. There is **no** `passGap(offense, defense)` producer in product code. The passGap report §3: "The product has no per-team gap in r units. It has ratings." Ratings source is `data/nfl/madden27-ratings.csv` (no games-played field on it). No factual data may be invented (§7) — any mapping must be derived from those ratings and a documented formula.

## Candidate features (from passGap report §3)

QB; receivers; protection vs pass rush; coverage. Group the existing rating columns into those four duties; keep the sign convention explicit (positive favours offence).

## Two formula shapes

- **A — weighted z-scores of rating groups:** standardise each duty group across the league, `gap = Σ w_d · z_d`, with weights documented and reproducible. Simple, auditable; ERNIE C26 #3 names this shape.
- **B — additive-logit on duty gaps:** feed `theta`-weighted duty gaps into the existing `tilt()` seam (`P_k ∝ p_k · exp(lambda · theta_k · gap)`). Plan M calls the additive-logit matchup the native model; it reuses the engine seam rather than adding a second one.

## Target distribution (from passGap report + ERNIE C2)

Mean 0, sd ≈ 0.024 for the combined gap; 0.45 / 0.2 persistence; match game-level (within-season) variance. ERNIE's acceptance conditions: sd within ±20% of 0.024; year-to-year r ≥ 0.3 offence / ≥ 0.1 defence; points within ±4% at |s| = 0.25; explicit sign convention. **Do not** target the in-season split-half (0.54/0.36) as the mapping target.

## Falsification

Fit `gap = f(ratings)` against the tool's team-season tilt-score tables; falsified if sd is off by >~2× or persistence falls below the measured values. **Report, not gate** — a failed fit is a finding, not a reason to tune λ or the protected constants. Post-cutover only; no product change now.
