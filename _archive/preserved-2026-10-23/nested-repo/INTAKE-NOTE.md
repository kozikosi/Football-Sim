# INTAKE-NOTE.md — council-intake (v2, 20 Oct, GLM scribe; Owner-authorized)

## Branch history

`474eb52` = the Architect's own initial intake (council docs + both builds + agents) —
verified intact by GLM: v20 = 31b7d61f… 649,032 B; donor = 77bb9ed5… 650,127 B
(full sha256 match on this commit's blobs). This commit adds on top, WITHOUT overwriting
any of the Architect's files: the Round-1→Round-4 dossier set + tests/CONTRACT.md v2 +
tools/sync-mirrors.sh + this note.
## Superseded-era files exist on this branch — do NOT treat as governing

BOOTSTRAP.md, SOUL.md, IDENTITY.md, USER.md, ROADMAP.md, CLAUDE_DOMINANT_WORKFLOW.md,
MULTI_AGENT_WORKFLOW_FRAMEWORK.md, NEW_GIT_WORKFLOW.md, CONSENSUS_BLOCK_FORMAT.md,
PROMPT_NEXT_FOR_CLAUDE.md, LIGHTNING_*, INTEGRATION_AUDIT_LIGHTNING.md,
AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md, PRE_IMPLEMENTATION_ACTIONS_STATUS.md,
CONTRACT_B1_B2_ADOPTION_CONFIRMED.md, GOVERNANCE_CHANGE_PROPOSAL.md,
FINAL_CONSOLIDATION.md, CLAUDE_NEXT_SESSION_QUICKSTART.md, OtherChambers_AI_Critiques.md,
NEW_WORKFLOW_ROUND1.md, MASTER_GUIDE.md, ADVISOR-PLAYBOOK.md, MERGE-CHECKLIST.md,
KNOWN-ISSUES.md, OUTSTANDING_TASKS_SUMMARY.md, V20_*— these belong to the SUPERSEDED
"claude-dominant" era (unanimously retired by the Owner flat-council restructure).
The GOVERNING layer is: INDEX.md, ONBOARDING.md, AGENTS.md, STATUS.md,
COLLECTIVE-PROMPT.md, COUNCIL-BULLETIN.md (house rules v2 + M-history),
CHRONICLE.md, QUESTIONS-FOR-THE-ARCHITECT.md, GOVERNANCE-ROUNDTABLE.md,
SUBMISSIONS.md, tests/CONTRACT.md v2 — plus the R1–R5 rulings copy in
_agents-payload/ds/notes/Owner-Rulings-19-Oct.md.
## Shared-doc rebuild notice (COUNCIL-BULLETIN.md M-30 §3)

Root shared docs were rebuilt 01:21–01:24; some messages/blocks are being re-filed by
their authors (M-31 recovery order in flight). The SUPER content lost at root is
recoverable from THIS branch's bulletin (the Architect's snapshot preserved Super's
M-24 filing); sections A/B of the question pack were already the rebuilt form on this
branch — authors re-file their own blocks.
## Additions in this commit (all under _agents-payload/, none of the Architect's files touched)

_ds/ (round-1..4 reviews incl. round-4 GluePhoneSynthesis.md/StyleBlocks.md/
style-blocks*.txt/render100-receipt.txt + tools funcdiff-*.js/surface-lines.js/
arch-probe.js + notes/Owner-Rulings-19-Oct.md) · _pickle/ (evidence 1–4 + specs
M-8-merge-manifest-addendum.md + math-baseline.json) · _minimax/ (hands-on review +
cdp-phone-check.mjs + post-merge-smoke.mjs + smoke JSON receipts) · _nemo-super/ ·
_ultra/ · _beam/ · _vl/ · _or/ · tests/CONTRACT.md · tools/sync-mirrors.sh.
## D3 gate (adopted in the Architect's reply, 20 Oct)

Merged build → branch `merge/v20-donor` → verifier session drives E2E (draft → season →
playoffs → 100-season report via runLeague100, console clean, element-level 390px with
the 390→1280→390 resize order) → then a PR to `main`. Nobody pushes product files
straight to `main`. MiniMax's `post-merge-smoke.mjs` (exit 0 + A/B/C true) runs before
any status/hash bump.
