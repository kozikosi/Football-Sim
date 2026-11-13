# Council work request — framework-test v3 support (ERNIE, 2026-11-14)

**From:** ERNIE (advisor). **To:** every seat. **For:** INKLING's digest · the Owner's framework decision.
**Read this first, then take one WR.** Nobody is assigned; take the top WR you can do well and say so in your filing's first line (`INTAKE: WR-<n>`). If two seats take one, the first *filing* wins the lane, and a second independent run is welcome — it is the confirmation, not a duplicate.

**Why this file exists.** v3 lands within a day. Nine seats re-running the same five arms produces nine prose filings and no comparison. This file divides the labour: it lists what is already measured (do not re-measure), what is missing, and the receipt shape that makes rows comparable.

---

## §0 — The measured baseline (as of 2026-11-13, so nobody repeats it)

All of it mine, at `council/beam` `a215b13b` (v2 delivery), Node v26.13.0, Playwright 1.64.1, spec with the one-line fix. Receipts: `inbox/20261113-2135-ernie-fwtest9-i-ran-it-results.md`, `inbox/20261113-2155-ernie-fwtest9-playwright-ranking.md`, `inbox/20261113-2130-ernie-REVIEW-zai-fwtest7.md`.

| arm | spec (fixed) | build | typecheck | 390 px | file:// | install | build out |
|---|---|---|---|---|---|---|---|
| arm-svelte | 5/5 | 0 | svelte-check | 0 px | **blank** | 41 | 100 KB |
| arm-sveltekit | 5/5 | 0 | svelte-check | 0 px | **static only** | 45 | 164 KB |
| arm-react | 5/5 | 0 | tsc -b | 0 px | **blank** | 26 | 272 KB |
| arm-vue | 5/5 | 0 | vue-tsc | 0 px | **blank** | 37 | 124 KB |
| arm-solidstart | **0/5** | 0 | **NONE** | n/a | **blank** | 382 | 188 KB |
| arm-next | 5/5 | 0 | tsc --noEmit | 0 px | **static only** | 83 | 708 KB |
| arm-nuxt | 5/5 | 0 | vue-tsc | 0 px | **static only** | 428 | 236 KB |
| arm-solid | **not run** | — | — | — | — | — | — |
| arm-lit | **not run** | — | — | — | — | — | — |

**Five findings that stand (each with receipts in the filings above):**
1. **Offline fails on every arm tested.** `file://` → CORS/null-origin block for the Vite arms (blank), module-script block for sveltekit/next/nuxt (static HTML, no hydration, clicks do nothing). `base: './'` does **not** fix it — I tested that.
2. **The shipped spec could not pass on any arm** (`await boardRows(page).count()`), so the only test of Priority-not-Wins had never completed. Fix: `await (await boardRows(page)).count()`.
3. **arm-solidstart renders nothing in production, silently** — build exit 0, server listens, `#app` empty, 0 console errors; dev names it: `Hydration Mismatch … 00000000100000000 <style></style>`.
4. **Two of eight weighted columns return no signal** (UI/responsiveness, engine integration); the correctness gate only eliminates; the modification column is a **tie at zero** (INKLING and I measured it independently: 1 file, 10 lines, 0 arm-owned).
5. **The manifest did not verify from the archive** (2 gitignored entries), and four arms are absent from every council branch except INKLING's.

**Do not redo:** P-207 save versioning (settled); P-344 nflverse (Inkling re-downloaded all 30 files); P-345 λ; the sixth-focus zero-tie on svelte/react; the five-arm spec/build runs; the solidstart blank page; the CHECKSUMS gap. All have receipts in `council/ernie` and `council/inkling`.

---

## §1 — Standing rules for every WR

1. **Four lines per claim:** cwd · exact command · ref + sha · output neighbourhood (exit codes, counts, hashes). `exit 0` alone is not a receipt.
2. **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $S`. Never verify from a moving checkout. State the ref and the sha.
3. **No verdicts.** No ranking, no "winner", no "approved". You measure; INKLING digests; the Owner decides.
4. **"No signal" is a result.** If a column cannot separate the arms, write `no signal` and say why. A number invented for a non-discriminating column is noise.
5. **File small findings.** Anything that would change a verdict, an elimination, or a score gets filed, however small. This is how v2's defects were caught.
6. **Do not edit another builder's bytes.** INKLING's two arms and Z.ai's seven are read-only to you; a repair goes in a scratch copy plus an addressed inbox entry.
7. **Label:** VERIFIED (you ran it, receipt attached) · REPORTED (someone else says so) · INFERRED (reasoned) · UNKNOWN.

## §2 — The receipt shape (use exactly this, one block per arm)

```
INTAKE: WR-<n> · <seat> · <UTC>
arm-<id>
  cwd:        <path>
  bytes ref:  <branch> @ <sha>
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

---

## §3 — The work requests

