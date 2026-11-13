# 76 Pancakes: whole-project assessment (Architect, 13 Nov 2026)

Docs only. No product code, dependency, save format or framework was changed. Nothing here is decided until the Owner decides it.

**Labels.** VERIFIED = I read or ran it this session (command and directory given). REPORTED = taken from MUSE, GPT or the Owner's relay, not checked by me. INFERRED = my reasoning. UNKNOWN = not checked, or not checkable from the repo.

**How I ran things.** Repo clone: `/root/.claude/workspaces/football-sim` (branch `architect/engine-and-seats`, tip `bebe8e0`). Other branches fetched read-only: `origin/gh-pages` (`3e69567`), `origin/council/muse` (`35e841d`), `origin/main` (`7545d49`, last commit 27 Oct). Each track was extracted with `git archive` into a scratch directory and run there with Node v22.23.4 / npm 10.9.9 (Node is unpinned in the repo; those are just what this machine has).

---

## 1. Executive assessment

1. **The project is healthier than the audit threads suggest and messier than any single document says.** The engine and save layers are real engineering: 320 tests, a typed save envelope, a deterministic keyed RNG, a ratcheted type-check. The weakness is everything around them: no CI, three diverging product lineages, an unbuildable Colors app shell, and 41-45 Markdown files at the repo root.
2. **There are three product lineages, not two** (VERIFIED, section 2). The live site is a 1.9 MB single-file shell (`w89`) that is neither Colors nor Cakepanz. Colors is an engine with no UI. Cakepanz is a Svelte UI over a frozen copy of the Colors engine.
3. **Colors vs Cakepanz is not an either/or.** They are the engine and the UI of one product. The real decision is: where does the single product tree live, and does the UI ever again carry a private copy of the engine. My recommendation is in section 2.
4. **MUSE's audit is largely accurate and I could confirm most of it, with four material errors** (section 4): saves ARE versioned, tags DO exist, the live site is NOT Cakepanz, and the "esbuild vs Vite build path" question has an answer.
5. **The Owner's CI gate cannot be adopted verbatim yet**: of the four steps, the production build fails in Colors and the type-check has no script in Cakepanz (section 3).
6. **The biggest risks, in order:** (a) no automated check on anything; (b) the product the public sees is a lineage with no tests I could find and unseeded randomness; (c) lambda identification from OVR-only data (engine); (d) agent sprawl: many seats, many instruction files, no mechanical enforcement.
7. **Over-engineering warning.** Four framework prototypes, a database, auth, a platform DSL, error monitoring and a nightly lab are all on someone's list. For a football-only product with one non-engineer Owner, almost none of it is needed before the product ships. Section 6 marks each Defer.

---

## 2. Track Brief: Colors vs Cakepanz (first priority; the Owner decides)

### 2.1 What each one is (all VERIFIED)

