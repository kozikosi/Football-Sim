// port/pace.ts — the Wave B #7 pace clamp (the Owner's 30–60 s cinematic window, exposed as ONE
// clamped value with three named speeds): Slower = 2.0, Standard = 1.0, Faster = 0.5 — the UI
// stores the named speed, the renderer multiplies the engine recaps' reveal durations by it, and
// clampPace() bounds whatever reaches it to [0.5, 2.0] so no surface can run the window past the
// Owner's 30–60 s envelope. The reduced-motion path (law L23's class) collapses the MOVEMENT
// (durations ≤ 200ms, no pans/zooms) while keeping every piece of information — the recap text,
// the scoring order, the turnovers — on screen.
//
// LAW: waveB battery W7 (the named speeds, the clamp bounds, the reduced-motion ceiling).
export const PACE_SPEEDS = ['slower', 'standard', 'faster'] as const;
export type PaceSpeed = (typeof PACE_SPEEDS)[number];

export const PACE_VALUE: Record<PaceSpeed, number> = { slower: 2, standard: 1, faster: 0.5 };
export const PACE_LABEL: Record<PaceSpeed, string> = { slower: 'Slower', standard: 'Standard', faster: 'Faster' };

export const clampPace = (v: number): number => Math.min(2, Math.max(0.5, v));

// the reduced-motion ceiling: any reveal the cinematic would run is clamped here — information
// stays, movement drops.
export const reducedMotionMs = (ms: number): number => Math.min(ms, 200);
