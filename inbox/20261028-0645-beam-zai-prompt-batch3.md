SPEAKER: beam | ROLE: Council Adviser | TASK: PRIORITY+ batch 3 (from Owner's Z.ai prompt, 28 Oct) | DATE: 2026-10-28T06:45Z
FOR: PRIORITY+ (new items for council to claim)

## Batch 3 items (from Owner's latest Z.ai prompt)

### B3-1 — 3-game win streak cinematic timing
Cinematic appears at wrong time (before next game, on 1-game streak). Should only appear at END of a game once a 3-game win streak is achieved. Fix trigger condition.

### B3-2 — Kicker ratings too high
Kickers consistently highest-rated. Player ratings should be integers everywhere. Investigate rating generation for K/P.

### B3-3 — Guide page: personnel badges format + Dime viz
- Center offensive personnel "11, 12, 13, 21, 22". Add 10 ("1 RB, 0 TE, 4 WR").
- All personnel badges: "X Y" format (X = count, Y = position).
- Add Dime visualization to coaching panel (between Nickel and Focus). Remove Defense panel from Guide.
- Rename "20-0" → "PRTG" where it refers to passer rating (Guide badge only).
- Add more panels to "On the player panels" visualization, organized by league leaders stats (left-to-right, QB first).

### B3-4 — Footer dark button alignment
Dark button is one char shorter, appears on single line. Move it below other options, centered.

### B3-5 — ResizeObserver loop error on Guide page
"A display engine reported a setback... ResizeObserver loop completed with undelivered notifications." Fix the observer that triggers this.

### B3-6 — Sim Season button always highlighted
Should only highlight on hover. Add "Are you sure you want to simulate the regular season?" confirmation dialog.

### B3-7 — Chargers gold text on blue panels (light mode)
Gold text unreadable on blue panels in light mode. Fix contrast. Keep 90+ shimmer / 85+ bold rules. Check all teams for similar exceptions.

### B3-8 — Full lineups in game preview: inconsistent 90+ shimmer / 85+ bold
Enforce the rule consistently in full lineups, not just key players.

### B3-9 — Remove "Why these plans?" dropdown from game plan panel.

### B3-10 — "This Season in Badges" game report visualization
Structure: "28-6" on one line, "@ BILLS" on next (capitalized team name, lowercase "vs", no dot/week number). Reduce text size.

### B3-11 — All numbers integers (including PTS SCORED PER GAME on review cards).

### B3-12 — Lineup dropdown: show OVR after player name (only in dropdown, not static)
Format: "<Name> x" where x = OVR (or Return rating for KR/PR).

### B3-13 — KR/PR slots: show return rating on right side of box (like other numbers). Static: only player name.

### B3-14 — "Your Full Depth Chart": Special Teams under Offense/Defense in horizontal pane. Center Offense/Defense panels. Apply 85+ bold / 90+ shimmer. Capitalize NICKEL/DIME everywhere. Overall grade x.

### B3-15 — End-of-season badges appear automatically
When season ends, badges appear one-by-one (like playoffs). Currently only on "Your Roster" → "Season" transition.

### B3-16 — Replace "Giveaways" table with Draft Pick Grade table (letter grades).

### B3-17 — Remove "Green = your unit..." text.

### B3-18 — Light mode contrast on season stats badges (Chiefs red on red). More contrast. Check all teams.

### B3-19 — Regular season awards: visually obvious if your player made All-Pro/Pro Bowl. Maybe only your players shimmer; line around their panels.

### B3-20 — "IN DA CLUTCH" → "CLUTCH GAMES".

### B3-21 — "RUSHER WON" capitalized in sacks visualization.

### B3-22 — Remove "x SK A" → "x SK" for OL. "PRSS A" → "PRSS".

### B3-23 — Remove "TEAM A TEAM B" from top of Team Comparison tab/page.

### B3-24 — "Start a new season (same roster)" + "Start a new draft" buttons at bottom of every screen during season (missing on Season/Your Roster/Team Comparison tabs at end of regular season).

### B3-25 — Remove "What drives winning in this model" bar graph from 100 Seasons review.

### B3-26 — "Plans across the league" in 100 Seasons: list focuses vertically with percentages. Fix sum >100%.

### B3-27 — Regular Season Review panel above badges (including Sim Playoffs button).

### B3-28 — "Las Vegas Raiders — Super Bowl Champions": remove dash. Visualize more.

### B3-29 — CPU draft: no second QB until round 25. Brock Purdy as RB1 issue.

### B3-30 — Team comparison: "81.56 vs 80.86" centered, integers. All numbers integers except PRTG.

### B3-31 — Season review: Unit Report Card as badges (letter grades per unit), not hover. Remove current Unit Report Card panel. Title top panel "UNIT REPORT CARD".

### B3-32 — Remove "What separated the playoff teams" panel.

### B3-33 — Remove "(by cumulative game impact)" from All-Playoff team.

### B3-34 — "Regular-Season Awards & Honors" capitalized.

### B3-35 — "DEF TD" → "TD" everywhere.

### B3-36 — Returners sorted by rating in playoff stats.

### B3-37 — "Try again to go 20-0?" → three buttons: "RUN IT BACK · SAME TEAM", "CALL AN AUDIBLE · NEW TEAM", "CANCEL".

### B3-38 — Madden Rankings: anchor green → pink.

### B3-39 — Homepage: more pink, less brown (both modes).

### B3-40 — Player Browser: center everything.

### B3-41 — Mobile: no horizontal scroll. Consider swipe-through players on mobile.

### B3-42 — Position Rankings: no horizontal scroll, every player on same line as OVR.

### B3-43 — Team Comparison (footer): align right team dropdown to right of panel.

### B3-44 — Display full team name on mobile (not truncated to "Kansas City").

### B3-45 — Remove "Elephant", use "DL5" everywhere.

### B3-46 — "Where they line up": Nickel swaps with DE; Dime on same horizontal line as Nickel; DL directly across from OL.

### B3-47 — Coaching panel: remove "Every offense also has a quarterback..." text.

### B3-48 — Balanced/neutral focus: "≡" instead of three balls.

### B3-49 — Draft board "Why these plans?" → remove "not just size" from first two sentences; put on different lines.

### B3-50 — Draft review: hover position → player card lights up below.

### B3-51 — "Where they belong" → "Where your players line up?"

### B3-52 — Remove "Every starter wears his initials..." text.

### B3-53 — "Your breakdown" under player panels, below "Position rank counts..."

### B3-54 — Turn into panels/badges.

### B3-55 — Game preview: max 3 stats/badges per player, no zero stats. Fix "Aidan Hutchinson" bunched text.

### B3-56 — End of season: "Regular season is in the books" panel should only appear at end of cinematic, not flash and disappear.

### B3-57 — Nickle/Dime coverage rules (Nickel covers WR3, Dime covers WR4) — internal, don't display.

### B3-58 — Cinematics: "SEASON OPENER" before game 1. Division rival phrases random generator. Alternating wording list provided.

### B3-59 — Player cards: audit 90+ shimmer / 85+ bold / neutral, all in team colors.

### B3-60 — During game: 90+ shimmer / 85+ bold / neutral in team colors (reinforce).

### B3-61 — During game: all TDs written as "[TD]" with box.

### B3-62 — During game: "AT" → "@".

### B3-63 — Defensive TD + fumble on same play: "x[FF]y[FR][TD]" or "z[FUM]x[FF][FR][TD]" format.

### B3-64 — ResizeObserver loop error (recurring).

EVIDENCE: REPORTED (Owner's prompt, 28 Oct)
SAFE ALONE?: varies per item
