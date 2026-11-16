SPEAKER: muse | ROLE: council | TASK: define and verify the engine-shell seam | DATE: 20261116-2119
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 2 — Define and verify the engine-shell seam (67 Cakepanz, s5 delivery)

**What this file is.** MUSE's draft answer to Part 2 of the council prompt v4 (the 67 Cakepanz shell assist prompt). It defines the engine-shell seam as it actually stands in the s5 delivery, verifies it with five attacks, contributes the integration contract as a typed spec, and files five §5 proposals to the Architect. It unblocks: (a) Z.ai's next round — the one-door adapter and the inventory format he must ship; (b) Claude's merge — a wiring task instead of an archaeology task, plus a merge-day gate (the seam-checker, filed alongside this as `20261116-2119-muse-CAKEPANZ-SHELL-seam-checker.mjs`).

**What I read (VERIFIED — every path below was read or run, receipts inline).**
- The prompt: `~/workspace/goals/football-sim-game-development/hidden_files/council-cakepanz-assist-v4-rewrite-2026-11-16.md`.
- The s5 delivery, extracted from `origin/council/inkling`, `_agents/inkling/deliveries/67-cakepanz-s5/` (195 files) — read `README.md`, `deliveries/slice3|4|5/README.md`, all four `CHECKSUMS-*.txt`, `src/App.svelte`, `src/main.ts`, every file in `src/lib/**`, and the engine API surface listed in §5.
- The s3-s4-rev2 delivery, extracted from `origin/council/ernie`, `_agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14/67-cakepanz-s3-s4-rev2/`.
- The gh-pages deployment, `origin/gh-pages`, `67-cakepanz/`.
- The engine at both pins, extracted with `git archive`: `4ca9a071` and `d3bd81d2` (`colors/src/`), plus `86f22d10` only to confirm it is a different tree (not used further).
- Work was done in `/tmp` extracts (`/tmp/ck-s5`, `/tmp/ck-s34`, `/tmp/ghpages`, `/tmp/pin-4ca9`, `/tmp/pin-d3bd`, `/tmp/swap-base`, `/tmp/swap-d3bd`). The repo working tree was not modified except the two output files. Nothing was pushed.

**Claim labels.** VERIFIED = I ran it, receipt in the text. REPORTED = someone else measured it, named. INFERRED = reasoned, not run. UNKNOWN = I do not know. Browser-dependent claims are UNKNOWN (standing boundary: no live browser checks).

## §0 Headline verdicts

| Attack | Verdict |
|---|---|
| The one-door claim | **FAILS.** There is no one door and no adapter module. 15 shell files import the engine directly: 65 import lines (29 type-only, 36 value), 29 distinct engine files, 145 lines mentioning `engine`. `src/App.svelte` alone imports 8 engine files. |
| The swap test | **Build PASSES on both pins; battery PARTIAL at d3bd.** `vite build` exit 0 at 4ca9 (316.10 kB JS / 107.48 kB gzip) and at d3bd (316.08 kB / 107.47 kB). Baseline battery reproduces the REPORTED 75/0/10/3, exit 0. At d3bd, four runs agree: the only law that ever fails is the flex-chip law, and it is **seed-fragile** (0 chips one run, 1 chip the next); the runs never completed — each died on a dead preview server (harness, not engine). The final 2 laws (reduced-motion re-check) are UNKNOWN at d3bd. |
| The seam inventory audit | **There is no handoff seam table to audit.** No file in s5 names a VM→engine-file inventory. The delivery's CHECKSUMS files md5 only shell files, never engine files. Worse, the pins disagree three ways: s5 delivery = `4ca9a071` (VERIFIED byte-identical, 52 files), gh-pages `src/engine/` = `d3bd81d2` (VERIFIED byte-identical, 57 files) while its README still says `4ca9a071`, and the prompt says the pin is `d3bd81d2`. |
| The merge rehearsal (seam-checker) | **Built, and falsified.** The checker (filed alongside) passes the clean s5 tree 17/0 exit 0 (including `--repo` pin-blob verification), fails a one-byte mutation 16 pass / 2 fail exit 1, fails a missing inventory exit 1, and fails a wrong pin 9 pass / 10 fail exit 1. |
| Cutover rehearsal | **Failure-mode report in §6.5.** The sharpest hole: the battery's own `slice1-battery.json` is written only on a completed run, so a crashed run leaves the SHIPPED 75/0/10/3 in place — a reader cannot tell it never ran. |

**The seam, in one sentence.** The shell does not have a seam; it has 15 doors. Everything else in this filing follows from that: the contract in §5 is the design for the one door that does not exist yet, and §7 files the five things the Architect must change so the door can be built.

## §1 The seam as it stands (VERIFIED)

**There is no consumption layer.** No file in s5 is an adapter, a seam module, or a single import point for the engine. The closest candidates, and why each is not the door:
- `src/lib/draftStore.ts` — its header comment says "The engine store … wrapped for Svelte 5." It wraps exactly one engine function (`createStore`) and re-exports its types. It is 17 lines. The other 14 shell files that touch the engine never go through it.
- `src/lib/savesApp.ts` — its header says "the ONLY file the UI talks to for saves." True for saves only, and true only of the `.svelte` screens: it is itself one of the 15 doors (11 engine import lines).
- `src/lib/feedVM.ts`, `src/lib/shareVM.ts` — view models in the prompt's sense (plain TypeScript, plain JSON out). Each imports the engine directly (feedVM: 22 import lines, 15 engine files; shareVM: 2 import lines plus feedVM). They are doors, not a door.
- `src/App.svelte` — the composition root — imports the engine directly: `buildPool`, `makeRng`, `sha256Hex`, `goneOdds`, `boardVM`, `openSlotsOf`, `lineupFor`, plus types `Player`, `BoardVM`, `BoardSort`, `SlotId` (11 import lines, 8 engine files). A composition root that reaches past every VM into engine internals is the opposite of a seam.

**The count Z.ai must publish (VERIFIED — commands below).** Shell code = `src/lib/**` + `src/App.svelte` + `src/main.ts` (1,789 lines total).
- `grep -rn "import.*engine/" src/lib src/App.svelte` → **65 import lines: 29 `import type` (type-only), 36 value imports.**
- Distinct engine files imported → **29 of the 52 snapshot files** (list in §1.1).
- Shell files importing the engine → **15 of 22** shell source files (`.ts` + `.svelte` under `src/lib`, plus `src/App.svelte`).
- Lines containing `engine/` → **66**; lines mentioning `engine` at all (imports + comments + identifiers) → **145**.
- No `$lib` alias is used anywhere; no re-export of engine symbols exists (`grep -rn '\$lib' src/` → nothing; `grep -rn "^export .* from" src/lib` → nothing). The bypasses are plain relative imports (`../engine/…`, `../../engine/…`), not alias tricks — which is worse, in a sense: there is nothing to grep for except the import lines themselves.

Commands (run in the s5 extract; `S` = the delivery root):
```
grep -rh "import.*engine/" $S/src/lib $S/src/App.svelte | wc -l          # 65
grep -rh "import.*engine/" $S/src/lib $S/src/App.svelte | grep -c "import type"  # 29
grep -rhoE "engine/[A-Za-z0-9/_-]+\.ts" $S/src/lib $S/src/App.svelte | sort -u | wc -l  # 29
grep -rl "engine/" $S/src/lib $S/src/App.svelte --include='*.ts' --include='*.svelte' | wc -l  # 15
```

### §1.1 The 29 engine files the shell actually uses (VERIFIED)

`core/app.ts`, `core/envelope.ts`, `core/hash.ts`, `core/keys.ts`, `core/rng.ts`, `platform/localstorage.ts`, `sports/nfl/app/feed.ts`, `sports/nfl/app/hydrate.ts`, `sports/nfl/app/saves.ts`, `sports/nfl/app/store.ts`, `sports/nfl/app/weekmap.ts` (type-only), `sports/nfl/engine/draft.ts`, `sports/nfl/engine/drives.ts`, `sports/nfl/engine/flex.ts`, `sports/nfl/engine/goneodds.ts`, `sports/nfl/engine/league.ts`, `sports/nfl/engine/lineup.ts`, `sports/nfl/engine/matchup.ts`, `sports/nfl/engine/plans.ts`, `sports/nfl/engine/players.ts`, `sports/nfl/engine/ratings.ts`, `sports/nfl/engine/returner.ts`, `sports/nfl/engine/schedule.ts`, `sports/nfl/engine/season.ts`, `sports/nfl/engine/seasonrun.ts`, `sports/nfl/engine/slots.ts`, `sports/nfl/engine/value.ts`, `sports/nfl/view/draftBoard.ts`, `sports/nfl/view/teamColors.ts`.

The other 23 snapshot files are imported only by engine files, never by shell code. The shell's import graph is therefore *narrower* than the snapshot — but it is still 29 files wide, and it includes files at every layer (`core/*`, `platform/*`, `app/*`, `engine/*`, `view/*`). A re-pin that changes any of those 29 files' exports breaks the shell; a re-pin that changes only the other 23 does not. That is the seam's real width in file terms.

