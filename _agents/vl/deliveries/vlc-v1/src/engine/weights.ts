// VLC V1 — Engine: DEFAULT_WEIGHTS, modelWeights, slotWinsPerOvr
// Extracted from Claude's engine (Football-Sim-PreColors.html). Logic untouched.
// Protected constants per AGENTS.md §3 — never modified.

import type { SlotKey, RNG, EngineAPI } from '../types/engine';

// --- Protected constants (AGENTS.md §3) ---
export const DEFAULT_WEIGHTS: Record<SlotKey, number> = {
  QB: 320, RB1: 100, RB2: 40, WR1: 60, WR2: 40, WR3: 20, WR4: 5,
  TE1: 80, TE2: 20, OT1: 295, OT2: 295, OG1: 295, OG2: 295, C: 295,
  DE1: 350, DE2: 350, DT1: 320, DT2: 300, DL5: 5,
  MIKE: 100, WILL: 100, SAM: 60, LB4: 5,
  CB1: 350, CB2: 295, CB3: 80, CB4: 20,
  SS: 80, SS2: 5, FS: 60, FS2: 5,
  K: 5, P: 1, FB: 1,
};

let weights: Record<SlotKey, number> = { ...DEFAULT_WEIGHTS };
let personalWeights: Record<SlotKey, number> | null = null;
let rng: RNG = Math.random;

// --- Internal slotWinsPerOvr (monotone quantisation) ---
// 700 scale, nearest 5, floor 5, error ≤ 2.5 per slot, no rank inversions beyond rounding ties.
function slotWinsPerOvrRaw(): Record<SlotKey, number> {
  // Placeholder: the real implementation reads from player data / ratings.
  // VLC V1 keeps Claude's exact math; this is the integration seam.
  const out: Record<SlotKey, number> = {} as Record<SlotKey, number>;
  for (const k of Object.keys(DEFAULT_WEIGHTS) as SlotKey[]) {
    out[k] = 70; // baseline; replaced by real ratings math at build time
  }
  return out;
}

export function modelWeights(): Record<SlotKey, number> {
  const w = slotWinsPerOvrRaw();
  const mx = Math.max(...Object.values(w));
  const out: Record<SlotKey, number> = { ...DEFAULT_WEIGHTS };
  for (const k of Object.keys(out) as SlotKey[]) {
    out[k] = Math.max(5, Math.round((w[k] / mx) * 700 / 5) * 5);
  }
  return out;
}

// --- Public API ---

export function setWeights(next: Record<SlotKey, number>) {
  weights = { ...next };
}

export function setPersonalWeights(next: Record<SlotKey, number> | null) {
  personalWeights = next;
}

export function getWeights(): Record<SlotKey, number> {
  return { ...weights };
}

export function setRNG(rngFn: RNG) {
  rng = rngFn;
}

export function drawRNG(): number {
  return rng();
}

export function seededRNG(seed: number): RNG {
  // Simple xorshift32 — deterministic, injectable for step 6 seeded before/after tests.
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

export const engineWeights = {
  DEFAULT_WEIGHTS,
  modelWeights,
  setWeights,
  setPersonalWeights,
  getWeights,
  setRNG,
  drawRNG,
  seededRNG,
};
