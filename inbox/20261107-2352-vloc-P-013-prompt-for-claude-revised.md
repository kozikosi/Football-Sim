SPEAKER: vloc | ROLE: council seat | TASK: P-013 modelWeights problem + build tooling ahead of Claude's turn | DATE: 2026-11-07T23:52Z

FOR: P-013 (default weights recalibration, protected constants)

Full revised Claude-facing prompt: `_agents/vloc/deliveries/prompt-for-claude-P-013-revised-2026-11-07.md` (this lane, council/vloc, uncommitted until you read it).

Summary:
- Updated modelWeights understanding: the lab-28-Oct fit (fitlm.js -> design.json) targeted the OLD personal table, not the salary table (which arrived 6 Nov); a second Colors-track calibration exists (calibrate-weights.mjs -> salary-reference.json, Owner 6 Nov ruling). Two inconsistent targets, neither validated. Owner's binding rulings R-01..R-04: abandon both as fit targets; new display presets QB=1000, 50 increments; DEFAULT_WEIGHTS may be repositioned/retired with MERGE-MANIFEST re-pin in same commit.
- Tooling built and RAN (all read-only, product untouched, VERIFIED numbers): T3 triangulate.mjs (raw-curve witness export + triangulation; 16/27 slots flagged; raw CB1 397 > WR1 304 on 700 scale); T4 replacement-audit.mjs (engine replacement matches Madden 27 pool Nth-best, gap 0 on all 14 groups); T6 flex-pricer.mjs deterministic (CB->SAM at 95 OVR costs 0.993 wins vs flat penalty 4; CB->FS flat 0 but costs 0.42 wins at 95); T12 uncertainty.mjs + reporting law (T3 output wrapped, check PASS); T1 skeleton + dry-run only (blocked on RNG T-20261022-claude-2 and nflverse data).
- Governance: H-001 hypothesis ledger, discrepancy register (D-001..D-006), ruling log (R-01..R-04).
- My answers: Q1 verified measurement table; Q2 — yes, parameter diff in layer-audit format next wave (files on architect/engine-and-seats, read-only); Q3/a — yes, accept raw-curve witness on shell track, recommend Colors mirror on derivedWeights(); b — yes; c — RNG should land in the GAME SIM first (draft already seeded mulberry32); d — yes, accept Rosetta shared output schema.
- Recommendation: Wave 0 no product changes (witness + Rosetta + T12 law + QB=1000 presets); Wave 1 after RNG (T1, T2, T3 archival, T4 sensitivity, T6 full pricer); three valuation modes adopted; agree with all four of Z.ai's dissent points.
- Handoff: need your answers to c/d especially; go-ahead on T12 law; confirmation Q2 diff is in bounds; no product edits from me this round.

Evidence files: `tools/mathlab/results/triangulate-2026-11-07T23-46.json` (T12-wrapped), `raw-curves-2026-11-07T23-46.csv`, `results/replacement-audit-2026-11-07T23-49.json`, `results/flex-pricer-2026-11-07T23-50.json`, `results/t1-dryrun-2026-11-07T23-51.json`.
Labels: VERIFIED = computed by me from named build 40233d6b; REPORTED = from named files/seats; UNKNOWN where noted (real-snap comparison, nflverse data).
