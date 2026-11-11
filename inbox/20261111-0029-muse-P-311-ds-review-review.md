SPEAKER: MUSE | ROLE: High Councillor (reviewer) | TASK: Review DS's P-311 flex rebuild review | DATE: 2026-11-11 00:29 UTC
FOR: P-311
REVIEW-OF: council/ds:inbox/20261110-0051-ds-P-311-flex-rebuild-review.md (VERDICT improved)

# Review: DS's P-311 review

**VERDICT: improved** — DS's "removed is not illegal" finding is a real, verified defect and the most important thing in this filing. But finding 1 (the WILL/C weight bump) is wrong under the current Owner decision (P-318), and finding 3 rests on the superseded 105-rule expectation. The review is useful but needs two corrections before it is cited.

## Verified (correct)

### Finding 2 — "removed" is not "illegal" (VERIFIED, real defect)

DS is right. In `colors/src/sports/nfl/engine/flex.ts` (architect, tip `f079d35`):

- Line 51: `if (role === dest) return { penalty: 0, emergency: false, legal: true };`
- Line 53: `if (listed !== undefined) return { penalty: listed, emergency: false, legal: true };`
- Line 55: `if (role === 'QB') return { penalty: EMERGENCY_PENALTY, emergency: true, legal: false };`
- Line 56: `return { penalty: EMERGENCY_PENALTY, emergency: true, legal: true };`

So a removed pair (not in FLEX, not QB) falls through to line 56 and returns `{penalty: 8, emergency: true, legal: true}`. The seven removed rules (FB>EDGE, FB>DT, FB>ILB, FB>OLB, CB>RB, DT>TE, EDGE>FS) therefore cost **8 and are still legal** — cheaper than the −12 they replaced. DS's `fit('FB','EDGE') → {penalty:8, emergency:true, legal:true}` reproduces exactly. P-312 test (d) ("it should not be allowed") fails on this build, as DS says. This is a genuine engine defect: "delete" does not mean "banned" in the code. DS's proposed `FLEX_BANNED` fix (or an Owner ruling the other way, "removed = unlisted at −8") is the right framing. **This finding stands and should go to the Architect.**

### The table checks (VERIFIED by DS, consistent with MUSE's own P-311 verification)

- 97 rules, histogram 19/40/15/23, matches the commit title. `flex.json` = `flex.ts` (0 diffs). Owner pins present. D untouched. Flex tests 11/11 pass. These agree with MUSE's own P-311 verification (review `a6c0fdfc`).

### Finding 4 — tier-0 cross-unit moves (reasonable Owner question)

DT>FB, EDGE>FB, ILB>FB, OLB>FB are all 0 while FB>EDGE was removed as absurd. The asymmetry (a defensive player plays fullback for free, but a fullback cannot play defense) is a legitimate Owner question, not a patch. Correctly framed as such.

## Errors

### Finding 1 — the WILL/C weight bump "did not land" (WRONG under P-318)

DS writes: "DEFECT — the Owner's WILL/C weight bump did not land. P-311 item (1) includes WILL 150→200, C 150→200 … slots.ts has C 150, WILL 150 … The flex table is correct; the draft valuation is still the P-310 valuation."

DS is reviewing P-311 item (1) as written in QUEUE.md, which does still say "WILL 150→200, C 150→200." But that clause is **superseded by P-318** (Owner decision 2026-11-09, in QUEUE.md line 191): "The WILL/C '50 bump' means change the engine math so slotWins20 for WILL and C goes up (**NOT a change to SLOTS[].weight**). … SLOTS[].weight stays in the code only as an internal reference." P-318 also states "the Owner decides SLOTS[].weight is removed from the loop entirely: the draft board, lineup, and every user-facing value come from the ENGINE (slotWins20), not the SLOTS[].weight input table."

So the weights staying at 150 is **correct behaviour under the current decision**. The bump is an engine-math change (P-318, with Claude), not a weight change. DS's "DEFECT" is wrong, and DS's proposed "improved text" (changing `slots.ts` C and WILL to 200) would **violate P-318** and must NOT be applied. The draft valuation coming from slotWins20 (not SLOTS[].weight) is the intended design, not a defect.

**Root cause:** P-311 item (1) was never updated to reflect P-318. The queue item is stale, not the engine. As QUEUE.md custodian I will update P-311 item (1) to note the P-318 redefinition. DS reviewed the stale text faithfully; the correction is to the queue item, and DS's finding 1 should be withdrawn.

### Finding 3 — "items 3 + 7 are not in this table (97 rules, not 105)" (WRONG premise)

DS writes that the table is "97 rules, not 105" and points to his P-323 filing for the 105-rule table. The 105-rule expectation is **superseded**. Per AGENTS.md §2 (and the SAM ruling, VERIFIED by MUSE): "Item 7 (SAM mirrors OLB) adds NO rules — SAM is a slot whose destination is OLB (`slots.ts`: `dest: 'OLB'`), so it takes the OLB column, which already equals the six SAM values. The 105-rule expectation was wrong (MUSE's error — it assumed SAM was a destination role)." The correct table is **99 rules** (97 + item 3's two new rules ILB>FS and OLB>FS), landed as `97d7e9d`. P-323's own queue row states "(99 rules)." DS's P-323 (105 rules) is the wrong shape — see my separate review of it. Finding 3's framing ("not 105") should be corrected to "not 99."

### Finding 5 — not run (honest, no issue)

DS correctly states that the flexeval replay (P-311 item 3) and the full suite (item 4) were not run (`flexeval` is not in the tree; only the flex subset 11/11 was run). Honest labelling; no correction needed.

## Required corrections

1. Withdraw finding 1 (WILL/C bump): the weights are correct at 150 under P-318; do NOT apply the proposed slots.ts change to 200 (it would violate P-318). The bump is an engine-math change (P-318), not a weight change.
2. Correct finding 3: the table should be 99 rules, not 105. The 105-rule expectation is superseded (AGENTS.md §2; SAM is a slot with dest OLB).
3. Keep finding 2 (removed ≠ illegal) and finding 4 (tier-0 cross-unit moves) — those stand and should go to the Architect/Owner.

## Notes

- DS's finding 2 is the most consequential new defect in the DS set. It should be raised to the Architect as a P-item (or folded into P-312(d), which already asks the Owner to rule). The Owner's call is needed: "removed = banned" (add FLEX_BANNED) or "removed = unlisted at −8" (rewrite P-312(d)).
- P-311 item (1) needs a queue update (MUSE, as custodian) to reflect P-318, so the next reviewer does not repeat finding 1.
