# Owner, 25 Nov 2026 (REPORTED in the Owner's chat message; recorded by the Architect, append-only)

**Owner's words:** "the repo name is 76pancakes. you can answer all the other questions. the stats will appear on the site but no the files within the public repo ideally."

**Recorded as stated:** (1) repo name `76pancakes`. (2) The Architect answers the other open questions from `inbox/20261124-2142-…-DELTA-3.md` (delegation). (3) Player stats appear on the deployed site; the data FILES are not in the public repo ("ideally": a preference, not an absolute).

**My reading of (3) (I; correct me if wrong).** "Stats" = the player ratings/stats dataset, not the run ledger (the ledger lives only in D1 and was never a repo file). So the site shows the data but the repo never holds it. This replaces my 24 Nov dist recommendation ("ship no bundled data"). Fact, stated once, not legal advice: keeping the files out of the repo does not stop the site from serving them; anything the page loads, a visitor can fetch. The Owner has the rights picture (Delta 2); nothing deploys before "go".

## Architect answers under the delegation (each is mine, ratifiable, reversible before the repo goes public)
| # | Question | Answer |
|---|---|---|
| 1 | Org / repo | `kozikosi/76pancakes` (kozikosi owns the current repo, V remote URL); the Owner named no org, so one string to change. |
| 2 | LICENSE | MIT, `Copyright (c) 2026 kozikosi` (a handle, because I do not know a legal name); `NOTICE` says player data is not included and users supply their own. Not legal advice. |
| 3 | Which "merge" turns the old repos private | The cutover going live (new site deployed on "go" and verified), after the Exhibit export. Not the internal merge into `colors/`. |
| 4 | Dist and the data | The site loads the dataset as a separate deploy-time asset supplied from a private local source and never committed; the repo builds and boots without it (empty state). Details and zero-engine-byte wiring in `claude/pre-deployment-tasks-2026-11-25.md` T1. |
| 5 | Hide list | Ratified, 12 files (`claude/cutover-hide-list.txt`): the Owner's 3, the 5 HTML pages, `old-names-absent-in-new.txt`, `player-ids.csv`, the 2 mathlab JSONs. Dry run V: 0 files with 3+ of 60 sampled names, public gate 341 + 119 gated = 460, tsc 89, build OK. |
| 6 | Seam golden's player rows | In the new repo the golden is regenerated with names removed (ids, positions, ovr only) at the post-merge re-pin sitting; the `e8fed8ab` pin retires with a receipt that the kept fields are equal. The old repo keeps the old golden. |
| 7 | M-0 queue | MUSE's `_agents/QUEUE.md` (216 rows, includes P-296) becomes canonical for the cutover; `PRIORITIES.md` crosses frozen with a banner; `AGENTS.md:3` pointer updated in the same single commit. MUSE lands it; if MUSE has not by the next sitting, the Architect does it as one labelled commit under this delegation. |
| 8 | Exhibit | Pointer in commit 1, content in commit 3, as DELTA-2 section 6; the content is a static export with no player data. |
| 9 | `gh` vs `GH` | Superset `GH` is canonical, `gh` stays a branch alias (DELTA-1); not user-visible. |
