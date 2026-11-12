# Council — the platform vision: what the project could become, and what to think about

**From:** MUSE, High Councillor. **Date:** 2026-11-12. **FOR:** the platform vision / architecture.

## §0 — Who this is for, and what "done" is

This is a **think / discussion round**, not queue work. It is for any seat
that wants to think about it — no named assignees, per house rules; an
invitation, not an order. Done = **one inbox filing per seat** with your
positions and proposals, labelled (VERIFIED / REPORTED / INFERRED / UNKNOWN),
pushed to your branch. No deadline; the custodian sorts. Disagreement is the
point. Do not review each other's filings in this round; do not take queue
items in it.

**The vision (the Owner, standing, 2026-11-12):** css libraries, frameworks,
bundlers, cdns, compute, databases, deployment are **all up in the air** right
now. Anyone can make a strong recommendation for something new as the vision
of the project grows. Assume the project could grow beyond a solo, local-first
football simulator into a **substantial online sports-gaming platform**. The
frameworks on the table are **Svelte, React, Vue, and Solid** (and
**SvelteKit, Next.js, Nuxt, and SolidStart**). Svelte is **NOT** a lock.

## §1 — The verbatim file (read it first)

The full text is at
`_agents/owner-notes/2026-11-12-platform-vision-and-architecture-verbatim.txt`
— KG's message plus the GPT assessment he relayed, recorded verbatim. Read
it before filing. In brief, it contains:

- **KG's framing:** the up-in-the-air stack; the frameworks on the table; six
  architecture questions (is the engine independently testable? can the
  simulation run independently of the user's browser? is multiplayer state
  authoritative on the server? can the database preserve historical franchises
  and seasons? can the application handle many concurrent leagues? can the
  architecture accommodate basketball without duplicating the entire system?);
  the 10,000-users-in-online-leagues vision (the frontend does not simulate
  all those games or coordinate all those users — the backend manages leagues,
  stores results, coordinates drafts, and invokes the simulation engine); the
  server-ready principle (already recorded); the linter question; the "which
  framework lets AI agents build, understand, modify, and maintain this
  product most reliably?" question; the "valuate" metrics (change
  amplification); the GitHub Actions pipeline (8 steps + the nightly
  simulation lab); the accounts/multiplayer/centralized-services section; the
  "AI will be writing 100% of the code — does that change any preferences?"
  question; and the sophisticated player-database example.
- **GPT's assessment (§§1–10):** the framework experiment improvements (A–E:
  separate framework from engine performance; a deliberate edge-case test;
  make the second-round change test data-driven design; standardize the
  experimental environment; a test of agent maintainability); the architecture
  (the server-ready principle as an enforceable rule; the engine/application/
  platform boundary; the prohibited-dependencies table; the five requirements
  — explicit time and randomness, versioned rules, versioned data,
  deterministic replay, serialization); localStorage vs IndexedDB (keep the
  adapter; add versioning, validation, migration, error handling, recovery,
  and a deliberate save strategy); Node's built-in test runner (keep it;
  separate the validation layers; Playwright for UI integration tests); no
  GitHub Actions (the most obvious immediate weakness; the CI pipeline + the
  nightly lab + simulation invariants); the Vite 8 vs 7 difference (track it;
  record toolchain versions; investigate React in Colors); the simulation
  laboratory (three types of testing — software correctness, football realism,
  balance and game design — and a repeatable benchmarking system); the scoring
  framework (weighted, correctness as a pass/fail gate, human interventions
  recorded separately, change amplification); the priority roadmap
  (1. framework experiment now; 2. CI high priority; 3. enforce engine
  boundaries high priority; 4. strengthen persistence medium; 5. simulation
  laboratory medium-term; 6. multi-sport boundaries longer-term); and three
  additional ideas (engine contract tests shared by every frontend; an AI
  change-report protocol; a sport-independent application shell, not a
  sport-independent simulation engine).

The framework-test design has already been updated with GPT's improvements
A–E, the weighted scoring, change amplification, the contract tests, and
Playwright (`framework-test-dynamic-feature-2026-11-12.md`). This round is
about everything else in the verbatim file.

## §2 — The questions

