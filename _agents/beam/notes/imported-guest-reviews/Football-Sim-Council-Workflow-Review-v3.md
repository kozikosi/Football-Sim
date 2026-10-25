# Football-Sim Council Workflow Review --- Proposed Addendum

**Status:** Proposal only; not an adopted rule\
**Basis:** The supplied governance snapshot and
`V3 Prompt to claude and agents`\
**Purpose:** Identify a safe way to use peer review without creating a
parallel governance system.

## Recommendation

Do **not** adopt the proposed `council/TASKBOARD.md` and mandatory
three-review relay as written. First use the current `AGENTS.md`,
`SUBMISSIONS.md`, `STATUS.md`, `COLLECTIVE-PROMPT.md`,
`MASTER_GUIDE.md`, `tasks/`, and established decision records. Verify
that those files still exist and reflect the current workflow before
changing anything.

The V3 proposal has useful quality controls, but it also introduces a
new registry and a second status vocabulary. It says there must be no
competing registries while directing agents to create one. That
contradiction should be resolved before the prompt is used.

## Retain these safeguards

-   Every claim should cite source lines, exact strings, command output,
    or test results.
-   A test not run must be labeled `not run` or `unverified`.
-   Distinguish defects from likely risks, calibration questions, and
    intentional simplifications.
-   Agents must not review their own work.
-   Reviewers should try to falsify the central claim, not merely
    approve the prose.
-   Protected mathematics and other reserved decisions must be escalated
    through the existing authority structure.
-   Conflicting findings should be documented with evidence rather than
    averaged.
-   A task that is duplicated, mis-scoped, already done, or unsupported
    can be rejected or returned for clarification.
-   Build identity and applicable hash must be recorded for code-level
    proposals.

## Do not adopt without a separate governance decision

-   Creating `council/TASKBOARD.md`.
-   Replacing or duplicating the current `SUBMISSIONS.md` lifecycle with
    `OPEN / CLAIMED / IN_REVIEW / CHANGES / COMPLETE / BLOCKED`.
-   Requiring every agent on every turn to review work and then claim
    another task.
-   Requiring three reviews for every task regardless of risk or cost.
-   Allowing an agent to create a new board automatically when it is
    missing.
-   Treating a task list as implementation authorization.
-   Requiring atomic claims in a new shared file without confirming the
    actual shared-editing mechanism.
-   Assigning work based on a fixed list of named agents or a fixed
    roster.

These may be worth considering later, but they are process changes and
should be proposed through the existing governance path.

## Safer default operating note for an agent

1.  Read the applicable standing instructions and current status before
    acting.
2.  Identify whether the request is an audit, proposal, implementation,
    verification, or decision.
3.  Work only within the authorization already granted.
4.  Use the existing proposal/task channel. Do not create a parallel
    registry.
5.  State the exact artifact/build/hash examined where applicable.
6.  Record evidence, limitations, and the weakest point in the
    conclusion.
7.  Do not alter another session's files or shared records unless the
    current rules and the Owner's request authorize that edit.
8.  Do not change protected invariants, create branches, commit, push,
    merge, or promote a candidate unless separately authorized.
9.  Return recommendations as recommendations. The Architect and Owner
    retain their established decision rights.
10. If the existing workflow cannot represent a real need, describe the
    gap and ask for a governance decision rather than inventing a new
    workflow.

## Peer review proportional to risk

If the Architect or Owner later chooses to strengthen peer review, use a
risk-based policy rather than assuming every item needs the same number
of reviewers:

-   **Low-risk read-only analysis:** one independent spot-check may be
    enough.
-   **Behavior-changing implementation:** independent review plus the
    project's existing verification gates.
-   **Protected mathematics, scoring, randomness, data identity, or
    candidate promotion:** explicit Architect/Owner decision as required
    by existing governance, with independent verification appropriate to
    the risk.
-   **A failed review:** specify the missing evidence or correction, and
    make clear whether earlier review conclusions remain valid.

Do not change the authoritative process until the Owner has approved the
proposed amendment and the Architect has resolved its technical
implications.

## Decision requested

No workflow change is requested as a prerequisite for the PreColors
audit. Complete the read-only baseline investigation first. If the audit
reveals a concrete tracking or review failure that the current workflow
cannot handle, submit a separate, evidence-backed proposal through the
existing governance system.
