# V22 Visual Spec — Every Visual Instruction Made Checkable

**SPEAKER: VLOC | ROLE: council | TASK: V22-READY-1 visual spec — EVERY visual instruction, made checkable | DATE: 2026-10-22**

Build under test: `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B), @ `merge/v20-donor`. Read-only on product; write only in `_agents/vloc/`. Do not edit V22-Suggestions.md.

## How to read this document

Each visual instruction from `V22-Suggestions.md` is reduced to one spec line:

**item · exact element (selector or description) · exact rule (CSS or behaviour) · exact viewport(s) · the observable that decides pass/fail**

If an instruction cannot be reduced to an observable (it needs the Owner's taste or a reference image), it is flagged **JUDGEMENT** — the document should say so rather than pretend it is testable.

Grouped by screen. Designs are not new; they are reductions of existing asks into pass/fail form.

---

## Screen: Draft Board

### D1 — Remove "Value Here" column (P0-1)

- **Element:** `#draftTable2 td.dc-val` cells (l.1766), header `<th data-sort="value">` (l.426), CSS rule `#draftTable2 td.dc-val` (l.268), sort `<option value="value">` (l.418), guide bullet (l.4991), section title (l.5056).
- **Rule:** All 7 locations removed; the `r.v` value remains computed in background math (priority bars, flex comparisons, sort key) but is not rendered anywhere visually.
- **Viewport:** 1280×900 (desktop draft board).
- **Pass/Fail:** The board renders 9 columns instead of 10; no cell contains "Value here"; `r.v` still drives Priority (`dc-pri`, now spanning grid-column 7→13 at l.269) and the priority bar. `node --check` clean; 0 console errors on draft page load.

### D2 — Position card colors reflect user's team (P7-1, P0-12/#194, P0-18/#172, P11-5, P0-24)

- **Element:** Position cards on the draft board (each player card row/card).
- **Rule:** Each card has a left border (4px solid `var(--team-primary)`) in the user's selected team's primary color; hover shows `var(--team-secondary)` (3px). CSS variables `--team-primary`, `--team-secondary`, `--team-accent` set on `:root` when a team is selected. KC: red+white+yellow; SEA: blue+green+white.
- **Viewport:** 1280×900 (desktop) and 390×844 (mobile compact row).
- **Pass/Fail:** Picking KC turns left borders red; picking SEA turns them blue. Cards retain position-abbr+OVR on mobile. Color never appears without a text label (position abbr + OVR) as the second marker.

### D3 — User's pick row: larger + glow (P7-3)

- **Element:** The draft board row corresponding to the user's current pick.
- **Rule:** Card scale 1.1× with a subtle glow (box-shadow `0 0 12px var(--team-accent)`).
- **Viewport:** 1280×900.
- **Pass/Fail:** The row the user is currently picking is visibly larger than neighbor rows and has a glow tinted to team accent color.

### D4 — Position group color coding (P7-3)

- **Element:** Position cards grouped by QB/RB/WR/TE/OL/DL/LB/CB-S/K-P.
- **Rule:** Each group gets a distinct accent color applied to a small badge/dot on the card (QB blue, RB green, WR orange, TE purple, OL gray, DL red, LB teal, CB/S yellow, K/P brown).
- **Viewport:** 1280×900.
- **Pass/Fail:** Cards of the same position group share a badge color; different groups differ.

### D5 — Gone players dimmed + strikethrough (P7-3)

- **Element:** Draft board rows for already-drafted players.
- **Rule:** Opacity reduced (~50%) and `text-decoration: line-through`.
- **Viewport:** 1280×900.
- **Pass/Fail:** Drafted players are visually distinct from available players.

### D6 — "You're on the clock" bigger (P0-12/#186, P0-18/#165)

- **Element:** The on-the-clock indicator text at l.405.
- **Rule:** font-size increased to 1.15rem.
- **Viewport:** 1280×900.
- **Pass/Fail:** The clock text is visibly larger than surrounding panel text.

### D7 — Flex potential: only −2/−4 before round 20, −6/−8 after (P0-12/#195, P0-18/#171)

