# GLYPH — council seat

**Path:** /Users/kosi/Desktop/wt/glyph  
**Branch:** council/glyph  
**Merge-base with origin/council/base:** 1b91f50e161fa10d0607c8e09330115ffa27f1ff

## Identity
Council seat (glyph). Advises/reviews/measures; no product-file, governance, queue, or protected-constant edits.

## Current work and state
- 2026-11-10T05:58Z: Completed P-322 derivation independent verification (task B from `council-prompt-2026-11-10-derivation-designs.md`). Re-implemented Inkling's P-322 formula from `origin/council/inkling:inbox/20261110-0104-inkling-P-322-skill-profile-design.md` and ran against live 99-rule table `origin/architect/engine-and-seats:tools/mathlab/flex.json` at `97d7e9d` (99 rules, tiers 23/43/10/23) with D@90 from `97d7e9d:tools/mathlab/results/thetaprice-2026-11-09.md`.
- **VERIFIED (B, MUSE-prototype BLK behavior = BLK gap zeroed when both BLK>=8, any dst):** exact 88, off-by-one 11, hard 0. Residuals exactly 5 floor + 6 Inkling: `WR>CB,WR>DIME,WR>FS,WR>NICKEL,WR>SS` (owner 6, model 2) and `CB>FS,CB>SS,EDGE>OLB,ILB>OLB,SS>DIME,SS>NICKEL` (owner 0, model 2).
- **VERIFIED (A, spec-literal BLK-to-C-only per Inkling text):** exact 87, off-by-one 12, hard 0; adds `OG>OT owner=2 model=6` (D 3.99 gate halves BLK gap). BLK-condition pinning matters for derivation/build claims.
- Claude `tools/mathlab/flexderive.mjs` (architect `678bb06`) not executed directly in this worktree; prompt-reported 88/11/0 parity supported by independent reproduction of MUSE behavior (REPORTED/INFERRED for Claude script itself).

## What the next session needs
1. Read this lane file, then `git fetch -q origin` and take next derivation/review work from `node ./.council_tool.mjs next` or assigned prompt (P-322 A/C/D/F designs/floor/15-skill, P-287 Slice 5 reviews, P-328 reviews remain open per 2026-11-10 prompt).
2. If continuing derivation, use pinned refs (`97d7e9d` flex/thetaprice) and state BLK interpretation explicitly; do not edit flex prices/product/engine.
3. Prior inbox from this session: `inbox/20261110-0558-glyph-P-322-derivation-verify.md`.

## Open questions
- Which BLK elite-line rule is canonical for "Inkling P-322 formula" claims: spec-literal `dst==C` or MUSE-prototype any-dst-when-both-BLK>=8? (affects OG>OT)

## Live files
- `inbox/20261110-0558-glyph-P-322-derivation-verify.md`
- `tools/mathlab/flex.json`, `tools/mathlab/results/thetaprice-2026-11-09.md` (read from `97d7e9d`)
- `origin/council/inkling:inbox/20261110-0104-inkling-P-322-skill-profile-design.md`
- `origin/council/muse:_agents/muse/deliveries/derive-prototype-2026-11-10.py`

## Worktree / branch
- Path: `/Users/kosi/Desktop/wt/glyph`
- Branch: `council/glyph`
- `git merge-base HEAD origin/council/base`: `1b91f50e161fa10d0607c8e09330115ffa27f1ff`
