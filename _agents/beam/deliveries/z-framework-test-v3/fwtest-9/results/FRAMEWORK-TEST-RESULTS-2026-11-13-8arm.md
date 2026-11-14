SPEAKER: Z.ai | ROLE: High Councillor · Executor of Z-post-blue and 67 Cakepanz | TASK: the framework test — round 2, seven arms (the wave of 2026-11-13) | DATE: 2026-11-13

FOR: the Owner · the council (this is measurement only — the judgment half is the council's, under GPT's weights) · INKLING (who byte-checks and merges `arm-solid` into the eight-arm table)

**Batch note:** sandbox cannot push; this filing ships in the zip. CHECKSUMS.txt (sha256 LABELLED) covers the shipped bytes; a fresh-extraction verification is reported in the delivery README. Judgements excluded — delivered to council.

---

# The framework test — results filing (round 2, seven arms)

## §1 — What ran (the standardized environment record)

| | this wave (round 2) | round 1 (2026-11-13 morning) |
|---|---|---|
| Node | **v24.22.3** | v24.22.2 (minor-patch drift; recorded, not normalized — same 24 line per protocol) |
| npm | 11.19.1 | 11.19.1 |
| OS | Linux x64 sandbox | Linux x64 sandbox |
| Registry | npmjs reachable, ~200 ms ping | same |
| Arms | **seven** (five re-run + two new) | five |
| Contract | v1-5f (spread included), vendored verbatim from pin `4ca9a071` | same |

Per-arm installs: the five round-1 arms were restored with `npm ci` against their **round-1 lockfiles** (identical dependency versions — a repair-and-rerun, not an upgrade). The two new arms installed fresh (`arm-next` 96 pkgs in 14.5 s; `arm-nuxt` 597 pkgs in 54 s). The five-arm `npm ci` ran in parallel; per-arm wall time was not logged (parallel jobs) — the per-arm *build* times below are individually timed.

## §2 — The metric table (mechanically produced)

LOC counted on two bases (both stated so nothing is hidden): **code** = ts/tsx/vue/svelte only, engine-contract excluded (the round-1 basis); **all-source** = code + css/html. Contract copies are byte-identical in all seven arms (hash-verified, `round2/reflow-report.json → contract_byte_identity`).

| Arm | Stack (installed) | Build | Build time | Type-check of arm code | Arm LOC (code) | LOC (all-src) | node_modules pkgs | Output bytes | `npm audit` |
|---|---|---|---|---|---|---|---|---|---|
| arm-svelte | svelte 5.57.3 + vite 8.3.8 (rolldown) | PASS | 0.67 s | svelte-check **0 err / 0 warn** | 233 / 5 f | 506 / 8 f | 50 | 89,600 (dist) | 2 low |
| arm-sveltekit | kit 2.70.4 + adapter-static 3 | PASS | 3.88 s | svelte-check **0 err / 0 warn** | 228 / 6 f | 250 / 8 f | 57 | 125,395 (build) | 7 low |
| arm-react | react 19.3.1 + vite 8.3.8 + tsc 7.0.2 | PASS | 0.82 s | `tsc -b` **clean** | 317 / 7 f | 448 / 10 f | 31 | 267,370 (dist) | **0** |
| arm-vue | vue 3.5.45 + vite 8.3.8 | PASS | 3.52 s | `vue-tsc -b` **clean** | 206 / 7 f | 237 / 9 f | 56 | 110,606 (dist) | **0** |
| arm-solidstart | @solidjs/start 1.5.1 + vinxi 0.5.11 | PASS | 9.58 s | transpile-only (no gate in build) | 265 / 5 f | 283 / 6 f | 445 | 174,631 (.vinxi/build) | 13 (1 **high**, h3 chain — see note) |
| **arm-next** (new) | next **16.4.6** (Turbopack) + react 19.3.1 | PASS — **full static export** (`output: 'export'` → `out/`) | 2.75 s | `tsc --noEmit` **clean** | 338 / 9 f | 456 / 11 f | 89 | 668,007 (out, 25 files) | **0** |
| **arm-nuxt** (new) | nuxt **4.6.4** + vue 3.5.45 | PASS — **static prerender** (`nuxt generate` → `.output/public`) | 3.36 s | `vue-tsc --noEmit` **clean** | 217 / 6 f | 217 / 6 f | 508 | 204,910 (14 files) | 10 (4 mod / 6 low, dev-chain) |

