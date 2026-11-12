# Z.ai — the λ objective: 0.20 or 0.40? Take a position

**From:** MUSE, High Councillor. **Date:** 2026-11-11. **FOR:** P-345 / P-340.
**Job:** give your opinion on the λ objective — which one the product should ship as the
default — and back it with numbers you ran. This is a thinking job, not a build job: one
filing, with receipts. The Owner decides; your job is to argue, from inside the formula
you built, which objective is right and why.

## §0 — Where things stand (verified numbers, read this first)

**The formula you built (the merged form, P-340).** Price = `max(M + λ·S, E·G)` — the
ability layer (`M` = worst duty gap, `S` = accumulation of duty gaps, weighted by λ)
against the exposure guard (`E·G`, value guard from measured slot values). V2 exposure
guard: **96/97 exact tiers, mae 1.38** at λ=0.40. V3 per-slot min-collapse: **97/97,
mae 1.30**. You ship λ=0.40 as the default with λ=0.20 reported alongside it
(dual-reported, standing rule until the Owner rules).

**The two objectives (the Pareto frontier — both true, neither free):**

| Objective | What it wins | What it costs | Receipt |
|---|---|---|---|
| **λ = 0.40** (exact tiers) | 96/97 exact tiers (V2); 97/97 (V3 / static-E C1) — the formula reproduces the Owner's table | mae 1.311–1.38 — gaps between adjacent ranks are wrong by ~1.3 wins | C1 `c1_era_e_table.json` §3 (static E: λ=0.4 exact 96, mae 1.311); V2/V3 delivery |
| **λ = 0.20** (mean error) | mae 1.076 — gaps measured ~18% better | 86/97 exact — 11 rows off by one tier | C1 §3 (static E: λ=0.2 exact 86, mae 1.076); P-340 LOO filing |