**Q1 — The six architecture questions.** Answer each one, with evidence, not
just an opinion: is the simulation engine independently testable (today — what
would you run to prove it?); can the game simulation run independently of the
user's browser (today — what would break if you ran it in Node, or on a
server?); is multiplayer state authoritative on the server (what would that
require — what is the command, what is validated, what is returned?); can the
database preserve historical franchises and seasons (what is the shape — what
is stored, what is versioned?); can the application handle many concurrent
leagues (what is the bottleneck — the engine, the database, the draft room?);
can the architecture accommodate basketball without duplicating the entire
system (what is shared, what is sport-specific — and where is the line?).
Name the concrete change each answer implies, or say honestly that the
question cannot be answered yet and what would answer it.

**Q2 — The AI-writes-100%-of-the-code question.** "Consider the fact that ai
will be writing 100% of the code. does that change any preferences for css
libraries, frameworks, bundlers, cdns, compute, databases, deployment?" Does
it? For each layer (css, framework, bundler, cdn, compute, database,
deployment), say whether AI authorship changes your preference and why — or
whether it does not. Be specific: name a library, a framework, a bundler, a
database, a deployment target, and say what an AI agent does better or worse
with it than a human would. (The linter question is answered in §1 below —
Biome in Colors, nothing in Cakepanz, nothing enforced — but the *preference*
question is still open: what *should* the lint/format/type-check setup be,
given AI authorship?)

**Q3 — The CI pipeline and the nightly lab.** GPT's pipeline (8 steps: pinned
lockfile install, format/lint, TypeScript type checking, Svelte diagnostics,
engine unit tests, determinism/regression tests, production build, browser
smoke tests) + the nightly simulation lab (thousands of seasons, roster and
draft invariants, statistical distributions, historical baselines, flag
unexpected changes). Propose the concrete shape: which workflow file, which
jobs, which commands, what runs on every pull request vs nightly, what is
required before merging, and what the lab reports. Name the invariants (the
"must always be true" rules — a team cannot exceed the permitted players at a
position, a player cannot belong to two teams, a completed game must have a
valid final score, statistics must reconcile, draft picks must follow the
draft order, a season cannot award a player an award twice, age and
development must follow valid constraints — or better ones). What is the
smallest version of this pipeline that is worth building first?

**Q4 — The simulation laboratory.** Three types of testing — software
correctness, football realism, balance and game design — are three different
questions. Propose the benchmarking system: what does it run (how many
seasons?), what does it compare against (which NFL reference distributions —
name them), and what does it report when an agent changes the engine (which
metrics move — passing attempts, completion percentage, explosive plays,
scoring, win distributions, positional production)? Should an agent proposing
an engine change be required to attach a benchmark report? What is the
smallest version worth building?

**Q5 — The engine boundary, enforced.** GPT would make the engine's
independence an enforceable architectural rule, not just a written
instruction, and would prohibit inside the engine: `window`, `document`,
`localStorage`; UI component imports; framework-specific stores;
`Math.random()`; `Date.now()` and implicit clock access; network requests;
direct database access. Propose how to enforce it: a dependency-boundary
check (what tool, what rule, where does it run?), tests that fail if a
prohibited import appears, and the five requirements (explicit time and
randomness; versioned rules; versioned data; deterministic replay;
serialization). Where does the engine currently violate the boundary (name
the files)? And what is the application-layer / platform-interface split —
what belongs in the application layer (franchise management, draft workflows,
user actions, season orchestration, state transitions) vs the platform
interfaces (browser: Svelte UI, local storage, browser workers; server:
accounts, database, league coordination, authoritative simulation)?

**Q6 — Persistence.** Keep the localStorage adapter, but add: a version
number on every save; validation when loading; a safe migration mechanism;
error handling when storage is unavailable or full; a recovery mechanism if a
save becomes corrupted; a deliberate save strategy rather than writing huge
objects repeatedly. Propose the shape (what the version looks like, what
validation checks, what migration does, what recovery does). Test what happens
when a save is interrupted or the user opens two tabs with the same franchise.
When *should* the project migrate to IndexedDB — what data volume or
functionality justifies it (name the threshold, not just "when it's bigger")?

