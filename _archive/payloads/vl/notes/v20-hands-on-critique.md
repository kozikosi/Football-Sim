# VL — hands-on critique of v20 (the reference build)

**Date:** 20 Oct 2026 · **Session:** VL · **Status:** advisory only — no product file was edited.
**Build under test:** `NFL Draft Simulator v20 Claude.html` — sha256 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`, 649,032 B, 6439 lines (R2 reference build).
**Compared against:** donor `NFL Draft Simulator.html` — sha256 `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`, 650,127 B.
Every line number below is measured on the build named in the same line.

## Method (no installs, no writes to the product)

Headless Chromium driven over CDP; read-only commands only. Full E2E: draft → season → playoffs → Super Bowl → season review → 100-season report → 390px phone pass.

## What ran (all green unless noted)

| Step | Result |
|---|---|
| Load v20 | 0 console errors; 1,200 players, 32 team depth charts |
| Draft setup → draft | 832 picks (26 rounds × 32 teams), user pick made by hand (Josh Allen, QB) |
| Sim to End | draft completes, results page renders, "Play a Season" CTA present |
| Season | Week 1 simulated by hand (box score + play-by-play), then rest of season → 272 games, 17 weeks |
| Playoffs | wild card → divisional → conference → Super Bowl (KC 31–23 WAS), phase `complete` |
| Season Review | record 11–6, playoff narrative, MVP (Jaxson Dart), stat leaders, All-Pro, Pro Bowl, user summary |
| 100-season report | **FAILS — see F1** |
| 390 px pass | 6 tabs + live draft board + League Leaders + Your Players + season review — no page-level overflow; one real defect, see F2 |

## Findings

### F1 — [BLOCKING] The 100-season report crashes on v20 (uncaught `ReferenceError`)

`render100()` throws at the very end of the run, so the report never renders and the UI stays stuck on
"Simulating 100 seasons… Season 100 of 100…" (the 100 seasons themselves *do* simulate; `league100` is populated).

```
ReferenceError: rWeights is not defined
    at render100 (…/NFL Draft Simulator v20 Claude.html:6018:1006)
    at step     (…/NFL Draft Simulator v20 Claude.html:5900:134)
```

* v20 line 6018 uses `rWeights` — `grep -n "rWeights"` on v20 returns **exactly that one line**; the identifier is never defined in the file.
* The donor has **no** `rWeights` anywhere (`grep -c` = 0) and its own `render100` at donor line 5984.
* Verified on the donor: the same feature renders the full report with **0 page errors** (`report:true`, `league100` populated, ~25 s).

**Merge implication:** the merged build must take the donor's `runLeague100`/`render100` (or delete the v20-only sentence "Your weights' own ranking correlated at r = …"). If v20's `render100` survives the merge verbatim, the crash ships.

### F2 — [BLOCKING] Mobile table stacking is lost after a viewport change (v20 only)

v20's phone-layout pass (lines 6409–6432) removes the `mstack` class on desktop (line 6416) but leaves the
`dataset.msChecked` memo behind; on the next mobile pass line 6418 sees the stale memo match and skips the
table, so a wide table silently reverts to its desktop layout.

Reproduction (measured, both builds):

| Build | Sequence | `mstack` on `#playerTable` | table width inside a 344 px card |
|---|---|---|---|
| v20 `31b7d61f…` | load 390 → 1280 → 390 | `false` | 515 px (clipped/scrollable) |
| donor `77bb9ed5…` | load 1280 → 390 | `true` | 344 px (stacked) |

Live confirmation of the cause (runtime only, no file edited): clearing the memo
(`playerTable.dataset.msChecked=''`) and dispatching `resize` restores `mstack:true` immediately.

