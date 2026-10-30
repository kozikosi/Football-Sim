// Protected constants (AGENTS.md §3) — must match Pre-Colors values.
// Any change re-pins the hash in MERGE-MANIFEST.md.
export const DEFAULT_WEIGHTS = { QB:1, RB:1, WR:1, TE:1, OL:1, DL:1, LB:1, CB:1, S:1, K:1, P:1 };
export const FLEX = 1; // placeholder; real value from Pre-Colors
export const MC = 1;
export const PLAN_K = 1;
export const RATING_SPECS = {};
export const NATURAL_SLOT_MAP = { CB4: 'CB' }; // w38: Dime slot added
export const SLOT_GROUPS = { offense:['QB','RB1','RB2','WR1','WR2','WR3','WR4','TE1','TE2','TE3','LT','LG','C','RG','RT'], defense:['DE1','DE2','DT1','DT2','OLB1','OLB2','ILB1','ILB2','CB1','CB2','CB3','CB4','FS','SS'], special:['K','P','KR','PR'] };

// Seeded RNG (T-20261022-claude-2) — mulberry32
export function makeRng(seed) {
  let s = seed >>> 0;
  return function() {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
