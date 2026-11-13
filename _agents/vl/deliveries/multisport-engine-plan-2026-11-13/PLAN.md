# Multisport Engine Plan — VL proposal

**Seat:** VL (Council Advisor) · **Date:** 2026-11-13 · **Status:** proposal, not accepted
**Lane:** `_agents/vl/deliveries/multisport-engine-plan-2026-11-13/`
**Evidence labels:** VERIFIED (ran against repo) · REPORTED (someone else says so) · INFERRED (reasoned) · UNKNOWN (not established)

## 1. Objective

Produce the overarching architecture for the **new multisport engine build**: a football engine that ships first, is designed from day one to run on a server as well as in a browser, and can add a second sport (basketball, post-v1.1) without rewriting or contaminating the football product.

VL does not build the product file (Architect only, AGENTS.md §5). This plan is a proposal for the Architect's digest and the Owner's decision.

## 2. Ground truth (verified from the stack audit, MUSE Deliverable 1)

| Area | Current state | Source |
| --- | --- | --- |
| Product | "76 Pancakes" (Football Sim), one self-contained HTML, MIT, offline hard requirement | AGENTS.md §2, PROJECT-KNOWLEDGE |
| Engine track | `colors/` on `architect/engine-and-seats`, Svelte 5 + Vite, 0 `.svelte` files, engine single-sourced in TS, pin `4ca9a071` | AGENTS.md §2 (VERIFIED) |
| UI track | `67-cakepanz/` on `origin/gh-pages`, Svelte app, 10 `.svelte` files, Vite 7; live site gh-pages w85 index (w87 published) | PROJECT-KNOWLEDGE, audit 1B/1I (VERIFIED) |
| Frozen reference | `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c`, 657,486 B | AGENTS.md §2 (VERIFIED) |
| Languages | TypeScript ^5.9.3 primary; JS config only; no Python/Rust/Go/C++/Wasm in repo | audit 1A (VERIFIED) |
| Package manager | npm, single package, `package-lock.json`, caret ranges, no pinned Node | audit 1E (VERIFIED) |
| Lint | Biome 2.6.2 standard in Colors; formatter OFF for product; no ESLint/Prettier; no `lint-baseline.json`; nothing enforced | audit 1F (VERIFIED) |
| Type check | Colors `npm run tsc:check` (baseline wrapper); Cakepanz has tsconfig but no script; no `svelte-check` anywhere live | audit 1F (VERIFIED) |
| Tests | Node built-in test runner only (colors: `npm test`, 318/320 at ce7c9210); no Vitest/Jest/Playwright/Cypress in live tracks | audit 1G (VERIFIED) |
| CI | None — no `.github/workflows` on any branch | audit 1H (VERIFIED; GPT called it the most obvious weakness) |
| Persistence | localStorage only via `colors/src/platform/localstorage.ts`; no version field, no migration, no recovery (migration "died with P-258") | audit 1J (VERIFIED) |
| RNG | Philox2x32 (`colors/src/core/keyedrng.ts`, multiplier `0xd256d193`), NOT mulberry32 | audit 1A/1M, MUSE correction (VERIFIED) |
| Protected constants | DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS; modelWeights() = monotone quantisation of slotWinsPerOvr() | AGENTS.md §3 (VERIFIED) |
| Flex table | 99 rules, live only on Architect's branch | AGENTS.md §2 (VERIFIED) |
| Model-first | Owner 2026-11-08: salary weights dead; weights come out of engine's measured impact (slotWins20) | queue P-293 (VERIFIED) |
| Calibration targets | Skilled drafter: 90% playoffs, ~35% SB, 25% title, P(20-0) 1–2% | queue P-250/P-255 (VERIFIED) |
| Server-ready principle | Engine independent of browser APIs, UI state, localStorage, framework code; defined inputs/outputs | MUSE audit GPT §2 (REPORTED, not yet a check) |
| Multi-sport | Basketball post-v1.1; design-only until football done | PROJECT-KNOWLEDGE (VERIFIED) |

## 3. Core architectural decision: sport-independent shell, not sport-independent engine

**Recommendation (adopts GPT §10C, MUSE D18 deferral):** do NOT build one generalized mega-engine that football and basketball squeeze into. They have fundamentally different rules, event structures, player attributes, and statistical models — premature generalization would distort football today.

Instead:

* **Shared application shell:** save management, franchise navigation, user preferences, history presentation, common data visualization, storage adapter, RNG/clock primitives, scheduling/draft/standings algorithms.
* **Independent domain engines per sport:** `sports/nfl/` (football, existing Colors engine) and `sports/nba/` (basketball, new, post-v1.1). Each owns its ratings model, game simulation, season simulation, draft, form/injury policy.
* **One enforceable contract** (`engine/contract.ts`): `simulateGame(inputs, rng, clock) => GameResult`, `simulateSeason(...)`, `draft(...)`, `validateInvariants(state)`. The shell talks to any sport through this contract; the engine knows nothing about the shell.

