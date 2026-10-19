# Claude's Next Session Quickstart

## 📋 Purpose
One-page guide for Claude's next session. Everything you need to know in one place — read from Git, output using consensus block format, handle the 3 governance actions.

## ✅ What Claude Can Read Directly From Git (No Paste Required)

| Document | What You'll Find |
|----------|-----------------|
| `STATUS.md` | Build hash (77bb9ed5), roles, pending submissions, current state |
| `SUBMISSIONS.md` | Proposals queue with entries by ID, status, build references |
| `NEW_GIT_WORKFLOW.md` | Direct Git access workflow — what Claude can/cannot read |
| `INTEGRATION_AUDIT_LIGHTNING.md` | Corrected audit findings (15 sections); risk #5 downgraded to LOW |
| `NEW_WORKFLOW_ROUND1.md` | Round 1 adjudication chain: S-202 → S-203 → S-103 → S-102 → S-301 |
| `ULTRA_PROMPT.md` | Ultra prompt with v20/canonical analysis; 6 suggestion topics |
| `QUESTION_FOR_CLAUDE.md` | 3 YES/NO capability questions (all NO for user-paste actions) |
| `GOVERNANCE_CHANGE_PROPOSAL.md` | Git-direct workflow assessment; 3 optional governance changes |
| `CONSENSUS_BLOCK_FORMAT.md` | **One-block submission format** — Decision/Reason lines map to SUBMISSIONS.md |
| `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` | S-203 format authoritative for Round 1; S-502 superseded |
| `S-202_SIM-CORE_MARKERS_GUIDE.md` | SIM-CORE markers and 3 function moves (foundation for everything) |
| `CONTRACT_B1_B2_ADOPTION_CONFIRMED.md` | B1 (DOMAccessError guard) and B2 (exit code matrix 0/1/2/3/4) adopted |
| `PRE_IMPLEMENTATION_ACTIONS_STATUS.md` | All 8 pre-implementation actions status; critical path identified |
| `OTHERCHAMBERS_AI_CRITIQUES.md` | External AI code critiques and bug fixes |
| `LIGHTNING_SUBMISSION.md` | S-900 integration audit submission |
| `NFL Draft Simulator.html` | The 650,127-byte authoritative build |

## ⚠️ 3 Actions Requiring User Paste (Governance-Mandated)

**These cannot be automated — you must handle them:**

1. **Record Claude's decisions in SUBMISSIONS.md** — After Claude's response, paste his accept/defer/reject decisions verbatim into each agent's Implementer's note area (above their end-anchor). The consensus block format Decision/Reason lines map directly here.

2. **File the verification five-line report** — After verification, file a report with: `Hash · E2E driven · numbers re-measured (command + sample size) · console/390px result · what was deliberately not checked`

3. **Read new submissions not yet pushed to Git** — If any agent has submitted content not yet pushed to Git, paste it to Claude before he can read it. Once pushed, Claude can read it directly.

## 🤖 How to Output — Consensus Block Format

**Output ONE block using this format. The user will copy/paste it once.**

```
=== BUILD HASH: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f ===

=== SESSION: GLM ===
Decision: accept S-202 / defer S-301 / reject S-102
Reason: one-line reason (paste verbatim into SUBMISSIONS.md Implementer's note)
Details: any additional notes, function quotes, or references

=== SESSION: DS (Master Doctrine) ===
Decision: approve Patch Notes (DS Flash)
Reason: Risk #5 downgraded to LOW, council liveness verified
Details: delivery-42 committed

=== SESSION: NEMO-SUPER ===
Decision: continue S-502 baseline bootstrap
Reason: rWeights undefined bug — awaiting --write-baseline run
Details: bug tracking

=== SESSION: NEMO-ULTRA ===
Decision: review v20 visual design adoption
Reason: hero unit, stepper, mobile draft board — all green
Details: design notes

=== VERIFICATION REPORT ===
Hash: 77bb9ed5 · E2E: draft→season→playoffs clean · Console: no errors · 390px: no horizontal scroll · [what was deliberately not checked]

=== ADDITIONAL NOTES ===
[Any other notes, build references, etc.]
```

### Decision Line Format

| Claude Decision | What User Pastes into SUBMISSIONS.md |
|----------------|--------------------------------------|
| `accept S-XXX` | → Entry status: **accepted**; implement the change (up to 5-6 this round) |
| `defer S-XXX` | → Entry status: **deferred**; name the condition that revives it |
| `reject S-XXX` | → Entry status: **rejected**; one-line reason recorded; proponent can appeal once with new evidence |

### Where Each Session's Content Goes

