# Champion variance study — the merge-candidate gate is a smoke test, not a statistical one

**SPEAKER: LongCat | ROLE: Council reviewer (S-2400–2499) | TASK: champion variance study (VLOC assignment) | DATE: 2026-10-21 (UTC)**

**Assignment:** VLOC — run the smoke gate on `merged.html` (sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B, `merge/v20-donor @ ff8c05ae0ef8`) at least 5 times; record champion, exit code and A/B/C/D; confirm the gate certifies that the build runs but cannot certify balance. Read-only on the product; no seeded RNG added.

## Method

Command (identical for every run):

```
node tests/e2e-smoke.mjs merged.html --port 9222
```

Browser: Brave headless over CDP, `Chrome/151.0.7922.137`; viewports 390×844 + 1280×900 (the gate sets both). Sample size: **5 runs** on the same artifact.

## Results

| # | run id (UTC) | exit | verdict | champion | games | draft | offenders | page errors |
|---|---|---:|---|---|---:|---|---:|---:|
| 1 | 2026-10-21T01:43:06.943Z | 0 | PASS | **Jacksonville Jaguars** | 272 | 832/832 | 0 | 0 |
| 2 | 2026-10-21T01:43:44.324Z | 0 | PASS | **Tampa Bay Buccaneers** | 272 | 832/832 | 0 | 0 |
| 3 | 2026-10-21T01:44:22.177Z | 0 | PASS | **Cincinnati Bengals** | 272 | 832/832 | 0 | 0 |
| 4 | 2026-10-21T01:44:59.543Z | 0 | PASS | **Minnesota Vikings** | 272 | 832/832 | 0 | 0 |
| 5 | 2026-10-21T01:45:36.854Z | 0 | PASS | **Cleveland Browns** | 272 | 832/832 | 0 | 0 |

Receipts: `_agents/longcat/evidence/variance-run1.json … variance-run5.json`.

## Findings

1. **Five runs, five different champions** (Jacksonville, Tampa Bay, Cincinnati, Minnesota, Cleveland). Combined with my two earlier runs of the same artifact (Baltimore Ravens, Atlanta Falcons) that is **seven distinct champions across seven runs**. MOC's M-85 §3 recorded three more (New England Patriots, Houston Texans, Los Angeles Chargers) on the same hash.
2. **Invariant across every run:** exit 0, verdict PASS, **272 games**, draft 832/832, **0 viewport offenders**, **0 page errors**, 0 console errors. The gate's checks are deterministic; the season outcome is not.
3. **Cause:** the build has **58 `Math.random()` sites and no seeded RNG**, so a run is not reproducible by seed. The champion is therefore **INFERRED per run** — a single sample of one stochastic season, not a measurement.
4. **Conclusion (the point of the study):** the gate **certifies that the build runs** — the flow completes, the report renders, nothing overflows, nothing errors. It **cannot certify season balance, champion realism, or win correlation.** A PASS receipt from this gate must never be read as evidence that the simulation is balanced or that a champion is realistic. This is exactly the Owner's ruling: *"a test PASS is not product acceptance."*

## Labels

- **VERIFIED:** the five runs, their exit codes, champions, game counts, offender and error counts (command + receipts above).
- **INFERRED:** each champion is one stochastic sample; no champion is "the" champion.
- **UNKNOWN:** whether the season engine is balanced; that needs a different instrument (e.g. a 100-season win-correlation study), not this gate.

## Files

- `_agents/longcat/notes/champion-variance-study.md` (this file)
- `_agents/longcat/evidence/variance-run{1..5}.json`

No product edit; no seeded RNG added; read-only on `merged.html` (hash unchanged `40233d6b…`).
