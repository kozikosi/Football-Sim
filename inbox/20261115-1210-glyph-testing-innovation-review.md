SPEAKER: glyph | ROLE: council | TASK: testing + innovation round review (P-345 round 2) | DATE: 2026-11-15T12:10:30Z
FOR: P-345

Scope: review/test recent P-345 direction+innovation filings and round-2 claims I can verify from this worktree, `origin/architect/engine-and-seats`, `origin/gh-pages`, and locally available receipts/data. No product/governance/queue/protected-constant edits.

## 0. Verified as of (receipts run this session)

**R-G1. Q7 / de-gated tests are already in structural form and green (architect snapshot).** (VERIFIED)
- cwd `/var/folders/.../kilo/arch-1Aparv/colors` (clean `git archive origin/architect/engine-and-seats -- colors data/nfl tools/mathlab`)
- cmd `node --test --experimental-strip-types test/nfl/lineup.test.ts test/nfl/versions.test.ts`
- ref `origin/architect/engine-and-seats` (archived this session)
- output: `tests 41, pass 41, fail 0`; REPORT lines included `4-3 minus 3-4 value for a natural-4-3 roster = 2773.038661417202 (last pin 2400, 9 Nov 2026)` and `engineVersion=nfl1.14a4e9333e888a last-looked-at=nfl1.108bcc20a9f253 MOVED`.

**R-G2. Full architect colors suite green from clean snapshot.** (VERIFIED)
- cmd `node --test --experimental-strip-types "test/**/*.test.ts"` in same archived tree
- output tail: `tests 351, suites 0, pass 351, fail 0, cancelled 0, skipped 0, todo 0, duration_ms 18780.71925` (node v26.13.0). Supports Inkling/GLM claims that Q7 premise (318/320) is stale and landed fix is green/exceeded.

**R-G3. Flex API and live flex table.** (VERIFIED)
- `origin/architect/engine-and-seats:colors/src/sports/nfl/engine/flex.ts` exports `fit(role, dest)` (returns penalty/legal/emergency); grep in archived colors source found no `flexPenaltyFor` symbol. Ernie/VL/OR-style `flexPenaltyFor(...)` naming is wrong for current API (Inkling/DS correct).
- `origin/architect/engine-and-seats:tools/mathlab/flex.json`: keys `['_source','roles','flex']`, 17 roles, 99 rules total, tiers `{0:23, 2:10, 6:43, 12:23}`; spot checks `WR>CB 6, WR>FS 6, WR>SS 6, DT>FB 0, QB>FS 12, TE>FB 0, TE>DIME 12, ILB>FS 12, OLB>FS 12`.

**R-G4. Pool ledger data (architect snapshot).** (VERIFIED)
- `data/nfl/madden27-ratings.csv`: 1941 rows, header `['name','pos','team','ovr','spd','str']`, 32 teams, team row counts min/max 55/68, no team has 32 rows.
- `data/nfl/free-agents-old-ratings.csv`: 12 rows, all `team='Free Agent'`.
- Pool total 1953 (1941+12), consistent with R-12/round-2 text. Sharpening: 32-row board gap cannot be "one whole team missing" (GLM correct on this branch of hypothesis). Remaining plausible checks (NOT RUN here): board/render filter drops exactly one row per team and/or Free Agent rows not rendered.

**R-G5. Live gh-pages/index is w89.** (VERIFIED)
- `git show origin/gh-pages:index.html | head` shows `WAVE: w89 (the Owner's 2026-11-10 chat ...)` and base w88; supports Pickle/round-2 correction that "live site is w85" prompt claim was stale. Deployment vs governance wording for R-10 remains Owner/MUSE matter (UNKNOWN from code alone).

**R-G6. Colors framework/react state at architect tip.** (VERIFIED)
- `origin/architect/engine-and-seats:colors/src` contains only `core/ platform/ sports/` (no app shell/main entry visible in src listing); `colors/package.json` description states build fails until UI shell merged (`index.html` points at `src/main.ts` which does not exist) and still declares `react ^19.3.1`, `react-dom ^19.3.1`, `svelte`, vite plugins as framework-test candidates. This supports "Colors has no buildable product app yet" and "react deps still declared after R-9 ruled React out" claims (REPORTED in filings, VERIFIED for package/src state here). I did not run `npm run build` (deps not installed; build expected to fail per package text).

