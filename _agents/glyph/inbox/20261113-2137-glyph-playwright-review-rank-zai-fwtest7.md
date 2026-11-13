SPEAKER: glyph | ROLE: council seat (independent verifier/ranker) | TASK: Playwright acceptance run + arm ranking for Z.ai fwtest v2 (7 arms) | DATE: 2026-11-13T21:37Z

# Playwright review and ranking — `zai-fwtest7-dynamic-engine-2026-11-13` (beam `208738ec7ee7978e5d746d4100c92574a8028e5b`)

Owner standing rule applied: byte-check claims; VERIFIED = command-backed receipt (`ref@sha`/path/command/hash/output); otherwise REPORTED/INFERRED/UNKNOWN. I did not edit engine/product/governance/shared files or other seats’ branches.

## Inputs / scope (VERIFIED)

- Delivery: `origin/council/beam:zai-fwtest7-dynamic-engine-2026-11-13/` @ `208738ec...` (538 tracked paths). Extracted read-only: `git archive 208738ec zai-fwtest7-dynamic-engine-2026-11-13 | tar -x -C /tmp/zai-fwtest7`.
- Arms tested (7): `fwtest-7/arm-react`, `arm-vue`, `arm-svelte`, `arm-sveltekit`, `arm-next`, `arm-nuxt`, `arm-solidstart`. Spec: `fwtest-7/playwright/offensive-focus.spec.ts` (5 tests). Commands reference: `fwtest-7/playwright/PLAYWRIGHT-COMMANDS.md`. Per-arm package scripts confirmed from extracted `package.json` (preview ports/commands noted below).
- Environment (this run): `node v26.13.0`, `npm 11.20.0`, `npx /usr/local/bin/npx`, Playwright `1.64.1` (harness `/tmp/pw-harness`, installed `@playwright/test@1.64.1`), cached Chromium headless shell present (`~/Library/Caches/ms-playwright/chromium_headless_shell-1247/1248/1254`). No browsers downloaded in-session.

## Method (VERIFIED)

1. For each arm in `/tmp/zai-fwtest7/.../fwtest-7/<arm>`: `npm ci --no-audit --no-fund` then `npm run build` (and `npm run generate` for nuxt as indicated). All **exit 0** with build outputs produced (`dist/build/out/.vinxi/.output` per arm).
2. Playwright harness used a copied spec `/tmp/pw-harness/offensive-focus.spec.ts` + local config (`testDir /tmp/pw-harness`, per-arm `BASE_URL`, headless, json+line reporters). Each arm served on isolated port via its preview command, then `playwright test`.
3. **Spec harness fix (disclosed):** original spec defined `async function boardRows(page){ return page.locator(...); }` but called `await boardRows(page).count()` causing `TypeError: boardRows(...).count is not a function` (reproduced in initial runs for react/vue/svelte). Patched in harness copy only to `function boardRows(page){ return page.locator(...); }`; no arm code changed. Same 5 tests listed after patch.
4. Re-ran react/vue/svelte with patched spec; ran sveltekit/next/nuxt/solidstart with patched spec. Vue had one transient mid-run `ERR_CONNECTION_REFUSED` sequence on first patched attempt (server died mid-suite) — rerun clean 5/5.

## Playwright acceptance results (VERIFIED, this harness)

| Arm | Build (glyph) | Playwright (5 tests) | Notes |
|---|---:|---:|---|
| `arm-react` | PASS (`vite build`, 477ms) | **5/5 PASS** (1601ms) | wins-static/priority-moves, spread not halftime-eligible, auto/manual halftime, Q4 automatics, form arrows all passed. |
| `arm-vue` | PASS (`vue-tsc -b && vite build`, 393ms) | **5/5 PASS** (1698ms, rerun) | first patched attempt had 3 later failures from connection refused (server unavailable mid-run), not arm-logic assertion failures; rerun clean. |
| `arm-svelte` | PASS (`vite build`, 355ms) | **5/5 PASS** (1587ms) | all passed. |
| `arm-sveltekit` | PASS (`adapter-static`, 2.48s) | **5/5 PASS** (1344ms) | all passed (preview on 4176). |
| `arm-next` | PASS (`next build`, static export `out/`, ~3.2s phases) | **5/5 PASS** (1558ms) | served via `npm run preview -- -l 4177` (`serve out`; spec’s `--host/--port` args invalid for `serve`, adjusted). |
| `arm-nuxt` | PASS (`nuxt build` + `generate`, ~4.3s build / 1.68s generate) | **5/5 PASS** (1502ms) | served generated static `.output/public` on 4178. |
| `arm-solidstart` | PASS (`vinxi build`, Nitro/node-server) | **0/5 PASS** (5 failed: 1 visibility timeout, 3 test timeouts, 1 assertion 0 arrows) | Runtime SSR/HTML served but no app testids rendered: `curl http://127.0.0.1:3001/` returned shell with `<div id="app"><!--!$e000000--><!--!$/e000000--></div>` and modulepreloads, **no `data-testid` attributes** found in initial HTML; Playwright could not find `setup/board/focus/kickoff` elements (hydration/client render not producing expected DOM in this run). Default `:3000` was occupied on this machine (`lsof` showed existing listener pid 1228), retested on `:3001` with same functional failure. **Arm-specific runtime defect / unmet acceptance in this environment (UNRESOLVED).** |

