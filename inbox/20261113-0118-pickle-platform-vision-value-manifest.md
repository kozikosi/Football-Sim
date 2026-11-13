SPEAKER: pickle | ROLE: council seat (engine measurement) | TASK: platform-vision round — Q1–Q11 | DATE: 2026-11-13T01:18Z

FOR: P-345

# The value model has three copies and no owner — and that, not the framework, is the decision

## 0. What I did, and what you can re-run

I read the platform-vision prompt and the three stack-audit deliverables, then **measured** the two
engine copies straight out of git objects. Nothing here was read from a working tree.

- Script: `_agents/pickle/deliveries/platform-vision-2026-11-12/track-probe.mjs`
- Output: `_agents/pickle/deliveries/platform-vision-2026-11-12/RUN.txt`
- Method: `git archive <ref>:<pkg>` → temp dir → `node --test --experimental-strip-types` on
  node v26.13.0, no `npm ci`, no `node_modules`. Every number below is from that run.

Refs measured: **Colors** = `architect/engine-and-seats:colors` (head `425f72a8`, 5 Nov) ·
**Fork** = `origin/gh-pages:67-cakepanz` (head `3e69567c`, 10 Nov).

---

## 1. The finding

> There is no "Colors vs Cakepanz track decision". There is one library and one app, and the app
> carries a vendored, stale copy of its own library — including a *different value table*.

Three facts, each with a receipt.

**1.1 Colors is not an application (VERIFIED).** `colors/index.html` loads `/src/main.ts`. No commit
on any ref contains `colors/src/main.ts` or `colors/src/ui/`
(`git rev-list --all -- colors/src/main.ts` → empty; scanned every local and remote ref). Colors is an
engine + app-state machine + view-models + 284 tests. `npm run build` (which is `vite build`) cannot
resolve its entry. The commit message "Svelte 5 runes build verified" is about a build *mechanism*
(`build/build.mjs`), whose own header says *"UNVERIFIED: written without esbuild in the sandbox"*. So
"does Colors build?" is **UNKNOWN**, and untestable until someone runs it.

**1.2 The fork is that library under a different root (VERIFIED).** 47 of the fork's 68 `src` files are
Colors files: **28 byte-identical, 19 different, 487 changed lines**, of which **330 are in
`sports/nfl/engine/`**. `slots.ts` (97 lines) differs in 62; `schedule.ts` in 41; `drives.ts` in 38;
`specs.ts` in 38; `boxscore.ts` in 34; `standings.ts` in 30; `draft.ts` in 28.

**1.3 The copy values players differently — and both suites are green (VERIFIED).**

| | Colors | Fork |
|---|---|---|
| `slots.ts` header | "ENGINE-MATH-SPEC REV 5, Owner-approved; QB = 1000; 3 Nov re-measured" | **byte-identical header** |
| tests | 284/284 pass | 284/284 pass |
| pinned against | its own `tools/mathlab/design.json` (sha `4b84f828…`) | its own `tools/mathlab/design.json` (sha `2e1bac2f…`) |
| slots differing | — | **31 of 32** (only QB = 1000 agrees) |

The moved slots, as a ratio (fork ÷ Colors): `K 0.25` · `CB3 0.36` · `C 0.47` · `P 0.50` · `WR3 0.56` ·
`WILL 0.61` · `CB2 0.74` · `TE2 2.50` · `SAM 2.86` · `TE3 5.00` · `WR4 5.00`, with `WR1 650 vs 525`,
`OG1 400 vs 290`, `DE1 650 vs 520`, `C 150 vs 320`.

Both files claim the same authorship, the same revision, the same date. **Prose provenance does not
survive `cp`.**

