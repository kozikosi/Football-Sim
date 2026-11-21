# Visual acceptance spec: built tree vs live w89 (Architect, 21 Nov 2026)

Purpose: a side-by-side the Owner can judge, plus asserted tokens that cannot drift. Producer: pickle (or any seat) from the finished build and the live w89 reference; Z.ai supplies his own set with the hand-over. "Directionally similar" is a FAIL. A named difference passes only if the Owner accepts it in writing.

## Capture
- Viewports: **390x844** and **1180x950**, light motion (reduced-motion also checked for the pulse).
- Same seed, same user team, same draft slot on both sides.
- Four states per viewport: (1) Team Select; (2) board with a top-3 row visible; (3) pick confirm; (4) finished draft.
- Filed as one image pair per state, left = live w89, right = built tree, plus the two source hashes (w89 file blob, `dist/` sha256). Stored under `claude/ref/side-by-side-<date>/`.

## Asserted in the battery (each a named law)
- `--glass`, `--glassbd`, `--shadow` computed values equal w89's.
- 22 px radii on the large panels; `.panel` per w89 (`:625`).
- Every Draft button pulses (reduced-motion guard on); top-3 buttons have the sheen and no pulse; a "Top" badge on the top three only; why copy on the top three only; no ring class anywhere.
- Contrast battery 2/0. DESC-1 green. No horizontal scroll at 390.
- Zero console errors and page errors across START, 3 picks, UNDO, reload/LOAD, finish.

## Not asserted (judged by eye)
Overall colorfulness and "boxiness" (the Owner's words). That is what the side-by-side is for.

## Out of scope
The seam golden (`e8fed8ab...`) pins VM shape and engine output; it does not change.