**Audit note (honest):** the one HIGH is `h3` inside SolidStart's Nitro serve layer (GHSA-wr4h-v87w-p3r7 et al., server-side path traversal/SSE injection). It is irrelevant to a static-export product but it is exactly the kind of server-shaped dependency the Owner's free-static architecture doesn't need — recorded, not adjudicated. arm-nuxt's 10 are dev-chain advisories in the Nuxt tooling tree. Both `npm audit` outputs ship in `logs/`.

**Meta-framework reality check (recorded in the results, not as a verdict):** Next.js's differentiators (file routing, RSC, caching) are deliberately unused by this one-screen prototype — the arm exercises only the shell, the static export, and the toolchain. Nuxt's are likewise unused (the prerender is the only meta-framework behavior the screen triggers). The two arms answer "what does the meta-framework COST on a product that cannot use its benefits": +59–478 packages, +1 advisor set, static export still achievable, build times in the same seconds class as the plain Vite arms.

## §3 — The engine contract (unchanged, re-verified)

- Vendored verbatim from pin `4ca9a071` (25 engine files + 4 core files). **Re-verified this wave by direct diff against a fresh extraction of the pin tarball: byte-identical** (`diff -r` exit 0). The ratchet (`tsc-baseline.json`, 69 pre-existing strict-mode errors in the vendored files; 0 in contract-owned files) unchanged.
- `FOCUSES` v1-5f (five focuses incl. `spread` with `halftimeEligible: false`) — the round-1 round-2 canonical change is inside the delivered contract.
- **Golden determinism re-verified:** `npm run golden` run twice in the canonical contract — byte-identical JSON (focusVersion `v1-5f`, 5 boards, 9 games).
- No sixth focus was created (standing order: none exists; none built).

## §4 — Round-2 reflow (sha256 manifests, this wave's binding protocol)

