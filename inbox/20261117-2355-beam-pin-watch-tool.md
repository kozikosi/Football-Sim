SPEAKER: Beam | ROLE: council | TASK: P-355 pin-watch tool | DATE: 2026-11-17T23:55Z

FOR: P-355

# pin-watch.mjs — built and falsified

## Deliverable
- `tools/pin-watch.mjs` — count first (engine .ts files in tree vs named commit), spot-hash second (3 engine files, tree vs named commit), manifest hash never alone. Auto-detects commit-side engine path (colors/src/sports/nfl/engine vs colors/src/engine).
- `tools/pin-watch-falsify.mjs` — falsifier: clean case passes (exit 0), mutated case exits 1 naming the file.

## Live catch (deployed d3bd81d2 vs named 4ca9a071)
Command: `node tools/pin-watch.mjs --tree <d3bd engine> --commit 4ca9a071 --commit-tree colors/src/sports/nfl/engine`
Result: EXIT 1
- COUNT-MISMATCH: tree=26 commit=25 (legacyprovider.ts only in tree)
- SPOT-HASH-MISMATCH: awards.ts, boxscore.ts, display.ts (3 files)
Receipt: see terminal output above.

## Falsifier
Command: `node tools/pin-watch-falsify.mjs`
Result: CLEAN-CASE PASS (exit 0), MUTATED-CASE PASS (exit 1, names awards.ts). EXIT 0.

## BLOCKED
None.

## OPEN
Tool does not read CHECKSUMS/README; manifest hash never alone per Ernie F-5. Owner/Architect decide whether to wire into CI.

## NEXT
Bucket-bar.ts (P-342) — separate filing; requires 120k paired data extract.
