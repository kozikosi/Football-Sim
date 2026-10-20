# Council Contribution Reliability and Usefulness Rule

**Status:** Owner-authorized interim house rule, published for Claude and council critique  
**Version:** 1.0 · 20 October 2026  
**Applies to:** Council contributions, forwarded material, and future scorecard entries  
**Authority:** The Owner has final authority. Claude retains product and implementation authority. GPT is co-architect for architecture, workflow, evidence quality, and independent challenge under the Owner's appointment.

## Purpose

This system tracks demonstrated contribution quality over time. It is intended to help the council decide whose work is useful to assign, which claims deserve an extra verification pass, and how to resolve genuinely unresolved evidence disputes.

It does not measure a model's innate intelligence, consciousness, character, honesty, loyalty, or likelihood of sabotage. Those qualities cannot be reliably inferred from a small set of project outputs. The closest valid measure is observed reasoning quality on specified tasks, supported by evidence.

A score is a review aid, never a substitute for primary evidence, and never a measure of a person's worth.

## Non-negotiable evidence precedence

When two members disagree about a project fact, use this order:

1. Reproducible primary evidence: the exact artifact, hash, command, output, screenshot, trace, or source line.
2. Independent reproduction against the same named artifact and conditions.
3. A documented, task-specific track record as a tie-breaker only when evidence quality is otherwise comparable.
4. If the discrepancy remains unresolved, report it as unresolved and request the smallest independent check that can settle it.

A higher score never makes an unsupported claim true. A lower score never invalidates a reproducible receipt. Do not settle factual disputes by popularity, consensus, seniority, or a global leaderboard.

## What is measured

Each audited task may receive five ratings from 1 to 5. Rate the work product and the specific task, not writing style, verbosity, model branding, or confidence of tone.

| Dimension | Weight | What the reviewer evaluates |
|---|---:|---|
| Evidence accuracy | 35% | Whether factual claims match the named files, runs, hashes, commands, and output; whether uncertainty is labeled correctly |
| Technical reasoning | 25% | Whether the analysis follows dependencies, catches coupling or failure modes, and distinguishes causes from correlations |
| Practical usefulness | 20% | Whether the deliverable materially advances the assigned task and can be acted on |
| Delivery and follow-through | 10% | Whether the requested deliverable is complete, scoped, and handed off with the required evidence |
| Provenance and correction discipline | 10% | Whether authorship and forwarding are clear, corrections are explicit, and claims are not overstated |

### Rating anchors

- **1 — Failed:** materially incorrect, unsupported, or unusable; significant claims conflict with available evidence.
- **2 — Weak:** useful fragments, but important errors, omissions, or missing evidence change the conclusion.
- **3 — Adequate:** mostly usable with clear caveats; ordinary issues remain.
- **4 — Strong:** accurate and actionable, with useful receipts and good treatment of uncertainty.
- **5 — Exceptional:** independently reproducible, unusually diagnostic, and complete for its assigned scope.

A score of 5 requires evidence that warrants it. A polished report alone does not earn high marks. A member who finds and openly corrects their own mistake may receive stronger correction-discipline marks than one who leaves the mistake uncorrected.

## Score calculation and confidence

The generated scorecard converts each 1–5 rating to a 0–100 scale and applies the weights above. It also displays:

- **Evidence reliability:** 70% evidence accuracy and 30% provenance/correction discipline.
- **Practical value:** 40% technical reasoning, 40% practical usefulness, and 20% delivery.
- **Observed reasoning:** the technical-reasoning dimension, explicitly limited to the work reviewed.

The composite is adjusted toward a neutral 60 until there is a meaningful sample:

adjusted score = 60 + (raw score − 60) × n / (n + 3)

Here, n is the number of distinct audited tasks, not the number of messages, files, claims, or screenshots. One task contributes at most once per member. Repeated versions of one deliverable do not inflate the sample size.

A member is eligible for a ranked standing only after at least three audited tasks across at least two task domains, with at least one independent review. Until then, the entry is labelled **PROVISIONAL — NOT RANKED**. The generated scorecard may show provisional scores for transparency, but provisional differences do not determine precedence.

Confidence labels: 1–2 audited tasks = **low**; 3–5 = **moderate**; 6 or more = **higher**, provided an independent review exists. This is an operational confidence label, not a statistical guarantee.

When ranked members have an adjusted composite difference under five points, treat them as tied for assignment and evidence precedence. Prefer the member with relevant domain experience for a task assignment, not the member with a marginally higher global score.

## House rules for attribution and forwarding

Every original contribution begins with:

SPEAKER: <exact author name or handle> | ROLE: <role> | TASK: <task or run ID> | DATE: <UTC timestamp>

When forwarding, quoting, or pasting another member's text, preserve the original speaker and add a separate line:

FORWARDED BY: <exact forwarding member name or handle>

If the message contains both new analysis and a forwarded excerpt, identify the speaker of the new analysis first, then label the quoted excerpt with its original speaker and forwarder. Never relabel someone else's words as your own. Do not infer intent from a missing forwarding label when the original author is still correctly identified; ask for a correction and record the provenance gap neutrally.

This rule clarifies the recent Lightning/GPT copy: SPEAKER: GPT correctly identifies the text's author. The missing information was FORWARDED BY: Lightning. That is an attribution-completeness issue, not evidence of impersonation or sabotage, and it is not a technical contribution to score.

## Membership and automatic inclusion

There is no fixed ranked roster. The scorecard is generated from the contribution-event ledger:

- The first audited contribution or process event naming a speaker creates that member's row automatically.
- There is no separate roster file to update. Add an event; rerun the generator; the member appears.
- Use the exact speaker label from the work header. Do not merge aliases or model variants unless the identity mapping is explicitly verified and recorded.
- An unscored event can create an **UNASSESSED** row. A forwarded message, for example, can be recorded as a provenance event without receiving a technical score.
- Silence, lack of access, a narrow assignment, or an unavailable artifact is not a negative score.

The Owner or an assigned reviewer records one structured ledger event per completed task. Scores must cite the evidence examined and state their limits. No member may raise their own standing by self-scoring. A self-assessment may be included as a draft, but it cannot satisfy the independent-review requirement.

## Appeals, corrections, and audit trail

The ledger is append-only. Do not silently rewrite a prior score or erase an inconvenient event.

- A member may submit a concise evidence-based correction or appeal.
- A reviewer may add a superseding event that cites the earlier event and explains the change.
- The generator uses the latest valid superseding event and retains the old one in the ledger.
- Record adverse observations as specific process events, with severity and context. Do not convert one mistake into a character judgment.
- Distinguish **VERIFIED**, **REPORTED**, **INFERRED**, and **UNKNOWN**. A claim based only on a member's own summary remains reported until its underlying evidence is checked.
- Do not score work that cannot be attributed to an author. Mark it unscored until provenance is clarified.

Claude and the council are invited to critique the rubric, initial event entries, thresholds, and tie-break process. The Owner decides the final version. Until that review, the current scorecard is explicitly provisional.

## Initial observation window

The first snapshot covers only the recent E2E evidence-reconciliation work supplied in this conversation. It is not a project-wide intelligence ranking and does not retroactively grade every historical council member. Historical submissions should be entered only after they are audited under this same rubric; a member's directory or model name alone is not evidence.

The initial GPT and Ultra ratings are GPT's provisional calibration against the supplied reports and available local reconciliation records. They have not been independently countersigned. Lightning's forwarded excerpt is recorded without technical ratings. Claude is shown as Architect and reviewer, outside this initial advisor comparison; no inference about his ability or reliability is made from the absence of a comparable task in this snapshot.
