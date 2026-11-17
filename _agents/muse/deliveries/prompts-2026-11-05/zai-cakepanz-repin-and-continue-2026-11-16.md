# Prompt for Z.ai — continue work: re-pin the shell to the current engine, fix the review findings, and keep building

You are Z.ai, the Executor for the Football Sim project. You build the user interface (the shell) for the football draft simulator 76 Pancakes. You work in your own tree, 67 Cakepanz, which is a parallel user interface for the same simulator. The Architect (Claude) owns the engine (the simulation code) and the product file; you own the shell. Either of you may read the other's tree; neither edits the other's. You do not edit the engine. You do not push to any branch — you cannot push. You deliver your work as a single zip file in one response, after ALL work is complete (see Part 6).

## Background (read first)

76 Pancakes is a football draft simulator: the user picks a team, drafts players, and plays a season. 67 Cakepanz is your parallel user interface for it, built with Svelte 5 and Vite. It has twelve slices built (1 Draft Board, 2 Team Select, 3 hydration and board chrome, 4 feed, 5 shareables, 6 Team Select plus the draft-position picker, 7 season hub and week views, 8 standings/bracket/Super Bowl, 9 awards, 10 season review, 11 guide, 12 merge rehearsal and cutover note).

Your last delivery, 67-cakepanz-3 (the fix round), was reviewed by four council seats and they all agree it is merge-ready: the four defects from the previous round are fixed, the season runs end-to-end through the real interface, the built file boots clean from `file://`, and every battery is green. The review round found only small remaining items (Part 2 of this prompt) and one large next step (Part 1 of this prompt). This prompt is that next step.

