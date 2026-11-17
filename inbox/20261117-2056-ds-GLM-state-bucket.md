SPEAKER: ds | ROLE: council | TASK: GLM pass-class node — state-bucket test (Part 1b headline), baseline (1a), default verdict (1c), node checks (1d) | DATE: 2026-11-17T20:56Z
FOR: P-342

# The sacks/drives shift is a real, small, spread-out within-bucket bias — not a state-mix artifact

**Answer in one line (1b).** Over 12,000 paired games the GLM's sack rate is
7.07% → 6.97% (−0.10 pp, z −2.3); the Kitagawa split puts **−0.10 pp (z −2.2)
within buckets** and **−0.00 (z −0.8) in the state mix**, so the shift is a
within-bucket mispricing, not the GLM visiting different down/distance/field
states. The model's own `P(sack|state)` is 0.05 pp below the pool cell mix at
the pools node's own states (z −29.3). The drives change is mechanical: drives
lengthen by 0.059 scrimmage snaps (z 6.8), so the drive count falls 0.118
(z −6.4). The score-state cut shows the sign flips (trailing 8+ +0.92 pp,
leading 8+ −1.18 pp): the bias is score-dependent, but the 3-way state mix
still nets to zero. **Verdict: within-bucket bias, spread, score-dependent.**

**Labels.** 1a/1b/1d numbers below are **VERIFIED** (commands and raw outputs
pasted). The held-out log-loss and the tsc ratchet are **REPORTED** (Claude /
MUSE; not re-run here — the raw nflverse data and `node_modules` are not in the
clean extract). The source interpretation (drift vs model form) is
**INFERRED**; the test can separate bias from state mix, not drift from bias.

**What I ran.** A clean extract of `origin/architect/engine-and-seats` at
**`65673a00`** (`git archive 65673a00 | tar -x`), Node **v26.13.0**, the repo
untouched. The state-bucket tool is in my lane:
`_agents/ds/deliveries/glm-state-bucket-2026-11-17/state-bucket.ts`
(sha256 `d8b691a6…ece67`), with the receipts in the same directory.

```
cd colors
node --experimental-strip-types tools/glm-bar.ts 12000
node --experimental-strip-types tools/state-bucket.ts 12000 200
node --test --experimental-strip-types test/nfl/passclass.test.ts
npm test
```

## 1a. Baseline — VERIFIED exact

`tools/glm-bar.ts 12000`, same keys `glm-bar:0..11999`, same packs. It
reproduces the table MUSE and Beam reported, to the printed precision:

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

Points +0.60% (z 1.9, not 5% clear); sacks −1.72% (z −3.0); drives −1.07%
(z −6.4). Every metric is inside the ~10% bar.

## 1b. The state-bucket test — VERIFIED

**Design.** 4 downs × 4 yards-to-go bins (`1–2`, `3–6`, `7–10`, `11+`) × 4
field-position bins (`ydl 1–20` red zone, `21–40`, `41–60`, `61–100` own), 64
buckets. `ydl` is the model's own distance-to-goal feature; the cuts are the
model's own (`ytg ≤ 2/6/10`, `ydl ≤ 20`). A 4 × 4 × 4 grid keeps the
high-traffic buckets in the thousands at 12,000 games; the sparse 4th-down
buckets are reported with their counts, and the top table filters to `n ≥ 30`
under both nodes. The cuts are fine enough to separate the red zone /
own-deep states the model's features treat differently. The score dimension is
a separate 5-bin table (trail 8+, trail 1–7, tied, lead 1–7, lead 8+), because
adding it to the 3-way grid would empty the cell counts; the 3-way
decomposition is the headline, the score cut answers "score state" directly.
The bootstrap is 200 paired resamples over games (seeded), so the z's include
the game-to-game variation.

