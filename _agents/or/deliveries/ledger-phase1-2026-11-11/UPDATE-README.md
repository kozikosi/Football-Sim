# UPDATE README — Play Ledger Phase 1 · 2026-11-11

**No product HTML this chat.** `Football-Sim-Z-post-blue-w55.html` stands (md5 `49161f118e587701f1d639346e22d4d2`, 1,592,738 bytes — unchanged). This zip is a **measurement delivery**: the Play Ledger, Phase 1 (the snap ledger), built in Z.ai's lane per MUSE's `prompts-2026-11-05/zai-ledger-phase1-2026-11-11.md`.

## What shipped

1. **The staging engine** (`stage_plays.py`, PLAYLED-powered): stages plays inside each of the REAL drive engine's drives so that the plays sum to its realised totals exactly — the Ledger's conservation law. The engine itself (the Architect's `colors/src`) was run **read-only** from a git worktree; `flex.json`, `flex.ts` and every engine file are untouched.
2. **The fold** (`ledger.py`): per-spot snap shares (all 32 spots, both a team-share and a play-share view), per-personnel-package participation, gravity (double-team) counts per player-spot per game, K/P special-teams events.
3. **The receipts** (`measure_ledger.py` → R1–R5), against the engine's OWN constants, live-read from `architect/engine-and-seats` (nothing hardcoded):
   - **R1 purity:** plays/sacks/points/giveaways 100.000% exact across 2,600 team-games; yardage 99.61% conserved by volume; the small residue is a named engine-artifact class (drives whose allocated yards no play can carry) — surfaced with counts, never hidden.
   - **R2 constants:** DL5 play-share 31.1% vs the engine's MEASURED `DL5_SHARE` 0.33 (**agree**, −1.9 pts) · DIME 6.9% vs `DIME_W` 0.15 (**disagree**, −8.1 pts — flagged for Phase 2 data, nothing edited to force agreement) · package mix vs `PERS`: direction agrees (Spearman 0.7), the 21/22 order notes.
   - **R3 slot weights (FB 25 confirmed live; the muse copy's 30 is stale):** weights vs snap shares Spearman 0.80/0.81; the **FB socialism measurement**: FB play-share 12.6%, value-per-play-share 198 vs RB1's 321 — the engine prices FB as a scarcity spot and the ledger reproduces the shape with zero authored rules.
   - **R4 gravity:** DT1 32 / DE1 19.4 / WR1 0.15 double teams per team-game — INFERRED placeholder rates, reported as such, with two findings (WR1 undercounted: the deep-catch trigger never fires; DT1's rate needs a pass/run split).
   - **R5 determinism:** same seed → byte-identical staged output.
4. **The Phase 2 data request** (report §7): what nflverse-class snap counts and personnel data would need to look like, the proposed ±3-pt tolerance, and the fail-fast fallback — no data fetched.
5. **Five `IDEA:` items** (report §8), including value-per-play-share as a standing ledger column and purity-as-CI-gate for the strangler.

## Folder map
- `_agents/zai/deliveries/ledger-phase1-2026-11-11/` — `run_engine.ts`, `dump_constants.mts`, `stage_plays.py`, `ledger.py`, `measure_ledger.py`, `make_report.py` (report generator), `engine_constants.json` (live-read), `engine_games.json` (1,300 real engine GameResults), `staged.json`, `ledger.json`, `ledger_report.json`, `LEDGER-PHASE1-REPORT-2026-11-11.md` (the report), `README.md`, `CHECKSUMS.txt` (sha256, labelled)
- `_agents/zai/notes/LEDGER-PHASE1-INTAKE-2026-11-11.md` — the intake ledger: every directive line mapped, interpretations I-1..I-5 flagged for veto
- `_agents/zai/START-OF-CHAT-ZAI.md` — REV 16 (§3 rewritten to the ledger state; the wave-55 phone laws all stay standing)
- `_agents/zai/ZAI.md` — rewritten (this session's lane file)
- `_agents/zai/END-OF-CHAT-ZAI.md` — unchanged (carried so the Owner's push keeps it current)

## Changelog
- 2026-11-11 · Play Ledger Phase 1 (snap ledger) shipped: staging engine + fold + receipts R1–R5; engine read-only throughout; product untouched at w55.