Rationale: adding basketball later means a new `sports/nba/` folder and a shell route — zero changes to `sports/nfl/`. The football product ships unchanged. This is the cheapest reversible path and matches the Owner's "do not prematurely generalize" directive.

## 4. Directory structure (engine)

```
engine/
  core/              sport-agnostic primitives
    rng.ts           Philox2x32, injectable named streams (games, drafts, seasons); no Math.random
    clock.ts         explicit clock input; no Date.now/new Date
    collections.ts   immutable roster/team helpers
    invariants.ts    rules that must always hold (roster caps, one team per player, valid final score)
  shared/            shared algorithms
    draft.ts         snake draft (sport-agnostic loop, sport-specific pool/order)
    schedule.ts      round-robin / division scheduling
    standings.ts     W-L, tiebreakers, playoff seeds
  sports/
    nfl/             football domain (existing Colors engine, pin 4ca9a071; never edited to match UI)
    nba/             basketball domain (post-v1.1, new)
  contract.ts        SimulationEngine<Sport> interface + input/output types
  version.ts         rules version + data version stamps on every output
```

All under `colors/` (the single engine source of truth). Cakepanz consumes the frozen pin; neither builder edits the other's tree (AGENTS.md §2).

## 5. The engine boundary — written principle + mechanical check

The server-ready principle is currently a written instruction, not enforced (audit 1F). **VL recommends making it checkable**, cheaply:

A CI/gate script (no new dependency) that fails the build if `engine/` contains any of:
- `window`, `document`, `localStorage`, `navigator`, `fetch`, `XMLHttpRequest`, `WebSocket`, `indexedDB`
- UI component imports, framework-specific stores
- `Math.random()`, `Date.now()`, `new Date()` without an explicit input parameter
- network requests or direct database access

Rule: time and randomness are received as explicit inputs. Outputs are plain JSON-serializable data (no browser objects, no framework classes). This is D13 ("engine boundary enforcement") — the cost of *not* doing it is silent erosion, one import at a time, until the engine is no longer server-ready.

## 6. Data model and versioned persistence (D14)

* **Save envelope:** `{ version: 1, schema, sport, createdAt, data, checksum }`. Every save carries a version number.
* **Legacy:** unversioned saves = v0, handled by a deliberate migration/recovery path, never auto-rejected (Owner directive).
* **Player ratings:** versioned per season; completed seasons are snapshots — historical seasons keep the ratings that were in play, independent of the current player database.
* **Global records:** persist independently of individual save deletion.
* **Storage:** keep the localStorage adapter behind an interface (audit 1J — IndexedDB only when data volume justifies it). Add load validation, migration v0→v1, recovery from corruption, quota handling, and a deliberate save strategy (no huge repeated writes).
* **Tests:** save creation/load/migration/recovery as Node tests.

This is the Owner's save-safety list (audit §4) with a clear "do not build a generalized persistence framework" bound.

## 7. Determinism and reproducibility

* Seeded Philox2x32 with independent streams per concern (games, drafts, seasons).
* Any randomness/time enters engine functions as an explicit input — replay from a saved seed reproduces identical results.
* **Golden-file seed test (P-256):** 5 seeds × 1 season, hash box scores, commit as a golden file; one CI step. If hashes move after an engine change, something changed — reproducibility is a fact, not a feeling.
* Every completed franchise records which simulation rules version produced its results (versioned rules, MUSE audit GPT §2).

## 8. Testing pyramid and CI (D9, GPT §4/§5)

Layers, tools, purpose:

| Layer | Tool | Purpose |
| --- | --- | --- |
| Engine unit | Node built-in test runner | rules, calculations, algorithms (deterministic, seeded) |
| Type check | `tsc` (baseline wrapper) + `svelte-check` | catch type/Svelte errors (Cakepanz script missing today — add it) |
| Lint/format | Biome (one config, formatter ON for product) | consistency, enforced |
| UI integration | Playwright | real user flows across the framework-test prototypes |
| Production build | Vite | ensures the app actually builds |
| Determinism/regression | Node test runner + golden-file seed test | fixed-seed replays, known outputs |
| Simulation lab | Node test runner (manual/nightly) | thousands of seasons, distributions, invariants |

**CI pipeline (smallest version first):** install from pinned lockfile → type check → engine unit tests → production build → lint. Then add: determinism/regression, format, browser smoke. Nightly job: simulate thousands of seasons, check invariants (roster caps, one team per player, valid final score, draft order, no double awards, valid age/development), compare against historical baselines, flag distribution drift.

Do not equate test count with quality. Property/invariant tests where they clearly help; no framework added just because it's popular.

## 9. Frontend — deferred to the framework test

Current app: Svelte 5 + Vite (not SvelteKit; audit Q1). Framework under test: four prototypes (SvelteKit, React, Vue/Nuxt, SolidStart) with weighted scoring, change amplification, shared contract tests, Playwright. **Svelte is not a lock (Owner 2026-11-12).**

