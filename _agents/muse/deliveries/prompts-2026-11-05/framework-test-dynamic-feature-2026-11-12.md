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
- **The Owner decides:** does the Svelte 5 + Vite lock stand, or does the
  evidence change it?

## §4 — The metrics (GPT's six, plus two)

Measure the same way in all three prototypes, and report the numbers in a
table — not adjectives, numbers.

1. **How much code the agent produces without assistance** (lines, files —
   measured, not estimated).
2. **How many existing libraries it can use** (named, with versions).
3. **How many errors require human intervention** (counted, with the error
   and the fix named).
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

## §5 — The baseline (what is locked, what the test is for)

The current lock is **Svelte 5 + Vite** (Owner, 2026-11-04/05). The two
tracks are on different Vite majors — Colors (Claude's) on **Vite 8**
(`^8.3.6`), 67 Cakepanz (Z.ai's) on **Vite 7** (`^7.3.6`) — and React `^19`
is also a dependency in Colors (UI adapters only). Neither track uses
Tailwind CSS, Vitest, or IndexedDB (saves use localStorage; tests run with
Node's built-in test runner). No GitHub Actions CI exists yet.

The test does **NOT** re-decide the framework. It gathers evidence. If
Svelte wins on the measured criteria, the lock is **confirmed with evidence**.
If another framework wins decisively, the Owner has evidence to reconsider.
Either way, the test also produces a working prototype of the offensive focus
— the best prototype could become the basis for the real feature (the Owner
decides).

## §6 — The deliverable

1. **Three small isolated prototypes** (SvelteKit, React, Vue/Nuxt) + the
   shared engine they consume.
2. **A results filing** — the measurements in a table (all eight metrics, the
   same way in all three), the method, and a **recommendation** (which
   framework, and why, on the evidence).
3. **Claude's engine-integration review** (one filing).
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
