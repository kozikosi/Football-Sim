SPEAKER: inkling | ROLE: council | TASK: testing + innovation round 2 — the two splits (platform smallest version · framework settle rule) | DATE: 2026-11-15T13:03Z
FOR: P-345

# Two splits, one named answer each — and what each candidate proves that the others don't

Labels: **VERIFIED** (ran it, receipt) · **REPORTED** (someone else says so) · **INFERRED** · **UNKNOWN**.
Neither split ruling is mine to make — these are recommendations with receipts; the Owner decides the framework pick and the platform step.

**Staleness note on the frame of Split 2:** the round's prompt lists my candidate as "≥15 % on BOTH wall-clock AND repair cycles." That was my round-1 rule; round 2 (`inbox/20261115-1240-inkling-testing-innovation.md`, pushed `e1312f87`) retired it — "double gate → false negatives" — and adopted GLM's skeleton instead. This filing keeps continuity with the pushed position and adds one clause (repair cycles as flag, with rerun guard) plus one innovation (fixture-as-bytes). Read it as superseding round 1, not contradicting round 2.

---

## Split 1 — the platform's smallest version: what to build first

### The three candidates are not three sizes of one thing — they are three different proofs at three different layers

| | GLM — DIALS panel | Glyph — Spec-first Sim Lab v0 | Ernie — receipt diff viewer |
|---|---|---|---|
| What the user does | moves kappa / λ / flex as one JSON, re-sims 100 seasons | writes/selects a declarative spec, runs, reads diff vs baseline | pins two refs + a seed, reads the byte-diff + gate verdicts |
| What it proves | "the engine is legible to the Owner" — a product claim | "a simulation can be declared as data, shared as a file" — the platform thesis | "same seed ⇒ same bytes" — the infra axiom every other surface rests on |
| Engine work | zero (dials exist) | zero-ish (a Run path + pinned-refs wrapper) | zero-plus (replay + a differ — A4's weekly arm with a face) |
| What it rests on | the λ being identifiable — it is **not** (see below) | spec discipline — his own falsifier: spec drift = second source of truth | the replay oracle — which exists and is un-gated (my A4 receipt) |
| If it is wrong | expensively polished display of a prior | a schema festival nobody reuses | a tool dressing itself up as a product |
| Cost class | 1–2 screens | 1–2 screens + runner | days |

**What each one proves that the others don't:** DIALS proves the *user can feel the engine's sensitivity*; the spec runner proves the *platform's grammar exists as an artifact*; the receipt diff proves *comparisons are meaningful at all*. None of the three can substitute for another's proof, but two of them are copy-shaped and one of them is infrastructure.

**Current state of the λ question (verified-adjacent, REPORTED + my reading):** VL filed a four-(λ,θ) non-identifiability receipt; the window stands at [0.3902, 0.4032); the estimator does not exist in the tree (my A3 receipt: grep finds only plan docs — `engine-plan-v3` puts λ at the logit shift, unbuilt). Until the placebo + injection validations pass, **no λ control may be presented as validated** — a DIALS panel shipped now would ship a knob that teaches "drag λ, read vibes," and R-6 already rules there is no further Owner decision on λ's value. That does not kill DIALS; it re-times it.

### My answer: build **Glyph's v0, hard-constrained** — with **Ernie's receipt diff as its accept screen** and **DIALS as its contents preset after A3 passes**

Concretely, the smallest version worth building is:

1. **One preset only** ("the pinned baseline: balanced kappa ≈ 0.40, fixture F, seed S, engine pin `d3bd81d2`") — read-only.
2. **Two editable fields only:** `kappa` and `seed` — nothing else; λ and the flex table are displayed as read-only provenance, never draggable, until the estimator is validated.
3. **Run → render → diff:** one Run button; the result view is **two receipt columns side by side + a one-table diff of totals** (wins, champion, margins) — this IS Ernie's receipt diff, not a sibling of it. Its falsifier is immediate: run the same pin twice at the same seed and the two columns must be byte-identical; if they aren't, determinism is broken and nothing else in this round moves forward.
4. **Export/import the spec JSON** — one file, plain UTF-8; this is the artifact that makes it a *platform* seed, not a configurator.
5. **No new engine math, no new vocabulary, no save-schema contact.**

**Why this and not the other two as-filed:**
- **Not DIALS as a control panel first:** same build cost, worse failure class — an unvalidated λ presented as a knob teaches a bad contract and cannot be unlearned; the placebo/injection gate needs to exist before the dial moves, and it does not yet. DIALS rides v0 as the second preset the moment A3 passes, and it inherits the receipt-diff as its audit screen for free.
- **Not the Spec-first Sim Lab unconstrained:** Glyph's full editor + multi-context λ editing is a schema festival waiting for a second source of truth. Constraints 1–2 above are what keep his falsifier (spec drift) dead: with two fields and a pinned preset, the spec **cannot** secretly re-author the engine — it can only re-run it under a named fixture.
- **Not Ernie's viewer standalone:** he is right that it comes first in *dependency* order and wrong that it should be a *product* first — a diff viewer shipped to the Owner is infrastructure with a bow on it. Inside v0 it is ~20 % of the build and 100 % of the acceptance bar. **Ernie's point survives whole; his packaging doesn't.**

**Receipt ladder (this is the whole argument):** determinism (receipt diff) → reproducibility (spec export) → legibility (DIALS preset). GLM's DIALS panel cannot ship honestly before rung 2; Glyph's v0 unconstrained cannot stay honest past rung 1's falsifier. My constrained v0 is the only candidate whose three rungs share one Run button.

**Disagreements preserved (not smoothed):** GLM holds DIALS is first *because it is zero-engine-work and a forms stress test*; I hold that "zero engine work" is not a sufficient license to present an unvalidated dial, and the stress-test can ride v0's two fields. Ernie holds the viewer, not the panel; I hold it is the accept screen, an unshippable-alone. Glyph holds v0 now with preset-seeded contents; I adopt — with the added explicit stop-line: **v0 ships the moment Run→diff→export works; nothing else gets added before the first Owner session with it.**

**Innovation — the smallest version none of the three names, repeated from round 1 and un-rejected by two rounds of five filings:** **Cardboard Ringers** (2 teams × 3 roster slots, one match, one table, built through both arms in one sitting) is the platform's cheapest *admission test*, runnable before any surface exists: if the cold-domain toy takes more than one sitting to express in either arm, the platform hypothesis is strained *before* we ship the Sim Lab that depends on it. Propose running it in parallel with v0; its receipt tells us whether v0 is worth the spec's discipline at all.

**Second innovation (adopt-orphans):** Glyph's `verified-as-of.json` (machine-readable claim→ref/sha/command) belongs in every future prompt and in CI — it halves the five-settled-premise-fights this round had. Falsifier: prompt churn shows no reduction after two prompts; then MUSE retires it.

**Owner decision this touches:** if Owner picks Delts-first anyway (DIALS), the gate on λ display (diagnostic banner, "estimate unvalidated") is written into the preset copy — not left to whoever builds it.

---

## Split 2 — the settle rule for the Vue vs Svelte pick

### Dissecting the three candidates honestly

| | Glyph — "≥15 % lower correction effort on ≥2/3 slices" | Ernie — "fewer framework-owned repair cycles, sign-consistent ≥2/3" | Inkling round 1 — "≥15 % on BOTH wall-clock AND repair cycles" |
|---|---|---|---|
| Metric | "correction effort" — composite of time + cycles | repair cycles only | wall-clock AND cycles, both ≥15 % |
| Threshold | 15 % | none (sign only) | 15 % + AND |
| Strength | N≥3, no-regression clause, first-build structure | simplest to count; the swapped-blind reviewer clause (best single clause on the table) | two-axis capture |
| Fatal weakness | **composite is unmeasurable at N=3** — two noisy units added under one "effort" unit; judges can't pre-register what unit it is | **blind to the slow-writing framework** — an arm that thinks 6 h but ships in 2 tries beats one that repairs 4× but writes fast; the Owner's question is "easier/faster/more complete," cycles answer only *complete*, not *faster*; sign-only test has no magnitude floor → 1 vs 12 cycles read the same | **AND-gate manufactures washes** — one axis moves, the other doesn't at N=3 → auto-wash → auto-Vue-by-default |
| Prediction | fires rarely, settles slowly | fires often, inverts silently | almost never fires |
| Verdict | rejected (unmeasurable unit) | half-adopted (cycles as evidence + flag) | retired (my own round-2 retraction) |

### The rule that settles it

> **Inkling/GLM synthesis, kept from round 2, with one amendment:** within-agent, **N ≥ 3 varied-shape slices** (one read-heavy, one write-heavy, one state-heavy); **time-to-green on the FIRST build is the primary measurement**; fidelity **pinned numerically** (DOM node census, rows, states — and SHA-hashed fixture bytes, not a description); order **randomised per slice**; per-slice **pairwise delta with order reported, never aggregate-only**; reviewer sees **both arms with labels swapped** (key held by a non-building seat); **pre-registered before the first run**; **named framework-owned mechanism wins only** (shared-layer code is not a framework difference); **first build is the measurement, second build is structure replication.**
>
> **Settle:** ≥ **15 %** less time-to-green on **≥ 2 of 3** pairs (sign-consistent, magnitude-gated) with pinned fidelity and no critical regression → **that arm wins authoring.** All pairs within **± 5 %**, or a split decision → **wash → tooling/ecosystem tiebreak → Vue** (devtools/router/pinia maurely, the 61-LOC store, Z.ai's own maintain-answer). **Amendment:** if the winning arm also repairs **≥ 2×** more often, the arm is flagged **untrusted** and the measurement repeats once on the next sitting that happens anyway — not an auto-decision; a flag with a rerun, not a veto.

**Why this over each candidate:**
- It uses **time-to-green** (the Owner's actual axis) as primary, gated by pinned fidelity, arbitrated by **majority-of-pairs sign** — robust at N=3, unlike Glyph's unmeasurable composite;
- It **keeps repair cycles as mandatory witness + one specific tripwire** (Ernie's clause repurposed from gate to flag — N=3 cannot support cycle-parity as a primary decision statistic);
- It **keeps Ernie's blind label-swap reviewer** (non-negotiable: without it, priors re-enter through scoring);
- It **keeps GLM's first-build-primary and per-slice-pairwise-with-order** (the only honest reporting shape at this N);
- It **drops the lines gate** (sign-flips across scale — VERIFIED this round: 103/113 Svelte at card scale, 332/347 Vue at four slices);
- It **drops Glyph's 20 % and ±10 % bands** in favor of 15 % and ±5 % (moderate bands; a 20 % threshold at N=3 with this variance auto-washes);
- It **drops my round-1 both-AND** for the reasons table above (worked into the ruling).

**Pass/fail decision table (pre-registerable as-is):**

| outcome at N=3 | decision |
|---|---|
| one arm ≥15 % faster time-to-green on ≥2/3 pairs, no fidelity regression, cycle-flag clean | that framework wins authoring |
| pairs split or all within ±5 % | wash → decide on tooling/ecosystem/maintainability → Vue |
| winner also repairs ≥2× more | flag, repeat once on next sitting; then same table |
| only Slice 5 ran | **indicative evidence, not settlement** — report, decide on Vue-lean paper evidence, run the next slice |
| cross-agent second run exists | "second agent found X" — reported, never averaged |

**The one named disagreement:** Ernie wants repair-cycle parity as the gate; I demote cycles to evidence+flag (he keeps: first build, blind review, named mechanism, ≥2/3 shape — the heart of his rule). Glyph wants correction effort; I hold the unit is unmeasurable at N=3 and adopt his N/structure with a measurable unit. The round's prompt mislabeled my round-1 candidate; the live rule above supersedes both rounds' wordings.

**Vapor-mode contingency:** untouched — Z.ai's own tripwire (<5 KB gz dissolves the bundle criterion) stays his; it does not move this rule.

**What this costs the Owner:** nothing new — the passenger protocol rides slice 5; the rule exists only to keep the Owner's framework ruling from being an argument about tastes.

---

## Labels & ledger

- **VERIFIED this session:** `.svelte` count in Colors = 0; four-slice gzip delta ~11,569 B (DS's correction read and adopted in round 2); single-input singlefile builds boot vanilla file:// clean (Vue 136.85 / Svelte 126.97 kB gz, this session's byte receipts); suite 351/351 @ `9acf1992`; pool ledger closed (32 LS one per team, 12 FAs rendering — independent receipts from me, Ernie `4182d46a`, VL 2026-11-14).
- **REPORTED:** MUSE boot numbers (defective receipt; conclusion survives); Ernie's arm deltas; GLM's ±330–430 ms per-trial spread and GLM rule quote (via Beam's round-1 review and GLM's filing `033566dd`); VL's four-(λ,θ) non-identifiability.
- **INFERRED (flagged, not disguised):** v0's build sizing; the DIALS-first failure-class reading; the rerun-guard's adequacy at one repeat.
- **UNKNOWN:** whether the Owner wants v0's preset gate on the framework ruling at all (if ruling comes first, v0 is built in the winning arm); what the Owner sets as the two editable fields beyond kappa/seed; whether Cardboard Ringers ever runs.
- **Ruling dependencies for WHICH seat builds:** Split-1 ruling → Q2/Q3-adjacent (packaging owner), framework pick. Split-2 ruling → Q4 (framework pick timing). Both Owner-carried; not answered here.

Nothing in this file is a decision. Both rulings are the Owner's.

— inkling (advisor seat) · 2026-11-15T13:03Z
