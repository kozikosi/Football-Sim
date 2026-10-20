# Council Scorecard

**Snapshot date:** 2026-10-21 UTC

Generated from council/scorecard/events.jsonl by scripts/build_council_scorecard.py.
Purpose: observed contribution reliability and usefulness; this is not an intelligence or character ranking.
Rule: primary evidence outranks scores. Provisional entries do not break ties.

## Current standing

| Member | Standing | Audited tasks | Composite (adjusted) | Evidence reliability | Practical value | Observed reasoning | Process events |
|---|---|---:|---:|---:|---:|---:|---:|
| GPT | PROVISIONAL — NOT RANKED | 1 | 65.5/100 | 66.5/100 | 65.0/100 | 80/100 | 0 |
| Lightning | UNASSESSED | 0 | — | — | — | — | 1 |
| Ultra | PROVISIONAL — NOT RANKED | 1 | 65.5/100 | 66.5/100 | 65.0/100 | 80/100 | 0 |

A ranked standing requires at least three distinct audited tasks across two domains and an independent review. The first event automatically creates a row; no member roster is maintained.

## Evidence notes

### GPT
- **Status:** provisional; 1 audited task(s), 1 domain(s); independent review pending.
- **e2e-reconciliation-follow-up (2026-10-21):** Correctly distinguishes a script reference hash from proof that Lightning executed that script; preserves Run B as UNKNOWN; keeps the overall result PARTIAL and distinguishes viewport width checks from full usability. Rating remains provisional because the original attachments and local audit files are not yet durable in Git and this event has no independent score review.
  - Assessment: GPT (provisional self-review; independent review pending). Source: Owner-provided attachment: SPEAKER GPT | E2E reconciliation follow-up; cross-checked against local _agents/moc/notes/W2-run-reconciliation.md and W3-protocol-to-script-matrix.md, which are not yet committed to this branch.
  - Limits: This rates one evidence-reconciliation deliverable only. It does not assess model ability generally or GPT's work on other project tasks.

### Lightning
- **Status:** unassessed; 1 unscored process event(s). No technical conclusion is drawn.
- **Unscored event — forwarded-excerpt:** The original author is preserved, but the forwarder is not named in the pasted header. The new rule adds a separate FORWARDED BY field. This event is not evidence that Lightning authored GPT's analysis, impersonated GPT, or intended to mislead.
  - Source: Owner-provided attachment containing the GPT-authored E2E reconciliation follow-up under SPEAKER: GPT, reported as forwarded by Lightning.

### Ultra
- **Status:** provisional; 1 audited task(s), 1 domain(s); independent review pending.
- **e2e-publication-plan-and-protocol-audit (2026-10-21):** The protocol-to-script gaps are specific and actionable, including return navigation, critical-control clipping, and horizontal table scrolling. Publication is clearly labelled a recommendation and no upload is claimed. One proposed push command does not match the branch name created in the preceding command; fix before anyone uses it. The proposed report-duration metric should only be populated if its field definition matches the measured step duration. Ratings remain provisional because this was a plan rather than an executed publication or new test.
  - Assessment: GPT (provisional review; independent review pending). Source: Owner-provided attachment: SPEAKER Ultra | W4 Publication Plan + W3 Follow-up; compared with the local E2E reconciliation reports and the supplied GPT follow-up, which are not yet committed to this branch.
  - Limits: Rates the quality of a proposed plan and audit, not a completed publication or a newly executed test. Evidence files cited in the conversation are not yet durable Git artifacts.

## Reading this snapshot

- GPT and Ultra each have one provisional, single-review E2E assessment with identical aggregate scores. They are not ranked; neither score determines whose factual account is accepted.
- Lightning's forwarded excerpt is listed as an unscored provenance event. The original GPT speaker label was retained; the forwarder label was missing. This is not treated as impersonation or evidence of intent.
- Claude is the Architect and is outside this initial advisor comparison. No conclusion about Claude is implied.
- Other historical members are not assigned scores from folder presence or incomparable old reports. They enter automatically when an audited event is recorded.
