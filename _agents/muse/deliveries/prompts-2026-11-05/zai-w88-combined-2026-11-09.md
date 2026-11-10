# Z.ai — w88: show position values in WINS (not weights) — w-series, separate from Slice 3

You are Z.ai, Executor of Z-post-blue and 67 Cakepanz. Bootstrap yourself: clone https://github.com/kozikosi/Football-Sim shallow and read `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/zai` (fallback: `origin/main:z-core/_agents/zai/…`), follow it exactly.

This is the **one prompt for w88**. It combines the w88 job, the verification the Owner asked for, the review criteria, and the council work you need to know about. Read it all before you build.

## What this is

This is a **w-series wave (w88)**, not a Slice. It is separate from Slice 3 (P-316, the 67 Cakepanz hydration + board chrome pass). Build and publish w88 on its own. Do not fold it into Slice 3 and do not let Slice 3 wait on it.

## §1. The job

In w87 you changed the guide ("which positions matter") to a ranked 1–32 list with the engine's measured weights (QB 1000, DE1 675, WR1 630, DT1 520, OT1 495, CB1 415, … FB 25), and you put the same numbers on the buttons on the position rankings page and anywhere else you made that change from w86 to w87.

The Owner wants those numbers in **WINS**, not weights. A weight is an abstract unit; a Win is what the user actually cares about — how many more games per season a slot is worth. Change every place you put the w87 weight numbers to the Wins numbers in the table below.

## §2. The Wins table — the NEW measurement (localWins20), not slotWins20

**These are NOT slotWins20.** The project is moving away from slotWins20 (the 70→90 secant, everything else at 80) to the P-321 measurement: a per-position local slope at ±5 around the pool average, everything else at position-specific averages. The Owner corrected the first draft of this prompt on exactly this point — the first draft used slotWins20, and that is the measurement being superseded. This table is the NEW measurement, computed by the MUSE seat on the Colors engine (`colors/src/sports/nfl/engine/`, architect branch) using the P-321 method: CSV pool centers (madden27-ratings.csv, n=1,941), local slope at center±5, everything else at position-specific averages, expressed as Wins (slope × 20) to **one decimal**, per the Owner's display rule (integers everywhere except Wins and Priority, which get one decimal). The `winsWithBase` function was verified to reproduce `slotWins20` exactly when the base is all 80, so the computation is sound.

The method is called **localWins20** (the local, pool-grounded version of Wins20; the per-OVR rate is the **local slope**). It replaces slotWins20 in the same role — a 20-OVR Wins value — and the name makes the difference explicit. If you have a better name, say so.

The ranking order changes slightly from w87 (WR2 rises above CB1; SAM and RB2 fall). The measured-weight column is your w87 number, for cross-checking only — **do not show the weight anywhere in w88**.

| Rank | Slot | Wins (NEW) | Wins (OLD slotWins20) | (w87 weight, cross-check only) |
|---:|---|---|---:|---:|
| 1 | QB | 2.5 | 2.5 | 1000 |
| 2 | DE1 | 1.7 | 1.7 | 675 |
| 3 | WR1 | 1.6 | 1.6 | 630 |
| 4 | DT1 | 1.3 | 1.3 | 520 |
| 5 | OT1 | 1.2 | 1.3 | 495 |
| 6 | WR2 | 1.1 | 1.0 | 390 |
| 7 | CB1 | 1.1 | 1.1 | 415 |
| 8 | OG1 | 1.0 | 1.0 | 395 |
| 9 | MIKE | 0.8 | 0.8 | 310 |
| 10 | DE2 | 0.8 | 0.8 | 310 |
| 11 | DT2 | 0.8 | 0.8 | 310 |
| 12 | FS | 0.8 | 0.8 | 310 |
| 13 | SS | 0.8 | 0.8 | 310 |
| 14 | OT2 | 0.8 | 0.8 | 295 |
| 15 | CB2 | 0.7 | 0.7 | 260 |
| 16 | OG2 | 0.6 | 0.6 | 245 |
| 17 | TE1 | 0.6 | 0.6 | 245 |
| 18 | RB1 | 0.6 | 0.6 | 245 |
| 19 | WILL | 0.4 | 0.4 | 155 |
| 20 | DL5 | 0.4 | 0.4 | 155 |
| 21 | C | 0.4 | 0.4 | 150 |
| 22 | TE2 | 0.3 | 0.4 | 145 |
| 23 | NICKEL | 0.3 | 0.3 | 105 |
| 24 | WR3 | 0.2 | 0.2 | 95 |
| 25 | DIME | 0.1 | 0.1 | 50 |
| 26 | SAM | 0.1 | 0.3 | 105 |
| 27 | K | 0.1 | 0.1 | 50 |
| 28 | P | 0.1 | 0.1 | 50 |
| 29 | WR4 | 0.1 | 0.1 | 40 |
| 30 | RB2 | 0.1 | 0.2 | 95 |
| 31 | TE3 | 0.1 | 0.1 | 50 |
| 32 | FB | 0.1 | 0.1 | 25 |

