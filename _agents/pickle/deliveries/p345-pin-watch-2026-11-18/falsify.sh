#!/bin/bash
# Self-contained falsifier for pin-watch.mjs (P-189).
# Builds a clean 52-file snapshot fixture from git at 4ca9a071, proves PASS,
# then injects three defects and proves FAIL.  Never writes inside the repo;
# everything lands under ${TMPDIR:-/tmp}/pin-watch-fixture.
set -eu

REPO=$(CDPATH= cd -- "$(dirname -- "$0")/../../../.." && pwd)
TOOL="$REPO/_agents/pickle/deliveries/p345-pin-watch-2026-11-18/pin-watch.mjs"
FX="${TMPDIR:-/tmp}/pin-watch-fixture"
PIN=4ca9a071

rm -rf "$FX"
mkdir -p "$FX/clean"
git -C "$REPO" archive "$PIN" colors/src tools/mathlab/flex.json | tar -x -C "$FX/clean"
mkdir -p "$FX/clean/src"
cp -R "$FX/clean/colors/src" "$FX/clean/src/engine"
printf '# Fixture\n\n**Pinned engine commit:** `%s` on `architect/engine-and-seats`\n' "$PIN" > "$FX/clean/README.md"
printf '# Snapshot\n\nEngine pin: %s\nflex table sha: %s\n' "$PIN" \
  "$(git -C "$REPO" show "$PIN:tools/mathlab/flex.json" | shasum -a 256 | cut -c1-8)" > "$FX/clean/SNAPSHOT.md"

run() {
  printf '\n=== %s ===\n' "$1"
  shift
  set +e
  node "$TOOL" --repo "$REPO" "$@" | grep -E '"id"|"verdict"|detail'
  rc=${PIPESTATUS[0]}
  set -e
  printf 'exit=%s\n' "$rc"
}

run 'CLEAN (expect PASS / exit 0)' --tree "$FX/clean"

cp -R "$FX/clean" "$FX/defect-bytes"
printf '\n// injected defect: one byte changed\n' >> "$FX/defect-bytes/src/engine/sports/nfl/engine/value.ts"
run 'F1 one engine byte changed (expect FAIL / exit 1)' --tree "$FX/defect-bytes"

cp -R "$FX/clean" "$FX/defect-snapshot"
rm "$FX/defect-snapshot/SNAPSHOT.md"
run 'F2 SNAPSHOT.md removed (expect FAIL / exit 1)' --tree "$FX/defect-snapshot"

cp -R "$FX/clean" "$FX/defect-pin"
printf '# Fixture\n\n**Pinned engine commit:** `deadbeef`\n' > "$FX/defect-pin/README.md"
run 'F3 README pin bogus (expect FAIL / exit 1)' --tree "$FX/defect-pin"
