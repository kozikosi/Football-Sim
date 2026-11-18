# START HERE — every council seat, every chat
(Read this from `origin/council/muse` — it is always the current version. Your prompt points here, so you do not need a longer prompt.)

**THE RULE: nobody is assigned to anything.** Work comes from one ranked list; you take the top item you can do; later seats review it. Never wait for a particular seat, and never tell another seat what to do.

## 1. Orient
`pwd; git branch --show-current; git rev-parse --git-common-dir`
You must be in `.../wt/<your-name>` on branch `council/<your-name>`. If not, stop and tell the Owner.
`git fetch -q origin && git show origin/council/base:tools/sync-base.sh | sh`
(Merges `council/base` into your branch; on a conflict in a file that is not yours, base wins.) Then `node tools/preserve.mjs check` (reports unsaved work anywhere; does not touch it).

## 2. Read — only what you need
- **If a task is given in your prompt:** read ONLY the files that task names. Do NOT read AGENTS.md, PROJECT-KNOWLEDGE.md, COUNCIL-BULLETIN.md, V23-OWNER-REQUESTS.md, or your lane file first. Go straight to the task.
- **If NO task is given:** read AGENTS.md, then your lane file `_agents/<your-name>/<NAME>.md`, then go to §3 to find work.

## 3. Find work — only if no task is given
Get the tool into your WORKTREE (not /tmp): `git fetch -q origin && git show origin/architect/engine-and-seats:tools/council.mjs > ./.council_tool.mjs`
(The tool produces NO output from /tmp on a Mac — a guard bug. Run it from your worktree.)
`node ./.council_tool.mjs next` — it prints your next actions, by tier. Take the first line you can do well. Delete `.council_tool.mjs` before you push.
Note: the tool reads PRIORITIES.md from the architect branch. Items on `council/muse` may not appear in `next` — if the Owner named a P-item, read it directly: `git show origin/council/muse:_agents/PRIORITIES.md | grep P-XXX`.

## 4. Work
You advise: propose, test, review, dissent in writing, measure. You never edit the product file, AGENTS.md, CLAUDE.md, PRIORITIES.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants, and you never assign work to a named seat. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN; "done" needs a command and its output.
- WORK: write `inbox/<UTC yyyymmdd-hhmm>-<name>-<ID>-<slug>.md` per `inbox/README.md` (exact snippet, anchor string, how to check, evidence label).
- REVIEW: read the author's file, check every claim against the repo with commands, then write `inbox/<UTC>-<name>-<ID>-review.md` (`REVIEW-OF:`, `VERDICT: ok|improved|rejected`, what you ran). You may not review your own work or the same item twice. Three ok/improved from three seats = REVIEWED.
- Save as you go: `git add -- <your paths>`, commit, `git push origin council/<name>` after every finished file. Your own `council/<name>` is the only branch you push. Never force-push, never `git stash` (WIP commit instead).
- Nothing is "delivered" until a pushed commit (give the hash) or a download link exists — never give the Owner a sandbox path.
- Only the Owner or the Architect moves P-items to terminal states (BUILT/SUPERSEDED).

## 5. Stop
Run `_agents/END-OF-CHAT.md` (read it via `git show origin/council/base:_agents/END-OF-CHAT.md`) when any is true: ~80–100k tokens used · you switch task area · you re-read a file you already read · your replies get shorter or drop detail · one tool result exceeds ~50k tokens. Say: "Token budget is low — start a new conversation. Lane file updated and pushed; read it first."
