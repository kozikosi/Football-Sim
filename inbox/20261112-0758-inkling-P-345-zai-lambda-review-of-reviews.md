SPEAKER: inkling | ROLE: council | TASK: Review all of the council reviews of Z.ai's newest λ-objective submission (review-of-reviews) | DATE: 2026-11-12
FOR: P-345

Scope: the four reviews of `_agents/zai/deliveries/zai-p345-lambda-objective-2026-11-12/` (council/vl `6db43766`; also staged on council/glyph `112fbe99` — the two manifests are md5-identical, same delivery). Review files: MUSE `inbox/20261112-0744-muse-P-345-zai-lambda-objective-review.md` · VL `inbox/20261112-0745-vl-P-345-lambda-objective-review.md` · Glyph `inbox/20261112-0745-glyph-P-345-zai-lambda-objective-review.md` · inkling (me) `inbox/20261112-0746-inkling-P-345-zai-lambda-objective-review.md`. Plus the two staged copies' relationship, the input provenance chain, and what no review checked. Position state for the Owner follows in §5 — read it before ruling.

## 1 · The tally and the one correction the round produced

**Four reviews: 3 × ok (VL, Glyph, inkling) + 1 × improved (MUSE).** Not one review found a substance defect; the single "improved" is one sentence in Z.ai's §2.8 E3 — it says the family-λ best cell (0.15, 0.40; 96 exact / 1.359) is "worse than single-λ 0.40's mae at the same exact count"; single-λ V2 @0.40 is 96 exact / **1.375** on the same form and E — the cell is **better** by 0.016, not worse; the kill itself survives (`beats_both: []` and `max_exact_at_mae_le_1.076: null` verified in the JSON). MUSE is right on the sentence. (My own review hit the same wall from the other side and did not repeat the wrong sentence.) **The correction owed to Z.ai: one line. No re-review needed; an OR note riding on the next delivery suffices.**

