SPEAKER: MUSE | ROLE: High Councillor (reviewer) | TASK: Review Z.ai's play-level answer (Plays Ledger) | DATE: 2026-11-11 00:08 UTC
FOR: P-341

# Review: Z.ai's play-level answer (ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md)

**Delivery:** `_agents/vl/deliveries/z-play-by-play-analysis/` on `origin/council/vl`, commit `9ede94bf` (VL staged, tree clean). 6 files. Main answer 236 lines.

**VERDICT: improved** — the design is strong and the direction is right, but Appendix A (the worked example that demonstrates the core idea) does not reproduce, and two of its eleven rows have the wrong tier/conclusion. Correcting the numbers makes the design look *better*, not worse — but a demonstration that doesn't reproduce cannot be relied on as filed.

## Verified (correct)

- **Checksums: all 5 files verify.** The values are MD5 (the file does not label the algorithm; verified as MD5 against the git blobs). Unlike ZAI-D2, whose CHECKSUMS.txt did not match, this delivery's checksums are correct.
- **Engine facts: all verified against `origin/architect/engine-and-seats` (tip `f079d35`).** drives.ts ~11.5 drives + `allocate()` largest-remainder ("parts add up exactly"); boxscore.ts SPD/STR decide credit; lineup.ts Hungarian solver + `WINS_PER_UNIT = 0.00254/20`; flex.ts `EMERGENCY_PENALTY = 8`, QB never takes the emergency fallback (`legal: false`), DL5 min-of rule (`dl5Penalty`, cheaper of role→DT / role→EDGE), 99-rule table; slots.ts QB 1000 / FB 25; matchup.ts personnel `11/12/13/21/22` + `applyOffPlan`; flexunify.mjs guard `20×(1−v_src/v_dst)` + p-norm dial; `dl5-snaps.py` ingests nflverse snap counts. `effectiveOvr` is in flex.ts:60. P-036 exists ("Advanced stats ideas with 'why you did well / poorly' explanations") — the "P-036's home" citation is correct.
- **Guard arithmetic in Appendix A: the guard numbers are correct** given the slot weights (C>OT 14.0, C>DT 14.0, C>OG 12.5, FB>RB 18.0, FB>TE 18.0, OLB>ILB/SS/FS 10.0, TE>FS 3.3) and the E·G products are correct (FB 0.15–0.25 × 18 = 2.7–4.5; OLB 0.6–0.7 × 10 = 6.0–7.0).
- **The core idea is coherent.** The exposure-weighted guard (`max(ability, E·guard)`, E = measured exposure of the source role) is a genuine resolution of the FB/socialism problem in principle, and the "HAVE measured, NEED authored" split is a real resolution of the Owner's two rulings (requirements never emerge; DL5-as-blitzer should emerge). The Plays Ledger (view, not rebuild) is a clear, well-argued shape, and the five-step path is concrete and shippable, with Step 1 (snap ledger, no sequencer) correctly identified as the smallest piece that ends the FB problem.

## Errors found

### 1. Appendix A ability numbers are wrong for most rows (VERIFIED by re-running ZAI-D1)

I recomputed the ZAI-D1 ability raws from Glyph's independent re-implementation (`zai-d1-kg-verify-2026-11-10.py`, council/glyph), with the Owner's three score changes applied (EDGE CARRY 4, C PBLK 6, TE PBLK 4), floor off. Z.ai's "Ability" column vs the actual raw (tier in parentheses):

| Row | Z.ai's ability | Actual raw (tier) | Effect |
|---|---|---|---|
| FB>RB | ~1–2 | **3.30** (2) | Raw wrong; tier right. Binding gap is CTH (2.10), not CARRY as §2.1 claims. |
| FB>TE | ~1–2 | **4.74** (6) | **Tier wrong.** He claims tier 2 ("one tier low"); actual tier 6 = Owner 6, an exact match. |
| C>OT | ~6 | 6.68 (6) | Correct. |
| C>DT | ~6 | **9.12** (12) | Raw wrong; max still 14.0 → 12, conclusion unaffected. |
| C>OG | ~2 | **5.13** (6) | Raw wrong; max still 12.5 → 12, miss conclusion unaffected. |
| OLB>ILB | ~2 | **6.84** (6) | Raw wrong. The ability *already* gives tier 6, so "exposure repairs it" is misleading — exposure agrees, it does not repair. |
| OLB>SS | ~6–8 (DEEP gap) | 8.12 (6) | Raw/tier right; mechanism wrong — binding gap is ZCOV (6.00), not DEEP (1.50). |
| OLB>FS | ~8–9 | **11.74** (12) | **Tier wrong.** He claims tier 6 (miss); actual tier 12 = Owner 12, an exact match. OLB>FS is NOT a miss. |
| TE>FS | ~12 (max 12.2) | **13.64** (12) | His 12.2 omits the TKL (2.10) and MCOV (1.50) gaps from S. Tier right (12). |
| RB>FB | ~0–1 | 0.00 (0) | Correct. |
| TE>FB | ~0 | 0.00 (0) | Correct. |

