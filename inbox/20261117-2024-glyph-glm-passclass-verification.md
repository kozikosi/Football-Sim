SPEAKER: Glyph | TASK: verify the pass-class GLM node | DATE: 2026-11-17T20:24Z
FOR: P-342 (the play-level engine item)

Context and scope
- Target (VERIFIED): `origin/architect/engine-and-seats` tip `65673a00` ("2a: the pass-class GLM node, with the class-then-tuple sampler and the lambda seam"), child of `5c808472` via `f9991424`; extracted/read with `git show` and `git archive 65673a00 | tar -x -C /tmp/glyph-glm-65673a00`.
- Report read (VERIFIED): `tools/mathlab/results/glm-pass-class-2026-11-17.md` at `65673a00`.
- Environment (VERIFIED): Node `v26.13.0`, npm `11.20.0`, Python `3.15.1` (macOS arm64). Disk available ~13Gi at run start. Target tree had no `colors/node_modules`; I symlinked `/Users/kosi/Desktop/wt/vl/colors/node_modules` into `/tmp/glyph-glm-65673a00/colors/node_modules` for tests/tools that require installed deps.
- Python deps for `passclass.py report` (VERIFIED): created temp venv `/tmp/glyph-glm-py`; installed `numpy`, `scikit-learn`, `pandas` successfully, but report still could not run because `tools/mathlab/phase1/load.py` reads gitignored nflverse parquet files from `tools/mathlab/phase1/data` (`play_by_play_{y}.parquet`) and no parquet engine/data were present. I did not rerun the lab report; see checks 1–2.
- Beam prior verification (REPORTED): cosine 120/120 bit-identical, suite 406/406, paired 12k comparison reproduces (sacks −1.7%, drives −1.1%, points +0.6%, inside ~10% bar), state-bucket test not run (per council message).
- Settled items not re-run (per prompt): pooled-node conformance, portable cosine, CI build gate, 2023–2025 product pack. Framework pick/pin/palette not re-litigated.

Commands and receipts

1) Passclass test suite (target commit)
Command: `cd /tmp/glyph-glm-65673a00/colors && node --test --experimental-strip-types test/nfl/passclass.test.ts`
Result (VERIFIED): 12 tests, 12 pass, 0 fail, duration ~1.8s.
Key output:
- `✔ pass-class: features and probabilities reproduce the Python lab bit for bit, and agree with scikit-learn to 1e-12`
- `✔ pass-class: probabilities are a proper distribution with every class possible`
- `✔ pass-class: the loader refuses a pack whose features, classes, shapes, numbers or lambda are wrong`
- `✔ class pools: the four class-restricted pools of any pool partition it exactly (same ids, same weights, only that class)`
- `✔ class-then-tuple: a rare class in a thin cell reads from a coarser cell (>= minClassPool plays of that class), and the pass pools hold only pass outcomes`
- `✔ class-then-tuple: over keyed draws the sampled class frequencies equal the GLM probabilities (chi-square, 3 df)`
- `✔ game with the GLM node: the log is valid, deterministic, no class-pool holes, and a lambda of 0 or a gap of 0 replays the neutral GLM log bit for bit`
- `✔ game with the GLM node: the default (no passClass) is still the pools record node, bit for bit`
- `✔ lambda seam on the GLM node: completions rise and sacks fall monotonically with the gap (same keys, 300 games)`
- `✔ keyed coupling: tilting the class probabilities leaves every draw of every OTHER node alone (same key => same call and clock draws)`
- `✔ the check can fail: wrong feature threshold, swapped classes, or a perturbed coefficient are all caught by the vectors`
- `✔ class-then-tuple keeps the within-class outcome distribution: mean completion yards match the pool node, which they cannot if the class draw and the tuple draw share a uniform`

2) Full suite and lint-like tests
Command: `cd /tmp/glyph-glm-65673a00/colors && node --test --experimental-strip-types`
Result (VERIFIED): `tests 408, pass 408, fail 0, cancelled 0, skipped 0, todo 0` (duration ~18.5s). Includes passclass tests and ends with `✔ the default display (measuredDisplayWeights) is MEASURED...`
Command: `cd /tmp/glyph-glm-65673a00/colors && node --test --experimental-strip-types test/core/pmath-lint.test.ts`
Result (VERIFIED): 2 pass, 0 fail. Report: `39 non-portable math calls in 6 files (pinned 39): rng.ts 4, boxscore.ts 6, draft.ts 1, drives.ts 12, matchup.ts 15, plans.ts 1` (no new sim/ entries).

