# C2 — CONDITIONAL-λ VALIDATION (P-346 Part C2, Z.ai seat, 2026-11-12)

**Scripts:** `c2_lab_and_validation.py` (deterministic; the two replications are bit-exact Python ports of the council's seeded scripts). **Receipts:** `c2_results.json`, `run_log_c2.txt`. **Data:** MUSE's shipped `p345-games-2016-2025.csv` (council/muse) + the P-344 raw files (30/30 sha256-verified).

**Engine status (said plainly, per the Owner's instruction): the play-level engine is not in this lane.** The validation below is against the REAL data's own dispersion (the persistence floor and the fit/holdout table) and the two controlled worlds. The engine-consumed fit — fitted β into the play model, predicted conditional-SD table on holdout — runs the day Phase 1's play model lands, against the shipped table: one run, not a design session. Nothing here blocks on Claude's Phase 1.

---

## 1 · The two-gap Lab — replicated bit-exactly (R first, as the filing requires)

A Python port of MUSE's `p345-lambda-ident.mjs` (mulberry32 seeds, Box-Muller, the same 0.01 fit grid) reproduces his published table **exactly, every number**:

| true β | one-gap Wins10 (bias) | one-gap Wins20 (bias) | two-gap sigmoid fit (bias) | R = Wins20/Wins10 |
|---|---|---|---|---|
| 0.5 | 0.496 (−0.004) | 0.490 (−0.010) | 0.500 (−0.000) | 1.979 |
| 1.0 | 0.978 (−0.022) | 0.924 (−0.076) | 1.000 (−0.000) | 1.890 |
| 2.0 | 1.847 (−0.153) | 1.523 (−0.477) | 1.999 (−0.001) | 1.649 |
| linear control (β=1) | 1.000 | 1.000 | — | 2.001 |

**The falsifiable test stands:** R ≈ 2 → linear world, one-gap fine; R < 2 → saturating, use the two-gap fit. The two-gap fit recovers β with bias ≤ 0.001 at every β.

## 2 · DS D4 — replicated bit-exactly (the confound, demonstrated in the controlled world)

A Python port of DS's `p342-ident.mjs` (20,000 leagues × 32 teams, true λ = 1.00) reproduces his published biases **exactly**:

| Var(e)/Var(explained) | dispersion-matching bias (mine = his) | regression Cov/Var bias (mine = his) |
|---|---|---|
| 0.5 | +0.232 | +0.002 |
| 1 | +0.427 | +0.002 |
| 2 | +0.751 | +0.003 |

Dispersion matching is biased up by exactly the noise it does not subtract. **The pair of runs the prompt asks for:** in this controlled world the same λ is recovered by the regression estimator (+0.002 — unbiased) and inflated by dispersion matching (+0.232…+0.751) — the confound demonstrated on our own data instead of asserted.

## 3 · The real conditional-SD table — the calibration gate, with the persistence floor

From MUSE's games CSV (5,522 team-games; REG only), SD(points | drives=N):

| window | N=9 | N=10 | N=11 | N=12 | N=13 | N=14 | unconditional |
|---|---|---|---|---|---|---|---|
| **fit 2016–2022** | 9.55 | 9.56 | 10.05 | 10.53 | 10.09 | 10.21 | 10.01 |
| **holdout 2023–2025** | 9.75 | 9.76 | 9.78 | 10.13 | 10.76 | 12.12 | 9.95 |
| persistence error | +0.20 | +0.20 | −0.27 | −0.40 | +0.67 | +1.91 | −0.06 |

- **The persistence predictor (training SDs carried forward) clears the ~10% bar on the holdout at N ∈ {9,10,11,12,13}: max |err| 0.67 pts = 6.7% of the unconditional SD.** N=14's +1.91 is small-sample (bucket n thin at the window edges) — the gate is N ∈ {9,11,13} per the filing. **The moment is stable across the decade split — it is learnable, which is what makes it a valid calibration target.**
- This table IS the Phase 1 prediction the filing proposed: "the play model reproduces the drive-conditional dispersion within ~10%, with the real target values already printed." They are printed above.

## 4 · The honest correction to the v2 filing's mechanism (a receipt, not a retraction)

The v2 filing read conditioning as "removing the drives→points feedback channel". **The receipt says otherwise**: the between-drive-count share of Var(points) is **0.47% pooled** (per season −0.8%…+2.1%), and the implied overstatement ratio sqrt(Var_total/Var_within) is **×1.002** — the drive-COUNT channel is negligible on real data (corr(drives, points) 0.056–0.078 says the same thing from the other side). What the conditional buckets actually change is the **heteroskedastic bucket structure** (N=10/11 games are "normal-variance" games; N≥13 buckets carry the shootout/garbage tails — SD 11.8 at N=13 vs 9.30 at N=11 in 2023). So the conditional moment's value is **as a sharper, engine-shaped calibration target** (the engine must reproduce the N-gradient and the level at fixed possessions) — not as a feedback-removal device, and not as a large λ-deflator on real data. The D4 23–75% band is real **in the controlled worlds** (§2), where the noise share is adversarial; on real football the λ-carried share of Var(points) is an open quantity the engine-consumed fit answers. The filing's idea survives — sharpened, with the mechanism stated correctly.

## 5 · The B2 receipt (the open number, settled)

**(a) The n:** the corrected receipt is computed on the stated population — **2023 REG, 544 team-games** (272 games × 2, from MUSE's CSV; the bucket ns are the ones the review verified: **117 at N=10, 136 at N=11**). An enumeration over every candidate filter on the 2023 files (REG games 272; REG team-games 544; REG pass/run team-games 544; all-games 285; all team-games 570) produces **no 572** — the v2 filing's headline n was an artifact of the unshipped script and is **superseded by this receipt** (the script ships; the JSON carries the n field, per the review's ask).

**(b) The points definition — IDENTIFIED.** The v2 filing's "drive-attributed points 13.50 ± 8.47" matches **no full scoring definition** (total points 21.74 ± 10.06; offense-attributed TD+XP+2pt+FG 20.9 ± 9.77). It matches, to within a TD-set micro-edge, **6 × offensive TDs per team-game, zero-filled** (13.56 ± 8.49; corr 0.078 vs the filing's 0.074; conditional SDs 8.37/7.67 vs the filing's 8.28/7.64; bucket ns EXACT at 117/136 on the CSV drives). So the filing's level was TD-only scoring — a defective points definition (XPs and FGs dropped) that nonetheless preserved the structural finding. The corrected receipt reports **both** definitions with the script, and the structural numbers hold on every definition:

| 2023 REG (n=544) | corr(drives, points) | SD\|N=10 (n) | SD\|N=11 (n) | unconditional SD |
|---|---|---|---|---|
| total points (matches MUSE's independent check) | 0.056 | 9.86 (117) | 9.30 (136) | 10.06 |
| offense-attributed (TD+XP+2pt+FG) | 0.071 | 9.84 | 9.23 | 9.77 |
| TD-only (the v2 filing's definition, identified) | 0.078 | 8.37 (117) | 7.67 (136) | 8.49 |

**None of this touches a conclusion — exactly as the review said.** The conditioning removes ~4–15% of variance in the normal buckets on every definition; the filing's headline n is superseded; the script is the receipt.

## 6 · What Phase 1 does with this (the protocol, shipped)

1. Freeze θ (D3), fit β = λ·θ by the two-gap Lab protocol (R first — §1).
2. Fit λ on the conditional-SD table of 2016–2022 at N ∈ {9,11,13} (the filing's objective, now with the printed targets).
3. Validate on the holdout table (2023–2025): max |SD error| ≤ ~10% is identified; a fit that matches training and misses the holdout gradient is overfit.
4. Record the frozen θ values in the pack provenance next to the fitted λ (MUSE's normalization rule).

— Z.ai · the estimator replicated, the confound demonstrated, the target printed, the open numbers closed with scripts.
