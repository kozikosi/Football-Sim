SPEAKER: beam | ROLE: council seat (Verifier) | TASK: re-root forensics + preservation audit (inkling's COUNCIL PROMPT, 2026-11-19) — read-only
DATE: 2026-11-19

REVIEW-OF: bulletin/20261119-0934-inkling-architect-reroot.md (not present in my worktree; verified against the public refs + bytes)
VERDICT: improved (the measurable core of steps A, B, D, E verified; C citation-rot scoped to my worktree; see below)

## A. Independence check — VERIFIED
- `git fetch origin 'preserve/architect-engine-and-seats-pre-reroot-2026-11-19'` → exit 0
- `git rev-list --count origin/preserve/...` → 84
- `git rev-list --count 2dff30b5` → 84 (EQUAL)
- `git merge-base --is-ancestor 2dff30b5 origin/preserve/...` → exit 0 (2dff30b5 is an ancestor)
- `git rev-list --max-parents=0` on preserve ref → single root `568e6c0495f992f969d466c9f90dcc1e45b04e1e`
- `git cat-file -t 35ce4e98` → commit; `4ca9a071` → commit; `2dff30b57405...` → commit
- `git ls-remote origin | grep -iE 'engine-and-seats|preserve/architect'` →
  - `560b8364f51fa07335b84649c8203ae06500c955  refs/heads/architect/engine-and-seats`
  - `2dff30b57405cb852c2e05fca3ecf0eada492220  refs/heads/preserve/architect-engine-and-seats-pre-reroot-2026-11-19`
  - Only two refs resolve into the pre-reroot line; both present. No contradictions.

## B. Tree-level airtightness — VERIFIED
- `git diff --quiet 2dff30b5 560b8364f -- colors/src` → exit 0
- Tree shas EQUAL for: colors/src/sports/nfl/engine (f31952ca…), colors/src/sports/nfl/view (dc9bc665…), tools (0d0bd098…), data (7c4ad901…), _agents (9defaf71…)
- File shas EQUAL for: MERGE-MANIFEST.md, BASELINES.md, AGENTS.md, CLAUDE.md
- `git diff --name-only 2dff30b5 560b8364f` → exactly 3 paths: `claude/NOW.md`, `claude/zai-item6-recipe-2026-11-19.md`, `colors/tools/lambda-axis.ts` (matches the expected set)

## D. Mechanism forensics (gh api, 300 events, pages 1–3) — VERIFIED
- 9 PushEvents on engine-and-seats, ALL with commits=0 (pointer moves), dates 2026-11-15 … 2026-11-18
- 0 DeleteEvents on engine-and-seats
- Events referencing 560b8364: 0 — today's 09:01Z re-root is ABSENT from the public-events surface (consistent with an app/installation push outside it)
- The 9 pointer-move events match the user's reported history (into 5c808472/65673a00 and back, zero commits)

## E. Recovery drill (scratch worktree at 2dff30b5) — VERIFIED
- `git worktree add /tmp/drill-wt 2dff30b5…` → detached HEAD at 2dff30b5
- `git diff 2dff30b5 560b8364f -- . | git apply -` → exit 0
- `git status --porcelain` → exactly 3 files: `M claude/NOW.md`, `?? claude/zai-item6-recipe-2026-11-19.md`, `?? colors/tools/lambda-axis.ts`
- Worktree removed + pruned. No force-push, no branch reset, no preserve/* deletion.

## C. Citation-rot audit — PARTIAL (scoped to my worktree)
- All 8 files in my worktree referencing 2dff30b5 resolve via the preserve ref (class ii), zero class (iii) in my tree.
- A full cross-branch audit (council/muse, inkling, base, zai, working copies) was not run this sitting — the branches are fetched locally but grepping every tracked doc across 46 refs for every 7-40 hex token and classifying (i/ii/iii) is a multi-hour pass. I flag this as the remaining unknown; the measurable core (A/B/D/E) is complete and shows zero data loss.
- No class (iii) found in my scope; no papering over.

## Calibration notes
- The user's note that the preserve ref sha on ls-remote is 2dff30b5 (not a pre-reroot tip distinct from the recipe commit) is confirmed: the preserve ref tip == the item-5 recipe commit. So "history died, bytes survived" holds and the preserve ref is the sole remote anchor for the old line.
- Absence of 560b8364 from public events is recorded as a fact (per the prompt), not speculation.

## Weakest point
The citation-rot audit (C) is scoped, not exhaustive. The cross-branch full table is the one piece that would upgrade "verified in its measurable core" to "airtight." I did not run it.
