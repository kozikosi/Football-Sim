# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.  
**Identity:** glyph (not retired; `_agents/RETIRED.txt` checked 2026-11-19).  
**merge-base (HEAD, origin/council/base):** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (VERIFIED 2026-11-19T18:12Z).

## BOOT — read this first, every session
1. `git fetch -q origin` then START-HERE §1 Step 0 (refresh governance docs from `origin/council/muse`): `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` must be clean, then `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`; confirm staged diff lists only those four. Until run, treat governance docs as REPORTED. Do not run `sync-base.sh`.
2. Read this file to the end and `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null`. If behind: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
3. Live queue/tool/docs on `origin/council/muse`: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete temp tool before push).
4. `node tools/preserve.mjs check`.

## Current state (session end 2026-11-19T18:12Z, glyph)
- **Worktree:** `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, git common dir `/Users/kosi/Desktop/Football Sim/.git`.
- **Tip before this close commit:** `9539341cd13c0e54df98ba6e1f9fc4747b0ea65b` (`origin/council/glyph`) — “glyph: publish 67-cakepanz-10-2026-11-19 package copy and thorough review”.
- **Published (2026-11-19, pushed):** `_agents/glyph/deliveries/67-cakepanz-10-2026-11-19/` (52 files, 1.8M; Desktop vs wt/beam `diff -rq` clean; CHECKSUMS 49/49; START×3/`.gitignore`×2/dist hashes as in review) and `inbox/20261119-0904-glyph-cakepanz-10-review.md` (integrity + sampled Part 0 receipts D1/S29b,D2/D3/L7b,D5.3; UI/UX-shell brainstorm for Claude engine; suites/gates not rerun by glyph = REPORTED/data-gated).
- **Reroot audit progress (VERIFIED, not yet filed as receipt):** `origin/architect/engine-and-seats=560b8364f51fa07335b84649c8203ae06500c955` (parentless, count 1) vs `refs/heads/preserve/architect-engine-and-seats-pre-reroot-2026-11-19=2dff30b57405cb852c2e05fca3ecf0eada492220` (count 84, ancestor of preserve; `merge-base --is-ancestor 2dff30b5 preserve` EXIT:0). `git diff 2dff30b5 560b8364f` = `claude/NOW.md`, `claude/zai-item6-recipe-2026-11-19.md`, `colors/tools/lambda-axis.ts` (113 ins / 2 del); key engine/view/tools/manifest trees identical. Throwaway drill: `git diff 2dff30b5..560b8364f | git apply` clean (3 paths). Key shas: `560b8364` on current architect branch; `2dff30b5/35ce4e98/4ca9a071` resolvable but only via preserve ref (not ancestors of reroot tip). Public events p1-3: PushEvents for `architect/engine-and-seats` only (`02eebdfd..1ffb1ef4`, `5c808472..f9991424`, `db33bfa0..5c808472`, `f9991424..65673a0`, `39a91a43..b584d730`, `7828d914..db33bfa0`, `d71a5e2c..9acf1992`, `b584d730..7828d914`, `7a0706df..9c3a7701`); no `560b8364f`; no Delete/Create found p1-3; p4 returned 422 pagination limit (REPORTED partial).
- **v3.2 correction prompt (blocked for requested filing):** source `3d0ac76f:deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` (v3.1). `origin/council/inkling` now has v3.3 stating v3.2 corrections stand; glyph cannot edit inkling branch/file. H5 basis: `origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts:61` strips `_w/_p` (per `origin/council/orcaink:inbox/20261119-0730-orcaink-v3.1-h5-correction.md`).

## What next session needs
1. **Reroot audit (Owner-prompted, priority):** complete C (citation-rot table `file:line | sha | class i/ii/iii` across requested scopes: `origin/council/muse`, `origin/council/inkling`, `origin/council/base`, `origin/council/zai`, in-repo working copies, own receipts; count iii) and D (public events quality/coverage, 14-day pages 1-4 if accessible; note `560b8364f` absent if not found). Write `inbox/<UTC>-glyph-arch-reroot-audit.md` (sections A–G, verbatim commands/tails, VERIFIED/REPORTED, contradictions if any). Add/commit/push by specific path(s).
2. **v3.2 handling:** do not overwrite other seats’ work; if Owner wants glyph-side artifact, produce advisory corrected copy/diff receipt on `council/glyph` referencing inkling v3.3 and `3d0ac76f`.
3. **Queue work (policy):** when not on explicit Owner audit, take from `origin/council/muse` (`node ./.council_tool.mjs next`) biased toward engine-completion/shipping; defer non-blocking historical-accuracy tuning unless required for correctness/acceptance.

## Open questions / blockers
- Reroot audit receipt not completed/pushed (incomplete C/D evidence). Public events API pagination limited at page 4 (422) — cannot claim full 14-day coverage beyond retrieved pages.
- v3.2 cannot be “filed” into inkling-owned brief by glyph; needs Owner/author decision.
- Untracked local dirs (not committed, left as-is): `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/`, `_agents/glyph/deliveries/67-cakepanz-8.1-2026-11-18/`.

## Live files
- `_agents/glyph/deliveries/67-cakepanz-10-2026-11-19/`, `inbox/20261119-0904-glyph-cakepanz-10-review.md` — cakepanz-10 package + review.
- `bulletin/20261119-1812-glyph.md` — this session-end bulletin.
- Prior reviews: `inbox/20261118-*`, `inbox/20261119-0{106,235,327,332,335,420,530,625,635}-glyph-*`.
- Reroot refs (remote): `origin/architect/engine-and-seats@560b8364f`, `origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19@2dff30b574`.

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits.
- Work from live queue/docs on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.
