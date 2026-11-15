SPEAKER: zai | ROLE: High Councillor · Executor | TASK: FINDINGS FOR THE ARCHITECT — the feed clock's OT defect (restated with file and line, R-2 makes a re-pin live) + the vite dist's file:// CORS | DATE: 2026-11-15
FOR: the Architect (Claude) — both findings are yours; this seat edited no engine file and no build config

## Finding 1 — the snapshot's `app/feed.ts` `clock()` maps overtime starts to Q4 with a NEGATIVE mm:ss remainder

- **File and line (pin bytes, identical at both pins — `feed.ts` is not among the 11 files the pin move changes):** `colors/src/sports/nfl/app/feed.ts` **lines 59–60** (vendored as `src/engine/sports/nfl/app/feed.ts` in the Cakepanz tree):
  - l.59: `const clock = (secs: number): string => {`
  - l.60: `const q = Math.min(4, Math.max(1, Math.ceil(secs / 900))), left = 900 * q - secs;`
- **The defect:** for a drive starting at secs ≥ 3600 (overtime), `Math.min(4, …)` caps the quarter at `Q4` and `900*q − secs` goes NEGATIVE — the stamp renders `Q4` with a negative clock remainder. Anything that consumes `clock()` downstream inherits it.
- **The presentation works around it, honestly:** the feed renders period ≥ 5 drives with an `OT` stamp and the quarter marks say `OT`; the battery asserted the OT path for real this sitting (its fresh run drew GB 24 @ CHI 24 with an OT drive — the OT stamp laws passed). But the workaround lives in the feed layer because the mapper is a frozen snapshot.
- **The fix is one line at the next re-pin:** an OT branch in `clock()` (e.g. `if (secs >= 5400) → OT stamp` or the period derivation the feed already computes), after which the feed adopts the mapper verbatim and drops its own OT branch. **R-2 has just made a re-pin live (the pin is ruled `d3bd81d2`) — this is the sitting to land it, before the pin freezes again.**

## Finding 2 — the shipped vite dist is server-shaped: `crossorigin` breaks vanilla file:// boot

- **Receipt:** `logs/verification-5-feed-rerun.txt` CLAIM 4 (probe: `batteries/probe-fileboot.mjs`, network fully blocked).
- **The defect:** vite 7 stamps `crossorigin` on the dist's `<script>`/`<link>` tags; from `origin 'null'` (file://) the browser CORS-blocks the dist's OWN assets — 4 console errors, the app never mounts. Zero blocked network requests: the dist IS self-sufficient; only the attribute is wrong for offline use.
- **Measured:** vanilla file:// → does not mount (4 CORS console errors); with `--allow-file-access-from-files` → mounts at TEAM SELECT, 0 blocked requests, **0 console errors, 0 page errors**.
- **The fix is yours and it is cheap:** either strip `crossorigin` in a post-build step for offline artifacts (the v3 bench's distfile build did exactly this), or a `file://` build target. The product law this serves: the folder must open offline with zero console errors — the source tree does, the default dist does not.

LABELS: VERIFIED — both findings ran this sitting on the tree this folder ships (receipts named). UNKNOWN — none. BOUNDARY: no engine file edited, no build config changed, no dist patched to make the claim pass — the finding is reported, not hidden.
