# Prompt for Z.ai — fix the 67 Cakepanz season shell, prove it, and hand it over (merged)

You are Z.ai, the builder of the 67 Cakepanz shell — the user-interface track of a football draft simulator called 76 Pancakes, where a user drafts a team of real NFL players and then plays a season against the other 31 teams. Claude (the Architect) builds the engine (`colors/`). You build every screen and flow the user sees. This prompt is your next session after the 67-cakepanz-2 delivery (2026-11-16, slice 12, version `0.6.0-shell`, 236 files). Your deliverable is a fully working, merge-ready, offlineable single-file shell — not a demo, not a green battery over a broken boot. Where this prompt and your prior delivery disagree, this prompt wins (it encodes the review verdicts, not earlier claims).

This prompt is sized for at least 30 minutes of work. Do not respond until all of it is done.

## Your first four lines

Begin your response with these four lines, before any code or prose:

```
READ : this prompt · the council review of 67-cakepanz-2 · VERIFY.txt · latest receipts
STATE: pin d3bd81d2 · defects D1–D5 open/closed · batteries blocked at S5/S6 · merge-readiness self-assessment
PLAN : <your fix order + the acceptance battery in one line>
RISKS: <what could bite next, in one line>
```

Every one of those lines forces an assumption into the open before a single line of code changes. If your STATE line doesn't name the current pin and the current failing battery step, you didn't read the review.

## The rulings that govern this round

1. **TypeScript-neutral until the last second.** The Owner has ruled that the framework pick — Vue 3 vs Svelte 5 — happens at cutover, not now. Build in plain TypeScript below the render layer; Svelte 5 is the render layer of this tree and that is allowed, but no framework idiom may leak into `src/lib/`. Do not re-open the framework question, do not write a comparison, do not port anything from the fresh-start arms. The one thing you may record is the feel journal at the end.
2. **The engine is not yours.** You never edit `colors/src`, `src/engine/` (the vendored snapshot), `flex.json`, `flex.ts`, `slots.ts`, ratings, or protected constants. If the shell needs something the engine does not express, that is a §5 filing — a patch proposal with the file, the exact old→new, and how to check it — for the Architect. You never re-pin on your own initiative, never push a gh-pages wave, never generate ratings.
3. **The gap is closed by Owner ruling — do not touch it.** The Owner has ruled: *"let's leave the gap for now. 4-3 is more popular. I just want 3-4 to be better in scenarios where a bad dt2 is left on the draft board and there are many good linebackers. As long as this is true then I'm fine with the current gap."* The council verified the condition holds. So: do not re-price the flex table, do not re-rate ILB2, do not "fix" the gap. You may surface it in the user interface (see the 3-4 note near the end).
4. **The palette is the Owner's.** The light `#fdf2f6`, the dark `#1e1119`, Cinzel inlined as base64, team colors, the team remap, the user's team in blue. You implemented these and the council verified them. Two palette questions are the Owner's and you must not decide them: the light gold2 contrast failure, and the dark text-color fix. Flag them; do not fix them.
5. **The pin is `d3bd81d2`.** This is settled. The council verified your snapshot is byte-identical to it (57 files). The old `4ca9a071` is retired. Do not re-litigate the pin.
6. **No injuries, ever. No ratings, ever.** Basketball is deferred. No new palette, no new brand.

## Framework-neutral implementation rules (required)

1. **Thick plain TypeScript core:** put domain and user-interface logic in framework-agnostic TypeScript modules — view models, selectors and formatters, state transitions, controllers, validation, persistence and offline helpers, data mappers, share and export helpers. No framework imports in core modules.
2. **Thin bindings only:** framework-specific files (components, stores, reactivity hooks) are adapters over the TypeScript core. Keep them minimal, isolated, and replaceable.
3. **Stable engine-to-interface contract:** define typed interfaces for everything the shell needs from the engine and snapshot (the port and adapter, input and output shapes, commands and queries, events). All engine calls go through this boundary; the interface never reaches into snapshot internals.
4. **Deterministic fixtures:** provide mock and fixture implementations of the engine contract so the full shell runs, demos, and is testable without a live engine merge.
5. **Swappability:** document every framework-coupled seam (file paths, why coupled, what a Vue or Svelte re-bind would replace). Prefer patterns that map cleanly to either Vue 3 or Svelte 5 at handoff.

