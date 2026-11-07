#!/bin/sh
# boot-v3. One command for every boot (the Project boot stub calls it; the stub says "boot-v3").
# Clones if missing, else fetch + ff-only merge (skipped if dirty). Never reset --hard, stash, force, or rm.
# Prints: branch/head/dirty, a NOW.md freshness verdict, claude/NOW.md, then claude/00-READ-FIRST.md (the rules).
URL="https://github.com/kozikosi/football-sim"; BR="architect/engine-and-seats"; DEPTH=50
D="${FOOTBALL_SIM_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
net() { git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 "$@"; }
if [ ! -d "$D/.git" ]; then
  [ -n "$(ls -A "$D" 2>/dev/null)" ] && { echo "STOP: $D exists, no .git, not empty. Not touching it."; exit 1; }
  net clone -q --depth "$DEPTH" --branch "$BR" --single-branch "$URL" "$D" || { echo "STOP: clone failed (429: wait 5 s, retry once)"; exit 1; }
  cd "$D" || exit 1
else
  cd "$D" || exit 1
  net fetch -q --depth="$DEPTH" origin "$BR" || echo "NOTE: fetch failed (429: wait 5 s, retry once)"
  if [ -n "$(git status --porcelain)" ]; then echo "NOTE: uncommitted changes; merge skipped"
  else git merge -q --ff-only "origin/$BR" || echo "NOTE: ff-only merge failed; do not reset, report it"; fi
fi
# A single-branch clone cannot fetch other branches by name. Widen the refspec once so
# `git fetch -q --depth=1 origin council/muse` (or gh-pages) works with no manual fix.
for r in 'council/*' 'gh-pages'; do
  git config --get-all remote.origin.fetch | grep -qF "refs/heads/$r:" || git remote set-branches --add origin "$r"
done
echo "branch=$(git rev-parse --abbrev-ref HEAD) head=$(git log -1 --format='%h %s' | cut -c1-70) dirty=$(git status --porcelain | wc -l | tr -d ' ')"
# NOW.md freshness: every commit after the last one that touched NOW.md landed without updating it.
NC=$(git log -1 --format=%H -- claude/NOW.md)
if [ -z "$NC" ]; then echo "NOW-CHECK: STALE? claude/NOW.md has no history here"
elif grep -q "^$NC" "$(git rev-parse --git-dir)/shallow" 2>/dev/null; then
  echo "NOW-CHECK: STALE? NOW.md was not changed in the last $DEPTH commits; verify NEXT with git log before acting"
else
  N=$(git rev-list --count "$NC..HEAD")
  if [ "$N" = 0 ]; then echo "NOW-CHECK: fresh (HEAD is the commit that last wrote NOW.md)"
  else echo "NOW-CHECK: STALE? $N commit(s) landed after NOW.md was last written; check NEXT against them before acting:"
       git log --format='  %h %s' "$NC..HEAD" | cut -c1-110 | head -12; fi
fi
[ "$(wc -l < claude/NOW.md)" -gt 15 ] && echo "NOW-CHECK: NOW.md is over 15 lines; condense it at end of chat"
echo "---- claude/NOW.md"; cat claude/NOW.md
echo "---- claude/00-READ-FIRST.md (rules)"; cat claude/00-READ-FIRST.md