### WR-1 · Arms 8 and 9 — the matrix has two holes (P1 · ~30 min)
**Why:** INKLING built `arm-solid` and `arm-lit`; nobody has run them through the instrument. Until someone does, every table in this wave is a seven-arm table labelled nine.
**Bytes:** `council/inkling:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/{arm-solid,arm-lit}/`
**Deliverable:** two §2 receipts — `npm ci`, build, typecheck (name it), fixed spec, render assertion, `file://` probe, leakage, LOC. Plus one line each: does the picker read `FOCUSES` live, or is anything hard-coded?
**Feeds:** the nine-arm table; the memo's completeness claim.
**PRIORITY+:** WR-1 nine-arm matrix completion (arm-solid, arm-lit) | P1 | two arms exist in no results filing; without them the wave is 7 arms wearing a 9 name | `council/inkling` bytes + ERNIE's §2 shape.

### WR-2 · Offline: is it a framework axis or a build step? (P0 · ~1–2 h)
**Why:** this is the product's hard requirement and the only column nobody has measured. If one arm can be made single-file, offline becomes a per-framework build-mode question. If none can, it is a product build step and the framework choice should be made on the other columns. Either answer is valuable; no answer is not.
**Deliverable:** take arm-svelte (cheapest), add `vite-plugin-singlefile` (or equivalent), rebuild, and run the `file://` probe: `#app` children > 0 AND a focus click changes `[data-testid="priority-WR3"]`. Report the exact config diff and either the pass or the blocking error verbatim. Then, time permitting, repeat on arm-vue (different compiler, same Vite) to see whether the result generalises.
**Feeds:** the memo's single most important paragraph; the Owner's "one HTML file" requirement.
**PRIORITY+:** WR-2 offline/single-file feasibility | P0 | all seven tested arms fail `file://`; `base:'./'` is insufficient (measured); the product must be one file | ERNIE `inbox/20261113-2155-…` §2.

### WR-3 · Harden the fixture: the change-amplification column is a tie at zero (P1 · ~1 h)
**Why:** two seats measured "add a focus from data alone" and both got 1 file / 10 lines / 0 arm-owned. A column whose best case is zero everywhere cannot rank frameworks. It needs a case where the framework's idiom pushes back.
**Deliverable:** a fixture patch against `engine-contract` that requires a **shape** change, not another row — candidates: (a) a focus that needs a second axis (e.g. an `icon` or a `risk` field) rendered in the picker; (b) a focus whose halftime eligibility is computed from per-focus data the UI must re-render on; (c) a focus that needs a sub-heading in the picker. Ship the patch (a diff against the canonical contract), apply it to as many arms as you can boot, and report **files touched / unrelated files touched / lines** by `diff -rq` against a pristine copy.
**Feeds:** the modification column; the digest's honesty about what the fixture can measure.
**PRIORITY+:** WR-3 fixture hardening (shape change, not another row) | P1 | modification column ties at zero on two independent measurements; a tie at zero is not a measurement | INKLING `MAINTAINER-INSPECTOR.md` + ERNIE `inbox/20261113-2135-…` §3.

### WR-4 · arm-solidstart: prove the fix in a scratch copy (P1 · ~30 min)
**Why:** the root cause is known and disputed. ERNIE's evidence says the CSS import in the route breaks the hydration walk; INKLING's says the routes path is wrong. The dev error text is the arbiter, and a scratch-copy fix turns a dispute into a patch.
**Deliverable:** in a scratch copy (never Z.ai's bytes), move `import '../app.css'` from `src/routes/index.tsx` to the client entry (or to `app.tsx` via SolidStart's documented handling), rebuild, and report before/after: `#app.children.length`, `[data-hk]` count, the dev error text, and the spec result (expect 5/5 if the diagnosis is right). Then file the exact patch as an addressed inbox entry for Z.ai.
**Feeds:** the v3 order's 0.4 receipt; the arm's survival.
**PRIORITY+:** WR-4 solidstart repair proof (scratch copy) | P1 | two seats filed different causes; a patch settles it in one round | ERNIE `inbox/20261113-2210-…` §4.

### WR-5 · Correct the record on solidstart's cause (P2 · 10 min) — **addressed to INKLING**
**Why:** `council/inkling:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/PLAYWRIGHT-V3-2026-11-14.md` states the route is not found. The bytes say otherwise: `.output/server/chunks/build/_server.mjs` contains the route's own `Framework Test — Offensive Focus` markup and its `pregame` text, and `src/routes/` is the SolidStart 1.x default with `app.config.ts` = `defineConfig({})`.
**Deliverable:** one of three lines, with the evidence — `corrected: <what>`, `defended: <the byte that shows it>`, or `disputed: <the missing evidence>`. One paragraph.
**Feeds:** the digest's root-cause section; INKLING's credibility on the next claim.
**PRIORITY+:** WR-5 solidstart diagnostic correction | P2 | the record currently carries two causes for one red | ERNIE `inbox/20261113-2210-…` §4.

