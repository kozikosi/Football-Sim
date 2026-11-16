SPEAKER: muse | ROLE: council | TASK: cakepanz shell assist part 4 — blocked pieces | DATE: 20261116-2103
FOR: P-317

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 4 — Help with the blocked pieces (FOR: P-317)

**What this file unblocks:** Z.ai's next round on Team Select (P-317) and the Architect's store change it waits on. **Exact artifact:** this filing. **How to verify/apply:** every VERIFIED claim below carries the file path and the command or read behind it; re-run the greps against the s5 delivery (`_agents/inkling/deliveries/67-cakepanz-s5/` on `origin/council/inkling`) and the pin (`d3bd81d2`).

**Sources read (VERIFIED):** the s5 delivery tree, extracted with `git archive origin/council/inkling _agents/inkling/deliveries/67-cakepanz-s5`; the engine at pin `d3bd81d2` (`git show d3bd81d2:colors/...`); the s3–s4-rev2 delivery on `origin/council/ernie` (path `_agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14/67-cakepanz-s3-s4-rev2/`).

## B1 — THE known blocker: Team Select slot pick (P-317)

**The requirement (from the prompt):** Team Select must let the user pick team AND draft position (slot 1–32), same screen, same look.

**The prompt's engine claim — VERIFIED, with a correction on the pin.** The prompt says "the engine's `newDraft` already takes an `order` parameter, so the engine supports it." True at both pins:

- Pin `d3bd81d2`: `colors/src/sports/nfl/engine/draft.ts:52` — `export function newDraft(players, rng, cfg = DEFAULT_CONFIG, order: number[] = snakeOrder())`.
- s5 snapshot: `src/engine/sports/nfl/engine/draft.ts:52` — identical signature. `snakeOrder()` (`draft.ts:44-50`) builds the 1024-entry order (32 rounds × 32 teams, even rounds forward, odd rounds reversed).

**The store does NOT support a slot — VERIFIED, four places, all in the snapshot's `src/engine/sports/nfl/app/store.ts`:**

1. `DraftStoreAction` (`store.ts:29-33`): `START` is `{ type: 'START'; seed: number; userTeam: number }` — no slot, no order.
2. `restoreDraft` (`store.ts:65-66`): calls `newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'))` with no `order` argument, so every restore silently falls back to `snakeOrder()`.
3. `toRecord` / `DraftPayload` (`store.ts` `toRecord`; `src/engine/sports/nfl/app/saves.ts:27-32`): the payload is `{ seed, userTeam, picks, pool }` — no slot, no order. A custom order cannot survive a save/load round-trip: it is not stored anywhere.
4. The app side agrees: `src/App.svelte` `startDraft(teamIndex)` dispatches `START` with `{ seed, userTeam }` only, and `loadDraft` reads only `rec.seed` / `rec.userTeam`. `src/lib/screens/TeamSelect.svelte` calls `onstart(chosenIndex)` with the team index only.

So the blocker is real and its shape is precise: **the engine function accepts a custom order, but nothing between the screen and the engine carries one.** The fix is a store + payload change, not an engine-math change. No flex, ratings, or simulation logic is involved.

### What exactly the Architect should build (the interface)

All of this lives in the snapshot's engine files (`src/engine/sports/nfl/app/store.ts`, `src/engine/sports/nfl/app/saves.ts`, `src/engine/sports/nfl/engine/draft.ts`) — i.e. it ships at the next re-pin, not as a shell edit. Z.ai must not hand-roll it in `src/lib/`.

