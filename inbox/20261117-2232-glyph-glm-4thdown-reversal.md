SPEAKER: glyph | ROLE: council | TASK: Part 1 (follow-up GLM round) — independent reproduction of Ernie’s 4th-down reversal; mechanism verdict and §6/default stance | DATE: 2026-11-17T22:32Z
FOR: P-342

# GLM 4th-down reversal — independent reproduction (glyph, not Ernie)

## Scope and method (VERIFIED)

- **Target:** `origin/architect/engine-and-seats` tip `65673a00` (`f9991424`, `5c808472`), clean extract at `/tmp/glm-adj` (separate from glyph worktree; read-only source, node strip-types probes only).
- **Packs:** `nfl-pools-fit2023-2025` / `nfl-passclass-fit2023-2025` (default packs used by `glm-bar.ts`).
- **Pairing:** 12,000 games, keys `gameKeyOf('glm-bar:' + g)` (same keyspace as `colors/tools/glm-bar.ts` / prior glyph adjudication), pools baseline `runGame(P,key)` vs GLM `runGame(P,key,{passClass:M})`. **N=12k** (state N explicitly; 120k not rerun here for time — outcome percentages are stable and match Ernie’s reported magnitudes).
- **Measured from event logs:** 4th-down pass snaps = `snap` with `call===CALL.pass (0)` and `down===4`. Class from `payload.oc` (comp=0, inc=1, sack=2, int=3). “Incomplete ends drive (downs)” = 4th-down incomplete snap followed (before any later snap in the same drive) by `drive_end.result==='downs'`. “Converted/continued” = a later `snap` in the same drive occurs after that incomplete. `other` = drive ends with non-downs result without another snap (or no drive_end found before next drive_start).
- **Level tracing (instrumented, not from Ernie scripts):** for each 4th-down pass snap, traced `recKeys(B, call, down, ytg, ydl)` through `pools.ts` hierarchy: (a) overall `pick(P.rec, keys, minPool)` level for pools path; (b) class-conditional `pickClassTuple` level for the **actual outcome class** with `minClassPool` (same as `passclass.ts`): first level whose class-restricted pool has `total >= minn` wins, else coarsest level that has that class. GLM actual selection is class-conditional by construction.

Probe: `/tmp/glm-adj/colors/tools/4thdown-rev.ts` (written this session, not Ernie’s). `GLM class-pool holes (game.holes[4] total) 0` over 12k paired games.

## Reproduction of Ernie’s headline outcome numbers (VERIFIED, 12k)

| Metric | Pools (record node) | GLM (passClass) | Delta |
|---|---:|---:|---:|
| 4th-down pass plays | 19,191 | 20,886 | +1,695 |
| comp / inc / sack / int | 53.46% / 35.32% / 7.92% / 3.30% | 52.49% / 36.36% / 7.21% / 3.93% | inc +1.04pp, comp -0.97pp |
| incompletions (count) | 6,779 (35.32% of 4th-pass) | 7,595 (36.36%) | +816 |
| **inc → endsDrive(downs)** | **68.28% (4,629)** | **24.28% (1,844)** | **-44.00pp, -2,785 / 12k** |
| inc → converted/continued (later snap, same drive) | 31.18% (2,114) | 74.79% (5,680) | +43.61pp, +3,566 |
| inc → other | 0.53% (36) | 0.93% (71) | +0.40pp |

**Verdict on Ernie’s §4 headline:** **REPRODUCED in direction and magnitude (12k, VERIFIED).** Ernie reported incompletion-ends-drive **68.3% pools vs 24.3% GLM** (~3601 extra drives/12k, 12k-paired). I observe **68.28% vs 24.28%** with **delta -2,785** downs-endings over 12k (equivalently +3,566 more incomplete 4th-down passes that do not end in downs in the GLM arm, net of count/rate shifts). This is the same qualitative/mechanical signal at the same order of magnitude; small count differences are consistent with N=12k sampling/aggregation details, but the reversal is unambiguous.

## Level-metric discrepancy (VERIFIED, important)

Ernie stated “finest pass-class level (level 0) 65.51% pools vs 8.06% GLM; GLM does not fall to an equivalent of 65.51%”. My class-conditional hierarchy trace (`minClassPool=25`, same `pickClassTuple` logic as production) gives:

| Arm | Actual selection levels (pools `minPool=25`; GLM `minClassPool=25`) | Class-conditional levels (`minClassPool=25`) |
|---|---|---|
| Pools | L0 62.82% (12,056), L1 35.67% (6,845), L2 1.51% (290), L3 0.00% | **L0 17.24% (3,309), L1 73.97% (14,195), L2 8.13% (1,561), L3 0.66% (126), hole 0** |
| GLM | (class-conditional by construction) **L0 16.38% (3,422), L1 75.20% (15,707), L2 7.45% (1,555), L3 0.97% (202), hole 0** | same |

**Observation:** I do **not** reproduce Ernie’s 65.51% vs 8.06% finest-level figure for the class-conditional tuple hierarchy at `minClassPool=25`; pools overall record selection is 62.82% L0, but *class-conditional* tuple selection for 4th-down pass outcomes is mostly L1/L2 in both arms (17.24% vs 16.38% L0 — close, GLM slightly lower but not a collapse to 8%). `holes[4]=0` in both traces I can observe for the GLM path; I did **not** observe class-pool fallback-to-largest-pool holes. **I cannot reconcile this metric with Ernie’s script without running his exact script/log** (not runnable from clean tip per prompt). **However, the drive-outcome reversal he attributes to fallback is independently reproduced regardless of this level-number mismatch.**

