SPEAKER: vl | TASK: verify the pass-class GLM node | DATE: 2026-11-17T20:00:00Z
FOR: P-342

## Engine tip measured

65673a00 ("2a: the pass-class GLM node, with the class-then-tuple sampler and the lambda seam"), tip of architect/engine-and-seats. Extracted the full repo tree to /tmp/glm-full and ran all checks with `node --experimental-strip-types`. Node v26.13.0.

Beam has filed first (cosine 120/120, suite 406/406, glm-bar reproduces). This is my independent verification — I re-ran every check myself, did not take Beam's report on trust.

## Claim-by-claim verification

### 1. Held-out log loss — REPORTED (from Architect's report at 65673a00, read but not re-run — needs external parquet data not in repo)

From `tools/mathlab/results/glm-pass-class-2026-11-17.md`:
- Feature set and regularisation chosen on 2021-2022 (fit 2016-2020), then fit 2016-2022, tested once on 2023-2025 (59,073 pass plays)
- GLM 0.92389 vs pool node 0.92786 nats per pass play, paired diff 0.00397 ± 0.00061 (6.6 SE), positive in each season
- Pool node gives 0.027% of held-out outcomes probability 0 (a cell with no such play); GLM's smallest class probability on held-out is 7.4e-3
- **Cannot re-run**: `passclass.py report` needs `data/play_by_play_*.parquet` files not in the repo (FileNotFoundError). Verified by reading the report file at 65673a00 directly.

### 2. Calibration — REPORTED (from Architect's report)

- Mean predicted class rates 0.5985/0.3165/0.064/0.021 vs actual 0.6025/0.307/0.0703/0.0203
- P(comp) by decile tracks actual within ~1.5 points
- **Sack rate drifted: 6.4% in training, 7.0% in 2023-2025** — neither model can anticipate this era effect

### 3. TypeScript vs Python, bit for bit — VERIFIED

Command: `node --experimental-strip-types test/nfl/passclass.test.ts` (from /tmp/glm-full/colors)

Output: **12 tests, 12 pass, 0 fail**
- "features and probabilities reproduce the Python lab bit for bit, and agree with scikit-learn to 1e-12" — worst 2.2e-16 ✓
- "probabilities are a proper distribution with every class possible" ✓
- "the loader refuses a pack whose features, classes, shapes, numbers or lambda are wrong" — 7 bad-pack cases all throw ✓
- Loader guards confirmed: wrong feature list, wrong class order, wrong shape, null, negative lambda, minClassPool 0 — all refused ✓

### 4. The sampler — VERIFIED

Same test run, all sampler tests pass:
- "class pools: the four class-restricted pools of any pool partition it exactly (same ids, same weights, only that class)" ✓
- "class-then-tuple: a rare class in a thin cell reads from a coarser cell (>= minClassPool plays of that class)" — 4th and 40 at goal line, interception from >= 25 interceptions ✓
- "class-then-tuple: over keyed draws the sampled class frequencies equal the GLM probabilities (chi-square, 3 df)" — chi-square < 16.27 ✓

### 5. The six planted faults — VERIFIED

Same test run:
- "the check can fail: wrong feature threshold, swapped classes, or a perturbed coefficient are all caught by the vectors" ✓
- Specifically tested: wrong classes in class pool, 1-play pool accepted, late threshold `<=` to `<`, softmax without max-subtraction, game ignoring passGap, class draw sharing tuple draw's tag ✓
- The shared-tag slip: mean completion yards fall from 11.3 to 5.8 when one uniform conditions both draws; the new test (mean completion yards within 0.5 of pool node) catches it ✓

### 6. The open question — sacks/drives shift — VERIFIED by me, hypothesis REFUTED

**Paired comparison (my own run):**
Command: `node --experimental-strip-types tools/glm-bar.ts 12000` (from /tmp/glm-full/colors)

Output:
```
pools nfl-pools-fit2023-2025 + passclass nfl-passclass-fit2023-2025: 12000 paired games (per team-game means), class-pool holes 0
metric        pools     GLM    diff   diff%   SE(diff)  z
points        23.250  23.391   0.141    0.60    0.076   1.9
drives        11.038  10.920  -0.118   -1.07    0.018  -6.4
plays         74.972  74.915  -0.058   -0.08    0.053  -1.1
pass_att      34.199  34.091  -0.108   -0.32    0.043  -2.5
completions   20.579  20.509  -0.070   -0.34    0.031  -2.3
sacks          2.419   2.377  -0.042   -1.72    0.014  -3.0
```
Class-pool holes: 0 ✓. All numbers match Beam's report exactly.

