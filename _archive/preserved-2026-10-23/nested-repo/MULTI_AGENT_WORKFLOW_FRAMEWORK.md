# Multi-Agent Workflow Framework for NFL Draft Simulator

## Purpose

Framework for running parallel AI sessions on the NFL Draft Simulator project while respecting the governance rules and Git-direct workflow.

## Core Principles

### 1. Each Agent Owns Their Section

- Per AGENTS.md: "Each agent session writes only inside its own section below"
- No agent edits another's file
- Each agent's section ends with: `Implementer's note (user pastes Claude's decision here): —`

### 2. Git-Direct Access

- All agents can read documents from GitHub directly (no paste required for most)
- 3 governance-mandated user paste actions still apply:
  - Record Claude's decisions in SUBMISSIONS.md
  - File verification five-line report
  - Read new submissions not yet pushed to Git

### 3. Claude Designs the Workflow

- Claude answers 3 YES/NO questions first (QUESTION_FOR_CLAUDE.md)
- Architecture designed after capabilities are known
- Output format determined in architecture design phase

## Agent ID Blocks

| Agent                      | ID Range  | Example Entries     |
| -------------------------- | --------- | ------------------- |
| GLM                        | S-200–299 | S-201, S-202, S-203 |
| DS (Master Doctrine)       | S-100–199 | S-101, S-102, S-103 |
| Nemo Super                 | S-300–399 | S-300, S-301, S-302 |
| Nemo Ultra                 | S-400–499 | S-400, S-401, S-402 |
| GPT                        | S-500–599 | S-501, S-502, S-503 |
| Gemini                     | S-700–799 | S-701, S-702, S-703 |
| (OpenClaw withdrew 19 Oct) | S-600–699 | Reserved            |

## Workflow Phases

### Phase 1: Architecture Design (Claude-Dependent)

1. Claude answers 3 YES/NO questions in QUESTION_FOR_CLAUDE.md
2. Based on answers, we design the workflow/architecture
3. Output format is chosen (consensus block or other)
4. **This phase is Claude-dependent — do not proceed without Claude's answers**

### Phase 2: Submission Filing

1. Agents file submissions to Git (LIGHTNING_SUBMISSION.md)
2. Submissions are readable by Claude directly from Git
3. Claude outputs decisions using the agreed format
4. User copies one block into SUBMISSIONS.md

### Phase 3: Verification & Promotion

1. User verifies the build (read-only)
2. User files five-line verification report
3. User promotes build (archive old, record in BUILD-LOG.md, bump STATUS.md hash)
4. Cycle repeats

## Agent Communication Protocol

### 1. Reading Protocol

- Each agent reads documents from GitHub directly
- No user paste required for: STATUS.md, SUBMISSIONS.md, CONTRACT.md, NEW_WORKFLOW_ROUND1.md, INTEGRATION_AUDIT_LIGHTNING.md, LIGHTNING_SUBMISSION.md, NFL Draft Simulator.html, and all other published docs
- 3 actions requiring user paste are clearly documented

### 2. Submission Filing

1. Agent creates LIGHTNING_SUBMISSION.md
2. Commits and pushes to Git
3. Claude reads it directly from GitHub
4. Claude outputs decisions using the agreed format
5. User copies one block into SUBMISSIONS.md

### 3. Decision Distribution

1. Claude outputs one block using the agreed format
2. User copies entire block (one paste)
3. User pastes into SUBMISSIONS.md above each agent's end-anchor
4. For each session: user pastes Decision + Reason into Implementer's note area
5. User updates STATUS.md hash if changed
6. Verification report filed

## Agent Workflow Pattern

### For Each Round:

```
1. Agent files LIGHTNING_SUBMISSION.md to Git
2. Agent reads from Git (no paste required for most docs)
3. Claude answers 3 YES/NO questions ← MANDATORY FIRST
4. Architecture design phase ← After 3 questions answered
5. Claude outputs decisions using agreed format
6. User copies one block into SUBMISSIONS.md
7. User updates STATUS.md hash
8. User files verification report
9. Build promoted if verified
```

## Parallel Agent Configuration

### Recommended: 2-3 Agents for Parallel Work

**Agent 1: DS Patch Agent**
- ID Range: S-100–199
- Focus: Patch notes, bug fixes, liveness items
- Reads: INTEGRATION_AUDIT_LIGHTNING.md, S-202_SIM-CORE_MARKERS_GUIDE.md
- Files: LIGHTNING_SUBMISSION.md patches

**Agent 2: GLM Architecture Agent**
- ID Range: S-200–299
- Focus: Architecture decisions, S-202 markers, baseline bootstrap
- Reads: NEW_WORKFLOW_ROUND1.md, PRE_IMPLEMENTATION_ACTIONS_STATUS.md
- Files: LIGHTNING_SUBMISSION.md architecture decisions

**Agent 3: Ultra Design Agent**
- ID Range: S-400–499
- Focus: Visual design, UI improvements, v20 adoption
- Reads: ULTRA_PROMPT.md, AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md
- Files: LIGHTNING_SUBMISSION.md design suggestions

## Conflict Resolution

### When Two Agents Submit on Same Topic:

1. **Claude arbitrates** — Claude chooses which submission to accept
2. **Collision noted** — Both entries noted in SUBMISSIONS.md
3. **One-line reason** — Rejection reason recorded for proponent to appeal
4. **Appeal possible** — Proponent can appeal once with new evidence

### Per AGENTS.md Rule 8:

> "Conflicts are Claude's call — if two submissions collide, Claude chooses; note the collision in your entry if you see it."

## Documentation Requirements

### Per-Agent Documentation

Each agent should document:
1. **Their SUBMISSIONS.md section** — Their entries and statuses
2. **Their decisions** — What they accepted/deferred/rejected and why
3. **Their readings** — Which Git documents they referenced
4. **Their actions** — What they filed, verified, promoted

### Shared Documentation

1. **SUBMISSIONS.md** — The master proposals queue (per-agent sections)
2. **STATUS.md** — Build hash, roles, current state
3. **PRE_IMPLEMENTATION_ACTIONS_STATUS.md** — 8 actions status
4. **NEW_GIT_WORKFLOW.md** — Git-direct workflow overview
5. **QUESTION_FOR_CLAUDE.md** — 3 capability questions and answers

## Sample Agent Section in SUBMISSIONS.md

```
## GLM

*Example entry (format reference — not a real submission):*

### S-000 — EXAMPLE ENTRY — format reference only (⚠️ this fix already shipped in build `77bb9ed5…` — do NOT resubmit it)
- **Proposed:** 2026-10-19 · **By:** GLM (example) · **Applies to build:** `77bb9ed5` (see STATUS.md)
- **Type:** bug fix
- **Problem / idea:** `meetingInfo()` listed future meetings as "already met" in Week-2 previews.
- **Proposal:** order all meetings on one clock — weeks 1–17, then playoff rounds in fixed order — and only describe meetings strictly before the one previewed.
- **Code:** *(quote the current `meetingInfo()` in full, then the full replacement)*
- **Blast radius:** every preview tag that calls `meetingInfo()` (division games, playoff previews); nothing else consumes it.
- **Evidence:** reproducible: one full season sim; the failing Week-2 tag text before, the correct one after.
- **Checked:** `node --check` clean; full draft → season → playoffs run in Chromium; Week-2 preview now reads "the first of 2 meetings"; console clean.
- **Status:** shipped (`77bb9ed5…`)
- **Implementer's note (user pastes Claude's decision here):** —

### S-201 — GLM assessment: three structural risks, rank them (round-2 priority question)
- **Proposed:** 2026-10-19 · **By:** GLM · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
- **Type:** assessment (question — bundle is deliberate for round 1)
- **Problem / idea:** three risks, of which (a) blocks all testing:
  - **(a) The model's invariants are currently untestable.** No regression harness exists (`pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh`). Weight↔wins inverse, the 76-OVR replacement floor, Hungarian lineup consistency — all prose claims until a script can check them. Every future submission defaults to "untested".
  - **(b) 141 of 832 starters line up out of phase** under `optimalLineup()` (≈4.4/team): crossovers like C at DT, WR at CB. A realism error at the model's core. Any phase guard touches `FLEX`/`NATURAL_SLOT_MAP` → the user's explicit approval required (invariant 9). The user should declare a philosophy position: is offense↔defense flex a bug or intended flexibility?
  - **(c) Elite sack seasons under-produced.** Post-v10 audit: 17.1 avg / 21 max vs real record 22.5. Suspects: `cpuMiss()`/`cpuNoise()` variance, `rlow = 76` floor compressing spread. **CORRECTED same day (DS S-101, measured uncapped):** the "21 max" is the record cap itself — `SEASON_RECORD_CAPS.sack = 21` rewrites leaders into a 20–21 band; with the cap lifted the sim produces **max 24 and 22**. The live risk is not under-production but **the cap hiding elite sacks**. The "third-session independent tally" in the Evidence line is retracted — it read the same capped code path, so it was never independent confirmation.
- **Proposal:** no code this entry — Claude **ranks (a)/(b)/(c)** with a one-line reason each and confirms Round 1 = the harness (S-202), making (b) and (c) measurable in Round 2.
- **Blast radius:** none (no code).
- **Evidence:** (b) from the DS v10 patch-notes audit; (c) from that audit and **corrected by DS's uncapped measurement** (S-101: capped leader max 21 = the cap itself; uncapped 24/22) — prose figures, no rerunnable procedure exists yet, which is precisely what (a) fixes. The earlier "third-session independent tally" is withdrawn (same capped code path).
- **Checked:** no code; citations only.
- **Status:** pending
- **Implementer's note (user pastes Claude's decision here):** —
```

## Implementation Checklist

### For Each New Agent:

- [ ] Agent ID block allocated (per ID range above)
- [ ] Agent's SUBMISSIONS.md section created above their end-anchor
- [ ] Agent understands 3 governance-mandated user paste actions
- [ ] Agent can read documents from GitHub directly
- [ ] Agent knows to wait for Claude's 3 YES/NO questions before submitting
- [ ] Agent knows submission filing protocol (LIGHTNING_SUBMISSION.md → Git → Claude → SUBMISSIONS.md)
- [ ] Agent knows decision format (once designed in architecture phase)
- [ ] Agent's first submission is a non-critical assessment/bundle (doesn't count against 5-6 cap)

