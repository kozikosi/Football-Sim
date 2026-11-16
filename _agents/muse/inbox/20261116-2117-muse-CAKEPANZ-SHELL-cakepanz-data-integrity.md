SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 9 — data integrity | DATE: 20261116-2117
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 9 — Data integrity: can any number on any screen be produced without the engine?

**Scope.** The delivery under review is the `67-cakepanz-s5` tree on `origin/council/inkling`.
The question is about the **shell's own code** — `src/lib/`, `src/App.svelte`, `src/main.ts`
— not the vendored engine snapshot in `src/engine/`, which is the source of truth by
design. Method: read every shell file that renders a number, and grep for the four things
the prompt names (hard-coded flex costs, generated ratings, a stand-in table, a label
that does not travel with its number). One hit is major and was additionally proven live:
the M-A mutation run in the Part 6 filing changed the valuation mode's default label and
no board number moved.

**Claim labels.** VERIFIED = I ran it, receipt in the text. REPORTED = someone else measured
it, named. INFERRED = reasoned from code I read, not run. UNKNOWN = I do not know.

**What this part unblocks:** Z.ai's next shell round (the mode switch needs a real
implementation or an honest label) and Claude's merge (the shell's numbers are otherwise
clean to consume). Artifact: this file. Verify/apply: re-run the greps quoted below
against the s5 tree; HIT-1's live proof is the Part 6 filing's M-A run.

## HIT-1 (major) — The valuation-mode switch is label-only: the numbers never change when the label does

**The label that does not travel with its number.** The shell offers three valuation modes
(`src/lib/valuation.ts:9-13`):

```ts
export const MODE_LABEL: Record<ValuationMode, string> = {
  measured: 'Model Value',
  balance: 'Game balance',
  owner: 'Owner preset',
};
```

The subtitle on Team Select and on the board promises the label travels with the numbers
(`src/lib/screens/TeamSelect.svelte:23`, `src/App.svelte:193`):

> "Every number you will see on this board reads **Model Value** — the label travels
> with the numbers."

**But the numbers cannot change.** Evidence (VERIFIED by reading + grep):

1. `boardVM` — the function that produces every board number — takes no mode argument:
   `boardVM(st.draft, userTeam, odds, { sort })` (`src/App.svelte:105`). Its inputs are
   the draft state, the team, the gone-odds object, and the sort. There is no mode input.
2. `valuation.set()` only flips the label and notifies subscribers; the subscription in
   `App.svelte` (`valuation.subscribe(() => refresh())`) recomputes the *same* boardVM
   with the *same* inputs. No code path maps a mode to different weights.
3. No Owner-preset or Game-balance weight table exists anywhere in the tree:
   `grep -rn "preset" src/engine/` returns nothing except unrelated uses, and the only
   weight table is the single measured `WEIGHT` in `src/engine/sports/nfl/engine/slots.ts`
   (used by `draft.ts:10`). The Owner's Nov 6 salary-weights table — the only candidate
   "Owner preset" content — was ruled DEAD by the Owner on 2026-11-08 and is not in this
   tree. There is nothing for the "Owner preset" mode to switch *to*.
4. `valuation` / `MODE_LABEL` are imported in exactly three places (`grep -rn
   "valuation|MODE_LABEL" src/`): `TeamSelect.svelte` (subtitle), `ModeSwitch.svelte`
   (the buttons), `App.svelte` (subtitle). No engine file, no view-model file, no store
   file mentions a mode.

