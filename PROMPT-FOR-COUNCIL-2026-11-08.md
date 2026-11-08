COUNCIL BRIEFING & BRAINSTORMING INVITATION (2026-11-08, while Claude is unavailable ~1 hour)

You are a council seat (High Councillor or advisor). You cannot push; your work reaches GitHub via the Owner or via Beam's import tool (`tools/import-zip.sh <seat> <zip>` → `_agents/<seat>/imports/…` on `council/<seat>`). Claude (the Architect) is unavailable for ~1 hour. This prompt asks you to (a) absorb the council's current state, (b) keep working read-only on the engine, and (c) brainstorm, innovate, and improve any system or tool related to the engine. Nothing is assigned; everything below is an invitation. Push nothing; file everything in your lane and inbox, and produce a zip at the end. Adapt paths/seat names to your own lane.

============================================================
PART 0 — UPDATES SINCE THE LAST PROMPT (READ FIRST)
============================================================

OR (new, major):
- Implemented Owner's salary-based DEFAULT_WEIGHTS (QB=1000 scale) directly into `Football-Sim-PreColors.html` on `council/or` (commit a83d80b6): protected constant changed from old personal table (QB 320, WR1 60, …) to salary-based (QB 1000, RB1 250, WR1 650, CB1 400, …). Re-pinned MERGE-MANIFEST hash to `395f26411333a41f` (same 657,486 B). This is the Owner's decision being implemented; the Architect will reconcile into Colors v1.
- Flex REV 5 table + engine updates (commit 4a25acd0 "wip: flex REV 5 table + engine updates (cap at 10)"): new flex guide, DIME position added, flex at cap 10.
- Cross-position flex measurement for Owner P-142 (commit eac74e87): `tools/probes/crossflex-measure.mjs`, `tools/mathlab/flex*.mjs` suite (flex.json, flex-dl5.json, flexcap, flexcheck, flexdl5, flexengine, flexparse, flexscan), results in `tools/mathlab/results/flex-compiled.json`.
- Owner notes captured verbatim: `_agents/owner-notes/2026-10-26-dime-and-flex-guide-rev2.txt`, `2026-10-29-flex-weights-dl5-ui-verbatim.txt`.

Super (new):
- Added T6 flex-pricer + T7 metamorphic battery, merged Beam's DL5 data into T4, run-all-tests 12/12 PASS (commit 6a7b200b).
- Cross-validation harness (`cross-validate.mjs`) + combined test runner (`run-all-tests.mjs`), review of Beam's tools.

vloc (new):
- Reviewed VL's P-013 tools + enhanced triangulate + combined test runner (commit 0d178427).
- Extended P-013 review session (commit 76c28163).
- Deliveries: H-001 mechanics honesty, discrepancy register, ruling log, uncertainty reporting law, revised Claude prompt, PLAN-P-013-tooling.

vl (new):
- P-013 modelWeights tooling + revised Claude prompt (commit d6b5bc9b): raw-curve-witness, triangulation, replacement-level-audit, uncertainty; hypothesis/discrepancy/ruling logs.

flint (new):
- P-115 review VERDICT improved (60s OT cap, safe-alone scope, team tokens, reduced motion) (commit 15cc151a).
- P-282 owner permanent weights + engine/tool verifications (batteries 84/0/0, tsc gate OK@91/FAIL-on-growth) (commit bf6aa048).
- Lab baseline reproduction receipt (N=1000 VERIFIED, tuning FLAT) (commit 12c57776).
- Session end: P-115 review VERDICT improved; Beam lab tools verified; VL flexweight fix verified (commit a801a096).

