# SURFACES.md — the UI surface map (measured, 20 Oct 2026)

**MiniMax · S-1900–1999 · `_agents/minimax/` · machine-readable twin: `_agents/minimax/MERGE-MANIFEST.json`**
(`surfaces` block) — the lint reads the manifest, so this file and the manifest must agree.

**Why this file exists.** Both of my BLOCKING merge findings were the same defect: **the oracle took
half of a UI surface.** `renderSeasonTabInner` (M-53) and `renderDraftResults` (M-59) each pull in a
_surface_, not a function — the functions render into DOM scaffolding that only exists in one build.
A list of 17 function names cannot express that coupling; a surface map can. This file is the map, and
it is measured, not asserted.

**How it was measured** (all commands read-only, on the two parent builds):

```
grep -o 'id="[^"]*"' "NFL Draft Simulator v20 Claude.html" | sort -u      # id inventory
grep -o 'id="[^"]*"' "NFL Draft Simulator.html"        | sort -u
node _agents/ds/tools/funcdiff-detail.js <v20> <donor> renderDraftResults finishDraft2
node _agents/minimax/tools/candidate-lint.mjs --selftest                  # pin + surface re-derivation
node _agents/minimax/tools/post-merge-smoke.mjs "<candidate>"             # dynamic behaviour
```

## The id delta — 131 shared, 9 donor-only, 4 v20-only

| donor-only (9)                                                                                                                                                     | v20-only (4)                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `viewSeason`, `tabSeasonBtn`, `seasonHost`, `startSeasonHeroBtn`, `ctaPlaySeasonBtn`, `ctaPlaySeasonRow`, `goDraftHeroBtn`, `goDraftResumeBtn`, `backToResultsBtn` | `resultsSeasonBtn`, `suppHead`, `backToSim`, `stepper` |

The 9 donor-only ids are **the donor's Season surface plus its draft-completion hero**; the 4 v20-only
ids are **v20's inline-season entry, its supplemental panel and its stepper**. That is the whole
coupling problem in one table.

## The surfaces

| Surface                       | Owner        | Functions                                                                                                                                                                             | DOM scaffolding                                                                                                                           | Entry                                                                                                                                                                                                              | Merge consequence                                                                                                                                                                                                            |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **draft-results**             | both         | `finishDraft2`, `renderDraftResults`                                                                                                                                                  | `draftFinalResults`, `draftResultsBody`; v20 variant adds `resultsSeasonBtn`; donor variant adds `ctaPlaySeasonBtn` + `ctaPlaySeasonRow`  | v20: `resultsView='season'` → the season renders **inline** (`renderSeasonTab(body)`, v20:6159). donor: `resultsView='sim'` → a **CTA** → `setActiveTab('viewSeason','tabSeasonBtn')` + `#seasonHost` (donor:6202) | **the coupling that breaks merges.** The donor's variant needs the donor's Season surface; on v20 markup the CTA is a dead button                                                                                            |
| **season**                    | both         | `renderSeasonTab`, `renderSeasonTabInner`, `renderPreseasonView`, `renderRegularSeasonView`, `renderRegularReviewView`, `renderSeasonCompleteView`, `renderPlayoffsView`, `render100` | v20 variant: none (the container is the results panel body); donor variant: `seasonHost` inside `viewSeason`, plus the `tabSeasonBtn` tab | v20: `startSeasonBtn` inside the results. donor: `startSeasonHeroBtn` in the Season tab, then `beginSeasonBtn`                                                                                                     | the donor's `renderSeasonTabInner` calls `setActiveTab('viewSeason',…)` and `getElementById('seasonHost')` — a v20-markup merge throws at "Start Season" (donor's `setActiveTab` view loop has **no null guard**, donor:777) |
| **navigation**                | both         | `setActiveTab`                                                                                                                                                                        | v20 variant: `viewDraft`, `tabDraftBtn`, `suppHead`. donor variant: `viewSeason`, `tabSeasonBtn`                                          | 6 views / 6 tabs (v20) vs 7 / 7 (donor)                                                                                                                                                                            | a synthesized `setActiveTab` must null-guard the view loop the way the donor's tab loop already does                                                                                                                         |
| **supplemental**              | **v20 only** | `setActiveTab` (v20 variant), `SUPP_TITLES`, `updateStepper`                                                                                                                          | `suppHead`, `backToSim`, `stepper`                                                                                                        | the "← Back to the simulator" panel                                                                                                                                                                                | free to carry: v20-only, no donor counterpart, nothing depends on it                                                                                                                                                         |
| **draft-board**               | both         | `renderDraftBoard2` (the **v20 keep**)                                                                                                                                                | `draftTable2` + `data-nostack`                                                                                                            | the draft board tab                                                                                                                                                                                                | the `nostack` guard in the phone block depends on v20's `#draftTable2` markup (v20:425) — the donor has no `data-nostack` at all                                                                                             |
| **playoffs / report / guide** | both         | `renderPlayoffsView`, `render100`, `renderGuideHTML`, `matchupTagHTML`                                                                                                                | `beginPlayoffsBtn`, `simRestBtn`, `back100Btn`, `rerun100Btn`, `guideBody`                                                                | inside the season panel                                                                                                                                                                                            | `render100` is the donor's (it drops the undeclared `rWeights`); `matchupTagHTML` calls the donor-only `meetingTagText`                                                                                                      |

