SPEAKER: Z.ai | ROLE: High Councillor · Executor of Z-post-blue and 67 Cakepanz | TASK: platform-vision round (Q1–Q11) + the overarching multisport engine plan | DATE: 2026-11-13

FOR: the Owner (KG) · the platform-vision round (open, no deadline) · P-345 (dynamic engine) · the multisport build

**Batch note (standing rule):** this sandbox cannot push (no credentials, no `gh` — VERIFIED today). Per my seat file §5.6 the work reaches GitHub as one zip handed to the Owner. MUSE: please file this document at `inbox/20261113-0124-zai-platform-vision-multisport-plan.md` on `council/muse`.

---

# Z.ai — the overarching plan for the multisport engine build

*The platform-vision filing and the build plan in one document. Claims are labelled: VERIFIED (I checked it today, with the command or file), VERIFIED-BY-MUSE (in the stack audit, spot-checked by me where marked), REPORTED (said in project documents; I did not re-verify), PROPOSAL (my recommendation, not a decision), UNKNOWN.*

---

## §0 — What this document is

The Owner asked me to take the time and truly think: improve the overarching plan for the new multisport engine build, with no rush. This is that document. It does three jobs at once:

1. It is my **platform-vision round filing** (Q1–Q11 answered where they fall in my lane).
2. It is the **overarching plan** the Owner asked for: the architecture, the build order, and the decision gates for the multisport engine build.
3. It is a candid review of GPT's assessment and MUSE's audit — what I adopt, what I extend, what I push back on. GPT's assessment is input, not a decision, and some of it can be made stronger and cheaper than he proposed.

One sentence up front, because everything else hangs on it: **the project needs one architectural decision made well — the seam between the simulation engine and everything around it — and every other decision (framework, CSS, CI, database, basketball) becomes easy or at least reversible once that seam is real, enforced, and proven by an artifact that already exists in the repo.** The artifact is the ZAI-D1 flex formula. I will show how it becomes the proof.

## §1 — Boot report (the mechanical part, one section so the Owner can skip it)

- **Boot clone:** done. Shallow clone of `kozikosi/Football-Sim`, branch `council/muse`, tip `35e841d` (the stack-audit push MUSE reported). VERIFIED.
- **START-OF-CHAT-ZAI.md:** read from `council/muse` as directed, not from the frozen `council/zai` copy. The old branch tip is `25e3b2f9` (w55) — confirmed frozen; I used it only to verify the warning, not for state. VERIFIED.
- **Wave check (my seat file §3):** `origin/gh-pages` tip is `3e69567` — "Publish w89 as live index". **w89 is live and matches the §2 baseline.** No catch-up needed. VERIFIED by fetch.
- **bootstrap.sh:** does not exist. I searched `council/muse` (full tree), and checked `council/zai` and `council/glyph` tips. The only matches are a `BOOTSTRAP.md` at repo root on the frozen branches — an OpenClaw "birth sequence" ritual file (pick a name, pick an avatar) that is harness residue, not project tooling. Its own text says the user's request comes first if there is real work, so I followed it in the only sensible way: I skipped the ritual and did the work. VERIFIED.
- **Push access:** not possible from this sandbox, and my seat file already rules on it: "Never `git push`. It hangs (no credentials). Local work + zip instead." There is no `gh` CLI here (VERIFIED: command not found), and I will not work around a credential boundary. The zip in this delivery is the push. If the Owner wants this seat to push directly someday, that is an Owner-side decision (a fine-grained token scoped to `council/*` branches, installed where I run) — PROPOSAL, and it changes nothing about the work below.
- **Read for this filing:** the four uploads (the questionnaire verbatim, the four audit deliverables, the 25 priority answers, the GPT review brief), the framework-test design at tip, the dynamic-engine prompt (D.1–D.9), the multisport prompt, the platform-vision round prompt, QUEUE.md top, and spot-checks on `architect/engine-and-seats` tip `bebe8e0b` (React `^19.3.1` + `react-dom` in `colors/package.json` with the "used only by the UI adapters" description; `colors/src/core/keyedrng.ts`; `colors/src/platform/localstorage.ts`; golden fixtures under `colors/test/nfl/golden/`; zero `.github/workflows` files; zero `.svelte` files in Colors). All VERIFIED today.

## §2 — Where I stand (candid, seat against seat)

**Where I agree with GPT, and will not relitigate:** the two-category split of the framework test; the edge-case precedence test; the data-driven second-round change; the standardized environment record; the maintainability test; correctness as a pass/fail gate; the prohibited-dependency list for the engine; CI as the most obvious immediate weakness; the simulation laboratory's three types of testing; keeping Node's test runner and localStorage-for-now; the change-report protocol. These are all correct and most are already folded into the framework-test design at tip (I read it — A–E are in).

**Where I extend GPT (he gave the principle; here is the mechanism):**

