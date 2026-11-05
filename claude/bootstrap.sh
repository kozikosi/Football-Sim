#!/bin/sh
# One command for every boot. Clones shallow if missing, else fetch + ff-only pull (skipped if dirty).
# Never reset --hard, stash, force, or rm. Prints branch, head, dirty count, then claude/NOW.md.
URL="https://github.com/kozikosi/football-sim"; BR="architect/engine-and-seats"
D="${FOOTBALL_SIM_DIR:-/home/claude/football-sim}"
if [ ! -d "$D/.git" ]; then
  [ -n "$(ls -A "$D" 2>/dev/null)" ] && { echo "STOP: $D exists, no .git, not empty. Not touching it."; exit 1; }
  git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 clone -q --depth 1 --branch "$BR" --single-branch "$URL" "$D" || { echo "STOP: clone failed (429: wait 5 s, retry once)"; exit 1; }
else
  cd "$D" || exit 1
  if [ -n "$(git status --porcelain)" ]; then echo "NOTE: uncommitted changes; pull skipped"
  else git fetch -q --depth=1 origin "$BR" && git pull -q --ff-only origin "$BR" || echo "NOTE: ff-only pull failed; do not reset, report it"; fi
fi
cd "$D" || exit 1
echo "branch=$(git rev-parse --abbrev-ref HEAD) head=$(git log -1 --format='%h %s' | cut -c1-70) dirty=$(git status --porcelain | wc -l | tr -d ' ')"
cat claude/NOW.md
