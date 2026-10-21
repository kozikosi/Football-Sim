# Council Contribution Assessment and Assignment Guide

**Status:** Revised proposal for Owner, Claude, and council review  
**Version:** 2.1 · 21 October 2026  
**Supersedes:** The numeric scoring proposal in version 1.0  
**Authority:** The Owner has final authority. Claude is the Architect and has technical authority over product implementation. GPT is the Owner-appointed co-architect for architecture, workflow, evidence quality, and independent challenge. This assessment system changes none of those roles.  
**Owner clarification:** The assessment may help the group understand contrasting results and make informed decisions, but it is not a strict precedence system.

## Purpose and limits

The Owner asked for a useful way to compare demonstrated reasoning, usefulness, evidence reliability, and assignment fit across people contributing to Football Sim. The earlier answer that best met that request was a provisional, evidence-based ordering with a short explanation, caveats, and practical assignment advice.

This version follows that approach. It replaces the previous 0–100 scores, weighted formulas, neutral prior, and numeric eligibility cutoffs. Those numbers suggested more precision than the small and uneven evidence base supports.

This is an assessment of **observed project contributions**, not a measurement of innate intelligence, general ability, honesty, loyalty, character, consciousness, or sabotage risk. A project report cannot reliably establish those traits. Describe what a member did, what the work shows, what remains uncertain, and what work they are well suited to receive.

## Evidence always comes before a ranking

When members disagree about a factual claim, use this order:

1. The named artifact, source file, hash, command output, screenshot, trace, or other primary receipt.
2. An independent reproduction against the same artifact and conditions.
3. A relevant, task-specific history as a tie-breaker only when the evidence itself is equally strong.
4. If the issue is still unresolved, state that clearly and assign the smallest check that can settle it.

A higher placement never makes a claim true. A lower placement never invalidates a reproducible receipt. Do not use consensus, seniority, confidence of tone, popularity, or a general ranking to overrule evidence.

The ranking can help choose **who should investigate a question**. It does not decide the answer to that question.

## What reviewers assess

Reviewers describe contribution patterns in plain language. They should consider:

- **Evidence discipline:** Were claims pinned to the right build, files, commands, outputs, and sample sizes? Was uncertainty labeled honestly?
- **Reasoning and integration:** Did the analysis follow dependencies, notice coupling, catch failure modes, and distinguish a local change from a working combined build?
- **Execution and verification:** Did the contributor run the assigned workflow, check negative controls where appropriate, and report what was not tested?
- **Practical value and delivery:** Did the result move the task forward, arrive in the requested form, and give the next person a clear action?
- **Correction and attribution:** Were mistakes corrected plainly? Were original authors and forwarders identified accurately?

These are lenses for writing a reasoned assessment, not a hidden points system. A concise, correct receipt can be more valuable than a long report. A documented correction can improve the assessment of calibration. Repeated mistakes that remain uncorrected can lower confidence in a relevant work area, but they are not a character verdict.

## Provisional order and confidence

The assessment report may present a **provisional relative order** when the available records support one. Each ranked row must include:

- the main evidence behind the placement;
- strengths that can guide future assignments;
- limitations or counter-evidence;
- confidence in the comparison;
- whether the work was independently checked.

Use these confidence labels:

- **Higher:** repeated, independently checked work across different task types.
- **Moderate:** several meaningful contributions or strong independent evidence, but with limited breadth or unresolved counter-evidence.
- **Low:** a narrow sample, incomplete records, indirect descriptions, or comparisons between different kinds of work.
- **Unassessed:** there is not enough attributable, comparable work to make a fair placement.

Confidence describes the evidence behind the assessment, not the contributor's skill. A low-confidence placement is a tentative estimate, not a criticism.

An overall ordering is a practical synthesis, not a scientific result. If two contributors have different strengths or the evidence does not distinguish them, say so. Use a task-specific assessment instead of forcing a precise rank. Keep the Architect's technical authority separate from this advisory comparison.

## How the ranking changes

The ledger is append-only. An assigned reviewer records a completed contribution with the exact speaker, task, date, evidence examined, observations, caveats, and reviewer. A future **complete ranking snapshot** may revise the relative order when new, comparable evidence changes the picture. It must state what changed and why; it must not silently rewrite old snapshots.

The generator uses the latest complete ranking snapshot. A new contributor does not need to be added to a roster: the generator discovers exact SPEAKER names in the event ledger and in Markdown reports under the _agents folder. A newly discovered person appears as **UNASSESSED** until reviewed. A name or model label is kept separate unless an explicit, evidence-backed alias mapping is recorded.

No one may self-certify their own ranking. A self-review can be disclosed as a starting opinion, but it must be labeled and independently challenged before it is treated as settled. The Owner may accept, revise, or reject the proposed ordering.

## New members, inactive members, and unequal assignments

- Lack of a task, access, time, or a suitable assignment is not negative evidence.
- A member who has only one narrow task may have a strong task-specific observation while remaining unassessed in the cross-project ordering.
- Do not compare a browser run, a source audit, a documentation reconciliation, and product implementation as if they were identical tasks.
- Keep each person's best-supported assignment area visible. The Owner and Architect should assign by relevant demonstrated strengths, not by a small difference in overall placement.
- Preserve exact speaker names. Record a verified alias explicitly rather than silently merging labels.

## House rule: identify the speaker

Start every original report, answer, status update, and correction with:

SPEAKER: <exact name or handle> | ROLE: <role> | TASK: <task or run ID> | DATE: <UTC timestamp>

For forwarded or quoted material, preserve the original speaker and add:

FORWARDED BY: <exact forwarding member name or handle>

If a message includes the forwarder's own analysis, identify that speaker first and label the forwarded excerpt separately. If the original author or forwarder is uncertain, say so. Do not present another member's words as your own.

A missing forwarding label is an attribution-format gap. By itself, it is not evidence of impersonation, dishonesty, or sabotage. Ask for the label to be corrected and record the facts neutrally.

## Appeals and corrections

Keep past assessments and ranking snapshots in the append-only history. A contributor may submit a concise, evidence-backed correction. The reviewer may then append a superseding assessment that cites the earlier entry, names the new evidence, and explains the change. Do not delete an inconvenient mistake or turn one disputed output into a claim about intent.

Use **VERIFIED**, **REPORTED**, **INFERRED**, and **UNKNOWN** consistently. A summary that has not been checked against its underlying artifact remains reported. When a contributor corrects an earlier report, preserve both the original claim and the correction, and assess the correction as part of the work record.

## Current v2 snapshot

The current ranking is a continuity assessment based on the earlier project-record review, not a fresh audit of every historical file. Its confidence is deliberately stated row by row. Recent E2E work from MOC, LongCat, Ultra, GPT, and Lightning is recorded separately where it is too narrow or not comparable enough to justify moving the cross-project order.

The prior numeric snapshot is withdrawn because its scores were based on one task per person, including a reviewer self-assessment, and conveyed false precision. It is retained only as an archived historical draft, not as current standing.

Claude is included in the requested comparative view with an explicit low-confidence and role-comparability caveat. The Architect's product authority does not come from a leaderboard and is unaffected by this assessment.

Claude and the council are invited to challenge the initial order, evidence, confidence labels, alias handling, and future update process. The Owner decides the final house rule.