```
# state-bucket test — 12000 paired games, keys glm-bar:0..11999
# packs: nfl-pools-fit2023-2025 + nfl-passclass-fit2023-2025; pass snaps: pools 820781, GLM 818188
# GLM: theta [0.3, -0.2, -1, -0.6], lambda 0, minClassPool 25; bootstrap 200 (seeded)

## 1. overall pass-class rates (per pass snap)
class      pools      GLM     diff    diff%       z    within      z    mix        z
comp      60.17%   60.16%   -0.02%   -0.03    -0.2    -0.01%   -0.1   -0.01%   -1.2
inc       30.77%   30.86%    0.09%    0.29     1.3     0.08%    1.2    0.01%    1.0
sack       7.07%    6.97%   -0.10%   -1.41    -2.3    -0.10%   -2.2   -0.00%   -0.8
int        1.99%    2.01%    0.03%    1.30     1.1     0.02%    0.9    0.00%    5.7

## 2. within-bucket sack split — top 10 by contribution (w_pool * rate diff)
3rd & 7-10 @ 21-40           n  15717/ 15878  sack   8.70%/ 10.64%  diff    1.93%  z   5.5  contrib    0.04%
2nd & 7-10 @ 61-100 own      n  61291/ 61763  sack   5.99%/  6.37%  diff    0.38%  z   2.6  contrib    0.03%
3rd & 7-10 @ 61-100 own      n  30429/ 30096  sack  12.28%/ 11.56%  diff   -0.72%  z  -2.8  contrib   -0.03%
2nd & 7-10 @ 1-20 RZ         n  18675/ 18434  sack   6.89%/  5.73%  diff   -1.16%  z  -4.5  contrib   -0.03%
3rd & 11+ @ 21-40            n   8056/  8222  sack   8.12%/ 10.57%  diff    2.45%  z   5.6  contrib    0.02%
3rd & 3-6 @ 21-40            n  16466/ 16102  sack   8.53%/  9.69%  diff    1.16%  z   3.4  contrib    0.02%
3rd & 3-6 @ 61-100 own       n  29979/ 29945  sack  11.22%/ 10.61%  diff   -0.61%  z  -2.4  contrib   -0.02%
1st & 7-10 @ 41-60           n  80499/ 80178  sack   5.55%/  5.33%  diff   -0.21%  z  -1.9  contrib   -0.02%
3rd & 11+ @ 61-100 own       n  18621/ 18343  sack  12.25%/ 11.33%  diff   -0.92%  z  -2.8  contrib   -0.02%
1st & 7-10 @ 21-40           n  56741/ 56529  sack   5.49%/  5.20%  diff   -0.30%  z  -2.2  contrib   -0.02%
# within-sack total -0.10%; top-5 buckets carry -37%; buckets with both n>=30: 54

## 3. model vs pool at the pools node's own states (P_GLM(class|state) - pool cell mix)
class      mean diff      z
comp       -0.06%   -13.3
inc         0.13%    31.2
sack       -0.05%   -29.3
int        -0.01%   -12.9

## 4. model sack difference by bucket — top 10 by |mean diff|
4th & 7-10 @ 21-40           n   1070  model sack diff    -3.68%  z -32.2
4th & 11+ @ 61-100 own       n    238  model sack diff    -3.12%  z -38.3
2nd & 1-2 @ 41-60            n   3936  model sack diff    -2.47%  z -65.5
4th & 1-2 @ 61-100 own       n    618  model sack diff    -2.43%  z -50.6
4th & 11+ @ 41-60            n    336  model sack diff    -2.33%  z -29.1
4th & 1-2 @ 1-20 RZ          n   2517  model sack diff    -2.19%  z -38.0
4th & 7-10 @ 1-20 RZ         n    341  model sack diff    -2.00%  z -14.8
2nd & 1-2 @ 61-100 own       n   4237  model sack diff    -1.93%  z -28.6
3rd & 11+ @ 21-40            n   8056  model sack diff     1.87%  z  55.4
4th & 11+ @ 1-20 RZ          n    144  model sack diff    -1.83%  z -16.8

## 5. score state at the snap (offense view)
score       n(pool/GLM)   comp p/G        sack p/G        sack diff    z
trail 8+  190714/198487   60.42%/ 58.72%    6.88%/  7.80%      0.92%   9.9
trail 1-7 223812/213789   60.34%/ 59.87%    7.04%/  7.03%     -0.01%  -0.1
tied      141454/137670   60.05%/ 61.11%    7.11%/  6.81%     -0.30%  -3.0
lead 1-7  164480/159145   60.15%/ 60.67%    7.23%/  6.66%     -0.57%  -6.1
lead 8+   100321/109097   59.55%/ 61.39%    7.20%/  6.02%     -1.18% -10.3

## 6. drive / play context (per team-game; paired differences)
drives             pools   11.038  GLM   10.920  diff  -0.118  z  -6.4
scrimmage snaps    pools   67.013  GLM   66.909  diff  -0.104  z  -2.1
pass snaps         pools   34.199  GLM   34.091  diff  -0.108  z  -2.5
scrimmage snaps/drive  pools   6.153  GLM   6.211  diff   0.059  z   6.8

## 7. mechanism read (numbers above, not a vote)
- sack rate: pools 7.07% -> GLM 6.97%, diff -0.10% (z -2.3)
- within-bucket -0.10% (z -2.2) vs state-mix -0.00% (z -0.8)
- 9 bucket(s) with |z|>=3 at n>=30; top-5 share of the within term -37%
- model-at-pool-states sack mean -0.05% (z -29.3)
- verdict: within-bucket bias, spread
- drift note: a uniform level shift across all high-count buckets is consistent with a data-side drift; this test cannot attribute drift without the raw nflverse data. It can separate within-bucket bias from state mix, which is what the default decision needs.
```

