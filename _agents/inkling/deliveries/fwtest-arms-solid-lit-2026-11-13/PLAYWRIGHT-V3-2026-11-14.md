# V3 RECEIPTS — all nine arms, cold start, acceptance suite (INKLING, 2026-11-13)

A cold-from-source rerun of every arm through the Playwright acceptance spec (`offensive-focus.spec.ts`) with the one-token fix applied (`await boardRows(page).count()` → `await (await boardRows(page)).count()`, ERNIE+INKLING convergent). Commands run, in sequence, each arm's `npm ci` and build executed fresh on this machine, then `vite preview` / `serve` / `node .output/server/index.mjs` in background, then `npx playwright test offensive-focus.spec.ts`.

**Verdict table (VERIFIED, this session):**

| Arm | Spec result | Notes |
|---|---|---|
| arm-svelte | 5/5 ✓ | exit 0; ~0.3 s build |
| arm-sveltekit | 5/5 ✓ | exit 0; ~1.6 s |
| arm-react | 5/5 ✓ | exit 0; ~0.3 s |
| arm-vue | 5/5 ✓ | exit 0; ~0.3 s |
| arm-next | 5/5 ✓ | static export via `output: 'export'` (Turbopack); `npx serve out -l <port>` |
| arm-nuxt | 5/5 ✓ | **prose correction, not a framework defect**: `npm run build` only builds; the spec requires `npm run generate` (prerender to `.output/public`). On generate, 5/5 pass in 1.8 s. |
| arm-solid | 5/5 ✓ | INKLING-built; same protocol |
| arm-lit | 5/5 ✓ | INKLING-built; same protocol |
| **arm-solidstart** | **0/5 red** | `node .output/server/index.mjs` returns **1852 B**; body contains only the SSR shell, `<div id="app"></div>` comment-markers, **zero `data-testid`**, zero console errors, `readyState: complete`; never renders in dev or in prod. The route (`src/routes/index.tsx`) never hydrates — `app.config.ts` is empty and `src/routes/` is not the convention path the default config expects. **This is an arm-defect, not framework judgment; the acceptance gate fails this arm at load stage.** |

**The acceptance suite passes 8 of 9 arms. The only red is arm-solidstart.**

## arm-nuxt note (the one the row hides)

The v2 wave shipped the same arms and Z.ai declared "npnu generate passed"; an earlier v3 probe (pre-`generate`) failed 5/5 because `npm run build` alone does not prerender. After running `npm run generate`, the page HTML is produced (`.output/public/index.html` contains all 40 `data-testid` rows) and `npx serve .output/public` then serves it correctly; the spec passes in 1.8 s. Recommend: the acceptance protocol note in the results filing should **declare the correct invocation** (`npm run generate`, not `npm run build`), or the per-arm command line + `BASE_URL` mapping table will keep producing false negatives in every re-run by anyone reading only the package scripts.

## arm-solidstart note (firm)

The arm fails at stage one. Not a protocol failure, a framework wiring failure in the arm as scaffolded by its author. Recommended resolutions, in order of preference (Owner decides):

1. Author repairs the wiring (up to them — INKLING has not modified their arm and will not apply unauthorized patches to their bytes);
2. Or the Owner scores it eliminated by the correctness 20% gate (the instrument's whole purpose is to eliminate on this red);
3. Or the arm is parked for v4 with the reason recorded.

What is NOT contested: on this machine, on a fresh extraction, the SSR runs but never mounts anything; hydration attaches to empty markup and stays silent forever. 100 % reproducible.

## What this note changes for v3 / all future waves

- The v3 work order stands (`_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md`) with the one-token fix in force.
- The spec fix is now the v3 default everywhere; the v3 round builds on this receipt, not on v2's "green" claim (which was paper-thin on these bytes for arm-nuxt).
- Three genuine bugs shipped this week, all found by actually running the thing: (1) the spec's own `Promise.count()` bug, (2) `arm-nuxt` requires `generate`, not `build` to produce an acceptance target, (3) `arm-solidstart` never renders at all. Each is a factory-floor-only finding; nobody catches them by reading.

All three were found *by running the suite*, and all three are the exact kind of defect the acceptance instrument exists to eliminate. The framework decision is the Owner's, but *this wave* hands you eight green arms and one red flag, not an eight-arm tie.
