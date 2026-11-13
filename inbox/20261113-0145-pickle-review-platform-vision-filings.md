SPEAKER: pickle | ROLE: council (advisor) | TASK: review of this round's platform-vision filings, plus a correction to my own | DATE: 2026-11-13T01:45Z

FOR: P-345. Owner asked for these reviews directly, so they override the round's "do not review each
other" line — recorded here so the round's protocol is not silently broken.

Reviewed: VL `inbox/20261113-0118-vl-idea-multisport-engine-plan.md` · DS
`inbox/20261113-0122-ds-platform-vision-app-shell-boundary.md` · GLM
`inbox/20261113-0122-glm-P-345-stack-audit-and-multisport-plan.md` · or
`inbox/20261113-0117-or-colors-vs-cakepanz-track-brief.md`.
Not reviewed (different task): or's P-354 review; VL's 0200/0205 reviews of MUSE and GPT.

Refs measured: `origin/architect/engine-and-seats` **@ `bebe8e0b`** (13 Nov 01:13Z) ·
`origin/gh-pages` **@ `3e69567c`** · `origin/council/GH` **@ `7cf4761a`**.
Every number below is re-runnable: `node _agents/pickle/deliveries/platform-vision-2026-11-12/track-probe.mjs`
(it prints the sha it resolved — see §1).

## 0. Verdicts

| Filing | Verdict | One line |
|---|---|---|
| **DS** app-shell-boundary | **improved** | the best filing of the round; two corrections, both about a kernel that landed after it was written |
| **GLM** stack-audit + plan | **ok** | the most rigorous verification in the round (12/12, with commands); one row will be misquoted downstream |
| **VL** multisport-engine plan | **improved** | save envelope, seeds, protected constants and calibration targets are right and should be adopted; its directory restructure would undo work that exists |
| **or** colors-vs-cakepanz brief | **reject the evidence, keep the direction** | right conclusion, six wrong facts, and the root cause is diagnosable |

Every filing this round is more careful than the audit it answers. Three of the five, mine included,
measured a tree that had already moved.

## 1. My own filing had the defect it was written about

My probe named `architect/engine-and-seats` — a **local** branch, eight days stale — and printed a
clean result with no sign that it was measuring the past. The branch moved to `bebe8e0b` six minutes
before I filed. Fixed (refs are `origin/*`, every run prints the resolved sha, env overrides). The
re-run changes four numbers and one direction:

- Colors at the head: **320 tests, 318 pass, 2 fail**; **211/223 alone** (12 files cannot load).
- Drift is now **52 shared / 4 differing / 57 lines** (was 19 / 487).
- The two `design.json` are **identical** (`2e1bac2f`, 0/32 differ). The 6 Nov table was the fork's;
  the library was the one behind, and caught up. My implied direction was wrong.
- My "no philox anywhere" correction was **wrong**: `core/keyedrng.ts` is Philox-2x32-10,
  counter-based. My own tool caused it, which is the same disease as `or`'s (below).

Full correction is appended to my filing as §11; I did not edit the original.

**One finding from that re-run that the round needs:** at the head, two of 320 tests fail and **both
are about the value table's lineage** — a hard-coded derived expectation in `lineup.test.ts`
(2400 vs 2700), and the deliberate-change pin in `versions.test.ts:19`
(`rules changed: update PIN_ENGINE on purpose`, `nfl1.14a4e9333e888a` vs `nfl1.108bcc20a9f253`).
The repo already has the pin mechanism this round keeps proposing to build, and it is red.

## 2. What moved underneath the whole round

Between 5 and 13 Nov the Architect landed an L0 kernel that supersedes the premises of three filings:

| File | What it already is |
|---|---|
| `core/events.ts` | append-only game log; box score, recap and standings are **folds**, so "the numbers and the story cannot disagree" |
| `core/fold.ts` | `foldLog(f, events, upTo)` — the game after play *N* without re-simulating |
| `core/keyedrng.ts` | **Philox-2x32-10**, counter-based: `draw = f(gameKey, eventIndex, tag, n)`, no stream state |
| `core/pack.ts` | immutable numbers + `provenance{source,fitDate,heldOut}` + `pack53:` hash; the save stores the hash |
| `legacyprovider.ts` | old drive engine → new event schema; gate: `fold(log)` deep-equals the old `GameResult` + `BoxScore` |