**Merge implication:** take the donor's phone-layout block (donor lines 6458–6488). It dropped the row-count
memo entirely and re-applies labels on every pass; its own comment records the bug v20 still has
("a row-count signature missed: wide tables then showed bare numbers on phones with no way to tell the
columns apart").

### F3 — [NOW] A 390 px check based on `documentElement.scrollWidth` is blind on this build

`body { overflow-x: hidden }` masks clipping. Measured on v20 at 390 px in the F2 state:
`documentElement.scrollWidth = 390`, `innerWidth = 390` → a naïve "no horizontal scroll" check **passes**
while the Player Browser table is 515 px wide inside a 344 px card (columns STR/AGI/COD/INJ/AWR cut off).

The stack is scrollable (`#playerTable` has `overflow-x:auto`), so it is degraded-but-usable, not a crash.

**Recommendation for the harness (`tests/phone.js`, S-301):** measure element-level overflow, not only the
document width — walk visible elements and flag any whose `getBoundingClientRect().right > innerWidth + 1`.
Also wait ≥ 200 ms for the 150 ms debounced mobile transform to settle before asserting; measuring too early
produces false positives.

### F4 — [NOW] Two post-game copy defects (shared by both builds)

* v20 line 3082 / donor line 3101 — `…to steal a ${wS}–${lS} win.` → "steal a 18–16 win" (wrong article for
  scores starting 8, 11 or 18). **Observed live** in the week-1 recap: "The Chiefs closed on a 10–3 run to
  steal a 18–16 win."
* v20 line 5433 / donor line 5483 — `Their ${U} outplayed the ${opp}'s answer to it` → "the 49ers's answer".

Both are in the donor as well → **shared debt**, not merge-debt; neither is a one-character fix in the merge.

### F5 — [NOW] Two style-rule strings are live in v20 and already fixed in the donor

Measured with `grep -c -F` on v20 `31b7d61f…` and donor `77bb9ed5…`:

| String | v20 | donor | Where (v20) |
|---|---|---|---|
| `sudden death` | 1 | 0 | line 2880, inside the post-game recap paragraph builder |
| `went the distance` | 1 | 0 | line 2898, `tdTag` in the turnover paragraph |
| `expected scoring` | 1 | 1 | line 4832, stats-explainer paragraph (not post-game copy) |
| `no strong lean either way` | 0 | 0 | — |
| `two-point conversion` | 0 | 0 | — |
| `2-Pt Conv` | 16 | — | — |

So "sudden death" and "went the distance" are **merge-debt** (the donor's recap text already resolves them);
"expected scoring" is **shared** and its v20 occurrence is in a help paragraph, not a recap — the Architect may
rule it compliant.

### F6 — [LATER] Minor, cosmetic

* v20 line 1 is a stray document prefix (`<!doctype html><html><head>…<style>…</style></head><body>`)
  followed by a second `<!DOCTYPE html>`; the file ends with a stray `</body></html>` (line 6438).
  Already known (DS / Pickle). Confirmed again here: the page still loads and runs with 0 console errors.
  The fix is "relocate the `<style>` block into the real `<head>`, then delete the strays" (544 B delta:
  530 B prefix + 14 B trailing), not blind deletion.

## What I kept exactly (don't touch)

* Math core — `slotWins`, `slotWinsPerOvr`, `modelWeights`, `effOvr`, `optimalLineup`, `matchupModel`, `teamRatings`, `simulateGame`, and all six protected constants are byte-identical across both lineages (Pickle's whole-function extraction + `shasum`, `_agents/pickle/evidence-m8.txt`). Only `cpuPick` differs.
* `POINTS_PER_WIN = 32.5` (v20:4756); `SEASON_RECORD_CAPS` (v20:3399: `passYds:5400, rushYds:2060, recYds:1930, sack:21, dint:10, rec:140`).
* `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` — protected per AGENTS.md §Critical Invariants 9.

## What I did **not** check (deliberately)

* No physical phone (all measurements are headless Chromium at a 390×844 viewport).
* No print stylesheet, no Safari/Firefox rendering, no screen-reader pass.
* The donor's season-first flow was only driven as far as the draft + 100-season report; I did not replay a full donor season.
* No performance profiling beyond wall-clock of the 100-season run.
* I did not run `node --check` on an extracted script block (no harness scripts exist yet — Round 1A builds them).

Timing: full 17-game regular season (272 games) < 1 s wall clock; 100-season run ~25 s (donor).
