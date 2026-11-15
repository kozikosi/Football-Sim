SPEAKER: glyph | ROLE: council | TASK: testing + innovation round 2 (platform + settle rule splits) | DATE: 2026-11-15T13:01:53Z
FOR: P-345

## Verified as of (read before answering; not re-litigated)
- Live site w89 (`origin/gh-pages` `3e69567c`), Q7 closed and suite 351/351 at `9acf1992`, bundle gap ~11 KB / 11,569 B JS-only gzip, file:// fix measured (Route B/C on card scale; module+crossorigin issue per Ernie/DS/Inkling corrections), Colors has no buildable app shell at tip and `react`/`react-dom` still declared, flex API `fit(role,dest).penalty`, λ settlement/estimator-open, pool 1953 (1941+12) with 32-row render gap sharpened. (REPORTED from round-2 verified-as-of block; selectively VERIFIED in this session: w89 header, flex table/API spot checks, pool counts/distribution, architect 351/351 on clean archive, shipped bundle/coldload receipt reads — see `inbox/20261115-1222-glyph-testing-innovation.md` for receipts.)
- Evidence inputs read for this split: Ernie `inbox/20261115-1225-ernie-testing-innovation.md` (receipt diff viewer proposal, passenger/settle framing), Inkling `inbox/20261115-1240-inkling-testing-innovation.md` (picks DIALS first, C1/C2 rule), Glyph prior `inbox/20261115-1222-glyph-testing-innovation.md` (picked Spec-first Sim Lab constrained to absorption + passenger/time-boxed). (VERIFIED via `git show` on `origin/council/ernie` and `origin/council/inkling`.)

Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN.

---

## 1) Platform's smallest version — which gets built first, and why

### Candidates compared (same axis)

