SPEAKER: vloc | ROLE: council seat | TASK: P-013 weights audit (step 1 of bias protocol) | DATE: 2026-11-07T20:59:00Z
FOR: P-013

# Weights audit — what was fitted to the table vs what is independent

**Status:** read-only diagnostic. No product file touched, no simulation run. Labels per AGENTS.md §7 (VERIFIED / REPORTED / INFERRED / UNKNOWN).

## 1. The three weight tables that exist

| Table | Source | QB | WR1 | DE1 | CB1 | SS | FS | Notes |
|---|---|---|---|---|---|---|---|---|
| design.json | tools/mathlab/design.json | 1000 | 470 | 520 | 450 | 240 | 260 | Earlier table the engine was fitted to |
| cfg.json targets (wins7090) | tools/mathlab/cfg.json | 2.54 | 1.1938 | 1.3208 | 1.143 | 0.6096 | 0.6604 | Converted: ×(1000/2.54) = design.json values |
| Owner final (11-06) | _agents/owner-notes/2026-11-06-weights-final-verbatim.txt | 1000 | 650 | 650 | 400 | 300 | 300 | Owner's permanent opinion; salary col internal only |
| DEFAULT_WEIGHTS (current product) | Football-Sim-PreColors.html line 452 | 320 | 60 | 350 | 350 | 80 | 60 | What's actually in the build right now |

**Finding:** The engine's `DEFAULT_WEIGHTS` (QB 320 / WR1 60) do not match the Owner's final weights (QB 1000 / WR1 650). The engine was fitted to `design.json` (QB 1000 / WR1 470 / DE1 520 / CB1 450), which is neither the current product's DEFAULT_WEIGHTS nor the Owner's final weights. The Owner's final table gives WR1 650 (65% of QB) where design.json gives 470 (47% of QB) — a large gap.

## 2. Parameters FITTED to the table (VERIFIED from fitlm.js + results/fit-precolors-2026-10-28-recv.json)

The Levenberg-Marquardt fit in `tools/mathlab/fitlm.js` patched these engine internals in memory so `slotWinsPerOvr()` measured values land on the `design.json` targets:

| Parameter | Where in product | Fitted? | Original → Fitted (recv fit) |
|---|---|---|---|
| RATING_SPECS.olRun | line 1939 | YES | OT1 1.0→1.09, OT2 1.0→1.02, OG1 1.2→1.08, C 1.2→1.19, TE1 0.6→0.35, FB 0.3→0.36 |
| RATING_SPECS.olPass | line 1940 | YES | OT1 1.4→1.53, OT2 1.4→1.43, OG1 1.0→0.90, C 1.0→1.00 |
| RATING_SPECS.rb | line 1941 | YES | RB1 2.0→1.95, RB2 0.5→0.48 |
| RATING_SPECS.qb | line 1942 | YES | QB 1→1 (unchanged) |
| RATING_SPECS.rec | line 1943 | YES | WR1 1.5→0.99, WR2 0.9548→0.91, TE1 0.8953→0.53, RB1 0.199→0.19, TE3 0.0452→0.02, WR4 0.0056→0.02 |
| RATING_SPECS.passRush | line 1944 | YES | DE1 1.835→1.90, DE2 1.468→1.40, DT1 0.9175→1.05, MIKE 0.3→0.26, WILL 0.3→0.27, DL5 0.4455→0.45 |
| RATING_SPECS.frontRun | line 1945 | YES | DT1 1.376→1.58, DE1 0.9175→0.95, MIKE 1.2→1.03, SAM 0.7→0.94, CB1 0.7→0.70, FS 0.5→0.48, DL5 0.3878→0.39 |
| RATING_SPECS.coverage | line 1946 | YES | CB1 1.4→1.39, CB2 1.15→1.06, CB3 0.9→0.86, SS 0.8→0.69, FS 0.8→0.77, MIKE 0.4→0.34, WILL 0.4→0.36, SAM 0.3→0.40 |
| RATING_SPECS.kicker | line 1947 | YES | K 1→1 (unchanged) |
| DEF_SPECS.frontBase | line 2045 | YES | DT1 1.376→1.58, SAM 1.0→1.34, CB3 0.1→0.10, DL5 added 0.39 |
| DEF_SPECS.frontNick | line 2045 | YES | SAM 0.1→0.13, SS 0.6→0.51, DL5 added 0.39 |
| DEF_SPECS.covBase | line 2047 | YES | CB3 0.25→0.24, SAM 0.4→0.54 |
| DEF_SPECS.covNick | line 2048 | YES | CB3 1.0→0.96, SAM 0.05→0.07 |
| DEF_SPECS.covDime | line 2063 (added by dime install) | YES | DIME 1→1.09 added |
| PERS_REC.12/13/21/22 | line 2038 | YES | All rows scaled down (WR1 1.5→0.99, TE1 0.9→0.53, TE2 0.6→0.41, etc.) |
| MC.qb / MC.toQb | line 2087 | YES | qb 0.00766→0.00655, toQb 0.0172→0.01471 |
| MC.kick | line 2087 | YES | kick 0.069→0.04859 |
| MC knobs (rb, olRun, front, rec, olPass, rush, cov) | line 2087 | YES | rb 0.0249→0.0208, rec 0.0173→0.02045, rush 0.0138→0.01579, cov 0.0283→0.0184, etc. |
| PUNT_PTS | line 1969 | YES | 2.36→1.084 (cfg patch) |

