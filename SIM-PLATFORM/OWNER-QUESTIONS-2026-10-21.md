# Questions that need the Owner's attention — 21 Oct 2026

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999) | TASK: Owner decision list | DATE: 2026-10-21T08:15:00Z**
_(Five consolidated items, per the Owner's own rule: no more than five at a time, each with a recommended
default and the cost of being wrong. Full context in `DECISIONS.md` and the bulletin.)_

---

## O-1 · The two FB/P slot shapes — and the twelve long snappers

**The choice in plain English.** When the draft board gains the fullback and punter slots you asked for,
does each club get **one new slot** (a fullback) or **two** (a fullback _and_ a punter)?

**Why it matters, and what it blocks.** It decides the size of every draft board, and therefore every
number in the evidence. Measured on fixtures of your merged candidate (nothing applied to the product):

|                                           | slots | rounds |   picks |                players silently lost from the pool | gate                    |
| ----------------------------------------- | ----: | -----: | ------: | -------------------------------------------------: | ----------------------- |
| today                                     |    26 |     26 |     832 | **52** (32 punters, 12 long snappers, 8 fullbacks) | exit 0                  |
| **A — one new slot (fullback)**           |    27 |     27 | **864** |       **44** (the 32 punters and 12 long snappers) | exit 0, all checks true |
| **B — two new slots (fullback + punter)** |    28 |     28 | **896** |                                              **0** | exit 0, all checks true |

Today the sim's hidden rule is _"specialists do not exist"_: those 52 players are dropped by the pool
swap and **nothing in the draft, the games or the 100-season run notices** — only the player browser and
the "Actual Roster" column quietly lose their names. Option A makes the rule explicit for fullbacks and
leaves it in force for punters and long snappers; Option B ends it. The season length does not change
(272 games) — only the draft grows, so **every receipt that says "832 picks" becomes stale either way** and
the evidence has to be regenerated.

**A smaller question inside the same decision.** Your rule covers running backs, fullbacks and tight ends
playing fullback at no flex cost, and kickers and punters punting at no draft cost. It does not say what
happens to the **12 long snappers** — they are neither. The council's default is that a long snapper is a
specialist who can punt at no cost, like a kicker.

**Recommended default.** **Option B** (both slots) — it is the only shape in which no player is silently
lost — and **yes, long snappers may punt at no cost**. Claude implements the maths; the council's
foundations and measurements are in `SIM-PLATFORM/foundations/FB-P-SLOT-FOUNDATIONS.md`, and your
instructions have been relayed to Claude verbatim.

**Cost of being wrong.** Small and bounded: 32 extra picks between A and B, and 12 records in the
long-snapper question. The larger cost is doing nothing — the pool keeps losing specialists silently.

**Does it need an answer now?** The measurement is done and safe work can continue; the answer changes
Claude's build, so it is worth answering before the V21 build starts.

---

## O-2 · The NBA identity source — the all-time NBA pool cannot be built from what we have

**The choice in plain English.** The basketball all-time material in the repo is a **first-name and
peak-year list** (`'77 Kareem`, `'91 MJ`, `'03 Duncan`, `'03 KG`). When you supply the NBA 2K ratings,
should that material also serve as the **identity roster** — the list of _who_ those names are — or do you
want a separate canonical all-time roster (for example the NBA 75 / all-time teams list) that the pool is
checked against?

**Why it matters, and what it blocks.** Measured: **377 of the 494 NBA candidate rows are a single token**
and **193 of them carry a numeric prefix that also names somebody else** — the prefix is a _peak-season
hint_, not an identifier. So the NBA candidate list can be read as people only if it is resolved against
an external roster. Priorities 3 and 4 (the current NBA sim, and the all-time NBA sim) both depend on
that resolution; the NFL side does not, because the football material is full names with citations.

**Recommended default.** **Yes — let the 2K material double as the identity roster**, with the source,
edition and season recorded per player, and add a canonical all-time roster as a cross-check rather than as
the primary source. Every candidate row then carries a citation and an identity that someone can check.

**Cost of being wrong.** A curation pass over ~377 rows. The cost of _not_ deciding is that the NBA
candidate list stays a list of first names.

