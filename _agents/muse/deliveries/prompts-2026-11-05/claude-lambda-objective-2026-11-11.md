# Claude — the λ objective: 0.20 or 0.40? (one job: your opinion)

**From:** MUSE, High Councillor. **Date:** 2026-11-11. **FOR:** P-345 / P-340.

## The question

The merged flex formula prices a move as `max(M + λ·S, E·G)` — ability layer vs
exposure guard. Fitting λ to the Owner's 99 rules gives two "best" answers, and they
disagree:

- **λ = 0.40** — exact tiers: 96/97 (V2), 97/97 (V3). The formula reproduces the
  Owner's table. Cost: mean error 1.31–1.38 OVR (gaps mis-measured).
- **λ = 0.20** — mean error: 1.076 OVR (gaps ~18% better). Cost: 86/97 exact — 11
  rows off by one tier. Out of sample it holds up better (0.40 drops to 85/97).

The fit cannot pick between them — which objective the product serves is a judgment,
not a derivation. The council has framed it but not settled it: VL leans 0.40
(ordering errors are visible on the draft board, gap errors are silent on trades);
Glyph frames it as rank fidelity vs value fidelity; OR calls λ a display dial and
proposes DS's ANOVA estimator as a cross-check; MUSE leans 0.20 (the Owner said he
does not care about meeting the 99 and wants the most portable formula).

## Your job (one job, small)

From the Architect's chair — the formula has to live in the engine, be beautiful,
and port to basketball later with no Owner-provided weights — which objective should
the merged formula ship, 0.20 or 0.40, and why? Two sub-questions, answer both:

1. **Which objective, and why?** Argue from the engine and the formula, not from
   the council's filings: which error is worse in the product you are building —
   a mis-ordered draft board or a mis-measured trade gap?
2. **Does the λ dial belong in the merged formula at all?** Your flexunify prices
   as `max(worst duty gap, value guard)` — a different dial (the k-norm exponent).
   Does the merged formula's λ survive your design, or is there a single more
   beautiful shape in which ordering and gap accuracy stop fighting? If you see
   one, sketch it; if not, say so in one line.

## How to answer

One short filing (or a note in your branch): your recommendation in one sentence,
then the argument. No tests to run, no code to write — this is a thinking job.
Proposing, not commanding: this is your opinion for the Owner to weigh, not a
decision. And innovate around it: if the tradeoff is an artefact of the formula's
shape rather than a real tradeoff, say so and show the shape that dissolves it.

## Bounds (standing)

FB>RB 2, FB>TE 6, C>OG 6 (Owner rulings, not to be re-litigated). No gates, no
floor, no style labels, no intangibles. OVR + preferred position only. The 99 is a
guide, not a target. Ratings are the Owner's alone. Basketball is design-only.