### For the User:

- [ ] Each agent's SUBMISSIONS.md section is set up
- [ ] 3 governance-mandated user paste actions are understood
- [ ] Workflow pattern is agreed upon with Claude
- [ ] Conflict resolution process is documented
- [ ] Regular sync schedule is established

## Migration from Single-Agent to Multi-Agent

### Old Workflow:

1. Single Claude session handles all submissions
2. User copies multiple responses
3. User pastes each separately into SUBMISSIONS.md
4. Manual transcription into Implementer's note areas

### New Workflow:

1. Multiple agents file submissions to Git
2. Claude reads from Git directly
3. Claude answers 3 YES/NO questions (mandatory first)
4. Architecture design phase
5. Claude outputs one block using agreed format
6. User copies one block into SUBMISSIONS.md
7. One paste distributes decisions to all agent sections
8. Verification and promotion as before

**Benefits:**
- ✅ One Claude response (not multiple)
- ✅ One copy/paste (not multiple)
- ✅ Clear section boundaries (headers map to SUBMISSIONS.md anchors)
- ✅ All agents covered (or just the ones needed)
- ✅ No breaking changes (works within governance framework)
- ✅ Parallel agent work possible

## Getting Started — 3-Agent Setup

### Step 1: Set Up Agent Sections

1. Ensure SUBMISSIONS.md has sections for each agent above their end-anchors
2. Verify each agent knows their ID range
3. Confirm each agent can read from GitHub directly

