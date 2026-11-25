// The deploy-time dataset asset (pre-deployment T1; Owner 25 Nov: stats show on the site, the data files stay out of the repo).
//
// ONE file, served beside the build and never committed: /dataset/nfl.json
//   { schema: 'dataset-asset/1', sport: 'nfl', dataVersion: 'sha256:…', files: { ratings, freeAgents, ids } }
// `files` holds the three CSV texts byte for byte, and they go through the engine's own buildPool, so the board is the same board a build-time
// import produced. `dataVersion` is the stamp every save already carries (app/versions.ts), recomputed here: a half-written or hand-edited file
// is refused. One file means a deploy or a rollback can never mix the ratings of one version with the ids of another.
// tools/release-assemble.mjs writes it; nothing else defines the format.
//
// Lives in src/boot/, outside core/, sports/ and platform/: it adds no byte to the pinned engine. fetch and storage are injected (no DOM here).
// It also replaces sports/nfl/app/dataset.ts validateUserCsv for imports, which cannot succeed: it calls buildPool(text, '', ''), and buildPool
// throws on the two empty side files. That file is inside a pinned folder; it is fixed or removed at the re-pin sitting.
import type { DatasetLoader, LoadedDataset, Result } from '../core/app.ts';
import { buildPool, parseCsv } from '../sports/nfl/engine/players.ts';
import { formatIds, syncIds } from '../sports/nfl/engine/playerids.ts';
import { TEAMS_N, snakeOrder } from '../sports/nfl/engine/draft.ts';
import { freezePool } from '../sports/nfl/app/store.ts';
import { dataVersion } from '../sports/nfl/app/versions.ts';
import { noDataset } from '../sports/nfl/app/dataset.ts';
import type { DatasetRow } from '../sports/nfl/app/dataset.ts';
import type { FrozenPoolRow } from '../sports/nfl/app/saves.ts';

export const DATASET_ASSET_URL = '/dataset/nfl.json';
export const DATASET_SCHEMA = 'dataset-asset/1';
export const CSV_HEADER = 'name,pos,team,ovr,spd,str';
export interface DatasetFiles { ratings: string; freeAgents: string; ids: string }
export interface DatasetAsset { schema: typeof DATASET_SCHEMA; sport: 'nfl'; dataVersion: string; files: DatasetFiles }

const MAX_ROWS = 60_000, MAX_CHARS = 8_000_000;
// Ids handed to a user's own file start here, far above the shipped crosswalk, so a saved profile cannot pin one player's name on another.
const USER_ID_FLOOR = 'nfl-p90000';

// A board must be able to finish any draft: every non-quarterback is legal in every slot, quarterbacks are not.
function playable(rows: readonly DatasetRow[]): void {
  const picks = snakeOrder().length;
  const qbs = rows.filter((r) => r[2] === 'QB').length, others = rows.length - qbs;
  if (others < picks) throw new Error(`a full draft needs at least ${picks} players who are not quarterbacks (long snappers do not count); this file has ${others}`);
  if (qbs < TEAMS_N) throw new Error(`a league needs at least ${TEAMS_N} quarterbacks; this file has ${qbs}`);
}

async function boardOf(files: DatasetFiles): Promise<{ rows: FrozenPoolRow[]; hash: string }> {
  const rows = freezePool(buildPool(files.ratings, files.freeAgents, files.ids));
  playable(rows);
  return { rows, hash: await dataVersion(rows) };
}

const message = (e: unknown): string => (e instanceof Error ? e.message : String(e));

// Used by the release tool. Throws: a build step that cannot make a playable asset must stop.
export async function buildAsset(files: DatasetFiles): Promise<{ text: string; dataVersion: string; players: number }> {
  const { rows, hash } = await boardOf(files);
  const asset: DatasetAsset = { schema: DATASET_SCHEMA, sport: 'nfl', dataVersion: hash, files: { ratings: files.ratings, freeAgents: files.freeAgents, ids: files.ids } };
  return { text: JSON.stringify(asset), dataVersion: hash, players: rows.length };
}

type Loaded = Result<LoadedDataset<DatasetRow>, { code: 'bundled-missing'; message: string }>;
export async function parseAsset(text: string): Promise<Loaded> {
  const fail = (why: string): Loaded => ({ ok: false, error: { code: 'bundled-missing', message: 'the player ratings file on this site is broken: ' + why } });
  try {
    if (text.length > MAX_CHARS) return fail('it is too large');
    const a = JSON.parse(text) as Partial<DatasetAsset> | null;
    if (!a || a.schema !== DATASET_SCHEMA || a.sport !== 'nfl') return fail(`it is not a ${DATASET_SCHEMA} nfl file`);
    const f = a.files;
    if (!f || typeof f.ratings !== 'string' || typeof f.freeAgents !== 'string' || typeof f.ids !== 'string') return fail('it is missing one of its three tables');
    const { rows, hash } = await boardOf(f);
    if (hash !== a.dataVersion) return fail('its data does not match its declared data version');
    return { ok: true, value: { source: 'bundled', rows, hash } };
  } catch (e) {
    return fail(message(e));
  }
}

// A user's own ratings file: the six-column CSV, no side files. Ids are issued in file order, so the same file always gets the same ids.
export async function userDataset(text: string): Promise<Result<LoadedDataset<DatasetRow>, { code: 'user-invalid'; message: string }>> {
  const fail = (why: string) => ({ ok: false as const, error: { code: 'user-invalid' as const, message: `that file did not import: ${why}. A ratings CSV starts with the line ${CSV_HEADER}` } });
  try {
    if (text.length > MAX_CHARS || text.split('\n').length > MAX_ROWS) return fail('it has more than 60,000 rows or is far too large');
    if (text.trim() === '') return fail('it is empty');
    const players = parseCsv(text, false);
    const floor = { pid: USER_ID_FLOOR, name: '', pos: 'QB', team: '-' };      // only sets where numbering starts; dropped below
    const ids = formatIds(syncIds([floor], players).rows.slice(1));
    const { rows, hash } = await boardOf({ ratings: text, freeAgents: CSV_HEADER + '\n', ids });
    return { ok: true, value: { source: 'user', rows, hash } };
  } catch (e) {
    return fail(message(e));
  }
}

// The production loader (same interface and failure codes as core/app.ts). Order: the user's stored CSV, then the site's asset, then empty.
// A host without the asset answers 404, or 200 with the app's own HTML (single-page-app fallback): both are "no dataset", not an error.
export function createBootDatasetLoader(input: {
  fetch: (url: string) => Promise<Response>;
  stored?: () => Promise<string | null>;        // reads DATASET_USER_KEY through the storage module
  url?: string;
}): DatasetLoader<DatasetRow> {
  const retry = (why: string): Loaded => ({ ok: false, error: { code: 'bundled-missing', message: `the player ratings could not be loaded (${why}). Check your connection and try again` } });
  return {
    async load() {
      const stored = (await input.stored?.().catch(() => null)) ?? null;
      if (stored) return userDataset(stored);
      let text: string;
      try {
        const get = input.fetch;                 // unbound: a browser's fetch refuses to run as a method of this object
        const r = await get(input.url ?? DATASET_ASSET_URL);
        if (r.status === 404) return noDataset();
        if (!r.ok) return retry('server answered ' + r.status);
        text = await r.text();
        if ((r.headers.get('content-type') ?? '').includes('text/html') || text.trimStart().startsWith('<')) return noDataset();
      } catch (e) {
        return retry(message(e));
      }
      return parseAsset(text);
    },
  };
}
