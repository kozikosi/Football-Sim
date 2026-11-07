# VLOC — w79 UI/UX proposals (display-only; no game-math change)

Per the Owner: UI/UX showing flex penalties, WINS and ratings should reflect the new weights/flex info, but these do NOT need to affect background math or play-by-play. Only the Architect writes product HTML (AGENTS.md §5); these are exact patch-form proposals (WHERE anchor → old → new → WHY → SAFE ALONE → HOW TO CHECK) for the Architect to build into w79.

Anchor references are to `Football-Sim-PreColors.html` (sha256 40233d6be00e987c), original line numbers.

## U-1. Madden Rankings / Position Rankings: add draft-board-style quick buttons + depth-chart order

WHERE: the supplementary "Madden Rankings" panel, `viewGroups` (original lines 356-367), built by `initGroupRankings()` (lines 431-453). It currently renders only a `<select id="groupSelect">` (line 359) with `<optgroup>`s by category (Offense — Positions, Offense — Team Units, ...). The category order is GROUP_DEFS order, not depth-chart order.

The draft board / Player Browser already has the pattern the Owner wants (lines 727-767): `posBtn` + `posList` with individual checkboxes plus "Quick Groups (click to select)" buttons (`.qgbtn`, lines 737-740) built from `QUICK_GROUPS`, and `DEPTH_CHART_GROUPS` (lines 644-648) defines Offense / Defense / Special Teams in depth-chart slot order.

OLD: viewGroups panel = only `groupSelect` dropdown, optgroups in GROUP_DEFS category order.
NEW: above `groupSelect`, add a row of quick-group buttons mirroring the draft board's `.qgbtn`, one per DEPTH_CHART_GROUPS entry (Offense, Defense, Special Teams), plus an "All" clear button. Clicking a button filters the position rankings to that group's slots in depth-chart order (Offense: QB RB1 RB2 WR1 WR2 WR3 TE1 TE2 OT1 OG1 C OG2 OT2; Defense: DE1 DT1 DT2 DE2 MIKE WILL SAM CB1 CB2 CB3 FS SS; Special Teams: K). Keep the `groupSelect` dropdown and its position groups intact (Owner: "Can keep the position groups"). When a quick button is active, highlight it and keep the dropdown in sync.

WHY: "The Madden rankings dropdown is super messy: please add the same buttons as the draft board and fix the drop downs to use the same order as the depth chart."
SAFE ALONE: yes (additive UI, no math).
HOW TO CHECK: open Madden Rankings at 390px and desktop; verify Offense/Defense/ST buttons exist, filter the table, match depth-chart slot order; dropdown still works; no console errors.

## U-2. Mobile footer: tab change must scroll to TOP, not bottom

WHERE: `setActiveTab(viewId, btnId)` (original lines 832-840). Footer buttons are wired at lines 817-822 (`tabRankingsBtn`→viewRankings, `tabGroupsBtn`→viewGroups, etc.). `setActiveTab` already calls `window.scrollTo(0,0)` (line 833) but it runs BEFORE the DOM toggles/rendering (line 835+), so on mobile the newly-rendered content can leave the viewport scrolled to the bottom.

OLD: `setActiveTab` scrolls once at the top of the function, before view toggle/render.
NEW: make scroll-to-top robust and post-render: after toggling active classes (and after any view-specific render such as `renderHomeComparison`/`guideHTMLCached`/`fillDraftGuide`), execute:
```
window.scrollTo(0,0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;
```
defensively (all three, no-op where unsupported). Optionally wrap the final scroll in `requestAnimationFrame` so it runs after paint.

WHY: "on mobile when I click to one of the pages in the footer like Madden rankings or position rankings, my screen will automatically go to the bottom of the page. User should default to the top of the page like any other website."
SAFE ALONE: yes (scroll only).
HOW TO CHECK: open on mobile viewport (390px), tap each footer button, confirm viewport starts at the top of the new page every time.

## U-3. Flex penalties / WINS / ratings display reflect new tables

These are computed from the engine tables, so they auto-update when the underlying protected constants change (Architect applies the flex.json cap-at-10 and DEFAULT_WEIGHTS). No hand-editing of displayed numbers is needed; the proposals here keep the labels correct.

- Flex penalty display: lineup editor slot options `(flex −${pen})` (line 1142), roster slot dropdown `(flex −${fp} = ${p[3]-fp})` (line 1284), lineup advice `flex −${flexPenaltyFor(...) }` (line 1250). After flex.json 6→10, these render −10 where applicable. Verify a TE→MIKE row reads "(flex −10)" not "(flex −6)".
- WINS display: draft board "Wins" column (line 426, `data-sort="wins"`), roster group scores (line 1268), Madden Rankings `computeScore` using `weights[s]` (lines 568-580). After DEFAULT_WEIGHTS = Owner's table, ranks/scores reflect the new position values. Verify the Madden Rankings "Use model weights" / weight inputs show the Owner's values (QB 1000, WR1/DE1 650, ...) and ranks recalc instantly (the SUPP_TITLES text at line 823 already promises this).
- Salary data (the xM salary column in the Owner's list) must NOT be displayed (Owner directive). Verify no salary figure appears on the Madden Rankings or weights editor.

WHY: "update all the ui / ux showing of flex penalties and WINS and ratings ... change anything the user would see in w79 regarding weights or flex penalties to the new information."
SAFE ALONE: yes (display strings, no math).
HOW TO CHECK: open Madden Rankings and lineup editor; confirm flex reads −10 for capped rules, weights inputs show Owner's table, no salary shown, ranks recalc when a weight input is edited.