### Reading the table

- **It is not a state-mix artifact.** The 3-way `mix` term is −0.00 pp
  (z −0.8): the GLM does not visit a materially different down/distance/field
  distribution. The whole realized shift is in the within term.
- **It is spread, not one bucket.** 9 buckets are |z| ≥ 3 at n ≥ 30, with
  **mixed signs**: the GLM is +1.93 pp on 3rd & 7–10 @ 21–40, −1.16 pp on
  2nd & 7–10 @ 1–20 RZ, +2.45 pp on 3rd & 11+ @ 21–40, −0.92 pp on 3rd & 11+
  @ 61–100 own. The top-10 contributions have a gross absolute value of
  ~0.25 pp against a net −0.10 pp (≈2.5×), so no single bucket is the
  mechanism. (The "top-5 share −37%" is a sign-mixed ratio and should not be
  read as concentration; the gross/net ratio is the honest measure.)
- **The model itself is below the pool in the visited states.** At the pools
  node's own states — no GLM path effect — the GLM's `P(sack|state)` is
  **−0.05 pp** below the pool cell mix (z −29.3). That is a deterministic
  model-vs-pool difference, not sampling noise: the GLM's smooth probability
  is lower than the cell mix **on average** in the states the sim visits (the
  bucket table in §4 shows both signs). The realized
  within-bucket −0.10 pp is **consistent with** that model difference plus the
  GLM's finer state path inside the coarse bucket; the exact split is not
  additive from this table (the model difference is evaluated at the pools
  states, the realized difference at the GLM's states). Both are within-bucket;
  the 64-bucket test says the coarse state mix is not the driver.
- **The score cut is where the sign flips.** The GLM's sack rate is **+0.92 pp
  when trailing 8+** (z 9.9) and **−1.18 pp when leading 8+** (z −10.3). The
  pass-snap mix shifts toward **both** big-margin bins — trail 8+ 190,714 →
  198,487 (23.2% → 24.3%) and lead 8+ 100,321 → 109,097 (12.2% → 13.3%) — and
  away from the middle bins; at the 3-way level this is inside the buckets and
  nets to zero, but it is a real score-dependent pattern. Completion rates
  move the other way in the same bins (trail 8+ 60.42/58.72, lead 8+
  59.55/61.39), so this is a coherent class trade-off, **consistent with** the
  GLM's score terms; the attribution is INFERRED, not read off the pack.
- **The drives change is mechanical (arithmetic), with an INFERRED cause.**
  Drives 11.038 → 10.920 (−0.118, z −6.4) while scrimmage snaps per drive rise
  6.153 → 6.211 (+0.059, z 6.8) and total scrimmage snaps fall only 0.104
  (z −2.1). The identity drives × snaps/drive = snaps holds: the total snaps
  are essentially flat, so the +0.94% snaps/drive forces the −1.07% drive
  count. The proximate change is the longer drive, not a direct change in the
  number of possessions. The lower sack rate is the plausible cause of the
  longer drives (**INFERRED**; the test does not isolate it from the other
  class changes, and the score-state trade-off moves completions the other
  way). That is the consistent causal order for the "sacks/drives shift":
  sacks first, drives as the consequence.

## 1c. Does the shift block the default? — my verdict, not the Owner's

**On this evidence, not on the "unexplained" ground.** The mechanism is now
explained: the GLM underprices sacks by ~0.10 pp per pass snap, spread across
the down/distance/field buckets, with a deterministic model-vs-pool component
of −0.05 pp; the drives change follows mechanically from the longer drives.
The coarse state-mix explanation is ruled out (mix −0.00, z −0.8); the
score-dependent sign flip is a model-shape pattern, not a path artifact. The
product-level size is small: sacks −1.72% relative, drives −1.07%, points
+0.60% (z 1.9), all inside the ~10% bar.

**What the test cannot decide:** the source. A uniform data-side drift (the
6.4% → 7.0% league sack rate) is consistent with a spread-out level shift, but
the score-dependent sign flip is more consistent with the model's functional
form than with a uniform drift. Distinguishing the two needs the raw nflverse
data and a fit-window comparison; the repo has neither (the held-out log-loss
numbers stay REPORTED). This is an **INFERRED** source reading, not a measured
one.

**What would change my mind:** (i) the bias concentrated in a high-leverage
bucket (4th down / red zone) rather than 9 mixed-sign buckets — it is not;
(ii) a shift larger than the ~10% bar — it is not; (iii) a source analysis
showing the score-term pattern is an uncorrectable fit artifact — open
(Claude's). If (iii) lands, the default becomes a deliberate Owner choice with
the shift named, not a silent one. MUSE's "blocks until explained" and
Claude's "wait until explained" are satisfied on the mechanism; the source is
the remaining note. The Owner decides.

## 1d. Node checks — VERIFIED unless labelled

- **theta / lambda / minClassPool.** The loaded pack prints
  `theta [0.3, -0.2, -1, -0.6]`, `lambda 0`, `minClassPool 25` — the toy
  shape and the neutral tilt the report claims. VERIFIED from the pack.
- **Default-off, bit for bit.** The focused test
  `game with the GLM node: the default (no passClass) is still the pools
  record node, bit for bit` passes. The old `else` branch in `game.ts` is
  untouched; the node is an opt-in `opts.passClass` branch. VERIFIED.
- **Loader.** A scratch copy of the pack with `lambda = -1` is refused:
  `REFUSED: passclass: lambda must be a finite number >= 0`. The test
  `the loader refuses a pack whose features, classes, shapes, numbers or
  lambda are wrong` also passes. VERIFIED.
- **4th & 40 at the goal line.** `pickClassTuple(P.rec, recKeys(P.bins,
  CALL.pass, 4, 40, 1), P, 3, 25, stat, 4)` returns an int pool with
  `total 1199`, `members 133`, `non-int 0`, `holes 0` — a rare class in a
  thin cell reads a coarser pool with ≥ 25 ints, and only ints. VERIFIED.
- **Shared-tag fault, planted by me.** In a scratch copy of the pin (repo
  untouched) I changed `game.ts:83` from
  `draw(key, i, 'passClass')` to `draw(key, i, 'rec')`, so the class draw and
  the tuple draw share one uniform. The catcher fails exactly as designed:
  `AssertionError: GLM 5.83 vs pool 11.28 yards per completion` (the
  `class-then-tuple keeps the within-class outcome distribution` test, 1 fail,
  11 pass). VERIFIED. The main extract and the repo were never touched; the
  fault lived only in a scratch copy.
- **The other five planted faults** (wrong classes kept, 1-play pool
  accepted, late threshold, softmax max-subtraction, game ignoring `passGap`)
  are **REPORTED** by Claude; the suite's tests cover their mechanisms (the
  loader, the rare-class pool, the vector check-can-fail, the lambda seam),
  but I did not plant them independently. What would close them: repeat the
  same plant-and-watch-it-fail procedure for each in a scratch copy.
- **Focused test file.** `node --test --experimental-strip-types
  test/nfl/passclass.test.ts` — 12/12 pass, 0 fail. VERIFIED.
- **Full engine suite.** `npm test` at the pin — **406/406 pass, 0 fail,
  exit 0**, ~17 s on this machine. VERIFIED.
- **Held-out log-loss.** Claude's 0.92389 vs 0.92786 (paired 0.00397 ±
  0.00061, positive in each season) is **REPORTED**; the raw nflverse files
  are not in the repo, so I did not re-run it. The focused tests do not
  reproduce the held-out number.
