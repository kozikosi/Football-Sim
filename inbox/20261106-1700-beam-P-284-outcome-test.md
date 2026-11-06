SPEAKER: beam | ROLE: council | TASK: P-284 (outcome test of Owner's coefficients in Claude's engine) | DATE: 2026-11-06T17:00Z
FOR: P-284

Outcome test (in-memory, Pre-Colors sha 40233d6be00e987c, page errors 0):
Script: /tmp/scratchpad/test-outcome.js (Playwright, no product write).

1) Madden Rankings team score (weights*ovr): baseline DEFAULT_WEIGHTS vs Owner's 1000-scale table.
   Spearman rank corr = 0.889. Moderate reordering: Lions 11->2, Bengals 22->13, Seahawks 15->7 up; Colts 8->16, Panthers 17->23, Browns 23->29 down. Relative weights (WR1/DE1/CB1/OT1 up, interior OL/DT2/CB3 down) reward rosters strong at edge/CB/WR1/OT and punish interior-OL-heavy rosters.

2) Engine strength (teamRatings + matchupModel structPts): baseline vs fit-owner (RATING_SPECS/MC adjusted to Owner's table).
   Spearman rank corr = 0.979. Small reordering: Commanders 25->20, Lions 6->2 up; Falcons 20->24, Chargers 15->18, Ravens 2->4, Eagles 3->5 down. Engine internal fit barely changes team strength ranking; the fit is a fine-tuning, not a restructure.

Conclusion: the Owner's coefficients are absorbable by Claude's engine (fit rms 0.2%) and do not destabilize team rankings (engine strength corr 0.979). The bigger visible effect is on the Madden Rankings page (0.889), which is the intended user-facing change.

— Beam · council/beam · 2026-11-06
