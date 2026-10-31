# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657,486 B.
- Session 30 Oct (cont. 21): broadcast `nextjs-analysis` branch (7f949fad) to council via bulletin/20261029-2105-boc.md; pushed `football-sim-nextjs` + `football-sim-nextjs-main` folders to kozikosi/Football-Sim for comparative analysis (read-only).
- Session 30 Oct (cont. 22): reviewed P-131 (improved) — line ref errors, invented literals, reproducibility gap, product-choice separation, missing views, Owner-ruling conflict. Pushed inbox/20261030-1000-boc-P-131-review.md.
- Session 30 Oct (cont. 23): research deliverable for Claude's council requests — NFL playoff seeding & tiebreakers (verified, nfl.com), 17-game schedule rules (verified, nfl.com football-operations), late-game pass/run table (UNKNOWN), 4th-down/2-pt/onside rates (UNKNOWN), final-score/OT distributions (rough, UNVERIFIED), CPU draft behavior (UNKNOWN), 3-4 roster composition (deferred to Madden data), returner rating (proposed candidate formula, pending Owner approval). Pushed inbox/20261030-1030-boc-claude-research.md.
- Full history of sessions 14–20 (P-109–P-116 reviews) in prior lane versions; see git log of council/boc for review files.

## What the next session needs
- Read this file, then `node tools/council-sync.mjs --days 3`.
- Worktree: /Users/kosi/Desktop/wt/boc, branch council/boc.
- Candidate next items: P-117, P-118, P-119, P-120, P-121 (2/3, need review #3), or P-058, P-067, P-100, P-101 (1/3), or any new top-of-list item from `node tools/next.mjs`.
- Madden ratings: raw dump still not saved; parser ready at `_agents/boc/tools/parse_madden_ratings.py`. Populate when user provides raw.txt.
- New build name: "Colors v1". Architect building on architect/engine-and-seats.
- council/base moved to d7a05a27 (synced this session); merge-base updated.

## Open questions
- Whether the Architect will re-hash protected functions with SHA-256 and pin in MERGE-MANIFEST.md (P-038 recommendation).
- Whether team-colours.json brand entries for the 6 mismatched teams will be re-synced (P-034 recommendation).
- Whether Red Zone Efficiency (P-036 stat 10) should be dropped or scoped as sim-core work.
- Whether the Madden ratings raw dump will be saved and parsed.
- Whether the 9 interpretations in W33-INTAKE-LEDGER will be vetoed by the Owner.
- Whether `foilShimmer` or `textShimmer` becomes the canonical keyframe name (P-111 recommendation: `foilShimmer`).
- Whether fonts ship as base64 or system-serif fallback (P-111: single-file constraint; Owner decides).
- Whether P-115's OT games should be capped at 60s or allowed to 75s (Owner said 30-60s).
- Whether P-116's visual review fully replaces `game.summary` text or keeps it for the narrative paragraph (recommended: keep for narrative).
- Whether Claude's returner rating candidate formula (SPD-heavy) is approved by the Owner.

## Live files
- `_agents/boc/BOC.md` (this file)
- `_agents/boc/tools/parse_madden_ratings.py`
- `_agents/boc/data/madden27-ratings.csv` (header only)
- `_agents/boc/data/README.md`
- `bulletin/20261028-0100-boc.md`, `bulletin/20261028-0200-boc.md`, `bulletin/20261028-0300-boc.md`, `bulletin/20261029-0310-boc.md`, `bulletin/20261029-0950-boc.md`, `bulletin/20261029-1000-boc.md`, `bulletin/20261029-1010-boc.md`, `bulletin/20261029-2013-boc.md`, `bulletin/20261029-2055-boc.md`, `bulletin/20261029-2105-boc.md`
- inbox claim/review files through P-131 (P-019, P-020, P-021, P-022, P-023, P-042, P-043, P-044, P-045, P-046, P-064, P-068, P-069, P-103, P-104, P-108, P-109, P-110, P-111, P-112, P-114, P-115, P-116, P-131) plus claude-research

## Worktree / branch
- Path: /Users/kosi/Desktop/wt/boc
- Branch: council/boc
- merge-base HEAD origin/council/base: d7a05a27 (verify with git merge-base HEAD origin/council/base)