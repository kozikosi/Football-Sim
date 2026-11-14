// The bench boot — IDENTICAL BYTES in both arms (Tier 2 shares one store, one pool, one VM).
// buildPool from the bundled CSVs, createStore from the verbatim engine snapshot (src/bench/engine/,
// copy of colors/src at architect/engine-and-seats @ d3bd81d2), plus a window.__bench diagnostic
// handle for the Tier-2 driver. No framework imports here.
import ratingsCsv from '../data/madden27-ratings.csv?raw';
import faCsv from '../data/free-agents-old-ratings.csv?raw';
import idsCsv from '../data/player-ids.csv?raw';
import { buildPool } from '../engine/sports/nfl/engine/players.ts';
import { createStore } from '../engine/sports/nfl/app/store.ts';
import type { Store, DraftStoreState } from '../engine/sports/nfl/app/store.ts';
import { selectBoard, selectRoster } from '../engine/sports/nfl/app/selectors.ts';

export const players = buildPool(ratingsCsv, faCsv, idsCsv);
export const store: Store = createStore(players);
export { selectBoard, selectRoster };
export type { DraftStoreState };

(window as unknown as { __bench: unknown }).__bench = {
  store,
  selectBoard,
  selectRoster,
  vmText: (vm: unknown) => JSON.stringify(vm),
};

// The bench opens on the first pick of seed 1, user team 0 (the Tier-2 driver re-LOADs snapshots per cell).
store.dispatch({ type: 'START', seed: 1, userTeam: 0 });
