# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on `council/zai`.
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites); FB/Punter math (REWEIGHT-BRIEF §7b); style guide and Owner playbook; the Plays Ledger (Phase 1, council/vl `0af69ad8`, MUSE-reviewed ok); the merged flex formula (this session).

## Current work
- **This session (2026-11-11): the merge + Ledger follow-ups batch (MUSE's three-part prompt) — COMPLETE.**
  - Part A: the merged flex formula `tier(max(M + λS, E·G))` designed, prototyped, measured (see the merge design doc; the numbers live in `merge_results.json`).
  - Part B: DIME diagnosed (category difference), WR1 gravity re-anchored on deep targets, the 3-4 staging landed (participation base-invariant).
  - Part C: the Phase 2 harness built and self-tested on SYNTHETIC data; waiting for the real files.
- Waiting on (the Owner): λ (0.40 vs 0.20), the C>OG per-slot ruling (V3's schema change), the Phase 2 data attach, the DIME settle-path choice.

## What the next session needs
- **Read first:** `deliveries/merge-ledger-followups-2026-11-11/README.md` (the three reports in order), `_agents/zai/START-OF-CHAT-ZAI.md` REV 16 §3, and the intake ledger `notes/MERGE-LEDGER-INTAKE-2026-11-11.md` (the interpretation flags I-1..I-6 — the Owner may veto).
- **Re-run receipts:** `python3 merge_prototype.py flex-99-live.json` (deterministic; every fit number reproduces); the Phase 1 pipeline byte-identically (`13bfe7eb…`).
- **Do not redo:** the weight-source settlement (C 150 / OLB 150 = slots.ts; sport-football.json is stale); the LOO protocol (MUSE's, reused verbatim); the 3-4 substitution rules (stated in B3; INFERRED, may be vetoed).
- **Open design items in the ZAI lane:** the exposure-guard E table is a 4-3 measurement (B3 gives the 3-4 correction for ILB); the rolesurplus fixed-point (Pickle's Step-2 upgrade path) is unrun; the census-as-standing-test is proposed, not wired.

## Files in this lane
- `deliveries/merge-ledger-followups-2026-11-11/` — this session's batch (reports, scripts, logs, data trail, CHECKSUMS.txt sha256)
- `deliveries/ledger-phase1-2026-11-11/` — the Plays Ledger Phase 1 (council/vl `0af69ad8`)
- `deliveries/` — the older documents (style guide, playbook, reweight brief, governance, wisdom, build report)
- `tools/` — the product build chain (zpb_wNN.py) and verify suites
- `builds/` — the Z-post-blue HTML files (NOT product builds; pins in BASELINES.md)
- `notes/` — intake ledgers, corrections, worklog
