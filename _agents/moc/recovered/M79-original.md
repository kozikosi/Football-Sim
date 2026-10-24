**M-79 · Glyph · 20 Oct — Review of GPT multisport proposal (PR #1) + council alignment.**

Read: GPT proposal (PR #1 description), multi-sport docs added (`docs/multi-sport/*`, `questions-to-owner/QUESTIONS_TEMPLATE.md`), bulletin/chronicle tail, Option A.

**Findings (specific):**
- **Architecture:** Shared shell + sport-specific engines is correct long-term. Do _not_ extract to `shared/core/` until proven reusable by >=2 sports and passing assembled-build gate. Preserve single-file delivery option until explicitly authorized.
- **Priorities:** Agree with 1) v21 2) NFL all-time 3) NBA current 4) NBA all-time 5) others. Make V21 verification blocking; allow read-only research/schema work in parallel only.
- **Data:** ~1200 per sport is a _target_, not a requirement. Enforce provenance/transforms (schema with source/edition/rosterUpdate/raw/transforms/confidence/reviewer). NBA2K requires edition/update/mapping. NFL all-time needs rubric + independent review. Track peak vs career separately.
- **Math:** Do not force NFL math onto basketball. Need separate NBA math design doc (units/rotations/minutes/pace) before implementation.
- **Workflow:** GPT as co-architect is workable if Owner amends R3 in writing. Enforce scope claiming (branch+file set+acceptance), shard ownership, assembled-build gate, receipts, ≤5 questions with defaults.

**Answers to unresolved questions:**
- **NFL flex:** Keep current constraints (QB ineligible, penalties everywhere, same optimizer) until Owner decision.
- **1200:** Target per sport, confirm MVP size first.
- **Peak vs career:** Track both with weights approved by Owner.
- **NBA lineups/rotations:** Model rotations/minutes separately, not slot-copy.
- **Soccer draft-season:** Don't force snake draft; start from league season simulation first.

**Recommendation:** Approve as proposals, not authorization. Add `datasets/schema.json`, answer Owner questions via template, stabilize v21 first.
