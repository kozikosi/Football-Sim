# P0/P1 · The copy-compliance map — what candidate A actually contains, and every Owner copy item that is still outstanding

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P0 · "take what is already built", checked against the Owner's list | DATE: 2026-10-22T12:50:00Z**

**Why this exists.** The brief says the live build is `Football-Sim-V21.html` and that the next release is the Architect's V22, and it lists **P1 · the copy passes** as the second-highest priority band. Nobody had checked **which of the Owner's items are already inside the built candidates** — and the answer is not what the headlines suggest. **Here it is, measured on the three files.**

**The three files:** `Football-Sim-V21.html` (`044d1759e01ac99b…`, the baseline, **verified unchanged today**), candidate **A** (`e5fa7e0e8913…`), candidate **C** (`e2b0ea855358…` committed / `ef25b892…` working tree).

## 1 · The headline: the copy passes are **entirely** outstanding

Every copy item the Owner named, counted in each file (occurrences of the exact string):

| the Owner's item | V21 | A | C | status |
|---|---|---|---|---|
| "Value here" (remove from the site) | 6 | **0** | **0** | **DONE in A** |
| "had ripped off" (delete the sentence) | 1 | 1 | 1 | **NOT DONE** |
| "All eyes will be on" (delete the line) | 1 | 1 | 1 | **NOT DONE** |
| "points a game" (the per-unit sentences go) | **20** | **20** | **20** | **NOT DONE** |
| "Realism audit" (leave the screen) | 2 | 2 | 2 | **NOT DONE** |
| "Does the model predict real results" (leave the screen) | 1 | 1 | 1 | **NOT DONE** |
| "Under center" (the preview's QB line) | 2 | 2 | 2 | **NOT DONE** |
| "Selected:" (the ugly preseason line) | 1 | 1 | 1 | **NOT DONE** |
| "Why we recommend Auto" (remove) | 1 | 1 | 1 | **NOT DONE** |
| **em dashes (U+2014)** | 201 | **212** | **212** | **WORSE, not better** |

**So candidate A removes the "Value here" column — the one item the work order calls out as *"keep the maths, remove the display"* — and applies none of the §4.3 / §4.4 / §4.6 copy.** And the em dashes went **up by eleven**: the Owner's "em dashes become periods" is moving the wrong way.

**That is the single most useful thing this note says: the P1 band is not partly done. It is not started.** (The two items the Owner wanted *renamed* rather than removed — "More Advanced Stats" and "Seasons by Win total" — **do not appear as those strings in any of the three files**, so the build words them differently; I did not chase them further.)

## 2 · What candidate A *does* contain (185 hunks, 379 added lines)

A's added lines by kind: **JS 241 · markup 83 · text/other 34 · CSS 18 · comments 2.** Read, they are a coherent set — and several are exactly Owner items, just not the copy ones:

| Owner item | evidence in A's added lines |
|---|---|
| **the mobile cards** | `#draftTable2,#draftTable2 tbody{display:block;overflow:visible!important;…}`, `table.mstack td{display:flex;justify-content:space-between;…}`, `[style*="grid-template-columns"]{grid-template-columns:1fr!important;}` |
| **the footer tabs always visible** | `<nav class="footnav" aria-label="More tools">` |
| **the reduced-motion guard (not optional)** | `@media (prefers-reduced-motion: reduce){.fxbanner,.fxtoast,.champion-banner.fxwon{animation:none!important;opacity:1;}}` |
| **"Default is how the draft simulator sees the game."** | added verbatim |
| **the Team Comparison reorganisation** (parentheses out, two groups) | `// Unit Comparison: the Owner's order, in two groups, with the parentheses taken out of the labels.` |
| **the sort-by-value option removed, not relabelled** | `<select id="draftSort2"><option value="ovr" selected>Sort: overall</option><option value="priority">Sort: pick priority</option>…` — **no "Sort: value" option exists** |
| **the "Value here" removal** | 5 lines dropped, including the Guide's explanation of the feature and the section title |
| **the board and the values merged into one panel** | `sec('Drafting & Position Values', draft + values, …)` (with candidate C) |

**So A is a *platform and layout* pass, not a copy pass** — which is a coherent division of labour, and it matches the brief's P5 (platform) and P1 (copy) being listed as separate bands. **The copy band was never started.**

## 3 · What this means for the plan

1. **Merge candidate C** (the merge map is in `_agents/moc/notes/p0-merge-map.md`: C = A + four hunks, 52 lines; the two do not conflict).
2. **The P1 copy band is the largest remaining Owner-visible work**, and it is **not** in either candidate. It is also the cheapest to specify: the work order already carries the before → after text for the preview, the review, the season review, the 100-season report and the preseason — **applied verbatim, as the brief says.**
3. **The em-dash count is a regression to watch**: 201 → 212 in candidate A. Whatever else the copy pass does, that number should come **down**.
4. **The "Realism audit" and "Does the model predict real results?" items are not deletions** — the Owner said the *numbers* stay, computed and stored, and only the screen changes. A copy pass that greps those strings out of the file would break the computation. **They need to be hidden, not removed** — a finding for whoever writes that pass.

## 4 · What I did not check

- **I did not verify A's 185 hunks line by line** — I characterised them by kind and sampled their content; a full review is still open (and is the natural next chore).
- **I did not check the copy inside A's JS strings** for every Owner phrase — I tested the fifteen phrases the brief quotes verbatim, plus the em dash count; there may be Owner items whose wording differs from the brief's summary.
- **I did not check the two renamed labels** ("More Advanced Stats", "Seasons by Win total") — they are not in the files as written, and I did not find what the build calls them.
- **I did not verify V21 is unchanged since the baseline** beyond its hash matching `044d1759e01ac99b…` today, and **I did not touch any of the three files.**
- **I did not apply any copy** — the product file is the Architect's.

**Commands (pasteable):**

```
for f in Football-Sim-V21.html _agents/minimax/prototypes/V22-candidate-2026-10-21.html _agents/minimax/prototypes/V22-candidate-teamcolours.html; do
  printf "%-58s %s\n" "$f" "$(grep -o -F -- 'points a game' "$f" | wc -l)"
done
```
