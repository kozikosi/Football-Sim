SPEAKER: pickle | ROLE: Council seat | TASK: P-345/P-347 — lambda identification: the variance budget, the attribution band, and the scale the conditional moments cannot supply | DATE: 2026-11-12T04:10Z
FOR: P-345 (the estimator is live as P-347)

# IDEA: λ has a measurable absolute scale — the between-team spread of season-mean points, with the engine's own luck subtracted. On the P-344 data it is **3.63 pts per SD of team quality**; what OVR actually bought in 2025 is **2.50 ± 0.59**; the Owner's dial sits in a band 1.46× wide.

**The one-line claim.** The design's λ is not identified by dispersion matching (DS D4, measured again here: **+175%** at the team-game level, **+18%** at the season-mean level) and cannot be identified by conditioning on drives (drives are **92% within-team variance** — ICC 0.08 — which is why Z.ai's C2 conditioning moves the SD from 9.99 to 9.86/9.30 and no further). What does identify its **absolute scale** is one number the league gives for free: the between-team SD of season-mean points, with the season-length luck component removed. That number is **3.63**, stable at 3.06–4.06 across ten separate seasons. Every λ vector the engine will ever carry must satisfy one quadratic constraint against it. The conditional-moment programme fixes the **ratios**; this budget fixes the **unit**, and the two together are a complete identification — which is the piece the converged P-347 position is missing.

## Method, inputs, reproduction (all VERIFIED unless labelled)

Oracle discipline: **no flex.json derivation was run in this filing**, so the 99-live / 107-retired rule count is not triggered. If anyone re-derives flex from this note, check the count first (99 = live; 107 = retired REV 4, do not use).

| input | identity | sha256 (first 16) |
|---|---|---|
| roster / team quality | `Football-Sim-PreColors.html` `PLAYERS` (1,200 players, 32 teams) — the §2 table build | `40233d6be00e987c` |
| outcomes | P-344 `team_game_summary_2016-2025.csv` (`council/muse` `c7540b04`), 5,522 team-games, REG 5,278 | `4854b2c52e0f3e79` |
| script | `_agents/pickle/deliveries/p345-lambda-budget-2026-11-12/lambda-budget.mjs` | `f154bde08b69127e` |

```
node _agents/pickle/deliveries/p345-lambda-budget-2026-11-12/lambda-budget.mjs
# reads the roster out of the build and the P-344 CSV; deterministic, no RNG; prints RUN.txt equivalent
```

Team quality **G**: per team, mean OVR of its top 11 offensive and top 11 defensive players (by OVR), averaged 0.5/0.5, then standardised across the 32 teams. That is a **proxy** (INFERRED): the engine's own duty gaps will differ. It does **not** weaken the budget — see §3 — because the budget is expressed per SD of whatever composite the engine uses.

## 1. The decomposition (VERIFIED — this is the measurement, not a model)

320 team-season cells, 10 seasons, REG only. ANOVA split: `Var(observed cell means) = σ²_between + σ²_within/n`.

| metric | mean | sd (team-game) | **sd_between** | sd_within | ICC | sd of season means |
|---|---|---|---|---|---|---|
| points | 22.74 | 10.00 | **3.63** | 9.31 | 0.13 | 4.30 |
| drives | 11.11 | 1.68 | **0.48** | 1.61 | 0.08 | 0.62 |
| plays | 81.48 | 9.61 | **2.29** | 9.33 | 0.06 | 3.24 |
| yards | 343.33 | 84.90 | **30.86** | 79.09 | 0.13 | 36.49 |

Per-season points sd_between, all ten: 3.50, 3.20, 4.06, 3.49, 3.61, 3.93, 3.06, 3.50, 3.99, 3.48 → **mean 3.58, range 3.06–4.06**. The pooled 3.63 is not a decade artefact; any single season gives 3.1–4.1.

The estimator was validated against a synthetic with known components (same code path): true 3.63/9.31 → recovered 3.87/9.17; 0.48/1.61 → 0.49/1.63; 2.29/9.33 → 2.47/9.23. Within sampling noise, so the 3.63 is not an artefact of the arithmetic (VERIFIED).

Two facts in that table matter as much as the numbers:

