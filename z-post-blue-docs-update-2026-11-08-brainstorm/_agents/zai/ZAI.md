# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai (GLM), reached by chat; sandbox CAN read GitHub (public HTTPS, shallow fetch) but has no credentials and cannot push. **This session ran in a real sandbox with node v24 and network git reads — an upgrade over the chat-only seat described in earlier lane files.** Push = the end-of-chat zip, relayed by the Owner (or Beam via `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…` on `council/zai`).
- **State:** High Councillor (below the Architect, above advisors; Owner's ruling, 24 Oct 2026).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** Z-post-blue prototype + verify suites v8..v11; style guide; this session: the P-013 lab deepening (4 new tools with receipts, RNG site audit + injection contract, flex extension pricing QB→FS, held-out lint with the fit-vs-anchor distinction).

## Current work
- Session 2026-11-08 (Claude-unavailable ~1 h window): brainstorm + lab deepening on P-013, read-only, Pre-Colors `40233d6be00e987c…` (md5 `5be9767f…`, 657,486 B — VERIFIED unchanged start-to-zip). No product bytes touched; nothing pushed.
- Shipped this session (all in the zip `z-post-blue-docs-update-2026-11-08-brainstorm.zip`):
  - `_agents/zai/notes/brainstorm-2026-11-08.md` — all 60 questions answered, 52 INFERRED-or-better; absorbs vloc/super/vl/beam/flint/muse parallel state.
  - `_agents/zai/tools/rng-audit.mjs` (+ receipt + JSON) — 56 Math.random sites / 38 lines mapped, 56/56 classified, Stage-1 injection + 3-stream seeding contract. Self-test 7/7.
  - `_agents/zai/tools/flex-ext.mjs` (+ receipt + JSON) — QB→FS priced for the first time (0.975 wins / 22.8 OVR-eq @90 — the flat −10 under-prices star QBs >2×); CB→FS not free (0.284 @90 vs flat 0); supporting-cast sensitivity across 6 casts; θ slot-pair penalty formula + grid. Self-test 6/6 + replication 0.00e+0 vs engine table. Reproduced vloc's 84/10/26/48 exactly.
  - `_agents/zai/tools/uncertainty-v2.mjs` (+ receipt) — T12 v2: Hedges g, paired delta CI, practical-significance quadrants, Benjamini–Hochberg. Self-test 8/8.
  - `_agents/zai/tools/heldout-lint.mjs` (+ receipt) — held-out/salary lint with fit-vs-anchor distinction (naive version false-positives on realcheck.js; documented). Real scan of vloc toolchain: PASS. Self-test 3/3.
  - `_agents/zai/notes/governance-2026-11-08.md` — H-008 (RNG contract, pre-registered), D-008 (cross-lane D-007 ID collision ZAI↔VLOC), D-009 (displacement term), R-005 proposal (witness gate + RNG Stage 1 + θ flex formula).

## What the next session needs
- **Read first:** `notes/brainstorm-2026-11-08.md` (esp. Q38 RNG contract, Q4 retirement sequence, Q52 ruling proposal) and `notes/governance-2026-11-08.md`.
- **Waiting on (not blocking):** Claude's return — my pending Q1–Q4 for him and his Q1–Q3 stay filed in the gh-pages prompt; this session adds NO duplicate asks, only R-005 as a decision-ready package.
- **If the Owner approves R-005:** Stage-1 RNG lands first (one IIFE), then the witness gate, then flex-table θ edits each with own receipts + MERGE-MANIFEST re-pin.
- **Do not redo:** the RNG site map (56/38 numbers pinned here and in the receipt); the QB→FS / CB→FS / TE→WR1 measurements (deterministic on this build — re-run only on a new build hash); the flex-pricer baseline reproduction (84/10/26/48).
- **Open threads:** (1) witness-as-gate needs an Architect decision; (2) displacement term needs seeded RNG; (3) snap-count data ask (T4 sensitivity) still unfilled; (4) the w79 ABSORBED history sweep (brainstorm Q2) needs someone holding w79 bytes to run the witness; (5) vloc's D-007 (OR product edit) awaits the Architect's ruling.

## Working rules that changed / were re-confirmed this session
- Sandbox CAN clone/fetch (shallow) — the START-OF-CHAT orientation can be upgraded to a real clone when network allows; the 60-second fallback chain still works (I used its step-2 fallback: newest wave package on council/zai, because the top-level `_agents/zai/START-OF-CHAT-ZAI.md` does not exist at the branch tip and `origin/main:z-core/_agents/zai/…` does not exist).
- Label discipline held: every number in the brainstorm carries VERIFIED/REPORTED/INFERRED/UNKNOWN with a command where applicable (AGENTS §9 receipt law).
- Cross-lane registers need ID prefixes (D-008) — ZAI entries now written as `ZAI-D-xxx` in cross-lane citations.

## Files in this lane (after this session)
- `notes/` — brainstorm-2026-11-08.md · governance-2026-11-08.md · (earlier: onboarding, corrections, worklog, prompts)
- `tools/` — rng-audit.mjs + report + receipt · flex-ext.mjs + report + receipt · uncertainty-v2.mjs + receipt · heldout-lint.mjs + receipt · (earlier build/verify scripts unchanged)
- `deliveries/` — style guide, playbook, handoff, governance recommendations (unchanged this session)
- Not copied: Owner-held zip receipts (2026-11-08 lab window) — summarized in this file, originals with the Owner.
