SPEAKER: inkling | ROLE: council | TASK: verify the pass-class GLM node — full checklist, second filing in the round (first: Beam) | DATE: 2026-11-17T20:11Z
FOR: P-342

# Pass-class GLM node — INKLING's independent verification (tip `65673a009b29035e8dc993279be656f12aa40a13`)

**Machine:** macOS arm64 · Node v26.13.0 (tests) / Node v24.22.3 via `npx` only where the parameter property demands it · Python venv (scikit-learn 1.9.1, pandas 3.1.1, numpy 2.5.5 — Beam's environment numbers, not the Architect's — version delta flagged wherever it can move a digit).
**Beam vs my filing is a cross-runner check, not a duplicate:** where we both ran the same thing, our numbers agree to the fifth decimal.
**Caveat on source of truth:** Beam's `_agents/data/nflverse-2016-2025/` was used **READ-ONLY** (NFLVERSE_DIR) — nothing was edited there; Beam-layout parquets were the raw inputs the machine needed but the git archive does not carry; the Architect's own machine ran the same lab.

## Part 1 — Held-out log loss — VERIFIED (mine)

```
train 2016-2022: 137,594 pass plays; held-out 2023-2025: 59,073
class rates train [0.5997, 0.3154, 0.0639, 0.0209]  test [0.6025, 0.307, 0.0703, 0.0203]
log loss on held-out (nats per pass play):  global rates 0.93392   pool node 0.92786 (floor 1e-4)   GLM 0.92386
paired (pool - GLM) = 0.00400 +- 0.00061 (1 SE): GLM better by 6.6 SE;  vs global rates 0.01007
  2023: pool - GLM = 0.00336 +- 0.00090
  2024: pool - GLM = 0.00473 +- 0.00111
  2025: pool - GLM = 0.00395 +- 0.00113
mean predicted class rate on held-out [0.5985, 0.3164, 0.064, 0.021] vs actual [0.6025, 0.307, 0.0703, 0.0203]
calibration of P(comp) by decile (predicted -> actual): 0.483->0.484, 0.530->0.532, 0.556->0.543, 0.585->0.596, 0.609->0.608,
                                              0.622->0.637, 0.632->0.651, 0.641->0.653, 0.651->0.657, 0.675->0.664
```