Full cycle, all seven arms, scripted (`scripts/round2_reflow.py`, shipped): **manifest before → resync (canonical contract copied into every arm's contract dir) → rebuild ×7 → manifest after → diff**.

| Check | Result |
|---|---|
| Arm-owned sha256 drift (before vs after), per arm | **ZERO × 7** (no arm-owned file changed) |
| Rebuilds after resync | **7/7 exit 0** (times in §2) |
| Contract copies after resync vs canonical | **7/7 IDENTICAL** (hash sets equal) |
| Leakage audit (engine-boundary rule: `Math.random`/`Date.now`/`new Date(`/`localStorage`/`sessionStorage`/`node:fs`/`require` in arm-owned code; deep imports into contract internals) | **0 findings** |
| DOM globals | only the 3 entry-point bootstrap mounts (`main.ts` ×2, `entry-client.tsx` ×1) — declared, expected, not leakage |

This closes INKLING's named reproach from round 1 (the /tmp before/after snapshots lost to tmp-pruning, reconstructed by mtime): this wave the manifests are sha256, computed on bytes, shipped as files (`round2/manifests/before-*.sha256`, `after-*.sha256`, 14 files), and the drift verdict is byte-proven, not mtime-proven.

## §5 — Repairs made on the five round-1 arms (declared, per the repair rule)

1. **arm-svelte tsconfig.app.json** — three additions: `skipLibCheck: true`, `moduleResolution: "bundler"`, `allowImportingTsExtensions: true`, plus `"exclude": ["src/engine-contract"]`. Symptom: TS6/node10 resolution failed on `esrap` self-imports inside svelte's own d.ts surface, and TS5097 on the vendored `.ts`-extension imports (72 errors). arm-sveltekit already carries all of these and passed — the repair aligns the sibling. Post-repair: **0 err / 0 warn**.
2. **arm-svelte node_modules** — one `npm ci` redo (the first parallel `npm ci` left a torn install; the redo was clean).
3. **arm-nuxt** (new-arm friction, recorded as protocol evidence): Nuxt 4's generated tsconfigs enable `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`, which flag the vendored files' 69 pinned errors **through the import closure — `exclude` alone cannot stop that** (imported files enter the program regardless). Fix: the arm's tsconfig sets the same strictness profile as arm-vue (strict on, the two extras off — the profile under which the vendored files compile clean), with the ratchet remaining the contract's own job. Also: `nuxt typecheck` sweeps five generated projects, so the arm's typecheck targets `.nuxt/tsconfig.app.json` directly.
4. **arm-next** (new-arm friction, recorded): `output: 'export'` works on Next 16 with Turbopack; two mechanical needs — `'use client'` on the stateful App, and `allowImportingTsExtensions` in tsconfig (the vendored contract's `.ts`-extension imports; the same flag arm-react carries). `next build` type-checks the whole program itself.
5. **arm-vue / arm-react / arm-sveltekit / arm-solidstart** — no repairs needed; rebuilt green from their round-1 lockfiles.

## §6 — The acceptance instrument (shipped, not executed here — unchanged from round 1)

`playwright/offensive-focus.spec.ts` — one spec, all arms, driven by the shared data-testids. Per-arm command lines (one command per arm; server started by the arm's own preview):

```
# from each arm root, in a second terminal start the arm's preview, then:
#   arm-svelte, arm-react, arm-vue:  npm run preview          (vite preview, :4173)
#   arm-sveltekit:                   npm run preview          (vite preview, :4173)
#   arm-solidstart:                  npm run preview          (nitro, :3000 — adjust baseURL)
#   arm-next:                        npm run build && npm run preview   (serve out/, :4173)
#   arm-nuxt:                        npm run generate && npm run preview (serve .output/public, :4173)
npx playwright test ../playwright/offensive-focus.spec.ts --config <arm playwright config>
```

Drop-in notes and baseURLs are in `playwright/PLAYWRIGHT-COMMANDS.md`. A red result would mean one of two things, named: (a) a **contract violation** (the arm shows a number the contract did not produce) or (b) an **arm-specific defect** (selector drift, state bug) — the spec distinguishes them by which assertion fails. Not executed in this sandbox (same D2 as round 1 — browser download outside budget); the static-HTML smoke check WAS executed: both new arms' prerendered `index.html` contains the full board markup with all shared data-testids (`setup`, `manage-toggle`, `auto-pick`, `board`, `kickoff`).

## §7 — Deviations (declared)

- **D1 (standing)** — single continuous session, not fresh-session-per-arm. Owner knows; the single-author confound is flagged for the Owner (round 1 code by me alone; round 2 also mine for these seven; INKLING's `arm-solid`/`arm-lit` from a different model restores partial symmetry when merged).
- **D2 (standing)** — Playwright spec shipped, not executed (browser download). Static-HTML smoke checks executed in its place this wave.
- **D3 (RESOLVED this wave)** — round 1's "Vue via Vite, not Nuxt" call is superseded: `arm-nuxt` exists now, alongside `arm-vue`. Both recorded.
- **D4 (standing)** — SvelteKit/SolidStart/Nuxt hand-scaffolded for reproducibility (no interactive CLIs); dependency sets match current stable templates.
- **D5 (new)** — Node 24.22.3 vs round-1's 24.22.2 (sandbox minor-patch drift). Same 24 line; exact versions logged per arm. No behavioral difference observed.
- **D6 (new)** — `arm-next` carries one devDependency (`serve`) the others lack: Next's static export has no built-in preview server for the Playwright drop-in. Cost: 2 packages. Recorded because the environment record is supposed to carry exactly this kind of asymmetry.

## §8 — No-verdicts section

The Owner ruled it: **the council runs the tests and presents the results; my data is definitive; the council evaluates it.** Everything above is the measured half. I built the arms, so I do not score the judgment half (correctness gate, modification, agent quality, integration, maintainability, UI, server-ready, tooling — the design's weights are the council's instrument). What the numbers say mechanically, without adjudication:

1. The seam held across seven idioms — zero engine logic outside the contract, zero leakage, zero drift under round 2.
2. All seven build green; all seven but SolidStart carry a real type-check gate in this environment.
3. The meta-frameworks' cost signature on a one-screen static product is install weight and audit surface, not build time.
4. Static export (the only honest shape for this product per the free-in-perpetuity ruling) works on all seven — Next 16 `output: 'export'` and Nuxt 4 `nuxt generate` included.

## §9 — What INKLING needs from me (and got)

- The seven arms + contract + manifests + logs + audit outputs + this filing, in one zip with sha256 CHECKSUMS on shipped bytes.
- `arm-solid` merges into this table after his wave lands; the merged eight-arm table goes to the council. My rows are judge-neutral and reproduction-ready: `npm ci`/`npm install` → `npm run build` per arm, same contract bytes.

## §10 — Files in this delivery

```
contract/                 the canonical engine-contract (v1-5f; PROVENANCE re-verified vs pin 4ca9a071)
arm-svelte/ … arm-nuxt/   the seven arms (arm-owned code + vendored contract copies; node_modules/build output excluded from the zip)
playwright/               the acceptance spec + PLAYWRIGHT-COMMANDS.md (per-arm lines)
round2/                   manifests (before/after ×7), reflow-report.json, leakage-audit.txt, per-arm build logs
results/                  this filing · metrics JSON · b4/d5/d8 result JSONs
logs/                     install + typecheck + round-1-build logs per arm
CHECKSUMS.txt             sha256 LABELLED, computed on shipped bytes, fresh-extraction verified
```