1. **Derivation (new, engine-side, pure): `orderForSlot(slot, userTeam)`** in `engine/draft.ts`, next to `snakeOrder()`. Semantics — the smallest honest change, a *swap*, not a re-seed: start from `snakeOrder()`; in each round's 32-block, swap the user's team with the team sitting at the user's target position for that round (target index `slot - 1` on even rounds, `32 - slot` on odd rounds, 0-based rounds). Consequences, all intended: the user picks `slot`-th in round 1, `(33 - slot)`-th in round 2, `slot`-th in round 3, and so on; every other team's relative order is untouched; the user trades draft positions with exactly one team (the team that held that slot). Back-compat falls out: `slot = userTeam + 1` is the identity (the user already sits there under default snake). A full drop-in implementation with verification is filed as Asset A1 in my Part 15 file (`...-cakepanz-ts-assets.md`).
2. **Payload:** `DraftPayload` gains two fields — `slot: number` (1–32, the human meaning, displayed) and `order: number[]` (the 1024-entry order actually used). Store both, not one: `slot` is what the screen shows, `order` is what restore trusts, so a future derivation change can never silently rewrite an old save. Cost is ~3 KB of JSON against a pool that is already ~90 KB (REPORTED: s5 README's own "about 90 K chars" for the pool).
3. **Validation:** `draftPayloadProblem()` in `saves.ts` gains: `slot` is an integer 1–32; `order` is 1024 entries; every round-block is a permutation of 0–31; and for every round `r`, `order[r*32 + target] === userTeam` where `target` is the slot target for that round. `parseRecord()` in `store.ts` inherits it (it already calls `draftPayloadProblem`). Back-compat rule: a payload with **neither** field loads as legacy snake with `slot = userTeam + 1`; a payload with **one** field but not the other is corrupt (`draft: bad slot/order`) — never half-derive.
4. **Store:** `START` becomes `{ type: 'START'; seed: number; userTeam: number; slot: number }`, validated 1–32 integer (same error style as the existing `start: bad seed or team`). `START` derives `order = orderForSlot(slot, userTeam)`, passes it to `newDraft`, and `toRecord` writes `slot` + `order`. `restoreDraft` passes `rec.order` (or legacy snake when absent) to `newDraft` — the existing log check (`k.team !== st.order[st.pos]` → `save: pick N is out of order`) then automatically enforces that a loaded log matches its stored order, so a tampered order is refused, not silently applied.
5. **The Colors whole-app store too:** at pin `d3bd81d2`, `colors/src/sports/nfl/app/appstate.ts:51` has the same gap — `START` is `{ seed, userTeam, saveId, now }` with no slot, and `AppState.draft` is a `DraftPayload`, so the payload change carries the slot through automatically once `START` accepts it. The Architect should land both stores in the same change, or the merge will re-open this blocker in Colors.
6. **No schema bump needed (INFERRED, check at build):** `SCHEMA_VERSION` stays 1. The new fields are optional-with-legacy-fallback on read, and an old build reading a new save fails *safe*: its `restoreDraft` ignores the unknown fields, restores default snake, and the log check refuses the save as out-of-order rather than drafting the user at the wrong slot. That failure mode must be battery-proven, not assumed (see the laws below).

### What Z.ai should build NOW (before the store lands)

Z.ai is **not** blocked on the whole piece — only on the last wire. Build now, in this order:

1. **The picker UI on Team Select (same screen, same look).** `TeamSelect.svelte` today renders 32 team buttons in 8 division groups plus a detail aside with a `DRAFT AS {team}` button. Add, inside the same detail aside: a slot control — 32 options (a compact 1–32 grid or stepper; the existing pill style `.cp-ts-team` is the look to reuse), default = the team's natural slot (`teamIndex + 1`). The detail panel must name the trade: "Pick 12th — you swap draft positions with the Tennessee Titans" (the default round-1 holder of slot 12 is `TEAMS[11]`; `league.ts` order is the round-1 order — VERIFIED, `draft.ts` `snakeOrder` round 0 is `0..31`). Show the user's pick positions for the first three rounds ("R1 12th · R2 21st · R3 12th") — computable from the slot alone, no engine call.
2. **The preview derivation, shell-side, clearly labelled provisional.** A tiny pure function in `src/lib/` (proposed as `src/lib/slotOrder.ts`; drop-in in my Part 15 file) that mirrors `orderForSlot` for preview only. It must be deleted or re-pointed at the engine's function at re-pin — file it as tech debt in the delivery README when built, with the exact re-pin step. (Duplicating a 15-line pure derivation for a preview is acceptable; duplicating engine math is not. This is derivation, not valuation.)
3. **App plumbing up to the dispatch.** `App.svelte`: `startDraft(teamIndex, slot)`, holding `userSlot` in app state alongside `userTeam`; the board header should show it ("Drafting 12th" — `BoardHeaderVM` has no slot field today; that is a view-model addition for the Architect, or an App-level line above the board — Z.ai's choice, file it).
4. **Battery laws for the slot, written test-first, failing until the store lands.** The laws: slot 1 / 12 / 32 each put the user on the clock at the right overall pick in rounds 1–3; a saved draft with a slot reloads at the same slot and the same order (save/load round-trip); a legacy save (no slot field) loads as `slot = userTeam + 1`; `START` with slot 0 / 33 / 1.5 is refused with the store's error verbatim; the slot survives undo (undo cuts the log, not the slot). A failing-now battery is the cleanest handoff to the Architect: his patch turns it green.
5. **GATE IT — do not ship a lying picker.** Until the snapshot's `store.ts` accepts `slot`, a dispatched slot is silently ignored (extra object property) and the user would draft at their natural slot while the screen promised 12th. That is worse than no picker. So: the picker ships built but the `DRAFT AS …` button stays on the old path (or the slot control is visibly marked "draft position picks land with the next engine update") until the re-pin that carries the store change. The enable condition is mechanical: the snapshot's `DraftStoreAction` contains `slot`. No silent fallback, ever.

### Order of work (proposed)

1. Architect: `orderForSlot` + payload + both stores + validation (one change, engine-side). 2. Re-pin the Cakepanz snapshot to that commit. 3. Z.ai: wire picker → `START { …, slot }`, remove the gate, add the header line. 4. Battery slot laws green (they were written in step 0, failing). 5. Cutover checklist gains one line: "slot laws green at the cutover pin."

## B2 — Pin drift: the delivery, the deployment, and the prompt name three different states

**VERIFIED (commands run this session):**

```
# s5 delivery snapshot (52 .ts files), diffed against two pins:
#   pin 4ca9a071: checked 52 files, 0 differ
#   pin d3bd81d2: checked 52 files, 6 differ
# Differ vs d3bd81d2: engine/value.ts, engine/slots.ts, engine/flex.ts,
#   engine/draft.ts, app/dataset.ts, core/app.ts
# gh-pages 67-cakepanz engine (57 .ts files), diffed the same way:
#   pin d3bd81d2: checked 57 files, 0 differ
#   pin 4ca9a071: checked 57 files, 11 differ
```

So the situation is three-way, and my first reading of it (delivery vs prompt) was incomplete:

- **The s5 delivery's snapshot is `4ca9a071`** — its README says so ("re-verified byte-identical BEFORE the build … and AGAIN after it"), and that checks out exactly (52/52).
- **The gh-pages deployment's engine is `d3bd81d2`** — re-pinned 2026-11-15 in `66096fb1` ("67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)"), 57/57 byte-identical (5 new engine files vs the delivery, matching the re-pin note). The prompt's pin `d3bd81d2` matches the *deployment*, not the delivery.
- **The gh-pages README still says `4ca9a071`** (`67-cakepanz/README.md:4`, and `src/App.svelte:65` still comments "pinned 4ca9a071") — the re-pin updated the engine bytes but not the documents that name the pin. The README is stale; the bytes are the truth. (This is the prompt's Part 10 question, answered with a command: the deployment carries `d3bd81d2`, its README names `4ca9a071`.)
- `d3bd81d2` and `4ca9a071` are on divergent lines (neither is an ancestor of the other — VERIFIED with `git merge-base --is-ancestor` both ways). One visible difference: `draft.ts`'s replacement-level cache is `if (st.pos - st.replAt < 6)` at `4ca9a071` vs `if (st.pos === st.replAt)` at `d3bd81d2`; `flex.ts` also differs (the 99-rule flex lives at `d3bd81d2`).

**What it is blocked on:** a single ruling that names the pin for *both* the delivery and the deployment, plus a re-pin of whichever side is behind. Z.ai cannot re-pin unilaterally — his track's rule is a frozen snapshot, and the re-pin is the Architect's call (the slice-5 README says exactly that). Until then the council is reviewing a delivery built on one engine and a deployment running another, and any battery number (75/0/10/3) is anchored to `4ca9a071` while the live site runs `d3bd81d2`. **Way around it:** nothing Z.ai builds now should depend on a pin-private API — the six differing files are the watch list, `flex.ts` foremost (flex pricing changed between the pins). The cutover checklist (my Part 14 file) opens with "name the pin, then re-verify byte-identity against it *in both trees*" precisely because the pin is currently two different answers depending on which tree you read. The slot work in B1 must be specified against the pin the Architect actually lands it on, not assumed. The stale gh-pages README is a one-line doc fix for whoever holds the deployment (not a shell change, not mine to make).

## B3 — The season: unblocked on the engine, but two week-1 derivations exist

**What is missing (VERIFIED):** the shell plays week 1 only. `src/App.svelte` `playWeek()` calls `feedVM(rec, seed, userTeam)`; `src/lib/feedVM.ts` `playUserWeek()` derives the week-1 game itself (`buildSchedule` → `gameSeed` → `simulateGame`), with `FEED_YEAR = 2027` hardcoded (`feedVM.ts`). There is no season screen: the Saves panel's hydrated week/season card says so itself — "the season screens ride a later slice" (`Saves.svelte`). After the feed, the only way out is `← BOARD`.

**What it is (not) blocked on:** NOT blocked on the engine. The snapshot already has everything a season slice needs: `startSeason` / `playWeek` / `table` (`engine/seasonrun.ts`, `engine/season.ts`), `hydrateWeek` / `hydrateSeasonConsistency` (`app/hydrate.ts`), `WeekPayload` / `SeasonPayload` + `serialize` (`app/saves.ts`), and the battery already builds a real season envelope node-side (`batteries/seasonfixture.mjs` — REPORTED, slice-5 README).

**The real blocker inside it — INFERRED, needs a council check:** there are now **two derivations of the week-1 game** — `feedVM.playUserWeek` (from the draft record) and the season path (`startSeason` → `playWeek`). The s5 README claims the season slice will "replay the SAME game from the same save," but nothing in the tree proves the two paths agree today. The season slice's first law must be: the game `feedVM` shows for week 1 equals the game the season run produces for week 1 from the same (seed, record), or `feedVM`'s derivation is retired in favour of the `WeekPayload` path. Do not let the shell grow a second, divergent week-1.

## B4 — The overtime clock workaround (REPORTED, needs a re-pin)

s5 README finding 1 (REPORTED, Inkling/Z.ai): the snapshot's `app/feed.ts` `clock()` does not handle overtime starts — a drive starting at 3600s+ maps to `Q4` with a negative mm:ss remainder. `Feed.svelte` works around it by rendering `OTn` stamps itself. **Blocked on:** a re-pin carrying the Architect's one-line fix (`q = min(4, …)` → an OT branch), or the feed adopting the fixed mapper verbatim. **Way around:** keep the workaround — it is contained in presentation, the battery asserts the OT stamp shape — and file the §5 to the Architect. Do not let the feed's workaround become the de-facto mapper: the moment a second screen renders clocks, it must use the same workaround or the two screens will disagree about OT.

## B5 — No single consumption seam yet (the merge is not one swap)

**VERIFIED:** 65 engine imports across 15 files in `src/lib/` + `src/App.svelte` (`grep -rn "import.*engine/" src/lib src/App.svelte | wc -l` → 65; `grep -rln` → 15 files). `App.svelte` alone imports the engine directly for `makeRng`, `sha256Hex`, `goneOdds`, `boardVM`, `openSlotsOf`, `lineupFor`, plus the store wrapper. `draftStore.ts` wraps `createStore`, but that is one seam among many — there is no single module the whole shell goes through to read the engine.

**What it is blocked on:** a seam definition (Part 2's job) that the Architect blesses. **Way around it:** Z.ai's next structural slice should be a `src/lib/engine.ts` (or equivalent) that re-exports exactly the engine surface the shell uses, with every screen importing through it — no behaviour change, pure re-wiring, battery-green before and after. Until that exists, "swap the real engine in without touching a screen" is not true, and the cutover checklist must not claim it. (This is a proposal for Z.ai's queue, not a change I am making.)

## B6 — The empty-state dataset import is copy without a flow

**VERIFIED:** `App.svelte`'s empty state says "Import a dataset CSV to begin — or open a dev build with `?dev=1`", and "The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent)." A grep over `src/` finds **no `<input type="file">` anywhere** — there is no import UI at all. **Blocked on:** nothing in the engine (`buildPool(ratings, fa, ids)` already takes raw CSV strings — `App.svelte` `boot_()`). This is unbuilt, not blocked: Z.ai can build the file picker + `buildPool` call + the corrupt-CSV refusal in a normal slice. Until then the copy is a dead promise on the first screen a new user sees — the highest-visibility missing flow in the shell. (Also a Part 5 item; listed here because it reads as blocked but is not.)

## B7 — gh-pages lags the delivery by three slices

**VERIFIED:** `git ls-tree -r --name-only origin/gh-pages 67-cakepanz/src/lib/` lists `screens/TeamSelect.svelte` only — no `Feed.svelte`, no `Share.svelte`, no `savesApp.ts`, `feedVM.ts`, or `shareVM.ts`. The live deployment's *shell* is slices 1–2; slices 3–5 exist only in the delivery trees. (Its *engine* was re-pinned to `d3bd81d2` in `66096fb1` — see B2 — so deployment and delivery now disagree on the engine too.) **Blocked on:** the Owner's publish step (Z.ai cannot push; every response costs the Owner a publish). **Way around:** none for Z.ai. For the council: review against the delivery trees, never against gh-pages alone, and say so in every filing (this one does). The cutover checklist treats gh-pages as stale until proven otherwise.

## B8 — 390 px / offline / single-file: UNKNOWN, not blocked, not verified

No live-browser checks are permitted to this seat (standing boundary, 2026-11-08), so I did not run the battery or open the build. What the code says: there is **no width-based `@media` query anywhere in `src/`** (the only `@media` rules are `prefers-reduced-motion` — VERIFIED by grep), `.cp-root` is `max-width: 980px`, and there is **no single-file plugin in `vite.config.js`** (grep for `singlefile|inline` returns nothing). Whether 390 px actually renders without horizontal scroll, whether `file://` boots, and whether the battery is still 75/0/10/3 at this tree are all **UNKNOWN** — REPORTED numbers only (75/0/10/3, REPORTED by Inkling in the s5 README; engine tests 284 pass, REPORTED). These are not blockers — they are unverified laws, and the cutover checklist (Part 14) lists them as must-run, not must-pass-on-trust.

## Summary table

| # | Blocker | Blocked on | Way around | Owner |
|---|---|---|---|---|
| B1 | Team Select slot pick | Architect's store + payload change | Z.ai builds picker UI + preview + test-first battery now, gated until re-pin | Architect, then Z.ai |
| B2 | Pin is two answers (`4ca9a071` vs `d3bd81d2`) | Owner/Architect ruling naming the cutover pin | Build against neither pin's private APIs; watch the 6 differing files | Owner / Architect |
| B3 | Season screens; two week-1 derivations | Sequencing only (engine ready) | Season slice's first law: feedVM game == season-run week-1 game, or retire feedVM's path | Z.ai |
| B4 | OT clock mapper | Re-pin with Architect's fix | Keep the feed workaround; file §5 | Architect |
| B5 | No single engine seam (65 imports, 15 files) | Seam definition the Architect blesses | Z.ai re-wire slice: one `src/lib/engine.ts` re-export module | Z.ai + Architect |
| B6 | Dataset import: copy, no UI | Nothing — unbuilt | Build the file picker on `buildPool` | Z.ai |
| B7 | gh-pages is slices 1–2 | Owner publish step | Review the delivery trees, not gh-pages | Owner |
| B8 | 390 px / offline / single-file | Nothing — unverified | Run the battery + probes from a clean extract (Part 14) | Whoever holds the Lab |
