# Candidate A Review (BOC) — 22 Oct 2026

Build: `V22-candidate-2026-10-21.html` · 6585 lines · diff vs `Football-Sim-V21.html` (6554 lines) = +31 lines, 185 hunks

## What candidate A implements (vs work order P0 items)

### P0-1: "Value here" removal from website
**PARTIALLY IMPLEMENTED.** The sort dropdown label changed from "value here" to "slot value" (l.418/428), and the column header "Value here" was removed from the draft board table (l.426/428 — the `dc-val` cell and its header were removed). However, the "Value here" text still appears in the Guide (l.4991-4992, l.5056) and in the board math HTML. The `r.v` computation remains.

### P0-2: "MORE" label removal
**IMPLEMENTED.** The footnav "More" label was removed (l.439/441: `<span class="footlabel">More</span>` deleted).

### P0-3: Team colours
**NOT IMPLEMENTED.** No team colour CSS or JS changes. The candidate does not include the 32-team palette.

### P0-4: Weight controls ("Default" / "Save My Weights")
**IMPLEMENTED.** The weight control buttons were redesigned:
- "Use model weights" → "Default" with new tooltip
- "Back to my weights" → "Save My Weights" (disabled until dirty)
- New `isDirty()` and `syncWBtn()` functions
- "My Weights" button enables when weights are changed
- New `.resetbtn.off` CSS class for disabled state

### P0-5: Mobile responsiveness
**IMPLEMENTED (extensively).** 100+ CSS rules gained `!important` for mobile (390px) responsiveness. Many inline styles were converted. This is the bulk of the 185 hunks.

### P0-6: Biome compliance
**IMPLEMENTED.** Numerous code changes for biome compliance:
- Template literals → string concatenation
- Optional chaining (`?.`) → `&&` checks
- `**` exponentiation → `Math.pow()`
- `Object.hasOwn()` → `hasOwnProperty()`
- `const` → `let` where reassignment occurs
- IIFE `(()=>{...})()` → `(function(){...})()`
- Function renames (removing leading underscores)

### P0-7: Team comparison page
**NOT IMPLEMENTED.** No changes to team comparison.

### P0-8: Guide updates
**PARTIALLY IMPLEMENTED.** "Team Comparison" description changed from "Put any two real rosters side by side" to "Put any two rosters side by side." Minor.

## What candidate A does NOT implement (from work order)
- Team colours (P0-3)
- Team comparison page changes (P0-7)
- Guide visual overhaul (P0-8) — only minor text change
- Copy passes (P10/P11) — "points a game" ×20 still present, "had ripped off" still present, em dashes 201→212
- Flex rules rewrite (P10-1)
- 3-4 base mapping (P10-2)
- Coaching philosophy unlock (P10-3)
- "CB3 / Nickel" rename
- "Value here" removal from Guide
- Game preview/review/season review/100-season report graphical changes

## Key observation
Candidate A is primarily a **code quality + mobile responsiveness** pass. It does not implement the Owner's graphical/copy briefs. The "Value here" removal is partial (column removed from draft board, but still in Guide and sort dropdown renamed to "slot value"). The weight controls were redesigned per the Owner's brief ("Default" / "Save My Weights").

## Recommendation
Candidate A should be merged (it's a strict subset of C per MOC's merge map). Candidate C adds 4 more hunks (+47/−5 lines) on top. The copy passes (P10/P11) and graphical changes (P3) are still needed after the merge.
