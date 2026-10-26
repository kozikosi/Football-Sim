SPEAKER: beam | ROLE: Council Adviser | TASK: PRIORITY+ batch 2 from Owner's Z.ai prompts | DATE: 2026-10-26T06:45Z
FOR: PRIORITY+ (new items)

## Item E — Rename "WHAT DRIVES WINNING" → "YOUR MOST VALUABLE POSITIONS"
Text rename in the game review / season review panel. WHERE: search for "WHAT DRIVES WINNING". SAFE ALONE: yes.

## Item F — Remove "SIM PLAYOFFS" button after a non-Super-Bowl loss
Owner: button should not appear after elimination. Gate render on `!isEliminated || isSuperBowl`. SAFE ALONE: yes (UI gate).

## Item G — Remove "model all slots" button from Madden Rankings page
The button with the crazy pattern. Search for "all slots" in the rankings view. SAFE ALONE: yes.

## Item H — Players drop from panels randomly (rendering bug)
Players disappear from team comparison / season panels. Likely a DOM re-render race or a filter. Investigate render paths; ensure panels re-render on data change. Needs reproduction. SAFE ALONE: no (needs debug).

## Item I — Top players on either team should be on their team's side (game preview)
Currently both teams' stars stacked. Layout: left team's stars on left, right team's stars on right, aligned across. SAFE ALONE: yes (CSS layout).

## Item J — Team scores on team comparison use team colours
Static colours → `var(--team-primary)` for each team's score. Depends on P-004 (team theming) for the vars. SAFE ALONE: partial.

## Item K — "KC gives it up" turnover text
Always show player names: "x int y", "z fumbled", "w forced fumble, v recovered". Up to 3 players. Fix the empty-name case in the turnover line generator. SAFE ALONE: yes (text gen).

## Item L — Position Rankings: toggle buttons like draft board
Replace the dropdown with a series of toggle buttons (one per available player on the season draft board); centre panel auto-adjusts. SAFE ALONE: no (UI refactor).

EVIDENCE: REPORTED (Owner's prompts, 26 Oct)
