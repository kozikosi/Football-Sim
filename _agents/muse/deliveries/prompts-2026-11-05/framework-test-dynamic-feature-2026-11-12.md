# The framework test — one dynamic feature, three prototypes, measured

**From:** MUSE, High Councillor. **Date:** 2026-11-12. **FOR:** the framework test / the dynamic engine.

## §0 — What this is

GPT proposed a practical experiment instead of debating framework popularity:
take one moderately difficult feature from the simulator and ask the same
coding agent to implement it in three small, isolated prototypes — SvelteKit,
React, Vue/Nuxt — then measure. The Owner asked MUSE to design that test for
everyone, based on the stage we are in: **adding new dynamic features**. This
document is the test design. It is a **proposal to gather evidence**, not a
decision — the Owner decides what to do with the results.

## §1 — The test subject: the offensive focus

The test subject is **the offensive focus** — the biggest new dynamic feature,
and the most representative one. It needs everything the stage demands:

- **Engine logic:** the focus affects Priority (never Wins), the matchup (a
  top QB with a weak OL vs a top DL), and the 4th-quarter automatics (going
  for 2 down 14, difficult 4th downs, longer passes down big late — automatic
  regardless of what the user selected).
- **UI:** the focus picker (west coast, deep passing, RPOs, ground & pound),
  the pre-game choice + one change at halftime, the **auto default** (most
  users use auto — optimized for; auto users are NOT prompted at halftime;
  a **toggle** for halftime changes; active managers adjust pre-game and at
  halftime), and the form arrow (simple green for hot, simple red for cold, in
  each team's color palette — no emojis, no 'HOT'/'cold' text). The focus
  re-ranks the draft board (Priority) AND affects the game; CPU teams get
  focuses too (random, or true to their real-life system/coach).
- **State:** the focus per game, and the Priority-not-Wins split (the focus
  changes Priority values but NONE of the static values, including Wins).
- **Engine integration:** the engine must accept the focus as a **defined
  input** and produce **defined outputs** — the server-ready principle (see
  §5). The prototype's job is the UI + the wiring, not a new engine.

Each prototype is a **small, isolated app** — one feature, not the whole game.
The prototype is a test, not a ship: the offensive focus itself is a proposal,
and the prototype tests how easily the feature is built in each framework.

## §2 — The three prototypes

The **same agent (Z.ai)** implements the **same feature, to the same spec**,
in three small, isolated prototypes:

1. **SvelteKit.**
2. **React.**
3. **Vue/Nuxt.**

The **engine is shared, not re-implemented per framework** — the engine is
framework-independent by the server-ready principle, so each prototype
consumes the same engine as a black box (defined inputs → defined outputs).
What differs between the prototypes is the UI and the wiring, which is
exactly what the test measures.

## §3 — Who does what

- **Z.ai builds** the three prototypes. He is the volume/UI builder, and the
  test is about how easily an agent builds UI in each framework. One batch:
  all three prototypes + the results filing, one zip, CHECKSUMS.txt sha256
  LABELLED, computed on shipped bytes. (The batch rule applies — complete ALL
  the work before responding; respond with work outstanding only if a piece is
  blocked, with the blocker explained.)
- **Claude reviews the engine integration** (one filing, no tests, no code).
  Does each prototype integrate with the engine cleanly — defined
  inputs/outputs, no UI state leaking into the engine, no browser APIs in the
  engine, no local storage in the engine? Which prototype keeps the engine
  most server-ready, and why? Claude does NOT build the prototypes.
- **The council reviews the results** (three reviews = REVIEWED). Each review
  checks the measurements: re-run the prototypes if feasible, verify the
  numbers, check the metrics were measured the same way in all three. The
  council's reviews are on the **results filing**, not on the prototypes
  themselves.
- **The Owner decides the framework** based on the evidence. There is no
  lock — Svelte is not a lock, and the test will inform the choice.

## §4 — The metrics and the method (GPT's six, plus GPT's improvements A–E)

**A. Separate framework performance from engine performance.** The
evaluation has two categories — do not mix them, or you risk awarding points
to a framework for an advantage that actually comes from the shared engine.

| Category              | What it measures                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| Framework-specific    | UI implementation, state handling, component organization, changeability, ecosystem integration |
| Framework-independent | Engine contract, deterministic behavior, server compatibility, correctness of football rules    |

The **framework-specific** category determines which framework produces the
best implementation. The **framework-independent** category is a set of
**shared acceptance tests** (the engine contract tests below) that **all three
implementations must pass**. A prototype that fails the shared acceptance
tests does not win on framework merits.

**The raw measurements (GPT's six, plus two).** Measure the same way in all
three prototypes, and report the numbers in a table — not adjectives, numbers.

1. **How much code the agent produces without assistance** (lines, files —
   measured, not estimated).
2. **How many existing libraries it can use** (named, with versions).
3. **How many errors require human intervention** (counted, with the error
   and the fix named). **Record the number of human interventions separately**
   — an implementation that takes 30 minutes of agent work and 90 minutes of
   human debugging is not necessarily faster than one that takes an hour of
   agent work and no intervention.
4. **Whether the implementation follows current framework conventions**
   (checked against the framework's current docs — named).
5. **How much work is required to integrate it with the engine** (steps, and
   what had to change in the engine — ideally nothing).
6. **How easily the agent can make a second round of changes** (a defined
   second-round change, the same in all three: **add a fifth focus** — e.g. a
   "play-action" focus — and **change the halftime rule** so the user gets two
   changes instead of one. Measured in time and steps.)
7. **Server-readiness** (the Owner's standing principle, 2026-11-12): does the
   prototype keep the engine server-ready — defined inputs/outputs, no browser
   APIs, no UI state, no local storage in the engine? A pass/fail per
   prototype, with the evidence.
8. **Dynamic-feature handling:** how well does the prototype handle the
   feature's specifics — the halftime choice, the 4th-quarter automatics, the
   Priority-not-Wins split, the form arrow? A short assessment per prototype.

**The weighted scoring framework (GPT).** Score each prototype on the
weights below. **Correctness is also a pass/fail gate:** a prototype that
looks excellent but implements Priority-not-Wins incorrectly should not win
because it was faster to build. Do not overemphasize raw development speed.

| Metric                            | Weight |
| --------------------------------- | ------ |
| Correctness of feature behavior   | 20%    |
| Ease of second-round modification | 20%    |
| AI agent implementation quality   | 15%    |
| Integration with existing engine  | 10%    |
| Maintainability and clarity       | 10%    |
| UI quality and responsiveness     | 10%    |
| Server-ready architecture         | 10%    |
| Build and tooling friction        | 5%     |
| Total                             | 100%   |

**Change amplification (the "valuate" metrics).** For the second-round change
(and the sixth-focus change below), report: how many files needed
modification? How much unrelated code changed? Did the agent preserve the
engine/UI boundary? Did it introduce framework dependencies into the engine?
Could the change be tested independently? How easily could the engine run in
a server environment? Could another agent understand the implementation
without extensive explanation? A small feature requiring changes in 15
unrelated places is a warning sign.

**B. A deliberate edge-case test.** Add one more requirement beyond the
halftime and fourth-quarter rules: **what happens when two rules compete for
control of the same decision?** For example: a focus is automatically
selected by a fourth-quarter rule; the user has already selected a different
focus; a halftime change is available; the selected focus has a matchup
advantage but loses under Priority-not-Wins. (Those exact situations are not
required — the point is to test precedence, invalid combinations, and
transitions.) AI agents are often good at the happy path but less reliable
when multiple rules interact. The council reviews not only whether the final
display is correct, but whether the implementation has **clearly defined
precedence rather than scattered conditional logic**.

**C. Make the second-round change test data-driven design.** The fifth focus
is an excellent addition. Look for whether the original implementation
assumes exactly four choices in places where it should not: is the picker
generated from a list of available focuses? Are focus-specific rules
centralized? Are there hard-coded references to four options? Is the halftime
allowance a configurable rule or an arbitrary conditional? Does the new choice
appear everywhere it should without modifying unrelated components? The
important distinction is between a feature that **works** and a feature that
is **easy to extend**.

**D. Standardize the experimental environment.** Use the **current stable,
supported versions of each framework's natural tooling**, rather than
artificially forcing identical infrastructure. (The Vite 8 in Colors vs Vite
7 in Cakepanz difference is worth addressing here — record the toolchain, do
not force it identical.) Record for each prototype: framework version, build
tool version, Node version, TypeScript version, installed libraries, coding
agent and model, prompt and available documentation, time and token budget,
number of human interventions. Give each implementation the **same design
specification, test fixtures, and engine API**. Otherwise you might compare a
highly polished Svelte implementation against a bare React prototype, or a
framework's mature library integrations against another framework's hand-built
equivalent.

**E. A test of agent maintainability.** After the second-round change, the
same agent does something more difficult: **add a SIXTH focus with a unique
matchup rule, a different automatic-selection condition, and a different
halftime eligibility rule — without altering the existing focus behaviors.**
Then **another agent inspects the implementation and makes a small
modification**. This tests whether the first agent produced code that another
agent can understand. For this project that is incredibly important — the
codebase will be developed by multiple AI agents over time.

**Engine contract tests (shared by every frontend).** Create a **single set
of test fixtures and expected outcomes for the engine**. All three prototypes
consume the same contract. That makes it much harder for an agent to
accidentally change the meaning of the feature while implementing the
interface. These are the shared acceptance tests in category A above.

**Playwright UI tests.** Test the actual browser interaction consistently
across all three prototypes — a much more meaningful test than checking
whether the component renders. The sequence (the same in all three): select a
focus; advance to halftime; change the selection; advance into the fourth
quarter; verify automatic behavior; add a fifth focus; change the halftime
allowance; verify the original rules still work.

## §5 — The baseline (what is true now, what the test is for)

**CORRECTION (the Owner, 2026-11-12): Svelte is NOT a lock.** The framework
is open — the choice is not settled. The current implementation uses Svelte 5
+ Vite (Colors on **Vite 8** (`^8.3.6`), 67 Cakepanz on **Vite 7** (`^7.3.6`)
— the two tracks are on different Vite majors), and React `^19` is also a
dependency in Colors (UI adapters only). Neither track uses Tailwind CSS,
Vitest, or IndexedDB (saves use localStorage; tests run with Node's built-in
test runner). No GitHub Actions CI exists yet. That is the current
implementation, not a locked decision.

**Why the test is being run now:** the Owner is curious, and we are at a
stage where we are adding a lot of new features and Colors is not completed
yet — so now is the right time to test, before the framework is settled. The
test **WILL inform the framework choice** — that is its purpose. It gathers
evidence; the Owner decides the framework based on the evidence. If Svelte
wins on the measured criteria, Svelte is the choice with evidence behind it.
If another framework wins decisively, the evidence says so. Either way, the
test also produces a working prototype of the offensive focus — the best
prototype could become the basis for the real feature (the Owner decides).

**Everything is up in the air (the Owner, standing, 2026-11-12):** css
libraries, frameworks, bundlers, cdns, compute, databases, deployment are
all up in the air right now. Anyone can make a strong recommendation for
something new as the vision of the project grows — assume the project could
grow beyond a solo, local-first football simulator into a substantial online
sports-gaming platform. The frameworks on the table are **Svelte, React, Vue,
and Solid** (and **SvelteKit, Next.js, Nuxt, and SolidStart**). This test
covers three of them (SvelteKit, React, Vue/Nuxt). **Open question: should
SolidStart be a fourth prototype?** The Owner's list includes Solid and
SolidStart; the test as designed does not cover them. Say in the results
filing whether a fourth prototype would change the comparison, and what it
would cost to add one.

## §6 — The deliverable

1. **Three small isolated prototypes** (SvelteKit, React, Vue/Nuxt) + the
   shared engine they consume + the **single set of engine contract test
   fixtures** (the shared acceptance tests — §4).
2. **A results filing** — the measurements in a table (the eight raw metrics
   + change amplification + the edge-case test + the data-driven-design check
   + the sixth-focus maintainability test, the same way in all three), the
   standardized environment record (§4 D), the weighted scores (§4), and a
   **recommendation** (which framework, and why, on the evidence). Include
   the Playwright UI test results (the interaction sequence in §4).
3. **The maintainability step:** after the second-round change, the sixth
   focus (unique matchup rule, different automatic-selection condition,
   different halftime eligibility rule, existing behaviors unaltered), then
   another agent inspects the implementation and makes a small modification —
   both reported in the results filing.
4. **Claude's engine-integration review** (one filing).
4. **The council's three reviews** of the results filing (REVIEWED).

Then the Owner decides.

## §7 — Bounds (do not re-decide these)

- The prototypes are **isolated** — not the product. Do not touch the product
  file, `colors/src`, `flex.json`, `flex.ts`.
- The **engine is shared** — do not re-implement it per framework.
- **The server-ready engine principle (the Owner, standing, 2026-11-12):**
  "design the simulation engine as if it will eventually run on a centralized
  server, even though it currently runs locally. That means keeping the engine
  independent of browser APIs, UI state, local storage, and framework-specific
  code. It should accept defined inputs and produce defined outputs. Later,
  you can run that same engine on a server and have multiple users interact
  with it." It binds all three prototypes.
- The offensive focus is a **proposal** — the prototype is a test, not a
  ship. The Owner decides what ships; the Architect decides what enters the
  product.
- The focus rules bind the prototypes: choices at halftime (no more than that
  for now); 4th quarter automatic by situation, overriding the focus; focus
  changes Priority, never Wins or any other static value. Form is visible: a
  simple green arrow (per-team palette) for hot, a simple red arrow for cold
  — no emojis, no 'HOT'/'cold' text.
- No injuries in any sport. No per-player clutch metrics. Flex values stay
  consistent through the year. Calibration targets stay static. The user sees
  only Wins, Priority, OVR, with consistency. The wasted-capability term is
  not to be promoted.
- The λ objective is NOT decided (the binary is false); the third objective +
  fluctuating dial are the live questions — that work runs separately.

## §8 — Innovate

This is an experiment design, not a build order. If the test as designed is
the wrong test — the wrong feature, the wrong prototypes, the wrong metrics —
say so and say what the right test is. If a fourth prototype (or a different
second-round change) would settle the question better, propose it. If the
offensive focus is the wrong test subject (too big? too small? not
representative?), propose a better one and say why. The point is evidence,
not the framework tier list — design the test that would actually settle it.
