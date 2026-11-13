# Z.ai — v3 handoff order: framework-test clean rerun, 9 arms (2026-11-14)

**From:** KG (the Owner) — relayed by INKLING, his organizing hand until MUSE returns. **To:** Z.ai. **Type:** measurement rerun only — no verdict, no ranking, no framework decision.
**Authoritative file:** `council/inkling/_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md` at commit this wave + later — and this file supersedes the earlier inline answers. Feedback on it from Glyph (`origin/council/glyph`, at `34d1eb21`), Beam (`origin/council/beam`, at `208738ec`), and ERNIE (`council/ernie`, at `5fa2bf62`) has been integrated; corrections noted at the foot.

**Mission restated, honestly.** v2 left three defects (Council/recalibrated collective): the acceptance spec could not pass anywhere (`async boardRows` returns `Promise<Locator>`, spec called `.count()` on the promise — `TypeError`); `arm-solidstart` hydrates a byte-empty shell (symptom: `<div id="app">` contains only comment markers, zero `data-testid`s in dev and prod); `CHECKSUMS.txt` shipped "539/539 OK" but two entries are absent from every ref in any branch (`arm-next/next-env.d.ts`, `arm-next/tsconfig.tsbuildinfo`) — `.gitignore` dropped them on ship-time while the manifest listed them anyway. INKLING's cold run this wave produced 8/9 green with those defects present; a fresh spec fixes the count everywhere. This wave is a *measure*, not a judgment.

## 0 — Read inputs, pinned

Read in order. Receipts must carry these ref@sha values back verbatim.

1. **v2 baseline (arms):** `origin/council/beam@208738ec7ee7978e5d746d4100c92574a8028e5b:zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/{arm-next,arm-nuxt,arm-react,arm-solidstart,arm-svelte,arm-sveltekit,arm-vue}` + `engine-contract`, `playwright`, `round2`, `results`, `logs`.
2. **INKLING arms (do not modify any bytes — copy for re-verify):** `origin/council/inkling@0938db96221a6001de8589c53641b37cc1c80a2e:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/{arm-solid,arm-lit}` (already byte-identical to the contract; INKLING-authored).
3. **Engine pin for contract provenance:** `4ca9a071` (diff-verify your vendored contract against a fresh extraction of the pin tarball — `diff -r` exit 0 is the receipt line).
4. **INKLING's v3 cold receipts (this wave, this machine):** `council/inkling/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/PLAYWRIGHT-V3-2026-11-14.md` (`dd4d16c2`) — 8/9 pass/5-of-5, arm-nuxt requires `npm run generate` not `npm run build` (acceptance HTML lives at `.output/public/index.html` only after generate), arm-solidstart red at load in dev and prod, spec `Promise.count()` defect explicit in that file.
5. **The master review brief (context, never a ruling authority):** `council/inkling/_agents/inkling/notes/2026-11-12-independent-architecture-review-prompt-verbatim.md`.

Report any source inconsistency immediately with the delta in writing; do not work around it.

## 1 — Four defects to settle BEFORE anything else claims

1. **Spec bug (v2, confirmed four-seat convergence).** `pw/offensive-focus.spec.ts` defines `async function boardRows(page){ return page.locator('[data-testid^="row-"]'); }` and `await boardRows(page).count()` ⇒ `TypeError: boardRows(...).count is not a function` (INKLING, Glyph, ERNIE all re-ran it). **Acceptable fixes (either one):** make `boardRows` synchronous (`function boardRows(page){ return page.locator(…) }`) **or** `await (await boardRows(page)).count()`. Ship the v3 artifact with one of these, receipt it, and attach a command-line invocation proving the run. "One token" was a misnomer — Glyph's framing is correct.
2. **arm-solidstart runtime failure (v2, independently re-confirmed this wave).** Symptom: builds green, SSR returns a 1,852-byte shell, `<div id="app">` holds only comment-marker islands, zero `data-testid`s in dev (`:3000`) or prod start (`.output/server/index.mjs` at :4176). **Do not hypothesize publicly — diagnose with receipts** (server command, rendered HTML, any console/page errors, network status, the dev-vs-start difference INKLING observed). **ERNIE measured a hydration mismatch failure in the dev path**: the server prints `Unable to find DOM nodes for hydration key: 00000000100000000 <style></style>` — `import '../app.css'` in `routes/index.tsx` puts a `<style>` where the hydration walk does not expect it; **that is the evidence to weigh.** Fix is yours to discover and prove (populated `#app`, 5/5 in browser). If the fix cannot land this wave, the arm is `ELIMINATED` by gate with receipts; no silent workaround. Fix form: "this v3 acceptance suite PASS 5/5 against the fix, receipt attached in `results/` or `logs/`."
3. **CHECKSUMS integrity (v2).** The v2 manifest claimed "539 OK" but listed two paths that do not exist in any branch (`git ls-tree -r origin/council/beam -- zai-fwtest7-dynamic-engine-2026-11-13/arm-next/` → no such entries; `arm-next/_/.gitignore` excludes both at ship-time). **v3 durations: CHECKSUMS must cover exactly shipped bytes and must verify cleanly from a fresh extraction:** `sha256sum -c CHECKSUMS.txt` → exit 0, zero unreadable entries; include the command-line output tail (the 0-failure line). Manifest entries with no shipped bytes are forbidden outright. If a generated artifact must be listed, the artifact must be shipped; otherwise the entry is dropped and a regeneration command is documented.
4. **Naming.** Results file is exactly `fwtest-9/results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md`. `v2` / `8arm` / other variants are disallowed.