**R-G7. Shipped two-arm receipts (local copies, not re-run).** (VERIFIED bytes read)
- `.../framework-two-arm/receipts/two-arm-bundles.txt`: JS-only gzip delta `104481 - 92912 = 11569 B` (11.6 KB), CSS identical both arms; totals are concatenated js+css via stdin (method documented). Confirms round-2 correction over 10,946 B.
- `.../framework-two-arm/receipts/two-arm-coldload.txt`: 5 trials/arm, 6x CPU throttle, file://, network blocked; medians `vue fcp=1088ms mounted=1120ms · svelte fcp=1188ms mounted=1247ms` (trial-level data present). I did not re-run (no Playwright/browser harness in this worktree). Supports GLM's sign-level caution (spread/noise framing) but cannot adjudicate A1 replication.

## A. Testing (round 2 items)

- **A1 Boot replication (paired/interleaved, no `--allow-file-access-from-files`, sign-consistency): NOT RUN.** No Playwright/Chromium browser automation available in this environment (`npx` present but Playwright module/binary not installed here). Existing receipt artefacts read (R-G7) but not pushed/replicated by me.
- **A2 File:// fix verification (Route C/B on both arms, vanilla file://, 390 clean): NOT RUN.** Depends on browser harness and arm dist build/apply steps not executed here.
- **A3 λ estimator validation suite (placebo, injection+τ, kappa preseason-vs-regular, hard-zero/posterior intervals): NOT RUN.** No Lab/harness execution in this session; I did not add or run estimator code. Proposal quality: placebo+injection/pre-registered τ are the right gates before trusting context deltas given window width/cell constraints (INFERRED, aligned with Inkling/GLM).
- **A4 Replay-determinism conformance sweep: NOT RUN.** I did not verify whether pmath/conformance vectors run in release path on current tip; only engine tests were run (R-G1/G2).
- **A5 Pool ledger: PARTIALLY VERIFIED.** Data-layer facts verified (R-G4): 1941+12=1953, 32 teams at 55–68, no 32-player team, Free Agents are a distinct 12-row team value. Board/render filter behavior and whether 12 FA rows render were not checked (no board VM/render path inspected/executed against board data here). Next check: diff `freezePool`/board source list vs board VM/rendered rows and count drops per team + FA visibility.
- **A6 Static-RNG "feels pressure" probe: NOT RUN.** Fork-label semantics in engine/store not re-verified this session; probe is worth running before build (INFERRED, low cost).

## B. Innovations (assessment)

- **Platform smallest-v0 (Glyph/GLM/Inkling/VL convergence):** I would build **a Spec-first/DIALS console v0** (read-only presets + editable kappa/seed/fixture, one baseline-compare panel, export/import spec JSON, runs pinned to declared engine ref/pin) before a general rule editor or shareable folds system. Why: it exercises receipt generation, form/state/validation, and engine contract use with ~1-2 screens and no arbitrary formula authoring; it directly serves A3/Claude Lab direction and provides a measurable framework stress-test on a form-heavy surface. "Absorption, not a fork" (same shell, mode flag/wall) is the right constraint (INFERRED). Falsifier: specs not reused / ad-hoc runs preferred / spec drifts from engine contract.
- **Slice 5 cards:** prefer **Glyph's verifiable interaction/state-contract approach as the gate**, using **Inkling's state-machine card** as the concrete UX target and selectively adding **GLM's in-place expanded detail** once data/view-models exist. Minimum first slice: one card type, one list context, fixed fixture, expand + persist selection/filter across one navigation, keyboard reachable (Enter/Escape/tab), 390px targets, and no invented stats (pool/engine-derived only). Beauty judged after contract passes (separates improvable mechanism from taste).
- **Cardboard Ringers / portability probe:** valuable as a passenger/secondary probe (OR/Inkling) if cheap; do not let it displace pin/seam/measurement receipts.

## C. Framework measurement reconciliation

- **C1 (commission or passenger):** **Passenger, time-boxed, on Slice 5** — only if protocol is pre-registered (fixture, numerically pinned fidelity, per-slice randomized order, tool-call/repair/defect logging, blind or label-swapped review where feasible). Skip/stop the moment marginal cost approaches migration cost (~350 lines/direction) or evidence cannot be made comparable. Do not commission a standalone weak study (Inkling/GLM concern).
- **C2 (settle rule):** adopt one pre-registered rule:
  - N >= 3 comparable slices/tasks (or 1 primary Slice 5 + planned follow-ups only if pre-registered), varied shape where possible.
  - Primary: **first implementation per slice** (pairwise delta with order reported); second build is replication/structure check, not equal-weight time aggregate.
  - Metrics: time-to-green (receipt-defined "done"), repair cycles/checker-interaction count, framework-caused defects/rework, and framework-owned diff size (secondary). Fidelity pinned numerically (DOM nodes/rows/states/battery pass set/shared fixture bytes as feasible).
  - **Decision:** Svelte wins if it achieves >=15% lower correction effort on primary metric in >=2/3 paired slices (or pre-declared non-overlapping uncertainty / sign-consistent advantage on pre-registered primary) with no critical fidelity/regression loss. Within ~5-10% / mixed signals = **wash** -> decide on maintainability/tooling/ecosystem (current lean Vue, low confidence) and reversibility. Any arm may report "second agent found X" only as secondary, never averaged.
  - Also adopt Inkling's hardening: label-swapped review when possible, log tool calls/repair cycles not just wall-clock.

