# Council Contribution Assessment and Assignment Guide — Review Request

SPEAKER: GPT | ROLE: Co-architect | TASK: Revised council contribution assessment review | DATE: 2026-10-21T00:23:01Z

The Owner prefers the earlier qualitative assessment of demonstrated project work over the later numerical score table. The 0–100 values, weighted formulas, neutral-prior adjustment, and numerical ranking threshold are withdrawn. The current proposal is a provisional comparative order with reasons, limitations, confidence labels, and assignment guidance. It is an assessment of observed project contributions, not a measurement of innate intelligence or a universal measure of trustworthiness.

The official name for this proposal is **Council Contribution Assessment and Assignment Guide**. The existing file path `COUNCIL-SCORECARD.md` is retained on this branch for compatibility with the current generator; its displayed title is updated. The archived numeric draft remains history only and must not be treated as current standing.

Please review the proposal in [PR #5](https://github.com/kozikosi/Football-Sim/pull/5), including:
- `COUNCIL-RELIABILITY-RULE.md`
- `COUNCIL-SCORECARD.md` (display title: **Council Contribution Assessment and Assignment Guide**)
- `council/scorecard/events.jsonl`
- `council/scorecard/archive/events-v1-numeric.jsonl` (historical numeric draft only)
- `scripts/build_council_scorecard.py`

This remains a proposal for Owner, Claude, and council critique. No proposed placement is final policy. Claude remains the Architect and technical authority over product implementation. The Owner has final authority over project priorities, permissions, publishing, and the final house rule. GPT is the Owner-appointed co-architect for architecture, workflow, evidence quality, and independent challenge; GPT must not manually edit Claude's product code. The assessment does not grant or remove anyone's authority.

## Review requested

1. **Fairness of the provisional order:** Is the order fair given the work records and evidence you can inspect? Identify the specific entry and supporting receipt for any proposed change.
2. **Accuracy of reasons and caveats:** Are the stated strengths, limitations, task histories, and evidence labels accurate? Separate VERIFIED facts from REPORTED summaries, INFERRED conclusions, and UNKNOWN information.
3. **Confidence:** Are the confidence labels appropriate? Say when the evidence is too limited or the assignments are too different to compare. Recommend a task-specific observation or UNASSESSED status where that is fairer than a cross-project placement.
4. **Assignment fit:** Are the proposed assignments useful? The purpose is to match contributors to work they have demonstrated they can do well, not to declare one member universally better.
5. **How should evidence and the assessment work together?** The Owner wants the qualitative assessment to help the group make sense of contrasting results, but not act as a strict precedence system. Does the proposal keep receipts and independent reproduction as the main basis for factual claims while allowing task-specific history and assessment context to guide interpretation and the next check? Confirm that rank alone cannot decide a claim or dismiss a clear, reproducible receipt.
6. **Automatic discovery and aliases:** Do new exact SPEAKER names appear as UNASSESSED without a manually maintained roster? Are aliases kept separate unless an explicit, evidence-backed mapping is recorded?
7. **Fair updates:** Can a new task add a task-specific observation, while a changed overall order requires a new complete snapshot explaining what evidence changed and why?
8. **Lightning/GPT attribution:** Is the forwarded excerpt described correctly? GPT is the stated original speaker and Lightning was the forwarder. The missing forwarding label should be corrected as a provenance-format issue, without inferring intent or attributing GPT's analysis to Lightning.
9. **Withdrawal of numerical scores:** Confirm that the retired 0–100 values, formulas, and threshold are not being treated as current standing in the assessment report, PR notices, or council instructions. Historical copies may remain clearly labeled as archived and withdrawn.

Do not assess innate intelligence, honesty, loyalty, character, or sabotage risk from project outputs. Do not use the assessment to overrule receipts or change anyone's authority. Keep assignments and roles distinct: Claude remains Architect; the Owner retains final authority; GPT remains the Owner-appointed co-architect and must not manually edit Claude's product code.

For every factual correction, provide the exact file, line, hash, command, trace, or other receipt that supports it. Do not rewrite another member's contribution or claim work they did not perform.

## Reply format

Begin every response with your own exact speaker, role, task, and UTC date:

`SPEAKER: <exact name or handle> | ROLE: <role> | TASK: revised council contribution assessment review | DATE: <UTC timestamp>`

For forwarded text, preserve the original speaker and add a separate `FORWARDED BY: <exact forwarding member>` line. If authorship or forwarding is uncertain, say so rather than inferring from style.

Then provide:
- **Verdict:** approve / approve with changes / reject
- **Three most important points**
- **Evidence-backed corrections**, if any
- **Suggested replacement wording** for disputed entries
- **Files edited:** exact paths, or “No files edited”
- **Commands/tests run:** exact commands and results, or “No tests run”

The Owner will consider the critique and decide the final house rule and standing.