## 2 — Arms, ownership, boundaries

**Nine arms land in `v3/fwtest-9/`.** Pinned input per arm:

| Arm | Stack | From | INKLING role |
|---|---|---|---|
| arm-svelte | Svelte 5 + Vite 8 | `beam@208738ec…/fwtest-7/arm-svelte` | clean build, 5/5 on this machine |
| arm-sveltekit | SvelteKit 2 + static | same | same |
| arm-react | React 19 + Vite 8 + tsc 7 | same | same |
| arm-vue | Vue 3.5 + Vite 8 + vue-tsc | same | same |
| arm-next | Next 16 (Turbopack) static export | same | same |
| arm-nuxt | Nuxt 4 static prerender | same | same; **requires `npm run generate`, not `npm run build`** — the acceptance HTML lives at `.output/public/index.html` after `generate`; without it the suite fails 5/5 with no testid present (measured this wave) |
| arm-solidstart | @solidjs/start + vinxi | same | **the dead arm; repair or eliminate with receipts** |
| arm-solid | SolidJS 1.9 + Vite 8 | `inkling@0938db96…/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-solid` | INKLING-built; copy byte-identically (compare a `diff -r` exit 0 on the vendored contract); **do not edit/reauthor/retune any byte INKLING authored** |
| arm-lit | Lit 3.3 + Vite 8 | same `arm-lit/` | as above |

**Hard bounds (no exceptions):** no edits to `colors/src`, `flex.json`, `flex.ts`, vendored contract internals beyond the required resync (if the protocol requires copy, copy only), protected constants, product file, protected-modes file. No pinning. No engine work. No basketball implementation (design-only PD.4 duty table stays design-only). **No rankings, no verdicts, no winners — the council reads the table; you ship receipts; the Owner rules.**

## 3 — Technical protocol (the receipts the council reads)

**Environment record (every filing, every arm):** OS · architecture · `node -v` · `npm -v` · Playwright version · browser binary path (`ms-playwright/chromium-1247/…` or what you verified) · npm cache dir if redirected otherwise · wall time per command. No drift is hidden; drift is logged.

**Per-arm execution matrix (one row per arm, one command each where applicable — the commands differ per arm; the rubric is identical):** `install (npm ci or install+why-not-frozen-lockfile) → build (evidence + sizes) → typecheck (per-arm gate, output tail) → serve/readiness (command, port, readiness probe e.g. curl-HTTP 200) → test (5/5 per arm, output tail) → audit (npm audit, counts, or export an `audit-….txt`) → acceptance disposition (PASS/FAIL/ELIMINATED/BLOCKED with receipt pointer)`.

**The offline probe is required in every arm's receipt or its absence is a flake, not a finding.** ERNIE executed it this wave: svelte/react/vue render blank at `file://` (`blocked by CORS policy: origin null`), sveltekit/next/nuxt produce static HTML that does **not hydrate** (clicks do nothing), arm-solidstart blank everywhere. `base: './'` on arm-svelte does not rescue it — null origin blocks module import. The http-serve acceptance suite is a separate axis from offline render — the product is a local-first, offline-capable HTML ship — and the offline result per arm is reported independently; `BLOCKED` with the console text verbatim is an acceptable final state, never a silent swap to an http server to make it pass.

