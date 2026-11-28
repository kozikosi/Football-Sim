# PLAN — Wave 4: the boot loader (T1, the Architect's contract; Z.ai, 2026-11-28, from MUSE merged v4 §7)
STATUS: PLAN ONLY — not built in the 2026-11-28 sitting (the Architect's INTEGRATION-FLAGS §2 puts boot-loader wiring, `?raw` removal and account sync AFTER the fix sitting). This note carries the Architect's contract verbatim-shape so the next sitting builds it without re-reading four threads.

## The contract (the Architect's, byte-grounded)
- The site boots WITHOUT player data in the repo and loads its dataset at BOOT time, never at build time: `createBootDatasetLoader` + `userDataset` from `colors/src/boot/dataset-asset.ts`, `DATASET_USER_KEY`, `thawPool`.
- The site asset is **`/dataset/nfl.json`** (the built tool writes that). The older `/dataset/madden27.csv` line is SUPERSEDED by the Architect's own receipt; the Owner relay voids the CSV ask again.
- **No `?raw` CSV import anywhere** — remove all three `?raw` imports (`src/App.svelte:7-9`: madden27-ratings.csv, free-agents-old-ratings.csv, player-ids.csv) and wire the boot loader + upload control at the empty state (`src/App.svelte` around line 503 — the "No player dataset yet" section, which links only to `?dev=1` today).
- No data file in git, no player names in built `dist/assets`, no invented ratings. The user CSV shape is `name,pos,team,ovr,spd,str` — at least 1,024 non-QB players plus 32 QBs. A bad CSV produces a readable message, never a crash and never a silent empty board. `dataVersion` stamps saves. Do NOT create or commit the dataset.
- **Four acceptance receipts, each a real run**: (a) the empty state at 390 px and desktop boots with no dataset and says plainly what to do next; (b) the league loads and a draft completes with the dataset file present; (c) a bad CSV shows the message; (d) a grep of the built dist finds no player name.

## Account sync (plan-only in this sitting)
The client sync surface (`notifyDeleted`, `heldSlots`, `serverHistory`, `restoreFromServer`, `stats`, `shareSave`, `shareRun`, `revokeShare`, jittered backoff) is BUILT but unreviewed: plan the shell seams only; do NOT wire accounts/sync into the offline artifact before an Architect/Owner signal. "Keep separate" means the second account stays local with an empty remote slate; it does not create per-account engine namespaces. No `deviceId` in the envelope yet (post-merge re-pin). No real Cloudflare/GitHub test is claimed; label U.

## Open questions it leaves
- The `?dev=1` labelled DEV boot is the offline tent's run path as of 2026-11-28 (the tent receipt names it). After Wave 4 removes the bundled `?raw` data, the DEV boot's dataset source needs the Architect's word: `nfl.json` served same-origin on http AND a `file://` story for the single-file artifact (the tent contract — zero external requests on `file://` — must survive the boot loader; that is an Architect decision, not Z.ai's).
- Where the upload control lives visually (the empty state is the named spot; a Saves-panel twin is unruled).

## DEFAULTS if built without further ruling
Empty state keeps `?dev=1` as the first-run path, labelled DEV (§10.2 default) until the Owner approves a dataset; the upload control renders only at the empty state; a bad CSV error names the offending row count, never the data.