beam (new, me):
- P-013 tooling pass (T3/T4/T7/T12) + governance + revised Claude prompt (commit eb3b4086).
- Improved tools (merge super's T3/T4 defs, fix vl flexweight crash) + review (commit 86f7f38d).
- Lane update (commit bd91529f).
- Z.ai brainstorm window shipped: `z-post-blue-docs-update-2026-11-08-brainstorm` on gh-pages (commit 481c7a8f) — contains ZAI.md, notes/brainstorm-2026-11-08.md, notes/governance-2026-11-08.md, tools (uncertainty-v2, rng-audit), inbox entries, CHECKSUMS.

muse (new):
- BUILD-1+2 review (council.mjs patch, verdict ok).

IMPORTANT CONSEQUENCE: Build truth has shifted. Pre-Colors on `origin/council/or` now has DEFAULT_WEIGHTS = salary-based table (hash 395f2641…), not the old personal table (40233d…). The Architect will reconcile. Treat OR's branch as the new reference for weights; treat Pre-Colors `40233d…` as the pre-change anchor. Update any tool that hard-codes `40233d…` as "the" Pre-Colors hash to note both.

============================================================
PART 1 — WHERE THE COUNCIL IS RIGHT NOW
============================================================

Build truth (do not rename): Pre-Colors = `Football-Sim-PreColors.html`. Two relevant hashes now: `40233d6be00e987c` (original, personal table) and `395f26411333a41f` (OR's branch, salary-based table, same 657,486 B). Colors v1 is the Architect's next build (Z.ai shell + Architect engine) — not yet shipped. Wave 79 (`61acb21e…`) is the last Z-post-blue build, stands, md5 pinned. Z.ai's last lab ran against Pre-Colors `5be9767f…` and w79 `61acb21e…`.

Z.ai's last window shipped (all verified, receipts in ZAI.md):
- T3a raw-curve witness: w79 ABSORBED 0.000000%; PreColors genuinely independent (Spearman 0.645, 14/26 rank flags).
- T3b triangulation: 14/26 rank flags; compliant new-preset PROPOSAL (QB=1000, +50 increments) — proposal only.
- T1 mechanics v0: skill production CLEAN; sacks DB 0.0% vs real 7.3% (D-001); DB INT +5.9pp (D-002); wins 8.5 [8.21–8.72].
- T4 replacement audit: engine replacement OVRs uniform 70.8–76.3 vs real ~3× spread (D-004).
- T6 flex pricer: TE→WR1 median 0.63 wins lost, CB→WR1 0.67, CB→FS 0.28, REDG→DT1 0.39, WR→RB1 0.31 — the −10 cap under-prices.
- T12 reporting law in code; H-001…H-007, D-001…D-007, R-001…R-004; held-out lint CLEAN.
- Forensic correction (D-007): the 28 Oct fitlm target was design.json (27 Oct) × 0.00254 (29/29 exact), not the personal table. Owner permission to abandon the old tables stands (R-001).

Parallel read-only P-013 work pushed by the council (all read-only, no product bytes touched except OR's protected-constant change with Owner approval):
- vloc: P-013 tooling (raw-curves, triangulate, replacement-audit, flex-pricer, t1-harness, uncertainty) + deliveries (H-001 mechanics honesty, discrepancy register, ruling log, uncertainty reporting law, revised Claude prompt); flex-pricer results, raw-curves CSV; reviewed VL's tools + enhanced triangulate.
- vl: raw-curve-witness, triangulation, replacement-level-audit, uncertainty; revised Claude prompt; hypothesis/discrepancy/ruling logs.
- super: review of Beam's tools + cross-validation (cross-validate.mjs) + combined test runner (run-all-tests.mjs); T6 flex-pricer + T7 metamorphic battery; merged Beam's DL5 data into T4; run-all-tests 12/12 PASS.
- flint: P-115 review VERDICT improved; P-282 owner permanent weights + engine/tool verifications (batteries 84/0/0, tsc gate OK@91/FAIL-on-growth); lab baseline reproduction receipt (N=1000 VERIFIED, tuning FLAT); verified Beam lab tools + VL flexweight fix.
- beam: P-013 tooling pass (T3/T4/T7/T12) + governance + revised Claude prompt; merged super's T3/T4 defs, fixed vl flexweight crash; Z.ai brainstorm window.
- muse: BUILD-1+2 review (council.mjs patch, verdict ok).
- OR: salary-based DEFAULT_WEIGHTS implemented (protected constant, Owner-approved); flex REV 5; cross-position flex measurement (P-142).

Open items of note (from PRIORITIES, council/muse): P-013 (Owner decision on default weights recalibration — SUPERSEDED as a number but the decision on DEFAULT_WEIGHTS retirement is live), P-115 (game-play animation refinements), P-282 (owner permanent weights), P-010/P-012 etc. are SUPERSEDED. The live work is the P-013 veracity lab + governance + flex REV 5.

Claude is unavailable ~1 hour. Pending questions to him (a–d) and his three questions (Q1–Q3) are filed in the prompt for Claude on gh-pages. Do NOT duplicate them; use this hour to (1) deepen the lab, (2) improve tooling, (3) brainstorm innovations.

============================================================
PART 2 — WHAT YOU MAY WORK ON (read-only, engine-adjacent)
============================================================

You may NOT edit the product HTML, AGENTS.md, CLAUDE.md, PRIORITIES.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants (DEFAULT_WEIGHTS already changed by OR with Owner approval — do not change again). You MAY edit your own lane, inbox files, tools in `tools/mathlab/` or your lane's tools, and governance artifacts. Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN with a command and output.

Suggested work streams (pick any; do more than one if time permits):

A) Deepen T1 (mechanics validation) — efficiency rung NOT measurable (no per-play ledger, E5). Brainstorm:
   - Derive per-play efficiency from `playerStats`/`playByPlay`/`generateGameSummary`, or propose the minimal engine hook.
   - Add "clutch/late-game" and "injury/availability" rungs.
   - Expand real-data anchors to 2022/2023 nflverse; test replication of the 2024 CLEAN result (T11 seed).

B) Deepen T6 (flex pricer) — currently 5 cases. Brainstorm:
   - Add remaining flex combos (FB→TE1, WR3→RB2, TE2→WR3, DT2→DE2, ILB2→MIKE, OLB2→DE2, FS→CB2, SS→FS, etc.).
   - Sample supporting casts; test whether −10 holds across roster shapes.
   - Propose a replacement for −10 as a function of the two slots' measured importance ratio; show sensitivity.
   - Reconcile with OR's flex REV 5 (cap at 10) and cross-position flex measurement (P-142).

C) Improve raw-curve witness (T3a) — auto-detects ABSORBED. Brainstorm:
   - Add "calibration lineage" field (which table the display layer rescales from + scale factor).
   - Add "mechanics independence" witness (does raw curve change when display table changes?).
   - Add "temporal stability" witness (re-run after N seasons, report drift).

