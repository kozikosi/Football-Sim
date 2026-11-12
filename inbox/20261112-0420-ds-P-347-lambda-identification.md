SPEAKER: DS | ROLE: council advisor | TASK: P-347 — how λ is actually identified: the ruler, the estimator, and the one dataset that is missing | DATE: 2026-11-12T04:20Z
FOR: P-347

# λ is identified by the ruler, not by dispersion

**Claim (VERIFIED algebra, INFERRED consequence):** the design treats λ as 12 free dials to be fit. It is not free. The product already contains the scale that fixes it — `slotWinsPerOvr()` (Pre-Colors lines 1346–1351, protected contract). Express the duty gap `g_c` in **slot wins**, freeze `θ`, and λ_c becomes a physical quantity: **log-odds per slot-win of duty advantage**. That is identifiable, portable and meaningful; a dispersion-matched λ in arbitrary units is none of those. The estimator, the data requirement and the Phase 1 gate all follow from this one choice.

## 1. What the algebra already decides

The model is `P(k) ∝ exp(a_k + Σ_c λ_c θ_{ν,k,c} g_c)`. Two invariances:

1. **(λ, θ) rescaling** — for any α, `(λ_c, θ_{·,·,c}) → (αλ_c, θ/α)` gives identical probabilities (DS D3, P-342). Freezing θ removes it. The design already says θ is a prior; make "frozen during the fit" a rule, not a default.
2. **g's scale** — for any β, `(λ_c, g_c) → (λ_c/β, βg_c)` is also identical. This one is *not* removed by freezing θ. It is removed only by fixing the unit of g.

The product fixes it: `slotWins(slot, ovr)` returns wins, `slotWinsPerOvr()` is wins per +1 OVR, and `modelWeights()` is its 700-scale quantisation (max QB = 700, nearest 5, floor 5 — the protected contract, AGENTS §3). A duty gap measured in **wins** is therefore on the same ruler the draft board already uses. λ is the exchange rate between that ruler and the play model's log-odds. It is not a free parameter in the sense the design implies; its *level* is a unit conversion, and only its *shape* (relative λ across channels) is an empirical question.

Consequence for the Owner's 0.40-vs-0.20 question: **that is a display/steepness choice, not an identification question.** The data identifies the shape; the scale is chosen so the draft board's tiers and the play model's prices agree. Pick the scale that makes the *board* describe what the *engine* does, and say so — do not fit it.

## 2. The clean estimator: play-level conditional logit, clustered

Once Phase 1 exists, every play is an observation of a multinomial logit whose regressors are known: `x_{c,k} = θ_{ν,k,c} · g_{team,c}`. λ is the coefficient vector. That is a **conditional logit / multinomial logistic regression**, 12 parameters, concave in λ, fitted by Newton or IRLS in milliseconds on 130k plays/season. No simulator, no Lab, no dispersion.

The catch — and it is the whole identification story — is the **effective sample size**. `g` is constant within a team-season, so plays are not independent draws for λ: the correct standard errors are **cluster-robust by team-season**. The play-level likelihood sharpens the baseline and θ (within-team composition), but λ's information comes from between-team contrasts. With one ratings snapshot, the number of distinct `g` vectors is **32**, not 32 × 10 seasons: the same 2026 ratings applied to 2016–2025 outcomes do not create ten independent draws of the same quantity, they create ten noisy measurements of one cross-section. So:

- **VERIFIED (my P-342 D4 run, 20,000 synthetic leagues):** at n = 32, the unbiased regression `Cov(y,g)/Var(g)` has sd 0.13–0.26 per λ (13–26% relative); dispersion matching adds +23–75% bias on top. Play-level MLE does not beat that information bound — it only uses the within-team part better.
- **Consequence:** play-level MLE is the right *estimator*, but it will report the same ±13–26% interval. That is the honest answer, and it is enough for ranking duties and rough prices, not for resolving a 2/6/12 tier boundary.

## 3. The team-level fallback, corrected: variance components, not dispersion

If Phase 1's log is not ready, the same moment is available now from team-game totals — and it is *not* the estimator the design named. The correct one is a one-way random-effects (ANOVA) variance-components estimator:

`λ̂² = ( Var(team-season means) − mean within-team game variance / n̄ ) / Var(g)`

This is the analytic form of "simulated dispersion matching": it subtracts the model's own noise instead of simulating it, and the variance component is unbiased on a balanced panel (λ̂ is its square root, so report the interval, not a point). Verified on MUSE's P-344 `team_game_summary_2016-2025.csv` (5,522 team-games, 320 team-seasons, n̄ = 17.26, points season-demeaned to remove the scoring-era mean):

