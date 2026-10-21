# merge.html — the Owner's ten-item directive: what I prepared, what I verified, what is still open

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: prepare the changes for Claude | DATE: 2026-10-21T06:00:00Z**

**Build under test:** `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` @ `merge/v20-donor` `ff8c05ae` — the V20 merge candidate, **not** V21. **The product file was not edited by me.** Everything below was built and measured on copies under the approved temp directory; the patch is published beside this note.

**A note on the brief itself.** The Owner's message arrived **truncated mid-sentence** — it ends at *"These are the default weights you created:"* with the table itself missing. The full ten-item list is in `_agents/boc/notes/merge-html-changes-spec.md` (M-356) and BOC has transcribed the Owner's weights. **Items 6 and 7 therefore need one word from the Owner before Claude can build them** (see §5).

## 1 · What I prepared: items 1–5, as a patch

**`council-brief/2026-10-21/moc/merge-items1-5.patch`** — `patch -p0` against the candidate; 22,316 B, 15 hunks, 50 changed lines. The patched build is 658,548 B, sha256 `52771e84db5b1892…`.

| item | what the patch does |
|---|---|
| **1** · "Value here" out of the visual board | the seven verified edits (see my earlier note `_agents/moc/notes/value-here-prototype-verification.md` and the two published patches). This patch uses the **variant B** — the sort is kept, its label reworded to "Sort: value at my spot" |
| **2** · the footer's "MORE" | `<span class="footlabel">More</span>` deleted from l.439; the `aria-label` stays (it is invisible and still describes the nav) |
| **3** · the badges move to the bottom | the badge chips are collected during the rankings row loop and rendered in a new `#badgeStrip` **under the two weight buttons**, each chip shown as "Team  Badge". The chips no longer sit in the 32 team rows |
| **4** · "Use model weights" → "Default" | the button at l.548 |
| **5** · "Back to my weights" → a stateful button | see §2 |

## 2 · Item 5 — the state machine, and the reading I had to choose

The Owner's words: *"Change 'Back to my weights' to 'Save My Weights'. This button should only be clickable after a change is made to the default weights. It should be kind of transparent (kind of like you've done with the e.g. 'Sim to End') until a default weight has been changed. After a default weight has been changed, it should appear blue like 'Default' and say 'My Weights'."*

**What the patch does** (`updateWeightButtons()`, next to the controls; a `weightsDirty` flag beside `personalWeights`):

| state | the button |
|---|---|
| on load, nothing changed | **transparent** (`.tabbtn`, opacity .5), reads **"Save My Weights"**, `disabled` |
| any weight edited | **blue** (`.resetbtn`), reads **"My Weights"**, clickable |
| click "My Weights" | saves the current weights as yours (`personalWeights`) and keeps them |
| click "Default" | back to the model weights, and your set is kept for the session |

**The reading I had to choose.** The Owner's instruction names one button and gives it two labels. The literal reading is "save", but the button it replaces was "Back to my weights" — a *restore*. I kept **both** alive with one rule: the button is live whenever the current weights are **not** the default weights, and clicking it saves your set if you have changed it, or restores it if you have not. The alternative (BOC's, in `_agents/boc/notes/merge-html-edits-2-5.md`) is that clicking "My Weights" saves and then the button goes inert again — simpler, but then a set saved before a "Default" reset can no longer be reached. **This is a one-line change either way and it is the Owner's call.**

**One trap worth naming.** The first version of my patch compared the weights with `JSON.stringify(weights) === JSON.stringify(modelWeights())`. That is **key-order sensitive**: the two objects hold the same values in a different order, so the comparison said "not the default" forever and the button never went back to its transparent state. The patch now compares **value-wise** (`sameWeights(a,b)`). The old build had the same weakness in the "Use model weights" handler, where it decided whether to keep your weights.

## 3 · The evidence (VERIFIED, on copies)

Seeded A/B: a seeded `Math.random` installed via `Page.addScriptToEvaluateOnNewDocument` before the page's scripts ran, the same clicks in both builds, seed 987654321.

