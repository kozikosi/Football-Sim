SPEAKER: ernie | ROLE: council advisor | TASK: a self-contained work order for Z.ai — finish the 67 Cakepanz shell as a merge cone for the engine | DATE: 2026-11-16T20:20Z
FOR: framework comparison (R-13)

PRIORITY+: Cakepanz slices 3-5 as a merge cone — the shell must be finishable *and* droppable so that replacing one directory with a new engine snapshot is the whole of a re-pin.

> Draft prompt for the Owner to hand over. Not an assignment by me; work still comes from the queue.

---

# PROMPT — Z.ai · 67 Cakepanz · "build the shell so the engine drops in"

## The goal, in one sentence
Finish the shell (slices 3-5 and the skipped shell surfaces) so that **the only operation required to move to a new engine is replacing `67-cakepanz/src/engine/` with the new snapshot** — no app file edited, no import rewritten, no law re-recorded by hand.

Everything below is in service of that sentence.

## Where the tree stands (verify, don't trust me)
- `67-cakepanz/` on `origin/gh-pages`. **Slices 1-2 done**: the Draft Board and Team Select. Slices 3-5 open: hydration + board chrome, feed, shareables.
- **`README.md` says the pinned engine commit is `4ca9a071`; `AGENTS.md` says the pin is `d3bd81d2` (re-pinned 2026-11-15).** Both cannot be current. Your first task is to state which commit `src/engine/` actually carries, with `git log -1` on the snapshot's own files, and to fix whichever document is stale. A shell whose README names the wrong pin is not mergeable.
- The snapshot is `colors/src/**` copied verbatim. The app already consumes `boardVM`, `goneOdds`, `lineupFor`, `fit`, `SLOTS` — all from the snapshot. Keep that property and make it structural.

## The merge cone — five requirements, each testable

**M1 · One door.** Every engine read goes through a single adapter module (one file). A component imports the adapter or a view model, never `src/engine/**`. 
*Check:* `grep -rn "src/engine\|engine/" src/lib --include=*.svelte` returns **zero** hits outside the adapter. Paste the command and its empty output.

**M2 · One directory.** Nothing outside `src/engine/` knows the snapshot's layout. 
*Check:* delete `src/engine/` and show that every error is a missing-module error in one file (the adapter) or a build failure — never a type error in a screen. Paste the output.

**M3 · The swap test (the gate Claude actually needs).** Take the current pin and one other engine commit, copy `src/engine/` from the other commit, then:
```
npm ci && npm run build && npm run battery
```
The app must build and the battery must pass **with zero edits outside `src/engine/`**. Ship both receipts, plus `diff -rq` proving nothing outside `src/engine/` changed. If the battery legitimately fails because a law moved, say which law and why — do not edit the law to make it pass.

**M4 · A written contract.** `SNAPSHOT.md` in the repo root: the pin, the file count, `sha256` of every snapshot file, the exact command that produced it, and the one-line procedure to re-pin. A stranger must be able to re-pin from this file alone.

**M5 · The seam is thin.** State, with line counts, how many lines of app code touch engine types. If the number is large, the cone is not built yet — that number is the deliverable, not the screens.

## The slices

**Slice 3 — hydration + board chrome.** The board gets its chrome pass, and the two carried innovations land here (you named them, they belong to the board): the gone-odds **"between now and my next pick"** tooltip, and the **"my needs" sticky row** (which of my 32 slots are still open, clickable to filter).

**Slice 4 — feed.** The pick-by-pick and the season's story surfaces, driven by the engine's own feed VM — no invented events.

**Slice 5 — shareables.** The export/share path. It must work offline: one self-contained file, no CDN, no network.

**The skipped shell surfaces.** Slice 1's battery SKIPped ten laws (stage bars, preseason page, guide ladder, cinematics, phone laws on shell chrome, the season surfaces). Decide which are in scope for "perfect shell" and say so explicitly — a SKIP that is never resolved is a silent scope cut. Each one you take on gets a law; each one you defer gets a line in `SNAPSHOT.md` saying why and when.

## The non-functional laws (these are what make it mergeable)
- **Offline:** opens from `file://` with zero network. One self-contained HTML after build.
- **390 px:** no horizontal scroll on any screen.
- **Zero console errors** on every screen, in both the empty state and the dev state.
- **Every number labelled with its valuation mode.** The measured default and the Owner preset one click away; the label travels with the numbers.
- **76 Pancakes on the page.** 67 Cakepanz is the builders' name only.
- **No generated ratings, no invented players, no hard-coded flex.** Flex costs come from `fit` and the flex table, never a literal.

## The rule for this work order
**Every law must be able to fail.** For each new law you write, break the thing it guards and show the law dies. A battery that has never been seen red is not a battery. Report the survivors too — a law that stays green when its guard is broken is a tautology and I want it named, not quietly kept.

## Do not
- Do not edit the engine snapshot to make a screen easier. If the engine is missing something the shell needs, file it (file + what the shell needs + why the shell cannot work around it) — that is a §5 proposal to the Architect, not a local patch.
- Do not generate or "correct" ratings. The Owner owns ratings generation.
- Do not change the brand or the palette. The palette ruling is the Owner's.
- Do not edit the product HTML, `colors/`, another seat's tree, or the queue.

## Filing
- One file per slice: `_agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md`, first line `SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: framework comparison (R-13)`.
- A law's receipt: the command, the output, and **the mutation that killed it**.
- Push after every finished file. A reply reporting only green laws is incomplete.