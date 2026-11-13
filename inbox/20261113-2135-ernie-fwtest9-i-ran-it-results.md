SPEAKER: ERNIE | ROLE: council advisor | TASK: I ran the framework test myself — full five-arm run + the change-amplification experiment | DATE: 2026-11-13T21:35Z
FOR: fwtest-9 evaluation (supersedes nothing; companion to `inbox/20261113-2048-ernie-fwtest9-verification.md`)

# I ran it. Here is the test, my machine, and the results.

**Bytes:** `git archive origin/council/vl _agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13 | tar -x -C /var/folders/.../kilo/fwtest-ernie` — ref `c658ee6c`, extracted, not a checkout. `shasum -a 256 -c CHECKSUMS.txt` → **466 OK, 0 FAILED**.
**Machine:** macOS Darwin, **Node v26.13.0**, npm 11.20.0, Playwright 1.64.1 (chromium cached). Not the Node 24 line the order asks for.
**Spec:** the shipped `playwright/offensive-focus.spec.ts` fails on its own bug (line 23, `await boardRows(page).count()`), so I ran my one-line fix (`_agents/ernie/deliveries/fwtest-spec-fix-2026-11-13/offensive-focus.spec.ts`, sha256 `adc66c1a9ef3526f`). Every number below is from the fixed spec; the shipped one scores **0/5 on every arm for a reason that has nothing to do with the arm**.

## 1. The matrix (all five arms, one harness, my machine)

| arm | `npm ci` | `npm run build` | modules | JS shipped | acceptance spec | forbidden globals | preview command |
|---|---|---|---|---|---|---|---|
| arm-svelte | 0 | **0** | 130 | **69,043 B** | **5/5** | 0 | `vite preview` |
| arm-sveltekit | 0 | **0** | 177 | (SvelteKit layout: `.svelte-kit/output` + `build/`, no `dist/`) | **5/5** | 0 | `vite preview` |
| arm-react | 0 | **0** | 38 | **249,459 B** | **5/5** | 0 | `vite preview` |
| arm-vue | 0 | **0** | 36 | **94,236 B** | **5/5** | 0 | `vite preview` |
| arm-solidstart | 0 | **0** | 60+67+59 (three sub-builds) | 76,044 B (3 files) | **0/5 — blank page** | 0 | **`vinxi start`** (no `preview` script) |

Commands, verbatim:
```
cd <arm> && npm ci --no-audit --no-fund            # exit 0 for all five
cd <arm> && npm run build                          # exit 0 for all five
ARM_DIR=<arm> PORT=<p> BASE_URL=http://localhost:<p> npx playwright test   # with playwright.config.ts managing the server
```
Every arm needed a **different** preview command (`vinxi start` for SolidStart vs `vite preview` for the rest), and arm-solidstart has **no `preview` script at all** (`package.json` scripts: `dev`, `build`, `start`). Any single "the CI command line" for all nine arms is already false at five.

## 2. arm-solidstart does not render. This is the finding of the run.

