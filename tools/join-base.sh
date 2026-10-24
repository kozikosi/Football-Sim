#!/bin/sh
# tools/join-base.sh <keep-path> [<keep-path> ...]       run INSIDE a seat's own worktree (Owner or seat).
# For a seat branch whose history is UNRELATED to origin/council/base (e.g. council/uk): makes ONE merge commit with
# parents [your tip, origin/council/base] whose tree = council/base + the paths you name from your own tip.
# No force-push needed (it is a fast-forward of your branch); old history stays reachable; stale protected files vanish from the tree.
set -eu
[ "$#" -ge 1 ] || { echo "usage: $0 <path-to-keep> ...   e.g. $0 _agents/uk"; exit 2; }
br=$(git branch --show-current); case "$br" in council/*) ;; *) echo "run on your council/<seat> branch (now: $br)"; exit 1;; esac
[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "tracked changes present: commit them first (git add <paths>; git commit)"; exit 1; }
git fetch -q origin '+refs/heads/council/base:refs/remotes/origin/council/base'
if git merge-base HEAD origin/council/base >/dev/null 2>&1; then echo "already related to council/base: just run  git merge --no-edit origin/council/base"; exit 0; fi
tip=$(git rev-parse HEAD)
git merge -s ours --allow-unrelated-histories --no-commit origin/council/base >/dev/null
git read-tree -u --reset origin/council/base
for p in "$@"; do git cat-file -e "$tip:$p" 2>/dev/null && git checkout "$tip" -- "$p" || echo "not on your tip, skipped: $p"; done
git commit -q -m "join council/base: tree = base + $* from $(git rev-parse --short "$tip") (history preserved, no force-push)"
echo "joined. HEAD $(git rev-parse --short HEAD); parents: $(git log -1 --format=%p | cut -c1-30). Now: git push origin council/$(echo "$br" | cut -d/ -f2)"
