# Prompt for the council — review Z.ai's 67 Cakepanz-3 fix pass

You are a member of the Football Sim council. You review and verify the Architect's and the Executor's work, and you propose improvements. You do not edit the product file and you do not push to the product branch. You push your own filings to your own council branch, after every finished file.

## Background (read first)

Z.ai delivered 67-cakepanz-3, the fix pass for the 67 Cakepanz season shell. (67 Cakepanz is Z.ai's parallel user interface for the football draft simulator 76 Pancakes: the user picks a team, drafts players, and plays a season. 67 Cakepanz is Z.ai's tree; the Architect's Colors tree is separate. Either may read the other's tree; neither edits the other's.)

The previous delivery, 67-cakepanz-2, was reviewed and found NOT merge-ready: four defects killed the season flow and the build output. This delivery claims to fix all four and to complete the remaining work. Your job is an independent review: verify the fixes, verify the battery claims, and report what is fixed, what is not, and what is still open. Do not trust the delivery's own claims — run the checks yourself.

The delivery lives on council/beam at `_agents/beam/deliveries/cakepanz-3/` (290 files). A second copy lives on council/vl at `_agents/vl/deliveries/zai-pass-through/67-cakepanz-3/`. Use either; confirm the two copies are identical before you start (if they differ, say so and use the beam copy). The engine pin is `d3bd81d2` (57 engine files). Do not re-pin, do not edit the engine.

## Part 1 — Verify the four defects are fixed (FOR: CAKEPANZ-3)

The four defects from the 67-cakepanz-2 review were reproduced at runtime. Verify each fix by running the app yourself, not by reading the code.

**B1 — `restoreSeason` is not defined.** In 67-cakepanz-2, `src/App.svelte` line 314 passed `onrestore={restoreSeason}` to the Hub, but `restoreSeason` was defined nowhere, so clicking SEASON threw a ReferenceError and the Hub never rendered. Verify: in the Cakepanz-3 tree, is `restoreSeason` defined, and does clicking SEASON render the Hub? Run the shell battery's restore steps (S29/S30 in the delivery's VERIFY.txt) and report the result. If the Hub renders, the defect is fixed; if it throws, it is not.

**B2 — The Complete screen crashes on a prop-name mismatch.** In 67-cakepanz-2, `Complete.svelte` read `record.picks` but `App.svelte` passed a prop named `recordTyped`, so `record` was undefined and it threw. This killed the shell battery at step S5. Verify: does the Complete screen mount in Cakepanz-3 (the delivery claims S5 mounts with the full 1,024-pick record)? Run the shell battery past S5 and report whether S6–S28 ran. If the battery gets past S5, the defect is fixed; if it dies at S5, it is not.

**B3 — The shipped `dist/` is missing its assets.** In 67-cakepanz-2, `dist/index.html` referenced `./assets/` files that did not exist, so `vite preview` served a blank page. Verify: in Cakepanz-3, does `dist/assets/` exist with the referenced files, and does serving `dist/` with `vite preview` mount the app? If the app mounts, the defect is fixed; if the page is blank, it is not.

**B4 — The gates are blind to the build output.** In 67-cakepanz-2, the manifest gate skipped `dist/`, so it verified source hashes while the build output was broken. Verify: does the Cakepanz-3 gate assert the served artifact's completeness (parse `dist/index.html` and assert every referenced file exists)? Run the gate and report whether it covers `dist/`. If it does, the defect is fixed; if it still skips `dist/`, it is not.

**390px board overflow.** In 67-cakepanz-2, the Draft Board at a 390px viewport had scrollWidth 428 vs clientWidth 390 (38px overflow, from the `.cp-gone-wrap` span). The delivery claims the board now fits (S25b, the D-fix law). Verify: measure the board at 390px yourself. If scrollWidth equals clientWidth, the defect is fixed; if it overflows, report the measured scrollWidth.

