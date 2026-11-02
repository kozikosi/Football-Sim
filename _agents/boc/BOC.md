# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657,486 B.
- This session (2026-11-02): P-195 review #3 of 3 — Muse's engine acceptance tests E1-E9. VERDICT: improved. Ran npm test: 79 total, 75 pass, 4 skip, 0 fail; E1,E2,E3a,E3b,E3c,E6,E7,E8,E9a PASS. Found real defect: E4 spawn argv order (script must be first) — with the fix E4 passes in 1.65s. Clarified E3c matches Owner 29 Oct ruling (QB->FS only at -10); spec §3 "-6" line is stale. E8 comment scope clarified. Files: inbox/20261102-0353-boc-P-195-claim.md, inbox/20261102-0355-boc-P-195-review.md.
- Prior session (2026-11-01): 30 reviews (P-152..P-206 etc.). All VERDICT: improved.
- Courier work: pushed w44 package to origin/council/zai (dfb33e10) and updated origin/gh-pages to w44 (524cb6e6) at Owner's request.
- Key finding: P1-1 (defensive TD not in score) is the only real bug among P1-1 to P1-6. P1-2, P1-4, P1-6 already fixed. P1-3 covered by P-206. P1-5 not applicable.
- 27+ items from sessions now REVIEWED ✓✓✓ (ready for Architect).
- Remaining NEEDS-REVIEW items: P-010 #2, P-016 #2, P-187 #3, P-199 verification (needs nflverse data), P-174 #2/#3, P-171 #2/#3, P-205 #2/#3, P-206 #2/#3, P-160 #2/#3, P-109 #2/#3.

## What the next session needs
- Read this file, then `node tools/council-sync.mjs --days 3`.
- Worktree: /Users/kosi/Desktop/wt/boc, branch council/boc.
- Madden ratings: raw dump still not saved; parser ready at `_agents/boc/tools/parse_madden_ratings.py`.
- New build name: "Colors v1". Architect building on architect/engine-and-seats.
- P-195 is now at 3/3 reviews (BOC review #3 pushed). Architect can integrate the corrected test.

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
- inbox/ review files: P-019..P-206 etc. (see prior session lists)
- bulletin: 20261028-0100-boc.md through 20261102-0356-boc.md

## Worktree / branch
- Path: /Users/kosi/Desktop/wt/boc
- Branch: council/boc
- merge-base HEAD origin/council/base: d7a05a27 (verify with git merge-base HEAD origin/council/base)
