SPEAKER: DS | ROLE: advisor | TASK: platform vision — shared app shell vs independent sport engines | DATE: 2026-11-13T01:22Z

FOR: P-345

**One line.** The architecture the Owner and GPT are asking for already exists in Colors as a layout law — `core/` (sport-free contracts) + `platform/` (browser glue) + `sports/nfl/{engine,app,view}`. The useful work is not to design a new shell. It is to finish the two places where a sport shape leaks into `core/`, name the one shared capability that is genuinely missing (history/record book), and prove the boundary with a toy sport module before basketball is real.

## 0. What I inspected (receipts)

- `origin/architect/engine-and-seats` at `bebe8e0b` (fetched 2026-11-13T01:22Z; tip unchanged).
- `colors/src`: 57 `.ts`, **0 `.svelte`** (VERIFIED: `git ls-tree -r --name-only origin/architect/engine-and-seats -- colors | grep -c '\.svelte$'` → 0). Layout: `core/` 14 files, `platform/` 1, `sports/nfl/` 42 (`app/` 12, `engine/` 26, `view/` 4).
- `git grep` over `colors/src/sports/nfl/engine` for `window|document|localStorage|sessionStorage|indexedDB|Math.random|Date.now|new Date(` → **no matches** (VERIFIED). Over `colors/src/core` for `sports/` imports → no imports, only comments (VERIFIED).
- `colors/test/nfl/purity.test.ts` (VERIFIED, lines 17–33): bans DOM, `Math.random`, `Date.now`, `new Date`, `performance.now`, `process.`, `require(`, storage; requires imports to be sibling engine files or `../../core/*.ts`; and includes a planted-violation check that the check itself can fail.
- The other three layers have the same test: app layer at `colors/test/nfl/store.test.ts:96`, view layer at `colors/test/nfl/viewboard.test.ts:61`, core namespacing at `colors/test/core/namespacing.test.ts:128` (VERIFIED: test names and banned-token lists read).
- `colors/src/sports/nfl/app/store.ts:1` (VERIFIED): "framework-free, so Svelte (store contract) and React (`useSyncExternalStore`) wrap the same object."
- Absence checks (VERIFIED by grep, not inference): no payload migration function; no code writes the reserved `slot:A:bak` key; no `storage` event listener or `BroadcastChannel`.

## 1. The line as it exists today

| Layer | Path | Owns | Must never know |
|---|---|---|---|
| **Domain engine** | `sports/<id>/engine/` | rules, ratings, simulation, folds' inputs | browser, app, storage, UI, clock, ambient randomness |
| **Sport app** | `sports/<id>/app/` | payload schemas, validation/hydration, reducers, feed mapping, the sport's profile block, engine/data stamps | the DOM, the framework, the storage backend |
| **Shared franchise kernel** | `core/` | save envelope, autosave queue, profile container, key scheme, player ids, event log + folds, model pack, RNG/hash | any one sport's concepts |
| **Platform** | `platform/` | the only file that may touch browser storage | the domain |
| **View** | `sports/<id>/view/` | view models the UI renders | storage, engine internals |

This is GPT's 10C already built in miniature. The important correction to his wording: `core/` is **not** "shared UI". It is the **document format + runtime contracts**. That is the part worth sharing.

## 2. The Owner's five shared capabilities: status, not a wish list

| Capability | Existing artifact | Status | What is actually missing |
|---|---|---|---|
| Save management | `core/envelope.ts`, `core/saver.ts`, `platform/localstorage.ts`, `sports/nfl/app/saves.ts` | **Exists (v1)** | payload migration; backup/recovery; two-tab conflict; quota error taxonomy |
| Franchise navigation | `sports/nfl/app/appstate.ts` (`Screen`, `Phase`) | **Partial** | the phase/screen lists are an NFL union; make them sport-supplied only when a second sport is real |
| User preferences | `core/profile.ts` + `sim:settings` | **Exists, correct** | nothing structural; the sport block is the right pattern |
| History presentation | `saveId`/`saveRevision` lineage; `sports/nfl/app/outcome.ts` | **Partial** | no cross-save record-book shape; no generic history row |
| Common visualization | none | **Missing** | three headless shapes, not a chart library |

Details that matter:

- **Save management.** `core/envelope.ts` already carries `sport`, `kind`, `schemaVersion`, `slot`, `saveId`, `saveRevision`, `engineVersion`, `dataVersion`, and refuses a `newer-version` save. `core/saver.ts` queues per key with revisions and retries; `platform/localstorage.ts` is the only browser-storage file. Missing: (1) **migration** — there is no v0→v1 payload path, only refusal; `sports/nfl/app/legacy.ts` is a key rename (`zpb:*`→`sim:*`), not a schema migration. (2) **Recovery** — `slot:A:bak` is reserved in `core/keys.ts:3` but no code writes it. (3) **Two tabs** — no `storage` event listener or `BroadcastChannel`, so the last writer wins silently. (4) The envelope requires `schemaVersion`; an envelope without it is `corrupt`, not v0. If any pre-envelope save is meant to be recoverable, it needs an explicit v0 path; if not, the Owner should close that requirement deliberately.
- **Franchise navigation.** `appstate.ts` has `Screen = 'teamSelect' | 'draft' | ...` and `Phase = 'noSave' | 'drafting' | ...`. That is correct for one sport and should stay where it is. Do not generalize it on speculation; the second sport will say which of those phases are universal (probably `noSave`, `inSeason`, `seasonOver`) and which are football words (`draft`, `playoffs`).
- **Preferences.** `core/profile.ts` is already the right shape: `{v, createdAt, sports: {<id>: block}}`, and it preserves a sport block written by a newer build. This is the model for the whole shell: **the shared container never drops a sport it does not know**.
- **History.** Save lineage exists, and `outcome.ts` records the user's season exactly once, but there is no cross-save record book. This is the one genuinely missing shared capability. The shape should be rows, not prose: `{ sport, saveId, season, team, outcome, champion, awards[], records[] }`, with the sport supplying the rows and the shell owning storage, ordering and rendering.
- **Visualization.** Do not add a chart library. Add three headless shapes — `Series` (x/y points), `Table` (columns/rows), `Comparison` (two sides, shared rows) — and render them with the framework's own markup. Build the first one with the first real screen that needs it, not before.

## 3. The SportModule contract (minimal, serializable)

```ts
// One module object per sport. Functions live on the module; state/commands/events are plain JSON.
interface SportModule<S, Cmd, Ev> {
  id: string;                      // 'nfl'
  label: string;
  engineLabel: string;             // 'nfl1'
  saveKinds: readonly string[];    // ['draft','week','season']
  phases: readonly string[];       // ['drafting','inSeason','playoffs','seasonOver']
  screens: readonly string[];      // ['teamSelect','draft','season','standings','playoffs','summary']
  rulesText(): string;             // feeds engineVersion = label + hash53(rulesText)
  parsePayload(kind: string, raw: unknown): Result<S>;     // the sport's inner save check
  reduce(state: S, cmd: Cmd): { state: S; events: Ev[] };  // synchronous, no I/O
  project(state: S): ViewModel;    // what the shell renders
  history(state: S): HistoryRow[]; // season/award/record rows, generic columns
}
```

Rules:

- `now: Date` and `seed: number` are arguments, never ambient.
- No function, class instance, `Map`/`Set` or `undefined` crosses the boundary (the envelope's `serialize` already enforces this).
- `parsePayload` is the only place a sport's payload shape is known; storage keeps `payload` opaque.
- `history` returns rows, not football sentences; the shell formats.
- This is deliberately smaller than "an engine interface". The shell does not call `simulateGame`; the **app layer** does, and the shell only sees state/commands/events. That keeps the engine port free to change without touching the shell.

## 4. The boundary test: a toy sport, not a second real sport

`sports/toy/` — 4 teams, 3 rounds, 2 roles, a coin-flip resolver, one stat, one save kind, 3 phases. It runs through the real shell: create a franchise, save, reload, view history, switch to NFL and back.

**Pass:** only `sports/toy/` is added plus one line in `SPORT_IDS`/`SAVE_KINDS` (`core/envelope.ts:8,11`); zero changes to `core/`, `platform/`, or the shell UI.

**Fail — each is a finding about the contract, not the toy:**

- the toy needs a football concept (week, drive, down, quarter);
- the toy needs a `core/` change beyond the registry line;
- the shell branches on `sport === 'nfl'`;
- history needs a sport-specific column the shell cannot render.

Cost: about one agent-day; it never ships. This is the smallest version of Q11 worth building — and it is also the cheapest way to test the framework: the same toy must run in whichever framework wins.

## 5. Q11 — the platform concept, honestly

The primitive already exists: `core/pack.ts` — a model pack is `rules` (data, not code), `params`, `provenance`, `hash`, and the save stores the pack hash. That is the seed of a "simulation-design surface": the numbers a sport runs on are already an editable, versioned document.

What is shared across simulations: participants, roles, a schedule, a contest resolver, a stat fold, a history record, a save lineage. That is the shell.

What is not shared: the resolver, the rating model, the rule grammar, the calibration.

Smallest useful version: a **pack editor for the toy sport** (positions, rounds, scoring, one stat), not a visual simulation builder. If the toy runs, the authoring surface is a form over the same descriptor.

The warning: do not let "design your own simulation" generalize the engine. Football's credibility comes from its calibrated domain model; a universal engine trades that away. The platform is a franchise/league OS with pluggable sport modules, not a universal simulator.

## 6. Q2 — AI writes 100%: what changes

It changes contract discipline, not the framework.

- Agents fill local patterns and ignore implicit boundaries. So: one obvious place per concept; schema-first types; mechanical guards; planted-violation tests (the purity test is the model).
- The framework is a renderer. `store.ts` is framework-free; Svelte and React wrap the same object. The framework test therefore measures rendering + agent ergonomics, not architecture. Choose the framework that best wraps an external store and renders view models; reject any that wants to own state.
- A shell larger than the duplication it prevents will not be used. Agents will copy the second engine rather than learn the shell. The shared path must be the path of least resistance — small, typed, and enforced by a test that fails loudly.

Per layer, briefly: CSS → tokens + plain CSS, no library until a second consumer; framework → whichever wins the test (the app layer is already framework-free); bundler → the framework's default, pinned, no custom build; CDN → none (self-contained/static); compute → browser now, Node/server later behind the same engine port; database → none until server leagues, then relational (the envelope is a document, but history and leagues are relational); deployment → static host now, one small server only when authoritative multiplayer is real.

## 7. The other questions, short

**Q1 — testable today?** Yes: `node --test --experimental-strip-types`, the purity test, no browser globals. What would break in Node: nothing in the engine; the app layer needs an injected storage adapter, which it already has.

**Q1 — server-authoritative?** Command → validate → `simulateGame(state, seed)` → events/state. The envelope and event log are already the wire format. Missing: a command envelope with an idempotency key.

**Q1 — many concurrent leagues?** The engine is not the bottleneck (pure, seedable); draft-room coordination and DB writes are. One league = one event log + one save lineage; scale by league, not by game.

**Q5 — boundary enforced?** Already enforced at four layers, mechanically: engine (`test/nfl/purity.test.ts`), app (`test/nfl/store.test.ts:96`), view (`test/nfl/viewboard.test.ts:61`), core namespacing (`test/core/namespacing.test.ts:128`). The one leak is `core/app.ts:39`: `LoadedDataset.rows` is an NFL 8-field tuple in a file whose header says "sport-free". Fix: make rows opaque (`readonly unknown[]`) and let the sport's codec interpret them, or move `LoadedDataset` into `sports/nfl/app/dataset.ts` and keep only the loader contract in core. The closed `SPORT_IDS` union is not a leak — adding a sport costs one line in `core/envelope.ts`, which is the right price; a plugin registry would be overengineering.

**Q6 — persistence?** Version, `saveId`, `saveRevision` and `newer-version` exist; migration, backup and two-tab conflict do not (receipts in §2).

## 8. What I would not share, and what would falsify this

**Not shared:** flex/lineup optimizer, ratings, play model, calibration, stat semantics, award rules, schedule structure.

**Not now:** monorepo, package boundary, plugin registry, generic entity/attribute model, visual simulation editor.

**Falsifiers:** shared code < ~15% of the app and every screen branches on sport; the second sport needs a save lifecycle the descriptor cannot express; the toy needs football concepts; agents copy rather than import.

## 9. Sequence

1. **Now (football):** keep the purity test; fix the `LoadedDataset` leak; add the two-tab and interrupted-write tests; do not build the shell.
2. **Framework test:** treat the app layer as fixed; measure the renderer.
3. **Server:** reuse the envelope + event log; add a command envelope and idempotency.
4. **Basketball greenlight:** run the toy test first; then `sports/nba/`; copy `sports/nfl/app` patterns once; extract on the second use (rule of two).

## 10. Two corrections to GPT's 10C

1. "Share application infrastructure" is right, but the durable shared artifact is the **save envelope + event log**, not the UI. A UI-only shell drifts; a document-format shell gives every sport history, replay and multiplayer for free.
2. "Sport-independent application shell" should be "sport-independent **franchise kernel**". A shell implies screens; screens are the cheapest thing to duplicate and the most expensive to generalize. The kernel is the state machine + document + ports.