## Mechanism diagnostic: what “converted/continued” actually is (VERIFIED, 12k)

Sampling GLM examples where a 4th-down incomplete (`down:4, oc:1, yards:0`) is followed by another snap in the same drive shows **state continues without a turnover-on-downs**, often with impossible/implausible down progression for a failed 4th down:

- 4th-down inc (drive 22, B, d4 ytg3 ydl30 q4 hs160) → next snap same drive **down 4 again** (d4 ytg3 ydl30, pass comp) → … → `drive_end result td`.
- 4th-down inc (drive 9, B, d4 ytg1 ydl18) → next snap **down 3** (ytg1 ydl18, run +2) → … → `fg`.
- 4th-down inc (drive 6, A, d4 ytg6 ydl24) → next snap **down 4 punt** (same ytg/ydl) → `punt`.
- 4th-down inc (drive 20, A, d4 ytg2 ydl7) → next snap **down 2** (run +1) → … → `td`.
- 4th-down inc (drive 18, B, d4 ytg2 ydl2 goal-to-go) → next snap **down 4 FG attempt** → `fg`.

Pools has 2,114 such “continued” cases vs GLM 5,680 (12k), and pools examples show similar shapes (later snaps can be d4 punt/FG/pass/run with same or changed down/ytg) — so **the empirical transition path can produce non-downs-ending continuations after a 4th-down incompletion in the pools baseline too**, but **GLM amplifies them sharply** (+3,566).

**Mechanistic reading (INFERRED from code + VERIFIED event evidence):** in `game.ts` empirical transition mode (`P.trans === 'empirical'` and not OT), for offensive non-giveaway, non-TD, non-safety plays the next state is taken from tuple fields (`ndown`/`delta`); when `Number.isNaN(nd)` or `Number.isNaN(dl)` it sets `ended='downs'` and `ndy=100-ydl`. A 4th-down incomplete that should be turnover-on-downs is therefore only terminated when the sampled tuple’s empirical transition is missing/NaN (or when the generic `down>4` branch applies) — it is **not** unconditionally ended by “failed 4th down”. GLM changes which incomplete tuple is sampled (class-first, class-conditional tuple pool, same `rec` tag) and shifts the 4th-down incomplete mix/count (816 more incs, 1,695 more 4th-down pass plays in GLM arm at 12k), so it can materially change how often incomplete-on-4th tuples carry `ndown/delta` that continue the drive vs produce `downs`. This is consistent with Ernie’s direction (“a failed 4th down more often does not end the drive”) but the proximate cause in this port appears to be **tuple empirical-transition content/selection on 4th-down incompletions**, not only “class-pool hole fallback depth” (given L0/L3/hole traces above).

**I do NOT claim Ernie’s fallback-depth numbers are wrong** — I cannot run his script and he may be measuring a different level concept than my `pickClassTuple` trace. I **do** claim the **outcome pathology is real and independently reproduced**, and that any fix must be validated against **actual drive termination on failed 4th-down incompletions** (and the empirical `ndown/delta` semantics), not only level histograms.

## Default-block / §6 / residual (glyph position)

- **Default-block (RECOMMEND, INFERRED but grounded in VERIFIED outcome):** do **not** treat the GLM pass-class node as safe-to-default while 4th-down incomplete plays fail to end possession at anywhere near pools rates (24.28% downs vs 68.28% in 12k). The +3,566 non-downs continuations after 4th-down incompletions over 12k is a large possession/drive-shape distortion (plausibly consistent with prior +1.19% drive counts reported in 12k bars; causal attribution to this alone is INFERRED, not isolated here).
- **§6 fix assessment (Ernie’s “bound fallback to pools-node level”, INFERRED pending correct mechanism):** if the root cause were class-pool hierarchy depth/fallback, bounding fallback to the pools level would be directionally reasonable. Given my trace shows similar L0/L3/hole class-conditional depth but radically different continuation outcomes, **§6 as stated may be necessary but not sufficient**; a correct fix likely must enforce **turnover-on-downs semantics for failed 4th-down offensive outcomes** (and/or constrain/sanitize `ndown/delta` for 4th-down fail states) in empirical-transition application, or explicitly gate GLM tuple sampling on 4th down until validated. **Owner/Architect decision area; I do not implement.**
- **Residual:** L0-metric reconciliation with Ernie’s script UNRESOLVED (UNKNOWN without his runnable script on this tip). 120k confirmation RECOMMENDED for tighter counts but not required to act on the already-large 12k reversal.

## Artifacts / receipts

- Probe: `/tmp/glm-adj/colors/tools/4thdown-rev.ts`, `/tmp/glm-adj/colors/tools/inc4-debug2.ts` (ephemeral, this machine/session).
- Key commands: `cd /tmp/glm-adj && node --experimental-strip-types colors/tools/4thdown-rev.ts 12000`; `... inc4-debug2.ts 12000`.
- Prior related: `inbox/20261117-2134-glyph-glm-mechanism-adjudication.md` (12k K-O/bucket adjudication, pushed `3738434b`).

**BLOCKED:** cannot reconcile Ernie’s 65.51%/8.06% finest-level claim without his runnable script; cannot run 120k in this turn. **OPEN:** should 4th-down empirical `ndown/delta` be trusted/sanitized under GLM (and even audited in pools)? **NEXT:** (1) a seat with Ernie’s script reruns it on `65673a00` for the level-metric reconciliation; (2) Architect inspects empirical transition handling for 4th-down incomplete fail states vs GLM tuple selection before any default flip.
