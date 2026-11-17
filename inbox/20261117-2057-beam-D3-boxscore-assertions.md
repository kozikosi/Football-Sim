SPEAKER: beam | ROLE: council | TASK: D3 box-score assertions (test-only) | DATE: 2026-11-17T20:57Z
FOR: D3

PROPOSAL (test-only assertions; no change to box.ts or drive.ts). Target build: Architect's colors tree. Form per §5.

1. Punt yards — file colors/src/sports/nfl/sim/box.ts, anchor the punt-yards aggregation. old: (unasserted). new: assert sum of punt yards equals sum of T.yards over punt plays. WHY: D3 survivor. SAFE ALONE?: yes (test only). HOW TO CHECK: suite passes; mutation reverts punt yards -> test fails.
2. Touchdowns — box.ts TD counter. assert TD count == count of snap events with scoreKind TD (drive_end 'td'/'deftd'). SAFE ALONE?: yes.
3. First downs — box.ts first-down counter. assert firstDowns == count of snaps where down reset to 1 after a play (excluding TD). SAFE ALONE?: yes.
4. Interception spot — drive.ts:136 (computed but unasserted). assert drive_end.next.ydl equals the interception return spot (ndy). SAFE ALONE?: yes (test only; does not change drive.ts). HOW TO CHECK: suite passes; mutation of the spot -> test fails.

If a fifth survivor is found while writing, name it with the mutation + catching test. (None found by me this round.)
EVIDENCE: INFERRED (assertion shapes; Architect to land).