D) Build T5 (interaction analyzer) — not yet built. Brainstorm:
   - Which 2×2 factorials first? (QB×WR1, QB×OT1, EDGE×DT1, EDGE×CB1, CB1×FS, DT×MIKE, WR1×WR2.)
   - Cheapest factorial in engine time? Sampling scheme <10 min.
   - Group-level +5 OVR: secondary vs DL vs OL — which moves the needle most, and does it depend on roster scarcity?

E) Build T7 (metamorphic battery) — Beam/super have versions; yours could differ. Brainstorm:
   - Add invariants missed: color-independence of draft order, identical-roster symmetry under team swap, monotonicity under +1 OVR, uniform +5 OVR.
   - Which invariants are cheap vs expensive? Prioritize.

F) Build T9 (OVR-equivalency + archetype probes) — keep scarcity vs importance separate. Brainstorm:
   - Equal-percentile vs equal-absolute OVR: which produces more balanced rosters?
   - Speed/power/stuffer at fixed OVR: does the matchup model reward the right archetype?
   - Propose a metric for "archetype value" distinct from slot value.

G) Build T10 (adversarial roster generator) — flex-maximizing rosters, 85+ promotion census, super-team cramming. Brainstorm:
   - What roster shapes break flex rules? (4 TEs, 3 QBs, 6 WRs.)
   - What is the "cramming" threshold where the optimizer produces unrealistic lineups?
   - How does the −10 cap interact with adversarial rosters?

H) Build T11 (drift monitor) — re-run anchors after each real season. Brainstorm:
   - Which nflverse seasons (2020–2024)? Handle 2020 COVID season.
   - Reporting format for "slot movement as candidate rulings."
   - Distinguish real drift from noise (bootstrap CI).

I) Build T8 (optimizer known-answer suite) — small rosters, brute-force optima. Brainstorm:
   - Smallest non-trivial rosters exercising every flex path.
   - Brute-force optimum for 12-player/11-slot roster.
   - Expected wall-clock.

J) Governance & tooling improvements:
   - Improve `uncertainty.mjs` (T12): effect-size reporting, paired-seed delta, "practical significance" flag, multiple-comparison correction.
   - Improve cross-validation (`cross-validate.mjs`): add a third implementation, report three-way agreement.
   - Improve combined test runner (`run-all-tests.mjs`): "smoke" mode <60s.
   - Improve held-out lint: check no fit script reads 2024–2025 data AND no fit script reads the salary table.
   - Improve inbox protocol: machine-readable frontmatter schema (YAML/JSON) so `council.mjs` parses without regex.

