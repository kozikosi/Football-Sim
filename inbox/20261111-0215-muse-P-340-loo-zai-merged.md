SPEAKER: MUSE | ROLE: High Councillor | TASK: LOO on ZAI-D1 + the merged form (merge question 9, P-340) | DATE: 2026-11-11
FOR: P-340

# Leave-one-role-out on ZAI-D1 V4 and the merged form (zai+G)

**VERDICT: done.** The Owner said yes to merge question 9 (run LOO on ZAI-D1 + the merged form). This filing runs it, with lambda refit blind per role — the honest version, matching Claude's flexunify methodology. The script is `_agents/muse/deliveries/loo-zai-merged-2026-11-11/loo-zai-merged.py`; the full output is `_agents/muse/deliveries/loo-zai-merged-2026-11-11/loo-zai-merged-output.txt`.

## Method (read this before the numbers)

Claude's flexunify LOO refits the fitted constants blind to each held-out role, then prices the held-out pairs. I do the same for ZAI-D1 and the merged form. The one tunable constant in ZAI-D1 is **lambda** (the weight on the secondary deficits S). For each of the 19 roles, I drop every pair touching that role, sweep lambda 0.0–1.0 (step 0.05), pick the lambda minimizing mean |raw − owner| on the remaining pairs, then price the held-out pairs with that lambda. Cuts are fixed at 1/4/9 (a presentation choice, not a fitted parameter — Claude holds them fixed too).

**Caveat (the same one Inkling noted):** the HAVE/NEED/W matrices are authored, not fitted by an algorithm, so they are held fixed across folds. This LOO tests whether the one tunable constant (lambda) generalizes — it does NOT test whether the authored matrices would be re-derived blind. A fully blind re-derivation of the matrices is not feasible mechanically. What this measures is real: it is the first LOO for ZAI-D1 and the merged form with any constant refit at all.

**Oracle:** the live 99-rule table (architect `97d7e9d`), 97 cross-role rules (the 2 self-rules ILB>ILB, OLB>OLB excluded). Each pair is held out twice (once per endpoint role), so the LOO counts are over 194 cases — the same counting Claude uses (his U-need LOO is 168/194).

**Forms:**
- **ZAI-D1 V4:** ability only, A = M + lambda*S, V4 HAVE (EDGE CARRY 4, C PBLK 6, TE PBLK 4), floor OFF (the floor is out per KG Q10).
- **Merged (zai+G):** raw = max(A, G), G = 20*(1 − w_src/w_dst) from ENGINE-MEASURED localWins20 weights (the P-340 merge baseline). Input weights (slots.ts) give the same in-sample result (see §4).

## Results

### In-sample (lambda = 0.4, the Z.ai value) — for scale

| form | mean err | exact |
|---|---|---|
| ZAI-D1 V4 | 1.34 | 96/97 |
| merged (measured weights) | 1.65 | 92/97 |
| merged (input weights) | 1.67 | 92/97 |

The ZAI-D1 V4 in-sample (96/97, 1.34) reproduces the known number exactly. The merged 92/97 is 94/99 including the 2 self-rules — it reproduces MUSE-D2's 94/4/1 with the same 5 residuals (C>OG, FB>RB, FB>TE, OLB>ILB, OLB>SS).

### LOO (lambda refit per fold) — the headline

| form | held-out mean err | held-out exact |
|---|---|---|
| ZAI-D1 V4 | **1.13 OVR** over 194 cases | **170/194 (87.6%)** |
| merged (zai+G) | **1.44 OVR** over 194 cases | **172/194 (88.7%)** |
| Claude U-need (for comparison) | 1.44 OVR | 168/194 (86.6%) |

**What this says:**
- ZAI-D1 V4 holds up out-of-sample on mean error (1.13 held-out vs 1.34 in-sample — the held-out error is actually LOWER, because the refit lambda is smaller). Its exact-tier rate drops from 96/97 in-sample to 87.6% held-out, which is the honest cost of the lambda choice.
- The merged form holds up about as well as Claude's U-need on both metrics (1.44 vs 1.44 mean error; 88.7% vs 86.6% exact). The guard does not make the merged form worse out-of-sample than Claude's own design, and it is slightly better on exact tiers.
- The merged form has a WORSE held-out mean error than ZAI-D1 alone (1.44 vs 1.13) but a slightly BETTER held-out exact rate (88.7% vs 87.6%). The guard trades mean error for exact tiers — it fixes C>OT (the one row that matters for the centre diagnostic) at the cost of over-pricing the FB family, which shows up in the mean error.

### Per-role LOO (worst roles)

**ZAI-D1 V4:** worst are C (1.61, 7/9), WR (1.53, 9/12), OT (1.48, 9/10), RB (1.42, 8/10), DIME (1.30, 6/7). Best are K (0.00, 2/2), P (0.00, 2/2), FB (0.34, 10/11), OG (0.66, 10/10).

**Merged:** worst are RB (2.75, 8/10), FB (2.63, 9/11), OLB (1.89, 9/13), C (1.64, 8/9), TE (1.58, 20/21). The FB and RB damage is the guard: FB's held-out error jumps from 0.34 (ability alone) to 2.63 (with the guard), and RB's from 1.42 to 2.75. This is the guard over-pricing FB>RB and FB>TE (guard 18) and the RB rows — the same finding MUSE-D2 reported in-sample, now confirmed out-of-sample.

### Fixed-lambda LOO (Inkling-style, for comparison)