**Live proof (VERIFIED, from the Part 6 filing's M-A mutation run).** Changing the default
mode in `src/lib/valuation.ts` from `'measured'` to `'owner'` and re-running the full
battery killed exactly three laws — 4, 22, 25, all label-text assertions ("Model Value"
on) — and **no number law moved**: the every-row field law (12), the OVR-sort law (15),
the flex-chip law (16) all stayed green with identical numbers. The board under the
"Owner preset" label shows byte-identical Wins/Priority/OVR/gone% to the board under the
"Model Value" label. The subtitle then reads "Every number on this board reads Owner
preset" over numbers that are still the measured values — a false provenance claim on
every screen, in the exact form this part was asked to find (a label that does not
travel with its number — here inverted: the label travels, the numbers stay home).

**Scope note.** This is a shell gap, not an engine gap: the engine at the pin computes
one valuation, and the Q7 decision ("measured default, Owner preset one click away")
presupposes a preset the engine does not yet expose. The honest options for Z.ai's next
round are (a) implement the preset in the engine first, then wire the switch to it, or
(b) until then, render the switch as "Model Value" only, with the other modes visibly
unavailable — the current switch presents two modes that do not exist. Filed as a hit,
not a fix (per the prompt: file it, do not build it).

## HIT-2 (minor, fixture scope) — The season brag's proof block displays a fake dataset stamp

`batteries/seasonfixture.mjs:58` and `batteries/weekfixture.mjs:53` stamp the fixture
envelopes with:

```js
dataVersion: 'sha256:battery',
```

The season brag renders that string verbatim in its proof block
(`src/lib/shareVM.ts` `seasonBrag` proof: `{ label: 'dataset', value: env.dataVersion }`),
and battery law 70 *asserts* the proof contains `'sha256:battery'`. In production the
same field carries the real sha256 of the ratings CSV, computed at boot
(`src/App.svelte:91`: `sha256Hex(ratings)` → `dataVersion = 'sha256:' + h`). So the
shell faithfully renders what the envelope says — the invention is in the *fixture*,
not the shell — but two things follow:

1. In every battery run, the season brag screen shows a dataset stamp that is not a hash
   of any dataset. Anyone reading the screenshot (`shots/slice5-share.png`) sees a proof
   block whose "dataset" line is a placeholder.
2. No law asserts the stamp's *shape*: `dataVersion` matching `/^sha256:[0-9a-f]{64}$/`
   is never checked, so a malformed stamp would pass law 70 the same way.

**Scope:** fixture-only; the production path is clean (real sha256, VERIFIED by reading
`App.svelte:91`). Proposal: stamp the fixtures with the real CSV hash (the battery
already recomputes it node-side in law 64) or rename the placeholder to something that
cannot be mistaken for a hash (e.g. `fixture:no-dataset`), and add a shape assertion on
`dataVersion` in the brag proof laws.

## HIT-3 (minor) — The seed card's replay recipe promises a control the shell does not have

`src/lib/shareVM.ts:141-142` and `:164-165` print, on every seed card:

> "open this build with `?dev=1` and choose ${teamName}" / "enter the seed ${seed} at the
> start — the board and the week-1 game replay identically"

There is **no seed-entry control anywhere in the shell** (VERIFIED: `grep -rn
"<input|<select" src/` returns nothing). The seed is minted at draft start by
`Math.random()` (`src/App.svelte:76`: `seed = 1000 + Math.floor(Math.random() * 9000)`),
and the user can never type one in. The seed number itself is real — it is the engine's
input, and the replay claim is true of the engine — but the recipe describes an action
the user cannot perform inside the product. The battery's law 65 asserts the card
*shows* the recipe words; no law asserts the recipe is *performable*. (Also filed as
Part 7 gap G-11.) Proposal: build the seed-entry control, or reword the recipe to what
the shell can actually do.

## CLEAN — with the grep for each

### No hard-coded flex costs in the shell (VERIFIED)

```
$ grep -rn "flex" src/lib --include=*.ts --include=*.svelte | grep -v "flex-wrap\|flex: 1\|display: flex\|flex fills\|flex spot\|flex route"
src/lib/components/BoardRow.svelte:1:  <!-- ... the flex options (the chips read the flex cost). -->
src/lib/components/SlotPicker.svelte:4:  import { fit } from '../../engine/sports/nfl/engine/flex.ts';
src/lib/components/SlotPicker.svelte:20: .cp-picker { display: flex; ... }
```

Every flex number on screen comes from the engine: the board chips render
`f.flex`, which is formatted in the engine view model as `` `-${x.pen} flex` `` where
`pen` is `fit(...).penalty` (`src/engine/sports/nfl/view/draftBoard.ts:46`); the
`SlotPicker` calls the engine's `fit()` directly (`SlotPicker.svelte:4,7`). No literal
flex cost (no `-2`, `-6`, `-12`, `-4`, `-10`) appears in any shell file. The one
hard-coded flex-looking string, `"-10"` in the `SlotPicker` header comment, is prose
("just '-10' where the table says so"), not a value.

### No generated ratings (VERIFIED)

- The pool is built from the three CSVs, never synthesised:
  `src/App.svelte:66-70` imports `madden27-ratings.csv`, `free-agents-old-ratings.csv`,
  `player-ids.csv` as raw text and calls the engine's `buildPool(ratings, fa, ids)`.
  The dev dataset is the engine's own bundled ratings, labelled DEV (the F11 ruling).
- Team ratings on the feed path come from the engine's `teamRatings`
  (`src/lib/feedVM.ts:77-83`: `teamRatingsOf` calls the engine's `lineupFor` +
  `teamRatings` + `returnerRating`); the lineup advice's OVRs come from the engine's
  `lineupFor` (`src/App.svelte:112-116`). The shell computes no rating, no OVR, no
  Wins, no Priority anywhere: `grep -rn "ovr\s*=|wins\s*=|priority\s*=" src/lib
  src/App.svelte` returns only assignments *from* engine values.

### No stand-in table (VERIFIED)

Every number-bearing surface reads the engine through exactly one path each, with no
fallback table:

| Surface | Number source (shell file → engine function) |
|---|---|
| Board rows (name/pos/team/OVR/Wins/Priority/gone%) | `App.svelte` → `boardVM` (`view/draftBoard.ts`) + `goneOdds` (`engine/goneodds.ts`) |
| Needs row (32 open slots) | `App.svelte` → `openSlots` (`engine/draft.ts`) |
| Flex chips | `BoardRow.svelte` → `alsoFits` from `boardVM` → `fit` (`engine/flex.ts`) |
| On-clock / footer count | `boardVM` header/footer |
| Saves panel (picks, rev, kind, week, fixture) | `savesApp.ts` → `serialize`/`restore`/`hydrateWeek`/`hydrateSeasonConsistency` |
| Feed (scores, drives, lead changes) | `feedVM.ts` → `simulateGame`/`gameFeed`/schedule/`gameSeed` |
| Brag + seed cards | `shareVM.ts` → `feedVM` / the save envelope's own payload |
| Lineup advice | `App.svelte` → `lineupFor` (`engine/lineup.ts`) |

No shell file contains a player table, a weights table, or a ratings table of its own.

### Labels that DO travel with their numbers (VERIFIED — the clean cases, for contrast)

- **Mode label on the board/Team Select** — travels (subtitle echoes it everywhere
  numbers appear) but is false when the mode changes: see HIT-1. The *mechanism* is
  right; the *content* is not.
- **Feed provenance stamp** — `feed.gameSeedLabel` (`feedVM.ts:152`): `"gameSeed ${gs} ·
  week 1 · ${away} @ ${home} · played by the pinned engine"`, asserted by law 54. The
  stamp names the seed and the fixture for the exact game shown. Clean.
- **Brag proof block** — draft seed, engine-derived gameSeed, engine pin, dataset sha
  (law 63–64, node-side recompute). Clean except the fixture-stamp scope in HIT-2.
- **Hydrated card** — names trusted vs re-derived fields (`Saves.svelte`: "the table,
  seeding and champion were RE-DERIVED … (trusted: ratings, roster, scores, plan)").
  The split is the engine's own `hydrateWeek` contract. Clean.
- **Season brag proof** — saveId · rev · engineVersion · dataset from the envelope
  itself (law 70). Clean except HIT-2.
- **Saves panel envelope lines** — kind · rev · picks · team / next week · fixture are
  read off the parsed envelope, never typed by hand. Clean.

### Display-only tables and literals (checked, not hits)

- `src/lib/abbr.ts` — a hand-maintained 32-row team-name → tricode table. It carries
  no numbers, only names — but it *could* drift from the engine, so it was checked:
  all 32 keys are present in `src/engine/sports/nfl/engine/league.ts` (VERIFIED by
  script, 32 rows, zero missing), and the `abbrOf` fallback
  (`name.slice(0, 3).toUpperCase()`) never fires for the 32 teams. Clean, with the
  standing recommendation that the table be generated from `league.ts` instead of
  hand-kept.
- `src/lib/ink.ts` — colours from the engine's `TEAM_COLORS`
  (`view/teamColors.ts`); the fallback `['#e8c87e', '#f5e9dd', '#c8a48f']` fires only
  for an unknown team name. Presentation colours, not data. Clean.
- `src/lib/bragCard.ts` — canvas constants (`BG`, `GOLD`, `W = 1200`, `H = 675`) are
  layout/presentation; every *value* drawn comes from the `BragVM`/`SeedVM` passed in.
  Clean.
- `src/lib/feedVM.ts:37` — `FEED_YEAR = 2027`, labelled "informational; drives nothing".
  It is passed as the year argument to the engine's `buildSchedule` — so it does drive
  the schedule's year label, but the year is a label on the fixture, not a computed
  value shown as a result. Not a hit; noted for precision.
- `src/App.svelte:126` — `saveRevision: 1 + picks.length`. The revision is app-stamped
  meta (the envelope contract assigns meta-stamping to the app: `savesApp.ts` header,
  "The meta the app stamps"). It is not engine-computed — by design, not by accident.
  Not a hit.
- `DATASET_SHORT` (`shareVM.ts:21`) truncates the dataset stamp to 19 chars + `…` for
  display, labelled "display shaping only". Clean.

## Verdict

**Not a clean bill.** One major hit (HIT-1: the valuation-mode switch changes the label
and nothing else — the "Owner preset" and "Game balance" modes do not exist as
valuations in this tree, and the subtitle asserts otherwise on every board), and two
minor hits (HIT-2: a fixture dataset stamp that is not a hash; HIT-3: a replay recipe
for a control that does not exist). Everything else the prompt asked for — hard-coded
flex costs, generated ratings, a stand-in table — is absent: every other number on
every screen is produced by the engine and labelled with its provenance, as the greps
above show.

Greps used (all run 2026-11-16 against the s5 tree in
`/tmp/cakepanz-s5/_agents/inkling/deliveries/67-cakepanz-s5`):

```
grep -rn "valuation\|MODE_LABEL" src/
grep -rn "preset" src/engine/
grep -rn "flex" src/lib --include=*.ts --include=*.svelte
grep -rn "ovr\s*=\|wins\s*=\|priority\s*=" src/lib src/App.svelte
grep -rn "<input\|<select" src/
grep -rn "sha256:battery" src batteries/
grep -rn "https\?://\|cdn\.\|googleapis" src index.html
```
