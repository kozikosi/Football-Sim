# super — council seat lane file
Identity: seat `super`, worktree `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super`, branch `council/super`, merge-base with origin/council/base = 1b91f50e. HEAD = 26731bbc (pushed, ls-remote verified equal).

## Current work and state (this session, 2026-11-10)
- P-142 (P1) Review OR's crossflex measurement: DONE, VERDICT improved (concur vl). inbox/20261110-0918-super-P-142-review.md committed bccbcbef, pushed council/super, ls-remote verified.
- P-143 (P0) Review beam's Guide page rebuild: DONE, VERDICT improved. inbox/20261110-1010-super-P-143-review.md committed a93e0008, pushed council/super, ls-remote verified.
- P-322 (P0) Own cross-sport derivation "The Overlay Model": DONE + RECONSIDERED. Designed from scratch, not piggybacking on ZAI-D1/Inkling/Claude. Reviewed all other seats' work (Inkling P-322 = 99/99 with 6 overrides + floor + discount + exclusion; ZAI-D1 = 98/99 with 0 overrides + 3 Owner score changes; MUSE two-factor = weight-band only, lower fit).
- Files: inbox/20261110-1200-* (design), inbox/20261110-1400-* (original report, superseded), inbox/20261110-1600-* (reconsideration report, this session), tools/mathlab/derive-super-overlay.mjs (v4, rewritten, this session).
  - FACT: v4 scores 97/99 vs live 99-rule Owner table (architect 97d7e9d): 52 exact, 45 off-by-one, 2 hard misses (CB>FS: owner 0/model 6; CB>SS: owner 0/model 6), 0 no-profile. VERIFIED via `node tools/mathlab/derive-super-overlay.mjs`.
  - FACT: Matches Inkling's best refined fit (97/99) with zero per-rule overrides — Inkling needs 6 overrides + cross-side floor + same-group discount + FS<->SS exclusion + EDGE>OLB override + cuts 1.5/4/9 ≈ 26+ constants; mine needs 4 hyperparameters + 4 hardcoded Owner rules.
  - FACT: Cross-sport by design — 8 universal duties (LINE, PRESSURE, COVER, HANDLE, CARRY, CATCH, SNP, RNG). Basketball ports by swapping CAP/DEMAND profiles + families, zero formula changes. ZAI-D1's 17 football-specific duties can't port without redesign.
  - FACT: 2 hard misses are CB→safety asymmetry cases — Owner treats CB>FS/CB>SS as free (DB-family symmetry), but my symmetric duty model can't express asymmetric same-family judgments. Would need role-level dimension or 2 override rows to reach 99/99.
  - Implementation: tools/mathlab/derive-super-overlay.mjs (Node.js, read-only, reads flex.json from git).
- P-311 (verify Claude's flex D-table rebuild): still BLOCKED — architect tip still 3ed03627; flex.json at architect tip is the older -2/-6/-12 table (4cc3dee), not the Owner's D-table.
- Shared Z.ai flex derivation z2: DONE. Copied from Owner's desktop at `/Users/kosi/Desktop/Football Sim/flex derivation z2` to `inbox/flex-derivation-z2/` and pushed council/super (26731bbc). 14 files: ZAI-D1 with Owner's score changes (98/99), C>OT hub-exit analysis, basketball multisport sketch, 3 read-only Python tools, run transcripts, full V4 99-rule diff. Nothing touches the product; no re-pin. For Muse and Claude to read.
- Prior (unchanged): P-314, P-287 (slices 3+4), P-296 reviews all committed & pushed (see bulletin history).

## What the next session needs
- Re-check P-311 once Claude's D-table rebuild lands on architect/engine-and-seats.
- P-142 awaits Owner/Architect naming the authoritative design.json and the reconciled draft-board-order table.
- P-143 awaits beam's improved resubmission with exact old→new strings + clarified scope + exact HTML for replacements.
- P-293 (model-first weights): blocked as before (top-level DOM init in Pre-Colors.html; madden27-ratings.csv lacks EPA/AV/volume anchors).

## Open questions
- None blocking.

## Live files
- inbox/flex-derivation-z2/ (this session, pushed 26731bbc — Z.ai's flex derivation z2 package, for Muse and Claude)
- inbox/20261110-1600-super-P-322-reconsideration.md (this session, pushed 26731bbc)
- inbox/20261110-1400-super-P-322-derivation-report.md (superseded by reconsideration)
- inbox/20261110-1200-super-P-322-my-derivation-design.md (this session)
- inbox/20261110-1010-super-P-143-review.md (pushed a93e0008)
- inbox/20261110-0918-super-P-142-review.md (pushed bccbcbef)
- inbox/20261109-1518-super-P-314-slice2-review.md (pushed e35df12a)
- inbox/20261110-0424-super-P-287-slice3-slice4-review.md (pushed d809b162)
- inbox/20261110-0450-super-P-296-cutover-checklist.md (pushed 94850a1d)

## Worktree / branch / merge-base
- worktree: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- branch: council/super
- merge-base with origin/council/base: 1b91f50e
