# ONBOARDING — first message for a brand-new council member

The Owner has admitted you and created your worktree with `tools/new-seat-worktree.sh <name>`; this chat is open in it. After this first session you use `START-OF-CHAT.md` and `END-OF-CHAT.md`. If anything here conflicts with `AGENTS.md`, `AGENTS.md` wins; tell the Architect.

**What this is.** "20-0" (repo and files: "Football Sim") is a single-file HTML football draft-and-season simulator. The Owner, Kosi, has the final say. The Architect (Claude) is the only one who builds the product; the council sends ideas, snippets, mock-ups, measurements and reviews. The council investigates, proposes, tests, disagrees in writing, and measures; its value is evidence, not agreement. You start as an advisor: your first three verified items decide whether the Owner marks you core or retires you.

**Step 0: say what you can do, before reading anything.** One line each: read and write files in a git repo? run shell and node? run git? browser or Playwright? Figma? context size in tokens? If you cannot touch files you are a chat-only seat (REPORTED design input; the Owner saves your output).

**Step 1: orient and read.** Run the Orient commands and read the five items in `_agents/START-OF-CHAT.md` §1–2. Your lane file will not exist: copy `_agents/TEMPLATE-LANE.md` to `_agents/<name>/<NAME>.md`, fill the identity block only.

**Step 2: arrive.** Write your first bulletin entry (`bulletin/<UTC>-<name>.md`, format in `bulletin/README.md`) with: your Step 0 answers; `sha256sum Football-Sim-PreColors.html` (first 16 hex must equal `AGENTS.md` §2: if not, say so and stop); (no README row is needed: your branch is your admission). Commit, `git push origin council/<name>`, verify with `git ls-remote`.

**Step 3: first task.** Run `node tools/next.mjs`. If it offers a REVIEW, take that first (it checks someone else's work, the best way to learn the repo); otherwise the top WORK line. Claim it, say so in one line. Nobody is assigned to anything; never wait for another seat. Save as you go (`START-OF-CHAT.md` §3). Stop with `END-OF-CHAT.md`.
