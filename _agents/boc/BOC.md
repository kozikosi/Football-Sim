# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- This session (25 Oct): five review #1s of Beam's P0/P1 work, all against `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c…`, 657,486 B). Verdicts all "improved":
  - P-001 (homepage): `inbox/20261025-0352-boc-P-001-review.md` — palette must default to rose (not KC red); size 10435 B > 10 KB; floaty text/labels remain; title/og:title not addressed.
  - P-003 (theme tokens): `inbox/20261025-0400-boc-P-003-review.md` — contrast table inflated (#b8941f = 2.68 not 4.2); `--accent2` redefinition breaks orange semantics; hard-coded #ffc43c/#6aa6ff untouched.
  - P-005 (draft board): `inbox/20261025-0420-boc-P-005-review.md` — occurrence count 7/6 not 6/5; grid not adjusted; `currentRound` undefined (ReferenceError); gold fallback wrong.
  - P-009 (Position Rankings): `inbox/20261025-0430-boc-P-009-review.md` — DLCB `n:8 → 6` missing (Owner ruling); pluralization list incomplete; count 62 not 60.
  - P-010 (draft copy/layout): `inbox/20261025-0440-boc-P-010-review.md` — items 6/9 lack exact anchors; prefix/label wording ambiguous.
- Earlier (23 Oct): game-ball tie-break verification note `_agents/boc/notes/game-ball-tiebreak-verification.md`; P-006 review IMPROVED; P-002 brand inventory.
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657,486 B.

## What the next session needs
- Read this file, then `node tools/council-sync.mjs --days 3` (reviews above are on `council/boc`).
- Worktree: `/Users/kosi/Desktop/wt/boc`, branch `council/boc`.
- Run preservation gate first: `git fetch -q origin; node tools/preserve.mjs check` (exit 1 from other worktrees is expected, not mine).
- Next review candidates per `node tools/next.mjs`: P-011, P-012, P-013, P-014… (P-001/P-003/P-005/P-009/P-010 now at 1/3 each; need two more reviewers each).
- Lint selftest still UNVERIFIED on this machine (exit 3 nested root config).

## Open questions
- P-003 (theme tokens) rework still open; P-005 (draft board) rework open; both P0.
- Whether 0-penalty flexes count as "shown" in P-005's flex-gating (Owner wording ambiguous).
- Whether slot identifiers (MIKE, WILL, SAM, FS, SS, CB1…) should be pluralized in P-009 (Owner wording ambiguous).

## Live files
- `_agents/boc/BOC.md` (this file)
- `_agents/boc/notes/game-ball-tiebreak-verification.md`
- `inbox/20261025-0328-boc-P-006-review.md`
- `inbox/20261025-0345-boc-P-002-work.md`
- `inbox/20261025-0352-boc-P-001-review.md`
- `inbox/20261025-0400-boc-P-003-review.md`
- `inbox/20261025-0420-boc-P-005-review.md`
- `inbox/20261025-0430-boc-P-009-review.md`
- `inbox/20261025-0440-boc-P-010-review.md`
- `bulletin/20261025-0355-boc.md` (prior session)

## Worktree / branch
- Path: `/Users/kosi/Desktop/wt/boc`
- Branch: `council/boc`
- merge-base HEAD origin/council/base: `29e2f4def704262a931a95c244151c67012aa13a`