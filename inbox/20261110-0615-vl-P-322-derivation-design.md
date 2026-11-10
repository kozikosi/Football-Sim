SPEAKER: vl | ROLE: council advisor | TASK: P-322 derivation design (VL's own, option A) | DATE: 2026-11-10T06:15Z
FOR: P-322
DERIVATION-DESIGN: vl-derive v1 — read-only analysis, nothing touches flex.json, the engine, or protected constants

## 1. Design

price(src, dst) = tier( D@90(src,dst) + GAP(src,dst) [, cross-side floor] )
- tier: x < c1 -> 0, x < c2 -> 2, x < c3 -> 6, else 12 (default cuts 1 / 4 / 9)
- D@90: theta ability distance from tools/mathlab/results/thetaprice-2026-11-09.md (read via git show 678bb06:...; flex.json at that commit is byte-identical to 97d7e9d, the live Owner table, diff-verified). D = 0 when the rule has no D row (flagged).
- GAP: one-sided skill-demand gap = sum_s w[s] * max(0, prof[dst][s] - prof[src][s]) over BLK, CTH, COV, RNG, RSH, RUN. Profiles: Inkling's P-322 skill profiles (skill-profiles-p322.json at 678bb06 — cited data, not VL's invention). Weights: VL's own {BLK:0.75, CTH:0.5, COV:0.6, RNG:0.6, RSH:0.8, RUN:1.0}, stated plainly as a design choice.
- --floor N: cross-side (offense<->defense) formula price below N raised to N; dest==FB exempt (free flexes).
- No destination weight (settled principle: the table prices ability distance, not slot worth), no U deltas, no override dict, no fbFree whitelist, no fiat rows — all 99 rules scored by the same formula.
- Script: _agents/vl/deliveries/vl-derive-2026-11-10/vl-derive.mjs (this lane, not tools/ — tools/ is Architect-owned). Reads inputs via `git show <commit>:<path>`; writes nothing.

Deliberately fewer constants than Inkling's P-322: 6 weights + 3 cuts (+floor) vs ~9 betas, gate, DMULT x3, catcherCut, U x5, overrides x5, fbFree x9, dBump x2.

## 2. Results (VERIFIED — I ran each command; output below is the literal run output)

### A. VL base: `node vl-derive.mjs` (cuts 1/4/9, no floor, no gate, no scope)
```
vl-derive: 99 live rules | D table 678bb06:.../thetaprice-2026-11-09.md | profiles .../skill-profiles-p322.json
weights {"BLK":0.75,"CTH":0.5,"COV":0.6,"RNG":0.6,"RSH":0.8,"RUN":1} | cuts 1/4/9 | floor none | gate false | scope false
exact 48 | off by one tier 42 | hard misses 9 | no-D rows 2: ILB>FS OLB>FS
same-side: exact 27/57 | cross-side: exact 21/40
```
Hard misses include C>FB (0->12), DT>FB (0->12), EDGE>FB (0->12), FB>RB (2->12), FB>TE (6->12) — the formula over-charges moves into broadly-capable destinations (FB, TE...) that the Owner prices as free flexes.

### B. VL + cross-side floor 6: `node vl-derive.mjs --floor 6`
```
exact 51 | off by one tier 39 | hard misses 9 | same-side 27/57 | cross-side 24/40
```
Floor fixes exactly the WR>DB class (WR>DIME, WR>NICKEL -> raised to 6 = owner) and TE>DIME (floor lands on 6.00). Nothing previously exact breaks.

### C. VL + floor 6 + cuts 1.5/4/9: `node vl-derive.mjs --floor 6 --cuts 1.5,4,9`
```
exact 53 | off by one tier 37 | hard misses 9 | same-side 29/57 | cross-side 24/40
```

### D. Control — VL weights + Inkling's gate + scope + floor 6: `node vl-derive.mjs --floor 6 --gate --scope`
```
exact 62 | off by one tier 31 | hard misses 6 | same-side 31/57 | cross-side 31/40
```
Isolates structure vs weights: even with Inkling's gate (A=0 if D>=5, *0.5 if 4<=D<5) and scope (RUN gap only vs RB), VL weights reach only 62/99 — so Inkling's fitted betas/DMULT/catcherCut/U/overrides/fbFree do real fitting work; the gap-term idea alone is not enough.