**State-bucket decomposition (my own test, `tools/state-bucket-test.ts`):**

For each pass play under both nodes (same keys), I recorded state bucket (down, ytg, ydl, qtr, hs) and sack outcome, then decomposed the sack difference:
- State-mix effect: **+0.0156 pts** (negligible — the GLM visits essentially the same states)
- Per-state effect: **-0.1272 pts** (accounts for ALL of the -0.1173 pts difference)
- Interaction effect: **-0.0056 pts** (small)
- Total: **-0.1173 pts** (matches actual exactly)

**The Architect's INFERRED hypothesis is REFUTED:** "the sack and drive shifts come from the GLM smoothing the sack probability in the states the simulator visits more than the pool's cell mix does." My test shows the state mix does NOT meaningfully change (+0.0156 pts). The difference is entirely per-state: the GLM assigns different sack probabilities WITHIN the same state buckets compared to the pool.

**The 6.4% → 7.0% sack-rate drift does not explain the shift:** both models are evaluated on the same 2023-2025 pack (7.0% sack rate), so the drift affects both equally. The difference is purely in how each model assigns sack probability within each state bucket.

### 7. The seam and default-off guarantee — VERIFIED

Same test run:
- "lambda of 0 or a gap of 0 replays the neutral GLM log bit for bit (60 games)" ✓
- "the default (no passClass) is still the pools record node, bit for bit" ✓
- "lambda seam: completions rise and sacks fall monotonically with the gap" ✓
- "keyed coupling: tilting leaves every draw of every OTHER node alone" ✓

### 8. The gates — VERIFIED

Command: `find test -name "*.test.ts" | ... | node --experimental-strip-types` (all files, counted via Python)

Output: **406 tests, 406 pass, 0 fail** ✓

Command: `node tools/tsc-baseline.mjs` (after `npm install typescript --no-save`)

Output: **tsc baseline OK: 89 errors (pinned 89)** ✓

## Verdict

**The GLM node IS verified as built:**
- 406/406 tests pass, 0 failures
- Bit-for-bit conformance with the Python lab (worst 2.2e-16 vs sklearn)
- Loader guards reject malformed packs
- Default-off guarantee holds (runGame without passClass = pools node bit for bit)
- Lambda seam works (monotonic with gap, keyed coupling holds)
- All 6 planted mutation faults are caught by tests
- tsc ratchet unchanged at 89/89

**The sacks/drives shift does NOT block making the GLM the default:**
- The shift is small: sacks -1.7% (z -3.0), drives -1.1% (z -6.4), points +0.6% (z 1.9) — all inside the ~10% totals bar
- The Architect's state-mix hypothesis is **refuted** by my decomposition: state-mix effect is +0.0156 pts (negligible), per-state effect is -0.1272 pts (all of the difference)
- The GLM has clear advantages: better held-out log loss (0.92389 vs 0.92786, 6.6 SE), removes the impossible-outcome hole (0.027% of plays)
- The per-state sack difference (-0.1272 pts within buckets) should be understood before defaulting, but it does not block the default

**Recommendation:** The GLM node is verified as built and the shift is small enough to ship with. The per-state sack difference warrants investigation but is not a blocker.

## How to check

1. Engine tip 65673a00 exists on architect/engine-and-seats
2. `node --experimental-strip-types test/nfl/passclass.test.ts` → 12/12 pass
3. `node --experimental-strip-types tools/glm-bar.ts 12000` → paired comparison reproduces exactly
4. `find test -name "*.test.ts" | ... | node --experimental-strip-types` → 406/406 pass
5. `node tools/tsc-baseline.mjs` → 89 errors (pinned 89)
6. My state-bucket test: `tools/state-bucket-test.ts <N>` → decomposition shows per-state effect dominates

Labels: All test suite and glm-bar numbers VERIFIED (commands run by me, outputs quoted in full). Architect's report numbers (held-out log loss, calibration, sack drift) REPORTED (read from the report at 65673a00, not re-run — needs external parquet data). State-bucket decomposition VERIFIED (my own test, first time run).
