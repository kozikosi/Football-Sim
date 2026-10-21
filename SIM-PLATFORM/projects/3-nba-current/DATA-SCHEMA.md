# P3 · nba-current — the data schema

The shared record shape with basketball's position codes.

## Record

```json
{
  "name": "LeBron James",
  "pos": "SF",
  "team": "LAL",
  "ovr": 98, "spd": 93, "str": 90, "agi": 92, "cod": 95, "inj": 92, "awr": 96,
  "era": "2000s-2010s",
  "provenance": { "source": "nba2k", "export": "2026-10-20", "mapping": "nba2k-v1", "batch": "nba-01" }
}
```

* `pos` — `PG, SG, SF, PF, C`. A player who is genuinely two-position (a point guard who is also a
  wing) is recorded by his **primary** position; the flexibility lives in the profile's flex rules,
  not in the data (`Q-OWNER-03`).
* `team` — the franchise the player is associated with in the transmitted ratings.
* the six attributes map from NBA2K's attributes through the **stated mapping file**
  (`data/nba/mapping-nba2k-v1.md`): `spd` → speed/transition, `str` → rim/physical strength,
  `agi` → lateral quickness, `cod` → skill/hand, `inj` → durability/availability,
  `awr` → basketball IQ.
* `provenance.source = "nba2k"` with the export date and the mapping version, so a mapping change is
  a regenerable diff.

## Pool-level requirements

* ~1,200 records; every team covered with a plausible distribution.
* Position coverage across PG/SG/SF/PF/C with starter / rotation / fringe tiers.
* The histogram check against the reference pool, as for the NFL.
