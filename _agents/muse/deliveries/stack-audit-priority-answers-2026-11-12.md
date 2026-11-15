# Football-Sim stack audit — the 25 priority questions, answered

**From:** MUSE, High Councillor. **Date:** 2026-11-12. **For:** the Owner
(KG), from his complete architecture and technology questionnaire (Part 23 —
the 25 priority questions). **Method:** every answer was verified against the
repository (`origin/architect/engine-and-seats`, `origin/gh-pages`,
`origin/council/muse`, `origin/main`) with `git show` / `git ls-tree` /
`git grep` on 2026-11-12, not from memory or from planning documents. Where
MUSE could not verify something, it says "don't know."

**How to read each answer.** **Current** = what is actually implemented in
the repository and its dependencies (not what an agent recommended, not what
a planning document says). **Intended** = what the project wants to use.
**Decision** = Locked / Preferred / Intended / Undecided / Rejected. **Evidence**
= the file or command the answer was checked against.

**Two things to know before reading the answers:**
1. **The framework test's SvelteKit prototype does not match the current
   app.** The current app is **Svelte + Vite (no SvelteKit)** in both tracks.
   The test's first prototype is **SvelteKit** (the meta-framework). If
   SvelteKit wins the test, the app would move to SvelteKit — a change from
   the current Svelte+Vite setup. The test design should clarify whether it
   is testing SvelteKit or Svelte+Vite (see Q1 and D2 in the decisions
   register).
2. **React is installed but not used.** No source file in Colors imports
   React, and there are no `.tsx`/`.jsx` files anywhere. It is the clearest
   case of "installed but aren't using" in the audit (see Q3).

---

## 1. Application framework — Is the actual app SvelteKit, or Svelte + Vite without SvelteKit?

- **Current:** **Svelte + Vite, NOT SvelteKit** — in both tracks. There is no
  `@sveltejs/kit` in either `package.json`, no `svelte.config.js`, and no
  `src/routes/` in either track (VERIFIED: `git ls-tree` + `git show` on both
  branches). Colors runs `vite build` / `vite`; 67 Cakepanz runs `vite build`
  / `vite`. There is no SSR, no prerendering, no server load functions, no
  form actions, no API routes, and no server-side code in either track.
- **Intended:** Svelte + Vite (the current implementation). SvelteKit is NOT
  the intended application framework — nothing in the repo or the recorded
  decisions says it is. (The framework test's SvelteKit prototype is a *test*
  prototype, not the intended app framework — see the note above.)
- **Decision:** **Undecided.** The framework is open and under test (four
  prototypes: SvelteKit, React, Vue/Nuxt, SolidStart). The application
  framework (SvelteKit vs Svelte+Vite) is a separate, unresolved question
  inside that test — see D2 in the decisions register.

## 2. Svelte version — Is Svelte 5 the current production implementation?

- **Current:** Svelte **`^5.57.3`** is the declared dependency in both tracks
  (VERIFIED from both `package.json` files). But the two tracks differ in
  what actually exists: **67 Cakepanz has 10 `.svelte` files** that use Svelte
  5 runes (`$state` / `$derived` / `$effect` — VERIFIED in 5 files) and
  `svelte/store` (VERIFIED in `App.svelte` and `draftStore.ts`), so Svelte 5
  is the live implementation there. **Colors has 0 `.svelte` files**
  (VERIFIED: `git ls-tree -r` on the architect branch returns none) — Svelte
  5 is installed in Colors but has no components yet. The live site (gh-pages,
  w89) is 67 Cakepanz, so **Svelte 5 is the current production implementation
  in the track that is actually live**.
- **Intended:** Svelte 5 (the current implementation).
- **Decision:** **Preferred.** Svelte 5 is the current implementation; the
  framework choice itself is undecided pending the test.

## 3. React dependency — Why is React 19 installed in Colors, and is it used in production?

- **Current:** React **`^19.3.1`** + `react-dom` **`^19.3.1`** are dependencies
  in `colors/package.json` (VERIFIED). **No source file in `colors/src/`
  imports React** (VERIFIED: `git grep "from 'react'"` returns nothing), and
  there are **no `.tsx` / `.jsx` files** anywhere on the architect branch
  (VERIFIED). So React is **installed but NOT used** — it has no consumers in
  the current code. Whether it is in the production bundle: since nothing
  imports it, it should not be in the bundle, but the bundle was not
  inspected — **don't know**. The `package.json` description says React is
  "used only by the UI adapters" — but no UI adapter file imports it, so that
  description does not match the current code.
