# Prompt for Z.ai — fix the 67 Cakepanz season shell and continue

You are Z.ai, the builder. You build the 67 Cakepanz shell — a parallel user interface for the football draft simulator called 76 Pancakes. (76 Pancakes is a football draft simulator: the user picks a team, drafts players, and plays a season. 67 Cakepanz is your parallel track of the same app, named for 67 instead of 76 and Cakepanz instead of Pancakes. It is your tree; the Architect's Colors tree is a separate tree. Either may read the other's tree; neither edits the other's.)

The engine is a frozen snapshot. You do NOT edit the engine. You consume it through a one-door seam: the directory `src/lib/port/` (20 files). Only one file, `src/lib/port/seam.ts`, imports from the engine (`src/engine/`). No other file outside `src/engine/` and `src/lib/port/` imports the engine. Do not add engine imports anywhere else.

The current delivery is 67-cakepanz-2: 236 files, version `0.6.0-shell`, engine pin `d3bd81d2` (57 engine files). Twelve slices are built: 1 Draft Board, 2 Team Select, 3 hydration + board chrome, 4 feed, 5 shareables, 6 Team Select + draft-position picker (the user-interface part only), 7 season hub + week views, 8 standings / bracket / Super Bowl, 9 awards, 10 season review, 11 guide, 12 merge rehearsal + cutover note.

This prompt is sized for at least 30 minutes of work. Do not respond until all of it is done.

## Part 0: Inventory first

Before changing anything, inventory the tree you were given. List the files. Confirm the engine pin: `src/engine/` should be byte-identical to pin `d3bd81d2` (57 files). Run the engine tests (expect 323 passing, 0 failing). Run the build (expect green, 221 modules). Run the slice battery (expect 26 passing, 0 failing, 10 skipped, 3 pending) and the node battery (expect 21 passing, 0 failing). Record the results in VERIFY.txt. If any of these do not match, say so in your delivery note — do not silently proceed on a different tree.

## Part 1: Fix the four defects that kill the season flow and the build output

**B1 — `restoreSeason` is not defined (kills the whole season flow).** In `src/App.svelte`, line 314 passes `onrestore={restoreSeason}` to the Hub component, but `restoreSeason` is defined nowhere in the entire tree. Clicking the SEASON nav button throws `ReferenceError: restoreSeason is not defined`, and the Hub never renders. The Hub, Week, Standings, Bracket, Book, Awards, and Review screens all sit behind this branch, so the season can never start. Fix: define `restoreSeason`, or wire the Hub's restore to the existing save/restore path. The build passes today because a missing identifier in a prop binding is not a compile error — so do not trust the build to catch this. Test it by clicking SEASON in the running app and confirming the Hub renders.

**B2 — The Complete screen crashes on a prop-name mismatch.** `Complete.svelte` reads `record.picks`, but `src/App.svelte` line 306 passes `<Complete {recordTyped} ... />` — a prop named `recordTyped`, not `record`. So `record` is undefined inside Complete and it throws. Fix: pass `record={recordTyped}`. (Book and Share already do this correctly.) This is why the shell battery dies at step S5.

**B3 — The shipped `dist/` is missing its assets.** `dist/index.html` references `./assets/index-DZoN6Bja.js` and `./assets/index-BfrQWrHl.css`, but there is no `dist/assets/` directory at all. Serving `dist/` with `vite preview` shows a permanently blank page. Fix: ship `dist/assets/` with the built files. A rebuild produces those exact filenames, so the dist was built from this exact source — the assets were simply not shipped. After the fix, serve `dist/` with `vite preview` and confirm the app mounts.

**B4 — The gates are blind to the build output.** `scripts/gate-manifest.mjs` skips `dist/` (and `shots/`) in the converse check, and `CHECKSUMS.txt` does not list `dist/` files. The gate verified 233 source hashes while the build output was broken. Fix: extend the gate to assert the served artifact's completeness — parse `dist/index.html` and assert every referenced file exists. A gate that cannot see a missing build output cannot certify a bootable artifact.

**390px board overflow.** The Draft Board at a 390px viewport has scrollWidth 428 vs clientWidth 390 (38px of horizontal overflow). Root cause: the `.cp-gone-wrap` span (56px wide) sits outside the `.cp-row` box (right edge around 427px). The earlier BoardRow grid fix did not address this. Fix: reposition the gone-wrap column so the board fits a 390px viewport with no horizontal overflow (scrollWidth must equal clientWidth). Team Select at 390px is already clean (390/390) — do not break it. Add a board-at-390 law to the battery so this cannot regress silently.

**README and title are stale.** The README body still cites pin `4ca9a071`, 52 files, 284 tests. Correct it to pin `d3bd81d2`, 57 files, 323 tests. The `<title>` still says "slices 1-2" (in 3 files) — correct it to the complete shell. Also fix the gh-pages README pin line: `4ca9a071` → `d3bd81d2`, 52 → 57 files.

## Part 2: Re-verify everything after the fixes

Run the engine tests (expect 323 passing, 0 failing), the build (expect green), the slice battery (expect 26/0/10/3), and the node battery (expect 21/21). Run the shell battery steps S1–S28. The shell battery MUST get past S5 (the Complete screen) and run S6–S28 — the previous delivery's VERIFY.txt claimed S6–S28 PASS, but the battery died at S5, so those results were unverifiable from that tree. Record the full output.

Boot `dist/single.html` from `file://` in a stock browser: the app must mount with zero console errors and zero failed requests. Serve `dist/` with `vite preview`: the app must mount (this is the B3 check — a blank page means the assets are still missing). Measure the board at 390px: scrollWidth must equal clientWidth (no horizontal overflow). Run the gates (manifest + numerals): both must pass, and the manifest gate must now cover `dist/` (the B4 fix). Record all results in VERIFY.txt with the exact commands and outputs.

## Part 3: Continue work — the open items

**P-365: Fix the battery tautologies.** (1) The season-brag TOKEN law is conditionally dead: the table expects uppercase, the share view-model renders mixed case, so all four non-champion TOKEN branches can never match. Fix: one line, case-insensitive TOKEN match. (2) The shared-module recompute laws cannot catch a bug in the module they recompute through: the battery passed a 0–21 loss labelled VICTORY and a board whose every gone% was 0%. Gone% values have no law at all. Fix: independent-source assertions, starting with gone% values. Acceptance: a case-mutation of a TOKEN value fails the TOKEN law; a mutation that zeroes every gone% fails a gone% law.

**P-368: Neutrality cleanups.** Move `draftStore.ts` to `bindings/` — it is the single file under `src/lib` that imports from `svelte` besides render files. Remove `document` usage from `src/lib`: `bragCard.ts` line 155 calls `document.createElement('canvas')`, which breaks node-side fixture rendering — split `bragCard.ts` so `document` leaves `src/lib`. Correct the handoff wording: name the 14 `.svelte` files as the binding. Do not certify "neutrality" by reading a sentence instead of the tree.

**P-369: Weigh the unmeasured surfaces.** Feed, Share, and Saves node counts were never measured. Produce a node-count table for all five screens (Draft Board, Team Select, Feed, Share, Saves) at 1180px and 390px, in the delivery note. Do not cite the figure 221 — its origin is unknown.

**Small items (from the review).** Change `src/App.svelte` line 63 `let userTeam = 0` to `$state(0)` (removes the non-reactive-update warning). Replace the hard-coded `nextWeek <= 22` in `savesApp.ts` line 65 with the engine's `isFinished` (the engine already knows the season length; do not duplicate it).

## Part 4: What NOT to do (blocked — do not build these)

- Do NOT change the "Model Value" label (`src/lib/valuation.ts` line 11). The Owner has not ruled whether it should be "Model Value" or "Engine Value."
- Do NOT change "2PT" / "2PT FAIL" (`src/lib/port/feedVM.ts` lines 100–101). The Owner has not ruled whether it should be "2PT" or "2-Pt Conv."
- Do NOT change the feed "touchdown" strings. The Owner has not ruled on the "never print Touchdown" law, and the law has no source on disk.
- Do NOT re-cut the skin or change the palette. The Owner has not ruled on the visual law (light gold2 contrast, dark text color).
- Do NOT touch the draft-position store (the P-317 store change). The slot picker user interface is done; the store change — passing the chosen slot to the draft so a restore replays the same order — is the Architect's piece, not yours. Do not implement it.
- Do NOT edit the engine (`src/engine/`). It is a frozen snapshot at pin `d3bd81d2`. You consume it through the one-door seam only.

## Part 5: Delivery — complete ALL work before responding (one zip)

**Complete ALL work before responding.** Do not respond until every part above is done. You cannot push — every response costs the Owner a publish step. Work as much as possible before responding and batch every completed piece into a single response (a single zip). If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding. This prompt is sized for at least 30 minutes of work; do not reply before it is all done.

Package the delivery the way the previous deliveries were packaged: the full tree, `CHECKSUMS.txt` (sha256 for every file), `MANIFEST.txt`, `VERIFY.txt` (with the exact commands and outputs for every check in Part 2), `SNAPSHOT.md` (accurate — it must match the tree), `MERGE-README.md`, `MERGE-GUIDE.md`, `SHELL-STATUS.md`. The README body and the `<title>` must be correct (Part 1).

**Think around the issues, not just inside them.** These fixes are the job, but if you see a better way to structure the season flow, a cleaner shape for the seam, a stronger gate, or a more beautiful board, build it — and say what you built and why in your delivery note. You are the builder; the prompt tells you what to build, not how to think. Innovate, brainstorm, improve, and create new ideas around whatever the issue is. The best delivery is one that fixes the defects AND leaves the shell better than the prompt asked for.