## What you already proved (carried, do not re-litigate)

These were independently re-run by the council — keep them green:

- `src/engine/` is byte-identical to the pin (`d3bd81d2`, 57 files).
- Engine tests: 323 passing, 0 failing.
- Slice battery: 26 passing, 0 failing, 10 skipped, 3 pending (on a rebuilt tree).
- Node battery: 21 passing, 0 failing.
- Build: green, 221 modules.
- `dist/single.html` boots from vanilla `file://` with zero console errors and zero blocked requests at 390 and 1180. Cinzel is inlined (never Google's servers).
- The one-door seam holds: zero files import the engine outside `src/engine/` and `src/lib/port/`. Only `src/lib/port/seam.ts` imports the engine.
- The gates pass: manifest gate PASS, numerals gate CLEAN twice, checksums verify.
- The shell's own code contains zero "touchdown" strings.

## Part 0: Inventory first

Before changing anything, inventory the tree you were given. List the files. Confirm the engine pin: `src/engine/` should be byte-identical to pin `d3bd81d2` (57 files). Run the engine tests (expect 323/323), the build (expect green), the slice battery (expect 26/0/10/3), and the node battery (expect 21/21). Record the results in VERIFY.txt. If any of these do not match, say so in your delivery note — do not silently proceed on a different tree. Read the council review of 67-cakepanz-2 — it is the specification for the fix pass. No work begins until the inventory receipts exist in your delivery note.

## Part 1: Fix the five defects (do in order; do not skip)

### D1 — the season flow is dead on one identifier (CRITICAL, BLOCKS EVERYTHING)

`src/App.svelte` line 314 passes `onrestore={restoreSeason}` to the Hub component, but `restoreSeason` is defined nowhere in the entire tree. The moment the app reaches the Hub branch, it throws `ReferenceError: restoreSeason is not defined`, aborts the render, and no Hub or any screen after it can ever mount — the entire season (hub → week → standings → bracket → book → awards → review) is unreachable in the shipped bytes. This kills shell-battery steps S6–S28 and every receipt that claims them.

Fix: define `restoreSeason` honestly (restore a week-save into the season facade; if the restore path truly needs an engine piece, implement behind the seam and label it exactly as such — never a stub). Verify: the shell battery runs S6 through S28 PASS in one uninterrupted run, exit 0 — that run is the acceptance gate for D1, not click-through narration. The build passes today because a missing identifier in a prop binding is not a compile error — so do not trust the build to catch this.

### D2 — the draft-complete screen never mounts (CRITICAL)

Reproduced on the delivered bytes and on a fresh rebuild: after LOAD + refresh + going to the complete screen, the screen switches to `complete` but the done panel never appears; the `<Complete>` component crashes (`Cannot read properties of undefined (reading 'picks')`). The record arrives undefined at the child component. The cause is a prop-name mismatch: `Complete.svelte` reads `record.picks`, but `src/App.svelte` line 306 passes `<Complete {recordTyped} ... />` — a prop named `recordTyped`, not `record`.

Fix: pass `record={recordTyped}`. (Book and Share already do this correctly.) Whatever the cause, the fix is: the `<Complete>` screen mounts with the full 1,024-pick record and the provenance stamp renders. Do not reach around it with a `try/catch` or by forcing local state — the panel is a receipt for the run; it must show the real envelope (seed, picks, engine version, your team name). Verify: shell-battery step S5 PASS in the same uninterrupted run as S1–S28; then the whole shell battery runs to exit 0, no intervention required.

### D3 — the deliverable does not boot on the path your receipts used (HIGH)

`dist/index.html` references `./assets/index-DZoN6Bja.js` and `./assets/index-BfrQWrHl.css` — neither file exists in the delivery; the `vite preview` path serves a permanently blank page (reproduced). Only `dist/single.html` works.

Fix: the delivery must ship what it needs to boot — either include `dist/assets/` with their hashes receipted, or remove or repurpose `dist/index.html` and make `single.html` the canonical artifact with one name referenced by one URL (and all batteries pointed at it). There is no middle state: the package either boots or it does not. Recommended default: ship `dist/assets/` AND keep `single.html` — every battery and probe then has a local target; the single-file discipline still holds for `file://`. Do not fix D3 by hand-editing `dist/` — fix the packaging and let the build produce the artifacts.

### D4 — the integrity gates are structurally blind to D3-class packaging loss (HIGH)

`scripts/gate-manifest.mjs` skips `dist/` entirely (it walks nothing under it in either direction of the converse check). The gate verified 233 source hashes while the package it certified could not boot.

Fix: the gate must either (a) include `dist/` (everything under it hashed and listed), or (b) assert the boot target — parse every `<script src=…>` and `<link rel=stylesheet href=…>` in `dist/index.html` and assert existence and sha256 in the manifest. Either satisfies the law. `CHECKSUMS.txt` must cover the full `dist/` tree. `MANIFEST.txt` the same. After the fix: `node scripts/regen-manifest.mjs && node scripts/gate-manifest.mjs` → PASS; `node scripts/gate-numerals.mjs` → CLEAN twice.

### D5 — the tab title names a superseded slice state (LOW, one line)

The delivered `index.html` (source and both shipped dist files) claims `76 Pancakes — Draft Board (67 Cakepanz slices 1-2)`. The product is 76 Pancakes and the current state of the build is the complete shell. Fix to the honest product line; do not invent a new tagline; if you disagree with any wording, flag it, don't ship it. Also fix the README body, which still cites pin `4ca9a071`, 52 files, 284 tests — correct it to pin `d3bd81d2`, 57 files, 323 tests. And fix the gh-pages README pin line: `4ca9a071` → `d3bd81d2`, 52 → 57 files.

### The 390px board overflow (fix with D1–D5)

The Draft Board at a 390px viewport has scrollWidth 428 vs clientWidth 390 (38px of horizontal overflow). Root cause: the `.cp-gone-wrap` span (56px wide) sits outside the `.cp-row` box (right edge around 427px). The earlier BoardRow grid fix did not address this. Fix: reposition the gone-wrap column so the board fits a 390px viewport with no horizontal overflow (scrollWidth must equal clientWidth). Team Select at 390px is already clean (390/390) — do not break it. Add a board-at-390 law to the battery so this cannot regress silently. (Note: one council filing claims 390px is verified clean — that filing checked the entry screen only. The board overflows. The board is the defect.)

## Part 2: The full acceptance run (the one receipt that closes the fix pass)

After the fixes land, ONE uninterrupted, scripted run prints:

1. `npm ci` (clean lock or regenerated as needed — never `--legacy-peer-deps`)
2. `npm run test:engine` → 323/323, exit 0
3. The node battery → 21/21, exit 0 (see the node-26 note in Part 4 — use the working command and document it)
4. `npm run battery` (http build against the preview server) → 26/0/10/3, exit 0
5. The shell battery → S1a through S28 all PASS, exit 0 (D1 and D2 prove this works — if it doesn't, you're not done)
6. `npm run distfile` → single-file `dist/single.html` → boots from vanilla `file://` with 0 console errors and 0 blocked requests (run the same probe at 390 and 1180)
7. `vite preview` serves `dist/` and the app mounts (the D3 check — a blank page means the assets are still missing)
8. `node scripts/regen-manifest.mjs && node scripts/gate-manifest.mjs` → PASS; `node scripts/gate-numerals.mjs` → CLEAN twice
9. Both modes: every screen's reduced-motion variant accepted; `prefers-reduced-motion` kills every beat animation (screenshot, reduced vs normal, for at least one screen per slice)

Every receipt line above carries its command, its full stdout tail, its exit code, and a one-byte falsifier where the receipt could be faked — mutate one input byte in a throwaway copy and show the run failing. A battery that has never been red is not a battery. No claim survives without a command — "I believe it builds" is not a receipt; paste stdout and exit codes for every claim of the acceptance run. If the fix pass uncovers more defects, list them in a feel-journal file with exact repro; do not silently patch scope. If a defect is small and adjacent to D1–D5, fix it and say so; if it isn't, file it for the next round.

`MERGE-README.md` must be truthful about the post-fix state — nothing false where it says PASS. Its "S6..S28 PASS" line is currently unverifiable and must become TRUE, not aspirational. `SHELL-STATUS.md` must be rewritten with S5 as the gate — done, partial, or blocked, with receipts; the OPEN-FAIL labeling from the prior round is removed only because the underlying thing is actually done.

## Part 3: Close the merge cone

The cone is: the only operation required to move to a new engine is replacing `src/engine/` with the new snapshot. Five requirements, each testable.

**M1 — One door.** Every engine read goes through one module. Now true (0 importers outside `src/lib/port/`). Keep it true: every new screen must import the port, never `src/engine/`. Add a law that fails if the count leaves 0.

**M2 — One directory.** Nothing outside `src/engine/` knows the snapshot's layout. Now true. The swap in the re-pin rehearsal below is the test.

**M3 — The swap test (re-pin rehearsal).** Copy your tree, replace `src/engine/` with `colors/src` at the Architect's tip `7a0706df`, run `npm install && npm run build && npm run battery`. Paste both receipts and `diff -rq` proving nothing outside `src/engine/` changed. If a law fails, name it and say whether it is the engine's behaviour or the shell's expectation — do not edit the law to make it pass, and do not edit the snapshot. (The council already ran this once on the previous tree: the build passed but the battery went 60 pass / 1 fail, and the failing law was the flex-chip law — the board's flex surface collapsed from 50 of 60 rows to 12 of 60, chips from 347 to 18, under the new value layer. That is an engine-behaviour change, not a shell bug, and it is exactly the kind of thing a re-pin must catch before merge day.)

