SPEAKER: inkling | ROLE: council advisor | TASK: P-325 receiving-mix fidelity — which RATING_SPECS.rec is the constants of record | DATE: 2026-11-10T03:02Z
FOR: P-325
SCOPE: the spec-fidelity half of P-325. The measurable WR3 slope/span half was answered in P-326 (Colors: WR3 0.2470 NEW = 0.2470 OLD, VERIFIED); this file asks which literal set is the constants of record, with the receipts, so the Owner can rule. I changed nothing.

## The two literal sets, VERIFIED by direct reads

Pre-Colors (`Football-Sim-PreColors.html`, protected build `40233d6be00e987c`), line 1943:
```
rec:      {WR1:1.5, WR2:1.0, WR3:0.7, TE1:0.9, RB1:0.2},
```
Colors (`colors/src/sports/nfl/engine/specs.ts`, architect branch @ 728b2c53), line 14:
```
rec: { WR1: 25.682, WR2: 19.86, WR3: 3.251, TE1: 2.174, RB1: 4.201, TE3: 1.264, WR4: 1.6 },
```
Colors line 1-4 header says the file is: "Source: Pre-Colors RATING_SPECS / DEF_SPECS / PERS_REC / MC / PLAN_K, with the lab's final fit (tools/mathlab/results/engine-patch-2026-10-28-recv.js.txt, 'snapped') and its additions". Neither file carries an Owner note naming one as the hand-set truth.

Normalized (WR1 = 1.0):

| | WR1 | WR2 | WR3 | TE1 | RB1 |
|---|---|---|---|---|---|
| Pre-Colors 1943 | 1.000 | 0.667 | 0.467 | 0.600 | 0.133 |
| Colors specs.ts 14 | 1.000 | 0.773 | 0.127 | 0.085 | 0.163 |

WR3's share of WR1: Pre-Colors 46.7% · Colors 12.7%. Same scale shape, materially different WR3 weight — exactly the slot whose measured wins diverged between the two engines (Pre-Colors P-321: WR3 up ~25 weight-equivalent; Colors: WR3 unchanged, VERIFIED this session in P-326).

## What the spec itself says about these literals (ENGINE-MATH-SPEC, REV 5, read from `origin/council/muse`)

- Line 29 (REV log): "**Composition weights** in `RATING_SPECS`, `DEF_SPECS`, `PERS_REC`: smallest edit that hits the table." — the composition coefficients are fit products, not Owner hand values; the Owner's artifact is the integer table (REV 5, 32 spots, TE3 = 10, WR4 = 10).
- §14.2 (recv re-fit, line 99): "In `RATING_SPECS.rec`: TE3 takes 4.52% of WR2's weight (13 personnel drops a second receiver relative to 12); WR4 takes 0.52% of TE1's weight … Then **all 32 spots are refit**" — i.e. the Colors literals are the post-§14.2 re-fit, explicitly intended to replace the pre-refit literals.
- §14.5 (line 102) and line 59: the re-fit was verified end-to-end, and "**Transfer to the real base is VERIFIED:** the fit was run on Pre-Colors itself … and gives the same 114 composition weights … to the last digit" — i.e. the lab intended the recv re-fit to apply to the Pre-Colors base too, but Pre-Colors the protected file was never re-patched (it cannot be, per the protected-constants rule without an Owner approval + re-pin).
- §14.3 (line 100): the rev weights `WR1 1.5, WR2 1.0, WR3 0.7` appear only inside the *rejected* 10-personnel-as-a-plan experiment — i.e. as a counterfactual "last gasp of the old literals", not as the adopted fit.
- Pre-Colors' `1.5/1.0/0.7` are therefore the pre-recv literals the fit started from; Colors' `25.682/19.86/3.251` (+ TE3 1.264 + WR4 1.6 from §14.2/14.4) are the adopted post-recv literals. Both are "the engine's" RATING_SPECS — at different refit stages.

## What I did / did not check

- VERIFIED: both literal sets (commands above); the spec sections (lines cited, read from `origin/council/muse:_agents/ENGINE-MATH-SPEC.md` @ REV 5); the Colors specs.ts header; WR3 0.2470 unchanged on the Colors engine (P-326, this session, script 89bcdf32).
- NOT checked / NOT claimed: which literal set produces PREDICTED real-world stat lines better (no real-world validation was run); whether the 10-personnel counterfactual in §14.3 would have been adopted had it passed; whether PreColors-with-§14.2-patched literals measures WR3 the same as Colors (near-certain given the spec's "transfer VERIFIED" line, but not re-measured this session).

## The question that needs an Owner / Architect ruling

Which literal set is RATING_SPECS-of-record for the constants:
(a) Pre-Colors line 1943 (pre-recv literals; the protected file's current content; unpatched by rule), or
(b) the post-§14.2 recv re-fit literals as ported in Colors (architect branch specs.ts) — i.e. "the fit's output, wherever it landed, is the constants' truth, and Pre-Colors stays a frozen historical build whose literals are known-stale in exactly this row"?

My recommendation (do not act on it without the Owner/Architect): (b), because (i) the spec's own REV log says the composition weights are fit products and (ii) §59 says the transfer to the real base was VERIFIED on Pre-Colors — the spec treats the recv re-fit as the truth of record, and (iii) w88's published Wins table was computed on Colors, so ruling (a) would pull the w-series back to a build whose constants the project has already superseded in every other row. Under (b), Pre-Colors' rec row is not "wrong", it's frozen pre-refit history — and AGENTS.md's hash-pin already treats it as frozen.

If the ruling is (a) instead: the w88/P-321 measurements need re-running on a Pre-Colors-based engine with the OLD literals before anyone relies on either table, and the §14.2 re-fit (Owner-approved by the fit workflow at the time) needs an explicit Owner decision to re-apply or not — that is the protected-constants rule, not something the council can settle.

Also flagging for whoever picks this up: whatever the ruling, the Colors literals include TE3 1.264 and WR4 1.6, which have no Pre-Colors counterpart (the slots didn't exist) — so the two lineages can never be byte-matched again; only the common 5 rows (WR1/WR2/WR3/TE1/RB1) are comparable, and they already diverge (0.773/0.667 WR2, 0.127/0.467 WR3). The "PreColors vs Colors fidelity" item in P-325 is therefore not a bug to fix — it is two refit stages of one fitted table. The real work is the ruling in this file, plus re-measuring WR3's P-321 delta on whichever literals the Owner names of record.

## Evidence label

VERIFIED (direct reads, commands above; WR3 Colors measurement from this session) · REPORTED (spec §59's transfer-VERIFIED and §14.5's re-fit verification — the lab's receipts, not mine to re-run here) · INFERRED (the "two refit stages, not two hands" explanation; the recommendation for (b)) · UNKNOWN (real-world predictive validity of either set; byte-identity of Colors specs.ts to any pinned artifact).
