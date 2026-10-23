# V21 Suggestions

> **Naming (Owner ruling, 22 Oct):** the build Claude is producing is **V22**. Any "V20"/"V21" naming in this document is **historical** and refers to the working file at the time it was written; it is not a name for the current build. Re-measure before citing anything here.

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: consolidate my comments for Claude | DATE: 2026-10-21T08:40:00Z**

**Naming, per the Owner's ruling:** the build `NFL Draft Simulator merged.html` (657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` @ `merge/v20-donor` `ff8c05ae`) is **V21**; the newest edition will be **V22**. (Earlier documents that say "not V21" are now wrong and should be read as "V21".)

**BOC holds the master document** at `_agents/boc/notes/V21-Suggestions.md`. This is **my lane's copy**: my comments and evidence on the Owner's three briefs. Where we differ, both are in the record — the merge is the Owner's or the Architect's call.

---

## Brief 1 — the ten-item directive (items 1–10)

**Prepared and published:** `council-brief/2026-10-21/moc/merge-items1-5.patch` (16 hunks, 52 changed lines) and `value-here-keepsort.patch` / `value-here-dropsort.patch` (item 1). Note: `_agents/moc/notes/merge-items1-5-preparation.md`.

**My comments, in order of weight.**
1. **The weight table needs no constant change — this is the largest finding.** The Owner's stated table was compared slot by slot against both weight sets in the build: it matches **`modelWeights()` in 34/34 slots** and the hand-written `DEFAULT_WEIGHTS` constant in only **7/34** (the depth slots, where both are 5 or 1). "These are the default weights you created" is therefore **true of the derived model weights** — which is what the site already ranks with — and false of the constant. Item 6 reduces to a **label** plus the two places where the older constant still leaked in (the start-up seed of the saved set, and the old "Back to my weights" fallback); both are removed in the patch, and `DEFAULT_WEIGHTS` itself can stay exactly as it is. MiniMax reached the same conclusion independently.
2. **The Owner's brief arrived truncated** — it ends at _"These are the default weights you created:"_, the table itself missing. I worked from BOC's transcription; **the Owner should confirm those numbers** before anything touches a protected constant.
3. **Items 5 and 7 contradict each other as written.** "Delete user weights; only use the model weights" and a "My Weights" button cannot both be true. My patch takes the middle road: the saved set lives in memory for the session only, and the button is the way to reach it. The Owner's exact words name one button with two labels ("Save My Weights", then "My Weights"), which does not say whether clicking it saves-and-goes-inert or saves-and-stays-reachable. **One line either way; it is his call.**
4. **Two bugs measurement caught that reading the diff would not.** A `JSON.stringify` comparison of the weights is **key-order sensitive**, so the button never returned to its inert state; and a variable declaration landed in the wrong function, producing four `ReferenceError`s. Both were found by driving the built page, both are fixed in the published patch.
5. **Item 3's wording is ambiguous** between the per-team chips (BOC's reading) and the three penalty sections (MiniMax's reading of the Owner's "Can't Run penalty" example). My patch implements the chips, in a strip under the two weight buttons, reading _"No team carries a penalty badge on these weights."_ when empty — because with the **default** weights **no team carries a badge at all**.

---

## Brief 2 — the Team Comparison page and the Guide page

**Prepared and published:** `council-brief/2026-10-21/moc/merge-team-guide.patch` (11 hunks, 65 changed lines). Note: `_agents/moc/notes/team-guide-brief-analysis.md`.

**My comments.**
6. **The Guide's spot-value table is the MODEL'S OUTPUT, not a written table.** The rows are built at l.4872–4905 from `slotWinsPerOvr()`, and `modelWeights()` is its inverse (AGENTS.md: "derived, not arbitrary"). So the Owner's weight deltas are a **model recalibration**, and a colleague's offer to "write these weights into the HTML's value layer" would replace the derivation with a hand-written table — after which the draft board's weights would stop being the inverse of the numbers the Guide prints. **That is the line to hold.**
7. **Colleague 3's "the table fails its own arithmetic" is a display rounding artefact.** Measured: for **all 26 spots** the 70→90 gain is **exactly 20 × the slope** (QB 2.541 vs 2.541, DT1 0.946 vs 0.946, MIKE 0.863 vs 0.863, OG/C 0.852 vs 0.852, SAM 0.074 vs 0.074 — the gap is 0.000 everywhere). The disagreements he found are the slope rounded to three decimals and the gain to two, while the underlying values differ in the fourth. **The model is consistent; the display needs the fix.**
8. **His "the aggregate is impossible" is right, and the reason is sharper than the arithmetic.** The per-spot gains sum to **22.95 wins**. Measured against an 80-rated opponent, the model gives an all-70 roster **12.1 points** and an all-90 roster **29.2** — a real gain of **0.53 wins**. A matchup is a **difference, not a sum**: the per-spot numbers are marginal contributions with the rest of the roster held fixed, and they do not add up across a roster. **That is the content the Owner's missing "Table of Incremental Gains with Diminishing Returns Note" should hold** (its heading arrived; its body did not).
9. **The re-cut Unit Comparison changes what the verdict counts.** The Owner's list drops the two totals and "Primary Coverage" and adds "Linebackers", so the sentence "wins N of 14 unit comparisons" now says **12**. The numbers on every surviving row are unchanged.
10. **One scope decision to confirm:** the Unit Comparison table is built by one shared function, so the **home page's copy changes too**. Only the effective-ratings _note_ was scoped to the Team Comparison page, as the Owner asked. If the home page must stay untouched, it is one flag.

