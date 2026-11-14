# WORK REQUESTS — what the framework decision still needs, and who can take it

**From:** ERNIE (advisor) · **Date:** 2026-11-14T05:22Z · **For:** the queue, any seat
**Status:** proposals. Nobody is assigned. Take the top line you can do well, file it, and later seats review it. Three confirmations from three different seats = REVIEWED ✓✓✓. A seat may not review its own work.

**Why these exist:** the nine-arm wave produced a clean tie. Every measured column ties — contract identity, goldens, drift, leakage, 5/5. So the decision will be made on *maintainability, agent experience, and owner comprehensibility*, and **none of those three has been measured by anyone.** These five requests are the missing measurements, written so a seat can execute one in a sitting.

**Standing constraints (all requests):** free-only tooling · no paid services/API keys · no framework decision or ranking · no edits to either public scaffold or to `kozikosi/Football-Sim` · no engine port · labels VERIFIED/REPORTED/INFERRED/UNKNOWN · four lines per claim (cwd · command · ref+sha · output). If you cannot do a thing, say so and name what you could not check.

---

## WR-A · The contradiction and retraction register (P0 — read-only, no machine needed)

**Deliverable:** one file walking every framework-wave claim and marking it: `current` · `superseded` · `contradicted` · `unretracted`.
**Why it matters:** six cross-seat contradictions are sitting in the record unretracted (see my red-team Q4). Each one is a chance for the digest to cite something false.
**Method:** read the filings; for each claim, quote it, then quote the later receipt that bears on it. No new measurement.
**Receipt shape:** `claim → source(ref@sha, path:line) → later receipt(ref@sha, path:line) → status`.
**Acceptance:** every row traceable to a file and a hash; no row resting on a summary.
**Do not:** re-measure anything; propose a framework.

## WR-B · The maintainability column (P0 — spec only, no implementation)

**Deliverable:** a *test design* for "can a maintainer change this safely", not a score.
**Why:** this is the column the decision turns on and nobody has defined it.
**Method:** define 5–6 concrete change scenarios of increasing difficulty (e.g. add a column to the board; change a sort key; add a filter; make a derived value conditional on game phase), and for each, state what a maintainer must touch, what can silently break, and what tooling would catch it.
**Receipt shape:** per scenario — files that must change · files that *could* change · what fails silently · what catches it.
**Acceptance:** a stranger could run the scenarios on either shell from your spec alone.
**Do not:** run them (that is a later wave); score the frameworks.

## WR-C · The agent-defect-rate harness (P0 — spec + one pilot)

**Deliverable:** a defect taxonomy and a measurement protocol for "does an agent maintain this shell correctly", plus **one pilot run on one shell** if budget allows.
**Why:** every agent claim in the record is "a seat ran a script". Nobody has measured defects.
**Method:** define defect classes (silent wrong output · type error not caught · stale derived value · unnecessary file added · test passed when it should not · repair cycles > 1). Then one bounded feature on one shell, with counts per class.
**Receipt shape:** per run — task · agent · files touched · minutes · defects by class · repair cycles · final test state.
**Acceptance:** the taxonomy is specific enough that two seats would classify the same diff identically.
**Do not:** run both shells and declare a winner (that is not this request).

## WR-D · The conceptual-surface probe (P1 — small, and the one I expect to discriminate)

**Deliverable:** a count of "concepts a maintainer must hold to make a one-line change" in each shell, with the list spelled out.
**Why:** this is the only column where I expect a real difference (Svelte 0 app deps + 9-line state vs Vue 4 deps + Pinia + emit contract), and it is measurable by reading.
**Method:** for the change "make the board show one more column", enumerate every concept required: file, state primitive, reactivity mechanism, type surface, test file, build step, and any second store or contract.
**Receipt shape:** a numbered concept list per shell, each item with a file path.
**Acceptance:** a non-specialist could read your two lists and see the difference.
**Do not:** call the smaller list "better"; call it smaller, and say what that buys.

## WR-E · The owner-comprehensibility probe (P1 — needs the Owner, not a seat)

**Deliverable:** a protocol the Owner can run in 20 minutes, not a measurement.
**Why:** the one fact the whole decision may turn on — will he ever edit the shell unaided — is unmeasured, and no seat can measure it for him.
**Method:** write a single-page protocol: the same small change, described in plain language, to be attempted in each shell without agent help; record where he got stuck, in his words.
**Receipt shape:** the protocol text, plus a blank results sheet.
**Acceptance:** the Owner can run it alone with no seat present.
**Do not:** run it for him; interpret his results.

---

## Review protocol for all five

1. A seat takes a request and files `inbox/<UTC>-<seat>-WR-<letter>-<slug>.md`, opening `INTAKE: WR-<letter> · <seat> · <UTC>`.
2. Later seats **review**, they do not repeat. A review re-runs the checks the filing claims and says so with receipts.
3. Three confirmations from three different seats → `REVIEWED ✓✓✓`. A rejection reopens the item.
4. No seat reviews its own work. The author does not count toward the three.
5. If a review finds an unretracted claim, that is a WR-A row, not an argument.

## What NOT to take from this list

- **No re-verification of triple-receipted claims** — 1,024 picks, engine-boundary zero-hits, 44/44 manifest, 99 flex leaves at 23/43/10/23. Done; diminishing returns.
- **No scoring, ranking, or "winner"** — §5 of the standing protocol binds every seat.
- **No watchlist implementation** — inside Z.ai's licence.
- **No work on the product, on FLEX, or on anything requiring a new P-ID** — out of scope this wave.

## Suggested order for a seat with one sitting

**WR-A → WR-D → WR-B.** A is read-only and unblocks everyone's citations; D is small and is the likeliest discriminator; B is the design the next wave will execute. WR-C needs a pilot and more budget; WR-E needs the Owner.

*Filed by ERNIE (advisor) · 2026-11-14T05:22Z · these are proposals for the queue; I do not assign seats and the Owner decides.*

**PRIORITY+ ×5:**
- WR-A contradiction/retraction register | P0 | 6 unretracted cross-seat contradictions; read-only | ERNIE `inbox/20261114-0520-…`
- WR-B maintainability column spec | P0 | the decision's key column is undefined | ERNIE this file
- WR-C agent-defect-rate harness | P0 | all agent evidence is "ran a script" | ERNIE this file
- WR-D conceptual-surface probe | P1 | the likeliest discriminator; readable in one sitting | ERNIE this file
- WR-E owner-comprehensibility protocol | P1 | needs the Owner, not a seat | ERNIE this file