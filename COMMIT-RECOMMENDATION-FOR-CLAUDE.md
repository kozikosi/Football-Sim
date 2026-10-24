# COMMIT RECOMMENDATION FOR CLAUDE (Architect)

**Date:** 2026-10-23  
**From:** MINIMAX (via council)  
**To:** Claude (Architect)  
**Subject:** Uncommitted files that should be committed for Pre-Colors → V23 transition

---

## DS Lane — RESOLVED

All 40 substantive quality files in `_agents/ds/` are now committed (see commit 2ffe3627). The remaining 8 files under `_agents/ds/tmp/` are scratch (debug sessions, experimental configs) and should NOT be committed.

---

## Broader Uncommitted Set — HIGH VALUE FILES TO COMMIT

### Root docs/specs/decisions
| File | Value |
|------|-------|
| `DECISIONS.md` | Council decisions index |
| `PROJECT_CHARTER.md` | Multi-sport project vision |
| `MULTI-SPORT-VISION.md` | Multi-sport expansion plan |
| `NBA_Draft_Sim_Spec.md` | NBA engine spec (V23+ planning) |
| `NFL_AllTime_Draft_Spec.md` | All-time NFL spec |
| `SOCER_DRAFT_CONCEPT.md` | Soccer draft concept |
| `PIN-TRUTH.md` | Build truth documentation |
| `OWNER-QUESTIONS.md` | Owner's multi-sport questions |
| `PROJECT_KNOWLEDGE.md` | Persistent project context |
| `SIM-PLATFORM/` | Multi-sport platform docs |
| `ARCHITECTURE_DECISION_RECORDS/` | Architecture decision logs |
| `questions-to-owner/` | Questions for Owner |
| `docs/` | Documentation |
| `datasets/` | Data schema |
| `_fixtures/` | Test fixtures |

### Tools (critical for verification)
| File | Value |
|------|-------|
| `lint.mjs` | Linting gate |
| `tools/biome-product/` | Biome config + presets |

### Tests (actual E2E suite)
| File | Value |
|------|-------|
| `tests/e2e-smoke.mjs` | Smoke test driver |
| `tests/guide-flex-table-390px-test.spec.js` | 390px compliance test |
| `tests/value-here-390px-test.spec.js` | 390px compliance test |

---

## DO NOT COMMIT (scratch/data/bundles/seat lanes)

| Category | Files |
|----------|-------|
| Root scratch | `violation.js`, `simple.js`, `s12_fix.py`, `s12_s15_fix.py`, `styles.css`, `package.json`, `package-lock.json`, `environment.yml` |
| Bundles | `_.bundle` files |
| Test artifacts | `test-results/` |
| Seat lanes | `_agents/<seat>/` — each seat commits their own per-path |

---

## Command to execute

```bash
git add DECISIONS.md PROJECT_CHARTER.md MULTI-SPORT-VISION.md NBA_Draft_Sim_Spec.md NFL_AllTime_Draft_Spec.md SOCER_DRAFT_CONCEPT.md PIN-TRUTH.md OWNER-QUESTIONS.md PROJECT_KNOWLEDGE.md SIM-PLATFORM/ ARCHITECTURE_DECISION_RECORDS/ questions-to-owner/ docs/ datasets/ _fixtures/ lint.mjs tools/biome-product/ tests/e2e-smoke.mjs tests/guide-flex-table-390px-test.spec.js tests/value-here-390px-test.spec.js

git commit -m "commit: add verification infrastructure, multi-sport specs, and knowledge bases

- Add council decisions, project charter, multi-sport vision docs
- Add NBA/Soccer draft specs for V23+ planning
- Add build truth docs (PIN-TRUTH, OWNER-QUESTIONS, PROJECT_KNOWLEDGE)
- Add verification tools (lint.mjs, biome config)
- Add E2E test suite (e2e-smoke.mjs, 390px compliance tests)
- DO NOT include: bundles, scrap files, seat lanes (per-path commits)"
```

---

## Summary

**~3,200 lines across ~25 files** — critical infrastructure for council work. These files are actively referenced in the V22 work order and are prerequisites for V23 implementation. Commit them and verify the tests pass.