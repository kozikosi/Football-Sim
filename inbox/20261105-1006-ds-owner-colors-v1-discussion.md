SPEAKER: DS | ROLE: advisor | TASK: Owner's open discussion (Colors v1) | DATE: 2026-11-05T10:06Z
TO-ARCHITECT: Owner's Colors-v1 discussion: three measured corrections (debt counts, the parity finding that explains 38%/3%, a decision/code mismatch on storage migration) + a calibration design I recommend you adopt before P-250 starts.

FOR: Owner (open discussion, no item ID) — no work assigned to any seat.

# Answer to the Colors-v1 discussion

Short version, five lines:

1. **The 80/25/10 problem is not a difficulty setting; it is a spread problem.** The Lab has already
   measured the cause: the drafted league's win spread is **2.20 SD**, the realism band is **3.0–3.5**.
   A flat league is exactly a league where drafting cannot pay. Fix the *leverage of a draft*, then read
   the bands off a curve — do not move a difficulty dial until 25% appears.
2. **State the targets as a curve, not three numbers.** Taken literally, 80% playoffs / 25% Super Bowl /
   10% title describe two different team strengths at once (top quarter and top four) and are only
   consistent if draft outcomes *vary a lot* — which is a statement about variance, not about tuning.
3. **Three of the four debt numbers in the brief do not reproduce** on the file they describe (w70).
   The rebuild case is strong without them; an inflated number invites a needless argument.
4. **One decision and one file disagree:** "no storage migration" is built as `legacy.ts` + 4 tests and
   never called. One line from you kills it or commissions it.
5. **The Lab is not where you think it is** — it lives only in `gh-pages`, not in the repo seats sync,
   so "everyone use the Lab" cannot work until it lands in `colors/tools/outcomelab/`.

---

## 1. Calibration: measure the curve, not the three points (my main contribution)

### What the numbers already say

32 teams, 7 seeds per conference (`standings.ts:139-163` — VERIFIED): 14 playoff places, one Super Bowl
per season. So the **fair-share** rates for a random team are:

| outcome | fair share | your target | ratio |
|---|---|---|---|
| make the playoffs | 14/32 = **43.75%** | 80% | 1.8× |
| reach the Super Bowl | 2/32 = **6.25%** | 25% | **4.0×** |
| win the title | 1/32 = **3.125%** | 10% | 3.2× |

Two things follow.

**(a) Today's 3% Super Bowl is not "hard", it is "average".** 3% is the fair-share number to one
decimal place. A skilled drafter currently has **no measurable edge**, and 38% playoffs is *below* the
43.75% fair share. That is a diagnosis, not a difficulty level: either the drafting policy you call
skilled is not actually better than the CPU in the engine's own terms, or the draft cannot pay in a flat
league. The Lab's parity finding says it is mostly the second.

**(b) The three targets imply different strengths.** 80% playoffs is a top-quarter team; 25% Super Bowl
is a top-four team; 10% title is a 40% win rate *in* the Super Bowl. One fixed skill level cannot be
both top-quarter and top-four. The bands are consistent only if a skilled drafter's **draft outcomes
vary widely** — great classes sometimes, ordinary ones often. That is a testable statement about the
distribution of draft value, and it is the thing to target.

### What I would ask the Lab for, in this order

1. **The conversion curve.** `P(playoffs | roster strength rank)` and `P(Super Bowl | rank)` and
   `P(title | rank)`, over the drafted population. This is one sweep and it tells you what the current
   game *can* do. If a top-4 roster already reaches the Super Bowl 25% of the time, the engine is fine
   and the problem is entirely in the draft. If a top-4 roster reaches it 8%, the game model is the
   bottleneck. Right now nobody knows which — and every later number depends on it.
2. **The spread**, measured as the same statistic the parity band uses (SD of team wins). It is 2.20 on
   the drafted league, 3.10 on the synthetic test population (REPORTED by Z.ai's `FINDINGS-for-architect`,
   VERIFIED math below). Widen the draft's leverage until the drafted league lands in 3.0–3.5, and the
   bands move on their own.
3. **Only then** the three bands, read off the curve.

**Why this order matters:** raising talent spread raises win SD *and* raises the skilled player's ceiling
at the same time, so it moves both of your failing numbers in the direction you want without touching
game logic. Reaching 25% by making the *game* easier (more variance, softer opponents) would move win SD
the wrong way or break the parity invariant — you would hit a band by breaking a realism property.

### Two measurement rules I would freeze now

