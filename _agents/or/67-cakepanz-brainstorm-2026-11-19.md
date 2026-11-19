67 Cakepanz / UI-UX brainstorm — seat OR · 2026-11-19 · date: 2026-11-19T21:00:00Z

Source: P-165..P-186 review briefs + item-6 sitting review + lane observations.

## Format principles (Owner doctrine)
- Plain informative language in recaps (no "expected scoring", no "before kickoff").
- Every turnover named; overtime events only in the overtime block, never "sudden death".
- "2-Pt Conv" except in the Guide; user's team in blue (`.ub`).
- Recaps show chronological scoring, turnovers, and the game ball.
- No horizontal scroll at 390 px; no console errors.
- Weights change Team Rankings instantly.

## Candidate improvements

### 1. Game review panel — shimmering player-of-the-game card
Replace flat-text review lines with a shimmering card showing game stats; season stats on the preview; OVR only in week 1. Remove the words "PLAYER OF THE GAME". The star is the opposite colour of the team palette. Final line "TB 29-34 NO" with each score in its team colour; "YOU WON"/"YOU LOST" with a shimmering star. Remove "FINAL ... You win/Turnovers ..." and the second set of team names; no "Turnovers - ARI 2 - 1 NO".

### 2. Game animation log lines
Panel 50 percent larger; far more space between quarters, no divider lines. Palette text. Every line "<team> <play> <yds>" (x yds after runs, receptions, FGs). Shimmering TD tag in the scoring team colour and an FG tag in the same place (shimmer only for a game-winning FG). Score as "x - y" (no "+7"). Turnovers as "x int y", "x fum", "y FF", "z FR", "x strips y & x recovers", ALWAYS with the time. Never print the words Touchdown or Turnover. Fix glitches: duplicate team lines, missing times, bare "Touchdown".

### 3. Lineups / Game Preview
No "undefined"; no too-dark colours; every slot filled (Cardinals WR1 was missing); ratings without parentheses; OFFENSE and DEFENSE headings centred; "effective ratings" note tiny and fading; team identity hidden unless clicked; foil shimmer on the winner of each matchup and on every 85+ player in the team colour.

### 4. Preseason layout
"Selected ..." line, "Why this style", Offense/Defense tables, "What do these terms mean" as large bubbles on one horizontal line at the bottom; strongest and weakest units side by side; top 3 setups as three designed cards; "New to flexing? Read this first" and "Group scores" on one line at the bottom; fade-in/fade-out on explanatory text; no white text.

### 5. Weights page
Buttons: MODEL WEIGHTS / SAVE MY WEIGHTS / MY WEIGHTS with disabled state. Model weights change Team Rankings instantly.

### 6. Contrast / accessibility
Dropdown and button text unreadable on dark teams (Patriots navy, Ravens purple, Titans light blue). AA holes: light gold2 1.51/1.65:1, dark rose-ink 3.17:1. Sign-off owed at cutover.

### 7. 390 px guardrail
Compact one-line banners: SEASON, PLAYOFFS, SUPER BOWL, CAN YOU GO 20-0? Small and horizontal. No horizontal scroll anywhere.

### 8. Team comparison / matchup visuals
Two-team advantages and disadvantages as visual chips (Strong Tight Ends, Weak Running Backs) instead of paragraphs. Chip vocabulary <= 30 labels. Matchup math as integers right-aligned with no ranks and no Ground game / Passing game / Turnovers / Sacks / Kicking lines; "+x WINS".

### 9. Scouting header
RECEIVING CORPS header; fix stray blue "#8".

### 10. Preseason link
The Preseason link in the team palette.

## Integration notes
None of the above touches the engine. All UI/CSS only. The engine stays single-sourced in `colors/` (Svelte 5 + Vite) at pin `d3bd81d2`; cakepanz consumes it as a frozen snapshot. No seat edits the other's tree.

## Queue tie-in
P-165..P-186 are already queued review items; this brainstorm is cross-referenced from my item-6 sitting review (inbox/20261119-2100-or-P2-item6-sitting-review.md).
