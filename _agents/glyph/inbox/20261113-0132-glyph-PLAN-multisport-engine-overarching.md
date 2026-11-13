SPEAKER: glyph | ROLE: council (engineering) | TASK: overarching plan for the new multisport engine build (response to Owner platform/architecture prompt 2026-11-12/13) | DATE: 2026-11-13T01:32Z
KIND: IDEA / PLAN (architectural proposal for council review; not a product change, not a patch)
FOR: (no existing P-item; responds to Owner prompt relayed 2026-11-13 — platform vision, server-ready engine, framework test Svelte/React/Vue/Solid, GPT assessment, stack audit, dynamic-engine verdicts)
CONTEXT-READ (VERIFIED this chat): `origin/council/muse:_agents/START-HERE.md`; live queue head `origin/council/muse:_agents/QUEUE.md` (P-333+); owner notes `2026-11-12-platform-vision-and-architecture-verbatim.txt`, `2026-11-12-server-ready-engine-verbatim.txt`, `2026-11-11-dynamic-engine-verdicts-verbatim.txt`, `2026-11-11-focus-and-form-answers-verbatim.txt`, stack audit questionnaire/answers/deliverables on `origin/council/muse` (`stack-audit-priority-answers-2026-11-12.md`, `stack-audit-deliverables-2026-11-12.md`); GPT assessment and framework-test context as relayed in Owner prompt. I did not re-read AGENTS/PROJECT-KNOWLEDGE/bulletin in full per START-HERE task-given rule; this plan is constrained by the Owner rulings in those notes and should be cross-checked against PROJECT-KNOWLEDGE by reviewers.
EVIDENCE: labels per claim — VERIFIED (repo/Owner note/queue), INFERRED (design conclusion), UNKNOWN (needs measurement/decision).

# Overarching plan — new multisport engine build (glyph)

## 0. North star and non-negotiables
- **Product truth (Owner, VERIFIED):** build a credible, enjoyable football simulation first; keep the option to become a substantial online sports-gaming platform without building platform infrastructure now. Multisport/basketball is design-only until football is done. "A platform to design your own simulation…" is a vision seed (REPORTED/Owner, 2026-11-12), not a license to generalize prematurely.
- **Engine truth (Owner, standing, VERIFIED):** the simulation engine is designed as if it will eventually run on a centralized server even while it runs locally. It accepts defined inputs and produces defined outputs; it is independent of browser APIs, UI state, local storage, and framework-specific code. This boundary must not move.
- **Determinism and trust (INFERRED from P-342/Colors direction):** same inputs + same data + same rules/version + same seed/keys => same results. Time, randomness, and environment are explicit inputs — never implicit globals (`Math.random`, `Date.now`, wall clock, DOM, network).
- **Simplicity/operability (Owner, VERIFIED):** free tools/services, no unnecessary accounts/backends/paid infra, local-first now, static hosting practical; AI agents write 100% of code so the stack must be understandable, inspectable, and mechanically checkable.
- **Rulings shaping behavior (Owner 2026-11-11/12, VERIFIED):** static truth on the draft board (Wins are wins; QB generally most important) but matchup-aware value exists; **offensive focus** is pre-game + halftime (auto default, optimize auto, no halftime prompt if auto unless toggled), focus re-ranks **Priority** and affects the game but does **not** change Wins or other static board values; flex values stay **consistent through the year**; **no injuries** in any sport (32 rounds kept); **form** tracked, OVR can move ~±5–6, form **visible** (simple green/red arrow per team palette, no emoji/text labels) — reset/carryover/update-cadence remain design details unless Owner rules; group synergies, gravity/double-teams (user-visible in advanced stats), clutch visuals (especially final 5 min/OT) and 4th-quarter automatics matter; draft class fixed; calibration targets remain a static test measure; two-way/top-star opposite-side use is theoretically allowed (interacts with dual positions).

## 1. Architectural stance — four layers, one-way dependencies, enforceable seams
**INFERRED improvement (builds on GPT server-ready recommendation):** treat the system as four layers with explicit contracts. This keeps football shippable now, makes P-342 migration tractable, and makes server/multisport possible later without a rewrite.

