SPEAKER: muse | ROLE: council | TASK: cakepanz shell assist part 5 — missing pieces and UX improvements | DATE: 20261116-2103
FOR: P-070

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 5 — Propose what is missing, and improve the UX (FOR: P-070)

**What this file unblocks:** Z.ai's next slices (season, guide, import) and the shell's growth into a platform without a rebuild. **Exact artifact:** this filing — each item names the screen/flow/copy, the change, and why. **How to verify/apply:** every VERIFIED claim cites the file and line (or the grep) in the s5 delivery (`_agents/inkling/deliveries/67-cakepanz-s5/` on `origin/council/inkling`); INFERRED items are labelled as reasoning, not measurements. No live-browser check was run (standing boundary) — anything about how a screen *renders* at 390 px is UNKNOWN and labelled so.

**Ground rules I applied:** propose, don't build; no framework-specific code; no palette change; no ratings work; the user sees only Wins, Priority, OVR; valuation label travels with the numbers; offline-first; file:// boot.

## A. Missing flows (the shell cannot do these at all today)

### A1. Dataset import — the empty state's dead promise (highest visibility)

**Screen:** the empty state in `src/App.svelte` (`$boot.phase === 'empty'`). **VERIFIED:** the copy says "Import a dataset CSV to begin — or open a dev build with `?dev=1`" and "The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent)." A grep over `src/` finds **no `<input type="file">` anywhere** — there is no import UI at all. The only way in is the dev build, which the copy itself labels DEV.

**Change:** add a file picker to the empty state (three file inputs, or one picker that takes the three CSVs: ratings, free agents, player IDs — the same three `?raw` imports `boot_()` already reads). On choose: read as text, call the existing `buildPool(ratings, fa, ids)`, boot to Team Select on success. On failure: refuse verbatim — show the parse error and the expected 8-column shape, keep the empty state, never boot a half-loaded pool. Ship a downloadable template CSV (one row, the 8 headers) next to the picker so a user is not guessing the format from a sentence.

**Why:** this is the first screen a new user sees, and its only action is a link to a dev build. The Owner's ruling is that the public default is empty-state + import; today the import half does not exist. It is also the cheapest missing flow: `buildPool` already takes raw strings, so the whole slice is UI + error copy, no engine work.

### A2. No way back: board → Team Select (restart / change team or slot)

**Screen/flow:** `src/App.svelte` — the `Screen` union is `'team' | 'board' | 'saves' | 'feed' | 'share'`. **VERIFIED:** the only assignment back to `'team'` is in `boot_()` (`screen = 'team'` at dev boot). The top bar has one button (Saves) and the feed has `← BOARD`. Once a draft starts there is no "change team," no "restart draft," no "quit to Team Select" anywhere in the UI. The only path is reloading the page, which abandons an unsaved draft without asking.

**Change:** add a top-bar "New draft" action (next to Saves) that (a) if the draft has picks and no save in any slot, asks once — "Start over? Your unsaved picks will be lost. [Save first] [Discard]" — and (b) returns to Team Select with valuation unlocked (today `valuation.lock()` at START never unlocks; a new draft must unlock it or the mode switch stays dead for the session — VERIFIED, `valuation.ts` has `lock()` and no `unlock()`). When P-317 lands, this is also the path that lets a user change their slot: same screen, same look, new choice.

**Why:** a draft is 32 rounds; a user who mis-taps their team at the start currently has no recovery inside the product. Every flow needs its reverse, and this one has none.

### A3. The season dead-ends at week 1

**Screen/flow:** `src/App.svelte` `playWeek()` → `Feed`, and `Feed.svelte`'s only exit is `← BOARD`. **VERIFIED:** the feed renders one game (`feedVM`, week 1, `FEED_YEAR = 2027` hardcoded in `feedVM.ts`), and the Saves panel's hydrated week/season card says "the season screens ride a later slice" (`Saves.svelte`). There is no "Play week 2," no "Begin season," no standings, no roster view after the draft, no awards, no Super Bowl review.

**Change (sequenced, smallest first):** (1) a season hub screen that the feed's `← BOARD` becomes — actually: keep the feed, but give it a next step: after week 1, "Continue to week 2" (engine path already exists: `startSeason` / `playWeek` in `engine/seasonrun.ts`; the Saves panel already hydrates week saves). (2) A standings table screen (the engine's `table()` in `seasonrun.ts` — the data is one call away; the UI is a table, nothing more). (3) A roster/lineup screen: today the only post-draft roster view is the `LineupAdvice` strip in `App.svelte` (a list of slot → name → OVR). A drafted team deserves a full roster screen — 32 slots, filled or open, with the flex cost of each placement shown the same way the SlotPicker shows it.

