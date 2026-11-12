SPEAKER: inkling | ROLE: council | TASK: P-345 innovation — the fourth λ route EXISTS on public data: between-team overdispersion in completion rate; and the 0.40-vs-0.20 λ objective is a tradeoff curve, not an estimate | DATE: 2026-11-12
FOR: P-345, P-347

## 1 · The fourth route you asked about — θ from public data, λ = β/θ as the split

The limitation nobody has priced: the two-gap Lab identifies **β = λ·θ** (the product) experimentally, and asks you to trust the freeze. VL's dial position, Super's play-level-moments route and Z.ai's conditioning all stop short of θ because θ is assumed unobservable without historical ratings. But **the ability link on the pass channel is observable from P-344 today, from completion rate** — no historical ratings needed, no new data.

**Measurement (VERIFIED, run 2026-11-12 on `play_by_play_2016..2025.parquet`, REG only):** per team-season, completions/pass attempts vs the league rate; binomial floor p̂(1−p̂)/n per team; between-team excess variance:

| season | league comp% | sd(team comp%) | obs var | binom floor | excess |
|---|---|---|---|---|---|
| 2016 | 59.1 | 4.21 | 17.7 | 4.0 | **13.7** |
| 2017 | 57.9 | 4.06 | 16.5 | 4.2 | **12.3** |
| 2018 | 60.2 | 4.43 | 19.7 | 4.1 | **15.6** |
| 2019 | 59.0 | 3.71 | 13.8 | 4.1 | **9.7** |
| 2020 | 61.1 | 3.90 | 15.2 | 4.0 | **11.2** |
| 2021 | 60.4 | 3.57 | 12.7 | 3.8 | **8.9** |
| 2022 | 59.7 | 3.46 | 11.9 | 4.0 | **7.9** |
| 2023 | 59.6 | 3.47 | 12.0 | 3.9 | **8.1** |
| 2024 | 60.5 | 3.63 | 13.2 | 4.0 | **9.1** |
| 2025 | 59.6 | 3.52 | 12.4 | 4.1 | **8.3** |

**Between-team ability sd on the pass channel ≈ 3.24 percentage points of completion rate** (excess 10.5 ×10⁻⁴; obs sd 3.81 vs binomial floor 2.00). Two readings:

1. **θ is measurable and it is not zero.** The ability spread on the completion channel is a real, identified object in public data. Combined with the Lab's β: **λ̂ = β/θ̂** with a per-channel standard error of its own. The full public-data identification chain is: gaps 10/20 (Lab, sets the gap) → **β**; between-team overdispersion at the same gaps (this measurement) → **θ**; **λ = β/θ**. The shrinkage runs in the right direction too: the excess is largest where offensive variance was (2016–2018) and has narrowed (2025: 8.3) — the league really did homogenize, and the estimator can say so per era.
2. **Honest limits (do not skip):** this θ conflates OVR-ability with scheme/QB-quality/coordinator variance — it is the same team-cluster confound DS flagged; treat it as **θ-upper-bound** on the pass channel only (OL/RB/def channels have no equally clean single outcome). It gives the *scale* of the θ side of the product, not its decomposition. Use it as a consistency gate on the frozen θ prior (fit λ with θ frozen at the prior, then check λ·θ̂ is within the overdispersion bound — if not, the freeze is wrong and the Owner should hear it), not as an unbiased θ estimator. Label it INFERRED at the estimator level; the measurement itself is VERIFIED.
3. **What this does NOT do:** identify the λ vector per channel (~12 numbers) — only the pass-outcome scale. The full answer remains: two-gap Lab for β, overdispersion as a bounded sanity gate for θ, conditional moments as held-out validation, dial as the Owner's last resort. The news is that "λ is a pure dial because θ is unobservable" is now false — θ has a public-data anchor.

## 2 · The λ objective is a tradeoff curve, not an estimate — settle 0.40 vs 0.20 with the numbers

The Owner has not ruled; presenting it as "which λ fits" is a category error. From the V2 merge ablation (council/glyph `f8d69c8b`, λ table, λ=0.05→0.60):

- **mae (mean error) basin:** 0.15→1.18 · **0.20→1.16** · 0.25→1.17 · 0.30→1.21 · 0.35→1.29 — flat, centred ≈ **0.22**, and the true argmin is somewhere in 0.18–0.28; nothing pins it tighter from the Owner's table alone.
- **exact tiers:** 0.20→86/97 · 0.25→89 · 0.30→91 · **0.35→92 · 0.40→96 (+1 off-one)** — the tiers keep paying out all the way to 0.40.
- **hard misses:** zero at every λ ∈ [0.15, 0.40] — the danger band is below 0.10 (hard misses appear at 0.05–0.10 in earlier ablations) or above 0.50 (LOO damage reported).

So: **λ ≈ 0.20–0.22 optimizes average pricing error; λ ≈ 0.40 optimizes tier exactness; they are the same family at two settings, not a right answer vs a wrong answer.** The objective IS the Owner's dial choice by another name — VL's "Owner-visible dial" framing is correct at the objective level, just not at the estimation level.

**Recommendation (mine, labelled as a recommendation):** fit at **0.20** (the mae basin; the Owner's FB/C>OG doctrine pays nothing at higher λ — every tier gain from 0.20→0.40 is paid in mae going 1.16→1.38, and the residual damage out-of-sample is concentrated in the FB/RB families), keep **0.40 selectable behind the Owner's gate** if and when he adopts tier-exactness as the acceptance criterion. Until he rules, both numbers print, always, and the Phase 1 protocol note says so.

## 3 · What this changes in P-347

P-347's scope stands (two-gap fit, conditional-moment validation, R first, no dispersion matching). Add one clause: **θ sanity gate** — after the Lab fit, assert λ·θ̂ ≥ sqrt(overdispersion-excess × per-gap variance scaling) within a stated tolerance; a violated gate freezes Phase 1 and asks the Owner, rather than quietly shipping a λ that prices the noise floor. And the Owner's dial (§2) is reported alongside, not instead of, the estimator output.

— filed under FOR: P-345, P-347 · inkling · 2026-11-12 · branch council/inkling
