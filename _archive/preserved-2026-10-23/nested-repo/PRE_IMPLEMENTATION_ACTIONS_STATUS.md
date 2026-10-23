# 8 Pre-Implementation Actions — Status (Round 1)

## Effective Build

`77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)

## Status Summary

| #            | Action                                           | Status                                                                                                                                                                                                                                                                                                                                     | Notes                                                                                                                            |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **#1**       | Build attachment verified                        | ✅ **COMPLETE**                                                                                                                                                                                                                                                                                                                            | Build 77bb9ed5 confirmed on Git; referenced in STATUS.md, NEW_GIT_WORKFLOW.md, FINAL_CONSOLIDATION.md. No further action needed. |
| **#2**       | Contract conflicts resolved                      | ✅ **COMPLETE**                                                                                                                                                                                                                                                                                                                            | Rulings B1-B4 in AGENTS.md; contract conflicts resolved per GOVERNANCE_CHANGE_PROPOSAL.md. No further action needed.             |
| **#3**       | Declare authoritative dataset format             | ⏳ **PENDING** — See AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md on Git. S-203 format (`tests/2025_standards.js`) declared authoritative for Round 1; S-502 format superseded. Claude must formally declare this in his next session or the declaration stands as published.                                                               |
| **#4**       | Confirm adoption of CONTRACT B1/B2               | ✅ **COMPLETE** — See CONTRACT_B1_B2_ADOPTION_CONFIRMED.md on Git. B1 (runtime DOMAccessError guard) and B2 (exit code matrix 0/1/2/3/4) both adopted 2026-10-19. No further action needed.                                                                                                                                                |
| **#5**       | Authorize baseline bootstrap                     | ⏳ **PENDING** — Critical path item. Run: `node tests/pw4.js --write-baseline against build 77bb9ed5`. This creates `tests/baseline.json` with authority. Record resulting sha256 in STATUS.md. Until frozen, ALL pw4 runs report UNGATED (no regression gate claims). **Blocker for:** S-202 certification and Round 1A dispatch.         |
| **#6**       | Do NOT close liveness items without verification | ✅ **VERIFIED** — See INTEGRATION_AUDIT_LIGHTNING.md on Git. 6 liveness items verified present on 77bb9ed5: "sudden death", "second meeting" banner, "wasn't in this round", footer "More", Guide intro, flex fit-check text. Audit corrected risk #5 from MEDIUM to LOW. Do not close without code-level verification per audit findings. |
| **#7**       | Enforce Round 1A dependency order                | ✅ **DOCUMENTED** — See NEW_WORKFLOW_ROUND1.md on Git. Dependency chain: S-202 → S-203 → S-103 → S-102 → S-301. S-202 (SIM-CORE markers) is the foundation; must be certified before any other 1A items.                                                                                                                                   |
| **#7 (dup)** | U-04 footer "MORE" remains active                | ✅ **VERIFIED** — See INTEGRATION_AUDIT_LIGHTNING.md on Git. Footer "MORE" active on build 77bb9ed5. Audit confirmed this; do not remove without code change.                                                                                                                                                                              |

## Critical Path

```
77bb9ed5 → baseline bootstrap (Item #5) → S-202 certification (Item #7) → 1A certification → 1B dispatch
```

**Without baseline bootstrap** (Item #5): `pw4.js` exits UNGATED and no statistical claims can be made.  
**Without S-202 markers** (Item #7): `pw4.js` and `run_all.sh` can't extract the core.  
**Round 1 cannot be dispatched** until both #5 and #7 are complete.

## Per-Action Details

### #1 — Build Attachment Verified ✅

- Build `77bb9ed5` (650,127 bytes) SHA-256 verified
- Referenced in: STATUS.md, NEW_GIT_WORKFLOW.md, FINAL_CONSOLIDATION.md
- **Status:** Complete — no further action needed

### #2 — Contract Conflicts Resolved ✅

- Rulings B1-B4 in AGENTS.md resolve contract conflicts
- Referenced in: GOVERNANCE_CHANGE_PROPOSAL.md, AGENTS.md
- **Status:** Complete — no further action needed

### #3 — Authoritative Dataset Format ⏳ PENDING

- S-203 format (`tests/2025_standards.js`) declared authoritative in AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md
- S-502 format (`tests/season_2025.json`) superseded for Round 1
- **Action needed:** Claude formally declares acceptance or new declaration in next session
- **Status:** Pending Claude's declaration — stands as published unless challenged

### #4 — CONTRACT B1/B2 Adopted ✅

- B1: Runtime DOMAccessError guard (enables baseline bootstrap)
- B2: Exit code matrix 0/1/2/3/4 (replaces vague UNGATED status)
- Referenced in: CONTRACT_B1_B2_ADOPTION_CONFIRMED.md, INTEGRATION_AUDIT_LIGHTNING.md, AGENTS.md
- **Status:** Complete — no further action needed

### #5 — Baseline Bootstrap ⏳ CRITICAL PATH

- **Command:** `node tests/pw4.js --write-baseline against build 77bb9ed5`
- **Result:** Creates `tests/baseline.json` with authority
- **Action:** Record resulting sha256 in STATUS.md
- **Dependency:** Required before S-202 certification and Round 1A dispatch
- **Status:** Pending — critical path blocker

### #6 — Liveness Items Verified ✅

- 6 items verified present on 77bb9ed5 per INTEGRATION_AUDIT_LIGHTNING.md:
  1. "sudden death"
  2. "second meeting" banner
  3. "wasn't in this round"
  4. footer "More"
  5. Guide intro
  6. flex fit-check text
- Audit corrected risk #5 from MEDIUM to LOW
- **Action:** Do not close without code-level verification
- **Status:** Verified — do not close without code change

### #7 — Round 1A Dependency Order ✅ DOCUMENTED

- Dependency chain: S-202 → S-203 → S-103 → S-102 → S-301
- S-202 (SIM-CORE markers) is the foundation; must be certified before other 1A items
- Referenced in: NEW_WORKFLOW_ROUND1.md, S-202_SIM-CORE_MARKERS_GUIDE.md
- **Status:** Documented — S-202 must be certified first

### #7 (dup) — U-04 Footer "MORE" Active ✅ VERIFIED

- Footer "MORE" active on build 77bb9ed5 per INTEGRATION_AUDIT_LIGHTNING.md
- **Action:** Do not remove without code change
- **Status:** Verified

## Workflow Integration

### How These Actions Feed the Workflow

1. **#5 Baseline Bootstrap** → Enables regression gates → makes #7 S-202 certification meaningful
2. **#7 S-202 Certification** → Enables pw4.js and run_all.sh to extract core → enables statistical claims
3. **#3 Dataset Format** → Ensures validate.js gates use correct dataset → prevents format conflicts
4. **#4 CONTRACT B1/B2** → Provides meaningful exit codes and DOM guard → enables reliable pw4.js runs
5. **#6 Liveness Items** → Ensures UI consistency → no unexpected user-visible changes
6. **#1 and #2** → Foundation — already complete, enable the above actions

### Round 1A Dispatch Requirements

All of the following must be true before Round 1A can be dispatched:
- [ ] #5 Baseline bootstrap complete (tests/baseline.json created, sha256 in STATUS.md)
- [ ] #7 S-202 SIM-CORE markers inserted and certified (markers present, 3 functions moved)
- [ ] #3 Dataset format declared (S-203 authoritative; S-502 superseded)
- [ ] #4 CONTRACT B1/B2 adopted (DOMAccessError guard + exit code matrix)
- [ ] #6 Liveness items verified (no items closed without verification)
- [ ] #1 and #2 already complete (build attachment + contract conflicts resolved)

### On Git

All 8 action statuses and details are published on Git for Claude to read directly:

| Document                                      | Purpose                                               |
| --------------------------------------------- | ----------------------------------------------------- |
| `PRE_IMPLEMENTATION_ACTIONS_STATUS.md`        | This consolidated status table                        |
| `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` | Item #3 — dataset format declaration                  |
| `CONTRACT_B1_B2_ADOPTION_CONFIRMED.md`        | Item #4 — contract adoption                           |
| `INTEGRATION_AUDIT_LIGHTNING.md`              | Items #5 (baseline), #6 (liveness), audit findings    |
| `NEW_WORKFLOW_ROUND1.md`                      | Item #7 — Round 1A dependency chain                   |
| `S-202_SIM-CORE_MARKERS_GUIDE.md`             | Item #7 details — SIM-CORE markers and function moves |
| `NEW_GIT_WORKFLOW.md`                         | Workflow — Claude can read from Git                   |
| `STATUS.md`                                   | Build hash 77bb9ed5; action statuses recorded         |

### How Claude Can Use This

In his next session, Claude can:
1. **Read PRE_IMPLEMENTATION_ACTIONS_STATUS.md** from Git to see the full status of all 8 actions
2. **Read the individual documents** for each pending action (#3, #5)
3. **Declare acceptance or provide new instructions** for pending items
4. **Proceed with critical path items** (#5 baseline bootstrap, then #7 S-202 certification)
5. **Report status updates** back to SUBMISSIONS.md (per the consensus block format from CONSENSUS_BLOCK_FORMAT.md)

---

_Status as of 2026-10-19. All documents on Git are readable by Claude directly (no user paste required for most). The 3 governance-mandated user paste actions still apply: record decisions in SUBMISSIONS.md, file verification report, read new submissions not yet pushed to Git._
