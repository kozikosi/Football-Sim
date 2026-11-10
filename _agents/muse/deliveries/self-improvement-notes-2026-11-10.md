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

### 9. The council prompt's highlights named items that are blocked, so `next` could not surface them
**Inefficiency:** The 2026-11-10 council prompt's Work highlights (P-324, P-326, P-325, P-328, P-322, P-329, P-330, P-331, P-323, P-315, P-312, P-313, P-311) are mostly blocked by dependencies (P-326/P-325 by P-321, P-322 by P-294, P-328 by P-322, P-329 by P-195, P-323 by P-311, P-330/P-331 by P-327) or already handled by the seat reading the prompt. A seat that reads the prompt and runs `next` sees old P0 reviews, not the highlights — the prompt and the tool disagree about what is available, and the seat wastes time taking a highlight only to find it blocked.
**What I wish I had been told:** Which highlights are blocked and what unblocks them, so I take the unblocker instead of the blocked item.
**Improvement (to make):** In the next council prompt, annotate each highlight with its dependency status (e.g. "P-326 — blocked by P-321; do P-321 first" / "P-328 — blocked by P-322"). Longer term, `council.mjs next` could print the top blocked highlight with its blocker, so the seat can work the unblocker. The P-331 highlight boost only reorders *available* items; it cannot lift a blocked one.

### 10. `readFrom` read the Architect's stale PRIORITIES.md, not the live queue
**Inefficiency:** `council.mjs` `readFrom` read PRIORITIES.md from the Architect's branch first, then council/base — never from origin/council/muse, even though the live queue is on council/muse (MUSE is custodian, Owner 2026-11-09) and the council prompt says so. A council seat running `next`/`board` therefore read the Architect's stale queue: newly filed items (P-330, P-331) never appeared, and the board showed 164 live / 6 retired instead of the live queue.
**What I wish I had been told:** The tool reads the live queue from council/muse.
**Improvement (made):** council.mjs v10 (P-331) — `readFrom` now tries `origin/council/muse` first, then the Architect's branch, then council/base, then the local file. Files council/muse lacks (BUILD.txt, STALE-EPOCH.txt) fall through as before. After the fix the board shows 176 live / 3 retired and P-328/P-329/P-330/P-331 appear.

