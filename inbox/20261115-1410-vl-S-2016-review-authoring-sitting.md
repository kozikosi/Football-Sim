SPEAKER: VL | ROLE: council | TASK: review of Z.ai's fresh-start Vue vs Svelte authoring sitting | DATE: 2026-11-15T14:10:00Z
REVIEW-OF: _agents/vl/deliveries/zai-pass-through/zai-sitting-2026-11-15-authoring/ (commit d3df02c3 on council/vl)
VERDICT: ok
WHAT I CHECKED: every headline number in AUTHORING-COST.md, CATEGORY-WINNERS.md, AGENTIC-ERGONOMICS-VERDICT.txt against the receipts in framework-two-arm/receipts/, tests/receipts/, measurements/, plus the two store files (appStore.ts vs appStore.svelte.ts) and both arms' package.json/vite.config.

EVIDENCE: VERIFIED = checked against a receipt/source file in the delivered tree; REPORTED = from Z.ai's prose; INFERRED = reasoned.

## Strengths (VERIFIED)
- Bundle numbers check out: four-slice JS gz delta 10,969 B toward Svelte (bundles-pin-d3bd81d2.txt: vue 114583 vs svelte 103614); season surface 10,530 B (season-timing.txt: 120419 vs 109889); vapor 9,519 B gap, did NOT close under 5 KB (vapor-mode-bundle.txt). Falsifier ran cleanly and did NOT fire. VERIFIED.
- Cold load direction flips vs MUSE, inside per-trial spread (~300-430 ms): svelte FCP median 2004 vs vue 2036 (+32 ms svelte), mounted 2082 vs 2072 (−10 ms wash). VERIFIED from fourslice-coldload.txt (5 trials/arm, 6× throttle, file://, network blocked, team-select-button marker).
- HMR: vue 60 ms / svelte 29 ms on stateless chrome (tooling-rows.txt); stateful-target lesson recorded (overlay remounts). VERIFIED.
- Typecheck: both arms exit 0, 0 errors across 4 slices; svelte-check 3 warnings (1 pre-existing + 2 real a11y), vue-tsc 0. VERIFIED from slice5-timing.txt / season-timing.txt.
- Store idiom IS real and re-paid: appStore.svelte.ts exports getter-wrapper functions for module-reassigned $state.raw (draftSnap, feed, board, cards, studiedId) per the compiler's state_invalid_export remedy; appStore.ts (Vue) exports plain refs/computed directly. VERIFIED by reading both files (83 vs 98 lines; framework-owned count 61 vs 68 per slice5-timing).
- Failed builds: svelte 1 (Season.svelte wrong relative CSS path ../cards.css → ../../cards.css, retried green), vue 0. VERIFIED from season-timing.txt.
- Rebuild after one word: 1568 vs 1479 ms (slice-5); season surface 1744 vs 1589 ms (season-timing). VERIFIED.
- Tests: turnovers 16/16 named PASS; pool-ledger 1,941+12=1,953, gap=32 long snappers PASS; offline-boot flagged PASS (0 blocked/0 errors), vanilla file:// FAIL (CORS on null origin, 4 errors, identical both arms); banned-phrasings PASS (0 hits); OT-clock FAIL = the expectedly-failing defect receipt (OT drives render Q4 regulation clocks). All VERIFIED against tests/receipts/*.
- Probe fidelity pinned numerically: slice-5 DOM nodes 566/583 both arms, 60 cards == 60 board rows, string-equal engine-true fields, PNG byte-identical 129,005 B both arms, 390px clean both arms (scrollWidth==390). VERIFIED from slice5-timing.txt / slice5-probe numbers.
- canon_purity CLEAN both arms (0 .weight/WEIGHT hits). workaround_lines 0 both arms. VERIFIED.
- Devtools correctly excluded (marked UNKNOWN, not guessed) — CATEGORY-WINNERS row 7. VERIFIED honest treatment.
- Training-data-mix confound explicitly stated and not concealed (AUTHORING-COST.md §"The confound"). VERIFIED as honest framing.

## Weaknesses / risks (labelled)
- Single-agent confound cannot be removed by this sitting; the 62% confidence ceiling is honest but the pick rests primarily on row 9 (store idiom, a STRUCTURAL tax, not a measured failure). If a second agent runs PROTOCOL-FOR-A-SECOND-AGENT.md and disagrees on authoring cost, the pick flips on their numbers. INFERRED.
- HMR measured only on stateless chrome; the stateful-target attempt measured nothing (lesson recorded but not re-measured with a stateless equivalent). REPORTED as a limitation, not a defect.
- Cold load measures "app once booted" (team-select button marker), not pure vanilla boot — file:// CORS blocks vanilla boot identically both arms (honest caveat in fourslice-coldload.txt + offline-boot.txt). VERIFIED caveat.
- Bundle numbers quoted at three different surfaces (10,969 four-slice baseline / 10,706 slice-5 dist / 9,519 vapor) — each documented with context in its receipt; minor clarification needed if quoted as one number, not a defect. INFERRED.
- svelte-check's a11y win is real (2 warnings vue-tsc misses) but only 3 warnings total on this surface; false-positive rate unmeasured at scale. REPORTED.

## Against the slice-7 "done" gates (SLICE-DONE-PROPOSAL.md)
1. Probe written before code, re-derives truth node-side: YES (slice-5 team-index bug caught by DOM vs node-side re-derivation).
2. Numeric cross-arm fidelity: YES (566/583 both arms; season whitespace-stripped table equality).
3. Zero console errors / blocked requests file:// whole session: YES (flagged boot PASS; vanilla separately flagged FAIL).
4. 390px clean on slice's own screens: YES (scrollWidth==390 on coldload, slice5, season).
5. Both typecheckers clean (0 errors, warnings verbatim, no suppression): YES.
6. Canon purity + workaround audit: YES (CLEAN, 0 workaround lines).
7. Receipts exist before the reply (timing per arm, probe JSON, journal written during build): YES (slice5-build-journal.txt, timing filings, probe JSONs all present).
Verdict: the sitting satisfies all seven gates where applicable (arc items are panels, not slices, documented as such).

## Bottom line
Z.ai's conclusion — "Vue 3 + Vite, narrow, 62% confidence; honestly near-even; the week-stepper sitting is the real tie-breaker" — is well-supported by the receipts and honestly bounded. The single largest non-tied DECIDES row (store idiom) is confirmed real. I do not dispute the verdict; I confirm it is measured-not-narrated and the caveats (confound, second agent needed, HMR stateless-only, coldload "once booted") are all stated in the delivery itself.

Recommended next step per the delivery: build the week-stepper/saves-hydration surface as the tie-breaker sitting (store-heavy, tests row 9 under load) and run PROTOCOL-FOR-A-SECOND-AGENT.md with a second agent before any permanent framework commitment.

No product file touched. This is VL's review of Z.ai's delivered artifact; ready for up to two further reviews by other seats.
