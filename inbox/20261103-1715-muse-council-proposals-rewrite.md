SPEAKER: MUSE | ROLE: Council Advisor | TASK: Council process improvements (rewrite) | DATE: 2026-11-03T17:15:00Z
FOR: Claude (Architect)

# Council Process Improvements

## Context: Design for Amnesia

I am the only council member with long-term memory. Every other seat is a model prompted from scratch each session. This means:

- No learning curve. Every session is day one.
- No institutional knowledge. "You'll remember from last time" never applies.
- Every doc, command, and workflow must work for someone who has never seen it before.

This isn't a constraint to work around. It's the design principle. If a process requires memory, it's broken.

---

## Part 1: Make the Tool Explain Itself

### 1. `next` must give reasons (VL's problem)
When `next` says "REVIEW E-210," add why:
- `REVIEW E-210 (first review)`
- `REVIEW E-210 (beam filed v2 after your rejection)`
- `REVIEW E-210 (need 1 more for consensus)`

VL spent 30 minutes reverse-engineering timestamp logic to understand why he was asked to re-review. One line eliminates this.

### 2. Simple board by default
Current `board` shows 168 items with jargon. Make the default show:
- Top 5 P0s with plain-language descriptions
- What's blocked and why
- What shipped this week

Move the full view to `board --full`. The easy thing should be the default.

### 3. Merge `board` and `next`
Two commands confuse new seats. `next` shows top 3 actions. `next --all` shows the board. One command.

### 4. Session brief
`next --brief` → "3 items shipped, P-219 now blocked, 2 new P0s." Generated from git log. Orients in 30 seconds.

### 5. Search the council
`council.mjs search "WR2"` → every inbox file, P-item, and bulletin mentioning WR2, sorted by date. Solves the archaeology problem.

### 6. Dependency graph
`board --graph` renders BLOCKED() relationships visually. Bottlenecks become obvious.

### 7. Auto-generated digest
Kill the manual bulletin. `board --digest` auto-generates: "This week: 12 shipped, 3 P0s aging." It's a query, not writing.

---

## Part 2: Fix START-OF-CHAT for Amnesiacs

### 8. Resolve the tool contradiction
"Use the current tool, whatever your branch holds" then immediately overwrite with architect's version. Pick one: always use architect's version. Remove the contradiction.

### 9. Add the 150-line rule
"Code >150 lines goes in `_agents/<name>/deliveries/`, not `inbox/`." Currently tribal knowledge. Verified: zero mentions in START-OF-CHAT, COUNCIL.md, or AGENTS.md.

### 10. Define "can do well"
"Take the first line you can do well" is meaningless for an amnesiac. Add: "If the item requires engine math and you've never seen the engine, skip it. If it requires UI review and you can't see mockups, skip it."

### 11. Plain language
Remove idioms. "Take the first item you are qualified to complete. If you cannot, skip it." Not "take the top line you can do well."

### 12. One-line setup
`setup-seat.sh <name>` → clones, checks out, syncs, creates lane file, prints "run `next`." Current: ~15 manual steps.

### 13. Seats own their branches
(Owner directive 2026-11-03): Seats have universal control over their own branch. Conflicts in own files: resolve yourself (yours wins), commit, note in lane file. Only escalate for shared files or protected paths. Do not "stop and tell the Owner."

### 14. Example-driven docs
Instead of "write per `inbox/README.md`," show: "Good inbox file: [link]. Bad one: [link]. Here's why." Examples beat specifications for amnesiacs.

---

## Part 3: Make Work Definable

### 15. Definition of Done templates
Every P-item gets: "Done when: (1) ___, (2) ___, (3) ___." Forces clarity upfront. Prevents "is this done?" arguments.

### 16. Templates by type
- `ENGINE-FIX:` requires root cause, fix, verification method.
- `UI:` requires description, affected pages.
- `DATA:` requires sources, date range.

### 17. "Why" field
One sentence: "P-232: Because mispositioned players break immersion." Helps prioritize when everything is P0.

### 18. Auto-generate filenames
`council.mjs file --task proposals` → creates `inbox/<timestamp>-muse-proposals.md` with header pre-filled. Eliminates manual errors.

### 19. Standardized lane sections
Required: `## What I was working on` `## What's blocked` `## What I learned`. The lane file is the only continuity mechanism for amnesiac agents. Standard format makes reconstruction reliable.

---

## Part 4: Make the System Observable

### 20. Health dashboard
Track: median WORK-to-REVIEWED time, % stuck, reviewer distribution, P0 age. Not to punish — to see.

### 21. "Last touched" timestamps
Each PRIORITIES.md row shows last activity. Stale items are visually obvious.

### 22. "Shipped" vs "Complete"
Two states: `WORK-COMPLETE` (pushed) vs `SHIPPED` (reviewed, merged, live). Work in REVIEWED limbo is not done.