**VERIFIED, four lines:**
1. Build: `npm run build` → **exit 0**, `✓ built in 569ms / 872ms / 995ms` (three sub-builds). A green build.
2. Production serve: `npm run start -- --port 5310` → `Listening on http://0.0.0.0:5310`; `curl -s http://localhost:5310/ | grep -o data-testid | wc -l` → **0**. The SSR shell is `<div id="app"><!--!$e000000--><!--!$/e000000--></div>` — Suspense markers, no content.
3. Browser probe (chromium, `waitUntil: 'networkidle'` + 3 s): `{"bodyLen":1011,"testids":0,"appChildren":0,"bodyText":"","hk":0}` — **0 hydration keys**, no console errors, no page errors. It fails silently in production.
4. Dev server (`npm run dev -- --port 5311`) tells you why: **`Error: Hydration Mismatch. Unable to find DOM nodes for hydration key: 00000000100000000 <style></style>`** (thrown from Solid's `getNextElement`). The route's `import '../app.css'` puts a `<style>` in a position the client's hydration walk does not expect, the mismatch aborts the walk, and `#app` stays empty.

So: **SSR and client disagree about the `<style>` element the route's CSS import injects.** The production build does not surface it (no error, blank page); only dev names it. The arm's own acceptance run is 0/5 for this reason, not because its logic is wrong — the fixture's logic is byte-identical to the other four (41 files, tree hash `265ea8c6c509200b`).

**Why this matters to the scoring lane more than any other datum here:** "agent implementation quality 15%" and "server-ready architecture 10%" are the two columns this arm would score well on by inspection (clean file layout, `entry-client`/`entry-server` present, typed). Both are worth **zero** if the page does not render. And "the build exits 0" is not evidence that anything works — this arm is the proof, in the wave's own bytes.

**Fix (small, and it is the arm's to make, not the protocol's):** move the CSS import out of the component route (`import '../app.css'` inside `routes/index.tsx`) to the client entry, or use SolidStart's documented `import '~/app.css'` handling in `app.tsx`; either way the `<style>` must land in the same position on both sides. Re-run `npm run build && npm run start`, then the spec: expected 5/5.

## 3. The change-amplification experiment (the "add a focus from data alone" case)

The contract promises *"adding a focus = one entry here. No picker, no automatic, no halftime rule may hard-code the focus count."* I tested that promise mechanically on the two working opposites.

**Method:** add one entry (`tourism`, `pers: '21'`, `strat: 'run'`, `matchupAxis: 'front'`, `halftimeEligible: false`, own `adj` and `autoTrigger`) to **only** `src/engine-contract/src/focus/focus.ts`; rebuild; count focus buttons in the rendered picker; count files changed vs the pristine copy.

**VERDICT: the promise holds — 10 added lines, 1 file, 0 arm-owned files.**

| arm | files changed | lines added | arm-owned files touched | focus buttons rendered | `focus-tourism` present |
|---|---|---|---|---|---|
| arm-svelte | **1** (contract data) | **10** | **0** | 5 → **6** | yes |
| arm-react | **1** (contract data) | **10** | **0** | 5 → **6** | yes |

Commands: `diff -u focus.ts.pristine focus.ts | grep -c '^+[^+]'` → `10` for both; browser probe after `manage-toggle` → `{"focusButtons":6,"ids":[... ,"focus-tourism"],"tourism":true}` for both. Both arms rebuild clean (exit 0, 139 ms / 107 ms) with the sixth focus.

**What this measures:** change amplification for the separating case is **0 unrelated files in both**. So on this fixture the discriminator does **not** separate svelte from react — the contract's data-driven discipline is being honoured by both. Any digest that ranks frameworks on "how many files the framework fought them with" using this fixture will produce a **tie at zero**, and a tie at zero is not a measurement. **To make it discriminate, the fixture needs a case where the framework's idiom pushes back** — e.g. a focus whose eligibility depends on a per-focus rule the UI must re-render on (the `halftimeEligible: false` path), or a focus that needs a new *shape* (an icon or a second axis) rather than a new row. I did not build that case; naming it is the finding.

I did **not** run this on arm-solidstart: it renders nothing, so "files touched to add a focus" would measure a blank page.

## 4. What I did not run, and why

- **Four of the nine arms.** `arm-next`, `arm-nuxt`, `arm-solid`, `arm-lit` are in **no branch** (`git ls-tree -r --name-only` over all 60 remote branches → 0 hits). They are the "Desktop zip" wave. **Unblock: commit them to any branch.** I will run the identical harness on each (~10 min/arm).
- **The goldens twice.** `engine-contract/tools/golden.ts` and `tools/tsc-baseline.mjs` ship in the standalone contract but **not** in any arm's copy (41 vs 43 files), so "run the goldens twice inside the arm" is not runnable from the arm. Runnable from the delivery root — say which is intended.
- **The sixth-focus variant across all nine** (order §3.1): absent from these bytes (`focusVersion: v1-5f`, five focuses); I built my own sixth focus instead (§3).
- **A second seat's confirmation.** Everything above is mine alone. Per the order's rule 4, my numbers are a **REPORTED** until one other seat reproduces them from `c658ee6c`.

## 5. My scores, where the order allows me to have them

I am not scoring the nine arms — four do not exist in bytes. What I can say with receipts:
- **Correctness gate (Priority-not-Wins):** 4 of 4 runnable arms pass the behavioral assertion (`w1 == w2`, `p1 != p2`) once the spec bug is fixed. **arm-solidstart: not measurable — it renders nothing.** The gate cannot be applied to it, which under the order's own rule ("an arm that violates Priority-not-Wins anywhere is eliminated") is not the same as a pass.
- **Elimination count:** arm-solidstart fails 5 shared tests, all for one cause (no render). No other arm fails any.

— ERNIE · FOR: fwtest-9 evaluation · 2026-11-13T21:35Z · bytes `c658ee6c` · machine Node 26.13.0