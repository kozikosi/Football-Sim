# Beam — review of PR #1 (GPT multisport strategy proposal)

**Status:** advisory review. PR #1 is OPEN on kozikosi/Football-Sim (1,065 additions, 0 deletions, 10 files). Author: kozikosi (Owner's account). This review is Beam's independent assessment.

## Overall assessment

The proposal package is well-structured, thorough, and largely aligned with the council's existing multi-sport plan. It adds valuable detail on data provenance, rating standards, council workstreams, and a question generator. However, it creates a parallel question system, its target architecture conflicts with the single-file constraint, and it does not reference the council's existing work. Specific findings below.

## Findings

### F1. Target architecture conflicts with the single-file constraint

- **Claim:** The conceptual target tree (`apps/web/`, `packages/simulation-contracts/`, `packages/web-components/`, `packages/sports/`, `data/`, `docs/`) implies a multi-file build with a bundler and framework.
- **Evidence:** AGENTS.md §Prohibited Actions: "Split the single HTML file without explicit request." The PR's TARGET_ARCHITECTURE.md says "Do not split files, add a framework, or migrate data just because the target tree below contains folders" — so it acknowledges the constraint. But the tree is still misleading.
- **Impact:** New agents reading the proposal may assume a multi-file architecture is approved. The tree should be labeled as aspirational, not a plan for V21.
- **Replacement:** Add a prominent note at the top of TARGET_ARCHITECTURE.md: "This tree is aspirational. The current product is a single HTML file (AGENTS.md constraint). No split without Owner approval. The tree maps responsibilities, not a migration plan."

### F2. Creates a parallel question system

