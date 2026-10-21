# MLB current simulation — scoping document

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: MLB current simulation scoping | DATE: 2026-10-21T02:55:00Z**

**What this is.** A scoping document, not a build: what a current-MLB simulation would need, sized against the
Owner's stated direction, with the five decisions that actually block the work. **Receipts:**
`_agents/moc/evidence/mlb-scoping-receipts.txt`.

**Evidence labels.** `VERIFIED` = measured or read from a cited file in this repo. `REPORTED` = a real-world
MLB fact from general knowledge that I could **not** verify from any file here — each one is flagged and
needs a source check before it enters a pool. `INFERRED` = a reasoned conclusion with its basis given.
`UNKNOWN` = not settled.

**Build cited (VERIFIED):** `NFL Draft Simulator merged.html`, sha256
`40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) @ `merge/v20-donor`
`ff8c05ae`. It is the merge candidate, never "V21".

---

## 1. The pattern to generalise (VERIFIED — football, cited by file:line)

The football sim already has the exact architecture a baseball sim needs. The generalisation is mostly
naming; the *hard* part in baseball is not the code, it is the data lineage in §3.

| football (VERIFIED) | where | baseball analogue |
|---|---|---|
| `ROSTER_SLOTS` = 26 starters, `TOTAL_ROUNDS` = 26 → **832 picks** (26 × 32) | l.924–925 | 30 teams; rounds × 30 = picks (§4) |
| `RATING_SPECS` — **nine units** (`olRun, olPass, rb, qb, rec, passRush, frontRun, coverage, kicker`), each mapping slots → weights | l.1938 | a smaller unit set (§5) |
| `DEF_SPECS` — defence × formation splits (`frontBase/frontNick/covBase/covNick`) | l.2044 | defence vs **left-handed / right-handed** batters |
| `slotWinsPerOvr()` → `modelWeights()` — wins per unit of OVR, inverted to the 700 scale | l.1346, l.459 | runs per unit of OVR, inverted to its own scale |
| `teamRatings(slotmap)` — `wavgSlots` per unit, then composites (`passOff`, `runOff`, `off`, `def`) | l.1988 | lineup / rotation / bullpen / defence composites |
| `leagueBaseline()` — league-average ratings (the bar to beat) | l.2003 | same, per unit |
| `matchupModel(O0, D0, lg, plan)` | l.2100 | expected runs for each side |
| `simulateGame(homeSM, awaySM, isPlayoff, lg, plans)` | l.2286 | one game → runs; then the season |
| `POINTS_PER_WIN = 32.5` — "Pythagenpat-based conversion" | l.4865 | Pythagorean expectation: run differential → win% |
| report section **"What actually drove winning (neutral model, 32 rosters)"** — per unit: raw *r*, ridge-regression **wins/SD holding others equal**, and **model-implied wins/SD** | l.6127 | the same three columns over baseball units |

**The single most reusable idea (VERIFIED):** the football sim does not claim "wins" from raw talent — it
converts every player into *wins per slot* and every team into *unit ratings*, then explains a season by
regressing wins on those units **and** by asking the matchup model's own coefficients what one standard
deviation of each unit is worth. A baseball sim should copy that **shape**, not football's numbers.

## 2. (a) The pool — how many candidates are actually needed

**The constraint is per position group, not the total.** Minimum to field 30 teams (1 per team slot;
roster shapes REPORTED):

| group | per team | × 30 teams | minimum | depth at the 1,800 midpoint |
|---|---:|---:|---:|---|
| SP | 5 | 150 | **150** | 300 |
| RP | 7–8 | 210–240 | **210** | 400 |
| C, 1B, 2B, 3B, SS | 1 each | 30 each | **150** | 80–90 each (420) |
| LF, CF, RF | 1 each | 30 each | **90** | 120 each (360) |
| DH | 1 | 30 | **30** | 60 |
| utility / two-way | — | — | — | 240 (the overlap that makes a small pool work) |
| **total** | | | **660** | **1,800** |

Pitchers take the depth because they are the injury-and-workload group: a 5-man rotation with 10 usable
arms per club, and a bullpen that is a small, high-leverage unit — the same role the `kicker` unit plays
in football (`RATING_SPECS.kicker`, VERIFIED l.1938–1947).

**Reconciliation with the Owner's ~1,500–2,000 (VERIFIED arithmetic, REPORTED roster shapes):**

| draft length | picks | 1,500 candidates | 2,000 candidates |
|---|---:|---:|---:|
| 26 rounds (one 26-man roster) | 780 | 1.92 per slot | 2.56 per slot |
| 30 rounds | 900 | 1.67 | 2.22 |
| **40 rounds (one 40-man roster)** | **1,200** | **1.25** | **1.67** |
| *football precedent* | *832* | *1,200-pool → 1.44* | |

**The finding that matters:** the football sim's ratio is **1.44 players per slot**. The Owner's
1,500–2,000 only lands in that same band if the draft fills a **40-man roster** (1,200 slots). At a
26-round draft the pool would be 1.9–2.6× oversized — half the pool would never be drafted, and the
Owner's own rule ("the draft does not have to use every eligible player", "the pool only needs enough
players to fill the necessary positions and rosters") would be doing a lot of work to explain a pool
twice the size it needs. **The pool target and the draft length are the same decision** (§6, D1).

**Also note (VERIFIED):** there is **no MLB pool of any kind** in this repo, and no MLB source file —
`ls sports/ datasets/` shows 8 entries, none MLB. This is a greenfield data task, and the scoping for it
is larger than the engine work.

## 3. (b) The record shape — five layers, `modern_franchise` on the franchise layer only

The Owner's rule: keep **person identity, player-season, team/franchise, current career status, source and
simulation rating distinct**; use **today's franchises** in the simulation while the draft board may show
historical team context. Baseball adds one wrinkle football does not have: **a player's position changes
by season**, so position belongs on the *player-season* layer, not the person.

```jsonc
// 1. PERSON — identity and career status, never a team
{ "person_id": "p0042", "name": "...", "bats": "L", "throws": "R",
  "birth_date": "...", "death_date": null,
  "career_status": "retired",            // active | retired | deceased | minor-league | free-agent
  "status_as_of": "2026-07-01",
  "career_positions": ["SS","2B"],        // set, for search only
  "provenance": { "source_id": "s012", "rater": "...", "date": "...", "confidence": "..." } }

