# Football-Sim Structure Review and Proposed Next Steps

**Prepared:** 24 October 2026\
**Status:** Proposal only --- not adopted\
**Evidence base:** `Football-Sim-Governance-Review.txt` and the supplied
`V3 Prompt to claude and agents` document\
**Scope limit:** This is a review of the supplied snapshots and
proposals, not a live inspection of the current repository. Verify
current files, decisions, branches, and build hashes before acting.

## Executive recommendation

Football-Sim already has substantial governance. The best structural
improvement is **not to add another layer of governance**. Keep the
existing sources of truth, make their boundaries easier to understand,
and avoid duplicating instructions across files.

My recommendations, in order:

1.  **Do not create a new task board or mandatory council relay process
    as part of this review.** The V3 agent prompt proposes
    `council/TASKBOARD.md`, a new status system, atomic claims, and
    three reviews per task. The supplied governance snapshot already has
    a proposal queue, task areas, decision records, a status lifecycle,
    and established authority. A second board would risk competing with
    those systems.
2.  **Use a read-only Architect audit to establish the PreColors
    facts.** No implementation, promotion, task distribution, or
    governance change should be bundled into that audit.
3.  **Treat the reported baseline identity and all counts as
    hypotheses.** The conflicting SHA/line-count/randomness claims are
    exactly why the audit must verify the artifact before accepting the
    structural narrative.
4.  **Keep `PRODUCT.md` as an Owner decision worksheet until the Owner
    has actually made the product decisions.** Do not infer its contents
    from implementation details or agent consensus.
5.  **Add a short document map only if the current entry points lack
    one.** Prefer a small amendment to an existing guide over creating
    another permanent document.

Nothing in this proposal authorizes repository edits.

## What the supplied governance snapshot supports

The supplied governance review states that:

-   `AGENTS.md` is authoritative for project rules and invariants; the
    standing prompt says that `AGENTS.md` wins if the two conflict.
-   `COLLECTIVE-PROMPT.md` carries the implementer role and delivery
    contract.
-   `STATUS.md` records current state, but hashes and round details in a
    snapshot can become stale.
-   `MASTER_GUIDE.md` sequences work; `tasks/` is already used for
    execution work.
-   `SUBMISSIONS.md` is the formal proposal queue and defines proposal
    status transitions.
-   `QUESTIONS-FOR-THE-ARCHITECT.md`, `COUNCIL-BULLETIN.md`,
    `CHRONICLE.md`, and `GOVERNANCE-ROUNDTABLE.md` already have distinct
    purposes.
-   `ONBOARDING.md` documents joining, evidence, channels, and proposal
    conventions.
-   `_agents/` is contributor/session workspace, not the default home
    for authoritative shared rules.
-   Owner authority over publishing, permissions, and roster is distinct
    from the Architect's technical authority.
-   The user has established open membership; prompts should not
    accidentally introduce a fixed roster or seat-count requirement.

These are statements about the supplied snapshot. They are not
confirmation that every file or decision remains current.

## Review of the attached V3 prompt proposals

### Strong ideas worth retaining

-   Verify artifact identity independently before trusting previous
    reports.
-   Distinguish textual matches from executable call sites.
-   Cite findings with file/line/function evidence.
-   Explicitly label tests that were not run.
-   Separate confirmed defects, likely concerns, modeling choices, and
    questions requiring experiments.
-   Protect the listed valuation and lineup mathematics from incidental
    changes.
-   Compare PreColors and the coloured candidate before selecting a V22
    base.
-   Treat the task backlog as candidates, not approved work.
-   Ask the Architect to reject mis-scoped or duplicate recommendations
    instead of accepting everything.

### Problems to correct before sending

**1. Read-only and implementation directives conflict.**\
One section requires a read-only investigation; another version
instructs the first agent to implement seeded RNG and SIM-CORE entry
points immediately. Keep the Architect audit strictly read-only.
Implementation must be a separate, explicitly authorized step.

