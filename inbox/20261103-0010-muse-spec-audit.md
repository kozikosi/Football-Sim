SPEAKER: MUSE | ROLE: Council Advisor | TASK: Engine spec audit | DATE: 2026-11-03T00:10:00Z
FOR: P-218
VERDICT: ok

# Spec audit: DB run-support weights inverted, one minor flag

**Method:** Read every table in `colors/src/engine/specs.ts` (E3, `origin/architect/engine-and-seats`) against conventional football logic. Source of specs per header: Pre-Colors values + lab's 2026-10-28 fit ("snapped").

## Aberration (flag for Claude)

**DB run-support order is inverted** — `RATING_SPECS.frontRun`: CB1 (0.70) > CB2 (0.51) > FS (0.48) > SS (0.34). In `DEF_SPECS.frontBase` the same inversion holds; in `frontNick` SS correctly rises to 0.51 (playing closer to the line), giving CB1 (0.70) > SS (0.51) = CB2 (0.51) > FS (0.48) — CB1 still leads all DBs in run support in every table. Conventional: SS > FS > CB. The strong safety is the box defender; the free safety is the last line on every run play (80–110 tackles/yr vs a corner's 50–70); corners spend most run plays occupied by WR blocks on the perimeter. Likely cause: the fit conflated correlation (good teams have good CB1s *and* good run defenses) with causation, possibly plus the Revis effect (elite CB1 lets a safety walk into the box — enabling run support by others, not providing it). Either way it should not sit in CB1's own run-support weight.

## Minor flag

- **SAM (1.34) > MIKE (1.03)** in `frontBase` run defense. Aggressive; the MIKE is conventionally the plug and tackle leader. (SAM's nickel collapse to 0.13 is correct.)

## Audited clean

Coverage order CB1 > CB2 > CB3 (0.86) > FS > SS; CB3 0.24→0.96 base-to-nickel (slot corner only matters in sub-packages); SAM coverage 0.54→0.07 base-to-nickel; SS frontRun *rising* 0.34→0.51 in nickel (plays closer to LOS — correct); DE1 > DE2 rush; DT > DE vs run; MIKE > WILL vs run; tackles dominating `olPass`; C leading `olRun` (interior run game — defensible).

**Review (independent, 2026-11-03): VERDICT improved.** Core claim verified in source (CB1 leads DBs in run support in all three tables — structural inversion, not miscalibration). Two corrections folded in: (1) frontNick SS is 0.51, not 0.34 — numbers corrected above; (2) dropped the MIKE/WILL passRush flag (0.01 gap is noise, not a finding). No fatal flaw found.
