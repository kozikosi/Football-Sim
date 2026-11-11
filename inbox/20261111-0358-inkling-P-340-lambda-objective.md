SPEAKER: inkling | ROLE: council advisor | TASK: P-340 — the lambda objective question, framed for the Owner | DATE: 2026-11-11T03:58Z
FOR: P-340

# The lambda objective: which number is the merge trying to win?

Context: MUSE's LOO (`inbox/20261111-0215-muse-P-340-loo-zai-merged.md`, reproduced byte-identically by me, `inbox/20261111-0357-inkling-P-340-loo-review.md`) shows the fitted lambda is ~0.20 (min 0.15, max 0.25, stable across folds) when minimizing mean |raw − owner|, and that lambda = 0.40 maximizes exact tiers. The Owner has said the 99 is a guide, not a target, and ±5 is acceptable.

## The three objectives, with the numbers on the table

**(i) Mean OVR error** → lambda ≈ 0.20. ZAI-D1: in-sample 1.12 OVR (λ=0.20) vs 1.34 (λ=0.40); held-out 1.13. Merged: 1.41 vs 1.65 in-sample; 1.44 held-out.

**(ii) Exact tier match** (the metric the 99-fit has been scored on) → lambda = 0.40. ZAI-D1: 96/97 in-sample; 88/97 at λ=0.25, 85/97 at λ=0.20. Merged: 92/97 at 0.40 vs 86/97 at 0.20. Held-out exact: ZAI-D1 170/194, merged 172/194 (λ refit).

**(iii) Within one tier** (my measurement, in the review) → **cannot discriminate lambda** (ZAI-D1 is 97/97 within one tier at every λ in [0.00, 0.40]; merged is 96/97 everywhere, its one deep miss is FB>RB regardless of λ). It discriminates the *form*, not the *dial*: the ability layer never misses more than one tier; only the guard's FB>RB row (17.96 vs owner 2) does.

## The trade, honestly

- λ=0.20 wins mean error by ~0.2 OVR in-sample and held-out λ is stable at 0.20 — it is a real, stable optimum, not noise.
- λ=0.40 wins exact tiers by ~11 rows in-sample (96 vs 85) and is Z.ai's shipped value, with two rounds of 99-fit history scored that way — switching objectives mid-flight changes what "better" means from here on.
- Under the Owner's own ±5 acceptance language, tiers are already forgiving; the merged form's only ≥2-step miss is FB>RB — a row the guard breaks and the ability layer prices correctly (ability 3.30, owner 2 → within one tier at any λ). Fixing the FB family outside the guard (Owner's FB = scarcity ruling) removes the worst row no matter which λ is chosen.
- λ interacts with the guard only weakly (the guard is λ-free); the objective choice does not rescue or doom the guard question. Keep them separate: **lambda is a dial on the ability layer; the guard's FB cost is a separate, already-ruled question.**

## Council's recommendation (the Owner decides)

Optimize **mean error (λ ≈ 0.20) for the merge spec**, on the grounds that (a) the Owner has stated acceptance as ±5 with the 99 as a guide, (b) the mean is a smoother, more stable criterion under LOO refit (0.20 every fold vs a ladder of exact-tier counts), (c) the within-one-tier measurement shows tiers discriminate the form, not λ — so nothing is lost on tiers that a human cannot see, and (d) λ=0.40 remains recorded as the exact-tier optimum for anyone scoring the 99-fit traditionally. But the honest counter-weight is (b′): the 99-fit is the council's historic scored metric, and unilaterally re-scoring mid-program is how goalposts drift — so if the Owner prefers continuity, λ = 0.40 with the trade-off documented is defensible. **Either is fine; what the merge cannot do is leave λ unexamined at 0.40 by inheritance.**

## Questions for the Owner (each with a default)

1. **Which objective does the merge optimize?** Default if unanswered: mean error, λ = 0.20, with 0.40 recorded as the exact-tier alternative in the merge spec. (Blocks: finalizing the merge constants; not blocking the FB-family fix, which is needed either way.)
2. **FB family outside the guard, per the existing FB = scarcity ruling?** Default: yes — merged form must not route FB>RB / FB>TE through the guard (ability prices them within one tier at any λ). (Blocks: the merged-form build; the FB>RB deep-miss row.)
3. **OLB 200 vs 150 (and C) — rule before the merge is finalized.** Impact analysis filed as the companion weight-source report (`inbox/20261111-0358-inkling-P-340-weight-source.md`). Default: whichever the Owner rules, it is worth exactly 2 rows (OLB>ILB, OLB>SS); C 200 vs 150 changes no tier in the merged form. (Blocks: the OLB rows' exactness; not the overall call.)

Labels: all numbers above are VERIFIED (my re-run / recomputation from the cited files); the recommendation is INFERRED judgment, and the ruling itself is the Owner's.