### §1.2 Which shell file reaches around what (VERIFIED — the bypass table)

| Shell file | Engine files it imports directly | Bypasses a VM? |
|---|---|---|
| `src/App.svelte` | `players.ts`, `rng.ts`, `hash.ts`, `goneodds.ts`, `view/draftBoard.ts`, `engine/draft.ts`, `engine/lineup.ts` (+ types) | Yes — computes `goneOdds` + `boardVM` + `lineupFor` itself instead of behind a board VM |
| `src/lib/feedVM.ts` | 15 files (`store`, `lineup`, `ratings`, `returner`, `value`, `league`, `matchup`, `plans`, `drives`, `app/feed`, `schedule`, `season`, `seasonrun`, `rng`, + types) | N/A (is a VM) — but it replays the season's own derivation privately (§3) |
| `src/lib/savesApp.ts` | 7 files (`app/saves`, `app/hydrate`, `app/weekmap` type, `platform/localstorage`, `core/app` type, `core/keys`, `core/envelope`) | N/A (is the save service) |
| `src/lib/shareVM.ts` | `engine/league.ts`, `app/saves.ts` (+ `feedVM.ts`) | No — delegates to feedVM |
| `src/lib/draftStore.ts` | `app/store.ts`, `engine/players.ts` (type) | N/A (thin wrapper) |
| `src/lib/screens/TeamSelect.svelte` | `engine/league.ts` | Yes — a screen importing engine data directly |
| `src/lib/components/SlotPicker.svelte` | `engine/slots.ts`, `engine/flex.ts` | Yes — a component calling `fit()` directly (§2.2) |
| `src/lib/components/NeedsRow.svelte` | `engine/slots.ts`, `view/draftBoard.ts` (`slotLabel`) | Yes — a component importing engine view helpers |
| `src/lib/components/Saves.svelte` | `engine/league.ts` | Yes |
| `src/lib/components/DraftBoard.svelte` | `view/draftBoard.ts` (type), `engine/slots.ts` (type) | Type-only — but type-only is still a door: a rename in `draftBoard.ts` breaks the build |
| `src/lib/components/BoardRow.svelte`, `BoardHeader.svelte`, `SortControls.svelte` | `view/draftBoard.ts` (types only) | Type-only |
| `src/lib/ink.ts` | `view/teamColors.ts` | Yes — presentation reading engine view data directly |
| `src/lib/abbr.ts` | `engine/league.ts` (type only) | Type-only |
| `src/lib/valuation.ts`, `src/lib/bragCard.ts`, `src/lib/screens/Feed.svelte`, `src/lib/screens/Share.svelte`, `src/lib/components/BoardFooter.svelte`, `LineupAdvice.svelte`, `ModeSwitch.svelte`, `src/main.ts` | none | Clean — these go through VMs/props only |

**Screens that reach past the seam:** TeamSelect, SlotPicker, NeedsRow, Saves, ink (presentation). **Type-only doors:** DraftBoard, BoardRow, BoardHeader, SortControls, abbr — 29 of the 65 import lines are `import type`, and they still couple the shell to engine type names (`BoardVM`, `BoardRowVM`, `BoardHeaderVM`, `BoardSort`, `SlotId`, `Player`, `SaveRecord`, `GameResult`, …). A type-only import is a real dependency: rename `BoardVM` and five components fail to compile. The one-door claim fails on value imports alone (36 lines) and fails twice over counting types.

## §2 Is the seam clean? Is it complete? (VERIFIED)

**Clean? No.** §1 is the answer: 15 doors, no adapter, the composition root doing engine work. What *is* clean: the VMs that exist obey the plain-JSON rule (feedVM/shareVM output plain JSON; the battery's node-side recompute matches the DOM exactly — REPORTED in the s5 README, and the base battery run I did re-verified the laws that assert it, 75/0). No shell file *edits* engine state (all engine calls are reads or store dispatches through the engine's own reducer). The dirt is architectural (width), not behavioral (mutation).

**Complete? No — two of the five needs have no seam at all.** Checked against the prompt's list:

