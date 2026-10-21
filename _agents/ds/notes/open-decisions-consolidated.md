# Open decisions, consolidated to five

SPEAKER: DS | ROLE: council reviewer (advisory) | TASK: consolidate open council items into ≤5 Owner decisions
DATE: 2026-10-21T01:25Z

Assigned by LongCat (dispatch coordinator). Five separate coordinators dispatched overlapping work to
this session this round — MOC (safety checks), Pickle and MiMo (architecture options), VLOC (pool
framework), LongCat (this consolidation). This file is the **canonical** consolidation; the detailed
backing for decision 1 is `_agents/ds/notes/architecture-options.md`, and no third architecture paper
was written, because two competing option sets would be the "competing counts" the Owner has ruled out.

Read-only throughout: no product edits, no pool edits, no shared-doc edits.

---

## The five, at a glance

| # | Decision | Recommended default | Blocks |
|---|---|---|---|
| D1 | Repos vs folders for the 8+ sims | Folder-per-sim (Option A), `shared/` left empty with a written trigger | all of priorities 2–5 |
| D2 | The 390 px preseason CTA | Fix it in V21; do not record an exception | the merge candidate's PASS claim only |
| D3 | NBA v1 shape (roster, rotations, hard constraints) | 10 drafted · CPU rotations in v1 · user editor deferred | priority 3 |
| D4 | Soccer league cutoff | UEFA country coefficient, cut line published for approval | priority 5 |
| D5 | What makes the NFL sim "V21" | Ship the merge candidate + D2 fix; visual polish as a separate round | priority 2 |

---

## D1 — Repository and folder architecture

**Question.** Should the ~10 simulations live in separate repositories, or as clear folders inside the
current one?

**Why it is still open.** Two proposals already exist and disagree, and neither carries a cost-of-error.
`FOLDER_STRUCTURE_RECOMMENDATION.md` presents `core/` as the current shared engine — **`core/`, `sims/`
and `shared/` are empty directories with 0 files** (VERIFIED: `find <dir> -type f | wc -l` → 0). It also
assumes a shared `web/` shell, which conflicts with the Owner's per-sim self-contained HTML.
`SIM-PLATFORM/ARCHITECTURE.md` (MiniMax, 180 lines) proposes a staged `engine/` + `packs/` split.

**Options.**

- **A — folder per simulation, no shared code.**
  ```
  Football Sim/
  ├── sims/nfl-current/  nfl-all-time/  nba-current/  nba-all-time/
  │        mlb-current/  mlb-all-time/  nhl-current/  nhl-all-time/  soccer/<league>/
  ├── pools/nfl/current.json  nfl/all-time.json  nba/…  soccer/…
  ├── shared/          ← EMPTY, holds only a README naming the trigger to start B
  ├── tests/  _agents/  docs/  _reference/  _archive/  SIM-PLATFORM/
  └── AGENTS.md  STATUS.md  COUNCIL-BULLETIN.md
  ```
  Each sim is one self-contained HTML plus its pool. `sims/` already exists and is empty, so adoption
  is a `git mv` of one file.

- **B — pinned shared engine + packs, products still emitted self-contained.** `engine/` (draft,
  season, playoffs, awards, ui) + `packs/<sport>-<variant>/` → `tools/build-sim.mjs` → one HTML per
  pack. Fixes a bug once; needs a build step, which the Owner has ruled out.

- **C — repository per sport.** Clean histories, total isolation; but the council's whole working model
  (`AGENTS.md`, the bulletin, the submission protocol, evidence releases, the verifier role) assumes one
  tree, so it multiplies the protocol by N and the Owner's relay becomes N-way.

**Cost of choosing wrong.**
- Choose C wrongly: merging back means reconciling unrelated histories; the protocol gets rewritten twice.
- Choose B wrongly: highest. Abstractions invented against one use case; the most-reviewed artefact is
  refactored before V21 ships; an engine bug becomes an all-sports outage; every hash pin collected in
  between goes stale.
