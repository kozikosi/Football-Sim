SPEAKER: inkling | ROLE: council advisor | TASK: P-326 localWins20 recheck + the ±10 trap | DATE: 2026-11-10T02:57Z
FOR: P-326
METHOD: independent recompute on the engine of record — not a review of MUSE's or Z.ai's prose; every number below is my own run.

## What I measured and against what

- Engine of record: `origin/architect/engine-and-seats` @ **728b2c53** (colors/src/sports/nfl/engine/value.ts `slotWins`, slots.ts, ratings.ts, specs.ts, matchup.ts). The engine-math files (value/specs/matchup/slots/ratings) last changed at 7af54c00 ("salary table retired… Owner 8 Nov"), an ancestor of the tip — this is the same engine lineage MUSE's w88 table was computed on (`colors/src/sports/nfl/engine/`, architect branch).
- Pool: `data/nfl/madden27-ratings.csv`, n=1,941 players, sha256 `54e837dd20378ff63524374a45ba9eeccbbae46c` — `cmp` against `data/madden27-ratings.csv` in my worktree: identical.
- Re-runnable script (committed): `_agents/inkling/deliveries/p326/localwins20-recheck.ts` @ **89bcdf32** (pushed to `council/inkling`). Re-run:
  ```
  D=$(mktemp -d); git archive origin/architect/engine-and-seats colors data | tar -x -C "$D"
  cp _agents/inkling/deliveries/p326/localwins20-recheck.ts "$D/" && (cd "$D" && node localwins20-recheck.ts)
  ```
- Method: `winsWithBase(slot, ovr, baseVec)` — the engine's own `slotWins` generalised so "everything else" sits at position-specific averages (CSV means per group) instead of 80. Sanity: with all-80 base, `winsWithBase` reproduces `slotWins` exactly (max|diff| = 0 at ovr 85, and on w(90)−w(70) vs the engine's slotWins20). Centers = CSV group means. localWins20 = (w(c+5) − w(c−5))/10 × 20.

## (1) All 32 slots recomputed — the w88 table holds, VERIFIED

One-decimal table is **identical to w88 on every slot** (max |NEW±5 − w88| = 0.0; no slot off by ≥0.1). Ranking order identical to w88: QB 2.5, DE1 1.7, WR1 1.6, DT1 1.3, OT1 1.2, WR2 1.1, CB1 1.1, OG1 1.0, MIKE/DE2/DT2/FS/SS/OT2 0.8, CB2 0.7, OG2/TE1/RB1 0.6, WILL/DL5/C 0.4, TE2 0.3, NICKEL(CB3) 0.3, WR3 0.2, DIME 0.1, SAM 0.1, K 0.1, P 0.1, WR4 0.1, RB2 0.1, TE3 0.1, FB 0.1.