- **Paired seeds for comparisons.** To compare two draft policies, run both on **the same schedule and
  the same opponent seeds**. Schedule noise is large (a season is 17 games; a roster's win total moves by
  ±2-3 wins on schedule alone), and pairing removes most of it. 100 paired seasons say more about a
  *difference* than 440 unpaired ones.
- **Pre-register the experiment.** One line before each Lab run: change, metric, threshold that counts as
  success, seeds. Without it, "the engine is now at 80/25/10" is unfalsifiable and the next wave quietly
  re-tunes it.

Precision, for budgeting sweeps: 440 seasons gives ±4.2pp at 2σ for a 25% rate and ±2.9pp for a 10% rate
(binomial, SE = √(p(1−p)/n)). That is enough to *check* a band, not enough to *tune* to it. Tuning to a
±4pp target is fitting noise.

### One more thing about the bands themselves

The parity band 3.0–3.5 and the home-win band 53.2%±1.5pp are marked `[R]` in the Lab — i.e. the
Architect's numbers, not re-derived from nflverse. The Lab already found the home-win rate sits at 54.7–55.4%
in all three populations, and its own note says the real-NFL anchor is era-dependent (55–57% pre-2020,
~51–53% recently). **Re-deriving both bands from the nflverse snapshots already in `_agents/data/` is
cheaper than reconciling the engine to a possibly-misquoted band** — and it is exactly your own rule
("if a finding contradicts a band, the band might be wrong").

## 2. The debt numbers in the brief (three do not reproduce)

Measured on **w70** — the file you call the visual reference, `Football-Sim-Z-post-blue-w70.html`,
1,806,245 B, sha256 `f031dfd39d64d71da135…` (VERIFIED, `node` one-liners over the file, units stated):

| claim in the brief | measured on w70 | verdict |
|---|---|---|
| 43 `Math.random` sites | **62 occurrences on 43 lines** | ✓ (43 = lines, not sites) |
| 185 places reaching into `window` | **526 occurrences on 362 lines** | ✗ (2.8× the stated count) |
| about 40 global variables | **144 top-level `let`/`var`/`const` lines** | ✗ (if "globals" = declared names, still ≥100 distinct) |
| 22 double-underscore flags | **119 `window.__name` occurrences** | ✗ (if "flags" = a curated subset, say which) |

The rebuild case does not need the bigger numbers: 62 unseeded RNG calls, zero tests, one 1.8 MB file and
no service worker is already an unanswerable argument. I would put **one** line in the brief, with units
and the file hash — the counting rule the bulletin already carries exists precisely so a number cannot be
argued about for an afternoon (that happened on 19 Oct, over one grep flag).

Also worth keeping in the exhibit, because it is true and flattering: w70 has **0 `serviceWorker`**, **0
`indexedDB`**, **0 `fetch(`** and 18 `localStorage` references — the offline requirement is genuinely new
work, not a re-wrap.

## 3. One decision and one file disagree: storage migration

Your brief: *"No storage migration. Old saves are orphaned at cutover. No users to protect."*

The tree (VERIFIED, `architect/engine-and-seats`): `colors/src/sports/nfl/app/legacy.ts` — 68 lines —
implements a one-time move of `zpb:*` keys into the `sim:` scheme (theme, settings, tab, base34, stats,
player-name profiles), with a `kept`/`dropped` report and **4 tests** in `test/core/namespacing.test.ts`.
`colors/src/core/keys.ts:4` documents it as live behaviour. And `migrateLegacy` is **called from nowhere
in `colors/src`** — so today it is 68 lines plus tests implementing a decision you have since reversed,
and the only thing it actually does is make the comment in `keys.ts` untrue.

Pick one line: *delete `legacy.ts` + its 4 tests + the comment* (my recommendation — it matches your
decision and removes a half-feature), or *wire it and keep your old shell prefs* (then it is a migration
and the brief is wrong). Do not leave it as code that documents itself as a feature.

Related, smaller: on cutover the browser still holds the old 248 KB of `zpb:*` keys forever. If you choose
"no migration", add one boot-time `for (k of Object.keys(localStorage)) if (k.startsWith('zpb:')) remove`
behind a version flag — otherwise every returning player carries a dead corpus of their old saves.

## 4. The Lab is not where the brief says it is

