SPEAKER: glyph | ROLE: council (reviewer) | TASK: Review Claude Architect report (architect/engine-and-seats 60580c2b..7a0706df) | DATE: 2026-11-16T22:36Z
FOR: P-294

# Review: Architect status report (Claude) — commits 60580c2b..7a0706df

Scope: independent review of the claims in the provided Claude report against repo/remote evidence available from this worktree. I did **not** run the test suite, build, Playwright/browser, or CI log replays locally; I inspected git objects on `origin/architect/engine-and-seats` and workflow/config/source/test files. Claims are labeled per evidence.

## Commit range / push state (VERIFIED)

Commands:
- `git fetch -q origin && git log --oneline -n 8 origin/architect/engine-and-seats`
- `git show --name-status --format=oneline <sha>` for `60580c2b`, `fe611cbd`, `fb49334c`, `a062597f`, `7a0706df`

Observed tip and relevant commits:
- `7a0706df` Architect: NOW.md and the flex-formula decision (the hand-priced table stays; no derived formula shipped)
- `a062597f` Architect: lineup priority weights derived from the value scale (were literals that assumed QB about 1000)
- `fb49334c` Architect: colors/ builds again: framework-free dev page (src/main.ts) showing one real-pack game as a box score
- `fe611cbd` Architect: overtime clock fix, FB to TE 6 to 2, lineup.test.ts rewrite (no retired-table pins)
- `60580c2b` Architect: 1c pack builder (Phase 1 pools baked to JSON), full-game sim on keyed draws, totals bar re-run in TypeScript
- (also present in range: `86f22d10`, `6dcf13b2`, `9acf1992` per log)

**Verdict:** "pushed to architect/engine-and-seats, latest 7a0706d" — **VERIFIED**.

## CI / tests / build claims (PARTIALLY VERIFIED, mostly REPORTED)

- Workflow `.github/workflows/ci.yml` (read via `git show origin/architect/engine-and-seats:.github/workflows/ci.yml`): Node 24, `npm ci`, `npm run tsc:check`, `npm test`, `npm run build` — **every step has `continue-on-error: true`** (including build, labeled advisory). Header states report-only / never blocks.
  - **VERIFIED:** CI config is advisory on all listed steps; "build step still advisory" is accurate.
- Claude reports "378/378 tests pass and the type ratchet holds at 89/89 on CI (Node 24)" and "production build now succeeds" read from actual log lines because job reports green regardless.
  - **REPORTED (not independently re-run):** I did not fetch/run CI logs or execute tests/build here. Given `continue-on-error`, a green run summary alone would be weak evidence — Claude explicitly acknowledges this; log-level confirmation remains his REPORTED evidence.
- Dev page added: `colors/src/main.ts`, `colors/src/sports/nfl/view/gameView.ts`, `colors/test/nfl/gameview.test.ts`, `colors/vite.config.js`, `colors/package.json` changed (`fb49334c`). "Loaded in Chromium: no console errors, same seed same game" — **REPORTED** (files exist; runtime behavior not verified by me).

## Pack builder / 1c (VERIFIED artifacts & doc consistency; metrics REPORTED)

- Files added in `60580c2b`: `data/packs/nfl-pools-fit2016-2022.json`, `colors/src/sports/nfl/sim/{pools,game,totals}.ts`, `colors/tools/totals-bar.ts`, `colors/test/nfl/pools-game.test.ts`, `tools/mathlab/phase1/{bake.py,reference.py}`, `tools/mathlab/results/{1c-pack-builder-2026-11-15.md,phase1-reference-2026-11-15.json}`.
- Pack size: `git cat-file -s origin/architect/engine-and-seats:data/packs/nfl-pools-fit2016-2022.json` → **4,620,150 bytes**; gzipped stream of that blob → **500,283 bytes**.
  - **VERIFIED:** ~4.62 MB / ~0.50 MB gz (matches report).
- Doc `tools/mathlab/results/1c-pack-builder-2026-11-15.md` states: TS reproduces Python lab within -1.0..+0.2% (12k games), calibration-world held-out points vs real REG 2023/2024/2025 **+8.3% / +2.9% / +2.4%**, product world -3.0% vs calibration etc., throughput **3,865 games/s**, tests 372/372 at that point, tsc 89/89.
  - **VERIFIED (doc contents match report claims):** numbers/wording align with Claude's summary.
  - **REPORTED:** benchmark throughput, reproduction percentages, and held-out comparisons were not re-executed by me.
- `core/pack.ts` widened (per doc/commit intent) — change present in range (not line-diffed here beyond commit listing); **REPORTED/INFERRED** impact; doc states "tsc count unchanged".

## Overtime clock fix (VERIFIED in code)

