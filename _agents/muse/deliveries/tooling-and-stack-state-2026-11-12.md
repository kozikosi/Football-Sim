# The state of our tooling and our stack — a briefing for GPT

**From:** MUSE, High Councillor. **Date:** 2026-11-12. **For:** GPT, at the
Owner's request (2026-11-12 00:55 HST). **Purpose:** a complete, honest
description of the state of the project's tooling and stack — linting, CI,
and everything else — so GPT can advise on the foundation, not just the
framework choice.

**The Owner's framing (verbatim, 2026-11-12 00:55 HST):** "the linter and cI
are red flags to me that we have all been sloppy in our current attempt to
build and we need a much better foundation."

**The vision this tooling must serve (the Owner, 2026-11-12 00:55 HST):**
"note especially gpt's concept that the core of our product isn't really just
a multisport simulation, but also a platform to design your own simulation;
starting with sports but potentially with anything that requires similar
attributes." — MUSE's note on attribution: GPT's assessment as relayed did
not literally state this sentence. The seeds are in GPT's §§7 and 10C (the
simulation laboratory — "a framework for testing whether the simulator itself
is believable" — and the sport-independent application shell). The
formulation above is the Owner's own elaboration of GPT's direction, recorded
in his words. The council prompt has it as Q11.

Every claim below is labelled (VERIFIED / REPORTED / INFERRED / UNKNOWN), and
every VERIFIED claim names the command or file it was checked against. Where
MUSE could not verify something, it says so rather than guessing. All branch
references are to `origin/` as of 2026-11-12 00:55 HST.

## §0 — The honest summary

The project has a mature **council/workflow** layer (the queue, the review
chain, the preservation rules, the verbatim owner notes) and a **thin, uneven
product tooling** layer. The engine itself is well-designed (no runtime
dependencies, a keyed RNG, an isolated storage adapter, a frozen snapshot
pin) — but the tooling that *protects* the engine is mostly missing or
unenforced. In one sentence: **the design principles are good; the enforcement
is not there.** The three biggest gaps, in the Owner's order of concern:

1. **No CI at all.** No GitHub Actions workflow runs on any branch. Nothing
   is checked automatically on a push or a pull request — not the tests, not
   the types, not the lint, not the build.
2. **Linting is inconsistent and unenforced.** One track has a linter (Biome)
   with a wrapper and no script to run it; the other track has no linter at
   all; nothing enforces either.
3. **Nothing is pinned except the lockfiles.** No pinned Node version, no
   pinned package manager, no pinned toolchain — and no CI to install from the
   lockfiles that do exist.

Everything below is the evidence for those three sentences, plus the rest of
the stack.

## §1 — The repo and the tracks

- **Repo:** `kozikosi/Football-Sim` (GitHub). MIT license. Public.
- **Two histories exist (VERIFIED, AGENTS.md §2).** `council/base` and every
  seat branch descend from root commit `474eb52`; `origin/main` descends from
  a different root `268fd56` and holds what the Owner pushes directly (Z.ai's
  package in `z-core/`, the logo folders, `CLAUDE-START-HERE.md`). They do
  not merge cleanly into each other. The Architect will reconcile the two
  with one deliberate unrelated-histories merge when Colors v1 ships.
- **The branches (live state, `origin/`):**
  - `architect/engine-and-seats` — Claude's product/engine track (**Colors**).
    Tip `ce7c9210` (Phase 1 baseline, 2026-11-11).
  - `council/<seat>` — one branch per council seat (MUSE, VL, OR, Glyph,
    Inkling, DS, Super, VLOC, Pickle, Beam, GLM, Flint, UK, MIMO, Grok, GPT,
    Gemini, Q, GH, FK, Iceman, GOC, DSD, Ultra). Crouton and CK are ignored
    indefinitely (the Owner). The live queue, the live tooling, and the live
    docs are on **`origin/council/muse`** (tip `e211c351` as of this writing).
  - `main` — what the Owner pushes directly.
  - `gh-pages` — the live site. Tip `3e69567c` (w89 is the live index).