**Fit quality (VERIFIED from results file):** RMS log-error converged to 0.14% by iteration 4. All 28 slots hit their design.json targets within ~1%. The engine's measured `slotWinsPerOvr()` now matches design.json BY CONSTRUCTION.

## 3. Parameters INDEPENDENT of the table fit (VERIFIED from source inspection)

These were NOT touched by fitlm.js and are not functions of the weights table:

| Parameter | Where | Status |
|---|---|---|
| NATURAL_SLOT_MAP | line 931 | Independent — position→slot mapping |
| FLEX / flex.json | line 940, tools/mathlab/flex.json | Independent — flex penalties |
| PLAN_K | line 2050 | Independent — game-plan coefficients |
| slotWinsTable() curve shape | line ~1340 area | Independent — OVR→wins curve (not fitted) |
| WINS_BASE = 70 | line 1370 | Independent constant |
| STATIC_SLOTS mapping | line 1371 | Independent — position→slots for WAR |
| teamRatings() base function | line 1988 | Independent structure (composition weights fitted, not the function) |
| matchupModel() base function | line 2100 | Independent structure (MC coefficients fitted, not the function) |
| cpuBias / cpuNoise / cpuMiss | lines 1389-1397 | Independent — draft behavior |
| synergy system (run/pass/passGame) | lines 466-504 | Independent — all disabled by default |
| GROUPS / LABELS / GROUP_DEFS | lines 452-455 | Independent — display only |
| ROSTER_SLOTS, WV_SLOT_GROUP, WV_TAG_GROUP | ~line 450 area | Independent — slot definitions |
| RET_PTS = 2.36 | line 1969 | Independent constant (before puntPts patch) |
| HOME_FIELD = 1.7, BASE_PTS = 21.5, etc. | lines 2090-2091 | Independent constants |

## 4. The bias question — what the audit shows

**The engine cannot confirm the Owner's final weights because it was tuned to match design.json, not those weights.** (AGENTS.md §9: "calibrate-weights.mjs then fitted the engine's rating specs so each slot's measured value lands within 26 of its weight. So the engine can't confirm your weights, because it was tuned to match them.")

**Secondary weighting:** design.json gives CB1 450, CB2 340, CB3 280, SS 240, FS 260 = 1,570 secondary points. Owner's final gives CB1 400, CB2 250, CB3 100, SS 300, FS 300 = 1,350. The fitted engine inherits design.json's heavier secondary. Whether that's "bias" depends on the anchor — the protocol's step 2 (pre-registration) defines how to test this against real data.

**Conclusion of step 1:** The audit is complete. Every fitted parameter is listed above; every independent parameter is listed above. No engine parameter was fitted to the Owner's 11-06 final weights. The next step is step 2: pre-register the bias test before running any simulation or looking at any data.

## 5. Recommended next step

Create the pre-registration file (inbox/20261107-2059-vloc-P-013-weights-prereg.md) defining metrics, thresholds, and evidence standards, then commit and push this audit. The Architect and a Verifier should review the pre-registration before any data is examined.