3) tsc check
Commands attempted (VERIFIED attempts, not completed):
- `cd /tmp/glyph-glm-65673a00/colors && node tools/tsc-baseline.mjs` -> failed with wrapper message: `This is not the tsc command you are looking for ... tsc failed without parsable errors`.
- `./node_modules/.bin/tsc` missing under symlink; `node ./node_modules/typescript/bin/tsc` and `.../lib/tsc.js` paths not found via that symlink target; `node /Users/kosi/Desktop/wt/vl/colors/node_modules/typescript/bin/tsc` / `lib/tsc.js` also not found on this machine.
Result: `tsc --noEmit` / pinned-baseline rerun NOT RUN to completion in this environment (tooling path unavailable).

4) Paired whole-game comparison (check 6 reproduction)
Command: `cd /tmp/glyph-glm-65673a00/colors && node --experimental-strip-types tools/glm-bar.ts 12000`
Result (VERIFIED):
```
pools nfl-pools-fit2023-2025 + passclass nfl-passclass-fit2023-2025: 12000 paired games (per team-game means), class-pool holes 0
metric        pools     GLM    diff   diff%   SE(diff)  z
points        23.250  23.391   0.141    0.60    0.076   1.9
drives        11.038  10.920  -0.118   -1.07    0.018  -6.4
plays         74.972  74.915  -0.058   -0.08    0.053  -1.1
off_plays     60.999  60.885  -0.114   -0.19    0.041  -2.8
pass_att      34.199  34.091  -0.108   -0.32    0.043  -2.5
rush_att      26.554  26.542  -0.012   -0.05    0.029  -0.4
completions   20.579  20.509  -0.070   -0.34    0.031  -2.3
yards        328.604 327.827  -0.777   -0.24    0.570  -1.4
sacks          2.419   2.377  -0.042   -1.72    0.014  -3.0
giveaways      1.102   1.101  -0.000   -0.04    0.009  -0.0
top_dt      1789.8231789.470  -0.353   -0.02    0.654  -0.5
```

