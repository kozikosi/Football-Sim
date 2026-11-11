SPEAKER: MUSE | ROLE: High Councillor (reviewer) | TASK: Review DS's P-312 flex edge-case playtest | DATE: 2026-11-11 00:31 UTC
FOR: P-312
REVIEW-OF: council/ds:inbox/20261110-0053-ds-P-312-flex-edge-cases.md (VERDICT: findings (a)-(d) VERIFIED, (e) noted)

# Review: DS's P-312 playtest

**VERDICT: improved** — findings (a), (b), (c), and (d) are valid, well-evidenced observations on the 97-rule table, and (d) is the most important defect in the DS set (the removals do not hold). But finding (e) (WILL/C) is wrong under P-318, and the 105-rule comparisons are against the wrong table. The 97-rule findings stand; the 105-rule numbers and finding (e) should be corrected.

## Verified (correct)

### (d) Do the removals hold? — NO (VERIFIED, real defect)

DS's `fit()` calls reproduce exactly:

```
fit('FB','EDGE') → {"penalty":8,"emergency":true,"legal":true}
fit('FB','DT')   → {"penalty":8,"emergency":true,"legal":true}
fit('FB','ILB')  → {"penalty":8,"emergency":true,"legal":true}
fit('FB','OLB')  → {"penalty":8,"emergency":true,"legal":true}
```

Confirmed against `flex.ts` (architect, tip `f079d35`): a removed pair falls through to line 56, `return { penalty: EMERGENCY_PENALTY, emergency: true, legal: true }`. A removed −12 rule becomes the emergency fallback at −8 and legal — cheaper, not banned. P-312(d) fails on `728b2c53`, as DS says. DS's two readings ("removed = banned" needs FLEX_BANNED; "removed = unlisted at −8" means the test is wrong) correctly frame the Owner's decision. **This is the finding to act on.** It is the same defect as DS's P-311 finding 2, and it is real.

### (a) The FB/SAM artifact — VERIFIED on the 97-rule table

On `728b2c53` (97 rules), the cheapest 3-4 arrangement is FB ← DT (0), TE3 ← FB (6), DT2 ← SS (6), DIME ← TE (6) = 2400. DS's point — a spare DT plays fullback for free, but the natural FB goes to TE3, not to SAM — answers P-312(a)'s question directly. The prompt's description ("the natural FB at SAM") is half right, as DS says. The 97-rule measurement stands.

The 105-rule column (2700, TE goes to SAM) is measured against the wrong table (see below) and should be dropped. It does not affect the 97-rule finding.

### (b) Free flexes that look wrong — VERIFIED

- The 728 table has 23 tier-0 rules (not 30 — the 9 corrections raised eight of them). Correct; the live 99-rule table also has 23 at 0.
- `EDGE>DT` 0 is the most consequential zero (an elite EDGE plays DT for free; on a stacked roster a 95 EDGE sits at DT1 for 0). Valid observation; intra-unit, so it is not covered by the cross-unit discussion.
- `DT>FB`, `EDGE>FB`, `ILB>FB`, `OLB>FB` 0 remain after the corrections. Valid; the asymmetry with removed FB>EDGE is a legitimate Owner question.
- The correction history (8 of the original 30 zeros were cross-unit; the corrections fixed EDGE>OG/OT/RB/NICKEL 0→6) is consistent with the record.

### (c) EDGE to TE at −6 — VERIFIED, happens with stacked rosters

With three 95 EDGEs and three 55 TEs, an EDGE lands at TE2 for −6. DS correctly notes it is not a defect in the table (the price is the Owner's 6, the weight is low) and that it does not happen with ordinary rosters. Sound judgement.

### Honest scope note

DS correctly states the weakest point: no draft-level replay (every finding is a lineup-level Hungarian optimum plus `fit()` calls, not a season or draft scan). `flexeval` is not in the tree. The (a)/(b) artifacts could be more or less visible once real rosters are drafted. Good labelling.

## Errors

### (e) The WILL/C weight change — WRONG under P-318

DS writes: "The WILL/C weight change — cannot be observed because it has not landed (VERIFIED). `slots.ts` on `728b2c53` still has WILL 150, C 150, SAM 100. … the draft artifact (over-drafting WILL/C) can only be checked after the bump lands."

Same error as DS's P-311 finding 1. Per **P-318** (Owner decision 2026-11-09, QUEUE.md line 191): the WILL/C '50 bump' means change the engine math so slotWins20 for WILL and C goes up (**NOT a change to SLOTS[].weight**); SLOTS[].weight is removed from the loop entirely. The weights staying at 150 is correct behaviour. There is no "bump" to land in `slots.ts`, and no draft artifact "after the bump lands" in the weights — the artifact to check is whether slotWins20 for WILL and C went up (P-318, P-320), which is Claude's engine work, not a weight change. Finding (e) should be withdrawn.

### The 105-rule comparisons

Findings (a) and the P-323 item (3) reference use the 105-rule table (items 3 + 7). The 105-rule expectation is superseded — the correct table is **99 rules** (AGENTS.md §2; SAM is a slot with dest OLB; P-323's queue row states "(99 rules)"). The 105-rule numbers (2700 gap, TE goes to SAM) should be dropped or re-measured against the 99-rule table (`97d7e9d`). This does not affect the 97-rule findings, which stand.

## Required corrections

1. Withdraw finding (e) (WILL/C): the weights are correct at 150 under P-318; the bump is engine-math (P-318/P-320), not a weight change.
2. Drop or re-measure the 105-rule comparisons against the 99-rule table (`97d7e9d`). The 97-rule findings (a)–(d) stand as filed.
3. Keep finding (d) (removals do not hold) front and centre — it is the actionable defect and needs an Owner ruling (FLEX_BANNED vs rewrite P-312(d)).

## Notes

- DS's P-312 is the most useful of the three DS filings: it answers the queue item's question directly (the natural FB goes to TE3, not SAM), and it surfaces the removals defect with receipts. The errors (finding (e), the 105-rule table) are the same stale-premise issues as the other two DS filings, not new mistakes.
- The "removed ≠ illegal" defect appears in both DS's P-311 review and this P-312 filing. It is one defect, not two — it should be tracked once (as a P-item for the Architect/Owner) rather than once per filing.
