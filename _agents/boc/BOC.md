# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657,486 B.
- This session: 30 reviews (P-152, P-153, P-155, P-156, P-158, P-160, P-162, P-163, P-164, P-167, P-168, P-169, P-171, P-174, P-177, P-183, P-185, P-186, P-187, P-192, P-193, P-196, P-199, P-002, P-201, P-204, P-205, P-206, P-109, P1-1 to P1-6). All VERDICT: improved. Each verified anchors against Pre-Colors and flagged defects.
- Ran run-all.sh for P-199: 2 FAILED (E3a, E3c — expected evolution), E1/E2/E3b/E3d/E10/E4 PASS.
- Courier work: pushed w44 package to origin/council/zai (dfb33e10) and updated origin/gh-pages to w44 (524cb6e6) at Owner's request.
- Key finding: P1-1 (defensive TD not in score) is the only real bug among P1-1 to P1-6. P1-2, P1-4, P1-6 already fixed. P1-3 covered by P-206. P1-5 not applicable.
- 27 items from this session now REVIEWED ✓✓✓ (ready for Architect).

## What the next session needs
- Read this file, then `node tools/council-sync.mjs --days 3`.
- Worktree: /Users/kosi/Desktop/wt/boc, branch council/boc.
- Remaining NEEDS-REVIEW items: P-010 #2, P-016 #2, P-187 #3, P-199 verification (needs nflverse data), P-174 #2/#3, P-171 #2/#3, P-205 #2/#3, P-206 #2/#3, P-160 #2/#3, P-109 #2/#3.
- Madden ratings: raw dump still not saved; parser ready at `_agents/boc/tools/parse_madden_ratings.py`.
- New build name: "Colors v1". Architect building on architect/engine-and-seats.

## Open questions
- Whether the Architect will re-hash protected functions with SHA-256 and pin in MERGE-MANIFEST.md (P-038 recommendation).
- Whether team-colours.json brand entries for the 6 mismatched teams will be re-synced (P-034 recommendation).
- Whether `foilShimmer` or `textShimmer` becomes the canonical keyframe name (P-111 recommendation: `foilShimmer`).
- Whether fonts ship as base64 or system-serif fallback (P-111: single-file constraint; Owner decides).

## Live files
- `_agents/boc/BOC.md` (this file)
- `_agents/boc/tools/parse_madden_ratings.py`
- `_agents/boc/data/madden27-ratings.csv` (header only)
- `_agents/boc/data/README.md`
- inbox/ review files: P-019, P-020, P-021, P-022, P-023, P-042, P-043, P-044, P-045, P-046, P-064, P-068, P-069, P-103, P-104, P-108, P-109, P-110, P-111, P-112, P-114, P-115, P-116, P-131, P-152, P-153, P-155, P-156, P-158, P-160, P-162, P-163, P-164, P-167, P-168, P-169, P-171, P-174, P-177, P-183, P-185, P-186, P-187, P-192, P-193, P-196, P-199, P-002, P-201, P-204, P-205, P-206, P1-1to6, claude-research
- bulletin: 20261028-0100-boc.md through 20261101-0115-boc.md (14 entries)

## Worktree / branch
- Path: /Users/kosi/Desktop/wt/boc
- Branch: council/boc
- merge-base HEAD origin/council/base: d7a05a27 (verify with git merge-base HEAD origin/council/base)