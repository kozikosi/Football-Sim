# Football-Sim stack audit — the four deliverables

**From:** MUSE, High Councillor. **Date:** 2026-11-12. **For:** the Owner
(KG), from his complete architecture and technology questionnaire. **Companion
document:** `stack-audit-priority-answers-2026-11-12.md` (the 25 priority
questions, answered with Current / Intended / Decision, verified against the
repo). **Method:** verified against `origin/architect/engine-and-seats`,
`origin/gh-pages`, `origin/council/muse`, and `origin/main` on 2026-11-12.
Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN / don't know.

**Status of each deliverable:** (1) the current-state inventory is **done**
— it is a verified record. (2) the target-stack specification is a **DRAFT**
— MUSE's recommendations, clearly labelled, with the decisions KG needs to
make. Nothing in it is decided until KG decides it. (3) the unresolved
decisions register is **done** as a register (the decisions are listed with
alternatives, evidence, and cost) — the decisions themselves are open. (4)
the agent implementation rules are a **DRAFT** for KG (and the Architect) to
approve — they are not in force until approved.

**The constraint that governs all four (the Owner, standing):** future tools
and services should be **free**, and the project should remain **simple
enough for the Owner to operate without becoming a full-time software
infrastructure administrator**. The ultimate goal is a stack powerful enough
to support a serious sports simulation product, but deliberately small enough
that AI agents can maintain it reliably. Any target-stack proposal that
violates the free/simple constraint is out of bounds unless the Owner
explicitly approves the exception.

---

# Deliverable 1 — Current-state inventory

Every significant tool and technology actually present, with versions and
whether it is actively used. "Actively used" means the code calls it, runs
it, or depends on it — not merely that it is installed or mentioned in a
planning document.

