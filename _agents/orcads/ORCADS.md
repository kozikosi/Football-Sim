# ORCADS — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ORCADS · **Model / how reached:** ORCADS / API · **State:** advisor
- **First seen:** 2026-11-19 (admitted by the Owner) · **Sessions:** 2026-11-20 (v2: C29, C24), 2026-11-20 (v3: A1, A2), 2026-11-22 (council ask 0250), 2026-11-22 (76Pancakes cutover ask), 2026-11-23 (S17 relay + review)
- **Strengths shown so far (evidence, not claims):** pin/ancestry forensics (C29, A1 — `git ls-tree` blob joins, `merge-base`, pin-watch runs); running an engine law against adversarial providers (A2 — Node 26 type-stripping against the extracted tree, raw stdout in the file); repo-wide provenance search (C24); reproducing a delivery's own claims instead of reading them (S17 — 69/69 identity, 430/430 engine tests, 37/37 node laws, seal 370/370).
- **Worktree:** `/Users/kosi/Desktop/wt/orcads` · **Branch:** `council/orcads` · **Base:** `origin/council/base` · **merge-base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current work
- **State:** session closed clean. Worktree clean, 0 stashes, 0 local-only commits (preserve gate: my row `0 0 OK`; the gate's exit 1 is other seats' dirty trees, not mine).
- **Done this session (2026-11-23):**
  - `deliveries/zai-s17-closeout-2026-11-23/` + `deliveries/RELAY-NOTES.md` — the S17 package relayed at the Owner's request (673 files, 17 MB; `data/packs/` excluded, byte-identical to this repo's copies). The relay is **not runnable as-is**: restore the four packs to `data/packs/` before `npm run test:engine` or `verify-package` (the tool then prints 370/370 instead of 366 OK + 4 missing).
  - `inbox/20261123-1735-orcads-S17-closeout-review.md` — the review. Reproduced: engine 69/69 byte-identical to `408410477:colors/src`; `node --test test/engine.test.ts` 430/430; `batteries/node.battery.mjs` 37/37 exit 0; seal 370/370 + converse clean; reseal-last holds by mtime. Findings: **F1** Vite `^7.3.6` vs R-13 (Vite 8) — and my 22 Nov "probably the plugin" guess is **falsified**; **F2** the one independent verifier returned RED and was overruled in-file; **F3** `SHELL-STATUS` ships STALE by a clock rule (`age > 120`, `tools/shell-status.mjs:72`); **F4** 41 side-by-side files = 20 pairs + 1 orphan right; **F5** retired ring laws with a live `suggestIds` persistence path; **F6** my relay's exclusion. Proposals: T1–T3 (tooling), U1–U9 (shell/UX, ranked).
  - `bulletin/20261123-1735-orcads.md` — the `FACT:` lines for MUSE.
- **Done 2026-11-22:** `inbox/20261122-1731-orcads-76pancakes-cutover-ask.md` (ship-first-then-move; keep `gh` drop `GH` but record P-132; exhibit in commit 2; ratings-CSV blocker) and `inbox/20261122-1116-orcads-council-ask-20261122-0250.md` (B1 CSRF, E2 mutation counts, D1 Vite — **the D1 line is now corrected by S17**: the 7.3.6 is the Vite line, not the plugin).
- **Done 2026-11-20:** `inbox/20261120-0342-orcads-C29-snapshot-pin.md`, `inbox/20261120-0348-orcads-C24-part0-provenance.md`, `inbox/20261120-0355-orcads-A1-pin-watch.md`, `inbox/20261120-0402-orcads-A2-q7-adversarial.md`.
- **Blocked / waiting on:** C15/C16/C22 still need the c10 app tree (only `SHELL-STATUS.md` + the build report are in git). A3 (C8b third-seat confirm) must be a *different* seat — I authored A2.

## What the next session needs
- **Read first:**
  1. My `inbox/20261123-1735-orcads-S17-closeout-review.md` — it carries the receipts and six findings; §6 (U1–U9) is the part the Owner asked for.
  2. `origin/council/pickle:_agents/pickle/deliveries/council-sitting-order-2026-11-20-v4-pickle.md` (`d27c1cf6`) — **A1 · C12 ring synthesis is still untaken**; take it first.
  3. `origin/council/muse:_agents/QUEUE.md` — live ranked queue.
- **Open questions:**
  1. **Vite (F1):** does the Owner amend R-13 or does the shell bump to Vite 8 + plugin 7 + a regenerated lockfile? Nothing else changes the cutover answer as much.
  2. **Verifier independence (F2):** who re-runs the verifier on a machine-checkable claim list, and does the RED verdict stay in the record?
  3. Who fixes the five gh-pages pin lines (`README.md:4,:9,:11`, `CHECKSUMS-slice1.txt:2`, `CHECKSUMS-slice2.txt:2`) — Z.ai or the Owner?
  4. Does `better-auth@1.7.27` reject a foreign Origin on its own? One read settles B1 between "hoist" and "test only".
  5. Where is the c10 zip? Without `src/` the c10 review items cannot be run from git.
- **Do not redo:** the S17 engine identity loop, its 430/430 engine suite, its 37/37 node laws, its seal/`verify-package` run and its reseal-last ordering (all mine, all in the review with raw stdout); c10 repair rehearsal; doc-fix md5s; the four gates; passGap numbers; pin-watch self-test; the Q7 adversarial run; council ask 0250.
- **Next best for this seat:** v4 **A1** (C12 ring synthesis), then A3 (different seat required), A8 (contrast pairs), C27 (item-6 vs passGap), C30 (Owner-owes runnable checklist). If the Owner answers the UX question in the review (literate fan vs casual player), U1 vs U2/U6 ordering changes.

## Files in this lane
- `_agents/orcads/ORCADS.md` — this file.
- `inbox/` — seven files: C29, C24, A1, A2, council ask 0250, cutover ask, S17 review.
- `deliveries/zai-s17-closeout-2026-11-23/` + `deliveries/RELAY-NOTES.md` — the relayed S17 package (not my authorship; relay notes say so).
- `bulletin/` — one entry per session.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Advisor level: propose, test, dissent, measure. Core status is the Owner's call; eight pushed items, all measurements or reviews.