Holding lambda at 0.4 (no refit): ZAI-D1 V4 gives 192/194 (99.0%), merged gives 184/194 (94.8%). These reproduce Inkling's numbers (his "ZAI V4 alone 99%"). They are essentially the in-sample rates — because with lambda fixed, the formula is unchanged and the LOO just partitions the same 97 pairs. The refit-lambda numbers above are the honest ones; the fixed-lambda numbers are shown only so the two can be compared.

## Finding 1: the fitted lambda is ~0.20, not Z.ai's 0.40 — and the choice is a trade-off

Across all 19 folds, the lambda that minimizes mean error is **0.20** (ZAI-D1: min 0.20, max 0.25, mean 0.20; merged: min 0.15, max 0.20, mean 0.19). It is stable — it does not vary wildly by role, so lambda is not overfit to a specific role. But it is HALF the value Z.ai uses.

The reason Z.ai's 0.40 wins on exact tiers while 0.20 wins on mean error:

| lambda | ZAI-D1 V4 in-sample exact | ZAI-D1 V4 in-sample mean err | merged in-sample exact | merged in-sample mean err |
|---|---|---|---|---|
| 0.20 | 85/97 | 1.12 | 86/97 | 1.41 |
| 0.40 | 96/97 | 1.34 | 92/97 | 1.65 |

A larger lambda pushes more raws across the tier cuts in the right direction (it raises the raw, which helps rows sitting just below a cut), so exact tiers go up — but it also pushes the raw further from the owner's tier value on average, so mean error goes up. **The choice of lambda depends on the objective.** If the objective is mean error (Claude's preferred metric), lambda ≈ 0.20 is better. If the objective is exact tiers (the 99-fit metric), lambda = 0.40 is better. The Owner has already said the 99 is a guide, not a target, and ±5 is acceptable — so the mean-error objective (lambda ≈ 0.20) is arguably the more honest one for the merge. This is a decision for the merge, not a defect in either form.

## Finding 2: the guard's fit depends on the weight source — the OLB 200 vs 150 discrepancy is load-bearing for 2 rows

Claude's flexunify reports zai+G at **94/97**. My merged form (same ability, guard from engine-measured localWins20 or slots.ts input weights) gives **92/97**. The 2-row difference is the OLB weight:

- Claude's `sport-football.json` has **OLB 200**. Guard OLB>ILB = 20*(1−200/300) = 6.67 → tier 6 = owner 6 EXACT. Guard OLB>SS = 6.67 → tier 6 = owner 6 EXACT.
- slots.ts and localWins20 have **OLB 150** (measured 0.3950). Guard OLB>ILB = 10.04 → tier 12 ≠ owner 6 RESIDUAL. Guard OLB>SS = 9.98 → tier 12 ≠ owner 6 RESIDUAL.

So the OLB 200 vs 150 discrepancy (which Claude already flagged as an open question, alongside C 200 vs 150) changes two rows from exact to residual in the merged form. This is the same weight-source question the council was asked to investigate (council prompt option F). The LOO above uses the engine-measured weights (the P-340 baseline); if the Owner rules OLB is 200, the merged form gains those two rows back.

## What this means for the merge (P-340)

1. **The merge is not overfit.** Both forms hold up out-of-sample at roughly the level Claude's own design does (merged 1.44/88.7% vs U-need 1.44/86.6%). The ability layer generalizes; the guard does not break it out-of-sample.
2. **The guard's cost is real and concentrated.** It fixes C>OT but it damages FB and RB out-of-sample (FB held-out error 0.34 → 2.63). The Owner has already ruled FB = scarcity, not the guard — so the merged form should NOT push FB rows to the guard price. The merge needs to handle the FB family separately (socialism), not via the guard.
3. **Lambda is a real dial, not a fixed constant.** The merge should decide the lambda objective (mean error vs exact tiers) rather than inheriting 0.40 unexamined. Lambda ≈ 0.20 is the mean-error optimum; 0.40 is the exact-tier optimum.
4. **The OLB weight question matters.** It is worth 2 rows in the merged form. The Owner should rule on OLB 200 vs 150 (and C 200 vs 150) before the merge is finalized.

## Evidence

- Script: `_agents/muse/deliveries/loo-zai-merged-2026-11-11/loo-zai-merged.py`. Deterministic — two runs produce identical output (verified by diff).
- Output: `_agents/muse/deliveries/loo-zai-merged-2026-11-11/loo-zai-merged-output.txt`.
- Oracle: live flex.json, architect `97d7e9d` (99 rules; 97 cross-role scored).
- Ability: Glyph's independent ZAI-D1 re-implementation (`zai-d1-kg-verify-2026-11-10.py`, council/glyph), V4 HAVE (EDGE CARRY 4, C PBLK 6, TE PBLK 4). In-sample ZAI-D1 V4 (96/97, 1.34) reproduces the known number.
- Guard: MUSE-D2's W_MEAS (localWins20) and W_INPUT (slots.ts). In-sample merged (92/97 cross-role = 94/99 incl. self-rules) reproduces MUSE-D2's 94/4/1 with the same 5 residuals.
- LOO method: Claude's flexunify (`flexunify.mjs`, architect) — refit blind per role, price held-out pairs. Claude's U-need LOO (1.44, 168/194) is the comparison point, read from his filed results.

**Labels:** the LOO numbers, the lambda sweep, the in-sample reproductions, and the OLB guard arithmetic are VERIFIED (computed by the filed script from the cited sources). The interpretation in "What this means for the merge" is MUSE's recommendation, not a ruling — the Owner decides.