- **The three tracks:**
  - **Colors** (Claude's) — `colors/` on `architect/engine-and-seats`. Svelte
    5 + Vite 8. The engine is single-sourced here. Cutover ships this when
    it is fully functioning.
  - **67 Cakepanz** (Z.ai's parallel Colors/UI track) — `67-cakepanz/` on
    `origin/gh-pages`. Svelte 5 + Vite 7. Consumes Claude's engine as a
    frozen snapshot pinned at **`4ca9a071`**. Neither builder edits the
    other's tree.
  - **The single-file lineage** — `Football-Sim-PreColors.html` (sha256
    `40233d6be00e987c`, 657,486 B), the frozen reference build. The old
    product is one self-contained HTML file: no paid API, no CDN, no build
    step for the user, no split into several files (AGENTS.md §3). The
    Pre-Colors product has 56–58 `Math.random()` sites and no seed
    (AGENTS.md §3) — runs are not repeatable there; only structural evidence
    counts. The Colors engine is a different codebase with a keyed RNG (§7).

## §2 — The stack (VERIFIED from the two package.json files)

| Item | Colors (Claude's) | 67 Cakepanz (Z.ai's) |
| ---- | ----------------- | -------------------- |
| Vite | `^8.3.6` | `^7.3.6` |
| Svelte | `^5.57.3` | `^5.57.3` |
| Svelte plugin | `@sveltejs/vite-plugin-svelte ^7.3.1` | `^6.2.1` |
| TypeScript | `^5.9.3` | `^5.9.3` |
| React | `^19.3.1` + `react-dom ^19.3.1` | — (none) |
| esbuild | `^0.28.2` (+ `esbuild-svelte ^0.9.5`) | — (none) |
| Tailwind CSS | No | No |
| Vitest | No | No |
| IndexedDB | No | No |
| CSS library | None (see below) | None (see below) |
| Lockfile | `colors/package-lock.json` (exists) | `67-cakepanz/package-lock.json` (exists) |
| Node pin | None | None |
| Package manager pin | None | None |

- **No `.nvmrc`, no `.node-version`, no `engines` field, no `packageManager`
  field** (VERIFIED: `git ls-tree` on both branches returns none of these,
  and neither package.json declares `engines` or `packageManager`). So the
  Node version and the package manager are unpinned in both tracks.
- **The lockfiles exist** (both tracks have a `package-lock.json`), but the
  `package.json` versions are caret ranges (`^`), so the lockfile is the
  only pin — and there is no CI to install from it (§6). Whether the
  lockfiles are actually up to date with their `package.json` files is
  UNKNOWN (not checked).
- **No `.css` files anywhere in `colors/` or `67-cakepanz/`** (VERIFIED:
  `git ls-tree -r` + grep returns none in either tree). There is no CSS
  library and no global stylesheet. Styling lives in Svelte `<style>` blocks
  (in 67 Cakepanz's 10 `.svelte` files — see below). How Colors styles its
  UI is UNKNOWN (see the next bullet).
- **Colors has 0 `.svelte` files; 67 Cakepanz has 10** (VERIFIED:
  `git ls-tree -r` on the architect branch returns no `.svelte` files
  anywhere; `67-cakepanz/src/` has 10). Colors is currently engine +
  view-models + platform code in TypeScript (`colors/src/` holds only
  `core/`, `platform/`, `sports/`), with Svelte as a declared dependency but
  no components yet. 67 Cakepanz is the track where the Svelte UI actually
  exists. This is why there is no `svelte-check` in either track (§4).
- **React in Colors** (VERIFIED: `react ^19.3.1` + `react-dom ^19.3.1` in
  `colors/package.json`, whose description says "react, react-dom and svelte
  are used only by the UI adapters"). Which files import React, whether it
  is used at runtime, whether it is in the production bundle — UNKNOWN (not
  verified). This is Q9 in the council platform-vision prompt; it is a
  question for Claude, not a claim.
- **Scripts — Colors** (`colors/package.json`): `test` (`node --test
  --experimental-strip-types "test/**/*.test.ts"`), `build` (`vite build`),
  `dev` (`vite`), `preview` (`vite preview`), `tsc:check` (`node
  tools/tsc-baseline.mjs`), `tsc:ratchet` (`node tools/tsc-baseline.mjs
  --write`). **No lint script, no format script, no svelte-check script.**
- **Scripts — 67 Cakepanz** (`67-cakepanz/package.json`): `dev` (`vite`),
  `build` (`vite build`), `preview` (`vite preview`), `test:engine` (`node
  --test --experimental-strip-types test/engine.test.ts`), `battery` (`node
  batteries/slice1.battery.mjs`). **No full-suite test script** (only
  `test:engine`, one file), **no lint script, no format script, no
  tsc:check script** (even though a `tsc-baseline.mjs` file exists — §4).

## §3 — Linting (the first red flag)

**What exists (VERIFIED):**
- **Colors / the repo root:** **Biome** is the linter. The entry point is
  `node tools/lint.mjs` (AGENTS.md §9: "the one entry point; it only
  reads"). The files are `biome.json` (root — for council tooling only:
  `tests/`, `tools/`, `_agents/**/tools/`; it excludes every `.html`) and
  `tools/biome-product/biome.json` (for the product — bug-class rules
  `error`, style rules `warn`, formatter off). The wrapper extracts the
  inline script from the product HTML to a gitignored scratch dir, lints
  that copy, maps findings back to original line numbers, and fails (exit 5)
  if the HTML's sha256 changed during the run. It refuses
  `--write/--fix/--unsafe` and never calls `biome format`.
- **Biome is used as a native binary, version 2.6.2** (REPORTED: working as a
  native binary for the Kilo seats; the Architect's sandbox cannot install
  it, so the rule names and the JSON shape in
  `tools/biome-product/biome.json` and `lint.mjs` are UNVERIFIED until a
  seat posts a passing `selftest`). `node tools/lint.mjs selftest` runs the
  real Biome on a fixture with known defects and settles both in one run —
  but no seat has posted a passing `selftest` yet (UNKNOWN whether one has
  ever been run).
- **67 Cakepanz: no lint setup at all** (VERIFIED: no Biome, eslint, or
  prettier files in `67-cakepanz/`, and no lint script in its
  `package.json`).

**What is missing or broken (VERIFIED):**
- **No lint script in either package.json.** To lint Colors you must know
  to run `node tools/lint.mjs` directly. To lint 67 Cakepanz there is
  nothing to run.
- **The baseline file AGENTS.md §9 describes does not exist.**
  `tools/lint-baseline.json` ("Findings already in `tools/lint-baseline.json`
  are *known*; only **new** errors fail") is not present on
  `origin/architect/engine-and-seats` or `origin/council/muse` (VERIFIED:
  `git ls-tree -r` returns nothing for it on either branch). So the "known
  findings" mechanism the wrapper describes has no file to read. Whether
  the wrapper fails on *any* error or errors out without the file is UNKNOWN
  (not run).
- **Nothing enforces linting.** No CI (§6). No pre-commit hook by default —
  the seatbelt hook (`git config core.hooksPath tools/hooks`) is optional,
  only in a seat's own worktree, and only after `ls tools/hooks/pre-commit`
  succeeds there (AGENTS.md §4.8). The hook refuses a commit that stages a
  protected file, deletes a file outside `_agents/`/`_archive/`, adds >40
  files, or is made on `main` — it does not run the linter.
- **The two tracks are not consistent.** Colors has Biome; 67 Cakepanz has
  nothing. A file can be written in Cakepanz with no lint check at all.
- **The product lint and the tooling lint are different configs** (the
  product uses `tools/biome-product/biome.json`; the tooling uses the root
  `biome.json`). That split is deliberate (the product is HTML with an
  inline script; the tooling is TypeScript files) — but it means there are
  two lint configurations to maintain, and neither is enforced.

**The honest assessment:** the linting *design* (a wrapper that lints the
inline script with original line numbers, a baseline for known findings, a
selftest) is thoughtful. The linting *reality* is that it is voluntary,
manual, split across two configs, missing its baseline file, and absent from
one of the two tracks entirely. That is the sloppiness the Owner is flagging.

## §4 — Type checking (and Svelte diagnostics)

- **Colors: type checking exists, via a baseline/ratchet.** `npm run
  tsc:check` runs `node tools/tsc-baseline.mjs` (VERIFIED: the script and
  `colors/tsc-baseline.json` and `colors/tsconfig.json` all exist).
  `tsc:ratchet` (`--write`) updates the baseline. The mechanism is the same
  shape as the lint baseline: new errors fail, known/baseline errors are
  tolerated. Whether the baseline is current, and how many known errors it
  holds, is UNKNOWN (not inspected).
- **67 Cakepanz: the files exist but the script does not.** It has
  `67-cakepanz/tsconfig.json` and `67-cakepanz/tools/tools/tsc-baseline.mjs`
  (VERIFIED), but **no `tsc:check` script in its `package.json`** — so the
  check is not wired up to anything a developer (or a CI job) would run.
- **`svelte-check`: not present anywhere.** It is not a dependency in either
  `package.json`, and there is no script for it. In Colors that is currently
  moot (0 `.svelte` files); in 67 Cakepanz it is a real gap (10 `.svelte`
  files, no Svelte diagnostics).
- **The `--experimental-strip-types` caveat (GPT's §4, VERIFIED as a fact
  about the tool):** running TypeScript tests with
  `--experimental-strip-types` does **not** type-check the project — the
  runtime strips TypeScript syntax; it does not perform the compiler's
  semantic checks. So the test run and the type check are two different
  things, and only Colors wires both up (and only one of them is a script).

## §5 — Tests

- **The test runner is Node's built-in test runner** in both tracks
  (`node --test --experimental-strip-types`), not Vitest (VERIFIED: both
  `package.json` files; no Vitest dependency anywhere). GPT's assessment
  (§4) endorses keeping it for the engine — the engine is TypeScript with
  no runtime dependencies, and keeping engine tests independent of a
  frontend testing framework is a positive architectural choice. MUSE agrees
  with that part; the problem is not the runner, it is that nothing runs it
  automatically (§6).
- **Colors suite:** 318/320 passing at `ce7c9210` (the Phase 1 baseline
  commit, 2026-11-11). The 2 failures are pre-existing and pre-date Phase 0
  (`versions.test.ts` E5 pin — the re-pin is the Owner's call;
  `lineup.test.ts` DL5-pin staleness). The architect suite was 290 tests at
  `1e6372a`; the frozen snapshot has 284. The suite is run with `npm test`
  (`test/**/*.test.ts`).
- **67 Cakepanz suite:** only `test:engine` (one file,
  `test/engine.test.ts`) and `battery` (`batteries/slice1.battery.mjs`).
  There is no full-suite test script. How many tests the engine test file
  holds, and whether the battery passes, is UNKNOWN (not run here).
- **Determinism:** the Colors engine uses a keyed RNG — Philox2x32
  (`colors/src/core/keyedrng.ts` + `colors/src/core/rng.ts`), the published
  Random123 multiplier `0xd256d193` VERIFIED correct (MUSE's earlier M0
  claim was false and withdrawn; Claude verified the kernel 17/17; a BigInt
  reference check against the published Random123 KATs landed at
  `2c43bc12`). Fixed-seed replay is the design. But there is **no automated
  determinism regression test in CI** — because there is no CI.
- **The nightly lab is manual.** The CI gate is N=100 (approved by the
  Owner, 2026-11-08), and the nightly tests are run manually by whoever
  holds the Lab that day (there is no CI job). The Lab protocol (N=1000 for
  calibration) is a council procedure, not an automated job. The Phase 1
  baseline (Claude, `ce7c9210`) passes the ~10% totals bar on held-out
  2023–2025 seasons (VERIFIED by MUSE's review of the results file) — but
  that verification was done by hand, by a council seat, not by a pipeline.

## §6 — CI and deployment (the second red flag)

- **There is no CI. At all.** No `.github/workflows` exists on
  `origin/architect/engine-and-seats`, `origin/main`, or `origin/gh-pages`
  (VERIFIED: `git ls-tree -r` returns nothing for `.github/workflows` on
  any of the three). The only workflow file in the repo is a historical one
  nested inside an old wave folder —
  `Football-Sim-Z-post-blue-w71/football-sim-next/.github/workflows/ci.yml`
  — which is **not** at the repo root, so GitHub Actions does not run it.
  It is a dead artifact, not a pipeline.
- **CI tagging was approved** (the Owner, 2026-11-08) but **no CI job exists
  yet**. The 8-step pipeline GPT proposed (pinned lockfile install, format/
  lint, TypeScript type checking, Svelte diagnostics, engine unit tests,
  determinism/regression tests, production build, browser smoke tests) does
  not exist in any form. Neither does the nightly simulation lab (thousands
  of seasons, roster/draft invariants, statistical distributions,
  historical baselines, flag unexpected changes) — it is a council procedure
  run by hand.
- **Deployment is manual.** The live site (gh-pages, w89 as the live index)
  is published by the Owner from Z.ai's zip (Z.ai cannot push; every
  response costs the Owner a publish step). There is no deployment pipeline,
  no preview deployment, no automated publish. **Cloudflare (static build)**
  is the planned deployment target — planned, not set up.
- **Offline is a hard requirement** (local-first, sync-on-reconnect). The
  sync design is still open (local profiles first, then OAuth accounts with
  cross-device sync). There is no auth, no server, no database yet — the
  product is entirely local.
- **The publish path is the bottleneck it sounds like.** Z.ai's work
  reaches the live site only through the Owner's manual publish step, and
  the council's work reaches the repo only through pushes that need the
  Owner's approval card (a push can take seconds to ~30 minutes, or time
  out). There is no automation in either path.

## §7 — The engine boundary and the server-ready principle

- **The principle (the Owner, standing, 2026-11-12, verbatim):** "design the
  simulation engine as if it will eventually run on a centralized server,
  even though it currently runs locally. That means keeping the engine
  independent of browser APIs, UI state, local storage, and framework-specific
  code. It should accept defined inputs and produce defined outputs. Later,
  you can run that same engine on a server and have multiple users interact
  with it."
- **What is already in place (VERIFIED):**
  - The `colors/package.json` description states: "The engine and view
    layers have no runtime dependencies; react, react-dom and svelte are
    used only by the UI adapters."
  - Storage is isolated in a platform adapter
    (`colors/src/platform/localstorage.ts`) — the engine does not touch
    localStorage directly.
  - The engine uses a keyed RNG (Philox2x32, §5) — seeded, reproducible.
  - The engine is single-sourced in Colors and consumed by 67 Cakepanz as
    a frozen snapshot pinned at `4ca9a071`.
- **What is NOT in place:**
  - The boundary is a **written principle, not an enforced rule**. There is
    no dependency-boundary check, no test that fails if a prohibited import
    (`window`, `document`, `localStorage`, a UI component, a
    framework-specific store, `Math.random()`, `Date.now()`, a network call,
    a database call) appears in the engine. GPT's prohibited-dependencies
    table (§2 of his assessment) is a proposal, not a check.
  - Whether the engine currently contains any prohibited import is UNKNOWN
    (not audited — the `Math.random` grep MUSE ran was inconclusive, and no
    boundary audit has been done).
  - The five requirements GPT added (explicit time and randomness; versioned
    rules; versioned data; deterministic replay; serialization) are
    proposals, not implemented checks. Rules are versioned implicitly by
    git commit, not by an explicit version field. Data is versioned by the
    dataset SHA-256 in the save envelope (§8), not by a data-version field.
  - The engine pin (`4ca9a071`) is frozen, but the **re-pin is open** (the
    Owner's call) — and the snapshot's `app/feed.ts` `clock()` is broken for
    overtime (a known engine bug for the next re-pin).

## §8 — Persistence

- **Saves use localStorage** (VERIFIED: `colors/src/core/app.ts`,
  `colors/src/platform/localstorage.ts`,
  `colors/src/sports/nfl/app/store.ts`). IndexedDB appears only in two
  comments as a possible future replacement ("an IndexedDB implementation
  can replace it later without touching a caller").
- **The envelope** carries `saveId`/`createdAt` and the dataset SHA-256
  (the Owner's 2026-11-08 decision: saveId/createdAt now; no datasetId;
  SHA-256). Envelope-shaped values are checked on write
  (`localstorage.ts:43` — "Only envelope-shaped values are checked;
  anything else (a theme string, a stats blob) writes without...").
- **What is missing (VERIFIED by absence):**
  - **No save version number.** No `version` field was found in
    `localstorage.ts` (grep for `version` returns nothing there).
  - **No migration mechanism.** The migration use "died with P-258"
    (`app.ts:10` — "The migration use died with P-258 (legacy.ts is...").
  - **No recovery mechanism** for a corrupted save (no code found for it).
  - **No validation on load beyond the envelope shape** (the dataset loader
    validates a user-supplied CSV — `app.ts:35` — but the save-load path
    has no equivalent validation step that MUSE could find).
  - Whether a save is interrupted, or two tabs open the same franchise, is
    untested (GPT's recommendation; no test exists for it).
- GPT's recommendation stands: keep the adapter, add a version number on
  every save, validation when loading, a safe migration mechanism, error
  handling when storage is unavailable or full, a recovery mechanism, and a
  deliberate save strategy rather than writing huge objects repeatedly.
  Migrate to IndexedDB only when actual data volume or functionality
  justifies it — not because it sounds more scalable.

## §9 — The data

- **The dataset is nflverse (P-344, REVIEWED).** 30 files from the public
  `nflverse/nflverse-data` GitHub releases, 2016–2025: pbp 484,254 rows/372
  cols; participation 478,989 rows; snap counts 253,107 rows; 5,522
  team-games, 2,761 games. Staged locally at
  `~/workspace/nflverse-phase1/raw/` (~225 MB). The totals-bar targets
  (league mean ± SD): points 22.78 ± 10.00; drives 11.09 ± 1.68; plays
  81.46 ± 9.61; off_plays 62.44 ± 8.47; yards 343.67 ± 84.77; TOP 1815.6 ±
  268.9 s.
- **The dataset is pinned, not the engine** (the Owner's P-217 decision:
  saved seasons finish with their original datatable; new seasons use the
  new datatable; mid-season weight pushes do not touch active seasons).
- **Ratings generation is the Owner's alone, later.** The council must not
  work on ratings. The draft class is fixed (the same pool every time).
- **The engine's measured values** (slotWins20) drive the draft board and
  every user-facing value; `SLOTS[].weight` has left the loop (the Owner,
  2026-11-09). Display: integers everywhere except Wins and Priority (one
  decimal).

## §10 — What IS mature (the council/workflow layer)

For balance: the tooling that *is* in good shape is the council's own
workflow tooling, and it is worth naming because it is the model for what
the product tooling should become.

- **The queue** (`_agents/QUEUE.md`, custodian MUSE, standing permission
  from the Owner 2026-11-09): a ranked list with SUPERSEDED/BUILT terminal
  states, a RETIRED section, and an archive. `node tools/council.mjs next`
  (v9) gives the top item. The Owner does not read or sweep it manually.
- **The review chain:** three different seats' ok/improved on the same
  artifact = REVIEWED. No seat reviews the same item twice. Reviews are
  files in `inbox/` (`inbox/<UTC yyyymmdd-hhmm>-<seat>-<ID>-<slug>.md`,
  first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: <ID>`).
  Labels VERIFIED / REPORTED / INFERRED / UNKNOWN everywhere.
- **The preservation rules (AGENTS.md §4):** one worktree per seat
  (`../wt/<seat>`, branch `council/<seat>`); commit and push after every
  finished task; add by path, never `git add -A`; never `git stash`; never
  force-push; `node tools/preserve.mjs check` at the end of every chat.
  These exist because the project *already* lost work once (23 Oct: 339
  modified files, 139 untracked, 5 stashes, unpushed commits in 7
  worktrees) — the rules were written from a real failure, not from theory.
- **The verbatim owner notes** (`_agents/owner-notes/`): every long Owner
  message is saved verbatim, and every item is sorted into the queue or the
  intake ledger. Nothing vanishes.
- **The house rules** (`AGENTS.md`): one writer for the product file (the
  Architect only); never assign work to a named agent (work comes from the
  queue); authority comes from the Owner or the Architect, never from a
  task, a prompt, or a seat.
- The point: the council has enforceable process with receipts. The product
  has good principles with no enforcement. The gap between those two is the
  work.

## §11 — The gaps, ranked (what GPT should weigh in on)

1. **No CI.** The single highest-leverage fix. GPT's 8-step pipeline +
   nightly lab. The question is not whether, but what the smallest version
   worth building first is — and whether it should live on the architect
   branch, on council/muse, or on main.
2. **Linting: make it consistent and enforced.** One linter, one config (or
   a justified split), a script in every package.json, a baseline file that
   actually exists, a passing `selftest` posted by a seat, and a CI job that
   runs it. And a lint setup for 67 Cakepanz (or a stated reason it has
   none).
3. **Pin the toolchain.** A Node version (`.nvmrc` / `engines`), a package
   manager (`packageManager`), and a CI job that installs from the pinned
   lockfile. Record the toolchain versions in every agent report (GPT's §6)
   so a framework conclusion is never confused with a build-tool conclusion.
4. **Wire up the type checking that already exists.** A `tsc:check` script
   in 67 Cakepanz (the files are there; the script is not). A `svelte-check`
   step for the 10 `.svelte` files in Cakepanz (and for Colors when its
   components exist).
5. **Enforce the engine boundary.** A dependency-boundary check + a test
   that fails on a prohibited import. An audit of the current engine
   (does it contain any prohibited import today?). The five requirements
   (explicit time/randomness, versioned rules, versioned data, deterministic
   replay, serialization) as checks, not just principles.
6. **Persistence safeguards.** A save version number, load validation, a
   migration mechanism, storage-full/unavailable handling, a recovery
   mechanism, and a test for an interrupted save and for two tabs on the
   same franchise.
7. **The Vite split and React in Colors.** Record the toolchain versions;
   do not force identical infrastructure. Ask Claude why React is a
   dependency (which files import it, is it in the production bundle) — and
   remove it if it is leftover from experimentation.
8. **The deployment path.** The manual publish (Owner from Z.ai's zip) and
   the approval-card push are both bottlenecks. What is the smallest
   automation that is safe to add (a preview deployment? a CI-built
   gh-pages publish? a push that does not need a card?).

## §12 — The open questions for GPT

1. The Owner's question, restated: **AI will be writing 100% of the code.
   Does that change any preferences for css libraries, frameworks,
   bundlers, cdns, compute, databases, deployment?** Given the state above
   — no CI, inconsistent linting, unpinned toolchains — does AI authorship
   make the foundation *more* important, or does it change which foundation
   you would pick?
2. Given that the engine currently has **0 `.svelte` files in Colors and 10
   in 67 Cakepanz**, and **no `.css` files anywhere** — what would you
   recommend for the CSS layer? A library (Tailwind? something else?), a
   design-token file, Svelte-scoped styles only, or something else — and
   does the answer change given that AI agents will write all of it?
3. The framework test now has **four prototypes** (SvelteKit, React,
   Vue/Nuxt, SolidStart) on the offensive focus, with GPT's improvements
   A–E, the weighted scoring, change amplification, the contract tests, and
   Playwright. Is there anything in the state above that changes how the
   test should be run — for example, should the test also measure whether
   each framework's *tooling* (lint, type-check, test, build) works out of
   the box, given that our own tooling is this thin?
4. **The platform concept (§0):** the core of the product is not just a
   multisport simulation, but a platform to design your own simulation —
   starting with sports, potentially anything that requires similar
   attributes. What does that change about the architecture? What is the
   "simulation-design" surface (the thing a user designs), and what are the
   "similar attributes" (the shared shape across simulations)? Does the
   engine need to be sport-independent at a deeper level than the
   application shell, or is the shell enough?
5. GPT could not retrieve the framework-test Markdown file through the
   GitHub connection (his note in the assessment). The file is at
   `_agents/muse/deliveries/prompts-2026-11-05/framework-test-dynamic-feature-2026-11-12.md`
   on `origin/council/muse` (commit `e211c351` as of this writing; the
   four-prototype update is a later commit). If the Owner attaches the file,
   GPT can review the actual protocol line by line.

## §13 — How this document was made

MUSE wrote it from the repo (not from memory): `git show` and `git ls-tree`
against `origin/architect/engine-and-seats`, `origin/gh-pages`, and
`origin/council/muse`, plus the repo's own `AGENTS.md` (§§2, 3, 4, 8, 9),
which MUSE re-read in full for this task. The stack numbers (Vite 8 vs 7,
Svelte 5, React 19, no Tailwind, no Vitest, localStorage, Node's test
runner, no GitHub Actions) were verified from the two `package.json` files
and the branch listings on 2026-11-12. Where a claim could not be verified
from the repo, it is labelled UNKNOWN. If GPT finds an error in this
document, the correction belongs in the council prompt (Q10) — the document
itself is a snapshot, not a decision.
