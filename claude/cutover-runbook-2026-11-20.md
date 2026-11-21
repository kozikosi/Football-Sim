# Cutover runbook: Z.ai's finished UI into `colors/` (Architect, 20 Nov 2026)

Replaces the v20↔donor `MERGE-CHECKLIST.md`. Lane (Owner, 20-21 Nov): **Z.ai builds slices 3-5 and lands c12; the Architect performs this merge after Z.ai says "slices done"; Z.ai hands over a Cloudflare-ready static build; the Architect and the Owner deploy it to Cloudflare.** gh-pages is not a target and Z.ai does not deploy. Push only `architect/engine-and-seats`. Labels: V = verified this session, R = reported by another seat, I = inferred, U = unknown.

## 0. Starting state (V)
- Engine pin **408410477**; `git rev-parse 408410477:colors/src` = `ee3b6e1:colors/src` = `8d8a8a1e81386e99f53f995492904348cb7d8345`. Keep it; nothing to bump.
- `colors/`: 430/430 tests, tsc 89/89 (ratchet), `vite build` OK (Node 22.23.5 here, CI Node 24). `colors/` has 0 Svelte files, but it already has `vite.config.js` (svelte plugin), `index.html` ("20-0") and `src/main.ts` (a framework-free one-game box-score page over the real pools pack).
- Z.ai's tree: c12 / S13-S14 (his own lane; the `67-cakepanz/` copy on `gh-pages` is the old slices 1-2 snapshot and only a reference). Its engine copy `src/engine/**` differed from `colors/src` in 12 files and lacked `dispatchAsync` on the old snapshot, so build against the pin.

## 1. Preconditions (all must be true before I start)
1. Z.ai reports slices 3-5 done against pin `408410477`, with **zero engine bytes changed**: `git diff --name-only 408410477 <his tip> -- colors/src` is empty, or his `src/engine/**` hashes equal `colors/src`.
2. His shell uses `dispatchAsync` / `selectBoardAsync` per `claude/dispatchasync-contract-2026-11-20.md` and has no sync `dispatch` in product code.
3. His own battery is green on the built app and he has handed me the commit and the path.
4. Anything about `gh-pages` (the 277→286 test re-point, landing c12 there) is retired and is **not** a precondition. The only hand-over is the c12 commit plus a Cloudflare-ready static build (`dist/` and its sha256).

## 2. What moves (mechanical, one commit each so each can be reverted)
Target layout: UI under `colors/src/ui/`; everything else already matches.

| From Z.ai tree | To `colors/` | Note |
|---|---|---|
| `src/App.svelte`, `src/lib/**` (components, screens, `draftStore.ts`, `valuation.ts`, later slices) | `src/ui/` | Rewrite imports `./engine/…` → `../…` (e.g. `../sports/nfl/engine/players.ts`). The only layer allowed to import `svelte`. |
| `src/main.ts` (Svelte mount) | `src/main.ts` | **Collision:** today's `colors/src/main.ts` is the box-score dev page. Move that to `src/devgame.ts` + `devgame.html` (fix its `../../data/packs/…?url` import), keep it as a second Vite entry, not linked from the product UI. Decide at merge; if it costs more than a few lines, retire it (Owner call) rather than keep dead code. |
| `index.html` | `index.html` | Title becomes the product name, not "20-0". |
| `src/data/*.csv`, `data/nfl/*.csv` copies | **delete**; import from repo-root `data/nfl/*.csv?raw` | Single source. `vite.config.js` already has `server.fs.allow: ['..']`; confirm for `build`. |
| `package.json` | **colors' wins** (svelte ^5.57, plugin ^7, Vite 8). Z.ai's pins (plugin ^6, Vite 7) are dropped | If a component fails to compile on Vite 8, fix the component. Do not downgrade `colors/`. |
| `batteries/`, `shots/`, `CHECKSUMS-*.txt` | `colors/test/ui/` (battery), `claude/ref/` (shots/checksums) | **Done 21 Nov (Owner said add it): `@playwright/test` 1.65.1 is pinned exactly in `colors/` devDependencies** (V: `npm install -D --save-exact`, lockfile regenerated, `rm -rf node_modules && npm ci` clean, `npx playwright --version` = 1.65.1, 0 vulnerabilities; Node 22.23.5 here, CI Node 24). U: `npx playwright install chromium` fails in this sandbox (download blocked by the network allowlist), so a browser run is unverified here. Still to do at the merge: the `test:ui` script, and the CI step that installs and caches chromium (CI runners can download). Batteries live in `colors/test/ui/` and are not part of `npm test` (the engine gate stays fast); they run as `npm run test:ui`. |

