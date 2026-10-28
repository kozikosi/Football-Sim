# W30 INTAKE LEDGER — Z.ai · session 22 · 2026-10-28

Owner round-30 message, mapped line by line. Baseline: w29 (md5 7286495b…, 1,360,583 B).
Product name law: **Football-Sim-Z-post-blue-w30.html**; zip ends **w30**.

## §A · MADDEN Rankings page

| # | Directive | Map |
|---|-----------|-----|
| A1 | The yellow framing behind the anchors is distracting/too bright — choose a different color | recolor the series-anchor chip/frame on the rankings page (my pick of calmer color, flagged) |
| A2 | Bold on the player rankings page is extremely inconsistent — ALL players 85+ bold | enforce the 85+ bold law on every rankings row (find rows where font-weight is not applied) |
| A3 | Remove AGI, COD, INJ, AWR from being visible on the website at all; narrow the panel in response | delete the four attribute columns wherever rendered (rankings panels, player cards, anywhere); narrow container |
| A4 | A player is never on a separate line from his OVR score (Warren Mcclendon JR / 73 on the 9-series first panel) | keep name+OVR on one line (no wrap between them) on rankings rows |

## §B · THE SERIES

| # | Directive | Map |
|---|-----------|-----|
| B1 | Make "7 · QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1" the default series on the site | series default 9 → 7 (all entry points: rankings view, draft series buttons if any) |

## §C · Team Comparison

| # | Directive | Map |
|---|-----------|-----|
| C1 | Move the second team's dropdown panel to align with the right of the panel | Team B select right-aligned (re-check w29 state; tighten) |
| C2 | "I repeat again": full team name "KANSAS CITY CHIEFS" or "CHIEFS", never "KANSAS CITY". Expand the panel and the dropdown menu wide enough for the LONGEST full team name | widen comparison bar + option list to longest full name; options/bar show full name (or nickname) — never city-only; replaces w29's nickname-below-1100px tier |

## §D · Guide — Where they line up ("almost perfect")

| # | Directive | Map |
|---|-----------|-----|
| D1 | Move the CBs directly opposite the WRs, OVER the line of scrimmage | CB y = LOS line (press depth), x = WR x |
| D2 | Move NICKEL to exactly where it is but on the LEFT side of the MIKE; place the DIME exactly where the NICKEL is | nickel to the left-side slot gap; dime at the nickel's station (same x, stacked just behind — flagged) |
| D3 | (Repeat) Key shapes: DT2 always a square, ILB2 and SAM always triangles | re-assert shape law in the shared front kit + verify both sections |

## §E · Draft page

| # | Directive | Map |
|---|-----------|-----|
| E1 | The (X.Y) round.pick indicator: right size, but Cinzel Decorative and unbolded | font-family + font-weight change only |

## §F · Depth chart / positions

| # | Directive | Map |
|---|-----------|-----|
| F1 | DIME is still not formatted like every other position on the depth chart | make the DIME row/label identical in format to sibling rows |
| F2 | Add TE3, WR4, DL5 to the depth chart — and to every visual menu. Don't worry about the math (Claude is on that) | DEPTH_CHART_GROUPS + lineup/flexes menu + any visual slot list; display-only |
| F3 | Make sure "defensive line" and "DL" are in the glossary and understood on the Guide page | glossary entries + Guide wording uses DL coherently with the field map |

## §G · Post-draft cinematic

| # | Directive | Map |
|---|-----------|-----|
| G1 | Reduce the time it lingers on screen by a FULL TWO SECONDS (still) | subtract 2000 ms from the post-draft linger timers |

## §H · During-the-game screen

| # | Directive | Map |
|---|-----------|-----|
| H1 | Even if nothing significant happens in a quarter, still show "FIRST QUARTER" (etc.) and pause ~1 s before the next quarter card. A game skipped Q1 and Q2 entirely | quarter cards unconditional; ≥1 s dwell per card |
| H2 | All players written in their team's colors; [INT] / [FF] / [FG] / [34Y] etc. badges in the color of the team they benefit | pbp line coloring law |
| H3 | Fumbles read "X [FF] Y" (X = forced the fumble, Y = fumbled and lost it). Remove fumble recoveries from the during-game menu | rewrite fumble line; drop FR lines from live pbp |
| H4 | INT returned for TD reads "X [INT][TD] Y" (X = interceptor who scored, Y = the thrower). Kill "BAL D.J. Reed interception return" prose | pick-six line law |
| H5 | A fumble recovery can only occur for a player who could be on the field — a defensive player recovering is sufficient in all cases | recovery attribution law (Game Review FR badges included) |
| H6 | Safeties read "X [SAF] Y" (X = the defensive player who caused it, Y = the offensive player tackled in the endzone — QB, RB, FB, or WR) | rewrite SAF line |
| H7 | Ravens colors too dark on the during-game screen — brighten ALL dark colors | lightness floor for team colors on the live game screen |

## §I · Stat abbreviations

| # | Directive | Map |
|---|-----------|-----|
| I1 | Replace the "C" of carries with "CAR" | badge law + Guide glossary + tables |
| I2 | Contradicts a previous request: NEVER use "SKS" even if plural — always "SK" | replace every SKS occurrence |

## §J · Dropdown titles

| # | Directive | Map |
|---|-----------|-----|
| J1 | ALL dropdown menu titles capitalized, including "LINEUP AND FLEXES" | uppercase every dropdown/summary title sitewide |

## §K · Schedule

| # | Directive | Map |
|---|-----------|-----|
| K1 | Randomize the schedule while keeping two divisional games home and away ("the user always plays a game away and at home against the teams in their division"). Currently Chiefs always get Bears first, Broncos second | shuffle non-divisional matchups + week order; keep divisional home/away pairs |

## §L · Sim Game

| # | Directive | Map |
|---|-----------|-----|
| L1 | Add a "SIM GAME" button next to "SIM SEASON" that simulates ONE actual game; the user then sees the Game Review page next | new button → full-engine single-game sim → Game Review view |

## §M · Self-guidance

| # | Directive | Map |
|---|-----------|-----|
| M1 | w29 → w30 naming law everywhere (html + zip end with w30) | START §3 rewrite (session 22), ZAI.md rewrite, filenames |

## §Open · Interpretations to flag (for Owner veto)

1. **D2 stations** — "Nickel exactly where it is but on the left side of the Mike" read on-screen: Nickel sits in the LEFT slot gap at its current depth; Dime takes the exact same x as Nickel, one bubble deeper so both remain visible (they cannot occupy the same pixel and both be seen).
2. **C2 name tier** — the comparison bar + option list now carry the full team name ("Kansas City Chiefs") at every width, panel widened to the longest name (Raiders/Buccaneers/Chargers…); the w29 nickname-at-narrow-width tier is retired.
3. **H6 second defender** — the SAF line shows the primary defender only ("X [SAF] Y"); w28's second-defender credit is dropped from the live line (stats keep the first).
4. **A1 anchor color** — yellow → a muted desaturated bronze/gold tint well below glare level (my pick, flagged).
5. **H7 floor** — "brighten ALL dark colors" = a minimum-lightness clamp applied to every team color used as TEXT on the during-game screen (dark navy/black-ish palettes lifted to a readable tint; palettes already bright enough unchanged).
6. **L1 engine** — SIM GAME runs the real game engine instantly (no play-by-play playback) and opens the Game Review page for that game.
7. **F2 display slots** — TE3/WR4/DL5 render in every visual list; where the roster math does not yet supply a player (Claude's task), the slot shows the next-best player or a generic, per the depth chart's existing convention.
