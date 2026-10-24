#!/bin/sh
# tools/new-seat-worktree.sh <seat> [<seat> ...]
# Run by the OWNER (or the Architect), once per seat, BEFORE opening that seat's chat. Run from any worktree of the repo.
# Creates ../wt/<seat> (a sibling of the shared tree, never nested) on branch council/<seat>, started from origin/council/base
# (or from origin/council/<seat> if that branch already exists, so a returning seat continues where it pushed).
# Reads/writes nothing in the shared tree's files; uses `git worktree add` only.
set -eu
[ "$#" -ge 1 ] || { echo "usage: $0 <seat> [<seat> ...]   (lowercase, e.g. beam pickle boc ds)"; exit 2; }
common=$(cd "$(git rev-parse --git-common-dir)" && pwd)
shared=$(dirname "$common")
parent=$(dirname "$shared")
git -C "$shared" fetch -q origin '+refs/heads/council/*:refs/remotes/origin/council/*'
git -C "$shared" rev-parse -q --verify origin/council/base >/dev/null || { echo "origin/council/base does not exist; ask the Architect"; exit 1; }
mkdir -p "$parent/wt"
for seat in "$@"; do
  case "$seat" in *[!a-z0-9-]*|'') echo "bad seat name '$seat' (lowercase letters, digits, hyphen)"; exit 2;; esac
  dir="$parent/wt/$seat"
  if [ -e "$dir" ]; then echo "exists, skipped: $dir"; continue; fi
  if git -C "$shared" rev-parse -q --verify "origin/council/$seat" >/dev/null; then
    git -C "$shared" worktree add --track -b "council/$seat" "$dir" "origin/council/$seat"
  else
    git -C "$shared" worktree add -b "council/$seat" "$dir" origin/council/base
  fi
  echo "READY: $dir  (branch council/$seat @ $(git -C "$dir" rev-parse --short HEAD)). Open the chat in this folder."
done
