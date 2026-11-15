SPEAKER: glyph | ROLE: council | TASK: direction + innovation | DATE: 2026-11-15T11:53:50Z
FOR: P-345

Context basis (labeled): this filing responds to MUSE's direction+innovation prompt relayed by Owner (2026-11-15, rev 4) and assesses Ernie's filing `f3551218` / `inbox/20261114-1930-ernie-DEFINITIONS-2026-11-15.md` (VERIFIED read via `git show f3551218:...`). Project state, measurements, and rulings cited from the prompt and AGENTS/START-HERE context available in this session are **REPORTED** unless I re-ran a command here; commands I ran in this chat are **VERIFIED** (orient/fetch/step-0 refresh, preserve check, commit inspection).

## Q1. Direction for Claude

**Position (INFERRED, low-medium confidence).** Claude's highest leverage is to make the engine/platform seam cheap to evolve without re-litigating settled math: finish and harden the one-dial/P-318 seam work, then invest in measurement tooling that turns debates into receipts. Do not spend scarce sessions on UI polish, framework advocacy, or speculative second-dial dynamics before the seam and measurement loop are trustworthy.

**Start / continue**
- **P-318 seam first, with receipts.** Treat the context snapshot + portable math boundary as the enabling artifact for every later engine experiment (λ, dynamics registry, Lab). Deliver: a documented snapshot contract, deterministic fixture inputs, and a before/after receipt showing byte-identical engine outputs at pin `d3bd81d2` for unchanged behavior (or an explicit, owner-approved diff). **REPORTED** from prompt: P-318 seam first is already the engine plan v3 direction — I endorse it. Evidence to prove wrong: if seam extraction forces behavior changes that cannot be isolated or makes slice integration slower than direct edits for two consecutive iterations, the abstraction boundary is wrong.
- **One dial (kappa) only, instrumented.** Keep the dial singular until its estimator and output effects are measurable across the stated λ window `[0.3902, 0.4032)`. Define the readout before tuning: which outcomes move, by how much, at what sample size, and what counts as noise given min resolvable cell ~541 games and POST never resolving (REPORTED). Evidence to prove wrong: if kappa cannot move any decision-relevant output outside noise in feasible runs, stop tuning and reframe the dial.
- **λ estimator as a measured estimator, not a narrative.** Ship a small harness/report that computes λ with uncertainty/assumptions stated and records cwd/cmd/ref/output. Evidence to prove wrong: estimator instability larger than the window width across identical seeded inputs, or sensitivity to undocumented inputs.
- **Lab as a receipt generator.** The Lab should exist to answer "what changed and why" (inputs, seed, pin, outputs, diffs), not to become a second product UI. Minimum useful Lab: run pinned scenario, emit comparable metrics, save artifact. Evidence to prove wrong: if Lab sessions produce screenshots/opinions without reproducible artifacts, it is consuming time without compounding value.

**Stop / do not spend a session on (now)**
- **Do not redesign framework/UI direction from Claude's side.** Framework is under two-arm test with migration ~350 lines/direction (REPORTED); Claude's time is better spent on engine/contracts the UI consumes.
- **Do not add dynamics-registry breadth before one dial is evidenced.** A registry of speculative dynamics without calibration/receipts becomes silent-decay surface. Start with the smallest registry shape only after kappa has a measured effect.
- **Do not re-derive settled items** (69/72 vs 72/72, pin d3bd81d2, pool 1,953, λ window, Title Odds, one-blob+version save ruling) except when a new receipt contradicts them.

**Where I would spend Claude's next three sessions (INFERRED)**
1. **P-318 seam contract + parity receipt** — snapshot schema, engine entrypoints, deterministic fixture run proving parity at pin. Output: committed doc/spec + command transcript.
2. **λ/kappa measurement harness** — seeded runs over the window, report uncertainty and minimum detectable effect relative to 541-game cell; explicitly mark POST unresolved. Output: reproducible script/notebook-of-record + results table.
3. **Lab minimal loop or dynamics-registry spike chosen by (2)** — if (2) shows signal, build the smallest Lab flow to reproduce it; if not, spike only the registry interface with invariants/tests and stop. Output: one tool or one interface, not both half-built.