- **Intended:** Don't know. No decision has been recorded about why React is
  there. It is a question for Claude (Q9 in the council platform-vision
  prompt: which files import React, is it used at runtime, is it in the
  production bundle, is it leftover from experimentation?).
- **Decision:** **Undecided** — and a cleanup candidate. If it is leftover
  from experimentation, remove it. If it is genuinely needed for an isolated
  adapter, say so and name the files. (See D16 in the decisions register.)

## 4. Vue experiment — Is the Vue prototype Nuxt or Vue + Vite?

- **Current:** The test has not been run yet, so there is no Vue prototype in
  the repo.
- **Intended:** **Nuxt** — the framework-test design lists "Vue/Nuxt" as the
  third prototype (the meta-framework, parallel to SvelteKit and SolidStart).
- **Decision:** **Intended** (Nuxt, as designed; not yet built). The React
  prototype's build tool is the one gap here: the test design specifies
  "React" without a meta-framework (Next.js is explicitly *not* in the test —
  it is a React meta-framework and React is already represented), so the
  implied build tool for the React prototype is Vite, but the test design
  does not say so explicitly. That should be closed in the test design
  (see D2).

## 5. CSS — What styling system is actually being used?

- **Current:** **Plain CSS in Svelte `<style>` blocks** — in 67 Cakepanz,
  all 10 `.svelte` files have exactly 1 `<style>` block each (VERIFIED:
  `git grep -c "<style"`). **No `.css` files anywhere** in either track
  (VERIFIED), **no Tailwind CSS**, **no CSS library**, **no design-token
  system**, **no global stylesheet**, **no CSS variables for themes** (no
  central definition file exists). **Colors has no styling at all** — no
  `.svelte` files, no `.css` files, and no `<style>` or stylesheet reference
  in `colors/index.html` (VERIFIED). There is no dark mode, no light mode,
  no shared design system, and no reusable control library — Cakepanz's
  components are hand-built.
- **Intended:** Undecided. No CSS decision has been made. The "everything is
  up in the air" standing rule (2026-11-12) covers CSS libraries.
- **Decision:** **Undecided.** (See D3 in the decisions register — the CSS
  decision is one of the hardest to reverse, and it should be made before
  the UI grows further.)

## 6. UI library — Are you using a component library or building components yourself?

- **Current:** **Building components yourself.** No component library is
  installed in either track (no Skeleton, shadcn-svelte, DaisyUI, Flowbite,
  or Bits UI — VERIFIED from both `package.json` files). Cakepanz's 10
  `.svelte` files are hand-built components (`App`, `DraftBoard`, `BoardRow`,
  `BoardHeader`, `BoardFooter`, `LineupAdvice`, `ModeSwitch`, `SlotPicker`,
  `SortControls`, `TeamSelect`). Buttons, dropdowns, modals, tooltips, tabs,
  and other controls are not reusable library components — they are built
  per screen (or not built yet).
- **Intended:** Undecided.
- **Decision:** **Undecided.** (See D4 — the component-library choice is one
  of the most consequential CSS/UI decisions, and it interacts with the
  framework test: a library that exists for Svelte but not for React (or
  vice versa) changes the comparison.)

## 7. Icons — Which icon library is installed?

- **Current:** **None.** No icon library is installed in either track (no
  Lucide, Heroicons, Font Awesome, or Material Icons — VERIFIED from both
  `package.json` files), and no icon imports exist in Cakepanz's source
  (VERIFIED: `git grep` for icon imports returns nothing). Whether any icons
  exist at all as inline SVG was not checked in detail — **don't know**.
- **Intended:** Undecided.
- **Decision:** **Undecided.** (See D5 — a low-cost decision if icons are
  centralized, but it should be made deliberately rather than drifting.)

## 8. Charts — Which charting library, if any, is installed?

- **Current:** **None.** No charting library is installed in either track
  (no Chart.js, D3, ECharts, or Recharts — VERIFIED from both `package.json`
  files). Statistics are rendered as tables/text, not charts (INFERRED from
  the absence of a charting library; the rendering was not inspected in
  detail).
