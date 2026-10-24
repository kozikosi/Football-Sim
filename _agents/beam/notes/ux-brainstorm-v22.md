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


## 13. Further beauty & interaction proposals (V22 work-order candidates, batch 3)

**P7-19 · Roster strip team-colour accent**
- WHERE: draft board left roster strip (P0-12).
- WHAT: 3 px solid left border in team primary on the user's roster strip; opponent strips use opponent primary.
- WHY: Reinforces team identity on the draft board (P7-1 theme).
- SAFE ALONE?: YES — CSS-only.
- HOW TO CHECK: border colour matches selected team; 390 px no overflow.

**P7-20 · Position-group colour coding on draft rows**
- WHERE: draft board row render (~l.1766).
- WHAT: Left 3 px border per position group (QB blue, RB green, WR orange, TE purple, OL grey, DL red, LB teal, CB/S yellow, K/P brown).
- WHY: Faster scanning of the board; aligns with P7-3.
- SAFE ALONE?: YES — CSS class on existing position cell.
- HOW TO CHECK: colours render per group; no console errors.

**P7-21 · Dimmed "gone" players**
- WHERE: draft board rows where player already drafted.
- WHAT: opacity 0.4 + line-through on name; keep Ovr visible.
- WHY: Makes unavailable players instantly distinguishable.
- SAFE ALONE?: YES — CSS class toggle.
- HOW TO CHECK: gone players dimmed; still selectable? (no — gone = not selectable); no console errors.

**P7-22 · Number counter on weight change**
- WHERE: weights table Wins display.
- WHAT: 300 ms roll-up/down when a weight changes (requestAnimationFrame).
- WHY: Draws attention to impact of the edit.
- SAFE ALONE?: YES — small JS, no maths change.
- HOW TO CHECK: changing a weight animates the Wins number; reset stops animation; `node --check` passes.

**P7-23 · Pulse on "Save My Weights"**
- WHERE: weights buttons (P0-5).
- WHAT: Subtle pulse animation when the button becomes clickable (dirty state).
- WHY: Discoverability of the dirty state.
- SAFE ALONE?: YES — CSS animation gated on dirty class.
- HOW TO CHECK: button pulses only when dirty; stops on save/reset.

**P7-24 · Confetti on championship**
- WHERE: season review championship banner (P0-19, R-6 style).
- WHAT: 10–15 CSS-only particles, 1 s, team primary + gold; respects reduced motion.
- WHY: Celebratory payoff; matches P7-13 shimmer.
- SAFE ALONE?: YES — CSS + small JS, gated on championship.
- HOW TO CHECK: confetti fires once on championship; disabled under reduced motion; no console errors.

**P7-25 · Shimmer on gold elements**
- WHERE: championship banner, award winners, game ball (P0-18/P0-19).
- WHAT: Gold gradient shimmer (2 s infinite) on gold text/elements.
- WHY: Visual emphasis on achievements.
- SAFE ALONE?: YES — CSS-only.
- HOW TO CHECK: shimmer renders; no layout shift; respects reduced motion.

**P7-26 · Glass-morphism on modals/dropdowns**
- WHERE: all modals and dropdowns.
- WHAT: backdrop-filter blur(8px) + semi-transparent bg.
- WHY: Depth and polish on dark theme.
- SAFE ALONE?: YES — CSS-only.
- HOW TO CHECK: blur renders in supported browsers; fallback solid bg otherwise; no console errors.

**P7-27 · Thin accent scrollbar**
- WHERE: global scrollbar.
- WHAT: 6 px, rounded, team primary thumb.
- WHY: Cohesive with team colours.
- SAFE ALONE?: YES — CSS-only.
- HOW TO CHECK: scrollbar styled; no horizontal overflow introduced.

**P7-28 · Zebra stripes on tables**
- WHERE: draft board, team comparison, box score.
- WHAT: Alternating row bg at 2% opacity.
- WHY: Readability on long lists.
- SAFE ALONE?: YES — CSS-only.
- HOW TO CHECK: stripes render; no contrast regression.

**P7-29 · Skeleton loading states**
- WHERE: player browser, draft board initial render.
- WHAT: Pulse-animated skeleton rows instead of blank flashes.
- WHY: Perceived performance; avoids layout jump.
- SAFE ALONE?: YES — CSS + small JS.
- HOW TO CHECK: skeleton shows then swaps; no console errors.

