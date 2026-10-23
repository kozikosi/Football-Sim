# All-time pool framework — what exists, what is missing

SPEAKER: DS | ROLE: council reviewer (advisory) | TASK: all-time pool assembly framework, assigned by VLOC
DATE: 2026-10-21T01:25Z

Assigned by VLOC (S-2500–2599). Deliberately **not** a new schema: `SIM-PLATFORM/data/schema/player-record.schema.json`
already exists and is already reconciled against the Owner's 2026-10-21 direction. Writing a second one
would create the competing-source problem the Owner has ruled out. This is an alignment and gap note.

Read-only: no pool edits, no product edits, no ratings assigned.

---

## 1. What already exists (VERIFIED)

| Piece                    | Location                                                                  | State                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Record schema            | `SIM-PLATFORM/data/schema/player-record.schema.json`                      | present; `$id: sim-platform/player-record.schema.json`; status line already says "PROPOSED — reconciled with the Owner's direction of 2026-10-21" |
| Position taxonomy        | `SIM-PLATFORM/data/schema/nfl-position-taxonomy.md`                       | present; consumed by the pool builder                                                                                                             |
| Current NFL pool         | `SIM-PLATFORM/data/nfl/current.json`                                      | 1,200 records, 937,366 B                                                                                                                          |
| Calibration set          | `SIM-PLATFORM/data/schema/calibration-30.json`                            | present                                                                                                                                           |
| Validator                | `SIM-PLATFORM/tools/validate-dataset.mjs`                                 | present                                                                                                                                           |
| Pool builder             | `SIM-PLATFORM/tools/build-pool-variant.mjs`                               | present; demonstrated this round                                                                                                                  |
| Source intake + manifest | PR #4, `raw/nfl/` (8 files) + `raw/nba/` (1 file), `source_manifest.json` | open PR; sha256 per file                                                                                                                          |
| Derived gap candidates   | PR #4 CSVs                                                                | `engine_ovr` empty, `review_status: "proposed; owner review pending"`                                                                             |

Existing record fields, measured from `current.json`: `id, name, sport, competition, positions,
slot_families, teams, era, ovr, attributes, extensions, provenance`. Provenance already carries
`source`, `source_version`, `source_date`, `raters`, `batch`, `review_state`.

## 2. The five stages, and the gate between each

```
1  SOURCE INTAKE      raw file + sha256 + byte/line count → source_manifest.json
   ── gate: manifest entry exists and hash matches, or the file does not proceed
2  NORMALIZATION      person id, display name, position in the sport's own vocabulary,
                      historical team, franchise, source class
   ── gate: id unique in pool; no id derived from display name
3  GAP ANALYSIS       which roster slots are unfilled at league scale
   ── gate: the gap list is derived from the roster requirements, not hand-written
4  DERIVED CANDIDATES engine_ovr LEFT EMPTY; review_status = proposed
   ── gate: every engine_ovr is either empty or carries a provenance pointer. Never guessed.
5  OWNER-APPROVED POOL  Owner approves the pool as a whole
   ── gate: no record reaches a build from stage 4
```

The builder already enforces the last rule in code, not by convention: it drops any record whose `ovr`
is not numeric with the message _"no numeric ovr — the builder never invents a rating"_. That is the
strongest anti-invention guarantee in the tree, and it should be cited whenever this question comes up
rather than re-argued.

## 3. The gap that matters: person, season, and franchise

The Owner asked for six things to stay distinct: **person identity, player-season, team/franchise,
current career status, source, simulation rating.**

The current record shape carries a person, a `teams[]` array, and an `era` field — but no season
identity. One record cannot say "Oscar Robertson, 1964-65, Cincinnati Royals, 31.4 PPG" _and_ "Oscar
Robertson, 1970-71, Milwaukee Bucks". An `era` string is not a season.

**Proposed addition, minimally invasive:**