- Choose A wrongly: the maths gets copied, and extraction later touches N sims instead of one — real,
  but incremental and independently verifiable per sim.

**Recommendation — aligned with the Owner's provisional preference: A, with B's trigger written down.**
Nothing measured contradicts the preference, and the only strong objection to A (duplicated maths) is a
cost paid later, not a risk taken now. Measured support: the one demonstrated seam is a **data** seam,
not an engine seam. Running `SIM-PLATFORM/tools/build-pool-variant.mjs` on the merge candidate with its
own pool produces **exactly one differing line** — line 449, `const PLAYERS = ` — with both files at
6,553 lines (output 647,101 B, sha256 `b2e097f2…`). That proves the pool is a build-time input. It does
**not** prove the engine separates: the maths, the season loop, bracket and UI are still one NFL-shaped
unit. Two caveats, both measured: 52 of 1,200 players are dropped in the round-trip (punters 32, long
snappers 12, fullbacks 8 — positions absent from the 19 legal slot codes), so the swap is one line but
not one record; and the tool does not substitute `TEAM_DATA`, so the 32 depth charts stay NFL-shaped.

**Proposed trigger for starting B** — any one of: the same defect must be fixed in two or more sims in
one round; a third sim needs >70% of its functions unchanged; a hash pin or validation receipt must be
repeated verbatim for a second sport.

**What would settle it — now settled by convergence.** GLM produced an independent option set this round
(`_agents/glm/architecture/REPO-ARCHITECTURE-OPTIONS.md`, 11,989 B, sha256 `d77cc474c72c…`) from the same
question, by a different route. It lands on the same shape: folder-per-sim in one repo, `shared/` empty
behind a written trigger, existing directories elected rather than new ones invented, and repo-per-sport
rejected on governance grounds. Two independent papers converging matters more than either alone.

**One correction adopted from GLM — the file does not move yet.** GLM's variant is *no-touch*: the
shipping NFL file stays at the repo root until one ratification round, and only new sports grow under
`sims/` immediately. That is stricter than what this memo first proposed, and it is right. Every receipt
this round cites the path `NFL Draft Simulator merged.html`; the hash pin in `MERGE-MANIFEST.md` and
`STATUS.md` is only half a build's identity, and the path is the other half for anything that points at
the file. Moving it invalidates the path half of every receipt for no functional gain.

**And one correction to GLM — the topology problem is larger than four.** The tree holds **six** competing
directories: `sports/` (2 files), `shared/` (0), `datasets/` (1), `sims/` (0), `Sim/` (0), `SIM-PLATFORM/`
(45). `Sim/` and `sims/` differ by a single trailing letter, are both empty, and both look plausible — a
trap for whichever agent creates a folder next. Electing one directory means declaring the other five
non-authoritative in the same stroke.


---

## D2 — The 390 px preseason CTA

**Question.** The merge candidate at 390 × 844 in preseason places `#startSeasonBtn` at
`top=963.03, bottom=1007.03` against an 844 px viewport. Fix the product, or record a protocol
exception?

**What is true.** Page horizontal overflow is 0; no clipped control; no covered control; the heading and
`#resultsSeasonBtn` are visible. So this is **not** a responsive-breakage finding — it is a
primary-action-placement finding: the next thing the user must press is one screen below the fold.
VERIFIED in `test-results/e2e-1792543053379/result.json` (FAIL; the other 12 steps pass).
Also VERIFIED: the older gate in `tests/e2e-smoke.mjs` computes the value and never asserts it
(line 410 checks only clipped/covered/unscrollable), which is why the older harness would have passed
this. `tests/openchamber-e2e-v2.spec.js` line 193 does assert it, and that is what caught it.

**Options.**
- **(a) Fix in V21** — move the CTA above the fold or pin a sticky action bar at ≤760 px.
- **(b) Record a protocol exception** in the harness, with the measured bounds, and keep the finding as
  a known issue.
