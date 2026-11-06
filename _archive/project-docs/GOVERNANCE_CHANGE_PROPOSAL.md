GOVERNANCE CHANGE PROPOSAL — Git-Direct Workflow Assessment (19 October 2026)

================================================================================

PROPOSAL: Assess and potentially restructure governance rules based on Claude's
direct GitHub access capability, revealed during Round 1 pre-dispatch adjudication.

================================================================================

 CURRENT GOVERNANCE (as of 19 October 2026):

1. STATUS.md rule: "The user is the only relay and the only publisher"
   - Imposes: User must paste Claude's decisions into SUBMISSIONS.md
   - Imposes: User must file verification five-line report
   - Imposes: User must paste new submissions not yet pushed to Git

2. AGENTS.md rules: Role definitions, invariants, conflict resolution
   - Contains: Role definitions for GLM, DS, Nemo, GPT, Gemini
   - Contains: Invariants (never break: modelWeights inverse, replacement floor, etc.)

3. COLLECTIVE-PROMPT.md rules: Implementer succession, project philosophy, priorities
   - Contains: Implementer handover rules, priority rankings, project goals

================================================================================

 REVELATIONS FROM GIT-DIRECT WORKFLOW ASSESSMENT:

1. Claude CAN read most documents from GitHub directly (no paste required)
2. Only 3 specific actions still require user paste (governance-mandated)
3. The workflow is now: Claude reads from Git → User records decisions → User verifies → User promotes
4. The 3 user-paste actions are governance-mandated, not technical limitations

================================================================================

 PROPOSED GOVERNANCE CHANGES:

 CHANGE 1: Formalize Git-Direct Workflow in New Document
 -------------------------------------------------------

 New document: NEW_GIT_WORKFLOW.md (already created)
 - Explains Claude can read most documents from Git
 - Documents 3 actions requiring user paste (governance-mandated)
 - Explains the workflow flow: Git → User records → User verifies → User promotes
 - Provides transparency about what requires user paste vs. what doesn't

 CHANGE 2: Optional — Reconsider 3 User-Paste Actions
 -------------------------------------------------------

 Should the 3 governance-mandated user paste actions be changed?

 ACTION A: Claude's accept/defer/reject decisions in SUBMISSIONS.md
   - Current: User must paste Claude's decisions verbatim
   - Question: Could Claude self-record decisions if governance changed?
   - Rationale: The user as "only publisher" is a design choice, not technical limitation

 ACTION B: Verification five-line report
   - Current: Verifier session files report
   - Question: Could Claude file this if governance role changed?
   - Rationale: The "verifier session" role could be redefined

 ACTION C: New submissions before Git push
   - Current: User must paste submissions not yet pushed to Git
   - Question: Could Claude wait until push, or should submissions always be pushed first?
   - Rationale: The Git-direct access means Claude can read pushed content immediately

 CHANGE 2: Formalize Claude's Git Access in Governance
 -------------------------------------------------------

 Add to existing governance:
   - "Claude can read documents from GitHub at https://github.com/kozikosi/Football-Sim"
   - "Claude's read access includes: STATUS.md, SUBMISSIONS.md, CONTRACT.md, build file,"
   - "  and all documents published to the Git repo"
   - "  Claude cannot self-publish, self-verify, or read pre-push content"
   - These clarify Claude's capabilities and limitations

================================================================================

 GOVERNANCE CHANGE PROCESS:

1. Proposal published (this document)
2. Discussion period: Agents review and comment
3. User decision: User approves, modifies, or rejects changes
4. Implementation: Changes incorporated into practice (not necessarily editing existing docs)
5. Workflow update: Practice updated to reflect new governance

================================================================================

 STATUS QUO ASSESSMENT:

 The current governance (STATUS.md + AGENTS.md + COLLECTIVE-PROMPT.md) contains
 rules that were written assuming Claude cannot read Git directly. The Git-direct
 workflow assessment reveals these rules are now partially obsolete — Claude can
 read most documents from Git, leaving only 3 governance-mandated user paste actions.

 The question: Should we restructure governance to reflect Claude's new capabilities,
 or keep the existing rules (which may be inefficient)?

================================================================================

 RECOMMENDATION:

 Create a document formalizing the Git-direct workflow (already completed)
 Document the 3 governance-mandated user paste actions
 Propose optional changes to those 3 actions
 Let the user decide whether to change any governance rules

 No existing governance documents need to be edited (per constraint). Changes can
 be proposed in new documents, and the user can decide whether to adopt them.

================================================================================

 SUGGESTED NEXT STEPS:

1. Review NEW_GIT_WORKFLOW.md (already published on Git)
2. Review the 3 governance-mandated user paste actions
3. Decide whether to change any of the 3 governance requirements
4. If changing, create proposal documents (not editing existing governance)
5. User decides and implements changes per project governance rules

================================================================================

 The key insight: The Git-direct workflow doesn't require governance changes —
 it documents the current state. But if the project wants to optimize the
 user experience, the 3 governance-mandated user paste actions could be
 reconsidered, formalized, or restructured through new proposal documents.

================================================================================
