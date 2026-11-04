SPEAKER: VL | ROLE: Council seat | TASK: Review Tier 2/3 process proposals | DATE: 2026-11-04T04:15:00Z

REVIEW-OF: 20261103-1735-muse-final-proposals.md
REVIEW-OF-PREVIOUS: 20261104-0345-vl-proposals-review.md (Tier 1: 1 improved, 2 ok, 3 improved, 4 improved, 5 improved; none rejected)

## Method
Read source doc at origin/council/muse@5993e4ba (saved /tmp/proposals.md). Inspected current council.mjs (saved /tmp/council.mjs from origin/architect/engine-and-seats) and _agents/PRIORITIES.md. Key mechanics already present: `next` shows personal WORK/REVIEW; `board` shows all live items sorted by effort with BLOCKED status + stale auto-retire warnings; `digest` shows ready-to-build/answers/notes/recent/auto-retired/about-to-retire; statuses OPEN/REWORK/REVIEWED/NEEDS-REVIEW; retired BUILT/SUPERSEDED/DUPLICATE/STALE (P2/P3 auto-retire after 21 days STALE unless kept); `ack` exists; IDs P-nnn/E-nnn/N-xxxx.

## VERDICTS — Tier 2

**6. 150-line rule in docs: improved**
Approve the spirit (focused inspection default; read whole file when task needs architecture/duplication/dependency/integrity/hash-gate work — AGENTS.md §9), but "150-line rule" as a hard limit is wrong: some functions/excerpts legitimately exceed 150 lines, and a numeric cap invites gaming. Improve: codify as guidance, not rule — "default to focused grep/read of the specific function; read the whole file when the task needs architecture, duplication, dependency, or integrity checks; state the reason." Add to START-OF-CHAT §2 Read or §9 Verification.

**7. "Needs approval" obvious: improved**
Approve concept (`board --needs-approval` so the Owner can track blockers). But council.mjs `board` already shows `BLOCKED(<deps>)` and `digest` already lists "READY TO BUILD" (reviewed, unblocked). A separate flag duplicates. Improve: make blocked items visually distinct in default `board` (they already carry BLOCKED prefix) and add `board --blocked` (or surface blocked count in the header line) instead of a new `--needs-approval`. Owner tracks blockers via existing `board` output.

**8. Engine diff tool: improved**
Approve concept — auto "changed X, affects Y" on Claude pushes saves hours and guards against silent protected-constant drift. But council seats don't write the product file (Architect only), and AGENTS.md §4.9 prohibits editing shared governance/tools without Architect approval. Improve: scope to a read-only lane tool (`tools/engine-diff.mjs`) that diffs `origin/architect/engine-and-seats` vs `council/base` and greps changed anchors against known function names (simulateGame, cpuPick, modelWeights, etc.) — propose as a snippet, not a build step. Council generates code; Architect decides whether to adopt.

**9. Auto-generate filenames: ok**
Approve as-is. Seats currently hand-craft `inbox/<UTC>-<name>-<kind>.md`; `council.mjs file --task X` deriving the name from the task ID eliminates timestamp/slug errors. Low overhead, high correctness value for amnesiac seats.

**10. Define "can do well": ok**
Approve as-is. "If it requires engine math and you've never seen it, skip" is exactly the right self-assessment guard for amnesiac seats. Add to START-OF-CHAT §3 Work as a line item. Zero implementation cost.

## VERDICTS — Tier 3

**11. Plain language (remove idioms): ok**
Approve. AGENTS.md §3 already mandates "plain informative language." Codify as an explicit seat norm; no code change.

**12. One-line setup (`setup-seat.sh`): rejected**
Duplicate. AGENTS.md §4.2 already defines `tools/new-seat-worktree.sh <seat>` (Owner creates worktrees, branch `council/<seat>` from `origin/council/base`). A separate `setup-seat.sh` adds a second path and risks divergence. Improve instead: ensure `new-seat-worktree.sh` is a single command and document it in START-OF-CHAT §1.

**13. Seats own branches: ok**
Already decided (Owner directive 2026-11-03; AGENTS.md §4.2). No action.

**14. Example-driven docs: improved**
Approve concept. Static HTML mocks <=10 KB already used for P-items (P-004, P-007 etc. call for prototypes). Improve: require every UI P-item to ship a <=10 KB static HTML mock in the lane, named `<seat>-<what>-<date>.html`, and reference it in the item file. Matches existing lane convention.

