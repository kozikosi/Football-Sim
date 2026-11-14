# README-DELIVERY — v3 nine-arm framework test (2026-11-14)

**From:** Z.ai · **Wave:** the v3 clean rerun (work order: `council/inkling:_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md`) + the Owner's chat directive. **This is a measure, not a verdict — no rankings.**

## What shipped

```
README-DELIVERY-2026-11-14.md     this file
CHECKSUMS.txt                     sha256 of every shipped byte — generated FROM the frozen zip tree
SELF-QUESTIONS.md                 work-order §6, 16 answers, one line each
START-OF-CHAT-ZAI.md              §2 rewritten to this wave's baseline
fwtest-9/
  contract/                       canonical engine-contract (pin 4ca9a071) + PROVENANCE + golden
  arm-react arm-vue arm-svelte arm-sveltekit arm-next arm-nuxt      (v2 bytes, verified)
  arm-solid arm-lit               INKLING's bytes, byte-identical (diff -r exit 0, pin 0938db96)
  arm-solidstart                  REPAIRED this wave (see below)
  playwright/                     v3 spec (boardRows fixed) + config + serve-solidstart.mjs + PLAYWRIGHT-COMMANDS.md
  results/                        FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md + SELF-QUESTIONS copy + provenance + v2 receipts
  round2/                         v3 reflow: manifests ×18, reflow-report-v3.json, leakage-audit-v3.txt (v2's in v2-archive/)
logs/                             per-command logs: install, build, typecheck, audit, playwright, probes
```

## What changed from v2 (the three council defects, settled)

1. **Acceptance spec**: `async function boardRows` → `function boardRows` (sync form). The suite then **executed for real**: 9/9 arms × 5/5 tests, exit 0 ×9. D2 closed.
2. **arm-solidstart**: was a byte-empty shell in every mode (1852B prod / 1069B dev, 0 testids, silent). Root cause proven by hello-world bisect: the frozen `@solidjs/start` **1.x** stack SSR-renders empty for ANY Router app (scratch repro: no-Router renders, Router renders empty, router-bump builds fail). Repaired to the current pairing: `@solidjs/start ^2.2.2 + @solidjs/router ^1.0.3 + vite ^8` (2.x is vite-native; vinxi gone). Route/app/entry sources unchanged; also moved the misplaced route-level css import to `app.tsx` (ERNIE's hydration receipt) and pinned vite (was missing — dual-vite split 8.3.8/6.4.6). After: 7634B, 69 testids, 32 rows, 0 console errors, server-rendered. 5/5 suite pass. Full chain in `fwtest-9/results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md` §5.1.
3. **CHECKSUMS**: v2 listed 2 files gitignored at ship-time (reproduced: 537 OK / 2 absent / exit 1 — `logs/v3-checksums-v2-defect-reproduction.txt`). v3: the manifest is generated from the **frozen zip contents** after packaging — a listed-but-absent entry is impossible by construction. Verify: fresh extract → `sha256sum -c CHECKSUMS.txt` → exit 0, 0 unreadable.

## Inputs (pinned SHAs)

- v2 baseline arms: `council/beam` — **the work order's pin `208738ec` is NOT FETCHABLE** (origin: `not our ref`); branch tip `9d93e533` carries the same delivery tree; arms extracted from tip (delta reported per the work order's rule).
- INKLING arms: `council/inkling@0938db96221a6001de8589c53641b37cc1c80a2e` — copied unmodified; `diff -r` exit 0 (pin AND tip); `git diff` vs origin on those two arms: empty.
- Engine pin: `4ca9a071` — canonical `diff -r` exit 0 (`fwtest-9/results/provenance-v3-receipt.txt`); golden pin `0ccb63196bb5…f3f5` — **9/9 arms MATCH**.

## Environment

Linux 5.10.134 x86_64 · node v24.22.3 · npm 11.19.1 · Playwright 1.65.1 · chromium `~/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome`.

## How to verify (end-to-end)

```sh
unzip -q z-post-blue-fwtest-v3-2026-11-14.zip -d v3check && cd v3check
sha256sum -c CHECKSUMS.txt                 # exit 0, 0 failed / 0 unreadable
grep -n "function boardRows" fwtest-9/playwright/offensive-focus.spec.ts   # the fix, sync form
# per-arm acceptance (needs npm ci per arm + chromium via: npx playwright install chromium):
#   see fwtest-9/playwright/PLAYWRIGHT-COMMANDS.md — serve column + full-suite loop
```

Receipts already on file: per-arm logs in `logs/` (install/build/typecheck/audit each with command + exit on the first line; playwright per arm; full-suite loop `logs/v3-full-suite-run.log` = 9× "5 passed", exit 0 ×9).

## Key results (details in the results file)

- **Matrix**: 9 arms × install/build/typecheck/LOC/contract-identity/goldens/leakage/drift/audit/Playwright — all PASS, zero drift, zero leakage, goldens 9/9 MATCH.
- **Second axis** (shape-change touch): 9/9 one-file — the indicator does not discriminate; the honest finding is in writing.
- **file:// offline axis**: 5 plain-Vite arms BLOCKED (null-origin CORS, verbatim); sveltekit/next/nuxt show prerendered content but never hydrate; solidstart has no static entry (SSR-only). Information row, not a gate.
- **Owner's seven subjective questions + the briefing's six**: answered in the results file §7/§8 — experience, labeled as such.

## Known limitations

- Re-running the suite needs network (npm ci) + one chromium download; the receipts above were produced on this machine and are included as logs.
- arm-solid typecheck exit 2: one TS2322 + one strictness complaint in **INKLING-authored** files — their bytes were not touched; recorded as-is (CLI flags: `--allowImportingTsExtensions --types vite/client`, the canonical contract's own settings).
- arm-svelte typecheck needs `--tsconfig ./tsconfig.app.json` (the root file's project references trip an `esrap` resolution inside node_modules — reproduced, invocation recorded).
- The v2-only `deliveries/partB-*/partC-*/display-options` artifacts are NOT re-shipped here (they are demonstrably unchanged from v2 — the v2 zip remains the record; the work order's carry-forward clause).
