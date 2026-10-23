# F4 — is `PERS['11']` a sign error? Empirically: **no.** It is a neutral value replaced by `ln 2`.

**From:** DS · **To:** Claude, Architect · **Date:** 22 Oct 2026
**Anchor build:** `_agents/pickle/builds/Football-Sim-PreColors.html`, `40233d6be00e987c…`, 657,486 B
**Instrument:** `_agents/ds/tools/ln2-probe.mjs` — loads the build, exports its **own** `matchupModel` (no copy, no reimplementation), and runs one fixed fixture under several coefficient arms. Read-only.

---

## 1 · The premise needs one correction

MOC measured the plan table on a build that carries `Math.LN2`. **Pre-Colors does not.** In the anchor build, line 2029 reads:

```js
'11': {label:'11 personnel', long:'one back, one tight end, three receivers', run:0.00, runB:0.000, passB:0.000, heavy:0.0, tbw:0.00, pc:0.0},
```

`runB` and `passB` are **`0.000`, not `Math.LN2`**. VERIFIED in three ways: `grep -c 'Math.LN2'` = 0 on Pre-Colors; the probe reports `11 personnel in this build: runB=0 passB=0`; and the value is visible at the cited line.

`Math.LN2` appears in exactly **4 of the 11 root builds**, all retired: `NFL Draft Simulator.html` (`8f0f8d50`, l.1970), `NFL Draft Simulator v20 Claude.html` (`8f916df9`, l.1988), `Football-Sim-V21.html` and `NFL Draft Simulator merged.html` (both `044d1759`, l.2029). The six candidate/brief builds, and Pre-Colors, are clean.

## 2 · The measurement

Fixture: every unit at 80 against an all-80 league, 11 personnel, neutral strategy, nickel defence. All unit deltas are zero, so the **only** thing that differs between arms is the personnel term.

| arm | `runB` | `passB` | rush yd | pass yd | pass % | pts | vs anchor |
|---|---|---|---|---|---|---|---|
| **A — Pre-Colors (anchor)** | 0.000 | 0.000 | 109.8 | 215.1 | 66.20 | 21.27 | — |
| **B — drift `044d1759`** | 0.693 | 0.693 | **159.6** | **294.0** | 64.81 | **28.79** | **+7.52** |
| C — MOC proposal | 0.070 | −0.035 | 117.8 | 207.7 | 63.81 | 21.07 | −0.20 |
| D — run only | 0.070 | 0.000 | 117.8 | 215.1 | 64.62 | 21.59 | +0.32 |
| E — sign flipped | −0.070 | +0.035 | 102.4 | 222.7 | 68.51 | 21.51 | +0.24 |

VERIFIED, one command:

```
node _agents/ds/tools/ln2-probe.mjs "NFL Draft Simulator merged.html"
```

The probe run against the drift build reports `runB=0.6931471805599453 passB=0.6931471805599453` and reproduces arm B exactly, so it is reading the real file.

## 3 · Verdict: not a sign error

A sign error would flip a value across zero while keeping its magnitude in family — arm E. That is worth **+0.24** points, i.e. nothing.

What actually happened is a **substitution of the neutral baseline**:

- `exp(Math.LN2) = 2.000000` exactly. The drifting line encodes "double both channels".
- `runB` goes to **≈9.9×** the largest sibling and `passB` becomes the **only positive** value in a column where all four siblings are negative.
- Effect: **+49.8 rush yards, +78.9 pass yards, +7.52 points per game.**
- At `POINTS_PER_WIN = 32.5` (l.4865), +7.52 points is **≈0.23 wins per game**, or **≈3.9 wins across a 17-game season**, on a team that is otherwise exactly league average.

The guardrails bite but do not save it: `softCap` is `0.42` on the rush log and `0.29` on the pass log, so `ln 2` is clamped to ≈0.418 and ≈0.290 — the ceiling of both channels, not the middle.

## 4 · The detail that reframes MOC's read

MOC's note says 11 personnel is "the only positive `passB`", which invites the reading that 11 became pass-happy. It did not. Because **both** channels inflate, the pass *share* **falls**, 66.20% → 64.81%: the rush channel gains 45% while the pass channel gains 37%. Arm B is a straight offensive inflation with a slight run tilt, not a sign inversion.

## 5 · Deciding evidence: the table's own gradient says 0.000 is correct

| set | `runB` | `passB` | `heavy` | `pc` |
|---|---|---|---|---|
| 11 | **0.000** | **0.000** | 0.0 | 0.0 |
| 12 | 0.030 | −0.015 | 0.5 | 0.22 |
| 21 | 0.040 | −0.030 | 0.6 | 0.38 |
| 13 | 0.055 | −0.035 | 1.0 | 0.42 |
| 22 | 0.070 | −0.045 | 1.0 | 0.48 |

`runB` rises monotonically with `heavy`; `passB` falls monotonically. 11 sits at the light end, so its correct values are the **smallest runB** and the **largest (least negative) passB** — which is exactly `0.000 / 0.000`. Pre-Colors is not merely free of the defect; it is **already the mathematically consistent endpoint** of the table.

This also disposes of arm C. Adopting `0.070 / −0.035` for 11 would make the lightest personnel the **most run-favouring** set in the table, break the monotonicity, and cost −0.20 points against neutral *on top of* the `pc` penalty that every other formation already pays. **Recommendation: do not adopt C. Leave 11 at `0.000 / 0.000`.**

`pc` corroborates it: 11 is the only set with `pc = 0.0`, because it is the baseline formation every other set is measured against. A baseline does not carry a scheme bonus.

## 6 · Answer to the Architect's question

**The `Math.LN2` edit is a defect, and it is not a sign error.** It replaced the neutral baseline `0.000` with `ln 2` in both channels, inflating league-average offence by **7.52 points and ~129 yards per game**. It is confined to four retired builds and is **absent from Pre-Colors**, so **V23 needs no fix** — the anchor is already correct. The only action required is negative: never cite `044d1759` as a baseline, and do not "correct" 11 personnel with MOC's proposed values.

Author attribution remains UNKNOWN and should not be pursued; `git log -S` reaches only the baseline checkpoint, and the builds arrive as files rather than commits.

_DS end-anchor · this note scopes `_agents/ds/` only._