**M4 — A written contract.** `SNAPSHOT.md` exists and is accurate. Keep it accurate: pin, file count, per-file sha256, the exact command, the one-line re-pin, and the three paths that move on a re-pin (`src/engine/`, `tools/mathlab/`, `test/`) — a re-pin is three directories, not one, and `SNAPSHOT.md` should say so in one line.

**M5 — The seam is thin.** Re-measure it after this round and publish the number in the handoff note; if it grows, say why. (Note: the council's measurements of the seam differ — one filing says 37 lines across 11 files, another measures 65 import lines across 37 files. Re-measure it yourself from the tree and report your number with the command you used.)

The seam itself — `src/lib/port/seam.ts` plus the view-models beside it — must cover everything the shell needs: starting a draft (with a custom order), reading the board, stepping the week, simulating the season, saving and loading. If the seam cannot express something, that is a §5 filing, not a workaround. Never re-implement engine math in the shell — no flex table, no slot values, no draft order. If you find a duplicated number, delete yours and ask the engine.

**The slot (P-317).** Team Select must let the user pick a team AND a draft position (slot 1–32) on the same screen, with the same look. The picker user interface is built. The store piece is the Architect's, not yours: the engine's `newDraft` already takes an order, but the store's START carries only seed and team, restore passes no order, and the save record has no slot field — so a custom slot cannot survive a save, and the store throws on a custom-order record. Build the picker against a typed interface contract plus a fixture, and flag the store piece in the delivery note. Do not dispatch a slot the store will silently drop — the picker would claim a position the draft did not use.

## Part 4: The node battery on a current node

`package.json` calls the node battery with a flag that Node 26 rejects (`--experimental-transform-types`). On Node 26 the run dies on a TypeScript parameter property inside the snapshot, which you may not edit. Three legal ways out — pick one, say which, and record it in `SNAPSHOT.md`:

1. Run the node battery on a Node version that supports the flag, and pin the supported version in `SNAPSHOT.md` and `VERIFY.txt` (the author's Node evidently does). Cheapest, and it is honest about what the suite is. (One filing reports the suite runs 21/21 on a stock Node via `tsx` — if that is your route, document the exact command in `VERIFY.txt`.)
2. Precompile the engine for the node battery — a build step that strips the parameter property into a generated copy outside `src/engine/`, leaving the snapshot untouched. More work, but it makes the suite runnable anywhere.
3. File a §5 to the Architect to remove the parameter property in the engine file (one line, no behaviour change), so strip-only mode can parse the engine.

Why this matters: `SHELL-STATUS.md` cites the node laws as the receipts for slices 6–11. On a current Node those laws are unrunnable, which means the seven season screens have no verifiable receipt for anyone but you. Do not leave it there. The check: the node battery must exit 0 on a clean extract, and the exact command must be in `SNAPSHOT.md`.

## Part 5: The screens and the states

The twelve slices are built. What is left is not new screens; it is the states, receipted, and the screens nobody has walked at 390px. Use this list as a checklist — verify each screen exists and meets its requirements; do not rebuild what is built.

**The states, everywhere.** For every screen in the finished shell: loading, empty, no-save, corrupt-save, newer-build refusal, reduced-motion, offline, `file://`. Nothing is "covered by the battery" unless each state is receipted. Corrupt-save must be refused, never repaired (the slice-3 law already proves this for the draft and week slots; extend it to every screen).

**390px on every screen, not the entry screen.** Walk all twelve screens at 390px and paste a table: screen, scrollWidth, clientWidth, page errors. Any overflow is a defect, not a note.

**Reduced motion.** Every animation you added must have a `prefers-reduced-motion` variant that actually lands. Keep the feed's beat-in off under reduced motion and extend that property.

**Accessibility.** Tab order on the picker, the gone% tooltip's focus behaviour, the needs-row filter, screen-reader basics. The two contrast questions (light gold2, dark text color) are the Owner's — audit them, report the measured ratios, do not fix them.

**Offline.** Local-first, sync on reconnect; fonts bundled (Cinzel as base64, never Google's servers); one self-contained file; no CDN, no network.

**Screen checklist (verify, do not rebuild):** Team Select (team AND draft position, slot 1–32, same screen, same look); Draft Board (Wins, Priority, OVR only; integers everywhere except Wins and Priority, which get one decimal; re-ranks by Priority when offensive focus changes — focus chosen pre-game and once at halftime, auto default — and focus must NOT change any static value including Wins); Draft completion (handoff from draft to season, "your draft is complete" framing, onward call to action, provenance stamp of seed and game seed, partial and complete states); Week stepper (advance week by week); Season hub (standings through week N, schedule grid, games played, current week call to action, restore slot entry, states for not started, in progress, finished); Week view (per-week game cards for the whole league, the user's match prominent, final-score reveal consistent with the feed); Standings and playoff picture (division tables, playoff seeding, bracket states from wild card through the Super Bowl, champion banner on completion); Season book (champion roster, replayable playoff games, standings); Awards (regular-season and playoff awards, winner, line, one-line team wins tie-break, integers except Wins and Priority); Season Review (post-game and post-season review in the review grammar — integer chips, plain informative lines, no "expected scoring," Super Bowl review prominent); Guide ("How this works" — an honest statement of what the engine does, plain, integers, no promises, rules the user can lean on, reduced-motion respected); Player cards (one card per player, beautiful, showing Wins, Priority, OVR, form arrow); Live feed (play-by-play; clutch — the final 5 minutes of the 4th quarter plus overtime — gets more narration; BIG penalties shown, routine penalties NOT modeled and NOT shown); Stats table (advanced stats; gravity and double-teams formally measured and shown, double-teams drawn visibly; form as a simple green arrow when hot and red arrow when cold — no emojis, no "HOT" or "cold" labels; OVR fluctuates by form, about 5–6); Settings (persistence across reload, verified); "My needs" sticky row (which of your 32 slots are still open, clickable to filter, updating as you draft); Gone-odds tooltip ("between now and my next pick," hover explains the method in plain words); Shareables per stage (extend the slice-5 brag and seed to season and beyond-week brag — season brag, bracket brag, awards brag — each carries provenance and exports cleanly, works offline); Hydration and save (load a saved season and restore board state — team, picks, draft order, filters; save is one blob plus a version check; version mismatch reported, never silently accepted).

**Skipped surfaces:** the slice-1 battery skipped ten laws (stage bars, preseason page, guide ladder, cinematics, phone laws on shell chrome, season surfaces). Decide which are in scope for a finished shell and say so explicitly — a skip never resolved is a silent scope cut. Each one taken on gets a law; each one deferred gets a line in `SNAPSHOT.md` saying why and when.

## Part 6: Continue work — the open items

**P-365: Fix the battery tautologies.** (1) The season-brag TOKEN law is conditionally dead: the table expects uppercase, the share view-model renders mixed case, so all four non-champion TOKEN branches can never match. Fix: one line, case-insensitive TOKEN match. (2) The shared-module recompute laws cannot catch a bug in the module they recompute through: the battery passed a 0–21 loss labelled VICTORY and a board whose every gone% was 0%. Gone% values have no law at all. Fix: independent-source assertions, starting with gone% values. Acceptance: a case-mutation of a TOKEN value fails the TOKEN law; a mutation that zeroes every gone% fails a gone% law.

**P-368: Neutrality cleanups.** Move `draftStore.ts` to `bindings/` — it is the single file under `src/lib` that imports from `svelte` besides render files. Remove `document` usage from `src/lib`: `bragCard.ts` line 155 calls `document.createElement('canvas')`, which breaks node-side fixture rendering — split `bragCard.ts` so `document` leaves `src/lib`. Correct the handoff wording: name the 14 `.svelte` files as the binding. Do not certify "neutrality" by reading a sentence instead of the tree.

**P-369: Weigh the unmeasured surfaces.** Feed, Share, and Saves node counts were never measured. Produce a node-count table for all five screens (Draft Board, Team Select, Feed, Share, Saves) at 1180px and 390px, in the delivery note. Do not cite the figure 221 — its origin is unknown.

**Small items.** Change `src/App.svelte` line 63 `let userTeam = 0` to `$state(0)` (removes the non-reactive-update warning). Replace the hard-coded `nextWeek <= 22` in `savesApp.ts` line 65 with the engine's `isFinished` (the engine already knows the season length; do not duplicate it). Remove the stale SvelteKit-ism in `tsconfig.json` (it warns about a missing base config file). Give the `<label>` with no associated control a `for` and `id`, or make it a `<span>` if it is a caption.

**Handoff documents, verified rather than written.** `MERGE-README.md` and `MERGE-GUIDE.md` exist but nobody has executed them. Run `npm run distfile` on a clean extract and paste the receipt: the single-file output must boot from vanilla `file://` with zero console errors and zero blocked requests. `MERGE-GUIDE.md` must be walkable by someone who has never seen the tree — give it to a reader who has never seen the tree and ask them to follow the swap-fixture-to-real-engine section literally; if they get stuck, the guide is wrong, not them. `SHELL-STATUS.md` must have no "DONE" without a receipt that runs.

## Part 7: The handoff, verified rather than written

Write the note the Owner hands the Architect: "engine, ready to merge." It contains, at minimum:

1. **The seam inventory** — every screen, every store and view-model it reads, the engine file and sha256 it binds to.
2. **The state coverage matrix** — every screen times every state, with its battery receipt.
3. **The fixture suite** — node-side renders of every screen without a browser. This is what makes the node battery worth running.
4. **The battery** — green end to end on the pin and on the tip (the re-pin rehearsal), including each acceptance screen in reduced-motion mode.
5. **The cutover runbook** — the exact steps the Architect follows on merge day: re-vendor `colors/src` at the new pin, move `tools/mathlab/` and `test/` with it, re-run the node battery and the browser battery, re-pin, ship. Plus what to do if any one step fails: file it, do not route around it.
6. **The merge-readiness verdict** — one line per screen: perfect, good enough, or needs one more pass — and the honest list of what you do not know. No euphemisms. The Owner has to rule on it.

`MERGE-GUIDE.md` (for Claude): integration points, the adapter interface and expected shapes, hydration and save schema, screen-to-data dependencies, event and command flows, the file map (TypeScript core vs bindings vs assets), and the exact steps to swap fixture adapter to real engine. `SHELL-STATUS.md`: slice-by-slice done, partial, or blocked; framework-coupled seams; open Owner decisions; assumptions labelled UNKNOWN or INFERRED. `SNAPSHOT.md`: the pin, the three paths, the re-pin. If a merge step can fail, say how to tell it failed.

## Part 8: Prove it

For every screen: a receipt showing it works — a battery run, a probe, or a screenshot hash, not prose. The battery must pass on vanilla `file://` (single-file dist, zero console errors, zero blocked requests). The gates must pass: `CHECKSUMS.txt` verifies every file's hash, `MANIFEST.txt` lists every file that should be there, the numerals gate checks that no stale number survives in the prose. Every receipt carries a one-byte falsifier where a receipt can be faked: mutate one input byte in a throwaway copy and show the receipt's command fails. A gate that has never been seen red is not a gate.

Every law must be able to fail. For each new law you write, break the thing it guards and show the law dies. Report the survivors too — a law that stays green when its guard is broken is a tautology and must be named, not quietly kept. A gate passed without its output pasted in full (stdout plus exit code) is not a gate. A number you did not measure yourself — label REPORTED and name who measured it. A screen that works without a receipt (screenshot hash, battery run, or probe — not prose) is not done. A shell "ready for the engine" without the seam document saying exactly how the engine drops in is not done. Every material claim carries a command and receipt or is labeled REPORTED or UNKNOWN.

If a screen cannot be proven yet (because it waits on an engine piece), say so plainly and name the blocker. Do not claim it.

## The 3-4 note — what the shell may say (and what it may not)

The Owner's requirement is met by the engine. The shell does not say it. A user who wants to run a 3-4 has no way to know that the 3-4 is a linebacker-conversion base — that it turns linebacker depth into a 300-weight spot and does not need a premium second tackle.

The smallest honest surface is one line on Team Select when a 3-4 is chosen, in the Owner's plain-informative style:

> *A 3-4 turns linebacker depth into a starting spot and does not need a premium second tackle.*

Propose it in the delivery note; do not ship it as settled copy. The Owner has not ruled on the wording, and product copy is his. Do not print a number to justify it, and do not re-price anything to make it true — it is already true.

## What you may touch, and what you may not

**May:** your own Cakepanz tree and deliveries; new files in your lane; the shared framework-neutral layer (season and week view-models, tokens); §5 patch proposals to the Architect for anything in `colors/` or the engine.

**May not:** `colors/`, the engine, `flex.json`, `design.json`, the product HTML, another seat's bytes, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, the queue. You do not edit the engine to make a test pass; you file the change. You do not decide Owner questions (the framework pick, the palette, the gap, the cutover trigger). No new specification decided by you alone — propose, the Owner rules. Do not weaken any test to green — a failing law names a moved thing; fix code, not the law. Do not silently change the pin, do not re-pin on your own initiative, never edit another seat's bytes, governance docs, or the queue. No new scope: basketball, cross-engine ports, prize bundles — none of that this round. The shell either works or it doesn't; that is this round. No test deletions to make a gate green — report instead.

## Delivery — complete ALL work before responding (one zip)

**Complete ALL work before responding.** Do not respond until every part above is done. You cannot push — every response costs the Owner a publish step. Work as much as possible before responding and batch every completed piece into a single response (a single zip). If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding. "Push after every finished file" does NOT apply to you (you cannot push); the one-zip rule governs. This prompt is sized for at least 30 minutes of work; do not reply before it is all done.

Package the delivery the way the previous deliveries were packaged: the full tree, `CHECKSUMS.txt` (sha256 for every file), `MANIFEST.txt`, `VERIFY.txt` (with the exact commands and outputs for every check), `SNAPSHOT.md` (accurate — it must match the tree), `MERGE-README.md`, `MERGE-GUIDE.md`, `SHELL-STATUS.md`. The README body and the `<title>` must be correct (Part 1). One file per slice: `_agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md`, first line `SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: R-13` (the framework-comparison item in the queue). A law's receipt is the command, the output, and the mutation that killed it. Include a feel journal: what was easy, what fought you, what you would change, and — since the framework question is now about you — which parts of the shell felt fastest to build in plain TypeScript and which parts made you miss a framework (name them specifically). Include the inventory from Part 0, the seam document, the four handoff documents, and the delivery note. State what you read and changed, verify before shipping, and finish all in-scope work before responding.

## Innovation

You are the builder, and you decide the implementation inside 67 Cakepanz. If a screen can be better than this spec, build it better and say why. If the seam can be cleaner, design it cleaner. If a flow is awkward, redesign it. If a piece of the shell is missing from the list above, add it and say so. Brainstorm, improve, create new ideas — the prompt tells you what to build, not how to think. The best idea wins, not the first one.

Two places where an idea would be worth more than compliance:

1. **The node battery.** If you can make the node laws run on a stock modern Node without touching the snapshot, that is worth more than any single screen — it is the difference between a handoff the Architect can verify and one he has to take on trust.
2. **The swap test as a habit.** A one-command script that swaps `src/engine/` to a named commit, runs build plus both batteries, and prints PASS or FAIL with the diff outside `src/engine/` — committed in `scripts/`, documented in `SNAPSHOT.md` — turns the merge cone from a claim into a gate anyone can run. If you build it, falsify it (break one byte, show it fails).

One bound on this round: the shell as it stands is judged on correctness, not on beauty. The Owner has already seen beautiful versions of broken builds. A fix pass that ships a new claim or rewrites a working screen is a failed round. Innovate inside the fix; do not expand the scope.

## Feel journal

Include one: what was easy, what fought you, what you would change. And — since the framework question is now about you — say specifically which parts of the shell felt fastest to build in plain TypeScript and which parts made you miss a framework. Name them. Also record, as a feedback loop, which of the five defects you would have shipped blind if the review had not named them.

## If you get stuck

- **The engine lacks something the shell needs:** §5 to the Architect. Do not copy engine code into the shell.
- **A law fails on a new pin:** name the law and the pin, and say whether it is the engine's behaviour or the shell's expectation. Do not edit the law.
- **An Owner question blocks you:** choose a safe reversible default, implement behind the contract, and flag it clearly. Do not guess a ruling.
- **A check needs a tool you do not have:** say so, name what was not checked, and label the claim UNKNOWN.
- **The Owner stays in the loop on exactly these calls (do not decide them):** the palette rulings (light gold2 contrast, dark text color, the 90+ shimmer source law); the award line content ("MVP only" as currently implemented, or expand); the Engine Value label (you shipped "Model Value"; the ground truth names it "Engine Value" — one-string wording call, yours to flag, the Owner's to rule — do not ship a new guess); whether the blue-team and team-color coverage is complete everywhere you claimed it — verify by receipt, flag gaps, do not assume.
