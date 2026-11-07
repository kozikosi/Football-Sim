# FIT-TARGET FORENSICS — what the 28 Oct fit actually targeted (Z.ai, 2026-11-08)

**Purpose.** Beam's 7 Nov analysis (and the Owner's binding ruling built on it) states that
`RATING_SPECS`/`MC` were fitted to the Owner's OLD PERSONAL table, making the modelWeights
circularity deeper than my synthesis said. I reconstructed the fit chain from the artifacts
on `architect/engine-and-seats` and the PreColors baseline. The chain is now measured
end-to-end, and **the personal-table claim does not survive it** — with one important nuance
about where the real absorption point sits.

Every claim below is VERIFIED by a command in this session (commands listed; outputs
reproducible). Labels per AGENTS.md.

---

## 1 · The verified chain

**C1 · The 28 Oct fitlm target was `design.json` (27 Oct) × 0.00254 — exactly, on every slot.**
`tools/mathlab/cfg.json` (the fitlm config, commit 20dde5a, 27 Oct) carries `targets` in
wins-over-70→90. For all 29 slots present in the 27 Oct `design.json`:
`cfg.targets[s] == design.json[s] × 0.00254` to within 5e-4 — **29/29 exact, zero
mismatches** (the three extra cfg slots DL5/TE3/WR4 were added by later spot commits).
- 0.00254 = 2.54/1000, and cfg's QB target is 2.54 wins.
- Evidence: `git show origin/architect/engine-and-seats:tools/mathlab/cfg.json`,
  `git show 20dde5a:tools/mathlab/design.json`, checked by script 2026-11-08.

**C2 · The PreColors engine's own QB span IS 2.5414 wins.** The raw-curve witness on the
PreColors baseline (`5be9767f…`) measures `slotWins('QB',90) − slotWins('QB',70) = 2.5414`.
The fit target's QB number (2.54) is the engine's own measurement, quantised. The design
table's QB=1000 was pinned to the engine's own output, not to any Owner table.
- Evidence: `witness-precolors-5be9767f.json` (this session).

**C3 · design@27Oct is NOT a rescale of the old personal table.** Ratio design/personal runs
from 0.5 to 40.0 across the 22 shared slots (WR1 470 vs personal 60; CB3 280 vs 80; K 200 vs
5). Spearman(PreColors raw span, design@27Oct) = 0.852 vs Spearman(raw span, personal) =
0.745 (n=26/22). The personal table's signature (CB1≈DE1 at the top, WR1 tiny) is absent.
- Evidence: same scripts; PreColors `DEFAULT_WEIGHTS` read at line 452 (VERIFIED the values
  match Beam's quoted personal table: QB 320, WR1 60, TE1 80, CB1 350, SS 80, FS 60).

**C4 · The Owner had already directed the Architect away from the personal table — on 25 Oct.**
`_agents/owner-notes/2026-10-25-weights-philosophy.txt` (saved verbatim by the Architect,
commit 20dde5a, two days BEFORE design.json existed): "You used to have a bias toward my
initial player weights influencing the model. I think we should get away from that… pick
your own weights… I think 1000 should be the maximum of how much you value QB… last digits
of the weights should end in zero." The same note disavows my REWEIGHT-BRIEF's "Owner
scaling rule: divide by 2.54" ("I never said this") — an attribution error of mine that I
own here.

**C5 · The CURRENT Colors-track specs are fitted to the SALARY table, not the personal table.**
`calibrate-weights.mjs` reads `salary-reference.json` (Owner ruling 6 Nov) and its commit
6cccf29 says "table, refitted specs, K/P knobs, tests". The personal-table era of the specs
ended 6 Nov if it ever existed at the knob level.
- Evidence: `git show origin/architect/engine-and-seats:tools/mathlab/calibrate-weights.mjs`
  (header comment), `git log -- architect/engine-and-seats` commit 6cccf29.

**C6 · Where the personal table DOES still live in shipped code — and where the real
absorption happened.**
- PreColors `modelWeights()` falls back to `DEFAULT_WEIGHTS` (the personal table) only for
  slots the measurement cannot price (depth/specialist slots get `min(default,5)`). The
  MEASURED slots disagree with the personal table wildly (modelWeights: WR1 305 vs 60, CB3
  260 vs 80, K 200 vs 5 — see the witness table).
- The **w79 shell's display calibration** pins the measured curve to the Owner's (salary)
  table exactly: raw_span ÷ salary-weight = 0.002540 constant across all 28 measurable
  slots, **max relative deviation 0.000000%**. After w79, the shell's "measured impact"
  surface carries ZERO between-slot engine information (VERIFIED — witness-w79,
  calibration_absorption ABSORBED).
- Evidence: `witness-w79-61acb21e.json`; salary weights cross-checked against
  `salary-reference.json`.

## 2 · What this changes

- **The 7 Nov ruling record's factual premise ("the fit target was the old personal table")
  is contradicted by the artifacts.** The direct target was design@27Oct — an Architect-built
  table on the Owner-ordered QB=1000 scale, substantially echoing this engine's own raw
  curves (rho 0.852, QB span exact) — and the current specs target the salary table anyway.
  A correction REQUEST is filed in the ruling log (R-001, D-007); the Owner decides.
- **The Owner's permission (R-001) stands on its own and remains exactly right** — old
  tables are anchors, never targets. Nothing in this note weakens the permission; it
  strengthens the reason: the true absorption point was the DISPLAY layer, which is easier
  to fix than a mechanics fit, and the raw-curve witness now detects absorption
  automatically (it caught the w79 state at 0.00% deviation).
- **Beam's M2 critique survives intact**: comparing measured curves to the salary table
  compared a fit target against itself post-6-Nov; and post-w79 the shell's measured curve
  IS the salary table to 7 decimal places.
- My own prior framing ("two calibrations, fit target = a table") under-stated how deep the
  w79 absorption goes: not two targets, but one live table with a measured-curve costume.

## 3 · Labels

| Claim | Label |
|---|---|
| cfg.targets = design@27Oct × 0.00254 (29/29) | VERIFIED (scripted check, 2026-11-08) |
| PreColors QB raw span 2.5414 | VERIFIED (witness run on `5be9767f…`) |
| design@27Oct not a rescale of personal; rho orderings | VERIFIED (scripted check) |
| Owner 25 Oct note text | VERIFIED (file read at commit 20dde5a) |
| Current specs fit to salary (6cccf29) | VERIFIED (script header + commit message) |
| w79 absorption 0.000000% | VERIFIED (witness run on `61acb21e…`) |
| What design@27Oct's hand adjustments derived from, pre-27-Oct | UNKNOWN — predates reachable history; only the Owner/Architect can testify |
| modelWeights() echoing the personal table on the SHELL | REFUTED for measured slots (witness table: WR1 305 vs 60 etc.); true only as DEFAULT_WEIGHTS fallback for unmeasured slots |
