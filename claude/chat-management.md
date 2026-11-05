# chat-management.md — what the Owner pastes into chats, and the terminal steps (process v8, 2 Nov 2026; prompt A rewritten 5 Nov 2026)
(Renamed from `new-chat-prompts.md`. Moved from the Project into the repo on 5 Nov so it stops loading into every Claude chat.)

**THE RULE: NOBODY IS ASSIGNED TO ANYTHING, AND THERE ARE NO CLAIMS.** There are no per-agent prompts. Every council chat gets the same prompt; the agent runs the council tool, does the top item it can (or leaves it), and later agents review it (two reviews). Seats also keep the queue clean themselves: they can retire dead items with proof, add ideas, keep or revive items. If an agent is unavailable, nothing waits. Do not tell any agent "you do X". Protocol, one page: `_agents/COUNCIL.md`.

**Where the current rules live (v8):** on the Architect's branch `origin/architect/engine-and-seats` (the prompts below read the protocol and the tool from there, so no merge into `council/base` is needed for a change to reach every seat). `origin/council/base` still serves the older helper scripts (`sync-base.sh`, `admit-seat.sh`, `ONBOARDING.md`). SHARED = `/Users/kosi/Desktop/Football Sim` (read-only for everyone; never run `git pull`, `rebase` or `merge` there; `git fetch origin` only). Each agent works in `/Users/kosi/Desktop/wt/<name>`.

**Terminal basics.** Open the Terminal app (Cmd+Space, type Terminal, Enter). Every command below starts with `cd`, so it does not matter which folder Terminal opens in. Paste one block, press Enter, wait until the prompt `%` returns. If a block prints an error, go to step 3 of that task.

## PART 1 — Prompts for chats (only <NAME> changes, and the Idle Prompt has no name at all)
**C. Start of chat (every agent, every chat, Z.ai and GPT included; chat open in `/Users/kosi/Desktop/wt/<name>`):**
```
You are <NAME>. This chat is open in your worktree. Run: git fetch origin && git show origin/architect/engine-and-seats:_agents/START-OF-CHAT.md   and follow it exactly. Do nothing else first.
```
**I. IDLE PROMPT — send to ANY agent that is idle, stalled, finished, or asking "what next?" (no name, no task, same text for everyone):**
```
You are idle, so find work through the proper channels; do not wait for me. 1) In your worktree run: git fetch origin && git show origin/architect/engine-and-seats:_agents/START-OF-CHAT.md   and follow it. 2) Run: git show origin/architect/engine-and-seats:tools/council.mjs > /tmp/council.mjs && node /tmp/council.mjs next   (whole list: node /tmp/council.mjs board). 3) Answer any ASK first, then do any REVIEW (try to break it; write a verdict file), then the top WORK item. There are no claims: do it and push it, or leave it. 4) Keep the queue clean: retire any item you can prove is built or superseded (node /tmp/council.mjs retire <ID> --why BUILT --evidence "<proof>"), add missing ideas, keep ideas you still want. 5) Nothing is assigned to you or anyone; do not ask me what to do, do not edit the shared folder, do not edit Claude's files, and put all output in top-level inbox/ on your own branch, then run: git add inbox && git commit -m "inbox" && git push origin HEAD
```
**D. End of chat:**
```
SESSION END — <NAME>. Run: git fetch origin && git show origin/architect/engine-and-seats:_agents/END-OF-CHAT.md   and follow it exactly, finishing with its final reply line.
```
**F. Brand-new agent (after Task 2 prints it; only the name changes; no model or "how reached" to fill in):**
```
You are <NAME>, a new council member. This chat is open in your worktree. Run: git fetch origin && git show origin/council/base:_agents/ONBOARDING.md   and follow it exactly. Do nothing else first.
```
**A. Claude (Architect), a new chat in this Project (rewritten 5 Nov 2026). The Project's `claude/00-READ-FIRST.md` already holds the boot steps and boots Claude even if your first message is only "Continue", so the prompt can be one line. The council digest is no longer automatic: Claude runs it only when the work touches the queue; say "check the council" if you want it:**
```
Continue.
New from me this chat (delete if none): <rulings, decisions, files I attached>
```
Anything the Owner decides in that message (an approval, a ruling) is written into the repo and pushed in the same turn by Claude; the Owner does not need to repeat it in the next chat.
**Agents with no file access (chat-only, no git):** paste them `AGENTS.md` §1 and §5, `_agents/COUNCIL.md` and the output of `node tools/council.mjs board`, then prompt C with "You cannot run git: pick the top OPEN item from the pasted board." At the end they print one block; see Task 6.

## PART 2 — Terminal tasks (do only the ones you need)

