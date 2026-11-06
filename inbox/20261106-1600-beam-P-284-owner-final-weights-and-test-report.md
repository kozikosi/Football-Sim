SPEAKER: beam | ROLE: council | TASK: P-284 (Owner-final table + engine test report) | DATE: 2026-11-06T16:00Z

FOR: P-284 (P1) — Owner-finalized weights table (Owner directive 2026-11-06) + testing of Claude's engine

------------------------------------------------------------
1. OWNER'S FINAL TABLE (QB = 1000) — to be promoted as final
------------------------------------------------------------
Salary = Owner's approximately/very rounded $M for a slightly above average player at that position (INTERNAL REFERENCE ONLY — never display to user).
Weight = Owner-chosen coefficient, to be the DEFAULT value on the Madden Rankings page and the goal for the engine math (slotWinsPerOvr revealed impact should land within +/-50).

slot        salary_M  weight
QB            40      1000
RB1           10       250
RB2            4       100
FB             1        25
WR1           25       650
WR2           15       400
WR3            4       100
WR4            2        50
TE1           10       250
TE2            5       150
TE3            2        50
OT1           20       500
OG1           15       400
C              5       150
OG2           10       250
OT2           12       300
DE1           25       650
DE2           12       300
DT1           20       500
DT2           10       300
DL5            5       150
MIKE          12       300
WILL           6       150
SAM            3       100
CB1           15       400
SS            12       300
FS            12       300
CB2           10       250
NICKEL         4       100
DIME           2        50
K              2        50
P              2        50

Saved as machine-readable reference (salary + weight): _agents/beam/data/owner-weights-2026-11-06.json (lane data, committed). Salary data is internal reference only and must never be shown in the app.

------------------------------------------------------------
2. TESTING OF CLAUDE'S ENGINE WITH THESE VALUES
------------------------------------------------------------
Target build: Football-Sim-PreColors.html, sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (matches AGENTS.md sec.2). Same engine ships in colors/ (architect-colors worktree sha identical).

2.1 Fit convergence (fitlm.js, in-memory, never writes product)
Command: NODE_PATH=/Users/kosi/node_modules node tools/mathlab/fitlm.js /Users/kosi/Desktop/wt/beam/Football-Sim-PreColors.html _agents/beam/data/cfg-owner-2026-11-06.json --out _agents/beam/data/fit-owner-2026-11-06.json
Result: page errors 0, exit 0. rms log-error 87.5% -> 0.2% over 6 iterations; every slot within +/-1.7% of target (max WR4 +1.7%). VERIFIED.
Config targets = Owner weight * 0.00254 (32 slots incl. FB/SAM/DIME/DL5/TE3/WR4/P). Fit adjusts RATING_SPECS (RATING_SPECS rows), DEF_SPECS, PERS_REC and MC knobs (rb, olRun, front, rec, olPass, rush, cov) plus qb/toQb/kick/puntPts. Snapped composition weights recorded in fit-owner-2026-11-06.json.

