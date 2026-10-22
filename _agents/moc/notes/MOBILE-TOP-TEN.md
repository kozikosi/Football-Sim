# Mobile optimisation — top ten ideas, critiques, and obvious bugs

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Owner's item 4 — mobile top ten for Claude | DATE: 2026-10-21T08:30:00Z**

**Scope.** Mobile is a separate optimisation track (Owner's ruling), so this list is about the phone build
only. **All measurements are mine, on the merge candidate `40233d6b…` (657,486 B) @ `merge/v20-donor`
`ff8c05ae`, at a 390×844 viewport**, using the same probe the shared gate uses, plus a touch-target pass.
Ultra's A8 inventory and LongCat's P0 re-measure are cited where they overlap.

**The headline first, because it is good news and it is measured:** at 390 px the layout **does not overflow**.
Across the landing view and the three tabs I could reach without completing a draft, **zero elements extend
past the viewport** and **zero tables need a horizontal scroller** — the gate's own receipts agree (0
offenders, 0 clipped, 0 covered on every tab). The problems below are about **reachability, not overflow**.

## The ten, in impact order

**1 · Make the footer navigation a real mobile bar.** _Measurement:_ all six footer tabs are **24 px tall**
(`button.footlink` — Simulator, Madden Rankings, Player Browser, Position Rankings, Team Comparison, Guide),
against a 44 px touch guideline. These are the primary navigation, and 24 px is the height of a text line.
_Critique:_ they look fine in a desktop screenshot because the pointer does not need a 24 px target; on a
phone they are hard to hit and easy to miss. _Idea:_ a fixed bottom bar with 44 px minimum rows, safe-area
padding, and the active tab visibly distinct. _Bug risk:_ the bar is likely static-positioned, so on a long
page the navigation may scroll away entirely — check that.

**2 · The Team Rankings view has 52 interactive elements under 44 px.** _Measurement:_ 52 on the Rankings
tab, versus 10 on the Player Browser and 8 on the Simulator. These are the weight sliders and number inputs.
_Critique:_ 52 undersized targets is not a styling nit, it is the single worst view on the phone. _Idea:_
one control per row, 44 px tall, with the value and the unit in the row, and a single "reset" affordance
instead of a row of tiny inputs.

**3 · Pin the primary action, and fix the preseason CTA.** _Measurement (LongCat, DS, three seats):_
`#startSeasonBtn` at `top: 963, bottom: 1007` in a 390×844 viewport — **119 px below the fold** — and at
**y=1939 on a 1280×900 desktop**. The Owner's #7 already approves pinned navigation; this is the case that
needs it. _Critique:_ "below the fold" is not a phone-only problem, and a pinned nav that leaves the _button_
below the fold has not solved it. _Idea:_ the action bar is pinned to the bottom of the viewport, above the
footer nav, so the primary action is always in reach; the season screen's start button is the first control
in that bar.

**4 · The hero header clips 40 px of its own decoration.** _Measurement (mine):_ `header.hero` has
`scrollWidth 408` vs `clientWidth 368` at 390 px, and the source is
`header.hero::after { content:""; width:260px; position:absolute; left:148px; right:-40px }` — the glow is
pushed 40 px past the content box and then clipped by `overflow-x: hidden`. _Critique:_ this is the only
"hidden clipped" element the gate has reported in every run, and it is a false positive that will mask the
next real one. _Idea:_ either make the bleed deliberate (let it bleed past the box) or contain it — and
either way, stop counting it as a defect.

**5 · Stop the two dropdowns being 33 px tall.** _Measurement:_ `#draftSlotSelect` (199×33) and
`#draftPickNumberSelect` (94×33) on the landing view. _Idea:_ full-width rows at 44 px minimum, or
replace them with the same bottom-sheet pattern used elsewhere.

**6 · Make the Team Rankings sliders honest, or wire them.** _Measurement (mine):_ the sliders feed only
the weights table, the post-draft team score and one comparison sentence — the draft's `slotWins` comes from
the model's own tables, so **moving a slider changes no pick and no game**. _Critique:_ a control that
looks causal and is not is worse than no control, and the user will find out. _Idea:_ either wire them
(a model decision) or label them "display only" and move them out of the primary flow.

**7 · Give the season view one screen per decision, not one screen for everything.** _Critique:_ the season
surface is the busiest in the product — draft results, a 232-row standings table, the 100-season report —
and at 390 px a phone user has to scroll through all of it to reach the next action. _Idea:_ one column
per phase, sticky phase header, and the standings table behind a disclosure.

**8 · Measure touch targets systematically, and put the check in the gate.** _Idea:_ a permanent check that
counts interactive elements under 44 px per view, so the number is a trend rather than a surprise. _Critique:_
the current gate measures _overflow_, not _reachability_ — which is why this list is needed at all, and why
the same green run has been read as "the phone is fine" when it is not.

**9 · Add the vertical term to the gate's viewport test.** _Measurement:_ `tests/e2e-smoke.mjs` l.127 is
`r.left >= -1 && r.right <= vw + 1 && r.width > 0` — horizontal only — so a primary action 119 px below the
fold passes. _Critique:_ until this is fixed, **no green phone run is evidence of phone usability**, and the
council has already had to withdraw one closure on exactly this point. _Idea:_ one line, plus a
`fullyInside` field on the primary-action probe.

**10 · Fix the 100-season report on a phone, and check the read navigation.** _Measurement (Ultra's A8):_
the 100-season report's mobile UX is unmeasured; the report's own back control is now exercised by the
gate (`reportBack: { clicked: true }`) but only at desktop width. _Idea:_ check the report's own layout at
390 px, and make the back control ≥44 px.

## The obvious bugs (short list, each with what makes it a bug)

1. **The 390 px P0** — the first click of the season flow is 119 px below the fold (#7, three seats).
2. **The display-only sliders** — the UI implies a causal control that changes nothing.
3. **24 px navigation** — the primary navigation is a text line, on the device where that matters most.
4. **52 undersized targets on one view** — the rankings/weights view is unusable by touch.
5. **The hero's clipped 40 px** — a permanently false positive in the gate's counter, and a cut-off glow.
6. **The receipts are not valid JSON** — each `variance-run*.json` is a JSON object **plus** a trailing
   summary line, and the richest fields live only in that tail, so a JSON-only reader misses the Week 1
   observation entirely.
7. **The stored result record is hand-edited** — it is not the runner's output (three impossibilities in
   one file), so any summary built on it inherits three false statements.

## What is genuinely good, and should not be disturbed

Zero horizontal overflow and zero clipped/covered elements at 390 px across the views measured; the 390 px
stepper (`ol#stepper`, three 81 px items) fits; the light/dark capture pairs exist for three views; the
season view's data is all present at 390 px — the data is fine, the _reachability_ is not.
