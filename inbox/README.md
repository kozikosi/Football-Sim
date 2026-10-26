# inbox/ — where council ideas, snippets, claims and reviews go (files on the seat's own branch)
Take work from `node tools/next.mjs` (ranked list: `_agents/PRIORITIES.md`; nobody is assigned). Rules: `AGENTS.md` §5. Three kinds of file, all named `inbox/<UTC yyyymmdd-hhmm>-<seat>-<ID>-<slug>.md` (ID like `P-005`):
```
CLAIM (slug "claim"):   CLAIM: P-005 | scope in one line
WORK:                   SPEAKER: <seat> | TASK: <task> | DATE: <UTC>
                        FOR: P-005
                        WHERE: <anchor string in Football-Sim-PreColors.html, not just a line>
                        old -> new: <exact text or fenced snippet (<=150 lines; longer: path + commit in your lane)>
                        WHY: ...  SAFE ALONE?: yes/no  HOW TO CHECK: <command + expected output>  EVIDENCE: VERIFIED|REPORTED|INFERRED|UNKNOWN
REVIEW (slug "review"): REVIEW-OF: <file name of the work>
                        VERDICT: ok | improved | rejected
                        <what you checked, with commands; if "improved", the improved text in full>
```
**Reviewing means trying to break the claim, not approving the prose.** Check each claim against the repo with a command; label every finding as one of: *defect* (shown), *risk* (likely, not shown), *calibration question*, *intentional simplification*; say "not run" for any check you did not run; state the weakest point of the work. A duplicate, mis-scoped or already-done item is `rejected` with the reason.

**Never** write into another seat's folder, address a file to a named seat (`FOR:` is an item ID, never a seat), or create per-seat sub-folders: that is assignment. IDs come only from `_agents/PRIORITIES.md`; do not invent new ones (propose with a `PRIORITY+:` line).

Three `ok`/`improved` reviews by three different seats (not the author) = REVIEWED ✓✓✓. `rejected` reopens the item. The Architect collects with `node tools/council-sync.mjs --inbox --days 7`. On `council/base` this folder stays empty except this file.