### 11. Newly added P2/P3 rows were instantly auto-retired STALE
**Inefficiency:** `derive` auto-retires P2/P3 items with no activity for ≥21 days. `touched` for a table row with no files/ops is `max(epoch, added || 0)`. When the epoch is 0 (STALE-EPOCH.txt missing/empty — it does not exist on council/muse), `touched` is 0 and the age is ~20,000 days, so a P2/P3 row filed today was retired STALE on the next `board`/`next` run. P-330 and P-331 were both retired this way the day they were filed.
**What I wish I had been told:** A stale item needs evidence of inactivity, not the absence of a timestamp.
**Improvement (made):** council.mjs v10 (P-331) — the STALE auto-retire (and the warn window) now requires `touched > 0`. With the real epoch (2026-11-02, from the Architect's STALE-EPOCH.txt) P-330/P-331 have age 8 days and are live either way; the fix covers the epoch-missing case.

### 12. `flexdl5.mjs` is never run as a gate, so a stale flex-dl5.json survived
**Inefficiency:** `flexdl5.mjs` already has a check mode that fails when flex-dl5.json differs from the derivation ("re-run with --write after a guide change") — but nothing runs it. The flex-dl5.json was stale (TE 6, OT 4, OG 4, C 4, ILB 4, OLB 4, from an older table) while the current 97-rule flex.json derives TE 12, OT 6, OG 6, C 12, ILB 12, OLB 12. The staleness survived because flexengine.js was never run end-to-end (it needs Playwright + a built page), so the compiled FLEX table carried the stale DL5 values and the old hardcoded spot checks (which were correct) would have failed against the engine. P-330's derivation work exposed it by accident.
**What I wish I had been told:** Run `node tools/mathlab/flexdl5.mjs` after any flex.json change.
**Improvement (noted, not yet a gate):** The P-330 work file records the gap. A future gate (or a note in the flex-change checklist) should run `flexdl5.mjs` after any flex.json change. I did not add a gate here — that is the Architect's call — but the next council prompt should carry the reminder.

### 13. A builder's "retired/removed" claim needs a grep of the live file, not trust
**Inefficiency:** Z.ai's w88 build report claimed the "'QB anchored at 1000' caption retired" — but the caption is still in two live display spots in the position rankings (a tooltip and a caption). The claim was taken at face value in my P-324 verification review; the live-file review caught it only because I grepped the file for the exact string. A builder's self-reported removal is not evidence the string is gone.
**What I wish I had been told:** For every claimed retirement/removal in a build report, grep the live file for the exact string and confirm zero hits (or confirm the hits are comments/dead code only).
**Improvement (to make):** Add to the review checklist (council prompt, P-324 pattern): when a build report claims a caption/label/wording was retired or removed, the reviewer greps the live file for that exact string and reports the hit count and locations. The P-324 live review did this for "QB anchored at 1000" (4 hits: 2 comments, 2 live display) and for "70→90" (3 hits, all internal calibration code/comments — correctly retired from display copy).

### 14. A design's D layer must say whether D was recomputed or taken from a file
**Inefficiency:** Inkling's P-322 design claims a 97/105 exact fit, and the fit reproduces (P-328 verified the formula layer: my independent implementation gives the same 97/8 from the same D inputs). But the D values are thetaprice pre-bump D@90 plus two Owner-estimated bumped values (~6.7) — Inkling did not load the engine or recompute slotWins20, and the design admits the fit is INFERRED at the D layer. A reader who sees "97/105 exact" without that qualifier overstates what was verified.
**What I wish I had been told:** Which layer a fit verification covers (formula vs D) and where the D values came from (recomputed from the engine, or taken from a file + estimates).
**Improvement (made in the P-328 review):** The P-328 review labels the D layer INFERRED and names the D source (thetaprice pre-bump D@90 + Owner-estimated ~6.7 for OLB>ILB/OLB>SS), while the formula layer is VERIFIED. The next council prompt should carry this as an expectation: a design that claims a fit against engine-derived D values states whether D was recomputed from the engine or taken from a file, and a verification names which layer it covers.

### 15. The flex table's destination is the ROLE, not the SLOT — so a placement's rule is not the slot name
**Inefficiency:** When I read the 4-3→3-4 breakdown I first wrote the rules as "FB>TE3" and "TE>SAM" — but those are not table rules. The TE3 slot's dest is TE, so the rule is FB>TE. The SAM slot's dest is OLB, so the rule is TE>OLB. DIME is both a slot and a role (dest DIME), so TE>DIME is direct. I had to re-derive the rule names from slots.ts before the numbers made sense. Worse, OLB>DT is MISSING from the table, yet the optimizer places an OLB at DT2 with penalty 6 — that penalty comes from a stand-in/default path, not a table rule, so a reader who greps flex.json for OLB>DT finds nothing and thinks the placement is unexplained.
**What I wish I had been told:** For every flexed placement, name the RULE (source role → dest role) and say whether the penalty comes from a table rule or a stand-in/default path.
**Improvement (made in the P-332 work file):** The P-332 note names the rule for each placement (FB>TE, TE>OLB, TE>DIME) and flags that OLB>DT is not a table rule. The next council prompt / review checklist should carry this: when reporting a lineup placement, give the rule, not the slot name, and flag any placement whose penalty has no table rule.

### 16. A verification brief with a hardcoded test/pin value goes stale the moment the table moves again
**Inefficiency:** P-323's brief said "fix the 3-4 test to 2700, re-pin to `nfl1.14a4e9333e888a`" — written as if the flex table were frozen at `97d7e9d`. Option B was decided the same day, changing the test to 2200 and the pin to a new hash. A seat reading P-323 after Option B lands would apply the wrong fix. The brief's fix direction was a snapshot, not a live value.
**What I wish I had been told:** A verification brief's fix direction is only valid for the build it verified; a new flex change supersedes it.
**Improvement (made):** When Option B was filed (P-332), I added a supersession note to the P-323 brief the same turn ("the fix direction is SUPERSEDED by Option B — the 3-4 test now goes to 2200 and the pin is a new hash"). Standing practice from now on: the moment a new flex change is decided, update any open verification brief that names a hardcoded test or pin value. Longer term, a verification brief should point at "the value the council reports after verification" rather than hardcoding the number — but the immediate fix is the same-turn update, which I did here.
