SPEAKER: VL | ROLE: Council Advisor | TASK: P-345 innovation round — Q1 lambda identification (largest design risk) | DATE: 2026-11-11

FOR: P-345

## Idea

Lambda (duty-gap impact scale, ~12 numbers, one per channel) cannot be identified from OVR-only data, and neither can theta (outcome-split shape). Variance matching pins at most the product beta = lambda*theta, and only up to the unknown noise variance. DS D3 ("freeze theta") and DS D4 ("dispersion matching overstates lambda by 23–75%") are both symptoms of the same non-identifiability. The Owner ruled out the data that would fix it (historical Madden ratings joined to outcomes — design-13d: "none, and not needed"), so lambda must remain an Owner-visible dial, not an estimate, validated only by held-out totals-bar / margin-shape predictions.

## Why it matters

P-345 Q1 calls lambda "the largest risk in the design" and asks for "a better identification story ... worth more than a better fit." If lambda is not identified, Phase 2's "ratings in" step (duty layer, lambda by dispersion matching, solver view) is fitting a free dial to noise and calling it calibration. The council should not present dispersion-matching output as an identified lambda.

## What I ran (receipt)

Prototype: `tools/mathlab/lambda-ident.mjs` (read-only, no engine or product file touched).
Command: `node tools/mathlab/lambda-ident.mjs`

Inputs (all named):
- `data/madden27-ratings.csv`: 1,941 players, 32 teams, Owner's Madden 27 Week-6 paste (28 Oct 2026), columns name,pos,team,ovr,spd,str. OVR 54–99, league mean 73.84, SD 8.00. VERIFIED by parsing (0 malformed lines).
- nflverse Phase 1 P-344 delivery (council/muse `c7540b04`, MUSE inbox note `20261111-0936-muse-P-344-nflverse-phase1-data.md`, VERDICT delivered): league SD of points per team-game = 10.00 → Var(points) = 100. VERIFIED from the delivery summary.
- Model spec: `P(k|x) = softmax[a(x) + sum_c lambda_c*theta_{nu,k,c}*g_c]`, g_c = duty gap, z = (effOVR − m_c)/s_c. REPORTED from `tools/mathlab/results/engine-design-2026-11-11.md` (architect/engine-and-seats).
- DS D3 / DS D4 / Owner design-13d: REPORTED from the same design doc and `claude/rulings/2026-11-11-owner-answers-design-13.md`.

Output (VERIFIED by running the command):

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

DS D4 band (theta frozen at 1 => beta mistaken for lambda):
  theta=0.80  overstatement: 25.0%
  theta=0.70  overstatement: 42.9%
  theta=0.60  overstatement: 66.7%
  theta=0.57  overstatement: 75.4%
```

## What this proves / falsifies

Proves (VERIFIED computation): four different (lambda, theta) pairs produce IDENTICAL beta and IDENTICAL predicted outcome spread (0.0026 of 100). From OVR-only data + nflverse team aggregates, lambda and theta are observationally equivalent — only beta = lambda*theta is even candidate-identified, and even that only up to unknown Var(eps). So "lambda = 0.4 from dispersion matching" and "lambda = 0.8 with theta = 0.5" fit the same data equally well.

Falsifies the idea that dispersion matching identifies lambda: DS D4's 23–75% overstatement band is exactly reproduced for theta in [0.57, 0.81] (theta=0.80 → 25.0%; theta=0.57 → 75.4%). The overstatement is not measurement error; it is the mechanical result of freezing theta=1 and attributing the whole spread to lambda.

## What WOULD identify lambda (and why it is out of scope)

A historical Madden-rating → per-play-outcome join: nflverse PBP carries passer/rusher/receiver ids and outcomes; Madden 27 carries name,pos,team,ovr,spd,str. Join by name across multiple seasons, regress outcome on player OVR duty gap, and lambda falls out as the slope per SD. Owner (design-13d): historical Madden ratings "none, and not needed … out of scope." So this path is closed unless the Owner supplies the data.

Second option — an external moment that separates lambda from theta. None exists in current data because outcomes are never joined to ratings at the player level. REPORTED as unavailable; would need the Owner.

## Recommendation (INFERRED, not a verdict)

Freeze theta per DS D3. Treat lambda as an Owner-visible dial (the design doc already labels it "derived, Owner-visible dial"). Do not present dispersion-matching output as an identified lambda; validate lambda only via held-out totals-bar and margin-shape predictions (Phase 1 gate, section 8 of the design doc). This matches the Owner's "~10% totals bar ... general sense of realism" framing rather than pretending at precision the data cannot support.

## Receipt

`git show origin/architect/engine-and-seats:tools/mathlab/results/engine-design-2026-11-11.md` (spec + DS D3/D4 + Owner design-13d) — REPORTED (read from doc, not re-derived).
`git show origin/council/muse:inbox/20261111-0936-muse-P-344-nflverse-phase1-data.md` (points SD 10.00) — VERIFIED.
`data/madden27-ratings.csv` (1,941 players, OVR 54–99) — VERIFIED by parsing.
`node tools/mathlab/lambda-ident.mjs` — output above, VERIFIED. Prototype lives at `tools/mathlab/lambda-ident.mjs` on this branch (`council/vl`), to be committed and pushed.

Labels: computation VERIFIED; DS D3/D4, design-doc spec, Owner design-13d, P-344 totals bar REPORTED (read from authoritative docs, not independently re-measured); recommendation INFERRED.
