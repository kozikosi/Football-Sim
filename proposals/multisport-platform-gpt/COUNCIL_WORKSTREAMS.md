# Council Workstreams and Handoffs

**Status:** Proposed operating model for Claude, GPT, and council contributors. It assigns no real person or model to a task.

The council is useful when it returns evidence that reduces implementation uncertainty. Its job is not to produce a majority vote or to increase the number of parallel edits. The Owner decides product concepts, Claude leads existing simulator implementation, and GPT contributes as co-architect through review, proposals, evidence, and separately identified changes.

## Workstreams by priority

### W0 — Current NFL and V21

**Purpose:** Deliver the best agreed V21 experience without destabilizing current behavior.

**Suggested lead:** Claude as implementation lead. The Owner sets desired behavior and visual direction. GPT and council reviewers can independently inspect requirements, coupling, regressions, and evidence.

**Work can include:** acceptance criteria, responsive behavior review, assembled-build verification, critical regression checks, exact build/run commands, and evidence-backed UI feedback.

**Boundary:** Do not add other sports or historical data to V21 unless the Owner explicitly folds that scope into V21.

### W1 — Product architecture and Owner concepts

**Purpose:** Resolve stable terminology, engine boundaries, mode identity, and unanswered foundational rules.

**Deliverables:** repo inventory, proposed contracts, decision records, and question batches limited to five high-value questions at a time.

**Boundary:** Document recommendations and uncertainty. Do not rename or restructure the current app until the Owner and Claude accept a specific change.

### W2 — NFL All-Time data and rules

**Purpose:** Prepare a credible candidate pool and rating rubric while preserving current NFL mode.

**Deliverables:** position/role taxonomy proposal, candidate shards, source evidence, rating rubric, review log, and explicit mode adjustments.

**Boundary:** No edits to current NFL defaults or protected constants. Keep dataset research separate from integration until accepted.

### W3 — Current NBA concept, data, and model

**Purpose:** Translate the product flow the Owner likes into basketball-specific rules and math.

**Deliverables:** NBA concept questions, roster/rotation model, data schema proposal, NBA2K mapping sample, and deterministic examples.

**Boundary:** Do not reuse NFL position logic simply because the product flow is familiar. Owner-provided NBA2K data remains raw source data until its mapping is approved.

### W4 — NBA All-Time

**Purpose:** Design historical NBA eligibility, era representation, and ratings on the NBA system.

**Dependency:** The NBA engine contract and current mode’s required attributes must be understood before the historical transformation is finalized.

**Can begin early:** candidate inclusion principles and era questions can be researched independently.

**Boundary:** Do not treat a modern video-game rating as an era-neutral historical rating.

### W5 — MLB and NHL preparation

**Purpose:** Capture domain questions, source feasibility, and sport-specific modeling risks after the first four projects establish a usable pattern.

**Boundary:** Research can be recorded without implementing engines or taking priority away from W0–W4.

### W6 — Soccer competition configuration

**Purpose:** Confirm league selection, roster data, season structure, and what “draft season simulation” means in a sport usually organized around transfers and academies.

**Boundary:** The ranking list is a dated scope proposal; refresh and approve it when work starts. Do not infer that every competition requires a copied engine.

## Parallel-work rules

1. Assign one accountable owner per task and one person responsible for integration.
2. State allowed paths and protected paths before editing.
3. Keep simultaneous contributors in separate branches or separate files. Do not ask two agents to update the same document or dataset shard at once.
4. Use disjoint candidate shards for rating work, with an explicit reviewer.
5. Collect independent verdicts, not vague consensus. If reviewers disagree, preserve both claims and the evidence needed to resolve them.
6. No plan is “settled” until its assembled build or integrated artifact has been exercised through the relevant workflow.
7. Keep a single canonical status and decision location after the repository owner identifies it. Do not create parallel count tables or append stale status summaries indefinitely.
8. An unanswered Owner question is not an invitation to encode a silent guess. Record a reversible default only when the impact is low and label it clearly.
9. Council members should return the smallest useful result: verdict, evidence, command/output, files changed, unresolved risk, and next decision.
10. Keep V21 protected as the first priority. Parallel research is welcome; hidden scope expansion is not.

## Suggested review loop

1. Claude or the task owner posts a task packet with scope, branch, files, acceptance checks, and constraints.
2. Contributors acknowledge by claiming a specific task or file.
3. One contributor produces the artifact and evidence.
4. A separate reviewer checks it against acceptance criteria.
5. The integrator assembles the change and runs the full relevant path.
6. The Owner resolves product decisions.
7. The result is recorded once in the repository and the stale task status is closed or updated.

No one should interpret a comment, model persona, or title as authority to override the Owner’s product choices or Claude’s protected implementation boundary.