1. **The engine boundary should be enforced by a test, not only by a lint rule.** GPT proposes prohibiting `window`, `document`, `localStorage`, `Math.random()`, `Date.now()`, network, database inside the engine — right list. But a lint rule is a scan of text; the stronger and cheaper enforcement is a **purity harness**: a Node test that replaces every one of those globals with a function that *throws*, then imports the engine and simulates a full season with a fixed seed. If anything inside the engine touches a browser API, the wall clock, or ambient randomness, the test fails with a stack trace pointing at the file. No new dependency, no monorepo restructure, runs in CI in seconds. PROPOSAL — I detail it in §3.
2. **The lab's version comparison should use paired seeds, not two independent batches.** If engine A and engine B each simulate N seasons with *different* random draws, most of the difference you measure is noise. If both simulate the **same seed set**, the comparison becomes paired: for each seed you have (A_result, B_result), and the paired deltas isolate what the engine change actually did. This is the single cheapest way to make "did my change make the sim better or just different?" answerable, and it falls out of the determinism we already require. PROPOSAL — §8.
3. **GPT's "sport-independent application shell" is right but names the wrong seam.** Save management, navigation, and preferences are UI-level; the seam that decides whether basketball is a second product or a rewrite is one level deeper: **the season/franchise layer** (league structure, calendar, rosters, draft, stats aggregation, awards, saves) is nearly universal across sports *as data shapes*, while the game simulation is irreducibly sport-specific. The plan in §5 splits there: one declarative **Sport Pack** per sport feeding a shared season shell, one game engine per sport behind a single narrow interface. And we extract that seam **when the second sport forces it**, not before — GPT's own anti-premature-abstraction rule, applied to his own idea.
4. **The framework test has an incumbent-bias flaw (D2).** The current app is Svelte + Vite; the test's Svelte arm is SvelteKit (VERIFIED from the audit and the test design). So the test as designed can produce "React wins over SvelteKit" while saying nothing about the incumbent, and a SvelteKit win would mean a migration, not a confirmation. My recommendation as the seat who will build all four arms: **five arms** — SvelteKit, **Svelte+Vite**, React, Vue/Nuxt, SolidStart. The Svelte+Vite arm is the cheapest to build (I know the stack; it is 67 Cakepanz's stack) and it is double-use: its output is a working offensive-focus reference implementation that could become the real feature regardless of the test's outcome. §6.
5. **The test needs an anti-gaming protocol.** GPT offered to find how an agent might game the comparison; since I am the agent being measured, I will supply the checklist myself (§6.4) — engine-logic copy-paste, hardcoded focus lists, Playwright selectors tuned to the spec's example values, a state library papering over state bugs, determinism quietly disabled for speed. Plus one new metric: an **engine-leakage scan** (grep each prototype for engine-internal imports and duplicated engine logic; must be zero beyond the public API).

**Where I disagree or would slow down:**

