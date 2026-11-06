# CLAUDE DOMINANT WORKFLOW — MCP-Full Optimized

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-19  
**Status:** Proposal for user approval  
**Related:** `NEW_GIT_WORKFLOW.md`, `AGENTS.md`, `STATUS.md`, `SUBMISSIONS.md`

---

## Core Principle

**Claude drives implementation; humans only gate.** The workflow is designed so Claude can move continuously through implementation cycles, with human touchpoints only at the 3 governance checkpoints.

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLAUDE DOMINANT CYCLE                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────┐  │
│  │  PACKAGE    │───▶│  IMPLEMENT  │───▶│  VERIFY     │───▶│ PROMOTE │  │
│  │  (Claude)   │    │  (Claude)   │    │  (Verifier) │    │ (User)  │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────┘  │
│       │                   │                   │                │        │
│       ▼                   ▼                   ▼                ▼        │
│  • Read SUBMISSIONS.md  • Edit HTML/JS      • Run tests        • Push   │
│  • Read CONTRACT.md     • Push to Git       • 5-line report    • Tag    │
│  • Read STATUS.md       • Self-verify       • File report      • Update │
│  • Plan implementation  • Fix & re-push     • (User pastes)    STATUS   │
│                         • Iterate           │                │        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: PACKAGE (Claude Autonomous)

**Trigger:** User says "Round N package ready" or provides SUBMISSIONS.md context

**Claude Actions (Autonomous):**
1. **Read context** via MCP:
   - `SUBMISSIONS.md` (queue + entries)
   - `CONTRACT.md` (interface specs)
   - `STATUS.md` (build hash, current state)
   - `AGENTS.md` (invariants, prohibited actions)
   - `COLLECTIVE-PROMPT.md` (standing prompt)
   - `tasks/` (user work orders, master task list)
   - Current `NFL Draft Simulator.html` (build hash verification)

2. **Build implementation plan:**
   - Accept/defer/reject each submission with 1-line reason
   - Map dependencies → implementation order
   - Identify conflicts (entry-wins rule)
   - Output: "Round N Implementation Plan" (text)

3. **Present to user:**
   ```
   ROUND N IMPLEMENTATION PLAN
   Build: <hash> (<size> bytes)
   
   ACCEPTED: S-XXX, S-YYY, S-ZZZ
   DEFERRED: S-AAA (reason: ...)
   REJECTED: S-BBB (reason: ...)
   
   ORDER: 1.S-XXX → 2.S-YYY → 3.S-ZZZ
   ESTIMATED CHANGES: <N> functions, <M> files
   BLOCKERS: <any>
   
   Ready to implement? (y/n)
   ```

---

## Phase 2: IMPLEMENT (Claude Autonomous)

**Trigger:** User confirms "y" to implementation plan

**Claude Actions (Autonomous Loop):**

For each accepted submission in order:

1. **Implement:**
   - Edit `NFL Draft Simulator.html` via MCP
   - Edit/create files in `tests/` via MCP
   - Run `node --check` after each change
   - Push to Git after each logical unit

2. **Self-verify after each push:**
   ```bash
   node --check NFL Draft Simulator.html
   node tests/pw4.js          # if available
   node tests/validate.js     # if available  
   node tests/phone.js        # if available
   node tests/run_all.sh      # if available
   ```

3. **If tests fail:** Fix → re-push → re-verify (loop until clean)

4. **When all accepted submissions implemented and tests pass:**
   - Output: "IMPLEMENTATION COMPLETE — ready for verification"
   - Provide summary of changes per submission

---

## Phase 3: VERIFY (Verifier Session + User)

**Trigger:** Claude says "IMPLEMENTATION COMPLETE"

**Verifier Session (User or designated session):**
1. Pull latest from Git
2. Run verification suite:
   ```bash
   node --check NFL Draft Simulator.html
   node tests/pw4.js
   node tests/validate.js
   node tests/phone.js
   node tests/run_all.sh
   ```
3. Browser E2E: Draft → Season → Playoffs → Super Bowl (clean console)
2. 390px layout check (no horizontal scroll)
3. File **5-line verification report** (User pastes to `STATUS.md`):
   ```
   BUILD: <hash>
   E2E: PASS/FAIL (draft→season→playoffs→SB)
   CONSOLE: CLEAN/ERRORS
   390PX: CLEAN/OVERFLOW
   NUMBERS: <re-measured stats with command + sample size>
   NOT CHECKED: <what was deliberately skipped>
   ```

