# mathlab — measures and fits the REAL engine; never writes a product file
Needs Node + Playwright (`NODE_PATH=$(npm root -g)`), and a product-like HTML (Z-post-blue wave 13, Pre-Colors, or later V23). Engine edits are made **in memory inside headless Chromium**; the HTML on disk is never modified.
| File | What it does |
|---|---|
| `design.json` | the target position-value table (QB 1000, tens) = the specification |
| `cfg.json` | fit settings: targets in wins (weight x 0.00254), new-term constants, DIME share, MC knobs allowed to move |
| `fitlm.js` | Levenberg-Marquardt fit of composition weights + MC knobs to the table; writes `results/fit-*.json` |
| `check-design.mjs` | tests E1/E2: derived integers equal the table, no inversions, all end in 0 |
| `after.js` | installs a fit in memory; prints the table, pass/run split, full-lineup realism |
| `realcheck.js` | 32 real rosters vs 2025 wins (`wins2025.json`), before/after |
| `flex.json` `flexparse.mjs` `flexcheck.mjs` `flexengine.js` | the Owner's flex guide as data; re-parse from his text; sanity; compile into the engine's table and test with the engine's own `flexPenaltyFor` |
| `flexdl5.mjs` `flex-dl5.json` | derives the DL5 flex rule from the Owner's guide (cheaper of role->DT and role->EDGE; DT and EDGE natural) and checks the file matches; test E3d |
| `dl5-snaps.py` | measures how many defensive snaps the 5th lineman plays from public nflverse snap counts (evidence for the 0.33 share); output in `results/dl5-snap-measurement-2026-10-27.txt` |
| `emit-patch.mjs` | prints the exact literals for the build from a fit result |
| `inpage.js` | `installDime` (the 29th slot and its situational coverage term); `installDL5` (the 30th slot: rotation share baked into the DL weights) |
| `lab.js` | table / split / stack measurements |
Typical run: `node fitlm.js <html> cfg.json --out results/fit.json && node check-design.mjs results/fit.json && node realcheck.js <html> results/fit.json wins2025.json cfg.json`.
A test you add must fail when the thing it guards is broken: corrupt one input and watch it fail (ENGINE-MATH-SPEC section 7, E8).
| `personnel-shares.py` | measures offensive personnel shares from nflverse participation data (evidence for TE3 / WR4; output `results/personnel-measurement-2026-10-28.txt`) |
| `recv-plan-experiment.js` | the experiment behind spec 14.3: `'10'` as a plan option (do not use for the build) |
| `installRecv` (inpage.js) | adds TE3 and WR4 as fixed-share spots (cfg.json `recv`); canonical 32-spot fit `results/fit-precolors-2026-10-28-recv.json`, literals `results/engine-patch-2026-10-28-recv.js.txt` |

## T12 reporting law (governance)
Every lab JSON must carry n, spread, CI, and a pre-stated practical-effect threshold. `node uncertainty.mjs <lab.json> [--threshold <frac>] [--out out.json]` re-emits any lab JSON with per-slot uncertainty metadata and flags values at/above the threshold. If a field cannot be computed from a single deterministic measurement, it is reported as null/unknown — never invented.

## New council tooling (Super, 2026-11-07, read-only on product)
- `triangulate.mjs --design design.json (--fit <fit.json> | --html <product.html>) [--calibrated <cal.json>] [--out <out.json>] [--csv <out.csv>] [--md] [--threshold <frac>] [--spread1000 <pts>]` — T3 per-slot triangulation. Two modes: (a) read fitlm.js output, (b) sandbox eval of product inline engine (no Playwright). Raw/fitted/design/calibrated/ownerFinal/salaryOnly anchors, derived1000, expected700, quantError700 contract check (|error|<=2.5 per AGENTS §3), rank correlations (Spearman), spread1000 threshold, bootstrap CI, disagreement flags. Outputs JSON + optional CSV of raw curves.
- `mechanics-harness.mjs --fit <fit.json> [--bands <bands.json>] [--out <out.json>]` — T1 deterministic L1 mechanics: L1 opportunity (slotWins 70→90 span) and L3 efficiency (wins per +1 OVR) measured; L2 production and play-level distributions flagged NEEDS-RNG (injectable RNG T-20261022-claude-2 not yet in product). Pre-registered bands; fail→report, never auto-adjust.
- `replacement-audit.mjs [--pool <pool.json>] [--snaps <snaps.json>] [--out <out.json>]` — T4 replacement-level auditor: engine's replacement definition (replacementLevels/staticReplacement/WINS_BASE=70/STATIC_SLOTS), sensitivity on N spots open, optional nflverse snap comparison. Includes Beam's VERIFIED DL5 snap data (rank5 mean 32.8% snaps, 2023-2025, n=1632 team-games).
- `cross-validate.mjs --super <fit.json> --beam <witness.json> [--threshold <pct>] [--out <out.json>]` — cross-toolchain validation: compares Super's Pre-Colors product measurements (fitlm.js) against Beam's Colors-engine raw-curve witness. Validates both toolchains measure identical math.
- `run-all-tests.mjs [--html <path>]` — combined runner for all 13 tools (Super T1/T3/T4/T6/T7/T12 × 2 modes + Beam T3/T4/T7/T12 + cross-validate). Reports PASS/FAIL per tool.
- `uncertainty.mjs <lab.json> [--threshold <frac>] [--out <out.json>]` — T12 uncertainty wrapper / reporting law: per-slot n, spread, CI, threshold, verdict. Also supports `wrap <in.json> [out.json]` (add _uncertainty block) and `check <in.json>` (validate _uncertainty block present).
- `flex-pricer.mjs [--out <out.json>]` — T6 flex opportunity-cost pricer: cost(pos→dest, ovr) = slotWins(natural, ovr) − slotWins(dest, ovr); OVR-equivalent vs flat FLEX table penalties. Deterministic, n=1 per cell.
- `metamorphic-battery.mjs` — T7 metamorphic checks: identical-roster symmetry, monotonicity (coverage + structPts), uniform +5 (no slot >40%), name-independence, color-independence, matchupModel monotonicity.

## Verified run (2026-11-07, Football-Sim-PreColors.html)
`node fitlm.js Football-Sim-PreColors.html cfg.json --out results/fit-super-verify-2026-11-07.json` → converges to 0.1% RMS log-error; all slots within ±0.8% of design.json. Downstream T1/T3/T4/T12 outputs in `results/*-super-2026-11-07.json`. No product file touched; no protected constant changed.
| `uncertainty.mjs` | T12 uncertainty wrapper / reporting law: n, spread, CI, pre-stated threshold on every lab JSON. Plain Node. |
| `triangulate.mjs` | T3 triangulation generator + raw-curve witness: per slot raw measured span · fitted · design target · spread · bootstrap CI · disagreement flag. Plain Node. |
| `mechanics-harness.mjs` | T1 mechanics validation harness (deterministic L1): 4-level ladder, pre-registered tolerance bands, fail→report never auto-adjust. L2 production & play-level flagged NEEDS-RNG. Plain Node. |
| `replacement-audit.mjs` | T4 replacement-level auditor: documents engine's replacement definition (read-only from product), sensitivity on N, optional snap comparison. Plain Node. |
