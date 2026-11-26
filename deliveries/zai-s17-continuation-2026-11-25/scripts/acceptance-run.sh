#!/bin/bash
# acceptance-run.sh — Part 2: THE ONE UNINTERRUPTED SCRIPTED RUN. Every receipt line carries its
# command, its full stdout tail, and its exit code into ACCEPTANCE-RECEIPTS.txt. If any step fails,
# the run STOPS (set -e) — a green battery over a broken boot is not a receipt.
# 2026-11-17 (the re-pin sitting): counts updated to the 5c808472 receipt set, the falsifier
# stages ADDED (every law must be shown to die, in the same run), and — the Part-D sitting — every
# node-side TS execution now goes through scripts/node-port-register.mjs (the precompiled
# src/engine-node copy) instead of --experimental-transform-types, which Node 26 removed.
# The falsifiers FAIL LOUD (D-2): a case that cannot run is a failure, never a green light.
#
# S17 continuation (2026-11-25, the A1 work order): the 2026-11-24 sitting's run died mid-13b and
# the generated status still claimed COMPLETE. Three fixes land IN THE SCRIPT:
#   • the TERMINAL MARKER is generated here, from the outcome: "ACCEPTANCE RUN COMPLETE — every
#     step exit 0" on a full pass, or "ACCEPTANCE RUN PARTIAL — stopped after step N" (+ the
#     STOPPED AT line naming the failed step) on an interruption — never a prose claim.
#   • --resume: completed steps are reused ONLY when the receipt's block for that step still hashes
#     to the ledger value in receipt-attestation.json (scripts/attest.mjs) — an interruption can
#     never overwrite a completed receipt with a partial one: the previous receipt is ARCHIVED
#     (deliveries/receipts/partH-s15/prev-acceptance-receipts-<ts>.log) before a fresh run truncates
#     it, and a resumed run rewrites the receipt to its VERIFIED prefix before continuing.
#   • every run record is attested: receipt-attestation.json carries the command, per-step exit
#     codes, tree_sha_start/end and log_sha256 = sha256 of the finished receipt; the claims gate
#     recomputes it (claim acceptance-attestation) — a hand-edited receipt or stale marker fails loud.
# A2: step 3 tees the node battery's stdout into deliveries/receipts/node-battery.log (pipefail —
# a failed battery still fails the step), so the filed receipt is the LIVE run, never a stale tail.
set -e
cd "$(dirname "$0")/.."
R=ACCEPTANCE-RECEIPTS.txt
RESUME=0
[ "${1:-}" = "--resume" ] && RESUME=1
STEP_N=0
REUSE_N=0

say() { echo "" >> "$R"; echo "=================================================================" >> "$R"; echo "== $1" >> "$R"; echo "=================================================================" >> "$R"; }

CURRENT_STEP="startup"
on_interrupt() {
  # the SIGTERM/SIGINT path (SIGKILL cannot be trapped — --resume covers it): the 2026-11-24 sitting
  # died mid-13b leaving a receipt with NO terminal marker at all, which is exactly how the false
  # COMPLETE survived next to it. An interrupted run now MARKS ITSELF honestly in the receipt.
  echo "ACCEPTANCE RUN STOPPED AT: $CURRENT_STEP (interrupted — SIGTERM/SIGINT)" >> "$R" 2>/dev/null || true
  echo "" >> "$R" 2>/dev/null || true
  echo "ACCEPTANCE RUN PARTIAL — stopped after step $((STEP_N > 0 ? STEP_N - 1 : 0))" >> "$R" 2>/dev/null || true
  node scripts/attest.mjs finish --partial --stopped-at "$CURRENT_STEP (interrupted)" --failed-step "$CURRENT_STEP" --exit 143 >/dev/null 2>&1 || true
  exit 143
}
trap on_interrupt TERM INT

if [ "$RESUME" = "1" ]; then
  node scripts/attest.mjs start --resume
  REUSE_N=$(node scripts/attest.mjs resume-plan)
  echo "resume plan: reuse the first $REUSE_N ledger step(s), re-run the rest"
  if [ "$REUSE_N" -gt 0 ]; then
    node scripts/attest.mjs truncate-receipt --keep-blocks "$REUSE_N"
  fi
