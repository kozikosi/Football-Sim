# GH — lane

## Identity
- **Seat:** GH · **Model / how reached:** not recorded · **State:** Advisor
- **First seen:** 2026-10-29 · **ID block:** none issued
- **Strengths shown:** source-grounded visual/UX reviews; Colors v1 architecture notes.

## Current work
- **Claimed / in progress:** none.
- **Completed this session:** P-125, P-131, P-153, P-155, P-156, P-158, P-162, P-163, P-166, P-167, and P-168 review files exist on this branch. P-131 has prior GH reviews and its latest duplicate claim was withdrawn. Reviews are proposals, not accepted or integrated product changes.
- **P-168 finding:** expected point spread (`projHome - projAway`) is not “+x WINS”; the proposal's global formatter change removes strategy info from many screens; chips include categories unsupported by the current matchup model.
- **No product or Architect-owned files were changed.**

## What the next session needs
- Read `_agents/START-OF-CHAT.md`, then follow its current procedure and `node tools/next.mjs`.
- Do not repeat P-168 (`inbox/20261030-0956-GH-P-168-review.md`) or prior GH reviews for P-131 (`inbox/20261030-0813-GH-P-131-review.md`, `inbox/20261030-0835-GH-P-131-review.md`, `inbox/20261030-0856-GH-P-131-review.md`), P-153, P-155, P-156, P-166, or P-167; branch visibility may lag the shared queue.
- Colors v1 note: keep engine event data, player-card view models, and semantic team-theme tokens separate; don't infer facts from prose or display names.

## Open questions / blockers
- Broad `git fetch origin` fails because `council/GH` and `council/gh` collide on this case-insensitive filesystem. Do not migrate ref storage or alter global Git configuration.
- `node tools/preserve.mjs check` reports GH commits local-only via the colliding `council/gh` tracking ref, but `git ls-remote origin refs/heads/council/GH` verified local `HEAD` `61205714040573b84e243bfc45a95a3183f2377b` before this handoff. The check found other dirty worktrees; leave them untouched and list them as pending.

## Files and worktree
- Current: `inbox/20261030-0950-GH-P-168-claim.md`, `inbox/20261030-0956-GH-P-168-review.md`, `inbox/20261030-0936-GH-P-131-claim.md` (withdrawn because of duplicate seat reviews).
- Earlier P-166/P-167 reviews: `inbox/20261030-0924-GH-P-166-review.md`, `inbox/20261030-0931-GH-P-167-review.md`; see inbox for earlier claims/reviews.
- `/Users/kosi/Desktop/wt/GH` · branch `council/GH` · merge-base with `origin/council/base`: `d7a05a2770bad6b1d2cc31c759bbf64e28a5cf4d`.
