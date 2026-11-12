# merge-ledger-followups-2026-11-11 — the delivery folder

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-merge-ledger-followups-2026-11-11.md` — one prompt, three parts, all complete, one zip.
**Read the three reports in this order:**

| file | part | one line |
|---|---|---|
| `MERGE-DESIGN-2026-11-11.md` | **A — the merge (the main job)** | `price = tier(max(M + λS, E·G))` — the exposure guard: 96/97 (98/99), 0 under-priced rows, LOO 1.16/172, and the per-slot V3 lands **97/97 (99/99)** pending the Owner's C>OG ruling. The FB acceptance test (E < 0.222) is CONFIRMED by the Ledger's measurement (E_FB = 0.1265). |
| `LEDGER-FOLLOWUPS-2026-11-11.md` | **B — the Ledger follow-ups** | B1: DIME is a category difference (rating weight vs snap share) with three named settle paths; B2: the WR1 trigger re-fires on deep targets — **4.37 doubles/team-game** (was 0.15), inside the real 3–6 band; B3: the 3-4 staging lands — **participation is base-invariant**, the formation gap has no snap-side content. |
| `PHASE2-HARNESS-2026-11-11.md` | **C — the Phase 2 machine** | ingestion + comparison harness in the §7 schemas, self-tested end-to-end on SYNTHETIC data (30/30 spots within ±3 pts); no real data fetched at build time, schema risks filed (REV 2: risk 1 corrected — per-player snap counts ARE in the public nflverse `snap_counts` release; the real run lives in the companion `phase2-real-2026-11-11/` delivery). |
| `CORRECTIONS-NOTE-2026-11-11.md` | **REV 2 — the MUSE review landed** | the six review corrections + the nits, each with the verdict quoted inline and the evidence it now checks against; nothing in the math changed (byte-verified). |

**Scripts (all read-only, deterministic):**

| script | re-run |
|---|---|
| `merge_prototype.py` | `python3 merge_prototype.py flex-99-live.json` → prints the fit table, the FB test, the centre diagnostic, the per-slot rows, the gate, the LOO, the Q8 pricing, the λ ablation; writes `merge_results.json`. Log: `logs/merge_run_log.txt`. |
| `stage_followup.py` | `python3 stage_followup.py sit|wr1|34 engine_games.json out.json` (needs Phase 1's `stage_plays.py` importable; auto-looks-up a `ledger-phase1-2026-11-11/` sibling). Logs: `logs/sit_log.txt`, `logs/b2_log.txt`, `logs/b2_grid_log.txt`, `logs/b3_log.txt`. |
| `dime_sensitivity.py` | `python3 dime_sensitivity.py followup_sit.json` → the closed-form decomposition + the bisections. Log: `logs/dime_log.txt`. |
| `phase2_harness.py` | `python3 phase2_harness.py --ledger ledger.json --staged staged.json` → SYNTHETIC self-test (labelled); `--snaps x.csv --pbp y.csv` for the real thing. Output: `phase2_results.json`. |

**Data trail:** `logs/` (all run outputs as JSON), `flex-99-live.json` (the live 99-rule table, copied from `architect/engine-and-seats:tools/mathlab/flex.json` — 99 rules, the oracle), `synthetic_*.csv` (**SYNTHETIC**, labelled), `phase2_results.json`.

**Oracle discipline:** every fit number is against the live 99-rule table (97 cross-role + 2 self, named in each report). The baseline receipt: the Phase 1 pipeline re-runs byte-identically from its own files (shipped `staged.json` file sha256 `0f749ea5…`; the original `13bfe7eb…` citation was the canonical-form hash — corrected per the MUSE review) — verified before any follow-up ran.

**Nothing was built into the engine, `flex.json`, `flex.ts`, or any product file.** No data was fetched. No other seat's lane was touched.
