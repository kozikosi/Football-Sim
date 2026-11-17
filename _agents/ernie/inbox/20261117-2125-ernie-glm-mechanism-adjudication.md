SPEAKER: ernie | ROLE: council | TASK: adjudicate the GLM sacks-shift mechanism | DATE: 2026-11-17T21:25Z
FOR: P-342

**Commit tested: `65673a00`** (`architect/engine-and-seats`), both 2023–2025 packs, node v26.13.0, macOS arm64. **12,000 paired keys `glm-bar:0..11999`.** Every number below was run by me with code I wrote for this filing; `tools/bucket-bar.ts` is the tracked version and its output is the receipt. Raw: `_agents/ernie/deliveries/glm-passclass-2026-11-17/{receipt-bucket-bar,receipt-calibration}.txt`.

**One-line answer: Camp A is right — it is a per-state rate effect — and Camp B's redistribution is real but is the rate effect's shadow, not its cause. But the deeper answer neither camp reached: the shift is a generalisation gap. On the pack the class model was fit on the shift is −0.0024 points (zero); it is −0.0998 only out of sample. Ernie's residual is also partly wrong in its own framing: the 1.4% is real in the mean but it is not "the same sign every game" — 44.3% of games have the GLM below the pools node.**

---

# 1 · Reproducing both camps, with my own code

My Kitagawa–Oaxaca is written from scratch (not a re-run of `decomp.mjs`): the engine is run twice per key, each pass play is re-derived from the `snap` event, and the decomposition walks the cells directly. The tool below is that code, versioned.

**Aggregate — reproduces everyone exactly (VERIFIED):**

```
pass plays  pools 820781   glm 818188
sacks       pools 58048    glm 57048
sack rate   pools 7.0723%  glm 6.9725%   difference -0.0998 points   SE 0.0283 / 0.0282
```

**Camp A's decomposition — reproduced (VERIFIED).** At Ernie's bucketing (down × ytg-bin × side × score-bin; 140 non-empty cells of the 160 possible):

```
rate effect  -0.0970 pp  (97.1%)      mix effect  -0.0029 pp  (2.9%)
```

vs Ernie's −0.0965 / −0.0033. The small difference is cell definition (he counts 160 cells, I count 140 non-empty; his `side` and mine agree). **Camp A stands: 97/3.**

**Camp B's decomposition — reproduced (VERIFIED).** Glyph's score-bucket table, my run:

| bucket | n_pools | n_glm | share_pools | share_glm | rate_pools | rate_glm | diff (pp) |
|---|---|---|---|---|---|---|---|
| trail-big | 176,911 | 184,204 | 21.554% | 22.514% | 6.890% | 7.846% | **+0.956** |
| trail | 217,600 | 209,167 | 26.511% | 25.565% | 7.027% | 7.083% | +0.056 |
| tied | 180,376 | 175,455 | 21.976% | 21.444% | 7.127% | 6.774% | −0.353 |
| lead | 156,800 | 152,029 | 19.104% | 18.581% | 7.177% | 6.640% | −0.537 |
| lead-big | 89,094 | 97,333 | 10.855% | 11.896% | 7.251% | 5.960% | **−1.291** |

Glyph reported trail-big +0.92 and lead-big −1.18 with different counts (190,650 → 198,474 and 100,321 → 109,097 — his bucket edges differ from mine). **Direction and magnitude reproduce; the exact counts depend on where he cuts "big".** The redistribution is real: **7,293 more pass snaps in trail-big and 8,239 more in lead-big** under the GLM.

So both camps are reporting real measurements. The question is which one is the *cause*.

---

# 2 · The exact point where the camps differ — and the number that decides it

**It is the bucketing, and specifically whether the bucket is upstream or downstream of the outcome.**

Glyph's buckets are **score state**. Score is *produced by* the plays — it is downstream. Conditioning on a downstream variable and then finding a rate difference inside it is circular: you are measuring the outcome's effect on the state, not the state's effect on the outcome. That is why trail-big shows +0.96 pp and lead-big −1.29 pp — those are the *consequences* of the GLM producing slightly different outcomes, sorted by the score those outcomes helped create.

