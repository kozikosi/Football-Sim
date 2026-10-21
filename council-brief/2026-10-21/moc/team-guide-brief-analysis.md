# The Team Comparison + Guide brief: what is display, what is model — and the numbers behind the weight request

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: analyse the Owner's brief and prepare the changes for Claude | DATE: 2026-10-21T07:40:00Z**

**Build:** `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` @ `merge/v20-donor` `ff8c05ae` — the V20 merge candidate, **not** V21. **The product file was not edited.** The patch is published beside this note.

## 1 · The one thing to know before anything else

**The Guide's spot-value table is not written by hand — it is the model's own output.** The rows are built at l.4872–4905 from `slotWinsTable()` / `slotWinsPerOvr()` (l.1326, l.1341, l.1346); the pass/run split is computed from the model's own points (`runPts`, `passPts`, l.4893); and `modelWeights()` is the inverse of `slotWinsPerOvr()` on the QB = 700 scale, which AGENTS.md calls "derived, not arbitrary".

So when the Owner asks for **K 0.72 → 0.45, WR2 0.60 → 0.63, RB1 0.67 → 0.58, CB2 1.18 → 0.95, DE1 1.30 → 1.38**, he is not asking for a display change. He is asking for the **model to be recalibrated**, and the numbers he quotes are the model's *current* outputs. A colleague's offer to "write these weights into the HTML file's value layer" would replace the derivation with a hand-written table — and then the weights the draft board uses would no longer be the inverse of the per-slot wins the Guide prints. **That is the line to hold.** (Pickle is mapping which coefficients would move the outputs toward the Owner's targets, and what has to be re-validated: the draft board, the 100-season report, and the real-2025 check r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6.)

## 2 · The colleagues' critique, measured against the build

I checked colleague 3's findings against the build's live output rather than against the pasted table.

**(a) "The table fails its own arithmetic" — a rounding artefact, not a model inconsistency.** For **every one of the 26 spots**, the 70→90 gain is *exactly* 20 × the per-+1 slope: QB 2.541 vs 2.541, CB1 1.443 vs 1.443, DT1 0.946 vs 0.946, MIKE 0.863 vs 0.863, OG/C 0.852 vs 0.852, SAM 0.074 vs 0.074. The gap is 0.000 everywhere. The disagreements colleague 3 found (DT1 .047 → 0.95 vs CB3 .047 → 0.94; MIKE .043 → 0.86 vs OG .043 → 0.85) are the **display** rounding the slope to three decimals and the gain to two, while the underlying values differ in the fourth decimal (0.0473 vs 0.0470; 0.0432 vs 0.0426). **The fix is in the display: show more digits, or derive one column from the other.** The model is consistent.

**(b) "The aggregate is impossible" — correct, and the reason is more interesting than the arithmetic.** The sum of the per-spot 70→90 gains is **22.95 wins**, which cannot be a real season. I measured what the model actually does when a whole roster is upgraded, each roster measured against an 80-rated opponent:

| roster | matchup points | wins (32.5 points per win) |
|---|---|---|
| all 70 OVR | 12.1 | 0.37 |
| all 80 OVR (the baseline) | 21.3 | 0.66 |
| all 90 OVR | 29.2 | 0.90 |
| **gain from 70 to 90** | **+17.1 points** | **+0.53 wins** |

**The linear claim is 22.95 wins; the model delivers 0.53.** The reason is that a matchup is a *difference*, not a sum: the per-slot numbers are **marginal contributions measured with the rest of the roster held fixed**, and a 90-rated offensive line and a 90-rated pass rusher overlap — protection and pressure partly cancel, and the whole band between "league average" and "elite" is worth about half a game. **That is the content of the Owner's missing note.** ("Table of Incremental Gains with Diminishing Returns Note" — the heading and an empty list arrived; the body did not.) The honest sentence for the Guide is: *the per-spot numbers are what one spot is worth on its own; they do not add up across a roster, because the value of a better player depends on the players around him.*

**(c) The pass/run splits.** The model computes them; QB 100/0 and the receivers 100/0 are what the model says. Giving QB and the receivers a run share is therefore again a **model** change (the composition that produces `passPts`/`runPts`), not a label change — and the Owner asked for exactly that ("QBs rush and Receiver block").

**(d) What the colleagues agree on, and what it costs.** Colleagues 1, 2 and 4 all want the same direction: receivers up, safeties and CB3 down, QB separated, the kicker down. Their revised tables are **opinion**, not measurement, and each says so. The Owner's own deltas are the ones to honour; the colleagues' are the reasoning to show him.

## 3 · What I built and verified: items TC-1…TC-3 and G-1…G-5

**`council-brief/2026-10-21/moc/merge-team-guide.patch`** — `patch -p0` against the candidate.

| change | how |
|---|---|
| TC-1 | "Put any two real rosters side by side." → "Put any two rosters side by side." (the two other "real rosters" strings in the file are on the Position Rankings page and in the Guide's model-check note, and are **not** touched) |
| TC-2 | the "Ratings shown are effective ratings…" line is now behind a flag: `renderLineupTableHTML(a, b, showNote)`. The **Team Comparison tab** passes `false`; the home page and the Draft Simulator keep the line, as the Owner asked |
| TC-3 | a new `COMPARE_ROWS` list (12 rows) drives the Unit Comparison table: an **"Offense"** subtitle row, then Quarterback, Offensive Line, Running Backs, Wide Receivers, Tight Ends, Run Game, Pass Game; an **"Defense"** subtitle row, then Defensive Line, Linebackers, Secondary, Run Defense, Pass Defense. **No parentheses.** The `LB` group already existed (`Linebackers (MIKE+WILL+SAM)`), so "Linebackers" is a real measurement — `computeDetailMetrics` now takes its own key list so the Rankings detail panel is unaffected |
| G-1 | the Guide box (the "Guide" heading and "Short reference sections for the terms the sim uses. Click through only what you need.") is gone; the Guide opens on its sections |
| G-2 | "Seventeen games, a 14-team playoff, then the Super Bowl." → "A seventeen-game regular season, the Playoffs, then the Super Bowl." |
| G-3 | "advanced stats (what caused sacks and big runs)" → "advanced stats" |
| G-4 | the tier list loses the "(2.5 wins from a 70→90 upgrade)" figures — the tiers and their order stay |
| G-5 | the spot-value table loses the "Wins from a 70→90 upgrade" column and is now ordered by **wins per +1 OVR**; the remaining column is headed "Wins per +1 OVR" |

**Verified on copies** (seeded A/B, a seeded `Math.random` installed before the page's scripts ran, seed 135792468, the same clicks in both builds):

| measurement | original | patched |
|---|---|---|
| the Unit Comparison rows | 14 rows, parentheses, no subtitles | **12 rows + 2 subtitle rows, no parentheses**, in the Owner's order, **with the same numbers on every surviving row** (Quarterback 99.0/95.0, Offensive Line 81.0/78.4, Running Backs 84.0/85.5, Wide Receivers 80.7/79.3, Tight Ends 79.0/80.0, Run Game 81.9/80.4, Pass Game 82.9/81.6, Defensive Line 81.3/85.0, Secondary 77.3/82.8, Run Defense 80.2/86.1, Pass Defense 78.8/83.4) |
| "Put any two real rosters" | present | **gone** |
| the Guide box | present | **gone** |
| "70→90" anywhere in the Guide | present | **0 occurrences** |
| the tier list | with the win figures | **without them** |
| the spot-value table columns | Starting spot · Wins from a 70→90 upgrade · Wins per +1 rating · … | **Starting spot · Wins per +1 OVR · …** (26 rows kept) |
| the 32 team scores and their order | — | **identical** |
| the final draft result | — | **identical** |
| console errors | 0 | **0** |

`node --check` on the extracted script: **exit 0**.

**Three consequences the Owner should know.** (i) The **"wins N of 14 unit comparisons"** phrase in the verdict now says **12**, because two rows (the Offense and Defense totals, and "Primary Coverage") are no longer compared — those rows are dropped by the Owner's own list. (ii) The Unit Comparison table is built by one shared function, so the **home page's copy changes too**; only the effective-ratings *note* was scoped to the Team Comparison page, as the Owner asked. If he wants the home page untouched, it is one flag. (iii) "Linebackers" is a **new** comparison row — it did not exist before, so the Unit Comparison now includes one row that was never on that table.

## 4 · What is still open

1. **The weight deltas** — a model recalibration, not a display change (§1). Pickle maps the coefficients; the Owner must approve the risk that the draft, the season and the 100-season report all move with them.
2. **"Table of Incremental Gains with Diminishing Returns Note"** — the Owner's paste carried the heading and an empty list, no body. §2(b) is the measured content it should hold, and GLM is drafting it.
3. **The brackets.** The Owner said "remove all parentheses". I read that as removing the brackets and keeping the contents ("Offensive Line OT+OG+C"), but "Wide Receivers WR1-3" and "Secondary CB+S" read badly without them — Super has the wording, and the cleanest version may be the Owner's own short names (Quarterback, Offensive Line, …) with the contents dropped entirely.
4. **The "advanced stats" commission** — MiMo is inventorying what the sim already computes and what the draft never shows, then proposing what to add.
5. **Item 3 of the earlier brief** (the badges) is still ambiguous between the per-team chips and the three penalty sections.

## 5 · What I did **not** check

- I did **not** run the full E2E gate on the patched copy — only the two pages and the draft flow, with a seeded RNG.
- I did **not** measure the **390 px** layout of the new Unit Comparison table or of the Guide without its box (Ultra's lane).
- I did **not** verify the Team Comparison **tab** in the DOM: its markup is injected only after a draft exists, and my script could not drive it; I tested the **shared builder** directly instead (which is where all the change is). The tab's own copy of the Starter-by-Starter table is the one that loses the effective-ratings note — verified in code, not on screen.
- I did **not** check the Guide's spot-value table **row by row** after the column removal (the header and the row count are verified; the cells were empty in the read because the Guide's sections are collapsed).
- I did **not** recalibrate anything. §1 and §2 are the analysis; the change is Pickle's and the Owner's.
