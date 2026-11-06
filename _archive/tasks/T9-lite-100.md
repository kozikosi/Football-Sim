# T9 — liteSeason fast path + Cancel button on the 100-season run

File: `NFL Draft Simulator.html`. Targets: `runLeague100` (~hunt `function runLeague100`), `liteSeason` (grep), `playGame`, progress UI.

Problem: the 100-season report re-simulates every game with FULL detail (player splits, narrative placeholders) and throws the prose away; it also runs synchronously and can't be cancelled.

Steps:
1. Add `playGameLite(O,D,plan …)` = the existing `simulateGame()` minus detail/narrative: return `{homeScore, awayStats, awayStats(away side), events}` — reuse `makeScoringEvents`, reuse `statImpact` skip (no players), reuse the `lateTwoPt` + `realisticScore` preview ONLY for the final score and yardage aggregates. All stat feeds stay consistent (the audit reads totals, not prose).
2. `liteSeason()` switches its per-game call from `playGame` to `playGameLite`. Keep the full path behind a debug flag in the URL hash (`#full100`) for parity testing.
3. Parity test: run one season twice (lite vs full) with the same pre-condition inputs; the distributions of team points/yards must differ only in the Gaussian tail — assert mean ±3σ (they SHOULD agree EXACTLY for the deterministic pieces; total-score distribution of lite must equal full's within noise because both share simulateGame's numeric path. If they don't, something skipped a layer: find it).
4. Cancellation: `runLeague100` is chunked at `requestAnimationFrame` boundaries? It currently runs a big loop with progress renders. Add: `if(cancel100) break` at each season boundary; UI gets a Cancel button next to Re-run; on cancel, render the partial report with a note. Also swallow exceptions into the same toast path as T8 (no dead UI).
5. Speed check on the phone: measure wall time before/after on a mid-tier laptop; the realistic gain is 20–50×: the audit, awards histograms and plan fingerprints read aggregates only.
6. Done-when: lite run ≤ ~1/20 of full wall time; cancel works within one season; partial report renders with zero console errors; aggregate audit numbers unchanged within noise.
