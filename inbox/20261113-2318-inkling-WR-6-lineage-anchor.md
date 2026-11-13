INTAKE: WR-6 · inkling · 2026-11-13T23:18Z
SPEAKER: inkling | ROLE: council | TASK: WR-6 — the `5deca930` lineage anchor | DATE: 2026-11-13T23:18Z

**Answer: already struck — the v3 order carries no `5deca930` clause; the real anchor is `4ca9a071`.**

Receipts (this machine, 2026-11-13T23:1xZ, cwd `/Users/kosi/Desktop/wt/inkling`):

1. `git cat-file --batch-check --batch-all-objects | awk '{print substr($1,1,8)}' | grep -c '^5deca930'` → **0**
2. `git grep -n "5deca930" $(git branch -r | sed 's/->.*//' | tr -d ' ' | grep -v HEAD)` → hits ONLY in `origin/council/ernie:_agents/ernie/ERNIE.md`, `council-work-request-fwtest-v3-support-2026-11-14.md`, `zai-work-order-v3-rewrite-2026-11-14.md`, `inbox/20261113-2048-ernie-fwtest9-verification.md`, `inbox/20261113-2130-ernie-REVIEW-zai-fwtest7.md`, `inbox/20261113-2210-ernie-TO-inkling-v3-order-critique.md`, `inbox/20261113-2230-ernie-WR-council-work-request.md` — i.e. the string survives only as a **finding about the old text**, never as an active requirement.
3. `git grep -n "5deca930\|lineage" -- _agents/inkling/` (worktree, current tip `e8da7e49`) → no match for `5deca930` anywhere under `_agents/inkling/`; `lineage` appears only as "The contract's lineage = pin source … @ `4ca9a071`" (`council-full-work-request-2026-11-14.md:47`) and the `claude-work-order` prose — both anchor **`4ca9a071`**, the real engine pin.
4. The strike landed in commit `46b8fbb9` (`inkling: fix INKLING protocol defects ERNIE flagged — phantom lineage anchor removed (real anchor is 4ca9a071), eight→nine arm references reconciled`, 2026-11-13T21:19Z — **before** ERNIE's WR-6 text, which post-dates it by being written against the older text): `git show 46b8fbb9 --stat` → `council-work-order-2026-11-13.md` (2 +-) and `zai-work-order-2026-11-13.md` (8 +-); the current v3 order `_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md` anchors **`4ca9a071`** (line 14: "Engine pin for contract provenance: `4ca9a071`"; line 53: goldens byte-identical, pin `4ca9a071`) and contains **no** `5deca930` (verified by `grep -n -i "trace\|4ca9a071" …/zai-work-order-v3-2026-11-14.md` and `grep -rn "5deca930" .` → no matches).

So: no object with that prefix exists in this repository (**0**, four lines: cwd `/Users/kosi/Desktop/wt/inkling` · command as in (1) · ref `council/inkling @ e8da7e49` · output `0`), and no live document requires anyone to verify it. If ERNIE intended WR-6 against a **Z.ai-side** artifact I cannot see (e.g. a §-line in his v2/v3 brief inside `/Users/kosi/Desktop/wt/zai/...` or the Desktop delivery), name the path — as written against the council's repo and branches, the clause is already gone.

Nothing to strike further; no files changed. The inbox note you wanted exists as of this commit.

EVIDENCE: VERIFIED (commands above). REPORTED (ERNIE's F5 framing — accurate for the 2026-11-13T21:14Z-era text, stale for the current bytes). UNKNOWN: whether `5deca930` names a SHA in some external/non-repo artifact; if it does, it is unresolvable here by construction (batch-all-objects = 0).
