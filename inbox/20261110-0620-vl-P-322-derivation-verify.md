SPEAKER: vl | ROLE: council advisor | TASK: P-322 derivation verify (task B — independent re-implementation) | DATE: 2026-11-10T06:20Z
FOR: P-322
VERDICT: ok — Inkling's P-322 formula independently confirmed against the live 99-rule table

## 1. What I did (task B)

Independently re-implemented Inkling's P-322 formula from the design data
(skill-profiles-p322.json at architect 678bb06) and scored it rule-by-rule
against the live Owner flex table (flex.json at 678bb06; byte-identical to
97d7e9d, diff-verified). My own code (_agents/vl/deliveries/vl-derive-verify-
2026-11-10/vl-derive-verify.mjs), not a re-run of MUSE's or Claude's script.

Formula: price = tier( max(0,D_bumped) + gate(A) + U ), cuts 1/4/9 -> 0/2/6/12
- D_bumped: thetaprice D@90, OLB>ILB/OLB>SS bumped to 6.7; D=0 when no D row
- A = sum w[s]*max(0, prof[dst]-prof[src]) with scope/covDmult/catcherCut/eliteLine
- gate: A=0 if D>=5, *0.5 if 4<=D<5
- U: RB>TE=3, SS>ILB=5, TE>ILB=6.4, RB>SS=6.6, EDGE>SS=5.1
- fiat: override dict (C>OG=6, FB>RB=2, FB>TE=6, EDGE>RB=6, EDGE>ILB=6), fbFree => dst FB price 0
- SAM alias => OLB. Read-only; nothing written to repo.

## 2. Results (VERIFIED — literal command output)

### Base: `node vl-derive-verify.mjs` (no floor)
```
vl-derive-verify: 99 live rules | commit 678bb06 | floor none
exact 88 | off by one tier 11 | hard misses 0
by source: pure formula 69/80 exact | formula+U 5/5 | fiat 14/14
no-D rows: ILB>FS OLB>FS
```
Off-by-one residuals (owner -> model):
```
CB>FS: 0 -> 2   CB>SS: 0 -> 2   EDGE>OLB: 0 -> 2   ILB>OLB: 0 -> 2
SS>DIME: 0 -> 2 SS>NICKEL: 0 -> 2   WR>CB: 6 -> 2   WR>DIME: 6 -> 2
WR>FS: 6 -> 2   WR>NICKEL: 6 -> 2   WR>SS: 6 -> 2
```

### Floor 6: `node vl-derive-verify.mjs --floor 6`
```
exact 93 | off by one tier 6 | hard misses 0
```
Residuals shrink to exactly the 6 owner-0/model-2 same-side pairs; all 5 cross-side WR>DB cases become exact (floor raises model 2 -> owner 6).

## 3. Comparison (all numbers VERIFIED by me unless marked REPORTED)
| Source | Exact | Off-by-one | Hard | Floor |
|---|---|---|---|---|
| VL independent re-implement (this entry) | 88 | 11 | 0 | none |
| VL independent re-implement + floor 6 | 93 | 6 | 0 | 6 |
| Claude flexderive.mjs (REPORTED, architect 678bb06) | 88 | 11 | 0 | none |
| Claude + --floor 6 (REPORTED) | 93 | 6 | 0 | 6 |
| Council-prompt prediction (REPORTED) | 93 | 6 | 0 | 6 |

**Match confirmed:** my independent run reproduces Claude's numbers exactly (88/11/0 base; 93/6/0 with floor). The 11 residuals are exactly the 5 cross-side floor rules (WR>CB/DIME/FS/NICKEL/SS) + the 6 Inkling residuals (CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL — all owner 0, model 2). Task B's confirmation criteria are met; no differing rules found.

## 4. How to check

```
cd /Users/kosi/Desktop/wt/vl   # council/vl, tree clean
git show 678bb06:tools/mathlab/flex.json | sha256sum   # == sha of 97d7e9d's flex.json
node _agents/vl/deliveries/vl-derive-verify-2026-11-10/vl-derive-verify.mjs
node _agents/vl/deliveries/vl-derive-verify-2026-11-10/vl-derive-verify.mjs --floor 6
```
Expected: exact 88/93, off-by-one 11/6, hard 0/0; residual rule lists as above.

Evidence label: VERIFIED (both runs executed by me, output quoted above). The matching Claude numbers are REPORTED (council prompt 2026-11-10 + flexderive.mjs run), not independently re-run by me — my run is the independent check.

Push: committing and pushing to origin council/vl; ./.council_tool.mjs deleted before push.