---

## Brief 3 — the Guide: Value here, the CPU-pick sentence, "offensive tackle", the flex order, the merged section, the glossary

**Prepared and published:** `council-brief/2026-10-21/moc/merge-guide-v21.patch`. BOC endorsed it with two wording corrections, which are folded in.

**My comments.**
11. **"Reading the Draft Board" — already done.** Every mention of "Value here" is gone (the bullet deleted, the Priority bullet reworded to "the value at the spot he would fill on your roster…", the section title now "Reading the draft board (Wins, Priority, Gone, stars)"), and the column itself is out of the visual board while `r.v` stays in all nine of its mathematical consumers. The one that must **not** change: "a TFL is a tackle for loss" — there _tackle_ is the action, not the position.
12. **"Offensive Tackle" — the capital T.** The Owner's instruction reads "Always say 'offensive Tackle'"; the house style is sentence case, so the patch uses **"offensive tackle"** and Super has the wording. Five instances name the position (the row label, two cells, "a left tackle plays tackle", "playing tackle", "the tackle makes up"); BOC found the two I had missed and they are folded in.
13. **The flex table's new order is the draft board's own order** — Quarterback, running back, wide receiver, tight end, offensive tackle, guard/center, defensive tackle, edge rusher, linebacker, cornerback, safety — which BOC verified against the board's group definitions. Ultra is judging whether the quarterback row ("cannot play anywhere else") is the right **opening** row, since it is the exception rather than the rule.
14. **The merged section is now long** — prose, the tier list and a 26-row table in one collapsible section. The Owner's instruction is to combine them; Ultra and Super have the shape, and the Owner may want to reopen it once he sees it.
15. **The glossary is the real work in this brief.** The Owner asked for the football terms in the game previews and reviews to be cross-referenced with the Guide's glossary, and for the ones a once-a-year viewer would not know to be listed and explained. MiMo has the inventory of what the recaps actually say and which terms are missing; Super has the voice. **My caution: a glossary that covers the vocabulary the product uses in its own writing is worth more than an NFL dictionary** — the cut-off should be "a term the recaps use", not "a term football has".

---

## The open decisions, in one list

| #   | decision                                                                                                                                                                                                                                 | who                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1   | the **sort option** on the draft board — keep it with a reworded label, or drop it                                                                                                                                                       | Owner / Architect    |
| 2   | the **weight recalibration** (K 0.72→0.45, WR2 0.60→0.63, RB1 0.67→0.58, CB2 1.18→0.95, DE1 1.30→1.38; TE1 within 0.5 of WR1, TE2 within 0.5 of WR3; a run share for QB and the receivers) — a model change, with the re-validation cost | Owner                |
| 3   | the **"Table of Incremental Gains with Diminishing Returns Note"** — the heading arrived, the body did not                                                                                                                               | Owner / GLM          |
| 4   | the **brackets** in the Unit Comparison labels — drop the brackets and keep the contents, or use the Owner's short names                                                                                                                 | Owner / Super        |
| 5   | the **badges** — the per-team chips or the three penalty sections                                                                                                                                                                        | Owner                |
| 6   | the **NBA pool** — 539 (MOC) vs 538 (BOC, MiniMax); "Terrance" vs "Terance Mann"; **63 players still unmatched** against current rosters                                                                                                 | Owner                |
| 7   | the **glossary's shape and its cut-off**                                                                                                                                                                                                 | Owner / MiMo / Super |
| 8   | the **"V21 Suggestions" merge** — my copy and BOC's, merged by whom                                                                                                                                                                      | Owner / Architect    |

## What I did not check

I have not run the full E2E gate on any patched copy (only the relevant pages and the draft flow, with a seeded RNG), I have not checked the **390 px** layout of any of these changes, and I have not exercised the season, the playoffs or the 100-season report on a patched build.
