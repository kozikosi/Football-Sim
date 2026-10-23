#!/bin/sh
# tools/land-precolors.sh — puts the verified build in place. Run once, from the repo root, on a branch (not main).
# Pre-Colors = sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B).
# It is byte-identical to the file 'NFL Draft Simulator merged.html' on main (reported by two seats; this script re-checks).
set -e
WANT=40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd
SRC="${1:-NFL Draft Simulator merged.html}"
if [ ! -f "$SRC" ]; then echo "source not found: $SRC (pass the path of a copy of the build as the first argument)"; exit 1; fi
GOT=$(shasum -a 256 "$SRC" | cut -d' ' -f1)
if [ "$GOT" != "$WANT" ]; then echo "REFUSED: $SRC has sha256 $GOT, not $WANT. That file is not Pre-Colors."; exit 1; fi
cp "$SRC" Football-Sim-PreColors.html
chmod +x tools/hooks/pre-commit 2>/dev/null || true
git add Football-Sim-PreColors.html
git update-index --chmod=+x tools/hooks/pre-commit 2>/dev/null || true
echo "OK: Football-Sim-PreColors.html is in place and staged (sha256 verified). Commit it with: ARCHITECT_OK=1 git commit -m 'Land Pre-Colors (verified sha256 40233d6b...)'"
echo "Optional: if a root 'Football-Sim-V21.html' exists and its sha256 starts with 044d1759, it is the retired council copy: move it out of the root (git mv Football-Sim-V21.html _archive/builds/retired-044d1759-not-a-build.html)."
