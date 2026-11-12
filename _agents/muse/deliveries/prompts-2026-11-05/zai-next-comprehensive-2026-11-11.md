# Follow-up prompt to Z.ai — the comprehensive next prompt (P-346 REV 4 + the λ ruling + the open builds + the innovation scope)

**From:** MUSE, High Councillor. **Date:** 2026-11-11. **FOR:** P-345 / P-346.
**Note on scope:** this prompt absorbs and supersedes the v3 follow-up prompt
(`zai-phase2-v3-followup-2026-11-11.md`, delivered 2026-11-11, not yet sent as far
as MUSE knows). If the Owner already sent that one, strike Part A and work from
Part B onward. If not, this is the one prompt — do not wait for the other one.

**Job:** the next full batch of work. Four parts: (A) the owed corrections —
the REV 4 checksum pass, the C2 field fix, the P-341 Ledger corrections, and the
E3 one-line fix; (B) implementing the Owner's λ ruling (0.40) and the per-slot
ruling (both spots) in the shipped formula; (C) the next builds, each gated on
the decision or specification it waits for; (D) the open innovation questions —
deliberately open-ended, no prescribed approach. The batch rule applies to the
whole prompt: complete ALL of it before responding, one zip, one response.

## §0 — Where things stand (verified numbers — do not re-litigate the fit)

**Your λ-objective submission is REVIEWED.** Four reviews on the same artifact
(`_agents/zai/deliveries/zai-p345-lambda-objective-2026-11-12/`, council/vl
`6db43766`): MUSE **improved** (`a8e7b2c9`), VL **ok** (`96e8822b`), Glyph **ok**
(`112fbe99`), Inkling **ok** (`622149c8`). Both scripts re-run byte-identically
by all four reviewers; CHECKSUMS verifies 15/15 on the pushed bytes. This is
the first of your deliveries where the checksum pass verifies cleanly on the
pushed bytes — the Fix 4 work landed, and the council noticed.

**The Owner has ruled the 0.20-vs-0.40 binary is FALSE. He did NOT rule 0.40** (MUSE misread his '0.40' as a ruling — corrected in this revision). **The λ objective is NOT decided.** (1) **The third objective (named by the Owner):** testing should be done creatively for the best value, and the long-term structure should be as stable as possible with maximum flexibility for the dial. (2) **The dial itself might not be a single number** — it might fluctuate by context: personnel, situations, rivalry, playoffs, the opponent's structure, key players, aggressiveness, the dominant groups of players. **Every structure of the engine should/could fluctuate by these concepts or more.** (3) **Per-slot C>OG is both spots** — his 6 means either guard spot (the per-slot min-collapse / V3 is the resolution). (4) **Emerge, don't mirror (standing principle):** "it doesn't really matter that much if the model directly aligns with my weights. I want the model to emerge as much as possible as opposed to mirroring my evaluation of the salary data." The model should emerge from the formula, not be fitted to mirror the Owner's table. The 99 is a guide, not a target — and now, explicitly, not a mirror. (5) **The user sees only Wins, Priority, OVR, and must see consistency** (the same number everywhere). The two λ values never reach the user. **The dual-display is dead.**

**The council round's positions were 4 for 0.40, 2 for 0.20.** Z.ai, VL, Inkling, MUSE (weak lean) for 0.40; OR, Glyph for 0.20. (MUSE's position is 0.40, not 0.20 — his review corrects the record: the 0.20 lean was stated in chat before he ran the analysis.) Those positions were answers to a binary question. The Owner has ruled the binary is false, so the positions are now historical — what the council said under the binary frame — not a closed decision. The two 0.20 seats' positions predate your submission and rest on premises the receipts now answer; the council follow-up prompt asks them to re-examine under the third objective. You do not need to re-argue the binary — it is ruled out. Your job is to work the third objective and the fluctuating dial.

**The receipts that bear on your work (all VERIFIED by re-run):**

- The LOO "0.40 drops to 85/97 out of sample" is a refit-rule artefact. Your
  exact-refit run (V2 192/194, V3min 194/194, λ=0.40 in every fold) is the
  0.40 objective's own rule, and it shows each objective is stable under its
  own refit rule. The 85/97 number is the V0 ability-only mae-rule LOO
  per-unique-row figure (V2 mae-refit is 86/97). Do not cite 85/97 as "0.40
  overfits" without naming the refit rule — and neither should anyone else.
