#!/bin/sh
# tests/run_all.sh — composite runner (S-301)
#
# Authority: tests/CONTRACT.md C5 (ruled B3). The run order below is locked 0-5.
# Exit codes (C4): 0 pass · 1 validation/lint finding · 2 data-integrity violation
#   (dataset checks, manifest mismatch, missing or invalid baseline) · 3 runtime-guard
#   or marker/extraction failure · 4 usage or wrong build.
# Sh + node only. No installs, no network. Paths are __dirname-relative, never cwd.
#
# Status grammar (C4): the last line is PASS <name> or FAIL <name> <reason> per script;
# the final line is RUN_ALL: PASS | FAIL (<step>) | PARTIAL.
# A step whose script is not delivered is SKIPPED, and makes the run PARTIAL — never PASS.

set -u

ROOT=$(cd "$(dirname "$0")/.." && pwd)
BUILD="${1:-$ROOT/_archive/builds/NFL Draft Simulator v20 Claude.html}"

if [ ! -f "$BUILD" ]; then
  echo "RUN_ALL: FAIL (usage: run_all.sh <product.html>)"
  exit 4
fi

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# ---------------------------------------------------------------- step 0
echo "STEP 0: environment/identity"
BUILD_SHA=$(shasum -a 256 "$BUILD" | cut -d' ' -f1)
PINNED=$(sed -n 's/.*[Rr]eference build.*`\([0-9a-f]\{8,\}\)[^`]*`.*/\1/p' "$ROOT/STATUS.md" | head -1)
echo "BUILD: $BUILD"
echo "BUILD_SHA256: $BUILD_SHA"
echo "STATUS_SHA256: ${PINNED:-none}"
if [ -z "$PINNED" ]; then
  echo "RUN_ALL: FAIL (STATUS.md names no reference build)"
  exit 4
fi
case "$BUILD_SHA" in
  "$PINNED") ;;
  *)
    echo "RUN_ALL: FAIL (wrong build: $BUILD_SHA != $PINNED)"
    exit 4
    ;;
esac
echo "STEP 0: OK"

# ---------------------------------------------------------------- step 1
echo "STEP 1: node --check on the extracted core"
node -e '
const fs=require("fs");
const t=fs.readFileSync(process.argv[1],"utf8");
const m=[...t.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
if(!m.length){console.error("no inline <script> block found");process.exit(3);}
fs.writeFileSync(process.argv[2],m.join("\n;\n"));
' "$BUILD" "$TMP/core.js" || { echo "CHECK: FAIL core extraction"; exit 3; }
if node --check "$TMP/core.js" >/dev/null 2>&1; then
  echo "CHECK: OK"
else
  echo "CHECK: FAIL core does not parse"
  exit 3
fi

# ---------------------------------------------------------------- step 2
echo "STEP 2: manifest presence + function-name check"
MANIFEST="$ROOT/tests/manifest.txt"
if [ ! -f "$MANIFEST" ]; then
  echo "MANIFEST: SKIPPED (not delivered this round)"
  SKIPPED=1
else
  MISSING=""
  while read -r FN; do
    [ -z "$FN" ] && continue
    case "$FN" in \#*) continue ;; esac
    grep -q "function $FN" "$BUILD" || MISSING="$MISSING $FN"
  done < "$MANIFEST"
  if [ -n "$MISSING" ]; then
    echo "MANIFEST: FAIL missing functions:$MISSING"
    exit 2
  fi
  echo "MANIFEST: OK"
fi

# ---------------------------------------------------------------- steps 3-5
run_step () {
  # $1 = script name, $2 = file, $3 = extra note
  if [ ! -f "$2" ]; then
    echo "$1: SKIPPED (not delivered this round)"
    SKIPPED=1
    return 0
  fi
  node "$2" "$BUILD"
  _rc=$?
  if [ "$_rc" -eq 0 ]; then
    echo "$1: OK (exit 0)"
  else
    echo "$1: FAIL (exit $_rc)"
    return $_rc
  fi
  return 0
}

echo "STEP 3: pw4"
if [ ! -f "$ROOT/tests/pw4.js" ]; then
  echo "PW4: SKIPPED (not delivered this round)"
  SKIPPED=1
else
  if [ ! -f "$ROOT/tests/baseline.json" ]; then
    echo "PW4: BASELINE-ABSENT (exit 2)"
    echo "PW4: FAIL (exit 2)"
    exit 2
  fi
  node "$ROOT/tests/pw4.js" "$BUILD"
  _rc=$?
  if [ "$_rc" -eq 0 ]; then echo "PW4: OK (exit 0)"; else echo "PW4: FAIL (exit $_rc)"; exit "$_rc"; fi
fi

echo "STEP 4: validate"
run_step VALIDATE "$ROOT/tests/validate.js" || exit $?

echo "STEP 5: phone"
run_step PHONE "$ROOT/tests/phone.js" || exit $?

# ---------------------------------------------------------------- aggregate
if [ "${SKIPPED:-0}" = "1" ]; then
  echo "RUN_ALL: PARTIAL (a required check was not delivered or not runnable)"
  exit 2
fi
echo "RUN_ALL: PASS"
exit 0
