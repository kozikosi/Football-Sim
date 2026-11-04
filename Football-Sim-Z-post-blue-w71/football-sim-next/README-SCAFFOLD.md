# football-sim-next — toolchain proof (w71, Z.ai seat)

This is **evidence for the framework decision**, not the product. No screens are ported
(blocked on the Architect's contracts, as agreed). What it proves, end to end:

| Step | Status in this sandbox | Command |
|---|---|---|
| Install | ✓ 6 s | `npm install` |
| Typecheck | ✓ | `npm run check` |
| Unit tests | ✓ 4/4 in ~0.6 s | `npm run test` |
| Build | ✓ **38.3 KB JS → 15.05 KB gzip** total | `npm run build` |
| CI (GitHub Actions) | ✓ workflow in `.github/workflows/ci.yml` — test → build → sha256 → **draft** Release on tag; Pages deploy is a separate Owner-triggered `workflow_dispatch` | needs only a push |
| Cloudflare Pages deploy | prepared; needs Owner's `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repo secrets, then one `workflow_dispatch` (≈2 minutes of Owner time, free plan) | CI job `deploy-pages` |
| Sync API skeleton | ✓ `/v1/health` Worker in `api/` with its own `wrangler.jsonc` (D1 binding declared) | `cd api && wrangler dev` |

## What's inside

- `src/lib/simStore.ts` — a store implementing the **Svelte store contract** with a typed
  action union (`START | PICK | UNDO`), mirroring the DESIGN of the Architect's engine
  `store.ts`. Not a fork, a seam-proof: Svelte components consume this store directly via
  `$store` auto-subscription — zero adapter code. If the Owner picks React instead, the same
  store wraps in `useSyncExternalStore` in ~6 lines; the pipeline (this CI, wrangler, vitest)
  survives the framework choice unchanged — that's the point.
- `src/App.svelte` — one small component (draft-start / pick / undo) in the w68 palette
  direction, consuming the store, to prove runes + contract-store interop and scoped styles.
- `src/lib/simStore.test.ts` — vitest suite (contract behavior: notify, unsubscribe, undo,
  purity of `next()`).
- `api/` — the second deployable (Workers + D1), proving the sync plan's home without
  building the sync feature ahead of its sequencing.

## Framework decision numbers (from this build)

| Metric | Svelte 5 + Vite (this build) |
|---|---|
| JS shipped, gzip | **15.05 KB** (app + runtime + store) |
| CSS shipped, gzip | 1.77 KB (scoped styles) |
| Build time | 0.13 s |
| Test time | 0.64 s |

A React + Vite hello-app with equivalent function typically lands ~4–5× that JS size
(react + react-dom baseline). For a game shell whose brand is instant load, that gap is
the portfolio headline: *same game, 1.8 MB single file → ~20 KB shell + engine.*

## Not done here, deliberately

- No screens ported (blocked on Claude's contracts — Owner's ruling).
- No sync endpoints beyond `/v1/health` (sequencing: v1 offline-first, sync is v1.1).
- No tag pushed (CI creates drafts on tags; go-live is the Owner's act).