1. **Sport Simulation Core (pure domain, sport rules + events)**
   - Responsibilities: state transitions, play/drive/game/season resolution, lineup/role effects, focus/form/synergy/gravity/clutch application, stats/awards derivation, RNG consumption.
   - Inputs: `SimCommand`/intent, `SportPack` (rules/constants/slot/formation/focus definitions), `RosterSnapshot` (players, ratings, roles, form, dual positions), `Context` (score/clock/phase/venue/home/rivalry/playoffs as modeled), `Seed/Key`, `EngineVersion`/`RulesetVersion`.
   - Outputs: immutable `EventLog` + derived `State` + `BoxScore/Stats/Artifacts` (all serializable, no functions/DOM/class instances that break replay).
   - Prohibitions (target: mechanically enforced): no `window/document/localStorage`, no framework/store/UI imports, no `Math.random/Date.now/new Date()` for logic, no network/DB, no hidden mutable singletons. Clock is modeled data, not wall clock.

2. **Application Orchestrator (franchise/session logic, platform-agnostic)**
   - Responsibilities: draft flow, season/week progression, save-slot semantics, CPU decision orchestration, applying user choices (pre-game/halftime focus, lineup), validating commands, composing core calls.
   - Same purity discipline where feasible; must not require browser APIs. This is what a future authoritative server invokes.

3. **Platform Adapters (replaceable edges)**
   - Persistence adapter (now localStorage; later IndexedDB/server DB), clock/scheduler, telemetry hooks (optional, free/local by default), asset loading. Adapters translate between domain snapshots and environment; core never sees adapter types.

4. **Presentation/UI (framework choice open)**
   - Renders state/artifacts, collects intents, never owns simulation truth. UI is swappable (Svelte/React/Vue/Solid per test) because it consumes contracts, not engine internals. Advanced stats (gravity/double-teams, clutch) are views over engine-produced metrics, not UI inventions.

**Why this is better (INFERRED):** it makes "authoritative server" a deployment of (1)+(2) behind a command boundary, keeps (4) disposable, and gives AI agents small, typed targets with contract tests instead of cross-cutting edits.

## 2. Simulation model — one kernel, two views, event-sourced (evolve P-342)
**Align with P-342 direction (VERIFIED in queue context):** one play-level, event-sourced model; two views — stochastic Monte Carlo simulator and exact/analytic solver for valuation — sharing the same rules/state transitions. Strangler migration with the drive engine as oracle/plumbing reference until phase gates pass.

**Improvements to the plan:**
- **Event-sourced core, not just logs:** every meaningful transition is an event (`Snap`, `PlayResolved`, `DriveEnd`, `Substitution/Package`, `FocusSet/HalftimeAdjust`, `FormTick`, `PenaltyBig`, `ClockEvent`, etc.) with deterministic ordering and replay. Enables reproducible debugging, save migration/versioning, authoritative-server command replay, and advanced stats (gravity, participation, clutch) as projections — not side calculations.
- **Unified decision/value pipeline (scoped "engine generates the math"):**
  - *Participation & contribution* come from the play/personnel model (snap ledger/usage emerges from packages, focus, score state). No injuries.
  - *Value/priority surfaces* are projections: board **Wins remain static-calibrated measures**; matchup/focus-adjusted **Priority** is computed by applying the same kernel/contracts under declared context (opponent tendencies, chosen focus, form) without mutating Wins (Owner ruling). Flex values remain consistent through the year.
  - *Flex/role legality and pricing* must respect: consistent flex values, dual positions free between owned positions (P-336 direction), no gates hiding formula issues, scarcity/socialism principles already ruled — engine must not re-lineup the user team on its own.
- **Dynamic features as explicit, bounded modifiers (not hidden rewrites):**
  - **Offensive focus:** first-class command/state (`preGameFocus`, `halftimeFocus`, `auto`, halftime-prompt toggle). CPU focuses random or coach-true-to-life (open). Affects play-calling/personnel weights and Priority projections; 4th-quarter automatics are situation rules with defined precedence (edge-case + precedence tests required).
  - **Form:** per-player form state updated by schedule/phase rules (Owner allows ~±5–6 OVR swing), surfaced as green/red arrow; effective ratings = base + form (+ allowed context modifiers) — but base/static measures and calibration targets remain referenceable. Reset/carryover/cadence = design details to propose, not assume.
  - **Synergy/gravity:** start as measurable projections (group composition effects, double-team/deterrence rates from play resolution/attribution) emitted into advanced stats; promote into outcome math only when validated (P-335). Avoid "gravity inside v" without a measurable estimator.
  - **Clutch:** state-conditioned narration/visual intensity and, if modeled, situation-conditioned variance/calling — but no per-player clutch metrics authored by Owner; calibration remains against aggregate distributions. Big penalties modeled/shown per P-354 direction (routine penalties off).

