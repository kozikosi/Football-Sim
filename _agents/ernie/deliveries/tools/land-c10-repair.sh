#!/bin/sh
# land-c10-repair.sh — apply the one-file c10 repair to a c10 package, idempotently.
# ERNIE, 2026-11-20. Proposes to MUSE for tools/; lives in my lane until then.
#
# usage: sh land-c10-repair.sh <c10-package-root> <repair-file>
# exit 0 = the package is 49 OK / 0 missing / 52 files (or was already)
# exit 2 = refused (not a c10 package, or the repair file is not the manifest's bytes)
# exit 3 = the after-state is not 49 OK / 0 missing (prints the counts)
#
# It never writes outside <c10-package-root>. It is safe to run twice.
set -eu

root=${1:?usage: land-c10-repair.sh <c10-package-root> <repair-file>}
repair=${2:?usage: land-c10-repair.sh <c10-package-root> <repair-file>}
root=$(cd "$root" && pwd)

# --- portable md5: 6,418 B / 0a2869538a706e7e6ea864664b7e5c9f
if command -v md5 >/dev/null 2>&1; then md5of() { md5 -q "$1"; }
elif command -v md5sum >/dev/null 2>&1; then md5of() { md5sum "$1" | cut -d' ' -f1; }
else echo "no md5 tool (need md5 or md5sum)" >&2; exit 2; fi

want_md5=0a2869538a706e7e6ea864664b7e5c9f
want_bytes=6418
got_md5=$(md5of "$repair")
got_bytes=$(wc -c < "$repair" | tr -d ' ')
[ "$got_md5" = "$want_md5" ] && [ "$got_bytes" = "$want_bytes" ] || {
  echo "REFUSE: repair file is $got_bytes B / $got_md5, expected $want_bytes B / $want_md5" >&2
  exit 2
}

# --- the manifest must name this path at line 18
[ -f "$root/CHECKSUMS.txt" ] || { echo "REFUSE: no CHECKSUMS.txt in $root (not a c10 package)" >&2; exit 2; }
line18=$(sed -n '18p' "$root/CHECKSUMS.txt")
entry_md5=$(printf '%s\n' "$line18" | awk '{print $1}')
entry_path=$(printf '%s\n' "$line18" | awk '{print $2}')
[ "$entry_md5" = "$want_md5" ] || {
  echo "REFUSE: $root CHECKSUMS.txt line 18 is not the repair entry" >&2
  exit 2
}
case "$entry_path" in
  *cakepanz-4/deliveries/receipts/slice1-battery.json) ;;
  *) echo "REFUSE: line 18 path is $entry_path" >&2; exit 2;;
esac

target="$root/$entry_path"
entries=$(wc -l < "$root/CHECKSUMS.txt" | tr -d ' ')

count_before() { # $1=label
  ok=0; missing=0
  while read -r h p; do
    if [ -f "$root/$p" ]; then
      [ "$(md5of "$root/$p")" = "$h" ] && ok=$((ok + 1))
    else missing=$((missing + 1)); fi
  done < "$root/CHECKSUMS.txt"
  files=$(find "$root" -type f | wc -l | tr -d ' ')
  echo "$1: $ok OK / $missing missing / $files files (entries $entries)"
}

count_before before

if [ -f "$target" ] && [ "$(md5of "$target")" = "$want_md5" ]; then
  count_before after
  echo "already present: no change"
  exit 0
fi

mkdir -p "$(dirname "$target")"
cp "$repair" "$target"
count_before after

ok=$(while read -r h p; do if [ -f "$root/$p" ]; then [ "$(md5of "$root/$p")" = "$h" ] && echo ok; fi; done < "$root/CHECKSUMS.txt" | wc -l | tr -d ' ')
missing=$(while read -r h p; do [ -f "$root/$p" ] || echo missing; done < "$root/CHECKSUMS.txt" | wc -l | tr -d ' ')
files=$(find "$root" -type f | wc -l | tr -d ' ')

[ "$ok" = "$entries" ] && [ "$missing" = "0" ] || {
  echo "FAIL: after the copy $ok OK / $missing missing (entries $entries)" >&2
  exit 3
}
echo "applied: $entry_path"
echo "OK: $ok/$entries, missing 0, files $files"