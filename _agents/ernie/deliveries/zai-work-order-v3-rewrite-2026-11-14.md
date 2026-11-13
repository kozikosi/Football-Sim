# Z.ai — v3 work order (ERNIE redraft, 2026-11-14)

**Status:** ERNIE's proposed replacement for `_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md` (INKLING, `79c9b478`). It keeps INKLING's scope, bounds and arm ownership, and changes eight things — each one a measured defect in v2's instrument, not a style preference. Reasons are in `inbox/20261113-2210-ernie-TO-inkling-v3-order-critique.md`. The Owner issues; INKLING re-verifies.

---

**From:** KG (the Owner), relayed by INKLING. **To:** Z.ai. **Wave:** fwtest v3, 2026-11-14. **Supersedes:** v2's results filing, not v2's arms.

**Mission.** Re-run the nine-arm framework test from a cold start with the instrument fixed first and five things settled before a single claim enters the record. Arms are alive or dead **mechanically**; nobody declares a winner. INKLING re-verifies everything whose bytes survive.

**Read once, in this order:** (1) `council/inkling:_agents/inkling/prompts-2026-11-13/zai-work-order-2026-11-13.md`; (2) `council/inkling:_agents/inkling/notes/2026-11-12-independent-architecture-review-prompt-verbatim.md`; (3) your v2 delivery at `council/beam:zai-fwtest7-dynamic-engine-2026-11-13/` @ `a215b13b`.

## §0 — The instrument lands before the measurement

Do these five first. Each is a defect found by **running** v2, not by reading it.

**0.1 — The spec fix.** `fwtest-7/playwright/offensive-focus.spec.ts:23` is `await boardRows(page).count()` where `boardRows` is `async` (line 12). Result on every arm: test 1 throws `TypeError: boardRows(...).count is not a function` before its assertions, so the only test that asserts "Wins never move, Priority moves" has never completed. Ship it as:
```ts
const rows = await (await boardRows(page)).count();
```
(Filed independently by ERNIE and INKLING; four-seat convergence. The fixed file is at `council/ernie:_agents/ernie/deliveries/fwtest-spec-fix-2026-11-13/offensive-focus.spec.ts`.) Do not re-litigate; do not ship the bug.

**0.2 — A render assertion, in the spec, before anything else runs.** One test, first in the file:
```ts
test('the app mounts: #app has children after hydration', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('setup')).toBeVisible();
  const n = await page.evaluate(() =>
    document.querySelectorAll('#app,#root,[data-sveltekit]')?.[0]?.children.length ?? -1);
  expect(n).toBeGreaterThan(0);
});
```
v2 shipped an arm whose build exits 0, whose server listens, and whose page is **empty with no console error**. A render assertion is the cheapest gate that catches that class; it would have caught arm-solidstart in both deliveries.

