# VL bias-audit — step 1 of the Owner's bias protocol (read-only, no simulation run)

Seat: VL · Role: Council Advisor · Branch: council/vl · Date: 2026-11-07
Status: COMPLETE (audit only; engine untouched, no numbers produced)

## What was audited
Every engine parameter that determines per-slot position value, split into "tuned to the target table" vs "built independently". Sources read: `colors/src/engine/slots.ts`, `colors/src/engine/specs.ts`, `colors/src/engine/value.ts`, `colors/src/engine/ratings.ts`, `colors/src/engine/flex.ts`, `tools/mathlab/fitlm.js`, `tools/mathlab/cfg.json`, `tools/mathlab/design.json`, `tools/mathlab/results/fit-precolors-2026-10-28-recv.json`, `tools/mathlab/results/engine-patch-2026-10-28-recv.js.txt`, `tools/mathlab/results/flex-compiled.json`, `git log` for design.json/slots.ts/specs.ts/cfg.json/flex.json, `AGENTS.md` §3 & §9, `PRIORITIES.md` P-013. No simulation was run and no product file was touched.

## A. The target table (the model weights shown to the user)
`colors/src/engine/slots.ts` `SLOTS` == `tools/mathlab/design.json` exactly (a test compares them key by key). 32 spots, QB = 1000, every weight a multiple of 10. This is the specification the engine math was fit to.

Current table (VERIFIED by reading both files; they match): QB 1000, DE1 520, WR1 470, CB1 450, OT1 430, DT1 400, DE2 400, OT2 400, CB2 340, WR2 330, C 320, OG1 290, DT2 300, OG2 290, CB3 280, TE1 270, MIKE 260, FS 260, SS 240, WILL 240, RB1 230, WR3 190, K 200, P 100, RB2 80, TE2 60, FB 30, SAM 30, DIME 40, DL5 140, TE3 10, WR4 10.

## B. Provenance of the target table — NOT the Owner's 6 Nov salary table
`git log -- tools/mathlab/design.json` (VERIFIED):
- `20dde5a2` Architect: engine math spec (29 spots incl. DIME) — set the original table
- `5e993c0f` DL5 as 30th spot: measured rotation share 0.33 (`results/dl5-snap-measurement-2026-10-27.txt`, nflverse snaps), refit, derived flex rule (REV 4)
- `972dfeb1` TE3 and WR4 as spots 31/32: measured personnel shares (`results/personnel-measurement-2026-10-28.txt`, nflverse plays), fixed-share engine math, 32-spot refit (REV 5), tests

So `design.json` was set by the Architect's engine-math spec and refined by two measured inputs; it was NOT derived from the Owner's 6 Nov salary table.

Comparison (VERIFIED by reading both JSONs) — current table vs Owner's 6 Nov salary table (the Owner's stated permanent opinion): they differ on roughly 20 of 32 slots. Examples:
| Slot | Current (design.json) | Owner 6 Nov salary table |
|---|---|---|
| WR1 | 470 | 650 |
| OT1 | 430 | 500 |
| TE1 | 270 | 250 |
| DE1 | 520 | 650 |
| DT1 | 400 | 500 |
| OG1 | 290 | 400 |
| CB1 | 450 | 400 |
| SS | 240 | 300 |
| FS | 260 | 300 |
| WILL | 240 | 150 |
| K | 200 | 50 |
| P | 100 | 50 |

So the engine is NOT currently built around the Owner's 6 Nov salary weights. Rebalancing to them is P-013 (Owner decision on protected constants; VL may propose/test, never apply).

## C. What was FIT to the table (tuned — circular; cannot independently confirm design.json)
`tools/mathlab/fitlm.js` (VERIFIED) runs a Levenberg-Marquardt fit inside headless Chromium against the REAL engine: it varies composition weights and MC knobs so `derivedWights()`/`slotWins20()` (wins per +20 OVR on the matchup model, `colors/src/engine/value.ts`) reproduce `cfg.json` targets (= `design.json` × 0.00254 wins). Ridge pulls each variable toward "unchanged" (smallest edit that hits the table); composition weights snapped to a grid and re-measured.

Output `results/fit-precolors-2026-10-28-recv.json` + snapped literals `results/engine-patch-2026-10-28-recv.js.txt` became `colors/src/engine/specs.ts`. (VERIFIED: specs.ts matches the snapped file exactly.)

