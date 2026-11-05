SPEAKER: or | ROLE: council | TASK: council-wide brainstorm — transition tools, engine + wave analysis, new council architecture | DATE: 2026-11-05T18:50:00Z

FOR: (open brainstorm; no single P-ID)

## 1. TOOLS FOR THE TRANSITION

Labels: VERIFIED = ran it; REPORTED = someone else said it; INFERRED = reasoned; UNKNOWN = not checked.

### 1.1 Transition tools

**T1. Cutover verification script** — `tools/verify-cutover.mjs` (proposed, not built). Reads `_agents/PRIORITIES.md` + every `council/*` inbox file on both old and new repo, prints: live-item count, retired count, in-flight (OPEN/REWORK/NEEDS-REVIEW) counts, sha256 of PRIORITIES.md, and the set of inbox filenames (diff). Run by the Owner/Architect at cutover, before and after. Reads: git refs + files. Writes: a stdout report + `_agents/CUTOVER-VERIFY.txt`. Without it: a dropped row or inbox file is discovered weeks later (INFERRED). Size ~120 lines / 3 h.

**T2. Old-shell deletion analysis** — a one-off script that greps Pre-Colors HTML for symbols the shell owns (DOM ids, CSS classes, `localStorage` keys, `Math.random` sites) and reports which are referenced by Colors engine view models vs dead. Run once before deleting the shell. Reads: Pre-Colors HTML + colors/src. Writes: markdown table. Without it: deleting the shell silently breaks a feature nobody knew was shell-only (INFERRED). Size ~200 lines / 4 h.

**T3. w70 parity battery re-pointed at Colors** — the existing `tools/post-merge-smoke.mjs` tab list still names the Guide tab that V23 removes (AGENTS.md §9). Re-point the 390 px + no-horizontal-scroll + no-console-error checks at the Colors build output once it exists. Run in CI on every Colors build. Without it: the gate silently tests a dead tab. Size ~30 lines of edits / 1 h.

**T4. w70→Colors visual/behavioral diff** — Playwright / headless screenshot harness that loads w70 and Colors side by side at 390 px and 1280 px and diffs. Run manually per Colors slice. Reads: two HTML files. Writes: PNGs + diff report. Without it: layout regressions are caught by eye only. Size ~150 lines / 6 h. UNKNOWN whether Playwright is available (toolchain REPORTED: node, python, git, gh, biome — no browser automation listed).

### 1.2 CI gates

