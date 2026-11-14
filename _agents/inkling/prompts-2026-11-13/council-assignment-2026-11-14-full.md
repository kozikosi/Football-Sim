SPEAKER: KG (Owner) + inkling | ROLE: Council · Consolidated assignment | TASK: while the framework ruling is held — verify the gate, defend the engine, prepare the stage | DATE: 2026-11-14 | Audience: COUNCIL (all seats)

# INKLING · Council Assignment — the holding phase

**Why this wave exists.** The v3 nine-arm test produced a clean data result: no discriminant discriminates. All nine arms honor the same contract, carry the same goldens, leak the same zero, drift the same zero, and pass Playwright 5/5. The Svelte-vs-Vue scaffold question therefore rests on two threads: (a) an explicit Owner recommendation (the Architect has filed one — Vue 3 + Vite at LOW confidence), which any seat may contest with evidence, and (b) a benchmark that does not yet exist. Your job is not to pick a framework; the Owner will. Your job is to verify the ground under the decision, to attack every artifact anyone already wrote a number near, and to make the future benchmark one a council member can trust the score of.

**Ground rules for this wave (restated so you know what is different):**
- Stay strictly in the two candidate frameworks — **Svelte 5 + Vite** and **Vue 3 + Vite**. No new arms. No Astro, Qwik, HTMX, Alpine, Solid, SolidStart, Lit, SvelteKit, Nuxt, Next, React, or Angular — not in scope, not as sketches.
- Free-only tooling. No paid services, no paid APIs, no subscriptions. The Owner has ruled on this repeatedly.
- No framework decision. Someone else rules. Your job is receipts.
- No implementation into either scaffold. Both are starter apps only. Engine code ports, when authorized, are a separate wave with explicit scope. Do not sneak engine calls into a scaffold.
- No changes to the original `Football-Sim` repository, no merges, no MRs.
- Labels everywhere: VERIFIED / REPORTED / INFERRED / UNKNOWN. Say so when you cannot.
- No caching of conclusions. If your finding differs from what's already said, say so — don't drop it because it contradicts earlier filings.
- Do not re-run work already done with receipts. If a claim needs re-verification, file a CORRECTION note with the receipt.
- Read before you write. The current state of these public repos is verifiable:
   Vue: https://github.com/kozikosi/football-sim-vue — tip `6b4de5c` ("chore: prepare Vue 3 Vite comparison scaffold")
   Svelte: https://github.com/kozikosi/football-sim-svelte — tip `86ba632` ("chore: add Svelte 5 Vite comparison scaffold")

**Each task below is ordered so that failing any one invalidates its neighbors. Record actual exit codes and output neighborhoods, not "it worked".**

---

## A. Verify the engine survives the framework sweep unscathed

Both scaffolds fork a new Track; the engine should not know that. Confirm the boundary is honored:

1. `grep -rni "Math\.correlation\|Math\.random\|Date\.now\|new Date()\|localStorage\|window\." [both clones]` — record hits. Both should contain only `window.__pinia` (vue, dev-only) and `window.__SIM_STATE__` (svelte, dev-only), plus definitions of those exposed symbols if any.
2. `grep -rni "@sveltejs\|svelte-hmr\|vite-plugin-svelte" [both clones]` is **not** forbidden per se, but exact counts and locations should be logged in your filing. Same for `vue`, `@vue`, `@vueuse`, `@tanstack/vue-table` — each of those has been removed from `node_modules` by no one. Whatever your machine finds, cite it.
3. Confirm neither scaffold contains `colors/` references or `slotWinsPerOvr` — you don't want engine source in a scaffold before the Owner authorizes.
4. Run `grep -rni "import.*from ['\"]\.\./" src/` — any directory outside the scaffold's own `src/` tree from which an import reaches? Record such cross-tree refs, if any.
5. Grep for `"simulateGame" | "optimalLineup" | "cpuPick" | "matchupModel" | "slotWinsPerOvr" | "estimateScore" | "scoringSummaryPaths"` in either scaffold. Expect zero hits. Record your exact hits if any.
6. Both scaffolds should expose the `node scripts/report-tooling.mjs` receipt. You can see it yourself — run it yourself (`node scripts/report-tooling.mjs` from the root of each fresh clone... and record its full output).
7. `git ls-files | grep -E "stores/|engine/|lib/|sports/"` — record every file that lives under these paths in each repo so the digest can see exactly what's there.

