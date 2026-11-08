// The valuation modes (the Owner's Nov 8 decisions, wired in from the start — not bolted on).
//   measured  — "Model Value": the weights come OUT of the engine's measured impact. THE DEFAULT.
//   balance   — "Game balance": the game-day tuning preset.
//   owner     — "Owner preset": the Owner's own 32-slot table, one click away.
// The current mode is echoed in the subtitle EVERYWHERE numbers appear (provenance travels with
// every displayed number). The switch is DISABLED mid-draft — never change the valuation basis
// in the middle of a draft. Modes are never blended: one at a time, labelled.
export type ValuationMode = 'measured' | 'balance' | 'owner';

export const MODE_LABEL: Record<ValuationMode, string> = {
  measured: 'Model Value',
  balance: 'Game balance',
  owner: 'Owner preset',
};

export interface ModeState { mode: ValuationMode; locked: boolean }

let state: ModeState = { mode: 'measured', locked: false }; // measured IS the default
const subs = new Set<(s: ModeState) => void>();

export const valuation = {
  get(): ModeState { return state; },
  set(mode: ValuationMode) { if (state.locked) return; state = { ...state, mode }; subs.forEach((f) => f(state)); },
  lock() { state = { ...state, locked: true }; subs.forEach((f) => f(state)); },
  subscribe(f: (s: ModeState) => void): () => void { subs.add(f); f(state); return () => subs.delete(f); },
};
