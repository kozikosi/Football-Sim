# The multisport engine build — INKLING's v2 overarching plan (2026-11-14)

**Status:** advisory design note for the Architect, the Owner, and the council. **Nothing here is decided.** Labels: VERIFIED (I ran it / read it at the cited path/branch) · REPORTED · INFERRED · UNKNOWN.

**Companion files:**
- `_agents/inkling/notes/2026-11-12-independent-architecture-review-prompt-verbatim.md` (the §1–19 review brief — read once)
- `_agents/inkling/notes/2026-11-12-multisport-engine-overarching-plan.md` (v1 — this file supersedes it in substance, which does **not** repeal it; v1 stays on the record)
- `_agents/inkling/prompts-2026-11-13/claude-work-order-2026-11-13.md` (the current §1–19-wave, addressed to the Architect — relevant context, not my lane)

---

## 0. The one-paragraph answer

The "new multisport engine build" is a stack of gates and constraints. The single most important thing I can add is the **order of the gates and the boundary of each one**. Everything else — framework, CSS, DB, CI shape, the Lab, the toy-sport experiment, a status/continuity system — is downstream of those. The football engine that ships as Colors v1 is Gate-1's product and Gate-2's payload. The multisport claim is tested at Gate 5 by a headless basketball pack against a frozen contract — never by retrofitting an abstract multi-sport shell into the football build before the football build ships. The online platform (Gate 6) inherits exactly two guarantees from Day 1 — a pure reducer for the engine and an append-only, typed log — and nothing else. Every document the project has produced this week is real work; the failure mode is that none of it has an owner or an order. This note assigns both.

---

## 1. What changed between v1 and v2 (evidence)

Between writing v1 and this file, the wave moved a long way. If any of the following is relied on by a future decision, check the cited receipt rather than taking this paragraph's word:

1. **D0 landed.** The Architect executed (VERIFIED by the Owner's transcript, 2026-11-14): LoadedDataset generalized to `readonly unknown[]`, package.json description corrected or the dead `build/build.mjs` removed; suite green at 320/320, ratchet at 91/91, committed. Cakepanz remains 284/284 at the pin.
2. **The public comparison repositories exist and are cloneable green** (VERIFIED against fresh clones, 2026-11-14):
 - Vue: `https://github.com/kozikosi/football-sim-vue` tip `6b4de5c` (track `main`, baseline `82e893d` in history)
 - Svelte: `https://github.com/kozikosi/football-sim-svelte` tip `86ba632` (sole commit, track `main`)
 Both built green from public bytes (vue ~77.2 kB, svelte ~29.0 kB); both carry `npm ci` → `build` → `smoke` receipts on `council/inkling` (`bcab94a4`, `61537b22`, `81129037`).
3. **The framework test closed 9/9 × 5/5 on both arms** (REPORTED + VERIFIED) — contract bytes identical ×9, goldens `0ccb6319…` ×10, drift zero ×9. The pre-inference "50/50" holds only until a different workload demands a different decision (§7).
4. **The Owner ratifications of 2026-11-13 exist** (VERIFIED via transcripts + my own record in `../prompts-2026-11-13/claude-work-order-2026-11-13.md`), including: no weight pinning; no framework decision before the test finishes; free in perpetuity; 76 Pancakes at v1; one framework chosen — the Owner's job, with council evidence, not lock; the displayed-vs-underlying split; nine arms with Lit IN.
5. **Pinned scaffold gates everywhere.** Both scaffolds verified clean end-to-end, and both can actually build current distributions (`npm run build-only` exit 0 on Vue, `npm run build` exit 0 on Svelte). MCP wiring equal on both arms.
6. **No engine has landed in either scaffold.** The framework comparison measures the developer/agent experience under tooling parity, not a product comparison. Neither scaffold runs any formula from the pin; any inference about which would host the real engine is hypothetical until the engine is injected. **If the framework decision is made on anything other than a real workload run, the decision is not evidence, it is prior.**

---

## 2. Constraints the plan now explicitly binds

The Owner's 2026-11-13 verbatim terms bind the plan in a way my v1 didn't spell out. These are the load-bearing ones:

> "Everything is built to be as framework neutral as possible. everything is in plain typescript … Svelte + Vite, SvelteKit, React + Vite, next.js, vue + vite, vue + nuxt, solid + vite, and solidstart are all on the table. the council should perform tests for each. z.ai's test will be the definitive data and the council should evaluate his results."

"we don't know the answer until the test is finished."

"All of these can fluctuate but ovr, and flex prices should be static to the user. the underlying math can be more flexibible. form for players should generally drift +- 5 during the course of the season."

"cut the fluff…"

"tens of Thousands of users…"

"free in perpetuity"

The §0.4 above: **framework-neutral plain TypeScript until it is actually necessary to pick, the pick driven by the test evidence, not the scaffold starter files.**

---

## 3. Diagnosis stands (revised with credit)

My v1 diagnosis was: three products with three clocks (football product · multisport engine · platform), verification-collapse under ambition, framework test unsettled, review cycle outrunning the build, three live documents describing one target, multisport claim asserted-not-demonstrated. All six still hold. v2 scores them:

1. Verification-collapse: **not improving, unchanged** — no GitHub Actions on any track, both new repos carry no CI, no lint/still absent. The two red tests remain de-gated by ruling (per the §0.x ratification), not by fix.
2. Framework-test unsettled: **partially resolved** at 50/50 but **not finally resolved** — v3's verdict (VERIFIED elsewhere) is 50/50 across nine arms; no arm is feature-complete enough to judge; §4 of the work order + the Owner's call govern; this plan does not pre-empt that call.
3. Review cycle outrunning build: **acknowledged, not resolved** — this note adds one document; the Architect is on D0–D5 with the Architect's own wave not sent out yet; the Lab plan still stands; the queue still needs P-355/P-356/P-357 proposals into retention (via the Architect).
4. Three live documents for one target: **still unresolved** — this file is a fourth; the Coordinator's recommendation to reconcile INTO one canonical page still stands (ask list #4).
5. Multisport asserted-not-demonstrated: **acknowledged, confirmed** — no basketball pack exists; no test can adjudicate until Gate 5.
6. The w89-freeze / three-lineage framing: **transparency** — the w89 CSS/JS/HTML is copied into neither scaffold; both are still starter clones.

---

## 4. Gates — revised but order unchanged

| Gate | What | Exit condition | What is explicitly NOT in it |
|---|---|---|---|
| **0. Track call** (this week, Owner) | Choose the product home: Colors or Cakepanz. No new code before the decision. | Owner's decision recorded verbatim; losing track's future stated; one track active. | No merging, no refactor, no dependency changes. |
| **1. Engine foundation** (~1–2 wks) | Purity boundary (`window`/`localStorage`/ETCeph) · typed event log v1 · seeded replay (Philox stream, byte-identical log hash) · ruleVersion + poolVersion in saves · save schema v2 + v0 migration · engine-only CI in the chosen track · **lint boundary check**. | `npm ci && npm test` green from a clean clone on pinned Node · replay byte-identical · corrupted save refused with a message · boundary check fails when `window` is imported. | Any feature work; basketball; framework-specific code. |
| **2. Colors v1 ships** (existing plan) | Architect engine + shell; 72 Wins + the rest. | §10 of AGENTS.md; Owner accepts. | λ/margin-gate debates reverted to defaults already ruled; no framework work until at least minimal v1 is accepted. |
| **3. Lab, smallest useful** (§6 v1) | L0 invariants suite · L0 flat report vs 2016–2025 nflverse · L1 A/B harness + golden franchise fixtures · review-chain requirement: engine P-items require a lab delta table. | Lab report exists, reproducible from a clean clone; ≥1 review-chain decision cites it. | Dashboards; nightly 10k-season runs (Phase 2 evidence may justify later); overfitting to 2016–25 (hold out 2024–25). |
| **4. Framework decision** (after Gate 2, or in parallel as pure experiment) | The four-prototype test decides; §5 of my note is how I'd score and read it (changed to nine arms). | Owner's decision recorded with scoped wording. | Re-deciding anything Gate 1 already fixed. |
| **5. Basketball pack** (after 3 and 4) | `sports/basketball/` SportSpec; 5 slots, units, duty table, possession granularity, foul-trouble state, no UI; seeded 82-game season → awards. | Boots headless; contract tests pass on headless pure reducer; no engine edits to \*_football. | Basketball UI; ratings provenance debt (synthetic ratings prohibited — Owner ruling stands). |
| **6. Platform** (deferred) | Server = fold over logs; leagues only when the game ships and someone wants them. | — | Everything else. |

**The order is the plan.** Reordering Gates 0–2 delays everything else; they are first for that reason.

---

## 5. The architecture in one page (revised pointers only; same figure, clarified)

The §3 figure from v1 stands with two refinements:

1. The log from the engine is the interchange; the boundary is enforced mechanically, not aspirationally.
2. The boundary enforcement is exactly three moves:
 - **Lint rule** — within the engine tree, forbid `window|document|localStorage|sessionStorage|indexedDB|fetch|XMLHttpRequest|Date.now|new Date|Math.random|performance.now` as errors (one Biome rule or one grep-test, never both).
 - **Replay test** — seeded log emits byte-identical hash from a clean clone on every PR.
 - **Import-direction check** — the engine tree imports nothing outside the engine tree (one test scanning `import` paths).

---

## 6. The Simulation Lab — unchanged from v1 (summary)

v1 §§6-§6 stand; the most important change is highlighted below in the asks (#3).

- New Phase-1 data exists (484k play-by-play rows, 2016–2025; the Owner's own 30-file bundle; the basketball analog is a later data-seeding question).
- L0 (the 90% of the lab) = invariants + one flat report comparing seeded distributions to real nflverse.
- L1 = same-seed A/B harness + one golden-franchise fixture in-repo.
- No parameter sweeps before baselines exist.
- No dashboard; 1,000 seasons nightly if/when needed; CI gates stay L0+replay only.

---

## 7. Framework decision — honest position

The 0.20/0.40 gut-hate I carried from P-345 is now reframed differently:

- We measured **9 arms** in v3; result = 50/50 Svelte vs Vue, with everything else marginal. **Framing it as "Svelte won" would be just as wrong as "Vue lost." Neither beat the other in any real product workload.**
- The engine is framework-neutral; the weakest summary is "neither has produced a winning milestone, neither failed badly."
- The framework verdict lands, lands late, lands once — until it does, this plan does not assign one.
- Implementation-first: whichever arm is chosen, the contract suite (§5 of v1) is the same; the UI must be able to consume the engine from plain TS in either case.
- The Cakepanz shell uses Svelte; the scaffold closest to the current w89 shape is the Svelte scaffold; the v3 framework test showed both arms pass everything. The Owner makes the call; the Architect implements the winner.

---

## 8. Dissent (v2)

1. **Platform vision ≠ scope commitment.** Vision stays in README; never outranks Gates 2–5. (Unchanged.)
2. **10,000 users as a live driver is wrong for this stage.** Zero users today; premature optimization always costs football quality. (Unchanged.)
3. **Framework test shouldn't route product before Gate 0/1.** The test informs a decision; it doesn't make it. (Unchanged.)
4. **CI gates before the framework experiment.** I still want CI first; GPT§3 puts review first. Item settled by Owner's D2 order: review-driven; CI-skeleton-first vs review-first — the Architect's call under his delegation.
5. **§1–19 review prompt is a plan, not a review.** Deliverables are useful if they feed into Gate 0, useless if they duplicate Muse's audit. The Owner should say to GPT explicitly: "deliverable 2 and 6 matter; the rest is input to my Architect" (Owner's words, or of the closest shape).
6. **No merging Colors and Cakepanz until Gate 0 is ruled.** Merge is the Owner's call, not mine.
7. **The framework decision may legitimately stay open longer than the Owner wants.** If all nine arms tie, the experiment can extend into a second round (per-arm independent authors) without violating any ruling. (New.)
8. **73801 lines of receipts on Council branch and inbox are still mostly reporting, not measurement.** The council's only real work so far is verifying what everyone built; adding more audit to the same pile is a waste. New fillings should be measurements, not summaries. (New.)

---

## 9. Weak links of v2 (named honestly)

1. **§4 track recommendation still rests on MUSE's 2026-11-12 audit** — not on my own byte-level inspection this session; check for surprises.
2. **No byte-level check of the flex table this pass** — v1 cited it; v2 has not re-verified; every reliance on it defers to `git show origin/architect/engine-and-seats:tools/mathlab/flex.json` (or re-run through the tool which re-pin output is identical to the 99-rule table).
3. **Golden-franchise fixtures will flap across machines if platform float varies** — Gate 1's replay test must pin the CI platform, explicitly.
4. **The event log scope bomb** — v1 = football drive-granularity only. Play-level behind a flag, no cross-sport log until Gate 5.
5. **The review cycle has more than triplicated this week; nothing shipped.** Every item that isn't Gate 0–2 is postponed until after Gate 2 ships.

---

## 10. Asks (numbered)

1. **Owner — Gate 0 call** (Color home or Cakepanz home), the six calls of the multisport track question, written with rationale; every secondary call (D0 fixes → D1 rulings → CI → five bullets) stays with the Architect under existing delegation except where flagged.
2. **Owner — Gate ordering ratification.** If the order is changed, say so in writing before any engine-touching starts.
3. **Architect — force a Track Audit verbatim** — not a new one; a two-hour byte-check of Engine-cells-to-UI-cells and file counts; I'll provide it if you want (it's your lane; I'll honor the assignment).
4. **Architect — reconcile the four live documents** into one canonical page by a pointer-line each.
5. **Architect — propose P-355/P-356/P-357/P-358** (track brief + call · engine foundation · Lab L0+L1 · framework-verdict integration) to the Owner through the queue mechanism; seats don't add items without Owner re-ranking.
6. **All seats — review this and v1** before any further engine work takes priority. Two `ok`/`improved`= routed to digest; dissent = filing.
7. **Developer — the 50/50 verdict remains provisional until one named arm ships a feature a human can use**; push back on any framework decision made on the basis of equal-scaffold smoke tests.

---

## 11. Label summary

- §1: VERIFIED (receipts cited inline)
- §2: the Owner's verbatim words quoted, not paraphrased public rulings from their messages or the work-order file
- §3: VERIFIED per-items (CI absence) / REPORTED / VERIFIED / VERIFIED / VERIFIED / UNKNOWN
- §4: order = recommendation (reordered Gate 1 before anything else)
- §5 and §3.4: boundary = recommendation, evidence per other filings
- §6: unchanged v1
- §7: v3 framework result VERIFIED (other seats, not re-verified independently this pass)
- §9: named (esp. #3, #4, #5)
- §10: asks, numbered
