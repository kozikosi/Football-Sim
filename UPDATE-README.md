# z-post-blue-docs-update-2026-11-08-brainstorm — Z.ai lane package

SPEAKER: zai | ROLE: High Councillor | TASK: P-013 brainstorm + lab window | DATE: 2026-11-08
Build truth this session: **Football-Sim-PreColors.html** sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` · md5 `5be9767f335654ea87e79e42440d9041` · 657,486 B — **unchanged end-to-end** (verified at session start and re-verified at package time; the product file is NOT included in this zip — nothing was edited, so there is nothing to ship).

## What this package is
Read-only lab + brainstorm output from the Claude-unavailable window (2026-11-08), following `_agents/zai/START-OF-CHAT-ZAI.md` REV 15 (recovered from `council/zai:z-post-blue-wave55-2026-11-02-w55/`; top-level lane path absent at branch tip, `origin/main:z-core/…` also absent — fallback-chain step 2). No push (sandbox has no credentials). Import with `tools/import-zip.sh zai <zip>` → lands under `_agents/zai/imports/`.

## Contents
```
_agents/zai/ZAI.md                              lane file (rewritten this session)
_agents/zai/notes/brainstorm-2026-11-08.md      all 60 questions answered (52 INFERRED or better)
_agents/zai/notes/governance-2026-11-08.md      H-008, D-008, D-009, R-005 proposal
_agents/zai/tools/rng-audit.mjs                 T-20261022-claude-2 prep: 56-site RNG map + injection contract
_agents/zai/tools/rng-audit-report.json         its JSON output (from the receipted run)
_agents/zai/tools/rng-audit-2026-11-08.md       receipt (command + output)
_agents/zai/tools/flex-ext.mjs                  T6 extension: QB→FS, cast sensitivity, θ formula
_agents/zai/tools/flex-ext-report.json          its JSON output
_agents/zai/tools/flex-ext-2026-11-08.md        receipt
_agents/zai/tools/uncertainty-v2.mjs            T12 v2: effect size, paired delta, practical sig, BH
_agents/zai/tools/uncertainty-v2-2026-11-08.md  receipt (self-test 8/8)
_agents/zai/tools/heldout-lint.mjs              held-out lint with fit-vs-anchor distinction
_agents/zai/tools/heldout-lint-2026-11-08.md    receipt (self-test 3/3; real scan PASS)
inbox/<UTC>-zai-brainstorm-2026-11-08.md        council inbox entry (frontmatter schema per Q21)
inbox/<UTC>-zai-review.md                       review of vloc's shared tools — VERDICT ok
UPDATE-README.md                                this file
CHECKSUMS.txt                                   sha256 of every file in this package
```

## Headline results (all VERIFIED on Pre-Colors 40233d6be00e987c unless labelled)
1. **RNG:** 56 `Math.random()` occurrences on 38 lines; 56/56 classified; Stage-1 injection = one no-op-unseeded IIFE; 3-stream seeding contract. Unblocks T1-E5/T2/T6-full.
2. **QB→FS (REV 4 pair, priced for the first time):** 0.975 wins / 22.8 OVR-eq @90 — flat −10 under-prices star QBs >2× (right only at ~85 OVR).
3. **CB→FS is not free:** 0.284 wins @90 vs flat price 0 → propose 2.
4. **Displacement term identified:** TE→WR1 = 0.000 (lookup) vs 0.63 (full-roster, REPORTED) vs 0.408 (cast-sampled, WR-rich) — the two pricing conventions must be reported separately.
5. **Cross-validation:** vloc/super's 84-rule flex-pricer split (10/26/48) reproduced exactly; third independent wins-table implementation matches the engine cache to 0.00e+0.
6. **Held-out lint:** naive check false-positives on validation anchors (realcheck.js); fit-vs-anchor manifest proposal shipped; real scan of the vloc toolchain PASS.
7. **Governance:** H-008 (pre-registered, SUPPORTED), D-008 (ZAI↔VLOC D-007 ID collision), D-009 (displacement), R-005 (decision-ready ruling proposal: witness gate + RNG Stage 1 + θ flex formula).

## How to re-run the receipts
From a worktree/clone whose root holds `Football-Sim-PreColors.html` (sha256 must be `40233d6be00e987c…` — every tool refuses any other build):
```
node _agents/zai/tools/rng-audit.mjs --selftest
node _agents/zai/tools/flex-ext.mjs --selftest
node _agents/zai/tools/uncertainty-v2.mjs --demo
node _agents/zai/tools/heldout-lint.mjs --selftest
node _agents/zai/tools/heldout-lint.mjs tools _agents
```
Expected: all exit 0 with PASS lines as quoted in the receipts.

## Rules honoured
No product edit; no protected constant touched; no other seat's lane written; every claim labelled VERIFIED/REPORTED/INFERRED/UNKNOWN; every "done" has a command and its output; nothing pushed (no credentials); this chat ends with the zip (START-OF-CHAT §5.6).
