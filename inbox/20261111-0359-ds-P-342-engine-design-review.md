SPEAKER: DS | ROLE: Council (reviewer) | TASK: Review Claude's engine design (one play-level event-sourced model) + toy kernel (P-342) | DATE: 2026-11-11 03:59 UTC
FOR: P-342
REVIEW-OF: origin/architect/engine-and-seats `a0ddc584` — `tools/mathlab/results/engine-design-2026-11-11.md` (164 lines) + `tools/mathlab/toykernel.mjs` (165 lines). Same artifact MUSE reviewed under P-341 (`inbox/20261111-0120-muse-P-341-claude-design-review.md`, verdict ok). This is the second review for P-342; it does not re-check MUSE's items beyond a spot confirm.

# Review: Claude's engine design (P-342)

**VERDICT: improved.** The diagnosis, the shape and the delivery order are right, and the toy kernel reproduces. My amendments are in the gates, the estimator, and **the unit the solver prices in** — not in the direction. Four defects (shown), three risks, two calibration questions, one product gap. The Owner should approve the direction and Phases 0–1 **with the amended Phase 1 gate (I1 below)**: as written, that gate cannot pass at lambda = 0, and it would be read as the engine failing.

## What I ran

All from a read-only `git archive origin/architect/engine-and-seats` in the OS temp dir. No engine or product file touched.