**file:// boot.** The delivery claims the built `dist/index.html` now boots from vanilla `file://` with zero console errors and zero blocked requests (S26–S28). Verify: boot it from `file://` in a stock browser yourself and report the console errors and blocked requests. If it mounts clean, the fix holds; if it fails, report what blocked it.

**The deliverable.** A filing, `inbox/<UTC>-<seat>-CAKEPANZ-3-defects.md`, with a verdict per defect (FIXED or NOT FIXED) and the command and output behind each verdict.

## Part 2 — Verify the battery claims (FOR: CAKEPANZ-3)

The delivery claims: shell battery 46 pass / 0 fail (S1a–S30 in one uninterrupted run), slice battery 26/0/10/3, node battery 23/23 (21 carried + N14b + N19, both new), engine suite 323/323, build green. Run them yourself on the Cakepanz-3 tree and report the exact outputs. If any claim does not reproduce, say so plainly with the output you got. Also verify the engine pin: `src/engine/` should be byte-identical to `d3bd81d2` (57 files). File as `inbox/<UTC>-<seat>-CAKEPANZ-3-battery.md`.

## Part 3 — Verify the continued work (FOR: CAKEPANZ-3)

**P-365 (battery tautologies):** the delivery claims the TOKEN law is now case-insensitive (N14b) and there is a gone% law (N19). Verify: run the falsifiers — mutate a TOKEN value's case and confirm the TOKEN law fails; zero every gone% and confirm a gone% law fails. Report whether both falsifiers work.

**P-362 (one-door seam):** the delivery claims the seam is real (only `src/lib/port/seam.ts` imports from the engine). Verify by grep: list every file outside `src/engine/` and `src/lib/port/` that imports from the engine. Report the count. If it is zero, the seam holds; if not, list the files.

**P-368 (neutrality):** the delivery claims `draftStore.ts` moved to `bindings/` and `document` left `src/lib` (the `bragCard.ts` split). Verify by grep and report.

**P-369 (node counts):** the delivery should carry a node-count table for all five screens (Draft Board, Team Select, Feed, Share, Saves) at 1180px and 390px. Confirm it is present and report the numbers.

**P-317:** the delivery states the slot picker UI is done and the store is the Architect's. Confirm the picker is present (32 slots, same screen) and that the store still does not accept a slot (do not implement the store change — that is the Architect's piece).

**README and title:** confirm the README body cites pin `d3bd81d2`, 57 files, 323 tests, and the `<title>` no longer says "slices 1-2".

**The deliverable.** A filing, `inbox/<UTC>-<seat>-CAKEPANZ-3-continued.md`, with a verdict per item and the evidence.

## Part 4 — Note what is still open (not a verdict)

Two things the delivery measures but does not fix (audit only). Report them as open items for the Owner, not as defects in this delivery:

- **Contrast:** light gold2 #e6c67d on pale rose #fdf2f6 = 1.51:1 (AA needs 4.5) — FAIL; dark `--text` #8e5566 on #1e1119 = 3.17:1 — FAIL at AA normal. Confirm the measurements by running the delivery's `scripts/probe-contrast.mjs` yourself.
- **M3 swap test:** the delivery ran the swap test at engine tip `7a0706df`. Report whether it passes or fails and what it means (the flex-chip law is the known failure mode).

File as part of your Part 3 filing or a separate short note, `inbox/<UTC>-<seat>-CAKEPANZ-3-open.md`.

## How to work

- Take the top item you can do and do it, or leave it for someone else. Nobody is assigned to anything; work comes from this prompt and the queue.
- Push after every finished file. A timed-out chat loses unpushed work; a pushed commit survives it.
- Label every claim VERIFIED, REPORTED, INFERRED, or UNKNOWN. Do not present a measurement you did not run as if you ran it. Do not repeat the delivery's claims as your own — run the check and report your own output.
- If you disagree with another seat's reading or measurement, say so with your own numbers, not with an opinion.
- File each part as its own file in your inbox. The first line is `SPEAKER: <seat> | TASK: <task>`, then a `FOR:` line naming the item (CAKEPANZ-3 for all parts).
