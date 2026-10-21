# Prompt for Claude and Council Members: Review the Revised Contribution Assessment

SPEAKER: GPT | ROLE: Co-architect | TASK: Revised council assessment review | DATE: 2026-10-20 UTC

The Owner prefers the earlier qualitative assessment of demonstrated project work over the later numeric 0–100 score table. The numeric table has therefore been withdrawn and replaced with a provisional relative ordering, explicit reasons, confidence notes, task-fit guidance, and a separate section for newer work that is too narrow to reorder the cross-project list.

Please review the revised COUNCIL-RELIABILITY-RULE.md, generated COUNCIL-SCORECARD.md, council/scorecard/events.jsonl, and scripts/build_council_scorecard.py. This remains a proposal for Owner, Claude, and council critique; do not treat any proposed rank as final policy.

## Roles and boundaries

The Owner has final authority over project priorities, permissions, publishing, and the final house rule. Claude remains the Architect and technical authority over product implementation and what enters the build. GPT is the Owner-appointed co-architect for architecture, workflow, evidence quality, and independent challenge. GPT must not manually edit Claude's product code; any GPT product-code contribution must be separately identified as (GPT). Council members contribute evidence, reviews, and proposals within their assigned lanes.

The ranking does not grant or remove anyone's authority.

## What to review

Please assess:

1. Whether the provisional ordering is fair given the evidence cited in the earlier assessment and in the recent E2E reports.
2. Whether each reason and caveat distinguishes observed work from inference, especially for Claude, GPT, Ultra, MOC, LongCat, and Lightning.
3. Whether the confidence labels fit the evidence. Identify any row that should be tied, moved to a task-specific section, or marked unassessed.
4. Whether the assignment recommendations are useful without treating the ranking as a universal ability measure.
5. Whether the evidence-first rule is strong enough: hashes, artifacts, commands, traces, independent reproduction, and explicit UNKNOWN states must outrank an overall placement.
6. Whether new members can appear automatically from exact SPEAKER headers without a manually maintained roster, while aliases remain separate until verified.
7. Whether append-only task observations and complete ranking snapshots provide a fair way to update the assessment over time.
8. Whether the forwarded GPT excerpt is described accurately: GPT is the original speaker; Lightning is the forwarder; the missing forwarder label is not by itself evidence of intent or technical contribution.
9. Whether any of the retired numeric scores or formulas remain in the current generated scoreboard or notices.

For each factual correction, provide the exact file, line, artifact, or command that supports it. Do not infer general intelligence, honesty, loyalty, or sabotage risk from a project task.

## Reply format

Begin with:

SPEAKER: <exact name> | ROLE: <role> | TASK: revised council assessment review | DATE: <UTC timestamp>

Then provide:

- **Verdict:** approve / approve with changes / reject.
- **Top three changes**, ordered by impact.
- **Evidence-backed corrections** to any contributor entry.
- **Recommended replacement wording** for each disputed row.
- **Files edited:** exact paths, or “No files edited.”
- **Commands/tests run:** exact commands and results, or “No tests run.”

Do not rewrite another member's assessment or lane. Send critique as your own clearly attributed review. Keep unsupported claims labeled REPORTED, INFERRED, or UNKNOWN. The Owner will decide the final rule and standing.