Until the test decides: plain CSS in Svelte `<style>` blocks, hand-built components, no component library, no icon library (centralize to one module when added — Lucide recommended), no charting library until dashboards exist. No Tailwind by default (styling is hard to reverse — D3). React 19 in Colors is installed but unused (audit Q3 — cleanup candidate, verify with Claude before removal).

## 10. What we deliberately do NOT build now (anti-overengineering)

No hosted database, no authentication, no custom backend, no microservices, no Docker/Kubernetes, no Redis, no GraphQL, no complex state library, no monorepo, no paid APIs/services, no Web Workers until profiling shows a need, no framework rewrite before the test, no generalized multi-sport engine, no analytics/error-monitoring until the product is public and the free/no-tracking stance is weighed. Every addition answers: what concrete problem, why can't the current stack solve it, simplest alternative, maintenance burden, cost, evidence (Owner §17).

## 11. D1–D20 positions (summary)

* D1 frontend framework: undecided — the four-prototype test decides; Svelte 5 + Vite is current, not locked.
* D2 SvelteKit vs Svelte+Vite: clarify in test design; current app is Svelte+Vite; a SvelteKit win is a migration.
* D3 CSS: plain CSS for now; deliberate CSS decision before UI grows.
* D4 component library: hand-built now; evaluate against winning framework later.
* D5 icons: centralize one module, then decide (Lucide recommended).
* D6 charts: defer until dashboards.
* D7 linter: keep Biome; enforce consistently across both tracks (reject ESLint+Prettier switch, accept the enforcement point).
* D8 formatter: enable Biome formatter for product (one formatter).
* D9 CI: build minimal pipeline now; high priority.
* D10 database: none until multiplayer/cloud saves (D1 high cost to reverse).
* D11 auth: none for initial release; provider undecided for later.
* D12 hosting: Cloudflare Pages intended (static); gh-pages current; portable static output.
* D13 engine boundary: enforce with CI gate — high cost of not doing it.
* D14 saves: version now; v0 legacy path; migration/recovery; high cost of not doing it.
* D15 Web Workers: undecided; needs a performance measurement first.
* D16 React: verify usage with Claude; remove if genuinely unused (low cost).
* D17 Vite split: record toolchain versions in reports; reconcile to one version at framework decision (low cost).
* D18 platform vs multisport: shell + independent engines (this plan); product decision, defer generalization.
* D19 PWA/offline: offline already required; PWA additive, can wait until shippable.
* D20 monitoring/analytics: none until deliberate Owner decision (free tier still collects data).

## 12. 30-day roadmap (one Owner directing AI agents)

| Phase | Objective | Work included | Work excluded | Acceptance | Risk |
| --- | --- | --- | --- | --- | --- |
| 1 (days 1–7) | Stabilize | Minimal CI (lockfile install, type check, engine tests, build); Biome lint both tracks; formatter ON for product; `svelte-check` script for Cakepanz; record toolchain versions; fix or quarantine failing tests with documentation | No framework switch, no dependency adds, no engine rewrite | CI runs green on push; `npm test` and `tsc:check` pass in both tracks | None substantial |
| 2 (days 8–14) | Protect engine | Boundary check script; audit engine for prohibited imports; injectable RNG/clock audit; golden-file seed test committed | No engine logic changes | gate fails on a deliberately perturbed import; golden-file hashes stable | Low |
| 3 (days 15–21) | Protect persistence | Save version field; load validation; v0 migration path; recovery + quota tests; global records separate from saves | No IndexedDB, no cloud saves | corrupted/unversioned save handled without data loss | Medium (data safety) |
| 4 (days 22–30) | Simulation lab v1 | Seeded batches; baseline output distributions; invariants; regression comparison vs baseline | No dashboard, no separate lab app | Lab run reproduces baseline; invariant violations flagged | Low |

Dependencies: phase 2 needs phase 1's CI; phase 4 needs phase 2's determinism. Nothing blocks the framework test (it runs in parallel on its own branches).

## 13. Decisions needed

* **Owner:** confirm shell + independent engines (not one generalized engine) as the multisport direction; approve CI as the next infrastructure task; approve save versioning now.
* **Architect:** confirm engine boundary check placement; confirm contract.ts shape; apply P-318/P-319 (slotWins20 drives board) before any multisport work so the engine value model is settled.
* **Both:** framework test outcome decides frontend; nothing in this plan changes protected constants without Owner approval and MERGE-MANIFEST.md re-pin.

## 14. How this plan is delivered

Per council protocol (§5): this document lives in VL's lane only. VL never edits `Football-Sim-*.html`, `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, `PROJECT-KNOWLEDGE.md`, or protected constants. The Architect collects inbox filings with `node tools/council-sync.mjs --inbox`. An inbox summary is filed alongside this plan. Three independent reviews (ok/improved) from three seats would carry this to REVIEWED; the Architect decides adoption.
