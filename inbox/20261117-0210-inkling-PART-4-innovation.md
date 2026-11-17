SPEAKER: inkling | ROLE: council | TASK: Part 4 — innovation: a better no-cap test for the gap condition, and workflow ideas | DATE: 2026-11-17T02:10Z
FOR: P-333

# Part 4 — Innovation (ideas, not reviews; no verdicts, no checkmarking)

## A. A better no-cap test for the Owner's gap condition

**The problem Part 1 exposed.** The static roster-attribute measurement — "given THIS roster as it exists, which base wins" — is exactly the wrong question for a *draft* game. The real condition the Owner wants to test is draft-time: *at the moment of pick, does the board pressure differ between the two bases?* Today's lineupFor comparison compares two fully-baked rosters **after** everything has been filled. A cleaner, draft-aligned test:

**Proposal A — "the draft-path test."**
- **What it is:** For each of the 32 teams, run the engine's own `newDraft` (seed pinned — same seed for both arm runs of the experiment) to a completed 32-man draft. One arm: the league drafts under a 4-3-only template for every team (every team plays 4-3, always). The other arm: the league drafts under a 3-4-only template.
- **Measurement:** after the draft completes, compute each team's lineup value in its own base (its best base), plus the would-be value in the other base. Then aggregate across 32 teams: mean own-base value minus would-be-other-base value. The far side is a **floor test that no cap can contaminate** — both arms see the same pool.
- **The gap condition embedded in it:** if the pool had a fixed scarcity of DT2-class bodies, both arms hit it equally; the differential reads the *shape* of the available talent, not the roster construction. Repeat the experiment over 25 seeds and report the mean + distribution.
- **What it costs:** one additional `runDraft` invocation (the Architect's `newDraft`/`runDraft` path, the same route the Architect's engine tests already replay); one lineup solve per team after the draft; optional: one synthetic-vs-real flex toggle vs. one flex structure to see whether the flex ruling bites in draft selections. Roughly 30 seconds of compute per seed, 12 minutes for the full sweep.
- **Why it's better than today's probe:** it tests the exact condition the Owner named ("a bad DT2 is left on the draft board") in the exact fire regime where it matters (the draft, not the finished roster), requires no cap and no assumed OVR floor, and produces a single league-level answer with a standard deviation.
- **Concrete acceptance:** another seat could implement this with `seasonfixture.mjs` (already in the repo) as a template with the template-base toggled; one file, one CLI; output: 32 team values + league mean + the seed sweep stats.

**Proposal B — "the two-arm draft with free-agent check."**
Draft the 1,953 pool as-is (no cap, no modifying the ratings), then shuffle the STARTING slots: for each team, swap its real-word contingent (a 4-3-shaped roster for a 3-4-shaped one) at random positions in the seed order, hold seeding fixed, and re-run. The worst/best DT2 conditional distribution becomes reportable as a percentile band. The advantage of B over A: it tests the *decision asymmetry* across ALL 32 seeds, not one. The cost is higher (32 seeds × 2 arms × 32 teams), but the output measures the exact condition and its variance.

**Proposal C — "the DT2-threshold sweep" — replaced by the Owner's explicit no-cap direction.**
Every cap-based approach is dead per the Owner's ruling. Do not re-introduce one; treat this file as the record of why not (the whole cap v1 discussion is safely behind us).

**Honest limitation of A and B:** both rely on the engine's own draft logic to produce rosters; if the engine's draft logic has any bias (e.g., it is tuned for 4-3 availability), the benchmark inherits it. That limitation cuts both ways: the bias itself is then also visible, and can be measured directly.

## B. Workflow & the future — six proposals for the Owner to rule on

**1. A "council checkpoint" pass on every delivered increment.** Every delivered increment (a Cakepanz slice, a Colors engine step) gets a standard-form pre-merge review: **Facts × Files × Questions**. Facts: what changed (diff stat, tests, gate status). Files: which files moved, with why. Questions: which Owner questions this increment creates. The harness already does the review; the missing artifact is a 100-line template that turns it into a one-page answer for the Owner instead of a prose summary. Proposal: a 6-field template, one per increment, saved as `CHECKPOINT-<name>.md` in the lane.

**2. A "queue-row hygiene cross-check" in MUSE's next sweep.** R-13 and P-345 were doubled-tagged by multiple seats this round; the queue has no cross-check for it. Proposal: an automated flag on every council bulletin/patch `FOR:` line: if the tag is not an existing queue row, it surfaces a neutral note — not blocking, just calling out. Proposal: a 3-line addition to `tools/council.mjs board` (or the custodian script), one cron/weekly check.

**3. A "reconciliation day" schedule.** The two independent seam-checkers (inkling's `seam-check.mjs` + GLM's seam-checker) both exist and are both valid; they should land as one canonical tool. Proposal: 2 hours of reconciliation work by MUSE; the winner stays; the loser is retired by a note, not deleted. Same for the two independent contrast-check scripts and the two Part-10 verifications. Nothing new gets built while duplicates exist that are not yet reconciled. Rule of thumb: **one working artifact per need, then delete the other — except when the two disagree, in which case both stay and the disagreement is filed.**

**4. An "Owner five-minute read" as a deliverable shape.** Every Owner-facing work (review verdict, v4-class ruling request, merge-ready report) should carry a ≤5-min summary in the first 2000 words. The v4-class prompts show how: the document answers every term where it first appears; nothing else is needed to evaluate the ask. Two heuristics: (a) every document that asks the Owner to decide must name every option with a one-line recommendation, (b) no document longer than 2,000 words without an executive summary at the top.

**5. A "council newcomer path" for the 76 Pancakes v2 pipeline.** The current council/infra overhead is proportional to review quality — but the cost of a newcomer seat is high. Proposal: a `NEWCOMER-START.md` that takes a cold reader from `git pull` to a first review in < 30 minutes, with the four council read-entries, the three trees table, the two miscounts, and the two pins (which files each carries). MUSE maintains it as a living document; agents re-read it or their lane file says they did.

**6. A "cutover readiness dashboard" — the machine-readable version of the Part-14 checklist.** The Part 14 checklist (`inbox/20261116-2225-inkling-CAKEPANZ-SHELL-cutover-checklist.md`) is the council's most expensive artifact — a human proof that six checks go red on the current shell. It's a static file. Proposal: convert the checklist into `tools/cutover-check.mjs` — a script that runs all 15 checks and prints the pass/fail matrix. Every change to the shell/engine re-runs it; a red row means "incomplete for cutover," not "broken." Re-runnable, automatic, one-page answer instead of prose.

All six are cheap-to-moderate; none requires the Owner's attention beyond a yes/no ruling and an owner-decision on the order.
