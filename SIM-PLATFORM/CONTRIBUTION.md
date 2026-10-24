# CONTRIBUTION.md — how to contribute to the platform without stepping on anyone's toes

**MiniMax (S-1900–1999) · 20 Oct 2026 · for every council member, especially anyone starting on an
expansion project tomorrow.** Read this once. It is the difference between a council that ships and a
council that collides.

---

## 0. Sixty seconds, if you read nothing else

1. **Read** `VISION.md` (what the Owner wants), `ARCHITECTURE.md` (the shape and why), and this file.
2. **Look at** `OWNERSHIP.md`. If the project you want is unclaimed, **claim it** there (one line,
   append-only) and start. If it is claimed, **do not touch its lane** — find a sub-part that is not
   claimed, ask, or do the work that helps everyone (a dataset, a tool, a review).
3. **Put your work in your own lane**, `_agents/<your-name>/`, until the Architect merges it. Shared
   documents get **appended**, never rewritten.
4. **Finish with a receipt**: the command that produced your number, the file and line it is about,
   and the build hash it was measured on. "It works" is not a receipt.
5. **When you are unsure about a concept, ask the Owner** through the question channel
   (`tools/owner-questions.mjs`) rather than guessing and building 1,200 wrong records.

## 1. The five rules, and why each one exists

**Rule 1 — The product files are read-only to every advisor.**
The Architect implements; everyone else advises. This is not a trust issue, it is a _reviewability_
issue: one implementation stream means one review trail, one set of gates, and a merge that can be
verified. (Council history: the 17-function merge surface, the hash pins, the 100-season crash — all
of them were tractable precisely because there was exactly one build in flight.)

**Rule 2 — Claim before you start.**
Write your name on the claim board _before_ you create files, so two people never build the same
thing. The board is append-only: one line per claim, no editing others' lines. A claim is not a
lock — it is a promise to tell people what you are doing.

**Rule 3 — Your lane is yours.**
`_agents/<your-name>/` is yours. Other seats read it; nobody writes in it. If you need to change
someone else's file, ask them first (this is R5, and it stays in force here). The exception the Owner
grants for the platform folder: `SIM-PLATFORM/` is a _shared platform_ area with the rules below, and
it has an ownership map in `OWNERSHIP.md` for exactly that reason.

**Rule 4 — Append, never rewrite.**
Shared documents grow. If a line is wrong, append a correction that cites the line's content or its
ID. This is not pedantry: the council has already lost a rebuilt bulletin, a lost question pack and a
lost M-number, and every one of those losses was caused by a rewrite. The record is the product here.

**Rule 5 — A claim without a command is not a claim.**
Every number, verdict and "it works" carries the command that produced it, the file and line it is
about, and the build hash it was measured on. If you cannot re-derive it, label it _reported_,
_inferred_ or _unverified_. This is the habit that made the football sim's merge decidable in a day.

## 2. Where the work lives

| Kind of work                                                       | Lives in                                                             | Who writes it                              |
| ------------------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------ |
| Advisory, notes, receipts, evidence                                | `_agents/<your-name>/`                                               | you, alone                                 |
| A simulation's data, profile and pack source                       | `SIM-PLATFORM/projects/<n>-<slug>/` and `SIM-PLATFORM/data/<sport>/` | the lane's owner, after claiming           |
| Platform-wide tools (validators, builders, the question generator) | `SIM-PLATFORM/tools/`                                                | whoever claims that tool in `OWNERSHIP.md` |
| The engine (stage 2+)                                              | `SIM-PLATFORM/engine/`                                               | the Architect, from accepted proposals     |
| The product HTML files                                             | the repo root                                                        | **the Architect only**                     |
| The vision, the priorities, the permissions                        | the Owner                                                            | the Owner                                  |

## 3. The claim board, and how to claim

`OWNERSHIP.md` is append-only. A claim is one row:

```
| project / artefact | seat | claimed (date) | status | one line of intent |
```

- **Claim the smallest thing you can finish.** "NBA all-time ratings: guards (150 players)" is a
  better claim than "the NBA sim".
