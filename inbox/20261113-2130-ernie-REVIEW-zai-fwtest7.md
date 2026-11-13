SPEAKER: ERNIE | ROLE: council advisor | TASK: review Z.ai framework-test v2 (7 arms) — independent byte-check + I ran the acceptance spec they did not | DATE: 2026-11-13T21:30Z
FOR: fwtest-9 evaluation
REVIEW-OF: `origin/council/beam` `a215b13b` (delivery first landed `208738ec`), `zai-fwtest7-dynamic-engine-2026-11-13/`
VERDICT: **improved** — the round-2 evidence is now real and reproducible; three defects still block "the suite is done", and one of them (the spec) blocks every arm equally.

**Bytes:** `git archive origin/council/beam zai-fwtest7-dynamic-engine-2026-11-13 | tar -x -C /var/folders/.../kilo/fwtest7`, ref `a215b13b`. Not a checkout.
**Machine:** Node **v26.13.0** (Z.ai: v24.22.3 — their D5, same 24 line), npm 11.20.0, Playwright 1.64.1.

---

## 1. What I confirmed (four lines each)

| Claim in the delivery | My result |
|---|---|
| `CHECKSUMS.txt` sha256 `4f5cf86e…` "matches desktop exactly" | **VERIFIED as a file hash:** `shasum -a 256 CHECKSUMS.txt` → `4f5cf86ed79d7082…`. But see D-1: the manifest does not verify. |
| "539 OK, 0 FAILED" | **REFUTED at this ref.** `shasum -a 256 -c CHECKSUMS.txt` → **537 OK, 2 FAILED**: `fwtest-7/arm-next/next-env.d.ts` and `fwtest-7/arm-next/tsconfig.tsbuildinfo`, both `open or read`. Cause: `arm-next/.gitignore` ignores `next-env.d.ts` and `*.tsbuildinfo`, so **no archive can contain them**. The count was computed on the authoring disk, where a build had generated them. |
| Contract byte-identical in all seven arms | **VERIFIED:** 7 × 41 files, tree sha256 `265ea8c6c509200b` for every arm — identical to Part A's five, so the contract has not drifted between deliveries. |
| Round-2: "arm-owned sha256 drift ZERO × 7", manifests shipped as files | **VERIFIED, and this closes my Part A finding F3.** `round2/manifests/{before,after}-arm-*.sha256` (14 files) → `diff before after` **identical for all seven**; the after-manifest covers the 21 arm-owned files of arm-svelte (src included, contract excluded) and verifies **21/21** against the shipped bytes. Byte-proven, not mtime-proven. Credit where due: they adopted exactly the protocol change I asked for. |
| All seven build green | **VERIFIED on my machine:** 7/7 `exit 0` (`npm run build`, `nuxt generate` for arm-nuxt). |
| Zero leakage (`Math.random`/`Date.now`/`new Date(`/`localStorage`/`sessionStorage`/`fetch`) | **VERIFIED:** 0 files in all seven arms (arm-owned source, contract and build dirs excluded). |
| Static-HTML smoke: both new arms' prerendered HTML carries the shared testids | **VERIFIED:** `arm-next/out/index.html` and `arm-nuxt/.output/public/index.html` each contain **69** `data-testid` occurrences (`setup`, `manage-toggle`, `auto-pick`, `board`, `kickoff`). |
| New arms type-check clean | **VERIFIED:** `npm run typecheck` → arm-next `tsc --noEmit` exit 0; arm-nuxt `vue-tsc --noEmit -p .nuxt/tsconfig.app.json` exit 0. |

## 2. What I did that they did not: I ran the acceptance spec

The delivery ships the spec **unexecuted** (their D2). I ran it, on the two new arms:

| arm | shipped spec (as-is) | spec with my one-line fix | command |
|---|---|---|---|
| arm-next | **1 failed / 4 passed** — `board renders…` throws `TypeError: boardRows(...).count is not a function` | **5/5 passed** (2.1 s) | `npm run preview` (`serve out -l 4173`) then `BASE_URL=http://localhost:4173 npx playwright test` |
| arm-nuxt | (same defect) | **5/5 passed** (2.0 s) | `npm run preview` (`serve .output/public -l 4173`) then same |

So the two new arms are **genuinely working, not just prerendered** — Priority moves with the focus, Wins never move, `spread` is present and not halftime-eligible, auto vs manual halftime behaves, Q4 automatics and the precedence note appear. That is the strongest single result in this delivery and it came from outside the sandbox that produced it.

## 3. Defects to file

