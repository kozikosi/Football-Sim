#!/bin/sh
# mathlab/run-all.sh <Pre-Colors.html> [Z-post-blue.html] — every engine-math test, one command. Exit 1 if any fails. Writes only to a temp dir.
# Needs: node, playwright (NODE_PATH=$(npm root -g)). Read-only on the product files.
set -u
PRE="${1:?usage: run-all.sh <Football-Sim-PreColors.html> [Z-post-blue.html]}"; Z="${2:-}"
D="$(cd "$(dirname "$0")" && pwd)"; T="$(mktemp -d)"; FIT="$D/results/fit-precolors-2026-10-26.json"; fail=0
run() { printf '%-44s ' "$1"; shift; if "$@" >"$T/out" 2>&1; then tail -1 "$T/out" | cut -c1-110; else echo "FAIL"; tail -4 "$T/out"; fail=$((fail+1)); fi; }
case "$(sha256sum "$PRE" | cut -c1-16)" in 40233d6be00e987c) ;; *) echo "NOT Pre-Colors (sha256 differs): stop"; exit 2;; esac
run "E1/E2 table = engine (derived integers)" node "$D/check-design.mjs" "$FIT"
run "E3a flex.json = Owner text (parse)"      node "$D/flexparse.mjs"
run "E3b flex sanity"                         node "$D/flexcheck.mjs"
run "E3c flex in live Pre-Colors engine"      node "$D/flexengine.js" "$PRE"
node "$D/apply-math-patch.mjs" "$PRE" "$T/pre-math.html" "$FIT" "$D/cfg.json" >"$T/patch.log" 2>&1 || { echo "FAIL patch"; cat "$T/patch.log"; fail=$((fail+1)); }
run "E10 pasted literals reproduce the fit"   node "$D/verify-patched.js" "$T/pre-math.html" "$FIT"
run "E4 real rosters vs 2025 wins"            node "$D/realcheck.js" "$PRE" "$FIT" "$D/wins2025.json" "$D/cfg.json"
if [ -n "$Z" ]; then run "E3c flex in Z-post-blue engine" node "$D/flexengine.js" "$Z"; fi
rm -rf "$T"; [ $fail -eq 0 ] && echo "ALL ENGINE-MATH TESTS PASS" || { echo "$fail FAILED"; exit 1; }
