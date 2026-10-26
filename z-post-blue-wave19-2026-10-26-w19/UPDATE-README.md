# UPDATE-README — z-post-blue-wave19-2026-10-26

## What this package is
Wave **19** of Z-post-blue: the Owner's round-13 directives — **the draft board unbroken and hardened**,
the homepage selects, the Team Comparison + Position Rankings + Madden Rankings pass, the Game Preview
pass, the During-the-Game badge language, and the **Season in Badges** cinematic. Base = wave 18
(`282017bd…`). The sim math (ratings, wins, game plans) did not move — UI, palettes and board logic only.

## The things to test first
1. **Draft board.** Priority and Gone are populated **from the first render** (no more "—" while the
   CPU picks). The **Fills chart sells a player at his natural position while one is open** — a flex
   appears only after every natural spot at his position is full. The player **cards** carry no flex
   fragments, the wins number sits **on top of the Draft button**, and the position cards stack in
   **depth-chart order**. The **Dime row has no box and no dash**. The Pick order / Depth chart and
   4-3 / 3-4 toggles share one line. Filled position names **shimmer**; 90+ names shimmer, 85+ burn brighter.
2. **Homepage.** The right dropdown (draft position) **never wears a logo**; the left team box shows the
   **full name** on a wide window and **logo + abbreviation** when compressed; the closed box wears the
   same **lighter colors as the open list** (light and dark verified); picking a team **recolors the
   whole page immediately**, season or not.
3. **Team Comparison.** The "empty pink boxes" bug is dead — every 90+ starter is visible again (the
   transparent wash no longer eats the shimmer gradient). The **Full Depth Chart** reads as three zones
   (OFFENSE · DEFENSE · SPECIAL TEAMS) with centered titles. The **Lineup & flex panel waits for the
   season**. Position Rankings: Cinzel Decorative, integer averages, player and number in **two colors
   of that team's palette**, no parentheses, and "Missing slots filled at 70 OVR" floats in at the bottom.
4. **Madden Rankings.** Weights are **badges** (click = next heavier tier, shift-click = lighter,
   MODEL WEIGHTS restores). The "Adjust any weight…" line lives just above them. The 70-OVR note fades
   in and out at the bottom of the team panel you click. The **ANCHOR / LEAK** chips replace the old
   sentence. Lineup editor boxes carry **only names**; the advice rows are bare OVR numbers; the group
   scores are **integer badges in one row with Rushing added**. The static 20-0 sits half a glyph
   further from the screen edge.
5. **Game preview.** No Opponent Scouting Report, no Your Team's Identity — the matchup math already
   says it. Matchup-math bars are **one solid team color**, full or empty. The standings put your
   division at **exactly twice** the width of every other box. Deep-navy teams (Texans, Seahawks,
   Patriots, Bears, Eagles, Jets) now wear their **badge silver** — brightened, identity intact.
   "Can you go 20-0?" is pinned to the panel's top-right corner with air around every word. The stars
   **face off across the rows**; "The matchup, player by player" is gone. `undefinedDIFF` is fixed
   (the standings map never had a `diff` field — the glance computes `pf − pa` itself now).
6. **During the game.** Every play speaks in boxes: **TD**, **FG**, yardage (**12Y**), **FF**, **FR**,
   **INT**; "run" is **rush**; a turnover ends with the **dot and the team that won the ball**.
   Cinzel Decorative owns the screen.
7. **Regular Season Review.** "The season in badges" is the **first panel** — offense badges, the three
   offensive stars, defense badges, the three defenders, your players' honors, KEY FACTORS — one badge
   a second. The books cinematic now opens on your **honored players first** (All-Pro shimmers, MVP
   title stacks three shimmering words), lets them drift down, then raises the playoff verdict to the
   center and waits for **CONTINUE**. "VS. ACTUAL NFL TEAMS" stays on the draft review page only.
   The 20-0 breathing is slow: long fade out, up to five dark seconds, slow return. The awards cards
   wear the new **stat-badge format** (PassY / TD / INT / 20-0 / RushY / SK / QBR / W). The Guide
   gains **THE BADGES: READING EVERY BOX**.

## Changelog (this chat — wave 19)
1. Draft: `userFits` natural-first; `boardEntries` always-on sim; cards (no flex text, wins over the
   Draft button, depth-chart order, single-column stack, 90+/85+ names); Dime row + CSS; toggle sizes;
   roster shimmer (filled slots, 90+, 85+).
2. Homepage: pick-box logo removed; responsive team box; popup-parity colors (incl. prefers-color-scheme);
   immediate `zpbApplyTeamTheme` on change.
3. Comparison: lineup-cell team vars + shimmer-gradient restore (the invisible-players fix); pre-season
   Lineup & flex gate; `zpbDepthZonesHTML`; editor line work; rankings typography/integer/two-color +
   floating 70-OVR note; ANCHOR/LEAK chips.
4. Rankings: weights as tier-cycling badges; moved sentence; team-detail 70 note; name-only lineup
   boxes; integer badge row + Rushing; 20-0 nudge.
5. Preview: scouting/identity panels removed; solid bars; standings 2× grid; navy-silver pack rule;
   20-0 corner placement; face-off rows (`zpb-pvfrow`); undefinedDIFF fix.
6. Game feed: chip language (FG/TD/yards/FF/FR/INT), turnover dot + winner box, Cinzel feed,
   `zpbStatChipsHTML` shared builder.
7. Review: `zpbSeasonStoryHTML` cinematic (badges, star cards, honors, key factors); dropdown removed;
   books cinematic honors-first staging; slow 20-0 breath; awards override in the badge format;
   first-team All-Pro shimmer; MVP stacked title; Guide badges section.

## Verification (this chat)
- `node --check` clean on all three script blocks after every patch (asserted-replacement scripts
  `w19_patch1..7`, plus the inline rebuilds — every anchor count-asserted).
- Draft: 5 full headless drafts (slow+instant, early/mid/late picks) — order integrity, ticker, 28
  user picks each, zero console errors; fills verified natural-first (Chase → WR1; flexes only after
  WR1/2/3 filled); priority/gone populated pre-turn.
- Season flow (headless): draft → begin season → hub → sim to review → story panel first (32 badges,
  14 cards, honors, KEY FACTORS, dropdown gone), books cinematic honors-first with verdict + CONTINUE,
  VS. ACTUAL hidden, awards chips + stacked MVP title present, Guide badges section live. Zero errors.

## Interpretations awaiting veto (ledger §L)
- "LEAK" chosen as the word opposite of ANCHOR (nautical pair; alternatives: DRAG, SOFT SPOT kept).
- The turnover badge reads "• KC" (dot + winner) in one box rather than two boxes.
- Weight badges cycle tiers [0,1,5,20,40,60,80,100,150,200,250,295,320,350,525,700] on click —
  shift-click steps down; MODEL WEIGHTS restores exact values.
- "Insane 20-0 cinematic" = the gold perfect-season skin on the story panel + verdict; say the word
  and it gets its own full-screen sequence.
- The story cinematic keeps the page scrollable while badges land; the verdict veil arrives after the
  last beat (~45 s) — or instantly under reduced motion.
