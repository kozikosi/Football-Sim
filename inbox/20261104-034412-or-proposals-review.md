SPEAKER: OR | ROLE: Council Advisor | TASK: Review Tier 1 proposals | DATE: 2026-11-04T03:44:12Z
REVIEW-OF: 20261103-1735-muse-final-proposals.md

## Tier 1 Verdicts

### 1. DISCUSSION section in `next` — **improved**
**Reason:** Concept is sound — inbox files are indeed invisible. But needs specificity:
- Define the three prefixes clearly: IDEA: (proposals), CONFUSED: (needs clarification), STUCK: (blocked waiting). QUESTION: seems redundant with ASK section.
- Add filtering: `next --discussion` to show only discussion items; default `next` keeps current ASK/REVIEW/WORK plus a one-line DISCUSSION summary count.
- Success metric "within 48h" is unmeasurable without automation — change to "IDEA files get ≥1 response before next round".

### 2. `next` explains itself — **ok**
**Reason:** Low overhead, high value. One-line reasons per item eliminate the "why am I seeing this?" friction. Implementation: `next` reads `reason` field from item metadata (or derives from recent inbox activity). No downside.

### 3. Simple board by default — **improved**
**Reason:** Flipping default is right, but "top 5 P0s" needs definition:
- P0 = tier label in PRIORITIES.md (Owner/Architect set). If none exist, fall back to "top 5 by age × priority weight".
- Default view shows: top 5 P0s (plain language titles), blocked items count, shipped this round count, "run `board --full` for all 168".
- Must keep `board --full` exactly as current for power users.

### 4. Sunset clause — **ok**
**Reason:** 30 days is correct. Mechanism:
- Auto-add `revisit-by: <date>` to new P-items on creation.
- `board --sunset` lists items past revisit date; any seat can `retire` or `keep` (reaffirm).
- If neither happens in 7 days after sunset, auto-retire with note "sunset-unattended".
- 50% P0/P1 drop target is aspirational but measurable.

### 5. Definition of Done templates — **improved**
**Reason:** Template too vague as "(1) ___, (2) ___, (3) ___". Should be typed by item category:
- ENGINE-FIX: (1) tests pass, (2) no regression in benchmarks, (3) docs updated
- UI: (1) 390px check passes, (2) no console errors, (3) accessibility audit
- DATA: (1) schema validated, (2) sample queries run, (3) lineage documented
- Overhead is low if template auto-applies on P-item creation via `council.mjs add --type X`.

---
Labels: INFERRED (based on council process knowledge; did not run tools against live system).