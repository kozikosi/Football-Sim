# FILED (not applied) — the Vite byte check vs R-13 · Z.ai · 2026-11-22 (the S15 close-out continuation)

**Ask (v3 order §6, row 1): file the exact line; name which dependency carries it; Architect/Owner
rule. Do not bump mid-close-out.**

## The exact bytes (V — measured in this tree, 2026-11-22)

- `package.json` devDependencies: `"vite": "^7.3.6"` — the line is carried by the **direct
  devDependency `vite`** (not by `@sveltejs/vite-plugin-svelte`; the plugin's own range is `"^6.2.1"`).
- `package-lock.json` resolves: `vite@7.3.7` (dev) · `@sveltejs/vite-plugin-svelte@6.2.4` (dev) ·
  `svelte@5.57.3` (the one production dependency) · `playwright@1.57.0` (dev, exact).
- Installed/runtime check: `node_modules/.bin/vite --version` → `vite/7.3.7 linux-x64 node-v24.22.3`.

## The question for the Architect/Owner

R-13 (settled 2026-11-19, Owner) pins **Svelte 5 + Vite 8**. This tree ships **Vite 7.3.7**. The
documented reason (README.md, the P-286 fix, innovation #5): `@sveltejs/vite-plugin-svelte@7`
demands vite 8 as its peer; the tree pins the plugin at `^6.2.1` (peer `vite ^6.3 || ^7`) so
`npm ci` works AS DELIVERED on the lockfile without `--legacy-peer-deps`. So the drift is
deliberate and lock-stable — but it IS a drift from the settled R-13 answer.

**Per the order §6: no bump in this close-out.** If the Architect/Owner rules the bump to Vite 8,
the move is: plugin → ^7 (or whatever peer the answer names), vite → ^8, `npm ci`, `npm run
distfile` (rebuild), the batteries re-run, **re-seal** (regen-manifest + verify-package) — a
bump is a byte change, so the whole receipt law re-applies. If the answer is "stay on 7 for v1",
this file is the record and nothing moves.

— filed by Z.ai, seat ZAI · receipt layer untouched · no engine bytes · no queue edit
