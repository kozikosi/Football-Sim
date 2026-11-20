# Cutover runbook: Z.ai's finished UI into `colors/` (Architect, 20 Nov 2026)

Replaces the v20↔donor `MERGE-CHECKLIST.md`. Lane: **Z.ai builds slices 3-5 and lands c12; the Architect performs this merge after Z.ai says "slices done".** Nothing below touches `gh-pages`. Push only `architect/engine-and-seats`. Labels: V = verified this session, I = inferred, U = unknown.

## 0. Starting state (V)
- Engine pin **408410477**; `git rev-parse 408410477:colors/src` = `ee3b6e1:colors/src` = `8d8a8a1e81386e99f53f995492904348cb7d8345`. Keep it; nothing to bump.
- `colors/`: 430/430 tests, tsc 89/89 (ratchet), `vite build` OK (Node 22.23.5 here, CI Node 24). `colors/` has 0 Svelte files, but it already has `vite.config.js` (svelte plugin), `index.html` ("20-0") and `src/main.ts` (a framework-free one-game box-score page over the real pools pack).
- Z.ai's tree: `67-cakepanz/` on `gh-pages` (slices 1-2: 10 `.svelte`, `draftStore.ts`, `valuation.ts`, `App.svelte`, `main.ts`). Its engine copy `src/engine/**` differs from `colors/src` in 12 files and lacks `dispatchAsync`.

## 1. Preconditions (all must be true before I start)
1. Z.ai reports slices 3-5 done against pin `408410477`, with **zero engine bytes changed**: `git diff --name-only 408410477 <his tip> -- colors/src` is empty, or his `src/engine/**` hashes equal `colors/src`.
2. His shell uses `dispatchAsync` / `selectBoardAsync` per `claude/dispatchasync-contract-2026-11-20.md` and has no sync `dispatch` in product code.
3. His own battery is green on the built app and he has handed me the commit and the path.
4. The two test re-point (277→286) and c12 landing on gh-pages are Z.ai's deploy and are **not** merge preconditions; they do not block `colors/`.

## 2. What moves (mechanical, one commit each so each can be reverted)
Target layout: UI under `colors/src/ui/`; everything else already matches.

| From Z.ai tree | To `colors/` | Note |
|---|---|---|
| `src/App.svelte`, `src/lib/**` (components, screens, `draftStore.ts`, `valuation.ts`, later slices) | `src/ui/` | Rewrite imports `./engine/…` → `../…` (e.g. `../sports/nfl/engine/players.ts`). The only layer allowed to import `svelte`. |
| `src/main.ts` (Svelte mount) | `src/main.ts` | **Collision:** today's `colors/src/main.ts` is the box-score dev page. Move that to `src/devgame.ts` + `devgame.html` (fix its `../../data/packs/…?url` import), keep it as a second Vite entry, not linked from the product UI. Decide at merge; if it costs more than a few lines, retire it (Owner call) rather than keep dead code. |
| `index.html` | `index.html` | Title becomes the product name, not "20-0". |
| `src/data/*.csv`, `data/nfl/*.csv` copies | **delete**; import from repo-root `data/nfl/*.csv?raw` | Single source. `vite.config.js` already has `server.fs.allow: ['..']`; confirm for `build`. |
| `package.json` | **colors' wins** (svelte ^5.57, plugin ^7, Vite 8). Z.ai's pins (plugin ^6, Vite 7) are dropped | If a component fails to compile on Vite 8, fix the component. Do not downgrade `colors/`. |
| `batteries/`, `shots/`, `CHECKSUMS-*.txt` | `colors/test/ui/` (battery), `claude/ref/` (shots/checksums) | Battery needs Playwright (not in `colors/` deps; adding it is a dev-dependency change = Owner approval, or keep it run-by-hand). |

**Deleted, never copied:** `67-cakepanz/src/engine/**`, `test/engine/**` (old 284-test copy), `tools/**` (the repo-root `tools/` is canonical), `vite.config.js`/`package-lock.json` of the cakepanz tree. After the merge there is exactly one engine: `colors/src`.

