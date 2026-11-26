#!/bin/bash
# materialise-w89-fixture.sh — the A6 reproducibility step for the side-by-side capture (porca C5).
# The LEFT reference of scripts/side-by-side-s15.mjs is the LIVE w89 page
# (https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w89.html); when the network is
# unreachable the script falls back to file:///tmp/w89ref/w89.html — a fresh-clone Verifier must be
# able to build that byte-copy from the repo itself, hash-pinned, or the 41-capture receipt could
# never be reproduced offline. This script does exactly that, and FAILS LOUD if the bytes are not
# the receipted w89 (sha256 dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c,
# receipted at deliveries/receipts/partH-s15/w89-ref-bytes-2026-11-24.log and re-verified against
# origin/gh-pages on 2026-11-25). Usage: bash scripts/materialise-w89-fixture.sh [REPO_DIR]
# (REPO_DIR defaults to the current directory — run it INSIDE a clone of kozikosi/Football-Sim).
set -e
REPO="${1:-.}"
cd "$REPO"
mkdir -p /tmp/w89ref
# fetch gh-pages into an EXPLICIT local ref — single-branch clones (git clone --single-branch, the
# default shallow) never create refs/remotes/origin/gh-pages, so a remote-tracking lookup fails there
if git show _w89-ghpages:Football-Sim-Z-post-blue-w89.html >/dev/null 2>&1; then
  echo "gh-pages ref present — no fetch needed"
else
  git fetch --depth 1 origin refs/heads/gh-pages:refs/heads/_w89-ghpages
fi
git show _w89-ghpages:Football-Sim-Z-post-blue-w89.html > /tmp/w89ref/w89.html
GOT=$(sha256sum /tmp/w89ref/w89.html | cut -d' ' -f1)
WANT=dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c
echo "w89 fixture sha256: $GOT"
if [ "$GOT" != "$WANT" ]; then
  echo "HASH MISMATCH: got $GOT, want $WANT — refusing to install a drifted reference"
  exit 1
fi
echo "w89 fixture materialised at /tmp/w89ref/w89.html (hash-pinned, matches the receipt)"
