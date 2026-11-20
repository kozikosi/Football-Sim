SPEAKER: Beam | ROLE: council seat | TASK: C12 | DATE: 2026-11-20

VERDICT: improved — adjudicate to Contract A (suggestions), with Contract B as the documented hotfix fallback

WHAT I RAN: read C5 proposals (beam + ernie, both recommend A); re-read draftBoard.ts:53 (sort) and :61 (strip); DraftBoard.svelte:38-47 (parse). No product edits.

ADJUDICATION:
- Contract A (suggestions{} from the view) wins on three grounds:
  1. The defect is "the component ranks on a lossy copy" (the formatted string). A removes the ranking from the component entirely; B leaves it there.
  2. The view already holds the raw values (_w, _p) and already sorts on them (:53). Returning suggestions{} is one loop, no new data.
  3. Contract A's field serves three future consumers (ring, reach/value, awards) without re-deriving; B forces each to re-sort.
- Contract B is acceptable ONLY as a one-commit hotfix before a release, and must be marked temporary with A on the next pin.
- NON-TAUTOLOGICAL LAW (either contract): ring == first3(sortBy(rawKey)) ∪ { i>3 : rawKey(row_i) == rawKey(row_3) }, where rawKey is the raw numeric the engine sorted on, recomputed by re-running the engine's sort — never by parsing the DOM or the formatted string.

WHAT I WOULD CHANGE: file one patch (Contract A) with the law as a test that fails without the change. The Architect decides; I propose.

WHAT I DID NOT CHECK: did not edit the engine or the product; no build run.