**Cross-cutting artifacts at risk of silent decay (and proposed owner)**
| Artifact | Decay risk | Arguably should own | Why |
|---|---|---|---|
| **Engine pin `d3bd81d2` / pin discipline** | UI/wave work or "helpful" fixes drift from the frozen engine truth; receipts become incomparable. | **Architect (Claude)** for engine-truth/pin moves; **MUSE** for recording/ruling visibility in council infra docs; **any seat** must refuse silent drift and file evidence. | Engine is Architect-owned (AGENTS §1/§8); pin changes are build-truth events that must be explicit. |
| **w89's `ZPB_SLOTS_WINS`** | Wave-local table copied/edited across w-series or arms; consumers assume it matches current engine/wave semantics. | **Z.ai (wave author)** owns correctness in shipped wave artifacts; **Architect** owns reconciliation against engine truth when it affects model behavior; **MUSE** tracks status in queue/docs. | It lives in the live wave/product delivery stream Z.ai ships, but its meaning couples to engine/model semantics — split ownership must be named at handoff. |
| **Lane-handoff protocols (`_agents/<seat>/...`, inbox/receipts, handoff docs)** | Stale lane files, missing receipts, "done" claims without pushed hashes; next seat acts on REPORTED lore. | **Each seat** for its own lane/inbox correctness and push discipline; **MUSE** for council-infra protocol/tooling and queue hygiene; **Architect/Owner** only for decisions, not routine handoff upkeep. | AGENTS gives seats their lane/inbox and MUSE infrastructure custody; no single seat can own others' handoffs without becoming assignment. |

**Disagreement/uncertainty (explicit).** I cannot independently verify current internal state of P-318/λ implementation beyond prompt text in this session (**UNKNOWN**). If Claude's actual next bottleneck differs, re-rank by receipt cost: pick the work that removes the largest unverifiable assumption.

## Q2. Direction for Z.ai

**Position (INFERRED).** Z.ai should optimize for comparable, receipted product learning: finish/measure the user-visible slice work (Slice 5 player cards) while running the authoring measurement in the disciplined form Ernie proposes, and treat season-sim expansion as secondary until slice-level "done" and measurement semantics are stable.

**What to build next and how to measure**
- **Slice 5 (player cards, dynamic/beautiful/interactive) next, in one arm first only if parity is explicitly paused; otherwise keep parity for this slice.** Build against a concrete w89-referenced card/view contract: same data fields, defined states (default/expanded/loading/error/empty as applicable), 390px behavior, and interaction receipts (what changes on tap/hover, what state persists). Measure: boot/console/file:// (subject to Owner ruling), 390px probe, interaction checklist recorded as pass/fail with commands or captured steps, and visual delta vs w89 described as "visible without being told" per Q6 criteria. **REPORTED**: slice 5 is defined as player cards in prompt — I do not invent fields beyond that.
- **Season sim: defer major expansion until Slice 5 + measurement decisions settle.** If worked, scope to a receipted vertical slice (run-to-completion correctness against pinned engine behavior, no crash/console error across run) rather than UI breadth. Measure by full-run completion receipt and invariant checks, because batteries/slices do not equal a system (aligns with Ernie §1.6).
- **Authoring-cost measurement: run, but only in the stronger design.** Principal executor Z.ai (REPORTED Owner grant) should run **within-agent, per-slice randomized order**, both arms, same fixture and numerically pinned fidelity (DOM nodes/rows/states/chrome bytes where feasible), recording time-to-correct-slice, defects found/fixed, rework/review churn, and blocked steps. Ernie's arm remains **secondary evidence** ("a second agent found X"), never averaged (see Q3). This answers "easier for Z.ai/other agents" more directly than a primary cross-agent mean.

**Parity through remaining sittings?**
- **Recommendation: keep parity through Slice 5, allow a pause after a receipted checkpoint — pause the Vue arm only if evidence already disfavors it, otherwise pause neither.** Rationale (INFERRED): migration is cheap (~350 lines, REPORTED) but parity is the only way to keep the authoring/fidelity comparison honest while slices are still defining "done." Pausing Svelte now would bias learning toward Vue's workflow; pausing Vue now would discard the maintainability bet before within-agent data exists.
- **Pause condition (if needed):** pause one arm only after (a) Slice 5 spec/fixtures are frozen, (b) within-agent measurement protocol is committed, and (c) at least one full measured slice-pair exists. **Resume when:** a decision-relevant criterion flips (e.g. within-agent authoring clearly favors paused arm, or Owner/framework direction requires it). **Risk of pausing:** loss of comparable receipts, drift in fixtures/fidelity, re-onboarding cost, and overfitting the decision to bundle numbers that already failed to predict interactive time (REPORTED: Vue faster on median boot/mounted, within/near noise caveats).

**How to measure Slice 5 specifically (proposed receipt shape, INFERRED)**
- `cwd · cmd · ref · output` for build/test/probe commands.
- 390px screenshots/DOM evidence for heaviest card state(s).
- `file://` boot result reported under the Owner's clarified requirement (vanilla vs flagged) — **UNKNOWN until Owner answers**.
- Engine parity statement: byte-identical to pin `d3bd81d2` or explicit diff receipt.
- Owner-use note: not a substitute for technical checks, but required for product-done (agree with Ernie).

