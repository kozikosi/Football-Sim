# DATA-SCHEMA.md — player database schema reference

**Purpose.** A reference document for the player database format across all sports. Each sport has its own data format, but they share common fields. This document defines the schema for each sport and the validation rules.

**How to use.** When submitting player data, follow the schema for the relevant sport. Validate your data against the rules before submitting. If you need a new field, propose it via SUBMISSIONS.md.

---

## Common fields (all sports)

| Field | Type | Range | Required | Description |
|-------|------|-------|----------|-------------|
| `name` | string | — | yes | Player's full name |
| `pos` | string | sport-specific | yes | Position code |
| `team` | string | sport-specific | yes | Primary team name |
| `ovr` | number | 0-99 | yes | Overall rating |
| `awr` | number | 0-99 | yes | Awareness/IQ |
| `inj` | number | 0-99 | yes | Injury/durability (higher = more durable) |
| `xf` | string or null | — | no | X-factor name |
| `source` | string | — | yes | How the rating was derived |
| `era` | string | decade | all-time only | Decade of peak (e.g., "1980s") |

## NFL-specific fields

| Field | Type | Range | Required | Description |
|-------|------|-------|----------|-------------|
| `spd` | number | 0-99 | yes | Speed |
| `str` | number | 0-99 | yes | Strength |
| `agi` | number | 0-99 | yes | Agility |
| `cod` | number | 0-99 | yes | Change of direction |

**Positions:** QB, RB1, RB2, WR1, WR2, WR3, WR4, TE1, TE2, OT1, OT2, OG1, OG2, C, DE1, DE2, DT1, DT2, DL5, MIKE, WILL, SAM, LB4, CB1, CB2, CB3, CB4, SS, SS2, FS, FS2, K, P, FB

**Teams:** 32 NFL teams (see nfl-alltime/data/players-template.json)

**Flex rules:** QB cannot flex. RB/WR/TE can flex to adjacent positions with penalties. OL positions flex among themselves. DL/LB/CB/S flex among themselves. See DEFAULT_WEIGHTS and FLEX in the NFL sim.

## NBA-specific fields

| Field | Type | Range | Required | Description |
|-------|------|-------|----------|-------------|
| `pts` | number | 0-50 | yes | Points per game |
| `reb` | number | 0-20 | yes | Rebounds per game |
| `ast` | number | 0-15 | yes | Assists per game |
| `stl` | number | 0-5 | yes | Steals per game |
| `blk` | number | 0-5 | yes | Blocks per game |
| `tov` | number | 0-8 | yes | Turnovers per game |
| `fg` | number | 0-100 | yes | Field goal % |
| `tp` | number | 0-100 | yes | 3-point % |
| `ft` | number | 0-100 | yes | Free throw % |
| `spd` | number | 0-99 | yes | Speed |
| `str` | number | 0-99 | yes | Strength |
| `agi` | number | 0-99 | yes | Agility |

**Positions:** PG, SG, SF, PF, C, BENCH1-5

**Teams:** 30 NBA teams (see nba-current/data/players-template.json)

**Flex rules (proposed):** PG↔SG (-3), SG↔SF (-3), SF↔PF (-3), PF↔C (-3), PG↔SF (-7), SG↔PF (-7), SF↔C (-7), PG↔PF (-12), SG↔C (-12), PG↔C (-15). Pending Owner approval.

## All-time specific

All-time databases add an `era` field (decade string, e.g., "1980s", "2020s") and apply era adjustments to OVR. Current players are eligible with a -5 OVR adjustment.

## File formats

- **JSON:** array of player objects (see templates in `data/players-template.json`)
- **CSV:** one row per player, header row with field names (see templates in `data/players-template.csv`)

## Validation rules (all sports)

1. Every player must have all required fields.
2. No duplicate players (same name + team).
3. All numeric fields must be within their specified ranges.
4. Position must be a valid position code for the sport.
5. Team must be a valid team name for the sport.
6. `source` must explain how the rating was derived.
7. `xf` is optional (null or omitted).
8. `era` is required for all-time databases, omitted for current databases.
9. Position balance: aim for roughly equal representation across positions.
10. Total players: ~1,200 for all-time (NFL/NBA), ~450 for NBA current, ~1,200 for NFL current.

## How to submit data

1. Fill in the template (JSON or CSV) for your sport.
2. Validate against the rules above.
3. Submit via SUBMISSIONS.md (your own section, S-### ID) or paste directly to the Owner.
4. Log your submission in CHRONICLE.md with evidence (row count, source, validation result).
5. Post a bulletin message announcing the submission.

## Status

- NFL current: data exists in the product file (1,200+ players, Madden NFL 27 ratings)
- NFL all-time: template created, awaiting data submission
- NBA current: template created, awaiting Owner's NBA2K ratings
- NBA all-time: template created, awaiting Owner's guidance on era adjustments
- Other sports: placeholder, awaiting Owner's priority decision
