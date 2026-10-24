# START OF CHAT — every council seat, every chat

The Owner opened this chat in your worktree `../wt/<name>` (branch `council/<name>`). **You do not create worktrees.** If `pwd` is not `.../wt/<name>`, or the branch is not `council/<name>`, stop and tell the Owner to run `tools/new-seat-worktree.sh <name>`.

## 1. Orient (commands, with output in your first reply)
```
pwd; git branch --show-current; git status --short | head
git fetch -q origin && git merge --no-edit origin/council/base      # bring in new rules/tools; on any conflict STOP and report
```
## 2. Read in this order — do not start work before all five
1. `AGENTS.md`  2. `PROJECT-KNOWLEDGE.md`  3. `COUNCIL-BULLETIN.md` (short: rules + live rulings)  4. `node tools/council-sync.mjs --days 3` (new entries from every seat)  5. your lane file `_agents/<name>/<NAME>.md` (`find _agents -iname '<name>.md'`; if it sits elsewhere, `git mv` it to that canonical path; if none exists, copy `_agents/TEMPLATE-LANE.md`, fill the identity block only, invent no history).

Then `grep -n -i '<name>' _agents/README.md`: your row must say your state. Retired → stop and tell the Owner. No row → say so and take no tasks until the Architect adds one.

## 3. Work
You are an advisory seat: propose, test, dissent in writing, measure. You do not edit the product file, `AGENTS.md`, `CLAUDE.md`, `STATUS.md`, `CHRONICLE.md`, `PROJECT-KNOWLEDGE.md` or protected constants; you do not assign work to named seats. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN; "done" needs a command and its output.

Take the highest-priority unclaimed item (a bulletin request to you, then `tasks/`, then the work order) and say so in one line, or "not taking tasks this round" once. Finish it, take the next; before idling work the queue, then the standing chores.

**Save as you go (this is the rule that was missing):** after every finished task, `git add -- <your paths>`, commit, and `git push origin council/<name>`. Your own `council/<name>` branch is the only branch you push (never `main`, `council/base`, `claude/*`, `architect/*`, or another seat's). **Never `git stash`.** Set work aside with a WIP commit. No build copies or images in your lane.

## 4. Stop and run `_agents/END-OF-CHAT.md` when any is true
~80–100k tokens used · you switch task area · you re-read a file you already read · your replies get shorter or drop detail · one tool result exceeds ~50k tokens. Say: "Token budget is low — start a new conversation. Lane file updated and pushed; read it first."
