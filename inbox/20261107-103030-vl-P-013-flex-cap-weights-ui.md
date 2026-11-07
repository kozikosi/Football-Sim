SPEAKER: vl | TASK: Owner 7 Nov direction — cap flex penalties at -10, raise lower position weights so 85+ players play their natural role; testing apparatus; UI changes for weights/flex/WINS/ratings in the product build | DATE: 2026-11-07T10:30:30Z
FOR: P-013

EVIDENCE: all engine claims below are VERIFIED by running the apparatus (commands and outputs included) on this worktree's engine (`colors/src/engine`); UI claims are INFERRED from anchors in `Football-Sim-PreColors.html`; the mobile scroll glitch is UNKNOWN here (no mobile Safari available to reproduce).

====================== TESTING APPARATUS (new lane tool) ======================
WHERE: `_agents/vl/deliveries/flexweight.mjs` — new file (>150 lines, committed to this branch; see commit below).
old -> new: N/A (new tool). It imports the real engine modules (players, draft, lineup, flex, slots), applies a weight table and a flex table IN MEMORY ONLY (never touches product files), re-runs the seeded CPU drafts (rosters change with the table), builds both bases' lineups with the engine's own lineupFor, and reports every 85+ player placed off-role into a heavier spot ("promotion"), per rule, with examples.
Usage: `node --experimental-strip-types _agents/vl/deliveries/flexweight.mjs [--tune=1001-1016] [--check=3001-3016] [--min=85] [--weights=lane-weights.json] [--no-tune] [--fail-if=N]`
--weights overrides any slot of the Owner 6 Nov base table, so "if I change one player's weight, what happens downstream" is answered by one command: promotion counts before/after, pairwise needs (w_nat >= w_dest x (1-10/ovr), worst case = best 85+ player of the role), per-rule examples, tune vs fresh seeds, and a raise-until-stuck loop (steps of 50, never above the destination weight, frozen slots never raised).
WHY: the Owner wants to see downstream effects of any weight/flex change before anything enters the engine; previously there was no repeatable apparatus on this tree (flexscan/flextune/flexcap exist on other branches against a different engine shape — 3-arg buildPool, data/nfl/ — and do not run here).
SAFE ALONE?: yes — lane tool; mutates FLEX/SLOTS/WEIGHT in memory only; writes only a JSON report if --out is given.
HOW TO CHECK: `node --experimental-strip-types _agents/vl/deliveries/flexweight.mjs --tune=1001-1016 --check=3001-3016` and compare to the receipts below; `--fail-if=0` exits 1 while any promotion remains (regression gate for any future weight/flex change).
RESULTS (committed to this branch):
  - _agents/vl/deliveries/results/flexweight-cap10-2026-11-07.json (base scenario)
  - _agents/vl/deliveries/results/flexweight-fixed600-2026-11-07.json (fixed-600 set)
  - _agents/vl/deliveries/results/flexweight-pairwise600-2026-11-07.json (pairwise set, no raise)
  - _agents/vl/deliveries/results/weights-pairwise-600.json, weights-fixed600.json (weight overrides used)

====================== MEASURED SCENARIOS (VERIFIED) ======================
Base table for every run: Owner 6 Nov salary table (protected permanent constants; salaries internal only): QB 1000, WR1 650, DE1 650, OT1 500, DT1 500, OG1 400, WR2 400, CB1 400, OT2/DE2/DT2/MIKE/SS/FS 300, RB1/TE1/OG2/CB2 250, TE2/C/DL5/WILL 150, RB2/WR3/SAM/CB3 100, TE3/WR4/DIME/K/P 50, FB 25. Flex base: REV 4 (flex.json), then the -10 cap applied.

Scenario 1 — Owner weights + cap 10, NO weight raises (tune 1001-1016 = 1024 lineups / fresh 3001-3016):
  Promotions: 1007 / 978 (25 / 28 rules).
  Top rules: RB>WR1 -4 x236; DT>DE1 -4 x112; RB>WR2 -4 x108; OG>OT1 -4 x99; FS>WR1 -4 x56; ILB>DT1 -4 x53; OLB>MIKE -2 x52; OLB>DE1 -4 x51; TE>DE1 -10 x43 (Bowers 95); C>OT1 -4 x37; ...
  McBride 99 at TE>WR -10: still lands WR1 in the seeded drafts (TE1 250 cannot compete with WR1 650 at -10).
  EVIDENCE: VERIFIED — receipt in flexweight-cap10-2026-11-07.json ("before" section).

