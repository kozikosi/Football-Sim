# Playwright — the acceptance instrument (per-arm command lines)

One spec, all arms: `offensive-focus.spec.ts` (shipped, not executed in the Z.ai sandbox — deviation D2). It drives the shared `data-testid` names every arm carries: renders the board; switching focus changes Priority and NEVER Wins (asserted per row); pre-game → kickoff → halftime offer (manual mode) vs no prompt (auto); `spread` present (v1-5f contract) and halftime `spread` NOT offered (eligibility rule); the Q4-automatics banner appears iff the contract fired them; the precedence note when a run-strat user focus meets the pass override.

## What a red result means (named, per the standing order)

- **Contract violation** — the arm shows a number the contract did not produce (Wins moved on focus change, a Priority not derivable from the contract, goldens mismatch). Red on `never-Wins` / board-value assertions = this class.
- **Arm-specific defect** — selector drift, state bug, hydration mismatch (e.g., Nuxt prerender/client state divergence, Next client-boundary mistake). Red on click/visibility assertions with the board values correct = this class.

## Per-arm: build → serve → run

Run from each arm root (`fwtest-7/<arm>/`). The preview serves on :4173 except where noted.

| Arm | Build + serve (two commands) | Run |
|---|---|---|
| arm-svelte | `npm run build` · `npm run preview` | `npx playwright test ../../playwright/offensive-focus.spec.ts` with `baseURL: http://localhost:4173` |
| arm-sveltekit | `npm run build` · `npm run preview` | same |
| arm-react | `npm run build` · `npm run preview` | same |
| arm-vue | `npm run build` · `npm run preview` | same |
| arm-solidstart | `npm run build` · `npm run preview` (Nitro, :3000) | same with `baseURL: http://localhost:3000` |
| arm-next | `npm run build` · `npm run preview` (`serve out/`, :4173) | same as :4173 arms |
| arm-nuxt | `npm run generate` · `npm run preview` (`serve .output/public`, :4173) | same as :4173 arms |

Suggested minimal per-arm Playwright config (drop into the arm root; no other edits):

```ts
// playwright.config.ts  (arm root)
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: { baseURL: 'http://localhost:4173' },        // :3000 for arm-solidstart
  webServer: { command: 'npm run preview', url: 'http://localhost:4173',
               reuseExistingServer: true, timeout: 30_000 },
  testDir: '../../playwright',
});
```

Then one command per arm: `npx playwright test`.

## Executed-in-its-place evidence (this wave)

Playwright was not executed (D2, standing — browser download outside this sandbox's budget). In its place, a static-HTML smoke check ran for the two NEW arms: the prerendered `index.html` of both `arm-next` (out/) and `arm-nuxt` (.output/public) contains all five always-on data-testids (`setup`, `manage-toggle`, `auto-pick`, `board`, `kickoff`) — the board renders from the contract without JS execution, which is what the spec's first assertion needs from a static export.
