# MUSE — MUSE-D1: my own derivation design, tested — it does NOT beat ZAI-D1

SPEAKER: MUSE | ROLE: High Councillor | TASK: Design my own derivation from scratch (Owner direction) | DATE: 2026-11-10

## Verdict: the design failed, and the failure is informative

Per the Owner's direction ("start from scratch and really create your own formula rather than piggybacking off what you have been presented thus far. Take your time, think, design and go"), MUSE designed **MUSE-D1: the "harmonic coverage" model** from first principles, implemented it, and tested it against the live 99-rule table. It does NOT beat Z.ai's design. Reporting the failure honestly, with the reason, because the reason is the useful part.

## The design (MUSE-D1)

**The idea, in plain words:** a flex price is set by how much of the destination job the source body actually covers. For each duty the job loads, compute the COVERAGE — how much of the requirement the body meets, as a fraction: `(have + 1) / (need + 1)`. Then combine the coverages with a WEIGHTED HARMONIC MEAN — which is dominated by the worst coverage (a single duty you can't do at all sinks the whole price), but accounts for every duty. The price is a tier on the overall coverage. No discount parameter (unlike Z.ai's λ=0.4) — the combination is determined by the math, not by a fitted knob.

**Why I thought it would work:** the coverage ratio captures "what fraction of the requirement is met," which an absolute difference misses. A 1-point gap on a 1-point need is a total failure; a 5-point gap on a 10-point need is a partial failure. The absolute difference says the second gap is bigger (5 vs 1), but the first is a complete miss. The +1 smoothing avoids the zero-coverage singularity (a body with 0 of a 1-point need gets coverage 0.5, not 0). The harmonic-mean weights are (w × need), so duties the job needs more of matter more.

**Inputs:** Z.ai's 17 duties and weights as the per-sport inputs (the duty set is a per-sport input, not the design — the DESIGN is the formula). The cross-side floor 6 is applied as policy (the Owner's rule).

Script: `_agents/muse/deliveries/muse-d1-2026-11-10.py`.

## The results

| Variant | Exact | Off-by-one | Hard | Tier-error |
|---|---|---|---|---|
| MUSE-D1 baseline (harmonic mean) | 63 | 34 | 2 | 38 |
| MUSE-D1 + Owner scores (EDGE CARRY 4, C PBLK 6, TE PBLK 4) | 63 | 36 | 0 | 36 |
| MUSE-D1 worst-shortfall-proportion (variant) | 70 | 29 | 0 | 31 |
| MUSE-D1 worst-shortfall-proportion + scores | 72 | 27 | 0 | 29 |
| ZAI-D1 baseline (for comparison) | 95 | 3 | 1 | 5 |
| ZAI-D1 + Owner scores (for comparison) | 98 | 1 | 0 | 1 |
| Inkling baseline (for comparison) | 88 | 11 | 0 | 11 |

Best thresholds found by grid search: harmonic mean (0.95 / 0.75 / 0.5); worst-shortfall-proportion (0.15 / 0.3 / 0.8 baseline, 0.15 / 0.4 / 0.9 with scores).

## Why it failed

**The harmonic mean dilutes the worst gap.** Most bodies cover most duties reasonably well, so the overall coverage clusters around 0.6–0.9 and the tiers can't be separated — 34 off-by-one errors, mostly UNDERPRICING (the model gives 0 or 2 where the Owner gives 6 or 12). The price is set by the WORST thing you can't do, not by an average — and even a harmonic average (which is sensitive to low values) dilutes it too much. Z.ai's max-based structure captures the weakest-link logic; an average, however weighted, does not.

**Coverage ratios compress the range.** A ratio normalizes away the absolute magnitude: a 1-point gap on a 1-point need (coverage 0.5) and a 5-point gap on a 10-point need (coverage 0.55) look nearly identical as ratios, but the Owner prices them very differently. The absolute deficit, weighted by importance, preserves the magnitude that ratios lose. C>OT is the clearest case: the center's PBLK shortfall is 1 point (9 vs 10), but the Owner prices it at 12 because OT pass protection is worth $10M/year — the absolute gap (1 × weight 1.55) plus the score change (deficit 4 × 1.55 = 6.2) is what Z.ai's model uses, and a ratio (0.91 or 0.64) doesn't carry the same force.

**The worst-shortfall-proportion variant (70–72/99) fails the same way.** It picks the wrong duty as the bottleneck (for C>OT it picks RDEF, not PBLK, because the RDEF shortfall proportion is larger even though PBLK is the load-bearing duty). The weights don't fix it — the ratio structure itself is the problem.

## What the failure teaches

- The price is driven by the WORST absolute gap (a max-like structure on absolute deficits), not by overall coverage (an average-like structure) and not by shortfall proportions (ratios).
- Absolute deficits separate the tiers better than ratios, because the magnitude of the gap — weighted by the duty's importance — is what determines the price.
- Z.ai's M + 0.4·S structure (max absolute deficit + discounted sum) is doing something right that neither of my variants captures. The 0.4 discount is a fitted parameter, but the STRUCTURE (max first, then the rest at a discount) is the part that works.
- The guard (Claude's slot-value floor) and the PBLK score changes are alternative mechanisms for the same two rows (C>OT, TE>OT) — the Owner has said the scores were sufficient and slot values are not necessary. My design used neither mechanism beyond the scores, and still failed — so the failure is in the combination rule, not in the inputs.

## What MUSE recommends

ZAI-D1 + the Owner's three score changes (98/99, 0 fiat rows, only C>OT off by one) remains the working derivation. MUSE-D1 is a tested alternative that failed, filed here for the record — not a contender. The next step is Claude's from-scratch design (he is working under the same direction), and then finding common ground between his design and Z.ai's.

## Labels

VERIFIED: MUSE-D1 harmonic-mean fit (63/99 baseline, 63/99 with scores) and worst-shortfall-proportion fit (70/99 baseline, 72/99 with scores), run against the live 99-rule table (architect `678bb06` flex.json), thresholds found by grid search. The reason for the failure (dilution of the worst gap; ratio compression) is MUSE's analysis of the residuals. INFERRED: that the max-of-absolute-deficits structure is the part of Z.ai's design that works, and that the failure generalizes (any average-like combination will dilute the weakest link).