else
  node scripts/attest.mjs start --fresh
  : > "$R"
fi

step() {
  local name="$1"; shift
  local cmdstr="$*"
  STEP_N=$((STEP_N + 1))
  CURRENT_STEP="$name"
  if [ "$RESUME" = "1" ] && [ "$STEP_N" -le "$REUSE_N" ]; then
    echo "resume: reusing ledger step $STEP_N ('$name') — receipt block hash verified against receipt-attestation.json"
    return 0
  fi
  if [ "$RESUME" = "1" ] && [ "$STEP_N" = "$((REUSE_N + 1))" ]; then
    {
      echo ""
      echo "================================================================="
      echo "== RESUME $(date -u +%Y-%m-%dT%H:%M:%SZ): ledger steps 1..$REUSE_N reused verbatim (block sha256s verified); re-running from '$name'"
      echo "================================================================="
    } >> "$R"
    # the resume-drill finding (2026-11-25): a plain kill took the step-6 preview server down with
    # the original run, so the first re-run battery died on the D-2 stale-server guard ("served
    # nothing") — the guard was RIGHT. When the reused prefix reaches past the preview step, the
    # resumed run brings the server back up before the first browser step (preview-serve.sh kills
    # any listener first, so this is idempotent; the restart is a RESUME-context note, not a step).
    local pidx; pidx=$(node scripts/attest.mjs preview-step-index)
    if [ "${pidx:-0}" -gt 0 ] && [ "$REUSE_N" -ge "$pidx" ]; then
      {
        echo "== RESUME note: the reused prefix includes the step-6 preview server, which the interruption took down — restarting it (the D-2 guard demands a live server whose served bytes match the shipped dist)"
      } >> "$R"
      bash scripts/preview-serve.sh 4179 >> "$R" 2>&1 || { echo "ACCEPTANCE RUN STOPPED AT: $name (the resume could not restart the preview server)" >> "$R"; echo ""; echo "ACCEPTANCE RUN PARTIAL — stopped after step $REUSE_N" >> "$R"; node scripts/attest.mjs finish --partial --stopped-at "$name" --failed-step "resume-preview-restart" --exit 1 || true; exit 1; }
    fi
  fi
  say "$name"
  echo "\$ $cmdstr" >> "$R"
  local log; log=$(mktemp)
  local code
  if "$@" > "$log" 2>&1; then code=0; else code=$?; fi
  {
    tail -n 25 "$log"
    echo "EXIT_CODE=$code"
  } >> "$R"
  rm -f "$log"
  local blocksha
  blocksha=$(node scripts/attest.mjs hash-last-block)
  node scripts/attest.mjs step --name "$name" --command "$cmdstr" --block-sha "$blocksha" --exit "$code"
  if [ "$code" -ne 0 ]; then
    {
      echo "ACCEPTANCE RUN STOPPED AT: $name (exit $code)"
      echo ""
      echo "ACCEPTANCE RUN PARTIAL — stopped after step $((STEP_N - 1))"
    } >> "$R"
    node scripts/attest.mjs finish --partial --stopped-at "$name" --failed-step "$name" --exit "$code" || true
    tail -40 "$R" >&2
    exit "$code"
  fi
}

step "1. npm ci (clean lock — no --legacy-peer-deps)" npm ci
step "2. npm run test:engine (the pin's own suite — expect 430/430 at pin 408410477, exit 0)" npm run test:engine
step "2b. npm run precompile (the Part-D generated copy src/engine-node — the node suites' freshness gate regenerates it too, this makes the step explicit)" npm run precompile
step "3. the node battery via the Part-D register (expect 37/37: the 33 c12 laws + N34 the seam golden + N35 the b36 anchor (S13) + N36 the truthful engine stamp (S15 §4.4) + N37 the brag-share text law (S15 §4.8); runs on Node 24 AND 26) — A2: stdout tees into deliveries/receipts/node-battery.log so the FILED receipt is this live run" bash -c 'set -o pipefail; npm run battery:node 2>&1 | tee deliveries/receipts/node-battery.log'
step "3b. the contrast guardrail (T6/W5 — the 32 team inks × 2 modes + the token audit; the six KNOWN holes stay named, a NEW hole FAILS)" node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs
step "4. npm run build (green; dist/assets ships)" npm run build
step "5. npm run distfile (single-file dist/single.html)" npm run distfile
step "6. vite preview serves dist/ (the D3 + D-2 guards as ONE steppable command: HTTP 200 + the served js asset must equal the on-disk dist asset — a zombie preview once served a stale build and poisoned a receipt; the server stays up for the browser batteries)" bash scripts/preview-serve.sh 4179