What moves (NEW vs OLD): **WR2 1.0 → 1.1** (rises to 6th, above CB1); **TE2 0.4 → 0.3**; **SAM 0.3 → 0.1** (falls to 26th — the SAM wins curve is much flatter around the pool average than over 70→90, so the local slope is far lower than the secant); **RB2 0.2 → 0.1** (falls to 30th); **OT1 1.3 → 1.2** (a rounding-boundary artifact — the exact values are 1.2505 vs 1.2497, nearly identical, but they round differently; treat it as 1.2 and do not make a fuss of it). Everything else is unchanged at one decimal. WR3 does not move on the Colors engine (see §4 — the WR3 question).

How these were computed (so you can verify): for each slot, the local slope is `(wins(center+5) − wins(center−5)) / 10`, where `center` is the pool-average OVR for that slot's position and `wins` is the engine's wins with everything else at its own position average. Wins = slope × 20. The Architect's adopt-measurement build (P-321, prompt `claude-adopt-measurement-2026-11-09.md`) will put this measurement into the engine; when it lands, the engine's `slotWinsPerOvr` will produce these numbers directly. If you re-measure and get a different one-decimal value for any slot, the engine is the truth — report the difference, do not silently keep the table above.

## §3. Where to change it

- **The guide** ("which positions matter"): replace the weight numbers with the Wins numbers above, in the new ranking order. Keep the same look.
- **The buttons on the position rankings page**: replace the weight numbers with the Wins numbers, in the new ranking order. Same labels, same layout — only the numbers and the order change.
- **Anywhere else you made this change from w86 to w87**: if you put the w87 weight numbers anywhere else (rankings buttons, the draft board, a tooltip, a popup, The Series re-basing, a header), change those to Wins too. Audit the w87 file for every occurrence of the weight numbers and replace each one. Do not leave a stray "1000" or "675" that is a position value. (A "1000" that is something else — a year, a count, a seed — stays.)
- Do not change the layout or anything else. This wave is the numbers and the order only.

## §4. Verify before you build — the WR3 question and the math recheck

**The w88 numbers are provisional until this verification lands.** Do the verification first, then build w88 on the verified numbers. If the verification changes a number, w88 uses the corrected number. Do not build w88 on a number you know is wrong.

### The WR3 question

The P-321 evaluation (run on the PreColors engine by VL, VLOC, Super, UK, and MUSE) found WR3 should go **up** 25 in weight under the new measurement (from 95 to 120). The MUSE seat's Colors-engine computation finds WR3 **unchanged** (0.2470 OLD, 0.2470 NEW — no move at all). One of these is wrong, or the two engines genuinely differ on WR3. The same gap shows up elsewhere: PreColors and Colors disagree on slotWins20 for SAM (PreColors 0.074, Colors 0.263) and CB1 (PreColors 1.442, Colors 1.056). So the WR3 question is really a Colors/PreColors fidelity question.

