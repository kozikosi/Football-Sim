# Pre-deployment task list (Architect, written 25 Nov 2026 for the next sitting; NOTHING here has been executed)
**How to use.** Next chat starts "continue with NOW.md". Boot as usual, read NOW.md, then work this list top to bottom. Plan-only until the Owner says "go": no repo created, moved or connected; no Cloudflare connection; no `wrangler deploy`. Push only `architect/engine-and-seats`. Rulings behind this list: `claude/rulings/2026-11-25-owner-repo-name-delegation-stats-on-site.md`, `…2026-11-24-…`, `…2026-11-23-owner-naming-lowercase-…`. Labels V/R/I/U. Do not touch `colors/src/{core,sports,platform}` (hashes `ce75f04c` / `a9792de4` / `dcd97f20`) before the post-merge re-pin sitting.

## T1. Dataset as a deploy-time asset, zero engine bytes (highest value; unblocks "stats on the site, files not in the repo")
- **Design (I).** The UI fetches `/dataset/madden27.csv` at boot. 200 → hand the text to the EXISTING user-CSV import (`colors/src/sports/nfl/app/dataset.ts`, path A: same validation every boot). 404 → the `no-dataset` empty state with the upload control. No `?raw` CSV import anywhere (runbook line 24 says the merged UI uses one: that must change). Zero `core`/`sports`/`platform` bytes; the fetch lives in the UI/platform adapter side.
- **Build tool (mine, `tools/release-assemble.mjs`).** `--dist colors/dist --dataset <private path>` copies the CSV to `dist/dataset/madden27.csv`, refuses to run if the path is inside the repo or tracked by git, prints the CSV's sha256, and appends a row to `claude/releases.md` (hash only, never content). Test it with a fake CSV.
- **Receipts to produce.** Build + boot with no dataset (empty state shown, no console error); build + boot with the asset; `git ls-files` shows no player data; public gate unchanged.
- **Open (U).** CSV size vs the localStorage budget if the user-CSV path stores it (measure; if too big, keep it in memory and refetch each boot); whether `server/wrangler.jsonc` assets config serves `/dataset/*` as-is.
- **Z.ai ask (relay via Owner).** Fetch-then-import at boot; remove the `?raw` import; an empty-state acceptance receipt. Write this into the next work-order note.

**Superseded (27 Nov):** the CSV design and Z.ai ask above were replaced by what T1 built: `claude/zai-note-2026-11-25-boot-loader.md` (`/dataset/nfl.json`).

## T2. Build the clean repo locally, in scratch, never pushed (the receipt-safe cutover rehearsal)
`git init` in the scratchpad; commit 0 = byte-identical copy minus `claude/cutover-hide-list.txt` files, minus the filtered queue (T4), plus `ARCHIVE.md` and `PINS.md` (content pins: engine `408410477`, subtree hashes, the seam golden rule `sha256(JSON.stringify(g,null,1))`); commit 1 = brand + docs + `bootstrap.sh` URL/branch (`kozikosi/76pancakes`) + README ("76 Pancakes") + LICENSE + NOTICE + `docs/EXHIBIT.md` pointer; commit 2 = renames (`colors`/`server` package names) with the 7 `server/` imports of `colors/src` updated in the same commit. Per commit: the public gate identity (pass + 119 gated = full count of the source), `tsc:check` 89, build, subtree hashes, and the exposure scan (0 files). Never sweep real artifact filenames (`Football-Sim-Z-post-blue-w54.html` etc.). Output: a scratch repo plus a receipts file under `claude/`. Drafts of README/LICENSE/NOTICE/PINS/ARCHIVE go in `claude/cutover-drafts/` first.

## T3. Sync client: close the pre-UI gaps (pickle's list; tests before anyone wires the UI)
Delete (tombstone push, honour a remote delete with a local rung-back), restore, shares, stats client methods; define "keep separate" precisely (today it only disables sync for the second account; per-account local namespaces would change engine keys, so do not, document it); read `nfl/app/profile.ts` and build the single `legacy-import` row; backoff jitter. Same fake-server + real-handler test pattern (`colors/test/sync`, `server/test/client-sync.test.ts`); keep 460 full / 341+119 public, tsc 89.

## T4. M-0 queue (Owner delegated, ruling row 7)
Message MUSE first (`inbox/`). If no landing by the next sitting: ONE commit on the source branch bringing `origin/council/muse`'s `_agents/QUEUE.md`, a frozen banner on `PRIORITIES.md`, and the `AGENTS.md:3` pointer. Record it as labelled and ratifiable by MUSE. Receipt: row counts (216 / 171), P-296 present.

## T5. Cloudflare readiness, local only
(a) `claude/cloudflare-owner-checklist-2026-11-25.md`: exact Owner steps and what to send back (free account, `76pancakes` subdomain, D1 database, GitHub OAuth App + 2 secrets after the hostname is pinned, where `release-assemble` output gets deployed from, how "go" is given). (b) Rehearse Worker + D1 + static assets under local `wrangler dev` (no deploy; chromium download is blocked here, U). (c) Rate-limit fallback in D1 if the Rate Limiting binding is not on Free (U). (d) Version-skew check from the contract.

## T6. Flags for Z.ai and MUSE (their files; I flag, they edit)
`inbox/` note listing exact lines: CI/pin-watch fetching `65673a0` (history-bound; must become content hashes), `AGENTS.md` pin `d3bd81d2`, stale `ENGINE_PIN` in `App.svelte`, `.github` workflows, the `?raw` CSV import, page title/header must say "76 Pancakes" (today `20-0`), and the CI step for `npm test` public gate.

## T7. Gated on others (do not start until the trigger)
- **Z.ai says "slices 3-5 done":** run `claude/cutover-runbook-2026-11-20.md`; then ONE stats-fields commit (`playerLines`, `pickOverall`; seed present, `confSeed` deferred; seam golden `e8fed8ab` must hold in the OLD repo); `test:ui`, CI chromium step.
- **Post-merge re-pin sitting:** optional `deviceId` in the envelope; regenerate the seam golden without player names (ruling row 6); update `PINS.md`.
- **Owner "go":** deploy is the Owner's and my joint step; after it: verify live, Exhibit export, THEN the Owner flips old repos private.

## Owner-only, nothing I can do
Create the Cloudflare account and subdomain; create the GitHub OAuth App and secrets; create the `kozikosi/76pancakes` repo when we are ready; say "go"; flip old repos private. Everything else in the earlier question list is answered in the 25 Nov ruling.
