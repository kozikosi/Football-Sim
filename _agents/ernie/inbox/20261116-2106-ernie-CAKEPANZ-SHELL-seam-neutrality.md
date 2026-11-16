SPEAKER: ernie | ROLE: council | TASK: 67 Cakepanz — the seam, the one-door claim, and neutrality (Parts 2 + 3) | DATE: 2026-11-16T21:06Z
FOR: R-13

# Part 2 — the seam: there isn't one, and the five M-requirements are unmet

**Tree:** `_agents/ernie/deliveries/zai-sitting-1116-fourslice/67-cakepanz-s3-s4-rev2` (the newest app tree; slices 1-4; engine `4ca9a071`).

## M1 · One door — FAILS

The M1 check, run verbatim against this tree:

```
$ grep -rn "engine" src/lib src/App.svelte | grep -E "import|from " | wc -l
63
$ grep -rln "engine/" src/lib src/App.svelte | wc -l
14
```

Fourteen files import the engine directly, not one adapter:

| file | what it imports from `src/engine/**` |
|---|---|
| `src/App.svelte` | `store.ts`, `players.ts`, `rng.ts`, `hash.ts`, `draft.ts`, `slots.ts`, `lineup.ts` |
| `src/lib/draftStore.ts` | `app/store.ts`, `engine/players.ts` |
| `src/lib/feedVM.ts` | 17 imports — `app/store.ts`, `engine/lineup.ts`, `engine/ratings.ts`, `engine/returner.ts`, `engine/value.ts`, `engine/league.ts`, `engine/matchup.ts`, `engine/plans.ts`, `engine/drives.ts`, `app/feed.ts`, `engine/schedule.ts`, `engine/season.ts`, `engine/seasonrun.ts`, `core/rng.ts` |
| `src/lib/savesApp.ts` | 11 imports — `app/saves.ts`, `app/hydrate.ts`, `app/weekmap.ts`, `platform/localstorage.ts`, `core/app.ts`, `core/keys.ts`, `core/envelope.ts` |
| `src/lib/ink.ts` | `view/teamColors.ts` |
| `src/lib/screens/TeamSelect.svelte` | `engine/league.ts` (`TEAMS`, `DIVS`, `divisionTeams`, `TEAM_BY_NAME`, `Conf`) |
| `src/lib/components/SlotPicker.svelte` | `engine/slots.ts` (`SLOT_IDS`, `SLOTS`), `engine/flex.ts` (`fit`) |
| `src/lib/components/NeedsRow.svelte` | `engine/slots.ts` (`SLOTS`), `view/draftBoard.ts` (`slotLabel`) |
| `src/lib/components/Saves.svelte` | `engine/league.ts` (`TEAMS`) |
| `src/lib/components/DraftBoard.svelte`, `BoardRow.svelte`, `BoardHeader.svelte`, `SortControls.svelte` | type-only imports of `BoardVM`, `BoardRowVM`, `BoardHeaderVM`, `BoardSort`, `SlotId` |

**What this means for the merge.** `src/lib/feedVM.ts` alone is 160 lines that call nine engine modules — it is the de-facto seam for the feed, but it is not *the* seam: the board reads the engine through `App.svelte`, the picker through `SlotPicker.svelte`, the saves through `savesApp.ts`. A new pin that changes a `draftBoard.ts` signature breaks the board in `App.svelte`, and a pin that changes `saves.ts` breaks `savesApp.ts`; there is no one file the Architect can point at, and no `SNAPSHOT.md`-style contract to re-run. **This is the single largest merge risk in the tree and it is structural, not cosmetic.**

## M2 · One directory — FAILS

Deleting `src/engine/` would produce errors in at least 9 non-adapter files (the table above), including two screens. Nothing outside `src/engine/` knows the layout *except* the fourteen files that name individual engine modules — which is the same as saying nothing outside knows the layout is false.

## M3 · The swap test — NOT RUN by the builder; I ran the first half

No `SNAPSHOT.md`, no swap receipt anywhere in the tree (`find . -iname "*SNAPSHOT*" -o -iname "*MERGE*" -o -iname "*SEAM*"` -> nothing). I did not swap pins (that is the Architect's move per the pin-migration table, and the sitting's own `filings/inbox-20261115-zai-pin-migration-table.md` measures it: 1/32 user picks identical, QB→FS 10→12, 24→21 flexed picks). **A swap today would require edits outside `src/engine/` for at least the flex table and `draft.ts` consumers — i.e. the M3 gate would fail.**

## M4 · A written contract — FAILS

