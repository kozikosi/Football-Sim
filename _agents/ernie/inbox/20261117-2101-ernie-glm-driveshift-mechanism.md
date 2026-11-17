SPEAKER: ernie | ROLE: council | TASK: finish the state-bucket test — the drive-ending mix, and correct my 20:40Z verdict | DATE: 2026-11-17T21:01Z
FOR: P-342

**SUPERSEDES my own filing `_agents/ernie/inbox/20261117-2040-ernie-glm-passclass-verification.md`.**
That filing's verdict was "the shift does not block the GLM becoming the default." I now have the mechanism and **the verdict is reversed**: it does block, and for a reason neither Claude nor Beam nor MUSE named — it is a **cell-selection artifact on 4th down**, not a residual statistical bias. The 20:40Z filing stays on the record; this one replaces its §"Verdict".

**Commit tested: `65673a00`** (`architect/engine-and-seats`). **Machine: node v26.13.0, macOS arm64.** Clean extract via `git archive origin/architect/engine-and-seats colors tools`. Suite **406/406, 0 fail** (receipt `driveshift/receipt-suite.txt`). All scripts and raw logs: `_agents/ernie/deliveries/glm-passclass-2026-11-17/driveshift/`. The pass logs are not committed (46 MB each); every script here rebuilds its own from the engine's event log — **I did not edit the engine**.

---

# 1 · The headline: the drives shift is the `downs` result, and inside it the 4th-down component

Paired 12,000 keys `glm-bar:0..11999`, both nodes, from the engine's own `drive_start` / `snap` / `drive_end` events. **VERIFIED.**

| per game | pools | GLM | diff | diff% |
|---|---|---|---|---|
| drives | 22.076 | 21.841 | −0.235 | **−1.07%** |
| offensive snaps | 121.507 | 121.266 | −0.240 | −0.20% |
| snaps per drive | 5.5039 | 5.5523 | +0.0484 | +0.88% |
| sacks | 4.837 | 4.754 | −0.083 | −1.72% |
| points | 46.500 | 46.781 | +0.281 | +0.60% |

(The `glm-bar.ts` figures are half of these — it reports per team-game means. 23.250 = 46.500/2. Same numbers, different denominator.)

**Drive-ending result mix** (share of all drives that end that way):

| result | pools | GLM | diff (pp) | n_pools | n_glm |
|---|---|---|---|---|---|
| td | 22.429% | 22.803% | +0.375 | 59,417 | 59,765 |
| fg | 15.845% | 16.256% | +0.411 | 41,977 | 42,605 |
| fgmiss | 2.679% | 2.798% | +0.119 | 7,097 | 7,333 |
| punt | 31.722% | 31.828% | +0.106 | 84,038 | 83,418 |
| to | 9.219% | 9.359% | +0.139 | 24,424 | 24,528 |
| **downs** | **9.281%** | **8.078%** | **−1.204** | **24,588** | **21,171** |
| safety | 0.250% | 0.258% | +0.008 | 663 | 676 |
| deftd | 0.949% | 0.919% | −0.029 | 2,513 | 2,409 |
| clock | 7.625% | 7.701% | +0.076 | 20,200 | 20,184 |

**Every result except `downs` moves by ≤0.41 pp and is a small share-shift caused by the denominator.** `downs` alone drops 13.9% (2.049 → 1.764 per game), and it is larger than the whole drives gap, offset by the small rises elsewhere.

**Inside `downs`, the component that collapses is the 4th-down one.** `downs` drives whose final snap was a 4th-down snap: **0.749 → 0.429 per game (−43%)**. The `downs` drives whose final snap was a 1st/2nd/3rd-down snap rise slightly (1.300 → 1.335). By pre-snap down, `downs`-endings at down 4 fall 36.567% → 24.340% of all `downs` endings (−3,838 snaps) while downs 1/2/3 each rise (+59 / +89 / +273).

Receipts: `driveshift/receipt-driveend.txt`, `driveshift/receipt-mechanism.txt`.

# 2 · The mechanism: the class-restricted sampler leaves the finest cell on 4th down

The class node does not use a different tuple distribution *within* a cell — it uses a **different cell**. `pickClassTuple` (`passclass.ts:74-85`) walks the pool levels and requires the **class-restricted** sub-pool to hold `minClassPool` (25) plays. `recKeys` (`pools.ts:66-69`) builds four levels:

- **L0** = (call, down, distBin, ydlBin) — includes the down
- **L1** = (call, min(down,3), distC, ydlBin) — down capped at 3
- **L2** = (call, ydlBin) — **the down is gone**
- **L3** = (call) — only the call

On 4th down a single cell almost never holds 25 plays of one class, so the sampler falls through. Measured over the 4th-down pass plays in 12,000 games:

| 4th-down pass plays | pools node (minPool 25, any class) | GLM node (minClassPool 25, per class) |
|---|---|---|
| uses L0 (finest) | **65.51%** | **8.06%** |
| level histogram | `{0:13683, 1:6879, 2:324}` | `{0:6736, 1:50007, 2:22259, 3:4542}` |

**The GLM is in a down-blind cell 92% of the time on 4th down; the pools node is in the finest cell two times out of three.**

**Why that changes the drive.** A tuple carries `(ndown, delta)` — the real next down and the real change in yards-to-goal. The empirical transition branch (`game.ts:116-124`) ends the drive with `downs` **only** when `ndown` or `delta` is NaN. Among the **incomplete** sub-pool on 4th-down pass plays:

| level | share of incomplete tuples with NaN `(ndown,delta)` → drive ENDS |
|---|---|
| **L0** | **99.72%** (68,235 / 68,428) |
| L1 | 23.45% (153,633 / 655,171) |
| L2 | 8.25% (286,536 / 3,474,672) |
| L3 | 8.59% (1,128,492 / 13,144,842) |

At L0 a 4th-down incompletion ends the drive 99.7% of the time — correct. At L1–L3 the same tuple says "next down 2" and **the drive continues**.

The consequence, measured on every 4th-down pass play (not just the last one):

| 4th-down pass play | pools % | GLM % | n_pools | n_glm |
|---|---|---|---|---|
| comp : drive continues | 49.26% | 50.28% | 9,453 | 10,501 |
| comp : downs | 4.14% | 2.08% | 795 | 434 |
| **inc : drive continues** | **11.20%** | **27.54%** | 2,150 | **5,751** |
| **inc : downs** | **24.12%** | **8.83%** | 4,629 | 1,844 |
| int : to | 3.09% | 3.66% | 593 | 764 |
| sack : drive continues | 2.80% | 6.07% | 538 | 1,268 |
| sack : downs | 4.62% | 0.82% | 887 | 172 |

**A 4th-down incompletion ends the drive 68.3% of the time under the pools node (24.12 / (24.12+11.20)) and 24.3% under the GLM.** That single substitution — `inc:continue` 11.20% → 27.54% — is **3,601 extra drives that should have ended** across 12,000 games, and it is the whole drives shift: 3,601 / 12,000 = 0.300 per game, against a measured drives gap of 0.235 per game.

Receipts: `driveshift/receipt-leveluse.txt`, `driveshift/receipt-cellnan.txt`, `driveshift/receipt-fourth4.txt`.

# 3 · What is NOT the cause (two hypotheses ruled out with commands)

- **The class-rate difference is not a mix artifact.** My 20:40Z Kitagawa–Oaxaca on 160 cells (down × ytg-bin × field side × score-bin) stands: rate effect −0.0965 points, mix effect −0.0033, i.e. **97% rate / 3% mix**. The rate effect is the coarse-cell substitution above.
- **The drift is not the cause.** The measured sack-rate gap is −0.0998 points against a training→held-out drift of ~0.6 points (6.4% → 7.0%); the GLM sits at 6.97% in the visited states. ~15% of the drift, not the drift. (My 20:40Z filing; unchanged.)
- **The class-pool fallback counter is not it either.** I checked the obvious suspect first: `holes` is **[0,0,0,0,0] for both nodes** — no call, record, clock or pass-class hole. But `holes[4]` only counts the case where *no* level holds the class at all (`passclass.ts:82`); the silent fall-through at line 79-80 (a coarser level that clears 25) is **not counted**. So a clean `holes` array does not mean the sampler stayed in the finest cell. That is a second, smaller finding: **the hole counter cannot see the fallback that matters.**
- **The sack shift is a different shape from the drives shift.** Sack rate per pass attempt by down: 1st 5.387→5.312, 2nd 6.092→5.969, 3rd 10.433→10.387, 4th 7.920→7.211. Downs 1–3 are a uniform ~1.5% relative reduction; 4th down is a further −9%. So the sack shift is mostly the even rate effect, with a 4th-down extra from the same cell substitution.

Receipts: `driveshift/receipt-bydown.txt`, `driveshift/receipt-holes.txt`.

# 4 · The answer to 1b: which mechanism

**Verdict: bias — but a structural one, concentrated in a named cell, not spread evenly.**

The prompt asked me to name the bucket if the shift is concentrated. It is: **4th down**. Not down 1, not down 2, not down 3 — those are within 0.15 pp on every class. On 4th down the class mix moves by ~1 pp on all four classes (comp 53.46→52.49, inc 35.32→36.36, sack 7.92→7.21, int 3.30→3.93), and the *transition* behaviour moves far more (inc:continue 11.20% → 27.54%).

Not the state-mix (3%), not the drift (15%). **It is the `minClassPool` threshold pushing the sampler out of the down-aware cell on the one down where cells are thin.**

