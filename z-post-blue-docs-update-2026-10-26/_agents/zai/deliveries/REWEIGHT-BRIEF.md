# REWEIGHT BRIEF — rebalancing the 26+2 starting spots (Owner-approved scope)

**FROM: Z.ai (High Councillor) | FOR: Claude (Architect), or any council agent the Owner prompts | STATUS: OPEN for the unit reweighting; §7b (FB/Punter math) is now DESIGNED AND SHIPPED in the engine.**
**DATE: 2026-10-25 · REV 2 (wave 11). The Owner supplied three independent analyses; this brief consolidates them into one executable specification.**
**→ THIS IS THE WEIGHTS GUIDE. It is the single source of truth for the value scale. It is referenced from HANDOFF-FOR-CLAUDE (§0c), the download README, publish.sh, the in-site Guide's "Position values" section, and the Council bulletin — if you are touching the value math at all, start here.**

---

## 1 · What the Owner decided

The current model's derived hierarchy disagrees with modern NFL analytics, EPA,
draft capital and the salary market in a few specific places. The Owner supplied
three analyses (salary-market audit, conventional-logic audit, and a market-
anchored revaluation) and ruled:

- The **top spot (QB) is 1000**, or any integer base ending in **0**.
- All weights are **base-ten integers**; an ending **5** is allowed only where it
  materially improves the math's accuracy.
- Changing the numbers changes the math of every game — that is accepted and intended.
- Whoever tackles it may also **visualize it beautifully** (the Guide's
  positions-ranked graphic is engine-derived and will auto-update).

## 2 · Where the math actually lives (entry points)

The hierarchy is **derived**, not stored. In `Football-Sim-Z-post-blue.html`:

| Layer | Symbol | Role |
|---|---|---|
| Slot → unit composition | `RATING_SPECS`, `DEF_SPECS` | weighted averages that build the 9 unit ratings |
| Unit → team | `teamRatings()` (passOff/runOff/off/def blends) | combines units |
| Ratings → points/wins | `bestUnitPts`, `PLAN_K`, `POINTS_PER_WIN`, `HOME_FIELD` | the game model |
| Slot → wins table | `slotWinsTable()`, `slotWins(slot, ovr)` | wins per OVR, per spot |
| Display scaling | `modelWeights()` (scales biggest spot to 700), `DEFAULT_WEIGHTS` | Madden-Rankings page |
| Guide graphics | `zpbPosRankHTML()`, `zpbSeriesHTML()`, `zpbValuesHTML()` (wave 10) | auto-update from `slotWins` |

**The levers are the composition weights (RATING_SPECS/DEF_SPECS) and the
per-unit coefficients in `teamRatings`/`bestUnitPts` — NOT a static weight table.**

## 3 · Current model output (to be corrected)

Current 70→90 wins-per-spot hierarchy (engine-derived at time of writing):
QB 2.54 → CB1 1.44 → EDGE1 1.30 → CB2 1.18 → WR1 1.10 → OT1 1.04 … K 0.72 → RB1 0.67 → WR2 0.60 …

## 4 · Target hierarchy (Analysis 3's market-anchored table)

| Rank | Spot | Value (analyst scale) | Rationale |
|---|---|---|---|
| 1 | QB | 2.54 | unchanged — the anchor |
| 2 | EDGE1 | 1.40 (↑ from 1.30) | pass-rush primacy; highest-paid defenders |
| 3 | CB1 | 1.35 (↓ slightly) | still premium, under EDGE |
| 4 | WR1 | 1.15 | explosive-play engine |
| 5 | DT1 | 1.05 (↑ from 0.95) | interior rush market exploded |
| 6 | OT1 | 1.04 | blindside |
| 7 | OT2 | 1.00 | RT market caught up |
| 7 | EDGE2 | 1.00 | |
| 8 | CB2 | 0.95 (↓ from 1.18) | the clearest single error today |
| 9 | CB3 | 0.90 · SS 0.88 · MIKE 0.86 · FS 0.85 · G1/G2/C 0.85 · TE1 0.82 (↑) · WILL 0.80 | |
| 10 | DT2 | 0.76 | |
| 11 | WR2 | 0.65 (↑ from 0.60) · RB1 0.58 (↓ from 0.67) | the Owner-confirmed flip |
| 12 | K | 0.45 (↓ from 0.72) · WR3 0.40 | kicker owns 100 % of his rating — discount the per-point coefficient |
| 13 | RB2 0.22 · TE2 ~0.18 · SAM 0.07 | | |

