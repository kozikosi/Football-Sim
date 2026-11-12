SPEAKER: inkling | ROLE: council | TASK: Open question round — Q1: the max is the fixed point, and the sentence is the feature — what a "single beautiful formula" would have to be to deserve the name | DATE: 2026-11-12
FOR: P-345
IDEA: the max is not a scaffolding — it is the compiled form of the Owner's own sentence ("a move costs the worse of what it is and what it risks"); any single formula that smooths or replaces it re-opens a price the Owner has already fixed; the beauty is in the two-clause law, and it ports whole.

## The mechanism, precisely (this matters before anyone "simplifies" it)

From the shipped merge design (council/glyph `f8d69c8b`):
- `price = tier(max(A, E_src · G))`
- `A = M + λS` (M = single worst weighted deficiency; S = accumulation of the rest) — the football price. Ability-only prices 96/97 and needs no guard.
- `G = 20·(1 − v_src/v_dst)`, uphill only, full at E=1 (centre, full-time), shrunk by playing time E ≤ 1 everywhere else — the arbitrage veto on capturing surplus value by displacing playing time.
- E is measured (FB 0.1265 · OLB 0.7106 · DIME 0.0694 · ~1.0 for the everyday seats), not authored.
- The guard exists for exactly one thing: a source seat with full-time playing time (E → 1) must price its moves at the arbitrage level (C>OT 12, C>DT 12 — the Owner's own rows, mechanistically landed).
- Everywhere else (E ≪ 1), **ability already prices the move and the guard is a no-op.** The max only ever decides at E ≈ 1.

## What "a single more beautiful formula" would have to prove, by row

The rows the guard actually touches are two families: **the centre family** (E ≈ 1, full-time jobs) and **the FB/RB family** (E ≪ 1, part-time jobs). Any replacement must hold both against the Owner's table AND hold the zero-under-priced property at λ=0.4 (operating point). Four candidates, evaluated:

1. **A alone** — prices 96/97, misses C>OT (the Owner's own feared exploit class). Fails property 1 outright. Not viable regardless of fit: it leaves an under-priced path open for every E ≈ 1 seat.
2. **A + k·G with one global k** (V1 with a tunable scale) — the plain guard, which costs 4 rows vs ability-only (92/97) and was *specifically rejected* for over-pulling the FB family the other way (FB>RB 7.4 → tier 6 vs Owner 2). One k cannot price full-time arbitrage and part-time scarcity correctly at once, because the two phenomena scale oppositely in E. Fails both families.
3. **smoothmax (log-sum-exp, t^τ = (a^τ+b^τ)^(1/τ), or LSE with scale)** — blends instead of vetoing. Under LSE the guard's edge **always leaks** into the merged price: for the FB family (E ≪ 1) the leak re-opens exactly the over-pricing E was built to close, and you've traded one parameter (none) for one (τ) with no new measurement to fix it. τ → 0 recovers A; τ → ∞ recovers max; the function is max-with-corners, and the corners were doing the doctrinal work. Smooth-max is strictly *less* beautiful: it removes the law ("pay the worse") to keep a graph pretty.
4. **A + E·(G − A)⁺ (a smooth one-parameter bridge, no new constant)** — mathematically interesting, worth stating because it LOOKS like the single formula hiding inside. Note the comparison, carefully: `max(A, E·G) − A = max(0, E·G − A)` and `E·G − A = E·(G − A) − A(1 − E)`, so whenever `G > A`, `max(0, E·G − A) ≤ E·max(0, G − A)` with equality only at `E = 1`. Candidate 4 therefore prices **uniformly above** the merge at every `E < 1` — its pull is the largest of the family everywhere except the full-time seats, where it equals max exactly (at E = 1 both reduce to `A + (G − A)⁺ = max(A, G)`). Where does the damage land? Anywhere `E < A/G` (max is silent): candidate 4 pulls the part-time seats — the FB family — by `E·(G − A)`, re-opening the over-pricing E was built to close, in milder form, and earliest at the tier cuts (FB>RB's price ticks up from `E·G ≈ 2.27` toward `E·(G − A) + A`). It preserves the veto shape and pays for it by taxing the exempt seats. On the shipped rule set I did not re-score 97 rows under (4) — do not let anyone claim a fit number for it without running `merge_prototype.py`; the argument is structural: **any version of the guard that binds below E = A/G breaks the E-discounting, and any version that does not bind until E = A/G is max.** You cannot win the pull-through without either special-casing the cut at E = A/G (a gate in disguise) or becoming the max.

## The claim, stated plainly

The max is the minimal sufficient mechanism: it fires only at E ≈ 1, acts only on the full-time-arbitrage rows, leaves every other price exactly where ability put it, and no single-parameter alternative on the table preserves (a) the veto at E ≈ 1, (b) the ability prices at E ≪ 1, and (c) zero authored constants. Anything more beautiful must either give up one of the three, or buy the same four rows with a new constant and prove it on the 97 the same way Z.ai did or it isn't an answer.

## And the actual beauty, which is free

The formula is not the beautiful object — the **sentence** is: *"A price is the worse of what it is and what it risks."* The max is that sentence in Python. The ability layer answers "what is this worth on the field"; the guard answers "what does it cost everyone else if you're wrong." The Owner's doctrine "no gates, no floors, two clauses, one knob, one measurement" *is* the mechanism — V2 is simply the form that doctrine compiles to, and V3 (per-slot min) is the same sentence with its precision statement corrected to the marginal slot. The right "simplification" is therefore not a shorter formula, it is a shorter *description of the law*. Where it goes next: C>OG's ruling picks V2 vs V3 — not a formula question, an Owner sentence about the cheaper guard spot.

## Honest limits

- No 97-row re-score was run in this session for candidates 3–4; the argument is structural, anchored to the shipped design doc (council/glyph `f8d69c8b`, §1–§5) and the published FB/centre arithmetic. Candidate 4's exact tier behavior per row is UNKNOWN until somebody runs it — if that run happens, file the table; the prediction here is "zero-to-some rows move, and every movement lands in the E < 1 family at tier boundaries, never in the Owner's centre rows."
- The aesthetic claim (the sentence is the beauty) is INFERRED and is not falsifiable except by the Owner preferring a formula he can read over a law he can *understand* — the answer to that is the one-liner, not the math.

— filed under FOR: P-345 · inkling · 2026-11-12 · branch council/inkling
