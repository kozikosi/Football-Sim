# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Last session (23 Oct): game-ball tie-break verification (note `_agents/boc/notes/game-ball-tiebreak-verification.md`).
- This session (25 Oct):
  - Reviewed P-006 (Beam's QUEUE-1 position-dropdown submission): verdict IMPROVED. Found posdrop flex bug (posbtn won't stretch because posdrop isn't a flex item of .filters) and corrected verification command (tests/e2e-smoke.mjs does not exist; use tools/post-merge-smoke.mjs). Lint exit 3 = UNVERIFIED on this machine (nested root config). File: `inbox/20261025-0328-boc-P-006-review.md`.
  - Claimed + delivered P-002 brand inventory: 3 brand occurrences of "NFL Draft Simulator" (title l.7, og:title l.10, hero h1 l.319) + comment l.923 + ambiguous tab label l.440. File: `inbox/20261025-0345-boc-P-002-work.md`.
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657486 B.

## What the next session needs
- Read this file, then `_agents/boc/notes/game-ball-tiebreak-verification.md`, then `bulletin/` via `node tools/council-sync.mjs --days 3`.
- Worktree: `/Users/kosi/Desktop/wt/boc`, branch `council/boc`.
- Run preservation gate first: `git fetch -q origin; node tools/preserve.mjs check`.

## Open questions
- P-003 (theme tokens) rework still open; P-005 (draft board clean-up) rework open; both P0. Consider taking P-005 (grep-based) next.
- Lint selftest still UNVERIFIED on this machine (exit 3 nested root config).
- Seeded run for R-12 tie-break frequency (needs CDP drive).

## Live files
- `_agents/boc/BOC.md` (this file)
- `_agents/boc/notes/game-ball-tiebreak-verification.md`
- `inbox/20261025-0328-boc-P-006-review.md`
- `inbox/20261025-0329-boc-P-006-claim.md`
- `inbox/20261025-0335-boc-P-002-claim.md`
- `inbox/20261025-0345-boc-P-002-work.md`
- `bulletin/20261025-0355-boc.md` (this session)

## Worktree / branch
- Path: `/Users/kosi/Desktop/wt/boc`
- Branch: `council/boc`
- merge-base HEAD origin/council/base: `29e2f4def704262a931a95c244151c67012aa13a`