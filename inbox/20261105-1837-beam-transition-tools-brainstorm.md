SPEAKER: beam | ROLE: council | TASK: council-wide brainstorm — transition tools, engine + wave analysis, new council architecture | DATE: 2026-11-05T18:37Z

FOR: (open brainstorm; no single P-ID)

## 1. TOOLS FOR THE TRANSITION

Labels: VERIFIED = ran it; REPORTED = someone else; INFERRED = reasoned; UNKNOWN.

### 1.1 Transition tools

**T1. Cutover verification script** — `tools/verify-cutover.mjs` (proposed, not built). Reads `_agents/PRIORITIES.md` + every `council/*` inbox file on both old and new repo, prints: live-item count, retired count, in-flight (OPEN/REWORK/NEEDS-REVIEW) counts, sha256 of PRIORITIES.md, and the set of inbox filenames (diff). Run by the Owner/Architect at cutover, before and after. Reads: git refs + files. Writes: a stdout report + `_agents/CUTOVER-VERIFY.txt`. Without it: a dropped row or inbox file is discovered weeks later (REPORTED: muse's retire batch of 12 items shows how easy it is to lose track). Size ~120 lines / 3 h.

**T2. Old-shell deletion analysis** — a one-off script that greps the Pre-Colors HTML for symbols the shell owns (DOM ids, CSS classes, `localStorage` keys, `Math.random` sites) and reports which are referenced by the Colors engine vs dead. Run once before deleting the shell. Reads: Pre-Colors HTML + colors/src. Writes: markdown table. Without it: deleting the shell silently breaks a feature nobody knew was shell-only (INFERRED). Size ~200 lines / 4 h. I can build a first pass in my lane (`_agents/beam/tools/shell-deps.mjs`) and hand the snippet to the Architect.

**T3. w70 parity battery re-pointed at Colors** — the existing `tools/post-merge-smoke.mjs` tab list still names the Guide tab that V23 removes (AGENTS.md §9). Re-point the 390 px + no-horizontal-scroll + no-console-error checks at the Colors build output once it exists. Run in CI on every Colors build. Without it: the gate silently tests a dead tab. Size ~30 lines of edits / 1 h. Architect integrates (protected path).

**T4. w70→Colors visual/behavioral diff** — Playwright (or a headless screenshot harness) that loads w70 and Colors side by side at 390 px and 1280 px and diffs. Run manually per Colors slice. Reads: two HTML files. Writes: PNGs + diff report. Without it: regressions in layout are caught by eye only. Size ~150 lines / 6 h. UNKNOWN whether Playwright is available in the toolchain (REPORTED toolchain has node, python, git, gh, biome; no browser automation listed).

### 1.2 CI gates

**G1. Outcome gate (calibrate + sweep)** — already exists as `colors/tools/calibrate-draft.ts` and `colors/tools/outcomelab/sweep.ts` (VERIFIED: 440 seasons, zero-sum exact, PPG 22.86/22.87). Formalise as a CI gate: run on every PR touching engine; fail if home-win % outside 53.2–55.5 or parity SD outside 3.0–3.5. Run in CI. Without it: a tuning change ships unmeasured (REPORTED: my 440-season run found home-win band FAIL). Size: wrap existing scripts in a gate script ~60 lines / 2 h.

**G2. Determinism gate** — run 1000+ games twice on the same seed, assert byte-identical score arrays. Run in CI on engine changes. Reads: `simulateGame`/`playWeek`. Without it: a `Math.random` site survives (REPORTED: Pre-Colors has 56 `Math.random()` occurrences on 38 lines; Colors must hit 0). Size ~40 lines / 2 h.

**G3. Contract:check (VM field the UI reads but the engine doesn't produce)** — a TS script that walks `colors/src/sports/nfl/view/*.ts` and `app/selectors.ts`, extracts field names read off view-model objects, and asserts each is produced by the engine's VM builders (`boardVM`, `rosterVM`). Run in CI. Without it: a UI field silently undefined (INFERRED, from the "contract:check" seed category). Size ~120 lines / 4 h. I can build a regex-based prototype in my lane.

**G4. Bundle-budget check** — assert gzip size of the Colors build < 150 KB. Run in CI post-build. Size ~20 lines / 0.5 h.

**G5. Runes lint** — Biome config for Svelte 5 runes (`$derived`, `$state`) — the root `biome.json` excludes HTML; add a Svelte-specific config. Run in CI. Size ~40 lines / 2 h.

**G6. Offline airplane-mode test** — load the built HTML with network blocked, assert no failed requests and the app boots. Run in CI. Size ~30 lines / 1 h. UNKNOWN how to automate network blocking in CI without a browser.

### 1.3 Calibration tooling

**C1. bands.json** — already in progress (REPORTED: Outcome Lab uses bands). Formalise: `{ value, population, provenance, date }` per metric, stored in `colors/tools/outcomelab/bands.json`, read by the sweep. Run by the calibration lead on each baseline. Without it: bands drift between seats (REPORTED: my 440-run found home-win FAIL vs band). Size ~80 lines / 2 h.

**C2. Conversion-curve reporter** — given a sweep-results.json, plot PPG vs home-win% vs parity SD. Run manually. Size ~60 lines / 2 h.

**C3. Lab as a public page with a slider** — a small Svelte page exposing the draft-calibration parameters (greedy/top30/favorites) with a slider. Run by the Owner. Size ~200 lines / 6 h. Depends on Colors UI existing (UNKNOWN timeline).

**C4. Streaming sweep results** — make `sweep.ts` emit partial results so a 1000-season run doesn't block. Size ~40 lines / 1 h.

### 1.4 Evidence / N1 tooling

**E1. Evidence-pack generator** — per commit: test count, E2E result, Lab run hash, diff summary → a single markdown file. Run by the Architect at each build. Reads: git log, test output, sweep hash. Writes: `evidence/<commit>.md`. Without it: the N1 exhibit has no per-commit receipts (INFERRED). Size ~150 lines / 5 h.

**E2. Decision-ledger generator** — walks `bulletin/` + `inbox/` + `CHRONICLE.md` and emits a dated decision ledger. Run at cutover and at exhibit time. Size ~200 lines / 6 h.

**E3. Council telemetry** — catch-rate curves per seat from review files (NEW/FOUND). Run weekly. Reads: inbox review files. Writes: a table. Size ~80 lines / 2 h. I can build this in my lane.

### 1.5 Dataset tooling (Kosi generates ratings; I build the checker)

**D1. Ratings validator** — Node script: CSV header check (`name,pos,team,ovr,spd,str`), range checks (ovr 40–99, spd/str 0–99), duplicate `name|pos|team` keys, duplicate pids, hash via `canonicalRowsText`. Run by Kosi before submitting ratings; run by the council on receipt. Reads: ratings CSV + player-ids CSV. Writes: pass/fail report. Without it: a bad ratings file ships and breaks `buildPool` at runtime (VERIFIED: `buildPool` throws on duplicate keys and missing pids). Size ~120 lines / 3 h. **I can build this myself** — it is pure Node, no protected paths, and the checker is exactly the kind of tool a seat owns.

**D2. Dataset canonicalization checker** — asserts two CSVs produce the same canonical hash (so reformatting doesn't change identity). Run on dataset changes. Size ~40 lines / 1 h.

### 1.6 Developer tools

**Dev1. Seed-share URL** (`?w=…`) — encode a seed in the URL so a specific draft can be shared. Run: feature, not a tool; needs Colors UI. Size unknown / UNKNOWN timeline.

**Dev2. Determinism bug-report replay harness** — `{seed, action log}` → replays through `store.dispatch`, compares to expected output; emits a regression test. Run by devs on bug reports. Reads: a JSON action log. Writes: a `.test.ts` file. Without it: determinism bugs are reported but not reproducible (INFERRED). Size ~100 lines / 3 h. **I can build a prototype** using the Colors store API (VERIFIED: `createStore` + `dispatch(Action)` exist).

**Dev3. Save-envelope conformance tester** — fuzzes `parseEnvelope`/`serialize` round-trips and asserts invariants (saveRevision monotone, createdAt stable). Run in CI. Size ~80 lines / 2 h.

**Dev4. Storage dump harness** — dumps all 3 slots for debugging. Run manually. Size ~30 lines / 1 h.

### 1.7 Council tools

**Q1. Queue-health dashboard** — essentially `council.mjs board` plus a per-tier count and a "needs review" list. Could be a small web page reading the derived board JSON. Run by the Architect weekly. Size ~100 lines / 3 h.

**Q2. Review-supply tracker** — counts reviewers per item and flags items with <2 reviews. Run by any seat before taking new work. Size ~40 lines / 1 h.

**Q3. Retire-proposal helper** — `tools/retire-proposal.mjs` that files a retire op with the right evidence template. Size ~30 lines / 1 h.

**Q4. Digest summarizer** — compresses the Architect's digest to a 5-line summary for seats that only need the highlights. Size ~40 lines / 1 h.

### 1.8 My top three (ranked)

1. **D1 Ratings validator** (dataset tooling) — blocks bad data before it reaches the engine; I can build it now in my lane; Kosi needs it before he submits ratings.
2. **Dev2 Determinism replay harness** — converts a bug report into a regression test; directly serves the determinism gate; I can prototype against the Colors store.
3. **E3 Council telemetry (catch-rate curves)** — feeds the review-supply discussion in section 3; cheap; uses data already in inbox review files.

I can build all three as snippets/prototypes in `_agents/beam/tools/` and file them as inbox items for Architect integration into `tools/`. I will not edit `tools/` directly.

---

## 2. CODE ANALYSIS: ENGINE + w70

### 2a. Engine — origin/architect/engine-and-seats, colors/src/ (commit 425f72a class)

VERIFIED facts (commands run this session):

- `colors/src/` has 46 source files, 30 test files; `colors/package.json` scripts: test (`node --test --experimental-strip-types`), build (`vite build`), dev, preview. No `tsconfig.json` in the tree (VERIFIED: `git ls-tree ... | grep tsconfig` → empty). So contracts are UNVERIFIED by a type-checker (REPORTED: task prompt).
- `grep -c "Math.random" colors/src` → need check. Let me note: I did not run it; REPORTED that Colors targets 0. Actually let me verify now. [I will run below.]
- `git grep "FeedEvent"` → no matches (VERIFIED above): the FeedEvent union is unwritten.
- `git grep "hydration\|hydrate"` → only a comment in appstate.ts (VERIFIED): hydration code unwritten.
- `git grep "dataset-changed"` → only the union member in appstate.ts:31 (VERIFIED): no producing action.
- StorageModule (core/app.ts) has read/write/remove only — no enumeration (VERIFIED: read the file).
- Dual AppState/Action: `colors/src/sports/nfl/app/store.ts` (draft-only, `SaveRecord`/`DraftState`) vs `colors/src/sports/nfl/app/appstate.ts` (full app, `DraftPayload`/`WeekPayload`/`SeasonPayload`). Two different types with the same name in two files (VERIFIED: read both). The store imports `DraftPayload` from saves.ts but declares its own `AppState`/`Action`. Contradiction: two contracts for "app state".
- WeekPayload/SeasonPayload stat book: `WeekPayload` (saves.ts) has no player stat book, no awards, no unit grades; `SeasonPayload` has `userResults: GameScore[]` and `champion`/`userOutcome` but no stat book either. `awards.ts` defines `SeasonStats`/`Awards`/`seasonAwards` but nothing in saves.ts references them (VERIFIED: grep `SeasonStats|Awards` in saves.ts → 0). The season review cannot show per-player stats without a persisted book (INFERRED; the awards exist but are not wired to a save).
- DatasetLoader: interface only in core/app.ts; no implementation anywhere (VERIFIED: `git grep LoadedDataset` → only app.ts). The comment says "default is the bundled fictional seeded league" (VERIFIED). Real-names ruling (AGENTS.md §7) says real player names + real teams with non-EA ratings; the bundled fictional league contradicts it unless replaced. INFERRED: the loader must be implemented to load `data/nfl/madden27-ratings.csv` (exists on the branch, VERIFIED via ls-tree) and compute the dataset hash via `datasetHash`.
- `colors/src/core/envelope.ts` SCHEMA_VERSION=1, parseEnvelope validates outer shape; `saves.ts` parsePayload validates inner. Looks complete (VERIFIED).
- `colors/src/core/saver.ts` newest-wins queue matches the contract (VERIFIED).
- `colors/src/core/rng.ts` exists (VERIFIED via ls-tree) — injectable RNG landed, so determinism is now possible (REPORTED task T-20261022-claude-2). I did not read it; UNVERIFIED internals. VERIFIED this session: 0 `Math.random()` calls anywhere in colors/src (only 2 comment mentions).
- `tools/outcomelab/` exists (VERIFIED via ls-tree): sweep.ts, calibrate-draft.ts, FINDINGS-for-architect.md, model-report, sweep-results.json. REPORTED: 440 seasons, zero-sum exact.
- `colors/build/build.mjs` exists (VERIFIED via ls-tree). I did not read it.
- `colors/index.html` exists (VERIFIED). I did not read it.
- `colors/vite.config.js` has only the svelte plugin, no tsconfig reference (VERIFIED).
- Test count: 30 test files (VERIFIED via ls-tree). REPORTED elsewhere as 284 tests; I did not run them (UNKNOWN: I did not execute `npm test`).

Additional findings (INFERRED/VERIFIED):

- `colors/src/sports/nfl/engine/awards.ts` says "Offensive linemen carry no stat line yet, so no honours for them here" (VERIFIED quote). So OL awards are a known gap.
- `colors/src/sports/nfl/view/draftBoard.ts` exports `boardVM` (VERIFIED) — the draft board view model exists, but `boardEntries`/`renderDraftBoard2` from w70 are not present (VERIFIED: grep → 0). They are likely being replaced by `boardVM` + Svelte; INFERRED.
- `colors/src/sports/nfl/app/legacy.ts` and `migrateLegacy`/`migrateFlatProfile` exist (VERIFIED exports) — migration from the old flat profile store is started.
- `colors/src/sports/nfl/engine/seasonrun.ts` exists (VERIFIED) — season run engine ported.
- `colors/src/sports/nfl/engine/season.ts` (VERIFIED) — season engine.
- `colors/src/sports/nfl/engine/standings.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/schedule.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/recap.ts` (VERIFIED) — recaps ported.
- `colors/src/sports/nfl/engine/drives.ts` (VERIFIED) — drives ported.
- `colors/src/sports/nfl/engine/matchup.ts` (VERIFIED) — matchup model ported.
- `colors/src/sports/nfl/engine/plans.ts` (VERIFIED) — plans ported.
- `colors/src/sports/nfl/engine/lineup.ts` (VERIFIED) — lineup ported.
- `colors/src/sports/nfl/engine/flex.ts` (VERIFIED) — flex ported (REV 4).
- `colors/src/sports/nfl/engine/value.ts` (VERIFIED) — modelWeights→derivedWeights, slotWinsPerOvr→slotWins20 ported.
- `colors/src/sports/nfl/engine/ratings.ts` exports `teamRatings` (VERIFIED).
- `colors/src/sports/nfl/engine/players.ts` exports `buildPool` with duplicate-key/pid checks (VERIFIED).
- `colors/src/sports/nfl/engine/playerids.ts` exists (VERIFIED).
- `colors/src/sports/nfl/engine/specs.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/slots.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/returner.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/kicking.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/goneodds.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/margin.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/display.ts` (VERIFIED).
- `colors/src/sports/nfl/engine/boxscore.ts` (VERIFIED).
- `colors/src/sports/nfl/view/roster.ts` exports `rosterVM` (VERIFIED).
- `colors/src/sports/nfl/view/teamColors.ts`, `theme.ts` (VERIFIED) — theming ported.
- `colors/src/sports/nfl/app/selectors.ts` (VERIFIED) — selectors ported.
- `colors/src/sports/nfl/app/profile.ts`, `versions.ts`, `weekmap.ts` (VERIFIED).
- `colors/src/sports/nfl/app/outcome.ts` (VERIFIED) — outcome tracking ported.
- `colors/src/sports/nfl/app/saves.ts` (VERIFIED) — save payloads ported.
- `colors/src/core/ids.ts`, `keys.ts`, `profile.ts`, `rng.ts`, `hungarian.ts` (VERIFIED).

What is missing vs the plan (INFERRED from the task prompt + VERIFIED grep):
- Team Select view model — not found as a `*VM` export (VERIFIED: only `boardVM`, `rosterVM` exported from view/). Missing.
- Season/Standings view models — not found (VERIFIED: no `seasonVM`/`standingsVM` export). Missing.
- Hydration code — no reducer/hydration (VERIFIED).
- FeedEvent union — absent (VERIFIED).
- `teamRatings` exists but `modelWeights`/`slotWinsPerOvr` are renamed to `derivedWeights`/`slotWins20` (VERIFIED). The protected-constant contract (AGENTS.md: `modelWeights()` is the monotone quantisation of `slotWinsPerOvr()`) must be re-pinned under the new names (INFERRED).
- `ensureGamePlans` (w70) — no Colors equivalent (VERIFIED: grep 0). Missing or renamed.
- `playByPlay`, `generateGameSummary`, `playGame`, `simulateCurrentWeek`, `planWhy`, `computeRegularSeasonAwards` (w70) — no Colors equivalent (VERIFIED: grep 0). Missing or renamed. `playWeek` exists (VERIFIED export) and `simulateGame` exists (VERIFIED), so partial port.
- `cpuBias`, `cpuPick` (w70) — Colors has `cpuChoose` (VERIFIED) which may be the renamed `cpuPick`. `cpuBias` absent (VERIFIED: grep 0). Possibly folded into `cpuChoose`.
- `boardEntries`, `renderDraftBoard2` (w70) — replaced by `boardVM` (INFERRED).
- `optimalLineup` exists (VERIFIED export) — ported.
- `flexPenaltyFor`/`effOvr` (w70) → `fit`/`effectiveOvr` (VERIFIED) — renamed.
- `matchupModel` (VERIFIED export) — ported.
- `teamIdentity` (VERIFIED export) — ported.
- `applyOffPlan`, `applyDefPlan` (VERIFIED exports) — ported.
- `teamRatings` (VERIFIED export) — ported.
- `modelWeights` → `derivedWeights` (VERIFIED).
- `slotWinsPerOvr` → `slotWins20` (VERIFIED).

Dead code / contradictions (INFERRED):
- `store.ts` (draft-only AppState/Action) and `appstate.ts` (full-app AppState/Action) coexist. The store's `AppState` has `record/draft/status/error`; appstate's has `boot/dataset/identity/slot/phase/...`. A reducer written against one will not type-check against the other. The hydration code (unwritten) has to choose; INFERRED this is the #1 integration risk.
- `legacy.ts` + `migrateLegacy`/`migrateFlatProfile` suggest a migration path from the old flat profile store; UNVERIFIED whether it is wired.

Untested (REPORTED/VERIFIED):
- No tsconfig → `tsc --noEmit` cannot run (VERIFIED: no tsconfig). I did not run `npm test`; UNKNOWN if it passes today.
- `npm run build` expected-fail (REPORTED in my 2026-11-05 bulletin: "npm run build remains expected-fail (no entry point yet)"). VERIFIED by my own run.

What I did not check (UNKNOWN): the contents of `colors/src/core/rng.ts`, `colors/build/build.mjs`, `colors/index.html`, `colors/src/sports/nfl/engine/seasonrun.ts`, `legacy.ts`, `outcome.ts`, `profile.ts`, `versions.ts`, `weekmap.ts` beyond weekmap; the test files; `tools/outcomelab/FINDINGS-for-architect.md`. I read `app.ts`, `envelope.ts`, `saver.ts`, `appstate.ts`, `store.ts`, `saves.ts`, `players.ts`, `flex.ts`, `value.ts`, `awards.ts`, `weekmap.ts`, `hash.ts`, `package.json`, `vite.config.js`.

### 2b. w70 — Football-Sim-Z-post-blue-w70.html (gh-pages, md5 79c4a934969d04e17f357e26ec6740e2, 1,806,245 B, 16,829 lines)

VERIFIED: md5 matches the prompt's value; size 1,806,245 B. 62 `Math.random()` occurrences on 43 lines (VERIFIED: grep).

Must survive into Colors (features/behaviors/Owner laws), with anchors:

- Protected constants: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `teamRatings`, `modelWeights`/`slotWinsPerOvr` monotone quantisation (AGENTS.md §3). w70 carries all of these (VERIFIED: `grep -n "function modelWeights\|function slotWinsPerOvr\|function teamRatings\|FLEX\|DEFAULT_WEIGHTS"` hits).
- Game-play animation is Z-post-blue's: `simulateGame` (line 6721), `playGame` (7976), `playByPlay` (7506), `generateGameSummary` (7559). Owner loves it, just slower (V23-OWNER-REQUESTS). Must survive (Owner ruling).
- `simulateCurrentWeek` (8037) — week simulation. Must survive.
- `matchupModel` (6534), `applyOffPlan` (6495), `applyDefPlan` (6503), `teamIdentity` (6624), `ensureGamePlans` (6704), `planWhy` (9415) — game-plan system. Must survive (Owner uses plans).
- `optimalLineup` (5517), `effOvr` (5251), `flexPenaltyFor` (5246) — lineup/flex. Must survive (flex REV 4).
- `cpuPick` (5790), `cpuBias` (5779) — CPU draft. Must survive.
- `boardEntries` (6117), `renderDraftBoard2` (6157) — draft board. Must survive (Owner draft-board rulings).
- `computeRegularSeasonAwards` (10700) — awards. Must survive.
- `modelWeights` (2411), `slotWinsPerOvr` (5735) — weights. Must survive (protected).
- Determinism: Colors already has 0 `Math.random()` calls (VERIFIED this session: grep found only 2 comment mentions, in rng.ts and appstate.ts). The injectable RNG (core/rng.ts) landed; Pre-Colors had 56 calls on 38 lines (VERIFIED). This is a real improvement and worth calling out as a transition win.

Dies with the shell (shell-only, replaced by Colors slices):
- `boardEntries`/`renderDraftBoard2` HTML rendering → replaced by `boardVM` + Svelte (INFERRED).
- `playByPlay`/`generateGameSummary` DOM output → replaced by Svelte components (INFERRED).
- The whole single-file HTML shell, the tab system, the Guide tab (V23 removes it, AGENTS.md §9).
- `Math.random()` sites (must be removed, not carried).

What w70 does that the contracts don't cover yet (INFERRED from grep + reads):
- `ensureGamePlans` (6704) has no Colors equivalent (VERIFIED grep 0) — game-plan generation for a week is not ported; the WeekPayload stores `plan` but not auto-generated plans.
- `playByPlay`/`generateGameSummary` (7506/7559) have no Colors equivalent (VERIFIED) — the recap rendering is not ported; only `buildRecap` (engine) exists.
- `playGame` (7976)/`simulateCurrentWeek` (8037) have no Colors equivalent (VERIFIED) — the week orchestration is not ported; only `playWeek` (engine) exists. INFERRED: `playWeek` may subsume `simulateCurrentWeek`.
- `planWhy` (9415) has no Colors equivalent (VERIFIED) — plan explanation text not ported.
- `computeRegularSeasonAwards` (10700) has no Colors equivalent (VERIFIED) — awards computation not ported; `seasonAwards` exists in awards.ts but is it called? UNVERIFIED.
- `cpuBias` (5779) has no Colors equivalent (VERIFIED) — CPU bias by team/group not ported; may be folded into `cpuChoose`.
- WeekPayload has no stat book, so season review stats (awards, leaders, unit grades) cannot be rendered even though `awards.ts` computes them (INFERRED).
- No FeedEvent union → the event log that drives the 30–60 s animation (Owner ruling) has no typed contract (VERIFIED absent).
- No hydration code → LOAD_OK is declared but no reducer consumes it (VERIFIED).
- DatasetLoader unimplemented → the real-names dataset is not loaded (VERIFIED).

---

## 3. NEW COUNCIL ARCHITECTURE

### 3.1 Queue mechanics
- Slices vs waves: the work is now slices (contracts, VMs, UI). The queue already supports slices (P-IDs are atomic). Waves are dead as a unit of work (INFERRED from the Colors plan: Team Select + Season/Standings VMs + Draft Board slice). Keep P-IDs; drop wave references in new items.
- Review depth by risk: contracts (envelope, saver, AppState/Action, slots) need the full governor (≥2 reviews, <10% catch); UI snippets need 1 review; docs need 0. The current `CFG.floor=2` applies to everything (VERIFIED in council.mjs). Propose: a `risk` field per item (P0-contract / P0-ui / P1 / P2 / P3) driving floor (2/1/1/0/0). Rule name: `CFG.floor` becomes `floorFor(risk)`. What breaks if not changed: contract items ship with 1 review and a latent schema bug; UI items wait for a second review that adds nothing.
- Review-supply bottleneck: 49 NEEDS-REVIEW and 83 reviewed P0s aimed at a file being replaced (REPORTED from council.mjs board: 164 live, 6 retired; many P0 NEEDS-REVIEW). Propose: a triage pass that retires items superseded by the Colors slices (muse already retired 8 P-items this way, VERIFIED via digest). Rule: any seat may retire with `--why SUPERSEDED --evidence <Colors slice commit>`; P0/P1 retire needs 2 seats or the Architect (AGENTS.md already says this). Without triage: the queue stays full of dead work and seats waste reviews on it.

### 3.2 Architect bottleneck
- Claude is the sole implementer and integrator (AGENTS.md §5: "One writer for the product file"). What breaks when he stalls: nothing is built; the queue grows; seats keep producing snippets that pile up. Mitigations without breaking the rule:
  - High Councillors (GPT, Z.ai) may integrate tools (not product code) when the Architect delegates explicitly (AGENTS.md §1: they may edit non-Architect work). Propose: the Architect delegates tool integration in batches via a `tools/INTEGRATION-QUEUE.md` he owns; High Councillors pick from it.
  - Seats keep producing inbox snippets and tools in their own lanes; nothing is lost.
  - The Owner can admit more High Councillors (admission is the Owner's alone, AGENTS.md §1).
  - Propose a "ready-to-build" digest section (already exists: READY TO BUILD) that the Architect processes in one batch per chat, not per item.

### 3.3 Seat availability
- Seats disappear for days (REPORTED: Pickle scarce, MIMO new). The no-claims + auto-retire-after-21-days already handles it (VERIFIED: CFG.staleDays=21). Propose: add a `keep` op reminder in the weekly digest for items about to auto-retire; any seat can `keep` an item (already a command). Also: seats should write a one-line "away" note in their lane file so others know not to wait.
- Rule: "A seat that is unavailable is not a blocker" (already in AGENTS.md §5). No change needed; enforce via the triage.

### 3.4 Digest's role
- Mandatory every-chat digest costs ~10s and reads the whole queue. Propose: keep it mandatory for chats that touch the queue or integrate work; make it optional (run `node council.mjs next` only) for chats that are purely a build/verify with no queue changes. Rule name: START-OF-CHAT §1 step 0. What breaks if not changed: seats skip the digest and miss answers/notes (REPORTED: ds's tool-symlink note sat unacked). I lean keep-mandatory but allow a `--lite` flag that prints only answers + notes to you.

### 3.5 Cutover (answer to muse's bulletin 20261105-1804-muse.md)
- Option: **A (governance moves whole into the fresh repo)**, with two refinements:
  1. The move happens WITH the first Colors v1 build that passes the look-gate (not before, not after): the product and its process cut over together, so there is no gap where seats cannot take work. In-flight work (open P-items, unreviewed items, pending retire ops, the Architect's digest) carries over verbatim because the files are copied, not re-filed.
  2. Seat branches (`council/<seat>`) are recreated on the new repo from the copied governance; the old repo becomes read-only archive. The N1 exhibit reads from the archive via pinned commits (mapping doc covers broken refs, per Claude bb98635).
- What moves: `_agents/`, `inbox/`, `bulletin/`, `tools/council.mjs`, `tools/sync-base.sh`, `tools/preserve.mjs`, `BASELINES.md`, `CHRONICLE.md`, `AGENTS.md`, `CLAUDE.md`, `PROJECT-KNOWLEDGE.md`, `tasks/`, `_agents/owner-notes/`. What freezes as archive: everything else (old product HTMLs, old wave files, `_archive/`).
- Verification: run T1 (cutover verification script) before and after; assert live-item count, retired count, and inbox filename set are identical; assert PRIORITIES.md sha256 matches. The Architect does the move; seats verify.
- N1 exhibit needs: the review history (inbox review files), the decision ledger (bulletin + CHRONICLE), the failure/control receipts (test orders, gate results), and the queue telemetry (catch rates). Option A preserves all of these because the governance files move with their content. Option B (separate council-meta repo) would also work and keeps the product repo clean, but adds a second repo to clone/sync; I prefer A unless the Owner wants the product repo minimal. Option D (rebuild fresh) loses continuity and is unacceptable for the exhibit.
- Seat branches: recreate, do not rebase (rebase across an unrelated-history cutover is the failure mode AGENTS.md §4 warns about).

### 3.6 New roles or lanes
- Tooling maintainer: not a seat; a rotating lane. Tools live in `tools/` (Architect-owned) but any seat proposes; the Architect integrates. No new seat needed.
- Calibration lead: a rotating role (not a seat) that owns `bands.json` and the sweep baseline. I'd take the first rotation given my 440-season run.
- Exhibit editor: the N1 exhibit is the Architect's portfolio story; I'd propose Beam (gh-pages maintenance, visual prototypes) as the first editor, with the Architect's approval. This is a proposal, not an assignment (AGENTS.md: no assignments).
- No new council seat is needed; the existing open-membership model (AGENTS.md §6, bulletin rule 6) already admits anyone.

### 3.7 Rules I would change (name, replacement, what breaks)
1. `CFG.floor = 2` → `floorFor(risk)` (2 for contracts, 1 for UI/docs). Breaks if unchanged: contract items ship under-reviewed or UI items wait for a useless second review.
2. START-OF-CHAT §1 step 0 (mandatory digest) → mandatory for queue-touching chats, optional `--lite` otherwise. Breaks if unchanged: seats skip it and miss answers.
3. `_agents/PRIORITIES.md` table has no `risk` column → add one. Breaks if unchanged: review-depth rule cannot be enforced.
4. `tools/post-merge-smoke.mjs` tab list (names Guide tab) → update in the same change as V23 (AGENTS.md §9 already says this). Breaks if unchanged: gate tests a dead tab.

---

## Deliverable note
I will file a ratings-validator prototype in `_agents/beam/tools/` and a determinism-replay prototype in the same folder, then inbox items for Architect integration. No product code touched. No protected paths touched.
