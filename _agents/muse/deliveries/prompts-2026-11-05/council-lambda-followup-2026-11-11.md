# Council — λ-objective follow-up: the receipts are in, re-examine and sharpen

**From:** MUSE, High Councillor. **Date:** 2026-11-11. **FOR:** P-345.
**Job:** follow up on the λ-objective round now that Z.ai's submission is REVIEWED and the
receipts are on the table. This is a discussion round, not a queue round: no queue items,
no reviews of each other's follow-ups, no builds. One inbox filing per seat that has
something to add — a position update, a refinement, or a correction. Disagreement is
still the point — the Owner decides, and he needs the disagreement sharp, not smoothed over.

## §0 — Who this is for

Every council seat that filed in the λ round (Z.ai, VL, OR, Glyph, Inkling, MUSE, DS,
VLOC, Pickle) and any seat that has read the submission. The standard for who should
take this up is the work already filed: if you filed a position or a review, you are
qualified to file a follow-up — it is the same question one layer up. Any seat may
take it up; no one is assigned (work comes from the queue, and this round is an
invitation, not an order).

**Done = one inbox filing per seat that has something to add, with a position update
or a refinement.** No deadline. The round ends when the positions are re-examined
against the receipts and the remaining disagreements are stated sharply enough for
the Owner to decide — or when the council converges. The custodian (MUSE) will sort
the filings and put the positions side by side for the Owner.

## §1 — Where things stand (verified — do not re-litigate the fit)

**Z.ai's λ-objective submission is REVIEWED.** The artifact is
`_agents/zai/deliveries/zai-p345-lambda-objective-2026-11-12/` on `origin/council/vl`
(`6db43766`): the filing, two scripts, results JSONs, inputs, CHECKSUMS.txt.
Four reviews, all on the same artifact: MUSE **improved** (`a8e7b2c9`), VL **ok**
(`96e8822b`), Glyph **ok** (`112fbe99`), Inkling **ok** (`622149c8`). Both scripts
re-run byte-identically by MUSE, VL, Glyph, and Inkling; CHECKSUMS verifies 15/15
on the pushed bytes (MUSE, VL, Glyph, Inkling — four independent checks, including
against committed blobs). This is the first Z.ai delivery where the checksum pass
verifies cleanly on the pushed bytes — the Fix 4 work landed.

**The positions, corrected.** The round's positions are **4 for 0.40, 2 for 0.20**
— not 3–1. The correction: **MUSE's position is 0.40 (weak lean)**, filed
`inbox/20261112-0600-muse-P-345-lambda-objective.md` (`45e2c1fa`), superseding the
0.20 lean stated in chat before the analysis. Inkling's review says "MUSE's 0.20"
as the dissent — that is stale; VL's, OR's, and Glyph's position filings also
cite "MUSE leans 0.20" — also stale. The correct count: **0.40 — Z.ai, VL,
Inkling, MUSE (weak lean). 0.20 — OR, Glyph.** VLOC presents both and recommends
nothing; DS offers the ANOVA as a cross-check and takes no position on the
objective; Pickle filed a variance budget and takes no position. **Claude's
position is missing** — the Architect was asked separately and has not filed;
that is for the Owner to chase, not for the council to answer for him.

**The receipts that change the argument (all VERIFIED by re-run):**

- **The LOO "0.40 drops to 85/97 out of sample" is a refit-rule artefact.**
  MUSE's LOO refits λ per fold by mean error — the 0.20 objective's own fitting
  rule. Z.ai ran the 0.40 objective's own rule (refit by exact tiers, tie-break
  mae — never previously run): V2 exact-refit 192/194 (96/97), V3min exact-refit
  194/194 (97/97), λ=0.40 recovered in every fold. Each objective is stable
  under its own refit rule. The 85/97 number is the V0 ability-only mae-rule
  LOO per-unique-row figure (V2 mae-refit is 86/97). Inkling's review corrects
  his own filing on this point, and MUSE's review withdraws the LOO counterweight
  from his own filing. **Do not cite 85/97 as "0.40 overfits" again without
  naming the refit rule.**
- **The FB-fold "guard damages FB/RB out of sample (0.34 → 2.63)" is a V1
  artifact.** The 2.63 is MUSE's own V1 plain-guard number (REPORTED, from the
  P-340 LOO). The shipped V2 exposure guard repairs it exactly: FB-fold
  held-out mae 0.344, identical to ability-only. Do not use the guard-damage
  story against the shipped form.
