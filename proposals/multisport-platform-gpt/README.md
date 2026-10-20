# Multisport Platform Strategy Proposal

**Status:** Proposal for review by the Owner, Claude, and the council. Nothing in this package is an approved product decision or an instruction to refactor V21.

This package translates the Owner’s long-range goal into a staged product and architecture proposal. It is intended to help the team make choices now that preserve room for future sports without distracting from the current NFL simulator and V21.

## Start here

1. [Product vision and scope](PRODUCT_VISION.md) — goals, priorities, target portfolio, and planning assumptions.
2. [Target architecture](TARGET_ARCHITECTURE.md) — folder and system boundaries, including what to share and what to keep sport-specific.
3. [Roadmap and acceptance gates](ROADMAP_AND_GATES.md) — a staged sequence that protects V21.
4. [Council workstreams](COUNCIL_WORKSTREAMS.md) — parallel work with explicit ownership and integration rules.
5. [Contributor guide](CONTRIBUTOR_GUIDE.md) — task packets, evidence, file ownership, and safe review.
6. [Data and rating standard](DATA_AND_RATING_STANDARD.md) — all-time pools, provenance, NBA2K inputs, and rating adjustments.
7. [Owner question system](OWNER_QUESTIONS.md) — how to ask for conceptual decisions in small, useful batches.
8. [Soccer competition catalog](SOCCER_COMPETITION_CATALOG.md) — a dated starting set of competitions based on the stated MLS cutoff.
9. [Decision record template](DECISION_RECORD_TEMPLATE.md) — a small format for capturing decisions once.

A small question-bank generator is also included:
- Question records: [owner-questions.json](owner-questions.json)
- Generator: [generate_owner_questions.py](tools/generate_owner_questions.py)

From the repository root, a council member can print the next open questions with:

    python3 proposals/multisport-platform-gpt/tools/generate_owner_questions.py --project nfl-current

The default output is limited to five questions. The script does not alter the question catalog or decide anything on the Owner’s behalf.

## Authority and boundaries

- The Owner has final authority over product concepts and priorities.
- Claude remains the lead author of the existing simulator and V21 implementation.
- GPT is contributing as co-architect by preparing proposals, review, evidence, and separately identified changes. This package does not modify Claude’s simulator code.
- Council members are reviewers and contributors within an explicitly assigned scope. They should challenge this proposal with evidence and alternatives; they should not treat it as settled because it is written down.
- Any accepted structural or product decision should be recorded in the repository’s canonical decision location after the team identifies that location. Until then, this package is a review artifact.

## Review requested

Please review for: product scope, whether “around 1,200” means per sport, the all-time definition, the NBA rating translation plan, sport boundaries, the soccer cutoff and simulation concept, and whether the proposed stage gates fit the actual V21 workflow. Submit concrete corrections with supporting files, commands, or examples. Avoid editing the same proposal file concurrently; claim a file or submit a separate review note.
