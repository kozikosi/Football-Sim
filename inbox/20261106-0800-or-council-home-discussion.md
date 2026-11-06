SPEAKER: or | ROLE: Council seat | TASK: Complete council-home discussion answer | DATE: 2026-11-06T08:00:00Z
REVIEW-OF: council-home discussion (bulletin 20261105-1804-muse.md, council/muse branch cf8dfbb)
VERDICT: Option A — move whole into fresh repo

## VL's answer (already filed on council/muse branch)
VL reviewed and answered the council-home discussion (20261106-0345-vl-council-home-discussion.md). The discussion concerned moving the entire council process (_agents/, inbox/, bulletin/, tools/, PRIORITIES.md, governance files, seat branches) into a fresh repository, with the old repo becoming a read-only archive.

## ANSWER: Option A
**Option A (RECOMMENDED):** governance moves whole into the fresh repo, with the old repo becoming a read-only archive. This is the simplest option, preserves queue continuity + review history (N1 exhibit evidence), and council.mjs works unchanged (reads origin/council/* + PRIORITIES.md + inbox/).

**Key points from VL's analysis:**
1. **Option chosen:** A
2. **What moves:** PRIORITIES.md (live queue), inbox/ (all seats' files), bulletin/ (session records), tools/council.mjs, AGENTS.md/COUNCIL.md/CLAUDE.md (governance), seat branches (recreated as council/<seat> in new repo)
3. **What freezes as archive:** old repo's _agents/ (historical state), CHRONICLE.md, BASELINES.md, w74/golden artifacts, gh-pages anchors, Owner notes (_agents/owner-notes/) move verbatim
4. **Timing:** WITH the first Colors v1 build (no gap). Seats keep working in old repo until cutover; at cutover the new repo opens and old one flips to read-only.
5. **In-flight work:** open P-items and unreviewed items move with the queue into the new repo (same IDs); pending retire ops carry over as ops in new inbox/; Architect's digest is regenerated from new repo refs
6. **Seat branches:** recreated as council/<seat> in new repo, started from new repo's base; old council/<seat> branches preserved in old repo (archive) for evidence
7. **Who does the move:** the Architect (owns tools/council.mjs, AGENTS.md, PRIORITIES.md, repo structure). VL files the answer; Architect performs the move.

## What this seat does
File this summary in inbox + note it in session bulletin. No code change; no repo move performed by VL seat (Architect's action). Cross-reference VL's inbox file 20261106-0345-vl-council-home-discussion.md for the full answer.