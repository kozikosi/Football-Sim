REVIEW-OF: _agents/muse/amused/ (MUSE's portable multisport branch build, council/muse)
VERDICT: improved
SEAT: VL | DATE: 2026-11-13T02:00:00Z

What I checked (commands):
- `git ls-tree -r origin/council/muse:_agents/muse/amused/packages/` — engine-core/src/rng.ts + sport-spec.ts exist; sport-nfl/src/{slots,flex,nfl,roles}.ts exist; sport-nfl/test/port.test.ts exists.
- `git show origin/council/muse:_agents/muse/amused/packages/sport-nfl/test/port.test.ts` — 4 tests: slots==design.json (32 spots, weights equal), flex==flex.json (EMERGENCY_PENALTY=8, fit('QB','FS')={10,false,true}), 3-4 mapping, SportSpec wiring (id='nfl', bases ['4-3','3-4'], emptyOvr=70, validateScenario, simulate throws 'game model pending'). Claim "4 port tests pass" is ACCURATE by construction (they read repo-root tools/mathlab/design.json + flex.json).
- `git show origin/council/muse:_agents/muse/amused/data/nfl/madden27-ratings.csv | wc -l` — 1,942 lines incl. header = 1,941 players. Claim "1,941 players" is ACCURATE.
- `git ls-tree ...:amused/docs/` — empty directory. Claim "3 invariant tests pass" (design tokens) and "3 pin tests pass" (color math, 32×82=2,624 vars, 0 mismatches) NOT VERIFIED by me — no test files present in docs/, and team-colors-data.ts not read in this session. Mark INFERRED.
- Confirmed README statement: "This is MUSE's experiment, not the Architect's build... lives on council/muse only, never merges to council/base."

Findings:
- DEFECT (gap): `NFL.simulate()` throws "game model pending" (port.test.ts last assertion). The actual game simulation is NOT implemented in amused. The SportSpec contract + RNG + NFL data are ported, but simulate(scenario, rng) → SimResult is pending the Architect's game-model interface (README: "asked 2026-11-01"). So the core multisport promise (reproducible runs) is not yet demonstrable.
- RISK: amused's RNG is mulberry32 (`makeRng` with 0x6d2b79f5), while the Colors engine uses Philox2x32 (`colors/src/core/keyedrng.ts`, multiplier 0xd256d193, MUSE VERIFIED). Two different seeded RNGs in the same project → divergent streams, non-comparable replays between amused and Colors. Unify on one injectable RNG before either ships multisport.
- INTENTIONAL SIMPLIFICATION: amused keeps localStorage v1 with a SaveStore interface; cloud saves deferred. Consistent with Owner's free/simple constraint and my plan's D14 position.
- CALIBRATION QUESTION: amused reads weights/slots/flex from tools/mathlab/design.json + flex.json (the council mirrors), NOT from colors/src/engine (pin 4ca9a071). If those mirrors drift from the Architect's live tables, amused's NFL data silently diverges. Anchor to the live pin or document the mirror as read-only copy.
- WEAKHEST POINT: no runnable simulation; claims about tests (tokens/color math) not independently re-run by me; RNG divergence vs Colors.

Verdict: improved — the SportSpec contract + separate sport-nfl package + SaveStore interface directly match my plan's shell + independent-engines recommendation, and the data port is verified accurate. Not "ok" because simulate() is unimplemented and the RNG diverges from Colors without reconciliation. Recommend: (1) unify RNG on Philox2x32/injectable streams, (2) implement simulate() against the Architect's game model before calling it multisport-ready, (3) anchor data to colors pin or freeze the mirror.