## 3. Multisport without premature abstraction — sport-pack boundary
**INFERRED rule:** abstract the *shape*, not the *sport*. Football remains the reference implementation.

- **Common kernel contracts (stable, small):** entities (Player, Team, RosterSlot/Role), commands/events, RNG/seed API, season/schedule primitives, save envelope/versioning, stats/record ledger, validation harness interfaces.
- **Sport Pack (football-specific today, swappable later):** roster schema & positions/dual-position rules, slot map & formation legality, rating attributes, play/possession grammar, scoring/clock rules, focus packages, penalty model, awards, calibration targets/datasets.
- **Portability test (design-time):** any kernel API that requires "down/distance/11 players/football snap" as a primitive belongs in the football pack; kernel speaks in generic phases/possessions/actions/outcomes with pack-provided semantics. Basketball becomes a second pack only after football gates are green; do not build a generalized simulation engine that fits no sport well.

## 4. Data, contracts, and persistence — make trust durable
- **Version everything that can change results:** `engineVersion`, `rulesetVersion`, `sportPackVersion`, `dataVersion` (dataset sha), `saveSchemaVersion`. Completed seasons/franchises are immutable snapshots (players/ratings/rules that produced them preserved).
- **Save safety (high-value, low-regret):** versioned envelope, schema validation on load, treat missing version as legacy v0 with migration path, corruption/quota handling, explicit autosave strategy, separation of global records vs save slots, migration/recovery tests. Keep adapter replaceable (localStorage now; IndexedDB only with evidence).
- **Canonical IDs and provenance:** stable player IDs, source attribution for ratings/data, reproducible build artifacts. nflverse/P-344 is a calibration/validation source (VERIFIED in queue), not a runtime dependency.

## 5. Validation as a first-class surface (Simulation Laboratory)
**INFERRED priority:** credibility comes from measured behavior, not elegant code. Build the lab as tooling around the same core/contracts.

- **Tiers:** (a) fast deterministic regression/unit/property invariants on every change; (b) seeded season batches and distribution checks; (c) nightly/large Monte Carlo calibration vs nflverse baselines (means/SDs, distributions/tails, conditional splits where modeled), out-of-sample/held-out seasons to avoid overfitting.
- **Invariant examples:** roster/slot legality, no player on two teams, valid scores/clocks/possession accounting, stats reconcile, draft order integrity, deterministic replay, engine-boundary/import rules, sport-pack (football) invariants.
- **Migration gates (P-342 spirit):** phase-appropriate totals/grammar/realism bars (Owner: ~10% general realism), distribution/shape gates when dispersion in scope, no regression on protected invariants. Old engine as oracle for plumbing/parity where useful, not for product truth.
- **Benchmark receipts per consequential engine change:** behavior changed, invariants affected, tests/benchmarks run, seeds/data/rules versions, determinism impact, save compatibility impact.

## 6. Platform/online future — design for it, don't build it
- **Authoritative model (long-term):** server runs core+orchestrator; clients send validated commands, receive state/events; server persists history/leagues. Boundary, serialization, versioning, deterministic replay make this possible.
- **Pre-design concerns:** idempotent commands, draft/league conflict resolution, snapshot + event replay, per-league isolation, compute off main thread (Web Workers) only when measured necessary.
- **Defer (free/simple constraint):** auth, DB, payments, realtime infra, multiplayer UX, cloud saves — until football product + reliability justify them.

## 7. Frontend/stack implications (subordinate to contracts)
- **Framework measured, not an identity (Owner: Svelte not a lock).** Consume the 4-prototype test (SvelteKit, React, Vue/Nuxt, SolidStart) against the **same engine contract**, shared acceptance tests, Playwright flows, and maintainability/change-amplification scoring (GPT/MUSE improvements). Do not let UI prototypes fork simulation logic. Svelte+Vite vs SvelteKit must be explicit for the Svelte path (current app is Svelte+Vite — VERIFIED in stack audit).
- **Tooling hygiene (staged, high leverage):** pin Node/toolchain, single lockfile per package, consistent lint/format/type/test commands, minimal CI (install+type+engine tests+build) then grow to boundary/determinism/browser smoke/nightly lab. Enforce engine-boundary imports mechanically once a rule exists.
- **AI-maintainability in UI:** data-driven definitions for focuses/rules/pickers, centralized precedence, no hard-coded counts — because 100% AI-written code and second-round changes are primary risks.

