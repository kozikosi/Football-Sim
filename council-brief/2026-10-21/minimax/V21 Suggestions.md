# V21 Suggestions

**From:** MiniMax (seat S-1900–1999) · **Written:** 21 Oct 2026 · **For:** Kosi (Owner) and Claude (Architect)

**What this document is.** Every comment I made on Kosi's last three prompts, gathered into one place, with the receipts behind each claim. It is the readable companion to the three working notes, not a copy of them.

**Naming, as of this document:**
- **V21** = `NFL Draft Simulator merged.html` — the merge candidate, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B.
- **V22** = the next edition — `_agents/minimax/prototypes/V22-candidate-2026-10-21.html`, sha256 `e5fa7e0e891368099ef87f3b956f69a160a15a69c43711d6e00fefd09a8490fe`, 660,046 B. **V22 = V21 with Kosi's three briefs applied**, built by chaining three re-runnable builders and verified in a browser.

**Nothing in any product file was changed.** V21, `NFL Draft Simulator v20 Claude.html` (`31b7d61f…`, 649,032 B) and `NFL Draft Simulator.html` (`77bb9ed5…`, 650,127 B) are byte-identical to how I found them.

---

## 0. The V22 candidate in one table

| Area | Kosi's instruction | What V22 does | Verified |
|---|---|---|---|
| Draft board | "remove 'Value here' from being visual" | the column is gone (header, cell, sort label, guide bullet, tooltip, section title); `r.v` still computed and still feeds Priority | 0 occurrences of "value here" left in the page; Priority still populates (1,121 of 1,133 cells non-zero mid-draft) |
| Draft board layout | — | only `dc-pri` moves, 10/13 → 7/13 (the grid is 12 columns; `dc-gone` is on row 3 and does not move) | 390 px: 0 overlapping cells, 0 clipped, 0 px overflow |
| Tab footer | "Remove 'MORE'" | the label is gone, the six buttons stay | footer reads "Simulator · Madden Rankings · Player Browser · Position Rankings · Team Comparison · Guide" |
| Weights panel | "Use model weights" → "Default" | renamed; the action is unchanged | live: "Default" |
| Weights panel | "Back to my weights" → "Save My Weights", transparent until a weight changes, then blue "My Weights" | the button starts disabled and transparent, becomes blue "My Weights" on the first edit, saves the set, and reloads it after "Default" | live: disabled on load, blue after an edit, reloads QB 707 |
| Weights panel | "Move the badges under 'Back to my weights'" | the three penalty sections (Can't Run / Weak D / Can't Pass) now sit at the bottom of the panel | live: the panel's last child is the penalty box |
| Team Comparison | remove "real"; drop the effective-ratings note (that page only); parentheses out; Offense/Defense grouping; verdict out; Chiefs vs Raiders | all six done | live: subtitle, note gone, 14 rows in two groups with no parentheses, default pair Kansas City Chiefs / Las Vegas Raiders |
| Guide | box out; "Play the season" rewritten; "advanced stats" parenthetical out; no "70→90" wording; tier list in wins per +1 OVR; the 70→90 column dropped | all done | live: no "70→90" anywhere, tier line reads "Franchise-changing: Quarterback (+0.127 per +1 OVR)." |
| Guide (this prompt) | flex table in the board's order, QB first; never say "tackle" alone; the picks sentence trimmed; "Position values" folded into "Drafting & Position Values"; glossary cross-references | all five done | live: flex order = Quarterback · Running back · Wide receiver · Tight end · Offensive tackle · Guard / center · Edge rusher · Defensive tackle · Linebacker · Cornerback · Safety; **0 bare "tackle" left in the page**; sections = How the site works · Drafting & Position Values · Reading the draft board (Wins, Priority, Gone, stars) · Flexing players, explained · Coaching… · The math of every game-plan choice · Football and site terms |

**Gate on V22:** `post-merge-smoke.mjs` **exit 0, A–I PASS, 0 findings, 0 page errors**, receipt `88675335a98b`; `node --check` exit 0; 390 px board probe clean.

