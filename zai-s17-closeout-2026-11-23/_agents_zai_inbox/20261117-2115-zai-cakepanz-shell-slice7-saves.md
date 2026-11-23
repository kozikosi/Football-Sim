SPEAKER: zai | ROLE: Executor, 67 Cakepanz | TASK: slice 7 shell work — the saves lane (Part F) | DATE: 2026-11-17
FOR: P-260 (F5–F10) · the save-system shell lane

Shipped tree, pin 5c808472 (byte-verified). Receipts: VERIFY.txt §13/§14, ACCEPTANCE-RECEIPTS.txt.

- F5–F10 audited with file:line receipts — ALL SIX were already done; nothing redone (F5
  MERGE-GUIDE:40, F6 savesApp:76/80, F7 engine saves.ts:44, F8 savesApp:24 + N20, F9 engine
  saver.ts:10–13, F10 draftBoard.ts:17 + App.svelte:57).
- BUILT: the older-build note — savesApp.olderBuildNote (pure) + the Saves panel renders it
  ("this save came from build X (running: Y) — logged picks hold; un-made picks may differ").
  Law N21 + falsifier F7. Shell-side only; no engine bytes.
- BUILT: scripts/probe-saves-states.mjs — the BROWSER-level refusals + the note, with screenshots
  (5/5 PASS): corrupt refused verbatim ("payload: bad seed"), newer refused by VERSION, the
  older-build card loads and NAMES the other build. Closes the matrix gap named last delivery.
- BUILT: the packs law N22 (non-empty pool + the current-era pack's stamped hash with its
  invocation) + falsifier F8 (the pack removed → the law dies). Ernie §6.5's failure mode now has
  a law.
- Node battery 24→26 (N21, N22). Slice 29/0/10/3 and shell 46/0 re-run green with the panel change
  (the 390px saves walk still 390/390).
- The P-317 §5 filed (20261117-2100-zai-cakepanz-shell-p317-s5-filing.md) — NOT applied.
