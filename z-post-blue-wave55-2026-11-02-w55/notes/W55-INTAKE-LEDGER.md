# W55 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 55 (the Owner's count; the baseline is his w54 — my last build, internally wave WM) · received 2026-11-02 · one directive with ten named asks.

> "I paused your last attempt because you couldn't find w53 or w54. They should be available now."
> — Found: `council/uk` carries the w53-named docs, `council/vl` carries `Football-Sim-Z-post-blue-w54.html` (1,586,055 B, md5 512d1885…). The w54 bytes are the baseline of this wave. The w54 diff over w52 = the touch polish (WM1), the tap floors (WM2), the rankings containment (WM4) — all kept intact.

> "These player cards on the compressed screen/mobile are still too big. They are taller vertically than in full size window. Please try to condense all this information into one or two lines for mobile" (+ the paste "TOP Josh Allen QB ￼ 99 +3.7 +1.0 99% QB Draft Matthew Stafford QB")
> — The paste reads out the phone draft-board card (name · pos · crest · OVR · wins · priority · gone · fills · Draft). Fix: the phone card collapses to TWO lines — line 1 name · OVR · Draft button, line 2 one quiet stat line (pos · team · wins · priority · gone · fills) with the mini labels retired; the CARDS view rows lose the bar and read name / one narr line. CSS only, the desktop board untouched.

> "The dime on the lineups and preseason page should look like everyone else, not be unchangeable"
> — The lineup editor (preseason `lineupPre`, the season LINEUP AND FLEXES panel `lineupSeason`, the review editor `lineupEd` all share `lineupEditorHTML`) rendered DIME as a static name row while every slot got a picker. Fix: DIME renders the same `<select data-lineup="CB4">` picker — the existing staged wiring (zpbPickList + APPLY THE CHANGES + UNDO) picks it up for free. CB4 is a natural slot (w38), so the pool is the corner room.

> "Maybe try to add small local storage so that if a user refreshes they can at least come back to where they were"
> — INTERPRETATION (flagged): "small" = the tab you were on is remembered (`zpb:tab`, same family as the existing `zpb:theme`) and restored on boot for the five support tabs; the simulator tab is the boot default so restoring it is a no-op. The season/draft state itself stays in memory — persisting multi-MB season JSON was judged beyond "small" and risky; say the word and a full season save can be its own wave.

> "The box score does not look at all correct on mobile. It's two separate panels. It should all be together like it looks on dektop."
> — Reproduced at 390px: the generic phone law `table{display:block}` splits the linescore (thead + tbody) into anonymous tables → two stacked panels with the quarters running vertically. Fix: `table.linescore` (and the team-stats table) keep `display:table`, drop the 320px min-width, shrink padding/font — one compact table on the phone, exactly the desktop shape; the mstack pass now skips it (`data-nostack`).

> "Try to reduce the side scroll even more. No reason to need to side scroll on the game preview page or game review page."
> — Root-caused with a min-content walk: body is a flex column and `.wrap{margin:0 auto}` made the page shrink-to-fit its widest child — the preview's star face-off row (`.zpb-pvfrow`, two cards side by side) needs ~530px and panned the document 221px at 390px. Fix: `.wrap{width:100%}` on ≤1024px (the B4 law keeps wide windows as they are) + the face-off pairs go one-per-line ≤640px + the preview strip squeezes ≤360px. Measured result: 0px document pan on preview and review at 390 and 320.

> "The season in badges, please make the cards/badges appear in vertical order. The way it is currently, that blank space where the honors earned players go looks blank for too long. They should appear first. Don't change the way the pace at all. Everything else lo… Please fix."
> — The HONORS EARNED zone renders FIRST in the rail but held the LAST beats (~30s of blank top). Fix: the honors take beats 0..n−1, everything else shifts down by their count — the DOM order, the one-second pace and the total are untouched. Appearance order now matches the vertical order.

> "The Key players rating numbers are bunched up on top of their position badge on mobile. Please fix."
> — Same face-off squeeze: the OVR number (min-width 64px) crashed into the name + position chip on the paired cards; the review's Key Players wrapped names mid-word ("JOE BUR ROW"). Fix: one card per line on the phone; the review's name leads its own line with the stat chips wrapping below.

> "The Super Bowl champions team name on the superb bowl cinematic is not centered correctly on mobile. Please fix"
> — The champion crest (96px) + long Cinzel wordmark in one flex row overflows 390px and reads off-center. Fix: on ≤740px the crest stacks above the centered wordmark (both the `.zpb-sbfin` storm and the page's champion banner).

> "Remove "(whole corps)" from the receiving unit report card"
> — Both surfaces that print it: the Unit Report Card table's receiving line and the UNIT REPORT CARD tile's produced line. The w52 aggregation law itself (all receivers, one line) is untouched — only the parenthetical retires.

> "Continue to test mobile and make any improvements you can. Optimize for mobile as much as possible and take your time"
> — The whole wave IS the phone pass; the battery runs the standings/preview/review/box/draft pages at 390px and 320px with zero-pan + zero-page-error gates, and screenshots every fixed surface. Standing laws re-verified (dot law, clock law, look-gate one-clock, SB order, badge laws, bar track, w50/w51/w52 holds).

## §veto — interpretations the Owner may overturn
1. "Small local storage" = the remembered tab (plus the already-standing theme). A full season persistence is possible but heavy; not built.
2. "One or two lines" for the draft card = exactly two lines; the mini field labels retire on the phone (their meaning is carried by the values' order and the desktop board).
3. The "(all backs)" parenthetical on the backs' line was NOT named — left as-is; only "(whole corps)" was removed.
4. The DIME picker offers the corner room exactly like the CB3 picker does (natural slots first, flexes with their penalty) — the model's RETURN TO MODEL LINEUP covers CB4 like any slot.
