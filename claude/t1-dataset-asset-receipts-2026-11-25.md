# T1 receipts: player data as a deploy-time asset (25 Nov 2026, Architect). Nothing deployed or created.
## Built (V)
- `colors/src/boot/dataset-asset.ts`: asset format, parser, user-CSV import, boot loader. Zero bytes changed in `core/`, `sports/`, `platform/`.
- `tools/release-assemble.mjs`: writes `<dist>/dataset/nfl.json` from a private folder; appends hashes to `claude/dataset-assets.md` (created on the first real run).
- Tests: `colors/test/boot/` (12 loader + 11 tool, invented players; 3 real-data, listed in `test/DATA-GATED.json`).
- `.gitignore`: `server/dist/` (the Worker's asset folder was not ignored; the tool refused to write there until it is).

## Changes from the task-list design, and why
| Task list said | Built | Why |
|---|---|---|
| fetch `/dataset/madden27.csv`, feed the existing user import | one `dataset/nfl.json` holding the three CSV texts | the existing import cannot succeed (finding F1); the board also needs the free-agent and id files; one file cannot be half-rolled-back |
| log to `claude/releases.md` | `claude/dataset-assets.md` | releases.md is one row per deploy with its own columns |
| fetch lives in the UI adapter | `colors/src/boot/`, fetch and storage injected | testable now, before the UI exists; still outside the pinned folders |

## Finding F1 (V): the user-CSV import in the pinned engine fails on every file
`validateUserCsv` calls `buildPool(text, '', '')`. The real ratings file fails with "Cannot read properties of undefined (reading 'trim')"; the eight-column form its comment describes fails "unexpected header". The loader's `bundled` path has the same call. No test covered it. Not edited (pinned folder): re-pin sitting.

## Local rehearsal (V on this machine; scratch copy; throwaway page, not the product UI)
Vite build, then `wrangler dev` 4.168.0 `--local` with `server/wrangler.jsonc` and `worker.ts`, driven by Chromium at 390px.
| Case | Result |
|---|---|
| no data file | `no-dataset` message; the request answered 200 `text/html` (app fallback); no console output |
| after `release-assemble` | 200 JSON, 178,953 bytes; 1,921 players; draft ran all 1,024 picks; no console output |
| real ratings CSV in localStorage | source `user`; 1,909 players (no free-agent file); 1,024 picks; no console output |
- Real data (test): asset board, `dataVersion` and two full drafts equal the build-time import.

## Open
- U: what the real host answers for a missing data file. Cloudflare's docs say a non-page request can reach the Worker (404); the local server answered with the app page, logging a `navigate` header on a request sent as `cors`. The loader treats both as "no data". Check at the rehearsal deploy.
- Product UI wiring and its screenshots: Z.ai (`claude/zai-note-2026-11-25-boot-loader.md`).
- Note: a data file the site serves can be downloaded by any visitor. Keeping it out of the repo does not keep it private on the live site.