Scenario 2 — pairwise -10 raises (TE1/RB1/CB1/DT1/MIKE/WILL 600; C/OG1 450; rest Owner table), no further raise:
  Promotions: 687 / 651. The untouched 4s now leak: RB>WR1 -4, DT>DE1 -4, C>OT/DT -4, SS>WILL -4 (SS 300 vs WILL 600) etc. Raising some weights moves the problem to -4 flexes.
  EVIDENCE: VERIFIED — flexweight-pairwise600-2026-11-07.json.

Scenario 3 — fixed-600 set (flexcap ruling's fixed set: TE1/RB1/CB1/DT1/MIKE/WILL/SS/FS/OG1 600, C 450):
  Promotions: 175 / 203. Residuals: RB>WR1 -4 x80/88 (Gibbs 97 at WR1); DT>DE1 -4 x41/51; FB>TE1 -4 x28/23 (Juszczyk 88); C>OT1/C>DT1 -4; OT>DT1 -4; FS>WR1 -4; TE>DE1 -10 x1/4 (Kittle 97, Bowers 95).
  EVIDENCE: VERIFIED — flexweight-fixed600-2026-11-07.json.

Scenario 4 — raise-until-stuck loop (steps of 50; frozen: QB, WR1, DE1, OT1, FB; never above destination weight):
  Every natural slot of a promoted role is driven to 650 (C, OG1, TE1, RB1, DT1, MIKE, WILL, CB1, FS, SS: 150-500 -> 650).
  Promotions: 36 / 35, ALL in 3 frozen-low rules: FB>TE1 -4 (Juszczyk 88, x26/22), FB>RB1 -4 (x6/10), OT>DT1 -4 (x4/3). FB=25 and OT1=500 cannot be raised by design, so they lose to TE1/DT1 at 650 at -4.
  EVIDENCE: VERIFIED — flexweight-cap10-2026-11-07.json ("FINAL" section, history of 70 raises).

Pairwise needs under the -10 cap vs the Owner uppers (WR1/DE1 650, OT1 500; rounded up to 50; worst case = best 85+ player of the role):
  TE1 250 -> 600 (McBride 99, binds WR1); CB1 400 -> 600 (Gonzalez 98); RB1 binds TE1 only because RB>WR is a 4, not 10 — the -4 scan (Scenario 1) shows RB1 must reach ~650 to stop RB>WR1 -4; DT1 500 -> 600 (Derrick Brown 96, binds DE1); MIKE 300 -> 600 (Warner 98); WILL 150 -> 600 (Baun 93); SS 300 -> 600 (Hamilton 94, binds WR1); FS 300 -> 600 (Bates 94); C 150 -> 450 (Humphrey 96, binds OT1); OG1 400 -> 450 (Thuney 96, binds OT1). OT1 (Sewell 98) has no -10 destination; FB (Juszczyk 88) would need ~600 vs TE1 at -4.
  NOTE: the Owner's example assumes RB>WR1 is -10, but REV 4 has RB>WR at 4; under "leave the 4s alone" it stays 4, so pairwise -10 math alone does not protect RB1 — the scan is the authoritative check.

====================== CONCLUSION (INFERRED from the measured runs) ======================
At a -10 flex cap with the 2s and 4s untouched, "all 85+ players play their natural role" is NOT achievable with differentiated weights:
- chasing it drives every natural slot to WR1's 650 (Scenario 4) and still leaves 35-36 promotions stuck on frozen FB=25 / OT1=500;
- zero promotions would require flattening nearly every spot to 650 AND unfreezing FB and OT1 to ~650, which collapses the Owner's 6 Nov salary model (protected constants; P-013 is an OWNER DECISION).
Recommendation: adopt the cap-10 flex table; KEEP the Owner 6 Nov table as the model/ratings/WINS weights (shown on Madden Rankings); treat weight raises as selection-only (lineup/draft advice) and accept the 3 residual rule families (FB>TE/RB, OT>DT, RB/WR at -4) as a separate Owner decision, or revisit the 2/4 penalties later. Other implications of any weight/flex change, all measurable with the apparatus: CPU draft rosters (drafters price flexes, so rosters change with the table), adviseLineup suggestions, depth-chart flex badge readouts, and Guide re-ranking by WINS (not built; measured slotWinsPerOvr would need recalibration against any new table).

====================== PROPOSED EXACT CHANGES ======================

1. FLEX TABLE — cap at -10 (PROPOSED; flex.json and flex.ts are protected constants — Architect+Owner integrate)
WHERE: `tools/mathlab/flex.json` (source of truth) and `colors/src/engine/flex.ts` (typed copy; a test compares them rule by rule, so both change together).
old -> new: a single transformation rule, applied to every role->dest row:
   if penalty >= 6 -> 10; additionally CB>WR 4 -> 10 and TE>WR 2 -> 10 (Owner's explicit calls, 7 Nov); every 0, 2 and 4 otherwise unchanged.
   Result (new table): QB:{FS:10}; RB:{FB:2,WR:4,TE:10}; FB:{RB:4,TE:4}; WR:{RB:4,TE:4,SS:4,FS:4,NICKEL:4,DIME:4,CB:10}; TE:{WR:10,FB:2,RB:10,C:10,OG:10,OT:10,EDGE:10,DT:10,ILB:10,OLB:10,SS:10,FS:10,NICKEL:10,DIME:10}; OT:{OG:0,C:0,DT:4,FB:4,RB:10}; OG:{C:0,OT:4,DT:4,FB:4,RB:10}; C:{OG:0,OT:4,DT:4,FB:4,RB:10}; DT:{OG:4,C:4,EDGE:4,FB:4,OT:10,ILB:4,OLB:4,RB:10}; EDGE:{DT:2,OLB:0,ILB:4,FB:4,TE:10,RB:10,NICKEL:10}; ILB:{ILB:0,OLB:0,DT:4,FB:4,EDGE:10,TE:10,SS:10,FS:10,NICKEL:10,DIME:10}; OLB:{OLB:0,ILB:2,EDGE:4,NICKEL:4,DT:10,TE:10,SS:10,FS:10,FB:10,DIME:10}; SS:{NICKEL:0,DIME:0,FS:2,OLB:4,CB:10,ILB:10,WR:10,TE:10,RB:10,FB:10}; FS:{NICKEL:0,DIME:0,SS:2,CB:4,WR:4,ILB:4,OLB:4,TE:10,RB:10}; CB:{FS:0,NICKEL:0,DIME:0,SS:2,WR:10,ILB:10,OLB:4,TE:10,RB:10}; K:{P:0}; P:{K:4}.
   Full proposed files: lane `_agents/vl/deliveries/flex.cap10.json` (to be committed alongside this note).
WHY: Owner 7 Nov: cap flex at -10, keep penalties divisible by 2, stop McBride/Bowers/Warner/Brown/etc. being promoted off role (verified above: TE>WR at 2/4 still lands TEs at WR1).
SAFE ALONE?: no — flex.json and flex.ts must change together; re-run the 227-color tests and the --fail-if=0 gate after.
HOW TO CHECK: `node --experimental-strip-types colors/test/*.test.ts` (currently 227 pass, 0 fail — VERIFIED in this env); apparatus gate `...flexweight.mjs --tune=1001-1016 --check=3001-3016 --fail-if=0` (will exit 1 until residual rules above are decided); flex.ts vs flex.json rule-by-rule comparison test already exists in colors/test.

2. WEIGHTS (PROPOSED; protected constants — P-013 is an OWNER DECISION, never applied without approval; re-pin hash in MERGE-MANIFEST.md on change)
WHERE: `colors/src/engine/slots.ts` and `tools/mathlab/design.json` (must stay key-identical — existing test compares them); `Football-Sim-PreColors.html` line 452 `DEFAULT_WEIGHTS` (the Madden Rankings display; 700-scale quantisation of the model weights).
old -> new: do NOT change the model weights to the Scenario-4 flatten (it collapses differentiation and still leaves 35-36). Keep the Owner 6 Nov table as the model weights. If selection weights are wanted for the lineup solver only: TE1 600, RB1 600 (actually ~650 needed vs WR1 at -4 — see Scenario 1), CB1 600, DT1 600, MIKE 600, WILL 600, C 450, OG1 450 — measured residual 175/203 promotions at fixed-600 (Scenario 3), so this does not reach "all 85+ natural" either.
WHY: the 6 Nov table is the permanent protected constant; the apparatus shows no differentiated table reaches zero under the cap.
SAFE ALONE?: no — Owner decision required; slots.ts<->design.json parity test must continue to pass.
HOW TO CHECK: apparatus scenarios above; `tools/mathlab/check-design.mjs` compares slots.ts to design.json.

3. UI — Madden Rankings page (NOT protected; Architect integrates into the build)
WHERE: `Football-Sim-PreColors.html` `buildControls()`, lines ~539-545: weight inputs are emitted per GROUPS in GROUPS order (e.g. Offensive Line: OT1,OT2,OG1,OG2,C — not depth-chart order OT1,OG1,C,OG2,OT2 per `DEPTH_CHART_GROUPS` line 1092).
old -> new: emit each group's slots in DEPTH_CHART_GROUPS order (offense: QB,RB1,RB2,WR1,WR2,WR3,TE1,TE2,OT1,OG1,C,OG2,OT2; defense: DE1,DT1,DT2,DE2,MIKE,WILL,SAM,CB1,CB2,CB3,FS,SS; special teams: K), then the remaining slots (DL5, LB4, CB4, SS2, FS2, WR4, P, FB) in DEFAULT_WEIGHTS order. Keep the position-group headings (GROUPS) unchanged.
ADD: the draft board's group-toggle buttons (`#draftChips` pattern, lines ~1128-1135: per-group toggle + all/none chips) on the Madden Rankings controls so groups can be shown/hidden — "the same buttons as the draft board".
WHY: user request — Madden rankings dropdown messy; same buttons as draft board; dropdowns in depth-chart order; position groups kept.
SAFE ALONE?: yes (pure HTML/JS in one view; no engine math).
HOW TO CHECK: open Madden Rankings tab, confirm slot rows follow depth-chart order within each group, group toggle buttons show/hide rows, verify at 390 px (existing CSS already clamps mobile layout).

4. UI — mobile footer tap lands at bottom of page (user glitch)
WHERE: `Football-Sim-PreColors.html` `setActiveTab(viewId, btnId)`, line ~832: it already calls `window.scrollTo(0,0)` but on mobile the view still opens scrolled to the bottom.
old -> new: at the end of `setActiveTab`, add `requestAnimationFrame(()=>{window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;});` so the reset runs after the tab view is laid out.
WHY: user should land at the top of the page like any other website when tapping a footer page.
SAFE ALONE?: yes.
HOW TO CHECK: tap each footer button (Madden Rankings, Position Rankings, Player Browser, Team Comparison, Guide) — view opens at the top. Cannot reproduce mobile Safari here (environment gap — UNKNOWN until tested on device).

5. UI — displayed numbers (values flow from 1 and 2)
WHERE: Madden Rankings weight inputs (DEFAULT_WEIGHTS line 452) and depth-chart flex readouts (`flexPenaltyFor` line 973 driven by product `FLEX` line 940; lineup table line ~3346 shows "flexed −N").
old -> new: once 1 and 2 are adopted, these readouts show the cap-10 penalties and the new weights automatically; no text hardcodes a weight or penalty that needs rewriting except DEFAULT_WEIGHTS (protected — see 2).
SAFE ALONE?: no for DEFAULT_WEIGHTS/product FLEX (protected); yes for anything else.

====================== GATES ======================
- `cd colors && npm test`: 227 pass / 0 fail (VERIFIED in this environment, 2026-11-07).
- Apparatus gate: `--fail-if=0` exits 1 while promotions remain.
- slots.ts == design.json parity (existing check-design test).
Commit+branch plan: commit this note + apparatus + results to `council/vl` and push; product HTML and protected constants are NOT touched by this seat (Architect integrates).