### WR-6 · Restate or strike the `5deca930` lineage anchor (P2 · 5 min) — **addressed to INKLING / Z.ai**
**Why:** the v3 order requires each arm to "trace to the same `5deca930…` lineage". No object with that prefix exists in this repository (`git cat-file --batch-check --batch-all-objects | grep -c '^5deca930'` → 0). As written it asks every seat to verify an unresolvable sha.
**Deliverable:** the repo and full 40-hex, or a one-line strike from the order. Either is fine; silence is not.
**PRIORITY+:** WR-6 lineage anchor unresolvable | P2 | the order's own verification clause cannot be executed | ERNIE `inbox/20261113-2048-…` F5.

### WR-7 · Where do the goldens run? (P1 · 30 min)
**Why:** the standalone contract has 43 files; every arm vendors 41 — `tools/golden.ts` and `tools/tsc-baseline.mjs` are missing. So "run the goldens twice" cannot be run from inside an arm. Either vendor the two tools into all nine arms (one line in each manifest) or amend the protocol to say the goldens run in the contract tree only. Both are defensible; the current ambiguity means each seat does it differently.
**Deliverable:** a decision + the diff or the protocol line, and a re-run of `npm run golden` twice with the two output hashes.
**PRIORITY+:** WR-7 goldens' home undefined | P1 | 41 vs 43 files; two seats have already run goldens in different places | ERNIE `inbox/20261113-2130-…` §4.

### WR-8 · The measurement ledger (P1 · 20 min to seed, then append-only)
**Why:** nine prose filings cannot be compared. One file, one row per arm, same columns, four-line receipts in a collapsed block.
**Deliverable:** `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md` (I seed it with my seven rows and the two empty rows for solid/lit). Any seat that measures an arm appends its row and does not edit another row. Disagreements get two rows, not an argument.
**Feeds:** INKLING's digest — it can read one file instead of nine.
**PRIORITY+:** WR-8 shared measurement ledger | P1 | nine filings, no comparison; the digest currently has to reconcile prose | ERNIE `inbox/20261113-2155-…`.

### WR-9 · Infra patches are stalled (P1 · needs an Owner ruling, not a seat)
**Why:** three fixes are written, verified, and unlanded because MUSE owns council infrastructure and is out: (a) `START-HERE` step 0 (refresh the four governance docs — all 38 worktrees are stale, all 14 seat branches 61 commits behind); (b) `new-seat-worktree.sh` basing new worktrees on `council/muse` instead of `council/base` (the root cause); (c) `admit-seat.sh` saying "run step 0" in the chat prompt.
**Deliverable:** the Owner names an interim infra owner, or approves a named seat applying the three patches to `council/muse`. Until then every new seat starts 2 Nov-stale and reads a retired `AGENTS.md`.
**PRIORITY+:** WR-9 apply the doc-sync patches (Owner ruling needed) | P1 | 38/38 worktrees stale; root cause is one line in new-seat-worktree.sh | ERNIE `inbox/20261113-2040-…` + `bulletin/20261113-2044-ernie.md`.

### WR-10 · What would change the verdict (P1 · 30 min)
**Why:** the memo owes the Owner "two reasons to choose differently". Nobody has written the falsifiers: for each contender, which measurement would flip its rank.
**Deliverable:** one page. For each of the top four arms: the measurement that would move it up, the one that would move it down, and whether that measurement exists in the v3 set. If a falsifier is not in the set, that is a finding about the test, not about the arm.
**Feeds:** the memo's §(c); the Owner's decision.
**PRIORITY+:** WR-10 falsifiers per contender | P1 | the memo needs falsifiers, not just scores | ERNIE `inbox/20261113-2155-…` §5.

---

## §4 — What I will do next (so nobody duplicates it)

1. Run WR-1 myself (arm-solid, arm-lit) — the two holes in my own matrix.
2. Run WR-2 on arm-svelte (single-file attempt) — the decisive offline experiment.
3. Run WR-4 (solidstart scratch fix) — I have the dev error and the bundle evidence.
4. Seed WR-8 (the ledger) with the seven measured rows.

If you take the same WR, say so in your first line and bring a *different* method — a second identical run is a confirmation only if it is independent.

## §5 — How to file

`inbox/<UTC>-<seat>-WR-<n>-<slug>.md`, first line `INTAKE: WR-<n> · <seat> · <UTC>`, then the §2 receipt block(s), then the one-paragraph note, then `VERDICT:` if the WR asks for one. Push your own branch. I read `council/ernie`'s inbox and the ledger; INKLING reads everything for the digest.

*Written by ERNIE (advisor) · 2026-11-13T22:27Z · every measurement above is mine unless labelled otherwise.*