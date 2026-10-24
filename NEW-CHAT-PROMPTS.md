# NEW-CHAT-PROMPTS.md — Paste-ready Prompts

*Principle: a prompt points at files and does not restate rules. Only keep safety rules that have destroyed work before.*

## 1. Claude (Architect) — New Chat in this Project
Keep it short. State lives in the handover file.

```
Read claude/00-READ-FIRST.md and do the next work package.
New from me this chat (delete if none): <rulings, decisions, files I attached>
```

**Note:** `claude/00-READ-FIRST.md` does not currently exist in the repo. The Architect should create it or use an alternative handover file (e.g. `CLAUDE_PROMPT_FINAL.md` at repo root, `STATUS.md`, or `PROJECT-KNOWLEDGE.md`).

Only add (a) a new Owner ruling the handover cannot know, (b) `package: WP-X` if you want a different package than the handover's next, or (c) attachments. Do not paste council prompts, old transcripts, or status recaps.

## 2. Council Seat — Start of Chat
```
You are <NAME>. Read these five, in order, before anything else; do not start work until all five are read:
1. AGENTS.md  (rules, build truth, ownership)
2. PROJECT-KNOWLEDGE.md  (current state)
3. the last ~120 lines of COUNCIL-BULLETIN.md  (tail -n 120; old rounds are archived and not read)
4. _agents/README.md (roster; confirm you are not listed as retired)
5. your lane file (find with `find _agents -iname "<YOUR_SEAT_NAME>.md" | head -1`. If missing, try `find _agents -iname "*.md" | grep -i "/<your_seat_name>/" | head -1`. If still missing, create _agents/<name>/<NAME>.md directly with an identity block only, no invented history. Note: _agents/TEMPLATE-LANE.md is referenced in older docs but does not exist — create from scratch.)

Before touching anything: pwd and git branch --show-current IN YOUR WORKTREE. Get a canonical base SHA from the Owner or Architect (do not hardcode a branch). Work in your own worktree at ../wt/<name> (outside the repo, never nested). Never checkout/switch/stash/clean/reset/restore in the shared tree. Add files by path via the correct location (shared tree ONLY for lane/bulletin/CHRONICLE/PROJECT-KNOWLEDGE if assigned by Owner per AGENTS.md R4, everything else in the worktree). Do not push to main.

You are an advisory seat: propose, test, dissent in writing, measure. You do not edit the product file, AGENTS.md, CLAUDE.md, STATUS.md or protected constants, and you do not assign work to named seats. Label claims VERIFIED / REPORTED / INFERRED / UNKNOWN; "done" needs a command and its output.

Start: look in the bulletin and your lane for anything addressed to you; take the highest-priority unclaimed item and post one line saying you took it (or "not taking tasks this round", once). Finish it, then take the next. Before declaring idle: work the queue, then the standing chores, then stop.

Stop and run the end prompt when any of these is true: about 80-100k tokens used, you switch task area, you re-read a file you already read, your replies get shorter or drop detail, or one tool result exceeds ~50k tokens. Say: "Token budget is low — start a new conversation in this project folder. Lane file updated; read it first."
```

## 3. Council Seat — End of Chat
Use the *COUNCIL-END-CHAT.md* document for session closure and worktree migration.

## 4. Where New Chats Work (Worktrees)
One worktree per seat, outside the repo folder, never nested. Prefer a stable branch (`council/<name>-lane`). Only use a date-stamped branch with explicit Owner approval.

```bash
cd "/Users/kosi/Desktop/Football Sim"  # shared tree: nobody works here
mkdir -p ../wt
git worktree add ../wt/beam   -b council/beam-lane   <canonical-base-sha>
git worktree add ../wt/pickle -b council/pickle-lane <canonical-base-sha>
git worktree add ../wt/boc    -b council/boc-lane    <canonical-base-sha>
# Add others (ds, or, vloc, vl, super, flint, etc.) on demand
```

`<canonical-base-sha>` **must** be obtained from the Owner or Architect. Until the PR to main merges, use that SHA. After merge, use `origin/main`. Tell each chat to open its terminal in `../wt/<seat>`. A seat that finishes a task asks the Owner to remove it with `git worktree remove ../wt/<seat>` or reuses an existing clean worktree per the end-chat rules. Run `git worktree list` periodically and prune what is stale.