### Task 1 — Send the rules to every agent (no terminal)
1. For each agent open its chat in `/Users/kosi/Desktop/wt/<name>` (Kilo: Glyph, FK, Beam, VL, UK, OR. OpenChamber: Pickle, BOC, DS, VLOC, Super, Ultra, Flint, MiMo, GLM. Independent: GPT, Z.ai).
2. Paste prompt C (same text for everyone; change only the name).
3. If an OpenChamber agent cannot run git or see the folder, do Task 3 first and tell Claude which one failed.

### Task 2 — Add a new agent (no Claude needed)
1. Copy and paste into Terminal, replacing `<name>` (lowercase, e.g. `zai`), the model text and the role text (keep the quotation marks):
```
cd "/Users/kosi/Desktop/Football Sim" && git fetch origin && git show origin/council/base:tools/admit-seat.sh | sh -s -- <name> "<model and how it is reached>" "<what it is good at>"
```
2. To check it worked, copy and paste (replace `<name>`):
```
cd "/Users/kosi/Desktop/wt/<name>" && git status -sb && ls _agents/<name>
```
You should see `## council/<name>...` and a file `<NAME>.md`. The first command also printed prompt F.
3. If it did not work: paste everything Terminal printed to Claude. `dubious ownership` → paste the `git config --global --add safe.directory "<path it names>"` line it prints (one folder, never `'*'`); `exists, skipped` → the folder is already there, go to step 2.

### Task 3 — Move an OpenChamber agent's unsaved files from SHARED to its own branch
Safety: SHARED is already snapshotted on GitHub (`preserve/shared-tree-*`); the command only reads SHARED.
1. Copy and paste this one block (all nine agents; the second word of each pair is the agent's folder under `_agents/`):
```
cd "/Users/kosi/Desktop/Football Sim" && git fetch origin && git show origin/council/base:tools/migrate-seat.sh > /tmp/migrate-seat.sh && for p in "pickle pickle" "boc boc" "ds ds" "vloc vloc" "super nemo-super" "ultra nemotron-3-ultra-free" "flint flint" "mimo mimo" "glm glm"; do echo "=== $p"; sh /tmp/migrate-seat.sh $p; done
```
2. To check it worked, copy and paste:
```
cd "/Users/kosi/Desktop/Football Sim" && git fetch origin && git show origin/council/base:tools/roster.mjs > /tmp/roster.mjs && cd /Users/kosi/Desktop/wt/pickle && node /tmp/roster.mjs
```
Every agent should show a recent LAST PUSH.
3. If a name failed: paste its `=== ...` section to Claude. `copied 0` is fine (nothing in SHARED).

### Task 4 — Not needed now (Z.ai's and GPT's files are on GitHub)
Z.ai's whole package is on `main` under `z-core/` (you pushed it 25 Oct), GPT's four documents are on branch `gpt-review-documents`, and Claude has read both. Nothing to do unless a NEW file exists only on your computer; then use Task 7.

### Task 5 — Check nothing is unsaved (monthly, or before deleting any folder)
1. Copy and paste:
```
cd /Users/kosi/Desktop/wt/beam && git fetch origin && node tools/preserve.mjs check --fetch
```
2. The last line should start with `OK:`. 3. If it says `UNSAVED WORK FOUND`, paste the table to Claude; delete nothing.

### Task 6 — Save the end-of-chat block from an agent with no git
1. Copy the agent's whole block (`=== FILE:` to `=== END ===`) into a text file, e.g. `/Users/kosi/Desktop/block.txt`.
2. Copy and paste (replace `<name>`):
```
cd /Users/kosi/Desktop/wt/<name> && node tools/seat-save.mjs <name> /Users/kosi/Desktop/block.txt
```
3. If it prints `refused path`, the block wrote outside `_agents/`, `bulletin/`, `inbox/`, `tasks/`; ask the agent to redo it.

### Task 7 — Put a file that exists only on your computer onto GitHub (logos and Z.ai's package already are)
The logos (`nfl-team-logos`, `mlb-`, `nba-`, `soccer-`, `all-logos-sdv.csv`) and Z.ai's package are on `main`; Claude reads them with `git show origin/main:<path>`. For any later file:
1. Copy and paste (replace `<branch-name>` with one lowercase word and `<path>` with the file or folder name inside the Football Sim folder; it only reads that folder):
```
cd "/Users/kosi/Desktop/Football Sim" && git fetch origin && git show origin/council/base:tools/publish-assets.sh | sh -s -- <branch-name> <path>
```
2. To check it worked, copy and paste (same `<branch-name>`):
```
cd "/Users/kosi/Desktop/Football Sim" && git ls-remote origin refs/heads/assets/<branch-name>
```
One line with a long hash means it is on GitHub.
3. If it did not work: paste everything Terminal printed to Claude.

## PART 3 — Things not to do
Never run `git pull`, `rebase`, `merge`, `checkout`, `stash` or `reset` in SHARED. To check SHARED is clean, copy and paste: `git -C "/Users/kosi/Desktop/Football Sim" status | head -5` (it must not say "rebase in progress"). Never `git config --global safe.directory '*'`. Never tell an agent what its personal task is.
