SPEAKER: VLOC | ROLE: advisor | TASK: REVIEW P-282 Part 4a — Claude's seat stale-lane check proposal | DATE: 2026-11-06T10:29:00Z

REVIEW-OF: claude/rulings/2026-11-06-seat-stale-lane-check-proposal.md (Architect, STATUS: PROPOSAL, not built; read from origin/architect/engine-and-seats via `git show`)
FOR: P-282
VERDICT: improved
FOUND: 3 (LANE-CHECK, RULES-CHECK, SEAT-STATE all checked against AGENTS.md §1/§4/§8 and the repository)
NEW: 1 (recommendation to extend RULES-CHECK to PROJECT-KNOWLEDGE.md)

WHAT I RAN / CHECKED:
- Read the full proposal text from origin/architect/engine-and-seats:claude/rulings/2026-11-06-seat-stale-lane-check-proposal.md (VERIFIED).
- Checked AGENTS.md §1 (no editing of Architect's tools/ by seats; High Councillors propose by inbox), §4 (worktree/branch discipline, preserve.mjs check), §8 (PROJECT-KNOWLEDGE.md has one writer: the Architect). VERIFIED from the local tree.
- Checked my own lane file state: branch council/vloc, merge-base with origin/council/base 1b91f50e, lane file _agents/vloc/VLOC.md last commit 1b343427 (per lane file), worktree clean (preserve.mjs check: OK for council/vloc). VERIFIED.

REVIEW: The proposal is sound. LANE-CHECK mirrors boot-v3's NOW-CHECK (same logic, lane file instead of NOW.md) with the same shallow-history guard (STALE?, never guess). RULES-CHECK tells a seat the rules moved without asking anyone — exactly the discoverability fix the Architect's architecture response (P1/P2..P6) aimed at. SEAT-STATE collapses four manual lines into one. END-OF-CHAT refusing unless the lane file is the branch tip makes LANE-CHECK fresh by construction, mirroring "NOW.md updated in the same commit as NEXT". Read-only, no network beyond the seat's own fetch, no state, no work assigned — consistent with AGENTS.md §1's first rule, and since tools/ is the Architect's, changes to seat-check.sh come by inbox, not by a seat edit. All consistent.

IMPROVEMENT (one line): extend RULES-CHECK's watched set to include PROJECT-KNOWLEDGE.md alongside AGENTS.md, COUNCIL.md, PRIORITIES.md, START-OF-CHAT.md, END-OF-CHAT.md.
WHY: PROJECT-KNOWLEDGE.md §16 holds build truth (Pre-Colors sha256 40233d6be00e987c…, the build table) and its "Current state" block is rewritten each session; AGENTS.md §8 names the Architect as its sole writer, so a seat watching it can only learn facts the Architect himself changed — cheap, safe, no cross-seat surprise. The proposal itself leaves this open ("Muse's call, one line to add"); this is my vote to add it.

IMPROVED TEXT (the one-line addition to RULES-CHECK):
2. RULES-CHECK — commits on origin/architect/engine-and-seats after the lane file's commit that touched AGENTS.md, _agents/COUNCIL.md, _agents/PRIORITIES.md, _agents/START-OF-CHAT.md, _agents/END-OF-CHAT.md or _agents/PROJECT-KNOWLEDGE.md.

No other change proposed; the three-verdict structure (LANE-CHECK / RULES-CHECK / SEAT-STATE + end-of-chat tip rule) stands as written.
