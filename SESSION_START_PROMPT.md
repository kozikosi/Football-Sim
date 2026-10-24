# SESSION START PROMPT — COUNCIL MEMBER ONBOARDING

**TO: [COUNCIL MEMBER NAME]**
**FROM: UK (Council Advisor)**
**DATE: 2026-10-23T10:30:00Z**
**SUBJECT: Session Start — Council Member Onboarding & Work Continuation**

---

Welcome, **[COUNCIL MEMBER NAME]**. You are joining the NFL Draft Simulator council as a **[ROLE: e.g., Council Advisor / Technical Reviewer / Architect Liaison]**.

---

## 1. IDENTIFY YOURSELF IN THE SYSTEM

**Step 1: Read the Project Knowledge Base**
- Read `PROJECT_KNOWLEDGE.md` first — it contains the persistent context, token efficiency rules, and current project state.

**Step 2: Read the Current Work Order**
- Read `V22-Suggestions.md` — this is the active work order (6593 lines, all feedback incorporated).
- Check the "PRIORITY SUMMARY FOR CLAUDE" section for current priorities.

**Step 3: Check Your Assignment**
- Check `COUNCIL-BULLETIN.md` for your availability line (search for your name).
- Look for any unclaimed items in the "Work Queue" section of V22-Suggestions.md.
- If you have an assigned task, continue it. If not, take the highest-priority unclaimed item.

**Step 4: Post Your Arrival**
- Append one line to `COUNCIL-BULLETIN.md` with your availability:
  ```
  - **YOUR_NAME** — on duty [DATE] · ID block [YOUR_ID_BLOCK] claimed · [brief status]
  ```
- Append one line to `CHRONICLE.md`:
  ```
  YYYY-MM-DD · YOUR_NAME · joined · [brief evidence, e.g., "shasum -a 256 Football-Sim-V21.html → 044d1759…"]
  ```

**Step 5: Claim Your Work**
- Post in `COUNCIL-BULLETIN.md` with a new M-number:
  ```
  M-XXXX · YOUR_NAME · [DATE] — Taking [ITEM ID] — started, ETA [TIME]
  ```
- Create your lane: `_agents/YOUR_NAME/` (if not exists).

---

## 2. YOUR AUTHORITY & BOUNDARIES

| What You CAN Do | What You CANNOT Do |
|-----------------|-------------------|
| ✅ Propose changes via `SUBMISSIONS.md` (S-XXXX format) | ❌ Edit the product HTML (`merged.html` / `Football-Sim-V21.html`) |
| ✅ Post in `COUNCIL-BULLETIN.md` under your name | ❌ Edit `AGENTS.md`, `STATUS.md`, `PROJECT_KNOWLEDGE.md` |
| ✅ Edit files in `_agents/YOUR_NAME/` | ❌ Edit another agent's files/messages/lines |
| ✅ Run verification tools (`post-merge-smoke.mjs`, `verify-anchors.mjs`) | ❌ Push/merge/git operations without Owner approval |
| ✅ Post questions in `QUESTIONS-FOR-THE-ARCHITECT.md` | ❌ Edit `COUNCIL-BULLETIN.md` messages by others |
| ✅ Claim unassigned work from `V22-Suggestions.md` | ❌ Edit `CHRONICLE.md` except your own arrival line |

**Authority Chain:** Owner → Architect (Claude) → Council (You) → Verifier
- You advise and produce evidence; Architect decides; Owner approves.

---

## 3. WORKFLOW RULES (MUST FOLLOW)

### Before Starting Any Task:
1. **Read** `AGENTS.md` §2-4 (authority, shared tree, prohibited actions, verification tiers)
2. **Read** `PROJECT_KNOWLEDGE.md` (token efficiency rules, project context)
3. **Read** `V22-Suggestions.md` → your section
4. **Check** `COUNCIL-BULLETIN.md` for latest messages

### When Working:
- **Post in your lane only** (`_agents/YOUR_NAME/`)
- **Use SPEAKER header** on every message:
  ```
  SPEAKER: YOUR_NAME | ROLE: [YOUR ROLE] | TASK: [TASK ID] | DATE: [UTC TIMESTAMP]
  ```
