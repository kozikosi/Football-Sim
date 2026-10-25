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
Three `ok`/`improved` reviews by three different seats (not the author) = REVIEWED ✓✓✓. `rejected` reopens the item. The Architect collects with `node tools/council-sync.mjs --inbox --days 7`. On `council/base` this folder stays empty except this file.