| Candidate | What user/agent does | Engine work needed | What it proves that others don't | Primary falsifier |
|---|---|---|---|---|
| **Ernie — Receipt diff viewer** ("build before any of the three") | Select/pin two refs/builds (or ref+seed+fixture) and run; view byte-level/structured record diff + gate results side-by-side | Minimal UI over existing artifacts/commands; **no new engine math** if diffs compare produced records/manifests (INFERRED). Can start as CLI+static report if UI cost high | **Determinism/reproducibility and pin-move honesty directly** (A4's "same seed, two builds, byte-identical record" made visible). Proves "what changed and why" faster than any dial/spec surface; catches silent drift the others would normalize | No stable comparable receipts/records to diff, or diffs are not actionable because inputs (seed/fixture/pin) cannot be pinned/replayed |
| **GLM — DIALS panel** | Edit kappa + per-context λ + flex table as one validated JSON, run 100-season re-sim, inspect outcomes | **None new** if replay/season harness already accepts those inputs (REPORTED claim); UI validation + run wiring | **Form-heavy control/validation ergonomics and parameter-sensitivity workflow** in one screen; strongest stress-test of "many knobs, validated, re-run" and of how λ/kappa/flex interact in use | Users/agents cannot get trustworthy signal from 100-season re-sim (estimator unresolved), or panel becomes a polished display of unvalidated priors (VL λ non-identifiability risk noted by Ernie) |
| **Glyph — Spec-first Sim Lab v0** | Load/edit declarative spec (pin/ref, kappa, seed, scenario/fixture, team/context snapshot, output metrics), Run, compare to baseline, export/import JSON (read-only presets + editable kappa/seed/fixture, pinned runs) | Thin schema/runner/receipt capture + diff view; **no new engine math**; can wrap existing run path | **Reproducible, portable experiment provenance** (spec as durable artifact) and a general substrate for Lab/A3 work (placebo/injection/kappa sweeps become named specs). Proves reuse/shareability of runs, not just a one-off form | Specs not reused, or spec drifts from engine contract and becomes a second source of truth |

### Disagreements to keep visible (not smoothed)
- **Diagnostic substrate vs user-facing control:** Ernie optimizes for *truth of change* (diff receipts) before knobs/specs; GLM optimizes for *immediate parameter interaction*; Glyph optimizes for *reproducible experiment objects*. These answer different first questions.
- **Timing vs estimator state:** DIALS is most valuable once λ/controls are interpretable; before estimator validation (A3 open) it risks presenting uncertain knobs as controls (REPORTED concern). Receipt diff/spec surfaces remain useful even while estimator is open.
- **Absorption vs fork:** all should live in the same shell/mode (Inkling/Glyph constraint) — none should become a second app.

### Pick: build first — **Receipt diff viewer (Ernie), but as "Spec-pinned Run & Diff" v0** (a better smallest version)

**Build order (INFERRED, highest leverage):** (1) **Receipt diff viewer core** → (2) **Spec-first Sim Lab v0** that *produces* comparable run receipts/specs → (3) **DIALS panel** as a validated editor over that spec once controls/estimator are trustworthy.

**Why receipt diff viewer first**
- It proves the property every other platform surface depends on: **same pinned inputs produce comparable, explainable outputs**. Without that, DIALS/Sim Lab runs are anecdotes and regressions hide (directly aligned with A4 replay-determinism need and re-pin honesty).
- It is the smallest falsifiable value: if two refs/builds on the same seed+fixture+pin inputs do not diff cleanly/byte-identically where expected, the platform's "run" primitive is not yet trustworthy — found immediately, cheaply.
- It does **not** require settling λ, adding engine math, or choosing rich UI chrome; it can ship as a minimal view over existing receipt/record artifacts (or a generated diff artifact) and still deliver the core proof.

**Why not DIALS first (despite strong case):** DIALS is a compelling forms stress-test and zero-engine-work surface, but its headline output (100-season re-sim over λ/kappa/flex) is only as meaningful as estimator/identification work (A3, λ settlement caveats). Building DIALS first risks optimizing UI around knobs that are not yet decision-grade. **Exception:** if the Owner wants a platform/forms proof immediately after framework pick and accepts it as a *diagnostic/what-if harness* (not truth), DIALS becomes co-equal — but I would still require diff/receipt export underneath it.

**Why not plain Spec-first Sim Lab first:** the spec object is the right durable abstraction, but a spec editor without a first-class diff/receipt view re-creates "runs happened" without "what changed" being inspectable. The diff view is the missing primitive that makes specs trustworthy.

**Better smallest version than any single one (proposed): "Pinned Run Diff" (PRD-v0)**
- **Mechanism:** a single absorbed panel/mode with three parts: (a) **read-only preset + minimal editable spec fields** — `engine ref/pin`, `seed`, `fixture/scenario`, `kappa` only (no per-context λ/free-form formulas yet) — serialized as JSON (Glyph's spec seed, no drift-prone shadow state); (b) **Run** produces a pinned receipt/record artifact; (c) **Diff view** compares current run vs selected baseline (or two chosen receipts) showing gate pass/fail, key metrics, and byte/hash/structured deltas (Ernie's core). Export/import spec JSON; all runs declare pin/ref.
- **What this proves, combined:** determinism/comparability (Ernie), reproducible experiment definition (Glyph), and a path to validated knobs (GLM) without exposing unvalidated controls on day one.
- **Engine work:** none new beyond wiring existing deterministic run/season entrypoints and emitting/locating receipts (INFERRED; depends on current harness availability). ~1 screen + diff pane.
- **Falsifiers:** (1) cannot produce comparable pinned runs (blocks everything — A4-class issue), (2) users ignore specs but use one-off reruns (drop spec editor, keep diff), (3) diff is unreadable/non-decision-relevant (must show "what breaks/what moved" metrics, not raw dumps only).
- **If wrong:** if A3 quickly validates λ and the Owner prioritizes knob exploration over provenance, promote DIALS fields into the spec editor immediately (same substrate) — reversible by construction.

**Platform/framework note (INFERRED):** platform surface is form/state/validation/preview heavy, which strengthens authoring/tooling/typing weight over bundle — consistent with prior filings — but does not itself settle framework; Pinned Run Diff is framework-neutral in contract.

---

## 2) Framework settle rule — which rule settles Vue vs Svelte, and why

### Candidates compared

| Rule | Core test | Strength | Failure mode / why insufficient alone |
|---|---|---|---|
| **Glyph** | Win if >=15% lower correction effort on >=2/3 slices, wash -> Vue on tooling; N>=3 varied, first-implementation primary, second = replication; fidelity pinned, pre-registered | Balances majority evidence, avoids single-slice fluke, explicit wash/tie-break, practical cost signal | "Correction effort" must be operationalized (time alone is noisy; needs repair/defect context). Without review controls can reflect agent habit |
| **Ernie** | Fewer framework-owned repair cycles, sign-consistent >=2/3, tie -> Vue (per prompt summary) | Repair cycles target framework friction (not just typing speed); robust to wall-clock noise | If cycles counted loosely, subjective; ignores total time-to-green/defect severity unless paired. "Framework-owned" needs anti-gaming definition |
| **Inkling** | >=15% on **BOTH** wall-clock AND repair cycles (sign/threshold logic per filing context), else no win; plus label-swapped/blind review, fidelity pinned, tool-call logging | High confidence / low false-positive; blind review reduces bias; dual-metric resists gaming one measure | **Too strict/risk of permanent wash:** wall-clock and cycles can diverge (fast-but-churny vs slow-but-clean) especially at small N/high variance; may produce "no decision" even when maintenance-relevant signal is clear |

### Pick: **adopt Glyph's majority structure, hardened by Inkling's controls and Ernie/GLM's friction focus** (one reconciled rule)

**Settling rule (pre-registered, passenger on Slice 5 work when comparable; else N>=3 varied slices/tasks):**
1. **Protocol:** within-agent, same spec/fixture, numerically pinned fidelity (DOM nodes/rows/states/battery pass set/shared fixture bytes as feasible), per-slice randomized framework order, pre-registered rubric and stop rules. Log wall-clock, tool calls/checker interactions, repair cycles, framework-caused defects/rework, and framework-owned diff size. **First implementation per slice is primary;** second build/maintenance edit is replication/secondary (GLM point). Report per-slice pairwise delta with order, never aggregate-only. Cross-agent results, if any, reported only as secondary "a second agent found X," never averaged.
2. **Primary decision metric — correction effort:** a slice-pair "win" requires **>=15% lower correction effort** for one arm on the primary implementation, where correction effort = **time-to-green to pinned done** *and must be directionally consistent with repair cycles* (no arm wins on time while losing materially on repair churn). Framework-owned mechanism/defects must be named (anti-gaming: shared-layer-only gains do not count).
3. **Majority:** framework settles as winner if it wins **>=2 of 3** comparable paired slices/tasks with **no critical fidelity/regression loss**. If only 1 primary slice is completed (passenger, minimum), result is **indicative, not settling**.
4. **Wash:** if within ~±10% correction effort overall, split 1-1-1/mixed, or time-vs-cycles signals conflict -> **wash**.
5. **Tiebreak after wash:** decide on maintainability/tooling/ecosystem, type/error precision, offline/`file://` robustness, and existing receipts/perf direction (current evidence: bundle user-impact not decisive, boot direction measured Vue-faster but noisy/replication pending, tooling/maintainability lean Vue at low confidence) — **default lean Vue 3 + Vite** on maintainability/tooling when wash, given reversibility (~350 lines/direction) and compounding maintenance cost. (INFERRED; Owner/Architect may override with stated reason.)
6. **Integrity controls:** label-swapped/blind review where feasible (Inkling), anti-gaming clause (framework-owned mechanism named), and stop if measurement cost approaches migration cost (~350 lines) — then decide on existing evidence rather than forcing noisy data.

**Why this settles better than each candidate**
- **vs Glyph alone:** keeps its practical majority/wash design but prevents "fast with hidden churn" wins by requiring repair-cycle consistency and anti-gaming attribution.
- **vs Ernie alone:** keeps repair-cycle/friction insight but embeds it in a full settlement procedure (N, fidelity, primary/replication, aggregate-to-decision rule) so it actually produces a pick/wash.
- **vs Inkling alone:** keeps its best safeguards (blind/label-swapped review, logging, fidelity) but drops the brittle "BOTH metrics must clear 15%" gate that can manufacture indecision; instead requires primary metric advantage with non-contradictory churn signal, which is stricter than Glyph but achievable and meaningful.

**What would prove this rule wrong (falsifier):** repeated cases where the declared winner by this rule produces higher real maintenance/re-entry cost on subsequent slices (measured by time-to-correct-edit and defects in a fresh-context maintenance task). If so, increase weight of re-entry/maintenance metric and reduce time-to-green primacy.

## 3) What breaks if this stays in (self-check)
- **Failure mode:** picking Pinned Run Diff/spec-first too early without runnable pinned harness access could produce UI/process overhead before A4/A3 primitives exist. Mitigated: require diff/run to bind to actual emitted receipts/record hashes; start CLI/report form if UI blocked.
- **Failure mode:** settle rule can still be underpowered at N=1 passenger slice. Mitigated: N=1 is explicitly indicative only; no settlement claim without >=2/3 paired primary slices.
- **No failure mode found:** Ernie's "receipt diff before knobs/specs" ordering is consistent with determinism/re-pin needs; reconciled settle rule is pre-registrable and auditable via receipts/logs. (Checks run: read cited Ernie/Inkling/Glyph filings and round-2 prompt/verified-as-of context; no browser/estimator runs performed in this filing.)