**Q7 — Multi-sport boundaries.** GPT's idea C: a sport-independent
application shell, not a sport-independent simulation engine. Football and
basketball have fundamentally different rules, event structures, player
attributes, and statistical models — so share application infrastructure
(save management, franchise navigation, user preferences, history
presentation, common data visualization) while allowing football and
basketball to have independent domain engines. Propose the split: what is
shared, what is sport-specific, and where is the line? And what would you
*not* share (where would premature abstraction hurt)?

**Q8 — The AI change-report protocol.** Whenever an agent modifies engine
logic, require it to report: what behavior changed; which invariants could be
affected; which tests were added; which benchmarks were run; whether any
historical simulation results might change; whether the change affects
deterministic reproducibility. Propose the protocol: where does the report
live (a filing? a section in the review? a file in the repo?), who checks it,
and what happens if it is missing? Is this worth requiring now, or after CI
exists?

**Q9 — The React-in-Colors question.** GPT asks Claude to explain exactly why
React 19 is a dependency in a Svelte project: which files import React? Is
React used at runtime? Is it required by a testing or prototyping tool? Is it
part of the production dependency graph? Does it end up in the production
bundle? If it is genuinely needed for an isolated adapter, fine; if it is
leftover from experimentation, remove it. (This is a question for Claude, via
his prompt — but the council should say what the answer would change: if
React is in the production bundle, does that affect the framework test? If it
is leftover, who removes it?)

**Q10 — What else?** The verbatim file is long. Name anything in it that
these questions missed — a recommendation you disagree with, a question you
think is the wrong question, or a consequence nobody named. The Owner's
question, in his words: the project could grow into a substantial online
sports-gaming platform — what does that change about how we build it now?

## §3 — How to file

One inbox filing per seat: `inbox/<UTC yyyymmdd-hhmm>-<seat>-platform-vision-<slug>.md`,
first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then
`FOR: P-345`. Label every claim (VERIFIED / REPORTED / INFERRED / UNKNOWN).
Push often — commit and push after every finished file, not just at session
end. No reviews of each other's filings in this round. Do not take queue items
in this round; the custodian sorts.

**The linter answer (MUSE, VERIFIED 2026-11-12, for the record):** yes, there
is a linter — **Biome**, entry point `node tools/lint.mjs` (AGENTS.md §9);
the product lint uses `tools/biome-product/biome.json`, the tooling uses the
root `biome.json`. But it is **not consistent**: 67 Cakepanz has **no** Biome
(or eslint/prettier) setup and no lint script, and there is **no CI** to
enforce linting anywhere, so it is voluntary/manual. The question in Q2 is
what the setup *should* be.

## §4 — Bounds (do not re-decide these)

- **Svelte is NOT a lock** (the Owner, 2026-11-12). The framework is open;
  the framework test will inform the choice. Do not present Svelte (or any
  framework) as decided.
- **The server-ready engine principle (the Owner, standing, 2026-11-12):**
  "design the simulation engine as if it will eventually run on a centralized
  server, even though it currently runs locally. That means keeping the engine
  independent of browser APIs, UI state, local storage, and framework-specific
  code. It should accept defined inputs and produce defined outputs. Later,
  you can run that same engine on a server and have multiple users interact
  with it." Every proposal must keep the engine server-ready.
- **Everything is up in the air** (css libraries, frameworks, bundlers, cdns,
  compute, databases, deployment) — propose freely, but ground the proposal
  in evidence or a concrete design, not just a preference.
- The user sees only Wins, Priority, OVR, with consistency. The λ objective
  is NOT decided (the binary is false). No injuries in any sport. Flex values
  stay consistent through the year. Calibration targets stay static. Ratings
  are the Owner's alone. Basketball is design-only until football is done.
  The wasted-capability term is not to be promoted.
- The framework test is a separate, live document
  (`framework-test-dynamic-feature-2026-11-12.md`, already updated with GPT's
  improvements A–E) — this round is about everything else in the verbatim
  file, not re-designing the test.

## §5 — Innovate

This is an innovation round — the job *is* to think. If a question as written
is the wrong question, say so and say what the right question is. If a
recommendation in the verbatim file is wrong, say so and say why — GPT's
assessment is input, not a decision. The most useful filing is not the one
that answers every question — it is the one that names the architectural
decision nobody else saw, or the consequence nobody else named, or the
smallest version of a big idea that is actually worth building first. Think
around the issue. Create new ideas. The Owner is fine with new features — and
with new architecture, as long as it is grounded.
