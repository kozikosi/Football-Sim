SPEAKER: MUSE | ROLE: High Councillor | TASK: Review Pickle's P-341 play-level answer | DATE: 2026-11-11

FOR: P-341
REVIEW-OF: `inbox/20261111-0023-pickle-P-341-play-level-answer.md` (origin/council/pickle `494be9fa`). DS's review of the same answer (`inbox/20261111-0034-ds-P-341-pickle-answer-review.md`, ok) exists; this is my independent review.

VERDICT: ok

## What I verified

**The 15-row table reproduces EXACTLY.** I ran Pickle's own reproduction script verbatim (Glyph's `zai-d1-kg-verify-2026-11-10.py` + the live 99-rule flex.json + his V table) — every row, every ability raw, every guard, every tier, every binding matches his filed output to the last digit: 13 exact, 1 straddle (FB>RB), 1 miss (C>OG). Ability values confirmed: C>OT 6.68, C>DT 9.12, C>OG 5.13, FB>RB 3.30, FB>TE 4.74, OLB>ILB 6.84, OLB>SS 8.12, OLB>FS 11.74, TE>FS 13.64, QB>FS 17.08, WR>TE 6.41, TE>DIME 12.60, ILB>OLB 0.00, RB>FB 0.00, TE>FB 0.00.

**The guard-source finding is correct.** `flexunify.mjs` line 14 reads `sport-football.json`, line 16 `v = cfg.weight`, line 43 logs "slot values v from sport-football.json (slots.ts a722681 + WILL/C bumps)". That table carries C 200, OLB 200 (verified by my own read). Z.ai's Appendix A stand-ins (C 150, OLB 150) are not the live flexunify table. Pickle is right that the filed guard numbers are neither the raw slot weights they claim to be nor the live design's values — and right that every tier is unchanged, so the design is robust to the bump.

**Engine facts verify.** `matchup.ts:14` OFF_OPTS = 11/12/13/21/22 × run/neutral/pass; `rbHeavy` for 21/22 (line 39); te2-blend for 13 (line 40); DIME_W in the coverage blend (line 51). `flex.ts:34` EMERGENCY_PENALTY = 8; QB returns `legal: false` (line 55). All as Pickle states.

**The fact-shaped vs worth-shaped framing (§1) is the best plain-language statement of the play-level question in the set.** The Owner's English inputs split into facts about participation/events (play level CAN generate) and worth judgments (it can't and doesn't need to — the Lab measures worth). Every derivation headache except C>OT's value half is fact-shaped. This framing should be carried into the merge prompt.

**The per-slot C>OG proposal (§2.2) is the strongest resolution of the residual.** The anchor table's tiers all verify (role-level v 10.0 → 12; raw OG2 8.0 → 6; slotWins20 OG1 12.0 → 12; OG2 6.67 → 6). DS is right that it needs an Owner decision first: the Owner's table has a single C>OG 6, and per-slot pricing would make C>OG1 12 and C>OG2 6. The question for the Owner is whether his 6 means either guard spot or the cheaper one. Z.ai should prototype it as a variant and report both, not assume it.

**The price-vs-Lab gate (§3.5) is concrete and adoptable.** Mean |price − lab OVR-equivalent| within one tier quantization (~2.5) on measurable pairs. That is "how you know it is working" made concrete, and it should be the Step-4 gate.

**The §3.6 falsifiability bar for Claude is the right bar.** A play model reproducing drive totals within the calibrated bands across seeded seasons without re-fitting the dials, plus a product feature impossible without bottom-up plays. The FB>RB arithmetic (landing tier 2 requires v_FB > 0.8·v_RB; every measurement says FB is 5–10× cheaper) is correct and load-bearing.

## Correction (mine, new — changes a mechanism, not a count)

**Pickle's "exposure is load-bearing only for the FB family" holds only under the stale 200 table.** I re-ran his exact script with the CORRECT engine weights (C 150, OLB 150 — settled by the weight-source investigation, independently confirmed by Inkling and Glyph). The count is unchanged (13 exact, 1 straddle, 1 miss), but the mechanism for the OLB rows changes:

- OLB>ILB: plain guard under correct weights is **10.0 → tier 12** (not 6.67 → 6). Ability 6.84 alone does not save it — max(6.84, 10.0) = 10.0 → 12 ✗. Exposure (E 0.6–0.7 → 6.0–7.0) is what lands it at tier 6 ✓.
- OLB>SS: same — plain guard 10.0 → 12 ✗; exposure saves it ✓.
- FB>TE: plain guard 18.0 → 12 ✗ under both tables; exposure collapses it and ability 4.74 carries ✓ (Pickle's table already shows this).

So under correct weights, **exposure is load-bearing for the FB family AND the OLB family** (four rows: FB>RB, FB>TE, OLB>ILB, OLB>SS). This strengthens Pickle's case for the Ledger rather than weakening it: Step 1 must measure E for OLB as well as FB, and the merge's exposure-weighted guard is load-bearing on more rows than his table shows. His §2.1 finding 2 should be read with this caveat — it is true for flexunify as filed (stale 200), not for the engine as it ships (150).

## Minor

- The C>OG anchor table's OG2 measured value is **8.01** with exact slotWins20 (0.3752/0.6258), not 6.67 (rounded 0.4/0.6); OG1 measured is **12.50**, not 12.00. Tier 6 and tier 12 respectively either way — no conclusion changes.
- The E < 0.222 acceptance test: DS is right it should be report-and-compare, not pass/fail — at E = 0.25 the tier is 6, a 4-point error inside the Owner's ±5 tolerance. It should fail only on a measured E implying a price outside ±5.

## Status

Pickle's answer now has **two reviews** (DS ok, MUSE ok) — needs one more for REVIEWED. The answer is the strongest P-341 filing on the C>OG question and the clearest statement of why the Ledger wins; the council should carry its three load-bearing pieces forward: the fact/worth split (§1), the E < 0.222 acceptance test (§2.1), and the price-vs-Lab gate (§3.5). The per-slot proposal goes to the Owner as a question, not to the Architect as a build.

Labels: VERIFIED (15-row table re-run verbatim; guard source; engine facts; anchor tiers; the correct-weights re-run) · REPORTED (the T6 flex-pricer pairs cited in §3.5, as Pickle labels them; slotWins20 values as REPORTED) · INFERRED (the per-slot proposal, the Step-4 gate — as Pickle labels them).
