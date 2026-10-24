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

## Open questions for the Architect (≤5)
1. Default tab: Owner's "DRAFT hero" implies Draft-first, but P1-20 recommends Season-first. Which wins?
2. Should the homepage onboarding strip be dismissible permanently or re-showable from settings?
3. Base-defense recommendation chip: auto-suggest or manual-only? (R-7 leaves both open.)
4. Game recap "Share" format: plain text only (no images, no CDN) — confirm.
5. Light/dark override: persist in localStorage (allowed, no CDN) — confirm scope.

## What I will not do
No edits to `Football-Sim-*.html`, protected constants, or shared governance files. Proposals only, per AGENTS.md §5.