### Step 2: Establish Workflow Pattern

1. Agree on the workflow pattern (Phase 1 → Phase 2 → Phase 3)
2. Understand the 3 mandatory YES/NO questions
3. Design the output format in the architecture phase
4. Document the conflict resolution process

### Step 3: Test with One Submission

1. Agent 1 files a non-critical assessment submission
2. Claude reads from Git and answers 3 questions
3. Architecture design phase
4. Claude outputs one block
5. User copies one block into SUBMISSIONS.md
6. Verify it distributes correctly to all agent sections
7. Iterate if needed

### Step 3: Scale Up

1. Agent 2 files their first submission
2. Follow the same pattern
3. Add Agent 3 if needed
4. Establish parallel work patterns
5. Establish conflict resolution procedures

## Key Success Factors

1. **Claude's 3 questions must be answered first** — No exceptions
2. **Clear agent ownership** — Each agent knows their section
3. **Git-direct access** — All agents read from Git directly
4. **One-block output format** — User copies once, distributes sections
5. **Governance compliance** — 3 user paste actions understood and accepted
6. **Conflict resolution plan** — How submissions on same topic are handled
7. **Regular sync** — Periodic check-ins to ensure consistency

## Troubleshooting

### Common Issues:

**Issue:** Agent submits before answering 3 YES/NO questions
**Resolution:** Pause session, ensure questions are answered first

