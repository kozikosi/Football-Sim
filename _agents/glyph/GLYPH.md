# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.  
**Identity:** glyph (not retired; `_agents/RETIRED.txt` checked this session).  
**merge-base (HEAD, origin/council/base):** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (VERIFIED 2026-11-18T19:38Z).

## BOOT — read this first, every session
1. `git fetch -q origin` then START-HERE §1 Step 0 (refresh governance docs from `origin/council/muse`): `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` must be clean, then `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`; confirm staged diff lists only those four. Until run, treat governance docs as REPORTED. Do not run `sync-base.sh`.
2. Read this file to the end and `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null`. If behind: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
3. Live queue/tool/docs on `origin/council/muse`: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete temp tool before push).
4. `node tools/preserve.mjs check`.

## Current state (session end 2026-11-18T19:38Z, glyph)
- **Worktree:** `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, git common dir `/Users/kosi/Desktop/Football Sim/.git`.
- **Orient (VERIFIED):** start-of-chat flow followed (`origin/architect/engine-and-seats:_agents/START-OF-CHAT.md`), `sync-base.sh` up to date with `council/base` (`864a6aa1`), glyph worktree clean in preserve check; read AGENTS/PROJECT-KNOWLEDGE (tail)/COUNCIL-BULLETIN (CURRENT ROUND)/V23-OWNER-REQUESTS/lane. `council.mjs` fetched from architect branch (236 lines); `node /tmp/council.mjs next` returned no actions (REPORTED).
- **Tip before this end-of-chat commit:** `origin/council/glyph@1f97d4569e8dd07e1007eb7b0711dc6141f9e4b0` (VERIFIED by local+ls-remote match at session end pre-commit).
- **Published this session (VERIFIED, pushed):**
  - `8c469c73e07564e0eaa0a2710ccb4ec27a49d1c4` — copied `/Users/kosi/Desktop/Football Sim/67-cakepanz-7-2026-11-18` (796 files, ~33M, no `node_modules`) to `_agents/glyph/deliveries/67-cakepanz-7-2026-11-18` and pushed `council/glyph`.
  - `1f97d4569e8dd07e1007eb7b0711dc6141f9e4b0` — `inbox/20261118-0804-glyph-verify-pinwatch-math-review.md` (MUSE-delegation verification of Architect pin-watch report; see below).
- **Reviews/verifications performed (read-only; claims labeled in filings/messages):**
  - Reviewed `67-cakepanz-7-2026-11-18` delivery (REPORTED by bundled receipts, inspected): Slice 3 hydration/N25-N26-N27, shipped pin `5c808472` + prepared `65673a00` (not activated), gates 311/316, shell 46/0, slice 29/0/10/3, falsifiers F0–F10 died, gh-pages fix staged/unplaced. Caveats: mixed `receipts/partF-c7/d1-fresh-clone-c7.log` vs “green end-to-end” claim, deployed 277/9 flex-expectation gap remains owner/architect-gated.
  - Reviewed other seats’ cakepanz-7 activity (VERIFIED via remote refs/trees): **Inkling** filed explicit review `origin/council/inkling@3d267765` `inbox/20261118-0745-inkling-cakepanz7-review.md` (`VERDICT ok — with nits`; live gh-pages still `66096fb` naming `4ca9a071`/52). **Beam** `3e74652b` and **Ernie** `ee8f39c9` hosted full copies (no cakepanz-7 verdict files found in searched paths); **Muse** posted cakepanz-7 prompts/planning only. No other cakepanz-7 verdict reviews found in fetched seat-tip scan.
  - Pin-watch promotion/live-catch checked locally: `origin/architect/engine-and-seats@1aa7fb3a` promotes `tools/pin-watch.mjs` byte-identical to `0bd76860`; CI self-test gate wired in `.github/workflows/ci.yml` (no continue-on-error, fetches `65673a00…`, runs `--self-test --pin 65673a00…`), GitHub run outcome UNKNOWN. Live `origin/gh-pages@66096fb1:67-cakepanz` (57 engine files): `--pin 4ca9a071` exit 3 (5 extra, 6 shared engine diffs + flex table differ), `--pin d3bd81d2` exit 0 / `--strict` exit 4 (README:4,9,11 + CHECKSUMS-slice1.txt:2,slice2.txt:2 name `4ca9a071`), `--pin 65673a00` exit 3 (11 missing, 9 content diffs; no `sports/nfl/sim/` in deployed tree). Self-test `ALL FIXTURES BEHAVE` (node v26.13.0). Filed `inbox/20261118-0804-glyph-verify-pinwatch-math-review.md` confirming Inkling corrections on Items 1–3 and Architect claims 4a/4b.
  - Architect pools-node update reviewed read-only: `origin/architect/engine-and-seats@57fb83c2` (down-preserving record hierarchy, oracle+TS+vectors/tests/report/NOW updated; `Pools.rec`/`recKeys`, no `recDown`; outcome-shaped `hier.test.ts` + planted `oldhier.ts`; replay pin moved; GLM default/sacks untouched; totals-vs-real and 2016–22 `clockLate`/`kick_digest` cause noted UNKNOWN). Tests/build not rerun.
  - Parallel-round prompts: Inkling `ed72c629` (`deliveries/council-parallel-round-cakepanz-8-2026-11-18.md`, §1 reflects v1/P-337+R-13) on `council/inkling`; Ernie `3dbb67fb` (`_agents/ernie/deliveries/prompts-2026-11-18/council-parallel-round-cakepanz-8.md`, v2 hygiene+P-316 fix scope, A1–A7/B1–B5/C corrections). CI runs `44266214860`/`44351214198`/`44262444359` all success (VERIFIED via `gh run view`). Recommendation (INFERRED): do not circulate both; treat Ernie `3dbb67fb` as canonical/carry supersession pointer (Inkling/MUSE/Owner action) — no posting action taken.
  - A5 datapoint: `node pin-watch.mjs --self-test --pin 65673a009b29035e8dc993279be656f12aa40a13` pass (node v26.13.0, scratch tool).

## Open gaps / next useful actions
- If needed, confirm remote tip for `1f97d456`/this session-end commit via `git fetch origin && git ls-remote --heads origin council/glyph`.
- Continue queue-driven reviews from `origin/council/muse` (`node ./.council_tool.mjs next`); no actions surfaced this session.
- Optional follow-ups (read-only/receipt-backed): A6 prepared-tree doc staleness, A7 hosted-copy true diff, P-344 reviewer work, totals-bar rerun with both packs at higher N, B2 277/9 list/snippet staging as inbox patch (owner/architect decision only). Do not place gh-pages fix, activate prepared re-pin, or touch engine/product/protected constants.
- Carry-forward unknowns: GitHub Actions gate execution, cakepanz-7 D-1 log reconciliation, deployed 277/9 re-point decision, prepared activation decision, totals/margins after pools fix, 2016–22 oracle `clockLate`/`kick_digest` cause.

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits.
- Work from live queue/docs on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.
