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

## Tier 2 verdicts (items 6-10)

### 6. 150-line rule in docs — VERDICT: ok
Already in AGENTS.md s5 (code >150 lines stays in lane). Add one line to START-OF-CHAT step 3. Low cost.

### 7. "Needs approval" obvious — VERDICT: improved
Good concept; Owner can't track blockers. Merge with item 44: `board --needs-approval` flag AND include a blocked/needs-approval line in the default simple board view. One implementation, two asks.

### 8. Engine diff tool — VERDICT: ok
High value; council implements as a script that diffs protected constants between builds and lists affected matchups. Architect triggers on push. Keep scope to constants + matchupModel, not full diff.

### 9. Auto-generate filenames — VERDICT: ok
Already implemented: `put()` in council.mjs generates `inbox/<UTC>-<seat>-<kind>.md` (verified). Just document the convention in inbox/README (already there). No code change needed.

### 10. Define "can do well" — VERDICT: ok
Add one line to next output / START-OF-CHAT: skip items requiring engine math you've never seen; leave them for someone else (no penalty). Aligns with no-assignment rule.

## Tier 3 verdicts (items 11-44)

- 11. Plain language (remove idioms) — ok. Aligns with Owner's plain-language rule; apply to START-OF-CHAT and PRIORITIES briefs.
- 12. One-line setup (setup-seat.sh) — ok. Wrap tools/new-seat-worktree.sh + sync-base + lane copy; verify script exists first.
- 13. Seats own branches — ok. Already Owner directive (2026-11-03); no action.
- 14. Example-driven docs — ok. Add one worked example to inbox/README and COUNCIL.md.
- 15. Templates by type (ENGINE-FIX/UI/DATA) — improved. Start with one generic template + optional sections; three templates up front is premature.
- 16. "Why" field for P-items — ok. Add "Why:" column or append to brief; helps amnesiac prioritization.
- 17. Standardized lane sections — ok. TEMPLATE-LANE.md already exists; enforce via START-OF-CHAT.
- 18. Health dashboard — ok. Defer to P2; derive from board --json + git log; no new data store.
- 19. "Last touched" timestamps — ok. Already tracked (touched in council.mjs); surface in board output.
- 20. "Shipped" vs "Complete" — improved. Define: shipped = in a build with hash; complete = reviewed. Add to glossary; don't rename existing states.
- 21. Auto-link related items — ok. Suggest unblocked items when a dependency retires; low effort.
- 22. Default to async (explicit) — ok. Already async by design; state it in START-OF-CHAT.
- 23. Structured "stuck" format — ok. Ties to item 1 discussion prefixes (STUCK:).
- 24. 5-minute rule (file CONFUSED:, move on) — ok. Ties to item 1; reduces spiral risk.
- 25. Challenge priority — ok. File as a NOTE to Architect or a P2 ADD; doesn't block work.
- 26. Review checkboxes — improved. Structured form helps resumability, but keep freeform allowed; make checkboxes optional.
- 27. Specific review feedback (strongest/weakest) — ok. Add "Strongest:/Weakest:" lines to review template.
- 28. Owner directive template — ok. Useful for V23-OWNER-NOTES intake; low cost.
- 29. BLOCKING verdict — ok. Good safety valve distinct from rejected; pauses item until Architect responds. Add to review verdicts.
- 30. IDEA prefix — ok. Ties to item 1; low bar for speculation.
- 31. Category tags (SECURITY:) — ok. Orthogonal to tier; auto-escalate SECURITY: to Owner.
- 32. Release work gracefully — improved. Define as: WIP commit + lane note + push before stopping (already END-OF-CHAT); no new mechanism.
- 33. Acknowledge completion — ok. Architect acks via ack op; already exists.
- 34. --help teaches workflow — ok. Already present; expand header text slightly.
- 35. Auto-assign P-item IDs — ok. Already implemented (council.mjs add derives N-xxxx).
- 36. Sunset: mark files — improved. Tie to item 4; "revisit by" derived from touched + 30d, not stored.
- 37. Sunset appeal — ok. One appeal per item, 90-day cooldown; reasonable guardrail.
- 38. Sunset search — ok. Filter board by age/revisit-by; low cost.
- 39. Merge board and next — improved. Keep separate (global vs personal); add `next --board` shortcut instead.
- 40. Session brief (next --brief) — ok. One-screen summary; good for returning seats.
- 41. Search the council — ok. grep over inbox/ + PRIORITIES; simple, no index.
- 42. Dependency graph — ok. Defer (nice-to-have); board already shows blocked deps.
- 43. Plain-language renames — improved. Only with Architect approval + update all refs; avoid casual renames.
- 44. "Needs approval" in default board view — merged with item 7 (improved).

## Tier 3 weakest point
Many Tier 3 items overlap (1/23/24/30; 7/44; 4/36/37). Recommend the Architect dedupe before implementing; the council can file a consolidated "merged asks" inbox if he wants.

## Overall (all tiers)
Tier 1: approve directionally, 4 improved + 1 ok. Tier 2: 3 ok + 2 improved. Tier 3: mostly ok, several improved, one merged. No rejections except 39 (improved, not rejected). No item is harmful; all are reversible. I can implement the council.mjs/board/next changes in my lane once the Architect approves concepts.