# Roadmap and Acceptance Gates

**Status:** Proposed sequencing. Dates and launch commitments are intentionally not set.

## Stage 0 — Protect and finish current NFL V21

**Priority:** Highest.

- Keep one agreed V21 scope and acceptance list.
- Continue visual and interaction refinement within the current NFL product.
- Verify assembled user flows, not isolated functions only.
- Include relevant desktop and narrow-screen behavior, browser/console errors, and the project’s actual build and smoke commands.
- Keep protected weights/constants and existing behavior unchanged unless the Owner approves a specific change.
- Maintain one canonical status record and resolve contradictory counts or paths before reporting completion.

**Exit gate:** Claude and the Owner agree the V21 acceptance criteria are met; an independent reviewer reproduces the stated checks on the assembled build; remaining known limitations are recorded.

## Stage 1 — NFL All-Time foundation

Can begin as bounded data and concept work while V21 is underway. Do not integrate into the current NFL implementation until the Stage 0 boundary is protected.

- Confirm the all-time rating meaning and player-pool target.
- Approve the position/role model and rating rubric.
- Define how current players qualify and how the suggested minus-five adjustment works.
- Assemble the candidate list with provenance and coverage.
- Test a small end-to-end sample before scaling curation.

**Exit gate:** A versioned, validated sample dataset loads through an isolated NFL all-time path and does not change current NFL defaults. Owner accepts the rubric and representative outputs.

## Stage 2 — Current NBA specification and first playable model

- Resolve the first set of NBA roster, lineup, rotation, schedule, and rating questions.
- Preserve NBA2K source values and select one edition/update for an initial mapping sample.
- Design basketball-specific simulation math; do not translate NFL positional weights into NBA terms.
- Reuse web components or run metadata only after proving they fit without obscuring NBA behavior.
- Keep the first scope small enough to explain and verify.

**Exit gate:** The Owner accepts the initial rules and rating interpretation; a small current NBA dataset can run reproducibly through a complete draft-to-season-to-playoffs path with an independent review.

## Stage 3 — NBA All-Time

- Reuse the accepted NBA engine and its contracts.
- Define era policy, peak/prime/career interpretation, current-player eligibility, and transformations.
- Build a reviewed data sample across eras before targeting the full pool.
- Keep data and transformations versioned.

**Exit gate:** A representative historical sample validates and can be explained player-by-player; the all-time rules do not alter the current NBA mode.

## Stage 4 — MLB and NHL

Begin domain discovery and source feasibility after the first four projects produce a stable working pattern. Each sport needs its own rules and data review. Do not assume baseball or hockey uses NBA or NFL roster and season abstractions.

**Exit gate:** Each sport has a named product owner, approved initial rules, a source plan, and a small validated model before full implementation.

## Stage 5 — Soccer league catalog

- Reconfirm the league list against an agreed dated ranking and competition definition.
- Decide what “draft season simulation” means for soccer.
- Identify league-specific schedule, squad, registration, and competition rules.
- Start with one representative league; prove configuration works before adding all 17.
- Keep all-time soccer data and era questions explicit.

**Exit gate:** One current and one all-time league configuration can run with a documented squad-building concept. Add further leagues through validated configuration where possible.

## Cross-stage release gates

A feature or dataset is ready to advance only when:

- The artifact is assembled, not evaluated only as isolated pieces.
- The relevant end-to-end path has been run and its exact commands are recorded.
- Data and rules versions are visible in the run record.
- A reviewer other than the author verifies the acceptance criteria.
- Dependencies and unresolved decisions are listed.
- No higher-priority scope is silently displaced.
- The Owner accepts any behavior that cannot be inferred from existing decisions.

A failed gate should produce a small, actionable defect list. Do not relabel an incomplete artifact as “settled” because individual functions or rows looked correct.