- **Element:** The "also fits" / flex-potential display on draft board player cards (l.1764 area).
- **Rule:** Before round 20, only −2 and −4 flex penalties are shown; after round 20, −6 and −8 may appear.
- **Viewport:** 1280×900.
- **Pass/Fail:** At round 19, no −6/−8 text appears on any card; at round 21, −6/−8 text may appear.

### D8 — "also fits" format: "x also y (−z flex)" (P0-12/#190, P0-18/#176)

- **Element:** The alternative-slot suggestion text on player cards (l.1764).
- **Rule:** Format changes from "also fits: CB1 +1.37" to "also CB1 (−2 flex)". No wins number, no word "fits". Only −2 and −4 shown before round 21.
- **Viewport:** 1280×900.
- **Pass/Fail:** Card reads "also CB1 (−2 flex)" not "also fits: CB1 +1.37".

### D9 — Draft board visible size expanded (P0-12/#188, P0-18/#166)

- **Element:** The draft board panel/container (max-height at l.187).
- **Rule:** max-height increased from 640px to 704px so ~2 more names are visible without scrolling.
- **Viewport:** 1280×900.
- **Pass/Fail:** Two additional player rows are visible in the draft board panel without scrolling.

### D10 — Mobile draft board: compact row (P0-12/#191, P0-18/#168)

- **Element:** Position cards on mobile draft board.
- **Rule:** Cards collapse to a compact row showing icon + position abbreviation + OVR only; tap expands to full card.
- **Viewport:** 390×844.
- **Pass/Fail:** On mobile, each position card shows only icon/abbr/OVR until tapped; expanded state shows full attributes.

### D11 — Sort/filter controls sticky or collapsible (P0-18/#169)

- **Element:** Sort/filter controls above the draft board.
- **Rule:** Either `position: sticky` header or a collapsible panel.
- **Viewport:** 390×844 and 1280×900.
- **Pass/Fail:** Controls remain reachable when scrolling the board.

---

## Screen: Team Comparison / Unit Comparison Table (P0-10, P0-19, P0-24)

### T1 — Remove parentheses from row labels (P0-10/#166, P0-19/#168)

- **Element:** `#viewCompare .unit-comparison-table` rows (l.3420 area), all 12 rows.
- **Rule:** All labels lose their `(...)` parentheticals: "Offense (QB+RB+WR+TE+OL)" → "Offense", "Wide Receivers (WR1-3)" → "Wide Receivers", etc.
- **Viewport:** 1280×900.
- **Pass/Fail:** No row label contains a `(` character. Secondary (CB+S) → Secondary; Run Defense (DL+LB+SS+NB) → Run Defense.

### T2 — Reorganize by Offense then Defense with separator (P0-10/#166, P0-19/#168, P0-24/#1580)

- **Element:** The Unit Comparison table.
- **Rule:** Rows ordered: Offense header → Quarterback, Offensive Line, Running Backs, Wide Receivers, Tight Ends, Run Game, Pass Game → separator/subtitle → Defense header → Defensive Line, Linebackers, Secondary, Run Defense, Pass Defense. Default matchup: Chiefs (Team A) vs Raiders (Team B).
- **Viewport:** 1280×900.
- **Pass/Fail:** A visual separator/subtitle divides the two sections; Chiefs are left column, Raiders right column; row order matches exactly.

### T3 — Remove "real" from description (P0-19/#1187, P0-24/#1578)

- **Element:** Team Comparison page intro text (l.823).
- **Rule:** "Put any two real rosters side by side." → "Put any two rosters side by side."
- **Viewport:** 1280×900.
- **Pass/Fail:** The word "real" does not appear in that sentence.

### T4 — Remove disclaimer (P0-19/#1188, P0-24/#1579)

- **Element:** Disclaimer text (l.3364): "Ratings shown are effective ratings — players flexed out of position carry their penalty."
- **Rule:** Removed entirely from Team Comparison page only; kept on Draft Simulator page (l.3420).
- **Viewport:** 1280×900.
- **Pass/Fail:** Team Comparison page has no flex-disclaimer text; Draft page still shows it.

---

## Screen: Game Preview (P10-5, P10-11)

### G1 — Team tags after run defense/secondary (P10-5/#877, P10-11/#1445)

