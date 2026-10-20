# DECISION-LOG.md — Architect (Claude) rulings index

**Purpose.** Searchable index of Architect decisions. Separate from CHRONICLE (facts/events) — this is decisions only. One line per ruling.

**Format:** `YYYY-MM-DD | Question ID | Decision | One-line reason | Build hash when applied`

---

## Merge & Keep-List Decisions

| Date | Question ID | Decision | Reason | Build |
|------|-------------|----------|--------|-------|
| 2026-10-19 | Owner R2 | v20 = reference base; donor = fixes | Owner ruling | — |
| 2026-10-19 | Owner R3 | Claude = Architect, technical authority | Owner ruling | — |
| 2026-10-19 | Owner R4 | No deputy, flat council | Owner ruling | — |
| 2026-10-19 | Owner R5 | No editing another's files | Owner ruling | — |
| 2026-10-19 | Owner R1 | Deployment out of scope | Owner ruling | — |
| | Q-GLM-2 / Q-GLM-5 / Q-GLM-7 / Q-GLM-8 | | | |
| | Q-NEMOSUPER-1 / Q-NEMOSUPER-2 | | | |
| | Q-NEMOULTRA-1 / Q-NEMOULTRA-2 | | | |
| | Q-PICKLE-1 / Q-PICKLE-3 / Q-PICKLE-7 / Q-PICKLE-8 | | | |
| | Q-BEAM-1 / Q-BEAM-2 | | | |
| | Q-DS-4 / Q-DS-5 | | | |
| | Q-UK-1 / Q-UK-2 / Q-UK-3 | | | |

---

## cpuPick Direction

| Date | Question ID | Decision | Reason | Build |
|------|-------------|----------|--------|-------|
| 2026-10-20 | Pickle M-13 #2 (original) | Keep v20's cpuPick | GLM forwarded unmeasured | — |
| 2026-10-20 | Pickle M-20 / DS M-16 / GLM M-53 | **REVERSED** — Keep donor's cpuPick | Donor has round floors + bounded miss; v20 has cap + 92-deep unbounded miss | — |
| | Q-PICKLE-1 (amended) | | | |
| | Q-GLM-5 (implied) | | | |
| | Q-NEMOSUPER-2 (implied) | | | |

---

## Wrapper & color-scheme

| Date | Question ID | Decision | Reason | Build |
|------|-------------|----------|--------|-------|
| | Q-GLM-7 | | | |
| | Q-DS-4 | | | |
| | Q-PICKLE-3 / Q-PICKLE-8 | | | |
| | Q-BEAM-2 | | | |
| | Q-UK-2 | | | |

---

## SIM-CORE Markers & Harness

| Date | Question ID | Decision | Reason | Build |
|------|-------------|----------|--------|-------|
| 2026-10-19 | Contract v2 (B1–B4) | Markers + 3 headless entry points mandatory | Binding contract | — |
| | Q-GLM-8 | | | |
| | Q-PICKLE-7 / Q-PICKLE-9 | | | |
| | Q-UK-4 | | | |

---

## Workflow & Process

| Date | Question ID | Decision | Reason | Build |
|------|-------------|----------|--------|-------|
| 2026-10-19 | GLM roundtable D3 | Full Claude-dominant write workflow | Owner interim answer | — |
| 2026-10-20 | GLM M-52 | Architect MCP repo write confirmed | Tested read+write to kozikosi/football-sim | — |
| | Q-GLM-1 / Q-GLM-2 / Q-GLM-3 | | | |
| | Q-GLM-13 / Q-GLM-14 / Q-GLM-15 | | | |
| | Q-GLM-16 / Q-GLM-17 / Q-GLM-18 | | | |
| | Q-DS-6 / Q-DS-7 / Q-DS-8 | | | |
| | Q-BEAM-3 / Q-BEAM-4 / Q-BEAM-5 | | | |
| | Q-UK-6 / Q-UK-7 / Q-UK-8 | | | |

---

## v20 Product Quality

| Date | Question ID | Decision | Reason | Build |
|------|-------------|----------|--------|-------|
| | Q-GLM-6 (v20 soul) | | | |
| | Q-GLM-20 (U-series triage) | | | |
| | Q-GLM-21 (Architect wishlist) | | | |
| | Q-GLM-22 (performance budget) | | | |
| | Q-GLM-23 (v1.0 definition) | | | |
| | Q-GLM-24 (awards/recap) | | | |
| | Q-NEMOULTRA-3 / Q-NEMOULTRA-4 / Q-NEMOULTRA-5 | | | |
| | Q-PICKLE-2 (persistence) | | | |
| | Q-PICKLE-4 (seeded RNG) | | | |
| | Q-PICKLE-5 (SEASON_RECORD_CAPS) | | | |
| | Q-PICKLE-6 (queue hold) | | | |
| | Q-UK-4 (harness timing) | | | |
| | Q-UK-5 (verification timing) | | | |

---

## Verification & Release

| Date | Question ID | Decision | Reason | Build |
|------|-------------|----------|--------|-------|
| 2026-10-19 | GLM roundtable (verifier) | 1A: Ultra/fresh; 1B: DS/GLM | Five-line report + funcdiff | — |
| | Q-GLM-4 (context packet) | | | |
| | Q-UK-5 (harness before merge) | | | |

---

*Maintained by UK (S-2200–2299). Append only — never rewrite. Source: COUNCIL-BULLETIN.md messages, QUESTIONS-FOR-THE-ARCHITECT.md answers, SUBMISSIONS.md status lines, CHRONICLE.md. Update when Architect answers arrive verbatim via Owner.*