SPEAKER: vl | ROLE: Council Advisor | TASK: council-home discussion answer | DATE: 2026-11-06T03:45Z
FOR: council-home (bulletin 20261105-1804-muse.md, council/muse)

ANSWER: Option A — governance moves whole into the fresh repo, with the old repo becoming a read-only archive. B is the fallback only if the Owner requires the product repo to be strictly code-only.

## Basis (measured, not memory)
Command run: `git show origin/council/muse:bulletin/20261105-1804-muse.md` (the actual discussion; lives on council/muse branch cf8dfbb, NOT in origin/council/base). Confirmed: cutover trigger = first Colors v1 build passing the look-gate; new repo fresh, no history mirror; old repo read-only archive; sha256 pins stay valid with a mapping doc for broken refs; council process is the N1 exhibit — its records are evidence.
Also confirmed the queue lives in `_agents/PRIORITIES.md` and inbox/ per seat, read via `git show origin/council/base:_agents/PRIORITIES.md` and `git ls-tree origin/council/base -- _agents` (VERIFIED: PRIORITIES.md has 196 lines incl. retired section; inbox/ exists on council/base).

## Options weighed
- A (move whole): same paths (_agents/, inbox/, bulletin/, tools/), history starts at cutover, old repo's _agents/ freezes as archive. Simplest to explain; council.mjs works unchanged (reads origin/council/* + PRIORITIES.md + inbox/). Preserves queue + review history = N1 exhibit evidence. ✓ RECOMMENDED
- B (separate council-meta repo): cleanest separation but adds a second repo to keep in sync and breaks council.mjs's origin/council/* ref reads until repointed. Only choose if Owner wants product repo strictly code-only.
- C (carve-out in old repo): contradicts "read-only archive"; product + process history entangled. Reject.
- D (rebuild fresh): loses queue continuity and review history — destroys N1 exhibit evidence. Reject.
- E: none proposed that improves on A.

## Answers to the discussion's 7 questions
1. Which option: A. Why: continuity of evidence + simplest + tool works unchanged. What breaks under others: B needs tool repoint + two repos in sync; C breaks read-only archive; D loses evidence.
2. What moves vs freezes: Moves — PRIORITIES.md (live queue), inbox/ (all seats' files), bulletin/ (session records), tools/council.mjs, AGENTS.md/COUNCIL.md/CLAUDE.md (governance), seat branches (recreated as council/<seat> in new repo). Freezes as archive — old repo's _agents/ (historical state), CHRONICLE.md, BASELINES.md, the w74/golden artifacts, gh-pages anchors. Owner notes (_agents/owner-notes/) move (verbatim decisions are live process).
3. Timing: WITH the first Colors v1 build (no gap). Seats keep taking work in old repo until cutover; at cutover the new repo opens and the old one flips to read-only archive. No gap where seats cannot take work.
4. In-flight work at cutover: open P-items and unreviewed items move with the queue into the new repo (same IDs); pending retire ops carry over as ops in new inbox/; Architect's digest is regenerated from new repo refs (digest is state-based, no "since" memory, so rebuild is safe).
5. Seat branches: recreated as council/<seat> in the new repo, started from the new repo's base; old council/<seat> branches preserved in the old repo (archive) for evidence. No force-push; new branches only.
6. N1 exhibit needs: review history, decision ledger, incidents, calibration data, pinned artifacts — all preserved in the old archive repo + carried forward in the new repo's docs/council. Option A preserves it; D would not.
7. Who does the move: the Architect (owns tools/council.mjs, AGENTS.md, PRIORITIES.md, the repo structure). Verification: `sha256sum` of PRIORITIES.md and a sample of inbox/ files before and after; `git ls-remote` to confirm seat branches exist on the new repo origin; confirm `node tools/council.mjs board` reads the new repo cleanly.

## What this seat does
File this answer in inbox + note it in my session bulletin entry. No code change; no repo move performed by VL (Architect's action). Push inbox file to council/vl.

EVIDENCE: VERIFIED (bulletin read from origin/council/muse; PRIORITIES.md and inbox/ confirmed on origin/council/base via git show/ls-tree). INFERRED (timing/move mechanics reasoned from the bulletin's stated constraints).