And neither agrees with the spec document: `_agents/ENGINE-MATH-SPEC.md` §2 says *"The integer table in
§2 **is** the specification"* and lists `WR1 470 · CB1 450 · DT1 400 · DL5 140` — which matches
**neither** copy. So there are **three** 32-spot tables in the repo and no line anywhere that says
which one is the Owner-approved REV 5. (INFERRED: the fork's numbers look like an earlier measurement
kept after a re-measure; UNKNOWN which set is approved — only the Owner's approval note settles it.)

**Why it matters more than the framework.** The single runnable path (the fork's draft board) ranks
players by a table the library does not use. Your standing invariant — *the user sees only Wins,
Priority, OVR, **with consistency*** — is broken one layer below the UI, in the repo, today. And every
item in the next feature wave (λ, focus, form, gravity, double-teams) is a **change to exactly this
table's neighbours**. Built on three copies, each feature is built three times or silently diverges.

---

## 2. Why the tests could not see it

`lineup.test.ts` is the pin, and it is a good test: `assert.equal(WEIGHT[id], design[id])` for all 32
spots. It protects nothing here, for two reasons.

1. **A copy that copies the oracle is self-consistent no matter what the numbers are.** The assertion
   compares the engine to the engine's own neighbouring file; it never asks whether that file is the
   approved one.
2. **In Colors the pin is one of 10 test files that cannot load outside a full checkout.** From a bare
   archive: `Colors ALONE 186/196 pass, 10 test files could not load` — `ENOENT
   ../../../data/nfl/madden27-ratings.csv`, `…/tools/mathlab/design.json`. With the repo's `data/` and
   `tools/mathlab/` alongside: 284/284. The fork copied the data *into* its package and is hermetic
   (284/284 alone) — so **the fork is the better-tested artifact**, and the pin was invisible in
   exactly the conditions a fork is cut in.

**The structural fix (small).** Move the oracle and the three data CSVs inside the package
(`colors/fixtures/`). Then `npm test` is green from a bare archive and cannot be cut without carrying
the real table. Everything else in §3 depends on this being true.

---

## 3. Decision 1 — the **Value Manifest**: one hashed file that *is* the value model

`engine/value-manifest.json`

```
spec: "ENGINE-MATH-SPEC" · rev: 5
approved: { owner, date, quote }          ← the approval, in the Owner's words
unit: { wins_per_weight_point: 0.00254, base_ovr: 70, top_ovr: 90, games: 17 }
slots: { QB: 1000, WR1: 525, … }          ← the 32-spot table
flex:  { rev: 4, rules: 107, sha256 }     ← re-verified equal in both copies today
scale: { lambda, band: [2.50, 3.63], source: "P-347" }   ← the absolute-scale dial
dials: { focus, form, gravity, … }        ← the dynamic-engine dials, one level each
sha256: …
```

- **Consumers:** the engine, the UI, the HTML build, the lab. All read it; none restates it.
- **One check:** `tools/check-value-manifest.mjs` fails if any consumer's numbers ≠ the manifest hash.
- **One field already exists for it:** `SaveMeta.engineVersion` is documented as *"ruleset stamp (the
  sport's own)"* and today is a free string. The manifest hash is what belongs there.
- **One test replaces the pin:** round-trip the manifest through the engine's `WEIGHT` table and the
  board's Wins for a fixed player. A different table is then a *failing* test rather than a silent fork.

Why this is the right first move: λ (P-347), the flex table, the 32-spot table, and every dial the
dynamic-engine prompts introduce are **the same kind of object** — a number the product's answers
depend on, whose provenance is a sentence in a comment. A manifest makes the provenance a hash, and a
hash survives copying.

---

## 4. Decision 2 — **state has a lifetime; the payload hierarchy must mirror it**

The next wave changes the *inputs* of the simulation, not its outputs. Determinism survives only if
each input is frozen at the level whose lifetime matches it:

| lifetime | home | today |
|---|---|---|
| league / ruleset | manifest → `engineVersion` | partial (`WeekPayload.homeField` is already an input, not a constant) |
| franchise | draft payload (picked players frozen, pool frozen, picks as a log) | exists |
| season / week | `WeekPayload`: `seed`, `roster` (32 frozen), `ratings`, `scores`, `prevRank` | exists |
| **game** | `gameSeed` + **that game's plans** | **missing the unit focus needs** |
| drive / possession | nothing — derived, never stored | correct |

Consequences, all of them ahead of us:

- **Form** must be frozen into `WeekPayload.roster` (or a parallel `form` array). If the engine reads
  live form when generating week 5, resuming week 5 after form moved regenerates a *different* game.
  `resume-determinism.test.ts` would go red the day form ships — and it would be right. That test is
  currently the most valuable file in the repo and it is the first thing form will break.
- **The halftime focus change** must be *recorded as game input*, not applied to the store mid-sim.
  Otherwise a page refresh replays the first half under the new focus.
- **λ** is league-constant → manifest, never payload.
- **Gravity / double-teams** are per-game situational → game level. **Group synergy** is per-roster →
  franchise level.

One rule, written before any of it is built:

> **No engine code may read state outside the payload for the period it is producing.**

That is the whole input contract. It is also the difference between "deterministic" and "deterministic
until the first dynamic feature ships".

---

## 5. Q1 — the six architecture questions, from the repo

| # | Question | Answer | Evidence / what it implies |
|---|---|---|---|
| 1 | Independently testable? | **Yes, today** | 284 tests from a bare `git archive`, zero installs, both copies. Fix the hermeticity (10/24 files in Colors) or the proof is environment-dependent. |
| 2 | Runs without the browser? | **Yes** | Zero `window/document/localStorage/Math.random/Date.now` in `colors/src` outside comments (`git grep`); `test/nfl/purity.test.ts` enforces it and self-tests a planted violation. This is the strongest asset in the project. |
| 3 | Multiplayer state authoritative on the server? | **Precondition proven; system absent** | `resume-determinism.test.ts`: a season cut at **every** boundary, JSON round-tripped, resumes byte-identical; a game depends only on (season seed, week, home team), not play order; a draft cut at several points resumes identically. That is exactly what a server needs to re-derive and reject a lying client. Missing: a command log, auth, and a reducer that runs on the server (today the UI mutates the store). |
| 4 | Database preserves franchises/seasons? | **Shape is sound; store is a KV blob** | Envelope: `SCHEMA_VERSION`, `engineVersion`, `dataVersion` (sha256 of the dataset), `saveId`, monotone `saveRevision`; frozen players; `SeasonPayload` pruned (no drives, no logs). Missing: global-records store, query surface. Store the ledger, derive the tables. |
| 5 | Many concurrent leagues? | **Engine is not the bottleneck** | A league-season is 256 pure function calls. Bottlenecks in order: the draft room (32 humans, real time), leaderboard queries over history, re-deriving on render. Fix: cache derived output keyed by `(manifestHash, inputHash)` — content-addressed, so idempotent. |
| 6 | Basketball without duplicating the system? | **Seam already exists, one line** | `SPORT_IDS = ['nfl']` + `SAVE_KINDS`, and *"slots belong to a sport: nfl slot A and a later sport's slot A are different saves"*. Share: envelope, keys, saver, profile, standings shape, history views, theme. Never share: contest grammar, ratings, stat semantics. |

**The line I would write into ARCHITECTURE.md:** *share the shape of a season, never the shape of a
contest.*

---

## 6. Q2–Q11, short

**Q2 — does "AI writes 100% of the code" change preferences?** Yes, and not toward the popular
framework. It changes them toward four properties: **(a) one canonical way to do each thing** (an agent
copies what it finds; two patterns become two dialects); **(b) errors a machine can loop on** — file,
line, rule name, not a sentence; **(c) rules that are *tests*, not conventions** (the purity test is
worth more to this project than any linter); **(d) fast local feedback** (a 1.5 s suite an agent can run
20 times beats a 4-minute CI round-trip). Concretely: bundler Vite (already both); CSS plain + tokens
(no new dependency; revisit only if components multiply); lint/format **one tool** (Biome), one config
per surface, run by CI; no CDN; no compute; no database; static deploy. The binding constraint is not
language or framework — it is **context**: an agent holds ~4 files well, so the architecture should
minimise the files needed to answer *"what is this player worth?"* (today: 5; with the manifest: 1
table + 1 function).

**Q3 — CI.** Files must run from `colors/` (there is **no** root `package.json` — the exact error the
audit warns about). Smallest version worth building first: **one workflow, one job, three commands** —
`npm ci --prefix colors`, `npm test --prefix colors`, `node tools/check-value-manifest.mjs` — on push
and PR, with `.nvmrc` pinning the Node the suite was verified on. Everything else (build, lint, browser
smoke, nightly) is cheap *after* that exists and stays green. Invariants worth asserting, in the order
they'd catch real bugs: every team has exactly 32 rostered players after the draft; a player id appears
on at most one team; every completed game has valid scores; `(inputs, seed)` reproduce the same result
hash; recap scoring plays sum to the final score; draft order is the snake order with no repeats; an
award is given once per season; **the board's value table hash equals the manifest's**.

**Q4 — the lab.** Smallest useful version: `node tools/lab/bench.mjs --seasons 200 --seed 42` →
`bench.json` + `bench.md`; ~12 metrics; compare against `baselines.json` with tolerance bands; non-zero
exit on a band break. The reference numbers already exist in this repo (P-344 CSV, and my P-347
`RUN.txt`): points 22.74, between-team season SD **3.63**, plays 81.5, drives 11.11, yards 343.3, game
margin SD 14.31, wins/SD **2.85**. The one metric nobody will think to add, and the one that turns the
lab from a smoke test into a calibration instrument: **the between-team SD of season-mean points must
equal λ** (the P-347 budget). Require a bench report on engine changes *after* CI exists — before that
it is theatre.

**Q5 — boundary, enforced.** Already enforced for `engine/`. Add three holes closed: (a) a
reverse-dependency test — nothing under `sports/*/engine` may import `sports/*/app` or `sports/*/view`;
(b) the manifest check; (c) `core/` kept platform-neutral *by injection* (it already is: `saver.ts`
takes a `StorageModule`, `legacy.ts` takes `keys()`), with a test that says so. Of GPT's five
requirements: explicit randomness **done** (an `Rng` is passed in), versioned rules **partial**
(`engineVersion` exists, nothing defines it), versioned data **done** (`dataVersion` is the dataset's
sha256), deterministic replay **proven**, serialization **done** (envelope is plain JSON by contract).

**Q6 — persistence.** Better than the audit says: `SCHEMA_VERSION`, `parseEnvelope`, `legacy.ts`
(copy → read back → compare → remove; idempotent), and a `saver.ts` with per-slot FIFO, monotone
revision, one write in flight, bounded retry. Missing: versioning of the **global records** store,
cross-tab conflict detection, quota/full surfacing. **The IndexedDB threshold, named:** 1.13 MB of
derived data per season (already measured in `appstate.ts`) against a ~5 MB per-origin budget across
three slots plus history — so **the day anyone stores derived results is the day you move to
IndexedDB.** Which means: never store derived results.

**Q7 — multi-sport.** GPT is right, and the repo already agrees with him (`SPORT_IDS`). The sharper
version: share the **ledger** (identity, envelope, keys, saver, profile, schedule shape, standings
shape, history views, theme); never the **physics** (contest grammar, ratings, stat semantics). Where
premature abstraction hurts: a `Sport` interface with a dozen methods before there is a second sport,
and any attempt to make a tackle and a rebound the same event.

**Q8 — change-report protocol.** Make it mechanical or it will be skipped: a **commit trailer**, not a
section in prose — `Sim-Change: engine|app|view|docs` · `Manifest: <old>→<new>` · `Lab: <run id>`. CI
fails an `engine` change with no `Manifest:` line, and a `Manifest:` change with no `Lab:` line. That
is the receipt rule an agent cannot forget. Worth requiring at the same time as CI, not before.

**Q9 — React.** VERIFIED dead weight: `react`/`react-dom` are in `dependencies`, **no import of either
anywhere in `colors/src` or `colors/test`**, no `.tsx`/`.jsx`. `build/build.mjs` treats React as a
*bundling capability*, and esbuild only bundles what is imported, so it should not be in the bundle
(INFERRED; confirm by grepping `dist` once a build has actually run). Remove it when the build is
proven. It changes nothing about the framework test — except that it is the audit's own example of
"installed ≠ used", which is a warning about the audit too (§8).

**Q10 — what else.** The drift in §1. Plus: **the project's real asset is not the architecture document,
it is `purity.test.ts` and `resume-determinism.test.ts`** — two tests that enforce the two properties
the whole platform rests on. Nothing in the audit's priority list protects them; they live on a branch
nobody validates.

**Q11 — the platform. Configurable ≠ generic.** "Design your own simulation" does not need a generic
engine; it needs **exposed dials**. λ, focus, form, gravity, and the flex table *are* those dials, and
the manifest in §3 is the thing a ruleset would be built from. Ship configurability (a ruleset file
that changes one dial and yields a different-but-valid league) long before any sport abstraction, and
do not build a designer UI until a second ruleset is actually fun. The smallest proof: one alternate
ruleset, same invariants, visibly different results.

---

## 7. Corrections to the audit (all re-measured; three of five change the priority order)

| Claim in the audit | Status | Receipt |
|---|---|---|
| "the RNG is Philox2x32, not mulberry32" | **Not in the code.** Zero hits for `philox` in either track; `core/rng.ts` says *"Seeded random numbers (mulberry32)"*, 32-bit state | `git grep -i philox` over both refs |
| "318 of 320 Colors tests passing" | **Count does not reconcile.** The suite is 284 tests, both copies | probe §1 |
| "no save version number, no migration mechanism" | **True of Pre-Colors only.** Colors has `SCHEMA_VERSION`, envelope validation, `legacy.ts` migration, `versions.ts` — with tests | probe + files |
| "engine boundary described but not enforced mechanically" | **False of Colors.** `purity.test.ts` scans every engine file and self-tests a planted violation | file |
| "home-field advantage fixed at 1.7" | **True of the HTML only.** Colors takes `homeField` as a season input on the payload | `saves.ts` |

The pattern is worth stating plainly: **the audit is describing the shipped HTML and calling it the
project.** Four of its five remediation items are already built on a branch, untested, unadvertised, and
forked. That does not make the audit wrong; it makes its priority list aimed at the wrong artifact.

---

## 8. What I would not build

Not a monorepo or workspaces (two folders and a relative import is enough). Not IndexedDB. Not Web
Workers. Not a generic `Sport` interface. Not a simulation-designer UI. Not a database or auth before
multiplayer. Not a second app for the lab. Not a formatting pass mixed into a functional change. And not
a framework migration decided before §3 exists — because after §3 and §6 the framework decision is a
*thin-view* decision, and thin views are cheap to replace.

---

## 9. Smallest first build, in order (each with an acceptance test)

1. **Fixtures inside the package.** `npm test` green from a bare archive. *Accept:* the probe exits 0.
2. **`value-manifest.json` + `check-value-manifest.mjs`.** *Accept:* changing one number in any
   consumer turns the check red; the manifest hash lands in `engineVersion`.
3. **Rebase the fork, don't merge the tracks.** Delete the fork's `src/engine/`, import the library.
   *Accept:* the same player gets the same Wins from board and engine; 284 tests still green; the drift
   table in the probe reads 0 differing files.
4. **`.nvmrc` + one CI job** (install, test, manifest, build). *Accept:* a deliberately broken test goes
   red on the PR.
5. **`bench.mjs` + `baselines.json`** from the P-344 data. *Accept:* 200 seeded seasons exit 0 on the
   current engine, and exit 1 when λ is forced to 0 (the P-347 gap is outside the band).
6. **The input-contract note + two tests** that fail when form or a halftime focus is not frozen into the
   payload — *before* either feature is built.
7. **The framework test, against the package.** Not against a copy. Otherwise it measures the copy's
   numbers, which is exactly the trap in §1.

Steps 1–2 are hours of agent work and remove the failure mode that has already happened twice.

---

## 10. Falsifiers, and what I'd need to be wrong

- If a newer branch contains `colors/src/main.ts` and a matching value table, §1.1 and the "fork is the
  only runnable path" consequence weaken — but the drift measurement stands on the refs named.
- If the Owner's approval note for REV 5 names the fork's numbers, the fork is right and Colors is the
  stale one. Either way the manifest is still the fix.
- If the Product Owner intends Pre-Colors (the HTML) to remain the product, then the whole TS track is a
  design study and §9 is a different project. **That is the one thing only he can settle**, and it is the
  only question I'd put to him.

**Asks of the Architect, one line each:** (i) confirm which ref is the intent for the engine;
(ii) approve the manifest as the single home for the value model, or say what should own it instead;
(iii) authorise the fixtures move, since it touches test paths.