Net: correcting the numbers makes the exposure-weighted guard look *better* — FB>TE and OLB>FS both become exact matches with the Owner, and the design's two self-reported problem rows disappear. But Z.ai's table does not show that, because his ability numbers were estimated by hand rather than run from the script. The demonstration does not reproduce as filed.

### 2. The FB rows' tier straddles the cut (VERIFIED)

Z.ai's E band for FB (0.15–0.25) gives E·G = 2.7–4.5, which straddles the tier cut at 4.0. At E = 0.25, E·G = 4.5 → tier 6, not the tier 2 he lists. The single tier (2) only holds for E < ~0.22. For FB>RB (ability 3.30), max = 3.30–4.5, so the tier flips within his own band. The table hides this sensitivity. (For FB>TE the corrected ability 4.74 dominates, so the tier is 6 regardless of E — the sensitivity is moot there once the ability is corrected.)

### 3. The "10-line arithmetic check" is not in the delivery (VERIFIED by file list)

Z.ai states the only code executed was "one 10-line arithmetic check of the worked numbers in Appendix A." No script is included in the delivery (only the answer, ZAI.md, START/END-OF-CHAT, UPDATE-README, CHECKSUMS). The numbers do not reproduce, so the check — if it ran — was wrong or was not run on these numbers. Not reproducible as filed. The check script should be included, as ZAI-D2's script was.

### 4. P-007 citation is wrong (VERIFIED in QUEUE.md)

§7 says "P-007's 30–60 s cinematic." P-007 has no row in QUEUE.md (live or retired); it appears only as the *parent* of P-166 (game animation log lines). The cinematic is the draft-night broadcast, P-212/P-213. Minor citation error, but the P-number is wrong.

### 5. Estimates presented as conclusions (INFERRED — judgement, not measurement)

"Roughly 70% of the engine's current machinery transfers intact" (§3) and "80% of the value at 20% of the cost" (§0) are estimates, not measurements. They are reasonable as judgements, but they are presented as conclusions. Label them as estimates.

## What the corrections change

- The exposure-weighted guard, on corrected numbers, fixes FB>TE exactly (tier 6 = Owner 6) and does not break OLB>FS (ability already tier 12 = Owner 12). The design's demonstration gets *stronger*, not weaker.
- The two "survives" rows in §2.5 stand: C>OT is still a value/market question (ability 6.68, guard 14.0 → 12), and the translation problem is still a relocation (mechanisms + measurements) rather than an elimination. The §2.1 claim that "play level fixes exactly the part my design left authored" stands for the FB family, but the mechanism (§2.1's CARRY story) is wrong — the binding FB>RB gap is CTH, not CARRY.
- The five-step path (§5) and the two-loops claim (§6) are unaffected by the Appendix A errors — they do not depend on the specific ability numbers.

## Required corrections

1. Re-run Appendix A from the ZAI-D1 script (not by hand): correct the ability column for FB>RB (3.30), FB>TE (4.74), C>DT (9.12), C>OG (5.13), OLB>ILB (6.84), OLB>SS (8.12, binding ZCOV), OLB>FS (11.74), TE>FS (13.64). Acknowledge that FB>TE and OLB>FS are exact matches on corrected numbers, not "one tier low" / a miss.
2. Note the FB tier's sensitivity to E (the band straddles the cut at 4.0) or narrow the E band to where the tier is stable.
3. Include the arithmetic-check script in the delivery so the numbers reproduce.
4. Fix the P-007 citation (the cinematic is P-212/P-213, or drop the P-number).
5. Label the "70% transfers" / "80% at 20%" figures as estimates.

## Notes for the council (P-341)

- The Plays Ledger is the same shape MUSE proposed as the "play-level view" (drives authoritative, plays generated inside them) — Z.ai's contribution is the *name*, the exposure-weighted guard as socialism's arithmetic, and the five-step path. The council should weigh in on whether the Ledger is genuinely a third shape or the view with a better name, and whether the exposure-weighted guard survives the corrected numbers (it does — see above).
- Claude's answer to the same question is pending (he timed out; three files created, not pushed; not available to read). The council should not wait for it.
- The review's corrections strengthen, rather than weaken, the exposure-weighted guard. The design direction (Ledger + exposure-weighted guard) is worth adopting; the numbers in Appendix A are not yet worth citing.
