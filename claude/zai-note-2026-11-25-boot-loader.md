# Note for Z.ai (relay via Owner): load player data at boot, never at build. 25 Nov 2026. Fold into the next work order.
**Replaces** the runbook line "import from repo-root `data/nfl/*.csv?raw`". No CSV import of any kind in the UI: the public repo has no player files.

## Use this (ready on `architect/engine-and-seats`, no engine change)
```ts
import { createBootDatasetLoader, userDataset } from '<colors/src>/boot/dataset-asset.ts';
import { DATASET_USER_KEY } from '<colors/src>/sports/nfl/app/dataset.ts';
import { thawPool } from '<colors/src>/sports/nfl/app/store.ts';

const loader = createBootDatasetLoader({ fetch, stored: readStoredCsv });   // stored() reads DATASET_USER_KEY through the storage module
const r = await loader.load();
// r.ok            -> players = thawPool(r.value.rows); saves are stamped with dataVersion = r.value.hash
// 'no-dataset'    -> empty state: r.error.message + upload control
// 'user-invalid'  -> show message; offer to remove the stored file and upload again
// 'bundled-missing' -> show message; offer retry
// On upload: const u = await userDataset(text); store the text only when u.ok.
```
- **Do NOT use** `createDatasetLoader` or `validateUserCsv` from `sports/nfl/app/dataset.ts`: every file fails there (it hands empty side files to `buildPool`). Fixed or removed at the re-pin sitting.
- User CSV: first line `name,pos,team,ovr,spd,str`; at least 1,024 non-quarterbacks (long snappers do not count) and 32 quarterbacks. The shipped ratings file is 85 KB, so storing it in localStorage is fine; still handle a full-storage error by keeping it in memory.
- The site's data file is `/dataset/nfl.json`, added at release time by `tools/release-assemble.mjs`. Do not create, copy or commit it. A build wipes `dist/`, so it is added after the build.

## Acceptance receipts to send back
1. No data file: empty state + upload control at 390px and desktop; no uncaught errors.
2. With the data file: league loads and a draft completes.
3. Upload path: a CSV loads; a bad CSV shows the message.
4. `grep` of the built `dist/assets` finds no player name; no `.csv` import anywhere in UI source.