## Build/install receipts (VERIFIED, glyph)

- react: 29 pkgs, build rc 0. vue: 54 pkgs, rc 0. svelte: 50 pkgs, rc 0. sveltekit: 56 pkgs, rc 0. next: 96 pkgs, build rc 0. solidstart: 530 pkgs, build rc 0. nuxt: 598 pkgs, build+generate rc 0. (package counts from `npm ci` summaries in logs.)
- Z.ai-reported metrics (REPORTED, not re-measured except build success): arm LOC/code-pkgs/output/audit/build-time per `fwtest-7/results/FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md` and `metrics-2026-11-13.json` (e.g. solidstart 445 node_modules pkgs, 13 audit incl 1 high h3-chain; nuxt 508 pkgs/10 audit dev-chain; react/svelte/vue lightweight; next 89 pkgs/668KB out; sveltekit 57 pkgs).

## Contract/boundary evidence (from prior byte-check of same commit, REPORTED reference)

- All 7 arm vendored contracts aggregate `6c5f7c39...` (nuxt at `app/engine-contract`), canonical `40a1be21...` differs only by `tools/`; all goldens `0ccb6319...`; arm-owned forbidden-pattern scan clean; round2 manifests claim ZERO arm-owned drift x7. (See glyph review `20261113-2126-glyph-review-zai-fwtest7-v2.md`, commit `b358357a`.)

## Ranking (glyph, evidence-weighted)

**Criteria (ordered):** (1) Playwright acceptance 5/5 in this run, (2) runtime/SSR correctness for the tested prototype, (3) stack cost/complexity (deps/install weight, audit surface, build/tooling friction), (4) fit to stated constraints (framework-neutral plain TS core remains source-of-truth; simple/free/static-friendly; football-first prototype), (5) Z.ai reported metrics/manifests as supporting REPORTED evidence. No arm is a final product choice; Z.ai remains definitive data source per Owner, council evaluates.

### Tier A — Acceptance passed (6 arms)
1. **`arm-react` (React+Vite)** — 5/5, fastest simple path in this set (light deps/build, clean tsc build, 0 audit reported by Z.ai, straightforward preview). Strong baseline for framework-neutral core + minimal shell.
2. **`arm-svelte` (Svelte+Vite)** — 5/5, very light/fast, small output; plain Vite ergonomics. Competitive with React; choice depends on team/framework preference (Svelte not a lock per Owner).
3. **`arm-vue` (Vue+Vite)** — 5/5, clean build/typecheck path, moderate deps; solid Vite option.
4. **`arm-sveltekit`** — 5/5 and static-adapter build ok; added meta-framework structure/build time vs Svelte+Vite with no acceptance gain shown here.
5. **`arm-next`** — 5/5 with static export (`out/`), but heavier output/Next complexity for a one-screen static prototype; benefits (routing/RSC/caching) largely unused per Z.ai (REPORTED).
6. **`arm-nuxt`** — 5/5 with `generate` static output, but highest install weight (598 pkgs here) and dev-chain audit surface reported; meta-framework cost disproportionate to prototype needs.

### Tier B — Acceptance failed (1 arm)
7. **`arm-solidstart`** — build PASS but **0/5 Playwright**: app shell rendered without expected testids/hydrated UI in this run (SSR HTML lacked `data-testid`s). Also highest reported audit concern among arms in Z.ai notes and heavy vinxi/Nitro stack. **Not rankable as “working” until runtime/hydration/testid rendering is fixed and reverified.**

## Caveats / limits

- Spec harness copy patched only to fix `boardRows(...).count is not a function` locator usage; behavior/assertions unchanged. Patch is a test-harness correction, not arm evidence.
- Playwright re-run scope: 7 Z.ai arms only. **INKLING `arm-lit`/`arm-solid` (on `origin/council/inkling`) not in this bundle and not Playwright-run here** (build artifacts absent in inspected delivery; separate merge still required for 9-arm picture).
- Results reflect this environment/tooling (Node 26.13 vs Z.ai 24.x, local Playwright 1.64.1). One transient server/connection issue observed for Vue before clean rerun.
- Rankings are glyph’s evidence-weighted input for council evaluation, not a final framework decision.

## Artifacts

- JSON results: `/tmp/pw-harness/result-arm-react.json`, `result-arm-vue.json`, `result-arm-svelte.json`, `result-arm-sveltekit.json`, `result-arm-next.json`, `result-arm-nuxt.json`, `result-arm-solidstart.json` (and per-arm logs `log-arm-*.txt(.server)`), ephemeral temp workspace.
- Prior byte-check review: `_agents/glyph/inbox/20261113-2126-glyph-review-zai-fwtest7-v2.md` (`b358357a`).
