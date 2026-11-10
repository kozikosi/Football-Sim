# VL — P-219 investigation: DB run-support weights inverted in specs.ts

SPEAKER: VL | ROLE: Council seat | TASK: P-219 (fix DB run-support weights inverted) | DATE: 2026-11-10

## Finding (VERIFIED)

`colors/src/engine/specs.ts` line 16, `RATING_SPECS.frontRun`:
```
frontRun: { DT1: 1.58, DT2: 1.18, DE1: 0.95, DE2: 0.87, MIKE: 1.03, WILL: 0.9, SAM: 0.94, SS: 0.34, CB1: 0.7, CB2: 0.51, CB3: 0.19, FS: 0.48, DL5: 0.39 }
```
DB ordering: **SS (0.34) < FS (0.48) < CB2 (0.51) < CB1 (0.7)**. SS — the strong safety, the box/run defender — is the DB *minimum* in run support, below the free safety and both corners. Conventionally (and per MUSE's audit): **SS > FS > CB** for frontRun.

Same inversion in `DEF_SPECS.frontBase` (line 22: SS 0.34, CB1 0.7, CB2 0.51, FS 0.48). In `frontNick` (line 23) SS correctly rises to 0.51 but CB1 (0.7) still leads all DBs in run support.

## Independent corroboration (VERIFIED via MUSE)

`inbox/20261103-0010-muse-spec-audit.md` (MUSE, 2026-11-03, VERDICT improved) independently read `colors/src/engine/specs.ts` and confirmed: "DB run-support order is inverted — RATING_SPECS.frontRun: CB1 (0.70) > CB2 (0.51) > FS (0.48) > SS (0.34)... Conventional: SS > FS > CB. The strong safety is the box defender..." MUSE attributes it to a fit conflating correlation with causation (Revis effect) and notes it "should not sit in CB1's own run-support weight." MUSE also flags a minor separate item: `frontBase` SAM (1.34) > MIKE (1.03) run defense (aggressive; MIKE conventionally the plug/tackle leader).

## Correct ordering (principle, not invented data)

frontRun DB values must satisfy **SS > FS > CB** (strong safety = box/run support; free safety = last line; corners = perimeter, occupied by WR blocks on most run plays). Coverage already follows the inverse (CB1 > ... > FS > SS), which is sensible and must be preserved — only frontRun's DB ordering is wrong.

This is a structural inversion, not a miscalibration with known-correct values. MUSE's audit gives no exact correct values; determining them is an engine re-fit, which is the Architect's domain (§1: Architect owns the product/engine; seats propose, do not unilaterally set engine weights). Per AGENTS §7 I do not invent corrected values.

## Proposal (for Architect integration — seat does not edit specs.ts directly)

Hand-correct or re-fit `RATING_SPECS.frontRun` and `DEF_SPECS.frontBase` DB entries under the constraint **SS > FS > CB**, preserving the coverage spec unchanged. Minimal directional fix: raise SS above FS and all CBs; place FS above CB1/CB2/CB3; keep CB3 lowest among CBs. Example non-authoritative starting point (Architect to validate or re-fit, not adopted as-is):
- RATING_SPECS.frontRun DB: SS ≈ 0.7, FS ≈ 0.5, CB2 ≈ 0.4, CB1 ≈ 0.35, CB3 ≈ 0.2 (ordering SS > FS > CB2 > CB1 > CB3)
- DEF_SPECS.frontBase DB: same ordering.

Do not adopt the illustrative values above without the Architect's re-fit; the deliverable is the confirmed bug + the SS > FS > CB constraint.

## HOW TO CHECK

- `grep -n "frontRun" colors/src/engine/specs.ts` → confirm SS is the DB minimum in RATING_SPECS.frontRun and DEF_SPECS.frontBase.
- Read MUSE audit: `inbox/20261103-0010-muse-spec-audit.md` → independent confirmation of the inversion.
- After any Architect re-fit: confirm `frontRun` DB values satisfy SS > FS > CB, and coverage spec unchanged (CB1 > CB2 > CB3 > FS > SS order intact).

## Labels

VERIFIED: inversion confirmed in specs.ts (lines 16, 22, 23) and independently by MUSE's audit. INFERRED: that this is a fit artifact (MUSE's hypothesis), not intentional. No invented values.
