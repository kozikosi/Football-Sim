# UPDATE-README — Z.ai lab window, 8 Nov 2026 (P-013 tooling before Claude's turn)

**Wave:** none — w79 STANDS, product bytes untouched this chat (read-only lab window).
**Product:** `Football-Sim-Z-post-blue-w79.html` · md5 `61acb21e55fac92a6d84eac6acb10bd1` · 1,836,431 B (unchanged; published gh-packages).
**Lane branch:** `zai-lab-20261108` (local commit `1e881880`, cut from `council/zai` tip `FETCH_HEAD` of 2026-11-08) — UNPUSHED (sandbox law: no credentials; the zip is the delivery).

## §1 · What this package is

Everything Z.ai authored in the 8 Nov lab window, at repo-relative paths (extract over a
working copy of `council/zai` and it lands where it belongs):

- `inbox/20261108-0900-zai-lab-window-results-and-prompt-v2.md` — the pointer note for Claude/Beam/Owner.
- `_agents/zai/deliveries/PROMPT-FOR-CLAUDE-2026-11-08-v2.md` — the revised Claude prompt (supersedes v1; new Q0).
- `_agents/zai/deliveries/VERACITY-SYNTHESIS-ADDENDUM-2026-11-08.md` — the one-fact correction + build log.
- `_agents/zai/notes/FIT-TARGET-FORENSICS-2026-11-08.md` — the fit-target reconstruction (VERIFIED, scripted).
- `_agents/zai/tools/lab-20261108/` — T3a witness · T3b triangulate · T1 mech_validate · anchors_2024.py · T4 replacement_audit · T6 flex_pricer · T12 wrapper (lablib) · heldout_lint · RUNBOOK.
- `_agents/zai/lab-results/` — six result JSONs, T12-wrapped, sha256-stamped.
- `_agents/zai/governance/` — HYPOTHESIS-LEDGER (H-001…H-007) · DISCREPANCY-REGISTER (D-001…D-007) · RULING-LOG (R-001…R-004).
- The workflow trio: `_agents/zai/ZAI.md` (rewritten), `_agents/zai/START-OF-CHAT-ZAI.md` (REV 22, §3 rewritten), `_agents/zai/END-OF-CHAT-ZAI.md`.

## §2 · The three headlines (all VERIFIED runs, evidence in lab-results/)

1. **w79 absorption:** on the w79 shell, raw 70→90 span ÷ displayed weight = 0.002540 constant across slots (max rel. dev 0.000000%) — the displayed "measured impact" IS the salary table. The witness tool now detects this automatically.
2. **Fit-target correction:** the 28 Oct fitlm target was `design.json`(27 Oct) × 0.00254 (29/29 exact) — an Architect table on the Owner's 25 Oct "pick your own weights, QB=1000" directive, NOT the old personal table; the current Colors specs were re-fitted to the salary table 6 Nov (6cccf29). Ruling-record correction REQUESTED (D-007/R-001); the Owner's permission to abandon the old tables stands regardless.
3. **First measured L1 validation:** 8 seeded seasons on the PreColors baseline — skill production CLEAN vs real 2024 nflverse (zero 5pp flags); sacks DL-skewed with DB 0.0% vs real 7.3% (D-001); team wins 8.5 [8.21–8.72]; PF/gm 22.27 (real 22.8). Plus T4 (engine replacement OVRs nearly uniform vs ~3× real deployment spread) and T6 (TE→WR1 median 0.63 wins lost; CB→WR1 0.67 — the −10 cap guard under-prices).

## §3 · Real-data provenance

nflverse 2024 inputs downloaded once, hash-pinned, offline thereafter (sha256 printed in
`real_anchors_2024.json` and inside every result JSON): player_stats_season_2024.csv
(`9252f6e6…`), snap_counts_2024.csv (`a2aa58ef…`), depth_charts_2024.csv (`f210a337…`),
player_stats_def_2024.csv (in CHECKSUMS context of anchors file). 2024–25 remain holdout —
heldout_lint CLEAN (no fit script reads them).

## §4 · Changelog (one line per chat)

- 2026-11-08 — lab window: witness/rosetta/T1/T4/T6/T12 + governance + fit-target forensics; prompt-for-Claude v2; no product bytes.
- 2026-11-07 — (previous chat) w79 shipped: Owner's table became the model; flex cap; apparatus; w79 package on gh-pages.