**P7-30 · Toast system (global)**
- WHERE: global; used by philosophy change, weight save, undo, clipboard copy.
- WHAT: Bottom-center toast, 2.5 s, auto-dismiss, tap to dismiss, one at a time (queue).
- WHY: Consistent async feedback.
- SAFE ALONE?: YES — small JS + CSS.
- HOW TO CHECK: toasts appear/dismiss correctly; queue works; `node --check` passes.


## 14. Creative interactive & beauty ideas (V22 work-order candidates, batch 4)

**P7-31 · Synthesized sound design (Web Audio, no assets)**
- WHERE: global; triggered on draft pick, touchdown, turnover, championship.
- WHAT: Use the Web Audio API to synthesize short tones (no audio files, no CDN): a rising two-note chime on user draft pick, a low thud on turnover, a fanfare arpeggio on championship. Muted by default with a 🔇/🔊 toggle persisted in localStorage.
- WHY: Audio feedback massively increases perceived polish; stays within the single-file/no-CDN rule.
- SAFE ALONE?: YES — opt-in, gated on user toggle, respects prefers-reduced-motion? (audio separate).
- HOW TO CHECK: toggle persists; tones play only when enabled; no console errors; mute state survives reload.

**P7-32 · Keyboard shortcuts**
- WHERE: global keydown handler.
- WHAT: `j`/`k` or arrows move draft-board focus; Enter drafts focused player; `u` undoes; `?` opens shortcut help; `/` focuses search; Esc closes drawers. Show a "?" help chip in the footer.
- WHY: Power users draft faster; improves accessibility.
- SAFE ALONE?: YES — additive keybindings, no logic change.
- HOW TO CHECK: every shortcut works; help chip lists them; no conflict with form inputs (ignore when typing).

**P7-33 · Hover "what-if" preview on player cards**
- WHERE: draft board row hover (~l.1766).
- WHAT: On hover, show a small tooltip: "+X.X wins if drafted here" computed from existing `r.v`, plus the flex penalty if applicable ("−2 flex"). No new math.
- WHY: Lets the user compare candidates without clicking.
- SAFE ALONE?: YES — display-only, computed from existing data.
- HOW TO CHECK: tooltip shows correct delta; disappears on mouseleave; 390px uses tap-to-toggle instead.

**P7-34 · Haptic feedback on mobile**
- WHERE: draft pick, touchdown, championship.
- WHAT: `navigator.vibrate()` short pulses (10ms pick, 30ms TD, pattern on championship) when supported; no-op otherwise.
- WHY: Tactile payoff on mobile; zero cost on desktop.
- SAFE ALONE?: YES — feature-detected, no-op fallback.
- HOW TO CHECK: pulses fire on supported devices; no errors on unsupported.

**P7-35 · Drag-to-reorder weights**
- WHERE: weights table inputs.
- WHAT: Allow dragging weight rows to reorder (visual only — values follow); or simpler: drag the "Default/My Weights" slider thumb. Start with a drag handle on each weight row that reorders display priority.
- WHY: More direct manipulation than typing numbers.
- SAFE ALONE?: NO — needs careful touch handling; cohort with P7-6 (changed-weight highlight).
- HOW TO CHECK: reorder persists in view; no data corruption; 390px drag works.

**P7-36 · Season progress stepper**
- WHERE: season review header (P0-19).
- WHAT: A horizontal 17-step progress bar showing weeks played, with playoff rounds appended; current week pulses; completed weeks show W/L colour.
- WHY: At-a-glance season state; complements the sparkline (P7-15).
- SAFE ALONE?: YES — display-only.
- HOW TO CHECK: stepper reflects week; colours match results; no overflow at 390px.

**P7-37 · Milestone confetti variants**
- WHERE: championship banner, first win, playoff clinch.
- WHAT: Different particle colours/counts per milestone: first win = 6 small particles, playoff clinch = 10, Super Bowl = 20 with gold shimmer. Reuse P7-24 confetti.
- WHY: Celebrates moments proportionally.
- SAFE ALONE?: YES — gated on events, reuses existing confetti.
- HOW TO CHECK: each milestone fires correct variant; reduced motion respected.

**P7-38 · Dark/light theme toggle with smooth transition**
- WHERE: header/settings.
- WHAT: Manual override (P1-22) with a 200ms cross-fade on `--bg/--text` via CSS transition on body; persist choice in localStorage; default follows OS.
- WHY: User control over appearance.
- SAFE ALONE?: YES — CSS vars + localStorage.
- HOW TO CHECK: toggle switches instantly; persists; OS default respected when unset.

