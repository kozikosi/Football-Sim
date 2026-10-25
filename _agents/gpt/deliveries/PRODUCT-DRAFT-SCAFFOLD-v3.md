# PRODUCT.md --- Owner Decision Worksheet

**Status:** Draft worksheet only; not adopted policy\
**Purpose:** Help the Owner decide and record stable product intent\
**Authority warning:** Blank fields, examples, and suggestions are not
requirements. Do not make product decisions on the Owner's behalf.

This worksheet should complement existing governance, not duplicate it.
`AGENTS.md` remains authoritative for project rules and invariants
according to the supplied governance snapshot. Verify the current
repository and precedence rules before installing or editing a
repository copy.

## How to use this worksheet

1.  Confirm that `PRODUCT.md` is still missing or incomplete in the
    current checkout.
2.  Read the current `AGENTS.md`, `MASTER_GUIDE.md`, `STATUS.md`, and
    `COLLECTIVE-PROMPT.md` before filling this in.
3.  Fill only decisions the Owner is ready to make. Leave other fields
    marked **Open**.
4.  Ask the Architect for technical consequences where useful; do not
    turn technical recommendations into product policy automatically.
5.  Where a rule is already authoritative elsewhere, link to it rather
    than copying it.
6.  Do not install this as authoritative `PRODUCT.md` until the Owner
    has reviewed and approved it through the existing governance
    process.

## 1. Product identity

-   **Product name:** NFL Draft Simulator
-   **One-sentence description:** **Open --- Owner decision**
-   **Primary users:** **Open --- Owner decision**
-   **Primary user need:** **Open --- Owner decision**
-   **Core promise:** **Open --- Owner decision**
-   **Distribution/deployment model:** **Open --- confirm from current
    governance; do not infer from repository layout**

## 2. Goals and non-goals

Choose a small number of outcomes that should guide trade-offs.

### Goals

1.  **Open --- Owner decision**
2.  **Open --- Owner decision**
3.  **Open --- Owner decision**

### Non-goals

1.  **Open --- Owner decision**
2.  **Open --- Owner decision**
3.  **Open --- Owner decision**

Do not turn every desirable feature into a goal. Non-goals are useful
because they make it easier to reject technically attractive work that
does not serve the product.

## 3. Priority trade-offs

When desirable outcomes conflict, define the Owner's priority order or
explain the exceptions:

-   Football plausibility and simulation realism.
-   Correctness, transparency, and reproducibility.
-   Draft quality and strategic depth.
-   Usability, accessibility, and mobile behavior.
-   Performance and responsiveness.
-   Maintainability and simplicity.
-   Feature breadth versus stability.
-   Compatibility with the current delivery model, if that remains a
    product constraint.

**Owner's priority order and exceptions:** **Open --- Owner decision**

## 4. Product-level invariants

List only requirements intended to constrain future changes. Do not
simply copy current implementation details or the protected-identifier
list from a technical prompt. Technical protections may remain in
`AGENTS.md` or a test contract; this section should explain the
product-level reason for any invariant.

  -----------------------------------------------------------------------
  Owner-defined     Why it matters    Observable test   Who can approve a
  requirement                         or review         change?
  ----------------- ----------------- ----------------- -----------------
  Open              Open              Open              Open

  Open              Open              Open              Open
  -----------------------------------------------------------------------

Potential categories to consider, not pre-approved rules:

-   Provenance and integrity of player/team data.
-   Draft rules, roster constraints, and positional eligibility.
-   Season format, standings, and playoff rules.
-   CPU decision quality and repeatable testing.
-   User-facing explanations and transparency.
-   Accessibility and responsive behavior.
-   Behaviors or data that must not change without explicit approval.

Do not add an example to the invariant list unless the Owner chooses it.

## 5. Data and realism policy

-   **Permitted data sources:** Open --- Owner decision
-   **Required sourcing/citation standard:** Open --- Owner decision
-   **How estimates, inferences, and fictional values are labeled:**
    Open --- Owner decision
