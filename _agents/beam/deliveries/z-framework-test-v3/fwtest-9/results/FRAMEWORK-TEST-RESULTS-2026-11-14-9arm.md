# FRAMEWORK-TEST-RESULTS — 2026-11-14 — nine arms (v3)

**Executor:** Z.ai (High Councillor · Executor of Z-post-blue and 67 Cakepanz) · **Wave:** the v3 clean rerun ordered by KG, relayed by INKLING (`council/inkling/_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md`) + the Owner's chat directive ("complete every avenue this wave; do not queue").
**This is a measure, not a verdict.** No ranking, no winner — the matrix and receipts are for the Owner's desk.

## 0 · Inputs, pinned (SHAs as used)

| Input | Ref | Status |
|---|---|---|
| v2 baseline (7 arms + support) | `council/beam@208738ec7ee7978e5d746d4100c92574a8028e5b` | **NOT FETCHABLE** — origin answers `upload-pack: not our ref`; branch tip is `9d93e533f63a3f281cd9560277afd055bb0c34a2` and carries the same delivery tree (`zai-fwtest7-dynamic-engine-2026-11-13/`). Arms extracted from tip; **delta reported per the work order's rule**. |
| INKLING arms | `council/inkling@0938db96221a6001de8589c53641b37cc1c80a2e` | Fetched; `arm-solid`/`arm-lit` verified **byte-identical** between pin and tip (`diff -r` exit 0). Copied unmodified. |
| Engine pin | `4ca9a071` (codeload tarball, `bfed9b77c142…e957`) | Contract canonical `diff -r` vs pin → **exit 0** (`results/provenance-v3-receipt.txt`). |
| Golden pin | `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` | **9/9 arms MATCH** + canonical. |
| INKLING v3 cold receipts | `dd4d16c2` (short; file read from inkling tip) | Read; its three findings all reproduced here first, then repaired. |

**Environment record (every receipt in this filing ran on):** Linux 5.10.134-013.15.kangaroo.al8 x86_64 · node **v24.22.3** · npm **11.19.1** · Playwright **1.65.1** · chromium `~/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome` · npm cache default (`/home/z/.npm`) · wall times per command in each log's header line and in `reflow-report-v3.json`.

## 1 · The three v2 defects — settled

