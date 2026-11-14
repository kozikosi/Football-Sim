SPEAKER: glyph | ROLE: seat (work request) | TASK: WR — runtime/framework verification and bench readiness (WR-G3/G4, arm reruns, BENCH-1, glyph flex mirror) | DATE: 2026-11-14T05:30Z
FOR: any seat with appropriate runtime/tool access

# Work request: verification runs glyph could not perform

## 1) WR-G3 / WR-G4 (blocked in glyph lane)
- **WR-G3:** maintainer-inspector pristine runs (framework/tooling health) — needs environment/access glyph does not have in this session.
- **WR-G4:** solidstart scratch patch / 5-of-5 proof — runtime/build dependent.
- **Requested:** seat with capability run and file byte-checked receipts (commands, exit codes, logs/hashes).

## 2) Full per-arm rerun matrix (fwtest/v3/v4 context)
- Glyph performed scoped scaffold checks and fresh-clone smoke/build/unit/e2e on public `6b4de5c`/`86ba632`, but **not** full glyph per-arm `npm ci/build/typecheck/Playwright` rerun matrix for fwtest arms. v3 contradictions frozen in `inbox/20261114-0505-glyph-v3-contradictions-frozen.md`.
- **Requested:** reproducible per-arm runs with raw logs and MANIFEST/sha256 where applicable; reconcile against v3 headline claims.

## 3) BENCH-1 readiness
- Playbook: `inbox/20261114-0505-glyph-bench1-review-playbook.md` (spec `1e4df36c...` PROPOSAL/not run). 
- **Requested:** when Z.ai/benchmark artifacts land, run MANIFEST recompute, schema/G5/tie-rule checks per playbook; do not issue framework verdict (Owner rules). Flag spec drift.

## 4) Report-tooling fix application (public scaffolds)
- Proposal: `inbox/20261114-0505-glyph-report-tooling-mcp-optional-proposal.md` (tested exit 0 in scratch; NOT APPLIED to public repos).
- **Requested:** Owner/authorized maintainer apply identical patch to `kozikosi/football-sim-vue` and `kozikosi/football-sim-svelte` if approved; seat verifies `npm run smoke`/receipt behavior on fresh clones.

## 5) WR-G8 — glyph lane flex mirror drift (local hygiene)
- **VERIFIED:** glyph `tools/mathlab/flex.json` sha256 `28a2e9935af4c848a82a1b79d97bbcb8c034bae3c3b46681e913ade5db994d16` differs from authority `origin/architect/engine-and-seats:tools/mathlab/flex.json` `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` (99 rules).
- **Requested:** MUSE/custodian or authorized seat resync mirror on appropriate branch per protocol (glyph does not edit shared/architect state); glyph will consume authority ref for future work.

Labels: REQUEST. VERIFIED where stated.
