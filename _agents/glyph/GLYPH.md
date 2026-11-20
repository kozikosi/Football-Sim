# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.  
**Identity:** glyph (not retired; `_agents/RETIRED.txt` checked 2026-11-20).  
**merge-base (HEAD, origin/council/base):** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (VERIFIED 2026-11-20T02:29Z).  
**Last pushed tip before this session-end commit:** `14672ff9bb092252185751b14dcd51672b768285` (ls-remote verified 2026-11-20).

## BOOT — read this first, every session
1. `git fetch -q origin` then START-HERE §1 Step 0 (refresh governance docs from `origin/council/muse`): `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` must be clean, then `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`; confirm staged diff lists only those four. Until run, treat governance docs as REPORTED. Do not run `sync-base.sh`.
2. Read this file to the end and `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null`. If behind: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
3. Live queue/tool/docs on `origin/council/muse`: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete temp tool before push).
4. `node tools/preserve.mjs check`.

## Current state (session end 2026-11-20T02:29Z, glyph)
- **Worktree:** `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, git common dir `/Users/kosi/Desktop/Football Sim/.git`.
- **Published this session (VERIFIED, pushed):** `_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` (23 files) copied from `/Users/kosi/Desktop/Football Sim/z-post-blue-docs-update-2026-11-19-v3-sitting` (`diff -rq` clean; `md5sum -c CHECKSUMS.txt` 22/22 OK; repair `slice1-battery.json` 6418 B md5 `0a286953…` sha256 `3e6476de…`). Review: `inbox/20261119-2251-glyph-z-post-blue-docs-update-2026-11-19-v3-sitting-review-and-ideas.md` (integrity + task-by-task assessment: repair/doc-fixes sound but host apply must be atomic per byte-state incl. manifest hash lines; C′1 ring on parsed display, needs raw/suggestion export; seed/aria gaps; vapor closed REPORTED-from-Ernie; cakepanz/UI-UX shell brainstorm for Claude engine). Commit `14672ff9b…`, `origin/council/glyph` ls-remote matched.
- **Other-seat v3-sitting reviews (VERIFIED found, read):** Ernie `origin/council/ernie@1527b5df1` — `inbox/20261119-2258-ernie-zai-v3-sitting-review.md` (verdict improved; F1 attribution/citation, F2 generic raw-sort/suggestion, F3 reorder one-click before export, F5/F6/F7/F8, strong byte reproductions) + `-2305-ernie-cakepanz-shell-innovation-v3.md`. Pickle `origin/council/pickle@43135cba5` chain — `inbox/20261119-2252-pickle-P-287-v3-sitting-review.md` (improved; D1 FIX-NOTES patch cwd/path, D2 hosted-c9 byte-truth misclassified — glyph verified hosted c9 shipped+prepared dists `670d4c08…`/527177 B on pickle; R1 root cause `draftBoard.ts` strips `_w/_p` at return — glyph verified locally) + `P-345-v3-shell-implications.md` + bulletin. No other v3-sitting review files found on scanned council branches (beam 2300/2345 are cakepanz-10/item-6 adjacent, not v3-sitting package reviews).
- **Architect update checked (VERIFIED remote):** `origin/architect/engine-and-seats` tip `da0cf927e7159607dcc44329125d3cae593ebf08` — S3 `colors/src/core/snapshot.ts`, S4 additive `dispatchAsync`/`selectBoardAsync`, item-6 read/decision in `claude/NOW.md` (lambda stays 0, GLM off, no pack/default changes; NEXT per-offense `passGap`). Tests 427/427, tsc 89/89 and push mechanics beyond final state REPORTED by Architect.
- **Reroot audit (from prior session, still pending completion):** reroot refs/claims partially mapped (`560b8364f` vs preserve `2dff30b5`, diff scope noted); full C/D evidence receipt not filed/pushed.

## What next session needs
1. **Default (policy):** refresh governance from `origin/council/muse`, run `node ./.council_tool.mjs next`, take highest-value engine-completion/shipping work/review you can do well (defer non-blocking historical tuning).
2. **If Owner/relay acts on v3-sitting:** corrections to carry before onward relay — Pickle D1 (patch invocation context), Pickle D2 (report §10.2 hosted-c9 classification/consistency), Ernie F1 (cite measured dist/source accurately). Host application must be atomic per matching byte-state (repair/doc files + manifest hash lines per FIX-NOTES/REMEDY).
3. **Cakepanz/UI-UX (Architect-gated where noted):** `?seed` seam, non-tautological suggestion invariant, one-click suggested draft with explicit slot+undo (w89 affordance), engine/view suggestion contract or raw sort key (VM currently strips `_w/_p`), `aria-describedby` row↔detail, ALL-CAPS stats labels at cutover.
4. **Optional follow-ups if directed:** complete reroot audit receipt (A–G with command tails) and/or glyph-side note on v3.2/v3.3 H5 handling (do not edit other seats’ branches).

## Open questions / blockers
- No active blockers. v3-sitting host fixes/application and any engine-view export/re-pin are Owner/Architect decisions/actions.
- Public reroot evidence coverage previously limited (events API pagination 422 at p4) — treat full 14-day coverage as unproven unless re-fetched.

## Live files
- `_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` (23 files) + `inbox/20261119-2251-glyph-z-post-blue-docs-update-2026-11-19-v3-sitting-review-and-ideas.md` (pushed @14672ff9b).
- `_agents/glyph/deliveries/67-cakepanz-10-2026-11-19/` + `inbox/20261119-0904-glyph-cakepanz-10-review.md`.
- `bulletin/20261120-0229-glyph.md` (this session).
- Other-seat refs (remote, read-only): `origin/council/ernie:inbox/20261119-2258-ernie-zai-v3-sitting-review.md`, `-2305`; `origin/council/pickle:inbox/20261119-2252-pickle-P-287-v3-sitting-review.md`, `P-345`; `origin/architect/engine-and-seats@da0cf927e`.

## Local pending (not committed)
- Untracked dirs left as-is (pre-existing, not added): `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/`, `_agents/glyph/deliveries/67-cakepanz-8.1-2026-11-18/`.

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits.
- Work from live queue/docs on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.