| Session | SUBMISSIONS.md Section | Implementer's Note Line |
|---------|----------------------|------------------------|
| GLM | Above GLM's end-anchor | `Implementer's note (user pastes Claude's decision here): —` |
| DS (Master Doctrine) | Above DS's end-anchor | Same line |
| Nemo Super | Above Nemo Super's end-anchor | Same line |
| Nemo Ultra | Above Nemo Ultra's end-anchor | Same line |
| Gemini | Above Gemini's end-anchor | Same line (if applicable) |
| GPT | Above GPT's end-anchor | Same line (if applicable) |

## 📊 Critical Path — What to Address First

**The critical path is: baseline bootstrap → S-202 certification → 1A certification → 1B dispatch**

### If You Address Only One Thing, Make It #1:

**#5 — Baseline Bootstrap** (most critical path item)

```
Command: node tests/pw4.js --write-baseline against build 77bb9ed5
This creates: tests/baseline.json with authority
Then: Record the resulting sha256 in STATUS.md
Until frozen: ALL pw4 runs report UNGATED (no regression gate claims)
```

**Why this matters:** Without baseline bootstrap, no statistical claims can be made. This is the entry point for the entire critical path.

### If You Have Time for More:

**#7 — S-202 SIM-CORE Markers**

- Insert `/*SIM-CORE-START*/ ... /*SIM-CORE-END*/` markers in NFL Draft Simulator.html
- Move 3 functions into core: `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`
- These are behavior-preserving moves of already-DOM-free code
- Without S-202, pw4.js and run_all.sh can't extract the core

**#3 — Authoritative Dataset Format**

- S-203 format (`tests/2025_standards.js`) is authoritative for Round 1
- S-502 format (`tests/season_2025.json`) is superseded
- S-203 team names must match TEAM_DATA keys exactly (32 teams, 17 games)

## 📝 Session Workflow — Step by Step

### Step 1: Read from Git (No Paste Required)
```
Read these documents from GitHub:
  • STATUS.md (build hash, roles)
  • NEW_GIT_WORKFLOW.md (workflow overview)
  • INTEGRATION_AUDIT_LIGHTNING.md (audit findings)
  • PRE_IMPLEMENTATION_ACTIONS_STATUS.md (8 actions status)
  • CONSENSUS_BLOCK_FORMAT.md (output format)
```

### Step 2: Output Using Consensus Block Format
```
Output ONE block with:
  • Build hash
  • Session decisions (Decision + Reason lines)
  • Verification report (5-line format or note if not run yet)
  • Additional notes
```

### Step 3: User Copies One Block
```
User copies the entire block from your response
User pastes into SUBMISSIONS.md above each agent's end-anchor
For each session: user pastes Decision + Reason into Implementer's note area
```

### Step 4: User Updates STATUS.md (One Line)
```
If build hash changed: update the BUILD <sha256> line in STATUS.md
```

### Step 5: Verification Report
```
User files five-line verification report (or notes if not yet run)
```

### Step 6: Promotion (If Verified)
```
Move old build to _archive/
Record round row in _archive/BUILD-LOG.md
Bump hash in STATUS.md
```

## ❓ Quick Reference — YES/NO Answers

Claude's 3 capability questions (from QUESTION_FOR_CLAUDE.md):

1. **Can I record my own decisions in SUBMISSIONS.md?** → **NO** — user must paste them
2. **Can I file the verification five-line report?** → **NO** — verifier session files this
3. **Can I read new submissions not yet pushed to Git?** → **NO** — must be pushed first

**Optional 4th question answer:**
- **Would the consensus block format (one block, session headers) be viable for future rounds?** → Yes — user copies one block and distributes sections to each agent's area in SUBMISSIONS.md

## 📞 On Git — How to Access

All documents are at: `https://github.com/kozikosi/Football-Sim/tree/main/`

Or in this repo checkout: `/Users/kosi/Desktop/Football Sim/Football Sim/`

Claude can browse GitHub or read files directly. No user paste required for any document listed in the "✅ What Claude Can Read Directly From Git" section above.

---

## 🎯 Before You Start Claude's Session:

1. ✅ Ensure new content is pushed to Git (if any)
2. ✅ Update STATUS.md hash after last verification (if changed)
3. ✅ Open this quickstart — you're ready

## 🚀 When Claude Responds:

1. **Read his output** — he should use the consensus block format
2. **Copy the entire block** (one paste only)
3. **Paste into SUBMISSIONS.md** — each session's Decision/Reason into Implementer's note areas
4. **Update STATUS.md hash** if changed (one line)
5. **File verification report** after running any checks
6. **Push any new content to Git** for the next session

---

**That's it — you're ready for Claude's next session. Everything he needs is on Git, and the consensus block format means you only copy/paste once.**

*If anything is unclear or you hit an issue, the 3 governance-mandated user paste actions are:*
- Record Claude's decisions in SUBMISSIONS.md
- File the verification five-line report  
- Read new submissions not yet pushed to Git