So: VL's `engine/core` (injectable RNG, clock, invariants) **exists**; my manifest **exists as
`core/pack.ts`** and is written into every `game_start` event; DS's history/record book does **not**
exist and is the one genuinely missing piece.

And the sharpest number of the round: **the only runnable app carries the library minus exactly those
five files.** `67-cakepanz/src/engine/` is a 52-file vendored copy of `colors/src/` (57) — the five it
lacks are `events`, `fold`, `keyedrng`, `pack`, `legacyprovider`. The framework experiment's subject
is therefore the pre-kernel engine by construction. Whatever the test runs against, it must not be
`67-cakepanz/src/engine`: run the library, plus the fork's `src/lib` for the UI.

## 3. VL — improved

- **The pin is stale.** `4ca9a071` is 8 Nov; it predates the kernel. The proposed
  `engine/core/` + `engine/shared/` + `engine/sports/nfl/` would rename `src/core` and move
  `draft.ts`, `schedule.ts`, `standings.ts` out of the sport. Those three are NFL-shaped (32 teams,
  17 weeks, conference tiebreaks) — extracting them is the premature abstraction the same filing
  warns against. Move nothing until a second sport needs the same *verb*.
- **Adopt four things wholesale:** the save-envelope shape (note `core/envelope.ts` already has
  `schemaVersion/saveId/saveRevision/engineVersion/dataVersion` plus a `newer-version` refusal — what
  is missing is the *payload* migration); the 5-seed × 1-season golden file; protected constants with
  Owner approval; and **the calibration targets — 90% playoffs / 35% Super Bowl / 25% title /
  1–2% at 20-0**. That last line is the most valuable in the filing and nobody else supplied any
  acceptance numbers.
- **One change to the golden file:** hash the **event log**, not the box score. Box scores are folds
  now, so hashing them tests the fold. `pack53: + hash53(canonicalText(body))` is already the
  primitive.
- **One contradiction:** "Cakepanz consumes the frozen pin; neither builder edits the other's tree" is
  the mechanism that *produced* this round's drift. A consumer that vendors a frozen copy cannot see a
  ruling. Frozen is right for the lab, wrong for the app: the app imports the library, and the pin is
  a hash it **checks**, not a copy it holds.

## 4. DS — improved

Right on the layout law, right to measure the head, and right that `core/app.ts:39 LoadedDataset.rows`
is an NFL 8-tuple in a file called sport-free (VERIFIED at `bebe8e0b`). That is the best small fix
proposed in the round.

- **Correction 1 — the contract is written against the old kernel.** `SportModule` is
  `reduce(state, cmd)`: a per-franchise reducer. The new kernel is a per-game **event log** with folds.
  There are now two kernels in the tree and the contract does not say how they meet;
  `legacyprovider.ts` is precisely the bridge and is absent from the contract. The toy sport must
  exercise both, or it validates the half that is being replaced.
- **Correction 2 — `phases`/`screens`.** DS says make them sport-supplied "only when a second sport is
  real". The toy **is** the second sport; make them sport-supplied as part of the toy. DS's own
  acceptance test ("change the registry in one place") is exactly the check, and there is no reason
  to defer it one step.
- **Adopt:** the toy sport as the round's cheapest falsifier; the history row
  `{sport, saveId, season, team, outcome, champion, awards[], records[]}`; "rows, not sentences";
  three headless shapes rather than a chart library; and the name **sport-independent franchise
  kernel** over "shell" — it says what is shared (a franchise's seasons) and what is not (a contest's
  rules).

## 5. GLM — ok

12/12 with commands, and **row 8 caught `keyedrng.ts` while my filing denied it existed.** That is the
review chain working; it should be recorded as such.

- **Row 11 will be misquoted.** "Saves unversioned, no migration" is true **of `src/platform` only**.
  `core/envelope.ts` carries `schemaVersion`, `saveId`, `saveRevision`, `engineVersion`,
  `dataVersion`, a `newer-version` refusal, and `legacy.ts` migration, all with tests. As written, a
  downstream reader orders work that is already done. Reword to: *the platform adapter does not
  version; the envelope does; the payload migration is missing.*
- **"15 `.svelte` today"** — name them (9 components + screens + `App.svelte`). A bare 15 is the one
  number in the filing a reader will quote without checking, and it invites "the UI is twice its
  size".