2.2 E1/E2 design check (check-design.mjs, adapted to owner design file)
Command: NODE_PATH=/Users/kosi/node_modules node /tmp/check-owner.mjs _agents/beam/data/fit-owner-2026-11-06.json
Result: 32 slots, max |derived-design| 5, 0 inversions. FAIL count 1: FB=25 does not end in 0 (design table convention is tens). All other 31 slots PASS the +/-10 tolerance and no rank inversions at gap>=30. VERIFIED.
Implication: FB=25 violates the "ends in 0" granularity of the design table. Recommend rounding to 20 or 30 (within the Owner's +/-50 room) OR updating the check-design rule to allow 5-unit steps. 25 is the only sub-10 value in the Owner's table; every other weight is a multiple of 50.

2.3 Real-roster correlation (realcheck.js)
Command: NODE_PATH=/Users/kosi/node_modules node tools/mathlab/realcheck.js ... (fit-owner, wins2025, cfg-owner)
Result: before r=0.672 (baseline engine), after r=0.635, spearman 0.635, rmse 2.63 wins, sd 4.62 pts/g, 32 teams, 0 page errors. E4 PASS (r>=0.60, sd in 4.0-5.5). VERIFIED.
Implication: adopting the Owner's table as engine targets keeps the build inside the E4 acceptance band but lowers the 2025-win correlation from 0.672 to 0.635 (~0.04 loss). This is the cost of moving WR1/DE1/CB1/OT1 up and interior OL/DT2/CB-secondary down relative to the current engine. Within the Owner's stated +/-50 room; recommend the Architect confirm this trade is acceptable before pinning RATING_SPECS (protected constant, needs MERGE-MANIFEST re-pin).

2.4 Flex checks (unchanged, protected flex rules)
flexcheck.mjs: FLEXCHECK OK (107 rules). flexdl5.mjs: FLEXDL5 OK. VERIFIED. The Owner's table does not require flex changes; flex stays governed by tools/mathlab/flex.json REV 4.

2.5 Revealed-impact vs Owner-weight rank comparison
Spearman(revealed slotWinsPerOvr, Owner weights) = 0.701 over the 26 roster slots; Pearson = 0.797. For reference, the previous design table correlates 0.856. The Owner's table is a larger departure from revealed impact than the old design (intentional: salary-based, with secondary (CB2/CB3/SS/FS) and WR1/DE1 lifted above their raw wins coefficient, and interior OL/DT2/CB3 pushed down). This is consistent with the Owner's statement that weights are salary/intuition, not exact wins inverse. The protected contract (AGENTS.md sec.3) says modelWeights() is the monotone quantisation of slotWinsPerOvr with error <=2.5 per slot and no rank inversions beyond rounding ties; the Owner's weights are the DISPLAY default, not the engine truth. Two distinct things must be kept separate:
  (a) Engine revealed impact (slotWinsPerOvr) — stays the measured truth; fit can move it toward the Owner's table within +/-50 as requested, but it cannot be forced to an arbitrary number without changing RATING_SPECS/MC.
  (b) Default weights shown on the Madden Rankings page (DEFAULT_WEIGHTS / modelWeights() output) — should display the Owner's numbers (QB=1000 scale) per the Owner's request.
The fit result shows (a) can reach (b) to within ~0.2%, so the two can be aligned if the Architect chooses to apply the fit. If instead the Architect keeps the current engine and only changes the display default, the Madden Rankings page will show the Owner's numbers while the draft board's "model weights" button (modelWeights()) keeps showing the quantised revealed impact — a visible inconsistency the Architect should decide on.

2.6 Display-scale note
modelWeights() currently emits a 700 scale (QB=700, nearest 5). The Owner's table is a 1000 scale (QB=1000). DEFAULT_WEIGHTS is a third scale (~320 for QB). The Madden Rankings page reads `weights` (DEFAULT_WEIGHTS scale) for display. To show the Owner's numbers verbatim, either rescale DEFAULT_WEIGHTS to the Owner's values (a product edit, protected constant P-013) or change the page to render on a 1000 scale. Recommend the Architect pick one scale for the UI and keep modelWeights() on its protected 700-scale contract unchanged. Salary data must stay internal (not in the UI).

2.7 Guide page
Owner request: Guide page should rerank players by importance by WINS. Current Guide/lineup code uses slotWinsPerOvr for importance (line 4469 `wv = r ? (slotWinsPerOvr()[r.slot]||0)*((r.ovr||80)-70) : -9`). That ordering already tracks wins; no change needed beyond confirming the sort key is slotWinsPerOvr (revealed wins), not DEFAULT_WEIGHTS. Recommend the Architect verify the Guide's player ranking uses slotWinsPerOvr and not `weights`/DEFAULT_WEIGHTS; if it uses weights, switch to slotWinsPerOvr so Guide reflects wins as requested.

------------------------------------------------------------
3. PROMOTION / IMPLICATIONS SUMMARY
------------------------------------------------------------
- The Owner's table is now the single source of truth for default weights. Salary data is internal reference only (saved in _agents/beam/data/owner-weights-2026-11-06.json).
- Applying it requires: (i) DEFAULT_WEIGHTS update to Owner values (protected, P-013, MERGE-MANIFEST re-pin); (ii) decision on whether to also apply the engine fit (RATING_SPECS/MC protected, re-pin); (iii) display-scale decision (700 vs 1000); (iv) Guide sort-key verification.
- Testing shows the engine CAN hit the Owner's table (fit rms 0.2%) at a small real-win correlation cost (0.672 -> 0.635, still E4-passing). Flex and E4 gates pass.
- Only defect found: FB=25 breaks the tens convention in check-design; round to 20/30 or relax the rule.

EVIDENCE: fit convergence VERIFIED (page errors 0, exit 0, rms 0.2%); E1/E2 VERIFIED except FB granularity; E4 VERIFIED (r 0.635, sd 4.62); flex VERIFIED; rank correlations computed by script from lab.js output. Salary values are Owner-supplied (quoted). Recommendations are INFERRED judgment.

— Beam · council/beam · 2026-11-06
