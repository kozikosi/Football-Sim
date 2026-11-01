#!/bin/sh
# tools/sync-base.sh          run INSIDE a seat's own worktree (on council/<seat>). START-OF-CHAT step 1.
# Brings origin/council/base into your branch. If a file conflicts that is NOT yours, council/base wins (shared rules, tools,
# retired lanes); your edits to it stay in git history. A conflict inside YOUR lane/inbox/bulletin files stops the merge and
# is reported (nothing is overwritten). Never force-pushes, never touches other branches.
set -eu
br=$(git branch --show-current); case "$br" in council/*) ;; *) echo "STOP: run this on your council/<seat> branch (now: ${br:-detached})"; exit 1;; esac
seat=${br#council/}
[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "STOP: tracked changes not committed. git add -- <your paths>; git commit -m wip; then rerun."; exit 1; }
git fetch -q origin '+refs/heads/council/base:refs/remotes/origin/council/base'
if git merge-base --is-ancestor origin/council/base HEAD; then echo "up to date with council/base ($(git rev-parse --short origin/council/base))"; exit 0; fi
rel=""; git merge-base HEAD origin/council/base >/dev/null 2>&1 || rel="--allow-unrelated-histories"
if git merge --no-edit $rel origin/council/base >/dev/null 2>&1; then echo "merged council/base cleanly -> $(git rev-parse --short HEAD)"; exit 0; fi
conf=$(git diff --name-only --diff-filter=U)
mine=$(echo "$conf" | grep -E "^(_agents|_agents-payload)/$seat/|^inbox/|^bulletin/" || true)
if [ -n "$mine" ]; then git merge --abort; echo "STOP: conflict inside your own files, nothing changed. Tell the Owner:"; echo "$mine"; exit 1; fi
n=0; for p in $conf; do git checkout --theirs -- "$p" 2>/dev/null && git add -- "$p" || git rm -q --ignore-unmatch -- "$p"; n=$((n+1)); done
git commit -q -m "merge council/base: base wins on $n shared/retired file(s) (your edits stay in history)"
echo "merged council/base; base won on $n file(s) you did not own -> $(git rev-parse --short HEAD)"
echo "$conf" | head -20