## 1A. Languages and runtimes

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| TypeScript | `^5.9.3` | Colors, Cakepanz | Yes | The primary language. The engine and the UI source are TypeScript. |
| JavaScript | — | Colors, Cakepanz | Yes (config only) | `colors/vite.config.js` is JavaScript. No application logic in plain JS (the original simulator's JS lives in the frozen single-file HTML, not in the new app). |
| Node.js | Unpinned | Both tracks | Yes (dev + tests) | No `.nvmrc`, no `.node-version`, no `engines` field. The version agents actually run is whatever is on their machine — don't know. |
| Python | 3.x (venv, pyarrow 26.0.1, pandas 3.1.1, numpy 2.5.4) | `~/workspace/nflverse-phase1/` (MUSE's local data work, not the repo) | Yes (data only) | The nflverse data pipeline (P-344) is Python, run locally by MUSE. There are no Python scripts *in the repo* that are part of the product. The repo's Python is data-analysis tooling, not application code. |
| Rust / Go / C++ | — | — | No | None anywhere. |
| WebAssembly | — | — | No | None anywhere. |

## 1B. Frontend and application framework

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| Svelte | `^5.57.3` | Colors, Cakepanz | Yes (Cakepanz); No (Colors) | Cakepanz has 10 `.svelte` files using runes + stores. Colors has 0 `.svelte` files — Svelte is installed but has no components there yet. |
| Vite | `^8.3.6` (Colors), `^7.3.6` (Cakepanz) | Both tracks | Yes | The bundler/dev server in both tracks. The version split (8 vs 7) is incidental, not intentional. |
| SvelteKit | — | — | No | Not installed in either track. No `@sveltejs/kit`, no `svelte.config.js`, no `src/routes/`. The test's SvelteKit prototype is a *test* prototype, not the current app. |
| React | `^19.3.1` (+ react-dom `^19.3.1`) | Colors only | **No** | Installed but not used: no source file imports it, no `.tsx`/`.jsx` files exist. The clearest "installed but aren't using" item in the audit. |
| Vue / Nuxt | — | — | No | Not installed. The test's Vue/Nuxt prototype is not built yet. |
| Solid / SolidStart | — | — | No | Not installed. The test's SolidStart prototype is not built yet. |
| Next.js | — | — | No | Not installed in either live track. (The historical `football-sim-next` folder is a Svelte+Vite app, not Next.js, despite the name.) |

## 1C. CSS, styling, and UI components

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| Plain CSS (in Svelte `<style>` blocks) | — | Cakepanz | Yes | All 10 `.svelte` files have exactly 1 `<style>` block each. This is the *only* styling system in the project. |
| Plain CSS (any other form) | — | — | No | No `.css` files anywhere in either track. No global stylesheet. |
| Tailwind CSS | — | — | No | Not installed in either track. |
| UnoCSS / Bootstrap / Bulma / any other CSS framework | — | — | No | None installed. |
| Component library (Skeleton / shadcn-svelte / DaisyUI / Flowbite / Bits UI) | — | — | No | None installed. Components are hand-built. |
| Headless component library | — | — | No | None installed. |
| CSS-in-JS | — | — | No | None installed. |
| Design-token system | — | — | No | None. Colors, typography, spacing, and radii are not centrally defined. |
| Icon library (Lucide / Heroicons / Font Awesome / Material Icons) | — | — | No | None installed; no icon imports in source. |
| Charting library (Chart.js / D3 / ECharts / Recharts) | — | — | No | None installed. Statistics render as tables/text. |
| Table library (TanStack Table) | — | — | No | None installed. |
| Drag-and-drop library | — | — | No | None installed. |
| Virtualized list/table library | — | — | No | None installed. |
| Font package | — | — | No | No dedicated typography/font package. Fonts: **P-305 decided (the Owner, 2026-11-08) — bundle the Google Fonts in the git repo** (font files in the repo, product loads them from the repo, not from Google's servers). Whether the font files are actually in the repo yet is don't know (not verified). |
| CSS animations / motion library | — | — | Partial | CSS animations exist only inside the Svelte `<style>` blocks (if any — not audited in detail). No motion library installed. |

## 1D. Build tools and bundlers

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| Vite | `^8.3.6` / `^7.3.6` | Both tracks | Yes | The only bundler/build tool in the live tracks (`vite build`, `vite`, `vite preview`). |
| esbuild | `^0.28.2` (+ `esbuild-svelte ^0.9.5`) | Colors | Yes (via a custom script) | The `colors/package.json` description says "build/build.mjs bundles them with esbuild." Whether the Vite build or the custom esbuild script is the active production build path is **don't know** (not verified). |
| Rollup (directly) | — | — | No | Vite uses Rollup internally; nothing invokes Rollup directly. |
| SWC / Turbopack / Webpack | — | — | No | None installed or used. |
| Svelte plugin | `@sveltejs/vite-plugin-svelte ^7.3.1` (Colors), `^6.2.1` (Cakepanz) | Both tracks | Yes | The only Vite plugin beyond the standard Svelte plugin is none — no other Vite plugins are installed. |
| Source maps in production | — | — | Don't know | Not verified (no production build config was inspected). |
| Code splitting / dynamic imports / lazy loading | — | — | Don't know | Not verified. |
| Bundle-size reporting | — | — | No | None configured. |
| Custom Node scripts (data/assets) | — | `tools/mathlab/`, `tools/`, `batteries/` | Yes | The Lab, the council tooling, and the slice batteries are custom Node scripts. The nflverse data pipeline is Python (see 1A). |

## 1E. Package management and dependencies

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| npm | (unpinned) | Both tracks | Yes | The package manager. `package-lock.json` exists in both tracks. |
| pnpm / Yarn / Bun | — | — | No | No `pnpm-lock.yaml`, no `yarn.lock`, no `bun.lockb`. |
| Lockfile | `package-lock.json` | Both tracks | Yes | Exists in both tracks. The `package.json` versions are caret ranges (`^`), so the lockfile is the only pin. Whether the lockfiles are up to date with their `package.json` files is don't know (not checked). |
| Monorepo / workspaces | — | — | No | Single-package projects. No `pnpm-workspace.yaml`, no `lerna.json`, no `turbo.json`, no `workspaces` field. |
| Dependency overrides / resolutions | — | — | No | None in either `package.json`. |
| Renovate / Dependabot | — | — | No | Neither configured. Dependency updates are not automated. |
| License tracking / vulnerability auditing | — | — | No | No policy, no tooling. `npm audit` is available but is not run as a step anywhere. |
| Unused-dependency detection | — | — | No | No tooling. (This audit found React unused by inspection, not by a tool.) |
| Paid dependencies / API keys / paid accounts | — | — | No | No dependency requires an API key or a paid account. The free-tools constraint is currently satisfied by default. |

## 1F. Linting, formatting, and static analysis

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| Biome (linter) | 2.6.2 | Colors / repo root | Partial | The standard per AGENTS.md §9 (`node tools/lint.mjs`). Root `biome.json` (tooling) + `tools/biome-product/biome.json` (product). Run manually, if at all; nothing enforces it. |
| Biome (formatter) | 2.6.2 | Repo root (tooling) | Yes (tooling) | Enabled in the root `biome.json` (indent 2 spaces). **Disabled for the product** (`tools/biome-product/biome.json`: formatter enabled: false). |
| ESLint | — | — | No | Not installed, no config. GPT recommended ESLint + Prettier; that recommendation has not been accepted or rejected. |
| Prettier | — | — | No | Not installed, no config. |
| `eslint-plugin-svelte` | — | — | No | Not installed. |
| `svelte-check` | — | — | No | Not installed in either live track. (It exists only in the historical `football-sim-next` folder: `svelte-check ^4.7.7`.) |
| `tsc` (type checking) | TypeScript `^5.9.3` | Colors | Partial | `npm run tsc:check` (`node tools/tsc-baseline.mjs` — a baseline/ratchet, not plain `tsc --noEmit`). Run manually, if at all. Cakepanz has the files but no script. |
| Custom lint rules (engine boundary) | — | — | No | No rule prohibits `Math.random()`, `Date.now()`, browser APIs, or framework imports inside the engine. The server-ready principle is a written instruction, not a check. |
| Pre-commit hooks / Husky / lint-staged | — | — | No | None. The seatbelt hook (`tools/hooks/pre-commit`) is optional, only in a seat's own worktree, and does not run the linter. |
| Lint baseline file | — | — | No | `tools/lint-baseline.json` (described in AGENTS.md §9 as holding known findings) **does not exist** on either branch. |

## 1G. Testing

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| Node's built-in test runner | (Node, unpinned) | Both tracks | Yes | `node --test --experimental-strip-types`. Colors: `npm test` (`test/**/*.test.ts`, 318/320 passing at `ce7c9210`). Cakepanz: only `test:engine` (one file) + `battery`. |
| Vitest | `^5.1.0` | Historical folder only | No (live tracks) | Exists only in `Football-Sim-Z-post-blue-w71/football-sim-next/` (the friend's project copy). Not used by Colors or Cakepanz. |
| Jest | — | — | No | Not installed anywhere. |
| Playwright / Cypress | — | — | No | Neither installed. No browser-based integration tests exist. |
| Testing Library | `^5.4.2` (`@testing-library/svelte`) | Historical folder only | No (live tracks) | Exists only in the `football-sim-next` folder. Not used by Colors or Cakepanz. |
| Deterministic fixtures / golden files | — | Colors | Yes | The engine has golden-file fixtures (`colors/test/nfl/golden/`, e.g. `matchup-precolors.json`) and a fixed-seed RNG (Philox2x32, `colors/src/core/keyedrng.ts`, M0 verified correct). |
| Statistical distribution tests | — | Council (Lab) | Yes (manual) | The Lab (N=100 CI gate, N=1000 calibration protocol) runs distribution checks by hand. No automated distribution test in CI (there is no CI). |
| Save/load compatibility tests | — | — | No | None. (Saves are unversioned — see 1I.) |
| Browser storage failure tests | — | — | No | None. |
| UI interaction / accessibility tests | — | — | No | None. |
| Test coverage measurement | — | — | No | No coverage tool, no minimum. |
| Nightly simulation lab | — | Council (manual) | Yes (manual) | Run by hand by whoever holds the Lab that day. Not automated. |

## 1H. CI/CD and release

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| GitHub Actions | — | — | No | No `.github/workflows` on architect, main, or gh-pages. The only workflow file is historical and does not run. |
| CI pipeline (tests / types / lint / build on push or PR) | — | — | No | Does not exist. |
| Required status checks | — | — | No | None (no CI to check). |
| Preview deployments / staging | — | — | No | None. |
| Automated deployment | — | — | No | Deployment is manual (the Owner publishes from Z.ai's zip). |
| Release process / tags / rollback | — | — | No | No Git tags or releases used to identify stable versions (no tags were found — don't know whether any tags exist; none were listed in the checks MUSE ran). The reliable recovery path is the git history itself (the frozen Pre-Colors sha256, the engine pin `4ca9a071`, and the branch tips). |
| Dependabot | — | — | No | Not configured. |
| GitHub Actions caching / SHA-pinned actions | — | — | No | No workflows at all. |

## 1I. Hosting, deployment, and compute

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| GitHub Pages (gh-pages) | — | Live site | Yes | The current host. w89 is the live index. Manual publish by the Owner. |
| Cloudflare Pages | — | — | No (intended) | The intended deployment target (static build). Not set up — no `wrangler.toml`, no adapter, no config. |
| Cloudflare Workers | — | — | No | Not used. No server-side code exists. |
| Cloudflare SvelteKit adapter | — | — | No | Not installed (there is no SvelteKit to adapt). |
| Cloudflare DNS / CDN / caching / security / Turnstile | — | — | No | None configured. |
| Custom domain | — | — | Don't know | Not verified (no domain config in the repo; the live site is on github.io as far as the repo shows). |
| Vercel / Netlify / other host | — | — | No | None. |
| Web Workers (browser) | — | — | No | None in either track. The engine runs synchronously on the main thread. |
| Background jobs / scheduled jobs / long-running tasks | — | — | No | None automated. The nightly lab is a manual procedure. |
| Real-time connections (WebSockets / polling / SSE / message queue) | — | — | No | None. No multiplayer, no live drafts, no shared leagues yet. |

## 1J. Databases, storage, and persistence

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| localStorage | — | Colors | Yes | The only active save system, through an isolated platform adapter (`colors/src/platform/localstorage.ts`). |
| IndexedDB | — | — | No | Appears only in two comments as a possible future replacement. Not implemented. |
| Cache API / cookies / sessionStorage (for saves) | — | — | No | Not used for saves. |
| Platform storage adapter | — | Colors | Yes | `colors/src/platform/localstorage.ts` isolates storage behind an interface. There is one adapter, not multiple. |
| Save versioning | — | — | No | No `version` field on saves. |
| Save migrations | — | — | No | The migration use "died with P-258" (`app.ts:10`). |
| Save validation on load | — | — | Partial | Envelope-shaped values are checked on write; the dataset loader validates a user-supplied CSV. There is no load-validation step for saves that MUSE could find. |
| Save slots | — | — | Partial | Multiple save slots were planned (three, per the earlier plan) — whether three slots exist in the current app is don't know (not verified in the UI). |
| Import / export / share-a-season | — | — | Don't know | Not verified (the export/import surface was not inspected). |
| Autosave / manual save / recovery / corruption protection / quota handling / multi-tab handling / backup | — | — | No | None implemented (no code found for any of these). |
| Cloud saves | — | — | No | None. |
| Relational database (D1 / PostgreSQL / SQLite / Turso) | — | — | No | None installed or configured. |
| ORM (Drizzle / Prisma) | — | — | No | None installed. |

## 1K. Authentication, accounts, and networking

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| Authentication / user accounts | — | — | No | None. Intentionally excluded from the initial release (local profiles first, then OAuth). |
| Auth.js / other auth provider | — | — | No | None installed. |
| External API calls / third-party APIs / API keys | — | — | No | The app makes no external API calls. The player database is bundled with the application. |
| REST / GraphQL / tRPC / server actions / custom backend endpoints | — | — | No | None. There is no backend. |
| WebSockets / polling / SSE / message queue | — | — | No | None. |
| Analytics (Google Analytics / PostHog) | — | — | No | None. No user analytics are collected. |
| Error reporting (Sentry / other) | — | — | No | None. No crash reports are collected. |
| Content Security Policy / security headers | — | — | Don't know | Not verified (no deployment config exists to carry them). |
| Dependency vulnerability scanning / secret scanning | — | — | No | Not configured (no CI to run them in). |

## 1L. Data

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| nflverse (player / play-by-play / participation / snap counts) | 2016–2025 | `~/workspace/nflverse-phase1/raw/` (MUSE's local staging) + P-344 outputs | Yes | 30 files from the public `nflverse/nflverse-data` releases. pbp 484,254 rows; participation 478,989; snap counts 253,107; 5,522 team-games; 2,761 games. The dataset is pinned (P-217: saved seasons finish with their original datatable). |
| Player database (in the app) | — | Colors (bundled) | Yes | Bundled with the application (TypeScript/JSON — the exact format was not re-verified in this audit; the pool is embedded and the draft class is fixed). |
| Player ratings | — | — | No (not yet) | Ratings generation is the Owner's alone, later. The council must not work on ratings. |
| Historical NFL statistics dataset | — | nflverse (above) | Yes | The P-344 dataset is the historical statistics source. |
| Data version number / source attribution | — | — | Partial | The dataset is identified by its SHA-256 in the save envelope. There is no separate data-version number field and no source-attribution system in the app that MUSE verified. |
| Basketball player database | — | — | No | None. Basketball is design-only until football is done. |

## 1M. Simulation compute and state

| Technology | Version | Where | Actively used? | Notes |
| ---------- | ------- | ----- | -------------- | ----- |
| Seeded RNG (Philox2x32) | — | Colors (`colors/src/core/keyedrng.ts`, `rng.ts`) | Yes | The published Random123 multiplier `0xd256d193` VERIFIED correct. Independent streams for games and draft picks (per the earlier architecture rules — the stream separation was not re-verified in this audit). |
| `Math.random()` in the engine | — | Colors | Don't know | The grep MUSE ran was inconclusive. No lint rule prohibits it. The Pre-Colors single-file product has 56–58 `Math.random()` sites and no seed (AGENTS.md §3). |
| Deterministic replay from a saved seed | — | Colors | Yes (design) | Fixed-seed replay is the design; the Lab and the Phase 1 baseline rely on it. Whether a user-facing "replay from seed" exists is don't know. |
| Performance benchmarks (game / season / thousands of seasons) | — | Council (Lab) | Yes (manual) | The Lab measures simulation outcomes, not wall-clock performance. No wall-clock benchmarks (time per game/season) were found. No memory benchmarks, no profiling service. |
| State management (Svelte stores / runes) | Svelte 5 | Cakepanz | Yes | Runes (`$state`/`$derived`/`$effect`) in 5 files; `svelte/store` in `App.svelte` and `draftStore.ts`. Colors has no UI state (no `.svelte` files). No Redux, Zustand, TanStack Query, or XState anywhere. |
| Engine state vs UI state separation | — | Colors | Yes (design) | The engine is framework-independent; the state separation is architectural, not enforced by a check. |
| Undo/redo / action history / URL state / browser-history navigation | — | — | Don't know | Not verified in this audit. |

## 1N. Repositories, branches, and agent tooling

| Item | State | Notes |
| ---- | ----- | ----- |
| Primary repository | `github.com/kozikosi/Football-Sim` | Yes, still the primary repository. |
| Single-file HTML simulator preserved? | Yes | `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c`, 657,486 B) exists at the repo root on council/muse and architect. It is the frozen reference build. |
| Friend's Next.js project (`aled1027/football-sim-nextjs`) | Don't know | It is a separate repository, not verifiable from this one. A folder named `Football-Sim-Z-post-blue-w71/football-sim-next/` exists in this repo — but it is a **Svelte + Vite** app (22 files, Vitest + svelte-check + Testing Library), not a Next.js app, despite the name. Whether the separate repo is still maintained is don't know. |
| Colors and Cakepanz | Same repository, separate working environments | Colors is `colors/` on `architect/engine-and-seats`; Cakepanz is `67-cakepanz/` on `origin/gh-pages`. They are separate trees in the same repo, not separate repositories — but they are developed as separate tracks (neither builder edits the other's tree). |
| Authoritative implementation | `architect/engine-and-seats` (Colors) | The Architect's branch is the product/engine. The live queue, docs, and architectural decisions are on `origin/council/muse`. `main` is what the Owner pushes directly. |
| Latest working NFL simulator | `architect/engine-and-seats` (Colors, `ce7c9210`) for the new app; the frozen Pre-Colors file for the single-file lineage | The live *site* is gh-pages (w89, 67 Cakepanz). |
| Latest architectural decisions | `origin/council/muse` | AGENTS.md, PROJECT-KNOWLEDGE.md, QUEUE.md, the owner notes, and the inbox filings. |
| Agents on separate branches? | Yes | One branch per seat (`council/<seat>`), one worktree per seat. The Owner admits seats alone. |
| Agents push directly to shared branches? | Yes, to their own branch; no, to others' | A seat pushes only its own `council/<seat>` branch. Pushing `main`, `council/base`, `claude/*`, `architect/*`, or another seat's branch is prohibited. Never force-push. |
| Pull requests? | No | Agents push commits directly to their own branch. There is no PR workflow. The Architect collects work with `node tools/council-sync.mjs`. |
| `main` protected? / Code review required before merging? | Don't know | These are GitHub repository settings, not verifiable from the repo contents. (There is no PR workflow, so there is nothing to require review *on*.) The review chain is the council's three-reviews rule (three different seats' ok/improved on the same artifact = REVIEWED), enforced by convention, not by GitHub. |
| GitHub Issues / Projects / Discussions / other task management | Don't know (Issues/Projects/Discussions) / Yes (QUEUE.md) | The task-management system is `_agents/QUEUE.md` (the ranked list) + the inbox + the bulletin — not GitHub Issues. Whether GitHub Issues, Projects, or Discussions are enabled is a GitHub setting, not verifiable from the repo. |
| Architecture decisions in Markdown? | Yes | AGENTS.md, PROJECT-KNOWLEDGE.md, `claude/rulings/`, `_agents/owner-notes/` (verbatim), and the inbox filings. |
| Single authoritative document explaining the current stack? | No | There is no single stack document. PROJECT-KNOWLEDGE.md is the closest (the live project knowledge), and this audit's Deliverable 1 is the first complete inventory. |
| Git tags / releases for stable versions? | Don't know | No tags were listed in the checks MUSE ran. The reliable recovery path is the git history (the frozen Pre-Colors sha256, the engine pin `4ca9a071`, the branch tips). |
| Recover the last known-good version? | Yes (by hash) | The frozen builds are identified by sha256 (Pre-Colors `40233d6be00e987c`; engine pin `4ca9a071`). A name is bound to one sha256 (AGENTS.md §2). |
| Agent instruction files | AGENTS.md, CLAUDE.md, PROJECT-KNOWLEDGE.md, _agents/START-HERE.md, _agents/START-OF-CHAT.md, _agents/END-OF-CHAT.md, _agents/ONBOARDING.md | All exist on council/muse. Agents do NOT all use the same instructions (Claude has CLAUDE.md; the council has AGENTS.md; Z.ai has START-OF-CHAT-ZAI.md). |
| MCP servers / Claude Code hooks / skills | Don't know | Not verified in this audit (no MCP config was found in the repo checks MUSE ran; the agents' local tooling is not in the repo). |
| Standard setup (one-command build/test)? | Partial | `npm test`, `npm run build`, `npm run tsc:check` exist in Colors; `npm test` does not exist as a full-suite script in Cakepanz. There is no one-command setup or one-command verification process. A new agent can build and test locally without paid services or API keys (the product has no paid dependency). |

---

# Deliverable 2 — Target-stack specification (DRAFT)

MUSE's recommendations, clearly labelled. **Nothing here is decided until
the Owner decides it.** For each area: the proposed target, the status
(decided / recommended / open), and which of GPT's recommendations are
accepted, modified, or rejected. The free-tools / simple-to-operate
constraint governs every line.

| Area | Proposed target | Status | GPT's recommendation (accepted / modified / rejected) |
| ---- | --------------- | ------ | ----------------------------------------------------- |
| Language | **TypeScript** | Decided | — (already the language; no recommendation to change). |
| Runtime | **Node.js (browser)** | Decided | — (the engine runs in the browser now; server later). |
| Frontend framework | **Undecided — the test decides** (SvelteKit / React / Vue-Nuxt / SolidStart) | Open | Accepted: the test is a good idea (GPT's §1). Modified: the test now has four prototypes, the weighted scoring, change amplification, the contract tests, and Playwright (GPT's improvements A–E, all incorporated). Open: whether the Svelte prototype should be SvelteKit or Svelte+Vite (the current app is Svelte+Vite — see D2). |
| Application framework | **Undecided — the test decides** (SvelteKit vs Svelte+Vite is a separate question) | Open | — (GPT did not address SvelteKit vs Svelte+Vite directly). MUSE's recommendation: clarify in the test design whether the Svelte prototype is SvelteKit or Svelte+Vite, or test both — because the current app is Svelte+Vite and a SvelteKit win would be a migration, not a confirmation. |
| CSS | **Plain CSS in Svelte `<style>` blocks, for now; decide deliberately before the UI grows** | Recommended | — (GPT did not recommend a CSS library). MUSE's recommendation: do NOT adopt Tailwind (or any CSS framework) by default — the current plain-CSS-in-components approach is the smallest option and it works for 10 components. Decide the CSS system as its own decision (D3) before the component count grows, because styling decisions are hard to reverse. |
| CSS framework | **None** | Recommended | — (no recommendation to change; the "none" is the current state and the smallest option). |
| UI components | **Hand-built, for now; evaluate a library as its own decision** | Recommended | — (GPT did not recommend a component library). MUSE's recommendation: do not adopt a component library until the control count justifies it. When it does, evaluate Skeleton / shadcn-svelte / Bits UI against the framework the test picks (a library that exists for the winning framework matters). |
| Icons | **Lucide** (recommended, not decided) | Open | — (GPT did not recommend an icon library). MUSE's recommendation: Lucide is the most common Svelte icon library and has React/Vue/Solid equivalents, so it survives a framework change. But it is a recommendation, not a decision — and it should be centralized (one icon module) so it is cheap to swap. |
| Charts | **None, for now; decide when the dashboards are built** | Recommended | — (GPT did not recommend a charting library). MUSE's recommendation: defer. D3 vs Chart.js is a decision for when the statistical dashboards exist, not before. |
| Bundler | **Vite** | Decided | — (already the bundler in both tracks). Reconcile the version split (8 vs 7) to one version when the framework is decided (see D17). |
| Compiler | **TypeScript + esbuild (Vite's default)** | Decided | — (already the setup). |
| Package manager | **npm** | Preferred | — (already npm; no reason to change). |
| Monorepo | **Single-package (no workspaces)** | Preferred | — (already single-package; no reason to introduce workspaces). |
| Linter | **Biome** | Preferred | **Modified:** GPT recommended ESLint + Prettier. MUSE's recommendation: **reject the tool switch** (Biome is already the standard, it works, and switching is churn for no benefit) but **accept the underlying point** (make linting consistent across both tracks and enforced — see D9). |
| Formatter | **Biome (for everything, including the product)** | Recommended | **Modified:** GPT recommended Prettier (as part of ESLint + Prettier). MUSE's recommendation: enable Biome's formatter for the product too (it is currently disabled there), so there is one formatter. Reject the Prettier switch for the same reason as the linter. |
| Type checking | **`tsc` (via the baseline wrapper) + `svelte-check`** | Recommended | **Accepted:** GPT's pipeline includes TypeScript type checking and Svelte diagnostics. MUSE's recommendation: add `svelte-check` (it is missing everywhere) and wire up Cakepanz's `tsc:check` script (the files exist; the script does not). Keep the baseline/ratchet mechanism (it is a reasonable way to handle known errors) — but the baseline file should exist and be current. |
| Unit testing | **Node's built-in test runner** | Preferred | **Accepted:** GPT endorsed keeping it for the engine (§4). |
| Browser testing | **Playwright** | Recommended | **Accepted:** GPT recommended Playwright for the UI integration tests (§4). Not yet decided or installed. |
| CI | **GitHub Actions (8-step pipeline + nightly lab)** | Recommended | **Accepted:** GPT's pipeline and nightly lab (§5), high priority. Not yet decided or built. The smallest version worth building first: install from the pinned lockfile + type check + engine tests + production build, on every push (see D9). |
| Hosting | **Cloudflare Pages (static)** | Intended | — (already the intended target). Not set up yet. |
| Compute | **Browser now; Cloudflare Workers later** | Intended | **Accepted:** GPT's server-ready principle (§2) — the engine must stay server-ready. The timing of the move to Workers is undecided. |
| Database | **None (until multiplayer or cloud saves exist)** | Recommended | **Accepted in substance:** GPT did not recommend a database now; his persistence section (§3) is about the local adapter, not a database. MUSE's recommendation: no database until a feature needs one. When it does, Cloudflare D1 is the natural first candidate (it fits the Cloudflare hosting + free-tier constraint), but that is not decided. |
| ORM | **None** | Decided (for now) | — (no database, no ORM). |
| Browser storage | **localStorage (through the adapter); IndexedDB only when justified** | Preferred | **Accepted:** GPT's §3 recommendation (keep the adapter; migrate only when data volume or functionality justifies it). |
| Authentication | **None for the initial release; OAuth later (provider undecided)** | Intended | — (GPT did not recommend an auth provider). |
| API | **None** | Decided (for now) | — (no backend, no API). |
| Real-time | **None** | Decided (for now) | — (no multiplayer yet). |
| Background jobs | **None (manual nightly lab); CI-scheduled jobs as the target** | Recommended | **Accepted:** GPT's nightly lab (§5) as a scheduled CI job. |
| Error monitoring | **None (for now)** | Open | — (GPT did not recommend a service). MUSE's recommendation: none until the product is public and the free-tier + no-tracking constraints are weighed against it. Sentry's free tier exists, but it is a third-party service that collects data — the decision should be deliberate, not drifted into. |
| Analytics | **None** | Recommended | — (GPT did not recommend analytics). MUSE's recommendation: none — the project's privacy stance (no tracking, no personal data) leans toward none, and there is no product need for analytics yet. |
| Security | **GitHub secret scanning + `npm audit` (as CI steps); CSP when the deployment exists** | Recommended | **Accepted in substance:** GPT's pipeline includes the checks; his §5 (CI) is the vehicle. MUSE's recommendation: enable GitHub's built-in secret scanning (it is free and requires no code) and run `npm audit` in CI. CSP belongs in the deployment config once Cloudflare Pages exists — not before. |
| PWA | **Undecided** | Open | — (GPT did not address PWA). MUSE's recommendation: offline is already a hard requirement, which points toward PWA — but no PWA decision has been made, and a PWA is additive to a static site, so it can wait until the app is shippable. |
| Containers | **None (no Docker)** | Decided | — (no container need; the product is a static site + a local dev environment). |
| AI development | **Claude Code / Z.ai / Muse / the council (the current setup)** | Decided | — (the Owner's structure; not a tooling decision). |

---

# Deliverable 3 — Unresolved decisions register

Every important decision that still needs evidence, with alternatives and
the cost of changing later. "Cost" is the cost of changing *after* the
decision is made and built on — not the cost of deciding now.

| ID | Decision | Alternatives | Evidence needed | Cost of changing later |
| -- | -------- | ------------ | --------------- | ---------------------- |
| D1 | The frontend framework | SvelteKit / React / Vue-Nuxt / SolidStart | The framework test (four prototypes on the offensive focus, GPT's improvements A–E, the weighted scoring, change amplification, the contract tests, Playwright). | **HIGH.** Rewriting the UI. The engine is framework-independent, so the engine does not change — but every component, every screen, and every piece of UI wiring does. |
| D2 | The application framework (SvelteKit vs Svelte+Vite) | SvelteKit / Svelte+Vite | A clarification in the test design: is the Svelte prototype SvelteKit or Svelte+Vite? (The current app is Svelte+Vite; the test's prototype is SvelteKit.) | **MEDIUM.** SvelteKit vs Svelte+Vite is a build/routing change, not a full rewrite — but it is a migration of the app shell, and it changes the deployment (the Cloudflare SvelteKit adapter vs static). |
| D3 | The CSS system | Plain CSS in `<style>` blocks / Tailwind / UnoCSS / SCSS / CSS Modules | The framework test's UI work + a CSS decision. The question is which system an AI agent maintains most reliably on *this* product (the Owner's question). | **HIGH.** Styling decisions are hard to reverse — the questionnaire says so, and it is true: a CSS framework touches every component. Decide before the component count grows. |
| D4 | The component library | Hand-built / Skeleton / shadcn-svelte / DaisyUI / Flowbite / Bits UI | The framework test + a component-library evaluation (which libraries exist for the winning framework, and what they cost in bundle size and in agent confusion). | **MEDIUM-HIGH.** Swapping a component library means rebuilding every control. Hand-built components are cheap to start and expensive to maintain; a library is the reverse. |
| D5 | The icon library | Lucide / Heroicons / Font Awesome / Material Icons / custom SVG | A small evaluation (which library has the icons the app needs, and whether it survives a framework change). | **LOW** — if icons are centralized in one module. **HIGH** if they are scattered through components. Centralize first, then decide. |
| D6 | The charting library | D3 / Chart.js / ECharts / Recharts / none | The statistical dashboard requirements (what charts the advanced-stats section actually needs). | **LOW-MEDIUM.** Defer until the dashboards are built; the choice should follow the requirements. |
| D7 | The linter (Biome vs ESLint+Prettier) | Biome / ESLint + Prettier | None needed — Biome is already the standard and it works. The question is whether the switch buys anything. | **LOW.** A linter switch is mechanical. But it is churn for no benefit, and it would split the project's history. Recommendation: keep Biome. |
| D8 | The formatter for the product | Enable Biome's formatter / leave it off | None needed. | **LOW.** Enabling the formatter is a one-line config change + one formatting pass. The cost of *not* doing it is drift (every agent formats differently). |
| D9 | The CI pipeline (GitHub Actions 8-step + nightly lab) | Build it / don't build it; full pipeline vs a minimal first version | None needed for the design (GPT's pipeline is proposed). The decision is whether to build it, and what the smallest version worth building first is. | **HIGH (the cost of NOT building it).** Every change is currently unverified. The cost of changing the pipeline later is LOW — CI is additive. Recommendation: build the minimal version first (pinned-lockfile install + type check + engine tests + production build, on every push), then add lint, determinism, and browser smoke tests. |
| D10 | The database | None / Cloudflare D1 / PostgreSQL / SQLite-Turso | The multiplayer / cloud-saves decision (whether the product needs a database at all). | **HIGH.** A database choice is hard to reverse once data is in it. Recommendation: none until a feature needs one. |
| D11 | Authentication (the provider, for later) | Google / Apple / email-password / Auth.js / Cloudflare's auth ecosystem | The accounts decision (when accounts arrive, and what they must do — roles, recovery, verification, deletion, export, privacy). | **MEDIUM.** Adding auth later is a real change, but the local-profiles-first design makes it additive rather than a rewrite. |
| D12 | Hosting | Cloudflare Pages / gh-pages (current) / Vercel / Netlify | The deployment needs (static now; Workers later). The free-tier + simple-to-operate constraint. | **LOW-MEDIUM.** Static hosting is portable (the output is a static build). The lock-in risk is in Cloudflare-specific services (Workers, D1, Turnstile) — those should be adopted deliberately, not drifted into. |
| D13 | The engine boundary enforcement | A dependency-boundary check + tests / the written principle only | An audit of the current engine (does it contain any prohibited import today?). | **HIGH (the cost of NOT enforcing it).** The boundary erodes silently — one import at a time — until the engine is no longer server-ready. The cost of adding the check later is LOW (it is a check, not a rewrite). |
| D14 | The save safeguards (versioning + migration + recovery) | Add them now / add them later / never | None needed — the safeguards are clearly needed. The question is when. | **HIGH (the cost of NOT adding them).** A corrupted save loses a user's franchise. And migrations get harder once unversioned saves exist in the wild. Recommendation: add the version number now (it is cheap and it makes every later migration possible). |
| D15 | Web Workers for simulation | Use Workers / keep the main thread | A performance measurement: does the simulation freeze or noticeably slow the UI? (Not measured yet.) | **MEDIUM.** Moving compute to a Worker is a real refactor — but the engine is already framework-independent, so the refactor is contained. |
| D16 | The React dependency (remove or keep) | Remove it / keep it (and name the files that need it) | Claude's explanation (which files import React, is it used at runtime, is it in the production bundle). | **LOW.** Removing an unused dependency is trivial. Keeping it is confusing — and it is the kind of thing that makes the next agent assume React is part of the stack. |
| D17 | The Vite split (8 vs 7) | Reconcile to one version / leave it | None needed. | **LOW.** A version bump. The risk is a breaking change between Vite 7 and 8 — which is exactly why the toolchain versions should be recorded in every agent report (GPT's §6). |
| D18 | The platform concept (a simulation-design platform vs a multisport simulator) | A platform to design your own simulation / a multisport simulator / a football simulator only | The council's Q11 filings + the Owner's direction. | **HIGH.** This changes the architecture's ambition — it is a product decision, not just a tooling one. It affects what the engine must be (a general simulation framework vs a football engine) and what the application shell must do. |
| D19 | PWA / offline | PWA / plain static site | The offline requirement (already a hard requirement). | **LOW-MEDIUM.** A PWA is additive to a static site (a manifest + a service worker). It can wait until the app is shippable. |
| D20 | Error monitoring / analytics | None / Sentry / PostHog / other | The privacy stance (no tracking, no personal data) + the free-tier constraint + whether the product needs crash reports. | **LOW.** These are additive services. The risk is not the cost of adding them — it is drifting into a third-party service that collects data without a deliberate decision. |

---

# Deliverable 4 — Agent implementation rules (DRAFT)

A concise set of instructions for Claude, Z.ai, Muse, and future agents so
they do not independently introduce new frameworks, dependencies, databases,
or tooling. **Draft — not in force until the Owner (and the Architect)
approve it.** When approved, it belongs in AGENTS.md (MUSE owns it).

## The rules

1. **Do not introduce a new framework, library, dependency, database,
   service, or tool.** If you need something new, file a proposal in your
   inbox (the §5 patch form: WHERE · old → new · WHY · SAFE ALONE? · HOW TO
   CHECK) with the reason, the alternatives you considered, and the cost —
   and wait for a decision. Do not just add it. This covers frameworks,
   CSS libraries, component libraries, icon libraries, charting libraries,
   bundlers, databases, ORMs, auth providers, analytics, error reporting,
   and any paid service.
2. **Do not change the framework, the build system, or the engine contracts
   without a decision.** The framework is open and under test (four
   prototypes) — no agent decides it by building in it. The build system
   (Vite) and the engine contracts (the frozen snapshot pin, the dataset
   pin, the envelope) change only on a recorded decision.
3. **The engine boundary is absolute.** Inside the engine: no browser APIs
   (`window`, `document`, `localStorage`), no UI component imports, no
   framework-specific stores, no `Math.random()`, no `Date.now()` and no
   implicit clock access, no network requests, no direct database access.
   The engine accepts defined inputs and produces defined outputs. If you
   need time or randomness, receive it as an explicit input. (The
   server-ready principle, the Owner, standing, 2026-11-12.)
4. **Every change ships with a receipt.** Run the checks before committing
   and report them: `node tools/lint.mjs` (Biome), `npm run tsc:check`
   (Colors), `npm test` (Node test runner). Report which tests were run,
   their result, and any known limitations. "I believe it works" is not a
   receipt. If a check cannot run (a tool is missing), say so — do not claim
   to have run it.
5. **Report every file changed, the architectural consequences, and the
   known limitations.** A change that touches the engine, the UI, the state,
   the tests, or the configuration must say so. A change that could affect
   determinism, historical simulation results, or the save format must say
   so explicitly.
6. **The free-tools / simple-to-operate constraint is a rule, not a
   preference.** Do not add a dependency that requires an API key, a paid
   account, or a paid service. Do not add a service the Owner would have to
   administer. If a proposal needs a paid service, say so in the proposal —
   do not hide it.
7. **Add by path, never `git add -A`.** Commit and push after every
   finished task. Never force-push. Never stash. Never edit the product
   file (the Architect only). Never edit another seat's branch. Never edit
   a shared governance file (`AGENTS.md`, `CLAUDE.md`, `biome.json`) unless
   the Architect, the Owner, or MUSE said to.
8. **Do not add a dependency without checking four things, and record the
   answers in the proposal:** (a) is it free? (b) does it need an API key?
   (c) does it need a paid account? (d) is it in the lockfile? A dependency
   that fails (a) is out of bounds unless the Owner explicitly approves it.
9. **Do not introduce a CSS library, a component library, an icon library,
   or a charting library without a decision.** The current styling is plain
   CSS in Svelte `<style>` blocks; the current components are hand-built;
   there is no icon library and no charting library. Those are the defaults
   until a decision changes them.
10. **If you don't know, say "don't know."** Do not guess a version, a
    dependency, a configuration, or a file's contents. Say what you checked
    and what you did not check. A "don't know" is useful information; a
    guessed answer is a defect.
11. **The product rules that are not tooling but bind tooling:** the user
    sees only Wins, Priority, OVR (with consistency). No injuries in any
    sport. Flex values stay consistent through the year. Calibration targets
    stay static. Ratings are the Owner's alone. Basketball is design-only
    until football is done. The wasted-capability term is not to be
    promoted. Svelte is NOT a lock.

## How these rules are enforced (the honest version)

Right now, they are enforced by **convention and review** — the council's
three-reviews rule, the Architect's integration, and the Owner's approval.
They are **not** enforced by automation (there is no CI, no pre-commit hook
by default, and no dependency-boundary check). That is exactly the gap
Deliverable 2 and D9/D13 are about: the rules should become checks (a CI
job, a boundary test, a lockfile check) so that an agent cannot
accidentally violate them. Until then, the rules rely on agents reading
them — which is why they are short, and why they belong in AGENTS.md where
every seat reads them first.