**P7-39 · Player comparison modal**
- WHERE: player browser / draft board.
- WHAT: Select two players → side-by-side modal comparing Ovr, Wins, Value, position, team, with a "better at" highlight per row.
- WHY: Helps decide between close candidates.
- SAFE ALONE?: YES — display-only, computed from existing data.
- HOW TO CHECK: modal opens with two players; comparison correct; Esc closes.

**P7-40 · Draft grade card (post-draft)**
- WHERE: after round 26/28 completes.
- WHAT: A card showing a letter grade (A–F) derived from positional needs filled + value captured, with 3 short bullet reasons. No invented ratings — derived from existing slot values.
- WHY: Satisfying closure to the draft; encourages redraft.
- SAFE ALONE?: YES — derived metric, display-only.
- HOW TO CHECK: grade renders; reasons reference real slots; no console errors.

**P7-41 · Aria-live draft announcements**
- WHERE: draft board.
- WHAT: An `aria-live="polite"` region announcing "You drafted [Player], [Pos], [Ovr]" and "Pick [N] of [total]".
- WHY: Screen-reader accessibility; complements P7-17 keyboard nav.
- SAFE ALONE?: YES — additive markup.
- HOW TO CHECK: screen reader announces picks; no visual change.

**P7-42 · Print-friendly recap**
- WHERE: game recap.
- WHAT: `@media print` stylesheet: white bg, black text, hide chrome (tabs, buttons), page breaks between quarters. "Print recap" button calls `window.print()`.
- WHY: Lets users save/share a clean recap.
- SAFE ALONE?: YES — CSS + one button.
- HOW TO CHECK: print preview clean; no clipped content.


## 15. Creative interactive & beauty ideas (V22 work-order candidates, batch 5)

**P7-43 · Parallax tilt on champion banner**
- WHERE: champion banner (P0-19).
- WHAT: Subtle 3D tilt following mouse position (max 6°) on desktop; disabled on touch/reduced motion.
- WHY: Premium feel; zero cost on mobile.
- SAFE ALONE?: YES — CSS transform + mousemove, feature-gated.
- HOW TO CHECK: tilt responds to mouse; disabled under reduced motion; no jank.

**P7-44 · Count-up on scroll into view**
- WHERE: all numeric stats (wins, yards, ratings).
- WHAT: Numbers count from 0 to final when scrolled into view (IntersectionObserver), once per element.
- WHY: Draws attention to key stats without being intrusive.
- SAFE ALONE?: YES — JS + IO, no layout change.
- HOW TO CHECK: counts trigger on scroll; only once; reduced motion shows final value instantly.

**P7-45 · Momentum / "hot hand" indicator**
- WHERE: season review, team comparison.
- WHAT: Small flame icon + "Hot" badge on teams on a 3+ win streak; snowflake for 3+ loss skid.
- WHY: Surfaces narrative without sentences (R-5 style).
- SAFE ALONE?: YES — display-only, derived from results.
- HOW TO CHECK: badge appears at streak ≥3; clears below; no console errors.

**P7-46 · Draft clock countdown (tension)**
- WHERE: draft board "on the clock" row.
- WHAT: 30-second countdown ring around the pick number; pulses red under 10s; auto-pick on timeout (CPU logic) with a toast.
- WHY: Adds drama; mirrors real draft tension.
- SAFE ALONE?: NO — touches pick timing; cohort with P0-12.
- HOW TO CHECK: countdown accurate; auto-pick fires; reduced motion disables pulse.

**P7-47 · Position scarcity heatmap**
- WHERE: draft board, position cards.
- WHAT: Colour intensity on position cards by remaining talent (deep colour = scarce, pale = abundant).
- WHY: Visualises value of waiting at a position.
- SAFE ALONE?: YES — display-only, derived from board state.
- HOW TO CHECK: colour shifts as picks are made; no console errors.

**P7-48 · Loading progress bar for 100-season sim**
- WHERE: 100-season review.
- WHAT: Determinate progress bar with percentage + "Simulating season X of 100"; animates smoothly.
- WHY: 100-season runs take time; progress reduces perceived wait.
- SAFE ALONE?: YES — UI only, progress from existing loop.
- HOW TO CHECK: bar reaches 100%; no jank; reduced motion disables animation.

