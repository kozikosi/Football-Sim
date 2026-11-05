# 07-tooling-ci — the CI gates (w74 items 7a–7g)

**What this is:** every gate from the brief, built and RUN in the worktree (not just written): bundle budget, runes enforcement, evidence pack, contract:check (both directions), the append-only conflict channel, the seven acceptance criteria as running Playwright specs, and the determinism bug-report harness with a checked-in card proving end-to-end replay.

**Verified receipts (worktree at `425f72a` + folders 04–06 applied):**

| Gate | Command | Result |
|---|---|---|
| Bundle budget | `node tools/check-bundle.mjs` | **PASS — 25.4 KB gzip ≤ 150 KB** (whole slice incl. engine; Vite reports 23.9 KB JS gzip + 0.7 KB CSS) |
| Runes lint | `node tools/check-runes.mjs` | **PASS** (6 rune files, 61 other ts/js; zero legacy idioms) |
| contract:check | `node tools/contract-check.mjs` | **PASS — every UI read is produced** + report of exposed-but-never-rendered VM fields (exit 0 by design) |
| Evidence pack | `node tools/evidence-pack.mjs` | emits `{tests: {pass, fail}, e2e, labHash, diffSummary, commit}` JSON |
| Bug-report replay | `node --experimental-strip-types tools/replay-bug-report.ts docs/seedcards/example-card.txt` | **`ok: true` — digest `h53:10e7e55b2c` reproduces** |
| Acceptance battery | `npx playwright test --config=playwright.config.ts` | **9 passed (23.1s)** — 2 slice + 7 criteria |
| Offline battery | `npx playwright test --config=playwright.offline.config.ts` | **3 passed (10.7s)** (folder 06) |
| Node suite | `npm test` | **288 pass / 0 fail** (the seed-card replay test included) |

## Files (repo paths under `colors/`)

| Path | New | Item | One line |
|---|---|---|---|
| `tools/check-bundle.mjs` | new | 7a | gzip every JS/CSS asset; the SHELL budget is 150 KB; the dataset is separately loaded and never counted |
| `tools/check-runes.mjs` | new | 7b | CI greps: no `export let` / `$:` / `on:*` / `writable(`/`readable(` in `*.svelte`; no runes outside `*.svelte*`; no deep `$state` over pool/dataset-shaped data (rule 3 names `$state.raw`) |
| `tools/evidence-pack.mjs` | new | 7c | one JSON receipt: test count, E2E last-run status, **Lab results hash** (sha256 over `results/*.json`), git diff summary — the N1 exhibit cannot drift from the code |
| `tools/contract-check.mjs` | new | 7d | GLM's 2c idea, both directions: UI-reads-but-VM-doesn't-produce → **FAIL**; VM-exposes-but-never-rendered → report (exit 0). Brace-counted interface parse, comment/string/import-stripped reads. Limits stated in the header: grep-grade, not a type-checker — tsc/svelte-check remain the type layer |
| `docs/CONTRACT-CONFLICTS.md` | new | 7e | the append-only channel: `CONTRACT-CONFLICT: <one screen> | <one reason> | <one proposed fix> | <seat, wave>`; the Architect resolves by editing the CONTRACT, then deletes the line — never the other way round |
| `test/e2e/acceptance.spec.ts` | new | 7f | the seven criteria as specs: no sideways scroll 320→1920 (it **caught a real bug** — the board table now scrolls inside its wrapper, never the page), zero console errors, pager works, autosave survives reload, keyboard-only play, focus visible, reduced-motion honored via the a11y boot read |
| `tools/replay-bug-report.ts` | new | 7g | a seed card → replay through the draft store → digest must reproduce; CLI over any card file |
| `test/nfl/seedcard-replay.test.ts` + `docs/seedcards/example-card.txt` | new | 7g | every checked-in card replays in CI; the example card was cut from the REAL engine (seed 4242, team 3, one pick) and its digest reproduces (VERIFIED above) |
| `playwright.config.ts` (folder 05's copy) | patched | 7f | `testIgnore` for offline.spec (needs the preview build) |

## Decisions that need ruling

1. **Package scripts** — the Architect adds to `colors/package.json`:
   `"contract:check": "node tools/contract-check.mjs"`, `"check:bundle": "node tools/check-bundle.mjs"`, `"check:runes": "node tools/check-runes.mjs"`, `"evidence": "node tools/evidence-pack.mjs"`, `"e2e": "playwright test --config=playwright.config.ts"`, `"e2e:offline": "playwright test --config=playwright.offline.config.ts"`. (Not shipped as a package.json copy — his file, his diff.)
2. **Acceptance criteria 5–7 are INFERRED picks** for "the remaining three from DS's list" (DS's exact three are not in this session's record): keyboard-only, focus-visible, reduced-motion. If DS's list differs, the specs swap one-for-one; the harness is identical.
3. **contract:check's second direction reports but does not fail** — a VM may expose fields for a screen that lands later; silent field drift may not. Failure is reserved for reads nobody produces (a real bug class).
4. **eslint-plugin-svelte / svelte-check** are NOT yet in the devDependencies: `svelte-check` did not install cleanly in this sandbox (the brief says "in CI if it installs cleanly" — it did not, so it is reported, not forced). The grep gate (check-runes) covers the same idioms at CI level today.
