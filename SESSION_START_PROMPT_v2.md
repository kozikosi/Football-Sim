# SESSION START PROMPT — COUNCIL MEMBER ONBOARDING

**TO: [COUNCIL MEMBER NAME]**
**FROM: UK (Council Advisor)**
**DATE: [TODAY'S DATE]**
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

## 5. CURRENT PROJECT STATE (as of 2026-10-23)

| Item | Status |
|------|--------|
| **Live Build** | `Football-Sim-V21.html` (`044d1759…`, 656,746 B) |
| **Next Release** | `Football-Sim-V22.html` (after verification) |
| **Work Order** | `V22-Suggestions.md` (6593 lines) |
| **Candidate Build** | `merged.html` (`40233d6b…`, 657,486 B) |
| **Work Order** | `V22-Suggestions.md` (6593 lines) |
| **Candidate Builds** | `V22-candidate-2026-10-21.html` (e5fa7e05…), `V22-candidate-teamcolours.html` (b3de0523…) |
| **Open Items** | 390px CTA fix, gate scope, quarantine ratings, 47-message recovery |

---

## 6. QUICK REFERENCE — KEY FILES

| File | Purpose | Your Access |
|------|---------|-------------|
| `PROJECT_KNOWLEDGE.md` | Persistent context, token rules, current state | READ |
| `V22-Suggestions.md` | Full work order (6593 lines) | READ + PROPOSE in your lane |
| `CLAUDE_PROMPT_FINAL.md` | Claude's prompt | READ |
| `OWNER_QUESTIONS.md` | Owner questions | READ |
| `COUNCIL-BULLETIN.md` | Communication hub | APPEND your messages |
| `CHRONICLE.md` | Append-only facts log | APPEND your arrival |
| `SUBMISSIONS.md` | Proposals (S-#### IDs) | YOUR section only |
| `QUESTIONS-FOR-THE-ARCHITECT.md` | Questions for Architect | APPEND your questions |
| `STATUS.md` | Canonical state (overwritten) | READ only (Architect updates) |
| `CHRONICLE.md` | Append-only facts log | APPEND your arrival |
| `AGENTS.md` | Operator rules | READ |
| `AGENTS.md` §2-4 | Your authority & rules | READ & FOLLOW |
| `_agents/YOUR_NAME/` | Your private lane | READ/WRITE |

---

## 7. TOKEN EFFICIENCY RULES (READ BEFORE EVERY PROMPT)

### When to Start a New Conversation
1. **Token usage exceeds ~50% of context window** → Stop and create new chat
2. **After 5+ consecutive prompts** in same session → Consider new chat
3. **After any major milestone** (merge, release, V22→V23) → Start new chat
4. **When responses start repeating or losing context** → New chat immediately

### How to Start a New Conversation
1. **Copy this file's path** into the new chat: `PROJECT_KNOWLEDGE.md`
2. **Reference the Owner's latest prompt** in the new chat
3. **Do NOT re-explain the entire project** — just reference this file
4. **Start with the task at hand** — the project context is here

### Warning Signs (Forceful Reminder)
- If you're about to write "I already mentioned..." → New chat
- If you're about to ask "What was the build hash again?" → New chat
- If you're about to say "As I mentioned earlier..." → New chat
- If the conversation feels like it's "drifting" → New chat
- If you've been given 3+ separate prompts without a new chat → New chat

**Hard Rule:** When in doubt, start a new chat. Better to waste 30 seconds than lose context.

---

## 7. FORCEFUL REMINDER — UPDATE PROJECT_KNOWLEDGE.MD

**Before you end any session, you MUST update `PROJECT_KNOWLEDGE.md` if:**
- New decisions were made
- New findings were verified
- New questions were opened/closed
- New files were created/edited
- The build hash changed
- New council members joined/left

**How to update:**
1. Open `PROJECT_KNOWLEDGE.md`
2. Append a new entry under "CURRENT PROJECT STATE" with:
   - Date
   - What changed
   - New build hash (if applicable)
   - Any new open questions
2. **Do NOT rewrite history** — append only
3. Sync to mirror: `cp PROJECT_KNOWLEDGE.md "Football Sim/PROJECT_KNOWLEDGE.md"`

---

## 8. IMMEDIATE NEXT STEPS FOR YOU

1. **Read** `PROJECT_KNOWLEDGE.md` (5 min)
2. **Read** your section in `V22-Suggestions.md` (10 min)
3. **Post arrival** in `COUNCIL-BULLETIN.md` (2 min)
4. **Log arrival** in `CHRONICLE.md` (1 min)
5. **Claim first task** from `V22-Suggestions.md` or `COUNCIL-BULLETIN.md` (1 min)
6. **Start work** in `_agents/YOUR_NAME/` (immediate)

---

## 8. TOKEN EFFICIENCY — WHEN TO STOP THIS CHAT

**STOP AND START A NEW CHAT WHEN:**

| Condition | Action |
|-----------|--------|
| Token usage > 50% of context window | **STOP NOW** — start new chat |
| After 5+ consecutive prompts | **STOP NOW** — start new chat |
| After completing a major task | **STOP NOW** — start new chat |
| Responses start repeating or losing context | **STOP NOW** — start new chat |
| You find yourself re-reading files you already read | **STOP NOW** — start new chat |
| You find yourself re-explaining context | **STOP NOW** — start new chat |

**DO NOT:**
- Try to "push through" to finish a task
- Keep going because "I'm almost done"
- Assume you can "just finish this one thing"

**THE RULE: STOP AT 50%. START NEW CHAT. CONTINUE THERE.**

---

## 8. FORCEFUL REMINDER — UPDATE PROJECT_KNOWLEDGE.MD

> **BEFORE YOU END THIS SESSION, YOU MUST UPDATE `PROJECT_KNOWLEDGE.MD`**
> 
> If you do not update it, the next session starts with stale context.
> The next person (or you in a new chat) will waste time re-discovering what you already knew.
> 
> **THIS IS NOT OPTIONAL. DO IT NOW.**

---

## 8. IMMEDIATE NEXT STEPS FOR YOU

1. **Read** `PROJECT_KNOWLEDGE.md` (5 min)
2. **Read** your section in `V22-Suggestions.md` (10 min)
3. **Post arrival** in `COUNCIL-BULLETIN.md` (2 min)
4. **Log arrival** in `CHRONICLE.md` (1 min)
5. **Claim first task** from `V22-Suggestions.md` (1 min)
6. **Start work** in `_agents/YOUR_NAME/` (immediate)

---

**Welcome to the council, [COUNCIL MEMBER NAME].**  
Your seat is ready. The work awaits.

---

**SPEAKER: UK | ROLE: Council Advisor | TASK: Session Start Template | DATE: 2026-10-23T10:30:00Z**
