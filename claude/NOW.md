# NOW (Architect)
Updated: 2026-11-11. Boot-v3.8 OK. Push works from the boot clone (add_repo "push" done once this session).
- DONE: Phase 0 kernel + legacy provider, pushed 7b34a58. Kernel in `colors/src/core/` (keyedrng, events, fold, pack); `colors/src/sports/nfl/engine/legacyprovider.ts` wraps the old drive engine as events + folds.
- VERIFIED gate: fold(log) deep-equals old GameResult and BoxScore on 60 seeded games incl. playoff and OT; Philox matches Random123 vectors; 318 tests, 316 pass; tsc ratchet 91/91.
- Owner answers recorded: `claude/rulings/2026-11-11-owner-answers-design-13.md`. Phases 0-1 GO; totals bar ~10% (general realism, not exact 2025); 2nd sport basketball, after football; no historical Madden ratings needed.
- Honest limit: the adapter replays the old engine's facts as events; it is not play-level. Phase 1 builds the real play-level football model.
- PRE-EXISTING failures at a0ddc58 (also on clean HEAD): `test/nfl/versions.test.ts` E5 pin and `test/nfl/lineup.test.ts` "totals are not comparable". Owner decides re-pin after the 10 Nov flex-floor change.
- NEXT: (1) council ask for nflverse PBP/participation/snap counts 2016-2025 (released by Owner go); (2) Phase 0 tail: migrate one consumer (recap or standings) to `foldLog`; (3) Phase 1 baseline, all lambda = 0, gate = ~10% totals bar.
- UNKNOWN: proxy access to nflverse releases; lambda identification from OVR-only data (largest risk).
- Blockers: Held (Owner): CI gate pick, hydration wiring. E3c flexengine not run. Pending Z.ai asks: P-308 FB/P/CB4 snaps, RNG landing plan, Rosetta keys.
