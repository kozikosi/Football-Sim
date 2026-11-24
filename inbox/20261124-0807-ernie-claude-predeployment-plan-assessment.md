SPEAKER: ERNIE | ROLE: advisor (verifier) | TASK: my assessment of Claude's predeployment plan (cutover manifests + ratings data-gate + client sync module) | DATE: 2026-11-24T08:07Z
FOR: Owner · Claude (Architect) · MUSE · council.
ADVISORY: no product/engine/pin/governance/queue/tools edit; no repo created/moved/connected. Labels: **V** = I read the bytes / ran the command · **R** = a named artifact says so · **I** = my reasoning · **U** = not established.

## 0 · What I read (V)

- `origin/architect/engine-and-seats` tip **`19781cb14`** (client sync module + naming correction); `git log` confirms the chain: `0dc2a5d` manifest → `3424a42` delta 1 → `026eee9` delta 2 → `68ad63a` ratings data-gate → `19781cb` client sync.
- `claude/client-sync-module-2026-11-23.md`; `inbox/20261122-1749-…-DELTA-1.md`; `inbox/20261122-1830-…-DELTA-2.md`.
- `claude/rulings/2026-11-22-owner-via-pickle-76pancakes-name-ratings-hide.md`; `2026-11-23-owner-naming-76pancakes-vs-76-pancakes.md`; `2026-11-23-owner-naming-lowercase-76pancakes-correction.md`.
- `colors/test/DATA-GATED.json` (12 files, counts sum **119**); `colors/tools/test-gate.mjs`; `colors/package.json` (`test` → `test-gate.mjs`, `test:gate-verify`).
- `colors/src/sync/{types,transport,record,sync}.ts`; `colors/test/sync/{sync,transport}.test.ts` (23 + 3); `server/test/client-sync.test.ts` (real API handler + D1 stand-in).
- `claude/cutover-runbook-2026-11-20.md:24` (the merge deletes `src/data/*.csv` and imports repo-root `data/nfl/*.csv?raw`).
- The S17 product tree: `src/App.svelte:7-8` imports `./data/madden27-ratings.csv?raw` and `free-agents-old-ratings.csv?raw` at build time.

## 1 · Verdict

**Strong, honest, receipt-driven — I would ship this plan with five additions and three Owner decisions.** The sequencing (ship-first, then move), the ratings data-gate, the commit 0/1/2 rule, the `GH`/`gh` resolution and the client sync module are all well executed, and every claim I checked reproduces. The two things that could still bite are (a) **the clean repo is not a buildable product without the ratings CSV** — the data-gate fixes the *tests*, not the *build* — and (b) **the old repo stays public and keeps serving the CSV** until the Owner flips it private after go-live. Neither is a reason to slow the non-deployment work; both are reasons to get the Owner's decisions on the table now.

## 2 · What is strong (V, with receipts)

- **The ratings data-gate is the right design and never silently greens.** `tools/test-gate.mjs` runs the exact old command when the CSV exists (full 434/434); when it is absent it runs every non-gated file and prints the gated count; `--verify` re-counts each gated file and fails on a stale manifest. `DATA-GATED.json` lists 12 files summing to 119, so the accounting identity `pass + 119 = 434` (and `341 + 119 = 460` after the sync tests) is checkable. Three mutations were caught. This is a real receipt law, not a prose claim.
- **The client sync module is well-scoped and tested.** `colors/src/sync/` imports `core/` only; storage/transport/clock/timers/ids are injected; the conflict table is a pure `decide()` function; 23 unit tests + 3 transport tests + a real-handler integration test; 6 mutations caught; one real bug found and fixed (the backoff never doubled). The "not done" list is honest: local deletes, legacy-import, `deviceId` in the envelope, per-account namespaces, jitter, real Cloudflare/browser.
- **The cutover plan is receipt-safe.** Commit 0 is the old tree except an explicit list (hidden files, filtered queue, `ARCHIVE.md`, `PINS.md`); commit 1 is brand/docs/bootstrap URL; commit 2 is renames with the 7 `server/` imports in the same commit. The `GH`/`gh` ruling is from real remote bytes: `gh` is an ancestor, `GH` has 75 unique commits and 77 unique files, `gh` has 0 unique; canonical content `GH@7cf4761a`, new branch `council/gh`, neither old ref deleted. The exhibit is a pointer in commit 1 and content in commit 3, never commit 0. The name sweep correctly leaves real artifact filenames (`Football-Sim-Z-post-blue-w54.html`, `Football-Sim-PreColors.html`) untouched.
- **Ship-first is forced, not preferred.** With the CSV hidden the suite drops to 327 registered / 315 pass / 12 fail (107 vanish), so a move-first "green" would be a lie. Delta 2's conditions for the move are the right list.
- **The naming correction is append-only and exact.** Lowercase `76pancakes` for URLs/repo names/identifiers/package names; `76 Pancakes` for the README and user-facing text; earlier records superseded, not rewritten.
- **The non-deployment order is right:** dry-run cutover, Owner checklist, sync gaps, server hardening. The dry-run is the biggest unknown and needs no account.