Tuned to the table (the engine's measured slot values ARE a fit to this table, not an independent check):
- `RATING_SPECS` — all rows: olRun, olPass, rb, qb, rec, passRush, frontRun, coverage, kicker (snapped fit; e.g. rec: WR1 0.99, WR2 0.91, TE1 0.53; orig rec WR1 was 1.5, TE1 0.895)
- `DEF_SPECS` — frontBase, frontNick, covBase, covNick, covDime (snapped fit)
- `PERS_REC` — 12/13/21/22 (snapped fit; TE3/WR4 shares measured from nflverse plays, fixed-share math)
- `MC` knobs that moved: rb 0.0249→0.0208, olRun 0.0516→0.0495, front 0.0559→0.05577, rec 0.0173→0.02045, olPass 0.0149→0.01403, rush 0.0138→0.01579, cov 0.0283→0.0184; plus qb 0.00766→0.00655, toQb 0.0172→0.01471, kick 0.069→0.04859
- New matchup terms: `QB_RUN_C = 0.0194`, `WR_BLK_C = 0.01147`, `WR_BLK_W = [1,1,1]`, `PUNT_PTS = 1.084` (fit; was 1.6), `DIME_W = 0.15` (= 10% snap share × 1.5 leverage, INFERRED per P-196)
- `RET_NEUTRAL = 82` — neutral by rule (AGENTS §7: return data has only OVR/SPD/STR, so any formula would be invented)

## D. What was built independently (NOT tuned to the table)
- `design.json` / `SLOTS` weights themselves — the target table (Architect spec + 2 measured inputs; not from 6 Nov salary table)
- `MC` knobs NOT in `cfg.json` mcKnobs: lean 0.013, toCov 0.0204, toRush 0.0105, skRush 0.0268, skOl 0.0336, skCov 0.012 — kept Pre-Colors values (specs.ts comment: "changed keys take the fit, the rest are Pre-Colors' values")
- `PLAN_K`, `PERS`, `STRAT`, `DEF_FOCUS` — strategy/plan knobs
- Model constants: `GAMES=17`, `POINTS_PER_WIN=32.5`, `BASE_PTS=21.5`, `HOME_FIELD=1.7`, `PTS_NOISE=6.0`, `RUSH_BASE=105`, `PASS_BASE=220`, `PT_*`, `LAM_*`
- `FLEX` / `tools/mathlab/flex.json` (REV 4, Owner's guide; typed copy in `colors/src/engine/flex.ts`; test compares rule by rule)
- `NATURAL_SLOT_MAP` — protected constant
- `EMPTY_OVR`, lineup/hungarian/matchup mechanics

## E. The bias risk (the circularity the Owner flagged)
Because fitlm.js fit the composition weights to make measured slot values reproduce `design.json`, the engine CANNOT confirm its own table — `derivedWeights()` will return approximately `design.json` by construction. The secondary's share of weight (CB1+CB2+CB3+SS+FS+DIME = 450+340+280+240+260+40 = 1,610 of ≈8,575 ≈ 19%, more than QB) is whatever the fit produced, not independently validated against real football. This is exactly what the Owner's protocol is meant to test.

## F. Governing constraints (VERIFIED from AGENTS.md)
- P-013 = "OWNER DECISION: default weights recalibration (protected constants)", P1, Owner 21 Oct. Protected constants (§3): DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS + the modelWeights/slotWinsPerOvr contract. Any change re-pins its hash in MERGE-MANIFEST.md in the same commit; never applied without Owner approval.
- VL is a Council Advisor: may investigate, propose, test, dissent in writing; may NOT edit the product file or protected constants; may not assign work.
- Data integrity (§7): no factual data invented/estimated; every real figure needs a named source. The workspace cannot reach most stats sites — the user may need to supply data (see pre-registration).
- No unseeded-run before/after outcomes (only structural evidence counts until an injectable RNG ships, V23).

## Labels
Everything above marked VERIFIED was confirmed by reading the named file/command in this repo. "INFERRED" = reasoned from the fit design, not measured. Nothing here is a test result; no simulation was run.

Next step (step 2): pre-registration file defining metrics, thresholds, and what counts as bias evidence, committed BEFORE any diagnostic is run.
