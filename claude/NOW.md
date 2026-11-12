# NOW (Architect)
Updated: 2026-11-11. Boot-v3.8 OK. Push works from the boot clone (add_repo "push" done once this session).
- DONE: Phase 0 kernel + legacy provider, pushed 7b34a58. Kernel in `colors/src/core/` (keyedrng, events, fold, pack); `colors/src/sports/nfl/engine/legacyprovider.ts` wraps the old drive engine as events + folds.
- VERIFIED gate: fold(log) deep-equals old GameResult and BoxScore on 60 seeded games incl. playoff and OT; Philox2x32 matches the published Random123 kat_vectors (M0 0xd256d193 confirmed vs philox.h; M0 0xD2511F53 is the 4x32 constant, MUSE fix withdrawn) and an independent BigInt reference; 320 tests, 318 pass (2 fail: flex-base totals + E5 stamp pins, Owner re-pin pending); tsc ratchet 91/91.
- Owner answers recorded: `claude/rulings/2026-11-11-owner-answers-design-13.md`. Phases 0-1 GO; totals bar ~10% (general realism, not exact 2025); 2nd sport basketball, after football; no historical Madden ratings needed.
- Honest limit: the adapter replays the old engine's facts as events; it is not play-level. Phase 1 builds the real play-level football model.
- PRE-EXISTING failures at a0ddc58 (also on clean HEAD): `test/nfl/versions.test.ts` E5 pin and `test/nfl/lineup.test.ts` "totals are not comparable". Owner decides re-pin after the 10 Nov flex-floor change.
- DONE: council ask SENT `inbox/20261111-0902-architect-ASK-phase-1-football-baseline-data.md` (nflverse PBP/participation/snaps + team-game targets, 2016-2025). Waits for council answer.
- NEXT: (1) read the council answer (`council.mjs digest`); (2) Phase 0 tail: migrate one consumer (recap or standings) to `foldLog`; (3) Phase 1 baseline, all lambda = 0, gate = ~10% totals bar.
- UNKNOWN: proxy access to nflverse releases; lambda identification from OVR-only data (largest risk).
- Blockers: Held (Owner): CI gate pick, hydration wiring. E3c flexengine not run. Pending Z.ai asks: P-308 FB/P/CB4 snaps, RNG landing plan, Rosetta keys.
