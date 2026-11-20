#!/bin/bash
# package-delivery.sh — the T6 packaging tool (2026-11-20): three consecutive rounds had a packaging
# defect (a stale file, a wrong count, an unverified hash) — a script makes the CLASS extinct.
#
# The flow the deliveries use: a NEW package = the PREVIOUS package copied to scratch + this sitting's
# delta applied at keyed paths + fresh CHECKSUMS + verified hashes + an EXPLAINED entry-count delta +
# the build tree's own two gates green. The script REFUSES TO EMIT on any mismatch — a partial or
# unverified package is never written to the output path.
#
# Usage:
#   tools/package-delivery.sh PREV_PKG OUT_PKG DELTA_LIST [--strip N] [--tree TREE] [--force]
#     PREV_PKG    the previous package directory (its CHECKSUMS.txt is the count baseline)
#     OUT_PKG     the new package directory (never overwritten without --force)
#     DELTA_LIST  a file: one build-tree-relative source path per line, applied at its keyed path
#                 (the key = the source path with --strip N leading components removed)
#   Exit 0 = emitted and verified; exit 1 = refused (the reason is named, nothing is emitted).
set -e
PREV=""; OUTP=""; DELTA=""; STRIP=0; TREE="$(cd "$(dirname "$0")/.." && pwd)"; FORCE=0
while [ $# -gt 0 ]; do
  case "$1" in
    --strip) STRIP="$2"; shift 2 ;;
    --tree) TREE="$2"; shift 2 ;;
    --force) FORCE=1; shift ;;
    *) if [ -z "$PREV" ]; then PREV="$1"; elif [ -z "$OUTP" ]; then OUTP="$1"; elif [ -z "$DELTA" ]; then DELTA="$1"; else echo "REFUSED: unexpected argument $1"; exit 1; fi; shift ;;
  esac
done
[ -d "$PREV" ] || { echo "REFUSED: the previous package dir does not exist: $PREV"; exit 1; }
[ -f "$DELTA" ] || { echo "REFUSED: the delta list file does not exist: $DELTA"; exit 1; }
[ -f "$PREV/CHECKSUMS.txt" ] || { echo "REFUSED: the previous package has no CHECKSUMS.txt baseline"; exit 1; }
if [ -e "$OUTP" ] && [ "$FORCE" != "1" ]; then echo "REFUSED: the output path already exists (use --force): $OUTP"; exit 1; fi

SCRATCH="$(mktemp -d /tmp/cp-packdel-XXXXXX)"
RECEIPT="$SCRATCH/PACKAGE-DELIVERY-RECEIPT.txt"
say() { echo "== $*" | tee -a "$RECEIPT"; }
run() { echo "\$ $*" | tee -a "$RECEIPT"; "$@" 2>&1 | tail -6 | tee -a "$RECEIPT"; local c=${PIPESTATUS[0]}; echo "EXIT_CODE=$c" | tee -a "$RECEIPT"; [ "$c" -eq 0 ] || { echo "REFUSED: the gate/step failed (exit $c) — nothing emitted"; exit 1; }; }

say "package-delivery $(date -u +%Y-%m-%dT%H:%M:%SZ) — previous: $PREV · delta: $DELTA · strip=$STRIP · tree: $TREE"

# 1. the previous artifact to scratch
say "1. copy the previous artifact to scratch"
cp -R "$PREV/." "$SCRATCH/"
rm -f "$SCRATCH/PACKAGE-DELIVERY-RECEIPT.txt"

# 2. apply the delta — APPLY-ASSERTED: a missing source or a missing target dir refuses BEFORE anything ships
say "2. apply the delta ($(grep -c . "$DELTA") files)"
while IFS= read -r src; do
  [ -n "$src" ] || continue
  if [ ! -f "$TREE/$src" ]; then echo "REFUSED: delta source is missing in the tree: $src"; exit 1; fi
  key="$(echo "$src" | awk -v n="$STRIP" '{ for (i = 0; i < n; i++) if (sub(/^[^\/]+\//, "")) continue } { print }')"
  [ -n "$key" ] || { echo "REFUSED: the key is empty after --strip $STRIP for: $src"; exit 1; }
  mkdir -p "$SCRATCH/$(dirname "$key")"
  cp "$TREE/$src" "$SCRATCH/$key"
  echo "   applied: $src -> $key" | tee -a "$RECEIPT"
done < "$DELTA"

# 3. fresh CHECKSUMS over the scratch (md5 + path, the packages' format). The manifest NEVER lists
# itself (cakepanz-12 T4): a file cannot contain its own digest, and the old empty-string self-line
# (d41d8cd9…) hashed nothing — the verifier now asserts every listed entry, entries = content files.
say "3. regenerate CHECKSUMS.txt (no self-entry — a file cannot contain its own digest)"
( cd "$SCRATCH" && find . -type f ! -name CHECKSUMS.txt ! -name PACKAGE-DELIVERY-RECEIPT.txt -print | sed 's|^\./||' | sort | xargs md5sum > CHECKSUMS.txt )
wc -l < "$SCRATCH/CHECKSUMS.txt" | tee -a "$RECEIPT"

# 4. verify every entry hashes OK — PORTABLE (cakepanz-12 T4): node crypto, not md5sum (absent on a
# stock Mac) and not `md5 -c` (BSD md5 silently exits 0 on md5sum format — the old quick-verify was
# a false green). The explicit failure path names every bad entry and refuses to emit.
say "4. verify the checksums (portable: node crypto)"
run node "$TREE/tools/verify-package.mjs" "$SCRATCH"

# 5. the entry-count delta, EXPLAINED: every removal and addition is named; an unexplained count mismatch refuses
say "5. the entry-count delta"
PREV_N=$(grep -c . "$PREV/CHECKSUMS.txt"); NEW_N=$(grep -c . "$SCRATCH/CHECKSUMS.txt")
awk '{ $1=""; sub(/^  /, ""); print $0 }' "$PREV/CHECKSUMS.txt" | sort > /tmp/pd-prev.keys
awk '{ $1=""; sub(/^  /, ""); print $0 }' "$SCRATCH/CHECKSUMS.txt" | sort > /tmp/pd-new.keys
ADDED=$(comm -13 /tmp/pd-prev.keys /tmp/pd-new.keys); REMOVED=$(comm -23 /tmp/pd-prev.keys /tmp/pd-new.keys)
{
  echo "+ added: ${ADDED:-none}"
  echo "- removed: ${REMOVED:-none}"
} | tee -a "$RECEIPT"
if [ "$PREV_N" != "$NEW_N" ] && [ -z "$(printf '%s' "$ADDED$REMOVED")" ]; then
  echo "REFUSED: the entry count changed $PREV_N -> $NEW_N with NO added/removed keys — the delta was applied to EXISTING entries only; nothing emitted"; exit 1
fi

# 6. the build tree's own two gates (the tree being packaged must be green)
say "6. the tree's two gates (gate-manifest, gate-numerals)"
run node "$TREE/scripts/gate-manifest.mjs"
run node "$TREE/scripts/gate-numerals.mjs"

# 7. emit
say "7. emit"
if [ -e "$OUTP" ]; then rm -rf "$OUTP"; fi
mkdir -p "$(dirname "$OUTP")"
mv "$SCRATCH" "$OUTP"
echo "   emitted: $OUTP ($(find "$OUTP" -type f | wc -l) files, $(grep -c . "$OUTP/CHECKSUMS.txt") checksum entries)" | tee -a "$OUTP/PACKAGE-DELIVERY-RECEIPT.txt"
echo "PACKAGE DELIVERY COMPLETE · $OUTP"
