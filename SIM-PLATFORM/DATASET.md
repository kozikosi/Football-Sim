# DATASET.md — the all-time player pool protocol

**MiniMax (S-1900–1999) · 20 Oct 2026 · for NFL all-time and NBA all-time pools (and the NBA current
pool).** The Owner: *"We will have to collectively create a dataset, assembling around 1200 of the
best all time players (all top current players are eligible with around a −5 to their score) in the
NFL and NBA. I can start transmitting NBA2K ratings directly but the NFL all-time ratings will have
to be created by us as a group."*

This is the protocol that makes "created by us as a group" produce something the simulation can use
and that a stranger can trust five years from now.

---

## 1. The shape of the problem

| Pool | Target size | Source of numbers | Method |
|---|---|---|---|
| NFL current | 1,200+ (exists) | Madden NFL 27 | already in the build |
| NFL all-time | ~1,200 | **the council** | rubric + calibration + multi-rater + median |
| NBA current | ~1,200 | the Owner's NBA2K ratings | stated mapping + validation |
| NBA all-time | ~1,200 | NBA2K ratings (for the current-eligible share) + council ratings (for the legends) | as above, mixed |

**One record schema, all four pools.** The current build's tuple is a good schema and it transfers:

```
[name, pos, team, ovr, spd, str, agi, cod, inj, awr]
```

Position codes are the only thing that changes per sport (NFL: QB/RB/WR/TE/OL/DL/LB/CB/S/…
NBA: PG/SG/SF/PF/C). Everything else — the six attributes, the 60–99 scale, the injury field — is
identical, which is what lets the same engine, the same weights machinery and the same season engine
run both sports.

The schema lives at `data/schema/player-record.schema.json`. It is a file, not a comment, so
`tools/validate-dataset.mjs` can enforce it.

## 2. The "−5" rule — the Owner's rule, and what it implies

> *all top current players are eligible with around a −5 to their score*

Read literally, a current player in the all-time pool keeps a rating five points below their current
rating. Three sub-decisions hide inside that sentence, and they change the maths of the draft:

1. **What gets −5?** Only `ovr`, or all six attributes? (−5 on every attribute is a different player
   than −5 on the overall.)
2. **"Around −5"** — exactly 5, or a judgement (a Hall-of-Famer at −2, a fringe starter at −8)?
3. **How many current players are in the pool at all?** "Top current players are eligible" suggests a
   deliberate subset, not all 1,200.

Each of these is in the question bank (`Q-OWNER-08`) and each changes how a draft of the pool plays
out. **Do not rate a single player until these are answered** — a pool rated under the wrong reading
is 1,200 records of wrong.

## 3. The rating rubric (the actual method)

### 3.1 The scale (shared, so the existing maths keeps working)

The sim's maths is calibrated on a 60–99 overall scale with six attributes. The all-time pool must
use the **same scale**, or every existing weight, every `slotWins` curve and every draft-value
number would have to be re-derived. So the anchors are the current build's:

| OVR | Meaning (football) | Meaning (basketball) |
|---|---|---|
| 99 | the single best at his position, all-time | the same, in the NBA |
| 95–98 | perennial, first-team all-pro | perennial, first-team all-NBA |
| 90–94 | clear multi-year starter | clear multi-year starter |
| 85–89 | solid starter, one good year | solid starter |
| 80–84 | rotation, occasional starter | rotation player |
| 75–79 | situational, special teams (NFL) | bench with a defined role |
| 70–74 | fringe roster, developmental | fringe rotation |
| 60–69 | camp bodies / long shots | deep bench |
| <60 | not a player | not a player |

### 3.2 The six attributes (shared)

`spd` (speed), `str` (strength), `agi` (agility), `cod` (coordination/technique), `inj` (durability),
`awr` (awareness/tactical IQ). In the NBA the mapping is: `spd` → speed in transition, `str` → rim
strength, `agi` → lateral quickness, `cod` → skill, `inj` → availability, `awr` → basketball IQ.

### 3.3 The rating procedure for a council-rated pool

1. **Calibrate first.** Every new rater rates a **30-player calibration set** (spanning 99 → 65, from
   both sports if you are rating both) before touching the pool. The calibration report (your mean
   offset and spread against the reference) is recorded with the raters' names.