5) State-bucket paired comparison (headline question)
Wrote `/tmp/glyph-glm-65673a00/colors/tools/glyph-state-bucket.ts` (read-only analysis script in temp tree; not committed to repo). Uses same paired keys (`glm-bar:${g}`), same packs/models, `runGame` with/without `passClass:M`, collects pass snaps (`call===0`) by buckets (ALL, down, ytg bin, ydl bin, score-diff bin, late/OT, down×ytg). Computes GLM mean predicted class probs per pass state via `passClassProbs(M, passFeatures(...))` using same OT/score-diff treatment as `game.ts` (OT => qtr 2, hs 600, sd 0; regulation sd = team score minus opponent at snap event point).
Command: `cd /tmp/glyph-glm-65673a00/colors && node --experimental-strip-types tools/glyph-state-bucket.ts 12000`
Result (VERIFIED):
```
state-bucket paired comparison: 12000 games, packs nfl-pools-fit2023-2025 + nfl-passclass-fit2023-2025, class-pool holes 0

BUCKET ALL  n_pool=820781 n_glm=818188
  class   pool_rate  glm_rate   diff(pp)  glm_pred(mean)
  comp    60.17%    60.16%     -0.02    60.14%
  inc     30.77%    30.86%      0.09    30.87%
  sack     7.07%     6.97%     -0.10     7.00%
  int      1.99%     2.01%      0.03     1.99%

BUCKET mid(21-80)  n_pool=653267 n_glm=651285
  comp    61.14%    61.09%     -0.06    61.05%
  inc     29.75%    29.85%      0.10    29.87%
  sack     7.17%     7.07%     -0.09     7.13%
  int      1.94%     1.99%      0.05     1.96%

BUCKET not_late  n_pool=608914 n_glm=604901
  comp    60.12%    61.32%      1.20    61.28%
  inc     30.79%    29.91%     -0.88    29.95%
  sack     7.10%     6.86%     -0.24     6.86%
  int      2.00%     1.92%     -0.08     1.91%

BUCKET ytg7-10  n_pool=518486 n_glm=516503
  comp    61.51%    61.50%     -0.02    61.51%
  inc     30.09%    30.10%      0.01    30.07%
  sack     6.52%     6.47%     -0.05     6.51%
  int      1.88%     1.94%      0.06     1.91%

BUCKET d1  n_pool=294764 n_glm=293384
  comp    63.69%    63.57%     -0.12    63.55%
  inc     29.17%    29.29%      0.12    29.30%
  sack     5.39%     5.31%     -0.07     5.37%
  int      1.74%     1.82%      0.08     1.78%

BUCKET d1|ytg7-10  n_pool=288873 n_glm=287443
  comp    63.99%    63.83%     -0.15    63.79%
  inc     28.88%    29.02%      0.14    29.03%
  sack     5.40%     5.33%     -0.06     5.40%
  int      1.74%     1.82%      0.08     1.78%

BUCKET d2  n_pool=281651 n_glm=280345
  comp    62.57%    62.64%      0.06    62.57%
  inc     29.50%    29.56%      0.06    29.61%
  sack     6.09%     5.97%     -0.12     6.02%
  int      1.83%     1.83%      0.00     1.80%

BUCKET d3  n_pool=225175 n_glm=223573
  comp    53.14%    53.29%      0.15    53.36%
  inc     34.05%    34.02%     -0.03    33.99%
  sack    10.43%    10.39%     -0.05    10.34%
  int      2.39%     2.30%     -0.08     2.32%

BUCKET trail(-7..-1)  n_pool=223092 n_glm=213024
  comp    60.34%    59.87%     -0.47    59.69%
  inc     30.64%    30.90%      0.26    31.02%
  sack     7.04%     7.03%     -0.01     7.10%
  int      1.98%     2.20%      0.22     2.19%

BUCKET late(<=300,q2/q4)  n_pool=207444 n_glm=208953
  comp    60.34%    56.77%     -3.57    56.79%
  inc     30.70%    33.63%      2.93    33.57%
  sack     7.01%     7.31%      0.30     7.42%
  int      1.95%     2.29%      0.34     2.22%

BUCKET trail_big(<=-8)  n_pool=190650 n_glm=198474
  comp    60.43%    58.72%     -1.71    58.63%
  inc     30.71%    31.08%      0.37    31.08%
  sack     6.88%     7.80%      0.92     7.90%
  int      1.98%     2.41%      0.42     2.39%

BUCKET lead(1..7)  n_pool=164466 n_glm=159145
  comp    60.15%    60.67%      0.53    60.92%
  inc     30.67%    30.92%      0.25    30.78%
  sack     7.23%     6.66%     -0.57     6.63%
  int      1.95%     1.75%     -0.20     1.67%

BUCKET d2|ytg7-10  n_pool=149760 n_glm=148934
  comp    62.47%    62.10%     -0.36    62.16%
  inc     29.48%    29.86%      0.38    29.80%
  sack     6.24%     6.22%     -0.02     6.21%
  int      1.81%     1.82%      0.00     1.84%

BUCKET tied(0)  n_pool=142252 n_glm=138448
  comp    60.05%    61.12%      1.07    61.10%
  inc     30.83%    30.23%     -0.60    30.29%
  sack     7.10%     6.81%     -0.29     6.79%
  int      2.02%     1.84%     -0.18     1.82%

BUCKET ytg4-6  n_pool=133738 n_glm=133220
  comp    56.35%    56.63%      0.28    56.44%
  inc     33.31%    33.19%     -0.12    33.32%
  sack     8.23%     8.17%     -0.06     8.21%
  int      2.11%     2.02%     -0.09     2.02%

BUCKET lead_big(>=8)  n_pool=100321 n_glm=109097
  comp    59.55%    61.39%      1.84    61.38%
  inc     31.25%    31.07%     -0.18    31.09%
  sack     7.20%     6.02%     -1.18     5.99%
  int      2.01%     1.53%     -0.48     1.54%

BUCKET rz(6-20)  n_pool=90927 n_glm=90053
  comp    54.54%    54.57%      0.03    54.73%
  inc     36.27%    36.67%      0.40    36.56%
  sack     7.05%     6.71%     -0.34     6.59%
  int      2.14%     2.05%     -0.09     2.11%

BUCKET ytg11+  n_pool=85577 n_glm=84711
  comp    60.72%    60.18%     -0.55    60.02%
  inc     28.68%    29.21%      0.53    29.49%
  sack     8.30%     8.25%     -0.05     8.13%
  int      2.30%     2.37%      0.07     2.35%

BUCKET d3|ytg7-10  n_pool=76759 n_glm=76507
  comp    51.04%    52.17%      1.12    52.29%
  inc     35.38%    34.33%     -1.05    34.17%
  sack    11.16%    11.07%     -0.08    11.13%
  int      2.42%     2.43%      0.01     2.41%

BUCKET d3|ytg4-6  n_pool=64867 n_glm=64003
  comp    51.78%    52.33%      0.54    52.30%
  inc     35.20%    35.13%     -0.07    35.14%
  sack    10.59%    10.43%     -0.16    10.37%
  int      2.43%     2.11%     -0.32     2.19%

BUCKET ytg2-3  n_pool=61981 n_glm=62501
  comp    56.94%    56.32%     -0.62    56.52%
  inc     33.40%    34.15%      0.76    33.95%
  sack     7.66%     7.42%     -0.24     7.48%
  int      2.01%     2.11%      0.10     2.05%

BUCKET d2|ytg4-6  n_pool=60591 n_glm=60714
  comp    61.94%    61.80%     -0.14    61.55%
  inc     30.64%    30.41%     -0.24    30.61%
  sack     5.77%     6.00%      0.23     6.14%
  int      1.65%     1.80%      0.15     1.70%

BUCKET own(81+)  n_pool=54779 n_glm=55056
  comp    62.98%    62.85%     -0.13    62.69%
  inc     28.87%    28.58%     -0.29    28.71%
  sack     6.07%     6.41%      0.34     6.51%
  int      2.08%     2.17%      0.08     2.08%

BUCKET d2|ytg11+  n_pool=43786 n_glm=43337
  comp    63.92%    65.15%      1.23    64.88%
  inc     28.14%    27.25%     -0.89    27.55%
  sack     5.85%     5.56%     -0.29     5.63%
  int      2.09%     2.04%     -0.05     1.94%

BUCKET d3|ytg11+  n_pool=40718 n_glm=40288
  comp    57.43%    55.01%     -2.42    55.02%
  inc     29.18%    31.19%      2.01    31.45%
  sack    10.89%    11.14%      0.26    10.81%
  int      2.50%     2.66%      0.16     2.73%

BUCKET d3|ytg2-3  n_pool=34017 n_glm=34026
  comp    54.55%    54.33%     -0.23    54.42%
  inc     34.69%    34.83%      0.14    34.70%
  sack     8.80%     8.83%      0.03     8.88%
  int      1.95%     2.02%      0.06     1.99%

BUCKET goal(<=5)  n_pool=21808 n_glm=21794
  comp    47.57%    48.68%      1.10    48.68%
  inc     43.16%    42.76%     -0.40    42.99%
  sack     6.77%     6.41%     -0.36     6.22%
  int      2.49%     2.15%     -0.34     2.12%

BUCKET ytg1  n_pool=20999 n_glm=21253
  comp    58.80%    61.04%      2.24    60.97%
  inc     32.12%    31.63%     -0.49    31.57%
  sack     6.59%     5.30%     -1.29     5.49%
  int      2.50%     2.03%     -0.46     1.97%

BUCKET d2|ytg2-3  n_pool=19450 n_glm=19419
  comp    62.41%    61.98%     -0.43    62.23%
  inc     29.13%    30.78%      1.66    30.54%
  sack     6.73%     5.52%     -1.21     5.62%
  int      1.73%     1.71%     -0.02     1.61%

BUCKET d4  n_pool=19191 n_glm=20886
  comp    53.46%    52.49%     -0.96    52.06%
  inc     35.32%    36.36%      1.04    36.66%
  sack     7.92%     7.21%     -0.71     7.42%
  int      3.30%     3.93%      0.63     3.86%

BUCKET d3|ytg1  n_pool=8814 n_glm=8749
  comp    56.01%    58.24%      2.22    58.66%
  inc     33.96%    33.09%     -0.87    32.85%
  sack     7.19%     6.65%     -0.54     6.67%
  int      2.84%     2.02%     -0.81     1.82%

BUCKET d2|ytg1  n_pool=8064 n_glm=7941
  comp    62.48%    66.93%      4.46    66.53%
  inc     29.68%    27.02%     -2.65    27.39%
  sack     5.49%     4.41%     -1.09     4.57%
  int      2.36%     1.64%     -0.72     1.51%

BUCKET d4|ytg2-3  n_pool=6602 n_glm=7203
  comp    54.79%    52.42%     -2.36    52.55%
  inc     35.97%    37.51%      1.54    37.14%
  sack     6.07%     6.57%      0.49     6.82%
  int      3.17%     3.50%      0.33     3.49%

BUCKET d4|ytg4-6  n_pool=4936 n_glm=5065
  comp    52.69%    51.67%     -1.03    50.30%
  inc     35.37%    36.51%      1.13    37.49%
  sack     8.57%     8.13%     -0.44     8.26%
  int      3.36%     3.69%      0.33     3.94%

BUCKET OT  n_pool=4423 n_glm=4334
  comp    60.19%    61.91%      1.72    61.57%
  inc     31.18%    29.63%     -1.55    29.94%
  sack     6.65%     6.37%     -0.28     6.65%
  int      1.99%     2.10%      0.11     1.84%

BUCKET d4|ytg1  n_pool=3486 n_glm=3913
  comp    59.72%    57.73%     -1.99    56.35%
  inc     29.98%    35.01%      5.03    35.28%
  sack     8.09%     4.52%     -3.57     5.18%
  int      2.21%     2.73%      0.53     3.19%

BUCKET d1|ytg4-6  n_pool=3344 n_glm=3438
  comp    48.98%    52.65%      3.66    52.46%
  inc     42.02%    41.24%     -0.77    41.15%
  sack     6.64%     4.51%     -2.13     4.50%
  int      2.36%     1.60%     -0.76     1.89%

BUCKET d4|ytg7-10  n_pool=3094 n_glm=3619
  comp    44.18%    47.89%      3.70    48.86%
  inc     40.95%    36.06%     -4.89    36.78%
  sack     9.95%     9.84%     -0.12     9.45%
  int      4.91%     6.22%      1.30     4.91%

BUCKET d1|ytg2-3  n_pool=1912 n_glm=1853
  comp    51.20%    48.84%     -2.36    50.68%
  inc     44.87%    43.93%     -0.95    43.57%
  sack     2.25%     4.70%      2.45     3.75%
  int      1.67%     2.54%      0.86     2.00%

BUCKET d4|ytg11+  n_pool=1073 n_glm=1086
  comp    55.17%    53.31%     -1.86    52.09%
  inc     32.25%    33.98%      1.73    34.21%
  sack     9.88%     8.10%     -1.78     8.73%
  int      2.70%     4.60%      1.90     4.97%

BUCKET d1|ytg1  n_pool=635 n_glm=650
  comp    45.67%    46.62%      0.95    51.87%
  inc     49.45%    48.00%     -1.45    43.21%
  sack     3.78%     2.62%     -1.16     2.74%
  int      1.10%     2.77%      1.67     2.17%

OVERALL pass plays pool=820781 glm=818188 sack_rate pool=7.072% glm=6.972% diff=-0.100pp
```