// 2. PLAYER-SEASON — the unit of simulation input
{ "person_id": "p0042", "season": 1998, "franchise_id": "f_grand",
  "age": 27, "league_id": "mlb_american",
  "positions": ["SS"],                    // season-specific, not the person's
  "stats": { "hr": 30, "rbi": 130, "ops_plus": 132, "fip": 2.87, "innings": 210.1 },
  "source_ids": ["s012"] }

// 3. FRANCHISE — team identity, era, and the modern mapping
{ "franchise_id": "f_brooklyn", "name": "Brooklyn Dodgers", "city": "Brooklyn",
  "era": { "from": 1890, "to": 1957 }, "league_ids": ["mlb_national"],
  "modern_franchise_id": "f_ladodgers",   // ← the sim places the player HERE
  "lineage_parent_id": null }

// 4. SOURCE — mandatory provenance, per record
{ "source_id": "s012", "type": "baseball-reference|retrosheet|owner-supplied|derived",
  "publisher": "...", "edition_or_version": "...", "accessed": "2026-07-01",
  "url": "...", "raw_file": "...", "notes": "..." }

// 5. SIM RATING — the engine's input
{ "person_id": "p0042", "role": "hitter|pitcher",
  "ovr": 84,                               // PUBLIC: integer only
  "attrs": { "contact": 0.81, "power": 0.62, "speed": 0.44,
             "fielding": 0.79, "arm": 0.55 },   // INTERNAL: decimals allowed
  "unit_weights_id": "w_mlb_v1", "rater": "...", "rated_at": "...",
  "source_ids": ["s012"], "confidence": "..." }