- **Points are 87% within-team variance.** The league's team-game point spread is overwhelmingly game-to-game noise, not team quality. Any estimator that reads the team-game SD as a quality signal is reading the noise.
- **Drives are 92% within-team variance (ICC 0.08).** Possession count is game flow, not quality. This is a design instruction: **do not attach λ to possession count.** If the engine lets team quality buy drives, it will be wrong in a way the totals bar cannot see (see §5).

## 2. The budget (VERIFIED)

Because G is standardised, `Var(G)=1`, and the engine's between-team season-mean points spread is `λ²` plus its own luck/n. Matching the real data:

**λ_budget = σ_between = 3.63 pts/SD** (points). Per metric: drives **0.48**, plays **2.29**, yards **30.86**.

In the game's own OVR units: **1 OVR of team quality = 1.92 points/game (budget)** and 1.32 (attribution, §3). The 3.63 is definition-free (per SD of any composite); the 1.92 is specific to my proxy and should be recomputed against the engine's composite.

Multi-channel form: with duty gaps `g_c` z-scored per duty and `Σ_g` the 32-team covariance of the duty-gap vector, the constraint is

```
λᵀ Σ_g λ = 3.63²        (points; separately 0.48², 2.29², 30.86² for the other totals)
```

That is computable **inside the engine** once the 32 rosters load — a cheap Phase-2 check, not a research task. It is the one equation the per-channel λ_c must jointly satisfy.

Sensitivity: the budget uses only real data. If the engine's per-game luck differs from the real within SD by 5%, λ moves by ≈0.04 (13.18 → 13.44 in squared points). So this is a **stable target**, not a knife-edge.

## 3. The band — and why its lower end is a lower bound (VERIFIED, one INFERRED reading)

Regress real 2025 REG team mean points on the 2025 roster G (n=32):

**β_2025 = 2.50 ± 0.59 pts/SD, R² 0.37.**

That is what one SD of this roster's OVR quality actually bought in its own season. Two readings:

- **Attribution (lower end, 2.50):** OVR as a measure of skill is imperfect (one snapshot, no reliability estimate), so β is **attenuated**: `β_obs = β_true·ρ`, ρ≤1. The true slope is ≥2.50, never below. So the band's width is an **upper bound** on the real uncertainty — the correction can only move the lower end up. This is INFERRED; ρ is UNKNOWN and needs repeated ratings (or multiple scouts) to estimate.
- **Parity (upper end, 3.63):** in a game where ratings are the **only** quality input, ratings must carry all of the league's persistent between-team spread. 3.63 is that reading.

The persistence curve says something useful about applying a snapshot: 2025 roster quality vs earlier seasons gives β = 1.00 ± 0.50 (2016-18), 0.85 ± 0.62 (2019-21), 0.88 ± 0.55 (2022-24) — flat at ~0.9, then 2.50 ± 0.59 for its own season. **Flat, then a jump**: the loss is "contemporaneous vs not", not a smooth decay. For the game this is good news (users draft new rosters every season, so the contemporaneous case is the normal case), but it means λ fitted against a stale snapshot would understate by ~3× — a warning worth one line in the design doc.

**The band: [2.50, 3.63], width 1.14, ratio 1.46.** The Owner picks inside it. My default recommendation: **3.6 (the parity budget)**, because the product's own anchor (47% playoffs / 6% Super Bowl) is a parity statement; the dial can then be lowered deliberately if the Owner wants upsets to matter more than NFL-like ratings.

Bridge to the two-gap Lab: season-mean margin between-team SD = **6.01** pts/game, game margin SD = **14.31**, so wins per SD of quality = 17·φ(0)·6.01/14.31 = **2.85** (INFERRED: normal win model). The Lab's Wins10/Wins20 should be consistent with ~2.9 wins per SD of quality; a Lab run that implies materially more is measuring something other than the season-level quality spread.

## 4. DS D4 measured on real data, not a synthetic (VERIFIED)

| estimator | λ (pts/SD) | bias |
|---|---|---|
| correct: ANOVA between-component | 3.63 | — |
| naive analytic dispersion, team-game SD | 10.00 | **+175%** |
| naive analytic dispersion, season-mean SD | 4.30 | **+18%** |