Full mismatch lists are printed by the script for every config; re-run any command to reproduce.

## 3. Comparison (Inkling numbers REPORTED per council prompt 2026-11-10; my runs VERIFIED)
- Inkling P-322 vs live table: 88 exact / 11 off-by-one / 0 hard
- Inkling + cross-side floor 6: 93/6/0; Inkling + floor 6 + cuts 1.5/4/9: 96/3/0 (candidate)
- VL base: 48/42/9; VL + floor: 51/39/9; VL + floor + cuts: 53/37/9

**VL-derive v1 does NOT beat Inkling (48 vs 88 exact; 9 hard vs 0). Not better.**

## 4. Structural findings (why)

1. **The 6 same-side zero-D residuals (CB>FS, CB>SS, EDGE>OLB, ILB>OLB, SS>DIME, SS>NICKEL — owner 0) are not separable from priced same-side pairs by any (D, gap) threshold.** Counterexample: SS>FS (owner 2, D=0, gap 3.5 -> tier 2, exact) and CB>FS (owner 0, D=0, gap 1.4 -> tier 2, residual) have indistinguishable inputs but opposite Owner prices. Same for FS>OLB (owner 6, D=0, gap 4.8 -> tier 6, exact) vs EDGE>OLB (owner 0, D=0, gap 1.9 -> tier 2, residual). These are Owner pair rulings, not derivable from ability distance — any formula needs an exception list for them (Inkling's override/fbFree/U lists are exactly that).
2. **Free-flex destinations (FB: 0-2 from nearly every source; NICKEL/DIME: 0 from DBs; EDGE>OLB/ILB>OLB = 0) are pair rulings, not distance.** Pure gap pricing over-charges them (C>FB 0->12, DT>FB 0->12, FB>RB 2->12...). Inkling's fbFree whitelist encodes this; my design has no fiat, so it takes those hits honestly.
3. **Cross-side floor 6 fixes only the WR>DB class and breaks nothing previously exact** (all cross-side non-FB owner prices are >= 6 already). Consistent with task C's prediction (93/99 with floor).
4. **Fewer constants is worse here.** The constants in Inkling's design are not bloat — they are the Owner's exceptions, fitted. Dropping them loses 40 points of fit.

## 5. Verdict

**REJECT vl-derive v1 for adoption.** It does not beat Inkling's 88/99 (93/99 with floor), it is not simpler in outcome (it needs the same exception lists once you add them back), and it is not more principled (pure D+gap cannot separate the Owner's same-side pair rulings).

**Recommendation:** the council does not spend more seats tuning a blind D+gap formula. Derivation work continues from Inkling's P-322 (Option B held per Owner; the 97d7e9d table stands). If a seat wants to experiment further, the controlled variables are now known: gate + scope + fitted betas + fiat lists do the work; the cross-side floor is a clean additive term that fixes WR>DB and breaks nothing.

## 6. How to check

```
cd /Users/kosi/Desktop/wt/vl   # council/vl worktree, clean tree
git show 678bb06:tools/mathlab/flex.json | sha256sum   # must equal 97d7e9d's flex.json (byte-identical, diff-verified)
node _agents/vl/deliveries/vl-derive-2026-11-10/vl-derive.mjs
node _agents/vl/deliveries/vl-derive-2026-11-10/vl-derive.mjs --floor 6
node _agents/vl/deliveries/vl-derive-2026-11-10/vl-derive.mjs --floor 6 --cuts 1.5,4,9
node _agents/vl/deliveries/vl-derive-2026-11-10/vl-derive.mjs --floor 6 --gate --scope
```
Expected outputs: exact counts 48 / 51 / 53 / 62 as above; hard misses 9 / 9 / 9 / 6.

Evidence label: VERIFIED (all four runs executed by me, output quoted above) · REPORTED (Inkling's 88/93/96 figures from council prompt 2026-11-10 and Claude's flexderive.mjs run at architect 678bb06; not independently re-run by me — see task B for an independent recheck).

Push: committed and pushed to origin council/vl (commit hash given on push); ./.council_tool.mjs deleted before push.