| measurement | original | patched |
|---|---|---|
| the 32 team scores and their order | — | **identical** |
| the final draft result | — | **identical** |
| console errors | 0 | **0** |
| the footer's text | "MORE Simulator Madden Rankings …" | "Simulator Madden Rankings …" |
| the first button | "Use model weights" | **"Default"** |
| the second button, on load | "Back to my weights", blue, clickable | **"Save My Weights", transparent, `disabled`** |
| the second button, after editing a weight | — | **"My Weights", blue, clickable** |
| the second button, after "Default" | — | back to **"Save My Weights", transparent, `disabled`** |
| the weights reset | — | QB input returns to 700 and the team scores return to their original values |
| "Value here" on the board | 10 header cells, 1,148 cells | **9 header cells, 0 cells** |

Two bugs were caught by measuring and fixed before this patch: the key-order comparison above, and a `badgeRows` declaration that landed in the wrong function (it produced four `ReferenceError`s in the console — the first version was not shipped).

**One observation the Owner may want.** With the **default** weights **no team carries a penalty badge at all** — the chips only appear once someone moves the penalty thresholds. The strip therefore reads *"No team carries a penalty badge on these weights."* when empty. If the strip is meant to be a permanent fixture, that empty sentence is doing the work of an explanation, and BOC and I should agree which of the two we prefer.

## 4 · What is **not** in my patch, and who owns it

| item | status | owner |
|---|---|---|
| **6** · the Owner's weights table = the defaults | **not built** — protected constant, and the Owner's table arrived truncated | Pickle (comparing the table against the build's `modelWeights()` and `DEFAULT_WEIGHTS`), GLM (the approval text) |
| **7** · delete user weights | **not built** — it contradicts item 5 as written (item 5 needs a "My Weights" button; item 7 says forget user weights entirely) | MiMo (what is stored, where), GLM (how to state the question) |
| **8** · the Player Browser shows ~15 on desktop | **not built** | BOC (the exact edit), MiMo (display limit or data limit), Ultra (the phone) |
| **9** · the Position Rankings combinations | **not built** | VLOC (the full option list and the code) |
| **10** · Team Comparison: no description paragraph, Chiefs vs Raiders by default | **not built** | VLOC |

## 5 · What Claude needs from the Owner before items 6 and 7

1. **The weights table itself.** The Owner's message stopped at "These are the default weights you created:" — the table did not arrive. BOC has transcribed it (QB 700, RB1 185, RB2 60, WR1 305 … K 200, P 1, FB 1), but **that transcription should be confirmed against the Owner's original** before a protected constant is changed.
2. **Which constant the table refers to.** The build has two: `DEFAULT_WEIGHTS`, a hand-written constant (l.452: QB 320, RB1 100, WR2 40, OT1 295 …), and `modelWeights()`, which is **derived** from `slotWinsPerOvr()` on the 0–700 scale (QB = 700) — and AGENTS.md calls that scale "derived, not arbitrary". **The Owner's numbers look like the derived model weights, not the constant.** If that is right, then item 6 is not a constant change at all but a correction of a label, and "the default" is already what the site ranks with. Pickle is producing both comparison tables; this is the single most important open question in the set.
3. **How items 5 and 7 coexist.** "Delete user weights; only use the model weights" and a "My Weights" button cannot both be true. My patch takes the middle road — the saved set lives in memory for the session only, and the button is the way to reach it.

## 6 · What I did **not** check

- I did **not** run the full E2E gate on the patched copy — only the weights screen and the draft flow, with a seeded RNG. The season, the playoffs and the 100-season report are untouched by the diff but **not** exercised.
- I did **not** check the **390 px** layout of the patched weights screen or of the badge strip (the measurement above was at 1280 px); Ultra's lane.
- I did **not** verify the **badge strip's appearance when chips are present** — with the default weights no team carries a badge, so I only saw the empty state. The chips themselves are the build's own markup, moved.
- I did **not** re-check the **item-1 geometry** in this combined patch (the 390 px row-2 measurement was made on the item-1-only build and is unaffected by items 2–5).
- I did **not** touch the weights **explanation text** at l.547, which still says "the buttons switch between…" — Super's copy pass covers it, and item 6 may change what "the default" is.
