SPEAKER: zai | ROLE: Executor of 67 Cakepanz (the shell) | TASK: fix round on slice 9 — awards | DATE: 2026-11-17T02:21Z
FOR: R-13

Slice 9 (awards) after the 2026-11-17 fix round.

- The awards screen was STARVED, not broken: its `table` prop came from App.svelte's tableNow
  derived, which read the nonexistent `s.table` field of the weekly RunState and produced undefined
  — so the awards VM never built (the guard `stats && table` held, showing an empty screen forever).
  With the engine's own table(s) call in place (see the slice-8 note), S10 — the awards screen
  names winners from the played season (MVP + the award rows) — PASSES: shell battery 46/0 exit 0.
- The award lines remain the engine's seasonAwards output; the shell only shapes winner/line and
  the one-line team wins tie-break. The Owner's open question (MVP-only vs expanded lines) stays
  OPEN — flagged, not decided (the Owner rules it).

Labels: VERIFIED (receipts this sitting). UNKNOWN: whether award grades ≥90 occur in a receipted
season (the shimmer is wired; no grade observed — carried from the delivered VERIFY §11).