- **Element:** Game preview text where run defense and secondary are described.
- **Rule:** Team name appended in parentheses: "(Chiefs)" / "(Vikings)".
- **Viewport:** 1280×900 and 390×844.
- **Pass/Fail:** Preview reads "...run defense (Chiefs)... secondary (Vikings)..." — reader can tell which team is which.

### G2 — "Under center for the x" (P10-5/#878, P10-11/#1446)

- **Element:** QB matchup sentence.
- **Rule:** "Under center it is Matthew Stafford (99) against Geno Smith (74)." → "Under center for the Chiefs is Matthew Stafford (99) against the Vikings' Geno Smith (74)."
- **Viewport:** 1280×900.
- **Pass/Fail:** Sentence names both teams explicitly with possessive form for the second team.

### G3 — Remove "All eyes will be on..." sentence (P10-5/#878, P10-11/#1447)

- **Element:** Preview paragraph 2 (l.5294–5296).
- **Rule:** Deleted entirely. A cornerback does not draw the opposing defense's game plan.
- **Viewport:** 1280×900.
- **Pass/Fail:** No sentence mentions Christian Gonzalez or "all eyes will be on" in game preview.

### G4 — Remove "+x points a game" except overall (P10-5/#879–880, P10-11/#1448–1450, P10-9/#1877)

- **Element:** All unit-level "+x points a game" phrases in preview/review (l.5318–5326).
- **Rule:** Unit-level "+2.3 points a game" etc. removed. Overall prediction may keep "+3.3 points" with a "+" sign.
- **Viewport:** 1280×900.
- **Pass/Fail:** Preview contains "+3.3" once (overall) and zero other "+x points" statements.

### G5 — Em-dashes → periods (P10-5/#882, P10-11/#1460)

- **Element:** "Why these plans?" section and preview text.
- **Rule:** M-dashes replaced by periods, splitting into two sentences.
- **Viewport:** 1280×900.
- **Pass/Fail:** No em-dash (—) characters remain in preview text.

### G6 — Defensive labels no subtitles (P10-5/#883–884, P10-11/#1870)

- **Element:** Defensive package labels in plan table and preview.
- **Rule:** "Nickel · Pass Protection", "Nickel · Run Defense", or just "Nickel" — no parenthetical subtitles like "(a nickel defense focused on the pass)".
- **Viewport:** 1280×900.
- **Pass/Fail:** Dropdown label contains at most "Nickel · X" form; no parenthetical explanation in the label.

### G7 — Lineups directly below game plan (P10-5/#886, P10-11/#1454)

- **Element:** Layout order on game preview page.
- **Rule:** Lineups section renders immediately below the game plan section (currently at top in playoffs).
- **Viewport:** 1280×900.
- **Pass/Fail:** Reading order on preview page: Game plan → Lineups → Matchup → Opponent scouting.

### G8 — Preview "graphical first" (P10-5/#887, P10-9/#1884)

- **Element:** Game preview page layout.
- **Rule:** Graphics first; full sentences used sparingly. Only clutch-play narration, star-player compliments, and next-round hype remain as sentences.
- **Viewport:** 1280×900.
- **Pass/Fail:** Preview page is dominated by cards/charts/chips, not paragraphs of prose.
- **JUDGEMENT:** "More beautiful" and "graphical" need a reference image or Owner sign-off; this spec reduces it to "sentences used sparingly" which is observable.

---

## Screen: Game Review (P10-6, P10-11)

### R1 — Start with "1st Quarter" (P10-6/#893, P10-11/#1470)

- **Element:** Game review recap opening.
- **Rule:** Recap begins with quarter labels "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter". No "The Chiefs finished it off..." opening sentence.
- **Viewport:** 1280×900.
- **Pass/Fail:** First visible text of recap is a quarter label.

### R2 — Quarter labels "1st/2nd/3rd/4th" (P10-6/#894, P10-11/#1864)

- **Element:** Quarter headers in recap.
- **Rule:** Ordinal labels "1st Quarter" etc. instead of "First quarter".
- **Viewport:** 1280×900.
- **Pass/Fail:** All four quarter labels use ordinal suffixes.

### R3 — Box score TD lines (P10-6/#896, P10-11/#1471)