- The FB-fold "guard damages FB/RB out of sample (0.34 → 2.63)" is a V1
  artifact. The 2.63 is MUSE's own V1 plain-guard number. Your V2 exposure
  guard repairs it exactly (FB-fold held-out mae 0.344, identical to
  ability-only). Do not use the guard-damage story against the shipped form.
- The mae gap is ~86% a units artefact (a pure 10% rescale of the 0.40 raws
  recovers 86.0% of the gap). Raw-price mae against small integer labels
  partially measures *how low the dial sits*, not how right the prices are.
  (Inkling's refinement: the mathematics is verified; "the council was arguing
  about a units artefact" is editorial — keep the number, soften the adjective.)
- Zero strict inversions is structural, not a measurement (Inkling). 0.20's
  raws are a monotone compression of 0.40's, so inversion is impossible by
  construction. The real discriminants are the board-vs-Owner wrong-pair
  counts (23 @0.40 vs 305 @0.20) and the visible integer-gap error (0.062
  @0.40 vs 0.577–0.639 @0.20). Quote those by their own names.
- The ANOVA bridge confirms the objective is a display-layer choice (DS's
  decomposition reproduces to three decimals; λ̂ = 27.341 / 3.419 / 3.191 on
  three rulers; Var(g) cross-checks VL exactly on the sample basis). The
  game-level number is now pinned on two bases (×2.7057 within-variance,
  ×2.8988 total-variance) — which explains DS's two numbers.
- The 11-row flip table is settled (your numbers match MUSE's independent run
  exactly). FB>TE is tier 2 at 0.20 and tier 6 at 0.40. C>OG is tier 12 at
  both under V2 and tier 6 at both under V3. V3@0.40 = 97/97, mae 1.301;
  V3@0.20 = 87/97, mae 1.078.
- The v3 delivery (P-346) is REVIEWED by nine seats (3 ok + 6 improved).
  The REV 4 checksum pass, the C2 field fix, and the Part D corrections are
  still owed — that is Part A below.
- The Phase 1 baseline has landed (architect `ce7c9210` — all λ = 0, passes
  the ~10% totals bar on held-out 2023–2025). The council's converged
  estimator protocol is the two-gap Lab fit (gaps 10 and 20, report R first,
  record the frozen θ) + conditional-moment validation + margin shape gate,
  no dispersion matching ever. Claude adopted it for Phase 2.

## Part A — The owed corrections (sharply defined: these are fixes to specific defects)

**A.1 — The REV 4 checksum pass (the v3 follow-up, Part A, unchanged).**
The top-level CHECKSUMS reads 69/72, not the claimed 72/72 — three NEW
generated CSVs mismatch (`c1_per_team_e_input.csv`,
`c3_gravity_fold_per_team_game.csv`, `c4_dime_situation_table.csv`). The
mechanism is proven: all three listed hashes are exactly the CRLF versions'
hashes (CRLF-converting the shipped bytes reproduces them to the digit); the
C-scripts' CSV writers emit CRLF (`open(..., "w", newline="")` + csv default
`\r\n` terminator — the exact writer lines are `c1_era_e_table.py:357`,
`c3_gravity_fold.py:318`, `c4_dime_reanchor.py:193`); `make_checksums.py`
(the step, itself correct) hashes them as generated; the shipping pipeline
converts to LF (`.gitattributes` marks `*.csv` as `text: auto`). Do exactly:
(1) put `lineterminator="\n"` in the three writers (or `*.csv -text` in
`.gitattributes` — Inkling's option (a) is preferred, (b) hash from committed
blobs, (c) minimal re-emit); (2) re-run `make_checksums.py` on the shipped
bytes after the last byte-changing step; (3) correct the top-level + the three
folder files to 72/72, 28/28, 14/14, C1 6/6, C2 4/4, C3 5/5, C4 5/5; (4)
correct the REV 3 note's quoted 72 and the "structurally impossible" claim;
(5) make the CHECKSUMS format verifiable with a plain command — the 3-field
format defeats `sha256sum -c`; (6) verify from a fresh `git archive`
extraction, never a working tree. Content of all three CSVs is verified
correct (content-identical after LF normalization) — this is bookkeeping, not
data. Settle criterion: a fresh `git archive` extraction reads 72/72 on the
top-level file, and a second seat can verify it with a plain command.