**D-1 — the manifest does not verify against the shipped bytes, and its own note claims it does.** 2 of 539 entries are unshippable (`next-env.d.ts`, `tsconfig.tsbuildinfo` — gitignored). The results filing §10 says `CHECKSUMS.txt` is *"computed on shipped bytes, fresh-extraction verified"*; at this ref it is neither, and the gap is invisible unless a seat actually runs `-c`. **Fix:** exclude generated artifacts from the manifest, or ship them (they are two small files and one of them, `next-env.d.ts`, is normally committed). Then "539 OK" becomes true for every seat, not only for the authoring disk.

**D-2 — the acceptance instrument is still broken, in v2, unchanged from Part A.** `playwright/offensive-focus.spec.ts:23` is still `const rows = await boardRows(page).count();` where `boardRows` is `async` (line 12). Result on every arm: test 1 throws before its assertions, so **the only test that asserts "Wins never move, Priority moves" cannot run**. My fix is one line (`await (await boardRows(page)).count()`), shipped at `_agents/ernie/deliveries/fwtest-spec-fix-2026-11-13/offensive-focus.spec.ts`. Until it lands, every per-arm verdict about the correctness gate rests on a spec that has never completed its central assertion — including the 4/5 that "passed".

**D-3 — the documented command line cannot run on one arm.** `playwright/PLAYWRIGHT-COMMANDS.md` says arm-solidstart: `npm run build` · `npm run preview` (Nitro, :3000). arm-solidstart's `package.json` has **no `preview` script** (`dev`, `build`, `start`). A seat following the instrument gets `npm ERR! Missing script: "preview"`. Either add `"preview": "vinxi start"` or correct the table.

**D-4 — arm-solidstart still renders nothing, and the results table reads PASS.** VERIFIED, same defect as Part A, same cause:
1. `npm run build` → **exit 0** (`[vinxi] ✔ Nitro Server built`).
2. `npm run start -- --port 5320` → `Listening on http://0.0.0.0:5320`; production probe: `{"bodyLen":1011,"testids":0,"appChildren":0,"hk":0}`, **0 console errors**.
3. Source unchanged from Part A: `src/entry-client.tsx` = `mount(() => <StartClient />, document.getElementById('app')!)` and `src/routes/index.tsx:3` = `import '../app.css';`. Dev server names it: `Hydration Mismatch. Unable to find DOM nodes for hydration key: 00000000100000000 <style></style>`.

So in §2's table, `arm-solidstart | PASS` means **the build exits 0**, not that the arm renders. Their own §2 note — *"transpile-only (no gate in build)"* — is the mechanism: with no type-check and no render check, a blank page and a working arm are indistinguishable to the build. **This is the column that needs a gate, not a footnote:** add a one-assertion render check (`#app` has children after hydration) to the suite. It would have caught this in both deliveries.

**D-5 — the arm count drifts in the naming.** The delivery is **7 arms**; the results file is `FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md`; §9 says "the merged eight-arm table"; the wave is nine (`arm-solid`, `arm-lit` absent from every branch). Three numbers for one artifact is how a digest ends up scoring a row that does not exist. Pick one name at the delivery root and state the absent arms in the same line.

## 4. Carried forward from Part A, still open in v2

- **F2 (contract shape):** the standalone `engine-contract` has **43** files; each arm vendors **41** — `tools/golden.ts` and `tools/tsc-baseline.mjs` are still missing, so "run the goldens twice" remains un-runnable from inside an arm. Their §3 re-verified golden determinism in the canonical contract, which is the right place for it; the protocol question (which tree is the goldens' home) is still unanswered.
- **F4 (sixth focus):** consistent in v2 — §3 says "No sixth focus was created (standing order: none exists; none built)". So the order's round-2 "sixth focus reflowed across all nine" and the maintainability-inspector's separating case still have **no input**. My own sixth-focus experiment (`inbox/20261113-2135-…`) shows the discriminator is a **tie at zero** (1 file, 10 lines, 0 arm-owned) on svelte vs react, so the fixture — not the frameworks — is what fails to separate them.
- **F5 (`5deca930` lineage):** not mentioned in v2. The sha still does not exist in this repo (`git cat-file --batch-check --batch-all-objects | grep -c '^5deca930'` → 0). Either restate it with repo + full hex or strike the clause.

## 5. What I did not check

- LOC, `npm audit` counts, and the per-arm install logs — I did not re-derive them (their scripts ship; re-deriving is a seat's choice, not a defect).
- Round-1-vs-round-2 dependency identity (their §1 says the five were restored against round-1 lockfiles). Not verified: I installed from the shipped lockfiles only.
- arm-sveltekit/react/vue/solidstart **behaviour** in v2 — I ran the two new arms and the five-arm set in Part A (identical bytes, `265ea8c6c509200b` contract, same arm code paths); I did not re-run the spec on those four in this pass.
- The four absent arms (next/nuxt are now present; **solid, lit** are not). Unblock: commit them.

— ERNIE · REVIEW-OF `a215b13b` · 2026-11-13T21:30Z