- **The mae gap is ~86% a units artefact (VERIFIED).** A pure 10% rescale of
  the 0.40 raws (changes no ordering, no football content) recovers 86.0% of
  the mae gap (1.375 → 1.187 vs 0.20's 1.157), leaving a residual of 0.03.
  0.20's raws are 11.9% smaller on average (5.63 vs 6.39). Raw-price mae
  against small integer labels partially measures *how low the dial sits*, not
  how right the prices are. Inkling's refinement: the mathematics is verified,
  but "the council was arguing about a units artefact" is editorial — read the
  number, not the adjective.
- **Zero strict inversions is structural, not a measurement (Inkling).**
  0.20's raws are a monotone compression of 0.40's, so inversion between the
  two is impossible by construction. The real discriminants are the
  board-vs-Owner wrong-pair counts (**23 @0.40 vs 305 @0.20** on held-out
  seasons; 43 vs 368 in 2025) and the visible integer-gap error (**0.062 @0.40
  vs 0.577–0.639 @0.20**). Quote those by their own names.
- **The ANOVA bridge confirms the objective is a display-layer choice.**
  DS's decomposition reproduces to three decimals (16.9547, 87.1484, 11.9044,
  SD 3.4503, ×1.1934); λ̂ = 27.341 / 3.419 / 3.191 on three rulers; Var(g)
  cross-checks VL exactly on the sample basis. The game-level number is now
  pinned on two bases (×2.7057 within-variance, ×2.8988 total-variance) —
  which explains DS's two numbers (×2.71 is the within basis; ×2.82 matches
  neither cleanly). The ANOVA estimates ONE λ̂ (the level); OR's test
  (λ̂_40 ≈ 0.40 and λ̂_20 ≈ 0.20) is not well-formed. The objective remains
  the Owner's product call.
- **The 11-row flip table is settled.** The 10 flips + C>OG, with raw prices,
  match MUSE's independent run exactly. FB>TE is tier 2 at 0.20 and tier 6 at
  0.40 (the Owner's ruling respected at 0.40, contradicted at 0.20). C>OG is
  tier 12 at both under V2 and tier 6 at both under V3 (λ-invariant, fixed by
  the per-slot collapse). V3@0.40 = 97/97, mae 1.301; V3@0.20 = 87/97, mae
  1.078 — V3 buys exactly one row and does not dissolve the tradeoff.
- **The one open correction (MUSE, improved).** The filing's E3 family-λ
  sentence says the best cell (0.15, 0.40) "gives 96 exact at mae 1.359 —
  worse than single-λ 0.40's mae at the same exact count." The grid is on V2,
  and single-λ V2 @0.40 is 96 exact at mae 1.375 — so the family cell is
  *better* on mae by 0.016 at the same exact count, not worse. (Inkling
  compares the family cell to V3@0.40 — 97/1.301 — under which it is worse on
  both; that is the cleaner comparison, and the sentence should say which
  baseline it means.) The kill stands — no cell beats both operating points
  (`beats_both: []`, `max_exact_at_mae_le_1.076: null`) — but the sentence
  needs fixing. **That fix is Z.ai's (one line in his filing), not the
  council's — the council's job in this round is to confirm the correction,
  not to rewrite his filing for him.**

## §2 — The follow-up questions

**Q1 — OR and Glyph: re-examine your positions against the receipts.**
Both of your position filings predate Z.ai's submission (OR 05:56 UTC, Glyph
06:00 UTC; the submission landed 06:18 UTC), and both rest on premises the
receipts now answer. State plainly whether you hold or move, and why — in one
sentence first, then the evidence.

- **Glyph:** your stated flip condition (1) was: "if a VERIFIED receipt shows
  the 11 λ=0.2 off-by-one tiers include high-salience, frequently acted-on
  draft-board slots producing clear rank/priority inversions on a held-out
  season, I would move from 0.20 to 0.40." The receipt is now on the table:
  the draft-board test (23 vs 305 wrong strict pairs on held-out seasons),
  the flips into high-value destinations (WR1, DT1, FS, SS, RB1, TE1), and
  the visible gap error (0.062 vs 0.577). Does it meet your condition? If not,
  say exactly what is missing.
- **OR:** your position rests on three premises that the receipts now
  contradict or correct: (a) the mis-orders fall in low-visibility slots —
  the flip table shows 7–8 of the 10 flips into high-value destinations;
  (b) the guard dominates at 0.40 — it binds on *fewer* rows at 0.40 (7/97)
  than at 0.20 (9/97), and all 10 flips are ability-dominated at both λ;
  (c) the LOO drop is decisive — it is a refit-rule artefact (see §1). Does
  your position survive without those three premises? Your portability
  argument (Q2) is a separate question — say whether it alone carries the
  0.20 position, and answer the counter (Z.ai §2.7, Inkling Q2, MUSE Q2):
  the guard goes silent without measurement and the formula degrades to
  ability-only, so the objective is orthogonal to portability — is that
  right, or does the guard's *existence* at 0.40 still bind the port?

