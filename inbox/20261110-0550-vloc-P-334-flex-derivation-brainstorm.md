SPEAKER: vloc | ROLE: council seat | TASK: P-334 — derivation future brainstorm: flex table formula (Owner's "inevitable direction") | DATE: 2026-11-10T05:50Z
FOR: P-334 (new); relates to P-294 (flex re-derivation under model-first, HOLD), P-333 (3-4/4-3 gap discussion), P-322 (skill-profile design)
VERDICT: n/a — discussion paper, no build proposed

## Bottom line

The Owner asked the council to think about the engine's inevitable direction: replacing 99 hand-set flex prices with one derivation formula (from destination slot weight / skill profiles), how to verify it, and how to resolve formula-vs-table disagreements. I ran an experiment (script `tools/mathlab/flex-derive.mjs`, read-only, against the T6 deterministic pricer output at Pre-Colors 40233d6be00e987c) testing two candidate derivations against the current flat table. **Neither simple formula reproduces the hand-set table.** The table encodes role-family logic (CB→FS = 0 because same defensive-back family; CB→MIKE = 4 because crossing to linebacker) that a single-scale formula cannot capture. My recommendation: use the derivation to FLAG discrepancies (underpriced/overpriced) for Owner review, not to automatically replace the table. No product change proposed — this is a discussion paper for when the Owner asks for the formula.

## The three questions the Owner asked

### (1) How would you design the formula? What should it use — destination weight alone, skill profiles, or both?

**Destination weight alone is insufficient.** Proof from the current table: QB→FS costs 10 while SS→FS costs 2, even though FS weighs 300 in both cases (slots.ts). Same destination weight, 5× price difference — the source role matters enormously (QB playing safety is a huge misfit; SS playing FS is natural).

**Skill profiles alone are not operationally defined.** There is no "skill profile" table in the engine; defining one would be new work with no existing data source.

**My proposal: measured opportunity cost (winsLost) from the engine's matchup model, with a destination-weight base and a source-dest compatibility modifier.**

```
flexPenalty(source, dest) = clamp(round(basePrice(destWeight) × familyFactor(source,dest) / step) * step, 0, maxPenalty)
  where step = 2 (the observed flat-table quantum), maxPenalty = 10 (Owner's -10 cap)
```

- `basePrice(destWeight)`: rises with destination slot weight — cheap job (DIME 50, TE3 50) → cheap price; important job (CB1 400, QB 1000) → expensive price. This is the Owner's "cheap job, cheap price" principle.
- `familyFactor(source,dest)`: 1.0 within the same position family (DB→DB, OL→OL, LB→LB), >1.0 crossing families (DB→LB, OL→RB). Captures what winsLost measures implicitly but a pure weight formula misses.
- `winsLost(source, dest) = slotWins(natural, ovr) − slotWins(dest, ovr)` at OVR 85 (deterministic, n=1) is the cross-check: it already captures both weight and compatibility through `slotWins()`.

No separate "skill profile" table is needed — the matchup model already encodes role differences through `slotWins(natural)` vs `slotWins(dest)`.

### (2) How would you verify a formula against the Owner's table?

Run the deterministic pricer (`tools/mathlab/flex-pricer.mjs`, read-only, n=1 per cell, no RNG) and compare each derived penalty against the current flat penalty:

```
derived > flat + 1  → UNDERPRICED (flex cheaper than its true cost; star drifts out of position)
derived < flat − 1  → OVERPRICED (flex more expensive than its true cost; underused)
derived within ±1   → ALIGNED
```

The script `tools/mathlab/flex-derive.mjs` implements both candidate derivations and prints a side-by-side comparison. It is read-only: it never touches the product file or flex.json.

### (3) Where the formula and table disagree, how do you decide which is wrong?

**Default: trust the reproducible engine measurement, but let the Owner override.** The derivation is deterministic and re-runnable (n=1); the hand-set table encodes the Owner's judgment about role-family logic that a formula can't fully capture. When they disagree:

| Disagreement | Meaning | Action |
|---|---|---|
| Derived > flat (underpriced) | Flex is cheaper than its measured cost | Flag for Owner: consider raising toward derived, or keep hand-set with justification |
| Derived < flat (overpriced) | Flex is more expensive than its measured cost | Flag for Owner: consider lowering toward derived, or keep hand-set with justification |

The derivation should be a **discrepancy detector**, not an automatic replacer. The Owner decides each case.

## Evidence from my experiment

I wrote `tools/mathlab/flex-derive.mjs` (read-only) and ran it against `tools/mathlab/results/flex-pricer-2026-11-07T23-50.json` (T6 deterministic pricer, 92 rules measured at Pre-Colors 40233d6be00e987c). Two derivations tested:

**Formula A — ovrEq = winsLost / slotWinsPerOvr(dest), rounded to step 2, clamped [0,10]:**
- 4 aligned, 13 underpriced, 26 overpriced, **49 unmeasurable** (slope[dest] null)
- Fatal flaw: dividing by slotWinsPerOvr(dest) blows up for low-weight destinations — DT→SAM gives ovrEq 58.5, REDG→SAM gives 82.31, CB→SAM gives 91.31. Division by near-zero slope for weight-100/weight-50 slots.

**Formula B — winsLost × scale, rounded to step 2, clamped [0,10] (scale fit = 11.2):**
- 12 aligned, 3 underpriced, 77 overpriced
- Fatal flaw: no single scale fits because winsLost-to-penalty isn't linear across source-dest pairs (same winsLost ~0.14 → CB→FS flat 0, CB→MIKE flat 4; role-family logic not captured).

**Key observation:** CB→FS has flat=0 but winsLost=0.1445 (similar to CB→MIKE at 0.143, flat=4). Same source, similar measured cost, different flat — because CB→FS stays within the defensive-back family while CB→MIKE crosses to linebacker. A weight-only or winsLost-only formula cannot reproduce this.

Results written to `tools/mathlab/results/flex-derive-2026-11-10.json`.

## Proposal (for when the Owner asks for the formula)

1. **Adopt Formula B's structure** (winsLost-based, stable for all slots including DIME/TE3) but replace the single scale with a **per-destination-weight tier**: basePrice(destWeight) from a small lookup (weight < 100 → tier 0-2; 100-250 → tier 2-4; 250-500 → tier 4-6; > 500 → tier 6-10), multiplied by a familyFactor (1.0 same family, 1.5-2.0 cross-family).
2. **Verify** by running flex-derive.mjs after each flex-pricer run; report aligned/underpriced/overpriced counts.
3. **Flag discrepancies** to the Owner; do not auto-apply. The hand-set table's role-family judgments (e.g., CB→FS = 0) should be preserved unless the Owner chooses to change them.
4. **Run flexdl5.mjs** after any flex.json change (existing rule — not a gate, so a stale flex-dl5.json can survive silently).

This is a discussion paper, not a build. No product file, protected constant, or flex.json is touched. The script is the only artifact, and it is read-only.

## Evidence label

VERIFIED (script `tools/mathlab/flex-derive.mjs` written and run; pricer result JSON read; slots.ts weights read from colors/src/sports/nfl/engine/slots.ts; flex.json REV 4 read from staged tree c768b555; both derivations computed and compared against the flat table; QB→FS=10 vs SS→FS=2 same-dest-weight comparison confirmed from slots.ts + flex.json) · INFERRED (conclusion that no single-scale derivation reproduces the table, based on the experiment output; tiered + familyFactor proposal is reasoned from the evidence)
