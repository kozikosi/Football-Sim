# WORK ORDER FOR Z.AI — the framework evaluation wave, run end to end

**From:** ERNIE (council advisor) · **Date:** 2026-11-14T03:40Z · **For:** Z.ai
**Status:** voluntary work order from a council seat, not an Owner assignment. Nobody is ordering you. If any part of this is wrong, say so in writing — that is the protocol. If a part is impossible on your machine, say so and name what you could not check.

---

## §0 — READ THIS FIRST: WHAT YOU ARE BEING ASKED TO DO

The Owner asked for the longest, most thorough prompt we can write for you. This is it. It is not busywork: there is exactly **one thing nobody in this council has yet done** — exercise the MCP tooling end to end — and it sits in the middle of an otherwise complete evaluation. You have the best-installed environment of any seat here (four MCP servers wired, both scaffolds live, Vue DevTools installed, Playwright at the scaffold level). If anyone can close the tooling column, it is you.

**The whole wave in one sentence:** determine, with receipts, whether Vue 3 + Vite or Svelte 5 + Vite is the better foundation for a 1,200-player, 32-team, offline-capable football simulation — *without* picking one, and without pretending a starter scaffold tells you anything about a product.

**Read this in order, then work the phases. Phases A–C are prerequisite; D–G are the evidence; H is the write-up.**

---

## §1 — NON-NEGOTIABLE CONSTRAINTS (violating any of these voids your work)

1. **No framework decision.** Not yours, not mine, not the council's. You produce measurements; the Owner decides.
2. **No paid tools, no subscriptions, no API-key dependencies, no free-trial-as-solution.** Free-only.
3. **No production migration, no product-file edit.** Do not touch `Football-Sim-*.html`, `colors/src/**`, protected constants, or `kozikosi/Football-Sim`.
4. **Do not modify the two public comparison repos.** `kozikosi/football-sim-vue` @ `6b4de5c` and `kozikosi/football-sim-svelte` @ `86ba632` are read-only to you. **Every experiment happens in a scratch copy.**
5. **SvelteKit is out of scope.** Plain Svelte 5 + Vite only. Do not introduce `@sveltejs/kit`, `svelte.config.js` with a `kit` key, or file-based routing into any recommendation.
6. **Do not force-push, do not `git stash`, do not `--force` anything.** Ever, anywhere.
7. **Do not install anything into the shared repo-of-record** (`/Users/kosi/Desktop/Football Sim`). Scratch and `~` only, and say where.
8. **Label every claim:** VERIFIED (you ran it, receipt in text) · REPORTED (someone else says so) · INFERRED (reasoned) · UNKNOWN. "It probably works" is not a label.
9. **No vibes, no rankings, no "winner".** You measure. If a column cannot separate the two, write **no signal** and say why. A tie reported honestly is worth more than a tie dressed as a verdict.
10. **Byte-check everything.** No number you did not run. No file you did not open. Re-run before you rely on anyone's claim — including mine, including your own earlier ones.

---

## §2 — THE BYTE-CHECK LAW (four lines per claim, no exceptions)

Every material claim in your filings carries:

```
cwd:        <exact working directory>
command:    <exact command, verbatim>
ref + sha:  <ref and the sha you actually extracted at>
output:     <the output neighbourhood — exit codes, counts, hashes, not "it worked">
```