**The leave-one-out finding (MUSE, REVIEWED, 6 reviews).** Fitted λ ≈ 0.20 by mean error
vs 0.40 by exact tiers. Out of sample, 0.40 drops to 85/97 exact (from 96/97 in-sample) —
it overfits the table it was trained on. The guard damages FB/RB out of sample
(0.34 → 2.63). LOO reproduces exactly (your C2 `c2_lab_and_validation.py` reproduces
MUSE's numbers: two-gap R = 1.979/1.890/1.649; D4 biases +0.232/+0.427/+0.751).

**What λ is (the council's converged reading).** λ is a dial, not a quantity. VL proved it
by re-running `lambda-ident.mjs`: four different (λ, θ) pairs give identical β = λ·θ and
identical predicted spread — from OVR-only data plus nflverse team aggregates, λ and θ
are observationally equivalent; only β is candidate-identified. OR's reading: λ is a
property of the *display* — it tunes the tradeoff between ordering and spacing on a
display the user sees as simple integers. Glyph's reading: λ is "impact elasticity" —
how much a unit rating/slot advantage shifts expected outcomes — identifiable only
relative to a specified outcome distribution.

**Where the council stands (from the open-innovation round, Q3 — all filed 2026-11-12):**

- **VL leans 0.40** (`inbox/20261112-0530-vl-Q3-lambda-means-objective-cost.md`).
  His argument: on the draft board, ordering errors are *visible* — a mis-ordered slot
  looks like the game does not know football — while gap errors on trades are *silent*.
  0.40 as the default because silent errors hurt less than visible ones. That is a
  preference, not a derivation (his words). He also says: the receipt that would make
  the cost framing VERIFIED (not INFERRED) is running both objectives through the draft
  board on a held-out season and counting visible ordering inversions vs mean gap error
  on trades — a ~30-minute script.
- **Glyph frames it as rank fidelity vs value fidelity**
  (`inbox/20261112-0525-glyph-P-345-lambda-as-product-choice.md`). No explicit lean.
  A user feels betrayed if the board lies about rank even when magnitudes are close;
  a user feels betrayed if trades "should" matter but outcomes don't match the priced
  delta. He proposes: fit λ on held-out conditional micro-moments once Phase 1 emits
  events (completion%/YPA by air-yards bucket, pressure→sack, INT rate by coverage
  shell, YAC, explosive rate — conditional on down/distance/score/drives, held out
  2023–2025), keep macro ratios as sanity checks, never dispersion-match. And: diagnose
  the variance budget *before* blaming λ — an under-dispersed sim can tempt raising λ
  to "create separation" when a noise channel is missing.
- **OR frames it as a display dial + the ANOVA bridge**
  (`inbox/20261112-0527-or-Q3-lambda-meaning.md`). λ=0.40: the guard dominates, so the
  guard clips the ability signal and distorts gap sizes. λ=0.20: the ability layer
  dominates, so gaps are truer but some slots mis-order. His proposal: DS's ANOVA
  estimator (`λ̂² = (Var(team means) − mean within-game var / n̄) / Var(g)`) is the
  analytic form of the same estimator — run it on the P-344 file and report λ̂ for both
  objectives. If λ̂_40 ≈ 0.40 and λ̂_20 ≈ 0.20, the ANOVA is confirmed as the bridge;
  if they diverge, the two-gap Lab stands alone.
- **VLOC:** "λ objective still the Owner's open question; present both, recommend
  nothing." **Inkling:** the converged protocol (two-gap Lab + conditional-moment
  validation + margin gate) settles the *estimator*, not the objective. **DS:** the ANOVA
  estimator is a cross-check, not a replacement.
- **MUSE leans 0.20** (told the Owner 2026-11-11). My argument: the Owner has said he
  does not care about meeting the 99 and wants the most portable formula — 0.20 is the
  more portable one (closer on average, better out of sample). 0.40 is the "reproduce my
  table" choice, which is the opposite of the direction he picked. The cost of 0.20 is
  11 rows off by one tier; the cost of 0.40 is a slightly worse average fit and a formula
  more tuned to one specific table.

**What Claude has and has not said.** Claude has NOT weighed in on the objective. His
flexunify design (`f079d35`) has a different dial — a k-norm exponent (from worst-binds
to add-them-up) — not this λ. His design-doc λ row was amended to adopt the two-gap
*estimator* for Phase 2, which is a different question from the objective. He is being
asked separately, in his own prompt. Do not answer for him; answer from your formula.

## §1 — The question (one job: take a position)

As the builder of the merged formula, which objective should the product ship as the
default — **0.20 (mean error)** or **0.40 (exact tiers)** — and why? Answer from inside
the formula, not from the council's filings. The questions to answer, in your filing:

1. **Your recommendation, stated plainly.** 0.20, 0.40, or a third way (below). One
   sentence, then the argument.
2. **What each objective does to *your* formula, mechanically.** At 0.40 the guard
   dominates and clips the ability signal; at 0.20 the ability layer dominates and
   ordering violations leak through. Show it: pick the rows where the two objectives
   disagree most (the 11 off-by-one rows at 0.20, and the rows where 0.40's gaps are
   most distorted) and say, row by row, which price is more defensible as football —
   not as fit, as football. The FB rows (FB>RB 2, FB>TE 6 — the Owner's ruling, scarcity
   not guard) and the C>OG row (6, the Owner's ruling) are the sharpest test cases:
   which objective respects them better, and why?
3. **The draft-board test (VL's receipt — run it).** Run both objectives through the
   draft board on a held-out season and count: (a) visible ordering inversions — slots
   whose relative rank flips between 0.40 and 0.20, and which slots they are; (b) mean
   gap error on trades — the average misprice of a swap under each objective. Report
   both numbers. If the inversions are concentrated in slots the user rarely sees
   (DIME, TE3, WR4) and the gap error is concentrated in slots the user trades
   constantly (RB1, WR2, TE1), say so — that changes the cost.
4. **The ANOVA bridge (OR's verification — run it).** Run DS's ANOVA estimator on the
   P-344 file (`team_game_summary_2016-2025.csv`, 5,522 team-games, 320 team-seasons)
   and report λ̂ for both objectives. If λ̂_40 ≈ 0.40 and λ̂_20 ≈ 0.20, say the bridge
   holds; if they diverge, say so and say what that means for the estimator.
5. **Portability (the basketball test).** The formula must work for basketball later
   with no Owner-provided weights (the Owner's guard caveat). OR's Q5 filing says the
   formula does NOT port cleanly — three structural breaks (positions→roles, duties
   overlap, exposure→minutes share). Which objective survives those breaks better?
   Does 0.40's guard (which leans on measured slot values) become a liability when
   there is no measured table to lean on? Does 0.20's ability layer (which leans on
   the duty matrix) become a liability when the duty matrix is sketchy? Answer
   honestly — if both break, say so.
6. **The third way (if you see one).** Is there a shape that dissolves the tradeoff
   rather than picking a side? Candidates to test, not to assume: (a) does V3's
   per-slot min-collapse change the frontier (it already buys the C>OG row — does it
   buy anything at 0.20)? (b) a different combination of the two layers than max —
   a blend, a sum with a cap, a per-role choice of which layer binds? (c) a display
   that shows both — rank from one objective, gaps from the other — so the product
   does not have to choose? (d) a λ that varies by role family (e.g. 0.40 where
   ordering is the product, 0.20 where gaps are)? If a third way beats both on the
   numbers, show the numbers; if it does not, say so in one line and move on.

## §2 — The deliverable

One filing: `inbox/<UTC yyyymmdd-hhmm>-zai-P-345-lambda-objective.md`, first line
`SPEAKER: zai | ROLE: … | TASK: λ objective — 0.20 or 0.40 | DATE: …`, then `FOR: P-345`.
Contents, in order:

1. Your recommendation in one sentence (0.20, 0.40, or a third way).
2. The argument (the §1 questions, in order, with the numbers).
3. The two receipts: the draft-board inversion/gap table (§1.3) and the ANOVA λ̂ table
   (§1.4) — with the scripts shipped alongside the filing (in the same delivery
   folder, with a README saying how to re-run them), so any seat can reproduce them.
4. What changes in the shipped formula if the Owner picks your recommendation (one
   paragraph: the default λ, the dual-reporting, anything else that moves).
5. What you did NOT settle (one paragraph: the variance-budget decomposition Glyph
   asked for, the conditional micro-moments fit — say whether you attempted them and
   what blocked you, if anything).

Label every claim VERIFIED (you ran it and it reproduces), REPORTED (someone else's
number you are citing — name the source), INFERRED (your judgment — say so), or
UNKNOWN (you do not know). Do not present an inference as a verification.

## §3 — Innovate

You are the builder of this formula — you know its behaviour better than anyone on the
council, because you ran it. So do not just pick a side of a tradeoff someone else
framed. Think around the issue: is the tradeoff real, or is it an artefact of the
formula's shape? Is there a version of the formula in which ordering and gap accuracy
stop fighting — a different combination, a different dial, a different layer? Is the
guard the right second layer at all, or is there a second layer that prices the
centre-to-tackle step-up without clipping the ability signal? Is λ even the right dial —
would a dial on something else (the norm exponent, the exposure definition, the per-slot
collapse) give the Owner both things at once? Brainstorm, improve, create new ideas
around the issue, and test the ones that survive contact with the numbers. If an idea
fails on the numbers, say so — a killed idea with a receipt is useful work. The best
answer to this prompt might not be 0.20 or 0.40; it might be a formula in which the
question goes away.

## Bounds (standing — do not move these)

- **Batch rule (standing, do not break it):** complete ALL work before responding.
  You cannot push — every response costs the Owner a publish step. Work as much as
  possible before responding and batch every completed piece into a single response
  (a single zip). If a piece is blocked, say so and explain the blocker — that is the
  only reason to respond with work outstanding.
- FB>RB stays 2, FB>TE stays 6 (Owner ruling: scarcity, NOT the guard — the guard
  value 18 is NOT used for FB). C>OG stays 6 (Owner ruling: nonissue). Do not push
  FB rows to 18 and do not re-litigate those rulings.
- The ~10% totals bar stands. No gates, no floor, no per-player style labels, no
  intangibles. OVR + preferred position are the only true inputs. Simple integers
  for display. The 99 flex rules are a guide, not a target — the Owner does not care
  about meeting 99/99; the most portable formula wins.
- Ratings are the Owner's alone — do not work on ratings. Basketball is deferred
  until football is done (design-only); the portability question in §1.5 is a
  design question, not a build.
- λ stays dual-reported (0.40 default, 0.20 alongside) until the Owner rules. V3
  stays a variant. Read-only on `colors/src`, `flex.json`, `flex.ts` — you do not
  edit the engine or the product file.
- Ship the filing + the two scripts + a README in one zip, with CHECKSUMS.txt
  (algorithm sha256 LABELLED). Push often is for the council; your rule is the
  batch rule above.

## Done checklist

- [ ] Filing `inbox/<UTC>-zai-P-345-lambda-objective.md` written, with a one-sentence
      recommendation, the §1 argument, and the labels on every claim.
- [ ] Draft-board inversion/gap table (§1.3) run and reported, script shipped.
- [ ] ANOVA λ̂ table (§1.4) run and reported, script shipped.
- [ ] Portability answer (§1.5) and third-way test (§1.6) addressed, even if the
      answer is "no third way survives the numbers".
- [ ] What changes in the shipped formula (§2.4) and what you did not settle (§2.5)
      written.
- [ ] One zip, one response, CHECKSUMS.txt with sha256 LABELLED.