## The three coupling rules (the whole point of the map)

1. **The donor's draft-results variant requires the donor's Season surface.** `renderDraftResults`
   (donor @6179) renders `#ctaPlaySeasonBtn`; its handler (donor:6202) needs `viewSeason`,
   `tabSeasonBtn` and `seasonHost`. On v20 markup the button is inert — no error, no season.
2. **The donor's Season variant requires the donor's navigation.** `renderSeasonTabInner` (donor
   @6100) calls `setActiveTab('viewSeason','tabSeasonBtn')` and `getElementById('seasonHost')`; the
   donor's `setActiveTab` view loop has no null guard, so a v20-markup merge throws a TypeError at
   "Start Season".
3. **A donor body can call a donor-only helper.** `finishDraft2 → seasonToast` and
   `matchupTagHTML → meetingTagText`. The oracle says keep the four donor-only helpers, but nothing
   tied a helper to its caller until the lint checked it.

## The three measured branches (what actually works)

| Branch                                | `renderDraftResults` | `finishDraft2` | Split (donor / v20 / synthesize) | static lint                      | dynamic gate                              | UX                                                                                                     |
| ------------------------------------- | -------------------- | -------------- | -------------------------------- | -------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **A** — the oracle exactly as stated  | donor                | donor          | 14 / 1 / 2                       | **exit 0** (passes it!)          | **exit 1** — D false, `gamesPlayed: null` | the "Play a Season" button does nothing                                                                |
| **B** — v20's pair                    | v20                  | v20            | 11 / 4 / 2                       | exit 1 (2 deliberate deviations) | **exit 0** — 272 games, champion          | results open on the **Season** view (v20's default)                                                    |
| **C** — v20's results, donor's finish | v20                  | donor          | 12 / 3 / 2                       | exit 1 (1 deliberate deviation)  | **exit 0** — 272 games, champion          | results open on "Vs. Simulated Teams"; the user reaches the season through the results' **Season** tab |

A fourth variant (**C2** — v20's `renderDraftResults` + a synthesized `finishDraft2` that is the
donor's body with `resultsView='season'`) would keep the donor's auto-optimal-lineup toast _and_
v20's landing on the Season view: 12 / 2 / 3 = 17. Not built — it is a proposal for the Architect.

**Correction to my M-59 wording (receipt: `evidence/paths-fixC.json`):** I first wrote that the pair
`renderDraftResults` + `finishDraft2` must be taken together from one build. The measurement is
narrower: **one** function is enough — v20's `renderDraftResults` alone, with the donor's
`finishDraft2`, still reaches the season (branch C) because v20's results panel has its own Season
tab (`resultsSeasonBtn`). The refinement came from making the gate enumerate the entry paths instead
of assuming one: the old driver only tried `ctaPlaySeasonBtn`/`startSeasonBtn` and reported branch C
as a failure; the enumerated driver tries `ctaPlaySeasonBtn` → `resultsSeasonBtn` → `tabSeasonBtn` →
already-rendered, and branch C passes.

## What the lint now does with this map

`candidate-lint.mjs` reads the manifest's `surfaces` block and, for each surface variant whose
anchor hash the candidate carries, requires that surface's ids and symbols to be present. Branch A
now fails the **static** check:

```
surface:draft-results/donor-cta  the candidate carries the "donor-cta" variant of the draft-results
surface but lacks id="viewSeason", id="tabSeasonBtn", id="seasonHost" — the surface is half-taken
```

Before this, only the browser caught it. A gate that can only fail in a browser is a gate that runs
after the merge, not before it.

## What this map does not claim

- It describes the two parent builds as of 20 Oct 2026 (`31b7d61f…`, `77bb9ed5…`). It says nothing
  about the Architect's merged candidate, which may synthesize a third variant of any surface.
- The "requires" lists are the scaffolding each variant _touches_, not an exhaustive DOM contract.
- It does not decide the merge. The Architect owns the values; the manifest is the proposal format.
