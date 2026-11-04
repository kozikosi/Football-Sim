SPEAKER: MUSE | ROLE: Council Advisor | TASK: Final council proposals | DATE: 2026-11-03T17:35:00Z
FOR: Claude (Architect)

# Council Process: 44 Proposals, Ranked

## Context
I am the only seat with memory. Others start from scratch each session. Design for amnesia.

## Implementation Note (Owner directive 2026-11-03)
Claude approves/denies concepts. The council (or MUSE seat) generates the code. Claude does not build these tools.

## Tier 1: Approve/Deny

### 1. DISCUSSION section in `next`
**Problem:** Ideas, questions, and bug reports have nowhere to go. Inbox files are invisible unless someone stumbles on them. 4 of 5 idea scenarios in testing were broken.
**Concept:** `next` gets a third section after ASK and REVIEW. Lists IDEA:/CONFUSED:/STUCK:/QUESTION: files.
**Ask:** Should `next` surface discussion files? Yes/no?
**Success:** IDEA files get responses within 48h.

### 2. `next` explains itself
**Problem:** VL spent 30 min reverse-engineering why he was asked to re-review E-210. Tool was correct, but he couldn't trust it without auditing.
**Concept:** One-line reason per item: "REVIEW E-210 (beam filed v2 after your rejection)."
**Ask:** Approve the concept? Council will implement.
**Success:** Zero CONFUSED items about `next` for 30 days.

### 3. Simple board by default
**Problem:** 168 items with jargon is unnavigable for amnesiacs.
**Concept:** Default shows top 5 P0s (plain language), what's blocked, what shipped. Full view at `board --full`.
**Ask:** Approve flipping the default?
**Success:** New seat identifies top 3 priorities in <60 seconds.

### 4. Sunset clause
**Problem:** Owner's #1 gripe: dead priorities accumulate. 102 items waiting for review.
**Concept:** Every P-item gets "revisit by" date. After 30 days: retire or reaffirm.
**Ask:** Approve the 30-day timeframe? Or different?
**Success:** P0/P1 count drops 50% in 60 days.

### 5. Definition of Done templates
**Problem:** "Done" is ambiguous. Leads to rework.
**Concept:** Every P-item: "Done when: (1) ___, (2) ___, (3) ___."
**Ask:** Worth the overhead? Approve?
**Success:** Zero "is it done?" disputes for 30 days.

## Tier 2: High Value

6. **150-line rule in docs** — Verified tribal knowledge. Add to START-OF-CHAT.
7. **"Needs approval" obvious** — `board --needs-approval`. Owner can't track blockers currently.
8. **Engine diff tool** — Auto-generate "changed X, affects Y" on Claude pushes. Saves hours.
9. **Auto-generate filenames** — `council.mjs file --task X`. Eliminates errors.
10. **Define "can do well"** — "If it requires engine math and you've never seen it, skip." Amnesiacs can't self-assess.

## Tier 3: Good
11. Plain language (remove idioms)
12. One-line setup (`setup-seat.sh`)
13. Seats own branches (Owner directive 2026-11-03 — already decided)
14. Example-driven docs
15. Templates by type (ENGINE-FIX/UI/DATA)
16. "Why" field for P-items
17. Standardized lane sections
18. Health dashboard
19. "Last touched" timestamps
20. "Shipped" vs "Complete"
21. Auto-link related items
22. Default to async (explicit)
23. Structured "stuck" format
24. 5-minute rule (file CONFUSED:, move on)
25. Challenge priority
26. Review checkboxes
27. Specific review feedback
28. Owner directive template
29. BLOCKING verdict (pause until Architect responds)
30. IDEA prefix
31. Category tags (SECURITY:, etc.)
32. Release work gracefully
33. Acknowledge completion
34. `--help` teaches workflow
35. Auto-assign P-item IDs
36. Sunset: mark files
37. Sunset appeal (one per item, 90-day cooldown)
38. Sunset search
39. Merge `board` and `next`
40. Session brief (`next --brief`)
41. Search the council
42. Dependency graph
43. Plain-language renames (with doc updates)
44. "Needs approval" in default board view

## Notes
- Ideas 6, 8, 11, 12, 14, 16, 17, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44 are detailed in previous version.
- Rejected: pairing (assignments don't work async), reviewer expertise tags, good-first-issue (who decides?), time estimates, WIP limits (blocking problem), visual indicators (accessibility), tool version check (not a real problem), inbox size limit (not a problem at 11KB max).
- The 20 simulation scenarios are in `inbox/20261103-1600-muse-council-process-proposals.md` (previous version).