**Deleted, never copied:** `67-cakepanz/src/engine/**`, `test/engine/**` (old 284-test copy), `tools/**` (the repo-root `tools/` is canonical), `vite.config.js`/`package-lock.json` of the cakepanz tree. After the merge there is exactly one engine: `colors/src`.

## 3. Gates (a red one stops the merge; nothing is "known red")
Run from `colors/` after `npm ci`, with the WHOLE repo checked out (tests read `../data`, `../tools`):
1. **Tests 434/434:** `npm test`. (V 21 Nov in `colors/` at dfdb887: 430/430 engine, then +4 layer-boundary tests in `test/nfl/layers.test.ts`, D13. A drop below the count means something moved: stop.)
2. **Engine bytes unchanged:** `git rev-parse HEAD:colors/src/core HEAD:colors/src/sports` equals the same paths at `408410477` (UI lives in `src/ui` and `src/main.ts`, so compare `core`, `sports`, `platform`).
3. **tsc ratchet:** `npm run tsc:check` ≤ 89 (V baseline 89/89). New `.svelte`/UI TypeScript must add 0 errors; if `svelte-check` is wanted it is a new dev dependency (Owner).
4. **Build:** `npm run build` OK; record the JS/CSS sizes next to today's 23 kB JS / 4.6 MB pack.
5. **Board / slot / visual batteries, 0 fail.** The build is S14, so the floors are the S14 finals (R: porca, `README.md:3`, `START-OF-CHAT-ZAI.md:67-68`): board >=19/0, visual >=18/0, slot >=28/0. The S13 numbers (board 16, visual 17; `CUTOVER-CHECKLIST.md:20-22`) are provenance only. Compare by **named laws**, not raw count: retiring the ring may remove assertions, so Z.ai lists every retired law by name with the reason; any other law must still exist and pass. The cutover swap test ends 29 pass / 0 fail / 10 skip / 3 deferred in both c7 and c8 (R, `swap-test.log:30`); its "26 pass" line is stale. Any count below its baseline, or any fail, stops the merge. Z.ai names the assertions; they go into `colors/test/ui/` verbatim.
6. **The 3 cutover-battery DEFER laws** (V, Cakepanz README): gone-odds method equality (30 sims, real CPU logic); the 84-assertion w77 DOM battery's laws; witness-export parity. Per the contract the gone-odds comparison is of method, not digits.
7. **390 px and desktop:** Playwright screenshots at 390×844 and 1180×950, Team Select, board, a pick confirm, finished draft. No horizontal scroll at 390.
8. **No console errors/pageerrors** across START → 3 picks → UNDO → reload/LOAD → finish.
9. **Protected constants re-pinned.** The Owner-approval list is `DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS` (`ADVISOR-PLAYBOOK.md` §9, legacy names). In Colors they are `FLEX` (`engine/flex.ts`), `RATING_SPECS` (`engine/specs.ts`), `SLOTS` (`engine/slots.ts`). Gate 2's tree hash already proves them unchanged; additionally record `git hash-object` of those three files in the merge commit message and confirm the E5 pins test and `versions.ts` `drift()` pass inside gate 1.
10. **CI green on the pushed branch** (`.github/workflows/ci.yml`: pin-watch self-test, npm ci, tsc, tests, build). It already runs on `architect/**`.

## 4. Order of work
1. Preconditions. 2. Branch tip noted (`git rev-parse HEAD`) as the rollback point. 3. Commit A: engine untouched, add `src/ui/` + rewritten imports. 4. Commit B: entry/index/dev-page collision, data single-sourcing. 5. Commit C: delete nothing in `colors/`; record that the cakepanz engine copy is retired (the copy lives on `gh-pages`, which I do not touch). 6. Run gates 1-10; paste receipts (directory + command + result) into `claude/cutover-receipts-<date>.md`. 7. Push; wait for CI. 8. Owner reviews the running app; only then the go/no-go.

