# OWNERSHIP.md — the claim board for the platform

**MiniMax (S-1900–1999) · 20 Oct 2026 · APPEND-ONLY.** One row per claim. **Do not edit or remove
another seat's row** — append a new row (including a "released" row). The board is the shared
source of truth for *who is doing what*; `ROADMAP.md` is the shared source of truth for *what order
it happens in*.

---

## The rules in four lines

1. **Claim before you start.** Add a row below with your seat name, the date, and one line of
   intent. If it is already claimed, pick an adjacent slice or ask the owner.
2. **Claim the smallest thing you can finish.** "NFL legends — linebackers (60 players)" beats "the
   all-time NFL pool".
3. **Append, never rewrite.** Corrections are new rows.
4. **A claim is not a lock.** It is a promise to publish what you are doing. Releases are normal and
   are recorded as rows, not deletions.

## Status legend

`claimed` · `in progress` · `blocked — reason` · `review` · `merged` · `released — reason`

---

## The board

| project / artefact | seat | claimed | status | intent |
|---|---|---|---|---|
| **P1 · football-current** (the existing sim; product file) | *Architect only* | — | protected | The reference build. Product files are read-only to advisors; the Architect implements. Nothing in P2–P4 may change it without the Architect's build. |
| **P2 · football-all-time** — the data pool (1,200 legends, NFL) | *unclaimed* | — | open | Rate the all-time NFL pool against the rubric, in slices (position groups), with provenance. |
| **P2 · football-all-time** — the profile + mode switch (stage 1 seam) | *unclaimed* | — | open | `DATASETS.current` / `DATASETS.alltime` + the active-pool switch inside the single file (see `ARCHITECTURE.md` §4). Architect-implemented from an accepted proposal. |
| **P2 · football-all-time** — the era-mode rules (what "all-time" means) | *unclaimed* | — | open | Depends on the Owner's answers: `Q-OWNER-08` (the −5 rule), `Q-OWNER-11` (today's teams or historical ones), `Q-OWNER-12` (era effects). |
| **P3 · nba-current** — the league profile (30 teams, 82 games, divisions, playoffs, awards) | *unclaimed* | — | open | Fill in `ENGINE-SPEC.md` §2 for the NBA. Answers needed from the Owner first: `Q-OWNER-03` (flex), `Q-OWNER-14` (draft shape). |
| **P3 · nba-current** — the matchup model (pace, efficiency, 3P%, TOV, rebounding) | *unclaimed* | — | open | The one genuinely new piece of maths. Its own calibration receipt, like the football model's coefficients. |
| **P3 · nba-current** — the NBA2K → record mapping | *unclaimed* | — | open | The Owner transmits NBA2K ratings; this lane writes the stated mapping (attribute → field), the conversion script, and the validation. |
| **P4 · nba-all-time** — the data pool (1,200 legends, NBA) | *unclaimed* | — | open | Same pipeline as P2's pool: rubric, calibration, two raters per player, provenance. |
| **P4 · nba-all-time** — the era-mode rules | *unclaimed* | — | open | Same dependency as P2's era-mode rules; answer them once, apply twice. |
| **tool · `owner-questions.mjs`** (the Owner's question channel) | MiniMax | 20 Oct | in progress | Built; the bank is open for anyone to extend. |
| **tool · `validate-dataset.mjs`** (schema/range/rule validation) | MiniMax | 20 Oct | in progress | Built; extend as the schema grows. |
| **tool · `rating-worksheet.mjs`** (worksheets + multi-rater aggregation) | MiniMax | 20 Oct | in progress | Built; extend for sport-specific anchors. |
| **tool · `build.mjs`** (assembles engine + pack → one HTML per sim) | *unclaimed* | — | open | Stage 2. Dependency-free plain Node; the output must stay a single self-contained file. |
| **doc · `docs/DECISIONS.md`** (the decision log) | MiniMax | 20 Oct | in progress | Append-only; every entry cites its evidence. Anyone may append a decision they have the evidence for. |
| **doc · `docs/GLOSSARY.md`** | MiniMax | 20 Oct | in progress | Shared vocabulary; append terms, do not redefine existing ones silently. |

**How to claim:** append a row like this one —

```
| P2 · football-all-time — the data pool (linebackers, 60 players) | <your seat> | 20 Oct | claimed | Rating the 60 best linebackers against rubric v1; two raters; provenance in the PR note |
```

and add one line to `CHRONICLE.md` saying you claimed it (that is the council's arrival/claim
convention, and it is what makes the board auditable).

---

## Slice recipes (claim one of these to start today)

**Football all-time pool, by position group** (each ~50–150 records, all rated on the same rubric):

| slice | size | notes |
|---|---|---|
| QBs | 40 | the most scrutinised slice; include both "current eligible at −5" and legends |
| RBs | 60 | pre- and post-1990 |
| WRs / TEs | 150 | the biggest slice; split by era if you want a smaller bite |
| OL | 80 | the hardest to rate consistently — use the anchor set |
| DL | 100 | |
| LBs | 80 | |
| DBs | 120 | CB/S split or combined — the Owner's call (`Q-OWNER-09`) |
| ST / specialists | 40 | only if the all-time mode includes them |

**NBA pools, by position group:** guards (PG/SG) 200 · wings (SF) 120 · bigs (PF/C) 200 · plus the
current-eligible-at-−5 subset. The Owner transmits the NBA2K source; the lane's job is the mapping
and the validation, not the re-derivation.

**Rating slices (a person, not a position):** a rater may claim "guards (PG/SG), 200 records" and
rate them all — a second rater rates the same slice independently. The reconciliation is the
aggregation step, not the raters' problem.

---

## What is *not* claimable

* **The product HTML files.** Architect only.
* **The eight protected math functions and six protected constants.** A change needs the Owner's
  explicit approval and the Architect's implementation — see `docs/DECISIONS.md`.
* **Another seat's lane.** Ask first; the answer is usually yes.
* **The shared council documents' existing sections.** Append your own; do not rewrite others'.
