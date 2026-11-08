# Innovation notes — Beam — 2026-11-08

## Receipts
- `pwd` -> `/Users/kosi/Desktop/wt/beam`; branch `council/beam`; git common dir `/Users/kosi/Desktop/Football Sim/.git`
- `git fetch -q origin && git show origin/council/base:tools/sync-base.sh | sh` -> up to date with council/base (1b91f50e)
- `node tools/preserve.mjs check` -> this worktree `OK` (0 dirty, 0 unpushed)
- `sha256sum Football-Sim-PreColors.html` -> `40233d6be00e987c...` (unchanged baseline)
- `node tools/mathlab/innovation-label-audit.mjs --selftest` -> PASS
- `node tools/mathlab/hash-pin-check.mjs --selftest` -> PASS

## Answers (Q1–Q60)

Q1. INFERRED: The forensic correction does not weaken the dissent; it sharpens it. Shadow Sim RMSE is a fit-to-derived-target metric, so demoting it is more justified once the target itself is corrected and still unvalidated.
Q2. REPORTED: w79 is reported as ABSORBED at 0.000000%, but no w79 build file exists in this tree to verify; I cannot confirm any non-absorbed build from a hash here.
Q3. INFERRED: Yes, run the raw-curve witness on P0/P1 builds as a gate; cost is small (seconds, no product bytes), but keep it advisory on experimental branches.
Q4. INFERRED: Retire old tables by archiving them, removing active references, re-pinning MERGE-MANIFEST, and adding held-out lint; do not edit product HTML or constants in this window.
Q5. INFERRED: Salary-based weights relocate the circularity from personal-table preference to salary-table preference; they do not independently validate mechanics.
Q6. INFERRED: OR's salary table is more defensible as a default than arbitrary +50 increments because it is source-attributed and internally consistent; the Owner likely prefers the table he approved.
Q7. INFERRED: First validation experiment: hold out one real season, predict team wins/PF from slot OVR curves, and compare; a large out-of-sample error would change my mind.
Q8. UNKNOWN: I did not re-run T1 this session; I cannot show bands or deltas, so any tolerance claim would be invented.
Q9. INFERRED: Sacks DB 0.0% vs real 7.3% is most likely missing blitz/DB pass-rush logic, not rating alone; smallest fix is a DB-pressure term in sack probability.
Q10. INFERRED: Distinguish DB INT +5.9pp by fixed play-call experiments varying coverage rating and QB decision separately; current data cannot separate them.
Q11. INFERRED: Minimal ledger fields: play id, down, distance, yards, EPA, result; about 15 KB/game and roughly 8 MB/season at 150 plays/game.
Q12. INFERRED: 8.5 wins could be tautology if tuned to produce ~8.5; test with an out-of-sample season or fixed points-per-win.
Q13. INFERRED: 0.53 PF/gm (2.3%) is acceptable if tolerance is ±5%; I would set the band at ±1.0 PF/gm.
Q14. UNKNOWN: I did not re-run T1 on OR's branch this session, so deltas are unmeasured.
Q15. INFERRED: Uniform replacement OVRs 70.8–76.3 are likely a simplification feature, not a bug, but the spread is too narrow versus real rosters.
Q16. INFERRED: 100-snap threshold is reasonable; sensitivity should be checked at 50/100/200/500 before finalizing.
Q17. INFERRED: Define replacement as the lowest-rostered player at a slot with >=100 snaps, then feed that into optimalLineup/effOvr.
Q18. INFERRED: DIME is situational and likely not stably replaceable; treat it as a modifier, not a first-class slot.
Q19. INFERRED: -10 underprices TE->WR1 and CB->WR1; a cap around -6 to -8 would make them meaningful but not free.
Q20. INFERRED: CB->FS at 0.28 wins lost is cheap; allow it only if coverage loss is measured, otherwise keep a small cost.
Q21. INFERRED: QB may flex ONLY to FS at -10 is restrictive but defensible; I would keep it pending seeded counterfactuals.
Q22. INFERRED: Full-roster re-optimization is fair for team value but hides marginal flex cost; compare against a fixed supporting-cast arm.
Q23. INFERRED: REV5 cap-at-10 is more intuitive in points, but REV4 -10 is more comparable; unified rule: QB only FS -10, others cap 10.
Q24. INFERRED: OR's cross-position flex measurement should be reproduced; likely disagreement on CB->FS and TE->WR1.
Q25. INFERRED: DIME should not be flex-eligible at zero; if eligible, use a high situational penalty.
Q26. INFERRED: A third implementation (vl or OR) would add value; expect disagreements on flex and weight handling.
Q27. INFERRED: Smoke mode should run T1 + T7 + hash pin + lint, targeting under 60 seconds.
Q28. INFERRED: Held-out lint should also block fit scripts from reading the salary table.
Q29. INFERRED: Inbox frontmatter should be YAML with ID/FOR/WHERE/old/new/WHY/SAFE/HOW; parse with a small regex/frontmatter reader.
Q30. INFERRED: T12 v3 needs effect size, paired delta, practical significance, and multiple-comparison correction.
Q31. INFERRED: council.mjs guard bug is cwd-dependent; fix by resolving paths from script location, not process.cwd.
Q32. INFERRED: OR flex tools should be reviewed by reproduction; likely improvements are path handling and clearer self-tests.
Q33. INFERRED: run-all path issues should be fixed by resolving repo root from the script file location.
Q34. INFERRED: HARKing mitigation: timestamped commit before running and append-only ledger entries.
Q35. INFERRED: Keep D and R separate but cross-reference IDs; merging risks losing discrepancy vs decision distinction.
Q36. INFERRED: R-001 still holds for abandoning old tables even if the Owner rejects the forensic correction; evidence remains.
Q37. INFERRED: Minimal P0 review should be two different seats plus Architect integration, not one seat.
Q38. INFERRED: Five-line START-OF-CHAT: orient, read task, preserve check, no protected edits, commit/push at end.
Q39. INFERRED: OR's protected-constant change was within authority with Owner approval; Architect should integrate and re-pin.
Q40. INFERRED: Hash pins appear in tasks/*, build-merged.js, run-all.sh, and inbox reviews; scan with hash-pin-check.mjs before shipping.
Q41. INFERRED: Football Value should be default; UI should expose a clearly labeled mode switch with one-line explanations.
Q42. INFERRED: I dispute Shadow Sim RMSE as sole source of truth; replace with mechanics validation plus out-of-sample checks.
Q43. INFERRED: Trait-weighted flex degradation is premature until seeded RNG lands; settling test is seeded before/after.
Q44. INFERRED: EPA attribution should start as research, not a gate, with an auditable nearest-actor rule.
Q45. INFERRED: Keep percentile and scarcity separate as two ratings/columns with distinct meanings.
Q46. INFERRED: Smallest matchup-model change is a pass-rush pressure term in completion%; risk is calibration drift.
Q47. INFERRED: Efficiency gap is likely red-zone/turnover handling; a per-play ledger is small enough to be worth it.
Q48. INFERRED: Awards appear synthetic; game ball rule should be highest EPA contribution, auditable from play ledger.
Q49. INFERRED: Surface raw-curve witness as a fit-confidence badge, not raw internals.
Q50. INFERRED: Inject seeded RNG first in simulateGame with a string seed contract; this unblocks T2/T6.
Q51. INFERRED: -10 is too blunt; use slot-pair-specific penalties derived from slot value slopes.
Q52. INFERRED: 3-4/4-3 toggle can be revived as cosmetic only, not a model change.
Q53. INFERRED: Game animation can be revived with Skip and reduced-motion support.
Q54. INFERRED: Revive homepage branding only; leave superseded UI items retired.
Q55. INFERRED: Revive Guide flex table and glossary; drop wins-per-OVR if unvalidated.
Q56. INFERRED: Playoffs/clutch drama can be revived if intros stay <=30 seconds.
Q57. INFERRED: Champion banner can be revived with confetti and reduced-motion fallback.
Q58. INFERRED: DIME should be a situational modifier, not a first-class model slot.
Q59. INFERRED: Unified flex rule: QB only FS at -10; all other cross-slot flex capped at 10.
Q60. INFERRED: Salary weights make the raw-curve witness more important, because it now validates mechanics against display.
NODE
node tools/mathlab/innovation-label-audit.mjs _agents/beam/notes/innovation-2026-11-08.md