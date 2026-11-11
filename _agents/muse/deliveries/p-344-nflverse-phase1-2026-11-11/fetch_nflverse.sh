#!/usr/bin/env bash
# Fetch nflverse Phase 1 baseline data, seasons 2016-2025 (P-344).
# Sources: nflverse/nflverse-data GitHub releases (public, free).
#   pbp               -> play_by_play_{season}.parquet
#   pbp_participation -> pbp_participation_{season}.parquet
#   snap_counts       -> snap_counts_{season}.parquet
# Writes files to raw/ and a manifest (manifest.json) with URL, size, sha256.
# Usage: bash fetch_nflverse.sh [raw_dir]
set -euo pipefail
RAW_DIR="${1:-$HOME/workspace/nflverse-phase1/raw}"
mkdir -p "$RAW_DIR"
BASE="https://github.com/nflverse/nflverse-data/releases/download"
declare -A TAGS=( [pbp]="pbp" [part]="pbp_participation" [snaps]="snap_counts" )
declare -A PREFIX=( [pbp]="play_by_play" [part]="pbp_participation" [snaps]="snap_counts" )
: > "$RAW_DIR/manifest.json"
echo '{"files": [' > "$RAW_DIR/manifest.json"
first=1
for kind in pbp part snaps; do
  tag="${TAGS[$kind]}"; pre="${PREFIX[$kind]}"
  for y in $(seq 2016 2025); do
    f="${pre}_${y}.parquet"
    url="$BASE/$tag/$f"
    out="$RAW_DIR/$f"
    echo "== $f"
    curl -L --fail --retry 3 --retry-delay 5 --connect-timeout 30 -o "$out" "$url"
    size=$(stat -c%s "$out")
    sha=$(sha256sum "$out" | cut -d' ' -f1)
    echo "   $size bytes  sha256 $sha"
    if [ $first -eq 1 ]; then first=0; else echo ',' >> "$RAW_DIR/manifest.json"; fi
    printf '{"file": "%s", "url": "%s", "bytes": %s, "sha256": "%s"}' "$f" "$url" "$size" "$sha" >> "$RAW_DIR/manifest.json"
  done
done
echo ']}' >> "$RAW_DIR/manifest.json"
echo "DONE: $(ls "$RAW_DIR"/*.parquet | wc -l) parquet files in $RAW_DIR"
