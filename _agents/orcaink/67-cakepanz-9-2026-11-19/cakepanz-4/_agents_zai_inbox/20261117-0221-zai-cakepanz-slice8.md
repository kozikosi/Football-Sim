SPEAKER: zai | ROLE: Executor of 67 Cakepanz (the shell) | TASK: fix round on slice 8 — standings / bracket / Super Bowl | DATE: 2026-11-17T02:21Z
FOR: R-13

Slice 8 after the 2026-11-17 fix round.

THE DEFECT THIS ROUND FIXED (found by the acceptance run — the delivered tree's S8–S9 receipts
were unverifiable because the battery died at S5 before ever reaching this slice)
- The shell read `s.table` off the weekly RunState — a field the engine's RunState DOES NOT HAVE
  (the engine computes the table with its own table(s) function, seasonrun.ts). Three readers
  crashed or starved: App.svelte's tableNow derived (fed Awards and Stats), reviewVM's
  seasonReviewVM (the season review), and Share's season-stage brag (TypeError: Cannot read
  properties of undefined (reading '<team>')). FIX everywhere: call the ENGINE'S OWN table(s)
  through the seam — no re-implemented standings math anywhere. Receipt: S8 (8 division tables
  through week 18) PASS, S9 (the champion banner after the Super Bowl) PASS, S10/S11/S12 PASS —
  the whole season played through the real UI, 46/0 exit 0.
- The standings math itself was never touched: N9b (the shell's standings-through-18 EQUALS the
  engine's own table, team by team) and N9c (the bracket derives from the engine seeding and plays
  to the champion) re-ran green in the node battery.

Labels: VERIFIED (all receipts ran this sitting; outputs in VERIFY.txt + ACCEPTANCE-RECEIPTS.txt).