**Issue:** Two agents submit on same topic
**Resolution:** Claude arbitrates; collision noted in both entries; proponent can appeal once with new evidence

**Issue:** User can't paste Claude's decisions into SUBMISSIONS.md
**Resolution:** This is one of the 3 governance-mandated actions — user must handle it. Consider whether the consensus block format helps (one block, one paste).

**Issue:** Agent can't read from GitHub directly
**Resolution:** This should not happen — all key documents are on Git. If there's a network issue, the submission must be pasted to Claude.

**Issue:** Uncertainty about output format
**Resolution:** Wait for architecture design phase. Do not output using any format until Claude's 3 questions are answered and architecture is designed.

## Resources on Git

| Document                                      | Purpose                             | Agent Reference                   |
| --------------------------------------------- | ----------------------------------- | --------------------------------- |
| `QUESTION_FOR_CLAUDE.md`                      | 3 YES/NO capability questions       | All agents — mandatory first read |
| `NEW_GIT_WORKFLOW.md`                         | Git-direct workflow overview        | All agents                        |
| `PRE_IMPLEMENTATION_ACTIONS_STATUS.md`        | 8 pre-implementation actions        | All agents                        |
| `CONSENSUS_BLOCK_FORMAT.md`                   | Output format (archived reference)  | After architecture phase          |
| `S-202_SIM-CORE_MARKERS_GUIDE.md`             | SIM-CORE markers and function moves | GLM, DS agents                    |
| `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` | Dataset format declaration          | All agents                        |
| `INTEGRATION_AUDIT_LIGHTNING.md`              | Audit findings, liveness items      | All agents                        |
| `NEW_WORKFLOW_ROUND1.md`                      | Round 1 adjudication chain          | All agents                        |
| `FINAL_CONSOLIDATION.md`                      | Complete summary of deliverables    | All agents                        |
| `OtherChambers_AI_Critiques.md`               | External AI code critiques          | All agents                        |
| `LIGHTNING_SUBMISSION.md`                     | S-900 integration audit submission  | All agents                        |
| `NFL Draft Simulator.html`                    | The 650,127-byte build              | All agents                        |
| `STATUS.md`                                   | Build hash, roles, current state    | All agents                        |
| `AGENTS.md`                                   | Invariants and role definitions     | All agents                        |
| `COLLECTIVE-PROMPT.md`                        | Standing system prompt              | All agents                        |
| `MASTER_GUIDE.md`                             | Season-first handoff documentation  | All agents                        |
| `master_task_list.md`                         | Settled and rejected decisions      | All agents                        |

---

_Framework version 1.0 — Designed for multi-agent NFL Draft Simulator workflow. All agents read from Git directly. 3 governance-mandated user paste actions apply. Claude designs workflow after answering 3 YES/NO questions._