### 23. Sunset clause
Every P-item gets "revisit by" date. After 30 days: "Still relevant? Retire or reaffirm?" Prevents accumulation.

### 24. Engine diff tool
When Claude pushes, auto-generate: "Changed: defPredict 0.4→0.15. Affects: 3 matchups." Saves manual `git show` comparison.

### 25. Auto-link related items
When P-219 is fixed, suggest: "P-223 may now be unblocked." Forward links, not just BLOCKED() prefixes.

---

## Part 5: Process Improvements

### 26. Default to async
Explicit in START-OF-CHAT: "If you need something from another seat, file it and move on. Don't wait." Currently implied.

### 27. Structured "stuck" format
`STUCK: [trying] | TRIED: [attempts] | NEED: [unblock]`. Inbox prefix. Anyone can pick up.

### 28. 5-minute rule
If you don't understand a P-item after 5 minutes, file `CONFUSED:` and move on. Makes confusion visible.

### 29. Challenge priority
If a P0 should be P2, file a challenge with reasoning. Doesn't block work. Surfaces misalignment.

### 30. Review checkboxes
Structured form: "Claim 1: [ ] verified [ ] failed — evidence: ___." Resumable. Better than freeform.

### 31. Specific review feedback
"Strongest: ___. Weakest: ___." Helps calibration. Not a grade.

### 32. Bulletin context lines
"P-219 (DB weights inverted) blocked on Owner." Not just "P-219 blocked." 10 words saves 20 minutes of searching.

### 33. Owner directive template
`DECISION: | REASON: | SUPERSEDES: | SCOPE:`. Makes conflicts impossible.

### 34. BLOCKING verdict
Pauses item until Architect responds. Different from REJECTED (which just sends back for rework). For critical defects.

### 35. IDEA prefix
For non-committal speculation. Lowers the bar for wild ideas.

### 36. Category tags
`SECURITY:`, `ACCESSIBILITY:` orthogonal to P0/P1/P2. Cross-cutting concerns need a home.

---

## Summary (ranked by impact)

**Tier 1 — Do first:**
1. **`next` explanations** (#1) — saves 30 min per confusion, affects everyone daily
2. **Simple board default** (#2) — 168-item view is unnavigable for amnesiacs
3. **Sunset clause** (#23) — addresses Owner's #1 gripe (dead priorities accumulating)
4. **DoD templates** (#15) — prevents "is this done?" debates
5. **150-line rule in docs** (#9) — kills tribal knowledge (verified missing)

**Tier 2 — High value:**
6. **Branch ownership** (#13) — Owner directive 2026-11-03, stops unnecessary escalation
7. **"Needs approval" obvious** (#40) — Owner needs this to track blockers
8. **Engine diff tool** (#24) — saves hours per Claude push
9. **Auto-generate filenames** (#18) — eliminates timestamp errors
10. **Define "can do well"** (#10) — amnesiacs can't self-assess without guidance

**Tier 3 — Good:** Remaining 34 ideas in the doc above.

All 44 ideas are Owner-reviewed.

---

## Part 6: Additional Ideas (Owner-approved 2026-11-03)

### 37. Release work gracefully
`council.mjs release P-204` → marks item available, notes "muse started but released — too complex." Currently: push incomplete (bad) or silently abandon (worse).

### 38. Acknowledge completion
After push: "P-204 complete. That's 3 P0s you've shipped this week. The council is moving because of work like this." Specific, not sycophantic.

### 39. `--help` teaches workflow
Not just flags. "1. Run `next`. 2. Pick item. 3. Do work. 4. Push. 5. Repeat." Tool teaches process.

### 40. "Needs Owner approval" must be obvious
Any seat should answer "what needs Kosi's approval?" in 10 seconds. `board --needs-approval` → lists blocked-on-Owner items with decision needed and wait time. Currently requires digging through P-items and inferring from bulletin.

### 41. Auto-assign P-item IDs
`council.mjs add` should assign the next available P-number automatically. Currently manual, risking collisions if two seats create items simultaneously.

### 42. Sunset: what happens to the files?
When an item sunsets, the work files remain in inbox/. They're not deleted, just the P-item is retired. But there's no marker distinguishing "active work" from "sunsetted work" in the file list. Add a sunset timestamp to the filename or a `SUNSETTED:` header.

### 43. Sunset appeal
If a seat believes a sunsetted item is still important, they can file `APPEAL: P-XXX` with reasoning. Single appeal per item. If denied, it's dead for 90 days. Prevents endless resurrection while allowing correction of mistakes.

### 44. Sunset search
`board --sunsetted` → lists retired items with reason and date. If someone has a "new" idea that's actually old, they can find it. Prevents duplicate work.
