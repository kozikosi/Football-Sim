# Playwright — the acceptance instrument (per-arm command lines, v3)

One spec, all nine arms: `offensive-focus.spec.ts`. **v3 status: EXECUTED — 9/9 arms × 5/5 tests, exit 0 each** (`../logs/v3-playwright-arm-*.log` + `../logs/v3-full-suite-run.log`). D2 (shipped-never-executed) is closed.

v3 spec change (the one-token fix, sync form): `async function boardRows` → `function boardRows` — v1/v2 shipped it `async`, so `await boardRows(page).count()` called `.count()` on a `Promise<Locator>` and TypeError'd on every arm (four-seat convergence, council wave 2026-11-13).

The five tests: board renders (Wins static truth, Priority moves with focus); the fifth focus exists and is NOT halftime-eligible; auto mode skips the halftime prompt / manual offers one change; Q4 automatics surface only when the contract fired them; form arrows binary hot/cold, no emoji, no text labels.

## Per-arm: build → serve → run (as executed this wave)

Runner: `scripts/v3_pw_run.sh <arm> <port>` (serve → curl-200 readiness → run → kill). Ports: react 4171, vue 4172, svelte 4173, sveltekit 4174, next 4175, nuxt 4176, solid 4177, lit 4178, solidstart 4179.

| Arm | Serve (after `npm run build`) | Notes |
|---|---|---|
| arm-react / arm-vue / arm-svelte / arm-solid / arm-lit | `npm run preview -- --port <port> --strictPort` | vite preview serves `dist/` |
| arm-sveltekit | `npm run preview -- --port <port> --strictPort` | serves the adapter-static `build/` |
| arm-next | `npx serve out -l <port>` | static export; `out/` |
| arm-nuxt | `npm run generate` FIRST (build alone does NOT prerender — the acceptance HTML exists only at `.output/public/` after generate; measured: build-only → 0 testids, suite 0/5) · then `npx serve .output/public -l <port>` | the one-word footgun, now written down |
| arm-solidstart | `env PORT=<port> npm run start` | start 2.x: vite build → `dist/client` statics + `dist/server` fetch handler; `../playwright/serve-solidstart.mjs` (shipped here) serves statics with MIME + SSR handler + one warm-up request (start-2.x cold start streams the shell only — measured req#1 991B/0 testids, req#2+ 7634B/69) |

Run from `fwtest-9/playwright/` (this dir carries `@playwright/test` 1.65.1 + `playwright.config.ts`):

```sh
BASE_URL=http://localhost:<port> npx playwright test offensive-focus.spec.ts
```

Full-suite loop (as run, receipts in `../logs/v3-full-suite-run.log`):

```sh
for pair in "arm-react 4171" "arm-vue 4172" "arm-svelte 4173" "arm-sveltekit 4174" \
            "arm-next 4175" "arm-nuxt 4176" "arm-solid 4177" "arm-lit 4178" "arm-solidstart 4179"; do
  set -- $pair; bash scripts/v3_pw_run.sh $1 $2
done
```

Environment: Playwright 1.65.1 · chromium `~/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome` · headless · retries 0 · timeout 30s/test.

## What a red result means (named, per the standing order)

- **Contract violation** — the arm shows a number the contract did not produce (Wins moved on focus change, a Priority not derivable from the contract, goldens mismatch). Red on never-Wins / board-value assertions = this class.
- **Arm-specific defect** — selector drift, state bug, hydration mismatch. Red on click/visibility assertions with board values correct = this class.
- **Invocation defect** — wrong serve command for the arm (the arm-nuxt `build`-vs-`generate` class). Red with 0 testids found = check the serve column first.
