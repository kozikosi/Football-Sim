# INTAKE-NOTE.md — council-intake branch (created 20 Oct by GLM, Owner-authorized)
Purpose: this branch carries the council's working set into kozikosi/football-sim so the
Architect (Claude) can verify it and work. NOTHING here touches the product on `main`;
per the adopted D3 gate, the merged build lands on `merge/v20-donor` → verifier session
drives it E2E → then a PR to `main`. Nobody pushes product files straight to `main`.

## What is on this branch
- `NFL Draft Simulator v20 Claude.html` (reference, sha256 31b7d61f…, 649,032 B) and
  `NFL Draft Simulator.html` (donor, 77bb9ed5…, 650,127 B) — verify with
  `shasum -a 256` + `wc -c` before anything else.
- The 10 council documents as they exist at root RIGHT NOW. IMPORTANT: a shared-doc
  rebuild event (01:21–01:24, documented in COUNCIL-BULLETIN.md M-30 §3) removed some
  messages/question blocks; re-filing recovery is in flight. The 4 PROVISIONAL answers
  in Claude's reply stand on this brief alone; the QUESTIONS pack must be re-filed by
  each author before the 52-question answers pass continues.
- `_agents-payload/` — the dossier set Architect verification needs: DS round-1/2/3
  reviews + round-4 artifacts (`GluePhoneSynthesis.md`, `StyleBlocks.md`,
  `style-blocks*.txt`, `render100-receipt.txt`) + tools (funcdiff-full.js,
  surface-lines.js, arch-probe.js); Pickle evidence + specs + math-baseline.json;
  MiniMax hands-on review + cdp-phone-check.mjs + post-merge-smoke.mjs + smoke JSONs;
  Super/Ultra/Beam/VL/OR review files.
- `tests/CONTRACT.md` v2 (exit codes 0/1/2/3/4) + `tests/madden-sim.spec.js`.
- `tools/sync-mirrors.sh` (10-file mirror sync + --check).

## What is deliberately EXCLUDED
- The legacy workflow-era files already on `main` (MULTI_AGENT_WORKFLOW_FRAMEWORK,
  NEW_GIT_WORKFLOW, CONSENSUS_BLOCK_FORMAT, PROMPT_NEXT_FOR_CLAUDE, LIGHTNING_*,
  INTEGRATION_AUDIT_LIGHTNING, AUTHORITATIVE_DATASET_FORMAT_DECLARATION,
  PRE_IMPLEMENTATION_ACTIONS_STATUS, CONTRACT_B1_B2_ADOPTION_CONFIRMED,
  GOVERNANCE_CHANGE_PROPOSAL, FINAL_CONSOLIDATION, CLAUDE_NEXT_SESSION_QUICKSTART,
  OtherChambers_AI_Critiques, NEW_WORKFLOW_ROUND1): they belong to the SUPERSEDED
  "Claude-dominant" era and are NOT the governing docs. The governing layer lives in
  the 10 files above. Read ONLY those.
- `_archive/` content (superseded builds) — not needed for the merge.

## Verified state handy for D-decisions (receipts 20 Oct)
- cpuPick full-body pins: v20 3dc9d12f500a / donor 94b878605b73 → keep DONOR.
- rWeights: v20 ×1 (line 6018, crashing usage; never declared) / donor ×0 → the
  100-season report crash is in v20; donor render100 (cc1016eacc78) drop-in candidate.
- color-scheme counts: v20 prefers-color-scheme ×2 + :root:not([data-theme="dark"])
  machinery present; donor prefers-color-scheme ×1 + header light dark.
- msChecked: v20 ×2 / donor ×0 → phone-block defect confirmed (donor block + v20 tail).
