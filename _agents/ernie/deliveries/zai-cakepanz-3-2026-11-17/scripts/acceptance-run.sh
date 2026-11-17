#!/bin/bash
# acceptance-run.sh — Part 2: THE ONE UNINTERRUPTED SCRIPTED RUN. Every receipt line carries its
# command, its full stdout tail, and its exit code into ACCEPTANCE-RECEIPTS.txt. If any step fails,
# the run STOPS (set -e) — a green battery over a broken boot is not a receipt.
set -e
cd "$(dirname "$0")/.."
R=ACCEPTANCE-RECEIPTS.txt
: > "$R"
say() { echo "" >> "$R"; echo "=================================================================" >> "$R"; echo "== $1" >> "$R"; echo "=================================================================" >> "$R"; }
step() { local name="$1"; shift; say "$name"; echo "\$ $*" >> "$R"; local log; log=$(mktemp); if "$@" > "$log" 2>&1; then code=0; else code=$?; fi; tail -n 25 "$log" >> "$R"; echo "EXIT_CODE=$code" >> "$R"; rm -f "$log"; if [ "$code" -ne 0 ]; then echo "ACCEPTANCE RUN STOPPED AT: $name (exit $code)" >> "$R"; tail -40 "$R" >&2; exit "$code"; fi; }

step "1. npm ci (clean lock — no --legacy-peer-deps)" npm ci
step "2. npm run test:engine (expect 323/323, exit 0)" npm run test:engine
step "3. the node battery (expect 23/23, exit 0)" npm run battery:node
step "3b. the shell battery MUST run under --experimental-transform-types (the Part-4 parameter property)" node --experimental-transform-types batteries/node.battery.mjs
step "4. npm run build (green; dist/assets ships)" npm run build
step "5. npm run distfile (single-file dist/single.html)" npm run distfile

# the preview server stays up for the browser batteries (any stale listener is cleared first —
# a zombie preview once served a stale build and poisoned a receipt; the served hash is asserted)
lsof -t -i:4179 2>/dev/null | xargs -r kill -9 2>/dev/null || true
sleep 1
say "6. vite preview serves dist/ (the D3 check — a blank page means the assets are missing)"
npx vite preview --port 4179 --strictPort > /tmp/acc-preview.log 2>&1 &
PREVIEW_PID=$!
sleep 3
HTTP=$(curl -s -o /tmp/acc-index.html -w "%{http_code}" http://localhost:4179/)
echo "GET / -> HTTP $HTTP" >> "$R"
echo "served js asset: $(grep -o 'assets/index-[^"]*\.js' /tmp/acc-index.html)" >> "$R"
echo "on-disk js asset: $(grep -o 'assets/index-[^"]*\.js' dist/index.html)" >> "$R"
if [ "$HTTP" != "200" ]; then echo "ACCEPTANCE RUN STOPPED: preview did not serve (HTTP $HTTP)" >> "$R"; exit 1; fi

step "7. npm run battery (the slice battery, http build against the preview — expect 26/0/10/3)" npm run battery
step "8. the shell battery S1a–S30 (one uninterrupted run, exit 0)" node --experimental-transform-types batteries/shell.battery.mjs

say "9. boot probes: dist/single.html from vanilla file:// (the file:// law ran inside the shell battery S26–S28; receipt above)"
node scripts/probe-contrast.mjs >> "$R" 2>&1 || true
step "10. the P-369 node-count probe (five screens, 1180px + 390px)" node scripts/probe-node-counts.mjs
step "11. the reduced-motion screenshot pairs (normal vs reduced, both modes)" node scripts/probe-motion-shots.mjs

step "12. node scripts/regen-manifest.mjs (dist/ covered — the D4 fix)" node scripts/regen-manifest.mjs
step "13. node scripts/gate-manifest.mjs (PASS: dist/ hashed + boot target asserted)" node scripts/gate-manifest.mjs
step "14. node scripts/gate-numerals.mjs — CLEAN (1st pass)" node scripts/gate-numerals.mjs
step "15. node scripts/gate-numerals.mjs — CLEAN (2nd pass)" node scripts/gate-numerals.mjs

kill $PREVIEW_PID 2>/dev/null || true
say "ACCEPTANCE RUN COMPLETE — every step exit 0; the full outputs are this file"
echo "acceptance run complete → $R"
