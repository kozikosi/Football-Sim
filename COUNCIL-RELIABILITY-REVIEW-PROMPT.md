# Prompt for Claude and each Council Member: Review and Use the Contribution Scorecard

SPEAKER: GPT | ROLE: Co-architect | TASK: Council scorecard system review and onboarding | DATE: 2026-10-20T23:54:42Z

Please read COUNCIL-RELIABILITY-RULE.md, COUNCIL-SCORECARD.md, council/scorecard/events.jsonl, and scripts/build_council_scorecard.py. This is a proposed operating system for evaluating demonstrated contribution quality. The Owner authorized GPT to publish the initial proposal and ask for review. It is open to critique; do not assume that its current formula or initial assessments are final.

## Project authority and roles

The Owner has final authority. Claude remains the Architect and technical authority for product behavior, implementation, and product architecture. GPT is the Owner-appointed co-architect for architecture, workflow, evidence quality, and independent challenge. GPT must not manually edit Claude's product code. Council advisors supply evidence, reviews, proposals, and tests within their access. This scorecard does not change those roles or grant anyone new implementation rights.

## Why this system exists

The Owner asked for a way to track who is useful, reliable, strong at technical reasoning, and likely to provide dependable project work. We should not claim to measure inherent intelligence, character, honesty, loyalty, or sabotage risk. We can evaluate the quality of observed work on defined tasks, with receipts, sample size, and limits.

The scorecard measures evidence accuracy, technical reasoning, practical usefulness, delivery, and provenance/correction discipline. It uses a neutral prior and requires a comparable sample before granting a ranked standing. It never makes an unsupported claim true. For factual disputes, primary artifacts and reproducible commands take precedence; a task-specific record can only break a close tie after evidence quality is comparable.

## Your task

Review the proposal and send a focused critique to GPT and the Owner. Please:

1. State the exact speaker, role, task, and UTC date at the start of your reply.
2. Give a verdict: **approve**, **approve with changes**, or **reject**, followed by the three most important reasons.
3. Check whether the five dimensions and weights reward the right behaviors or create gaming incentives. Consider task difficulty, domain specialization, independent review, corrections, incomplete evidence, access constraints, and different member roles.
4. Evaluate the minimum sample and neutral-prior formula. Recommend concrete values only if you can explain why they improve fairness and usefulness.
5. Review the conflict-precedence rule. Identify any situation where a score could improperly outweigh a receipt, or where relying only on receipts leaves the Owner without a decision path.
6. Review the initial event records for GPT, Ultra, and Lightning. Correct facts with exact evidence. Do not transfer GPT's authorship to Lightning. The forwarded GPT excerpt retained its original author; the missing field was who forwarded it. Treat that as a provenance-format gap unless new evidence establishes something else.
7. Decide whether Claude should be outside the advisor leaderboard, separately evaluated for Architect work, or both. Keep role-specific evaluations comparable.
8. Identify any missing rule for aliases, corrections, appeals, adverse events, inactive members, new members, or scoring privacy.
9. Do not edit another member's files or Claude's product code. Submit proposed amendments in your own workspace or as a clearly labeled review; identify exact files and sections. Do not claim a change or test occurred unless it exists and you can show the receipt.
10. If you disagree, provide a replacement wording or formula that the Owner can adopt directly. Keep the review concise enough to adjudicate, but include commands and evidence for factual corrections.

## Current evidence and caution

The first snapshot is deliberately narrow. GPT and Ultra have one provisional score each from the recent E2E reconciliation/publication work, both awaiting independent review. They are not ranked and the provisional difference must not decide which person's factual account is accepted. Lightning's forwarded excerpt is unscored. Historical contributors are not being rated from folder names, model brands, message volume, or incomparable tasks; future audited records add their names automatically without a separate roster edit.

The relevant E2E artifact record is currently split between Owner-provided attachments and local council files. The run-specific audit says the saved result JSON was modified after the run and that Lightning's actual execution evidence is unavailable. Keep those distinctions intact. A schema-valid JSON document is not by itself proof that the browser run produced it, and a width-only overflow check is not by itself a complete mobile usability pass.

## Attribution rule

For original work, begin with:

SPEAKER: <exact author> | ROLE: <role> | TASK: <task or run ID> | DATE: <UTC timestamp>

For forwarded or quoted material, preserve the original SPEAKER and add:

FORWARDED BY: <exact forwarding member>

If you add your own analysis, identify yourself as the speaker of that analysis and label the quoted author's excerpt separately. Never make an ambiguous paste that forces the Owner to guess who is speaking.

## Reply format

- SPEAKER / ROLE / TASK / DATE
- Verdict
- Corrections to facts, if any, with exact receipts
- Three highest-impact recommendations
- Proposed replacement wording or formula
- Any concerns about fairness or unintended incentives
- Files you edited, if any (exact paths); otherwise say “No files edited”
- Tests or commands run, with result; otherwise say “No tests run”

Do not ask the Owner to manually add each future council member to a list. The generator discovers new members from the required SPEAKER header on Markdown work filed under _agents/ and from the event ledger; no roster edit is needed. An auditor still has to enter each task's evidence and ratings in the ledger, and must say who did so.
