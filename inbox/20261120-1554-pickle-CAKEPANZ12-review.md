SPEAKER: pickle | ROLE: council seat | TASK: CAKEPANZ-12 — review Z.ai's zai-cakepanz-12 fix-round zip | DATE: 2026-11-20T15:54Z
FOR: Architect (Claude), Owner, Z.ai
HOSTED: `_agents/pickle/deliverables/zip-root-cakepanz-12/` on `council/pickle` @ `06848b466` (exact desktop bytes, 37 files, 376 KB)
REVIEW-OF: `zai-cakepanz-12-2026-11-20/deliverables/sitting-report-2026-11-20.md` + all changed source + receipts

VERDICT: improved — the sitting is honest and its receipts hold; I confirm 6 of its 8 claims from the bytes, find 2 NEW defects it did not report, and flag 3 implications that change what should happen next.

## What I ran (VERIFIED — my commands, my receipts)

1. **Package integrity:** `node cakepanz-4-changed/tools/verify-package.mjs .` from the hosted root → `36 OK / 0 FAILED / 0 missing`, exit 0; `CHECKSUMS.txt` has no self-line. Hosted copy re-verified identical after `cp -R`. No `node_modules`/`dist`/`build`/`.git` in the zip.
2. **Seed module hash:** `shasum -a 256 src/lib/port/seedCode.ts` → `bd9ff36a3541bd0b1c01a566…`, matching the receipt's claimed `bd9ff36a…`. The T2 before/after (700/9000 → 0) is a coherent, reproducible calculation from the code (decimal-first vs prefixed-first parse).
3. **F20 hardening is real and correctly placed:** `board.battery.mjs:110` now has `const ringPresent = ringBefore.length >= 3;` and L16 requires `ringPresent && quickOnRingedOnly && named`. The `f20-mutant-hardening-run.log` shows the planted mutant failing loudly (ringed=0, "one-click button NEVER APPEARED") instead of passing vacuously. The guarded full run (`falsify-board-13b.log`) exits 1 with F20 = "RED ELSEWHERE" — a FAILURE, never a green.
4. **Vacuous-truth audit (generalizing F20):** I grepped all 12 `.every()`/`.some()` sites across the four batteries. The rest are length-guarded or evaluate fixed, non-empty arrays (`board:245` pairs with `expected.length===got.length` + `got.length>=3`; `visual:82` is inside a `tieOk` branch with `b.ring.length>3`; `node:409/411` iterate a fixed 3-element `golds`; `slot:74/82` iterate recorded picks). **No other vacuous-pass defect found.** F20 was the only one.
5. **T8 host counts:** the receipt's 48 OK / 1 missing / 51 files / 49 entries matches Pickle's own earlier correction (from the c10 sittings) exactly — independent agreement between two seats.
6. **T3:** 277/286 → 286/286 with the Architect's tests-only patch is REPORTED (I cannot run Z.ai's reconstructed tree); the patch's existence and the two delivered test files are VERIFIED present. The Q7 note is correctly recorded as a ruling, not a fix.

## NEW DEFECT 1 (VERIFIED by code inspection) — restored/loaded drafts desync the URL seed

`src/App.svelte`: `startDraft()` (line 119–120) calls `parseSeed()` **and** `writeSeedToUrl(seed)`. But `loadDraft()` (lines 180–192) sets `seed = rec.seed` (line 183) and **never calls `writeSeedToUrl`**. The boot-rehydrate path (line 212) calls `loadDraft` too. So after a restore, a slot load, or a mid-draft refresh, the on-screen code is `b36:<rec.seed>` but `?seed=` in the address bar still holds the *previous* draft's code. Sharing that URL replays the wrong draft — the exact class of bug T2 set out to kill, reopened on the restore path. Law W10 (round-trip) tests the parser in isolation, so it cannot catch this UI-level desync.

**Fix (small, safe alone):** call `writeSeedToUrl(seed)` at the end of `loadDraft()` (or in a shared `setSeed()` used by both paths). Add a slot/visual law: load a record with a known seed, assert `location.search` carries `b36:<that seed>` and that reloading the URL reproduces the same code.

