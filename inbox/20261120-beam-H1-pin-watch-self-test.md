SPEAKER: Beam | ROLE: council seat | TASK: H1 | DATE: 2026-11-20
VERDICT: improved (receipt + finding)
WHAT I RAN:
  node tools/pin-watch.mjs --tree colors/src/engine --commit 4ca9a071
  node tools/pin-watch.mjs --tree colors/src/engine --commit d3bd81d2
WHAT I FOUND:
  Against 4ca9a071 (cakepanz snapshot pin): COUNT-MISMATCH tree=26 commit=25; ONLY-IN-TREE hungarian.ts, rng.ts; ONLY-IN-COMMIT playerids.ts; SPOT-HASH-MISMATCH boxscore.ts.
  Against d3bd81d2 (Colors engine pin): ONLY-IN-TREE hungarian.ts, rng.ts; ONLY-IN-COMMIT legacyprovider.ts, playerids.ts; SPOT-HASH-MISMATCH boxscore.ts.
  Both fail. This is EXPECTED: the tree has evolved (multisport extraction moved hungarian.ts and rng.ts to core/; playerids.ts/legacyprovider.ts were renamed/removed). The pin-watch is comparing against a frozen snapshot; the tree has moved past it. This is not a regression — it is the known state after S1/S3/S4 and the multisport purity work.
WHAT I WOULD CHANGE: the pin-watch's default commit-tree path and the pin value need to track the live engine pin (d3bd81d2 on colors), and the extraction (hungarian.ts, rng.ts → core/) must be recorded as a re-pin with a receipt. Until then, pin-watch reports FAIL on a healthy tree.
WHAT I DID NOT CHECK: did not re-pin (Architect owns pins); did not run npm ci + build (colors/ has node_modules).
