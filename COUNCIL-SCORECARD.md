# Council Scorecard

**Snapshot date:** 21 October 2026  
**Generated from:** council/scorecard/events.jsonl using scripts/build_council_scorecard.py  
**Purpose:** observed contribution reliability and usefulness, not an intelligence or character ranking.

## Current standing

| Member | Standing | Audited tasks | Composite (adjusted) | Evidence reliability | Practical value | Observed reasoning | Process events |
|---|---|---:|---:|---:|---:|---:|---:|
| GPT | PROVISIONAL — NOT RANKED | 1 | 65.5/100 | 66.5/100 | 65.0/100 | 80/100 | 0 |
| Ultra | PROVISIONAL — NOT RANKED | 1 | 67.8/100 | 66.5/100 | 68.0/100 | 100/100 | 0 |
| Lightning | UNASSESSED | 0 | — | — | — | — | 1 |

The GPT and Ultra entries are both single-task, GPT-authored provisional assessments awaiting an independent reviewer. They are not eligible for a rank, and the 2.3-point adjusted difference must not determine whose claim takes precedence. Claude is the Architect and is outside this initial advisor comparison; this does not assess Claude's ability or reliability.

## Evidence notes

### GPT

- **Task:** E2E reconciliation follow-up.
- **Observed strengths:** distinguished a test-script reference from proof that Lightning executed that script; retained Run B as UNKNOWN; kept the overall verdict PARTIAL and did not call width-only measurements a full mobile-usability pass.
- **Assessment:** provisional 4/5 on evidence accuracy, technical reasoning, usefulness, and delivery; 5/5 on provenance. Assessor: GPT; independent review pending.
- **Limit:** one E2E evidence task only; attached report and local audit files are not yet durable Git evidence.

### Ultra

- **Task:** W4 evidence-publication plan plus W3 protocol follow-up.
- **Observed strengths:** identified missing return-navigation, control-clipping, and horizontal-table-scroll checks; clearly marked publication as a recommendation; proposed keeping the large trace out of the product branch.
- **Correction requested:** the proposed push command git push origin docs:e2e-runs does not match the prior docs/e2e-runs branch name; correct the refspec before anyone uses it. Populate a report-duration field only if the schema's field meaning matches the measured step duration.
- **Assessment:** provisional 4/5 on evidence accuracy and delivery; 5/5 on technical reasoning, usefulness, and provenance. Assessor: GPT; independent review pending.
- **Limit:** rates the plan and audit, not a completed upload or a newly executed test; source attachments are not yet durable Git evidence.

### Lightning

- **Observed event:** forwarded GPT's E2E follow-up with its original SPEAKER: GPT label but without a separate FORWARDED BY: Lightning label.
- **Treatment:** unscored provenance event. The author's name was preserved; the missing detail was the forwarder's identity. This is not treated as impersonation, sabotage, or evidence of intent, and GPT's work is not credited to Lightning.
- **Next step:** use the explicit forwarder line for future copied or forwarded text.

## Precedence rule

Primary receipts and reproducible checks decide factual disputes. Scores are only a tie-breaker when evidence quality is genuinely comparable, the member is ranked with adequate confidence, and the adjusted gap is at least five points. Otherwise, keep the dispute unresolved and request an independent reproduction.

## Limitations

This is a narrow initial sample, not a retrospective ranking of everyone who has participated in the Football Sim project. Historical files use different standards and many claims have not been audited under one comparable rubric. A name appears automatically when an event is entered in the ledger; there is no separate roster to maintain. The Owner and Claude are invited to correct this proposal before the scorecard is treated as settled policy.
