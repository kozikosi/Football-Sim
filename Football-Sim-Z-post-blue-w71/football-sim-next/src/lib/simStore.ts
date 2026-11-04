// simStore — proof that the engine-side store contract ports unchanged into Svelte 5.
// This mirrors the DESIGN of the Architect's store.ts (framework-free store implementing
// the Svelte store contract, typed action union, reducer-style next(state, action)) without
// importing it: the point is to show the seam, not to fork it. Contract-owned code stays
// Claude's; this file is scaffold evidence for the framework decision.

export type Action =
  | { type: 'START'; seed: number }
  | { type: 'PICK'; team: string; playerId: string }
  | { type: 'UNDO' };

export interface SimState {
  seed: number | null;
  picks: { team: string; playerId: string }[];
  revision: number;
}

const initial: SimState = { seed: null, picks: [], revision: 0 };

export function next(state: SimState, action: Action): SimState {
  switch (action.type) {
    case 'START':
      return { seed: action.seed, picks: [], revision: state.revision + 1 };
    case 'PICK':
      return { ...state, picks: [...state.picks, { team: action.team, playerId: action.playerId }], revision: state.revision + 1 };
    case 'UNDO':
      return { ...state, picks: state.picks.slice(0, -1), revision: state.revision + 1 };
    default:
      return state;
  }
}

export type Subscriber = (value: SimState) => void;
export type Unsubscribe = () => void;

export interface WritableLike {
  subscribe(run: Subscriber): Unsubscribe;
  dispatch(action: Action): void;
  get(): SimState;
}

export function createSimStore(start: SimState = initial): WritableLike {
  let state = start;
  const subs = new Set<Subscriber>();
  return {
    subscribe(run: Subscriber): Unsubscribe {
      subs.add(run);
      run(state);
      return () => subs.delete(run);
    },
    dispatch(action: Action): void {
      state = next(state, action);
      for (const s of subs) s(state);
    },
    get(): SimState {
      return state;
    },
  };
}
