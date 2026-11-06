# THE OWNER'S WEIGHTS — PERMANENT OPINION (2026-11-06)

**Status:** the Owner's own words, saved verbatim as his permanent opinion on the weights the engine should be built around. This doc is the reference copy; the intake ledger (20261106-w77-intake-ledger.md) is the law record. **The salary column is internal reference for the council/engine work — it must never be displayed to the user on the app.**

## The table (xM salary · slot · z weight)

Format (the Owner's): "xM y z where x is my approximately and very rounded salary (in Millions) for a slightly above average player at that position, y is the position, and z is the weight i am choosing to give the player and that I would like shown to the user."

```
40M QB   1000      20M OT1   500      25M DE1   650      15M CB1   400
10M RB1   250      15M OG1   400      12M DE2   300      12M SS    300
 4M RB2   100       5M C     150      20M DT1   500      12M FS    300
 1M FB     25      10M OG2   250      10M DT2   300      10M CB2   250
25M WR1   650      12M OT2   300       5M DL5   150       4M NICKEL 100
15M WR2   400      12M MIKE  300                            2M DIME    50
 4M WR3   100       6M WILL  150
 2M WR4    50       3M SAM   100       2M K      50
10M TE1   250                          2M P      50
 5M TE2   150
 2M TE3    50
```

## Machine-readable block (for Claude's engine calibration — 76 Pancakes)

```json
{ "QB": 1000, "RB1": 250, "RB2": 100, "FB": 25, "WR1": 650, "WR2": 400, "WR3": 100, "WR4": 50,
  "TE1": 250, "TE2": 150, "TE3": 50, "OT1": 500, "OT2": 300, "OG1": 400, "OG2": 250, "C": 150,
  "DE1": 650, "DE2": 300, "DT1": 500, "DT2": 300, "DL5": 150, "MIKE": 300, "WILL": 150, "SAM": 100,
  "CB1": 400, "CB2": 250, "CB3": 100, "CB4": 50, "SS": 300, "FS": 300, "K": 50, "P": 50 }
```
- NICKEL = `CB3`, DIME = `CB4` (the shell's keys).
- Anchor: QB = 1000. The Owner manipulated "plus or minus 25 points" around the salary-derived shape by intuition.
- **Engine tolerance:** "try to land the slotWinsPerOvr revealed impact somewhere around these values but Claude has a plus or minus 50 room for deviation."
- The shell's SS2 / FS2 / LB4 are unpriced by the Owner; Z.ai held them at 10 (below DIME). Veto point 1 of the ledger.

## The WINS values for the Guide chart (Z.ai's calculation)

Conversion: the site's standing unit (w65 law) — **1 weight unit = 0.00254 wins over a 70 → 90 upgrade**. WINS = z × 0.00254, shown to two decimals in the Guide's slot table and one decimal on the Position Rankings buttons.

| Rank | Slot | Weight | WINS (70→90) | Tier |
|---|---|---|---|---|
| 1 | QB | 1000 | 2.54 | Franchise-changing |
| 2 | WR1 | 650 | 1.65 | High value |
| 2 | DE1 | 650 | 1.65 | High value |
| 4 | OT1 | 500 | 1.27 | High value |
| 4 | DT1 | 500 | 1.27 | High value |
| 6 | WR2 | 400 | 1.02 | High value |
| 6 | OG1 | 400 | 1.02 | High value |
| 6 | CB1 | 400 | 1.02 | High value |
| 9 | OT2 | 300 | 0.76 | Solid value |
| 9 | DE2 | 300 | 0.76 | Solid value |
| 9 | DT2 | 300 | 0.76 | Solid value |
| 9 | MIKE | 300 | 0.76 | Solid value |
| 9 | SS | 300 | 0.76 | Solid value |
| 9 | FS | 300 | 0.76 | Solid value |
| 15 | RB1 | 250 | 0.64 | Role players |
| 15 | TE1 | 250 | 0.64 | Role players |
| 15 | OG2 | 250 | 0.64 | Role players |
| 15 | CB2 | 250 | 0.64 | Role players |
| 19 | TE2 | 150 | 0.38 | Role players |
| 19 | C | 150 | 0.38 | Role players |
| 19 | DL5 | 150 | 0.38 | Role players |
| 19 | WILL | 150 | 0.38 | Role players |
| 23 | RB2 | 100 | 0.25 | Depth spots |
| 23 | WR3 | 100 | 0.25 | Depth spots |
| 23 | SAM | 100 | 0.25 | Depth spots |
| 23 | CB3 (NICKEL) | 100 | 0.25 | Depth spots |
| 27 | WR4 | 50 | 0.13 | Depth spots |
| 27 | TE3 | 50 | 0.13 | Depth spots |
| 27 | CB4 (DIME) | 50 | 0.13 | Depth spots |
| 27 | K | 50 | 0.13 | Depth spots |
| 27 | P | 50 | 0.13 | Depth spots |
| 32 | FB | 25 | 0.06 | Depth spots |
| 33 | SS2 / FS2 / LB4 | 10 | 0.03 | Depth spots |

Tier edges (the Guide's standing thresholds): Franchise ≥ 2.0 · High 1.0–2.0 · Solid 0.7–1.0 · Role 0.3–0.7 · Depth < 0.3. Every tier is populated under the Owner's table; none renders empty.

## What changed on the app (w77)

- **Madden Rankings page:** the MODEL preset + the boot weights = this table 1:1 (QB rides at 1000; the input ceiling rose 700 → 1000). The salaries are NOT in the app — the weights only.
- **Guide page:** the tier viz and the one-row-per-spot table re-rank by the WINS above; the two narrative sentences now describe the Owner's order (WR1 + edge lead after the QB; the tackles own the trenches; OG1/WR2/CB1 the next tier).
- **Engine:** untouched (Claude's lane; the ±50 tolerance lands in the 76 Pancakes math).