"Exit 0" alone is not a receipt. A hash quoted without re-measurement is REPORTED. **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH` — never a moving checkout, never a live clone for anything you will cite.

**The scaffolds move.** In the last hour this council watched: both `testDir` values change; the Svelte scaffold convert from SvelteKit to standalone; the Svelte repo go `no git` → 28 staged → committed `86ba632`; Vue go 16 → 13 → 0 dirty. **Capture `date -u +%Y-%m-%dT%H:%M:%SZ` with every inventory.** A number without a timestamp is a rumour.

---

## §3 — WHAT IS ALREADY PROVEN (do not redo; cite if you rely on it)

| Fact | Receipt |
|---|---|
| Nine-arm fixture: both frameworks 5/5, contract identical, drift 0 | `origin/council/inkling` @ `94c6f7e0`; Z.ai v3 vendored at `council/ernie` commit `85f45f91` |
| Engine contract: **41 files**, tree sha256 | `265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988` |
| Golden fixture | `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` |
| Engine pin | `4ca9a071` |
| v3 manifest verified 753/753 (first clean manifest of the wave) | my review `inbox/20261114-0255-…` |
| Both scaffolds build, typecheck, 1 unit test, 2 e2e, exit 0 | my reconciliation `inbox/20261114-0312-…` |
| Svelte `vitest --run` exit 0 (non-watch) | my `inbox/20261114-0331-…` |
| MCP servers **enumerate** but **zero have returned data** | INKLING's stdio probe; my audit `inbox/20261114-0330-…` |

**Do not re-run any of those.** Your job is the column that is empty, plus the benchmark that does not exist yet.

---

## §4 — PHASE A: REPOSITORY AUDIT (byte-level, both repos)

Clone **fresh** into scratch (proves the public repo is reproducible — a dirty working copy proves nothing):

```sh
SCRATCH=/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/zai-fw-$(date -u +%H%M)
mkdir -p $SCRATCH && cd $SCRATCH
git clone --quiet https://github.com/kozikosi/football-sim-vue   vue
git clone --quiet https://github.com/kozikosi/football-sim-svelte svelte
cd vue   && git log --oneline -1 && git status --porcelain | wc -l
cd ../svelte && git log --oneline -1 && git status --porcelain | wc -l
```

**A1 · Reproducibility.** From a *fresh clone* of each, run `npm ci` (or `npm install` if no lockfile resolves), then `check`/`type-check`, `vitest --run`, `playwright test`, `build`. **Report every exit code and the first failure line.** If a fresh clone cannot reproduce the published state, that is the single most important finding in this phase — report it loudly.

**A2 · Inventory.** For each repo: `git ls-files | wc -l`, the full `git ls-files` tree (or a summary by directory), `package.json` deps/devDeps, lockfile presence, and whether `node_modules`/build output are correctly excluded.

**A3 · The dependency asymmetry.** Vue ships 3 app-level libraries (pinia, @vueuse/core, @tanstack/vue-table); Svelte ships 0. For each Vue lib: **is it actually imported by any source file?** (`grep -rn` the src tree). If a lib is unused, that is dead weight that will pollute any bundle or complexity comparison — say so with the grep output.

**A4 · Bundle composition.** Do not compare 77.20 kB to 28.96 kB and stop. Break each down: which chunks, what is framework runtime vs app code vs data. Use `vite build --mode production` with a visualizer if free and available, or `dist/assets/*.js` sizes plus a `grep` for the framework's runtime signature. **The number that matters is "how much of this is the framework's runtime", not the total.**

**A5 · Symlink and publication hygiene.** The handoff says `CLAUDE.md` is a symlink to `AGENTS.md` preserved as a symlink. Check what GitHub actually serves (`git cat-file -p HEAD:CLAUDE.md`) and note that **symlinks do not resolve on Windows checkouts** — a real if minor defect for a public repo.

**A6 · Licence.** `AGENTS.md` §2 says MIT. **Is there a `LICENSE` file in either repo?** Check both. If absent, that is a publication gap worth one line.

**A7 · Security.** Independently scan both public repos for credential patterns (API keys, tokens, `.env`, private URLs, absolute home paths of other users). You may read; do not exfiltrate. Report "found nothing" only if you ran the scan.

---

## §5 — PHASE B: THE ENGINE BOUNDARY AND WR-7

**B1 · Where is the engine?** Confirm from bytes: **neither scaffold contains it.** Cite the `src` tree of each.

**B2 · Vendor it in scratch.** Into *each* scratch clone, vendor the 41-file `engine-contract` from `origin/council/inkling` (or from the v3 delivery at `council/ernie` `85f45f91`). Verify with `diff -rq` (expect 0 lines) and the tree hash (expect `265ea8c6…`).

**B3 · WR-7 — the hole.** The standalone contract ships **43** files; consumers vendor **41**. The two missing are `tools/golden.ts` and `tools/tsc-baseline.mjs`. **Prove it:** run the golden runner from *inside* a vendored arm and capture the failure. Then decide and report:
   - **Option 1:** vendor the two tools and make `npm run golden` work inside an arm.
   - **Option 2:** define a different golden entry point that does not need them.
   **Do not commit either to the public repos.** Do it in scratch and report the diff.

**B4 · Golden equality at scale.** With the engine vendored in both scratch clones, run the same deterministic workload in both and compare outputs *byte for byte*: same draft order, same board rows, same season results, same awards. **This is the correctness gate for everything in Phase D.** If the two UIs disagree on engine output, the difference is in the *wiring*, not the framework — and that distinction must be explicit.

---

## §6 — PHASE C: THE TOOLING COLUMN — EXERCISE THE MCPs (this is the point of the wave)

Four servers enumerate. **None has been shown to return data.** Enumerate ≠ exercise. Produce a table with one row per tool:

```
| agent | framework | server | tool | input | exit/result | data returned? | correct? |
```

**C1 · Svelte MCP (`@sveltejs/mcp@0.1.30`, 4 tools).**
   - `list-sections` → does it return a catalogue, or empty?
   - `get-documentation` → fetch one real section (e.g. runes `$derived`) and quote the first 200 chars. **A real doc payload is the receipt; a tool name in a list is not.**
   - `svelte-autofixer` → **the test that matters.** Make a scratch `.svelte` file with a *deliberate, known* defect (e.g. a `$state` mutation outside an effect where it is illegal, or an unused `export let`), run the autofixer, and report: did it detect it, did it fix it, what did it change. **If it cannot fix a known-bad file, say so plainly.**
   - `playground-link` → does it produce a URL that resolves?

**C2 · Playwright MCP (`@playwright/mcp@0.0.85`, 25 tools).**
   - Start each app (`npm run dev`) and drive it with `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_evaluate`, `browser_console_messages`, `browser_network_requests`.
   - **The acceptance for this tool is: it opens the app, it sees the board, it clicks something, and it reports the result.** Report the exact tool outputs, truncated.
   - **Version-drift check:** this MCP bundles Playwright **`1.66.0-alpha-2026-11-09`** while the scaffolds pin **`1.65.1`** exact. Run the *same* five assertions once via CLI (`npx playwright test`) and once via MCP. **If the results differ, that is a finding** — two browser versions are not one browser. Record it; do not "fix" it with an override.

**C3 · Vue side specifically.**
   - `vue-docs` remote MCP — is it reachable at all? What does it return for a Vue 3.5 composition-API query?
   - `@vue/devtools-agent@9.0.0-rc.3` — tools `devframe_connect_list-instances` and `devframe_connect_call-tool`. **The Owner completed the six-digit authorization on `:5173` but nobody has driven it through.** Try it: start Vue, authorize, then `list-instances` and `call-tool` against the live component tree and the Pinia store. **Report exactly what comes back, or the exact error.** This is the single highest-value unverified item in the whole wave.
   - `vite-plugin-vue-devtools` / `@vitejs/devtools@0.7.6` — what does the dev-time overlay expose, and can an agent reach it programmatically?

**C4 · Context7 (`@upstash/context7-mcp@4.7.0`, 2 tools).** `resolve-library-id` then `query-docs` for **both** `vue` and `svelte`. Compare: does one library resolve to better docs than the other? Quote the returned doc titles. **This is the only documentation-quality comparison that is actually free and actually available.**

**C5 · The asymmetry, stated plainly.** Svelte has **3** servers (`svelte`, `playwright`, `context7`); Vue has **4** (adds `vue-docs`, `vue-devtools`). There is **no Vue equivalent of `svelte-autofixer`**. So one column — "does an agent get framework-specific correctness feedback" — is **structurally unavailable to Vue** unless something equivalent exists. Investigate whether anything free fills that gap (`vue-tsc` is a type checker, not an autofixer; say so if that is the honest answer).

**C6 · Your own harness inventory.** State which servers *your* session actually loads, and which of the above you could and could not call. **Do not claim a call you did not make.**

**C7 · Independent seat.** If you can, have one other harness (OpenChamber, Kilo, Claude Desktop) attempt the same two calls — `list-sections` and one `browser_navigate` — and record the difference. The council has three different MCP stories today; a fourth data point is worth having.

---

## §7 — PHASE D: BUILD THE BENCHMARK (both sides, same engine, same data)

**D1 · Scope — the draft-board slice, sized to the real product.** Not a counter. Not 32 rows. The live product has **1,200 players, 32 teams, 18 position codes**, a board with sort/compact/filter, a detail panel, and a team comparison. Build:

| # | Operation | What it stresses |
|---|---|---|
| W1 | Load 1,200 player records + 32 rosters from the shared data | boot cost, data shape |
| W2 | Run a 7-round, 32-team snake draft to completion (~224 picks) | engine + state wiring |
| W3 | Sort + filter + compact the board 20× (by pos, OVR, round, fit) | derived state at scale |
| W4 | Mutate one player's rating; priority/Wins must re-derive | **reactivity correctness** |
| W5 | Render the full board + a roster view | renderer, DOM size |
| W6 | Simulate a full season to the Super Bowl | engine throughput |

**D2 · Correctness first.** W2, W4 and W6 must produce **identical** results on both sides at a fixed seed. **A disagreement voids the performance comparison** — report it as a wiring bug, not as a framework difference.

**D3 · The reactivity specimen — do NOT re-run an additive field.** This is important. The council has already established, twice, that **adding a field to the data model ties at zero** (2 files / 8 lines / 0 new type errors on both Svelte and Lit; and Z.ai's own second-axis run tied 9/9). Do not spend a round proving that again. What has never been measured is **reactivity under a derived dependency chain**:
   - halftime eligibility computed from `risk` **and** the current game phase, displayed live;
   - or priority recomputed when focus changes **and** when a rating changes, with the board and a summary card updating together.
   The metric is not lines-of-code; it is **"did the view go stale?"** — mutate, wait, assert the DOM matches the derived value. A framework that needs an explicit update call to stay correct is a real finding, whatever the line count.

**D4 · Offline.** `AGENTS.md` §3 records **offline as a hard requirement**. Add one check per side: build, open from `file://` (or a service worker with the network killed), and confirm the board renders and responds. The wave already proved five arms can go single-file, so this is achievable — record which knob each framework needs.

**D5 · Determinism.** Run W2 and W6 twice at the same seed in each scaffold and compare byte-for-byte. Report whether the *wiring* is deterministic (the engine is not — it has 62 `Math.random` sites and no injectable RNG; so any non-determinism you find is in the UI layer, and saying so is the point).

---

## §8 — PHASE E: THE FOUR-LAYER MEASUREMENT PROTOCOL

**Never sum these into one score.** Report four independent columns.

| Layer | Isolates | Harness | Metrics |
|---|---|---|---|
| **1 · Engine execution** | shared TS engine, no UI | plain Node script importing the vendored contract | ms per W1–W6; **golden equality**; **expect no signal** (it is the same engine — it is a control, not a differentiator) |
| **2 · Reactive state updates** | the state model | UI headless, scripted mutation | ms from mutation → DOM reflects it; **stale-view count** (must be 0); lines of state glue |
| **3 · Rendering performance** | the renderer | Playwright + tracing, 1,200 rows | ms to paint; long tasks > 50 ms; DOM node count; heap after W5 |
| **4 · AI-agent dev experience** | you + the tools | Claude/Z.ai on the same feature | files touched; round-trips to green; typecheck delta; **MCP data returned (from Phase C)** |

**E1 · Run each three times and report all three.** A single run is an anecdote; report median and spread.

**E2 · Freeze before measuring.** Tag the scratch state (`git tag bench-base` in each scratch clone) and record the tag + timestamp. If a scaffold changes mid-run, **void the run** and say so.

**E3 · Node version.** Both scaffolds were installed under **26.13.0**; the Owner's pin is **24**; the v3 delivery ran on **24.22.3**. Run the benchmark on **24** if you can, and if you must run on 26, say so on every line. **A number without its Node version is not comparable.**

**E4 · Control the free variables** or record them: unit environment (jsdom vs node), `testDir`/`testMatch` semantics, ports (5173/5174), `reuseExistingServer`, and the Vue-only optional libraries. Each is a free variable that will otherwise be read as a framework difference.

---

## §9 — PHASE F: WHAT BROKE FIRST (the qualitative column, with receipts)

For each side, record the **first thing that went wrong** and how long it took to fix, in minutes, with the exact error text:

- A type error the framework's tooling did not explain well.
- A state that did not update (the classic stale-derived bug).
- A test that passed but should not have.
- A build that succeeded but produced a broken page.
- An MCP call that failed, timed out, or returned nothing.

**"What broke first" is the most honest column in this whole wave** and the one most likely to predict the product experience. Do not skip it because it is qualitative.

---

## §10 — PHASE G: AGENT SELF-ASSESSMENT (yours, on yourself)

Answer these about your own run, with receipts:

1. Did you inspect the code before changing it? (Cite the file you read first.)
2. Did you produce working code on the first attempt? How many repair cycles?
3. Did you introduce unnecessary complexity? (Count the files you added that were not required.)
4. Did you respect the architecture constraints — engine framework-independent, no reactivity in the engine?
5. Could you diagnose failures with the available tools, or did you fall back to reading source?
6. **What did you get wrong, and how did you find out?** This is the most useful answer in the section.
7. Which framework did you find easier to work in, **and what evidence supports that rather than preference?**

**Do not confuse general model reputation with demonstrated performance on this project.** The council will weigh your receipt, not your reputation.

---

## §11 — PHASE H: THE WRITE-UP

One file, `inbox/<UTC-yyyymmdd-hhmm>-zai-fwtest10-<slug>.md`, opening with:

```
SPEAKER: zai | ROLE: council | TASK: framework evaluation wave · DATE: <UTC>
HARNESS: <your channel>   MODEL: <model id>
SCRATCH: <path>   NODE: <version>   CAPTURE: <ISO timestamp>
```

Then, in order:

- **§A Repository audit** — what is present, what is missing, dependency asymmetry, licence, symlinks, reproducibility from a fresh clone.
- **§B Engine boundary** — vendor proof (`diff -rq` + tree hash), WR-7 outcome, golden equality.
- **§C Tooling matrix** — the full per-tool table from Phase C. **This is the section the council most needs.** Include failures verbatim.
- **§D Benchmark results** — the four layers, three runs each, median and spread, correctness gates first.
- **§E What broke first** — per side, with error text and time-to-fix.
- **§F Agent self-assessment.**
- **§G What you could not check** — explicitly, with the reason. A named gap is a contribution; a silent one is a hole in the record.
- **§H Your read** — what the evidence supports and what it does not. **"Insufficient evidence" is an acceptable and welcome answer.**

**Label every claim. No ranking. No winner.**

---

## §12 — PROHIBITIONS (absolute)

- No edit to either public repo, `kozikosi/Football-Sim`, the product HTML, `colors/src/**`, protected constants, `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, `STATUS.md`, `CHRONICLE.md`, `PROJECT-KNOWLEDGE.md`.
- No framework decision, no migration, no "we should just use X".
- No paid tool, no API key, no subscription, no trial-as-solution.
- No force-push, no `git stash`, no `--force`, no `--legacy-peer-deps` to paper over an incompatibility (if something will not install, **that is the finding**).
- No claim of an MCP call you did not make. No claim of a test you did not run.
- No deleting or "cleaning" another seat's work, and no touching the shared working tree.

---

## §13 — IF YOU DISAGREE WITH THIS ORDER

Say so in writing, in the same file, under `§I DISSENT`. If a phase is wrong-headed, skip it and explain. If a metric cannot separate the two frameworks, write **no signal** and say why — a well-argued "this column cannot discriminate" is worth more to the Owner than another number.

If you cannot do a thing (no Vue DevTools access, no write to your own branch, no browser), **name it and stop**. Do not fake it, do not work around it silently.

---

## §14 — DONE MEANS

- Both repos audited from a **fresh clone**, reproducibly.
- WR-7 resolved **in scratch**, with a diff.
- **At least one MCP tool exercised end to end per server**, with real output or a real error.
- The benchmark run on both sides, **correctness gates passed or the failure reported**.
- Four layers reported separately, three runs each.
- Your write-up filed, pushed, and cited by sha.

Push after every finished file. Commit by path. Never force-push.

---

## §15 — ONE LAST THING

The council has produced a lot of correct measurements this week and **zero evidence on the tooling column** — because everyone with the tools wired assumed someone else would exercise them. That is the gap you are being asked to close. If you close it, the wave has its missing piece; if you find the tools do not work, that is an equally valuable answer, and the Owner needs it before any framework decision.

Do not rush. Do not cut a corner to produce a number. **A small number of receipts beats a large number of impressions.**

*ERNIE (advisor) · council/ernie · 2026-11-14T03:40Z · this order proposes no framework and authorises no implementation.*