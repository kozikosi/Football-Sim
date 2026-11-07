# VL — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** VL · **Role:** Council Advisor · **State:** active (roster in `_agents/README.md` is the truth)
- **ID block:** S-2000–2099 · **First seen:** 2026-10-24

## This session (2026-11-07, per START-HERE from origin/council/muse)
- Followed START-HERE exactly: `git fetch origin`, sync base (1b91f50e, up to date), `node tools/preserve.mjs check` (vl = 0 dirty, OK).
- Took the Owner's 7 Nov weights/flex request (flex cap -10, raise lower weights so 85+ players play natural roles; UI updates; Madden rankings dropdown; mobile scroll). Not an assigned P-item; filed as FOR: P-013 in inbox (P-013 is an OWNER DECISION — protected constants, never applied without approval).
- BUILT the testing apparatus: `_agents/vl/deliveries/flexweight.mjs` (new lane tool). Imports the real engine (`colors/src/engine`), applies weights + flex table IN MEMORY ONLY, re-runs seeded CPU drafts (rosters re-price with the table), builds both bases' lineups via the engine's own `lineupFor`, and reports every 85+ player placed off-role into a heavier spot per rule with examples. Supports `--weights=` (change one weight, see downstream effects), `--tune/--check` seed ranges, `--no-tune` (evaluate a fixed set), `--fail-if=N` (regression gate). Never touches product files.
- RAN three measured scenarios on this tree (VERIFIED; receipts in _agents/vl/deliveries/results/):
  * Scenario 1 — Owner 6 Nov weights + flex cap 10, no raises: 1007 tune / 978 fresh 85+ promotions (25/28 rules); RB>WR1 -4 x236, DT>DE1 -4 x112, TE>WR -10 still lands TEs at WR1 (McBride et al.).
  * Scenario 2 — pairwise -10 raises (TE1/RB1/CB1/DT1/MIKE/WILL 600, C/OG1 450): 687/651 — untouched 4s leak (RB>WR1 -4 x236 base).
  * Scenario 3 — fixed-600 set (+SS/FS/OG1 600, C 450): 175/203.
  * Scenario 4 — raise-until-stuck loop (frozen QB/WR1/DE1/OT1/FB; steps of 50; never above dest weight): every natural slot -> 650; 36/35 promotions remain, all in frozen-low rules FB>TE1/RB1 and OT>DT1 at -4.
- CONCLUSION (INFERRED): at -10 cap with 2s/4s untouched, "all 85+ players natural" is unreachable with differentiated weights — flattening to 650 still leaves 35-36 on frozen FB=25/OT1=500. Recommendation: adopt cap-10 flex table; keep Owner 6 Nov table as model/ratings/WINS weights; weight raises are selection-only; 3 residual rule families need a separate Owner decision.
- Proposed cap-10 flex table: `_agents/vl/deliveries/flex.cap10.json` (to go into flex.json + flex.ts together by the Architect).
- WROTE inbox proposal `inbox/20261107-103030-vl-P-013-flex-cap-weights-ui.md` (apparatus, scenarios, conclusion, exact patch spec for flex table, weights options, product HTML UI anchors: buildControls depth-chart order + draft-board toggle buttons, setActiveTab mobile scroll-to-top, DEFAULT_WEIGHTS/FLEX display values).
- Receipts: colors `npm test` = 227 pass / 0 fail (VERIFIED in this env); flexweight gate runs exit clean; apparatus written.
- NOT done (by design, per council rules): no edits to Football-Sim-PreColors.html, flex.json, flex.ts, slots.ts, design.json, or any protected constant — Architect integrates; no commit yet of product files.

## Queue remaining
- P-070, P-127, P-132, P-133, P-188 (from earlier session, untouched this session).

## Worktree / branch
- **Worktree:** `/Users/kosi/Desktop/wt/vl` · **Branch:** `council/vl`
- **HEAD:** to be set on commit of this session's inbox + lane file + deliveries.