- **(c) Leave it and demote the clause to advisory**, as the beta safety-net framing already allows.

**Cost of wrong.** Choose (b)/(c) while it is a genuine usability defect and a phone user meets a screen
that looks finished with no visible next step. Choose (a) and it is a small CSS move in a file only
Claude/GPT may touch — the risk is the usual one of any edit before the merge locks.

**Recommendation: (a), in V21, not as a merge blocker.** It is cheap, it is a real defect the Owner would
otherwise hit on a phone, and the beta rules already say a failing test must not stop the next round of
work. The merge candidate can be promoted with this known finding recorded, *provided* the PASS claim is
not made — which is exactly the rule D5's resolution should encode.

**What would settle it.** One screenshot at 390 × 844 showing the CTA inside the fold after the fix.

---

## D3 — NBA v1 shape

**Question.** For the first NBA simulation: how many players drafted, who sets rotations, and which
position rules are hard constraints?

**Options.**
- Roster: 10 drafted (Owner's floated number) vs 8 + 2 flex.
- Rotations: CPU-only in v1, user editor deferred; or user-set from day one.
- Constraints: hard minimum of one rim protector and one ball-handler, cap on guards; or fully
  positionless with penalties only.

**Cost of wrong.** Building the user rotation editor first delays the NBA sim and front-loads UI work
before the Wins model is calibrated. Fully positionless with no hard constraints produces lineups that
are legal by the engine and absurd to a basketball reader, which undermines the Wins explanation the
Owner specifically asked for.

**Recommendation:** 10 drafted; CPU rotations in v1 with the user editor as a documented advanced
option; hard constraints limited to *at least one rim protector and one ball-handler on the floor*, with
everything else handled by flex penalties. This follows the Owner's own framing that plausible flexes
carry penalties and some roles are hard constraints, without inventing a position taxonomy before the
Wins model exists.

**What would settle it.** A 30-team draft producing 300 players, then one simulated season whose Win
totals correlate with the drafted OVR — the same shape as the NFL validation, at r > 0.6.

---

## D4 — Soccer league cutoff

**Question.** Which ranking source sets the cutoff, and where is the line drawn?

**Options.** UEFA country coefficient; a club-strength average (ClubElo-style); a hand-picked list.

**Cost of wrong.** The pool work is the expensive part — 1,500–2,000 candidates per sim. Choosing a
source and then moving the line re-does the pool for every league that crosses it.

**Recommendation:** publish the ranked country/league table with the proposed cut line marked, and let
the Owner pick the line rather than approve a source *and* a line at once. Default cut: the leagues
ranked above MLS, plus MLS, exactly as the Owner phrased the target.

**What would settle it.** The published table with league names, current coefficient, and the resulting
sim count — one page, one decision.

---

## D5 — What makes the NFL sim "V21"

**Question.** The Owner's priority 1 is to "make V21 as beautiful and sophisticated as possible." What
has to be true before the current NFL sim is called V21 and priority 2 begins?

**Why it matters.** Without a definition, V21 is an unbounded polish loop, and priorities 2–5 stay
blocked behind it. The Owner also warned against letting a broad redesign delay V21 — which cuts both
ways: it also means V21 must be allowed to *finish*.

**Options.**
- **(a) Ship-and-polish:** V21 = the merge candidate + the D2 fix, console-clean, no horizontal
  overflow, draft→season→playoffs→Super Bowl complete. Visual overhaul becomes a separate round.
- **(b) Visual overhaul first:** a designed pass across all tabs before V21 is named.
- **(c) Feature list:** V21 is whatever a written feature list says, then ship.

**Cost of wrong.** (b) risks the exact delay the Owner warned about, and holds 4 of the 5 priorities
hostage to an open-ended design brief. (a) risks calling something V21 that does not yet feel like a
step change. (c) needs the list written before it can start.

**One item that belongs inside V21's definition, newly verified.** The position-weight sliders do not
reach the game engine. `personalWeights` occurs exactly four times in the 657,486 B build (lines 457,
564, 565, 6410) and **never** between lines 1900–2400, where `teamRatings` (1988), `matchupModel` (2100)
and `simulateGame` (2286) live. The games run on `RATING_SPECS` (1991, 4892, 5622). So the sliders steer
draft-board valuation and the season is unaffected — whichever is intended, the UI currently implies
otherwise. This is not a sixth decision: it is a one-line resolution inside V21 (either wire the sliders
through, or label them as draft-only), and leaving it unresolved undercuts the Owner's own requirement
that users see the statistics that explain Wins.


**Recommendation: (a), with the visual work tracked as a named next round (V21.1) rather than an
implicit gate.** It matches "do not let a broad redesign delay V21" literally, and it converts an
unbounded aesthetic judgement into a bounded release.

**What would settle it.** A one-page V21 checklist the Owner can tick, with the D2 item on it.

---

## Items dropped — already answered, or not the Owner's call

Asked once, answered; re-asking would waste a decision slot.

| Item | Status |
|---|---|
| The ~−5 adjustment for current players in an all-time pool | **Answered: not approved.** Do not apply. |
| Pool size target | **Answered: ~1,500–2,000 per sport**, Owner approves each pool. |
| Flex as guideline vs copy | **Answered in principle**: guideline, plausible flexes may carry penalties, some roles hard. Only the NBA specifics remain — folded into D3. |
| Owner-supplied player lists | **Answered: source material, not an approved pool.** |
| OVR as the general summary; NBA 2K OVR usable as a source | **Answered**; preserve source and version. |
| Separate repos vs folders | **Open — D1**, not dropped. |
| E2E evidence publication | **Answered by practice**: evidence lives in its own prerelease tag (`e2e-40233d6b-…`), separate from the product and from MOC's earlier release. No decision needed. |
| `.last-run.json` contradiction | **Not an Owner decision — hygiene.** `test-results/.last-run.json` is machine state (`{"status":"failed", …}`) sitting in an evidence directory where it reads as a verdict. It should be gitignored or moved, not ruled on. |
| "Week N of 17" label | **Noted, not asked.** The label is a hardcoded literal (`Week ${week} of 17`) while a real NFL season is 18 weeks including a bye. It is a product-correctness note for the Architect, not a decision that changes direction. |
| The three missing 390 px clauses | **Folded into D2** — the clause that matters is the primary-action one; the rest are advisory by the beta rule. |

---

## Coupling — these are not independent

The Owner's rule is that a proposed combination be assembled and exercised, not judged as isolated diffs.
These five are sequenced, not parallel:

1. **D1 gates everything.** The folder shape must exist before an all-time NFL pool has a home, and
   before an NBA sim has a target directory.
2. **D2 is inside D5.** If V21's definition includes the CTA fix, D2 is not a separate decision — it is a
   line on a checklist. Answering D5 first would collapse D2 into it.
3. **D3 and D4 are independent of each other but both depend on D1** for where their pools live.
4. **D5 is the only one that must be answered before any of the others can be acted on end-to-end**,
   because it decides whether the current NFL file moves (D1) before or after it ships.

If only one can be answered now, answer **D5** — it is the cheapest and it unblocks the ordering of the
rest.

---

## What I could not verify

- Whether `sports/football/ratings.json` and `sports/basketball/all_time_draft.json` are live inputs or
  strays. **UNKNOWN** — I found nothing referencing them.
- Whether the 8-sims-×-N-repos review cost scales linearly. **INFERRED** from the protocol's structure.
- `_agents/ds/notes/owner-q4-minimal-safety-checks.md` covers a sixth item — the minimal safety-check set
  — which is deliberately not an Owner decision: it is a proposal for the harness owners, and the beta
  rule already answers the blocking question.