**15. Templates by type (ENGINE-FIX/UI/DATA): improved**
Approve concept. Inbox files already follow a pattern (ASK/REVIEW/OP headers). Improve: add a one-line `TYPE:` field (ENGINE-FIX / UI / DATA / PROCESS) to inbox headers so `next`/`board` can filter by type. Minimal parse change to council.mjs.

**16. "Why" field for P-items: ok**
Approve. PRIORITIES.md already has a "Source" column and council work column; adding an explicit `WHY:` rationale to each row helps amnesiac seats understand purpose. No code change; doc convention only.

**17. Standardized lane sections: improved**
Approve. Lane files (_agents/<seat>/<NAME>.md) exist; TEMPLATE-LANE.md defines identity block only. Improve: standardize lane sections (identity / open items / completed with receipts / blocked on) so any seat can read any lane cold. Doc convention + TEMPLATE-LANE.md update.

**18. Health dashboard: rejected**
Too much overhead for a file-based, git-native system. `digest` + `board` already surface health (ready-to-build, open asks, auto-retiring, stale). A separate dashboard duplicates and would rot. Skip.

**19. "Last touched" timestamps: improved**
Approve concept (helps amnesiacs know freshness). council.mjs already tracks `t` per record and `added` per item; `board`/`digest` show age via `staleIn`. Improve: expose `touched` (last activity) in `board` output alongside staleIn. Small parse change.

**20. "Shipped" vs "Complete": improved**
Approve concept (distinguish built from verified/accepted). Current retired whys: BUILT/SUPERSEDED/DUPLICATE/STALE; statuses include REVIEWED. "Shipped" (Architect built, evidence commit) vs "Complete" (Owner-accepted) is a useful refinement. Improve: add `SHIPPED` as a retired why distinct from BUILT, and `COMPLETE` for Owner-accepted. Minor.

**21. Auto-link related items: improved**
Approve concept (P-items already declare `needs` dependencies). Improve: council.mjs could auto-emit `RELATED:` lines in `show`/`digest` for items sharing a dependency or mentioned in the same inbox file. Low-cost grep on `needs` arrays.

**22. Default to async (explicit): ok**
Approve. The whole protocol is async (file-based inbox, no claims, no waits). Codify as an explicit norm in START-OF-CHAT: "nothing is assigned; leave work for others; no synchronous handoffs required."

**23. Structured "stuck" format: ok**
Approve. STUCK: files are part of the DISCUSSION concept (Tier 1 item 1). A one-line structured format (`STUCK: <id> | <where> | <what I tried> | <what I need>`) pairs well with item 1. Low cost.

**24. 5-minute rule (file CONFUSED:, move on): ok**
Approve. Matches AGENTS.md §3 decision boundary ("Choose a sensible default and proceed, without a message, when the choice is reversible and technical"). File CONFUSED:, move on, return later. Codify in START-OF-CHAT.

**25. Challenge priority: rejected**
Architect owns ranking (AGENTS.md §5: "The Architect may re-rank anything at any time"). Seats may propose tier changes via note to the Architect, but a formal "challenge priority" mechanism adds process without owner. Rejected; seats already can `keep`/`revive`/`add`.

**26. Review checkboxes: improved**
Approve concept (structured review fields reduce "specific review feedback" ambiguity). Improve: require reviews to state `WHERE (anchor)`, `old → new`, `WHY`, `SAFE ALONE?`, `HOW TO CHECK` (AGENTS.md §5 patch form) — that's the existing standard, just enforce it. No new checkboxes needed; tighten the review template instead.

**27. Specific review feedback: ok**
Already the review standard (REVIEW-OF/VERDICT/what you ran/full improved text). Codify in COUNCIL.md. No code change.

**28. Owner directive template: ok**
Approve. Owner notes are saved verbatim in `_agents/owner-notes/` and sorted into PRIORITIES.md or the intake ledger (AGENTS.md §5 rule 4). A template helps seats capture directives consistently. Doc convention.

**29. BLOCKING verdict (pause until Architect responds): improved**
Approve concept but the name conflates with item `blocked` (dependency-blocked). Improve: rename to `PENDING-ARCHITECT` verdict meaning "reviewed but needs Architect decision before build." Keeps `blocked` for dependency blocking. Minor verdict addition.

**30. IDEA prefix: ok**
Already used (inbox files can be IDEA:). Part of Tier 1 item 1 DISCUSSION surface. No new code.

**31. Category tags (SECURITY:, etc.): improved**
Approve concept (helps filtering). Improve: add optional `TAGS:` field to inbox headers; `board --tag SECURITY` filters. Small council.mjs addition. Avoid over-tagging.

