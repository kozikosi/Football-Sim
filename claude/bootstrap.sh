#!/bin/sh
# boot-v3. Clone if missing, else fetch + ff-only (skipped if dirty). Never reset --hard, stash, force, or rm.
# Stdout: branch/head/dirty, NOW-CHECK verdict, key NOW.md lines (NOW_FULL=1: all of it), then the rules.
URL="https://github.com/kozikosi/Football-Sim"; BR="architect/engine-and-seats"; DEPTH=50
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
# Single-branch clone: widen the refspec so `git fetch -q --depth=1 origin council/<seat>` and gh-pages work.
for r in 'council/*' 'gh-pages'; do
  git config --get-all remote.origin.fetch | grep -qF "refs/heads/$r:" || git remote set-branches --add origin "$r"
done
echo "branch=$(git rev-parse --abbrev-ref HEAD) head=$(git log -1 --format='%h %s' | cut -c1-70) dirty=$(git status --porcelain | wc -l | tr -d ' ')"
# NOW.md freshness: commits after the last one that touched NOW.md landed without updating it.
NC=$(git log -1 --format=%H -- claude/NOW.md)
if [ -z "$NC" ]; then echo "NOW-CHECK: STALE? NOW.md has no history"
elif grep -q "^$NC" "$(git rev-parse --git-dir)/shallow" 2>/dev/null; then
  echo "NOW-CHECK: STALE? NOW.md older than $DEPTH commits; verify NEXT with git log"
else
  N=$(git rev-list --count "$NC..HEAD")
  if [ "$N" = 0 ]; then echo "NOW-CHECK: fresh"
  else echo "NOW-CHECK: STALE? $N commit(s) after NOW.md:"; git log --format='  %h %s' "$NC..HEAD" | cut -c1-110 | head -12; fi
fi
[ "$(wc -l < claude/NOW.md | tr -d ' ')" -gt 15 ] && echo "NOW-CHECK: NOW.md >15 lines; condense at end of chat"
echo "-- NOW (key lines; all: NOW_FULL=1 or claude/NOW.md) --"
if [ -n "${NOW_FULL:-}" ] || ! grep -q '^- NEXT' claude/NOW.md; then cat claude/NOW.md
else grep -E '^(Updated:|- (NEXT|Then|Blockers|Do NOT))' claude/NOW.md; fi
echo "-- RULES --"; cat claude/00-READ-FIRST.md
