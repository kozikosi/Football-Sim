SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 12 — the weight of the shell | DATE: 2026-11-16T21:50Z
FOR: R-13

# Cakepanz — DOM weight, measured, vs the fresh-start arms (Part 12)

**Unblocks:** the cutover question "does the shell cost more DOM than the arms build the same information?" Measured on the s5 delivery copy re-pinned to `d3bd81d2` in a throwaway tree (the live pin), served by `vite preview`, driven headless by Playwright. **Only two screens were measured — Team Select (dev state) and the Draft Board (dev, Round 1 on the clock); the feed/share/saves screens were NOT measured this round (see §3).** All numbers VERIFIED by reruns (two viewport widths).

## The table

| screen | Cakepanz @1180px | Cakepanz @390px | fresh-start arms (REPORTED, both equal) |
|---|---|---|---|
| empty `/` (no dataset) | 26 | 26 | — (not in arms) |
| Team Select (`?dev=1`, unpopulated) | **78** | **78** | arm's team select: **457** |
| Team Select (team picked, detail open) | **83** | **83** | — |
| Draft Board (Round 1, user on clock, 32-slot needs row) | **832** | **832** (scrollWidth **444**) | arm's draft board: **871** |
| Feed | not measured | not measured | **247** (see note) |
| (remaining arm figures with no Cakepanz counterpart yet) | — | — | 470 · 125 · 39 |

Notes:
- The arms' six per-screen figures (871/457/470/125/221/39 as quoted in the prompt) — my own sealed-bench measurement of the equal arms was **871/457/470/125/**247**/39** (VERIFIED, both arms identical). The prompt's `221` is not a number I can reproduce; without the per-screen mapping from the arms run I cannot say which figure `221` names; treat it as UNKNOWN-origin rather than a fact to chase.
- 832 vs 871: the Cakepanz board carries the needs sticky-row + the gone-tooltip chrome the arms lacked — same order of magnitude, **−4.5% nodes**.
- 78 vs 457 on Team Select: the Cakepanz slice-2 screen renders the grid as bare text buttons (32 of them) + a details panel — about **5.9× fewer nodes**, but this is **not free**: the arms' screens carried richer per-team detail (logos/color plates/hover affordances — exact anatomy UNKNOWN to me without re-reading them). A like-for-like information-density comparison was NOT run. INFERRED that much of the gap is deliberate austerity, not missing function: the screen delivers the required function (pick team → details → draft as that team) with lower fidelity to the w89 visual law. (See my style-laws filing: the shell does not implement the w89 law at all yet.)

## The re-render cost nobody measured

`goneOdds` is recomputed on every user-turn refresh (delivery README: "Measured fine at the board's scale… the season screens should reuse one odds computation per pick rather than per render"). Board re-renders dispatch the real store reducer; the needs row recomputes `openSlots` per refresh. No memoization measured; no jank measured — **UNKNOWN** whether Round-7+ boards (larger pool changes) hold 60fps on the Owner's machine. INFERRED: at this data scale (60 visible rows) it is fine; the three full battery passes ran in seconds.

## The 390 px layout defect found while measuring (VERIFIED)

At `viewport 390×844`, the Draft Board's `scrollWidth` is **444 px** — **54 px of horizontal overflow** (`document.documentElement.scrollWidth > 390`). Team Select: clean (390). The board needs a 390 px pass (horizontal pan? sticky-row wrap? column collapses) — it is not 390-clean as shipped. FLAG to Z.ai (v4-1 step: "390 px clean"); the battery has no 390 law for the board.

## How to verify

```
# build the delivery at the live pin in a throwaway tree, then:
CP_PORT=4188 npx vite preview --strictPort
# playwright: goto /?dev=1 → count document.querySelectorAll('*').length per screen
```

## Not done / UNKNOWN

- Feed, saves panel, brag/seed-card screens: NOT measured (the battery exercises them; node counts not probed). UNKNOWN.
- `scrollWidth` on the Feed/Share screens @390: UNKNOWN.
- bundle size vs w89's ≈1.9 MB (build: 316 KB JS + 19 KB CSS minified, gzip ≈111 KB — measured, my build) — far under w89; but w89 is a single-file deployment and this is a dev build, so the comparison is apples/motorbikes. Report the raw numbers, don't compare engines.
- Reduced-motion DOM equivalence (class toggles): battery covers `animation-name: none` on the feed; the WHOLE shell under reduced-motion: UNKNOWN (law coverage, not DOM weight).
