# DS — lane file

## Identity
- **Seat:** DS · **Model:** deepseek-v4.1-flash-free via OpenChamber · **State:** advisor
- **First seen:** 2026-10-25 · **ID block:** none used
- **Strengths shown (evidence):** P-342 review of the engine design (11 Nov) — toy kernel reproduced, branch test, four defects with numbers (solver unit, Phase 1 margin gate, λ/θ identification, dispersion-matching bias); P-341 reviews (11 Nov) — Z.ai Appendix A 10/11 exact, Pickle's 15 rows confirmed; flex rebuild (9–10 Nov) — both Architect tables rule for rule, 105-rule Owner table; P-346 v3 review (12 Nov) — checksum question settled, C2 diagnostic defect found; P-347 λ identification (12 Nov) — ruler, MLE + ANOVA, missing-data statement.

## Where
- **Worktree:** `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds`
- **Branch:** `council/ds`
- **merge-base HEAD origin/council/base:** `1b91f50e`
- **Last session end:** 2026-11-12

## Current state (12 Nov 2026)

### P-346 third review — `inbox/20261112-0403-ds-P-346-review-v3.md` (VERDICT improved)
- Rebuilt both pushed copies with `git archive` (no working-tree conversion): **top-level CHECKSUMS 69/72** on `origin/council/or` `a9eda133` and `origin/council/vl` `18e2f886`; folder counts 28/28, 14/14, 5/6, 4/4, 4/5, 4/5. Same three files, same hashes MUSE named.
- Mechanism proven: listed sizes minus shipped sizes = newline counts (321 / 5,258 / 17); LF→CRLF conversion reproduces all three listed hashes exactly (`e82f0cca…@67,903`, `98a46012…@232,832`, `9c92a4b2…@1,505`). Writers use `open(..., "w", newline="")` + `csv.writer` (default CRLF) at c1:357, c3:318, c4:193; fix is `lineterminator="\n"` then re-checksum on shipped bytes.
- **Correction to VL:** the shipped CHECKSUMS is 3-field `<hash>  <size>  <path>`; `sha256sum -c` returns **0 OK**, 7 malformed, exits 1 on it. The quoted "72 OK / 28 OK / 14 OK" cannot come from that command on those bytes; the ok on Fix 4 needs a correction note.
- **New defect (not in reviews 1–2):** C2's `dispersion_matching_overstatement_ratio` (code line 196) is `sqrt(total_var / within-drive-count var)` = a drive-count R² (1.0024), **not the D4 bias**. Real D4 from P-344 `team_game_summary_2016-2025.csv` (season-demeaned, 320 team-seasons, n̄=17.26): team-season dispersion overstates λ **×1.193 (+19.3%)**, game-level **×2.71 (+171%)**; per season 1.16–1.21. The field understates the relevant bias by ~80× / ~700×.
- P-346 now has three seats (MUSE improved, VL ok, DS improved) → REVIEWED; the author's small pass remains.

### P-347 λ identification — `inbox/20261112-0420-ds-P-347-lambda-identification.md`
- **The ruler fixes the scale:** `slotWinsPerOvr()` (Pre-Colors 1346–1351, protected) makes g measurable in slot wins; freeze θ; then λ = **log-odds per slot-win of duty gap**. Only λ's *shape* is empirical; the 0.40/0.20 level is a display choice, not identification.
- **Estimator:** play-level conditional logit (multinomial logistic, 12 params, concave) with cluster-robust SEs by team-season. Play count does not buy information: g is team-constant, so 32 clusters per season; one ratings snapshot ⇒ 32 distinct g, not 320. SE ±13–26% per λ (D4 run).
- **Team-level fallback:** ANOVA variance components `λ̂² = (Var(team means) − mean within/n̄)/Var(g)` — the analytic form of simulated dispersion matching, no simulator. Verified numbers above.
- **Missing data:** per-season ratings 2016–2025 (proprietary); alternative is an Owner-approved public proxy (PFR AV) as an *instrument*. Without either, publish "OVR-conditional, ±20%", never a point.
- **Sharper Phase 1 gate:** 3rd-down conversion by distance, pre-registered; Phase 2 falsifier: between-team variance = 11.9 points² (SD 3.45). R = Wins20/Wins10 is a curvature test, not an estimator.

## Next session needs
1. If the Owner ratifies P-347: the estimator decision is the ruler + MLE/ANOVA, not dispersion; the data request is per-season ratings.
2. P-346's author pass (writers, CHECKSUMS, C2 field) is Z.ai's, not a fourth review.
3. The Phase 1 baseline still has not started (Claude timed out; resume prompt with the Owner).

## Live files
- `inbox/20261112-0403-ds-P-346-review-v3.md`
- `inbox/20261112-0420-ds-P-347-lambda-identification.md`
- `_agents/ds/tools/p342-ident.mjs`, `_agents/ds/tools/p342-branchtest.patch` (prior receipts, unchanged)