**How to rebuild it:** `node tools/build-owner-brief-variant.mjs <base> out1` → `node tools/build-owner-brief2-variant.mjs out1 out2` → `node tools/build-owner-brief3-variant.mjs out2 V22.html`. Every anchor is asserted, so a base that moves fails loudly instead of silently mis-patching.

---

## 1. My comments on the first of the three prompts (the weights, the "Value here" column, the buttons)

**1.1 The "Value here" column is a display removal, and the layout maths is one cell.** The mobile grid is `repeat(12,1fr)` — 12 columns, not the 13/16 in the circulated spec. `dc-gone` sits on **row 3**, Pos and Team are selected by `nth-child` and the deleted cell is the 6th child, so neither moves. **Only `dc-pri` moves: 10/13 → 7/13.** I gave Priority the freed three columns rather than the same width, because after the removal it is the only column that carries a decision.

**1.2 The maths is untouched, and I checked it as a fact.** `r.v` is still computed for every row and still feeds Priority, the priority bar, the flex tag, the group best, the replacement counts and the sort key. The Priority column still populates on the user's turn — 1,121 of 1,133 cells non-zero mid-draft.

**1.3 The sort dropdown is a decision, not an implementation detail.** BOC's set deletes the `Sort: value here` option; I kept it and relabelled it `Sort: slot value`, because the maths is unchanged and the Owner said it may still be used in the background. Nothing on screen now names a column that is gone.

**1.4 The "badges" instruction has two readings, and only one of them is "the bottom of the page".** The Owner's example, "Can't Run penalty", matches the three penalty **section headers** in the weights panel, and `#controls` (character 574) comes **before** `#resultsBody` (736) in the DOM — so moving the per-team **chips** out of the rankings table to a strip under the buttons would move them *up* the page. V22 implements the sections (moved to the bottom) and leaves the chips with their teams. If Kosi meant the chips, say so in words and it is a different edit.

**1.5 The rename deletes a latent bug.** In V21 the two buttons are not inverses: `personalWeights` is seeded with the *static* table (QB 320) while "Use model weights" loads the *derived* scale (QB 700). Measured: press "Use model weights", then "Back to my weights" → **QB = 320**, and the rankings' scores move under the user's feet. The new save/load button removes that path.

**1.6 "Save My Weights" is session-only, and that is a fact, not a bug.** There is **no `localStorage` anywhere in the build** (zero occurrences), so the saved set lives in one in-memory variable. "Forget user weights entirely" therefore has nothing to delete; and if the save is meant to survive a reload, that needs `localStorage`, which would contradict that instruction.

**1.7 The one deviation I made, on purpose.** The Owner's wording is "clickable only after a change is made to the default weights". Taken literally, pressing "Default" afterwards would strand the saved set (the weights are the defaults again, so the button goes transparent). V22 also enables the button when a saved set exists — same label, different tooltip ("Go back to the weights you saved"). One extra condition, easy to remove.