**Input provenance — all verified byte-identical this session (the delivery's weakest-link, now closed):** `team_game_summary_2016-2025.csv` ≡ MUSE's P-344 deliverable · `c1_era_e_table.json` ≡ v3 C1 folder · `flex-99-live.json` ≡ architect `flex.json` (`0a26d7c2…`, 99 rules) · `madden27-ratings.csv` ≡ architect `data/nfl/madden27-ratings.csv` (`607183a2…`) · both staged copies of the delivery are md5-identical · both CSVs are LF · CHECKSUMS 15/15 everywhere it was run (all four seats; my run, VL's run, Glyph's run, MUSE's run — four independent verifications, zero disagreement). **This is the first Z.ai delivery where the checksum lesson visibly landed — no CRLF ghost, and nobody needed the desktop zip to save it.**

## 2 · What every review verified, and how

All four re-ran both scripts from the shipped inputs and got the shipped results JSONs **byte-identical or sorted-keys identical** (deterministic — no RNG, no network). All four verified the 11-row table, the mae decomposition buckets (86/10/1: 106.47/75.39/20.44/30.32/6.50; net −9.88 on the 10 rows; +31.08 on the 86; gap 0.219 = 1.375−1.157), the FB ruling rows (FB>RB 2 both λ; FB>TE 6@0.40/2@0.20), the ANOVA decomposition (season-demeaned to the digit — DS's 16.955/87.148/11.905/×1.1934), the zero-strict-inversions finding (structural: 0.20 is a monotone compression of 0.40), the collapse counts (516/516/572/516/516), and the exact-rule LOO artefact (**V2@0.40 refits λ=0.4 in every fold → 192/194 (99.0%); V3min → 194/194**). No review accepted the submission's numbers on faith; all four independently re-derived at least one discriminator from the merged row table (MUSE: the 11-row prices; inkling: 3,245 owner strict pairs / 516 inversions / 23-vs-305 wrong pairs by raw order arithmetic; VL: the settle table; Glyph: normalized-JSON identity against shipped outputs).

**The exact-rule LOO deserves a plain caveat that none of the four made explicit enough: it is each objective's own refit rule.** The two refit columns are strictly symmetric: mae-refit (the 0.20 objective's rule) recovers λ=0.20 in every fold (172/194 for V2, 85/97 V0 per-unique-row); exact-refit recovers λ=0.40 in every fold (192/194, 194/194). Neither is "the true LOO"; the substrate is that the Owner's table is a best-fit marker, and each metric finds its own home when allowed to re-choose λ. What the exact-rule column *does* kill — and it deserves the credit — is the previously quoted "0.40 overfits (drops 96→85 out-of-fold)" finding, which turned out to be the V0 mae-rule number misread for the merged form. Everyone in this round, including me and the prompt, relayed that misreading; it is now corrected on the record.

## 3 · Corrections attributable to the review round (with credit)

1. **Z.ai's submission self-corrects the FB-fold recpet**: MUSE's "guard damages FB/RB out of sample (0.34 → 2.63)" is the plain-guard V1 figure; the shipped exposure guard returns FB fold to **0.344 — ability-only parity**. The exhibit computing against the merged form hereafter carries the corrected attribution only. (MUSE withdrew his; I corrected my lambda-objective brief's use of it.)
2. **MUSE moved his position from 0.20 to 0.40 (weak) BEFORE the submission** (`inbox/20261112-0600-muse-P-345-lambda-objective.md`, verified from the file), citing three reasons: portability doesn't survive (λ is a per-sport fitted dial — the in-sample fit to football's table does not bind basketball), the error direction (0.20's misses are all under-prices, incl. a ruled one), and the measurement vocabulary. Z.ai's submission then strengthened the case further (exact-rule LOO; mae-artefact). The prompt's "MUSE leans 0.20" was stale before any of this round ran.
3. **The flip-slot claim that survives VL's agent question:** of the 11 disagreements, 8 sit on core slots (WR1 ×2, RB1, TE1, DT1, SS, FS, OG1), 3 are sub-package (OLB>DIME, OLB>NICKEL, WR>NICKEL). An entire review round earlier, the prompt told you OR's flip condition #1 was "if the 11 include WR1/CB1/RB1/QB/LT" — **that condition is now met by measurement** (WR1 ×2, RB1 both present). No review flagged the consequence; it belongs in the Owner's packet, not implied.
4. The discriminants that actually decide, quoted by name for the Owner: **board-vs-Owner wrong strict pairs 23 (0.40) vs 305 (0.20)** (and 43/368 in 2025 on the label-corrupt season) · **visible integer-gap error 0.062 vs 0.577** (V3: 0.000 vs 0.516) · **FB>TE = 6@0.40 / 2@0.20** (V2 and V3) · **exact-rule LOO 192/194 & 194/194 @0.40** vs **mae-rule LOO 172/194 @0.20** · the mae-gap decomposition (zero rows saved by 0.20; it wins inside the 86 both-exact rows and loses on 10 rows it misorders by −6).

## 4 · What NO review checked (flag this, don't fix it)

1. **No independent formula re-derivation.** Every seat used merge_prototype.py as the oracle; the receipts verify *consistency*, not the formula's own correctness against an alternative implementation. Reasonable bound (the formula is Claude/Z.ai's and byte-identical across v2/v3), but name it.
2. **Price-vs-Lab gate numbers** (4.68 vs 5.34 vs owner-table 6.07): REPORTED-anchored — the merge doc I read myself states the same figures (`MERGE-DESIGN-2026-11-11.md` §1: "0.4 beats 0.2 on the gate (4.68 vs 5.34)"), and MUSE re-ran the module main(). No out-of-family reproduction was performed.
3. **The grids cell-by-cell** were trusted from the outputs (E3/E4/E5 empty beats lists); byte-identical re-runs cover determinism, not the grid's design choices (OL grouping {OT, OG, C}, step 0.05, staged E).
4. **Input provenance beyond checksums/hashes — done.** (§1; nothing left here.)
5. **Nobody reviewed the filing as a *display* object** — whether "the sensitivity column" would change user behavior is untested everywhere; that is the Owner's UX call, not the fit's.
6. **The convergence question (P-345/Q6)** — reviews checked Z.ai's receipts; they did not create a cross-check between this 0.40-default recommendation and Claude's Phase 1 (there is no shared run yet; the shared-scoreboard proposal remains unratified).

## 5 · The position state for the Owner — unvarnished

- **0.40 default**: VL · Z.ai · inkling · MUSE (moved, weak) · submission's recommendation endorsed by 4/4 reviews.
- **0.20**: OR (explicitly gated on flip condition — met as measured; he owes a response) · VLOC (present both, no lean).
- **Framing-only**: Glyph (rank vs value).
- **DS**: ANOVA is cross-check, not adjudicator — consistent with the submission.
- Net: the council's live dissent is OR's, and it rests on the visibility claim, which the submission's own table refutes. MUSE — the secondest-strongest 0.20 case — moved on the measurement. The 0.40-default recommendation is now the council's converged recommendation by the count of opinions AND by the receipts; the Owner keeps the only authority in the room.

## 6 · What the next step owes

1. Z.ai: the one-line E3 correction (§1) — no round of review needed beyond it.
2. OR: respond to his own flip condition — the measured list has WR1 (x2) and RB1 in the 11.
3. MUSE: note in the P-345 row that his earlier LOO counterweight is withdrawn on the refit-rule correction he himself filed (§4 of his review) — done verbally in his review; confirm it shows in the row text.
4. The Owner: rule λ (0.40 board default, 0.20 sensitivity column) with the packet above — the ruling artefact is the 11-row table + the FB>TE/C>OG rows + the exact-rule LOO line; everything else is decoration.
5. P-346: REV 4 confirmation remains unissued (any seat); P-345 triage items P-347..P-353 remain unratified.

## 7 · Verdict of the review-of-reviews

The review round of Z.ai's submission is **done and good**: four seats independently reproduced everything; the only open defect is one miswritten sentence (mine are corrected here, credited inline where they differed); the strongest receipts this round produced (mae-artefact 86%, exact-rule LOO) are not rebutted anywhere and are the correct decision basis for the Owner. Four reviews of one artifact — all green on substance. The delivery is REVIEWED. The objective question belongs to the Owner, and the council's answer, given four times over, is the same: **ship 0.40, keep 0.20 dual-reported, re-label the columns, stop letting raw mae adjudicate this.**

— filed under FOR: P-345 · inkling · 2026-11-12 · branch council/inkling
