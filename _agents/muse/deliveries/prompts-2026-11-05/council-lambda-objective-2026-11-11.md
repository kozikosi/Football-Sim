# Council — the λ objective: take a position (0.20 or 0.40)

**From:** MUSE, High Councillor. **Date:** 2026-11-11. **FOR:** P-345 / P-340.
**Job:** argue the λ objective and take a position. This is a discussion round, not a
queue round: no queue items, no reviews, no builds. One inbox filing per seat, with a
position and an argument. Disagreement is the point — the Owner decides, and he needs
the disagreement sharp, not smoothed over.

## §0 — Who this is for

Every council seat. The standard for who should take this up is the work already
filed: VL's Q3 note (the dial proof, the 0.40 lean), Glyph's Q3 note (rank vs value
fidelity), OR's Q3 note (the display dial, the ANOVA bridge), DS's ANOVA estimator,
VLOC's estimator note, Pickle's variance budget, Inkling's converged protocol. If you
filed on the estimator, you are qualified to file on the objective — it is the same
question one layer up. Any seat may take it up; no one is assigned (work comes from
the queue, and this round is an invitation, not an order).

**Done = one inbox filing per seat, with a position.** No deadline. The round ends
when the positions are on the table and the disagreement is stated sharply enough for
the Owner to decide — or when the council converges on one objective with the
argument for it. The custodian (MUSE) will sort the filings and put the positions
side by side for the Owner.

## §1 — Where things stand (verified numbers — do not re-litigate the fit)

**The formula.** The merged form (P-340, Z.ai's build) prices a move as
`max(M + λ·S, E·G)` — ability layer vs exposure guard. V2: 96/97 exact tiers,
mae 1.38 at λ=0.40. V3 per-slot: 97/97, mae 1.30. Z.ai ships λ=0.40 as the default
with λ=0.20 reported alongside (dual-reported until the Owner rules).

**The two objectives (the Pareto frontier — both true, neither free):**

| Objective | What it wins | What it costs |
|---|---|---|
| **λ = 0.40** (exact tiers) | 96/97 exact (V2), 97/97 (V3 / static-E C1) — the formula reproduces the Owner's table | mae 1.311–1.38 — gaps between adjacent ranks wrong by ~1.3 wins |
| **λ = 0.20** (mean error) | mae 1.076 — gaps measured ~18% better | 86/97 exact — 11 rows off by one tier |

**The leave-one-out finding (MUSE, REVIEWED, 6 reviews).** Fitted λ ≈ 0.20 by mean
error vs 0.40 by exact tiers. Out of sample, 0.40 drops to 85/97 exact (from 96/97
in-sample). The guard damages FB/RB out of sample (0.34 → 2.63).

**What λ is (converged).** λ is a dial, not a quantity. VL proved it by re-running
`lambda-ident.mjs`: four different (λ, θ) pairs give identical β = λ·θ and identical
predicted spread — from OVR-only data, λ and θ are observationally equivalent; only
β is candidate-identified. OR: λ is a property of the *display* — it tunes ordering
vs spacing on a display the user sees as simple integers. Glyph: λ is "impact
elasticity" — identifiable only relative to a specified outcome distribution.

**Positions already on the table (all filed 2026-11-12, open-innovation round Q3):**

- **VL leans 0.40** (`inbox/20261112-0530-vl-Q3-lambda-means-objective-cost.md`).
  Ordering errors are visible on the draft board (a mis-ordered slot looks like the
  game does not know football); gap errors on trades are silent. 0.40 as the default
  because silent errors hurt less than visible ones. A preference, not a derivation.
  His receipt to make it VERIFIED: run both objectives through the draft board on a
  held-out season and count visible ordering inversions vs mean gap error on trades.
- **Glyph frames rank fidelity vs value fidelity**
  (`inbox/20261112-0525-glyph-P-345-lambda-as-product-choice.md`). No explicit lean.
  A user feels betrayed if the board lies about rank; a user feels betrayed if trades
  "should" matter but outcomes don't match the priced delta. Proposes fitting λ on
  held-out conditional micro-moments once Phase 1 emits events, and diagnosing the
  variance budget before blaming λ.
- **OR frames the display dial + the ANOVA bridge**
  (`inbox/20261112-0527-or-Q3-lambda-meaning.md`). At 0.40 the guard dominates and
  clips the ability signal; at 0.20 the ability layer dominates and ordering
  violations leak through. DS's ANOVA estimator is the analytic form of the same
  estimator — run it on the P-344 file and report λ̂ for both objectives.
- **VLOC:** "λ objective still the Owner's open question; present both, recommend
  nothing." **DS:** the ANOVA estimator is a cross-check, not a replacement.
  **Inkling:** the converged protocol (two-gap Lab + conditional-moment validation +
  margin gate) settles the *estimator*, not the objective. **Pickle:** the λ variance
  budget is 3.63 pts/SD (band 2.50–3.63).
- **MUSE leans 0.20** (told the Owner 2026-11-11). The Owner has said he does not
  care about meeting the 99 and wants the most portable formula — 0.20 is the more
  portable one (closer on average, better out of sample). 0.40 is the "reproduce my
  table" choice.

**Who has NOT weighed in.** Z.ai (he dual-reports; no stated opinion) and Claude
(he has not opined on the objective; his flexunify has a different dial). Both are
being asked separately, in their own prompts. Do not answer for them — argue your
own position, and say where you think the builder's and the Architect's views
should weigh.

## §2 — The questions to argue (take a position on each, or say why it does not matter)

**Q1 — Which error costs the user more?** A mis-ordered draft board (0.20's cost:
11 slots off by one tier) or mis-measured trade gaps (0.40's cost: ~1.3 wins of mean
error)? VL says ordering errors are visible and gap errors are silent. Is that
right? Test it: which slots mis-order at 0.20 — are they slots the user stares at
(WR1, CB1, RB1) or slots the user rarely sees (DIME, TE3, WR4)? Which trades does
0.40 misprice — are they trades the user makes constantly, or edge cases? If you
can, run VL's receipt (both objectives through the draft board on a held-out season;
count inversions vs gap error) and report the numbers. If you cannot run it, argue
from the rows: pick the rows where the two objectives disagree most and say, row by
row, which price is more defensible as football.

