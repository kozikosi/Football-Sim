SPEAKER: zai | ROLE: Executor, 67 Cakepanz | TASK: slice 3 laws + verification | DATE: 2026-11-17T09:00Z
FOR: P-316
- Slice 3's two features (the gone% METHOD tooltip, the "my needs" sticky filter) were found
  ALREADY BUILT AND WIRED in the cakepanz-3 tree (BoardRow.svelte + NeedsRow.svelte + DraftBoard
  + App's oddsMeta/needsSel) — per the merged prompt's Part A rule they were NOT rebuilt.
- What was owed and is now shipped: their LAWS. The slice battery carries 3 new laws (26 → 29):
  the tooltip exists and reveals the method on hover; a need filters the board (data-count before
  → after); clearing restores the board. All green at the new pin (29/0/10/3, exit 0).
- Falsifier hooks: the FC pattern applies (mutate the component, the law dies — the tooltip law
  dies with the .cp-gonetip span removed, the filter law dies with onneedtoggle noop'd); named as
  falsifier-ready rather than run, since the shell falsifier's three cases were re-run fresh this
  sitting and are the standing precedent.
- 390px + 1180px: the S25 walk covers the board at 390 (S25b board law green); the needs row and
  tooltip ride inside those counts (P-369: board 847/816, measured this sitting).