K) Engine-level brainstorming (no product edits, but proposals):
   - Flex rules (REV 4/5): QB may flex ONLY to FS at −10 (REV4) / cap at 10 (REV5). Is −10 the right magnitude? Slot-pair-specific flex penalty (CB→WR1 costs more than CB→FS)?
   - Matchup model (`matchupModel`, `applyOffPlan`, `applyDefPlan`): smallest change making pass-rush pressure affect completion%?
   - Season sim (`simulateGame`, `playGame`, `simulateCurrentWeek`): where is the efficiency gap (E5)? Per-play ledger cost in bytes/time?
   - Awards (`computeRegularSeasonAwards`): real stats or synthetic? Defensible "game ball" rule.
   - Draft board (`boardEntries`, `renderDraftBoard2`): surface the raw-curve witness to the user without exposing internals.
   - RNG (T-20261022-claude-2): where should the seeded RNG land first so T2/T6 unblock on both tracks? Injection point + seeding contract.
   - Three valuation modes (Football Value / Game Balance / Owner Preset): argue for/against each as standing architecture. Default + UI switching.
   - Shadow Sim RMSE as source of truth: defend or dispute. Replacement metric?
   - Individual EPA attribution: research or gate? Defensible auditable rule.
   - Percentile vs scarcity confound: keep separate (two columns/ratings)?
   - OR's salary-based DEFAULT_WEIGHTS (now the default): is salary a defensible calibration target, or does it reintroduce the circularity? Argue.

L) Flex REV 5 specific (new, from OR):
   - OR added DIME position and flex guide REV 2. Review: is DIME (10% snaps, 3rd/4th and long) modeled correctly? What is its replacement level?
   - Cross-position flex measurement (P-142): review `tools/probes/crossflex-measure.mjs` and `tools/mathlab/flex*.mjs`. Reproduce OR's numbers; find disagreements.
   - Flex cap at 10 vs −10: which is the right guard? Propose a unified rule.
   - UI for the flex table: OR says Z.ai's guide-page table is a decent example but needs improvement. Mock a better visualization (Figma-ready spec).

M) OR's protected-constant change review:
   - OR changed DEFAULT_WEIGHTS to salary-based (hash 395f2641…). Verify the change is byte-for-byte only the constant (2 lines changed, same size). Run the gate on OR's branch.
   - Is the salary table defensible as a default? Compare to the new-preset proposal (QB=1000, +50 increments from raw slopes). Which should be the default, and why?
   - MERGE-MANIFEST re-pin: verify the hash matches the file. Run `sha256sum`.

============================================================
PART 3 — QUESTIONS FOR YOU (answer all; file answers in your lane)
============================================================

Fit-target & circularity (updated):
1. Given the forensic correction (fit target was design@27Oct×0.00254, not personal), does the dissent list (§5) change? Does "demoting Shadow Sim RMSE" become more or less justified?
2. The w79 display layer is ABSORBED at 0.000000%. Is there any build where the display layer is NOT absorbed? Confirm or refute with a build hash.
3. Should the raw-curve witness run on every build the Architect ships, as a gate? Cost (time, bytes) per build?
4. The Owner's permission to abandon the old tables is granted. Propose the exact commit sequence retiring them + MERGE-MANIFEST re-pin.
5. (NEW) OR implemented salary-based DEFAULT_WEIGHTS. Does this resolve the circularity or relocate it? Argue with evidence.
6. (NEW) The new-preset proposal (QB=1000, +50 increments from raw slopes) vs OR's salary table: which is more defensible as a default, and why? What would the Owner prefer?
7. (NEW) If both the mechanics (design@27Oct) and the display (salary) are unvalidated, what is the FIRST validation experiment you would run, and what result would change your mind?

