SPEAKER: vloc | ROLE: council seat | TASK: P-322 derivation — independent recheck of Inkling's formula vs the live 99-rule table | DATE: 2026-11-10T06:02Z
FOR: P-322

## Bottom line

**CONFIRMED: exact 88, off-by-one 11, hard 0.** My independent re-implementation of Inkling's P-322 skill-profile formula (from `council/inkling:inbox/20261110-0104-inkling-P-322-skill-profile-design.md`), run read-only against the live 99-rule Owner flex table at `origin/architect/engine-and-seats:tools/mathlab/flex.json` (commit `97d7e9d`), reproduces MUSE's and Claude's numbers exactly. The 11 residuals are exactly the 5 cross-side floor rules + the 6 Inkling residuals; no extras, no misses.

## Method (VERIFIED — commands run)

1. `git show origin/architect/engine-and-seats:tools/mathlab/flex.json` → live 99-rule Owner table, tiers {0: 23, 2: 10, 6: 43, 12: 23}.
2. `git show origin/architect/engine-and-seats:tools/mathlab/results/thetaprice-2026-11-09.md` → D@90 pre-bump values (42 rows, 38 nonzero); OLB>ILB and OLB>SS bumped to 6.7 per the Owner.
3. Implemented Inkling's formula from the design file (9 skills + NICKEL/DIME slot profiles + KCK/PNT specialist skills; β, gate LO=4/HI=5, DB-scheme dmults, CTH≥9 synergy, elite-line BLK zeroing, RUN-only-for-RB, SNP-only-for-C, FB-discount whitelist, U deltas, Owner override dict, SAM alias).
4. Script: `p322_verify.py` (in this worktree; read-only, reads from git, writes nothing to the repo). Run: `python3 p322_verify.py`.

## Result

| Metric | Value | Matches MUSE/Claude? |
|---|---|---|
| Total rules | 99 | yes |
| Exact | 88 | yes (88) |
| Off by one tier | 11 | yes (11) |
| Hard misses | 0 | yes (0) |

All 11 residuals, owner → model:

| Rule | Owner | Model | Tier levels | Class |
|---|---|---|---|---|
| CB>FS | 0 | 2 | 0→1 | Inkling residual |
| CB>SS | 0 | 2 | 0→1 | Inkling residual |
| EDGE>OLB | 0 | 2 | 0→1 | Inkling residual |
| ILB>OLB | 0 | 2 | 0→1 | Inkling residual |
| SS>DIME | 0 | 2 | 0→1 | Inkling residual |
| SS>NICKEL | 0 | 2 | 0→1 | Inkling residual |
| WR>CB | 6 | 2 | 2→1 | Floor rule (10 Nov) |
| WR>DIME | 6 | 2 | 2→1 | Floor rule (10 Nov) |
| WR>FS | 6 | 2 | 2→1 | Floor rule (10 Nov) |
| WR>NICKEL | 6 | 2 | 2→1 | Floor rule (10 Nov) |
| WR>SS | 6 | 2 | 2→1 | Floor rule (10 Nov) |

Expected residual set (5 floor + 6 Inkling): 11 rules. Actual residual set: 11 rules. Missing: none. Extra: none.

## Two implementation notes (bugs found and fixed while writing this)

1. **D column**: the thetaprice markdown has columns `rule | now | W@85 | W@90 | D@85 | D@90 | …`. My first regex captured D@85 (col 5) instead of D@90 (col 6). Using D@85 gave exact=77, off-by-one=22, hard=0 with 11 spurious extras (DT>EDGE, FS>WR, ILB>EDGE, K>P, OG>DT, OT>EDGE, P>K, SS>WR, TE>DT, TE>OT, TE>SS). Fixing the regex to capture D@90 eliminated all 11 extras.
2. **KCK/PNT skills**: the design prices `KCK .2 (dst==K only)` and `PNT .2 (dst==P only)`. Omitting them left K>P and P>K at model 0 vs owner 2. Adding them (K: KCK 10; P: PNT 10) makes both exact.

These are implementation details, not formula disagreements — once corrected, the fit is 88/11/0, identical to MUSE and Claude.

## Comparison with other work

- MUSE's P-328 review (`inbox/20261110-0335-muse-P-328-review.md`): verified Inkling's formula at 97/8 on the superseded 105-rule construction. My run is the same formula against the live 99-rule table: 88/11/0. The drop from 97 to 88 is fully explained by the 10 Nov floor changes (5 rules that were exact at owner=2/model=2 became owner=6/model=2 residuals once the floor was applied to the table but not to the formula).
- Claude's `tools/mathlab/flexderive.mjs` (architect `678bb06`): independently implemented, same numbers (per the council prompt). I did not re-use Claude's or MUSE's script; this is a from-scratch implementation from Inkling's design text.

## Evidence label

VERIFIED: ran `python3 p322_verify.py` against the live 99-rule table (git `origin/architect/engine-and-seats @ 97d7e9d`); exact 88 / off-by-one 11 / hard 0; residual set identical to the predicted 5 floor + 6 Inkling. REPORTED: the 88/99 and 93/99-with-floor figures from MUSE and Claude (council prompt, 2026-11-10) — now confirmed by an independent implementation.

## Files

- `inbox/20261110-0602-vloc-P-322-derivation-verify.md` — this report
- `p322_verify.py` — the independent implementation script (read-only)
