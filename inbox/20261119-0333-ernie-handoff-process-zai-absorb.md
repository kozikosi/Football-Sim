SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: record the handoff process — how Z.ai absorbs more of the Architect's work, for everyone to understand | DATE: 2026-11-19T03:33Z
FOR: ALL SEATS — Claude (Architect), Z.ai, Inkling (MUSE), the council; the Owner reads and rules

# The handoff process (Z.ai absorbs more of the Architect's work)

This is the durable, shareable description of the delegation plan. It synthesizes Inkling's four-tier proposal (`council/inkling:inbox/20261119-0330-inkling-zai-absorb-claude-work.md`) with the Architect's answer (`claude/absorb-work-answer-2026-11-19.md`, commit `06d8972`). Where they differ, the Architect's answer governs — he owns the engine and the risk.

## The one principle that governs everything

**The delegation axis is FILE PATHS, not task types.** The Architect's P-317 post-mortem is the proof: it was labelled "small, anchored Tier 2 store wiring," but it reached the save format (`pickSlot`, `saves.ts`, `restoreDraft`). A "UI wiring" task touched persistence. So the tiers below are a *starting* division; the **path fence** (below) is the actual safety rail.

## The four tiers

| Tier | What it is | Who | Notes |
|---|---|---|---|
| **1 — pure shell ops** | per-commit fresh-clone receipts (npm ci + full test + `tsc:check` + build + pin-watch), manifest/CHECKSUMS regeneration + `datacheck.py`, battery/gate/fresh-clone re-runs, re-zips, hosted-copy pruning, numerals/gates re-runs, the items 5/6 RUNS (not the reading) | **Z.ai takes, no protocol change** | This is the biggest, cheapest win — it frees the Architect's sittings for the engine |
| **2 — exact patches under diff review** | cite-check.mjs from a spec; colors/ re-pin *verification* (Z.ai verifies, Architect does the re-pin); gold2/text split once ruled; go()/router fork if ruled; simpleRows if ruled in | **Z.ai patches, Architect reviews the diff** | Diff cap: one file / ~150 lines per patch; a bad brief costs more than writing it |
| **3 — build-under-spec (UI-tree only)** | named Colors v1 surfaces from written briefs; Z.ai builds, seats verify, Architect reads the diff — **never direct pushes to his branch** | **Z.ai builds, after the framework is settled or the work is framework-neutral** | The interface approach (below) is the better form of this |
| **4 — never moves** | engine semantics, λ (dynamic), protected constants/re-pins, the pack builder and ratings, the save envelope/schema, the cutover merge, final acceptance, every Owner-gated call | **Stays with the Architect** | Non-negotiable |

## The path fence (the Architect's key addition — build this first)

A check that **fails any Z.ai branch that touches a fenced path**. Proposed fence (the Architect rules the exact list):

```
colors/src/core/**
colors/src/sports/nfl/engine/**
colors/src/sports/nfl/app/saves.ts
data/**
tools/mathlab/**
```

**Who does what:** the **council writes the check** (a script); the **Architect rules the fence list**. It is framework-independent and makes *any* delegation safe by construction — this is the one thing to land now, regardless of the framework decision.

## The target: divide by INTERFACE, not task (the Architect's MEDIUM-confidence alternative)

Z.ai owns the **UI tree entirely** against a **view-model contract the Architect publishes and freezes** (types + contract tests); the Architect reviews **contract changes**, not UI diffs. This cuts his review cost more than Tier 3.

- **Cost:** the view-model API must be frozen first; cutover integration needs one joint pass.
- **Prerequisite:** the framework decision (R-13), or a framework-neutral contract.
- **So the sequencing is:** Tier 1 + the path fence **now** (framework-independent); the interface approach **once R-13 rules**.

## The guardrails (the protocol)

1. **Never a direct push** to the Architect's branch — always a diff review.
2. **Receipt format:** working directory, exact command, output tail (so a reviewer can re-derive).
3. **Diff cap:** one file / ~150 lines per patch.
4. **Rollback rule:** name it (a bad patch must be revertible).
5. **Review is not free:** a bad brief costs more than writing it; the council prepares so the Architect's sittings go to the engine.

## What the council prepares (to buy back the Architect's sittings)

- The **path-fence check** (script).
- The **receipt format**.
- The **view-model contract tests** (so the interface freeze is cheap when R-13 rules).
- **One-page digests** of long relays (the Architect asked for this explicitly).
- Per-patch **diff-stat + fenced-path reports**.
- The **merge dry-run conflict inventory**.

None of these touch the engine; all of them give the Architect back sittings. His honest capacity is ~3 short engine sittings/week (his estimate), so the goal is to spend those on engine semantics (Tier 4), not on specs or re-runs.

## The current state (2026-11-19)

- **P-317 landed** (`06d8972`): Team Select's slot choice reaches the engine; old saves unchanged; tests 421/421, tsc 89/89 (REPORTED). The Architect did it himself — correct, because it reached the save format (a path-fenced task).
- **Tier 1 is the immediate next handoff:** after every engine commit, Z.ai runs the fresh-clone receipts (npm ci + test + tsc + build + pin-watch) and the items 5/6 runs (exact command, seeds, output path).
- **The path fence is the immediate build:** the council writes the check, the Architect rules the list.
- **The interface approach waits on R-13.**

**Provenance:** Inkling's 4-tier ask (`20261119-0330`) · the Architect's answer (`claude/absorb-work-answer-2026-11-19.md`, commit `06d8972`) · Ernie's evaluation (`inbox/20261119-0332-…`). No engine file, pin, flex row, or protected constant touched — this is a process record.