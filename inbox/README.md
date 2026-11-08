# inbox/ — where council ideas, snippets, reviews, ops and asks go (files on the seat's own branch)
Protocol: `_agents/COUNCIL.md`; run `node /tmp/council.mjs next` (fetched per START-OF-CHAT). Nobody is assigned and there are no claims. Kinds of file, all named `inbox/<UTC yyyymmdd-hhmm>-<seat>-<ID>-<slug>.md` (ID like `P-005`):
```
OP (use the tool):      OP: RETIRE|REVIVE|KEEP|ADD|PROBE ...   (written by `council.mjs retire|revive|keep|add|probe`)
ASK / ANSWER:           ASK: <question> / FORMAT: <shape>        ANSWER-OF: <ask file name>  (+ the answer)
NOTE to the Architect:  TO-ARCHITECT: <one line>   (+ detail; stays in his digest until he acks it)
WORK:                   SPEAKER: <seat> | TASK: <task> | DATE: <UTC>
                        FOR: P-005
                        WHERE: <anchor string in Football-Sim-PreColors.html, not just a line>
                        old -> new: <exact text or fenced snippet (<=150 lines; longer: path + commit in your lane)>
                        WHY: ...  SAFE ALONE?: yes/no  HOW TO CHECK: <command + expected output>  EVIDENCE: VERIFIED|REPORTED|INFERRED|UNKNOWN
                        Handoff fields (CICCP-3; REQUIRED for P0 items, optional elsewhere; a missing one is asked for, never inferred):
                        GOAL_INVARIANT: <the Owner's verbatim line this work serves, cite the intake-ledger section>
                        WRITE_SCOPE: READ_ONLY | LANE_ONLY | ARCHITECT_REQUIRED
                        DEPENDS_ON: <P-id / task id / file#anchor / decision, one per line; "none" is a value>
                        PRECONDITION: <what must be true first + the command that proves it>
                        REPRODUCTION: <full command, so a reviewer can re-run it>
                        UNCERTAINTY: <what was NOT run>
REVIEW (slug "review"): REVIEW-OF: <file name of the work>
                        VERDICT: ok | improved | rejected
                        <what you checked, with commands; if "improved", the improved text in full>
```
**Reviewing means trying to break the claim, not approving the prose.** Check each claim against the repo with a command; label every finding as one of: *defect* (shown), *risk* (likely, not shown), *calibration question*, *intentional simplification*; say "not run" for any check you did not run; state the weakest point of the work. Five edge questions on every review: (1) quote the `GOAL_INVARIANT` and check it against the intake ledger; (2) were `DEPENDS_ON` / `PRECONDITION` run, not assumed; (3) do names and labels match the single authority; (4) is the `EVIDENCE` label honest (a receipt is present when it says `VERIFIED`); (5) can you re-run it from `REPRODUCTION` alone; if not, ask, do not infer. A duplicate, mis-scoped or already-done item is `rejected` with the reason.

**Never** write into another seat's folder, address a file to a named seat (`FOR:` is an item ID, never a seat), or create per-seat sub-folders: that is assignment. IDs come from the queue; new items are created with `council.mjs add` (the tool derives the ID).

Reviews are continuous-trust (_agents/COUNCIL.md §2b): add optional `FOUND: <n>` and `NEW: <n>` lines (findings in your review, and how many no earlier review had); the item is REVIEWED once the latest review finds <10% new (min 2 seats, cap 8). `rejected` reopens the item. The Architect collects with `node tools/council-sync.mjs --inbox --days 7`. On `council/base` this folder stays empty except this file.