**0.3 — A `file://` probe (the product's hard requirement, never tested).**
```
file:///…/<arm>/<build-dir>/index.html
pass  = #app has children AND clicking the manage toggle reveals ≥5 [data-testid^="focus-"]
         AND clicking a second focus changes [data-testid="priority-WR3"]
fail  = anything else; record the exact console error
```
For each arm name the build dir (`dist/`, `build/`, `out/`, `.output/public/`). If an arm cannot pass, write `BLOCKED — <reason>`; do **not** silently omit the row. Context you need: v2 measured **blank on svelte/react/vue** (`Access to CSS stylesheet … blocked by CORS policy`, origin `null`) and **static-only, non-interactive on sveltekit/next/nuxt** (32 rows render, module script blocked, clicking does nothing). And it is not a one-line config fix: adding `base: './'` to arm-svelte's `vite.config.ts` still yields a blank page from disk, because `file://` gives the page a `null` origin. A pass requires an inlined single-file build (e.g. `vite-plugin-singlefile`) or a non-module build. **If no arm attempts it, say so explicitly in the results filing** — "all nine need an http server" is itself the finding the Owner needs.

**0.4 — arm-solidstart: evidence packet, then fix or dead-letter.** Two seats have filed **different** root causes for this red. Settle it with the error text, not with a guess.
- ERNIE's evidence: `src/routes/index.tsx:3` = `import '../app.css';`, `src/entry-client.tsx` = `mount(() => <StartClient />, document.getElementById('app')!)`; dev server throws `Hydration Mismatch. Unable to find DOM nodes for hydration key: 00000000100000000 <style></style>` (Solid `getNextElement`); production shows **no error** and `{"bodyLen":1011,"testids":0,"hk":0}`. The route **is** compiled — `.output/server/chunks/build/_server.mjs` contains `Framework Test — Offensive Focus` and the route's `pregame` text — so "routes not found" is not supported; `src/routes/` is the SolidStart 1.x default and `app.config.ts` = `defineConfig({})` means defaults apply.
- INKLING's evidence: `app.config.ts` empty, `src/routes/` "not the convention path the default config expects", never mounts in dev or prod, 100 % reproducible.
- **Required receipt (either outcome):** the dev-server error text verbatim; `#app.children.length` before and after; `[data-hk]` count; the exact file(s) changed. If the arm is dead-lettered, the Owner accepts the elimination and the results file says `ELIMINATED AT ACCEPTANCE` with the receipts above.

**0.5 — CHECKSUMS verifies from a fresh extraction, or does not list what it did not ship.**
v2 listed `fwtest-7/arm-next/next-env.d.ts` and `fwtest-7/arm-next/tsconfig.tsbuildinfo`, both ignored by `arm-next/.gitignore` — so **no archive can contain them**, and the manifest failed for every seat: `shasum -a 256 -c CHECKSUMS.txt` → **537 OK, 2 FAILED**, while the file's own hash (`4f5cf86ed79d7082…`) matched what you reported. Ship one of these, and say which in the README:
- generated artifacts **committed** (both files, they are tiny), or
- generated artifacts **excluded from the manifest**, with a line: "build artifacts excluded; regenerated by `<command>`".
The delivery gate is: `git archive origin/council/<your-branch> v3/ | tar -x -C $S && cd $S/v3 && shasum -a 256 -c CHECKSUMS.txt` → **0 FAILED**. Not "verified on my desktop".

## §1 — The nine arms

| Arm | Stack | Builder | INKLING re-verifies | Notes |
|---|---|---|---|---|
| arm-svelte | Svelte 5 + Vite 8 | Z.ai | ✓ | keep your `tsconfig.app.json` repair, cite it as yours; add the `file://` probe. |
| arm-sveltekit | SvelteKit 2 + adapter-static | Z.ai | ✓ | `entries: false` OK; note it is static-only offline (0.3). |
| arm-react | React 19 + Vite 8 | Z.ai | ✓ | — |
| arm-next | Next 16 (Turbopack) + React 19 | Z.ai | ✓ | `output: 'export'`; `next-env.d.ts` in or out of the manifest (0.5). |
| arm-nuxt | Nuxt 4.6.4 | Z.ai | ✓ | acceptance target is `npm run generate` → `.output/public`; **declare that in the command table** (v2's "build passes" hid a false negative). |
| arm-solidstart | @solidjs/start + vinxi | Z.ai | ✓ | 0.4 — fix with receipts or dead-letter. |
| arm-vue | Vue 3.5 + Vite 8 | Z.ai | ✓ | — |
| arm-solid | SolidJS 1.9 + Vite 8 | INKLING | byte-identity + rebuild, never edit | `council/inkling:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-solid/` |
| arm-lit | Lit 3.3 + Vite 8 | INKLING | byte-identity + rebuild, never edit | same directory, `arm-lit/` |

Pin the fixture so a receipt is a check and not a claim: `engine-contract/fixtures/golden.json` sha256 = **`0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`** (measured by ERNIE on the v2 contract). Contract vendored from pin `4ca9a071`; prove with `diff -r`.

## §2 — The tests

1. **Contract:** byte-identical in all nine (41 files each; the standalone contract has 43 — `tools/golden.ts`, `tools/tsc-baseline.mjs` are **not** vendored in any arm, so say which tree the goldens run in).
2. **Leakage:** `Math.random` / `Date.now(` / `new Date(` / `localStorage` / `sessionStorage` / `fetch` / `require` / `node:fs` in arm-owned sources = 0. Entry-point mounts declared.
3. **Build:** `npm ci` + build exit 0, per arm, with Node and npm versions recorded.
4. **Type-check gate:** per arm, named (`svelte-check`, `tsc -b`, `vue-tsc`, `tsc --noEmit`, …). If an arm has none, write `NONE` — that absence is a finding (arm-solidstart shipped a blank page with `NONE`).
5. **Acceptance spec:** all nine, fixed spec, per-arm command line, and **the raw pass/fail line**. A red must be named as *contract violation* or *arm defect*.
6. **Render assertion:** 0.2, per arm, first.
7. **`file://` probe:** 0.3, per arm, with `BLOCKED` permitted and required when true.
8. **Modification test (changed from v2).** Adding another focus row is a **known tie at zero** — INKLING and ERNIE measured it independently (1 file, 10 lines, 0 arm-owned files on arm-svelte; same on arm-react). Do not re-run it for a third zero. Instead: **one shape change** — a focus that needs a second axis or a per-focus eligibility rule the UI must re-render on — and report **files touched / unrelated files touched / lines** by `diff -rq` against a pristine copy. If Z.ai judges that out of scope, say so and the column is dropped, not scored zero.
9. **Round-2 reflow:** before/after sha256 manifests ×9, drift verdict zero ×9, rebuild exits 0. (v2 did this properly; keep it.)

**Columns that cannot discriminate this fixture — report "no signal", not a number.** Measured on every arm that renders: 73 `data-testid`, 32 board rows, 5 focus buttons, 0 px overflow at 390×844, contract byte-identical, leakage 0. So: **UI quality & responsiveness (10%)**, **engine integration (10%)**, **correctness gate (20%, eliminates only)** and **modification (20%, unless §2.8 changes the fixture)** return no separation. Writing a number there manufactures a verdict.

## §3 — Per-arm receipt shape (exactly this, per arm)

```
arm-<id>
  cwd:        <path>
  bytes ref:  <branch> @ <sha>   (and CHECKSUMS result for that tree)
  env:        node <v> · npm <v> · <os>
  install:    <cmd> → exit <n>, <n> packages
  build:      <cmd> → exit <n>, <bytes out>, <seconds>
  typecheck:  <cmd> → exit <n>   (or NONE)
  spec:       <cmd> → <n>/5 passed, <seconds>
  render:     #app children = <n>
  file://:    PASS | BLOCKED — <reason>
  leakage:    <n> findings
  drift:      before == after (yes/no), files in manifest
  LOC:        code <n>/<f> · all-src <n>/<f>
  note:       one paragraph, your own words
```
Four lines minimum per claim: **cwd · exact command · ref+sha · output neighbourhood** (exit codes, counts, hashes). "Exit 0" alone is not a receipt.

## §4 — Delivery: a branch, not a zip

v2's zip sat on one seat's disk and four arms were un-auditable for a day. v3 either:
- pushes to **`council/zai`** (preferred), or
- names a receiving seat in the README and the receiving seat commits it verbatim.

The gate is verification **from the git archive**, never from the zip.

```
v3/
  README-DELIVERY-2026-11-14.md      # includes: node/npm, per-arm one-liner, what changed vs v2
  CHECKSUMS.txt                      # 0 FAILED from a fresh extraction (0.5)
  fwtest-9/
    contract/  arm-*/  playwright/   # spec v3 (0.1, 0.2)
    results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md
    round2/                          # manifests ×9, reflow-report.json, leakage-audit.txt
  logs/
  SELF-QUESTIONS.md
```
**One name, nine arms, no drift:** the results file is `FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md`.

## §5 — Bounds

No engine edits · no flex re-derives · no protected constants · no product file · no framework verdict, no ranking, no "winner" · no basketball code · no P-316/P-317 · no weight re-pinning · do not edit INKLING's two arms (file an addressed inbox entry instead).

**Replace v2's "any other information is scope creep" with:** *a finding that would change a verdict, an elimination, or a score must be filed, however small; anything that changes none of those stays out.* The small findings are how this council caught v2: the two unshippable manifest entries, the `npm run preview` that does not exist on arm-solidstart, the missing `tools/golden.ts` in every arm, and the `5deca930` lineage sha that resolves to no object in this repository.

## §6 — Self-questions (five that discriminate, then "unchanged" for the rest)

Answer these five in ≥1 line each with receipts:
1. Which arm fought the rebuild most — **framework, or environment**? Name the layer.
2. Which arm would you kill to ship, and is that an **acceptance-red** or a **design** call?
3. Which arm's README needed the most hand-holding, and at which line?
4. What would it take — from INKLING, the Owner, or the environment — to make arm-solidstart the arm it was meant to be?
5. Which arm would you take the §2.8 shape change into most cheaply, and why?

Then one line per remaining v2 question: `unchanged` or `updated: <what>`. Do not re-argue them.

## §7 — Done means one response containing

1. one zip **and** a branch (or a named receiving seat), with `CHECKSUMS.txt` verified from a fresh extraction — command, exit code, 0-failure line;
2. one `FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md`;
3. the §3 receipt for each of the nine arms, including `ELIMINATED AT ACCEPTANCE` for any dead letter;
4. the `file://` table for all nine, `BLOCKED` where true — this is the row the Owner will read first;
5. which arms you personally would not ship on, and why — as **odor, not verdict**. That paragraph is explicitly excluded from the no-verdict rule; the council reads it as experience, not evidence.

*Drafted by ERNIE (advisor) for INKLING and the Owner; the rulings quoted are the Owner's, relayed by INKLING; the measurements cited are ERNIE's own, at `council/beam` `a215b13b`, Node v26.13.0, 2026-11-13.*