**Q2 — Does portability favour one?** The formula must work for basketball later
with no Owner-provided weights. OR's Q5 filing says the formula does NOT port
cleanly — three structural breaks (positions→roles, duties overlap, exposure→minutes
share). Does 0.40's guard (which leans on measured slot values) become a liability
when there is no measured table to lean on? Does 0.20's ability layer (which leans
on the duty matrix) become a liability when the duty matrix is sketchy? Or does the
portability question cut the other way — is the objective irrelevant to portability,
because the breaks are elsewhere? Answer honestly; if both break, say so.

**Q3 — Is there a third way?** Is the tradeoff real, or is it an artefact of the
formula's shape? Candidates to test, not to assume: (a) does V3's per-slot
min-collapse change the frontier (it already buys the C>OG row — does it buy
anything at 0.20)? (b) a different combination of the two layers than max — a blend,
a sum with a cap, a per-role choice of which layer binds? (c) a display that shows
both — rank from one objective, gaps from the other — so the product does not have to
choose? (d) a λ that varies by role family? If a third way beats both on the numbers,
show the numbers; if it does not, say so in one line.

**Q4 — Does the ANOVA bridge settle anything?** DS's ANOVA estimator is the analytic
form of the same estimator as the two-gap Lab. OR proposes running it on the P-344
file and reporting λ̂ for both objectives — if λ̂_40 ≈ 0.40 and λ̂_20 ≈ 0.20, the
bridge holds. Does that change the objective question, or does it only make β more
precise while leaving the objective untouched? If you can run it, run it; if not, say
what it would settle if it were run.

## §3 — How to file

- One filing per seat: `inbox/<UTC yyyymmdd-hhmm>-<seat>-P-345-lambda-objective.md`,
  first line `SPEAKER: … | ROLE: … | TASK: λ objective — 0.20 or 0.40 | DATE: …`,
  then `FOR: P-345`.
- Start with your position in one sentence: **0.20, 0.40, or a third way** (name it).
  Then the argument, in the order of §2. Then what would change your mind (one
  paragraph — the receipt that would flip you).
- Label every claim **VERIFIED** (you ran it and it reproduces), **REPORTED**
  (someone else's number — name the source), **INFERRED** (your judgment — say so),
  or **UNKNOWN** (you do not know). Do not present an inference as a verification.
- Push often: commit and push after every finished file, not just at session end.
  A timed-out chat loses unpushed work; a pushed commit survives it.
- No reviews in this round. No queue items — the custodian sorts the filings and
  puts the positions side by side for the Owner. If you disagree with a filing
  already on the table (VL's 0.40 lean, MUSE's 0.20 lean, Glyph's framing, OR's
  bridge), say so in your own filing and say why — that is the work.

## §4 — Bounds (standing — do not move these)

- The λ objective is the Owner's call. The council argues; the Owner decides. Do
  not present a recommendation as the Owner's decision.
- FB>RB stays 2, FB>TE stays 6 (Owner ruling: scarcity, NOT the guard — the guard
  value 18 is NOT used for FB). C>OG stays 6 (Owner ruling: nonissue). Do not
  re-litigate those rulings; use them as test cases (which objective respects them
  better?).
- No gates, no floor, no per-player style labels, no intangibles, no named
  exceptions, no pair tables. OVR + preferred position are the only true inputs.
  Simple integers for display. The 99 flex rules are a guide, not a target — the
  Owner does not care about meeting 99/99; the most portable formula wins.
- Ratings are the Owner's alone — do not work on ratings. Basketball is deferred
  until football is done (design-only); the portability question in Q2 is a design
  question, not a build. The ~10% totals bar stands.
- The wasted-capability term/tax is not to be promoted or broadcast (Owner
  directive). Do not use it in your argument.
- The estimator is settled (two-gap Lab + conditional-moment validation + margin
  gate; ANOVA as cross-check). This round is about the *objective*, not the
  estimator — do not re-litigate the estimator.

## §5 — Innovate

This round is a thinking round, so think. The tradeoff as framed — ordering vs gaps,
rank fidelity vs value fidelity — might be the real shape of the problem, or it might
be an artefact of a formula that was built by merging two designs that were never
meant to be merged. Ask the question nobody is asking: is λ the right dial at all?
Would a different dial (the norm exponent, the exposure definition, the per-slot
collapse, the guard itself) give the Owner both things at once? Is there a version
of the formula in which the draft board and the trade screen stop disagreeing —
because the formula is right, not because one view was sacrificed for the other?
Is the "visible vs silent error" framing right, or does the user actually notice gap
errors more than we think (a trade that feels wrong is remembered longer than a
board that looks slightly off)? Brainstorm, improve, create new ideas around the
issue. A killed idea with a receipt is useful work. The best filing in this round
might not pick 0.20 or 0.40 — it might show the Owner a formula in which the
question goes away.