| quantity | value |
|---|---|
| Var(team-season mean points) | 16.955 |
| mean within-team game variance | 87.148 |
| true between-team variance (the signal) | **11.905** (SD 3.45 pts) |
| overstatement, team-season dispersion matching | **×1.193 (+19.3%)** |
| overstatement, game-level dispersion matching | **×2.71 (+171%)** |
| per-season team-season figures | ×1.160 (2016), ×1.208 (2020), ×1.199 (2025); 1.16–1.21 all seasons |

The delivered C2 field `dispersion_matching_overstatement_ratio = 1.0024` is **not** this quantity: it is `sqrt(total_var / within-drive-count variance)`, a drive-count R² (drive count explains 0.5% of points variance). Read as a λ bias it reports +0.24% where the real team-season bias is +19.3% and the game-level bias is +171% — it understates the relevant bias by ~80× and ~700× respectively. This is the same finding as my P-346 review, repeated here because it changes the estimator decision: the design should fear the **game-level** estimator, not the season-level one, and the season-level bias is removable by one subtraction.

## 4. What data identifies λ — and what is missing

| route | data | public? | what it identifies | status |
|---|---|---|---|---|
| between-team variance (this filing) | team-game totals, P-344 | **yes** (nflverse) | the level of λ on 32 teams, ±18% bias corrected | available now |
| play-level MLE | pbp + participation (snap counts) 2016–2025 | **yes** (nflverse) | θ, baseline, within-team fit; λ at cluster level | available, needs Phase 1 schema |
| per-season ratings | Madden/PFF-type ratings **per season** 2016–2025 | **no** (proprietary; scrape only) | λ at season level, 320 clusters, attenuation removed | **MISSING — Owner's call** |
| public talent proxy | PFR Approximate Value, Pro Bowl, draft capital | yes | an *instrument* for g, not g itself | needs Owner approval to use as calibration instrument only |

**The missing dataset is historical ratings.** One 2026 snapshot applied to a decade of outcomes is a measurement-error problem: `g` is constant across seasons while the outcomes are not, so the fit is attenuated toward zero and the residuals are correlated within team. The Owner holds ratings authority (AGENTS §7); this is a request, not a workaround: *either* per-season ratings for 2016–2025, *or* approval to fit λ against a public proxy as an instrument and report the OVR-conditional λ as the product dial. If neither: λ is identified only on the 32-team cross-section, and the filing should say "OVR-conditional, ±20%" on every surface, not publish a point.

## 5. The sharper gate (and what would falsify this)

- **Phase 1 (λ = 0) — grammar, not totals.** The one number that would tell us the play model is on track: **3rd-down conversion by distance**, pre-registered from pbp before running the model. A model that matches total points but misses 3rd-and-4–6 conversion by >5 points has the chain-length defect PLAYLED found, and the totals are compensating elsewhere. The real rate is public; the gate is the *pre-registration*, so the model cannot be tuned to it after the fact.
- **Phase 2 (λ estimated) — one falsifiable prediction.** The model must reproduce **between-team variance = 11.9 points² (SD 3.45)** and the season win spread. At λ = 0 it produces 0 by construction; this is the gate that binds λ, and it is exactly the quantity the corrected estimator targets. If the fitted model cannot hit it while matching totals, the softmax form or the θ prior is wrong — that is a real falsification, not a tolerance miss.
- **Shape test, not estimator.** R = Wins20/Wins10 (the P-347 two-gap proposal) is a *curvature* test: 1.979 in the linear world, 1.649 at β = 2. It cannot pin λ's level; it can reject a saturating form. Keep it as a falsifier, do not call it identification.

## 6. Why this is the beautiful version

The play model and the draft board become the same object measured in the same unit: the board says a slot is worth *w* wins, the play model says a duty gap of *w* wins shifts log-odds by λ·w. The Owner's formula (OVR + preferred position only) is untouched — g is computed from OVR through the protected `slotWinsPerOvr` table. The estimation story is one sentence: **the shape of λ is measured, the scale is the board's own ruler, and the interval is published.** That is more defensible than 12 dials fitted to a biased dispersion target, and it survives the sport port: a new sport supplies its own ruler, and λ's shape is re-estimated from that sport's outcomes.

**What I would need to test it:** Phase 1's event log (or even the 544-game 2023 team totals already in P-344) plus one run of the conditional logit. The variance-components number above is already a receipt; the play-level MLE is a 30-line script once the log exists. The historical ratings are the only blocker, and they are the Owner's.

— DS · VERIFIED: Pre-Colors `slotWinsPerOvr` lines 1346–1351; variance decomposition from `team_game_summary_2016-2025.csv` (320 team-seasons); C2 code line 196. INFERRED: λ's unit interpretation, the MLE/cluster argument, the Phase 1 conversion gate. UNKNOWN: whether per-season ratings exist in the Owner's possession.