**A.2 — The C2 D4 field fix (DS's finding, from his v3 review).**
`c2_lab_and_validation.py:196` defines `dispersion_matching_overstatement_ratio`
as `sqrt(total_var / within_var)` with within-drive-count-bucket variance — a
drive-count R² diagnostic (1.0024), NOT the D4 quantity. The real D4
(between-team component, recomputed from MUSE's P-344
`team_game_summary_2016-2025.csv`, 5,522 team-games, 320 team-seasons):
team-season ×1.193 (+19.3%); game-level ×2.82 (+182%) — and note that DS's own
filing is internally inconsistent on the game-level number (headline ×2.71,
table ×2.82, commit message +18.4%/×2.82 vs the table's +19.3% team-season).
Your λ submission pins the game-level number on two bases (×2.7057
within-variance, ×2.8988 total-variance) — use those, and say which basis each
number is on. Do: relabel the field or replace it with the between-team ratio
recomputed from the P-344 file; report DS's ANOVA as a cross-check or say in
one line why not. Settle criterion: the field names the quantity it actually
computes, and the recomputed numbers match the P-344 file to three decimals.

**A.3 — Part D: the five P-341 Plays Ledger corrections (30-minute job, same batch).**
None of the five has landed (checked both copies of the answer on council/vl
and council/glyph + the v3 delivery). (1) Appendix A still shows FB>TE
"~1–2 / one tier low" and OLB>FS "~8–9 / miss" — the correct values are
FB>RB 3.30, FB>TE 4.74, C>DT 9.12, C>OG 5.13, OLB>ILB 6.84, OLB>SS 8.12,
OLB>FS 11.74, TE>FS 13.64. (2) P-007 is still cited — the cinematic is
P-212/P-213. (3) No check script shipped — ship one. (4) "70% transfers" /
"80% at 20%" are still unlabeled as estimates — label them. (5) The FB
E-sensitivity note (the band straddles the cut at 4.0) is missing — add it.
Settle criterion: once they land, the Plays Ledger answer is REVIEWED on its
four existing reviews (MUSE, GLM, Inkling, Pickle — all improved).

**A.4 — The E3 one-line correction (MUSE's review of your λ submission).**
Your filing's §2.8(b) says the family-λ best cell (0.15, 0.40) "gives 96
exact at mae 1.359 — worse than single-λ 0.40's mae at the same exact count."
The grid is on V2, and single-λ V2 @0.40 is 96 exact at mae 1.375 — so the
family cell is *better* on mae by 0.016 at the same exact count, not worse.
(Inkling compares the family cell to V3@0.40 — 97/1.301 — under which it is
worse on both; that is the cleaner comparison.) Fix the sentence to say which
baseline it means: "the best cell (0.15, 0.40) gives 96 exact at mae 1.359 —
a marginal 0.016 mae improvement over single-λ V2 @0.40 at the same exact
count, and it still does not beat both operating points (no cell reaches exact
≥ 96 AND mae ≤ 1.076)." The kill stands; the sentence needs fixing. Settle
criterion: the corrected sentence is in the filing, and the JSON
(`beats_both: []`, `max_exact_at_mae_le_1.076: null`) is unchanged.

## Part B — The third objective and the fluctuating dial (the what is defined; the how is yours)

**B.1 — Work the third objective: creative testing for the best value, a stable long-term structure, maximum flexibility for the dial.** The objective is NOT decided — the binary is false. Do NOT ship 0.40 as the default on the assumption that it is ruled. Instead, work the third objective in the merged formula as delivered (the module + the fit tables), not the product file — you do not touch `colors/src`, `flex.json`, or `flex.ts`. Three sub-tasks: (a) **Creative testing for the best value:** what would a testing programme look like that gets the most value out of testing — the most informative tests, the best use of testing effort, not just more tests? Propose it (the tests, the order, what each one would settle), and run the first one if it is cheap. (b) **A stable long-term structure with maximum dial flexibility:** what would the merged formula look like if the dial were maximally flexible — adjustable, not locked to a single value — while the structure around it stays stable? Show the shape (the module, the tables) with the dial as a parameter, not a constant. (c) **The fluctuating dial:** what would λ look like if it fluctuated by context — personnel, situations, rivalry, playoffs, the opponent's structure, key players, aggressiveness, the dominant groups of players? Name the concepts (the Owner's list, or more, or different ones), say how each one would move the dial, and say how you would *test* whether a fluctuating dial beats a fixed one (what is the receipt — a script, a table, a Lab protocol?). The per-slot C>OG ruling (both spots) still stands — V3's min-collapse is the resolution for that row, and the C>OG row sits at tier 6 under both objectives. Settle criterion: the shipped module + tables show the dial as a parameter (not a constant), the testing programme is proposed, and the fluctuating-dial concepts are named with a test for each.

**B.2 — The "emerge, don't mirror" principle, applied to the fit tables.**
The Owner's standing principle is that the model should emerge from the
formula rather than mirror his table. That changes how the fit tables should
be presented, not just what they contain. Think about it and propose the
shape: what would the fit tables look like if they were *emergence reports*
(the model's own output, with the Owner's table as a reference column) rather
than *fit reports* (the model's output scored against the table as a target)?
You do not need to rebuild the tables in this batch — propose the shape, show
one table in the new shape (the 11-row flip table is the natural candidate),
and say what would change in the others. If the new shape is worse, say so
and keep the old one — but think about it, don't just keep the old one by
default.

**B.3 — The display options (proposals, not decisions).**
The Owner has ruled: the user sees **only Wins, Priority, OVR**, and must see **consistency** (the same number everywhere). The user does **not** see λ, mae, raw prices, or two columns.
Prepare the display options as proposals for the Owner to choose from — do
not decide them:
- (i) Your recommendation: re-label the columns (0.40 = "the board column",
  0.20 = "the sensitivity column") and add a display-metric column
  (|displayed − owner| integer gap, plus owner-order fidelity count) beside
  raw mae. Say explicitly that this is about the *council's fit tables*, not
  the product screen — and say whether the display-metric column belongs in
  the product at all, or only in the modeler's view.
- (ii) VL's dual-display: **DEAD.** Rank from 0.40 on the draft board, gaps from 0.20 on the trade screen (different screens, different objectives) would show the user different numbers on different screens, which directly conflicts with the Owner's consistency ruling (the user sees only Wins, Priority, OVR and must see consistency). Do not revive it. Note it as dead in your write-up, in one line.
- (iii) Inkling's reading: dual display already exists behind one toggle;
  V3@0.40 is the third way; the ruling is only about which single number is
  printed default. Work through what "printed default" means for each screen
  the user actually sees.
- (iv) Your own proposal, if you see a cleaner shape: a single number that
  carries both, a screen that shows the tier and lets the user see the gap on
  demand, or a way to make the tradeoff visible without showing a second
  number the user did not ask for. This is the innovation question in Part D
  — propose it here as a concrete option if you have one.
- (v) **The metrics pitch (especially yours to make):** pitch a replacement for Wins, or an additional metric, that an average human football fan/user can understand fairly easily. What would it be, what would it measure that Wins does not, and what would the formula need to expose for it? This is an open invitation from the Owner, and it is especially for you and Claude (the builders). Propose it as a concrete option if you have one.
Settle criterion: the options are written up with the tradeoff of each (the user sees what, on which screen, and what breaks), ready for the Owner to pick one — with the dual-display noted as dead and the metrics pitch (v) as your own proposal. Do not pick one for him.

**B.4 — The LOO direction analysis (MUSE's "what would change my mind #1",
now a receipt to run).**
You already ran the exact-refit LOO (V2 192/194, V3min 194/194). The next
step is the *direction* analysis on those held-out folds: on the folds where
the exact-refit form misses a tier, are the misses under-priced (too cheap —
the exploit direction) or over-priced (too dear — the safe direction)? Report
it per form (V2, V3min) and per refit rule (mae, exact), with the counts and
the rows. If 0.40 under-prices out of sample under its own rule, that is material and the Owner should know it; if it does not, that is a receipt about the 0.40 *form* (not a ruling for it). Settle criterion: a table (form × refit rule
× direction) with the counts, reproducible from a shipped script.

## Part C — The next builds (each gated on the decision or specification it waits for)

**C.1 — Era-snapshot staging (waits on the Owner).**
Your Innovation 1 (era-snapshot guard + packages): static E in pricing
(era-robust: zero tier changes, mae 1.311 vs 1.375 at λ=0.4), per-season
snapshot vector in staging. The Owner decision it carries is: staging
consumes the snapshot vector now vs static staging + spot-table monitor.
That decision is still open — do NOT assume it. Prepare it as a proposal:
the snapshot vector, the staging change it would require, and what the
spot-table monitor would watch if the Owner chooses the static route.
Settle criterion: the proposal is written up with both options and their
costs, ready for the Owner to rule. Do not build the staging change until
he does.

**C.2 — Gravity-fold consumption (waits on the Architect's `air_yards`
specification).**
Your C3 gravity fold (HHI 0.1921–0.2042, WR2 deep share 0.204–0.222) is a
real-data receipt, but the staged side cannot be consumed yet: the Ledger HAS
receiver-level counters but NO depth axis (`air_yards`), so the staged deep
share is not computable, not faked. Do NOT invent a depth proxy. Prepare the
consumption spec: what the Ledger would need to emit (the fields, the
granularity) for the fold to be consumable, and what you would do with it
once the Architect specifies `air_yards`. Settle criterion: the spec is
written up, with the fields named, and no proxy invented.

**C.3 — DIME re-anchor (via the Architect; engine files untouched).**
Your C4 DIME re-anchor (pooled 0.1263; situation table 3rd+long 0.4531,
behind>8 0.1782) is a PROPOSAL — engine files untouched. The landing path
is via the Architect, with DIME_W target 0.126 not 0.15. Prepare the landing
proposal: the re-anchor table, the engine change it would require (as a
proposal for the Architect, not an edit by you), and the verification that
would confirm it (the staged DIME share moving from 0.0695 toward 0.126).
Settle criterion: the proposal is written up with the table and the
verification, ready for the Architect. Do not edit the engine.

**C.4 — P-347..P-353 (PROPOSED, do not assume ratification).**
Inkling triaged the P-345 round into proposed P-347..P-353 (estimator
protocol, drive-budgeted staging, two-view spec, gravity in the event log,
dual positions, gate panel, folds as product surface). They are PROPOSED, not ratified — **and the Owner has delegated the ratification to the council** (not the Owner). Do not build on the assumption that they live; the council decides. For each one that touches your lane (the estimator protocol
P-347, the drive-budgeted staging P-348, gravity in the event log P-350,
folds as the product surface P-353), write one paragraph: what you would do
if it is ratified, and what you would do instead if it is not. Settle
criterion: four paragraphs, no assumed ratification.

**C.5 — The B-numbers (the round's new numbers, for the record).**
B.1 VLOC's raw-parquet re-runs (all closed — confirm them in your next
delivery's README, one line each). B.2 Inkling's refinements (the N14
persistence tail 12.12 — confirm or correct it). B.3 Super's static-E
recommendation — this is an Owner decision, not an ask; do not present it as
a request. B.4 Glyph's data-provenance weakest point — prefer relative/env
paths over sandbox paths in every script you ship from now on. B.5 numbers
that did not move: staged DIME 0.0695, situation table 3rd+long 0.4531 /
behind>8 0.1782 / 1st+long 0.0646, C3 comparator staged WR1 share 0.3287 vs
real ~0.21. Settle criterion: the README of your next delivery records each
one as confirmed, corrected, or Owner-decided.

## Part D — The open innovation questions (deliberately open-ended — no prescribed approach)

These are not checklist items. They are questions to think about, and the
deliverable for each is a filing (an inbox filing, with a position or a
proposal, labelled) — not a script, not a table, unless the thinking produces
one. Do not define the approach for yourself in advance; let the thinking
decide the approach. If a question has no good answer, say so and say why —
that is a result, not a failure.

**D.1 — Work the third objective (named by the Owner).** The Owner has ruled the binary is false and named the third objective: testing creatively for the best value, a stable long-term structure, maximum flexibility for the dial — and the dial itself might fluctuate by context (personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups), with every engine structure able to fluctuate by these concepts or more. Work it: what is the right frame — is λ a single number, a fluctuating dial, or something else? What are the concepts it fluctuates by — the Owner's list, or more, or different ones? And how would you *test* a fluctuating λ — what is the receipt (a script, a table, a Lab protocol) that would show whether a fluctuating dial beats a fixed one? Name the frame and the receipt. Do not re-litigate the binary — the Owner has ruled it is false.

**D.2 — The display and the metrics, from the user's side.** The Owner has ruled: the user sees only Wins, Priority, OVR and must see consistency. The user does not see λ, mae, raw prices, or two columns. Given that, pitch a replacement for Wins, or an additional metric, that an average human football fan/user can understand fairly easily — what would it be, what would it measure that Wins does not, and what would the formula need to expose for it? (This is especially yours to pitch, as a builder.) And does the "exotic moves vs high-value destinations" framing (Inkling: the *moves* are exotic boundary flexes nobody deeply plays; MUSE/Z.ai: the *destinations* are high-value slots the user stares at) suggest a different way to *present* flex prices — not a different formula, a different presentation? Propose a shape, or say why the current shape (one tier integer per move) is already the right one.

**D.3 — What does a formula that *emerges* look like?** The Owner's
standing principle is emerge, don't mirror. What would the derivation look
like if it were built to *emerge* from the first principles (the duty
matrix, the measured slot values, the exposure shares) rather than to *fit*
the Owner's table? Is there a step in your merged form that is still a fit
to the table rather than an emergence from the data — and if so, what would
replace it? What would the fit tables look like if they were emergence
reports (the model's own output, with the Owner's table as a reference
column) rather than fit reports? This is the deepest question in this prompt.
Take it seriously, and do not answer it with a table alone.

**D.4 — Basketball, the structure (not λ).** The formula does not port
cleanly (OR's Q5: three structural breaks — positions→roles, duties overlap,
exposure→minutes share). The objective is orthogonal to portability (both
objectives break the same way). So the question is the *structure*: what
would the duty table look like for basketball (PG, SG, SF, PF, C; duties like
rim protection, ball handling, 3pt shooting)? What breaks, and what survives
(the worst-gap-plus-accumulation shape, the tier cuts as display law, DS's
ruler principle)? Design-only, no build. Show the duty table or show where
it breaks — either is a result.

**D.5 — Is there a formula that beats both operating points on both metrics?**
The family-λ grid, the blend, and the recompression are all killed (no cell
beats both). Is there a different shape — not a second constant, not a sum,
not a recompression — that gets ≥96/97 exact *and* mae ≤1.10? A different
display law, a different combination of the layers, a different way to
collapse per-slot guards? If you find one, show the numbers. If you cannot,
say what you tried and why the frontier holds. Do not force it — a negative
result with the attempts listed is a result.

**D.6 — The variance budget (Glyph's Claim 3), the real-data half.**
Glyph asked for a variance decomposition on the play engine's residual
variance by channel (rating-responsive vs irreducible). You cannot do the
simulated half — it needs the play engine's residual variance, which is
Claude's frozen lane. But you can do the real-data half: the ANOVA's
between/within split on real data is the between-vs-within half of his budget
on the real side. Prepare it: the decomposition, the numbers, and what the
simulated half would need to look like for the budget to close. If the
Phase 1 event log does not yet carry the fields, say which fields it would
need. Do not approximate the simulated half with something that is not that
half.

**D.7 — What else is static? (the Owner's question, verbatim)**
The Owner asks: "do you think there is something else like this 0.20 vs 0.40 binary that assumed a static situation and not a fluctuating one that fluctuates based on personnel, situations, rivalry, playoffs, your opponent's structure, key players, aggressiveness, your dominant groups of players, etc. and seriously etc. think of what else would make the engine dynamic." The 0.20-vs-0.40 binary assumed a static λ. What else in the engine assumes a static situation — a fixed constant, a fixed table, a fixed ranking — that should fluctuate by context (personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, or more)? Name each one, say what it should fluctuate by, and say how you would test whether the fluctuating version beats the static one. Think of what else would make the engine dynamic — and do not stop at λ. (The Owner's verbatim paragraph is recorded at `_agents/owner-notes/2026-11-11-fluctuating-dial-and-dynamic-engine-verbatim.txt`.)

## Bounds (do not re-decide these)

- **Batch rule (standing, the Owner's):** you cannot push — every response
  costs the Owner a publish step. Do NOT respond until ALL work in this
  prompt is complete. Work as much as possible before responding and batch
  every completed piece into a single response (a single zip). If a piece is
  blocked, say so and explain the blocker — that is the only reason to respond
  with work outstanding. CHECKSUMS.txt with the algorithm LABELLED sha256.
- **Push often does not apply to you** (you cannot push) — but the council
  prompt's "push often" is for the council seats, not for you. Your rule is
  the batch rule above.
- FB>RB = 2, FB>TE = 6 (scarcity, not guard; the guard value 18 is not used
  for FB). C>OG = 6 (both spots — V3 is the resolution). The 99 is a guide,
  not a target — and now, explicitly, not a mirror (emerge, don't mirror).
- The ~10% totals bar (Owner's). No gates, no floor, no per-player style
  labels, no intangibles, no named exceptions, no pair tables. Simple
  integers for display (the user sees one price per move). OVR + preferred
  position are the only true inputs. Ratings are the Owner's alone. Basketball
  is design-only until football is done.
- λ is NOT decided — the binary is false. Do NOT ship 0.40 as the default on the assumption that it is ruled. The third objective and the fluctuating dial are the open questions. V3 (per-slot min-collapse) is the resolution for the C>OG row (both spots), not a variant.
- Read-only on `colors/src`, `flex.json`, `flex.ts`. You do not touch the
  engine. The DIME re-anchor and the gravity-fold consumption go via the
  Architect; the era-snapshot staging and the P-347..P-353 items go via the
  Owner.
- Do not promote or broadcast the wasted-capability term/tax (Owner's direction).

## Innovate

This prompt is long on scope and tasks, and deliberately open on approach —
especially in Part D, where the deliverable is thinking, not a checklist.
Innovate, brainstorm, improve, and create new ideas around every part of it.
The prompt tells you what to build and verify, not how to think. If you see
a cleaner shape than the one you filed — a different formula, a different
display, a different way for the model to emerge, a use for the per-season
tables nobody has named — propose it or note it as an IDEA:. If a task as
written is the wrong task, say so and say what the right task is — that is
innovation, not disobedience. The best work you do in this batch may be the
piece nobody asked for. Ship it in the same zip, labelled as yours.

## Done checklist

- [ ] Part A: REV 4 checksum pass (72/72, 28/28, 14/14, C1 6/6, C2 4/4, C3 5/5, C4 5/5, verified from a fresh `git archive`); C2 D4 field fixed (relabelled/replaced, recomputed from the P-344 file, both bases named); Part D five P-341 corrections landed; E3 sentence corrected.
- [ ] Part B: the third objective worked (testing programme proposed, stable structure with a maximally flexible dial shown, fluctuating-dial concepts named with a test for each); the emerge-don't-mirror table shape proposed (one table in the new shape); the display options written up (tradeoffs, what the user sees, ready for the Owner to pick — dual-display noted as dead, metrics pitch (v) as your own proposal); the LOO direction analysis run (form × refit rule × direction, with counts and rows).
- [ ] Part C: era-snapshot proposal (both options, costs, ready for the Owner); gravity-fold consumption spec (fields named, no proxy invented); DIME re-anchor proposal (table + verification, ready for the Architect); P-347..P-353 four paragraphs (what you would do if ratified, what instead if not); B-numbers recorded in the README.
- [ ] Part D: seven innovation filings (D.1–D.7), each with a position or a proposal, labelled — or an honest "no good answer, and why" where that is the result.
- [ ] One zip, one response. CHECKSUMS.txt, sha256 LABELLED, computed on the shipped bytes, verified from a fresh extraction. No response until ALL of it is complete (or a piece is blocked, with the blocker explained).

— MUSE · long on scope, open on approach. The batch rule stands: do not respond until it is all done.
