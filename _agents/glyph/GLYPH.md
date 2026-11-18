# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.  
**Identity:** glyph (not retired; `_agents/RETIRED.txt` checked 2026-11-18).  
**merge-base (HEAD, origin/council/base):** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (VERIFIED 2026-11-18T23:18Z).

## BOOT — read this first, every session
1. `git fetch -q origin` then START-HERE §1 Step 0 (refresh governance docs from `origin/council/muse`): `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` must be clean, then `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`; confirm staged diff lists only those four. Until run, treat governance docs as REPORTED. Do not run `sync-base.sh`.
2. Read this file to the end and `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null`. If behind: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
3. Live queue/tool/docs on `origin/council/muse`: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete temp tool before push).
4. `node tools/preserve.mjs check`.

## Current state (session end 2026-11-18T23:18Z, glyph)
- **Worktree:** `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, git common dir `/Users/kosi/Desktop/Football Sim/.git`.
- **Tip (VERIFIED this session end):** `origin/council/glyph@64ebb926f4c63f9dfee358b0e34ac0906b4950e4` (HEAD == ls-remote before this end-of-chat commit).
- **Published this session (VERIFIED, pushed):**
  - `e27df3d99952f35b6fa661b15f5d0fb39c953759` — published `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/` (copy of `/Users/kosi/Desktop/Football Sim/67-cakepanz-8-2026-11-18`; 1006 files, no `node_modules`/.git inside). Pins reported/held: shipped `5c808472` (67 files), prepared `65673a00` (68 files, NOT ACTIVATED); GLM off; gh-pages fix not placed; Block C (R-13) not started.
  - `a0a127baeae2af398ca65db9c86db3953eec8813` — `inbox/20261118-2005-glyph-cakepanz-8-review-and-ideas.md` (thorough cakepanz-8 review + UI/UX ideas).
  - `bf437466172df051df63c954307575e480febc33` — `inbox/20261118-2205-glyph-cakepanz8-seats-synthesis.md` (cross-seat synthesis, consolidated findings, prioritized fixes/brainstorm).
  - `5a419203f0625fe82a0368b2e0e58bab868f5d5b` — `inbox/20261118-2235-glyph-inkling-hier-round-review.md` (Inkling hier/drift round review).
  - `64ebb926f4c63f9dfee358b0e34ac0906b4950e4` — `bulletin/20261118-2232-glyph.md` (Owner directive broadcast); board `INFO` to `ALL` posted (id `board_4e78811f-4218-433d-bf52-6c3374d87c22`, stored; no delivery/read/action guarantee).
- **Key findings (REPORTED unless noted):** cakepanz-8 A1/A2/Block B anchors and spot-checked receipts as in synthesis inbox (b1 engine diff clean; A2 red 46/1 S29, green 47/0; F0–F12/F0-late/F13-late died; gates PASS 314/319; fresh-clone ends green). Convergent nits: `simpleOff` not persisted/restored, simple-row detail affordance/copy, `syncFromHash()` bypasses router normalization, sort vs displayed rec number in simple mode, receipt tail-green/attempt gate, `Hub.svelte` week-class precedence. Cross-seat reviews seen: Inkling/Beam/Pickle verdict inboxes; Ernie/DS hosted copies without verdicts found. Inkling hier/drift (`ab5c3085`) vs Architect `5d018f52`,`ea48005c`: glyph verdict ok, nothing blocking (name-only diff empty, golden 2023-25 unchanged, datacheck 0/3/3 reproduced, CI run 44404129491 success).
- **Owner directive (FACT, 2026-11-18):** prioritize finishing engine and shipping over super-aligned sim-vs-historical tuning; defer deep historical-alignment/value-tuning to post-ship unless required for correctness/acceptance.

## Open gaps / next session needs
1. **Priority lens:** take queue-driven work from `origin/council/muse` (`node ./.council_tool.mjs next`) biased toward engine-completion/shipping; defer non-blocking historical-accuracy tuning (margins/sacks/lambda/GLM-vs-pool fine-tuning) unless required for correctness/acceptance.
2. **If continuing cakepanz-8 polish (render/receipt-layer only, no engine/pin moves):** persist/restore `simpleOff` with reload-covering law, fix simple-row detail affordance/copy, route `syncFromHash()` through `go()`/router normalization, align simple-mode sort vs displayed rec number, add receipt tail-green/attempt gate and parenthesize `Hub.svelte` week-class condition. Keep engine tree/pins untouched.
3. **Not rerun by glyph (REPORTED/data-gated, secondary per directive):** full cakepanz-8 browser/acceptance/fresh-clone suites; Inkling hier/drift full `npm ci && npm test` 419/419, tsc 89, build, totals-bar reruns, classpath execution, nflverse-dependent proofs. Deployment/policy (gh-pages fix, prepared activation, Block C R-13, late-mode threshold, etc.) remain Owner/Architect decisions.

## Live/relevant files
- `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/` — published cakepanz-8 copy + receipts.
- `_agents/glyph/inbox/20261118-2005-glyph-cakepanz-8-review-and-ideas.md`, `_agents/glyph/inbox/20261118-2205-glyph-cakepanz8-seats-synthesis.md`, `_agents/glyph/inbox/20261118-2235-glyph-inkling-hier-round-review.md` — this session’s reviews/synthesis.
- `bulletin/20261118-2232-glyph.md` — Owner directive broadcast (session bulletin).
- `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/cakepanz-4/src/App.svelte`, `src/lib/components/{BoardRow.svelte,DraftBoard.svelte,BoardFooter.svelte}`, `src/lib/screens/Hub.svelte`, `src/lib/port/hydrateApp.ts` — key cakepanz-8 UI/hydration anchors.
- `origin/council/inkling` (`ab5c3085`) and `origin/architect/engine-and-seats` (`5d018f52`, `ea48005c`) — hier/drift round refs reviewed.

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits.
- Work from live queue/docs on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.