-   **Protected data fields or constants:** Link to the authoritative
    technical source; Owner decision on any product-level additions
-   **How corrections and disputed data are handled:** Open --- Owner
    decision
-   **How historical seasons and validation datasets are selected:**
    Open --- Owner decision

A passing test proves only the behavior covered by that test and
dataset. It does not, by itself, prove broad real-world accuracy.

## 6. Product quality bar

Define product expectations here and link to technical contracts for
exact commands, thresholds, and test mechanics.

-   **Functional correctness:** Open --- Owner/Architect alignment
-   **Simulation plausibility:** Open --- Owner decision
-   **Draft quality:** Open --- Owner decision
-   **Mobile/responsive behavior:** Open --- Owner/Architect alignment
-   **Performance:** Open --- Owner/Architect alignment
-   **Regression tolerance:** Open --- Owner/Architect alignment
-   **Accessibility/usability:** Open --- Owner decision
-   **Evidence required before publication:** Link to the existing
    verification workflow; resolve any gap through the current
    governance process

Avoid placing unverified numeric thresholds here merely because an agent
proposed them.

## 7. Decision rights

This section should confirm the current governance, not silently amend
it.

-   **Owner:** Product intent and decisions reserved to the Owner under
    existing governance.
-   **Architect:** Technical arbitration within approved product
    constraints.
-   **Implementer:** Implements accepted work within scope and reports
    deviations.
-   **Verifier:** Executes required checks and reports actual results.
-   **Advisors:** Offer evidence-based proposals; they do not authorize
    their own changes.

**Owner-approved clarification or exceptions:** Open --- resolve through
the existing process.

If this worksheet conflicts with binding governance, do not treat the
worksheet as an override.

## 8. Change control

-   **Changes always requiring explicit Owner approval:** Open --- Owner
    decision, consistent with existing governance
-   **Technical decisions the Architect may make within existing
    authority:** Open --- Owner/Architect alignment
-   **Changes to data, scoring, simulation, deployment, or publication
    requiring separate proposals:** Open --- Owner decision
-   **How urgent fixes are handled without bypassing verification:**
    Open --- Owner/Architect alignment

Do not use this worksheet to grant authority that is not already
authorized.

## 9. Relationship to existing documents

Confirm the current versions before relying on this map.

-   `AGENTS.md`: binding rules and invariants; retain its stated
    precedence.
-   `MASTER_GUIDE.md`: navigation and work sequence.
-   `STATUS.md`: current build, round, roles, blockers, and next step.
-   `COLLECTIVE-PROMPT.md`: implementer role and delivery contract.
-   `SUBMISSIONS.md`: formal proposals and status lifecycle.
-   `QUESTIONS-FOR-THE-ARCHITECT.md`: unresolved technical/architectural
    questions.
-   `GOVERNANCE-ROUNDTABLE.md`: governance discussion and Owner
    decisions.
-   `CHRONICLE.md`: append-only factual history.
-   `tests/` and related documentation: executable contracts and
    verification rules.

Maintain one authoritative home for each rule. Link to it elsewhere
instead of copying the rule into multiple files.

## 10. Review and approval record

-   **Prepared by:** Open
-   **Reviewed by:** Open
-   **Owner approval date:** Open
-   **Decision record / reference:** Open
-   **Relevant build/hash, if applicable:** Record only if verified

### Before this becomes authoritative

-   [ ] The current checkout was checked to confirm this document is
    needed.
-   [ ] Product purpose and primary users are explicit.
-   [ ] Goals and non-goals are intentional.
-   [ ] Priority trade-offs are explicit.
-   [ ] Product invariants are testable or have a defined review method.
-   [ ] Data provenance expectations are explicit.
-   [ ] Decision rights align with binding governance.
-   [ ] Conflicts with existing documents are explicitly resolved.
-   [ ] Owner approval is recorded in the existing process.
-   [ ] An authorized maintainer applies the approved change.
-   [ ] The resulting diff is reviewed.