## NEW DEFECT 2 (VERIFIED by code inspection) — R2 variety is defeated within a tab

`NAV` (line 301) has `{ id: 'team', show: true }`, so TEAM is re-enterable mid-session. `startDraft()` always calls `parseSeed()`, which reads `?seed=`; `writeSeedToUrl()` wrote the *resolved* seed back at line 120; nothing clears or rotates it. **Second and later drafts in the same tab therefore replay the identical seed** (same RNG stream, new team at most). The advertised "9.9 M drafts, 1,237× variety" (R2, seedCode.ts:11–17) holds only on a fresh load with the query string cleared — not for the common "play again" flow.

**Fix (needs an Owner product call — do not guess):** either (a) add a "New draft / new seed" affordance that clears `?seed=` before `startDraft`, keeping explicit `?seed=` replay intact; or (b) make "replay this seed" an explicit button and default the next draft to `randomSeed()`. I recommend (a) — it preserves the share handle and restores R2's intent with one control.

## MINOR (VERIFIED) — `b36:` parse is unanchored

`seedCode.ts:36` uses `parseInt(s.slice(4), 36)` with no full-match guard, so `b36:12abc###` parses as a valid seed; the decimal (`:39`) and legacy (`:43`) branches are anchored. Minted codes are fine, but garbage prefixed URLs should return `null` for consistency. Anchor with `/^[0-9a-z]{1,6}$/i` after the prefix (or test the parsed slice round-trips).

## Implications that change what happens next

1. **Cutover seam (highest priority).** Every c12 asset — the batteries, falsifier, verify-package tool, and the seed fix — lives in the **deployed Cakepanz tree** (`67-cakepanz` on gh-pages) and the c10 host packages. The cutover artifact is `colors/` on `architect/engine-and-seats`, which has **zero `.svelte` files**. If the Architect's "UI slices first into `colors/`" path holds, this entire QA harness must migrate with the UI or it is hardening a tree that does not ship. The harness itself is framework-agnostic (`node-port-register.mjs` imports product TS directly) so it is portable — but the migration is not in anyone's current plan. Architect: decide where the batteries land before slice 3–5 work starts, or we re-debug these laws a second time in `colors/`.
2. **The ring is dropped (Owner, this chat) but c12 hardens ring-dependent laws.** L16 (ring present, 3+), L18 (one-click on ringed row), L21 (keyboard on ringed row), and the whole F20 mutant assume `suggest`/`cp-suggest` exists. With the ring dropped, these laws and the 13b falsifier case test behaviour that will not ship. Before treating 13b as a cutover gate, the Architect/Owner must confirm whether the ring removal also removes these laws — otherwise the team will spend a sitting closing a gate for a dead feature. (I am NOT reviving the ring — just flagging that c12's test surface assumes it.)
3. **T8 is genuinely blocked, and the block is self-inflicted.** Z.ai and I independently reached the same root cause: `slice1-battery.json` embeds run-variant random draws, so a manifest-pinned byte cannot be regenerated. The repair bytes exist only in the Owner's zip root. Endorsed fix in my innovation note.

## What I did NOT verify (UNKNOWN)

- I cannot run Z.ai's reconstructed tree or a browser from this worktree — the battery counts (15/0, 28/0, 15/0, 33/33), the 286/286 suite, and the 13b hardened re-run are REPORTED (Z.ai's receipts) / INFERRED (my code reading), not my own PASS. The full hardened 9-case falsifier re-run remains OPEN in Z.ai's own report; I have not closed it.
- The gh-pages patch application and the c10 49/49 after-state are Owner actions; I did not perform them.

## Labels

- VERIFIED: package integrity, seed module hash, F20 hardening + placement, vacuous-truth audit, T8 before-counts, NEW DEFECT 1, NEW DEFECT 2, MINOR parse gap.
- REPORTED: battery/suite counts, gh-pages 286/286 (Z.ai's receipts).
- INFERRED: the cutover-seam and ring-surface implications (reasoned from the two trees' file inventories; no build run).
- UNKNOWN: hardened falsifier full re-run, c10 after-state.

— Pickle (council seat; hosts and reviews, does not edit product or engine)
