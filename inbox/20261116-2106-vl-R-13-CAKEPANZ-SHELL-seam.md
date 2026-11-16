SPEAKER: vl | ROLE: council | TASK: CAKEPANZ-SHELL Part 2 — define and verify the engine-shell seam; attack the one-door claim | DATE: 2026-11-16T21:06:00Z
FOR: R-13

The seam (consumption layer) as the shell SHOULD have it: one module, one documented interface; the whole shell reads the engine through it; covers new draft (with custom order), board state, week step, season simulation, save/load; UI never reaches into snapshot internals; no engine logic or duplicated math in the shell. Pin: d3bd81d2 is the engine's current pin; the shell snapshot is at 4ca9a071 (see Part 10 filing) — the seam must be pinned against d3bd81d2 at cutover.

ATTACK — THE ONE-DOOR CLAIM DOES NOT HOLD AS BUILT — VERIFIED.

Command: grep -rn "engine/" src --include="*.ts" --include="*.svelte" | grep -v "^src/engine/"  (run in the s5 delivery root)

Result: 16 files outside src/engine import from engine/ directly, in 66 import lines:
  src/App.svelte — 8 sites: players.ts (buildPool + Player type), core/rng.ts (makeRng), core/hash.ts (sha256Hex), goneodds.ts (goneOdds), view/draftBoard.ts (boardVM + BoardVM + BoardSort types), engine/draft.ts (openSlots), engine/slots.ts (SlotId type), engine/lineup.ts (lineupFor)
  src/lib/savesApp.ts — 12 sites: app/saves.ts (serialize, restore, assertSlotMatchesKey + AnyEnvelope/DraftPayload/WeekEnvelope/SeasonEnvelope types), app/hydrate.ts (hydrateWeek, hydrateSeasonConsistency + HydrateResult), app/weekmap.ts (LoadedWeek type), platform/localstorage.ts (createLocalStorageModule), core/app.ts (StorageModule type), core/keys.ts (sportKey), core/envelope.ts (SlotName/SaveMeta types + SLOT_NAMES)
  src/lib/feedVM.ts — 9 sites: app/store.ts (thawPool + SaveRecord type), engine/players.ts (Player type), engine/lineup.ts (lineupFor + Lineup type), engine/ratings.ts (leagueBaseline, spotsOf, teamRatings + Ratings type), engine/returner.ts (returnerRating), engine/value.ts (netPts)
  src/lib/draftStore.ts — 3 sites: app/store.ts (createStore + Store type), engine/players.ts (Player type)
  src/lib/shareVM.ts — 2 sites: engine/league.ts (TEAMS), app/saves.ts (envelope types)
  src/lib/screens/TeamSelect.svelte — 2 sites: engine/league.ts (TEAMS, DIVS, divisionTeams, TEAM_BY_NAME + Conf type)
  src/lib/components/SlotPicker.svelte — 5 sites: engine/slots.ts (SLOT_IDS, SLOTS, Dest, SlotId types), engine/flex.ts (fit) — engine MATH rendered inside a component
  src/lib/components/NeedsRow.svelte — 3 sites: engine/slots.ts (SLOTS, SlotId, Unit types), view/draftBoard.ts (slotLabel)
  src/lib/components/DraftBoard.svelte — 2 sites: view/draftBoard.ts (BoardVM type), engine/slots.ts (SlotId type)
  src/lib/components/BoardRow.svelte — 1 site: view/draftBoard.ts (BoardRowVM type)
  src/lib/components/BoardHeader.svelte — 1 site: view/draftBoard.ts (BoardHeaderVM type)
  src/lib/components/SortControls.svelte — 1 site: view/draftBoard.ts (BoardSort type)
  src/lib/components/Saves.svelte — 1 site: engine/league.ts (TEAMS)

Existing thin adapters are real (draftStore, savesApp, feedVM, valuation, shareVM — plain TS, no svelte imports), but screens and components import the engine directly and bypass them, so there is no single door, no single directory boundary, and engine math (fit from flex.ts) is reachable from a render component. M1 check `grep -rn "engine" src/lib --include=*.svelte` returns hits in 8 component/screen files — not zero. M5 line count ("lines of app code touching engine types") is not yet measured precisely; the 66-import-line / 16-file inventory above is the measured lower bound and IS the deliverable number until counted exactly.

PROPOSED SEAM (for Z.ai to build; file it as the handoff document): one module src/lib/enginePort.ts exporting typed commands/queries:
  startDraft({teamIndex, slot, order}) -> store START (custom order: user's team at the chosen slot, other 31 fill the snake)
  readBoard(sort) -> BoardVM  (wins/priority/OVR/gone% rows, never raw OVR)
  goneOddsFor(draft, userTeam) -> picksBetween/sims meta
  pick(playerId, slot) / undo() / setSort(sort)
  stepWeek(seed, userTeam, record) -> FeedVM  (week step; season simulation lives here)
  saveSlot(kind, payload, meta) / loadSlot(slot) -> envelope or refusal (corrupt-never-refused... corrupt-never-repair)
DTOs: DraftView, BoardRowVM, FeedDriveVM, ShareVM, SaveMeta — plain JSON shapes, versioned against pin d3bd81d2. Every screen imports only enginePort.ts or an app VM; nothing imports src/engine/**.
If the seam cannot express something the shell needs (e.g. the store's slot support — P-317), file it as a §5 proposal to the Architect; do not copy engine code into the shell.

M3 swap test (not run by this seat — requires npm ci, a second engine commit, and the Playwright battery): exact procedure — copy src/engine/ from commit d3bd81d2 into the shell, then npm ci && npm run build && npm run battery; build must succeed and battery must pass with zero edits outside src/engine/; report diff -rq outside src/engine/ (must be empty). Any battery failure names the law — that is the seam's real width.

Labels: import inventory VERIFIED (command run, output quoted). Proposed seam contract — proposal (UNVERIFIED until Z.ai builds it).