Please help resolve it: re-measure WR3 (and SAM and CB1) on the engine snapshot you have (`4ca9a071` — the frozen snapshot, and the Colors engine on the Architect's branch if you can reach it). Compute WR3's local slope at ±5 around its pool center, and its slotWins20, on both engines if you can. Report which engine's number is right and why they differ. If the Colors engine is right and WR3 truly does not move, say so with the numbers. If the MUSE computation is wrong, say so with the correction. The council is working the same question in parallel (P-325) — your independent check is the cross-check.

### Recheck the math

Independently recompute the NEW Wins table (local slope at ±5, pool centers, slope × 20) from the engine and compare it, slot by slot, to the table in §2. In particular, check:
- **SAM (0.3 → 0.1).** The SAM wins curve is much flatter around the pool average (72.5) than over 70→90, so the local slope is far lower than the secant. Is that real, or is it a kink in the SAM curve? Check the slope at ±3 and ±7 as well — if SAM's slope moves a lot with the spread, the ±5 value is fragile.
- **OT1 (1.3 → 1.2).** The exact values are 1.2505 vs 1.2497 — a rounding-boundary artifact. Confirm it rounds to 1.2 and that it is not a real move.
- **WR2 (1.0 → 1.1) and RB2 (0.2 → 0.1) and TE2 (0.4 → 0.3).** Confirm these moves and their sizes.
- **The centers.** The pool centers used were the CSV means (madden27-ratings.csv, n=1,941): QB 71.85, HB 75.98, WR 75.53, TE 70.48, LT/RT 74.05, LG/RG 72.99, C 71.43, EDGE 74.87, DT 73.93, LB 72.47, CB 74.99, SS 74.63, FS 73.76, K 78.27, P 77.03, FB 71.88. Confirm these are the right pool and the right means for the Colors engine.

If any number in the §2 table is wrong, report the correction — do not build w88 on a wrong number.

### Improve the method

The new method (pool-grounded local slope at ±5, Wins = slope × 20) is decided, but it is new and it can be improved. If you see a better way, propose it:
- Is ±5 the right spread, or would ±3 or ±7 be more stable (especially for SAM, TE2, RB2, WR2 — the slots that move)?
- Is slope × 20 the right way to express the Wins, or should the displayed Wins be computed differently (for example, wins(center+10) − wins(center−10), a 20-OVR span centered on the pool average, rather than the slope scaled up)?
- Is the CSV pool the right pool, or should the centers come from the engine's embedded pool?
- Is **localWins20** the right name, or do you have a better one?

File what you find as a review or a proposal. The council is working the same questions (P-326) — your view as the builder who has to display the numbers is the one they do not have.

## §5. Council work you need to know about

New council work has landed since the w88 prompt was first written. The parts that affect you:

- **Super, P-193 flex-guide data review (2026-11-09, `inbox/20261110-0055-super-P-193-flex-guide-data-review.md`, council/super).** The flex guide data lives in **three inconsistent versions**: `council/muse` REV 4 (107 rules, Owner 29 Oct), the Architect's branch (97 rules, Owner 9 Nov), and the Owner's expected post-items-3+7 state (105 rules: 23@12, 40@6, 16@2, 26@0). Items 3 + 7 have **not** been applied to either live version. Two blockers: (1) the `council/muse` `flexcheck.mjs` only accepts penalties [0,2,4,6] plus a QB=10 special case — it **rejects penalty 12**, so it cannot validate the tier-12 table items 3+7 require (the Architect's branch already updated its checker; `council/muse` has not — MUSE owns that fix); (2) the `council/muse` `flexengine.js` spot checks are stale vs REV 4. **What this changes for you:** nothing in w88 (w88 is Wins, not flex — do not touch flex values in w88). But do not use the `council/muse` flex.json (REV 4) as a reference for flex data — the Architect's branch (97 rules) is the current truth, and the 105-rule version is pending. If you display flex data in the UI, the architect branch is the source. The flex-table flux is a separate track from w88.
- **GLM, final-105 candidate (2026-11-09, `_agents/glm/deliveries/flexrebuild/final-105/`, council/glm).** GLM built the 105-rule table (base `728b2c53` + items 3+7 verbatim = exactly 10 moves) and it lands at **105 rules {12:23, 6:40, 2:16, 0:26} — the Owner's expected counts exactly**. This independently confirms the flex-answers counts the MUSE seat computed. GLM's `flexcheck` fails only on the SAM destination (the checker's dest set needs SAM — the same blocker Super found). **What this changes for you:** nothing in w88. It confirms the flex direction is settled and the 105-rule table is ready when the Architect lands items 3+7.
- **Iceman, P-309 grid reconcile (2026-11-09, `inbox/20261110-0054-iceman-P-309-grid-reconcile.md`, council/iceman).** Iceman independently recomputed 11 theta-grid cells straight from the frozen engine and they all match (11/11, including QB>FS@90 θ1.0 = 24.45). The ×20 discrepancy existed only in Super's superseded version. The D-picks foundation is solid. **What this changes for you:** nothing in w88. It confirms the flex/D-picks math your UI briefs on is verified.
- **Inkling, w87 live verification (2026-11-09, council/inkling).** Inkling verified w87 live (receipt in bulletin + lane). **What this changes for you:** w88 builds on a live-verified w87. Start from the w87 file as published.
- **The council is verifying your numbers in parallel (P-325, P-326).** P-325 is the WR3 question + Colors/PreColors fidelity; P-326 is an independent recheck of the localWins20 math + method improvements. Your §4 verification is the cross-check. If either side finds a correction, w88 uses the corrected number.

## §6. Boundaries

- w88 is built on w87 (start from the w87 file, `Football-Sim-Z-post-blue-w87.html` on `origin/gh-pages`). Publish w88 as its own file the same way w87 was published. It is a w-series wave, not a Slice — do not touch 67 Cakepanz, do not touch the engine, do not move any pin, do not generate ratings, do not touch the brand.
- The engine is untouched (as in w87). The flex table is not part of this wave — the flex values in the UI stay as they are in w87; the TE/SAM flex changes (items 3+7, the 105-rule table) are a separate Architect step. The flex-guide inconsistency in §5 is infrastructure being fixed separately; do not try to fix it in w88.

## §7. Review — what happens when w88 lands

When you publish w88, the council reviews it the same way as w87 (three ok/improved reviews from three seats = REVIEWED). The review checks:
1. **The numbers.** The guide shows the §2 Wins table (NEW measurement) in the new ranking order, and the position rankings buttons show the same Wins numbers. No stray weight numbers remain where a position value is shown. If the §4 verification changed a number, the review checks w88 against the **corrected** number, not the §2 table.
2. **The order.** The 1–32 ranking matches the §2 table (WR2 6th, SAM 26th, RB2 30th). A rank that does not match the Wins value is a defect.
3. **The meaning.** The number reads as Wins. A user seeing "2.5" should be able to tell it means Wins per season for that slot at the local rate. If the label does not make that clear, the review will flag it.
4. **The boundaries.** w88 is w87 + the Wins change only. No Slice 3 work, no engine change, no flex-value change, no pin move. Headless verification clean, as in w87.

Report the file, its size/md5, the verification result (§4), and a spot check: the guide shows the Wins table, and the position rankings buttons show the same Wins numbers.

## §8. Innovate

You have the Owner's permission and encouragement to execute whatever you think is best inside the w-series — you decide the implementation, you build first (review catches problems after, no pre-approval to build inside your tree), and you innovate and brainstorm what the track needs beyond the listed work. If showing Wins opens a better way to present the values (a label that makes "2.5 Wins" read clearly, a tooltip explaining what the number means, a layout that makes the ranking easier to scan), build it or note it as an `IDEA:` — and bring new ideas about the track, not just the numbers above. Think around the issue, not just through it. One note: the number is a Win per season for a slot at the local rate around its pool average — if the user reads "2.5" without knowing what it means, the number does not help them. Make the meaning visible.
