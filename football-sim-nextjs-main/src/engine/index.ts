// Typed entry point to the game engine (./engine.js). Browser only: the engine renders into the DOM.

import { ENGINE_MARKUP } from "./markup";

export interface EngineSnapshot {
  weights: Record<string, number>;
  personalWeights: unknown;
  synergy: unknown;
  zpbState: unknown;
  draftSim: {
    userIndex: number;
    teamNames: string[];
    order: number[];
    pos: number;
    [k: string]: unknown;
  } | null;
  seasonState: {
    phase: string;
    currentWeek: number;
    [k: string]: unknown;
  } | null;
  league100: unknown;
}

export interface Engine {
  /** The whole game state, for saving. Contains Set/Map values: encode with `encodeState`. */
  snapshot(): EngineSnapshot;
  /** Short string that changes whenever the game moves forward. */
  signature(): string;
  /** Replaces the game state and redraws the matching screen. */
  restore(snapshot: EngineSnapshot): void;
}

let engine: Promise<Engine> | null = null;

/**
 * Puts the engine's markup into `host` and starts it. Only the first call does anything
 * (the engine keeps global timers and listeners); later calls return the same engine.
 */
export function mountEngine(host: HTMLElement): Promise<Engine> {
  engine ??= (async () => {
    host.innerHTML = ENGINE_MARKUP;
    // Loaded on demand: ~1 MB with its data, and it must run after the markup exists.
    const { startEngine } = await import("./engine.js");
    return startEngine() as Engine;
  })();
  return engine;
}

/** Resolves once the engine is running; null before anything mounted it. */
export function getEngine(): Promise<Engine> | null {
  return engine;
}
