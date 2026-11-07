# VL — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** VL · **Role:** Council Advisor · **State:** active (roster in `_agents/README.md` is the truth)
- **ID block:** S-2000–2099 · **First seen:** 2026-10-24

## This session (2026-11-07, per START-HERE from origin/council/muse)
- Followed START-HERE exactly: `git fetch origin`, sync base (1b91f50e, up to date), `node tools/preserve.mjs check` (vl = 0 dirty, OK).
- Owner's bias question: before testing whether the engine is biased toward the secondary, run bias-protocol steps 1 (audit) and 2 (pre-registration), both read-only, committed before any diagnostic runs.
- DONE step 1 (audit): `_agents/vl/notes/bias-audit-2026-11-07.md`. Key findings (VERIFIED by reading named files):
  * `colors/src/engine/slots.ts` `SLOTS` == `tools/mathlab/design.json` exactly (test compares key by key). This is the model-weight table shown to the user; QB=1000, multiples of 10.
  * `design.json` provenance (git log VERIFIED): Architect engine-math spec `20dde5a2` (29 spots), DL5 measured 0.33 share `5e993c0f`, TE3/WR4 measured shares `972dfeb1` — NOT derived from the Owner's 6 Nov salary table.
  * Current table vs Owner's 6 Nov salary table differ on ~20 of 32 slots (e.g. WR1 470 vs 650, OT1 430 vs 500, TE1 270 vs 250, DE1 520 vs 650, DT1 400 vs 500, K 200 vs 50, P 100 vs 50).
  * `tools/mathlab/fitlm.js` fit `RATING_SPECS`/`DEF_SPECS`/`PERS_REC`/moved `MC` knobs + new terms (QB_RUN_C, WR_BLK_C, PUNT_PTS, DIME_W) so `derivedWeights()` reproduces `design.json`; snapped literals became `colors/src/engine/specs.ts`. Result: `results/fit-precolors-2026-10-28-recv.json` + `results/engine-patch-2026-10-28-recv.js.txt`.
  * Circularity (the bias risk): the engine's measured slot values ARE a fit to `design.json`, so they cannot independently confirm it. Secondary share = CB1+CB2+CB3+SS+FS+DIME = 1,610 of ≈8,575 ≈ 19% (> QB), produced by the fit, not validated against real football.
  * What's independent (not tuned to table): `MC` knobs not in mcKnobs (lean, toCov, toRush, skRush, skOl, skCov), `PLAN_K`, `PERS`, `STRAT`, `DEF_FOCUS`, model constants, `FLEX`/flex.json REV 4, `NATURAL_SLOT_MAP`.
  * P-013 = Owner decision on protected constants; VL may propose/test, never apply (AGENTS.md §3).
- DONE step 2 (pre-registration): `_agents/vl/notes/bias-pre-registration-2026-11-07.md`. Commits (before any diagnostic) to metrics M1–M4 (weight share, measured wins/OVR per slot, group share of measured wins, four-anchor sensitivity), thresholds T1–T4 (≥4 pp group tilt, ≥2 anchors, group-level not single-star, survives 700-scale rounding), held-out 2025, Owner-supplied anchors (nflverse snaps/targets/yards by position 2023–25 + named source; 2025 team wins from `tests/2025_standings.js`), Owner priors written before results, independent Verifier seat reviews. Nothing run yet; no engine or product file touched.
- Committed and pushed `242a8a9d` (vl: bias-protocol step 1 audit and step 2 pre-registration). Verified via `git ls-remote origin council/vl`.

## Open needs (to ask the Owner)
- Real anchor data with named sources: nflverse snap counts + target share/catches/yards by position (WR/TE/RB) 2023–2025; defensive snap share by group 2023–2025; confirmation of `tests/2025_standings.js` source. 2025 is held out.
- Owner's position-group importance priors, written before any diagnostic result.

## Queue remaining
- P-070, P-127, P-132, P-133, P-188 (from earlier session, untouched).
- P-013 weights recalibration is the Owner's live request (6 Nov salary table + flex cap -10 + raise lower weights so 85+ stars play natural roles, upper frozen); VL side = the bias diagnostic above, then wait for Owner decision before any weight change.

## Worktree / branch
- **Worktree:** `/Users/kosi/Desktop/wt/vl` · **Branch:** `council/vl`
- **HEAD:** `242a8a9d` (pushed to origin/council/vl)
