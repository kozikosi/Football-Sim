# BENCH-1: benchmark scope and acceptance criteria, for the Owner to approve or reject (ask 2, 14 Nov 2026)

**Status: PROPOSAL. Nothing in this document has been run.** Every number below is a budget or a rule to approve, not a measurement; where an existing measurement exists I cite it with its label. Inventory of the surface it measures: `claude/notes/2026-11-14-engine-surface-inventory.md`.

## 1. Shape in one paragraph

Two tiers. **Tier 1 (headless, framework-free, plain Node):** the engine's own workloads (pool, 32 rosters, snake draft, a season) with hard determinism gates and soft speed budgets. It exists first so the *old engine becomes the answer key* before any rebuild (guardrail 2). **Tier 2 (per framework arm, Playwright):** only the draft board's interactions (sort, filter, select, pick), driven through the same plain-TS store. The framework test needs Tier 2 only; Tier 1 is what stops us from fooling ourselves during the engine rebuild.

Two rules that follow from the Owner's rulings, so they are baked in, not options:
- **No weight pinning (ruling 2):** no gate compares an output against a committed number. Determinism gates compare *run against run* (same code, same seed, twice; Node 22 vs 24). A committed baseline file exists only to *report* drift ("MOVED / UNMOVED"), exactly as I did for the engine stamp.
- **No verdict from speed alone (ruling 5):** BENCH-1 produces measurements and a tie rule; it does not rank frameworks.

## 2. Data choices (my call, with reasons)

| Item | Choice | Why |
|---|---|---|
| Primary pool | **The real pool: `data/nfl/madden27-ratings.csv`, 1,941 rows** (REPORTED: `wc -l` 1,942 incl. header) | The product's own data, already carries a pinned data stamp (`PIN_DATA`, still asserted). A full draft is 32 teams x 32 rounds = **1,024 picks** (VERIFIED, `draft.ts:13-14`), which a 1,000-row set cannot supply. |
| Synthetic pool | **P-SYN: a seeded generator, 1,000 / 1,941 / 5,000 rows**, used only for the board scaling sweep (W5) | Shows how sort/filter/render cost scales without depending on real data; 1,000 is your number, 1,941 matches real, 5,000 is the headroom case for a second sport. Generator code and seed are part of the spec; its output hash is recorded, not gated. |
| Rounds | **Two draft sizes: D-5R (160 picks) and D-32R (1,024 picks, the real size)** | I cannot map "26, 27, 28" to anything in the engine (rounds = 32). If those numbers mean something else, say so and I amend. D-5R is the board-latency workload; D-32R is the stress case and the one that exposes replay cost late in the draft. |
| Seeds | **Seeds 1-5** for Tier 1, **seed 1** for Tier 2; user team index 0 and 31 (first and last in the snake) | Last pick of a round vs first pick of the next is where the snake does its asymmetric thing. |

## 3. Workloads, baselines, acceptance, test strategy

Ref. runner: GitHub-hosted `ubuntu-latest` (2 vCPU; my measured baseline for context: the whole existing 323-test suite takes about 46 s on a 2-core container, VERIFIED on Node 24.22, which is not a per-operation number). Environment fingerprint (node/chromium version, CPU model, commit sha) is written into every result file.

| # | Workload | Baseline (what is recorded) | Gate (hard, no timing) | Budget (soft; see section 4) | Test type |
|---|---|---|---|---|---|
| W1 | **Pool**: parse + freeze + hash the real pool; synthetic sweep | parse ms, data hash (reported), heap | datasetHash identical across 2 runs and Node 22/24; 0 duplicate ids | parse+freeze <= 250 ms | unit (node:test) |
| W2 | **32 rosters** (output of W3) | roster hash per seed | all 32 teams fill all 32 slots; no player on two teams; every pick `fit(...).legal` | n/a | unit |
| W3 | **Snake draft** D-5R and D-32R, user on `greedy` policy, seeds 1-5 | per-pick ms curve (picks 1..1,024), full draft ms, record bytes, record hash | record hash identical across 2 runs and Node 22/24; replaying the saved log through `restoreDraft` gives a byte-identical `DraftState` summary (VERIFIED existing test covers the idea; here at full scale) | D-32R full draft <= 10 s; save record <= 250 KB | unit + one soak |
| W4 | **One season**: `startSeason` -> `fixtures` -> `playWeek` x 22 weeks (18 regular + playoff weeks, `seasonrun.ts:23-24`) -> `table`; per game `matchupModel` + `simulateGame` -> summary row `{week, home, away, homeScore, awayScore, ot}` | season ms, per-game ms distribution, table hash, summary-rows hash | every team has exactly 17 regular-season games (GAMES = 17, `specs.ts:86`); W+L+T per team = games; league points-for = points-against; game count equals `fixtures()` count (272 regular, playoff count INFERRED 13: the run asserts it from `fixtures`, not from me); **any single game regenerated from `gameSeed(seed, week, home)` is byte-identical to the one in the season run**; results are not retained in state (appstate rule) | season <= 10 s; one `simulateGame` p95 <= 20 ms | unit |
| W5 | **Draft board** at the user's pick: `selectBoard` + sort (`wins`/`ovr`/`priority`) + filter (position, slot) + select-then-PICK | per-interaction ms by round (1, 5, 16, 32); VM rows hash | board rows are string-identical to `selectBoard` output; sort order equals the engine's order incl. id tie-break; a PICK followed by UNDO restores the previous VM byte-for-byte | see UX budgets | **Tier 1: unit on VM. Tier 2: E2E per arm** |

