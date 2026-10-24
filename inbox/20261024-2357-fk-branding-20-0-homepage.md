SPEAKER: FK | TASK: branding-20-0-homepage-copy | DATE: 2026-10-24T23:57Z
FOR: V23 branding (Owner directive) | QUEUE- none (Owner-direct V23 item)

# V23 — Branding "20-0." + homepage copy (tackling the owner-analyst proposal items)

Related proposal: `_agents/moc/notes/branding-20-0-and-homepage-copy.md` (MOC, 22 Oct, "20-0 branding + homepage copy + player-browser pagination + clickable header"). This item tackles the branding + homepage-copy portion of that proposal against the current Pre-Colors build.

## Change set

1. Homepage draft-setup intro copy (Football-Sim-PreColors.html:385)
   old -> new:
   - old: `32 real NFL franchises are shuffled into a random snake draft order. Every player at every starter position is available from Round 1 — draft for value and need. CPU GMs draft by the same math the season uses: each takes the player who adds the most wins at a spot it still needs (with a little personal taste and randomness) and can flex players. Read the guide below the setup before you start.`
   - new: `Season, Playoffs, Super Bowl. Can you go 20-0?`

2. Homepage CTA copy / button framing
   - new: `Draft, Season, Playoffs, Super Bowl. Can you go 20-0?` (button label "DRAFT" with heavy UI emphasis per Owner directive; current label `Start Draft` at Football-Sim-PreColors.html:394).

3. Season line
   - new: `Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?`

## Product identity — "20-0."
- Present as `20-0` in header, footer, title, copy; player browser 15 rows/page, clickable header → homepage; file names stay `Football Sim`. V23 only; not in the unmerged bundle.

## WHY
Owner's branding decision (verbatim: product to present itself as "20-0" in header, footer, title and copy; files stay "Football Sim"). Replaces the long franchise-draft preamble with a season-framing question.

## SAFE ALONE?
yes — copy/UX only; no math, no protected constants, no roster data.

## HOW TO CHECK
- `grep -n '32 real NFL franchises' Football-Sim-PreColors.html` -> expect 0 hits after change.
- Homepage renders `Season, Playoffs, Super Bowl. Can you go 20-0?`.

## EVIDENCE
- VERIFIED: old homepage paragraph located at Football-Sim-PreColors.html:385; button `Start Draft` at :394; season line at :319/:5034.