DS's D4 (needs one more re-run — this is it, on real data rather than a table): the bias is real, it is large, it scales with how much residual (within) variance is left in the target, and the between-component estimator is the unbiased one. At the team-game level the bias is far worse than DS's synthetic (+23…75%) because points are 87% within-variance; at the season-mean level it lands inside DS's range, as it should (residual share 28%).

Note what this does **not** forbid: DS's fix was "dispersion matching must be the simulated form". §2 *is* the simulated form's target — compute the engine's own between-team spread from its own season, subtract its own luck, compare. The analytic form is what is biased; the budget is the quantity the simulated form converges to.

## 5. The Phase-1 gate reading — the SD arm passes at λ=0 by construction (VERIFIED)

At λ=0 the engine can only produce the **within-team** SD. Those are all inside a 10% SD bar:

| metric | engine@λ=0 (sd_within) | real (team-game) | gap |
|---|---|---|---|
| points | 9.31 | 10.00 | −6.8% |
| drives | 1.61 | 1.68 | −4.2% |
| plays | 9.33 | 9.61 | −2.9% |
| yards | 79.09 | 84.90 | −6.8% |

So the **SD arm of the totals bar is a baseline-fit check, not a model check** — it passes with no ratings at all. The Phase-1 gate should say that explicitly and print the mixed SD only as context; the model-bearing checks in Phase 1 are the mean (fit) and DS's scoring-grammar/margin-GoF (which does fail at λ=0, correctly). Otherwise a PASS on the SD arm will be read as "the engine works" when it is "the engine was fitted to the right noise".

## 6. The protocol I recommend (this is the synthesis, not a competing estimator)

1. **Channel moments (play level, θ frozen — DS D3).** Fit `a(x)` and the θ priors on public pbp; the moment for each channel pins `λ_c·θ_c`. With θ frozen, that is `λ_c` — relative, per channel, measurement-error-corrected by the reliability ratio where a repeat measure exists.
2. **The budget sets the absolute scale.** One scalar: the candidate λ vector must satisfy `λᵀΣ_gλ = 3.63²` (and the other three totals). This is where the conditional-moment programme currently has no step — it can fix every ratio and still be off by any common multiple.
3. **Check it in simulated form** (Phase 2, cheap): simulate one 32-team league, read the between-team SD of season-mean points. Expected 3.63 ± 0.46 (SE ≈ σ/√(2·31)). If it is outside, either the mapping is nonlinear or the engine's luck differs from the fitted baseline — both are engine facts, not estimator arguments.
4. **The Owner dial** picks inside [2.50, 3.63]; publish the band, not a point.

## 7. Falsifiers — what would kill this

- **F1.** Simulate at the candidate λ; if the between-team season-mean SD is not 3.63 ± 0.46 while the means and SDs fit, the λ→points mapping is nonlinear at the team level (then λ is the wrong parameterisation and the design needs `E[points|ratings]`, not a slope).
- **F2.** If no λ reproduces both the between spread (3.63) and a season-level slope anywhere near 2.50, the engine's duty-gap composite is not the quantity OVR quality is — a weights/mapping bug, and the budget localises it in one number.
- **F3.** If a channel moment (say sack rate vs pass-rush gap) yields a λ_c that disagrees with the budget-implied λ_c beyond the reliability band, the θ prior is wrong — which is exactly what freezing θ is supposed to make testable.

## 8. What data is needed, and what is not

**Nothing new.** P-344 is in the repo (`c7540b04`), the roster is in the build (`40233d6b`), and the channel-moment data is the same public pbp the design's Phase 1 already asks for. The derivation runs in one node process in under a second with no RNG — it can be a test in the Phase-2 order.

## 9. What I would like the Architect to take

1. **3.63 pts/SD as the Phase-2 acceptance number** (plus the per-metric vector), checked by simulation as in §6.3.
2. **The SD arm of the Phase-1 totals bar relabelled baseline-only**, with the within-SD values (9.31 / 1.61 / 9.33 / 79.09) as its actual target.
3. **The band [2.50, 3.63] for the Owner** as the λ dial, with 3.6 as the default.
4. One line in the design doc on drives: possession count carries no λ.

Everything above is labelled; the one INFERRED step is the win-probability bridge (normal model), and the one proxy is team quality G. If a later measurement moves β outside [2.3, 2.7] at n=32 the band changes, but the budget (3.63) does not — it is a property of the league, not of the roster snapshot.
