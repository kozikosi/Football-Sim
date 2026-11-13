SPEAKER: Z.ai | ROLE: High Councillor (seat ZAI) | TASK: P-345 innovation round — question 4 (gravity as a formally measured stat) | DATE: 2026-11-11
FOR: P-345

# Gravity's first measurement is already in the public data — and it is stable enough to price

**Method / oracle:** measurements below are computed from the P-344 nflverse release (council/muse `c7540b04`; all 30 files sha256-verified before use; scripts `phase2_real.py` + the inline receipt script, deterministic, no RNG; full trail in the P-346 Phase 2 real delivery). No engine contact; no product file touched. The flex oracle referenced where pricing is mentioned is the live 99-rule table (delivery copy `flex-99-live.json`, byte-identical to `architect/engine-and-seats:tools/mathlab/flex.json`, 99 rules — checked this session).

## The idea

The Owner asked (P-335) whether gravity — double teams, usage, defensive attention — can be measured and shown, possibly inside the formula. The council has been waiting for charting data (PFF/SIS-class) to measure it. **That wait is wrong for the first measurement: the public P-344 files already carry a gravity stat that is stable, cheap, and formula-ready — the top receiver's share of his team's deep targets.** One number per team-game, computable with one name-join, no vendor.

## The measurement (VERIFIED — computed this session on the verified files)

**Top-WR share of team deep targets (passes with air_yards ≥ 15), league mean of team means, regular seasons:**

| 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|---|---|---|---|
| 0.325 | 0.335 | 0.310 | 0.304 | 0.309 | 0.313 | 0.313 | 0.331 | 0.327 | 0.315 |

Receipt: `b2_gravity_index.json` (Phase 2 real delivery). Range across ten seasons: **30.4–33.5%** — a ±3-point band for a DECADE, across two rules regimes and a personnel evolution. The top WR takes just under a third of every deep shot his team takes, every year. That concentration *is* gravity showing up in usage, and it is exactly the shape a formula term can ride.

Supporting measurements, same files (VERIFIED, `phase2_real_results_reg.json`):
- Real top-WR volume: **7.0–7.7 targets/team-game, 2.0–2.2 deep (≥15 yd) targets/team-game**, stable all decade — by the snap-count WR1 or the most-targeted WR (the two definitions agree in aggregate; per-team concordance 0.63–0.78, reported, not hidden).
- The staged Ledger's WR1 receives ~12.4 targets/team-game (~33% of team passes) against the real ~20% — the engine over-concentrates the alpha seat; the real concentration lives in the deep-target *share* (the ~1/3 above), not in total volume.

## What the event schema needs (the schema ask in the question)

The public files get gravity to a one-number proxy. For the play-level engine's event log to measure it natively, each pass event should carry:
1. `double_team` (bool) — the charting-class flag; NOT in any public release (UNKNOWN where to get it: PFF/SIS charting is paid; NGS tracking frames are public only for the Big-Data-Bowl week windows). Until it exists, the deep-target share is the measured stand-in.
2. `coverage_assignment` (nearest-defender id + type) — derivable from tracking frames if the Owner ever ships them; public pbp has `defense_man_zone_type`/`defense_coverage_type` only for 2023+ (NGS columns, verified present in the participation files).
3. `usage_share` per play (which receiver the play was designed for — `route` is in the 2023+ NGS columns already; earlier seasons UNKNOWN).

The cleanest first engine measurement when the play model lands: emit `gravity_index = topReceiverDeepTargetShare` per team-game in the folds — the fold produces it for free from the event log, and the Ledger's staged value becomes comparable to the real 0.30–0.34 the way the spot shares now are.

## Why it matters / what would falsify it

- Why: gravity enters v (Q6's ruling, adopted via the Ledger path) — a measured, stable 1/3-deep-target concentration is the seed number a gravity term multiplies, and the draft board can show it as a stat (the "usage column" Pickle proposed is this number's cousin). A stable decade-long constant is also a *portable* one — the multisport version ("top option's share of high-leverage touches") is the same formula with a different event stream.
- Falsified if: the deep-target share collapses toward the WR corps' average (≈0.25 for three receivers) in some future league snapshot — that would say deep-ball concentration is era-specific and should not be a formula constant. The decade table above says the opposite so far.
- Also falsifiable now: if double-team flags arrive (any season of charting), the real doubles/team-game vs the staged trigger's 4.37 and the 3–6 REPORTED band is a one-script comparison — the schema field above is the only missing piece.

## What it would take to test

A prototype that runs today (data, not opinion): the Phase 2 real delivery computes the index for all ten seasons in ~2 minutes from the manifest files. Extending it per-player (WR2/TE1 shares, a Herfindahl of deep-target concentration) is one function. The engine-side fold version is a fold over the event log once Phase 1's play model emits receiver-level targets — no new machinery.
