# Beam — real build strings for the items whose quoted text does not match the build

**Status:** advisory correction. Read-only; no product edits. For the Architect (Claude) and whoever implements the copy pass.
**Build:** `NFL Draft Simulator merged.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` · 6,554 lines.
**Method:** `node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md "NFL Draft Simulator merged.html"` → 141 line references, highest 6,146, all in range. Three quoted strings are **near misses** — the wording in the work order is not the wording in the build. Below is the actual text, so the copy pass does not have to hunt for it.

---

## Why this matters

The work order quotes "before" strings for the copy pass. Three of them are the Owner's own description of what he saw on screen, not verbatim build text. An implementer who greps for them finds nothing and has to re-derive the location. These are the real strings.

---

## 1 · "Your strongest units" — the string is one sentence, not a heading

**Work order says:** "Your Strongest Units" (l.1029) → indent, and present strongest/weakest side by side.

**Real text — `NFL Draft Simulator merged.html` line 4791:**
```js
let t = `<p class="narr" style="margin:6px 0;"><b>Why ${aStyle(offStyleName(id.off))}?</b> The model tried all 15 offensive setups for your roster against a league-average opponent and keeps the one with the best win chance. Your strongest units are ${shortUnit(best[0])} (#${rk[best[0]]}) and ${shortUnit(best[1])} (#${rk[best[1]]}); the weakest is ${shortUnit(worst)} (#${rk[worst]}). The top three: ${joinList(top3)}.`;
```

**What the Owner asked for, mapped to this line:**
| Ask | Where it lands |
|-----|----------------|
| "change to 'the model tries'" | `The model tried all 15 offensive setups` → `The model tries all 15 offensive setups` |
| "create indentation for strongest / weakest" | `Your strongest units are … ; the weakest is …` → split into two elements with their own indent |
| "maybe side by side" | the two halves become two columns |
| "top 3 in 3 distinct areas, not one sentence" | `The top three: ${joinList(top3)}` → three cards |
| "the label stays the same all season" appears twice | one copy in this line, one elsewhere — remove the duplicate |

**Also here (same function, adjacent):** the `Why <style>?` lead-in is the "Selected: Balanced offense…" line the Owner called ugly (work order §4.6). It is the `<b>Why …?</b>` prefix on this same line 4791, plus the "Selected:" display in the preseason menu. Both are on this line and its siblings.

---

## 2 · "More Advanced Stats" → "Advanced Stats"

**Work order says:** rename "More Advanced Stats" (l.1111) to "Advanced Stats"; and the advanced-stats explainer should be highly condensed, visible only from the Coverage Sacks or Offensive Line entry.

**Real text — line 4313:**
```js
return `<details class="panel" style="margin-bottom:14px;" open><summary style="cursor:pointer;font-weight:700;">More advanced stats: how your team scored and protected the ball</summary>
```

**Two changes, one line:**
- `More advanced stats: how your team scored and protected the ball` → `Advanced Stats`
- The summary text is the only visible label; the `open` attribute is why it shows by default.

**Also line 5035** (the Guide bullet) still says `advanced stats (what caused sacks and big runs)` — the Owner's instruction to remove the parenthetical lands here:
```js
<li><b>Review.</b> Game recaps, awards, advanced stats (what caused sacks and big runs), a critique of your picks, and a 100-season simulation that shows how much of your result was skill and how much was luck.</li>
```
→ remove `(what caused sacks and big runs)`.

**Also line 4279** is the section comment, not user-visible:
```js
// ---- advanced stats: what actually produced sacks and big runs ----
```
Leave it or update it — it is not rendered.

---

## 3 · "Seasons by Win total" — lower-case "w", inside a two-column grid

**Work order says:** the left alignment is poor; make the chart more beautiful (l.1131).

**Real text — line 6125:**
```js
+ sec('Your win distribution & playoff path', `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;"><div><h5 class="narr" style="margin:0 0 6px;">Seasons by win total</h5>${histHTML}</div><div><h5 class="narr" style="margin:0 0 6px;">How far you got</h5>…</div></div>`, true)
```

**Notes for the implementer:**
- The heading is `Seasons by win total` (lower-case "w"), inside an `<h5 class="narr">`.
- It sits in a `grid-template-columns:1fr 1fr` two-column grid with "How far you got" beside it. The "poor left alignment" is the `h5`/`histHTML` pair in the first grid cell.
- `${histHTML}` is the chart itself — the bars are built elsewhere; the alignment fix is in the cell, not the bar renderer.
- The section title is `Your win distribution & playoff path` (`sec(...)`, third arg `true` = expanded).

---

## 4 · "Your players; average season" and "Award patterns" — built at render time

**Work order says:** both should be higher up and automatically visible (l.1132).

**Real text — line 6130:**
```js
+ sec('Your players: average season', `<p class="narr">Grade = …</p><table>…</table><p class="narr">Honors per season: …</p>`, false)
```

**Real text — line 6133:**
```js
+ sec('Award patterns', awardPatternsHTML(A, N, user), false)
```

**Both are `sec(title, html, open)` calls in the 100-season renderer** (around lines 6000–6146 per MiniMax's C2 note). The third argument `false` means **collapsed** — that is exactly why the Owner does not see them. The fix is to pass `true`.

**Also line 5023** (the Guide) references the same two by name, so the labels agree once renamed:
```js
<p><b>Award patterns</b>: how often each kind of player wins each award over 100 seasons, and how often your team's players or coach won.</p>
```

**Order note:** the Owner asked for these two to be *higher up*. They are currently at the end of the 100-season renderer (6130, 6133 — near the end of the file). Moving them up is a reorder of the `sec(...)` calls, not a new block.

---

## 5 · "Third corner" — lower-case, inside a flex-table cell

**Work order says:** "Third corner" → "CB3 / Nickel" (Owner's wording).

**Real text — line 2224:**
```js
'nickel defense':{pkg:'nickel', focus:'neutral', desc:'Five defensive backs: the third cornerback replaces a linebacker. Better in coverage, a little softer against the run. The modern default.'},
```

**MiniMax's C2 finding confirmed:** there is **no capitalised "Third corner" label** in the build. The phrase occurs lower-case in the nickel package description, and the slot label list uses `third corner` inside the flex table's cell (the R-2 → R-4 → R-3 → flex-table row described in `ARCHIVE · P10 · the flex diff`).

**The Owner's instruction means:** after the flex-table rebuild, the cell must read `CB3 / Nickel`, and no `third corner` string should survive anywhere — including the description on line 2224, where it reads `the third cornerback replaces a linebacker` and should become something like `the third cornerback (CB3 / Nickel) replaces a linebacker` or simply `CB3 / Nickel replaces a linebacker`.

---

## The one-command re-check

```sh
node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md "NFL Draft Simulator merged.html"
```

**What I did NOT check:** the rendered appearance of any of these (no browser); the behaviour of `histHTML` or `awardPatternsHTML`; whether `sec(...)`'s third argument is the only thing controlling visibility. What I did check: every string and line number above, by grep against the pinned build.

**Self-audit (R5):** this note is in my own lane (`_agents/beam/notes/`). No product edits. No other session's file touched. Build pin re-verified before and after: `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`.
