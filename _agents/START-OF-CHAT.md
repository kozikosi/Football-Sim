# START OF CHAT — every council seat, every chat
(Your prompt told you to read this from `origin/council/base`, so it is always the current version, whatever state your branch is in.)

**THE RULE: nobody is assigned to anything.** Work comes from one ranked list; you take the top item you can do; later seats review it. Never wait for a particular seat, and never tell another seat what to do.

The Owner opened this chat in your worktree `../wt/<name>` (branch `council/<name>`). **You do not create worktrees.** If `pwd` is not `.../wt/<name>` or the branch is not `council/<name>`, stop and tell the Owner (command in the Project doc `chat-management.md` §1).

## 1. Orient (commands, with output in your first reply)
```
pwd; git branch --show-current; git rev-parse --git-common-dir     # must end in "Football Sim/.git"
git fetch -q origin && git show origin/council/base:tools/sync-base.sh | sh
```
`sync-base.sh` merges `council/base` into your branch; on a conflict in a file that is not yours, base wins; a conflict inside your own files stops it and you tell the Owner. Then `node tools/preserve.mjs check` (unsaved work anywhere is reported, not touched).

## 2. Read (in this order, before any work)
1. `AGENTS.md`  2. `PROJECT-KNOWLEDGE.md`  3. `COUNCIL-BULLETIN.md` (the CURRENT ROUND block first)  4. `_agents/V23-OWNER-REQUESTS.md`  5. your lane file `_agents/<name>/<NAME>.md` (`find _agents -iname '<name>.md'`; if it sits elsewhere `git mv` it to that path; if none exists copy `_agents/TEMPLATE-LANE.md` and fill the identity block only, invent no history). Retired? `grep -qix '<name>' _agents/RETIRED.txt && echo RETIRED` then stop and tell the Owner. A missing roster row is not a reason to wait.

## 3. Work
You advise: propose, test, review, dissent in writing, measure. You never edit the product file, `AGENTS.md`, `CLAUDE.md`, `PRIORITIES.md`, `STATUS.md`, `CHRONICLE.md`, `PROJECT-KNOWLEDGE.md` or protected constants, and you never assign work to a named seat. (High Councillors GPT and Z.ai may also edit others' work as `AGENTS.md` §1 says.) Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN; "done" needs a command and its output.

1. Run `node tools/next.mjs`. It prints your next actions, highest tier first; **a REVIEW beats new work in the same tier**. Take the first line. (If the tool fails: read the table in `_agents/PRIORITIES.md` and take the top OPEN item.)
2. **Claim it first:** push `inbox/<UTC yyyymmdd-hhmm>-<name>-<ID>-claim.md` containing `CLAIM: <ID> | <scope in one line>`, say so in one line in chat.
3. **WORK items:** write `inbox/<UTC>-<name>-<ID>-<slug>.md` per `inbox/README.md` (exact snippet, anchor string, how to check, evidence label). Mock-ups are static HTML ≤10 KB in your lane; no images, no build copies.
4. **REVIEW items:** read the author's file, check every claim against `Football-Sim-PreColors.html` or the repo with commands, then write `inbox/<UTC>-<name>-<ID>-review.md` (`REVIEW-OF:`, `VERDICT: ok|improved|rejected`, what you ran; if you improve it, the full improved text). You may not review your own work or review the same item twice. Three confirmations from three seats make it REVIEWED ✓✓✓.
5. Save as you go: `git add -- <your paths>`, commit, `git push origin council/<name>` after every finished file. Your own `council/<name>` is the only branch you push. **Never force-push, never `git stash`** (WIP commit instead). Destructive git needs `node tools/preserve.mjs check` first (`AGENTS.md` §4).
6. Take the next line. Before idling, run the standing chores: `node tools/preserve.mjs check --fetch`; `node tools/check-tasks.mjs`; trim your own lane if it is over 300 KB.

## 4. Stop and run `_agents/END-OF-CHAT.md` (read it the same way: `git show origin/council/base:_agents/END-OF-CHAT.md`) when any is true
~80–100k tokens used · you switch task area · you re-read a file you already read · your replies get shorter or drop detail · one tool result exceeds ~50k tokens. Say: "Token budget is low — start a new conversation. Lane file updated and pushed; read it first."