- `colors/src/sports/nfl/app/feed.ts`: `clock(secs, period)` returns `OT ${mmss(Math.max(0, secs - 3600))}` for `period >= 5`; regulation `Q1-Q4` with time left. Drive clock uses `clock(d.start, d.period)`.
- `colors/test/nfl/feed-clock.test.ts` added: asserts OT drives labeled `OT mm:ss` with seconds into OT = `start-3600`; regulation `Q1-Q4` with time-left consistency; checks both playoff/non-playoff runs and that both kinds seen.
  - **VERIFIED:** implementation and test intent match reported fix ("OT mm:ss", first OT drive not "Q4 00:00").

## FB>TE 6→2, DIME rules unchanged, formation gap/test updates (VERIFIED)

- `tools/mathlab/flex.json` / `colors/src/sports/nfl/engine/flex.ts`: `FB.TE == 2`; `TE.DIME == 12`, `ILB.DIME == 12`, `OLB.DIME == 12`. Rule count **99**, tier counts **{0:23, 2:11, 6:42, 12:23}** (computed from `flex.json`).
  - **VERIFIED:** matches "FB to TE 6 to 2; DIME rules stay at 12". (Note: tier distribution shifted from prior 99-rule 23/10/43/23 to 23/11/42/23 due to FB>TE move — consistent and correctly reflected in comments/tests.)
- `colors/test/nfl/formation-gap.test.ts`: reference-table expectations updated to 4-3 loss 2500 in 3-4 (DT5 case), gap 700, etc.; MEASURED-provider structure tests/reporting retained.
- `colors/test/nfl/lineup.test.ts`: removed `design.json` key-by-key equality and pinned QB-weight-number contract; added "retired table guard" asserting default is MEASURED, not `tableValues()`, and source scan forbidding `design.json`/`WEIGHT`/`tableValues` outside allowed files; flex-tier count assertion updated to `{0:23,2:11,6:42,12:23}`; FB>TE/OT pins and DIME=12 asserted.
  - **VERIFIED:** "dropped design.json equality and removed the number from the comment" / retired-table-not-wired-back guard are present in substance. Arbitrage count pinned to `<= 18` with explanation (four new routes via FB>TE).

## Lineup optimizer priorities derived from value scale (VERIFIED)

- `colors/src/sports/nfl/engine/lineup.ts`: adds `VALUE_SPAN`/`priorities(spotValues, players, spots)` deriving `emergency/plays/illegal` from summed spot values; used by solver; comments explain scale-invariance motivation.
- `colors/test/nfl/lineup-priorities.test.ts` added: exact-minimum emergency-fill check (bipartite matching) on 240 skewed rosters across scales 1/200/0.001 with placement identity, and priority-order/bounds checks.
  - **VERIFIED:** code/test structure matches claim that literals replaced by derived priorities and behavior preserved at today's scale while fixing scaled case. "2,700 random skewed rosters" in commit/report is REPORTED detail; test file as committed checks 240 rosters × 3 scales (still strong evidence).

## Flex formula decision (VERIFIED doc exists; evaluation REPORTED)

- `claude/rulings/2026-11-16-architect-flex-formula-decision.md` added (`7a0706df`): decides to keep hand-priced 99-rule table (not ship derived formula), cites FB>TE 6→2 done, lineup priority fix done, references Ernie ladder (50/99 exact, DIME trio mispriced 4–5 vs 12, flexing 145→245–413, gap sign flips) and remaining ~0.09 wins/season gap as Owner football call.
  - **VERIFIED:** decision recorded as stated. Ernie's measured results and Claude's partial reproduction are **REPORTED** within that doc.

## Observations / risks (INFERRED)

- **CI signal quality:** all-green workflow status is not a hard gate under current config; regressions in tsc/tests/build could be masked unless log details are inspected. This is by design (Owner ruling) but worth keeping explicit for consumers of "CI green".
- **Cakepanz/shell impact:** engine/flex changes on architect branch (FB>TE, pack/sim additions) matter for snapshot consumers when re-pinned; Cakepanz gh-pages was re-pinned to `d3bd81d2` earlier (separate fact) — any future merge/re-pin must follow snapshot/receipt discipline.
- **Unverified by this review:** numeric performance claims, browser console/seed-determinism demo, CI log excerpts, and full 378-test/89-ratchet execution.

## Overall verdict

**VERDICT: credible / improved-direction, with key runtime claims REPORTED.**

Core reported code/doc changes are **present and internally consistent** on `origin/architect/engine-and-seats@7a0706df` for: pack-builder artifacts + results doc, OT clock fix + test, FB>TE=2 with DIME preserved + flex/test updates, lineup priority derivation + test, lineup/formation test rewrites removing retired-table pins as contracts, dev-page build path files, CI remaining advisory, and flex-formula non-shipment ruling. I cannot certify "378/378 green, ratchet 89/89, build green on CI, 3865 games/s, browser clean" without running/log evidence myself; treat those as **REPORTED** pending independent execution or attached CI log receipts.