## Q3. Framework: easier/faster/more complete for an agent (Vue 3 + Vite vs Svelte 5 + Vite)?

**Answer (INFERRED, low confidence, reversible).** **Lean Vue 3 + Vite** for agent authoring/maintenance over time, but I do **not** claim it is settled. Svelte 5 + Vite remains a legitimate, measurement-backed contender on bundle/output simplicity and may win on within-agent authoring for a given agent.

**Why (balancing reported evidence)**
- **REPORTED (MUSE prompt):** low-end boot shows 10.9 KB gzip bundle advantage did **not** move interactive time in Svelte's favor (Vue median first-contentful-paint 2102 ms vs 2192 ms, mounted 2185 ms vs 2344 ms; noisy, direction consistently Vue; both pass 390px). Therefore bundle is not a decisive user-facing performance win for Svelte here.
- **REPORTED (MUSE):** store/maintenance surface cited as smaller/simpler in Vue example (61 vs 68 lines) without compiler-forced getter-wrapper idiom; TS/tooling/ecosystem generally stronger — these favor long-horizon agent maintainability but are not yet measured as end-to-end authoring cost in this project.
- **REPORTED (Z.ai):** prefers Svelte 5 narrowly by bundle (70% confidence) — valid as a measured output criterion, but insufficient alone after boot data.
- **Migration cost ~350 lines/direction (REPORTED):** decision is low-stakes/reversible; optimize for compounding maintainability and clarity of receipts, not for a one-time 11 KB delta.

**Single measurement that would settle it for me (INFERRED)**
A **within-agent, counterbalanced, per-slice authoring benchmark** run by the same principal agent on N>=3 comparable slices: identical spec/fixture, numerically pinned fidelity, randomized framework order per slice, pre-registered rubric. Primary outcome: **time-to-correct-slice** (to passing "done" receipt) with secondary outcomes **defect/rework count** and **review churn**. Settle rule: if one framework wins >=2/3 slices with materially lower total correction effort (pre-declare threshold, e.g. >=20% or non-overlapping uncertainty) and no critical fidelity regressions, pick it; otherwise call it a wash and decide on non-authoring criteria. This settles "easier/faster to produce correct, maintainable slices for that agent" — which is the operational question.

**Inputs (several) and proposed weighting (INFERRED proposal)**
| Input | Why it matters | Proposed weight | How to measure |
|---|---:|---:|---|
| **Authoring/correction cost (agent)** | Compounds every future slice/bugfix; dominant under maintenance. | **35%** | Within-agent time-to-correct, defects, rework/review churn (primary). |
| **Correctness/fidelity to spec & engine** | A fast-but-wrong framework loses. | **20%** | Battery/probe pass, parity-to-pin receipts, fidelity deltas. |
| **Runtime/UX impact (measured, not assumed)** | User-perceived performance and responsiveness. | **15%** | Low-end boot/interaction metrics, 390px behavior; bundle only as proxy when measured irrelevant. |
| **Maintainability/readability for agents & humans** | Future changes, debugging, onboarding. | **15%** | Code size/complexity in changed surfaces, type error precision, review findings over time. |
| **Tooling/ecosystem/debuggability** | Unblocks agents, reduces hallucinated API use. | **10%** | Build/test/tool support quality, diagnostics clarity, availability of patterns (qualitative but evidenced). |
| **Platform/design-surface fit** (forms/state/validation if platform path) | Matters if product becomes simulation-design platform. | **5%** (raise to 15% and reduce runtime to 10% if platform is prioritized) | Prototype a rule-editor/form-heavy slice in both arms. |

*Note:* weights are a decision aid, not a formula to hide uncertainty; publish per-input receipts and let Owner/Architect override with stated reason.

**Assessment of Ernie's cross-agent attack and revised design (`f3551218`, Q3)**
- **Agree (VERIFIED I read; assessment INFERRED):** primary cross-agent comparison is weak for causal attribution because agent skill/training/prior exposure can dominate framework effect; "cannot be replicated" as a general claim is directionally right (a third agent gives another point, not a stable law). Treating cross-agent results as "a second agent found X," never averaged, is the correct evidentiary posture.
- **Agree:** **training-data mix** is a plausible, largely unseparable confound and should have been named explicitly; I cannot measure it (**UNKNOWN**), so results must be scoped to "for agent X under protocol Y."
- **Agree with revised primary:** within-agent, per-slice randomized order is stronger for the asked question ("easier for Z.ai and other agents..." operationally starts with the agent doing the work). Per-slice randomization controls learning/order effects better than per-sitting.
- **Improvements / conditions I would add:**
  1. **Pre-register rubric and stop rules** before runs (what counts as "correct," allowed help/spec access, max time, when to stop) to prevent post-hoc framing.
  2. **Pin fidelity numerically** as Ernie requires (DOM nodes/rows/states/chrome bytes or equivalent) — "same view/chrome" is insufficient.
  3. **Control spec quality:** give both arms the same written spec, fixtures, and acceptance checks; log prompts/tooling differences as part of receipt.
  4. **N>=3 slices or tasks of varied shape** (stateful UI, form-heavy/platform-like, animation/transition) because framework advantage may be task-dependent.
  5. **Report confidence/variance, not just winner:** medians/totals can hide spread (boot data already showed large per-trial spread — REPORTED).
  6. **Separate "first implementation" from "maintenance edit"** if possible: one slice built fresh, one modification task on existing code — maintainability is the compounding cost.

