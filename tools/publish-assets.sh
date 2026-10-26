#!/bin/sh
# tools/publish-assets.sh <branch-name> <path> [<path> ...]      RUN BY THE OWNER from the shared tree (it only READS it).
# Puts files that exist only in the shared tree (logos, a prototype HTML, a CSV) on GitHub as branch assets/<branch-name>,
# so every seat and the Architect can read them. Paths are relative to the shared folder. Nothing in the shared tree changes.
# Limits: a file over 25 MB or a secret-looking name is skipped (listed); at most 150 MB in total.
set -eu
[ "$#" -ge 2 ] || { echo 'usage: publish-assets.sh <branch-name> <path> [<path> ...]   e.g. logos nfl-team-logos all-logos-sdv.csv'; exit 2; }
name=$1; shift
case "$name" in *[!a-z0-9-]*|'') echo "bad branch name (lowercase letters, digits, hyphen)"; exit 2;; esac
common=$(cd "$(git rev-parse --git-common-dir)" && pwd); shared=$(dirname "$common"); wt="$(dirname "$shared")/wt/assets-$name"
git -C "$shared" fetch -q origin '+refs/heads/council/base:refs/remotes/origin/council/base'
if [ ! -d "$wt" ]; then
  if git -C "$shared" rev-parse -q --verify "origin/assets/$name" >/dev/null 2>&1; then git -C "$shared" worktree add -q --track -b "assets/$name" "$wt" "origin/assets/$name"
  else git -C "$shared" worktree add -q -b "assets/$name" "$wt" origin/council/base; fi
fi
list=$(mktemp); skip=$(mktemp); trap 'rm -f "$list" "$skip"' EXIT; total=0
for p in "$@"; do
  [ -e "$shared/$p" ] || { echo "not found in the shared folder: $p"; continue; }
  find "$shared/$p" -type f ! -path '*/.git/*' | while IFS= read -r f; do
    rel=${f#"$shared"/}
    case "$rel" in *.env|*.env.*|*id_rsa*|*.pem|*.key|*secret*|*token*|*credential*) echo "secret-looking: $rel" >> "$skip"; continue;; esac
    [ "$(wc -c < "$f")" -gt 26214400 ] && { echo "over 25 MB: $rel" >> "$skip"; continue; }
    echo "$rel" >> "$list"
  done
done
n=$(wc -l < "$list" | tr -d ' '); [ "$n" -gt 0 ] || { echo "nothing to copy"; exit 1; }
tar -cf - -C "$shared" -T "$list" | tar -xf - -C "$wt"
cd "$wt"; git add -f -- $(for p in "$@"; do [ -e "$p" ] && echo "$p"; done)
if git diff --cached --quiet; then echo "nothing new"; else git commit -q -m "assets/$name: files copied read-only from the shared tree ($n files)"; fi
git push -q -u origin "assets/$name" && echo "pushed assets/$name @ $(git rev-parse --short HEAD) ($n files; skipped: $( [ -s "$skip" ] && wc -l < "$skip" | tr -d ' ' || echo 0))"
[ -s "$skip" ] && cat "$skip"
echo "Tell Claude: branch assets/$name is on GitHub."
