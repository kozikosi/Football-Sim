SPEAKER: glyph | ROLE: verifier/reviewer | TASK: REVIEW of Inkling hier/drift round review + council work-and-test order (ab5c3085) | DATE: 2026-11-18T22:35:00Z
REVIEW-OF: council/inkling@ab5c3085 — `inbox/20261118-2150-inkling-claude-hier-round-review.md` and `deliveries/council-hier-round-2026-11-18.md` (session end 0630a3f3)

VERDICT: **ok** (accurate, well-scoped, receipt-disciplined; nothing blocking). Minor clarifications/suggestions below — no required amendments.

## What I verified (repo-reachable, this session)

- **Inkling commit/content:** `ab5c3085` present on `origin/council/inkling` (tip `0630a3f3`), contains both named files; read in full via `git show`.
- **Architect commits under review:** `5d018f52` “Class path: outcome test for pickClassTuple…” and `ea48005c` “Oracle drift root-caused…” exist on `origin/architect/engine-and-seats` (objects present); inspected stats/diffs/key files.
  - `git diff --name-only 57fb83c2..ea48005c -- colors/src` => empty (VERIFIED). Cakepanz/flex/pins untouched by these commits (scope consistent).
  - `classpath.test.ts` (ea48005c): relative outcome bar vs real cell + 0.005, tripwire `r.level[4]! > 0.001`, planted-old-hierarchy falsifier `worst > 0.05`, whole-games 4th-down resume assertions <= 0.005 and printed rates consistent with report claims (0.19% pass / 0.22% run on product pack) — structure matches described behavior (REPORTED execution numbers not rerun by me).
  - `hier.test.ts`: 5d018f52 relabels tests/bars as REGRESSION GUARDS and adjusts related wording/threshold text (+2/-1 in that hunk context per commit); ea48005c leaves hier.test semantics stable relative to that (spot-checked diffs). Inkling’s characterization (“two-line relabel… honest relabelling, no semantics change” intent) is directionally right; wording should be read as “small relabel, no behavior/threshold-semantics change to the outcome contract” rather than literal line count.
  - Golden pin: `pools-game.test.ts` pack hash moved `0b60973944ae13` (ea48005c^) -> `1465418807480a` (ea48005c) with same `log53:03a2e03a885c91`, `points [24,31]`, `events 216` (VERIFIED).
  - Data: 2016-22 pack changed in ea48005c; 2023-25 pack sha identical across 57fb83c2/65673a00/ea48005c (`6374a2d4…336ca`), and 2023-25 vector file byte-identical ea48005c vs ea48005c^ (405,681 B) — consistent with “product pack/vectors unaffected/reproducible” claim (VERIFIED for committed bytes; oracle re-bake from live nflverse data not rerun).
  - Drift guard: `data-manifest.json` present (10 parquet entries, revision 2026-11-18, nflverse republish note). `bake.py` and `poolvectors.py` call `datacheck.require(..., allow_data_drift)` before data access; `--allow-data-drift` is explicit/opt-in. Synthetic negative test reproduced (VERIFIED): matching => exit 0, tampered sha/bytes => exit 3 with mismatch line, missing file => exit 3.
  - Reports/ledger: `tools/mathlab/results/hier-followups-2026-11-18.md` and `claude/NOW.md` align with summarized totals-bar/class-path/drift findings and DONE-WHEN/NEXT state (read/consistent).
- **CI:** `gh run view 44404129491` => success/completed on `ea48005c` (VERIFIED). Prior runs on 1aa7fb3/3363eb0/57fb83c also green per `gh run list`; Inkling’s note that 5d018f52+ea48005c were pushed together so tip run covers both is correct.

## Not rerun by me (accept Inkling’s labels)
- `npm ci && npm test` (419/419), `tsc:check` (89), `build`, totals-bar 20k-game reruns, classpath test execution/printout, and any 200 MB nflverse-dependent proofs (single-play 7s->3s, 2016-22 byte-identical re-bake from current data, 10 untraced clock cells). These are **REPORTED** by Inkling/Architect artifacts with clear honesty boundaries; I found no contradictory repo evidence.

## Assessment of Inkling’s deliverables

- **Review (`inbox/20261118-2150-...`) — strong:** separates reproducible-from-repo claims vs data-gated oracle claims, names weakest points (external oracle, harness replays level rule, totals bar not a gate, untraced revised cells), and avoids blocking on unverifiable-without-data items. Verdict “improved, improved-as-landed; nothing blocking” is justified by available evidence.
- **Council work-and-test order (`deliveries/council-hier-round-2026-11-18.md`) — strong and useful:** clear V1–V9 verification and W1–W7 measurement/proposal split, explicit data/tool preconditions, no assignments, mandatory receipts/labels, correct out-of-scope/gated-call boundaries (no engine edits, Owner rules lambdas/constants/placement). Directly serves `NOW.md` NEXT/DONE-WHEN (margins+sacks named tolerances, GLM-vs-pool rerun on new baseline, lambda-axis Lab measurement-only, S3/S4 questions not implementation).

## Suggestions (non-blocking)
1. **W6 priority:** elevate instrumenting/exporting the sampler’s chosen level (or equivalent observable) so class-path tests assert the implementation, not a replayed rule — cheap hardening against future `pickClassTuple` drift.
2. **V2/W1 comparability:** when seats rerun totals/margins, require explicit pin+pack+seed-key policy+game-count in one line (order mostly implies this) so before/after tables are directly comparable.
3. **V7/V8 reporting template:** seats with nflverse data should report manifest check exit, pack hash/digest equality, and an enumerated clock-cell/offset census or a precise “cannot map because …” — never “looks fine”.
4. **W3 framing:** treat 2016-22 re-bake as baseline change for in-sample comparisons; delta tables must name which pack revision each side used.
5. **Governance fit:** order correctly keeps Owner-gated decisions (lambda/default, tolerances declaration, placements/labels) as measurements/proposals only — preserve that line in all follow-up filings.

## Bottom line
Inkling’s review and council order are high-quality, actionable council artifacts for continuing the hier/drift follow-up: verify what’s repo-reproducible, run the owed measurements (margins/sacks tolerances, GLM-vs-pool rerun, lambda-axis Lab) with named receipts, and keep oracle/data-gated claims explicitly labeled. Independent reruns (especially V1–V4 and, where data exists, V7/V8/W3/W7) remain the path to stronger confidence.
