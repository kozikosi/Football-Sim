# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.

## BOOT — read this first, every session (do not re-derive anything)
1. `git fetch -q origin` then START-HERE §1 Step 0 (refresh governance docs from `origin/council/muse`): `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` must be clean, then `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`; confirm `git diff --cached --stat` lists only those four. Until run, treat governance docs as REPORTED. Do not run `sync-base.sh`.
2. Read this file to the end. Read your own open/canonical docs: `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null` (stable `HANDOFF.md` if present; latest immutable session records in inbox). If behind: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
3. If no task given: live queue via `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete tool before push). Queue/tool/docs live on `origin/council/muse`, not `council/base`.
4. `node tools/preserve.mjs check` (reports unsaved work anywhere; does not touch it).

## Current snapshot (2026-11-15T13:18Z, glyph)
- **Tip (this session end):** `origin/council/glyph@1678a842b67cc45255933f429be9326392b7cd5a` (pushed, verified by `git ls-remote origin refs/heads/council/glyph`).
- **Governance refresh (Step 0, done):** `origin/council/muse@2474d33638b4bf6d7045985f9abd14d5b8d8cb37`. AGENTS.md refreshed from muse (left locally modified/unstaged this session; not committed/pushed). `PROJECT-KNOWLEDGE.md`, `_agents/START-HERE.md`, `_agents/START-OF-CHAT.md` clean vs muse checkout state.
- **merge-base:** `HEAD` with `origin/council/base` = `1b91f50e161fa10d0607c8e09330115ffa27f1ff` (VERIFIED).
- **Pushed this session (glyph-owned, P-345):**
  - `20bebd8e` `inbox/20261115-1153-glyph-direction-innovation.md` — Rev 4 direction+innovation Q1–Q8; assessed Ernie `f3551218`.
  - `dd31a302` `inbox/20261115-1210-glyph-testing-innovation-review.md` — review/testing of recent P-345 filings and round-2 claims.
  - `f9530335` `inbox/20261115-1222-glyph-testing-innovation.md` — P-345 round 2 A–F (testing owed, innovations, framework reconciliation, constants, process, owner questions).
  - `1678a842` `inbox/20261115-1301-glyph-testing-innovation-round2.md` — split response: platform smallest-version pick + framework settle rule.
- **Verified receipts this session (VERIFIED, commands/refs in filings):** clean `git archive origin/architect/engine-and-seats -- colors data/nfl tools/mathlab` (node v26.13.0): `test/nfl/lineup.test.ts`+`versions.test.ts` 41/41 pass (REPORT gap `2773.038661417202`, engine stamp `nfl1.14a4e9333e888a` MOVED vs `nfl1.108bcc20a9f253`, data stamp gates); full `test/**/*.test.ts` 351/351/0. Flex API `fit(role,dest).penalty` (no `flexPenaltyFor`), `tools/mathlab/flex.json` 99 rules `{0:23,2:10,6:43,12:23}` with key checks. Pool: 1941 ratings (32 teams, 55–68, none 32) + 12 free agents = 1953. `origin/gh-pages:index.html` header WAVE w89. Architect `colors/src` = `core/platform/sports`, `package.json` notes no buildable app shell/missing `src/main.ts`; `react`/`react-dom` still declared. Read shipped receipts: JS-only gzip delta 11,569 B (Vue 104,481 / Svelte 92,912); coldload 5 trials/arm medians Vue 1088/1120ms vs Svelte 1188/1247ms (sign/direction context; magnitudes not re-run).
- **Positions filed (INFERRED unless backed by receipts):** platform build-first = Ernie receipt-diff core, proposed "Pinned Run Diff" v0 (spec-pinned run+diff, absorbed in shell) -> Spec-first substrate -> DIALS controls once validated. Settle rule = reconciled (Glyph majority + Inkling controls + Ernie/GLM friction): passenger on comparable Slice 5 work (N=1 indicative), pre-registered within-agent per-slice randomized order, pinned fidelity, first-impl primary, >=15% lower correction effort with consistent repair-churn in >=2/3 paired slices and no critical regression; ~±10%/mixed = wash -> maintainability/tooling/ecosystem (lean Vue, low confidence), reversible ~350 lines; stop if cost approaches migration.

## Open gaps / next useful actions
- **A1 boot replication:** NOT RUN (no Playwright/Chromium harness). Needs paired interleaved trials, no `--allow-file-access-from-files`, sign-consistency, receipt pushed/verifiable, corrected marker/counts per round-2 prompt.
- **A2 file:// fix verification:** NOT RUN (no browser harness/no built dists in local artifacts). Route B/C semantics reviewed from filings/receipts; product-scale single-file size/behavior and owner decisions (vanilla file:// for Cakepanz, single-file vs multi-file, fix owner/tree/timing) remain open.
- **A3 λ estimator validations:** NOT RUN (no Lab/harness). Protocols/designs filed (placebo, injection+pre-registered τ, kappa preseason-vs-regular, hard-zero+posterior intervals).
- **A4 replay-determinism sweep:** pmath artifacts/tests present and passed in 351-suite run; release-path bit-for-bit/Python parity and seeded full-season replay-diff (same seed, two builds, byte-identical) NOT proven as standing gate.
- **A5 pool ledger:** data facts closed (1941+12=1953; 32 teams 55–68, no team 32; FA=12). Board/VM render filter diff and FA visibility NOT RUN — close with `total_in/out, per_team_delta, excluded_ids+reason, FA_rows_present`.
- **A6 static-RNG pressure probe:** fork semantics VERIFIED (`fork` pure function of seed+label; CPU `p<pos>` stream). 100x paired board-differential probe NOT RUN.
- Continue queue-driven reviews/work from `origin/council/muse` (`./.council_tool.mjs next`); review other seats' testing-innovation round2 filings as they land. Carry forward: Colors no buildable app shell + react deps declared, pool render gap closure, receipt/pin/re-pin discipline.

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits. Only Architect edits product. MUSE owns council infra/queue.
- Work from live queue/docs on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.

## Session close
Update `GLYPH.md` (+ optional `HANDOFF.md`/dated inbox record); `git add -- <paths>`; commit; `git push origin council/glyph`; verify with `git ls-remote origin refs/heads/council/glyph`.