Mechanics & validation:
8. T1 skill production is CLEAN. Good enough, or tolerance bands too loose? Show bands + actual deltas.
9. Sacks DB 0.0% vs real 7.3% (D-001): blitz-frequency, DB-rating, or engine gap (no blitz logic)? Smallest fix.
10. DB INT +5.9pp (D-002): coverage-rating or QB-decision? How to distinguish experimentally?
11. Efficiency rung NOT measurable (no per-play ledger). Minimal ledger: fields, frequency, byte cost per game/season.
12. Team wins 8.5 [8.21–8.72] vs real ~8.5. Calibrated or tautology (tuned to produce ~8.5)? How to tell?
13. PF/gm 22.27 vs real 22.8. Is 0.53 acceptable? What tolerance band, and why?
14. (NEW) Does OR's salary-based weights change any T1 result? Re-run T1 on OR's branch and report deltas.

Replacement level (T4):
15. Engine replacement OVRs uniform 70.8–76.3 vs real ~3× spread. Bug or feature?
16. ≥100-snap census threshold: right? Sensitivity 50/100/200/500.
17. Propose a replacement-level definition the engine could implement. Changes in `optimalLineup`/`effOvr`?
18. (NEW) OR's DIME position (10% snaps): what is its replacement level? Is it even replaceable?

Flex (T6 + REV 5):
19. −10 cap under-prices TE→WR1 (0.63) and CB→WR1 (0.67). What cap makes TE→WR1 meaningful but not prohibitive? Formula.
20. CB→FS only 0.28 wins lost — cheap. Allow at 0 cost, or hidden cost (coverage)? How to measure?
21. Owner's flex rule (REV 4): QB may flex ONLY to FS at −10. Too restrictive or lenient? Revision for Owner.
22. Full-roster counterfactuals re-optimize both arms. Fair, or hides flex cost? Alternative (fixed supporting cast) + compare.
23. (NEW) Flex REV 5 cap at 10 vs −10: which is the right guard? Unified rule?
24. (NEW) Cross-position flex (P-142): review OR's measurement. Reproduce; find disagreements.
25. (NEW) DIME added to flex guide: is it flex-eligible? At what penalty?

Tools & infrastructure:
26. Cross-validation harness has 2 implementations (Beam, super). Add yours; three-way agreement. Expected disagreements?
27. Combined test runner (`run-all-tests.mjs`): "smoke" mode <60s — minimal set?
28. Held-out lint: sufficient, or also check no fit script reads the salary table? Stricter check?
29. Inbox protocol free-form markdown. Machine-readable frontmatter schema (YAML/JSON) + `council.mjs` parsing?
30. T12 uncertainty wrapper: what's missing? (Effect size, paired delta, practical significance, multiple-comparison correction?)
31. Council tool (`tools/council.mjs`) no output from /tmp on Mac (guard bug). Fix not requiring worktree?
32. (NEW) OR's flex tools (`flex*.mjs`, `flexengine.js`, `flexparse.mjs`): review and reproduce. What's broken or improvable?
33. (NEW) `run-all-tests.mjs` reports 12/12 PASS on super's branch but fails when run from a different worktree (path issues). Fix?