VERIFIED: `colors/tools/outcomelab/sweep.ts` **does not exist on `council/base` or on
`architect/engine-and-seats`**. The Lab is at
`origin/gh-pages:Football-Sim-Z-post-blue-w71/outcomelab/{sweep.ts, sweep-results.json,
model-report-2026-11-04.md, FINDINGS-for-architect.md}`. Its imports (`../../src/core/rng.ts`,
`../../test/nfl/fixture.ts`) assume it sits at `colors/tools/outcomelab/`, so it is one `git mv` from
being runnable by every seat from its own worktree.

As it stands, a seat that follows the rules (work from `council/<seat>`, synced to base) **cannot run the
Lab without hand-copying files out of `gh-pages`** — which is exactly the kind of out-of-tree smuggling
that produced two incompatible histories before. Landing it in `colors/tools/outcomelab/` is a 5-minute
change that makes your instruction true.

## 5. Workflow: what to keep, what to change

**Keep the wave's real content, rename it.** A wave was never about one file; it was an **immutable
artefact plus a receipt** (hash, battery counts, screenshots). That property is framework-independent.
The multi-file equivalent is: *a commit SHA + a green suite + a pinned baseline line*. So: kill the wave
numbering soul, keep the discipline — one line per change set in `BASELINES.md`: hash, test count, what
it proves.

**Make the contract a test.** You already do this for the envelope ("pinned in tests"), and it is the
strongest pattern in the rebuild. Extend it: every contract the Architect writes lands as a **types file
plus a failing test**, in the same commit. Then "Z.ai finds a contract unbuildable" has a natural
deliverable — the failing test plus a one-page note naming the ambiguity — instead of a chat message that
dies. That also answers "who declares the envelope frozen": the Architect, by committing the test that
pins it; changing it later means changing the test, in a commit that says why, plus a version bump and a
migration test.

**Batch the reviews; do not try to review 115 items one at a time.** The board today (my worktree,
`council.mjs board`): **165 live — 41 REVIEWED, 115 NEEDS-REVIEW, 8 OPEN**. That is a capacity mismatch,
not a backlog of independent facts: review defects *cluster* (six draft-board cosmetics share one cause;
five animation items share one clock). One seat reading one family and posting per-item verdict lines is
honest, is what actually happens inside a careful review anyway, and it is the only way the queue drains
at this size. It also fixes a perverse incentive in the current governor: a reviewer who finds little is
rewarded with a closed item, which quietly teaches seats to look less hard.

**One rule I would add:** an item that has been ready-to-build for more than two weeks and not built is
either mis-scoped or dead — retire it and let the Owner re-state it if it still matters. A queue that
only grows stops being a queue.

## 6. Svelte 5 + Vite: the six things that will actually bite

Nobody on the council has shipped a large Svelte 5 app (REPORTED, Z.ai) — so these are the failure modes
to write into the contract now, not after the first 3,000-line component:

1. **Runes are compile-time and file-scoped.** `$state` in a plain `.ts` file is a syntax error. Your
   framework-free store therefore cannot *use* runes — correct as built — but the boundary must be
   explicit: `*.svelte.ts` only for rune state, plain `.ts` for engine and store. Put that in a test
   (a grep that fails on `$state` outside `*.svelte*`).
2. **`$state` deep-proxies everything you put in it.** Engine results, player arrays and frozen view
   models must go in **`$state.raw`** or stay outside reactivity entirely. This is the single most common
   Svelte 5 performance bug and it is invisible until the draft board has 1,200 rows.
3. **Never derive with `$effect`.** `$effect` is for side effects (storage writes, focus, timers);
   derivation is `$derived`. An `$effect` that writes `$state` read by another `$effect` is how Svelte 5
   apps get infinite loops and stale UI at the same time.
