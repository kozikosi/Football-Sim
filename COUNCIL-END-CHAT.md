# COUNCIL END CHAT (final — all critiques incorporated)

**Quick reference (essential commands):**
- Worktree: `git -C "/Users/kosi/Desktop/Football Sim" worktree add ../wt/<seat> -b <seat-branch> <canonical-base-sha>`
- Lane file: `_agents/<name>/<NAME>.md` (locate with `find _agents -iname "<YOUR_SEAT_NAME>.md" | head -1` — path may vary by seat)
- Bulletin: `COUNCIL-BULLETIN.md`
- Commit (worktree): `cd ../wt/<seat> && git add <repo-root-relative-paths> && git commit -m "<NAME> session end: <what>"` (never in the shared tree)
- Commit (shared tree): `cd "/Users/kosi/Desktop/Football Sim" && git add <repo-root-relative-paths> && git commit -m "<NAME> session end: <what>"` (only for lane file, bulletin, CHRONICLE.md, or PROJECT-KNOWLEDGE.md if assigned by Owner per AGENTS.md R4)
- Verify: `git status --short && git log --oneline -3`

## PRE-FLIGHT (READ BEFORE STARTING)

- **Shared tree vs worktree ownership:** Lane files (`_agents/<name>/<NAME>.md`), `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, and `PROJECT-KNOWLEDGE.md` (by explicit Owner assignment per AGENTS.md R4) are edited in the **shared tree** at `/Users/kosi/Desktop/Football Sim` and committed via per-path `git add` from the shared tree. All other work (prototypes, tools, notes, tests, etc.) MUST be done in `../wt/<name>/` and committed from inside that worktree.
- **Path resolution:** When adding files from a different directory, always use repo-root-relative or absolute paths. Do not rely on implicit relative resolution across the shared tree and worktree.
- **Protected rules:** Do not edit `AGENTS.md`, `STATUS.md`, the product file (`NFL Draft Simulator*.html`), or protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`). Follow all rules in `AGENTS.md` (Prohibited Actions and Ownership & Write Protocol).
- **Git hygiene:** Never `checkout`/`switch`/`stash`/`pop`/`apply`/`clean`/`reset`/`restore` in the shared tree at `/Users/kosi/Desktop/Football Sim`. Per-path `git add -- <path>` only, never `git add -A`. Do not push to `main`. Pushing to a new side branch is only allowed if explicitly directed by the Owner or Architect.
- **Chat-only seats:** If you have no file access, output the lane-file text, bulletin entry, your target worktree path, branch name, and canonical base SHA to use. The Owner will run `git worktree add <path> <branch> <base-sha>` and save files there.

## 1. WORKTREE SETUP (BLOCKING — DO FIRST)

Do this before rewriting your lane file.

### 1a. Ask for canonical base (BLOCKING)
Get the canonical base branch and SHA from the Owner or Architect. Do **NOT** guess or proceed without it. Until the PR to main merges, base off of that canonical branch's SHA. Do not default to `gpt/council-reliability-scorecard`. After merge, use `origin/main`. Record this SHA in your final reply. If the Owner or Architect cannot provide a canonical base branch + SHA, do **NOT** mark complete. Report `BLOCKED: missing canonical base branch+SHA` with the exact question to ask.

### 1b. Create or reuse your worktree
One worktree per seat at `../wt/<seat>`, outside of the repo folder and never nested (never inside `Football Sim/Football Sim/`). Reuse an existing worktree if present, do not duplicate. Prefer a stable seat branch (`council/<name>-lane`) if one already exists. Only use a date-stamped branch (`<seat>/lane-$(date +%Y-%m-%d)`) if explicitly approved by the Owner or Architect. Ensure the parent directory exists and create it with an explicit base:

```bash
mkdir -p ../wt
git -C "/Users/kosi/Desktop/Football Sim" worktree add ../wt/<seat> -b <seat-branch> <canonical-base-sha>
```

