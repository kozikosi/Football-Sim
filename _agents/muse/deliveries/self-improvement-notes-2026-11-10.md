# Self-improvement notes — working the queue as a council member (MUSE, 2026-11-10)

Standing rule (Owner, 2026-11-09): when I execute the queue like a council member, I make notes on inefficiencies in how I delivered the prompt and things I wish had been told to execute and test better, then I make those improvements. Recursive self-improvement is the goal. This file is the running log. Each entry: what was inefficient, what I wish I had been told, and the improvement (made or filed).

## Session 2026-11-10 — 8 reviews + P-327 + P-328/P-329

### 1. `next` surfaces old P0 reviews before current P1 work
**Inefficiency:** The top `next` lines were all old P0 UI reviews (P-041, P-045, P-058, P-067, P-069, P-074 — late-October Pre-Colors work). The P1 items that matter now (P-325, P-326, P-327, P-328, P-329) were buried below them. I did P-327 from the council prompt highlights, not from `next` — the tool did not reflect the current priority.
**What I wish I had been told:** The council prompt's highlights ARE the priority; `next` is a fallback for when no highlight fits. Or: the tool should weight P1 items that unblock current work (P-327 unblocks P-323) above old P0 reviews.
**Improvement:** Filed as a council.mjs improvement (see P-331). The council prompt now states the highlights are the priority and `next` is the fallback. Longer term: `next` should print P1 items that are referenced in the current council prompt first.

### 2. Re-fetching the same shared files across reviews
**Inefficiency:** For each review I ran `git show` for the author's file, then `git show` for the repo file to verify (Pre-Colors, flex.json, boxscore.ts). I re-fetched Pre-Colors three times and flex.json twice before I started caching to /tmp.
**What I wish I had been told:** Fetch shared files once per session into /tmp and reuse them. The Pre-Colors file (657,486 B) and flex.json do not change during a session.
**Improvement (made):** I now fetch once per session (`/tmp/precolors.html`, `/tmp/flex-current.json`, `/tmp/boxscore.ts`) and reuse. Added to the review template below: "Fetch shared files once, reuse across reviews."

### 3. Push verification is slow
**Inefficiency:** Each push took 30–60s (push-files + sleep 8–10s + fetch + log). I pushed 6 times this session. The sleep is needed to let the push land before verifying, but verifying after every push is slow.
**What I wish I had been told:** Batch reviews 2–4 per push (I did this) and verify once per batch, not once per file. The push-often rule is about not losing work if the chat times out — batching 2–4 reviews per push is the right balance, and the verification can be a single fetch+log at the end of the batch.
**Improvement (made):** I batched 2 reviews per push and verified once per batch. This is now the stated practice in the review template.

### 4. No review template in the council prompt
**Inefficiency:** When I started reviewing, I had to read other seats' files (Inkling, Super, VL, VLOC) to learn the format (SPEAKER, ROLE, TASK, FOR, REVIEW-OF, VERDICT, evidence labels, HOW TO CHECK). A new seat wastes a chat learning this by imitation.
**What I wish I had been told:** The exact review format, up front, in the prompt.
**Improvement (made):** Added a review template to the council prompt (see the updated council-prompt file). It includes the header fields, the verification table format, the evidence labels, and the "fetch once, reuse" note.

### 5. Design proposals should include a runnable verification script
**Inefficiency:** Inkling's P-322 design claims a 97/105 exact fit, but the scratch script (`p322final2.py`) was not committed. I could not re-run the fit — I had to hand-recompute anchors from the matrices. Super's design had hand-computed anchors too. Hand-computation is slow and error-prone.
**What I wish I had been told:** A design proposal is not reviewable unless its numbers are reproducible. The script that computes the fit must be committed alongside the design.
**Improvement (filed):** P-328 (verify Inkling's 97/105 fit independently). Broader rule added to the council prompt: design proposals must include a runnable script (committed) that computes the claimed numbers, so a reviewer can re-run it instead of hand-computing.

### 6. `next` does not print the P-item brief
**Inefficiency:** When I took P-041 from `next`, I had to grep the 132 KB PRIORITIES.md to understand what the item was about. The tool prints the ID and the file to read, but not the brief.
**What I wish I had been told:** The P-item title + brief, alongside the file to read.
**Improvement (filed):** P-331 (council.mjs: print the P-item brief in `next`). This is a tool change for council.mjs v10.

### 7. flexengine.js spot checks are hand-maintained and go stale
**Inefficiency:** 20 of the 41 spot checks in flexengine.js were stale (I fixed them in P-327). They were hand-written against REV 2/REV 4 and never updated when the table moved to D-picks. Hand-maintained checks always go stale.
**What I wish I had been told:** The spot checks should be derived from flex.json, not hand-written.
**Improvement (filed):** P-330 (generate flexengine.js spot checks from flex.json). The spot-check values should be computed from the live table at build/test time, or generated by a script, so they cannot go stale.

### 8. Authors should include exact commands in filings
**Inefficiency:** When a filing cites a claim without the exact command, the reviewer has to guess how to re-check it. When a filing includes the exact command (VLOC's E-208 review listed the exact sed commands; Inkling's P-021 review listed the exact greps), verification is fast.
**What I wish I had been told:** Every claim in a filing should carry the exact command that produces it, so a reviewer can copy-paste to re-run.
**Improvement (made):** Added to the review template and the council prompt: "Include the exact command for every claim, so a reviewer can re-run it." The good seats already do this; it is now an explicit expectation.

## How to use this file

- After each council-work session, append a section with the inefficiencies noticed, what I wish I had been told, and the improvement (made or filed as a P-item).
- The improvements that are P-items go in PRIORITIES.md (P-330, P-331 filed 2026-11-10). The improvements that are prompt/doc changes go in the council prompt, START-HERE.md, or AGENTS.md as appropriate.
- Review this file before writing the next council prompt — the improvements should be in the prompt, not just in this file.
