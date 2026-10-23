# Authoritative Dataset Format Declaration

## Round 1 — S-203 Format is Authoritative

**Declaration Date:** 2026-10-19  
**Applies To Build:** 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f  
**Declaration By:** GLM session (per S-203 submission)

## Declaration

The **S-203 dataset format** (contained in `tests/2025_standards.js`) is hereby declared the **authoritative format** for Round 1 of the NFL Draft Simulator workflow.

### Effective Immediately

| Format                                       | Status            | Effective Round     |
| -------------------------------------------- | ----------------- | ------------------- |
| **S-203 format** (`tests/2025_standards.js`) | **Authoritative** | Round 1             |
| S-502 format (`tests/season_2025.json`)      | Superseded        | Round 1 and forward |

### S-203 Format Specifications

- **File:** `tests/2025_standards.js`
- **Team Names:** Must match `TEAM_DATA` keys **exactly**
- **Team Count:** 32 NFL teams
- **Game Count:** 17 games per team
- **Format:** JavaScript module/object suitable for `validate.js` consumption
- **Authority:** Overrides S-502 format for all Round 1 submissions

### S-502 Format Status

- **File:** `tests/season_2025.json`
- **Status:** **Superseded** by S-203 for Round 1
- **Reason:** S-203 format has been declared authoritative; S-502 submissions will be deferred until Round 2 or until S-203 format is revised
- **Note:** S-502 format is not invalid — it is simply **not authoritative for Round 1**

### Declaration Rationale

1. **Consistency:** S-203 team names match `TEAM_DATA` keys exactly (32 teams, 17 games), ensuring dataset↔roster consistency
2. **Single Source of Truth:** One authoritative format prevents dataset conflicts and `validate.js` gate errors
3. **Round 1 Priority:** The Round 1 adjudication chain (S-202 → S-203 → S-103 → S-102 → S-301) processes S-203 before S-502
4. **Audit Alignment:** INTEGRATION_AUDIT_LIGHTNING.md Risk #4 (dataset format conflict) is resolved by this declaration

### How to Submit Datasets Going Forward

- **Round 1:** Submit using S-203 format (`tests/2025_standards.js`). S-502 format submissions will be marked as `deferred` with revival condition "wait for S-203 authoritative declaration."
- **Round 2+:** S-502 format may be resubmitted if S-203 format is revised or if the Round 1 dependency chain is complete and S-502 is independently verified.
- **Format Detection:** Claude will detect the format by file name and namespace. `tests/2025_standards.js` → S-203 authoritative; `tests/season_2025.json` → S-502 superseded.

### Verification

This declaration is recorded in:
- `INTEGRATION_AUDIT_LIGHTNING.md` — Risk #4 resolved (S-203 authoritative)
- `NEW_WORKFLOW_ROUND1.md` — S-203 processes before S-502 in 1A chain
- `STATUS.md` — Build hash 77bb9ed5; dataset format declaration recorded
- This file: `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` — Published on Git for all agents and Claude to read

### Quick Reference

| Question                                    | Answer                                                            |
| ------------------------------------------- | ----------------------------------------------------------------- |
| What format is authoritative for Round 1?   | S-203 (`tests/2025_standards.js`)                                 |
| Is S-502 format invalid?                    | No — superseded for Round 1 only                                  |
| Who declared S-203 authoritative?           | GLM session (per S-203 submission)                                |
| Where is this recorded?                     | INTEGRATION_AUDIT_LIGHTNING.md, NEW_WORKFLOW_ROUND1.md, this file |
| When does S-502 become authoritative again? | Round 2+, or until formally re-declared                           |

---

_This declaration is effective immediately and stands until a future round declares otherwise. The S-203 format remains authoritative for all subsequent rounds unless and until a new declaration is posted._
