# V21 Product Review — Draft Board on Desktop — BOC (MOC dispatch) — 21 Oct 2026

Artifact: `NFL Draft Simulator merged.html`, 656,746 B, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (V22 candidate). Branch `gpt/council-reliability-scorecard`. Read-only; no product edits.

## Confirmed defects (VERIFIED by reading code)

### D-1. "Value here" column is still visual (Owner wants it removed)
- **Location:** l.426 (header `<th>Value here</th>`), l.1766 (row cell `<td class="score dc-val" data-label="Value here">`), l.268 (CSS `dc-val`), l.418 (sort option), l.4991 (Guide bullet), l.5056 (section title).
- **What:** The "Value here" column is still displayed on the draft board. The Owner directed its removal from the visual (keep in background math).
- **How seen:** Code reading. BOC's prototype (`value-here-prototype.md`) covers 7 locations. MOC verified the edits on copies (headers 10→9, cells 1,148→0, console 0).
- **Severity:** P0 (Owner directive).

### D-2. Star system still present (Owner wants it removed)
- **Location:** l.1572 (`PRIO_MULT`, `PRIO_STAR`), l.1577 (`prioOf`), l.1131 (star click handler), l.1705 (chip star), l.1727 (pcard star), l.1708 (chip numbers/stars text).
- **What:** Stars (★★/★/☆) are still rendered on chips and position cards, with click handlers and the ×1.5/×1.0/×0.5 Priority multiplier. Owner wants the Star system removed ("not useful and confusing").
- **How seen:** Code reading. The Star system changes Priority rankings (★★ counts 1.5×), so removing it changes the draft board's numbers.
- **Severity:** P0 (Owner directive). Note: removing stars changes Priority values; the board's numbers will move.

### D-3. "Undo my last pick" should read "Undo"
- **Location:** l.403 (`<button ...>↶ Undo my last pick</button>`).
- **What:** Button text is "Undo my last pick"; Owner wants "Undo".
- **Severity:** P1 (cosmetic).

### D-4. "1 of 26 starters · +3.69 wins" at top of roster panel
- **Location:** l.1778 (`document.getElementById('draftRosterTotal').innerHTML = ...`), called at the top of `renderDraftRoster2()`.
- **What:** The roster summary line (starters count + wins) is rendered at the top of the roster panel. Owner wants it at the bottom.
- **Severity:** P1 (layout).

### D-5. "also fits: CB1 +1.37" format should be "also CB1 (−2 flex)"
- **Location:** l.1764 (`altTxt` template).
- **What:** Shows "also fits: CB1 +1.37 (−2 flex)". Owner wants "also CB1 (−2 flex)" — remove "fits:" and the wins number.
- **Severity:** P1 (display).

### D-6. Flex potential shows all penalties (-6, -8) always
- **Location:** l.1705 (chip star), l.1727 (pcard), flexTxt at l.1714. Owner rule: only -2/-4 before round 20; -6/-8 after round 20.
- **What:** All flex penalties shown always. Owner wants -6/-8 hidden until round 20.
- **Severity:** P1 (display rule not implemented).

### D-7. Position cards not collapsed on mobile
- **Location:** l.1721 (cardgrid), l.199-201 (CSS). Mobile shows full cards with all attributes.
- **What:** Owner wants compact row (icon + position abbr + OVR) on mobile, expanding on tap.
- **Severity:** P1 (mobile UX).

### D-8. Position card order not following roster order
- **Location:** l.1720-1727. Cards rendered in WV_GROUPS order, not ROSTER_SLOTS order.
- **What:** Owner wants cards in roster order.
- **Severity:** P1 (UX).

### D-9. Footer tabs not always visible at bottom
- **Location:** l.239 (`.footnav` CSS: `margin:34px auto 0`, not fixed/sticky).
- **What:** Footer tabs scroll away. Owner wants them always visible at bottom.
- **Severity:** P1 (UX).

### D-10. "MORE" in tab footer
- **Location:** l.439 (`<span class="footlabel">More</span>`).
- **What:** Owner wants "MORE" removed.
- **Severity:** P1 (cosmetic).

### D-11. Player browser shows all 1,200+ players (no cap)
- **Location:** l.791-815 (`renderPlayers()` renders all matching rows).
- **What:** Owner wants ~15 on desktop. No pagination/cap exists.
- **Severity:** P1 (UX/performance).

### D-12. Team comparison default matchup
- **Location:** l.6386 (`selA.value = (currentScored[0]||{}).team || teams[0]`).
- **What:** Default is first sorted team, not Chiefs/Raiders. Owner wants Chiefs (A) / Raiders (B).
- **Severity:** P2 (preference).

### D-13. Team comparison "real" in subtitle
- **Location:** l.823 (`'Put any two real rosters side by side.'`).
- **What:** Remove "real".
- **Severity:** P2 (cosmetic).

### D-14. Effective ratings note on Team Comparison
- **Location:** l.3364 (inside `unitComparisonHTML`, shown on both home and Team Comparison pages).
- **What:** Owner wants it removed from Team Comparison only, kept on Draft Simulator.
- **Severity:** P2 (cosmetic).

## Preferences (not confirmed defects)

### P-1. Position cards on mobile
Full cards with all attributes take too much vertical space on mobile. Compact row (icon + position abbr + OVR) would be better. (Owner preference, not a defect.)

### P-2. Sort/filter controls
Four controls (search, position filter, sort, view) take vertical space. Could be sticky or collapsible. (Owner preference.)

### P-3. Team colors on draft board
Owner wants draft board colors to reflect user's selected team. Requires 32-team color map (MiMo verifying source). (Owner preference, not a defect.)

### P-4. Player browser pagination
~15 players on desktop. Currently shows all. (Owner preference.)

## What BOC did not check
- Visual rendering (no browser access; all findings are from code reading).
- Mobile layout at 390px (reported by MiniMax/LongCat but not independently verified by BOC).
- Whether the draft board's `tablewrap` max-height (640px) is appropriate for the Owner's desktop.
- Whether the position cards' `cardgrid` (auto-fill, minmax 250px) produces the right number of columns on the Owner's screen.

VERIFIED by reading code. No product edits. No other seats' files touched.
