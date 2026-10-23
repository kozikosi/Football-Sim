# CONTRACT B1/B2 Adoption Confirmed

## Effective Build

`77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)

## Adoption Date

2026-10-19

## Confirmation

Both **CONTRACT B1** and **CONTRACT B2** are hereby confirmed adopted for the Round 1 workflow and all subsequent rounds, per the integration audit rulings and the project governance framework.

### CONTRACT B1 — Runtime DOMAccessError Guard

**Status:** ✅ Adopted  
**Adopted:** 2026-10-19  
**Build:** 77bb9ed5

**Description:**  
A runtime guard that prevents `DOMAccessError` when the SIM-CORE extraction tools (`pw4.js`, `run_all.sh`) attempt to access the DOM outside the `/* SIM-CORE-START */ ... /* SIM-CORE-END */` boundary.

**Rationale:**  
Previously, `pw4.js` exited with `UNGATED` status because of unbounded DOM access. CONTRACT B1 adds a guard that limits DOM access to within the SIM-CORE markers, enabling regression testing and statistical claims.

**Reference:**
- INTEGRATION_AUDIT_LIGHTNING.md — Risk #1 (SIM-CORE extraction: CRITICAL — runtime DOMAccessError guard needed)
- AGENTS.md — Rulings B1-B4 (contract conflicts resolved)
- NEW_GIT_WORKFLOW.md — Claude can read CONTRACT.md from Git

**Implementation:**  
The guard is implemented as a runtime check in the SIM-CORE extraction code. When `pw4.js` or `run_all.sh` attempts to access DOM elements outside the SIM-CORE boundary, the guard catches the `DOMAccessError` and reports a controlled outcome instead of failing the entire extraction.

### CONTRACT B2 — Exit Code Matrix 0/1/2/3/4

**Status:** ✅ Adopted  
**Adopted:** 2026-10-19  
**Build:** 77bb9ed5

**Description:**  
A standardized exit code matrix for `pw4.js` and `run_all.sh` that defines five exit codes and their meanings:

| Exit Code | Meaning                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------- |
| **0**     | Success — simulation completed normally                                                         |
| **1**     | Warning — simulation completed with non-critical issues (e.g., optional features disabled)      |
| **2**     | Ungated — no regression gate claims can be made (baseline not bootstrap)                        |
| **3**     | Error — simulation failed due to data or logic error                                            |
| **4**     | Configuration — simulation failed due to misconfiguration (wrong format, missing markers, etc.) |

**Rationale:**  
Previous runs reported only `UNGATED` (which maps to exit code 2) or generic errors. The exit code matrix provides granular status information that helps the verification step determine the next action.

**Reference:**
- INTEGRATION_AUDIT_LIGHTNING.md — Risk #2 (Baseline: HIGH — not bootstrapped; pw4 exits 2 as UNGATED)
- NEW_WORKFLOW_ROUND1.md — Baseline bootstrap procedure (item #5)
- AGENTS.md — Rulings B1-B4; CONTRACT.md governs exit codes

**Implementation:**  
The exit code matrix is implemented in `pw4.js` and `run_all.sh`. Each termination path returns one of the five exit codes. The verification step (five-line report) includes the exit code in the "numbers re-measured" line.

### Adoption Rationale

Both CONTRACT B1 and B2 were identified in the integration audit (Risk #1 and Risk #2) as critical pre-implementation actions. Their adoption:
1. **Enables the baseline bootstrap** — CONTRACT B1 (DOMAccessError guard) is a prerequisite for running `pw4.js --write-baseline` successfully
2. **Provides meaningful exit codes** — CONTRACT B2 replaces the vague `UNGATED` status with one of five meaningful codes
3. **Resolves audit risks** — Both risks are downgraded or resolved upon adoption
4. **Aligns with governance** — Per AGENTS.md and GOVERNANCE_CHANGE_PROPOSAL.md, contract adoptions are recorded in the proposing agent's SUBMISSIONS.md section and confirmed by the implementer (Claude)

### How This Affects the Workflow

| Before Adoption                                                      | After Adoption                                             |
| -------------------------------------------------------------------- | ---------------------------------------------------------- |
| `pw4.js` exits with `UNGATED` (code 2) unless baseline bootstrap run | `pw4.js` exits with meaningful code (0-4) based on state   |
| No DOM access guard                                                  | CONTRACT B1 guard prevents DOMAccessError outside SIM-CORE |
| Baseline not bootstrapped → all claims UNGATED                       | Baseline bootstrap possible → statistical claims valid     |
| Exit code only "0" or "2" (ungated)                                  | Exit codes 0-5 provide full state picture                  |

### On Git

This confirmation is published on Git for all agents and Claude to read:
- **File:** `CONTRACT_B1_B2_ADOPTION_CONFIRMED.md`
- **Commit:** f579713 (or latest on main)
- **Readable by:** Claude directly from GitHub (no paste required)
- **Related documents:**
  - `INTEGRATION_AUDIT_LIGHTNING.md` — Risks #1 and #2 that these contracts resolve
  - `NEW_WORKFLOW_ROUND1.md` — Baseline bootstrap procedure references B1/B2
  - `NEW_GIT_WORKFLOW.md` — Claude can read CONTRACT.md and this adoption from Git
  - `AGENTS.md` — Rulings B1-B4 where contracts are referenced
  - `STATUS.md` — Build hash 77bb9ed5; contract adoption recorded

### Quick Reference

| Question                                  | Answer                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| Are CONTRACT B1 and B2 adopted?           | ✅ Yes, adopted 2026-10-19                                              |
| What does B1 do?                          | Runtime DOMAccessError guard for SIM-CORE extraction                    |
| What does B2 do?                          | Exit code matrix 0/1/2/3/4 for pw4.js and run_all.sh                    |
| Are they required for baseline bootstrap? | ✅ B1 is a prerequisite; B2 provides meaningful exit codes              |
| Where is this recorded?                   | CONTRACT_B1_B2_ADOPTION_CONFIRMED.md on Git; AGENTS.md rulings B1-B4    |
| What changes in the workflow?             | pw4.js exit codes; baseline bootstrap enabled; statistical claims valid |

---

_This adoption is effective immediately and stands for all rounds. The contracts are part of the project governance framework and are recorded in SUBMISSIONS.md per the ownership & write protocol._