# 5 · Verdict on the default question (1c) — REVERSED from my 20:40Z filing

**The shift DOES block the GLM becoming the product's default pass node.** Not because of its size — it is small — but because it is a **mechanism error, not a residual bias.** My 20:40Z filing said "record it, don't smooth it"; that was right about the size and wrong about the nature. A 1.4% relative sack under-prediction is the kind of thing you can measure, document and accept. A 4th-down incompletion that fails to end the drive **three times out of four** is a state machine that disagrees with football, and it will compound: it changes drive counts, time of possession, and every downstream season statistic.

**What would change my mind:** a build in which the class-restricted sampler cannot leave the level the pools node would have chosen. Then re-run this same paired comparison; if drives land within ±0.3% and the `inc:downs` share returns to ~24%, the GLM is a clean node and the default question becomes an Owner decision on the held-out gain alone.

# 6 · Proposal (P-342, §5 form) — bound the fallback by the pools node's own level

**Target build:** the next commit on `architect/engine-and-seats` after `65673a00`.
**WHERE:** `colors/src/sports/nfl/sim/passclass.ts`, function `pickClassTuple` (lines 74-85), and its one call site `colors/src/sports/nfl/sim/game.ts:84`.
**Old → new.**
Old: `pickClassTuple` walks **all four** levels and returns the first whose **class** sub-pool clears `minn`, ending at the coarsest level that holds the class at all.
New: `pickClassTuple` first computes the level `pick` would have chosen for this cell (the finest level whose **total** pool clears `minPool`, same rule as `pools.ts:77-83`), and then walks **only levels 0..thatLevel** looking for a class sub-pool that clears `minn`. If none does, it uses the **last level it was allowed to reach** — never coarser than the pools node's own cell.
**WHY:** the class threshold is meant to guarantee "≥25 plays of that class", not to move the play into a different down. Bounding the walk by the pools node's level keeps the guarantee where the cell is genuinely populated and removes the down-blind substitution. It also makes the two nodes agree on *which cell* a play belongs to, which is the property the "class-then-tuple preserves the within-class mix" design was supposed to have.
**SAFE ALONE? No.** It changes the GLM's tuple distribution and therefore its measured statistics; it must be re-measured with the paired comparison before it ships. It does not touch the pools node (default-off is preserved by construction — the new code path only runs when `opts.passClass` is set).
**HOW TO CHECK:**
1. `node --experimental-strip-types tools/glm-bar.ts 12000` — the drives gap must fall from −1.07% to within ±0.3%, and the sacks gap from −1.72% to within ±0.5%. Anything larger is a new finding.
2. The 4th-down table in §2 above: `inc:downs` must return to ≈24%, `inc:continue` to ≈11%. A build that leaves `inc:continue` above 15% has not fixed it.
3. `node --experimental-strip-types driveshift/leveluse2.mjs` — the GLM's L0 share on 4th down must rise from 8.06% to ≥65%.
4. `npm test` must stay 406/406.
5. A fault plant: make `pickClassTuple` ignore the bound (always walk to L3) and confirm a test fails. **No test currently covers this** — the existing passclass tests assert the loader, the partition and the seam, not the level the sampler lands on. The battery in §6.1 is the missing test.

**6.1 The test that would catch it (test-only, for the Architect to land).** Assert, on a fixture cell whose L0 pool clears `minPool` but whose class sub-pool does not, that `pickClassTuple` returns a pool from **level ≤ the pools node's level**. The check-can-fail form: with the bound removed, the assertion must fail. Today it would pass vacuously, because nothing looks at the level.

# 7 · What I did not check

- **The six planted faults** (Claude's) — not re-planted by me. **REPORTED by Claude**, not verified here.
- **Held-out log loss** (GLM 0.92389 vs pool 0.92786) — the nflverse data is not in the repo. **REPORTED by Claude.**
- **The lambda seam monotonicity** — not run this round.
- **Whether the fix in §6 is the right fix** — it is the minimal one that removes the down-blind substitution; a different design (e.g. a per-class threshold that never crosses a level boundary) may be better. That is the Architect's call.
- **The 2016–2022 pack** — only 2023–2025 was run.

---

BLOCKED: nothing — the Architect has the commit and the repro scripts.
OPEN: (1) the Owner's decision on making the GLM the default, which this filing argues should wait for a fix; (2) whether the Architect accepts §6 or prefers a different bound.
NEXT: (1) the Architect lands §6 + §6.1 and re-runs `tools/glm-bar.ts 12000` — I will verify the three numbers in §6 HOW TO CHECK; (2) a seat writes the yards-node acceptance battery (Part 2 of the round prompt) — not yet filed by me; (3) the four box-score assertions (Part 4a) — still open.