6) Mutation reproduction (check 5, best-effort)
Shared-tag slip (VERIFIED):
- Mutated throwaway copy `/tmp/glyph-glm-mut`: in `colors/src/sports/nfl/sim/game.ts` changed tuple draw tag from `draw(key,i,'rec')` to `draw(key,i,'passClass')` for the GLM pass-class branch.
- Command: `cd /tmp/glyph-glm-mut/colors && node --experimental-strip-types -e "<mean completion yards 400 games, glm vs pool>"` => `{"glm":5.799664468355895,"pool":11.279658539437525}` (yards collapse as reported).
- Command: `cd /tmp/glyph-glm-mut/colors && node --test --experimental-strip-types test/nfl/passclass.test.ts` => `11 pass, 1 fail`; failing: `class-then-tuple keeps the within-class outcome distribution... AssertionError: GLM 5.80 vs pool 11.28 yards per completion`.

passGap-ignored mutation (VERIFIED to be caught):
- Mutated copy: forced tilt gap argument to `0` (`opts.passGap ?? 0` -> `0`) in GLM pass branch.
- Command: same passclass test run => `10 pass, 2 fail`; failing `lambda seam... completions rise and sacks fall monotonically...` (all three gap outcomes equal) and `class-then-tuple keeps the within-class outcome distribution...` (distribution shifted in that state: GLM 5.80 vs pool 11.28). This confirms the seam monotonicity test catches a broken `passGap` path.

