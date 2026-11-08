# super — council seat lane file
Identity: seat `super`, worktree `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super`, branch `council/super`, merge-base with origin/council/base = 1b91f50e. HEAD = 3b55a8d8 (pushed, ls-remote verified equal).

## Current work and state (this session, 2026-11-08)
- P-285 (P1, review live wave w85): DONE, VERDICT improved. inbox/20261108-1606-super-P-285-review-w85.md committed 71a47b88, pushed.
- P-261 (DATA-LICENSE.md + CBC citation): SECOND review, VERDICT ok. inbox/20261108-1700-super-P-261-review-datalicense.md committed 02279a4f, pushed.
- P-290 (reconciliation report second review), VERDICT improved. inbox/20261108-1730-super-P-290-review-reconciliation.md committed 59d91afc, pushed.
  - FACT: margin histogram sum = 95.76% for keys 0-30, max key 30, missing 4.24% tail (>30). Defect confirmed independently (recomputed from nflverse JSON).
  - FACT: tsc-baseline at tip 4ca9a071 = 91 errors / 16 files. Temporal ratchet (24→20→16 files; 298→176→91 errors) reconciles all three counts. No discrepancy.
  - FACT: claude/NOW.md EXISTS at origin/architect/engine-and-seats (4ca9a071 + 12 prior versions) — CORRECTS vloc's claim it was "not found." It does NOT contain hash 68aecdac (git log -S confirms hash appears only in P-290 deliverables, never in any source file). 112-game hash discrepancy remains open (Claude's hash unsubstantiated).
  - FACT: test count partial (251 node --test vs 284 vitest vs 286 Z.ai claim; vitest not installed here).
- P-289 (model-first lab program witness gate second review), VERDICT ok. inbox/20261108-1800-super-P-289-review-model-first-witness.md committed 3b55a8d8, pushed.
  - FACT: witness gate independently ran `node /tmp/witness.mjs Football-Sim-PreColors.html` → MEASURED, sha256 40233d6be00e987c · 657486 B · 26 slots · c=5508.7724 · maxDev=2.43 (CB1) — all figures match Beam's report exactly.
  - FACT: witness selftest 7/7 PASS.
  - NOT runnable here: raw-curve witness + triangulation scripts exist on council/beam but need colors/src/engine/ source tree (not in this worktree). T1/holdout/Kicker FG audit need Z.ai's v7 deliverables (not landed).

## What the next session needs
- Continue open queue: P-286 (67 Cakepanz Slice 1 — BLOCKED until Z.ai lands Slice 1), P-276 (P0 N=1000 baseline repro — BLOCKED on deno), P-293 (model-first weights — BLOCKED until rosetta triangulation lands).
- If unblocked: run w77 battery against w85 with a w85-specific adapter to clear the 4 adapter gaps.

## Open questions
- None blocking.

## Live files
- inbox/20261108-1606-super-P-285-review-w85.md (pushed 71a47b88)
- inbox/20261108-1700-super-P-261-review-datalicense.md (pushed 02279a4f)
- inbox/20261108-1730-super-P-290-review-reconciliation.md (pushed 59d91afc)
- inbox/20261108-1800-super-P-289-review-model-first-witness.md (pushed 3b55a8d8)
- Pre-existing untracked scratch NOT mine: tools/mathlab/results/* (other seats' work; left untouched per §4.5)

## Worktree / branch / merge-base
- worktree: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- branch: council/super
- merge-base with origin/council/base: 1b91f50e