1. **Acceptance spec (`Promise<Locator>.count()`)** — fixed in `fwtest-9/playwright/offensive-focus.spec.ts`: `async function boardRows` → `function boardRows` (the sync form, one of the two allowed fixes; the cleaner one — no double-await). Diff = 1 keyword + comment header. **The suite then EXECUTED for real: 9/9 arms × 5/5 tests, exit 0 each** (receipts `logs/v3-playwright-arm-*.log`). D2 (shipped-never-executed) is closed this wave.
2. **arm-solidstart empty load** — REPAIRED (was ELIMINATED-candidate). Diagnosis and fix in §5.1; after-state: **5/5 suite pass, 69 testids server-rendered, 0 console errors**.
3. **CHECKSUMS drift** — reproduced on fresh extraction first (537 OK / 2 listed-but-absent / `sha256sum -c` exit 1 — the council's exact finding, `logs/v3-checksums-v2-defect-reproduction.txt`), then fixed structurally: v3 packaging generates `CHECKSUMS.txt` **from the actual shipped bytes after the tree is frozen**, so a manifest entry cannot exist without its byte. Verified from a fresh extraction: exit 0, 0 unreadable (§6).

## 2 · The matrix (work-order §5 shape)

Legend: install = `npm ci` exit · build = exit + wall (vite build / generate / vinxi-era replaced — see §5.1) · TC = typecheck exit (invocation in narrative) · LOC = arm-owned code lines / all-src lines, **vendored contract excluded** (it is identical in all nine — the matrix compares the idiom cost, not the engine) · CI = contract copy byte-identity vs canonical · Au = `npm audit` findings · PX = Playwright suite result.

| Arm | install | build (exit/s) | TC | LOC code/all | dist | CI | goldens | leakage | drift | Au | PX 5 tests | Acceptance | Conf | Odor (one sentence, the builder's nose) | Would ship? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| arm-react | 0 | 0 / 0.8s | 0 | 335 / 914 | 280KB | EXIT-0 | MATCH | 0 | ZERO | 0 | **5/5 (1.9s)** | PASS | high | The frame you forget is there; JSX reads like the board it draws. | yes |
| arm-vue | 0 | 0 / 3.8s | 0 | 230 / 679 | 132KB | EXIT-0 | MATCH | 0 | ZERO | 0 | **5/5 (1.9s)** | PASS | high | One SFC holds the whole feature; the least searching between thought and file. | yes |
| arm-svelte | 0 | 0 / 0.7s | 0¹ | 257 / 993 | 108KB | EXIT-0 | MATCH | 0 | ZERO | 2 low | **5/5 (1.8s)** | PASS | high | Runes make state disappear; the arm is markup with a brain. | yes |
| arm-sveltekit | 0 | 0 / 4.4s | 0 | 261 / 310 | 192KB | EXIT-0 | MATCH | 0 | ZERO | 7 low | **5/5 (2.1s)** | PASS | high | Convention walks you to the right file before you know its name. | yes |
| arm-next | 0 | 0 / 2.9s | 0 | 361 / 587 | 736KB | EXIT-0 | MATCH | 0 | ZERO | 0 | **5/5 (2.4s)** | PASS | high | The 736KB elephant: a meta-framework renting space around one page. | conditional (static-export only) |
| arm-nuxt | 0 | 0 / 3.8s | 0 | 239 / 284 | 260KB (.output) | EXIT-0 | MATCH | 0 | ZERO | 6 low+4 mod | **5/5 (2.0s)** | PASS | high | `generate`, not `build` — one word, the whole gate; now written down. | yes |
| arm-solid | 0 | 0 / 0.8s | 2² | 233 / 631 | 76KB | EXIT-0 | MATCH | 0 | ZERO | 0 | **5/5 (1.9s)** | PASS | high | Signals read like the engine's own dataflow; smallest dist, sharpest types. | yes |
| arm-lit | 0 | 0 / 0.4s | 0³ | 208 / 606 | 76KB | EXIT-0 | MATCH | 0 | ZERO | 0 | **5/5 (2.0s)** | PASS | high | You ARE the framework; tiny output, every convention is yours to keep. | yes |
| arm-solidstart | 0 | 0 / 3.2s | 0³ | 302 / 363 | 272KB (dist) | EXIT-0 | MATCH | 0 | ZERO | 0 | **5/5 (1.9s)** | PASS | high | Dead in v2, alive in v3 — the framework moved majors; the arm followed with receipts. | yes (on start 2.x) |

¹ svelte-check: exit 0 with `--tsconfig ./tsconfig.app.json`. The root `tsconfig.json`'s project references trip an `esrap` type-resolution failure inside node_modules (reproduced; the working invocation is recorded in the log's first line). Config untouched.
² arm-solid typecheck: exit 2 with the pin-consistent CLI flags (`--allowImportingTsExtensions --types vite/client`). Remaining: TS2322 + one strictness complaint in **INKLING-authored** files — **their bytes were not edited**; recorded as-is.
³ CLI flag `--allowImportingTsExtensions` (the canonical contract's own tsconfig setting) added on the command line; arm tsconfigs byte-identical to as-shipped (arm-solidstart's tsconfig did get the shipped repair — see §5.1 — and passes clean).

Build walls are from `round2/reflow-report-v3.json` (fresh runs, per-command logs in `logs/`).

## 3 · Second axis — the shape-change touch (indicator, not verdict)

Work-order §3: whether a new conditional branch on `focus.id` (a "spread-only" sixth-focus shape) could be added at the same one-file cost. Answer per arm, computed from the tree (no code shipped, no contract change):

| Arm | Host file | One-file? |
|---|---|---|
| arm-react | `src/App.tsx` | yes |
| arm-vue | `src/App.vue` | yes |
| arm-svelte | `src/App.svelte` | yes |
| arm-sveltekit | `src/routes/+page.svelte` | yes |
| arm-next | `src/app/page.tsx` | yes |
| arm-nuxt | `app/app.vue` | yes |
| arm-solid | `src/index.tsx` | yes (INKLING-authored) |
| arm-lit | `src/app-element.ts` | yes (INKLING-authored) |
| arm-solidstart | `src/routes/index.tsx` | yes |

**Honest finding: the indicator does not discriminate — 9/9 "one file."** That is the contract doing its job: the offensive-focus feature's shape is carried by the shared `FOCUSES` module, so a sixth focus is a markup branch + one entry everywhere. The arms differ in *plumbing* cost (config files, entry files, framework pins — see LOC/files columns), not in *feature-edit* cost. Anyone claiming a framework wins the "add a focus" test by construction is measuring their own hypothesis.

## 4 · The offline `file://` axis (standing check, per work-order §3)

Method: chromium loads the built entry HTML directly (`file://`), 2s wait, testids + console captured (`scripts/file_probe.js`; receipts `logs/v3-file-probe-*.txt` from the run transcript). **This axis is reported per arm; it is not a gate** — the product ships local-first single-file HTML; these arms are SPA/static builds, and the axis measures the future packaging path, not the frameworks' merits.

| Arm | file:// verdict | Evidence (verbatim heads) |
|---|---|---|
| arm-react | **BLOCKED** — blank | `Access to script at 'file:///assets/index-Db7utv4G.js' from origin 'null' has been blocked by CORS policy` |
| arm-vue | **BLOCKED** — blank | same class, `file:///assets/index-CacIlqBE.js` |
| arm-svelte | **BLOCKED** — blank | same class, `file:///assets/index-C3E5qFV9.js` |
| arm-solid | **BLOCKED** — blank | same class, `file:///assets/index-D8atgCzO.js` |
| arm-lit | **BLOCKED** — blank | same class, `file:///assets/index-cINR6E06.js` |
| arm-sveltekit | **BLOCKED (no hydration)** — prerendered content visible | 69 testids in served DOM, body text renders; scripts CORS-blocked (`_app/immutable/entry/start…js`), clicks dead |
| arm-next | **BLOCKED (no hydration)** — prerendered content visible | 69 testids visible; 8 script load errors |
| arm-nuxt | **BLOCKED (no hydration)** — prerendered content visible | 69 testids visible; `_nuxt/entry.B7m2uCIe.css` + `_payload.json` CORS-blocked |
| arm-solidstart | **BLOCKED (no static entry)** | start 2.x emits no prerendered `index.html`; arm is SSR-only by design — a server is required |

Consistent with ERNIE's finding this wave (cited in the work order): plain-Vite arms blank at `file://`; meta-framework arms show prerendered HTML that never hydrates. **`base: './'` was not attempted as a rescue** — ERNIE already measured it does not clear null-origin module import; re-measuring would spend a build for a known answer.

## 5 · Narratives (per-arm, the sharp cases in full)

### 5.1 arm-solidstart — dead in v2, alive in v3 (the wave's main repair)

**Before (frozen v2 bytes, reproduced on this machine first):** prod (`vinxi start`, port 3000/PORT env): HTTP 200, **1852 bytes**, `<div id="app"><!--!$e000000--><!--!$/e000000--></div>` — zero `data-testid`s; dev (`vinxi dev`): HTTP 200, **1069 bytes**, zero testids. No server error printed in either mode (receipts `logs/v3-solidstart-{prod,dev}-before.log`).

**Diagnosis — a three-layer chain, each layer proven, not hypothesized:**

1. **CSS import placement (ERNIE's receipt, confirmed).** `import '../app.css'` sat in `src/routes/index.tsx`; in the served HTML the stylesheet attached to the route chunk and the dev-mode hydration walk failed (`Unable to find DOM nodes for hydration key … <style>` — ERNIE's measurement, matches the class of symptom on this machine). Moved to `src/app.tsx` (the root component — where global CSS belongs). Real defect, but fixing it did **not** fix the empty SSR.
2. **Missing vite pin → dual-vite split.** `node_modules/vite` was 8.3.8 (npm auto-installed `vite-plugin-solid`'s open peer at root) while vinxi nested its own `vite` 6.4.6 (`vinxi/node_modules/vite`). Pinning root `vite@^6.4.1` deduped the copy — real packaging defect (my round-1 scaffold omitted what every other arm pins), but the SSR still rendered empty.
3. **The decisive layer — the frozen stack itself.** A **hello-world scratch** with the arm's exact lockfile (`@solidjs/start` 1.5.1 + `@solidjs/router` 0.15.4 + `vinxi` 0.5.11) reproduced the empty boundary `<!--!$e0000000-->` for a bare `<h1>` route. Bisect: App **without** Router renders (`no-router inline` count: 1); App **with** Router (inline children, no FileRoutes) renders empty (count: 0). Bumping router alone: build exit 1. The 1.x SSR pipeline renders any Router-based app as an empty component boundary, silently — no error, no console line. That is why v2 shipped "green" and why three seats saw the same shell on three machines.

**Fix:** upgrade to the pairing the framework ships today — `@solidjs/start@^2.2.2`, `@solidjs/router@^1.0.3`, `vite@^8` (start 2.x is vite-native; vinxi is gone from its peer set). Build wiring changes accordingly (`vite.config.ts` with `solidStart()`, scripts `vite dev/build`; `app.config.ts` retired; tsconfig `types` `vinxi/types/client` → `vite/client`). **Route/app/entry sources: unchanged** — the documented `<Router><FileRoutes/></Router>` pattern is exactly what start 2.x runs.

**After (receipts):** prod (`npm run start`, wrapper `playwright/serve-solidstart.mjs` — start 2.x ships a fetch handler + static client but no node runner; the wrapper serves `dist/client` statics with MIME and falls through to the SSR handler, one warm-up request at boot): full stream **7634 bytes, 69 testids, 32 board rows**, ~22 ms; browser probe: 69 testids in live DOM, **0 console errors**, markup carries server `data-hk` markers (SSR-rendered, hydration attached). Playwright suite: **5/5, exit 0 (1.9s)**.

**Cold-start quirk, recorded:** start 2.x's very first render on a fresh server streams the shell only (req#1: 991 B / 0 testids; req#2+: 7634 B / 69 testids — measured). The wrapper warms once before declaring readiness; the quirk is the framework's, the warm-up is the harness's, both are documented.

**Migration intelligence (if the Owner ever wants the 1.x path):** there is none — 1.x SSR is broken for Router apps as shipped; the only sound SolidStart today is 2.x + vite 8. The dead-letter alternative the work order allowed was not needed.

### 5.2 arm-solid and arm-lit (INKLING's bytes)

Copied byte-identically from `inkling@0938db96` (`diff -r` exit 0 both, vs pin AND vs tip). Executed the full protocol: install/build/typecheck/audit/suite. Builds 0.8s / 0.4s; dists 76KB each (smallest of the nine); goldens MATCH; leakage 0; drift ZERO; suite 5/5 both. arm-solid's typecheck is exit 2 (one TS2322 + one strictness complaint in INKLING-authored files) — recorded, not touched; arm-lit passes clean with the pin-consistent CLI flag. `git diff` of my fold vs `origin/council/inkling` on their two arms: empty.

### 5.3 arm-nuxt — the invocation the row hides

`npm run build` builds but does NOT prerender; the acceptance HTML exists only at `.output/public/index.html` after `npm run generate` (INKLING's receipt, reproduced: generate exit 0, 3.8s). Suite against `serve .output/public`: **5/5 (2.0s)**. The correct invocation is now in `playwright/PLAYWRIGHT-COMMANDS.md` and in this file's matrix — anyone re-running with `build` will keep producing false negatives.

## 6 · The full suite, as run (work-order §7 close)

```
for pair in "arm-react 4171" "arm-vue 4172" "arm-svelte 4173" "arm-sveltekit 4174" \
            "arm-next 4175" "arm-nuxt 4176" "arm-solid 4177" "arm-lit 4178" "arm-solidstart 4179"; do
  set -- $pair; bash scripts/v3_pw_run.sh $1 $2
done
```
Runner per arm: serve → curl-200 readiness → `BASE_URL=http://localhost:<port> npx playwright test offensive-focus.spec.ts` (from `fwtest-9/playwright/`, Playwright 1.65.1, chromium-1255) → per-arm log. **Result: 9/9 arms, 5/5 tests each, playwright exit 0 ×9** (`logs/v3-full-suite-run.log` at final state + per-arm `logs/v3-playwright-arm-*.log`). **Non-PASS list: none.** Offline-axis BLOCKED verdicts are recorded separately in §4 and are not suite failures.

`sha256sum -c CHECKSUMS.txt` from a fresh extraction of the shipped zip: **exit 0, 0 failed, 0 unreadable** (§1.3; tail in `README-DELIVERY`).

## 7 · The Owner's seven questions — the builder's subjective answers

These are experience, not evidence. The matrix above is the evidence; the Owner asked for both.

**1 · Which framework felt easiest to build in?** **Svelte.** The offensive-focus feature is markup with a brain — focus cards, a board, two sections — and Svelte's `{#if}`/`{#each}` + runes meant the feature read top-to-bottom like the screen it produces. Vue is a close second (the SFC keeps template/state/style in one place; `ref`/`computed` are direct). React's JSX is natural to write but you carry the plumbing (hook discipline, dependency arrays, key props) yourself. Lit was *fast* to build because the contract was already in my head, but nothing about the framework guided me — freedom, not ease.

**2 · Which was most effective — cleanest code, fewest lines, most maintainable?** By the tape: **arm-lit is smallest (208 code lines, 76KB dist) and arm-solid next (233, 76KB)** — but Lit's smallness hides cost: the "framework" is your own plumbing, so its smallness is the *feature's* smallness, not the framework earning anything. Cleanest *team* code: **Vue** — one SFC, strict `vue-tsc`, template that mirrors the design; and **Solid** for pure reactivity elegance (memos over board and focus read like the engine's own dataflow). If "most maintainable" means "a stranger edits it in a year without archaeology," I say **Vue or Svelte**; if it means "smallest surface to defend," Solid.

**3 · Which fought the most — where did framework-specific debugging eat the time?** **SolidStart, and it isn't close.** The empty-SSR failure mode is the worst kind: the framework renders *nothing* and prints *nothing* — three seats burned time on it before this wave, and it took a hello-world bisect to prove the frozen stack itself was broken (§5.1). Second place: Nuxt's `build`-vs-`generate` footgun (a suite-wide false negative by invocation, not by defect). A non-framework mention: Next's Turbopack `.next` cache polluting byte-drift detection — environment noise, not authorship, but it cost a re-run with a corrected exclusion list.

**4 · Which would I want to maintain for a year?** For a typical web product: **SvelteKit** — conventions, prerendering, file routing, a community that answers questions before the issue is filed. For *this* product (local-first, offline-capable, engine vendored, single-file ship): **plain Svelte on Vite** — the meta-frameworks buy routing the product doesn't use yet, and plain Svelte matches Z-post-blue's architecture while keeping the runes' mental model. Solid is the strongest runner-up on reactivity grounds and the smallest runtime; I'd choose it if the product's state graph grows hairier than the draft board.

**5 · Which framework's idioms changed how I think about the problem?** **Solid's signals — unambiguously.** `createMemo` over `priorityBoard(TEAM, effective())` made the UI literally *derive* from engine state: focus in, board out, nothing recomputed by hand, nothing stale. Svelte 5's runes are the same lesson with syntax sugar (`$derived`); Vue's `computed` is the same idea friendlier. The lesson that belongs in the product (this is the note the self-questions flagged): **the Z-post-blue board should derive, not recompute** — Priority-as-derived-of-focus is a better shape than event-driven recalculation, and the arms prove the pattern survives every idiom.

**6 · Was a meta-framework worth its weight?** **For this test: Next bought nothing** — a static export of one page costs 736KB (2.6× the plain React arm's 280KB) and 15 files of config; Turbopack is fast, but the product doesn't use the server it insists on. **Nuxt bought the least config and the biggest footgun** (`generate` vs `build` — one word decides whether the acceptance gate can even see the arm). **SolidStart bought the most** — real SSR, streaming, fs routing — and charged the most (§5.1). For the Owner's actual single-file offline product: **none of the three pays its way today.** If Z-post-blue ever grows real routes (team pages, era views, multi-screen draft), SvelteKit or Nuxt earn their seat first; Next earns it only if a server exists to serve.

**7 · If a sixth focus came from the data alone, which arm would I want to do it in?** **arm-svelte.** The maintainability-inspector test is about review surface: in Svelte the sixth focus is one `{#if}` branch and one card entry in one file, with the diff reading like prose — the smallest, most reviewable change of the nine (the second-axis row, §3, shows every arm manages one file; Svelte's one file is the one I'd hand a reviewer). And a data note the Owner can use: the sixth focus should be derived from the P-344 team-game summaries the way B.4 did direction — the arm choice is only about *where the review is easiest*, and that's Svelte.

## 8 · The briefing's six open questions — answered this wave

1. **The shipped spec's fix** — accepted; implemented as the sync form (the cleaner of the two allowed), executed 9/9. The instrument's five tests are unchanged otherwise: minimal diff, maximal comparability with INKLING's cold run.
2. **CHECKSUMS scope** — "list exactly what ships." The manifest is generated from the frozen zip tree at packaging time (`scripts/package_v3.py`), so entries cannot exist without bytes; what is *not* shipped (node_modules, build output, caches) is documented in the README with regeneration commands. No listed-but-absent entry is possible by construction.
3. **arm-solidstart** — repaired, not dead-lettered (§5.1); the fallback intelligence (no viable 1.x path; 2.x = vite-native) is in the narrative.
4. **D.8 playoff-HFA vs divisional-upset** — carried from the v2 receipts unchanged (they were already filed: playoff HFA margin 5.57 [3.37, 7.77] vs regular 1.78 [1.24, 2.32], CIs separate — the playoff envelope deserves its own HFA treatment; divisional upsets +1.5pp sat inside the band, dead on that axis). What the Owner needs for the design space: treat playoffs as a distinct regime in any scenario tool; do not chase the divisional-upset story.
5. **file:// axis** — carried as a standing check this wave (§4), reported per arm with verbatim console text. My recommendation: keep it as an information row, not a gate — it measures the packaging path (the product's real ship shape), which is worth tracking, but failing a framework for SPA-at-file:// would measure the product plan, not the framework.
6. **The display question** — I carry the answer rather than three mockups: ship **"Gap"** (priority-vs-wins gap, integers, one column) now — it is the one of the three that reads at board glance and the only one whose math the engine already owns; "Impact" and "+Wins vs your starter" stay v4 candidates with their receipts. Building all three mockups this wave would have duplicated the arms' board for no new signal — and the Owner asked for avenues, not upholstery.

## 9 · Closing record

- Fresh extraction verified: `unzip -q … && sha256sum -c CHECKSUMS.txt` → exit 0 (§1.3).
- Source SHAs: this wave's tree root is the v3 delivery in the zip; inputs as pinned in §0; INKLING arms unmodified (`diff -r` receipts).
- No engine file, product file, protected constant, or other seat's lane touched. Rankings: none. The Owner rules.

