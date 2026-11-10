# super — council seat lane file
Identity: seat `super`, worktree `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super`, branch `council/super`, merge-base with origin/council/base = 1b91f50e. HEAD = a93e0008 (pushed, ls-remote verified equal).

## Current work and state (this session, 2026-11-10)
- P-142 (P1) Review OR's crossflex measurement: DONE, VERDICT improved (concur vl). inbox/20261110-0918-super-P-142-review.md committed bccbcbef, pushed council/super, ls-remote verified.
- P-143 (P0) Review beam's Guide page rebuild: DONE, VERDICT improved. inbox/20261110-1010-super-P-143-review.md committed a93e0008, pushed council/super, ls-remote verified.
- P-322 (P0) Own cross-sport derivation "The Overlay Model": DONE. Designed from scratch, not piggybacking on ZAI-D1/Inkling/Claude. inbox/20261110-1200-super-P-322-my-derivation-design.md + inbox/20261110-1400-super-P-322-derivation-report.md + tools/mathlab/derive-super-overlay.mjs (this session, to push).
  - FACT: 97/99 fit vs live 99-rule Owner table (architect 97d7e9d): 52 exact, 45 off-by-one, 2 hard misses, 0 no-profile.
  - FACT: 2 hard misses — FS>CB (owner 6, model 0) and RB>WR (owner 12, model 2). Both explainable: FS>CB is a 1-point COVER gap my model calls free but Owner treats as role promotion; RB>WR is Owner's strategic judgment to not waste RBs at WR, not a duty-compatibility fact.
  - FACT: Match Inkling's best refined fit (97/99) with zero per-rule overrides — Inkling needs 5 U-table overrides + D@90 + DMULT; mine needs 4 hyperparameters + 4 hardcoded Owner rules.
  - FACT: Cross-sport by design — swap in basketball CAP/DEMAND profiles + families, same formula. No formula changes needed.
  - Implementation: tools/mathlab/derive-super-overlay.mjs (Node.js, read-only, reads flex.json from git).
- P-311 (verify Claude's flex D-table rebuild): still BLOCKED — architect tip still 3ed03627; flex.json at architect tip is the older -2/-6/-12 table (4cc3dee), not the Owner's D-table.
- Prior (unchanged): P-314, P-287 (slices 3+4), P-296 reviews all committed & pushed (see bulletin history).

## What the next session needs
- Re-check P-311 once Claude's D-table rebuild lands on architect/engine-and-seats.
- P-142 awaits Owner/Architect naming the authoritative design.json and the reconciled draft-board-order table.
- P-143 awaits beam's improved resubmission with exact old→new strings + clarified scope + exact HTML for replacements.
- P-293 (model-first weights): blocked as before (top-level DOM init in Pre-Colors.html; madden27-ratings.csv lacks EPA/AV/volume anchors).

## Open questions
- None blocking.

## Live files
- inbox/20261110-1400-super-P-322-derivation-report.md (this session, to push)
- inbox/20261110-1200-super-P-322-my-derivation-design.md (this session, to push)
- inbox/20261110-1010-super-P-143-review.md (pushed a93e0008)
- inbox/20261110-0918-super-P-142-review.md (pushed bccbcbef)
- inbox/20261109-1518-super-P-314-slice2-review.md (pushed e35df12a)
- inbox/20261110-0424-super-P-287-slice3-slice4-review.md (pushed d809b162)
- inbox/20261110-0450-super-P-296-cutover-checklist.md (pushed 94850a1d)

## Worktree / branch / merge-base
- worktree: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- branch: council/super
- merge-base with origin/council/base: 1b91f50e
