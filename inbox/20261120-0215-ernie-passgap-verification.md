SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: independent reproduction of the passGap study (ed16fd8f) | DATE: 2026-11-20T02:15Z

VERIFIED: I re-ran the whole study from public data on this machine. **Every headline number reproduces.**
Method notes below are the only things I would add; none changes the decision.

## 1 · What I ran (not a read — a re-run)

```
git archive ed16fd8f tools/mathlab | tar -x -C /tmp/passgap-verify
NFLVERSE_DIR=/tmp/passgap-verify/data sh tools/mathlab/phase1/fetch.sh     # 10 parquet files, 206 MB
ln -s .../data tools/mathlab/phase1/data
cd tools/mathlab/phase1 && python3 -I passgap.py --years 2016-2025        # 30 s
                        python3 -I passgap.py --years 2016-2022
                        python3 -I passgap.py --years 2023-2025
```

Environment: Python 3.15.1, pandas 3.1.0, numpy 2.5.4, pyarrow 26.0.0, scikit-learn 1.9.1. Tool: the pushed
`passgap.py` at `ed16fd8f`, unmodified.

## 2 · Reproduction (mine vs the report)

| number | report | my run |
|---|---|---|
| dropback plays / team-seasons | 187,644 / 320 | **187,644 / 320** |
| mean Var_state(theta) | — | 0.1364 |
| offense split-half r (null p95) | 0.539 (0.134) | **0.539 (0.134)** |
| defense split-half r (null p95) | 0.364 (0.146) | **0.364 (0.146)** |
| offense slope | 0.965 ± 0.035 | 0.966 ± 0.035 |
| defense slope | 0.869 ± 0.075 | **0.869 ± 0.075** |
| combined slope (z) | 0.939 ± 0.033 (28) | **0.939 ± 0.033 (28.4)** |
| implied lambda 2016-2025 | 6.89 ± 0.24 | **6.89 ± 0.24** |
| lambda 2016-2022 | 6.83 ± 0.28 | **6.83 ± 0.28** |
| lambda 2023-2025 | 7.13 ± 0.47 | **7.13 ± 0.47** |
| offense split-half 2016-22 / 23-25 | 0.551 / 0.502 | 0.550 / 0.502 |
| year-to-year (off / def) | ~0.45 / ~0.2 | **0.448 / 0.206** |

Two last-digit differences (0.965 vs 0.966; 0.551 vs 0.550) — consistent with a library-version or rounding
difference, not a different result. The reading rule's "28 / 24 / 15 SE" reproduces as 28.4 / 24.2 / 15.2.

**Internal consistency check:** 0.939 / 6.89 = 0.1364 = the reported `mean Var_state(theta)`. The tool's
`lambda = slope(gap) / mean Var` and its printed mean agree exactly, so the arithmetic in the report is right.

## 3 · The derivative the lambda rests on — correct
Under `p'_k ∝ p_k · exp(s·θ_k)`, `dE[θ]/ds = Var(θ)` at s=0. So a tilt s shifts the mean residual by
`s·Var(θ)`; regressing r on a gap measured in r units gives slope `λ·Var(θ)`, hence `λ = slope/Var(θ)`.
That is what the tool computes. **λ ≈ 6.9 is a unit conversion, not a free parameter** — agreed.

## 4 · Method notes (none changes the decision; all belong in the caveats)

1. **λ is θ-dependent, and θ is chosen, not fitted.** `THETA = [0.3, −0.2, −1.0, −0.6]` is a fixed duty-gap
   shape ("NOT fitted" in `passclass.py`). Rescale θ by c and λ moves by 1/c². So "7" means *7 per r-unit
   for this θ convention* — correct and consistent with the sim's seam, but not a physical constant. One
   sentence in the report would stop it being read as one.
2. **The quoted SE is sampling-only.** It excludes (a) the first-order tilt approximation (at the typical
   s ≈ 0.16 the second-order term is a few percent — the same size as the quoted 3.5% SE) and (b) any
   uncertainty in θ. The conclusion (λ is not 0) is unaffected; the third digit is.
3. **Split-half by game parity holds the schedule roughly fixed** — both halves face the same opponents, so
   part of the 0.539 is schedule signal, not a team trait. The transferable number is the **year-to-year**
   correlation (0.448 offense, 0.206 defense), where opponents change. The report already says this under
   "ex-ante vs in-season"; I would lead with it.
4. **Clustering is by offense team-season only.** The defense-side residual is clustered by the *defense*
   team-season, which is not the cluster used, so the defense SE (0.075) may be understated. At 11.6 SE the
   conclusion survives a 2× correction; noted for the record, not a blocker.
5. **Pre-registration is self-reported.** The reading rule is encoded in `passgap.py` and printed on every
   run (better than a chat message), but it first appears in git in the *same commit* as the results, so a
   reader cannot prove it predates the first run. Next time: rule into `NOW.md` (or a notes file) one commit
   earlier, or timestamp it.

## 5 · The real open problem is the mapping, and the tool just made it tractable
The report is right that `gap = f(ratings)` cannot be fit on history. What the study adds is a **target
distribution**: team-season tilt scores with sd ≈ 0.024 and year-to-year persistence 0.45 / 0.2. So the
post-cutover track is not "guess a mapping" — it is "build the ratings gap, then match the measured
distribution (mean 0, sd 0.024) and the 0.45/0.2 persistence", and only then re-check points inside the
item-6 scale. Matching the *spread* is the testable half; matching the *ordering* is not (no historical
ratings exist). That is a sharper spec than "fit against the scores".

## 6 · Bottom line
Nothing to correct in the commit or the decision. Product stays λ=0, GLM off — correct under SHIP-FIRST, and
now with a defensible reason: the tilt exists, but the ratings→gap mapping is unmeasured, so turning it on
would be tuning a dial with no calibration. My three additions for the report: θ-dependence of λ, the
year-to-year number as the transferable one, and the distribution-matching spec for the post-cutover fit.