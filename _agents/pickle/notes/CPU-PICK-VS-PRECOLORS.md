# cpuPick vs Pre-Colors — verification

**Seat:** Pickle · **Date:** 2026-10-22 · **Posting:** M-20261022-w
**Assignment:** council sync 15:00Z — verify `cpuPick` direction (donor-side, not v20's deep unbounded miss)
**Mode:** read-only. No product edits, no candidate, nothing renumbered.

---

## 0. The pin in the brief does not resolve to one file — read this first

The brief states: *Pre-Colors = `NFL Draft Simulator merged.html`, sha256 `044d1759…`, 657,486 B.*

Measured now:

```
40233d6be00e987c  657486 B  _agents/pickle/builds/Football-Sim-PreColors.html
044d1759e01ac99b  656746 B  NFL Draft Simulator merged.html
8f0f8d50c369dcc7  649490 B  NFL Draft Simulator.html
8f916df95bedb3b3  648310 B  NFL Draft Simulator v20 Claude.html
```

`044d1759…` is **656,746 B**, not 657,486 B. The file that is 657,486 B is **`40233d6b…`**, which is what `main` carries today (`gh api … merged.html?ref=main` → `40233d6b…`, 657486) and what the earlier sync pinned. So the brief's **hash and size belong to different files** — the same conflation Claude flagged: `044d1759…` is the retired hand-edited file.

**This does not change the verdict.** I ran the verification on both artifacts named:

- `40233d6b…` — Pre-Colors as named and as pinned (my copy, byte-identical to the pin)
- `044d1759…` — `NFL Draft Simulator merged.html` as hashed in the brief

**Their `cpuPick` bodies are byte-identical**, so every answer below holds whichever file was meant.

## 1. Donor `cpuPick` is kept — PASS (VERIFIED)

In Pre-Colors `cpuPick` (l.1400–1443), all four round-order floors are present:

| Element | Line | Text |
|---|---|---|
| `curRound` | 1406 | `const curRound = Math.floor((st.pos||0)/32)+1;` |
| `topAvail` | 1407 | `const topAvail = st.pool.length ? st.pool[0][3] : 0;` |
| `ovrFloor` | 1411 | `curRound===1 ? Math.max(90, topAvail-5) : curRound<=3 ? Math.max(85, topAvail-8) : -Infinity` |
| `posBest` | 1414 | `const posBest = (seen[pos]=(seen[pos]||0)+1) === 1;` |

plus the guards that use them — `if(curRound<=3 && !posBest) continue;` (l.1415), the QB-run allowance
`Math.min(88, ovrFloor)` (l.1416), and `seen` capped at 16 as a **late** filter (l.1417).

The miss is the donor's **bounded, quality-guarded** one (l.1430–1435):

```js
const reach = 3 + Math.min(9, Math.floor(Math.abs(randNormal())*4));   // max index 12
const c = cands[Math.min(reach, cands.length-1)];
if(c.p[3] >= (curRound===1 ? 88 : curRound<=3 ? topAvail-9 : 0)){ … }  // quality guard
```

## 2. It is NOT v20's `seen>16` + 92-deep unbounded miss — PASS (VERIFIED)

v20 (`NFL Draft Simulator v20 Claude.html`, l.1368) has **none** of the four floors, and its miss is:

```js
const c = cands[3 + Math.floor(Math.random()*Math.min(90, cands.length-3))];  // max index 92
best = c.p; bestSlot = c.s;                                                   // no quality guard at all
```

Pre-Colors contains nothing of that shape. Donor-vs-v20 on the miss depth: **12 (guarded) vs 92 (unguarded)**.

## 3. Direction is donor-side — PASS (VERIFIED, byte-level)

Extracted each `cpuPick` body and diffed it:

```
--- diff donor vs Pre-Colors ---        IDENTICAL (44 lines, sha c427997886c80e09)
--- diff merged044d vs Pre-Colors ---   IDENTICAL (44 lines, sha c427997886c80e09)
--- diff v20 vs Pre-Colors ---          DIFFERS (missing floors l.6a7,12 and the posBest/floor guards l.9c15,18)
```

So `donor == 044d1759 == Pre-Colors` for `cpuPick`, and v20 is the outlier.

`cpuMiss` / `cpuNoise` (which set the miss rate) also agree behaviourally: donor, 044d and v20 use
`Math.random() ** 0.9` / `** 1.0`; Pre-Colors writes `Math.pow(Math.random(),0.9)` / `(…,1.0)`.
**Semantically identical**, so the miss *rate* is unchanged. (File-wide the rewrite is partial:
Pre-Colors has 18 `Math.pow(` and 4 `**`; the other three builds have 22 `**` and 0 `Math.pow(`.)

## 4. One correction to the brief's premise

The brief says *"`seen>16`/`seen>16` deep miss absent from v20 but NOT in Pre-Colors"*.

- **`seen>16` is present in v20** — l.1376, as the loop's *first* filter: `if((seen[pos]=(seen[pos]||0)+1) > 16) continue;`
- **The 92-deep unbounded miss is v20's own** — it is not absent from v20.

What is actually absent from v20 is the **four round-order floors** and the **bounded/guarded miss**. The brief's conclusion is right; both halves of that parenthetical are inverted.

## 5. What this proves, and what it does not

**Proven:** the `cpuPick` source in Pre-Colors is the donor's, character for character, and v20's deep
unguarded reach is not in it.

**Not proven:** that Pre-Colors *behaves* like the donor in a draft. That would need a seeded draft run on
each build, and it cannot be produced here: the build has **38 `Math.random()` sites and no PRNG/seed**
(measured earlier, `grep -c 'Math.random'`), so two runs are never the same. The direction claim above is
**structural, not statistical** — I am not asserting any pick or wins difference between builds.
I also did not drive v20 in a browser; the v20 claims are read from its source.

## 6. Commands

```bash
# pin check
shasum -a 256 _agents/pickle/builds/Football-Sim-PreColors.html "NFL Draft Simulator merged.html"
# extraction (from the function line to the next top-level function)
awk -v start=1400 'NR>=start && NR>start && /^function /{exit} NR>=start' <build>
# comparison
diff _agents/pickle/evidence/cpupick/donor.cpuPick.txt _agents/pickle/evidence/cpupick/precolors.cpuPick.txt
```

Receipts stored in `_agents/pickle/evidence/cpupick/` (`precolors`, `merged044d`, `donor`, `v20` ×
`.cpuPick.txt` and `.miss-noise.txt`).
