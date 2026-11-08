Claude — trimmed prompt (2026-11-08). Everything below is self-contained. Z.ai (High Councillor) synthesized the council's veracity work into CICCP-3 and asks you (Architect) to read the key documents, answer the big questions, and propose low-token architectural directions. You own the product file and the governance files; nothing here assigns work to any seat.

Read in this order (only these; superseded docs are excluded):
- z-post-blue-zai-advisory-2026-11-08/_agents/zai/deliveries/VERACITY-SYNTHESIS-2026-11-08.md
- z-post-blue-docs-update-2026-11-08/_agents/zai/deliveries/PROMPT-FOR-CLAUDE-2026-11-08-v2.md
- z-post-blue-docs-update-2026-11-08/_agents/zai/deliveries/VERACITY-SYNTHESIS-ADDENDUM-2026-11-08.md
- z-post-blue-docs-update-2026-11-08/_agents/zai/notes/FIT-TARGET-FORENSICS-2026-11-08.md
- z-post-blue-docs-update-2026-11-08/_agents/zai/notes/brainstorm-2026-11-08.md (sections A, B, D, F, G, H only)
- z-post-blue-docs-update-2026-11-08/_agents/zai/notes/governance-2026-11-08.md
- zai-ciccp3-2026-11-08/_agents/zai/deliveries/COUNCIL-COMM-PROTOCOL-SYNTHESIS-2026-11-08.md
- PROMPT-FOR-CLAUDE-CICCP3-2026-11-08.md

============================================================
BUILD TRUTH
============================================================
Pre-Colors = Football-Sim-PreColors.html. Two relevant hashes: 40233d6be00e987c (original, personal table) and 395f26411333a41f (OR's branch, salary-based DEFAULT_WEIGHTS, same 657,486 B). Colors v1 not yet shipped. Wave 79 (61acb21e…) stands.

============================================================
THE MODELWEIGHTS PROBLEM (one paragraph)
============================================================
modelWeights() is the monotone quantisation of slotWinsPerOvr() (700 scale, nearest 5, floor 5). The w79 display layer is ABSORBED at 0.000000% — the displayed "measured impact" IS the salary table. The 28 Oct fitlm target was design.json (27 Oct) × 0.00254 (29/29 exact), not the personal table. Two inconsistent targets are in play (mechanics fit to design@27Oct, display = salary), neither validated. Owner permission to abandon both old tables is granted and binding (R-001). OR implemented salary-based DEFAULT_WEIGHTS on council/or (hash 395f2641…). The deepest verified circularity is the w79 display layer.

============================================================
BIG QUESTIONS (answer these; everything else is optional)
============================================================
1. Do you accept the raw-curve witness as a standing per-build gate? Cost is seconds, zero product bytes. It protects every displayed number from silent re-absorption.
2. Where should the seeded RNG (T-20261022-claude-2) land first? Z.ai's rng-audit.mjs has the exact Stage-1 patch form: a single IIFE at the top of the inline script overriding Math.random with mulberry32 ONLY when seeded (?zseed= or localStorage), byte-identical unseeded, covering all 56 sites. Stage-2: three derived streams (draft/game/narrative). This unblocks T2 (paired-seed comparator) and T6 (full flex pricer) on both tracks.
3. Do you accept the shared output schema + Rosetta table so the Owner reads one table instead of three dialects (shell / Colors / real-data)?
4. Can you produce the Q2 parameter diff (original → calibrated → position → measured effect) within the next wave, in the Beam/VL layer-audit format? Z.ai admits he conflated two calibrations.
5. Which of the 12 tools (T1–T12) do you build on the Colors track vs take from the council's lab? Status: T1/T3/T4/T6/T12 built+run by Z.ai; T2 blocked on RNG; T5/T8/T9/T10/T11 not yet built; T7 has Beam/super versions.
6. Do you adopt play-level outcome validation (completion% by air-yards, INT rate by coverage, pressure→sack, YAC by slot) as your L1 gate?
7. Your position on the three valuation modes (Football Value / Game Balance / Owner Preset) as standing architecture? Recommendation: Football Value as default (only measured mode), Game Balance as advanced toggle with coefficient log, Owner Preset one click.
8. Anything in Z.ai's dissent list you dispute? Specifically: demoting Shadow Sim RMSE as ultimate source of truth, trait-weighted flex degradation premature, individual EPA attribution as research not gate, percentile vs scarcity confound.
9. OR's DEFAULT_WEIGHTS product edit (vloc D-007): treat Owner's P-013 preset approval as retroactive authorization + re-pin through §5 build chain, OR revert via build chain and re-apply as Architect build? Witness gate should run before AND after either way.
10. CICCP-3 (council communication protocol): six items in files only you control — inbox/README.md WORK+REVIEW blocks, AGENTS.md routing paragraph + review-count fix (two vs three), tasks/<id>.json + check-tasks.mjs optional fields, CLAUDE.md + claude/00-READ-FIRST.md compaction line. Optional input per AGENTS.md §1; striking any with a one-line reason in CHRONICLE.md is a complete answer.

============================================================
KEY MEASUREMENTS (short form)
============================================================
- T3a: w79 ABSORBED 0.000000%; PreColors genuinely independent (Spearman 0.645, 14/26 rank flags).
- T1: skill production CLEAN; sacks DB 0.0% vs real 7.3% (D-001, attribution gap); DB INT +5.9pp (D-002); wins 8.5 [8.21–8.72]; PF/gm 22.27 (real 22.8).
- T4: replacement OVRs uniform 70.8–76.3 vs real ~3× spread (definitional, not code bug).
- T6: QB→FS first priced: 0.430/0.975/1.456 wins @85/90/95 (flat −10 under-prices stars >2×); CB→FS not free (0.144–0.420); TE→WR1 0.000 base vs 0.63 full-roster (displacement). θ slot-pair formula proposed.
- RNG: 56 sites, 38 lines, all synchronous, Stage-1 patch form ready.
- Held-out lint: fit-vs-anchor distinction; real scan PASS.

============================================================
CONSTRAINTS (OWNER)
============================================================
Read-only for you this round if answering before building. Please read, synthesize, and evaluate, and answer questions before building anything. You have permission to run tests to help you decide the best path forward.

Owner permission (binding): abandon old tables (personal + salary) as calibration targets/foundations; new presets QB=1000, increments of 50; DEFAULT_WEIGHTS may be repositioned/retired (protected constant — Owner approval granted; re-pin MERGE-MANIFEST in same commit). Fit target was design.json (27 Oct) × 0.00254 (29/29 exact), not personal table. Correction request filed (D-007); Owner decides.

============================================================
OPEN ITEMS
============================================================
- R-005 ruling proposal (witness gate + RNG Stage 1 + θ flex formula) is decision-ready for the Owner — your input welcome.
- ID collision (D-008): prefix at aggregation layer.
- Held-out lint fit-vs-anchor should be adopted as standard for all fit scripts.
- Inbox frontmatter schema should be adopted for machine-parseable entries.
- rng-audit Stage-1 patch form ready to fold into a build (SAFE-ALONE, no protected constant, byte-identical unseeded).

Please read, synthesize, and evaluate, and answer questions before building anything. You have permission to run tests to help you decide the best path forward.
