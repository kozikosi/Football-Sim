SPEAKER: or | ROLE: council | TASK: P-354 | DATE: 2026-11-13T01:17:39Z

FOR: P-354

# Comprehensive Architectural Review — 11 Deliverables

This is the full 11-part analysis requested in the prompt. The track brief is the most urgent finding; the rest are the supporting analysis.

## Deliverable 1 — Executive Assessment

**Current condition:** The project has two parallel tracks, both with real, testable code. **Colors** (Architect's track) has the complete engine — 28 source files, 213 passing tests, full football simulation, framework-agnostic purity enforcement. **Cakepanz** (GH's track) has the minimal reference — 7 engine files, 66 passing tests, the framework-testing surface. The verified live product is Pre-Colors (`Football-Sim-PreColors.html`, `40233d6be00e987c`, 657,486 B). No CI exists anywhere. Build uses esbuild (not Vite) to emit a self-contained HTML.

**Strongest assets:** 213 passing engine tests covering determinism, golden regression, flex rules, lineups, schedules, standings, recaps, themes, save/replay determinism. Seeded Philox2x32 RNG. Enforced engine purity (no DOM/Math.random/Date.now/storage in `src/engine`). The engine genuinely runs in Node with zero browser dependencies.

**Biggest weaknesses:** No automated CI/CD anywhere; no browser automation; React 19 declared in Colors `package.json` with zero source imports (dead weight); no versioned saves; no deployed live product; the build is esbuild, not Vite, despite package.json describing Vite tooling.

**Most important unresolved architectural question:** **Colors vs. Cakepanz track ambiguity.** Which is the authoritative product? This is the single issue that blocks every other recommendation.

**Most important simulation-quality challenge:** The engine uses static, context-independent values (slot wins, flex prices, home-field advantage, scoring parameters) where the review consistently identifies they should fluctuate by opponent, situation, and form. The gap between the model and reality is the core issue.

**Most dangerous project-management risk:** Without knowing which track is primary, agents may work on the wrong implementation, duplicate code, or produce incompatible changes.

**Best opportunity:** Establish Colors as the primary product track (full engine + app), and use Cakepanz as the framework-testing surface. This gives one source of truth while preserving the framework comparison capability.

**Path assessment:** Salvageable but disorganized. The engine is genuinely strong; the ambiguity and lack of CI are the main risks.

## Deliverable 2 — Colors/Cakepanz Track Brief

**Evidence gathered (VERIFIED):**

| Question | Answer |
|---|---|
| What is Colors today? | `architect/engine-and-seats` — full TypeScript engine + app layer + view layer, 28 source files, 213 tests passing, esbuild bundler |
| What is Cakepanz today? | `council/GH` — minimal reference: 7 engine files (flex, hungarian, kicking, lineup, players, rng, slots), 66 tests passing, no app layer, no view layer |
| Where does each live? | Colors: `/Users/kosi/Desktop/wt/architect-colors/colors/` (branch `architect/engine-and-seats`). Cakepanz: `/Users/kosi/Desktop/wt/GH/colors/` (branch `council/GH`) |
| What can each do? | Colors: full draft, season, game simulation, box scores, recaps, standings, themes, save/replay. Cakepanz: engine purity testing + framework evaluation surface only |
| Which has the authoritative engine? | **Colors** — 21 files vs Cakepanz's 7. Cakepanz is a strict subset of Colors' engine (same file names, same purity contract) |
| Which has the complete UI? | **Colors** — has `src/app/` (selectors, store) and `src/view/` (draftBoard, roster, teamColors, theme). Cakepanz has neither |
| Are they competing? | **No.** Cakepanz is a deliberate subset — the framework-testing surface. Its 7 engine files are byte-identical in contract to Colors' equivalents |
| What is shared? | Same purity test contract, same engine file names, same test command (`node --test --experimental-strip-types "test/*.test.ts"`) |
| What is duplicated? | 7 engine files exist in both (same purpose, Cakepanz is the smaller set) |
| Which builds and runs? | Both run tests. Colors has a working build script (`build/build.mjs`); Cakepanz has no build script |
| Test suites? | Colors: 213 tests, 0 failing. Cakepanz: 66 tests, 0 failing |
| Pre-Colors status? | `Football-Sim-PreColors.html` (657,486 B, `40233d6be00e987c`) is the verified build in both tracks, byte-identical |
| Deployed? | **No.** No `index.html`, no deploy config, no live URL found |
| React dependency? | Colors `package.json` declares `react`/`react-dom` ^19.3.1. **Zero source files import React** — dead weight (VERIFIED by grep) |

