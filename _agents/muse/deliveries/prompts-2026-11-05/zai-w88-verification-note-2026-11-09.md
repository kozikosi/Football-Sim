# Z.ai — w88 follow-up: verify the NEW Wins before you build (WR3 question + math recheck)

You are Z.ai. This is a follow-up to the w88 prompt (`zai-w88-wins-2026-11-09.md`, council/muse `a5ecc25e`). Read it first if you have not already. This note does not change the w88 job — it asks you to verify the numbers in it before you build on them, and to help resolve an open question.

## The WR3 question

The NEW Wins table in the w88 prompt was computed by the MUSE seat on the Colors engine using the P-321 method (pool-grounded local slope at ±5, slope × 20). But there is an open discrepancy:

- The P-321 evaluation (run on the PreColors engine by VL, VLOC, Super, UK, and MUSE) found WR3 should go **up** 25 in weight under the new measurement (from 95 to 120).
- The MUSE seat's Colors-engine computation finds WR3 **unchanged** (0.2470 OLD, 0.2470 NEW — no move at all).

One of these is wrong, or the two engines genuinely differ on WR3. The same gap shows up elsewhere: PreColors and Colors disagree on slotWins20 for SAM (PreColors 0.074, Colors 0.263) and CB1 (PreColors 1.442, Colors 1.056). So the WR3 question is really a Colors/PreColors fidelity question.

Please help resolve it: re-measure WR3 (and SAM and CB1) on the engine snapshot you have (`4ca9a071` — the frozen snapshot, and the Colors engine on the Architect's branch if you can reach it). Compute WR3's local slope at ±5 around its pool center, and its slotWins20, on both engines if you can. Report which engine's number is right and why they differ. If the Colors engine is right and WR3 truly does not move, say so with the numbers. If the MUSE computation is wrong, say so with the correction.

## Recheck the math

Independently recompute the NEW Wins table (local slope at ±5, pool centers, slope × 20) from the engine and compare it, slot by slot, to the table in the w88 prompt. In particular, check:
- **SAM (0.3 → 0.1).** The SAM wins curve is much flatter around the pool average (72.5) than over 70→90, so the local slope is far lower than the secant. Is that real, or is it a kink in the SAM curve? Check the slope at ±3 and ±7 as well — if SAM's slope moves a lot with the spread, the ±5 value is fragile.
- **OT1 (1.3 → 1.2).** The exact values are 1.2505 vs 1.2497 — a rounding-boundary artifact. Confirm it rounds to 1.2 and that it is not a real move.
- **WR2 (1.0 → 1.1) and RB2 (0.2 → 0.1) and TE2 (0.4 → 0.3).** Confirm these moves and their sizes.
- **The centers.** The pool centers used were the CSV means (madden27-ratings.csv, n=1,941): QB 71.85, HB 75.98, WR 75.53, TE 70.48, LT/RT 74.05, LG/RG 72.99, C 71.43, EDGE 74.87, DT 73.93, LB 72.47, CB 74.99, SS 74.63, FS 73.76, K 78.27, P 77.03, FB 71.88. Confirm these are the right pool and the right means for the Colors engine.

If any number in the w88 table is wrong, report the correction — do not build w88 on a wrong number. The w88 numbers are provisional until this verification lands. If the verification changes a number, w88 updates to the corrected number.

## Improve the method

The new method (pool-grounded local slope at ±5, Wins = slope × 20) is decided, but it is new and it can be improved. If you see a better way, propose it:
- Is ±5 the right spread, or would ±3 or ±7 be more stable (especially for SAM, TE2, RB2, WR2 — the slots that move)?
- Is slope × 20 the right way to express the Wins, or should the displayed Wins be computed differently (for example, wins(center+10) − wins(center−10), a 20-OVR span centered on the pool average, rather than the slope scaled up)?
- Is the CSV pool the right pool, or should the centers come from the engine's embedded pool?
- The method is being called **localWins20** (the local, pool-grounded version of Wins20; the per-OVR rate is the **local slope**). If you have a better name, say so.

File what you find as a review or a proposal. Do not let w88 wait on this verification if the numbers check out — build w88 with the table as given once you have confirmed it, and report any correction the moment you find it.

## Innovate

You have the Owner's permission and encouragement to execute whatever you think is best inside your tree — you decide the implementation, you build first, and you innovate and brainstorm what the work needs beyond the listed items. If verifying these numbers opens a better way to think about position value (a clearer definition, a more stable measurement, a display that makes the Wins honest), build it or note it as an `IDEA:`. Think around the issue, not just through it.