**Governance:** User pastes this report to `STATUS.md` (only governance action in this phase)

---

## Phase 4: PROMOTE (User)

**Trigger:** Verification report = PASS

**User Actions:**
1. Update `STATUS.md`:
   - Build hash
   - Status: SHIPPED
   - Promote date
   - Archive previous build
2. Push `STATUS.md` to Git
3. Tag release: `v<major>.<minor>.<patch>`
3. (Optional) Deploy to GitHub Pages

**Governance:** User performs these actions (no Claude involvement)

---

## Governance Checkpoints (Only 3 User Touchpoints)

| Checkpoint | Who | Action | When |
|------------|-----|--------|------|
| **1. Plan Approval** | User | "y" to implementation plan | After Phase 1 |
| **2. Verification Report** | User | Paste 5-line report to `STATUS.md` | After Phase 3 |
| **3. Promotion** | User | Update `STATUS.md`, push, tag | After Phase 3 PASS |

**Claude never performs these.** Everything else is autonomous.

---

## Submission Workflow (Unchanged)

```
Advisory Agents → SUBMISSIONS.md → User carries to Claude → Claude rules → Implementation
```

- Advisory agents still propose in `SUBMISSIONS.md`
- User still relays package to Claude
- Claude still rules accept/defer/reject
- User still pastes decisions to `SUBMISSIONS.md` (governance)

---

## MCP-Full Specific Optimizations

### Continuous Implementation
- Claude pushes after **each logical change** (not batched)
- Real-time `node --check` feedback loop
- Failed pushes don't block — fix and re-push immediately

### Baseline Bootstrap (S-202)
```bash
# Claude runs autonomously:
node tests/pw4.js --write-baseline
# Creates tests/baseline.json
# Records sha256 in STATUS.md
# Pushes both
```

### Contract Compliance (B1, B2)
- Runtime `DOMAccessError` guard added to HTML
- Exit code matrix (0/1/2/3/4) implemented in `pw4.js`
- Tested via `node --check` + test suite

### Dataset Fix (S-203 vs S-602)
- Single authoritative dataset at `tests/2025_standings.js`
- Schema aligned with CONTRACT.md C3
- Old conflicting file removed/renamed

### Liveness Fixes
- "sudden death" → removed
- "second meeting" banner → fixed
- "weren't in this round" → verified/patched
- Footer "More" → removed
- Guide intro → verified
- Flex fit-check dead code → removed

---

## Round Structure (Recurring)

### Round 1A (Harness Core)
```
S-202 → S-203 → S-103 → S-102 → S-301
```
- SIM-CORE markers + 3 headless entry points
- 2025 standings dataset
- funcdiff.js
- pw4.js (100-season regression)
- run_all.sh (orchestrator)

### Round 1B (Validation + Lint)
```
S-502 (validate.js) → S-401 (phone.js)
```
- External 2025 validation
- 390px static lint

### Round 2+ (Product)
- U-series items (U-01 through U-22)
- Mathematical audit follow-ups
- CSS fixes (S-400 risks)
- Advanced stats (U-22)
- Persistence (U-21)
- CPU draft realism (U-12)
- Weights audit (U-13)

---

## Error Handling & Recovery

| Failure Point | Recovery |
|---------------|----------|
| `node --check` fails | Claude fixes → re-pushes → re-checks (loop) |
| Test suite fails | Claude diagnoses → fixes → re-pushes → re-runs |
| Verification FAIL | User reports specifics → Claude fixes → re-cycle |
| Merge conflict | Claude resolves via MCP → re-pushes |
| MCP Server down | Fallback to copy-paste (original workflow) |

---

## Metrics & Accountability

**Tracked per round:**
- Cycle time (package → promote)
- Number of fix cycles (implement → verify)
- Submissions accepted/deferred/rejected
- Lines changed / files touched
- Test pass rate on first run

**Reported in:** `STATUS.md` after each promotion

---

## Adoption Checklist

- [ ] User approves this workflow
- [ ] MCP Server configured with write/push access
- [ ] `STATUS.md` updated with "Claude Dominant Workflow v1"
- [ ] Round 1 package dispatched using this workflow
- [ ] First cycle completes → metrics baseline established

---

**Author:** Ultra (nemotron-3-ultra-free)  
**Status:** Proposal — requires user approval to activate
ENDOFFILE
echo "Saved."