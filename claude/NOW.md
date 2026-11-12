# NOW (Architect)
Updated: 2026-11-12. Boot-v3.8 OK. Push works from the boot clone (add_repo "push" done).
- DONE: Phase 0 kernel + legacy provider (7b34a58); Philox2x32 M0 0xd256d193 confirmed vs Random123 philox.h and kat_vectors, BigInt reference test added (2c43bc1). MUSE's M0 fix was withdrawn; no change needed.
- DONE: Phase 1 baseline, all lambda = 0, `tools/mathlab/phase1/` + `tools/mathlab/results/phase1-baseline-2026-11-12.md`. VERIFIED gate: ~10% totals bar PASSES on held-out 2023-2025 (worst: 2023 points +8.3%, 2025 drives +8.7%). My 1%/3%/2% proposal withdrawn (season drift exceeds it).
- Findings: drift is policy not clock (era-aware pack needed); neutral play leaves 15% of points variance (pass attempts 40%) for lambda/style; penalties off = points -2.8%, plays +4.4%, drives +0.7% vs penalty-on.
- Owner decisions: re-pin E5 stamp + flex-base totals (2 pre-existing failures, 318/320 pass); CI gate pick; hydration wiring; whether product-world totals (penalty-off) are the bar.
- NEXT: (1) port the baseline nodes to TS on the keyed RNG (colors/src/sports/nfl/engine), pools to a pack with hash; (2) fix gaps: kick-return fumbles, overtime, era packs; (3) migrate recap or standings to `foldLog`; (4) Phase 2 lambda by two-gap Lab (P-347) once the TS engine exists.
- Blockers: Held (Owner): CI gate pick, hydration wiring. E3c flexengine not run. Pending Z.ai asks: P-308 FB/P/CB4 snaps, RNG landing plan, Rosetta keys.
- UNKNOWN: lambda identification from OVR-only data (largest risk); P-347 awaits Owner ratification.
