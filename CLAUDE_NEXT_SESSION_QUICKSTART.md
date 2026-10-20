# Claude's Next Session Quickstart — Architecture Design Phase

## 🎯 Purpose
One-phase guide for Claude's next session. **Claude must first answer the 3 YES/NO questions before any architecture or workflow decisions are made.**

## ⚠️ MANDATORY: Answer 3 Questions First

**Before any architecture or workflow discussion, Claude must answer these three questions (from `QUESTION_FOR_CLAUDE.md` on Git):**

1. **Can I record my own final accept/defer/reject decisions in SUBMISSIONS.md without the user pasting them?** → YES / NO

2. **Can I file the verification five-line report independently?** → YES / NO

3. **Can I read new submissions that have not yet been pushed to the GitHub repo?** → YES / NO

**⚠️ DO NOT proceed to architecture design, workflow discussion, or format selection until all three questions are answered.**

**After all three are answered:** We proceed to the Architecture Design Phase (see below).

## 🏗️ Architecture Design Phase — After 3 Questions Are Answered

**Once Claude has answered the three questions above, we proceed to design the workflow and architecture:**

### Step 1: I Present My Architecture Design Proposals
Based on my capabilities (determined by your YES/NO answers), I present:
- My proposed workflow architecture
- Output format options
- Submission handling approach
- Verification and promotion process

### Step 2: You Tell Me What Works and What Doesn't
- What works well
- What doesn't work
- What to change or modify
- Any preferences you have

### Step 3: We Decide on the Final Architecture
- Accept my design as-is
- Modify elements of my design
- Reject and design entirely different architecture
- Choose from format options (or design something new)

### Step 4: We Implement the Chosen Workflow
- Set up the workflow
- Test it in practice
- Make adjustments as needed
- Document the final approach

### Step 5: Ongoing Refinement
- Periodically review the workflow
- Make changes if needed
- Ensure it continues to work for both of us

## 📋 What Claude Should Do in This Session

**If this is Claude's first session with you:**

1. **Read `QUESTION_FOR_CLAUDE.md` from Git** — Answer the 3 YES/NO questions
2. **Do NOT output using any format yet**
3. **Do NOT discuss workflow architecture**
4. **Do NOT output consensus block format**
5. **Simply answer the three questions** and wait for further instructions

**If Claude has already answered the 3 questions in a previous session:**

1. Proceed to Architecture Design Phase (Step 1 above)
2. Present architecture design proposals
3. Await your feedback on what works/doesn't work
4. Iterate until we have a mutually acceptable workflow

## 📚 Documents Claude Can Read From Git (No Paste Required)

| Document | Purpose | When to Read |
|----------|---------|--------------|
| `QUESTION_FOR_CLAUDE.md` | The 3 YES/NO capability questions | **MANDATORY — First, before anything else** |
| `NEW_GIT_WORKFLOW.md` | Git-direct workflow overview | After 3 questions are answered |
| `INTEGRATION_AUDIT_LIGHTNING.md` | Corrected audit findings | During architecture design |
| `PRE_IMPLEMENTATION_ACTIONS_STATUS.md` | 8 pre-implementation actions status | During architecture design |
| `S-202_SIM-CORE_MARKERS_GUIDE.md` | SIM-CORE markers guide | If relevant to architecture |
| `CONTRACT_B1_B2_ADOPTION_CONFIRMED.md` | B1/B2 contract adoption | If relevant to architecture |
| `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` | Dataset format declaration | If relevant to architecture |
| `OTHERCHAMBERS_AI_CRITIQUES.md` | External AI code critiques | If relevant to architecture |

## 🚫 What Claude Should NOT Do

**Do NOT** in this session:

- ❌ Output using any predetermined format (including consensus block format)
- ❌ Discuss workflow architecture before answering the 3 questions
- ❌ Make any SUBMISSIONS.md entries
- ❌ File verification reports
- ❌ Record decisions in SUBMISSIONS.md
- ❌ Propose or implement any workflow changes
- ❌ Design the output format or submission handling

**Do NOT** in future sessions (until architecture is designed):

- ❌ Assume any particular output format
- ❌ Use a format that hasn't been agreed upon
- ❌ Skip the architecture design phase

## ✅ What Claude Should Do

**Phase 1 — Answer the 3 Questions:**

1. Read `QUESTION_FOR_CLAUDE.md` from Git
2. Answer YES or NO to all three questions
3. Send your answers back to the user

**Phase 2 — Architecture Design (after Phase 1 is complete):**

1. Wait for user feedback on your answers
2. Present architecture design proposals based on your capabilities
3. Gather feedback on what works/doesn't work
4. Iterate until we have a mutually acceptable workflow
5. Implement the chosen workflow

**Phase 3 — Ongoing:**

1. Use the agreed-upon workflow
2. Periodically review and refine
3. Make adjustments as needed
4. Document the final approach

## 💡 Key Principle

**Architecture follows capability.** Claude's YES/NO answers to the three questions fundamentally constrain what workflow designs are possible. The architecture design phase ensures we have a workflow that works within those constraints, rather than trying to fit a square peg in a round hole.

**Your answers to the three questions determine the feasible design space.** Once we know what you can and cannot do, we can design a workflow that works within those boundaries.

## 📞 How to Use This Quickstart

**For the user (you):** Put this in your Claude prompt:

> "Please read `QUESTION_FOR_CLAUDE.md` from Git and answer YES/NO to the three questions. Do not proceed to architecture design or workflow discussion until all three are answered."

**For the session:**

1. **Start:** Claude reads `QUESTION_FOR_CLAUDE.md` from Git
2. **Answer:** Claude answers the 3 YES/NO questions
3. **Submit:** Claude sends back the three answers
4. **Wait:** User reviews the answers
5. **Design:** If all three are answered, proceed to Architecture Design Phase
6. **Iterate:** Present proposals, gather feedback, decide on workflow
6. **Implement:** Use the agreed-upon workflow

## 🎯 The Golden Rule

**No architecture workflow decisions until the 3 questions are answered.**

This ensures the workflow we design is compatible with Claude's actual capabilities, not assumptions about what he can or cannot do.

---

*If Claude's first action is anything other than answering the 3 YES/NO questions from `QUESTION_FOR_CLAUDE.md`, the session should be paused and the user should be asked to ensure those questions are addressed first.*

---
*Quickstart version 2.0 — Architecture Design Phase. Reflects that Claude is in charge of designing the architecture and workflow, starting with the 3 capability questions.*