# ROADMAP.md — v1.0+ project roadmap

**Purpose.** High-level milestones for v1.0 and beyond. Owned by the Architect; council contributes research/advice. Updated when Architect sets direction.

---

## Phase 0 — Merge & Stabilize (Current)

- [ ] Complete v20 ↔ donor merge (Architect)
- [ ] Insert SIM-CORE markers + 3 headless entry points (S-202)
- [ ] Resolve wrapper malformation + color-scheme
- [ ] Decide cpuPick keep-direction (donor vs v20 vs hybrid)
- [ ] Verifier pass (E2E + 390px + funcdiff)
- [ ] Hash bump in STATUS.md

**Target:** Merge hash named, build verified, donor archived.

---

## Phase 1 — Harness & Validation (Round 1A/1B)

- [ ] S-202: SIM-CORE markers + extraction + manifest check
- [ ] S-203: 2025 standings dataset for validate.js
- [ ] S-103: tests/funcdiff.js function-level build differ
- [ ] S-102: pw4.js spec (baseline-drift gates, CLI, checks)
- [ ] S-301: tests/run_all.sh composite runner + mobile thresholds
- [ ] S-401: phone.js spec (static 390px overflow lint)
- [ ] S-502: validate.js spec (external 2025 validation, two-layer gates)

**Target:** Full verification harness runs against merged build; baseline frozen.

---

## Phase 2 — Reproducibility & Persistence (Round 2+)

- [ ] Seeded RNG: harness-only `rng()` indirection (Pickle Q-PICKLE-4)
- [ ] Persistence: "remember my season" via localStorage (Pickle Q-PICKLE-2)
- [ ] SEASON_RECORD_CAPS: separate sim value from displayed value (Pickle Q-PICKLE-5)
- [ ] Data encoding: JSON island or structured format (DS Q-DS-1)
- [ ] Dead code removal: 10 functions, 13 CSS classes (DS arch-probe)

---

## Phase 3 — v1.0 Polish (Post-Harness)

- [ ] Mobile table stacking fix (v20:6416 stale memo)
- [ ] 100-season report crash fix (v20:6018 rWeights)
- [ ] Mobile draft board pattern adopted globally (Nemo Ultra P1-P2)
- [ ] Hero/stepper shell adopted (Nemo Ultra P1)
- [ ] CSS variable system baseline (Nemo Ultra P3)
- [ ] Awards/recap voice & league-leaders cap (GLM Q-GLM-24)
- [ ] CPU pick distribution measurement (U-12, S-102 M11)
- [ ] Weights audit vs 2025 real standings (U-13, S-203)
- [ ] League-Leaders 390px overflow fix (U-17)

---

## Phase 4 — v1.1+ Extensions

- [ ] Multi-season franchise mode
- [ ] Custom roster / league settings
- [ ] Export/import league files
- [ ] Headless CLI for batch simulation
- [ ] Web Worker for heavy computation (if approved)
- [ ] Replay system (game-level)

---

## Architect's v1.0 Definition (per Q-GLM-23)

> _To be filled when Architect answers: "What set of things, concretely, would make you call this project DONE?"_

---

## Council Research Backlog (cheap, parallelizable)

| Topic                                                 | Owner | Status | Notes                                    |
| ----------------------------------------------------- | ----- | ------ | ---------------------------------------- |
| Similar project survey (football sims, draft engines) | —     | open   | Q-GLM-19 "want MORE background research" |
| Pythagenpat calibration for 32.5 PPW                  | —     | open   | Core invariant                           |
| Flex penalty calibration vs real NFL versatility      | —     | open   | Protected constant adjacent              |
| Injury model validation                               | —     | open   | `inj` rating in PLAYERS                  |
| Weather effects on game model                         | —     | open   | Not in current spec                      |

---

_Maintained by UK (S-2200–2299) per Architect direction. Append updates; never rewrite. See CHRONICLE for change log._