**Is the whole authoring measurement worth running?** **Yes, but only in the disciplined within-agent form.** A sloppy cross-agent comparison is likely to produce expensive, ambiguous evidence; a pre-registered within-agent benchmark directly informs the maintainability bet MUSE identified and is cheap relative to months of framework churn. If it cannot be run with pinned fidelity, randomized order, and receipts, **do not run a weaker version and call it evidence** — that would cost more than it returns (REPORTED/INFERRED lesson from current ambiguity).

## Q4. Open innovation (any aspect)

**Does a platform's design surface change the framework decision, or is it neutral?**
**It changes the weighting, not obviously the winner — but it tilts toward authoring/tooling (often Vue's relative strengths) and away from raw bundle size.** (INFERRED, aligns with Ernie §5.) A simulation-design platform surface is predominantly **forms, schema-driven controls, validation, presets, live preview state, undo/compare, and error feedback** — interaction patterns where explicit typing, predictable reactivity, and debuggable data flow matter more than minimal JS bytes. Bundle/perf still matter, but only where measured on the real surface; after the reported boot result, bundle alone is weak evidence. Therefore: **neutral in theory, Vue-leaning in practice if the platform emphasizes typed form/state complexity** — subject to within-agent evidence on a form-heavy slice.

### Idea 1 (developed): "Spec-first Sim Lab" — smallest platform surface worth building
- **Mechanism:** introduce a **declarative simulation spec** (JSON/YAML-like data object, not new language) covering the few knobs already conceptually present: engine pin/ref, kappa (one dial), scenario/fixture selector, seed, team/context snapshot inputs, and output metric selection. UI is a thin editor + "Run" + diff view: left side edits spec, right side renders results/receipts (table/summary + delta vs baseline). No user-authored arbitrary formulas in v0.
- **Why this, now:** directly serves Claude's Lab direction (receipt generator, not second product UI), creates a natural form-heavy platform slice to test framework fit, and makes λ/kappa experiments reproducible/shareable.
- **Evidence it helps:** time to reproduce a disputed result drops; every tuning claim can attach a spec+receipt; fewer narrative-only arguments.
- **Smallest version worth building first:** read-only preset specs + editable kappa/seed/fixture only, one "compare to baseline" output panel, export/import spec JSON, all runs pinned to declared engine ref. ~1-2 screens, no persistence beyond file/export.
- **What would prove it wrong:** if users/agents still prefer ad-hoc runs, specs are not reused, or spec maintenance becomes a second source of truth that drifts from engine contract.

### Idea 2 (developed): "Player Card as a verifiable interaction contract"
- **Mechanism:** define Slice 5 player cards by a **state contract** rather than pixels alone: required data fields (sourced from pinned engine/data snapshot), view states (collapsed/expanded, loading/error/unavailable if applicable), interactions (tap/expand, compare/add if in scope), and preserved context (scroll/filter/selection survives navigation where w89 loses it). Implement once per arm against the same fixture and assert contract with a checklist + DOM/state probes; visual "beauty" is evaluated only after contract passes.
- **Why:** turns "dynamic/beautiful/interactive" into testable improvements tied to Q6 ("visible without being told") and prevents pretty-but-brittle cards.
- **Evidence:** measurable reduction in "works on my machine/screenshot" disputes; interaction regressions caught by probes; Owner can judge aesthetics on a correct base.
- **Smallest version:** one card type, one list context, two interactions (expand + persist one selection/filter across one navigation), fixed fixture.
- **What would prove it wrong:** if contract overhead slows delivery without reducing regressions, or if the chosen interactions are not the ones users notice/value.

### Contrarian case (settled item that should not survive next ruling without re-test)
**"Z.ai prefers Svelte 5 narrowly by the bundle (10,946 B gz, 70% confidence)" should not survive as a decision-relevant preference in its current form.** (REPORTED as a prior position; challenge is INFERRED.)
- **Why challenge:** MUSE's low-end boot measurement (REPORTED) already showed the bundle gap did not translate into better interactive time for Svelte; direction favored Vue on medians (with noise). A preference anchored to bundle size is therefore a proxy that failed calibration for the measured UX outcome.
- **What would save it:** a new, reproducible measurement showing bundle/output differences matter on a real target condition not yet tested (e.g. slower network than local file:// assumptions, different device/storage profile, or a form-heavy/platform slice where Svelte's compiled output changes authoring/runtime tradeoffs materially) — stated as receipts, not confidence.
- **What would end it:** repeated end-to-end measurements (boot + interaction + authoring/correction) where bundle delta does not correlate with user-visible or agent-visible wins.

## Q5. "Done" for a slice (proposal) — assessment of Ernie

**Assessment of Ernie's definition (f3551218, VERIFIED read).** I **agree with most of it**: 390px rendering, zero blocked requests/console errors, battery passes with every SKIP/DEFER justified in writing, engine byte-identical to pin, manifest verifies from git (not author working tree), and Owner has used it are strong necessary conditions for product-done. I would **refine** two things:
1. **`file://` in vanilla mode** is necessary **iff** the Owner declares vanilla `file://` a requirement for Cakepanz/slices (prompt states this answer decides un-calling vs non-issue). Until then: **REQUIRED TO REPORT** (pass/fail, vanilla vs flagged) and a blocker for "offline-done" claim, but the council must not silently treat flagged mode as equivalent.
2. **Separate "technically done (slice)" from "product accepted"** explicitly: Owner-use is necessary for *accepted/shippable product state*; a slice can be *technically receipted* but not owner-accepted. Ernie's last clause is right for "done" as a product state — I would keep it and name the intermediate state to avoid ambiguity.

**Proposed "done" (INFERRED, for council agreement)**

A slice is **technically done** when all necessary technical conditions pass with receipts; it is **done (product)** only when the Owner has used it and said it is right. Any "no" on a necessary condition means NOT DONE (or "done except X," named explicitly).

**Necessary and sufficient conditions (receipt shapes)**
| Condition | Necessary? | Sufficient alone? | Check type | Receipt shape |
|---|---:|---:|---|---|
| Renders at 390px on heaviest relevant view, no horizontal scroll/broken layout | Yes | No | Machine + human visual | `cwd·cmd·ref·output` for probe/test + screenshot/DOM note at 390px |
| Boot/runtime: zero console errors; zero blocked requests under declared mode | Yes (mode declared) | No | Machine | console/network log or probe output; explicitly state **vanilla file://** vs **flagged** vs **served** |
| `file://` vanilla boot | **Conditional (Owner ruling)**; required to report now | No | Machine | boot attempt from `file://` with no flags, result + errors (e.g. CORS/crossorigin) |
| Battery/test suite for slice passes | Yes (for covered scope) | No | Machine | command + full relevant output; list every SKIP/DEFER with written reason |
| Engine byte-identical to pin `d3bd81d2` (or owner-approved diff) | Yes when slice consumes engine | No | Machine | `diff -rq`/hash compare against `git archive <pin>` or declared ref; any diff explained |
| Manifest verifies from git (clean extraction), not author working tree | Yes when manifest/artifacts shipped | No | Machine | extract archive/commit, run `sha256sum -c` (or equivalent), output shown |
| No unexplained numeric/content drift; moved numbers receipted | Yes | No | Human review + evidence | before/after + reason in filing/receipt |
| Keyboard reachable / sane tab order for interactive elements in scope | Yes for interactive slices | No | Machine-assisted/human | tab-order probe or scripted check + notes |
| Owner has used it and said it is right | Yes for **product-done** | No | Owner-review-only | explicit Owner statement/reference |

**What is missing entirely (beyond a loose checklist)**
- **Declared scope/fixture:** "done" must name which view/states/fixture the receipts cover.
- **Reproducibility ref:** commit hash(es) and pin(s) used; "from git" verification as Ernie states.
- **Regression guard:** how "done" stays done (see below).

**Machine-checkable vs human-checkable vs Owner-review-only**
- **Machine-checkable:** 390px probe results (partly), console/blocked requests, battery pass/fail, byte/hash equality, manifest checksum, file presence/citation sweeps, deterministic diff checks.
- **Human-checkable:** visual correctness/beauty, content/wording rules, justification quality of SKIP/DEFER, whether an interaction is "visible without being told," accessibility nuances beyond tab order.
- **Owner-review-only:** "used it and said it is right," acceptability/taste/product fit.

**Does "done" differ for S1–S5 vs S6–S7?** **Yes (agree with Ernie §1.6).**
- **S1–S5 (slices/views):** gated by slice battery + probes + scoped interaction/state checks on declared fixtures.
- **S6–S7 (systems: season/playoff/full run):** require **end-to-end completion receipts** — run to Super Bowl/completion, standings/bracket correctness invariants, zero crash/console error across the full run, reproducible seed/ref where applicable. A battery is necessary but not sufficient for a system.

**How "done" does not become broke (receipts now, broken later)**
- Pin engine/fixture refs in receipts; re-run probes/batteries from clean git extraction in CI-like repeatable checks (candidate 8 helps).
- Keep structural assertions/tests (see Q7) so pin moves update expected identities intentionally, not silently.
- Track "done except X" items as open until closed (Slice 3/file:// case).
- Require receipt bundle: commit hash, command transcript, environment/mode flags, and artifact checksums.

**Existing thing this definition would un-call (falsifiability test) — and can I name one?** **Yes.**
- **Slice 3 (Cakepanz, rev2-landed as described) is un-called as fully done/offline-done** because it does not boot from **vanilla** `file://` (CORS-blocked `crossorigin` tags; app does not mount) — **VERIFIED by MUSE per prompt; Ernie reported same**. It may remain "done except offline/vanilla-file://" pending Owner ruling on whether vanilla file:// is required for Cakepanz or only final built product (**UNKNOWN**). If Owner rules vanilla file:// not required for Cakepanz, this specific un-calling becomes a non-issue for that scope, but the definition remains useful because it forced the ambiguity into the open.

**Ruling on eight candidates**
| # | Candidate | Necessary? | Sufficient? | Inert/notes | Ruling |
|---|---|---:|---:|---|---|
| 1 | Two-arm bench battery passes | **Conditionally necessary** for framework-comparison claims/parity slices; **not universally necessary** for every single-arm product slice | No | Can be inert for product progress if arms already decided; essential for comparison receipts | **Necessary for comparison/parity "done"; otherwise optional but valuable.** |
| 2 | Bench + a `predict.md` reading is part of done | No | No | Often inert ritual unless prediction is tied to a falsifiable hypothesis | **Not necessary.** Useful only when pre-registered hypothesis matters. |
| 3 | Four-line receipt discipline (`cwd · cmd · ref · output`) | **Yes** (for any claimed verification) | No | Not inert; prevents "works on my machine/path" ambiguity | **Necessary whenever a claim is labeled VERIFIED.** |
| 4 | Save refusal works (corrupt and newer both) | **Yes, when slice/system includes save/load/persistence** | No | Inert for slices with no persistence surface | **Necessary for persistence scope (and critical for "done not-become-broke"); N/A otherwise.** |
| 5 | Owner has looked at it in his own browser | **Yes for product-done/acceptance** | No | Not a technical proof; can be "inert" to correctness but decisive for product | **Necessary for product acceptance, not for technical receipt alone.** |
| 6 | AGENTS.md style is enforced | No as universal gate | No | Partly inert if automated where possible; important for consistency/content slices | **Necessary only for slices whose scope includes governed content/style outputs; otherwise recommended hygiene.** |
| 7 | w89 save path holds | **Yes, when compatibility with w89 save path is in scope** | No | Inert if slice does not touch save compatibility | **Necessary for save-compatibility claims/slices; otherwise N/A.** |
| 8 | Bench passes from a fresh clone | **Strongly recommended; necessary for "releasable/reproducible done"** | No | Catches hidden local state/working-tree dependence (aligns with Ernie's manifest-from-git point) | **Necessary for release-grade confidence; at minimum required before calling cross-environment done.** |

**Does "done" differ across slice mechanism (save, sim, feed)?** **Yes.**
- **Save/persistence slices:** add candidates (4),(7), migration/version refusal behavior, corruption handling, round-trip receipts.
- **Sim/engine-facing slices:** add pin parity, deterministic/seeded reproducibility where applicable, invariant outputs, full-run completion for system-level claims.
- **Feed/view/UI slices:** add 390px/fidelity, interaction/state persistence, console/network cleanliness, accessibility checks.
Common core remains: declared scope, receipts, no unexplained drift, and Owner acceptance for product-done.

**Who decides on disagreement — Architect, Owner, either?**
- **Facts/receipts:** verifier/reviewer evidence wins (and any seat can reproduce). **Architect** resolves technical integration disputes.
- **Design/product acceptability:** **Architect** decides ordinary product/engine design; **Owner** decides product direction and final acceptance ("used it and said it is right"). On conflict between "technically receipted" and "acceptable," **Owner's acceptance governs product-done**; Architect governs what gets built/merged.

## Q6. "Improvable" — assessment of Ernie

**Assessment of Ernie's definition (f3551218, VERIFIED read).** I **agree**: a w89 view is improvable in a framework if it can do at least one of (1) preserve state across a transition w89 loses, (2) express a transition w89 cannot (animate/interpolate/morph), or (3) reach a 390px fidelity w89 cannot — **and the difference is visible to a user without being told**. This is appropriately falsifiable and user-centered.

**Refinements (INFERRED)**
- Add **"without regressing a w89 capability or correctness in that view"** — an animation that breaks state/data/fidelity is not an improvement.
- "Visible without being told" should be judged on the **declared task flow** (e.g. filter -> navigate -> return), captured as a short reproducible interaction receipt (video/gif/steps + result), to avoid taste-only disputes.
- **Performance/responsiveness** can count only when user-visible in that flow (e.g. perceived latency/jank), consistent with boot-data lesson: proxies (bundle size) do not substitute for visible effect.

**What makes a feature NOT improvable?** (agree with Ernie's Guide case)
- The view is **static/reference content** with no state, transition, or fidelity gap to close (Guide example: **not improvable** in either framework absent invented content — which would violate data-integrity rules).
- Proposed "improvement" requires **invented/unsupported data or behavior**.
- Difference is **not visible without narration**, or is purely internal/architectural with no user-observable effect in scope.
- It **regresses** existing capability, correctness, accessibility, or 390px usability.

**Ruling on five candidates (or sixth)**
| Candidate | Pros | Cons | Ruling |
|---|---|---|---|
| 1. Interactive-tag wins (more clickable/hoverable) | Easy to count; encourages affordances | Rewards clutter; clickability != better; can regress clarity/mobile | **Reject as criterion.** At most a weak signal if it enables a visible task-flow improvement. |
| 2. Measurable wins (paint/bytes/cold-load) | Objective, reproducible | Proxies can mislead (bundle did not predict interactive win, REPORTED); users care about perceived outcome | **Secondary only.** Counts when tied to a user-visible difference in declared flow; never sufficient alone. |
| 3. Replaces a w85 sentence with something better | Targets clarity/content quality | Subjective; "better" unfalsifiable without rubric; risks invented claims | **Reject in this form.** Accept only if rewritten as checkable clarity/comprehension or correctness outcome (rare for UI framework comparison). |
| 4. Closes toward "broadcast-tier" | Aspirational direction | Vague, taste-driven, not falsifiable | **Reject as gate.** Keep as design vision, not "improvable" definition. |
| 5. Strike "improvable" as criterion entirely (beauty = separate track) | Avoids pseudo-objectivity | Throws away useful, testable UX deltas (state/transition/fidelity) | **Reject striking entirely.** Split it: **improvability (Q6, falsifiable)** is a quality/UX criterion; **beauty/taste** is a separate Owner/design judgment layered on top. |
| 6. **(Invented)** Task-flow outcome win: user completes a declared task with fewer steps/errors or with preserved context/clearer feedback, visibly | Directly user-observable, testable with scripted flows | Needs careful task selection; can miss aesthetics | **Adopt as complementary test** under Ernie's umbrella (often equivalent to state/transition/fidelity expressed as outcomes). |

**Net:** Ernie's three tests + "visible without being told" + no-regression is the right core. Beauty remains real but is **not** the gate by itself.

## Q7. Two de-gated tests — explain and recommend

**Exact reason each fails (as given, REPORTED; consistent with ruling context).**
- **`lineup.test.ts`**: asserts exact OVR losses after the P-318 seam landed (reported `2400/2700` across flex comparison). The seam/pin change moved computed totals, so a pinned total became stale even if structural behavior is correct.
- **`versions.test.ts`**: stamp-pin test demands old `nfl1.14a4e9333e888a`; engine stamp moved on new pin, so equality fails while the change may be intentional.

**Suite state (REPORTED):** 318/320 with 2 de-gated; ruling is FIX THEM (Architect).

**Recommendation: rewrite as structural/assertion-appropriate tests, do not delete.** (INFERRED)
- Deleting removes regression coverage and hides future breakage.
- Rewriting preserves intent: catch real structural/contract breaks while tolerating intentional, receipted pin/value movement.

**Review of Ernie's proposed structural assertions (VERIFIED read, technical fit INFERRED without running tests here)**

1. **`lineup.test.ts` — replace total with structural checks, demote total to REPORT:** **Agree in intent; mostly agree in substance, with adaptation caveats.**
   - `flexPenaltyFor('WR','CB'|'FS'|'SS') === 6` — good if these are the invariants the flex table/pin currently guarantees; **must match current authoritative flex rules/pin** (flex table changed per prompt history; verify against `tools/mathlab/flex.json` / engine source of truth before landing).
   - `lineup.filter(p => p.slot === 'TE3').length === 1` — right kind of check (stand-in fills slot), but **slot naming/API shape must be verified** against actual lineup representation (could be `TE3`, different key, or roster-position logic). **UNKNOWN here without code inspection.**
   - `flexPenaltyFor('DT','FB') === 0` — good invariant to pin if still true by rule.
   - `console.log(REPORT total...)` not a gate — **agree**: preserves observability without pinning a derived number.
   - **Improvement:** also assert the compared lineups are constructed from the same intended fixture/context and that no unexpected extra flex penalties appear (guards against "passes because both wrong"). Keep the REPORT total but include inputs/ref in output for traceability.

2. **`versions.test.ts` — MOVED/UNMOVED for engine stamp; keep data stamp asserted:** **Agree.**
   - Reporting engine stamp with MOVED/UNMOVED relative to `PINNED_ENGINE_STAMP` makes intentional pin moves explicit without silent failure.
   - **Keep `readDataStamp()` (or equivalent ratings/data identity) asserted** as Ernie proposes, since it is an independent contract that should remain stable unless intentionally re-pinned with receipt.
   - **Improvement:** when MOVED, require the receipt/ref to be available in test output or companion metadata (so CI/logs show *why* moved: "moved to pin X per receipt Y"). Optionally assert engine stamp matches **current declared pin** constant when the repo declares one, rather than only comparing to old value — that turns "moved intentionally" into a positive check.

**General rule — stale expected value on a pin move: rewrite or update?** (INFERRED)
- **Rewrite the test** when the assertion pinned a **derived outcome** of weights/math/engine behavior that is allowed to change with an intentional pin/seam move (e.g. totals, exact scores/loss aggregates). Replace with **invariants, contracts, or structural properties** that should hold across the move; demote volatile magnitudes to REPORT with context.
- **Update the expected value/pin identity in the test** when the test's purpose is to assert **"this artifact is exactly this pinned version/build/stamp"** and the pin move is intentional and receipted — but update it as part of the same deliberate change that updates the declared pin, not as a blind fix to go green.
- **Never** "fix" by weakening to meaninglessness or by deleting coverage without replacing it. **Never** update a pinned expectation to hide an unintended behavior change; first prove intent with a receipt/diff.
- **Practical heuristic:** if a failing value answers "what is the current output?" → prefer invariant/REPORT; if it answers "what version/ref did we intentionally choose?" → update with receipt.

## Q8. Disposition — the thirty-minutes test

**If I had the Owner's authority for thirty minutes (one stop, one start, one keep):**

- **Stop:** running or citing **non-receipted / methodologically weak comparison claims** as decision evidence (especially bundle-only or non-randomized, non-pinned-fidelity authoring anecdotes). Replace with: no comparison claim without `cwd·cmd·ref·output`, declared mode/fixture, and pinned fidelity.
  - **Risk that bites:** stopping this can feel like "slowing down" and may leave a vacuum where louder but weaker narratives fill the gap; must pair with a cheap pre-registered template so good evidence is easier, not harder.

- **Start:** a **pre-registered within-agent framework authoring benchmark** (Z.ai principal) for one well-specified form/state-heavy slice (Slice 5 or a platform-like rule-editor micro-slice), per-slice randomized order, numerically pinned fidelity, rubric for time-to-correct/defects/rework — with Ernie's arm logged separately as secondary if run. Produce one comparable receipt pair before further framework rhetoric.
  - **Risk that bites:** picking the wrong slice shape biases the result (animation-heavy favors one axis, form-heavy another); mitigate by declaring task class and, if time allows, scheduling a second contrasting slice.

- **Keep:** **engine pin discipline and "receipts over assertions" culture** (`d3bd81d2` as truth, byte/manifest verification from git, labeled VERIFIED/REPORTED/INFERRED/UNKNOWN, no silent numeric drift). This is the compounding asset that makes every other decision revisable.
  - **Risk that bites:** rigidity/overhead if applied without scope (turning every exploratory note into ceremony) — but losing it is costlier.

**One thing the council does that costs more than it returns (no softening)**
**It produces too many long, overlapping analytical filings that re-litigate framing without converting uncertainty into a single pre-registered, executed measurement.** The artifact volume creates confidence theater and review load while the decisive inputs (disciplined within-agent authoring receipts, Owner ruling on vanilla file:// scope) remain open. Fewer documents, more runnable protocols with committed pass/fail criteria, would return more per token.

---
Labels used in this filing: **VERIFIED** (commands/readings I executed in this chat: orientation, fetch, governance-doc refresh commands, preserve check, `git show` of Ernie commit/file, timestamps, file creation intent), **REPORTED** (project facts/measurements/rulings stated in prompt and prior filings not independently re-measured by me now), **INFERRED** (my analysis, recommendations, weightings, causal judgments), **UNKNOWN** (items requiring Owner decision, uninspected code/API details, or unmeasurable confounds such as training-data mix).
