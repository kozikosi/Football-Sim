# NOW (Architect)
Updated: 2026-11-11. Boot-v3.8 worked: clone + bootstrap needed one explicit Owner line after a classifier denial; push access granted via `add_repo` "push" (clone reused, no second clone).
- DONE 11 Nov: Owner asked for the best long-term multisport engine, hybrid or full rebuild, cost no object. Wrote `tools/mathlab/results/engine-design-2026-11-11.md`: ONE play-level event-sourced model (duty-gap multinomial, keyed RNG, rules as data, model packs), two views (Monte Carlo + exact solver), delivered as a strangler; old engine = plumbing oracle only.
- CHANGED my 10 Nov view: the 32-spot table is NOT a gate (Owner 8 Nov: engine input determines specs, curve is output). Rebuild is justified by portability and one source of truth, not by flex.
- VERIFIED (toy, NOT football): `tools/mathlab/toykernel.mjs`; solver = simulator (z 0.62); solver derivative exact; pairing cuts pricing variance 3.0x, keyed+inverse CDF 3.8x (only 1.26x over paired sequential).
- Rulings recorded: `claude/rulings/2026-11-11-owner-rebuild-direction.md` (FB scarcity, C>OG nonissue relayed by MUSE; REPORTED).
- NEXT: Owner (1) approve the direction and Phases 0-1; (2) totals-bar tolerances (design section 8); (3) basketball or baseball as second sport; (4) historical Madden ratings exist? Then council ask for nflverse PBP/participation/snap counts (not sent; waits for the go).
- UNKNOWN: whether the proxy lets the shell reach nflverse releases (untested); lambda identification from OVR-only data (largest risk); chain-solver pricing without score/clock state.
- Blockers: tsc:check needs `npm ci` in colors/. Held (Owner): CI gate pick, hydration wiring. E3c flexengine not run. Pending Z.ai asks: P-308 FB/P/CB4 snaps, RNG landing plan, Rosetta keys.