Other four faults listed by Architect (wrong classes kept in a class pool; 1-play pool accepted by hierarchy; late threshold <= changed to <; softmax without max-subtraction): NOT individually planted/run by Glyph in this session. Clean-tree tests include relevant "check can fail" vector/guard coverage (loader/hierarchy/partition/threshold perturbation via `passFeatures` boundary case in the check-can-fail test), but per-fault implantation receipts were not produced here.

7) Pack and "not done" inspection (code/pack)
Command: `cd /tmp/glyph-glm-65673a00/colors && node --experimental-strip-types -e "import fs from 'node:fs'; const a=JSON.parse(fs.readFileSync('../data/packs/nfl-passclass-fit2023-2025.json','utf8')); console.log(a.params.classes, a.params.features.length, a.params.coef.length, a.params.coef[0].length, a.params.intercept.length, a.params.theta, a.params.lambda, a.rules.values.minClassPool, a.id);"`
Result (VERIFIED): `[ 'comp', 'inc', 'sack', 'int' ] 15 4 15 4 [ 0.3, -0.2, -1, -0.6 ] 0 25 nfl-passclass-fit2023-2025`
`passclass-vectors.json` (VERIFIED): 407 states / 407 feature/prob/sklearn rows (`python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d['states']), len(d['features_bits']), len(d['probs_bits']), len(d['sklearn']))"`).
Commit diff scope (VERIFIED): `git show --name-only 65673a00` lists only `claude/NOW.md`, sim/game+passclass, passclass tests/vectors, `colors/tools/glm-bar.ts`, two passclass packs, `tools/mathlab/phase1/passclass.py`, report — no flex table or `design.json` edits.