- **Element:** Scoring lines in box score.
- **Rule:** "D'Andre Swift ran it in for a touchdown (Chiefs 7–0)." → "Rushing TD · D'Andre Swift (Chiefs 7-0)".
- **Viewport:** 1280×900.
- **Pass/Fail:** Score lines use the dot format with position prefix.

### R4 — Turnovers (P10-6/#897, P10-11/#1472)

- **Element:** Turnover recap lines.
- **Rule:** "Turnovers: Chiefs 1 - 0 Vikings" then "Jaylon Johnson interception (4th Q)".
- **Viewport:** 1280×900.
- **Pass/Fail:** Turnover summary is a score line followed by the specific play line.

### R5 — Stars section: ✨ + yardage/rating rules (P10-6/#898, P10-11/#1473)

- **Element:** "Stars of the game" section.
- **Rule:** Heading replaced by actual star icon (✨/glittering). Offensive players need ≥60 yards to be mentioned; slots reserved for 90+ rating performances (rating not shown to user). Game ball player must also appear in Key Players chart.
- **Viewport:** 1280×900.
- **Pass/Fail:** Section heading is a star icon; no player under 60 yards appears; game ball winner is also in Key Players.
- **JUDGEMENT:** "90+ rating performances" needs the rating data pipeline; the visible check is ≥60 yards and star icon.

### R6 — Remove "+x points" phrasing (P10-6/#899, P10-11/#1474–1478)

- **Element:** All recap text.
- **Rule:** "worth about +2.3 points to the Chiefs", "about +2.2 points on the scoreboard", "a swing of roughly +1.3 points" removed. Overall margin keeps "+3.3 points". Sacks: "no sacks is not poor" → 1-2 sacks = mid, 3+ sacks = exceptional.
- **Viewport:** 1280×900.
- **Pass/Fail:** Recap contains "+3.3" once (overall) and zero other "+x points" statements; sack commentary uses mid/exceptional thresholds.

### R7 — "The Chiefs move to 1-0" own paragraph (P10-6/#901, P10-11/#1863)

- **Element:** Record-update sentence.
- **Rule:** It becomes its own paragraph, not buried in other text.
- **Viewport:** 1280×900.
- **Pass/Fail:** Record line stands alone as a paragraph.

### R8 — Hide game plans behind dropdown (P10-6/#902, P10-11/#1878)

- **Element:** "Game plans:" block in review.
- **Rule:** Hidden behind an arrow/dropdown, like other drop-downs.
- **Viewport:** 1280×900.
- **Pass/Fail:** Game plan details are not visible by default; they expand on click.

### R9 — Game ball in Key Players chart (P10-6/#903, P10-11/#1860)

- **Element:** Key Players chart and game ball assignment.
- **Rule:** The game ball winner always appears in the Key Players chart (previously they could differ).
- **Viewport:** 1280×900.
- **Pass/Fail:** Every game ball winner is findable in Key Players chart.

### R10 — Box score larger and more beautiful (P10-6/#904, P10-11/#1875)

- **Element:** Box score of quarters table (`renderGameResultHTML`, l.3780).
- **Rule:** Score numbers font-size ≥1.5rem, font-weight 800; quarter cells ≥60px wide × ≥40px tall, border-radius ≥6px, background var(--panel2), border 1px solid var(--border); outcome W/L/T letter marker with color.
- **Viewport:** 1280×900.
- **Pass/Fail:** Quarter cells are graphical blocks; score numbers are prominent; W/L letters have color + letter marker.
- **JUDGEMENT:** "More beautiful" needs a reference image; this spec reduces it to measurable cell dimensions and font sizes.

### R11 — Typography: beautiful, fade into page (P10-6/#905, P10-11/#1481)

- **Element:** Review page body text.
- **Rule:** Softer ink, more air, lighter rule between blocks; text fades into the page without hurting legibility.
- **Viewport:** 1280×900.
- **Pass/Fail:** Body text uses lighter color weight, increased line spacing, and thin horizontal rules between sections.
- **JUDGEMENT:** "Beautiful" and "fade into the page" need a reference image; this spec reduces it to softer ink + lighter rules.

---

## Screen: Season Review / Playoffs (P10-7, P10-12, P10-13, P10-14, P10-15, P11-2, P0-22)