**The engine has moved since your last delivery.** Your shell is pinned to engine commit `d3bd81d2` (the engine as it was when you built Cakepanz-3). The Architect has since landed three more pieces of engine work, and the current engine tip is `5c808472`. The new work is: a portable cosine (so the engine's random-number generator gives the exact same answer digit for digit as the Python lab), conformance vectors for the pooled nodes (so the engine's play-pool picker is checked against the lab's own play-pool code), and the CI build gate (a failing build now fails the CI run). The engine suite at the new tip is 394 tests passing, 0 failing (it was 323 at your pin). Your shell needs to move to the new tip. That is Part 1, the main job of this prompt.

**Innovate, brainstorm, improve, and create new ideas.** The Owner's standing instruction for you is to think around whatever the issue is, not just to do what you are told. You decide the implementation inside your tree. You build first; review catches problems after, no pre-approval to build inside your tree. If you see a better way to do something in this prompt, do it that way and say so in your delivery note. If you see a new feature, a better interaction, or a cleaner structure that would make the shell better, build it (inside your tree, without touching the engine or any blocked item in Part 5) and say what you built. The prompt tells you what to fix and verify, not how to think. Bring your own ideas.

## Part 0 — Inventory first (do this before changing anything)

Before you change a file, inventory what you have. Read the current state of your tree (the 67-cakepanz-3 delivery) and write a short inventory: which slices are built, which batteries exist and what they claim, which engine pin you are on, and which of the items in this prompt are already done. If anything in this prompt is already done in your tree, say so in your delivery note and do not redo it. If anything in this prompt contradicts what is already built, say so and do what the built state requires. Do not assume you know the state of your tree — read it first.

## Part 1 — Re-pin the shell to the current engine tip `5c808472` (the main job)

**What "re-pin" means.** Your shell carries a frozen copy of the engine (the `src/engine/` directory) plus the flex table (`tools/mathlab/flex.json`) plus the carried test expectations (the engine test files your shell carries, which assert engine behaviour). A re-pin moves all three together, in one green commit, so the shell and its tests agree with the new engine. This is the three-path rule: the snapshot, the flex table, and the carried test expectations move together, or the tree goes red. Do not move one without the others.

**The steps:**
1. Copy the engine from the Architect's tip `5c808472`: the `colors/src/` directory becomes your `src/engine/`. Confirm the copy is byte-identical to the tip (57 engine files; use `git archive` and `diff -rq` or the equivalent, and record the result).
2. Copy the flex table from the same tip (`tools/mathlab/flex.json`). Confirm the flex counts are 17 at 0, 17 at 2, 42 at 6, 23 at 12 (99 rules total). Confirm the six rules the Owner approved are at 2 (EDGE→DT, ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS) and SS→NICKEL stays at 0.
3. Update the carried test expectations to the new tip. This is the substantive work. Your shell's carried engine tests currently assert the old pin's values. The new tip changed the engine (the portable cosine and the pooled-node conformance added tests and changed behaviour). Run the engine suite against the new snapshot and update every carried expectation that no longer matches, so the suite is green at the new tip. Do not weaken a test to make it pass — update the expectation to the new engine's true value, and say what changed and why.
4. Run the M3 swap test as a rehearsal first (if you have not already): swap the engine snapshot to the new tip in a scratch copy, run the batteries, and confirm the shell survives and the carried expectations are the only thing that goes red. Then do the real re-pin. Record the swap-test result.
5. After the re-pin, re-run every battery and confirm the numbers at the new tip: engine suite 394/394, node battery 23/23, slice battery 26/0/10/3, shell battery 46/0 in one uninterrupted run. If any battery is not green at the new tip, fix it (inside your tree) or say plainly what is red and why.
6. Update every document that names the pin: SNAPSHOT.md (the pin line and the byte-identity receipt), the README body (pin, file count, test count), and any other file that cites `d3bd81d2` as the current pin. Do not leave a stale pin line anywhere.

**The deliverable.** The re-pinned tree, with a note in your delivery (VERIFY.txt or the equivalent) stating the old pin, the new pin, the byte-identity receipt, the carried-expectation changes (what changed and why), and the battery numbers at the new tip.

## Part 2 — Fix the review findings from the Cakepanz-3 round

The council's review of your last delivery found only small items. Fix them all.

**F2/F3 falsifiers.** One reviewer (Beam) reports the F2/F3 falsifier checks are still unfalsified this sitting because their mutation targets moved. Another reviewer (Inkling) reports all laws die on his own run. Reconcile this yourself: re-run the falsifiers with corrected target strings, confirm each law dies with a planted violation, and report the result. If a falsifier cannot be made to die, say so plainly and do not claim it passes. The falsifier logs should be present and honest.

**The accessibility warning.** One reviewer (Ernie) found a new build warning: `a11y_no_noninteractive_tabindex` (a `tabindex` on a non-interactive element). Fix it (one attribute). Confirm the warning is gone from the build.

**The node battery on Node 26.** Two reviewers could not run the node battery or the shell battery on Node 26 (the engine snapshot carries a TypeScript parameter property that strip-only mode cannot parse). You already documented this correctly (pinned Node 24, filed a §5 to the Architect). Do not change the engine to fix it — that is the Architect's piece. But confirm your documentation is still accurate at the new pin: SNAPSHOT.md should state the pinned Node version, the affected file and line, and the §5 filing. If the new tip changed the parameter property (check whether it is still there), update the documentation to match.

**Any other nits from the review round.** Re-read the four Cakepanz-3 reviews (Inkling, Ernie, Beam, VL — on council/inkling, council/ernie, council/beam, council/vl) and fix every small item they name that is inside your tree and not blocked in Part 5. If a review item is blocked or is the Architect's, say so in your delivery note and do not touch it.

**The deliverable.** The fixes, with a note stating each review item, whether you fixed it, and the evidence (the command and output, or the file and line).

## Part 3 — Re-verify everything at the new pin

After Parts 1 and 2, re-run the full verification suite on the re-pinned tree and report the numbers. Do not carry forward the old pin's receipts — re-run everything at the new tip.

- Engine suite: 394/394 (confirm the count at the new tip).
- Node battery: 23/23 (confirm the count; the two new laws from the last round, N14b and N19, should still be there).
- Slice battery: 26/0/10/3.
- Shell battery: 46/0 in one uninterrupted run (S1a–S30), including the season played through the real interface to the champion banner, the restore flow, the 390px walk, and the file:// boot.
- Build green; the single-file build boots from vanilla `file://` with zero console errors and zero blocked requests.
- The manifest gate passes and covers `dist/` (the gate must assert the served artifact's completeness — parse `dist/index.html` and assert every referenced file exists).
- The numerals gate is clean.
- The 390px board: scrollWidth equals clientWidth (no overflow).
- The pin: `src/engine/` byte-identical to `5c808472` (57 files).

**The deliverable.** A VERIFY.txt (or equivalent) with the numbers, the commands, and the outputs, at the new pin. If anything is not green, say so plainly with the output — do not claim a green result you did not get.

## Part 4 — Innovate: what would make the shell better?

This is your open section. Think around the shell and build what you think is best, inside your tree, without touching the engine or any blocked item in Part 5. Some directions to consider (not a list of orders — pick the ones you think matter, or bring your own):

- **The shell is merge-ready.** What would make the merge smoother? What would a reviewer or the Architect need to see to merge it with confidence? Build that (better documentation, a clearer merge guide, a cutover checklist that runs green).
- **The user experience.** Play the shell yourself as a user would (draft a team, play a season). What is confusing, slow, or ugly? Fix it. What would make the draft board, the season hub, or the awards screen more delightful? Build it.
- **The save system.** The shell side of saves (the save/load interface, the restore flow) is yours. Is there anything about saving, loading, or restoring a season that could be better? Build it (without touching the engine-side save contract — that is the Architect's).
- **New ideas.** If you have an idea for a new slice, a new screen, or a new feature that fits the shell, build it and say what you built and why. The Owner wants you to brainstorm and create, not just to fix.

**The deliverable.** Whatever you build, with a note stating what you built, why, and how to see it. If you build nothing in this part, say so and say why (for example, because the re-pin and the fixes took the whole sitting, or because you judge the shell complete as it stands). An honest "nothing" is better than a forced feature.

## Part 5 — Blocked items (do NOT touch these)

These are blocked on the Owner's rulings or are the Architect's work. Do not change them. Do not work around them. List them as blocked in your delivery note.

- **No re-pin beyond `5c808472`.** Re-pin to the tip named in Part 1 only. Do not re-pin to any other commit, and do not change the pin again after Part 1.
- **No "Model Value" change.** The shell ships the label "Model Value". Whether it becomes "Engine Value" is the Owner's call. Do not change it.
- **No "2PT" change.** Do not change the "2PT" / "2PT FAIL" strings. That is the Owner's call.
- **No "touchdown" change.** Do not change how the word "touchdown" appears (whether in the shell or through the engine's recap strings). That is the Owner's call.
- **No palette change.** Do not change the colours, the contrast, or the palette. The light gold2 contrast (1.51:1, fails) and the dark text contrast (3.17:1, fails at AA normal) are measured and flagged for the Owner. Do not fix them — they are the Owner's rulings to make.
- **No 2027 product-year change.** Do not change the default product year. That is the Owner's call.
- **No P-317 store work.** The draft-position slot picker interface is done. The store change (accepting the slot, building the custom order, including it in the save record) is the Architect's. Do not implement it.
- **No engine edits.** Do not edit anything under `src/engine/`, `tools/mathlab/flex.json` (except copying it in the re-pin, Part 1), or any engine file. The engine is the Architect's. The parameter-property fix is the Architect's (§5 already filed).
- **No ratings work.** Do not generate, change, or touch player ratings. The Owner generates them himself later.

## Part 6 — Delivery (read this carefully — it governs how you respond)

**Complete ALL work before responding.** Unlike the council seats (who push after every finished file), you cannot push — every response costs the Owner a publish step (he has to take the zip and put it on the site). So you must NOT respond until ALL work in this prompt is complete. Work as much as possible before responding and batch every completed piece into a single response (a single zip). If a piece is blocked, say so in your delivery note and explain the blocker — that is the only reason to respond with work outstanding. Do not respond with a partial delivery and promise the rest later.

**The "push after every finished file" rule does NOT apply to you.** That rule is for the council seats, who push to branches. You ship one zip. Do not include a "push after every file" instruction in your own notes — it does not apply to your delivery.

**Work at least 30 minutes before replying.** This is a long prompt with substantial work (a re-pin, fixes, a full re-verification, and an innovation section). Do not reply quickly. Take the time to do the work properly, run the batteries, and check the results. If the work takes longer than 30 minutes, take longer — thoroughness matters more than speed.

**What to include in your response.** A single zip containing the complete tree (all files, including the re-pinned engine snapshot, the updated documents, the batteries, and the receipts). Plus a delivery note (VERIFY.txt or the equivalent) stating: what you did in each part, the battery numbers at the new pin, what is blocked (Part 5), what you built in Part 4 (or why nothing), and anything you could not complete with the reason. Label every claim VERIFIED (you ran it, the receipt is in the text), REPORTED (someone else measured it), INFERRED (reasoned, not run), or UNKNOWN (no evidence). Do not present a measurement you did not run as if you ran it.

## How to work

- Read the current state of your tree first (Part 0). Do not assume you know it.
- Build first; review catches problems after. You decide the implementation inside your tree.
- If you disagree with something in this prompt, say so in your delivery note with your reasoning, and do what you think is best (inside your tree, without touching a blocked item).
- Think around the issue. Bring your own ideas. The prompt tells you what to fix and verify, not how to think.
