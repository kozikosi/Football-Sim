SPEAKER: ernie | ROLE: council advisor · experiment | TASK: P-345 r2 follow-up — which platform surface first, which settle rule settles Vue vs Svelte | DATE: 2026-11-15T13:02Z
FOR: P-345

**Two answers. Platform: Glyph's Sim Lab v0 first — because its core is the *substrate the other two presuppose*, its falsifier is command-checkable, and it fixes a demonstrated defect (A1's receipt was never pushed). Settle rule: none of the three as written — Glyph's and Inkling's 15% is unresolvable at N=3 and Ernie's sign test alone is chance-level at 2-of-3; I propose a paired, variance-relative rule that subsumes all three, plus a cheaper static measurement that could retire the question with no clock at all.**

---

## Part 1 · The platform's smallest version — build Glyph's Sim Lab v0 first

### The discriminating question: what does each *prove* that the others don't?

| Candidate | The one thing it proves that the others cannot |
|---|---|
| **GLM — DIALS panel** | **The dial values are legible in one object and their effect is visible in one re-sim.** It is the only one that turns κ / per-context λ / flex into a single editable JSON and shows the outcome move. *But it presupposes λ is a measurement, not a prior.* |
| **Glyph — Spec-first Sim Lab v0** | **A run is reproducible as a durable, reviewable artefact.** The spec file pins (engine ref, κ, seed, fixture, context snapshot, output metric); a reviewer can diff it and a CI can replay it. It is the only one that emits a *portable file that is the record of what ran*. |
| **Ernie — receipt diff viewer** | **Two builds are byte-equivalent (conformance).** It answers "did the port change the result." *But it is an arm, not a surface — it only checks equivalence; it does not produce or hold anything.* |

Each is on a different layer: DIALS is a *value-space editor*, Sim Lab is a *reproducibility record*, receipt-diff is a *comparison*. They are not three flavours of one thing; they prove different propositions.

### Why Sim Lab v0 first — four reasons, in order of weight

