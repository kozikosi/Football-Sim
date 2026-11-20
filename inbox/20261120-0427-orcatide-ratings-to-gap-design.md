SPEAKER: orcatide | ROLE: council advisor | TASK: C20 — the ratings→gap design note | DATE: 2026-11-20T04:27Z

Context (the passgap doc — `origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md`, 33 lines — read, receipt in WHAT I RAN): the product has no per-team gap in r units — it has ratings. "To use the tilt the game needs `passGap(offense, defense)` built from roster ratings (QB, receivers, protection vs pass rush, coverage). That mapping cannot be fit on history (no historical ratings in the repo); the only ratings file is Madden 27 (`data/nfl/madden27-ratings.csv`) with no games played on it." The note below is the design; do not build.

ONE TARGET (the measured distribution the map must reproduce):
- mean 0, sd about 0.024 (the combined gap); the doc's "true team-season spread of mean tilt score: offense 0.029, defense 0.024";
- the smearing: typical combined gap sd 0.02–0.025, i.e. typical s about 0.15–0.17 (inside the item-6 scale: |s| 0.25 is points about ±4%);
- the persistence: year-to-year 0.45 offense / 0.2 defense — the ceiling for a real-data gap; on ratings (no games played), check the in-season stability of the mapped gap instead of the 0.45/0.2, and note that.

CANDIDATE FEATURES (roster ratings + the store, per the sitting):
1. QB — the user team's QB rating (OVR or SPD from the store's roster placement).
2. Receivers (top 3) — the top-3 receiver ratings on the user team.
3. Protection (5 OL) — the 5 natural-fill protection slots' ratings.
4. Pass rush (4) — the pass-rush slots' ratings.
5. Coverage (CBs, safeties) — the CB + safety slots' ratings.
6. Home/away or week — the user team's home/away status (or a week term — the Architect decides the term; the store's season context carries it).

TWO CANDIDATE FORMULAS:
- Formula A — weighted sum of z-scores (TESTABLE on the data on hand): split into two gaps and add:
  - offenseGap = w_QB·z(QB) + Σ w_WR·z(WR_i) + w_P·z(protection);
  - defenseGap = w_C·z(CBs + safeties) − w_R·z(pass rush);
  - `passGap = offenseGap + defenseGap` (or the Architect folds the sum into one; the split keeps the "offense and defense slopes each near 1" structure — the doc: the two slopes are near 1 and statistically equal in 2023-2025, so two weights-vectors with near-1 total weight is the target shape).
  - Weights are tuned so the mapped-gap distribution matches the target: mean 0, sd ≈ 0.024, typical |s| ≈ 0.15–0.17. The doc's near-1 slopes say: don't shrink — the smearing comes from the ratings spread, not the weights.
- Formula B — regression on the team-season tilt scores (the passgap doc's labels): fit `tilt = β0 + Σ_f β_f · f_f` per window (2016-2025, 2016-2022, 2023-2025) — the features f are the ratings above and the target is the tool's team-season offense/defense tilt scores (the doc: "fit `gap = f(ratings)` against these team-season tilt scores as the target (the offense and defense score tables from this tool are the labels)").
  - Testable? A: yes — it is a function of the data on hand (static ratings + the doc's tuning); B: yes in principle, but the target is the tool's tilt scores — with no games played, the "persistence" half of the check (0.45/0.2) cannot be run — the in-season stability of the mapped gap is the substitute.

FALSIFICATION TEST (C2's four conditions + the scale, from the passgap reading rule + line 11):
1. Both sides above the permutation-null p95 in every window: offense p95 0.134 (2016-25), 0.166 (2016-22), defense p95 0.146, 0.168, 0.168 — and the slopes are NOT within the null (the reading rule's condition — slopes far from the null).
2. The gap slope is 28 / 24 / 15 SE from 0: the doc's implied lambdas: 6.89 ± 0.24 (2016-25), 6.83 ± 0.28 (2016-22), 7.13 ± 0.47 (2023-25) — combined slope 0.939 ± 0.033 / 0.919 ± 0.038 / 1.002 ± 0.066.
3. Sign and size agree across eras: lambda 6.83 vs 7.13 — inside one SE of each other; the sign is the offense side (the doc: "the offense effect is strong").
4. The size is inside the item-6 scale: typical combined gap sd 0.02–0.025 (the study) → typical s about 0.15–0.17; |s| 0.25 is points about ±4% (doc line 11; sitting v3 C27 agrees: "s = 0.16 is ~2.5% of points; s = 0.25 is ~4%").

SIGN CONVENTION: positive = the offense-side tilt (the product's `passGap(offense, defense)` — the mapped offenseGap is positive when the offense is the stronger side — the doc's slopes are positive with a strong offense effect). The product's item-6 application: `s = λ·gap`, λ about 7 per r-unit — so a 0.024-sd gap maps to typical |s| ≈ 0.15–0.17, inside the ±4% scale at |s| = 0.25.

DONE WHEN: one page — features (6, as above), two formulas (A testable; B noted), one target (mean 0, sd ≈ 0.024, typical s ≈ 0.15–0.17), one test (the four conditions + the scale). Do not build it.

WHAT I RAN (receipts):
- `git show origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/passgap-2026-11-20.md && wc -l /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/passgap-2026-11-20.md` — receipt above: 33 lines. Lines cited: 6 (windows/seeds), 8-10 (the three windows' slopes + lambda), 11 (year-to-year r, the target spread, the typical s, the ±4%), 13-14 (the reading rule: the three conditions — p95, slope SE, sign+size across eras), 17 (the offense effect is strong), 19 (the mapping sentence — "no historical ratings in the repo; the only ratings file is Madden 27 with no games played on it. UNKNOWN: how much of the measured spread the ratings explain"), 25 (the post-cutover fit instruction: "fit `gap = f(ratings)` against these team-season tilt scores as the target (the offense and defense score tables from this tool are the labels), then confirm the pass-class rates and points move inside the item-6 scale. Report, not gate."), 33 (the target: "match the measured distribution (mean 0, sd about 0.024 for the combined gap) and the 0.45 / 0.2 persistence, not the in-season split-half").
- the sitting v3 C20 text — the user message (features, formulas, falsification, "one page, two formulas, one target, one test").
