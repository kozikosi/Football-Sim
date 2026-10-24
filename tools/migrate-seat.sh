#!/bin/sh
# tools/migrate-seat.sh <seat> <folder> [<folder> ...]      RUN BY THE OWNER, from the Owner's shared tree (it only READS it).
# One-time, replaces "ask the old chat to migrate itself". The agent does nothing; works for OpenChamber and any seat.
#   <seat>   lowercase seat name (branch council/<seat>)      <folder>  the seat's folder(s) under _agents/ in the shared tree
# For each folder it copies the seat's UNTRACKED files into ../wt/<seat> (same paths), saves edits to already-tracked files as
# a patch, lists every other dirty path in the shared tree (not copied: covered by the preserve/shared-tree-* snapshots),
# skips secrets, files > 20 MB and build copies/images (listed in migrate-skipped.txt), then commits by path and pushes council/<seat>.
# Nothing in the shared tree is changed.
set -eu
[ "$#" -ge 2 ] || { echo "usage: $0 <seat> <folder> [<folder> ...]   (folder = name under _agents/ in the shared tree)"; exit 2; }
seat=$1; shift
common=$(cd "$(git rev-parse --git-common-dir)" && pwd); shared=$(dirname "$common"); wt="$(dirname "$shared")/wt/$seat"
here=$(cd "$(dirname "$0")" && pwd)
[ -d "$wt" ] || sh "$here/new-seat-worktree.sh" "$seat"
[ -d "$wt" ] || exit 1
lane="$wt/_agents/$seat/notes"; mkdir -p "$lane"
list=$(mktemp); skip=$(mktemp); trap 'rm -f "$list" "$skip"' EXIT
for f in "$@"; do
  git -C "$shared" ls-files -o --exclude-standard -- "_agents/$f" "_agents-payload/$f" | while IFS= read -r p; do
    case "$p" in
      *.env|*.env.*|*id_rsa*|*.pem|*.key|*secret*|*token*|*credential*) echo "secret-looking: $p" >> "$skip"; continue;;
      *.png|*.jpg|*.jpeg|*.gif|*.webp|*.zip|*.mp4|*.pdf|*.html) echo "build copy / image (kept out of lanes): $p" >> "$skip"; continue;;
    esac
    [ "$(wc -c < "$shared/$p")" -gt 20971520 ] && { echo "over 20 MB: $p" >> "$skip"; continue; }
    echo "$p" >> "$list"
  done
  git -C "$shared" diff -- "_agents/$f" > "$lane/migrate-delta-$f.patch"
  [ -s "$lane/migrate-delta-$f.patch" ] || rm -f "$lane/migrate-delta-$f.patch"
done
n=$(wc -l < "$list" | tr -d ' ')
[ "$n" -gt 0 ] && tar -cf - -C "$shared" -T "$list" | tar -xf - -C "$wt"
git -C "$shared" status --short | grep -v " _agents/\($(echo "$*" | tr ' ' '|')\)/" > "$lane/.dirty-all" || true
{ echo "shared-tree dirty paths outside your folder(s): $(wc -l < "$lane/.dirty-all" | tr -d ' ') (first 40; the full tree is saved under preserve/shared-tree-*)"; head -40 "$lane/.dirty-all"; } > "$lane/migrate-other-dirty.txt"; rm -f "$lane/.dirty-all"
[ -s "$skip" ] && cp "$skip" "$lane/migrate-skipped.txt"
echo "copied $n untracked file(s); patches: $(ls "$lane"/migrate-delta-*.patch 2>/dev/null | wc -l | tr -d ' '); other dirty paths listed: $(wc -l < "$lane/migrate-other-dirty.txt" | tr -d ' '); skipped: $( [ -s "$skip" ] && wc -l < "$skip" | tr -d ' ' || echo 0)"
cd "$wt"
for f in "$@"; do [ -e "_agents/$f" ] && git add -- "_agents/$f"; [ -e "_agents-payload/$f" ] && git add -f -- "_agents-payload/$f"; done
git add -- "_agents/$seat/notes"
if git diff --cached --quiet; then echo "nothing new to commit"; else git commit -q -m "migrate $seat: untracked lane files from the shared tree (read-only copy)"; fi
git push -q -u origin "council/$seat" && echo "pushed council/$seat @ $(git rev-parse --short HEAD); verify: git ls-remote origin refs/heads/council/$seat"
echo "NEXT: open the seat's NEW chat in $wt and send prompt C. The old chat can be closed."
