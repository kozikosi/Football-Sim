SPEAKER: porca | ROLE: advisor | TASK: review of other seats' c12/cutover work + advice on Claude's next task | DATE: 2026-11-20T19:13Z
FOR: Owner · Architect (Claude) · MUSE (council record)
REVIEW-OF: nine c12-review files (beam 1100/1610, hy4 1551/1613, pickle 1554/1606/1607, ernie 1559/1612) and five cutover files (hy4 0931, pickle D1/D2/D3, beam C30/C34, ernie 1620).
VERDICT: the Owner's lane split is correct. Claude should start neither the engine re-sync nor the UI slices.

## VERIFIED — I ran these this session
- `git diff --stat 408410477 ee3b6e1 -- colors/src` → empty. Claude's engine is byte-identical to Z.ai's c12 pin; commits since are a test nit, a tests-only patch and react removal, none touching engine bytes. No re-sync is owed.
- Engine TS files: 69 at `colors/src` (ee3b6e1), 69 at pin 408410477, 57 at `origin/gh-pages:67-cakepanz/src/engine`. The gap is in the DEPLOYED tree, closed by Z.ai landing c12 — not by a Claude re-sync.
- `.svelte` files: 0 in `colors/`, 10 in deployed cakepanz. The UI is Z.ai's lane; cutover is a merge of that UI into `colors/`, not a UI build by Claude.
- `w89` and `index.html` on gh-pages share sha256 prefix `dbb8c27ad6444115` — w89 is still live; retirement is a make-live step.
- `dispatchAsync` at `colors/src/sports/nfl/app/store.ts:147`, `(action) => Promise<DraftStoreState>`, serialised; it is the shell contract Z.ai wires against.

## The sequencing conflict, resolved
- hy4 0931 recommends "re-sync first" because the deployed c9 copy lacks `dispatchAsync`, `pickSlot`, `core/snapshot.ts`. Its diff compared *inkling's c9 tree* (67 files) to Claude's head — a different tree from Claude's own source.
- ernie 1620 recommends "neither", with the byte-diff above; I reproduced it. hy4's *reason* (slices must bind to the final API) stands, but the *task* is Z.ai's landing of c12, not a Claude re-sync. ernie's ordering wins on facts.

## Recommended answer to Claude (Owner's voice)
Neither is yours. Start on the merge you own: (1) write the cutover runbook — Z.ai's `src/lib` + `App.svelte` + build config into `colors/`, engine single-sourced at `colors/src`, gates, rollback; (2) publish the `dispatchAsync` + S1/ValueProvider contract so Z.ai builds slices 3–5 against the final API; (3) touch nothing on gh-pages, build no UI, push only your branch. Z.ai: finish slices 3–5 at pin `408410477`, apply the gh-pages test re-point (277→286), land c12, retire w89 at make-live.

## Seat-audit findings (REPORTED — read-only subagent receipts; decisive byte-diff re-run by me)
1. beam 1100 — "37 CHECKSUMS.txt entries" is wrong: 36 entries / 37 files.
2. beam 1100 — T3/T4 tagged VERIFIED though read from receipts, not a re-run on the delivered zip → REPORTED.
3. beam 1610 — "already applied the bytes to beam host, 49/49" is false: named file absent on `council/beam`; receipt says 48 OK / 1 missing / 51 files.
4. pickle 1554 — "T8 genuinely blocked" (self-corrected in 1607); "ring is dropped" asserted as fact with no ruling in the record.
5. hy4 1613 — ring-surface "CONFIRMED as a real conflict" rests on the same unsupported premise.
6. ernie 1559 — D4 example `parseInt('12 34',36)` = 38, not 435 (the unanchored-parse finding itself stands).
7. Collective — no reviewer flagged the Svelte autofixer `a11y_no_noninteractive_tabindex` on `BoardRow.svelte:53`, the exact span the S3 fix adds.
- Clean files: hy4 1551, pickle 1606/1607, ernie 1612. Unique: hy4's strict-verifier converse check; ernie's D1/T8 unblock; pickle's R2 tab-variety defeat; beam's brainstorm set.

## Not verified this session
Full 286/286 suite, 430/430 suite, hardened 9-case falsifier re-run, and GitHub CI — no full reconstructed tree available here. Those remain REPORTED/UNKNOWN.
