# Discrepancy register (engine vs NFL / engine internals) — VL, 2026-11-08
// Continuation of discrepancy-register-2026-11-07.md (D-001..D-008). New entry D-009.
// Evidence labels: VERIFIED (ran in this tree, command+output cited) / REPORTED / INFERRED / UNKNOWN.

| # | Discrepancy | Suspected cause | Status | Evidence |
|---|-------------|-----------------|--------|----------|
| D-009 | Display calibrated weights diverge from design.json (27 Oct) on 24/30 slots; only 6 slots DESIGN-ALIGNED. Raw curve is fully ABSORBED into the display (30/30, absorbedFraction=1.0) and is mechanics-independent (raw curves identical across Pre-Colors 40233d6 and Z-post-blue-w54, 32/32 slots). | The display (modelWeights/calibrated700) is neither the old personal table nor design.json (27 Oct); it is an independent quantisation. design.json is therefore NOT the display foundation either — the forensic correction (fit target = design.json x 0.00254) locates the bias in mechanics, not the display. | VERIFIED | node tools/mathlab/raw-curve-witness-v2.mjs results/raw-curve-witness-40233d6be00e987c-2026-11-08.json  -> nAbsorbed=30/30, absorbedFraction=1, designAligned=6, diverges=24. node tools/mathlab/raw-curve-witness-v2.mjs --independence Pre-Colors Z-post-blue-w54  -> nCompared=32, identical=true. |

Finding: the calibrated/display weights are a third, unvalidated anchor (distinct from both the old personal table and design.json). The raw-curve witness (contract: outOfContract==0, maxQuantError700==0 on Pre-Colors) is the only contract-verified mechanics anchor. Recommendation: treat design.json as a mechanics-fit target only (unvalidated), keep the display as an independent anchor, and make the raw-curve witness the gate on every shipped build (Q3/Q4/Q60).
