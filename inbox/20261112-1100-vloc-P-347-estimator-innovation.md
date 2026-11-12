SPEAKER: vloc | ROLE: council seat | TASK: P-347 λ-estimator innovation note (receipt-backed observation from C2 re-run) | DATE: 2026-11-12
FOR: P-347

# Innovation note: conditioning removes only ~4–8% of variance — the holdout floor, not a perfect de-confound, is the right λ gate

**Context:** P-347 proposes the two-gap Lab (gaps 10 and 20, report R = Wins20/Wins10 first) validated by conditional moments on held-out 2023–2025, never dispersion-match (DS D4 confirmed twice over). My independent C2 re-run (committed in the P-346 v3 review) measured the real conditional-SD table, so I can bound how much conditioning actually helps.

## What I measured (VERIFIED by re-running c2_lab_and_validation.py)

On the stated population (2023 REG, both teams of every game, MUSE's shipped p345-games CSV, n=544):

| measure | value |
|---|---|
| unconditional SD(points) | 10.06 |
| SD(points | drives=10) | 9.86 (n=117) |
| SD(points | drives=11) | 9.30 (n=136) |
| corr(drives, points) | 0.056 |
| TD-only variant SD | 8.49 |

Conditioning on drives=10/11 moves the SD from 10.06 → 9.86/9.30, i.e. removes only **2–7% of variance**. The drive-count confound (possession lottery) is real but small on this metric — **not the dominant distortion** DS's dispersion-matching analysis fears. The two-gap Lab's R = 1.979/1.890/1.649 (vs linear 2.001) is the cleaner falsifier of the functional form.

## The real floor is the holdout error

The persistence predictor (train-window SDs carried to 2023–2025 holdout) has max |err| = **0.67 pts = 6.7%** at N=13 (all other N ≤ 0.4). That is the noise floor any fitted λ must beat — and C2's persistence clears the ~10% bar. So the practical gate for P-347 is:

> A fitted λ is accepted only if its holdout conditional-SD error on 2023–2025 is ≤ the persistence floor (~6.7%, cap 10%), and R = Wins20/Wins10 on the Lab moves toward 1.65–2.00 in the saturating direction (not pinned at 2.000 linear).

## What this means for P-347

- **Two-gap + R-first is the right structure** — confirmed by my re-run: D4 dispersion matching is biased (+0.232/+0.427/+0.751 at noise ratios 0.5/1/2), regression Cov/Var is unbiased (+0.002/+0.002/+0.003), so the slope moment is trustworthy but dispersion matching is not.
- **Conditional moments are a validation target, not the estimator** — they remove only ~4–8% of variance, so they cannot rescue a bad fit. Use them as the holdout gate (≤ persistence floor), not as the fitting objective.
- **Don't over-fit to N=10/11** — the bucket ns are small (117/136), so conditional SDs there are noisy. The pooled overstatement ratio (1.0024) shows the between-drive-count variance is negligible on real data; the confound is bounded.
- **The λ objective (0.40 tiers vs 0.20 mean error) is still the Owner's open question** — this note does not decide it. My observation: at λ=0.4 the static decade-mean fit is 96 exact/1 off-1/mae 1.311 with zero tier changes vs staged E; at λ=0.2 it's 86 exact/11 off-1/mae 1.076. The tier objective (0.40) preserves more Owner-anchored rows; mean error (0.20) reduces mae but moves 11 rows off by one tier. Present both, recommend nothing.

Receipts: `phase2-next-2026-11-11/C2-conditional-lambda/c2_lab_and_validation.py` + `c2_results.json` (re-run reproduced byte-identically by me; raw data sha256-verified against the P-344 manifest). Filed as `inbox/20261112-1000-vloc-P-346-review-v3.md` for the P-346 review; this note is the P-347 innovation companion.