**P7-49 · View Transitions API page swaps**
- WHERE: tab switches.
- WHAT: Use `document.startViewTransition` where supported for smooth cross-fade between tabs; fallback to instant.
- WHY: Native, performant, no library.
- SAFE ALONE?: YES — feature-detected.
- HOW TO CHECK: smooth transition on supported browsers; instant fallback elsewhere.

**P7-50 · Weather tint on game preview**
- WHERE: game preview.
- WHAT: Subtle background tint by weather (rain = cool blue, snow = white, sun = warm gold) — cosmetic only, no gameplay effect.
- WHY: Atmosphere; matches "game preview more graphical" (P0-18).
- SAFE ALONE?: YES — CSS class on container.
- HOW TO CHECK: tint applies per weather; no contrast regression.

**P7-51 · Stadium gradient per team**
- WHERE: game preview header.
- WHAT: Header background gradient derived from the user's team colours (already have them) plus a subtle stadium silhouette SVG (inline, no CDN).
- WHY: Home-field feel.
- SAFE ALONE?: YES — CSS/SVG, no logic.
- HOW TO CHECK: gradient matches team; SVG inline; no external requests.

**P7-52 · Guided tour / first-run overlay**
- WHERE: first load.
- WHAT: 4-step spotlight overlay highlighting draft board → weights → play season → review; dismissible, re-showable from settings.
- WHY: Onboarding for new users (P0-12/P1-20).
- SAFE ALONE?: YES — overlay + localStorage flag.
- HOW TO CHECK: shows on first run only; re-showable; no console errors.

**P7-53 · Density toggle (compact/comfortable)**
- WHERE: settings.
- WHAT: Toggle reducing padding/font by ~15% for power users; persisted.
- WHY: Lets users fit more on screen.
- SAFE ALONE?: YES — CSS class on body.
- HOW TO CHECK: toggle changes density; persists; 390px still usable.

**P7-54 · Colorblind-friendly palette option**
- WHERE: settings.
- WHAT: Alternate palette (blue/orange instead of red/green) for success/error states; persisted.
- WHY: Accessibility.
- SAFE ALONE?: YES — CSS var swap.
- HOW TO CHECK: toggle swaps colours; persists; contrast maintained.

**P7-55 · High-contrast mode**
- WHERE: settings.
- WHAT: Increases borders/text contrast, disables subtle backgrounds.
- WHY: Accessibility for low vision.
- SAFE ALONE?: YES — CSS class on body.
- HOW TO CHECK: toggle works; no layout break; persists.

**P7-56 · Konami-code easter egg**
- WHERE: global.
- WHAT: Konami code (↑↑↓↓←→←→BA) toggles a retro 8-bit theme (pixel font, chunky borders) for fun; persisted.
- WHY: Delight; no gameplay effect.
- SAFE ALONE?: YES — CSS class + key sequence.
- HOW TO CHECK: sequence triggers theme; persists; reversible.

**P7-57 · Highlight reel carousel**
- WHERE: game recap.
- WHAT: Auto-rotating carousel of the top 3 plays (TD/turnover/big play) with play description + mini graphic; pauses on hover.
- WHY: Recap "clutch narration" exception stays as text, but graphics carry the rest (P0-18).
- SAFE ALONE?: YES — display-only.
- HOW TO CHECK: carousel rotates/pauses; no console errors.

**P7-58 · "Your pick vs CPU best" after each pick**
- WHERE: draft board, post-pick.
- WHAT: Small line: "CPU would have taken [Player] ([Ovr])" — derived from existing CPU pick logic output, display-only.
- WHY: Teaches the user; adds transparency.
- SAFE ALONE?: YES — display-only (CPU pick already computed).
- HOW TO CHECK: line shows after each pick; no new math.

**P7-59 · Redo button alongside undo**
- WHERE: draft board.
- WHAT: "Redo" re-applies last undone pick if no new pick made since; disabled otherwise.
- WHY: Forgiveness for accidental undos.
- SAFE ALONE?: NO — needs undo-stack tracking; cohort with P0-12.
- HOW TO CHECK: redo works once; disables after new pick.

