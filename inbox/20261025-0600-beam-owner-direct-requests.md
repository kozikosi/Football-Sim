SPEAKER: Beam | ROLE: Council Adviser | TASK: Owner direct requests (25 Oct) — record and distribute | DATE: 2026-10-25T06:00Z

FOR: ALL (council-wide dissemination)

WHERE: Football-Sim-PreColors.html (all items); _agents/beam/notes/ (prototypes)

old -> new: N/A (record of Owner's direct requests). Each item is a work request for council members.

WHY: Owner (Kosi) issued a comprehensive list of direct requests during a session. These need to be recorded and distributed as potential tasks, organized by priority.

SAFE ALONE?: varies per item (noted).

HOW TO CHECK: each item has specific acceptance criteria below.

EVIDENCE: REPORTED (Owner's direct requests, verbatim intent).

--- LOGO ASSETS (Owner-provided) ---
Location: /Users/kosi/Desktop/Football Sim/nfl-team-logos/ (226 files: SVG + PNG variants per team, AFC/NFC).
Also: /Users/kosi/Desktop/Football Sim/all-logos-sdv.csv (633 NFL entries, espn/nflverse URLs — external, not embeddable).
Recommendation: Use SVGs (inline, no CDN, single-file). Transparent PNGs as fallback. User wants "a separate one-page prototype using the other logo package" and "completely subtract the white space from the logos" / "transparent bubbles if you must maintain bubbles, but prefer just logos."

--- P0 (critical / blocking) ---

P0-A. Fade into draft slower (homepage → draft transition)
  WHERE: transition between homepage and draft view (CSS/JS animation).
  WHAT: Homepage fades out over ~2s, draft page fades in over ~2s. Currently instant.
  SAFE ALONE?: YES (CSS transition).

P0-B. "Change" button color alignment
  WHERE: draft board "change" link (l.1765: `<a href="#" class="slotchg" ...>change</a>`).
  WHAT: Use team colour palette, not always blue (#6aa6ff). Should follow selected team's colours.
  SAFE ALONE?: YES (CSS).

P0-C. Remove Star system + text
  WHERE: l.4980-5010 (Guide star explanation), l.624-627 (synergy badges: Can't Run, Weak D, Can't Pass), l.5072 (star priority table).
  WHAT: Remove the star system (★★/★/☆) and explanatory text: "Chip numbers are starters drafted / starting spots (0/2 = both open). Stars set how much you care about a position: ★★ must-fill (Priority ×1.5), ★ normal, ☆ low (×0.5). Click a star to change it."
  SAFE ALONE?: YES (text removal).

P0-D. Remove "you hold the #8 overall pick (Round 1)" from draft board
  WHERE: l.1488 (draftingas banner: `Drafting as <b>${userTeamName}</b> — you hold the #${userIndex+1} overall pick (Round 1)`).
  WHAT: Remove the "#8 overall pick (Round 1)" text. Keep "Drafting as [Team]".
  SAFE ALONE?: YES (text removal).

P0-E. Align "(x.y)" to the right
  WHERE: draft board row (l.1766, Fills column or adjacent).
  WHAT: Align "(x.y)" where x,y are user's next draft pick round and pick number, to the right.
  SAFE ALONE?: YES (CSS alignment).

P0-F. Remove green from Pick priority (light mode)
  WHERE: draft board Priority column (l.1766: `dc-pri` with color:var(--gold)), synergies (l.625-627: badge-run #ff6b6b, badge-pass #ff8a3d, badge-passfail #b478ff), .good class.
  WHAT: Green (#22c55e, --good) appears in light mode. Remove all green; use team colours or gold/rose palette. Verify no permanent green anywhere (ranking numbers, game previews, reviews).
  SAFE ALONE?: YES (CSS colour change).

P0-G. "Math's pick" colour should fit team palette
  WHERE: l.5072: `best===u?' <span class="badge badge-passfail" ...>math's pick</span>'`.
  WHAT: Use team colour instead of purple (#b478ff). Badge should follow selected team's palette.
  SAFE ALONE?: YES (CSS).

--- P1 (high priority) ---

P1-A. Homepage copy replacement
  WHERE: l.385 (homepage copy).
  WHAT: Replace "32 real NFL franchises..." with "Season, Playoffs, Super Bowl. Can you go 20-0?" (no period, floaty units). Already in inbox (20261024-2355, 20261025-0010, 20261025-0030).
  SAFE ALONE?: YES.

P1-B. Remove "Set Up Your Draft" + floaty units
  WHERE: l.383 (h2), l.385 (p).
  WHAT: Already proposed (inbox/20261025-0010, 20261025-0030). Remove heading, 4 floating rose-gold entities, no "Read the guide" text.
  SAFE ALONE?: YES.

P1-C. Draft page copy: "Play the season. Coach your team to the Super Bowl. Can you go 20-0?" aligned right
  WHERE: draft complete screen.
  WHAT: Replace "Your draft is in the books. Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?" with "Play the season. Coach your team to the Super Bowl. Can you go 20-0?" aligned right.
  SAFE ALONE?: YES.

P1-D. Remove season options text
  WHERE: season page (l.~853).
  WHAT: Remove "Season options / These throw away the season in progress." and replace with caution screen: "Caution: Your current season will be erased if you continue" with two buttons (return to season / confirm).
  SAFE ALONE?: YES (UI/text).

P1-E. Remove all draft recap text
  WHERE: draft recap (l.~5072 area).
  WHAT: Remove the entire paragraph block ("More than anything, this draft was about quarterback play..."). No text for any team.
  SAFE ALONE?: YES.

P1-F. Draft board: remove "No picks yet." and "needed"
  WHERE: draft board (roster strip, l.~1760).
  WHAT: Remove "No picks yet." and "needed" text.
  SAFE ALONE?: YES.

P1-G. Draft board: remove "for 'x % gone by your next pick'" → "x % gone"
  WHERE: draft board (gone column).
  WHAT: Change "x % gone by your next pick" to "x % gone" (remove "by your next pick").
  SAFE ALONE?: YES.

P1-H. Draft board: player bubbles don't grow on compress
  WHERE: draft board player rows (CSS).
  WHAT: Individual player bubbles get larger as screen compresses. Fix: maintain consistent sizing. Draft button must always be visible with name and pos.
  SAFE ALONE?: YES (CSS).

P1-I. Draft board: put team color bubbles under logo
  WHERE: draft board (roster strip).
  WHAT: Move the three team colour bubbles underneath the team logo.
  SAFE ALONE?: YES (CSS).

P1-J. Draft board: clickable sort on all numbers
  WHERE: draft board table headers.
  WHAT: Click any number column header to sort by that category.
  SAFE ALONE?: NO (needs JS).

P1-K. Preseason: names truncated on compress
  WHERE: preseason page.
  WHAT: Show only last name when window compresses.
  SAFE ALONE?: YES (CSS).

P1-L. Preseason: dropdown menus for explanations
  WHERE: preseason page (l.4815, l.5080, l.5096).
  WHAT: "Why a pass-heavy offense?", "Why we recommend Auto", "How a 2-Pt Conv works", "Follows the usual NFL chart" — all should be in collapsible dropdown menus, not visible by default. Simplify language to 5th-grade level. Visualize instead of paragraph text.
  SAFE ALONE?: YES (HTML/CSS).

P1-M. Remove preseason text
  WHERE: l.5096.
  WHAT: Remove "Anyone except an offensive lineman, a kicker or a quarterback can play running back at −6..." paragraph.
  SAFE ALONE?: YES (text removal).

P1-N. Remove "Three optional settings..." text
  WHERE: preseason page.
  WHAT: Remove "Three optional settings, preselected with recommended values. Philosophy and aggressiveness lock at Week 1; lineup and returner stay editable."
  SAFE ALONE?: YES (text removal).

P1-O. Lineups section: less boxy, more floaty
  WHERE: lineup editor (l.1142-1290).
  WHAT: Less table-like, more dynamic floaty. Colts colours instead of green on their players in light mode.
  SAFE ALONE?: YES (CSS).

P1-P. Remove "On the roster-building side..." text
  WHERE: draft recap / season review.
  WHAT: Remove entire paragraph about roster-building strength and flexed starters.
  SAFE ALONE?: YES (text removal).

P1-Q. Game preview: remove almost all text, more visual
  WHERE: game preview (P0-18).
  WHAT: Remove almost all game preview text. Refer to Game Preview Floaty v2 prototype. Replace text with graphical layout. Same for game plan, opponent scouting, matchup math, team identity, schedule, key players, regular season review, game review. User's division at top of standings, others smaller.
  SAFE ALONE?: NO (needs design work).

P1-R. Game sim animation (15-20s)
  WHERE: game sim screen.
  WHAT: Animation during game sim showing score by quarter + key plays (like Sleeper/ESPN game log). Already prototyped in game-review-floaty-prototype.html.
  SAFE ALONE?: NO (needs sim integration).

P1-S. Draft complete page: keep shimmer on "Can you go 20-0"
  WHERE: draft complete screen.
  WHAT: Keep the shimmering effect on "Can you go 20-0" as an example of emphasizing a word in the colour palette. Note to all council members.
  SAFE ALONE?: YES (CSS).

P1-T. Game preview/review: no permanent green
  WHERE: game preview + review.
  WHAT: Remove permanent green from ranking numbers and all visual elements. Use team colours.
  SAFE ALONE?: YES (CSS).

P1-U. Logos: separate prototype with other logo package
  WHERE: new prototype file.
  WHAT: Create a one-page prototype using the PNG logo package (nf-team-logos). Subtract white space from logos (transparent bubbles preferred, or just logos). Reference: Glyph's VISUAL-DESIGN-SHOWCASE.html.
  SAFE ALONE?: YES (new file).

P1-V. Footer should be a real footer
  WHERE: homepage (l.~440).
  WHAT: Footer visible at bottom of page. "See guide for details" just above footer, closer than now.
  SAFE ALONE?: YES (CSS).

P1-W. Homepage: dropdowns stay side-by-side on compress
  WHERE: homepage (l.382-393).
  WHAT: As screen compresses, dropdown menus become smaller and stay side-by-side, not stacking.
  SAFE ALONE?: YES (CSS).

P1-X. Homepage: 15 rows/page in player browser, clickable header
  WHERE: player browser.
  WHAT: Already in player-browser-floaty-prototype.html. 15 rows/page, clickable header sort.
  SAFE ALONE?: YES.

--- P2 (medium priority) ---

P2-A. Team Comparison: default Chiefs v Raiders, grouped Offense/Defense, no parentheses, text removals
  WHERE: renderHomeComparison (l.3386).
  WHAT: Already in P-014 proposal.
  SAFE ALONE?: YES.

P2-B. Guide page edits
  WHERE: renderGuideHTML (l.5029).
  WHAT: Already in P-015 proposal.
  SAFE ALONE?: YES.

P2-C. Position Rankings: DL+CBs top 6 default, plural labels, (WR1+WR2+WR3) naming
  WHERE: GROUP_DEFS (l.455), initGroupRankings (l.874).
  WHAT: Already in P-009 proposal.
  SAFE ALONE?: YES.

P2-D. Weights page UI: Default/My Weights states, new text, badges moved down
  WHERE: buildControls (l.540).
  WHAT: Already in P-012 proposal.
  SAFE ALONE?: YES.

P2-E. Draft page copy/layout bundle
  WHERE: draft board view.
  WHAT: Already in P-010 proposal.
  SAFE ALONE?: YES.

P2-F. Draft resume after refresh
  WHERE: init (l.3936).
  WHAT: Already in P-011 proposal.
  SAFE ALONE?: YES.

P2-G. Default weights recalibration (protected constants)
  WHERE: DEFAULT_WEIGHTS (l.452).
  WHAT: Already in P-013 proposal (framework only, Owner approval needed).
  SAFE ALONE?: NO (protected constants).

P2-H. 3-4/4-3 base toggle + flex rules
  WHERE: FLEX (l.940), lineup editor.
  WHAT: Already in P-017 proposal.
  SAFE ALONE?: NO (protected FLEX constant).

P2-I. FB/P slots + D-012 math
  WHERE: GROUPS (l.454), GROUP_DEFS (l.455).
  WHAT: Already in P-032 proposal.
  SAFE ALONE?: NO (math changes).

P2-J. Advanced stats ideas
  WHERE: game recap, season review.
  WHAT: Already in P-036 proposal (10 stats with formulas).
  SAFE ALONE?: YES (display-only).

P2-K. Mobile audit at 390px
  WHERE: all views.
  WHAT: Already in P-037 proposal (15 findings).
  SAFE ALONE?: YES (CSS).

P2-L. Triage GPT docs
  WHERE: imported-guest-reviews/.
  WHAT: Already in P-039 proposal.
  SAFE ALONE?: YES.

P2-M. Win-probability graph
  WHERE: game recap.
  WHAT: Already in P-050 proposal (design only).
  SAFE ALONE?: YES (design).

P2-N. Sound design
  WHERE: global.
  WHAT: Already in P-051 proposal (Web Audio, off by default).
  SAFE ALONE?: YES (design).

P2-O. Guided tour
  WHERE: first load.
  WHAT: Already in P-052 proposal (4-step spotlight).
  SAFE ALONE?: YES (design).

P2-P. Game preview redesign (graphical, fewer sentences)
  WHERE: game preview (P0-18).
  WHAT: Already in game-preview-floaty-prototype.html. Remove almost all text, more visual.
  SAFE ALONE?: YES (design).

P2-Q. Game review redesign (box-score style, turnovers, stars, game ball)
  WHERE: game review (P0-19).
  WHAT: Already in game-review-floaty-prototype.html.
  SAFE ALONE?: YES (design).

P2-R. Season review (conference charts, bracket, gold awards, advanced stats)
  WHERE: season review (P0-20).
  WHAT: Already in season-review-floaty-prototype.html (canonical design template).
  SAFE ALONE?: YES (design).

P2-S. Playoff preview redesign + bye-week preview
  WHERE: playoff preview.
  WHAT: Design needed (not yet prototyped).
  SAFE ALONE?: YES (design).

P2-T. Champion banner (gold, shimmer), hype text, motion
  WHERE: champion banner (P0-19).
  WHAT: Already in snippets (confetti, shimmer, gold banner). Needs integration.
  SAFE ALONE?: YES (CSS).

P2-U. 100-season review (graphical, aligned chart, hide Realism audit)
  WHERE: 100-season review.
  WHAT: Design needed (not yet prototyped).
  SAFE ALONE?: YES (design).

P2-V. RNG inventory + injectable seeded RNG
  WHERE: all Math.random() sites (38 in Pre-Colors).
  WHAT: Already in QUEUE-3 + persistence-proposal.md. Needs implementation.
  SAFE ALONE?: NO (touches sim math).

P2-W. Lint selftest (Biome config conflict)
  WHERE: tools/biome-product/biome.json.
  WHAT: Already in QUEUE-2. Fix nested root config conflict (Architect-owned).
  SAFE ALONE?: NO (tools/ owned by Architect).

P2-X. Snapshot review (keep/archive/drop per group)
  WHERE: origin/preserve/shared-tree-2026-10-23-v2.
  WHAT: Already in QUEUE-4. Sports/ quarantined (drop), figma tokens mismatch (fix Jacksonville), openchamber tests (update paths).
  SAFE ALONE?: YES (analysis).

P2-Y. Guest analyst curated recommendations
  WHERE: inbox/20261025-0000-beam-guest-analyst-curated.md.
  WHAT: Already done. 24 items >40% confidence.
  SAFE ALONE?: YES.

P2-Z. Triage GPT docs
  WHERE: imported-guest-reviews/.
  WHAT: Already in P-039. Technical findings verified; governance notes classified.
  SAFE ALONE?: YES.

--- P3 (low priority / design only) ---

P3-A. Win-probability graph (design only)
P3-B. Sound design (Web Audio, off by default)
P3-C. Guided tour for interviewers (4-step spotlight)
P3-D. Advanced stats ideas (10 stats with formulas)
P3-E. Value Here removal from all visuals (P0-1, already proposed)
P3-F. Logo prototype (PNG package, transparent bubbles)
P3-G. Team Comparison: default Chiefs v Raiders (already P-014)
P3-H. Footer as real footer (homepage)
P3-I. Homepage dropdowns side-by-side on compress

--- DISSEMINATION NOTES ---

1. The Season Review floaty prototype (season-review-floaty-prototype.html) is the canonical design template (Owner-approved by Kosi). All new UI should follow its palette, typography, panel, spacing, and motion specs.
2. The "Can you go 20-0" shimmer text is the canonical example of emphasizing a word in the colour palette. All council members should use this pattern.
3. The floaty/open-airy design system (P7-82, snippet §30) should be applied globally. No blue panels.
4. Team theming: global rose/gold/white is default; team colours override when selected. Player names in warm white (not blue). Team colours on team-specific elements only.
5. Value Here: removed from all visuals (background calc only).
6. No emojis. No orange. No blue panels. Open/airy.
7. Mobile: 390px floor. No horizontal scroll. Primary actions above fold.

EVIDENCE: REPORTED (Owner's direct requests, verbatim intent). Beam verified line numbers where cited.