1. **It is the substrate the other two presuppose.** You cannot re-sim a dial (DIALS) or compare two builds (receipt diff) without a pinned, replayable run record — and that record is exactly the Sim Lab's spec. DIALS assumes the record works; receipt-diff assumes determinism works and only checks equivalence. The record is prior to both.
2. **It fixes a demonstrated defect.** The A1 boot replication's R3.1 defect was precisely that the receipt artefact was **never pushed and not verifiable** (verified-as-of). The Sim Lab's spec + diff is the direct fix: a receipt you can push, diff, and replay.
3. **Its falsifier is command-checkable, not judgement-based.** Sim Lab falsifies when *the spec's declared ref ≠ the run's actual ref*, or when *re-running the same spec does not reproduce the receipt* — both one command. DIALS falsifies only when λ turns out non-identifiable (VL's receipt; that is the Lab's run, not the surface's). Glyph's spec-drift falsifier is real but slow; the two *mechanics* above are instant.
4. **It does not presuppose λ is real.** If λ is a prior (A3 placebo / VL non-identifiability), DIALS becomes a polished display of a prior — building it first risks polishing the wrong thing. Sim Lab faithfully replays and diffs whatever the engine does, so it is where you would *discover* λ is a prior, not where you'd hide it.

### The disagreements I will not smooth

- **GLM vs Glyph (the real one):** GLM wants DIALS first ("no new engine work," "doubles as the forms stress-test of the winning arm"); Glyph wants Sim Lab first ("spec-as-record"). The genuine split is *what the platform's first job is*: **display/control the dials (GLM) vs make runs reproducible (Glyph).** I side with Glyph because DIALS's two preconditions (λ is meaningful; the record is trustworthy) are both unsettled, while Sim Lab's one precondition (you can pin a ref and replay) is already true. **The framework-stress-test argument for DIALS does not justify building DIALS first** — it justifies *observing* the framework difference whenever DIALS is built; that is the passenger pattern (C1), not a commission.
- **Ernie vs both — I concede my own framing:** my "receipt diff viewer" is **not a third surface.** It is the Sim Lab's diff view in two-ref mode. I withdraw it as a competitor; it folds into Glyph's v0 as one view mode. I flag this against myself rather than let it stand as a rival.
- **Inkling (DIALS) vs Inkling (never a fork):** Inkling picks DIALS and also warns "never a second app." Those are in tension: a separate DIALS panel *is* a second surface. The resolution I adopt (below) keeps Inkling's "never a second app" and drops "DIALS first."

### The better smallest version (a synthesis — and its cost, named)

**Build Glyph's v0 shape, with two refinements:**
1. **The dial set is the *first preset spec*, not a separate app.** So GLM's DIALS content exists (κ, per-context λ, flex as one JSON) but is *loaded as a read-only preset into the Sim Lab*, not a second surface — honoring Inkling's "never a fork."
2. **The diff view has a two-ref mode.** So Ernie's receipt-diff is a mode of the Sim Lab, not a separate viewer.

**What this costs, honestly:** GLM's *live-preview form* (edit a dial, see the re-sim respond without a spec) is deferred — in v0 the dials are edited by editing the spec, which is clunkier than a form. That is a real loss and I flag it; it is the price of "never a second app." If the Owner wants the live-preview form badly enough, that is the one thing that would justify DIALS as a separate v1 — and I would build Sim Lab v0 first regardless, because the form needs the spec core underneath it anyway.

**Falsifier for the synthesis:** if, after Sim Lab v0 ships, nobody reuses a spec (the read-only presets are never loaded, the export/import is never used), then the spec-as-record bet is wrong and the platform should collapse to DIALS's live form. That is a one-month check, and it is the same falsifier Glyph named — I keep it.

---

## Part 2 · The framework settle rule — propose a fourth that subsumes all three

### The three, and the statistical flaw in two of them

- **Glyph:** ≥15% lower correction effort on ≥2/3 slices, wash → Vue tooling.
- **Inkling:** ≥15% on BOTH wall-clock AND repair cycles, fidelity pinned.
- **Ernie:** fewer framework-owned repair cycles, sign-consistent ≥2/3, tie → Vue.

**The flaw Glyph and Inkling share: at N=3 slices, a 15% threshold is unresolvable.** Per-slice variance in repair cycles (and in wall-clock, ±330–430 ms/trial per GLM's own correction) is dominated by *problem difficulty*, not framework. Three slices cannot distinguish a 15% framework effect from problem-to-problem noise. So the 15% in Glyph and Inkling is **not a conservative threshold — it is an unresolvable one**: it will either never fire (always "wash") or fire on noise (false positive). Inkling's "15% on BOTH" is doubly exposed — two unresolvable thresholds ANDed together makes a false *negative* (real effect missed) more likely than a false positive.

**The flaw in Ernie alone: a sign test at 2-of-3 is chance-level.** With a fair coin, P(≥2 of 3) = 0.5. So "sign-consistent ≥2/3" does not *settle* anything; it is an honest description of noise, not a decision rule. Ernie is right about the noise and wrong that the rule settles.

### The fourth rule — paired, variance-relative, first-build-primary

> **Pre-declare ≥3 slices of varied shape (one read-heavy, one write-heavy, one state-heavy) and their fixtures, before any build.** For each slice, in each arm: a **first build to pinned fidelity** (primary) and **one maintenance edit to the same fidelity** (replication — this doubles the paired points to six without commissioning anything). Count **framework-owned repair cycles only** (a named mechanism per GLM's anti-gaming clause; shared-layer cycles do not count). Per slice, take the paired difference (Vue − Svelte), **normalized by that slice's total cycles** so problem difficulty cancels. **The arm with fewer framework-owned repair cycles wins iff (a) the sign is consistent in ≥2/3 slices AND (b) the summed normalized difference exceeds the within-slice spread** (the framework signal must be larger than problem-to-problem variance). **If (a) holds but (b) fails → tie → tooling/ecosystem → Vue.** Wall-clock is a secondary readout only; framework-owned lines is a third. Fidelity is judged by the swapped-blind reviewer, with a key held by a seat that builds neither arm.

**Why it subsumes the three, without being a merge:**
- **vs Glyph:** keeps "≥2/3 slices" and "correction effort"; **replaces "15%"** (unresolvable) with **"exceeds within-slice spread"** (a variance-relative threshold N=3 *can* test). That is the one substantive change, and it is the difference between a rule that can settle and one that cannot.
- **vs Inkling:** keeps **repair cycles primary**, **fidelity pinned**, **swapped-blind reviewer**; **demotes wall-clock to secondary** (15%-on-both is doubly unresolvable and its conjunction hides real effects).
- **vs Ernie:** keeps **"fewer framework-owned repair cycles, sign-consistent ≥2/3, tie → Vue"**; **adds condition (b)** — the piece that makes "settle" mean something, because Ernie's sign test alone is chance-level — and **uses the maintenance edit to double N to six paired points without commissioning.**

**The disagreement I cannot smooth, stated for the Owner:** the three rules disagree on **whether N=3 can resolve a magnitude.** Glyph and Inkling assume it can (hence 15%); Ernie and I hold it cannot (hence sign + variance-relative). This is a real statistical disagreement, not a taste difference, and the Owner should know that adopting a 15% rule is not "being strict" — it is asking the data to answer a question it cannot, and the most likely outcome is a false "wash" that leaves the framework pick to tooling by default.

### The cheaper measurement that could retire the question with no clock at all

**A static framework-owned-lines + named-mechanism audit, as primary; repair cycles as confirmation.** For the same pinned Slice 5 fixture, count the **framework-owned lines** in each arm (Svelte: stores, transitions, keyed `{#each}`; Vue: `ref/reactive`, `<Transition>`, `v-for`), and run the named-mechanism audit (is the shared-layer code actually equal?). If one arm has **materially fewer framework-owned lines AND the named-mechanism audit shows the shared layer is equal**, that is a settle on **static, deterministic, blind-reviewable evidence — no timing noise at all.**

- This is GLM's "≥10% fewer framework-owned lines" promoted from *secondary* to *primary*, with the anti-gaming clause as the guard.
- **The risk, named:** lines can be gamed by writing terse code. The bounds: (1) the anti-gaming clause (name the mechanism or it doesn't count), (2) require the named mechanism to actually be *exercised* in the slice (a store that is never used is not a win), (3) the repair-cycle count confirms — if lines drop but repair cycles do not, the line saving is cosmetic.
- **What it retires that the timed rule cannot:** the entire wall-clock/timing-noise problem. The framework question becomes "which framework needs less framework-owned code for the same fidelity, with the shared layer held equal" — a question a diff can answer.

**My recommendation to the Owner:** run the **static lines + named-mechanism audit first** (cheap, deterministic, blind-reviewable, no commission). If it is decisive, the timed rule is moot. If it is a tie (within the line-count noise), fall back to the **paired repair-cycle rule** on the Slice 5 passenger. **Do not adopt any rule whose primary gate is a 15% wall-clock threshold** — at N=3 it cannot settle.

---

## F · Owner questions these touch (carried, not answered)

- **The framework pick (F4):** the static audit + paired repair-cycle rule is what I would hand the Owner as the settle procedure; the pick itself is the Owner's after the Slice 5 passenger.
- **One HTML vs multi-file (F2) / who owns the build-config fix (F3):** unaffected by this filing; my A2 position stands (measure Route C at four-slice scale before committing).

---

Labels: **VERIFIED** — nothing new run this filing (it builds on the round-1 filing's receipts, `inbox/20261115-1225-ernie-testing-innovation.md`, and the verified-as-of block: A1's unpushed receipt, the ±330–430 ms spread, `fit(role,dest).penalty`). **REPORTED** — GLM's / Glyph's / Inkling's rule text as quoted in the prompt. **INFERRED** — the variance-arguments (N=3 cannot resolve 15%; 2-of-3 sign is chance-level; the static audit's gameability bound). **UNKNOWN** — whether the Owner wants DIALS's live-preview form badly enough to justify it as a separate v1 (the one thing that would change the platform pick).

— ernie (advisor) · 2026-11-15T13:02Z · read-only on every other seat's branch.