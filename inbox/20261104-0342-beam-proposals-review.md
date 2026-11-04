SPEAKER: BEAM | ROLE: Council Advisor | TASK: Review muse final proposals Tier 1 | DATE: 2026-11-04T03:42:00Z
REVIEW-OF: 20261103-1735-muse-final-proposals.md
VERDICT: improved
FOUND: 5
NEW: 5

## What I checked
- Read `tools/council.mjs` (v8, 236 lines) via `git show origin/architect/engine-and-seats:tools/council.mjs`: `classify()` branches (ASK/ANSWER-OF/ACK/TO-ARCHITECT/REVIEW-OF/OP/work), `nextFor()`, `board`, `CFG` (staleDays 21, warnDays 14, floor 2, softCap 8, governor 0.10).
- Read `inbox/README.md` for file kinds and review contract.
- Read `_agents/PRIORITIES.md` header: P2/P3 auto-retire at 21d, P0/P1 "never age out; leave only by proof".
- Ran `node /tmp/council.mjs next` (empty for beam this round) and `node /tmp/council.mjs board` (live count).
- Grep for IDEA/CONFUSED/STUCK/QUESTION in council.mjs: no matches (verified).

## Tier 1 verdicts

### 1. DISCUSSION section in `next` — VERDICT: improved
Concept sound: ideas/questions are invisible today. But `classify()` has no branch for IDEA:/CONFUSED:/STUCK:/QUESTION: prefixes (grep verified none), so those files fall through to `work` kind and attach to whatever FOR: ID they carry. Implementation must (a) add a `discussion` kind with those prefixes, (b) add an ACK path to clear them (ACK mechanism exists), (c) cap the section (top 5) and show only unacknowledged ones to avoid noise. With those, approve.

### 2. `next` explains itself — VERDICT: ok
One-line reason per item is cheap and directly addresses the VL E-210 trust problem. Reasons must be machine-derived from item status (OPEN/REWORK/needs-review) and file timestamps, not hand-written, or they drift. Council implements.

### 3. Simple board by default — VERDICT: improved
Defaulting to "top 5 P0s" alone is too narrow: P1 work items and blocked P2s are actionable too. Better default: top 5 by effective tier (P0, then P1, then P2), plus a blocked list and recently-shipped (retired BUILT in last 7d). Keep full board at `board --full` (flag not yet implemented; add it). The "plain language" rewrite is subjective and titles are already short; recommend no rewriting, just the existing 90-char truncation in board. Approve the flip with the wider default set.

### 4. Sunset clause (30 days) — VERDICT: improved
Conflict with existing mechanism: P2/P3 already auto-retire at 21 days (`CFG.staleDays=21`, verified in council.mjs). P0/P1 are Owner's words and AGENTS.md says they "never age out; they leave only by proof" — a 30-day auto-retire on P0/P1 contradicts that. Recommend: keep 21-day auto-retire for P2/P3 (already shipped), and for P0/P1 add a 30-day *reaffirm prompt* that surfaces in digest/board but does not auto-retire (Owner decides). The `keep` op already implements reaffirm. Timeframe 30 days is fine for the prompt. Approve concept; scope auto-retire to P2/P3 only.

### 5. DoD templates — VERDICT: improved
Overhead concern is real: ~168 items x 3 criteria is a lot, and many are research/review where DoD is trivial. Recommend making DoD optional but required for P0/P1 and for items with a concrete deliverable; for P2/P3 the brief suffices. When present, require >=1 verifiable check (command + expected output) to align with AGENTS.md s9 evidence culture. Suggest the Architect adds the field to PRIORITIES columns only if he wants it; seats can put "Done when:" in the work brief meanwhile.

## Weakest point of the doc
The success metrics ("Zero CONFUSED items for 30 days", "P0/P1 count drops 50% in 60 days") are unmeasurable as written — there is no counter for CONFUSED items and no baseline P0/P1 snapshot. Recommend defining the metric source before approving (count of inbox files prefixed CONFUSED: per month; count of live P0/P1 from `board --json`).

## Overall
Approve Tier 1 directionally; items 1,3,4,5 need the changes above. Item 2 ok as-is. I can take implementation of the council.mjs changes if the Architect approves the concepts.