step "7. npm run battery (the slice battery — expect 29/0/10/3: 26 carried + 3 Slice-3 laws)" npm run battery
step "8. the shell battery S1a–S31 + L12 + S32/S33/S34/S35 (one uninterrupted run, exit 0 — 53/0: the A2 split, the boot path MANDATORY when an autosave exists, S31 the manual path, L12 the uniform-board law (cakepanz-9); S15: +S32 law L-ERR both halves (the dispatchAsync contract), +S33 the glass panel law (w89 :625), +S34 the envelope stamp law (the engineVersion the save carries equals the running engineVersion(), §4.4), +S35 the brag-surface law (P-209: no download, the link only from the build-time constant, hidden while unset); 53 = 51 + the stamp law + the brag law; Part-D register)" node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
step "8b. the uniform-board battery (cakepanz-9 + T2 + cakepanz-12 + S13 + S15 — expect 24/0: L16 EVERY row carries ONE visible Draft button (.cp-draftbtn) naming the slot, one click lands one pick (the S15 one-button design, cp-quick retired) + L17 undo/expand/keyboard + L18 the double-click guard, L19 the staged-banner disarm, L20 the value cells announce their values, L21 the keyboard path to the gone% method (cakepanz-12), L22 the staged-Confirm double-click guard (S13); carried: L13 the top-three treatment, L8 the last pick lands on Complete (re-quoted), L14 the Complete roster print, L15 the wall-slip reveal, L10 the new draft after a done draft, L11 the partial Complete screen; S15: L23 the CORRECTED w89 glow (EVERY button pulses, the three opt out to the sheen, reduced-motion kills both), L26 the TOP badge exactly on the three, L27 the sheen exactly on the three, L28 zero cp-quick / zero ring class / the why copy exactly on the three, L30 sort-after-restore (the pickle F4 law), L31 the toast-truth law (the one-click toast rides a LANDED pick — a refused pick shows only the error line, the 0305 finding); Part-D register)" node --import ./scripts/node-port-register.mjs batteries/board.battery.mjs
step "8c. the P-317 slot battery (T1 + S4 — expect 28/0: the draft-position selector end-to-end, node + browser laws, the independent order oracle)" node --import ./scripts/node-port-register.mjs batteries/slot.battery.mjs
step "8d. the seeded visual battery (T5/T3 — expect 18/0 at named seeds a3f2,k1x9: the top-three laws (the ring retired, S15 — every selector rides .cp-top3 .cp-draftbtn), the 390 walk, the identical-boards replay, the seed code, W12 the restored-draft URL law, W13 the new-seed affordance law, W14 the link-beats-autosave law (S14/P0))" node --import ./scripts/node-port-register.mjs batteries/visual.battery.mjs

say "9. boot probes: dist/single.html from vanilla file:// (the file:// law ran inside the shell battery S26–S28; receipt above)"
node scripts/probe-contrast.mjs >> "$R" 2>&1 || true
step "10. the P-369 node-count probe (five screens, 1180px + 390px; Part-D register)" node --import ./scripts/node-port-register.mjs scripts/probe-node-counts.mjs
step "11. the reduced-motion screenshot pairs (normal vs reduced, both modes; Part-D register)" node --import ./scripts/node-port-register.mjs scripts/probe-motion-shots.mjs