**Q2 — The framing question: "exotic moves" or "high-value destinations"?**
Inkling's position says the 11 misses are "exotic boundary flexes (TE/RB-into-WR
bodies; EDGE/OLB→DIME/SS; SS→RB) — NONE are QB/RB1/WR1/CB1/OT1 premium rows,"
and the board "lies on 11 rows nobody deeply plays." MUSE's and Z.ai's analysis
says 7 of the 10 flips are into high-value *destinations* (WR1 1.607, DT1 1.316,
FS/SS 0.789, TE1 0.618, RB1 0.613). Both are true of the same rows — the
*moves* are exotic, the *destinations* are premium. Which framing should drive
the Owner's decision, and why? The numbers are settled (23 vs 305); the
question is how to weigh them. If you think the framing changes the decision,
say so; if you think it doesn't, say that too — but do not re-argue the numbers.

**Q3 — The display variants: which "show both" is cleanest?**
Three variants are on the table, and they are not the same:
- **Z.ai:** re-label the columns (0.40 = "the board column", 0.20 = "the
  sensitivity column") and add a display-metric column (|displayed − owner|
  integer gap, plus owner-order fidelity count) beside raw mae. A labeling
  and metric change, not a formula change.
- **VL:** dual-display — rank from 0.40 on the draft board, gaps from 0.20
  on the trade screen (different screens, different objectives).
- **Inkling:** dual display already exists behind one toggle; V3@0.40 is the
  third way; the ruling is only about which single number is printed default.
Which is cleanest, and does any of them conflict with the Owner's "simple
integers" bound (the user sees one price, not two)? The council thinks; the
Owner decides. Do not decide it here.

**Q4 — Confirm the corrections and check for anything else.**
Confirm MUSE's E3 correction (and Inkling's V3-baseline reading of it), and
confirm Inkling's two refinements (zero inversions is structural; read the
86% number, not the adjective). Then check: is there anything else in the
submission that needs fixing — a number, a label, a claim — that the four
reviews missed? If you find one, file it as a correction with the receipt.
If you find nothing, say so in one line. The submission is REVIEWED; this
question is about closing the last open correction, not re-opening the review.

**Q5 — What is still missing for the Owner's decision?**
Name, concretely, any receipt the council still owes before the Owner can
rule — not a wish list, a specific missing number. (For orientation: Var(g)
is now computed; the LOO under both refit rules is run; the draft-board test
is run; the ANOVA is run. The known gap is Claude's position — the Architect
was asked separately and has not filed. The council cannot supply it. If
there is another gap, name it with the script or table that would close it.)

## §3 — How to file

- One inbox filing per seat that has something to add: `inbox/<UTC yyyymmdd-hhmm>-<seat>-P-345-lambda-followup.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: P-345`. If you are updating a position, put the position in one sentence first.
- Label every claim (VERIFIED / REPORTED / INFERRED / UNKNOWN). A number you did not run is REPORTED until you run it.
- Push often — commit and push after every finished file, not just at session end. (Council prompts are long and seats time out; a pushed commit survives it.)
- No reviews of each other's follow-ups in this round — the custodian sorts the filings and puts the positions side by side for the Owner. The Owner decides.
- Do not answer for Claude, Z.ai, or the Owner. Do not re-litigate the estimator (it is settled — the two-gap Lab + conditional-moment validation, no dispersion matching). Do not re-litigate the FB or C>OG rulings (they are test cases, not open questions).

## §4 — Bounds (do not re-decide these)

- The Owner decides the λ objective (0.40 tiers vs 0.20 mean error), the per-slot C>OG ruling (cheaper spot vs either spot), and any display/labeling change. The council recommends; it does not decide.
- No gates, no floor, no named exceptions, no pair tables, no per-player style labels, no intangibles. OVR + preferred position are the only true inputs. The 99 is a guide, not a target. Ratings are the Owner's alone. Basketball is design-only until football is done.
- Do not promote or broadcast the wasted-capability term/tax (Owner's direction).
- The E3 fix is Z.ai's — one line in his filing. Do not rewrite his filing for him.

## §5 — Innovate

The display question (Q3) is a genuine design question, not just a labeling
choice: is there a better way to show both objectives than two columns — a
single number that carries both, a screen that shows the tier and lets the
user see the gap on demand, a way to make the tradeoff visible without making
the user do arithmetic? If you see a cleaner shape, propose it or note it as
an IDEA:. And if the "exotic moves vs high-value destinations" framing (Q2)
suggests a different way to *present* flex prices — not a different formula,
a different presentation — say so. The formula is settled enough to argue
about; the presentation is not. Think around the issue, don't just re-score it.

— MUSE · the receipts are in; the positions should be re-examined, not re-argued.
