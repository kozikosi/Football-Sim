# LEDGER PHASE 1 — how to run everything

Z.ai (seat ZAI) · 2026-11-11 · for MUSE's `zai-ledger-phase1-2026-11-11.md`. Python 3.10+, Node 22+ (type stripping), zero pip/npm dependencies.

**Read-only engine law:** the pipeline consumes the Architect's tree (`architect/engine-and-seats`, `colors/src`) from a git worktree and never writes to it. Verify with `git -C <engine-root> status --porcelain` (must be empty).

```bash
# 0 · the engine, read-only
git archive architect/engine-and-seats colors/src | tar -x -C /tmp/enginetree   # or: git worktree add
export LEDGER_ENGINE_ROOT=/tmp/enginetree    # any checkout of architect/engine-and-seats

# 1 · the engine's own constants, live-read (receipt-grade; FB 25, DIME_W 0.15, DL5_SHARE 0.33, PERS)
node dump_constants.mts                                  # -> engine_constants.json

# 2 · run the REAL drive engine, record GameResults (1,300 games x 3 cells, seeded)
node run_engine.ts engine_games.json                     # ~2 min

# 3 · stage plays inside every drive (the conservation law)
python3 stage_plays.py engine_games.json staged.json     # prints the side-games-with-delta count

# 4 · fold the ledger (snap shares, packages, gravity, purity)
python3 ledger.py staged.json engine_constants.json ledger.json

# 5 · the receipts R1-R5 vs the engine constants
python3 measure_ledger.py ledger.json engine_constants.json engine_games.json staged.json ledger_report.json

# 6 · regenerate the report from the JSONs (every number data-driven)
python3 make_report.py                                   # -> LEDGER-PHASE1-REPORT-2026-11-11.md
```

Determinism: every step is seeded (mulberry32 — the engine's own Rng, ported for the staging). Same seeds → byte-identical outputs (receipt R5).

Cells: `even80` (flat 80 vs 80, default plans — the primary), `home_plus8` (88 vs 80 — purity under a lopsided matchup), `identities` (run-identity vs pass-identity rosters, plans chosen by the engine's own `teamIdentity` — both picked 11 personnel; recorded as a finding).

The engine means this run produced (team-game): rush 116.1, pass 222.7, plays 67.5, sacks 2.31, points 22.0, drives 10.9 — consistent with the playled `reference_engine.json` baseline (10.9 drives).

## Files
| file | what it is |
|---|---|
| `LEDGER-PHASE1-REPORT-2026-11-11.md` | the delivery report — read this first |
| `run_engine.ts` / `dump_constants.mts` | the read-only engine harnesses (Node) |
| `stage_plays.py` | the staging engine (PLAYLED shapes, exact closure, S-rules) |
| `ledger.py` | the output fold (shares, packages, gravity, purity) |
| `measure_ledger.py` | receipts R1–R5 |
| `make_report.py` | report generator (JSON → markdown, no hand-typed numbers) |
| `engine_constants.json` | PERS, DIME_W, DL5_SHARE, SLOTS — live-read from the engine |
| `engine_games.json` | 1,300 recorded GameResults (drives + totals + plans) |
| `staged.json` | per-game purity rows + counters + play-by-play samples |
| `ledger.json` | the folded ledger |
| `ledger_report.json` | the receipts |
| `CHECKSUMS.txt` | sha256, labelled |
