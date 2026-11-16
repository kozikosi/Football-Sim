# SETTLE-RULE-PREREGISTERED.md — the sealed bench's settle rule, registered BEFORE any blind run (Rev 10 EXT E(2))

Seat: Z.ai · 2026-11-16 · registered 2026-11-16, before any blind runner exists. A settle rule
written after the numbers exist is not a settle rule; the author-run data point (VERDICT-REV-10-ADDENDUM.md)
cannot vote under this rule and the rule's applicability clause says so mechanically. Any change
to this file after a blind run starts is a re-registration and must be re-hashed and re-pinned in
VERIFY.txt §1 with a dated note.

**Registration sha256 (of this file, computed at registration — see VERIFY.txt §1 for the pinned
value and receipts/settle-rule-hash.txt for the command output):**
`sha256 SETTLE-RULE-PREREGISTERED.md` — the value is printed by
`shasum -a 256 SETTLE-RULE-PREREGISTERED.md` and pinned in VERIFY §1; the two must match at
packaging (the CHECKSUMS.txt pin also covers this file, so tampering breaks the gate).

## The rule (mechanical; two runners applying it get the same verdict)

- **Unit:** `repairs` per arm — ONE checker/build/probe failure that required EDITING already-written
  code (SEALED-RECIPE.md §5's definition, counted identically in both arms); and `first_try_green`
  per arm — binary (yes/no). One bench = the 11-field sealed store + component, both arms.
- **N:** ONE blind runner, both arms (the bench as shipped). The recipe's coin seed 20261115 fixes
  the authoring order (v,s,v,v convention; this bench has one slice, so the pair is v,s) so pairs
  compare across agents. N is deliberately small and declared up front: this is a falsifier, not a
  statistics engine — if the council wants N>1 runners, that is a NEW registration, not this one.
- **Inputs:** `repairs_vue`, `repairs_svelte`, `first_try_green_vue`, `first_try_green_svelte` from
  the runner's `receipts/sealed-recipe-timing.txt` (the handoff's receipt format, first line
  `recipe_sha256=7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07`).
- **Compute:** `ratio = repairs_svelte / repairs_vue` (if `repairs_vue = 0`, use
  `max(1, repairs_svelte)` as the denominator and note it). No rounding: compare the raw ratio.
- **FLIP to Vue** iff `ratio ≥ 2.0` AND `first_try_green_svelte = no` AND `first_try_green_vue = yes`.
- **CONFIRM the Svelte lean** iff `ratio < 1.0`.
- **WASH stands** iff `1.0 ≤ ratio < 2.0` OR the FLIP conditions are not all met.
- **Applicability (the clause that makes author-run runs inadmissible):** the rule fires ONLY on a
  run whose runner has not seen either arm's store/component code, the recipe's authoring history,
  or any prior measurement receipt before their run completes. The author's Rev 9 run fails all
  three tests and is inadmissible by construction — see VERDICT-REV-10-ADDENDUM.md. A runner who
  stalls and reads additional delivery files mid-bench marks the run CONDITIONAL in the receipt;
  the council, not the runner, rules on admissibility.
- **Exact command (the bench):** per SECOND-AGENT-HANDOFF.md preflight, then per arm:
  `node flip-bench/flip-bench-sealed.mjs football-sim-vue football-sim-svelte --recipe SEALED-RECIPE.md`
  writing `flip-bench/sealed-run-receipt.json` (status OPEN until filed) and
  `receipts/sealed-recipe-timing.txt`. The verdict line in the receipt must quote the computed
  ratio raw and name the band (FLIP / CONFIRM / WASH).
- **What the outcome does:** FLIP → the Owner's framework pick flips to Vue (the lean dies);
  CONFIRM → the lean carries as the reported direction, still no number; WASH → the lean stays
  feel-only. Nothing in this rule moves the engine pin, the palette ruling, or the Owner's pick
  authority.
