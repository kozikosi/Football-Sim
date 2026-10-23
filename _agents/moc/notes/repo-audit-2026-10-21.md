# Repository audit — `kozikosi/Football-Sim` and the local environment

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: audit only (no changes) | DATE: 2026-10-21T16:40:00Z**

> **Measured in the outer repo root** `/Users/kosi/Desktop/Football Sim`. The nested `Football Sim/Football Sim` is a **second git repo** on branch `council-intake`, a day stale, with different copies of every document and a different build — anything measured from there is stale. Check `pwd` before reading or writing.

**Method:** targeted file inspection only; the product HTML was never loaded into context in full. Every finding is labelled **VERIFIED** (I ran it), **REPORTED** (a document says so), **INFERRED** (reasoned) or **UNKNOWN**. No files were modified, no packages installed, no settings changed, no product edit.

---

## 1 · The product candidate — VERIFIED

`shasum -a 256` on every root HTML file:

| file | bytes | sha256 (first 16) | status |
|---|---|---|---|
| **`NFL Draft Simulator merged.html`** | **656,746** | **`044d1759e01ac99b…`** | **the candidate — V21 by the Owner's ruling**; tracked, and the file every council patch is cut against |
| `merged.html` | 656,750 | `e1ac8184a601…` | untracked scratch copy (6 lines from the candidate) |
| `merged_v22.html` | 656,727 | `4178a69b3e3a…` | untracked scratch copy (20 lines from the candidate) |
| `merged-patched.html` | 656,113 | `578d041f52f8…` | untracked — **and this is the file two of the Playwright specs point at** |
| `NFL Draft Simulator v20 Claude.html` | 648,310 | `8f916df95bed…` | the v20 reference build (AGENTS.md's product lineage) — **not** the candidate |
| `NFL Draft Simulator.html` | 649,490 | `8f0f8d50c369…` | the Season-first donor — **not** the candidate |

**Finding (VERIFIED):** four near-identical candidates exist and **three are untracked**. The two Playwright specs that point at a real file point at `merged-patched.html` — a copy that is **not** the pinned candidate. A reviewer cannot tell which build the suite tested.

## 2 · The tests, validation scripts and tooling that exist — VERIFIED

**Present and runnable:**

| path | what it is |
|---|---|
| `tests/madden-sim.spec.js` (183 lines) | Playwright spec: draft, season, players, stars, weights, viewport |
| `tests/openchamber-e2e.spec.js` (595) | Playwright spec: draft, season, playoffs, screenshots |
| `tests/openchamber-e2e-v2.spec.js` (873) | the v2 of the above |
| `tests/guide-flex-table-390px.spec.js` (270) | 390 px flex-table layout |
| `tests/value-here-390px-test.spec.js` (211) | 390 px "value here" visibility |
| `tests/e2e-smoke.mjs` (789) | node smoke driver; **exit codes 0 = pass, 1 = findings, 4 = usage/parse error** (per `tests/CONTRACT.md` v2) |
| `tests/CONTRACT.md` | the contract the scripts answer to |
| `tools/build-merged.js` | the merge builder |
| `tools/sync-mirrors.sh` | mirror sync |
| `HARNESS-STATUS.md` | **the existing script inventory** — read this first; it already tracks each script's status |
| `MERGE-MANIFEST.md`, `MERGE-CHECKLIST.md` | merge evidence and phase checklist |
| `SIM-PLATFORM/data/schema/` | `player-record.schema.json`, `candidate-record.schema.json`, `rubric-v1.md`, `calibration-30.json`, `nfl-position-taxonomy.md`, `current-pool-distribution.md` |
| `SIM-PLATFORM/data/nba/` | 8 files, incl. `nba-2027-owner-ratings.json` and `still-needs-scores.json` |
| `_agents/minimax/tools/` | `post-merge-smoke.mjs` (the CDP driver, exit 0/1/4), `cdp-phone-check.mjs`, `board-mobile-probe.mjs`, `build-team-colours.mjs`, `candidate-lint.mjs` |
| `_agents/ds/tools/` | `funcdiff-full.js`, `surface-lines.js`, `arch-probe.js` (40 metrics) |
| `_agents/beam/notes/harness-drafts/` | `pw4.js`, `validate.js`, `phone.js`, `run_all.sh`, `funcdiff.js` — **drafts only** (per HARNESS-STATUS.md) |

**Named in AGENTS.md but ABSENT from the root — VERIFIED:** `pw4.js`, `validate.js`, `phone.js`, `mk.sh` (the drafts live under `_agents/beam/notes/harness-drafts/`; `run_all.sh` and `funcdiff.js` too). AGENTS.md reads as if they exist; HARNESS-STATUS.md is the accurate record.

**Package configuration — VERIFIED:** `package.json` has `@playwright/test ^1.64.1` as the only devDependency, `"type": "commonjs"`, and **`"test": "echo \"Error: no test specified\" && exit 1"`** — `npm test` is a stub that always fails. `node_modules` has **3 entries**.

## 3 · Browser tooling — VERIFIED

- **Playwright 1.64.1** installed: `node_modules/.bin/playwright` and `playwright-core`; `npx playwright --version` → 1.64.1.
- **Browsers are installed**: `~/Library/Caches/ms-playwright/` holds `chromium-1247`, `chromium-1248`, `chromium_headless_shell-1247/1248`, `firefox-1555`, `webkit-2370`, `ffmpeg-1011/1013` — so the specs can run.
- **agent-browser 0.39.1** at `/Users/kosi/.npm-global/bin/agent-browser`.
- **No `playwright.config.*` anywhere in the repo** — so there is no `testDir`, no `baseURL`, no timeout policy, and no reporter configuration; every spec is invoked by path.
- No `chromium`/`google-chrome` on PATH; the Playwright-managed builds are the browsers.

## 4 · GitHub Actions — VERIFIED

**The repository has no CI.** There is **no `.github` directory in the repo root**. The only workflow in the tree is `Football Sim/.github/workflows/static.yml` — a *GitHub Pages static deploy* living inside the **nested mirror clone**, not the council's repository. It triggers on pushes to `main` and `workflow_dispatch`.

One workflow exists but is **not merged**: PR #6's branch `gpt/council-tooling-player-validator` adds `.github/workflows/validate-player-data.yml`.

## 5 · What the existing tests exercise — VERIFIED

By keyword scan: **draft** (all five specs + the smoke), **season** (3), **playoffs** (3), **roster** (the smoke's `SEASON`/`Roster` checks), **player data** (2 + the smoke's player checks), **model weights** (`madden-sim.spec.js` and the smoke's `Weight` checks), **stars** (5), **flex** (1), **viewport** (5), **screenshots** (2). So the coverage *intent* is broad.

**But the targets are broken (VERIFIED):** the specs hardcode absolute `file://` URLs, and of the five:

| spec | points at | exists? |
|---|---|---|
| `guide-flex-table-390px.spec.js` | `merged-patched.html` | yes — **but not the pinned candidate** |
| `value-here-390px-test.spec.js` | `merged-patched.html` | yes — **but not the pinned candidate** |
| `madden-sim.spec.js` | `…Team Power Rankings & Draft Simulator (9) (OC).html` | **no** |
| `openchamber-e2e.spec.js` | a path I could not extract | **no / not found** |
| `openchamber-e2e-v2.spec.js` | a path I could not extract | **no / not found** |

And **the weight maths is not covered by any test that runs against the pinned build** — the spot-value table, the per-+1-OVR figures and the pass/run splits have no assertion anywhere. The council's own evidence for those is the seeded A/B, which lives in the council's notes, not in `tests/`.

## 6 · Determinism — VERIFIED, and this is the headline

**The five Playwright specs contain zero seeded-`Math.random` overrides** (`addInitScript` / `addScriptToEvaluate` / `Math.random`: 0 occurrences in each). The build has **58 unseeded `Math.random()` sites**, so the draft, the CPU's choices and the season all differ between runs. **A failing Playwright run cannot be reproduced.** The one script that does seed is the node/CDP path (`tests/e2e-smoke.mjs` → `post-merge-smoke.mjs`), and the council's own verified method — a seeded `Math.random` installed via CDP `Page.addScriptToEvaluateOnNewDocument` *before* the page's scripts run, then the same clicks in both builds — is the one that produced reproducible comparisons (seed 135792468; 32 team scores identical, draft board rows identical, console errors 0 → 0).

**That method is not in `tests/`.** It is in the council's notes and in my temp tooling. Making it a fixture is the single highest-value change to the harness.

## 7 · Player-data validation and provenance — VERIFIED

**Records exist:** `SIM-PLATFORM/data/schema/player-record.schema.json` and `candidate-record.schema.json`, the rubric, a 30-point calibration, the position taxonomy and the current pool distribution; `MERGE-MANIFEST.md` and `MERGE-CHECKLIST.md`; `_agents/minimax/MERGE-MANIFEST.json`; the published evidence release `e2e-evidence-2026-10-20T225702Z`; and the NBA pool's own status and work-queue files, including `still-needs-scores.json`.

**The validator does not exist on `main`.** It exists **only on PR #6's branch**: `tools/player-data/validate-players.mjs`, `tools/player-data/README.md`, `tests/player-data-validator.test.mjs` (8 node tests), `.github/workflows/validate-player-data.yml`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/work-package.md`, `VERIFICATION-TEMPLATE.md` and a decision-record template. PR #6's body reports `node --check` PASS, `node --test` **8 passed, 0 failed**, and `node tools/player-data/validate-players.mjs --help` PASS, with **no player dataset on that branch** — the tests use synthetic fixtures.

## 8 · How the council claims, branches, submits and hands off — VERIFIED

- **Claims:** the bulletin — `COUNCIL-BULLETIN.md`, **4,890 lines**, messages `M-1`…`M-401`+, each with a speaker, a task and a date; a seat posts one line to claim an item, and posts its report when done. Availability is a line-based strip each seat edits only for itself.
- **Handoffs:** `CHRONICLE.md` (219 lines) — **one line per delivery**, e.g. `2026-10-21 · BOC · V21 product review draft board (bulletin M-401): 14 confirmed defects + 4 preferences. No product edits.` And `SUBMISSIONS.md` (1,535 lines) — each agent's own section, with self-contained proposals.
- **Branches:** `gpt/<owner>-<slug>` (six of them, one per open PR) and `council/<slug>` (the council-brief branch).
- **Submission channel:** **six open PRs** — #6 validator + tooling workflow, #5 Council Contribution Assessment and Assignment Guide, #4 all-time NFL/NBA research intake, #3 shared OpenChamber E2E acceptance suite, #2 pre-V21 review, #1 multisport strategy.
- **Patches:** `council-brief/2026-10-21/moc/*.patch` (five `patch -p0` patches against the candidate) plus each seat's notes under `_agents/<seat>/notes/`.
- **The product is never edited by an agent** — Claude implements, and the user relays and publishes.

## 9 · What depends on the Owner — VERIFIED / REPORTED

1. **Publishing the build** (REPORTED): AGENTS.md — the user pushes; the `Football Sim/` mirror is user-pushed.
2. **Merging the PRs** (VERIFIED: all six are open): only the Owner can land them, and the validator, the CI and the templates are all inside PR #6.
3. **Player-pool approval** (REPORTED, repeatedly): the Owner's final approval on every pool; the NBA pool still has unmatched players.
4. **Protected constants** (VERIFIED): `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, the `MC` coefficients, `PLAN_K`, `RATING_SPECS` change only with the Owner's approval — the V22 weight deltas are waiting on exactly that.
5. **The ≈ −5 current-player adjustment** (VERIFIED in the direction record): **not approved**; it must not be applied.
6. **Figma** (REPORTED): the Owner said he may need to set more up; the council can work without it.
7. **Running the gate by hand** (VERIFIED): with no CI in the repository, the acceptance checks only run when a session runs them.
8. **Which build copy is canonical** (VERIFIED, and the Owner should settle it): four candidates, three untracked, and the specs aimed at a fourth.

## 10 · The seven proposed improvements (PR #6), audited

| # | proposed (PR #6) | already exists | missing | what to do |
|---|---|---|---|---|
| 1 | `tools/player-data/validate-players.mjs` + a usage guide | **on PR #6's branch only** — not on `main` | the file on `main` | **merge PR #6**; nothing to build |
| 2 | validate identity, sport, mode, role codes, status, sources, seasons, rating provenance, per-rating scales | the schema (`player-record.schema.json`, `candidate-record.schema.json`) and the rubric already exist; the validator implements the checks | the checks running against a **real** dataset (none is on that branch) | merge the validator, then run it against `SIM-PLATFORM/data/nba/nba-2027-owner-ratings.json` and record the output as a receipt |
| 3 | permit unrated candidates; preserve decimals and source-specific scales | the schema and the NBA pool's `still-needs-scores.json` already model "no rating yet" | a rule that the **engine** accepts source-specific scales | agree the contract in `tests/CONTRACT.md`; keep public-facing data integer, internal decimals |
| 4 | eight node tests + a narrow CI workflow | **both exist on PR #6's branch** (8 tests, `validate-player-data.yml`) | **no `.github` in the repo at all** | merge PR #6, then add **one more** workflow that runs `node --check` on the product's script and the node tests — the cheapest CI in the repo, and it needs no browser |
| 5 | issue and PR templates (owner, branch/base, allowed paths, acceptance criteria, evidence) | **both exist on PR #6's branch**; `VERIFICATION-TEMPLATE.md` is on `main` | the templates on `main`; no seat is currently using a work-package template | merge PR #6, then make the work-package template the way seats file work |
| 6 | a council tooling workflow guide with a Mermaid workflow and no-cost setup | the **Mermaid** pattern is already in use (the maps in `V22-Suggestions.md`, the maps in PR #6) and the council's real workflow is the bulletin + `CHRONICLE.md` + PRs | a single written guide | write it from what the council actually does — the bulletin is the claim board, `CHRONICLE.md` the handoff, the PR the submission |
| 7 | a proposed decision record (repository, output, sport boundaries, data, testing) + the 1,200 → 1,500–2,000 signal | `ARCHITECTURE_DECISION_RECORDS/` and the decision-record template exist; the Owner's 1,500–2,000 direction is now the planning signal | the record for the player-data pipeline | write the record; keep it **Proposed**, not accepted — the Owner and the Architect decide |

## 11 · The greatest improvement for the least effort — INFERRED, from the findings above

1. **Merge PR #6.** One merge brings the validator, eight node tests, the only CI workflow, the issue/PR templates, the workflow guide and the decision-record template into the repository. Everything else in this table is a rewrite of something that already works. **Lowest effort, largest coverage.**
2. **Add a seeded-RNG fixture and a `playwright.config.*`, and re-point the five specs at the pinned build.** Today the suite is non-deterministic (§6) and two of five point at the wrong copy (§1, §5). A `tests/fixtures/seed.js` that installs a seeded `Math.random` before the page scripts run — the method already proven at seed 135792468 — plus a config with the build path and a timeout, makes the whole suite reproducible. **This is the difference between a test net and a coin flip.**
3. **Reconcile the four build copies to one** and make the specs read the pinned hash. The specs currently test `merged-patched.html`; the patches are cut against `044d1759…`; the council's evidence names a third. One copy, one hash, one place it is written down. **Cheap, and it removes a whole class of false evidence.**
4. **Fix `npm test`** so it runs the node tests (`node --test tests/`) and the `node --check` of the product script. It is currently a stub that exits 1, which means `npm test` is worse than nothing — it looks like a failure.
5. **One CI workflow, browser-free**, running `npm test` plus the validator on every PR. The browser suite can stay a manual or scheduled job; the cheap checks should gate every change.
6. **Add the weight-maths assertions** (per-+1 OVR, the pass/run split, the value sort) to the suite. They are the numbers the product's balance rests on, and **nothing in `tests/` asserts them** — the council's evidence is in notes, not in the repository.
7. **Adopt the settled `biome.json`** (it exists in the tree, untracked) so the council's own tooling is linted by the rules the council agreed.

## 12 · Genuine Owner blockers

- **Merging the six PRs** — only the Owner publishes; the validator and the only CI are inside PR #6.
- **The protected-constant approval** for the V22 weight deltas.
- **The player-pool approvals** (NFL all-time, NBA current) and the "Terrance/Terance Mann" spelling.
- **Which build copy is canonical** — a build-hygiene decision, and until it is made, "the tests passed" cannot be tied to a hash.
- **Figma**, if the Owner's aesthetic work is to go through it.
- **Whether the repo should grow a CI at all** — the council's repository has none today, and adding one is a repository-policy change, not a technical one.

## 13 · What I did **not** verify — UNKNOWN

- Whether the three Playwright specs whose targets I could not extract run at all (the paths did not resolve); the two I could resolve point at `merged-patched.html`.
- The runtime behaviour of `tools/build-merged.js` and `tools/sync-mirrors.sh` — not executed (read-only audit, and they mutate trees).
- Whether the `Football Sim/` nested clone's Pages workflow is intended to publish the product or just the docs.
- The contents of the draft harness scripts beyond HARNESS-STATUS.md's summary.
- Whether `node --test tests/player-data-validator.test.mjs` still passes today (it is not on `main`; the report is from PR #6's branch at the time of writing).