### S1 — Win banner: larger, centered, ≥3s, shimmer, then lands (P10-7/#909, P10-12/#1887, P11-2)

- **Element:** Champion banner after a season win (`renderSeasonCompleteView`, l.5885–5891; `.champion-banner` CSS l.149–150; `.champion-banner.fxwon` l.109).
- **Rule:** Banner font-size ≥2rem (was 1.6rem), padding ≥32px (was 24px), border-width ≥3px (was 2px), border-radius ≥16px (was 14px). Remains visible ≥3000ms, then "lands" (settles into a fixed position on the page) and keeps shimmering (`fxshine`/`fxglow` keyframes reused, `animation-iteration-count:infinite`).
- **Viewport:** 1280×900 (centered, max-width 720px); 390×844 (full width minus safe-area, font-size ≥1.75rem).
- **Pass/Fail:** Banner is larger than before, centered, visible for at least 3 seconds, then settles in place with continuous shimmer. `prefers-reduced-motion: reduce` → `animation:none;opacity:1` (extend l.110 rule).
- **JUDGEMENT:** "More beautiful" needs reference image; this spec reduces it to measurable sizes and timing.

### S2 — Conference charts 1–16 (P10-7/#911, P10-13/#1892)

- **Element:** Standings/season review page where "Kansas City Chiefs: 14-3 · 397 PF · 296 PA" currently appears.
- **Rule:** Two side-by-side panels (AFC left, NFC right), each listing all 16 teams ranked 1–16 with a horizontal bar per team. Rank badge (fixed ~24px circle), team name, bar width proportional to win%, W–L text. User's team row highlighted with `.ub` + rank marker.
- **Viewport:** 1280×900 (side by side, gap ≥14px); 390×844 (stack vertically, full width).
- **Pass/Fail:** Two charts exist; each shows all 16 teams in order; user's team is highlighted; bars scale correctly.
- **JUDGEMENT:** "As beautiful as possible" needs reference image; this spec reduces it to measurable chart structure.

### S3 — Playoffs bracket (P10-7/#912, P10-14/#1897)

- **Element:** Playoffs page `renderBracketHTML()` (l.3830–3849).
- **Rule:** March Madness-style layout: bye teams marked with "BYE" badge, both conferences converging toward center, Super Bowl contestants meeting in middle, team names with seed badges, connecting lines between rounds (≥2px solid var(--border)).
- **Viewport:** 1280×900 (horizontal flow); 390×844 (vertical stack, rounds as full-width rows).
- **Pass/Fail:** Byes are visibly marked; conferences converge toward center; Super Bowl matchup in middle; connector lines between rounds.
- **JUDGEMENT:** "More exciting" needs reference image; this spec reduces it to measurable bracket structure.

### S4 — Awards: gold for user's players (P10-7/#914, P10-15/#1904, P11-2/#1964)

- **Element:** `renderRegularAwardsHTML` (l.5851–5870), `renderPlayoffAwardsHTML` (l.5872–5882), `honorLineHTML` (l.5850).
- **Rule:** User's award winners (All-Pro, Pro Bowl, award winners, game ball winner) get gold background chip (`rgba(255,215,0,0.20)`, padding ≥4px 8px, border-radius ≥4px) and ★ text badge after name. `.ub` (var(--accent), font-weight:700, l.100) is the color; chip+★ is the second marker.
- **Viewport:** 1280×900.
- **Pass/Fail:** User's players have gold chips + ★ badges; other players do not.

### S5 — "What separated the playoff teams" → click-reveal, hidden (P10-7/#920–921, P0-22/#1527)

- **Element:** The section text.
- **Rule:** Section stays but is hidden by default (click-to-reveal); never described in prose elsewhere; it only repeats the user's own team.
- **Viewport:** 1280×900.
- **Pass/Fail:** Section is not visible on page load; clicking reveals it; no other text mentions "what separated".

### S6 — "Sacked 59x" → "59x Sacked" (P0-22/#1528, P10-11/#1874)

- **Element:** QB sack stat in season review.
- **Rule:** "Sacked 59x" → "59x Sacked".
- **Viewport:** 1280×900.
- **Pass/Fail:** Text reads "59x Sacked" not "Sacked 59x".

