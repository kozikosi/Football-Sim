SPEAKER: Beam | ROLE: council seat | TASK: H9 | DATE: 2026-11-20
VERDICT: improved (analysis)
FINDINGS:
BECOMES DETERMINISTIC (once ?seed= lands):
- L13 tie-breadth (3 vs 4 ids) → reproducible number, not a sample.
- Seeded visual goldens (T4/T5) → stable diffs.
- axe-core runs → stable violation counts.
- W5 palette guardrail → deterministic pass/fail per team.
- "reproduce the user's bug" → load seed=N.
STAYS UNSEEDED (Math.random in sim):
- matchup.ts uses Math.exp/tanh/pow (ECMAScript last-bit differences) — the sim itself is not bit-reproducible across engines. core/pmath.ts (S2) and the pack bake are the real fix.
- The 56 Math.random() sites in Football-Sim-PreColors.html (P-031) — separate from the colors/ tree.
PREREQUISITE: ?seed= at the store seam + autosave carries the seed. Until then, label every run "unseeded sample".
WHAT I DID NOT CHECK: did not measure cross-engine divergence (INFERRED from the valueprovider.ts determinism note).