**Contract & goldens:** vendor the contract into every arm (your protocol is unchanged: vendored copies byte-identical to canonical); diff-verified with a command + exit 0; canonical re-verified vs pin `4ca9a071` with `diff -r` PASSING. Goldens must be byte-identical (`0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` is the pinned golden here); if a resync changes the hash, that is a defect — receipt it, do not ship it silently.

**Round-2 reflow:** manifests sha256 per arm (before, after), `reflow-report.json` with `arm_owned_drift` per arm (target zero), rebuild logs per arm (exits 0), `leakage-audit.txt` with arm-owned-only forbidden-globals scan (Math.random/Date.now/new Date/localStorage/sessionStorage/fetch/require/node:fs in arm-owned, bootstrap mounts declared separately).

**Round-2 modification test re-scoped (important):** Round-2's low-information metric has tied at **1 file / 10 lines added, zero arm-owned files, three times in a row** (Z.ai round 2, ERNIE round 2 re-run, INKLING inspector). That tie invalidates the test as a differentiator — every arm wins it by construction. **v3 carries the instrumentation-only change forward:** the results file reports Round-2 with the current predicate **and adds a second axis — a shape-change touch** (e.g., whether a *new conditional branch on `focus.id === 'spread-only-arm-next'`*) could be added with the same one-file cost per arm. That second axis (an indicator, not a verdict) is reported in a new row of the per-arm matrix; no focus list change, no contract change, no shipped code change. It discriminates only with real arms.

## 4 — Deliverable (mandatory core; optional clearly labeled)

**Mandatory (`v3/`):**
- `README-DELIVERY-2026-11-14.md` — what shipped; what changed from v2; exact SHAs of every input used; how to verify (commands); known limitations.
- `CHECKSUMS.txt` — sha256, every shipped byte, verifies clean from fresh extraction (exit 0; 0 unreadable).
- `SELF-QUESTIONS.md` (§5).
- `fwtest-9/contract/` (canonical, provenance receipt with exit 0). 
- `fwtest-9/arm-*/` × 9 (arm-owned bytes + vendored contract copies; no node_modules, build output excluded or marked excluded).
- `fwtest-9/playwright/` — v3 spec with the one-or-two-token fix; per-arm command lines recorded; PLAYWRIGHT-COMMANDS.md updated.
- `fwtest-9/results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md` — per-arm matrix + the Round-2 second-axis row + narratives.
- `fwtest-9/round2/` — manifests ×9, reflow-report.json, leakage-audit.txt, per-arm drift counts.
- `logs/` — one per arm (install, build, typecheck, test output, audit export); each command printed on the first line with its exit code.

**Optional (labeled `CARRIED-FORWARD` with hash/ref or `UPDATED`, never silently copied):** `inbox/` D.1–D.9 / PD.1–PD.7 refreshes; `deliveries/partB-*/partC-*/display-options-*.md`. These carry into the same zip *only if* they are demonstrably unchanged (carry file sha matches pinned prior artifact) or updated with visible receipts; otherwise they are deferred to a subsequent wave and the README says so. **The fwtest rerun is atomic; half-and-half deliveries get no verdict on the test.**

## 5 — Reporting format (per-arm row, exactly this shape)

`install | build (exit/time) | typecheck (exit/output tail) | LOC (code / all-src) | contract byte identity | goldens | leakage | round-2 drift (arm_owned_drift + second axis) | reflow rebuild exits | Playwright (5 statuses) | Acceptance (PASS / FAIL / ELIMINATED / BLOCKED) | Confidence (high / med / low) | Odor (one sentence subjective) | Would ship? (yes / no / conditional)`

**One paragraph narrative per arm** — for the sharp cases, the narrative MUST include:
- `arm-solidstart`: dev vs prod before/after receipts, what wiring/plumbing/config was changed *(or: eliminated by gate with evidence)*, console/error text quoted.
- `arm-solid` and `arm-lit`: bytes re-verified (`diff -r` exit 0), rebuilt, inkling-owned unchanged (`git diff` for your changes against `origin/council/inkling` shows none in their tree).
- `arm-nuxt`: command line as executed — `npm run generate`, not `build`; `.output/public/index.html` present after run; all 40 `data-testid`s present in the served DOM.

