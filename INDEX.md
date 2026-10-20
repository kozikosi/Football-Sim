# INDEX.md — what this project is and which files to trust (read me FIRST)

**Audience.** Any human or AI agent landing in `/Football Sim/` fresh — Owner, Architect (Claude), or a newly admitted council advisor. **Parse before anything else in the folder.**

**One line.** Internal, single-file football simulator (`NFL Draft Simulator v20 Claude.html` = the **v20 reference build**, `31b7d61f…`); Claude is the Architect and holds technical authority; the user is the Owner; everyone else is an equal advisor; collaboration is organised over **ten** core shared documents (detailed rules live in `AGENTS.md`; the five Owner rulings are copied in `_agents/ds/notes/Owner-Rulings-19-Oct.md`). *Meaning note (adopted 20 Oct, Owner-directed):* **canonical** is used in two senses here — canonical *documents* are the authoritative copies at this root; the canonical *build* is v20 `31b7d61f…` per ruling R2, while `NFL Draft Simulator.html` (`77bb9ed5…`) is the donor build for the merge.

## The 10 documents that matter (all current)

| File | What it is | When to read |
|---|---|---|
| `CHRONICLE.md` | append-only facts log | **first** — newest lines are the live state |
| `COUNCIL-BULLETIN.md` | conversation + availability + house rules | second |
| `QUESTIONS-FOR-THE-ARCHITECT.md` | the council's question pack for Claude (answers land in it) | when contributing or answering |
| `GOVERNANCE-ROUNDTABLE.md` | governance draft + session verdicts; §7 = Owner decisions | governance rounds only |
| `STATUS.md` | build state + roles | after chronicle |
| `AGENTS.md` | full protocol + protected invariants | before writing anything |
| `COLLECTIVE-PROMPT.md` | the standing prompt pasted to Claude | Owner/Architect needs |
| `ONBOARDING.md` v2.1 | joiner prompt for any new agent | **new agents: this after the first read** |
| `SUBMISSIONS.md` | the proposal queue — how code actually reaches the Architect | before and after filing any proposal |
| `_agents/ds/notes/Owner-Rulings-19-Oct.md` | R1–R5 verbatim — the root of all authority | whenever a ruling question comes up |

**Read order for a new member:** `ONBOARDING.md` v2.1 → the table above in order → contributions.

## The phrase book — how parallel work is ordered (the Owner's dispatch vocabulary)

Usable by the Owner, and by any member toward any reachable session:

- **"Run a parallel batch: send this brief to all sessions"** / **"Execute a parallel batch: do A, B, C at once"** — the receiving session performs several *independent* actions in ONE action block, dispatched simultaneously (e.g. five `session.send` wakes in the same minute). No literal keyword triggers it mechanically — the session executes the intent under that name.
- **"Broadcast to the council"** — one bulletin post + direct `session.send` to every reachable member.
- **"Fan out and report back"** — batch dispatch with results returned to the dispatcher, which wakes on completion and compiles the findings.
- **"(In the) background"** — dispatch runs unattended; work continues meanwhile, completion notifies.
- **"Use subagents"** — the dispatcher's own disposable child workers; they report to their creator only, are not council members, and take no ID block.

Two notes: a parallel batch is **simultaneous, not guaranteed-uniform** — a failed leg (usage limits, idle state) is re-dispatched, never silent. And a direct wake of another member's session is for time-sensitive orders — the ambient channel is the bulletin.

## Files that are HISTORY — read only for archaeology, never as guidance

Created 19 Oct by interim sessions before the Owner's R1–R5 rulings; **their "completeness/adoption" claims are superseded** (`CONTRACT_B1_B2_ADOPTION_CONFIRMED.md` is false as written; the real status is Contract v2, unintegrated):

`GOVERNANCE_CHANGE_PROPOSAL.md` · `NEW_GIT_WORKFLOW.md` · `FINAL_CONSOLIDATION.md` · `NEW_WORKFLOW_ROUND1.md` · `CONSENSUS_BLOCK_FORMAT.md` · `MULTI_AGENT_WORKFLOW_FRAMEWORK.md` · `PRE_IMPLEMENTATION_ACTIONS_STATUS.md` · `QUESTION_FOR_CLAUDE.md` · `PROMPT_NEXT_FOR_CLAUDE.md` · `CLAUDE_NEXT_SESSION_QUICKSTART.md` · `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` · `S-202_SIM-CORE_MARKERS_GUIDE.md` · `ULTRA_PROMPT.md` · `CONTRACT_B1_B2_ADOPTION_CONFIRMED.md` · `LIGHTNING_SUBMISSION_READY.md` · `INTEGRATION_AUDIT_LIGHTNING.md` · `OUTSTANDING_TASKS_SUMMARY.md` · `V20_COMPARED_TO_AUTHORITATIVE.md` (tables partially wrong — see GLM/DS addenda) · `V20_CRITIQUE_vs_CANONICAL.md` · `OtherChambers_AI_Critiques.md`

*(None of these has been edited since the R1–R5 rulings; R5 forbids fixing another session's file without the Owner's say. The Owner may authorize banner headers later — noting here is the current fix.)*

## House rules, compressed (full versions live in their own docs)

1. **No one edits the product files** except through the Architect's delivery; **no one edits another session's work** without Owner permission.
2. **A claim without a command is not a claim** — every line-number cite names its build hash.
3. **Open membership** — no fixed roster, next free proposal ID block **S-1500s**, arrival = one `CHRONICLE.md` line with evidence.
4. **English only** in all documents, logs, and anything the Owner reads.
5. **Append, never rewrite** in shared docs; corrections cite what they fix.
6. Mirrors: **this root is the canonical checkout**; `Football Sim/` is git infrastructure the Owner pushes — keep mirrors synced via `tools/sync-mirrors.sh`.

## Where work lands

Requests/proposals → own `SUBMISSIONS.md` section · facts → `CHRONICLE.md` · conversation → `COUNCIL-BULLETIN.md` · verdicts → roundtable §8 · Owner decisions → roundtable §7. Work Products → `_agents/<your-name>/`.

*This index is maintained by an Owner-assigned session (currently GLM); additions to the eight-document table or the history list are made with one CHRONICLE line each, same session.*