- **Claim before you start, not after you have files.** A late claim is still a claim — just say so
  in the row.
- **A claim can be released.** Add a row: `released — reason`. People move on; that is normal and
  not a failure.
- **Unclaimed ≠ free-for-all.** If nobody has claimed the MLB pool, you may _propose_ a claim for
  it in the board, but the pool's rating rubric should be agreed first (see `DATASET.md`).

## 4. The four gates — what "done" means here

Every contribution lands through the same gates. They are the same gates the football merge uses,
extended to data.

| Gate                     | What it checks                                                                                                             | Tool                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **1 · Data**             | schema, ranges, duplicates, position coverage, OVR distribution, the "-5 current" rule, provenance present                 | `tools/validate-dataset.mjs`                       |
| **2 · Static oracle**    | the protected symbols, the profile values, the surface couplings, the text-level debt                                      | `tools/candidate-lint.mjs` + `MERGE-MANIFEST.json` |
| **3 · Dynamic gate**     | a full run in a real browser: draft → season → playoffs → report, 390 px element-level overflow, zero uncaught page errors | `tools/post-merge-smoke.mjs`                       |
| **4 · The Owner's pass** | the Owner looks at it and says whether it is beautiful and right                                                           | human, last                                        |

You do not need all four to make a contribution. **Gate 1 is enough for a data contribution** (your
records are valid and documented). **Gates 2–4 belong to whoever assembles the pack.** Do not run
someone else's lane's gates for them; do make yours pass the gate that applies to you.

## 5. Data contribution conventions (this is where most of the work will be)

- **One record shape.** `data/schema/player-record.schema.json` — the same 10 fields the current
  build uses: `name, pos, team, ovr, spd, str, agi, cod, inj, awr`. The NBA uses the same fields
  with its own position codes. Do not invent a new shape for your sport; extend the schema by
  appending, and say so in the PR note.
- **Provenance per record.** Each record says where its numbers came from: NBA2K export + date +
  mapping version, or "council rating — raters: a, b; rubric v1". A pool of 2,400 hand-made numbers
  is worthless later if nobody can tell which were guesses.
- **Rate independently, then reconcile.** For council-rated pools, each player is rated by at least
  two people, independently; disagreements above 5 points go to a third. `tools/rating-worksheet.mjs`
  produces the worksheet and aggregates submissions (median + a disagreement report).
- **Calibrate.** Every new rater rates a 30-player calibration set first (`DATASET.md` §4). A rater
  who puts a league-average player at 88 is not wrong, they are _uncalibrated_ — and the difference
  matters when the whole pool depends on it.
- **One pool per file, one commit per batch.** `data/nfl/all-time.json`, batches of 50–150 records,
  each with a note: "150 NFL legends, ratings from rubric v1, raters: X, Y, Z; calibration
  discrepancy 1.4 points."

## 6. The eight situations that cause collisions, and what to do in each

1. **"The file I need to change is in someone else's lane."** → Ask. Message them with the exact
   line and the smallest change you propose. Nine times in ten the answer is "yes, do it and tell
   me".
2. **"Two of us started the same thing."** → Whoever claimed first keeps it; the other moves to the
   adjacent slice and offers a review. No blame, no drama, no duplicate artefacts.
3. **"I found a bug in someone else's work."** → Do not edit it. Write it up where the owner will see
   it (your lane + a board note), with the command that reproduces it. Bugs found by peers are the
   cheapest bugs you will ever get.
4. **"The shared document is missing my section."** → Re-append it, then write down what happened and
   how it was lost. The council has three such reports already; that is how the freeze and the
   mirror rules exist.
5. **"I need a number from the Architect's build."** → Ask for the hash and the line; do not read the
   product file as if it were yours to measure... except that reading is fine and encouraged. Reading
   is free. _Editing_ is not.
6. **"My change is ready but the Architect is busy."** → Post it as a complete, self-contained
   proposal with receipts, so it can be picked up without a conversation. Ten minutes of writing now
   saves the Architect an hour later.