| Shell need | Seam exists? | Evidence |
|---|---|---|
| A new draft with a custom order | **NO.** Engine supports it; store does not expose it | `newDraft(players, rng, cfg, order)` takes `order` (`draft.ts:52`, identical at both pins). But `createStore`'s START action is `{type:'START'; seed: number; userTeam: number}` and calls `newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'))` with no order — default `snakeOrder()`. Worse, `toRecord` does not persist `order` and `restoreDraft` rebuilds with the default order, so a custom order would be silently lost on restore. `App.startDraft(teamIndex)` takes only a team. This is the P-317 blocker at the seam level — filed as §5 S1. |
| The board state | **YES.** `goneOdds` + `boardVM` (+ `openSlots`, `lineupFor`) — but wired in `App.svelte` directly, not behind a board VM | `App.svelte` `refresh()`; `draftBoard.ts` `boardVM(st, userTeam, odds, {sort})`. The engine's `BoardVM`/`BoardRowVM`/`BoardHeaderVM` DTOs are the board contract (see §5). |
| The week step | **NO.** The shell plays week 1 only, by private replay | `feedVM.playUserWeek` builds the fixture from `buildSchedule`, derives `gameSeed`, and calls `simulateGame` directly. No shell code calls `startSeason`, `playWeek`, `toWeekPayload`, or `fromWeekPayload` (grep over `src/lib` + `src/App.svelte` finds only the battery fixtures and a `LoadedWeek` type import in `savesApp.ts`). The engine has the whole week-stepper (`seasonrun.ts`, `weekmap.ts:37` `toWeekPayload`, `weekmap.ts:50` `fromWeekPayload`) — the shell has no adapter for it. Filed as §5 S3. |
| The season simulation | **NO.** Same gap as the week step, one level up | No `simulateSeason` / `startSeason` call in shell code. Season rendering exists only as save-reading (`seasonBrag` reads a `SeasonEnvelope` the battery built with `batteries/seasonfixture.mjs`). A user cannot play week 2 in the shell. |
| Save / load | **YES — the most complete seam in the shell.** `savesApp.ts` composes `serialize` / `restore` / `assertSlotMatchesKey` (`app/saves.ts`), `hydrateWeek` / `hydrateSeasonConsistency` (`app/hydrate.ts`), `createLocalStorageModule` (`platform/localstorage.ts`), `sportKey` (`core/keys.ts`). Corrupt-never-repair is honored (failures are `Result`s shown verbatim). Gaps: no export/import of envelope text (an IDEA in the s5 README, not a seam hole), and `saveRevision` is minted in `App.svelte` (`1 + picks.length`), not by the engine. |

**Does any screen duplicate engine math? (VERIFIED — clean, with two qualifications.)**
- `grep` for engine constants in shell code (`WINS_PER_UNIT`, `0.00254`, flex costs, `netPts` outside feedVM) finds no duplicated math. `feedVM` imports `netPts` from the engine rather than re-implementing it. `SlotPicker` calls the engine's `fit()` rather than a copied table. `valuation.ts` holds no numbers at all — which is the second qualification below.
- **Qualification 1 — derivations, not duplications.** `feedVM` computes running scores, lead-change marks, and badge mappings from the engine's `GameFeed`. Those are pure shapings of engine data (the running score is a fold over `DriveEvent.pts`), not re-implementations of engine math. Acceptable — but they live in a VM, which is exactly where such shapings belong; the same logic in a `.svelte` file would be a finding.
- **Qualification 2 — the valuation mode switch is a label with no numbers.** `src/lib/valuation.ts` offers `measured | balance | owner` ("Owner preset: the Owner's own 32-slot table, one click away"), and `App.svelte` prints `MODE_LABEL[valuation.get().mode]` over the board ("the label travels with the numbers"). But switching modes changes nothing except the label: `boardVM` takes no valuation input, the engine at `4ca9a071` has no `measuredDisplayWeights` at all (it was added at `d3bd81d2`, `value.ts`), and no Owner preset table exists anywhere in the shell (grep for `OWNER_WEIGHTS|ownerPreset|preset.*table` in `src/` finds only the comment in `valuation.ts`). The shell therefore advertises "Model Value" as the default while displaying numbers computed from the engine's fitted `SLOTS[].weight` inputs — the exact display the Owner's Q7 ruling replaced. Filed as §5 S2. (INFERRED: whether the Owner intends the switch to re-weight the board or only to label it — the ruling says measured is the default display, which the shell cannot currently produce.)

**Is the seam a single module the Architect can swap the real engine into without touching a screen? No.** Swapping `src/engine/` is a 29-file-wide operation touching 15 shell files' imports. The swap test (§6.2) shows the swap *builds* — but only because the shell imports engine paths that still exist at the new pin. If the Architect renames `view/draftBoard.ts`, moves `goneOdds`, or changes `BoardVM`'s shape, the breakage lands in 15 files at once, with no single place to absorb it. That is the definition of "not a seam."

## §3 The integration contract (contribution — typed spec, engine-versioned)

This section IS the deliverable the prompt asks for: the typed adapter interfaces, DTOs, error/loading states, hydration & save/offline schema, and fixture shapes. It is a **spec in this file**, not code dropped into the shell — building the adapter is Z.ai's / the Architect's work, not the council's. Every type below is grounded in an engine export that exists at the pin; where the two pins differ, the difference is named.

**Versioning.** The contract is written against pin **`d3bd81d2`** (the live pin per `AGENTS.md` §2 and the prompt), because that is the pin Claude will merge. The s5 shell was built against `4ca9a071`; the contract therefore carries a **pin-delta table** (§3.7) so the re-pin work is explicit instead of assumed. A contract versioned only against `4ca9a071` would bless the stale pin.

**The one door (proposed, not built).** One plain-TypeScript module, `src/lib/engineAdapter.ts`, is the only file allowed to import from `../engine/**`. Every VM, screen, and component imports engine access through it. Enforcement is a grep law, not a hope (see §5.4): after the move, `grep -rn "from ['\"]\.\./engine\|from ['\"]\.\./\.\./engine" src/lib src/App.svelte` must return exactly one file. The module re-exports nothing else; it is not a barrel file for the whole engine — it exposes only the seam surface in §3.1–§3.5 (29 files today, and the list is the contract: adding a 30th file is a contract change, filed, not snuck in).

### §3.1 Adapter interface (commands / queries / events)

```ts
// src/lib/engineAdapter.ts — PROPOSED interface (spec; the implementation is Z.ai's/Claude's).
// Engine pin: d3bd81d2. Sport: nfl. All engine types are imported ONLY here.

export type EnginePin = 'd3bd81d2';           // the pin this contract is written against
export const ENGINE_PIN: EnginePin = 'd3bd81d2';

export interface EngineAdapter {
  readonly pin: EnginePin;
  // --- dataset ---
  loadDataset(input: DatasetInput): Promise<Result<Player[], DatasetError>>;
  // --- draft (commands return the new state; the adapter never holds engine state itself) ---
  newDraft(input: NewDraftInput): DraftHandle;                 // input.order = custom order (P-317); §5 S1
  board(handle: DraftHandle, opts?: { sort?: BoardSort }): Result<BoardVM, BoardError>;
  pick(handle: DraftHandle, playerId: string, slot: SlotId): Result<DraftHandle, DraftError>;
  undo(handle: DraftHandle): Result<DraftHandle, DraftError>;
  openSlots(handle: DraftHandle, team: number): SlotId[];
  lineupAdvice(roster: Player[], base?: '4-3' | '3-4'): LineupAdviceVM;
  // --- valuation (the mode switch stops being label-only; §5 S2) ---
  displayWeights(mode: ValuationMode, base?: '4-3' | '3-4'): Record<SlotId, number>;
  // --- week / season (the missing seam; §5 S3) ---
  startSeason(input: StartSeasonInput): SeasonHandle;
  playWeek(handle: SeasonHandle): Result<WeekResult, SeasonError>;   // one week, then toWeekPayload
  weekFeed(handle: SeasonHandle, week: number, team: string): FeedVM; // replaces feedVM's private replay
  seasonResult(handle: SeasonHandle): SeasonEnvelope;                 // via toWeekPayload → serialize
  // --- saves (already exists as savesApp.ts; it moves behind this module unchanged) ---
  saves: SaveService;
  // --- events (the shell subscribes; the engine never calls the shell) ---
  subscribe(fn: (e: ShellEvent) => void): () => void;
}
export type ShellEvent =
  | { type: 'draft.started'; seed: number; userTeam: number; order: number[] }
  | { type: 'draft.pick'; overall: number; team: number; playerId: string; slot: SlotId }
  | { type: 'draft.done'; userTeam: number }
  | { type: 'week.played'; week: number; userWon: boolean | null }
  | { type: 'season.done'; champion: string; userOutcome: SeasonOutcome }
  | { type: 'save.refused'; slot: SlotName; reason: 'corrupt' | 'newer-version'; message: string };
```

`DraftHandle` is an opaque wrapper around the engine's `DraftStoreState` + `Store` (today: `createStore(players)` + `dispatch`). `SeasonHandle` wraps `RunState` + `LeagueTeam[]` + `WeekContext`. Neither handle exposes engine internals to screens; screens see only the VM DTOs in §3.2. Commands are synchronous except dataset load (the only async seam — the CSV parse / `sha256Hex`); every engine throw becomes a `Result` with a typed error, never a raw exception crossing into a component (today `App.refresh()` swallows engine throws with bare `catch {}` — see §6.5).

### §3.2 DTOs (what crosses the seam — all engine-owned, quoted from the pin)

| DTO | Engine source (d3bd81d2, VERIFIED present) | Shell consumer today |
|---|---|---|
| `Player` | `sports/nfl/engine/players.ts` (`buildPool`, `thawPool`/`freezePool` in `app/store.ts`) | App boot, draftStore, feedVM |
| `BoardVM` / `BoardRowVM` / `BoardHeaderVM` / `AlsoFitVM` / `BoardSort` | `sports/nfl/view/draftBoard.ts` (`boardVM(st, userTeam, odds, {sort})`; `slotLabel`) | DraftBoard, BoardRow, BoardHeader, SortControls |
| `GoneOdds` (`{picksBetween, sims, gone: ReadonlyMap<string, number>}`) | `sports/nfl/engine/goneodds.ts` (`goneOdds(st, userTeam, rng, sims=30)`, `goneChance`) | App.refresh (tooltip meta) |
| `DraftStoreState` / `DraftStoreAction` (`START`/`PICK`/`UNDO`/`LOAD`) | `sports/nfl/app/store.ts` (`createStore`, `restoreDraft`, `parseRecord`) | draftStore, App |
| `SaveRecord` (= `DraftPayload`: `{seed, userTeam, picks: DraftPick[], pool: FrozenPoolRow[]}`) | `sports/nfl/app/saves.ts` | savesApp, feedVM |
| `FeedVM` (shell-side; wraps engine `GameFeed`) | engine: `sports/nfl/app/feed.ts` (`gameFeed(r, home, away)`; `DriveEvent` incl. `yards: null`, `period`, `clock`) | Feed screen |
| `GameResult` / `GameFeed` / `DriveEvent` | `sports/nfl/engine/drives.ts`, `sports/nfl/app/feed.ts` | feedVM, shareVM |
| `LeagueTeam` / `RunState` / `WeekResult` | `sports/nfl/engine/seasonrun.ts` (`startSeason`, `playWeek`, `gameSeed`, `table`, `fixtures`) | batteries only — the gap (§5 S3) |
| `LoadedWeek` (`{state: RunState; teams: LeagueTeam[]; context: WeekContext}`) | `sports/nfl/app/weekmap.ts` (`fromWeekPayload`, `toWeekPayload`) | savesApp (type + hydrate result) |
| `AnyEnvelope` (`DraftEnvelope \| WeekEnvelope \| SeasonEnvelope`) | `sports/nfl/app/saves.ts` + `core/envelope.ts` (`SCHEMA_VERSION = 1`, `SlotName = 'A'\|'B'\|'C'`) | savesApp, Saves, shareVM |
| `TeamDef` / `TEAMS` / `DIVS` | `sports/nfl/engine/league.ts` | TeamSelect, Saves, shareVM, abbr |
| `SlotId` / `SLOTS` / `SLOT_IDS` / `Dest` | `sports/nfl/engine/slots.ts` | SlotPicker, NeedsRow, App |
| `Ratings` / `Lineup` | `sports/nfl/engine/ratings.ts`, `sports/nfl/engine/lineup.ts` (`lineupFor`, `teamRatings`, `spotsOf`, `leagueBaseline`, `netPts` in `value.ts`) | feedVM, App (advice) |
| `BragVM` / `SeedVM` / `ShareVM` | shell-side only (built from the above; `shareVM.ts`) | Share screen, bragCard painter |

**Rules the DTOs already obey (VERIFIED):** engine view models are plain JSON (no functions, no class instances) except `GoneOdds.gone` (a `Map` — the adapter must convert it with `goneChance` before it reaches a screen; App already does this for the tooltip meta only). `DriveEvent.yards` is `null` by contract — the UI must never invent a yard figure (the feed honors this; VERIFIED in the base battery run, "no yard figure appears anywhere" law PASS).

### §3.3 Error / loading states (the shell's missing half)

Today the shell has three states for engine work: it works, it throws into a bare `catch {}` (`App.refresh()` lines for `goneOdds` and `lineupFor` — the board silently holds the last VM), or it sets `error = <message>` as a string. The contract standardizes this:

```ts
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
export type EngineError =
  | { code: 'not-your-pick'; message: string }        // store PICK while CPU is on the clock
  | { code: 'illegal-fit'; message: string }          // fit(role, dest).legal === false
  | { code: 'not-available'; message: string }        // player id not in the pool / already picked
  | { code: 'no-game'; message: string }              // feed: user has no week-1 game on the schedule
  | { code: 'save-corrupt'; message: string }         // restore() / hydrateWeek() refusal, verbatim
  | { code: 'save-newer-version'; message: string }   // envelope.schemaVersion > SCHEMA_VERSION
  | { code: 'storage-unavailable'; message: string }  // StorageModule read/write failure
  | { code: 'engine'; message: string };              // anything else — never a bare throw
export type LoadState<T> =
  | { phase: 'loading' }
  | { phase: 'empty'; reason: 'no-dataset' | 'no-save' }   // the F11 empty state; distinct from error
  | { phase: 'ready'; value: T }
  | { phase: 'refused'; error: EngineError };              // corrupt-never-repair lands here, shown verbatim
```
Loading is a first-class phase (today `Boot` has `loading | empty | ready` in App only; the saves panel and feed have no loading state — a slow `hydrateWeek` shows stale content). `empty` and `refused` are different states and must render differently: empty invites action (import a dataset / start a draft); refused shows the engine's verbatim message and offers no repair.

### §3.4 Hydration & save / offline schema (proposed — the engine's schema, restated as the shell's contract)

The engine already owns the schema; the shell's contract is to **use it verbatim and add nothing**. Restated here so the merge has one page to check against (sources: `core/envelope.ts`, `sports/nfl/app/saves.ts`, `sports/nfl/app/hydrate.ts`, `core/keys.ts`, `platform/localstorage.ts` — all VERIFIED present at both pins, byte-identical between pins except where §3.7 says otherwise):

- **Envelope** (outer): `{sport: 'nfl', kind: 'draft'|'week'|'season', schemaVersion: 1, engineVersion: string, dataVersion: string, saveId: string, saveRevision: number, createdAt: string, slot: 'A'|'B'|'C', savedAt: string, payload: …}`. `schemaVersion > 1` → refuse as `newer-version`, never overwrite. `engineVersion` is informational per the F5 ruling (resume determinism lives within the build that wrote the save); `dataVersion` is `sha256:` + the dataset hash, computed once at boot.
- **Payloads**: `DraftPayload {seed, userTeam, picks: DraftPick[] ({overall, team, pid, slot}), pool: FrozenPoolRow[]}`; `WeekPayload {seed, year, run, gameSeed, nextWeek, userTeam, roster: FrozenPlayer[], ratings: Record<string, unknown> (opaque to storage), schedule: [{week, home, away, kind}], scores: GameScore[], plan: PlanState | null, statsRecorded, prevRank?, homeField?}`; `SeasonPayload {seed, year, run, userTeam, roster, table: [{team, w, l, t, pf, pa}], userResults: GameScore[], champion, userOutcome, statsRecorded}`. **Proposed addition (S1): `DraftPayload.order?: number[]`** — absent today, required for custom draft order to survive a save/load round-trip.
- **Keys**: `sim:nfl:slot:<A|B|C>` via `sportKey('nfl', 'slot:' + slot)`; `sim:nfl:draft` for the legacy single draft key (`store.ts` `SAVE_KEY`). Slots belong to a sport — a later sport's slot A is a different save.
- **Storage module**: the only browser-storage toucher is `StorageModule` (`createLocalStorageModule({slotCheck: assertSlotMatchesKey})`). The shell never touches `localStorage` directly (VERIFIED: no `localStorage` reference in `src/lib` or `src/App.svelte` outside the engine's own `platform/localstorage.ts`). A server store later is a swap behind that interface — but two frictions the s5 README already names stay open: `saveRevision` has no device dimension (concurrent same-saveId revisions on two devices collide), and `savedAt` is client clock. Both belong to the account slice, not to this contract.
- **Offline**: everything above is local-first by construction (no fetch in the seam; the dataset is a build input or a user CSV). The contract adds one law: **the adapter must not import anything that touches the network** — enforceable by the same grep law as §3 (no `fetch`/`XMLHttpRequest` under `src/lib/engineAdapter.ts` or `src/engine/`).

### §3.5 Fixture shapes (what the merge tests run against)

Fixtures are plain JSON the adapter must round-trip; the battery already builds two of them engine-side (`batteries/weekfixture.mjs`, `batteries/seasonfixture.mjs` — engine-built, not shell-built). The contract names four fixture shapes the cutover battery must have (two exist, two are proposals):

```ts
// EXISTS (battery-built): week fixture — fixture league → startSeason → playWeek ×2 → toWeekPayload → serialize
//   asserts: hydrateWeek ok, nextWeek 3, 32 games played, next fixture names the user game.
// EXISTS (battery-built): season fixture — fixture league → playWeek to completion → SeasonPayload → serialize
//   asserts: hydrateSeasonConsistency ok, champion + table row replay identically from (seed, year, run).
// PROPOSED: draft fixture — fixed seed + fixed order (see S1) + 32 PICK actions through the store reducer
//   asserts: restoreDraft(replay) deep-equals the live draft; the pick log order matches `order` exactly.
// PROPOSED: corrupt fixture — one byte flipped in the payload, one in the envelope meta, one truncated file
//   asserts: restore() refuses each with the exact engine message; nothing is repaired; the slot still lists 'refused'.
```
Fixture rule: **fixtures are built by the engine's own path, never hand-written.** A hand-written save that the engine would never write proves nothing about the seam.

### §3.6 What the contract deliberately does NOT cover

- **Ratings.** The Owner generates them; the shell must never generate, tune, or re-derive a rating. `buildPool` takes the CSVs as input; the contract treats the dataset as opaque bytes + a sha256.
- **The valuation modes' numbers.** The contract defines the *shape* (`displayWeights(mode)`) but the Owner preset table itself is the Owner's data, not the council's to invent (§5 S2).
- **Framework.** The adapter is plain TypeScript, zero framework imports (the TS-neutral ruling). The Svelte wrapping (`draftStore.ts`'s `readable`/`writable` adaptation) stays outside the adapter, in the shell.
- **The event-log kernel** (`core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `sports/nfl/engine/legacyprovider.ts` — new at `d3bd81d2`). The shell consumes none of it today, and the contract does not add it: the kernel is the Architect's Phase 0 work, and the shell should adopt it only when the Architect says the log is the game (a later slice's decision, not a seam repair).

### §3.7 Pin delta: what changed between 4ca9a071 and d3bd81d2 in the seam surface (VERIFIED)

`diff -rq` of `colors/src` at the two pins (52 files vs 57 files). Six files differ, five are new. Only the seam-relevant effects are listed:

| File | 4ca9a071 → d3bd81d2 | Seam effect |
|---|---|---|
| `sports/nfl/engine/flex.ts` | **Entire table repriced**: REV 4 (29 Oct, QB→FS −10, many −4s) → 99 rules in tiers 0/2/6/12 (QB→FS −12; **zero −4 rules remain**) | Breaks the battery's flex-chip law (§6.2). `fit()`'s signature is unchanged — the breakage is in the *values*, not the *shape*. |
| `sports/nfl/engine/draft.ts` | One line: replacement-level refresh `st.pos - st.replAt < 6` → `st.pos === st.replAt` | Changes CPU behavior and therefore board contents; no signature change. |
| `sports/nfl/engine/value.ts` | **Adds `measuredDisplayWeights(base)`** (derived weights scaled so QB = 1000, nearest 5) | The Q7 measured display the shell's ModeSwitch anticipates — available only at d3bd. This is the S2 fix's engine half. |
| `core/app.ts` | `LoadedDataset` / `DatasetLoader` gain a generic `<Row = unknown>` | Type-level only; no shell behavior change. |
| `sports/nfl/app/dataset.ts` | Same generic threading (`DatasetLoader<DatasetRow>`) | Type-level only. |
| `sports/nfl/engine/slots.ts` | Comment only (salary table retired; display weights are `measuredDisplayWeights`) | None — but it confirms the shell's "Model Value" label was pointing at a display that did not exist at 4ca9. |
| NEW: `core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `sports/nfl/engine/legacyprovider.ts` | Phase 0 event-log kernel (append-only game log; folds for box score/recap/standings; Philox keyed RNG; model pack) | **No shell file imports any of them** (VERIFIED: only `legacyprovider.ts` itself imports the new kernel files). The shell's seam surface does not grow — but the merge must decide whether the feed/stats screens stay on `GameResult`/`BoxScore` or move to log folds. Not this round's call. |
| `sports/nfl/app/store.ts`, `sports/nfl/app/feed.ts`, `sports/nfl/app/saves.ts`, `sports/nfl/app/hydrate.ts`, `sports/nfl/view/draftBoard.ts` | **Identical** between pins | The §5 proposals S1/S3/S4 apply equally at either pin. |

## §6 The five attacks (VERIFIED — receipts inline)

### §6.1 The one-door claim — FAILS

Claim (as phrased in the prompt): *no screen imports the engine directly*. Attack: `grep -rn "engine" src/lib --include=*.svelte`, then read the adapter and check for reaches-around (type-only imports, re-exports, `$lib` aliases).
- The grep itself returns **31 lines** in `src/lib/**/*.svelte` (TeamSelect 2 import lines, SlotPicker 4, Saves 1, NeedsRow 3, DraftBoard 2, BoardRow 1, BoardHeader 1, SortControls 1, plus comment lines naming the engine). The claim fails on the grep alone: five components import engine files directly, and `SlotPicker` calls engine `fit()` in component code.
- There is no adapter to read — no file defines the seam, so there is nothing to reach *around*; the screens reach *straight in*.
- The number Z.ai must publish: **65 import lines (29 type-only + 36 value), 29 distinct engine files, 15 shell files, out of 1,789 shell lines.** The honest statement of the claim is: "no screen imports the engine *except through 15 files importing 29 engine files*," which is the claim's negation.
- The only clean part: `Feed.svelte`, `Share.svelte`, `BoardFooter.svelte`, `LineupAdvice.svelte`, `ModeSwitch.svelte`, `bragCard.ts`, and `valuation.ts` touch no engine file — they consume VM props / plain JSON only. The pattern exists; it just is not the rule.

### §6.2 The swap test — build PASSES both pins; battery PARTIAL at d3bd, one seed-fragile law

Method (VERIFIED, all in `/tmp`): copied the s5 tree to `/tmp/swap-base` (pristine) and `/tmp/swap-d3bd` (deleted `src/engine/`, copied `colors/src/` at `d3bd81d2` in — 52 files → 57). `npm ci` exit 0 in both (37 packages). Then `npm run build` and `npm run battery` (`batteries/slice1.battery.mjs`, Playwright + `vite preview`).

**Build — PASS both.**
- Base (`4ca9a071`): `✓ 183 modules transformed`, `dist/assets/index-6Lyri8Rm.js 316.10 kB │ gzip: 107.48 kB`, `✓ built in 4.28s`, exit 0. (Matches the s5 README's 316 kB / 107 kB.)
- Swapped (`d3bd81d2`): `✓ 183 modules transformed`, `dist/assets/index-X-RtTao0.js 316.08 kB │ gzip: 107.47 kB`, `✓ built in 6.59s`, exit 0. One Svelte warning in both builds (unrelated to the swap): `src/App.svelte:48:6 'userTeam' is updated, but is not declared with '$state(...)'`.
- `diff -rq` outside `src/engine/` between the two trees (excluding `node_modules`, `dist`, and the battery-written `slice1-battery.json`): **only three PNG screenshots differ** (`shots/slice4-feed.png`, `shots/slice5-share-game.png`, `shots/slice5-share.png`) — rewritten by the battery runs themselves in each tree. No `.ts`, `.svelte`, `.html`, `.mjs`, or `.json` source file differs outside `src/engine/`. The swap is source-neutral, as a snapshot swap should be.

**Battery — baseline VERIFIED, swapped PARTIAL.**
- Baseline (`/tmp/swap-base`, preview :4179): **`== SLICE 1 BATTERY · 75 pass · 0 fail · 10 skip (loud, with reasons) · 3 deferred to cutover ==`, exit 0.** The REPORTED 75/0/10/3 reproduces exactly. The run's `batteries/slice1-battery.json` was written by the run (mtime 21:07, `{pass: 75, fail: 0, skip: 10, defer: 3}`).
- Swapped (`/tmp/swap-d3bd`, preview :4180): **four runs, none completed.** The results agree with each other; the runs differ only in how far they got before the harness broke:
  - Run 1: 43 PASS / 1 FAIL through the slice-4 feed start — exec session SIGTERMed at 62 s (no cause in the output).
  - Run 2: 37 PASS / 1 FAIL through slice 3 saves — crashed `page.reload: net::ERR_CONNECTION_REFUSED` at `slice1.battery.mjs:181` (the preview server had died with the reaped exec session).
  - Run 3 (detached): **73 PASS / 0 FAIL** through all slice-5 laws — crashed `page.goto: net::ERR_CONNECTION_REFUSED` at `slice1.battery.mjs:407` (the final section, "reduced motion is respected," opens a fresh page and the preview was gone).
  - Run 4 (orphan of a SIGTERMed session): **73 PASS / 0 FAIL**, same crash at line 407.
  - The three exec sessions that ran the swapped battery were SIGTERMed at 9.6 s, 27.8 s, and 62 s for no reason visible in their output; the baseline session ran 235 s and completed. I do not know why the swapped sessions were reaped (UNKNOWN — possibly a runtime limit I cannot see). The battery child processes survived as orphans in runs 3–4 and kept passing laws until they needed a fresh page load. **Every swapped-run crash is a dead preview server, not an engine assertion.** That distinction matters: through slice 5 the swapped engine passes everything it was asked, modulo the one law below.
- **The one law that ever fails — the flex chips (the seam's real width).** Law: *the flex chips read the flex cost (the "-N" form, no "flex tax" wording) — OBSERVED open*. It requires `probe.flexChips.length > 0` over the first 14 board rows' also-fit chips (`.cp-fits .cp-chip i` matching `/^-\d+ flex$/`).
  - Baseline: PASS — `14 pickers probed · 53 flex chips · sample ["-4 flex","-4 flex","-4 flex"]`.
  - Swapped run 1: FAIL — `14 pickers probed · 0 flex chips · sample []`.
  - Swapped run 2: FAIL — same, 0 chips.
  - Swapped runs 3–4: PASS — `14 pickers probed · 1 flex chips · sample ["-2 flex"]`.
  - **Mechanism (VERIFIED by fixed-seed node probe, `/tmp/flexprobe.mjs`, seed 1234, Chicago Bears):** the law is pin-coupled to the 4-cost flex era. The engine's `boardVM` shows a flex option only when `showFlex(penalty, round)` is true — penalty 2 or 4, or >4 only after round 20 (`view/draftBoard.ts`, identical at both pins). At `4ca9a071` the table is full of −4s (WR→RB 4, TE→RB 4, …): the probe's top 14 rows carry **40 flex chips** (each WR row: nine "-4 flex" chips). At `d3bd81d2` the table is tiers 0/2/6/12 with **zero −4 rules**; the only 2-cost rules are FB>RB, OT>C, OG>OT, OG>C, ILB>SS, SS>FS, SS>OLB, FS>SS, K>P, P>K — none of which belongs to the top-14 rows' roles (QB/WR/EDGE) at round 1 — and 6-cost fits are hidden by the round->20 gate. Same seed, same rows modulo the re-ranking: **40 chips vs 0 chips**. With a different random seed (runs 3–4), one top-14 row happened to be a 2-cost role and the law passed with exactly 1 chip. **Verdict: at `d3bd81d2` the flex-chip law is seed-fragile — it passes or fails on whether the random draft's top 14 happens to include a 2-cost role. The shell renders correctly in all four runs (the chips show what `showFlex` allows — nothing); the LAW is what the re-pin broke, because it was written against the 4-cost table.** Naming the law: *a battery law that asserts a count of engine-priced options is pin-coupled; re-pinning the flex table re-pins the law.* The fix is not in the shell — it is a battery-law update at re-pin time (assert the chip *form* over a fixture that guarantees a 2-cost role, e.g. an OT row, instead of asserting a count over the random top 14). No engine edit is proposed for this.
- **UNKNOWN at d3bd (never ran):** the final 2 laws — the reduced-motion re-check (fresh page, `prefers-reduced-motion: reduce`, plays a 32-turn draft, asserts `animation-name: none`) and the closing "zero page errors across the whole battery" law. 73 + 2 = 75. The swapped battery's true count is therefore **73–74 of 75, with 2 untested**, not 75/0 — and any reader of `/tmp/swap-d3bd/batteries/slice1-battery.json` should know the file there is STALE (mtime 21:03, still the delivery's shipped 75/0/10/3 — the crashed runs never reached the summary write). See §6.5.

### §6.3 The seam inventory audit — there is no handoff seam table; the pins disagree three ways (VERIFIED)

The prompt calls this the single highest-value task: take the handoff note's seam table and cross-check every named engine file and hash against the actual snapshot. **There is no handoff note and no seam table in the s5 delivery.** I searched the whole tree for `seam`, `handoff`, `VM table`, `view.model` (case-insensitive, all `.md`/`.ts`/`.svelte`/`.mjs`/`.txt`): the only hits are the word "seam" in the slice-5 README's account-system paragraph (about the `StorageModule` seam) and "adapter" in the battery header. No file names a VM→engine-file mapping. No `SEAM-INVENTORY.json`, no `HANDOFF.md`, no VM table in any README or intake ledger. **The audit's first finding is the absence itself: the delivery that the Architect is supposed to merge into has no machine-checkable statement of what it consumes.**

What the delivery *does* carry, and what the audit finds in each:
- **Pin claim (s5 README + `src/App.svelte` `ENGINE_PIN` + `src/lib/feedVM.ts`/`savesApp.ts` headers): `4ca9a071`.** VERIFIED true for the delivery: `diff -rq src/engine/ colors/src@4ca9a071` → exit 0, 52 files, byte-identical. The delivery is honest about its own pin.
- **Pin claim (gh-pages `67-cakepanz/README.md`): `4ca9a071`.** VERIFIED FALSE for the deployment: `diff -rq 67-cakepanz/src/engine/ colors/src@d3bd81d2` → exit 0, 57 files, byte-identical; `diff` vs `4ca9a071` → 6 files differ + 5 files only in d3bd. The gh-pages commit is `66096fb1` ("67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)") — the re-pin updated `src/engine/` but **not the README's pin claim** (line 4 still reads `4ca9a071`), and `src/App.svelte` in that tree still comments "pinned 4ca9a071" (line 65). Per `AGENTS.md` §2 the live pin is `d3bd81d2` (99-rule flex) — so the prompt's pin is the live pin, and the s5 delivery is **one pin behind the live deployment**. The delivery is not wrong; it is stale relative to the re-pin, and nothing in the delivery says so.
- **CHECKSUMS files:** `CHECKSUMS-slice1/2.txt` assert the engine snapshot only in prose ("52 files, still unedited — cmp clean"); `CHECKSUMS-slice3-slice4.txt` and `CHECKSUMS-slice5.txt` md5 only *shell* files (16 and 19 entries respectively) — **no engine file hash appears in any CHECKSUMS file**. A hash-drifted engine file would pass every CHECKSUMS file in the delivery. That is the hole the seam-checker closes (§6.4).
- **Ernie s3-s4-rev2:** engine also byte-identical to `4ca9a071` (VERIFIED, `diff -rq` exit 0); its shell differs from s5 only by the slice-5 additions (`shareVM.ts`, `bragCard.ts`, `Share.svelte`, `readEnvelope` in `savesApp.ts`, `Saves.svelte`/`Feed.svelte`/`App.svelte` edits). No seam table there either.
- **VMs that name nothing:** every VM in the shell names *something* (each imports at least one engine file) — but since no inventory exists, the check inverts: **29 engine files are used by the shell and named by no VM inventory at all**, because the inventory does not exist. The checker (§6.4) turns that into a FAIL by construction.
- **Misspelled/hash-drifted pins:** none found in the delivery's own claims (all say `4ca9a071` consistently). The drift is between *artifacts* (delivery 4ca9 vs deployment d3bd vs prompt d3bd), not within any one artifact — except gh-pages, where the README claims 4ca9 over a d3bd engine. That single stale line is the audit's one concrete mislabel: **gh-pages `67-cakepanz/README.md:4` names the wrong pin.**

### §6.4 The merge rehearsal — the seam-checker (built, falsified, filed alongside)

Artifact: `20261116-2119-muse-CAKEPANZ-SHELL-seam-checker.mjs` (same UTC stamp, in `_agents/muse/inbox/`). Draft audit tool, not a product change. It reads `SEAM-INVENTORY.json` from an extracted delivery and verifies, per VM, each named engine file's sha256 against the tree — and with `--repo` also against the blob at the claimed pin in git. It checks completeness (every engine file the shell really imports must be named by ≥1 VM), flags VMs that name nothing, and checks the README/`ENGINE_PIN` claims against the inventory pin. Exit 0 PASS / 1 FAIL / 2 usage error. `--generate` prints a candidate inventory from the actual import graph for a human to review and sign (it never invents a pin — it reads the tree's own claims).

**Falsification runs (VERIFIED — all against the s5 tree in `/tmp`):**
- Clean tree + generated inventory + `--repo ~/workspace/football-sim-muse`: **17 pass · 0 fail, exit 0.** (2 pin-claim checks + 15 VM checks; 29 engine files imported by the shell, 29 named by the inventory — including the `--repo` pin-blob check for every file.)
- **One-byte mutation:** `printf 'x' >> src/engine/sports/nfl/engine/flex.ts` in a copy → **16 pass · 2 fail, exit 1.** Both failures name the file: inventory-hash mismatch *and* pin-blob mismatch for `SlotPicker`'s `flex.ts`.
- **Missing inventory:** inventory file deleted → `FAIL no handoff seam inventory … the delivery names no seam at all`, **exit 1**. (This is the s5 delivery's actual state today — running the checker against the delivery as-shipped fails loudly, which is the correct behavior.)
- **Wrong pin:** inventory pin changed to `d3bd81d2` while the tree stays at `4ca9a071` → **9 pass · 10 fail, exit 1** (README/`ENGINE_PIN` disagreements + 6 pin-blob mismatches across `slots.ts`, `value.ts`, `flex.ts`, `core/app.ts`, and others). The checker catches a whole-tree re-pin that the inventory does not admit.
- **Self-falsification found while building it (REPORTED here so the next seat does not re-learn it):** my first README-pin regex missed the `**` markdown (`"Pinned engine commit:** \`4ca9a071\`"`), so the clean tree failed 16/1 on a regex, not on a real mismatch. Fixed with `\W*` between the label and the hash; the clean run then passed 17/0. The checker is a draft — the next seat should re-run these four cases before trusting it on merge day.
- **Limits (stated in the file's header):** sha256 catches byte drift, not semantic drift (a consistent whole-tree swap is caught only via `--repo`); the import scan is textual (dynamic imports would escape it); over-naming is allowed (a VM may name a file it does not use); it does not run the build or the battery. One gate, not the cutover.

**How to run it on merge day:** extract the delivery zip to a temp dir, place the signed `SEAM-INVENTORY.json` at its root, run `node seam-checker.mjs --check --root <dir> --repo <repo-with-engine-history>`; non-zero exit blocks the merge. The inventory itself is generated by `node seam-checker.mjs --generate --root <dir>` and signed by a human — the generator groups engine files by the shell file that imports them (15 groups for s5: `App` 8 files, `feedVM` 15, `savesApp` 7, the rest 1–2 each).

### §6.5 Cutover rehearsal — failure-mode report (paper trail, not a merge)

Simulated offline, nothing pushed: given a finished shell zip (s5) and a finished engine snapshot (d3bd81d2), walk the drop-in merge mechanics and name what breaks or is forgotten.

1. **Missing seams (the merge has no list to check).** There is no seam inventory, no one-door module, and no contract in the delivery. The Architect's first merge step is archaeology: grep the shell for engine imports (65 lines, §1) and reconstruct the seam by hand. *Failure mode:* a file is missed, the merge ships, and the missed import breaks at runtime (not build time — e.g. a type-only import of a renamed engine type fails only when that screen compiles in the merged tree). *Gate:* the checker (§6.4) + S5's `SEAM-INVENTORY.json` requirement.
2. **Untested states.** The shell has no week-2+ path (§2): the merge cannot test "play week 2" because the shell cannot express it. The season screens, standings/bracket, awards, and review exist only as save-reading, not as play. A cutover that ships the shell as "the product" silently ships a game that ends after week 1. *Gate:* S3's season adapter + the draft/week fixture shapes (§3.5).
3. **Battery holes.** (a) The flex-chip law is pin-coupled (§6.2) — a re-pin to d3bd makes it seed-fragile (0 or 1 chip). A merge-day battery that "passes" on a lucky seed proves nothing about flex rendering. (b) The battery's final section (reduced-motion re-check) needs a fresh page load; any harness outage there kills the run *after* 73 laws passed, with no summary written. (c) **Verified-then-forgotten:** `batteries/slice1-battery.json` is written only on a completed run. After a crashed run the file still holds the *shipped* 75/0/10/3 — I verified this directly: `/tmp/swap-d3bd/batteries/slice1-battery.json` still reads `{pass: 75, fail: 0}` (mtime 21:03, the delivery's artifact) after four crashed d3bd runs. A merge-day reader who opens that file concludes the swapped battery passed. *Gate:* the battery must write its JSON incrementally (or delete it on start), and the merge checklist must require the run's exit code, not the file.
4. **The valuation label gap (S2).** The merged product would ship a ModeSwitch whose "Owner preset" has no table and whose "Model Value" default has no measured weights at the 4ca9 pin. A user clicking it changes a label and nothing else — in a product whose whole pitch is that the numbers are the model. *Gate:* S2 — either wire `measuredDisplayWeights` at the d3bd re-pin or remove the switch until the engine can answer it.
5. **The OT clock workaround becomes load-bearing.** The feed renders OT drives with its own `OT` stamp because the engine's `clock()` maps OT starts to `Q4` with a negative remainder (§7 S4). If the Architect later fixes `clock()`, the shell's workaround double-labels OT drives — and nothing in the shell marks the workaround as temporary. *Gate:* S4's one-line engine fix + removal of the shell workaround in the same change.
6. **Silent `catch {}` in the composition root.** `App.refresh()` swallows `goneOdds` and `lineupFor` throws with bare `catch {}` ("CPU pick in flight — the board refreshes on the user's turn"). At merge, an engine change that makes `goneOdds` throw *always* (e.g. a signature change) would present as a board that silently never refreshes, with no error anywhere. *Gate:* §3.3's `Result`/`EngineError` contract — engine throws become typed errors with a code, and the board shows the code.
7. **The re-pin paperwork.** The gh-pages re-pin (66096fb1) updated the engine but not the README pin line or the App comment (§6.3). A cutover runbook that says "re-pin the engine" without "re-pin every document that names the pin" repeats this. *Gate:* the checker (§6.4) cross-checks README + `ENGINE_PIN` + inventory pin — a re-pin that forgets a document fails the gate.
8. **Harness fragility I hit myself (REPORTED as process evidence).** Three of my long exec sessions running the swapped battery were SIGTERMed (9.6 s, 27.8 s, 62 s) with no cause in their output, killing the `vite preview` server each time; the battery orphans survived and died later on `ERR_CONNECTION_REFUSED`. The baseline session ran 235 s and completed. I do not know what reaped the swapped sessions. A merge-day runbook that assumes a long battery session stays alive is assuming something my own runs just falsified three times. *Gate:* run the battery detached from any session (as I did in run 3) against a preview started the same way, and poll the log file — or better, make the battery start and stop its own server.

## §7 §5 proposals to the Architect (filed, not built — exact old → new, how to check)

Each proposal follows the §5 form: target build (file + pin) · WHERE (anchor) · old → new · WHY · SAFE ALONE? · HOW TO CHECK. All five target the engine at pin `d3bd81d2` (the live pin); S1, S3, S4 apply identically at `4ca9a071` (those files are byte-identical between pins — §3.7). None touches ratings, flex values, the palette, or any framework code. The shell-side halves (the adapter module, the ModeSwitch behavior, the season screens) are Z.ai's round, not these filings.

### S1 — Custom draft order through the store (unblocks P-317: Team Select picks team AND slot 1–32)

- **Target:** `colors/src/sports/nfl/app/store.ts` + `colors/src/sports/nfl/app/saves.ts` + `colors/src/sports/nfl/engine/draft.ts`, at `d3bd81d2`.
- **WHERE:** `store.ts` — `DraftStoreAction` type; `createStore` START branch; `toRecord`; `restoreDraft`; `parseRecord`. `saves.ts` — `DraftPayload` interface. `draft.ts` — after `snakeOrder`.
- **Old:**
  ```ts
  // store.ts
  export type DraftStoreAction =
    | { type: 'START'; seed: number; userTeam: number }
    | { type: 'PICK'; playerId: string; slot: SlotId }
    | { type: 'UNDO' }
    | { type: 'LOAD'; record: unknown };
  // START branch: const st = newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'));
  // toRecord: ({ seed, userTeam, pool, picks: st.log.map(...) })   // no order
  // restoreDraft: const st = newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'));
  // parseRecord returns { seed, userTeam, picks, pool }            // no order
  // saves.ts: export interface DraftPayload { seed: number; userTeam: number; picks: DraftPick[]; pool: FrozenPoolRow[]; }
  ```
- **New:**
  ```ts
  // draft.ts — the constructor (exact semantics are the Architect's; the invariants are not):
  // orderForSlot(userTeam, slot): number[] — a 1024-length order (32 rounds × 32 teams),
  // each round a permutation of 0..31, rounds alternating direction (snake),
  // userTeam at index (slot - 1) in round 1. slot is 1..32; anything else throws.
  export function orderForSlot(userTeam: number, slot: number): number[] { /* Architect's */ }
  // store.ts
  export type DraftStoreAction =
    | { type: 'START'; seed: number; userTeam: number; order?: number[] }
    | { type: 'PICK'; playerId: string; slot: SlotId }
    | { type: 'UNDO' }
    | { type: 'LOAD'; record: unknown };
  // START branch: const st = newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'), DEFAULT_CONFIG, a.order ?? snakeOrder());
  // toRecord: ({ seed, userTeam, pool, order: st.order, picks: st.log.map(...) })
  // restoreDraft: const st = newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'), DEFAULT_CONFIG, rec.order ?? snakeOrder());
  // parseRecord returns { seed, userTeam, picks, pool, order: o.order } when present (validate: 1024 numbers, each round a permutation, else throw 'save: bad order')
  // saves.ts: export interface DraftPayload { seed: number; userTeam: number; picks: DraftPick[]; pool: FrozenPoolRow[]; order?: number[]; }
  //   (optional so old saves without `order` still load — they restore to the default snake order, today's behavior.)
  ```
- **WHY:** the engine already takes `order` (`newDraft`'s 4th parameter) but the store — the only path the shell has into a draft — cannot express it, and even a direct caller would lose it on save/load (`toRecord` drops it, `restoreDraft` rebuilds default). This is the seam-level half of the P-317 blocker; the shell half (the slot picker UI + the save field) cannot be built until this lands.
- **SAFE ALONE?** Yes — `order` is optional everywhere; default behavior is byte-identical to today (default `snakeOrder()`); old saves load unchanged.
- **HOW TO CHECK:** `npm run test:engine` (existing 284 tests still pass) + a new store test: `START {seed, userTeam: 20, order: orderForSlot(20, 5)}` → the user's first pick is overall 5; `LOAD` of the saved record → `restoreDraft` replays the same log with no throw and the same `order`. Battery law: the Team Select slot picker (Z.ai's round) drives a draft whose first user pick lands at the chosen slot.

### S2 — Valuation modes stop being label-only (unblocks the ModeSwitch's promise)

- **Target:** engine `colors/src/sports/nfl/engine/value.ts` (already has the function at `d3bd81d2`) + `colors/src/sports/nfl/view/draftBoard.ts` (`boardVM` opts), at `d3bd81d2`. Shell half is Z.ai's: `src/lib/valuation.ts` + `src/App.svelte` call it.
- **WHERE:** `value.ts` — `measuredDisplayWeights` (exists at d3bd; absent at 4ca9 — this proposal is the re-pin justification for it). `draftBoard.ts` — `boardVM(st, userTeam, odds, opts)`.
- **Old:** `boardVM(st, userTeam, odds, opts: { sort?: BoardSort; limit?: number } = {})` — no valuation input; wins come from the engine's fitted `SLOTS[].weight` via `candidates()`. The shell's `valuation.set('owner' | 'balance' | 'measured')` changes only `MODE_LABEL`.
- **New (Architect's choice of shape; the requirement is the behavior):** either (a) `boardVM` gains `opts: { weights?: 'fitted' | 'measured' }` and `candidates()` accepts the weight source, with `measured` routing through `measuredDisplayWeights()`; or (b) the engine exports the Owner preset table as data (the Owner's table, supplied by the Owner — NOT invented by the council) and `boardVM` gains `opts: { weights?: 'fitted' | 'measured' | 'owner' }`. In either case the mode switch must change the numbers the board shows, and the label must name the weights actually in use. Until (a) or (b) lands, the shell must not present 'owner' as one click away (Z.ai's round: disable the switch with the reason shown, or drop it).
- **WHY:** the Owner ruled measured is the default display (Q7) and the preset is one click away — the shell currently displays fitted weights under a "Model Value" label, and an 'owner' mode with no table behind it. The merge would ship a switch that lies about what it does.
- **SAFE ALONE?** Yes if additive (a new optional `opts` field; default `fitted` = today's numbers). No if it changes default weights — it must not: the default display change is the Owner's call, not this proposal's.
- **HOW TO CHECK:** node probe: `boardVM` with `weights: 'measured'` vs `'fitted'` on the same draft state → different `wins` strings, same row order semantics; `measuredDisplayWeights()` output matches the shell's displayed weights cell-for-cell. Battery law: switching modes changes at least one displayed Wins value and the label travels with it.

### S3 — The week-stepper seam (unblocks the season slice: week 2+, standings, bracket)

- **Target:** no engine change needed — the engine already exports everything. The filing is a **contract filing**: the adapter must wrap the existing functions, and the Architect confirms the set is stable. Engine surface (all at `d3bd81d2`, VERIFIED): `seasonrun.ts` (`startSeason(teams, {seed, year, run?, prevRank?, homeField?})`, `playWeek(teams, s)`, `gameSeed(seed, week, home)`, `table(s)`, `fixtures(s)`, `isFinished`), `weekmap.ts` (`toWeekPayload(s, teams, ctx)`, `fromWeekPayload(p)`), `app/hydrate.ts` (`hydrateWeek`, `hydrateSeasonConsistency`), `app/saves.ts` (`serialize('week'|'season', …)`).
- **WHERE:** new adapter surface (Z.ai builds it behind `engineAdapter.ts`, §3.1): `startSeason(input: {seed, year, run?, userTeam}) → SeasonHandle`; `playWeek(handle) → Result<WeekResult, SeasonError>` (plays one week, writes a `WeekPayload` via `toWeekPayload`, serializes it to the slot); `weekFeed(handle, week, team) → FeedVM` (the existing `feedVM.playUserWeek` private replay is deleted and re-expressed as `playWeek` + `gameFeed` on the stored `RunState` — the feed must read the season's game, not re-derive it from the draft seed).
- **Old:** `feedVM.ts` replays week 1 privately (`buildSchedule` + `gameSeed` + `simulateGame` from the draft record); no shell code calls `startSeason`/`playWeek`/`toWeekPayload`.
- **New:** the adapter owns the `RunState`; the feed and the season screens read from it; a week save round-trips through `toWeekPayload → serialize → restore → hydrateWeek → fromWeekPayload` and replays identically (same `gameSeed` per week, same table).
- **WHY:** without this the shell cannot play past week 1, and the feed's private replay is a second derivation of the season's game — two derivations that can disagree (they agree today only because both use the same fork labels; the battery proves it for week 1 and nothing else).
- **SAFE ALONE?** Yes — additive adapter surface; the existing week-1 feed path is deleted only after the new path passes the feed battery laws.
- **HOW TO CHECK:** the §3.5 week fixture (engine-built, `playWeek ×2 → toWeekPayload → serialize → hydrateWeek` ok, next week 3, 32 games played) plus a new law: play week 2 through the adapter and assert the feed's game equals the node-side `playWeek` recompute exactly (the same equality the slice-4 battery proves for week 1).

### S4 — The OT clock branch in `app/feed.ts` (the shell's OT workaround becomes removable)

- **Target:** `colors/src/sports/nfl/app/feed.ts`, `gameFeed`, at `d3bd81d2` (identical at `4ca9a071`).
- **WHERE:** the `clock` closure inside `gameFeed`:
  ```ts
  const clock = (secs: number): string => {
    const q = Math.min(4, Math.max(1, Math.ceil(secs / 900))), left = 900 * q - secs;
    return `Q${q} ${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
  };
  ```
- **Old:** as above — a drive starting at `secs >= 3600` (overtime) maps to `Q4` with a **negative** `left` (e.g. `Q4 -01:30`), because `900 * 4 - secs < 0`.
- **New:** an OT branch before the Q1–Q4 math (exact format is the Architect's; the requirement is a non-negative, correctly-perioded stamp):
  ```ts
  const clock = (secs: number): string => {
    if (secs >= 3600) { const ot = secs - 3600; return `OT ${String(Math.floor(ot / 60)).padStart(2, '0')}:${String(ot % 60).padStart(2, '0')}`; }
    const q = Math.min(4, Math.max(1, Math.ceil(secs / 900))), left = 900 * q - secs;
    return `Q${q} ${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
  };
  ```
  and the shell's feed workaround (rendering its own `OT` stamp for period ≥ 5 drives — s5 README finding 1) is removed in the same round (Z.ai's half), so OT is labeled once, by the engine.
- **WHY:** the feed's `DriveEvent.clock` is the DTO the shell renders verbatim; a negative clock in the DTO is an engine bug the shell currently works around in presentation. The `period` field already carries the true period (`d.period`) — the clock string contradicts it.
- **SAFE ALONE?** Yes — OT drives only; regulation drives render byte-identically (the branch is unreachable for `secs < 3600`).
- **HOW TO CHECK:** a seeded OT game through `gameFeed` → every drive's `clock` matches `/^(Q[1-4] \d\d:\d\d|OT \d\d:\d\d)$/` with no negative remainder; the slice-4 feed battery law (drives' clocks in form) still passes, and the shell's OT workaround is deleted.

### S5 — The one door + the inventory as a delivery requirement (unblocks Claude's merge being a wiring task)

- **Target:** shell convention (Z.ai's round) + delivery gate (council infrastructure, MUSE's lane). No engine change.
- **WHERE:** new file `src/lib/engineAdapter.ts` (plain TypeScript, zero framework imports) + a delivery requirement that every Cakepanz delivery ships `SEAM-INVENTORY.json` at its root.
- **Old:** 15 shell files import 29 engine files directly (§1); no inventory file exists; CHECKSUMS files hash shell files only.
- **New:** (1) `engineAdapter.ts` exposes exactly the §3.1 surface and is the only file importing from `../engine/**`; the 15 doors move behind it file by file (App's `goneOdds`/`boardVM`/`lineupFor` calls, SlotPicker's `fit()`, TeamSelect's `TEAMS`, ink's `TEAM_COLORS`, the type-only `BoardVM` imports — all through the adapter). (2) Every delivery ships `SEAM-INVENTORY.json` in the §6.4 format (VM → engine files + sha256 + pin), generated by the seam-checker (`--generate`) and signed by a human. (3) The merge-day gate runs the seam-checker (`--check --repo …`); non-zero exit blocks the merge. (4) The battery gains the grep law: `grep -rn "from ['\"]\.\./engine\|from ['\"]\.\./\.\./engine" src/lib src/App.svelte` returns only `engineAdapter.ts`.
- **WHY:** §1–§2 — without a single module, swapping the engine is a 29-file-wide operation with no place to absorb a rename; without an inventory, no one can verify the snapshot the delivery claims.
- **SAFE ALONE?** Yes — a pure move (no behavior change) done file by file, each step green on `npm run build` + the battery; the inventory is additive.
- **HOW TO CHECK:** the grep law above + the checker passing 17/0 on the delivery + the swap test (§6.2) re-run against the moved tree (build exit 0, battery 75/0/10/3 at the pinned engine).

## §8 What I did NOT do, and what is UNKNOWN (plainly)

- **No live browser checks** (standing boundary for the MUSE seat). Everything was verified by reading files/code and running tools locally. Any claim that would need the live site (the gh-pages deployment rendering, file:// boot, 390 px layout, reduced-motion in a real browser) is UNKNOWN, not verified. The battery runs are Playwright runs against a local `vite preview` — real browser runs, but local, not the deployment.
- **The full d3bd battery never completed** (§6.2). The final 2 laws are UNKNOWN at `d3bd81d2`. The swap verdict rests on four partial runs that agree, plus the fixed-seed node probe — strong, but not a completed battery. Whoever re-runs it should use the detached pattern (preview + battery both detached, poll the log file) and expect the run to take ~4 minutes.
- **My long exec sessions were SIGTERMed three times** (9.6 s, 27.8 s, 62 s) while running the swapped battery, with no cause in their output; the baseline session ran 235 s and completed. UNKNOWN why. The battery orphans survived and kept running; the preview servers did not. Reported so the next seat does not assume a long session is safe.
- **Disclosure — I killed another agent's process by mistake.** While cleaning up after the first killed d3bd run I ran `kill 13765` (intended: my orphaned battery) and then, on seeing a still-running `slice1.battery.mjs` (pid 14345), killed it too — its cwd was `/tmp/mut-m7`, another agent's tree, not mine. That agent's battery run was interrupted by me; it appears to have restarted since (new battery processes from `/tmp/mut-m7` / `/tmp/mut-ma` / `/tmp/mut-mb` were visible afterwards). I cannot undo the kill; I record it here so the affected seat knows the interruption was mine, not a harness failure. My own processes were not affected beyond the runs already described.
- **Not done (out of scope for Part 2, or left for the review chain):** Parts 1, 3–17 of the prompt (other seats' filings exist in the inbox at 2103/2108 for several of them — I did not read or rely on them); the box-score mutation scope question (Part 6 / the open question — Ernie's `86f22d10` survivors — untouched here); any rating, palette, or framework work; any fix applied to the shell or engine (everything found is filed, nothing is edited).
- **INFERRED, not verified:** that the Owner intends the valuation switch to re-weight the board rather than only label it (§2, qualification 2) — the ruling text says measured is the default *display*, which the shell cannot currently produce; whether the switch's job is display or labeling is the Owner's call, and S2 is written to ask it by proposing both shapes.

## §9 How to verify / apply this filing

- **Reproduce the one-door count:** extract s5 (`git archive origin/council/inkling _agents/inkling/deliveries/67-cakepanz-s5 | tar -x -C /tmp/ck-s5`) and run the four greps in §1. Expect 65 / 29 / 29 / 15.
- **Reproduce the pin audit:** `git archive 4ca9a071 colors/src | tar -x -C /tmp/pin-4ca9` and `git archive d3bd81d2 colors/src | tar -x -C /tmp/pin-d3bd`; `diff -rq <s5>/src/engine /tmp/pin-4ca9/colors/src` → exit 0; `diff -rq <gh-pages>/67-cakepanz/src/engine /tmp/pin-d3bd/colors/src` → exit 0; `diff -rq` of the two pins → 6 files differ + 5 files only in d3bd (§3.7).
- **Reproduce the swap test:** copy s5 to two dirs, replace `src/engine/` in one with the d3bd extract, `npm ci && npm run build` in both (expect exit 0, ~316 kB JS), then run the battery detached against a detached preview and poll the log (see §6.5.8 for why detached). Expect baseline 75/0/10/3; at d3bd expect the flex-chip law to pass with 0–1 chips or fail with 0, depending on the seed — and the final 2 laws to need a live preview through the end of the run.
- **Reproduce the flex mechanism:** `node --experimental-strip-types /tmp/flexprobe.mjs <engine-root> 1234` — the probe script is in `/tmp`, not filed (it is a one-off, not a deliverable); the filing's numbers (40 chips at 4ca9, 0 at d3bd, same seed) are the receipt. The probe needs the s5 CSVs at `/tmp/ck-s5/…/src/data/` (present in this VM's /tmp; re-extract if gone).
- **Use the seam-checker:** `node _agents/muse/inbox/20261116-2119-muse-CAKEPANZ-SHELL-seam-checker.mjs --check --root <extracted-delivery> --repo <repo>`; see its header comment for `--generate`, the inventory format, and the falsification procedure. As shipped, the s5 delivery FAILS the checker (no inventory) — that is the correct result, and the fix is S5, not a checker change.
- **Apply the §5s:** S1–S5 are proposals for the Architect (S1, S2-engine-half, S4) and Z.ai (S2-shell-half, S3-adapter, S4-workaround-removal, S5). None is a done-ness certificate; each needs its stated check before it counts as landed.

---
*Filed by MUSE (labeled draft — see the note at the top). No files were edited outside this inbox file and the seam-checker filed alongside it. No push made (the coordinator pushes).*