8) Lab report rerun attempt (checks 1–2, Python-side of 3)
Command: `cd /tmp/glyph-glm-65673a00 && /tmp/glyph-glm-py/bin/python -I tools/mathlab/phase1/passclass.py report`
Result (NOT RUN to completion): `ModuleNotFoundError: No module named 'pandas'` initially; after installing pandas, failed with parquet dependency/data error: `ImportError: Unable to find a usable engine; tried using: 'pyarrow', 'fastparquet'` while loading `tools/mathlab/phase1/data/play_by_play_{y}.parquet` via `load.py` (nflverse parquet inputs not present in this environment). Held-out numeric tables/calibration table/scikit-learn-vs-pmath worst diff from the report script were therefore not independently rerun.

Claim-by-claim ledger

- **1. Held-out log loss / protocol / pool floor (numeric rerun).** VERIFIED by code inspection: `tools/mathlab/phase1/passclass.py` `report()` trains on `passes(range(2016,2023))` and tests once on `passes(range(2023,2026))`; bake writes separate `nfl-passclass-fit2016-2022` and `nfl-passclass-fit2023-2025` packs; comments/state describe 15-feature model, C_REG=1.0, theta toy/not fitted, lambda 0. Reported numbers (GLM 0.92389 vs pool 0.92786, paired 0.00397±0.00061, 6.6 SE, per-season positives, pool 0.027% prob-0, GLM min 7.4e-3) are REPORTED from Architect report — NOT RUN by Glyph because nflverse parquet play-by-play data/engine required by `passclass.py report` was unavailable. INFERRED: if report numbers are correct, gain is real but small and "mostly noise given the state" as Architect states.
- **1a. Leakage concern.** VERIFIED from code: report path uses 2016–2022 fit vs 2023–2025 test and does not use 2023–2025 fit for that held-out evaluation; 2023–2025 fit is a separate product-era bake. Feature/regularisation selection narrative ("chosen on 2021–2022 only, fit 2016–2020") is REPORTED in report text (not independently reproduced without data/history artifacts).
- **2. Calibration and sack-rate drift.** REPORTED from Architect report (not rerun; script unavailable as above): mean predicted 0.5985/0.3165/0.064/0.021 vs actual 0.6025/0.307/0.0703/0.0203, P(comp) deciles within ~1.5 pts, sack rate 6.4% train -> 7.0% 2023–2025. VERIFIED (simulation-side): in 12k paired 2023–2025-pack games, GLM mean predicted class rates on sampled pass states closely track GLM actual pass outcomes overall and within buckets (e.g. ALL glm_pred 60.14/30.87/7.00/1.99 vs glm_rate 60.16/30.86/6.97/2.01), indicating the node is internally calibrated to its own predictions in simulated states.
- **3. TS vs Python bit-for-bit / sklearn / loader guards.** VERIFIED: passclass test confirms 407 states, features/probs equal Python pmath evaluator bit-for-bit and sklearn `predict_proba` within 1e-12; vectors file contains 407 entries. Loader rejects wrong feature list, wrong class order, wrong coef/intercept shapes, null intercept, negative lambda, minClassPool 0 (test pass). Python-side worst 2.2e-16 claim is REPORTED in report (consistent with vector/sklearn check embedded in test data, but not recomputed by running Python report in this session).
- **4. Sampler.** VERIFIED: class-restricted pools partition parent exactly; rare class in thin cell falls back to coarser cell with >= `minClassPool` (25) plays of that class (test includes 4th-and-40/INT case); sampled class frequencies match GLM probabilities (chi-square, 3 df, 40k keyed draws). No partition/hierarchy hole observed in tests or in 12k paired games (`class-pool holes 0`).
- **5. Six planted faults and slipped-through case.** VERIFIED (reproduced): shared-tag slip planted in throwaway copy (`rec` draw reused `passClass` tag) -> mean completion yards collapsed to 5.80 vs pool 11.28; distributional test failed and caught it. VERIFIED (reproduced): `passGap` ignored in tilt call -> lambda-seam monotonicity test failed (and distributional test failed in that mutated state). VERIFIED (existing clean tests): "check can fail" catches perturbed coefficient/intercept and late/hs boundary feature perturbation; loader/partition/hierarchy tests guard stated behaviors. NOT RUN individually by Glyph: implantations for wrong classes kept in class pool, 1-play pool accepted by hierarchy, late threshold `<=`->`<`, and softmax without max-subtraction as separate manual mutations with per-case receipts.
- **6. Whole-game sacks/drives shift (headline) and state-bucket analysis.** VERIFIED reproduction: paired 12k keys, 2023–2025 packs, `class-pool holes 0`; points +0.141 (+0.60%, z 1.9), drives -0.118 (-1.07%, z -6.4), plays/off_plays/pass_att/completions/rush/yards/giveaways/TOP within small/noise or small shifts, sacks -0.042 (-1.72%, z -3.0), pass_att -0.32% (z -2.5), completions -0.34% (z -2.3). All far inside ~10% totals bar. VERIFIED state-bucket run: overall pass-play sack rate pool 7.072% vs GLM 6.972% (-0.100pp), GLM predicted 7.00%; pass-play counts differ by bucket/state mix (ALL 820781 vs 818188; not_late 608914->604901, trail_big 190650->198474, lead_big 100321->109097, late 207444->208953, etc.); GLM predicted rates track GLM actual rates closely in buckets while pool-vs-GLM actual rates diverge in some buckets (e.g. trail_big sack +0.92pp with pred 7.90%, lead_big sack -1.18pp pred 5.99%, late comp -3.57pp/inc +2.93pp, not_late comp +1.20pp). INFERRED verdict (evidence-based): the shift is primarily a **state-mix/feedback artifact interacting with GLM smoothing across visited states**, not a uniform per-pass sack bias. The node is class-calibrated to its own probabilities in simulated states, but changing class outcomes changes downstream game states (score, clock/late, down-distance context, possessions/drives), so pass snaps redistribute across buckets where pool cell marginals and GLM conditional probs differ. The report’s 6.4%->7.0% train-to-held-out real-NFL sack-rate drift (REPORTED) is a separate calibration-era concern; the compared 2023–2025 GLM pack is era-fit, and this simulation used matching 2023–2025 packs, so drift alone does not explain the paired in-sim shift. Does this block making GLM default later? **No blocking bias found at this bar; does not block on evidence so far.** It should be characterized and monitored (especially bucket/state redistribution and drive count sensitivity) before a default flip, but the magnitude is small (~1% drives, ~1.7% sacks per team-game, points +0.6%) and within the ~10% totals tolerance.
- **7. Seam and default-off guarantee.** VERIFIED: passclass tests show lambda 0 or gap 0 replays neutral GLM log bit-for-bit (60 games), lambda=1 gives monotonic completion increase and sack decrease with gap (-1,0,1; 300 games), keyed coupling leaves other-node draws unchanged until first tilted pass, and `runGame` without `passClass` equals pools node bit-for-bit. Quick extra check: default-off equality on 20 keys.
- **8. Gates.** VERIFIED: full colors suite 408/408 pass (0 fail) via `node --test --experimental-strip-types`. pmath lint 2/2 pass, pinned 39, no new sim/ calls. UNKNOWN/NOT RUN: `tsc:check` pinned count (claimed 89) not re-established because tsc tooling could not be executed in this environment (see attempts above). Count differs from claimed 406/406 (Glyph observed 408/408 on extracted 65673a00 with Node v26.13.0 and symlinked deps).
- **9. Not done / stated constraints.** VERIFIED by code/pack/report: default remains pools when `passClass` omitted; theta `[0.3,-0.2,-1.0,-0.6]` and lambda `0` in product 2023–2025 pack; only class modeled (yards/detail still sampled from class-restricted pool tuples via `rec` draw/tag path); feature set is 15 with C_REG=1.0 and report states regularisation strength flat (REPORTED detail). Glyph did not fit theta/lambda, did not make node default, did not build yards node.

