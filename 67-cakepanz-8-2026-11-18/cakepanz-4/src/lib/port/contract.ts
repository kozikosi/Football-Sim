// port/contract.ts — THE ENGINE/UI CONTRACT (framework-neutral, pure types: no engine import, no
// framework import). Every screen and every view model in the shell talks to the engine ONLY through
// the EnginePort defined here. If a screen needs something this contract cannot express, that is a
// §5 proposal to the Architect — never a local reach into src/engine/**.
//
// MERGE LAW (the cone, M1–M5): src/lib/port/seam.ts is the ONE file that imports src/engine/**.
// Screens import `port` modules, which import `seam`. A framework re-bind (Vue/Svelte) replaces only
// src/lib/bindings/** and the .svelte files; this folder is mechanically re-usable as-is under any
// ordinary TS runtime (no runes, no lifecycle, no framework imports — enforced by the node battery).

// ---------- draft-side shapes (the snapshot's own view models, verbatim shapes) ----------
// BoardRowVM / BoardVM / BoardHeaderVM / GoneOdds are structurally the snapshot's draftBoard.ts
// outputs; the seam re-exports the engine's own types, so the shell compiles against THOSE names.

// ---------- commands the shell issues (the EnginePort methods below) ----------
export interface StartDraftCommand {
  seed: number;
  userTeam: number;           // 0..31, the engine's team index
  order?: readonly number[];  // P-317: a custom draft order (team indices); omitted = the engine default
}

export interface PickCommand { playerId: string; slot: string }

// ---------- the season session (the week-stepper's facade state) ----------
export type SeasonPhase = 'none' | 'running' | 'finished';

export interface SeasonSession {
  phase: SeasonPhase;
  year: number;
  seed: number;
  slot: number;                    // the stepper's current week slot (1..22)
  totalSlots: number;
  userTeam: number;                // engine team index
  userTeamName: string;
  champion: string | null;
}