**1.8 The default-weights question, settled by measurement.** The Owner's list (QB 700, RB1 185, WR2 165, CB1 395, K 200, …) is **byte-identical to the live `modelWeights()` output — 34 of 34 values**. That is the council's derived scale (each spot's wins per +1 OVR, scaled so QB = 700, rounded to the nearest 5) — exactly what the panel's own explanation says. The static `DEFAULT_WEIGHTS` constant (QB 320, RB1 100, WR1 60, …, K 5) is a **fossil**: `modelWeights()` overwrites every modelled spot from the model, so the constant's only live influence is `P = 1` and `FB = 1`. **So the correction is about attribution and presentation, not the numbers** — and replacing the constant with the Owner's list changes nothing measurable (the model-weights output is identical, K stays 200).

---

## 2. My comments on the second of the three prompts (Team Comparison, Guide, the five adjustments, the colleagues)

**2.1 The Unit Comparison table: the Owner's list is a swap, not a reshuffle.** Fourteen rows before, fourteen after: **"Primary Coverage (CB1 + DL)" goes out and "Linebackers" comes in**, and the labels lose their parentheses. `computeDetailMetrics()` now takes an optional key list so the comparison can ask for a unit the rest of the app does not use; every other caller keeps the old list, so the team-detail panel and the rankings breakdown are untouched.

**2.2 The note is removed from one page only, and the build can prove it.** The sentence lives in a shared function used by three callers. V22 removes it from the Team Comparison page and keeps it in the Draft Simulator and the season view. Measured: absent on the Team Comparison page, still present once in the page source.

**2.3 The guide is one shared HTML string.** Removing the Guide box, rewriting the season line and changing the tier list change the Draft Simulator's guide panel too, because there is only one copy of the markup. One parameter per item if that must differ.

**2.4 The five weight adjustments, measured to the digit.** The build's curve is linear from 70 to 90 — `slotWinsPerOvr()` is *defined* as `(slotWins(90) − slotWins(70)) / 20` — so one per-slot factor lands exactly on the Owner's targets: **K ×0.6234 → 0.4500 · WR2 ×1.0490 → 0.6300 · RB1 ×0.8718 → 0.5800 · CB2 ×0.8068 → 0.9500 · DE1 ×1.0608 → 1.3800.**

**2.5 The Owner's TE condition is already met.** TE1 0.80 against WR1 1.10 is 0.30 apart; TE2 0.14 against WR3 0.38 is 0.24 apart. Both inside 0.5, before and after the adjustments. No change is needed to satisfy it as written.

**2.6 "QBs rush and receivers block" is a model fact, not a display choice.** `RATING_SPECS` has no quarterback and no receiver in any run-side unit (`olRun = {OT1, OT2, OG1, OG2, C, TE1}`, `rb = {RB1, RB2}`, and the team's run rating is `runOff = 0.35·rb + 0.65·olRun`), and the team's run rating never reads the QB's number. That is *why* the guide measures 100/0 for the QB and the receivers. Measured candidate (in memory, in the running build): `WR1:0.3, WR2:0.2, WR3:0.1` into `olRun`, `QB:0.5` into `rb` → **QB 100/0 → 96/4, WR1 95/5 (+5.7% value), WR2 95/5 (+9.9%), WR3 96/4 (+6.5%), RB1 −13%, OL −2%, OG/C −3%.** It edits a protected constant, so it changes the **games**, not only the draft.

**2.7 The circularity to settle before anyone writes a constant.** The 0–700 defaults are *derived from* the same wins table the five adjustments move. Measured effect: **RB1 185 → 160, WR2 165 → 175, DE1 360 → 380, CB2 325 → 260, K 200 → 125** (QB stays 700). If Claude writes the Owner's list into `DEFAULT_WEIGHTS` *and* applies the five adjustments, the constant and the "Default" button disagree on load. **Recommendation: keep the constant as the fallback only and let the derived table be the truth.**

**2.8 What the five adjustments change, exactly:** the draft (the CPU's player values, the board's value and priority columns, the flex comparisons, the optimal-lineup search, the "Wins" column), the guide's tables, and five numbers in the 0–700 defaults. **Not the games** — the season runs on `RATING_SPECS` through `teamRatings()`/`matchupModel()`, and the wins table is derived *from* that model rather than fed into it. If the intent is "make the simulation's football more like the real thing", the change belongs in `RATING_SPECS`, not in a factor table.

**2.9 Corrections to the four colleague reviews, so the Architect is not misled.**
- *"The table fails its own arithmetic"* — it does not; the **printed rounding** does. `up = 20 × wpo` holds for every one of the 24 spots by construction, and the measurement confirms it to four decimals (DT1 .047287, CB3 .047005, MIKE .043153, OG/C .042618, RB1 .033266, SAM .003703). Three-decimal displays of *different* slopes look like disagreements. **Fix: print the slope to four decimals, or drop the 70→90 column — which the Owner asked for anyway.**
- *"The aggregate is impossible"* — a category error: every number is a **marginal** (that spot alone, all others held at 80). Summing marginals assumes independence the model does not have; the sum was never a team total.
- *"One OVR point is not a common currency"* — the model already handles the flat part: the 70→90 column is the integral over the swept curve (OVR 50→100 in steps of 1) and the per-+1 column the local slope near a typical starter.
- *"WR2 is severely undervalued; safeties are overvalued"* — a real question, but **NFL salaries measure market value, not wins per point of OVR**. They are a directional sanity check, not a calibration source — and the Owner's five adjustments already make the two explicit calls the reviews argue for (WR2 up, CB2 down, K down).
- *"QB is not sufficiently separated"* — legitimate, and it is a **fourth protected-constant decision**. It should be sized by testing `passOff`'s QB share over a 100-season run, not by editing a table.

**2.10 More advanced stats: the sim already computes most of what was asked for.** The player's stat object already carries `tfl`, `pd`, `hur`, `blk`, `dint`, `dtd`, `saf`, `ff`, `sa`, `opOL`, `att/cmp/tgt/rec`, the return yards and the personnel group — and the Season Review displays almost none of it. So nine of the twelve proposals cost **no new modelling**: pressure rate, sack rate allowed, turnover creation split by type, takeaway rate per drive, defensive plays that matter, average starting field position, red-zone touchdown rate, points per drive, fourth-down decisions, plus the player-level pressure split, the protection report and receiving efficiency. Five draft-side analytics need no new maths either: wins added per pick, need-versus-best-player-available, the board's value curve by round, running and sleeping, roster value by unit. **My recommendation: do not build EPA** — the model is structural (nine unit ratings), not play-level, so points per drive, success rate by personnel group and field-position-weighted turnover margin are the honest substitutes. Full list: `_agents/minimax/notes/advanced-stats-proposals.md`.

---

## 3. My comments on this prompt (the guide, the flex table, the dropdown, the glossary)

**3.1 "Remove any mention of 'Value Here'" — V22 has none.** Zero occurrences of the phrase remain anywhere in the page, not only in the guide: the column, its header, its sort label, the guide bullet, the Priority bullet and the section title are all gone. The maths behind it is untouched.

**3.2 The flex table is now in the board's order, quarterback first.** Quarterback · Running back · Wide receiver · Tight end · Offensive tackle · Guard/center · Edge rusher · Defensive tackle · Linebacker · Cornerback · Safety. That is the draft board's own group order (Quarterback & Skill Positions → Offensive Line → Defensive Line → Linebackers → Secondary → Specialists), so the guide and the board now speak the same order.

**3.3 "Never say 'tackle' alone" — audited, not eyeballed.** V22 has **zero** bare "tackle" left in the page (measured with a lookbehind that excludes "offensive tackle" and "defensive tackle"). The flex table's row label, the two flex-table cells, and the three sentences that referred to "the tackle" are all "offensive tackle" now.

**3.4 The computer-picks sentence.** "Each CPU team takes the player who adds the most wins over a replacement-level starter, with a little personal taste for certain positions and some randomness. They can also flex a player." The clause "(never below a 76 rating) at a spot it still needs" is gone; the rest is untouched, as Kosi asked.

**3.5 "Position values" folded into "Drafting & Position Values".** The guide now has seven sections: How the site works · **Drafting & Position Values** · Reading the draft board (Wins, Priority, Gone, stars) · Flexing players, explained · Coaching: personnel, styles and game plans · The math of every game-plan choice · Football and site terms. The separate "Position values: all 26 starting spots" section is gone and its table now sits inside the drafting section, where the tier list already explains the same numbers.

**3.6 The glossary: thirteen terms the previews and recaps use, each cross-referenced.** I scanned every user-facing string in the build (the previews, the recaps, the play-by-play, the box scores, the draft board) and compared it with the eleven terms the glossary already had. The ones that a casual fan — or a basketball fan who watches one football game a year — would not know:

| New term | Why it is there | Where it appears |
|---|---|---|
| Turnover | a change of possession the team did not choose | recaps, box scores |
| Personnel (11 / 12 / 13 / 21 / 22) | how many players of each group are on the field | previews, coaching section |
| Extra point / 2-Pt Conv | the choice after a touchdown | recaps, season review |
| Safety (the position) / safety (the score) | the same word means two different things | recaps |
| Field position | where the offense starts each drive | recaps, returner note |
| Pancakes | a block that knocks a defender down | box score |
| Yds behind | yards given up before the runner crossed the line | box score |
| Press. alwd | pressures allowed | box score |
| Hurry-up | snapping the ball fast | recaps |
| Shootout | a high-scoring, close game | recaps |
| The edge | a small advantage | previews, recaps |
| Chip numbers | starters already drafted at a position (0/2 = both open) | draft board |
| — (already present) | TFL, pressure, sack, secondary, backfield, nickel, replacement level, personnel codes | — |

**3.7 Two terms the sim already avoids, and should keep avoiding.** There is no "cover 2", no "MOFO", no "blitz", no "shotgun" or "play-action" in the prose, and no "red zone" either — the sim says "inside the 35", which is clearer. The glossary does not need them, and the guide's plain-language style is worth protecting as the multi-sport programme moves to basketball.

**3.8 One thing I could not settle for Kosi: the "POSITION VALUES dropdown" is a `<details>` section, not a dropdown**, and the "table" it duplicated is the tier list, which V22 already turned into a per-spot list of wins per +1 OVR. So the merge is unambiguous — one section, renamed, with the values table inside it.

---

## 4. The open decisions, in one list

For the **Owner**:
1. **Item 3's reading** — the penalty *sections* (as built) or the per-team *chips*?
2. **The sort option** — kept and relabelled "Sort: slot value" (as built), or deleted?
3. **The run-game model change** — give the QB a run share and the receivers a blocking share (§2.6)? It changes the games, so it is a protected-constant decision.
4. **The default-weights circularity** (§2.7) — keep the constant as the fallback only, or freeze it as historical and let the derived table be the truth?
5. **Persistence** — should "Save My Weights" survive a reload? It needs `localStorage`, which the build has never had, and it pulls against "forget user weights entirely".
6. **The guide is shared markup** — do the Draft Simulator's guide panel keep the box, the season line and the tier list as they are in V22?
7. **The five adjustments** — approve the calibration table as specified in §2.4, and who owns the 100-season regression before it ships?

For **Claude**:
8. The implementation shape for the adjustments: one new constant (`SLOT_VALUE_ADJ`) applied where the slot wins curve is produced, with the guide's wording changed from "measured on the matchup model itself" to "measured, then calibrated", and the slope printed to four decimals.
9. Whether the "QB separation" question (a fourth protected change) is in scope for V22 or a later edition.
10. Whether the seventeen advanced-stat proposals are worth doing as display-only work (nine of them) before any new modelling.

---

## 5. The instruments (all dependency-free, plain Node over CDP, no install)

| Tool | What it does |
|---|---|
| `tools/post-merge-smoke.mjs` | the council gate: end-to-end draft → season → playoffs, console errors, 390 px overflow, the primary action |
| `tools/board-mobile-probe.mjs` | the 390 px board layout: overlapping cells, clipped cells, horizontal overflow, per-row cell coordinates |
| `tools/board-columns-probe.mjs` | which columns the board renders and whether they are populated |
| `tools/owner-brief-probe.mjs` | the first brief: the buttons' state machine, the panel order, the footer, the sort label, the guide text |
| `tools/owner-brief2-probe.mjs` | the second brief: the Team Comparison page and the guide |
| `tools/v22-probe.mjs` | everything at once, on V22 |
| `tools/build-owner-brief-variant.mjs` · `…2-…` · `…3-…` | the three builders, chained into V22 |

**Full working notes:** `notes/value-here-column-removal-verification.md` · `notes/owner-brief-merge-changes.md` · `notes/owner-brief2-merge-changes.md` · `notes/position-value-adjustments.md` · `notes/advanced-stats-proposals.md` — all under `_agents/minimax/`.
