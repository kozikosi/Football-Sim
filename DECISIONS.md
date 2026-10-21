# DECISIONS.md — the Owner's decision record

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999), recorder for this round | TASK: #8, #15, #16 | DATE: 2026-10-21T03:45:00Z**

**Purpose.** One file for the decisions the **Owner** has made, and the provisional answers the council
has given where she said *"you decide"*. It is the record she asked for in #15. It is deliberately
**separate** from `DECISION-LOG.md` (Beam's index of **Architect** rulings) and from `CHRONICLE.md`
(facts and events). The three do not overlap: **Owner decisions here, Architect rulings there, facts there.**

**Standing caveat, per the Owner's #8 instruction:** *everything the council decides provisionally in
this file is provisional. Claude must review what was done and decide the final architecture.* Each entry
below says so explicitly.

---

## D-001 · 2026-10-21 · Owner — V21 scope: pinned navigation and a pinned primary action
**Decision:** in scope for V21.
**Owner words:** *"Pinned navigation and a pinned primary action."*
**Why it matters:** the app has no navigation placement of its own (`.tabs{display:flex; …}` in ordinary
flow) and the build has four `position:fixed` rules, none of them the nav; on a 390x844 phone the Start
Season button sits at y 963-1007, and in preseason the Begin Season button is at the foot of a 7,483 px
page.
**Effect on the council:** the automated harness clicks elements programmatically, so
`getElementById().click()` succeeds on something no user can see. A check that asks *whether the primary
action is visible* is the missing assertion.
**Council note (not a decision):** the fix is Claude's to implement; the council's job is the assertion
and the evidence, and the v2 E2E spec already asks it.

## D-002 · 2026-10-21 · Owner — architecture: council decides for now, Claude ratifies
**Decision:** the council decides the working topology for now, and **every document the council writes
must state what was done and that Claude must review it and decide the final architecture.**
**Council's provisional topology (see D-003), and the standing caveat:** Claude reviews and decides.

## D-003 · 2026-10-21 · council provisional — SUPERSEDED 21 Oct (see D-007) and re-adopted in the ratified shape
**Original provisional decision (superseded, kept for the record):** **`SIM-PLATFORM/` is the single canonical home** for the expansion programme,
and the five other topologies are **named non-authoritative**:
`sports/` (2 authored fixtures, no owner) · `shared/` (0 files) · `core/` (0 files) ·
`datasets/` (1 file) · `sims/` (0 files, 4 prepared subdirectories) · `Sim/` (0 files — and it was
**not** empty at 01:38Z, something emptied it mid-session).
**Two traps named explicitly:** (a) `Sim/` and `sims/` differ by one letter, both are empty, and a
session that guesses wrong writes where nobody reads; (b) `FOLDER_STRUCTURE_RECOMMENDATION.md` opens by
calling `core/` "the current approach" — a directory that has never held a file. Following that document
creates a seventh topology.
**Receipt:** directory census above (measured, not read from docs); `SIM-PLATFORM/` = 48 files, the only
live tree, and it carries its own claim board.
**Cost of choosing wrongly:** the platform folder names are half a build's identity, and every hash in the
record is paired to a path. **Claude must review and decide the final architecture.**

## D-004 · 2026-10-21 · Owner — #12: FB and Punter become draft-board slots
**Decision:** `FB` and `P` are created as slots on the draft board. **Player position descriptions are not
altered.** `RB`, `FB` and `TE` may play `FB` at **no flex cost**; `K` and `P` may punt at **no draft
cost**. **Claude implements the math;** the council may lay the foundations.
**Council work done (foundations, measured, not applied):**
`SIM-PLATFORM/foundations/FB-P-SLOT-FOUNDATIONS.md`. Measured on fixtures of the merged candidate:
Option A (`FB1` only) → 27 slots, **864 picks**, 44 records still dropped, gate **exit 0, all checks
true**; Option B (`FB1` + `P1`) → 28 slots, **896 picks**, **0 dropped**, gate **exit 0, all checks
true**. Currently 26 slots / 832 picks / **52 dropped** (`P` 32, `LS` 12, `FB` 8).
**Open sub-questions for the Owner/Claude:** A or B (default **B**); and whether the **12 long snappers**
play the punting role (default **yes, zero cost**).
**Reporting line (Owner instruction):** the Owner gave these instructions directly; Claude is to be told
what was done and that she specified them.

## D-005 · 2026-10-21 · Owner — #15: per-seat editable spaces; delete antiquated, preserve relied-upon
**Decision:** the council may decide and execute; **no comment or contribution from DS, Pickle, GLM,
Ultra, GPT, MiniMax, Super, OR, VL or Beam may be deleted**; and because the append-only bulletin cannot
be read end to end, **each agent gets its own space where they may delete and edit their own responses
but cannot edit anyone else's**. Agents are encouraged to delete clearly antiquated comments, and to
preserve anything that was relied upon, directly referenced by others, or that made it into the
architecture.
**Executed:** the surface the Owner asked for **already existed** — Beam's `AGENT-SECTIONS.md` (per-agent
sections, the bulletin left append-only, and Beam's own rule *"agents may delete clearly antiquated comments
from their own section"* while preserving anything relied upon or that reached the architecture). I created a
duplicate folder, measured that it was a seventh competing topology, and **deleted it**; the council uses
`AGENT-SECTIONS.md`, and this round's entry is in the `minimax` section. *This file (`DECISIONS.md`) is the
Owner-decision record the Owner authorised; `DECISION-LOG.md` remains the Architect-ruling index and is
untouched.*

## D-006 · 2026-10-21 · council provisional — #16: where the truth lives
**(a) Is `main` the record, or a branch?** *Provisional: `main` is the record, and the missing pieces must
be committed to it.* Measured: `origin/main` holds 29 files, and only **one** of them matches
`merged|tests/|SIM-PLATFORM` — the candidate build, the E2E suites and the whole platform tree are **not
on `main`**; `SIM-PLATFORM/` is on **no branch at all** and exists as 48 files on this disk only. That is
the largest single risk in the repository right now.
**(b) Does a 1,200-record pool go in git or in release assets?** *Provisional: **in git** (generated,
hashed, pinned by the release/tag), because the build consumes it at build time and the E2E evidence must
be reproducible from a commit. Release assets for the **63 MB trace** and the **screenshots**, not for the
pool.
**(c) Which of the three E2E suites is canonical?** *Provisional: **the dependency-free driver**
(`tests/e2e-smoke.mjs`, mine) is the canonical *safety net*, because it runs with no install and exits
0/1/4 per `tests/CONTRACT.md` v2; **GPT's `tests/openchamber-e2e.spec.js`** is the canonical *protocol and
evidence schema*; and **the v2 spec (`tests/openchamber-e2e-v2.spec.js`)** is the canonical *assertion
set* — it is the only one that asks whether the primary action is visible, which is exactly the D-001
defect. The three should be reconciled into one suite rather than left competing.
**Claude must review and decide the final architecture.**

## D-007 · 2026-10-21 · council — the architecture decision, re-adopted in Pickle's ratified shape (M-319)
**Decision (council, provisional; Claude ratifies):** adopt **Pickle's M-319 ratification** of DS's Option A
— one repository, one folder per simulation, `shared/` **deliberately empty** until a written extraction
trigger fires, the five competing topology directories named non-authoritative, and the shipping file
never moved (GLM's no-touch rule).

**The path shape (Pickle's naming, not DS's `sports/`):**
```
sims/<sim>/product/    the self-contained HTML build for that sim (one filename per build)
sims/<sim>/pool/       that sim's data input, build-time, never hand-edited in place
sims/<sim>/README.md   what it is, its build hash, its E2E suite, its trigger status
```
**The council's measured census, attached as the supporting evidence** (each count in files, this
session): `core/` **0** (never populated — the "core engine" in `FOLDER_STRUCTURE_RECOMMENDATION.md` has
never existed in practice, and that document opens by calling it "the current approach"); `sports/` **2**
(quarantined stubs); `datasets/` **1** (a schema, superseded in practice by `SIM-PLATFORM/data/schema/`'s
three); `sims/` **0** (elected as the destination, empty by decision, not by accident); `Sim/` **0** (a
naming race already lost — one letter from `sims/`); `SIM-PLATFORM/` **48** (32 `.md`, 9 `.mjs`,
7 `.json`) — named **non-authoritative by scope, not by emptiness**: it is the research and proposal
layer the sim folders will draw from, not the product structure.
**Two amendments for review:** (a) the per-sim destination is `sims/`, **not** `sports/`, because
`sports/` is one of the quarantined stubs; (b) the council's earlier recommendation that
`SIM-PLATFORM/` be "the single canonical home" is **withdrawn** in favour of the ratified shape — the
research layer keeps its name and its role, and the *product* structure is `sims/<sim>/`.
**Nothing moves this round.** A sim folder receives a **copy**, never a move, and every path in the
record is paired to a hash. **Claude must review and decide the final architecture.**

## D-008 · 2026-10-21 · council — the canonical E2E suite, amended per Pickle (M-319)
**Decision (council):** the canonical suite is **`tests/openchamber-e2e-v2.spec.js`** (Pickle's M-319),
not the original `tests/openchamber-e2e.spec.js`. The dependency-free driver
**`tests/e2e-smoke.mjs`** is the *executable* that produces receipts with no install (and now also
measures the primary action — see the receipt fields `I_primaryActionVisible`, `ux_verdict`,
`ux_findings`); GPT's result schema is the *evidence format*. The three are reconciled into one suite
rather than left competing.
**Also recorded:** `STATUS.md` line 16 still reads *"the merged result has no hash yet"* — the merged
result has carried `40233d6be00e987c…` for days. One line, and it is the tell that the record is
stale.

---

## How to use this file
* Append an entry; never rewrite an earlier one. Supersede with a new entry.
* Every entry names the decision-maker (Owner / Architect / council provisional), the evidence, and the
  cost of choosing wrongly.
* A council-provisional entry is **not** a ruling. It is a proposal with receipts, and it says so.
