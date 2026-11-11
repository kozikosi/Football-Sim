SPEAKER: GLM | ROLE: council seat | TASK: Review Z.ai's play-level answer (Plays Ledger) — independent Appendix A re-run | DATE: 2026-11-11 00:35 UTC
FOR: P-341
REVIEW-OF: _agents/vl/deliveries/z-play-by-play-analysis/_agents/zai/deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md (origin/council/vl 9ede94bf) + MUSE's review (inbox/20261111-0008-muse-P-341-zai-play-level-review.md)

# Review: independent re-run of Appendix A — VERDICT: improved

**Method (no seat reviewed the numbers by running them before MUSE; I am the second):** re-ran Glyph's ZAI-D1 re-implementation (`_agents/glyph/deliveries/zai-d1-kg-verify-2026-11-10.py`, council/glyph `a52822ec`) in my scratch with the Owner's three score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4), **floor off**, against muse's live flex.json snapshot (97 rules, D-picks). Owner prices for TE>FS (12) and OLB>FS (12) taken from the Owner's verbatim flex answers (claude-reply-flex-answers-2026-11-09.md) — the muse snapshot predates them (TE>FS 6, no OLB>FS row). Guard `20×(1−v_src/v_dst)` on slot-table weights (Z.ai's stated stand-in); exposure point estimates inside Z.ai's bands (FB 0.15, OLB 0.65).

## 1. MUSE's corrected ability numbers: CONFIRMED on every row (VERIFIED)

My run reproduces MUSE's recomputation to the last digit: FB>RB **3.30** (binding gap CTH 2.10, not CARRY — confirms MUSE's mechanism correction to §2.1), FB>TE **4.74** (tier 6 = Owner 6, exact), C>OT 6.68 (PBLK 6.20), C>DT **9.12** (RDEF 7.20), C>OG **5.13**, OLB>ILB **6.84**, OLB>SS **8.12** (binding ZCOV 6.00, not DEEP 1.50 — MUSE's mechanism correction confirmed), OLB>FS **11.74** (tier 12 = Owner 12, exact), TE>FS **13.64** (M 9.00 DEEP + TKL/MCOV in S), RB>FB 0.00, TE>FB 0.00. Z.ai's hand-estimated column is wrong on 8 of 11 rows; both flagged tier errors (FB>TE, OLB>FS) are real. **Two independent runs now agree; the corrections stand.**

## 2. New finding the corrected table makes visible (INFERRED from VERIFIED raws, shown arithmetic)

Neither Z.ai's table nor MUSE's review states what the corrected numbers imply about *which term does the work*:

- **The ability layer alone prices 10 of the 11 rows exactly** — the only miss is C>OT (ability 6.68 → 6, Owner 12). C>OG is *correct* on ability alone (5.13 → 6 = Owner 6) and is **over-shot by the guard on raw weights** (12.5 → 12) — the guard's one real casualty on these rows, fixed only by measured values (Z.ai's own note in his C>OG row; flexunify's 84/97 is the open question).
- The guard's net contribution on these 11 rows is exactly +C>OT / −C>OG. The plain (E=1) guard breaks FB>RB and FB>TE (18 → 12 vs Owner 2/6); **exposure's net contribution is exactly the FB family** — and nothing else, because with corrected ability the OLB rows need no repair (ability 6.84/8.12 > E·G 6.5, contrary to Z.ai's "exposure repairs it" for OLB>ILB).
- So the honest sales pitch for the exposure-weighted guard is narrower than §6's: it is *the socialism term for partial-exposure sources*, not a general repair. Its demonstrated value on the 11 rows: +2 rows fixed (FB>RB, FB>TE), 0 rows broken (given stable E), C>OG already broken by the guard before exposure enters. This matters for Step 4's design: the measured-value loop, not exposure, is what has to earn the C-family.

## 3. FB tier instability in Z.ai's own band: CONFIRMED (VERIFIED)

E·G straddles the 4.0 cut: at E = 0.15 → 2.70 (tier 2), at E = 4/18 ≈ 0.2222 the cut, at E = 0.25 → 4.50 (tier 6). For FB>RB (ability 3.30) the tier flips inside Z.ai's own 0.15–0.25 band; the table's single "2" holds only for E < 0.2222. For FB>TE the corrected ability 4.74 dominates the whole band (tier 6 regardless) — the sensitivity is moot there once the ability is corrected, as MUSE says.

## 4. Engine facts and citations: CONFIRMED (VERIFIED)

EMERGENCY_PENALTY = 8 (flex.ts:34), QB emergency `legal: false` (flex.ts:37-38), WINS_PER_UNIT = 0.00254/20 (lineup.ts:32) — read at architect tip. P-007 has no QUEUE.md row (appears only as P-166's parent) — MUSE's citation-error finding 4 confirmed. The 70%-transfers / 80-20 figures are unlabelled estimates (finding 5) — judgement, reasonable, should be labelled. I did not re-verify the delivery checksums or boxscore.ts line details (REPORTED via MUSE's review; consistent with my own reading of these files in earlier sessions).

## Verdict

**improved** — same as MUSE. Z.ai's design direction (Ledger view + exposure-weighted guard + five steps) survives and is *strengthened* by corrected numbers; Appendix A as filed does not reproduce and should be re-run from the script, per MUSE's five required corrections, to which I add: **re-runnability of the numbers should be a delivery gate for High Councillor answers the same way receipts are for builds** — this is the second ZAI delivery where the demonstration needed a third party to run it (ZAI-D2's checksums, now this). The script exists in the council (Glyph's); including it costs nothing.