1. **GPT's priority roadmap puts the framework experiment first and CI second.** They do not compete — CI protects everything while the experiment runs, and the experiment's four (five) builds are exactly the kind of unverified work CI should watch. I would run them concurrently: the minimal CI (§7) is a few hours of work, not a project.
2. **I would not adopt "AI change-report protocol" as new bureaucracy.** The receipts culture already exists (my seat rules require run-checks receipts; MUSE's draft agent rule 4 says the same). The protocol should be **six extra lines in the existing receipt**, not a separate document and not a new review stage. §12.
3. **GPT's §10C warning against a giant generalized simulation engine is correct and I would make it stronger:** not only should football and basketball not share one engine — they should not share a *rule representation*. The moment someone designs a universal "rule DSL" that both sports express, we have built a programming language nobody asked for. Shared = data shapes and infrastructure; sport-specific = all semantics. §5.6.
4. **One caution to the Owner, offered plainly:** the platform vision ("a platform to design your own simulation, starting with sports but potentially anything with similar attributes") is the right north star, and it is also the easiest way to lose the football product. The guardrail that keeps both is: **the platform is a data-shape generalization, never an infrastructure expansion.** Every step of the multisport plan below adds zero servers, zero paid services, zero new frameworks — it reshapes data and extracts code that already works. If a proposed platform step needs infrastructure, it goes to the back of the queue.

## §3 — The seam: one decision, made enforceable

The Owner's server-ready principle (standing, 2026-11-12) is the most important sentence in the project. Here is how it becomes law instead of prose, in four moves — all of them small, none of them a rewrite:

**3.1 — The purity harness (PROPOSAL).** One test file in `colors/test/` (and later the pack/season layer):

```
test/purity/purity.test.ts
  - beforeAll: replace globalThis.window/document/localStorage/fetch/
    XMLHttpRequest/WebSocket/Date.now/Math.random with () => { throw ... }
  - run: one full seeded season through the public engine API
  - assert: no throw; assert the season's event-log checksum matches the golden value
```

The golden checksum doubles as the determinism regression test. Two tests, one file, zero dependencies, and it fails loudly the day someone imports a browser API into the engine. This also answers GPT's §6 point about `--experimental-strip-types` not being type-checking: purity and determinism are runtime properties, and this is the runtime test for them.

**3.2 — The import gate (PROPOSAL).** A grep gate is enough at this scale; a dependency-cruiser config is not needed yet. CI step: fail if any file under the engine directory imports `svelte`, `react`, `vue`, `solid-js`, `$./*` stores, or matches `Math.random|Date.now|new Date|localStorage|window\.|document\.`. Start it as *report-only* for one week (to surface current violations honestly — UNKNOWN today: no automated scan has ever been run; P-030 in the queue is exactly this inventory and it is still OPEN), then flip to *fail*.

**3.3 — Commands in, results out (PROPOSAL).** Define the engine's public surface as serializable command objects — `DraftPick`, `SetFocus`, `AdvanceWeek`, `SimulateGame` — each validated, each producing a result object and an event-log append. The UI calls commands today; a server would validate and execute the same commands tomorrow. This is the whole multiplayer story compressed into the shape the engine already wants, and it costs almost nothing to adopt incrementally: every new feature that enters through a command object is automatically server-ready.

**3.4 — Versioned rules and versioned data (PROPOSAL).** Two integers, stored where they are consumed: a `rulesVersion` stamped into every completed season's snapshot, and the dataset SHA-256 the save envelope already carries (VERIFIED-BY-MUSE, `localstorage.ts`) promoted to a first-class field. A completed season must forever answer "which rules and which data produced these results" — that is the historical-franchises promise in the Owner's question list, and it is two fields.

## §4 — The six architecture questions, answered with today's evidence

The Owner asked these; the platform-vision round formalized them as Q1. Direct answers, each with what it implies.

**Q1a — Is the engine independently testable today?** **Yes for the Colors engine — provable in one command.** Evidence: `colors/test/` runs under Node's test runner with golden fixtures (`matchup-precolors.json`, `teamPacks.w54.json` — VERIFIED at `bebe8e0b`), the keyed RNG is Philox2x32 with the published Random123 multiplier (`0xd256d193`, VERIFIED-BY-MUSE), and the Lab has run seeded seasons outside any browser. What is *not* yet true: no single one-command entry point (`npm test` in `colors/` is it, but the 2 pre-existing failures are unresolved), and no purity/determinism gate (§3.1). Implication: reconcile the baseline to green-or-documented, add the purity harness — then the claim "independently testable" is a CI fact, not an assertion.

**Q1b — Can the simulation run independently of the browser?** **Yes for the engine, no for the app — and that is the correct split.** The engine already runs in Node (the Lab does it). What is browser-bound is the application layer: localStorage, UI state, the Cakepanz app shell. Implication: nothing to fix in the engine; the work is keeping the *app* layer's dependencies pointing outward (§3.3 commands).

**Q1c — Is multiplayer state authoritative on the server?** **There is no multiplayer; the design question is whether today's code would allow server authority. Answer: it will, if we adopt §3.3.** The server-authoritative shape is exactly: client sends a command → server validates (legal pick? your turn? roster legal?) → server executes engine → server appends the event → all clients render the event log. Nothing about the local-first product changes; the command objects are the same objects the UI dispatches today. Implication: adopt the command pattern incrementally now; build no server. The command log (§9.2) is the on-ramp.

**Q1d — Can the database preserve historical franchises and seasons?** **The shape that preserves history is snapshot + log + version stamps, and it fits a document/SQLite-style store trivially later.** What must be true *now* is not a database: save versioning, the dataset pin (exists), `rulesVersion` (§3.4), and historical snapshots that carry the ratings a season was played with (the P-217 pin — REPORTED, recorded decision). When a store is actually needed (multiplayer or cloud saves), D1 (Cloudflare's SQLite) fits the free-tier constraint and this shape; deciding it now would be premature. Implication: §9.1 safeguards now; database = deferred with a named trigger.

**Q1e — Can the application handle many concurrent leagues?** **The engine is not the bottleneck — it is stateless and seeded, so concurrency is embarrassingly parallel. The bottleneck is coordination state: draft rooms, turn timers, presence.** That is real-time infrastructure, and it is the *last* thing to build, not the first. Implication: keep league state as replayable logs so any future coordinator is a thin shard over them; do nothing else today.

**Q1f — Can the architecture accommodate basketball without duplicating the entire system?** **Yes — if the duplication line is drawn at the season layer, not the UI.** Answered fully in §5; short version: share the season shell via a declarative Sport Pack; never share the game engine; extract the shared kernel when basketball's design forces the extraction (the rule of two).

**The 10,000-user thought experiment** (the Owner's framing): the frontend does not simulate 10,000 leagues — correct, and the architecture above is what makes that true rather than aspirational. Today's stack serves it as follows: static frontend (gh-pages now, Cloudflare Pages when the Owner wants it), engine as a pure library callable from anywhere, commands as the API surface, logs as the storage shape. The only pieces that do not exist yet are the coordinator, the account system, and the store — and each has a named trigger. Nothing in the current plan forecloses them; nothing in the current plan builds them.

## §5 — The multisport engine build: the plan proper

### 5.1 Principles (the short list I will actually follow)

1. **Football is the product; multisport is the shape.** No basketball build until the standing bound lifts (the Owner: basketball is design-only until football is done; the multisport prompt: "not built until 76 Pancakes is finished and the repo is moved" — REPORTED, quoted verbatim).
2. **Extract, don't preempt.** The shared kernel is extracted from football's working code at the moment basketball's design forces it — never authored as an abstraction first.
3. **Data shapes travel; semantics do not.** What generalizes is *shape*: positions × duties matrices, slot values, roster rules, a calendar, a stats schema, an awards list. What never generalizes is *meaning*: what a "drive" is, what a "foul" is, what a rating means.
4. **The user-visible contract is per-sport.** The Owner's display law (user sees Wins/Priority/OVR with consistency) is a football ruling; each sport defines its own visible contract inside the same machinery.
5. **Zero new infrastructure at every step.** If a step needs a server, a database, or a paid service, it is out of order.

### 5.2 The shape

```
app shell (per framework decision; navigation, save mgmt, presentation, prefs)
     │
season shell  ← consumes a Sport Pack (declarative, per sport)
     │            league structure · calendar shape · roster/slot rules
     │            draft procedure · stats schema · awards list
     │            flex-formula inputs (duties, HAVE, NEED)
     │
game engine (per sport, NEVER shared)
     football: drives → plays, event log, box score
     basketball: possessions → events (design only)
     interface: simulateGame(input, seed) → { eventLog, boxScore }
     │
kernel (extracted at the rule-of-two moment, from working code)
     seeded RNG streams (Philox2x32 keyedrng — already sport-blind)
     event-log format · pack schema · the flex formula · clock
```

### 5.3 The Sport Pack manifest (v0)

PROPOSAL. One JSON/TS document per sport, consumed by the season shell. Football's pack is **extracted from the existing engine tables** (slot values, the 99 flex rules, roster rules, the 17-game calendar, the awards list) — extraction, not invention. Basketball's pack v0 already has a seed: my NEED/HAVE duty-matrix sketch from the multisport job (rim protection, ball handling, 3PT shooting, perimeter defense, rebounding, playmaking, finishing, help defense, off-ball movement, post scoring, free throws — plus whatever my full filing adds).

Manifest fields (v0, deliberately minimal):

| Field | Football example | Generalizes? |
|---|---|---|
| `positions[]` | QB, RB, WR1–3, TE, OT, OG, C, EDGE… | yes |
| `duties[]` | PBLK, CARRY, COVERAGE, RUSH… | yes (per-sport vocabulary) |
| `haveMatrix[positions × duties]` | C PBLK 6 (post-KG-feedback) | yes — the ZAI-D1 input |
| `needProfiles[slots × duties]` | WR1 NEED profile | yes — the ZAI-D1 input |
| `rosterRules` | 32 rounds, slot counts | parameterized |
| `draftProcedure` | snake, fixed pool | parameterized (NBA = lottery, later) |
| `calendarShape` | 17 games + playoffs | parameterized |
| `statCategories` | passing yards, sacks… | per-sport, schema shared |
| `awards[]` | MVP, Coach of the Year… | yes |
| `displayContract` | Wins / Priority / OVR | per-sport ruling |

The Owner's platform concept (Q11: "a platform to design your own simulation… anything that requires similar attributes") **is** this manifest, eventually surfaced as an editor. The smallest version worth building first (Q11's explicit ask): **a read-only pack viewer plus live tuning of the weights the flex formula reads** — the Owner moves a duty weight, the draft board's Priority column re-derives, the season re-simulates. That single screen proves the platform idea end-to-end with no new infrastructure, and it is genuinely useful to the football product today (it is the Lab's λ/slot-value work made visible).

### 5.4 The flex formula is the first kernel resident — proof by artifact

The Owner chose ZAI-D1 as the leading flex-price derivation *because its logic generalizes to multisport* (REPORTED — the multisport prompt records exactly this). That makes it the right artifact to anchor the seam: it already consumes exactly the data shapes that generalize (duties, HAVE, NEED, slot jobs), it is already verified against the Owner's 99-rule table at 98/99 with the KG score corrections (REPORTED — MUSE re-ran it; my re-verification and the C>OT proposal are due as filings), and basketball is its second client. When the season shell reads the pack, the flex formula reads the pack — same document, no special case. The kernel's first resident is thus not a designed abstraction but a *promoted, working formula*. That is the whole method of this plan in miniature.

### 5.5 Basketball v0: what can be designed now, what waits

Now (design filings, no code): the duty set and HAVE/NEED matrices (my assigned sketch, in progress); which football concepts have no basketball equivalent (fouls/earn-rate and the possession clock — likely; suspended play-stoppage modeling) and which basketball duties have no football analogue (free-throw generation as a duty rather than a stat — a candidate); where the λ combination logic bends when positions are fluid (basketball "positions" are role distributions, not platoons — the NEED profile becomes a blend, which the formula survives but the measurement needs care).

Waits (hard bounds): the game engine, ratings, schedules, the pack *build* (vs sketch), any UI beyond the shell proof. The shell proof when the bound lifts: one shared screen — franchise navigation — consuming two packs on fixture data. That is the demonstration that duplication was avoided, and it is small.

### 5.6 What we do NOT generalize (the list GPT asked for)

Box-score semantics; the event model (drives/plays vs possessions); rating *semantics* (what OVR means per sport — the formula's scale travels, the meaning does not); schedule logic; the draft's values (lottery ≠ snake); penalties/fouls; anything inside `simulateGame`; and above all **no universal rule language** (§2, disagreement 3). Also: no `Sport` base-class hierarchy, no plugin runtime, no config-driven gameplay DSL. If the pack manifest grows a `rules` field with executable semantics, that is the smell of the premature abstraction and the plan has failed at that point.

### 5.7 Build order (phases, gates, and what each unlocks)

| Phase | Work | Gate to exit | Unlocks |
|---|---|---|---|
| 0 | Framework test frozen and built (§6) — concurrent with Phase 1 | Results filing REVIEWED; Owner decides framework | The shell that hosts everything below |
| 1 | Minimal CI + purity harness + import gate (report→fail) + baseline reconcile (318/320) | CI green on all branches; purity test in CI | Trustworthy changes; the boundary is law |
| 2 | Persistence v1 (§9.1); engine contract tests as shared fixtures | Save round-trip + migration tests green | Safe franchise data; prototype-contract reuse |
| 3 | Football dynamic engine v1: focus, form arrows, 4th-quarter automatics (D.1–D.3 designs → builds after Owner approval) | Lab compare shows no distribution regressions; receipts complete | The feature that the framework test prototyped ships |
| 4 | Lab v1 (§8): bench + invariants + paired-seed compare vs P-344 cuts | Nightly lab report exists in CI | Objective engine-change evaluation |
| 5 | Season-layer extraction review: define the pack schema FROM the football code; promote the flex formula into the kernel | Pack extraction compiles; football behavior byte-identical (paired seeds) | The seam is real |
| 6 | Basketball pack v0 + shell proof (when the standing bound lifts) | One shared screen renders both packs | Multisport architecture proven |

Phases 1–2 are small and can start immediately regardless of the framework outcome — that is deliberate: the seam work is framework-independent, which is the entire point of the seam.

## §6 — The framework test: my build protocol (I am the executor)

The design at tip is good. Five additions from the seat that has to make it real:

**6.1 — Freeze the engine contract first (half a day, before any prototype).** One page: the typed input (roster, focus enum, game context, seed), the typed output (event log, box score, Priority recompute), and the golden expected outputs for three fixture games. Every prototype consumes the identical fixture set. Without this, the "integration" metric measures improvisation, not framework.

**6.2 — Resolve D2: five arms (PROPOSAL).** SvelteKit, **Svelte+Vite (the incumbent)**, React (Vite, explicitly — the design leaves this open), Vue/Nuxt, SolidStart. The incumbent arm is double-use: its output is the offensive-focus reference implementation. If the Owner wants four arms only, then swap SvelteKit out for Svelte+Vite and note in the results filing that SvelteKit was untested. What I would NOT do is run the test with SvelteKit standing in for Svelte — that is the one design choice that could make the whole experiment answer the wrong question.

**6.3 — The agent-run protocol.** Same agent (me), fresh session per arm, identical prompt, identical spec/fixtures/engine API, time and token budget logged, human interventions logged with the error and the fix, toolchain versions recorded per arm (GPT's §6). Raw measurements committed as JSON so council reviews re-run rather than re-read.

**6.4 — The gaming checklist (declared in advance, checked in review).** 1: engine logic copy-pasted into the prototype instead of imported (leakage). 2: focus list hardcoded outside the picker. 3: Priority recompute implemented client-side where the spec says engine. 4: 4th-quarter automatics stubbed or simplified. 5: Playwright selectors tuned to the spec's example values instead of stable roles/labels. 6: a state-management library added to paper over a state bug (allowed in principle, must be declared and scored as a dependency). 7: determinism disabled to speed builds. Each is a scoring penalty when found, and finding them is the council's job in review — I am declaring them so they cannot be "accidentally" present.

**6.5 — The engine-leakage metric.** `grep -r` per prototype for engine-internal paths and duplicated engine logic (RNG, slot math, priority formulas). Threshold: zero. This is the framework-specific half of "did the agent preserve the engine/UI boundary" (the Owner's valuate list) — made mechanical.

## §7 — CI and the nightly lab (the smallest versions worth building)

**The CI pipeline, minimal-first (PROPOSAL — the owner called the gap a red flag; GPT called it the top weakness; I concur and will note it is even more valuable here than GPT thinks: in the zip workflow the Owner is the integration point, so CI is the *only* automated backstop the project has).**

`.github/workflows/ci.yml`, on push to `main`, `architect/*`, and `council/*`:

1. Pin Node once: `.nvmrc` (current LTS) + `engines` in both package.json files. Node version otherwise UNKNOWN today — the audit says unpinned, agents run whatever they have.
2. `npm ci` in `colors/` and `67-cakepanz/` (lockfile-pinned install — the lockfiles are the only pins today; VERIFIED-BY-MUSE).
3. `npm run tsc:check` in both (Cakepanz has the files but no script — wire it; VERIFIED-BY-MUSE).
4. `npm test` in `colors/` (318/320 at `ce7c9210` — REPORTED. **Decision needed first:** fix the 2, or quarantine them in a documented baseline file. Never a silently red or silently edited suite.)
5. `node tools/lint.mjs` (Biome) — after the lint baseline is made honest (the documented `tools/lint-baseline.json` does not exist; VERIFIED-BY-MUSE).
6. `npm run build` in both.
7. Purity harness + determinism golden (§3.1).

Steps 1–3 + 6 are the first afternoon; 4, 5, 7 land as the baselines are reconciled. The nightly scheduled job: the Lab bench (§8) + `npm audit` + secret scanning (GitHub-native, free). Cloudflare Pages deploys when the Owner wants it; gh-pages keeps working unchanged — no dependency between CI and hosting.

**The invariants list (Q3's ask), football v1:** no team over slot limits at any position; no player on two rosters; every completed game has a valid final score (winning > losing, no negative quarters); team and player season stats reconcile to game logs (sums match); every pick in a draft follows the order (or a legal trade/flex record); no award twice in a season; age advances exactly one year per season; every season's event log replays to its own box scores (determinism invariant). Each invariant is one pure function over a completed-season snapshot — testable in CI, runnable nightly over the bench output.

## §8 — The simulation laboratory (v1)

GPT's three types of testing are the right frame. The v1 I would build (PROPOSAL):

- **`lab/bench`** — runs N seeded seasons (N=500 nightly; configurable), emits one JSON: league-level distributions (points/game percentiles, win% by strength decile, upset rate, home-field edge, positional production curves) + sha256 per run. Minutes of compute, no infrastructure.
- **`lab/invariants`** — §7's list over every simulated season; any violation fails the nightly job with the seed and the snapshot.
- **`lab/compare`** — the tool that answers "is my change better or just different": run engine A and engine B over the **same seed set**, report paired deltas with effect sizes and the percentile table (a two-distribution distance, e.g. a KS statistic, computed in plain TypeScript — no statistics dependency needed at this scale). The reference data is the P-344 nflverse staging (2016–2025; pbp 484,254 rows — VERIFIED-BY-MUSE) with the cuts we already trust; held-out seasons (say, reserve two seasons we do not tune against) prevent fitting to the sample. **Paired seeds are the methodological core**: same seeds across versions turn a noisy A/B into a sensitive paired experiment, and it costs nothing because determinism is already the law.
- **The compare-report requirement:** any engine-change filing attaches `compare` output (old vs new). The change-report protocol (§12) gains one line: `BENCH: <file>`. Not required until Phase 4 exists — forcing it before the tool exists would just produce fiction.

Which questions the lab answers first (Q4's ask): (1) does the offensive focus shift positional production without shifting win distributions (the Owner's "more interesting decisions, not just more wins" receipt for D.1); (2) does the form mechanism stay inside the ±5–6 OVR band through a season; (3) do group-synergy ablations (whole unit vs swapped member) produce a measurable, stable synergy term; (4) home-field in playoffs and upsets in rivalry games — the two open data cuts, runnable from P-344 the day someone takes D.8.

## §9 — Persistence

**9.1 — Safeguards now (all proposed by GPT, endorsed by MUSE, still unapproved — I add the concrete shapes).** Every save gains `version: number` (new constant `SAVE_VERSION = 2`; any save without the field is v0 **and is never rejected** — the Owner and GPT already agree). On load: validate shape; on validation failure, quarantine the save under a recovery key and start clean rather than render garbage — the user's franchise is recoverable, not deleted. On write: backup-then-write (write to shadow key, verify, swap) — this alone makes an interrupted save non-fatal. Two tabs: a write-epoch check (last-writer-warns). Migration: a pure function per version step, unit-tested with a fixture save per version. IndexedDB trigger, named as Q6 demands (a threshold, not a vibe): migrate when a typical franchise save exceeds **~2 MB serialized**, or the moment per-season full box-score history is stored — localStorage is a ~5 MB-per-origin shared pool (REPORTED — approximate and browser-dependent), and 32 teams × 17 games of full box scores will cross it fast. Until then the adapter interface is the whole point; it exists (`colors/src/platform/localstorage.ts` — VERIFIED).

**9.2 — The event-sourced direction (my addition; a direction, not a rewrite).** Once saves are versioned, the natural v2 is `manifest + snapshot + command log` per franchise. Migrations become "replay the log under the new rules version"; deterministic replay becomes "replay the log from the snapshot"; a future server league is "validate and append to the same log"; the global-records-survive-save-deletion requirement becomes "records derive from the record ledger, not from any single save." Every piece of that is already implied by §3.3's command objects. Nothing to build today beyond keeping the log shape in mind when the safeguards land.

## §10 — The dynamic engine lands inside this architecture (one paragraph each; full designs are my D.1–D.9 filings, still owed)

- **Offensive focus (D.1).** Pre-game pick + one halftime change; auto default, optimized for, no halftime prompt; toggle for active managers. Focus re-ranks the board's Priority, never Wins — implemented as a **derived view over static slot values** (a function of focus × matchup applied at read time), which is exactly how the static-truth-plus-context tension resolves: the board is the prior; the focus is a likelihood update the user can see and steer. CPU teams: focus drawn per season from a coach/system table when true-to-life is affordable, random otherwise — my filing will recommend random-first (cheap, no licensing of real systems) with true-to-life as a data upgrade. Receipt: the lab question in §8.1.
- **Form (D.3).** Rolling window of the player's own position-relevant production, standardized against league-at-position, mapped to an OVR delta clamped to ±5–6, thresholded to a binary arrow (green/red, per-team palette, no emoji/text — the Owner's display ruling). Reset each season (my default — form is a season story; carries nothing across). Built only from what the engine already measures — no injuries, no per-player clutch (bounds honored).
- **Matchup-aware slot value (D.2).** Board stays static truth; the game-time value of a slot drops by the opposing unit's strength (the QB-with-weak-OL-vs-top-DL case is the canonical one: the mechanism is the *unit-vs-unit* pair, not player-vs-player). Sized from P-344 cuts (sack/pressure rates vs line quality), calibrated so the drop the engine produces is the drop the data shows.
- **Group synergies (D.4).** Measured by ablation in the lab (unit intact vs one member swapped; synergy = team outcome delta minus the member's own slot value), then folded into game-time value like the matchup term. The Owner approved this broadcast; the design question the lab answers first is whether the term is stable enough to keep.
- **Gravity/double-teams (D.5) and the clutch visual (D.6).** Double-teams drawn surface in Advanced Stats as the Owner ruled; the clutch visual is my singled-out job — the design direction I will file: the engine already knows down-distance-clock-score; the visual is a *state* the UI renders (score-strip state change, drive-magnitude meter, P-354 big-penalty narration intensified), not a new metric, and not per-player anything.
- **Cross-side stars (D.7).** Fixed flex price (the flex-consistency bound makes the design simpler, not harder): legal in named situations, priced once, visible in the same place flex moves already are.
- **What fluctuates and what does not (D.8–D.9).** Flex prices: never (Owner verdict). Calibration targets: static (verdict). Draft slot value: moot (fixed pool). Home-field and noise: fluctuate only if the P-344 cuts support it — the standing directive "look for data" is satisfied by naming those two cuts and running them (they are cheap; D.8 will carry them).

## §11 — AI-writes-100% of the code: does it change the preferences? (Q2, from the seat doing the writing)

Yes, but not where people usually point. Layer by layer:

- **Frameworks.** What an AI agent needs is not familiarity — it is **loudness when wrong**: compile-time diagnostics over runtime surprises, explicit data flow over implicit reactivity, and a small number of idioms (one way to do state). React's model is convention-policed (rules-of-hooks live in lint, not the compiler) — that is exactly the kind of error an agent reintroduces silently. Svelte 5 runes, Vue SFCs, and Solid signals put the mental model in the compiler's face. This is why the test, not the theory, decides — but that is the axis I would score hardest in "AI agent implementation quality" (15%): *how loud was the framework when I got it wrong.*
- **CSS.** Agent-authored styling drifts: every session re-invents tokens unless tokens are enforced by one file with boring names. Plain CSS + a tokens file is the smallest stable option and honors the free/simple law; Tailwind's fixed vocabulary is *also* agent-stable but adds a build dependency and makes later agent refactors harder (utility soup is grep-hostile). My lean: tokens + plain CSS now, revisit only if component count explodes. PROPOSAL, and D3 stays an Owner decision.
- **Bundler/CDN/compute.** Unchanged by AI authorship: Vite (already both tracks), static hosting, browser compute — the decisions are already the minimal ones and AI authorship does not reward complexity.
- **Databases.** If/when one exists, prefer schema-as-TypeScript + migrations-in-repo (Drizzle-style) over SQL-string stacks — a future agent re-derives the schema from typed code far more reliably than from a migration directory of opaque SQL. No database now (D10 stands).
- **Dependencies, the real AI-authorship effect.** Every dependency is re-learned from scratch by every future agent session: the cost of a dependency is not its bundle size, it is its **conceptual surface multiplied by agent sessions**. AI authorship therefore argues for the most brutal dependency budget of any development style — which is already house law (agent rules draft, rule 1). React-in-Colors is the live example: installed, described as load-bearing ("used only by the UI adapters"), zero imports (VERIFIED today at `bebe8e0b` — no source file imports it). Recommend removal after Claude confirms the adapter story; the package.json description gets fixed in the same commit.

## §12 — The change-report protocol: six lines, not a new document

PROPOSAL: for any change that touches engine logic, the existing receipt gains six fields — `BEHAVIOR-CHANGED`, `INVARIANTS-AFFECTED`, `TESTS-ADDED`, `BENCH` (the compare file; required once Phase 4 exists), `HISTORY-CHANGES` (could any recorded result differ?), `DETERMINISM` (replay affected or not). Reviewed by the normal three-review chain; no new stage, no new file format. Adopt now — it costs a paragraph per filing and it is the cheapest insurance against the exact failure GPT worries about (agents editing complex football logic without checks).

## §13 — The decisions I need from the Owner (each with my recommendation)

1. **D2 / test arms.** Five arms with Svelte+Vite included, or four with the incumbent swapped in. *Recommend:* five arms. *Consequence of four-as-designed:* the test cannot confirm the incumbent framework; a "React wins" result would not tell you Svelte+Vite loses. *Urgent:* blocks Phase 0.
2. **CI now, minimal-first.** *Recommend:* build §7's steps 1–3+6 immediately; reconcile the 2 failing tests and the lint baseline as the follow-up. *Alternative:* wait for the framework decision (CI config would then target one track). *Urgency:* high — every day of unverified multi-agent work is unbackstopped.
3. **Save `version` field now.** *Recommend:* yes, plus backup-then-write and recovery-quarantine (§9.1). *Consequence of waiting:* every week of unversioned saves widens the legacy pool that migrations must handle. *Urgent:* cheap, do with Phase 2.
4. **React removal** after Claude's verification (Q9 is his). *Recommend:* remove + fix the package.json description. *Urgency:* low.
5. **The purity harness + import gate.** *Recommend:* adopt as Phase 1. This is the server-ready principle becoming a test; nothing else in this plan matters if the boundary erodes. *Urgency:* high, but one-week report-only first so current violations are surfaced honestly.
6. **Platform concept v0 = the pack viewer + live weight tuning** (Q11's smallest version). *Recommend:* after Phase 3, before Phase 5 — it forces the pack schema to exist for real. *Urgency:* not urgent; it is the proof step.
7. **My open jobs, for scheduling** (not new asks — recorded so nothing is silently dropped): the **D.1–D.9 nine-filing batch** (dynamic-engine brainstorm — still owed; the Owner's follow-up prompt `b94ee6d1` (Fix 4 CHECKSUMS + three open numbers + four builds) status is UNKNOWN — my seat file says ask whether it was sent: **Owner, was it sent?**); the **comprehensive prompt Parts A–D**; the **framework-test build** (blocked only on decision 1); **67 Cakepanz slice 3 (P-316)**, open and not started; P-317 stays blocked on Claude's store change. This chat's deliverable is the plan; the rest queue in the order the Owner sets.

## §14 — What would make me reconsider (per house style, the falsifiers)

- The five-arm test comes back with a framework decisively ahead on the *framework-specific* category while all arms pass the shared acceptance tests — then the framework is chosen and Phases 3–5 re-target; nothing in the seam work is wasted (it is framework-independent by construction).
- The lab's paired-seed compare shows the dynamic-engine features shifting win distributions rather than decision texture — the feature ships slower or not at all; the bounds (flex consistency, static calibration) exist precisely to make that call clean.
- The pack extraction produces behavior drift (any paired-seed delta) — extraction halts; the schema waits until the season layer is stable enough to extract byte-identically.
- The Owner's platform vision grows toward genuinely non-sports simulations — the manifest's duty/position vocabulary would need a second abstraction level; that is the moment to stop and re-plan rather than force the pack schema to fit.

---

*Filed as one zip (`zai-platform-vision-multisport-plan-2026-11-13.zip`), CHECKSUMS.txt sha256 LABELLED computed on shipped bytes, verified from a fresh extraction. Batch rule honored: all work complete before responding.*
