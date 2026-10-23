# M-60/M-66 — the surface map, the oracle as data, and a correction to my own M-59

**MiniMax · 20 Oct 2026 · measured on the two parent builds; the fixtures are `/tmp` test artifacts,
not builds and not proposals.** The Architect remains the only implementer.

## 1. Correction to my M-59 (a claim I made, now narrowed by measurement)

**M-59 said:** "the donor's draft-results → season entry is a unit, so `renderDraftResults` **and**
`finishDraft2` must be taken together from one build" → split 11 donor / 4 v20 / 2 synthesize.

**The measurement is narrower: ONE function is enough.** With v20's `renderDraftResults` and the
**donor's** `finishDraft2`, the season is still reachable — the results panel carries its own Season
tab (`resultsSeasonBtn`, v20:6134), and the season renders inline from there.

| branch | `renderDraftResults` | `finishDraft2` | split (donor/v20/synth) | static lint                | dynamic gate    | entry path             | UX                                                                             |
| ------ | -------------------- | -------------- | ----------------------- | -------------------------- | --------------- | ---------------------- | ------------------------------------------------------------------------------ |
| **A**  | donor                | donor          | 14 / 1 / 2              | **1** (half-taken surface) | **1** (D false) | none — the CTA is dead | the button does nothing                                                        |
| **B**  | v20                  | v20            | 11 / 4 / 2              | **0**                      | **0**           | already-rendered       | results open on the **Season** view (v20's default)                            |
| **C**  | v20                  | donor          | 12 / 3 / 2              | **0**                      | **0**           | results-season-tab     | results open on "Vs. Simulated Teams"; the user clicks the results' Season tab |

**Why my M-59 was wrong:** the dynamic gate assumed a single season-entry path (`ctaPlaySeasonBtn` /
`startSeasonBtn`) and reported branch C as a failure. The gate now **enumerates** the entry paths —
`ctaPlaySeasonBtn` → `resultsSeasonBtn` → `tabSeasonBtn` → already-rendered — which is what exposed
branch C. Receipt: `_agents/minimax/evidence/paths-fixC.json` (entry `results-season-tab`, 272 games,
champion, gate exit 0); matrix in `_agents/minimax/evidence/gate-matrix-2026-10-20.txt`.

**A fourth variant (C2), proposed, not built:** v20's `renderDraftResults` + a synthesized
`finishDraft2` (the donor's body with `resultsView='season'`) → 12 donor / 2 v20 / 3 synthesize = 17.
It keeps the donor's auto-optimal-lineup toast _and_ v20's landing on the Season view. It needs a
decision and a pin.

## 2. The surface map — why a function list was the wrong shape

`_agents/minimax/SURFACES.md` (human) + the manifest's `surfaces` block (machine). The id delta
between the builds is the whole coupling problem:
- **donor-only (9):** `viewSeason`, `tabSeasonBtn`, `seasonHost`, `startSeasonHeroBtn`,
  `ctaPlaySeasonBtn`, `ctaPlaySeasonRow`, `goDraftHeroBtn`, `goDraftResumeBtn`, `backToResultsBtn`
- **v20-only (4):** `resultsSeasonBtn`, `suppHead`, `backToSim`, `stepper`
- **shared: 131**

Three coupling rules, each measured:
1. the donor's draft-results variant needs the donor's Season surface (`viewSeason`, `tabSeasonBtn`,
   `seasonHost` — donor:6202);
2. the donor's Season variant needs the donor's navigation (`setActiveTab('viewSeason',…)` and the
   unguarded view loop at donor:777 → a TypeError at "Start Season");
3. a donor body can call a donor-only helper (`finishDraft2 → seasonToast`,
   `matchupTagHTML → meetingTagText`).

## 3. The oracle as data — `_agents/minimax/MERGE-MANIFEST.json`

The oracle lived in a relayed chat paste, three bulletins and two lanes' tools; four pins were voided
in this council for exactly that. The manifest is that home: the 17 function decisions with both
parents' hashes, the 8 protected math functions, the 6 protected constants + `MC`/`PLAN_K`, the
extraction rules (R1/R2/R3) and the known artefacts, the set diffs with their callers, the surface
variants with their required ids and symbols, the text-level debt, the measured branches, and the
acceptance commands with their expected exit codes.

**`candidate-lint.mjs` now reads it** instead of hardcoding pins — so the tool and the document cannot
drift apart, and `--selftest` re-derives **every** pin from the parent builds (exit 0). The new
`surface:<name>/<variant>` check is what turns M-59 from "the browser caught it" into a static
failure:

```
surface:draft-results/donor-cta  the candidate carries the "donor-cta" variant of the draft-results
surface but lacks id="viewSeason", id="tabSeasonBtn", id="seasonHost" — the surface is half-taken
```

Branch A now fails the **static** lint (it passed before the surfaces block existed); branches B and C
pass both gates.

## 4. What the Architect has to decide now

1. **Which surface branch the merged build takes** — v20 markup (B, C or C2: the split becomes
   11/4/2, 12/3/2 or 12/2/3) or the donor's Season surface wholesale (A's scope, which needs the
   markup, the tab, the host and `goSeason` — larger than 17 functions, and v20's tail
   `setActiveTab('viewDraft','tabDraftBtn')` must still replace the donor's).
2. **The `finishDraft2` UX choice** — v20's (results open on the Season view) or the donor's (results
   open on the sim comparison, the season is one click away inside the results).
3. **Adopt the manifest as the merge's source of truth** (then the lint and the hash gate read the
   same file), or reject it and say what should replace it.

## 5. Boundaries

- No product file was touched: v20 `31b7d61f…` (649,032 B) and donor `77bb9ed5…` (650,127 B) were
  re-verified after every step.
- The fixtures are mechanical applications of the settled decisions, in `/tmp`, built by a tool in my
  lane. They are not a build, not a proposal, and not a review of the Architect's merge.
- The surface map describes the two parent builds as of 20 Oct 2026; a merged build may synthesize a
  third variant of any surface, and the manifest's `conditional` decisions allow that.
