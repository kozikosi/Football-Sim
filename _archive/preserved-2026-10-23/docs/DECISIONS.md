# DECISIONS.md — the Owner's decision record

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999), recorder for this round | TASK: #8, #15, #16 | DATE: 2026-10-21T03:45:00Z**

**Purpose.** One file for the decisions the **Owner** has made, and the provisional answers the council
has given where she said _"you decide"_. It is the record she asked for in #15. It is deliberately
**separate** from `DECISION-LOG.md` (Beam's index of **Architect** rulings) and from `CHRONICLE.md`
(facts and events). The three do not overlap: **Owner decisions here, Architect rulings there, facts there.**

**Standing caveat, per the Owner's #8 instruction:** _everything the council decides provisionally in
this file is provisional. Claude must review what was done and decide the final architecture._ Each entry
below says so explicitly.

---

## D-001 · 2026-10-21 · Owner — V21 scope: pinned navigation and a pinned primary action

**Decision:** in scope for V21.
**Owner words:** _"Pinned navigation and a pinned primary action."_
**Why it matters:** the app has no navigation placement of its own (`.tabs{display:flex; …}` in ordinary
flow) and the build has four `position:fixed` rules, none of them the nav; on a 390x844 phone the Start
Season button sits at y 963-1007, and in preseason the Begin Season button is at the foot of a 7,483 px
page.
**Effect on the council:** the automated harness clicks elements programmatically, so
`getElementById().click()` succeeds on something no user can see. A check that asks _whether the primary
action is visible_ is the missing assertion.
**Council note (not a decision):** the fix is Claude's to implement; the council's job is the assertion
and the evidence, and the v2 E2E spec already asks it.

## D-002 · 2026-10-21 · Owner — architecture: council decides for now, Claude ratifies

**Decision:** the council decides the working topology for now, and **every document the council writes
must state what was done and that Claude must review it and decide the final architecture.**
**Council's provisional topology (see D-003), and the standing caveat:** Claude reviews and decides.

## D-003 · 2026-10-21 · council provisional — SUPERSEDED 21 Oct (see D-009) and re-adopted in the ratified shape

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
sections, the bulletin left append-only, and Beam's own rule _"agents may delete clearly antiquated comments
from their own section"_ while preserving anything relied upon or that reached the architecture). I created a
duplicate folder, measured that it was a seventh competing topology, and **deleted it**; the council uses
`AGENT-SECTIONS.md`, and this round's entry is in the `minimax` section. _This file (`DECISIONS.md`) is the
Owner-decision record the Owner authorised; `DECISION-LOG.md` remains the Architect-ruling index and is
untouched._

## D-006 · 2026-10-21 · council provisional — #16: where the truth lives

**(a) Is `main` the record, or a branch?** _Provisional: `main` is the record, and the missing pieces must
be committed to it._ Measured: `origin/main` holds 29 files, and only **one** of them matches
`merged|tests/|SIM-PLATFORM` — the candidate build, the E2E suites and the whole platform tree are **not
on `main`**; `SIM-PLATFORM/` is on **no branch at all** and exists as 48 files on this disk only. That is
the largest single risk in the repository right now.
**(b) Does a 1,200-record pool go in git or in release assets?** *Provisional: **in git** (generated,
hashed, pinned by the release/tag), because the build consumes it at build time and the E2E evidence must
be reproducible from a commit. Release assets for the **63 MB trace** and the **screenshots**, not for the
pool.
**(c) Which of the three E2E suites is canonical?** *Provisional: **the dependency-free driver**
(`tests/e2e-smoke.mjs`, mine) is the canonical _safety net_, because it runs with no install and exits
0/1/4 per `tests/CONTRACT.md` v2; **GPT's `tests/openchamber-e2e.spec.js`** is the canonical _protocol and
evidence schema_; and **the v2 spec (`tests/openchamber-e2e-v2.spec.js`)** is the canonical _assertion
set_ — it is the only one that asks whether the primary action is visible, which is exactly the D-001
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
research layer keeps its name and its role, and the _product_ structure is `sims/<sim>/`.
**Nothing moves this round.** A sim folder receives a **copy**, never a move, and every path in the
record is paired to a hash. **Claude must review and decide the final architecture.**

## D-008 · 2026-10-21 · council — the canonical E2E suite, amended per Pickle (M-319)

**Decision (council):** the canonical suite is **`tests/openchamber-e2e-v2.spec.js`** (Pickle's M-319),
not the original `tests/openchamber-e2e.spec.js`. The dependency-free driver
**`tests/e2e-smoke.mjs`** is the _executable_ that produces receipts with no install (and now also
measures the primary action — see the receipt fields `I_primaryActionVisible`, `ux_verdict`,
`ux_findings`); GPT's result schema is the _evidence format_. The three are reconciled into one suite
rather than left competing.
**Also recorded:** `STATUS.md` line 16 still reads _"the merged result has no hash yet"_ — the merged
result has carried `40233d6be00e987c…` for days. One line, and it is the tell that the record is
stale.

---

## How to use this file

- Append an entry; never rewrite an earlier one. Supersede with a new entry.
- Every entry names the decision-maker (Owner / Architect / council provisional), the evidence, and the
  cost of choosing wrongly.
- A council-provisional entry is **not** a ruling. It is a proposal with receipts, and it says so.

## D-009 · 2026-10-21 · Owner — work is suggested, never assigned

> "Not all agents are always available at all times. Work shouldn't be assigned specifically to other agents. Work should be suggested and then picked up by whoever is idle and available to work."

**What changes:** a coordinator may publish a **work pool** — the item, its scope, its evidence requirement, and the claim rule — but may not direct a named session to take it. A seat claims by posting a line, and reports back to the pool's owner.

**Cost of the old way:** a brief sent to a busy or rate-limited session dies silently, and the coordinator records it as "dispatched" when nothing will arrive. Two sessions failed that way this round (Pickle and MiMo, rate limit) while nine others sat idle.

**Exception:** a single recipient is correct when the work is *about* that session's own output — a correction to its note, a reply to its question.

---

## D-010 · 2026-10-21 · Owner — toolchain: Biome, Mermaid, Figma

**Owner's instruction:** Claude is set up with all three and should use them; the council may use Biome and Mermaid too, but not Figma.

**Measured state on this machine (VERIFIED):**

| Tool | Config | Binary | Consequence |
|---|---|---|---|
| Biome | `biome.json` exists at root (schema 2.6.2; scopes to `tests/**`, `_agents/**/tools/**`, `tools/**`; excludes the product) | **none** — not on `PATH`, not in `node_modules/.bin`, not a global npm package, not in `package.json` devDependencies (which lists only `@playwright/test`) | the config cannot be run by anyone until `npm i -D @biomejs/biome` |
| Mermaid | 5 files carry ` ```mermaid ` fences | `mmdc` absent | renders on GitHub, cannot be built or checked locally |
| Figma | no config in `.openchamber/` or at root | not reachable from council sessions | Claude-only, if at all |

**Decision:** the `biome.json` rules stand as proposed. Add the binary as a devDependency before any session claims a lint task, otherwise "ran Biome, clean" is unfalsifiable.

### Correction to D-010 · 2026-10-22

**Biome is now installed and works.** `npx --no-install biome --version` → **2.6.2**. The "no binary" row above is stale; the conclusion it drew ("the config cannot be run by anyone") no longer holds. Mermaid CLI is still absent; Figma is still not reachable from council sessions.

---

## D-011 · 2026-10-22 · Owner — naming: the build is V22

**Owner's ruling, verbatim:** *"No I want the new build that Claude is working on to be called v22. I don't care what the previous build was called."*

**Decision.** The build Claude produces from `V22-Suggestions.md` is **V22**. The file it is built from is "the working file", not a version. V20 is an older reference and nothing more. No document may call the current build V21.

**Applied:** `AGENTS.md` §2 table and §14 product files, both now carrying *"Do not name the current build V20 or V21. It is V22."*

**Why this was urgent:** the constitution had been carrying *"Current candidate (V21)"* while the work order is titled V22 and the deliverable is `Football-Sim-V22.html`. Three names for one build is how the wrong file gets edited.

---

## D-012 · 2026-10-22 · Owner — the 3-4 base and the Nickel substitution

**Owner's ruling, verbatim:** *"This is not true. 'CB3/Nickel comes on, LB3/SAM comes off' in a 3-4. One defensive tackle is replaced by an extra middle linebacker in 3-4."*

**Decisions, both binding:**

1. **The base difference.** Relative to the 4-3, the 3-4 **replaces one defensive tackle with a second inside linebacker.** The converted slot is therefore **DT2 → ILB2**, carrying MIKE's value. The SAM role is worn by **OLB2**, carrying WILL's value. The council's earlier mapping (SAM→ILB2, DT2→OLB2) had these swapped and is superseded.

2. **The Nickel substitution is base-dependent.**
   - **4-3** — CB3/Nickel comes on, **SAM (LB3) comes off.**
   - **3-4** — CB3/Nickel comes on, **the nose tackle (DT1) comes off**; all four linebackers stay on the field.

**Prohibition:** no document, menu or guide may write *"LB3/SAM comes off"* without naming the base. In a 3-4 there is no SAM to come off.

**Applied in `V22-Suggestions.md` at five sites:** canonical `P0-17`, the `P10-2` mapping code block, its value-mapping comment, two archive entries, and the Appendix K index row. Broadcast to all ten reachable council sessions.

**Open, for Claude:** whether the value mapping is implemented as aliases of WILL/MIKE or as new slot codes — unchanged by this ruling, and still the implementation question in `P10-2`.

## D-013 · 2026-10-22 · Owner — `Football-Sim-V21.html` is the baseline snapshot

**Owner's ruling:** *"Please rename what you think is the best version of the full html now to Football-Sim-V21.html... After you feel completely satisfied with future agents architecture and you complete the build for the new html, it will be called Football-Sim-V22.html."*

**Decision.** `Football-Sim-V21.html` is the **baseline snapshot** — the working file as it stands today. It is a **copy**, not a rename: a rename breaks every patch reference and the build pin. Created 2026-10-22 by DS, byte-identical to `NFL Draft Simulator merged.html` (`044d1759…`, 656,746 B), `node --check` exit 0.

`Football-Sim-V22.html` is Claude's finished deliverable and **does not exist yet**.

The in-development build is called **V22**. Neither product file may be renamed, copied or deleted by anyone but Claude.

---

## D-014 · 2026-10-22 · Owner — edge is one position

**Owner's ruling:** *"LEDG/REDG don't matter at all. We don't care about left or right."*

**Decision.** Edge is a single position. No valuation, weight, flex rule or simulation decision may branch on left-vs-right edge. The build carries 8 `LEDG`/`REDG` references, all in the `PLAYERS` data at l.449; they are data labels, not a maths fork. Reported by MOC as P1 of the open queue.

---

## D-015 · 2026-10-22 · Owner — punter and fullback valuation

**Punter:** worth **≈1** on the model-weights scale; *"Claude determines punter's value but probably 1."* Already true — `DEFAULT_WEIGHTS` carries `"P": 1`. No constant changes; confirm `modelWeights()` derives it rather than hard-codes it.

**Fullback:** *"FB get a much heavier block spec than a RB."* `RATING_SPECS` gains an FB contribution weighted toward **run blocking**; it must not reuse the `rb` unit. Claude designs the weights.

---

## D-016 · 2026-10-22 · Owner — "Value here" leaves the UI

**Owner's ruling:** *"Remove 'Value here' completely from the website. If it is part of mathematical formats it should remain but it shouldn't be visible anywhere on the website."*

**Decision.** Every visible string goes; `r.v` stays computed if the maths uses it. Five live sites: Guide strings l.4991, l.4992, l.5056; board column header l.426; row render l.1766.

This is a **removal**, not a relabel — it supersedes the earlier "rename it" framing.

---

## D-017 · 2026-10-22 · Owner — stars-of-the-game thresholds

**Owner's ruling:** *"60 yards rushing for all players. At least 300 yards and 3/1 TD ratio for QBs to be mentioned as stars."*

**Decision.** Replace the `impact >= 1.0` gate in `starsParagraph()` (l.3027) with explicit thresholds:
- **All players:** 60 rushing yards.
- **Quarterbacks:** ≥300 passing yards **and** a TD:INT ratio of at least 3:1.

Not yet in the build. Also applies to `starsFaceoffHTML()` (l.5397) and `fragSeasonStars()` (l.5595). These are the only new numbers in the 22 Oct batch and need a seeded check.

---

## D-018 · 2026-10-22 · Owner — the 3-4 is a toggle, not a commitment

**Owner's ruling:** *"the 3-4 allows the user to swap out a DT for another Linebacker. This should be a toggle or maybe be a recommended thing based on what is left on the draft board."*

**Decision.** The DT-for-LB exchange is a **user switch**, optionally recommended from board strength — not baked into the roster at draft time. Combined with D-012: the swap is `DT2 → ILB2`, and in the 3-4 the Nickel package removes the nose tackle rather than a linebacker.

Not yet in the build; the base-defense package sits at l.2221–2223.

---

## D-019 · 2026-10-22 · Owner — the open-queue rule

**Owner's ruling:** *"Because some agents will be occasionally limited by rate limits, no specific assignment should ever be assigned to a specific agent. All tasks should be posted openly and whoever is available will begin working on the tasks in priority."*

**Decision.** This supersedes any dispatch template that asks for "one distinct assignment per session". Tasks go in an open queue; a seat takes the highest it can do, posts in the bulletin that it took it, and does it. Third statement of the same rule (D-009 was the first two).
