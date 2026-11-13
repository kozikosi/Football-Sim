# SYSTEMS REPORT — "run all the tests" + "set up the systems we are lacking" — Z.ai, 2026-11-13

## 1 · The engine test suite, RUN (the headline number)

**284 tests, 284 pass, 0 fail — the Colors engine suite is fully GREEN at the frozen pin `4ca9a071`** (the snapshot 67 Cakepanz consumes), from a full-repo extraction, Node 24.22.2, the repo's own `npm test`.

**Two findings the run surfaced (both matter for CI):**

1. **The suite requires the WHOLE repo, not the package.** `colors/test/nfl/fixture.ts` and `lineup.test.ts` read `data/nfl/madden27-ratings.csv` and `tools/mathlab/design.json` at the **repo root** (outside `colors/`). A colors-only checkout fails 11 test files with bare ENOENTs (verified — my first extraction was colors-only and produced 10+1 such failures; the second full extraction passed 284/284). The CI workflow encodes this: full checkout, run from `colors/`. (Boundary smell worth filing: tests reaching outside the package root makes `colors/` non-portable — the purity test's own spirit argues the fixtures should live inside; the Architect may want it on the list.)
2. **The audit's "318/320" and my "284/284" are both right** — different commits. 284 at the pin `4ca9a071`; 318/320 was at `ce7c9210` (a later architect commit, per MUSE's audit). The pin is what the product consumes; the later commit adds tests (and 2 pre-existing failures — still unresolved at the tip per the audit).

Also verified at the pin: the static **purity scan** (`test/nfl/purity.test.ts`) exists and passes — source regexes for browser APIs/ambient clock/randomness + the import-boundary check, with a planted-violation self-test. The Architect built it.

## 2 · The missing system, BUILT: the runtime purity harness (3/3 PASS)

The static scan proves the engine never *mentions* a forbidden API; it cannot prove the engine never *touches* one at runtime. The runtime half — the piece my multisport plan §3.1 proposed — now exists and runs:

`zai-runtime-purity.test.ts` (delivered artifact, drop-in at `colors/test/nfl/`): replaces `window/document/localStorage/sessionStorage/navigator/fetch/XMLHttpRequest/WebSocket/performance` with **throwing sentinels**, replaces `Math.random` and `Date.now`/clockless `new Date()` with throwers (Node 24's getter-only globals armed via `defineProperty`), THEN imports the engine and runs real seeded games. Verified against the pin: **3 tests, 3 pass** — games simulate, and the same seed replays to a byte-identical event log (the determinism invariant, proven under armed sentinels).

## 3 · The missing system, WRITTEN: minimal-first CI (drop-in)

`.github/workflows/ci.yml` (delivered artifact): two jobs (colors-engine: full checkout → `npm ci` → `tsc-baseline` ratchet check → `npm test` → build; cakepanz-ui: install → `tsc:check` → build — with a note that Cakepanz needs the tsc:check SCRIPT wired first, the files exist today). Pinned Node via `.nvmrc` (proposal: 24 — today nothing pins Node). Playwright smoke left as a commented scaffold until the framework decision lands, so CI never goes red for unbuilt work. Nightly-lab job scaffolded for Phase 4 (bench + invariants), running the suite as the interim nightly. Plus the Owner-side settings note: branch protection + required checks.

## 4 · What this feeds

The framework test (delivered alongside this report) is the first consumer of both systems: its arms were built against the purity-tested engine pin, and its acceptance spec is the Playwright step CI is scaffolded for. The multisport plan's Phase 1 (CI + purity + baseline) is now ~80% staged as artifacts — what remains is the Owner dropping them into the repo and enabling the checks.

## 5 · Labels

VERIFIED (by me, today, in this sandbox): 284/284 at the pin; 3/3 runtime purity; the data/tools outside-package dependency; the adapter-static peer conflict (kit 2 vs adapter-static 4); Vite 8's opaque CLI error reporting. PROPOSAL: the CI file's contents, the `.nvmrc` value, the drop-in location of the purity test. REPORTED (MUSE's audit, unchanged by me): 318/320 at `ce7c9210`; the 2 pre-existing failures at the tip.