Verdict (Glyph, independent)
- **Node verified as built:** YES, on executed checks. Implementation/tests/gates I could run are green (passclass 12/12, full suite 408/408, pmath lint clean/pinned behavior, loader/sampler/seam/default-off behaviors, paired comparison reproduction, and shared-tag + passGap mutation catches). Held-out lab-report numerics and tsc pinned check remain un-rerun here due to environment/data/tooling limits.
- **Sacks/drives shift:** VERIFIED reproduced and small/in-bar. State-bucket evidence supports **state-mix/feedback effects with GLM smoothing** (and bucket redistribution) as the main explanation, not a demonstrated systematic pass-level sack bias; GLM predicted-vs-actual alignment in-sim is good overall and by bucket. The 6.4%→7.0% real-world era drift is REPORTED and not the primary driver of this paired in-sim delta given matched-era packs.
- **Blocks default later?** **No, not by itself on current evidence.** Recommend running state-bucket analysis (or a stronger decomposition: per-bucket pass counts × class-rate deltas contribution, and drive-outcome linkage) as a standard pre-default characterization, but current shift magnitude is within tolerance.
- **Re-pin consequence (Owner decision):** engine tip is `65673a00` (past shell pin `5c808472`). This verification does not show a correctness blocker; any move to make GLM default is separate and should weigh the characterized state-mix/drive effects. Decision remains with Owner.

Ledger summary
- VERIFIED: commit/report files read; passclass tests 12/12; full suite 408/408; pmath lint 2/2 with 39 pinned/no sim additions; tsc attempts failed-to-run (tooling unavailable, not a pass); paired glm-bar 12k reproduced with holes 0; state-bucket 12k run with per-bucket rates/preds/counts; default-off/seam/loader/sampler/vector-based claims covered by tests; shared-tag slip reproduced and caught; passGap-ignored mutation caught; pack params/theta/lambda/minClassPool/features/classes and vectors count; not-done constraints by inspection.
- REPORTED: Architect/Beam prior results; report numeric tables (held-out log loss, calibration/deciles, sklearn worst 2.2e-16, 6.4%->7.0% drift narrative, feature-selection protocol detail), and four unplanted mutation implantations.
- INFERRED: shift explanation as state-mix/feedback with smoothing; practical non-blocking assessment for future default consideration.
- UNKNOWN: tsc pinned-result status at this commit in this environment; independent rerun of `passclass.py report` without nflverse parquet data/parquet engine.

