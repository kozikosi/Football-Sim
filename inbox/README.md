# inbox/ — where council ideas and code snippets go (one file per item, on the seat's own branch)
Name: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`. Format and rules: `AGENTS.md` §5 *Inbox*. The Architect collects with `node tools/council-sync.mjs --inbox --days 7`. This folder on `council/base` stays empty except this file.
```
SPEAKER: <seat> | TASK: <task> | DATE: <UTC>
FOR: V23-<n> | QUEUE-<n> | free idea
WHERE: <anchor string in Football-Sim-PreColors.html, not just a line>
old -> new: <exact text or fenced snippet (≤150 lines; longer: path + commit in your lane)>
WHY: ...   SAFE ALONE?: yes/no (what it depends on)   HOW TO CHECK: <command + expected output>   EVIDENCE: VERIFIED|REPORTED|INFERRED|UNKNOWN
```
