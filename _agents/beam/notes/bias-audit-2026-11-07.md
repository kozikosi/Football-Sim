# Engine bias audit — 2026-11-07 (Beam, read-only)

Purpose: answer "is the engine biased toward the Owner's original personal weights, especially the secondary?" Before any simulation is run. No product file touched. No constants changed.

## 1. Where the Owner's weights enter the engine

- `colors/src/engine/slots.ts` `SLOTS` weights = "ENGINE-MATH-SPEC REV 5, Owner-approved values"; comment: equal to `tools/mathlab/design.json`, which a test compares key-by-key. These ARE the target table (salary scale), not a measurement.
- Pre-Colors `DEFAULT_WEIGHTS` (line 452) = older target table (REV 4-era). Still shipped as the default on the Madden Rankings page.
- `modelWeights()` (Pre-Colors line 459) quantises `slotWinsPerOvr()` to the 700 scale. It is the "revealed impact" display, but it is a fit to the engine's own mechanics, not an independent check on the table.

## 2. What was fitted to the table (per code comments + protected-constant list)

- `RATING_SPECS` (protected, colors/src/engine/specs.ts): comment "Final fitted knobs (lab 28 Oct): changed keys take the fit, the rest are Pre-Colors' values." So the slot-blending weights inside each unit rating were moved to make `slotWinsPerOvr()` land near the target.
- `MC` (protected): "Final fitted knobs (lab 28 Oct)" — all 14 keys fitted.
- `PLAN_K`: described as Pre-Colors' values ("the rest are Pre-Colors' values"), i.e. NOT refitted. Treated as independently built.
- `FLEX`: Owner's table (rev 4/5), not fitted to slot values.
- `DEFAULT_WEIGHTS` / `SLOTS` weights: the target itself.

## 3. What was built independently of the table

- `POINTS_PER_WIN` = 32.5 (Sports Info Solutions Pythagenpat conversion).
- Matchup model structure: `matchupModel`, `applyOffPlan`, `applyDefPlan`, `bestUnitPts`, personnel packages (PERS/PERS_REC), defensive packages (DEF_SPECS structure).
- `PLAN_K` structure and values (Pre-Colors).
- `RUSH_BASE/PASS_BASE/PT_*` constants; `BASE_PTS/HOME_FIELD/PTS_NOISE`.
- `DL5_SHARE` (measured: 0.33 balanced, 0.40 aggressive from 1,632 team-games).
- Returner term neutralised (RET_NEUTRAL = 82) pending Owner definition.

## 4. Measured structural fact: secondary share

Colors SLOTS total weight = 8610. Secondary (CB1+CB2+CB3+DIME+FS+SS) = 1610 = 18.7%. QB alone = 1000 = 11.6%. So the secondary group outweighs the quarterback slot group. Whether that is bias or real value is exactly what the pre-registered test must settle; it is flagged, not asserted.

Salary-table secondary share (Owner's 2026 table, 32 slots): CB1 400 + CB2 250 + NICKEL 100 + DIME 50 + SS 300 + FS 300 = 1400. QB 1000. Same shape: secondary > QB.

## 5. Why `slotWinsPerOvr()` cannot currently validate the table

`slotWinsPerOvr()` raises one slot's OVR 70->90 with all others at 80, through `teamRatings()` (which uses RATING_SPECS) and `matchupModel()` (which uses PLAN_K). Since RATING_SPECS was fitted to the table, the measured curve is a consequence of the fit, not evidence for or against it. An independent check requires an external anchor (real data) that never touched RATING_SPECS.

## 6. Conclusion

Bias is plausible and currently undetectable by the engine's own tools, because the measurement was fitted to the target. The only way to bound it is the pre-registered protocol in bias-preregistration-2026-11-07.md, using real multi-season data the engine has never seen.