2. **Rate independently.** For each player, write `ovr` and the six attributes from the rubric. No
   discussing, no consensus-by-chat — independence is what makes the median meaningful.
3. **Reconcile.** Where two raters differ by more than **5 points** on `ovr`, a third rater breaks the
   tie. The recorded value is the **median** of the raters.
4. **Batch.** Commit in batches of 50–150 players with a note naming the raters and the rubric
   version. A batch that fails validation is fixed in its own batch, not in a later one.
5. **Re-calibrate periodically.** Every 300 records, a rater re-rates 10 calibration players; drift
   above 2 points means re-calibrating the whole rater.

`tools/rating-worksheet.mjs` produces the per-player worksheets (with the anchors inlined) and
aggregates multi-rater submissions into the median plus a disagreement report.

## 4. The NBA2K path (current and the current-eligible share of the all-time pool)

The Owner transmits NBA2K ratings. The lane that owns this writes, in one file:

* **the mapping** — which NBA2K attribute becomes which of our fields, and the scale conversion
  (e.g. NBA2K 99 → our 99, and the attribute split for `spd`/`str`/`agi`/`cod`);
* **the converter** — a dependency-free script that turns a transmitted export into
  `data/nba/current.json`;
* **the validation** — the converter's output must pass `tools/validate-dataset.mjs` unchanged, and
  a hand-checked sample of 20 records must be attached to the batch note.

**Provenance is not optional here:** each record stores the source (e.g. `nba2k`), the export date
and the mapping version. If the mapping changes, the pool is regenerated, and the difference between
mappings is a *reviewable diff* rather than a mystery.

**A licensing note, stated once so nobody is surprised:** NBA2K ratings are commercial data. This is
an internal project (R1) and nothing is published, so the risk today is nil. If the project ever
becomes public, the data question becomes a real one, and the honest answer may be "publish the
engine, keep the data local". Record provenance now so that decision stays cheap later.

## 5. Coverage rules (so the pool is a *league*, not a list of legends)

* **Position coverage**: every position group must have a full starter tier, a rotation tier and a
  fringe tier, or the draft values the pool wrongly (a pool of 99s and 60s drafts like a carnival).
* **Team coverage**: the all-time pool must cover all 32 NFL teams (or 30 NBA teams) with a plausible
  distribution, or the "your team" experience breaks.
* **Distribution check**: the validator prints the OVR histogram; compare it to the current pool's
  histogram. A pool that is 40% above 90 will draft a fantasy league.
* **The "-5 current" share**: the Owner's rule means the pool contains a shadow of today's league.
  The validator checks the share and the offset.

## 6. Validation — the gate for a pool

`node tools/validate-dataset.mjs data/<sport>/<pool>.json`

It checks: schema and types · ranges (ovr 40–99, attributes 40–99, `inj` 0–100) · duplicate names ·
position coverage · team coverage · OVR histogram vs the reference pool · the −5 rule for
current-eligible records · provenance present on every record · the file's size against the target.

A pool that fails validation does not enter a pack. The report is the receipt.

## 7. The work split, in one table

| step | who | output |
|---|---|---|
| Rubric + calibration set | 1 seat, reviewed by 2 | `data/schema/rubric-v1.md`, `data/schema/calibration-30.json` |
| Calibration run | every new rater | their offset/spread, recorded |
| Rating slices | many seats, claimed on the board | per-rater worksheets |
| Aggregation | the pool lane's owner | the median pool + disagreement report |
| Validation | the pool lane's owner | a green validation report |
| Mapping (NBA) | the NBA2K lane's owner | mapping file + converter + validation |
| Pack assembly | the Architect | the pack, behind the four gates |

## 8. The three things that most often go wrong (and the guard against each)

1. **Scale drift** — a rater's league-average player is an 88. *Guard:* the calibration set; the
   validator's histogram check.
2. **Taste instead of rubric** — a beloved player gets 95. *Guard:* two raters, median, and the
   agreement report. The median is a humility machine.
3. **Provenance loss** — a batch of records nobody can explain. *Guard:* the batch note with raters
   and rubric version, and the validator's provenance check.