**2. The hash stop condition needs more precision.**\
If the hash differs, Claude should not continue describing the file as
the expected baseline. It should report the actual identity of the file
at the requested path, state that the expected identity failed, and
pause before treating prior claims as applicable. This is safer and more
useful than either silently continuing or claiming the expected artifact
was examined.

**3. The fixed `Math.random` count is not a ground-truth requirement.**\
Count textual matches, direct call sites, and calls relevant to
simulation behavior separately. A count copied from an earlier review
must not become the acceptance criterion.

**4. "Three reviews" is not yet a justified governance rule.**\
The proposals disagree on whether this means three reviewers or three
total participants including the author. Mandatory review counts also
add coordination cost and can conflict with the existing submission and
verifier workflow. Use the existing workflow unless the Owner and
Architect explicitly approve a measured change to it.

**5. A new `council/TASKBOARD.md` is a potential duplicate registry.**\
The proposal explicitly prohibits competing registries while introducing
a new one. It also risks moving work out of `SUBMISSIONS.md` and
`tasks/`. Do not create the board as part of this audit. If the existing
workflow demonstrably cannot track a particular class of work, submit
that as a separate governance proposal.

**6. "Strict superset" is too weak as a promotion test.**\
A line-count increase or additive CSS diff is insufficient. Compare
behavior-relevant functions and protected invariants, inspect the full
diff, and run the required checks. A visually additive change can still
alter selectors, event timing, or runtime behavior.

**7. The audit is over-specified in some places and under-specified in
others.**\
Requiring 6--12 bullets for every structural section encourages padding.
Prefer a concise map of meaningful mechanisms and a comprehensive
verdict matrix for contested claims. Conversely, any claim about
measured freezes, observer cost, or statistical divergence requires an
actual experiment; source inspection alone cannot establish its
magnitude.

**8. Do not pre-label issues "resolved."**\
`rWeights`, `msChecked`, the shell structure, and other items must be
checked against the exact artifact under review. Older issue trackers
and a different branch may describe a different build.

**9. Seeded randomness should not be framed as a blind replacement of
every string.**\
First map randomness sites and call paths. Then specify the smallest
testable abstraction, the default behavior, the seed
ownership/lifecycle, and regression checks. This design work is not
implementation authorization.

**10. Avoid overloading the baseline audit with task distribution.**\
Claude should recommend the next investigations and identify
dependencies. The Owner/Architect can then decide which proposals to
accept and where to place them in the existing workflow.

## Proposed document responsibility map

  ------------------------------------------------------------------------------------
  Existing document or area          Primary responsibility    Avoid
  ---------------------------------- ------------------------- -----------------------
  `AGENTS.md`                        Binding rules,            Duplicating current
                                     invariants, precedence,   status or long
                                     permissions               historical narrative

  `PRODUCT.md`                       Owner-approved product    Guessing Owner
                                     intent, goals, non-goals, decisions or
                                     product-level trade-offs  duplicating technical
                                                               implementation rules

  `MASTER_GUIDE.md`                  Navigation and sequence   Becoming a competing
                                     through the existing      policy source
                                     workflow                  

  `STATUS.md`                        Current reference build,  Treating stale snapshot
                                     candidate, active work,   values as current
                                     blockers, next step       

  `COLLECTIVE-PROMPT.md`             Portable implementer role Silently overriding
                                     and delivery contract     `AGENTS.md`

  `SUBMISSIONS.md`                   Formal proposals and      Informal discussion or
                                     their lifecycle           unauthorized decisions

  `QUESTIONS-FOR-THE-ARCHITECT.md`   Questions needing         A second proposal queue
                                     technical/architectural   
                                     resolution                

  `COUNCIL-BULLETIN.md`              Discussion, coordination, Binding rulings
                                     availability              

  `CHRONICLE.md`                     Append-only factual       Speculation or
                                     history                   rewritten history

  `GOVERNANCE-ROUNDTABLE.md`         Governance discussion and Ambiguous, unapproved
                                     clearly recorded Owner    shadow policy
                                     decisions                 

  `tasks/`                           Actionable work,          A second
                                     ownership, acceptance     proposal/status system
                                     criteria                  

  `_agents/<session>/`               Contributor/session       Authoritative shared
                                     workspaces                governance by default

  `tests/` and test documentation    Executable contracts and  Claims that passing a
                                     verification instructions limited test proves
                                                               overall realism
  ------------------------------------------------------------------------------------

