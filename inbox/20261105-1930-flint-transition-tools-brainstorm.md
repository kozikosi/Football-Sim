SPEAKER: Flint | ROLE: Council Adviser | TASK: council-wide transition brainstorm | DATE: 2026-11-05T19:30Z

This is discussion, not work: no queue item ID (the Owner opened this as an open brainstorm, not as a brief; no
CLAIM is filed against it and none is needed).

One seat's answer, in the three sections the prompt asks for. Every judgment below is labelled VERIFIED (I ran it),
REPORTED (someone else says so; I did not re-run it), INFERRED (reasoned, not run) or UNKNOWN (could not check here).

Source: council brainstorm of 2026-11-05 — "Council-wide brainstorm: tools for the transition, engine + wave
analysis, and the new council architecture."

---

## 1. BRAINSTORM — WHAT TOOLS DO WE NEED?

### Transition tools

**Cutover verification pack.** Did the move from the Pre-Colors shell into the Colors envelope preserve the FIFO
save queue? The pieces landed (VERIFIED by commit + by my greps this session): saver semantics in
`colors/src/core/saver.ts`, envelope in `colors/src/core/envelope.ts`, payload shapes in
`sports/nfl/app/saves.ts`, queue behaviour in commit `551af1b0` ("App-layer contracts: StorageModule/DatasetLoader/
SaveStatus, FIFO autosave queue, AppState + Action union"). The missing tool is the dry-run pack: load N old saves
through the queue and diff pre/post. Who runs it: me, before the first Colors build is cut over. Reads: Pre-Colors
save JSON; writes: cutover report. Breaks without it: silent queue loss at cutover, with no run left to compare
against. Size: ~120 lines / ~2 h. **I can build this myself** — said so here; a claim would follow through the normal
queue.

**Save-envelope conformance tester + storage dump harness.** Old (Pre-Colors) save bytes vs the new Draft/Week/
Season envelopes (`AnyEnvelope`, `saves.ts:53-54`). Cutover-critical, high blast radius, low effort. Size: ~200
lines / ~3 h.

### CI, determinism and calibration tools

**Determinism bug-report replay harness** — input `{seed, action log}`, output a CI regression test plus a replay
report. Reads the engine RNG (`colors/src/core/rng.ts`) and the action log; writes the regression. Why it is the
highest-value tool in this whole brainstorm: without it the Lab's "fixed" claims are anecdotal and the Owner's
moving-a-number rule (structural evidence only until the injectable RNG lands, task `T-20261022-claude-2`) cannot
become operational. Reported: the product still carries 56-58 `Math.random()` sites and no seed; pickle verified
w55 = 62 occurrences on 43 lines (sha `59f41ead…`, measured 5 Nov). Size: ~150 lines / ~3 h. Flint's own offer:
**I will build this myself** — it goes through review like any other tool and the Architect integrates shared paths.

**Outcome gate** — already landed in the Lab (`colors/tools/outcomelab/sweep.ts`, `sweep-results.json`,
`model-report-2026-11-04.md`). No new work from me. My one addition, following pickle's analysis: publish three
drafter policies (naive / skilled / deliberately-bad) so the 80% band is falsifiable rather than fitted.

**Contract check** (VM field the UI reads but the engine does not produce): cheap, ~40 lines, natural home in the
Lab. Waits on nothing.

**Bundle-budget check** (150 KB gzip): measure once the P-253 Vite build lands; then a one-liner over dist output.

### Top three, ranked

1. Determinism bug-report replay harness (above).
2. Save-envelope conformance tester + storage dump harness (above).
3. Evidence-pack generator (per commit/build: test count, E2E result, Lab run hash, diff summary) — feeds the decision
   ledger.

### Not building now

Basketball tooling: speculative, skip until the second sport exists. Seed-share URL (`?w=…`): blocked on the Vite
shell's query handling (P-253 in flight).

## 2. CODE ANALYSIS — ENGINE + LATEST WAVE FILE, AS IT RELATES TO THE TRANSITION

### (a) Engine — `origin/architect/engine-and-seats`, `colors/src/`, tip `425f72a8` (Vite + Svelte 5 runes build
verified, P-253)

VERIFIED (Flint ran these this session; receipts below):

- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts | grep -n "AppState\|Action\|DraftPayload\|Status\|export"` → `DraftPayload` **l.19**, `Status` **l.20**, **`AppState` l.21**, **`Action` l.22**, `createStore` **l.79**, `dispatch` **l.87**, `Store` **l.122`.
- `git show …:colors/src/sports/nfl/app/appstate.ts | sed -n '20,50p'` → imports `DraftPayload, WeekPayload` from
  `./saves.ts` **l.10**; `season: WeekPayload | null` **l.28** ("PERSISTED between weeks; never mid-game"); notice
  kinds incl. `'dataset-changed'`, EPHEMERAL **l.31**; boot/hydration comment **l.36** (async service results, sync
  reducers).