No `SNAPSHOT.md`. The pin is documented only in prose inside `README.md:8`. A stranger cannot re-pin from a file; they would have to read the README, find the path mapping (`src/engine/core` <-> `colors/src/core`, etc. — documented only in the sitting's `logs/`, not in the tree), and guess the rest.

## M5 · The seam is thin — MEASURED: 76 lines of 1,220 touch engine types

```
$ grep -rnE "\b(BoardVM|BoardRowVM|SlotId|Dest|Player|Store|SaveRecord|Lineup|Ratings|BoardSort|BoardHeaderVM|Conf|SlotName|SaveMeta|AnyEnvelope|DraftPayload|WeekEnvelope|SeasonEnvelope|HydrateResult|LoadedWeek|StorageModule)\b" src/lib src/App.svelte | wc -l
76
```

76 / 1,220 = 6.2% of app code, spread over 13 files, concentrated in `savesApp.ts` (25 lines) and `App.svelte` (12) and `feedVM.ts` (9). **That is thin in volume and thick in surface.** The number Z.ai must publish is 76 lines across 13 files, not "the seam is clean".

## What the seam should be (my proposal, engine-versioned against `d3bd81d2`)

One module, `src/lib/enginePort.ts`, exporting a single `EnginePort` interface with six commands/queries — the six things the shell actually does:

1. `newDraft(seed, userTeam, order?)` -> `DraftHandle` (the custom-order path; `draft.ts` already takes `order`)
2. `board(handle, userTeam, opts)` -> `BoardVM` (wraps `boardVM` + `goneOdds`)
3. `pick(handle, playerId, slot)` -> `void` (wraps the store reducer)
4. `week(handle, week)` -> `WeekVM` (wraps `weekmap`/`hydrate`)
5. `save()/load(slot)` -> `SaveResult` (wraps `saves.ts`, `hydrate.ts`)
6. `pool()` -> `Player[]` (wraps `buildPool` + the dataset loader)

Everything the shell needs beyond that is a type re-export (`BoardVM`, `SlotId`, ...) and belongs in the same file. The acceptance test is mechanical and cheap: `grep -rln "engine/" src --exclude-dir=engine` must return exactly one path. That test does not exist today; it should be law #1 of the cutover battery.

**Verdict on the seam: not mergeable as a one-file swap.** It is mergeable as a *port* (the pin migration table already proves the app still works on the new pin with the engine's own changes) — but "the engine drops in" is not yet true, and the tree does not claim it is: no SNAPSHOT.md, no seam doc, no swap receipt.

# Part 3 — neutrality: one framework import in the TS core, everything else clean

```
$ grep -rn "from 'svelte" src/lib src/App.svelte
src/lib/draftStore.ts:3:import { readable, writable } from 'svelte/store';
src/App.svelte:4:  import { onMount } from 'svelte';
src/App.svelte:5:  import { writable } from 'svelte/store';
$ grep -rnE '\$state|\$derived|\$effect|\$props' src/lib/*.ts     # runes in .ts files
(no output)
```

- **`src/lib/draftStore.ts` (20 lines) is the only framework-coupled file in the TS core.** It is a thin, documented adapter (`readable(store.getState(), set => store.subscribe(set))`) and is trivially replaceable — but it *is* a `svelte/store` import in `src/lib/**`, which the brief forbids ("No framework imports in core modules"). Portable fix, no framework decision needed: replace `svelte/store`'s `readable`/`writable` with a ~15-line `createStore` of the shell's own (`subscribe(fn)`, `set(v)`, `get()`), keeping the same surface; the render layer adapts. That is a TS-neutral change, not a framework bet.
- **No runes anywhere in `src/lib/*.ts`.** `feedVM.ts` (160 lines), `savesApp.ts` (104), `ink.ts` (35), `valuation.ts` (26), `abbr.ts` (20) are framework-blind plain TS — they run under `node --experimental-strip-types`, which is how the battery and my `probe-feed-copy.mjs` execute them.
- **`App.svelte` (230 lines) is the composition root** and carries `onMount` + `writable` — legitimate render-layer code.
- **`src/lib/components/*.svelte` (11 files, 442 lines) are the render layer** — Svelte 5 by construction, and the brief allows that for this tree.

**Portability verdict:** the shell is ~95% portable to either framework as-is. The single blocking file is `src/lib/draftStore.ts`; the single missing artifact is a documented seam. Neither requires the Owner's framework ruling. **The "Svelte 5 project" wording did not choose the framework by framing** — the tree is Svelte because it was built in Svelte, the TS core is genuinely framework-neutral, and no engine byte depends on Svelte.

**One more neutrality finding, in the build:** `npm run build` emits `src/App.svelte:44:6 'userTeam' is updated, but is not declared with $state(...)` — a Svelte-5 runes correctness warning (`let userTeam = 0;` at `src/App.svelte:44`). Fix is one word (`$state(0)`), and it is a today-non-bug only because the screen flip re-renders in the same handler.

# What this unblocks

- For Z.ai: a one-file seam and a `SNAPSHOT.md` are the two artifacts that convert "slices 1-4 built" into "the engine drops in". Both are TS-neutral and neither needs an Owner ruling.
- For the Architect: the pin migration is already measured by Z.ai; what he still lacks is a single file to point a new pin at. Until then a re-pin is a port, not a swap.

**Weakest point:** I did not attempt the swap (M3) — swapping `src/engine` to `d3bd81d2` in a scratch copy is the decisive test and it is cheap for the next seat with a free hour. If it builds and the battery passes with zero edits outside `src/engine/`, my "not a swap" verdict is wrong and should be corrected on the record.