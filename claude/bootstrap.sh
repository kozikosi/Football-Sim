#!/bin/sh
# Cheap, safe session start. Clones shallow if no repo, else fetch + pull --ff-only.
# Never uses reset --hard, stash, or force. Prints a short state summary.
REPO_URL="https://github.com/kozikosi/football-sim"
BRANCH="architect/engine-and-seats"
DIR="${FOOTBALL_SIM_DIR:-/home/claude/football-sim}"

if [ ! -d "$DIR/.git" ]; then
  if [ -d "$DIR" ] && [ -n "$(ls -A "$DIR" 2>/dev/null)" ]; then
    echo "STOP: $DIR exists but has no .git and is not empty. Not touching it."; exit 1
  fi
  git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 clone --depth 1 --branch "$BRANCH" --single-branch "$REPO_URL" "$DIR" || { echo "STOP: clone failed (429? wait 5 s, retry once)"; exit 1; }
else
  cd "$DIR" || exit 1
  if [ -n "$(git status --porcelain)" ]; then
    echo "NOTE: uncommitted changes present; skipping pull to protect them."
  else
    git fetch --depth=1 origin "$BRANCH" && git pull --ff-only origin "$BRANCH" || echo "NOTE: ff-only pull failed; resolve by hand, do not reset."
  fi
fi

cd "$DIR" || exit 1
echo "--- STATE ---"
echo "branch: $(git rev-parse --abbrev-ref HEAD)"
echo "head:   $(git log -1 --format='%h %s' | cut -c1-80)"
echo "dirty:  $(git status --porcelain | wc -l | tr -d ' ') file(s)"
echo "--- claude/NOW.md ---"
head -n 10 claude/NOW.md 2>/dev/null || echo "(NOW.md missing)"