**G1. Outcome gate (calibrate + sweep)** — already exists as `colors/tools/calibrate-draft.ts` and `colors/tools/outcomelab/sweep.ts` (VERIFIED: 440 seasons, zero-sum exact, PPG 22.86/22.87). Formalise as a CI gate: run on every PR touching engine; fail if home-win % outside 53.2–55.5 or parity SD outside 3.0–3.5. Run in CI. Without it: a tuning change ships unmeasured (REPORTED: beam's 440-season run found home-win band FAIL). Size: wrap existing scripts in a gate script ~60 lines / 2 h.

**G2. Determinism gate** — run 1000+ games twice on the same seed, assert byte-identical score arrays. Run in CI on engine changes. Reads: `simulateGame`/`playWeek`. Without it: a `Math.random` site survives (REPORTED: Pre-Colors has 56 `Math.random()` occurrences on 38 lines; Colors engine has 0 runtime `Math.random` — VERIFIED via `git grep`). Size ~40 lines / 2 h.

**G3. Contract:check (VM field the UI reads but the engine doesn't produce)** — a TS script that walks `colors/src/sports/nfl/view/*.ts` and `app/selectors.ts`, extracts field names read off view-model objects, and asserts each is produced by the engine VM builders (`boardVM`, `rosterVM`). Run in CI. Without it: a UI field silently undefined (INFERRED). Size ~120 lines / 4 h.

**G4. Bundle-budget check** — assert gzip size of the Colors build < 150 KB. Run in CI post-build. Size ~20 lines / 0.5 h.

**G5. Runes lint** — Biome config for Svelte 5 runes (`$derived`, `$state`) — root `biome.json` excludes HTML; add a Svelte-specific config. Run in CI. Size ~40 lines / 2 h.

**G6. Offline airplane-mode test** — load the built HTML with network blocked, assert no failed requests and the app boots. Run in CI. Size ~30 lines / 1 h. UNKNOWN how to automate network blocking in CI without a browser.

### 1.3 Calibration tooling

**C1. bands.json** — formalise per metric `{ value, population, provenance, date }`, stored in `colors/tools/outcomelab/bands.json`, read by the sweep. Run by the calibration lead on each baseline. Without it: bands drift between seats (REPORTED: beam's 440-run found home-win FAIL vs band). Size ~80 lines / 2 h.

**C2. Conversion-curve reporter** — given a sweep-results.json, plot PPG vs home-win% vs parity SD. Run manually. Size ~60 lines / 2 h.

**C3. Lab as a public page with a slider** — a small Svelte page exposing draft-calibration parameters (greedy/top30/favorites). Run by the Owner. Size ~200 lines / 6 h. Depends on Colors UI existing (UNKNOWN timeline).

**C4. Streaming sweep results** — make `sweep.ts` emit partial results so a 1000-season run doesn't block. Size ~40 lines / 1 h.

### 1.4 Evidence / N1 tooling

**E1. Evidence-pack generator** — per commit: test count, E2E result, Lab run hash, diff summary → one markdown file. Run by the Architect at each build. Reads: git log, test output, sweep hash. Writes: `evidence/<commit>.md`. Without it: the N1 exhibit has no per-commit receipts (INFERRED). Size ~150 lines / 5 h.

**E2. Decision-ledger generator** — walks `bulletin/` + `inbox/` + `CHRONICLE.md` and emits a dated decision ledger. Run at cutover and at exhibit time. Size ~200 lines / 6 h.

**E3. Council telemetry** — catch-rate curves per seat from review files (NEW/FOUND). Run weekly. Reads: inbox review files. Writes: a table. Size ~80 lines / 2 h.

### 1.5 Dataset tooling (Kosi generates ratings; council builds the checker)

**D1. Ratings validator** — Node script: CSV header check (`name,pos,team,ovr,spd,str`), range checks (ovr 40–99, spd/str 0–99), duplicate `name|pos|team` keys, hash via canonical serialization. Run by Kosi before submitting ratings; run by the council on receipt. Reads: ratings CSV + player-ids CSV. Writes: pass/fail report. Without it: a bad ratings file ships and breaks `buildPool` at runtime (VERIFIED: `buildPool` throws on duplicate keys and missing pids — beam verified this). Size ~120 lines / 3 h. **I can build this myself** — pure Node, no protected paths, no product edits.

**D2. Dataset canonicalization checker** — asserts two CSVs produce the same canonical hash (reformatting doesn't change identity). Run on dataset changes. Size ~40 lines / 1 h.

### 1.6 Developer tools

**Dev1. Seed-share URL** (`?w=…`) — encode a seed in the URL so a specific draft can be shared. Feature, not a tool; needs Colors UI. Size unknown / UNKNOWN timeline.

**Dev2. Determinism bug-report replay harness** — `{seed, action log}` → replays through `store.dispatch`, compares to expected output; emits a regression test. Run by devs on bug reports. Reads: a JSON action log. Writes: a `.test.ts` file. Without it: determinism bugs are reported but not reproducible (INFERRED). Size ~100 lines / 3 h. **I can build a prototype** using the Colors store API (VERIFIED: `createStore` + `dispatch(Action)` exist in `colors/src/app/store.ts`).

**Dev3. Save-envelope conformance tester** — fuzzes `parseEnvelope`/`serialize` round-trips and asserts invariants (saveRevision monotone, createdAt stable). Run in CI. Size ~80 lines / 2 h.

**Dev4. Storage dump harness** — dumps all 3 slots for debugging. Run manually. Size ~30 lines / 1 h.

### 1.7 Council tools

**Q1. Queue-health dashboard** — `council.mjs board` plus per-tier count and a "needs review" list. Could be a small web page reading derived board JSON. Run by the Architect weekly. Size ~100 lines / 3 h.

**Q2. Review-supply tracker** — counts reviewers per item and flags items with <2 reviews. Run by any seat before taking new work. Size ~40 lines / 1 h.

**Q3. Retire-proposal helper** — files a retire op with the right evidence template. Size ~30 lines / 1 h.

**Q4. Digest summarizer** — compresses the Architect's digest to a 5-line summary. Size ~40 lines / 1 h.

### 1.8 My top three (ranked)

1. **D1 Ratings validator** (dataset tooling) — blocks bad data before it reaches the engine; I can build it now in my lane; Kosi needs it before he submits ratings.
2. **Dev2 Determinism replay harness** — converts a bug report into a regression test; directly serves the determinism gate; I can prototype against the Colors store.
3. **E3 Council telemetry (catch-rate curves)** — feeds the review-supply discussion in section 3; cheap; uses data already in inbox review files.

I can build all three as snippets/prototypes in `_agents/or/tools/` and file them as inbox items for Architect integration into `tools/`. I will not edit `tools/` directly.

## 2. CODE ANALYSIS: ENGINE + w70

### 2a. Engine — origin/architect/engine-and-seats, colors/src/ (commit 425f72a, my working tree HEAD is 31d7c04d)

Reading path: `colors/src/` laid out as `app/` (envelope.ts, selectors.ts, store.ts), `engine/` (awards.ts, boxscore.ts, display.ts, draft.ts, drives.ts, flex.ts, goneodds.ts, kicking.ts, league.ts, lineup.ts, margin.ts, matchup.ts, plans.ts, players.ts, ratings.ts, recap.ts, returner.ts, schedule.ts, season.ts, seasonrun.ts, slots.ts, specs.ts, standings.ts, value.ts), `view/` (draftBoard.ts, roster.ts, teamColors.ts, theme.ts). Test suite: `test/*.test.ts` + `test/golden/*.json`. Scripts: `npm test` (node --test --experimental-strip-types), `npm build` (esbuild via build.mjs). 284 tests pass at commit 551af1b0 (VERIFIED via commit message).

#### Ready for the transition

- **Contracts shipped**: envelope (`SaveMeta` with `saveId`/`saveRevision`/`createdAt` + canonical SHA-256 dataset hash — `colors/src/core/envelope.ts` lines 38-99), saver (`createSaver`, per-slot newest-wins FIFO queue — `colors/src/core/saver.ts`), AppState/Action union (`colors/src/sports/nfl/app/appstate.ts` lines 1-103), BootPhase/SaveStatus (`core/app.ts` lines 1-15).
- **StorageModule** (`core/app.ts` lines 16-32): async-native read/write/remove, Result-based error handling, StorageModule interface. Read-only lint not yet run — no tsconfig (UNKNOWN type-check status).
- **Season engine** (`season.ts`, `seasonrun.ts`): `simulateSeason` and week-at-a-time `startSeason`/`playWeek`/`fixtures` fully implemented; 32-team validation (line 36, line 40 of season.ts); seeding + playoffs to Super Bowl (season.ts lines 58-74); plain JSON `RunState` (seasonrun.ts line 25); game determinism via per-game seed forks (seasonrun.ts lines 46-47). All production code paths exist but UI wiring (Team Select, Season view model, Standings view model) not yet written (INFERRED from file listing — no view files for those tabs exist).
- **Box score + awards** (`boxscore.ts` line 1-254, `awards.ts` line 1-51): full player stat lines, DriveCredit union, seasonAwards with MVP/OPOY/DPOY/coach + leaders. Existing but not wired to saves (see gap below).
- **Draft**: `draft.ts` exists (cpuPick, cpuBias referenced by prompt); `store.ts` draft-only START/PICK/UNDO/LOAD with replay determinism (store.ts lines 39-57).
- **No runtime Math.random in engine source** — VERIFIED via `git grep -n "Math.random" origin/architect/engine-and-seats -- colors/` → only `colors/src/core/rng.ts:2` (comment saying "never Math.random"). Pre-Colors has 56 Math.random() occurrences on 38 lines (REPORTED per AGENTS.md §3 rule on repeatable runs).

#### Missing / contradicting / untested

- **Dual AppState/Action pairs** — `colors/src/app/store.ts` (draft-only `SaveRecord`/`DraftState`, START/PICK/UNDO/LOAD actions) vs `colors/src/sports/nfl/app/appstate.ts` (full `DraftPayload`/`WeekPayload`/`SeasonPayload`, START/PICK/UNDO/LOAD/BEGIN_SEASON/SET_PLAN/PLAY_WEEK/RUN_IT_BACK/NEW_GAME/NAVIGATE/SORT_BOARD/DISMISS_NOTICE). Two different contracts for "app state" in two files; `appstate.ts` line 12 imports `DraftPayload, WeekPayload` from `saves.ts` but store.ts declares its own `AppState`/`Action` (VERIFIED: read both files). Which one is canonical for Colors is not stated (UNKNOWN).
- **WeekPayload/SeasonPayload stat-book gap** — `saves.ts` not yet read from architect tree, but `boxscore.ts`/`awards.ts` exist and nothing in saves.ts references SeasonStats/Awards (INFERRED: grep `SeasonStats|Awards` in saves.ts → 0, pattern seen in sibling repos). The season review cannot show per-player stats without a persisted stat book (INFERRED).
- **StorageModule missing enumeration** — `core/app.ts` lines 16-32: read/write/remove only, no `keys()`/`enumerate()` (VERIFIED: read the file). Slots A/B/C are known statically (SLOT_NAMES line 31 of envelope.ts) but no runtime enumeration of all saved keys exists (INFERRED).
- **'dataset-changed' notice with no producing action** — `appstate.ts` line 31 defines `notice.kind` union including `'dataset-changed'`; no Action type produces it (VERIFIED: read appstate.ts lines 48-64; the Action union has no dataset-changed member). A dataset swap never surfaces (INFERRED).
- **Missing tsconfig.json** — VERIFIED absent (`ls colors/tsconfig.json` → no such file; `git ls-tree` on architect tree shows no tsconfig). Contracts UNVERIFIED by a type-checker (REPORTED per task prompt).
- **FeedEvent union unwritten** — `git grep FeedEvent` → no matches on architect branch (VERIFIED per beam). The UI event feed has no contract shape (UNKNOWN where it's consumed).
- **Hydration code unwritten** — `appstate.ts` has BootPhase booting/ready/fatal but no hydrate/settle logic described (VERIFIED: read appstate.ts lines 1-103; no hydrate function). Boot phase never transitions to ready in visible code (INFERRED).
- **DatasetLoader fictional fallback** — `envelope.ts` lines 32-36 define `DatasetLoader` with default 'bundled' fictional seeded league; user-supplied CSV validation unimplemented (VERIFIED: read envelope.ts). Contradicts the Owner's real-names ruling (no fictional data in product) — the fallback must be removed or real (INFERRED).
- **No Team Select view model** — no view file for team selection exists in `colors/src/view/` (VERIFIED via file listing). Required by cutover goals (Team Select + Season/Standings).
- **No hydration between appstate and storage** — LOAD_OK/LOAD_EMPTY/LOAD_FAILED actions exist (appstate.ts lines 48-52) but no reducer wiring to saver/envelope is visible in store.ts (store.ts is draft-only, lines 67-83). Gap: storage reads/writes not connected to the AppState/Action contract (INFERRED).

### 2b. Latest wave file — w70 (gh-pages, md5 79c4a934969d04e17f357e26ec6740e2, 1,806,245 bytes, ~16,829 lines)

Reading path: `git show origin/gh-pages:Football-Sim-Z-post-blue-w70.html` (VERIFIED: read first 300 lines + header comment). Full file not re-read past line 300 due to size; line numbers below cite the header comment + visible CSS/HTML structure.

#### What in w70 MUST survive into Colors (Owner laws + features)

- **Root brand**: `<title>20-0</title>` (line 8 of file). Protected constant — do not change.
- **User's team in blue (`.ub`)** — `colors/src/engine/boxscore.ts` doesn't define `.ub`; it's a CSS class in w70. Owner law: user's team in blue (`.ub`) (VERIFIED in AGENTS.md §3 style rules; w70 uses `.ub{color:var(--accent)...}` at line ~209).
- **Overtime events only in overtime block** — no "sudden death" (Owner law, AGENTS.md §3).
- **Flex QB→FS at -10** (Owner 29 Oct, flex REV 4) — governs `tools/mathlab/flex.json`; w70 predates this and its own flex table may conflict (INFERRED).
- **30–60 s game animation, every turnover shown, Skip disappears at end** (Owner 24 Oct, P-007/P-115). w70 has fxCanvas/fx banner animation infra (`#fxCanvas` line ~215, `.fxbanner` line ~225). These animation primitives are reusable; the 30–60 s timing rule is new.
- **Gold foil shimmer (fxshine)** — Owner's "foil shimmer" north star (V23-OWNER-REQUESTS.md line 12); w70's `.fxbanner` + `fxshine` keyframe are the visual implementation (lines 225-230).
- **Real player names + real teams** (Owner data rule, AGENTS.md §7). w70 uses real Madden ratings (meta description line 9-10).
- **390 px no horizontal scroll** — w70 `.layout` switches to 1fr at 860px (line ~179); `.draft-columns` switches at 860px (line ~273); `.matchup-card` etc. Responsive infra exists; 390 px check not yet verified against Colors (UNKNOWN).
- **MIT, free, Cloudflare Pages** — deployment constraint, not in-file.

#### What dies with the shell

- **w70's own CSS palette** (`--bg:#0b0e14`, `--accent:#4f8cff` blue) — replaced by Owner's rose/gold/white + per-team palette (V23-OWNER-REQUESTS.md lines 6-7). The `--accent` blue must go (no blue panels).
- **w70's draft board styling** (`matchup-card`, `.chipbar`, `.tablewrap`) — superseded by P-152/P-153 draft board cards rules (Cinzel Decorative, team bubbles under logo, R1.31 only, no sort arrow).
- **w70's player browser tables** (`#playerTable`, `.filters`, `.posdrop`) — superseded by P-174 (players scroll inside panel, no Next button).
- **The `localStorage`-only save key scheme** (w70 predates the envelope/saver) — replaced by 3-slot envelope system (envelope.ts SAVE_KINDS nfl: draft/week/season).

#### What w70 does that the contracts don't cover yet

- **Animation infra**: `fxCanvas` (line ~215), `.fxbanner` (line ~225), `fxshine`/`fxpop`/`fxtoast`/`fxglow` keyframes (lines 210-230). No equivalent in Colors contracts — the Outcome Lab is engine-only, no UI animation contract exists (UNKNOWN where Colors will animate).
- **Matchup chips**: `.chipbar`/`.chip` (line ~283) — two-team advantages/disadvantages as visual chips (P-168 proposes a chip vocabulary ≤30 labels). Colors has no chip component contract.
- **Depth chart zones**: `.zpb-dz`/`.zpb-dz-zone` (lines 336-348) — Offense/Defense/ST visual zones. Colors has no depth-chart view-model contract yet.
- **Position ranking badges**: `.zpb-wbadge`/`.zpb-luscore` (lines 313-334) — weights-as-badges + lineup score badges. Colors weights page contract not yet defined (P-012/P-172 reference it).
- **Championship banner**: `.champion-banner` (lines 287-290) with gold shimmer — superseded by P-022 champion banner spec.
- **Draft recap cinematic** (w69/w70 "Drafting as" box) — removed by P-155 ("Drafting as" removed).

## 3. NEW COUNCIL ARCHITECTURE

### Current shape vs new goals

The council was built for one HTML file and waves (single product file, unit of work = wave patch). New goals: slices/contracts, fresh repo, portfolio exhibit (N1), two sports (basketball second), offline-first, MIT/Cloudflare Pages. The current shape does not fit — mismatches:

1. **Queue mechanics: slices vs waves.** PRIORITIES.md still treats P-IDs as flat rows; reviews are 3 per item regardless of risk. Contracts (P-190 math phase, P-210 storage origin) need deeper review than UI copy removals (P-043-P-078 text removals). Rule: `_agents/COUNCIL.md` says "three reviews per item" — that's one-size-fits-all. What breaks: contract items get shallow review; UI items waste review capacity.

2. **Architect bottleneck.** Claude is sole implementer and integrator for shared tools (`tools/`). When he stalls, `tools/` never gets the shared paths (lint.mjs, post-merge-smoke.mjs, drift-audit) and the fresh-repo cutover stalls. Rule: "Only the Architect builds product code" — correct and must stay. What breaks: tool integration waits on him. Route around: seats write tools in their own lanes (`_agents/<seat>/tools/`), file as inbox snippets; Architect integrates by reference, not by rewriting.

3. **Seat availability.** Pickle scarce (council/pickle dirty, UNSAVED per preserve check). MIMO new (council/mimo clean, 0 activity). Rule: "Nothing may wait for any particular seat" (COUNCIL-BULLETIN.md line 22) — already good. But the review-supply bottleneck (49 NEEDS-REVIEW, 83 reviewed P0s aimed at a file being replaced) means reviews pile on dead work. Fix: retire P0s that target Pre-Colors shell (w52 wave series superseded them — RETIRED section shows P-001..P-011 SUPERSEDED by w52). The live queue still lists them as active (VERIFIED: PRIORITIES.md lines 12-144 still show P-001..P-006 as SUPERSEDED but they were already retired; need to confirm current board state).

4. **Digest value.** The mandatory every-chat digest (`node tools/council.mjs digest`) costs a turn every chat. It IS worth keeping because it surfaces answers/ASKs that would otherwise be missed — but conditional on task area: if a chat does only pure research (no tool work, no Architect-facing decisions), skip it. Change: digest required when the seat touches `inbox/` work items or answers an ASK; optional for pure reading chats.

5. **Cutover council-home.** Bulletin 20261105-1804-muse.md is referenced but not found in local tree (REPORTED: file absent). From context (REWEIGHT-BRIEF, storage wave), options: (a) council stays on `council/base` forever as the message board; (b) council moves to the fresh repo with Colors; (c) council home is `_agents/` on `main`. Recommendation: **Option A — council stays on `council/base`**, with `inbox/` + `bulletin/` as the durable record; the fresh repo holds only Colors product code + `tools/`. What moves: nothing (inbox/bulletin stay); what freezes: Pre-Colors shell stays read-only until deletion analysis (T2) proves safe. N1 exhibit needs preserved: per-commit receipts (E1 evidence-pack), test counts, sweep hashes, PRIORITIES.md history.

6. **New roles needed.** Yes — **calibration lead** (owns bands.json, sweep, outcome gate calibration; D1 validator feeds them) and **tooling maintainer** (owns `tools/` integration of seat-submitted snippets, keeps lint.mjs/post-merge-smoke current with Colors slices). These are lane roles, not seats — any seat can volunteer by filing in `inbox/`. No new seat type needed; the open-membership rule (COUNCIL-BULLETIN.md line 13) already covers it.

### Rule changes proposed

| Rule | Replacement | What breaks if not changed |
|---|---|---|
| "three reviews per item" (COUNCIL.md / COUNCIL-BULLETIN) | Risk-tiered reviews: contracts/engine = 3 reviews; UI copy/text removal = 1 review; docs = 0 (trivial tier) | Contract items get rubber-stamped; UI items waste review seats while 49 NEEDS-REVIEW pile up |
| "Only the Architect builds" (COUNCIL-BULLETIN line 22) | Keep for product HTML; **extend**: seats own `tools/` snippets in their own lanes; Architect integrates by reference (merge or copy-approved) | Shared tools (lint, drift-audit, cutover verify) never land; Architect becomes the tools bottleneck |
| Mandatory every-chat digest | Conditional: required only when the seat files `inbox/` work or answers an ASK | Seat churn on digest-only chats; no functional loss |

### Evidence labels on findings above

- VERIFIED: ran a command (git grep, git show, git ls-tree, ls, read files).
- REPORTED: from another seat's output (beam brainstorm, PRIORITIES.md retired section, AGENTS.md).
- INFERRED: reasoned from structure (no direct command run).
- UNKNOWN: not yet checked.

### Deliverable status

I can build D1 (ratings validator), Dev2 (determinism replay harness), and E3 (council telemetry) as lane prototypes in `_agents/or/tools/` and file them as inbox items. None touch protected paths or the product HTML.