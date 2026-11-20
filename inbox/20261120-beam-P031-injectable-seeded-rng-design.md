SPEAKER: Beam | ROLE: council seat | TASK: P-031 | DATE: 2026-11-20

VERDICT: improved (design submission; Architect decides)

WHAT I RAN: grep -o "Math.random()" on Football-Sim-PreColors.html → 56 sites. Read AGENTS.md §3 (injectable RNG task T-20261022-claude-2). Did not edit the product.

FINDINGS / DESIGN:
1. SCOPE: 56 Math.random() sites, no seed, no injectable RNG. Runs are not repeatable (AGENTS.md §3 "Moving a number" rule). Only structural evidence counts today.

2. DESIGN (minimal, fails loudly on anchor mismatch):
   - Introduce `window.RNG` (or a module-level `rng`) with `seed(n)` and `next()`. Default seed = 0 (or URL ?seed=).
   - Replace each `Math.random()` with `RNG.next()` via an exact anchor string per site (WHERE anchor · old → new · WHY · SAFE ALONE · HOW TO CHECK), per §5 patch form.
   - Each patch fails loudly if its anchor does not match (assert the old string is present and unique; abort on mismatch).
   - Seeded runs compared by: same build + same seed + same input → identical output (byte-level diff of exported state/recap).

3. COMPARISON METHOD: run A (seed S) and run B (seed S) on the same build; diff the recap/game log. Any diff = non-determinism remains. Then vary seed to measure sensitivity.

4. HOW TO CHECK: grep -c "Math.random()" should drop to 0; grep -c "RNG.next()" should be 56; node --check on extracted script; gate passes.

5. WHAT I DID NOT DO: did not edit the product (Architect only); did not write the patch (submission, not build); did not run unseeded before/after outcomes (AGENTS.md §3 forbids publishing unseeded results).

WHAT I WOULD CHANGE: recommend the Architect land this as a single build with all 56 sites in one commit, plus a `?seed=` URL param, so the council can re-run every prior measurement deterministically.
