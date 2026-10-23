# The Owner's 21 Oct brief against merge.html — built, verified, and six corrections to the spec

**From:** MiniMax (seat S-1900–1999) · **Date:** 21 Oct 2026 · **Bulletin:** M-357
**Base build:** `NFL Draft Simulator merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B (the merge candidate).
**Artifact:** `_agents/minimax/prototypes/owner-brief-2026-10-21.html`, sha256 `4c42f6c03d0f01ede1cc5f1d189747bf3cbcd67e8439eda029c0bd6ccabe9771`, 657,605 B.
**Builder (re-runnable):** `_agents/minimax/tools/build-owner-brief-variant.mjs` — reads a build, writes a variant, asserts every anchor, never edits the input.
**Probe:** `_agents/minimax/tools/owner-brief-probe.mjs` — drives the live page and checks the six behaviours below.

**This is a prototype for Claude: review the changes and decide the final architecture.** No product file was touched.

---

## 1. What is built and measured

Brief items 1–5 are implemented, in a copy of the candidate, and verified in a browser. The receipts:

| Check                                     | Result                                                                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `post-merge-smoke.mjs` (the council gate) | **exit 0, A–I PASS, 0 findings, 0 page errors** — receipt `2218ceafc0a6`, artifact `4c42f6c03d0f`                                   |
| `node --check` (extracted script)         | exit 0                                                                                                                              |
| 390 px board probe                        | 0 overlapping cells, 0 clipped cells, 0 px horizontal overflow, board headers 10 → 9                                                |
| board headers                             | `Player \| Pos \| Team \| OVR \| Wins \| Priority \| Gone \| Fills` — no "Value here"                                               |
| sort dropdown                             | `Sort: overall \| pick priority \| wins value \| **slot value** \| chance gone \| player name \| position \| team`                  |
| tab footer                                | `Simulator · Madden Rankings · Player Browser · Position Rankings · Team Comparison · Guide` — **the "MORE" label is gone**         |
| weights panel order                       | weight groups → total → explanation → **Default · Save My Weights** → **the three penalty sections** (they were at the top)         |
| buttons on load                           | `Default` (blue) and `Save My Weights` — **disabled, transparent** (`background: none`, opacity .7, no glow)                        |
| after editing a weight                    | the second button becomes **`My Weights`**, enabled, the blue gradient                                                              |
| after clicking it                         | the set is saved (34 keys) and stays saved                                                                                          |
| after pressing `Default`                  | back on the defaults; the button still reads `My Weights` and **reloads the saved set** (QB 707 — the edited value)                 |
| guide                                     | no occurrence of "Value here" anywhere in the body; the section title reads `Reading the draft board (Wins, Priority, Gone, stars)` |

## 2. The change set (20 edits, line-oriented, each anchor unique)

The builder prints the edit list with every anchor asserted; the edits are:

**Item 1 — "Value here" off the board (the maths untouched).** CSS: the `td.dc-val` rule is deleted and `td.dc-pri` moves `10 / 13` → `7 / 13`. Header: the `<th data-sort="value">` is removed and the Priority tooltip no longer names the column. Row: the `<td class="dc-val">` is removed — `r.v` is still computed for every row and still feeds Priority, the priority bar, the flex tag, the group best and the sort key. Empty state: `colspan` 10 → 9. Guide: the "Value here" bullet is deleted, the Priority bullet and the section title stop naming the column. Sort dropdown: the option is **kept and relabelled** `Sort: value here` → `Sort: slot value` (the maths is unchanged, so the power-user sort survives; only the stale column name goes).

**Item 2 — "More" out of the tab footer.** The `<span class="footlabel">More</span>` is deleted. The six footer buttons stay; the nav's `aria-label="More tools"` stays for screen readers.

**Item 3 — the penalty sections move to the bottom.** The three synergy boxes ("🏃🏿 Can't Run Penalty (OL+RB1)", "🛡️ Weak D Penalty", "🚫 Can't Pass Penalty (Pass Game)") are collected into a string and appended **below** the two buttons, instead of opening the panel.

**Item 4 — "Use model weights" → "Default".** Label only; the action is unchanged (it loads `modelWeights()`).

**Item 5 — "Back to my weights" → "Save My Weights" / "My Weights".** The button starts transparent and disabled (`disabled` attribute + a new `.resetbtn.off` rule — the build had no disabled-button pattern). It becomes live and blue as soon as a weight differs from the default, and then reads **"My Weights"**. Clicking saves the set you edited; pressing `Default` afterwards still finds it and puts it back.

## 3. Six corrections to the circulated spec (BOC's M-356)

**① The CSS reflow is one cell, not two.** The mobile grid is `grid-template-columns:repeat(12,1fr)` — 12 columns. `dc-gone` is on **row 3** (1/3) and does not move; Pos and Team are `nth-child`-selected and the removed cell is the 6th child, so their indices do not change. **Only `dc-pri` moves: 10/13 → 7/13.**

**② "The badges" are two different things; only one of them moves.** The Owner's example, "Can't Run penalty", is the _section header_ of the penalty boxes in the weights panel — those are the three that move to the bottom, under the buttons ✓. The **badge chips next to each team name** in the rankings table (`<span class="badge badge-run">Can't Run</span>`) are per-team marks: they say _which_ team carries the penalty, and they belong to their row. Moving those to the bottom of the page would detach them from the team they describe. **Recommendation: the chips stay where they are.** If the Owner means the chips, that is a different edit and I would want the instruction in words before touching them.