### S7 — Advanced Stats: condensed, click to expand (P10-7/#923–924, P0-22/#1530–1531, P10-11/#1877)

- **Element:** "More Advanced Stats" section.
- **Rule:** Renamed "Advanced Stats"; highly condensed; visible only when clicking Coverage, Sacks, or Offensive Line entries; every advanced stat says why you did well or poorly.
- **Viewport:** 1280×900.
- **Pass/Fail:** Section is collapsed by default; clicking an entry expands an explanation with well/poorly reasoning.

### S8 — Season review button: blue, near top, next to 100-season (P10-7/#927–928, P10-3/#1812, P0-22/#1543)

- **Element:** Season review button after playoffs.
- **Rule:** Blue (`var(--accent)`), positioned near top of page, adjacent to the 100-season simulation button.
- **Viewport:** 1280×900.
- **Pass/Fail:** Button is blue and is located next to the 100-season button at the top of the playoffs page.

### S9 — Season review: more graphical (P10-7/#915–917, P10-4/#1816, P10-11/#1879)

- **Element:** Season review page.
- **Rule:** First sentence on its own paragraph; biggest win and ugliest win as stat cards (not sentences); each player on own line; "cost the Chiefs roughly X points a game" phrasing removed; roster out-of-position sentence removed; better closing line encouraging playoff push or redraft.
- **Viewport:** 1280×900.
- **Pass/Fail:** Review page is card/dot driven with minimal prose; no "cost the Chiefs roughly X points" phrases.
- **JUDGEMENT:** "More graphical" needs reference image; this spec reduces it to card/stat-line format.

### S10 — 100-season review: graphical, few sentences (P10-5/#1819, P0-22/#1545)

- **Element:** 100-season report page.
- **Rule:** Far more graphical; only a few sentences here and there.
- **Viewport:** 1280×900.
- **Pass/Fail:** Report page is chart/dot driven with minimal prose.
- **JUDGEMENT:** "Far more graphical" needs reference image; this spec reduces it to "few sentences".

### S11 — Bye week: show likely matchup (P0-22/#1539, P10-11/#1880)

- **Element:** Bye week team's season review.
- **Rule:** Shows preview of most likely next-round matchup instead of blank space.
- **Viewport:** 1280×900.
- **Pass/Fail:** A team with a bye sees a matchup preview rather than nothing.

### S12 — "Lineup and flexes" not at top in playoffs (P0-22/#1540, P10-11/#1881)

- **Element:** Playoffs page layout.
- **Rule:** Lineup/flexes section is not the first section on the playoff page.
- **Viewport:** 1280×900.
- **Pass/Fail:** On playoff page, something other than Lineups/flexes appears at top.

---

## Screen: Preseason / Draft Setup (P0-16)

### DS1 — Base defense selection 3-4 vs 4-3 (P0-16)

- **Element:** Draft/preseason page base defense control (two-option control beside team and pick).
- **Rule:** User can select 3-4 or 4-3. 3-4 order: DE1, DT1 (Nose Tackle), DE2, OLB1, ILB1, ILB2, OLB2. OLB≡WILL, ILB≡MIKE in wins maths. Explained on Guide and preseason menu including "CB3/Nickel coming on means LB3/SAM comes off".
- **Viewport:** 1280×900.
- **Pass/Fail:** Two-option control exists; selecting 3-4 changes depth chart names and guide chart; explanation text present.
- **JUDGEMENT:** "Explained in guide and preseason menu" needs the explanation text to be present and accurate.

---

## Screen: Draft Board — Team Colors (P0-12/#194, P0-18/#172, P7-1, P11-5, P0-24)

### DB1 — Team color theming across draft board (P7-1, P0-24/#1672–1696)

- **Element:** Draft board header box ("Drafting as [Team]"), position card left borders, tab bar active indicator, Team Comparison Team A/Team B headers, badge strip accent color.
- **Rule:** CSS variables `--team-primary`, `--team-secondary`, `--team-accent` set on `:root` when team selected; all team-colored elements reference these variables. 32-team palette (KC: red/white+yellow; SEA: blue/green+white).
- **Viewport:** 1280×900 and 390×844.
- **Pass/Fail:** Selecting KC turns header box red-gradient; position card left borders red; tab bar active indicator red. Color never appears without text label (team name + position abbr) as second marker.
- **JUDGEMENT:** Exact 32-team palette values need the Owner's palette; this spec reduces it to CSS variable mechanism.