Deliverable: one file in `inbox/20261114-<UTC>-<seat>-engine-boundary-audit.md` with the six command outputs in full (trimmed) + pass/fail on the seven items.

---

## B. Public scaffold care & feeding — hygiene that directly affects the benchmark

These are not "nice-to-haves". Each one affects reproducibility of any benchmark measured on this surface:

1. **`npm run build` both fresh clones** — record wall clock, JS/CSS/HTML sizes, gzip sizes, exit code. Both should report exit 0 and sizes within 5% of today's known report counts (vue JS ≈ 77.2 kB, svelte JS ≈ 28.96 kB — flag anything more than ±10% drift).
2. **`npm run type-check` (vue) and `npm run check` (svelte)** — record exit codes, counts of errors/warnings. Both should be 0/0.
3. **`npm run test:unit -- --run`** in both clones — record results. Record exact test counts.
4. **`npm run test:e2e`** in both clones — record the two tests listed, time, and exit code. Both should pass.
5. **`npm run smoke`** — record console errors observed. Identify the actual `__*` hook that the test asserts against in each (`__pinia`, `__SIM_STATE__`).
6. **Check `tests/smoke.spec.ts`** in each — which specific data-testid and attribute does each test assert on? Verify both actually assert something — not just HTTP 200 status, not just "object exists". If either test is vacuous, file a CORRECTION note. Do NOT modify the repos.
7. **Stray-lint baseline** — the Svelte scaffold does not carry `package.json`'s `devDependencies` with `@sveltejs/vite-plugin-svelte` only? Verify actually: Vue's deps: vue, pinia, @vueuse/core, @tanstack/vue-table (per architect's rec). Svelte's deps: svelte, @sveltejs/vite-plugin-svelte, vite, vitest. Record this. Your reconciliation should match the Architect's platform picture exactly, or list every divergence.
8. **Missing `.nvmrc` rule honestly accounted for**: `.nvmrc=24` in both, your node will report 26.13.0 or whatever you have. Note it. Never silently pin to a different version.
9. **README claims vs actual scripts**. Audit each package's README for whether it matches what `npm run build`/`test:e2e`/etc. actually do. Flag anything misleading; file CORRECTION, don't patch.

Deliverable: `inbox/20261114-<UTC>-<seat>-public-scaffold-care.md` with the ten (no more, no less) commands and outputs, annotated.

---

## C. Work that the "v3 50/50 deadlock" has hidden — evidence from scratch

The release of the 50/50 tie landed no conclusion. The v3 study's own methodology is up for dissent here — this phase is where the council exercises that right:

1. **The graph edge nobody looked at:** the benchmark suite. Re-read the fixtures: v3 suites typically assert `board renders`, `focus picker renders`, and `plain Vite compiles`. None of those prove *product* proves. Identify concretely what additional assertions would be needed to show "this framework could host a working draft-board+simulator+recap pipeline" in a 20-hour sprint, and propose them. Do not write the tests. Bring the spec.
2. **Workload shaping:** the product's sim real workload is: 32-team draft at 1 round, ~204 picks (7 or 7 rounds × 32 teams). What would each framework actually have to do per unit-of-work? Compute the kernel work by unit operation; recordable via profiler if anyone wants receipts. The question isn't "which is faster in the abstract"; it's "which doesn't collapse on the 32×7 hot path." Propose measurements and the harness.
3. **Type-safety surface check:** Vue's `defineProps`/`defineEmits` typed props vs Svelte's `$props()` + `interface`. Which allows safer types at compile time for a prop contract like `{ team: TeamRecord, onPick: (slotId: SlotId) => void }`? Sketch the minimal form each way; note observations.
4. **Runner precedents across the two frameworks for the actual Football-Sim Observability journey (snapshotting, replaying games, recap diffs):** what is the minimum substrate needed? What does each framework's test runner expect? Which has meaningful testing built in for the actual product — not a toy number. File this as a proposal; file it as a QUESTION to the Owner whether he wants tests in the engine at all before touching the UI.

Deliverable: `inbox/20261114-<UTC>-<seat>-v3-methodology-dissent.md` — a file with five parts matching the items, each with receipts where any are available, so the Council record keeps a proper narrative of dissent.

---

## D. The flex table — a job the council has never finished

This wave produced three findings nobody has reconciled. They sit on the same rules, they touch the same table, and they matter for the 76 Pancakes product architecture:

1. **Tag-dispatching conflicts.** An 11-way symlink of roles to flex destinations — ask the auditor (the architect notes) to provide a current count of "slot outcomes vs flex consequences" for the live table at HEAD. The count did not appear in the council notes until this wave. Audit it.
2. **The two SS-vs-ILB same-side inconsistencies** — referenced in the work-order at line 36; the Owner asked "what the actual value is; who engineered this" — file a response inline. Do not modify the table. Do not appeal to any source that isn't the live file: `origin/architect/engine-and-seats:tools/mathlab/flex.json`.
3. **The OWN-NEXT-ONE rule** — proposed by an earlier member (Z.ai's Part A pipeline). Verify whether it matches what's actually shipped, or whether it's an aspiration. Byte-check it is `(price(source, target) + price(source, your_own_next) <= price(<own_next_pair>))`. Record what's actually at HEAD.

You will not design a solution to these; you will file receipts and questions the Owner can rule on.

Deliverable: `inbox/20261114-<UTC>-<seat>-flex-99-reconciliation.md`

---

## E. Re-verification of the nine-arm bundle, adjacent to the scaffolds

Untradable receipts to file before any benchmark:

1. Verify `github.com/kozikosi/football-sim-vue` exposes **zero** tracked backup, `*.backup-*`, `.kilocode/`, `.mcp.json`, `node_modules`, `dist/`, `test-results/` — through `git ls-files | grep -E "backup\.|\.kilocode|\.mcp|node_modules|dist/|test-results/"` across every tracked path. Same for `football-sim-svelte`. Report exact output.
2. Verify both repos retain permission to be public — checking `.gitignore`s for any local-but-committed trash that the earlier council sweep missed. Record what you see.
3. **Sanity check:** `git log --pretty=format:'%h %s' --since "2026-11-01" --reverse` in both — confirms what was actually pushed. This receipt is required because the public repos are the benchmark's starting state; if anything got accidentally-or-not pushed after the agreed publish checkpoint, you'll see it now.
4. **CLI check parity**: both repos run `node scripts/report-tooling.mjs` cleanly. Run it in both. If one errors, file correction. Do NOT patch.
5. **`git ls-tree -r --name-only HEAD | wc -l`** — 28 for each. Record both numbers.

Deliverable: `inbox/20261114-<UTC>-<seat>-public-repos-fortification.md`

---

## F. Digest / synthesis inputs (do not produce the digest — just prepare receipts)

The digest is INKLING's job but the receipts that go into it are council lanes. File once per seat:

1. **One sentence each** covering BENCH-1 readiness (Owner approval = gap remaining, not implementation).
2. **One sentence each** on whether the scaffolds are visually consistent (for the digest's "can we give him a feel" row) or visually distinct (in which case the digest must say "already different").
3. **One sentence each** on the single smallest thing you verified in this wave that no prior seat claimed.
4. **One sentence each** naming the single gap in either scaffold's tooling that you'd want fixed before the benchmark (without fixing it).

Deliverable: `_inbox_20261114-<UTC>-<seat>-digest-inputs.md`

---

## Closing reminder

The Owner has consistently demanded that accountability work first. Every receipt above is a receipt you personally produce. If you cannot — label UNKNOWN and state what you did check. Fabricated or inherited numbers from anyone, including me, are a process breach. Trust nothing you didn't run; if you cannot run it, say so. The Owner will rule with or without your input; your input shapes the rule.

— inkling for KG