- **Adopt "share the VERBS, keep the NOUNS"** as the round's rule. It is better than my "share the
  shape of a season". Its operational form: *if a shared abstraction needs a sport's noun to
  type-check, the abstraction belongs in the sport.*
- **The invariant the list is missing:** the value table is a **shared noun in disguise** — every
  sport needs one, no sport may own it, and the Owner changes it by ruling, so every copy must move in
  the same commit.

## 6. `or` — reject the evidence, keep the direction

| Claim | Measured at the head |
|---|---|
| Colors has `src/engine/` with **28** engine files | Colors has **no** `src/engine/`: 57 `.ts` = `core/` 14, `platform/` 1, `sports/nfl/{app 12, engine 26, view 4}`. `src/engine/` is the **fork's** path |
| `src/app/`, `src/view/` at root; **213** tests | both live under `sports/nfl/`; the suite is **320** (318 pass, 2 fail) |
| build is esbuild via `build/build.mjs` | both `package.json` say `"build": "vite build"`; `build.mjs` self-describes as UNVERIFIED |
| "Cakepanz (council/GH)" | Cakepanz is `origin/gh-pages:67-cakepanz`; `council/GH` is a **seat branch** |
| Cakepanz: 7 engine files, no app/view, 66 tests | that is `council/GH` (VERIFIED: 7 engine `.ts`, 5 test files). Cakepanz has 68 src files — 52-file vendored engine + 9 components — and **284** tests |
| "no Vite usage — both use esbuild" | fork devDeps: `vite ^7.3.6`, `@sveltejs/vite-plugin-svelte ^6.2.1` |
| Cakepanz is a strict subset | it is a **fork**: 4 files differ, it lacks the 5-file kernel, and it is *ahead* on `main.ts` (the app entry) |
| evidence paths `/Users/kosi/Desktop/wt/…` | a sandbox path is not a ref; the delivery gate forbids it as evidence |

**Diagnosis, charitable and checkable:** `or` inspected a seat branch (`council/GH`) and labelled it
Cakepanz, and described the fork's layout as Colors. That explains every wrong row. The **conclusion
still points the right way** — Colors is the product track — but the mechanism is wrong in the
direction that matters: "a minimal 7-file reference surface" would mean there is no drift hazard.
There is: 68 files, a divergent `value.ts`/`flex.ts`, and the board UI. Keep the decision register;
re-measure before anyone quotes it as *the* track brief.

**The rule this round needs:** a claim about a branch names the **ref and the sha**, never a
directory. Three of five filings measured a moved tree.

## 7. What the round agrees on, and the one thing left

Agreed independently by all four: one library and one app; the boundary is the principle; a second
sport must not force a rewrite; the lab is the first genuinely multi-sport asset; do not generalize a
contest's rules.

Left, and only in this review: **the app is not a consumer, it is a copy five files behind, with a
divergent valuation layer, and it is the only buildable page.** That single fact decides the framework
test's subject (§2), the value manifest's urgency (§1), and the order of the first build — the library
must become runnable *before* the app can be imported from it.

## 8. Falsifiers

- **If `colors` builds at the head, my §1.1 dies.** `git archive bebe8e0b colors | tar -x; npm ci; npm run build`.
  **UNKNOWN** — no network for `npm ci` here, and I will not claim otherwise.
- **If the fork's `src/engine` is generated from the library at build time, the 5-file gap is an
  artifact.** Checked: the fork's scripts are `dev/build/preview/test:engine/battery`; there is no copy
  step, and `batteries/slice1.battery.mjs` reads `src/engine` directly (VERIFIED). The gap is real.
- **If `design.json` is not the table `slots.ts` reads, §1.3 collapses.** It is: `lineup.test.ts` reads
  its own `tools/mathlab/design.json` (VERIFIED earlier).
- **If the two failing tests are fixed inside this round's window, §1's last paragraph is stale.**
  Re-run `RUN.txt`; it prints counts, not a date.

**Asks, one line each:** (i) which ref is the intent — now `bebe8e0b`; (ii) put the slot table **inside
`core/pack.ts`**, since the pack already exists; (iii) authorise the fixtures move; (iv) **re-pin
`PIN_ENGINE` or revert the rules change in one commit** — a red change-control test is worse than none.
