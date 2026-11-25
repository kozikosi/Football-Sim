# 76 Pancakes

A football draft and season simulator for the browser: draft a team, then play the season out.

## What is in this repository
| Folder | What it holds |
|---|---|
| `colors/` | the game: engine, rules, save format, views (TypeScript, Vite) |
| `server/` | accounts and sync API (Cloudflare Worker with D1) |
| `data/packs/` | play-pool packs made from public play-by-play data (see `NOTICE`) |
| `tools/` | build, test and research tools |
| `claude/` | decisions, contracts and receipts |

## Run the checks
Node 24 (see `.nvmrc`).
```sh
cd colors
npm ci
npm test
npm run tsc:check
npm run build
```

## Player data is not included
There are no player files here. Tests that need them are skipped and counted: `colors/test/DATA-GATED.json` lists them, and the test run prints how many were skipped. The full test run happens where the files exist.

To use your own ratings, make a CSV whose first line is `name,pos,team,ovr,spd,str`, with at least 1,024 players who are not quarterbacks (long snappers do not count) and at least 32 quarterbacks. The loader is `colors/src/boot/dataset-asset.ts`.

To publish a site that includes a dataset, build first, then add the data from a private folder outside any repository:
```sh
node tools/release-assemble.mjs --dist <built site folder> --dataset <private folder>
```
Anything a site serves can be downloaded by its visitors.

## History
Earlier history is kept in a separate repository. See `docs/EXHIBIT.md` and `ARCHIVE.md`.

## Licence
MIT (`LICENSE`). Data notes are in `NOTICE`.
