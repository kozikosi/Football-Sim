# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657,486 B.
- Session 26 Oct: reviewed 11 items (P-030, P-032, P-033, P-034, P-035, P-036, P-037, P-038, P-039, P-050, P-051). Verdicts: 6 improved, 5 ok.
- Session 28 Oct: recorded the Owner's 28 Oct message verbatim; appended intake-ledger mapping; filed two PRIORITY+ proposals. Reviewed P-019 (improved) and P-042 (improved).
- Session 28 Oct (cont. 2): reviewed P-020 (improved) and P-021 (improved). Ran targeted checks on z.ai w30 vs Pre-Colors (bulletin 20261028-0200-boc.md).
- Session 28 Oct (cont. 3): offered Z.ai's w31/w32 prompt as ~50 PRIORITY+ clusters (bulletin 20261028-0300-boc.md). Reviewed P-023 (improved). Pushed.
- Session 28 Oct (cont. 4): created Madden NFL 27 ratings parser + output location for Claude: `_agents/boc/tools/parse_madden_ratings.py` and `_agents/boc/data/madden27-ratings.csv` (header) + README. Pushed.
- Session 28 Oct (cont. 5): reviewed P-043 (improved: anchor #4 wrong, starsFaceoffHTML section missed). Pushed.
- Session 28 Oct (cont. 6): reviewed P-044 (ok). Pushed.
- Session 28 Oct (cont. 7): reviewed P-045 (improved). Pushed.
- Session 28 Oct (cont. 8): reviewed P-046 (ok). Pushed.
- Session 28 Oct (cont. 9): reviewed P-064 (ok). Pushed.
- Session 28 Oct (cont. 10): reviewed P-068 (ok). Pushed.
- Session 28 Oct (cont. 11): reviewed P-069 (improved). Pushed.
- Session 28 Oct (cont. 12): reviewed P-103 (improved). Pushed.
- Session 28 Oct (cont. 13): reviewed P-104 (improved). Pushed.
- Session 29 Oct: reported council/base vs e0f805a divergence (bulletin 20261029-0950-boc.md). Fast-forward not possible; Architect must merge. Pushed.
- Session 29 Oct (cont.): reviewed P-108 (improved). Pushed.
- Session 29 Oct (cont. 2): pushed w34 html and docs folder to zai's branch (council/zai @ a37038d9). Pushed.

## What the next session needs
- Read this file, then `node tools/council-sync.mjs --days 3`.
- Worktree: /Users/kosi/Desktop/wt/boc, branch council/boc.
- All reviewed items remain 0/3 or 2/3 on next.mjs (reviews not yet merged into council/base by the Architect). Do not re-review them.
- Candidate next items: P-071, P-072, P-073, P-074, P-075, P-076, P-077, P-078 (2/3, need review #3), or P-058, P-067, P-100, P-101 (1/3).
- Madden ratings: raw dump still not saved; parser ready at _agents/boc/tools/parse_madden_ratings.py. Populate when user provides raw.txt.
- New build name: "Colors v1" (renamed from V23). Architect building on architect/engine-and-seats. Integration plan at _agents/COLORS-V1-INTEGRATION-PLAN.md.
- council/base vs e0f805a divergence unresolved — Architect must merge.

## Open questions
- Whether the Architect will re-hash protected functions with SHA-256 and pin in MERGE-MANIFEST.md (P-038 recommendation).
- Whether team-colours.json brand entries for the 6 mismatched teams will be re-synced (P-034 recommendation).
- Whether Red Zone Efficiency (P-036 stat 10) should be dropped or scoped as sim-core work.
- Whether the Madden ratings raw dump will be saved and parsed.
- Whether the 9 interpretations in W33-INTAKE-LEDGER will be vetoed by the Owner.

## Live files
- `_agents/boc/BOC.md` (this file)
- `_agents/boc/tools/parse_madden_ratings.py`
- `_agents/boc/data/madden27-ratings.csv` (header only)
- `_agents/boc/data/README.md`
- `bulletin/20261028-0100-boc.md`, `bulletin/20261028-0200-boc.md`, `bulletin/20261028-0300-boc.md`, `bulletin/20261029-0310-boc.md`, `bulletin/20261029-0950-boc.md`, `bulletin/20261029-1000-boc.md`
- inbox claim/review files for P-019, P-020, P-021, P-022, P-023, P-042, P-043, P-044, P-045, P-046, P-064, P-068, P-069, P-103, P-104, P-108

## Worktree / branch
- Path: /Users/kosi/Desktop/wt/boc
- Branch: council/boc
- merge-base HEAD origin/council/base: d1e335e9 (verify with git merge-base HEAD origin/council/base)