Filter note: `selectBoard` takes `{sort, limit, sims}` only (VERIFIED, `selectors.ts:11`); there is no position filter in the engine layer. BENCH-1 defines filtering as a UI-local operation over `BoardVM.rows` (default `limit` 60), and the 1,000-row case as `limit: 1000`. Whether filtering belongs in a selector is a design question I leave open.

## 4. Budgets and the rule that turns them into gates

Budgets are **guard rails to catch accidental slowdowns, not targets and not claims about today's speed**: I have no per-operation measurement of the current engine and will not invent one.

| Budget | Value (to approve) | Basis |
|---|---|---|
| UX-1 PICK -> next board painted | p50 <= 100 ms, p95 <= 250 ms, **at every round 1-32** | INFERRED: a click should feel instant (the usual 100 ms response rule); 250 ms p95 allows the CPU turns between the user's picks plus 30 `goneOdds` replays. The replay-from-pick-1 design (inventory section 3) is the thing this budget probes. |
| UX-2 sort or filter -> paint | 60 rows: p95 <= 50 ms; 1,000 rows: p95 <= 100 ms | INFERRED, same rule. |
| UX-3 select a row -> roster/detail updated | p95 <= 50 ms | INFERRED. |
| ENG-1 / ENG-2 / ENG-3 | D-32R <= 10 s; season <= 10 s; one game p95 <= 20 ms | INFERRED: about 10x headroom over what a sane implementation needs, to catch O(n^2) mistakes, not to optimise. |
| SAVE-1 | record <= 250 KB at end of draft; write median <= 10 ms | The record embeds the frozen pool (`toRecord(..., pool)`, READ). REPORTED in-repo (`platform/localstorage.ts` header): a 250 K-char write measured median 0.4 ms / max 3.1 ms. |
| Heap | **report only** | No basis for a number. |

**Rule:** the first three baseline runs are **report-only**. After them I present the real numbers next to these budgets; the Owner then ratifies, relaxes or tightens each, and only ratified budgets can fail a build. A ratified budget fails a PR when the median exceeds 1.5x the stored baseline median on the same runner class in 2 of 3 reruns (one noisy run never fails anything). If the current engine already misses a budget, that is a finding, not a failed benchmark.

## 5. Measurement protocol (so two people get the same answer)

- Tier 2 drives only a documented DOM contract (`data-testid`: `board-row`, `sort-wins|ovr|priority`, `filter-pos`, `pick`, `roster-panel`). Timing = interaction start to the frame after the DOM reflects the new VM (double `requestAnimationFrame`). Chromium headless, one fixed viewport.
- 3 warm-up iterations discarded, **20 measured per cell**. Arms are interleaved A-B-C... for 5 rounds so machine drift hits all arms equally. Report median, p95, MAD, and a bootstrap 95% CI of the median.
- A framework "beats" another on a metric only if the CIs do not overlap **and** the ratio is >= 1.2. Otherwise the cell is a **tie**, and ties are recorded as ties.
- **G5 (the strongest check):** the rendered text of the board must be string-identical to the VM in every arm, and the DOM-text hash must be identical across all arms (the VM is shared, so any difference is a framework-side bug). This is the "contract byte-identity" the status reports from the v3 test; here it is defined on the board and run per interaction.
- No Tier 2 number is compared with a Tier 1 number.

## 6. Determinism gates, including the one I do not know the answer to

- **A1** same (seed, team, policy) twice -> identical record, table and summary hashes. **Hard gate.**
- **A2** Node 22.23 vs 24.22 -> identical. **Hard gate.** (The existing suite is green on both: VERIFIED 323/323.)
- **A3 cross-engine: Chromium vs Firefox vs WebKit (Playwright) -> identical season and draft hashes. REPORT-ONLY, and the result is UNKNOWN today.** The engine uses `Math.exp`, `Math.tanh`, Box-Muller; ECMAScript lets those differ in the last bit between engines. If they differ, a save made in one browser can replay into different CPU picks in another, which bears directly on ruling 8 (the most sustainable save design). A3 turns that from a worry into a measurement. It needs a CI runner that can install all three browsers; this container has Chromium only.

## 7. What I need from the Owner (each with my default)

1. **Approve the two-tier shape and the "run-against-run, no committed pin" gate rule.** Default: approve.
2. **Pool:** real 1,941 rows primary, synthetic 1,000/1,941/5,000 for the board sweep only. Default: approve.
3. **Draft sizes:** D-5R and D-32R. What did "26, 27, 28" mean? Default: ignore it.
4. **Budgets in section 4** as provisional, with the report-only-for-three-runs rule. Default: approve as provisional.
5. **A3 as report-only now.** Default: approve; promote to a gate only if it comes back identical.

## 8. Not decided / not claimed

I have not decided the filter's home (selector or UI), the UI-side DOM contract's final names (the arms' scaffolds assert only HTTP 200 and a global state object, REPORTED by INKLING's status, so they cannot yet be driven), or whether the arms should mount `store.ts` as-is. When the Owner approves, I write `tools/bench/` (plain Node, no dependencies, result-JSON schema with an environment fingerprint) and send the harness for review **before** its first run.
