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

## Current state (session end 2026-11-19T09:04Z, glyph)
- **Worktree:** `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, git common dir `/Users/kosi/Desktop/Football Sim/.git`.
- **Prior tip (VERIFIED):** `origin/council/glyph@64ebb926f4c63f9dfee358b0e34ac0906b4950e4` (2026-11-18 session). New tip = this session’s pushed commit (hash in final reply / `git rev-parse HEAD`).
- **Published this session (Owner request; commit pushed to `council/glyph`):**
  - `_agents/glyph/deliveries/67-cakepanz-10-2026-11-19/` — verbatim copy of `/Users/kosi/Desktop/Football Sim/67-cakepanz-10-2026-11-19` (52 files, 1.8M). VERIFIED: Desktop vs `wt/beam` copy `diff -rq` no differences; `CHECKSUMS.txt` md5 49/49 ok; START ×3 `5e5ed7c9c3ce4afc3a8bc1f2487a345e496ad9b06e85a0eeaef40c1f25e935b9`; `.gitignore` ×2 `f27658cc…`; shipped `dist/single.html` `76de5658…` (unreleased working build); manifests 314/319. Prepared tree in-package is metadata/docs-only (no `src`/`dist`/`batteries`) — prepared code claims REPORTED from this copy.
  - `inbox/20261119-0904-glyph-cakepanz-10-review.md` — thorough review (integrity table, Part 0 source/receipt inspection: D1 keepWeek S29b, D2/L7b 390px tooltip/tap fix, D3 aria-hidden, D5.3 single brand; gate/k1/cite-check/item-5 readout; implications; UI/UX-shell brainstorm for Claude’s engine). Z.ai relay treated REPORTED; execution claims not rerun.
- **Key findings (this session):** Part 0 anchors present in shipped sources and sampled probe receipts coherent (S29b 3 boots hub+week key, L7b 6 rows tip hidden 0px + 12/12 chip hits + scrollW=390, rendered-state single brand/aria-hidden/in-flow method). Fence spot-check clean in patched files. Cite-check log shows unresolved 0 but a `COUNT L7b all chips hit chip: 0` counter anomaly vs probe data (hygiene flag). Suites/gates not rerun by glyph.
- **Owner directive (FACT, 2026-11-18, still applies):** prioritize finishing engine and shipping over super-aligned sim-vs-historical tuning; defer deep historical-alignment/value-tuning to post-ship unless required for correctness/acceptance.

## Prior published (2026-11-18, VERIFIED pushed)
- `e27df3d9` cakepanz-8 delivery, `a0a127ba` cakepanz-8 review, `bf437466` cakepanz-8 synthesis, `5a419203` inkling hier/drift review, `64ebb926` bulletin/board directive.

## Open gaps / next session needs
1. **Priority lens:** take queue-driven work from `origin/council/muse` (`node ./.council_tool.mjs next`) biased toward engine-completion/shipping; defer non-blocking historical-accuracy tuning unless required for correctness/acceptance.
2. **Cakepanz-10 follow-ups (if taken, spec/Owner-gated where noted):** Owner accept/strike of Part 0 + release/cutover mechanics (unreleased `76de5658…` dist vs live artifact, re-zip/parity policy); confirm prepared-tree code/dist parity from full sources; consider `?seed=` dev seam (Architect) for deterministic UI batteries/goldens; address cite-check L7b counter hygiene if tooling touched.
3. **Not rerun by glyph (REPORTED/data-gated):** cakepanz-10 composites/batteries/gates/fresh-clone/5,104-row SHA256SUMS verification; item-5 interpretation (Architect). Deployment (gh-pages/make-live), prepared activation, Block C (R-13), copy/label rulings remain Owner/Architect decisions.

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
