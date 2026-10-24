# UX Design & Interaction Brainstorm — V22 Work Orders (Beam, 24 Oct 2026)

Advisory design input only. No product file edits. Anchored to V22 work order + Owner rulings R-1..R-8 and V23 work packages (brand 20-0, homepage, player browser, beauty pass).

## Design principles (from the rulings)
- Plain, informative language in recaps: no "expected scoring", no "before kickoff"; every turnover named; overtime only in the overtime block, never "sudden death"; "2-Pt Conv" except in Guide. (R-1/R-5 style rules)
- User's team in blue (`.ub`); QB cannot flex; flex stays realistic. (R-2, R-7)
- Value Here is computed but never visible. (R-5)
- Edge is one position; 3-4 is a toggle, not a roster commitment. (R-2, R-7)
- 390 px is the floor; primary actions must be above the fold on mobile. (P0-14, P1-28)
- One self-contained HTML file; no CDN; no build step for the user.

## 1. Homepage / DRAFT hero (V23 WP-A)
- Hero: large "DRAFT" wordmark (brand 20-0) with a single primary CTA "Start New Draft". Secondary links: "Continue Save", "Player Browser", "Guide".
- Below the fold: last draft summary card (team, round, pick) + "Resume" button. Empty state: "No draft in progress — start one."
- Interaction: clicking the header wordmark always returns home (P0-12/P1-20). Home is the default tab on first load (P1-20, recommended Season-first is overruled by Owner's "DRAFT hero" direction — flag to Architect).
- Empty/first-run: a 3-step onboarding strip (Pick teams → Draft → Play season) that dismisses after first completed draft and never returns unless reset.

## 2. Draft board (P0-1, P0-12, P0-17)
- Remove "Value Here" column entirely; keep the computed sort internally for "Best Available". (R-5)
- Column set on desktop: Rank · Player · Pos · Ovr · Team Need · (mobile: collapse to Rank/Player/Pos with tap-to-expand).
- Badges (stars, injury, etc.) move under the weights table, not inline in rows. (P0-3)
- Flex toggle: a single "Base: 4-3 / 3-4" switch on the pre-draft page, plus a per-pick "swap DT↔LB" recommendation chip when board strength suggests it. (R-7) The toggle never bakes into the roster at draft time.
- Edge renders as one position code (no L/R). (R-2)
- Mobile: horizontal scroll is forbidden; use a card-per-pick layout with swipe between rounds, round selector as a segmented control at top.

## 3. Player browser (P0-8, V23 WP-A)
- ~15 players per page on desktop, 8 on mobile. Position dropdown aligned and styled like the draft board controls (not a native misaligned select).
- Filter row: Position · Team · Ovr range · "Starters only" · search. Filters persist in URL hash so back/forward works.
- Pagination: numbered pages + "Load more" on mobile. Sort by Ovr desc default, then name.
- Interaction: tap a row → slide-in detail drawer (Ovr, attributes, team, draft status) with "Add to watchlist"; drawer closes on outside tap or Esc.

## 4. Weights table (P0-4..P0-7)
- Rename "Use model weights" → "Default"; "Back to my weights" → "Save My Weights", shown only when user weights differ from default. (P0-4, P0-5)
- "Save My Weights" opens a confirm dialog naming the diff count before persisting. (P0-5)
- "Delete user weights record" is a destructive action behind a confirmation with the exact weights shown. (P0-7)
- Table label correction per P0-6; badges relocated under the table. (P0-3, P0-6)

## 5. Coaching philosophy / aggressiveness (P0-15)
- Available all season (not preseason-only). Inline description text under the selector explaining what changes.
- Interaction: changing philosophy mid-season shows a toast "Applies from next week" and updates the preview line immediately (no page reload).

## 6. Base defense selection (P0-16)
- 3-4 vs 4-3 toggle on the draft/preseason page with a one-line explainer: "3-4 swaps a DT for an extra ILB." (D-012)
- Recommendation chip when board strength favours one base, but never auto-commits.

## 7. Game recap (P0-18)
- Chronological scoring log with every turnover named (interception, fumble, turnover on downs, safety). (R-5 style)
- Overtime events only in the overtime block; no "sudden death" wording; "2-Pt Conv" except in Guide. (style rules)
- Stars of the game: 60 rushing yards for all; QB needs ≥300 passing yards and 3:1 TD:INT. (R-6)
- Game ball card with the player's team colour. Turnover rows highlighted in a distinct but non-alarming tone.
- Interaction: expandable play-by-play drawer; "Share recap" copies a plain-text summary to clipboard.

## 8. Season review / playoff preview (P0-19)
- Bracket view: conference → division → wild card, with team colours and seeds. Tap a matchup → preview card (head-to-head, recent form).
- "Week 1 of 17" label kept but clarified "17-week regular season, no byes" or renamed per P2-5 decision. (P1-27, P2-5)
- 390 px: bracket scrolls horizontally inside a contained scroller with a sticky left column (team names), not page-level horizontal scroll.

## 9. Mobile (390 px) (P0-14, P1-28)
- `#startSeasonBtn` must be above the fold on the preseason screen; move it into the sticky footer action bar on mobile.
- Primary action bar: fixed bottom, one primary button + overflow menu; never more than two buttons.
- Horizontal overflow = 0 enforced; any table becomes a card list under 480 px.

## 10. Cross-cutting interactions
- Tab navigation: header wordmark → home; tabs persist state in URL hash.
- Color scheme: `light dark` (P1-22) — respect OS preference, with a manual override in settings.
- Empty/loading states: skeleton rows, never blank flashes; errors inline with retry.
- Confirmation dialogs for all destructive actions (delete weights, reset draft, clear save).
- Toasts for async feedback (philosophy change, weight save, clipboard copy).

## 11. Additional beauty & polish proposals (V22 work-order candidates)

**P7-5 · Starter-count badge on draft header**
- WHERE: draft board header box ("Drafting as [Team]", ~l.405 in Pre-Colors; re-anchor before applying).
- WHAT: Add a small pill showing "X of 26 starters filled" computed from roster slots, updating live as picks are made. Colour: team primary.
- WHY: User always knows draft progress without counting rows; supports P0-20's round-counter clarity.
- SAFE ALONE?: YES — read-only computed display, no logic change, no protected constant.
- HOW TO CHECK: grep confirms pill text absent before / present after; `node --check` on extracted script passes; 390 px no horizontal overflow.

**P7-6 · Changed-weight cell highlight**
- WHERE: weights table inputs (~l.540–560) and the "Default"/"Save My Weights" buttons.
- WHAT: When a user edits a default weight, that cell's background tints team primary at low opacity; clears on reset. "Save My Weights" pulses when dirty (P0-5 state machine).
- WHY: Immediate visual feedback on what changed; makes the dirty state discoverable.
- SAFE ALONE?: YES — CSS class toggle + one JS listener, no maths.
- HOW TO CHECK: edit one weight → cell tints and button turns blue/pulsing; reset → tint clears and button transparent; `node --check` passes.

**P7-7 · Position-need chip on player cards**
- WHERE: draft board row render (~l.1766) and mobile card collapse.
- WHAT: Each player card gets a small "Need: POSn" chip (e.g., "Need: WR2") derived from unfilled roster slots; hidden when the roster is full at that position.
- WHY: Lets the user draft need-first without opening the roster panel; works with position cards following roster order (P0-12).
- SAFE ALONE?: YES — computed from existing roster state, display-only.
- HOW TO CHECK: draft QB1 → QB1 chip disappears on remaining QBs, QB2 chip appears; `node --check` passes; 390 px card fits chip.

**P7-8 · Collapsible Guide sections**
- WHERE: Guide page (~l.4980–5060), each section under "Reading the draft board" etc.
- WHAT: Wrap each Guide section in a click-to-toggle block; first section open by default, rest closed.
- WHY: Guide is long; progressive disclosure improves scannability, especially on 390 px.
- SAFE ALONE?: YES — HTML/JS toggle only, no content change.
- HOW TO CHECK: open Guide → sections toggle, no console errors; 390 px no horizontal scroll.

**P7-9 · "Undo" toast**
- WHERE: "Undo" button handler (~l.403).
- WHAT: After undo, a non-blocking toast appears at bottom for 2.5 s: "Pick undone — [Player]". Dismissable by tap, auto-dismisses.
- WHY: Confirms the action happened; reduces "did it work?" uncertainty.
- SAFE ALONE?: YES — toast element + setTimeout, no draft logic change.
- HOW TO CHECK: undo a pick → toast shows correct player name and auto-dismisses; no console errors.

## 12. Further beauty & interaction proposals (V22 work-order candidates, batch 2)

**P7-10 · Game-preview matchup meter**
- WHERE: game preview screen, matchup overview line (P0-18, l.~3800 region; re-anchor before applying).
- WHAT: Replace the "X vs Y" text with a horizontal meter: user's unit rating on the left, opponent's on the right, center mark at league average; fill colour follows team primary.
- WHY: Visualises the +2.3 margin instantly; removes "+x points a game" unit statements per R-5 style.
- SAFE ALONE?: YES — display-only, computed from existing ratings.
- HOW TO CHECK: meter renders for both units, no overflow at 390 px, `node --check` passes.

**P7-11 · Turnover timeline strip**
- WHERE: game recap, scoring log (P0-18).
- WHAT: A thin horizontal strip under the quarter scores: one tick per turnover, colour-coded by type (INT = red dot, fumble = orange, downs = grey, safety = yellow), hover shows quarter + player.
- WHY: Every turnover named (R-5 style) but in a glanceable form; keeps the recap compact.
- SAFE ALONE?: YES — display-only.
- HOW TO CHECK: strip shows all turnovers in chronological order; tooltip correct; no console errors.

**P7-12 · Star-praise card**
- WHERE: game recap "Stars of the game" (P0-18, R-6 thresholds).
- WHAT: Replace the text list with up to 3 star cards: portrait placeholder, name, key stat, impact grade colour (gold ≥85, silver 70–84, bronze <70). Pulsing star icon on the top card.
- WHY: Per Owner ruling, only star praise needs sentences; the card is the graphic, the praise stays one short line.
- SAFE ALONE?: YES — display-only.
- HOW TO CHECK: cards render for 0–3 stars, no broken refs, 390 px no horizontal scroll.

**P7-13 · Playoff bracket polish**
- WHERE: season review / playoff preview (P0-19).
- WHAT: March-Madness-style bracket: seeds as chips, team colours on each team, byes shown as "BYE" chips, tap a matchup → preview card. Horizontal scroll contained to the bracket, not the page.
- WHY: Owner asked for a bracket; team colours make it legible at a glance.
- SAFE ALONE?: NO — affects layout across screens; implement as a cohort with P7-14/P7-15.
- HOW TO CHECK: 390 px no page-level horizontal scroll; tap opens preview; `node --check` passes.

**P7-14 · Awards carousel**
- WHERE: season review awards block (P0-19).
- WHAT: Horizontal card carousel: MVP, DPOY, ROY, COY. Gold border on the user's players; opponent's primary for others. Auto-rotates, pauses on hover/tap.
- WHY: Replaces the text-heavy awards list; matches graphics-round direction (P8-g.4).
- SAFE ALONE?: NO — cohort with P7-13.
- HOW TO CHECK: carousel advances/pauses correctly; user's players gold-bordered; no console errors.

**P7-15 · Win/loss sparkline**
- WHERE: season review header (P0-19).
- WHAT: Compact 17-game sparkline of point differential, green for positive, red for negative, hover shows week + score.
- WHY: Replaces the "14-3 · 397 PF · 296 PA" line with a visual that shows trajectory.
- SAFE ALONE?: YES — display-only, computed from existing season data.
- HOW TO CHECK: sparkline renders 17 points, hover tooltip correct, 390 px fits.

**P7-16 · Empty-state illustrations (text-only)**
- WHERE: player browser empty filter result, no draft in progress, no saved weights.
- WHAT: Short, plain-language empty states with one primary action button (no images, no CDN): "No players match these filters — clear filters"; "No draft in progress — Start New Draft"; "No saved weights — Save My Weights".
- WHY: Avoids blank flashes; keeps the one-file/no-CDN rule.
- SAFE ALONE?: YES.
- HOW TO CHECK: each empty state renders and its button works; `node --check` passes.

**P7-17 · Focus rings & keyboard nav**
- WHERE: all interactive elements (tabs, buttons, inputs, sort headers).
- WHAT: Visible focus rings using team primary; Tab/Enter/Space operate every control; Esc closes drawers/modals.
- WHY: Accessibility; no CDN; improves keyboard-driven play.
- SAFE ALONE?: YES — CSS + small JS.
- HOW TO CHECK: tab through a full draft without mouse; no focus traps; `node --check` passes.

**P7-18 · Reduced-motion respect**
- WHERE: global CSS.
- WHAT: Wrap all non-essential animations (P7-2, P7-12, P7-14, confetti) in `@media (prefers-reduced-motion: reduce)` to disable or shorten to 0ms.
- WHY: Accessibility; respects OS preference (pairs with P1-22 light/dark).
- SAFE ALONE?: YES — CSS-only.
- HOW TO CHECK: enable reduced motion in OS → animations disabled; no console errors.


## Open questions for the Architect (≤5)
1. Default tab: Owner's "DRAFT hero" implies Draft-first, but P1-20 recommends Season-first. Which wins?
2. Should the homepage onboarding strip be dismissible permanently or re-showable from settings?
3. Base-defense recommendation chip: auto-suggest or manual-only? (R-7 leaves both open.)
4. Game recap "Share" format: plain text only (no images, no CDN) — confirm.
5. Light/dark override: persist in localStorage (allowed, no CDN) — confirm scope.

## What I will not do
No edits to `Football-Sim-*.html`, protected constants, or shared governance files. Proposals only, per AGENTS.md §5.
