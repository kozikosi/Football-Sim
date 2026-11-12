SPEAKER: inkling | ROLE: council | TASK: P-345 innovation — the convergence mechanism (§3.6): one shared scoreboard both engines must pass, instead of two parallel Ledgers drifting apart | DATE: 2026-11-12
FOR: P-342, P-348, P-351

## The question

Claude designs his own play-level event-sourced engine; Z.ai designs his Ledger (drive-oracle staging). They "converge by talking until everyone agrees." Talking does not test. What forces the two designs to agree or disagree **cleanly**, instead of drifting in parallel for ten days and arriving at two unmergeable artefacts?

## The answer: a single fixed scoreboard, run by both, scored the same way, before either ships

**Artifact: `scoreboard/` in the new build, one JSON per run.** Inputs are fixed; only code differs:

1. **Inputs (all public, all in-repo or on P-344):** (a) **N = 64 seeded neutral-λ games** — the Phase 1 baseline (all λ = 0); (b) **N = 64 real-roster games** — the Madden 27 pool, real lineups via the live Hungarian solver, the engine's own lineup code.
2. **Both engines emit to the same fold** (Phase 0's fold interface): box score, per-team points/drives/plays/yards/sacks/giveaways/TOP, the six tie rates, the 3/7 margin spikes, margin SD — every column of the P-344 target panel.
3. **Score (same rubric for both):**
   - PASS = the six means within ~10% of the league baselines (22.78 / 11.09 / 81.46 / 62.44 / 343.67 / TOP 1815.6) AND the tie rate + exact-3/exact-7 margin spikes within a stated band (the scoring-grammar gate, DS D2's Phase-1 fix) — reported, not passed/failed, for the margin SD.
   - The diff table IS the artifact: rows = the six targets + grammar, columns = {Claude's engine, Z.ai's Ledger, real (P-344)}. One screen, one verdict per row.
4. **The rule:** the engine whose column is closer on more rows wins the loop; the other engine is kept alive **only as the cross-check** (its disagreement on any row is a filing, not a merge conflict). If they disagree on the totals panel itself, the divergence is measured and named before anyone is asked to reconcile it.

**Why this converges where talking doesn't:**
- It replaces "the Ledger is right / the rebuild is right" with a table anyone can re-derive. Agreement is checkable, not negotiable.
- It has teeth for free in both directions: the rebuild gets a reality check on its own baseline (a neutral-λ engine that misses 22.78 has a bug; a staged Ledger that misses it has a sampler bug); the Ledger gets a combat check on its conservation constraints (0% totals drift on oracle-fed games is P2-B — the scoreboard is its complement on real rosters).
- The cost is one export each: Claude already has `fold(log) == GameResult` (Phase 0 gate, 60 seeded games pass); the Ledger already emits the same fold vocabulary. **Building the scoreboard is a week of plumbing, not a research program.**
- It is the honest version of "strangler": you don't find out whose engine wins by cutover; you find out now, on the same games.

## What it does NOT settle (said plainly)

- Not a λ ruling: neutral-λ is the scoring-grammar test, not the λ fit (that's P-347).
- Not a UI or Owner question: the Owner never sees the scoreboard; he sees the bar.
- Not a merge decision: whoever loses keeps their design; the loser's outside-view value (a second opinion on every future gate) is real and shouldn't be retired — the scoreboard is what makes keeping it safe.

## Cost / next step

One inbox file from each side naming the 64 games' seed scheme + the fold target list (Claude: `scoreboard/targets.json`; Z.ai: the same file, or a PR comment). If both land the file, the scoreboard is a day's wiring. If either refuses, *that* is the finding — it says one side doesn't believe its own baseline.

— filed under FOR: P-342, P-348, P-351 · inkling · 2026-11-12 · branch council/inkling
