SPEAKER: ERNIE | ROLE: council advisor | TASK: Playwright review + ranking of the seven arms (asked for by the Owner) | DATE: 2026-11-13T21:55Z
FOR: fwtest-9 evaluation · Owner
REVIEW-OF: `origin/council/beam` `a215b13b`, `zai-fwtest7-dynamic-engine-2026-11-13/`

# Seven arms, one spec, measured. Ranked below — with the column that nobody tested.

**Bytes:** `git archive origin/council/beam … | tar -x -C /var/folders/.../kilo/fwtest7` @ `a215b13b`. **Machine:** Node v26.13.0, Playwright 1.64.1 (chromium). **Spec:** Z.ai's shipped `playwright/offensive-focus.spec.ts` **with my one-line fix** (`await (await boardRows(page)).count()`) — the shipped file cannot pass on any arm (their line 23), so every number below is the fixed instrument. The fix is at `_agents/ernie/deliveries/fwtest-spec-fix-2026-11-13/offensive-focus.spec.ts`.

## 1. The matrix

| arm | spec | build exit | type-check gate in build | 390 px overflow | install (top-level pkgs) | build output | my build time |
|---|---|---|---|---|---|---|---|
| arm-svelte | **5/5** | 0 | yes (`svelte-check`) | **0 px** | 41 | **100 KB** | 0.09 s |
| arm-vue | **5/5** | 0 | yes (`vue-tsc -b`) | **0 px** | 37 | 124 KB | 0.38 s |
| arm-react | **5/5** | 0 | yes (`tsc -b`) | **0 px** | **26** | 272 KB | 0.28 s |
| arm-sveltekit | **5/5** | 0 | yes (`svelte-check`) | **0 px** | 45 | 164 KB | 1.67 s |
| arm-nuxt | **5/5** | 0 | yes (`vue-tsc`) | **0 px** | 428 | 236 KB | 3.4 s |
| arm-next | **5/5** | 0 | yes (`tsc --noEmit`) | **0 px** | 83 | **708 KB** | 2.8 s |
| arm-solidstart | **0/5** | 0 | **no** (transpile-only) | n/a (renders nothing) | 382 | 188 KB | 1.0 s |

Commands: `npm ci --no-audit --no-fund` · `npm run build` (or `nuxt generate`) · `npm run preview` (or `npm run start` for solidstart; `serve out` / `serve .output/public` for next/nuxt) · `BASE_URL=… npx playwright test`. Full spec: `inbox/20261113-2130-ernie-REVIEW-zai-fwtest7.md`.

## 2. The column nobody tested: offline (`file://`), and all seven fail it

The product's hard requirement is offline ("tent-in-the-woods"), and the shipped product is **one self-contained HTML file**. The framework test never opened a build from disk. I did:

| arm | over `file://` | what happens |
|---|---|---|
| arm-svelte | **blank** | `Access to CSS stylesheet at 'file:///assets/…' … blocked by CORS policy` (origin `null`) |
| arm-react | **blank** | same |
| arm-vue | **blank** | same |
| arm-sveltekit | static HTML only | 69 testids / 32 rows render; `Access to script … blocked` → **not interactive** (click does nothing) |
| arm-next | static HTML only | same: renders, **not interactive** (2 × `ERR_FILE_NOT_FOUND`) |
| arm-nuxt | static HTML only | same: renders, **not interactive** |
| arm-solidstart | **blank** | blank even over http (see §4) |

**And it is not a one-line fix.** I tested the obvious repair: added `base: './'` to arm-svelte's `vite.config.ts`, rebuilt (exit 0, assets now `./assets/…`), and opened `dist/index.html` from disk — **still blank**, same CORS error. Relative paths are not enough: `file://` gives the page a `null` origin, and Chrome blocks module scripts and stylesheets from it. Offline therefore requires a real **single-file / inlined build** (the thing the product already does), not a config tweak. Every arm is on the wrong side of that line, and the "server-ready architecture" column as written rewards exactly the arms that need a server.

**Unblock (one experiment, ~1 hour, decides this axis):** add `vite-plugin-singlefile` to one arm (svelte is the cheapest), rebuild, and re-run the `file://` probe. If it renders *and* hydrates, the axis becomes a per-framework build-mode question; if not, the product needs its own bundling step regardless of framework, and the framework choice should be made on the other columns.

## 3. Columns that produced no signal (state this in the memo, or it will score noise)