```

**Rules that follow from the Owner's direction, stated as engineering constraints:**

1. **`modern_franchise_id` is data, never inferred.** It is a mapping on the franchise layer; the person
   record never carries a team. The draft board shows `franchise_id` (historical); the sim uses
   `modern_franchise_id` — exactly the Owner's Oscar Robertson precedent (Cincinnati Royals on the board,
   Sacramento Kings in the sim).
2. **Every rating field must have a consumer in the engine.** The Owner's rule ("do not invent decimal
   ratings or fields the engine does not use") plus a live precedent: a prior pool carried `careerAverage`
   with **no consumer** in the engine (reported in the council record) — a field that changes no decision
   is a cost, not a feature. A lint that lists every field and its consumer should be part of the pool
   validator.
3. **Public values are integers; internal maths may be decimals.** `ovr` is the public summary; `attrs`
   are internal. The football build's precedent is the same split in spirit: `RATING_SPECS` weights and
   `modelWeights()`'s 700-scale are internal, the visible OVR is not.
4. **One OVR plus attributes, not position-specific ratings.** Baseball is role-diverse like football, not
   positionless like basketball: a shortstop is not a basketball centre. One OVR with role-specific unit
   weights generalises `modelWeights()` cleanly. (See §6, D3.)
5. **Position taxonomy at load time.** Historical MLB position codes must map to the modern slot families
   before the flex table, the unit weights or the tiers see them — the same load-time translation the
   council's NFL taxonomy work established, and the same failure mode (a legacy code that matches no slot
   makes a player invisible to every slot).
6. **Franchise lineage is a first-class table, and it has traps.** At least two distinct franchises have
   claimed the same city: the **1901–1960 Washington Senators → Minnesota Twins** and the
   **1961–1971 Washington Senators → Texas Rangers** are different clubs (REPORTED — verify before
   modelling). Brooklyn Dodgers → Los Angeles; Montreal Expos → Washington; Florida Marlins → Miami;
   Seattle Pilots → Milwaukee; Philadelphia Athletics → Kansas City → Oakland; the 1882 Alleghanys →
   Pirates. The exact table is a **data** deliverable with a source per row.

## 4. (c) The draft structure

- **Teams:** 30 (REPORTED). **Picks per round:** 30. **Snake order**, 2 teams per round (the Owner's rule
  and the football sim's precedent).
- **Rounds = the decision (D1).** 26 rounds → 780 picks (one 26-man roster) · 30 → 900 · 40 → 1,200 (one
  40-man roster). The football sim's precedent is `TOTAL_ROUNDS = ROSTER_SLOTS.length` (VERIFIED l.925) —
  the same identity ("one roster per team") is the cleanest thing to generalise, and baseball's answer is
  40 because MLB's roster is 40-man, not 26.
- **Positions that must be fillable:** C, 1B, 2B, 3B, SS, LF, CF, RF, DH, SP ×5, RP ×7–8 per team — with
  **flex** in the football sim's sense: a player is eligible for a set of slots with a penalty, not one
  position. Baseball's flex set is the interesting part: a catcher is rarely a first baseman, but SS/2B/3B
  and the three outfield corners are genuinely interchangeable, and a pitcher is a different species.
- **What the draft must *not* assume** (the Owner's rule): it need not use every eligible player. So the
  pool can be sized to *group floors* (§2) and the draft can be sized to *rosters* (§4) independently.

## 5. (d) The statistics that explain Wins in baseball — and what the sim must compute

**The primitive is run differential.** In football the primitive is point differential, converted by
`POINTS_PER_WIN = 32.5` (VERIFIED l.4865, "Pythagenpat-based"). Baseball's is the same idea: run
differential → win% via Pythagorean expectation (≈9–10 runs per win — **REPORTED**, to be pinned to a
source before it enters the code).

**The unit set (the `RATING_SPECS` analogue) — 6 units, not 9:**

| baseball unit | what it measures | football analogue (VERIFIED) |
|---|---|---|
| `lineupOff` | offensive value of the 9/10 lineup slots | `rec` (WR/TE/RB weights) |
| `rotation` | starting pitching | `passRush` — the dominant determinant in its sport |
| `bullpen` | relief pitching | `kicker` — a small, decisive unit |
| `defence` | fielding / runs saved, **with L/R splits** | `coverage` × `DEF_SPECS` formation splits |
| `baserun` | speed on the bases | `rb` |
| `lineupFit` | platoon balance (lineup vs the opponent's staff) | the formation splits in `PLAN_K` |

**What the sim must compute, in the football order:**

1. **Player → role value.** `slotWinsPerOvr` analogue: runs per unit of OVR per role, inverted into a
   weight table (football's `modelWeights()`, l.459).
2. **Roster → unit ratings.** `wavgSlots` analogue: weighted averages of the OVRs in the lineup, the
   rotation, the bullpen and the defence, plus the composites.
3. **League baseline.** `leagueBaseline()` analogue (l.2003) — the bar every team is measured against.
4. **Matchup model.** `matchupModel()` analogue (l.2100): expected runs per game for each side, given
   both unit sets, the league baseline, the park and the platoon state.
5. **Game and season simulation.** `simulateGame()` analogue (l.2286) → 162 games → run differential.
6. **The explain-Wins report.** Copy the football report's **shape** (VERIFIED l.6127): per unit, raw
   correlation *r*; **wins/SD from a ridge regression holding the other units equal** (so trade-offs do
   not muddy the reading — football's own text calls this out); and **model-implied wins/SD** from the
   matchup model's coefficients. In baseball the unit of "wins" is derived from run differential through
   the Pythagorean conversion, so the report reads in wins, not runs.

**Which metrics matter to Wins — the Owner's instruction is to decide this before publishing, so here is
the proposal:** the report's primary axis should be **run differential per game**, decomposed across the
six units, because that is the quantity the Pythagorean conversion turns into wins. Secondary and
supporting: lineup OBP/wRC+-style rates, FIP/ERA and innings for the rotation, bullpen FIP and leverage,
defensive runs saved, and baserunning runs. **Do not** publish WAR-style composites as the "explanation":
they are an attribution of *value*, not of *wins*, and the football sim deliberately does not use them
(its report regresses wins on units and then reports the model's own implied wins/SD).

**Coupling to flag (the Owner's "report coupling and integration assumptions"):** the explain-Wins report
is only meaningful if the unit ratings are *the same numbers* the matchup model consumed. If the report
recomputes ratings independently, the two can disagree and the report will explain a season the simulator
did not play. Football avoids this by having one `teamRatings()` feed both (VERIFIED l.1988 and l.6127
share it).

## 6. (e) The top 5 open decisions — default, and the cost of being wrong

| # | decision | recommended default | cost of being wrong | if wrong, what breaks |
|---|---|---|---|---|
| **D1** | **Draft length** (this also fixes the pool size question) | **40 rounds × 30 = 1,200 picks** — one 40-man roster per team, the only length under which the Owner's 1,500–2,000 pool is needed rather than ~2× padded | the Owner has to play a 40-round draft; if it is too long, the draft becomes tedious, and the pool looks wasteful. If it is too short (26), the pool is 1.9–2.6× oversized and half of it never gets drafted | the draft UI, the roster maths and the pool target all move together |
| **D2** | **Roster model in the sim** | **26-man game-day (12 pitchers: 5 SP + 7 RP; 13 position players + 1 DH), 40-man off-season, 162-game season**; treat 28-man as a flag to verify (REPORTED, post-2025 change) | if the Owner wants the true 28-man in-season roster, every depth number moves; if the sim uses 40 men on the field it is simply a different game | roster slots, depth maths, fatigue/injury model |
| **D3** | **Rating model** | **one OVR (integer, public) + attributes (internal decimals) with role-specific unit weights** — the football pattern, because baseball is role-diverse, not positionless | if the Owner wants positionless baseball (basketball-style), the OVR+attributes substrate still holds but the unit-weight table must be rebuilt; if instead a full position-specific rating set is chosen, the pipeline cost roughly doubles | the entire rating pipeline and the unit-weight table |
| **D4** | **Historical/modern reconciliation** | **30 modern franchises in the sim; historical team on the draft board; franchise lineage as data with a source per row** (including the two different Washington Senators) | this is the most expensive item in the project: the whole pool depends on it. Getting the mapping wrong means re-rating the entire pool, not a patch | the pool, the draft board and the all-time variant |
| **D5** | **What "explains Wins" means and therefore what the sim computes** | **run differential as the single primitive, decomposed across the six units, with the football report's three columns (raw *r* · ridge wins/SD · model-implied wins/SD)** and a Pythagorean conversion | if the Owner wants WAR-based explanation instead, the report's inputs change but the engine does not; if the units are chosen badly (say, no bullpen unit), the report will say bullpen does not matter, which is false in a close season | the matchup model, the season sim and the report |

**Not decided here (needs the Owner or the Architect):** which MLB season/era the "current" sim represents
(2026 vs a chosen year) · whether the sim includes the post-season and how the World Series is played ·
whether the all-time variant is a separate pool or a filter over the same one · the "soccer ranking source
and cutoff" (a different sport, separately owned).

## 7. What I did not do

- **No product file, no pool file, no other seat's file, no shared document** was edited; everything here is
  in `_agents/moc/`. The receipt file and this note are mine.
- **No MLB rating, no MLB pool, no franchise table** was invented. The only numbers I produced are the
  arithmetic in §2 and the counts in §4, computed from roster shapes that are labelled **REPORTED**.
- I did not touch the E2E evidence, the recovery work, or the other seats' assignments.
- **Not decided by me:** everything in §6, and the four items at the end of §6.