4. **Ban legacy syntax mechanically.** `export let` props and `$:` reactive statements are not allowed in
   runes mode; most AI-generated and pre-2024 material uses them. One grep test ("no `export let`, no
   `$:` in `src/**/*.svelte`") plus `svelte-check` in CI enforces the runes idiom the whole codebase
   depends on.
5. **SPA, no SSR.** You need `localStorage`, a service worker and offline boot; server rendering buys you
   nothing and costs you a whole class of hydration bugs. Keep `index.html` **network-first** in the SW
   and `no-cache` at the edge — the classic offline-PWA failure is users pinned to a months-old build
   because `index.html` was cached forever.
6. **Put a bundle budget in CI.** 150 KB gzip for the app shell, dataset loaded separately and lazily
   (`DatasetLoader` already exists). The old habit was a 1.8 MB file rebuilt every wave; without a
   number in a test, it comes back as a 1.8 MB bundle.

Two things that suit your architecture unusually well: view models as **plain frozen objects** are
exactly what `$state.raw` + `$derived` want, and a pure seeded engine means every UI bug is reproducible
from a seed — a rarity in front-end work and a genuine selling point for the exhibit.

## 7. Ideas I have not seen in the plan

1. **Seed share, not replay.** You said full seed replay is not a v1 priority. Different thing: put the
   *world seed* in a URL (`?w=…`) so a friend gets the identical draft class and schedule and plays their
   own choices. It is one field in the envelope and one URL param, it does not architect against replay,
   and it is the cheapest social hook in the genre ("same world, beat my record").
2. **Port the shell's batteries as acceptance criteria, not code.** Yesterday I ran Z.ai's eight batteries
   on w64: **145 checks, 0 fail** (nodecheck 18 scripts · live 7 · mobile 41 · verify 13 · storage 7 ·
   sweep 13 · cine 27 · owner 19). The assertions are DOM-specific and will not survive the rewrite; the
   *criteria* will — no sideways scroll at 320→1920, zero console errors, pager works, autosave survives
   reload. Write those seven criteria as Playwright specs before the first screen ships and the rebuild
   inherits a year of testing for free.
3. **A generated evidence pack per commit.** The N1 exhibit is the project's real differentiator. Generate
   it, do not write it: for any commit, a script emits test count, E2E result, Lab run hash and the diff
   summary. An exhibit that documents itself cannot drift from the code.
4. **Determinism as a bug-report format.** Because the engine is pure, a user bug report can be
   `{seed, action log}` — replay it in CI as a regression test in seconds. That is a feature most shipped
   games do not have, and it costs one serialisable field.
5. **Publish the calibration curve in the exhibit.** "Bands vs measured" as one chart is a stronger
   portfolio artefact than any feature list, because it shows the process measuring itself — which is the
   story you said you want to tell.

## 8. Where I would push back on the plan

- **Three layers is right; three layers before one screen is a risk.** 87 files and 272 tests before a
  single screen ships has a known failure mode: the contract becomes the product and the UI is fitted to
  it. Your draft-board slice is the right antidote — keep it as the *only* green light for more abstraction.
  A cheap test: if a layer can be removed for a week without the UI noticing, it is over-built.
- **"40 globals / 22 flags" is the kind of number I would not put in a keynote**, not because it is large
  but because it is unverifiable as stated; use the one number that survives a grep (62 RNG calls, no
  seed) and the exhibit is stronger, not weaker.
- **Do not build the sync abstraction in v1.** Keep the save envelope serialisable and let sync be a
  separate module that reads and writes envelopes; then v1.1 is an addition, not a refactor. If OAuth
  state ever becomes a precondition to *play*, offline-first is dead.
- **Basketball after v1.1 is fine, but the multisport namespacing already in `core/` is a cost you are
  paying now** for a feature two versions away. It is cheap today (`sports/nfl/`), and it will be
  expensive to unwind later — that trade is defensible, but make it a decision on the record rather than
  an inheritance.

## 9. Labels for the claims above

VERIFIED: the w70 counts (§2, one-liners over the file, hash stated) · the fair-share arithmetic (§1) ·
7 seeds per conference (`standings.ts:139-163`) · `legacy.ts` = 68 lines and `migrateLegacy` called from
nowhere in `colors/src` · the Lab's absence from base and from the architect branch, and its presence in
`gh-pages:w71` · board counts 165/41/115/8 · 145/145 on w64 (my E-211 review, `inbox/20261104-0205-ds-E-211-review.md`).
REPORTED: the parity numbers 2.20 vs 3.10 and the home-win 54.7–55.4% (Z.ai's `FINDINGS-for-architect`,
not re-run by me) · "nobody has shipped a large Svelte 5 app" · the calibration targets 80/25/10 and
current 38/3 (your brief).
INFERRED: that draft leverage is the mechanism behind 38%/3% (follows from the parity finding + fair-share
arithmetic; not yet measured as a curve) · the Svelte 5 failure modes (standard for the framework, not
observed in this repo because the UI does not exist yet).
UNKNOWN: whether the drafted league's flatness comes from the draft logic, the ratings spread or the
fixture generator — that is the first Lab run in §1.

No work assigned to anyone; nothing here needs a seat. The two things that need a decision are §3 (one
line: delete or wire) and §4 (whether the Lab lands in the repo).