Governance & process:
34. Hypothesis ledger (H-###) pre-written before experiments. HARKing risk? Mitigation (timestamped commit before running)?
35. Discrepancy register (D-###) + ruling log (R-###) separate. Merge into one "decision trail"? Argue both sides.
36. Owner's permission to abandon old tables (R-001) binding, but forensic correction (D-007) is only a REQUEST. If Owner disagrees with correction, does R-001 still hold? Argue.
37. Council ~12 seats, many unavailable. Minimal viable review for a P0 item? Propose a rule.
38. START-OF-CHAT protocol (§1/§2/§3) long. 5-line version preserving safety?
39. (NEW) OR changed a protected constant (DEFAULT_WEIGHTS) on his branch. Is this within authority (Owner approved)? Should the Architect have done it? Governance lesson?
40. (NEW) The manifest hash changed (40233d… → 395f2641…). Verify every tool that pins the hash is updated. List them.

Engine architecture:
41. Three valuation modes (Football Value / Game Balance / Owner Preset): default for new user + UI switching?
42. Shadow Sim RMSE as source of truth: defend or dispute. Replacement metric?
43. Trait-weighted flex degradation: premature or justified? Settling test?
44. Individual EPA attribution: research or gate? Defensible auditable rule?
45. Percentile vs scarcity confound: keep separate (two columns/ratings)?
46. Matchup model (`matchupModel`, `applyOffPlan`, `applyDefPlan`): smallest change making pass-rush pressure affect completion%? Worth it?
47. Season sim (`simulateGame`, `playGame`, `simulateCurrentWeek`): efficiency gap? Per-play ledger cost + consumer?
48. Awards (`computeRegularSeasonAwards`): real stats or synthetic? Defensible "game ball" rule?
49. Draft board (`boardEntries`, `renderDraftBoard2`): surface raw-curve witness to user without exposing internals? Mock UI.
50. RNG (T-20261022-claude-2): injection point + seeding contract so T2/T6 unblock on both tracks?
51. Flex rules (REV 4/5): QB may flex ONLY to FS at −10 / cap at 10. Right magnitude? Slot-pair-specific penalty?
52. 3-4/4-3 base toggle (P-017, SUPERSEDED): still relevant? Revive?
53. Game animation (P-007, SUPERSEDED): 30–60s, every turnover, Skip, reduced-motion. Still wanted? Changes?
54. Homepage (P-040…P-078, SUPERSEDED): which revive for Colors v1?
55. Guide page (P-015, SUPERSEDED): flex table, wins-per-OVR, glossary. Revive any?
56. Playoffs/clutch drama (P-122, SUPERSEDED): playoff intro ≥5s, clutch moments, Super Bowl intro ≤30s. Still wanted?
57. Champion banner (P-022, SUPERSEDED): gold shimmer, confetti. Still wanted?
58. (NEW) OR's DIME position: should it be a first-class slot in the model, or a situational modifier? Argue.
59. (NEW) OR's flex REV 5 (cap at 10) vs REV 4 (−10): which is more defensible? Propose a unified rule with justification.
60. (NEW) The Owner's salary-based weights are now the default. Does this change the value of the raw-curve witness, or make it more important? Argue.

Brainstorming (open-ended, no wrong answers):
61. Single biggest unmeasured risk in the engine today?
62. Tool you'd build with 4 uninterrupted hours, no constraints?
63. Most under-used data source the engine already has (playerStats, playByPlay, matchupModel output)?
64. Smallest change with biggest veracity impact?
65. What should the Owner be told, in one sentence, about engine state?
66. What should Claude be told, in one sentence, when he returns?
67. What should the next Owner ruling be? (Propose + justification.)
68. Most likely way council work gets wasted (failure mode) + prevention?
69. Most likely way Owner's permission to abandon old tables gets misused + prevention?
70. If you could change one AGENTS.md rule, which + why?
71. If you could add one tool to the council toolset, which + why?
72. Single most important thing the council is NOT measuring today?
73. What would "v2" of the raw-curve witness look like?
74. What would "v2" of the flex pricer look like?
75. What would "v2" of the triangulation look like?
76. (NEW) What would "v2" of the cross-position flex measurement look like?
77. (NEW) What would a "v2" of the held-out lint look like (checking salary-table reads, not just 2024–2025)?
78. (NEW) What is the most important question the council has NOT asked yet?
79. (NEW) What is the most important measurement the council has NOT made yet?
80. (NEW) If you had to delete one tool from the council's toolset, which and why?

============================================================
PART 4 — DELIVERABLES
============================================================

Produce, in your lane, by the end of this hour (or whenever you stop):
1. `_agents/<seat>/notes/brainstorm-2026-11-08.md` — answers to all 80 questions above, labelled VERIFIED/REPORTED/INFERRED/UNKNOWN, with commands where applicable. At least 40 answers must be INFERRED or better.
2. At least ONE new tool or improvement to an existing tool, in `tools/mathlab/` or your lane's tools, with a receipt (command + output) and a self-test.
3. At least ONE governance artifact (hypothesis ledger entry, discrepancy register entry, or ruling log entry) capturing a new finding.
4. Updated lane file reflecting this session.
5. Inbox entry `inbox/<UTC>-<seat>-<ID>-brainstorm-2026-11-08.md` summarizing what you did and what Claude should read.
6. A zip at `download/z-post-blue-docs-update-2026-11-08-brainstorm.zip` (or your own name) with UPDATE-README + CHECKSUMS, built cleanly (no /tmp pollution).
7. If you improve any shared tool, file a review entry `inbox/<UTC>-<seat>-<ID>-review.md` with VERDICT.

Constraints: read-only on product/protected files (DEFAULT_WEIGHTS already changed by OR with Owner approval — do not change again). No push. Label everything. "Done" needs a command and its output. End with the zip path + md5 + product HTML md5 (unchanged, or note OR's hash if you used his branch).

Go.
