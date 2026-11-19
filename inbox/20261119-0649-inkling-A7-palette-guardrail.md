SPEAKER: INKLING | ROLE: seat (MUSE delegation) | TASK: A7 — the palette guardrail audit: all 32 team primaries × the two house panels | DATE: 2026-11-19T06:49Z

Method (this window, node v26.13.0): wcag 2.1 relative luminance + contrast ratio, computed by `palette-guardrail.cjs` against
the project's own palette file `src/lib/assets/zpb-team-colors.json` (the Owner's 22-Oct 32-team table, 3 hexes/team — primary used);
panels = the house tokens from `tokens-w89.css` + `probe-contrast.mjs` (`#fdf2f6` light pale rose, `#1e1119` dark plum).
The w89 design never sets body text in team hues (gold does that — 11.30:1 on plum, PASS); team hues carry borders/frames/tints.
This audit measures the 64 primary-on-panel pairs the theming implies.

## Result matrix (32 rows × 2 modes; 64 pairs)

| team | hex | light #fdf2f6 | dark #1e1119 |
|---|---|---|---|
| Arizona Cardinals | #97233F | **7.31** | 2.29 FAIL |
| Atlanta Falcons | #A71930 | **6.80** | 2.46 FAIL |
| Baltimore Ravens | #241773 | **13.29** | 1.26 FAIL |
| Buffalo Bills | #00338D | **10.34** | 1.62 FAIL |
| Carolina Panthers | #0085CA | 3.69 FAIL | **4.53** |
| Chicago Bears | #0B162A | **16.52** | 1.01 FAIL |
| Cincinnati Bengals | #FB4F14 | 3.08 FAIL | **5.42** |
| Cleveland Browns | #311D00 | **14.70** | 1.14 FAIL |
| Dallas Cowboys | #003594 | **9.92** | 1.69 FAIL |
| Denver Broncos | #FB4F14 | 3.08 FAIL | **5.42** |
| Detroit Lions | #0076B6 | **4.50** | 3.71 FAIL |
| Green Bay Packers | #203731 | **11.63** | 1.44 FAIL |
| Houston Texans | #03202F | **15.35** | 1.09 FAIL |
| Indianapolis Colts | #002C5F | **12.59** | 1.33 FAIL |
| Jacksonville Jaguars | #101820 | **16.37** | 1.02 FAIL |
| Kansas City Chiefs | #E31837 | 4.31 FAIL | 3.87 FAIL |
| Las Vegas Raiders | #000000 | **19.21** | 1.15 FAIL |
| Los Angeles Chargers | #0080C6 | 3.92 FAIL | 4.27 FAIL |
| Los Angeles Rams | #003594 | **9.92** | 1.69 FAIL |
| Miami Dolphins | #008E97 | 3.61 FAIL | **4.63** |
| Minnesota Vikings | #4F2683 | **9.91** | 1.69 FAIL |
| New England Patriots | #002244 | **14.64** | 1.14 FAIL |
| New Orleans Saints | #D3BC8D | 1.69 FAIL | **9.87** |
| NY Giants | #0B2265 | **13.42** | 1.24 FAIL |
| NY Jets | #125740 | **7.80** | 2.14 FAIL |
| Philadelphia Eagles | #004C54 | **8.89** | 1.88 FAIL |
| Pittsburgh Steelers | #FFB612 | 1.61 FAIL | **10.40** |
| San Francisco 49ers | #AA0000 | **7.09** | 2.36 FAIL |
| Seattle Seahawks | #002244 | **14.64** | 1.14 FAIL |
| Tampa Bay Buccaneers | #D50A0A | **4.95** | 3.37 FAIL |
| Tennessee Titans | #4B92DB | 2.99 FAIL | **5.60** |
| Washington Commanders | #5A1414 | **12.43** | 1.34 FAIL |

**9 of 32 fail on the light panel** (Carolina 3.69 · Cincinnati/Denver 3.08 · Detroit 4.50 · KC 4.31 · Chargers 3.92 · Dolphins 3.61 · Saints 1.69 · Pittsburgh 1.61 · Titans 2.99).
**25 of 32 fail on the dark plum panel** (all the saturated darker primaries; passing: Carolina 4.53 · Cincinnati/Denver 5.42 · Miami 4.63 · Titans 5.60 · Pittsburgh 10.40 · Saints 9.87).

## What this does NOT measure (named, honest)
- Surface pairing (text ON a team-hue tint) — the V23 doctrine uses near-white team tints as backgrounds with neutral ink; that pairing varies by team and is the Architect's to measure at cutover.
- The gold house accents (gold `--gold2` passes on plum; gold2 on pale-rose FAILS 1.51:1 — the known Owner-gated hole from c9's probe-contrast).
- Any mode's "AA large" margins (3:1) — every team primary passes 3:1 on the light panel except Pittsburgh (1.61) and Saints (1.69).

## The decision this hands the Owner (one ruling, no ambiguity)
Team hues are safe for **borders, frames, team tints (behind dark ink), and champion framing** — they are not safe as **text on either house panel** at 4.5:1 for 9 teams (light) / 25 teams (dark). The w89 doctrine already carries this implicitly (text is gold/ink; team colours frame); Codifying it: **gold = text; team hue = frame; near-white team tint = background with ink text on it — every pair must then be measured, not assumed.** The 25-dark-fail number says any future "team hue for accent text on dark mode" idea dies on arrival; if the Owner ever wants that, the ask is per-team deep-tint-or-desaturate variants, measured per pair.

— INKLING, 2026-11-19T06:49Z; script cited; 64/64 pairs measured this window.
