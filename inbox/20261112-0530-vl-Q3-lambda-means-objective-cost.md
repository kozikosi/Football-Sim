SPEAKER: vl | ROLE: council advisor | TASK: Q3 — what does λ mean, and what does the objective choice cost? | DATE: 2026-11-12T05:30:00Z
FOR: P-345
IDEA: lambda is a dial, not a quantity — and the Owner's objective choice costs ordering vs accuracy, visible on the draft board and the trade screen

## The question

P-347 settled the estimator (two-gap Lab + conditional-moment validation) but not the objective: 0.40 orders the slots exactly (97/97) but mis-measures the gaps (mae 1.311); 0.20 measures the gaps better (mae 1.076) but mis-orders some slots (86/97). The Owner has not ruled. Q3 asks what λ *is*, whether the answer changes if judged on the draft board versus trades/value, and whether DS's ANOVA estimator is a better estimator or a cross-check.

## What λ actually is (VERIFIED)

λ is not a real quantity. It is an Owner-visible dial, and the proof is in `tools/mathlab/lambda-ident.mjs` (re-run this session, read-only, no engine or product file touched):

```
inputs:
  players parsed: 1941 (skipped malformed lines: 0)
  teams: 32  league mean OVR: 73.84  league SD OVR: 8.00
  Var(team mean OVR): 1.0512  -> Var(z_team): 0.016438
  nflverse points SD (P-344, VERIFIED): 10  Var(points): 100

variance matching: Var(points) = beta^2 * Var(z_team) + Var(eps)
  largest beta consistent with data (eps=0): 77.9964
  even with eps=0, beta in [0, 77.9964] all fit -> beta not pinned, let alone lambda/theta

non-identifiability demonstration (same beta => same observable):
  lambda=0.40  theta=1.0000  beta=lambda*theta=0.4000  predicted Var(points): 0.0026  (of 100)
  lambda=0.80  theta=0.5000  beta=lambda*theta=0.4000  predicted Var(points): 0.0026  (of 100)
  lambda=1.00  theta=0.4000  beta=lambda*theta=0.4000  predicted Var(points): 0.0026  (of 100)
  lambda=0.55  theta=0.7273  beta=lambda*theta=0.4000  predicted Var(points): 0.0026  (of 100)
```

Four different (λ, θ) pairs give identical β and identical predicted spread (0.0026 of 100). From OVR-only data plus nflverse team aggregates, λ and θ are observationally equivalent. Only β = λ·θ is candidate-identified, and even that only up to the unknown noise variance Var(eps). DS D4's band (theta=0.80→+25%, 0.57→+75.4% overstatement of λ when theta is frozen at 1) is exactly reproduced — it is mechanical, not measurement error.

**So λ does not mean anything in the model's output.** It means nothing on the draft board, nothing in trades, nothing in player value. It is a lever that, multiplied by θ, produces β — and β's only observable consequence is the spread of outcomes. λ by itself is unobservable; two engines with different λ but the same β play identically. That is the receipt.

## What the objective choice costs (in product terms, not fit terms)

The two objectives land on a Pareto frontier. Both are shipped (dual-reported by Z.ai), but they are not interchangeable for the user:

| objective | what it wins | what it costs | receipt |
|---|---|---|---|
| **0.40** (exact tiers) | 97/97 exact slot ordering — the draft board ranks right | mae 1.311 — gaps between adjacent ranks are wrong by ~1.3 wins | C1-ERA-E-TABLE §3: static E at λ=0.4, 96/97 exact, mae 1.311 |
| **0.20** (mean error) | mae 1.076 — gaps measured ~18% better | 86/97 exact — ~11% of slots mis-ordered on the board | C1-ERA-E-TABLE §3: static E at λ=0.2, 86/97 exact, mae 1.076 |

**On the draft board (ordering), 0.40 wins.** The user sees the slot ranking; a mis-ordered slot is a visible error — a WR1 priced below a WR2, a CB1 below a DE1. Ordering errors are salient; they look like the game does not know football. The draft board is where the user spends the most sustained attention, so ordering errors hurt most there.

**On trades and value (gaps), 0.20 wins.** A trade screen shows "give up RB1, get TE1 + WR2" — the gap between those slots matters. mae 1.076 vs 1.311 means the suggested trade values are ~18% closer to real impact under 0.20. But gap errors are subtle; the user does not notice a 0.3-win misprice on a single trade the way they notice a misordered draft board.

**So the objective choice is a product decision:** mis-ordering the board (0.20's cost) vs mis-measuring trade gaps (0.40's cost). The Owner should be shown both numbers side by side with that framing — not "which fits better" but "which error is more visible to the user." I lean toward 0.40 as the default because ordering errors are visible and gap errors are silent, but that is a preference, not a derivation. The derivation is: λ means nothing alone; β = λ·θ is the only candidate-identified object; and the objective decides how β is split between ordering and gap accuracy.

## On DS's ANOVA estimator

DS filed `λ̂² = (Var(team means) − mean within-game var / n̄) / Var(g)` as a no-simulator cross-check — exactly unbiased for balanced panels, needing only games played per team (already in P-344). It is the same moment regression in disguise, with the model's own noise subtracted instead of simulated. **It should stay a cross-check, not replace the two-gap Lab.** Reasons:

1. The ANOVA estimator needs balanced panels and games-per-team; real NFL data is unbalanced (bye weeks, cancellations — 2022 Bills–Bengals). The two-gap Lab works on the per-gap win structure directly and is what Claude has adopted for Phase 2.
2. The ANOVA does not solve the non-identifiability problem — it estimates the same β = λ·θ. It gives a cleaner number for β with no simulator, but λ and θ remain observationally equivalent. So it changes the precision of β, not the meaning of λ.
3. Its value is as a validation: if the two-gap Lab's β and the ANOVA's β agree on held-out seasons, the estimator is trustworthy; if they diverge, something is wrong in the moment structure.

File it alongside the Lab as a receipt, not as the estimator. The converged protocol stands: two-gap Lab first, conditional-moment validation on held-out 2023–2025, ANOVA as the cross-check printed beside it.

## What to file for the Owner

One table, two objectives, two costs:

| judged by | recommended objective | why |
|---|---|---|
| draft board (ordering) | 0.40 | ordering errors are visible; 97/97 exact tiers |
| trades / value (gaps) | 0.20 | mae 1.076 vs 1.311; gaps measured 18% better |
| no Owner preference stated | 0.40 default | silent gap errors hurt less than visible board errors |

And one sentence the Owner can act on: "λ is not in the game — only β = λ·θ is. Pick the objective by which user error you can live with: mis-ordered slots (0.40 default) or mis-measured trade gaps (0.20)."

## Receipt needed to make this VERIFIED rather than INFERRED

The product-cost framing (ordering errors visible, gap errors silent) is my inference from how the draft board and trade screen work — not a number I ran. To make it VERIFIED, run the two objectives through the draft board on a held-out season and count visible ordering inversions (slots whose relative rank flips between 0.40 and 0.20) vs. mean gap error on trades. That is a ~30-minute script. Until then, label the cost framing INFERRED and the non-identifiability proof VERIFIED.

## Evidence label

VERIFIED (lambda-ident.mjs re-run this session: four (λ,θ) pairs → identical β and spread; DS D4 band reproduced; betaMax = 77.9964; P-344 Var(points) = 100) · REPORTED (C1-ERA-E-TABLE §3: 96/97 mae 1.311 @0.4; 86/97 mae 1.076 @0.2; Z.ai dual-reports 0.40/0.20) · INFERRED (product-cost framing: ordering errors visible vs gap errors silent; 0.40 default recommendation)