- **Intended:** Undecided.
- **Decision:** **Undecided.** (See D6 — defer until the statistical
  dashboards are built; the choice should follow the dashboard requirements,
  not precede them.)

## 9. Package manager — Are you using pnpm, npm, or Yarn?

- **Current:** **npm.** `package-lock.json` exists in both tracks (VERIFIED:
  `colors/package-lock.json` and `67-cakepanz/package-lock.json`). There is
  no `pnpm-lock.yaml`, no `yarn.lock`, and no `bun.lockb` in either track
  (VERIFIED). (A third `package-lock.json` exists in the historical
  `Football-Sim-Z-post-blue-w71/football-sim-next/` folder — the friend's
  project copy, not a live track.)
- **Intended:** npm (the current setup; no decision to change has been
  recorded).
- **Decision:** **Preferred.** npm, by current use. Not locked — the
  "everything is up in the air" rule means it could change, but there is no
  reason to change it: npm works, the lockfiles exist, and switching package
  managers would be churn for no benefit.

## 10. Workspaces — Is this a single-package project?

- **Current:** **Yes, single-package.** There are no workspaces — no
  `pnpm-workspace.yaml`, no `lerna.json`, no `turbo.json`, and no `workspaces`
  field in either `package.json` (VERIFIED). Each track is its own single
  package (`colors/` and `67-cakepanz/` are separate packages in separate
  locations, not a monorepo). There is no monorepo tooling.