## 5. Make-live (Architect + Owner, on Cloudflare)
- **Cloudflare (decided 21 Nov, council input taken): Pages + Direct Upload.** Full decision, rehearsal and make-live procedure: `claude/cloudflare-decision-2026-11-21.md`. Account, project name, domain and token custody stay with the Owner (U). `claude/releases.md` exists (empty schema).
- **Visual acceptance (decided, Architect, 21 Nov; Owner delegated): w89 parity, shown, not asserted.** Capture spec: `claude/visual-acceptance-spec-2026-11-21.md`. (a) A filed side-by-side of the built tree against live w89 at 390×844 and 1180×950: Team Select, board (with a top-3 row), pick confirm, finished draft. The Owner is shown it before make-live. "Directionally similar" is a FAIL; a named difference the Owner accepts in writing is the only waiver. (b) Measurable anchors, asserted in the battery so they cannot drift: glass tokens `--glass`, `--glassbd`, `--shadow` equal w89's values; 22 px radii on the large panels; `.panel` styling matches w89 (`:625`); contrast battery 2/0; 390 px no horizontal scroll; DESC-1 green. The seam golden (`e8fed8ab…`) pins VM shape and engine output, so it does not change; only this wording moved. pickle coordinates the side-by-side from the built tree.
- **w89 saves (R):** w89 uses `KEY='zpb:season'` (`:18080`) and has zero `sim:nfl` keys, so no collision with `sim:nfl:draft` or the envelope slots (pickle, against S13 receipts; I did not re-run). Residual U: whether anyone needs their w89 season carried over. Default: no import; the new build starts clean and never reads `zpb:season`.
- **Make-live trigger:** the Owner says "go" after seeing the side-by-side and the gate receipts. Not before.
- **Before every make-live, record** in `claude/releases.md` (append-only): the prior production deployment id/URL, the `dist/` bundle sha256, the golden seam hash, the zip sha256, the source commit, and the date.

## 6. Rollback (decided, Architect, 21 Nov; Owner delegated)
Both inputs are used. They cover different failure windows.
- **Primary: Cloudflare's own deployment history.** Re-promote the prior production deployment from the dashboard (Deployments → the prior production deployment → rollback). Fast, and it needs no rebuild. R, from Cloudflare's docs via pickle, not performed: only successful, non-deleted production deployments qualify, and old ones age out, so a target can disappear.
- **Fallback: a pinned artifact in the repo.** Each make-live adds a row to `claude/releases.md` with the `dist/` sha256 and the zip sha256, and the zip is kept by the Owner. If history has aged out, or the account state is wrong, redeploy that exact artifact and compare its hash. This is hy4's Plan B, and the reason the table exists.
- **Trigger:** any failed gate on the live URL (re-run 390 px and console gates after deploy), or a failed side-by-side acceptance, or an error in the first-run save path.
- **After any rollback:** verify the live hashes equal the recorded ones, re-run the 390 px and console gates, write the result into `claude/cutover-receipts-<date>.md`.
- **Code-side (before push):** the three commits are independent: `git revert` C, B, A in that order (no `reset --hard`, no force-push). Compare against the tip noted in step 2 of section 4. After push but before make-live nothing public has changed: revert on the Architect branch and re-run gate 1.
- **Last resort:** the frozen reference `Football-Sim-PreColors.html` (sha256 prefix `40233d6be00e987c`, R) stays kept. Saves from the new build remain valid across a rollback (envelope `schemaVersion 1`, no migration at v1).
- **UNKNOWN until the account exists:** the Cloudflare project does not exist (no `wrangler.toml`, deploy script or Cloudflare config in the repo, V). The product is decided (Pages + Direct Upload); the project name, the retention behaviour and whether rollback works as documented are U. Nothing here has been performed. The first deploy is a rehearsal: deploy, record the row, roll back once to a throwaway deployment, record the result, then go live.

## 7. Open items (U)
Cloudflare account, project name, domain, token custody (Owner); chromium install and CI cache (at the merge); whether w89 season carry-over is ever wanted (default no). **devgame decided (21 Nov): keep as `src/devgame.ts` + `devgame.html` for dev only; the production `build` input is `index.html` only, so the dev page and its 4.6 MB pack are never in `dist/`.** Gate 4 checks `dist/` has no `devgame` file.
