SPEAKER: beam | ROLE: council seat | TASK: answers to 76Pancakes cutover council ask 2026-11-22 | DATE: 2026-11-22T17:35Z
FOR: 76Pancakes cutover council ask 2026-11-22

## 1 · Ship-first vs move-first?
Position: ship-first-then-move (Claude's recommendation, hy4's too). Why: the Worker, D1 and `workers.dev` hostname are repo-independent (V: wrangler.jsonc has no git/repo field; `name: "play"`, D1 id `REPLACE_AT_CREATE`, cron `17 3 * * *`). Moving repos mid-close-out risks disrupting the S15 seal/composite flow and the side-by-side captures; shipping from the current repo keeps the receipts chain intact. Move-first-then-ship delays the first public release for no engineering benefit. What would change my mind: Owner ruling that the first public release must come from a clean repo (valid, longer wait). Owner call (go-live vs cutover order is U in Claude's manifest §1). Blocked: nothing — the runbook merge + rehearsal + "go" are the real blockers, not the repo.

## 2 · `council/gh` vs `council/GH` case-pair?
Position: keep `gh`, drop `GH` (agree with Claude). Why: a case-insensitive filesystem cannot hold both; keeping both forces every clone onto a case-sensitive filesystem. `gh` is the one the seat actually uses (V: origin/council/gh exists; origin/council/GH is a forced-update ghost). Dropping GH costs nothing — it's a case-variant duplicate. What would change my mind: evidence that GH carries unique commits not in gh (I'd want `git log --oneline GH ^gh` to be empty before dropping). Owner/Architect call (seat confirms; Claude defaults). Blocked: nothing.

## 3 · Exhibit update timing?
Position: later/separate (not in the inauguration commit). Why: the Exhibit (w74 generator) reads refs by name against the old repo (R pickle); updating it in the inauguration commit couples a provenance-display change to the most risk-laden commit of the cutover. Keeping it separate means the inauguration commit's receipt (byte-identical crossing set) stays clean and auditable. What would change my mind: Owner wants the Exhibit to show the new repo from day one (valid; would add one file to the crossing set). Owner call (Exhibit timing is U in §7). Blocked: nothing.

## 4 · Cutover-manifest concerns?
No blocker found. What I checked:
- Two-queue divergence (M-0): Claude's finding (94 IDs only in PRIORITIES.md, 139 only in QUEUE.md, P-296 not in PRIORITIES.md) is consistent with my own experience — MUSE's QUEUE.md is what seats actually run (`council.mjs` v11 reads QUEUE.md). The reconciliation (retire/refile/mark dead) is the right shape; MUSE owns it. Not a blocker, just sequencing.
- "No history mirror" + Option A: Claude's §3 argument holds — state travels, history stays. The provenance table (new path, old path, old commit) in `_agents/ARCHIVE.md` is the right mechanism. I agree.
- Content-hash pin/CI conversion: the `65673a0` fetch in ci.yml must become a committed fixture or content hash before inauguration (Claude's pin-watch change). This is a hard prerequisite but it's identified and owned (Architect). Not a blocker if done before commit 0.
- Hiding ratings data: Owner's ruling (hide `madden27-ratings.csv` until specific ruling/NOTICE) is clear and Claude's manifest respects it (§1 "Decide before the first push"). No concern.
- One minor note: the 45 root `.md` files freeze in the old repo but `claude/` crosses — make sure the inauguration commit's crossing-set list in ARCHIVE.md explicitly names which root `.md` files cross vs freeze, to avoid ambiguity at audit time. Not a blocker.

EVIDENCE: V = read Claude's manifest this sitting (commit `0dc2a5d`); R = Claude's findings and Owner rulings relayed by pickle; I = reasoning above. NOT RUN: git ls-remote counts, byte checks, or CI execution.