This map is a proposal, not permission to edit any file. If the current
repository already makes these boundaries clear, do not change it just
to match this table.

## Recommendations in priority order

### P0 --- Verify the current map and precedence

Read the current entry points before adding anything. If contributors
still struggle to find the source of truth, add a short map to the most
appropriate existing guide. State the current precedence rule once and
link to the authoritative documents.

**Acceptance criterion:** A new contributor can locate binding rules,
product intent, current build state, formal proposals, technical
questions, Owner decisions, and verification instructions without
maintaining a second registry.

### P0 --- Keep the PreColors investigation read-only

Use the revised Architect audit prompt supplied separately. The
deliverable should be a source-grounded report, not an implementation
plan disguised as authorization.

**Acceptance criterion:** Identity is verified; claims are evidenced or
marked unverified; no source, branch, worktree, candidate, or governance
file is changed.

### P0 --- Resolve product intent through the Owner

The supplied snapshot says `PRODUCT.md` had not yet been written. Verify
that this remains true. If it does, use the companion worksheet to
elicit decisions rather than filling in requirements by inference.

**Acceptance criterion:** Only Owner-approved decisions become
authoritative; unresolved fields remain explicitly unresolved.

### P1 --- Keep status operational and current

If `STATUS.md` needs improvement, keep it to current, verified facts:
reference build/hash, candidate build/status, active round/implementer,
verifier/gates, blockers, next step, and links to durable decisions and
reports. Do not rewrite history during a status cleanup.

### P1 --- Preserve the existing proposal lifecycle

Maintain the current status vocabulary and the separation between
decision, implementation, verification, and publication. `accepted` is
not `built`; `built` is not `verified`; `verified` is not `shipped`. An
unexecuted check must never be described as passing.

### P1 --- Keep investigation and implementation separate

A finding may be confirmed while its remedy remains undecided. A
proposed fix that touches protected mathematics, score generation,
random-number behavior, data identity, or candidate promotion needs its
own explicit scope and validation plan.

### P2 --- Avoid nested instruction files unless a recurring local failure proves they are needed

Do not create additional `AGENTS.md` files merely to repeat global
rules. Consider a narrow local instruction only when a repeated
directory-specific failure is documented and the root guidance does not
adequately address it.

### P2 --- Use a task template only inside the existing task workflow

For a real task, a compact template may include problem,
scope/non-goals, owner, proposal/decision references, dependencies,
acceptance criteria, verification commands, and completion evidence. Do
not impose the template on every discussion or create a parallel task
ledger.

## Changes not recommended in this review

Do not bundle this work with:

-   Creating `council/TASKBOARD.md` or a new mandatory three-review
    process.
-   Creating a nested `AGENTS.md` hierarchy.
-   Changing branches, worktrees, remotes, publishing mechanics, or
    candidate lineage.
-   Rewriting historical records.
-   Modifying simulation logic, player data, scoring, protected
    constants, or test gates.
-   Promoting a coloured candidate.
-   Marking issues resolved before checking the current target artifact.
-   Assigning implementation tasks before the read-only audit is
    reviewed.

## Decision requested

The Owner can approve, amend, defer, or reject this proposal through the
existing governance process. Until then, it is advisory only. The
immediate next action is to verify the current checkout and then run the
read-only audit against the exact artifact---not to edit governance
files.
