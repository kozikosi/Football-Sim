# Step 3(a) — 390px anchor re-run against Pre-Colors

**Date:** 2026-10-22 · **Seat:** Pickle · **Bulletin:** M-20261022-u
**Build:** Pre-Colors, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B
**Tool:** `_agents/pickle/tools/precolors-390-anchor.mjs` (read-only, one run, biome clean)

---

## Result

| Question | Answer | Evidence |
|---|---|---|
| Does `#startSeasonBtn` still sit below the 844px fold? | **YES** — top **963**, bottom **1007** → 119px below the fold | `Q1 below the 844px fold: YES — top 963 > 844 (119px below)` |
| Does `tests/e2e-smoke.mjs` `inVp` still pass despite it? | **YES** — the predicate has no vertical term | `Q2 inVp passes despite it: YES — it is horizontal-only` |

Exact bounds at 390×844, `scrollY 0`: **left 36, right 194, top 963, bottom 1007**, w 158, h 44.
Horizontal overflow **0px** (`scrollWidth 390 = clientWidth 390`), page height 2955px, **0 page errors**.

This reproduces the earlier measurement exactly (mine 963/1007, DS 963.03/1007.03), so the finding is
unchanged on the only build we may anchor against. It is a **vertical reach** problem, not clipping.

## Why `inVp` cannot catch it

`tests/e2e-smoke.mjs:141`

```js
const inVp = r => r ? (r.left >= -1 && r.right <= vw + 1 && r.width > 0) : false;
```

Three conditions, all horizontal. A CTA 119px below the fold satisfies all three. The helper answers
"is it horizontally inside the viewport", not "can the user see it". **A PASS from it is not evidence
of reachability** — that is the whole gap the Owner's #7 class was meant to close.

## The path measured (the harness's own, not an invented one)

1. `#startDraftBtn`
2. `#simToEndBtn` → `draftSim.pos` reaches **832** (32×26) in 1.7s
3. `#resultsSeasonBtn`
4. `#startSeasonBtn` attached
5. resize to 390×844, `scrollTo(0,0)`, measure

Same route as `tests/openchamber-e2e-v2.spec.js` STEP 3 / `checkViewportAt390(page, "preseason")`.

## Two corrections recorded in the same run

**(a) My own M-139 wording.** I called this "the preseason primary action". In Pre-Colors
`#startSeasonBtn` is rendered by `renderSeasonTabInner` in its `!seasonState` branch — it sits on the
**season landing inside the results panel, before any season exists**. The preseason plan page's action
is `#beginSeasonBtn`, further down. Same button, same geometry; the label was loose.

**(b) A ghost route.** `goSeason()` (l.846) does `getElementById('seasonHost')`, but `seasonHost` **does
not exist in the DOM** — its only occurrence in the file is that lookup — and `goSeason()` has **no call
sites** (the sole `goSeason()` reference is inside its own body, l.857). The "Season tab" route described
in older docs is dead code here. Not fixed: V23 is on hold, and this was an anchor re-check only.

## Anchor provenance

The pinned blob is **not** at the repo root and is on no branch at root. It was fetched by hash from
remote `main` (`NFL Draft Simulator merged.html`, ref `main`) and verified byte-identical to the pin
before any measurement:
`40233d6b…` / 657,486 B. It lives read-only at `_agents/pickle/builds/Football-Sim-PreColors.html`
(my lane). DS independently confirmed byte-identity to `git show HEAD:"NFL Draft Simulator merged.html"`;
LongCat confirmed the path. No root copy was created.

## What I deliberately did not check

No viewport other than 390×844 · no build other than Pre-Colors · no surface other than this one ·
`inVp` was not modified · no product edit · no candidate built · nothing renumbered · bulletin not trimmed
(§7 hold).