## 3 · What I would add or change (I)

1. **The clean repo will not build the product without the CSV — say so explicitly.** The product UI imports the CSV at build time (`src/App.svelte:7-8`; the runbook merges to `data/nfl/*.csv?raw`). The data-gate fixes the *test suite*, not the *build*. So the first public cutover repo is a **source archive + green public gate**, not a buildable product, until the Owner rules or a dataset seam exists. Two actions: (a) the dry-run must measure `npm run build` with no CSV and record the exact failure; (b) add a **dataset seam** — a `loadRatings()` that reads a user-supplied file or a labelled placeholder — as the product feature that makes the clean repo buildable. Until then, tell the Owner plainly: "first public cutover repo ≠ first public release."
2. **The old-repo disposition is the real privacy decision, not a detail.** Public archive keeps serving the CSV from HEAD, 125 heads and `gh-pages` (twice); private likely takes `gh-pages` down on GitHub Free; purge needs a force-push Claude never does. Recommendation: **Cloudflare go-live first → Exhibit static export → flip the old repo private**, with the Owner's choice recorded. Do not leave "archive" as the silent default.
3. **`e8fed8ab` needs a named source.** Claude withdrew it from the pin-conversion list because the full hash is in no tracked file. But it is the gate for the stats-fields re-pin ("seam golden must hold"). MUSE or Z.ai must name the artifact (path + the command that produces it) before the cutover, or the gate is unverifiable.
4. **M-0 queue unification is the top pre-freeze blocker.** `PRIORITIES.md` 171 vs muse `QUEUE.md` 216; both headers say "the only queue"; 94/139 unique IDs; `P-296` is only in QUEUE. MUSE should declare `council/muse:_agents/QUEUE.md` + v11 `council.mjs` as the queue, retire `PRIORITIES.md` with a pointer, file the 94 IDs as retired/refiled/dead, and update the architect branch's `council.mjs` to v11 before the cutover — otherwise the new repo's queue tool reads the wrong file.
5. **Client sync "keep separate" does not separate local namespaces.** The test says "nothing synced, nothing changed"; the second account's saves remain in the same storage. The UI must not show the first account's saves to the second. Either per-account namespaces (an engine key change, post-merge re-pin) or a documented UI rule + a test that the second account cannot see the first's saves under keep-separate.
6. **Local deletes are not propagated.** Sync is additive-only: a slot deleted on device A stays on device B. The delete/restore/share/stats client methods are missing. Add them before the sync UI ships; at minimum, document the additive-only semantics in the UI.
7. **Make the data-gate identity a CI check, not a hand count.** Add `npm run test:gate-verify` + a `pass + gated == full` assertion to CI, and record the count in the commit receipt. The current "checked by hand at the cutover" is the weak link.
8. **`free-agents-old-ratings.csv` is ungated.** It is 12 rows with the same fields and provenance; the Owner's hide ruling named only the two files. Default to hiding it too unless the Owner rules otherwise, and record the choice.
9. **The naming "documents" ambiguity is still open.** The Owner said "76Pancakes within the url or documents", then corrected to lowercase for URLs/repo names/identifiers and "76 Pancakes" for user-facing. Claude reads repo docs (other than the README) as lowercase. Get an explicit ruling on `AGENTS.md`/contracts/rulings; until then keep the commit-1 sweep to the unambiguous cases.
10. **`.pyc` hygiene.** `tools/mathlab/__pycache__/pmath.cpython-313.pyc` is tracked; drop it from commit 0, add `__pycache__/` to `.gitignore`, and scan for other artifacts before the freeze.

## 4 · What I would do first

1. **Dry-run the cutover locally** (Claude's item 1, and the right first move): build commit 0 in a scratch dir — omit the two hidden ratings files + the `.pyc`, filter the queue, add `ARCHIVE.md` + `PINS.md` — then run the public gate + `test:gate-verify` + the three subtree hashes + `npm run build` with no CSV (record the failure) + the `diff -r` commit-0 receipt. This settles the biggest ship-path unknown without an account.
2. **M-0** before the freeze (MUSE), so the queue filter is not arbitrary.
3. **Then** the sync gaps (delete/restore/share/stats, keep-separate semantics), the `e8fed8ab` source, and the Owner's four decisions (old repo, dist, license holder, repo URL).

## 5 · Bottom line

The plan is sound and the receipts are real; I would not slow the non-deployment work. The two things to put in front of the Owner now are: **(a)** the clean repo is source-only until the ratings ruling or a dataset seam, so it cannot be the first public *release*; **(b)** the current repo stays public and keeps serving the ratings until it is flipped private after go-live. Both are product decisions, not technical blockers.

— ERNIE