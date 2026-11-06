// DatasetLoader rework (w74 item 4f, Z.ai DRAFT — the F11 open decision lives in this header).
//
// THE OPEN DECISION (for the Architect + Owner; nothing here rules it):
//   Kosi's ruling: real player names and real teams with non-EA ratings are the PUBLIC default.
//   The old contract's no-file fallback — a bundled fictional league — contradicts it (F11): a silent fictional
//   league looks real, and the Owner's ratings (his own, to be generated later — "DO NOT START" for every seat)
//   do not exist yet.
//   Options on the table:
//     (A) this draft — no-file state is EMPTY with a plain-language message and an Import button; a dev/private
//         build may still ship rows as a build input (source tag 'bundled'), never shown to the public as real.
//     (B) fictional-with-warning — ship a fictional league labelled "fictional" until the real ratings exist.
//   This file implements (A) and keeps (B) a ~10-line change (replace noDataset()'s result with the bundled load
//   + a forced banner state), so the ruling flips it cheaply. Independently generated real-name ratings remain
//   Kosi's own later work; nothing here generates ratings.
//
// PLACEMENT: this file lives in sports/nfl/app/, NOT core/ — it imports the NFL engine's buildPool, and the
// layout law is "core imports only core" (the first tsc run caught the violation; the layout test ratified it).
// The sport-free half of the contract stays in core/app.ts (DatasetLoader, LoadedDataset, DatasetSource).
//
// Contract change vs core/app.ts: the loader's failure union gains 'no-dataset' — the empty state is a RESULT the
// boot screen renders (message + import path), not a throw and not a fallback.

import { buildPool } from '../engine/players.ts';
import type { Player } from '../engine/players.ts';
import { datasetHash } from '../../../core/hash.ts';
import type { DatasetLoader, DatasetSource, LoadedDataset, Result } from '../../../core/app.ts';

export type DatasetRow = readonly [string, string, string, string, number, number, number, 0 | 1];

// The user dataset's storage key (core/keys.ts scheme). One user dataset, shared by slots.
export const DATASET_USER_KEY = 'sim:nfl:dataset:user';

export interface UserCsv { name: string; text: string }

// CSV shape: the same eight columns the engine's buildPool consumes
// (id, name, pos, team, ovr, spd, str, freeAgent) — buildPool is the ONLY parser, so the loader cannot drift
// from the engine's expectations: validation = buildPool succeeds + row-count sanity.
export async function validateUserCsv(text: string): Promise<Result<LoadedDataset, { code: 'user-invalid'; message: string }>> {
  const fail = (message: string): Result<LoadedDataset, { code: 'user-invalid'; message: string }> => ({ ok: false, error: { code: 'user-invalid', message } });
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
  if (lines.length < 200) return fail('that CSV has fewer than 200 player rows — a league roster is about 1,900');
  if (lines.length > 60_000) return fail('that CSV has more than 60,000 rows — it is probably not a player ratings file');
  try {
    const pool: Player[] = buildPool(text, '', '');   // no FA / ids side files: a user CSV carries everything in one file
    if (pool.length < 200) return fail('the file parsed but holds fewer than 200 players');
    const rows: DatasetRow[] = pool.filter((p) => p.role !== 'LS').map((p) => [p.id, p.name, p.pos, p.team, p.ovr, p.spd, p.str, p.freeAgent ? 1 : 0]);
    return { ok: true, value: { source: 'user', rows, hash: await datasetHash(rows) } };
  } catch (e) {
    return fail('the file did not parse as a ratings CSV: ' + (e instanceof Error ? e.message : String(e)));
  }
}

// The no-file state: EMPTY, explicit, never a silent fictional league. The boot screen renders `message` and
// offers the import path; nothing else is seeded.
export function noDataset(): Result<never, { code: 'no-dataset'; message: string }> {
  return {
    ok: false,
    error: {
      code: 'no-dataset',
      message: 'No player ratings are loaded yet. This game ships without a league: import a ratings CSV to play. '
        + 'The ratings belong to their creator — see DATASET.md for whose they are.',
    },
  };
}

/**
 * The production loader. Priority: (1) a user CSV stored under DATASET_USER_KEY (validated again on every boot —
 * storage is untrusted), (2) the build-time bundled rows IF the build shipped them (dev/private builds only under
 * the current ruling), (3) otherwise the no-dataset empty state. Never throws; never silently substitutes.
 */
export function createDatasetLoader(input: {
  stored?: () => Promise<string | null>;         // reads DATASET_USER_KEY via the StorageModule (injected; tests use a Map)
  bundled?: () => { csv: string } | null;        // what the BUILD shipped, if anything (Vite define/import — build-input, not a fallback promise)
}): DatasetLoader {
  return {
    async load() {
      const stored = (await input.stored?.().catch(() => null)) ?? null;
      if (stored) {
        const v = await validateUserCsv(stored);
        if (v.ok) return { ok: true, value: v.value };
        return { ok: false, error: { code: 'user-invalid', message: v.error.message + ' Remove it to start clean.' } };
      }
      const bundled = input.bundled?.() ?? null;
      if (bundled) {
        try {
          const pool: Player[] = buildPool(bundled.csv, '', '');
          const rows: DatasetRow[] = pool.filter((p) => p.role !== 'LS').map((p) => [p.id, p.name, p.pos, p.team, p.ovr, p.spd, p.str, p.freeAgent ? 1 : 0]);
          return { ok: true, value: { source: 'bundled', rows, hash: await datasetHash(rows) } };
        } catch (e) {
          return { ok: false, error: { code: 'bundled-missing', message: 'the build-time dataset failed to parse: ' + (e instanceof Error ? e.message : String(e)) } };
        }
      }
      return noDataset();
    },
  };
}
