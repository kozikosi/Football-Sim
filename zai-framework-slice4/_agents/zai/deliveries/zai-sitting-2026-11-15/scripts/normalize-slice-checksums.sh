#!/usr/bin/env bash
# §1.3 — normalize CHECKSUMS-slice1.txt / CHECKSUMS-slice2.txt to slice3's format exactly:
# pure "<sha256>  <relative-path>" lines, alphabetically sorted, no prose. Coverage unchanged
# from the original files. slice3's format read first (CHECKSUMS-slice3-slice4.txt): no header,
# no labels, two spaces between hash and path, paths relative to the tree root.
set -euo pipefail
cd /home/z/my-project/sitting/_agents/glyph/deliveries/zai-sitting-2026-11-15/67-cakepanz-s3-s4-rev2

emit() { # $1 = output file, rest = paths
  local out="$1"; shift
  local tmp; tmp=$(mktemp)
  for p in "$@"; do sha256sum "$p"; done | LC_ALL=C sort -k2 > "$tmp"
  mv "$tmp" "$out"
}

# CHECKSUMS-slice1.txt originally covered: package.json, package-lock.json
emit CHECKSUMS-slice1.txt package.json package-lock.json

# CHECKSUMS-slice2.txt originally covered: TeamSelect.svelte, App.svelte, index.html, README.md,
# batteries/slice1.battery.mjs, batteries/slice1-battery.json, package.json, package-lock.json
emit CHECKSUMS-slice2.txt \
  batteries/slice1.battery.mjs \
  batteries/slice1-battery.json \
  index.html \
  package-lock.json \
  package.json \
  README.md \
  src/App.svelte \
  src/lib/screens/TeamSelect.svelte

echo "=== normalized files ==="
cat CHECKSUMS-slice1.txt CHECKSUMS-slice2.txt
echo "=== sha256sum -c verification (must be all OK, exit 0, no format warnings) ==="
sha256sum -c CHECKSUMS-slice1.txt && sha256sum -c CHECKSUMS-slice2.txt && echo "ALL-OK exit 0"