**Does it need an answer now?** Safe work continues without it (the NFL pool, the schema, the validator);
it needs answering before any NBA pool is assembled.

---

## O-3 · Who publishes the platform tree and the candidate — the repository's biggest open risk

**The choice in plain English.** The merged candidate, the three E2E suites and the 48-file platform
working tree currently exist **only as files on this one disk**: `SIM-PLATFORM/` is on **no branch at
all**, and `origin/main` still holds 29 files, of which exactly **one** matches "the candidate, the tests
or the platform" (it is `tests/madden-sim.spec.js`). Do you want the council to prepare a **commit and a
branch** for the platform tree and the suites (so the verified work is in history before any promotion),
or do you want that to stay a single local copy until the Architect's promotion is done?

**Why it matters.** Two shared-document replacement events have already happened in 24 hours, and one of
them took a council instrument with it. Work that exists on one disk is one checkout away from gone — and
the council cannot fix this itself, because committing and pushing are shared-repo writes.

**Recommended default.** **Let the council prepare the commit and the branch** (a single proposal listing
the exact files, with the platform tree and the three suites landing on the candidate branch), and let you
or the Architect push it. The council will not push unasked.

**Cost of being wrong.** A commit that gets amended later is cheap; losing the tree is not.

**Does it need an answer now?** It is the one thing nobody owns, and every other item is safer once it
is done. It can be answered at any time — it does not block the rest.

---

## O-4 · Approving the soccer league list (the ranking source and cutoff)

**The choice in plain English.** For the football/soccer simulations you want the leagues ranked above
MLS plus MLS itself. Two seats have now converged on a proposal for **the ranking source and the cutoff
date** (Ultra's M-132 and MiMo's M-300). Do you approve that source and date as the list of record, and do
you want the list pinned to that date, or refreshed?

**Why it matters.** Every soccer simulation's identity — which leagues exist, and which era of each — hangs
on this, and 17 leagues × 2 modes is the largest block of work in the programme. A list that moves
underneath the build means the data has to be re-checked on every refresh.

**Recommended default.** **Approve the converged source and cutoff as the list of record, pinned to its
date**, with a re-check rather than a rebuild.

**Cost of being wrong.** One re-check of the league list.

**Does it need an answer now?** It blocks the soccer work only, which is priority 5 — it can wait.

---

## O-5 · The council's own collaboration: six questions asked, none answered yet

**The choice in plain English.** After this round the council asked **six named seats** (Pickle, GLM,
Ultra, MOC, VLOC, BOC) one bounded question each, in their own sections of the shared working file
(`AGENT-SECTIONS.md`). **None has answered yet** — every one of those sections is still the initial stub.
Do you want the council to keep waiting for the seats to answer, or do you want to ask them directly
yourself (or have a coordinator with dispatch capability do it)?

**Why it matters.** What has come back so far has been _convergent_ rather than _responsive_: Pickle
ratified the architecture, MOC found a real defect in my pool builder and reframed #12, and the soccer item
was solved twice over — which is a good sign about the council, but it also means the specific questions
I asked (which record shape is canonical, what the "explains Wins" metric set is, what assertion should
hold for visible navigation, are the Owner's three named records reachable in-tree, a visual check of my
two fixtures, and who owns the record-shape merge) are still open. Those are exactly the questions that
would let the council close its part of the architecture and hand you a final decision rather than a
provisional one.

**Recommended default.** **Have a coordinator with dispatch capability re-send the six questions** —
the ones already framed, with a deadline and a one-line answer format — rather than the council inventing
a second channel. Pickle's batch reached eight sessions and MOC's reached others; my session has no
`session.send`, which is why the questions went through the bulletin.

**Cost of being wrong.** One round of delay on the expansion work; nothing on V21 or the merge.

**Does it need an answer now?** It shapes the next round rather than blocking a build, so it can be
answered whenever — but the sooner the six answers exist, the more of the council's remaining work can
proceed without provisional answers.

---

_Everything above is a council proposal with receipts, not a ruling. The Architect implements and the
Owner decides; the council supplies evidence and options. The decision record is `DECISIONS.md`; the
facts are in `CHRONICLE.md`; the Architect's own rulings are indexed in `DECISION-LOG.md`._
