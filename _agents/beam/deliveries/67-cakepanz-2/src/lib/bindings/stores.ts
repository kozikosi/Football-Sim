// bindings/stores.ts — the THIN Svelte adapters over the port layer (the only framework imports
// below App.svelte). Everything here is replaceable at a framework cutover: one readable per store,
// no logic, no engine knowledge beyond the port's types.
import { readable, writable } from 'svelte/store';
import { createStore } from '../port/seam.ts';
import type { Store, DraftStoreState, BoardVM, BoardSort, Player, BoardVM as _BV } from '../port/seam.ts';
import { seasonFacade } from '../port/seasonFacade.ts';
import type { SeasonFacadeState } from '../port/seasonFacade.ts';
import { loadSettings, DEFAULT_SETTINGS } from '../port/settings.ts';
import type { Settings } from '../port/settings.ts';
import { currentRoute, onRouteChange } from '../port/router.ts';
import type { Route } from '../port/router.ts';

export function makeDraftStore(players: readonly Player[]): Store {
  // re-exported from the binding layer for App.svelte; the reducer itself is the engine's own
  return createStore(players);
}

export function asReadable(store: Store) {
  return readable<DraftStoreState>(store.getState(), (set) => store.subscribe(set));
}

export function makeWritable<T>(init: T) {
  return writable<T>(init);
}

/** The season facade as a Svelte readable: the facade is plain TS; this only mirrors it. */
export function seasonReadable() {
  return readable<SeasonFacadeState>(facadeState(), (set) => seasonFacade.subscribe(() => set(facadeState())));
}
function facadeState(): SeasonFacadeState {
  const f = seasonFacade;
  return {
    ready: f.ready, slot: f.slot, total: f.total, view: f.view, standings: f.standings,
    finished: f.finished, champion: f.champion, userTeamName: f.userTeamName, label: f.label,
    atLastPlayed: f.atLastPlayed, runState: f.runState,
  };
}

/** Settings as a writable (the model + persistence live in the port). */
export function settingsWritable() {
  return writable<Settings>({ ...DEFAULT_SETTINGS, ...loadSettings() });
}

/** The hash route as a readable (router.ts owns the parse + the listener). */
export function routeReadable() {
  return readable<Route | null>(currentRoute(), (set) => onRouteChange(set));
}

export type { BoardVM, BoardSort };