**P7-60 · Achievement badge system**
- WHERE: season review.
- WHAT: Small badges for milestones (first win, 10-win season, playoff clinch, Super Bowl, undefeated, etc.) with a subtle unlock animation.
- WHY: Long-term engagement; visual reward.
- SAFE ALONE?: YES — derived from existing season results.
- HOW TO CHECK: badges unlock at correct milestones; animation respects reduced motion.


## 16. Achievement & incentive ideas (V22 work-order candidates, batch 6)

**P7-61 · "Giant Killer"** — beat a team rated 5+ OVR higher; badge = sword crossing a crown; gold rarity.
**P7-62 · "Comeback Kid"** — win after trailing by 14+ in the 4th quarter; badge = rising arrow; blue rarity.
**P7-63 · "Shutout"** — hold opponent to 0 points; badge = padlock; silver rarity.
**P7-64 · "Blowout"** — win by 28+; badge = lightning bolt; silver rarity.
**P7-65 · "Perfect Game"** — 0 turnovers + 0 sacks allowed; badge = diamond; gold rarity.
**P7-66 · "Iron Man"** — no injuries all season; badge = shield with heart; bronze rarity.
**P7-67 · "Road Warrior"** — 8+ road wins in a season; badge = bus; bronze rarity.
**P7-68 · "Division Sweep"** — beat all division rivals; badge = broom; silver rarity.
**P7-69 · "Draft Steal"** — a 4th+ round pick becomes a starter with 80+ OVR; badge = magnifying glass; gold rarity.
**P7-70 · "Franchise QB"** — draft a QB in round 1 who becomes a 90+ OVR starter; badge = QB helmet; gold rarity.
**P7-71 · "Defensive Mastermind"** — lead league in points allowed; badge = wall; silver rarity.
**P7-72 · "Offensive Juggernaut"** — lead league in points scored; badge = fire; silver rarity.
**P7-73 · "Clutch"** — 5+ game-winning drives in a season; badge = clock; gold rarity.
**P7-74 · "Underdog"** — win the Super Bowl as a wild card; badge = star burst; gold rarity.
**P7-75 · "Dynasty"** — win back-to-back Super Bowls; badge = crown + 2; platinum rarity (animated shimmer).
**P7-76 · "Rebuilder"** — reach playoffs within 2 seasons of a 4-win season; badge = phoenix; gold rarity.
**P7-77 · "Scouting Guru"** — draft 3 players who become starters; badge = eye; silver rarity.
**P7-78 · "Cap Genius"** — win with the lowest-rated roster in the league (avg OVR < 75); badge = coin; gold rarity.
**P7-79 · "Iron Curtain"** — 3 shutouts in a season; badge = three padlocks; platinum rarity.
**P7-80 · "Century"** — score 100+ points in a single game; badge = "100"; platinum rarity (animated).

Each achievement: unlock animation (scale-in + shimmer), toast notification, persisted in localStorage, displayed in a beautiful trophy case on the season review. Rarity tiers: bronze (common), silver (uncommon), gold (rare), platinum (animated shimmer, rarest).


## 17. Shimmering gradient text (P7-81) — apply everywhere

**P7-81 · Shimmering gradient text**
- WHERE: championship banner, team-name headers, page titles, award winners, "Super Bowl Champion!", "Drafting as [Team]", conference champion banners, 100-season review title.
- WHAT: Apply a shimmering gradient text effect (`background: linear-gradient(90deg, color1, #fff, color1); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 2.5s ease-in-out infinite;`) using team colours or gold. Adapts to team theming via `--team-primary`/`--team-accent`.
- WHY: High visual impact, zero JS, pure CSS, draws the eye to key moments. User specifically loved this effect.
- SAFE ALONE?: YES — CSS-only, display-only.
- HOW TO CHECK: shimmer renders on all target elements; respects `prefers-reduced-motion` (animation disabled); no layout shift; contrast maintained.


## Open questions for the Architect (≤5)
1. Default tab: Owner's "DRAFT hero" implies Draft-first, but P1-20 recommends Season-first. Which wins?
2. Should the homepage onboarding strip be dismissible permanently or re-showable from settings?
3. Base-defense recommendation chip: auto-suggest or manual-only? (R-7 leaves both open.)
4. Game recap "Share" format: plain text only (no images, no CDN) — confirm.
5. Light/dark override: persist in localStorage (allowed, no CDN) — confirm scope.

## What I will not do
No edits to `Football-Sim-*.html`, protected constants, or shared governance files. Proposals only, per AGENTS.md §5.
