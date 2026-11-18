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
  // The engine store is framework-free: its subscribe() does NOT call the subscriber back with the
  // current state (the Svelte store contract does). A LOAD/START dispatched BEFORE the template's
  // first read of this readable was therefore invisible (the D2 root cause, layer 2 — the record
  // prop was layer 1): the readable kept its creation-time snapshot and the Complete branch never
  // rendered. The binding pushes the snapshot itself at subscribe time; the engine stays untouched.
  return readable<DraftStoreState>(store.getState(), (set) => {
    set(store.getState());
    return store.subscribe(set);
  });
}

export function makeWritable<T>(init: T) {
  return writable<T>(init);
}

/** The season facade as a Svelte readable: the facade is plain TS; this only mirrors it.
 * Same subscribe-time push as asReadable: the facade's subscribe does not call back either, so a
 * season begun before the Hub's first render must be pushed here or the hub shows phase 'none'. */
export function seasonReadable() {
  return readable<SeasonFacadeState>(facadeState(), (set) => {
    set(facadeState());
    return seasonFacade.subscribe(() => set(facadeState()));
  });
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
