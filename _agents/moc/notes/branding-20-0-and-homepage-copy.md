# 20-0 branding + homepage copy + player-browser pagination + clickable header

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: capture the Owner's 22 Oct directives as one proposal | DATE: 2026-10-22T20:10:00Z**

Owner's words (verbatim): product to present itself as **"20-0"** in header, footer, title and copy; files stay "Football Sim". Homepage button "Set Up Your Draft" → **"DRAFT"** (heavy UI emphasis). Replace the long intro paragraph with: **"Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"**. Season line → **"Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"**. Player browser: only 15 names visible. Header must be clickable → homepage.

## A · Branding — "20-0" everywhere (UI only)

- **WHERE:** `<title>`, `<header class="hero">` (l.317), footer, and every user-facing string that says the product name. Pre-Colors `40233d6b…`.
- **WHAT:** s/`Football Sim`/`20-0`/ in display text only; filenames, branches, backups unchanged.
- **WHY:** Owner's branding decision.
- **SAFE ALONE?** Yes — no math, no protected constants.
- **HOW TO CHECK:** grep the build for "Football Sim" in display strings → 0; header/footer/title show "20-0".

## B · Homepage button + copy

- **WHERE:** homepage setup view (search `Set Up Your Draft`).
- **WHAT:** label → **"DRAFT"** (heavy styling); remove the long paragraph; new text: "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"
- **SAFE ALONE?** Yes.
- **HOW TO CHECK:** homepage shows "DRAFT" button + new sentence; no leftover old paragraph.

## C · Season line

- **WHERE:** season onboarding/review text.
- **WHAT:** → "Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"
- **SAFE ALONE?** Yes.

## D · Player browser pagination (15 rows)

- **WHERE:** Player Browser tab, `initPlayerBrowser()` l.720; render path (no paging today).
- **WHAT:** 15 rows/page, prev/next + page indicator; filters/sort unchanged; header stays visible.
- **SAFE ALONE?** Yes.
- **HOW TO CHECK:** 390 px, table shows exactly 15 rows, footer reachable in < 1 s, sort works, no console errors.

## E · Clickable header → homepage

- **WHERE:** `<header class="hero">` l.317.
- **WHAT:** title + drafting-as badge act as "go home" (link to Season tab).
- **SAFE ALONE?** Yes.
- **HOW TO CHECK:** click from any tab → Season tab; keyboard focusable; no 390 px overflow.

## Open design decision — header rework

Owner is open to a complete rework ("especially considering some of the tools you have available now" — Figma is connected). Two options:

- **Option 1 (keep, patch):** keep `.hero`, add click target, light polish. Ships in next build.
- **Option 2 (rework in Figma):** new shared header component in Figma using the new authoritative palette, then port. One Figma file + one pass; delays pagination.

**Recommendation:** Option 1 now (fixes click + pagination next build), Option 2 as a separate Figma-driven item (work-queue P3) so it does not block V23. If the Owner wants beauty first, Option 2 first — but then pagination waits.

## What I did not do

No product edit, no Figma file, no branch. Proposal only; the Architect implements. The Owner's decision on header (Option 1 vs 2) is the only blocker.