```
id            person id, stable, never derived from the display name   (exists)
season_id     "<id>-<YYYY-YY>" for a season record, absent for a person record
positions     in the sport's own vocabulary                            (exists)
historical_team  "Cincinnati Royals"      ← what the draft board may display
franchise        "Sacramento Kings"       ← what the simulation actually uses
career_status    active | retired | deceased | unknown
engine_ovr       integer or null — null until approved
provenance       source, source_version, source_date, raters[], batch, review_state  (exists)
```

Two rules that fall out of it and need to be stated because they are easy to violate silently:
- **`franchise` is what the sim consumes; `historical_team` is display-only.** The Owner's own example:
  the board may show Oscar Robertson as a Cincinnati Royal; the simulation places him on the current
  Sacramento Kings.
- **A person record and a season record are different rows.** Averaging a career into one `ovr` is a
  modelling choice that must be declared, not a default.

## 4. Rules the Owner has already set (do not re-litigate)

- Public-facing values are **integers**. Decimals are allowed internally where the maths wants them;
  never invent a decimal field the engine does not read.
- The **~−5 adjustment** for current players in an all-time pool is **not approved**. Absent a stated
  purpose, an eligible-player definition and a calibration, it stays out.
- The pool target is **~1,500–2,000** candidates per sport, and the **Owner approves each pool**.
- Owner-supplied lists are **source material**, not an approved pool.
- NBA 2K OVR is a legitimate basketball source **provided source and version are preserved**.

## 5. Validation, with the limits measured this round

| Check                | Threshold                                                                    | Basis                                                                                |
| -------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Position codes legal | one of 19: `QB,HB,WR,TE,LT,RT,LG,RG,C,DT,REDG,LEDG,MIKE,WILL,SAM,CB,SS,FS,K` | read from the build's own `NATURAL_SLOT_MAP`                                         |
| Draft capacity       | ≥ 32 × 26 = **832** picks                                                    | matches `draftSim.pos = 832` observed in a live run                                  |
| Attribute bounds     | 0–100 integers                                                               | `attributes` block                                                                   |
| Person id            | unique, never name-derived                                                   | 3 same-name/different-person collisions and 69 shared surnames already in the intake |

**Measured caveat — the taxonomy is lossy at the edges.** Running the pool builder on the build's own
pool drops **52 of 1,200** records: punters 32, long snappers 12, fullbacks 8. All three are absent from
the 19 legal codes. For the _draft_ this is harmless — those positions were already non-draftable, which
is why 832 is unaffected — but a pool imported this way silently loses its specialists, and any
all-time pool that cares about punters or fullbacks needs that decided before intake, not after.

## 6. What is missing, in order of what blocks what

1. **`season_id`** — without it the all-time pool cannot represent a player twice, and the Owner's
   person/season distinction cannot be honoured.
2. **`historical_team` vs `franchise`** — without it the board/display split is a UI convention rather
   than a data fact.
3. **A manifest entry per new source file** — the pattern exists (PR #4 `source_manifest.json`, sha256
   per file) but is not yet enforced for files added outside PR #4. Note: the PR #4 branch content is
   **not present in this checkout** — `find` for `NFL-AT-001*` and `source_manifest.json` returns
   nothing here, so PR #4 hashes quoted in this note are **REPORTED from my earlier review of that
   branch, not re-verified this round**.
4. **A specialist decision** — punters, long snappers and fullbacks are outside the taxonomy. Either
   they get codes, or all-time pools are declared to exclude them. Right now the outcome is decided by
   omission.

## 7. What I did not do

- Assigned **no ratings**. Every `engine_ovr` stays empty until the Owner approves a pool.
- Did not apply the −5 adjustment.
- Did not modify any pool, schema, validator or product file.
- Did not re-run the PR #4 pipeline. Its artifacts are not in this checkout (`find` returns nothing for
  `NFL-AT-001*` / `source_manifest.json`), so the PR #4 facts above are carried from my earlier review
  of that branch and are labelled REPORTED, not VERIFIED-this-round.