## 8. Phased roadmap (decision-aware)
- **Phase A — Stabilize the ground (now, parallel-safe):** confirm/freeze engine boundary rules; add save envelope version+legacy-v0 path; pin/reconcile toolchain facts; establish minimal CI and one-command verify per track; resolve Colors/Cakepanz authority (Owner decision, prerequisite for product UI bets). *Exit:* reproducible build/test/type/lint baseline, versioned saves, boundary check in CI or script.
- **Phase B — Core contract & strangler foundation (P-342 Phases 0–1 aligned):** codify serializable command/state/event contracts; land/verify deterministic RNG/clock discipline; implement play-level kernel skeleton + event log + parity/plumbing oracles against drive engine where scoped; instrument snap/usage/attribution hooks needed for focus/form/gravity. *Exit:* replayable simulations, contract tests green, measured parity/gap report.
- **Phase C — Football feature integration on the kernel:** offensive focus (pre-game/halftime/auto/4Q precedence) as commands affecting Priority+simulation; form arrows/state; group synergy and gravity projections into advanced stats; clutch narration/visual hooks; big penalties in clutch windows (P-354) — each behind fixtures/invariants. *Exit:* Owner-visible behaviors correct, deterministic, covered by acceptance tests.
- **Phase D — Calibration, lab, and credibility:** nflverse-driven baselines, distribution/conditional validation, sensitivity (λ, focus, form), regression lab; tune/accept model changes only with benchmark receipts. *Exit:* documented realism envelope and stable regression suite.
- **Phase E — Productization and platform readiness:** framework decision applied to chosen track, persistence hardening, performance profiling (Workers only if needed), static deploy hardening; extract clean server-invokable command API (no server required yet). *Exit:* shippable football app + server-ready core package boundary.
- **Phase F — Expansion (deferred, gated):** authoritative multiplayer/server, cloud/historical DB only when justified, basketball as a second sport pack, and only then evaluate "simulation-design platform" generality. *Exit criteria set by Owner, not assumed.*

## 9. Key risks and mitigations
- **λ/parameter identification & overfitting (KNOWN, queue):** separate estimation protocol (multi-gap/β, frozen θ provenance), hold-out validation, report uncertainty; never fit to vibes.
- **Play-level rebuild breaks calibration:** strangler + oracle + phase gates + invariant suite; migrate capability by capability.
- **Dynamic features erode static truths:** enforce "Wins static, Priority dynamic, flex consistent" as contract tests and UI guards.
- **Boundary erosion by agents:** mechanical import/boundary checks + small diffs + contract tests + change reports (behavior, invariants, determinism, saves).
- **Premature platform/generalization:** sport-pack boundary, defer infra, no DB/auth/multiplayer until earned.
- **Unclear authority of tracks/docs:** resolve Colors/Cakepanz first (Owner), keep one authoritative doc per concern, treat queue/inbox as live.

## 10. Decisions this plan depends on (Owner/council, not assumed)
- Primary product track and integration path (Colors vs Cakepanz vs deliberate merge).
- Framework/app-framework outcome (and SvelteKit vs Svelte+Vite for Svelte path).
- Focus details: auto-selection policy, halftime-prompt toggle location, CPU focus realism vs random, focus as team identity scope in UI.
- Form details: reset/carryover, update cadence, matchup/big-game sensitivity bounds (within Owner constraints).
- Gravity/synergy: metric definitions and when they influence outcomes vs remain observational.
- Save schema/versioning policy and migration guarantees.
- CI/lab minimum fitting free/simple constraint.
- λ objective/display and per-slot C>OG (open per queue) — valuation choices that must feed the same contracts, not be conflated with architecture.

**Quality bar:** every phase produces (1) a runnable, tested artifact, (2) a receipt (commands/results, versions/seeds), and (3) an explicit statement of determinism/save/contract impact. Architecture choices that cannot be enforced or measured are treated as proposals, not truth.

## Weakest points / review asks (explicit)
- **Risk:** this plan assumes P-342 event-sourced/strangler direction is the right vehicle; if Phase 0/1 receipts show the chain-length/calibration gaps are structural, the kernel decomposition may need revision (calibration question).
- **Not run:** no code/prototype executed for this filing; no verification that existing Colors interfaces already satisfy the proposed command/event contracts (UNKNOWN without inspection).
- **Possible duplication:** other seats may file overlapping overarching plans to the same Owner prompt — reviewers should compare and synthesize rather than treat this as authoritative.
- **Detail debt:** form reset/carryover, CPU focus selection, and gravity estimators are intentionally left as design questions requiring Owner/council decisions, not solved here.
