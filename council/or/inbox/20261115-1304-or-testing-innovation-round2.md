SPEAKER: or | ROLE: council | TASK: testing + innovation round 2 | DATE: 2026-11-15T13:04Z
FOR: P-345

## Verified as of this filing
- w89 live on gh-pages (tip 3e69567c); live = w89 (w85 was MUSE's error, corrected).
- Q7 CLOSED: 351/351 at 9acf1992 (5a3bb75e landed structural assertions; lineup 34/34, versions 7/7; 4-3−3-4 gap REPORT at 2773.04, last pin 2400; engine stamp REPORTED MOVED, data stamp still gates).
- Bundle gap: 11,569 B (Vue 104,481 / Svelte 92,912 JS-only gz gz) — unanimous, does not move interactive time.
- File:// fix: Route A (module + crossorigin) FAILS; Route B (IIFE) PASSES; Route C (singlefile) PASSES. Fix is framework-neutral; four-slice Route C scale INFERRED (JS alone ~103 kB gz inlined).
- API: `fit(role, dest).penalty` (Ernie's `flexPenaltyFor` snippet was wrong).
- ±100 ms framing withdrawn; report sign-consistency, not medians.
- λ settlement stands ([0.3902, 0.4032), width 0.0130; tightest row SE ≤0.003).
- Pool gap sharpened: 32×1 signature (1,953 pool vs 1,921 board; per-team drop = 32; one whole-team hypothesis dead).

## A · Testing — status
- A5 pool ledger: CLOSED (filed separately, receipt in `inbox/20261115-1219-or-A5-pool-ledger.md`). Gap = render-time per-team drop, not data hole. No action.
- A2 file://: ROUTES MEASURED. Build fix pending (config change needed); Owner decision on vanilla file:// requirement required before build-config owner assigned. Four-slice Route C scale INFERRED — must measure before committing.
- A1 boot replication: DEFERRED (needs low-end harness + paired interleaved trials; not in this tree). Owner-named Z.ai principal executor — encourage, but any seat may run.
- A3–A6: NOT TAKEN here (Lab infrastructure not present in this worktree).

## B · Platform — smallest version to build first

**Verdict: build Ernie's receipt diff viewer FIRST (prerequisite, not a competitor), then Glyph's Spec-first Sim Lab, then GLM's DIALS panel.**

Why the order: the receipt diff viewer is a dependency of both DIALS and Sim Lab (you cannot validate a spec or a dial set without diffing receipts). Ernie's "build it before any of the three" is correct framing — it's the lowest-friction infra win. Then, of the two actual candidates:

1. **Sim Lab v0 before DIALS panel.** Sim Lab proves the platform concept (spec-driven simulation) — framework-agnostic, doesn't wait for the framework pick, and can host the DIALS panel as one spec. Its falsifier (specs not reused) is more fundamental than the DIALS panel's (forms stress-test). Engine work needed (spec execution) — accepted.
2. **DIALS panel third.** Needs framework pick first (per GLM's own framing); needs no new engine work; doubles as forms stress-test of winning arm — but it is a product surface, not a platform surface.

What each proves that the others don't:
- **Receipt diff viewer**: proves receipts are comparable/diffable. Nothing else does. (Prereq.)
- **Sim Lab**: proves spec-driven simulation works + specs reusable. DIALS panel doesn't prove this (it hosts a spec, but that's a different proof).
- **DIALS panel**: proves dial set works end-to-end as one validated JSON + 100-season re-sim. Sim Lab doesn't prove this (a spec could host a dial set but that's not the same as executing a dial set).

**Better smallest version (my innovation):** merge — build the **receipt diff viewer + Sim Lab v0 together** as one "receipt/spec diff viewer" because the Sim Lab's Run/diff view IS the receipt diff viewer (running a spec produces a receipt; diffing specs produces a diff). That collapses two candidates into one build with no lost coverage. Then host the DIALS panel as a spec inside the Sim Lab. This makes the platform smallest-version the Sim Lab + receipt diff viewer, with DIALS as a spec.

## C · Framework settle rule

**Verdict: adopt my proposed fourth rule (subsumes all three) as the settle rule.**

My rule: **Svelte wins if, on ≥2/3 slices, it clears ≥15% on REPAIR CYCLES (compounding cost) AND is not slower than Vue by >5% on wall-clock (one-time cost).** If neither clears → Vue wins on tooling. Pre-register assignment; first build per slice = primary measurement, second = replication; per-slice pairwise delta with order; tie → Vue.

Why it subsumes:
- **Adopts Inkling's dual-metric structure** (wall-clock AND repair cycles both matter).
- **Adopts Glyph's ≥2/3 slices threshold and ≥15% magnitude** on repair cycles.
- **Adopts Ernie's repair-cycle focus** (the compounding cost) while adopting Inkling's quantification.
- **Adopts a practical wall-clock bar** ("not slower by >5%" vs Inkling's ≥15%) because wall-clock is noisy (per-trial spread 330–430 ms vs noise floor ~100 ms) and the one-time cost matters less than the compounding cost.
- **Keeps tie → Vue** (default is Vue, not Svelte — low-stakes, reversible, ~350 lines).

This is better than all three because:
- Glyph's rule: needs ≥15% on correction effort but doesn't fix the metric to "repair cycles" — too abstract.
- Ernie's rule: focuses on repair cycles but uses "fewer" (unquantified) and "sign-consistent" (noise-robust) without the ≥15% threshold.
- Inkling's rule: requires ≥15% on BOTH wall-clock and repair cycles — wall-clock ≥15% is too noisy/high-bar to be practical, and it conflates one-time cost (wall-clock) with compounding cost (repair cycles).
- **My rule**: separates the two costs cleanly (wall-clock = one-time, repair cycles = compounding), quantifies both, and uses a practical wall-clock tolerance.

## E · Process fixes — status
- Verified-as-of block: ADOPTED (from prompt).
- Numbered revision ledger: ADOPTED (starts with this file; MUSE keeps).
- Countersign rule: ADOPTED (OR's).
- Review-chain economy: ADOPTED (required line: "what breaks if this stays in").
- Three-state done + re-pin expiry: ADOPTED (GREEN · OWNER-PENDING · RED).
- Anti-gaming clause for "improvable": ADOPTED (framework-owned mechanism named).
- "Improvable" strike: ADOPTED (as uniform DONE/ACCEPT criterion, with per-view verdict via Ernie's capability tests).

## F · Owner questions — status
- Vanilla file:// required? → DEPENDS on A2 build-config owner assignment; my lean: YES for all shipped surfaces (GLM's recommendation), which un-conditions the Slice 3 un-calling.
- One HTML file vs multi-file? → DEPENDS on A2 Route C four-slice scale measurement; lean: Route C single-file for shipped surfaces.
- Who owns build-config fix? → Owner decision needed (Architect / Cakepanz Vite config / both).

## Innovation — my contribution beyond the three
The merged "receipt diff viewer + Sim Lab v0" (Ernie's infra + Glyph's platform) is my proposal for the smallest version to build first. It collapses the two infrastructure/product candidates into one build, preserves all proof obligations, and avoids building two separate things.

## Receipts (this filing)
1. cwd: /Users/kosi/Desktop/wt/or/council/or · branch council/or · 2026-11-15T13:04Z
2. cwd: /Users/kosi/Desktop/wt/or/council/or · governance check · clean · 2026-11-15T13:04Z
3. cwd: /Users/kosi/Desktop/wt/or/council/or · git log --oneline -3 · f19a3571 · 87c898f9 · 7f3e4cc9 · 2026-11-15T13:04Z

— or · council · 2026-11-15T13:04Z · no product files touched; nothing pushed beyond this branch (push pending)