| command | result |
|---|---|
| `node tools/mathlab/toykernel.mjs` | reproduces Claude's filed output exactly |
| `find colors/src/sports/nfl/engine -name '*.ts' \| xargs wc -l` | **2,376**; `colors/src/core` **382**; total **2,758** (MUSE's figure, confirmed) |
| `grep -n` for `10.8`, `/5.15`, `PT_*`, `BASE_PTS`, `softCap`, `PERS`, `PERS_REC`, `DL5_SHARE`, `DIME_W` | all present, as §2 says |
| `sed -n` `margin.ts` header, `boxscore.ts` shares, `drives.ts` functions | `realise` (88), `decompose` (100); `CARRY`/`CARRY_RZ`/`TARGET`/`TARGET_RZ`/`YPR` static tables (89–93); margin quantile coupling + OT rate 5.88% target |
| `node p342-branchtest.mjs` (patched toy, N=20,000 pairs) | **new**: the keyed scheme couples a policy branch |
| `node p342-ident.mjs` (32-team synthetic, 20,000 leagues) | **new**: dispersion matching overstates lambda +23% to +75%; regression is unbiased |
| ARTIFACTS | `_agents/ds/tools/p342-branchtest.patch` (104-line diff vs `toykernel.mjs`), `_agents/ds/tools/p342-ident.mjs` |

## Verified (correct)

### 1. The toy kernel reproduces exactly
My run: solver value **0.3722**, d/d(pass gap) **0.16358** (sweeps 188/190/202, 20.6 s); simulator mean **0.3794 ± 0.0116**, **z = 0.62**; unpaired 0.16630, sd 0.03202 (1.0×); paired sequential 0.16135, sd 0.01837 (**3.0×**); paired keyed 0.16611, sd 0.01633 (**3.8×**). Identical to the filed `toykernel-2026-11-11.txt` and to MUSE's run. The solver and simulator are one model; the pairing claim holds.

### 2. The §2 code claims verify from source
Engine **2,758 lines** (2,376 engine + 382 core). `drives.ts` realises totals first (`realise`) and splits points (`decompose`); `margin.ts` is a quantile coupling to a real margin pmf (its header states the old engine had overtime in 3.3% of games vs a 5.88% target and no 3/7 clustering); `matchup.ts` is a log-linear model over the 9 channels with `softCap` (line 29, used 87–91); the 10.8 drives / 5.15 yards-per-play / PT_* constants are in `drives.ts`/`specs.ts`; `boxscore.ts` allocates with static `CARRY`/`TARGET`/`YPR` tables. Every §2 claim is **VERIFIED**.

### 3. NEW — the keyed scheme couples a genuine policy branch, not just a parameter bump
The design claims a counterfactual "shares randomness with the original wherever the situation matches", but the toy only tested a gap perturbation. I patched the author's toy (policy threshold as a parameter) and measured the *same key* across two worlds that differ only in policy:

| case | corr(coupled) | var(diff) coupled / unpaired | ratio |
|---|---|---|---|
| gap ±2 (the design's test, N=20k) | 0.768 | 12.54 / 55.00 | **4.39×** |
| 4th & ≤6 vs ≤2 (small branch) | 0.840 | 8.63 / 54.73 | **6.34×** |
| always go vs never go (large branch) | **0.666** | 18.03 / 54.55 | **3.02×** |

Unpaired corr is −0.01 in every row (sanity). So the counterfactual-replay claim survives a real branch, which is stronger than the design's own evidence — good news for the §14 IDEA. Caveat (INFERRED): the functional is one chain to the next score, N=20,000 pairs, one key stream; a full-game functional has more divergence opportunity, so 3.0× is an optimistic ceiling for counterfactual pricing, not a floor. My 4.39× and the design's 3.8× agree within the ~18% sampling error of a 60-replicate variance estimate (`sqrt(2/59)`).

## Findings

### D1 (defect) — the solver prices expected points; the flex table is in wins
The toy's state is `(down, distance, yard line)` with **no score and no clock**, and its value is *net points to the next score*. The design then says the solver gives "the exact price of a rating point at a slot". But every number the flex table is judged by is in **wins** (`slotWins20`, "0.63 wins lost", the 2/6/12 tiers). Two conversions are missing and unstated: **EP → win probability** (needs score/clock state, or a margin model — exactly what `margin.ts` was) and **per game → per season**. The design flags "pricing on expected points ignores late-game policy" (§12), but the gap is larger than late-game policy: EP is not wins. **Fix:** extend the chain to a game state (score, clock, possession; still small if discretised) or state that the solver prices in points and the win conversion comes from paired Monte Carlo (my §3 test shows that is efficient).
Same section, second half: the "exact price" is stated as a **derivative** ("derivative of expected points with respect to any duty gap, and so the exact price"). A slot move is a **finite** change to the duty vector *and* to personnel; the second-order term can cross a 2/6/12 tier boundary. **Fix:** compute the flex price as a finite difference — two solves on the two lineups — and keep the derivative only as a linearisation check. This is cheap in the solver and it removes the one place where "exact" is doing work it has not earned.

### D2 (defect) — the Phase 1 margin-pmf gate cannot pass at lambda = 0
§9 Phase 1: "all lambda = 0: neutral rosters must reproduce real league distributions … Gate: the totals bar." §8's totals bar includes "margin pmf passes a goodness-of-fit test on held-out seasons". With lambda = 0 **every team is identical**, so the simulated margin pmf contains only within-game variance; the real pmf also contains the between-team quality component. A GoF test at 272 games × seasons will reject, and the design's own §8 macro list ("season win spread, parity") already knows that quantity needs lambda. This is a gate that fails by construction, and it would be read as "the engine does not work". **Fix (I1):** Phase 1 gates mean-level totals and the **scoring grammar** (tie rate, the exact-3 and exact-7 margin spikes — the things `margin.ts` existed to patch); the unconditional margin pmf GoF moves to Phase 2, on the equal-team conditional (fit team effects to real margins, compare residuals).

### D3 (defect, algebra) — lambda and theta are not separately identified
The formula is `softmax_k[ a + Σ_c λ_c·θ_{ν,k,c}·g_c ]`. For any channel c, `(λ_c, θ_{·,·,c}) → (αλ_c, θ/α)` leaves **every probability unchanged**. θ is described as "prior, re-estimable", so only the *product* is identified from data, and "about 12 numbers" is true only if θ is frozen. If θ is re-estimated it is a nodes × outcomes × 9 array, i.e. ≫ 12 parameters for 32 team-clusters. **Fix:** freeze θ at the prior while λ is estimated; normalise `Σ_k θ_{ν,k,c} = 1` per node/channel if θ is ever re-estimated; report λ as conditional on θ.

### D4 (defect, measured) — dispersion matching overstates lambda by 23–75%
The design's stated estimator is dispersion matching: "real team-level spread of that channel's outcome vs the spread of team duty gaps in the Madden data". That form attributes the **residual** variance (opponent, scheme, luck, the other channels) to the ratings. A 32-team synthetic with a known λ = 1 and Var(g) = 1, 20,000 leagues:

| residual share of variance | dispersion matching | regression Cov/Var |
|---|---|---|
| 33% | **1.232** (+23%) | 1.002 (sd 0.132) |
| 50% | **1.427** (+43%) | 1.002 (sd 0.186) |
| 67% | **1.751** (+75%) | 1.003 (sd 0.263) |

Consequence: λ too large → star players overvalued → the MEASURED curve is too steep and the flex prices too big. **Fix:** estimate λ by the same-moment regression `Cov(y,g)/Var(g)` (unbiased, same data, one line), or use dispersion matching **in its simulated form** (match the simulated total spread, which includes the model's own noise). The doc's wording points at the analytic form; say which is meant. Caveat: with OVR as a noisy proxy for duty skill, `Cov/Var` attenuates — correct by the reliability ratio, or label the dials "OVR-conditional".

### D5 (risk) — no macro/season calibration gate before cutover
§8 lists macro gates (season win spread, parity, roster-quality → win slope); §9's phases gate none of them: Phase 1 totals bar, Phase 2 properties + Owner review, Phase 3 snap shares, Phase 4 second sport, Phase 5 cutover. The Lab's existing anchors (47% playoffs / 6% SB at N = 300 — REPORTED, queue/MUSE) appear in no gate. A play-level engine can clear the totals bar and still produce a season where roster quality does not buy wins, and cutover would ship it. **Fix (I2):** add a macro gate before cutover — N = 300 skilled-drafter seasons, report playoffs/SB/title rates, win spread, parity and the roster-quality slope against the anchors; the Owner accepts or rejects the delta.

### D6 (risk) — the Phase 0 adapter must re-implement the allocator it is meant to replace
§9 Phase 0: the legacy provider "emit[s] the new event schema"; gate: "the adapter reproduces today's box scores for seeded games." Today's box score is produced by `boxscore.ts`'s static `CARRY`/`TARGET`/`YPR` shares (VERIFIED 89–93). If the event schema is per-play, the adapter must fabricate play events that fold back to those allocations — i.e. re-implement the allocator inside the adapter. The gate then tests a duplicate allocator, not the kernel, and the fabricated plays can leak into later accuracy claims. **Fix (I3):** allow `granularity: 'drive'` events for the legacy provider (`source: 'legacy'`), gate schema conformance + fold equality, and start per-play emission at Phase 1.

### D7 (product gap) — PLAN_K is retired before its replacement exists
§10 retires "PLAN_K authored costs"; the mechanism that replaces the plan trade-off ("predictability emerges … leaning on the run raises the defense's run weight") is a §14 **IDEA**, not a node. If Phase 5 lands without it, the plan choice becomes free and the Owner-visible trade-off disappears (the UI survives as "biases on the policy"; the cost does not). **Fix:** promote the belief-state mechanism to a Phase 1–3 node, or keep an authored plan cost through cutover.

### D8 (claim) — "one formula for every sport" is not what §7's table says
§3 claims one formula — a softmax — for "every sport, every contest node". §7 maps hockey to "continuous-time competing risks" (a hazard) and soccer to a "bivariate-Poisson-style closed form" — different likelihood links. The unified object is the **duty-gap linear predictor plus a per-node link**, not one formula. If the kernel hardcodes softmax, hockey needs a kernel change, which fails the Owner's portability test. **Fix:** the node spec carries `link: 'softmax' | 'hazard' | 'poisson'`.

### D9 (calibration question) — penalties off vs "real league distributions"
The Owner wants penalties off; §5 fits the baseline on penalty-free plays; §8 compares to "real league distributions", which include penalties. Removing penalties changes the down/distance mix and drive length, so the 1% points bar is measured against a counterfactual that does not exist in nflverse. **Fix:** define the reference explicitly — real totals adjusted for the measured penalty effect, or the penalty-free league with the bar widened — or the baseline silently absorbs the difference and the 1% means nothing.

### D10 (calibration question) — softCap's behaviour returns as softmax saturation
§3: "probabilities saturate on their own, so the softCap hack disappears." Mechanically true; but `matchup.ts`'s comment says the cap exists "so a better defender is always worth something, even against an elite offense" (VERIFIED line 84). Softmax saturation reproduces exactly that flattening at the extremes — the mechanism changes, the behaviour does not. **Fix:** evaluate flex prices at league-average opponents (the solver's derivative at the average gap) and state the tail behaviour; otherwise the MEASURED curve shows flat tails and the Owner reads it as a bug.

## The three questions the prompt asks

1. **Is λ identification actually solvable from OVR-only data?** Identified in principle, but **not by the estimator named, and not tightly from one snapshot**. Numbers: 32 team-clusters for 9–12 λ; even the unbiased regression has sd 0.13–0.26 (13–26% relative), and dispersion matching adds a +23–75% bias on top. So: YES for ranking duties and rough prices; INFERRED no for resolving a 2/6/12 tier boundary from one cross-section. The stronger route is **player-level exposure** (snap counts / participation turn 32 team observations into thousands of lineup observations), but it needs ratings matched to the season played, which one snapshot does not provide — UNKNOWN until data is attached. The dials + MEASURED display are the right answer to the uncertainty; publish the **interval**, not a point.
2. **Is the strangler the right shape?** Yes — one model, two implementations during migration, the drive engine authoritative until gates pass. Three amendments: drive-granularity legacy events (D6), the macro gate before cutover (D5), and the adapter never in the accuracy path. "Never as two engines" is true in design; the delivery will have two implementations for four phases, so name the deprecation condition per phase and the single owner of the event schema.
3. **Are the ~10% tolerances the right Phase 1 gate?** Not as stated. The design's 1%/3%/2% are tighter than the Owner's ~10% without saying why; they mix directly fitted quantities with emergent ones; and the margin-pmf part cannot pass at λ = 0 (D2). Recommend: the Owner's ~10% for the emergent stat panel; ≤2–3% only for quantities that are the fit target; all team-quality-dependent distributions at Phase 2; and the one hard Phase 1 gate is the **scoring grammar** (tie rate, 3/7 spikes), because that is the structural thing that must emerge rather than be patched — `margin.ts` exists precisely because the old engine failed it.

## Improved text (in full — paste over the design doc's sections)

**§8, replace the totals-bar bullet with:**
> **Phase 1 gate (λ = 0).** With every team identical, only mean-level and scoring-grammar quantities are gated: points per team within 2% of the real mean, drives within 3%, plays within 2%, time of possession within 5%, tie rate within 0.3 points of the real rate, and the exact-3 / exact-7 margin spikes within 1 point of the real shares. The **unconditional margin pmf is not a Phase 1 gate**: an all-λ = 0 model has no between-team component, so it cannot match a real pmf that has one; it fails by construction. The margin GoF moves to Phase 2, on the equal-team conditional (fit team effects to real margins, compare residuals).

**§9 Phase 0, replace the gate clause with:**
> Wrap the old drive engine as a legacy provider emitting **drive-granularity** events (`granularity: 'drive'`, `source: 'legacy'`), so the folds and the UI migrate early without re-implementing `boxscore.ts`'s static allocation inside the adapter. Gate: schema conformance plus the folds reproduce today's box score for seeded games; the adapter is marked legacy and is never used as an accuracy reference. Per-play emission starts in Phase 1.

**§9, insert after Phase 3 (before the second sport):**
> **3b. Macro calibration gate (before any cutover).** N = 300 skilled-drafter seasons with real rosters and λ in. Report playoffs / Super Bowl / title rates, win spread, parity and the roster-quality-to-win slope against the Lab anchors. Cutover does not happen on a season that is uncalibrated; the Owner accepts or rejects the delta.

**§6, replace the "Solver view" paragraph's unit claim with:**
> **Solver unit.** The `(down, distance, yard line)` chain prices net points to the **next score**, not wins; the flex table's unit is wins. Either extend the chain to a game state (score, clock, possession) or state that the solver prices in points and the win conversion comes from paired Monte Carlo. Compute a flex price as a **finite difference** (two solves on the two lineups), not as a derivative times a delta: a slot move changes the duty vector and the personnel, and the second-order term can cross a 2/6/12 tier boundary. The derivative is reported only as a linearisation check.

**§9 Phase 2 and §12, add:**
> λ is estimated with **θ frozen at its prior** (otherwise only the product λ·θ is identified) and by **regression `Cov(y,g)/Var(g)`**, not analytic dispersion matching (which overstates λ by the residual share: +23–75% at plausible shares on a 32-team league). Report a standard error per λ (±0.13–0.26 at n = 32) and carry it as the width of the Owner-visible dial. If `g` is measured with error, correct by the reliability ratio or label the dials "OVR-conditional".

## Not run
The engine's own tests / hash gate (no engine change to test); the Phase 0 adapter (does not exist yet); nflverse access (untested by me too); a real λ fit (no data attached); a solver-based flex price (no solver exists); a branch test on a full-game functional (mine is one chain to the next score).

## Weakest point of the work
The design's evidence is one toy with toy parameters and a **next-score** value function; every number that matters (totals, λ, flex prices in wins) is Phase 1–2 work. The plan's most fragile joint is λ, and the plan's own estimator for it is biased in the direction that overvalues stars. The direction is still right; the estimator and the gates are what need the amendment.

## IDEA (one line, for the Owner's list)
The rebuild **dissolves the C 200 vs 150 question** (open on P-341): P-318 removed `SLOTS[].weight` from the loop, and the new duty gaps use `effOVR` + duty weights, not the slot weight. Once the new engine is the loop, neither 200 nor 150 prices anything. Worth saying to the Owner — it removes one of his open decisions without a ruling.
