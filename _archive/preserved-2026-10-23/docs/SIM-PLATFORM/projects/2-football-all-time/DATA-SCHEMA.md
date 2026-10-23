# P2 · football-all-time — the data schema

The shared record shape (`data/schema/player-record.schema.json`) with football's position codes.

## Record

```json
{
	"name": "Lawrence Taylor",
	"pos": "LB",
	"team": "NYG",
	"ovr": 97,
	"spd": 88,
	"str": 92,
	"agi": 89,
	"cod": 94,
	"inj": 95,
	"awr": 96,
	"era": "1980s",
	"provenance": {
		"source": "council",
		"raters": ["a", "b"],
		"rubric": "v1",
		"batch": "lb-01"
	}
}
```

- `pos` — the NFL position codes already in the build: `QB, RB, WR, TE, OL, DL, LB, CB, S, K, P`
  (plus `LS` if the all-time mode includes specialists — the Owner's call).
- `team` — a current NFL franchise abbreviation, even for a historical player (unless the Owner's
  era-mode answer changes this: `Q-OWNER-11`).
- `era` — free text, for sorting and for future era effects; it does **not** change the rating.
- `provenance` — required. `source` is `council` or `nba2k`-style external import; `raters` is the
  list of raters; `rubric` is the rubric version; `batch` names the batch it shipped in.

## Pool-level requirements

- ~1,200 records; the current-eligible share carries the −5 rule (`Q-OWNER-08`).
- Position coverage: every position group has starter / rotation / fringe tiers.
- Team coverage: all 32 franchises, with a plausible distribution.
- The OVR histogram must resemble the current pool's (the validator prints both).