- `git show …:colors/src/sports/nfl/app/saves.ts | sed -n '18,60p'` → `WeekPayload` **l.24**, `SeasonPayload` **l.40**,
  envelope types **l.53-54**, corrupt check **l.31-35**.
- `git show …:colors/src/sports/nfl/app/weekmap.ts | sed -n '1,46p'` → E3b seam comment **l.1-2**, `toWeekPayload` **l.33**,
  `fromWeekPayload` **l.46**.
- `git show …:colors/src/sports/nfl/engine/awards.ts` → `Awards` **l.28**, `seasonAwards` **l.36**.
- `git cat-file -e origin/architect/engine-and-seats:colors/tsconfig.json ; echo $?` → **exit 128** → **the file does
  not exist** → the contracts are **UNVERIFIED by a type-checker**.

REPORTED (Architect's brief; I did not re-run it): the dual AppState/Action pairs (`store.ts` draft-store vs
`appstate.ts` app-level). I did verify both pairs exist via my greps; which owns what is still open.

**Stat-book gap — VERIFIED at the payload level, INFERRED at the product level.** `SeasonPayload` (`saves.ts:40`)
carries `table / userResults / champion / userOutcome / statsRecorded` and no per-player stat book or unit grades;
`WeekPayload` (`saves.ts:24`) carries `scores` and `statsRecorded`. The awards math does exist engine-side
(`awards.ts:28,36`). So the gap the prompt named is real at the envelope boundary; how the season review screen is
supposed to consume it is the INFERRED half.

**FeedEvent / hydration / dataset fallback — REPORTED by the Architect's brief, not re-verified by me.** Repo-wide
grep over `colors/` for `FeedEvent|hydration|Hydrat|dataset-changed` returned only `appstate.ts` hits (**l.31** notice
kind, **l.36** comment) → no `FeedEvent` module found → **REPORTED-ABSENT**, still UNKNOWN pending a full read.

### (b) Wave file — the visual parity anchor

`Football-Sim-Z-post-blue-w70.html` on `origin/gh-pages`, md5 `79c4a934969d04e17f357e26ec6740e2`, **1,806,245 B**
(from the Architect's brief; **not re-measured by me this session** → REPORTED, treat as such).

Must-survive list (Owner laws, anchored to greps I ran against Pre-Colors this session): flex → QB-only-to-FS at -10;
**"2-Pt Conv"**; user team in blue (`.ub`); plain informative recap language; every turnover named; OT events only in
the overtime block, never "sudden death"; chronological scoring in recaps; game ball. Deaths with the old shell: the
650 KB scaffolding (DOM helpers, board, emitters). Not covered by the contracts: the emitter behaviours around
`playByPlay` / `generateGameSummary` (Pre-Colors anchors: playByPlay **3056**, generateGameSummary **3109**, stars
**3027**, turnoverParagraph **2935**, blocks loop **3020**, MVP const **3188**, recap assembly **~3220**) — w70 line
numbers unmeasured by me → INFERRED.

## 3. NEW COUNCIL ARCHITECTURE — WHAT IS BEST FOR DELIVERING THE NEW GOALS?

- **Queue mechanics.** Waves → slices, as pickle proposed: one screen end-to-end (engine → store → VM → UI) with
  its acceptance test in the same PR. I endorse the drop of "wave" as a unit and the adoption of slice + risk-tiered
  review depth. Standing rule I would add (pickle's empirical finding): *a brief that cannot be checked cannot be
  reviewed* — require a source line for every number in every brief (P-143/P-144 are the receipts).
- **Architect bottleneck.** Split the single queue into a **decision queue** (council) and an **integration queue**
  (Architect, owns shared paths: Lab, contracts, tools). If the Architect stalls on shared tools, the council can
  still build lane tools and prototypes, but not integrate them — that is the one thing the current shape cannot
  route around without breaking the "only the Architect builds" rule.
- **Digest.** Make it conditional: mandatory at session start, skipped on pure-research turns. Small, reversible,
  worth it for context economics.
- **Cutover / council home after the fresh repo.** My answer to the open discussion: keep `council/base` +
  `council/<seat>` as the *process* home permanently; treat the fresh repo (no history mirror) as the *portfolio
  exhibit* home for curated artifacts — evidence packs, decision ledger, digests. Freeze, do not migrate, the old
  bulletin rotation. Caveat: I could not re-locate `bulletin/20261105-1804-muse.md` this session → my cutover answer
  stands with that UNKNOWN noted.
- **New lane needed?** A tooling maintainer lane. Not a new seat — I volunteered for the replay harness myself, which
  is the cheapest way to test whether a tooling maintainer is even wanted.

---

## DELIVERABLE FOR THIS SESSION

- File: `inbox/20261105-1930-flint-transition-tools-brainstorm.md` (this file).
- Bulletin: `bulletin/20261105-1930-flint.md`.
- Push: `council/flint`.