**Recommendation:** Colors is the primary product track. Cakepanz should remain as the framework-testing surface, not be merged. The Owner must decide this.

**Three paths:**

1. **Colors primary (recommended):** Full engine + app + view. Cost: none. Risk: Cakepanz's framework-test work becomes a separate evaluation surface. Gain: single source of truth, complete product.
2. **Cakepanz primary:** Would require rebuilding app + view layer from scratch. Cost: high. Risk: losing 213 tests and 21 engine files. Gain: framework flexibility.
3. **Integrate selected parts:** No demonstrated need. Cakepanz's engine files are a subset of Colors'. Integration would create duplication.

## Deliverable 3 — Assessment of Prior AI Recommendations

**Adopt:**
- **CI is the highest-priority infrastructure gap** (GPT, Gemini, Grok, Q all agree). Evidence: zero workflow files exist anywhere.
- **Engine boundary enforcement** (GPT's prohibition list + Colors' existing purity test). The purity test is already the mechanical enforcement — extend it rather than replace it.
- **Save versioning with legacy v0 support** (Grok). Unversioned saves must not be rejected.
- **Simulation Laboratory** (GPT's three-type testing frame: software correctness, football realism, balance). This is the right long-term investment.
- **Agent implementation receipts** (Q's pre-execution acknowledgment). Adopt for consequential work only, not every task.
- **React removal** (Gemini) — but only after a second verifier confirms zero imports. My grep confirms zero imports in `src/`; removal is safe but should be a separate, reviewable commit.

**Modify:**
- **SvelteKit vs Svelte+Vite** (GPT's D2): The current build is neither — it's esbuild. The framework test should test against the actual build tool, not an assumed one.
- **Biome formatting for product** (Gemini): Do it as an isolated, reviewable change. The product is a single HTML file; formatting it is low-risk but should not be mixed with functional changes.
- **Vite version reconciliation** (Gemini): Not an emergency. Colors and Cakepanz are separate tracks with different purposes. Record versions in reports; do not blindly upgrade.

**Reject:**
- **Removing React immediately** without a second verifier. My grep is sufficient evidence, but the AGENTS.md rule requires a verifier different from the implementer. Use a second seat.
- **SvelteKit migration** (GPT): The current app has zero `.svelte` files. Migrating to SvelteKit would be a rewrite, not a confirmation.
- **IndexedDB now** (GPT): localStorage behind an isolated interface is sufficient. Migrate only when data volume justifies it.
- **Web Workers** (GPT): Defer until profiling shows a bottleneck. No evidence of one.

**Issues the prior reviews missed:**
- The build is **esbuild, not Vite**. Both `package.json` files describe Vite tooling that doesn't exist. This is a documentation/accuracy problem, not a technical one.
- **No deployed product exists.** gh-pages is live but serves the old artifact, not the current build.
- The **Colors package.json description** claims React is "used only by the UI adapters" — no adapter file exists that imports it. This is a false claim in the project's own documentation.

**Disagreements that remain unresolved:**
- Whether Cakepanz should be retired entirely or kept as a testing surface. My recommendation: keep it as the framework-test surface.
- Whether the framework experiment should include SolidStart as a fourth prototype. Deferred to the Owner.

## Deliverable 4 — Prioritized Remediation Queue

| # | Item | Why | Files | Risk | Verification | Owner approval? |
|---|---|---|---|---|---|---|
| 1 | **Resolve Colors vs. Cakepanz** | Blocks all other work | N/A | None (decision only) | Owner decision | **YES** |
| 2 | **Establish CI** | No automated checks; agents can break things silently | `.github/workflows/` | Low | Workflow runs, fails on intentional defect | No (Architect scope) |
| 3 | **Remove unused React dependency** | Dead weight, false package.json claim | `colors/package.json` | Low | `npm test` passes, grep confirms zero imports | No |
| 4 | **Add save versioning** | Current saves have no schema version | `src/engine/` or app layer | Medium (save compatibility) | Migration test: v0 legacy → v1 | No |
| 5 | **Fix package.json descriptions** | False claims about Vite and React | `colors/package.json` | None | Descriptions match reality | No |
| 6 | **Add browser smoke tests** | No browser-level verification | `tools/` or new test dir | Low | Playwright runs critical flows | No |
| 7 | **Simulation Laboratory v1** | Long-term simulation quality | New dir, `tools/simlab/` | Low | Seeded batch runs, distribution baselines | No |
| 8 | **Enable Biome product formatting** | Inconsistent style | `Football-Sim-PreColors.html` | Low | Isolated formatting commit, diff review | No |

## Deliverable 5 — Recommended Target Architecture

```
Football-Sim (single self-contained HTML)
│
├── src/engine/          ← Pure domain logic, zero framework/browser deps
│   ├── players.ts       ← Ratings, pool, player model
│   ├── slots.ts         ← Draft slot values (protected constants)
│   ├── lineup.ts        ← Optimal lineup solver
│   ├── draft.ts         ← CPU draft algorithm
│   ├── season.ts        ← Season orchestration
│   ├── game.ts          ← Game simulation (matchup, drives, plans)
│   ├── recap.ts         ← Game recap generation
│   ├── standings.ts     ← Tiebreakers, playoff seeding
│   ├── flex.ts          ← Flex pricing rules
│   ├── rng.ts           ← Seeded Philox2x32 streams
│   ├── ratings.ts       ← Player rating calculations
│   ├── specs.ts         ← Position specifications
│   └── ...              ← 21 more engine modules
│
├── src/app/             ← Application orchestration (state machine)
│   ├── store.ts         ← Save/load, franchise state
│   └── selectors.ts     ← Derived state
│
├── src/view/            ← Presentation layer (view-models only)
│   ├── draftBoard.ts    ← Draft board display logic
│   ├── roster.ts        ← Roster display logic
│   ├── teamColors.ts    ← Team color palette
│   └── theme.ts         ← Theme token generation
│
├── test/                ← 213 engine tests (Node, deterministic)
├── build/build.mjs      ← esbuild bundler → single HTML
└── tools/               ← Lint, probes, preservation, council
```

**Boundaries:**
- **Engine → UI:** One-way. Engine never imports from `src/app` or `src/view`.
- **UI → Engine:** UI imports engine functions only. No DOM, storage, or clock access in engine.
- **Persistence:** Isolated adapter in `src/app/store.ts`. Engine never touches storage directly.

**Now vs. later:** This architecture is appropriate now. At 10,000 users, the engine could be extracted to a server with zero changes to its internal logic — that's the server-ready principle.

## Deliverable 6 — D1–D20 Decision Register

| ID | Decision | Current State | Recommendation | Priority | Owner? |
|---|---|---|---|---|---|
| D1 | Frontend framework | Svelte 5 declared, zero `.svelte` files, esbuild bundler | **Keep Svelte 5 as declared framework.** The framework experiment tests the actual build tool (esbuild), not an assumed one. | Implement now | No |
| D2 | SvelteKit vs Svelte+Vite | Neither — it's Svelte+esbuild | **Keep Svelte+esbuild.** SvelteKit migration would be a rewrite with zero demonstrated benefit. | Decide now | No |
| D3 | CSS architecture | Plain CSS in single HTML file | **Keep plain CSS.** No evidence a design system is needed. | Defer | No |
| D4 | Component library | Hand-built, zero library | **Keep hand-built.** No component library exists; adding one is premature. | Defer | No |
| D5 | Icon library | None | **Keep none.** Inline SVG or CSS where needed. | Defer | No |
| D6 | Charting library | None | **Keep none.** Hand-build charts if needed. | Defer | No |
| D7 | Biome vs ESLint/Prettier | Biome 2.6.2 in Colors only | **Keep Biome.** No evidence to switch. Enable product formatting as isolated change. | Implement now | No |
| D8 | Product formatting | Off | **Enable as isolated, reviewable change.** Do not mix with functional changes. | Implement now | No |
| D9 | Continuous integration | **None exists** | **Establish minimal-first CI.** Lockfile install + type check + engine tests + build. | **High** | No |
| D10 | Database | None | **Keep none.** Local-first, localStorage. No database needed. | Defer | No |
| D11 | Authentication | None | **Keep none.** No accounts, no backend. | Defer | No |
| D12 | Hosting | Manual, gh-pages live with old artifact | **Keep manual.** Cloudflare Pages intended but not set up. | Defer | No |
| D13 | Engine boundary enforcement | Purity test exists (213 tests) | **Keep and extend.** The purity test is the mechanical enforcement. Add app-layer purity test. | Implement now | No |
| D14 | Save versioning | **None — all saves unversioned** | **Version new saves.** Treat unversioned as v0 legacy. Add migration test. | Implement now | No |
| D15 | Web Workers | None | **Defer.** No performance evidence. Profile first. | Defer | No |
| D16 | React dependency | Declared, zero imports | **Remove.** Verified by grep. Separate reviewable commit. | Implement now | No |
| D17 | Vite version divergence | esbuild in both tracks (Vite not actually used) | **Not an issue.** Both use esbuild. Record versions in reports. | Defer | No |
| D18 | Multi-sport | Deferred | **Defer.** No premature generalization. | Defer | No |
| D19 | PWA/offline | None | **Defer.** Assess based on actual user needs. | Defer | No |
| D20 | Error monitoring | None | **Keep none.** No paid services. | Defer | No |

## Deliverable 7 — Simulation Laboratory Specification

**First version (smallest useful):**

**Primary research questions:**
1. Does the engine produce statistically plausible football outcomes?
2. Do engine changes cause unintended distribution shifts?
3. Is the simulation deterministic and reproducible?

**Historical data:** The nflverse data (VERIFIED: ~30 files, 484K play-by-play rows, 2016–2025) exists but is not yet integrated into any analysis workflow.

**Simulation workload:** Seeded batches of 100 seasons, 272 games each. Compare against NFL reference distributions.

**Metrics:**
- Scoring distribution (mean, SD, percentiles)
- Turnover rates by play type
- Sack rates
- Win distributions by team strength
- Score margin distributions
- Positional production

**Calibration:** Divide seasons into calibration (2016–2021) and validation (2022–2025). Prevent overfitting by holding out validation seasons.

**Regression testing:** Compare engine versions on identical seeds. Flag any metric that shifts by more than 2 SD from baseline.

**First deliverable:** A script that runs 100 seeded seasons and outputs a distribution report comparing against NFL baselines.

## Deliverable 8 — AI-Agent Operating Model

**Canonical documents (one source of truth each):**
- `AGENTS.md` — Agent rules (MUSE owns)
- `PROJECT-KNOWLEDGE.md` — Current project state (Architect owns)
- `tools/council.mjs` — Queue and review chain (MUSE owns)

**Decision rights:**
- Owner: product direction, protected constants, irreversible actions
- Architect: technical decisions, what enters the build
- Council: investigate, propose, test, dissent. No veto.

**Branch strategy:** One worktree per seat, `council/<seat>`. Push only your own branch. Never force-push.

**Implementation receipts (for consequential work only):**
1. Task completed
2. Files modified
3. Commands run + results
4. Known failures
5. Effects on determinism and save compatibility

**Context management:** Read only what the task names. Use grep, not whole-file reads. Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN.

## Deliverable 9 — Implementation Roadmap

**30-day plan:**

| Week | Objective | Work |
|---|---|---|
| 1 | Resolve track ambiguity | Owner decides: Colors primary. Document decision. |
| 2 | Establish CI | GitHub Actions: install → typecheck → test → build. Verify it fails on intentional defect. |
| 3 | Clean up dependencies | Remove React. Fix package.json descriptions. Enable Biome formatting (isolated commit). |
| 4 | Protect persistence | Add save versioning. Migration test for v0 legacy saves. |

**Acceptance criteria:** CI green on every PR. `npm test` passes 213/213. No React in dependency graph. Saves carry version field. Legacy saves load as v0.

## Deliverable 10 — Documentation and Change Plan

**Preserve:** `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `STATUS.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `V22-Suggestions.md` (frozen).

**Update:** `PROJECT-KNOWLEDGE.md` — add Colors-as-primary decision, CI status, save versioning status.

**Consolidate:** `QUESTIONS-FOR-THE-ARCHITECT.md` — archive resolved questions, keep open ones.

**Create:** None. No new documentation until the architecture is settled.

## Deliverable 11 — Final Owner Decision List

| # | Decision | Recommendation | Alternative | Consequence | Urgent? |
|---|---|---|---|---|---|
| 1 | **Colors vs. Cakepanz** | Colors is primary | Cakepanz primary | Choosing Cakepanz means rebuilding app + view layer | **YES — blocks everything** |
| 2 | **SolidStart as fourth framework prototype** | Add it | Keep three prototypes | More data, more cost | Can wait |
| 3 | **Save versioning approach** | v1 for new saves, v0 legacy | Reject unversioned saves | Rejecting legacy saves breaks existing data | Can wait |
| 4 | **Simulation Laboratory scope** | Seeded batch runs + distribution comparison | Full dashboard | Overengineering the first version | Can wait |

---

**One thing I'd flag:** The user's framing — "take the time to think, innovate, brainstorm, improve your overarching plan for the new multisport engine build" — is the right instinct, but the evidence shows the project is not yet at the multisport stage. The engine has 28 files, 213 tests, and a real, working simulation. The multisport abstraction should wait until football is credible and shipped. The framework experiment, CI, and save safety are the actual next investments.

**Token budget note:** This is a substantial review. Per START-HERE §5, I should flag if the budget is low. I'm at roughly 40-50k tokens used. I'll commit and push my findings, then suggest the Owner read the track brief first before proceeding to implementation.