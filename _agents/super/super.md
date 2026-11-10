# super — council seat lane file
Identity: seat `super`, worktree `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super`, branch `council/super`, merge-base with origin/council/base = 1b91f50e. HEAD = bccbcbef (pushed, ls-remote verified equal).

## Current work and state (this session, 2026-11-10)
- P-142 (P1) Review OR's crossflex measurement for the flex rules table: DONE, VERDICT improved (concur vl). inbox/20261110-0918-super-P-142-review.md committed bccbcbef, pushed council/super, ls-remote verified.
  - FACT: OR's design.json basis WR1 470 / CB1 450 = council/or and HEAD/council/super (git show both; output in the review).
  - FACT: architect/engine-and-seats design.json = WR1 650 / CB1 400 — exactly the Owner's quoted "WR1 at 650 and CB1 at 400"; diverges from council/or and council/super.
  - FACT: product DEFAULT_WEIGHTS line 452 = WR1 60, CB1 350 (spot weights, shipped build) — a third set; CB1 > WR1 there.
  - FACT: OR's "CB→WR1 never attractive / no re-costing needed" holds only at 470/450; OR concedes CB→WR1 attractive at 650/400. OR's 9-of-98 count not re-run here (REPORTED).
  - FACT: P-142 brief's quoted 25 Oct rules contradict Owner's 29 Oct REV 4 (HEAD tools/mathlab/flex.json: QB→FS only at −10, QB→RB removed). Filing lacks P-142's draft-board-order table, NATURAL_SLOT_MAP conflict check and fallback-text effect.
  - Product NATURAL_SLOT_MAP at Football-Sim-PreColors.html lines 931-938; product FLEX lines 940-952 (CB→WR 4; HB→TE 6 only; FB{}).
- P-311 (verify Claude's flex D-table rebuild): still BLOCKED — architect tip still 3ed03627; flex.json at architect tip is the older -2/-6/-12 table (4cc3dee), not the Owner's D-table.
- Prior (unchanged): P-314, P-287 (slices 3+4), P-296 reviews all committed & pushed (see bulletin history).

## What the next session needs
- Re-check P-311 once Claude's D-table rebuild lands on architect/engine-and-seats.
- P-142 awaits Owner/Architect naming the authoritative design.json and the reconciled draft-board-order table; OR's filing needs re-measurement against it plus NATURAL_SLOT_MAP/fallback checks.
- P-293 (model-first weights): blocked as before (top-level DOM init in Pre-Colors.html; madden27-ratings.csv lacks EPA/AV/volume anchors).

## Open questions
- None blocking.

## Live files
- inbox/20261110-0918-super-P-142-review.md (pushed bccbcbef)
- inbox/20261109-1518-super-P-314-slice2-review.md (pushed e35df12a)
- inbox/20261110-0424-super-P-287-slice3-slice4-review.md (pushed d809b162)
- inbox/20261110-0450-super-P-296-cutover-checklist.md (pushed 94850a1d)

## Worktree / branch / merge-base
- worktree: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- branch: council/super
- merge-base with origin/council/base: 1b91f50e