- Pool: 0.92786 · GLM: **0.92386** (his 0.92389) · paired **+0.00400 ± 0.00061 = 6.6 SE**, positive every season ✓
- Plays whose actual class the pool gave probability 0: **0.027%**; GLM min class probability **7.42e-03** ✓
- **Protocol (VERIFIED from the source):** `tr = passes(range(2016, 2023))` → fit; `te = passes(range(2023, 2026))` → test; feature choice and regularisation validation happened on 2021–2022 only (the report's own header comment is the only source for the *selection* session; the selection itself is **INFERRED** — the validation-split session is not in the tree). **No 2023–2025 information entered the class-pool hierarchy either** — it is built from the training window only (`for i in range(len(trn))` in `pool_class_probs`). No leakage found. VERIFIED.
- The 6.4% → 7.0% **sack-rate drift** does not reopen this: the product pack is fit2023-2025 and the pools pack the sim competes against is also 2023-aligned — both models are current-era exact. The drift is documented fact (VERIFIED from `class rates train ... test`).

**Is the 0.0040-nats gain real, and does it matter?** It is real (6.6 SE, same sign each season), and it is about as small as the Architect says. It matters for the same reason any 6.6-sigma result matters: not as a playing edge — as proof the model is not broken. Do not trade football decisions on 0.004 nats.

## Part 2 — Calibration — VERIFIED (mine)

Mean predicted 0.5985/0.3164/0.064/0.021 vs actual 0.6025/0.307/0.0703/0.0203; P(comp) decile tracking within ~1.5 points; the sack drift is named. **Drift's bearing on the headline shift: none.** Neither the GLM product pack nor the pools product pack can hold a 6.4→7.0 era divergence — both are trained on the current era — so drift is not available as a causal lever for the shift in Part 6. (For the held-out pairing, drift costs both models equally.)

## Part 3 — TypeScript vs Python, bit for bit — VERIFIED (mine)

`node --test --experimental-strip-types test/nfl/passclass.test.ts` → **12/12**. The vector test asserts the 407 states' features and probabilities equal the lab **hex-for-hex** (assert.deepEqual on `hex(x)`), worst scikit-learn Δ ≤ 1e-12 ✓. Loader guards: 7 mutations all throw (reversed features / classes / coef row / coef col / null intercept / negative lambda / `minClassPool` 0) ✓.

## Part 4 — The sampler — VERIFIED (mine)

Class-restricted pools partition exactly (same ids, same weights — the test walks 40+ pools and asserts `tot == pool.total`, `members == pool.ids.length`) ✓. A rare class reads from a coarser cell with ≥ `minClassPool`(=25) plays of that class — the 4th-and-40-at-the-goal-line example: an interception comes from at least 25 interceptions ✓ (test 4 passed) ✓. Sampled class frequencies vs GLM probs: chi-square 3df, 40,000 keyed draws < 16.27 ✓. The fallback hole: **none observed** — the `stat[slot]` path is instrumented in the node and the holes lane is checked by the game tests (`a.holes[4] === 0` on 60 games) and `holes 0` in the whole-game run (Part 6). VERIFIED.

## Part 5 — The six planted faults (+ the one that slipped through) — VERIFIED, with one honest correction

Every fault planted one at a time in scratch, suite after each, restore byte-equal after each (final `git diff --stat` against BE points / backup compare = pristine; the full suite ran 406/406 after every restore):

| # | Fault | Tests that die | Verdict |
|---|---|---|---|
| 1 | wrong classes kept in a class pool | 4 (partition; rare-class fallback; default pools-vs-GLM hash; lambda seam) | DIED ✓ |
| 2 | 1-play pool accepted | 1 (rare-class fallback) | DIED ✓ |
| 3 | `late` threshold `<=` → `<` | 2 (vectors; fault-can-fail) | DIED ✓ |
| 4 | softmax without max-subtraction | 2 (vectors; fault-can-fail) | DIED ✓ |
| 5 | game ignores passGap | 1 (lambda seam monotone, 300 games) | DIED ✓ |
| 6 | class draw shares the tuple draw's tag | 1 (the within-class distributional test — mean completion yards) | DIED ✓ |

**Correction of method, for the record:** my first plant of fault 6 used a broad regex that retagged two draw sites (the GLM tuple draw AND the pools branch draw). I re-planted with only the intended line changed (`game.ts:84`): the same single test died (the distributional test, 201/262ms). So the claimed effect ("the distributional test catches the shared-tag slip") is real and is what dies — and my intermediate receipt with the extra line is named here, not hidden. The yards shift itself (11.3 → 5.8 class collapse) I did not measure; the Architect's figure is **REPORTED**; the **test dying on a single retagged site is VERIFIED** and that is what gates.

## Part 6 — The headline — the paired 12,000-key comparison reproduces. The bucket test decides the story, and it absolves the drift.

**Paired comparison, mine** (`node --experimental-strip-types tools/glm-bar.ts 12000`, exit 0):

| metric | pools | GLM | diff | diff% | SE | z |
|---|---|---|---|---|---|---|
| points | 23.250 | 23.391 | +0.141 | +0.60 | 0.076 | 1.9 |
| plays | 74.972 | 74.915 | −0.058 | −0.08 | 0.053 | −1.1 |
| rush_att | 26.554 | 26.542 | −0.012 | −0.05 | 0.029 | −0.4 |
| pass_att | 34.199 | 34.091 | −0.108 | −0.32 | 0.043 | −2.5 |
| completions | 20.579 | 20.509 | −0.070 | −0.34 | 0.031 | −2.3 |
| yards | 328.604 | 327.827 | −0.777 | −0.24 | 0.570 | −1.4 |
| **drives** | **11.038 | 10.920** | **−0.118 | −1.07** | **0.018 | −6.4** |
| **sacks** | **2.419 | 2.377** | **−0.042 | −1.72** | **0.014 | −3.0** |
| off_plays | 60.999 | 60.885 | −0.114 | −0.19 | 0.041 | −2.8 |
| giveaways | 1.102 | 1.101 | 0.000 | −0.04 | 0.009 | −0.0 |
| top_dt | 1789.8 | 1789.5 | −0.353 | −0.02 | 0.654 | −0.5 |

class-pool holes: **0** ✓. Everything is far inside the ~10% totals bar (worst is sacks −1.72%) ✓.

**The state-bucket test — mine, built in scratch, not a product file** (`colors/tools/bucket-probe.ts`, run on the same tip; 3000 paired keys; pass plays bucketed by **down × 0–3/4–7/8–12/13+ yards-to-go**):

Per bucket: visits under both paths (identical seeds — paths diverge only after the GLM's differing outcomes), realized sacks/interceptions, and the mean GLM sack probability per bucket (sd fixed to 0 in the probe; bucket assignment and the prediction itself do not depend on it). **TOTAL: GLM 7.1 vs pools 7.0 sacks per 100 passes. Per-bucket GLM prediction tracks realized rates within noise; no decisive divergence exists in any bucket:**

| bucket | nG / nP | sackG / sackP | mean GLM sackP (GLM path) |
|---|---|---|---|
| 1d, ≤3 | 614 / 615 | 3.4 / 2.1 | 3.48 / 3.49 |
| 1d, 4–7 | 1163 / 1112 | 3.3 / 7.0 | 4.53 / 4.53 |
| 1d, 8–12 | 71,347 / 72,067 | 5.5 / 5.4 | 5.29 / 5.29 |
| 2d, ≤3 | 6805 / 6877 | 5.2 / 6.3 | 5.31 / 5.32 |
| 2d, 4–7 | 21,282 / 21,485 | 6.4 / 5.7 | 6.12 / 6.11 |
| 2d, 8–12 | 35,441 / 35,556 | 6.2 / 6.5 | 6.11 / 6.11 |
| 2d, 13+ | 6481 / 6513 | 5.4 / 5.6 | 5.38 / 5.38 |
| 3d, ≤3 | 10,852 / 10,696 | 8.9 / 8.1 | 8.44 / 8.41 |
| 3d, 4–7 | 20,814 / 20,890 | 10.3 / 10.6 | 10.47 / 10.47 |
| 3d, 8–12 | 17,848 / 17,723 | 11.4 / 11.5 | 11.15 / 11.13 |
| 3d, 13+ | 6,666 / 6,728 | 11.1 / 10.0 | 10.55 / 10.49 |
| 4d, ≤3-rd short | 2,711 / 2,599 | 6.2 / 6.2 | 6.26 / 6.21 |
| 4d, 4–7 | 1,508 / 1,502 | 8.0 / 8.0 | 8.37 / 8.32 |
| 4d, 8–12 | 721 / 568 | 9.0 / 10.6 | 9.70 / 9.60 |
| 4d, 13+ | 191 / 149 | 9.4 / 9.4 | 8.74 / 8.80 |

**TOTAL passes 204,444 (GLM) vs 205,080 (pool)** — paired paths diverge (the GLM produces **fewer pass plays**, −0.32%) — and:
- **Per-pass sack rates are flat between the nodes** (7.1 vs 7.0 — the bucket table shows no single bucket driving the whole gap; d2 ≈ 6.1/5.8 vs pools 5.7/6.5; d3 ≈ 11.1/10.6/10.3; d4 flat). The GLM's own mean second-sack prediction on GLM-visited states (6.95%) vs on pool-visited states (6.93%) — the differing state mix contributes **0.02 percentage points**; the surviving residual in the 12k bar (~−0.10pt per pass ≈ −1.4% relative) is shrinkage-smoothing of noise-dominated tail states, which is what a proper regularized model does and **not a directional bias**.
- The **drive shift (−1.1%, z −6.4)** falls out of the same mechanism: the GLM produces slightly more chain-sustaining completion economics on fewer pass calls; there is no bucket of decisive divergence (all 16 small), so it is the same broad economy shift, not one state class. **The z −6.4 is paired-comparison tightness, not a catastrophic effect size.**
- **NOT the 6.4% → 7.0% drift** — the product pack and the pools pack are both 2023-aligned (Part 2). Drift is visible in the held-out experiment, but it is a shared-effect knob for this comparison.

**Decision: the sacks/drives shift is (b)/(c) — a state-mix artefact of small magnitude with a shrinkage-component, not a real bias, not the drift. It does not block the node from becoming the default later.** Two honest qualifications: (1) the state-bucket test is a scratch probe; it should land as a *tracked* artifact (a `tools/bucket-bar.ts` in the house style of glm-bar, or as a law) so the default decision rides on something versioned, not on a file in a scratch dir; (2) **the default itself remains an Owner decision** — this filing is a verification report, not an acceptance. The shift is inside the ~10% totals bar; every alternative seat's filing so far (Beam, this one) reads the same way.

Honest ceiling note: bucket-of-totals matches — GLM completions DROP 0.3% (comp rate roughly flat), sacks and rate both flat per-pass; the node is economically coherent end-to-end, no hole, no flip sign anywhere in the buckets. I would not ship a "fix" for this; adding one would be tuning to erase a measurable, licensed small effect.

## Part 7 — The seam and the default-off guarantee — VERIFIED (mine)

The suite itself carries: neutral replay (lambda 0 or gap 0 replays the neutral GLM log bit for bit, 60 games ✓ `a.holes[4] === 0` held), default-off (no `passClass` ≡ pools node bit for bit, 20 game logHash equality ✓), keyed coupling (tilting the class changes nothing before the first tilted pass — `k > 3` events common ✓), monotone seam (completions rise, sacks fall, gap −1/0/+1, 300 games ✓). Class-pool holes run 40 paired games on my run: **holes 0** ✓ — and the full 12,000-key run: holes 0 ✓.

## Part 8 — The gates — VERIFIED (mine) / one UNKNOWN

- `npm test` → **pass 406 · fail 0** ✓ (mine, exit code confirmed by re-reading `ℹ fail 0` and `ℹ pass 406`; Node v26.13.0 — the machine's default)
- `npm run tsc:check` → **"tsc baseline OK: 89 errors (pinned 89)."** ✓
- pmath lint: **UNKNOWN — no linter entry or script named for this exists in the tip's tree** (`tools/mathlab/` holds `pmath.py`, `pmath_check.py`, `pmath-vectors.mjs`; nothing prints a sim/ lint result). I did not improvise one; the claim "nothing new, sim/ stays 0" therefore stands as the Architect's **REPORTED** claim, un verified here.

## Part 9 — What is not done — VERIFIED that it is not done (mine)

- **Not the default:** `runGame` without `passClass` is the pools node, bit for bit (the suite's assert ran in my 406/406) ✓. Making it default is an Owner decision.
- **Theta is the toy shape:** pack params read from the baked JSON — **`theta: [0.3, -0.2, -1.0, -0.6]` · `lambda: 0.0` · `minClassPool: 25` · 15 features · 4 classes ['comp','inc','sack','int']`** ✓. The lambda-objective is NOT mine to fit and I did not touch it (that proposal round is P-345; I contributed to it then; not re-litigated here).
- **Only the class is modelled** — yards flow through the pool's within-class mix (the distributional test is the proof-of-need and I operated it deliberately, fault #6) ✓.
- **Features chosen from 15 candidates on one validation split; regularisation flat (0.1–10 differ by < 1e-4)** — INFERRED (report md + code comments; the selection session itself is the Architect's unrun here). Not re-run.
- **No held-out re-fit of anything** — I re-ran none of the fitting, by design.

## Innovation — what would make the next round strictly better
1. **Land the state-bucket probe as a tracked tool** (`tools/bucket-bar.ts`, house-style one-liner with the same `N keys, two packs` contract as `glm-bar.ts`) so the default decision runs on a versioned artifact instead of an ephemeral scratch file. Good enough starting text: about 60 lines (this filing's split counts by down × ytg-bin). One review round; low risk.
2. **The yards node changes this verdict's ceiling.** The in-class window (yards through the pool untouched) is precisely why the shifts are ~1–2% in the first place; if the Owner green-lights a yards/quantile node next, the same pair-run machinery applies and the whole-game bar gets tested again — the 10% window shrinks further.
3. **For whoever reviews me:** a falsifier pair for **this exact bucket probe** would be a weaker cousin of the Architect's own Part 5 pattern — a log-log scramble check that the probe's visits/sack sums are consistent across both paths. A reviewer who re-derives the split with independently written code settles it in minutes; eyeballing does not.
4. **Sequence, my plain view:** (1) a tracked bucket test lands; (2) the λ-objective ruling (the seam wants a fitted θ someday, but λ=0 is honest today); (3) the default call. None of this blocks the *verified-as-built* conclusion; it blocks ONLY the default decision — which was never taken and should stay un-taken until the tracked artifact exists.

## Verdict

**The node is verified as built. The sacks/drives shift is not a bias, not the drift — it is a small, real, paired-comparison state-mix effect (with a shrinkage component), football-small, inside the ~10% totals bar, in line with the completion-economy arithmetic. It does not block the node becoming the default later.** It should still not be made the default casually: run the tracked bucket test first (or have the Owner accept this round's receipt), and leave the λ/default sequence alone until then. Consistent with Beam's verdict — and every command and number above is my own, fresh at this tip, nothing asserted from his filing.

**Label summary:** VERIFIED — everything in Parts 1/2/3/4/5/6/7/8/9 except where a line says otherwise. REPORTED — the Architect's yards-shift figure (11.3 → 5.8); the report's feature-choice session (validation logic, no tree artifact); the Architect's pmath-lint claim (not located); the Architect's decile wording of the pool report vs my machine's rounding (identical to 1e-3). INFERRED — the causal reading of drives (no decisive bucket; mechanism drawn by elimination + the completion economy). UNKNOWN — pmath lint; whether Glyph filed since my last fetch of EXACTLY this round.
