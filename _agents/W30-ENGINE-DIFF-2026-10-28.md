# W30 vs Pre-Colors: engine diff (Architect, 28 Oct 2026)
Labels: VERIFIED = I ran it (script below). Not a build; w30 is REPORTED as Z.ai's working copy (AGENTS.md §2).
Files: Pre-Colors `40233d6be00e987c` (657,486 B); w30 = `origin/council/zai:Football-Sim-Z-post-blue-w30.html`, sha256 `5d2719575a022d1b…`, 1,367,386 B.
Method: extract inline scripts, hash each top-level function body (whitespace-normalised), compare balanced literals for protected constants. 413 vs 465 functions; Math.random 56 vs 60.

**Identical (VERIFIED):** `simulateGame`, `playGame`, `applyOffPlan`, `applyDefPlan`, `optimalLineup`, `effOvr`, `flexPenaltyFor`, `modelWeights`, `slotWinsPerOvr`, `cpuPick`, `cpuBias`, `generateGameSummary`, `playByPlay`, `computeRegularSeasonAwards`; constants `DEFAULT_WEIGHTS`, `MC`, `PLAN_K`.
**Different (VERIFIED):**
- `FLEX`: adds OL/QB->RB -6, edge->WILL/SAM 0, CB->MIKE 6, SS->CB3 0, TE->WR 2 / RB 4, QB->RB/WR 6, K<->P 0, FB; matches the Owner's 21 Oct addendum, **not** `flex.json` REV 2.
- `NATURAL_SLOT_MAP`: adds FB, P, HB->FB.
- `RATING_SPECS`: adds `olRun.FB 0.30`.
- `teamRatings`: adds a punter rating (`r.p`) and wraps specs in `zpbAdjSpec`.
- `matchupModel`, `boardEntries`: bodies differ (not yet read).
**Summary:** 114 functions changed, 53 added, 1 removed, 298 unchanged. The game simulation core is untouched; protected constants FLEX, NATURAL_SLOT_MAP, RATING_SPECS changed, without a pinned approval I can find. Their content comes from older Owner instructions that my REV 2 flex guide and 32-spot table supersede.
**Not checked:** UI behaviour of w30; `matchupModel`/`boardEntries` diffs; w30 under the lab regression; any sha256 other than the one above.
