#!/bin/bash
# acceptance-run.sh — Part 2: THE ONE UNINTERRUPTED SCRIPTED RUN. Every receipt line carries its
# command, its full stdout tail, and its exit code into ACCEPTANCE-RECEIPTS.txt. If any step fails,
# the run STOPS (set -e) — a green battery over a broken boot is not a receipt.
# 2026-11-17 (the re-pin sitting): counts updated to the 5c808472 receipt set, the falsifier
# stages ADDED (every law must be shown to die, in the same run), and — the Part-D sitting — every
# node-side TS execution now goes through scripts/node-port-register.mjs (the precompiled
# src/engine-node copy) instead of --experimental-transform-types, which Node 26 removed.
# The falsifiers FAIL LOUD (D-2): a case that cannot run is a failure, never a green light.
set -e
cd "$(dirname "$0")/.."
R=ACCEPTANCE-RECEIPTS.txt
: > "$R"
say() { echo "" >> "$R"; echo "=================================================================" >> "$R"; echo "== $1" >> "$R"; echo "=================================================================" >> "$R"; }
step() { local name="$1"; shift; say "$name"; echo "\$ $*" >> "$R"; local log; log=$(mktemp); if "$@" > "$log" 2>&1; then code=0; else code=$?; fi; tail -n 25 "$log" >> "$R"; echo "EXIT_CODE=$code" >> "$R"; rm -f "$log"; if [ "$code" -ne 0 ]; then echo "ACCEPTANCE RUN STOPPED AT: $name (exit $code)" >> "$R"; tail -40 "$R" >&2; exit "$code"; fi; }

step "1. npm ci (clean lock — no --legacy-peer-deps)" npm ci
step "2. npm run test:engine (the pin's own suite — expect 430/430 at pin 408410477, exit 0)" npm run test:engine
step "2b. npm run precompile (the Part-D generated copy src/engine-node — the node suites' freshness gate regenerates it too, this makes the step explicit)" npm run precompile
step "3. the node battery via the Part-D register (expect 35/35: the 33 c12 laws + N34 the seam golden + N35 the b36 anchor — the S13 sitting; runs on Node 24 AND 26)" npm run battery:node
step "3b. the contrast guardrail (T6/W5 — the 32 team inks × 2 modes + the token audit; the six KNOWN holes stay named, a NEW hole FAILS)" node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs
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

step "7. npm run battery (the slice battery — expect 29/0/10/3: 26 carried + 3 Slice-3 laws)" npm run battery
step "8. the shell battery S1a–S31 + L12 (one uninterrupted run, exit 0 — 48/0: the A2 split, the boot path MANDATORY when an autosave exists, S31 the manual path, L12 the uniform-board law (cakepanz-9); Part-D register)" node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
step "8b. the uniform-board battery (cakepanz-9 + T2 + cakepanz-12 + S13 — expect 16/0: L16/L17 (T2) + L18 the double-click guard, L19 the staged-banner disarm, L20 the value cells announce their values, L21 the keyboard path to the gone% method (cakepanz-12), L22 the staged-Confirm double-click guard (S13); the rest carried: L13 the top-three suggestion, L8 the last pick lands on Complete (re-quoted), L14 the Complete roster print, L15 the wall-slip reveal, L10 the new draft after a done draft, L11 the partial Complete screen, L16/L17 the ONE-CLICK ringed-row draft + undo + expand + keyboard (the 2026-11-20 sitting); the late battery is DELETED with the flip — the Owner's ruling, the order §5; Part-D register)" node --import ./scripts/node-port-register.mjs batteries/board.battery.mjs
step "8c. the P-317 slot battery (T1 + S4 — expect 28/0: the draft-position selector end-to-end, node + browser laws, the independent order oracle)" node --import ./scripts/node-port-register.mjs batteries/slot.battery.mjs
step "8d. the seeded visual battery (T5/T3 — expect 17/0 at named seeds a3f2,k1x9: the ring laws, the 390 walk, the identical-boards replay, the seed code, W12 the restored-draft URL law, W13 the new-seed affordance law (S13))" node --import ./scripts/node-port-register.mjs batteries/visual.battery.mjs

say "9. boot probes: dist/single.html from vanilla file:// (the file:// law ran inside the shell battery S26–S28; receipt above)"
node scripts/probe-contrast.mjs >> "$R" 2>&1 || true
step "10. the P-369 node-count probe (five screens, 1180px + 390px; Part-D register)" node --import ./scripts/node-port-register.mjs scripts/probe-node-counts.mjs
step "11. the reduced-motion screenshot pairs (normal vs reduced, both modes; Part-D register)" node --import ./scripts/node-port-register.mjs scripts/probe-motion-shots.mjs

step "12. the receipt falsifiers F0–F12 (every law must DIE — zero tautologies, zero could-not-run; F11/F12 the cakepanz-8 A1 falsifiers)" node scripts/receipt-falsifier.mjs
step "13. the shell falsifiers FA/FB/FC (the render laws must die too)" node scripts/shell-falsifier.mjs
step "13b. the uniform-board falsifier (cakepanz-12: the D-2 STALE-SERVER GUARD carried in — served-hash asserted per case; F0-board clean baseline 16/0 + F0-shell baseline 48/0, then F15-board the completing-pick handoff deleted → L8 must DIE, F17 the startDraft order reverted → L10 must DIE, F18 the unconditional Complete h1 + live CTA re-planted → L11 must DIE, F19 the simple branch planted → L12 must DIE, F20 the suggestion wiring killed → L13 must DIE (the ring-dependent walk FAILS LOUD, never crashes — the false TAUTOLOGY of the c11 sitting is closed), F21 the roster print deleted → L14 must DIE, F22 the cascade deleted → L15 must DIE; F13/F14/F16 are SUPERSEDED 2026-11-19 with the flip; staged builds, PID ports)" node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs

step "13c. the P-317 slot falsifier (F-S1: the START dispatch drops pickSlot → B1+B3 must DIE)" node scripts/falsify-slot.mjs
step "13d. tools/shell-status.mjs (SHELL-STATUS.md is MEASURED, never hand-written — the T6 anti-rot tool; written BEFORE the manifest so the gates hash the fresh file)" node --import ./scripts/node-port-register.mjs tools/shell-status.mjs
step "14. node scripts/regen-manifest.mjs (dist/ covered — the D4 fix)" node scripts/regen-manifest.mjs
step "15. node scripts/gate-manifest.mjs (PASS: dist/ hashed + boot target asserted)" node scripts/gate-manifest.mjs
step "16. node scripts/gate-numerals.mjs — CLEAN (1st pass; CP_PIN=408410477 — the shipped tree's pin)" env CP_PIN=408410477 node scripts/gate-numerals.mjs
step "17. node scripts/gate-numerals.mjs — CLEAN (2nd pass)" env CP_PIN=408410477 node scripts/gate-numerals.mjs

# the M3 swap test is a HABIT, not a gate: run it against another engine commit when one is named
# (CP_SWAP_SHA=<sha> bash scripts/acceptance-run.sh). At the re-pin sitting it ran BOTH directions
# against d3bd81d2 (rehearsal before, reverse after) — receipts in VERIFY.txt §M3.
if [ -n "$CP_SWAP_SHA" ]; then step "18. the M3 swap test against $CP_SWAP_SHA" node scripts/swap-test.mjs "$CP_SWAP_SHA"; fi

kill $PREVIEW_PID 2>/dev/null || true
say "ACCEPTANCE RUN COMPLETE — every step exit 0; the full outputs are this file"
echo "acceptance run complete → $R"