step "12. the receipt falsifiers F0–F14 (every law must DIE — zero tautologies, zero could-not-run; F11/F12 the cakepanz-8 A1 falsifiers; S15: F13 the stale stamp re-planted → N36 must DIE, F14 the download path re-planted → N37 must DIE)" node scripts/receipt-falsifier.mjs
step "13. the shell falsifiers FA/FB/FC/FD/FE/FF (the render laws must die too; S15: FD the L-ERR clear-half reverted → S32 must DIE, FE the stale hardcoded stamp re-planted → S34 must DIE, FF a hardcoded brag URL planted → S35 must DIE; every child log filed under deliveries/receipts/partH-s15/)" node scripts/shell-falsifier.mjs
step "13b. the uniform-board falsifier (cakepanz-12 + S15: the D-2 STALE-SERVER GUARD carried in — served-hash asserted per case; F0-board clean baseline + F0-shell baseline (the S15 bytes), then F15-board the completing-pick handoff deleted → L8 must DIE, F17 the START order reverted (re-anchored to the dispatchAsync bytes) → L10 must DIE, F18 the unconditional Complete h1 + live CTA re-planted → L11 must DIE, F19 the simple branch planted → L12 must DIE, F20 the suggestion wiring killed → L13 must DIE (the walk FAILS LOUD, never crashes), F21 the roster print deleted → L14 must DIE, F22 the cascade deleted → L15 must DIE, F23-w14 the naive link guard → W14 must DIE, F24 the primary re-derived from rendered text → L24 must DIE, F25 the autosave drops suggestIds → L25 must DIE, F26 the pulse removed (re-anchored to .cp-draftbtn) → L23 must DIE; S15: F27 the badge on every row → L26 must DIE, F28 the sheen on every button → L27 must DIE, F29 cp-quick + the ring class re-planted → L28 must DIE, F30 setSort keeps the restored suggestIds → L30 must DIE, F31 the sync toast lie re-planted (the toast set before the dispatch resolves) → L31 must DIE; every child log filed under deliveries/receipts/partH-s15/; staged builds, PID ports)" node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs

step "13c. the P-317 slot falsifier (F-S1: the START dispatch drops pickSlot → B1+B3 must DIE)" node scripts/falsify-slot.mjs
step "13d. tools/shell-status.mjs (SHELL-STATUS.md is MEASURED, never hand-written — the T6 anti-rot tool; written BEFORE the manifest so the gates hash the fresh file)" node --import ./scripts/node-port-register.mjs tools/shell-status.mjs
step "14. node scripts/regen-manifest.mjs (dist/ covered — the D4 fix)" node scripts/regen-manifest.mjs
step "15. node scripts/gate-manifest.mjs (PASS: dist/ hashed + boot target asserted)" node scripts/gate-manifest.mjs
step "16. node scripts/gate-numerals.mjs — CLEAN (1st pass; CP_PIN=408410477 — the shipped tree's pin)" env CP_PIN=408410477 node scripts/gate-numerals.mjs
step "17. node scripts/gate-numerals.mjs — CLEAN (2nd pass)" env CP_PIN=408410477 node scripts/gate-numerals.mjs
step "17b. node tools/verify-package.mjs . (S15 §4.1: the D1 digest defect CLOSED — both widths parse by length; the converse check holds: the tree carries no unlisted file)" node tools/verify-package.mjs .
step "17c. node scripts/check-claims.mjs --phase packaging (the T2 claims protocol — 2026-11-24, the orcads F2 fix: the claim list is machine-checkable in claims.json, matched against the formats the tools ACTUALLY print; a RED is a failing line, never a paragraph the author can overrule)" node scripts/check-claims.mjs --phase packaging

# the M3 swap test is a HABIT, not a gate: run it against another engine commit when one is named
# (CP_SWAP_SHA=<sha> bash scripts/acceptance-run.sh). At the re-pin sitting it ran BOTH directions
# against d3bd81d2 (rehearsal before, reverse after) — receipts in VERIFY.txt §M3.
if [ -n "${CP_SWAP_SHA:-}" ]; then step "18. the M3 swap test against $CP_SWAP_SHA" node scripts/swap-test.mjs "$CP_SWAP_SHA"; fi

PIDFILE=/tmp/acc-preview-4179.pid
if [ -f "$PIDFILE" ]; then kill "$(cat "$PIDFILE")" 2>/dev/null || true; rm -f "$PIDFILE"; fi
lsof -t -i:4179 2>/dev/null | xargs -r kill -9 2>/dev/null || true

{
  echo ""
  echo "ACCEPTANCE RUN COMPLETE — every step exit 0; the full outputs are this file"
} >> "$R"
node scripts/attest.mjs finish --complete
echo "acceptance run complete → $R"
