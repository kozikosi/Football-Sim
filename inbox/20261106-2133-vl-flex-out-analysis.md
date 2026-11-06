SPEAKER: vl | TASK: flex-out analysis with Owner's 6 Nov weights (WR1=650, CB1=400) | DATE: 2026-11-06T21:33:01Z

IDEA: With the new weights (WR1 650, CB1 400, DE1 650), cross-position flex penalties from REV 4 (2/4/6 OVR points) are too low to deter players from preferring another position. The lineup optimizer maximises weight x (ovr - penalty), so any spot with a sufficiently higher weight pulls players out of position.

WHERE: tools/mathlab/flex.json (REV 4 flex table) and colors/src/engine/slots.ts (slot weights) and colors/src/engine/flex.ts (typed copy) and colors/src/engine/lineup.ts (optimalLineup / adviseLineup)

old -> new: No code change proposed yet. This is an analysis entry. For reference, the relevant comparison is:
- OLD weights: WR1 470, CB1 450, DE1 520 (flex penalties tuned for these)
- NEW weights: WR1 650, CB1 400, DE1 650 (same flex penalties)

WHY: Kosi asked to reduce the potential of any player preferring to play another position in the first 10 rounds of the draft, and to identify what other positions would want to flex out early. With WR1 at 650 vs CB1 at 400, a 90-rated CB gains 55900 vs 36000 by flexing to WR1 at -4 — every CB flexes. The same math applies across most roles.

SAFE ALONE?: yes (analysis only, no code change)

HOW TO CHECK: Run `node /tmp/flex-analysis.mjs` (break-even OVR per role) and `node /tmp/flex-sim.mjs` (real-roster simulation). Both scripts were run and verified. Commands:
  node --check /tmp/flex-analysis.mjs  (syntax check)
  node --check /tmp/flex-sim.mjs      (syntax check)

EVIDENCE: VERIFIED (ran break-even analysis and real-roster simulation; all 227 existing tests pass with OLD weights; new-weight analysis computed analytically and confirmed by simulation)

---

FINDINGS — roles that would flex out early with NEW weights (first 10 rounds, ovr ~80-99):

| Role | Best natural spot (weight) | Would flex to | Break-even ovr |
|---|---|---|---|
| CB | CB1 (400) | WR1 | > 10.40 |
| RB | RB1 (250) | WR1 | > 6.50 |
| FB | FB (25) | TE1 / RB1 | > 4.44 |
| TE | TE1 (250) | WR1 / DE1 / OT1 / DT1 / OG1 | > 3.25 |
| OG | OG1 (400) | OT1 / DT1 | > 20.00 |
| C | C (150) | OG1 / OT1 / DT1 / RB1 | > 0.00 |
| DT | DT1 (500) | DE1 | > 17.33 |
| ILB | MIKE (300) | DT1 / DE1 | > 10.00 / > 11.14 |
| OLB | WILL (150) | MIKE / DE1 / DT1 / TE1 / SS / FS | > 4.00 / > 5.20 |
| SS | SS (300) | WR1 / CB1 | > 11.14 / > 24.00 |
| FS | FS (300) | WR1 / CB1 | > 7.43 / > 16.00 |

Roles that would NOT flex out: QB (1000, no legal flex), WR (WR1 650 is best), OT (OT1 500 is best), EDGE (DE1 650 is best), K (50 tied with P), P (50 tied with K).

**11 of 17 roles would want to flex out early.**

Simulation on all 32 real rosters (optimal lineup):
- OLD weights: 109 flexed players; NEW weights: 126 (+15.6%)
- First 10 rounds (top 10 per team): OLD 74; NEW 75 (+1) — the increase is modest because WR1 and DE1 are single limited spots, but the individual incentive is present on nearly every roster

CONCLUSION: Yes, cross-position flex should be re-costed. The REV 4 penalties (max 6 OVR points) were tuned for WR1=470/CB1=450 where the weight gap was smaller. With WR1=650 (38% higher than old) and CB1=400 (11% lower), even a -4 penalty is overwhelmed by the 250-point weight advantage of WR1 over CB1. Recommend raising cross-position flex penalties (especially to WR1/DE1) or making the penalty scale with the weight difference.
