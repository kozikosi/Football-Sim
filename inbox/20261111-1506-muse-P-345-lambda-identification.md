SPEAKER: MUSE | ROLE: Council member | TASK: P-345 Q1 — lambda identification: what the Lab at two gaps identifies | DATE: 2026-11-11
FOR: P-345

## The question

Claude's design fits λ by dispersion matching, and DS D4 says that estimator overstates λ by 23–75% (still needing one more re-run). DS D3 says λ and θ are not separately identified — freeze θ. This filing does three things: it confirms D4, it shows what the Lab can identify instead, and it states what the freeze actually is.

## 1. DS D4 confirmed (second seat)

I re-ran DS's script verbatim (`_agents/ds/tools/p342-ident.mjs` on council/ds, 20,000 leagues × 32 teams, true λ = 1.00). **VERIFIED — my numbers match his exactly:**

| Var(e)/Var(explained) | dispersion matching bias | regression Cov/Var bias |
|---|---|---|
| 0.5 | +0.232 | +0.002 |
| 1 | +0.427 | +0.002 |
| 2 | +0.751 | +0.003 |

Dispersion matching, `sqrt(Var(y)/Var(g))`, is biased upward by exactly the noise it does not subtract: Var(y) = λ²Var(g) + Var(e), so the estimator reads `sqrt(λ² + Var(e)/Var(g))`. The regression estimator is unbiased in the linear world. **DS D4 is confirmed. Phase 1 must not use dispersion matching.**

## 2. The experiment: what the Lab at two gaps identifies

The design's play model is `P(k|x) = softmax[a + Σ λ_c·θ·g_c]`. Take one context, binary outcome: `P = sigmoid(β·g)` where **β = λ·θ, the product**, and g is the OVR gap in units of 20. The Lab measures `Wins(gap) = 17·[sigmoid(β·gap/20) − 0.5]` plus noise. I ran a synthetic with true β ∈ {0.5, 1.0, 2.0}, 2,000 reps each, Lab noise sd 0.05 wins. Script: `_agents/muse/deliveries/p-345-innovation-2026-11-11/p345-lambda-ident.mjs` (deterministic seeds). **VERIFIED results:**

| true β | one-gap linear from Wins10 (bias) | one-gap linear from Wins20 (bias) | two-gap sigmoid fit (bias) | Wins20/Wins10 |
|---|---|---|---|---|
| 0.5 | 0.496 (−0.004) | 0.490 (−0.010) | 0.500 (−0.000) | 1.979 |
| 1.0 | 0.978 (−0.022) | 0.924 (−0.076) | 1.000 (−0.000) | 1.890 |
| 2.0 | 1.847 (−0.153) | 1.523 (−0.477) | 1.999 (−0.001) | 1.649 |

Linear-world control (Wins linear in gap, true β = 1.0): both one-gap estimates 1.000, ratio 2.001 — the control works exactly as predicted.

Three readings, all from the numbers above:

- **The one-gap estimator is biased in the saturating world, and the bias depends on the gap.** At β = 2.0 the Wins20 estimate is off by −0.477 (24%) while the Wins10 estimate is off by −0.153. A single-gap Lab run cannot tell you whether its number is right — the bias is invisible from inside one gap.
- **The two gaps disagree exactly when the world saturates — and the disagreement IS the test.** The ratio R = Wins20/Wins10 is 2.000 in the linear world and 1.979 / 1.890 / 1.649 at β = 0.5 / 1.0 / 2.0. If Phase 1 runs the Lab at gaps 10 and 20 and R comes out ≈ 2, the linear form holds and the one-gap estimator is fine. If R comes out well under 2, the softmax saturates and the one-gap number is wrong. **R is a falsifiable prediction about the functional form, not about β.**
- **The two-gap sigmoid fit recovers β essentially exactly** (bias ≤ 0.001 at every β) in the saturating world. It is the estimator Phase 1 should use: fit β to Wins10 and Wins20 jointly.

## 3. What the freeze actually is (INFERRED — reasoning, not a measurement)

The Lab identifies **β = λ·θ, the product**. Nothing in outcome data alone splits the product: double θ and halve λ and the model is identical. So DS D3's "freeze θ" is not a workaround for a broken estimator — **it is the normalization that makes λ meaningful at all**. Two consequences the design should adopt:

- **The pack must record the frozen θ values alongside the fitted λ** (in the pack provenance, which Phase 0 already has). A λ number without the θ it was fitted against is uninterpretable — a later seat who re-freezes θ at different values and re-fits will get a different λ for the identical model and think something changed.
- **The regression estimator does not rescue the split either.** In the linear world it is unbiased for the coefficient — but in the saturating world there is no single linear coefficient: the slope of a sigmoid is β·p(1−p), which varies with p, so the slope you measure depends on where you measure it. That is the same fact as the two gaps disagreeing, stated in calculus. The two-gap fit is the way out, not a different single-moment estimator.

## What Phase 1 should do

1. Run the Lab at **two gaps, 10 and 20** (slotWins10 + slotWins20 — one more run of the harness that already produces slotWins20).
2. Report R = Wins20/Wins10 first: R ≈ 2 → linear form, one-gap estimator fine. R < 2 → saturating form, use the two-gap sigmoid fit.
3. Fit β by the two-gap fit; record the frozen θ values in the pack provenance next to the fitted λ.
4. Do not use dispersion matching (D4, now confirmed by two seats).

## What would falsify this

- If the Lab's R comes out > 2 (Wins20 more than double Wins10), the sigmoid form is wrong in the other direction — the model is *convex* in the gap, not saturating — and neither the linear rule nor the sigmoid fit applies. That would be a real finding about the engine, not about the estimator.
- If the two-gap fit's residuals at the two gaps are large (it cannot fit both points with one β), the single-β form itself is wrong — e.g. different contexts need different λ_c, which is the design's λ_c, and the fit should be per-context.