**Why:** the product's promise is "draft, then play a season." Today it is "draft, then play one game, then go back to the board." The season is the product; week 1 is a demo of it. Note the dependency filed in my Part 4 (B3): the season slice must first settle whether the feed's week-1 derivation and the season run's week-1 game agree — build the hub on the season path, not on a second derivation.

### A4. No Guide / "How this works" screen

**VERIFIED by listing:** `src/lib/screens/` contains exactly `Feed.svelte`, `Share.svelte`, `TeamSelect.svelte`. There is no Guide screen, and no top-bar link to one. The prompt's style laws reference "the Guide" ("2-Pt Conv except in the Guide") as if it existed.

**Change:** a Guide screen (top-bar link, reachable from every screen) that says, in plain informative language: what Wins / Priority / OVR mean (one line each, with the valuation label — the label travels with the numbers, so the Guide must show the current mode); how the draft works (32 rounds, snake, CPU picks between your turns); what gone% means (the method tooltip's text, reused verbatim — one source, two surfaces); what a flex cost is and that trying a weird flex is allowed; what the seed is and what replays; what a save slot holds. Keep it to one screen, no sub-pages. Every sentence it contains must pass the style laws (no "expected scoring," every turnover named, "2-Pt Conv" inside the Guide is the exception that proves the rule — use it there).

**Why:** a new user meets three unexplained numbers, a percentage, and flex chips with minus signs. The tooltip explains gone% only on hover, only on the board. The Guide is where the product teaches once, so no screen has to teach twice.

### A5. Save slots are anonymous and overwrite silently

**Screen:** `src/lib/components/Saves.svelte`. **VERIFIED:** three slots A/B/C; `save(slot)` calls `saveDraftSlot` and refreshes, with no confirmation and no name — the panel shows kind, revision, picks, team, saved time. Overwriting a slot with 20 picks in it takes one click and asks nothing.

**Change:** (1) overwriting a non-empty slot asks once ("Slot B already holds a draft — Chicago Bears, 20 picks, saved … — replace it?"). (2) Let the user name a save at write time — a short label ("Bears 20-0 run") stored *outside* the envelope (the envelope is the engine's contract; a label is app metadata — keep it in a local sidecar key, `sim:nfl:slot:<S>:label`, never inside the payload). (3) A delete action per slot (clears the key, asks once). Show the label in the panel, the brag card's proof stays engine-only.

**Why:** slots are the user's only persistence, and today they are three identical letters. A user with two seasons cannot tell them apart, and one mis-tap destroys one. Naming is also the cheapest platform prep in this file (see §C): named saves are what a league list and an account's save list both render.

## B. Awkward as it stands (built, but the flow fights the user)

### B1. "20 picks" vs "0 of 32 starters" — the count that confuses

**VERIFIED via REPORTED:** the s5 README's own finding 2 — the saves panel shows the whole league log count ("20 picks" at the user's first turn, because the envelope's record carries every pick, CPU and user) next to the board footer's "0 of 32 starters" (the user's fills only). **Change:** split the label in the panel: "your 0 picks · 20 picks made" (a pure formatting change — see Asset A4 in my Part 15 file: count `record.picks.filter(k => k.team === userTeam)` for the user's half). Same for the save summary line. **Why:** two numbers that sound like the same thing and disagree by 20 is the kind of thing a user reports as a bug. It is also the only place the shell shows a number whose meaning needs a README footnote.

### B2. The board never says "you pick again in N picks"

**VERIFIED:** `goneOdds` returns `picksBetween` (the tooltip shows it — `oddsMeta` in `App.svelte`, method text in `BoardRow.svelte`), and the board header (`BoardHeader.svelte`, via `draftBoard.ts` `BoardHeaderVM`) shows round / pick-in-round / overall / on-clock. But the persistent, glanceable fact a drafter wants between turns — *how long until I pick again* — lives only inside a hover tooltip.

**Change:** a countdown chip in the board header, next to the on-clock line: "You pick again in 7 picks (Round 3, Pick 12)" — computed from the same `picksBetween` the tooltip already carries (Asset A3 in my Part 15 file derives it from `st.order` / `st.pos`, no new engine call). When it is the user's turn it reads "You're on the clock." **Why:** the draft is 32 rounds of waiting between your picks; the shell already computes the answer and hides it behind a hover. (Also a 390 px note: the chip must be one short line — see B5.)

### B3. Builder copy leaks into user-facing text

Two instances, both VERIFIED by reading the files: (1) the feed footer (`Feed.svelte`): "drives and scores read off the engine's own game; the feed adds nothing (yards ride a later engine field — none is faked)" — a user does not need to know about a later engine field; the honest user-facing line is "Plays and time only — no yard figures are shown." (2) The hydrated card (`Saves.svelte`): "the table, seeding and champion were RE-DERIVED by the engine (trusted: ratings, roster, scores, plan)" — the trusted/re-derived split is real and worth showing (the s5 README calls it the card "naming its own epistemology"), but the words are the engine's, not the user's: "Checked against your save: table, seeding and champion recomputed; your roster, scores and plan kept as saved." Keep the distinction, translate the vocabulary. **Why:** the shell's voice should be plain and informative everywhere, not only in recaps.

### B4. The needs row will eat a 390 px screen

**VERIFIED:** `NeedsRow.svelte` renders all open slots as pills in a wrapping flex row, `position: sticky; top: 0` — at the start of a draft that is 32 pills plus OFF/DEF/ST labels. On a 980 px root it is one or two lines; on a 390 px viewport it is five-plus lines of sticky chrome that never scrolls away (render at 390 px itself is UNKNOWN — no live-browser check was run — but the pill count is a fact, not a rendering claim). **Change:** at narrow widths collapse the row to a summary line ("MY NEEDS · 24 OPEN — Offense 9 · Defense 12 · ST 3") that expands on tap, and keep the sticky behaviour only for the collapsed line. The filter itself is good — the README's own finding is that it honours flex routes by construction — so preserve the behaviour exactly and change only the chrome. **Why:** the needs row is the best chrome in slice 3; on the phone (the width the Owner tests at) it risks becoming the thing you scroll past forever.

### B5. CPU picks happen instantly and silently

**VERIFIED:** `store.ts` `advance()` runs synchronously inside `dispatch` — after the user's pick, every CPU pick up to the user's next turn is applied in the same dispatch, and the board simply re-renders with the log longer. There is no visible "CPU is picking" state, no per-pick animation, no way to see *who* just took *whom*. The board footer counts "overall X of 1024," but the picks that happened between the user's turns are invisible except as a longer log.

**Change:** after the user's pick, show a one-line "since your last pick" summary above the board — "Since your pick: 11 picks — the Chiefs took …" — derived from the pick log the store already returns (the log is the record; diffing `record.picks.length` before/after the dispatch gives the slice). Keep it to the last inter-turn burst, one line, dismissible. Do not add fake delays or a fake "CPU thinking" animation — the engine is fast and the shell should not pretend otherwise. **Why:** the draft's drama is watching other teams take your guys. Today the shell skips the drama and shows the aftermath.

### B6. The valuation switch disappears mid-draft without saying why

**VERIFIED:** `valuation.lock()` is called at START and on LOAD (`App.svelte`); `ModeSwitch` presumably disables (the lock is the mechanism; the switch's disabled rendering is INFERRED from the lock existing, not verified by reading `ModeSwitch.svelte` this round — flagging that as INFERRED). **Change:** when locked, the switch should say why in place: "Model Value — locked during this draft (changing the basis mid-draft would re-rank the board under you)." One line, next to the switch. **Why:** a control that silently stops working reads as broken. The lock is the right rule; the silence is the bug.

## C. The platform future — what to make easy NOW so growth is not a rebuild

The shell is the face of a product that will grow into online leagues, a second sport, and a design-your-own-simulation platform. Three cheap structural choices now, none of them a rewrite:

### C1. Treat sport as data, not as the app

Today the NFL is baked into file paths and imports: `src/engine/sports/nfl/...`, `src/lib/feedVM.ts` importing `TEAMS` from the NFL league module, `sportKey('nfl', …)` in `savesApp.ts`. **Change (a proposal, not a refactor):** define one plain-TypeScript `SportDef` shape (Asset A5 in my Part 15 file) — `{ sportKey, teams, slots, positions, datasetColumns, screens }` — and let each screen take its `SportDef` as an argument instead of importing the NFL modules directly. Basketball later is then a second `SportDef` (its own teams/slots/dataset), not a second app. The engine already namespaces by sport (`core/keys.ts` `sportKey`, `sports/nfl/…`); the shell should mirror that namespace instead of hard-coding `nfl` at every call site. Do not build the basketball `SportDef` now — define the *shape* now, so the NFL one is the first instance of it.

### C2. The envelope is the league — keep it that way

The envelope (`SaveMeta`: saveId, saveRevision, createdAt, engineVersion, dataVersion) is already the portable unit: self-contained plain JSON, one parser (`restore`), corrupt-never-repair. For online leagues, the only missing provenance is a device dimension: two devices revising the same saveId concurrently would collide on `saveRevision` (REPORTED — slice-5 README's own goals check names this, and proposes `deviceId` in the envelope meta at the next schema touch). **Change:** at the next schema touch — and only then — add `deviceId` to the envelope meta, and keep `savedAt` as client clock until a server timestamp exists. Do not smuggle either into a UI slice. **Why this matters now:** every screen that renders a save renders it from the envelope; if the envelope stays the unit, leagues are a sync layer behind the `StorageModule` seam, not a rewrite of every screen.

### C3. Screens as a registry, not a switch

`App.svelte`'s `Screen` union (`'team' | 'board' | 'saves' | 'feed' | 'share'`) plus a chain of `{#if}` blocks is fine for five screens and will not survive fifteen (season hub, standings, bracket, awards, review, guide, league list, sport picker). **Change:** a small screen registry — a table of `{ id, title, component, needs: 'draft' | 'season' | 'none' }` — so adding a screen is adding a row, and the top bar renders from the registry (which screens are reachable in this state) instead of hand-written `{#if}`s. The Architect's `appstate.ts` already has the fuller `Screen` union (`teamSelect | draft | season | standings | playoffs | summary` — VERIFIED at pin `d3bd81d2`); the shell's registry should converge on that list at merge time, not invent a second one. **Why:** the next three slices (season hub, standings, guide) each add a screen; a registry makes the fourth one trivial and makes "which screens exist in this state" a checkable table instead of folklore in `App.svelte`.

### C4. Name things the way the platform will need them named

Saves get user labels (§A5); the seed card already proves replay from `(seed, year, run)`; the brag card already carries the proof block. The one naming gap: the shell calls the user's thing "a draft" or "a season" interchangeably in copy (the Saves panel's "Load draft" vs "Load week" is right; the share screen's "the brag card needs a real save" is vague). **Change:** one vocabulary, everywhere: a *run* is a seed + a team + everything after it; a *save* is a run at a point in time, in a slot. Use those two words and no others for the concept. **Why:** leagues are lists of runs; a design-your-own-sim platform is lists of runs with different sports and rules. If the words are already stable, the UI copy for leagues writes itself.

## D. What I would NOT change

- **The needs filter's flex behaviour.** Filtering on `slotId ∪ alsoFits` (VERIFIED, `DraftBoard.svelte`) is the Owner's "let the user try the weird flex" made concrete. Do not "simplify" it to primary slots only.
- **The method tooltip's numbers.** The tooltip carries the engine's actual `picksBetween`/`sims` (VERIFIED, `BoardRow.svelte` + `App.svelte` `oddsMeta`). Do not replace it with a static explainer.
- **Corrupt-never-repair.** The Saves panel showing the refusal verbatim is the product's trust model. No "fix it for me" button, ever.
- **The feed's w88 anatomy.** Badge format, colors, team inks — the Owner's verbatim direction. My proposals add chrome *around* it (countdown, since-your-pick line), never inside it.

## Summary (ranked by value per effort)

1. **Dataset import** (A1) — the only first-screen flow that does not exist; UI-only, engine-ready.
2. **Way back to Team Select** (A2) — every flow needs its reverse; also the P-317 slot-change path.
3. **Countdown chip + since-your-pick line** (B2, B5) — the two cheapest draft-room improvements; both computed from data the shell already holds.
4. **Season hub + standings** (A3) — the product's promise; engine-ready; settle the two-week-1-derivations question first (Part 4, B3).
5. **Guide** (A4) — one screen that stops every other screen having to teach.
6. **Save names + overwrite confirm** (A5) — trust + platform prep in one small slice.
7. **SportDef shape + screen registry** (C1, C3) — define the shapes now; fill them as slices land.
