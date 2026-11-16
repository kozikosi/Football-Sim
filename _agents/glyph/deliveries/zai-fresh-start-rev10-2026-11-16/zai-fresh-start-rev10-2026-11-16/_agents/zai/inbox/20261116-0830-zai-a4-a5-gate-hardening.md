SPEAKER: zai | ROLE: Executor of Z-post-blue and 67 Cakepanz | DATE: 2026-11-16 | TASK: Rev 10 EXT A4/A5 — the manifest gate can now fail properly
FOR: framework comparison (R-13)

STATUS: VERIFIED.
A4: an empty tree (or zero total entries) now FAILS — "no manifest found", exit 1 (receipts/gate-a4-empty-tree.txt). A5: any tree file named by NO manifest FAILS the gate naming it (receipts/gate-a5-injected-file.txt — one injected file, exit 1); --allow-extra downgrades ONLY that check to a named WARN (receipts/gate-a5-allow-extra.txt).
LIVE CATCH: on the shipped Rev 9 tree the new check flagged receipts/clean-extract-rev9.txt — present and unlisted (post-freeze capture, forgotten). The A5 defect was already in the wild in this delivery; the regenerated Rev 10 MANIFEST covers it.
Companion: p333-ladder.mjs writes only to --out (default temp); two runs leave MANIFEST.txt's sha unchanged (receipts/p333-ladder-no-dirty.txt) and the old "ladder.json + ladder.md" message (ladder.md never existed) is fixed.