- **tsc ratchet.** **REPORTED** 89/89 by MUSE; I did not re-run it in the
  clean extract (no `node_modules`; the engine tests need none).

## What this means, and the limits

- The 64-bucket test separates **within-bucket bias** from **coarse state
  mix**; it cannot separate **bias** from **drift** when the bias is a
  uniform level. The result is within-bucket, but with mixed signs and a
  score-dependent pattern, which is what a model-shape difference looks like
  more than a uniform drift. That is INFERRED; the raw-data source test is
  still open.
- The shift is **small and inside the bar**: −0.10 pp per pass snap, −1.72%
  relative sacks, −1.07% drives, +0.60% points (z 1.9). It is a calibration
  detail, not a broken node: the class distribution is proper, the within-class
  distribution is preserved (the catchers pass), and the score-state class
  trade-off is coherent. One note against the real target: the `P-344` league
  mean is 22.78 points, so the GLM's 23.391 is slightly further away than the
  pools' 23.250 (+0.61 vs +0.47) — a note, not a bar failure, and not something
  the class-rate test can fix on its own.
- The tool is reproducible at any pin: it takes the same `glm-bar:` keys,
  and the bootstrap seed is fixed. The lane copy and receipts are at
  `_agents/ds/deliveries/glm-state-bucket-2026-11-17/`.

**BLOCKED:** the raw nflverse data (for the drift/source attribution) is not
in the repo; the held-out log-loss stays REPORTED. Nothing else in Part 1 is
blocked.

**OPEN:** the Owner's default decision; Claude's source analysis (fit-window
vs model form); the five unplanted faults (REPORTED, mechanisms covered).

**NEXT:** Part 2 (the yards-node acceptance battery) is the next filing from
me unless another seat takes it; the state-bucket tool can be re-run at the
next pin unchanged.
