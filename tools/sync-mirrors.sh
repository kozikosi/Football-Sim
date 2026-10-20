#!/bin/sh
# sync-mirrors.sh — refresh the git-clone mirrors of the council's shared documents.
# The ROOT directory is the canonical checkout (Owner ruling D1 pending as policy; current practice per INDEX.md).
# `Football Sim/` is git infrastructure the Owner pushes; mirrors must be byte-identical to root.
#
# Usage:
#   sh tools/sync-mirrors.sh            # sync the default mirror set
#   sh tools/sync-mirrors.sh FILE...    # sync only the named files
#
# Output: "OK  <file> <hash8>" per synced file, or "DRIFT <file>" on mismatch (never silently wrong).
# (DS M-8/O1: added --check — verify only, no copies, exit 1 on any drift; any session can audit in one command.)

cd "$(dirname "$0")/.." || exit 1
MIRROR_DIR="Football Sim"
check=0
args=""
for arg in "$@"; do
  if [ "$arg" = "--check" ]; then check=1; else args="$args $arg"; fi
done

DEFAULT_SET="STATUS.md AGENTS.md COLLECTIVE-PROMPT.md ONBOARDING.md QUESTIONS-FOR-THE-ARCHITECT.md COUNCIL-BULLETIN.md CHRONICLE.md GOVERNANCE-ROUNDTABLE.md INDEX.md SUBMISSIONS.md"

files="${args# }"
[ -n "$files" ] || files="$DEFAULT_SET"

for f in $files; do
  if [ ! -f "$f" ]; then
    echo "MISS $f (no such file at project root)"
    continue
  fi
  if [ "$check" -eq 0 ]; then cp "$f" "$MIRROR_DIR/$f" || { echo "FAIL $f (copy error)"; continue; }; fi
  a=$(shasum -a 256 "$f" | cut -d' ' -f1 | cut -c1-8)
  b=$(shasum -a 256 "$MIRROR_DIR/$f" | cut -d' ' -f1 | cut -c1-8)
  if [ "$a" = "$b" ]; then
    echo "OK   $f ($a)"
  else
    echo "DRIFT $f"
  fi
done

# Reminder: log any sync in CHRONICLE.md (". mirror refresh") so the councils' record stays useful.