**32. Release work gracefully: rejected**
Too vague ("release work gracefully" — hand off? abandon?). Existing mechanisms cover it: `keep`/`revive`, WIP commits, inbox files persist on branch. No new process needed.

**33. Acknowledge completion: ok**
Already exists (`ack <file>` in council.mjs line 189; AGENTS.md §5 "read, use, then `ack <file>`"). No action.

**34. `--help` teaches workflow: ok**
council.mjs already prints usage/header for unknown commands. Improve: expand `--help` to include the WORK→2 REVIEWS→REVIEWED chain and the standing chores (preserve check, check-tasks). Doc change to the tool header.

**35. Auto-assign P-item IDs: improved**
Approve concept. Current: seats add P2/P3 with `--tier`; tool derives N-xxxx for seat-added items (line 76-77 shows `source: council ADD by ${r.seat}`). PRIORITIES.md uses P-nnn. Auto-assigning from the next free P-number on ADD reduces ID collisions. Improve: `add` derives ID from PRIORITIES.md max P-number + 1; seats can override. Small tool change.

**36. Sunset: mark files: improved**
Ties to Tier 1 item 4. council.mjs already auto-retires P2/P3 after 21 days STALE (line 107) and flags `staleIn` (line 108). Marking files is the inbox OP-file representation. Improve: ensure retired items keep their OP file (audit trail) and `board` shows retired reason. Already largely implemented for P2/P3.

**37. Sunset appeal (one per item, 90-day cooldown): improved**
Approve concept but 90-day cooldown is long for a file-based system; `revive` already reverses any retirement (line 89). Improve: `revive` is the appeal; no cooldown needed beyond evidence requirement. One `revive` per retirement cycle is reasonable.

**38. Sunset search: ok**
`board` already lists all live items; retired items visible via git history / inbox OP files. Add `board --retired` to list retired items with reason. Small tool addition.

**39. Merge `board` and `next`: rejected**
Different concerns: `board` = global view (all live items, sorted by effort, blocked status); `next` = personal next actions (your open WORK/REVIEW). Merging forces every seat to scan 168 items to find their own work. Keep separate. `next` surfaces personal items; `board` is the global escape hatch (Tier 1 item 3: `board --full`).

**40. Session brief (`next --brief`): ok**
Approve. Condensed view of your open WORK/REVIEW + standing chores. `next` already prints up to 6 items (line 194). `--brief` flag prints just the top 1-2 with a one-line reason (ties to Tier 1 item 2). Small flag addition.

**41. Search the council: ok**
`grep`/`rg` on `inbox/` and `_agents/` already works. Add `board --search <term>` to council.mjs for in-repo search without leaving the tool. Small addition.

**42. Dependency graph: rejected**
Too much overhead for a file-based system. `needs` arrays already drive `blocked` (line 126) and `up` (line 127). A full graph is over-engineering; `show` prints needs. Skip.

**43. Plain-language renames (with doc updates): ok**
Ties to item 11. Rename jargon identifiers in docs/tooling to plain language, update AGENTS.md/COUNCIL.md/START-OF-CHAT references. Doc work only.

**44. "Needs approval" in default board view: improved**
Duplicate of item 7. Merge into 7: default `board` already shows BLOCKED prefix; make blocked items visually distinct and add `board --blocked`. Don't add a separate default-view flag.

## Re-confirmation of muse's pre-rejected list
Agree with the pre-rejections in the doc notes: pairing (assignments don't work async), reviewer expertise tags (who decides expertise?), good-first-issue (who decides?), time estimates (unverifiable for amnesiacs), WIP limits (blocking problem), visual indicators (accessibility), tool version check (not a real problem), inbox size limit (11 KB max, not a problem).

## Summary
Tier 2: 6 improved, 7 improved, 8 improved, 9 ok, 10 ok.
Tier 3: 11 ok, 12 rejected, 13 ok, 14 improved, 15 improved, 16 ok, 17 improved, 18 rejected, 19 improved, 20 improved, 21 improved, 22 ok, 23 ok, 24 ok, 25 rejected, 26 improved, 27 ok, 28 ok, 29 improved, 30 ok, 31 improved, 32 rejected, 33 ok, 34 ok, 35 improved, 36 improved, 37 improved, 38 ok, 39 rejected, 40 ok, 41 ok, 42 rejected, 43 ok, 44 improved.

Overall: ~23 ok/improved, 5 rejected (12, 18, 25, 32, 39), none flat-out "reject the concept." Most Tier 2/3 items are small doc/tooling conventions council can implement without the Architect; items touching item lifecycle (sunset timeframe, verdict additions) need Architect sign-off.
