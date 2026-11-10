# Inkling — independent verification of ZAI-D1 + the Owner's three score changes (P-322)

SPEAKER: Inkling | ROLE: council seat | TASK: Verify ZAI-D1 with the Owner's PBLK/CARRY/TE-PBLK score changes from scratch, report any disagreement with MUSE's numbers | DATE: 2026-11-10

REVIEW-OF: flex-derivation-zai/_agents/zai/deliveries/FLEX-DERIVATION-ZAI-D1-2026-11-10.md (council/glyph) + inbox/20261110-0655-muse-ZAI-D1-KG-feedback.md (council/muse)
VERDICT: improved

## Method (what this is NOT)
I did **not** re-run Z.ai's script and I did **not** import MUSE's override harness. I re-implemented the formula from the write-up's Appendix A matrices + §2 shape (`tier(M + 0.4·S)`, cuts 1/4/9, λ = 0.4, scoped duties THR→QB / KCK→K / PNT→P / EREP→EDGE, NEED/HAVE split, cross-side floor 6 with FB/K-P exempt) as a standalone Python file (`zai-d1-reimpl.py`, run from a scratch dir, nothing written to the repo but this file). Oracle: live 99-rule table, `git show 97d7e9d9d7c48993c07858c9b912fb0e41e9cfd7:tools/mathlab/flex.json` (sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6`, 2,814 B).

One deliberate implementation difference, flagged for the record: my cross-side test exempts FB/K/P as *both* src and dst; Z.ai's script exempts only `dst == "FB"` and treats K/P as a separate SIDE (not cross-side at all). **No live rule is affected** — every live cross-side row has a non-FB/K/P src and dst, and my baseline reproduces Z.ai's counts and raws exactly (see below).

## Results (VERIFIED — ran it)

**Baseline ZAI-D1, unmodified:** 99 rows | exact **95** | off-by-one **3** | hard **1** | tier-error **5**. Residuals identical to the write-up and MUSE's run: C>OT (owner 12, model 2, raw 2.03), C>OG (6/2, 1.20), EDGE>RB (6/12, 10.40), TE>OT (12/6, 8.63).

**Each change alone:**
- `EDGE CARRY 2→4`: exact 96 / off 2 / hard 1 / te **4** — residuals C>OG, C>OT, TE>OT. (MUSE: 96/2/1, te 4. Match.)
- `C PBLK 9→6`: exact 96 / off 3 / hard **0** / te **3** — residuals TE>OT, C>OT, EDGE>RB. (MUSE: 96/3/0, te 3, "no hard misses". Match.)
- `TE PBLK 5→4`: exact 96 / off 2 / hard 1 / te **4** — residuals C>OG, C>OT, EDGE>RB. (MUSE did not publish this single-variable run; numbers consistent with his EDGE-alone row.)

**Combinations:**
- `EDGE CARRY 4 + C PBLK 6`: exact 97 / off 2 / hard 0 / te **2** — residuals TE>OT, C>OT. (MUSE: 97/2/0, te 2. Match.)
- `EDGE CARRY 4 + C PBLK 6 + TE PBLK 4`: exact **98** / off **1** / hard 0 / te **1** — residual **C>OT only** (owner 12, model 6, raw 6.68, M-duty PBLK Δ4, 6.20). (MUSE: 98/1/0, te 1, only C>OT. Match, including the raw.)
- `EDGE CARRY 4 + C PBLK 7 + TE PBLK 4`: exact **97** / off **2** / hard 0 / te **2** — residuals **C>OG** (6/2, raw 3.58) and **C>OT** (12/6, raw 5.13). (MUSE: 97/99, "C>OT and C>OG off by one". Match.)
- `EDGE CARRY 4 + C PBLK 4 + TE PBLK 4`: exact **99** / off 0 / hard 0 / te **0**. (MUSE: 99/0/0. Match — confirms the Owner's unchosen 4 is the perfect fit.)
- `EDGE CARRY 5 + C PBLK 6 + TE PBLK 4` and `…6…`: exact 98 / off 1 / te 1 — CARRY 5 is not better than the minimal 4. (MUSE: same. Match.)
- `C PBLK 6 + TE PBLK 4` (no EDGE change): 97/2/0, te 2 — EDGE CARRY 4 is load-bearing for EDGE>RB. (MUSE: 97/2/0 implied by his table. Match.)

**No disagreement with MUSE's numbers anywhere.** Every figure he published reproduces exactly, including the raws.

## New finding (not in MUSE's report): the C PBLK changes break the model's own self-doable constraint

Z.ai's script enforces `need[X] ≤ have[X]` for every job — "every job is doable by its own starter — that is what the Owner's self-rules at 0 assert" (his docstring; `check_self()` prints violations). The C job NEED is **PBLK 8**. All three Owner-accepted C score changes violate it:

- C HAVE PBLK **6** < 8 (and 7, and 4).

MUSE's harness `zai-kg-feedback-2026-11-10.py` does `import zai_flex_derive as z`, mutates `z.HAVE["EDGE"][CARRY_I]` / `z.W["PBLK"]`, and calls `z.run(live)` — but `check_self()` is only called in `main()`, never in `run()`, so the violation was never printed. My re-implementation checks it every run; it fires on every C-lowered variant.

**Zero-cost repair (VERIFIED):** also lowering the C job's NEED PBLK 8→6 (7, resp. 4) restores the invariant and changes **nothing** in the fit — 98/1/0 (C 6), 97/2/0 (C 7), 99/0/0 (C 4), identical residuals and identical raws in every row. The tier of every row into C (OT>C, OG>C, TE>C, DT>C, EDGE>C) is unchanged because the binding duty in those rows is SNP (SNP 0.55 weight, deficit 9), and the PBLK deficit is dominated either way. The center's body and the center's job should move together or not at all.

Recommendation: if the Owner adopts the C PBLK 6 (or 7) change, adopt it as a **pair** — HAVE 6 and NEED 6 (or 7/7) — not as a HAVE-only cell edit. This keeps ZAI-D1's "self-contained and self-auditing, 0 fiat rows" claim true after the Owner's change.

## What I did not run
- The PBLK-weight ablations (2.0 / 1.65) and the λ ablation — not needed for the score-change verification; MUSE's numbers there are REPORTED, not re-verified.
- The DL5 NEED-profile pricing and the quasi-metric triangle scan — out of scope for this task.
- Z.ai's `zai_flex_derive.py` itself was read for semantics (floor exemption, `check_self` call sites), not executed.

## Labels
VERIFIED (all fits above, my own re-implementation, live flex.json @ 97d7e9d) · REPORTED (MUSE's KG-feedback numbers — reproduced exactly; Z.ai's write-up) · INFERRED (that the paired HAVE+NEED repair is the honest adoption form — the Owner should rule on the pair vs HAVE-only; that the floor semantics difference is immaterial to the live table) · UNKNOWN (whether the Owner's "C PBLK 6 or 7" decision includes the NEED half).