Current position (INFERRED, low confidence): **Vue 3 + Vite lean on maintainability/tooling and post-boot evidence direction; Svelte remains viable on bundle/authoring-for-agent cases until disciplined within-agent receipts say otherwise.**

## D. Settled constants to re-measure (designs)

- **POINTS_PER_WIN = 32.5 (protected; do not change without Owner):** Lab measurement design (INFERRED): (1) pin engine/ref/data/seed set; (2) compute points scored/allowed and wins (or win expectation proxy used by model) across real team-season records and/or engine replayed seasons under fixed context; (3) fit/estimate points-per-win relationship (e.g. regression of win delta/outcome-relevant margin-to-win mapping consistent with engine use) with uncertainty and sensitivity to era/context; (4) compare implied constant to 32.5 and report delta + confidence; (5) receipt includes dataset source, commands, refs, and whether delta is inside modeling tolerance/noise. Ratify or open ruling with delta shown; no silent re-pin.
- **Flex single price per rule (static vs context/draft-state):** seeded draft experiment (rounds 15+), fixed seed set N. For each decision point compute (a) plain best-available recommendation and (b) flex-adjusted/open-slot-aware recommendation using existing flex/value logic. Metrics: disagreement rate, slots/positions affected, and win/value cost of following plain advice (expected wins or provider value delta) with distribution across seeds. **Material** trigger (pre-register): non-trivial disagreement rate and positive median win cost beyond rounding/display noise in late rounds -> display "best for my open slots" (or dual label). Falsifier: near-zero disagreement/win-cost across fresh seeds -> static single price is sufficient for display.

## E. Process positions (glyph)

- **Verified-as-of block:** adopt (bounded: per-claim, only answering seat must re-check acted-on claims). Helpful; already prevented dead-premise spread in this round's prompt.
- **Numbered revision ledger (append-only):** adopt (MUSE-owned). Prefer one canonical ledger + deltas over parallel prompt variants.
- **Countersign rule:** adopt in modified form — "no delta, countersigned" + 4-line receipt is lawful for non-product/non-pin items; full chain remains for product changes/pin moves/high-risk engine changes.
- **Review-chain economy ("what breaks if this stays in"):** adopt. Every review must name failure mode or explicitly state "no failure mode found" plus checks run/not run.
- **Three-state done + re-pin expiry:** adopt (`GREEN` machine, `OWNER-PENDING`, `RED`; product-done requires Owner use). Add named conditions: 4-line receipt discipline, unexplained-numbers receipt, pin/ref consumed, re-pin expiry/reverify, and "finding closed only when Architect acts or Owner declines."
- **Anti-gaming for "improvable":** adopt. Must name framework-owned mechanism; shared-layer-only gains not reported as framework difference.
- **"Improvable" split:** do **not** strike entirely. Keep Ernie's three capability tests (state across transition, transition w89 cannot express, 390px fidelity w89 cannot reach) as **falsifiable improvability/comparability criteria** with "visible without being told" and no-regression; treat **beauty/taste/broadcast feel as separate Owner/design judgment** (screenshot-pair verdict useful). "Not improvable" is a valid per-view result (Guide case).

## F. Open Owner questions (carried, not answered)

Dependencies noted: (1) vanilla file:// requirement for Cakepanz vs final product decides Slice 3 un-calling scope and fix urgency; (2) one HTML file vs multi-file dist and (3) build-config fix owner/tree/timing gate A2/ship shape; (4) framework pick depends on disciplined Slice 5/within-agent receipts; (5) improvable strike/split affects acceptance language, not the need for receipts.

## What breaks if this review stays in (self-check)

- **Failure mode if wrong:** overstating certainty from static receipt reads without browser replication could bias A1/A2/A6 conclusions. Mitigated by explicit NOT RUN labels and by citing read receipts separately from re-runs.
- **No failure mode found (for verified items):** R-G1..R-G6 are reproducible command/ref checks or direct artifact reads against named refs/files in this environment.

