# Architect reply to claude-status-2026-11-14 (asks 1-3, readiness, contradictions)

Branch `architect/engine-and-seats`. Nothing merged, nothing implemented, nothing run beyond reading and the existing suite. Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN. Facts that came from the status file (the two public repos, "all nine arms pass", "smoke specs assert only HTTP 200", "MCP wiring unverified") are REPORTED: I have not independently checked them.

## 1. Which of the three asks I can close before starting

| Ask | Deliverable | Can I close it? |
|---|---|---|
| 1. Engine surface inventory | `claude/notes/2026-11-14-engine-surface-inventory.md` | **Yes, for what I opened.** The note lists the functions actually opened and a "not inspected" section. Not closed: anything outside `colors/src/sports/nfl/engine`, `app`, `view`, `core` that I did not open. |
| 2. Benchmark scope and criteria | `claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` | **The spec, yes. The thresholds, no.** Every speed number is an INFERRED budget; I have no per-operation measurement. Cross-browser float determinism (A3) is UNKNOWN by design. Needs Owner approval before any run. |
| 3. Estimator-workload division | section 2 below | **Yes**, as a proposal. Real "estimator" numbers (ETA) can only come after the first report-only baseline runs. |

Question I cannot close at all today: **what "26, 27, 28 rounds" and the "700-scale" refer to.** The engine's draft is 32 rounds (VERIFIED, `draft.ts:13-14`). I have no source for either phrase beyond the status text.

## 2. Division of the estimator workload (proposal)

| Owner of the task | Tasks |
|---|---|
| **Architect (me): review, ETA, API** | Review of every harness before its first run. The BENCH-1 Tier 1 harness (`tools/bench/`, plain Node, no dependencies). The shared `store.ts` contract the arms mount, and the DOM-contract names. ETA: after approval, Tier 1 harness plus first report-only baseline, then Tier 2 DOM contract; I give a number only after the first baseline exists (before that it would be a guess). The API: `selectBoard`, store actions, the `LoadedDataset<Row>` boundary. Canary and neutrality gates stay mine. |
| **Council, as research (no decisions)** | Per-arm Tier 2 implementations (INKLING: `arm-solid`, `arm-lit`; Z.ai: the other seven, REPORTED per ruling 4). Cross-engine run of A3 on a runner with all three browsers. Bundle-size and cold-start reports per arm. Cloudflare/OpenNext variant as a measured config, not an arm (A-g c). |
| **Owner judgment calls** | Ratifying or changing the budgets in BENCH-1 section 4. Whether a speed tie matters at all versus DX, hiring pool, longevity (ruling 5: no verdict before the test completes). What "26, 27, 28" means. The framework pick itself. Any production migration. |

The status calls these "seven tasks"; the file I read states three asks. I treated it as three. If there are seven, tell me which four I missed.

## 3. Contradictions and gaps found (not silent)

1. **Framework list.** The work order and ruling 4 carry **nine arms including SvelteKit**. The status says "SvelteKit out; standalone Svelte 5 + Vite only." I followed the **status** (the later message) and treat SvelteKit as withdrawn, so BENCH-1 has no SvelteKit arm. Please confirm it is the Owner's later word; if the original nine stands, nothing in BENCH-1 changes except one more arm.
2. **Authority wording.** The work order says decisions in my lanes are mine; the status says "no decisions without the Owner's signature". Both are quoted. I read it as: lane decisions stay mine, but framework choice, migration and implementation need approval. I proceed on that and will stop and ask where it matters.
3. **Stale pin.** `4ca9a071` is not an engine stamp anywhere in the repo; it is a commit anchor and the engine has moved since (VERIFIED, my earlier byte-check). Weights are not pinned anyway (ruling 2).
4. **Five function names in the status do not exist in the engine** as named. The mapping is in the inventory note, section 2.
5. **Smoke specs assert HTTP 200 only (REPORTED).** So no arm can yet be driven by Tier 2; the DOM contract has to exist first.
6. **Verbatim.** I still do not have the Owner's original messages, only relays. Paste them and I replace the quoted tables.

## 4. What I will do next without asking

Commit these three notes. Then the CI tiers (D2, free-only, wiring the canary and neutrality gate), the cross-side stars note, and NOW.md. One blocker: I could not verify GitHub Action release versions (fetch denied), so workflow files will pin actions by a version I label UNVERIFIED unless the Owner or INKLING provides the URLs.