- **UI quality & responsiveness (10%):** every arm renders the **same markup from the same CSS fixture** — 73 `data-testid`, 32 board rows, 5 focus buttons, **0 px** overflow at 390×844 for all six that render. Nothing to separate. This column cannot discriminate this fixture.
- **Engine integration (10%):** the contract is byte-identical in all seven (41 files, tree `265ea8c6c509200b`) and leakage is 0 in all seven. Also no signal.
- **Correctness gate (20%):** six arms pass 5/5; one fails. The gate eliminates, it does not rank.
- **Second-round modification (20%):** I ran it in Part A — adding a sixth focus from data alone touched **1 file / 10 lines / 0 arm-owned files** on svelte and react. **Tie at zero.** The fixture needs a harder case (a new *shape*, or a per-focus eligibility rule the UI must re-render on) before this column measures anything.

So of the eight weighted columns, **four (50%) return no discrimination on this fixture**. A digest that scores all eight will publish four columns of noise.

## 4. arm-solidstart is eliminated, and the reason is structural

`npm run build` → exit 0 (`[vinxi] ✔ Nitro Server built`); `npm run start` → listening; production probe → `{"bodyLen":1011,"testids":0,"hk":0}` with **0 console errors**; dev names it: `Hydration Mismatch. Unable to find DOM nodes for hydration key: 00000000100000000 <style></style>`, from `import '../app.css'` in `src/routes/index.tsx`. It fails **silently in production** and is the only arm with no type-check gate in its build — which is precisely how a blank page ships as "PASS" in Z.ai's table. It also has no `preview` script, though `PLAYWRIGHT-COMMANDS.md` tells you to run `npm run preview`, and carries 13 advisories (1 high: `h3`/Nitro).

**Protocol consequence:** the suite needs one render assertion (`#app` has children after hydration) and one type-check gate per arm. Together they would have caught this in both deliveries, and they cost one line each.

## 5. My ranking

Stated rubric: correctness gate first (elimination), then the columns that actually discriminate — install weight, output size, build time, presence of a type-check gate, tooling uniformity — with offline reported as a **class failure, not a ranking axis** (all seven tie at "does not meet the requirement").

1. **arm-svelte** — 5/5 · 41 pkgs · **100 KB** · 0.09 s · typecheck · uniform preview. Cheapest on every measured axis, nothing outstanding except the shared offline gap.
2. **arm-vue** — 5/5 · 37 pkgs · 124 KB · 0.38 s · typecheck. Same shape, marginally heavier artifact.
3. **arm-react** — 5/5 · **fewest packages (26)** · 272 KB · 0.28 s · typecheck. The runtime costs ~2.7× svelte's shipped JS for the same screen.
4. **arm-sveltekit** — 5/5 · 45 pkgs · 164 KB · typecheck. Adds a routing/adapter/SSR layer the product does not need; the prerender is the one thing it does better than the Vite trio offline (static HTML), but it still does not hydrate.
5. **arm-nuxt** — 5/5 · typecheck clean · but **428 top-level modules**, 236 KB, absolute `/_nuxt/` paths baked into the build, and a five-project `typecheck` sweep that had to be narrowed to make it pass.
6. **arm-next** — 5/5 · typecheck clean · static export genuinely works (`out/`, 3 pages) — but **708 KB of output, 7× svelte**, for one screen, plus `serve` added as a devDependency to preview it at all.
7. **arm-solidstart** — **eliminated**: 0/5, renders nothing, no build-time typecheck, no preview script, 382 modules, 1 high advisory.

**Two reasons to choose differently** (for the memo):
- **If the bar is "runnable this week over http://"**, my ranking is a *cost* ranking, not a *risk* ranking: Next and Nuxt are the most documented and best-hired-for, and React has the largest ecosystem. Those are real arguments that this measurement set cannot see.
- **If the product must be one HTML file** (the evidence in §2 says it must), then all seven **tie at zero** on the axis that matters most, and the decision should be made on which framework has the cleanest path to an inlined single file — which I did not measure, because none of them has one yet.

**Not checked:** the two absent arms (`arm-solid`, `arm-lit` — in no branch), `arm-sveltekit`/`react`/`vue` behaviour in Part A vs v2 byte-equality of arm-owned code (I re-ran all seven in this pass, so the table is one pass, but I did not diff arm-owned files between the two deliveries), and Firefox/Safari `file://` (Chrome only).

— ERNIE · `a215b13b` · Node 26.13.0 · 2026-11-13T21:55Z