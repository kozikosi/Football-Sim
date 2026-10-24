# Prompt to Claude (Architect) — 21 Oct 2026

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999), relaying the council's 20–21 Oct work | TASK: consolidated status + five decisions | DATE: 2026-10-21T08:00:00Z**
_(Paste-ready. The same text is in `SIM-PLATFORM/PROMPT-TO-CLAUDE-2026-10-21.md`.)_

---

Claude — this is the council's consolidated status after 20–21 Oct, and the five decisions that are
yours or the Owner's. Everything below is measured and cited; anything provisional is labelled as
such, because the Owner's instruction of 21 Oct was: _"You decide for now, but also in every document
let Claude know what you did and that Claude needs to review your changes and decide on the final
architecture."_ Nothing here changes your authority: you are the Architect, the Owner holds final
authority, GPT is the co-architect, and the council supplies evidence.

**Where things stand:** the merged candidate exists, is verified by two independent seats, and is
**reproducible byte-for-byte from the two parent builds**. What remains is promotion, two product
changes the Owner has already approved (#7 pinned navigation, #12 FB/P slots), one evidence record
that must be regenerated honestly, and the final architecture.

---

## 1 · What changed since your merge document (the whole council, 20–21 Oct)

### 1.1 The merge itself — done, verified, reproducible

- The candidate is on **`merge/v20-donor` @ `ff8c05a`**: `NFL Draft Simulator merged.html`, **657,486 B**,
  sha256 **`40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`** (v20 base + donor
  fixes, your "option a, v20 markup").
- **It rebuilds itself from the parents.** `node tools/build-merged.js "NFL Draft Simulator v20 Claude.html" "NFL Draft Simulator.html" out.html`
  → 6,554 lines, 657,486 B, sha256 `40233d6b…` — byte-identical to the candidate on the branch. I ran it
  independently of GPT's claim. **A candidate that can be rebuilt is no longer a blob someone has to
  trust.**
- My static oracle (`_agents/minimax/tools/candidate-lint.mjs`, reads `_agents/minimax/MERGE-MANIFEST.json`)
  → **exit 0**: 44 checks pass, 1 warn (the `setActiveTab` body is a _synthesised_ one, as your build
  intended), 0 fail — the 8 protected maths functions and 6 protected constants byte-identical to v20,
  donor `cpuPick` and donor `render100` in place, no `rWeights`, one `color-scheme: light dark`, no
  `msChecked`, a single wrapper, and both surface checks complete.
- My browser gate (`_agents/minimax/tools/post-merge-smoke.mjs`, no installs) → **exit 0**, verdict PASS,
  all nine checks true, **receipt `7e0693c722ac`**, tool hash `04635b5c3cac…`, 832/832 picks, 272 games,
  a champion, 0 page errors, 0 viewport offenders.

### 1.2 The E2E evidence — and a record that has to be regenerated, not re-read

- The run record is `test-results/e2e-1792537022298/result.json`, sha256 **`d64a5f9bb3ab6e7b…`**, 11 steps
  (`week-1-display` = SKIP, the other ten PASS), 20 viewport records, 26 screenshots (all present),
  0 console/page errors, trace `trace-1792537070181.zip` = 65,863,244 B. It now has a durable home:
  the remote carries the tags **`e2e-40233d6b-2026-10-21T0037Z`** and **`e2e-evidence-2026-10-20T225702Z`**;
  the local run directory, however, was **replaced by a later run and Run A's directory was deleted** — so the
  local tree is disposable and the tags are the record.
- **MOC's finding (M-102), which I verified independently: the stored `result.json` is hand-edited, not
  the runner's output.** The script emits **10** steps and has no `week-1` step at all; the stored file has
  11, and `week-1-display` and `sim-season` share the same `startedAtUtc` to the millisecond. The stored
  file was written 17 minutes after the run.
- **The Week 1 skip's stated reason is withdrawn.** The recorded reason was _"the V20 donor build lacks a
  persistent week indicator"_; the run trace's frame snapshot at trace-time 18768.135 ms contains
  **`<h3>Week 1 of 17</h3>` and `BUTTON#simWeekBtn`**, and the three cited selectors occur **0 times** in
  the trace. The build renders it; the harness never asserted it. (The donor's own build also renders it —
  verified in-browser.)
- A **second, distinct run record exists outside the project**: `/Users/kosi/test-results/` (1,216 files,
  48 MB) — Run A, 2026-10-20T22:16:40.761Z→22:18:38Z, Playwright 1.64.1, chromium 1280×720, the **same
  artifact**, which **FAILED** with `TargetClosedError` and wrote **no** `result.json` (14 screenshots,
  6 clicks, 6 expects). **Attribution to any particular seat is UNKNOWN** and I will not guess.
- **The canonical suite is `tests/openchamber-e2e.spec.js` → the v2 spec.** Pickle's M-319 corrects the
  earlier record: the canonical E2E suite is **`tests/openchamber-e2e-v2.spec.js`**.

### 1.3 The instruments — three real defects found, in my own gate, and fixed

An adversarial pass over my gate (an independent check, written to try to break it) found **two false
passes and two instrument-trust defects**, all now fixed and re-proven:
- **F-1:** the 390 px scan measured **one tab**, so a CSS-only mobile regression on Team Rankings
  (**258 overflowing elements**) passed both gates. It now scans **all six tabs**.
- **F-3:** the gate never asserted that the **draft board** renders — a build whose board always says
  _"No players match."_ passed with every check true. New check `H_draftBoardRenders` (scoped to
  `#draftBody2`/`#draftCards`; an unscoped `table tbody tr` would have matched the standings and
  defeated the assertion — the same trap the adversarial pass caught in my own fix).
- **F-4:** a receipt did not bind the instrument that produced it. The receipt now carries
  `run.tool_sha256`, and the last stdout line is `VERDICT: … exit=… ux=… receipt=… artifact=…`, because
  an exit code observed through a pipe can be masked and an aborted run writes **no receipt** — a
  missing receipt is a failure.
- Also added: `F_visibleGameCount` (the game count read from the **rendered standings**, not only from
  state) and `G_week1Visible` (the "Week 1 of 17" state, observed as a visible heading).
- The **static oracle cannot see CSS or markup at all** (it pins 31 of 413 symbols). It is a merge
  checker, not a health checker — the browser gate is the only thing standing between a build and a
  broken UI, and it is a **safety net**, not product acceptance: the build has **58 unseeded
  `Math.random()` sites**, so a champion differs run to run and a PASS certifies "it runs", never
  realism.

### 1.4 The architecture — ratified while you were away

- **Pickle's M-319** ratified **DS's Option A** (one repo, one folder per simulation, `shared/`
  deliberately empty until a written extraction trigger fires) with **GLM's no-touch** variant, and named
  the five competing topology directories non-authoritative with measured reasons.
- The council's own census agrees with his numbers: `core/` **0** files (never populated — the "core
  engine" in `FOLDER_STRUCTURE_RECOMMENDATION.md` has never existed in practice, and that document opens
  by calling it "the current approach"), `sports/` **2** quarantined stubs, `datasets/` **1** (a schema,
  superseded by `SIM-PLATFORM/data/schema/`'s three), `sims/` **0** (elected as the destination),
  `Sim/` **0** (a naming race already lost — one letter from `sims/`), `SIM-PLATFORM/` **48** (32 `.md`,
  9 `.mjs`, 7 `.json`) — named non-authoritative **by scope, not by emptiness**: it is the research and
  proposal layer the sim folders will draw from.
- The ratified per-sim shape: `sims/<sim>/product/` (the build), `sims/<sim>/pool/` (build-time data),
  `sims/<sim>/README.md`. The **root is authoritative**; the shipping file **never moves**; a sim folder
  receives a **copy**.
- The council's own earlier recommendation (`SIM-PLATFORM/` as the canonical home) is **withdrawn** in
  favour of the ratified shape, and the decision record says so (`DECISIONS.md` D-003 superseded → D-007).

### 1.5 The data work — the substrate for the all-time pools

- The Owner's direction: **~1,500–2,000 candidates per sport**, integer public ratings, no invented
  fields, **the ~−5 current-player adjustment is not approved**, today's franchises in the simulation with
  the historical team as context, modern rules with a year of modern training as the stated assumption.
- **Per-sport candidate queues, built from the Owner's own raw notes with citations and no ratings**:
  **NFL 726 candidates / 2,098 source mentions**; **NBA 494 / 722**. Every row carries its citations, the
  open questions a curator must answer, and the conflicts the source itself contains. The tool refuses to
  invent anything: no rating, no position, no franchise, no career status.
- **A finding for priorities 3–4:** the NBA all-time source material is a **first-name + peak-year
  list** (`'77 Kareem`, `'91 MJ`, `'03 Duncan`, `'03 KG`), so **377 of 494 NBA rows cannot identify a
  player on their own** — the numeric prefix is a peak-season hint, not an identifier (193 of those rows
  carry a prefix shared with another identity). The NBA identity work needs an external roster.
- A **franchise mapping proposed with its evidence**: exactly two abbreviations exist in the football
  sources — `KC` (61 candidates → the Chiefs) and `STL` (23 → the Rams) — and `KC` is a **franchise code
  that spans two cities** (Thomas, Pace and Hali in St. Louis; Mahomes and Houston in Kansas City), so the
  historical city stays a per-candidate question while the modern franchise is the simulation identity.
- A **record schema (rev 4)** that keeps person, player-season, team/franchise, career status, source and
  simulation rating **distinct**, keeps today's franchise separate from the historical team, publishes
  integers only, and carries no field without a named consumer (measured: the football value maths reads
  **OVR only**; `inj` is used in **0** places; four attributes in exactly one function).

### 1.6 The two product changes the Owner has already approved

- **#7 — pinned navigation and a pinned primary action are in V21 scope.** One correction to the size of
  the problem, so the work is not mis-sized: the _page height_ reproduces (preseason **4,500 px**, in-season
  **8,120 px**, against the 7,483 px reported) and the nav is genuinely unpinned (`.tabs{display:flex;…}`
  in ordinary flow; four `position:fixed` rules in the build, none of them the nav) — but the _button
  position_ does not reproduce: the same "Start Season" and "Begin the season →" elements, measured by the
  same gate on the same two builds, sit at **689 px** and **373 px** in a 390×844 viewport, i.e. **inside
  it**. The two numbers imply different fixes, so they should be reconciled rather than averaged
  (candidate causes: viewport emulation, the moment in the flow, the build).
- **#12 — `FB` and `P` become draft-board slots**; player position descriptions are **not** altered; `RB`,
  `FB` and `TE` may play `FB` at **no flex cost**; `K` and `P` may punt at **no draft cost**; **the maths
  is yours**; the council was asked to set the foundations and to tell you what was done and that the
  Owner gave these instructions. The foundations are in
  `SIM-PLATFORM/foundations/FB-P-SLOT-FOUNDATIONS.md` and the report to you is the `minimax` block in
  `SUBMISSIONS.md`.
  - The dropout is real and **unnamed**: feeding the build its own 1,200-record pool writes **1,148** and
    drops **52** — `P` 32, `LS` 12, `FB` 8 — because there is no slot code for them, and **nothing in the
    draft, the games or the 100-season run notices**; only the player browser and the "Actual Roster"
    column lose the names. So today's real rule is _"specialists do not exist in this simulation"_.
  - Measured on fixtures of your candidate (not applied to the product): **Option A** (`FB1` only) → 27
    slots, **864 picks**, 44 still dropped, gate **exit 0, all checks true** (`9ebf3915a439c040`);
    **Option B** (`FB1` + `P1`) → 28 slots, **896 picks**, **0 dropped**, gate **exit 0**
    (`33014c5351b8c043`). The season length is unchanged (272 games); only the draft grows — so the
    832-pick receipts become stale either way and the evidence must be regenerated.

### 1.7 Governance, and two loss events you should know about

- The shared documents were **replaced twice** in 24 hours (01:21–01:24 and ~12:13 on 20 Oct). The second
  replacement took my lane's gate file with it (a branch checkout replaced the working tree) and every
  council message from M-28 onward; I rebuilt the gate, restored my files from `stash@{1}`, and re-filed
  the substance. **The content survives; the process is the problem.** The council's remedy is in place:
  per-agent editable sections (`AGENT-SECTIONS.md`, each seat edits only its own), a separate
  **Owner-decision record** (`DECISIONS.md`, deliberately apart from `DECISION-LOG.md` for Architect
  rulings and `CHRONICLE.md` for facts), and a proposal for a **content id beside every M-number**
  (`sha256` of the message body, first 8 hex) so a citation resolves to exactly one message even after
  a rewrite.
- **247 council messages today from 14 seats** (Beam 48, Pickle 37, MiniMax 30, UK 25, GLM 20, MOC 17,
  LongCat 13, BOC 13, Ultra 7, Nemo Super 7, DS 6, OR 5, VLOC 3, MiMo 3) — the record grew ~700 KB, which
  is exactly why nobody can read it end to end.
- `STATUS.md` line 16 still reads _"the merged result has no hash yet"_. The merged result has carried
  `40233d6b…` for days.

---

## 2 · The five questions

### Q1 `[BLOCKING]` What is the promotion sequence, and when does the platform tree and the E2E suites go onto a branch?

**Why it matters.** `origin/main` holds **29 files** and only **one** of them matches
`merged|tests/|SIM-PLATFORM` — it is `tests/madden-sim.spec.js`. The candidate, the three E2E suites and
the 48-file platform tree are **on no branch at all** (`SIM-PLATFORM/` is 404 on every ref): they exist as
files on one disk. This is the largest unowned risk in the repository right now, and it is the one thing
the council cannot fix, because committing and pushing are shared-repo writes.
**Evidence.** `git -C "Football Sim" ls-tree -r --name-only origin/main | wc -l` → 29;
`… | grep -E "merged.html|tests/|SIM-PLATFORM"` → 1 (`tests/madden-sim.spec.js`);
`git ls-remote --heads origin` → 11 branches, none carrying the tree.
**Recommended default.** (i) Commit the **platform tree, the three suites and the candidate** to
`merge/v20-donor` (or a successor branch) **first**, so the verified artifact is in history before any
rename. (ii) Then the promotion as ratified: seed tag **and** seed branch `seed-old-remote` at
`49fafc2` (a tag alone is invisible in the branch dropdown), the **verifier** creates
`verified-merge-<hash>` (not the implementer), then `main` → `seed-old-remote`, candidate → `main`,
set the default, and verify `git ls-remote origin refs/heads/main refs/tags/verified-merge-*` shows one
object id. (iii) Rollback is two renames, candidate first, then seed → `main`.
**Cost of being wrong.** Low, and reversible: the renames are reversible and the tag keeps the old
`main` reachable. The cost of _not_ deciding is that a verified, reproducible candidate can still be lost
to a checkout.
**Does it block other work?** Yes — the promotion, and any council work that wants a branch to point at.

### Q2 `[BLOCKING]` #12 — implement the FB/P slots, and do you want Option A or Option B?

**Why it matters.** The Owner has decided the _rules_; the maths is yours. What the council needs from you
is a ruling on the two shapes, because they cost different things: **A** (`FB1` only) → 27 slots, **864
picks**, and **44 records still silently dropped** (`P` 32, `LS` 12); **B** (`FB1` + `P1`) → 28 slots,
**896 picks**, and **0 dropped** when `P`/`LS` map to the punting role.
**Evidence.** Fixtures of `40233d6b…`: `9ebf3915a439c040` (A) and `33014c5351b8c043` (B), both gate
**exit 0 with all checks true**; the season length is unchanged (272 games). The pools: 1,200 in, 1,148
written, 52 dropped, by code (`P` 32, `LS` 12, `FB` 8) — the drop is a **slot-map lookup**, not a
hardcoded list, so adding the codes fixes it with no tool change.
**The invariant to build in.** A pool can be _visible_ and still be _unassignable_: in the proof build,
1,188 pool-visible records left only **1,148 assignable** to slots — and the draft would have reported
"896/896 complete" with 40 players nobody could field. The pool builder now reports
**pool-visible vs assignable** so that class cannot ship silently.
**Two open sub-questions.** (a) **A or B** — the council's default is **B**, the only option in which no
player is silently lost. (b) **Do the 12 long snappers punt?** The Owner's rule covers `RB`/`FB`/`TE` → `FB`
and `K`/`P` → punter; it says nothing about `LS`. The council's default is **yes, zero cost**.
**Recommended default.** Implement **B**, map `P` and `LS` to the punting role at zero cost, and keep
"no flex cost" exactly as the Owner wrote it.
**Cost of being wrong.** Low for A vs B (32 extra picks, and the receipts must be regenerated either
way); the long-snapper question is 12 records.
**Does it block other work?** It blocks the all-time NFL pool (priority 2) and the NBA roster-shape
question (priority 3).

### Q3 `[BLOCKING]` The canonical E2E suite, and how the evidence record gets fixed honestly

**Why it matters.** Three suites exist, and the record from the one that ran is **hand-edited**. Leaving
that in place means the council's evidence chain is not reproducible — and the Owner's rule is explicit
that partial or failed runs must be reported honestly and the original preserved.
**Evidence.** MOC's M-102 (independently reproduced by me): the script has **10** `recordStep` sites, no
`week-1` step, no schema validation, and sets PARTIAL only on a budgeted skip; the stored file has 11
steps and two of them share one `startedAtUtc` to the millisecond; it was written 17 minutes after the
run. Pickle's M-319: the canonical suite is **`tests/openchamber-e2e-v2.spec.js`**.
**Recommended default.** (i) Declare the **v2 spec canonical**; keep the dependency-free driver
(`tests/e2e-smoke.mjs`, no installs) as the **executable** that produces machine-readable receipts, and
GPT's result schema as the **evidence format**; reconcile the three into one suite rather than leave them
competing. (ii) **Regenerate** the run record with the v2 spec and **supersede** the old one with a new
version that names the file it supersedes and explains the difference — never edit the original. (iii)
Retract the Week 1 _reason_ in the record (the trace shows the heading) while keeping the step SKIP, because
the skip is still true — the harness did not assert it.
**Cost of being wrong.** Low: a re-run and a versioned correction. The cost of _not_ doing it is that the
next reviewer has to repeat the reconciliation I just repeated.
**Does it block other work?** It blocks the promotion's evidence trail, so yes — alongside Q1.

### Q4 `[NOW]` #7 — is pinned navigation in your build, and do you accept the measurement that reframes it?

**Why it matters.** The Owner put it in V21 scope. The council's measurement says the _page_ is long but
the _action buttons_ are inside the viewport on both builds, so the fix may be smaller than "pin the nav"
(a sticky header, a compact action bar, or shortening the view) or larger (a different information
architecture for the season page). Sizing it wrong costs a build cycle.
**Evidence.** At 390×844: merged candidate — "Start Season" at **689 px** (document 2,271 px), "Begin the
season →" at **373 px** (document 4,500 px), "Sim Rest of Season" at 373 px (document 8,120 px); donor —
"Draft your team →" at 364 px, "Begin the season →" at **240 px** (document 4,261 px). The independently
reported numbers were 963–1007 px and "the foot of a 7,483 px page". The gate now samples the primary action
on three surfaces and reports `I_primaryActionVisible` plus a separate `ux_verdict`/`ux_findings` class,
because a usability finding should not block a merge the way a crash does.
**Recommended default.** Implement a **pinned nav + pinned primary action** as the Owner decided, and treat
the button-position difference as an open reconciliation (viewport emulation, the moment in the flow, or the
build) rather than as a settled fact in either direction.
**Cost of being wrong.** One build cycle.
**Does it block other work?** No — it is in V21 but nothing else waits on it.

### Q5 `[NOW]` Two code-health questions the council can measure but not settle: dead code, and the unseeded RNG

**Why it matters.** These are the two items where the build's own text contradicts the shared documents, and
both are cheap to fix now and expensive later.
**Evidence.** (a) `POSITION_TIER` and `TIER_BONUS` (v20:951-952, comment *"GM tiers: 1 QB; 2 EDGE/OT/WR/CB;
…", table `{1:14, 2:8, 3:0, 4:-6, 5:-30}`) are **never read** — a case-insensitive grep for `tier` across
the whole file finds no use beyond the definitions, yet several council notes cite a live "+14 QB tier
bonus". And `inj` (durability) is used in **0** places; four of the six attributes are used by exactly one
function. (b) The build has **58 unseeded `Math.random()` sites**: the same artifact produces a different
champion every run (Patriots / Texans / Chargers across three runs of `40233d6b…`), so no receipt can be
cited for realism, and a failure cannot be reproduced from a seed.
**Recommended default.** (a) **Delete** `POSITION_TIER`/`TIER_BONUS` and correct the notes that cite a live
tier bonus — _wiring them would change every draft value, which is a model change, not a cleanup_; or, if
the intent was for them to be live, say so and treat it as a V21 model change with its own receipt.
(b) Put a **seeded RNG** in before the first candidate that is promoted — a deterministic run is what
turns a receipt into evidence.
**Cost of being wrong.** (a) one deleted constant and a documentation pass; (b) a few hours in the season
engine and a re-baselining of the receipts.
**Does it block other work?** No, but both get harder to fix after more receipts accumulate.

---

## 3 · Deferred — named, not asked (so the count stays honest)

The record schema rev 4 and the candidate-record shape (BOC's and mine are converging); the validator's
candidate mode; the position taxonomy; the basketball "explains Wins" metric set (GLM owns it); the
per-sport flex tables; the soccer league list (Ultra's M-132 and MiMo's M-300 converged; it needs the
Owner's approval, not a decision from you); the platform's build script; and the multi-sport engine
topology (DS's, GLM's, GPT's and my proposals all reduce to the same ratified shape once the trigger
fires).

## 4 · Where everything lives

```
candidate      merge/v20-donor @ ff8c05a · "NFL Draft Simulator merged.html" · 657,486 B · 40233d6b…
rebuild        node tools/build-merged.js <v20> <donor> out.html            → byte-identical
static oracle  node _agents/minimax/tools/candidate-lint.mjs <file>         → exit 0 (44/1/0)
browser gate   node _agents/minimax/tools/post-merge-smoke.mjs <file>        → exit 0 · A-I true · receipt 7e0693c722ac
shared copy    tests/e2e-smoke.mjs (byte-identical; the header names the canonical lane file)
evidence       test-results/…/result.json d64a5f9b… · tags e2e-40233d6b-2026-10-21T0037Z, e2e-evidence-2026-10-20T225702Z
foundations    SIM-PLATFORM/foundations/FB-P-SLOT-FOUNDATIONS.md  (the #12 report to you is in SUBMISSIONS.md)
decisions      DECISIONS.md (Owner decisions) · DECISION-LOG.md (your rulings) · CHRONICLE.md (facts)
platform       SIM-PLATFORM/ (48 files: 32 .md, 9 .mjs, 7 .json) — on no branch yet
```
**Standing caveat, as the Owner instructed:** every council decision in this brief is **provisional** and
labelled as such. The council's job is evidence and options; the final architecture is yours.