### DB2 — Badge strip under weights buttons (P0-3)

- **Element:** Badges ("Can't Run", "Weak D", "Can't Pass") moved from table row (l.631) to badge strip below weights buttons (l.548).
- **Rule:** Badges removed from `${row.team}${badges}` in table rows; `<div id="badgeStrip" class="badgestrip"></div>` added below weights buttons at l.548; strip sits UNDER the two buttons; shows "No team carries a penalty badge on these weights." when empty.
- **Viewport:** 1280×900.
- **Pass/Fail:** Badges no longer appear in table rows; they appear in a strip under weights buttons; empty state text shows when no badges.

---

## Cross-Screen: Reduced Motion (P7-9, P10-2, P11-3)

### RM1 — All new animations respect prefers-reduced-motion (P11-3)

- **Element:** Every V22 animation (win banner shimmer, panel entry/exit, chart bar draw, confetti).
- **Rule:** `@media (prefers-reduced-motion: reduce)` → `animation: none !important; opacity: 1;` for every animated element (extend existing l.110 rule). No CSS transition conveys state-only information.
- **Viewport:** 1280×900 and 390×844.
- **Pass/Fail:** With reduce enabled in DevTools, nothing animates; all text, bars, banners, markers remain fully visible and readable.

### RM2 — Confetti burst CSS-only (P7-5/#1889, P11-3)

- **Element:** Draft pick confetti.
- **Rule:** CSS-only, 3 particles, triggered on user's pick. No JS animation library.
- **Viewport:** 1280×900.
- **Pass/Fail:** Confetti appears on user pick; disabled under reduced motion.

---

## JUDGEMENT items (need Owner or reference image)

The following instructions cannot be reduced to a deterministic observable and are flagged for the Owner:

1. **"More beautiful" / "way more graphical"** — P10-5, P10-6, P10-9, P10-11, P10-12, P10-14, P10-15, P11-1, P11-2. Needs a reference image or Owner sign-off.
2. **"Fade into the page" typography** — P10-8/#1869, P10-11/#1881. Needs a reference image for the softer ink/more air/lighter rule.
3. **32-team color palette exact values** — P7-1, P0-24/#1672–1696. The mechanism (CSS variables) is specified; exact hex values need the Owner's palette or Figma.
4. **"As beautiful as possible" conference charts** — P10-13/#1892. Needs reference image.
5. **"March Madness-style" bracket exact shape** — P10-14/#1897. Needs Owner shape decision (P4 item 4).
6. **Figma integration** — P7-7/#1869–1871. Not available yet; Owner needs to configure Figma MCP.

---

## Capture Protocol — Before/After

For every screen above, capture at **390×844** and **1280×900**, in **light and dark themes**, **before** (current build `044d1759…`) and **after** (spec implemented). That is 8 captures per screen. Verify:

- No horizontal overflow at 390px (390px gate `tests/e2e-smoke.mjs` EXIT 0).
- All text readable; second markers (★, ▲/▼, ●, ✓, W/L letter, 🏆, rank badge) present wherever color is used.
- Animations respect `prefers-reduced-motion: reduce`.
- `node --check` clean on extracted script; 0 console/page errors.

---

## Self-audit (rule 11 / rule 14 / rule 2)

Files written: `_agents/vloc/notes/V22-VISUAL-SPEC.md` (this file). Read-only on `V22-Suggestions.md` and `NFL Draft Simulator merged.html` (build `044d1759…`, 656,746 B) — no product edit, no document edit. Every visual instruction in V22-Suggestions.md was read and reduced to a spec line; anything not checkable is flagged JUDGEMENT. No other lanes touched, no shared-doc edits, no git operations.

**Not checked (stated plainly):** live rendered pixel measurements at 390px/1280px; actual contrast ratios computed against var(--accent)/var(--panel)/var(--text); reduced-motion behavior in a real browser (not yet tested); exact 32-team palette hex values (Owner's palette not yet provided).
