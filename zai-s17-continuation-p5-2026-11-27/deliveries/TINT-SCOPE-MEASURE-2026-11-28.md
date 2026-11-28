# TINT SCOPE MEASUREMENT — both scopes, 32 teams, LIGHT mode (GENERATED — the scope is NOT picked)

Item 9 (orcads R8 / HY4 W8): the takeover tint scope is **DEFERRED — the Owner picks**. Both measured tables are filed here; the fix that landed (either scope keeps it) is the named repair in `src/lib/port/takeover.ts:tintOf()` — start the 12% mix, halve the ratio while the mix degrades the gold's contrast against the plain panel, fall back to the panel. Panel and gold are IMPORTED from `tokens.ts` (`PANEL_HEX_LIGHT` = #ffffff, light gold ink `LIGHT.gold3` = #9a6b1f) — no copied colour literals, and the receipt measures the same surface the tint draws on.

Regressions after the repair: **zero** team(s) degrade the gold's contrast in light mode (before the repair the dark primaries — Arizona first — degraded; the halving loop now walks them back to the panel).

## Scope A — chip/border-only (tint vs panel; WCAG 1.4.11 non-text bar 3:1)

| team | panel | tint | tint vs panel | ≥3:1 | tint vs gold |
|---|---|---|---|---|---|
| Arizona Cardinals | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Atlanta Falcons | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Baltimore Ravens | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Buffalo Bills | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Carolina Panthers | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Chicago Bears | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Cincinnati Bengals | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Cleveland Browns | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Dallas Cowboys | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Denver Broncos | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Detroit Lions | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Green Bay Packers | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Houston Texans | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Indianapolis Colts | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Jacksonville Jaguars | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Kansas City Chiefs | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Las Vegas Raiders | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Los Angeles Chargers | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Los Angeles Rams | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Miami Dolphins | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Minnesota Vikings | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| New England Patriots | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| New Orleans Saints | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| NY Giants | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| NY Jets | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Philadelphia Eagles | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Pittsburgh Steelers | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| San Francisco 49ers | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Seattle Seahawks | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Tampa Bay Buccaneers | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Tennessee Titans | #ffffff | #ffffff | 1 | FAIL | 4.67 |
| Washington Commanders | #ffffff | #ffffff | 1 | FAIL | 4.67 |

## Scope B — gold→paper ink (gold text ON the tinted surface; WCAG AA text bar 4.5:1)

| team | panel+gold (before) | tint+gold (after) | AA 4.5:1 | regression |
|---|---|---|---|---|
| Arizona Cardinals | 4.67 | 4.67 | PASS | no |
| Atlanta Falcons | 4.67 | 4.67 | PASS | no |
| Baltimore Ravens | 4.67 | 4.67 | PASS | no |
| Buffalo Bills | 4.67 | 4.67 | PASS | no |
| Carolina Panthers | 4.67 | 4.67 | PASS | no |
| Chicago Bears | 4.67 | 4.67 | PASS | no |
| Cincinnati Bengals | 4.67 | 4.67 | PASS | no |
| Cleveland Browns | 4.67 | 4.67 | PASS | no |
| Dallas Cowboys | 4.67 | 4.67 | PASS | no |
| Denver Broncos | 4.67 | 4.67 | PASS | no |
| Detroit Lions | 4.67 | 4.67 | PASS | no |
| Green Bay Packers | 4.67 | 4.67 | PASS | no |
| Houston Texans | 4.67 | 4.67 | PASS | no |
| Indianapolis Colts | 4.67 | 4.67 | PASS | no |
| Jacksonville Jaguars | 4.67 | 4.67 | PASS | no |
| Kansas City Chiefs | 4.67 | 4.67 | PASS | no |
| Las Vegas Raiders | 4.67 | 4.67 | PASS | no |
| Los Angeles Chargers | 4.67 | 4.67 | PASS | no |
| Los Angeles Rams | 4.67 | 4.67 | PASS | no |
| Miami Dolphins | 4.67 | 4.67 | PASS | no |
| Minnesota Vikings | 4.67 | 4.67 | PASS | no |
| New England Patriots | 4.67 | 4.67 | PASS | no |
| New Orleans Saints | 4.67 | 4.67 | PASS | no |
| NY Giants | 4.67 | 4.67 | PASS | no |
| NY Jets | 4.67 | 4.67 | PASS | no |
| Philadelphia Eagles | 4.67 | 4.67 | PASS | no |
| Pittsburgh Steelers | 4.67 | 4.67 | PASS | no |
| San Francisco 49ers | 4.67 | 4.67 | PASS | no |
| Seattle Seahawks | 4.67 | 4.67 | PASS | no |
| Tampa Bay Buccaneers | 4.67 | 4.67 | PASS | no |
| Tennessee Titans | 4.67 | 4.67 | PASS | no |
| Washington Commanders | 4.67 | 4.67 | PASS | no |

## The decision this table serves (NOT made here)

- Scope A keeps the tint as decoration only: no text ever rides the tinted surface; the bar is non-text contrast against the panel.
- Scope B moves the gold ink onto the tinted surface: the bar is AA text contrast, and the delivered bytes' defect (dark primaries — Arizona Cardinals first — pulled the gold below the before-contrast) is the regression the halving repair kills.
- The Owner picks one scope; the full-scope fix is then built to THAT bar. Nothing here weakens waveB W8 (contrast never degrades, after ≥ before, both modes).
