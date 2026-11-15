SPEAKER: VL | ROLE: council | TASK: testing + innovation round 2 (P-345) | DATE: 2026-11-15T13:10:00Z

FOR: P-345

Labels key: VERIFIED = I ran it, receipt in text; REPORTED = read from authoritative doc; INFERRED = reasoned, not run; UNKNOWN = not checked.

## Split 1 — Platform's smallest version: which gets built first

Candidates: GLM's DIALS panel (kappa + per-context λ + flex table as one validated JSON + 100-season re-sim), Glyph's Spec-first Sim Lab v0 (declarative spec object, thin editor + Run + diff view, read-only presets + editable kappa/seed/fixture), Ernie's receipt diff viewer.

**Build DIALS first.** Ernie's receipt diff viewer is NOT first — it is a consumer of differences that don't exist yet. A diff viewer with nothing to diff is an empty screen. Glyph's Sim Lab is second — it needs a spec-language design decision (what fields, what grammar, how presets relate to engine contract) that DIALS avoids by reusing the dial set that already exists.

### What each proves that the others don't

- **DIALS proves tunability** — turning a knob changes outcomes predictably and measurably. This is the core platform promise: you can design a simulation by tuning parameters, not by writing code. Sim Lab cannot prove this without first designing a spec language; receipt diff cannot because it only displays differences, it does not produce them. DIALS is the only candidate that tests whether the dial set actually moves the engine in a legible way. (INFERRED — dial set exists at `colors/src/engine/`; no engine edit needed.)
- **Sim Lab proves reproducibility + spec-as-contract** — a declared spec produces the same result every run, and spec A can be diffed against spec B. DIALS has no spec object (just ad-hoc knob tweaks); receipt diff has nothing to diff because it builds nothing. (INFERRED.)
- **Receipt diff proves auditability across versions** — you can see what changed between run A and run B. But it is downstream: it needs versions to diff, which means DIALS or Sim Lab must exist first. Ernie is right that receipts should come early, but wrong that they should be a separate viewer app before any builder exists. (INFERRED.)

### Why DIALS first

1. **Smallest:** zero new engine work — the dial set (kappa, per-context λ, flex table) already exists. One panel, one "100-season re-sim" button, one validated JSON blob. (~1–2 screens, no persistence beyond export/import — matches Glyph's v0 scope.)
2. **Doubles as the forms stress-test** for whichever framework arm wins (both arms need form validation; DIALS exercises it before the framework pick is final).
3. **Makes Ernie's work useful:** DIALS produces the receipts (engine pin, κ, λ, gate results, 100-season output) that Ernie's diff viewer would later display. Build DIALS → then Ernie's viewer has something to diff → then Sim Lab adds the spec-language layer on top.
4. **Retires the most uncertainty per line:** the biggest platform risk is "do dials actually change outcomes in a way users can read?" DIALS answers that in one sitting. Sim Lab answers a different question (can users declare specs?) that only matters if dials work first.

**Progression:** DIALS (tunability) → Ernie's inline diff panel inside DIALS (auditability) → Sim Lab (spec-as-contract). Ernie's receipt diff should be an inline panel within DIALS, not a separate app built first.

## Split 2 — Framework settle rule: which settles Vue vs Svelte

Candidates: Glyph (≥15% lower correction effort on ≥2/3 slices, wash → Vue on tooling), Ernie (fewer framework-owned repair cycles, sign-consistent ≥2/3, tie → Vue), Inkling (≥15% on BOTH wall-clock AND repair cycles).

**None of the three is sufficient alone. I adopt a fourth rule that subsumes all three:**

> Svelte wins **only if** it beats Vue by **≥15% on wall-clock AND ≥15% on repair cycles** on the same pinned fidelity, with the **first build of Slice 5 as the primary measurement** and a **second build as structure replication**. **Pre-register** the slice assignment before running. Report per-slice pairwise delta with order, never aggregate alone. **Tie within ±5% on both → Vue** (tooling/ecosystem tiebreak). **No critical fidelity regressions on either arm** (hard veto).

### Why this beats each of the three

- **Beats Glyph:** Glyph requires N≥3 slices (≥2/3). We may only have Slice 5 in this round. My rule works with N=1 slice. Glyph's "wash → Vue on tooling" is correct and kept as my tiebreak. (Glyph's rule is good but over-constrained on N.)
- **Beats Ernie:** Ernie's "sign-consistent ≥2/3" is too weak — sign-consistency without a magnitude threshold cannot overcome measurement noise (per-trial spread ~330–430 ms, per the low-end boot receipt). Requiring ≥15% on BOTH dimensions protects against noise and against trading one dimension for the other. Ernie's tie→Vue is kept. (Inkling's earlier framing about the ±100 ms noise floor being withdrawn — GLM's correction — means we must not build on 100 ms magnitudes; ≥15% is a structural threshold, not a timing magnitude.)
- **Beats Inkling:** Inkling's ≥15% on BOTH is the right strictness, but lacks pre-registration, replication, and a tiebreak. My rule adds: pre-register before running (so the measurement can't be cherry-picked after seeing results), first-build-primary / second-build-replication (within a slice, the second build is systematically easier — design problems already solved once), and the ±5% tie → Vue tiebreak. (Inkling's strictness is kept; the scaffolding around it is added.)

### Additional guardrails from the round

- **Anti-gaming (GLM, adopted):** an improvement counts only if the **framework-owned mechanism is named** (Svelte transitions, Vue `<Transition>`/`<KeepAlive>`, built-in stores, transition groups). If the same shared-layer code delivers it in both arms, it is not a framework difference and must not be reported as one.
- **Commission vs passenger (C1, from prior filing):** passenger on Slice 5 — authoring cost rides on the Slice 5 build, never commissioned as a separate effort. Skip trigger: stop when measurement cost approaches ~350 lines (the migration cost); decide on tooling (Vue) without completing the measurement.
- **Order randomised per slice, fidelity pinned numerically** (Ernie's within-agent design): both agents build the same slice on both arms; the secondary arm publishes full receipts (LOC, sittings, defects) so the comparison is auditable; never averaged across agents.

### Who decides disagreement on the rule

The Owner (product direction and acceptance are the Owner's alone — VERIFIED authority, AGENTS.md §1). The Architect recommends. The council's job is to make the split legible, which this filing does. If the Owner picks one of the three existing rules instead, I accept that — my fourth rule is a proposal, not a decision.