The engine's own `rec` cells — `(call, down, distBin, ydlBin)` — are **upstream**: they are the sampler's actual input, computed from the pre-snap state. That is the correct control.

**The decisive table (VERIFIED):**

| bucketing | cells | rate effect | mix effect |
|---|---|---|---|
| down only | 4 | −0.0987 pp (98.9%) | −0.0011 (1.1%) |
| down × score-bin | 20 | −0.0984 (98.6%) | −0.0014 (1.4%) |
| down × ytg × side × score (Camp A's) | 140 | −0.0970 (97.1%) | −0.0029 (2.9%) |
| **the engine's own rec cell** | 323 | **−0.1000 (100.2%)** | +0.0002 (−0.2%) |
| engine cell × ytg-bin | 408 | −0.0996 (99.8%) | −0.0002 (0.2%) |
| **engine cell × score-bin** | 1,587 | **−0.0997 (99.9%)** | **−0.0001 (0.1%)** |

**The last row is the number that decides it.** Add score state to the finest control and the mix effect does not grow — it goes to **0.1%**. If the feedback loop Glyph describes were the cause, controlling for score would have absorbed the rate effect and the rate column would have collapsed. It does the opposite.

**Sample size is not the issue either.** Inkling used 3,000 keys (4× the noise of 12,000); his "state-mix contributes 0.02 points" is consistent with my 0.0001 at fine cells — the same answer, less precisely measured. Camp B is not wrong about the *existence* of redistribution; it is wrong about it being the *mechanism*.

**Verdict: Camp A. The shift is a per-state rate effect.** Camp B's feedback redistribution is real (7,293 and 8,239 snaps moving) but it is a **consequence**, and it explains the per-bucket patterns Glyph found without being their cause. Both are partly right, and the split is: rate effect = 99.9%, feedback redistribution = 0.1%.

---

# 3 · Ernie's residual question — and a correction to Camp A's own framing

**First, the test neither camp ran, and it reframes the whole question (VERIFIED).** The 2016–2022 packs are the ones the class model was **fit on**; 2023–2025 is held out. Run the same probe on the *training* packs:

```
$ node --experimental-strip-types colors/tools/bucket-bar.ts 6000 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022
pass plays  pools 430572   glm 430124
sack rate   pools 6.3989%  glm 6.3965%   difference -0.0024 points   SE 0.0373 / 0.0373
```

**In-sample the shift is −0.0024 points — statistically indistinguishable from zero (−0.06 SE).** Out of sample it is −0.0998 (z −3.0). The 6.40% → 7.07% rise between the two packs **is** the drift, measured directly, and the GLM sits almost exactly on the pools node in the pack it learned and ~0.10 points below it in the pack it did not.

**So the first-order answer is not "rate vs mix" at all — it is a generalisation gap.** Both camps are decomposing a second-order effect. That does not make their decompositions wrong; it makes them incomplete. The rate-vs-mix question is settled (Camp A, §2), but the *reason there is a rate effect to find* is that the model is being judged out of sample, and the rate effect is what an out-of-sample bias looks like once you condition on the state.

**This also corrects my own earlier "drift explains ~15%".** That was computed as the gap between a hypothetical 6.4% and the measured 7.07%. The cleaner measurement is the one above: in-sample 0, out-of-sample −0.10. The drift is not a small contributor to the shift — on this evidence the shift **is** the drift's out-of-sample shadow. I withdraw the 15% figure as the wrong way to size it.

**Is the 1.4% relative sack under-prediction real?** Yes in the mean: 0.0998 / 7.0723 = **1.41%**. But **Camp A's sentence "systematic, the same sign every game" is wrong, and I am correcting my own earlier filing.** Measured per game (VERIFIED):

```
games where GLM > pools: 5143   equal: 1537   GLM < pools: 5320
share of games with the GLM below the pools node: 44.3%
mean per-game difference: -0.0975 points, max |diff| 20.54
```

**44.3%, not 100%.** The mean shift is real (z = −6.4 on the mean, because the per-game noise is large and the mean is estimated over 12,000 games); the per-game sign is close to a coin flip. So the honest sentence is *"a small negative mean shift with large per-game variance"*, not *"systematic, the same sign every game"*. The second is what made the residual sound like a defect.

**Is it a calibration problem?** Mostly no (VERIFIED):

```
GLM predicted sack probability (mean over the pass plays it faced): 6.9419%
GLM realised sack rate:                                         6.9725%
pools realised sack rate:                                       7.0723%
calibration gap (predicted - realised):                         -0.0305 points
model vs pools (predicted - pools):                             -0.1304 points
```

The model is well calibrated to **itself** (−0.03 pp). The whole shift is that its *input* probability sits 0.13 pp below the pools' empirical rate. That is a **specification gap in `theta`**, not a coding bug — expected, because `theta = [0.3, -0.2, -1.0, -0.6]` is a toy shape, not fitted.

**Does it need one more pass on the sack class before the default?** My answer: **no, not as stated, and a "pass on the sack class" is the wrong frame.** What would fix it is fitting `theta` — which is already the Architect's stated plan and is not a "pass on one class". 0.042 sacks/game is ~0.7 sacks per team-season; it is a bias you state and accept, not a reason to hold the node. **For game-level play I agree with Ernie: invisible.** What would change my mind: a fitted `theta` that *still* leaves a >1% relative sack gap on the held-out pack — that would point at a missing feature rather than a missing fit. **The in-sample result above sharpens this: the model already reproduces the pools node on its training pack, so the fix is exactly "fit `theta` on the training pack and re-measure on 2023–2025", and nothing else.**

**The thing that should actually block the default is not this.** It is the 4th-down cell-selection artifact I filed at 21:01Z (`inbox/20261117-2101-ernie-glm-driveshift-mechanism.md`): the class-restricted sampler leaves the down-aware cell on 92% of 4th-down pass plays, so a 4th-down incompletion fails to end the drive. That moves *drives*, not sacks, and it is a mechanism error rather than a calibration gap. This adjudication and that one agree, not compete: the sack shift is Camp A's rate effect (mostly downs 1–3, see below), and the drives shift is the coarse-cell artifact.

**Where the sack shift actually sits (VERIFIED, Layer 6):**

| down | share of GLM pass plays | contribution to the −0.0998 pp |
|---|---|---|
| 1 | 35.86% | −0.0268 |
| 2 | 34.26% | −0.0420 |
| 3 | 27.33% | −0.0125 |
| 4 | 2.55% | **−0.0181** |

**Downs 1–3 carry 81% of the sack shift.** 4th down carries 18% — real, but not the story for sacks (it *is* the story for drives). Per-down sack rate: 1st 5.387→5.312 (−1.39%), 2nd 6.092→5.969 (−2.01%), 3rd 10.433→10.387 (−0.44%), 4th 7.920→7.211 (−8.96%).

**One more measured fact the two camps both missed (VERIFIED).** Among the GLM's plays, those the sampler sent to a coarse cell are overwhelmingly sacks:

```
L0  755567 plays (92.35%)   sack rate  5.153%
L1   41867 plays ( 5.12%)   sack rate 23.393%
L2   18197 plays ( 2.22%)   sack rate 41.078%
L3    2557 plays ( 0.31%)   sack rate 32.929%
```

That is ~18,100 of the GLM's 57,048 sacks (32%) arriving through 7.65% of its plays. The fallback is **not class-neutral** — a fine cell rarely holds 25 sacks, so sacks fall back far more than completions do. That is the same mechanism as the 4th-down artifact, seen from the sack side.

---

# 4 · §5 proposal — land the probe as `tools/bucket-bar.ts`

**Target build:** the next commit on `architect/engine-and-seats` after `65673a00`.
**WHERE:** new file `colors/tools/bucket-bar.ts` (sibling of `colors/tools/glm-bar.ts`). No existing file changes. It imports only `../src/core/pack.ts`, `../src/core/keyedrng.ts`, `../src/core/at.ts`, `../src/sports/nfl/sim/{pools,passclass,game}.ts` — no engine edit, no test change.
**Old → new:** new file. Full text is at `_agents/ernie/deliveries/glm-passclass-2026-11-17/bucket-bar.ts` (I ran it; do not take my word for the contents, take the receipt).
**WHY:** the default decision should ride on a versioned probe, not on scratch files in five seats' lanes. This is the adjudication in one command: it prints the aggregate, the decomposition at six bucketings, the score redistribution, the per-down split, the level split, and the contribution table. Its verdict rule is in its last two lines: *if the rate column stays near 100% as the bucketing gets finer — especially at the engine cell × score-bin — the shift is a per-state rate effect and the score redistribution is its consequence, not its cause.*
**SAFE ALONE? Yes.** A report, not a gate: it exits 0 whatever it prints, changes no engine file, and `npm test` is untouched. Same contract as `glm-bar.ts` (N keys, two packs, same key under both nodes).
**HOW TO CHECK:**
1. `node --experimental-strip-types colors/tools/bucket-bar.ts 12000` — must print `sack rate pools 7.0723% glm 6.9725% difference -0.0998 points` and, at `engine rec cell x score-bin`, `rate -0.0997 pp (99.9%) mix -0.0001 pp (0.1%)`. Any other numbers are a finding.
2. `node --experimental-strip-types colors/tools/glm-bar.ts 12000` — must still print the agreed table (points +0.60%, drives −1.07%, sacks −1.72%, holes 0). The tool does not touch it.
3. `npm test` — must stay **406/406**.
4. Runtime: ~24 s on this machine (node 26, 12,000 games × 2 nodes).

**4.1 The check-can-fail for the tool itself — RUN, and it passes (VERIFIED).** The vacuous-gate failure mode is a decomposition that prints 100% no matter what. Falsifier: run it on the 2016–2022 packs, where the total difference is ~0. It prints **rate 271%, mix −171%** at the finest bucketing — not 100%. The decomposition responds to the data rather than pinning. Receipt `receipt-falsifier-2016-2022.txt`. This is also the in-sample measurement in §3.

---

# 5 · What I did not check

- **The 2016–2022 packs** — I ran them only as the §4.1 falsifier (6,000 games), not as a full held-out comparison. The per-down table for them is in the receipt.
- **Inkling's and Glyph's actual scripts** — I reproduced their *numbers* from my own code and the prompt's statement of their method; I did not read their files. If either used a different score-bucket edge, the counts in §1 will differ (they do).
- **The six planted faults, the held-out log loss, the lambda seam** — not re-run; the node is REVIEWED and I did not re-verify it.
- **Whether fitting `theta` would close the 1.4%** — I did not fit anything (and must not). It is a prediction, not a measurement.
- **The claim that score is "downstream"** — that is a structural argument about the engine (`score` events are emitted from plays, `game.ts:135`), not a statistical test. The statistical test is the last row of §2, which does not depend on the argument.

---

BLOCKED: nothing — the tool text, the receipt and the commit are all in my lane.
OPEN: the Owner's decision on the GLM default, which this filing says should wait on the 4th-down fix (21:01Z), not on the 1.4% sack residual; whether the Architect wants the §4.1 falsifier run before landing.
NEXT: (1) the Architect lands `tools/bucket-bar.ts` and I verify §4 HOW TO CHECK including the 2016–2022 falsifier; (2) the 21:01Z fix (bound the class-restricted walk by the pools node's level) is still the top item — I will re-run bucket-bar after it and expect the L0 share to rise and the L1–L3 sack rates to stop carrying 32% of sacks; (3) the yards-node acceptance battery (Part 2 of the round prompt) is still unfiled by me.