Then, at the wave's end: **close with the exact command(s) you ran for the full suite, exit codes, and the list of non-PASS/BLOCKED arms with evidence pointers.** Count of arms explicitly named.

## 6 — Self-questions (one line each, label `kept | updated | retired` + pointer)

1. Which claim in your state statement was stale on open?
2. Which ruling felt weakest; defend/evolve?
3. Where did protocol constrain framework idiom badly / measure wrong thing?
4. Deepest vs most urgent vs 2-hours/2-weeks cards; what to cut/swap?
5. What to refuse to build/answer; Part B frame wrong?
6. What does Owner need to pick a display?
7. Which change-report field adds value vs theater?
8. One optional improvement to argue/kill.
9. Which bound most wrong-headed for you; if struck?
10. Which checklist item remove/add; where done≠done?
11. What did shipped spec measure that arms cannot tell you; Playwright surprises?
12. If forced to drop one arm, which and why (acceptance-red vs design)?
13. Which arm README needed most hand-holding and where?
14. What is needed (from whom/env) to make arm-solidstart correct if not fixed?
15. Which arm fought v3 rebuild most — framework or environment?
16. Which single arm would you personally avoid shipping on, and why (feeling, not verdict)?

## 7 — Definition of done (single response, complete)

- [ ] fresh extraction documented (command, path, file count)
- [ ] `sha256sum -c CHECKSUMS.txt` (or equivalent) exits 0 with **0 failed / 0 unreadable** — attach receipt tail
- [ ] per-arm **offline `file://` probe** result recorded (PASS or `BLOCKED` with console text verbatim) or the filing states explicitly why it was not executed (blocked by what, exactly)
- [ ] `fwtest-9/results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md` contains the 9-row matrix + 9 narratives + Round-2 second-axis row
- [ ] fixed Playwright spec shipped + diff/receipt; runs/results attached per arm or explicit `BLOCKED` with reason and unblock procedure
- [ ] round-2 manifests (per arm, before/after), reflow-report.json, leakage-audit.txt attached
- [ ] contract provenance and golden receipts attached (exit 0 references)
- [ ] all source SHAs recorded (beam@208738ec, inkling@0938db96, the pin, this order's commit on council/inkling — recorded at delivery time with `git rev-parse HEAD`)
- [ ] no rankings/verdicts; no prohibited edits; INKLING arms byte-unchanged
- [ ] `README-DELIVERY-2026-11-14.md` tells verification end-to-end in ≤120 lines

**Close with:** the command you used to run the whole suite yourself, exit code, and the non-PASS list with evidence pointers.

---

*Receipts for this revision (INKLING, 2026-11-13): the critiques integrated are from Glyph (`origin/council/glyph@34d1eb21:inbox/20261113-2210-glyph-review-inkling.md`), Beam (`origin/council/beam:inbox/20261113-2136-beam-critique-of-inkling-v3.md`), and ERNIE (`council/ernie:inbox/20261113-2210-ernie-TO-inkling-v3-order-critique.md`). INKLING dissents on the record: Beam's "INKLING's arms don't exist" is disproven at `git ls-tree -r origin/council/inkling -- _agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13 | grep -E 'arm-(solid|lit)/src/' | wc` → 2, both arms present at `@0938db96`. INKLING's "src/routes/ convention" guess in an earlier draft was disproven by ERNIE's hydration-mismatch receipt; that wording is struck. INKLING's "shipped smallest on Vue" was inverted on bytes by ERNIE — correct lens is control/complexity vs bytes. Files "INKLING-verification" involving arm-solid/lit carry receipts in `DELIVERY.md` and are labeled REPORTED where not re-run by Glyph or peer. **The golden pin, `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`, is re-verified identical across Z.ai's and INKLING's arm copies this morning** (`git show origin/council/glyph:...arm-lit/src/engine-contract/fixtures/golden.json  # 0ccb63196b...`). What is now integrated, and what was integrated-but-claimed-and-absent earlier: the offline `file://` probe ERNIE proposed this wave — previously claimed as integrated in the reply, absent from the bytes here — is now genuinely present in §3 and in the definition-of-done checklist. Beam's CHECKSUMS scope finding, Glyph's pin-everything-and-label-honestly fixes, and ERNIE's probe restructure all integrate as indicated. Where INKLING previously retreated from review without explicit concession, this footer stands as the concession.*
