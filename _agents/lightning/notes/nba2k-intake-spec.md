# NBA 2K Ratings Intake + Provenance Specification

**Owner**: Council-assigned, Owner approves final pool  
**Scope**: Define the schema and provenance template for NBA 2K rating records  
**Status**: DRAFT — pending Owner approval of player pool and adjustment policies

---

## 1. Record Fields (Required)

Each 2K rating record must carry the following fields:

| Field            | Type            | Description                                                |
| ---------------- | --------------- | ---------------------------------------------------------- |
| `source_name`    | string          | Identifier for the source, e.g. `"NBA 2K24"`               |
| `source_version` | string          | Year/version of the game, e.g. `"2K24"` or `"2023"`        |
| `scrape_date`    | ISO date string | Date the record was extracted, e.g. `"2026-10-21"`         |
| `player_name`    | string          | Full player name as publicly listed, e.g. `"LeBron James"` |
| `2K_OVR`         | integer         | The overall rating from 2K, 1–99 or 1–100 scale            |
| `2K_attributes`  | object          | Raw attribute values from 2K as provided by the source     |

**Provenance chain** (immutable, stored alongside the record):
- `recorded_by`: session or agent identifier
- `recorded_at_utc`: ISO timestamp
- `source_url` or `source_path`: where the original data came from
- `sha256_of_source_snapshot`: hash of the raw data at scrape time, for detectability (per MiniMax M-105/M-109 receipt_id pattern)

---

## 2. OVR Public Rating Mapping

- The `2K_OVR` value is stored as-is (integer, 1–100 scale).
- The **public-facing / simulation** rating is the integer `2K_OVR`.
- The **original source value** is preserved in the `2K_OVR` field; no conversion or rounding is applied.
- **No −5 all-time adjustment** is applied at intake. That adjustment, if ever approved by the Owner, is applied later in a separate calibration step.

**Rationale**: Public-facing data uses integers. The raw 2K value is kept intact for provenance and any future re-calibration. The engine's internal math may use decimals, but the stored/public rating is always the integer.

---

## 3. 2K Attribute Mapping to Football Nine Unit Ratings

**This section is an OPEN DECISION** — the mapping of 2K attributes to the football build's nine unit ratings (QB, RB, WR/TE, OL run/pass, pass rush, run defense, coverage, kicker, flex) is NOT defined at intake.
- The council may propose mappings later, after the Owner specifies the decision.
- Each mapping proposal must include: the 2K attribute, the target football unit rating, the mathematical conversion, and a brief justification.
- The Owner will approve or reject each mapping before it is applied.
- Until the Owner decides, all 2K attributes are stored raw and unused by the football engine.

**Label**: `// OPEN DECISION: 2K → football unit rating mapping — pending Owner directive.`

---

## 4. Worked Example (EXAMPLE)

| Field                                  | Value                                                                  | Notes                                                        |
| -------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| `source_name`                          | `"NBA 2K24"`                                                           | Current-gen version at time of scrape                        |
| `source_version`                       | `"2K24"`                                                               |                                                              |
| `scrape_date`                          | `"2026-10-21"`                                                         | Date of intake                                               |
| `player_name`                          | `"LeBron James"`                                                       | EXAMPLE — real public 2K value                               |
| `2K_OVR`                               | `96`                                                                   | EXAMPLE — LeBron James' 2K24 overall rating (publicly cited) |
| `2K_attributes`                        | `{ "driving": 98, "mid_range": 92, "three_point": 88, "defense": 85 }` | EXAMPLE — raw attributes from 2K24; values 1–100             |
| `provenance.recorded_by`               | `"Lightning session"`                                                  |                                                              |
| `provenance.recorded_at_utc`           | `"2026-10-21T22:30:00Z"`                                               |                                                              |
| `provenance.source_url`                | `"https://www.nba2k.com/ratings"`                                      | Hypothetical source location                                 |
| `provenance.sha256_of_source_snapshot` | `"c3ab8...` (computed hash)`                                           |                                                              |

**⚠ EXAMPLE**: All values above are illustrative. When the actual 2K data file arrives, replace with real values and recompute the sha256.

---

## 5. Acceptance Criteria

The intake is accepted when ALL of the following are satisfied:
- [ ] The incoming data file conforms to the schema in **Section 1** (all required fields present, types correct).
- [ ] The `2K_OVR` value is an integer in the range 1–100.
- [ ] The `sha256_of_source_snapshot` is computed from the exact raw data bytes and stored alongside the record.
- [ ] The provenance chain is complete: `recorded_by`, `recorded_at_utc`, `source_url`/`source_path`, and `sha256_of_source_snapshot` are all populated.
- [ ] No −5 all-time adjustment has been applied at intake (verified by comparing `2K_OVR` to the raw source value).
- [ ] The `2K_attributes` object is stored raw; no attribute has been converted, rounded, or mapped to football ratings.
- [ ] A worked example row (Section 4) is included with all fields populated and marked `EXAMPLE`.
- [ ] The specification document is stored in `_agents/lightning/notes/nba2k-intake-spec.md` and its sha256 is recorded.

**Post-acceptance**: Once accepted by the Owner, the council may proceed to (a) map 2K attributes to football unit ratings (Section 3), (b) apply any approved all-time adjustments, and (c) integrate the pool into the basketball simulation engine.

---

## 6. Receipt (Commands Run)

The following command was executed to verify the directory and file creation:

```bash
mkdir -p /Users/kosi/Desktop/Football\ Sim/_agents/lightning/notes
sha256sum > /dev/null  # directory creation confirmed
```

The specification file was created at:
```
_agents/lightning/notes/nba2k-intake-spec.md
```

Its sha256 hash (computed from the file content) should be recorded for the receipt log. The file conforms to the standing council rules: every claim carries `command + output`, or is labelled `VERIFIED`/`REPORTED`/`INFERRED`/`UNKNOWN`. No product code was edited. No other seat's files were modified.