- **Intended:** Single-package (no monorepo decision has been made).
- **Decision:** **Preferred.** Single-package, by current shape. The
  monorepo question (workspaces vs separate packages) is undecided, but the
  current shape works and there is no reason to introduce workspaces now —
  the two tracks are intentionally separate (neither builder edits the
  other's tree).

## 11. Linting — Is Biome the current standard, or are you using ESLint?

- **Current:** **Biome is the standard in Colors** (per AGENTS.md §9; the
  entry point is `node tools/lint.mjs`; the configs are the root `biome.json`
  and `tools/biome-product/biome.json`). **Biome 2.6.2** is the version
  (VERIFIED: the `$schema` URL in the root `biome.json` is
  `https://biomejs.dev/schemas/2.6.2/schema.json`; AGENTS.md §9 says 2.6.2 is
  REPORTED working as a native binary for the Kilo seats). **ESLint is not
  used** — no ESLint config and no eslint dependency anywhere (VERIFIED).
  **67 Cakepanz has no lint setup at all** (no Biome, no ESLint, no Prettier
  — VERIFIED). Nothing enforces linting (no CI, no pre-commit hook by
  default).
- **Intended:** Biome (the standard, per AGENTS.md §9).
- **Decision:** **Preferred.** Biome, but not locked. GPT recommended ESLint
  + Prettier — that recommendation has not been accepted or rejected. MUSE's
  recommendation (see the target-stack draft): **reject the tool switch**
  (Biome is already the standard and it works) but **accept the underlying
  point** (make linting consistent across both tracks and enforced). The
  real issue is not which linter — it is that one track has none and nothing
  enforces either.

## 12. Formatting — Is formatting handled by Biome or Prettier?

- **Current:** **Biome handles formatting for the council tooling** (the root
  `biome.json`: `"formatter": { "enabled": true, "indentStyle": "space",
  "indentWidth": 2 }` — VERIFIED), but **Biome's formatter is DISABLED for
  the product** (`tools/biome-product/biome.json`: `"formatter": {
  "enabled": false }` — VERIFIED). **Prettier is not used** — no Prettier
  config and no prettier dependency anywhere (VERIFIED). So: formatting is
  handled by Biome for tooling, and **effectively not handled at all for the
  product** (no formatter is enabled for it).
- **Intended:** Undecided (no formatting decision for the product has been
  made).
- **Decision:** **Undecided** — and a gap. The product has no formatter.
  (See D8 — the fix is small: enable Biome's formatter for the product too,
  so there is one formatter.)

## 13. Type checking — Does CI or your local workflow run tsc --noEmit and svelte-check?

- **Current:** **No CI, so nothing runs in CI.** Locally: Colors has `npm run
  tsc:check` (`node tools/tsc-baseline.mjs` — a baseline/ratchet wrapper, not
  plain `tsc --noEmit`; `colors/tsconfig.json` and `colors/tsc-baseline.json`
  exist — VERIFIED). **There is no `svelte-check`** — it is not a dependency
  in either `package.json` and there is no script for it (VERIFIED). 67
  Cakepanz has a `tsconfig.json` and a `tsc-baseline.mjs` file but **no npm
  script to run them** (VERIFIED). So: `tsc` (via the baseline wrapper) is
  available in Colors and run manually if at all; `svelte-check` is not run
  anywhere; nothing is automated. And the `--experimental-strip-types`
  caveat (GPT's §4, VERIFIED as a fact about the tool): running TypeScript
  tests with `--experimental-strip-types` does **not** type-check the
  project — the runtime strips TypeScript syntax; it does not perform the
  compiler's semantic checks. The test run and the type check are two
  different things.
- **Intended:** GPT's CI pipeline includes TypeScript type checking and
  Svelte diagnostics (a recommendation, not a decision).
- **Decision:** **Undecided.** (The pipeline does not exist yet — see Q16.)

## 14. Tests — Is Node's built-in test runner still the only test framework?

- **Current:** **Yes, for Colors and Cakepanz.** Both use `node --test
  --experimental-strip-types` (VERIFIED from both `package.json` files). No
  Vitest and no Jest in either track (VERIFIED). Colors: `npm test` runs
  `test/**/*.test.ts` (318/320 passing at `ce7c9210`; the 2 failures are
  pre-existing). Cakepanz: only `test:engine` (one file) + `battery` (a slice
  battery script) — there is no full-suite test script. **Exception:** the
  historical `football-sim-next` folder (the friend's project copy, w71)
  uses **Vitest** (`vitest run`) and **@testing-library/svelte** — that is
  the **only** place in the repo where Vitest exists, and it is a historical
  folder, not a live track.
- **Intended:** Node's test runner (the current choice; GPT endorsed keeping
  it for the engine).
- **Decision:** **Preferred.** Node's test runner, for the engine. The
  browser/UI testing question (Playwright) is separate and undecided (see
  Q15).

## 15. Browser tests — Are Playwright or Cypress installed?

- **Current:** **Neither.** No Playwright and no Cypress in either
  `package.json` (VERIFIED), and no browser-based integration tests exist.
  No visual regression tests, no accessibility tests, no UI interaction
  tests run in a browser.
- **Intended:** GPT recommended Playwright for the UI integration tests in
  the framework experiment (a recommendation, not a decision).
- **Decision:** **Undecided.** Playwright is the recommended choice, not yet
  decided or installed. (See D9 — the browser-test step is part of the CI
  pipeline decision.)

## 16. CI — Have GitHub Actions workflows been implemented yet?

- **Current:** **No.** There is no `.github/workflows` directory on
  `origin/architect/engine-and-seats`, `origin/main`, or `origin/gh-pages`
  (VERIFIED: `git ls-tree -r` returns nothing for it on any of the three).
  The only workflow file in the repo is a historical one nested inside an
  old wave folder
  (`Football-Sim-Z-post-blue-w71/football-sim-next/.github/workflows/ci.yml`)
  which is **not** at the repo root, so GitHub Actions does not run it. CI
  tagging was approved (the Owner, 2026-11-08) but no CI job exists. Nothing
  is checked automatically on a push or a pull request — not the tests, not
  the types, not the lint, not the build.
- **Intended:** GPT's 8-step pipeline (pinned lockfile install, format/lint,
  TypeScript type checking, Svelte diagnostics, engine unit tests,
  determinism/regression tests, production build, browser smoke tests) + a
  nightly simulation lab (a recommendation, high priority).
- **Decision:** **Undecided.** The pipeline design is proposed, not approved.
  The Owner has not yet decided to build it — though he called the lack of
  CI a red flag (2026-11-12). (See D9.)

## 17. Hosting — Is Cloudflare Pages the intended deployment target?

- **Current:** The live site is on **gh-pages** (manual publish by the Owner
  from Z.ai's zip; w89 is the live index). **No Cloudflare configuration
  exists** — no `wrangler.toml`, no `_redirects`, no `_headers`, no
  `functions/` directory on either branch (VERIFIED). Cloudflare Pages is
  **not set up**.
- **Intended:** **Cloudflare Pages (static build)** — recorded as the
  deployment target in the project decisions. The "zero recurring costs"
  requirement (free tools/services, simple enough for the Owner to operate
  without becoming a full-time infrastructure administrator) constrains the
  choice — Cloudflare's free tier fits; a paid host would not.
- **Decision:** **Intended.** Cloudflare Pages is the intended target, but
  not set up; the current host is gh-pages. (See D12.)

## 18. Server runtime — Does the app currently use Cloudflare Workers or only static hosting?

- **Current:** **Only static hosting** (gh-pages). No Cloudflare Workers, no
  server-side code, no server endpoints, no API routes (VERIFIED: no
  wrangler config, no `functions/`, no server code). The app currently has
  no server-side code at all.
- **Intended:** Static hosting for now; Workers (server-side simulation)
  eventually, per the server-ready principle — the engine is designed to
  run on a centralized server later, with multiple users interacting with
  it. There is no server now.
- **Decision:** **Intended.** Static now, Workers later. The timing and the
  trigger for moving compute to the server are undecided.

## 19. Simulation compute — Does the simulation run in the browser, on a server, or both?

- **Current:** **Browser only.** The simulation runs entirely in the
  browser, on the main thread (see Q20). There is no server.
- **Intended:** Browser now; server eventually (the server-ready principle —
  the engine is designed to run on a centralized server later, with multiple
  users interacting with it; the backend would manage leagues, store
  results, coordinate drafts, and invoke the simulation engine).
- **Decision:** **Intended.** Browser now, server later. The timing and the
  trigger are undecided (see D15 for the related Web Workers question).

## 20. Workers — Does the project use Web Workers for simulation?

- **Current:** **No.** No Web Workers, Shared Workers, or Service Workers in
  either track (VERIFIED: `git grep` for `new Worker` / `SharedWorker` /
  `ServiceWorker` / `navigator.serviceWorker` returns nothing in either
  track). The engine runs synchronously on the main browser thread
  (INFERRED from the absence of Worker code). Whether the simulation freezes
  or noticeably slows the UI has **not been measured** — don't know.
- **Intended:** Undecided. GPT's architecture mentions "browser workers" as
  a platform interface, but no decision to use them has been made.
- **Decision:** **Undecided.** (See D15 — the evidence needed is a
  performance measurement: does the simulation freeze the UI?)

## 21. Persistence — Is localStorage still the only active save system?

- **Current:** **Yes.** Saves use localStorage only, through an isolated
  platform adapter (`colors/src/platform/localstorage.ts` — VERIFIED).
  IndexedDB is **not** implemented — it appears only in two comments as a
  possible future replacement ("an IndexedDB implementation can replace it
  later without touching a caller"). No other browser storage is used for
  saves.
- **Intended:** localStorage (current); IndexedDB only when data volume or
  functionality justifies it (GPT's recommendation — migrate when actual
  data volume or functionality justifies it, not because it sounds more
  scalable).
- **Decision:** **Preferred.** localStorage, by current use and by GPT's
  recommendation to keep the adapter and migrate only when justified.

## 22. Save format — Are saves versioned and migrated?

- **Current:** **No.** Saves are **not versioned** (no `version` field in
  `localstorage.ts` — VERIFIED) and **not migrated** (the migration use
  "died with P-258" — VERIFIED from `app.ts:10`). The envelope carries
  `saveId`/`createdAt` + the dataset SHA-256, and envelope-shaped values are
  checked on write (`localstorage.ts:43`), but there is no save version
  number, no migration mechanism, and no recovery mechanism for a corrupted
  save. There are no tests for an interrupted save or for two tabs opening
  the same franchise.
- **Intended:** GPT recommended adding a version number on every save, load
  validation, a safe migration mechanism, error handling when storage is
  unavailable or full, a recovery mechanism, and a deliberate save strategy
  (a recommendation, not a decision).
- **Decision:** **Undecided.** The safeguards are proposed, not approved or
  implemented. (See D14 — the cost of *not* adding them is high: a corrupted
  save loses a user's franchise; and migrations get harder once unversioned
  saves exist in the wild.)

## 23. Database — Is any database currently installed or configured?

- **Current:** **No.** No database is installed or configured in either
  track — no D1, no PostgreSQL, no SQLite, no ORM (no drizzle, prisma,
  sqlite, better-sqlite3, supabase, or firebase in either `package.json` —
  VERIFIED). There is no database code, no schema, and no migrations.
- **Intended:** Undecided. The database question is open: Cloudflare D1,
  PostgreSQL, SQLite/Turso, and "no database until multiplayer or cloud
  saves exist" are all on the table.
- **Decision:** **Undecided.** (See D10 — the recommendation is *none until
  multiplayer or cloud saves exist*, because a database choice is hard to
  reverse once data is in it.)

## 24. Authentication — Are accounts intentionally excluded from the initial release?

- **Current:** **Yes, intentionally excluded.** There is no authentication
  and no user accounts — no auth dependency and no auth code (VERIFIED: no
  auth, @auth, next-auth, lucia, or clerk in either `package.json`). The
  initial release is intended to work without accounts (local profiles
  first).
- **Intended:** OAuth accounts with cross-device sync **later** (local
  profiles first, then OAuth — per the project decisions). Which provider
  (Google, Apple, email/password, Auth.js, Cloudflare's auth ecosystem) is
  undecided.
- **Decision:** **Intended.** Accounts excluded from the initial release, by
  design; the later auth choice is undecided. (See D11.)

## 25. Agent tooling — What common instruction files and automated checks are agents required to follow?

- **Current:** The common instruction files are **AGENTS.md** (council house
  rules), **CLAUDE.md** (the Architect's instructions), **PROJECT-KNOWLEDGE.md**
  (the live project knowledge), **_agents/START-HERE.md**,
  **_agents/START-OF-CHAT.md**, **_agents/END-OF-CHAT.md**, and
  **_agents/ONBOARDING.md** (VERIFIED — all exist on `origin/council/muse`).
  Agents do **NOT** all use the same instructions — Claude has CLAUDE.md,
  the council has AGENTS.md, Z.ai has START-OF-CHAT-ZAI.md (maintained by
  MUSE on council/muse). The automated checks agents are required to follow:
  `node tools/lint.mjs` (Biome), `npm run tsc:check` (Colors),
  `npm test` (Node test runner), `node tools/preserve.mjs check`
  (preservation gate), and the push rules (add by path, commit + push after
  every finished task, never force-push, never stash, never edit the product
  file, never edit another seat's branch). **Nothing enforces these
  automatically** (no CI, no pre-commit hook by default — the seatbelt hook
  is optional and only in a seat's own worktree).
- **Intended:** GPT's AI change-report protocol (a recommendation) + the
  agent implementation rules (Deliverable 4, draft — see the companion
  document).
- **Decision:** **Preferred.** The instruction files are the current
  standard; the enforcement mechanism (CI + the agent rules) is undecided.

---

## Addendum — Knowledge management and documentation tools (KG, 2026-11-12 01:18 HST)

KG: "I didn't explicitly ask about Obsidian or competing knowledge-management
and documentation tools in that review. I should have included them,
especially because your project relies heavily on AI-agent continuity,
architecture documentation, research notes, decision records, and long-term
project knowledge." He asked for a dedicated evaluation covering Obsidian,
Notion, Logseq, Anytype, AFFiNE, Joplin, plain Markdown files inside the Git
repository, GitHub Issues, Discussions, Projects, and Wiki, and AI-native
documentation and knowledge-base workflows. **The central question:** should
Football-Sim's knowledge live in a dedicated personal knowledge-management
system, directly in the repository, or in a hybrid arrangement? **KG's lean
(verbatim):** "I'd lean toward investigating a hybrid: Markdown documentation
in Git as the authoritative project record, with Obsidian or a competitor as
the research and navigation layer. But I'd want to compare the tools before
committing." This addendum is the evaluation. It is also recorded as D21 in
the decisions register and as table 1O in the companion deliverables
document.

### Current state (VERIFIED)

- **Plain Markdown in Git — the current system, and the authoritative
  record.** The knowledge already lives in Markdown files inside the Git
  repository: `QUEUE.md`, the inbox filings, the owner notes (verbatim), the
  prompts, `PROJECT-KNOWLEDGE.md`, `AGENTS.md`, `CLAUDE.md`, the bulletin,
  the archive, the reference docs. This is the system the agents already
  write to. (VERIFIED: the files exist on `origin/council/muse`. The only
  "PKM" matches in the repo are false positives — the English word "notion"
  in a prompt, e.g. "it has no notion in the engine at all".)
- **Obsidian — not set up.** KG asked about it 2026-11-11 22:59 HST; MUSE
  explained the setup (point a vault at the repo folder, or the `_agents/`
  subfolder; write files with Obsidian formatting — YAML frontmatter,
  `[[wikilinks]]`, `#tags`; maintain a Rulings index). **Three questions from
  MUSE to KG are UNANSWERED:** (1) does he already have an Obsidian vault,
  and where on his Mac — repo-as-vault or folded into his existing vault?
  (2) what does he want to see in it (queue, rulings, prompts, filings —
  all or a slice)? (3) should MUSE start the Rulings index now? No Obsidian
  work has been done.
- **Notion, Logseq, Anytype, AFFiNE, Joplin — none in use.** No config, no
  files, no record of use. (VERIFIED: no mentions of Obsidian, Logseq,
  Anytype, or Joplin anywhere in the repo's Markdown; no `.obsidian` or
  other PKM config files.)
- **GitHub Issues, Discussions, Projects, Wiki — don't know.** These are
  GitHub settings, not verifiable from the repo. The task management is
  `QUEUE.md`, not GitHub Issues. Whether Issues, Projects, Discussions, or
  the Wiki are enabled is a GitHub setting. (There is a
  `_archive/project-docs/KNOWN-ISSUES.md` file — a document, not a GitHub
  Issues configuration.)
- **AI-native documentation workflows — the project already has one.** The
  council system itself (inbox filings with SPEAKER/ROLE/TASK/DATE + FOR,
  the queue as the task list, the review chain as the quality gate, the
  verbatim owner notes, `PROJECT-KNOWLEDGE.md` as the live project memory)
  is an AI-native documentation workflow. It is not a named product; it is
  a set of conventions in the repo. It works, but it has no search beyond
  `grep`, no backlinks, no graph, and no maintained index (the Rulings
  index does not exist yet).

### The comparison (for this project's needs)

| Tool | How it fits this project | Verdict (MUSE's recommendation, not a decision) |
| ---- | ------------------------ | ----------------------------------------------- |
| **Obsidian** | Local-first; reads plain Markdown files in a folder — the *same* files the repo already has (no migration, no duplication, no split). Wikilinks, backlinks, graph view, search, tags, plugins. Free for personal use (paid sync is optional and not needed — Git is the sync). Offline. The agents' workflow does not change at all (they keep writing Markdown to the repo; Obsidian is a *view* on those files). The catch: it is a local app on KG's Mac — the agents cannot see his vault, only the repo files (which is fine, because the repo files *are* the vault's contents). It shows whatever branch is checked out on his Mac (council/muse must be checked out in that worktree to see MUSE's prompts/queue). | **Investigate first.** The strongest candidate for the navigation layer — the only tool in the list that reads the repo's existing Markdown without moving, duplicating, or splitting it. |
| **Logseq** | Local-first, outliner, reads Markdown files in a folder. Free and open source. The closest competitor to Obsidian for this project. The outliner model (bullets, blocks) fits research notes and daily logs well but fits long-form filings (the council's inbox filings, the prompts, the verbatim owner notes) less well — those are documents, not outlines. | **The fallback.** Worth comparing, but second to Obsidian for this project's shape (long-form filings, not outlines). |
| **Notion** | Cloud-based, blocks, databases, good for structured data. But: a proprietary cloud service, not Markdown files in Git, not offline-first, and the free tier has limits. It would split the knowledge (some in Notion, some in Git) and the agents (on a Linux VM) would need API access to read it. | **Reject for this project.** It does not fit the "Markdown in Git as authoritative" lean, and it violates the local-first / offline shape of the project. |
| **Anytype** | Local-first, object-based, encrypted, peer-to-peer sync. A powerful object model — but it stores its own data format, not Markdown files in Git. It would split the knowledge. Newer and less mature than Obsidian. | **Reject for this project.** The object model is a different paradigm; the project needs files, not objects. |
| **AFFiNE** | Open source, Notion-like (docs + whiteboard + database), local-first with self-hosting. The whiteboard is interesting for architecture diagrams. But: a separate app with its own storage, not Markdown files in Git; newer and less mature than Obsidian. It would split the knowledge. | **Reject for this project.** Revisit only if the whiteboard/diagram need becomes real and cannot be met another way. |
| **Joplin** | Open source, Markdown notes, sync via cloud (Nextcloud, Dropbox, etc.). Free. But: it is a note-taking app, not a knowledge graph — no wikilinks/backlinks/graph in the Obsidian sense. It stores notes in its own database (not plain Markdown files in a folder you control, though it can export). It does not read the repo's files natively. | **Reject for this project.** It is a note app, not a navigation layer for the repo's Markdown. |
| **Plain Markdown in Git (the current system)** | Free, version-controlled, the agents already write it, it is the authoritative record, and it works offline (it is just files). The weakness: no graph view, no backlinks, no search beyond `grep`, no visual navigation, no maintained index. That weakness is exactly what a navigation layer (Obsidian) would fix — without changing the authoritative store. | **Keep as the authoritative record.** The question is not whether to replace it, but what navigation layer to put on top of it. |
| **GitHub Issues / Discussions / Projects / Wiki** | Issues = task tracking (the queue already does this, better, in the repo, where the agents can see it). Discussions = a forum (the council's inbox is the discussion). Projects = a kanban (the queue is the kanban). Wiki = a separate Markdown store (a separate repo — it would split the knowledge from the main repo). | **Do not adopt for knowledge.** The queue + inbox + owner notes already serve those roles in the repo, and moving them to GitHub would put them outside the agents' working files. |
| **AI-native documentation workflows** | The project already has one (the council system). The question is whether to formalize it further (a Rulings index, a standard filing format, a search index) — which is a process question, not a tool question. The Rulings index (one line per ruling: date, verbatim quote, link to the full note) is a concrete first step that works regardless of which tool is chosen, because it is a Markdown file in the repo. | **Start the Rulings index now.** It answers KG's unanswered question #3 — yes, start it — and it does not depend on the tool comparison. |

### The answer to the central question (MUSE's recommendation, not a decision)

**Investigate the hybrid, with Obsidian as the first candidate for the
navigation layer.** Rationale: it is the only tool in the list that reads the
repo's existing Markdown files without moving, duplicating, or splitting
them; it is local-first and offline (fits the project's requirements); it is
free for personal use; and the agents' workflow does not change. Logseq is
the fallback if Obsidian's model does not fit. The cloud-first and
object-based tools (Notion, Anytype, AFFiNE) and the note app (Joplin)
should be rejected for this project because they would split the knowledge
into a second store. GitHub Issues/Discussions/Projects/Wiki should not be
adopted for knowledge — the queue + inbox already serve those roles in the
repo.

- **Current:** Plain Markdown in Git (authoritative). No PKM tool in use.
- **Intended:** Hybrid — Markdown in Git (authoritative) + a navigation
  layer (Obsidian first, Logseq as the fallback).
- **Decision:** **Undecided.** KG leans toward investigating the hybrid; the
  comparison has not been run; the three Obsidian questions are unanswered
  (vault? what to see? Rulings index now? — though the Rulings index can
  start regardless, and MUSE recommends starting it).

## What the answers add up to

- **Decided (locked or intended):** TypeScript; Svelte 5 (as the current
  implementation); npm; single-package; Node's test runner (for the engine);
  localStorage (for now); no database (for now); no auth for the initial
  release; Cloudflare Pages (intended, not set up); browser compute now,
  server later; the server-ready engine principle; the free-tools / simple-
  to-operate constraint.
- **Preferred (the current choice, not locked):** Biome (the linter);
  Svelte + Vite (the current app shape); the engine boundary (the principle
  is in place, the enforcement is not).
- **Undecided (the real decisions):** the frontend framework (the test);
  SvelteKit vs Svelte+Vite; the CSS system; the component library; the icon
  library; the charting library; the formatter for the product; the CI
  pipeline; the database; the auth provider; Web Workers; the save
  safeguards; the React dependency (remove or keep); the Vite split.
- **Installed but not used:** React 19 + react-dom in Colors (no imports, no
  .tsx/.jsx). esbuild-svelte is a dependency; whether the custom esbuild
  build script (`colors/build/build.mjs`) or the Vite build is the active
  production build path is **don't know** (not verified).
- **The only place Vitest and svelte-check exist** is the historical
  `football-sim-next` folder (the friend's project copy, w71) — a Svelte +
  Vite app (22 files), not a Next.js app, despite the name. Whether the
  separate repo `aled1027/football-sim-nextjs` is still maintained is
  **don't know** (it is a separate repository, not verifiable from this one).