Key exacts to 4dp (my run): OT1 **1.2497** · WR2 **1.1487** · TE2 **0.2661** · SAM **0.1279** · RB2 **0.0971** · WR3 0.2470 · OT1 OLD (slotWins20) 1.2505.
WR3 does not move on the Colors engine (NEW 0.2470 = OLD 0.2470) — the P-321 PreColors "WR3 +25" finding does not reproduce here, confirmed again (P-325's Colors side).
OT1's "1.3→1.2" is the rounding boundary it was described as (1.2505 vs 1.2497): not a bug, do not chase.

## (2) The ±10 trap — CONFIRMED, VERIFIED (recomputed, to 4dp)

Direct centered 20-span `wins(center+10) − wins(center−10)` on the pool base reproduces OLD slotWins20 essentially exactly:

| Slot | OLD slotWins20 (70→90) | span±10 (pool base) | span−OLD | NEW±5 |
|---|---|---|---|---|
| SAM | 0.2630 | 0.2630 | 0.0000 | 0.1279 |
| RB2 | 0.2468 | 0.2468 | 0.0000 | 0.0971 |
| TE2 | 0.3702 | 0.3702 | 0.0000 | 0.2661 |
| WR2 | 0.9881 | 0.9881 | 0.0000 | 1.1487 |
| OT1 | 1.2505 | 1.2505 | 0.0000 | 1.2497 |
| TE3 | 0.1234 | 0.1234 | 0.0000 | 0.0805 |
| QB | 2.5382 | 2.5382 | 0.0000 | 2.4706 |
| DE1 | 1.7101 | 1.7101 | 0.0000 | 1.7097 |
| WR3 | 0.2470 | 0.2470 | 0.0000 | 0.2470 |
| FB | 0.0626 | 0.0626 | 0.0000 | 0.0626 |
| DIME | 0.1315 | 0.1315 | 0.0000 | 0.1310 |
| P | 0.1270 | 0.1189 | −0.0081 | 0.1182 |

(All-80 base gives the same equality for these slots.) The clause is exact for 31 of 32 slots; only P drifts (by 0.008). So a "centered 20-span" is not an improvement of the P-321 measurement — it is the OLD secant wearing pool-average clothes. **Keep slope × 20 at ±5. If the Architect's P-321 adopt-measurement build emits `wins(c+10) − wins(c−10)` anywhere, this note is the reason to reject it.** Answers P-326 question (4): slope × 20 at ±5 is right; the centered span is the trap.

Mechanism (what the curves actually look like, from this engine): the marginal-wins curve is **piecewise flat, then rising, with a kink** — not a smooth convex curve. A centered ±10 window captures the same rise the 70→90 secant captures, which is why it returns OLD.

## (3) Spread sensitivity ±3 / ±5 / ±7 (my numbers; they match Z.ai's reported ±3/±5/±7 to 4dp)

| Slot | ±3 | ±5 | ±7 | stable at one decimal? |
|---|---|---|---|---|
| SAM | 0.1286 | 0.1279 | 0.1437 | yes (0.1); kink sits between ±7 and ±10 (±10 → 0.2630) |
| RB2 | 0.0971 | 0.0971 | 0.1430 | yes (0.1; ±7 = 0.143 still rounds 0.1); kink just after ±5 |
| WR2 | **1.3047** | 1.1487 | **1.0393** | **NO** — see below |
| TE2 | 0.1328 | 0.2661 | 0.3246 | **NO** at ±3 (0.1) vs ±5/±7 (0.3) — see below |
| TE3 | 0.0805 | 0.0805 | 0.0805 | yes (flat through ±7; ±10 → 0.1234) |
| P | 0.1180 | 0.1182 | 0.1184 | yes |
| FB | 0.0626 | 0.0626 | 0.0626 | yes |
| DIME | 0.1310 | 0.1310 | 0.1313 | yes |
| 27 other slots | — | — | — | all move < 0.01 between ±3 and ±7 |

**WR2 is spread-sensitive and its w88 rank is convention-dependent.** The WR2 curve is flat at ~1.305 through ±3 (a true plateau), then declines; CB1 is flat at 1.056. At ±3: WR2 1.305 (display 1.3). At ±5: WR2 1.149 > CB1 1.056 (w88's rank 6). At ±7: WR2 1.039 < CB1 1.056 (rank 7 flips). The w88 ordering "WR2 above CB1" exists only because the table uses ±5. This does not invalidate w88 (it was computed, reviewed, published and is live at that convention) — but the P-321 spec must say so, and the Architect should not present WR2 > CB1 as a spread-independent fact.

**TE2 is the fragile one, and the fragility has a shape.** My wins curve for TE2 (everything else at the TE pool average 70.48): **0.000000 for ovr ≤ ~72, then rising** (74 → 0.0639 · 76 → 0.1574 · 78 → 0.2517 · 80 → 0.3471 · 84 → 0.5405). The curve is flat because the best plan does not change until the added TE2 rating actually matters. The pool-average center (70.48) sits *below* the kink, so any centered window measures (flat span) + (rise past the kink) / window:
- true local rate at spreads ±0.25…±2: **0.0000 exactly**
- ±3: 0.133 · ±5: 0.266 · ±6: 0.300 · ±7: 0.325 · ±10: 0.370

So the honest answer to "is ±5 the right working spread for TE2?": **±5 is the right *convention*, but it is not a *local rate* for TE2 — it is a window straddling a kink, and the value is window-dependent.** It displays 0.3 at both ±5 and ±7 (robust enough for the table); only ±3 displays 0.1. What ±5 cannot do is claim to be "the rate at the pool mean" — for TE2 no centered window can, because the mean sits on a flat shelf. If the Owner/Architect ever wants a TE2-stable number, the options are (i) keep ±5 and document the kink (my recommendation — one convention for 32 slots, matches w88), (ii) measure the slope inside the rising region only (e.g. w(84)−w(74) over 10 points ≈ 0.95/20-pts — a different, non-centered statistic, likely an overstatement and *not* interchangeable with the table), or (iii) fall back to OLD (0.370) for TE2 alone — rejected: it re-imports the trap for one slot. Do NOT invent a per-slot spread; that decorates the kink.

**TE3** has the same flat-then-rising shape but its kink sits after ±7 (±10 → 0.1234 vs ±5 0.0805); ±5 is stable for the display.

## (4a) Centers — CSV means are the right pool; the engine has no embedded pool

- The Colors engine embeds **no** ratings (the app loads a user/bundled CSV via the dataset loader; `dataset.ts` buildPool path). The w88 "position-specific averages" necessarily come from the CSV, and this recheck used the same. There is no second candidate pool inside the engine to compare against; the question "or should the centers come from the engine's embedded pool?" resolves to: **there isn't one — the CSV is the pool.**
- Group mapping used (state it, it is load-bearing): HB→RB1/RB2 · LT/RT→OT1/OT2 · LG/RG→OG1/OG2 · LEDG/REDG→DE1/DE2 · DT→DT1/DT2/DL5 · CB→CB1/CB2/CB3(NICKEL)/DIME · TE→TE1/TE2/TE3 · others 1:1 · LS excluded (no slot).
  - DIME→CB is an assumption (6th DB). Sensitivity: DIME reads 0.1310 either way (FS/SS-adjacent values are all 0.787–0.789), so the displayed 0.1 is unaffected.
  - OT mixes LT (n=71, 75.00) and RT (n=63, 72.98) → center 74.05.
- Small samples to flag: **SAM n=16, mean 69.00** and **FB n=16, mean 71.88**. These centers are noisy in absolute terms, but they are the honest pool. If the Owner ever regenerates the Madden 27 ratings, SAM's centre (and hence its 0.1) should be re-measured — SAM is the w88 table's thinnest foundation. Every other group is n≥33.
- The CSV is the *rated pool*, not a roster mix — accepted limitation of the method; consistent with the w88 measurement.

## (4b) Naming / improvements (question: is `localWins20` right; any improvements?)

1. Keep `slope × 20` at a single spread, ±5. No centered spans (measured: trap). No per-slot spreads. No per-slot formulas — a single convention is what makes 32 numbers comparable.
2. `localWins20` is a fair name (local slope, per-20-OVR, mirrors `slotWins20`). The engine-function name is the Architect's call; I would not bikeshed it. What the **public copy** must not say is "rate at the pool average" for the kinked slots (TE2, WR2, SAM, RB2) — the interface should say "Wins per 20 OVR at a ±5 window around the pool average".
3. The P-321 guard for the adopt-measurement build: implement `slotWinsPerOvr()` as the ±5 local slope (exactly as this recheck measures), not `wins(c+10) − wins(c−10)`. The `winsWithBase` generalisation is verified sound (all-80 base reproduces `slotWins` to 0 diff) and is the natural carrier for that change.
4. Do nothing to w88. It is live, and every one of its 32 numbers is reproduced here. Re-run this script after the P-321 build lands and before re-pinning anything.

## What I did NOT check

- The live gh-pages page / guide / rankings buttons (that is P-324's live-file check — a different task).
- Byte-identity of `colors/` @ 728b2c53 to "snapshot 4ca9a071" (I have no tool here that certs that; I used the architect branch tip, whose engine-math files are unchanged since 7af54c00, the same lineage the w88 table was computed on).
- The PreColors side of the WR3/SAM/CB1 fidelity question (that is P-325; the PreColors port is heavier than a grep — needs its own pass).

## Weakest points of this filing

1. DIME→CB pool assumption (insensitive, displayed value unaffected).
2. SAM/FB centers from n=16 pools — method limitation, not a computation error.
3. Branch-tip measurement, not a snapshot byte-cert (see above).
4. "Piecewise flat" is measured, not explained — I have not traced WHICH best-plan boundary creates the TE2 kink; that is an engine-internals question for the Architect, not needed for the table.

## Evidence label

VERIFIED (this session, commands above; script 89bcdf32; CSV sha 54e837dd…; engine-and-seats @ 728b2c53) · REPORTED (Z.ai's w88 §5 numbers and MUSE's trap note — both reproduced here to 4dp rather than trusted) · INFERRED (the mechanism "flat-then-rising kink" from the measured curve shape; the "do nothing to w88" recommendation) · UNKNOWN (byte-identity to snapshot 4ca9a071).
