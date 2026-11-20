# HY4 — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** HY4 · **Model / how reached:** HY4 / API (OpenChamber) · **State:** advisor
- **Admitted:** 2026-11-18 by the Owner (`tools/admit-seat.sh`). Not retired.
- **Role:** propose, test, review, dissent, measure. Core status is the Owner's call after 3 verified items.
- **Worktree:** `/Users/kosi/Desktop/wt/hy4` · **branch:** `council/hy4` · **merge-base with base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current work
- **Done 2026-11-20 (cakepanz-12 sitting):** mirrored the Owner's `zai-cakepanz-12-2026-11-20/` delta folder (37 files, 376 KB) on council/hy4 @ `870fcb7d6`; reviewed and pushed `inbox/20261120-1551-hy4-cakepanz-12-review.md` (VERDICT: improved) + `inbox/20261120-1551-hy4-cakepanz-12-ideas.md` at `6ffb1ef72`.
- **Re-ran myself:** verifier on the zip root (36 OK / 0 FAILED / 0 missing, exit 0) + independent md5 loop 36/36; tamper proof (35 OK / 1 FAILED, exit 1); seed round-trip receipt (700/9000 before, 0 after everywhere, exit 0); T3 gh-pages patch dry-run + suite (277/286 → 286/286, exit 0).
- **Finding (shown defect):** `tools/verify-package.mjs` has no converse check — an unlisted extra file verifies clean (exit 0). Full improved file with a directory-walk set comparison is in the review.
- **Other findings:** 380 ms timer-only one-click guard (risk); stage 13b falsifier re-run still OPEN (report says so honestly); sandbox path in `seed-roundtrip-receipt.mjs:5`; browser battery counts REPORTED (delta-only zip cannot reproduce them).
- **Earlier sittings (same branch):** ring identification (`inbox/20261120-0902-hy4-ring-identification.md` — the gold C′1 suggestion ring, tie-extension via display-string parsing), cutover sequencing (`inbox/20261120-0931-hy4-cutover-sequencing.md` — re-sync first), A1 pin-watch self-test, D1 landing audit.
- **Claimed / in progress:** none · **Blocked / waiting on:** nothing for this work. Owner holds the gh-pages patch application and the c10 repair bytes.

## What the next session needs
- **Read first:** (1) the two c12 inbox files above; (2) `zai-cakepanz-12-2026-11-20/deliverables/sitting-report-2026-11-20.md`; (3) `AGENTS.md` §5 (states, review chain).
- **Open questions:** (a) close 13b with the hardened falsifier re-run before new work? (b) fixed-seed slice battery to unblock manifest-pinned receipts? (c) state-based one-click latch vs 380 ms timer?
- **Do not redo:** every receipt listed above was re-run this sitting. Do not re-measure the seed contract, verifier, or gh-pages patch unless bytes change. Do not re-run the slice battery without restoring its last-run JSON.

## Files in this lane
- `_agents/hy4/HY4.md` — this file (only live lane artifact).
- `inbox/20261120-1551-hy4-cakepanz-12-review.md` — review, VERDICT improved, with improved verifier.
- `inbox/20261120-1551-hy4-cakepanz-12-ideas.md` — ranked improvements (Tier 1–3).
- `inbox/20261120-1551-hy4-cakepanz-12-ideas.md` siblings from earlier sittings: A1 pin-watch, D1 landing audit, ring ID, cutover sequencing.
- `bulletin/20261120-1553-hy4.md` — this session's board entry.
- `zai-cakepanz-12-2026-11-20/` — read-only mirror of Z.ai's delivery (do not edit).
- The old c8 mirror was removed from this worktree after MUSE pruned it from the branch (identical copies live on inkling/pickle).
