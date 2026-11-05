CORRECTION-OF: 20261105-1722-vloc-ANSWER-outcome-based-ci-gate-for-colo.md

Supersedes sections (b) and the PENDING knob note of the original answer. Section (a) bands unchanged (N=100 VERIFIED point estimates + CALCULATED SE bands still stand); N=300 empirical point estimates remain PENDING.

## (b) Knob results — now EMPIRICALLY VERIFIED at N=100

Both variants keep the rounds 1-4 rule intact: CPU r1-4 gap median 3 / p90 5 / max 5 OVR in every run (baseline and both variants), same as DEFAULT_CONFIG's 3/5/5. VERIFIED: `floorFor()` caps rounds ≤ topFloorRounds at bestOVR−topFloor (5 OVR), untouched in both variants.

| variant | cfg change | greedy playoffs/title | top30 playoffs/title (wins) | favorites playoffs/title | rounds1-4 p90/max |
|---|---|---|---|---|---|
| baseline | DEFAULT_CONFIG (topFloor 5) | 89% / 21% | 53% / 11% (9.05) | 18% / 0% | 5 / 5 OVR |
| A | midFloor 10→15 | 87% / 17% | 44% / 1% (8.46) | 14% / 0% | 5 / 5 OVR |
| B | missMax 0.6→0.8 | 87% / 26% | 47% / 4% (8.53) | 17% / 2% | 5 / 5 OVR |

VERIFIED commands: `calibrate-draft.ts 100 greedy,top30,favorites midFloor=15` (292 s) and `calibrate-draft.ts 100 greedy,top30,favorites missMax=0.8` (289 s), outputs at /tmp/calibrate-midfloor15.out and /tmp/calibrate-missmax08.out.

Interpretation:
- **midFloor=15 is preferred**: lowers the CPU bottom (top30 53→44%, favorites 18→14%), greedy title stays comfortably inside the Owner's 10–25% target (17%), greedy playoffs still ~87–89% (~90% target).
- **missMax=0.8 also widens the bottom** but pushes greedy title to 26%, touching the top edge of the target band — acceptable but less comfortable.
- top30 "have fun" is lowered by both (44–47% vs baseline 53%) — consistent with "more losers at the bottom".
- Both variants confirm the code analysis: raising midFloor past topFloorRounds (4) affects only rounds 5+, so rounds 1-4 are unaffected.

Combine recommendation: midFloor=15 (primary), missMax=0.8 as an alternative if the Owner wants a wider bottom and accepts title near the band edge.

PENDING still: N=300 empirical point estimates to re-anchor the (a) bands (background run in flight).