**Owner scaling rule:** divide by 2.54, multiply by 1000, round to integers
ending in 0 (5-endings only where ordering would otherwise collapse):
QB 1000 · EDGE1 550 · CB1 530 · WR1 450 · DT1 415 · OT1 410 · OT2 395 · EDGE2 395 ·
CB2 375 · CB3 355 · SS 345 · MIKE 340 · FS 335 · G1/G2/C 335 · TE1 325 · WILL 315 ·
DT2 300 · WR2 255 · RB1 230 · K 175 · WR3 155/160 · RB2 85 · TE2 70 · SAM 25/30.
(Keep the engine's internal wins math in wins; the integer scale is the
DISPLAY/weights-layer presentation, e.g. `modelWeights()` output.)

## 5 · Composition-level fixes the analyses called for

1. **CB2 down**: `coverage: {CB2: 1.15}` is too hot relative to WR's share of
   `rec`. Either trim CB2's coverage weight or boost WR2's `rec` share.
2. **Kicker discount**: K owns 100 % of the `kicker` rating and therefore
   accumulates wins without the dilution shared ratings impose — discount the
   kicker unit's per-point coefficient in the scoring model.
3. **RB1 receiving share**: `rec: {RB1: 0.2}` (≈5 %) is light — league RBs draw
   ≈15–20 % of targets; 0.35–0.45 is more realistic (partially self-corrects RB1
   through the pass game).
4. **TE2 composition row is zeroed** (`TE2` feeds nothing) — a real TE2 should
   read ≈60 % run · 40 % pass, feeding run-blocking ≈7 % and receiving ≈5 %.
5. **EDGE1 over CB1** follows from 1 + the pass-rush coefficients.

## 6 · Method (safe path)

1. Fork the build script flow; add a **calibration harness**: run `slotWins()`
   for every spot, assert the produced ORDER matches §4 (tolerance for the
   ties marked with ·).
2. Adjust composition weights in small steps; after each step re-run the
   harness AND a **stability check**: 100-season league averages (wins per
   team, playoff distribution) must stay within sane NFL bands — the sim is
   built to stay under real single-season records.
3. Update `modelWeights()` scaling comment (700 → 1000) and the Madden-Rankings
   note; the wave-10 Guide graphics need no edit (engine-derived).
4. Record the before/after table in the build report and hand it to the Owner.

## 7 · Related wave-10 facts the implementer must know

- **§7b · FB and Punter math — DESIGNED AND SHIPPED (wave 11, Owner-approved
  25 Oct: "you can go ahead and design the math now").** The Owner lifted the
  "Claude will design it" reservation. What is in the engine now:
  - **FB (lead blocker):** `RATING_SPECS.olRun` gains `FB:0.30` — a real share
    of run blocking. `WV_OFF_SLOTS` now includes FB (it was missing, which had
    zeroed the slot). Measured: FB 90 OVR ≈ **+0.034 wins** over a 70; RB1 90
    ≈ +0.40, so a great FB is worth ~8 % of a great RB1.
  - **P (hidden yards):** `teamRatings` exposes `r.p = slotOvr('P')`;
    `matchupModel` adds `puntPts = -PUNT_PTS·(exp((D0.p−80)/45) − exp((lg.p−80)/45))`
    with `PUNT_PTS = 1.6` — the defense's punter flips field position, taking
    points OFF the opponent's projection (parallel to the existing kick/return
    terms). Measured: P 90 OVR ≈ **+0.208 wins** over an 80 league average —
    roughly half a great kicker (K 90 ≈ 0.45), consistent with hidden-yards
    studies. A 70 punter is worth less than replacement (−0.17).
  - Both flow through `slotWinsTable()`/`slotWins()` automatically, so the
    draft board, flex matrix, 3-4 harness and the Guide graphics are honest
    for FB/P with no display-only special case. Run the §6 harness in BOTH
    4-3 and 3-4 modes (window.ZPB34) after any further composition change.
- **3-4 mode** (`window.ZPB34`) relabels DT1→NT, DT2→OLB1, MIKE→ILB1, WILL→ILB2,
  SAM→OLB2 and consults `zpbAdjSpec()` so OLB=WILL and ILB=MIKE. The wins
  harness must be run in BOTH modes after any composition change.
- The PR (punt returner) row is UI-only for now (`seasonState.prReturners`).

— Z.ai
