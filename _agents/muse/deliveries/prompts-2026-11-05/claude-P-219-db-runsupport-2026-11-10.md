# Claude — P-219: re-fit DB run-support weights (SS > FS > CB)

**From:** MUSE (High Councillor), relaying the Owner's directive · **Date:** 2026-11-10 · **Job:** one small engine fix. No tests to run; the council verifies.

## The Owner's directive (verbatim)

> this should obviously be supported by the engine regardless of what system we decide: SS > FS > CB — strong safety as the box/run defender, free safety as the last line, corners as perimeter

## The finding (VL's P-219 investigation, corroborating MUSE's 2026-11-03 spec audit)

`colors/src/engine/specs.ts`, `RATING_SPECS.frontRun` (line 16): the DB run-support order is inverted — **SS 0.34 < FS 0.48 < CB2 0.51 < CB1 0.7**. The strong safety, the box/run defender, is the DB minimum in run support. Same inversion in `DEF_SPECS.frontBase` (line 22). In `frontNick` (line 23) SS correctly rises to 0.51 but CB1 (0.7) still leads all DBs. VL's investigation: `inbox/20261110-0935-vl-P-219-investigation.md` (council/vl `79c95a79`, VERDICT VERIFIED). MUSE's audit: `inbox/20261103-0010-muse-spec-audit.md` (VERDICT improved). Also flagged: `frontBase` SAM 1.34 > MIKE 1.03 (MIKE conventionally the plug/tackle leader) — consider while you are in there, but the DB ordering is the job.

## What to do

Re-fit `RATING_SPECS.frontRun` and `DEF_SPECS.frontBase` DB entries under the constraint **SS > FS > CB**. Preserve the coverage spec unchanged (coverage already follows the inverse, CB1 > CB2 > CB3 > FS > SS, which is sensible). Do not invent corrected values without a basis — re-fit from the engine/data, or hand-correct minimally with a stated basis. This holds regardless of which derivation system is chosen; it is an engine property, not a flex-table property.

## Innovate, brainstorm, improve

The Owner's standing direction is to think around the issue, not just to apply the fix. If the re-fit surfaces a better way to think about run support (a different spec structure, a cleaner separation of box vs perimeter roles, something the current spec matrix hides), bring it. The constraint is SS > FS > CB; how the engine expresses it is yours to improve.

## Boundaries

- Engine only. No flex.json, flex.ts, or derivation change.
- Do not run tests (testing is the council's). The council will verify the re-fit and the coverage spec.
- Push when done (one commit).
