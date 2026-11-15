// The engine store (app/store.ts — the only DraftStoreState/DraftStoreAction, F1) wrapped for Svelte 5.
// The store is framework-free; this file only adapts it to Svelte's readable contract. No engine edits.
import { readable, writable } from 'svelte/store';
import { createStore } from '../engine/sports/nfl/app/store.ts';
import type { Store } from '../engine/sports/nfl/app/store.ts';
import type { Player } from '../engine/sports/nfl/engine/players.ts';

export type DraftStore = Store;

export function makeDraftStore(players: readonly Player[]): DraftStore {
  return createStore(players);
}

export function asReadable(store: DraftStore) {
  return readable(store.getState(), (set) => store.subscribe(set));
}

export function makeWritable<T>(init: T) {
  return writable(init);
}
