
---

# P7 — Aesthetics and beauty (Beam's suggestions)

### P7-1 · [NEW] Team-color theming across the entire UI
**What:** The draft board's left-hand roster colors should reflect the user's selected team. For KC Chiefs: red + white + yellow (third color). For Seahawks: blue + green + white. For every team, derive a three-color palette (primary, secondary, accent) and apply it to:
- The draft board's left-hand roster strip (already requested by Owner)
- The tab bar's active tab indicator
- The "Drafting as [Team]" header box
- The team comparison page's Team A/Team B headers
- The position cards' left border
- The badge strip's accent color
**Where:** CSS variables `--team-primary`, `--team-secondary`, `--team-accent` set on `:root` when a team is selected. All team-colored elements reference these variables.
**Impact:** Medium. New data (team color palettes for 32 teams) + CSS changes. High visual impact.
**Figma:** Not yet set up. The Owner mentioned Figma access may need more configuration. If available, Figma would be ideal for designing the team-color palettes and testing them across all 32 teams before implementation.

### P7-2 · [NEW] Smoother animations and micro-interactions
**What:** Add subtle animations to improve the feel of the draft board:
- Player card hover: slight scale (1.02) + shadow lift
- Draft pick animation: card slides in from right with a 200ms ease-out
- Tab switch: fade transition (150ms)
- Badge appearance: pop-in with 100ms bounce
- Weight slider change: number counter animation (300ms)
- "Save My Weights" button: pulse animation when it becomes clickable
**Where:** CSS transitions on `.card`, `.badge`, `.tab`, `.weight-slider`. JS for the counter animation.
**Impact:** Low-medium. CSS + small JS additions. High polish impact.
**Cost:** Minimal performance cost (CSS transforms are GPU-accelerated).

### P7-3 · [NEW] Better visual hierarchy on the draft board
**What:** The draft board currently has flat visual hierarchy — all rows look similar. Improve by:
- Making the user's pick row slightly larger (1.1x scale) with a subtle glow
- Color-coding position groups (QB = blue, RB = green, WR = orange, TE = purple, OL = gray, DL = red, LB = teal, CB/S = yellow, K/P = brown)
- Adding a subtle zebra stripe (alternating row backgrounds at 2% opacity)
- Making the "gone" players (already drafted) visually distinct (dimmed, strikethrough)
**Where:** Draft board rendering CSS + JS.
**Impact:** Medium. CSS + small JS. High readability impact.

### P7-4 · [NEW] Dark mode polish
**What:** The sim is dark by default. Polish the dark theme:
- Softer card backgrounds (`--panel2` from `#1a1f2e` to `#1e2433`)
- Better contrast on text (secondary text from `#8b92a8` to `#9aa0b8`)
- Subtle gradient on the header (`linear-gradient(135deg, var(--accent), var(--accent2))`)
- Glass-morphism on modals and dropdowns (`backdrop-filter: blur(8px)`)
- Better scrollbar styling (thin, rounded, accent-colored)
**Where:** `:root` CSS variables + modal/dropdown CSS.
**Impact:** Low. CSS-only. High polish impact.

### P7-5 · [NEW] Visual feedback on draft picks
**What:** When a player is drafted:
- The drafted player's card flashes green for 500ms
- The team's roster strip updates with a slide-in animation
- A small confetti burst (CSS-only, 3 particles) on the user's pick
- The "X of 26 starters" counter animates (number rolls up)
**Where:** Draft pick handler JS + CSS animations.
**Impact:** Low-medium. CSS + small JS. High delight factor.
**Cost:** Minimal. CSS animations are performant.

### P7-6 · [NEW] Better mobile draft board
**What:** Beyond the collapse-to-compact-row already requested:
- Sticky position filter bar (always visible at top of mobile draft board)
- Swipe-to-draft (swipe right to draft, swipe left to skip) — gesture-based interaction
- Bottom sheet for player details (instead of navigating away)
- Haptic feedback on draft pick (via `navigator.vibrate(50)`)
**Where:** Mobile CSS + touch event handlers.
**Impact:** Medium. JS + CSS. High mobile UX impact.
**Caveat:** Swipe gestures and haptic feedback are progressive enhancements — must degrade gracefully on desktop.

### P7-7 · [NEW] Figma integration
**What:** The Owner mentioned Figma access may need more setup. If available, Figma would be ideal for:
- Designing team-color palettes for all 32 teams
- Testing mobile layouts at 390px, 760px, 1280px
- Creating component libraries (cards, badges, tables) for reuse across sports
- Exporting design tokens (colors, spacing, typography) as CSS variables
**Where:** Design tool, not code. Would feed into the CSS variable definitions.
**Impact:** High visual quality, but requires Figma setup first.
**Status:** Not yet available. Owner to configure Figma MCP if desired.

---

## P8 — Council-only notes (not for Claude to implement; for the record)

### P8-1 · The "Value Here" removal
"Value Here" is gone from the board, the guide, and the sort label. The sort option is KEPT and relabelled "Sort: slot value". The underlying `r.v` is still computed for every row and still feeds Priority, the priority bar, the flex tag, the group best, the replacement counts and the sort key.

### P8-2 · The "also fits" line
Format: "x also y (−z flex)" — no wins number, no "fits". Only −2 and −4 flexes shown; −6 and −8 from round 21.

### P8-3 · The Star system is removed
Stars set how much you care about a position (★★ must-fill, ★ normal, ☆ low). Removed because it was confusing. The priority bar remains.

### P8-4 · The position cards follow the roster order
The order of position cards should follow the order of the roster order. Mobile cards collapse to one row.

### P8-5 · The team colors
The draft board's colors reflect the user's selected team. For KC: red + white + yellow. For Seahawks: blue + green + white. The special teams color is the team's third color.

### P8-6 · The weights
The default weights are how the draft simulator sees the game. The Owner's specific changes: K 0.72→0.45, WR2 0.60→0.63, RB1 0.67→0.58, CB2 1.18→0.95, DE1 1.30→1.38, TE1 within 0.5 of WR1, TE2 within 0.5 of WR3, QB/WR pass/run percentages adjusted for run game. The "Save My Weights" button is transparent until a default weight is changed, then blue + "My Weights".

### P8-7 · The glossary
25+ football terms for casual fans. Cross-reference with game previews and reviews.

### P8-8 · The advanced stats
9 of 12 proposed stats are already computed but not displayed. Only 3 require new math. Recommend: do not build EPA (the model is structural, not play-level).
