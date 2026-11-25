SPEAKER: ds | ROLE: council review seat | TASK: review the Owner-relayed `zai-s17-closeout-2026-11-23` package and propose the next shell round | DATE: 2026-11-23T17:56Z

# Review — `zai-s17-closeout-2026-11-23` (the S15 close-out bytes)

**FOR:** Owner / Architect / Z.ai — Owner-relayed, no `QUEUE.md` row.
**REVIEW-OF:** `zai-s17-closeout-2026-11-23/` at `council/ds` commit `7b94a40ec` (the folder is hosted verbatim: 677 files, 24 MB, `diff -r` clean against the Owner's desktop copy).
**PACKAGE SELF-LABEL:** S15 close-out, 2026-11-21 (README, SNAPSHOT, SHELL-STATUS, the handover). The folder name says S17/2026-11-23. See **F12**.
**VERDICT:** **TRUSTWORTHY BYTES · NOT UI-ACCEPTED.** This is the best-sealed Cakepanz delivery so far, and it fixes both real blockers of the S15 WIP plus the falsifier's tautologies. It is safe to use as the base for the shell round. It is not the shell's acceptance: three user-facing P1s remain — the "top three" is 4–45 rows, the 390 board is unreadable, and both themes ship text below AA. It also has a board-column alignment defect, a buried sort control, and a 216-tab keyboard path.

Labels used below: **V** = I ran it this sitting and the output is in this file · **R** = the package says so; cited · **I** = reasoned from code/outputs · **U** = not established.

---

## 0 · What this review covers (and what it does not)

This is a review of the delivered bytes, not a re-build of the product. I did not edit any file in the package or the engine; every product proposal here is shell-side and is for the Architect/Z.ai to build. The S15 WIP package I hosted at `aaaee04f4` is the pre-close-out tree; this review closes the loop on it: the close-out fixed its two hard blockers (verify-package, stale pin) and its two falsifier failures, but the user-facing tie balloon and the phone layout are unchanged.

I ran the package's own tools from a pristine copy at `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/cakepanz17-run` with `npm ci`; `node_modules` never entered the repository. The full board falsifier ran to completion; the verdict is in §6.

---

## 1 · Evidence (V unless marked)

| Check | Command | Result |
|---|---|---|
| Package seal | `node tools/verify-package.mjs .` | **370 OK / 0 FAILED / 0 missing** (370 entries); converse clean — no unlisted file; exit 0. **The S15 WIP's D1 verifier defect is fixed.** |
| Manifest gate | `node scripts/gate-manifest.mjs` (clean hosted tree) | **PASS** (370 entries verified, `dist/` covered, converse clean, boot target 2 assets). |
| Numerals gate | `CP_PIN=408410477 node scripts/gate-numerals.mjs` | **CLEAN ×2** (old pin only in correction context; no unfilled markers). |
| Engine fence | `git archive 408410477 colors/src` → `diff -r` vs `src/engine` | **byte-identical, 69 files**; no engine edit in the delivery. |
| Engine pin currency | `git diff --stat 408410477 origin/architect/engine-and-seats -- colors/src` | empty — the declared pin's engine code is still the Architect's tip content (the tip has docs/data changes only). |
| Build reproducibility | `npm ci && npm run distfile` | `dist/` byte-identical to the committed `dist/`; js `edc51cd0…`, css `753997b6…`, index `3edb5c6f…`, single `3e3b837b…`. |
| Node laws | `npm run battery:node` | **37 pass / 0 fail**. |
| Engine tests | `npm run test:engine` | **430 pass / 0 fail**. |
| Board battery | `npm run battery:board` | **24 pass / 0 fail**. L13's own line: pick 13 → **36** highlighted; pick 27 → **60**. |
| Shell battery | `shell.battery.mjs` | **53 pass / 0 fail**. |
| Visual battery | `npm run battery:visual` | **18 pass / 0 fail** (390/390 no h-scroll, zero errors). |
| Slot battery | `npm run battery:slot` | **28 pass / 0 fail**. |
| Slice 1 battery | `npm run battery` | **29 pass / 0 fail / 10 skip / 3 deferred** with loud reasons. |
| Contrast battery | `contrast.battery.mjs` | 2 pass / 0 fail; **3 known holes on record**: light gold2 on pale rose 1.51:1, light gold2 on white 1.65:1, dark rose ink on plum 3.17:1. |
| Viewport matrix | `scripts/viewport-matrix.mjs` | **45 checks, 0 overflow, 0 console/page errors** at 390/768/1280. |
| Live probe: layout | `probe-layout.mjs` (Playwright, seed a3f2, Bears) | 390: name column **42 px**, team column **34 px** but content **58 px**, rows **85–169 px**; 1180: name **441–522 px**, team **44 px**, rows **47–62 px**. |
| Live probe: balloon | `probe-balloon.mjs` (one-click through 12 picks) | top3/badges/why: 4 → 5 → 6 → **14** → 5 → 4 → 3 → 3 → **30** → 13 → 7 → **45**. |
| Live probe: a11y/keyboard | `probe-a11y.mjs` | **216 focusables** in the board; sort controls at index **212–214**; first row at 32/33/34; accessible name starts **"TOPBrock Purdy"**. |
| Live probe: sort position | `probe-sortpos.mjs` | sort bar at y **3307** (rows end 3286, doc 3779, viewport 950); after clicking Priority at the bottom, `scrollY` **2889**, first row at y **−2580**, first visible row `nfl-p00074`. |
| Side-by-side assets | `find shots/side-by-side -name '*.png'` | **41 PNGs** present; the right-side board captures are valid; the **left-side board captures show the w89 "WELCOME TO THE DRAFT" overlay**, not a board (see F9). |

Not run: the shell/slot/receipt falsifiers, a fresh side-by-side run, and the full preflight. The package's own `ACCEPTANCE-RECEIPTS.txt` reports 39 DIED and zero TAUTOLOGY/COULD-NOT-RUN (R); my independent board-falsifier run is §6.

---

## 2 · What the close-out genuinely fixed (S15 WIP → these bytes)

1. **The verifier now reads the manifest it ships.** `tools/verify-package.mjs:41` accepts 32- or 64-hex and chooses md5/sha256 by digest length (`:46`). At these bytes: 370 OK / 0 FAILED, converse clean. The S15 WIP's `0 OK / 359 FAILED + 474 EXTRA` is gone. **V**
2. **The stale engine stamp is gone.** `ENGINE_PIN` is no longer a literal; `metaNow()` stamps `engineVersion()` (`src/App.svelte:238-239`), and N36/S34 pass. The saves panel prints the running stamp. **V**
3. **The falsifier anchors are at the delivered bytes.** F30's `a DERIVED view` matches `src/App.svelte:225`; F31's `rowName` anchor matches `DraftBoard.svelte:44-49`; the L26/L27/L28 probe is re-homed to a fresh pick-1 board. The S15 WIP's `F30 anchor not found` and the `F27/F28` tautologies are fixed **as tests**. **V**
4. **The toast tells the truth.** The toast rides a landed pick (`DraftBoard.svelte:44-49`), not a click; L31/F31 cover it. **V**
5. **Share/download discipline.** The brag text is build-time-constant only, the card strips tags and seed, and no download path ships (N37; `App.svelte`/`bragText`). **R** + spot-read.
6. **The one-button decision is implemented.** One `.cp-draftbtn` per row; the expanded panel keeps the staged path deliberately. **V** (but see F7 for the label collision).
7. **The package is honest.** The README records the S15 WIP defects, the verifier's RED and its resolution, and the retracted zip sentence. That is the right culture; the review's P1s are about the product, not the bookkeeping.

---

## 3 · Findings, ranked

### F1 · P1 · The "top three" is 4–45 rows, not three — and the close-out fixed the test, not the product

**V.** `suggestIdsOf()` (`src/lib/port/suggestWhy.ts:30-39`) takes the first three **and then walks every later row whose display string equals the third row's display value** (`:35-38`). Because the display is rounded, dozens of players share the third value. The package's own board battery prints `pick 13 → 36 highlighted`, `pick 27 → 60 highlighted`; my live one-click walk printed 4, 5, 6, 14, 5, 4, 3, 3, 30, 13, 7, **45** as the top-three count after twelve user picks. Every one of those rows gets the TOP badge, the sheen, and a why line; at 45 rows, 44 of the why lines say the same "most Wins left".

The close-out is candid that it re-homed L26/L27/L28 to a **fresh pick-1** probe because the late-pick state made the old laws tautological. That repairs the oracle. It does **not** repair the board: at pick 1 the tie makes 4 rows, and at mid/late picks it is 14–60. Nor does it make the law late-pick-falsifiable: at pick 13 the product's own `top3` is 36, so a mutant that badges every row would still be indistinguishable; the law should assert **`top3 === 3`**, not set equality against a component-derived set. The Owner's C′1 wording — "at least three … more than three only on an order tie" — is not met by a **display-rounded** tie if "order tie" means the engine's raw order; it is a formatting coincidence, not an order tie. If the Owner means a tie visible in the display, the implementation is literal — but 45 rows with the same badge is still not a decision surface, and the cap is the safer interim. The comment at `suggestWhy.ts:11-14` says the extension is INTERIM until `rawSort`; the shell should not ship the interim as the default experience.

**Why it matters.** The board's primary signal becomes noise. "TOP" on 45 rows is not a priority; it is a second background. The why line and the sheen stop meaning anything. It also makes the 390 layout worse (each top row grows by a badge + why line).

**Fix (shell-only, one file + battery):**
- Return exactly `rows.slice(0, Math.min(3, rows.length))`; disable the display-rounded extension until the engine exposes `rawSort`. If the product wants to surface the tie, add **one** line, not 45 badges: `36 more tied at +0.2 on the display` (details disclosure), or a "tied" count chip beside the third row.
- **Cap restored rings too.** `validSavedIds()` (`:44-46`) accepts any non-empty array whose ids are on the board; a 45-id autosave from the old behavior would still render 45 rows on boot even after `suggestIdsOf` is capped. Reject or truncate saved rings longer than 3 until `rawSort`.
- Update L13/L25/L26/L27/L28 and the fresh-probe oracles to **exactly 3**; add a late-pick law (picks 1, 5, 13, 27) that `top3 === 3`. Keep the falsifier mutants: F27/F28 should still die.
- Make the why line sort-aware: rank 0 says "best value at QB" under every sort, including OVR and Priority, where the row is the top by that sort, not "value". Use "top OVR at WR" / "best value at QB" / "highest priority at …" as the active sort changes.
- When the Architect lands `rawSort`, extend only on **exact raw equality** and add a law for that.

**Engine dependency.** The permanent fix is the already-filed `rawSort` proposal (the engine's VM strips the raw key at `draftBoard.ts:61`). This is the single highest-value additive engine change for the shell; until it lands, the cap is the honest interim.

---

### F2 · P1 · The board is unreadable at 390 — the no-h-scroll law is blind to it

**V.** The close-out's own `shots/side-by-side/right-s2-board-top3-390x844-light.png` is the proof: names break every 4–6 characters ("Jorda/n Love", "DeVon/ta Smith", "Trent Willia/ms", "Will Ander/son Jr", "Davan/te Adam/s"), `Philadelphia` and `Pittsburgh` run into the OVR digits, and the sticky needs row (~220 px on a phone) covers the board's top when scrolled; the first row is clipped in the capture. The layout is the desktop grid squeezed, not a phone design:

- `.cp-main` at ≤430 px: `grid-template-columns: 1fr 30px 34px 40px 52px 58px 46px` (`BoardRow.svelte:95-97`). The name gets **42 px**; the team gets **34 px** but its content measures **58 px**; `.cp-name` uses `overflow-wrap: anywhere`, so it breaks mid-word.
- Measured row heights at 390: **121, 137, 169, 137, 98, 98, 117, 85, 101, 117, 101, 101 px** for the first 12 (average 115 px). The first four (the top group) are 121–169 px because they carry the badge, the why line, and the wrapped button; 60 rows are ~6,900 px of board.
- The 390 law passes because it checks `document.scrollWidth == clientWidth`; cell overflow paints into the neighbour without widening the document. The side-by-side's `noHScroll: PASS` is true and irrelevant. **No horizontal scroll is a floor, not a readable layout.**

**Fix:** at ≤640 px, stop squeezing the seven-column table; reflow to a card:
- line 1: name (full width) + OVR (right);
- line 2: pos · team (full width) · gone%;
- line 3: wins/priority chips (or move both into the expand panel) + full-width `Draft at QB`;
- why line only for the top 3 (and only when F1 is capped).
- Collapse the sticky **MY NEEDS** row by default on phone (it is ~220 px, 26% of an 844 px screen, and its 32 buttons are the first 32 tab stops).
- Add a layout law: at 390, name column ≥100 px, `.cp-nflteam` `scrollWidth <= clientWidth`, row height ≤120 px, first row not under the sticky needs row, and no per-character wrapping (a min-width plus `overflow-wrap: break-word` is enough).
- Keep 1280's table but fix F4's column alignment.

**Why it matters.** A phone user cannot identify a player or a team, and must scroll six screens of 60 rows. The rest of the shell (Team Select, the header, the pick flow) is legible at 390; the board is the one surface that fails.

---

### F3 · P1 · Both themes ship text below AA, and the contrast gate records it as "known"

**V.** The package's contrast battery prints:

- light `--gold2 #e6c67d` on `--bg #fdf2f6` = **1.51:1**;
- light `--gold2` on `--panel #ffffff` = **1.65:1**;
- dark `--text #8e5566` on `--bg #1e1119` = **3.17:1**.

All three are below AA 4.5:1 (and the first two are below even the 3:1 large-text floor). `src/lib/assets/tokens-w89.css:119-121` sets the dark background/sub/gold but **does not override `--text`**, so the light rose ink carries into dark; the `@media (prefers-color-scheme: dark)` block does the same. The contrast battery's `KNOWN` set (`batteries/contrast.battery.mjs:80-90`) makes those three a pass. The light screenshot confirms the effect: the nav labels and the "76 PANCAKES" wordmark are faint gold on pale rose; the dark body copy is pink on plum.

This is inherited from w89, and the shell is a faithful port. But the shell is now its own product: the Owner should decide between **w89 parity** and **readability**. My recommendation is a text-safe token layer, not a palette redesign:

- add `--gold-ink` (light: a darker gold, e.g. `#7a4b0e`, checked ≥4.5:1 on both `--bg` and `--panel`) for nav labels, headings, and small gold text; keep `--gold2` for fills, borders, glows, and large display type;
- set `--text` in dark to `--zcream`/a cream (`#f2e7d5` is already the neutral) so body copy is ≥7:1 on plum;
- update the contrast battery's token pairs and make the known set **empty**; if the Owner chooses parity, record that as an explicit Owner decision in `SHELL-STATUS.md`, not a silent hole.
- This is an Owner-ruled palette change (the 22 Oct colour table is authoritative); do not let a seat "fix" it unilaterally.

---

### F4 · P2 · The board's columns do not line up, row to row

**V.** The top rows are narrower than the rest because the why line sits **inside the same flex line** as the main grid and the button (`BoardRow.svelte:102-104`, `.cp-why` at `:113-118`). At 1180, measured:

| row | top? | `.cp-main` width | team x | OVR x | Draft x |
|---|---|---|---|---|---|
| 0 (QB) | yes | 846.0 | 591.0 | 643.0 | 929.0 |
| 4 (WR1) | no | 908.4 | 653.4 | 705.4 | 991.4 |
| 5 (QB) | no | 918.3 | 663.3 | 715.3 | 1001.3 |

So the fixed columns shift **62 px** between a top row and a normal row, and **~10 px** between a QB row and a WR1 row (the button label's width changes the flex width). A board's columns must be a table; this one is ragged. The desktop screenshot shows the team/OVR columns stepping left under the top four rows.

**Fix:** make the action rail fixed-width (e.g. `.cp-btnwrap { flex: 0 0 132px; justify-content: flex-end; }`) and put the why line on its own full-width line below the row (as at 390) or in a fixed 110 px right rail with a placeholder for non-top rows. The goal: identical column x-positions for every row. Add a probe law: `teamX/ovrX/btnX` equal across top and non-top rows within 1 px.

---

### F5 · P2 · Sort lives below 60 rows; sorting leaves you at the bottom of the new order

**V.** The sort bar is at y **3307**; the rows end at 3286; the document is 3779; the viewport is 950. The controls are at focus index **212–214** of 216. And clicking Priority at the bottom keeps `scrollY` **2889**: the first row is at y **−2580**, and the user is looking at row `nfl-p00074` of the new order, not at the new top three. The primary way to change the board's meaning is three screens below it, and it does not return you to the top.

**Fix:** a sticky board toolbar under the needs row with **sort · undo · seed code** (the same controls; the footer can keep a duplicate). On sort, scroll the board to its first row (or preserve an explicit anchor row); add a law: after a sort from any scroll position, the board's first row is within the viewport, and the sort controls are reachable without scrolling past the rows.

---

### F6 · P2 · 216 tab stops; the per-row "method" copy is the same text 60 times

**V.** The board has **216** focusable elements: 32 needs buttons, then 3 per row (expand main, Draft, hidden method `.cp-sr`), then 3 sort + undo. To change sort by keyboard you tab **212** times. The method copy is identical for every row (`BoardRow.svelte:27-28`: same `picksBetween`/`sims` for all rows), so 60 of those stops reveal the same paragraph.

**Fix, in order of effort:**
1. one **Method** disclosure in the board header (or a single info popover) and take the per-row `.cp-sr` out of the tab order, keeping it as `aria-describedby` for the gone cell; 60 stops disappear;
2. collapse **MY NEEDS** to a summary row on phone and give it a "show all" toggle; 32 stops disappear until opened;
3. a sticky toolbar (F5) makes sort reachable in a few tabs;
4. the structural fix is a roving-tabindex/ARIA-grid board (one tab stop for the grid, arrows to move, Enter to draft). That is the right long-term pattern for 60 rows; it needs its own battery.

Add a law with a budget: "sort reachable in ≤10 tabs; board tab stops ≤80" (or the documented roving pattern).

---

### F7 · P2 · Two controls labelled "Draft at QB" do different things

**V.** The row button (`BoardRow.svelte:55`) drafts **immediately** (`onpickDirect`). The expanded panel's primary (`:83`) is also labelled **"Draft at QB"**, but it calls `onpick` → stages the pick and opens the confirm banner; it does not draft. The panel is a deliberate staged path (T7/R1), and the comment calls it "not a duplicate of the visible control", but the **label** is identical. A user who expands, reads the fit advice, and presses the primary expects the same action as the row button; instead they get a confirmation step.

**Fix:** label the panel control by its actual behavior — **"Review this pick"** / **"Stage pick"** — or remove it and let the flex chips + confirm banner be the staged path. Add a law that the two labels differ and that the panel action leaves `userPicks` unchanged until confirm.

---

### F8 · P2 · "TOPBrock Purdy": the badge concatenates with the name; the accessible name is a 15-word run-on

**V.** `BoardRow.svelte:34` puts the badge and the name in one span with a space before `{/if}`; Svelte trims it, so `textContent` is **"TOPBrock Purdy"**. The first row's accessible name (Playwright) is:

> `TOPBrock Purdy QB San Francisco 49ers 92 overall +2.4 wins +0.2 priority 7% gone odds`

The `.cp-main` has no `aria-label`. The badge's `title` is not part of the name; the name starts with "TOPBrock". The numeric `aria-label`s (the D2 fix) are correct individually, but inside the big expand button they become a 15-word sentence for every row.

**Fix:**
- `</span>{/if}{' '}{r.name}` (or a literal space after the `if`) — one line;
- give `.cp-main` a concise `aria-label`: "Brock Purdy, QB, San Francisco 49ers — expand details" (and keep the numeric values in an `aria-describedby` or in the panel, where they are separately reachable); or `aria-hidden` the badge and add a visually hidden "Top three priority." prefix;
- add an a11y law: the first row's accessible name starts with the player name, does not contain "TOPBrock", and is ≤80 characters (or has an explicit label).

---

### F9 · P3 · The side-by-side's left board captures are the w89 intro overlay, not a board

**V.** `left-s2-board-top3-1180x950-light.png` and the 390 version (and their dark twins) show the large "WELCOME TO THE DRAFT" overlay over a washed-out page; no board rows are visible. The doc lists them as "reference capture" with no assertions. The right-side board captures are valid, so the 390 finding above stands on the right side alone; but the "side-by-side" for the board scene has no valid reference. A cell is filled; the scene is not captured.

**Fix:** wait for/dismiss the w89 intro, and assert **scene presence** on the left before capturing (e.g. board row count > 0, or the expected heading), not just that a PNG was written. Re-capture the four left board cells. This is a receipt-quality fix, not a product change.

---

### F10 · P3 · `scripts/check-falsifier-anchors.mjs` is cited but is not in the tree

**V.** The anchor-check log (`deliveries/receipts/partH-s15/anchor-check-2026-11-22.log`) says the systematic check was "written for this sitting" and cites `scripts/check-falsifier-anchors.mjs`; `find . -name '*anchor*'` returns only the log. A reader cannot re-run the 18/18 check. The F30/F31 anchors do match at these bytes (I checked both), so the fix is real; the tool is the missing receipt.

**Fix:** ship the script, or amend the log to say it was a scratch tool and include its invocation/output. Low effort; it protects the next falsifier edit.

---

### F11 · P3 · The independent verifier's transcript is not shipped

**R/V.** `deliveries/receipts/partH-s15/verifier-2026-11-23.log` is Z.ai's summary of a fresh general-purpose subagent's read-only run, including its RED line and the resolution. The transcript itself is "retained in the session log" — not in the package. The substance is credible (the RED was a format expectation, not a failed check), but a close-out that claims an independent verifier should ship the verifier's raw output, not only the author's summary.

**Fix:** include the subagent transcript (or a signed summary with the raw command output) under `deliveries/receipts/`. Low.

---

### F12 · P3 · The package is labelled S17 outside, S15 inside; the README title carries the old pin

**V.** The folder is `zai-s17-closeout-2026-11-23`; every internal document (README update, SNAPSHOT, SHELL-STATUS, handover, side-by-side) says **S15 close-out, 2026-11-21**. No S16/S17 document or code is in the folder. The README's first line says "17 Nov 2026 · pin 5c808472 · the re-pinned shell" while SNAPSHOT says the shipped pin is **408410477** (the P-317 re-pin) and the README update says 408410477. A reader two weeks from now cannot tell whether S16/S17 content is missing or whether the folder name is just the handover slot.

**Fix:** add a one-page `PACKAGE-ID.md`: "This is the S15 close-out tree (2026-11-21), packaged 2026-11-22/23; the S17 label is the delivery slot; no S16/S17 code is missing. Engine pin: 408410477." Fix the README title's pin to 408410477 or mark 5c808472 "(historical)". Low, but it is exactly the kind of archaeology the council's naming rules exist to prevent.

---

### F13 · P3 (meta) · The laws are green on the properties they measure; they do not measure the experience

This is the common cause of F1, F2, F3 and F5:

- the top-three law is checked at a **fresh pick 1** (the fix for the tautology) and not at late picks, where the product is worst;
- the 390 law checks document scroll width, not cell width, wrapping, or row height;
- the contrast law checks a fixed token list and **blesses** the AA holes;
- the sort law checks state change, not where the control is or where the user lands;
- the side-by-side checks computed tokens and no-h-scroll, not whether the left board is a board.

The next round should add a small **layout/a11y battery** with the measurements in this review: name column ≥100 px at 390, team `scrollWidth <= clientWidth`, row height ≤120, column x-alignment within 1 px at 1180, top3 === 3 at picks 1/5/13/27, sort reachable in ≤10 tabs, rendered-pair contrast, scene presence on both sides. That is more valuable than another visual-polish pass.

---

## 4 · What is genuinely good (do not lose it in the fixes)

- **The seal and the fence.** 370/0 with a clean converse, 69 engine files byte-identical to `408410477`, and a byte-reproducible `dist/`. This is a package another seat can trust.
- **The build truth.** `engineVersion()` stamps the running engine, the saves panel shows it, and N36/S34 guard it. The S15 WIP's lying envelope is fixed.
- **The one-button decision.** One visible Draft action per row is the right call for a speedrun board; it removes the old quick/draft ambiguity. The staged panel path is still there for the careful user (just label it, F7).
- **The falsifier culture.** The close-out did not hide the S15 WIP's tautologies; it re-homed the probe and made the mutants die by name. F30's anchor is fixed at the bytes. This is the right way to repair a test.
- **The honest handover.** The README records the verifier's RED, the retracted zip sentence, and the stale-pin fix. The package's claims are mostly labelled and checkable.
- **The 390 floor.** No horizontal scroll, zero console errors, and the team/pick flows work on a phone. The board is the one surface that needs a real layout, not a global redo.
- **The side-by-side right side.** The candidate captures at 1180 and 390 are good evidence; the 390 board shot is the most useful screenshot in the package — it shows exactly what to fix.

---

## 5 · What I could not verify (so it stays REPORTED)

- The **shell, slot, and receipt falsifiers** (39 DIED in the package's acceptance run). I ran the board falsifier only (§6).
- A **fresh side-by-side run**; I inspected the shipped captures.
- The **independent verifier's transcript** (F11).
- The **full preflight** (season loop, saves, share) beyond the batteries above.
- The **1,953-player dataset** is not in this shell package; the shell consumes the engine snapshot, so the dataset gate belongs to the Architect's tree. No claim here.

---

## 6 · Falsifier (board) — independent run

`node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` in the pristine copy, at the delivered bytes. Log: `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/cakepanz17-falsify-board.log`.

- **F0-board**: unmutated board battery 24/0 — green baseline. **V**
- **F0-shell**: unmutated shell battery 53/0 — green baseline. **V**
- **F15, F17, F18, F19, F20**: DIED by name (last-pick, new-draft, partial-Complete, uniform-board, suggestion). **V**
- **F21, F22, F23-w14**: DIED by name (roster print, wall-slip cascade, link-beats-autosave). **V**
- **F24**: DIED by name — the no-display-parse mutation (primary re-derived from rendered text, localeCompare) now kills L24. This was a TAUTOLOGY at the S15 WIP bytes; the close-out fixed it. **V**
- **F25, F26**: DIED by name (ring persistence, the w89 pulse). **V**
- **F27, F28, F29**: DIED by name — badge scope, sheen scope, retired classes, now probed on a fresh pick-1 board. **V**
- **F30, F31**: DIED by name — sort-after-restore (stale highlight kept), toast truth. The S15 WIP's `F30 anchor not found` is gone; the anchors match at these bytes. **V**
- **Final**: **16 stages (F15, F17–F31) DIED by name; both baselines green; EXIT 0; zero TAUTOLOGY/COULD-NOT-RUN in this run.** The package's claim of a falsifiable board battery holds. **V**

**Caveat that keeps F1 alive:** F27/F28 die at pick 1, where the board's own `top3` is 4. At pick 13 the product's own `top3` is 36, so the same all-rows mutants would be indistinguishable; the law needs `top3 === 3`, not set equality against a component-derived set, to be falsifiable at the late checkpoints too.

---

## 7 · Recommendation and order

1. **F1 cap** (one function + restored-ring cap + battery oracles) — the highest user-visible win per line. Until the engine's `rawSort`, exactly three.
2. **F2 mobile card + needs collapse + F4 fixed action rail / column alignment** — one BoardRow/NeedsRow/DraftBoard round; this is the difference between a phone board and a phone spreadsheet.
3. **F5 sticky sort/undo/seed toolbar + F6 one Method disclosure** — the board's controls must be reachable without 212 tabs or 3.3 screens of scrolling.
4. **F7/F8 labels and accessible names** — small, testable, high trust.
5. **F3 tokens** — Owner ruling; then a two-line CSS layer and an empty known-hole set.
6. **F9–F12 receipts and package ID** — cheap, and they protect the next review.
7. **rawSort in the engine** (Architect) — the permanent F1 fix; no shell workaround ships beyond the cap.

No engine file is touched by any recommendation here; the fence remains 69/69. The next two seats should confirm F1/F2/F3 before the Architect folds this into the shell round; this file is review **1 of 3**.

---

### Appendix · Reproduce

```
cd /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/cakepanz17-run
node tools/verify-package.mjs .
npm run battery:node
npm run test:engine
npm run battery
npm run battery:board
node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
npm run battery:visual
npm run battery:slot
node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs
node --import ./scripts/node-port-register.mjs scripts/viewport-matrix.mjs
node probe-layout.mjs
node probe-balloon.mjs
node probe-a11y.mjs
node probe-sortpos.mjs
```

Screenshots: `shots/side-by-side/right-s2-board-top3-390x844-light.png` (the phone board), `right-s2-board-top3-1180x950-light.png` (the desktop board), `left-s2-board-top3-1180x950-light.png` (the invalid left reference). Probe shots: `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/cp17-board-390.png`, `cp17-board-1180.png`, `cp17-balloon.png`.