- **Claim:** The PR adds `OWNER_QUESTIONS.md` and `owner-questions.json` with 13 questions, separate from the council's `QUESTIONS-FOR-OWNER.md` (25+ questions) and `_multi-sport/QUESTIONS-FOR-OWNER.md`.
- **Evidence:** Three question systems now exist: (1) `QUESTIONS-FOR-OWNER.md` (council, in `_multi-sport/`), (2) `QUESTIONS-FOR-THE-ARCHITECT.md` (council, root), (3) `OWNER_QUESTIONS.md` + `owner-questions.json` (GPT's PR). The question generator only reads from `owner-questions.json`.
- **Impact:** Questions asked in one system won't be visible in the others. The Owner will be asked the same question twice. The council's questions (Q-NFL-AT-1, Q-NBA-1, etc.) are not in GPT's JSON catalog.
- **Replacement:** Reconcile the two systems. Either merge GPT's JSON catalog into the council's `QUESTIONS-FOR-OWNER.md` (with the generator reading from a shared file), or have GPT's catalog reference the council's questions. Do not maintain two parallel question systems.

### F3. Does not reference the council's existing work

- **Claim:** The PR's README says "This package translates the Owner's long-range goal into a staged product and architecture proposal." It does not mention the council's existing `_multi-sport/` folder, `DECISION-LOG.md`, `KNOWN-ISSUES.md`, `COUNCIL-DIGEST.md`, `MERGE-MANIFEST.md`, or any council document.
- **Evidence:** The `_multi-sport/` folder (created by Beam, M-61) contains README.md, STRUCTURE.md, CONTRIBUTION-GUIDE.md, QUESTIONS-FOR-OWNER.md, DATA-SCHEMA.md, shared/, nfl-alltime/, nba-current/, nba-alltime/, other-sports/. The PR's `CONTRIBUTOR_GUIDE.md` says "Follow the repository's actual AGENTS.md" but doesn't reference `_multi-sport/`.
- **Impact:** Agents reading the PR may think the council hasn't started multi-sport work. This creates duplicate effort and confusion about which documents are canonical.
- **Replacement:** Add a "Relationship to existing council work" section to the PR's README.md referencing `_multi-sport/`, `DECISION-LOG.md`, `KNOWN-ISSUES.md`, etc. State clearly: "This proposal builds on the council's existing multi-sport plan (`_multi-sport/README.md`) and adds data/rating standards, council workstreams, and a question generator."

### F4. The 5-layer data model is better than Beam's templates — recommend adopting it

- **Claim:** GPT's `DATA_AND_RATING_STANDARD.md` proposes a 5-layer data model (source observation → normalized record → rating transformation → mode adjustment → simulation input) that preserves source values and records transformations.
- **Evidence:** Beam's `DATA-SCHEMA.md` and `players-template.json` use a flat schema with a `source` field but no transformation layer. GPT's model is more sophisticated.
- **Impact:** If adopted, the council's data templates should be updated to include the 5-layer model. This is a genuine improvement.
- **Replacement:** Adopt GPT's 5-layer data model. Update `_multi-sport/DATA-SCHEMA.md` and the `players-template.json` files to include source observation, normalized record, transformation, mode adjustment, and simulation input layers.

### F5. The soccer catalog includes EFL Championship (rank 10) — correctly flagged

- **Claim:** The PR includes EFL Championship (rank 10) in the 17-league list, noting it's a second-tier league.
- **Evidence:** The Owner said "all the ones ranked above MLS and including MLS." EFL Championship is rank 10, above MLS (rank 17). So it's included by the rule. GPT correctly flags this as needing clarification.
- **Impact:** None — this is a correct interpretation of the Owner's rule. The clarification question is appropriate.
- **Replacement:** None. Keep as-is, but note in the catalog that the Owner may want to exclude second-tier leagues.

### F6. The question generator is good tooling — should be adopted

- **Claim:** `generate_owner_questions.py` prints up to 5 open questions per project, sorted by priority and project order.
- **Evidence:** The script reads from `owner-questions.json`, filters by status "open" and project, sorts by priority, and prints a formatted batch. It does not modify the catalog.
- **Impact:** Good tooling. Should be adopted, but should read from the council's `QUESTIONS-FOR-OWNER.md` as well (or replace it).
- **Replacement:** Either (a) migrate the council's questions into GPT's JSON format and use the generator, or (b) add a generator that reads from `QUESTIONS-FOR-OWNER.md`. Do not maintain two parallel question systems.

### F7. The PR doesn't reference the merge or V21 stabilization

- **Claim:** The PR is focused on multisport strategy. It does not reference the merge (which has already happened), the merged build hash, the verification results, or V21 quality work.
- **Evidence:** The PR's ROADMAP_AND_GATES.md says "Stage 0 — Protect and finish current NFL V21" but doesn't reference the merged build (40233d6b…, 657,486 B) or the smoke-test results (exit 0, A=true, B=0, C=0, D=true).
- **Impact:** The PR reads as if the merge hasn't happened yet. It should acknowledge the merged build and the verification results.
- **Replacement:** Add a note to ROADMAP_AND_GATES.md Stage 0: "The merge candidate (40233d6b…, 657,486 B) has been built and passes all acceptance criteria (post-merge-smoke.mjs exit 0). Verifier sign-off and tag/rename are pending."

### F8. The PR's `CONTRIBUTOR_GUIDE.md` is good but duplicates existing council rules

- **Claim:** The contributor guide covers safe boundaries, evidence, task packets, completion notes, and productive disagreement.
- **Evidence:** The council already has `CONTRIBUTION-GUIDE.md` (in `_multi-sport/`) with similar content (claim work, do work, verify, submit, data/math guidelines, rules, encouragement).
- **Impact:** Two contributor guides with overlapping content. Agents may read one and miss the other.
- **Replacement:** Merge the two guides. GPT's is more formal (task packets, completion notes); Beam's is more council-specific (ID blocks, M-numbers, SUBMISSIONS.md workflow). Combine the best of both.

### F9. The PR doesn't acknowledge the council's collaborative files

- **Claim:** The PR creates 10 new files in `proposals/multisport-platform-gpt/` but doesn't reference the council's existing collaborative files (`DECISION-LOG.md`, `KNOWN-ISSUES.md`, `VERIFICATION-CHECKLIST.md`, `COUNCIL-DIGEST.md`, `MERGE-MANIFEST.md`, `PROMPTS-TO-ARCHITECT.md`, `COMMUNICATION-PROTOCOL.md`, `v21-roadmap.md`, `multi-sport/` folder).
- **Evidence:** The PR's README says "This package translates the Owner's long-range goal into a staged product and architecture proposal." No mention of existing council work.
- **Impact:** Agents reading the PR may think the council hasn't started multi-sport work. This creates duplicate effort.
- **Replacement:** Add a "Relationship to existing council work" section to the PR's README.md referencing `_multi-sport/`, `DECISION-LOG.md`, `KNOWN-ISSUES.md`, etc.

### F10. The `TARGET_ARCHITECTURE.md` decision tests are excellent

- **Claim:** The PR includes 7 decision tests for any proposed abstraction (which two+ use cases need it, what duplication it removes, does it keep sport-specific terms understandable, etc.).
- **Evidence:** These are concrete, actionable criteria that prevent premature abstraction.
- **Impact:** Positive. These tests should be adopted by the council. They align with the council's evidence culture.
- **Replacement:** None. Adopt as-is. Consider adding them to `CONTRIBUTION-GUIDE.md` or `AGENTS.md`.

## Summary of recommendations

| #   | Finding                                                   | Action                                              |
| --- | --------------------------------------------------------- | --------------------------------------------------- |
| F1  | Target architecture conflicts with single-file constraint | Label tree as aspirational, not a migration plan    |
| F2  | Parallel question system                                  | Reconcile with council's `QUESTIONS-FOR-OWNER.md`   |
| F3  | Doesn't reference council's existing work                 | Add "Relationship to existing council work" section |
| F4  | 5-layer data model is better than Beam's templates        | Adopt GPT's model, update templates                 |
| F5  | Soccer catalog includes EFL Championship                  | Keep as-is, note Owner may exclude second-tier      |
| F6  | Question generator is good tooling                        | Adopt, but read from shared question file           |
| F7  | Doesn't reference merge or V21 stabilization              | Add merged build hash and smoke-test results        |
| F8  | Contributor guide duplicates existing council rules       | Merge the two guides                                |
| F9  | Doesn't acknowledge council's collaborative files         | Add reference section                               |
| F10 | Decision tests for abstractions are excellent             | Adopt as-is                                         |

## Verdict

**Sound with changes.** The proposal is well-structured, thorough, and largely aligned with the council's existing multi-sport plan. The data/rating standard (5-layer model), the contributor guide (task packets, completion notes), the question generator, and the decision tests for abstractions are genuine improvements. The main issues are: (1) the target architecture tree conflicts with the single-file constraint and should be labeled aspirational, (2) the parallel question system should be reconciled with the council's existing one, and (3) the proposal should acknowledge and build on the council's existing multi-sport work rather than appearing to start from scratch.

No product edits. No protected-constant changes. Advisory review only.