## 3. Gates (a red one stops the merge; nothing is "known red")
Run from `colors/` after `npm ci`, with the WHOLE repo checked out (tests read `../data`, `../tools`):
1. **Engine 430/430:** `npm test`. (V today. Any drop means engine bytes moved: stop.)
2. **Engine bytes unchanged:** `git rev-parse HEAD:colors/src/core HEAD:colors/src/sports` equals the same paths at `408410477` (UI lives in `src/ui` and `src/main.ts`, so compare `core`, `sports`, `platform`).
3. **tsc ratchet:** `npm run tsc:check` ≤ 89 (V baseline 89/89). New `.svelte`/UI TypeScript must add 0 errors; if `svelte-check` is wanted it is a new dev dependency (Owner).
4. **Build:** `npm run build` OK; record the JS/CSS sizes next to today's 23 kB JS / 4.6 MB pack.
5. **Board / slot / visual 15/0:** the Owner's gate. U: I cannot map "15" to a current count (Z.ai's slice-1/2 battery reports 26 pass · 0 fail · 10 skip · 3 defer). Z.ai to name the 15 assertions; they go into `colors/test/ui/` verbatim.
6. **The 3 cutover-battery DEFER laws** (V, Cakepanz README): gone-odds method equality (30 sims, real CPU logic); the 84-assertion w77 DOM battery's laws; witness-export parity. Per the contract the gone-odds comparison is of method, not digits.
7. **390 px and desktop:** Playwright screenshots at 390×844 and 1180×950, Team Select, board, a pick confirm, finished draft. No horizontal scroll at 390.
8. **No console errors/pageerrors** across START → 3 picks → UNDO → reload/LOAD → finish.
9. **Protected constants re-pinned.** The Owner-approval list is `DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS` (`ADVISOR-PLAYBOOK.md` §9, legacy names). In Colors they are `FLEX` (`engine/flex.ts`), `RATING_SPECS` (`engine/specs.ts`), `SLOTS` (`engine/slots.ts`). Gate 2's tree hash already proves them unchanged; additionally record `git hash-object` of those three files in the merge commit message and confirm the E5 pins test and `versions.ts` `drift()` pass inside gate 1.
10. **CI green on the pushed branch** (`.github/workflows/ci.yml`: pin-watch self-test, npm ci, tsc, tests, build). It already runs on `architect/**`.

## 4. Order of work
1. Preconditions. 2. Branch tip noted (`git rev-parse HEAD`) as the rollback point. 3. Commit A: engine untouched, add `src/ui/` + rewritten imports. 4. Commit B: entry/index/dev-page collision, data single-sourcing. 5. Commit C: delete nothing in `colors/`; record that the cakepanz engine copy is retired (the copy lives on `gh-pages`, which I do not touch). 6. Run gates 1-10; paste receipts (directory + command + result) into `claude/cutover-receipts-<date>.md`. 7. Push; wait for CI. 8. Owner reviews the running app; only then the go/no-go.

## 5. Make-live and w89 (not mine to execute)
Z.ai deploys c12 and retires w89 at make-live per the Owner (20 Nov). Before that: the live w89 shell keeps its own saves; whether its localStorage keys collide with `sim:nfl:draft` / envelope slots is U (not checked). **Check this before make-live**, because a new build that reads an old key would hit `parseRecord`/`newer-version` paths.

## 6. Rollback
- Pre-push: the three commits are independent, so `git revert` C, B, A in that order (no `reset --hard`, no force-push, per the rules). The rollback tip from step 2 is the state to compare against.
- Post-push, pre-make-live: nothing public changed (`gh-pages` untouched); revert commits C, B, A on the Architect branch and re-run gate 1.
- Post-make-live: Z.ai restores the frozen reference `Football-Sim-PreColors.html` (sha256 prefix `40233d6be00e987c`, REPORTED) and the previous `gh-pages` commit; saves written by the new build stay valid (envelope `schemaVersion 1`, no migration at v1).

## 7. Open items (U)
Playwright as a dev dependency (Owner); the identity of the "15" assertions; w89 save-key collision; whether `devgame` stays or is retired.