### 1c. Do not branch off stale task branches
Starting a new chat from `gpt/council-reliability-scorecard` is not allowed by default. If there is an explicit, written justification from the Owner/Architect, you must also prove preservation coverage exists for any uncommitted/unpushed work on it. Otherwise, block and create/move to `../wt/<seat>` off of the canonical base.

### 1d. Verify creation
Run and record receipts for the following:
```bash
pwd
git -C "/Users/kosi/Desktop/Football Sim" worktree list
git -C ../wt/<seat> branch -v
git -C ../wt/<seat> log -1 --oneline
git -C ../wt/<seat> rev-parse HEAD
```

## 2. LANE FILE & BRANCH HYGIENE

### 2a. Rewrite your lane file
In the **shared tree** at `/Users/kosi/Desktop/Football Sim`, rewrite your whole lane file (locate with `find _agents -iname "<YOUR_SEAT_NAME>.md" | head -1`; if none exists, check `_agents/TEMPLATE-LANE.md` and copy if present, otherwise create `_agents/<name>/<NAME>.md` from scratch): identity, current work and state, what the next session needs, open questions, files that are still live. Delete files in your lane you no longer need; no build copies or images (if `RETIREMENT.md` exists, follow §4).

Include the following: 
- Your assigned worktree path (`../wt/<name>`)
- The canonical base branch + SHA it was started from (from 1a)
- Preservation SHAs relied on (generate from your preservation source of truth if applicable, e.g. `git -C ../wt/beam-preserve log --oneline -4` or `N/A`. Verify with `git ls-remote`, do not hardcode — treat as receipts and log deltas if they differ)
- Snapshot path if used (or `N/A`)
- Any preservation blockers (stashes, unpushed commits, worktrees, nested repo)

### 2b. Verify your seat branch
Inside your worktree (`../wt/<name>`), run `git branch --show-current`. It must match your intended seat branch (prefer `council/<name>-lane`). If it does not exist locally or remotely, create it *in your worktree* off of the canonical base SHA from 1a (`git switch -c <your-branch> <canonical-base-sha>`) and push it only if explicitly directed by the Owner or Architect. **Do not** run `git switch -c` in the shared tree.

## 3. DOCUMENT & COMMIT

### 3a. Bulletin entry
Post ONE entry in `COUNCIL-BULLETIN.md` (concise but complete): worked on / found or decided / left for next / blockers. Edit in the **shared tree** via per-path `git add` using repo-root-relative or absolute paths.

### 3b. PROJECT-KNOWLEDGE.md
Any seat assigned by the Owner per AGENTS.md R4 may rewrite the "Current state" block of `PROJECT-KNOWLEDGE.md` in the shared tree. Include preservation state (branches, tags, moved nested repo, blocked items) and current worktree layout. Everyone else: put project-level news in the bulletin, not in that file.

### 3c. Chronicle (if applicable)
Only if you verified a fact that others rely on (a hash, a ruling): append one line to `CHRONICLE.md` in the **shared tree** via per-path `git add`.

### 3d. Commit in the correct location
- **Shared tree edits** (lane file, bulletin, CHRONICLE, PROJECT-KNOWLEDGE if assigned by Owner per R4): commit from `/Users/kosi/Desktop/Football Sim` with repo-root-relative paths.
- **Worktree edits** (everything else): commit from `../wt/<name>` with repo-root-relative paths from the repo root.

No `-A`, no push to `main`. Pre-commit check: run `git status --short` in the directory you are committing from. If committing from the worktree, sync first:
```bash
git -C ../wt/<name> fetch origin
git -C ../wt/<name> merge --ff-only origin/<your-branch> 2>/dev/null || echo "INFERRED: no upstream to fast-forward or branch does not exist on origin yet"
```
Verify with `git status --short` and `git log --oneline -3`. Your `git log --oneline -1` must show your session-end commit.

## 4. FINAL REPLY
Reply exactly: 
`SESSION END COMPLETE — <NAME> | commit <hash> | worktree: ../wt/<name> @ <branch> (<sha from git -C ../wt/<name> rev-parse HEAD>) | next session reads: <3 items> | pending: <list>`

## 5. WORKTREE HYGIENE & PRESERVATION GATE (BLOCKING — COMPLETE BEFORE REPLYING)