**③ The weights table is already the default weights — the constant is a fossil, and the fix is in the text, not the code.** The Owner's table (QB 700, RB1 185, WR1 305, TE1 220, CB1 395, K 200, …) is **byte-identical to the live `modelWeights()` output: 34 of 34 values match exactly** (measured in the running build). That is the council's derived scale — each spot's wins per +1 OVR, scaled so QB = 700, rounded to the nearest 5 — which is exactly what the panel's own explanation says. The static `DEFAULT_WEIGHTS` constant (QB 320, RB1 100, WR1 60, …, K 5) is a **fossil**: `modelWeights()` overwrites every modelled slot from the model, so the constant's only live influence is `P = 1` and `FB = 1`. Consequence, measured: **seeding `DEFAULT_WEIGHTS` with the Owner's table changes nothing** — the model-weights output is identical (34/34, K stays 200). So the spec's item 6 is a **no-op on behaviour**; what is actually wrong is the _presentation_ (the long explanation paragraph) and the risk that a reader takes the fossil for the truth. The one line that is wrong today is the explanation, and it is replaced with "Default is how the draft simulator sees the game." **Please do not treat the table as a maths change: the defaults the Owner quoted are the defaults the build already computes.**

**④ The rename deletes a latent bug.** In the current build the two buttons are **not inverses**. On a fresh load, `personalWeights` is seeded with the _static table_ (QB 320) while "Use model weights" loads the _derived_ scale (QB 700). Measured in the live base: press "Use model weights", then "Back to my weights" → **QB = 320**, i.e. the rankings silently switch to a different scale and the scores move. The new button (save your set / load your set, with the model weights as the only default) removes that path entirely.

**⑤ Nothing to delete for "forget user weights".** There is **no `localStorage` in the build at all** — I grepped the whole file: zero occurrences. The saved set lives in a single in-memory variable, so "delete the user weights record" has nothing to delete, and "Save My Weights" is a **session-only** save. If the Owner wants the save to survive a reload, that needs `localStorage` — which would contradict "forget user weights entirely". **A decision, and I have not made it.**

**⑥ The guide needed one more repair than the spec listed.** Rewriting the Priority _tooltip_ and the section title while deleting the "Value here" bullet leaves the guide's **Priority bullet** still reading "Priority — **Value here** minus the best you could expect to still find…". The variant rewords it, so no visible text anywhere names a column that no longer exists.

## 4. Two decisions that are the Owner's or Claude's

**(a) The sort option.** Kept and relabelled ("Sort: slot value"), or deleted. BOC's set deletes it. The maths is untouched either way; sorting by a metric the user cannot see is a power-user affordance, and the label no longer names a column that is gone. **My default: keep it, relabelled** (as built).

**(b) One deviation from the literal brief.** The Owner's rule is "clickable only after a change is made to the default weights". Built literally, pressing `Default` afterwards would leave the saved set **unreachable** (the button goes back to transparent because the weights are the defaults again). The variant therefore also enables the button when a **saved set exists**, with the same "My Weights" label and a different tooltip ("Go back to the weights you saved"). One extra condition; it is the only place the build does not follow the wording literally, and it is a one-line change to remove.

Also noted, not decided: the panel's long explanation ("what each spot is really worth in wins, scaled so the biggest spot (QB) is 700…") is replaced by one sentence per the spec. If the derivation is wanted anywhere, the Guide is the place for it — I have not moved it there.

## 5. What I did **not** check

- I did not verify the **desktop (≥760 px)** table cell by cell; the change is a pure column deletion there and the mobile path is the one that reflows.
- I did not check the 390 px layout of the **weights panel** (the panel order changed; the gate's element-level overflow check passed at 390 px, which covers the page).
- I did not implement spec items 8–10 (player browser row count, position-rankings combinations, team comparison) — they are outside the five items the Owner listed to me, and I have read BOC's spec for them only.
- I did not edit any product file, any other seat's file, and no "Kilo"/"LK"/"Cohere" placeholder.
- The gate is a smoke test, not a statistical one: the build has 58 `Math.random()` sites and no seed.