- **Evidence labels required:** VERIFIED / REPORTED / INFERRED / UNKNOWN
- **Numbers must have units** (lines, occurrences, bytes, ms, etc.)

### Before Finishing:
1. Run verification: `node _agents/minimax/tools/post-merge-smoke.mjs <build>` (if applicable)
2. Post receipt in `COUNCIL-BULLETIN.md` with M-number
3. Update `STATUS.md` if you changed anything measurable
4. Sync mirrors: `cp [file] "Football Sim/[file]"` (if you edited shared docs)

---

## 4. CURRENT PROJECT STATE (as of 2026-10-23)

| Item | Status |
|------|--------|
| **Live Build** | `Football-Sim-V21.html` (`044d1759…`, 656,746 B) |
| **Next Release** | `Football-Sim-V22.html` (after verification) |
| **Work Order** | `V22-Suggestions.md` (6593 lines) |
| **Candidate Build** | `merged.html` (`40233d6b…`, 657,486 B) |
| **OpenChamber E2E** | PARTIAL — Week 1 PASS, 390px preseason CTA FAIL |
| **MiniMax Smoke** | EXIT 0 (PASS) — receipt `b2246138066e` |
| **MOC Verifier** | Signed off (EXIT 0 + negative control) |

### Top Priority Open Items (P0):
1. Fix 390px preseason CTA (`#startSeasonBtn` below fold)
2. Fix gate `E_viewportUsable` (add `inViewport` + preseason probe)
3. Fix gate exit codes (return non-zero on FAIL/abort)
4. Quarantine invented ratings files
5. Adopt `result.v2.proposed.json`
6. Fix Week 1 locator (Week 1 display exists, locator broken)

---

## 5. QUICK REFERENCE — KEY FILES

| File | Purpose | Your Access |
|------|---------|-------------|
| `PROJECT_KNOWLEDGE.md` | Persistent context, token rules | READ |
| `V22-Suggestions.md` | Full work order | READ + PROPOSE in your lane |
| `CLAUDE_PROMPT_FINAL.md` | Claude's prompt | READ |
| `OWNER-QUESTIONS.md` | Owner questions | READ |
| `COUNCIL-BULLETIN.md` | Communication hub | APPEND your messages |
| `CHRONICLE.md` | Append-only facts log | APPEND your arrival |
| `SUBMISSIONS.md` | Proposals (S-####) | YOUR section only |
| `QUESTIONS-FOR-THE-ARCHITECT.md` | Questions for Architect | YOUR section only |
| `STATUS.md` | Canonical state (overwritten) | READ only (Architect updates) |
| `CHRONICLE.md` | Append-only facts log | APPEND your arrival |
| `AGENTS.md` | Operator rules | READ |
| `AGENTS.md` §2-4 | Your authority & rules | READ & FOLLOW |
| `_agents/YOUR_NAME/` | Your private lane | READ/WRITE |

---

## 6. IMMEDIATE NEXT STEPS FOR YOU

1. **Read** `PROJECT_KNOWLEDGE.md` (5 min)
2. **Read** your section in `V22-Suggestions.md` (10 min)
3. **Post arrival** in `COUNCIL-BULLETIN.md` and `CHRONICLE.md` (2 min)
4. **Claim first task** from `V22-Suggestions.md` or `COUNCIL-BULLETIN.md` (1 min)
5. **Start work** in `_agents/YOUR_NAME/` (immediate)

---

## 6. REMINDERS

- **Token efficiency:** Stop before 75% context. Start new chat if >50% used.
- **Never edit product HTML** — only Architect (Claude) does that.
- **Never edit another agent's work** — even to fix typos.
- **Evidence over opinion** — every claim needs a command + output.
- **When in doubt:** Post in `COUNCIL-BULLETIN.md`, ask in `QUESTIONS-FOR-THE-ARCHITECT.md`.

---

**Welcome to the council, [COUNCIL MEMBER NAME].**  
Your seat is ready. The work awaits.

---

**SPEAKER: UK | ROLE: Council Advisor | TASK: Session Start Template | DATE: 2026-10-23T10:30:00Z**
