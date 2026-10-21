# SIM-PLATFORM — the vision

> **SUPERSEDED IN PART — 21 Oct 2026.** The Owner's product direction (PR #4,
> `OWNER-PRODUCT-DIRECTION.md`) replaces two figures below: the candidate target is now **~1,500–2,000
> candidates per sport**, and **the ~−5 current-player adjustment is NOT approved** ("do not apply it
> unless we decide its purpose, eligible players, and calibration"). The text below is kept as the
> record of the earlier statement; the live numbers are in `DATASET.md` (rubric v2) and
> `data/schema/player-record.schema.json` (rev 4). The priority order, the eight-simulation goal and
> the "NFL all-time ratings are created by the group" plan are unchanged.


**Owner-directed, 20 Oct 2026 · advisory platform documents · the Architect (Claude) holds technical
authority over anything that enters a build (R3); the Owner holds the vision, the priorities and the
permissions (R1).**

This file restates, in structured form, what the Owner said. It exists so that every council member,
the Architect and the Owner are working from the same paragraph. Where this document paraphrases, the
paraphrase is the one to argue with.

---

## 1. The goal, in the Owner's words

> The NFL regular season draft simulation is one of many you can access. It would be nice to have at
> least 8 simulations (Current and All-time) for the four major American sports. And then one current
> and one all-time for the top football/soccer leagues — all the ones ranked above MLS, and including
> MLS — for current and all-time.

Broken out, that is:

| Family | Modes | Leagues | Minimum sims |
|---|---|---|---|
| **American big four** | Current + All-time | NFL, NBA, MLB, NHL | **8** |
| **Football (soccer)** | Current + All-time | every league ranked above MLS, plus MLS itself | 2 × (number of leagues) |

The number "8" is a floor, not a ceiling. The shape is **sport × era-mode × league-set**, and it is
the same shape for every family: the *engine* is shared, the *data* is not.

## 2. The Owner's priorities, in order

1. **Our current Football Sim** — keep it working, keep it the best thing we have, and let it be the
   reference the others are measured against.
2. **Adding an All-Time version to our Football Sim** — same engine, different player pool.
3. **Creating an NBA Sim** — "practically the same as our football sim but obviously with very
   different math."
4. **Create an all-NBA Sim** on the same engine as (3).
5. **The simulations of other sports**, following the same logic.

Priority 1 is a *constraint*, not just a task: nothing in projects 2–5 may degrade the current
simulation. The current build's protected constants, its math functions and its verified behaviour
are the inheritance every later project inherits.

## 3. The data requirement — the hard part

> I don't have the obvious data set for the all time players. We will have to collectively create a
> dataset, assembling around 1200 of the best all time players (all top current players are eligible
> with around a −5 to their score) in the NFL and NBA. I can start transmitting NBA2K ratings directly
> but the NFL all-time ratings will have to be created by us as a group.

So the plan needs **two different data pipelines** and one shared schema:

| Pool | Size | Source | Method |
|---|---|---|---|
| NFL all-time | ~1,200 | **created by the council** | a rating rubric, calibration anchors, multiple independent raters, median reconciliation |
| NBA (current + all-time) | ~1,200 (current) / ~1,200 (all-time) | **NBA2K ratings transmitted by the Owner** | a stated, reviewable mapping from NBA2K attributes to the sim's player record |
| NFL current | 1,200+ | already in the build | unchanged |

The "-5 to their score" rule is the Owner's and it is a *design* decision, not a formatting detail:
it says a current player in an all-time pool is present but slightly discounted, which changes the
math of a draft (a pool of 1,200 legends and 200 slightly-shaded current players drafts differently
than 1,200 legends). The exact semantics are the first thing the Owner should pin down — see
`questions/OWNER-QUESTIONS.md` (`Q-OWNER-01`, `Q-OWNER-02`).

## 4. What the website becomes

Today the product is one self-contained HTML file. The Owner's goal is a **portal**: one entry point
listing every simulation, each simulation a single self-contained file, all sharing one engine and
one code of conduct for data and maths.

Nothing about that requires the deployment story to change: R1 (internal project, deployment out of
scope) still holds. A portal page plus a folder of single-file sims is a static site; whether it is
ever published is the Owner's separate decision.

## 5. What the Owner asked the council for

* **Assignments.** The Owner suggested assigning agents to start on (a) an NFL all-time draft season
  simulation, (b) an NBA draft season simulation, (c) an NBA all-time draft season simulation. Those
  are the three expansion lanes in `projects/`, and `OWNERSHIP.md` is the claim board for them.
* **Guidance, not interference.** The priority is to help Claude make V21 as beautiful and
  sophisticated as possible. The expansion work must therefore not compete with the V21 merge for
  attention, and must not destabilise it.
* **A question channel.** The Owner wants a file that generates questions about *fundamental
  concepts* — the flex rules in the NFL sim was the example — so the Owner can give guidance on how
  things should be structured conceptually, before they are built. That is `tools/owner-questions.mjs`
  and the queue it produces.

## 6. The one-paragraph version

> One engine, many sport packs. The current NFL sim is pack #1 and keeps shipping untouched. An
> all-time NFL pack is the same engine over a new player pool. The NBA is the same engine with a
> different profile (30 teams, 82 games, 5 positions, a different matchup model) and its own data
> pool, all-time being that pool with the legends. The pools are ~1,200 records each in one shared
> schema: NFL all-time rated by the council against a rubric, NBA from the Owner's NBA2K ratings
> through a stated mapping. Every pack passes the same four gates (data, static oracle, dynamic
> smoke, Owner's visual pass), and the shared engine's protected functions stay byte-identical
> everywhere until the Owner and the Architect say otherwise. The Owner answers the concept
> questions; the Architect implements; the council builds the data and the packs.

## 7. What this document is not

* It is not a ruling on the architecture — `ARCHITECTURE.md` carries the recommendation, and
  `docs/DECISIONS.md` is where a decision gets *made*.
* It is not a plan for who does what — `OWNERSHIP.md` is the live claim board; `ROADMAP.md` is the
  sequence.
* It does not change anything about the current build. The product files are read-only to every
  advisor, and the current simulation remains priority 1.