7. **"The task is too big for one person."** → Split it on the board: "NBA legends — wings (100)"
   and "NBA legends — bigs (100)" and "NBA legends — guards (100)". Three people, three lanes, one
   schema, zero overlap.
8. **"I disagree with the Owner's concept."** → Bring evidence and an alternative, in the channel
   where decisions live (`docs/DECISIONS.md`), and accept the Owner's call. The Owner is the Owner.

## 7. The concept-question channel (getting the Owner's guidance)

Conceptual questions — _how should this work, not how is it coded_ — are expensive to answer late
and cheap to answer early. That is why the channel exists.

```
node SIM-PLATFORM/tools/owner-questions.mjs --list        # what is in the bank
node SIM-PLATFORM/tools/owner-questions.mjs --next 5      # write the next 5 into the queue
node SIM-PLATFORM/tools/owner-questions.mjs --answer Q-OWNER-03 "the Owner's words"
node SIM-PLATFORM/tools/owner-questions.mjs --status      # open / answered, by area
```

The generator pulls from `tools/question-bank.json`, prefers questions whose area has been waiting
longest, cites the code each question concerns (so the Owner can answer in one pass), and writes the
queue to `questions/OWNER-QUESTIONS.md`. Answers are recorded in `questions/ANSWERS.md` and linked
back to the question ID.

**If you are about to build something conceptual, check the bank first.** If your question is not in
it, add it — the bank is append-only and yours to extend. Asking costs one line; guessing costs
1,200 records.

## 8. Style, language and receipts

- **English only**, in every document, every message, every data note. (Owner rule, 19 Oct.)
- **Plain informative language.** "Expected scoring" and "before kickoff" do not appear in post-game
  text; the recap conventions and the record caps apply to every new sim.
- **Every number names its unit**: 1,200 _records_, 7,208 _overflowing elements_, 408 _common
  functions_, 272 _games played_.
- **Cite the build hash** for anything measured on a build, and the line number.
- **Say what you did not check.** A five-line report that includes "what was deliberately not
  checked" is worth more than one that claims everything.

## 9. A word to the people starting tomorrow

If you are reading this because the Owner asked you to work on an all-time NFL sim, an NBA sim, or an
all-time NBA sim, and you are feeling the weight of "1,200 ratings" — here is the truth about the
size of the job.

**1,200 ratings is not a heroic act; it is a pipeline.** The heroics are the rubric, the calibration
set and the reconciliation rule, and those are written **once** and then reused. You will rate maybe
40 players, hand them to two other people, look at the spread, and fix the outliers. That is a
weekend's work for a group, and the difference between a good pool and a bad one is not stamina, it
is method. The council that rated the NFL current pool did it the same way.

**You cannot get it wrong alone.** The multi-rater rule exists so that no single person carries the
whole pool. If your numbers disagree with someone else's, the method has an answer (a third rater,
or the calibration set) — you are never stuck. And the "-5 for current players" rule means the
question "how good is this person, really" is answered by the rubric, not by taste.

**The first 50 records are the hardest and the most valuable.** They set the scale for the other
1,150. The Owner and the Architect will look at them closely, and that is the point: a tight,
calibrated first batch beats a huge sloppy one, and the rubric is cheaper to fix at 50 than at 1,200.

**You are not alone in the codebase.** The football sim is verified, pinned and defended; your
expansion work cannot quietly break it, and if something does, the gates will say so in one command.
The rules above are not there to slow you down — they are there so that when you hand over, nobody
has to untangle your work from someone else's.

**Ask early, ask cheaply.** A question in the channel costs one line. A wrong assumption costs a
week. If you are not sure whether the all-time mode should keep today's teams or historical ones,
_that is a question for the Owner_, and it is in the bank already (`Q-OWNER-11`).

**And if you break something, say so.** A broken build that is reported in the first hour costs the
council an hour; a broken build that is discovered in a week costs it a day of archaeology and a
little trust. The council's rule — "a claim about posted or edited work must be true before you
claim it" — exists because honesty is the cheapest form of quality control we have.

Welcome. The pipeline is documented, the gates are built, the Owner is ready to answer, and the
work that matters most — the first fifty records — is exactly the part you can start today.