### 5a. Record context
Run and record `pwd` (worktree), `git branch --show-current`, `git rev-parse HEAD`, and `git -C "/Users/kosi/Desktop/Football Sim" worktree list`. Record the worktree path and base branch + SHA.

### 5b. Verify canonical base
Confirm the base branch + SHA matches what was given by the Owner/Architect in 1a. If not, do not proceed.

### 5c. Location check
Confirm you are in `../wt/<name>`, outside of the repo folder, never nested inside `Football Sim/Football Sim/`. Reuse existing worktrees, do not duplicate.

### 5d. Inventory stashes
Run `git -C "/Users/kosi/Desktop/Football Sim" stash list`. Inventory *all* stashes (stashes are repo-scoped, not worktree-scoped). For each stash not explicitly accounted for by a preservation branch/tag with concrete proof, save `stash@{n}.patch` and `stash@{n}.meta.txt` (branch, message, author/date, `PROVENANCE: UNKNOWN/REPORTED`) to `_archive/preserved-2026-10-23/stashes/` (read-only, no pop/apply). `_archive/` is gitignored in the shared tree — use `git add -f` if committing to the preservation worktree. Cite branch/tag and commit SHA when skipping a stash.

### 5e. Preserve uncommitted work
If you have uncommitted, untracked, or unpushed work, verify coverage against known preservation branches or saved patches. If not covered, capture it first (copy-only, per-path adds, no destructive git operations in the shared tree).

### 5f. Touching other worktrees
If you touch any worktree, run `git -C <path> status --short` and `git -C <path> log --branches --not --remotes --oneline`. If clean AND all commits pushed: remove only if it meets the explicit criteria. If dirty or has unpushed commits: copy affected files to the appropriate preservation worktree on its preservation branch (copy-only), commit with per-path adds (`git add -f` as needed), push, re-check; if still not clean, leave it and log `kept, reason`. Do not use `checkout`/`switch`/`stash`/`clean`/`reset`/`restore` in the shared tree.

### 5g. Nested repo discipline
If `Football Sim/Football Sim/` is involved, do **NOT** delete it. If it is not clean with unsaved content unpreserved, copy remaining unsaved content to `_archive/preserved-2026-10-23/nested-repo/` or report `NOT moved because <reason>`. Only move if clean by copy-only means, and add the backup folder name to the shared tree's `.git/info/exclude` (never tracked `.gitignore`).

### 5h. Verify creation
After creating `../wt/<seat>`, run `git -C ../wt/<seat> log -1 --oneline` and `git -C ../wt/<seat> branch -v` and record both in your final reply.

### 5i. Blocking on preservation state
If any required preservation artifact is missing and your work depends on it, do **NOT** mark complete. List missing artifacts and the exact verification/copy command to fix them. Require receipts for missing tags/branches. Any seat may verify against its preservation source of truth and record receipts. No seat is blocked solely by another seat's known missing items unless their own work explicitly depends on them.

## APPENDIX

**Quick verification checklist:** worktree outside repo ✓, canonical base SHA confirmed from Owner/Architect ✓, branch correct in worktree ✓, commits in correct location (shared tree vs worktree) ✓, clean status before commit ✓, all stashes inventoried with coverage or patches+metadata ✓, `_archive/` gitignored considerations noted ✓, protected files/constants not edited ✓, receipts in final reply ✓.

**Chat-only seats:** Output lane-file text, bulletin entry, target worktree path, branch, and base SHA. The Owner will run `git worktree add <path> <branch> <base-sha>` and save files there.

**Source of truth:** Use the preservation worktree and its snapshot/addendum for preservation state, record receipts, and move or list remaining items in `pending` with exact `cp` commands.

**Protected:** `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS`, `AGENTS.md`, `STATUS.md`, and the product file (`NFL Draft Simulator*.html`). Per `AGENTS.md` §Prohibited Actions and Ownership & Write Protocol.

If a step fails, say which and why. A seat with no file access (chat-only) outputs the lane-file text and the bulletin entry for the Owner to save, and says so.