| | Live site | Colors | Cakepanz |
|---|---|---|---|
| Where | `origin/gh-pages` root `index.html` | `colors/` on `architect/engine-and-seats` | `67-cakepanz/` on `origin/gh-pages` |
| What | Single 1,922,769 B HTML shell | TypeScript engine + app/state + view-models, tests, tools | Svelte 5 UI, 10 `.svelte` files (slices 1-2: Draft Board, Team Select) |
| Evidence | `git rev-parse origin/gh-pages:index.html` equals the `...-w89.html` blob; the file never contains the string "cakepanz"; 43 `Math.random` mentions | 0 `.svelte` files; no `src/main.ts` | `67-cakepanz/package.json`: svelte only; README says engine is `colors/src/**` at `4ca9a071` copied verbatim |
| Engine | Its own (legacy), unseeded | Source of truth, tip `bebe8e0` | Frozen snapshot: 52 files, 48 byte-identical to Colors' tip, 4 differ (`draft.ts`, `flex.ts`, `slots.ts`, `value.ts`: the later flex-table work); lacks the 5 newer core files (`events`, `fold`, `keyedrng`, `pack`, `legacyprovider`) |
| `npm ci` | n/a | passes (exit 0) | passes (exit 0) |
| Tests | none found | `npm test`: **318 pass / 2 fail of 320** (reproduces the reported number) | `npm run test:engine`: **284 pass / 0 fail** (the old engine's tests) |
| Type check | `npm run tsc:check`: baseline OK, 91 errors pinned at 91 (a ratchet, not zero) | no script; `npx tsc --noEmit -p .` gives 82 errors, all in `test/engine/` (missing `node:test` types), **0 in `src/`** | |
| Production build | n/a | **`npm run build` FAILS**: `Failed to resolve /src/main.ts from colors/index.html`. `colors/build/build.mjs` is a separate esbuild script that needs an entry argument and is not what `npm run build` runs | `npm run build` passes: 151 modules, JS 240.74 kB / 78.99 kB gzip, CSS 6.91 kB |

Commands: `cd <extracted>/colors && npm ci && npm test; npm run tsc:check; npm run build`; `cd <extracted>/67-cakepanz && npm ci && npm run test:engine; npx tsc --noEmit -p .; npm run build`.

**Important side finding (VERIFIED).** Colors' tests are not self-contained: with only the `colors/` folder present, 12 tests fail (`ENOENT` for `data/nfl/madden27-ratings.csv`, `tools/mathlab/design.json`, `tools/mathlab/witness.mjs`). With the repo-root `data/` and `tools/` present, the result is 318/320. Any CI must check out the whole repo, not just `colors/`.

The 2 failures (VERIFIED by name): `base: totals are not comparable...` (flex-base total) and `E5 pins: the engine and data stamps...`. Both are the held-by-Owner items (stale pins after the flex-table work), not engine breakage. INFERRED, not investigated further.

### 2.2 Options

- **A. Colors is the single product tree; Cakepanz's UI is moved into it, and the engine copy is deleted.** One engine, one test suite, no drift. Cost: re-home 10 components and a build config, decide the framework first (D1).
- **B. Cakepanz becomes the product tree; the newer Colors engine files are copied over.** Cheapest to a runnable build today, because it is the only one that builds. Cost: keeps the "UI owns a private engine copy" pattern, which is exactly how 4 files already drifted.
- **C. Leave both until the framework test finishes.** Cost: the drift continues and every agent keeps asking which one is real.

### 2.3 Recommendation (confidence: HIGH on the engine, MEDIUM on the UI)

- **Engine: Colors is canonical.** It has the newer code, the kernel, 320 vs 284 tests, and the flex table. HIGH confidence.
- **No more engine snapshots.** The UI imports the engine from one place. HIGH confidence. This is the rule that matters more than the folder name.
- **UI home: option A, but sequenced after the D1 answer**, so the 10 components are not moved twice. If the Owner keeps Svelte (my default, section 6 D1), the move is a mechanical re-home and can happen right after approval.
- **Do not call Colors "the app".** Today it is an engine plus a build config that points at a file that does not exist. Either add the UI (A) or delete the dead `index.html` / `vite.config.js` so the build step is honest.

**Reasons to choose differently:** if the Owner wants something runnable in a browser this week, B is the fastest path, and it is the only option where `npm run build` already works. If the Owner distrusts a big move, C buys time at a known cost.

**What this does NOT settle:** what happens to the live w89 shell (frozen reference `Football-Sim-PreColors.html`, sha256 prefix `40233d6be00e987c`, REPORTED). The cutover plan is a roadmap item (section 8), not a Track decision.

---

## 3. CI: the Owner's minimal gate, mapped to verified commands

Owner ruling: clean install, type check, tests, production build, "using verified commands and working directories".

| Step | Colors (`colors/`) | Cakepanz (`67-cakepanz/`) |
|---|---|---|
| Checkout | **whole repo** (tests read `../data`, `../tools`) | whole repo or just the folder |
| Install | `npm ci` (works) | `npm ci` (works) |
| Type check | `npm run tsc:check` (works, ratchet 91/91) | **no script**; `tsc --noEmit` fails only on test files for lack of `@types/node` (one dev dependency, needs Owner approval) |
| Tests | `npm test` (318/320, **2 known red**) | `npm run test:engine` (284/284) |
| Build | **fails** (`src/main.ts` missing) | works |

**What this means.** The gate is runnable today on Cakepanz except type-check, and on Colors except build. It cannot go green on Colors until (a) the 2 held failures are re-pinned or marked, and (b) the build is made real or removed. A required-green gate with 2 known reds trains everyone to ignore it. Recommendation: the gate runs from day one but starts as **report-only** on Colors, becoming required when the two pins are fixed.

Other CI facts (VERIFIED): no `.github/workflows` on `architect`, `main`, `council/muse`; the only workflow file is a dead nested one under `gh-pages: Football-Sim-Z-post-blue-w71/football-sim-next/.github/workflows/ci.yml`. Node is not pinned (no `.nvmrc`, no `engines`). `npm ci` printed an audit-issues notice in both tracks; I did not capture counts. **Do not run CI on `gh-pages`**: it is a publishing branch and the Cakepanz tree lives there, which is another argument for A or for moving the tree.

---

## 4. Assessment of prior AI recommendations

Limit: I could verify MUSE's audit file directly. GPT, Gemini, DeepSeek, Grok and Q are assessed from the points the Owner relayed and my own earlier summary; I no longer have their full texts in view, so treat those rows as REPORTED.

### 4.1 MUSE audit (`stack-audit-deliverables-2026-11-12.md`): checked line by line where possible
- **Confirmed (VERIFIED):** React installed and not imported (`git grep` for react imports in `colors/src`, `build`, `test`: none); Svelte 5 + Vite, no SvelteKit; Vite 8 (Colors) vs 7 (Cakepanz); no CI; 318/320 tests; Cakepanz has no tsc script; two RNG/Math.random mentions in `colors/src` are comments only; no `.github/workflows` anywhere live.
- **Wrong or stale:**
  1. "No save versioning, no `version` field": **false.** `colors/src/core/envelope.ts` has `SCHEMA_VERSION = 1`, `schemaVersion`, `engineVersion`, `dataVersion` (SHA-256), `saveId`, `saveRevision`, slots A/B/C, and refuses saves from a newer build (`newer-version`). `core/profile.ts` has `PROFILE_VERSION = 2`. `versions.ts` has a `drift()` check. `core/saver.ts` is an autosave queue with newest-wins and bounded retry.
  2. "No Git tags were found": **tags exist** (`git ls-remote --tags origin`): `e2e-40233d6b-2026-10-21T0037Z`, `e2e-evidence-2026-10-20T225702Z`, and `retired/*`. They mark evidence and retired seats, not releases, so "no release tags" is still true.
  3. "The live site is gh-pages (w89, 67 Cakepanz)": **w89 is not Cakepanz** (blob identical to `Football-Sim-Z-post-blue-w89.html`; no "cakepanz" in it).
  4. "Is Vite or esbuild the build path? don't know": **answered**. `npm run build` is `vite build`, and it fails in Colors. `build/build.mjs` is a manual, self-described "UNVERIFIED" esbuild script.
- **Genuinely missing, MUSE right (VERIFIED by grep):** no storage-event, `BroadcastChannel` or lock handling (multi-tab); no export/import of saves in Colors source; quota failures are noted in a comment as future work (`F9`); no migration (only schema v1 exists, so none is needed yet).
- **Not checked by me:** Biome (`tools/lint.mjs`) actually runs; branch protection and GitHub settings; fonts in the repo; custom domain.

### 4.2 Agreement and disagreement among the agents (REPORTED unless noted)
- **GPT.** CI plus nightly lab: accept CI; defer nightly lab (the Lab is a Python oracle and the TS port is paused; automating it now is wasted). Engine boundary enforcement: accept; I verified the existing purity test scans only `src/sports/nfl/engine/`, not `core/`, `view/`, `app/`. Save safeguards: accept in part, much already exists (4.1). ESLint+Prettier: reject, agree with MUSE (churn, no benefit). Framework experiment: see D1, I would shrink it.
- **Gemini.** React removal only if verified: verified, safe to remove, but it is a dependency change so it needs Owner approval. Vite divergence: verified; fix with the UI re-home. Biome formatter for product: defer (a repo-wide reformat is noise during engine work). `svelte-check`: add if Svelte stays. Cakepanz `tsc` script: agree, but it needs `@types/node`.
- **DeepSeek.** Resolve the product track first: agree, section 2. Decision rights, single source of agent rules, receipts, staged remediation: agree (section 7).
- **Grok.** Phased plan with measurable criteria: agree; section 8 uses them. One edit: per the Owner's 13 Nov ruling, historical totals are tested against, not gated on.
- **Q.** Acknowledge and plan before consequential work: agree; this document is that for the next phase.
- **Where they disagree with each other:** GPT wants ESLint+Prettier, MUSE says keep Biome (I side with MUSE); GPT frames a four-framework test, MUSE adds a SvelteKit-vs-Vite question (I would not test frameworks that lack a stated need, D1/D2).

---

## 5. Target architecture (RECOMMENDATION, not decided)

- **Shape:** one repository, one product tree: `engine/` (framework-free TypeScript, no DOM, no clock, no `Math.random`), `app/` (state, saves, view-models, still framework-free), `ui/` (the only layer that imports a framework). Today's `colors/src/{core,sports/nfl/{engine,app,view},platform}` already match this except `ui/`. Cakepanz's `src/lib/**` becomes `ui/`.
- **Frontend:** keep Svelte 5 + Vite as an SPA (no SvelteKit) unless the Owner has a concrete reason. Rationale: 10 components already exist; framework swap cost is HIGH and the benefit is unmeasured. Svelte is not a lock: the engine and `app/` never import it, and I would keep it that way with a mechanical check (D13).
- **Engine:** one play-level, event-sourced model (the 11 Nov design plus plan v2), as one section of this document: kernel, keyed RNG, rules and packs as data, two views (Monte Carlo and Markov solver), the four-slot rule for every "fluctuating" feature, off-switch / mean-preservation / identification-label gates, frozen-fold seasons, `engineVersion` plus pack hash in every save. Era-capable pack format, one pack now (ruling 1). Form resets each season (ruling 3).
- **Data model:** JSON-plain values only (the kernel already rejects non-plain values). Saves are envelopes with schema/engine/data stamps (exists). Finished seasons freeze as folds, not as replay-from-seed (plan v2, 4b).
- **Persistence:** keep localStorage behind the adapter. Add, in this order: save export/import file (the real backup), migration scaffold (a table of `from -> to` functions, empty at v1), quota error classification (the saver already has the hook), multi-tab guard. IndexedDB only when a save outgrows localStorage; I have no measurement yet (UNKNOWN: save size; plan v2 reports about 1.13 MB per season for the old replay path, so the quota risk is real, REPORTED).
- **Testing:** Node test runner for engine and app (already the case); add one Playwright smoke (page loads, draft one pick, save, reload) only after the UI home is decided. Keep golden files and the determinism test. No coverage target.
- **Analytics tools:** the Simulation Laboratory (section 9). Not user analytics, not Sentry, not a database.
- **Hosting:** GitHub Pages now; Cloudflare Pages later if a custom domain or headers are wanted. Static only. No server code until a feature needs one; the engine stays server-ready by the same boundary check.
- **Performance:** UNKNOWN. Nothing has been timed. Before any Web Worker decision (D15), time one season in Node and in the browser. Plan v2 proposed a 200k plays/s gate; that number is a guess, the Owner should treat it as one.

---

## 6. D1-D20 decision register

Labels: **Owner** = needs the Owner; **Implement now** = small, safe, ready once the Owner approves this assessment; **Defer** = do not build yet; **Investigate** = needs a measurement first. "Rec." is my recommendation, with confidence.

| ID | Decision | Label | Rec. and reason |
|---|---|---|---|
| D1 | Frontend framework | **Owner** | Rec.: stay on Svelte 5 + Vite; drop the four-prototype test, or cut it to a time-boxed 2-way (Svelte vs React) on the focus contract only if the Owner has a stated reason to leave Svelte. Medium confidence. Reason: unmeasured benefit, HIGH switching cost, Owner stated Svelte is not a lock, so staying is cheap to revisit later. |
| D2 | SvelteKit vs Svelte+Vite | **Owner** (default: decide now) | Rec.: Svelte + Vite SPA, no SvelteKit. High confidence for a static, offline-first, no-server product. Revisit only when a server exists. |
| D3 | CSS system | **Defer** | Rec.: keep plain scoped CSS. Add one tokens file (colors, spacing, type) when the third screen appears. Medium. |
| D4 | Component library | **Defer** | Rec.: none. 10 hand-built components do not justify one. |
| D5 | Icon library | **Defer** | Rec.: when needed, one icon module; library choice later. |
| D6 | Charting | **Defer** | Rec.: none until the stats surface has a spec; the Lab emits its own HTML tables. |
| D7 | Linter (Biome vs ESLint+Prettier) | **Investigate**, then keep | Rec.: keep Biome. I did not run it, so first confirm `node tools/lint.mjs` runs on a clean clone. |
| D8 | Product formatter | **Defer** | Rec.: enable once, at a quiet moment, as a single "format only" commit; not during the engine port. |
| D9 | CI | **Implement now** (after approval) | Rec.: the minimal gate in section 3, report-only on Colors until the 2 pins are fixed. High. |
| D10 | Database | **Defer** | Rec.: none until cloud saves or multiplayer is a committed feature. |
| D11 | Auth | **Defer** | Rec.: none. |
| D12 | Hosting | **Defer** | Rec.: stay on GitHub Pages; move the Cakepanz tree off the publishing branch. |
| D13 | Engine boundary enforcement | **Implement now** | Rec.: extend `test/nfl/purity.test.ts` to `core/`, `view/`, `app/`, and add a no-framework-import rule for everything except `ui/`. About ten lines. High. |
| D14 | Save safeguards | **Implement now (small items)** | Rec.: much exists (4.1). Add export/import, migration scaffold, quota classification, multi-tab guard. Not a format change (schema stays v1). The live w89 shell's saves are UNKNOWN; check before any cutover. |
| D15 | Web Workers | **Investigate** | Rec.: measure first; engine purity already makes it a contained refactor if needed. |
| D16 | React dependency | **Implement now** (Owner approves the dependency change) | Rec.: remove `react`, `react-dom` (VERIFIED unused). Also decide `esbuild` / `esbuild-svelte`: only `build/build.mjs` uses them. Remove both together with that script, or keep and document it. |
| D17 | Vite 7 vs 8 | **Defer** to the UI re-home | Rec.: one version in one `package.json`. Cakepanz pinned plugin 6 on Vite 7 to avoid a peer conflict (REPORTED in its README). |
| D18 | Platform concept | **Defer** | Owner ruling 4: football only until football ships. Keep `SportModule` as a seam; build no DSL. |
| D19 | PWA | **Defer** | Rec.: after a shippable app; offline is already satisfied by a static site plus localStorage (INFERRED). |
| D20 | Error monitoring / analytics | **Defer** | Rec.: none; the privacy stance and free-tools rule point to none. |

---

## 7. AI-agent operating model

- **Verified shape:** one branch per seat (`council/<seat>`; 104 branch heads on `origin`, VERIFIED with `git ls-remote --heads origin`), the Owner admits seats, the Architect integrates and is the only one who builds the product, work flows through `_agents/QUEUE.md`. There are no pull requests and no required reviews; "three reviews" is convention. Instruction files are many: `AGENTS.md`, `CLAUDE.md`, `PROJECT-KNOWLEDGE.md`, `_agents/START-HERE.md`, `START-OF-CHAT.md`, `END-OF-CHAT.md`, `ONBOARDING.md`; `origin/main` and the Architect branch roots carry 41 (`main`) and 45 (Architect branch) top-level Markdown files, VERIFIED.
- **Recommendation:**
  1. **One source of agent rules.** A single `AGENTS.md` of under two pages; every other instruction file becomes a one-line pointer or moves to `_archive/`. Do not do this now (documentation churn mid-review), but plan it (section 10).
  2. **Adopt MUSE's 11 draft rules with three edits:** receipts must name the working directory and exact command (my CI mapping shows "tests pass" depends on which directory); "do not add a dependency" gets an explicit Owner-approval line, not a proposal-and-wait ambiguity; "don't know" stays.
  3. **Make rules into checks.** Boundary test (D13), the CI gate (D9), a lockfile check. A rule an agent can break silently is a wish.
  4. **Decision rights:** Owner = product, protected constants, ratings, framework/dependency/save-format/merge. Architect = engine, integration, tests. Other seats = proposals and reviews through their own branches. Nothing merges to `main` without the Owner.
  5. **Fewer seats, not more.** Each seat adds a branch, a lane, and reviews. I would not admit new ones until the CI gate exists.

---

## 8. Phased roadmap and 30-day plan

Phases are gated by evidence, not by dates. Per Owner ruling 2, "historical totals" are reported and explained, not pass/fail.

- **Phase R (review):** Owner reads this; answers section 11. No code.
- **Phase H (hygiene), about 1 week after approval:** CI gate (report-only on Colors); Node pinned; purity test extended to `core/`; D16 React removal; the 2 held pins fixed once the Owner confirms the flex table is final; Colors' dead build either given a real entry or deleted.
- **Phase U (one product tree), about 1-2 weeks:** per Track Brief option A; engine copy deleted; the Cakepanz UI runs on the current engine; one smoke test.
- **Phase 1b (engine TS port):** only after the Owner approves it separately. Gates: determinism, size of the shipped pack, a throughput number, and a distribution comparison to the Python lab, reported not gated.
- **Phase 1c / 2 / 2b:** situation layer and automatics; ratings and lambda (largest UNKNOWN); focus, form (reset each season), gravity as pack data.
- **Phase P (persistence):** export/import, migration scaffold, quota and multi-tab, before any public cutover.
- **Phase C (cutover):** replace the live w89 shell; keep `Football-Sim-PreColors.html` as the frozen reference.

**30-day plan (if approved today):**
- Days 1-3: Owner answers; I write the CI workflow and Node pin as a PR-sized commit (the one allowed code change class, with approval).
- Days 4-7: purity extension; React removal; fix or mark the 2 pins; decide Colors' dead build.
- Days 8-14: UI re-home (option A) or (B) per decision; Playwright smoke.
- Days 15-21: persistence items (export, migration scaffold, quota, multi-tab).
- Days 22-30: Owner reviews the running app; only then, a separate go/no-go on Phase 1b.

---

## 9. Simulation Laboratory spec (minimum useful version)

- **Purpose:** answer "does the model behave like football" and "did this change move anything it should not have", with numbers the Owner can read.
- **Inputs:** an engine version, a pack hash, a seed range, a scenario (neutral league; a roster change; a focus on/off).
- **Outputs, every run:** the engine/pack hash, N, wall-clock, and a table of league totals (points, plays, drives, yards, time of possession), win-distribution spread, playoff-seed frequencies, and the Owner's calibration targets (90% playoffs, about 35% SB, 25% title; REPORTED from earlier rulings) shown next to measured values with a plain pass-or-explain note. Nothing blocks a build (ruling 2).
- **Checks that DO block:** determinism (same seed, same log hash), off-switch equals baseline (log hash), and no `Math.random`/clock in the engine (purity test).
- **Sizes:** N=100 for the quick gate, N=1000 for calibration (the existing convention, REPORTED). Nightly automation deferred (D9 note).
- **Where:** Python lab stays the oracle today (`tools/mathlab/`); the TS lab is a Node script over the same shape, written after Phase 1b. Output is a Markdown report plus JSON, no dashboard.

---

## 10. Documentation and change plan

- Keep: `claude/00-READ-FIRST.md`, `claude/NOW.md` (15 lines), `claude/rulings/` (append-only), this assessment.
- Add one `docs/STACK.md` (one page: what is in the repo, how to run, test, build; generated from section 2/3 facts) so "which tree is real" is never again an audit question.
- Consolidate instruction files per section 7.1 in one reviewed commit; archive the rest, never delete.
- Every change report: files changed, working directory and command run, result, known limits, and whether determinism, historical results, or save format are affected (MUSE rules 4-5 with the directory edit).
- Change classes: **docs-only** (Architect may commit), **tooling/CI** (Owner approves once), **dependency/framework/save-format/merge** (Owner approves each).

---

## 11. Owner decisions needed (final list, in order)

1. **Track Brief:** A (Colors canonical, UI re-homed into it, engine copy deleted), B, or C. Rec.: A for the engine now, UI re-home after D1.
2. **D1/D2:** stay Svelte 5 + Vite SPA? (Rec.: yes, no four-way test unless you have a reason to leave Svelte.)
3. **Approve D16:** remove React (and decide the esbuild pair).
4. **Approve the CI gate as report-only on Colors**, plus one dev dependency `@types/node` for the Cakepanz/test type check, and Node pinned to a version you choose.
5. **The 2 red tests:** are the flex table and the engine/data stamps final enough to re-pin?
6. **Approve D13 and D14** (boundary test; export, migration scaffold, quota, multi-tab) as implement-now items.
7. **Confirm the roadmap order** (Hygiene, then one product tree, then persistence, THEN a separate go/no-go on the TS port).
8. **What happens to the w89 live shell** at cutover (keep frozen forever, or retire after parity)?

---

## 12. Original-prompt questions I have not answered

I cannot reconstruct the verbatim list of the 48 questions in section 13 of your original master prompt; the prompt text is no longer in my working context after the earlier context compaction, only its five groups and the eleven deliverables are. So this is by group, not Q1-48. **If you paste section 13 again I will map answers to Q1-Q48 one to one.**

Covered in this document: Colors vs Cakepanz (2); current product and repo state (2, 3); other agents' recommendations (4); D1-D20 (6); frontend/product architecture (2, 5); testing/CI (3, 5); persistence (4.1, 5); agent governance (7); prioritized roadmap (8); the Lab (9); documentation (10); decisions (11); the engine as one section (5).

**Not answered, and why:**
- **Product direction** (the user-facing product, who it is for, what ships first): partly in earlier rulings, not re-argued here; needs the Owner.
- **Simulation design** beyond the one-formula engine: lambda identification, form's upper bound from nflverse, throughput, penalties-world choice (now moot by ruling 2).
- **Anything about how the live w89 shell actually behaves** (its saves, its determinism, its tests): UNKNOWN; I did not open it in a browser.
- **Cakepanz in a browser:** I built it and ran the engine tests; I did not run its Playwright battery (`batteries/slice1.battery.mjs`).
- **GitHub settings** (branch protection, Issues, Projects, custom domain), **fonts in the repo (P-305)**, the **friend's Next.js repo**, **Biome actually running**: not checkable from the repo.
- **GPT/Gemini/DeepSeek/Grok/Q full texts:** assessed from the relayed points only.
- **Whether `npm audit` findings matter:** `npm ci` printed a notice in both tracks; I did not read the counts.

## 13. Blockers

1. Your review of this assessment (TS port is paused on it).
2. The Track Brief and D1/D2 answers (they set where the UI lives).
3. The 2 held pins (E5 stamp, flex-base total).
4. A Colors build that either exists or is removed.
5. Approval for each dependency or tooling change (React removal, `@types/node`, Node pin).
6. Still open from the engine track (not blocking this review): lambda identification, P-347 ratification, throughput of the TS play step.
