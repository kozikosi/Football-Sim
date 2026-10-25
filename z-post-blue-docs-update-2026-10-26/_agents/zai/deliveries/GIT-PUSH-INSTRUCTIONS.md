# GIT PUSH INSTRUCTIONS — push the Z-post-blue work to GitHub from YOUR machine

**From:** Z.ai · 2026-10-25
**Why this file exists:** pushing from my sandbox hung for ~20 minutes — `git push` waited forever on a username/password prompt that a non-interactive shell can never answer. So: **everything is committed locally and zipped**, and the actual network push takes one minute on **your** machine, where GitHub already knows you.

## Current git state (measured 25 Oct, before the packaging commit)

- Repo: `https://github.com/kozikosi/Football-Sim.git` (branch `main`)
- Local `main`: **ahead 5, behind 7** of `origin/main` — my 11 waves of commits are local-only; the remote moved on without them.
- Branch `zai/lane`: my working lane, fully committed (now includes the packaging wave + REV 13 handoff + the new guides).
- Working tree: clean (nothing uncommitted — nothing can be lost).

## Step-by-step (copy-paste, one block at a time)

### 0. One-time: make sure git won't ask for a password it can't get
Easiest (if you have the GitHub CLI):
```bash
gh auth login
```
Or use a Personal Access Token (GitHub → Settings → Developer settings → Tokens): when git prompts, paste the token as the password. To cache it:
```bash
git config --global credential.helper osxkeychain   # macOS
git config --global credential.helper manager       # Windows
git config --global credential.helper store         # Linux (stores plaintext — fine for a private box)
```

### 1. Get the repo on your machine (skip if you already have a clone)
```bash
cd ~/Desktop
git clone https://github.com/kozikosi/Football-Sim.git
cd Football-Sim
```

### 2. Bring in my 5 local commits from the zip (only if NOT already inside the zip's git bundle flow)
In the zip you'll find `git-bundle/Football-Sim-zai-local.bundle` — a portable git object pack. Add it as a "remote" and pull my commits:
```bash
# path to wherever you unzipped the handoff package:
UNZIP=/path/to/z-post-blue-full-handoff-2026-10-25
git fetch --all-tags 2>/dev/null; true
git remote add zai-bundle "$UNZIP/git-bundle/Football-Sim-zai-local.bundle"
git fetch zai-bundle main zai/lane
```

### 3. Reconcile with the 7 remote commits, then push
```bash
git checkout main
git pull --no-rebase origin main          # merge remote's 7 commits
git merge zai-bundle/main --no-edit       # merge my 5 (+packaging) commits
git push origin main
```
- If the pull/merge reports conflicts (most likely only if remote touched `_agents/zai/`), take BOTH where asked: the remote's newer council files, and mine under `_agents/zai/`:
  ```bash
  git checkout --theirs _agents/zai 2>/dev/null; git add -A
  git commit --no-edit
  ```
- Verify you're up to date:
  ```bash
  git status -sb        # should say: ## main...origin/main  (no ahead/behind)
  git log --oneline -8
  ```

### 4. Push my lane branch too (optional but recommended — it's my verifiable working history)
```bash
git push origin zai/lane zai-bundle/zai/lane:refs/heads/zai/lane 2>/dev/null || git push origin zai/lane
```

### 5. Publish the site itself (30 seconds, no git)
1. Go to https://app.netlify.com/drop
2. Drag in `01-html/z-post-blue-netlify/` (the folder whose `index.html` is the latest build, md5 `49ea6f05…`)
3. Done — that's the whole pipeline I was attempting.

## Troubleshooting

- **`! [rejected] ... fetch first`** → you skipped step 3's `git pull --no-rebase origin main`. Do that, then push again.
- **Prompt hangs asking for Username/Password** → that's the same thing that hung my sandbox. Press Ctrl+C, run `gh auth login` (or set the credential helper in step 0), retry.
- **"gh: command not found"** → install it (`brew install gh` / `winget install GitHub.cli`) or just use the PAT route from step 0.
- **Zero network?** The zip alone is a complete loss-proof copy: HTML, all documents, all tools, all git objects (the bundle). Nothing in this project depends on the push succeeding for its safety.

— Z.ai · `_agents/zai/deliveries/GIT-PUSH-INSTRUCTIONS.md`
